/**
 * Blade Data Structure - Source of Truth for BladeListPage and BladeDetail
 * Mirrors the machines.ts pattern for a consistent data-driven architecture.
 */

// ===== REUSED TYPES (shared structure with machines.ts) =====
export interface BladeSpec {
  label: string;
  value: string;
}

export interface BladeComponent {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface BladeApplicationItem {
  title: string;
  img: string;
}

export interface BladeSpecCategory {
  id: string;
  label: string;
  specs: Record<string, string>;
}

export interface BladeProcessItem {
  id: string;
  number: string;
  title: string;
  description?: string;
  image: string;
  size?: "large" | "small";
}

export interface BladeVideoConfig {
  url: string;
  poster?: string;
}

// ===== BLADE CATEGORY TYPES =====
export type BladeCategoryType =
  | "alloy_blades"
  | "rotary_blades"
  | "shredder_blades"
  | "tissue_paper_blades"
  | "paper_cutting_blades"
  | "granulator_blades"
  | "other_blades";

// ===== BLADE SECTOR TYPE (second filter axis, mirrors machines.ts `tonnage`) =====
export type BladeSectorType = "recycling" | "paper" | "converting" | "other";

// ===== MAIN BLADE INTERFACE =====
export interface Blade {
  // === Core Fields (List Page) ===
  id: string;
  name: string;
  fullName: string;
  category: BladeCategoryType;
  sector: BladeSectorType; // second filter axis, mirrors machines.ts `tonnage`
  categoryDisplay: string;
  image: string;
  badge?: string;
  badgeColor?: "green" | "blue" | "red" | "slate" | "purple" | "orange" | "teal";
  description: string;
  link: string;
  specs: BladeSpec[]; // 4 key specs for hero dashboard panel

  // === Detail Page Fields ===
  gallery?: string[];
  fullDescription?: string;
  features?: string[];
  video?: BladeVideoConfig;
  components?: BladeComponent[];
  applicationItems?: BladeApplicationItem[];
  specCategories?: BladeSpecCategory[];
  manufacturingProcess?: BladeProcessItem[];

