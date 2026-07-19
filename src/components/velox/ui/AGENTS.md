<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-18 | Updated: 2026-07-18 -->

# ui

## Purpose

Reusable visual and form primitives for Velox pages: ambient effects, loading, vehicle gallery, reservation form, and SEO JSON-LD injector.

## Key Files

| File | Description |
|------|-------------|
| `reservation-form.tsx` | Client reservation form: select **experience** (not vehicle) → `POST /api/reserve` with consent |
| `date-picker.tsx` | Pickup/return date control used by the form |
| `car-gallery.tsx` | Full-screen multi-image gallery for a fleet vehicle |
| `displacement-card.tsx` | Fleet card with hover/displacement effect |
| `loading-screen.tsx` | Intro loading sequence (frame-based) |
| `json-ld.tsx` | Injects JSON-LD `<script type="application/ld+json">` |
| `background-aurora.tsx` | Ambient background effect |
| `film-grain.tsx` | Grain overlay + SVG filters export |
| `custom-cursor.tsx` | Desktop custom cursor |
| `magnetic-button.tsx` | Magnetic CTA button |
| `marquee-text.tsx` | Marquee strip |
| `text-reveal.tsx` | Scroll text reveal |
| `scroll-progress.tsx` | Top scroll progress bar |
| `back-to-top.tsx` | Back-to-top control |

## Subdirectories

_(None.)_

## For AI Agents

### Working In This Directory
- `reservation-form.tsx` selects from `@/lib/experiences` (`bookableExperiences`); keep field names aligned with Zod schema in `api/reserve` (`experience_name`, `experience_category`, snake_case).
- Prefer accessibility: labels, keyboard for gallery close, focus states.
- `json-ld.tsx` is server-safe; keep free of browser-only APIs if used from server components.

### Testing Requirements
- Submit form happy path + validation errors; gallery open/close; loading completion callback.

### Common Patterns
- Almost all files start with `'use client'`.
- Styling via Tailwind classes; `cn()` when conditional.

## Dependencies

### Internal
- `@/lib/utils`, fleet types from `data.ts`, `/api/reserve`.

### External
- Framer Motion / GSAP as needed per component.

<!-- MANUAL: -->
