import { createHmac, timingSafeEqual } from 'crypto';

// ─── Config ─────────────────────────────────────────────────────────────────
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_API_VERSION || 'v25.0';
/** Approved template for business-initiated first contact (default Meta sandbox: hello_world). */
const TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world';
const TEMPLATE_LANG = process.env.WHATSAPP_TEMPLATE_LANG || 'en_US';

// DEMO only when token missing — never force demo when secrets exist.
export const DEMO_MODE = !TOKEN;

export function isConfigured(): boolean {
  return Boolean(TOKEN && PHONE_NUMBER_ID);
}

export function getWhatsAppPublicStatus() {
  return {
    configured: isConfigured(),
    hasToken: Boolean(TOKEN),
    hasPhoneNumberId: Boolean(PHONE_NUMBER_ID),
    hasAppSecret: Boolean(APP_SECRET),
    hasVerifyToken: Boolean(VERIFY_TOKEN),
    graphApiVersion: GRAPH_API_VERSION,
    templateName: TEMPLATE_NAME,
    templateLang: TEMPLATE_LANG,
    demoMode: DEMO_MODE,
  };
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

// ─── Cloud API: send helpers ────────────────────────────────────────────────
export interface SendResult {
  ok: boolean;
  waMessageId?: string;
  error?: string;
  /** Graph error code when available (e.g. 190 = invalid token) */
  errorCode?: number;
  kind?: 'text' | 'template';
}

async function graphSend(payload: Record<string, unknown>): Promise<SendResult> {
  if (!isConfigured()) {
    console.warn('[whatsapp] WHATSAPP_TOKEN / PHONE_NUMBER_ID not set — skipping send');
    return { ok: false, error: 'not-configured' };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data: {
      error?: { message?: string; code?: number; error_subcode?: number; type?: string };
      messages?: { id?: string }[];
    } = await res.json();

    if (!res.ok) {
      console.error('[whatsapp] send failed:', data);
      return {
        ok: false,
        error: data?.error?.message || JSON.stringify(data?.error || data),
        errorCode: data?.error?.code,
      };
    }

    const waMessageId = data?.messages?.[0]?.id;
    return { ok: true, waMessageId };
  } catch (err) {
    console.error('[whatsapp] send exception:', err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Send a free-form text message (only allowed inside the 24h customer-care window,
 * i.e. after the user has messaged the business number).
 */
export async function sendTextMessage(to: string, body: string): Promise<SendResult> {
  const phone = normalizePhone(to);
  if (!phone) return { ok: false, error: 'invalid-phone' };

  const result = await graphSend({
    messaging_product: 'whatsapp',
    to: phone,
    type: 'text',
    text: { body, preview_url: false },
  });
  return { ...result, kind: 'text' };
}

/**
 * Send an approved template (required for business-initiated first contact).
 */
export async function sendTemplateMessage(
  to: string,
  templateName: string = TEMPLATE_NAME,
  languageCode: string = TEMPLATE_LANG
): Promise<SendResult> {
  const phone = normalizePhone(to);
  if (!phone) return { ok: false, error: 'invalid-phone' };

  const result = await graphSend({
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  });
  return { ...result, kind: 'template' };
}

/**
 * First outreach: send the approved template (required for business-initiated
 * first contact when no 24h customer-care window exists).
 *
 * The old logic tried free-form text first, but the Graph API returns HTTP 200
 * with `message_status: "accepted"` even when it cannot deliver outside the
 * window, so the template fallback was never reached.
 *
 * If the template itself fails, falls back to free-form text (useful when a
 * window already exists from a prior inbound message).
 */
export async function sendFirstContact(to: string, textBody: string): Promise<SendResult> {
  const tmpl = await sendTemplateMessage(to);
  if (tmpl.ok) {
    console.log('[whatsapp] template "%s" sent to %s', TEMPLATE_NAME, to);
    return tmpl;
  }

  // Template not available / not approved — try free-form as emergency fallback.
  console.warn(
    '[whatsapp] template failed (%s); falling back to free-form text',
    tmpl.error
  );
  const text = await sendTextMessage(to, textBody);
  if (text.ok) return text;

  return {
    ok: false,
    error: `template: ${tmpl.error || 'fail'}; text: ${text.error || 'fail'}`,
    errorCode: tmpl.errorCode ?? text.errorCode,
  };
}

/** Lightweight Graph probe — does not send messages. */
export async function probeGraphToken(): Promise<{
  ok: boolean;
  displayPhoneNumber?: string;
  verifiedName?: string;
  error?: string;
  errorCode?: number;
}> {
  if (!isConfigured()) {
    return { ok: false, error: 'not-configured' };
  }
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}?fields=display_phone_number,verified_name,quality_rating`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
    const data: {
      display_phone_number?: string;
      verified_name?: string;
      error?: { message?: string; code?: number };
    } = await res.json();
    if (!res.ok) {
      return {
        ok: false,
        error: data?.error?.message || 'graph-error',
        errorCode: data?.error?.code,
      };
    }
    return {
      ok: true,
      displayPhoneNumber: data.display_phone_number,
      verifiedName: data.verified_name,
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ─── Webhook verification ───────────────────────────────────────────────────
/**
 * Meta calls GET /webhook with hub.verify_token & hub.challenge during setup.
 * Returns true if token matches.
 */
export function verifyWebhookToken(token: string | null): boolean {
  if (!VERIFY_TOKEN || !token) return false;
  return token === VERIFY_TOKEN;
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
