import { NextResponse } from 'next/server';
import {
  verifyWebhookToken,
  verifyWebhookSignature,
} from '@/lib/whatsapp';

// ─── GET: Meta webhook verification ──
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

// ─── POST: Meta event delivery ──
export async function POST() {
  return NextResponse.json({ received: true });
}
