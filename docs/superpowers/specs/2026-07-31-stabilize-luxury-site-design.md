# Design — Stabilize `refactor-luxury-site` with WIP branch

**Date:** 2026-07-31
**Status:** Approved by user
**Branch:** `refactor-luxury-site` (working)

## Context

A developer left `refactor-luxury-site` in a broken state. The **committed** state of the
branch is healthy — 9 pages that build cleanly. The breakage is entirely in the working
tree:

- **Broken tracked files** (now restored to committed state): `globals.css` was downgraded
  from Tailwind v4 to v3 syntax (project runs v4), `locations/page.tsx` imported a
  non-existent `LocationsIndexHero`, fonts were removed from `layout.tsx`, and public assets
  (`favicon.svg`, `logo.svg`, hero images, `yacht_360/` frames) were deleted while still
  referenced by committed code.
- **Junk** (deleted): `.playwright-mcp/` test logs, `.codex/` config, loose build scripts.
- **Work-in-progress files** (45 files, untracked): new pages (`blog/`, `yachts/`,
  `luxury-cars/`, `premium-experiences/`, `experiences/combo|ferrari|jet`,
  `locations/region1/`), new components (`yacht-section`, `yacht-flybridge`,
  `luxury-cars-section`, `premium-experiences-section`), new libs, assets, and docs.

The WIP files do **not compile** — they import components that were never created
(`blog-index-hero`, `combo-section`, `ferrari-section`, `jet-section`,
`region-venues-hero`, `venue-section`), mix named/default exports, and use a design
language (cream `#F5F1E8`, Playfair Display, brown text) inconsistent with the current
brand (dark `#0a0a0a`, gold `#c9a96e`, Cormorant editorial).

## Goal

1. Restore `refactor-luxury-site` to a clean, compiling state with its 9 committed pages.
2. Preserve **all** of the developer's WIP work in a separate branch for a future iteration,
   without losing anything.

## Decisions (confirmed with user)

- **Scope:** focus on the current site; new content sections (blog posts, testimonials, FAQ,
  press, venues) are deferred to a later iteration.
- **Visual direction:** keep the current B LEADER aesthetic (dark + gold + Cormorant/Outfit
  editorial). Do not adopt the dev's cream/Playfair template style.
- **Approach:** separate WIP branch (Option A) — commit the dev's 45 untracked files to
  `dev/luxury-expansion-wip`, leave `refactor-luxury-site` clean.

## Implementation

1. Create branch from current state: `git checkout -b dev/luxury-expansion-wip`.
2. Commit the dev's WIP files that touch the site:
   - New pages: `src/app/blog/`, `src/app/yachts/`, `src/app/luxury-cars/`,
     `src/app/premium-experiences/`, `src/app/experiences/combo|ferrari|jet/`,
     `src/app/locations/region1/`, `src/app/locations/layout.tsx`
   - New components: `luxury-cars-section.*`, `yacht-flybridge.tsx`, `yacht-section.*`,
     `premium-experiences-section.*`, `YACHT_SECTION_FROM_WEBSITE.html`
   - New libs: `alibabaCloudUtils.ts`, `envConfig.ts`, `logger.ts`
   - Assets: `public/videos/cranchi-top.mp4`, `public/images/new_items/`
   - Dev docs: `PLAN_global_typography_switch.md`, `PRODUCT.md`, `README.md`,
     `docs/ModelStudio_Integration.md`
   - Commit message: `WIP: luxury site expansion (blog, yachts, luxury-cars, premium-experiences, experiences, venues)`
3. **Do NOT commit** (local harness infrastructure, not dev work):
   - `.claude/settings.local.json` (hook config)
   - `.agents/skills/impeccable/reference/live-setup.md`
   - `.claude/skills/impeccable/reference/live-setup.md`
4. Return to clean branch: `git checkout refactor-luxury-site`.
5. Verify: build succeeds with the 9 committed pages; `git status` shows only the local
   config files as untracked.

## Resulting state

```
refactor-luxury-site      → 9 pages, compiles, clean working tree (ready)
dev/luxury-expansion-wip  → all dev WIP, versioned and recoverable
```

## Out of scope (future iteration)

- Fixing/connecting the WIP pages and components.
- New content sections: blog/journal, testimonials, FAQ, press, region/venue detail pages.
- Adopting the dev's typography plan (`PLAN_global_typography_switch.md`).
