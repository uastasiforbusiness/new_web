---
name: b-leader-workflow
description: Operational playbook for the B LEADER repo (Next.js 16 on Cloudflare Workers + D1). Use when setting up the local environment, verifying changes, deploying, or committing in this repository. Covers the exact commands and order for setup, lint/build gates, preview, deploy, and conventional commits.
---

# B LEADER Workflow

Follow this procedure when working in the B LEADER repository. Full reference
rules live in `AGENTS.md` at the repo root — this skill is the operational
sequence.

## 1. Local setup (fresh machine or DB)

```bash
npm ci                    # install exactly as CI does
npm run cf:typegen        # regenerate cloudflare-env.d.ts after binding changes
npx wrangler d1 execute bleader-db --local --file=prisma/d1/init.sql   # once: fresh local DB has no tables
npm run dev               # Next dev server on http://localhost:3001
```

Apply the remote schema only when intentionally changing production: `npx wrangler d1 execute bleader-db --remote --file=prisma/d1/init.sql`.

## 2. Verify before declaring done

Always run, in order:

```bash
npm run lint
npm run build
```

If Worker bindings, API routes, or deployment behavior changed, additionally run:

```bash
npm run cf:preview        # OpenNext build + local Worker preview
```

Show the real output. Never claim success without evidence.

## 3. Deploy

```bash
npm run cf:deploy         # OpenNext build + deploy to Cloudflare Workers
```

Secrets: `wrangler secret put <NAME>` — never commit `.env*` values or API tokens.

## 4. Commit

1. Run GitNexus `gitnexus_detect_changes()` to confirm the diff only touches expected symbols.
2. Focused conventional commit, e.g. `fix(reserve): validate pickup date`.
3. Include a concise summary, verification performed, and screenshots for visual changes.

## Guardrails

- D1 is the production database — no Node-only DB runtime, no local SQLite dependency.
- Only `NEXT_PUBLIC_*` variables reach the browser.
- Preserve CSRF checks, reservation consent, webhook signature validation, rate limiting.
- Public pages need `buildPageMeta()` metadata + canonical + JSON-LD.
