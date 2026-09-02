# Wet Wipes Are Not Tissue: Why Log Saw Blades Corrode Instead of Wearing Out

A baby wipes converter pulled a log saw blade after nineteen days. Same spec, same
grind, same supplier as the blade running eight weeks on their tissue line in the next
building. The maintenance log said "dull." Under a loupe it wasn't dull at all: the
cutting edge was scalloped with dark micro-pits, worst on the face pointing into the
saturated log, and a bloom of rust had come up on the bore face over a weekend
shutdown.

That blade didn't wear out. It corroded.

## Corrosion and wear leave different marks

Wear is boring, and that's how you recognise it. A worn edge rounds evenly along the
full cutting arc, tooth after tooth, and the land polishes bright. Symmetric work,
symmetric result.

Corrosion isn't symmetric. Pitting concentrates where the impregnation solution sits:
the face toward the wet web, the last few millimetres before the gullet, anywhere the
blade doesn't fling itself clean at speed. Under 10x the pits are dark and irregular,
with no relationship to how many cuts the blade has made.

The most reliable tell costs nothing. A corroded blade cuts acceptably on Friday and
frays on Monday. Wear doesn't take weekends off. If your fray complaints cluster after
shutdowns, stop looking at the grind.

## D2 has 12% chromium and still isn't stainless

This is the part most buyers get wrong. D2 (1.2379) carries roughly 12% chromium, which
reads like stainless on a datasheet. It isn't. Most of that chromium is locked up in
M7C3 carbides, which is exactly what gives D2 its abrasion resistance, leaving the
surrounding matrix with far less free chromium than any stainless grade. Excellent wear
resistance. Mediocre corrosion resistance.

So the usual reflex — order a harder blade — buys nothing here. HRC 60 pits at
essentially the same rate as HRC 58.

The chemistry is also more relentless than tissue people expect. Wet wipe lines run
saturation ratios of 2.0–3.5x solution to substrate weight, so the blade is wet
continuously rather than occasionally. A typical lotion is 80–95% purified water plus
preservatives, humectants and surfactants. The surfactants are the problem child: they
drop surface tension, which is precisely what helps liquid creep into surface
micro-pores and stay there overnight. The same mechanism attacks
[nonwoven slitter knives](/products/nonwoven-slitter-knives) further up the line, just
noticed later because slitter edges get inspected less often.

## Coating is a barrier choice, not a hardness upgrade

Three routes, and they are not interchangeable.

**Uncoated D2, HRC 58–60.** Fine for dry nonwoven: airlaid, spunlace, thermobond. No
saturation chemistry means no corrosion problem, and you keep full CBN sharpening
compatibility. Don't pay for a coating you don't need.

**TiN PVD, 2–3 µm, HV 2300+.** The default for wet wipes and adult incontinence. Thin
and conformal, so it doesn't disturb the ground geometry; chemically inert against
alcohol and surfactants; hard enough to shrug off SAP particle micro-abrasion on
absorbent core lines.

**Hard chrome, 20–30 µm.** Use this when the environment rather than the web is the
aggressor: 75% RH and above, aggressive washdown, plants where blades sit mounted
through long stops. The thicker layer seals surface micro-pores instead of merely
covering them, and it lowers friction against synthetic fibre.

One thing nobody raises at the quotation stage: regrinding removes the coating at the
edge. A TiN blade is coated until its first sharpening, after which it's a D2 blade with
a coated body. Budget for re-coating at regrind, or plan a shorter second interval.
Buyers who skip this step conclude the coating "didn't work."

## Fraying is a geometry problem — don't fix it with coating

Separate failure, separate purchase order. Synthetic fibre is elastic: spunbond and SMS
deflect ahead of an edge instead of separating against it, which is why a bevel ground
for a [tissue log saw blade](/products/tissue-log-saw-blades) leaves stringy cut faces
on nonwoven. Nonwoven wants a steeper primary bevel, roughly 25°–35° against 15°–25° for
tissue, concentrating force at the contact point so the fibre parts instead of being
pushed. For lotion-impregnated logs with high cohesive strength, a compound bevel with
secondary relief holds a cleaner face across the run.

Runout tolerance tightens for the same reason. We hold ≤0.15 mm lateral and ≤0.10 mm
edge runout on [nonwoven log saw blades](/products/nonwoven-log-saw-blades), because an
elastic web amplifies wobble into fraying where cellulose would have absorbed it.

Next time a wipes blade comes off early, pull it after a two-day stop rather than at the
end of a shift, and put it under magnification before anyone writes a spec:

- Dark irregular pitting, worse on one face → coating problem, not a steel grade.
- Uniform bright rounding on every tooth → geometry or regrind interval.
- Both at once → you're running a tissue blade on a wipes line.

---

## Published

Live in `client/src/data/news.ts` as `nonwoven-log-saw-blade-corrosion`, dated
02.SEP.2026, author Eric. Route: `/news/nonwoven-log-saw-blade-corrosion`.

Four images shipped (the wet-wipe line scene and the bevel cross-section diagram from
the original five-prompt plan were dropped):

| Slot | File | Source |
|---|---|---|
| Cover (hero) | `nonwoven-log-saw-blade-corrosion-cover.webp` + `-640w` | AI, dark 16:9, wet floor, title space at left |
| Under "Corrosion and Wear Leave Different Marks" | `corrosion-pitting-vs-uniform-wear.webp` | AI, two edges side by side: clean bevel vs pitted bevel |
| Under "Coating Is a Barrier Choice" | `uncoated-d2-log-saw-blade-mirror-finish.webp` | AI, bright studio pair, mirror-finish uncoated face |
| Under "Fraying Is a Geometry Problem" | `log-saw-blade-pair-ground-edge.webp` | Real product photo |

Captions render automatically from the filename (`captionFromUrl` in `NewsDetail.tsx`),
so renaming a file changes the visible Fig. caption.
