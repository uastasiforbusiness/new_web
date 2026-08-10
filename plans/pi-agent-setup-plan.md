# Making the pi agent pro for B LEADER — setup plan

Goal: wire the pi coding agent (omp) into this project so it knows the stack,
remembers decisions, sees the right context, and can verify its own work.

## Phase 0 — What already works (don't touch)

- `AGENTS.md` hierarchy (root + `src/app/` + API routes) — pi reads these natively at startup
- `.agents/skills/` — 10 design skills; pi auto-discovers this directory
- GitNexus index (923 symbols, 1335 relationships) — just needs MCP wiring (Phase 3)
- Playwright + axe e2e, ESLint, Prettier, `npm run cf:preview` flow

> **Status: Phases 1–4 DONE (2026-08-10).** `.omp/config.yml` and `.omp/mcp.json`
> created and verified (`gitnexus mcp` v1.6.5 serves new_web; context7 v4.0.0 boots).
> LSP: no config needed — typescript-language-server auto-detects. Memory seed file:
> skipped — AGENTS.md already covers the facts, and the local backend generates
> MEMORY.md from sessions into `~/.omp/agent/memories/<encoded-cwd>/`.
> Phase 4: vitest 4.1.10, 43 tests / 7 files passing (csrf, client-ip, rate-limit,
> whatsapp, seo units + reserve & webhook route contracts), `npm test` script,
> `.github/workflows/ci.yml` (lint+test+build), build verified green.
> e2e reserve-flow expansion skipped: needs dev server + D1; route contracts
> already covered at the unit level.
> Remaining: Phase 5 (skills), Phase 6 (quality gates).

## Phase 1 — Project config (`<cwd>/.omp/`) — 10 min, highest ROI

Create `.omp/config.yml` (project settings; pi merges over global):

```yaml
# <repo>/.omp/config.yml
modelRoleStorage: project   # model per role saved here, not globally
memory:
  backend: local            # or mnemopi — see Phase 2
  autolearn:
    enabled: true
lsp:                        # TS language server: defs/hover in editor
  servers:
    typescript-language-server: true
```

Then `/trust` the project on first run and pick roles in `/models`.

## Phase 2 — Memory across sessions — 15 min

- Enable `memory.backend: local` (summary pipeline) or `mnemopi` (vector/graph recall).
- Agent then auto-extracts durable decisions (D1 schema choices, WhatsApp webhook rules,
  black/gold system) into `memory://root/MEMORY.md` and recalls them on session start.
- `autolearn.enabled: true` adds the `learn` tool for explicit retention.
- Add a root `memory.md` with the 5 most important project facts as the seed.

## Phase 3 — MCP servers (`.omp/mcp.json`) — 20 min

| Server | Why |
|---|---|
| **GitNexus** (already configured for Claude — copy to `.omp/mcp.json`) | impact analysis before edits, stale-index warning |
| **Context7** | **biggest win**: Next 16, React 19, Tailwind 4, Prisma 7 are all recent majors — model training data is stale. Context7 serves current docs. |
| Upstash Redis | inspect rate-limit state while debugging (optional) |
| Cloudflare | D1 query/inspect in-session (optional) |

## Phase 4 — Test suite (the real gap — AGENTS.md admits "no automated test suite yet")

1. **Vitest unit tests** for pure logic in `src/lib/`: `csrf.ts`, `seo.ts`, `data.ts`, rate limiting.
2. **API route contract tests**: `api/reserve` (zod validation, consent, CSRF, pickup-date rule)
   and `api/whatsapp/webhook` (signature validation) — these are the money paths.
3. **CI job** in `.github/workflows/` (currently only deploy.yml): `lint + test + build`
   so regressions fail before deploy.
4. Expand Playwright to cover the reserve form happy path.

Agent benefit: `debug`/`eval` tooling + tests give it a fast, safe verification loop
instead of "run build and eyeball it".

## Phase 5 — Project skills (`.agents/skills/` — already discovered, zero config)

Add 3 SKILL.md files next to the existing design skills:

- `bleader-conventions` — black/gold visual system, copy rules, `buildPageMeta()`/JSON-LD requirements
- `bleader-reserve-api` — contract for reserve + WhatsApp flows (validation, consent, webhook sig)
- `bleader-deploy` — cf:typegen → cf:preview → cf:deploy sequence, secret rules

Skills load on demand, keeping AGENTS.md lean (AGENTS.md = rules, skills = how-to).

## Phase 6 — Quality gates — 30 min

- Pre-commit hook: `prettier --check` + `eslint` on staged files (lint-staged).
- a11y axe run in CI (already a devDependency — just wire it).
- Keep GitNexus index fresh: `npx gitnexus analyze` after structural changes
  (or note the stale-index warning rule in AGENTS.md).

## Phase 7 — Extensions (advanced, only if needed)

- Custom slash command for "deploy preview → verify → deploy prod" so the flow is one keystroke.
- Prompt template override per-project if the default system prompt needs B LEADER specifics.

---

## Skip list (deliberate)

- Rewriting AGENTS.md — already good; pi reads it. Only add the gitnexus MCP note.
- New design-system files — DESIGN.md exists.
- .pi/settings.json — redundant with `.omp/config.yml` in this setup.

## Suggested order

`/trust` → Phase 1 (10 min) → Phase 3 GitNexus+Context7 (20 min) → Phase 2 (15 min)
→ Phase 4 (biggest chunk) → Phase 5 → Phase 6.
