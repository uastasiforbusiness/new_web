import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { normalizePhone, sendFirstContact, sendTextMessage } from '@/lib/whatsapp';

// Node runtime required for crypto HMAC + stable WhatsApp Graph fetch
export const runtime = 'nodejs';

const MAX_BODY = 2000;

const sendSchema = z.object({
  visitorId: z.string().trim().min(8).max(64),
  body: z.string().trim().min(1).max(MAX_BODY),
  visitorName: z.string().trim().max(100).optional(),
  visitorPhone: z.string().trim().max(30).optional(),
  /** When true, treat as first outreach (template fallback). */
  firstContact: z.boolean().optional(),
});

export async function POST(request: Request) {
  console.log('[whatsapp send] POST request received');
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = sendSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request body' },
        { status: 400 }
      );
    }

    const {
      visitorId,
      body: messageBody,
      visitorName,
      visitorPhone,
      firstContact,
    } = parsed.data;
    console.log('[whatsapp send] data parsed:', {
      visitorId,
      hasPhone: Boolean(visitorPhone),
      firstContact: Boolean(firstContact),
    });

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
      console.error('[whatsapp send] failed to create session');
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
    console.log('[whatsapp send] session active:', session.id);

    if (visitorPhone && !session.visitor_phone) {
      await db.chatSession.update({
        where: { id: session.id },
        data: { visitor_phone: normalizePhone(visitorPhone) },
      });
    }

    // Save inbound message from the visitor (website form)
    const msg = (await db.chatMessage.create({
      data: {
        session_id: session.id,
        direction: 'inbound',
        body: messageBody,
        status: 'delivered',
      },
    })) as { id: string } | null;

    if (!msg?.id) {
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    const targetPhone = visitorPhone || session.visitor_phone;
    let wa: {
      ok: boolean;
      waMessageId?: string;
      error?: string;
      errorCode?: number;
      kind?: string;
    } | null = null;

    if (targetPhone) {
      const welcome =
        'Thank you for contacting B LEADER. Our concierge will reply shortly.\n\n— B LEADER Concierge';

      // First website contact usually has no 24h window → template fallback.
      const isFirst = firstContact !== false;
      wa = isFirst
        ? await sendFirstContact(targetPhone, welcome)
        : await sendTextMessage(targetPhone, welcome);

      if (wa.ok) {
        console.log(
          '[whatsapp send] outbound ok kind=%s waMessageId=%s',
          wa.kind,
          wa.waMessageId
        );
        await db.chatMessage.create({
          data: {
            session_id: session.id,
            direction: 'outbound',
            body:
              wa.kind === 'template'
                ? '[WhatsApp template sent — check your WhatsApp for our welcome message]'
                : welcome,
            wa_message_id: wa.waMessageId ?? null,
            status: 'sent',
          },
        });
      } else {
        console.warn(
          '[whatsapp send] outbound failed code=%s err=%s',
          wa.errorCode,
          wa.error
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        messageId: msg.id,
        reply: 'Message received. Our concierge will reply shortly via WhatsApp.',
        whatsapp: wa
          ? {
              sent: wa.ok,
              kind: wa.kind ?? null,
              error: wa.ok ? null : wa.error ?? 'send-failed',
              errorCode: wa.errorCode ?? null,
            }
          : { sent: false, error: 'no-phone', kind: null, errorCode: null },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
