import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const MAX_BODY = 2000;

const sendSchema = z.object({
  visitorId: z.string().trim().min(8).max(64),
  body: z.string().trim().min(1).max(MAX_BODY),
  visitorName: z.string().trim().max(100).optional(),
  visitorPhone: z.string().trim().max(30).optional(),
});

const DEMO_REPLIES = [
  'Thank you for your message. Our concierge team will assist you shortly.',
  'We appreciate your interest in B Leader. How may we tailor this to your needs?',
  'Excellent choice. Could you share your preferred dates so we can check availability?',
  'Consider it arranged. A team member will follow up with full details.',
  'Of course — all our experiences include a dedicated chauffeur and 24/7 support.',
];

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
    let session = await db.chatSession.findFirst({ where: { visitorId, status: 'active' }, orderBy: { createdAt: 'desc' } });
    if (!session) {
      session = await db.chatSession.create({
        data: {
          visitor_id: visitorId,
          visitor_name: visitorName ?? null,
          visitor_phone: visitorPhone ?? null,
          status: 'active',
          mode: 'demo',
        },
      });
    } else if (visitorPhone && !session.visitor_phone) {
      await db.chatSession.update({ where: { id: session.id }, data: { visitor_phone: visitorPhone } });
    }

    // Save inbound message
    const msg = await db.chatMessage.create({
      data: { session_id: session.id, direction: 'inbound', body: messageBody, status: 'delivered' },
    });

    // Demo auto-reply
    const replyIdx = messageBody.length % DEMO_REPLIES.length;
    await db.chatMessage.create({
      data: { session_id: session.id, direction: 'outbound', body: DEMO_REPLIES[replyIdx], status: 'delivered' },
    });

    return NextResponse.json({
      success: true, sessionId: session.id, messageId: msg.id, reply: DEMO_REPLIES[replyIdx],
    }, { status: 201 });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
