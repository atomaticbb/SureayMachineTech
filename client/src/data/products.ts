import { type Product, type ProductSpecs, type ProductSubCategory } from "@shared/types/product";
import { blades, type Blade, type BladeCategoryType } from "./blades";

/**
 * Product Catalog - Sureay Machinery
 *
 * ARCHITECTURE: Single Source of Truth (SSOT)
 *
 * All blade product data lives exclusively in `blades.ts`.
 * This file uses an Adapter Pattern to project the rich `Blade`
 * interface into the flat `Product` interface required by catalog
 * pages, search, and global routing — with zero data duplication.
 *
 * To add machinery or mold products in the future, append them to
 * the `NON_BLADE_PRODUCTS` array below.
 */

// ─── Category Bridge ───────────────────────────────────────────────────────────
// Maps BladeCategoryType (snake_case in blades.ts) to
// ProductSubCategory (kebab-case in @shared/types/product).
const BLADE_SUBCATEGORY_MAP: Record<BladeCategoryType, ProductSubCategory> = {
  slitter_knives:    "slitter-knives",
  shredder_blades:   "shredder-blades",
  granulator_blades: "production-line-blades",
  log_saw_blades:    "log-saw-blades",
  trim_cut_blades:   "trim-cut-blades",
  metal_processing:  "metal-processing-blades",
  battery_precision: "battery-precision-blades",
};

// ─── Adapter ───────────────────────────────────────────────────────────────────
// Pure projection: reads from the authoritative Blade record, writes
// to the flat Product shape. Never stores its own copy of blade content.
function bladeToProduct(blade: Blade, index: number): Product {
  // Convert BladeSpec[] hero panel (label/value pairs) to a keyed ProductSpecs object.
  // Uses the index-signature ([key: string]: any) on ProductSpecs for safety.
  const specs = blade.specs.reduce<ProductSpecs>((acc, { label, value }) => {
    const key = label.toLowerCase().replace(/\s+/g, "_");
    (acc as Record<string, string>)[key] = value;
    return acc;
  }, {});

  return {
    id:               blade.id,
    name:             blade.name,
    nameEn:           blade.name,
    slug:             blade.id,          // blade routing uses id as the URL slug
    description:      blade.fullDescription ?? blade.description,
    shortDescription: blade.description,
    mainCategory:     "blades",
    subCategory:      BLADE_SUBCATEGORY_MAP[blade.category],
    image:            blade.image,
    gallery:          blade.gallery,
    features:         blade.features,
    isFeatured:       blade.isFeatured,
    sortOrder:        index + 1,
    specs,
  };
}

// ─── Non-blade products (machinery, molds, etc.) ──────────────────────────────
// Add future machinery / mold Product objects here.
const NON_BLADE_PRODUCTS: Product[] = [];

// ─── Aggregated catalog – the only export page components should read ─────────
export const products: Product[] = [
  ...blades.map(bladeToProduct),
  ...NON_BLADE_PRODUCTS,
];

// ─── Helper Functions ──────────────────────────────────────────────────────────

/** Featured products for homepage display, sorted by position in source array. */
export function getFeaturedProducts(): Product[] {
  return products
    .filter((p) => p.isFeatured)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/** All products belonging to a top-level category. */
export function getProductsByMainCategory(
  category: "machinery" | "blades" | "molds",
): Product[] {
  return products
    .filter((p) => p.mainCategory === category)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/** Look up a single product by its URL slug.
 *  Falls back to matching by id since blade routing uses id as slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

/** All products belonging to a specific sub-category. */
export function getProductsBySubCategory(subCategory: string): Product[] {
  return products.filter((p) => p.subCategory === subCategory);
}
