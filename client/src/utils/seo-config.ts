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
      "Precision Industrial Blades & Recycling Solutions | Sureay Machinery",
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
    title: "About Sureay Machinery | ISO 9001 Certified Blade Manufacturer",
    description:
      "16 years of precision blade manufacturing excellence in Ma'anshan, China. ISO 9001:2015 certified facility with 5-axis CNC grinding, vacuum heat treatment, and CMM inspection. Serving OEM partners worldwide.",
    keywords:
      "blade manufacturer, ISO 9001 certified, CNC grinding, Ma'anshan China, industrial cutting tools",
  },

  contact: {
    title: "Contact Sureay Machinery | Request Custom Blade Quote",
    description:
      "Get in touch with our engineering team for custom blade specifications, technical support, or OEM partnership inquiries. Fast response for replacement blade orders. Located in Ma'anshan, Anhui, China.",
    keywords:
      "contact blade manufacturer, custom blade quote, OEM blades, technical support",
  },

  news: {
    title: "Industry News & Technical Insights | Sureay Machinery Blog",
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
      "Rotary Slitter Blades & Knives | D2, HSS, Carbide | Sureay",
    description:
      "Rotary slitter blades & knives ground to \u00b10.002mm. D2, M2 HSS & solid carbide. Shear, score & razor profiles. OEM fit Tidland, Kampf, Atlas.",
    keywords:
      "rotary slitter blades, rotary slitter knives, circular slitter knives, slitter blade, rotary slitting blades, industrial slitter knives, converting blades, top bottom knives",
  },

  "metal-foil-strip-slitter-knives": {
    title: "Metal Foil & Strip Slitter Knives | ASP23/ASP52 PM Steel | Sureay",
    description:
      "Precision circular slitter knives for metal service centers. ASP23/ASP52 PM steel and solid carbide options. ±0.001mm thickness tolerance for gang slitting of aluminum foil, copper strips, stainless steel, and silicon steel. Anti-galling mirror-lapped finish.",
    keywords:
      "metal foil slitter knives, coil slitting blades, ASP23 slitter knives, silicon steel slitter, aluminum foil slitter knives, gang slitting arbor",
  },

  "twin-shaft-blades-recycling": {
    title:
      "Chromium Carbide Twin Shaft Shredder Blades | Sureay",
    description:
      "Chromium carbide D2/SKD11 twin-shaft shredder blades for MSW & plastic recycling. 3\u201312 claw geometries, Wire-EDM bores. Fit SSI, Untha, Weima.",
    keywords:
      "chromium carbide rotor blades, twin shaft shredder blades, D2 shredder blades, MSW shredder knives, plastic recycling blades, SKD11 shredder, double shaft blades, chromium carbide rotor blades wholesale",
  },

  "multi-shaft-blades-metal": {
    title: "Metal Shredder Blades | H13/42CrMo for Scrap & E-Waste | Sureay",
    description:
      "High-impact H13/42CrMo multi-shaft shredder blades for scrap metal, ELV, and e-waste processing. HRC 50–54 toughness-optimized to survive catastrophic shock loads. Heavy splined Wire-EDM bores for Shred-Tech, Forus, and Arjes platforms.",
    keywords:
      "metal shredder blades, scrap metal blades, e-waste shredder knives, H13 shredder blades, ELV shredder, metal recycling blades",
  },

  "twin-shaft-blades-battery": {
    title: "Li-Ion Battery Shredder Blades | ±0.02mm Precision | Sureay",
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
      "Plastic Granulator Blades & Crusher Knives | Sureay",
    description:
      "Plastic granulator blades in D2, SKD-11 & Cr12MoV. Rotor/stator knives ground to \u00b10.02mm for Cumberland, Herbold, Rapid. HRC 58\u201362. Get quote.",
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
      "Precision Paper Cutting & Guillotine Blades | Commercial Printing | Sureay",
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
      "Stator Knife & Bed Knives for Shredders | Sureay",
    description:
      "Stator knives (bed knives) for single-shaft shredders. D2/DC53, straightness \u22640.05mm/m, lengths to 3500mm. Fit Vecoplan, Weima, Lindner, Zerma.",
    keywords:
      "stator knife, stator knives, single shaft bed knives, shredder bed knife, counter knives shredder, bed knife replacement, D2 bed knife, shredder stator blade, Vecoplan bed knife",
  },

  "metal-coil-slitting-knives": {
    title: "Precision Coil Slitting Knives | Metal Slitter Blades | Sureay",
    description:
      "Premium top & bottom slitter blade sets for metal coil processing. Thickness tolerance ±0.001mm, parallelism 0.002mm. Complete tooling with spacers and rubber rings. For steel, aluminum, copper, and galvanized coils.",
    keywords:
      "metal slitting knives, coil slitting blades, rotary metal slitters, top bottom slitters, steel slitting knives",
  },

  "metal-shear-knives": {
    title:
      "Heavy-Duty Metal Shear Knives | Guillotine & Scrap Shear Blades | Sureay",
    description:
      "Precision guillotine and scrap shear knives in D2, S1 (6CrW2Si), and H13 tool steels. Ground to ±0.05 mm parallelism for burr-free shearing of mild steel, stainless plate, and heavy scrap. Single-piece lengths up to 6000 mm.",
    keywords:
      "metal shear knives, guillotine shear blades, steel shear knives, hydraulic shear blades, scrap shear blades, D2 shear blades",
  },

  "metal-cold-saw-blades": {
    title: "HSS & TCT Cold Saw Blades | Burr-Free Metal Tube Cutting | Sureay",
    description:
      "M2, M35 Cobalt HSS and TCT cold circular saw blades for steel tube, stainless, and aluminum profile cutting. DIN 1837/1840 standard. Burr-free end-face, no HAZ. TiN/TiAlN PVD coatings available. OEM fit for Kaltenbach, Bewo, MEP.",
    keywords:
      "cold saw blades, HSS cold saw blades, M35 cobalt cold saw, TCT cold saw blades, metal cold circular saw, tube cutting blades, cold saw blade manufacturer",
  },

  "lithium-battery-slitting-knives": {
    title:
      "Tungsten Carbide Battery Slitting Knives | Electrode Foil | Sureay",
    description:
      "Mirror-finish tungsten carbide slitting knives for lithium-ion battery electrode foil. Ra \u22640.05\u03bcm edge, \u00b10.001mm tolerance. Zero micro-burrs on Al/Cu foil.",
    keywords:
      "tungsten carbide slitter blades, battery slitting knives, lithium battery knives, electrode foil slitter, carbide slitter blades, carbide circular knives",
  },

  "corrugated-slitter-scorer-blades": {
    title:
      "Tungsten Carbide Corrugated Slitter Scorer Blades | BHS Fosber | Sureay",
    description:
      "Solid tungsten carbide thin slitter blades for corrugated board dry-end lines. Zero-crush cutting. OEM fit for BHS, Fosber, Marquip. Slotter & scorer knives in stock.",
    keywords:
      "corrugated slitter blades, tungsten carbide slitter blades, scorer blades, BHS slitter, Fosber slitter knives, corrugated box knives",
  },

  "nonwoven-slitter-knives": {
    title:
      "Nonwoven Slitter Knives | M2 HSS Circular Blades for Spunbond | Sureay",
    description:
      "M2 HSS & D2 circular slitter knives for spunbond, meltblown & SMS nonwoven fabrics. Anti-fraying rake geometry for hygiene, medical & filtration lines.",
    keywords:
      "nonwoven slitter, nonwoven slitting blades, nonwoven slitter knives, spunbond slitter knives, meltblown cutting blades, medical nonwoven knives",
  },

  "scrap-chopper-blades": {
    title: "Scrap Chopper Blades | S7 & H13 for Coil Processing | Sureay",
    description:
      "Heavy-duty scrap chopper blades in S7 and H13 tool steel for metal slitting lines. 4-edge indexable design, optional carbide inlay. High impact resistance.",
    keywords:
      "scrap chopper blades, coil processing blades, metal scrap chopper, slitting line chopper knives, S7 chopper blades",
  },

  "rotary-slitter-knives-paper": {
    title:
      "Paper Slitter Knives | Circular Blades for Tissue & Corrugated | Sureay",
    description:
      "Precision circular slitter knives for paper, tissue & corrugated converting. D2, M2 HSS, 52100 steel. \u00b10.002mm tolerance. Matched shear pairs for clean fiber cuts.",
    keywords:
      "paper slitter knives, tissue slitter blades, corrugated slitter knives, paper converting blades, circular paper knives",
  },
};

/**
 * Get SEO configuration for a specific page/route
 */
export function getSEO(pageKey: string): PageSEO {
  return SEO_CONFIG[pageKey] || {};
}

/**
 * Generate full title with brand suffix
 */
export function getFullTitle(title?: string): string {
  if (!title) return "Sureay Machinery | Precision Industrial Blades";
  if (title.includes("Sureay")) return title;
  return `${title} | Sureay`;
}
