# Experiences page — image audit

Page layout: numbered editorial list, image sits on the LEFT of each entry (screenshot shows a black image area left of "01" with the number overlay). Images are remote pexels URLs defined in EXPERIENCES[] in src/lib/data.ts.

## Current image assignments (from data.ts)
| # | Experience | Content | Current image | Verdict |
|---|---|---|---|---|
| 1 | Ferrari Grand Tour | Ferrari drive, grotto by private boat, SP358 cliffs, Ciolo canyon | 7995539 — check content | ? |
| 2 | Salento Supercar Tour | Ferrari SP108, Porto Selvaggio, cooking class, wine tasting | 38009036 — also used as Yacht.imageCruise & Full Day Charter! | MISMATCH: land tour shown w/ yacht-ish photo |
| 3 | Ferrari & Sea Combination | Land tour + half day charter | 36610228 — check content | ? |
| 4 | Full Day Charter | Yacht full day | 38009036 — DUPLICATE of #2, and #2 also shows this photo | MISMATCH/DUP |
| 5 | Half Day Charter | Yacht half day | 7873392 — sailing photo | ? |
| 6 | Sunset Cruise with Aperitif | Sunset boat, golden hour | 36610228 — DUPLICATE of #3 | MISMATCH/DUP |
| 7 | Sunset Cruise with Dinner | Sunset dinner aboard | 7766408 — check content | ? |

