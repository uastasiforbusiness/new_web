# Carousel v2 → v3 notes

Coverflow geometry is now good: active card centered, side cards 14° rotated, darkened, gold chevron controls, dot dashes. But card 3 (Cranchi/brand-logo collage) still shows the logo dominating the visible area because the collage's subject sits lower, and object-cover top-crops at 108% inset — actually the logo is mid-image; since card is tall (464x620, ratio 0.75), a near-square collage (875x1568 = 0.56) crops strongly: only the upper-middle of the collage fits, which for card3 is the logo wall.

Fix: give each card a per-image `objectPosition` (vertical offset) stored in CARD data so each collage's focal point centers in the visible frame:
- card1 (fleet, 1:1): cars occupy lower 2/3 → objectPosition "center 75%"
- card2 (sea, 0.75): yacht deck mid → "center 55%"
- card3 (Cranchi logo wall mid-image): focal point is logo at ~45% height → "center 42%"
- card4 (1:1 occasion): lower area → "center 70%"
- card5 (0.56 tall): mid → "center 50%"

Safer generic: use object-cover with object-position from data; verify each card in browser by cycling through all 5.
