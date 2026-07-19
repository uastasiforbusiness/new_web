<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-18 | Updated: 2026-07-18 -->

# lib

## Purpose

Server-oriented and isomorphic utilities: D1/memory database access, Resend email, Meta WhatsApp Cloud API, CSRF origin checks, Upstash rate limiting, SEO metadata/JSON-LD, and small className helpers.

## Key Files

| File | Description |
|------|-------------|
| `db.ts` | Unified DB API: prefers Cloudflare D1 via OpenNext context; chat falls back to memory |
| `db-memory.ts` | In-memory chat store for local Node without D1 |
| `email.ts` | Reservation confirmation + admin emails via Resend (demo mode supported) |
| `whatsapp.ts` | Graph API send/template, webhook verify (token + HMAC signature), phone normalize, status |
| `csrf.ts` | Origin allowlist check for mutating browser requests |
| `rate-limit.ts` | IP rate limit (Upstash if configured; permissive local fallback) |
| `seo.ts` | `SITE`, `CONTACT`, `buildPageMeta`, LocalBusiness/product/breadcrumb schemas |
| `utils.ts` | `cn()` — `clsx` + `tailwind-merge` |
| `experiences.ts` | Bookable experience catalog for form + API allowlist (no UI deps) |

## Subdirectories

_(None.)_

## For AI Agents

### Working In This Directory
- **D1 is production truth.** Extend `db.ts` SQL and keep `prisma/d1/init.sql` in sync; do not rely on Prisma Client at runtime in Workers.
- Never import Meta tokens into client bundles; only `NEXT_PUBLIC_*` may ship to the browser.
- Preserve timing-safe webhook signature verification and demo-mode behavior when token is absent.
- Reservation emails and WhatsApp sends should fail gracefully with clear logs, without leaking secrets.

### Testing Requirements
- Local without D1: chat memory path; reservations need D1/Worker context.
- WhatsApp: `DEMO_MODE` when `WHATSAPP_TOKEN` missing; use `/api/whatsapp/status` for config presence.
- CSRF: verify `CSRF_ALLOWED_ORIGINS` includes official domains and local dev ports.

### Common Patterns
- Dynamic import of `@opennextjs/cloudflare` `getCloudflareContext` for bindings.
- Zod schemas live next to route handlers; pure crypto/API helpers live here.

## Dependencies

### Internal
- Consumed by `src/app/api/**` and layout/page SEO.
- Schema alignment: `prisma/schema.prisma`.

### External
- `@opennextjs/cloudflare`, `resend`, `crypto` (Node/Workers compat), `@upstash/*`, `clsx`, `tailwind-merge`.

<!-- MANUAL: -->
