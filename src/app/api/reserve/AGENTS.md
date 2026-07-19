<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-18 | Updated: 2026-07-18 -->

# reserve

## Purpose

Reservation API: validates and stores an **experience** booking request (yacht packages, wedding car, luxury car, party service), enforces consent and date rules, rate-limits by IP, checks CSRF origin, persists to D1, and sends customer/admin emails via Resend.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | `POST` handler: Zod (`experience_name` / `experience_category`), `checkOrigin`, `limit`, `db.reservation.create`, `sendReservationEmails` |

## Subdirectories

_(None.)_

## For AI Agents

### Working In This Directory
- Keep Zod schema in lockstep with `reservation-form.tsx` field names (`experience_name`, `experience_category`, snake_case dates/consent).
- Allowed experience names: `BOOKABLE_EXPERIENCE_NAMES` from `@/lib/experiences`.
- D1 still stores name/category in columns `car_name` / `car_variant` (legacy column names; semantic is experience).
- `consent_accepted` must be `true`; start date not in the past; end date ≥ start date.
- Reservations **require D1** — memory fallback is chat-only.
- Preserve max length caps and phone regex.

### Testing Requirements
- Preview/Worker with D1: happy path + 4xx validation + origin rejection.
- Confirm emails respect `RESEND_DEMO_MODE`.

### Common Patterns
- `NextResponse.json` with status codes; client IP from `x-forwarded-for` / `x-real-ip`.

## Dependencies

### Internal
- `@/lib/db`, `@/lib/email`, `@/lib/csrf`, `@/lib/rate-limit`, `@/lib/experiences`.

### External
- Zod, OpenNext Cloudflare context, Resend.

<!-- MANUAL: -->
