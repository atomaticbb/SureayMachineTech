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
    slug: "shear-blades",
    category: "shear_blades",
    title: "Shear & Guillotine Blades",
    shortName: "Shear Blades",
    tagline: "Guillotine shear knives, metal shear blades and paper trim sets",
    heroImage:
      "/images/products/granulator-blades/metal-shear-blades-00.webp",
    description:
      "Straight shear and guillotine blades for metal plate/sheet shearing, hydraulic guillotine machines, paper guillotines and three-knife trimmers. TCT-inlay or bimetallic edge construction with controlled face flatness; supplied as matched sets for OEM compatibility.",
    specItems: [
      { label: "Edge Construction", value: "TCT-inlay · Bimetallic · Solid HSS" },
      { label: "Face Flatness", value: "Maintained over full length" },
      { label: "Supply Format", value: "Matched OEM sets" },
      { label: "Machines", value: "Hydraulic guillotine · Plate shear · Three-knife trimmer" },
      { label: "Applications", value: "Steel sheet · Paper · Board · Book block" },
      { label: "Regrindable", value: "Yes" },
    ],
  },
  {
    slug: "cold-saw-blades",
    category: "cold_saw_blades",
    title: "Metal Cold Saw Blades",
    shortName: "Cold Saw Blades",
    tagline: "HSS and carbide circular blades for cold-cutting steel and tube",
    heroImage:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
    description:
      "Cold circular saw blades for burr-free cutting of steel tube, solid bar and structural profiles. Available in HSS-E (M35/M42) and TCT (tungsten carbide-tipped) variants with chip-form geometries tuned for dry, flood-coolant and MQL cutting conditions.",
    specItems: [
      { label: "Materials", value: "HSS-E M35/M42 · TCT carbide-tipped" },
      { label: "Cut Quality", value: "Burr-free, no heat-affected zone" },
      { label: "Cutting Conditions", value: "Dry · Flood coolant · MQL" },
      { label: "Applications", value: "Steel tube · Solid bar · Structural profile" },
      { label: "Supply Format", value: "OEM replacement or custom OD/ID/pitch" },
      { label: "Regrindable", value: "Yes — multiple cycles" },
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
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Wood Chipper Blades",
    shortName: "Wood Chipper Blades",
    tagline: "Drum & disc chipper knives for forestry, biomass & wood recycling",
    heroImage: "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Heavy-duty drum and disc chipper knives manufactured from D2, Cr12MoV and TCT carbide-tipped steel. Vacuum heat-treated to HRC 57–62 with deep cryogenic treatment. Precision-ground to ±0.05 mm thickness tolerance for clean, uniform chip geometry.",
    specItems: [
      { label: "Materials", value: "High-Carbon Steel · D2/Cr12MoV · TCT Carbide-Tipped" },
      { label: "Hardness", value: "HRC 55–58 (standard) · HRC 58–62 (D2) · HRA 89–91 (TCT)" },
      { label: "Thickness Tolerance", value: "±0.05 mm" },
      { label: "Applications", value: "Drum chippers · Disc chippers · Biomass whole-tree chippers" },
      { label: "OEM Compatibility", value: "Bandit · Vermeer · Morbark · Peterson · Doppstadt · Jenz" },
      { label: "Regrindable", value: "Yes — 8–12 cycles (through-hardened)" },
    ],
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
