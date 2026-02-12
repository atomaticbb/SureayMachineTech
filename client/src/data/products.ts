import { Product } from "@shared/types/product";

/**
 * Product Database - Sureay Machinery
 *
 * This file contains all product data for the website.
 * Update this file to add/edit products.
 */

export const products: Product[] = [
  // ========================================
  // FEATURED BLADES (Main Products) ⭐
  // ========================================

  {
    id: "alloy-blades-001",
    name: "Industrial Alloy Blades",
    nameEn: "Industrial Alloy Blades",
    nameCn: "合金刀片",
    slug: "alloy-blades",
    shortDescription: "High-performance alloy steel blades for industrial cutting applications",
    description: `Our industrial alloy blades are precision-engineered cutting tools manufactured from premium high-grade tool steel alloys including 9CrSi, Cr12MoV, and W6Mo5Cr4V2.

Designed for demanding industrial cutting operations that require superior wear resistance, edge retention, and cutting precision. Each blade undergoes advanced vacuum heat treatment to achieve optimal hardness (58-62 HRC) and dimensional stability.

Ideal for recycling facilities, paper processing plants, plastic extrusion lines, and food processing operations requiring consistent, high-quality cuts over extended service periods.`,
    mainCategory: "blades",
    subCategory: "alloy-blades",
    image: "/images/products/product.webp",
    gallery: [
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
    ],
    specs: {
      material: "9CrSi, Cr12MoV, W6Mo5Cr4V2, SKD-11",
      hardness: "58-62 HRC",
      dimensions: "40×40×25mm to 150×150×35mm (customizable)",
      thickness: "5mm to 35mm",
      tolerance: "±0.05mm",
      weight: "0.5kg to 8kg per piece",
      edgeAngle: "20° to 45° (customizable)",
      coating: "Optional: TiN, TiCN, CrN coating",
      maxTemp: "Up to 600°C",
    },
    features: [
      "Premium alloy steel construction for maximum wear resistance",
      "Precision CNC machining with ±0.05mm tolerance",
      "Vacuum heat treatment for uniform hardness distribution",
      "Sharp, durable cutting edges with extended service life",
      "Custom dimensions and configurations available",
      "Compatible with major industrial equipment brands",
      "ISO 9001:2015 certified manufacturing process",
      "Competitive pricing with factory-direct sourcing",
    ],
    applications: [
      "Plastic recycling and extrusion",
      "Paper and pulp processing",
      "Food processing and packaging",
      "Chemical and pharmaceutical industries",
      "Waste management and recycling",
      "Rubber and tire recycling",
      "Wood processing and chipping",
      "Textile cutting and processing",
    ],
    compatibleBrands: [
      "Compatible with WEIMA, SSI, Vecoplan, UNTHA, Lindner",
      "Generic industrial cutters and shredders",
      "Custom machinery (dimensions can be tailored)",
    ],
    isFeatured: true,
    sortOrder: 1,
    seoTitle: "Industrial Alloy Blades Manufacturer | Custom Cutting Blades - Sureay",
    seoDescription: "High-performance alloy steel blades (9CrSi, Cr12MoV) for industrial cutting. Factory-direct pricing, custom dimensions, 58-62 HRC hardness. ISO certified quality.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },

  {
    id: "large-rotary-blades-001",
    name: "Large Rotary Blades",
    nameEn: "Large Rotary Blades",
    nameCn: "大回旋刀片",
    slug: "large-rotary-blades",
    shortDescription: "Heavy-duty rotary cutting blades for high-volume processing",
    description: `Large rotary blades engineered for continuous, high-volume cutting operations in industrial processing lines. Manufactured from premium tool steel with advanced heat treatment for exceptional durability and cutting performance.

These heavy-duty rotary blades feature optimized cutting geometry and precision balance for smooth, vibration-free operation even at high speeds. The robust construction ensures extended service life and consistent cut quality in demanding industrial environments.

Perfect for paper mills, plastic processing, food packaging lines, and other applications requiring reliable, high-speed rotary cutting with minimal downtime.`,
    mainCategory: "blades",
    subCategory: "large-rotary-blades",
    image: "/images/products/product.webp",
    gallery: [
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
    ],
    specs: {
      material: "Cr12MoV, W18Cr4V, HSS (High-Speed Steel)",
      hardness: "60-64 HRC",
      dimensions: "Diameter: 100mm to 800mm (customizable)",
      thickness: "3mm to 20mm",
      tolerance: "±0.03mm",
      weight: "2kg to 25kg per piece",
      edgeAngle: "18° to 35°",
    },
    features: [
      "Heavy-duty construction for high-volume operations",
      "Precision-balanced for vibration-free rotation",
      "Extended service life (3-6 months typical)",
      "Sharp cutting edges with superior edge retention",
      "Custom diameters and bore sizes available",
      "Suitable for high-speed cutting applications",
      "Heat-treated for maximum durability",
    ],
    applications: [
      "Paper converting and slitting",
      "Plastic film slitting and cutting",
      "Food packaging and processing",
      "Textile cutting and trimming",
      "Rubber sheet cutting",
      "Foil and laminate processing",
    ],
    compatibleBrands: [
      "Universal fit for most rotary cutters",
      "Custom bore and mounting configurations",
    ],
    isFeatured: true,
    sortOrder: 2,
    seoTitle: "Large Rotary Blades Manufacturer | Heavy-Duty Cutting Blades - Sureay",
    seoDescription: "Industrial large rotary blades for high-volume processing. Precision-balanced, 60-64 HRC hardness, custom sizes available. Factory-direct from ISO certified manufacturer.",
  },

  {
    id: "shredder-blades-001",
    name: "Shredder Blades",
    nameEn: "Shredder Blades",
    nameCn: "撕碎机刀片",
    slug: "shredder-blades",
    shortDescription: "Heavy-duty shredder blades for waste recycling and material reduction",
    description: `Professional-grade shredder blades designed for single-shaft and multi-shaft shredding systems. Engineered to process challenging waste materials including plastics, tires, e-waste, wood, and municipal solid waste.

Our shredder blades feature aggressive cutting geometry optimized for high torque applications. Manufactured from premium alloy steel with advanced heat treatment, these blades deliver superior impact resistance and extended service life in the harshest operating conditions.

Ideal for waste management facilities, recycling operations, and material processing plants requiring reliable, high-performance shredding equipment.`,
    mainCategory: "blades",
    subCategory: "shredder-blades",
    image: "/images/products/product.webp",
    gallery: [
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
    ],
    specs: {
      material: "6CrW2Si, Cr12MoV, H13, W6Mo5Cr4V2",
      hardness: "58-62 HRC",
      dimensions: "35×35×23mm to 80×80×30mm (standard), custom available",
      thickness: "15mm to 40mm",
      tolerance: "±0.1mm",
      weight: "0.8kg to 12kg per piece",
    },
    features: [
      "Heavy-duty construction for demanding shredding applications",
      "Available for single-shaft and multi-shaft shredders",
      "Aggressive cutting geometry for high throughput",
      "Superior impact resistance and wear resistance",
      "Compatible with major shredder brands",
      "Custom sizes and mounting configurations",
      "Vacuum heat-treated for uniform hardness",
    ],
    applications: [
      "Plastic waste recycling",
      "Tire and rubber shredding",
      "E-waste processing",
      "Wood and biomass shredding",
      "Municipal solid waste (MSW)",
      "Industrial waste processing",
      "Textile waste recycling",
    ],
    compatibleBrands: [
      "WEIMA (WLK Series, C Series)",
      "SSI Shredding Systems",
      "Vecoplan (VAZ, VHZ Series)",
      "UNTHA Shredders",
      "Lindner Recyclingtech",
      "Hammel Recyclingtechnik",
    ],
    isFeatured: true,
    sortOrder: 3,
    seoTitle: "Shredder Blades Manufacturer | Single & Multi-Shaft Blades - Sureay",
    seoDescription: "Heavy-duty shredder blades for waste recycling. Compatible with WEIMA, SSI, Vecoplan. 58-62 HRC hardness, custom sizes. ISO certified manufacturing.",
  },

  {
    id: "tissue-paper-blades-001",
    name: "Tissue Paper Blades",
    nameEn: "Tissue Paper Blades",
    nameCn: "生活用纸刀片",
    slug: "tissue-paper-blades",
    shortDescription: "Precision cutting blades for tissue paper manufacturing",
    description: `Ultra-sharp, precision-ground blades specifically designed for tissue paper converting and cutting operations. These specialized blades deliver clean, burr-free cuts essential for high-quality tissue paper products.

Manufactured from premium tool steel with advanced grinding and polishing processes, our tissue paper blades maintain exceptional edge sharpness and cutting precision over extended production runs. The optimized blade geometry minimizes cutting force while maximizing cut quality.

Perfect for tissue paper mills, converting operations, and packaging lines producing facial tissues, toilet paper, paper towels, and other tissue products.`,
    mainCategory: "blades",
    subCategory: "tissue-paper-blades",
    image: "/images/products/product.webp",
    gallery: [
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
    ],
    specs: {
      material: "SKD-11, Cr12MoV, High Carbon Steel",
      hardness: "56-60 HRC",
      dimensions: "Length: 100mm to 1500mm (customizable)",
      thickness: "0.8mm to 5mm",
      tolerance: "±0.02mm (ultra-precision)",
      edgeAngle: "15° to 25° (ultra-sharp)",
      coating: "Optional: Chrome plating, TiN coating",
    },
    features: [
      "Ultra-sharp cutting edges for clean, burr-free cuts",
      "Precision ground to ±0.02mm tolerance",
      "Extended service life with minimal re-sharpening",
      "Custom lengths and configurations available",
      "Optimized for high-speed tissue converting",
      "Minimal cutting force for delicate materials",
      "Compatible with major tissue converting equipment",
    ],
    applications: [
      "Facial tissue production",
      "Toilet paper manufacturing",
      "Paper towel converting",
      "Napkin cutting and folding",
      "Kitchen roll production",
      "Medical tissue products",
    ],
    compatibleBrands: [
      "Universal fit for most tissue converting lines",
      "Custom configurations for specific machinery",
    ],
    isFeatured: true,
    sortOrder: 4,
    seoTitle: "Tissue Paper Blades Manufacturer | Precision Cutting Blades - Sureay",
    seoDescription: "Ultra-sharp tissue paper cutting blades. Precision ground, burr-free cuts, 56-60 HRC hardness. Custom lengths available. Factory-direct from ISO certified manufacturer.",
  },

  // ========================================
  // ADDITIONAL BLADE PRODUCTS
  // ========================================

  // Placeholder products - to be filled with actual content
  {
    id: "paper-cutting-blades-001",
    name: "Paper Cutting Blades",
    nameEn: "Paper Cutting Blades",
    nameCn: "切纸刀",
    slug: "paper-cutting-blades",
    shortDescription: "Precision blades for paper cutting and trimming operations",
    description: "Professional paper cutting blades for printing, converting, and finishing operations. (Content to be updated)",
    mainCategory: "blades",
    subCategory: "paper-cutting-blades",
    image: "/images/products/product.webp",
    specs: {
      material: "High Carbon Steel, SKD-11",
      hardness: "58-62 HRC",
    },
    features: ["Precision grinding", "Long service life", "Custom sizes available"],
    applications: ["Printing industry", "Paper converting", "Book binding"],
    isFeatured: false,
    sortOrder: 5,
  },

  {
    id: "production-line-blades-001",
    name: "Production Line Blades",
    nameEn: "Production Line Blades",
    nameCn: "联动线刀片",
    slug: "production-line-blades",
    shortDescription: "Industrial blades for automated production lines",
    description: "Specialized cutting blades for automated production and processing lines. (Content to be updated)",
    mainCategory: "blades",
    subCategory: "production-line-blades",
    image: "/images/products/product.webp",
    specs: {
      material: "Alloy Steel",
      hardness: "58-62 HRC",
    },
    features: ["Automated production compatible", "High durability", "Consistent performance"],
    applications: ["Automated manufacturing", "Assembly lines", "Packaging operations"],
    isFeatured: false,
    sortOrder: 6,
  },
];

/**
 * Get featured products (for homepage display)
 */
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/**
 * Get products by main category
 */
export function getProductsByMainCategory(category: "machinery" | "blades" | "molds"): Product[] {
  return products.filter(p => p.mainCategory === category).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

/**
 * Get products by sub-category
 */
export function getProductsBySubCategory(subCategory: string): Product[] {
  return products.filter(p => p.subCategory === subCategory);
}
