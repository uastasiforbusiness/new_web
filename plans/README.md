# Fleet Animation Plans

Plans for the Idol's Gallery (`src/components/velox/sections/fleet-showcase.tsx`). Written by `improve-animations` at commit `aead399`. Each plan is self-contained for an executor with zero context; every value (curve, duration, stagger, media query) is inlined in the plan.

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Add a scrub-driven progress indicator to the fleet horizontal gallery | MEDIUM | DONE |
| 002 | Animate the fleet intro slide entrance | MEDIUM | DONE |
| 003 | Add parallax depth to the fleet slide watermarks | LOW | DONE |
| 004 | Animate the fleet section on mobile (stacked slides) | LOW | DONE |

## Recommended execution order

1. **001** first — highest leverage: it adds the feedback the pinned scroll is missing (progress line + live counter).
2. **003** second — cheapest to implement, biggest visual lift (watermark depth).
3. **002** third — reveals the intro header, matching the rest of the site.
4. **004** last — mobile consistency, lowest priority since mobile is a secondary experience for this gallery.

## Dependencies

- None of the four plans depend on each other's changes. All four edit the same file (`fleet-showcase.tsx`), so implement them sequentially and re-run verification after each; plan 001's `onUpdate` and plan 003's `containerAnimation: st` both reference the existing `st` tween that is already present in the file — no plan creates it.
- **Plan 002 reuses plan 001's `onUpdate`** (the one-shot intro reveal lives inside it) — implement 001 before 002 if not already done. This is the only cross-plan code dependency.
- Plan 002 and plan 004 both touch the intro slide / mobile branch; they are independent (002 is desktop-only, 004 is mobile-only) and do not conflict.
- All plans are additive; none modify the existing horizontal scrub, pin, or layout values.

## Reconcile

Re-check against current code with `improve-animations reconcile` before starting a plan — file:line references are stamped to commit `aead399` and may drift.