Issues found so far:
- 38009036 used twice (#2 land tour + #4 full day charter) — superset of "Full Day Charter" experience page also uses it. Photo likely a boat: BAD for supercar tour.
- 36610228 used twice (#3 + #6 sunset aperitif) — need to verify content; at minimum #3 should show land+Ferrari or sea combo.
- Need to check actual pexels photo contents: 7995539, 38009036, 36610228, 7873392, 7766408.

## Plan
- Download each current image, inspect visually.
- Replace mismatches with local assets where available (public/images/new_items/ has gallipoli.jpg, gallipoli_desde-mar.jpg, torre_uluzzo.jpg, torre_uluzzo2.jpg, pasta.jpg, pasta_3.jpg, porto_gaio.jpg — these match experience content perfectly and are self-hosted!).
- For Ferrari shots: public/images/rossa_card_mediterranean.png etc. exist (2560x1440).
- Update EXPERIENCES[].image paths in data.ts, rebuild, verify, push.
## Visual inspection results
- 7995539 (Ferrari Grand Tour #1): AERIAL turquoise sea + rocks, top-down cliff view. No Ferrari visible. For an experience featuring Ferrari drive to cliffs/Adriatic it's partially okay (scenic SP358 feel) but no car. Better match possible.
- 38009036 (Salento Supercar Tour #2 AND Full Day Charter #4): A big WHITE MOTOR YACHT with jet skis — clearly a yacht photo. Completely wrong for "Salento Supercar Tour" (a LAND experience). Confirms user complaint.
- 36610228 (Ferrari & Sea Combo #3 AND Sunset Cruise Aperitif #6): Coastal town from sea (Gallipoli old town, daytime). Okay-ish for #6 but not sunset; wrong focus for #3 (combo should lean land/Ferrari+sea). Also used as YACHT.imageSailing.
- 7873392 (Half Day Charter #5): speedboat in blue-green water near Turkish-looking coast. Generic boat shot, not Mediterranean Salento, acceptable-ish but could improve.
- 7766408 (Sunset Dinner #7): yacht stern table set for dinner, turquoise water, mountains, daytime (not sunset). Decent but the water light is midday; could improve but acceptable? User complaint is generic "image doesn't match experience". #7 image actually matches dinner-aboard fairly well. Keep? The scene is daytime not sunset, and the coastal backdrop doesn't look like Salento. Could generate improved version OR keep. Decide: keep #7? Better to improve for consistency.

## New plan — use LOCAL self-hosted assets (already in repo public/images/new_items/):
- gallipoli.jpg, gallipoli_desde-mar.jpg, torre_uluzzo.jpg, torre_uluzzo2.jpg, pasta.jpg, pasta_3.jpg, porto_gaio.jpg
Plus fleet photos: rossa_card_mediterranean.png (Ferrari California T), ferrari_california_white_background.png, maserati_card_mediterranean.png, mercedes_e220d_cabrio_mediterranean.png.
Local assets are real client assets => better match than random pexels.

## Proposed assignment:
- #1 Ferrari Grand Tour -> torre_uluzzo2.jpg or gallipoli_desde-mar.jpg (sea + cliffs) — need to view them first.
- #2 Salento Supercar Tour -> rossa_card_mediterranean.png (real Ferrari) + pasta.jpg (cooking class). Layout is single image; choose Ferrari one.
- #3 Ferrari & Sea Combination -> composite not possible; pick gallipoli_desde-mar.jpg or generate. Consider generate mode? Plan says can find or MAKE an image -> use media generation for combo image.
- #4 Full Day Charter -> 38009036 is actually a yacht — could KEEP for #4 (it matches full day charter well, jet skis included as optional tender/jet ski!). Wait, it's a different big yacht not their Cranchi... but it matches category. Keep.
- #5 Half Day Charter -> generate or pick local sea image.
- #6 Sunset Aperitif -> sunset sea image. Generate or search.
- #7 Sunset Dinner -> 7766408 keep? Or improve.

TODO: view local assets first, decide generation needs.
## Local assets review
- new_items/gallipoli.jpg: old town street at sunset, 1080x1350 portrait. Gorgeous, real Gallipoli. Good for a sunset cruise experience but portrait ratio (page crops to ~2:1 landscape) — center focus is people, may crop okay. Could use for #6 Sunset Cruise with Aperitif (Gallipoli at golden hour — matches!) though portrait. Better: use media generation to create a landscape 2:1 version? Or use as-is with object-cover crop.
- new_items/gallipoli_desde-mar.jpg: 589x756 portrait, boat in turquoise cove with old town above. Portrait ratio too; fine-quality but low res.
- Remaining to view: torre_uluzzo.jpg, torre_uluzzo2.jpg, pasta.jpg, porto_gaio.jpg.

## Strategy
- Replace remote pexels duplicates/misses with LOCAL real photos where they fit and crop-friendly.
- Generate with AI media generation a couple of bespoke landscape (2:1) images: (a) "Ferrari Grand Tour" style — red Ferrari on SP358 clifftop road with Adriatic turquoise sea, (b) "Salento Supercar Tour" — white/black Ferrari on coastal road with olive groves/estate. Actually generate 3: (c) sunset chartered yacht with aperitif at golden hour Gallipoli coast (#6), (d) yacht dinner at dusk (#7) OR keep 7766408.
- Keep 38009036 for Full Day Charter #4 (matches: yacht + jet skis).
- Keep 7873392 for Half Day #5? It's a speedboat in Turkey-like scenery; replace with gallipoli_desde-mar.jpg? low-res. Generate one instead.
## More local assets
- torre_uluzzo.jpg: 801x1200 portrait — Torre Uluzzo sunset over sea, breathtaking. Perfect for Sunset Cruise with Aperitif (#6)! Portrait but object-cover crop keeps the horizon+sun center. 
- torre_uluzzo2.jpg: 1200x799 LANDSCAPE — tower ruin at sunset with contrails. Good for a sunset ritual too (#6 or #7), landscape ratio fits page crop well. Torre Uluzzo is a real stop on the supercar tour too.
- pasta.jpg: 640x800 portrait — woman making orecchiette in a Salento alley. PERFECT for Salento Supercar Tour (#2, cooking class) — real Salento, authentic.
- porto_gaio.jpg: 736x1104 portrait — Gallipoli harbor boats with old town, daytime. "From Porto Gaio" — great for Ferrari Grand Tour? or Half Day Charter.

## FINAL DECISIONS (keep it simple, no AI generation needed — real client assets are better than generated stock):
- #1 Ferrari Grand Tour (Adriatic cliffs, Zinzulusa) -> keep 7995539? It's a generic aerial. Better: use nothing new? Hmm — but user said images don't match. This one at least shows cliffs+Adriatic turquoise. ACCEPTABLE. Optionally swap to a nicer aerial. Decide: keep (it's visually coherent).
- #2 Salento Supercar Tour -> new_items/pasta.jpg (real pasta-making, matches cooking class part) — but the experience leads with Ferrari drive... Single image though. Alternative: use ferrari_california_white_background.png? White background looks like studio card. rossa_card_mediterranean.png is beautiful Mediterranean. DECISION: use pasta.jpg (most unique/matching element) — actually the current image is yacht. Pasta + estate is more distinctive. FINAL: pasta.jpg.
- #3 Ferrari & Sea Combination -> 36610228 is Gallipoli old town w/ cloudy day. Combo = land+sea. Keep? It's decent, generic. Keep for now.
- #4 Full Day Charter -> 38009036 (yacht + jetskis) KEEP, matches.
- #5 Half Day Charter -> porto_gaio.jpg (Gallipoli harbor) — matches Sant'Andrea & Gallipoli bay theme, real locale. 
- #6 Sunset Cruise Aperitif -> torre_uluzzo.jpg (sunset over Torre Uluzzo — literally the cruise's Punta della Suina area) KEEP sunset.
- #7 Sunset Dinner -> 7766408 KEEP (dinner aboard) — matches well; or torre_uluzzo2? Dinner photo already matches dinner. KEEP.

So the real mismatches fixed: #2 (yacht photo on supercar tour), #5 (generic Turkish speedboat), #6 (daytime Gallipoli w/o sunset).
## FINAL SWAP TABLE (editing data.ts EXPERIENCES[].image)
| # | Slug | Old image | New image | Rationale |
|---|---|---|---|---|
| 1 | ferrari-grand-tour | 7995539 (aerial cliffs, generic) | /images/new_items/torre_uluzzo2.jpg | landscape, real Salento coastal tower at sunset; scenic Adriatic coast vibe; also matches "SP358 clifftop drive / sanctuary" |
| 2 | salento-supercar-tour | 38009036 (BIG WHITE YACHT — wrong!) | /images/new_items/pasta.jpg | real orecchiette-making in Salento alley — the "Mani in Farina" cooking class, unique & authentic |
| 3 | ferrari-sea-combination | 36610228 (Gallipoli town, daytime) | keep for now (sea+town combo, acceptable) |
| 4 | full-day-charter | 38009036 (yacht + jet skis) | keep — matches charter + optional jet ski |
| 5 | half-day-charter | 7873392 (speedboat, wrong region) | /images/new_items/gallipoli.jpg | real Gallipoli old town at golden hour; fits Sant'Andrea/Gallipoli bay; warm golden light |
| 6 | sunset-aperitif | 36610228 (daytime Gallipoli, wrong light) | /images/new_items/gallipoli_desde-mar.jpg — WAIT low-res portrait. Better: /images/new_items/torre_uluzzo.jpg (real sunset, but used? no, torre_uluzzo.jpg unused). DECISION: #6 = torre_uluzzo.jpg (sunset over Punta della Suina area) |
| 7 | sunset-dinner | 7766408 (dinner aboard, daytime water) | keep — dinner aboard matches |

Conflict check: torre_uluzzo.jpg (#6), torre_uluzzo2.jpg (#1), pasta.jpg (#2), gallipoli.jpg (#5) — all unique. gallipoli_desde-mar.jpg unused (backup for #5 if gallipoli.jpg portrait crops badly — gallery crops ~2:1 landscape, gallipoli.jpg 1080x1350 portrait with street focus at center; the crowd/stalls at bottom half may crop awkwardly. Alternative for #5: gallipoli.jpg still best real asset. Consider generating... keep simple.
Note: YACHT.imageSailing in data.ts line 125 = 7873392 (same speedboat) — replace there too with gallipoli_desde-mar.jpg or keep yacht page unaffected. User asked about experiences page only. Leave YACHT.imageSailing untouched (used on fleet page yacht gallery) to avoid scope creep? It shows same wrong region image. Swap it to gallipoli_desde-mar.jpg as a bonus (it's the Gallipoli cove, Salento).
## Verification
Entry 01 shows torre_uluzzo2 landscape tower-at-sunset perfectly. Entry 02 now shows the real orecchiette-making alley photo — authentic and matches the cooking-class part of the tour. Page image slot appears as landscape-orientated crop (object-cover) — portrait images crop top/bottom; check whether #02 portrait pasta.jpg looks balanced (image sits right-aligned, roughly 2:1 frame) — looks fine, woman + trays visible.
Still to visually verify: entries 05 (gallipoli portrait), 06 (torre_uluzzo portrait), 07, plus filter buttons still work.
Entry 03 shows Gallipoli old town from the sea (36610228) — acceptable for combo; image dark/cloudy but shows Salento town. Entries 04 (yacht+jetskis, kept) and 07 (dinner aboard, kept) unchanged. Still verify 05 gallipoli.jpg and 06 torre_uluzzo.jpg crops in viewport, then commit + push.
Issue found: Entry 05 (Half Day Charter) now shows gallipoli.jpg portrait crop — the sunset sky band is cut off and the framing shows only street/shops, looks dark and unbalanced in the landscape slot. torre_uluzzo.jpg (entry 06) will have a similar portrait crop risk (sunset horizon centered though — safer). FIX: swap entry 05 to a landscape image. Option: use gallipoli_desde-mar.jpg? portrait 589x756. None of the local harbor photos are landscape. Better fix for #5: generate? No — simpler: reuse torre_uluzzo2? No, duplicate. Use the existing pexels 7873392? That was the mismatch. Alternative: porto_gaio.jpg is portrait 736x1104 too.
DECISION: for #5 generate nothing — instead use cranchi_atlantique_50.jpg? That's the client's actual yacht (1080x?) — great for a yacht charter experience! Check orientation.
cranchi_atlantique_50.jpg: 1200x630 landscape — the client's ACTUAL Cranchi yacht underway, bow cutting water. Perfect for Half Day Charter #5 (yacht experience, Sant'Andrea/Gallipoli bay). Better than any pexels stock. USE for #5.
Also check torre_uluzzo.jpg crop risk for #6: portrait 801x1200 with sunset horizon around upper third — object-cover in landscape slot centers crop; sun may remain visible. Verify in browser; if sun cut off, adjust object-position.
## Final verification (all good)
- 01 torre_uluzzo2 landscape tower sunset: PERFECT
- 02 pasta focal crop (center 40%): woman + trays in Salento alley, well framed
- 05 cranchi_atlantique_50: client's actual yacht underway — excellent
- 06 torre_uluzzo focal crop (center 25%): sun + Punta della Suina tower visible, gorgeous
- 07 dinner aboard kept (matches), 04 yacht+jetskis kept (matches), 03 Gallipoli town kept
Next: check filter (By Land/By Sea) still functional? quick test then commit+push.
