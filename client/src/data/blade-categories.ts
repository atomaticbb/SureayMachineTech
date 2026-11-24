/**
 * Blade Category Metadata — Source of Truth for Category Hub Pages.
 *
 * Each entry maps one BladeCategoryType to the display copy + hero image used
 * by /categories/:slug. The blade catalog itself stays in blades.ts; this file
 * only carries presentation metadata for the 7 category entries.
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
  /** Overrides the <title> tag only — the on-page H1 stays `title`. Use when
   *  the hub must claim a search family term that would read badly as a
   *  heading (e.g. "Rotary Slitter Knives" on the slitter hub). */
  seoTitle?: string;
  shortName: string;
  tagline: string;
  heroImage: string;
  description: string;
  specItems?: { label: string; value: string }[];
  selectionGuide?: {
    title: string;
    articles: {
      id: string;
      image?: string;
      width: number;
      height: number;
      smallerWidths: number[];
    }[];
  };
  /** Overrides the short products-section intro when a category needs a
   *  longer routing paragraph (e.g. to split traffic between variants that
   *  would otherwise cannibalize each other in search). */
  routingCopy?: string;
  /** OEM brand names to exclude from the category hub's OEM compatibility
   *  chip list even though they appear in a variant's compatibleMachines —
   *  use when a variant serves an adjacent market whose OEMs don't belong
   *  on the category's general audience-facing list. */
  oemExcludeList?: string[];
  buyingGuide?: {
    layout?: "flat";
    groups: {
      id: string;
      title: string;
      description?: string;
      productIds: string[];
    }[];
    quotePrompt: string;
  };
}

const slitterProductGroups = [
  {
    id: "by-application",
    label: "By Application",
    title: "Choose Knives by Application",
    productIds: [
      "rotary-slitter-knives",
      "rotary-slitter-knives-paper",
      "nonwoven-slitter-knives",
      "metal-foil-strip-slitter-knives",
      "metal-coil-slitting-knives",
      "lithium-battery-slitting-knives",
      "corrugated-slitter-scorer-blades",
      "corrugated-slotter-knives",
      "paper-straw-slitting-blades",
    ],
  },
  {
    id: "bottom-knives-rings",
    label: "Bottom Knives & Rings",
    title: "Bottom Knives & Rings",
    productIds: [
      "bottom-grooved-anvil-knives",
      "slitter-rewinder-bottom-knives",
      "groove-bottom-knives",
    ],
  },
  {
    id: "tungsten-carbide",
    label: "Tungsten Carbide",
    title: "Tungsten Carbide Slitter Knives",
    productIds: ["tungsten-carbide-slitter-knives"],
  },
];

