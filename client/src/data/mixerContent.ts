/**
 * Shared, non-per-SKU content for the Mixer Wear Parts pages.
 *
 * Mixer parts are made-to-order / reverse-engineered from the customer's worn
 * sample or plant model — there is NO fixed dimension/price catalogue. This file
 * holds the general-engineering copy (grade guidance, how-to-order process) and
 * the category-level copy reused by the product-detail and category pages.
 */

import type { MixerCategoryType, MixerSectorType } from "./mixerParts";

// ── Content freshness — bump when the engineering copy is re-checked ─────────
export const CONTENT_LAST_REVIEWED = "July 2026";
export const CONTENT_REVIEWER = {
  name: "Xu Zhengnan",
  title: "Foundry Engineer",
};

// ── Trust strip (global — true for every mixer part) ─────────────────────────
export const TRUST_ITEMS = [
  "ISO 9001:2015 Certified",
  "Ni-Hard / High-Chrome Cast",
  "Made to Order",
  "Ships to 50+ Countries",
];

// ── Grade-selection guidance (general engineering, not per-SKU data) ─────────
// Grouped by part family so each page shows advice relevant to its own part.
export type GradeGuide = {
  intro: string;
  rows: { duty: string; grade: string }[];
};

export type GradeGroup = "cast_steel" | "hard_iron" | "seal";

export function gradeGroupForSector(sector: MixerSectorType): GradeGroup {
  return sector === "mixing_arm"
    ? "cast_steel"
    : sector === "seal"
      ? "seal"
      : "hard_iron";
}

export const GRADE_GUIDE: Record<GradeGroup, GradeGuide> = {
  cast_steel: {
    intro:
      "This part is cast in tough steel, not hard iron — a mixing arm fails from shock and fatigue, so toughness matters more than surface hardness. Pick the grade by duty:",
    rows: [
      {
        duty: "Standard duty",
        grade:
          "Tough cast steel (ZG310-570 class) for general twin-shaft and planetary plants.",
      },
      {
        duty: "High output / abrasive aggregate",
        grade:
          "Upgraded alloy steel with a reinforced hub for long shifts and heavy load.",
      },
      {
        duty: "Hot / high-temperature service",
        grade:
          "Heat-resistant alloy steel that keeps its strength at mixing temperature.",
      },
    ],
  },
  hard_iron: {
    intro:
      "This is a hard-iron wear face (HB 600+). The right grade depends on your aggregate and output — harder, more abrasive aggregate justifies a higher-carbide grade:",
    rows: [
      {
        duty: "Economical / regular renewal",
        grade:
          "Ni-Hard — good general abrasion resistance at lower cost for a part on a routine cycle.",
      },
      {
        duty: "Long life / abrasive aggregate",
        grade:
          "High-chromium iron — higher carbide volume for the longest wear life.",
      },
      {
        duty: "Large or recycled aggregate",
        grade:
          "Impact-resistant grade that tolerates heavy strikes without chipping.",
      },
    ],
  },
  seal: {
    intro:
      "A wear seal is chosen for resilience and sealing, not cast hardness. Pick the grade by pressure, temperature and dust load:",
    rows: [
      {
        duty: "Standard service",
        grade:
          "Baseline sealing grade for typical batch plants and moderate pressure.",
      },
      {
        duty: "High pressure / high output",
        grade:
          "Firmer compound and reinforced lip for long shifts and higher internal pressure.",
      },
      {
        duty: "High temperature / heavy dust",
        grade:
          "Heat-resistant material for hot bituminous service and dust-heavy plants.",
      },
    ],
  },
};

