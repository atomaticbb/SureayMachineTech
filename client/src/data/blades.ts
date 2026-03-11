/**
 * Blade Data Structure - Source of Truth for BladeListPage and BladeDetail
 */

// ===== SHARED TYPES =====

/** Key spec row shown in ProductCard and DecisiveSpecs table */
export interface BladeSpec {
  label: string;
  value: string;
}

/** Engineering Advantages card (TechnicalAudit) */
export interface BladeComponent {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

/** One row in the Common Standard Dimensions table (ComprehensiveData) */
export interface StandardDimension {
  spec?: string;       // Optional first column: e.g. "450 * 51 * 12/10"
  dimension?: string;  // Alternative to od: full dimension spec "L × W × T"
  od?: string;         // Outer Diameter (or Length for straight blades)
  bolt?: string;       // Alternative to id: bolt hole spec (e.g. "M12")
  id?: string;         // Inner Diameter / bore (or Width for straight blades)
  type?: string;       // Alternative to thickness: knife type
  thickness?: string;  // Blade thickness (circular/disc blades)
  length?: string;     // Blade length (shredder inserts) or Edge Thickness
  teeth?: string;      // Tooth count (shredder inserts) or Body Thickness
}

// ===== BLADE CATEGORY TYPES =====
export type BladeCategoryType =
  | "alloy_blades"
  | "rotary_blades"
  | "shredder_blades"
  | "tissue_paper_blades"
  | "paper_cutting_blades"
  | "granulator_blades"
  | "metal_cutting_blades"
  | "other_blades";

// ===== BLADE SECTOR TYPE (second filter axis, mirrors machines.ts `tonnage`) =====
export type BladeSectorType = "recycling" | "paper" | "converting" | "metal" | "other";

// ===== MAIN BLADE INTERFACE =====
export interface Blade {
  // ── List page (always present) ───────────────────────────────────────────
  id: string;
  name: string;
  fullName: string;
  category: BladeCategoryType;
  sector: BladeSectorType;
  categoryDisplay: string;
  image: string;
  description: string;
  link: string;
  specs: BladeSpec[];             // Key specs: ProductCard + DecisiveSpecs table

  // ── Optional list-page decorators ────────────────────────────────────────
  badge?: string;
  badgeColor?: "green" | "blue" | "red" | "slate" | "purple" | "orange" | "teal";

  // ── Detail page ──────────────────────────────────────────────────────────
  gallery?: string[];             // [0–3] thumbnail track · [4] DecisiveSpecs · [5] ComprehensiveData
  fullDescription?: string;       // PageMeta description (longer copy)
  features?: string[];            // BladeHero feature tag pills
  components?: BladeComponent[];  // TechnicalAudit cards
  standardDimensions?: StandardDimension[]; // ComprehensiveData table

  // ── Detail page table label overrides (for non-circular blades) ──────────
  dimensionLabels?: {
    col0?: string;   // optional first "Specification" column
    col1?: string;   // replaces "Outer Diameter (OD)"
    col2?: string;   // replaces "Inner Diameter (ID)"
    col3?: string;   // replaces "Thickness"
    col4?: string;   // replaces "Teeth" (length/teeth mode only)
    caption?: string; // replaces default table footnote
  };

