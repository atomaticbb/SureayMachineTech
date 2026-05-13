// Main product categories
export type ProductMainCategory = "machinery" | "blades";

// Sub-categories for blades (main focus)
export type BladeCategory =
  // ── Active categories (mapped from BladeCategoryType in blades.ts) ────────
  | "slitter-knives" // Rotary slitter · film · corrugated · nonwoven · battery foil
  | "shredder-blades" // Twin-shaft · single-shaft · rubber shredder · scrap chopper
  | "production-line-blades" // Granulator / plastic crusher knives
  | "log-saw-blades" // Tissue log saw blades
  | "shear-blades" // Guillotine shear · metal shear knives · paper trim blades
  | "cold-saw-blades" // Metal cold circular saw blades
  | "wood-chipper-blades" // Drum chipper · disc chipper · biomass chipper knives
  // ── Legacy (kept for backward compatibility) ──────────────────────────────
  | "alloy-blades"
  | "large-rotary-blades"
  | "tissue-paper-blades"
  | "paper-cutting-blades"
  | "shaped-custom-blades"
  | "food-processing-blades"
  | "roller-shear-blades";

// Sub-categories for machinery
export type MachineryCategory =
  | "screenless-die-head" // 无网模头
  | "die-head-screen-plate" // 无网模头网板
  | "die-head-scraper-blade" // 无网模头刮刀
  | "pelletizer" // 切粒机
  | "pelletizer-roller-blades"; // 切粒机滚刀

export type ProductSubCategory = BladeCategory | MachineryCategory;

export interface ProductSpecs {
  // Common specs
  dimensions?: string;
  material?: string;
  hardness?: string;
  weight?: string;
  tolerance?: string;

  // Machinery specs
  power?: string; // Motor power (kW)
  capacity?: string; // Processing capacity (t/h)
  voltage?: string; // Operating voltage
  motor?: string; // Motor specifications

  // Blade specs
  thickness?: string; // Blade thickness
  edgeAngle?: string; // Cutting edge angle
  coating?: string; // Surface coating
  maxTemp?: string; // Max operating temperature

  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameCn?: string;
  slug: string; // URL-friendly identifier
  description: string;
  shortDescription?: string; // Brief 1-line description
  mainCategory: ProductMainCategory;
  subCategory: ProductSubCategory;
  image: string;
  gallery?: string[]; // Additional product images
  specs?: ProductSpecs;

  applications?: string[];
  compatibleBrands?: string[]; // Compatible equipment brands
  isFeatured?: boolean; // Show on homepage
  sortOrder?: number; // Display order
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to get category display name
export function getCategoryDisplayName(category: ProductSubCategory): string {
  const categoryNames: Record<ProductSubCategory, string> = {
    // ── Active ──────────────────────────────────────────────────────────────
    "slitter-knives": "Slitter Knives",
    "shredder-blades": "Shredder Blades",
    "production-line-blades": "Granulator Blades",
    "log-saw-blades": "Log Saw Blades",
    "shear-blades": "Shear & Guillotine Blades",
    "cold-saw-blades": "Cold Saw Blades",
    "wood-chipper-blades": "Wood Chipper Blades",
    // ── Legacy ──────────────────────────────────────────────────────────────
    "alloy-blades": "Alloy Blades",
    "large-rotary-blades": "Large Rotary Blades",
    "tissue-paper-blades": "Tissue Paper Blades",
    "paper-cutting-blades": "Paper Cutting Blades",
    "shaped-custom-blades": "Shaped/Custom Blades",
    "food-processing-blades": "Food Processing Blades",
    "roller-shear-blades": "Roller Shear Blades",
    // ── Machinery ───────────────────────────────────────────────────────────
    "screenless-die-head": "Screenless Die Head",
    "die-head-screen-plate": "Die Head Screen Plate",
    "die-head-scraper-blade": "Die Head Scraper Blade",
    pelletizer: "Pelletizer",
    "pelletizer-roller-blades": "Pelletizer Roller Blades",
  };
  return categoryNames[category];
}
