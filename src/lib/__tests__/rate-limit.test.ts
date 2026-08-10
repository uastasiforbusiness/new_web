import { afterAll, describe, expect, it, vi } from "vitest";

// rate-limit.ts captures KV env vars at module load; force the in-memory
// fallback by clearing them before the module is first imported.
vi.stubEnv("KV_REST_API_URL", undefined);
vi.stubEnv("KV_REST_API_TOKEN", undefined);

afterAll(() => {
  vi.unstubAllEnvs();
});

const { limit, limitChat } = await import("../rate-limit");

describe("in-memory rate limiter fallback", () => {
  it("reserve limiter allows 5 requests per 60s per IP", async () => {
    for (let i = 0; i < 5; i++) {
      await expect(limit("203.0.113.10")).resolves.toEqual({ success: true });
    }
    await expect(limit("203.0.113.10")).resolves.toEqual({ success: false });
  });

  it("chat limiter has a separate, higher budget (20/60s)", async () => {
    for (let i = 0; i < 20; i++) {
      await expect(limitChat("203.0.113.11")).resolves.toEqual({ success: true });
    }
    await expect(limitChat("203.0.113.11")).resolves.toEqual({ success: false });
  });

  it("does not share counters between IPs", async () => {
    for (let i = 0; i < 5; i++) await limit("203.0.113.12");
    await expect(limit("203.0.113.13")).resolves.toEqual({ success: true });
  });

  it("resets the window after 60s", async () => {
    vi.useFakeTimers();
    try {
      for (let i = 0; i < 5; i++) await limit("203.0.113.14");
      await expect(limit("203.0.113.14")).resolves.toEqual({ success: false });
      vi.advanceTimersByTime(60_001);
      await expect(limit("203.0.113.14")).resolves.toEqual({ success: true });
    } finally {
      vi.useRealTimers();
    }
  });
});
