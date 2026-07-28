/**
 * Client IP resolution for rate limiting.
 *
 * On Cloudflare Workers the TLS connection terminates at Cloudflare's edge,
 * which reports the true client IP in `CF-Connecting-IP`. That header cannot
 * be forged by the client, unlike `X-Forwarded-For`, whose left-most entry is
 * attacker-controlled unless a trusted proxy appends it.
 */
export function getClientIp(request: Request): string {
  // Preferred: set by Cloudflare, un-spoofable on the Workers runtime.
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  // Fallback for local dev / non-Cloudflare environments.
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
