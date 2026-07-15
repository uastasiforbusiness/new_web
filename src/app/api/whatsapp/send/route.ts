import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { normalizePhone } from '@/lib/whatsapp';

const MAX_BODY = 2000;

const sendSchema = z.object({
  visitorId: z.string().trim().min(8).max(64),
  body: z.string().trim().min(1).max(MAX_BODY),
  visitorName: z.string().trim().max(100).optional(),
  visitorPhone: z.string().trim().max(30).optional(),
});

export async function POST(request: Request) {
  try {
    let raw: unknown;
    try { raw = await request.json(); } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = sendSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request body' }, { status: 400 });
    }

    const { visitorId, body: messageBody, visitorName, visitorPhone } = parsed.data;

    // Find or create session
    let session = await db.chatSession.findFirst({
      where: { visitorId, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });
    if (!session) {
      session = await db.chatSession.create({
        data: {
          visitor_id: visitorId,
          visitor_name: visitorName ?? null,
          visitor_phone: visitorPhone ? normalizePhone(visitorPhone) : null,
          status: 'active',
          mode: 'prod',
        },
      });
    }

    if (!session) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    if (visitorPhone && !session.visitor_phone) {
      await db.chatSession.update({ where: { id: session.id }, data: { visitor_phone: normalizePhone(visitorPhone) } });
    }

    // Save inbound message from the visitor
    const msg = (await db.chatMessage.create({
      data: { session_id: session.id, direction: 'inbound', body: messageBody, status: 'delivered' },
    }))!;

    // In production the concierge replies from their own WhatsApp; the outbound
    // message arrives via the webhook and is picked up by the frontend polling.
    return NextResponse.json({
      success: true,
      sessionId: session.id,
      messageId: msg.id,
      reply: 'Message received. Our concierge will reply shortly via WhatsApp.',
    }, { status: 201 });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
