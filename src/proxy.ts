/**
 * Markdown content negotiation for AI agents (Next.js 16 proxy layer).
 *
 * When a client sends `Accept: text/markdown`, rewrite to the internal
 * markdown converter endpoint `/api/_md?p=<original-path>`. The handler
 * fetches the HTML version and converts it on the fly.
 *
 * Why a proxy layer (not the route handler directly): it lets us
 * transparently serve markdown at the canonical URL (/about, /fleet, ...)
 * so agents don't need to know about /api/_md. The original URL is
 * preserved for caching, SEO, and link discovery.
 *
 * Matchers exclude everything that is not an HTML page:
 *   - /api/*          (handlers)
 *   - /_next/*        (static assets, RSC payloads)
 *   - /favicon.svg, /robots.txt, /sitemap.xml, /opengraph-image
 *   - /images/*       (static media)
 *   - anything with a file extension (handled by static router)
 *
 * @see https://datatracker.ietf.org/doc/html/rfc9110 (Accept, §12.5.1)
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Accept: text/markdown, or a weighted variant like "text/markdown;q=0.9".
  // Match only when the client actually prefers markdown over html.
  const parts = accept.split(",").map((p) => p.trim().toLowerCase());
  let mdQ = 0;
  let htmlQ = 1; // default per RFC 9110 if not listed
  for (const part of parts) {
    const [mime, ...params] = part.split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.split("=")[1]) : 1;
    if (mime === "text/markdown") mdQ = q;
    if (mime === "text/html" || mime === "application/xhtml+xml") htmlQ = q;
    if (mime === "*/*" && mdQ === 0) mdQ = q * 0.5; // */* is weaker than explicit
  }
  return mdQ > 0 && mdQ >= htmlQ;
}

export function proxy(req: NextRequest): NextResponse {
  if (!wantsMarkdown(req.headers.get("accept"))) {
    return NextResponse.next();
  }

  const url = req.nextUrl;
  // Rewrite to the catch-all route handler /api/md/<path>. We pass the
  // original path as URL segments (not query string) because Next.js
  // reliably forwards path segments through rewrites.
  // Homepage "/" maps to /api/md/_root because catch-all requires >=1 segment.
  const pathPart = url.pathname === "/" ? "/_root" : url.pathname;
  const target = new URL(`/api/md${pathPart}`, url.origin);
  return NextResponse.rewrite(target);
}

export const config = {
  matcher: [
    // Match all paths except: /api, /_next, static assets, well-known files.
    "/((?!api|_next|favicon\\.svg|robots\\.txt|sitemap\\.xml|opengraph-image|images|.*\\.).*)",
  ],
};
