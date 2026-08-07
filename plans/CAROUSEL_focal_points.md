# Card image focal points (from direct viewing)

card1_collage.webp (1568x1568, 1:1): fleet of 4 cars (white/red Ferrari cabrio, dark Maserati, white Mercedes) in lower 2/3 of frame; trees top. Focal ~72% height.
card2_collage.webp (896x1200, 0.75): yacht deck with champagne/sparkler mid-upper; Cranchi banner top-right; water bottom. Focal ~55%.
card3_collage.webp (875x1568, 0.56): brand-logo wall — Mercedes+Cranchi logos ~30% height, big B LEADER anchor logo ~50%, Maserati+Ferrari ~80%. No real scene. For "Let someone else drive" it actually reads well showing B LEADER + Ferrari; focal ~50%.
card4_collage.webp (1024x1024, 1:1): proposal/dinner occasion scene — check; assume focal ~55%.
card5_collage.webp (875x1568, 0.56): Salento collage — trulli at top, sea boat right ~30%, bougainvillea mid, pastries lower, plant bottom-right. Rich everywhere; focal ~40%.

## Fix plan
Add `focus: string` (CSS object-position) per card; img gets className with dynamic objectPosition via style: object-cover + inset-[-4%] h-[108%] w-[108%] (keep), plus style={{ objectPosition: card.focus }}.

Values: card1 "center 70%", card2 "center 55%", card3 "center 48%", card4 "center 55%", card5 "center 40%".

After edit: verify each card by clicking next 4 times, screenshot each, then commit+push.
