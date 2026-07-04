/**
 * news.ts — Corporate Dispatches Data Layer
 * Single source of truth for all news/dispatch articles.
 */

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface NewsContent {
  type: "paragraph" | "h2" | "h3" | "callout" | "image" | "table";
  value: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface DispatchArticle {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  isFeatured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string;
  relatedProductIds?: string[];
  content: NewsContent[];
}

export type DispatchAuthor = "Eric" | "lynn";

const DISPATCH_MONTHS: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

function parseDispatchDate(date: string): number {
  const [day, month, year] = date.split(".");
  const monthIndex = DISPATCH_MONTHS[month];

  if (!day || monthIndex === undefined || !year) {
    return 0;
  }

  return new Date(Number(year), monthIndex, Number(day)).getTime();
}

function sortDispatchesByDate(
  dispatches: DispatchArticle[]
): DispatchArticle[] {
  return [...dispatches].sort(
    (left, right) =>
      parseDispatchDate(right.date) - parseDispatchDate(left.date)
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const ALL_DISPATCHES: DispatchArticle[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-blade-wear-patterns",
    tag: "TECHNICAL GUIDE",
    date: "25.JUN.2026",
    title:
      "Wood Chipper Blade Wear Patterns: How to Diagnose and Fix Failures",
    excerpt:
      "Wood chipper blades dulling, chipping, or burning? Learn to read the three wear patterns, fix the root cause, and pick the right knife steel (A8 vs D2) for your machine.",
    image:
      "/images/products/wood-chipper-blades/wood-chipper-blades-18.webp",
    readTime: "5 MIN",
    seoTitle:
      "Wood Chipper Blade Wear Patterns: Diagnose & Fix Blade Failures | Sureay",
    metaDescription:
      "Wood chipper blades dulling, chipping, or burning? Learn to read the three wear patterns, fix the root cause, and pick the right knife steel (A8 vs D2) for your machine.",
    keywords:
      "wood chipper blade wear, chipper blade failure, chipper knife abrasion, chipper blade chipping, chipper blade heat marks, A8 chipper knife, D2 chipper blade",
    relatedProductIds: [
      "wood-chipper-blades",
      "wood-chipper-blades-industrial",
      "wood-chipper-blades-standard",
      "wood-chipper-anvils",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "The evidence you need is sitting in your scrap bin. Pull a worn knife off the rotor before you throw it out, and the edge will tell you why it failed and what it's costing you. A dull or wrongly ground blade doesn't just wear out. It burns fuel, throws off-spec chips, and forces unplanned stops. For anyone selling into biomass or pulp, off-spec is real money: ISO 17225-4 grades wood chips by particle size, and a tired edge pushes your output toward fines (the **≤3.15 mm** fraction) and oversize pieces, dropping you below the graded main fraction your buyer pays for.",
      },
      {
        type: "paragraph",
        value:
          "So read the blade before you reorder. Three wear patterns, three different causes.",
      },
      {
        type: "h2",
        value: "Sign 1: Rounded, polished edge (abrasive wear)",
      },
      {
        type: "paragraph",
        value:
          "A rounded, bright edge instead of a crisp one is plain abrasion: bark grit, sand, and dirt grinding the steel down over thousands of cuts. It's normal. The question is the rate. Clean, debarked stems are gentle on an edge; whole-tree feed dragged through dirt is not, which is why the same blade lasts a week on one job and two days on another.",
      },
      {
        type: "paragraph",
        value:
          "**At the machine:** tilt the edge to the light. A line of reflection along it means it's rounded over and no longer cutting.",
      },
      {
        type: "paragraph",
        value:
          "If you're rounding fast, the feed is more abrasive than the steel can handle. Clean incoming material where you can. For abrasive but **low-impact** feed (softwood, bamboo, clean high-volume runs), a high-wear cold-work grade like D2 / Cr12MoV gives the longest edge life — just don't carry it into impact-heavy work.",
      },
      {
        type: "h2",
        value: "Sign 2: Chipped corners (impact damage)",
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blade-wear-types.webp",
      },
      {
        type: "paragraph",
        value:
          "Chips and broken corners are not wear, they're impact: a stone, a nail, or a frozen knot striking an edge that's too hard, too thin, or ground too sharp to absorb the blow. Winter makes it worse, because frozen wood is far less forgiving.",
      },
      {
        type: "paragraph",
        value: "Two things to check before you blame the steel:",
      },
      {
        type: "paragraph",
        value:
          "**Bevel angle too sharp.** Most chipper knives run a single bevel around **30–40°** (**30–37°** on dense hardwood). Grind it sharper than spec and the edge loses the support behind it and chips. Match the OEM bevel; don't freehand it shallower chasing a \"sharper\" cut.",
      },
      {
        type: "paragraph",
        value:
          "**Wrong steel for the duty.** Wear resistance and toughness pull against each other, and the big carbides in D2 that resist wear are exactly what crack under impact. Whole-tree, knotty, or frozen feed calls for a tougher grade. Modified A8, sold in the trade as *chipper knife steel*, is the usual answer: tougher than D2, with enough wear resistance to hold an edge.",
      },
      {
        type: "paragraph",
        value:
          "This is where grade selection earns its keep. We supply [wood chipper blades](/products/wood-chipper-blades) in A8 / modified A8 for impact-heavy feed and D2-class for low-impact high-wear runs, with hardness and bevel matched to your machine, because the right steel for clean debarked logs is the wrong one for dirty whole-tree material.",
      },
      {
        type: "h2",
        value: "Sign 3: Blue or straw heat marks (friction and clearance)",
      },
      {
        type: "paragraph",
        value:
          "Burn coloring near the edge means the blade ran too hot. Heat draws the temper, the edge softens, and dulls fast. Usual causes: a dull edge, too steep a bevel, or too much gap against the anvil.",
      },
      {
        type: "paragraph",
        value: "Check these in order, all doable at the machine:",
      },
      {
        type: "paragraph",
        value:
          "**Anvil clearance.** Set the knife-to-anvil gap to the OEM figure (commonly near **1/8 in** for fresh blades, run as tight as **~0.040 in** on some machines). Too wide and the blade tears rather than shears; you'll see oversize chips and a smoking disc.",
      },
      {
        type: "paragraph",
        value:
          "**Edge condition.** A dull edge generates its own heat. If it's rounded, sharpen or flip it before chasing anything else.",
      },
      {
        type: "paragraph",
        value:
          "**Bevel angle.** Too steep and you're pushing wood, not cutting it.",
      },
      {
        type: "paragraph",
        value:
          "A worn [anvil or counter-knife](/products/wood-chipper-anvils) quietly wrecks both chip quality and blade life, so inspect it every time you change knives.",
      },
      {
        type: "h2",
        value: "Match the blade to your machine, not just the price",
      },
      {
        type: "image",
        value:
          "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
      },
      {
        type: "paragraph",
        value:
          "The wear pattern also tells you what to buy next. Disc chippers cut across the grain for uniform chip length, which is why pulp operations that grade chip size favor them. Drum chippers (Bandit, Vermeer, Morbark) prioritize throughput; some, like Vermeer, run reversible dual-edge knives you flip for a second life. Whatever the machine, replace knives in matched sets so the rotor stays balanced, and match length, thickness, bolt pattern, and bevel exactly.",
      },
      {
        type: "paragraph",
        value:
          "The cheapest blade per piece is rarely the cheapest per ton once downtime and downgraded chips are in the math.",
      },
      {
        type: "h2",
        value: "Not sure what your wear pattern is telling you?",
      },
      {
        type: "callout",
        value:
          "Send us a clear photo of your worn chipper blade. Our engineers will identify the wear mode (abrasion, impact, or heat) and recommend the steel grade, hardness, and bevel angle matched to your machine and wood species. [Talk to our engineering team](/contact).",
      },
    ],
  },
  {
    id: "circular-knife-types",
    tag: "TECHNICAL GUIDE",
    date: "24.JUN.2026",
    title:
      "Circular Knife Types: Slitting, Perforating, and Counter-Knife Geometries Explained",
    excerpt:
      "A technical guide to industrial circular knife types — toothed and perforating knives, plain slitting discs, and counter/under-knives — covering shear vs crush cutting, bevel geometry, and tool steel vs tungsten carbide.",
    image: "/images/news/circular-knife-types-cover.webp",
    readTime: "6 MIN",
    seoTitle:
      "Circular Knife Types: Slitting, Perforating & Counter-Knife Guide | Sureay",
    metaDescription:
      "A technical guide to industrial circular knife types — toothed and perforating knives, plain slitting discs, and counter/under-knives — covering shear vs crush cutting, bevel geometry, and tool steel vs tungsten carbide.",
    keywords:
      "circular knife types, industrial circular knives, slitter knives, perforating knife, counter knife, under knife, tungsten carbide circular knife",
    relatedProductIds: [
      "rotary-slitter-knives",
      "rotary-slitter-knives-paper",
      "tissue-log-saw-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "A circular knife looks simple — a hardened steel disc with a ground edge. What separates a knife that cuts clean for a million meters from one that burrs the edge after a shift is geometry, material, and how the blade is matched to the material it cuts. This guide breaks down the main families of circular knives used in slitting, converting, recycling, and metal processing, and explains why each form exists.",
      },
      {
        type: "paragraph",
        value:
          "Across every type, three things decide performance: the **edge geometry** (how the cutting face is ground), the **substrate** (tool steel, HSS, or tungsten carbide), and the **running accuracy** (concentricity, flatness, and balance). Get those right for the application and the knife does its job quietly. Get them wrong and you see burrs, dust, edge chipping, or premature dulling — usually blamed on the machine when the real cause is the blade.",
      },
      {
        type: "h2",
        value: "Toothed and perforating circular knives",
      },
      {
        type: "image",
        value: "/images/news/circular-knife-types-toothed.webp",
      },
      {
        type: "paragraph",
        value:
          "Toothed knives trade a continuous edge for a series of cutting points. There are two reasons to do that.",
      },
      {
        type: "paragraph",
        value:
          "The first is **grip and scoring**. A finely toothed edge bites into the material instead of skating across it, which matters on coated stock, laminates, or anything that wants to slide under a smooth blade. Gear-tooth knives are also frequently driven — the teeth mesh with a drive gear or a mating roller so the knife rotates at a controlled surface speed rather than being dragged by the web.",
      },
      {
        type: "paragraph",
        value:
          "The second is **perforating**: cutting a line of holes or slits instead of a full cut. A perforating knife alternates cut segments with uncut \"ties,\" and the ratio between them — the cut-to-tie ratio, set by tooth pitch and land width — controls how easily the line tears. Tissue and toweling, packaging tear strips, ticket and stamp stock, and stitch-style perforations on print work all rely on this. Wider teeth with bigger gaps give a weaker, easier tear; fine teeth with short ties hold the sheet together until you want it to separate.",
      },
      {
        type: "paragraph",
        value:
          "The trade-off with any toothed form is that the points concentrate wear and shock. Tooth pitch, depth, and the relief behind each tooth have to be matched to the material and speed, or the tips round off or chip.",
      },
      {
        type: "h2",
        value: "Plain circular slitter knives",
      },
      {
        type: "image",
        value: "/images/news/circular-knife-types-plain-slitter.webp",
      },
      {
        type: "paragraph",
        value:
          "The plain disc is the workhorse of web converting, and most of these run in one of two cutting modes. Browse our full [slitter knives range](/categories/slitter-knives) to see the geometries available.",
      },
      {
        type: "paragraph",
        value:
          "In **shear slitting**, a top knife overlaps a bottom (counter) knife the way the two blades of a pair of scissors overlap. The material is sheared between two passing edges, which gives the cleanest cut and the least dust — the standard for films, foils, paper, nonwovens, and laminates. Shear top knives are usually **single-bevel**: one flat face runs against the bottom knife, and the bevel is on the outside. The bevel angle is a balance — a shallow bevel is sharper and cuts cleaner but wears faster; a steeper bevel lasts longer but needs more force and can leave a heavier edge. For paper-specific applications, see our [paper slitter knives](/products/rotary-slitter-knives-paper).",
      },
      {
        type: "paragraph",
        value:
          "In **crush or score cutting**, a single knife is pressed against a hardened anvil roll and the material is severed by pressure rather than shear. These knives are usually **double-bevel** (a symmetrical V edge) and are simpler to set up because there's no bottom knife to align. The cut is rougher and the edge can be slightly compressed, so crush cutting suits nonwovens, some tapes, foam, and lighter materials where edge quality is less critical than setup speed and tool cost.",
      },
      {
        type: "paragraph",
        value:
          "Thickness matters too. A thin, large-diameter slitting ring deflects more easily and needs good support and low runout to track straight; a thicker disc is stiffer and holds its line under heavier loads. Diameter, bore, and side clearance all get specified to the slitter, not chosen off a shelf.",
      },
      {
        type: "h2",
        value: "Counter-knives and under-knives",
      },
      {
        type: "image",
        value: "/images/news/circular-knife-types-counter-knives.webp",
      },
      {
        type: "paragraph",
        value:
          "In a shear slitting setup the bottom knife does half the work, and it's easy to overlook. The counter-knife (or under-knife) is the fixed or driven lower blade that the top knife shears against. Its edge condition is just as important as the top knife's — a worn or nicked bottom edge ruins the cut no matter how sharp the top knife is.",
      },
      {
        type: "paragraph",
        value:
          "Two design details show up repeatedly in this group. The first is **the bore and mounting**. Keyed bores, multi-lobe cutouts, and bolt-circle patterns aren't decoration — they fix the knife's angular position so it can be indexed, driven, or clamped without slipping, and so a reground knife goes back in true. The second is **tungsten carbide edges**. On abrasive material — recycled plastics loaded with filler, glass-filled compounds, mineral-coated paper — high-speed steel dulls fast. A carbide edge holds sharpness far longer, at the cost of more brittleness, so it has to be supported well and protected from impact. For high-wear converting and recycling lines, carbide counter-knives often pay for themselves in reduced changeovers alone.",
      },
      {
        type: "h2",
        value: "Materials and edge life",
      },
      {
        type: "paragraph",
        value:
          "Most general-purpose circular knives are made from high-carbon, high-chromium tool steels (the D2 / SKD11 family) or HSS, hardened to roughly 58–62 HRC for a balance of edge retention and toughness. Where abrasion dominates, tungsten carbide takes over — much harder, much longer-running, but less forgiving of shock and misalignment. Surface treatments and coatings can extend life further on specific materials, but they don't fix a knife that's wrong for the job in the first place.",
      },
      {
        type: "paragraph",
        value:
          "Whatever the substrate, the unglamorous specs decide field performance: tight concentricity so the edge doesn't wobble, flat and parallel faces so shear knives mesh evenly, and balance so the blade runs smooth at speed. A knife that's perfectly sharp but runs out a few hundredths will still cut poorly and chip early.",
      },
      {
        type: "h2",
        value: "Choosing the right circular knife",
      },
      {
        type: "paragraph",
        value:
          "There's no universal best blade — there's the right blade for the material, the cut mode, and the line speed. A clean shear cut on thin film, a controlled tear on tissue, and a long-life cut on abrasive recyclate are three different problems that need three different knives. The practical path is to start from the application: what material, what edge quality, what volume, and what existing machine geometry the knife has to fit.",
      },
      {
        type: "callout",
        value:
          "At Sureay we manufacture the full range — toothed and perforating knives, plain [slitting discs](/products/rotary-slitter-knives), and counter/under-knives — in tool steel, HSS, and tungsten carbide, built to drawing or matched to a sample. Explore the complete [slitter knives category](/categories/slitter-knives) or [send us the part or the drawing](/contact) and we'll quote it directly.",
      },
    ],
  },
  {
    id: "export-shipment-poland-usa-vietnam",
    tag: "COMPANY NEWS",
    date: "18.JUN.2026",
    title:
      "Shipping Update – Three Export Orders Dispatched to Shanghai Port",
    excerpt:
      "Three export-standard wooden cases carrying shredder blades, scraper blades, and log saw blades have left the SUREAY facility bound for Poland, the United States, and Vietnam — delivering precision cutting solutions across three continents.",
    image: "/images/news/export-shipment-poland-usa-vietnam.webp",
    readTime: "2 MIN",
    seoTitle:
      "SUREAY Shipping Update: Three Export Orders Dispatched to Shanghai Port | Sureay",
    metaDescription:
      "Three export-standard wooden cases with shredder blades, scraper blades, and log saw blades have departed SUREAY's facility bound for Poland, the USA, and Vietnam via Shanghai Port.",
    keywords:
      "Sureay export, industrial blade shipment, shredder blades export, scraper blades, log saw blades, international shipping",
    content: [
      {
        type: "image",
        value: "/images/news/export-shipment-poland-usa-vietnam.webp",
      },
      {
        type: "paragraph",
        value:
          "Three export-standard wooden cases have been loaded onto a truck from SUREAY and are now en route to Shanghai Port for international shipment. Each case is securely packed in compliance with strict export regulations to ensure product integrity.",
      },
      {
        type: "paragraph",
        value:
          "One case carries shredder blades bound for Poland, one contains scraper blades for the United States, and the third holds log saw blades destined for Vietnam. All items passed rigorous quality inspections before packing.",
      },
      {
        type: "image",
        value: "/images/news/export-shipment-truck-loading.webp",
      },
      {
        type: "callout",
        value:
          "SUREAY is proud to deliver precision cutting solutions across three continents. We always adhere to the principles of quality first and service foremost, and are dedicated to providing our clients with one-on-one solutions.",
      },
    ],
  },
  {
    id: "choose-paper-slitter-knife-kraft-tissue-board",
    tag: "TECHNICAL GUIDE",
    date: "28.MAY.2026",
    title:
      "How to Choose the Right Paper Slitter Knife for Kraft, Tissue, and Board",
    excerpt:
      "Paper slitter knife selection depends on paper grade, basis weight, line speed, cutting method, and edge quality targets. This guide explains how to match knife material, geometry, and maintenance practice for stable converting performance.",
    image: "/images/news/paper-slitter-knife-selection-hero.webp",
    readTime: "7 MIN",
    seoTitle:
      "How to Choose the Right Paper Slitter Knife for Kraft, Tissue, and Board | Sureay",
    metaDescription:
      "Practical paper slitter knife selection guide for tissue, kraft, board, coated paper, and release liner lines. Compare HSS, D2, and carbide choices with setup and maintenance tips.",
    keywords:
      "paper slitter knife, paper slitter knives, paper converting blades, HSS paper slitter knives, carbide paper slitter blades, kraft paper slitting, tissue converting blades",
    relatedProductIds: [
      "rotary-slitter-knives-paper",
      "paper-cutting-blades",
      "tissue-log-saw-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "In paper converting, the right [paper slitter knife](/products/rotary-slitter-knives-paper) is not simply the sharpest knife in the drawer. A blade that performs well on light tissue may wear too quickly on kraft board, while a highly wear-focused grade can increase dust on softer paper when setup is not optimized.",
      },
      {
        type: "paragraph",
        value:
          "This guide explains how to choose paper slitter knives for tissue, kraft paper, board, coated paper, and release liner applications. It also covers common defects, material options, setup checks, and maintenance practices that help improve cut quality and blade life.",
      },
      {
        type: "h2",
        value: "Why Paper Grade Changes Knife Requirements",
      },
      {
        type: "paragraph",
        value:
          "Each paper grade behaves differently during slitting. Tissue is soft and easy to tear if edge stability drops. Kraft paper is stronger and often more abrasive, especially with higher recycled content. Board and corrugated grades require greater cutting force and can increase impact load on the edge.",
      },
      {
        type: "paragraph",
        value:
          "Because of these differences, knife selection should be based on real production conditions rather than a generic blade specification. The correct choice for a high-speed tissue rewinder may not be the best option for a kraft paper line running heavier rolls.",
      },
      {
        type: "h2",
        value: "Key Selection Factors",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Selection Factor", "Why It Matters", "What to Check"],
        tableRows: [
          [
            "Paper grade",
            "Different grades create different cutting loads",
            "Tissue, kraft, board, release liner, coated paper",
          ],
          [
            "Basis weight",
            "Heavier paper increases edge stress",
            "GSM range and roll-to-roll variation",
          ],
          [
            "Cutting method",
            "Shear, score, and razor need different geometry",
            "Machine type and knife arrangement",
          ],
          [
            "Line speed",
            "Higher speed amplifies runout and heat issues",
            "Normal and peak speed",
          ],
          [
            "Edge quality target",
            "Some applications tolerate dust less than others",
            "Dust, fiber pull, burr, coating lift",
          ],
          [
            "OEM compatibility",
            "Drop-in fit lowers setup risk",
            "Diameter, bore, thickness, bevel, spacer setup",
          ],
        ],
      },
      {
        type: "image",
        value: "/images/news/paper-slitter-knife-material-comparison.webp",
      },
      {
        type: "h2",
        value: "HSS vs D2 vs Carbide",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Knife Material", "Best Fit", "Strengths", "Watch Points"],
        tableRows: [
          [
            "HSS",
            "Tissue and general paper converting",
            "Good toughness, clean edge, easier regrind",
            "May wear faster on abrasive recycled paper",
          ],
          [
            "D2 tool steel",
            "Kraft paper, board, mixed grades",
            "Higher wear resistance than standard steels",
            "Needs proper heat treatment to avoid chipping",
          ],
          [
            "Tungsten carbide",
            "High-speed and abrasive applications",
            "Excellent wear resistance and edge retention",
            "Higher initial cost and stricter handling",
          ],
        ],
      },
      {
        type: "paragraph",
        value:
          "For soft tissue and hygiene grades, HSS often provides a practical balance of edge quality and toughness. For kraft, coated board, and higher-abrasion recycled paper, D2 or carbide configurations can better stabilize long campaign performance.",
      },
      {
        type: "h2",
        value: "Common Defects from Mismatched Knife Selection",
      },
      {
        type: "image",
        value: "/images/news/paper-slitting-edge-quality-defects.webp",
      },
      {
        type: "h3",
        value: "Edge Dust",
      },
      {
        type: "paragraph",
        value:
          "Edge dust usually rises when the knife dulls early, the material grade lacks wear resistance, or cutting pressure is excessive. Recycled fibers and fillers can accelerate wear if blade grade is under-specified.",
      },
      {
        type: "h3",
        value: "Fiber Pull",
      },
      {
        type: "paragraph",
        value:
          "Fiber pull appears when the blade tears the sheet instead of producing a clean cut. This is common on tissue when edge sharpness, angle, or setup stability is insufficient.",
      },
      {
        type: "h3",
        value: "Uneven Slit Width",
      },
      {
        type: "paragraph",
        value:
          "Width variation can come from guiding or arbor issues, but blade manufacturing accuracy also matters. Tighter side runout and precision grinding help maintain stable slit width across the roll.",
      },
      {
        type: "h2",
        value: "Practical Maintenance to Extend Blade Life",
      },
      {
        type: "paragraph",
        value:
          "A good blade still requires good handling. Clean mounting surfaces, verify arbor condition, and keep knife sets organized. Small installation errors can create large quality losses at high line speed.",
      },
      {
        type: "callout",
        value:
          "Checklist: Clean knife faces and spacers before installation, check runout and bearing condition, inspect edge condition before each campaign, and regrind before severe edge collapse.",
      },
      {
        type: "paragraph",
        value:
          "If your line is facing repeated dust or edge inconsistency, compare options in the [slitter knives category](/categories/slitter-knives), review related [paper cutting blades](/products/paper-cutting-blades), and align blade specification with your [paper industry](/paper-industry) process conditions.",
      },
      {
        type: "callout",
        value:
          "Need a recommendation for your current line? Send paper grade, basis weight, cutting method, speed, and current blade dimensions. Sureay engineers can suggest a practical material and geometry match.",
      },
    ],
  },
  {
    id: "log-saw-blade-chipping-causes-prevention",
    tag: "MAINTENANCE GUIDE",
    date: "20.MAY.2026",
    title:
      "Five Common Causes and Preventive Measures for Log Saw Blade Chipping",
    excerpt:
      "Blade chipping on tissue log saw lines leads to rough cuts, dimensional drift, and unplanned stops. This guide explains five root causes and practical prevention steps to stabilize cut quality and extend blade life.",
    image: "/images/news/log-saw-blade-chipping-hero.webp",
    readTime: "6 MIN",
    seoTitle:
      "Log Saw Blade Chipping: 5 Root Causes and Prevention Guide | Sureay",
    metaDescription:
      "Learn the five most common causes of log saw blade chipping and how to prevent them with proper clearance setup, runout control, speed matching, material selection, and installation practice.",
    keywords:
      "log saw blade chipping, tissue log saw blade maintenance, blade clearance setting, cutter shaft runout, tissue converting blade troubleshooting",
    relatedProductIds: ["tissue-log-saw-blades", "rotary-slitter-knives-paper"],
    content: [
      {
        type: "paragraph",
        value:
          "In tissue converting lines, blade condition directly determines cut-face quality, dust level, and line uptime. When a [tissue log saw blade](/products/tissue-log-saw-blades) starts chipping, the result is usually immediate: rough edges, unstable dimensions, and frequent blade changes that reduce OEE.",
      },
      {
        type: "paragraph",
        value:
          "This guide summarizes five common causes of chipping and the field-proven actions maintenance teams can take to prevent recurrence.",
      },
      {
        type: "image",
        value: "/images/news/log-saw-blade-chipping-hero.webp",
      },
      {
        type: "h2",
        value: "1. Improper Clearance Between Blade and Bottom Cutter",
      },
      {
        type: "paragraph",
        value:
          "If clearance is too large, the blade enters with impact. If it is too small, friction heat rises and micro-cracks can propagate at the edge.",
      },
      {
        type: "callout",
        value:
          "Prevention: Verify clearance during setup with a feeler gauge and keep it within 0.03-0.08 mm. Recheck before each shift start.",
      },
      {
        type: "h2",
        value: "2. Cutter Shaft Runout Out of Tolerance",
      },
      {
        type: "paragraph",
        value:
          "Worn bearings or loose lock nuts can increase radial runout, concentrating stress on one side of the edge and accelerating local chipping.",
      },
      {
        type: "callout",
        value:
          "Prevention: Measure shaft runout monthly with a dial indicator and keep it at or below 0.02 mm. Correct bearing and locking issues immediately.",
      },
      {
        type: "h2",
        value: "3. Feed Speed and Blade Linear Speed Mismatch",
      },
      {
        type: "image",
        value: "/images/news/log-saw-blade-chipping-causes.webp",
      },
      {
        type: "paragraph",
        value:
          "When feed speed is too high for current blade speed, tooth load rises sharply. Repeated overload impacts can exceed edge strength and trigger chipping.",
      },
      {
        type: "callout",
        value:
          "Prevention: Use OEM baseline parameters and recalibrate after paper grade changes, especially when basis weight or humidity changes.",
      },
      {
        type: "h2",
        value: "4. Incorrect Blade Material Selection",
      },
      {
        type: "paragraph",
        value:
          "Using a lower wear-grade blade in high-ash or high-moisture paper applications can turn micro-wear into rapid edge collapse.",
      },
      {
        type: "paragraph",
        value:
          "For many high-speed paper and tissue operations, pairing the right log saw blade with upstream [paper slitter knives](/products/rotary-slitter-knives-paper) helps maintain consistent edge quality across the converting process.",
      },
      {
        type: "callout",
        value:
          "Prevention: Align blade grade with production profile: alloy/carbide-oriented options for continuous high-load lines, HSS for lighter and shorter campaigns.",
      },
      {
        type: "h2",
        value: "5. Installation Impact or Uneven Bolt Torque",
      },
      {
        type: "image",
        value: "/images/news/log-saw-blade-processing.webp",
      },
      {
        type: "paragraph",
        value:
          "Small impacts during handling can introduce hidden cracks. Uneven tightening can cause wobble, which then amplifies crack growth during rotation.",
      },
      {
        type: "callout",
        value:
          "Prevention: Use soft-contact handling tools, tighten in diagonal sequence, and apply controlled torque in staged passes.",
      },
      {
        type: "h2",
        value: "Quick Self-Checklist",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Observed Symptom", "Likely Cause", "How to Verify"],
        tableRows: [
          [
            "Continuous small notches",
            "Improper clearance or high runout",
            "Feeler gauge + dial indicator"
          ],
          [
            "Localized large edge collapse",
            "Feed overload or foreign hard object",
            "Check process parameters + incoming material"
          ],
          [
            "Blunt edge with light chipping",
            "Insufficient wear resistance",
            "Review blade material against paper condition"
          ],
          [
            "Chipping on first run after mounting",
            "Installation impact or uneven torque",
            "Audit mounting method and tightening sequence"
          ]
        ],
      },
      {
        type: "paragraph",
        value:
          "If your team is diagnosing recurrent issues, start from the full [log saw blade category](/categories/log-saw-blades) to compare blade options, then validate your line setup against paper-specific process conditions in our [paper industry](/paper-industry) resources.",
      },
      {
        type: "callout",
        value:
          "Need help diagnosing a failed blade? Send photos of the chipped edge plus your paper type, basis weight, and line speed. Sureay engineers can provide a practical root-cause recommendation for your converting line.",
      },
    ],
  },
  {
    id: "nonwoven-slitter-knives-guide",
    tag: "TECHNICAL GUIDE",
    date: "14.MAY.2026",
    title:
      "The Complete Guide to Nonwoven Slitter Knives: Types, Materials, and Applications",
    excerpt:
      "In nonwoven fabric manufacturing, precision cutting determines product quality and production efficiency. This guide covers blade types, material choices, and key applications to help manufacturers select the right slitter knife for their operation.",
    image: "/images/news/types-of-nonwoven-slitter-knives.webp",
    readTime: "7 MIN",
    seoTitle:
      "Complete Guide to Nonwoven Slitter Knives: Types, Materials & Applications | Sureay",
    metaDescription:
      "Everything manufacturers need to know about nonwoven slitter knives — circular, straight, razor, and score-cut types, blade materials (HSS, carbide, ceramic), and industry applications.",
    keywords:
      "nonwoven slitter knives, slitter knife types, circular slitter knife, nonwoven cutting blade, HSS slitter knife, tungsten carbide slitter blade, nonwoven fabric slitting",
    relatedProductIds: ["nonwoven-slitter-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "In nonwoven fabric manufacturing, precision cutting is everything. A clean, consistent slit determines product quality, minimizes waste, and keeps production lines running at full speed. At the heart of this process sits a critical but often overlooked component — the [nonwoven slitter knife](/products/nonwoven-slitter-knives). Whether you're producing surgical gowns, baby diapers, or automotive insulation, the right slitter knife can make or break your operation.",
      },
      {
        type: "paragraph",
        value:
          "This guide covers the essentials every manufacturer, engineer, and procurement professional should know about nonwoven slitter knives.",
      },
      {
        type: "h2",
        value: "What Are Nonwoven Slitter Knives?",
      },
      {
        type: "paragraph",
        value:
          "[Nonwoven slitter knives](/products/nonwoven-slitter-knives) are industrial cutting blades designed specifically for slitting wide rolls of nonwoven fabric into narrower strips or sheets. Unlike woven textiles, nonwoven materials are bonded through chemical, mechanical, or thermal processes, giving them unique fiber structures that demand specialized cutting tools.",
      },
      {
        type: "paragraph",
        value:
          "These knives must deliver clean edges without fraying, tearing, or distorting the material — challenges that standard cutting blades simply cannot handle across the full range of nonwoven fabrics.",
      },
      {
        type: "h2",
        value: "Types of Nonwoven Slitter Knives",
      },
      {
        type: "paragraph",
        value:
          "Choosing the right blade type depends on your slitting method, machine configuration, and material characteristics.",
      },
      {
        type: "image",
        value: "/images/news/types-of-nonwoven-slitter-knives.webp",
      },
      {
        type: "h3",
        value: "Circular (Rotary) Knives",
      },
      {
        type: "paragraph",
        value:
          "Circular rotary knives are the most widely used in nonwoven slitting. These disc-shaped blades rotate at high speed and work in pairs — an upper and lower blade — to create a scissor-like shearing action. They excel at high-speed continuous slitting and produce exceptionally clean edges on spunbond and meltblown fabrics.",
      },
      {
        type: "image",
        value: "/images/news/circular-slitter-knives-0514.webp",
      },
      {
        type: "h3",
        value: "Straight Knives",
      },
      {
        type: "paragraph",
        value:
          "Straight knives feature a fixed linear blade edge and are typically used in crush-cutting applications where the blade presses the material against a hardened anvil roll. They are simpler to set up and work well for heavier-weight nonwovens such as needle-punched felts.",
      },
      {
        type: "h3",
        value: "Razor Blades",
      },
      {
        type: "paragraph",
        value:
          "Razor blades are thin, ultra-sharp blades used for lightweight and delicate nonwovens. They require minimal force and produce very little dust or fiber contamination. However, they wear quickly and are best suited for short-run or low-tension applications.",
      },
      {
        type: "h3",
        value: "Score-Cut Knives",
      },
      {
        type: "paragraph",
        value:
          "Score-cut knives combine features of both rotary and razor styles. The blade scores through the material against a hardened roll, making them ideal for laminates and multi-layer nonwoven composites.",
      },
      {
        type: "h2",
        value: "Blade Materials and Coatings",
      },
      {
        type: "paragraph",
        value:
          "The material composition of a slitter knife directly impacts its edge retention, durability, and suitability for specific nonwoven types.",
      },
      {
        type: "image",
        value: "/images/news/blade-materials-and-coatings.webp",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material", "Key Properties", "Best Suited For"],
        tableRows: [
          ["High-Speed Steel (HSS)", "Tough, sharp, easy to resharpen", "General-purpose nonwoven slitting"],
          ["Tungsten Carbide", "Superior hardness, long wear life", "Abrasive materials, fiberglass-reinforced nonwovens"],
          ["Ceramic", "Chemically inert, corrosion-resistant", "Cleanroom, medical & hygiene manufacturing"],
          ["TiN / Chromium Coated", "Reduced friction, anti-adhesion", "Sticky or adhesive-backed nonwovens"],
        ],
      },
      {
        type: "paragraph",
        value:
          "High-Speed Steel (HSS) offers a strong balance of toughness and sharpness. It is cost-effective and easy to resharpen, making it a popular choice for general-purpose nonwoven slitting. Tungsten Carbide provides superior hardness and wear resistance — carbide blades last significantly longer than HSS, particularly when cutting abrasive materials like fiberglass-reinforced nonwovens. Ceramic blades resist corrosion and thermal degradation, making them well suited for cleanroom environments. Coated blades featuring titanium nitride (TiN) or chromium coatings reduce friction, prevent material adhesion, and extend blade life — a valuable option for sticky or adhesive-backed nonwovens.",
      },
      {
        type: "h2",
        value: "Key Applications Across Industries",
      },
      {
        type: "image",
        value: "/images/news/nonwoven-knives-applications.webp",
      },
      {
        type: "paragraph",
        value:
          "Nonwoven slitter knives serve a wide range of sectors. In the hygiene industry, they slit materials for diapers, feminine care products, and adult incontinence pads. Medical applications include cutting surgical drapes, wound dressings, and face mask fabrics. Filtration manufacturers rely on precision slitting for air and liquid filter media. The automotive sector uses slitter knives for headliners, insulation, and trunk liners. Geotextile producers depend on them for erosion control and drainage fabrics.",
      },
      {
        type: "h2",
        value: "Choosing the Right Knife",
      },
      {
        type: "paragraph",
        value:
          "Selecting the optimal [nonwoven slitter knife](/products/nonwoven-slitter-knives) requires evaluating several factors: the fabric's weight, fiber composition, bonding method, line speed, desired edge quality, and production volume. Working closely with a blade supplier who understands nonwoven materials is the most reliable way to match the right knife to your specific operation.",
      },
      {
        type: "callout",
        value:
          "Investing in the correct slitter knife isn't just a purchasing decision — it's a commitment to product quality, operational efficiency, and long-term cost savings. [Contact us](/contact) to find the right nonwoven slitter knife for your line.",
      },
    ],
  },
  {
    id: "wood-chipper-knife-sharpening-guide",
    tag: "TECHNICAL GUIDE",
    date: "13.MAY.2026",
    title:
      "Wood Chipper Knife Sharpening Guide: Bevel Angles, Tolerances & Regrind Limits",
    excerpt:
      "Operating with dull wood chipper knives degrades chip uniformity, spikes fuel consumption, and accelerates bearing wear. This technical guide covers OEM bevel angles, grinding thermal limits, and through-hardened vs. case-hardened lifespan — so every regrind cycle delivers full edge performance.",
    image: "/images/news/wood-chipper-blades-working.webp",
    readTime: "8 MIN",
    isFeatured: true,
    seoTitle:
      "Wood Chipper Knife Sharpening Guide: Bevel Angles, Tolerances & Regrind Limits | Sureay",
    metaDescription:
      "Technical guide on wood chipper knife maintenance. Learn optimal bevel angles, grinding tolerances, and metallurgical limits for D2, 9CrSi, and HSS blades.",
    keywords:
      "wood chipper knife sharpening, chipper blade bevel angle, chipper knife regrind, D2 chipper blade maintenance, 9CrSi chipper knife, HSS chipper blade, chipper knife grinding guide",
    relatedProductIds: [
      "wood-chipper-blades",
      "wood-chipper-blades-industrial",
      "wood-chipper-blades-standard",
      "wood-chipper-anvils",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Operating with dull wood chipper knives degrades chip uniformity, spikes fuel consumption by 15–25%, accelerates bearing wear, and introduces destructive friction into the drum assembly. This guide details the precise sharpening protocols — including OEM bevel angles, thermal limits during grinding, and strict balance tolerances — required to maintain edge geometry without compromising the blade's metallurgical integrity.",
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-working.webp",
      },
      {
        type: "h2",
        value: "1. Diagnostics: When to Pull Blades for Sharpening",
      },
      {
        type: "paragraph",
        value:
          "Premature sharpening wastes usable steel; delayed sharpening damages machinery. Monitor these four operational metrics to determine exact sharpening intervals:",
      },
      {
        type: "callout",
        value:
          "DEGRADED CHIP GEOMETRY: Cleanly sheared chips replaced by fibrous, torn splinters — indicates edge rounding. LOSS OF SELF-FEEDING: Operators must force material into the drum — blade geometry has failed. LOAD SPIKES (15–25%): Monitor hydraulic RPM drops or electric amp draw — dull blades crush rather than shear. VISUAL WEAR BAND: A bright reflective band exceeding 0.5 mm on the cutting edge dictates immediate sharpening.",
      },
      {
        type: "h2",
        value: "2. Required Tooling & Tolerances",
      },
      {
        type: "paragraph",
        value:
          "Professional regrinding requires strict thermal and geometric control. Use a wet surface grinder or bench grinder with a fixed tool rest fitted with Aluminum Oxide (46–60 grit) wheels — never use green Silicon Carbide wheels on tool steel. A continuous water bath is mandatory; dry grinding requires manual quenching every 3–5 seconds to prevent drawing the temper. Essential measurement tools: digital protractor for bevel angle verification, micrometer for minimum thickness compliance, and a precision digital scale (±1 g resolution) for drum balancing.",
      },
      {
        type: "h2",
        value: "3. Bevel Angle Specifications",
      },
      {
        type: "paragraph",
        value:
          "The bevel angle dictates the blade's structural durability and cutting efficiency. Deviating from OEM specifications causes premature edge fracture (if too acute) or loss of feed (if too obtuse).",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Feedstock / Application", "Target Bevel Angle", "Technical Rationale"],
        tableRows: [
          ["Green Softwood (Pine, Poplar)", "25° – 28°", "Low-density shearing; acute edge for clean fibre slicing."],
          ["Mixed Species (Birch, Ash)", "28° – 32°", "Optimal balance of impact resistance and shearing efficiency."],
          ["Dry Hardwood (Oak, Hickory)", "32° – 37°", "Dense, high-impact material; greater cross-section prevents edge rollover."],
          ["Contaminated / Urban Waste", "35° – 42°", "Maximum toughness against tramp metal; survivability over sharpness."],
        ],
      },
      {
        type: "paragraph",
        value:
          "Standard OEM baselines: Bandit (30°–35°), Vermeer (30°), Morbark (33°–37°). Always verify against your machine's manual before grinding.",
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-install.webp",
      },
      {
        type: "h2",
        value: "4. Standard Sharpening Protocol",
      },
      {
        type: "h3",
        value: "Step 1 — Pre-Grind Inspection",
      },
      {
        type: "paragraph",
        value:
          "Lay the removed blade on a precision flat surface. Reject and replace any blade showing thermal warping or micro-cracks near the bolt holes. Grinding a cracked blade risks catastrophic centrifugal fragmentation inside the drum.",
      },
      {
        type: "h3",
        value: "Step 2 — Bevel Marking & Jig Setup",
      },
      {
        type: "paragraph",
        value:
          "Coat the existing bevel face with a black marker. Make a light test pass against the wheel. If the marker is removed evenly across the full bevel width, the jig angle is calibrated correctly. If only the heel or tip is exposed, adjust the tool rest before proceeding.",
      },
      {
        type: "h3",
        value: "Step 3 — Controlled Material Removal",
      },
      {
        type: "paragraph",
        value:
          "Remove 0.02–0.05 mm per pass. This is the critical thermal control step: chipper knives are heat-treated to HRC 55–62. Exceeding 200°C — indicated by straw-yellow or blue oxidation on the steel surface — irreversibly draws the temper, leaving localised soft spots. If the steel blues at any point, the heat treatment is ruined and the blade must be replaced.",
      },
      {
        type: "h3",
        value: "Step 4 — Wire Edge (Burr) Removal",
      },
      {
        type: "paragraph",
        value:
          "Grinding pushes a micro-burr onto the rake face. Lay the blade flat (rake face down) and use a fine stone with 3–5 flat strokes to remove this burr completely. Failing to deburr results in immediate edge collapse on first contact with timber.",
      },
      {
        type: "h3",
        value: "Step 5 — Drum Balancing (±2 Gram Tolerance)",
      },
      {
        type: "paragraph",
        value:
          "At 2,000+ RPM, uneven blade weights destroy drum bearings within hours. Weigh all sharpened blades on a digital scale. If variances exist, pair blades of identical weight on opposite sides of the drum to ensure dynamic balance across all positions.",
      },
      {
        type: "h2",
        value: "5. Regrind Limits & Metallurgical Lifespan",
      },
      {
        type: "paragraph",
        value:
          "Stop sharpening and replace the blade when: (1) the blade drops below 60–70% of its original thickness, exceeding the maximum adjustment range of the anvil; (2) removing enough steel to clear deep chips (>2 mm) drops the blade below safe operating dimensions; or (3) previous dry-grinding has blued the steel, permanently compromising the HRC rating.",
      },
      {
        type: "callout",
        value:
          "CRITICAL: Budget aftermarket blades are often only case-hardened. The first regrind strips the hardened exterior, exposing a soft core that dulls rapidly. Premium industrial knives must be through-hardened — uniform HRC from surface to core — so every regrind cycle delivers identical edge performance.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material Grade", "Expected Regrind Cycles", "Performance Notes"],
        tableRows: [
          ["T10 High-Carbon", "3 – 5 total", "Base level. Rapid wear on hardwoods; frequent regrinding required."],
          ["9CrSi / Cr12MoV", "6 – 10 total", "Excellent mid-tier alloy. Higher chrome content resists abrasive wear."],
          ["D2 (SKD11)", "8 – 12 total", "Premium tool steel. Exceptional edge retention and impact resistance."],
          ["M2 HSS", "6 – 10 total", "Maximum hardness, but highly sensitive to thermal shock during grinding."],
        ],
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-18.webp",
      },
      {
        type: "h2",
        value: "Upgrade Your Chipper Uptime with Sureay",
      },
      {
        type: "paragraph",
        value:
          "Sureay manufactures precision wood chipper knives in through-hardened 9CrSi, Cr12MoV, D2, and M2 HSS — maintaining identical HRC ratings from surface to core, so every regrind cycle delivers OEM-level edge performance. Exact fitment for single and reversible double-edge configurations across Bandit, Vermeer, Morbark, and Doppstadt platforms.",
      },
      {
        type: "callout",
        value:
          "[Request a technical quote for OEM replacement knives →](/contact)",
      },
    ],
  },
  {
    id: "blade-material-selection-guide-by-industry",
    tag: "TECHNICAL GUIDE",
    date: "07.MAY.2026",
    title:
      "One-size-fits-all? A quick reference chart of blade materials for different industries",
    excerpt:
      "Which blade material is best for your industry? No single material fits every application. This quick reference chart helps procurement teams and engineers pinpoint the right blade material — carbide, HSS, tool steel, or stainless — for their specific processing environment.",
    image: "/images/common/material-selection.webp",
    readTime: "5 MIN",
    seoTitle:
      "Blade Material Selection: Carbide vs HSS vs Tool Steel",
    metaDescription:
      "Quick reference chart: which industrial blade material suits your industry? Compare carbide, high-speed steel, tool steel, and stainless steel across paper, plastic, food, metal, and construction sectors.",
    keywords:
      "blade material selection, carbide blade, HSS blade, tool steel, industrial cutting blade, blade material guide",
    relatedProductIds: [
      "rotary-slitter-knives",
      "granulator-blades",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
      "paper-cutting-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          '"Which blade material is best suited for my industry?" This is the question we get asked most often. The answer is straightforward: no single material is suitable for all situations. The quick reference chart below will help you pinpoint the right choice for your specific application.',
      },
      {
        type: "image",
        value: "/images/common/material-selection.webp",
      },
      {
        type: "h2",
        value: "Industry vs. Recommended Blade Material — Quick Reference",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Industry / Application", "Recommended Material", "Why?"],
        tableRows: [
          [
            "Household paper processing (tissue log saw blade, paper cutting blade)",
            "Alloy (carbide)",
            "Extremely high wear resistance, fewer tool changes required for continuous production, and lower overall cost.",
          ],
          [
            "Printing and packaging paper cutting (paper cutting blade, three-knife trimmer blade)",
            "High-speed steel (HSS) or powder metallurgy (PM)",
            "Good toughness — withstands frequent starts, stops, and minor impacts.",
          ],
          [
            "Plastic recycling and shredding (shredder blade)",
            "Tool steel — Cr12MoV / D2",
            "High impact resistance, prevents cracking, and can be re-ground multiple times.",
          ],
          [
            "Plastic pelletizing (pelletizer cutting blade)",
            "Alloy (carbide) or high-speed steel (HSS)",
            "Carbide delivers long service life for high-filler materials; HSS is economical and practical.",
          ],
          [
            "Melt filter scraper blade",
            "Alloy (carbide)",
            "Prolonged contact with the mesh plate demands high wear resistance while maintaining cutting edge integrity.",
          ],
          [
            "Food processing (food blade)",
            "Stainless steel or alloy",
            "Must be rust-proof, corrosion-resistant, and meet food-grade requirements.",
          ],
          [
            "Metal slitting shear (rotary slitting blade)",
            "Carbide or powder metallurgy (PM)",
            "High hardness, high wear resistance, smooth cut surface without burrs.",
          ],
          [
            "Press brake mold / shearing machine blade",
            "Tool steel — Cr12MoV / 42CrMo",
            "High strength and deformation resistance, suitable for heavy-duty stamping.",
          ],
          [
            "Construction machinery accessories (wear-resistant parts)",
            "Low-alloy high-strength steel or hardfacing weld",
            "Impact resistant, wear resistant, and adaptable to harsh working conditions.",
          ],
        ],
      },
      {
        type: "h2",
        value: "Quick decision guide",
      },
      {
        type: "callout",
        value:
          "FOR LONG LIFESPAN & FEWER TOOL CHANGES → Choose carbide. FOR TOUGHNESS & COST-EFFECTIVENESS → Choose high-speed steel (HSS). FOR RUST PREVENTION & FOOD CONTACT → Choose stainless steel. FOR IMPACT RESISTANCE & HEAVY-DUTY OPERATION → Choose tool steel.",
      },
      {
        type: "h2",
        value: "Still unsure?",
      },
      {
        type: "paragraph",
        value:
          "Tell us your equipment model, processing materials, and daily output, and Sureay engineers will customize a material selection plan for you — free of charge. [Contact us for a free consultation](/contact).",
      },
    ],
  },
  {
    id: "d2-vs-skd11-vs-tungsten-carbide",
    tag: "TECHNICAL GUIDE",
    date: "16.MAR.2026",
    title:
      "D2 vs SKD-11 vs tungsten carbide: a complete guide to choosing industrial blade materials",
    excerpt:
      "Compare D2, SKD-11, and tungsten carbide industrial blade materials. Learn about hardness, wear resistance, toughness, cost, and best applications for industrial cutting knives.",
    image: "/images/news/choosing-industrial-blades-materials.webp",
    readTime: "8 MIN",
    isFeatured: true,
    relatedProductIds: [
      "granulator-blades",
      "rotary-slitter-knives",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
    ],
    content: [
      { type: "h2", value: "Introduction" },
      {
        type: "paragraph",
        value:
          "Choosing the correct material for industrial blades is critical for production efficiency, blade lifespan, and maintenance costs. Three of the most commonly used materials in industrial cutting knives are D2 tool steel, SKD-11 tool steel, and tungsten carbide. Each material has unique advantages in terms of hardness, wear resistance, toughness, and machining cost.",
      },
      {
        type: "paragraph",
        value:
          "This guide helps engineers and procurement teams select the most suitable material for [slitter knives](/products/rotary-slitter-knives), [shredder blades](/products/twin-shaft-blades-recycling), [granulator knives](/products/granulator-blades), and recycling cutting tools.",
      },
      {
        type: "image",
        value:
          "/images/news/a-complete-guide-to-choosing-industrial-blad-materials.webp",
      },

      { type: "h2", value: "D2 Tool Steel" },
      {
        type: "paragraph",
        value:
          "D2 is a high-carbon, high-chromium cold-work tool steel widely used in industrial blades. It offers a hardness range of 55–2 HRC with excellent wear resistance, good dimensional stability, and easy regrindability — making it cost-effective for most applications.",
      },
      {
        type: "callout",
        value:
          "D2 TYPICAL APPLICATIONS: [Slitter knives](/products/rotary-slitter-knives), [paper cutting blades](/products/paper-cutting-blades), plastic cutting knives, [industrial shearing knives](/products/metal-shear-knives).",
      },

      { type: "h2", value: "SKD-11 Tool Steel" },
      {
        type: "paragraph",
        value:
          "SKD-11 is the Japanese JIS standard equivalent to D2. Properties are very similar but SKD-11 often shows slightly improved hardenability, toughness, and wear resistance consistency. It reaches 56–1 HRC and is favored in precision cutting knives, die cutting tools, and industrial machine blades where tighter tolerances are required.",
      },
      {
        type: "callout",
        value:
          "SKD-11 VS D2: While chemically near-identical, SKD-11 benefits from stricter JIS refining standards, resulting in finer carbide distribution and marginally better impact toughness under cyclic loading.",
      },

      { type: "h2", value: "Tungsten Carbide" },
      {
        type: "paragraph",
        value:
          "Tungsten carbide is a sintered composite material made of tungsten carbide particles bonded with cobalt. It is significantly harder than tool steel, reaching 1500–500 HV. It provides extremely high wear resistance and excellent edge retention, but has low impact resistance and higher manufacturing cost.",
      },
      {
        type: "callout",
        value:
          "TUNGSTEN CARBIDE APPLICATIONS: [Recycling shredder knives](/products/twin-shaft-blades-recycling), abrasive material cutting, glass fiber or composite cutting, high-wear environments where blade longevity outweighs regrinding flexibility.",
      },

      { type: "h2", value: "Material Property Comparison" },
      {
        type: "paragraph",
        value:
          "Hardness — D2: 55–2 HRC | SKD-11: 56–1 HRC | Tungsten Carbide: 1500–500 HV. Wear Resistance — D2: High | SKD-11: High | Carbide: Extremely High. Toughness — D2: Medium | SKD-11: Medium-High | Carbide: Low. Regrinding — D2: Easy | SKD-11: Easy | Carbide: Difficult. Cost — D2: Medium | SKD-11: Medium-High | Carbide: High. Impact Resistance — D2: Moderate | SKD-11: Moderate | Carbide: Low.",
      },

      { type: "h2", value: "Material Selection Guide" },
      { type: "h3", value: "High Wear Applications" },
      {
        type: "paragraph",
        value:
          "Best choice: Tungsten Carbide. Ideal for [plastic recycling shredders](/products/twin-shaft-blades-recycling), fiberglass cutting, and abrasive materials. Advantages include extremely long blade life, reduced downtime, and consistent cutting performance. The primary limitation is higher cost and fragility under impact loads.",
      },

      { type: "h3", value: "General Industrial Cutting" },
      {
        type: "paragraph",
        value:
          "Best choice: D2 or SKD-11. Suitable for paper converting lines, plastic sheet cutting, and packaging materials. These steels offer good wear resistance, easy regrinding, and cost-effective total ownership. Most industrial cutting operations fall into this category.",
      },

      { type: "h3", value: "Applications with Impact Loads" },
      {
        type: "paragraph",
        value:
          "Best choice: SKD-11 or modified tool steels. When processing mixed recycling waste or materials with metal contamination risk, tool steels provide significantly better toughness and shock resistance than carbide. Choosing carbide in high-impact scenarios can lead to unexpected blade breakage.",
      },

      { type: "h2", value: "Blade Lifespan Comparison" },
      {
        type: "callout",
        value:
          "RELATIVE BLADE LIFESPAN — D2 Steel: 6/10 | SKD-11 Steel: 7/10 | Tungsten Carbide: 10/10. Measured under standardized abrasive cutting conditions. Actual lifespan varies by application, feed rate, and material being processed.",
      },

      { type: "h2", value: "Maintenance Strategy" },
      {
        type: "paragraph",
        value:
          "Proper maintenance significantly improves blade life regardless of material choice. Key practices include scheduled regrinding (tool steel blades can typically be re-sharpened multiple times, reducing replacement cost and maintaining cutting precision), material contamination control (install magnetic separators and metal detectors to prevent metal fragments from damaging blades), and effective cooling and lubrication (reduces thermal stress, prevents edge deformation, and improves cutting stability).",
      },

      { type: "h2", value: "Common Misconceptions" },
      {
        type: "paragraph",
        value:
          '"Harder is always better" — Not necessarily. Higher hardness often means lower toughness, increasing fracture risk. The optimal material balances hardness against the specific impact and fatigue demands of your application.',
      },
      {
        type: "paragraph",
        value:
          '"Carbide works for every application" — Carbide performs poorly in high-impact environments. Selecting carbide for the wrong scenario leads to unexpected blade breakage and higher total cost than a well-chosen tool steel.',
      },

      { type: "h2", value: "Quick Selection Checklist" },
      {
        type: "paragraph",
        value:
          "Before ordering industrial blades, consider: What material is being cut? Is the environment abrasive? Is there risk of metal contamination? How important is blade regrinding? What is the acceptable downtime cost? Answering these questions helps determine the optimal blade material for your operation.",
      },

      { type: "h2", value: "Conclusion" },
      {
        type: "paragraph",
        value:
          "Selecting the right blade material balances durability, cost, maintenance, and cutting precision. Use tungsten carbide for high-wear environments where longevity justifies the investment. Use D2 or SKD-11 for most industrial cutting applications where regrindability and cost matter. Always consider impact loads before selecting carbide — a well-chosen material can significantly reduce production downtime and operational cost.",
      },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id: "custom-metal-shear-blades-batch-production",
    tag: "COMPANY NEWS",
    date: "28.APR.2026",
    title:
      "Precision manufacturing delivered: high-performance metal shear blades ready for global export",
    excerpt:
      "Sureay recently completed a large batch of custom metal shear blades (900x75x25mm), combining precision grinding, strict quality control, and export-grade VCI packaging for global scrap metal processing facilities.",
    image:
      "/images/products/granulator-blades/metal-shear-blades-09.webp",
    readTime: "5 MIN",
    seoTitle:
      "Precision Manufacturing Delivered: Custom Metal Shear Blades Batch Ready for Export | Sureay",
    metaDescription:
      "Sureay recently completed a large batch of custom metal shear blades (900x75x25mm). Discover our precision grinding, strict quality control, and export-grade VCI packaging for global scrap metal processing facilities.",
    keywords:
      "metal shear blades, guillotine shear knives, scrap metal blades, D2 tool steel blades, Sureay industrial knives",
    relatedProductIds: ["metal-shear-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "At Sureay, we understand that for scrap metal recycling and heavy fabrication facilities, blade failure is not an option. Unscheduled downtime caused by chipped or rapidly wearing shear knives directly impacts your bottom line.",
      },
      {
        type: "paragraph",
        value:
          "This week, our manufacturing facility successfully completed the production, inspection, and packaging of a major batch of custom heavy-duty metal shear blades, engineered specifically for high-volume scrap processing applications.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-09.webp",
      },
      { type: "h2", value: "Uncompromising Dimensional Accuracy" },
      {
        type: "paragraph",
        value:
          "Achieving clean, efficient cuts in thick metal requires strict tolerances. As showcased in our recent production run, every blade undergoes rigorous CNC surface grinding to ensure absolute flatness and parallelism along the entire cutting edge.",
      },
      {
        type: "paragraph",
        value:
          "This specific batch features custom dimensions of 900mm x 75mm x 25mm, manufactured exactly to the client's OEM specifications. The precision-machined countersunk holes guarantee a seamless, secure fitment into the guillotine shear equipment, eliminating micro-vibrations during the shearing impact that often lead to premature blade fracture.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-06.webp",
      },
      { type: "h2", value: "Premium Tool Steel & Heat Treatment" },
      {
        type: "paragraph",
        value:
          "While dimensional accuracy is critical, metallurgical integrity determines the lifespan of the knife. These metal shear blades are forged from premium, high-alloy tool steel (options include D2, H13, or specialized 9CrSi depending on the cutting application).",
      },
      {
        type: "paragraph",
        value:
          "Through advanced vacuum heat treatment processes, we achieve the optimal balance between high surface hardness (for edge retention) and core toughness (to withstand severe mechanical shock from tramp metal).",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-07.webp",
      },
      { type: "h2", value: "Export-Grade Packaging for Global Reliability" },
      {
        type: "paragraph",
        value:
          "A high-quality industrial blade is useless if it arrives damaged or corroded. At Sureay, our commitment to quality extends to our dispatch logistics.",
      },
      {
        type: "paragraph",
        value:
          "Every single shear blade in this batch was coated with an industrial rust-inhibitor, tightly wrapped in VCI (Volatile Corrosion Inhibitor) paper, and securely bundled. This multi-layer export packaging ensures that whether these blades are shipped to North America, Europe, or Southeast Asia, they arrive in pristine, ready-to-install condition.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-08.webp",
      },
      { type: "h2", value: "Upgrade Your Shearing Operations with Sureay" },
      {
        type: "paragraph",
        value:
          "Are your current metal shear blades wearing out too quickly? We manufacture replacement knives for all major brands of scrap shears, alligator shears, and guillotine shears. We provide exact OEM replacements or upgraded metallurgical formulations tailored to your specific cutting challenges.",
      },
      {
        type: "callout",
        value:
          "[Contact Sureay Engineering Today](/contact) — Send us your drawings or OEM part numbers for a fast, technical evaluation and quote.",
      },
    ],
  },

  {
    id: "shredder-metallurgy-maximizes-recycling-yields",
    tag: "TECHNICAL GUIDE",
    date: "30.MAR.2026",
    title:
      "The recycling boom: how advanced shredder metallurgy maximizes mechanical recycling yields",
    excerpt:
      "Discover how upgrading your shredder blades from standard D2 to DC53 or H13 tool steel can prevent catastrophic blade failure, survive tramp metal impacts, and maximize your recycling plant's uptime.",
    image: "/images/news/shredder-machine-working.webp",
    readTime: "7 MIN",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "single-shaft-shredder-blades",
      "single-shaft-bed-knives",
      "tire-shredder-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "In the mechanical recycling industry, profitability isn't just about the volume of material you process; it is strictly measured by continuous machine uptime. As global mandates push for higher percentages of recycled plastics and metals, recycling facilities are processing unprecedented volumes of Municipal Solid Waste (MSW), industrial scrap, and end-of-life tires.",
      },
      {
        type: "paragraph",
        value:
          "But there is a brutal reality on the tipping floor: waste is never clean.",
      },
      {
        type: "paragraph",
        value:
          'When processing mixed bales of plastics or wood, shredder rotors inevitably encounter "tramp metal" — stray steel bolts, engine blocks, or hidden rebar. When a high-speed shredder blade hits a solid steel inclusion, the kinetic energy is massive. If your blades are made from the wrong metallurgical grade, they won\'t just dull; they will catastrophically shatter, destroying the rotor shaft and halting your entire line for days.',
      },
      {
        type: "paragraph",
        value:
          "To maximize yields and survive the chaos of modern recycling, plant managers must look beyond basic blade geometry and understand the science of shredder metallurgy.",
      },

      {
        type: "h2",
        value: "The Brittle Trap: Why Standard D2 Fails in Mixed Waste",
      },
      {
        type: "paragraph",
        value:
          "For decades, D2 (1.2379) cold-work tool steel has been the default choice for industrial cutting. Packed with 1.5% Carbon and 12% Chromium, D2 hardens beautifully to HRC 60–2, offering fantastic wear resistance when cutting clean, predictable materials like paper or pure plastic films.",
      },
      {
        type: "paragraph",
        value:
          "However, D2 achieves this hardness through the formation of massive, brittle chromium carbides in its microstructure. In a heavy-duty twin-shaft shredder application, high hardness equals low impact toughness. When a D2 hook blade bites into a hidden steel bolt, the brittle chromium carbides act as stress-concentration points. The blade snaps, sending broken shards of hardened steel through the cutting chamber, often destroying adjacent knives and the bed anvil in a domino effect.",
      },
      {
        type: "callout",
        value:
          "For clean, post-industrial plastic regrind (using [granulators](/products/granulator-blades)), D2 remains a cost-effective choice. But for primary breakdown shredders facing unpredictable MSW, D2 is a ticking time bomb.",
      },

      { type: "h2", value: "Upgrading the Arsenal: DC53 and H13 Tool Steels" },
      {
        type: "paragraph",
        value:
          'To conquer extreme impact environments, elite blade manufacturers shift the metallurgical focus from pure "hardness" to "transverse rupture strength" (toughness).',
      },
      { type: "h3", value: "DC53: The Superior Cold-Work Alternative" },
      {
        type: "paragraph",
        value:
          "DC53 is an advanced modification of standard D2. Through a refined alloy composition and tighter control over the steel-making process, DC53 eliminates the massive carbide structures found in D2. Heat-treated to HRC 60, DC53 maintains the excellent wear resistance of D2 but delivers double the impact toughness. It is the ultimate choice for heavy-duty [single-shaft shredder inserts](/products/single-shaft-shredder-blades) processing tough, thick-walled plastics, copper cables, and tires where moderate shock loads are expected.",
      },
      { type: "h3", value: "H13 (1.2344): The Shock-Absorbing King" },
      {
        type: "paragraph",
        value:
          "Originally developed for hot-forging dies, H13 hot-work tool steel is the undisputed champion of the scrap yard. It contains lower carbon (0.40%) and utilizes a chromium-molybdenum-vanadium matrix. Hardened to a slightly lower HRC 52–6, H13 possesses massive core toughness. When an H13 [twin-shaft shredder blade](/products/twin-shaft-blades-recycling) hits a solid steel engine block, the blade might dent or deform elastically, but it will not shatter. This shock-absorbing characteristic saves the shredder's gearbox, hexagonal shaft, and bearings from catastrophic failure.",
      },

      {
        type: "h2",
        value: "The Ultimate Hybrid: Hardfacing and Surface Armor",
      },
      {
        type: "paragraph",
        value:
          "What if you need the extreme shock absorption of H13, but the wear resistance of a carbide blade to process highly abrasive materials like glass-fiber-reinforced plastics or sand-covered agricultural films?",
      },
      {
        type: "paragraph",
        value:
          "The answer is Hardfacing (Surface Welding). Leading tooling manufacturers take a tough, shatter-proof core (like H13 or customized alloy steel) and use PTA (Plasma Transferred Arc) welding to overlay a super-hard armor matrix — such as Stellite or Tungsten Carbide grit — directly onto the cutting hooks and wear faces.",
      },
      {
        type: "callout",
        value:
          "BIMETALLIC CONSTRUCTION: A blade that absorbs explosive impacts internally, while resisting severe abrasive wear externally — the holy grail of shredding.",
      },

      { type: "h2", value: "Maximizing Your Shredder's Uptime" },
      {
        type: "paragraph",
        value:
          'Every recycling line has a unique "diet." Using a one-size-fits-all blade material guarantees you are either overpaying for unnecessary tooling or bleeding money through excessive maintenance downtime.',
      },
      {
        type: "paragraph",
        value:
          "At Sureay, we engineer our [Single Shaft Shredder Blades](/products/single-shaft-shredder-blades) and [Twin Shaft Shredder Knives](/products/twin-shaft-blades-recycling) to perfectly match your specific waste stream. From DC53 concave inserts for high-throughput plastic reduction to massive H13 hook blades for heavy metal and [tire processing](/products/tire-shredder-blades), our vacuum heat-treatment protocols ensure your tooling survives the most violent impacts your facility can throw at it.",
      },
      {
        type: "paragraph",
        value:
          "Don't let tramp metal dictate your production schedule. Contact our metallurgical engineering team today for a free wear-analysis of your current shredder blades, and discover how upgrading your alloy can transform your MTBR (Mean Time Between Replacements) from weeks into months.",
      },
    ],
  },
  {
    id: "facility-expansion-phase-iii",
    tag: "COMPANY NEWS",
    date: "24.OCT.2024",
    title: "Global facility expansion phase III",
    excerpt:
      "Commissioning of our new 5,000 m² high-precision CNC grid expands heavy-duty shredder blade production capacity by 40%, establishing Sureay's largest single-facility output in its 16-year operational history.",
    image: "/images/about/factory-00.webp",
    readTime: "5 MIN",
    relatedProductIds: [
      "granulator-blades",
      "metal-shear-knives",
      "rotary-slitter-knives",
    ],
    content: [
      { type: "h2", value: "Background & Rationale" },
      {
        type: "paragraph",
        value:
          "Since the original Ma'anshan facility commissioning in 2008, Sureay Machinery has operated under a constrained floor footprint of 10,000 m². The structural limitation reached critical threshold in Q3 2023, when incoming OEM order volume exceeded single-shift throughput capacity by 23%. A systematic capacity audit — conducted jointly by our operations and metallurgical engineering teams — identified three bottleneck nodes: raw stock pre-treatment staging, 5-axis CNC queue depth, and post-heat-treatment CMM throughput.",
      },
      {
        type: "paragraph",
        value:
          "Phase III expansion was ratified by executive management in November 2023, with groundbreaking commencing January 2024. The investment targets a net increase of 5,000 m² of temperature-controlled precision manufacturing space, directly adjacent to the existing CNC grid.",
      },
      {
        type: "callout",
        value:
          "CAPACITY PROJECTION: Phase III commissioning is forecast to increase annual blade output by 40%, from 18,000 units/year to 25,200 units/year at full operational load.",
      },
      { type: "h2", value: "Phase III Infrastructure" },
      {
        type: "paragraph",
        value:
          "The new wing incorporates six Mazak VARIAXIS i-800 5-axis machining centers, each rated for ±0.002 mm positional repeatability under continuous-duty thermal load. Coolant management has been upgraded to a closed-loop chiller system maintaining ±0.5°C spindle temperature stability — a critical variable for maintaining dimensional consistency across long-run blade batches.",
      },
      {
        type: "paragraph",
        value:
          "Two additional Ipsen TITAN N vacuum heat treatment furnaces have been installed, expanding heat cycle capacity by 60%. Each furnace chamber accommodates batch loads up to 800 kg, enabling simultaneous processing of full production runs for high-volume OEM orders without queue interruption.",
      },
      { type: "h3", value: "Metrology Expansion" },
      {
        type: "paragraph",
        value:
          "A Hexagon Global Silver CMM with 3.0 m × 2.5 m measurement volume has been added to the quality bay, supplementing the existing Renishaw system. Both units are now networked to a centralized metrology database, providing real-time dimensional trend analysis and automated non-conformance flagging for every production batch.",
      },
      { type: "h2", value: "Production Capacity Metrics" },
      {
        type: "callout",
        value:
          "OPERATIONAL DATA — CNC spindle utilization: Previous 71% — Phase III target 85%. Heat treatment throughput: Previous 1,200 kg/week — Phase III 1,920 kg/week. CMM inspection throughput: Previous 340 parts/day — Phase III 520 parts/day.",
      },
      {
        type: "paragraph",
        value:
          "The expanded CNC grid enables parallel scheduling across product families — [shredder blade](/products/twin-shaft-blades-recycling) runs can now proceed concurrently with [log saw blade](/products/tissue-log-saw-blades) batches without resource contention. This architectural separation of machine types by product vertical minimizes setup changeover time and preserves dedicated tooling inventories per product line.",
      },
      { type: "h2", value: "Quality Protocol Integration" },
      {
        type: "paragraph",
        value:
          "Phase III operations are governed under the existing ISO 9001:2015 QMS framework, with scope extension formally filed with our SGS certification body in August 2024. All Phase III equipment has been incorporated into the calibration and preventive maintenance schedule, with baseline capability studies (Cpk ≥1.67) completed on all new machining centers prior to production release.",
      },
      {
        type: "paragraph",
        value:
          "Material traceability has been extended to full heat lot-level tracking across the new furnace units, ensuring end-to-end documentation from incoming steel certification to outbound dimensional report — maintaining unchanged protocol integrity from the legacy facility.",
      },
      { type: "h2", value: "Deployment Timeline" },
      {
        type: "paragraph",
        value:
          "Civil construction completed on schedule in June 2024. Equipment installation and utility commissioning ran July–September 2024. Production qualification runs commenced October 2024, with full commercial capacity release scheduled for Q1 2025. All current OEM delivery commitments are maintained through the legacy facility during the transition window.",
      },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id: "high-hardness-metal-shear-guide",
    tag: "TECHNICAL GUIDE",
    date: "11.MAR.2026",
    title: "Why choose high-hardness metal shear knives?",
    excerpt:
      "Enhance precision and longevity in heavy-duty fabrication. High-hardness shear blades deliver exceptional durability, accuracy, and operational efficiency in industrial metal cutting applications.",
    image: "/images/products/granulator-blades/metal-shear-blades-02.webp",
    readTime: "7 MIN",
    relatedProductIds: [
      "metal-shear-knives",
      "metal-coil-slitting-knives",
      "metal-cold-saw-blades",
    ],
    content: [
      {
        type: "h2",
        value: "Introduction: The Stakes in Industrial Metal Cutting",
      },
      {
        type: "paragraph",
        value:
          "In industries that require precision metal cutting, durability and efficiency are non-negotiable. High-hardness shear blades stand out for their ability to handle tough materials like stainless steel and hot-rolled billets while maintaining extreme sharpness and longevity. By choosing the right blade, steel service centers and fabrication plants can significantly reduce downtime, lower cost-per-cut, and optimize their entire business operation.",
      },

      { type: "h2", value: "What Are High-Hardness Metal Shear Knives?" },
      {
        type: "paragraph",
        value:
          "High-hardness shear blades are a class of heavy-duty industrial knives designed to maintain a sharp, durable edge under continuous, high-stress use. Unlike standard off-the-shelf blades, Sureay's [Metal Shear Knives](/products/metal-shear-knives) are forged from premium tool steels and advanced alloys—such as 9CrSi, Cr12MoV (D2 equivalent), and H13.",
      },
      {
        type: "paragraph",
        value:
          "Through strict in-house vacuum heat treatment, we achieve an optimal Rockwell hardness rating, typically ranging from 58 to 62 HRC depending on the specific application. This sophisticated hardening process involves both precise heating and quenching to achieve the perfect balance between absolute hardness and impact toughness. The result? A blade that is highly resistant to wear, deformation, and edge chipping, minimizing maintenance and ensuring uninterrupted production.",
      },

      {
        type: "h2",
        value: "Core Applications: Matching the Blade to the Extreme",
      },
      {
        type: "paragraph",
        value:
          "High-hardness cutting blades are indispensable in numerous heavy industries due to their resilience and precision. At Sureay, we categorize our metal shear knives based on the exact thermal and mechanical stress of your operation:",
      },
      {
        type: "h3",
        value: "Cold-Rolled & Mild Steel Shearing (Standard Duty)",
      },
      {
        type: "paragraph",
        value:
          "Utilizing high-carbon steels like T10 and 65Mn (57-59 HRC), these blades are incredibly cost-effective for shearing standard A3 plates and general metal recycling.",
      },
      { type: "h3", value: "Stainless & Medium Plate Shearing (Heavy Duty)" },
      {
        type: "paragraph",
        value:
          "Cutting stainless steel requires extraordinary wear resistance. Our Cr12MoV and 6CrW2Si blades (58-62 HRC) excel in [metal coil slitting](/products/metal-coil-slitting-knives) and shearing applications by maintaining a sharp edge over prolonged use.",
      },
      { type: "h3", value: "Hot-Rolled Billet Shearing (Extreme Temp)" },
      {
        type: "paragraph",
        value:
          "Engineered for heavy steel mills, our H13 and LD alloy blades feature extreme 'Red Hardness.' They retain their structural integrity and resist annealing even when shearing hot slabs at extreme temperatures.",
      },

      {
        type: "h2",
        value: "Key Benefits of Upgrading to High-Hardness Blades",
      },
      {
        type: "paragraph",
        value:
          "Investing in Sureay's high-hardness shear knives offers transformative benefits to industrial operations:",
      },
      {
        type: "callout",
        value:
          "ENHANCED DURABILITY: High-hardness shear blades are far more wear-resistant, meaning fewer blade changes and longer production runs without interruptions.",
      },
      {
        type: "paragraph",
        value:
          "Superior Cutting Precision: With their ability to hold a sharp edge, these blades provide clean, burr-free cuts across thick alloy plates. This precision reduces material waste and guarantees edge straightness.",
      },
      {
        type: "paragraph",
        value:
          "Reduced Maintenance Costs: The longevity and resilience of high-hardness blades directly lower your maintenance overhead. In heavy-use environments, studies estimate that high-hardness blades can reduce annual maintenance costs by up to 40%.",
      },

      { type: "h2", value: "How to Choose the Right Shear Blade" },
      {
        type: "paragraph",
        value:
          "Selecting the exact match for your mechanical or hydraulic guillotine shear involves careful consideration of several factors:",
      },
      {
        type: "paragraph",
        value:
          "Material Compatibility: Matching the blade material to the specific metal being cut is essential. Do not use a standard T10 carbon blade to cut thick stainless steel; instead, opt for Cr12MoV.",
      },
      {
        type: "paragraph",
        value:
          "Hardness vs. Toughness: While high hardness increases wear resistance, excessive hardness can make a blade brittle. Sureay engineers expertly balance this by recommending 58-62 HRC for heavy-duty applications, ensuring impact resistance without chipping.",
      },
      {
        type: "paragraph",
        value:
          "Edge Geometry: Depending on your machine setup, blades can be manufactured with 1, 2, or 4 indexable cutting edges, effectively multiplying the blade's service lifespan.",
      },

      { type: "h2", value: "Maintenance Tips for Extending Blade Life" },
      {
        type: "paragraph",
        value:
          "To maximize your ROI on high-hardness shear blades, proper maintenance is crucial:",
      },
      {
        type: "callout",
        value:
          "DYNAMIC CLEARANCE CONTROL: Always adjust the horizontal gap between the upper and lower blades based on the thickness of the metal plate. Incorrect clearance is the #1 cause of edge chipping.",
      },
      {
        type: "paragraph",
        value:
          "Use Appropriate Materials Only: Cutting materials beyond the blade's design parameters (e.g., cutting titanium with a mild steel blade) can accelerate wear and lead to catastrophic damage.",
      },
      {
        type: "paragraph",
        value:
          "Timely Sharpening: Regular inspections and scheduled sharpening at the right intervals ensure that blades remain efficient and reduce the tonnage force required from your machine motor.",
      },

      { type: "h2", value: "Conclusion: Partner with Sureay" },
      {
        type: "paragraph",
        value:
          "High-hardness shear blades offer unparalleled durability, precision, and cost savings for heavy metal fabrication. Whether you operate in shipbuilding, aviation, structural steel, or a dedicated steel service center, upgrading your guillotine shears with [exact-match OEM metal shear knives](/products/metal-shear-knives) will guarantee continuous, peak performance.",
      },
      {
        type: "paragraph",
        value:
          "Ready to equip your facility with the ultimate cutting edge? Contact the Sureay engineering team today for a technical audit and custom blade quotation.",
      },
    ],
  },
  {
    id: "cryogenic-treatment-alloy-blades",
    tag: "TECHNICAL GUIDE",
    date: "12.SEP.2024",
    title: "Advanced cryogenic treatment for alloy blades",
    excerpt:
      "Technical whitepaper on how deep cryogenic processing (-196°C) enhances wear resistance in plastic recycling applications.",
    image: "/images/process/heat-treatment.webp",
    readTime: "4 MIN",
    relatedProductIds: [
      "granulator-blades",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Conventional quench-and-temper heat treatment leaves 10–0% retained austenite in high-alloy tool steels such as D2, M2, and the CPM series. This metastable phase reduces hardness ceiling and accelerates micro-spalling at the cutting edge under cyclic impact loading — a primary failure mode in plastic film and pipe recycling applications.",
      },
      {
        type: "paragraph",
        value:
          "Deep cryogenic processing (DCP) at -196°C transforms residual austenite to martensite, increasing carbide density at the matrix level. Independent laboratory analysis of DCP-treated D2 specimens shows a 12–8% improvement in wear resistance (ASTM G65 dry-sand rubber-wheel test) versus conventionally treated controls.",
      },
      {
        type: "callout",
        value:
          "TEST DATA: D2 blade, conventional treatment — wear scar depth 0.42 mm after 6,000 revolution test cycle. D2 blade, DCP post-treatment — wear scar depth 0.36 mm. Improvement: 14.3% reduction in material loss at equivalent load and abrasion conditions.",
      },
      { type: "h2", value: "Process Protocol" },
      {
        type: "paragraph",
        value:
          "Post-quench, blades are placed in a programmable cryogenic chamber and cooled at a controlled rate of 3°C/min to -196°C. Soak duration is minimum 24 hours. Parts are returned to ambient temperature at 2°C/min to prevent thermal shock cracking. A final low-temperature temper cycle (175°C, 2 hours) follows to relieve transformation stresses.",
      },
      { type: "h2", value: "Application Scope" },
      {
        type: "paragraph",
        value:
          "DCP is recommended for blades operating in abrasive-dominant environments: HDPE/PP pipe [granulation](/products/granulator-blades), wet-process [tissue log sawing](/products/tissue-log-saw-blades), and [multi-shaft recycling](/products/twin-shaft-blades-recycling) of glass-fibre-reinforced polymers. For impact-dominant applications (steel scrap shredding), conventional treatment with toughness-optimized tempering remains the preferred specification.",
      },
    ],
  },
  {
    id: "k-show-2024-recycling-knives",
    tag: "COMPANY NEWS",
    date: "05.AUG.2024",
    title: "K-Show 2024: next-gen recycling knives deployed",
    excerpt:
      "Live demonstrations of our aggressively angled hook-tooth profiles engineered for high-throughput single shaft shredders.",
    image: "/images/process/cnc-precision-grinding.webp",
    readTime: "3 MIN",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "granulator-blades",
      "tire-shredder-blades",
      "scrap-chopper-blades",
    ],
    content: [
      { type: "h2", value: "Exhibition Overview" },
      {
        type: "paragraph",
        value:
          "K 2024 (Düsseldorf, October 16–3) marked Sureay Machinery's third consecutive appearance at the world's leading plastics and rubber trade fair. Booth 12C34 in Hall 12 hosted demonstration units for our new hook-tooth [single-shaft shredder blade](/products/single-shaft-shredder-blades) series, purpose-built for throughput rates exceeding 8 t/h on post-consumer LDPE film bales.",
      },
      {
        type: "callout",
        value:
          "VISITOR DATA: 340 qualified engineering contacts registered at the Sureay booth across 8 exhibition days. 28 active RFQ processes initiated within 30 days of exhibition close.",
      },
      { type: "h2", value: "Hook-Tooth Profile Engineering" },
      {
        type: "paragraph",
        value:
          "The new geometry features a 15° positive rake angle with a sharpened secondary land profile, reducing initial bite force while maintaining edge stability over extended run cycles. Compared to the outgoing flat-top profile, lab trials on 6 mm HDPE sheet show a 22% reduction in motor current draw at equivalent feed rate — directly translating to energy cost savings for the end operator.",
      },
    ],
  },
  {
    id: "tin-vs-chrome-coating",
    tag: "TECHNICAL GUIDE",
    date: "28.JUL.2024",
    title: "Surface metallurgy: TiN vs. chrome coating",
    excerpt:
      "A comparative metrology report on blade surface friction coefficients in high-humidity tissue paper converting environments.",
    image: "/images/common/Quality-Inspection.webp",
    readTime: "6 MIN",
    relatedProductIds: [
      "tissue-log-saw-blades",
      "rotary-slitter-knives",
      "paper-cutting-blades",
    ],
    content: [
      { type: "h2", value: "Test Objective" },
      {
        type: "paragraph",
        value:
          "[Tissue log saw blades](/products/tissue-log-saw-blades) operating in wet environments (drum moisture content 8–2%) are subject to adhesive wear from cellulose fibre accumulation at the cutting edge, and corrosive attack from free chlorine in process water. This study benchmarks PVD-deposited TiN and hard chrome coatings against uncoated D2 baseline across friction, adhesion, and service-life metrics.",
      },
      {
        type: "callout",
        value:
          "TEST PARAMETERS: Substrate D2 tool steel, 62 HRC. Log diameter 280 mm. Speed 2,800 RPM. Coolant: 0.5% synthetic emulsion. Test duration: 500 operating hours per sample group (n=3 per coating type).",
      },
      { type: "h2", value: "Results: TiN Coating" },
      {
        type: "paragraph",
        value:
          "TiN-coated blades demonstrated a 31% reduction in friction coefficient (μ = 0.22 vs. 0.32 baseline) at test initiation. Coating adhesion remained intact for the full 500-hour test cycle with no delamination detected by SEM cross-section analysis at 250h and 500h intervals. Edge recession rate: 0.008 mm/100h vs. 0.019 mm/100h uncoated.",
      },
      { type: "h2", value: "Results: Hard Chrome Coating" },
      {
        type: "paragraph",
        value:
          "Hard chrome showed comparable friction reduction (μ = 0.24) at test start, but exhibited micro-cracking at the coating-substrate interface from 180 hours onward due to hydrogen embrittlement under cyclic loading. Edge recession rate climbed to 0.015 mm/100h post-200h, approaching the uncoated baseline.",
      },
      {
        type: "callout",
        value:
          "RECOMMENDATION: TiN PVD coating is the preferred specification for [tissue log saw blades](/products/tissue-log-saw-blades) in high-humidity, chlorinated-water environments. Hard chrome is not recommended for cyclic-impact cutting applications regardless of substrate hardness.",
      },
      { type: "h2", value: "Application Guidelines" },
      {
        type: "paragraph",
        value:
          "TiN coating adds approximately 3–5 μm to nominal blade dimensions. Specifying engineers should account for this in mounting clearance calculations. Re-coating after sharpening is available as a service and restores full friction and corrosion performance with no dimensional penalty beyond standard re-grind stock removal.",
      },
    ],
  },
  {
    id: "iso-9001-recertification-2024",
    tag: "COMPANY NEWS",
    date: "14.JUN.2024",
    title: "ISO 9001:2015 re-certification completed",
    excerpt:
      "Zero non-conformances reported during the latest external audit of our Ma'anshan manufacturing facility.",
    image: "/images/about/factory-image-01.webp",
    readTime: "2 MIN",
    relatedProductIds: [
      "granulator-blades",
      "metal-shear-knives",
      "twin-shaft-blades-recycling",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "The triennial ISO 9001:2015 surveillance audit was conducted by SGS Group auditors on 10–1 June 2024, covering the full scope of the Ma'anshan Quality Management System: design and development, production of [industrial blades and cutting knives](/products), inspection and testing, internal audit, management review, and corrective action processes.",
      },
      {
        type: "callout",
        value:
          "AUDIT RESULT: Zero major non-conformances. Zero minor non-conformances. Three opportunities for improvement noted (non-binding). Certificate validity extended to June 2027.",
      },
      {
        type: "paragraph",
        value:
          "Three opportunities for improvement identified in the audit report relate to digital traceability record retention, inter-departmental APQP communication cadence, and calibration interval review scheduling. All three are under evaluation by the Quality Management team for implementation priority.",
      },
    ],
  },
  {
    id: "log-saw-blade-bevel-angles",
    tag: "TECHNICAL GUIDE",
    date: "02.MAY.2024",
    title: "Optimizing bevel angles for log saw blades",
    excerpt:
      "Engineering guidelines for balancing edge sharpness and core toughness to prevent blade deflection during high-speed cutting.",
    image: "/images/products/blades/tissue-log-saw-blades-02.webp",
    readTime: "4 MIN",
    relatedProductIds: [
      "tissue-log-saw-blades",
      "paper-cutting-blades",
      "three-knife-trimmer-blades",
    ],
    content: [
      { type: "h2", value: "The Geometry-Performance Trade-off" },
      {
        type: "paragraph",
        value:
          "[Log saw blade](/products/tissue-log-saw-blades) geometry is governed by three competing demands: edge sharpness (low included angle), deflection resistance (blade section thickness and crown profile), and tooth durability (sufficient included angle to resist chipping under cyclic impact from log cores and wrappers). Industry standard bevel angles range from 28° to 42° depending on log diameter, rotation speed, and cellulose density.",
      },
      {
        type: "callout",
        value:
          "GUIDELINE: For tissue logs ≥80 mm diameter at speeds above 2,500 RPM, a 32° included angle with 0.15 mm secondary bevel is the recommended starting specification. Increase to 36° for logs containing recycled fibre content >30%.",
      },
      { type: "h2", value: "Crown Profile and Deflection" },
      {
        type: "paragraph",
        value:
          "Blade deflection mid-cut introduces skew error in slice dimension tolerance and generates lateral loading that accelerates bearing wear in the saw spindle. The crown profile (radial relief from centre to tooth) must be within ±0.03 mm of nominal across the full blade diameter. Crown verification is performed on our Vollmer VGrind optical measurement station post-grind.",
      },
    ],
  },
  {
    id: "melt-filter-scraper-blade-daily-maintenance-checklist",
    tag: "TECHNICAL GUIDE",
    date: "21.APR.2026",
    title:
      "Daily maintenance checklist: scraper blades & filter plates for continuous melt filters",
    excerpt:
      "A step-by-step daily, weekly, and monthly maintenance guide for continuous melt filter scraper blades and filter plates — with a printable inspection checklist to extend service life and eliminate unplanned downtime on PCR recycling lines.",
    image: "/images/products/blades/scraper-blades-01.webp",
    readTime: "6 MIN",
    relatedProductIds: ["continuous-melt-filter-scraper-blades"],
    content: [
      {
        type: "paragraph",
        value:
          "Continuous melt filters achieve automatic slag removal by combining a high-precision microporous filter plate with a rotating scraper blade that continuously cleans its surface — eliminating the frequent manual screen changes required by conventional screen changers. However, the [scraper blade and filter plate](/products/continuous-melt-filter-scraper-blades) are wear consumables. Non-standard operation and deferred maintenance accelerate failure, increase replacement costs, and force the unplanned line stops that continuous filtration was designed to prevent.",
      },
      {
        type: "paragraph",
        value:
          "The maintenance programme below is organised into three frequencies — daily, weekly, and monthly — plus a dedicated filter plate deep-cleaning procedure. A printable inspection checklist is attached at the end of the article.",
      },

      {
        type: "h2",
        value: "Daily Inspection (Before and After Each Startup)",
      },
      { type: "h3", value: "1. Listen" },
      {
        type: "paragraph",
        value:
          "During startup and throughout operation, listen for any abnormal friction, squealing, impact, or periodic irregular noise from the filter head. Any sound that was not present in the previous shift is a diagnostic signal and should be investigated before the fault progresses.",
      },
      { type: "h3", value: "2. Observe" },
      {
        type: "paragraph",
        value:
          "Confirm slag discharge is flowing smoothly and continuously — intermittent or absent discharge indicates a blocked discharge port or degraded scraper contact. Check for melt leakage around the filter head seals. Verify that pneumatic or hydraulic supply pressure is stable and within the OEM-specified range; pressure fluctuations directly affect scraper contact force and filtration consistency.",
      },
      { type: "h3", value: "3. Clean" },
      {
        type: "paragraph",
        value:
          "While the machine is at a safe temperature, use a soft cloth to remove residual melt material from around the scraper blade, blade holder, and slag discharge port. Material that is allowed to dry and harden in these areas creates abrasive deposits that accelerate blade edge wear on subsequent startups.",
      },
      { type: "h3", value: "4. Record" },
      {
        type: "paragraph",
        value:
          "Log any observed abnormality — noise, pressure deviation, leakage, incomplete slag discharge — immediately in the maintenance ledger. If a fault cannot be attributed to a known cause, shut down and troubleshoot rather than continuing production. Undiagnosed progressive faults on scraper-type filters typically escalate to filter plate damage, which is significantly more costly to repair than the blade itself.",
      },

      { type: "h2", value: "Weekly Maintenance" },
      { type: "h3", value: "1. Inspect the Blade Edge" },
      {
        type: "paragraph",
        value:
          "Remove the scraper blade from its holder and inspect the cutting edge under adequate lighting. Look for notches, chipped sections, rolled edge, or uneven wear across the blade width. Any notch — even a small one — must be treated as a mandatory replacement trigger. A notched blade does not clean the filter plate evenly: the gap left by the notch allows contaminant cake to bypass the scraping action, progressively building up into a solid deposit that scores the filter plate surface on subsequent rotations.",
      },
      {
        type: "callout",
        value:
          "BLADE EDGE FAILURE: A single notch from a tramp metal impact is the most common cause of premature filter plate scoring on PCR lines. If notching is recurring, upgrade from D2 to H13 for higher impact toughness, or specify toughness-grade carbide for heavily contaminated streams. See the [Scraper Blades product page](/products/continuous-melt-filter-scraper-blades) for the full metallurgical upgrade path and failure analysis diagnostic matrix.",
      },
      { type: "h3", value: "2. Retighten Fasteners" },
      {
        type: "paragraph",
        value:
          "Retighten all screws on the blade holder, actuating cylinder, and base mounting. Vibration from the continuous rotation mechanism causes gradual fastener loosening that is not perceptible during casual inspection. A loose blade holder allows micro-movement of the blade relative to the filter plate surface, creating inconsistent contact pressure that both degrades scraping effectiveness and accelerates non-uniform blade wear.",
      },
      { type: "h3", value: "3. Check the Air and Oil Circuit" },
      {
        type: "paragraph",
        value:
          "Inspect all pneumatic lines for leaks and loose fittings. Drain accumulated water from the air filter bowl — water in the pneumatic circuit causes corrosion of actuator seals and unpredictable variation in scraper contact force. Check the oil mist lubricator reservoir and refill if below the minimum level. Dry-running pneumatic actuators wear seal surfaces rapidly, leading to pressure loss and inconsistent blade contact.",
      },

      { type: "h2", value: "Monthly Maintenance" },
      { type: "h3", value: "1. Disassemble and Thoroughly Clean" },
      {
        type: "paragraph",
        value:
          "Remove the complete scraper assembly from the filter head. Disassemble the blade holder and sealing components. Thoroughly clean all surfaces to remove dry material from dead corners, crevices around the blade seating surface, and the slag discharge channel. Hardened melt residue in these areas prevents correct blade seating during reassembly and creates stress concentration points that initiate blade cracking.",
      },
      { type: "h3", value: "2. Measure Blade Wear" },
      {
        type: "paragraph",
        value:
          "Measure the remaining blade edge height or thickness against the OEM minimum dimension specification. Replace immediately if at or below the wear limit. An undersized blade applies reduced contact force against the filter plate, dramatically degrading scraping efficiency and allowing contaminant cake to accumulate.",
      },
      { type: "h3", value: "3. Calibrate Cylinder Pressure and Spring Preload" },
      {
        type: "paragraph",
        value:
          "Using a calibrated pressure gauge, verify the cylinder actuation pressure and spring preload against the OEM specification. These values directly control the scraper contact force. Insufficient force leaves residual contamination on the plate after each rotation; excessive force accelerates blade wear and risks scoring the plasma-nitrided filter plate surface. After calibration, manually rotate the scraper through a full revolution to confirm uniform full-width contact with no local suspension.",
      },
      { type: "h3", value: "4. Inspect Sealing Components" },
      {
        type: "paragraph",
        value:
          "Inspect all sealing rings and dust rings for aging (hardening, cracking, loss of elasticity), oil leakage, or air leakage. Replace any seal showing visible degradation — operating with a compromised seal allows melt infiltration into the actuator mechanism, leading to rapid bearing and seal failure requiring complete assembly replacement.",
      },

      {
        type: "h2",
        value: "Filter Plate Deep Cleaning: The Five-Step Method",
      },
      {
        type: "paragraph",
        value:
          "When differential pressure rises progressively despite a new blade and correct scraper contact force, the microporous filter plate requires deep cleaning to remove embedded contaminants that scraping cannot reach. The five-step procedure below is suitable for field cleaning without specialist equipment.",
      },
      { type: "h3", value: "Step 1 — Plastic Burn-Off" },
      {
        type: "paragraph",
        value:
          "Remove the filter plate. Apply a thin coat of waste engine oil to the downstream (back) face as a release agent, oil-face down. Place on a grate over a heat source and burn off residual polymer. Work in a well-ventilated area. Do not overheat — sustained temperatures above 600°C can relieve the plasma-nitrided surface hardness.",
      },
      { type: "h3", value: "Step 2 — Flatten and Reshape" },
      {
        type: "paragraph",
        value:
          "While still warm and pliable after burn-off, clamp the plate firmly between two flat surfaces (ceramic tiles or steel plates) to correct any warpage from thermal gradient. Hold under clamping pressure until cooled to ambient temperature.",
      },
      { type: "h3", value: "Step 3 — High-Pressure Water Rinse" },
      {
        type: "paragraph",
        value:
          "Flush both faces with a high-pressure water gun, directing the jet perpendicular to the perforation array to drive out embedded particles — metal wire, sand, calcium carbonate, glass fibre — from the conical bore channels. Inspect against a backlight source after rinsing: blocked holes appear as dark spots.",
      },
      { type: "h3", value: "Step 4 — Compressed Air Blow-Dry" },
      {
        type: "paragraph",
        value:
          "Blow the plate dry from both faces with clean, dry compressed air, paying particular attention to moisture retention within the micro-perforations. Residual water accelerates corrosion within the bore channels during storage.",
      },
      { type: "h3", value: "Step 5 — Rust Prevention and Storage" },
      {
        type: "paragraph",
        value:
          "Apply a thin coat of light white oil or hydraulic oil to all surfaces. Wrap in oil paper or seal in a plastic bag and store flat in a clean, dry location. A properly cleaned and preserved plate can be stored indefinitely and returned to service as a verified clean spare.",
      },

      {
        type: "h2",
        value: "Maintenance Checklist (Printable / Screenshot)",
      },
      {
        type: "callout",
        value:
          "CONTINUOUS MELT FILTER — SCRAPER BLADE & FILTER PLATE INSPECTION CHECKLIST\n\n— Blade Edge — No notch, burr, chipped section, or uneven wear across full width\n— Blade Holder Fixing — All screws tight, no deformation or looseness\n— Air / Oil Circuit — No leaks, supply pressure stable, oil mist lubricator filled\n— Scraper Fit — Full-width contact with filter plate, no local suspension\n— Operation — No abnormal noise, vibration, or resistance during rotation\n— Slag Discharge — Continuous, unobstructed flow from discharge port\n— Cleanliness — No hardened or dry material in blade holder or discharge port\n— Seal Components — No aging, cracking, oil leakage, or air leakage\n\nRecord inspection date, operator name, and any corrective actions. Retain for a minimum of 12 months.",
      },
      {
        type: "paragraph",
        value:
          "It is recommended to complete and sign off the checklist after each maintenance event, building a traceable ledger that allows early detection of developing trends — increasing wear rate, recurring leaks, progressive pressure rise — before they escalate to unplanned downtime.",
      },
      {
        type: "paragraph",
        value:
          "Have technical difficulties with your continuous melt filter? Sureay supplies precision aftermarket [scraper blades and conical laser-drilled filter plates](/products/continuous-melt-filter-scraper-blades) in D2, H13, and solid carbide grades, with a hardness certificate and CMM dimensional report in every shipment. Contact the Sureay engineering team at lynn@sureay.com or +86 180 0555 0657.",
      },
    ],
  },
  {
    id: "alloy-vs-hss-paper-cutter-blades",
    tag: "TECHNICAL GUIDE",
    date: "23.APR.2026",
    title:
      "Alloy blade vs high-speed steel: lifespan & cost guide for high-speed paper cutters",
    excerpt:
      "Tungsten carbide alloy blades last 5–0× longer than high-speed steel on paper cutters — but is the higher upfront cost justified? A practical comparison of hardness, service life, and total cost of ownership to help you choose the right blade for your operation.",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-04.webp",
    readTime: "5 MIN",
    relatedProductIds: ["paper-cutting-blades"],
    content: [
      {
        type: "paragraph",
        value:
          "For high-speed paper cutters, blade material directly affects production efficiency and operating costs. How to choose between an alloy blade (tungsten carbide) and a high-speed steel (HSS) blade is a decision that every procurement manager and equipment engineer needs to face. As a manufacturer with decades of experience producing precision mechanical blades, Sureay provides this comprehensive analysis.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-01.webp",
      },

      { type: "h2", value: "1. Material Characteristics" },
      {
        type: "paragraph",
        value:
          "Alloy blades are made from tungsten carbide as the base material, achieving a hardness of HRC 89–3 with extremely high wear resistance. The trade-off is brittleness — tungsten carbide is sensitive to impact loads. High-speed steel blades reach HRC 62–5; wear resistance is lower, but toughness is significantly better and they can absorb impact loads that would chip a carbide edge.",
      },
      {
        type: "callout",
        value:
          "HARDNESS COMPARISON — Alloy (Tungsten Carbide): HRC 89–3, extremely high wear resistance, brittle under impact. HSS: HRC 62–5, good wear resistance, high impact toughness, suitable for shock loads.",
      },

      { type: "h2", value: "2. Service Life Comparison" },
      {
        type: "paragraph",
        value:
          "In high-speed paper cutting applications, the lifespan of alloy blades is 5–0 times that of high-speed steel blades.",
      },
      {
        type: "paragraph",
        value:
          "High-speed steel blade: Under normal operating conditions, cutting mileage is approximately 10,000–0,000 metres. In the packaging industry, published service life benchmarks reach approximately 200,000 metres. HSS remains the most widely used solution in most packaging factories due to its lower initial cost and ease of regrinding.",
      },
      {
        type: "paragraph",
        value:
          "Alloy (carbide) blade: Cutting mileage can reach 50,000–00,000 metres. The service life of premium-grade alloy blades reaches 4+ million metres in optimised conditions. Strong wear resistance and sustained edge retention significantly reduce blade-change stoppages and improve overall equipment effectiveness.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-02.webp",
      },

      { type: "h2", value: "3. Cost Comparison" },
      {
        type: "paragraph",
        value:
          "The unit price of alloy blades is approximately 10 times that of high-speed steel blades — the primary reason many buyers hesitate. However, total cost of ownership tells a different story.",
      },
      {
        type: "callout",
        value:
          "TOTAL COST BREAKDOWN — Single purchase cost: Alloy blade HIGH (~10× HSS) | HSS blade LOW. Replacement & regrind frequency: Alloy LOW | HSS HIGH. Downtime loss: Alloy LOW | HSS HIGH. Long-term comprehensive cost: Alloy LOWER | HSS HIGHER.",
      },
      {
        type: "paragraph",
        value:
          "For high-speed paper cutters running continuous production with full order books, the value generated by the downtime saved by alloy blades can easily cover the initial price difference. In the long run, alloy blades are often the more economical choice.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-03.webp",
      },

      { type: "h2", value: "4. How to Choose the Right Blade" },
      {
        type: "paragraph",
        value:
          "24-hour continuous production — Alloy blade. Long service life, minimal blade changes, low downtime losses, and the lowest overall cost per metre cut.",
      },
      {
        type: "paragraph",
        value:
          "Small batch sizes or multiple substrate varieties — High-speed steel blade. Low initial investment, simpler regrinding workflow, and high operational flexibility.",
      },
      {
        type: "paragraph",
        value:
          "Cutting high-ash-content paper, art paper, or corrugated board — Alloy blade. Abrasive substrates accelerate HSS edge passivation quickly; carbide wear resistance is essential to maintain cut quality.",
      },
      {
        type: "paragraph",
        value:
          "Older equipment with insufficient precision — High-speed steel blade. Carbide is brittle; edge chipping is likely if machine alignment or clamping precision is below standard. HSS toughness provides greater tolerance for equipment variability.",
      },
      {
        type: "callout",
        value:
          "SELECTION PRINCIPLE: If your paper cutter is high-precision and running at full capacity, alloy blades are the wiser long-term investment. For older equipment or variable operating conditions, high-speed steel offers greater safety margin and lower risk.",
      },

      { type: "h2", value: "5. Summary" },
      {
        type: "paragraph",
        value:
          "Alloy blade: High hardness, extreme wear resistance, long service life — suited to continuous production and demanding substrates. Initial investment is high, but long-term comprehensive cost is lower.",
      },
      {
        type: "paragraph",
        value:
          "High-speed steel blade: Affordable, good toughness, can be repeatedly reground — suited to small batches or equipment with average precision. Replacement frequency is higher, and long-term comprehensive cost exceeds that of carbide over the same cutting volume.",
      },
      {
        type: "paragraph",
        value:
          "The right selection depends on your equipment condition, production scale, and substrate. For professional material selection advice or a custom blade solution for your paper cutter, contact the [Sureay engineering team](/contact) — we supply both [paper cutting blades](/products/paper-cutting-blades) in HSS and carbide grades, with CMM dimensional reports in every shipment.",
      },
    ],
  },
  {
    id: "blade-manufacturing-process",
    tag: "TECHNICAL GUIDE",
    date: "29.APR.2026",
    title:
      "From steel to finished products: understanding the entire manufacturing process of mechanical blades",
    excerpt:
      "A high-quality mechanical blade requires multiple precision processes from raw steel to finished product. Sureay breaks down the entire standard manufacturing process step by step — helping you understand exactly how our quality is built, and how to evaluate the true capability of any blade supplier.",
    image: "/images/news/laser-cutting.webp",
    readTime: "6 MIN",
    seoTitle:
      "Industrial Blade Manufacturing Process Guide",
    metaDescription:
      "Learn the complete manufacturing process of industrial mechanical blades — raw material inspection, heat treatment, precision grinding, and quality control — explained by Sureay blade engineers.",
    keywords:
      "blade manufacturing process, industrial blade production, heat treatment blades, precision grinding, HSS blade, Cr12MoV, blade quality control",
    relatedProductIds: [
      "rotary-slitter-knives",
      "paper-cutting-blades",
      "granulator-blades",
      "metal-shear-knives",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Behind every precision blade is a tightly controlled manufacturing chain. From the moment raw steel arrives at our facility to the moment a finished blade ships in VCI packaging, each step is governed by documented tolerances and inspection protocols. This article walks through the full process so you can see exactly where quality is built — and what to look for when evaluating suppliers.",
      },
      { type: "h2", value: "1. Raw material inspection" },
      {
        type: "paragraph",
        value:
          "Every production run begins with incoming material verification. Steel is checked for chemical composition, hardness, and surface condition before it enters the production line. Common materials include high-speed steel (HSS grades M2, M42), alloy tool steels (Cr12MoV, D2, DC53), and tungsten carbide composites. Skipping this step is the most common cause of inconsistent blade performance across a batch.",
      },
      { type: "h2", value: "2. Cutting and rough machining" },
      {
        type: "paragraph",
        value:
          "Steel coils or plates are cut to blank shape by stamping, laser cutting, or cold sawing depending on profile complexity and material thickness. Tight dimensional control at this stage is critical — micro-cracks or edge burrs introduced here can propagate through heat treatment and compromise the finished blade. For complex profiles, preliminary shaping is completed before the blank enters the heat treatment furnace.",
      },
      { type: "image", value: "/images/news/slitting-knives-set.webp" },
      { type: "h2", value: "3. Heat treatment (core process)" },
      {
        type: "paragraph",
        value:
          "Heat treatment defines the functional hardness and toughness of the blade. The process involves controlled austenitizing, quenching, and one or more tempering cycles to achieve the target hardness range — typically HRC 58–5 for HSS and tool steels, and HRC 89+ for tungsten carbide grades. Temperature uniformity across the load must be held to ±5 °C; deviation causes hardness gradients and warpage that cannot be corrected downstream.",
      },
      {
        type: "callout",
        value:
          "Quenching achieves maximum hardness through rapid cooling. Tempering follows immediately to relieve internal stress and restore toughness — preventing brittle fracture in service. Both steps are equally critical; quench without temper produces a hard but fragile blade.",
      },
      { type: "h2", value: "4. Precision grinding" },
      {
        type: "paragraph",
        value:
          "After heat treatment, the blade is ground to final geometry on surface grinders, cylindrical grinders, or CNC profile grinding centres. Flatness, parallelism, and thickness are controlled at the micron level. The quality of the ground surface directly determines cutting edge sharpness and service life — a blade with grinding chatter marks or heat checks will fail well before its theoretical wear limit.",
      },
      { type: "h2", value: "5. Precision machining and sharpening" },
      {
        type: "paragraph",
        value:
          "The cutting edge is ground to the specified bevel geometry — single-bevel, double-bevel, hollow-ground, or radius profile — depending on the application. Edge angle and symmetry control cutting resistance and edge retention. As a reference, guillotine blades for paper cutting typically use a bevel angle of 19°—3°. Final deburring and chamfering are carried out at this stage before inspection.",
      },
      { type: "image", value: "/images/news/slitting-blades-series.webp" },
      { type: "h2", value: "6. Testing and quality control" },
      {
        type: "paragraph",
        value:
          "Every blade is inspected for hardness, dimensional accuracy, and edge integrity. High-speed rotary blades — such as large circular slitter knives and log saw blades — additionally undergo dynamic balance testing to prevent vibration at operating speed. Non-conforming parts are quarantined and scrapped. Critical production batches ship with a full inspection report covering material certificate, hardness readings, and CMM dimensional data.",
      },
      { type: "h2", value: "7. Surface treatment and rust prevention" },
      {
        type: "paragraph",
        value:
          "Finished blades are cleaned, degreased, and treated against corrosion. Treatment options include rust-preventive oil, phosphating, PVD coating (TiN, TiAlN), or chrome plating depending on the application environment. For export shipments, we use vapour-phase corrosion inhibitor (VCI) packaging as standard — particularly important for ocean freight where humidity and salt air present a real corrosion risk.",
      },
      { type: "h2", value: "8. Packaging and shipping" },
      {
        type: "paragraph",
        value:
          "Blades are individually wrapped or set-packed, labelled with material grade, dimensions, hardness, and batch number for full traceability. Export cartons are reinforced to prevent collision damage in transit, and storage requirements are marked on the outer packaging. Each shipment includes a packing list and, where required, a material test certificate and inspection report.",
      },
      { type: "h2", value: "Conclusion: why the process matters" },
      {
        type: "paragraph",
        value:
          "A rigorous manufacturing process delivers three things: consistency across mass production batches, extended service life through optimised heat treatment and grinding (wear resistance improvements of 30–00% over uncontrolled processes are common), and full traceability from steel coil to finished product so any issue can be isolated and resolved quickly.",
      },
      {
        type: "callout",
        value:
          "Process flow: Steel — Cutting — Heat treatment — Rough grinding — Finish grinding — Edge sharpening — Inspection — Rust prevention — Packaging — Shipment",
      },
      { type: "h2", value: "Why choose Sureay?" },
      {
        type: "paragraph",
        value:
          "Sureay controls the full manufacturing chain in-house — from heat treatment furnaces to CNC profile grinding — without outsourcing critical processes. Our testing equipment includes hardness testers, optical projectors, and coordinate measuring machines, with material traceability maintained for every batch. With over 20 years focused exclusively on industrial blades, we serve the paper, recycling, metal processing, and food industries worldwide. If you have specific blade requirements or technical questions, contact us for full drawing-to-delivery technical cooperation.",
      },
    ],
  },

  {
    id: "coil-slitting-line-maintenance-guide",
    tag: "TECHNICAL GUIDE",
    date: "07.MAY.2026",
    title: "The complete guide to coil slitting line maintenance",
    excerpt:
      "Most coil slitting line breakdowns are preventable. This guide covers daily operator checks, slitter knife and shear blade care, alignment, lubrication, and building a preventive maintenance schedule to maximize uptime.",
    image: "/images/news/coil-slitting-line.webp",
    readTime: "7 MIN",
    seoTitle:
      "Complete Guide to Coil Slitting Line Maintenance",
    metaDescription:
      "Learn how to prevent coil slitting line downtime with daily operator checks, slitter knife maintenance, guillotine shear blade care, and a structured preventive maintenance schedule.",
    keywords:
      "coil slitting line maintenance, slitter knife maintenance, guillotine shear blade care, circular slitter knives, preventive maintenance, industrial blade maintenance",
    relatedProductIds: ["metal-coil-slitting-knives", "metal-shear-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "Unplanned downtime on a coil slitting line doesn't just halt production — it bleeds money. The good news? Most breakdowns are preventable with consistent maintenance.",
      },

      { type: "h2", value: "Know Your Line" },
      {
        type: "paragraph",
        value:
          "A typical slitting line includes the uncoiler, slitter head, tensioning system, recoiler, and guiding equipment. Weakness in any one component stresses the others, so maintenance must cover the full system.",
      },
      {
        type: "image",
        value: "/images/news/coil-slitting-line.webp",
      },

      { type: "h2", value: "Daily Operator Checks" },
      {
        type: "paragraph",
        value:
          "A five-minute walkthrough each shift catches small problems early. Inspect blade edges for chips or buildup, verify lubrication levels, clear metal debris from the slitter head area, and confirm the coil is tracking straight. Listen for unusual sounds — grinding or vibration often signals bearing wear or misalignment before visible damage appears.",
      },

      { type: "h2", value: "Slitter Knife Maintenance" },
      {
        type: "paragraph",
        value:
          "Your [circular slitter knives](/products/metal-coil-slitting-knives) are the most critical factor in cut quality. Resharpen when you see uniform edge wear, but replace blades with localized chipping or deep nicks. Watch for edge rounding (increasing burr on strips), material buildup on blade faces, and uneven wear patterns. Store blades vertically in slotted racks with rust-preventive oil — never stack them without separators.",
      },
      {
        type: "image",
        value: "/images/products/rotary-slitter-knives/metal-slitter-knives-02.webp",
      },

      { type: "h2", value: "Shear Blade Care" },
      {
        type: "paragraph",
        value:
          "[Guillotine shear blades](/products/metal-shear-knives) are often overlooked but equally important. Keep clearance properly set (typically 5–0% of material thickness) and adjust when switching gauges. Most blades have four usable edges — rotate to the next edge before sending for resharpening to maximize blade life.",
      },
      {
        type: "image",
        value: "/images/news/guillotine-shear-blades.webp",
      },

      { type: "h2", value: "Tension, Alignment, and Lubrication" },
      {
        type: "paragraph",
        value:
          "Misalignment causes uneven cuts, width tolerance failures, and accelerated blade wear. Check entry and exit guides, inspect rubber spacers on the arbor, and verify tension roller surfaces monthly. For lubrication, follow manufacturer intervals — grease bearings weekly on high-production lines and monitor coolant concentration regularly. Avoid over-lubricating, which can cause overheating or contaminate strip surfaces.",
      },

      { type: "h2", value: "Build a Preventive Schedule" },
      {
        type: "paragraph",
        value:
          "Don't run equipment until it breaks. Log every blade set's install date, tonnage processed, and resharpening cycles. This data helps you predict replacements before failure. Schedule weekly greasing, monthly alignment checks, and quarterly blade assessments.",
      },

      { type: "h2", value: "Better Tooling, Less Maintenance" },
      {
        type: "paragraph",
        value:
          "Precision-engineered tooling holds its edge longer and reduces stress across your entire line. At Sureay Machinery, our [circular slitter knives](/products/metal-coil-slitting-knives) and [guillotine shear blades](/products/metal-shear-knives) are built for zero-burr performance and extended service life — so you spend less time maintaining and more time producing.",
      },
      {
        type: "callout",
        value:
          "[Contact us](/contact) to find the right tooling for your line.",
      },
    ],
  },

  {
    id: "metal-slitting-lines-installation-guide",
    tag: "TECHNICAL GUIDE",
    date: "18.MAY.2026",
    title:
      "Metal Slitting Lines: How To Install Them To Make Rotary Shear Blades 30% Longer",
    excerpt:
      "Blade wear on metal slitting lines is rarely a material problem — it is an installation problem. Sureay shares three precise installation tips that can extend rotary shear blade life by 30% or more.",
    image: "/images/news/metal-slitting-lines-01.webp",
    readTime: "5 MIN",
    seoTitle:
      "Metal Slitting Lines: 3 Installation Tips for 30% Longer Rotary Shear Blade Life | Sureay",
    metaDescription:
      "Learn how to set axial clearance, verify cutter shaft parallelism, and apply the correct bolt torque on metal slitting lines — three installation steps that extend rotary shear blade life by 30%.",
    keywords:
      "metal slitting lines, rotary shear blades, slitting blade installation, axial clearance slitting, cutter shaft parallelism, blade life extension, coil slitting installation",
    relatedProductIds: ["metal-coil-slitting-knives", "metal-shear-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "On metal slitting lines, blade life comes down to two things: the material the blade is made from, and how precisely it is installed. Most customers who report rapid wear or frequent breakage are dealing with an installation problem — not a blade quality problem.",
      },
      {
        type: "paragraph",
        value:
          "SUREAY is sharing three installation tips that apply to any metal slitting line. Follow all three and you can realistically extend the service life of your [rotary shear blades](/products/metal-coil-slitting-knives) by 30% or more.",
      },
      { type: "image", value: "/images/news/metal-slitting-lines-01.webp" },
      { type: "h2", value: "Tip 1: Set the Correct Axial Clearance" },
      {
        type: "paragraph",
        value:
          "Axial clearance — the gap between the two mating rotary shear blades — is the single most influential installation parameter. Set it wrong and the blades will fail regardless of steel grade or surface treatment.",
      },
      {
        type: "paragraph",
        value:
          "The most common mistakes are adjusting clearance by feel or using a single fixed value across all material thicknesses. The correct approach is to calculate clearance as a percentage of sheet thickness — typically 8–12% — and verify it with a feeler gauge or dial indicator at multiple points along the cutter shaft.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material Thickness", "Recommended Clearance"],
        tableRows: [
          ["≤ 1.5 mm (thin plate)", "0.03 – 0.08 mm"],
          ["1.5 – 4 mm (medium plate)", "0.08 – 0.15 mm"],
          ["> 4 mm (thick plate)", "0.15 – 0.25 mm"],
        ],
      },
      {
        type: "paragraph",
        value:
          "If clearance is too small, frictional heat builds at the blade face and the cutting edge chips. If clearance is too large, the slit edge becomes rough, burr height increases, and the blade dulls rapidly under the bending load.",
      },
      { type: "image", value: "/images/news/metal-slitting-lines-02.webp" },
      { type: "h2", value: "Tip 2: Verify Cutter Shaft Parallelism" },
      {
        type: "paragraph",
        value:
          "If the upper and lower cutter shafts are not parallel, the effective clearance varies across the cut width. One side of the blade set is underloaded while the other is overloaded — causing uneven wear, accelerated edge damage, and inconsistent slit width.",
      },
      {
        type: "paragraph",
        value:
          "Before installing the blades, measure the cutter shafts directly. Check runout at both ends of each shaft — error must be within 0.02 mm. Then verify shaft-to-shaft parallelism across the full working length using a dial indicator and straight edge — error must be within 0.05 mm total.",
      },
      {
        type: "paragraph",
        value:
          "Bearing wear and frame deformation accumulate over time and shift shaft geometry. Repeat this check every six months as part of a scheduled preventive maintenance cycle.",
      },
      { type: "image", value: "/images/news/metal-slitting-lines-03.webp" },
      { type: "h2", value: "Tip 3: Apply the Correct Bolt Torque" },
      {
        type: "paragraph",
        value:
          "Under-tightened blades micro-shift during rotation. Even a few microns of movement per cycle generates fretting wear at the mounting face and introduces runout that transfers to the cutting edge. Many failures attributed to blade brittleness are in fact caused by mounting instability.",
      },
      {
        type: "paragraph",
        value:
          "Use a calibrated torque wrench and apply the specified torque in two or three progressive steps. Ensure blade and shaft mating surfaces are clean — free of oil, burrs, and debris — before assembly. Use non-woven fabric and alcohol for the final wipe.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Bolt Size", "Required Torque"],
        tableRows: [
          ["M12", "70 – 90 N·m"],
          ["M16", "150 – 180 N·m"],
          ["M20", "250 – 300 N·m"],
        ],
      },
      { type: "h2", value: "Installation Checklist" },
      {
        type: "table",
        value: "",
        tableHeaders: ["Check Item", "Specification", "Method"],
        tableRows: [
          ["Axial clearance", "8–12% of material thickness", "Feeler gauge or dial indicator"],
          ["Cutter shaft runout", "< 0.02 mm", "Dial indicator"],
          ["Cutter shaft parallelism", "< 0.05 mm (full length)", "Dial indicator + straight edge"],
          ["Bolt torque (M12 / M16 / M20)", "70–90 / 150–180 / 250–300 N·m", "Torque wrench"],
          ["Blade & shaft surface", "No oil stains, no burrs", "Non-woven fabric + alcohol"],
        ],
      },
      {
        type: "callout",
        value:
          "Correct installation outperforms expensive blades every time. If your blades are wearing out quickly, start here — not with the blade specification sheet.",
      },
      { type: "h2", value: "Need Help With Your Slitting Line?" },
      {
        type: "paragraph",
        value:
          "If you are having problems with your metal slitting line, send us your drawings or photos and our engineers will give you a free technical assessment. SUREAY specialises in precision [rotary shear blades and metal coil slitting knives](/products/metal-coil-slitting-knives) for all major slitting line brands.",
      },
      {
        type: "paragraph",
        value:
          "Visit [www.sureay.com](https://www.sureay.com) · Email [lynn@sureay.com](mailto:lynn@sureay.com) · Call +86 180 0555 0657 · Connect on [LinkedIn](https://www.linkedin.com/in/lynn-shang-sureay) or [Facebook](https://www.facebook.com/share/1AF2JJxmzQ/)",
      },
    ],
  },

  {
    id: "shredder-blade-arrangement-energy-consumption",
    tag: "TECHNICAL GUIDE",
    date: "29.MAY.2026",
    title: "How Shredder Blade Arrangement Affects Energy Consumption",
    excerpt:
      "Shredder blade arrangement affects torque stability, material bite, blockage risk, and power consumption per ton. This guide explains how blade spacing, staggered layouts, and helical arrangements influence energy use and blade life in recycling lines.",
    image: "/images/news/shredder-blade-arrangement-hero.webp",
    readTime: "7 MIN",
    seoTitle:
      "How Shredder Blade Arrangement Affects Energy Consumption | Sureay",
    metaDescription:
      "Learn how shredder blade arrangement, spacing, and helical tooth layout affect energy consumption, torque stability, blockage risk, and blade life.",
    keywords:
      "shredder blade arrangement, shredder energy consumption, shredder blade spacing, shredder blade configuration, twin shaft shredder blades, recycling shredder blades",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "twin-shaft-blades-battery",
      "granulator-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "In recycling and waste processing, shredders are often among the highest electricity consumers on the line. Operators usually look first at motor power, hydraulic pressure, or screen size, but the [twin shaft shredder blade](/products/twin-shaft-blades-recycling) arrangement has a direct influence on how smoothly the machine bites, shears, and discharges material.",
      },
      {
        type: "paragraph",
        value:
          "Blade spacing, hook timing, spacer width, and shaft overlap determine whether cutting load is distributed in a stable sequence or concentrated into repeated impact peaks. A well-arranged stack helps lower kWh per ton, reduce reverse cycles, and improve wear balance across the full cutter set.",
      },
      {
        type: "image",
        value: "/images/news/shredder-blade-arrangement-hero.webp",
      },
      {
        type: "h2",
        value: "Why Blade Arrangement Changes Power Consumption",
      },
      {
        type: "paragraph",
        value:
          "A shredder does not consume energy only when it cuts. It also consumes energy when the rotor pulls material into the chamber, compresses oversized feed, clears partially cut pieces, and overcomes friction between blades, spacers, shafts, and the material itself. Arrangement influences all of these energy paths.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: [
          "Arrangement Factor",
          "What It Changes",
          "Energy Effect",
        ],
        tableRows: [
          [
            "Blade spacing",
            "Material bite and discharge path",
            "Too wide causes impact peaks; too tight increases friction",
          ],
          [
            "Tooth timing",
            "Whether teeth hit together or in sequence",
            "Sequenced engagement smooths torque demand",
          ],
          [
            "Spacer width",
            "Compression and material release",
            "Incorrect width raises blockage risk and wasted load",
          ],
          [
            "Overlap / clearance",
            "Shearing efficiency and side contact",
            "Poor settings convert motor load into heat instead of cutting",
          ],
        ],
      },
      {
        type: "paragraph",
        value:
          "When these factors are controlled, the motor runs in a steadier load band. When they are not, the machine shows current spikes, unstable throughput, frequent reversals, and localized blade damage.",
      },
      {
        type: "paragraph",
        value:
          "For operators evaluating [shredder blades and cutter inserts](/categories/shredder-blades), arrangement should be reviewed as a system question rather than a single-disc question. Blade thickness, hook profile, spacer stack, shaft timing, and heat treatment all work together.",
      },
      {
        type: "image",
        value: "/images/news/shredder-blades-550x180x50.webp",
      },
      {
        type: "h2",
        value: "Common Arrangement Types and Their Energy Behavior",
      },
      {
        type: "table",
        value: "",
        tableHeaders: [
          "Arrangement Type",
          "Cutting Behavior",
          "Energy Impact",
          "Best Fit",
        ],
        tableRows: [
          [
            "Wide spacing / large clearance",
            "Strong bite but intermittent cutting",
            "Higher torque peaks and repeated impact risk",
            "Bulky material that needs aggressive grabbing",
          ],
          [
            "Dense straight stack",
            "More continuous contact",
            "Stable when feed is smooth, but friction rises if too tight",
            "Thin plastic, film bundles, light waste",
          ],
          [
            "Staggered arrangement",
            "Adjacent teeth cut in sequence",
            "Lower load fluctuation and smoother motor demand",
            "General plastic recycling and mixed waste",
          ],
          [
            "Helical arrangement",
            "Teeth engage in a spiral progression",
            "Smoothest transition and lower vibration in suitable lines",
            "Continuous recycling lines targeting steady throughput",
          ],
        ],
      },
      {
        type: "paragraph",
        value:
          "The correct layout depends on material shape, toughness, bulk density, feed method, and target output size. The densest stack is not automatically the best choice if it creates unnecessary side friction or wrapping.",
      },
      {
        type: "image",
        value: "/images/news/shredder-blade-arrangement-patterns.webp",
      },
      {
        type: "h2",
        value: "How Blade Gap Influences Torque, Blockage, and Friction",
      },
      {
        type: "h3",
        value: "Excessive Gap",
      },
      {
        type: "paragraph",
        value:
          "When blade gap is too large, the stack may fail to grab material cleanly. Instead of controlled shearing, the machine repeatedly bends, impacts, and drags the feedstock. The result is unstable torque demand, poor bite, and more overload or reverse events.",
      },
      {
        type: "paragraph",
        value:
          "This condition is common when an open blade stack is used for film, hollow containers, low-density waste, or other feed that needs guided engagement rather than blunt impact.",
      },
      {
        type: "h3",
        value: "Insufficient Gap",
      },
      {
        type: "paragraph",
        value:
          "When the gap is too small, the material becomes over-compressed between adjacent discs. In that case, a larger share of the motor load is spent on rubbing and heat generation rather than useful cutting work. Operators often see higher chamber temperature, sticky residue, side wear, and elevated current even at partial load.",
      },
      {
        type: "callout",
        value:
          "Engineering Note: Both excessive and insufficient gap can increase energy consumption. The difference is where the energy is lost: impact and repeated reversal on one side, or friction and heat on the other.",
      },
      {
        type: "h2",
        value: "Staggered vs Helical Arrangement",
      },
      {
        type: "paragraph",
        value:
          "In a staggered arrangement, adjacent teeth are offset so multiple hooks do not strike the material at the same instant. This usually reduces sudden torque peaks and helps the motor stay closer to an efficient operating band.",
      },
      {
        type: "paragraph",
        value:
          "In a helical arrangement, tooth positions progress along the shaft in a spiral sequence. For suitable feedstocks, this produces smoother chamber loading, lower vibration, and more consistent discharge. However, helical layouts still need sufficient bite force, shaft strength, and blade toughness for thick or contaminated material streams.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: [
          "Blade Arrangement",
          "Relative Energy Use",
          "Torque Stability",
          "Wear Pattern",
        ],
        tableRows: [
          ["Wide spacing / large clearance", "High", "Unstable", "Local impact wear"],
          ["Dense straight stack", "Medium", "Moderate", "Possible side wear"],
          ["Staggered arrangement", "Lower", "Stable", "More even wear"],
          ["Helical arrangement", "Lower in suitable conditions", "Very stable", "Predictable wear distribution"],
        ],
      },
      {
        type: "paragraph",
        value:
          "Field comparisons often show lower kWh per ton when tooth engagement is sequenced more smoothly, but the exact gain depends on feedstock, shaft speed, feed consistency, blade geometry, and how the measurement is taken. The practical lesson is straightforward: smoother engagement usually means less wasted energy.",
      },
      {
        type: "h2",
        value: "How to Diagnose an Existing Blade Stack",
      },
      {
        type: "paragraph",
        value:
          "Before replacing the whole machine, inspect the blade shaft as a system. Many energy problems can be diagnosed from spacer arrangement, tooth timing, and the location of wear or chipping. This is especially important on recycling lines processing variable feedstocks such as rigid plastics, film, light metal scrap, or battery modules.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Check Item", "What It Reveals"],
        tableRows: [
          ["Blade spacing", "Whether the material is being bitten cleanly or over-compressed"],
          ["Tooth timing", "Whether the cutting load arrives as impact peaks or smooth sequence"],
          ["Edge wear pattern", "Whether the load is distributed evenly across the stack"],
          ["Side wear", "Whether friction is consuming unnecessary energy"],
          ["Current curve and reverse cycles", "Whether blockage or torque spikes are being triggered by the shaft layout"],
          ["Output size variation", "Whether cutting remains consistent across the chamber width"],
        ],
      },
      {
        type: "paragraph",
        value:
          "Useful input data includes material type, feed size, target output size, motor power, shaft speed, blade diameter, blade thickness, spacer width, and photos of worn edges. With that information, a blade manufacturer can judge whether the root cause is spacing, tooth profile, blade material, heat treatment, or general machine condition.",
      },
      {
        type: "image",
        value: "/images/news/shredder-energy-consumption-diagnosis.webp",
      },
      {
        type: "h2",
        value: "Recommended Priorities by Material Type",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material", "Main Challenge", "Arrangement Priority"],
        tableRows: [
          ["Plastic film", "Low density, wrapping, poor bite", "Controlled tooth engagement and anti-wrapping layout"],
          ["PET bottles", "Hollow shape and bouncing feed", "Staggered or helical engagement for stable pulling"],
          ["Rigid plastic", "Higher cutting force", "Balanced spacing with strong hook geometry"],
          ["Light metal scrap", "Impact load and edge chipping", "Controlled clearance with tougher blade material"],
          ["Battery recycling", "Mixed hard layers and safety-sensitive processing", "Application-specific shaft layout and high-toughness tooling"],
        ],
      },
      {
        type: "paragraph",
        value:
          "If your line handles multiple streams, select the arrangement around the most difficult material rather than the easiest one. For example, a stack suitable for thin film may not remain efficient when the same line starts processing housings, runners, or battery pack scrap. In those cases, compare the cutter layout against your [plastic recycling blades](/plastic-industry), [battery recycling blades](/products/twin-shaft-blades-battery), and downstream granulation requirements such as [granulator blades](/products/granulator-blades).",
      },
      {
        type: "h2",
        value: "When a Redesign Is Worth Considering",
      },
      {
        type: "paragraph",
        value:
          "A blade stack redesign is worth reviewing when energy consumption per ton keeps rising, reverse cycles become frequent, output size remains inconsistent, operators have to reduce feed rate to avoid overload, or teeth chip in the same position repeatedly. Replacing blades with the same arrangement may only repeat the same failure mode.",
      },
      {
        type: "paragraph",
        value:
          "Sureay manufactures matched shredder blade and spacer sets for recycling applications, including [twin shaft recycling blades](/products/twin-shaft-blades-recycling) and application-specific tooling for plastic, metal, tire, and battery waste. Reviewing arrangement together with material grade and heat treatment usually produces a better result than changing only one variable.",
      },
      {
        type: "callout",
        value:
          "Need help diagnosing a shredder blade shaft? Send blade dimensions, spacer width, motor power, material type, output target, and photos of the worn stack. Sureay engineers can review whether the current arrangement is increasing energy consumption or shortening blade life.",
      },
    ],
  },
  {
    id: "paper-guillotine-knives-selection-maintenance-guide",
    tag: "TECHNICAL GUIDE",
    date: "03.JUN.2026",
    title:
      "How to Choose Paper Guillotine Knives for Clean, Square Cuts and Longer Blade Life",
    excerpt:
      "Blade metallurgy, bevel geometry, defect root causes, and maintenance scheduling for paper guillotine knives — a procurement guide for print finishing and converting operations.",
    image: "/images/news/paper-guillotine-knives-hero.webp",
    readTime: "9 MIN",
    seoTitle:
      "Paper Guillotine Knives: Selection, Bevel Angle and Maintenance Guide",
    metaDescription:
      "Technical guide to paper guillotine knife selection for print finishing and paper converting. Compare metallurgy, bevel angles, cut defects, and maintenance scheduling.",
    keywords:
      "paper guillotine knives, paper cutter blades, guillotine paper cutting knife, HSS paper cutting blade, carbide tipped paper knife, paper cutting blade maintenance, Polar replacement knife, Wohlenberg cutter blade, Perfecta guillotine blade",
    relatedProductIds: [
      "paper-cutting-blades",
      "rotary-slitter-knives-paper",
      "tissue-log-saw-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Paper guillotine knives dictate the dimensional tolerance and edge quality of print finishing, bookbinding, and paper converting operations. The process requires a long, straight blade to penetrate a clamped substrate stack, demanding absolute squareness, clean separation, and cross-width repeatability.",
      },
      {
        type: "paragraph",
        value:
          "For procurement and production managers, cutting performance extends beyond simple sharpness. It is a multi-variable system governed by blade metallurgy, bevel geometry, heat treatment, grinding precision, machine guide tolerances, clamp pressure, and cutting stick degradation. A premium knife configured with an incorrect bevel or installed on worn equipment will fail. Precise technical specification and scheduled maintenance directly reduce material waste and mitigate cutter drive wear.",
      },
      {
        type: "h2",
        value: "Industrial Applications & Equipment Compatibility",
      },
      {
        type: "paragraph",
        value:
          "Industrial paper guillotine knives are deployed in commercial print finishing and label stock conversion, packaging production and heavy paperboard sectioning, bookbinding, stationery manufacturing, and coated or laminated specialty paper operations.",
      },
      {
        type: "h3",
        value: "Machine Compatibility",
      },
      {
        type: "paragraph",
        value:
          "Replacement blades must strictly match the dimensional and mounting tolerances of specific programmable cutter brands, including Polar, Wohlenberg, Perfecta, Schneider Senator, Challenge, Itoh, and Colter & Peterson. Dimensional deviations introduce alignment errors, safety risks, and accelerated machine guide wear. Required matching parameters include total length, width, and thickness profile; bolt hole or slot geometry and pitch; bevel orientation and counter-sink depth.",
      },
      {
        type: "paragraph",
        value:
          "Sureay engineers [replacement paper cutting blades](/products/paper-cutting-blades) to match these critical OEM configurations, ensuring reduced paper draw and consistent edge geometry across multiple regrind cycles.",
      },
      {
        type: "image",
        value: "/images/news/paper-guillotine-knife-cutting-stack.webp",
      },
      {
        type: "h2",
        value: "Physical Dynamics: Stack Stabilization Under Shear",
      },
      {
        type: "paragraph",
        value:
          "While the cutting stroke appears as a continuous downward slice, the micro-mechanics involve high compression and shear forces. Paper fibers compress under load, mineral coatings reduce friction coefficients between sheets, and laminated layers resist initial penetration.",
      },
      {
        type: "paragraph",
        value:
          "To maintain stack integrity, the knife requires optimal sharpness to lower penetration force, high yield strength to prevent micro-chipping, and precise flatness to cut evenly from the top sheet to the backing stick. Insufficient sharpness causes the blade to plow before cutting, inducing paper draw or stack skewing. Running a dull knife forces operators to over-compensate via excessive clamp pressure, accelerating wear on hydraulic systems, cutting sticks, and blade holders.",
      },
      {
        type: "h2",
        value: "Metallurgy Options & Selection Metrics",
      },
      {
        type: "h3",
        value: "Standard Tool Steel",
      },
      {
        type: "paragraph",
        value:
          "Economical composition optimized for low-volume runs or non-abrasive, low-density paper stocks. These blades allow rapid resharpening but exhibit low wear resistance when processing coated, high-caliper, or mineral-filled stocks.",
      },
      {
        type: "h3",
        value: "High-Speed Steel (HSS) Inlay Knives",
      },
      {
        type: "paragraph",
        value:
          "The standard choice for commercial print environments and high-output converting plants. The blade features a tough structural steel backing inlayed with a high-speed steel cutting edge (typically 18% Tungsten / M2 grade) to maximize wear resistance. HSS inserts retain edge geometry significantly longer than carbon steel under continuous high-speed cycling.",
      },
      {
        type: "h3",
        value: "TCT / Carbide Tipped Knives",
      },
      {
        type: "paragraph",
        value:
          "Tungsten Carbide Tipped (TCT) knives offer maximum run times between grinds when cutting highly abrasive materials such as mineral-coated paper, recycled boards, and heavy kraft. However, carbide's high hardness correlates with high brittleness — it exhibits low tolerance for mechanical shock, frame deflection, or improper installation. TCT requires rigid, stable machinery and specialized diamond-wheel sharpening setups.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: [
          "Metric",
          "Standard Tool Steel",
          "HSS Inlay",
          "Carbide Tipped (TCT)",
        ],
        tableRows: [
          [
            "Abrasive Wear Resistance",
            "Low",
            "Moderate–High",
            "Maximum",
          ],
          [
            "Shock / Impact Toughness",
            "High",
            "Moderate–High",
            "Low (Brittle)",
          ],
          [
            "Sharpening Complexity",
            "Low (Standard Wheels)",
            "Moderate",
            "High (Diamond Wheels Only)",
          ],
          [
            "Primary Cost Driver",
            "Low Initial Purchase",
            "Balanced Lifecycle Cost",
            "High Initial Investment",
          ],
        ],
      },
      {
        type: "callout",
        value:
          "Engineering Note: Evaluate knives on cost-per-clean-cut rather than initial purchase price. This equation factors in blade longevity, sharpening frequencies, machine downtime, substrate spoilage, and mechanical wear.",
      },
      {
        type: "image",
        value: "/images/news/paper-guillotine-knives-hss-carbide-inspection.webp",
      },
      {
        type: "h2",
        value: "Bevel Geometry Optimization",
      },
      {
        type: "paragraph",
        value:
          "The bevel angle defines the balance between penetration efficiency and edge durability. Acute bevels (19°–21°) reduce cutting resistance and are optimized for soft, lightweight, or low-density stocks. Obtuse bevels (22°–24°) provide a robust backing structure for the cutting edge, preventing micro-chipping when splitting dense, hard, or recycled substrates loaded with abrasive fillers.",
      },
      {
        type: "paragraph",
        value:
          "Bevel consistency across the entire linear length of the blade is critical. Linear angular variance alters cutting dynamics across the bed, causing one side of the stack to shear cleanly while the opposite side experiences tearing, sheet draw, or uncut bottom pages.",
      },
      {
        type: "h2",
        value: "Root Cause Analysis of Common Cutting Defects",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Defect", "Root Cause"],
        tableRows: [
          [
            "Ragged or fuzzy edges",
            "Edge blunting, micro-fractures, or inappropriate metallurgy for abrasive coatings",
          ],
          [
            "Uncut bottom sheets",
            "Insufficient down-stroke depth, cutting stick valley, or blade body curvature — recalibrate height after every regrind",
          ],
          [
            "Paper draw / stack displacement",
            "High penetration resistance (dull edge), incorrect bevel for stack density, or failed hydraulic clamp pressure",
          ],
          [
            "Out-of-square / angled cuts",
            "Mechanical guide wear, backgauge misalignment, asymmetric clamp force, or lateral blade deflection",
          ],
          [
            "Edge chipping",
            "Impact with foreign inclusions (staples, wire), aggressive handling, or acute bevel on rigid high-density stocks",
          ],
        ],
      },
      {
        type: "h2",
        value: "Predictive Maintenance Protocols",
      },
      {
        type: "paragraph",
        value:
          "Waiting for visible product defects before replacing a knife induces hidden operational waste. Production environments should implement predictive change-out intervals tracked by cut count, operational shifts, or linear throughput tonnage.",
      },
      {
        type: "image",
        value: "/images/news/paper-guillotine-knives-set.webp",
      },
      {
        type: "callout",
        value:
          "Knife Removal Indicators: (1) Hydraulic drive pressure or motor amperage spikes during the stroke. (2) Edge quality deteriorates or micro-tears emerge on bottom sheets. (3) Increase in paper dust and trim debris accumulation around the bed. (4) Frequent operator adjustment is needed to maintain nominal tolerances.",
      },
      {
        type: "paragraph",
        value:
          "Cutting sticks must be rotated and replaced on a parallel schedule. A grooved or distorted stick deprives the bottom sheet of the rigid counter-pressure necessary for clean separation, mimicking the symptoms of a dull knife. The knife, stick, and clamp function as an integrated trim system.",
      },
      {
        type: "h2",
        value: "Sharpening & Industrial Handling Best Practices",
      },
      {
        type: "paragraph",
        value:
          "Due to high mass and extreme sharpness, industrial knives require rigid safety protocols. Storage must utilize dedicated wooden protective cases, transport must deploy mechanical lifting fixtures, and installation must be restricted to certified maintenance technicians. The cutting edge must never contact metallic surfaces or alternative tooling.",
      },
      {
        type: "paragraph",
        value:
          "Regrinding must be outsourced to qualified industrial knife grinding specialists. The process must maintain OEM bevel profiles, execute precise linear tolerances, and deploy high-volume coolant delivery to prevent localized thermal spikes. Overheating during the grind alters the heat-treatment temper, creating localized soft spots or micro-cracks that permanently degrade blade life. Following each regrind, record the remaining overall blade height — knives must be retired before their height drops below the safe mechanical limits dictated by the machine manufacturer.",
      },
      {
        type: "h2",
        value: "Technical Specifications Required for Procurement",
      },
      {
        type: "paragraph",
        value:
          "To ensure exact fitment, provide the following parameters when ordering replacement knives: machine manufacturer brand, exact model number, and year; blade dimensions (length, width, thickness, total weight); mounting interface (number of holes/slots, center-to-center pitch, thread and countersink specifications); application data including primary substrates, maximum stack height, current defect modes, and target grind cycles; and geometry requirements — desired bevel angle, secondary bevel specs, and metallurgy grade (Standard, HSS, or TCT).",
      },
      {
        type: "h2",
        value: "Consultation & Replacement Knife Engineering",
      },
      {
        type: "paragraph",
        value:
          "Industrial cutting efficiency depends on the alignment of blade metallurgy, geometric profile, and maintenance execution. Implementing the correct technical specifications minimizes make-ready adjustments, prevents substrate waste, maximizes uptime, and isolates expensive cutter components from high mechanical shock loads.",
      },
      {
        type: "callout",
        value:
          "If your production line is experiencing persistent ragged edges, sheet draw, or accelerated blade degradation, Sureay can audit your application. Provide your machine model, blade blueprints, and substrate parameters, and our engineering team will calculate an optimized [replacement knife specification](/products/paper-cutting-blades).",
      },
    ],
  },
  {
    id: "corrugated-slitter-scorer-blades",
    tag: "TECHNICAL GUIDE",
    date: "09.JUN.2026",
    title:
      "How Corrugated Slitter Scorer Blades Improve Board Edge Quality and Box Plant Efficiency",
    excerpt:
      "In corrugated box production, slitter scorer blades set the tone for every downstream step. Learn how to select the right blade material and geometry, maintain tooling, and cut dust, cracked scores, and downtime in your box plant.",
    image: "/images/news/corrugated-slitter-knives.webp",
    readTime: "8 MIN",
    seoTitle:
      "Corrugated Slitter Scorer Blades for Clean Board Edges | Sureay",
    metaDescription:
      "Learn how to select and maintain corrugated slitter scorer blades to cut dust, cracked scores, ragged edges, downtime, and waste in box plants.",
    keywords:
      "corrugated slitter scorer blades, corrugated slitter knives, slitter scorer blades, corrugated board cutting, box plant blades, corrugated scoring tools, tungsten carbide slitter blades, corrugated dust reduction",
    relatedProductIds: ["rotary-slitter-knives-paper", "paper-cutting-blades"],
    content: [
      {
        type: "paragraph",
        value:
          "In corrugated box production, the slitter scorer section sets the tone for everything downstream — printing, folding, gluing, die cutting, and final box quality. When slitter blades and scoring tools are correctly selected and well maintained, board leaves the line with clean edges, accurate widths, stable scores, and minimal dust. When those same tools are worn, misaligned, or poorly matched to the board grade, every step that follows becomes harder to control.",
      },
      {
        type: "paragraph",
        value:
          "Corrugated slitter scorer blades may look like simple circular knives, but their performance depends on blade material, edge geometry, hardness, machine alignment, scoring pressure, board composition, and line speed working together. For any box plant trying to cut waste and improve uptime, blade selection is not a minor maintenance task. It is a production quality decision.",
      },
      {
        type: "image",
        value: "/images/news/corrugated-slitter-knives.webp",
      },
      {
        type: "h2",
        value: "Why Slitter Scorer Blade Quality Matters",
      },
      {
        type: "paragraph",
        value:
          "Corrugated board is a layered material. It can be single-wall, double-wall, or triple-wall, with different flute profiles, recycled or kraft liner, coated surfaces, and varying moisture levels. Each of these factors changes how the board responds to slitting and scoring.",
      },
      {
        type: "paragraph",
        value:
          "A sharp, stable slitter blade separates the board cleanly without crushing the edge. That delivers square blanks, stable stacking, tighter print registration, and more accurate folding.",
      },
      {
        type: "paragraph",
        value:
          "A worn or unsuitable blade does the opposite. It produces edge fuzz, heavy dust, delamination, crushed liners, uneven slit width, and a poor finished appearance. These defects may not stop the corrugator on the spot, but they surface later — in flexo folder gluers, die cutters, laminators, and packing lines.",
      },
      {
        type: "paragraph",
        value:
          "Scoring deserves the same attention. Too much scoring pressure and the board cracks during folding; too little and the fold becomes inconsistent. If the slitter and scorer tools are not properly matched, a blank can pass inspection at the corrugator yet fail at box forming.",
      },
      {
        type: "h2",
        value: "Common Problems Caused by Poor Blade Condition",
      },
      {
        type: "paragraph",
        value:
          "The most visible defect is a **ragged board edge**, usually traced to a dull blade, incorrect overlap, insufficient side clearance, machine vibration, or contamination on the cutting edge.",
      },
      {
        type: "paragraph",
        value:
          "**Excessive dust** is the next most common issue. Dust degrades print quality, increases cleaning frequency, contaminates equipment, and dulls the appearance of finished boxes. It typically rises when the blade crushes fibers instead of cutting them.",
      },
      {
        type: "paragraph",
        value:
          "**Cracked scores** appear when the scoring profile, pressure, or board moisture is out of control. Recycled liners and dry board are especially prone to cracking under excessive scoring pressure.",
      },
      {
        type: "paragraph",
        value:
          "**Edge delamination** happens when the blade pulls or tears the board layers instead of shearing them cleanly. The root cause may be blade sharpness, weak board bonding, knife geometry, or line speed.",
      },
      {
        type: "paragraph",
        value:
          "**Frequent blade replacement** is itself a warning sign — often that the blade material does not suit the board grade, that the machine has runout or vibration, or that sharpening quality is inconsistent.",
      },
      {
        type: "h2",
        value: "Blade Material Options for Corrugated Slitting",
      },
      {
        type: "paragraph",
        value:
          "Material selection should reflect board grade, line speed, expected blade life, and sharpening strategy.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material", "Best Fit", "Strengths", "Watch Points"],
        tableRows: [
          [
            "Tool steel",
            "Standard corrugated applications",
            "Cost-efficient, easy to resharpen",
            "Wears faster on abrasive recycled board",
          ],
          [
            "High-speed steel (HSS)",
            "Higher line speeds, frequent blade changes",
            "Better wear and heat resistance than standard steels",
            "Higher cost than basic tool steel",
          ],
          [
            "Tungsten carbide",
            "Demanding production, long runs",
            "Holds sharp edge through long campaigns, low variation",
            "Less tolerant of impact and misalignment; requires careful handling",
          ],
        ],
      },
      {
        type: "paragraph",
        value:
          "For most box plants, the right answer is not the most expensive blade. It is the blade that delivers the lowest total cost per square meter of board produced — accounting for blade life, downtime, waste, sharpening cost, and product quality together.",
      },
      {
        type: "h2",
        value: "Edge Geometry and Tolerances",
      },
      {
        type: "paragraph",
        value:
          "Blade geometry governs cutting force, dust generation, edge smoothness, and durability. A sharper edge lowers cutting pressure and improves edge cleanliness, but it can wear faster and is more vulnerable to damage in abrasive recycled board. A stronger bevel improves durability for heavy grades and double-wall corrugated, but it requires more cutting force.",
      },
      {
        type: "paragraph",
        value:
          "Dimensional accuracy is critical. Outer diameter, inner diameter, thickness, parallelism, flatness, and concentricity all affect performance. At high corrugator speeds, even small errors create vibration, heat, uneven wear, and inconsistent edges.",
      },
      {
        type: "paragraph",
        value:
          "For slitter scorer systems, machine compatibility is essential. Before ordering, confirm the machine model, blade dimensions, mounting style, rotation direction, and whether the blade must meet an OEM specification.",
      },
      {
        type: "image",
        value: "/images/news/corrugated-slitter-knives-set.webp",
      },
      {
        type: "h2",
        value: "Scoring Tool Compatibility",
      },
      {
        type: "paragraph",
        value:
          "Slitting and scoring should be treated as one process, not two separate maintenance items. A clean slit edge is only valuable if the score line also folds correctly.",
      },
      {
        type: "paragraph",
        value:
          "Scoring wheels must match board thickness, flute type, folding requirement, and final box design. The wrong scoring profile can crush the board, crack the liner, or leave weak folds. Operators should check score depth, alignment, pressure, and consistency across the full web — unevenly worn scoring tools cause blanks to fold differently from one side to the other.",
      },
      {
        type: "paragraph",
        value:
          "When a plant changes board grade, liner type, or flute profile, the scoring setup usually needs to change with it. Running the same scorer pressure for every board grade is one of the most common causes of cracking and inconsistent folding.",
      },
      {
        type: "h2",
        value: "Maintenance Practices That Extend Blade Life",
      },
      {
        type: "paragraph",
        value:
          "Inspect regularly — watch for chipped edges, uneven wear, residue buildup, discoloration, vibration marks, and any change in cut quality. Keep tooling clean: paper dust, adhesive residue, coating particles, and starch build up around slitting sections, raising friction and hiding early signs of blade damage.",
      },
      {
        type: "callout",
        value:
          "Checklist: Control the sharpening process — poor sharpening overheats the edge, alters the bevel, reduces diameter unevenly, or leaves micro-chipping. Always check a resharpened blade for balance, runout, and edge finish before returning it to production. Handle carbide and precision-ground blades in protective packaging, kept apart from other tools.",
      },
      {
        type: "paragraph",
        value:
          "Replace on schedule, not on failure. Track blade life by board grade, production meters, shift, machine, and defect history — the data sharpens both purchasing and maintenance decisions.",
      },
      {
        type: "image",
        value: "/images/news/corrugator-line.webp",
      },
      {
        type: "h2",
        value: "What Buyers Should Tell a Blade Supplier",
      },
      {
        type: "paragraph",
        value:
          "To specify corrugated slitter scorer blades correctly, give the supplier more than basic dimensions. Useful details include machine brand and model (plus any blade drawing), outer diameter, inner diameter, thickness and bevel type, the material currently in use, line speed, board grades and flute types, the defects you are seeing, your expected blade life, and your sharpening process.",
      },
      {
        type: "paragraph",
        value:
          "Be specific about the failure mode — dust, edge crush, cracking, short blade life, or vibration. Once a supplier understands the real problem, it can often recommend a change in material, edge geometry, tolerance, or surface finish. For OEM replacement blades, samples or drawings are especially valuable; for performance improvement projects, photos of defects and worn blades help pinpoint the root cause.",
      },
      {
        type: "h2",
        value: "How Sureay Supports Corrugated Cutting Applications",
      },
      {
        type: "paragraph",
        value:
          "Sureay supplies industrial slitting knives and custom cutting tools for demanding converting applications, including corrugated board production. For slitter scorer systems, Sureay manufactures precision circular slitter blades to customer drawings, samples, or machine requirements.",
      },
      {
        type: "paragraph",
        value:
          "Depending on the application, Sureay supports tool steel, high-speed steel, carbide, and fully custom blade specifications engineered for clean cutting, stable dimensions, and long service life. For plants struggling with dust, ragged edges, cracked scores, or frequent blade changes, Sureay can review the current blade design and recommend a practical, better-performing replacement.",
      },
      {
        type: "callout",
        value:
          "If your corrugator is producing dust, rough edges, cracked scores, or inconsistent blanks, Sureay can evaluate your blade drawings, machine model, board grade, and specific cutting problem to recommend the right [corrugated slitter scorer blades](/contact). Contact Sureay for custom corrugated slitter knives, scorer tooling support, and OEM-fit industrial blade solutions.",
      },
    ],
  },
  {
    id: "sureay-manufacturing-facility-capabilities",
    tag: "COMPANY NEWS",
    date: "15.JUN.2026",
    title:
      "Inside Sureay's Factory: A Look at the Machinery Behind Every Precision Blade",
    excerpt:
      "From CNC lathes and NIDEK machining centers to ULMAKE cylindrical grinders, DK7745 wire EDM machines, and in-house heat treatment — a photo tour of the equipment Sureay uses to produce industrial blades for 50+ countries.",
    image: "/images/about/factory-cnc-workshop.png",
    readTime: "4 MIN",
    seoTitle:
      "Inside Sureay's Blade Factory: CNC Machining, Grinding & EDM Equipment | Sureay",
    metaDescription:
      "Photo tour of Sureay's industrial blade manufacturing equipment: NIDEK VMC machining centers, ULMAKE CNC cylindrical grinders, DK7745 wire EDM machines, MESUN band saws, and in-house heat treatment furnaces.",
    keywords:
      "industrial blade manufacturer, CNC blade machining, ULMAKE cylindrical grinder, wire EDM blade cutting, NIDEK VMC machining center, blade heat treatment, OEM industrial blades, Sureay factory equipment",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "granulator-blades",
      "rotary-slitter-knives",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "When buyers ask what sets Sureay blades apart, the answer is equipment depth and process control. Every stage of production — turning, milling, grinding, EDM cutting, heat treatment — is performed in-house at our 15,000 m² Ma'anshan facility. No subcontracting, no blind spots. This article walks through the actual machines on our factory floor.",
      },
      {
        type: "h2",
        value: "CNC Turning: The Starting Point for Circular Blades",
      },
      {
        type: "image",
        value: "/images/news/sureay-cnc-lathes.jpg",
      },
      {
        type: "paragraph",
        value:
          "Our CNC lathe workshop handles the rough turning of circular and disc blades — slitter knives, log saw blades, granulator rotors — from raw bar stock or forgings. Multiple CNC lathes run simultaneously, maintaining consistent outer diameter and bore concentricity before the part moves to grinding. Geometry is programmed and locked at this stage, eliminating operator variation across repeat orders.",
      },
      {
        type: "h2",
        value: "CNC Vertical Machining Centers: Complex Profiles and Features",
      },
      {
        type: "image",
        value: "/images/news/sureay-nidek-vmc.jpg",
      },
      {
        type: "paragraph",
        value:
          "Our NIDEK VMC-L vertical machining centers handle milling, drilling, tapping, and contouring on blade bodies that require complex 3D features. Shredder blade tooth profiles, bolt hole patterns, and custom mounting geometries are all produced here. The machines are equipped with automatic tool changers and run unattended on longer production batches.",
      },
      {
        type: "image",
        value: "/images/news/sureay-cnc-machining-center.jpg",
      },
      {
        type: "paragraph",
        value:
          "A second CNC machining center handles medium-format blade work, including face milling of shear blade contact surfaces and profile milling for custom OEM configurations. Both machining centers feed the grinding department after roughing is complete.",
      },
      {
        type: "h2",
        value: "CNC Grinding: Where Tolerances Are Finalized",
      },
      {
        type: "image",
        value: "/images/news/sureay-ulmake-cnc-grinder.jpg",
      },
      {
        type: "paragraph",
        value:
          "The ULMAKE 3MK2020 CNC cylindrical grinder is one of our primary finishing machines for circular blades. It grinds outer diameters, bores, and bevels to dimensional tolerances of ±0.001 mm with submicron positional feedback. [Slitter knives](/products/rotary-slitter-knives) and log saw blades that require tight runout and concentricity specifications pass through this machine before final inspection.",
      },
      {
        type: "image",
        value: "/images/news/sureay-cylindrical-grinder.png",
      },
      {
        type: "paragraph",
        value:
          "Additional cylindrical grinders handle high-volume grinding of standard disc blades and shredder rotor shafts. Surface grinders in the same department finish flat faces on shear blades and guillotine knives, achieving surface finishes to Ra ≤ 0.02 µm where the application demands it.",
      },
      {
        type: "h2",
        value: "Wire EDM: Precision Profiles That Grinding Cannot Reach",
      },
      {
        type: "image",
        value: "/images/news/sureay-wire-edm-workshop.jpg",
      },
      {
        type: "paragraph",
        value:
          "Our DK7745 wire EDM workshop runs multiple machines in parallel. Wire EDM cuts complex internal profiles, keyways, claw geometries, and tooth forms on fully hardened steel — features that cannot be produced by conventional milling or grinding after heat treatment. Typical cutting accuracy is ±0.003 mm, which is essential for shredder blade tooth geometry and the tight bore fits required on rotor-mounted knives.",
      },
      {
        type: "paragraph",
        value:
          "Running several EDM machines simultaneously means that custom and non-standard blade profiles do not create bottlenecks. Each machine can hold a different program, so [granulator blades](/products/granulator-blades), [shear blades](/products/guillotine-shear-blades), and specialty profiles run concurrently.",
      },
      {
        type: "h2",
        value: "Raw Material Cutting: MESUN MS-400 Band Saw",
      },
      {
        type: "image",
        value: "/images/news/sureay-mesun-bandsaw.jpg",
      },
      {
        type: "paragraph",
        value:
          "The MESUN MS-400 automatic band saw handles the first operation in the blade lifecycle: cutting raw bar stock, plate, and forging billets to length. Precise cut length and squareness at this stage reduces material waste and ensures consistent blanks enter the machining workflow. The machine runs with coolant flood to maintain cut quality on high-alloy tool steels including D2, M2, and SKD-11.",
      },
      {
        type: "h2",
        value: "Heat Treatment: Hardness Is Built In, Not Added On",
      },
      {
        type: "image",
        value: "/images/news/sureay-heat-treatment-furnace.jpg",
      },
      {
        type: "paragraph",
        value:
          "In-house heat treatment gives Sureay direct control over the most critical variable in blade performance: hardness. Our facility runs both box resistance furnaces for standard alloy steels and vacuum heat treatment furnaces for grades that require a clean, oxide-free atmosphere — such as M2 HSS, M35, and powder-metallurgy steels. Furnace temperature is calibrated and logged for each batch. This is followed by double-temper cycles to relieve internal stress before the part enters finish grinding.",
      },
      {
        type: "paragraph",
        value:
          "Cryogenic treatment at −196 °C is applied to grades where maximum wear resistance is specified — transforming retained austenite and achieving a more uniform carbide distribution through the blade cross-section. The result is consistent hardness across the full cutting edge, not just the surface. Every finished blade is 100% Rockwell-tested before dispatch.",
      },
      {
        type: "h2",
        value: "What In-House Equipment Means for Your Order",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Capability", "Equipment", "What It Delivers"],
        tableRows: [
          ["CNC turning", "CNC lathes", "Consistent OD/bore geometry on circular blades"],
          ["CNC milling", "NIDEK VMC-L + CNC machining center", "Complex profiles, tooth forms, bolt patterns"],
          ["CNC grinding", "ULMAKE 3MK2020 + cylindrical grinders", "±0.001 mm tolerance, Ra ≤ 0.02 µm finish"],
          ["Wire EDM", "DK7745 (multiple machines)", "±0.003 mm on hardened steel, keyways, claws"],
          ["Material cutting", "MESUN MS-400 band saw", "Accurate blanks from bar stock and plate"],
          ["Heat treatment", "Box resistance + vacuum furnaces + cryogenic", "Calibrated hardness, stress-relieved, 100% HRC tested"],
        ],
      },
      {
        type: "paragraph",
        value:
          "Because every operation is under one roof, there are no third-party delays between roughing, heat treatment, and finish grinding. Lead times for production orders are typically 15–25 business days. Sample orders ship in 7–10 business days.",
      },
      {
        type: "callout",
        value:
          "We welcome factory audits from qualified buyers — the equipment is here to inspect. [Contact us](/contact) to arrange a visit, request a product quotation, or discuss a custom blade specification.",
      },
    ],
  },
];

