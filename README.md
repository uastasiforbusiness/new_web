# B LEADER — Premium Car Rental

Landing premium para alquiler de vehículos de lujo y yates, construida con Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, GSAP, Lenis y Prisma sobre PostgreSQL.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- GSAP ScrollTrigger + Lenis para animaciones/scroll
- Prisma 6 + PostgreSQL
- Vercel para build/deploy

## Requisitos

- Node.js 20+
- npm
- DATABASE_URL de PostgreSQL para Prisma y Vercel

## Variables de entorno

Copia `.env.example` a `.env` y configura:

```bash
cp .env.example .env
```

Variables:

- `DATABASE_URL` — conexión PostgreSQL/Neon con SSL.
- `NEXT_PUBLIC_PHONE` — teléfono mostrado en reserva/contacto.
- `NEXT_PUBLIC_EMAIL` — email mostrado en reserva/contacto.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número WhatsApp sin `+`.

Para Vercel, las variables públicas deben existir en Vercel Environment Variables. Para migraciones desde GitHub Actions, `DATABASE_URL` debe existir como GitHub secret.

## Desarrollo

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

La app corre en http://localhost:3001.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en puerto 3001 |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción en puerto 3000 |
| `npm run lint` | ESLint |
| `npm run vercel-build` | `prisma generate && next build`, usado por Vercel |
| `npm run db:generate` | Genera cliente Prisma |
| `npm run db:migrate` | Migraciones Prisma en desarrollo |
| `npm run db:push` | Empuja schema localmente; usar con cuidado en producción |
| `npm run db:reset` | Resetea DB local/desarrollo |

## Producción / Vercel

El workflow fuente de verdad es `.github/workflows/deploy.yml`.

Flujo actual:

1. Job `ci`: `npm ci`, `npm run lint`, `npm run build`.
2. Preview o production pull de Vercel environment.
3. Migraciones opcionales con `npx prisma migrate deploy` solo si `DATABASE_URL` existe como secret.
4. `vercel build`.
5. Deploy con `vercel deploy --prebuilt`.

No se ejecuta `prisma migrate deploy` dentro de `npm run vercel-build` para evitar migraciones automáticas durante build local/preview sin contexto de DB.

## Estructura

- `src/app` — App Router y layout.
- `src/app/api/reserve/route.ts` — endpoint de reservas con validación Zod, consentimiento y Prisma.
- `src/components/velox` — componentes propios del sitio.
- `src/components/ui` — componentes shadcn/ui.
- `src/hooks` — hooks compartidos.
- `src/lib` — utilidades y cliente Prisma.
- `prisma/schema.prisma` — modelo `Reservation`.
- `public/images` — assets estáticos.

## Notas de producción

- El rate limit de `/api/reserve` es local/in-memory; sirve como protección suave, pero no sustituye Redis/KV para producción seria.
- El formulario requiere consentimiento explícito antes de enviar datos personales. Falta una política de privacidad real/enlazada antes de producción.
- No hay tests automatizados todavía.
- `.github/workflows/ci.yml` y `.gitlab-ci.yml` son pipelines de validación duplicadas; mantenerlas solo si se quieren espejos CI.
