/**
 * Blade Category Metadata — Source of Truth for Category Hub Pages.
 *
 * Each entry maps one BladeCategoryType to the display copy + hero image used
 * by /categories/:slug. The blade catalog itself stays in blades.ts; this file
 * only carries presentation metadata for the 8 aggregation pages.
 */

import {
  blades,
  type Blade,
  type BladeCategoryType,
  type BladeSectorType,
} from "./blades";

export interface BladeCategoryMeta {
  slug: string;
  category: BladeCategoryType;
  title: string;
  shortName: string;
  tagline: string;
  heroImage: string;
  description: string;
  specItems?: { label: string; value: string }[];
}

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Slitter Knives & Circular Blades",
    shortName: "Slitter Knives",
    tagline: "Precision-ground rotary blades for film, paper & metal foil",
    heroImage:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-09.webp",
    description:
      "Rotary slitter knives engineered for shear, score and razor cutting across flexible packaging film, paper, nonwovens and metal foil. ±0.002 mm thickness tolerance, ≤0.02 mm T.I.R. runout, available in M2 HSS, D2, ASP23 PM steel and solid carbide with optional TiN, DLC and Teflon coatings.",
    specItems: [
      { label: "Thickness Tolerance", value: "±0.002 mm" },
      { label: "T.I.R. Runout", value: "≤0.02 mm" },
      { label: "Materials", value: "M2 HSS · D2 · ASP23 PM · Carbide" },
      { label: "Coatings", value: "TiN · DLC · Teflon" },
      { label: "Cutting Modes", value: "Shear · Score · Razor" },
      { label: "Applications", value: "Film · Paper · Nonwovens · Foil" },
    ],
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Shredder Blades & Cutter Inserts",
    shortName: "Shredder Blades",
    tagline: "Twin-shaft, single-shaft and tire shredder cutting tools",
    heroImage: "/images/products/shredder-blades/shredder-blades-01.webp",
    description:
      "Heavy-duty shredder blades for plastic, metal, tire and battery recycling lines. Forged D2/SKD11/Cr12MoV alloy with cryogenic and vacuum heat treatment for extreme impact and wear resistance. Drop-in OEM fit for twin-shaft and single-shaft shredder platforms.",
    specItems: [
      { label: "Materials", value: "D2 · SKD11 · Cr12MoV" },
      { label: "Hardness", value: "58–62 HRC" },
      { label: "Heat Treatment", value: "Cryogenic + Vacuum" },
      { label: "Platforms", value: "Twin-shaft · Single-shaft" },
      { label: "Applications", value: "Plastic · Metal · Tire · Battery" },
      { label: "Fit", value: "Drop-in OEM replacement" },
    ],
  },
  {
    slug: "granulator-blades",
    category: "granulator_blades",
    title: "Granulator Blades & Crusher Knives",
    shortName: "Granulator Blades",
    tagline: "Maximized regrind quality, extended MTBR",
    heroImage: "/images/products/granulator-blades/granulator-blades-01.webp",
    description:
      "Plastic granulator and crusher knives engineered for size reduction lines. Optimized rake geometry preserves regrind quality while reducing motor load and dust generation. Compatible with rotary, claw, hopper and pelletizing granulator machines.",
    specItems: [
      { label: "Materials", value: "H13 · D2 · M2 HSS · Carbide" },
      { label: "Geometry", value: "Optimized rake angle" },
      { label: "Machines", value: "Rotary · Claw · Hopper · Pelletizing" },
      { label: "Benefit", value: "Lower motor load · Less dust" },
      { label: "Applications", value: "Plastic regrind · Size reduction" },
      { label: "Regrindable", value: "Yes — multiple cycles" },
    ],
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title: "Tissue & Log Saw Blades",
    shortName: "Log Saw Blades",
    tagline: "Zero dust. Burr-free tissue and napkin cutting.",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Circular log saw blades for tissue, kitchen towel and napkin converting lines. CBN-compatible profiles with controlled runout, anti-friction surface treatment and a serration geometry tuned for clean, dust-free perforation at high line speeds.",
    specItems: [
      { label: "Profile", value: "CBN-compatible" },
      { label: "Surface", value: "Anti-friction treatment" },
      { label: "Cut Quality", value: "Dust-free perforation" },
      { label: "Speed", value: "Optimized for high line speeds" },
      { label: "Applications", value: "Tissue · Kitchen towel · Napkin" },
      { label: "Serration", value: "Custom geometry available" },
    ],
  },
  {
    slug: "trim-cut-blades",
    category: "trim_cut_blades",
    title: "Paper Trimming & Guillotine Blades",
    shortName: "Paper Trim Blades",
    tagline: "Bimetallic-inlay edges for guillotine and three-knife trimmers",
    heroImage:
      "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
    description:
      "Guillotine and three-knife trimmer blades for paper, board and book block trimming. TCT-inlay or bimetallic edge construction holds face flatness across long blade lengths and is supplied as matched sets for OEM trimmer compatibility.",
    specItems: [
      { label: "Edge Construction", value: "TCT-inlay · Bimetallic" },
      { label: "Face Flatness", value: "Maintained over full length" },
      { label: "Supply Format", value: "Matched OEM sets" },
      { label: "Machines", value: "Guillotine · Three-knife trimmer" },
      { label: "Applications", value: "Paper · Board · Book block" },
      { label: "Regrindable", value: "Yes" },
    ],
  },
  {
    slug: "metal-processing",
    category: "metal_processing",
    title: "Metal Processing Blades",
    shortName: "Metal Processing",
    tagline: "Coil slitting, shear knives and cold circular saw blades",
    heroImage: "/images/products/granulator-blades/metal-shear-blades-00.webp",
    description:
      "Industrial knives for steel coil slitting, plate shearing and cold circular sawing. Powder-metallurgy alloys with controlled cumulative tolerance stack for multi-knife arbor setups, plus anti-galling surface treatments for stainless and high-carbon strip.",
    specItems: [
      { label: "Materials", value: "Powder-metallurgy alloys" },
      { label: "Tolerance Stack", value: "Controlled cumulative" },
      { label: "Surface", value: "Anti-galling treatment" },
      { label: "Setups", value: "Multi-knife arbor compatible" },
      { label: "Applications", value: "Coil slitting · Shearing · Sawing" },
      { label: "Strip Types", value: "Stainless · High-carbon" },
    ],
  },
  {
    slug: "battery-precision",
    category: "battery_precision",
    title: "Battery Electrode Slitting Knives",
    shortName: "Battery Precision",
    tagline: "Tungsten carbide blades for lithium electrode foil",
    heroImage:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
    description:
      "Solid tungsten carbide circular slitting knives for lithium battery electrode foil — cathode, anode and separator. Ultra-fine grain carbide with zero-notch edge geometry and matched knife pairs for the EV and energy storage cell manufacturing supply chain.",
    specItems: [
      { label: "Material", value: "Solid tungsten carbide" },
      { label: "Grain", value: "Ultra-fine" },
      { label: "Edge Geometry", value: "Zero-notch" },
      { label: "Supply", value: "Matched knife pairs" },
      { label: "Foil Types", value: "Cathode · Anode · Separator" },
      { label: "Industry", value: "EV · Energy storage" },
    ],
  },
  {
    slug: "custom-profile",
    category: "custom_profile",
    title: "Custom & Special-Shaped Blades",
    shortName: "Custom Blades",
    tagline: "Any geometry · any alloy · from DXF, DWG or sample",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "Custom profile and special-shaped industrial blades manufactured from your DXF/DWG/STEP drawings or physical samples. D2, H13, PM-HSS and solid carbide options with tolerances to ±0.02 mm — any profile, any industry.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getCategoryBySlug(
  slug: string
): BladeCategoryMeta | undefined {
  return BLADE_CATEGORIES.find(c => c.slug === slug);
}