  // === Meta ===
  relatedBladeIds?: string[];
  leadTime?: string;
  isFeatured?: boolean;
  catalogUrl?: string;
}

// ===== BLADE DATA =====
export const blades: Blade[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Alloy Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "alloy-blades",
    name: "Industrial Alloy Blades",
    fullName: "Premium Industrial Alloy Steel Cutting Blades",
    category: "alloy_blades",
    sector: "recycling",
    categoryDisplay: "Alloy Blades",
    image: "/images/products/blades/11-2-2_circular-blade_01.webp",
    badge: "Best Seller",
    badgeColor: "green",
    gallery: [
      "/images/products/blades/11-2-2_circular-blade_01.webp",
      "/images/products/blades/11-2-2_circular-blade_02.webp",
      "/images/products/blades/11-2-2_circular-blade_03.webp",
      "/images/products/blades/11-2-2_circular-blade_04.webp",
    ],
    description:
      "High-performance alloy steel blades for industrial cutting applications. Engineered for maximum wear resistance and edge retention.",
    fullDescription:
      "Our industrial alloy blades are precision-engineered cutting tools manufactured from premium high-grade tool steel alloys including 9CrSi, Cr12MoV, and W6Mo5Cr4V2. Designed for demanding industrial cutting operations that require superior wear resistance, edge retention, and cutting precision. Each blade undergoes advanced vacuum heat treatment to achieve optimal hardness (58–62 HRC) and dimensional stability. Ideal for recycling facilities, paper processing plants, plastic extrusion lines, and food processing operations requiring consistent, high-quality cuts over extended service periods.",
    link: "/products/blades/alloy-blades",
    isFeatured: true,

    specs: [
      { label: "Material", value: "9CrSi / Cr12MoV" },
      { label: "Hardness", value: "58 - 62 HRC" },
      { label: "Tolerance", value: "±0.05 mm" },
      { label: "Max Temp", value: "600 °C" },
    ],

    video: {
      url: "",
      poster: "/images/products/product.webp",
    },

    components: [
      {
        id: "vacuum-heat-treatment",
        tag: "HEAT TREATMENT",
        title: "Vacuum Heat Treatment Process",
        description:
          "Every blade undergoes a precisely controlled vacuum furnace cycle to achieve uniform hardness of 58–62 HRC throughout the entire cross-section, eliminating surface decarburization and ensuring consistent cutting performance from edge to bore.",
        image: "/images/products/product.webp",
      },
      {
        id: "cnc-profile-grinding",
        tag: "PRECISION GRINDING",
        title: "5-Axis CNC Profile Grinding",
        description:
          "Our advanced CNC grinding centers machine every blade face, edge angle, and bore to micro-level tolerances (±0.05mm). The result is a perfectly flat, burr-free cutting surface that maximizes contact efficiency and minimizes material degradation.",
        image: "/images/products/product.webp",
      },
      {
        id: "custom-steel-selection",
        tag: "MATERIAL SCIENCE",
        title: "Application-Specific Steel Selection",
        description:
          "We match the steel grade to your specific application. 9CrSi for cost-effective general cutting, Cr12MoV / SKD-11 for high-abrasion environments, and W6Mo5Cr4V2 (M2 HSS) for high-temperature applications — each delivering optimal toughness-hardness balance.",
        image: "/images/products/product.webp",
      },
      {
        id: "dimensional-inspection",
        tag: "QUALITY CONTROL",
        title: "Full Dimensional Inspection",
        description:
          "Each finished blade is measured on CMM (Coordinate Measuring Machine) against the drawing specification. Hardness spot-checks and edge geometry audits are performed before packing, guaranteeing zero defect delivery.",
        image: "/images/products/product.webp",
      },
    ],

    applicationItems: [
      { title: "Plastic Recycling & Extrusion", img: "/images/products/product.webp" },
      { title: "Paper & Pulp Processing", img: "/images/products/product.webp" },
      { title: "Rubber & Tire Cutting", img: "/images/products/product.webp" },
      { title: "Food Processing Lines", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "materials",
        label: "Material Options",
        specs: {
          "Standard Tool Steel": "9CrSi",
          "Cold Work Die Steel": "Cr12MoV (D2 / SKD-11)",
          "High-Speed Steel (HSS)": "W6Mo5Cr4V2 (M2)",
          "Coating Options": "TiN, TiCN, CrN (optional)",
          "Max Operating Temp": "Up to 600 °C",
        },
      },
      {
        id: "dimensions",
        label: "Dimensional Capabilities",
        specs: {
          "Blade Size Range": "40×40×25 mm to 150×150×35 mm",
          "Thickness Range": "5 mm - 35 mm",
          "Dimensional Tolerance": "±0.05 mm",
          "Hardness (Standard)": "58 - 62 HRC",
          "Weight per Piece": "0.5 kg - 8 kg",
          "Edge Angle": "20° - 45° (customizable)",
        },
      },
      {
        id: "compatibility",
        label: "Compatibility & Lead Time",
        specs: {
          "Compatible Equipment": "Major industrial cutters, granulators, shredders",
          "Custom Manufacturing": "Yes — supply drawings or physical samples",
          "MOQ": "1 piece (custom) / 10 pieces (standard)",
          "Standard Lead Time": "7 - 15 business days",
          "Certification": "ISO 9001:2015",
        },
      },
    ],

    manufacturingProcess: [
      {
        id: "alloy-qc-1",
        number: "01",
        title: "Raw Material Certification",
        description:
          "All incoming steel is verified against mill certificates. Spectrometer analysis confirms the alloy composition before production begins.",
        image: "/images/products/product.webp",
        size: "large",
      },
      {
        id: "alloy-qc-2",
        number: "02",
        title: "Vacuum Hardening",
        image: "/images/products/product.webp",
        size: "small",
      },
      {
        id: "alloy-qc-3",
        number: "03",
        title: "CMM Final Inspection",
        image: "/images/products/product.webp",
        size: "small",
      },
    ],

    features: [
      "Premium alloy steel (9CrSi, Cr12MoV, HSS) for maximum wear resistance",
      "Precision CNC machining with ±0.05mm tolerance",
      "Vacuum heat treatment for uniform 58–62 HRC hardness",
      "Custom dimensions and edge angles available",
      "Compatible with major industrial equipment brands",
      "ISO 9001:2015 certified manufacturing",
      "Optional TiN / TiCN coating for extended service life",
      "Factory-direct pricing with fast lead times",
    ],

    relatedBladeIds: ["rotary-cutter-blades", "shredder-blades"],
    leadTime: "7-15 business days",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Rotary Cutter Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rotary-cutter-blades",
    name: "Rotary Cutter Blades",
    fullName: "High-Performance Rotary Cutter & Slitter Knives",
    category: "rotary_blades",
    sector: "converting",
    categoryDisplay: "Rotary Blades",
    image: "/images/products/blades/12-4_rotary-cutter-blade_01.webp",
    badge: "High Precision",
    badgeColor: "blue",
    gallery: [
      "/images/products/blades/12-4_rotary-cutter-blade_01.webp",
      "/images/products/blades/12-4_rotary-cutter-blade_02.webp",
      "/images/products/blades/12-4_rotary-cutter-blade_0.webp",
      "/images/products/blades/11-6-4_metal-slitter-knife_01.webp",
    ],
    description:
      "Precision-ground rotary cutter blades manufactured from HSS and tungsten carbide for clean, continuous slitting and cutting operations.",
    fullDescription:
      "Our rotary cutter blades are engineered for high-speed, continuous cutting applications across the plastics, packaging, paper, and converting industries. Manufactured from premium grades of High-Speed Steel (HSS), D2 tool steel, and Tungsten Carbide, these circular knives offer exceptional wear resistance and razor-sharp edge retention. Advanced CNC grinding ensures strict concentricity and micro-level dimensional tolerances, preventing material tearing, minimizing dust generation, and significantly extending blade changeover intervals during high-volume production.",
    link: "/products/blades/rotary-cutter-blades",
    isFeatured: true,

    specs: [
      { label: "Material", value: "HSS / Carbide / D2" },
      { label: "Hardness", value: "HRC 60-64" },
      { label: "Thickness Tol.", value: "±0.002 mm" },
      { label: "Surface Finish", value: "Ra 0.4 Mirror" },
    ],

    video: {
      url: "",
      poster: "/images/products/product.webp",
    },

    components: [
      {
        id: "ultra-precision-grinding",
        tag: "MANUFACTURING EXCELLENCE",
        title: "Ultra-Precision CNC Grinding",
        description:
          "Utilizing advanced 5-axis CNC grinding centers, we achieve strict concentricity and parallelism. This guarantees zero runout during high-speed rotation, providing a flawless, clean cut without damaging the material.",
        image: "/images/products/product.webp",
      },
      {
        id: "cryogenic-treatment",
        tag: "HEAT TREATMENT",
        title: "Deep Cryogenic Processing",
        description:
          "Beyond standard vacuum heat treatment, our rotary blades undergo a deep cryogenic process (−196 °C) to completely eliminate retained austenite. This maximizes structural stability and drastically improves wear resistance against abrasive materials.",
        image: "/images/products/product.webp",
      },
      {
        id: "custom-edge-profiles",
        tag: "APPLICATION SPECIFIC",
        title: "Optimized Edge Geometries",
        description:
          "Whether you need a single bevel, double bevel, square edge, or a custom toothed profile, our engineering team optimizes the cutting angle based on your specific material thickness and tensile strength.",
        image: "/images/products/product.webp",
      },
      {
        id: "dynamic-balancing",
        tag: "QUALITY CONTROL",
        title: "Dynamic Balancing Test",
        description:
          "Every rotary blade is dynamically balanced to ensure vibration-free performance at rotation speeds exceeding 3,000 RPM, extending machine bearing life and guaranteeing cut quality.",
        image: "/images/products/product.webp",
      },
    ],

    applicationItems: [
      { title: "Plastic Film Slitting", img: "/images/products/product.webp" },
      { title: "Paper Converting", img: "/images/products/product.webp" },
      { title: "Rubber Processing", img: "/images/products/product.webp" },
      { title: "Textile & Non-Woven", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "specifications",
        label: "Dimensional Capabilities",
        specs: {
          "Outer Diameter (OD)": "20 mm - 1,200 mm",
          "Inner Diameter (ID)": "Custom machined to any shaft",
          "Thickness Range": "0.5 mm - 50 mm",
          "Concentricity Tolerance": "Within 0.01 mm",
          "Parallelism Tolerance": "Within 0.005 mm",
          "Thickness Tolerance": "±0.002 mm",
        },
      },
      {
        id: "materials",
        label: "Material Options",
        specs: {
          "Standard Tool Steel": "D2 (SKD-11), Cr12MoV, 52100",
          "High-Speed Steel": "M2 (SKH-51), M35, ASP2032",
          "Premium Grade": "Solid Tungsten Carbide (YG8, YG15)",
          "Coating Options": "TiN, TiCN, Teflon (friction reduction)",
          "Hardness Range": "HRC 60-64 / HRA 88-90 (carbide)",
        },
      },
      {
        id: "compatibility",
        label: "OEM Compatibility",
        specs: {
          "Supported Brands": "Kampf, Atlas, Dusenbery, Goebel, Tidland",
          "Custom Manufacturing": "100% produced per drawings or physical samples",
          "Delivery Time": "10 - 20 business days",
          "MOQ": "1 piece (custom) / 5 pieces (standard)",
        },
      },
    ],

    manufacturingProcess: [
      {
        id: "rotary-qc-1",
        number: "01",
        title: "Dynamic Balancing Test",
        description:
          "Every rotary blade is dynamically balanced to ensure vibration-free performance at rotation speeds exceeding 3,000 RPM.",
        image: "/images/products/product.webp",
        size: "large",
      },
      {
        id: "rotary-qc-2",
        number: "02",
        title: "Optical Edge Inspection",
        image: "/images/products/product.webp",
        size: "small",
      },
      {
        id: "rotary-qc-3",
        number: "03",
        title: "Laser Thickness Measurement",
        image: "/images/products/product.webp",
        size: "small",
      },
    ],

    relatedBladeIds: ["alloy-blades", "shredder-blades"],
    leadTime: "10-20 business days",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Shredder Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "shredder-blades",
    name: "Shredder Blades",
    fullName: "Heavy-Duty Single & Multi-Shaft Shredder Blades",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Shredder Blades",
    image: "/images/products/blades/11-4-2_metal-shear-blade_01.webp",
    badge: "Heavy Duty",
    badgeColor: "slate",
    gallery: [
      "/images/products/blades/11-4-2_metal-shear-blade_01.webp",
      "/images/products/blades/11-2-2_circular-blade_05.webp",
      "/images/products/blades/11-2-2_circular-blade_06.webp",
      "/images/products/blades/11-2-2_circular-blade_04.webp",
    ],
    description:
      "Professional-grade shredder blades for single-shaft and multi-shaft systems processing plastics, tires, e-waste, and MSW.",
    fullDescription:
      "Our heavy-duty shredder blades are engineered for single-shaft and multi-shaft shredding systems that process the most challenging waste materials — including rigid plastics, tires, e-waste, wood pallets, and municipal solid waste. Manufactured from premium grades like 6CrW2Si, Cr12MoV, and H13, each blade features an optimized aggressive cutting geometry designed for high-torque, low-speed applications. Advanced vacuum heat treatment achieves a balanced toughness-hardness profile (58–62 HRC), preventing premature chipping under sudden impact loads while maintaining a razor-sharp cutting edge over extended operating hours.",
    link: "/products/blades/shredder-blades",
    isFeatured: true,

    specs: [
      { label: "Material", value: "H13 / Cr12MoV / 6CrW2Si" },
      { label: "Hardness", value: "58 - 62 HRC" },
      { label: "Thickness", value: "15 mm - 40 mm" },
      { label: "Tolerance", value: "±0.1 mm" },
    ],

    video: {
      url: "",
      poster: "/images/products/product.webp",
    },

    components: [
      {
        id: "impact-resistant-steel",
        tag: "MATERIAL SELECTION",
        title: "Impact-Resistant Alloy Steel",
        description:
          "H13 hot-work tool steel and 6CrW2Si are selected for their superior toughness-hardness balance, preventing blade chipping under sudden high-impact loads — a critical requirement in shredding operations involving mixed, hard-to-predict waste streams.",
        image: "/images/products/product.webp",
      },
      {
        id: "aggressive-geometry",
        tag: "CUTTING GEOMETRY",
        title: "Aggressive Hook-Tooth Profile",
        description:
          "Our shredder blades feature a precisely engineered hook-tooth cutting profile that maximizes bite into tough materials while efficiently ejecting shredded fragments. This geometry significantly reduces power consumption and increases throughput at the same motor load.",
        image: "/images/products/product.webp",
      },
      {
        id: "multi-shaft-spacers",
        tag: "SYSTEM COMPATIBILITY",
        title: "Precision Spacer & Stack System",
        description:
          "Each shredder blade is machined to exact axial width tolerances, ensuring proper inter-blade clearance when assembled on multi-shaft rotor stacks. This precision stack assembly is critical for clean shear-cut action and prevention of material jamming.",
        image: "/images/products/product.webp",
      },
      {
        id: "re-sharpenable",
        tag: "LONG-TERM VALUE",
        title: "Re-Sharpenable Design",
        description:
          "Our shredder blades are designed with sufficient material allowance to be re-sharpened multiple times (typically 3–6 re-grinds per blade), dramatically reducing the total cost of ownership compared to non-resharpened alternatives.",
        image: "/images/products/product.webp",
      },
    ],

    applicationItems: [
      { title: "Plastic Waste Recycling", img: "/images/products/product.webp" },
      { title: "Tire & Rubber Shredding", img: "/images/products/product.webp" },
      { title: "E-Waste Processing", img: "/images/products/product.webp" },
      { title: "Municipal Solid Waste", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "performance",
        label: "Blade Specifications",
        specs: {
          "Standard Size Range": "35×35×23 mm to 80×80×30 mm",
          "Thickness Range": "15 mm - 40 mm",
          "Dimensional Tolerance": "±0.1 mm",
          "Unit Weight": "0.8 kg - 12 kg per piece",
          "Hardness": "58 - 62 HRC",
          "Available Profiles": "Hook-tooth, flat, custom toothed",
        },
      },
      {
        id: "materials",
        label: "Material & Heat Treatment",
        specs: {
          "Primary Grades": "H13 (hot-work), 6CrW2Si, Cr12MoV",
          "Heat Treatment": "Vacuum hardening + double tempering",
          "Impact Resistance": "High — optimized toughness-hardness balance",
          "Cryogenic Option": "Available for enhanced wear resistance",
        },
      },
      {
        id: "compatibility",
        label: "OEM Compatibility",
        specs: {
          "WEIMA": "WLK Series, C Series shredders",
          "SSI Shredding Systems": "Various models",
          "Vecoplan": "VAZ, VHZ Series",
          "UNTHA / Lindner / Hammel": "Supported — supply shaft drawing",
          "Custom Manufacturing": "Yes — per drawing or physical sample",
          "Lead Time": "10 - 20 business days",
        },
      },
    ],

    manufacturingProcess: [
      {
        id: "shredder-qc-1",
        number: "01",
        title: "Billet Forging & Annealing",
        description:
          "Blade blanks are forged from certified alloy billets and annealed to relieve internal stress before any machining begins, ensuring a stable, distortion-free final geometry.",
        image: "/images/products/product.webp",
        size: "large",
      },
      {
        id: "shredder-qc-2",
        number: "02",
        title: "CNC Tooth Profile Milling",
        image: "/images/products/product.webp",
        size: "small",
      },
      {
        id: "shredder-qc-3",
        number: "03",
        title: "Hardness & Impact Testing",
        image: "/images/products/product.webp",
        size: "small",
      },
    ],

    relatedBladeIds: ["alloy-blades", "granulator-blades"],
    leadTime: "10-20 business days",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Tissue Paper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tissue-log-saw-blades",
    name: "Tissue Log Saw Blades",
    fullName: "Ultra-Sharp Tissue Paper Converting & Cutting Blades",
    category: "tissue_paper_blades",
    sector: "paper",
    categoryDisplay: "Tissue Paper Blades",
    image: "/images/products/blades/tissue-log-saw-blades.webp",
    gallery: [
      "/images/products/blades/tissue-log-saw-blades.webp",
      "/images/products/blades/tissue-log-saw-blades.webp",
      "/images/products/blades/tissue-log-saw-blades.webp",
      "/images/products/blades/tissue-log-saw-blades.webp",
    ],
    description:
      "Premium Tissue Log Saw Blades for High-Speed Paper Converting",
    fullDescription:
      "Maximize converting line uptime with Sureay’s precision-engineered tissue log saw blades. Built for high-speed cutting of tissue, paper towels, and industrial rolls, they deliver exceptionally clean, dust-free cuts while drastically minimizing blade replacements.",
    link: "/products/blades/tissue-log-saw-blades",
    isFeatured: true,

    specs: [
      { label: "Material", value: "SKD-11 / Cr12MoV" },
      { label: "Hardness", value: "56 - 60 HRC" },
      { label: "Tolerance", value: "±0.02 mm" },
      { label: "Edge Angle", value: "15° - 25°" },
    ],

    video: {
      url: "",
      poster: "/images/products/product.webp",
    },

    components: [
      {
        id: "mirror-polish",
        tag: "SURFACE FINISH",
        title: "Mirror-Polish Grinding (Ra ≤ 0.4)",
        description:
          "A multi-stage lapping and polishing process achieves a mirror-like surface finish (Ra ≤ 0.4). This ultra-smooth surface drastically reduces paper fiber adhesion, minimizes dust generation, and allows the blade to glide through tissue webs without tearing.",
        image: "/images/products/product.webp",
      },
      {
        id: "shallow-bevel",
        tag: "EDGE GEOMETRY",
        title: "Optimized Shallow Bevel Angle",
        description:
          "Our tissue blades are ground to a shallow 15°–25° bevel that minimizes cutting force on delicate tissue webs. This geometry prevents fiber crushing and deformation, delivering a clean, straight cut edge that meets the strict quality standards of premium tissue brands.",
        image: "/images/products/product.webp",
      },
      {
        id: "chrome-coating",
        tag: "PROTECTIVE COATING",
        title: "Optional Chrome / TiN Coating",
        description:
          "For high-humidity paper mill environments, we offer an optional hard chrome or TiN coating that provides extra corrosion resistance and reduces surface friction—extending blade service intervals and protecting your converting line investment.",
        image: "/images/products/product.webp",
      },
    ],

    applicationItems: [
      { title: "Facial Tissue Production", img: "/images/products/product.webp" },
      { title: "Toilet Paper Manufacturing", img: "/images/products/product.webp" },
      { title: "Paper Towel Converting", img: "/images/products/product.webp" },
      { title: "Medical Tissue Products", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "dimensions",
        label: "Dimensional Capabilities",
        specs: {
          "Blade Length": "100 mm - 1,500 mm (customizable)",
          "Thickness Range": "0.8 mm - 5 mm",
          "Dimensional Tolerance": "±0.02 mm (ultra-precision)",
          "Surface Finish": "Ra ≤ 0.4 (mirror polished)",
          "Edge Angle": "15° - 25° (shallow bevel)",
        },
      },
      {
        id: "materials",
        label: "Material & Coating",
        specs: {
          "Standard Grade": "Cr12MoV (D2), SKD-11",
          "High-Carbon Option": "T10, 9CrSi",
          "Hardness": "56 - 60 HRC",
          "Optional Coating": "Hard Chrome, TiN, Teflon",
        },
      },
      {
        id: "compatibility",
        label: "Compatibility",
        specs: {
          "Converting Lines": "Universal fit for most tissue rewinders & log saws",
          "Custom Configurations": "Yes — supply drawings or machine model",
          "Lead Time": "7 - 15 business days",
          "Re-Sharpening": "Yes — accepted for re-grinding service",
        },
      },
    ],

    manufacturingProcess: [
      {
        id: "tissue-qc-1",
        number: "01",
        title: "Precision Surface Grinding",
        description:
          "Multi-pass surface grinding with dressing-corrected CBN wheels achieves flatness within 0.005mm and surface finish Ra ≤ 0.8 before the final polish stage.",
        image: "/images/products/product.webp",
        size: "large",
      },
      {
        id: "tissue-qc-2",
        number: "02",
        title: "Edge Bevel Lapping",
        image: "/images/products/product.webp",
        size: "small",
      },
      {
        id: "tissue-qc-3",
        number: "03",
        title: "Surface Profilometry Check",
        image: "/images/products/product.webp",
        size: "small",
      },
    ],

    relatedBladeIds: ["rotary-cutter-blades", "paper-cutting-blades"],
    leadTime: "7-15 business days",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Granulator Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "granulator-blades",
    name: "Granulator Blades",
    fullName: "High-Wear Granulator & Pelletizer Cutting Blades",
    category: "granulator_blades",
    sector: "recycling",
    categoryDisplay: "Granulator Blades",
    image: "/images/products/blades/11-2-2_circular-blade_05.webp",
    badge: "Wear Resistant",
    badgeColor: "orange",
    gallery: [
      "/images/products/blades/11-2-2_circular-blade_05.webp",
      "/images/products/blades/11-2-2_circular-blade_06.webp",
      "/images/products/blades/11-4-2_metal-shear-blade_01.webp",
      "/images/products/blades/11-2-2_circular-blade_03.webp",
    ],
    description:
      "Precision granulator blades for plastic granulating and pelletizing systems. Optimized profiles deliver clean granules and extended service life.",
    fullDescription:
      "Granulator blades are the consumable heart of any plastic recycling or pelletizing line. Our blades are engineered for granulators processing every type of polymer — from soft LDPE film to glass-filled PA66 — delivering clean, uniform granules with minimal fines generation. Manufactured from premium grades (SKD-11, H13, or Tungsten Carbide for highly abrasive fillers), each blade is CNC ground to tight tolerances and heat treated to a carefully balanced hardness profile. The result: longer cutting intervals, reduced energy consumption, and consistently on-spec granule output.",
    link: "/products/blades/granulator-blades",
    isFeatured: false,

    specs: [
      { label: "Material", value: "SKD-11 / H13 / WC" },
      { label: "Hardness", value: "58 - 64 HRC" },
      { label: "Tolerance", value: "±0.05 mm" },
      { label: "Profile", value: "Straight / V-Notch" },
    ],

    video: {
      url: "",
      poster: "/images/products/product.webp",
    },

    components: [
      {
        id: "straight-v-notch",
        tag: "BLADE PROFILES",
        title: "Straight & V-Notch Profiles",
        description:
          "We supply both straight-edge granulator blades for general-purpose polymer granulation, and V-notch (serrated) profiles for processing thick-walled parts and runners. Custom profiles are available from drawings or sample blades.",
        image: "/images/products/product.webp",
      },
      {
        id: "carbide-option",
        tag: "EXTREME WEAR RESISTANCE",
        title: "Tungsten Carbide Insert Option",
        description:
          "For granulating highly abrasive materials (glass-fiber, mineral-filled, or carbon-fiber composites), we offer blades with brazed or solid Tungsten Carbide cutting edges — providing 5–10× longer service life compared to standard tool steel.",
        image: "/images/products/product.webp",
      },
      {
        id: "precision-clearance",
        tag: "SYSTEM FIT",
        title: "Precision Bed Knife Clearance",
        description:
          "The cutting gap between the rotor blades and bed knife is a critical parameter affecting granule quality. Our blades are machined to the exact mounting geometry of your granulator model, ensuring optimal clearance and clean shear-cut action.",
        image: "/images/products/product.webp",
      },
    ],

    applicationItems: [
      { title: "Plastic Film & Bags", img: "/images/products/product.webp" },
      { title: "Injection Molding Runners", img: "/images/products/product.webp" },
      { title: "Hollow Blow Molding Scrap", img: "/images/products/product.webp" },
      { title: "Glass-Fiber Composites", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "performance",
        label: "Blade Specifications",
        specs: {
          "Standard Profiles": "Straight, V-Notch, Custom",
          "Dimensional Tolerance": "±0.05 mm",
          "Hardness (Tool Steel)": "58 - 62 HRC",
          "Hardness (Carbide)": "HRA 88 - 92",
          "Re-Sharpening Cycles": "Typically 3 - 6 times per blade",
        },
      },
      {
        id: "materials",
        label: "Material Options",
        specs: {
          "Standard Grade": "SKD-11 (D2), Cr12MoV",
          "Impact Grade": "H13 (hot-work die steel)",
          "Wear Grade": "Solid / Brazed Tungsten Carbide",
          "Surface Treatment": "Optional PVD coating for reduced friction",
        },
      },
      {
        id: "compatibility",
        label: "Compatibility",
        specs: {
          "Supported Brands": "Rapid, Zerma, Cumberland, Conair, Dreher",
          "Custom Fit": "Yes — supply model number or drawing",
          "Lead Time": "7 - 15 business days",
        },
      },
    ],

    manufacturingProcess: [
      {
        id: "gran-qc-1",
        number: "01",
        title: "Profile CNC Grinding",
        description:
          "Each blade is ground on a dedicated profile grinding center to exact tooth geometry, ensuring perfect stacking alignment on the rotor.",
        image: "/images/products/product.webp",
        size: "large",
      },
      {
        id: "gran-qc-2",
        number: "02",
        title: "Carbide Brazing (Optional)",
        image: "/images/products/product.webp",
        size: "small",
      },
      {
        id: "gran-qc-3",
        number: "03",
        title: "Clearance Fit Verification",
        image: "/images/products/product.webp",
        size: "small",
      },
    ],

    relatedBladeIds: ["shredder-blades", "alloy-blades"],
    leadTime: "7-15 business days",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Paper Cutting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "paper-cutting-blades",
    name: "Paper Cutting Blades",
    fullName: "Precision Paper Cutting & Guillotine Blades",
    category: "paper_cutting_blades",
    sector: "paper",
    categoryDisplay: "Paper Cutting Blades",
    image: "/images/products/blades/11-6-4_metal-slitter-knife_01.webp",
    badge: "Precision",
    badgeColor: "teal",
    gallery: [
      "/images/products/blades/11-6-4_metal-slitter-knife_01.webp",
      "/images/products/blades/11-6-2_metal-slitter-knife_01.webp",
      "/images/products/blades/11-4-2_metal-shear-blade_01.webp",
    ],
    description:
      "Professional paper cutting blades for printing, converting, and finishing operations. Precision-ground for clean, accurate cuts.",
    fullDescription:
      "Our paper cutting blades are manufactured for the printing and publishing industry, book binderies, and paper converting operations. Ground from high-carbon steel and chrome-vanadium alloys, these blades deliver the razor-sharp, durable cutting edge required for trimming reams, sheets, and stacked booklets without compression or tear.",
    link: "/products/blades/paper-cutting-blades",
    isFeatured: false,

    specs: [
      { label: "Material", value: "High Carbon / SKD-11" },
      { label: "Hardness", value: "58 - 62 HRC" },
      { label: "Bevel Angle", value: "Customizable" },
      { label: "Length", value: "Up to 1,500 mm" },
    ],

    components: [],
    applicationItems: [
      { title: "Printing Industry", img: "/images/products/product.webp" },
      { title: "Paper Converting", img: "/images/products/product.webp" },
      { title: "Book Binding", img: "/images/products/product.webp" },
      { title: "Carton Cutting", img: "/images/products/product.webp" },
    ],

    specCategories: [
      {
        id: "specifications",
        label: "Specifications",
        specs: {
          "Blade Length": "Up to 1,500 mm",
          "Material": "High Carbon Steel, SKD-11",
          "Hardness": "58 - 62 HRC",
          "Lead Time": "7 - 15 business days",
        },
      },
    ],

    manufacturingProcess: [],
    relatedBladeIds: ["tissue-log-saw-blades", "alloy-blades"],
    leadTime: "7-15 business days",
  },
];

