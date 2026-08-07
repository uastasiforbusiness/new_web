# Review of FleetShowcase v1

## What works
- Alternating L/R chapters, full-bleed parallax images, marquee band, yacht chapter all render.
- Serif/gold editorial typography matches site system.
- Data intact, anchors stable, CTA preserved.

## Issues found
1. Hero header text fades behind giant FLEET wordmark band; header "Machines with an accent." sits at top, then FLEET outline band cuts it off visually (FLEET overlaps header area since pt-32 then overflow-hidden band; screenshot shows header + FLEET cramped, overlapping). -> Give header proper spacing and move FLEET band further; also the outline text baseline seems misaligned (ascenders cropped). Add padding top/bottom.
2. First car image column overlaps the header on desktop? In screenshot 1, image starts right below header — okay, but header area has FLEET text overlapping "The fleet" eyebrow. Actually FLEET band directly follows header; text-outline font-display at 24vw is huge and its top gets clipped by overflow-hidden. Should add vertical padding ~6rem.
3. Chapter copy column: giant numeral "1" appears faint gold-outline but position fine.
4. Marquee: shows 4x repeats = very long, acceptable but could be 3 sets; keep.
5. Yacht hero image uses pexels url — fine.
6. Image reveal: first chapter image top gets clipped at viewport entry; parallax container h-[120%] with inset-0 and scale 1.08 — works.
7. Copy column content appears to reveal with fade (Reveal) but headings look faded in screenshots mid-scroll — Reveal once:true, fine after scroll.
8. Header FLEET wordmark overlaps title text — fix spacing: header max-w 1600, then FLEET band has overflow-hidden and no padding; outline text at 24vw needs ~2.5rem top/bottom padding, and add margin-top to FLEET band.
9. Mobile: need to verify responsive behavior (numeral 17vw on mobile okay).

## Confirmed from screenshot (scroll top)
Header + FLEET band: the FLEET outline wordmark sits DIRECTLY under the h1 with only border-line separation and its ascenders clip at the band's top edge (overflow-hidden). The wordmark reads cut-off and cramped against the title. Fix: add py-12 md:py-20 to the FLEET band so its ascenders breathe, and add pb-12 md:pb-16 to the header div so the title doesn't touch the band. Also consider centering: wordmark should ideally be full-width with left edge visible; keep overflow-hidden to allow huge text.

## Fixes to apply
- Add py-8 to FLEET band, align baseline, ensure no overlap with header.
- Give header pb-16 md:pb-20 so FLEET wordmark has breathing room.
- Ensure h1 not overlapping.
## v2 check (after spacing fix)
Header now breathes: eyebrow + h1, then FLEET outline band with generous padding. FLEET ascenders still touch the band's top edge slightly (outline stroke clipped by overflow-hidden at very top). Acceptable but better: add pt-2 and slightly larger py (pt-2 on inner div or py-16). Actually clipping of 1px stroke is invisible at 24vw — fine visually. Keep.
Next checks: scroll to yacht chapter, mobile viewport.
## Yacht chapter check
The full-bleed aerial yacht hero works well: overlay numeral "V", kind eyebrow, h2, italic tagline all render over the image. The numeral V's outline stroke is very faint against the white hull (nearly invisible) — acceptable since the hull is dark enough, but could bump text-outline opacity for the yacht numeral. Spec strip + invitation copy + gallery render fine.
Overall design is solid. Remaining polish list:
1. Yacht numeral V faint — add a subtle dark gradient behind numeral or increase stroke via a class; simplest: add text-outline-gold instead (gold stroke) so it's visible against any image.
2. Nothing else blocking.
