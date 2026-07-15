import { createHmac, timingSafeEqual } from 'crypto';

// ─── Config ─────────────────────────────────────────────────────────────────
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_API_VERSION || 'v25.0';

// Flag informativo: el chat funciona en producción con la Meta Cloud API.
// DEMO_MODE solo está activo si falta el token (no debería en prod).
export const DEMO_MODE = !TOKEN;

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
 * Returns ok:false if WhatsApp is not configured (missing token/phone id).
 */
export async function sendTextMessage(to: string, body: string): Promise<SendResult> {
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

    const data: { error?: unknown; messages?: { id?: string }[] } = await res.json();
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

// ─── Status helpers ─────────────────────────────────────────────────────────
/**
 * Update the delivery/read status of a previously-sent message.
 * Called from the webhook handler when Meta sends status updates.
 */
export async function updateMessageStatus(
  waMessageId: string,
  status: string
): Promise<void> {
  const { db } = await import('./db');
  try {
    await db.chatMessage.updateMany({
      where: { waMessageId },
      data: { status },
    });
  } catch (err) {
    console.error('[whatsapp] failed to update status:', err);
  }
}
