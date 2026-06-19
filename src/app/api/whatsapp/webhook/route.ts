import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  DEMO_MODE,
  verifyWebhookToken,
  verifyWebhookSignature,
  updateMessageStatus,
  normalizePhone,
} from '@/lib/whatsapp';

// ─── GET: Meta webhook verification ─────────────────────────────────────────
// Meta sends this once during webhook setup. Echo back hub.challenge.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && verifyWebhookToken(token)) {
    return new NextResponse(challenge ?? '', { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

// ─── POST: Meta event delivery (messages + statuses) ────────────────────────
// In DEMO MODE this endpoint is a no-op (no real Meta traffic expected).
export async function POST(request: Request) {
  if (DEMO_MODE) {
    // Accept & ignore — there is no real Meta webhook in demo mode.
    return NextResponse.json({ received: true, demo: true });
  }

  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256') ?? '';

    if (!verifyWebhookSignature(rawBody, signature)) {
      console.warn('[whatsapp] webhook signature verification failed');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const payload = JSON.parse(rawBody) as WhatsAppWebhookPayload;

    // Process each entry/value — Meta may batch.
    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        await processChange(change);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[whatsapp] webhook error:', error);
    // Always return 200 to Meta to avoid retries for malformed payloads
    return NextResponse.json({ received: true, error: true });
  }
}

// ─── Payload processing ─────────────────────────────────────────────────────
async function processChange(change: WhatsAppChange) {
  const value = change.value;

  // ─── Incoming message from the admin's WhatsApp (their reply) ─────────
  if (value?.messages?.length) {
    for (const msg of value.messages) {
      const text = msg.text?.body;
      const from = normalizePhone(msg.from ?? '');
      if (!text || !from) continue;

      // Match the session by visitor phone (the admin replies to the thread)
      const session = await db.chatSession.findFirst({
        where: { visitorPhone: from, status: 'active' },
        orderBy: { updatedAt: 'desc' },
      });
      if (!session) {
        console.warn(`[whatsapp] no active session for phone ${from}`);
        continue;
      }

      // Avoid duplicate writes if Meta redelivers the same message id
      const existing = await db.chatMessage.findFirst({
        where: { waMessageId: msg.id },
        select: { id: true },
      });
      if (existing) continue;

      await db.chatMessage.create({
        data: {
          sessionId: session.id,
          direction: 'outbound',
          body: text,
          waMessageId: msg.id,
          status: 'delivered',
        },
      });
      await db.chatSession.update({
        where: { id: session.id },
        data: { updatedAt: new Date() },
      });
    }
    return;
  }

  // ─── Status update for a message we sent ──────────────────────────────
  if (value?.statuses?.length) {
    for (const status of value.statuses) {
      if (status.id && status.status) {
        await updateMessageStatus(status.id, status.status);
      }
    }
  }
}

// ─── Minimal typing for the Meta webhook payload ────────────────────────────
interface WhatsAppWebhookPayload {
  object?: string;
  entry?: WhatsAppEntry[];
}
interface WhatsAppEntry {
  id?: string;
  changes?: WhatsAppChange[];
}
interface WhatsAppChange {
  field?: string;
  value?: {
    messages?: WhatsAppIncomingMessage[];
    statuses?: WhatsAppStatus[];
  };
}
interface WhatsAppIncomingMessage {
  id: string;
  from: string;
  text?: { body: string };
}
interface WhatsAppStatus {
  id: string;
  status: string;
}
