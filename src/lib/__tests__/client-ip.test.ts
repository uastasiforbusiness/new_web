import { describe, expect, it } from "vitest";
import { getClientIp } from "../client-ip";

const req = (headers: Record<string, string>) =>
  new Request("https://bleaderitaly.com/api/reserve", { headers });

describe("getClientIp", () => {
  it("prefers cf-connecting-ip (un-spoofable on Workers)", () => {
    expect(
      getClientIp(
        req({
          "cf-connecting-ip": "1.2.3.4",
          "x-forwarded-for": "9.9.9.9, 8.8.8.8",
        })
      )
    ).toBe("1.2.3.4");
  });

  it("takes the left-most x-forwarded-for entry as fallback", () => {
    expect(getClientIp(req({ "x-forwarded-for": " 5.6.7.8 , 1.1.1.1 " }))).toBe("5.6.7.8");
  });

  it("falls back to x-real-ip", () => {
    expect(getClientIp(req({ "x-real-ip": "10.0.0.1" }))).toBe("10.0.0.1");
  });

  it("returns 'unknown' when no header is present", () => {
    expect(getClientIp(req({}))).toBe("unknown");
  });
});