// ── How-to-order process + inquiry checklist (shared, no per-SKU data) ───────
export const ORDER_STEPS = [
  {
    tag: "01",
    title: "Send your part or model",
    body: "Email a photo of the worn part, its key dimensions, or your plant make and model. If you can ship the worn part it becomes the master pattern for an exact copy.",
  },
  {
    tag: "02",
    title: "We measure & match",
    body: "Our team reverse-engineers the geometry, bolt pattern and profile, and recommends the grade for your aggregate, output and temperature.",
  },
  {
    tag: "03",
    title: "Confirm the quote",
    body: "You approve dimensions, grade, price, MOQ and lead time before anything is cast — no surprises.",
  },
  {
    tag: "04",
    title: "Cast, inspect & ship",
    body: "We cast on our lost-foam / DISA lines, run a dimensional and hardness check, and ship factory-direct to 50+ countries. A material and hardness report can travel with the order.",
  },
];

// ── Hub-level FAQ (overview page only — must not duplicate the category-level
//    FAQs above or the per-part FAQs, so the FAQPage schema stays unique) ──────
export const HUB_FAQ = [
  {
    question:
      "What is the difference between concrete and asphalt mixing plant wear parts?",
    answer:
      "Concrete mixer parts fight abrasion at ambient temperature, so the liners, blades and scrapers are cast in Ni-Hard or high-chromium iron and the arms in tough ZG310-570-class steel. Asphalt parts add heat on top of abrasion: the arms use heat-resistant alloy steel that holds its strength at mixing temperature, and the seals use high-temperature materials. The geometry differs too — side linings and spiral blades exist only in asphalt pugmills.",
  },
  {
    question: "Can I order wear parts without an OEM drawing or part number?",
    answer:
      "Yes — that is the normal case. Send a photo of the worn part with its key dimensions, ship the worn part itself, or simply tell us the plant make and model. We reverse-engineer the bore, bolt circle and profile, and you approve every dimension before anything is cast.",
  },
  {
    question:
      "Can concrete and asphalt plant parts ship together in one order?",
    answer:
      "Yes. Both lines are cast in the same foundry, so a mixed order consolidates into one shipment with one set of documents — common for contractors running both a batching plant and an asphalt plant, and for dealers stocking both lines. MOQ is assessed on the combined order.",
  },
  {
    question:
      "Are the wear parts made by the same factory as your industrial blades?",
    answer:
      "Yes. Mixer wear parts come from the same foundry and metallurgy team behind our industrial blade business — the same lost-foam and DISA casting lines, heat treatment and CMM inspection, under one ISO 9001:2015 system. Buyers sourcing both blades and wear parts deal with a single factory.",
  },
];

// ── Category-level copy (unique per plant type — not reused from meta) ───────
export interface CategoryContent {
  /** Hero subhead — distinct from the SEO meta description. */
  heroTagline: string;
  /** Overview aside heading. */
  overviewLead: string;
  /** Overview body paragraphs (original, category-level). */
  overviewBody: string[];
  /** One-line grade-matching note under the materials table. */
  gradeNote: string;
  /** Which part uses which material family (category-specific). */
  materialRows: { part: string; material: string }[];
  /** Category-level FAQ — deliberately different from the per-part FAQs so the
   *  FAQPage schema does not duplicate the product pages'. */
  faq: { question: string; answer: string }[];
  /** Real delivered-work case block (E-E-A-T experience signal). Only set when
   *  genuine material exists — never fabricate. */
  caseStudy?: {
    title: string;
    paragraphs: string[];
    images: { src: string; caption: string }[];
    /** Link to the full technical article this case is drawn from. */
    articleLink: string;
  };
}