export function getBladesByCategory(category: BladeCategoryType): Blade[] {
  return blades.filter(b => b.category === category);
}

export function getSectorsForCategory(
  category: BladeCategoryType
): BladeSectorType[] {
  const seen = new Set<BladeSectorType>();
  for (const b of blades) {
    if (b.category === category) seen.add(b.sector);
  }
  return Array.from(seen);
}

/** First blade in a category, used as the content donor for the hub page
 * (its fullDescription, faqs and compatibleMachines drive the long-form
 * sections). Falls back to undefined for empty categories. */
export function getRepresentativeBlade(
  category: BladeCategoryType
): Blade | undefined {
  return blades.find(b => b.category === category);
}

/** Deduplicated union of every variant's `compatibleMachines` in a category.
 * Order: first appearance, preserving the curation in blades.ts. */
export function getOemMachinesForCategory(
  category: BladeCategoryType
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const b of blades) {
    if (b.category !== category || !b.compatibleMachines) continue;
    for (const m of b.compatibleMachines) {
      if (!seen.has(m)) {
        seen.add(m);
        out.push(m);
      }
    }
  }
  return out;
}

// ── Sector → Industry page URL map ──────────────────────────────────────────
// Used by chips in the Category Hub hero and as the badge link on each card.

export const SECTOR_INDUSTRY_URL: Record<BladeSectorType, string> = {
  recycling: "/plastic-industry",
  paper: "/paper-industry",
  converting: "/converting-industry",
  metal: "/metal-industry",
  new_energy: "/new-energy-industry",
  other: "/custom",
};

export const SECTOR_LABEL: Record<BladeSectorType, string> = {
  recycling: "Recycling",
  paper: "Paper & Tissue",
  converting: "Film & Converting",
  metal: "Metal Processing",
  new_energy: "New Energy",
  other: "Custom",
};
