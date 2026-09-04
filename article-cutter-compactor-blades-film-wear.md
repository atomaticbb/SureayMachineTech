# Cutter Compactor Blades: Why Film Kills Edges Faster Than Rigid Plastic

Open a compactor after six weeks on LDPE film and the knives usually look fine. No chips, no cracks, no obvious damage — just a slightly rounded edge and a thin grey skin of polymer welded along the flank. Meanwhile the plant is reporting throughput down, motor current up, and crumb that has started coming out lumpy. Someone fits a new set and the problem disappears for another six weeks.

That cycle is normal on film. It is not what happens on rigid flake, and the difference decides which steel you should be buying.

## Film Doesn't Strike the Edge — It Rubs It

A cutter compactor is not a granulator. [Granulator knives](/products/granulator-blades) cut a discrete piece and let it fall away. In a compactor the rotating knives do two jobs at the same time: they cut, and they generate the frictional heat that softens loose material into a dense, free-flowing crumb. That second job is what consumes them.

Film is almost no mass and enormous surface area. A charge of LDPE doesn't hit the edge — it wraps, drags and slides across the flank thousands of times a minute. The edge dies from contact time under heat, not from impact.

Rigid material does the opposite. PET flake, HDPE regrind and purge chunks arrive as discrete masses and shock the edge. What you get is micro-chipping along the cutting line, and it shows up fast — days after a bad charge, not gradually over weeks.

Same blade, same steel, two completely different wear curves.

## The Temperature on Your Controller Is Not the Temperature at the Edge

This is the part that catches plants out.

The vessel temperature on the panel is bulk material temperature. The tip of a knife in continuous rubbing contact with polymer runs hotter than that — and it is the local temperature at the edge, not the number on the display, that decides whether the steel keeps its hardness.

D2 is tempered low to reach HRC 58–61. Take the edge past its tempering temperature and the hardness does not come back when it cools down. The blade hasn't chipped and hasn't visibly worn away. It has gone soft in the top fraction of a millimetre, and from that point it rounds off quickly. Operators read this as a bad batch of blades. It usually isn't.

That is the real argument for M2 HSS on continuous film and PET duty — not that it is much harder at room temperature, but that it still holds its hardness at temperatures where D2 has already over-tempered. If you want the full material comparison, we covered the grades in [D2 vs SKD-11 vs tungsten carbide](/news/d2-vs-skd11-vs-tungsten-carbide); for compactor duty specifically, the choice sits between D2 and M2 on our [cutter compactor rotor and stator knives](/products/cutter-compactor-blades).

## What to Look At Before You Reorder

Look at the flank, not the edge. Polymer welded to the flank face tells you the edge was running hot and material was sticking instead of shearing cleanly — a heat problem, not a hardness problem. A blade showing a straw or blue band behind the cutting edge has been over-tempered in service. Don't send that one out for regrinding. You will grind a fresh edge onto steel that is already soft underneath, and it will fail again in a fraction of the time.

Then look at what changed upstream. Print-heavy film, calcium-carbonate-filled film, and post-consumer bales carrying paper label fibre and grit abrade several times faster than clean production scrap. A quiet change in feedstock will shorten blade life more than anything you can adjust on the machine.

## The Rule Worth Remembering

If the knives come out chipped, the answer is in the material and the cutting gap. If they come out rounded and glazed with no chips at all, the answer is in the steel and the heat.

Getting that backwards is expensive in both directions. Buying a tougher, softer grade to solve a heat problem gives you a blade that rounds off even sooner. Buying a harder, more brittle grade to solve an impact problem gives you one that chips on the first bad charge. Plants that replace compactor knives twice as often as they should are almost always solving the wrong one of the two.

---

## Image Plan

Source photos supplied: `Cutter Compactor Blades-001.png`, `Cutter Compactor Blades-002.png` (both 1448×1086, 4:3, white studio background). Both show the correct part geometry — trapezoidal stator knife, single countersunk hole, ground bevel along the long edge — matching the product page image `cutter-compactor-blades-02.webp`.

Site convention: news covers are **1600×900 (16:9)**, `.webp`, plus a `-640w` variant.

### Cover image — use `Cutter Compactor Blades-002.png`

- **Placement:** hero / top of article
- **Type:** `[Reference-image]` — supplied photo, reframed only
- **Target file:** `/images/news/cutter-compactor-blades-film-wear-cover.webp` (1600×900)
- **What to do:** do **not** crop to 16:9 — that clips the blade stack top and bottom. Extend the canvas left and right on the same white ground.
- **Prompt:** "Using this photo as the input image, keep the three stacked steel blades exactly as they are — same geometry, same proportions, same position, same ground bevel. Extend the canvas horizontally to a 16:9 landscape frame, filling the new space with the same clean white studio background and matching soft shadow falloff. Do not add, remove or reshape any parts. Leave the extended area empty. Photographic, sharp, no logos, no text."
- **Then:** darken the extended left third slightly in post if a title overlay is needed.
- **Alt text:** `Stack of cutter compactor stator knives showing the ground bevel along the long cutting edge`

