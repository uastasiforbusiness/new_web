import { describe, expect, it } from "vitest";
import { checkOrigin } from "../csrf";

const req = (headers: Record<string, string>) =>
  new Request("https://bleaderitaly.com/api/reserve", { headers });

describe("checkOrigin", () => {
  it("allows requests with no Origin or Referer (server-to-server)", () => {
    expect(checkOrigin(new Request("https://bleaderitaly.com/api/reserve"))).toEqual({ ok: true });
  });

  it("allows official domains", () => {
    for (const origin of [
      "https://bleaderitaly.com",
      "https://www.bleaderitaly.com",
      "https://bleaderitaly.it",
      "https://bleader-italy.uastasiforbusiness.workers.dev",
    ]) {
      expect(checkOrigin(req({ origin }))).toEqual({ ok: true });
      expect(checkOrigin(req({ referer: `${origin}/fleet` }))).toEqual({ ok: true });
    }
  });

  it("rejects cross-site origins with a 403-style error", () => {
    const result = checkOrigin(req({ origin: "https://evil.example" }));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/not allowed/);
    expect(result.error).toContain("evil.example");
  });

  it("rejects invalid origin headers", () => {
    const result = checkOrigin(req({ origin: "not a url" }));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/invalid origin/);
  });

  it("prefers Origin over Referer when both are present", () => {
    const result = checkOrigin(
      req({ origin: "https://evil.example", referer: "https://bleaderitaly.com/" })
    );
    expect(result.ok).toBe(false);
  });
});
