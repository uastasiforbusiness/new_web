import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const querySchema = z.object({
  sessionId: z.string().trim().min(1),
  since: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      sessionId: searchParams.get('sessionId'),
      since: searchParams.get('since'),
      limit: searchParams.get('limit'),
    });
    if (!parsed.success) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    const { sessionId, since, limit } = parsed.data;
    const isInitialLoad = since === 0;

    const messages = await db.chatMessage.findMany({
      where: {
        sessionId,
        ...(isInitialLoad ? {} : { createdAt: { gt: new Date(since) } }),
      },
      orderBy: { createdAt: isInitialLoad ? 'desc' : 'asc' },
      take: isInitialLoad ? limit : undefined,
    });

    const ordered = isInitialLoad ? messages.reverse() : messages;

    return NextResponse.json({
      messages: ordered.map((m) => ({
        id: m.id,
        direction: m.direction,
        body: m.body,
        status: m.status,
        ts: new Date(m.created_at).getTime(),
      })),
      serverTime: Date.now(),
    });
  } catch (error) {
    console.error('WhatsApp messages poll error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