export function getSlitterProductGroups(variants: Blade[]) {
  const productsById = new Map(variants.map(blade => [blade.id, blade]));
  const groups = slitterProductGroups.map(({ productIds, ...group }) => ({
    ...group,
    products: productIds.flatMap(id => {
      const blade = productsById.get(id);
      return blade ? [blade] : [];
    }),
  }));
  const grouped = new Set(groups.flatMap(group => group.products));
  groups[0].products.push(...variants.filter(blade => !grouped.has(blade)));
  return groups.filter(group => group.products.length > 0);
}

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Slitter Knives & Circular Blades",
    seoTitle: "Rotary Slitter Knives & Circular Slitting Blades",
    shortName: "Slitter Knives",
    tagline:
      "Knives for web slitting, metal coil processing and corrugated converting",
    heroImage: "/images/categories/slitter-knives-nav.webp",
    description:
      "Explore slitter knives for film, paper, nonwovens, copper and aluminum foil, steel coils and batteries. Compare blade types, bottom rings and carbide options.",
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Shredder Blades & Wear Parts",
    shortName: "Shredder Blades",
    tagline: "Rotor inserts, bed knives, screens and shaft-mounted cutters",
    heroImage: "/images/categories/shredder-blades-nav.webp",
    description:
      "Choose multi-shaft cutters for general recycling, scrap metal, tires or battery pre-shredding. Find single-shaft rotor inserts, bed knives and screens.",
    selectionGuide: {
      title: "Shredder Blade Selection Guide",
      articles: [
        {
          id: "single-shaft-shredder-blade-face-profile-guide",
          width: 800,
          height: 800,
          smallerWidths: [320, 400, 640],
        },
        {
          id: "tire-shredder-blade-wear-steel-cord",
          width: 2496,
          height: 1696,
          smallerWidths: [400, 800],
        },
        {
          id: "granulator-rotor-bed-knife-configuration",
          width: 1672,
          height: 941,
          smallerWidths: [400, 640, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "twin-and-multi-shaft-cutters",
          title: "Multi-Shaft Cutters by Application",
          description:
            "Start with what goes into the shredder. Then use the machine model and cutter stack to identify the correct replacement.",
          productIds: [
            "twin-shaft-blades-recycling",
            "multi-shaft-blades-metal",
            "tire-shredder-blades",
            "twin-shaft-blades-battery",
          ],
        },
        {
          id: "single-shaft-parts",
          title: "Single-Shaft Shredder & Granulator Parts",
          description:
            "The rotor knives cut against the stationary stator knives. The screen controls which material can pass out of the chamber.",
          productIds: [
            "single-shaft-shredder-blades",
            "single-shaft-bed-knives",
            "shredder-screens",
            "granulator-blades",
          ],
        },
      ],
      quotePrompt:
        "Include the machine model, part number, feedstock and quantity. Attach a cutter or screen drawing if available.",
    },
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title: "Tissue & Nonwoven Log Saw Blades",
    shortName: "Log Saw Blades",
    tagline: "Circular replacement blades by log material",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Compare circular blades for tissue and towel logs or nonwoven wipe logs. Identify the log material and saw model before matching the blade.",
    seoTitle: "Circular Log Saw Blades for Tissue & Nonwovens",
    selectionGuide: {
      title: "Log Saw Blade Selection Guide",
      articles: [
        {
          id: "log-saw-blade-chipping-causes-prevention",
          width: 1600,
          height: 878,
          smallerWidths: [400, 800],
        },
        {
          id: "log-saw-blade-bevel-angles",
          width: 1108,
          height: 1108,
          smallerWidths: [320, 400, 480, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "tissue-and-towel-logs",
          title: "Tissue & Towel Logs",
          productIds: ["tissue-log-saw-blades"],
        },
        {
          id: "nonwoven-logs",
          title: "Nonwoven & Wipe Logs",
          productIds: ["nonwoven-log-saw-blades"],
        },
      ],
      quotePrompt:
        "Include the saw model, log material, blade diameter, bore and drive-pin layout, and attach a drawing if available.",
    },
  },
  {
    slug: "shear-blades",
    category: "shear_blades",
    title: "Metal Shear Blades",
    seoTitle: "Metal Shear Blades for Sheet, Coil & Scrap Cutting",
    shortName: "Metal Shear Blades",
    tagline: "Replacement knives by metal cutting station",
    heroImage: "/images/categories/shear-blades-nav.webp",
    description:
      "Choose guillotine, flying shear and scrap chopper knives, plus stationary and alligator scrap shear blades. Match the machine and knife position.",
    selectionGuide: {
      title: "Metal Shear Blade Selection Guide",
      articles: [
        {
          id: "guillotine-shear-blade-clearance-setting",
          width: 1200,
          height: 960,
          smallerWidths: [400, 640, 800],
        },
        {
          id: "guillotine-shear-blade-parallelism",
          image: "/images/news/guillotine-shear-blade-parallelism-cover.webp",
          width: 990,
          height: 742,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "metal-shearing",
          title: "Sheet Metal, Coil Lines & Rolling Mills",
          description:
            "Choose standalone sheet-metal shear knives, rolling-mill flying shear blades or edge-trim chopper knives.",
          productIds: [
            "guillotine-shear-blades",
            "flying-shear-blades",
            "scrap-chopper-blades",
          ],
        },
        {
          id: "scrap-recycling-shears",
          title: "Scrap Recycling Shears",
          description:
            "Identify a hinged-jaw alligator shear or stationary scrap shear before choosing the replacement knife.",
          productIds: ["metal-shear-knives", "stationary-scrap-shear-blades"],
        },
      ],
      quotePrompt:
        "Include the machine model, blade position, material and thickness or section size, and attach the knife drawing.",
    },
  },
  {
    slug: "paper-cutting-knives",
    category: "paper_cutting",
    title: "Paper Cutting & Trimming Knives",
    shortName: "Paper Cutting Knives",
    tagline: "Knives for paper stacks, web sheeting and print finishing",
    heroImage: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    description:
      "Choose paper guillotine blades, sheeter knives, three-knife trimmer blades and saddle-stitcher knives. Match the cutting station, knife position and machine drawing.",
    selectionGuide: {
      title: "Paper Cutting Knife Selection Guide",
      articles: [
        {
          id: "paper-guillotine-knives-selection-maintenance-guide",
          width: 1200,
          height: 537,
          smallerWidths: [400, 800],
        },
        {
          id: "custom-length-guillotine-paper-cutter-blades",
          width: 1122,
          height: 1402,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "paper-cutting",
          title: "Paper Stack Cutting & Web Sheeting",
          description: "Distinguish clamped paper-stack cutting from continuous-web cross cutting into sheets.",
          productIds: ["paper-cutting-blades", "paper-sheeter-knives"],
        },
        {
          id: "print-finishing",
          title: "Book & Print Finishing",
          description: "Choose the knife set for a three-knife trimmer or saddle-stitching line. Confirm front, side, upper and lower positions.",
          productIds: ["three-knife-trimmer-blades", "saddle-stitcher-trimmer-knives"],
        },
      ],
      quotePrompt: "Include the machine model and version, knife positions, paper or board specification, and the original knife drawings.",
    },
  },
  {
    slug: "other-custom-blades",
    category: "custom_profile",
    title: "Other & Custom Blades",
    shortName: "Other & Custom",
    tagline: "Process-specific cutting parts and custom profiles",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "Find cutter compactor blades, melt filter scrapers, pelletizing knives and custom profiles by process or part type.",
    selectionGuide: {
      title: "Process Knife Selection Guide",
      articles: [
        {
          id: "cutter-compactor-blade-film-vs-flake-wear",
          width: 1600,
          height: 900,
          smallerWidths: [400, 640, 800],
        },
        {
          id: "how-to-spec-die-face-cutting-knives",
          width: 1600,
          height: 900,
          smallerWidths: [400, 800],
        },
        {
          id: "melt-filter-scraper-blade-daily-maintenance-checklist",
          width: 1280,
          height: 720,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      layout: "flat",
      groups: [
        {
          id: "products",
          title: "Other & Custom Blades",
          productIds: [
            "cutter-compactor-blades",
            "continuous-melt-filter-scraper-blades",
            "strand-pelletizer-rotors",
            "die-face-cutting-knives",
            "special-shaped-blades",
          ],
        },
      ],
      quotePrompt:
        "Include the process, machine model, part position and a drawing or sample dimensions.",
    },
  },
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Wood Chipper Knives & Anvils",
    shortName: "Wood Chipper Blades",
    tagline: "Moving knives and stationary counter knives",
    heroImage:
      "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Find moving chipper knives and stationary anvils for drum and disc wood chippers. Compare their roles, then match the replacement to the machine.",
    seoTitle: "Wood Chipper Knives & Anvils for Drum and Disc Chippers",
    selectionGuide: {
      title: "Wood Chipper Knife Selection Guide",
      articles: [
        {
          id: "wood-chipper-blade-wear-patterns",
          width: 1149,
          height: 766,
          smallerWidths: [320, 400, 640, 800],
        },
        {
          id: "wood-chipper-knife-sharpening-guide",
          width: 1536,
          height: 1024,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
        layout: "flat",
      groups: [
        {
          id: "moving-chipper-knives",
          title: "Moving Chipper Knives",
          productIds: ["wood-chipper-blades"],
        },
        {
          id: "stationary-anvils",
          title: "Stationary Anvils",
          productIds: ["wood-chipper-anvils"],
        },
      ],
      quotePrompt:
        "Include the chipper model and serial number, drum or disc type, knife or anvil position and a drawing or sample dimensions.",
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): BladeCategoryMeta | undefined {
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
  wood: "/wood-industry",
  other: "/custom",
};

export const SECTOR_LABEL: Record<BladeSectorType, string> = {
  recycling: "Recycling",
  paper: "Paper & Tissue",
  converting: "Film & Converting",
  metal: "Metal Processing",
  new_energy: "New Energy",
  wood: "Wood & Forestry",
  other: "Custom",
};

// Translated counterpart of SECTOR_LABEL. Use this anywhere the label is shown
// to a visitor; SECTOR_LABEL stays English for GA4 dimensions, which must
// aggregate across locales.
export const SECTOR_LABEL_KEY: Record<BladeSectorType, string> = {
  recycling: "productList.sectors.recycling",
  paper: "productList.sectors.paper",
  converting: "productList.sectors.converting",
  metal: "productList.sectors.metal",
  new_energy: "productList.sectors.newEnergy",
  wood: "productList.sectors.wood",
  other: "productList.sectors.other",
};