  // ── Meta / utility ────────────────────────────────────────────────────────
  relatedBladeIds?: string[];
  isFeatured?: boolean;
  catalogUrl?: string;
}

// ===== BLADE DATA =====
export const blades: Blade[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Slitter Knives & Circular Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rotary-slitter-knives",
    name: "Rotary Slitter Knives",
    fullName: "Industrial Rotary Slitter Knives & Circular Slitting Blades",
    category: "rotary_blades",
    sector: "converting", // 
    categoryDisplay: "Rotary Slitter Knives",
    image: "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
    badge: "Best Seller",
    badgeColor: "green",
    gallery: [
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-00.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-02.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-03.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-04.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-02.webp", // DecisiveSpecs panel
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-04.webp", // ComprehensiveData panel - placeholder
    ],

    // Shortened for SEO Meta Description & UI Product Cards (< 155 chars)
    description:
      "Our circular rotary slitter knives are engineered for continuous, high-speed converting lines. Manufactured to strict ±0.02mm tolerances with ultra-smooth finishes, they ensure clean, dust-free shear and score cutting. Whether processing flexible packaging film, abrasive paper, metal foils, or non-wovens, we deliver customized metallurgy—from D2 to Solid Carbide—to maximize lifespan and minimize downtime.",

    // Structured for B2B reading flow and technical authority
    fullDescription:
      "Our industrial circular rotary slitter knives are engineered for continuous, high-speed converting lines. Manufactured to strict dimensional tolerances (±0.02mm) with ultra-smooth surface finishes, these blades ensure clean, dust-free shear and score cutting. Whether you are processing flexible packaging film, abrasive paper, metal foils, or non-wovens, we provide customized metallurgical solutions—from standard D2 tool steel to advanced powder metallurgy (PM) and Solid Carbide—to maximize your blade lifespan and minimize machine downtime.\n\n## Industrial Converting Applications\n\nOur circular rotary slitter knives are engineered for continuous-web converting processes, ensuring clean edges, minimal dust generation, and extended run times across a variety of cutting principles and materials.\n\n### By Cutting Method\n\n**Shear Slitting (Top & Bottom Knives):** The scissor action between male and female rotary knives creates a precise shearing cut. This method is ideal for paper, non-wovens, and light plastics, preventing edge deformation and eliminating dust. Proper tangential overlap and knife-to-knife clearance (typically 0.05–0.15 mm) are critical to achieve clean edge quality.\n\n**Crush/Score Cutting (Anvil Cutters):** A hardened circular blade compresses the web against a smooth or grooved rubber-covered anvil roll. This technique is widely used in pressure-sensitive tapes, multi-layer laminates, and flexible packaging where adhesive layers prevent clean shear slitting. The blade profile and anvil hardness are tailored to each substrate to avoid delamination or adhesive squeeze-out.\n\n**Razor Slitting (Single-Knife Trimming):** Ultra-sharp circular knives trim excess material at high speed, primarily used for edge trimming on extrusion lines, cast film, and nonwoven production. The blade is typically free-floating or lightly supported, relying on its extreme sharpness to minimize web tension and prevent edge curl.\n\n### By Material & Industry\n\n**Paper:** Tissue paper, kraft paper, newsprint, coated paper, board stock—our blades deliver clean, dust-free edges essential for high-quality printing and packaging.\n\n**Flexible Plastics:** BOPP, BOPET, cast polypropylene, stretch films, shrink films. Precision-ground knives prevent static cling and edge curl caused by heat buildup.\n\n**Metal Foils:** Aluminum foil, copper foil, battery electrode foils. Solid carbide or powder metallurgy blades are required to resist the extreme abrasiveness and maintain tight tolerances.\n\n**Non-Wovens:** Spunbond, meltblown, medical fabrics, filter media. Specialized edge geometries prevent fiber fraying and material pilling during slitting.\n\n**Tapes & Labels:** Masking tape, duct tape, double-sided adhesive, label stock. Anti-stick coatings (Teflon, DLC) eliminate adhesive buildup, ensuring consistent slit width and reducing cleaning frequency.",
    link: "/products/rotary-slitter-knives",
    isFeatured: true,

    specs: [
      { label: "Material", value: "52100, D2, M2 (HSS), ASP23/ASP52 (PM), Solid Carbide" },
      { label: "Cutting Styles",  value: "Shear Slitting, Score/Crush Cutting, Razor Slitting" },
      { label: "Surface Finish",  value: "Precision ground to Ra 0.2 - 0.4" },
      { label: "Tolerance",       value: "Thickness: ±0.002mm | Runout: ≤0.02mm" },
      { label: "Coatings",        value: "TiN, DLC, Teflon, CrAl (Optional for friction reduction)" },
      { label: "Application",     value: "Paper & Corrugated Packaging, Flexible Plastics & Films, Metal Foils (Battery & Packaging), Non-Wovens & Textiles, Tapes & Labels" },
      ],

    features: [
      "Ultra-precision thickness and runout tolerances (±0.002mm) to prevent blade wobble at high RPMs.",
      "Customized metallurgy (D2 to Solid Carbide) tailored to match the abrasiveness of your specific web material.",
      "Advanced surface coatings (TiN, DLC) available to eliminate adhesive build-up and reduce cutting friction.",
    ],

    components: [
      {
        id: "multi-material-compatibility",
        tag: "METALLURGY",
        title: "Application-Specific Tool Steels",
        description:
          "We don't believe in 'one-size-fits-all'. We match the blade material to your web. Choose high-carbon steels for standard paper, M2 High-Speed Steel for tough plastics, or Solid Carbide for highly abrasive metal foils and fiberglass.",
        image: "/images/products/blades/11-2-2_circular-blade_01.webp",
      },
      {
        id: "advanced-coating-systems",
        tag: "EDGE RETENTION",
        title: "Advanced Surface Treatments",
        description:
          "For converting sticky tapes, adhesives, or high-friction films, our optional TiN, DLC, and Teflon coatings dramatically reduce web drag, prevent material build-up on the blade bevel, and extend the MTBR (Mean Time Between Replacements).",
        image: "/images/products/blades/11-2-2_circular-blade_02.webp",
      },
      {
        id: "five-cutting-applications",
        tag: "PROCESS CAPABILITY",
        title: "Optimized Edge Geometries",
        description:
          "Available in various edge profiles (single bevel, double bevel, blunt edge) engineered specifically for shear slitting (top/bottom knives), crush/score cutting against hardened anvils, or high-speed rewinder trimming.",
        image: "/images/products/blades/11-2-2_circular-blade_03.webp",
      },
    ],

    // ADDED: Crucial dimensional structure for circular blades (4-column layout)
    dimensionLabels: {
      col0: "Blade Type",
      col1: "Outer Diameter",
      col2: "Inner Diameter",
      col3: "Thickness",
      caption: "* Standard dimensions for shear slitting pairs. Top blades (dished) and bottom blades (multi-groove anvils) work together for precision shear cutting. Custom OD/ID and groove configurations available upon request.",
    },

    standardDimensions: [
      // Top Blade (Dished)
      { spec: "Top Blade (Dished)", od: "75 mm", id: "45 mm", thickness: "1.0 / 1.2 mm" },
      { spec: "Top Blade (Dished)", od: "100 mm", id: "35 mm", thickness: "1.2 mm" },
      { spec: "Top Blade (Dished)", od: "118 mm", id: "80 mm", thickness: "1.2 mm" },
      { spec: "Top Blade (Dished)", od: "150 mm", id: "80 mm", thickness: "2.5 mm" },

      // Bottom Blade (Anvil)
      { spec: "Bottom Blade (Anvil)", od: "70 mm", id: "45 mm", thickness: "10 / 8 mm" },
      { spec: "Bottom Blade (Anvil)", od: "80 mm", id: "60 mm", thickness: "20 / 16 mm" },
      { spec: "Bottom Blade (Anvil)", od: "100 mm", id: "70 mm", thickness: "20 / 16 mm" },
      { spec: "Bottom Blade (Anvil)", od: "108 mm", id: "80 mm", thickness: "20 / 18 mm" },
    ],

    relatedBladeIds: ["shredder-blades", "paper-cutting-blades"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Shredder Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "shredder-blades",
    name: "Shredder Blades",
    fullName: "Premium D2/DC53 Concave Shredder Inserts for Plastic Recycling",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades-04.webp",
    gallery: [
      "/images/products/shredder-blades/shredder-blades-04.webp",
      "/images/products/shredder-blades/shredder-blades-01.webp",
      "/images/products/shredder-blades/shredder-blades-02.webp",
      "/images/products/shredder-blades/shredder-blades-03.webp",
      "/images/products/shredder-blades/double-shaft-shredder-blade-00.webp",
      "/images/products/shredder-blades/four-shaft-shredder-blade-00.webp", // ComprehensiveData panel - placeholder
    ],
    description:
      "Sureay Shredder Blades represent the pinnacle of heavy-duty reduction, engineered for extreme durability and high-torque impact resistance. Through advanced CNC machining and specialized heat treatment, we achieve a robust, frictionless edge that glides through bulk plastic waste with zero resistance. This optimized geometry prevents overheating, minimizes downtime, and extends service life. Partner with Sureay for exact-match OEM shredder solutions that guarantee continuous, peak performance.",
    fullDescription:
      "Industrial-grade square and concave shredder inserts designed for single and multi-shaft shredding systems. Engineered to handle contaminated plastics, pipes, and bulky waste while providing four-way indexable life cycles to minimize operational costs.",
    link: "/products/shredder-blades",
    isFeatured: true,

    specs: [
      { label: "Material",            value: "D2 (1.2379), DC53, 42CrMo" },
      { label: "Hardness",            value: "52 - 58 HRC" },
      { label: "Face Profile",        value: "Concave / Flat / Four-Corner" },
      { label: "Compatibility",       value: "Vecoplan, Weima, Untha, Lindner" },
      { label: "Counter-bore",        value: "Precision Milled for M12/M16/M20" },
      { label: "Tolerance",           value: "±0.05 mm" },
      { label: "Surface Treatment",   value: "Shot-peened / Optional Coating" },
      { label: "Application",         value: "Primary reduction of bulk plastic/pipes" },
    ],

    components: [
      {
        id: "indexable-rotation",
        tag: "EFFICIENCY",
        title: "4-Way Indexable Rotation",
        description:
          "Square geometry allows for 90° rotation to a fresh cutting edge. Effectively quadruples the lifespan per blade compared to non-indexable alternatives.",
        image: "/images/products/shredder-blades/shredder-blades-01.webp",
      },
      {
        id: "concave-shear",
        tag: "GEOMETRY",
        title: "Self-Centering Concave Face",
        description:
          "The concave surface creates a superior shearing action, reducing the heat generated during high-torque processing and preventing material melting.",
        image: "/images/products/shredder-blades/shredder-blades-02.webp",
      },
      {
        id: "impact-alloy",
        tag: "METALLURGY",
        title: "High-Torque Alloy Base",
        description:
          "Utilizes 42CrMo or D2 tool steel to absorb extreme shock loads. Prevents blade cracking when processing contaminated or metal-inclusive waste.",
        image: "/images/products/shredder-blades/shredder-blades-03.webp",
      },
    ],

    dimensionLabels: {
      col0: "Shredder Model",
      col1: "Blade Outer Diameter",
      col2: "Hex Socket",
      col3: "Blade Thickness",
      col4: "Blade Spacer Outer Diameter",
      caption: "* Standard dimensions for multi-shaft shredder systems. All measurements in millimeters (mm). Compatible with Vecoplan, Weima, Untha, Lindner. Custom configurations available.",
    },

    standardDimensions: [
      // 200 Series
      { spec: "200", od: "Φ150", id: "70", length: "12", teeth: "110" },
      { spec: "200", od: "Φ150", id: "70", length: "15", teeth: "110" },

      // 300 Series
      { spec: "300", od: "Φ180", id: "80", length: "15", teeth: "120" },
      { spec: "300", od: "Φ180", id: "80", length: "20", teeth: "130" },

      // 400 Series
      { spec: "400", od: "Φ180", id: "90", length: "10", teeth: "150" },
      { spec: "400", od: "Φ180", id: "90", length: "15", teeth: "150" },

      // 500 Series
      { spec: "500", od: "Φ200", id: "90", length: "10", teeth: "150" },
      { spec: "500", od: "Φ200", id: "90", length: "20", teeth: "150" },
      { spec: "500", od: "Φ200", id: "90", length: "15", teeth: "150" },

      // 600 Series
      { spec: "600", od: "Φ200", id: "140", length: "20", teeth: "180" },

      // 800 Series
      { spec: "800", od: "Φ250", id: "160", length: "25", teeth: "220" },

      // 1000 Series
      { spec: "1000", od: "Φ300", id: "180", length: "30", teeth: "250" },
      { spec: "1000", od: "Φ300", id: "180", length: "30", teeth: "250" },

      // 1200 Series
      { spec: "1200", od: "Φ350", id: "200", length: "40", teeth: "300" },
      { spec: "1200", od: "Φ350", id: "220", length: "30", teeth: "320" },

      // 1500 Series
      { spec: "1500", od: "Φ400", id: "220", length: "40", teeth: "350" },
      { spec: "1500", od: "Φ400", id: "240", length: "50", teeth: "380" },

      // 2000 Series
      { spec: "2000", od: "Φ450", id: "260", length: "30", teeth: "400" },
      { spec: "2000", od: "Φ500", id: "280", length: "50", teeth: "420" },
      { spec: "2000", od: "Φ700", id: "360", length: "60", teeth: "520" },
    ],

    relatedBladeIds: ["granulator-blades", "rotary-slitter-knives"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Tissue Paper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tissue-log-saw-blades",
    name: "Tissue Log Saw Blades",
    fullName: "D2 Ø610 Log Saw Blade For Tissue Paper Cutting",
    category: "tissue_paper_blades",
    sector: "paper",
    categoryDisplay: "Tissue Paper Blades",
    image: "/images/products/blades/tissue-log-saw-blades.webp",
    gallery: [
      "/images/products/blades/tissue-log-saw-blades.webp",
      "/images/products/blades/tissue-log-saw-blades-03.webp",
      "/images/products/blades/tissue-log-saw-blades-02.webp",
      "/images/products/blades/tissue-log-saw-blades-01.webp",
      "/images/products/blades/tissue-log-saw-blades-00.webp",
      "/images/products/product.webp", // ComprehensiveData panel - placeholder
    ],
    description:
      "Sureay Log Saw Blades represent the pinnacle of precision for global tissue converting, engineered for extreme durability and flawless edge retention. Through advanced CNC micro-grinding and in-house vacuum heat treatment, we achieve a razor-sharp, frictionless edge that glides through tissue webs with zero resistance. This optimized geometry prevents fiber crushing, minimizes dust, and extends service life. Partner with Sureay for exact-match OEM cutting solutions that guarantee continuous, peak performance.",
    fullDescription:
      "Maximize converting line uptime with Sureay’s precision-engineered tissue log saw blades. Built for high-speed cutting of tissue, paper towels, and industrial rolls, they deliver exceptionally clean, dust-free cuts while drastically minimizing blade replacements.",
    link: "/products/tissue-log-saw-blades",
    isFeatured: true,

    specs: [
      { label: "Material",            value: "D2, M2, HSS" },
      { label: "Size (OD)",           value: "Max Ø 1200 mm" },
      { label: "Lateral Run-out",     value: "Max 0.15 mm" },
      { label: "Edge Run-out",        value: "Max 0.10 mm" },
      { label: "Parallelism",         value: "0.05 mm" },
      { label: "Concentricity",       value: "0.30 mm" },
      { label: "Verticalness",        value: "0.05 mm" },
      { label: "Inner Hole Size (ID)", value: "Ø 68.26 mm (+0.05 mm)" },
      { label: "Application",         value: "Log saw machines (Tissue/Paper)" },
    ],

    components: [
      {
        id: "mirror-polish",
        tag: "SURFACE FINISH",
        title: "Mirror-Polish Grinding (Ra ≤ 0.4)",
        description:
          "Reduces paper fiber adhesion and minimizes dust generation. Glides effortlessly through tissue webs without tearing.",
        image: "/images/products/product.webp",
      },
      {
        id: "shallow-bevel",
        tag: "EDGE GEOMETRY",
        title: "Shallow Bevel Angle (15°–25°)",
        description:
          "Minimizes cutting force to prevent fiber crushing. Delivers a clean, straight edge that meets premium brand standards.",
        image: "/images/products/product.webp",
      },
      {
        id: "chrome-coating",
        tag: "PROTECTIVE COATING",
        title: "Optional Chrome / TiN Coating",
        description:
          "Provides corrosion resistance for high-humidity paper mills. Reduces surface friction to significantly extend blade service life.",
        image: "/images/products/product.webp",
      },
    ],

    standardDimensions: [
      { od: "Ø 610 mm",  id: "Ø 68.26 mm", thickness: "4.76 mm" },
      { od: "Ø 610 mm",  id: "Ø 68.26 mm", thickness: "3.80 mm" },
      { od: "Ø 610 mm",  id: "Ø 82.55 mm", thickness: "4.76 mm" },
      { od: "Ø 610 mm",  id: "Ø 82.55 mm", thickness: "3.80 mm" },
      { od: "Ø 680 mm",  id: "Ø 68.26 mm", thickness: "3.80 mm" },
      { od: "Ø 870 mm",  id: "Ø 60.00 mm", thickness: "6.00 mm" },
      { od: "Ø 1000 mm", id: "Ø 60.00 mm", thickness: "6.00 mm" },
    ],

    relatedBladeIds: ["shredder-blades", "paper-cutting-blades"],
  },

  

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Granulator blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "granulator-blades",
    name: "Granulator Blades",
    fullName: "Industrial Plastic Crusher & Granulator Knives for PET, PVC & PP Recycling",
    category: "granulator_blades",
    sector: "recycling",
    categoryDisplay: "Granulator Blades",
    image: "/images/products/granulator-blades/granulator-blades-01.webp",
    gallery: [
      "/images/products/granulator-blades/granulator-blades-01.webp",
      "/images/products/granulator-blades/granulator-blades-00.webp",
      "/images/products/granulator-blades/granulator-blades-02.webp",
      "/images/products/granulator-blades/granulator-blades-04.webp",
      "/images/products/granulator-blades/granulator-blades-03.webp",
      "/images/products/granulator-blades/granulator-blades-05.webp",
    ],
    description:
      "Engineered for high-throughput plastic recycling, our crusher and granulator knives deliver aggressive, clean shearing for PET bottles, PVC pipes, and PP scraps. Manufactured from premium wear-resistant tool steel and subjected to strict vacuum heat treatment, these blades maintain exceptional sharpness to maximize crushing efficiency while minimizing plastic dust and fines. Built to withstand high-impact loads, they significantly reduce blade-change downtime. Available in standard OEM dimensions or custom-manufactured to your specific shredder requirements.",
    fullDescription:
      "Engineered for high-impact size reduction of post-consumer and industrial plastics. These blades deliver superior wear resistance and clean granulation, drastically reducing fines and energy consumption in heavy-duty recycling lines.",
    link: "/products/granulator-blades",
    isFeatured: true,

    specs: [
      { label: "Material",          value: "D2, SKD-11, DC53,Cr12MoV" },
      { label: "Hardness",          value: "58 - 62 HRC" },
      { label: "Bolt-hole Tolerance", value: "±0.02 mm" },
      { label: "Flatness",          value: "0.05 mm" },
      { label: "Parallelism",       value: "0.03 mm" },
      { label: "Bevel Angle",       value: "30° - 55° (Customizable)" },
      { label: "Heat Treatment",    value: "Vacuum Hardening + Cryogenic Processing" },
      { label: "Application",       value: "PET, PVC & PP Recycling, Heavy-Duty Scraps" },
      { label: "Match Machines",    value: "Cumberland, Amacoil, Alpine, Conair/Wortex, Ganutec, Foremost, Nelmor, Mitts & Merrill, Rapid, Hydreclaim, Herbold, Pallman, Dreher, Buss-Condux, IMS, Ramco (R&M), Entoletor and many others" },
    ],

    features: [
      "Premium tool steel (D2, SKD-11, HSS, Cr12MoV) for high-impact polymer shearing",
      "Vacuum heat treatment + deep cryogenic processing (HRC 58–62 hardness + impact toughness)",
      "Precision CNC-ground edges with ±0.02 mm tolerances for strict rotor-to-bed knife gaps",
    ],

    components: [
      {
        id: "maximized-regrind-quality",
        tag: "QUALITY",
        title: "Maximized Regrind Quality",
        description:
          "Ultra-sharp, precisely aligned cutting edges shear plastic cleanly rather than tearing it, drastically reducing the generation of unwanted dust and fines.",
        image: "/images/products/granulator-blades/granulator-blades-01.webp",
      },
      {
        id: "extended-mtbr",
        tag: "RELIABILITY",
        title: "Extended MTBR (Mean Time Between Replacements)",
        description:
          "High wear resistance minimizes the frequency of blade sharpening and replacement, keeping your recycling line running continuously.",
        image: "/images/products/granulator-blades/granulator-blades-00.webp",
      },
      {
        id: "reduced-motor-load",
        tag: "EFFICIENCY",
        title: "Reduced Motor Load",
        description:
          "Optimized cutting angles decrease the shearing force required, lowering the electrical amp draw on your granulator's motor and reducing energy costs per ton.",
        image: "/images/products/granulator-blades/granulator-blades-02.webp",
      },
    ],

    dimensionLabels: {
      col0: "Specification",
      col1: "Dimension (L × W × T)",
      col2: "Pitch",
      caption: "* Standard dimensions for rotor and stator knives. Sizes shown in millimeters (mm). Custom dimensions available for all major granulator brands.",
    },

    standardDimensions: [
      // Double hole
      { spec: "Double hole", od: "90 × 60 × 8", id: "50" },
      { spec: "Double hole", od: "90 × 70 × 8", id: "40 / 45 / 50" },
      { spec: "Double hole", od: "100 × 70 × 8", id: "45 / 50" },
      { spec: "Double hole", od: "120 × 70 × 8", id: "60" },

      // Triple hole
      { spec: "Triple hole", od: "126 × 60 × 8", id: "40" },
      { spec: "Triple hole", od: "140 × 60 × 8", id: "40" },
      { spec: "Triple hole", od: "150 × 70 × 8", id: "50 / 55" },
      { spec: "Triple hole", od: "160 × 70 × 8", id: "45" },
      { spec: "Triple hole", od: "170 × 70 × 8", id: "45" },
      { spec: "Triple hole", od: "180 × 70 × 8", id: "60" },

      // Quadra hole
      { spec: "Quadra hole", od: "170 × 70 × 8", id: "40" },
      { spec: "Quadra hole", od: "200 × 70 × 8", id: "50" },
    ],

    relatedBladeIds: ["shredder-blades", "rotary-slitter-knives"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Paper Cutting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "paper-cutting-blades",
    name: "Paper Cutting Blades",
    fullName: "Precision Paper Cutting & Guillotine Blades",
    category: "paper_cutting_blades",
    sector: "paper",
    categoryDisplay: "Paper Cutting Blades",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
    badge: "Precision",
    badgeColor: "teal",
    gallery: [
      "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-01.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-02.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-03.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-04.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-05.webp", 
    ],
    description:
      "Engineered for heavy-duty industrial shredding and recycling, our high-performance HSS blades feature exceptional \"red hardness,\" maintaining HRC 62 at up to 500°C for continuous, burr-free shearing. Processed via vacuum heat treatment and precision CNC machining, they guarantee strict ±0.02mm tolerances and a lifespan 4 to 6 times longer than standard tool steel. Whether you need fully-stocked sizes for immediate dispatch or rapid custom manufacturing from your drawings, our factory provides reliable cutting solutions tailored to your specific equipment.",
    fullDescription:
      "A guillotine paper cutter replacement blade is fundamental to maintaining cutting precision and operational efficiency. Unlike generic spare parts, these specialized blades directly influence finish quality, productivity, and total cost of ownership. Dull or worn blades result in ragged edges, increased dust, and unnecessary mechanical stress. Timely replacement not only restores performance but also protects your cutter from premature wear. These blades serve a wide range of sectors, including commercial printing, book publishing, packaging production, and corporate office environments. Every application demands a blade that delivers clean, accurate, and reliable cuts.",
    link: "/products/paper-cutting-blades",
    isFeatured: false,

    specs: [
      { label: "Material",      value: "HSS: M2, SKH-9, SKH-51, SKH-13 / Carbide: YG15, YG20" },
      { label: "Hardness",      value: "Up to 62 HRC (stable at 500 °C)" },
      { label: "Process",       value: "Nitrogen Furnace Inlaying + Precision Grinding" },
      { label: "Lifespan",      value: "4 – 6× longer than standard tool steel" },
      { label: "Edge Angle",    value: "21°" },
      { label: "Options",       value: "Sharp edge / Semi-finished edge / Blank knife" },
      { label: "Tolerance",     value: "L: +2/−1 mm | W: ±1 mm | T: 0/−0.1 mm" },
      { label: "Application",   value: "Sealing, cross-cutting, die-cutting, packaging, shearing" },
    ],

    features: [
      "Advanced steel formulations: HSS, standard steel, and TCT inlay optimized for edge retention",
      "Precision-ground cutting edge for smooth, tear-free cuts across the full blade length",
      "Extended operational life — reduced resharpening frequency lowers maintenance costs",
      "Exact manufacturer fit — installs seamlessly into original equipment without modification",
      "Ready-to-use blades designed for safe, simplified replacement procedures",
      "Covers commercial printing, book publishing, packaging, and office environments",
    ],

    components: [
      {
        id: "precision-cutting-performance",
        tag: "PERFORMANCE",
        title: "Precision Cutting Performance",
        description:
          "Our guillotine paper cutter replacement blades are manufactured to deliver consistently clean and accurate cuts. Ideal for printing shops and binding facilities, they ensure professional results with every operation while reducing paper dust and jagged edges.",
        image: "/images/products/paper-cutting-blades/paper-cutting-blades-01.webp",
      },
      {
        id: "enhanced-durability",
        tag: "DURABILITY",
        title: "Enhanced Durability & Longevity",
        description:
          "Crafted from high-grade steel alloys, these replacement blades maintain their sharpness longer than standard options. This extended service life means fewer blade changes and lower long-term operational costs for your business.",
        image: "/images/products/paper-cutting-blades/paper-cutting-blades-02.webp",
      },
      {
        id: "wide-machine-compatibility",
        tag: "COMPATIBILITY",
        title: "Wide Machine Compatibility",
        description:
          "Designed to meet original equipment specifications, these replacement blades fit most popular guillotine cutter brands and models. They install easily, minimizing downtime and ensuring seamless integration into your workflow.",
        image: "/images/products/paper-cutting-blades/paper-cutting-blades-03.webp",
      },
    ],

    dimensionLabels: {
      col0: "Specification (mm)",
      col1: "Length",
      col2: "Width",
      col3: "Edge Thickness",
      col4: "Body Thickness",
      caption: "* Standard sizes listed above. Custom dimensions available on request.",
    },

    standardDimensions: [
      { spec: "450 * 51 * 12/10",       od: "450",  id: "51", length: "12",   teeth: "10" },
      { spec: "595 * 55 * 13.5/10",     od: "595",  id: "55", length: "13.5", teeth: "10" },
      { spec: "795 * 60 * 13.5/10",     od: "795",  id: "60", length: "13.5", teeth: "10" },
      { spec: "895 * 60 * 13.5/10",     od: "895",  id: "60", length: "13.5", teeth: "10" },
      { spec: "995 * 60 * 14/11",       od: "995",  id: "60", length: "14",   teeth: "11" },
      { spec: "1095 * 65 * 14/11",      od: "1095", id: "65", length: "14",   teeth: "11" },
      { spec: "1350 * 80 * 16/13",      od: "1350", id: "80", length: "16",   teeth: "13" },
      { spec: "2050 * 85 * 16/14",      od: "2050", id: "85", length: "16",   teeth: "14" },
    ],

    relatedBladeIds: ["tissue-log-saw-blades", "paper-cutting-blades"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Single Shaft Shredder Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "single-shaft-shredder-blades",
    name: "Single Shaft Shredder Blades",
    fullName: "High-Impact Single Shaft Shredder Rotor Knives (Square / Crown Cutters)",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Single Shaft Shredder Blades",
    image: "/images/products/shredder-blades/single-shredder-blades-05.webp",
    badge: "Heavy Duty",
    badgeColor: "orange",
    gallery: [
      "/images/products/shredder-blades/single-shredder-blades-05.webp",
      "/images/products/shredder-blades/single-shredder-blades-00.webp",
      "/images/products/shredder-blades/single-shredder-blades-01.webp",
      "/images/products/shredder-blades/single-shredder-blades-02.webp",
      "/images/products/shredder-blades/single-shredder-blades-03.webp",
      "/images/products/shredder-blades/single-shredder-blades-04.webp",
    ],
    // Shortened for SEO Meta Description & UI Product Cards (< 160 chars)
    description:
      "Forged from premium cold-work tool steels (DC53, D2, Cr12MoV), our single-shaft shredder rotor knives balance extreme wear resistance with high-impact toughness for heavy volume reduction. Engineered for low-speed, high-torque rotors, these four-edge block knives excel in primary shredding of heavy plastics, wood, biomass, and MSW. The symmetrical square design enables 90° rotation for four usable edges, cutting replacement costs by 75% and drastically reducing downtime.",
    
    // Rewritten for better reading flow on the actual product page
    fullDescription:
      "Our single-shaft shredder rotor knives are forged from premium cold-work tool steels, specifically selected to balance extreme wear resistance with the high-impact toughness required for heavy volume reduction. Engineered for low-speed, high-torque rotors, these heavy-duty block knives excel in processing dense, bulky materials. They easily handle thick die-face purgings, massive extrusion lumps, heavy-walled PVC/HDPE pipes, as well as hardwood timber, Municipal Solid Waste (MSW), and light electronic waste.",
    link: "/products/single-shaft-shredder-blades",
    isFeatured: true,

    specs: [
      { label: "Material",        value: "DC53, D2 (1.2379), Cr12MoV" },
      { label: "Hardness",        value: "HRC 58-62" },
      { label: "Tolerance",       value: "±0.02mm" }, // Added for technical trust
      { label: "Heat Treatment",  value: "Vacuum heat treatment + deep cryogenic" },
      { label: "Bolt Hole",       value: "M12 to M24 (countersunk)" },
      { label: "Edge Design",     value: "Four usable edges (90° rotation)" },
      { label: "Profile",         value: "Concave / Flat" },
      { label: "Application",     value: "Heavy Plastics, Wood & Biomass, Waste & Recycling" },
      { label: "Match Machines",  value: "Vecoplan, Weima, Lindner, Zerma" },
    ],

    features: [
      "Four usable cutting edges — rotate 90° when dull, reducing replacement costs by 75%",
      "Premium tool steels (DC53, D2, Cr12MoV) with HRC 58-62 hardness via vacuum + cryogenic treatment",
      "Precision CNC-machined concave/flat profiling for optimal biting into dense plastic lumps",
    ],

    components: [
      {
        id: "four-usable-edges",
        tag: "COST EFFICIENCY",
        title: "Four Usable Edges (Reduced TCO)",
        description:
          "The symmetrical square design features four cutting edges. When one edge dulls, the operator simply loosens the bolt and rotates the knife 90°, cutting blade replacement costs by 75% and drastically reducing maintenance downtime.",
        image: "/images/products/shredder-blades/single-shredder-blades-00.webp",
      },
      {
        id: "aggressive-profiling",
        tag: "PERFORMANCE",
        title: "Aggressive Concave/Flat Profiling",
        description:
          "Precision CNC-machined faces ensure optimal 'biting' into smooth, dense plastic lumps, preventing material from bouncing on the rotor during low-speed shredding.",
        image: "/images/products/shredder-blades/single-shredder-blades-01.webp",
      },
      {
        id: "zero-defect-integrity",
        tag: "RELIABILITY",
        title: "Zero-Defect Integrity",
        description:
          "Deep cryogenic treatment eliminates internal residual stress, ensuring the blades will not shatter when hitting unexpected foreign objects like hidden metal inclusions.",
        image: "/images/products/shredder-blades/single-shredder-blades-02.webp",
      },
    ],

    dimensionLabels: {
      col1: "Dimensions (L × W × T)",
      col2: "Bolt Hole Size",
      col3: "Knife Type",
      caption: "* Stator knives (bed knives) and custom rotor blade profiles available. Compatible with major global single-shaft shredder brands.",
    },

    // FIXED: Changed keys from od/id/thickness to logical terms (spec/bolt/type)
    standardDimensions: [
      { spec: "25 × 25 × 20 mm", bolt: "M12",       type: "Square Rotor Knife" },
      { spec: "28 × 28 × 23 mm", bolt: "M12",       type: "Square Rotor Knife" },
      { spec: "30 × 30 × 20 mm", bolt: "M12",       type: "Square Rotor Knife" },
      { spec: "30 × 30 × 25 mm", bolt: "M12",       type: "Square Rotor Knife" },
      { spec: "34 × 34 × 20 mm", bolt: "M12",       type: "Square Rotor Knife" },
      { spec: "40 × 40 × 28 mm", bolt: "M14",       type: "Square Rotor Knife" },
      { spec: "50 × 50 × 30 mm", bolt: "M16",       type: "Square Rotor Knife" },
      { spec: "60 × 60 × 35 mm", bolt: "M16 / M18", type: "Square Rotor Knife" },
      { spec: "70 × 70 × 42 mm", bolt: "M20",       type: "Square Rotor Knife" },
      { spec: "80 × 80 × 45 mm", bolt: "M24",       type: "Square Rotor Knife" },
    ],

    relatedBladeIds: ["shredder-blades", "granulator-blades"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Metal Slitters (金属卷材纵剪/分条刀具组)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-coil-slitting-knives",
    name: "Rotary Metal Slitters",
    fullName: "Rotary Metal Slitters for Precision Metal Processing",
    category: "metal_cutting_blades",
    sector: "metal",
    categoryDisplay: "Metal Slitting Blades",
    image: "/images/products/rotary-slitter-knives/metal-slitter-knives-00.webp",
    gallery: [
      "/images/products/rotary-slitter-knives/metal-slitter-knives-00.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-01.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-02.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-03.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-04.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-05.webp",
    ],
    description:
      "Upgrade your slitting line with our premium Top & Bottom Slitter Blade Set. Engineered for precision metal processing, this complete tooling setup includes high-precision rotary knives, steel spacers, and rubber stripper rings. Through advanced CNC micro-grinding, we achieve a robust, frictionless edge with thickness tolerances strictly held to ±0.001 mm. Guarantee zero-burr shearing and perfect shaft stacking for steel, aluminum, and copper coils.",
    fullDescription:
      "Industrial-grade circular metal knives designed for heavy-duty metal service centers and steel mills. We supply high-precision rotary shear blades alongside perfectly matched steel spacers, rubber bonded stripper rings, and overarm separator discs. Manufactured to micron-level tolerances and lapped to a mirror finish to ensure burr-free shearing of both ferrous (CR/HR, Galvanized) and non-ferrous (Aluminum, Copper, Brass) metal coils.",
    link: "/products/metal-coil-slitting-knives",
    isFeatured: true,

    specs: [
      { label: "Material",            value: "D2, SKD11, Cr12MoV, LD, H13, HSS" },
      { label: "Hardness",            value: "58 - 64 HRC (Application Dependent)" },
      { label: "Thickness Tolerance", value: "Up to ±0.001 mm" },
      { label: "O.D. Tolerance",      value: "Up to ±0.01 mm" },
      { label: "Parallelism",         value: "Up to 0.002 mm" },
      { label: "Surface Finish",      value: "Lapped / Polished (Ra ≤ 0.2)" },
      { label: "Complete Tooling",    value: "Spacers, Rubber Rings, Separators" },
      { label: "Applications",        value: "Cold/Hot Rolled Steel, Silicon Steel, Galvanized Sheet & Non-Ferrous Foils" },
    ],

    components: [
      {
        id: "micron-tolerance",
        tag: "PRECISION",
        title: "Micro-Tolerance Engineering",
        description:
          "Engineered with a thickness tolerance of up to ±0.001 mm and parallelism of 0.002 mm (for OD ≤ 420mm). Guarantees zero cumulative error when stacking multiple blades on the slitter arbor.",
        image: "/images/products/rotary-slitter-knives/metal-slitter-knives-01.webp",
      },
      {
        id: "complete-setup",
        tag: "SYSTEM",
        title: "Complete Slitting Tooling",
        description:
          "Beyond blades, we provide exact-match steel spacers, rubber bonded stripper rings, and separator discs. A fully integrated system ensures perfect tension and burr-free coil rewinding.",
        image: "/images/products/rotary-slitter-knives/metal-slitter-knives-02.webp",
      },
      {
        id: "alloy-toughness",
        tag: "METALLURGY",
        title: "Premium Alloy Selection",
        description:
          "From high-chromium D2/SKD11 for cold-rolled steel, to heat-resistant H13 for hot mills. Each blade is vacuum hardened to deliver exceptional wear resistance and edge strength for high-speed metal slitting.",
        image: "/images/products/rotary-slitter-knives/metal-slitter-knives-03.webp",
      },
    ],

    standardDimensions: [
      { spec: "OD ≤ 250 mm",  od: "OD ≤ 250 mm",  id: "Tolerance: +0.01", thickness: "Tol: ±0.001 mm" },
      { spec: "OD ≤ 420 mm",  od: "OD ≤ 420 mm",  id: "Tolerance: +0.01", thickness: "Tol: ±0.001 mm" },
      { spec: "OD ≤ 720 mm",  od: "OD ≤ 720 mm",  id: "Tolerance: +0.01", thickness: "Tol: ±0.005 mm" },
      { spec: "OD ≤ 1000 mm", od: "OD ≤ 1000 mm", id: "Tolerance: +0.01", thickness: "Tol: ±0.030 mm" },
      { spec: "OD ≤ 1600 mm", od: "OD ≤ 1600 mm", id: "Tolerance: +0.01", thickness: "Tol: ±0.050 mm" },
    ],

    relatedBladeIds: ["metal-shear-blades", "alloy-blades"],
  },
  

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Metal Shear Knives (金属剪板机直条刀)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-shear-blades",
    name: "Metal Shear Knives",
    fullName: "Heavy-Duty Guillotine Shear Blades for Metal Fabrication",
    category: "metal_cutting_blades",
    sector: "metal",
    categoryDisplay: "Metal Shear Knives",
    image: "/images/products/granulator-blades/metal-shear-blades-00.webp",
    gallery: [
      "/images/products/granulator-blades/metal-shear-blades-00.webp",
      "/images/products/granulator-blades/metal-shear-blades-01.webp",
      "/images/products/granulator-blades/metal-shear-blades-04.webp",
      "/images/products/granulator-blades/metal-shear-blades-03.webp",
      "/images/products/granulator-blades/metal-shear-blades-02.webp",
      "/images/products/granulator-blades/metal-shear-blades-05.webp",
    ],
    description:
      "Sureay Metal Shear Knives represent the pinnacle of durability for global metal fabrication. Through advanced heat treatment and precision grinding, we achieve a robust, impact-resistant cutting edge that shears through mild steel, stainless plates, and hot-rolled billets with extreme accuracy. This optimized geometry prevents edge bowing and guarantees burr-free cuts. Partner with Sureay for exact-match OEM shear knives that ensure continuous, heavy-duty performance.",
    fullDescription:
      "Premium straight shear knives designed for mechanical and hydraulic guillotine shears. Serving critical industries including shipbuilding, aviation, and structural steel, our blades are custom-forged from graded tool steels to match your specific material thickness and temperature requirements.",
    link: "/products/metal-shear-blades",
    isFeatured: true,

    specs: [
      { label: "Brand",               value: "Sureay" },
      { label: "Material",            value: "T10, 9CrSi, 6CrW2Si, Cr12MoV, H13 & Alloy Steels" },
      { label: "Cold Shearing",       value: "T10, 65Mn (57-59 HRC)" },
      { label: "Heavy Shearing",      value: "9CrSi, Cr12MoV, 6CrW2Si (58-62 HRC)" },
      { label: "Hot Shearing",        value: "H13, LD, HSS (High Temp Resistant)" },
      { label: "Length Capacity",     value: "Up to 6000 mm (Single Piece)" },
      { label: "Edge Geometry",       value: "1, 2, or 4 Cutting Edges" },
      { label: "Tolerance",           value: "Precision Ground Parallelism" },
      { label: "Industries Served",   value: "Metallurgy, Shipbuilding, Aviation, Steel Structures & Fabrication" },
    ],

    components: [
      {
        id: "cold-shearing",
        tag: "STANDARD DUTY",
        title: "Cold-Rolled & Mild Steel Shearing",
        description:
          "Forged from T8/T10 carbon tool steel and hardened to 57-59 HRC. An incredibly cost-effective solution for cutting standard A3 plates, mild steel, and general scrap recycling without compromising edge integrity.",
        image: "/images/products/granulator-blades/metal-shear-blades-01.webp",
      },
      {
        id: "stainless-shearing",
        tag: "HEAVY DUTY",
        title: "Stainless & Medium Plate Shearing",
        description:
          "Utilizing premium low-alloy steels like 9CrSi, 6CrW2Si, and Cr12MoV. Deep-hardened to 58-62 HRC to withstand extreme abrasive wear when shearing stainless steel and thicker alloy plates.",
        image: "/images/products/granulator-blades/metal-shear-blades-02.webp",
      },
      {
        id: "hot-shearing",
        tag: "EXTREME TEMP",
        title: "Hot-Rolled Billet Shearing",
        description:
          "Engineered for heavy steel mills. Made from H13 and LD alloys that retain their hardness and resist annealing at extreme temperatures, perfect for hot shearing billets and heavy slabs.",
        image: "/images/products/granulator-blades/metal-shear-blades-03.webp",
      },
    ],

    standardDimensions: [
      { spec: "500×70×22",   od: "500 mm",  id: "70 mm",  thickness: "22 mm" },
      { spec: "508×70×22",   od: "508 mm",  id: "70 mm",  thickness: "22 mm" },
      { spec: "508×80×25",   od: "508 mm",  id: "80 mm",  thickness: "25 mm" },
      { spec: "510×80×25",   od: "510 mm",  id: "80 mm",  thickness: "25 mm" },
      { spec: "1025×80×20",  od: "1025 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1025×100×20", od: "1025 mm", id: "100 mm", thickness: "20 mm" },
      { spec: "1025×100×25", od: "1025 mm", id: "100 mm", thickness: "25 mm" },
      { spec: "1100×80×20",  od: "1100 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1100×100×25", od: "1100 mm", id: "100 mm", thickness: "25 mm" },
      { spec: "1300×80×20",  od: "1300 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1300×125×32", od: "1300 mm", id: "125 mm", thickness: "32 mm" },
      { spec: "Customized",  od: "Custom Length", id: "Custom Width", thickness: "Per Drawing" },
    ],

    relatedBladeIds: ["metal-coil-slitting-knives", "alloy-blades"],
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