export const SORTED_DISPATCHES = sortDispatchesByDate(ALL_DISPATCHES);

const DISPATCH_AUTHOR_BY_ID: Record<string, DispatchAuthor> = {
  "circular-knife-types": "Eric",
  "sureay-manufacturing-facility-capabilities": "lynn",
  "nonwoven-slitter-knives-guide": "Eric",
  "blade-manufacturing-process": "lynn",
  "custom-metal-shear-blades-batch-production": "lynn",
  "facility-expansion-phase-iii": "lynn",
  "k-show-2024-recycling-knives": "lynn",
  "iso-9001-recertification-2024": "lynn",
  "d2-vs-skd11-vs-tungsten-carbide": "Eric",
  "shredder-metallurgy-maximizes-recycling-yields": "Eric",
  "high-hardness-metal-shear-guide": "Eric",
  "cryogenic-treatment-alloy-blades": "Eric",
  "tin-vs-chrome-coating": "Eric",
  "log-saw-blade-bevel-angles": "Eric",
  "melt-filter-scraper-blade-daily-maintenance-checklist": "Eric",
  "alloy-vs-hss-paper-cutter-blades": "Eric",
  "coil-slitting-line-maintenance-guide": "Eric",
  "metal-slitting-lines-installation-guide": "lynn",
  "paper-guillotine-knives-selection-maintenance-guide": "Eric",
  "corrugated-slitter-scorer-blades": "Eric",
};