export const CATEGORY_CONTENT: Record<MixerCategoryType, CategoryContent> = {
  concrete_mixing_plant: {
    heroTagline:
      "Every wear surface inside your concrete mixer — arms, liner plates, scrapers, blades and shaft seals — cast to order and matched to the plant you run.",
    overviewLead: "One mixing tool, five wear points",
    overviewBody: [
      "A twin-shaft or planetary concrete mixer wears in five places at once: the arms that carry the tools, the liner plates that shield the drum, the scrapers that keep it discharging clean, the blades that fold the batch, and the seals that keep grout off the bearings. Renew one in isolation and the others soon pull the whole tool out of its wear window.",
      "So we treat the set as a system. Arms are cast in tough ZG310-570-class steel for shock, while liners, scrapers and blades are cast in Ni-Hard and high-chromium iron above HB 600 — harder than the aggregate grinding against them. Match the grade to your output and aggregate and the whole chamber stays on one predictable cycle.",
      "There is no fixed catalogue to look up. Send a worn part, a photo or your plant make and model and we reverse-engineer each piece to the original bore, bolt circle and profile, so it drops in without shimming, drilling or field grinding.",
    ],
    gradeNote:
      "We match the grade to your aggregate and output: economical Ni-Hard for parts on a routine cycle, high-chromium iron for the longest life under abrasive aggregate, and tough cast steel for the arms that take shock rather than abrasion.",
    materialRows: [
      {
        part: "Mixing arm",
        material:
          "Tough cast steel (ZG310-570 class, GB/T 11352) — impact, not surface hardness",
      },
      {
        part: "Liner plate",
        material:
          "Ni-Hard / high-chromium iron (ASTM A532 Class I / III), HB 600+",
      },
      {
        part: "Scraper",
        material:
          "High-chromium iron (ASTM A532 Class III), HB 600+, precision-ground edge",
      },
      {
        part: "Mixer blade",
        material: "Ni-Hard (ASTM A532 Class I), HB 600+, bolt-on",
      },
      {
        part: "Wear seal",
        material:
          "Resilient sealing compound — leak-tight, not a cast wear face",
      },
    ],
    faq: [
      {
        question:
          "How do I choose the right wear parts for my concrete mixing plant?",
        answer:
          "Start with your plant make and model and the parts wearing fastest. We match each part's grade to your aggregate hardness and output — Ni-Hard for economical general duty, high-chromium iron for the longest life, and tough cast steel for the arms. Send a worn sample or the model and we confirm the full fit before production.",
      },
      {
        question: "Can I order a full set to reline the whole mixer at once?",
        answer:
          "Yes, and it is usually the most economical route. Because the arms, liners, scrapers, blades and seals share one wear cycle, relining as a set avoids a second shutdown weeks later. Send the plant model and we quote the complete kit.",
      },
      {
        question: "Which concrete plant brands do these parts fit?",
        answer:
          "We supply replacement wear parts for twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich, and can reverse-engineer parts for other or older plants from a worn sample.",
      },
      {
        question: "How long do concrete mixer wear parts last?",
        answer:
          "Liners, scrapers and blades typically run 6-18 months and arms 12-18, depending on output and aggregate hardness. These are guides only — service life depends on output, aggregate hardness and duty cycle, so verify against your OEM service interval.",
      },
      {
        question: "How fast can you supply a replacement set?",
        answer:
          "We ship factory-direct with a low MOQ; lead time depends on the model and whether tooling already exists. Send your plant model for a quote — most repeat items ship in a few weeks, with a material and hardness report available on request.",
      },
    ],
    caseStudy: {
      title: "Matched from a worn sample — no drawing on file",
      paragraphs: [
        "A maintenance manager sent us a photo of a liner segment pulled out of an eight-year-old Zoomlion mixing plant: half the wear face gone, bolt holes slightly oval, and no drawing anywhere in the plant's paperwork — just a faint cast number and the logo pressed into the back.",
        "That sample told us what we needed before quoting. The cast pattern and position numbers on the back face identified which slot in the drum the plate belonged to; the wear pattern — even thinning rather than local gouging — ruled out a misaligned arm; and the bolt geometry gave us the spacing the new plate had to hold to seat flush.",
        "Liners like this are cast on our lost-foam and DISA lines and machined to the original bolt pattern, so the replacement drops in beside its neighbours with no shimming and no field drilling.",
      ],
      images: [
        {
          src: "/images/news/mixer-wear-parts-oem-matching-cast-marks.webp",
          caption:
            "The cast-in part number is the starting reference for a match",
        },
        {
          src: "/images/news/mixer-wear-parts-oem-matching-pattern-number.webp",
          caption: "Pattern number and foundry marks cast into the back face",
        },
        {
          src: "/images/news/mixer-wear-parts-oem-matching-arms.webp",
          caption:
            "Arms and liners share a drum but are cast in different steels",
        },
      ],
      articleLink: "/news/mixer-wear-parts-oem-matching",
    },
  },
  asphalt_mixing_plant: {
    heroTagline:
      "Every hot-mix wear surface in your asphalt plant — arms, liners, side linings, spiral blades, scrapers and seals — cast to order for the plant you run.",
    overviewLead: "Built for hot, abrasive service",
    overviewBody: [
      "A pugmill or twin-shaft asphalt mixer fights heat and abrasion at once: hot bituminous mix and sharp mineral aggregate attack the arms, liners, side linings, spiral blades, scrapers and shaft seals every batch. A worn part in one position quickly drags the rest — and the structural shell — down with it.",
      "So the set is engineered as a system for hot service. Arms use heat-resistant alloy steel that holds strength at mixing temperature; liners, side linings, blades and scrapers are cast in high-chromium iron above HB 600; seals use heat-resistant materials that hold their seal through the temperature cycle. Match the grade to your output and aggregate and the chamber stays on one cycle.",
      "There is no fixed catalogue. Send a worn part, a photo or your plant make and model and we reverse-engineer each piece to the original profile and bolt pattern for a no-shim, drop-in fit.",
    ],
    gradeNote:
      "We match the grade to your aggregate, output and heat: high-chromium iron for the hard-wearing liners, blades and scrapers, heat-resistant alloy steel for the arms, and heat-resistant sealing materials for the shaft seals.",
    materialRows: [
      {
        part: "Mixing arm",
        material: "Heat-resistant alloy steel — holds strength hot",
      },
      {
        part: "Liner plate",
        material: "High-chromium iron (ASTM A532 Class III), HB 600+",
      },
      {
        part: "Side lining",
        material:
          "High-chromium iron (ASTM A532 Class III), HB 600+, corner-profiled",
      },
      {
        part: "Spiral blade",
        material:
          "High-chromium alloy iron (ASTM A532 Class III), HB 600+, bolt-on",
      },
      {
        part: "W-type scraper",
        material:
          "High-chromium iron (ASTM A532 Class III), HB 600+, W3 profile",
      },
      {
        part: "Sealing element",
        material: "Heat-resistant sealing material — high-temp, leak-tight",
      },
    ],
    faq: [
      {
        question:
          "How do I choose the right wear parts for my asphalt mixing plant?",
        answer:
          "Start with your plant make and model and the parts wearing fastest. Because asphalt service adds heat, we match the grade to your aggregate, output and temperature — high-chromium iron for the wear faces, heat-resistant alloy steel for the arms, heat-resistant materials for the seals. Send a worn sample or the model and we confirm the fit before production.",
      },
      {
        question: "Can I order a full set to reline the pugmill at once?",
        answer:
          "Yes, and most plants do. The arms, liners, side linings, blades, scrapers and seals share one wear cycle, so relining as a set — ideally between paving seasons — avoids losing the plant mid-season to a second shutdown. Send the plant model and we quote the complete kit.",
      },
      {
        question: "Which asphalt plant brands do these parts fit?",
        answer:
          "We supply replacement wear parts for pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, plus generic pugmills, and can reverse-engineer parts for other or older plants from a worn sample.",
      },
      {
        question: "How long do asphalt mixer wear parts last?",
        answer:
          "Most hot-mix wear parts run 6-18 months depending on output and aggregate hardness, with the high-wear side linings and scrapers at the shorter end. These are guides only — service life depends on output, aggregate hardness and duty cycle, so verify against your OEM service interval.",
      },
      {
        question: "How fast can you supply a replacement set?",
        answer:
          "We ship factory-direct with a low MOQ; lead time depends on the model and whether tooling already exists. Send your plant model for a quote — most repeat items ship in a few weeks, with a material and hardness report available on request.",
      },
    ],
  },
};
