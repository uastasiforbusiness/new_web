# Repository Guidelines

## Project structure

B LEADER is a Next.js 16 App Router application deployed as a **Cloudflare Worker** through `@opennextjs/cloudflare`. Route pages and API handlers are in `src/app/`; use `src/app/_components/` only for app-local UI. Reusable visual components live in `src/components/velox/`, shared browser hooks in `src/hooks/`, and server utilities (D1, email, rate limiting, SEO, WhatsApp) in `src/lib/`.

`public/` contains immutable media assets. The D1 SQL schema is `prisma/d1/init.sql`; `prisma/schema.prisma` remains the data model source for Prisma tooling. Cloudflare bindings are configured in `wrangler.jsonc`, and deployment CI is `.github/workflows/deploy.yml`.

## Local development and deployment

Use Node.js 22 and the package scripts:

```bash
npm ci                    # install exactly as CI does
npm run cf:typegen        # regenerate cloudflare-env.d.ts after binding changes
npm run dev               # Next development server on http://localhost:3001
npm run lint              # ESLint
npm run build             # type generation and Next production build
npm run cf:preview        # OpenNext build and local Worker preview
npm run cf:deploy         # OpenNext build and deploy to Cloudflare Workers
```

Production data uses the `DB` D1 binding. Do not introduce a Node-only database runtime or depend on local SQLite for Worker behavior. Run `npx wrangler d1 execute bleader-db --remote --file=prisma/d1/init.sql` only when intentionally applying the idempotent remote schema.

## Coding and content conventions

Write TypeScript, use two-space indentation, and follow the existing ESLint configuration. Name React components in `PascalCase`, hooks as `use-*.ts`, and route folders in lowercase kebab case. Keep client boundaries minimal: add `'use client'` only to components requiring browser APIs, state, or animation.

Every public page needs page-specific metadata via `buildPageMeta()` from `src/lib/seo.ts`, a canonical path, and relevant JSON-LD. Customer-facing copy is US English, refined and specific; preserve the black/gold visual system and existing media unless the task explicitly changes design.

## Security and verification

Never commit `.env*` values, Cloudflare API tokens, Meta credentials, Resend keys, or D1 data. Store production secrets with `wrangler secret put`; only `NEXT_PUBLIC_*` variables may reach the browser. Preserve CSRF checks, reservation consent, webhook signature validation, and rate limiting.

There is no automated test suite yet. Before a pull request, run `npm run lint` and `npm run build`; use `npm run cf:preview` when changing Worker bindings, API routes, or deployment behavior. Use focused conventional commits such as `fix(reserve): validate pickup date`, and include a concise summary, verification performed, and screenshots for visual changes.
