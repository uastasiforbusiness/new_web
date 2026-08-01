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

For local development, apply the same idempotent schema to the local D1 database once (a fresh local DB has no tables, and API routes then fail with `D1_ERROR: no such table`):

```bash
npx wrangler d1 execute bleader-db --local --file=prisma/d1/init.sql
```

**Official domains:** `bleaderitaly.com` (primary / canonical) and `bleaderitaly.it`. Set `NEXT_PUBLIC_SITE_URL=https://bleaderitaly.com` for production SEO. Attach both domains (and `www`) as Custom Domains on the `bleader-italy` Worker in Cloudflare.

## Coding and content conventions

Write TypeScript, use two-space indentation, and follow the existing ESLint configuration. Name React components in `PascalCase`, hooks as `use-*.ts`, and route folders in lowercase kebab case. Keep client boundaries minimal: add `'use client'` only to components requiring browser APIs, state, or animation.

Every public page needs page-specific metadata via `buildPageMeta()` from `src/lib/seo.ts`, a canonical path, and relevant JSON-LD. Customer-facing copy is US English, refined and specific; preserve the black/gold visual system and existing media unless the task explicitly changes design.

## Security and verification

Never commit `.env*` values, Cloudflare API tokens, Meta credentials, Resend keys, or D1 data. Store production secrets with `wrangler secret put`; only `NEXT_PUBLIC_*` variables may reach the browser. Preserve CSRF checks, reservation consent, webhook signature validation, and rate limiting.

There is no automated test suite yet. Before a pull request, run `npm run lint` and `npm run build`; use `npm run cf:preview` when changing Worker bindings, API routes, or deployment behavior. Use focused conventional commits such as `fix(reserve): validate pickup date`, and include a concise summary, verification performed, and screenshots for visual changes.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **new_web** (923 symbols, 1335 relationships, 29 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/new_web/context` | Codebase overview, check index freshness |
| `gitnexus://repo/new_web/clusters` | All functional areas |
| `gitnexus://repo/new_web/processes` | All execution flows |
| `gitnexus://repo/new_web/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
