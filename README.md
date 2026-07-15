# B LEADER — Luxury Experiences in Salento, Puglia

Landing premium para alquiler de superdeportivos, experiencias en yate y servicios concierge de lujo en Salento (sur de Italia). Construida con **Next.js 16 + Cloudflare Pages**.

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)](https://bleader-italy.uastasiforbusiness.workers.dev)

## Stack

- **Next.js 16** App Router (con `@opennextjs/cloudflare`)
- **React 19** + TypeScript
- **Tailwind CSS 4** + tw-animate-css
- **GSAP** ScrollTrigger + **Lenis** para animaciones/scroll
- **Framer Motion** para transiciones
- **Prisma 7** + **Cloudflare D1** (SQLite via `@prisma/adapter-d1`)
- **Resend** para emails de confirmación
- **Meta Cloud API** para WhatsApp Business

## Infraestructura

| Componente | Proveedor | ...
|---|---|
| Hosting | Cloudflare Pages + Workers |
| Base de datos | Cloudflare D1 (SQLite serverless) |
| Emails | Resend |
| WhatsApp | Meta Cloud API (producción) |
| Rate limiting | Upstash Redis + fallback in-memory |
| CI/CD | GitHub Actions → `wrangler deploy` |

## URLs

| Entorno | URL |
|---|---|
| **Workers (actual)** | `https://bleader-italy.uastasiforbusiness.workers.dev` |
| **Dominio principal** | `bleaderitaly.com` (configuración pendiente) |
| **Dominio Italia** | `bleaderitaly.it` (configuración pendiente) |
| **Desarrollo local** | `http://localhost:3001` |

## Requisitos

- Node.js 22+
- pnpm (recomendado) o npm
- Wrangler CLI (`npm install -g wrangler`)

## Variables de entorno

Copia `.env.example` a `.env` y configura:

```bash
copy .env.example .env
```

Variables clave:

- `DATABASE_URL` — `file:./dev.db` (SQLite local)
- `NEXT_PUBLIC_PHONE` — teléfono del negocio
- `NEXT_PUBLIC_EMAIL` — email del negocio
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número WhatsApp sin `+`
- `RESEND_API_KEY` — API key de Resend
- `WHATSAPP_TOKEN` — Token de Meta Cloud API (producción)
- `WHATSAPP_PHONE_NUMBER_ID` — ID del número en Meta

## Desarrollo

```bash
pnpm install
pnpm run db:generate
pnpm run db:push
pnpm run dev
```

La app corre en http://localhost:3001.

## Comandos

| Comando | Descripción |
| --- | --- |
| `pnpm run dev` | Servidor de desarrollo en puerto 3001 |
| `pnpm run build` | Build de producción local |
| `pnpm run start` | Servidor de producción en puerto 3000 |
| `pnpm run lint` | ESLint |
| `pnpm run cf:build` | Build para Cloudflare (`opennextjs-cloudflare build`) |
| `pnpm run cf:preview` | Preview local con Wrangler |
| `pnpm run cf:deploy` | Deploy a Cloudflare Pages |
| `pnpm run db:generate` | Genera cliente Prisma |
| `pnpm run db:push` | Empuja schema a D1 |
| `pnpm run db:migrate` | Migraciones Prisma en desarrollo |

## Producción / Cloudflare Pages

El deploy automático corre via GitHub Actions (`.github/workflows/deploy.yml`):

1. `ci`: `pnpm install`, `pnpm run lint`, `pnpm run cf:build`
2. `deploy`: `wrangler deploy` con secrets desde GitHub Actions

También puedes hacer deploy manual:

```bash
pnpm run cf:deploy
```

### WhatsApp API

WhatsApp está en **producción** con Meta Cloud API. El webhook recibe mensajes, se guardan en D1, y el concierge puede responder desde su WhatsApp. Ver `whatsapp_config.md` para detalles.

## Estructura

```
src/
├── app/                           # Next.js App Router
│   ├── api/reserve/               # POST endpoint de reservas
│   ├── api/whatsapp/              # Webhook + mensajes WhatsApp
│   ├── fleet/page.tsx             # Flota de vehículos
│   ├── yacht/page.tsx             # Experiencias en yate
│   ├── services/page.tsx          # Servicios concierge
│   ├── about/page.tsx             # Sobre B LEADER
│   ├── _components/home-client.tsx # Home page (cliente)
│   ├── layout.tsx                 # Root layout + JSON-LD
│   ├── sitemap.ts                 # Sitemap dinámico
│   └── robots.ts                  # Robots.txt dinámico
├── components/velox/              # Componentes UI
│   ├── sections/                  # Fleet, Hero, Reserve, etc.
│   ├── chat/                      # WhatsApp chat
│   └── ui/                        # Botones, cards, navbar, footer
├── lib/                           # Utilidades
│   ├── db.ts                      # Cliente Prisma (D1)
│   ├── email.ts                   # Resend
│   ├── rate-limit.ts              # Upstash + fallback
│   ├── seo.ts                     # buildPageMeta + JSON-LD schemas
│   └── whatsapp.ts                # Meta Cloud API client
└── hooks/                         # Custom hooks
```

## Rate limiting

El endpoint `/api/reserve` usa `@upstash/ratelimit` respaldado por Upstash Redis (5 requests/minuto/IP). Configuración:

- **Producción:** definir `KV_REST_API_URL` y `KV_REST_API_TOKEN` en Cloudflare Workers (via `wrangler secret put`).
- **Desarrollo local:** si las vars no existen, cae automáticamente a un rate limiter in-memory (suficiente para dev, no apto para serverless).

## Notas de producción

- WhatsApp está activo con Meta Cloud API real. Webhook: `https://bleader-italy.uastasiforbusiness.workers.dev/api/whatsapp/webhook`
- Los secrets de Cloudflare se gestionan con `wrangler secret put`
- El formulario de reserva requiere consentimiento explícito antes de enviar datos personales.
- No hay tests automatizados todavía.