### Content image 1 — under "Film Doesn't Strike the Edge — It Rubs It"

- **Type:** `[Photograph this real scene]` — **this is the missing shot, and the most valuable image in the article**
- **Shot to capture:** a used compactor rotor or stator knife pulled off a film line, laid flat on clean cardboard or a bench, shot from about 30° above with the cutting edge running diagonally across frame. Get close enough that the grey polymer skin welded along the flank reads as a discoloured band. Diffuse daylight from a window — no flash, which blows out the steel and kills exactly the detail that matters. Put a steel rule or caliper in frame for scale.
- **Why it can't be substituted:** every supplied photo shows new blades. The article's entire argument is reading wear, and nothing generated will convincingly fake a polymer-glazed flank.
- **Alt text:** `Worn cutter compactor knife from an LDPE film line with polymer welded along the flank face`

### Content image 2 — under "The Temperature on Your Controller Is Not the Temperature at the Edge"

- **Type:** `[Generate]` — concept diagram, no product geometry involved, so text-to-image is safe here
- **Prompt:** "A technical cross-section illustration of a cutting edge in contact with a thin polymer film, flat vector style on an off-white background. A hardened steel wedge enters from the left with its bevel facing right. A thin translucent film layer slides across the bevel face. A heat gradient sits inside the steel: intense orange concentrated in the top fraction of the tip, fading through amber to neutral grey a few millimetres back into the body of the blade. Thin callout leader lines with empty label boxes point to the tip zone and to the cooler bulk zone. Clean engineering-diagram aesthetic, navy and amber accents, no text, no numbers, no logos. 16:9 landscape."
- **Note:** leave the label boxes empty — generated lettering renders badly. Add labels afterwards as an SVG overlay so they stay crisp and translatable.
- **Alt text:** `Cross-section showing heat concentrated at the knife tip while the blade body stays cool`

### Content image 3 — under "What to Look At Before You Reorder"

- **Type:** `[Reference-image]` — use `Cutter Compactor Blades-001.png`
- **Target file:** `/images/news/cutter-compactor-stator-knives-new-reference.webp`
- **Role:** the reference condition. The section tells the reader to judge a returned blade, so give them the baseline — five correctly ground stator knives, uniform bevel, no rounding, no discolouration. It earns its place by being the thing the worn blade in image 1 is compared against, and the caption should say exactly that.
- **Prompt (optional restyle):** "Using this photo as the input image, keep all five blades exactly as they are — same shapes, same fan arrangement, same countersunk holes, same bevels. Extend the canvas to a 16:9 landscape frame with the same white studio background and matching soft shadows. Do not add, remove or reshape any parts. Photographic, sharp, no logos, no text."
- **Caption to write:** something along the lines of *"New stator knives: uniform bevel width, sharp edge line, no discolouration. This is the condition a returned blade is judged against."*
- **Alt text:** `New cutter compactor stator knives with uniform ground bevels, used as a wear reference`

### Content image 4 (optional) — under "The Rule Worth Remembering"

- **Type:** `[Photograph this real scene]`
- **Shot to capture:** two used knives side by side on a neutral grey surface — one rounded and glazed from film duty, one micro-chipped along the cutting line from rigid flake. Shoot straight down, both parallel, edges facing the same way, hard raking light from one side so chips throw visible shadows. A blade carrying a straw or blue temper band behind the edge beats both, because that is the failure the article describes and almost nobody publishes a photo of it.
- **Skip if unavailable** — the article closes fine on text alone, and a weak stand-in here is worse than no image.

---

## Photos not used here — better homes on the site

- **`blades-set-3.png`** (5-hole long bar shear blades): wrong geometry for a compactor article. Good fit for `/products/guillotine-shear-blades`, or the existing article *Guillotine Shear Blade Clearance: Setting the Gap and Reading the Cut Edge*.
- **`blades-set-1.png`** (mixed thick block knives): reads as a general hardened-blade family. Stronger as a capability image on the About / manufacturing pages or `/products/single-shaft-shredder-blades`.
- **`blades-set-2.png`** (long beveled knife + block + shaped knives): the shaped knives suit `/products/special-shaped-blades`.

## Publishing checklist

- [ ] Confirm origin and rights for the studio photos before upload — all four supplied files are 1448×1086 from what looks like one shoot; verify they are Sureay's own and not reused supplier stock, since a duplicate image across competitor sites weakens image indexing
- [ ] Extend cover to 1600×900, export `.webp` + `-640w` variant, match `/images/news/` naming
- [ ] Shoot content image 1 (worn blade) — blocking item for publication
- [ ] Add entry to `client/src/data/news.ts` — English only, **no `keyFacts` block**
- [ ] Set `relatedProductIds: ["cutter-compactor-blades", "granulator-blades"]`
- [ ] Verify the two product links and one article link resolve
