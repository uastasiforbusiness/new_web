/**
 * CSRF protection helper for API routes.
 *
 * Verifies that incoming requests originate from allowed sources
 * by checking the Origin and Referer headers against an allowlist.
 * Server-to-server requests (no Origin/Referer) are allowed.
 */

const ALLOWED_ORIGINS = process.env.CSRF_ALLOWED_ORIGINS
  ? process.env.CSRF_ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
  : [
      "http://localhost:3000",
      "http://localhost:3001",
      // Official domains
      "https://bleaderitaly.com",
      "https://www.bleaderitaly.com",
      "https://bleaderitaly.it",
      "https://www.bleaderitaly.it",
      // Cloudflare Workers (pre-custom-domain / preview)
      "https://bleader-italy.uastasiforbusiness.workers.dev",
      "https://bleader-italy.pages.dev",
      "https://*.bleader-italy.pages.dev",
    ];

export interface OriginCheckResult {
  ok: boolean;
  error?: string;
}

/**
 * Check the Origin/Referer of a request against the allowlist.
 * Returns { ok: true } if the request is allowed, or { ok: false, error }
 * if it appears to be a cross-site request.
 */
export function checkOrigin(request: Request): OriginCheckResult {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // If both are missing, assume server-side / same-origin fetch
  if (!origin && !referer) {
    return { ok: true };
  }

  // Try origin first, then referer as fallback
  const source = origin || referer;
  if (!source) {
    return { ok: true };
  }

  try {
    const url = new URL(source);
    const isAllowed = ALLOWED_ORIGINS.some((allowed) => {
      try {
        const allowedUrl = new URL(allowed);
        return url.origin === allowedUrl.origin;
      } catch {
        return false;
      }
    });

    if (!isAllowed) {
      return {
        ok: false,
        error: `CSRF validation failed: origin "${url.origin}" not allowed`,
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "CSRF validation failed: invalid origin header",
    };
  }
}
