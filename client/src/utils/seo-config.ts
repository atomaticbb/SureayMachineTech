/**
 * seo-config.ts
 * Centralized SEO configuration for meta descriptions, titles, and keywords
 * Optimized for B2B industrial blade manufacturing
 */

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

// ── Core Pages ────────────────────────────────────────────────────────────

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: "Precision Industrial Blades & Recycling Solutions | Sureay Machinery",
    description:
      "Leading manufacturer of precision industrial blades for plastic recycling, metal processing, and paper converting. ISO 9001 certified. Custom CNC grinding, heat treatment, and exact-match OEM replacement blades. Serving global manufacturers since 2008.",
    keywords: "industrial blades, granulator blades, shredder blades, slitter knives, precision cutting tools, plastic recycling blades, metal processing knives",
    ogImage: "/images/hero/homehero.webp",
  },

  products: {
    title: "Industrial Blade Products | Precision Cutting Tools | Sureay",
    description:
      "Browse our complete range of industrial cutting blades: rotary slitter knives, shredder blades, granulator knives, tissue log saw blades, and metal shear knives. Custom metallurgy from D2 to carbide. Micron-level tolerances.",
    keywords: "industrial blades catalog, cutting tools, rotary blades, shredder knives, granulator blades",
  },

  about: {
    title: "About Sureay Machinery | ISO 9001 Certified Blade Manufacturer",
    description:
      "16 years of precision blade manufacturing excellence in Ma'anshan, China. ISO 9001:2015 certified facility with 5-axis CNC grinding, vacuum heat treatment, and CMM inspection. Serving OEM partners worldwide.",
    keywords: "blade manufacturer, ISO 9001 certified, CNC grinding, Ma'anshan China, industrial cutting tools",
  },

  contact: {
    title: "Contact Sureay Machinery | Request Custom Blade Quote",
    description:
      "Get in touch with our engineering team for custom blade specifications, technical support, or OEM partnership inquiries. Fast response for replacement blade orders. Located in Ma'anshan, Anhui, China.",
    keywords: "contact blade manufacturer, custom blade quote, OEM blades, technical support",
  },

  news: {
    title: "Industry News & Technical Insights | Sureay Machinery Blog",
    description:
      "Latest updates on blade technology, manufacturing processes, and industry trends. Technical guides on material selection, heat treatment, and blade optimization for recycling and converting applications.",
    keywords: "blade technology, manufacturing news, technical guides, industrial cutting insights",
  },

  // ── Industry Landing Pages ─────────────────────────────────────────────

  plasticIndustry: {
    title: "Plastic Recycling Blades | Granulator & Shredder Knives | Sureay",
    description:
      "Specialized blades for plastic recycling operations: single & double-shaft shredder blades, granulator knives for PET/PVC/PP processing. D2/DC53 steel with deep cryogenic treatment. Reduce downtime and improve regrind quality.",
    keywords: "plastic recycling blades, granulator knives, shredder blades, PET recycling, PVC processing",
  },

  metalIndustry: {
    title: "Metal Processing Blades | Slitting & Shear Knives | Sureay",
    description:
      "Precision metal cutting solutions: rotary slitter knives for coil processing, guillotine shear blades for steel fabrication. Micro-tolerance engineering (±0.001mm). Complete tooling systems with spacers and rubber rings.",
    keywords: "metal slitting knives, guillotine shear blades, coil processing, steel cutting, metal fabrication blades",
  },

  paperIndustry: {
    title: "Paper Converting Blades | Tissue Log Saws & Guillotine Knives | Sureay",
    description:
      "High-precision blades for tissue paper converting and commercial printing: Ø610 log saw blades with mirror polish, guillotine cutting knives. TiN coating available for wet environments. Ultra-clean cuts, zero dust generation.",
    keywords: "tissue log saw blades, paper cutting knives, guillotine blades, paper converting, printing industry blades",
  },

  // ── Product Detail Pages ───────────────────────────────────────────────

  "rotary-slitter-knives": {
    title: "Industrial Rotary Slitter Knives | Circular Slitting Blades | Sureay",
    description:
      "Precision circular rotary slitter knives for continuous converting lines. Thickness tolerance ±0.002mm, runout ≤0.02mm. Custom metallurgy from D2 to solid carbide. Shear, score, and razor slitting for film, paper, foil, and non-wovens.",
    keywords: "rotary slitter knives, circular blades, slitting blades, converting blades, top bottom knives",
  },

  "shredder-blades": {
    title: "Premium D2/DC53 Shredder Blades | Plastic Recycling Inserts | Sureay",
    description:
      "Concave shredder blades for plastic recycling machines. D2 tool steel with deep cryogenic treatment. 4-sided indexable rotation extends lifespan 4x. Ideal for HDPE, PP, PET processing. Custom dimensions available.",
    keywords: "shredder blades, plastic recycling blades, D2 shredder knives, recycling inserts, concave blades",
  },

  "tissue-log-saw-blades": {
    title: "D2 Ø610 Tissue Log Saw Blades | Paper Converting Circular Saws | Sureay",
    description:
      "Premium Ø610mm tissue log saw blades with mirror polish finish. D2 steel hardened to 62 HRC. Optimized bevel geometry for speeds >2500 RPM. TiN coating option for wet environments. Clean cuts, zero fiber pull.",
    keywords: "tissue log saw blades, paper saw blades, converting circular saws, D2 saw blades",
  },

  "granulator-blades": {
    title: "Industrial Granulator Blades | Plastic Crusher Knives | Sureay",
    description:
      "Heavy-duty granulator blades for PET, PVC & PP recycling. Rotor and stator knives with precision-ground V-edge geometry. Maximize regrind quality, reduce motor load. Extended mean time between regrind (MTBR).",
    keywords: "granulator blades, plastic crusher knives, rotor stator blades, PET recycling, granulator knives",
  },

  "paper-cutting-blades": {
    title: "Precision Paper Cutting & Guillotine Blades | Commercial Printing | Sureay",
    description:
      "Professional guillotine blades for commercial printing and paper converting. Precision ground to 0.01mm tolerance. Clean, burr-free cuts on coated stock, cardboard, and multi-layer materials. Wide machine compatibility.",
    keywords: "paper cutting blades, guillotine blades, printing blades, paper guillotine knives",
  },

  "single-shaft-shredder-blades": {
    title: "Single Shaft Shredder Blades | Square & Crown Rotor Knives | Sureay",
    description:
      "High-impact single-shaft shredder rotor knives for aggressive size reduction. Square and crown profile options. 4 usable cutting edges per blade. Zero-defect integrity testing. Ideal for bulky plastics and thick-wall containers.",
    keywords: "single shaft shredder blades, rotor knives, square blades, crown cutters, aggressive shredder",
  },

  "metal-coil-slitting-knives": {
    title: "Rotary Metal Slitters | Precision Metal Coil Slitting Knives | Sureay",
    description:
      "Premium top & bottom slitter blade sets for metal coil processing. Thickness tolerance ±0.001mm, parallelism 0.002mm. Complete tooling with spacers and rubber rings. For steel, aluminum, copper, and galvanized coils.",
    keywords: "metal slitting knives, coil slitting blades, rotary metal slitters, top bottom slitters, steel slitting knives",
  },

  "metal-shear-blades": {
    title: "Heavy-Duty Metal Shear Knives | Guillotine Shear Blades | Sureay",
    description:
      "Industrial guillotine shear blades for metal fabrication. Three duty levels: standard (T10 for mild steel), heavy (Cr12MoV for stainless), extreme temp (H13 for hot rolling). Lengths up to 6000mm. Shipbuilding, aviation grade.",
    keywords: "metal shear blades, guillotine shear knives, steel shear blades, fabrication blades, hydraulic shear knives",
  },
};

/**
 * Get SEO configuration for a specific page/route
 */
export function getSEO(pageKey: string): PageSEO {
  return (
    SEO_CONFIG[pageKey] || {
      title: "Sureay Machinery | Precision Industrial Blades",
      description: "Leading manufacturer of precision industrial blades for recycling and converting applications.",
    }
  );
}

/**
 * Generate full title with brand suffix
 */
export function getFullTitle(title?: string): string {
  if (!title) return "Sureay Machinery | Precision Industrial Blades";
  if (title.includes("Sureay")) return title;
  return `${title} | Sureay`;
}
