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
      "Precision-ground circular slitter and score-cut knives for demanding high-speed converting lines. Matched top/bottom shear pairs, crush-cut anvil blades, and razor-trim profiles manufactured from 52100, D2, M2 HSS, or ASP23 PM steel to ±0.002mm thickness tolerance and ≤0.02mm T.I.R. runout. Proven in BOPP film, lithium battery foil, non-woven, and pressure-sensitive label converting—with optional TiN or DLC anti-stick coatings for adhesive substrates.",

    // Structured for B2B reading flow and technical authority
    fullDescription:
      "Circular rotary slitter knives operate at the intersection of dimensional precision and material science. On a converting line running BOPP or BOPET film at 400–600 m/min, a blade thickness tolerance error of 0.005mm per knife compounds across a multi-knife arbor stack, producing visible slit-width deviation, edge curl, and dust that contaminates downstream rewinding and packaging equipment. Sureay rotary slitter knives are manufactured to ±0.002mm thickness tolerance and ≤0.02mm total indicated runout (T.I.R.)—tolerances that hold across the full production diameter, not just at the bore.\n\nAlloy selection is application-determined. Standard converting of coated paper and kraft board runs on 52100 bearing steel or D2 cold-work tool steel. Abrasive substrates—battery-grade aluminum and copper electrode foils for EV lithium cells, fiberglass-reinforced packaging, silicon-coated release liners—require ASP23 or ASP52 powder-metallurgy (PM) steel or solid carbide for acceptable edge life. Flexible plastic films (BOPP, BOPET, CPP, PE stretch film) are routinely processed on M2 HSS blades with optional TiN or DLC PVD surface coating to prevent adhesive film transfer and reduce friction-induced web heating.\n\n## By Cutting Method\n\n**Shear Slitting (Matched Top & Bottom Knife Pairs):** The scissor action between the dished upper knife and grooved lower anvil knife generates a clean shear cut with zero tensile loading on the web. Knife-to-knife clearance is typically set at 0.05–0.15mm (substrate-dependent); our grinding tolerances ensure this clearance is consistent across the full slit width. Critical for paper, non-wovens, and light flexible films where edge deformation is unacceptable.\n\n**Crush/Score Cutting (Circular Blade Against Rubber Anvil Roll):** A hardened, sharp-edged blade penetrates through a pressure-sensitive adhesive laminate, foam, or multi-layer packaging web against a controlled-hardness rubber anvil. Blade profile geometry and bevel angle are optimized per substrate to prevent adhesive squeeze-out and delamination at the cut edge. The standard choice for pressure-sensitive tape, foam die-cutting, and medical packaging splitting.\n\n**Razor Slitting (Free-Float or Fixed Single Blade):** Ultra-sharp, thin-profile blades trim edge waste from cast film extrusion lines, oriented film lines, and nonwoven spunbond production at speeds above 500 m/min. Blade geometry is optimized for minimum web drag and maximum edge cleanliness, preventing edge curl and electrostatic discharge that cause web break events on high-speed lines.\n\n## By Material & Industry\n\n**Paper & Board:** Tissue, kraft, newsprint, coated art paper, folding boxboard. Dust-free edge quality is mandatory for downstream printing and lamination; D2 or M2 HSS blades with Ra ≤ 0.4 surface finish meet all major converting house specifications.\n\n**Flexible Packaging Films:** BOPP, BOPET, CPP, PE/PP stretch film, shrink sleeve. High-speed film slitting requires precise runout control to prevent knife wobble-induced web tension spikes. M2 HSS with optional DLC coating eliminates film transfer adhesion on the blade face.\n\n**Battery Electrode Foils:** Aluminum cathode and copper anode foil for lithium-ion cell manufacturing. Dimensional variances above ±0.003mm contaminate ISO Class 7 cell assembly environments. PM-steel or solid carbide grades are mandatory; contamination-free handling and cleanroom-compatible packaging available.\n\n**Non-Wovens & Medical Fabrics:** Spunbond PP, meltblown, SMS medical fabrics, HEPA filter media. Specialized rake angles prevent fiber fraying and web slippage during slitting of loose-structure materials at high line tensions.\n\n**Pressure-Sensitive Tapes & Labels:** Masking, duct tape, double-sided foam, label stock, transfer adhesive. TiN and Teflon anti-adhesion coatings reduce cleaning frequency by 60–80%, extending Mean Time Between Replacements on the most demanding tape-slitting applications.",
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
      { spec: "Top Blade (Dished)", od: "75 mm", id: "45 mm", thickness: "1.0 / 1.2 mm" },
      { spec: "Bottom Blade (Anvil)", od: "70 mm", id: "45 mm", thickness: "10 / 8 mm" },
      { spec: "Top Blade (Dished)", od: "100 mm", id: "35 mm", thickness: "1.2 mm" },
      { spec: "Bottom Blade (Anvil)", od: "80 mm", id: "60 mm", thickness: "20 / 16 mm" },
      { spec: "Top Blade (Dished)", od: "118 mm", id: "80 mm", thickness: "1.2 mm" },
      { spec: "Bottom Blade (Anvil)", od: "100 mm", id: "70 mm", thickness: "20 / 16 mm" },
      { spec: "Top Blade (Dished)", od: "150 mm", id: "80 mm", thickness: "2.5 mm" },
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
      "D2 (1.2379) and DC53 cold-work tool steel multi-shaft shredder inserts precision-milled to ±0.05mm counter-bore tolerances for M12/M16/M20 bolted rotors. The concave cutting face minimizes heat buildup during high-torque processing of contaminated HDPE, PET, and post-consumer bulk plastics. Four-way 90° indexable geometry quadruples blade lifespan versus non-indexable alternatives, cutting annual tooling cost by 75%. Drop-in OEM fit for Vecoplan, Weima, Untha, and Lindner two-shaft and four-shaft shredder rotor systems.",
    fullDescription:
      "Two-shaft, four-shaft, and fine-shredding rotors impose a fundamentally different stress profile on cutting inserts compared to single-shaft systems. The counter-rotating disc geometry generates continuous shear loads at moderate torque, requiring inserts that resist progressive abrasive wear rather than single-cycle impact. Premature insert failure on multi-shaft rotors—characterized by edge rounding, face pitting, and counter-bore elongation—is almost exclusively caused by incorrect alloy selection or insufficient heat treatment depth.\n\nSureay multi-shaft shredder inserts are manufactured from D2 (1.2379) and DC53 cold-work tool steels, vacuum-hardened and deep-cryogenically processed to HRC 52–58. The cryogenic sub-zero stage (−80°C, 24-hour soak) eliminates retained austenite, stabilizes the martensite microstructure, and increases wear resistance without sacrificing the toughness margin needed to prevent bulk fracture on contaminated plastic feedstocks.\n\nEvery M12, M16, and M20 counter-bore is CNC-milled to ±0.05mm positional tolerance. This precision eliminates the micro-rocking under load that gradually elongates counter-bores in lower-tolerance inserts—a progressive failure mode that forces premature rotor rebuilds.\n\n## Self-Centering Concave Face Geometry\n\nThe precision-milled concave cutting face generates a superior scissor-shear action between opposing rotor disc inserts. Compared to a flat-face geometry, the concave profile reduces the shear contact area at each cutting event, lowering the instantaneous shear force and dramatically reducing heat generation at the cutting zone. This directly prevents thermoplastic material melting and adhesion on the blade face—a critical reliability factor when processing polypropylene, LDPE film bales, and mixed plastic waste with high surface-area-to-mass ratios.\n\n## Four-Way Indexable Design: Total Cost Reduction\n\nThe symmetrical square insert geometry provides four independent cutting edges per blade, each presenting a fresh, factory-ground working face when rotated 90° under the mounting bolt. A single operator rotates a full rotor complement in under 15 minutes without machine disassembly. This indexable design quadruples the effective service interval per blade purchase versus non-indexable alternatives, directly reducing the annual per-tonne tooling cost of your shredding operation.\n\n## Alloy Specifications by Feedstock\n\n**D2 (1.2379) — Standard Contaminated Plastics:** Optimized for post-consumer HDPE bottles, PET trays, PP injection-moulded parts, and mixed rigid plastic bales. The high chromium-carbide content delivers reliable abrasion resistance at an economical cost point.\n\n**DC53 — Hard Engineering Plastics:** Specified for high-density nylon (PA6, PA66), ABS, polycarbonate, PEEK, and glass-fibre-reinforced compounds that exceed the abrasion resistance ceiling of standard D2. DC53's finer carbide distribution and higher transverse rupture strength provide extended edge retention on hard-face materials.\n\n**42CrMo — Rubber & Metal-Inclusive Waste:** For rubber-inclusive streams (tyres, conveyor belts, EPDM extrusions) or industrial scrap with metal contamination risk. The higher toughness of 42CrMo prevents the brittle fracture that causes catastrophic rotor damage when a hidden metal inclusion contacts the cutting disc.\n\n## OEM-Compatible Dimensions\n\nInsert geometry, counter-bore pattern, and disc OD are reverse-engineered from factory-measured OEM samples to guarantee drop-in fit on Vecoplan VA/VNZ series, Weima WLK series, Untha RS/XR series, and Lindner Urraco and Polaris platforms. Custom counter-bore patterns and alloy specifications are available within a 15-day production lead time.",
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
      // 400 Series
      { spec: "400", od: "Φ180", id: "90", length: "10", teeth: "150" },
 
      // 600 Series
      { spec: "600", od: "Φ200", id: "140", length: "20", teeth: "180" },

      // 800 Series
      { spec: "800", od: "Φ250", id: "160", length: "25", teeth: "220" },

      // 1000 Series
      { spec: "1000", od: "Φ300", id: "180", length: "30", teeth: "250" },

      // 1200 Series
      { spec: "1200", od: "Φ350", id: "200", length: "40", teeth: "300" },

      // 1500 Series
      { spec: "1500", od: "Φ400", id: "220", length: "40", teeth: "350" },

      // 2000 Series
      { spec: "2000", od: "Φ450", id: "260", length: "30", teeth: "400" },
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
      "D2 and M2 HSS large-diameter circular log saw blades for high-speed tissue converting—precision-ground to lateral runout ≤0.15mm, edge runout ≤0.10mm, and parallelism 0.05mm for dust-free, fiber-crush-free cross-cutting of tissue, bath tissue, and paper-towel logs. Standard bore Ø68.26mm (+0.05mm) for Fabio Perini, Casmatic, and PCMC log saws; custom OD to Ø1200mm. Optional TiN or hard-chrome coating extends MTBR in high-humidity paper mills.",
    fullDescription:
      "The tissue log cross-cut is the single highest-stakes cutting operation in a tissue converting line. A dimensional defect at this stage—torn edge fibers, dust migration, or non-perpendicular cut face—propagates immediately through the wrapping and packaging stations, triggering line stops and consumer-grade quality rejections that cannot be reworked downstream.\n\nSureay tissue log saw blades are manufactured from D2 cold-work tool steel and M2 HSS (SKH-9), vacuum-hardened in-house and micro-ground to the following verified geometric tolerances:\n\n- **Lateral runout:** ≤ 0.15 mm\n- **Edge runout:** ≤ 0.10 mm\n- **Face parallelism:** 0.05 mm\n- **Concentricity (OD to bore):** ≤ 0.30 mm\n- **Blade body verticalness:** ≤ 0.05 mm\n- **Bore tolerance:** Ø 68.26 mm (+0.05 / 0.00 mm)\n\nThese are not nominal values—they represent the maximum permissible deviation on each shipped blade, verified on a calibrated CMM before dispatch.\n\n## Blade Geometry Engineered for Tissue Fiber\n\nTissue substrate is structurally unique among industrial cutting applications: it is a low-density, high-surface-area fibrous web with near-zero compressive strength but high tear resistance along the fiber orientation. The correct log saw blade geometry exploits this anisotropy.\n\nThe shallow bevel angle (15°–25°) delivers a wedge action that separates fibers by shear rather than compression, preventing the fiber crushing and edge densification that generates dust and reduces roll softness ratings. The mirror-polished blade face (Ra ≤ 0.4 μm) eliminates fiber adhesion sites, allowing continuous high-cycle operation without periodic blade face cleaning stops.\n\nBlade body thickness (3.80–6.00 mm) is selected based on log diameter and feed rate. Thicker blades resist lateral deflection at high feed rates, maintaining perpendicular cut faces essential for uniform roll height in consumer-packaged goods.\n\n## Surface Treatments for Production Environment\n\n**Hard Chrome Plating:** Provides corrosion resistance in high-humidity paper mill environments (>75% RH). Also reduces tissue fiber adhesion coefficient, extending the clean-running interval between blade dressing cycles.\n\n**TiN PVD Coating:** Physical vapour deposition titanium nitride coating (2–3 μm) provides both corrosion resistance and a surface hardness of HV2300+, significantly extending the sharp-edge service interval in high-cycle operation. Recommended for premium tissue brands with strict dust specification requirements.\n\n## Machine Compatibility\n\n**Standard bore Ø 68.26 mm (+0.05mm):** Fabio Perini (all series), PCMC Forte/Elite, Körber/MTC log saws.\n\n**Ø 82.55 mm bore:** Casmatic (Kimberly-Clark licensed), Italian and Spanish third-party OEM log saw platforms.\n\n**Ø 60.00 mm bore:** Large-format log saws for industrial wiper, jumbo roll, and coreless bath tissue production (OD 870–1000 mm).\n\nCustom OD from Ø 610 mm to Ø 1200 mm are manufactured to order with a standard 10-working-day production lead time. Drawing review and dimensional sign-off available prior to production on first-order tooling.",
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
      "D2, SKD-11, and Cr12MoV granulator rotor and stator knives precision-ground to ±0.02mm bolt-hole tolerance for Cumberland, Conair/Wortex, Herbold, Pallmann, and Rapid unit granulators. Bevel angles from 30° to 55° are matched to polymer type—delivering clean, low-fines regrind for closed-loop recycling of PET bottles, PVC pipes, and injection-moulding runners. Vacuum hardening plus deep cryogenic processing stabilizes HRC 58–62 for extended edge retention between sharpening cycles. Custom rotor profiles available to drawing within 10 working days.",
    fullDescription:
      "Granulator rotor and stator knives are the highest-wear components in any closed-loop plastic recycling line. Incorrect alloy selection or substandard geometry tolerances directly translate into enlarged particle size distribution, excessive dust and fines, elevated motor amp draw, and shortened sharpening intervals—all of which degrade regrind pellet quality and increase cost per tonne processed.\n\nSureay granulator blades are manufactured from D2 (1.2379), SKD-11, DC53, and Cr12MoV cold-work tool steels—selected based on the specific polymer and abrasive filler content being processed. Calcium carbonate-filled PVC and glass-fibre-reinforced nylon demand SKD-11 or DC53 for maximum abrasion resistance. Impact-loaded applications such as thick-wall HDPE containers, cold nylon runners, and heavy sprues require the higher toughness-to-hardness ratio of Cr12MoV.\n\nAll blades are vacuum-hardened and deep-cryogenically processed at −80°C to achieve a stabilized HRC 58–62 microstructure. The cryogenic step eliminates retained austenite, reduces internal compressive stress, and significantly extends the time between sharpening cycles by improving carbide dispersion uniformity across the cutting edge.\n\n## Precision Grinding Standards\n\nThe cutting clearance between rotor and stator knives is the single most influential variable controlling regrind particle size and fines fraction. Sureay granulator blades are machined to the following tolerances to ensure consistent rotor-to-bed gap across the full cutting width:\n\n- **Bolt-hole positional tolerance:** ±0.02 mm\n- **Face flatness:** 0.05 mm\n- **Parallelism (top face to bottom face):** 0.03 mm\n- **Bevel angle:** 30°–55° (application-optimized per polymer and rotor speed)\n\nA face flatness deviation above 0.08mm allows rotor knife rocking under load, progressively widening the cutting gap and increasing the coarse fraction in regrind—a defect that causes downstream extruder feed inconsistency and pellet quality non-conformances.\n\n## Polymer-Specific Bevel Angle Selection\n\n**30°–35° bevel:** Soft thermoplastics (LDPE, LLDPE, EVA, foam PP). Low included angle delivers maximum sharpness for clean shearing of compliant materials that would deform rather than shear against a wide-angle edge.\n\n**40°–45° bevel:** General-purpose engineering plastics (HDPE, ABS, standard PP/PET regrind). Balanced edge strength and sharpness for the most common granulator feedstocks.\n\n**50°–55° bevel:** Highly abrasive or filled compounds (glass-filled nylon, calcium carbonate PVC, UHMW-PE). Wider bevel distributes abrasive wear over a larger cutting face, extending sharpening interval at the cost of slightly higher cutting force.\n\n## Machine Compatibility\n\nDimensions are reverse-engineered to match Cumberland (all series), Conair/Wortex, Amacoil, Alpine, Ganutec, Foremost, Nelmor, Mitts & Merrill, Herbold, Pallmann, Dreher, Rapid, Hydreclaim, Buss-Condux, IMS, and Ramco (R&M) granulator configurations. Both double-hole and multi-hole (triple, quadra) mounting patterns are carried in standard stock. Custom profiles for beside-the-press in-line granulators on injection moulding and extrusion blow moulding lines are produced to customer drawing within 10 working days.",
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
      { spec: "Double hole", od: "90 × 70 × 8", id: "40 / 45 / 50" },
      { spec: "Double hole", od: "120 × 70 × 8", id: "60" },

      // Triple hole
      { spec: "Triple hole", od: "126 × 60 × 8", id: "40" },
      { spec: "Triple hole", od: "150 × 70 × 8", id: "50 / 55" },
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
      "Guillotine paper cutter replacement blades in M2, SKH-9, and SKH-51 HSS or TCT (Tungsten Carbide Tipped) inlay for commercial print shops, bindery lines, and packaging converters. Precision-ground to 21° bevel with face flatness ≤0.05mm—delivering clean, dust-free cross-cuts on coated art paper, multi-layer board, and carbonless copy stock. Standard lengths 450–2050mm; length tolerance +2/−1mm, edge thickness 0/−0.1mm. HSS grades deliver 4–6× longer service life versus standard O1 tool steel—fewer resharpening cycles, lower press-room downtime.",
    fullDescription:
      "Guillotine paper cutter replacement blades are consumed components whose alloy grade, edge geometry, and full-length dimensional accuracy directly determine cut quality across the entire ream stack—from 450mm office cutter blades to 2050mm double-beam commercial pressroom guillotines.\n\nSureay paper cutting blades are offered in three metallurgical grades, matched to cut volume, substrate, and total cost of ownership requirements:\n\n## Material Grades\n\n**Standard Tool Steel (T10, 9CrSi — HRC 57–60):** Cost-effective for moderate-volume print shops and finishing operations cutting bond paper, newsprint, and uncoated stock up to 80 gsm. T10 high-carbon steel is hardened to HRC 57–60 and provides reliable edge sharpness at the lowest unit cost. Suited to Polar, Schneider Senator, and Challenge 305 class machines in moderate daily-cycle environments.\n\n**M2 / SKH-9 / SKH-51 HSS (HRC 60–62):** The premium choice for high-volume commercial printing, book publishing, and label-converting guillotines running multiple ream stacks per hour. M2 and SKH-51 HSS retain full hardness at the elevated cutting temperatures generated by high-cycle operation—delivering 4–6× longer service life between resharpening events compared to standard carbon steel blades. Recommended for coated art paper, board, laminated packaging stock, and multi-layer adhesive label sheets where edge wear accelerates rapidly.\n\n**TCT Inlay — Tungsten Carbide Tipped (YG15 / YG20):** Nitrogen furnace-brazed carbide edge inlay for the most abrasion-intensive substrates: carbonless copy paper (CBS coating), high-calcium-carbonate-filled packaging board, coated cartonboard, abrasive specialty papers, and fibre-reinforced technical papers. TCT blades outlast HSS on these substrates by a factor of 3–5× and maintain slit-edge quality well beyond the point where HSS would require resharpening.\n\n## Precision Grinding Standards\n\n- **Bevel angle:** 21° (standard guillotine geometry, single-bevel)\n- **Length tolerance:** +2 / −1 mm\n- **Width tolerance:** ±1 mm\n- **Edge thickness tolerance:** 0 / −0.1 mm\n- **Face flatness (full length):** ≤ 0.05 mm\n\nFlatness deviation above 0.08mm across the blade length causes uneven blade-to-sideboard contact, producing a tapered cut and requiring operator correction shims—a production inefficiency that accumulates to measurable downtime on high-volume cutting lines.\n\n## Machine Compatibility & Supply States\n\nStandard stock lengths from 450 mm to 2050 mm. Compatible with Polar 115/137/155/176/200 series, Schneider Senator, Perfecta, Wohlenberg, Prism, and Challenge guillotine brands. Custom lengths, mounting hole patterns, and back-edge profiles manufactured to drawing within 7 working days.\n\n**Available supply conditions:** Sharp-ground edge (ready to install) / Semi-finished edge (for on-site final dressing to machine specification) / Blank knife (unground, for customers with in-house regrinding capability).",
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
    image: "/images/products/shredder-blades/single-shredder-blades-06.webp",
    badge: "Heavy Duty",
    badgeColor: "orange",
    gallery: [
      "/images/products/shredder-blades/single-shredder-blades-06.webp",
      "/images/products/shredder-blades/single-shredder-blades-00.webp",
      "/images/products/shredder-blades/single-shredder-blades-01.webp",
      "/images/products/shredder-blades/single-shredder-blades-02.webp",
      "/images/products/shredder-blades/single-shredder-blades-03.webp",
      "/images/products/shredder-blades/single-shredder-blades-04.webp",
    ],
    // Shortened for SEO Meta Description & UI Product Cards (< 160 chars)
    description:
      "DC53, D2 (1.2379), and Cr12MoV cold-work tool steel rotor block knives for low-speed, high-torque single-shaft shredders—vacuum-hardened and cryogenically processed to HRC 58–62, CNC-machined to ±0.02mm face tolerance. Symmetrical square geometry delivers four 90°-indexable cutting edges, reducing per-blade replacement cost by 75%. Primary size reduction of thick-wall HDPE/PVC pipe, injection-moulding purgings, wood pallet waste, and MSW. Drop-in compatible with Vecoplan, Weima, Lindner, and Zerma single-shaft rotor configurations.",

    // Rewritten for better reading flow on the actual product page
    fullDescription:
      "Single-shaft shredders operate at 80–150 RPM under extremely high torque, driving block-style rotor inserts into a stationary bed knife at shear clearances of 0.2–1.5mm. At these mechanical parameters, blade failure mode is not progressive abrasive wear—it is impact-induced edge microchipping from dense material, bulk fracture from hidden foreign metal, or thermal softening from sustained high-cycle torque peaks. Standard D2 (1.2379) tool steel addresses all three failure modes at a cost-effective price point; DC53—with 17% higher transverse rupture strength at equivalent hardness—is specified when hard engineering plastics (PA66-GF, PC, PEEK) or abrasion-intensive rubber compounds demand the additional toughness margin.\n\nAll rotor inserts undergo vacuum hardening to HRC 58–62 followed by deep cryogenic processing at −80°C. The cryogenic stage eliminates retained austenite, stabilizes the martensite microstructure against thermal fatigue, and dramatically reduces the risk of bulk fracture when rotor inserts encounter unexpected metal inclusions—a common occurrence in post-industrial and MSW feedstreams.\n\n## CNC Machining Tolerances\n\nCutting clearance between rotor insert faces and the stationary bed knife is the principal variable governing shred particle size, throughput, and motor load. Sureay single-shaft inserts are CNC-machined to ±0.02mm face flatness—ensuring consistent, repeatable knife-to-bed clearance across the full rotor stack length and preventing the material wrap-back and rotor stall events caused by uneven clearances on imprecisely machined inserts.\n\n## Four-Edge Indexable Geometry: Cost Reduction in Practice\n\nThe symmetrical square block format—available from 25×25×20mm (M12 mounting bolt) through 80×80×45mm (M24 mounting bolt)—provides four independent cutting edges per insert. When one edge dulls, the operator loosens the single mounting bolt, rotates the insert 90° to a fresh edge, and retorques. A full rotor complement can be indexed in under 15 minutes without removing the rotor shaft. This single design feature reduces annual tooling expenditure by 75% versus non-indexable alternatives and eliminates the machine downtime associated with rotor extraction for blade replacement.\n\n## Alloy Selection by Feedstock\n\n**DC53 — Hard Engineering Polymers:** Nylon (PA6, PA66-GF30), polycarbonate, ABS/PC blends, PEEK, and glass-fibre-reinforced thermoplastics. DC53's finer carbide grain structure and superior toughness prevent the edge microchipping that standard D2 suffers on hard, brittle polymers at low-RPM impact loading.\n\n**D2 (1.2379) — General Industrial Plastics:** HDPE, LDPE, PP, PVC pipes and profiles, injection-moulding runners and sprues, PET blow-moulding scrap. The high chromium-carbide content of D2 delivers reliable abrasion resistance across the most common single-shaft shredder feedstocks.\n\n**42CrMo — Rubber, Mixed Waste & Metal-Inclusive Streams:** Tyres, conveyor belt offcuts, EPDM seals, and post-industrial scrap with metal contamination risk. 42CrMo's higher impact energy absorption (Charpy V-notch >  25J) prevents brittle fracture that could cause catastrophic rotor damage on a metal strike.\n\n## Machine Compatibility\n\nBolt patterns, rotor pocket geometry, and insert dimensions are reverse-engineered from factory-measured OEM samples for Vecoplan VHZ/VA, Weima WLK/WKS, Lindner Urraco and Micromat, and Zerma GSL single-shaft shredder platforms. Stationary bed knives (lower counter-knives) and custom concave/flat face profiles are supplied as matched sets.",
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
      { spec: "30 × 30 × 25 mm", bolt: "M12",       type: "Square Rotor Knife" },
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
      "Complete rotary coil slitting tooling for metal service centres and steel mills: D2, SKD-11, Cr12MoV, and H13 circular slitter knives lapped to Ra ≤ 0.2 with ±0.001mm thickness tolerance (OD ≤ 420mm) for zero-burr shearing of CR/HR steel, galvanized coil, silicon steel, and non-ferrous foils. Supplied as matched sets with precision steel spacers, rubber bonded stripper rings, and overarm separator discs—ensuring balanced arbor loading on slitting lines from 400 to 2000mm entry width.",
    fullDescription:
      "Precision coil slitting demands a dimensional tolerance standard that most industrial cutting applications never approach. On a high-speed slitting line running cold-rolled steel at 200–400 m/min across a 10-knife arbor stack, a cumulative thickness error of just 0.01mm per knife produces measurable slit-width deviation, visible burr height, and edge camber that exceeds the strip-steel quality limits for automotive body panel and appliance housing applications.\n\nSureay circular metal slitter knives are manufactured to the following verified tolerance schedule, confirmed on a calibrated CMM before each shipment:\n\n| OD Range | OD Tolerance | Thickness Tolerance | Parallelism |\n|---|---|---|---|\n| ≤ 250 mm | +0.01 mm | ±0.001 mm | 0.001 mm |\n| ≤ 420 mm | +0.01 mm | ±0.001 mm | 0.002 mm |\n| ≤ 720 mm | +0.01 mm | ±0.005 mm | 0.003 mm |\n| ≤ 1600 mm | +0.01 mm | ±0.050 mm | Per drawing |\n\nAll knife side faces are finish-lapped to Ra ≤ 0.2 μm. This mirror face finish is not aesthetic—it ensures full metal-to-metal contact between blades in the arbor stack, eliminating air gaps that allow individual blade deflection under lateral slitting load at high coil strip tension.\n\n## Alloy Selection by Strip Material\n\n**Cold-Rolled Steel (CR, EG, HDG, HDGI):** D2 (1.2379) or SKD-11, hardened to HRC 60–62 via vacuum quench. High chromium carbide content resists the abrasive wear from zinc spangle and surface scale on galvanized and electrogalvanized coils. Recommended for CR steel service centres running continuous-shift slitting operations.\n\n**Hot-Rolled Steel & Structural Sections:** H13 (SKD-61) hot-work tool steel or 6CrW2Si for slitting heads operating at elevated ambient temperatures adjacent to pickling lines or in mill environments above 60°C ambient.\n\n**Silicon Steel (CRGO / CRNO Electrical Grade):** Cr12MoV or PM powder-metallurgy grades. Silicon steel's extreme abrasiveness—primarily caused by silica inclusions—demands maximum wear resistance to maintain slit-width tolerances throughout a full transformer laminate production run. Standard D2 loses edge profile within 10–15 coils on 0.35mm CRGO; PM-grade maintains dimensional specification for 50+ coils.\n\n**Copper & Brass Foil (C10100, C26000):** Low-alloy LD or M2 HSS grades. Softer non-ferrous substrates require edge geometry optimization to prevent material smearing and cold-welding to the knife face at high slitting speeds on close-tolerance coil widths.\n\n**Lithium Battery Electrode Foil (Copper Anode / Aluminum Cathode):** Solid carbide insert or PM-HSS grades with ISO Class 6 dimensional tolerances. EV battery electrode foils (8–12 μm thick) for gigafactory cell assembly require contamination-controlled handling and ultra-sharp edge geometry. Packaging in nitrogen-purged bags available on request.\n\n## Complete Slitting System Supply\n\nThe knife is only one component of a precision coil slitting system. Steel spacers, rubber bonded stripper rings, and overarm separator discs must be dimensionally matched to the knife set to ensure uniform arbor preload and consistent slit-width control across the full coil width. Sureay supplies integrated slitting tooling packages—knife set, spacers, stripper rings, and separators—verified as a matched system, eliminating the tolerance stack-up errors that accumulate when sourcing tooling components from multiple separate suppliers.",
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
      "T10, 9CrSi, Cr12MoV, and H13 straight guillotine shear blades for hydraulic and mechanical plate shears—surface-ground to ±0.05mm full-length parallelism for burr-free, straight-edge shearing of mild steel, stainless plate, and hot-rolled billets. Single-piece length to 6000mm; 1, 2, or 4 cutting edges available. Alloy grade matched to your shear tonnage and material: cold shearing (57–59 HRC), stainless/alloy plate (58–62 HRC), or hot billet shearing (H13/LD, high-temperature resistant). OEM matching dimensions for TRUMPF, AMADA, BYSTRONIC, and Durma hydraulic guillotines.",
    fullDescription:
      "Guillotine shear blades operate under conditions that expose every weakness in alloy selection, heat treatment depth, and grinding parallelism. The upper shear blade is driven against the lower under actuator forces from 40 to over 2000 tonnes on heavy plate shearing lines. Premature failure modes—edge rollover on mild steel, brittle fracture on stainless, thermal softening on hot billet shears—are each attributable to a specific metallurgical mismatch or a grinding parallelism deviation that concentrates blade-to-blade contact at a single point rather than distributing it uniformly across the cutting length.\n\nSureay guillotine shear blades are supplied in three metallurgical grades, each matched to a defined mechanical and thermal regime:\n\n## Cold Shearing: T10, 65Mn — HRC 57–59\n\nFor standard A3/A36 mild steel plate up to 8mm thickness at ambient temperature. T10 high-carbon tool steel provides sharp, stable edge geometry at the lowest unit cost, making it the correct economical specification for general fabrication shops, structural steel contractors, and high-volume scrap recycling operations. 65Mn is the preferred choice for high-impact, high-cycle scrap bale shearing where bulk toughness outweighs abrasion resistance as the governing failure mode.\n\n## Heavy Plate & Stainless Shearing: 9CrSi, Cr12MoV, 6CrW2Si — HRC 58–62\n\nFor stainless steel plate (304, 316L, 430, 2205 duplex), high-strength alloy plate (A514, Hardox 400, Domex 700), and galvanized sheet up to 20mm thickness on heavy hydraulic guillotines. 9CrSi provides a working balance of toughness and abrasion resistance for general heavy shearing duties. Cr12MoV (D2 equivalent) is specified for maximum wear resistance on austenitic stainless and hardox grades, where the chromium carbide matrix withstands the severe work-hardening wear imposed by high-nickel and high-manganese alloy steels. 6CrW2Si is used where elevated impact toughness is required alongside high hardness—particularly on structural plate shears processing blast-cleaned or rust-pitted surfaces.\n\n## Hot Billet & Flying Shear: H13 (SKD-61), LD — High-Temperature Resistant\n\nFor hot shears in steel rolling mills cross-cutting billets and slabs at material temperatures of 900–1100°C. H13 hot-work tool steel retains its hardness and structural integrity through its molybdenum and vanadium carbide lattice, resisting the thermal fatigue cracking and annealing that cause rapid edge rollover in cold-work grades within a single production shift. LD (low-alloy hot-work steel) is used for lower-temperature hot shearing, continuous flying shear applications, and split-beam shear installations where thermal cycling between cuts is the primary wear mechanism.\n\n## Precision Grinding Standards\n\nImproper parallelism is the single most common preventable cause of premature shear blade failure. Uneven face contact concentrates the full shearing load onto a reduced length of blade edge, generating localized stress that exceeds the steel's compressive yield strength and produces edge rollover or chipping within hours. All Sureay shear blades are surface-ground on both cutting faces to:\n\n- **Standard tolerance:** ±0.05 mm parallelism over 1000 mm length\n- **Premium tolerance:** ±0.02 mm parallelism over 1000 mm length (specified for stainless steel, aerospace-grade aluminium, and precision structural applications)\n\n## Supply Capability\n\nSingle-piece blade lengths from 500 mm to 6000 mm. Multi-segment bolted designs for shear tables exceeding 4000 mm. Single-edge, double-edge (reversible), and quad-edge profiles according to the shear frame mounting geometry. OEM-matching dimensions are carried in standard stock or manufactured to drawing within 15 working days for TRUMPF TrumaBend, AMADA QC-67Y, BYSTRONIC Xpert, Durma AD, Haco Atlantic, and Zhiyi QC11Y/K hydraulic guillotine shear models.",
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
      { spec: "510×80×25",   od: "510 mm",  id: "80 mm",  thickness: "25 mm" },
      { spec: "1025×80×20",  od: "1025 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1025×100×25", od: "1025 mm", id: "100 mm", thickness: "25 mm" },
      { spec: "1100×80×20",  od: "1100 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1100×100×25", od: "1100 mm", id: "100 mm", thickness: "25 mm" },
      { spec: "1300×80×20",  od: "1300 mm", id: "80 mm",  thickness: "20 mm" },
      { spec: "1300×125×32", od: "1300 mm", id: "125 mm", thickness: "32 mm" },
    ],

    relatedBladeIds: ["metal-coil-slitting-knives", "alloy-blades"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Three-Knife Trimmer Blades (印后装订 / 三面切书机刀片)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "three-knife-trimmer-blades",
    name: "Three-Knife Trimmer Blades",
    fullName:
      "HSS/TC Three-Knife Trimmer Blade Sets for Müller Martini, Heidelberg & Kolbus",
    category: "paper_cutting_blades",
    sector: "converting",
    categoryDisplay: "Bookbinding & Trimmer Knives",
    badge: "OEM Fit",
    badgeColor: "blue",
    image:
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
    gallery: [
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-01.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-02.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-03.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-04.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-05.webp",
    ],

    description:
      "A complete set of 3 replacement knives (1 Front, 2 Sides) engineered for heavy-duty print finishing. Fully compatible with Müller Martini, Heidelberg, Kolbus, and other major three-knife trimmers. Made of High-Speed Steel (HSS) for unmatched sharpness.",
    fullDescription:
      "Industrial-grade replacement cutting blade sets designed to precise OEM specifications for high-speed Müller Martini three-knife trimmers (including 3671 Merit and 3675 Orbit). Each set contains one front knife and two side knives (left/right) manufactured to exact dimensional tolerances, featuring precise M10 threaded holes and mounting slots. Available in High-Speed Steel (HSS, industry equivalent to Duritan) and Tungsten Carbide (TC, equivalent to Widia/Hartmetal) for cutting all kinds of paper, boards, and materials with trouble-free bindery operation.",
    link: "/products/three-knife-trimmer-blades",
    isFeatured: true,

    specs: [
      { label: "Compatible Brands", value: "Müller Martini (Merit, Orbit, etc.), Heidelberg, Kolbus" },
      { label: "Material",  value: "High Speed Steel (HSS / Duritan) or Tungsten Carbide (TC / Widia)" },
      { label: "Applications",      value: "Three-Knife Trimmers, Saddle Stitchers, Perfect Glue Binders, Folding Machines" },
    ],

    features: [
      "Bi-metallic construction: HSS cutting edge bonded to a shock-absorbing steel body for combined hardness and toughness",
      "Up to 5× longer service life versus standard bindery knives — fewer changeovers, lower cost-per-cut",
      "Machined to OEM tolerances for drop-in fit on Muller Martini 3671 Merit, 3675 Orbit, and compatible lines",
      "Diamond-ground edge delivers flawlessly smooth fore-edges, heads, and tails with zero burr or paper draw",
      "Custom sizes and hole patterns available — supplied to drawing for full OEM replacement flexibility",
    ],

    components: [
      {
        id: "hss-duritan",
        tag: "METALLURGY",
        title: "HSS & Tungsten Carbide Options",
        description:
          "Manufactured with premium High-Speed Steel (industry equivalent to Duritan) or fine-grain Tungsten Carbide (TC-F), offering exceptional wear resistance and extended sharpening intervals compared to standard Swedish Steel (SS).",
        image:
          "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
      },
      {
        id: "complete-set",
        tag: "CONFIGURATION",
        title: "Complete 3-Knife Set Integration",
        description:
          "Supplied as a complete, ready-to-install set containing 1 Front Knife and 2 Side (Left/Right) Knives. Each blade features exact OEM mounting slots and M10 threaded holes to guarantee zero-downtime installation.",
        image:
          "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-01.webp",
      },
      {
        id: "diamond-cut",
        tag: "PERFORMANCE",
        title: "Unmatched Sharpness",
        description:
          "Engineered for heavy-duty, trouble-free operation. Delivers flawlessly smooth fore-edges, heads, and tails for commercial magazines, catalogs, and perfect-bound books without spine tearing.",
        image:
          "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-02.webp",
      },
    ],

    dimensionLabels: {
      col0: "Compatible Models",
      col1: "Type",
      col2: "Dimensions",
      col3: "Holes",
      caption:
        "Custom sizes available on request.",
    },

    standardDimensions: [
      { spec: "Muller Martini\n301, 304, 361", od: "Front",      id: "540×90×12mm",  thickness: "12×M10"         },
      { spec: "Muller Martini\n301, 304, 361", od: "Left&Right", id: "392×90×12mm",  thickness: "8×M10"          },
      { spec: "Müller Martini\n3675 Orbit",    od: "Front",      id: "580×115×12mm", thickness: "12×M10, 1×Slot" },
      { spec: "Müller Martini\n3675 Orbit",    od: "Left&Right", id: "450×115×12mm", thickness: "15×M10, 2×Slot" },
    ],

    relatedBladeIds: ["paper-cutting-blades", "tissue-log-saw-blades"],
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
