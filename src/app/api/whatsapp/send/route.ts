import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { limit } from '@/lib/rate-limit';
import {
  DEMO_MODE,
  normalizePhone,
  scheduleDemoReply,
} from '@/lib/whatsapp';

const MAX_BODY = 2000;

const sendSchema = z.object({
  visitorId: z.string().trim().min(8).max(64),
  body: z.string().trim().min(1).max(MAX_BODY),
  visitorName: z.string().trim().max(100).optional(),
  visitorPhone: z.string().trim().max(30).optional(),
});

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { success } = await limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages. Please slow down.' },
        { status: 429 }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = sendSchema.safeParse(raw);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? 'Invalid request body' },
        { status: 400 }
      );
    }

    const { visitorId, body: messageBody, visitorName, visitorPhone } = parsed.data;

    // ─── Find or create session ──────────────────────────────────────────
    let session = await db.chatSession.findFirst({
      where: { visitorId, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });

    if (!session) {
      session = await db.chatSession.create({
        data: {
          visitorId,
          visitorName: visitorName ?? null,
          visitorPhone: visitorPhone ? normalizePhone(visitorPhone) : null,
          status: 'active',
          mode: DEMO_MODE ? 'demo' : 'prod',
        },
      });
    } else if (visitorPhone && !session.visitorPhone) {
      // Backfill phone if visitor provides it on a later message
      const phone = normalizePhone(visitorPhone);
      if (phone) {
        await db.chatSession.update({
          where: { id: session.id },
          data: { visitorPhone: phone },
        });
      }
    }

    // ─── Persist the visitor's inbound message ───────────────────────────
    const message = await db.chatMessage.create({
      data: {
        sessionId: session.id,
        direction: 'inbound',
        body: messageBody,
        status: 'delivered',
      },
    });
    await db.chatSession.update({
      where: { id: session.id },
      data: { updatedAt: new Date() },
    });

    // ─── Demo: schedule a simulated concierge reply ──────────────────────
    // ─── Prod: in this MVP, the admin replies from their WhatsApp app and
    //     the webhook stores the outbound message. No proactive send here.
    if (DEMO_MODE) {
      scheduleDemoReply(session.id, messageBody);
    }

    return NextResponse.json(
      { success: true, sessionId: session.id, messageId: message.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
