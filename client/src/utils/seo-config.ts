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
    title: "Rotary Slitter Knives for Film, Tape & Packaging",
    description:
      "Rotary slitter knives ground to ±0.002mm — D2, M2 HSS & carbide. Shear/score/razor profiles for BOPP, CPP film & PSA tape. OEM fit Tidland, Kampf & Atlas.",
    keywords:
      "rotary slitter blades, rotary slitter knives, tungsten carbide slitter blades, circular slitter knives, slitter blade, rotary slitting blades, industrial slitter knives, film slitter knives, BOPP slitter blades, PSA tape slitter knives, converting blades",
  },

  "metal-foil-strip-slitter-knives": {
    title:
      "Aluminum Foil & Metal Strip Slitter Knives | ASP23/ASP52 PM Steel, \u00b10.001\u202fmm | Sureay",
    description:
      "ASP23/ASP52 & carbide slitter knives for metal service centers. ±0.001mm tolerance, burr-free gang slitting of aluminum foil, copper & silicon steel.",
    keywords:
      "aluminum foil slitter knives, tungsten carbide slitter blades, metal foil slitter knives, ASP23 slitter knives, silicon steel slitter, gang slitting arbor, coil slitting blades, metal strip slitter, ASP52 slitter blades",
  },

  "twin-shaft-blades-recycling": {
    title: "Twin-Shaft Shredder Blades | D2/SKD11 OEM Fit",
    description:
      "D2/SKD11 twin-shaft shredder blades for MSW, plastics & wood. OEM replacement for Weima, Untha, SSI & Vecoplan. Factory direct — low MOQ, fast quote.",
    keywords:
      "chromium carbide rotor blades, twin shaft shredder blades, D2 shredder blades, MSW shredder knives, plastic recycling blades, SKD11 shredder, double shaft blades, chromium carbide rotor blades wholesale, intersecting scissor rotor shredder",
  },

  "multi-shaft-blades-metal": {
    title: "Metal Shredder Blades | H13 for Scrap & E-Waste",
    description:
      "H13/42CrMo multi-shaft shredder blades for scrap metal, ELV & e-waste. HRC 50–54 shock-resistant. Wire-EDM bores for Shred-Tech, Forus & Arjes.",
    keywords:
      "metal shredder blades, scrap metal blades, e-waste shredder knives, H13 shredder blades, ELV shredder, metal recycling blades",
  },

  "twin-shaft-blades-battery": {
    title: "Li-Ion Battery Shredder Blades | ±0.02mm Precision",
    description:
      "Precision twin-shaft shredder blades for EV Li-ion battery pre-shredding. ±0.02mm parallelism for copper/aluminum foil. Corrosion-resistant for LiPF6.",
    keywords:
      "battery shredder blades, lithium battery recycling blades, EV battery shredder, Li-ion battery processing, battery pre-shredding",
  },

  "tissue-log-saw-blades": {
    title: "Tissue Log Saw Blades | D2 \u00d8610\u20131000mm | Sureay",
    description:
      "Tissue log saw blades \u00d8610\u20131000mm, D2 HRC 58\u201360, mirror polish, \u22640.15mm runout. TiN coated. Fit Perini, PCMC, Gambini. Fast quote.",
    keywords:
      "tissue log saw blades, log saw blades tissue, log saw blades, paper saw blades, converting circular saws, D2 saw blades",
  },

  "granulator-blades": {
    title: "Plastic Granulator Blades & Crusher Knives | OEM",
    description:
      "D2/SKD-11/Cr12MoV granulator blades — rotor & stator knives ground to ±0.02mm, HRC 58–62. OEM fit Cumberland, Herbold & Rapid. Factory direct.",
    keywords:
      "plastic granulator blades, granulator blades, granulator blades suppliers, plastic crusher knives, granulator knives, rotor stator blades, PET recycling blades",
  },

  "tire-shredder-blades": {
    title: "Tire Shredder Blades | 3-Claw Rotary Shear for TDF | Sureay",
    description:
      "3-claw rotary shear blades for tire shredding & TDF production. Cru-Wear & Modified A8 steel, ±0.05mm tolerance. OEM fit Barclay, CM, SSI & Untha.",
    keywords:
      "tire shredder blades, tyre shredder knives, rotary shear blades, TDF blades, tire recycling knives, 3-claw shredder, Barclay shredder blades",
  },

  "paper-cutting-blades": {
    title: "Precision Paper Cutting & Guillotine Blades",
    description:
      "Guillotine blades for commercial printing & paper converting, ground to 0.01mm tolerance. Clean, burr-free cuts on coated stock & cardboard.",
    keywords:
      "paper cutting blades, guillotine blades, printing blades, paper guillotine knives",
  },

  "three-knife-trimmer-blades": {
    title:
      "Three-Knife Trimmer Blades \u2014 Spare Knives for Combi Head | Sureay",
    description:
      "HSS & TC three-knife trimmer blades \u2014 spare knives for combi head. OEM fit M\u00fcller Martini, Wohlenberg, Kolbus. Front + side sets available.",
    keywords:
      "three knife trimmer blades, spare knives for combi head, M\u00fcller Martini replacement knives, bookbinding trimmer knives, HSS trimmer blades, TC trimmer blades, wohlenberg trimmer blades, trimmer blades for perfect binding, Kolbus trimmer blade set",
    ogImage:
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
  },

  "single-shaft-shredder-blades": {
    title: "Single-Shaft Rotor Inserts | Crown Cutter Knives | Sureay",
    description:
      "Single-shaft shredder rotor inserts for aggressive size reduction — concave, crown & V-groove profiles. Cryo-treated for bulky plastics & MSW.",
    keywords:
      "single shaft rotor inserts, shredder rotor knives, crown cutters, square rotor inserts, concave shredder blades, 4-way indexable",
  },

  "single-shaft-bed-knives": {
    title: "Stator & Bed Knives for Single-Shaft Shredders",
    description:
      "D2/DC53 stator bed knives for single-shaft shredders. Straightness ≤0.05mm/m, lengths to 3500mm. OEM fit Vecoplan, Weima, Lindner & Zerma.",
    keywords:
      "stator knife, stator knives, single shaft bed knives, shredder bed knife, counter knives shredder, bed knife replacement, D2 bed knife, shredder stator blade, Vecoplan bed knife",
  },

  "metal-coil-slitting-knives": {
    title: "Precision Coil Slitting Knives | Metal Slitter Blades",
    description:
      "Top & bottom slitter blade sets for metal coil processing. ±0.001mm tolerance, 0.002mm parallelism. Complete tooling for steel, aluminum & copper coils.",
    keywords:
      "metal slitting knives, coil slitting blades, rotary metal slitters, top bottom slitters, steel slitting knives",
  },

  "metal-shear-knives": {
    title: "Heavy-Duty Metal Shear & Guillotine Knives",
    description:
      "Guillotine & scrap shear knives in D2, S1 (6CrW2Si) & H13 tool steel. ±0.05mm parallelism for burr-free shearing of mild steel & stainless plate.",
    keywords:
      "metal shear knives, guillotine shear blades, steel shear knives, hydraulic shear blades, scrap shear blades, D2 shear blades",
  },

  "metal-cold-saw-blades": {
    title: "HSS & TCT Cold Saw Blades | Metal Tube Cutting",
    description:
      "M2/M35 Cobalt HSS & TCT cold saw blades for steel tube, stainless & aluminum profile cutting. DIN 1837/1840, burr-free. OEM fit Kaltenbach & Bewo.",
    keywords:
      "cold saw blades, HSS cold saw blades, M35 cobalt cold saw, TCT cold saw blades, metal cold circular saw, tube cutting blades, cold saw blade manufacturer",
  },

  "lithium-battery-slitting-knives": {
    title: "Carbide Battery Slitting Knives | Electrode Foil",
    description:
      "Mirror-finish tungsten carbide slitting knives for lithium-ion battery electrode foil. Ra \u22640.05\u03bcm edge, \u00b10.001mm tolerance. Zero micro-burrs on Al/Cu foil.",
    keywords:
      "tungsten carbide slitter blades, battery slitting knives, lithium battery knives, electrode foil slitter, carbide slitter blades, carbide circular knives",
  },

  "corrugated-slitter-scorer-blades": {
    title: "Corrugated Slitter Scorer Blades | BHS & Fosber",
    description:
      "Solid tungsten carbide slitter blades for corrugated board dry-end lines. Zero-crush cutting. OEM fit BHS, Fosber & Marquip. Scorer knives in stock.",
    keywords:
      "corrugated slitter blades, tungsten carbide slitter blades, scorer blades, BHS slitter, Fosber slitter knives, corrugated box knives",
  },

  "nonwoven-slitter-knives": {
    title: "Nonwoven Slitter Knives | PP Spunbond & SMS",
    description:
      "M2 HSS & D2 circular slitter knives for PP spunbond, meltblown & SMS nonwoven at 200–500m/min. Anti-fraying geometry for hygiene & medical lines.",
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
    title: "Tissue & Paper Slitter Knives | D2 / M2 HSS",
    description:
      "D2 & M2 HSS slitter knives for tissue, kraft paper & corrugated converting. Matched shear pairs at ±0.002mm. OEM fit Atlas, Kampf & Fabio Perini.",
    keywords:
      "tissue slitter blades, paper slitter knives, corrugated slitter knives, tissue converting blades, kraft paper slitter, log saw slitter blades, paper shear pairs, fiber-dust-free slitting",
  },

  "guillotine-shear-blades": {
    title:
      "Guillotine Shear Blades | D2 & 6CrW2Si for Hydraulic Shears | Sureay",
    description:
      "D2, 6CrW2Si & 9CrSi guillotine shear blades ground to ±0.05mm parallelism. Sets for machines up to 16mm × 4000mm. OEM fit TRUMPF, AMADA & LVD.",
    keywords:
      "guillotine shear blades, hydraulic shear blades, D2 shear blades, 6CrW2Si shear knives, sheet metal shear blades, AMADA replacement blades, TRUMPF shear knives",
  },

  "wood-chipper-blades": {
    title: "Wood Chipper Blades | D2 & TCT Drum & Disc Chipper Knives | Sureay",
    description:
      "D2, Cr12MoV & TCT drum/disc chipper knives, HRC 57–62, ±0.05mm tolerance. OEM fit Bandit, Vermeer, Morbark & Doppstadt. 8–12 regrind cycles.",
    keywords:
      "wood chipper blades, drum chipper knives, disc chipper blades, forestry chipper knives, biomass chipper blades, D2 chipper knives, TCT chipper blades, Vermeer chipper blades, Bandit chipper knives",
  },

  "wood-chipper-blades-industrial": {
    title: "Industrial Wood Chipper Blades | M2 HSS & D2 Tool Steel | Sureay",
    description:
      "M2 HSS & D2 drum chipper knives for heavy commercial forestry, biomass plants & wood recycling. HRC 58–62, vacuum heat-treated + deep cryo treatment.",
    keywords:
      "industrial chipper blades, M2 HSS chipper knives, D2 drum chipper blades, heavy duty wood chipper knives, biomass chipper blades industrial, forestry blades",
  },

  "wood-chipper-blades-standard": {
    title:
      "Wood Chipper Knives | Reversible Double-Edge | T10 · 9CrSi · Cr12MoV | Sureay",
    description:
      "Reversible double-edge wood chipper knives in T10, 9CrSi & Cr12MoV steel — both edges usable before resharpening. OEM fit drum & disc chippers.",
    keywords:
      "wood chipper knives, reversible chipper blades, double edge chipper knives, drum chipper blades, disc chipper knives, T10 chipper blades, 9CrSi chipper knives, Cr12MoV chipper blades",
  },

  "wood-chipper-anvils": {
    title:
      "Wood Chipper Anvils & Counter-Knives | D2 · A8 Modified | Matched Sets | Sureay",
    description:
      "Wood chipper anvils (counter-knives) in D2, Cr12MoV & A8 Modified steel, HRC 54–60. ±0.05mm parallelism. OEM fit Bandit, Vermeer & Morbark.",
    keywords:
      "wood chipper anvil, chipper counter knife, bed knife chipper, chipper anvil replacement, Bandit anvil, Vermeer counter knife, Morbark bed knife, drum chipper anvil, disc chipper counter knife, matched blade anvil set",
  },

  "special-shaped-blades": {
    title: "Custom Special-Shaped Blades | Any Profile, Any Alloy | Sureay",
    description:
      "Custom-profile industrial blades made from DXF/DWG/STEP drawings or samples. D2, H13, PM-HSS & carbide. Tolerances to ±0.02mm. Any industry, any geometry.",
    keywords:
      "custom blades, special shaped knives, custom profile blades, OEM custom blades, bespoke industrial knives, DXF blade manufacturing",
  },

  // Products without explicit entries — titles from blade.fullName would exceed 70 chars
  "bottom-grooved-anvil-knives": {
    title: "Bottom Grooved Anvil Knives for Shear Slitting",
    description:
      "Bottom grooved anvil knives for shear slitting of film, paper, foil & tape. D2, M2 HSS & carbide. OEM fit Tidland, Kampf, Atlas & BHS arbor systems.",
  },
  "continuous-melt-filter-scraper-blades": {
    title: "Melt Filter Scraper Blades & Filter Plates",
    description:
      "D2/H13/Carbide scraper blades & filter plates for PCR continuous melt filters. HRC 58–62, HCl-resistant for PVC blends. Fit EREMA, Gneuß & Ettlinger.",
  },
  "strand-pelletizer-rotors": {
    title: "Strand Pelletizer Rotors for Compounding Lines",
    description:
      "Strand pelletizer rotors for plastic compounding lines. PM-HSS & carbide, ≤0.005mm concentricity. Drop-in fit for Maag, Coperion & Cumberland pelletizers.",
  },
};

export function getSEO(pageKey: string): PageSEO {
  return SEO_CONFIG[pageKey] || {};
}
