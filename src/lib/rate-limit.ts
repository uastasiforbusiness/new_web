import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed rate limiter backed by Upstash Redis / Vercel KV.
 *
 * Requires KV_REST_API_URL and KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL
 * and UPSTASH_REDIS_REST_TOKEN) to be set. When the env vars are absent
 * (e.g. local dev without KV), `ratelimit` stays null and callers should
 * fall back to a permissive in-memory limiter.
 */
export const ratelimit: Ratelimit | null =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.KV_REST_API_URL,
          token: process.env.KV_REST_API_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        analytics: true,
        prefix: "ratelimit:reserve",
      })
    : null;

/**
 * Lightweight in-memory fallback used in local dev when KV is not configured.
 * Resets per server instance — NOT suitable for serverless production.
 */
const memoryMap = new Map<string, { count: number; resetAt: number }>();
const MEMORY_WINDOW_MS = 60_000;
const MEMORY_MAX = 5;

function checkMemoryLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const entry = memoryMap.get(ip);
  if (!entry || now > entry.resetAt) {
    memoryMap.set(ip, { count: 1, resetAt: now + MEMORY_WINDOW_MS });
    return { success: true };
  }
  if (entry.count >= MEMORY_MAX) {
    return { success: false };
  }
  entry.count += 1;
  return { success: true };
}

export async function limit(ip: string): Promise<{ success: boolean }> {
  if (ratelimit) {
    const result = await ratelimit.limit(ip);
    return { success: result.success };
  }
  return checkMemoryLimit(ip);
}
