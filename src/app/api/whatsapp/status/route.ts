import { NextResponse } from 'next/server';
import { getWhatsAppPublicStatus, probeGraphToken } from '@/lib/whatsapp';

export const runtime = 'nodejs';

/**
 * GET /api/whatsapp/status
 * Public diagnostic (no secret values). Use to verify remote config.
 * ?probe=1 also hits Graph to validate the token (does not send a message).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wantProbe = searchParams.get('probe') === '1';

  const status = getWhatsAppPublicStatus();
  let graph: Awaited<ReturnType<typeof probeGraphToken>> | undefined;

  if (wantProbe) {
    graph = await probeGraphToken();
  }

  // Soft-check D1 availability without leaking internals
  let database: { ok: boolean; error?: string } = { ok: false };
  try {
    const { db } = await import('@/lib/db');
    // Lightweight: try findFirst that returns null if empty
    await db.chatSession.findFirst({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
    });
    database = { ok: true };
  } catch (err) {
    database = {
      ok: false,
      error: err instanceof Error ? err.message : 'db-error',
    };
  }

  const healthy =
    status.configured &&
    status.hasVerifyToken &&
    status.hasAppSecret &&
    database.ok &&
    (wantProbe ? Boolean(graph?.ok) : true);

  return NextResponse.json(
    {
      healthy,
      whatsapp: status,
      database,
      graph: graph ?? null,
      hints: !status.configured
        ? [
            'Set WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID as Worker secrets (wrangler secret put).',
          ]
        : graph && !graph.ok
          ? [
              'Meta token invalid or expired. Generate a new permanent token in Meta Business Suite / System User and run: wrangler secret put WHATSAPP_TOKEN',
              graph.errorCode === 190
                ? 'Error 190: session invalid — user logged out or token revoked.'
                : undefined,
            ].filter(Boolean)
          : !database.ok
            ? [
                'D1 binding missing — this app must run on Cloudflare Workers. Deploy with npm run cf:deploy.',
              ]
            : [],
    },
    { status: healthy ? 200 : 503 }
  );
}
