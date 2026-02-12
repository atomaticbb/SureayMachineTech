// Main product categories
export type ProductMainCategory = "machinery" | "blades";

// Sub-categories for blades (main focus)
export type BladeCategory =
  | "alloy-blades"                   // 合金刀片 ⭐
  | "large-rotary-blades"            // 大回旋刀片 ⭐
  | "shredder-blades"                // 撕碎机刀片 ⭐
  | "tissue-paper-blades"            // 生活用纸刀片 ⭐
  | "paper-cutting-blades"           // 切纸刀
  | "production-line-blades"         // 联动线刀片
  | "shaped-custom-blades"           // 异形刀片
  | "food-processing-blades"         // 食品刀片
  | "roller-shear-blades";           // 滚剪刀片

// Sub-categories for machinery
export type MachineryCategory =
  | "screenless-die-head"            // 无网模头
  | "die-head-screen-plate"          // 无网模头网板
  | "die-head-scraper-blade"         // 无网模头刮刀
  | "pelletizer"                     // 切粒机
  | "pelletizer-roller-blades";      // 切粒机滚刀

export type ProductSubCategory = BladeCategory | MachineryCategory;

export interface ProductSpecs {
  // Common specs
  dimensions?: string;
  material?: string;
  hardness?: string;
  weight?: string;
  tolerance?: string;

  // Machinery specs
  power?: string;        // Motor power (kW)
  capacity?: string;     // Processing capacity (t/h)
  voltage?: string;      // Operating voltage
  motor?: string;        // Motor specifications

  // Blade specs
  thickness?: string;    // Blade thickness
  edgeAngle?: string;    // Cutting edge angle
  coating?: string;      // Surface coating
  maxTemp?: string;      // Max operating temperature

  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameCn?: string;
  slug: string;                      // URL-friendly identifier
  description: string;
  shortDescription?: string;          // Brief 1-line description
  mainCategory: ProductMainCategory;
  subCategory: ProductSubCategory;
  image: string;
  gallery?: string[];                 // Additional product images
  specs?: ProductSpecs;
  features?: string[];
  applications?: string[];
  compatibleBrands?: string[];        // Compatible equipment brands
  isFeatured?: boolean;               // Show on homepage
  sortOrder?: number;                 // Display order
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to get category display name
export function getCategoryDisplayName(category: ProductSubCategory): string {
  const categoryNames: Record<ProductSubCategory, string> = {
    "alloy-blades": "Alloy Blades",
    "large-rotary-blades": "Large Rotary Blades",
    "shredder-blades": "Shredder Blades",
    "tissue-paper-blades": "Tissue Paper Blades",
    "paper-cutting-blades": "Paper Cutting Blades",
    "production-line-blades": "Production Line Blades",
    "shaped-custom-blades": "Shaped/Custom Blades",
    "food-processing-blades": "Food Processing Blades",
    "roller-shear-blades": "Roller Shear Blades",
    "screenless-die-head": "Screenless Die Head",
    "die-head-screen-plate": "Die Head Screen Plate",
    "die-head-scraper-blade": "Die Head Scraper Blade",
    "pelletizer": "Pelletizer",
    "pelletizer-roller-blades": "Pelletizer Roller Blades"
  };
  return categoryNames[category];
}
