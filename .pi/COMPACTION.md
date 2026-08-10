# Compaction Instructions — B LEADER

These instructions are injected into the compaction summarizer for this project
(via `.pi/extensions/compaction.ts`). When summarizing conversation history,
produce a structured markdown summary that preserves:

1. **Active goal & task** — what the user asked for and the current state of that work
2. **Decisions** — technical and content decisions made, and why
3. **Files touched** — exact paths changed or created, and what changed in each
4. **Commands run** — important scripts, wrangler/d1 commands, build/lint results
5. **Verification state** — what was verified (lint, build, preview) and what failed
6. **Open questions / blockers** — anything unresolved or waiting on the user
7. **Next steps** — what was planned or implied as the next action

Project context to keep in mind:

- B LEADER: Next.js 16 App Router on Cloudflare Workers (`@opennextjs/cloudflare`), D1 database
- Reusable UI in `src/components/velox/`, hooks in `src/hooks/`, server utils in `src/lib/`
- Black/gold visual system; customer-facing copy in US English
- Commits: conventional, focused; verify with `npm run lint` + `npm run build`
- Never summarize away: security rules (secrets, CSRF, webhook validation, rate limiting)

Keep the summary concise but complete — it replaces the summarized history.
Prefer exact paths and concrete facts over paraphrase.
