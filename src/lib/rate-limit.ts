import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed rate limiters backed by Upstash Redis.
 *
 * KV_REST_API_URL and KV_REST_API_TOKEN are mandatory in production. When they
 * are absent in local development or tests, callers use an in-memory fallback.
 * Requests fail closed in production because an in-memory counter is not
 * reliable across serverless instances.
 */

type LimiterKey = "reserve" | "chat";

interface LimiterConfig {
  max: number;
  window: "60 s";
  windowMs: number;
  prefix: string;
}

const LIMITERS: Record<LimiterKey, LimiterConfig> = {
  // Reservation form: strict — each submission sends emails + writes to D1.
  reserve: { max: 5, window: "60 s", windowMs: 60_000, prefix: "ratelimit:reserve" },
  // Chat widget: chatty by design (user messages), but still bounded to curb
  // anonymous abuse of the WhatsApp send endpoint.
  chat: { max: 20, window: "60 s", windowMs: 60_000, prefix: "ratelimit:chat" },
};

const redis: Redis | null =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

const upstashLimiters = new Map<LimiterKey, Ratelimit>();

export function isRateLimitConfigured(): boolean {
  return redis !== null;
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function getUpstashLimiter(key: LimiterKey): Ratelimit | null {
  if (!redis) return null;
  let limiter = upstashLimiters.get(key);
  if (!limiter) {
    const cfg = LIMITERS[key];
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(cfg.max, cfg.window),
      analytics: true,
      prefix: cfg.prefix,
    });
    upstashLimiters.set(key, limiter);
  }
  return limiter;
}

/**
 * Lightweight in-memory fallback used only in local development and tests.
 * It resets per process and must never protect public production endpoints
 * running on multiple serverless instances.
 */
const memoryMap = new Map<string, { count: number; resetAt: number }>();

function checkMemoryLimit(key: LimiterKey, ip: string): { success: boolean } {
  const cfg = LIMITERS[key];
  const now = Date.now();
  const mapKey = `${key}:${ip}`;
  const entry = memoryMap.get(mapKey);
  if (!entry || now > entry.resetAt) {
    memoryMap.set(mapKey, { count: 1, resetAt: now + cfg.windowMs });
    return { success: true };
  }
  if (entry.count >= cfg.max) {
    return { success: false };
  }
  entry.count += 1;
  return { success: true };
}

let warnedNoRedis = false;

async function limitWith(key: LimiterKey, ip: string): Promise<{ success: boolean }> {
  const limiter = getUpstashLimiter(key);
  if (!limiter) {
    if (isProduction()) {
      if (!warnedNoRedis) {
        warnedNoRedis = true;
        console.error(
          "[rate-limit] Redis is required in production. Rejecting public requests until KV_REST_API_URL and KV_REST_API_TOKEN are configured."
        );
      }
      return { success: false };
    }

    if (!warnedNoRedis) {
      warnedNoRedis = true;
      console.warn("[rate-limit] Redis not configured — using in-memory limiter outside production");
    }
    return checkMemoryLimit(key, ip);
  }
  const result = await limiter.limit(ip);
  if (!result.success) {
    console.warn(`[rate-limit] IP ${ip} exceeded "${key}" limit with result:`, result);
  }
  return { success: result.success };
}

/** Reservation endpoint limiter — 5 requests / 60 s per IP. */
export async function limit(ip: string): Promise<{ success: boolean }> {
  return limitWith("reserve", ip);
}

/** Chat / WhatsApp send limiter — 20 requests / 60 s per IP. */
export async function limitChat(ip: string): Promise<{ success: boolean }> {
  return limitWith("chat", ip);
}
