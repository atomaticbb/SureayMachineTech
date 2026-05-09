/**
 * seo-config.ts
 * Centralized SEO configuration for meta descriptions, titles, and keywords
 * Optimized for B2B industrial blade manufacturing
 */

export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

// ── Core Pages ────────────────────────────────────────────────────────────

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title:
      "Precision Industrial Blades & Recycling Solutions | Sureay Blades",
    description:
      "Leading manufacturer of precision industrial blades for plastic recycling, metal processing, and paper converting. ISO 9001 certified. Custom CNC grinding, heat treatment, and exact-match OEM replacement blades. Serving global manufacturers since 2008.",
    keywords:
      "industrial blades, granulator blades, shredder blades, slitter knives, precision cutting tools, plastic recycling blades, metal processing knives",
    ogImage: "/images/hero/homehero.webp",
  },

  products: {
    title: "Industrial Blade Products | Precision Cutting Tools | Sureay",
    description:
      "Browse our complete range of industrial cutting blades: rotary slitter knives, shredder blades, granulator knives, tissue log saw blades, and metal shear knives. Custom metallurgy from D2 to carbide. Micron-level tolerances.",
    keywords:
      "industrial blades catalog, cutting tools, rotary blades, shredder knives, granulator blades",
  },

  about: {
    title: "About Sureay Blades | ISO 9001 Certified Blade Manufacturer",
    description:
      "16 years of precision blade manufacturing excellence in Ma'anshan, China. ISO 9001:2015 certified facility with 5-axis CNC grinding, vacuum heat treatment, and CMM inspection. Serving OEM partners worldwide.",
    keywords:
      "blade manufacturer, ISO 9001 certified, CNC grinding, Ma'anshan China, industrial cutting tools",
  },

  contact: {
    title: "Contact Sureay Blades | Request Custom Blade Quote",
    description:
      "Get in touch with our engineering team for custom blade specifications, technical support, or OEM partnership inquiries. Fast response for replacement blade orders. Located in Ma'anshan, Anhui, China.",
    keywords:
      "contact blade manufacturer, custom blade quote, OEM blades, technical support",
  },

  news: {
    title: "Industry News & Technical Insights | Sureay Blades Blog",
    description:
      "Latest updates on blade technology, manufacturing processes, and industry trends. Technical guides on material selection, heat treatment, and blade optimization for recycling and converting applications.",
    keywords:
      "blade technology, manufacturing news, technical guides, industrial cutting insights",
  },

  // ── Industry Landing Pages ─────────────────────────────────────────────

  plasticIndustry: {
    title: "Plastic Recycling Blades | Granulator & Shredder Knives | Sureay",
    description:
      "Specialized blades for plastic recycling operations: single & double-shaft shredder blades, granulator knives for PET/PVC/PP processing. D2/DC53 steel with deep cryogenic treatment. Reduce downtime and improve regrind quality.",
    keywords:
      "plastic recycling blades, granulator knives, shredder blades, PET recycling, PVC processing",
  },

  metalIndustry: {
    title: "Metal Processing Blades | Slitting & Shear Knives | Sureay",
    description:
      "Precision metal cutting solutions: rotary slitter knives for coil processing, guillotine shear blades for steel fabrication. Micro-tolerance engineering (±0.001mm). Complete tooling systems with spacers and rubber rings.",
    keywords:
      "metal slitting knives, guillotine shear blades, coil processing, steel cutting, metal fabrication blades",
  },

  paperIndustry: {
    title:
      "Paper Converting Blades | Tissue Log Saws & Guillotine Knives | Sureay",
    description:
      "High-precision blades for tissue paper converting and commercial printing: Ø610 log saw blades with mirror polish, guillotine cutting knives. TiN coating available for wet environments. Ultra-clean cuts, zero dust generation.",
    keywords:
      "tissue log saw blades, paper cutting knives, guillotine blades, paper converting, printing industry blades",
  },

  // ── Product Detail Pages ───────────────────────────────────────────────

  "rotary-slitter-knives": {
    title:
      "Rotary Slitter Knives for Film, Tape & Packaging",
    description:
      "Rotary slitter blades & knives precision-ground to \u00b10.002\u202fmm. D2, M2 HSS, ASP23 PM steel & tungsten carbide options. Shear, score & razor profiles for BOPP, BOPET, CPP film, PSA tape & nonwoven. OEM fit Tidland, Kampf, Atlas & Dusenbery \u2014 factory direct quote.",
    keywords:
      "rotary slitter blades, rotary slitter knives, tungsten carbide slitter blades, circular slitter knives, slitter blade, rotary slitting blades, industrial slitter knives, film slitter knives, BOPP slitter blades, PSA tape slitter knives, converting blades",
  },

  "metal-foil-strip-slitter-knives": {
    title: "Aluminum Foil & Metal Strip Slitter Knives | ASP23/ASP52 PM Steel, \u00b10.001\u202fmm | Sureay",
    description:
      "ASP23/ASP52 PM tool steel & tungsten carbide slitter knives for metal service centers. \u00b10.001\u202fmm thickness tolerance, mirror-lapped Ra \u22640.02\u202f\u03bcm for burr-free gang slitting of aluminum foil, copper strip, stainless steel & silicon steel. Factory direct wholesale \u2014 low MOQ, request specs.",
    keywords:
      "aluminum foil slitter knives, tungsten carbide slitter blades, metal foil slitter knives, ASP23 slitter knives, silicon steel slitter, gang slitting arbor, coil slitting blades, metal strip slitter, ASP52 slitter blades",
  },

  "twin-shaft-blades-recycling": {
    title:
      "Twin-Shaft Shredder Blades | D2/SKD11 OEM Fit",
    description:
      "D2/SKD11 & chromium carbide rotor blades for MSW, plastics & wood twin-shaft shredding. Intersecting-scissor geometry, 3\u201312 claws, Wire-EDM bores. OEM replacement for Weima, Untha, SSI & Vecoplan. Factory direct wholesale \u2014 low MOQ, custom specs & fast quote.",
    keywords:
      "chromium carbide rotor blades, twin shaft shredder blades, D2 shredder blades, MSW shredder knives, plastic recycling blades, SKD11 shredder, double shaft blades, chromium carbide rotor blades wholesale, intersecting scissor rotor shredder",
  },

  "multi-shaft-blades-metal": {
    title: "Metal Shredder Blades | H13 for Scrap & E-Waste",
    description:
      "High-impact H13/42CrMo multi-shaft shredder blades for scrap metal, ELV, and e-waste processing. HRC 50–54 toughness-optimized to survive catastrophic shock loads. Heavy splined Wire-EDM bores for Shred-Tech, Forus, and Arjes platforms.",
    keywords:
      "metal shredder blades, scrap metal blades, e-waste shredder knives, H13 shredder blades, ELV shredder, metal recycling blades",
  },

  "twin-shaft-blades-battery": {
    title: "Li-Ion Battery Shredder Blades | ±0.02mm Precision",
    description:
      "Precision twin-shaft shredder blades for EV lithium-ion battery pre-shredding. ±0.02mm thickness parallelism for consistent shear clearance on copper and aluminum foils. Corrosion-resistant surface treatments for LiPF6 inert-gas environments.",
    keywords:
      "battery shredder blades, lithium battery recycling blades, EV battery shredder, Li-ion battery processing, battery pre-shredding",
  },

  "tissue-log-saw-blades": {
    title:
      "Tissue Log Saw Blades | D2 \u00d8610\u20131000mm | Sureay",
    description:
      "Tissue log saw blades \u00d8610\u20131000mm, D2 HRC 58\u201360, mirror polish, \u22640.15mm runout. TiN coated. Fit Perini, PCMC, Gambini. Fast quote.",
    keywords:
      "tissue log saw blades, log saw blades tissue, log saw blades, paper saw blades, converting circular saws, D2 saw blades",
  },

  "granulator-blades": {
    title:
      "Plastic Granulator Blades & Crusher Knives | OEM",
    description:
      "D2, SKD-11 & Cr12MoV plastic granulator blades \u2014 rotor & stator knives ground to \u00b10.02\u202fmm. HRC 58\u201362, OEM replacement for Cumberland, Herbold & Rapid granulators. Factory-direct supply, wholesale available. Send model no. for exact-match quote.",
    keywords:
      "plastic granulator blades, granulator blades, granulator blades suppliers, plastic crusher knives, granulator knives, rotor stator blades, PET recycling blades",
  },

  "tire-shredder-blades": {
    title: "Tire Shredder Blades | 3-Claw Rotary Shear for TDF | Sureay",
    description:
      "Premium 3-claw rotary shear blades for primary tire shredding and TDF production. Cru-Wear (PGK) and Modified A8 steel grades. ±0.05mm thickness tolerance. OEM-matched to Barclay, CM, SSI, Untha, Granutech-Saturn. Whole tire and OTR shredding.",
    keywords:
      "tire shredder blades, tyre shredder knives, rotary shear blades, TDF blades, tire recycling knives, 3-claw shredder, Barclay shredder blades",
  },

  "paper-cutting-blades": {
    title:
      "Precision Paper Cutting & Guillotine Blades",
    description:
      "Professional guillotine blades for commercial printing and paper converting. Precision ground to 0.01mm tolerance. Clean, burr-free cuts on coated stock, cardboard, and multi-layer materials. Wide machine compatibility.",
    keywords:
      "paper cutting blades, guillotine blades, printing blades, paper guillotine knives",
  },

  "three-knife-trimmer-blades": {
    title:
      "Trimmer Blades & Spare Knives for Combi Head | Sureay",
    description:
      "HSS & TC three-knife trimmer blades, spare knives for combi head. OEM fit M\u00fcller Martini, Heidelberg, Kolbus. Front + side sets available.",
    keywords:
      "three knife trimmer blades, spare knives for combi head, M\u00fcller Martini replacement knives, bookbinding trimmer knives, HSS trimmer blades, TC trimmer blades, Heidelberg trimmer knife, Kolbus trimmer blade set",
    ogImage:
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
  },

  "single-shaft-rotor-inserts": {
    title: "Single-Shaft Rotor Inserts | Crown Cutter Knives | Sureay",
    description:
      "High-impact single-shaft shredder rotor inserts for aggressive size reduction. Concave, crown and V-groove profiles. 4 usable cutting edges per insert. Deep cryogenic treatment. For bulky plastics, thick-wall containers and MSW.",
    keywords:
      "single shaft rotor inserts, shredder rotor knives, crown cutters, square rotor inserts, concave shredder blades, 4-way indexable",
  },

  "single-shaft-bed-knives": {
    title:
      "Stator & Bed Knives for Single-Shaft Shredders",
    description:
      "D2/DC53 stator knives (counter bed knives) for single-shaft shredders. Straightness \u22640.05\u202fmm/m, custom lengths to 3500\u202fmm. Drop-in OEM replacement for Vecoplan, Weima, Lindner & Zerma. Factory direct \u2014 send drawing or machine model for fast quote.",
    keywords:
      "stator knife, stator knives, single shaft bed knives, shredder bed knife, counter knives shredder, bed knife replacement, D2 bed knife, shredder stator blade, Vecoplan bed knife",
  },

  "metal-coil-slitting-knives": {
    title: "Precision Coil Slitting Knives | Metal Slitter Blades",
    description:
      "Premium top & bottom slitter blade sets for metal coil processing. Thickness tolerance ±0.001mm, parallelism 0.002mm. Complete tooling with spacers and rubber rings. For steel, aluminum, copper, and galvanized coils.",
    keywords:
      "metal slitting knives, coil slitting blades, rotary metal slitters, top bottom slitters, steel slitting knives",
  },

  "metal-shear-knives": {
    title:
      "Heavy-Duty Metal Shear & Guillotine Knives",
    description:
      "Precision guillotine and scrap shear knives in D2, S1 (6CrW2Si), and H13 tool steels. Ground to ±0.05 mm parallelism for burr-free shearing of mild steel, stainless plate, and heavy scrap. Single-piece lengths up to 6000 mm.",
    keywords:
      "metal shear knives, guillotine shear blades, steel shear knives, hydraulic shear blades, scrap shear blades, D2 shear blades",
  },

  "metal-cold-saw-blades": {
    title: "HSS & TCT Cold Saw Blades | Metal Tube Cutting",
    description:
      "M2, M35 Cobalt HSS and TCT cold circular saw blades for steel tube, stainless, and aluminum profile cutting. DIN 1837/1840 standard. Burr-free end-face, no HAZ. TiN/TiAlN PVD coatings available. OEM fit for Kaltenbach, Bewo, MEP.",
    keywords:
      "cold saw blades, HSS cold saw blades, M35 cobalt cold saw, TCT cold saw blades, metal cold circular saw, tube cutting blades, cold saw blade manufacturer",
  },

  "lithium-battery-slitting-knives": {
    title:
      "Carbide Battery Slitting Knives | Electrode Foil",
    description:
      "Mirror-finish tungsten carbide slitting knives for lithium-ion battery electrode foil. Ra \u22640.05\u03bcm edge, \u00b10.001mm tolerance. Zero micro-burrs on Al/Cu foil.",
    keywords:
      "tungsten carbide slitter blades, battery slitting knives, lithium battery knives, electrode foil slitter, carbide slitter blades, carbide circular knives",
  },

  "corrugated-slitter-scorer-blades": {
    title:
      "Corrugated Slitter Scorer Blades | BHS & Fosber",
    description:
      "Solid tungsten carbide thin slitter blades for corrugated board dry-end lines. Zero-crush cutting. OEM fit for BHS, Fosber, Marquip. Slotter & scorer knives in stock.",
    keywords:
      "corrugated slitter blades, tungsten carbide slitter blades, scorer blades, BHS slitter, Fosber slitter knives, corrugated box knives",
  },

  "nonwoven-slitter-knives": {
    title:
      "Nonwoven Slitter Knives | PP Spunbond & SMS",
    description:
      "M2 HSS & D2 circular slitter knives for PP spunbond, meltblown & SMS nonwoven at 200\u2013500\u202fm/min. Anti-fraying rake geometry eliminates fiber tear on hygiene, medical & filtration lines. OEM fit for leading nonwoven converting systems \u2014 request quote.",
    keywords:
      "nonwoven slitter, nonwoven slitting blades, nonwoven slitter knives, spunbond slitter knives, meltblown cutting blades, medical nonwoven knives",
  },

  "scrap-chopper-blades": {
    title: "Scrap Chopper Blades | S7 & H13 for Coil Lines",
    description:
      "Heavy-duty scrap chopper blades in S7 and H13 tool steel for metal slitting lines. 4-edge indexable design, optional carbide inlay. High impact resistance.",
    keywords:
      "scrap chopper blades, coil processing blades, metal scrap chopper, slitting line chopper knives, S7 chopper blades",
  },

  "rotary-slitter-knives-paper": {
    title:
      "Tissue & Paper Slitter Knives | D2 / M2 HSS",
    description:
      "D2 & M2 HSS circular slitter knives for tissue, kraft paper & corrugated board converting. Matched top/bottom shear pairs at \u00b10.002\u202fmm. Fiber-dust-free cuts at 400\u2013600\u202fm/min. OEM fit Atlas, Kampf, Fabio Perini, K\u00f6rber \u2014 send machine model for quote.",
    keywords:
      "tissue slitter blades, paper slitter knives, corrugated slitter knives, tissue converting blades, kraft paper slitter, log saw slitter blades, paper shear pairs, fiber-dust-free slitting",
  },

  // Products without explicit entries — titles from blade.fullName would exceed 70 chars
  "bottom-grooved-anvil-knives": {
    title: "Bottom Grooved Anvil Knives for Shear Slitting",
  },
  "continuous-melt-filter-scraper-blades": {
    title: "Melt Filter Scraper Blades & Filter Plates",
  },
  "strand-pelletizer-rotors": {
    title: "Strand Pelletizer Rotors for Compounding Lines",
  },
};

export function getSEO(pageKey: string): PageSEO {
  return SEO_CONFIG[pageKey] || {};
}

/**
 * Generate full title with brand suffix
 */
export function getFullTitle(title?: string): string {
  if (!title) return "Sureay Blades | Precision Industrial Blades";
  if (title.includes("Sureay")) return title;
  return `${title} | Sureay`;
}
