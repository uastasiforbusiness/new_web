/**
 * Internal markdown-for-agents endpoint.
 *
 * Invoked by src/middleware.ts when a request carries Accept: text/markdown.
 * Fetches the original page (without the markdown Accept header to avoid
 * loops), converts the HTML to markdown, and returns it with the headers
 * documented in the Markdown for Agents spec:
 *   - Content-Type: text/markdown; charset=utf-8
 *   - Vary: Accept
 *   - x-markdown-tokens: <count>
 *
 * The target page is passed as a catch-all path segment: /api/md/<path>.
 * We use a path segment (not a query string) because Next.js rewrite
 * reliably forwards path segments to route handlers, while query string
 * forwarding has been historically inconsistent in dev mode.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 *
 * Security: this route MUST NOT be crawlable. It is excluded from robots.txt
 * via /api/ disallow and from sitemap. The proxy rewrites to it only for
 * same-origin HTML routes.
 */
import { NextRequest, NextResponse } from "next/server";
import { htmlToMarkdown, estimateTokens } from "@/lib/markdown";

export const runtime = "nodejs";

const SAFE_ORIGIN_PREFIXES = ["http://localhost", "http://127.0.0.1"];

function isSafeInternalTarget(url: URL, siteUrl: string, incomingOrigin: string): boolean {
  // Allow the incoming origin (same-server fetch — the normal case).
  if (url.origin === incomingOrigin) return true;
  // Allow localhost variants (dev).
  for (const prefix of SAFE_ORIGIN_PREFIXES) {
    if (url.origin.startsWith(prefix)) return true;
  }
  // In prod, allow fetch against the canonical site URL when the worker is
  // behind Cloudflare (the request gets routed back through the edge).
  try {
    const site = new URL(siteUrl);
    return url.hostname === site.hostname;
  } catch {
    return false;
  }
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bleaderitaly.com";
  const { path } = await ctx.params;
  // Reconstruct the original pathname from the catch-all segments.
  // "_root" is the sentinel used by proxy.ts for the homepage ("/"), since
  // catch-all routes require at least one path segment.
  const joined = path.join("/");
  const targetPath = joined === "_root" ? "/" : "/" + joined;

  // Resolve target against the incoming request's origin (so dev loopback
  // works), not against NEXT_PUBLIC_SITE_URL (which would try to reach prod).
  const incomingOrigin = req.nextUrl.origin;
  let targetUrl: URL;
  try {
    targetUrl = new URL(targetPath, incomingOrigin);
  } catch {
    return NextResponse.json({ error: "invalid path" }, { status: 400 });
  }

  if (!isSafeInternalTarget(targetUrl, siteUrl, incomingOrigin)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // Fetch the original page WITHOUT Accept: text/markdown so we get HTML.
  const upstream = await fetch(targetUrl.toString(), {
    headers: { Accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
  });

  if (!upstream.ok) {
    return new NextResponse(`upstream ${upstream.status}`, { status: upstream.status });
  }

  const html = await upstream.text();
  const markdown = htmlToMarkdown(html, targetUrl.toString());
  const tokens = estimateTokens(markdown);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "vary": "Accept",
      "x-markdown-tokens": String(tokens),
      "cache-control": "public, max-age=3600",
    },
  });
}