// ───────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get a blade by ID
 */
export function getBladeById(id: string): Blade | undefined {
  return blades.find((b) => b.id === id);
}

/**
 * Get featured blades
 */
export function getFeaturedBlades(): Blade[] {
  return blades.filter((b) => b.isFeatured);
}

/**
 * Get related blades (by relatedBladeIds, then same category fallback)
 */
export function getRelatedBlades(currentId: string, limit = 4): Blade[] {
  const current = getBladeById(currentId);
  if (!current) return [];

  if (current.relatedBladeIds && current.relatedBladeIds.length > 0) {
    return current.relatedBladeIds
      .map((id) => getBladeById(id))
      .filter((b): b is Blade => !!b)
      .slice(0, limit);
  }

  return blades
    .filter((b) => b.category === current.category && b.id !== currentId)
    .slice(0, limit);
}

/**
 * Badge styling helper (mirrors machines.ts pattern)
 */
export const getBadgeClasses = (color?: string): string => {
  const base =
    "absolute top-4 left-4 z-10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border";
  switch (color) {
    case "green":
      return `${base} bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800`;
    case "blue":
      return `${base} bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800`;
    case "red":
      return `${base} bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800`;
    case "purple":
      return `${base} bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800`;
    case "orange":
      return `${base} bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800`;
    case "teal":
      return `${base} bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800`;
    case "slate":
    default:
      return `${base} bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700`;
  }
};
