import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const querySchema = z.object({
  sessionId: z.string().trim().min(8).max(64),
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

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Missing or invalid sessionId' },
        { status: 400 }
      );
    }

    const { sessionId, since, limit } = parsed.data;

    // ─── Sanity check: session exists ────────────────────────────────────
    const session = await db.chatSession.findUnique({
      where: { id: sessionId },
      select: { id: true },
    });
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // ─── Fetch messages ──────────────────────────────────────────────────
    // When since=0 (initial load), fetch the last N messages.
    // When since>0 (delta poll), fetch only newer messages.
    const sinceDate = new Date(since);
    const isInitialLoad = since === 0;

    const messages = await db.chatMessage.findMany({
      where: {
        sessionId,
        createdAt: isInitialLoad ? undefined : { gt: sinceDate },
      },
      orderBy: { createdAt: isInitialLoad ? 'desc' : 'asc' },
      take: isInitialLoad ? limit : undefined,
      select: {
        id: true,
        direction: true,
        body: true,
        status: true,
        createdAt: true,
      },
    });

    // Initial loads come in reverse-chronological order — flip to asc
    const ordered = isInitialLoad ? messages.reverse() : messages;

    return NextResponse.json({
      messages: ordered.map((m) => ({
        id: m.id,
        direction: m.direction,
        body: m.body,
        status: m.status,
        ts: m.createdAt.getTime(),
      })),
      serverTime: Date.now(),
    });
  } catch (error) {
    console.error('WhatsApp messages poll error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
