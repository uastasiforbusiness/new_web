import { createHmac, timingSafeEqual } from 'crypto';
import { db } from './db';

// ─── Config ─────────────────────────────────────────────────────────────────
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_API_VERSION || 'v21.0';

/**
 * DEMO MODE — mirrors the RESEND_DEMO_MODE pattern in email.ts.
 *
 * When true (default), no calls are made to the Meta Cloud API. Visitor
 * messages are stored in the DB and a simulated concierge bot replies after
 * a short delay. Flip to false once your Meta Business number is approved.
 */
export const DEMO_MODE = process.env.WHATSAPP_DEMO_MODE !== 'false';

export function isConfigured(): boolean {
  return Boolean(TOKEN && PHONE_NUMBER_ID);
}

// ─── Phone normalization ────────────────────────────────────────────────────
/**
 * Normalize a user-entered phone string to E.164 digits (no +, no spaces).
 * e.g. "+52 441 213 2652" → "524412132652"
 * Returns null if the result is not at least 8 digits.
 */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/[^\d]/g, '');
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

export function isValidPhone(input: string): boolean {
  return normalizePhone(input) !== null;
}

// ─── Cloud API: send a text message ─────────────────────────────────────────
export interface SendResult {
  ok: boolean;
  waMessageId?: string;
  error?: string;
}

/**
 * Send a text message to a visitor via the WhatsApp Cloud API.
 * No-op (returns ok:false) in DEMO MODE or when unconfigured.
 */
export async function sendTextMessage(to: string, body: string): Promise<SendResult> {
  if (DEMO_MODE) {
    return { ok: false, error: 'demo-mode' };
  }
  if (!isConfigured()) {
    console.warn('[whatsapp] WHATSAPP_TOKEN / PHONE_NUMBER_ID not set — skipping send');
    return { ok: false, error: 'not-configured' };
  }

  const phone = normalizePhone(to);
  if (!phone) return { ok: false, error: 'invalid-phone' };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body, preview_url: false },
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error('[whatsapp] send failed:', data);
      return { ok: false, error: JSON.stringify(data?.error || data) };
    }

    const waMessageId = data?.messages?.[0]?.id;
    return { ok: true, waMessageId };
  } catch (err) {
    console.error('[whatsapp] send exception:', err);
    return { ok: false, error: String(err) };
  }
}

// ─── Webhook verification ───────────────────────────────────────────────────
/**
 * Meta calls GET /webhook with hub.verify_token & hub.challenge during setup.
 * Returns the challenge string if the token matches, else null.
 */
export function verifyWebhookToken(token: string | null): string | null {
  if (!VERIFY_TOKEN || !token) return null;
  if (token === VERIFY_TOKEN) return token;
  return null;
}

/**
 * Verify the x-hub-signature-256 header sent by Meta on POST webhooks.
 * Uses HMAC SHA256 with the App Secret.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string): boolean {
  if (!APP_SECRET || !signatureHeader) return false;
  const expected = signatureHeader.startsWith('sha256=')
    ? signatureHeader.slice(7)
    : signatureHeader;

  const hmac = createHmac('sha256', APP_SECRET).update(rawBody).digest('hex');

  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(hmac, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ─── Demo concierge bot ─────────────────────────────────────────────────────
const DEMO_RESPONSES = [
  'Thank you for your message. Our concierge team will assist you shortly.',
  'We appreciate your interest in B Leader. How may we tailor this to your needs?',
  'Excellent choice. Could you share your preferred dates so we can check availability?',
  'Consider it arranged. A team member will follow up with full details.',
  'Of course — all our experiences include a dedicated chauffeur and 24/7 support.',
];

/**
 * In DEMO MODE, generate a plausible concierge reply to the visitor's message.
 * Deterministic-ish: picks based on message length so it varies naturally.
 */
export function generateDemoReply(visitorMessage: string): string {
  const idx = visitorMessage.length % DEMO_RESPONSES.length;
  return DEMO_RESPONSES[idx];
}

/**
 * Schedule a simulated outbound reply in DEMO MODE.
 * Writes an "outbound" message after a delay (non-blocking — uses setImmediate
 * so the request can return immediately).
 */
export function scheduleDemoReply(sessionId: string, visitorMessage: string): void {
  const reply = generateDemoReply(visitorMessage);
  const delay = 1500 + Math.random() * 1500; // 1.5s – 3s

  setTimeout(async () => {
    try {
      await db.chatMessage.create({
        data: {
          session_id: sessionId,
          direction: 'outbound',
          body: reply,
          status: 'delivered',
        },
      });
      console.log(`[whatsapp][DEMO] auto-reply queued for session ${sessionId.slice(-8)}`);
    } catch (err) {
      console.error('[whatsapp][DEMO] failed to queue reply:', err);
    }
  }, delay);
}

// ─── Status helpers ─────────────────────────────────────────────────────────
/**
 * Update the delivery/read status of a previously-sent message.
 * Called from the webhook handler when Meta sends status updates.
 */
export async function updateMessageStatus(
  waMessageId: string,
  status: string
): Promise<void> {
  try {
    await db.chatMessage.updateMany({
      where: { waMessageId },
      data: { status },
    });
  } catch (err) {
    console.error('[whatsapp] failed to update status:', err);
  }
}
