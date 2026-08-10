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

# Pi Agent — Tools, Skills & Workflow

This section is for the **pi** coding agent. Follow it in every session.

## Core tools

| Tool | When to use |
|---|---|
| `read` | Inspect files before editing; always read before you change |
| `edit` | Precise, targeted file changes (never rewrite a whole file for a small fix) |
| `write` | New files or complete rewrites only |
| `bash` | Commands: npm scripts, git, wrangler, grep/find. Verify with real output, don't assume |
| `ctx_*` (context-mode) | Process large outputs (logs, build output, git diffs) in a sandbox and print only the summary; search the knowledge base instead of re-reading raw files |
| `web_search` / `fetch_content` | Research docs, APIs, or references when unsure |
| `subagent` | Delegate independent work (reviews, research) to child agents; keep one writer per workspace |
| `intercom` | Coordinate with other pi sessions on this machine |

## Available skills

| Domain | Skill | Use for |
|---|---|---|
| Workflow | `brainstorming` | Any creative work: clarify intent, present a design, get approval BEFORE writing code |
| Workflow | `writing-plans` | Multi-step tasks: turn an approved design into an implementation plan |
| Workflow | `systematic-debugging` | Any bug: reproduce → isolate → root cause → verify fix. No blind fixes |
| Workflow | `verification-before-completion` | Before claiming done: run the real verification commands and confirm output |
| Workflow | `test-driven-development` | Features/bugfixes: write the failing check first when logic is non-trivial |
| Workflow | `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents` | Execute approved plans; parallelize independent tasks |
| Workflow | `requesting-code-review`, `receiving-code-review` | Independent review of completed work |
| Code intelligence | GitNexus (`gitnexus_impact`, `gitnexus_query`, `gitnexus_context`, `gitnexus_detect_changes`, `gitnexus_rename`) | See the GitNexus section below; it is mandatory before editing symbols and before commits |
| Cloudflare | `wrangler`, `cloudflare`, `workers-best-practices`, `durable-objects`, `cloudflare-email-service` | Worker/D1/email work — bindings, config, deployment behavior |
| Frontend / design | `impeccable`, `design-taste-frontend`, `apple-design`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary` | UI work, redesigns, animation and polish |
| Performance | `web-perf` | Core Web Vitals and page-load audits |
| Research | `web-search`, `web-research`, `parallel-deep-research` | Web research and source checking |
| Project mgmt | bigpowers skills (planning, epics, release) | Heavy project management only if the user explicitly asks |

## Workflow rules

1. **Bugs:** start with `systematic-debugging`. Find the root cause; fix it where all callers route through, not just the reported path.
2. **New features:** `brainstorming` first — explore intent, present a short design, get user approval, then implement. For multi-step work, follow with `writing-plans`.
3. **Before editing any symbol:** run `gitnexus_impact` and report blast radius. Warn the user on HIGH/CRITICAL risk.
4. **Before committing:** run `gitnexus_detect_changes()` to confirm the diff only touches expected symbols.
5. **Before claiming done:** run `npm run lint` and `npm run build`. Use `npm run cf:preview` when Worker bindings, API routes, or deployment behavior changed. Show the real output.
6. **Keep changes minimal:** prefer targeted `edit`s, reuse existing helpers, no speculative abstractions, no new dependencies for what a few lines can do.
7. **Commits:** focused conventional commits (`fix(reserve): validate pickup date`) with a concise summary of what changed and verification performed; screenshots for visual changes.
8. **Language:** respond in the user's language; code, commits, and customer-facing copy in US English.

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
