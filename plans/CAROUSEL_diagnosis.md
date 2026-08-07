# Carousel diagnosis (before v2 rewrite)

Problems observed in the screenshot and code:

1. **Z-fighting / blurry fan**: side cards overlap behind the active card, blur + low opacity makes the wheel look like a smear; the 3D fan reads as broken rather than intentional.
2. **Mixed aspect cards** (1:1, 3:4, 9:16 collages) rendered in fixed 300x440 boxes → uneven crops and awkward compositions; text block pushes content inconsistently.
3. **Text inside card vs backdrop**: the busy Salento collage background competes with the card text; gradient only partially fixes it.
4. **Controls look generic** (plain ←/→ glyphs, thin dots) — not luxury-grade.
5. **No autoplay, no touch swipe**, no keyboard navigation.
6. **Background image** (back_cards_whells.jpeg) is a busy montage that competes with the cards and adds noise.

## v2 design decisions

- Replace fan with a **coverflow-style wheel**: active card large + centered (560x640, 7:8 ratio fits all collages with object-cover), side cards smaller, rotated 12°, pushed back with translateX/translateZ, darkened (no blur smearing).
- Use **CSS 3D only via framer-motion animate on x/z/rotateY/scale/opacity** with a smooth spring; cards share z-order via zIndex.
- Standardize card copy layout: label top (always), title + mood centered-bottom on consistent padding; ensure 3 lines of text always fit.
- Luxury controls: gold-outlined circular buttons with ChevronLeft/Right, wide gold dash active dot.
- Add: autoplay pause on hover/focus, keyboard arrows, touch swipe via framer-motion pan, progress-ish feel via dots.
- Calm down the backdrop: keep the image but heavier dark overlay (80%) + vignette, so cards float on near-black.
- Add a subtle entrance: cards fan in on first mount from behind.

Keep teaser principle: no prices/specs, one door per card.
