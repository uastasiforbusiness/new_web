import { NextResponse } from 'next/server';
import { z } from 'zod';

const MAX_BODY = 2000;

const sendSchema = z.object({
  visitorId: z.string().trim().min(8).max(64),
  body: z.string().trim().min(1).max(MAX_BODY),
  visitorName: z.string().trim().max(100).optional(),
  visitorPhone: z.string().trim().max(30).optional(),
});

// ─── In-memory store for development ───
interface InMemoryMessage {
  id: string;
  sessionId: string;
  direction: string;
  body: string;
  status: string;
  createdAt: Date;
}

interface InMemorySession {
  id: string;
  visitorId: string;
  visitorName: string | null;
  visitorPhone: string | null;
  status: string;
  messages: InMemoryMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const sessions = new Map<string, InMemorySession>();
let messageCounter = 0;

function getOrCreateSession(visitorId: string, name?: string, phone?: string): InMemorySession {
  // Find existing active session
  for (const s of sessions.values()) {
    if (s.visitorId === visitorId && s.status === 'active') return s;
  }

  const id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const session: InMemorySession = {
    id,
    visitorId,
    visitorName: name ?? null,
    visitorPhone: phone ?? null,
    status: 'active',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sessions.set(id, session);
  return session;
}

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

    const { visitorId, body: messageBody, visitorName, visitorPhone } = parsed.data;
    const session = getOrCreateSession(visitorId, visitorName, visitorPhone);

    const msg: InMemoryMessage = {
      id: `msg_${++messageCounter}`,
      sessionId: session.id,
      direction: 'inbound',
      body: messageBody,
      status: 'delivered',
      createdAt: new Date(),
    };
    session.messages.push(msg);
    session.updatedAt = new Date();

    // Demo auto-reply
    const replyIdx = messageBody.length % DEMO_REPLIES.length;
    const reply: InMemoryMessage = {
      id: `msg_${++messageCounter}`,
      sessionId: session.id,
      direction: 'outbound',
      body: DEMO_REPLIES[replyIdx],
      status: 'delivered',
      createdAt: new Date(Date.now() + 1500),
    };
    session.messages.push(reply);

    return NextResponse.json(
      { success: true, sessionId: session.id, messageId: msg.id, reply: reply.body },
      { status: 201 }
    );
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
