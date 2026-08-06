# B LEADER — Luxury Experiences in Salento, Puglia

Premium platform for renting supercars, yacht experiences and luxury concierge services in Salento (southern Italy). Built with **Next.js 16 + Cloudflare Pages**.

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)](https://bleader-italy.uastasiforbusiness.workers.dev)

## Stack

- **Next.js 16** App Router (with `@opennextjs/cloudflare`)
- **React 19** + TypeScript
- **Tailwind CSS 4** + tw-animate-css
- **GSAP** ScrollTrigger + **Lenis** for animations/scroll
- **Framer Motion** for transitions
- **Prisma 7** + **Cloudflare D1** (SQLite via `@prisma/adapter-d1`)
- **Resend** for confirmation emails
- **Meta Cloud API** for WhatsApp Business

## Infrastructure

| Component | Provider |
|---|---|
| Hosting | Cloudflare Pages + Workers |
| Database | Cloudflare D1 (serverless SQLite) |
| Emails | Resend |
| WhatsApp | Meta Cloud API (production) |
| Rate limiting | Upstash Redis + fallback in-memory |
| CI/CD | GitHub Actions → `wrangler deploy` |

## URLs

| Environment | URL |
|---|---|
| **Workers (current)** | `https://bleader-italy.uastasiforbusiness.workers.dev` |
| **Primary domain** | `bleaderitaly.com` (pending configuration) |
| **Italian domain** | `bleaderitaly.it` (pending configuration) |
| **Local development** | `http://localhost:3001` |

## Requirements

- Node.js 22+
- pnpm (recommended) or npm
- Wrangler CLI (`npm install -g wrangler`)

## Environment variables

Copy `.env.example` to `.env` and configure:

```bash
copy .env.example .env
```

Key variables:

- `DATABASE_URL` — `file:./dev.db` (local SQLite)
- `NEXT_PUBLIC_PHONE` — business phone number
- `NEXT_PUBLIC_EMAIL` — business email
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number without `+`
- `RESEND_API_KEY` — Resend API key
- `WHATSAPP_TOKEN` — Meta Cloud API token (production)
- `WHATSAPP_PHONE_NUMBER_ID` — Meta phone number ID

## Development

```bash
pnpm install
pnpm run db:generate
pnpm run db:push
pnpm run dev
```

The app runs at http://localhost:3001.

## Commands

| Command | Description |
| --- | --- |
| `pnpm run dev` | Development server on port 3001 |
| `pnpm run build` | Production build locally |
| `pnpm run start` | Production server on port 3000 |
| `pnpm run lint` | ESLint |
| `pnpm run cf:build` | Build for Cloudflare (`opennextjs-cloudflare build`) |
| `pnpm run cf:preview` | Local preview with Wrangler |
| `pnpm run cf:deploy` | Deploy to Cloudflare Pages |
| `pnpm run db:generate` | Generate Prisma client |
| `pnpm run db:push` | Push schema to D1 |
| `pnpm run db:migrate` | Prisma migrations in development |

## Production / Cloudflare Pages

Automatic deployment runs via GitHub Actions (`.github/workflows/deploy.yml`):

1. `ci`: `pnpm install`, `pnpm run lint`, `pnpm run cf:build`
2. `deploy`: `wrangler deploy` with secrets from GitHub Actions

Manual deployment is also possible:

```bash
pnpm run cf:deploy
```

### WhatsApp API

WhatsApp is active with Meta Cloud API. The webhook receives messages, stores them in D1, and the concierge can respond via WhatsApp. See `whatsapp_config.md` for details.

## Structure

```
src/
├── app/                           # Next.js App Router
│   ├── api/reserve/               # POST endpoint for reservations
│   ├── api/whatsapp/              # Webhook + WhatsApp messages
│   ├── fleet/page.tsx             # Vehicle fleet page
│   ├── yacht/page.tsx             # Yacht experiences page
│   ├── services/page.tsx          # Concierge services page
│   ├── about/page.tsx             # About B LEADER
│   ├── _components/home-client.tsx # Client home page
│   ├── layout.tsx                 # Root layout + JSON-LD
│   ├── sitemap.ts                 # Dynamic sitemap
│   └── robots.ts                  # Dynamic robots.txt
├── components/velox/              # UI components
│   ├── sections/                  # Fleet, Hero, Reserve, etc.
│   ├── chat/                      # WhatsApp chat
│   └── ui/                        # Buttons, cards, navbar, footer
├── lib/                           # Utilities
│   ├── db.ts                      # Prisma (D1) client
│   ├── email.ts                   # Resend integration
│   ├── rate-limit.ts              # Upstash + fallback
│   ├── seo.ts                     # buildPageMeta + JSON-LD schemas
│   └── whatsapp.ts                # Meta Cloud API client
└── hooks/                         # Custom hooks
```

## Rate limiting

The `/api/reserve` endpoint uses `@upstash/ratelimit` backed by Upstash Redis (5 requests/minute/IP). Configuration:

- **Production:** set `KV_REST_API_URL` and `KV_REST_API_TOKEN` in Cloudflare Workers (via `wrangler secret put`).
- **Local development:** if vars are missing, falls back to an in-memory rate limiter (sufficient for dev, not suitable for serverless).

## Production notes

- WhatsApp is active with Meta Cloud API. Webhook: `https://bleader-italy.uastasiforbusiness.workers.dev/api/whatsapp/webhook`
- Cloudflare secrets are managed with `wrangler secret put`
- The reservation form requires explicit consent before submitting personal data.
- No automated tests yet.
