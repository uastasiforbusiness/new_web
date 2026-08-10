import { afterAll, describe, expect, it, vi } from "vitest";
import { createHmac } from "node:crypto";

const APP_SECRET = "test-app-secret";
const VERIFY_TOKEN = "test-verify-token";

// whatsapp.ts captures env at module load; set it before importing.
vi.stubEnv("WHATSAPP_APP_SECRET", APP_SECRET);
vi.stubEnv("WHATSAPP_VERIFY_TOKEN", VERIFY_TOKEN);

afterAll(() => {
  vi.unstubAllEnvs();
});

const {
  normalizePhone,
  isValidPhone,
  verifyWebhookToken,
  verifyWebhookSignature,
} = await import("../whatsapp");

describe("normalizePhone", () => {
  it("strips non-digits to E.164 digits", () => {
    expect(normalizePhone("+52 441 213 2652")).toBe("524412132652");
  });

  it("rejects numbers shorter than 8 or longer than 15 digits", () => {
    expect(normalizePhone("+39 123")).toBeNull();
    expect(normalizePhone("+39 12345678901234567")).toBeNull();
  });

  it("isValidPhone mirrors normalizePhone", () => {
    expect(isValidPhone("+39 333 123 4567")).toBe(true);
    expect(isValidPhone("nope")).toBe(false);
  });
});

describe("verifyWebhookToken", () => {
  it("accepts the configured verify token", () => {
    expect(verifyWebhookToken(VERIFY_TOKEN)).toBe(true);
  });

  it("rejects wrong or missing tokens", () => {
    expect(verifyWebhookToken("wrong")).toBe(false);
    expect(verifyWebhookToken(null)).toBe(false);
  });
});

describe("verifyWebhookSignature", () => {
  const sign = (body: string) => `sha256=${createHmac("sha256", APP_SECRET).update(body).digest("hex")}`;

  it("accepts a valid HMAC signature", () => {
    expect(verifyWebhookSignature('{"a":1}', sign('{"a":1}'))).toBe(true);
  });

  it("rejects a tampered body", () => {
    expect(verifyWebhookSignature('{"a":2}', sign('{"a":1}'))).toBe(false);
  });

  it("rejects malformed or missing signature headers", () => {
    expect(verifyWebhookSignature("body", "")).toBe(false);
    expect(verifyWebhookSignature("body", "sha256=zzz")).toBe(false);
    expect(verifyWebhookSignature("body", "plain-text")).toBe(false);
  });

  it("accepts a signature without the sha256= prefix", () => {
    expect(verifyWebhookSignature('{"a":1}', sign('{"a":1}').slice(7))).toBe(true);
  });
});
