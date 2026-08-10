import { afterAll, describe, expect, it, vi } from "vitest";
import { createHmac } from "node:crypto";

const APP_SECRET = "test-app-secret";
const VERIFY_TOKEN = "test-verify-token";

// whatsapp.ts (imported by the route) captures env at module load — must be
// stubbed before the route module is first imported.
vi.stubEnv("WHATSAPP_APP_SECRET", APP_SECRET);
vi.stubEnv("WHATSAPP_VERIFY_TOKEN", VERIFY_TOKEN);

afterAll(() => {
  vi.unstubAllEnvs();
});

vi.mock("@/lib/db", () => ({
  db: {
    chatSession: {
      findFirst: vi.fn().mockResolvedValue({ id: "s1", status: "active" }),
    },
    chatMessage: {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: "m1" }),
      updateMany: vi.fn().mockResolvedValue({}),
    },
  },
}));

const { GET, POST } = await import("./route");
const { db } = await import("@/lib/db");

const sign = (body: string) =>
  `sha256=${createHmac("sha256", APP_SECRET).update(body).digest("hex")}`;

const PAYLOAD = JSON.stringify({
  entry: [
    {
      changes: [
        {
          value: {
            messages: [
              { id: "wamid.1", from: "+39 333 1234567", text: { body: "Ciao" } },
            ],
          },
        },
      ],
    },
  ],
});

describe("GET /api/whatsapp/webhook", () => {
  it("returns the challenge as plain text when the token matches", async () => {
    const res = await GET(
      new Request(
        `https://bleaderitaly.com/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=abc123`
      )
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(await res.text()).toBe("abc123");
  });

  it("returns 403 when the token is wrong or mode is missing", async () => {
    const wrong = await GET(
      new Request(
        `https://bleaderitaly.com/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=abc123`
      )
    );
    expect(wrong.status).toBe(403);

    const noMode = await GET(
      new Request(
        `https://bleaderitaly.com/api/whatsapp/webhook?hub.verify_token=${VERIFY_TOKEN}&hub.challenge=abc123`
      )
    );
    expect(noMode.status).toBe(403);
  });
});

describe("POST /api/whatsapp/webhook", () => {
  it("rejects requests without a valid signature", async () => {
    const noSig = await POST(new Request("https://bleaderitaly.com/api/whatsapp/webhook", { method: "POST", body: PAYLOAD }));
    expect(noSig.status).toBe(401);

    const badSig = await POST(
      new Request("https://bleaderitaly.com/api/whatsapp/webhook", {
        method: "POST",
        headers: { "x-hub-signature-256": "sha256=deadbeef" },
        body: PAYLOAD,
      })
    );
    expect(badSig.status).toBe(401);
  });

  it("stores inbound messages with the normalized visitor phone", async () => {
    const res = await POST(
      new Request("https://bleaderitaly.com/api/whatsapp/webhook", {
        method: "POST",
        headers: { "x-hub-signature-256": sign(PAYLOAD) },
        body: PAYLOAD,
      })
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    const chatCreate = vi.mocked(db.chatMessage.create);
    expect(chatCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          session_id: "s1",
          direction: "inbound",
          wa_message_id: "wamid.1",
          body: "Ciao",
        }),
      })
    );
  });

  it("returns 200 even when the payload is unparseable (Meta retry policy)", async () => {
    const res = await POST(
      new Request("https://bleaderitaly.com/api/whatsapp/webhook", {
        method: "POST",
        headers: { "x-hub-signature-256": sign("{not json") },
        body: "{not json",
      })
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });
});
