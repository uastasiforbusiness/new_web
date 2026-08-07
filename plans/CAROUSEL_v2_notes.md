# Carousel v2 verification notes

Rendered and working: coverflow wheel with 5 cards, rotation 14°, active centered, side cards darkened, gold chevron controls, gold dash dots. Build green.

Issue spotted on card 3 (Cranchi collage): the logo occupies the upper half of the card image, and card images are collages where subject matter sits mid-frame — active card's image starts at the top, so the mood is not instantly readable. Fix options:
1. object-position center (default) — keep.
2. Slightly taller active card (h-[620px] md:h-[640px]) so more of the image shows.
3. Add a subtle scale-down of image (object-cover with scale-105 via padding inset) to reduce the cropped logo effect.

Also observed: active card height 520px md:580px vs container minHeight 640 — okay, but wheel area looks slightly cramped vertically on 940px viewport (header + wheel + controls). Reduce header pb and wheel minHeight to 600 on md.

Decision: bump card heights to h-[560px] md:h-[620px], keep everything else. Verify again, then commit.