// ── Helper Functions ──────────────────────────────────────────────────────────

export function getDispatchAuthor(id: string): DispatchAuthor {
  return DISPATCH_AUTHOR_BY_ID[id] ?? "Eric";
}

/** All non-featured dispatches, for the archive grid. */
export function getAllDispatches(): DispatchArticle[] {
  return SORTED_DISPATCHES.filter(d => !d.isFeatured);
}

/** The single featured dispatch (first one flagged, or first in list). */
export function getFeaturedDispatch(): DispatchArticle {
  return ALL_DISPATCHES.find(d => d.isFeatured) ?? ALL_DISPATCHES[0];
}

/** Look up any dispatch by ID (including featured). */
export function getDispatchById(id: string): DispatchArticle | undefined {
  return ALL_DISPATCHES.find(d => d.id === id);
}

/** Returns the previous and next dispatches relative to `currentId`.
 *  Traverses the full list (featured + archive), wrapping at boundaries. */
export function getAdjacentDispatches(currentId: string): {
  prev: DispatchArticle | null;
  next: DispatchArticle | null;
} {
  const idx = SORTED_DISPATCHES.findIndex(d => d.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? SORTED_DISPATCHES[idx - 1] : null,
    next:
      idx < SORTED_DISPATCHES.length - 1 ? SORTED_DISPATCHES[idx + 1] : null,
  };
}
