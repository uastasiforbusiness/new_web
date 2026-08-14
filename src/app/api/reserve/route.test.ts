import { beforeEach, describe, expect, it, vi } from "vitest";

const createMock = vi.fn();

vi.mock("@/lib/db", () => ({
  db: { reservation: { create: createMock } },
}));

vi.mock("@/lib/email", () => ({
  sendReservationEmails: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn().mockResolvedValue({}),
}));

const { POST } = await import("./route");

const VALID_BODY = {
  car_name: "Ferrari California",
  car_variant: "Tour",
  customer_name: "John Doe",
  email: "john@example.com",
  phone: "+39 333 1234567",
  pickup_date: new Date(Date.now() + 2 * 86_400_000).toISOString(),
  return_date: new Date(Date.now() + 4 * 86_400_000).toISOString(),
  consent_accepted: true,
};

const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request("https://bleaderitaly.com/api/reserve", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

beforeEach(() => {
  createMock.mockReset();
  createMock.mockResolvedValue({ id: "res_123" });
});

describe("POST /api/reserve", () => {
  it("rejects cross-site origins with 403 before anything else", async () => {
    const res = await post(VALID_BODY, { origin: "https://evil.example" });
    expect(res.status).toBe(403);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("returns 503 in production when distributed rate limiting is not configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    try {
      const res = await post(VALID_BODY);
      expect(res.status).toBe(503);
      expect(await res.json()).toEqual({
        error: "Service temporarily unavailable. Please try again shortly.",
      });
      expect(createMock).not.toHaveBeenCalled();
    } finally {
      vi.stubEnv("NODE_ENV", "test");
    }
  });

  it("rejects unparseable JSON with 400", async () => {
    const res = await post("{not json");
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid request body" });
  });

  it("requires consent acceptance", async () => {
    const res = await post({ ...VALID_BODY, consent_accepted: false });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "You must accept data processing consent" });
  });

  it("requires return date after pickup date", async () => {
    const res = await post({
      ...VALID_BODY,
      pickup_date: new Date(Date.now() + 4 * 86_400_000).toISOString(),
      return_date: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Return date must be after pickup date" });
  });

  it("rejects pickup dates in the past", async () => {
    const res = await post({
      ...VALID_BODY,
      pickup_date: new Date(Date.now() - 86_400_000).toISOString(),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Pickup date cannot be in the past" });
  });

  it("persists a valid reservation and returns 201 with the id", async () => {
    const res = await post(VALID_BODY);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ success: true, reservationId: "res_123" });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          carName: "Ferrari California",
          customerName: "John Doe",
          consentAccepted: true,
          message: null,
        }),
      })
    );
  });

  it("rate-limits the 6th request from the same IP to 429", async () => {
    const headers = { "cf-connecting-ip": "203.0.113.100" };
    for (let i = 0; i < 5; i++) {
      const res = await post(VALID_BODY, headers);
      expect(res.status).toBe(201);
    }
    const res = await post("{not even json", headers);
    expect(res.status).toBe(429);
  });
});
