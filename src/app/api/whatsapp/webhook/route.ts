import { NextResponse } from 'next/server';
import { verifyWebhookToken, verifyWebhookSignature } from '@/lib/whatsapp';
import { db } from '@/lib/db';

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

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256') ?? '';

    if (!verifyWebhookSignature(rawBody, signature)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        if (!value) continue;

        // Inbound messages
        for (const msg of value.messages ?? []) {
          const body = msg.text?.body;
          const from = msg.from?.replace(/[^\d]/g, '');
          if (!body || !from) continue;

          // Find or create session
          let session = await db.chatSession.findFirst({
            where: { visitorPhone: from, status: 'active' },
            orderBy: { updatedAt: 'desc' },
          });

          if (!session) {
            session = await db.chatSession.create({
              data: {
                visitor_id: `wa_${from}`,
                visitor_name: null,
                visitor_phone: from,
                status: 'active',
                mode: 'prod',
              },
            });
          }

          if (!session) continue;

          // Avoid duplicates
          const existing = await db.chatMessage.findFirst({
            where: { waMessageId: msg.id },
          });
          if (existing) continue;

          await db.chatMessage.create({
            data: {
              session_id: session.id,
              direction: 'inbound',
              body,
              wa_message_id: msg.id,
              status: 'delivered',
            },
          });
        }

        // Status updates
        for (const status of value.statuses ?? []) {
          if (status.id && status.status) {
            await db.chatMessage.updateMany({
              where: { waMessageId: status.id },
              data: { status: status.status },
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: true });
  }
}
