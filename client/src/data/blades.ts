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
  image?: string;
  link?: string;
}

/** One row in the Common Standard Dimensions table (ComprehensiveData) */
export interface StandardDimension {
  spec?: string; // Optional first column: e.g. "450 * 51 * 12/10"
  dimension?: string; // Alternative to od: full dimension spec "L × W × T"
  od?: string; // Outer Diameter (or Length for straight blades)
  bolt?: string; // Alternative to id: bolt hole spec (e.g. "M12")
  id?: string; // Inner Diameter / bore (or Width for straight blades)
  type?: string; // Alternative to thickness: knife type
  thickness?: string; // Blade thickness (circular/disc blades)
  length?: string; // Blade length (shredder inserts) or Edge Thickness
  teeth?: string; // Tooth count (shredder inserts) or Body Thickness
  pcs?: string; // Pieces per set (shear blades — upper + lower)
  bore?: string; // Bore / shaft profile description (e.g. "Hex Ø70 mm", "Splined")
  hooks?: string; // Claw / hook count or clearance spec (e.g. "8-Claw", "±0.02 mm")
  oem?: string; // Typical OEM platform / compatible machine model
}

// ===== BLADE CATEGORY TYPES =====
// Organised by cutting process / application cluster
export type BladeCategoryType =
  | "slitter_knives" // Rotary slitters · corrugated scorer · nonwoven · film · battery foil
  | "shredder_blades" // Twin-shaft · single-shaft · rubber shredder · scrap chopper
  | "granulator_blades" // Plastic granulator / crusher knives
  | "log_saw_blades" // Tissue / log circular saw blades
  | "shear_blades" // Guillotine shear · metal shear knives · paper trim blades
  | "cold_saw_blades" // Metal cold circular saw blades
  | "wood_chipper" // Drum chipper · disc chipper · biomass chipper knives
  | "custom_profile"; // Custom profile / special-shaped blades

// ===== BLADE SECTOR TYPE (second filter axis, mirrors machines.ts `tonnage`) =====
export type BladeSectorType =
  | "recycling"
  | "paper"
  | "converting"
  | "metal"
  | "new_energy"
  | "wood"
  | "other";

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
  specs: BladeSpec[]; // Key specs: ProductCard + DecisiveSpecs table

  // ── Optional list-page decorators ────────────────────────────────────────
  badge?: string;
  badgeColor?:
    | "green"
    | "blue"
    | "red"
    | "slate"
    | "purple"
    | "orange"
    | "teal";

  // ── Detail page ──────────────────────────────────────────────────────────
  gallery?: string[]; // [0–3] thumbnail track · [4] DecisiveSpecs · [5] ComprehensiveData
  fullDescription?: string; // PageMeta description (longer copy)
  components?: BladeComponent[]; // TechnicalAudit cards
  standardDimensions?: StandardDimension[]; // ComprehensiveData table

  // ── Detail page table label overrides (for non-circular blades) ──────────
  dimensionLabels?: {
    col0?: string; // optional first "Specification" column
    col1?: string; // replaces "Outer Diameter (OD)"
    col2?: string; // replaces "Inner Diameter (ID)"
    col3?: string; // replaces "Thickness"
    col4?: string; // replaces "Teeth" (length/teeth mode only)
    caption?: string; // replaces default table footnote
  };

  // ── Meta / utility ────────────────────────────────────────────────────────
  relatedBladeIds?: string[];
  isFeatured?: boolean;
  catalogUrl?: string;
  compatibleMachines?: string[]; // OEM brand compatibility e.g. ["BHS", "Tidland", "EREMA"]

  // ── SEO — AggregateOffer price range (Google Rich Results) ──────────────
  offers?: {
    lowPrice: number;
    highPrice: number;
  };

  // ── SEO — FAQPage schema (ProductFAQ component) ───────────────────────────
  // Rendered by <ProductFAQ> just above the RFQ form.
  // All questions are injected as FAQPage JSON-LD for Google SERP rich results.
  faqs?: {
    technical: Array<{ question: string; answer: string }>;
    company: Array<{ question: string; answer: string }>;
  };
}

export interface BladeAggregateOffer {
  "@type": "AggregateOffer";
  lowPrice: number;
  highPrice: number;
  priceCurrency: "USD";
  availability: "https://schema.org/InStock";
  offerCount: string;
}

// ===== BLADE DATA =====
export const blades: Blade[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Slitter Knives & Circular Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rotary-slitter-knives",
    name: "Film & Tape Slitter Knives",
    fullName:
      "Precision Rotary Slitter Knives for Film, Tape & Flexible Packaging Converting",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Film & Tape Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-09.webp",
    badge: "Best Seller",
    badgeColor: "green",
    gallery: [
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-09.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-02.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-00.webp",
    ],

    // Shortened for SEO Meta Description & UI Product Cards (< 155 chars)
    description:
      "Precision-ground circular slitter blades for BOPP, BOPET & CPP film, PE stretch film, PSA tape & nonwoven converting. \u00b10.002\u202fmm thickness tolerance, \u22640.02\u202fmm T.I.R. runout. Shear, score & razor profiles in M2 HSS, D2 & ASP23 PM steel with optional TiN & DLC anti-stick coatings. Drop-in OEM fit for Tidland, Kampf, Atlas & Dusenbery slitter systems.",

    // Structured for B2B reading flow and technical authority
    fullDescription:
      "Circular rotary slitter knives and blades operate at the intersection of dimensional precision and material science. On a converting line running BOPP or BOPET film at 400\u2013600\u202fm/min, a rotary slitting blade thickness tolerance error of 0.005\u202fmm per knife compounds across a multi-knife arbor stack, producing visible slit-width deviation, edge curl, and dust that contaminates downstream rewinding and packaging equipment. Sureay rotary slitter blades are manufactured to \u00b10.002\u202fmm thickness tolerance and \u226420.02\u202fmm total indicated runout (T.I.R.)\u2014tolerances that hold across the full production diameter, not just at the bore.\n\nAlloy selection is application-determined. Standard converting of coated paper and kraft board runs on 52100 bearing steel or D2 cold-work tool steel. Abrasive substrates\u2014battery-grade aluminum and copper electrode foils for EV lithium cells, fiberglass-reinforced packaging, silicon-coated release liners\u2014require ASP23 or ASP52 powder-metallurgy (PM) steel or solid carbide for acceptable edge life. Flexible plastic films (BOPP, BOPET, CPP, PE stretch film) are routinely processed on M2 HSS blades with optional TiN or DLC PVD surface coating to prevent adhesive film transfer and reduce friction-induced web heating.\n\n## By Cutting Method\n\n**Shear Slitting (Matched Top & Bottom Knife Pairs):** The scissor action between the dished upper knife and grooved lower anvil knife generates a clean shear cut with zero tensile loading on the web. Knife-to-knife clearance is typically set at 0.05\u20130.15\u202fmm (substrate-dependent); our grinding tolerances ensure this clearance is consistent across the full slit width. Critical for paper, non-wovens, and light flexible films where edge deformation is unacceptable.\n\n**Crush/Score Cutting (Circular Blade Against Rubber Anvil Roll):** A hardened, sharp-edged blade penetrates through a pressure-sensitive adhesive laminate, foam, or multi-layer packaging web against a controlled-hardness rubber anvil. Blade profile geometry and bevel angle are optimized per substrate to prevent adhesive squeeze-out and delamination at the cut edge. The standard choice for pressure-sensitive tape, foam die-cutting, and medical packaging splitting.\n\n**Razor Slitting (Free-Float or Fixed Single Blade):** Ultra-sharp, thin-profile blades trim edge waste from cast film extrusion lines, oriented film lines, and nonwoven spunbond production at speeds above 500\u202fm/min. Blade geometry is optimized for minimum web drag and maximum edge cleanliness, preventing edge curl and electrostatic discharge that cause web break events on high-speed lines.\n\n## By Material & Industry\n\n**Flexible Packaging Films:** BOPP, BOPET, CPP, PE/PP stretch film, shrink sleeve. High-speed film slitting requires precise runout control to prevent knife wobble-induced web tension spikes. M2 HSS with optional DLC coating eliminates film transfer adhesion on the blade face.\n\n**Non-Wovens & Medical Fabrics:** Spunbond PP, meltblown, SMS medical fabrics, HEPA filter media. Specialized rake angles prevent fiber fraying and web slippage during slitting of loose-structure materials at high line tensions.\n\n**Pressure-Sensitive Tapes & Labels:** Masking, duct tape, double-sided foam, label stock, transfer adhesive. TiN and Teflon anti-adhesion coatings reduce cleaning frequency by 60\u201380%, extending Mean Time Between Replacements on the most demanding tape-slitting applications.",
    link: "/products/rotary-slitter-knives",
    isFeatured: true,

    compatibleMachines: [
      "Tidland",
      "Mario Cotta",
      "Dusenbery",
      "Kampf",
      "Atlas",
      "Goebel",
      "BHS",
      "Agnati",
    ],

    specs: [
      {
        label: "Material",
        value: "52100 / D2 / M2 HSS / ASP23 PM / Solid Carbide",
      },
      {
        label: "Cutting Styles",
        value: "Shear Slitting, Score / Crush Cutting, Razor Slitting",
      },
      {
        label: "Outer Diameter",
        value: "50\u2013200\u202fmm (custom OD available)",
      },
      {
        label: "Tolerance",
        value:
          "\u00b10.002\u202fmm thickness | \u22640.02\u202fmm T.I.R. runout",
      },
      { label: "Coatings", value: "TiN, DLC, Teflon, CrAlN (optional)" },
      {
        label: "Applications",
        value:
          "BOPP / BOPET / CPP Film, PE Stretch Film, PSA Tape, Non-Wovens, Flexible Packaging",
      },
    ],

    components: [
      {
        id: "multi-material-compatibility",
        tag: "METALLURGY",
        title: "Application-Specific Tool Steels",
        description:
          "Material matched to your web. 52100 carbon steel for standard packaging film liners and coated substrates; M2 HSS for abrasive plastic films; ASP23 PM or solid carbide for silica-coated release liners and fiberglass-reinforced laminates. Every grade stocked and ready for fast-turn OEM delivery.",
      },
      {
        id: "advanced-coating-systems",
        tag: "EDGE RETENTION",
        title: "Anti-Stick PVD Coatings",
        description:
          "TiN and DLC coatings reduce surface adhesion by up to 80%, eliminating adhesive build-up on blade faces during PSA tape and adhesive-laminate slitting. Lower friction means cooler running, longer edge life, and fewer cleaning stops per shift.",
      },
      {
        id: "five-cutting-applications",
        tag: "PROCESS CAPABILITY",
        title: "Optimized Edge Geometries",
        description:
          "Single bevel, double bevel, and blunt-edge profiles engineered for shear pairs, crush/score anvil cutting, and razor trim. Profiled for your line speed and web tension \u2014 specify cutting method and substrate and we match the geometry.",
      },
    ],

    dimensionLabels: {
      col0: "Blade Type / Application",
      col1: "OD (mm)",
      col2: "ID (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard shear-pair dimensions. Top (dished) and bottom (anvil groove) blades supplied as matched pairs. Custom OD / ID and groove profiles on request.",
    },

    standardDimensions: [
      {
        spec: "Top Blade \u2014 Tidland / Atlas",
        od: "75",
        id: "25.4",
        thickness: "1.0 / 1.2",
      },
      {
        spec: "Bottom Anvil \u2014 Tidland / Atlas",
        od: "70",
        id: "25.4",
        thickness: "8 / 10",
      },
      {
        spec: "Top Blade \u2014 Kampf / Dusenbery",
        od: "100",
        id: "32",
        thickness: "1.2 / 1.5",
      },
      {
        spec: "Bottom Anvil \u2014 Kampf / Dusenbery",
        od: "80",
        id: "60",
        thickness: "16 / 20",
      },
      {
        spec: "Top Blade \u2014 Goebel / BHS / Agnati",
        od: "118",
        id: "80",
        thickness: "1.2 / 2.0",
      },
      {
        spec: "Bottom Anvil \u2014 Goebel / BHS / Agnati",
        od: "100",
        id: "70",
        thickness: "16 / 20",
      },
    ],

    relatedBladeIds: ["rotary-slitter-knives-paper", "metal-foil-strip-slitter-knives", "bottom-grooved-anvil-knives", "nonwoven-slitter-knives"],
    offers: {
      lowPrice: 15,
      highPrice: 150,
    },
    faqs: {
      technical: [
        {
          question:
            "What thickness tolerance should I specify for blades on a multi-knife arbor stack?",
          answer:
            "For shear slitting of flexible films and foils, specify \u00b10.002\u202fmm thickness tolerance and \u226420.02\u202fmm T.I.R. runout. A 0.005\u202fmm error per blade compounds across a 12-knife stack, producing visible slit-width deviation and web tension spikes. We grind every blade to these tolerances and verify on a CMM before dispatch.",
        },
        {
          question:
            "What is \u2018over-speed ratio\u2019 for top/bottom shear knives and why does it matter?",
          answer:
            "Over-speed ratio is the intentional rotational speed differential between the top knife arbor and bottom anvil arbor\u2014typically set at 2\u20135% above web speed. This differential creates a micro-shear action at the cut point, producing a cleaner edge and reducing heat build-up versus a purely tangential cut. At higher over-speed ratios cut quality improves but edge wear accelerates; at zero differential the blade acts more like a crush cutter. Your slitter OEM specifies the designed over-speed ratio; we supply matched pairs optimized for that setting.",
        },
        {
          question:
            "How do I prevent adhesive film transfer and build-up on slitter blade faces?",
          answer:
            "Adhesive build-up on blade faces increases friction, raises web temperature, and causes material transfer contamination. We offer TiN (titanium nitride) and DLC (diamond-like carbon) PVD coatings that reduce surface adhesion by up to 80%, extending clean-running intervals on pressure-sensitive tape and adhesive laminate slitting applications.",
        },
        {
          question:
            "When should I upgrade from D2 to powder-metallurgy (PM) steel for flexible film slitting?",
          answer:
            "PM steel (ASP23, ASP52) is recommended when slitting highly abrasive flexible substrates such as fiberglass-reinforced packaging films, silica-coated release liners, or ceramic-filled barrier films. These materials exceed the abrasion ceiling of D2 within a single production run due to hard mineral filler particles. PM grades deliver uniform carbide distribution and 50\u201380% longer edge life on highly abrasive flexible substrates.",
        },
        {
          question:
            "What surface coating is best for slitting pressure-sensitive adhesive tapes at high speed?",
          answer:
            "DLC (diamond-like carbon) PVD coating is the top specification for double-coated foam tape and transfer adhesive slitting. It reduces contact angle on the blade face by approximately 35\u00b0 versus uncoated D2, maintaining consistent slip through 8\u201312 hour production runs without cleaning stops. TiN is effective for single-faced masking tape and lightly adhesive label stock at a lower coating cost.",
        },
        {
          question:
            "Can Sureay supply matched top and bottom knife pairs verified to a specified shear clearance?",
          answer:
            "Yes. Matched shear pairs\u2014dished top blade and grooved anvil bottom blade\u2014are supplied with knife-to-knife clearance pre-verified against your substrate specification. We record OD, ID, thickness, and designed shear clearance for each matched pair on an engineering data sheet that ships with the tooling, allowing line operators to replicate the clearance setting on every reinstallation.",
        },
        {
          question:
            "What blade edge geometry is recommended for slitting meltblown nonwoven fabric without fiber fraying?",
          answer:
            "For meltblown and spunbond nonwoven fabrics (8\u201380 GSM), specify a positive rake angle (15\u00b0\u201320\u00b0) with Ra \u22640.4\u202f\u03bcm surface finish. This geometry shears through the loose fiber structure cleanly without lateral fiber displacement that causes frayed edges. For very lightweight meltblown (<15 GSM), an optional ESD (electrostatic discharge) coating prevents static-induced fiber attraction to the blade face.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question:
            "What makes Sureay\u2019s heat treatment different from cheaper alternatives?",
          answer:
            "Unlike standard quenching, every Sureay blade undergoes deep cryogenic treatment after vacuum hardening. This transforms retained austenite into martensite, boosting wear resistance by up to 40% and ensuring uniform hardness across the entire cutting edge.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement blades typically ship within 48 hours. Custom profiles take 10\u201315 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question:
            "What quality certifications does Sureay hold, and can you provide material test reports?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record, and a heat treatment batch certificate. For OEM qualification, full CMM dimensional reports and steel mill certificates are available on request.",
        },
        {
          question:
            "Can we trial a sample set before committing to a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2\u20135 blades) for machine fit verification and edge life testing. Standard sample lead time is 5\u20137 working days. For custom profiles, dimensional sign-off samples are produced before full production commences\u2014no tooling commitment until fit is confirmed.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.1 Rotary Slitter Knives for Paper & Tissue Converting
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rotary-slitter-knives-paper",
    name: "Paper Slitter Knives",
    fullName:
      "High-Speed Rotary Slitter Knives & Circular Cutting Blades for Paper, Tissue & Corrugated Converting",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Paper Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
    badge: "Paper Converting",
    badgeColor: "blue",
    gallery: [
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-02.webp",
      "/images/products/rotary-slitter-knives/paper-score-slitting-line.webp",
    ],
    description:
      "Precision-ground circular slitter knives for high-speed paper, tissue, and corrugated converting lines. Matched top/bottom shear pairs manufactured from D2, M2 HSS, or 52100 steel to ±0.002mm thickness tolerance. Optimized for clean fiber cuts on tissue logs, kraft paper, and corrugated board at speeds up to 600 m/min.",
    fullDescription:
      "Paper converting lines demand slitter knives that deliver consistent, fiber-dust-free cuts throughout multi-shift production runs. Sureay paper-grade rotary slitter knives are precision-ground from D2 tool steel (for standard paper and board) or M2 high-speed steel (for high-speed tissue and specialty papers) to exacting dimensional tolerances that prevent blade wobble and ensure uniform slit quality.\n\n## Paper-Specific Metallurgy\n\nUnlike plastic film or metal foil slitting, paper converting subjects the blade edge to continuous abrasive wear from cellulose fibers, sizing agents, and mineral fillers (calcium carbonate, kaolin). We select blade alloys specifically for paper applications:\n\n**D2 Tool Steel (HRC 60–62):** Standard grade for kraft paper, boxboard, and corrugated converting. The 12% chromium content provides excellent abrasion resistance against lignin-rich fibers and mineral filler compounds.\n\n**M2 High-Speed Steel (HRC 62–64):** Preferred for high-speed tissue and sanitary paper converting where line speeds exceed 400 m/min. The molybdenum and tungsten carbides maintain edge geometry under the thermal stress of ultra-high-speed cutting.\n\n**52100 Bearing Steel (HRC 58–60):** Cost-effective option for standard newsprint, magazine paper, and low-grade recycled fiber converting where wear rates are moderate.\n\n## Shear vs. Crush Cutting for Paper\n\nPaper converting employs two primary slitting methods:\n\n**Shear Slitting (Top/Bottom Knife Pairs):** Two circular knives rotating in opposite directions create a scissor-like shear action. This is the standard method for coated papers, tissue, and lightweight packaging grades where fiber pull and dust generation must be minimized. We supply matched pairs with controlled shear clearance (typically 0.02–0.05mm for tissue, 0.05–0.10mm for kraft paper).\n\n**Crush Cutting (Knife Against Anvil):** A hardened circular knife crushes the paper web against a grooved anvil roll. Used for heavy corrugated board and multi-ply packaging where shear clearance maintenance is impractical. The anvil blade (bottom position) is manufactured with multi-groove geometry that compresses and fractures the paper fibers.\n\n## Fiber-Dust-Free Performance\n\nFiber dust generated at the slit edge contaminates paper mill rewinding stations, degrades product quality on tissue and sanitary paper grades, and triggers unplanned cleaning stops. Our paper-grade slitter knives are precision-ground to Ra 0.2–0.4μm surface finish with controlled edge bevel angles that shear cleanly through cellulose fiber bundles rather than tearing or pulling. This reduces airborne fiber dust by approximately 60–70% compared to standard industrial knife grades.",
    link: "/products/rotary-slitter-knives-paper",
    isFeatured: false,
    compatibleMachines: [
      "Atlas Converting",
      "Parkinson",
      "Kampf",
      "Laem System",
      "Euromac",
      "Goebel IMS",
      "Fabio Perini",
      "Körber",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 Tool Steel, M2 HSS, 52100 Bearing Steel",
      },
      { label: "Hardness", value: "HRC 58–64 (grade dependent)" },
      {
        label: "Cutting Styles",
        value: "Shear Slitting (matched pairs), Crush Cutting (anvil pairs)",
      },
      { label: "Surface Finish", value: "Ra 0.2–0.4μm (precision ground)" },
      { label: "Tolerance", value: "Thickness: ±0.002mm | Runout: ≤0.02mm" },
      {
        label: "Application",
        value:
          "Tissue & Sanitary Paper, Kraft Paper, Corrugated Board, Coated Papers, Newsprint",
      },
    ],

    components: [
      {
        id: "paper-metallurgy",
        tag: "MATERIAL SCIENCE",
        title: "Paper-Optimized Alloy Selection",
        description:
          "Paper fibers contain abrasive mineral fillers (calcium carbonate, kaolin, titanium dioxide) that rapidly dull standard knife steels. Our D2 and M2 HSS grades are specifically heat-treated for paper converting applications, delivering 40–60% longer edge life than general-purpose slitter knives on coated and filled paper substrates.",
      },
      {
        id: "shear-clearance",
        tag: "CUTTING PRECISION",
        title: "Controlled Shear Clearance for Fiber-Dust-Free Cuts",
        description:
          "Matched top/bottom shear pairs are pre-verified to tissue-grade clearance specifications (0.02–0.05mm for ultra-thin tissue, 0.05–0.10mm for kraft paper). This controlled clearance shears cleanly through cellulose fiber bundles without tearing or generating airborne fiber dust that contaminates rewinding stations and degrades product quality.",
      },
    ],

    dimensionLabels: {
      col0: "Blade Type",
      col1: "Outer Diameter",
      col2: "Inner Diameter",
      col3: "Thickness",
      caption:
        "* Standard dimensions for paper converting. Top blades (dished profile for shear cutting) and bottom blades (grooved anvil for crush cutting). Custom OD/ID available for specific machine models.",
    },

    standardDimensions: [
      {
        spec: "Top Blade (Shear)",
        od: "75 mm",
        id: "45 mm",
        thickness: "1.0 / 1.2 mm",
      },
      {
        spec: "Bottom Anvil",
        od: "70 mm",
        id: "45 mm",
        thickness: "10 / 8 mm",
      },
      {
        spec: "Top Blade (Shear)",
        od: "100 mm",
        id: "32 mm",
        thickness: "1.2 mm",
      },
      {
        spec: "Bottom Anvil",
        od: "80 mm",
        id: "60 mm",
        thickness: "20 / 16 mm",
      },
      {
        spec: "Top Blade (Tissue)",
        od: "150 mm",
        id: "80 mm",
        thickness: "1.5 mm",
      },
      {
        spec: "Bottom Anvil",
        od: "108 mm",
        id: "80 mm",
        thickness: "20 / 18 mm",
      },
    ],

    relatedBladeIds: [
      "rotary-slitter-knives",
      "tissue-log-saw-blades",
      "corrugated-slitter-scorer-blades",
    ],
    offers: {
      lowPrice: 20,
      highPrice: 280,
    },
    faqs: {
      technical: [
        {
          question:
            "What material grade should I use for high-speed tissue converting at 500 m/min?",
          answer:
            "Specify M2 high-speed steel at HRC 62–64 for tissue converting above 400 m/min. The molybdenum and tungsten carbides in M2 maintain edge geometry under the thermal cycling generated by ultra-high-speed cutting, delivering 2–3× longer campaign life than D2 on lightweight tissue grades (12–18 GSM).",
        },
        {
          question:
            "How do I prevent fiber dust contamination at the slit edge?",
          answer:
            "Fiber dust is primarily caused by excessive shear clearance (>0.10mm on tissue) or rough blade surface finish (Ra >0.6μm) that tears fiber bundles rather than shearing cleanly. Specify matched shear pairs with pre-verified clearance (0.02–0.05mm for tissue, 0.05–0.10mm for kraft paper) and Ra ≤0.4μm surface finish. This reduces airborne dust by 60–70% compared to standard industrial knife grades.",
        },
        {
          question:
            "Should I use shear slitting or crush cutting for corrugated board converting?",
          answer:
            "For corrugated board (B/C/E flute), crush cutting against a grooved anvil roll is the standard method. The anvil blade compresses and fractures the paper fibers cleanly without requiring precise shear clearance maintenance. Shear slitting is reserved for lightweight coated papers and tissue where fiber pull must be minimized. For corrugated applications above 200 m/min, specify tungsten carbide anvil blades to resist the compressive wear from multi-ply board stock.",
        },
        {
          question:
            "How often should paper slitter knives be reground, and how many regrinds are possible?",
          answer:
            "Paper slitter knives on tissue converting lines (400–600 m/min) typically require regrinding every 40–60 operating hours due to the high cutting speeds and abrasive mineral fillers in tissue paper. For kraft paper and board converting (200–300 m/min), the regrind interval extends to 80–120 hours. M2 HSS and D2 knives can be reground 4–6 times before the OD falls below minimum operational diameter. We offer a regrinding service with hardness re-verification and CMM dimensional check included.",
        },
        {
          question:
            "What causes uneven slit edge quality across the full width of the paper web?",
          answer:
            "Uneven slit quality (clean cut on one side, fiber pull on the other) indicates uneven blade mounting or differential thermal expansion across the arbor. Verify that all knives on the arbor are ground to ±0.002mm thickness tolerance and that the arbor shaft runout is ≤0.02mm T.I.R. Thermal expansion can be mitigated by using matched metallurgy (all D2 or all M2) across the full knife set, ensuring uniform thermal expansion coefficients during high-speed operation.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply knives compatible with our existing Atlas Converting or Kampf slitter/rewinder?",
          answer:
            "Yes. Send us your current knife sample or machine model number. We will confirm OD, ID, bore profile, and blade thickness, and supply direct-replacement knives manufactured to OEM specifications. Custom groove patterns for anvil rolls are available for specific corrugated and board converting applications.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.2 Rotary Slitter Knives for Metal Foil Processing
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-foil-strip-slitter-knives",
    name: "Coil & Strip Slitters",
    fullName: "Precision Rotary Slitter Knives for Metal Strip, Coil & Thin-Gauge Foil Slitting",
    category: "slitter_knives",
    sector: "metal",
    categoryDisplay: "Metal Strip Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-00.webp",
    badge: "Metal Processing",
    badgeColor: "purple",
    gallery: [
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-00.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-03.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-02.webp",
    ],
    description:
      "High-precision circular slitter knives for metal service centers and cold rolling mills. ASP23/ASP52 PM tool steel and solid tungsten carbide ground to strict ±0.001\u202fmm thickness tolerance. Engineered for burr-free gang slitting of aluminum strip & coil, copper strip, stainless steel, and grain-oriented silicon steel.",
    fullDescription:
      "Precision metal strip and foil slitting demands metallurgical performance and dimensional accuracy far exceeding standard shearing applications. When processing thin-gauge metals (0.01mm to 1.5mm), even a microscopic blade defect or thickness deviation will induce camber (lateral bow), edge burrs, and rejected coils. Sureay rotary slitter knives are precision-ground to ±0.001mm thickness tolerance with ≤0.01mm total indicated runout (T.I.R.), ensuring perfect alignment across multi-knife arbor stacks.\n\n## Advanced Metallurgy for Thin Metals\n\nSlitting different metal alloys requires specific blade materials to prevent rapid dulling, edge chipping, or material galling (cold welding).\n\n**ASP23 Powder Metallurgy (PM) Steel:** A massive upgrade over conventional D2. Its ultra-fine, uniform carbide structure delivers 3–5× longer edge life on aluminum packaging foil, brass strips, and general thin-gauge carbon steel without micro-chipping.\n\n**ASP52 PM Steel:** Engineered for high-tensile materials. With 11% vanadium content, ASP52 provides the extreme abrasion resistance required for slitting hard stainless steel strips, grain-oriented silicon steel (transformer cores), and beryllium copper.\n\n**Solid Tungsten Carbide:** The ultimate specification for ultra-thin foils (<0.05mm) where razor-sharp, zero-burr edges are mandatory over extended, high-speed production campaigns.\n\n## Defeating Cumulative Arbor Error\n\nOn gang slitting lines, 10 to 40 circular knives may be stacked on a single arbor. Each knife's thickness error compounds cumulatively: a ±0.003mm error per blade yields a massive ±0.060mm error across a 20-knife stack, guaranteeing out-of-spec coil widths. We grind every metal-grade slitter knife and matching spacer to a strict ±0.001mm thickness tolerance, verifying them on CMM equipment to ensure zero cumulative error.\n\n## Anti-Galling Surface Finish\n\nWhen slitting non-ferrous metals like aluminum and soft copper, metal dust tends to adhere to the blade face (galling), which severely scratches the surface of the slit coils. Sureay metal slitter knives feature a highly polished, mirror-lapped side finish (Ra ≤0.02μm) that drastically reduces friction and prevents material adhesion, ensuring pristine coil edges.",
    link: "/products/metal-foil-strip-slitter-knives",
    isFeatured: true,
    compatibleMachines: [
      "Kampf",
      "Sundwig",
      "GOEBEL IMS",
      "Fagor Arrasate",
      "Camu",
      "Heinrich Georg",
      "Kohler",
      "Yuri Roll",
      "Hohsen",
    ],

    specs: [
      {
        label: "Material",
        value: "ASP23, ASP52 (PM Steel), Solid Tungsten Carbide, D2/D3",
      },
      {
        label: "Hardness",
        value: "HRC 64–67 (PM Steel) | HRA 91–92 (Carbide)",
      },
      { label: "Thickness Tol.", value: "Strictly ±0.001 mm" },
      { label: "Runout (T.I.R.)", value: "≤ 0.01 mm" },
      {
        label: "Surface Finish",
        value: "Mirror-lapped Ra ≤0.02μm — prevents galling on Al/Cu",
      },
      {
        label: "Application",
        value: "Aluminum Foil, SS Strips, Silicon Steel, Brass/Copper",
      },
    ],

    components: [
      {
        id: "pm-metallurgy",
        tag: "DURABILITY",
        title: "Powder Metallurgy (PM) Steel",
        description:
          "ASP23 and ASP52 PM steels eliminate the banded carbide segregation found in cast D2. This sub-micron grain structure prevents edge chipping when cutting hard, high-tensile stainless or silicon steel strips.",
      },
      {
        id: "cumulative-tolerance",
        tag: "PRECISION",
        title: "Zero Cumulative Error",
        description:
          "On gang slitting setups, blade thickness errors stack up quickly. Our ±0.001mm precision grinding ensures your arbor dimensions remain perfectly within specification, saving hours of setup and shimming time.",
      },
      {
        id: "anti-galling",
        tag: "SURFACE QUALITY",
        title: "Anti-Galling Polish",
        description:
          "Slitting aluminum and copper often causes metal dust to 'cold weld' to the blade, scratching the coil edge. Our mirror-lapped side faces (Ra ≤0.02μm) drastically reduce friction, preventing material adhesion entirely.",
      },
    ],

    dimensionLabels: {
      col0: "Typical Application",
      col1: "Outer Diameter",
      col2: "Inner Diameter",
      col3: "Thickness",
      caption:
        "* Dimensions represent common metal service center standards. We manufacture to exact machine specifications and can supply matching high-precision spacers ground to the same ±0.001mm tolerance.",
    },

    standardDimensions: [
      {
        spec: "Thin Foil Slitter",
        od: "100 mm",
        id: "40 mm",
        thickness: "1.0 / 1.5 mm",
      },
      {
        spec: "Precision Strip Slitter",
        od: "150 mm",
        id: "80 mm",
        thickness: "2.0 / 3.0 mm",
      },
      {
        spec: "General Strip Slitter",
        od: "200 mm",
        id: "120 mm",
        thickness: "3.0 / 4.0 mm",
      },
      {
        spec: "Silicon / Stainless Steel",
        od: "250 mm",
        id: "150 mm",
        thickness: "4.0 / 5.0 mm",
      },
      {
        spec: "Heavy Gauge Strip",
        od: "300 mm",
        id: "200 mm",
        thickness: "5.0 / 10.0 mm",
      },
    ],

    relatedBladeIds: ["rotary-slitter-knives", "metal-coil-slitting-knives", "scrap-chopper-blades"],
    offers: {
      lowPrice: 45,
      highPrice: 750,
    },
    faqs: {
      technical: [
        {
          question:
            "Should I use D2 or ASP23 for slitting stainless steel strips?",
          answer:
            "While D2 is adequate for soft carbon steels, slitting high-tensile stainless steel causes rapid wear and micro-chipping on D2 edges. ASP23 Powder Metallurgy steel is highly recommended for stainless strips under 1.0mm thickness. Its uniform carbide structure resists chipping, delivering 3 to 5 times the edge life of D2 and minimizing machine downtime.",
        },
        {
          question:
            "How do you prevent 'galling' or metal build-up when slitting aluminum?",
          answer:
            "Aluminum is highly susceptible to galling (cold welding to the blade). We prevent this by mirror-lapping the side faces of the blades to a surface roughness of Ra ≤0.02μm. This ultra-smooth finish reduces the friction coefficient, preventing aluminum particles from adhering to the knife and scratching your finished coils.",
        },
        {
          question: "Why is a ±0.001mm thickness tolerance necessary?",
          answer:
            "In gang slitting operations, multiple knives and spacers are stacked on the arbor. If a blade has a ±0.005mm tolerance, stacking 20 blades creates a cumulative error of ±0.100mm. This will cause the slit coils to be out of width specification and induce camber (bowing). Our ±0.001mm tolerance ensures absolute precision across the entire arbor stack.",
        },
        {
          question: "Can you supply matching precision spacers?",
          answer:
            "Yes, precision slitting requires both knives and spacers to have identical tolerances. We manufacture lightweight aluminum, steel, and bonded-rubber strippers/spacers ground to the same ±0.001mm thickness tolerances as our slitter knives.",
        },
      ],
      company: [
        {
          question: "Do you supply matched knife sets with inspection reports?",
          answer:
            "Yes. For multi-knife gang slitting arbors, we supply matched sets accompanied by a CMM inspection report. This documents the exact thickness of each individual knife, guaranteeing the set meets your cumulative tolerance requirements before installation.",
        },
        {
          question:
            "What is the lead time for PM steel or Carbide slitter knives?",
          answer:
            "Standard D2 and basic PM steel sizes can typically be manufactured in 10–15 working days. Solid Tungsten Carbide and highly specialized PM alloys require complex lapping and grinding, usually taking 15–25 working days depending on the OD and tolerance requirements.",
        },
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3a. Twin Shaft Shredder Blades — Recycling & Waste
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "twin-shaft-blades-recycling",
    name: "Twin Shaft Shredder Blades",
    fullName:
      "Heavy-Duty D2/SKD11 Twin Shaft Claw Blades for Plastic, MSW & Wood Recycling",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades-01.webp",
    gallery: [
      "/images/products/shredder-blades/shredder-blades-01.webp",
      "/images/products/shredder-blades/shredder-blades-for-recycling.webp",
      "/images/products/shredder-blades/twin-shaft-shredder-blade-01.webp",
    ],
    description:
      "Chromium carbide D2/SKD11 twin-shaft shredder blades engineered on the intersecting scissor-action principle for high-volume MSW, bulky plastics, e-waste & wood pallets. Vacuum-hardened HRC 55\u201362 with deep cryogenic treatment for extended blade life. Custom 3\u201312 claw geometries. Wire-EDM bores for zero-backlash fit on Weima, Untha, SSI & Vecoplan rotors.",

    fullDescription:
      "Twin-shaft shredder blades operate on the intersecting scissor-action principle\u2014two counter-rotating shafts with interlocking claw blades that shear feedstock through a scissor interface, delivering aggressive grabbing force with low torque demand.\n\nWhen processing highly abrasive bulky waste\u2014such as metal-contaminated MSW, thick-wall plastic purges, or mixed rigid plastic bales\u2014substandard blades suffer from premature edge rounding, bore elongation, and catastrophic hook fracture.\n\nSureay multi-shaft shredder blades are manufactured from D2 (1.2379), SKD11, and 42CrMo tool steels, vacuum-hardened and tempered through 4–5 cycles to achieve a fully stabilized martensitic microstructure (HRC 55–62). The deep cryogenic sub-zero treatment stage (−196°C, 24-hour soak) eliminates retained austenite and substantially increases wear resistance without sacrificing the toughness margin needed to prevent bulk fracture on contaminated feedstocks.\n\n## FEA-Optimized Hook Geometry\n\nThe profile of the cutting hook dictates grabbing efficiency and resistance to fatigue. Sureay utilizes Finite Element Analysis (FEA) simulation to optimize stress distribution across the blade during high-torque impacts. Three-claw (3C) designs deliver aggressive grabbing force for large timber and IBC totes; 8-claw (8C) configurations are optimized for mixed rigid plastics and MSW; 12-claw (12C) variants produce finer output particle sizing for downstream processing. All hook profiles are reinforced at the root radius to resist deformation under sustained cyclic loading.\n\n## Precision Wire-EDM Bores\n\nA loose fit between the blade bore and the rotor shaft creates micro-impacts that progressively elongate the bore and destroy the shaft. Sureay eliminates this failure mode: all inner mounting bores—hexagonal, octagonal, or splined—are processed using precision Wire-EDM, guaranteeing a zero-backlash, drop-in fit for SSI, Untha, Weima, and Vecoplan rotor systems.\n\n## Alloy Selection by Feedstock\n\nD2 (1.2379) — Mixed Plastics & Light Waste: Post-consumer HDPE bottles, PET trays, PP moulded parts, and mixed rigid plastic bales. Cost-effective chromium-carbide abrasion resistance for general recycling lines.\n\nSKD11 — Abrasive Contaminated Streams: Glass-filled engineering plastics, dirty agricultural films, and high-contamination post-industrial scrap. SKD11's superior toughness extends insert service life on hard-face materials within contaminated streams.\n\n42CrMo — Timber & Metal-Inclusive Waste: Wood pallets, bulky MSW, and post-industrial scrap with metal contamination risk. 42CrMo's higher impact energy absorption prevents brittle fracture that causes catastrophic rotor damage on a metal strike.",

    link: "/products/twin-shaft-blades-recycling",
    isFeatured: true,
    compatibleMachines: [
      "WEIMA",
      "UNTHA",
      "Vecoplan",
      "SSI Shredding Systems",
      "Lindner",
      "Erdwich",
      "BRT Hartner",
      "ZERMA",
    ],

    specs: [
      { label: "Material", value: "D2 (1.2379), SKD11, 42CrMo" },
      { label: "Hardness", value: "HRC 55–62 (4–5 tempering cycles)" },
      { label: "Claw Count", value: "3-Claw · 8-Claw · 12-Claw (custom)" },
      { label: "Thickness", value: "10 mm – 150 mm" },
      {
        label: "Bore Design",
        value: "Precision Wire-EDM: Hex / Octagonal / Splined",
      },
      { label: "Compatibility", value: "Weima, Untha, SSI, Vecoplan, Genox" },
      {
        label: "Application",
        value: "MSW · Plastics · Wood Pallets · Bulky Waste",
      },
    ],

    components: [
      {
        id: "fea-geometry",
        tag: "ENGINEERING",
        title: "FEA-Optimized Hook Profile",
        description:
          "Hook geometry designed via Finite Element Analysis to eliminate stress concentrators. 3-claw, 8-claw, and 12-claw configurations provide the correct grabbing force for every feedstock type.",
      },
      {
        id: "wire-edm",
        tag: "PRECISION",
        title: "Precision Wire-EDM Bores",
        description:
          "All mounting bores are cut by Wire-EDM to ±0.01mm, guaranteeing a zero-backlash drop-in fit that eliminates the micro-rocking that causes shaft damage and bore elongation.",
      },
      {
        id: "cryogenic-treatment",
        tag: "METALLURGY",
        title: "Deep Cryogenic Treatment",
        description:
          "Post-hardening cryogenic processing at −196°C eliminates retained austenite, stabilizing the martensite microstructure for up to 40% greater wear resistance without reducing toughness.",
      },
    ],

    dimensionLabels: {
      col0: "Shredder Series",
      col1: "Blade Outer Diameter",
      col2: "Blade Thickness",
      col3: "Bore Size",
      col4: "Claw Configuration",
      caption:
        "* Standard series Φ150–Φ450 mm. Custom OD up to Φ800 mm, bore hex/octagonal/splined, and claw profiles available on request.",
    },

    standardDimensions: [
      {
        spec: "200 Series",
        od: "Φ 150 mm",
        thickness: "15 mm",
        bore: "Hex Ø70 mm",
        hooks: "5-Claw",
      },
      {
        spec: "400 Series",
        od: "Φ 180 mm",
        thickness: "20 mm",
        bore: "Hex Ø90 mm",
        hooks: "8-Claw",
      },
      {
        spec: "600 Series",
        od: "Φ 200 mm",
        thickness: "20 mm",
        bore: "Hex Ø140 mm",
        hooks: "8-Claw",
      },
      {
        spec: "800 Series",
        od: "Φ 250 mm",
        thickness: "25 mm",
        bore: "Hex Ø160 mm",
        hooks: "8-Claw",
      },
      {
        spec: "1000 Series",
        od: "Φ 300 mm",
        thickness: "30 mm",
        bore: "Hex Ø180 mm",
        hooks: "12-Claw",
      },
      {
        spec: "1200 Series",
        od: "Φ 350 mm",
        thickness: "40 mm",
        bore: "Splined Ø200 mm",
        hooks: "12-Claw",
      },
      {
        spec: "1500 Series",
        od: "Φ 400 mm",
        thickness: "40 mm",
        bore: "Splined Ø220 mm",
        hooks: "3-Claw",
      },
      {
        spec: "2000 Series",
        od: "Φ 450 mm",
        thickness: "30 mm",
        bore: "Splined Ø260 mm",
        hooks: "3-Claw",
      },
    ],
    relatedBladeIds: [
      "tire-shredder-blades",
      "single-shaft-rotor-inserts",
      "granulator-blades",
    ],
    offers: {
      lowPrice: 45,
      highPrice: 600,
    },
    faqs: {
      technical: [
        {
          question:
            "How do I choose between 3-claw, 8-claw, and 12-claw blade designs?",
          answer:
            "Claw count directly controls the blade's grabbing frequency and output particle size. 3-claw (3C) blades are designed for high-torque primary shredding of bulky stock—wooden pallets and large HDPE containers—where aggressive hook geometry provides maximum bite. 8-claw (8C) is the general-purpose standard for mixed MSW, plastic bales, and post-industrial scrap. 12-claw (12C) configurations produce finer output particles from lighter feedstocks such as rigid household plastics and packaging.",
        },
        {
          question:
            "Why does Sureay use Wire-EDM for inner bores instead of broaching?",
          answer:
            "Standard broaching creates dimensional tolerances of ±0.1–0.2mm and introduces residual surface stress in the bore wall. Over millions of rotor cycles, this gap allows micro-rocking—progressive bore elongation that eventually destroys the rotor shaft. Precision Wire-EDM machines bores to ±0.01mm accuracy with a stress-free cut surface, eliminating the clearance that causes micro-rocking.",
        },
        {
          question:
            "How do I choose between D2, SKD11, and 42CrMo for contaminated plastic or MSW shredding?",
          answer:
            "D2 (1.2379) is correct for post-consumer plastic bales with residual dirt and trace contamination. Upgrade to SKD11 when your feedstock includes glass-reinforced engineering plastics (PA66-GF30, ABS) mixed into contaminated streams. Select 42CrMo for timber or industrial scrap with high metal contamination risk—its higher impact energy absorption prevents brittle fracture on a metal strike.",
        },
        {
          question:
            "How often should twin-shaft shredder blades be indexed or replaced on a continuous recycling line?",
          answer:
            "On a 16-hour continuous line processing post-consumer HDPE and PP, schedule first indexing at 400–600 operating hours with D2, and 600–800 hours with SKD11 on clean feedstock. Contaminated or glass-filled streams reduce these intervals by 30–40%. Fixed tonnage-milestone indexing is recommended rather than waiting for visible edge rounding.",
        },
        {
          question:
            "Do you supply counter-knives and sizing screens as a complete tooling system?",
          answer:
            "Yes. We manufacture matched stationary counter-knives and perforated sizing screens as a complete twin-shaft shredding tooling system. Supplying rotor blades and counter-knives from the same grinding run ensures consistent shear clearance across the full rotor-to-bed interface.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question:
            "What makes Sureay's heat treatment different from cheaper alternatives?",
          answer:
            "Unlike standard single-cycle quenching, every Sureay shredder blade undergoes vacuum hardening followed by 4–5 tempering cycles and deep cryogenic treatment at −196°C. This stabilizes the full martensite microstructure, boosting wear resistance by up to 40%.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement blades typically ship within 48 hours. Custom profiles take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question: "What quality certifications does Sureay hold?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record, and a heat treatment batch certificate. For OEM qualification, full CMM dimensional reports and steel mill certificates are available on request.",
        },
        {
          question:
            "Can we trial a sample set before committing to a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2–5 blades) for machine fit verification and edge life testing. Standard sample lead time is 5–7 working days.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3b. Multi-Shaft Shredder Blades — Metal Processing
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "multi-shaft-blades-metal",
    name: "Metal Shredder Blades",
    fullName: "High-Impact Multi-Shaft Blades for Scrap Metal, ELV & E-Waste",
    category: "shredder_blades",
    sector: "metal",
    categoryDisplay: "Metal Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades-02.webp",
    badge: "Heavy Duty",
    badgeColor: "red",
    gallery: [
      "/images/products/shredder-blades/shredder-blades-02.webp",
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/shredder-blades-for-metal.webp",
    ],
    description:
      "Designed to survive the catastrophic shock loads of scrap metal, ELV (end-of-life vehicle), and e-waste twin-shaft shredding. Forged from premium H13 and 42CrMo (AISI 4140) alloy steels. These heavy-duty blades prioritize core toughness to prevent brittle fracture when striking solid metal inclusions.",
    fullDescription:
      "When a twin-shaft shredder encounters an engine block, a steel I-beam, or compacted e-waste, the blades face catastrophic shock loads measured in tens of thousands of Newtons per millisecond. Using standard high-carbon tool steels (like D2) in these applications leads to immediate brittle fracture and shattered hooks—causing severe rotor damage, unplanned downtime, and potentially dangerous projectile fragments.\n\nFor heavy metal processing, toughness is paramount over extreme hardness. Sureay engineers these specific blades from **H13 (AISI H13 / 1.2344)** hot-work tool steel and high-strength **42CrMo (AISI 4140)** alloy through a specialized deep-tempering thermal cycle. Surface hardness is held deliberately at HRC 50–54. This controlled lower hardness provides massive core elasticity, allowing the blade to absorb extreme kinetic impacts without chipping or shattering.\n\n## Low-Profile Hook Geometry for Maximum Biting Force\n\nMetal shredding requires immense biting force rather than grabbing frequency. Sureay designs 1-hook, 2-hook, and 3-hook low-profile geometries with heavy root thickness. These robust claw profiles can grip and shear thick metal casings, aluminum profiles, and automotive sub-assemblies without hook fracture.\n\n## Heavy Splined Bores: Zero-Slippage Torque Transfer\n\nHeavy scrap metal generates massive rotor reaction torques that can shear standard keyed bores. Sureay machines all inner bores for heavy metal shredders using precision Wire-EDM-cut spline profiles. This provides full circumferential torque engagement between the blade and the shaft—eliminating the key-shear failure mode and preventing the progressive bore-to-shaft fretting that destroys rotors in standard metal shredding operations.\n\n## Alloy Selection by Scrap Profile\n\n**H13 (1.2344) — E-Waste & Light Mixed Scrap:** Circuit board assemblies, aluminum extrusions, copper cable bundles, and ICT equipment. H13's superior hot-toughness handles the friction-induced heating peaks typical of electronics scrap.\n\n**42CrMo (AISI 4140) — ELV & Heavy Scrap:** Engine blocks, transmission casings, steel coil offcuts, and structural steel. 42CrMo's exceptional impact energy absorption (Charpy V-notch > 35J) is the definitive choice for the heaviest shock-load applications in automotive and metal demolition.",
    link: "/products/multi-shaft-blades-metal",
    isFeatured: true,
    compatibleMachines: [
      "Shred-Tech",
      "Arjes",
      "Forus",
      "SSI Shredding",
      "Bano",
      "Hammel",
    ],

    specs: [
      {
        label: "Material",
        value: "H13 (AISI H13 / 1.2344), 42CrMo (AISI 4140)",
      },
      {
        label: "Hardness",
        value: "HRC 50–54 (Optimized for Shock Absorption)",
      },
      { label: "Claw Geometry", value: "1, 2, or 3 Low-Profile Thick Hooks" },
      { label: "Thickness", value: "40 mm – 150 mm (Heavy Duty)" },
      {
        label: "Bore Design",
        value: "Heavy Splined / Multi-Keyway (Wire-EDM)",
      },
      { label: "OEM Fitment", value: "Shred-Tech, Forus, Arjes, SSI, Hammel" },
      {
        label: "Application",
        value: "Scrap Metal · ELV · E-Waste · Appliances (WEEE)",
      },
    ],

    components: [
      {
        id: "impact-alloy",
        tag: "METALLURGY",
        title: "Massive Core Toughness",
        description:
          "Held at HRC 50–54, H13 and 42CrMo alloys provide the massive core elasticity needed to absorb extreme kinetic impacts, avoiding the catastrophic shattering typical of D2 blades.",
      },
      {
        id: "heavy-spline",
        tag: "TORQUE TRANSFER",
        title: "Zero-Slippage Splines",
        description:
          "Full-circumference spline bores machined by Wire-EDM to ±0.01mm ensure zero-slippage torque transfer under extreme shredding loads, eliminating rotor shaft damage.",
      },
      {
        id: "low-profile-hooks",
        tag: "GEOMETRY",
        title: "Low-Profile Biting Hooks",
        description:
          "1 to 3 heavy-root-thickness hooks provide maximum biting force per stroke for shearing thick metal casings, without the fracture risks associated with multi-claw designs.",
      },
    ],

    dimensionLabels: {
      col0: "Scrap Class",
      col1: "Outer Diameter",
      col2: "Blade Thickness",
      col3: "Bore Configuration",
      col4: "Recommended Hooks",
      caption:
        "* Custom OD up to Ø800+ mm, specific spline profiles, and custom thicknesses available. Send us your rotor shaft drawing for an exact match.",
    },

    standardDimensions: [
      {
        spec: "E-Waste / Light Scrap",
        od: "Φ 300–450 mm",
        thickness: "40–60 mm",
        bore: "Hex / Light Splined",
        hooks: "3 Hooks",
      },
      {
        spec: "Appliances / Steel Drums",
        od: "Φ 450–600 mm",
        thickness: "60–80 mm",
        bore: "Medium Splined",
        hooks: "2–3 Hooks",
      },
      {
        spec: "ELV / Heavy Demolition",
        od: "Φ 600–800+ mm",
        thickness: "80–150 mm",
        bore: "Heavy Splined",
        hooks: "1–2 Hooks",
      },
    ],

    relatedBladeIds: ["metal-shear-knives", "scrap-chopper-blades"],
    offers: {
      lowPrice: 250,
      highPrice: 3500,
    },
    faqs: {
      technical: [
        {
          question:
            "Why choose H13 or 42CrMo over D2 for metal shredding applications?",
          answer:
            "D2 is optimized for wear resistance at the expense of toughness—it reaches HRC 58–62 but becomes brittle under extreme shock loading. When a D2 blade strikes an engine block, the impact energy exceeds the material's fracture toughness in microseconds, causing catastrophic hook shattering. H13 and 42CrMo (AISI 4140) possess inherently superior toughness; at HRC 50–54, they absorb the same impact energy elastically rather than fracturing.",
        },
        {
          question:
            "What hook count and profile should I specify for ELV automotive shredding?",
          answer:
            "For ELV primary shredding (car bodies, engine subassemblies), specify 1-hook or 2-hook low-profile designs with maximum root thickness. A low claw count concentrates the available machine torque onto fewer, robust hook contacts, generating the massive biting force needed to penetrate thick steel. High claw counts spread torque too thinly, causing the blade to slide over the metal rather than biting into it.",
        },
        {
          question:
            "How do splined bores prevent rotor shaft damage in heavy metal shredding?",
          answer:
            "In heavy metal shredding, peak rotor torque spikes to 3–5× steady-state load during a hard strike. Standard single-keyed bores concentrate all this torque on one point, progressively widening the keyway and ultimately shearing the key. Wire-EDM splined bores distribute this massive torque evenly across 10 to 20 contact faces around the full circumference, reducing peak stress and protecting your expensive rotor shaft.",
        },
        {
          question:
            "What are the warning signs that metal shredder blades need replacement?",
          answer:
            "Key indicators include: (1) Visible hairline fractures at the hook root; (2) Outer diameter (OD) wear exceeding 10–15mm below nominal, indicating a loss of shear clearance; (3) Bore elongation, meaning the blade rocks on the shaft even under full tightening torque; (4) A throughput reduction of >20% at a constant motor load, indicating the blades are pushing rather than shearing the scrap.",
        },
      ],
      company: [
        {
          question:
            "Can you supply blades for Shred-Tech, Arjes, or Forus shredding platforms?",
          answer:
            "Yes. We reverse-engineer replacement blades from factory-measured OEM samples for Shred-Tech ST series, Arjes Imperator/Orion, Forus heavy-duty shredders, and SSI platforms. Custom spline profiles and counter-bore patterns are produced with extreme precision using Wire-EDM.",
        },
        {
          question:
            "What is the lead time for heavy-duty metal shredder blades?",
          answer:
            "Standard H13 and 42CrMo grades in common dimensions are held in semi-finished stock and typically ship within 10–15 working days. For non-standard massive ODs or custom spline profiles requiring new tooling, lead time is 20–25 working days.",
        },
        {
          question:
            "What quality certifications and documentation do you provide?",
          answer:
            "Sureay is ISO 9001:2015 certified. For heavy metal shredder blades, we provide full traceability: Rockwell HRC hardness test reports (minimum 5 points per blade), Charpy impact test certificates for 42CrMo grades, CMM dimensional inspection records, and steel mill composition certificates.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3c. Twin Shaft Shredder Blades — Battery Recycling (New Energy)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "twin-shaft-blades-battery",
    name: "Battery Recycling Blades",
    fullName:
      "Precision Twin Shaft Shredder Blades for Li-Ion Battery Recycling",
    category: "shredder_blades",
    sector: "new_energy",
    categoryDisplay: "Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades.webp",
    badge: "New Energy",
    badgeColor: "teal",
    gallery: [
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/four-shaft-shredder-blade-00.webp",
    ],
    description:
      "Engineered for the critical pre-shredding of EV lithium-ion battery packs, modules, and cells under inert gas environments. Precision ground to ±0.02mm thickness parallelism to ensure exacting shear clearances that prevent foil tearing and thermal runaway. Specialized alloy selection and surface treatments resist the highly corrosive effects of LiPF6 battery electrolytes.",
    fullDescription:
      "The recycling of lithium-ion (Li-ion) batteries presents unique mechanical and chemical challenges that standard shredder blades cannot reliably handle. Pre-shredding of battery packs and cylindrical cells frequently occurs in nitrogen-purged atmospheres to suppress fire and thermal runaway risk. Standard shredder blades fail prematurely in this environment through two distinct mechanisms: electrolyte corrosion from LiPF6 and HF acid released during cell breach, and mechanical failure caused by imprecise shear clearances that fold—rather than cut—the thin copper (8–12μm) and aluminum (15–20μm) current collector foils inside battery cells.\n\n## Micro-Clearance Precision Grinding (±0.02mm)\n\nIf the gap between counter-rotating twin-shaft blades is too wide, battery foils do not shear—they fold, stretch, and wrap around the rotor, causing immediate jams in an inert gas environment. Clearing a rotor jam under nitrogen requires complete system shutdown, purge, and manual removal—hours of downtime consuming significant N₂. Sureay battery shredder blades are precision ground to ±0.02mm thickness parallelism across the full blade face, ensuring minimum consistent shear clearance across the entire rotor for clean, controlled cuts on pouch cells, prismatic modules, and cylindrical 18650/21700 battery packs.\n\n## Electrolyte Corrosion Resistance\n\nLiPF6 electrolytes hydrolyze on contact with atmospheric moisture to produce hydrofluoric acid (HF)—one of the most aggressively corrosive industrial chemicals. Standard D2 or SKD11 tool steels corrode rapidly in this environment, with surface pitting initiating at grain boundaries within 200–500 operating hours. Sureay applies specialized anti-corrosion surface treatments and selects corrosion-resistant alloy grades for battery recycling applications, significantly extending service intervals.\n\n## Precision Wire-EDM Bore Profiles\n\nBattery pre-shredders operate at precise, computer-controlled rotor speeds where bore-to-shaft backlash directly affects blade position accuracy and shear gap consistency. All bore profiles are Wire-EDM machined to ±0.01mm, ensuring zero rotational play that could cause shear clearance inconsistency during the precision shredding of battery foil stacks.",
    link: "/products/twin-shaft-blades-battery",
    isFeatured: false,

    specs: [
      { label: "Tolerance", value: "±0.02 mm Thickness Parallelism" },
      { label: "Hardness", value: "HRC 54–58" },
      { label: "Bore Design", value: "Precision Wire-EDM Hex / Splined" },
      { label: "Surface", value: "Anti-corrosion treatment available" },
      {
        label: "Application",
        value: "EV Battery Packs · Pouch Cells · 18650/21700",
      },
      { label: "Environment", value: "Inert gas (N₂ / Ar) compatible" },
    ],

    components: [
      {
        id: "micro-clearance",
        tag: "PRECISION",
        title: "±0.02mm Thickness Parallelism",
        description:
          "Precision ground to ultra-tight thickness tolerances, ensuring consistent shear clearance across the full rotor for clean cuts on copper and aluminum battery foils without folding or rotor wrap-arounds.",
      },
      {
        id: "corrosion-resistance",
        tag: "DURABILITY",
        title: "Electrolyte Corrosion Resistance",
        description:
          "Specialized metallurgy and surface treatments provide enhanced resistance to LiPF6-derived HF acid corrosion, extending blade service intervals in aggressive battery recycling chemical environments.",
      },
      {
        id: "wire-edm-bore",
        tag: "FITMENT",
        title: "Wire-EDM Precision Bores",
        description:
          "All bore profiles are machined to ±0.01mm via Wire-EDM, eliminating rotational play that causes shear gap inconsistency during precision battery foil stack processing.",
      },
    ],

    dimensionLabels: {
      col0: "Cell / Module Type",
      col1: "Blade Outer Diameter",
      col2: "Blade Thickness",
      col3: "Bore Profile",
      col4: "Thickness Tolerance",
      caption:
        "* Exact bore profiles, OD, and thickness supplied to customer drawings. Inert-gas compatible material options available.",
    },

    standardDimensions: [
      {
        spec: "Cylindrical / Pouch Cells",
        od: "Φ 200–350 mm",
        thickness: "10–20 mm",
        bore: "Hex / Splined",
        hooks: "±0.02 mm",
      },
      {
        spec: "EV Module / Battery Pack",
        od: "Φ 400–600 mm",
        thickness: "30–50 mm",
        bore: "Splined",
        hooks: "±0.05 mm",
      },
    ],

    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
    ],
    offers: {
      lowPrice: 300,
      highPrice: 3000,
    },
    faqs: {
      technical: [
        {
          question:
            "Why is ±0.02mm thickness tolerance critical for battery pack pre-shredding?",
          answer:
            "Battery packs contain copper and aluminum current collector foils that are 8–20μm thick. When the shear gap between counter-rotating blades exceeds approximately 0.05mm, the foils deform plastically rather than shearing—folding and wrapping around the rotor, causing operational jams. In a nitrogen-purged environment, clearing a rotor jam requires complete shutdown of the inert gas system, evacuation, and manual removal—hours of downtime consuming significant N₂. Holding blade thickness parallelism to ±0.02mm guarantees a consistent minimum shear gap across the full rotor length, preventing foil wrap-arounds under normal operating conditions.",
        },
        {
          question:
            "What causes blade corrosion in lithium-ion battery shredding environments?",
          answer:
            "LiPF6, the most common lithium-ion electrolyte salt, reacts with trace atmospheric moisture to produce HF (hydrofluoric acid). In a cell breach event during pre-shredding, even a nitrogen atmosphere contains enough residual moisture for partial hydrolysis. Standard tool steel grades (D2, SKD11) corrode rapidly in HF—surface pitting initiates at grain boundaries within 200–500 hours, degrading edge geometry and reducing shear efficiency. Sureay applies specialized anti-corrosion surface treatments to extend service intervals significantly beyond standard tool steels in battery recycling lines.",
        },
        {
          question:
            "Should twin-shaft or single-shaft shredders be used for Li-ion battery pre-processing?",
          answer:
            "Twin-shaft (dual-shaft) shredders are standard for EV battery pack primary size reduction because the counter-rotating, low-speed high-torque design subjects cells to controlled shear rather than impact. This controlled failure mode reduces acute thermal events compared to high-speed single-shaft impactors. Precision twin-shaft blades with controlled shear clearances are therefore the mechanical first-stage standard, followed by further downstream processing.",
        },
        {
          question:
            "What bore profiles are required for nitrogen-purged battery shredder platforms?",
          answer:
            "Battery pre-shredders from specialist manufacturers (Erdwich, Hosokawa, Metso, and Andritz battery recycling lines) use proprietary rotor shaft profiles more precisely toleranced than general industrial shredders. Wire-EDM splined and hexagonal bores to ±0.01mm are required for zero-play rotor mounting—any rotational backlash at operating speed causes consistent shear gap variation and foil jam risk. We manufacture bore profiles to custom shaft drawings; please provide the rotor shaft profile drawing for exact bore specification.",
        },
      ],
      company: [
        {
          question:
            "Can you supply matched rotor and counter-knife sets for battery pre-shredders?",
          answer:
            "Yes. For battery recycling lines where shear clearance consistency is paramount, we supply rotor blade sets and stationary counter-knives ground together as a matched pair to ensure the composite shear gap meets specification. All matched sets include a clearance verification certificate documenting the measured gap at multiple points across the rotor length.",
        },
        {
          question:
            "What quality documentation is provided for battery recycling plant qualification?",
          answer:
            "Battery recycling facilities frequently require enhanced quality documentation for process validation. We supply: CMM dimensional inspection reports, roundness and parallelism measurement records, surface treatment process certificates, material traceability from certified steel mill CoA through to final inspection, and hardness test results per blade. Application-specific documentation packages can be provided for IATF 16949 or ISO 45001 controlled environments.",
        },
        {
          question:
            "Do you offer sample blades for process validation before full production orders?",
          answer:
            "Yes. Battery recycling process qualification typically requires 2–4 sample blades for fit verification and electrolyte resistance testing before production commitment. Sample lead time is 10–15 working days for battery-grade specifications. We can participate in customer technical review calls during the validation process.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Tissue Paper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tissue-log-saw-blades",
    name: "Tissue Log Saw Blades",
    fullName: "Premium Circular Log Saw Blades for Tissue & Towel Converting",
    category: "log_saw_blades",
    sector: "paper",
    categoryDisplay: "Tissue Paper Blades",
    image: "/images/products/blades/tissue-log-saw-blades-05.webp",
    badge: "Zero Core Crush",
    badgeColor: "blue",
    gallery: [
      "/images/products/blades/tissue-log-saw-blades-05.webp",
      "/images/products/blades/tissue-log-saw-blades-01.webp",
      "/images/products/blades/tissue-log-saw-blades-02.webp",
    ],

    description:
      "Tissue log saw blades Ø610–Ø1000 mm — vacuum-hardened D2/Cr12MoV (HRC 58–60), micro-ground to ≤0.15 mm lateral runout for zero-wobble cross-cutting. Eliminates crushed cores and paper dust on tissue, kitchen towel & JRT lines. In-line CBN sharpening compatible. Drop-in OEM fit for Fabio Perini, PCMC, Casmatic, Gambini & Bretting. Custom diameters in 10 working days.",

    fullDescription:
      "The tissue log cross-cut is the single highest-stakes cutting operation in a tissue converting line. A dimensional defect at this stage\u2014crushed cardboard cores, excessive dust generation, or angled cut faces\u2014propagates immediately into the packaging stations, triggering line stops and consumer-grade rejections.\n\nSureay tissue log saw blades are manufactured from premium D2 (1.2379) and Cr12MoV cold-work tool steels. Because these massive blades (up to \u00d81200\u202fmm) spin at extreme RPMs, stability is everything. Every blade is vacuum-hardened, tension-leveled, and micro-ground to strict dimensional tolerances verified on a calibrated CMM before dispatch:\n\n- **Lateral runout:** \u22640.15\u202fmm\n- **Edge runout:** \u22640.10\u202fmm\n- **Face parallelism:** 0.05\u202fmm\n- **Concentricity (OD to bore):** \u22640.30\u202fmm\n- **Bore tolerance:** \u00d868.26\u202fmm (+0.05\u202f/\u202f0.00\u202fmm)\n\n## Continuous Sharpening Compatibility\n\nUnlike standard circular knives, tissue log saws are continuously sharpened *during* operation by synchronized CBN (Cubic Boron Nitride) grinding wheels. Sureay\u2019s heat treatment targets HRC\u202f58\u201360. This specific hardness range ensures the blade hones cleanly against the CBN stones without loading or glazing them, maintaining a razor-sharp edge cycle after cycle without consuming your expensive sharpening wheels.\n\n## Bevel Geometry & Dust Reduction\n\nTissue is a low-density, high-surface-area web with near-zero compressive strength. Cutting it with too steep a bevel creates compression, leading to excessive paper dust (a major fire hazard in spray-glued towel lines) and edge densification that reduces roll softness. We utilize a shallow bevel angle (15\u00b0\u201325\u00b0) that separates fibers by pure shear. Combined with a mirror-polished blade face (Ra\u202f\u22640.2\u202f\u03bcm), this delivers flawless cuts on premium 2-ply and 3-ply bath tissue.\n\n## Bore Compatibility by OEM Platform\n\n**\u00d868.26\u202fmm (+0.05\u202fmm):** Fabio Perini (all series), PCMC Forte/Elite, K\u00f6rber/MTC log saws.\n\n**\u00d882.55\u202fmm:** Casmatic (Kimberly-Clark licensed platforms), Italian and Spanish third-party OEM log saw systems.\n\n**\u00d860.00\u202fmm:** Large-format log saws for industrial wiper, jumbo roll (JRT), and coreless bath tissue production (OD 870\u20131000\u202fmm).\n\nCustom OD from \u00d8610\u202fmm to \u00d81200\u202fmm manufactured to order with a standard 10-working-day lead time. Drawing review and dimensional sign-off available on first-order tooling.\n\n## Advanced Surface Coatings\n\n**Hard Chrome Plating:** Provides corrosion resistance in high-humidity paper mill environments (\u226575% RH) and reduces tissue fiber adhesion coefficient, extending the clean-running interval between blade dressing cycles.\n\n**Teflon (PTFE) Coating:** Creates a highly lubricated surface that glides through dense kitchen towel logs, drastically reducing motor amp draw and eliminating burn marks on the paper edges. The top specification for premium 3-ply kitchen towel lines.\n\n**TiN PVD Coating:** Physical vapour deposition titanium nitride (2\u20133\u202f\u03bcm, HV\u202f2300+) extends the sharp-edge service interval in high-cycle operation. Recommended for premium tissue brands with strict dust contamination specifications.",
    link: "/products/tissue-log-saw-blades",
    isFeatured: true,

    compatibleMachines: [
      "Fabio Perini",
      "PCMC",
      "Casmatic",
      "Gambini",
      "Bretting",
      "MTC",
    ],

    specs: [
      { label: "Material", value: "D2 (1.2379), Cr12MoV, M2 HSS" },
      {
        label: "Diameter Capacity",
        value: "Standard \u00d8610\u202fmm up to Custom \u00d81200\u202fmm",
      },
      {
        label: "Lateral Runout",
        value: "\u22640.15\u202fmm (Zero-wobble guaranteed)",
      },
      { label: "Edge Runout", value: "\u22640.10\u202fmm" },
      {
        label: "Surface Finish",
        value: "Mirror Polished (Ra\u202f\u22640.2\u202f\u03bcm)",
      },
      { label: "Optional Coatings", value: "Hard Chrome, Teflon (PTFE), TiN" },
      {
        label: "Applications",
        value: "Toilet Tissue, Kitchen Towels, Industrial Wipers (JRT)",
      },
    ],

    components: [
      {
        id: "runout-control",
        tag: "PRECISION",
        title: "Zero-Wobble Tensioning",
        description:
          "A 610\u202fmm blade spinning at high RPM will warp if not properly tensioned. We CNC-tension and micro-grind every log saw blade to \u22640.15\u202fmm lateral runout, ensuring it cuts perfectly straight without oscillating and crushing the fragile cardboard core.",
      },
      {
        id: "cbn-compatible",
        tag: "METALLURGY",
        title: "In-Line CBN Sharpening Ready",
        description:
          "D2 and Cr12MoV blades heat-treated to HRC\u202f58\u201360. This specific hardness range responds cleanly to continuous CBN grinding wheels without loading or glazing them, maintaining a razor edge and protecting your sharpening equipment.",
      },
      {
        id: "anti-friction",
        tag: "COATINGS",
        title: "Teflon & Chrome Finishes",
        description:
          "Friction generates heat and explosive paper dust. Hard Chrome or Teflon (PTFE) coated blades lower the coefficient of friction, yielding pristine cut edges on premium 3-ply kitchen towel logs and extending Mean Time Between sharpening cycles.",
      },
    ],

    dimensionLabels: {
      col0: "Target Machine / Log Type",
      col1: "Outer Diameter (mm)",
      col2: "Bore / ID (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard dimensions for major tissue converting OEMs. Custom drive-pin holes, keyways, and sizes up to \u00d81200\u202fmm for JRT industrial rolls manufactured to exact specifications.",
    },

    standardDimensions: [
      {
        spec: "Fabio Perini / PCMC",
        od: '610 (24")',
        id: '68.26 (2-11/16")',
        thickness: "4.76",
      },
      {
        spec: "Fabio Perini / PCMC",
        od: '610 (24")',
        id: '68.26 (2-11/16")',
        thickness: "3.80",
      },
      {
        spec: "Casmatic Standard",
        od: '610 (24")',
        id: '82.55 (3-1/4")',
        thickness: "4.76",
      },
      {
        spec: "Bretting / MTC",
        od: "680",
        id: "68.26",
        thickness: "4.76",
      },
      {
        spec: "JRT / Industrial Roll",
        od: "870",
        id: "60",
        thickness: "6.0",
      },
      {
        spec: "JRT / Industrial Roll",
        od: "1000",
        id: "60",
        thickness: "6.0",
      },
    ],

    relatedBladeIds: ["paper-cutting-blades", "rotary-slitter-knives-paper"],
    offers: {
      lowPrice: 180,
      highPrice: 1200,
    },
    faqs: {
      technical: [
        {
          question:
            "Why is my log saw crushing the cardboard cores of the toilet rolls?",
          answer:
            "Core crushing is primarily caused by excessive blade wobble (lateral runout) or a dull cutting edge. When lateral runout exceeds 0.20\u202fmm, the blade physically beats against the core rather than slicing it. Our blades are tension-leveled and CMM-verified to \u22640.15\u202fmm lateral runout. Also verify that your in-line CBN sharpening stones are correctly aligned and actively dressing the blade on every cycle.",
        },
        {
          question:
            "How do I minimize dust and fiber tearing during tissue cross-cutting?",
          answer:
            "Dust is generated when a high-friction blade tears tissue fibers instead of shearing them. We engineer a shallow bevel angle (15\u00b0\u201325\u00b0) combined with a mirror-polished face (Ra\u202f\u22640.2\u202f\u03bcm). For maximum dust reduction, upgrade to our Teflon (PTFE) coated blades, which drastically lower friction and allow the blade to glide through the log with minimal fiber displacement.",
        },
        {
          question:
            "Can you supply blades for Fabio Perini, PCMC, Casmatic, or Gambini log saws?",
          answer:
            "Yes. The standard \u00d868.26\u202fmm (+0.05\u202fmm) bore fits Fabio Perini and PCMC Forte/Elite directly. The \u00d882.55\u202fmm bore covers Casmatic and Kimberly-Clark-licensed OEM platforms. We hold OEM blueprints for Gambini and Bretting and supply guaranteed drop-in replacement tooling.",
        },
        {
          question:
            "How does the blade interact with the machine\u2019s continuous CBN sharpening system?",
          answer:
            "Log saws use synchronized CBN (Cubic Boron Nitride) stones to hone the blade continuously during operation. If the blade material is too hard or soft, it will load or glaze the stones, rendering them ineffective. Our D2 blades heat-treated to HRC\u202f58\u201360 shed micro-chips cleanly without clogging your CBN wheels.",
        },
        {
          question: "What is the longest blade diameter you can manufacture?",
          answer:
            "We manufacture tissue log saw blades up to \u00d81200\u202fmm for large-format industrial wiper and jumbo roll (JRT) production lines. These require our large-format vacuum heat treatment furnaces and CNC grinding equipment. Standard lead time is 10 working days from drawing sign-off.",
        },
      ],
      company: [
        {
          question: "Are you a manufacturer or a trading company?",
          answer:
            "Direct manufacturer. We forge, grind, and quality-inspect every blade in-house under ISO 9001:2015 certification. You communicate directly with the production engineers who made your blades \u2014 no reseller markup.",
        },
        {
          question:
            "Do you supply matched CBN sharpening wheels alongside the blades?",
          answer:
            "Yes. We supply matched sets of CBN sharpening stones engineered for our log saw blades, ensuring correct grinding angle, bond hardness, and abrasive grit for maximum blade life and minimum stone wear.",
        },
        {
          question: "What quality certifications does Sureay hold?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a CMM dimensional inspection record, and a heat treatment batch certificate. Mill certificates and full material traceability reports are available on request.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Paper Cutting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "paper-cutting-blades",
    name: "Paper Cutting Blades",
    fullName: "Premium Guillotine Paper Cutter Blades (HSS & TCT)",
    category: "shear_blades",
    sector: "paper",
    categoryDisplay: "Paper Cutting Blades",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
    badge: "OEM Precision",
    badgeColor: "teal",
    gallery: [
      "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-02.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-04.webp",
    ],
    description:
      "Eliminate paper draw and dust with replacement guillotine blades for Polar, Wohlenberg, and Perfecta cutters. Available in 18% Tungsten High-Speed Steel (HSS) and Tungsten Carbide Tipped (TCT) inlays. Micro-ground to a precise 21\u00b0 bevel with full-length face flatness \u22640.05\u202fmm for perfectly square cuts on high-volume print runs.",
    fullDescription:
      "Guillotine paper cutter replacement blades are consumed components whose alloy grade, edge geometry, and full-length dimensional accuracy directly determine cut quality across the entire ream stack—from 450mm office cutter blades to 2050mm double-beam commercial pressroom guillotines.\n\nSureay paper cutting blades are offered in three metallurgical grades, matched to cut volume, substrate, and total cost of ownership requirements:\n\n## Material Grades\n\n**Standard Tool Steel (T10, 9CrSi — HRC 57–60):** Cost-effective for moderate-volume print shops and finishing operations cutting bond paper, newsprint, and uncoated stock up to 80 gsm. T10 high-carbon steel is hardened to HRC 57–60 and provides reliable edge sharpness at the lowest unit cost. Suited to Polar, Schneider Senator, and Challenge 305 class machines in moderate daily-cycle environments.\n\n**M2 / SKH-9 / SKH-51 HSS (HRC 60–62):** The premium choice for high-volume commercial printing, book publishing, and label-converting guillotines running multiple ream stacks per hour. M2 and SKH-51 HSS retain full hardness at the elevated cutting temperatures generated by high-cycle operation—delivering 4–6× longer service life between resharpening events compared to standard carbon steel blades. Recommended for coated art paper, board, laminated packaging stock, and multi-layer adhesive label sheets where edge wear accelerates rapidly.\n\n**TCT Inlay — Tungsten Carbide Tipped (YG15 / YG20):** Nitrogen furnace-brazed carbide edge inlay for the most abrasion-intensive substrates: carbonless copy paper (CBS coating), high-calcium-carbonate-filled packaging board, coated cartonboard, abrasive specialty papers, and fibre-reinforced technical papers. TCT blades outlast HSS on these substrates by a factor of 3–5× and maintain slit-edge quality well beyond the point where HSS would require resharpening.\n\n## Precision Grinding Standards\n\n- **Bevel angle:** 21° (standard guillotine geometry, single-bevel)\n- **Length tolerance:** +2 / −1 mm\n- **Width tolerance:** ±1 mm\n- **Edge thickness tolerance:** 0 / −0.1 mm\n- **Face flatness (full length):** ≤ 0.05 mm\n\nFlatness deviation above 0.08mm across the blade length causes uneven blade-to-sideboard contact, producing a tapered cut and requiring operator correction shims—a production inefficiency that accumulates to measurable downtime on high-volume cutting lines.\n\n## Machine Compatibility & Supply States\n\nStandard stock lengths from 450 mm to 2050 mm. Compatible with Polar 115/137/155/176/200 series, Schneider Senator, Perfecta, Wohlenberg, Prism, and Challenge guillotine brands. Custom lengths, mounting hole patterns, and back-edge profiles manufactured to drawing within 7 working days.\n\n**Available supply conditions:** Sharp-ground edge (ready to install) / Semi-finished edge (for on-site final dressing to machine specification) / Blank knife (unground, for customers with in-house regrinding capability).",
    link: "/products/paper-cutting-blades",
    isFeatured: true,

    compatibleMachines: [
      "Polar",
      "Wohlenberg",
      "Perfecta",
      "Schneider Senator",
      "Challenge",
      "Prism",
      "Seybold",
    ],

    specs: [
      {
        label: "Material",
        value: "18% Tungsten HSS Inlay | Tungsten Carbide Tipped (TCT)",
      },
      {
        label: "Hardness",
        value: "HRC\u202f62\u201364 (HSS) | HRA\u202f89\u201391 (Carbide)",
      },
      {
        label: "Bevel Angle",
        value:
          "Standard 21\u00b0\u202f\u2013\u202f24\u00b0 (Double bevel available)",
      },
      {
        label: "Face Flatness",
        value: "\u22640.05\u202fmm (Eliminates paper draw & tapered cuts)",
      },
      {
        label: "Construction",
        value: "Bimetallic (premium edge brazed to alloy steel body)",
      },
      {
        label: "Application",
        value: "Coated Art Paper, Recycled Board, Carbonless Copy Paper",
      },
    ],

    components: [
      {
        id: "tct-inlay",
        tag: "METALLURGY",
        title: "Tungsten Carbide Inlays",
        description:
          "Standard blades dull rapidly when cutting abrasive, calcium-carbonate-filled papers. Our Tungsten Carbide Tipped (TCT) blades maintain their razor edge 3\u202f\u2013\u202f5\u00d7 longer than HSS, drastically reducing machine downtime for blade changes on carbonless copy and coated art stock.",
      },
      {
        id: "face-flatness",
        tag: "PRECISION",
        title: "Zero Paper Draw",
        description:
          "If a blade is bowed even slightly, hydraulic pressure causes it to deflect mid-cut, producing unequal sizes from the top to the bottom of the stack. We grind our blades to a full-length face flatness of \u22640.05\u202fmm to ensure flawlessly straight vertical cuts through every ream.",
      },
      {
        id: "oem-compatibility",
        tag: "FITMENT",
        title: "Exact OEM Replacement",
        description:
          "We hold engineering blueprints for Polar, Wohlenberg, Perfecta, and Schneider Senator guillotines. Mounting holes, threads, and back-edge slots are CNC-machined for a guaranteed drop-in fit — no shimming or modification required.",
      },
    ],

    dimensionLabels: {
      col0: "Specification (mm)",
      col1: "Length",
      col2: "Width",
      col3: "Edge Thickness",
      col4: "Body Thickness",
      caption:
        "* Standard sizes listed above. Custom dimensions available on request.",
    },

    standardDimensions: [
      {
        spec: "450 * 51 * 12/10",
        od: "450",
        id: "51",
        length: "12",
        teeth: "10",
      },
      {
        spec: "595 * 55 * 13.5/10",
        od: "595",
        id: "55",
        length: "13.5",
        teeth: "10",
      },
      {
        spec: "795 * 60 * 13.5/10",
        od: "795",
        id: "60",
        length: "13.5",
        teeth: "10",
      },
      {
        spec: "895 * 60 * 13.5/10",
        od: "895",
        id: "60",
        length: "13.5",
        teeth: "10",
      },
      {
        spec: "995 * 60 * 14/11",
        od: "995",
        id: "60",
        length: "14",
        teeth: "11",
      },
      {
        spec: "1095 * 65 * 14/11",
        od: "1095",
        id: "65",
        length: "14",
        teeth: "11",
      },
      {
        spec: "1350 * 80 * 16/13",
        od: "1350",
        id: "80",
        length: "16",
        teeth: "13",
      },
      {
        spec: "2050 * 85 * 16/14",
        od: "2050",
        id: "85",
        length: "16",
        teeth: "14",
      },
    ],

    relatedBladeIds: ["tissue-log-saw-blades", "paper-cutting-blades"],
    offers: {
      lowPrice: 80,
      highPrice: 650,
    },
    faqs: {
      technical: [
        {
          question:
            "Should I choose M2 HSS or Tungsten Carbide Tipped (TCT) blades for my guillotine?",
          answer:
            "M2 HSS is the correct choice for coated art paper, bond paper, and standard label stock in high-volume print shops — delivering 4–6× longer life than standard carbon steel. Upgrade to TCT (YG15/YG20 carbide inlay) only when cutting carbonless copy paper, high-calcium-carbonate packaging board, or abrasive specialty papers. TCT outperforms HSS 3–5× on these substrates but carries a higher unit cost.",
        },
        {
          question:
            "How does your blade geometry prevent dust when guillotining thick paper reams?",
          answer:
            "We grind every guillotine blade to a precision 21° bevel with face flatness ≤0.05mm across the full length. The sharp, shallow bevel shears each sheet progressively through the ream rather than crushing through the stack — dust is generated by dull or incorrectly bevelled edges that compress paper fibres instead of shearing them. HSS M2 and TCT grades retain this precision bevel geometry significantly longer than carbon steel, so fewer resharpening events mean fewer dust-generating dull-blade cutting cycles per year.",
        },
        {
          question:
            "Can you supply blades in the exact length and mounting hole pattern my Polar or Wohlenberg machine requires?",
          answer:
            "Yes. We stock standard lengths from 450mm to 2050mm to cover Polar 115/137/155/176/200, Schneider Senator, Wohlenberg, Perfecta, and Challenge series guillotines. Custom lengths, back-edge profiles, and mounting hole patterns are manufactured to drawing within 7 working days. Blades can be supplied sharp-ground, semi-finished, or blank to suit your on-site regrinding setup.",
        },
        {
          question:
            "How should guillotine blades be stored and handled to prevent premature edge damage before installation?",
          answer:
            "Store blades horizontally in original packaging on padded wooden cradles — never stack vertically or allow metal-to-metal contact on the cutting edge. Use plastic or rubber edge guards during handling. Inspect under a 10× loupe before mounting: a 0.2mm edge nick doubles local wear rate within the first 10,000 cuts. Avoid dragging the edge against guide rails during installation.",
        },
        {
          question:
            "Can you supply paper guillotine blades in semi-finished condition for in-house regrinding?",
          answer:
            "Yes. Semi-finished blanks are available in all standard lengths with the body ground to final dimensions but the edge left in pre-ground condition for final dressing to your specific bevel angle and finish. This supply state suits print shops with surface grinding capability, reduces unit cost by 15–20%, and gives full control over final edge geometry and sharpness.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question:
            "What makes Sureay's heat treatment different from cheaper alternatives?",
          answer:
            "Unlike standard quenching, every Sureay blade undergoes deep cryogenic treatment after vacuum hardening. This transforms retained austenite into martensite, boosting wear resistance by up to 40% and ensuring uniform hardness across the entire cutting edge.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement blades typically ship within 48 hours. Custom profiles take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question:
            "What quality certifications does Sureay hold, and can you provide material test reports?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record, and a heat treatment batch certificate. For OEM qualification, full CMM dimensional reports and steel mill certificates are available on request.",
        },
        {
          question:
            "Can we trial a sample set before committing to a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2–5 blades) for machine fit verification and edge life testing. Standard sample lead time is 5–7 working days. For custom profiles, dimensional sign-off samples are produced before full production commences — no tooling commitment until fit is confirmed.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Single Shaft Rotor Inserts
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "single-shaft-rotor-inserts",
    name: "Single Shaft Rotor Inserts",
    fullName: "High-Impact Single Shaft Shredder Rotor Inserts (Crown Cutters)",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Single Shaft Rotor Inserts",
    image: "/images/products/shredder-blades/single-shredder-blades-06.webp",
    badge: "Heavy Duty",
    badgeColor: "orange",
    gallery: [
      "/images/products/shredder-blades/single-shredder-blades-06.webp",
      "/images/products/shredder-blades/single-shredder-blades-00.webp",
      "/images/products/shredder-blades/single-shredder-blades-01.webp",
    ],
    description:
      "DC53, D2 (1.2379), and Cr12MoV cold-work tool steel rotor inserts for low-speed, high-torque single-shaft shredders. Vacuum-hardened and cryogenically processed to HRC 58–62, CNC-machined to ±0.02mm face tolerance. Features 4-way indexable square geometry. Drop-in compatible with Vecoplan, Weima, Lindner, and Zerma platforms.",
    fullDescription:
      "Single-shaft shredders operate at 80–150 RPM under extremely high torque, driving block-style rotor inserts into a stationary bed knife at tight shear clearances of 0.2–1.5mm. At these mechanical parameters, the primary cause of blade failure is impact-induced edge microchipping or thermal softening from sustained high-cycle torque peaks, rather than progressive wear.\n\nSureay addresses these failure modes through strict metallurgy. Standard D2 (1.2379) tool steel inserts provide excellent wear resistance at a cost-effective price point. For applications involving hard engineering plastics (PA66-GF, PC, PEEK) or heavy purge lumps, DC53 is specified—delivering 17% higher transverse rupture strength to prevent edge chipping under heavy impact.\n\n## ±0.02mm CNC Machining Tolerance\n\nCutting clearance between the rotor insert face and the stationary bed knife governs shred particle size and motor load. Inconsistent clearances cause material wrap-back and rotor stalls. Sureay rotor inserts are CNC-machined to ±0.02mm face flatness, ensuring a perfect and repeatable shear gap across the entire rotor length when paired with a quality bed knife.\n\n## 4-Way Indexable Geometry\n\nThe symmetrical square block format provides four independent cutting edges per insert. When one edge dulls, the operator loosens the countersunk mounting bolt, rotates the insert 90° to a fresh edge, and retorques. A full rotor complement can be indexed rapidly without shaft extraction, effectively reducing annual tooling expenditure by 75%.\n\n## Deep Cryogenic Treatment (−196°C)\n\nAll Sureay single-shaft inserts undergo vacuum hardening to HRC 58–62, followed by a mandatory deep cryogenic soak at −196°C. This critical final stage eliminates retained austenite and stabilizes the martensitic microstructure, drastically reducing the risk of bulk fracture when the rotor encounters unexpected foreign metal inclusions.",
    link: "/products/single-shaft-rotor-inserts",
    isFeatured: true,
    compatibleMachines: [
      "Rapid Granulator",
      "Neue Herbold",
      "ZERMA",
      "Getecha",
      "Cumberland Engineering",
      "Conair",
      "Wittmann Battenfeld",
      "WEIMA",
    ],

    specs: [
      { label: "Material", value: "DC53, D2 (1.2379), Cr12MoV, 42CrMo" },
      {
        label: "Target Hardness",
        value: "HRC 58–62 (Cryogenically Stabilized)",
      },
      { label: "Machining Tolerance", value: "±0.02 mm Face Flatness" },
      { label: "Edge Geometry", value: "4-Way Indexable (90° Rotation)" },
      { label: "Face Profile", value: "Concave, Flat, V-Groove, Crown" },
      { label: "Mounting Style", value: "M12 to M24 Countersunk Hex Bolt" },
      {
        label: "OEM Fitment",
        value: "Vecoplan, Weima, Lindner, Zerma, Cresswood",
      },
      {
        label: "System Integration",
        value: "Matched Bed Knives available separately",
      },
      {
        label: "Application",
        value:
          "HDPE/PVC Pipes · Injection Purgings · Wood Pallets · IBC Totes · MSW",
      },
    ],

    components: [
      {
        id: "indexable-design",
        tag: "TCO REDUCTION",
        title: "4-Way Indexable Edges",
        description:
          "The symmetrical square design allows for a 90° rotation when dull. This quadruples the lifespan of a single blade, cutting replacement costs by 75% and minimizing maintenance downtime.",
      },
      {
        id: "concave-profile",
        tag: "SHEAR EFFICIENCY",
        title: "Aggressive Concave Profiling",
        description:
          "Precision CNC-machined concave faces ensure an aggressive bite into smooth, dense plastic lumps, preventing material from bouncing or bridging on the rotor during low-speed shredding.",
      },
      {
        id: "cryo-treatment",
        tag: "EXTREME RELIABILITY",
        title: "Deep Cryogenic Tempering",
        description:
          "Processed at −196°C to eliminate internal residual stress. This guarantees the blade will absorb massive kinetic shocks without shattering when hitting hidden metal inclusions.",
      },
    ],

    dimensionLabels: {
      col1: "Insert Dimensions (L × W × T)",
      col2: "Bolt Size",
      col3: "Insert Profile",
      col4: "Typical OEM Platform",
      caption:
        "* Stator bed knives and custom rotor blade profiles available. Compatible with major global single-shaft shredder brands.",
    },

    standardDimensions: [
      {
        spec: "34 × 34 × 23 mm",
        bolt: "M12",
        type: "Concave / Flat",
        oem: "Weima / Vecoplan Standard",
      },
      {
        spec: "40 × 40 × 25 mm",
        bolt: "M14",
        type: "Concave / Flat",
        oem: "Vecoplan / Heavy Plastics",
      },
      {
        spec: "43 × 43 × 19.5 mm",
        bolt: "M14",
        type: "Crown / Concave",
        oem: "Lindner Micromat / Urraco",
      },
      {
        spec: "50 × 50 × 30 mm",
        bolt: "M16",
        type: "Concave / Flat",
        oem: "Heavy Duty MSW",
      },
      {
        spec: "60 × 60 × 30 mm",
        bolt: "M16 / M18",
        type: "Flat / V-Groove",
        oem: "Zerma / Tyre Shredding",
      },
      {
        spec: "80 × 80 × 45 mm",
        bolt: "M24",
        type: "Concave",
        oem: "Extreme High-Torque",
      },
    ],

    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "granulator-blades",
      "single-shaft-bed-knives",
    ],
    offers: {
      lowPrice: 20,
      highPrice: 200,
    },
    faqs: {
      technical: [
        {
          question:
            "Which alloy offers better edge retention for cutting rigid purges: D2 or DC53?",
          answer:
            "For dense injection-moulding purges and thick-wall HDPE on single-shaft rotors at 80–120 RPM, DC53 consistently outperforms D2. Single-shaft impact loading exposes DC53's 17% higher transverse rupture strength, resisting the micro-chipping at the cutting face that D2 typically develops on rigid purge material after 300–500 operating hours.",
        },
        {
          question: "What causes material wrap-back and rotor stalling?",
          answer:
            "Wrap-back is usually caused by inconsistent face flatness across the rotor insert stack, creating uneven knife-to-bed clearance. Material passes through wide gaps instead of being sheared, circulates back, and clogs the rotor pocket. Our inserts are CNC-machined to ±0.02mm face flatness to eliminate this.",
        },
        {
          question:
            "How does the four-edge indexable design reduce tooling costs?",
          answer:
            "Each square insert has four independent cutting edges. When one edge dulls, loosen the single mounting bolt, rotate the insert 90° to a fresh edge, and retorque. This quadruples the effective service life per blade purchased, reducing annual tooling expenditure by approximately 75% versus non-indexable alternatives.",
        },
        {
          question:
            "What insert geometry is required for shredding large-format IBC totes and HDPE drums?",
          answer:
            "For thick-wall containers, specify concave-faced inserts (50×50mm or 60×60mm). The concave profile creates a positive rake geometry, preventing the blade from skiving across the smooth HDPE surface at initial impact and ensuring immediate penetration during the downstroke.",
        },
        {
          question: "Can Sureay supply the matching stationary bed knife?",
          answer:
            "Yes. Stationary bed knives are manufactured as matched sets with rotor inserts, with the clearance face ground to the same ±0.02mm tolerance. A matched bed knife eliminates the clearance guesswork introduced when sourcing rotor inserts and bed knives from separate suppliers.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement inserts typically ship within 48 hours. Custom profiles take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders.",
        },
        {
          question: "Can we trial a sample set before a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2–5 inserts) for machine fit verification and edge life testing. Standard sample lead time is 5–7 working days.",
        },
        {
          question:
            "What quality certifications does Sureay hold, and can you provide material test reports?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record, and a heat treatment batch certificate. For OEM qualification, full CMM dimensional reports and steel mill certificates are available on request.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Single-Shaft Bed Knives (Stationary Counter Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "single-shaft-bed-knives",
    name: "Single Shaft Bed Knives",
    fullName: "Single Shaft Shredder Bed Knives (Stator Knives)",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Single Shaft Bed Knives",
    image: "/images/products/shredder-blades/single-shredder-bed-knives.webp",
    badge: "Precision Ground",
    badgeColor: "blue",
    gallery: [
      "/images/products/shredder-blades/single-shredder-bed-knives.webp",
      "/images/products/shredder-blades/single-shaft-bed-knives-drawing.webp",
      "/images/products/shredder-blades/single-shredder-bed-knives-02.webp",
    ],
    description:
      "Heavy-duty stator knives (bed knives) for single-shaft shredders. Manufactured from D2 (1.2379) and specialized high-alloy steels. Press-quenched and precision-ground to strict straightness tolerances (≤ 0.05mm/m) to ensure uniform rotor-to-bed shear clearance. Custom slotted hole patterns for exact clearance adjustment. Compatible with Vecoplan, Weima, Lindner, and Zerma.",
    fullDescription:
      "In a single-shaft shredding system, the bed knife (stator) serves as the rigid counter-cutting edge against which the rotating inserts shear the material. Because these knives span the entire width of the shredder rotor—often exceeding 2,000mm in length—manufacturing them requires absolute control over thermal distortion.\n\n## The Straightness Imperative\n\nA warped bed knife is the primary cause of shredder inefficiency. If the knife bows, the shear gap becomes uneven: too tight in the center (risking catastrophic rotor collision) and too loose at the ends (causing material wrap-back and frictional melting). Sureay bed knives undergo specialized press-quenching during heat treatment, followed by precision surface grinding. We guarantee a straightness tolerance of ≤ 0.05mm per linear meter, ensuring a perfectly uniform cutting clearance across the entire rotor.\n\n## Deep Hardening for Multiple Regrinds\n\nUnlike rotor inserts which are discarded or indexed, heavy bed knives represent a significant capital investment and must be regrindable. We utilize vacuum heat treatment to achieve a uniform hardness of HRC 56–60 through the entire cross-section of the blade, not just the surface. This allows operators to re-sharpen the bevel edge multiple times without exposing a soft core, maximizing the total operational lifespan of the knife.\n\n## Slotted and Counter-Bored Mounting\n\nMaintaining the optimal 0.2mm–1.0mm shear gap is critical as both rotor and stator knives wear. Our bed knives feature precision CNC-machined slotted holes or oversized counter-bores, engineered to match your OEM machine's adjustment mechanisms perfectly. This ensures maintenance teams can advance the bed knife precisely and lock it down securely under heavy vibration.",
    link: "/products/single-shaft-bed-knives",
    isFeatured: true,
    compatibleMachines: [
      "Rapid Granulator",
      "Neue Herbold",
      "ZERMA",
      "Getecha",
      "Cumberland Engineering",
      "Conair",
      "Wittmann Battenfeld",
      "WEIMA",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 (1.2379), DC53, 42CrMo (AISI 4140), Chipper Knife Steel",
      },
      { label: "Target Hardness", value: "HRC 56–60 (Through-Hardened)" },
      { label: "Straightness Tol.", value: "≤ 0.05 mm per linear meter" },
      {
        label: "Length Capability",
        value: "Up to 3,500 mm (Seamless single piece)",
      },
      { label: "Edge Geometry", value: "Single Bevel, Double Bevel, Serrated" },
      { label: "Mounting Holes", value: "Slotted, Counter-Bored, Threaded" },
      {
        label: "OEM Fitment",
        value: "Vecoplan, Weima, Lindner, Zerma, Cresswood",
      },
      {
        label: "System Integration",
        value: "Matched Rotor Inserts available separately",
      },
      {
        label: "Application",
        value:
          "Single-Shaft Shredders · HDPE/PP/PVC · Wood Pallets · MSW · Tyre",
      },
    ],

    components: [
      {
        id: "straightness-control",
        tag: "TOLERANCE",
        title: "Zero-Distortion Straightness",
        description:
          "Press-quenched and precision-ground to eliminate bowing. A perfectly straight bed knife guarantees a uniform shear gap, preventing material from slipping through uncut.",
      },
      {
        id: "deep-hardening",
        tag: "LIFESPAN",
        title: "Through-Hardened Core",
        description:
          "Vacuum heat-treated to ensure consistent hardness (HRC 56–60) deep into the core. You can regrind the bevel multiple times without performance loss.",
      },
      {
        id: "adjustable-mounting",
        tag: "MAINTENANCE",
        title: "Precision Adjustment Slots",
        description:
          "CNC-milled mounting slots allow technicians to easily advance the bed knife toward the rotor to compensate for wear, maintaining peak shredding efficiency.",
      },
    ],

    dimensionLabels: {
      col0: "Overall Length (mm)",
      col1: "Width (mm)",
      col2: "Thickness (mm)",
      col3: "Hole / Mounting Configuration",
      caption:
        "* Bed knives are highly machine-specific. Standard reference sizes shown in mm — we manufacture to exact OEM drawings or custom customer specs. Single-piece seamless up to 3,500 mm.",
    },

    standardDimensions: [
      { spec: "800", od: "100", bolt: "30", type: "Slotted / Counter-Bored" },
      { spec: "1000", od: "120", bolt: "35", type: "Slotted / Counter-Bored" },
      { spec: "1300", od: "150", bolt: "40", type: "Slotted / Counter-Bored" },
      { spec: "1500", od: "150", bolt: "40", type: "Slotted / Counter-Bored" },
      { spec: "2000", od: "200", bolt: "50", type: "Custom OEM Pattern" },
      { spec: "3000", od: "250", bolt: "60", type: "Heavy Duty Multi-Hole" },
    ],

    relatedBladeIds: ["single-shaft-rotor-inserts", "granulator-blades"],

    offers: {
      lowPrice: 150,
      highPrice: 1200,
    },

    faqs: {
      technical: [
        {
          question:
            "Why is the straightness tolerance of a bed knife so important?",
          answer:
            "If a bed knife is warped by even 0.5mm, the clearance between the rotor inserts and the bed knife becomes inconsistent. Where the gap is too tight, the rotor knives will strike the bed knife, causing catastrophic damage. Where the gap is too wide, material will fold and wrap around the rotor instead of being sheared. Our ≤ 0.05mm/m straightness tolerance prevents both issues.",
        },
        {
          question: "How many times can a Sureay bed knife be reground?",
          answer:
            "Because we through-harden our bed knives (ensuring the core is as hard as the surface), they can be reground repeatedly until the dimensional limit of the machine's adjustment mechanism is reached. Typically, a heavy-duty D2 bed knife can undergo 5 to 10 regrind cycles depending on the depth of wear.",
        },
        {
          question:
            "How do I ensure the replacement bed knife aligns with my machine's adjustment pushers?",
          answer:
            "Bed knives utilize slotted holes or specific counter-bore patterns to integrate with the shredder's rear adjustment bolts (pushers). We maintain a vast database of OEM drawings for brands like Weima, Vecoplan, and Lindner. Supplying us with your machine model or a basic drawing ensures the slots are milled to the exact OEM coordinates.",
        },
        {
          question:
            "Should I replace the bed knife when I replace the rotor inserts?",
          answer:
            "Not necessarily every time. Rotor inserts wear out much faster. However, if the bed knife's cutting edge is severely rounded or chipped, placing new rotor inserts against a dull bed knife will drastically reduce the lifespan of the new inserts and decrease throughput. We recommend inspecting the bed knife edge during every rotor indexing cycle and regrinding or replacing it when a sharp edge can no longer be maintained.",
        },
      ],
      company: [
        {
          question:
            "Do you have the manufacturing capacity for blades over 2 meters long?",
          answer:
            "Yes. Our facility is equipped with heavy-duty surface grinders and extended vacuum heat treatment furnaces capable of processing seamless, single-piece bed knives up to 3,500mm in length without inducing thermal distortion.",
        },
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a direct OEM manufacturer. This allows us to strictly control the heat treatment and grinding processes critical for long stator knives, eliminating the quality inconsistencies common with trading companies.",
        },
        {
          question: "What is the lead time for custom bed knives?",
          answer:
            "For standard OEM replacements, we often ship within 3–5 days. For custom lengths or specific alloy requirements, production lead time is typically 15–20 working days, inclusive of the deep thermal cycling processes required for dimensional stability.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Granulator Blades (Crusher & Granulator Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "granulator-blades",
    name: "Granulator Blades",
    fullName:
      "Industrial Plastic Crusher & Granulator Knives for PET, PVC & PP Recycling",
    category: "granulator_blades",
    sector: "recycling",
    categoryDisplay: "Granulator Blades",
    image: "/images/products/granulator-blades/granulator-blades-01.webp",
    gallery: [
      "/images/products/granulator-blades/granulator-blades-01.webp",
      "/images/products/granulator-blades/granulator-blades-03.webp",
      "/images/products/granulator-blades/edge-configurations.webp",
    ],

    description:
      "D2, SKD-11, and Cr12MoV granulator rotor and stator knives precision-ground to ±0.02mm bolt-hole tolerance for Cumberland, Conair/Wortex, Herbold, and Rapid granulators. Bevel angles from 30° to 55° are matched to polymer type-delivering clean, low-fines regrind. Vacuum hardening plus deep cryogenic processing stabilizes HRC 58–62 for extended edge retention.",

    fullDescription:
      "Granulator rotor and stator knives are the highest-wear components in any closed-loop plastic recycling line. Incorrect alloy selection or substandard geometry tolerances directly translate into enlarged particle size distribution, excessive dust and fines, elevated motor amp draw, and shortened sharpening intervals-all of which degrade regrind pellet quality and increase cost per tonne processed.\n\nSureay granulator blades are manufactured from D2 (1.2379), SKD-11, DC53, and Cr12MoV cold-work tool steels-selected based on the specific polymer and abrasive filler content being processed. Calcium carbonate-filled PVC and glass-fibre-reinforced nylon demand SKD-11 or DC53 for maximum abrasion resistance. Impact-loaded applications such as thick-wall HDPE containers, cold nylon runners, and heavy sprues require the higher toughness-to-hardness ratio of Cr12MoV.\n\nAll blades are vacuum-hardened and deep-cryogenically processed at -196°C to achieve a stabilized HRC 58–62 microstructure. The cryogenic step eliminates retained austenite, reduces internal compressive stress, and significantly extends the time between sharpening cycles by improving carbide dispersion uniformity across the cutting edge.\n\n## Precision Grinding Standards\nThe cutting clearance between rotor and stator knives is the single most influential variable controlling regrind particle size and fines fraction. Sureay granulator blades are machined to the following tolerances to ensure consistent rotor-to-bed gap across the full cutting width:\n\n- Bolt-hole positional tolerance: ±0.02 mm\n- Face flatness: 0.05 mm\n- Parallelism (top face to bottom face): 0.03 mm\n- Bevel angle: 30°–55° (application-optimized per polymer and rotor speed)\n\nA face flatness deviation above 0.08mm allows rotor knife rocking under load, progressively widening the cutting gap and increasing the coarse fraction in regrind-a defect that causes downstream extruder feed inconsistency.\n\n## Polymer-Specific Bevel Angle Selection\n30°–35° bevel: Soft thermoplastics (LDPE, LLDPE, EVA, foam PP). Low included angle delivers maximum sharpness for clean shearing of compliant materials.\n\n40°–45° bevel: General-purpose engineering plastics (HDPE, ABS, standard PP/PET regrind). Balanced edge strength and sharpness for the most common granulator feedstocks.\n\n50°–55° bevel: Highly abrasive or filled compounds (glass-filled nylon, calcium carbonate PVC, UHMW-PE). Wider bevel distributes abrasive wear over a larger cutting face, extending sharpening intervals.\n\n## Machine Compatibility\nDimensions are reverse-engineered to match Cumberland, Conair/Wortex, Alpine, Foremost, Nelmor, Herbold, Pallmann, Rapid, and Ramco configurations. Both double-hole and multi-hole (triple, quadra) mounting patterns are carried in standard stock.",

    link: "/products/granulator-blades",
    isFeatured: true,
    compatibleMachines: [
      "Rapid Granulator",
      "Herbold Meckesheim",
      "ZERMA",
      "Getecha",
      "Cumberland Engineering",
      "Conair",
      "Wittmann Battenfeld",
      "Gamma Meccanica",
    ],

    specs: [
      { label: "Material", value: "D2 (1.2379), SKD-11, DC53, Cr12MoV" },
      { label: "Hardness", value: "HRC 58–62 (Cryogenically Stabilized)" },
      { label: "Bolt-hole Tol.", value: "±0.02 mm" },
      { label: "Face Flatness", value: "≤ 0.05 mm" },
      { label: "Parallelism", value: "≤ 0.03 mm" },
      { label: "Bevel Angle", value: "30° - 55° (Application-optimized)" },
      {
        label: "Heat Treatment",
        value: "Vacuum Hardening + Deep Cryogenic (-196°C)",
      },
      {
        label: "Application",
        value: "PET, PVC, PP, HDPE, Engineering Plastics",
      },
      {
        label: "OEM Fitment",
        value: "Cumberland, Rapid, Herbold, Conair, Nelmor",
      },
    ],

    components: [
      {
        id: "maximized-regrind-quality",
        tag: "QUALITY",
        title: "Maximized Regrind Quality",
        description:
          "Ultra-sharp, precisely aligned cutting edges shear plastic cleanly rather than tearing it, drastically reducing the generation of unwanted dust and fines.",
      },
      {
        id: "extended-mtbr",
        tag: "RELIABILITY",
        title: "Extended MTBR (Mean Time Between Replacements)",
        description:
          "High wear resistance minimizes the frequency of blade sharpening and replacement, keeping your recycling line running continuously.",
      },
      {
        id: "reduced-motor-load",
        tag: "EFFICIENCY",
        title: "Reduced Motor Load",
        description:
          "Optimized cutting angles decrease the shearing force required, lowering the electrical amp draw on your granulator's motor and reducing energy costs per ton.",
      },
    ],

    dimensionLabels: {
      col0: "Hole Configuration",
      col1: "Dimensions (L × W × T)",
      col2: "Hole Center Pitch",
      caption:
        "* Standard dimensions for rotor and stator knives in millimeters (mm). Custom profiles to drawing within 10 days.",
    },

    standardDimensions: [
      { spec: "Double hole", od: "90 × 70 × 8", bolt: "40 / 45 / 50" },
      { spec: "Double hole", od: "120 × 70 × 8", bolt: "60" },
      { spec: "Triple hole", od: "126 × 60 × 8", bolt: "40" },
      { spec: "Triple hole", od: "150 × 70 × 8", bolt: "50 / 55" },
      { spec: "Triple hole", od: "170 × 70 × 8", bolt: "45" },
      { spec: "Triple hole", od: "180 × 70 × 8", bolt: "60" },
      { spec: "Quadra hole", od: "170 × 70 × 8", bolt: "40" },
      { spec: "Quadra hole", od: "200 × 70 × 8", bolt: "50" },
    ],

    relatedBladeIds: [
      "single-shaft-rotor-inserts",
      "twin-shaft-blades-recycling",
    ],
    offers: {
      lowPrice: 25,
      highPrice: 320,
    },

    faqs: {
      technical: [
        {
          question:
            "How do I choose between D2, DC53, and Cr12MoV for my granulator?",
          answer:
            "D2 is the industry standard for clean plastics like PET and PP. For glass-filled or abrasive polymers, DC53 offers superior wear resistance. If your feed contains occasional metal impurities (like wire or staples), Cr12MoV provides higher impact toughness to prevent edge chipping.",
        },
        {
          question:
            "What causes excessive dust and fines during plastic granulation?",
          answer:
            "It's usually caused by blunt edges or an incorrect bevel angle tearing the plastic instead of shearing it. We optimize the bevel angle (30°–55°) based on your specific polymer to ensure clean cutting, which maximizes your regrind quality and pellet value.",
        },
        {
          question:
            "Can you match the exact bolt-hole patterns for my specific machine?",
          answer:
            "Absolutely. We maintain a vast database of OEM blueprints for Cumberland, Herbold, Rapid, Weima, and more. We CNC-mill all counter-bores to a strict ±0.02mm tolerance to guarantee a perfect drop-in fit without micro-rocking.",
        },
        {
          question:
            "What rotor knife geometry produces the lowest fines fraction in beside-the-press granulators?",
          answer:
            "For beside-the-press in-line granulators on injection moulding lines, a 40°–45° bevel angle with a polished rake face (Ra ≤ 0.8μm) delivers the cleanest, lowest-fines regrind on runner and sprue material. The polished face reduces adhesion in the cutting zone, preventing the micro-welding of HDPE and PP material that generates fines at the high cycle rates typical of continuous injection moulding production.",
        },
        {
          question:
            "When should I sharpen versus replace my granulator rotor knives?",
          answer:
            "The primary indicator is regrind particle size distribution - when the oversize fraction exceeds 8–10% of output weight, rotor knives need sharpening. Secondary indicators are a 15%+ increase in motor amp draw above baseline and elevated dust fraction. Each Sureay blade can typically be resharpened 3–5 times before the bevel geometry reaches minimum usable material depth, at which point replacement is more economical.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question:
            "What makes Sureay's heat treatment different from cheaper alternatives?",
          answer:
            "Unlike standard quenching, every Sureay blade undergoes deep cryogenic treatment after vacuum hardening. This transforms retained austenite into martensite, boosting wear resistance by up to 40% and ensuring uniform hardness across the entire cutting edge.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement blades typically ship within 48 hours. Custom profiles take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question:
            "What quality certifications does Sureay hold, and can you provide material test reports?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record, and a heat treatment batch certificate. For OEM qualification, full CMM dimensional reports and steel mill certificates are available on request.",
        },
        {
          question:
            "Can we trial a sample set before committing to a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2–5 blades) for machine fit verification and edge life testing. Standard sample lead time is 5–7 working days. For custom profiles, dimensional sign-off samples are produced before full production commences - no tooling commitment until fit is confirmed.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Metal Slitters (金属卷材纵剪/分条刀具组)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-coil-slitting-knives",
    name: "Metal Coil Slitting Knives",
    fullName: "Heavy-Duty Rotary Slitting Knives for Steel Coil Processing",
    category: "slitter_knives",
    sector: "metal",
    categoryDisplay: "Metal Slitting Blades",
    image:
      "/images/products/rotary-slitter-knives/metal-slitter-knives-00.webp",
    badge: "Heavy Duty",
    badgeColor: "red",
    gallery: [
      "/images/products/rotary-slitter-knives/metal-slitter-knives-00.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-03.webp",
      "/images/products/rotary-slitter-knives/metal-slitter-knives-05.webp",
    ],
    description:
      "Complete rotary coil slitting tooling for metal service centers and steel mills. D2, SKD-11, and H13 circular slitter knives lapped to Ra ≤ 0.2μm with ±0.001mm thickness tolerance. Engineered for burr-free shearing of cold-rolled (CR), hot-rolled (HR) steel, galvanized coils, and heavy silicon steel.",
    fullDescription:
      "Precision coil slitting demands a dimensional tolerance standard that most industrial cutting applications never approach. On a high-speed slitting line running heavy steel coils at 200–400 m/min across a multi-knife arbor stack, a cumulative thickness error of just 0.01mm per knife produces measurable slit-width deviation, severe edge burrs, and coil camber that exceeds the quality limits for automotive and appliance manufacturing.\n\nSureay circular metal slitter knives are manufactured to extreme verified tolerances. All knife side faces are finish-lapped to Ra ≤ 0.2μm. This mirror face finish is not merely aesthetic—it ensures full metal-to-metal contact between blades and spacers in the arbor stack, eliminating microscopic air gaps that allow individual blade deflection under lateral slitting loads.\n\n## Heavy Alloy Selection by Strip Material\n\n**Cold-Rolled & Galvanized Steel (CR, EG, HDG):** D2 (1.2379) or SKD-11, hardened to HRC 60–62 via vacuum quench. High chromium carbide content resists the abrasive wear from zinc spangle and surface scale. Recommended for continuous-shift CR steel service centers.\n\n**Hot-Rolled Steel & Heavy Gauge Plate:** H13 (SKD-61) hot-work tool steel or 6CrW2Si. Hot-rolled steel slitting generates massive impact forces and elevated ambient temperatures. H13's superior toughness prevents the catastrophic brittle fracture that destroys standard D2 blades on heavy-gauge lines.\n\n**Silicon Steel (CRGO / CRNO Electrical Grade):** Cr12MoV or PM powder-metallurgy grades. Silicon steel's extreme abrasiveness—primarily caused by silica inclusions—demands maximum wear resistance to maintain slit-width tolerances throughout a full transformer laminate production run.\n\n## Complete Slitting Arbor Tooling\n\nThe cutting knife is only one component of a precision coil slitting system. Steel spacers, bonded rubber stripper rings, and overarm separator discs must be dimensionally matched to the knife set to ensure uniform arbor preload and consistent strip tension. Sureay supplies fully integrated slitting tooling packages—verified as a matched system to eliminate tolerance stack-up errors.",
    link: "/products/metal-coil-slitting-knives",
    isFeatured: true,
    compatibleMachines: [
      "Fagor Arrasate",
      "Heinrich Georg",
      "Red Bud Industries",
      "Braner",
      "Salico",
      "Athader",
    ],

    specs: [
      {
        label: "Material",
        value: "D2, SKD11, Cr12MoV (Cold-Roll) | H13, 6CrW2Si (Hot-Roll)",
      },
      {
        label: "Hardness",
        value: "HRC 60–62 (Cold-Roll) | HRC 54–58 (Hot-Roll / Impact)",
      },
      { label: "Thickness Tol.", value: "Strictly ±0.001 mm" },
      { label: "Parallelism", value: "≤ 0.002 mm" },
      { label: "Surface Finish", value: "Mirror Lapped (Ra ≤ 0.2 μm)" },
      {
        label: "Complete Tooling",
        value: "Knives, Spacers, Rubber Stripper Rings, Separators",
      },
      {
        label: "Application",
        value: "Cold / Hot Rolled Steel, Silicon Steel, Galvanized Plate",
      },
    ],

    components: [
      {
        id: "micron-tolerance",
        tag: "PRECISION",
        title: "Micro-Tolerance Engineering",
        description:
          "Engineered with a thickness tolerance of ±0.001mm and parallelism of 0.002mm. This guarantees zero cumulative error when stacking multiple heavy blades and spacers on the slitter arbor.",
      },
      {
        id: "alloy-toughness",
        tag: "METALLURGY",
        title: "Heavy-Duty Alloy Selection",
        description:
          "From high-chromium D2/SKD11 for abrasive cold-rolled and galvanized steel, to shock-resistant H13 for heavy hot-rolled mills. Each blade is vacuum hardened to deliver exceptional edge strength.",
      },
      {
        id: "complete-setup",
        tag: "SYSTEM",
        title: "Complete Arbor Tooling",
        description:
          "Beyond blades, we provide exact-match steel spacers, rubber bonded stripper rings, and overarm separator discs. A fully integrated system ensures perfect strip tension and burr-free coil rewinding.",
      },
    ],

    dimensionLabels: {
      col0: "Typical Machine / Line Type",
      col1: "Outer Diameter",
      col2: "Inner Diameter",
      col3: "Thickness",
      caption:
        "* Dimensions shown are standard examples. We manufacture up to Ø 1500 mm for heavy-gauge plate slitting lines. Custom keyways and drive pin holes machined to exact OEM blueprints.",
    },

    standardDimensions: [
      {
        spec: "Light Gauge Slitting Line",
        od: "Ø 200 mm",
        id: "120 mm",
        thickness: "10 / 12 mm",
      },
      {
        spec: "Standard Steel Service Center",
        od: "Ø 250 mm",
        id: "150 mm",
        thickness: "12 / 15 mm",
      },
      {
        spec: "Medium-Heavy CR/HR Line",
        od: "Ø 315 mm",
        id: "200 mm",
        thickness: "15 / 20 mm",
      },
      {
        spec: "Heavy Gauge HR Steel Mill",
        od: "Ø 400 mm",
        id: "260 mm",
        thickness: "20 / 25 mm",
      },
      {
        spec: "Extreme Heavy Plate Mill",
        od: "Ø 500 mm",
        id: "320 mm",
        thickness: "30 / 40 mm",
      },
    ],

    relatedBladeIds: [
      "metal-foil-strip-slitter-knives",
      "scrap-chopper-blades",
    ],
    offers: {
      lowPrice: 80,
      highPrice: 1500,
    },
    faqs: {
      technical: [
        {
          question:
            "What knife clearance should I set for cold-rolled steel versus silicon steel?",
          answer:
            "For cold-rolled mild steel (CR, EG), set horizontal clearance at 8–10% of material thickness. For silicon steel (CRGO/CRNO), tighten clearance to 5–8% — silicon steel's extreme hardness and brittleness demand a tighter shear gap to prevent the edge fracturing that produces burrs on transformer laminate strips.",
        },
        {
          question:
            "Why does my slit-width drift across the full coil width after the first coil?",
          answer:
            "Slit-width drift is caused by blade-to-spacer face contact loss from varying thickness tolerances in the arbor stack. Even a 0.002mm blade-thickness inconsistency in a 20-knife stack creates a cumulative 0.04mm lateral shift. Our blades and spacers are lapped to ±0.001mm thickness tolerance and Ra ≤ 0.2μm face finish, eliminating the air gaps that allow individual blade deflection.",
        },
        {
          question:
            "Should I use D2 or H13 for slitting 8mm thick Hot-Rolled (HR) steel plate?",
          answer:
            "For 8mm HR plate, you must use H13 or 6CrW2Si. Slitting heavy-gauge hot-rolled steel generates massive impact shock at the bite point. D2 (at HRC 60) is too brittle and will likely shatter or suffer severe micro-chipping under these loads. H13 (tempered to HRC 54–56) provides the massive core toughness required to absorb these impact forces reliably.",
        },
        {
          question:
            "What maintenance inspection schedule maximizes circular slitter knife service life?",
          answer:
            "Inspect knife faces weekly under 10× magnification for edge chipping (indicates clearance drift or hard material inclusions). Re-lap side faces when surface roughness exceeds Ra 0.4μm to restore full arbor contact. Store removed knives vertically in rust-inhibitor oil to prevent corrosive pitting during idle periods.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply a complete integrated tooling package including spacers and stripper rings?",
          answer:
            "Yes. We supply complete matched slitting tooling systems: knife sets, precision steel spacers (ground to ±0.001mm), bonded rubber stripper rings, and overarm separator discs. Sourcing all components from a single verified tolerance stack eliminates the cumulative errors that appear when mixing tooling from separate suppliers.",
        },
        {
          question:
            "Do you manufacture large diameter slitter knives for heavy plate mills?",
          answer:
            "Yes, our heavy grinding and heat treatment facilities can process circular slitting knives up to 1500mm in outer diameter, specifically designed for heavy gauge hot-rolled coil and plate mill edge-trimming applications.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Metal Shear Knives
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-shear-knives",
    name: "Metal Shear Knives",
    fullName:
      "Heavy-Duty Guillotine & Scrap Shear Knives for Metal Fabrication",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Metal Shear Knives",
    image: "/images/products/granulator-blades/metal-shear-blades-00.webp",
    badge: "Heavy Shearing",
    badgeColor: "blue",
    gallery: [
      "/images/products/granulator-blades/metal-shear-blades-00.webp",
      "/images/products/granulator-blades/metal-shear-blades-04.webp",
      "/images/products/granulator-blades/metal-shear-blades-02.webp",
    ],
    description:
      "Premium straight shear blades for hydraulic guillotines, alligator shears, and heavy scrap metal shears. Forged from D2, S1 (6CrW2Si), and H13 tool steels. Surface-ground to ±0.05 mm full-length parallelism for burr-free shearing of mild steel, stainless plate, and heavy scrap billets.",

    fullDescription:
      "Guillotine and scrap shear blades operate under conditions that expose every weakness in alloy selection, heat treatment depth, and grinding parallelism. The upper shear blade is driven against the lower under actuator forces from 40 to over 2000 tonnes on heavy plate shearing lines. Premature failure modes—edge rollover on mild steel, brittle fracture on stainless, or shattering on heavy scrap—are each attributable to metallurgical mismatch or grinding parallelism deviations that concentrate extreme forces at a single point.\n\nSureay metal shear blades are supplied in three specific metallurgical grades, each matched to a defined mechanical regime:\n\n## Alloy Selection by Shearing Application\n\n**Cold Shearing (Mild Steel):** Standard high-carbon tool steels hardened to HRC 57–59. This provides sharp, stable edge geometry at an economical cost, making it the correct specification for general fabrication shops and structural steel contractors cutting standard A3/A36 mild steel plate up to 8 mm.\n\n**Heavy Plate & Stainless Shearing:** D2 (Cr12MoV) equivalent grades hardened to HRC 58–60. Specified for maximum wear resistance on austenitic stainless steel (304, 316L) and high-strength alloy plates (Hardox). The high chromium-carbide matrix withstands the severe work-hardening wear imposed by these tough metals.\n\n**Scrap Recycling & Hot Shearing:** S1 (6CrW2Si) shock-resisting steel and H13 hot-work tool steel. When shearing mixed scrap metal, rebar, or hot steel billets (900–1100°C), extreme impact toughness is prioritized over hardness. These alloys absorb massive shock loads without the brittle fracture that destroys standard D2 blades.\n\n## The Parallelism Imperative (±0.05 mm)\nImproper parallelism is the single most common preventable cause of premature shear blade failure. Uneven face contact concentrates the full shearing load onto a reduced length of the blade edge, producing edge rollover or chipping within hours. All Sureay shear blades are precision surface-ground on both cutting faces to guarantee a standard parallelism tolerance of ±0.05 mm over a 1000 mm length (with premium ±0.02 mm tolerances available for aerospace and precision stainless applications).",

    link: "/products/metal-shear-knives",
    isFeatured: true,
    compatibleMachines: [
      "TRUMPF",
      "AMADA",
      "BYSTRONIC",
      "Durma",
      "Haco",
      "Lefort",
      "Harris",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 (Cr12MoV), S1 (6CrW2Si), H13, High Carbon Steel",
      },
      {
        label: "Cold / Mild Steel",
        value: "High Carbon Tool Steel (HRC 57–59)",
      },
      { label: "Stainless / Heavy", value: "D2 / Cr12MoV (HRC 58–60)" },
      {
        label: "Scrap / High Impact",
        value: "S1 / 6CrW2Si / H13 (Shock Resistant)",
      },
      {
        label: "Length Capacity",
        value: "Up to 6000 mm (Single Piece Seamless)",
      },
      { label: "Edge Geometry", value: "1, 2, or 4 Usable Cutting Edges" },
      { label: "Tolerance", value: "±0.05 mm Full-Length Parallelism" },
      {
        label: "Application",
        value: "Plate Shearing, Alligator Shears, Scrap Metal Balers",
      },
    ],

    components: [
      {
        id: "stainless-shearing",
        tag: "HEAVY DUTY",
        title: "D2 for Stainless & Heavy Plate",
        description:
          "Utilizing premium D2 (Cr12MoV) steel deep-hardened to HRC 58–60. It withstands the extreme abrasive wear and work-hardening forces when shearing stainless steel and thick alloy plates.",
      },
      {
        id: "scrap-shearing",
        tag: "HIGH IMPACT",
        title: "S1 Shock-Resisting Steel for Scrap",
        description:
          "For alligator shears and heavy scrap balers, standard blades shatter. We forge these blades from S1 (6CrW2Si) shock-resisting steel, providing massive core toughness to shear rebar and I-beams without fracturing.",
      },
      {
        id: "precision-parallelism",
        tag: "TOLERANCE",
        title: "Precision Parallelism (±0.05 mm)",
        description:
          "Surface-ground to absolute perfection. Maintaining strict parallelism across lengths up to 6 meters ensures your machine maintains a uniform shear gap, delivering burr-free cuts every time.",
      },
    ],

    dimensionLabels: {
      col0: "Typical Size (L × W × T)",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard dimensions for common hydraulic guillotine shear models. Custom lengths to 6000 mm, multi-segment designs, and single / double / quad-edge profiles available.",
    },

    standardDimensions: [
      { spec: "500 × 70 × 22", od: "500", id: "70", thickness: "22" },
      { spec: "510 × 80 × 25", od: "510", id: "80", thickness: "25" },
      { spec: "1025 × 80 × 20", od: "1025", id: "80", thickness: "20" },
      { spec: "1025 × 100 × 25", od: "1025", id: "100", thickness: "25" },
      { spec: "1300 × 80 × 20", od: "1300", id: "80", thickness: "20" },
      { spec: "1300 × 125 × 32", od: "1300", id: "125", thickness: "32" },
      { spec: "3100 × 100 × 25", od: "3100", id: "100", thickness: "25" },
      {
        spec: "Heavy Scrap Shear",
        od: "Custom",
        id: "Custom",
        thickness: "Up to 100+",
      },
    ],

    relatedBladeIds: [
      "metal-coil-slitting-knives",
      "multi-shaft-blades-metal",
      "scrap-chopper-blades",
    ],
    offers: {
      lowPrice: 120,
      highPrice: 2500,
    },
    faqs: {
      technical: [
        {
          question:
            "Which alloy should I use for shearing 304 stainless steel?",
          answer:
            "We recommend D2 (Cr12MoV) for stainless steel (304, 316L) and high-strength plates like Hardox. D2's high chromium-carbide matrix withstands the severe work-hardening wear imposed by austenitic stainless. For standard mild steel, high-carbon tool steel provides maximum toughness at a lower cost.",
        },
        {
          question:
            "Our blades keep chipping when cutting mixed scrap metal. What is wrong?",
          answer:
            "You are likely using a blade that is too hard (like D2). Mixed scrap contains unpredictable, heavy solids (like rebar or bolts). When extreme impact hits a hard, brittle blade, it chips or shatters. You need to switch to a shock-resisting alloy like S1 (6CrW2Si) or H13, tempered to a slightly lower hardness (HRC 54–56) to absorb the massive kinetic shocks elastically.",
        },
        {
          question:
            "What edge profile minimizes burrs when shearing high-tensile steel plates?",
          answer:
            "The critical factor is contact uniformity. Uneven blade-to-blade contact concentrates shear force at one end, producing the compressive rollover and tearing burr characteristic of high-work-hardening steels. Our standard tolerance is ±0.05 mm parallelism over 1000 mm; premium ±0.02 mm is specified for stainless and precision applications.",
        },
        {
          question:
            "How do double-edge reversible blades reduce my annual tooling cost?",
          answer:
            "A double-edge (or 4-edge) reversible blade provides multiple independent cutting faces from a single blade body. When edge 1 shows wear, loosen the mounting bolts, flip or rotate the blade, and retorque. This multiplies the blade's lifespan before regrinding is required, reducing per-cut tooling costs drastically.",
        },
      ],
      company: [
        {
          question:
            "Can you manufacture blades to match my TRUMPF, AMADA, or Durma guillotine exactly?",
          answer:
            "Yes. We carry OEM-matching dimensions for TRUMPF, AMADA, BYSTRONIC, Durma, and Haco platforms. Single-piece blades up to 6000 mm, multi-segment designs for longer tables, and single, double, or quad-edge profiles are all available. Custom lengths are manufactured to drawing within 15 working days.",
        },
        {
          question:
            "Can Sureay manufacture replacement blades for obsolete heavy scrap shears?",
          answer:
            "Yes. For heavy scrap shears (Lefort, Harris, Genesis) or obsolete models, we work from customer-supplied drawings or physical blade samples. A dimensional survey template is available on request for accurate measurement of the blade profile and counter-sunk mounting holes.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2b. Guillotine Shear Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "guillotine-shear-blades",
    name: "Guillotine Shear Blades",
    fullName:
      "Precision Guillotine Shear Blades for Hydraulic & Mechanical Sheet Metal Shearing Machines",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Guillotine Shear Blades",
    image:
      "/images/products/guillotine-shear-blades/guillotine-shear-blades-00.webp",
    badge: "Sheet Metal",
    badgeColor: "blue",
    gallery: [
      "/images/products/guillotine-shear-blades/guillotine-shear-blades-00.webp",
      "/images/products/guillotine-shear-blades/guillotine-shear-blades-01.webp",
      "/images/products/guillotine-shear-blades/guillotine-shear-blades-02.webp",
    ],

    description:
      "High-precision guillotine shear blades in D2 (Cr12MoV), 6CrW2Si, and 9CrSi tool steels for hydraulic and mechanical shearing machines. Surface-ground to ±0.05 mm full-length parallelism. Upper and lower blade sets for machines up to 16 mm × 4000 mm capacity. OEM-compatible replacements for TRUMPF, AMADA, LVD, Durma, and Bystronic guillotines.",

    fullDescription:
      "Guillotine shear blades are the critical cutting components in hydraulic and mechanical plate shearing machines used across steel service centers, shipyards, structural fabrication shops, and automotive stamping plants. Every cut cycle subjects the blade to enormous shear force concentrated along a narrow edge line — the blade must maintain razor-sharp edge geometry, absolute parallelism, and uniform hardness across its full length to deliver burr-free, distortion-free sheet metal cuts.\n\nSureay manufactures guillotine shear blades from premium tool steels — D2 (Cr12MoV), 6CrW2Si, and 9CrSi — each selected for a specific thickness range and material hardness profile. Every blade is vacuum heat-treated in-house and precision surface-ground to ±0.05 mm full-length parallelism, ensuring the shear gap between upper and lower blades remains uniform from end to end. This eliminates the twist, bow, and edge burring that plague poorly manufactured replacement blades.\n\n## Alloy Selection by Shearing Application\n\n**D2 / Cr12MoV (HRC 58–62):** The premium specification for shearing stainless steel (304, 316L), high-strength low-alloy (HSLA) plates, Hardox wear plate, and pre-painted coil. D2's 12% chromium-carbide matrix provides the extreme abrasion resistance needed when cutting work-hardening austenitic stainless steels that rapidly dull softer blade grades.\n\n**6CrW2Si (HRC 55–58):** A shock-resisting alloy that combines excellent edge hardness with core toughness. Specified for medium-to-heavy plate shearing (6–25 mm mild steel) and mixed-material production environments where the blade occasionally encounters harder-than-expected stock. The tungsten and chromium content provides high-temperature temper resistance.\n\n**9CrSi (HRC 55–60):** A cost-effective alloy for high-volume mild steel and carbon steel shearing (up to 12 mm). 9CrSi delivers reliable edge life on standard structural steel, galvanized sheet, and floor plate at a lower per-blade cost than D2.\n\n## Upper & Lower Blade Sets\n\nGuillotine shearing machines operate with paired upper (moving ram) and lower (fixed bed) blades. Sureay supplies matched upper and lower blade sets ground from the same steel batch, ensuring identical hardness and thermal expansion behavior across the pair. Each set is supplied with mounting holes drilled to the exact OEM bolt pattern of your machine.\n\n## Multi-Edge Reversible Blades\n\nFor standard rectangular-section blades, we offer 2-edge and 4-edge reversible profiles. When one cutting edge wears, the operator loosens the mounting bolts, flips or rotates the blade to expose a fresh edge, and retorques. This multiplies effective blade life by 2× to 4× before regrinding or replacement is required — drastically reducing annual tooling cost per cut.\n\n## Segment Blade Systems for Long Tables\n\nFor shearing machines wider than 3200 mm, single-piece blades become impractical due to heat treatment distortion risk. Sureay manufactures precision segment blade systems — multiple shorter blades indexed end-to-end on the machine bed — with matched end-to-end height tolerance (±0.02 mm) to ensure a continuous, gap-free shear line across the full table width.",

    link: "/products/guillotine-shear-blades",
    isFeatured: true,

    compatibleMachines: [
      "TRUMPF",
      "AMADA",
      "Bystronic",
      "LVD",
      "Durma",
      "Haco",
      "Cincinnati",
      "Salvagnini",
      "Adira",
      "Ursviken",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 (Cr12MoV), 6CrW2Si, 9CrSi, High Carbon Steel",
      },
      {
        label: "Hardness",
        value: "HRC 55–62 (alloy dependent)",
      },
      {
        label: "Machine Capacity",
        value: "4 mm × 2500 mm up to 16 mm × 4000 mm (and custom)",
      },
      {
        label: "Edge Profile",
        value: "1, 2, or 4 Usable Cutting Edges (Reversible)",
      },
      {
        label: "Tolerance",
        value: "±0.05 mm Full-Length Parallelism",
      },
      {
        label: "Application",
        value:
          "Sheet Metal Shearing, Plate Cutting, Stainless Steel, Mild Steel, Galvanized Sheet",
      },
    ],

    components: [
      {
        id: "d2-stainless-shearing",
        tag: "HEAVY PLATE",
        title: "D2 for Stainless & HSLA Plate",
        description:
          "Premium D2 (Cr12MoV) deep-hardened to HRC 58–62. The high chromium-carbide matrix withstands the extreme abrasive wear and work-hardening forces encountered when shearing 304/316L stainless steel, HSLA plate, and pre-painted coil stock.",
      },
      {
        id: "6crw2si-shock",
        tag: "SHOCK RESISTANCE",
        title: "6CrW2Si for Medium-Heavy Plate",
        description:
          "Shock-resisting 6CrW2Si alloy combines hard cutting edges (HRC 55–58) with massive core toughness. Engineered for 6–25 mm mild steel plate and mixed-material production where unexpected hard inclusions would chip a brittle blade.",
      },
      {
        id: "parallelism-precision",
        tag: "TOLERANCE",
        title: "Precision Parallelism (±0.05 mm)",
        description:
          "Every blade is surface-ground to ±0.05 mm full-length parallelism across lengths up to 4000 mm. This ensures a uniform shear gap between upper and lower blades, delivering burr-free cuts and preventing twist and bow in the sheared sheet.",
      },
    ],

    dimensionLabels: {
      col0: "Machine Capacity",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      col4: "Pcs / Set",
      caption:
        "* Standard dimensions for common hydraulic & mechanical guillotine shearing machines. Each set includes upper and lower blades. Segment designs for tables wider than 4000 mm available on request. Custom lengths, multi-edge profiles, and OEM bolt patterns manufactured to drawing.",
    },

    standardDimensions: [
      { spec: "4 × 2500", od: "508", id: "80", length: "25", pcs: "10" },
      { spec: "4 × 2500", od: "1300", id: "63", length: "16", pcs: "4" },
      { spec: "6 × 2500", od: "1300", id: "80", length: "20", pcs: "4" },
      { spec: "6 × 3200", od: "1100", id: "80", length: "20", pcs: "6" },
      { spec: "6 × 4000", od: "1025", id: "80", length: "20", pcs: "8" },
      { spec: "16 × 2500", od: "1300", id: "100", length: "25", pcs: "4" },
      { spec: "16 × 3200", od: "1100", id: "100", length: "25", pcs: "6" },
      { spec: "16 × 4000", od: "1025", id: "100", length: "25", pcs: "8" },
    ],

    relatedBladeIds: [
      "metal-shear-knives",
      "metal-coil-slitting-knives",
      "scrap-chopper-blades",
      "multi-shaft-blades-metal",
    ],

    offers: {
      lowPrice: 30,
      highPrice: 350,
    },

    faqs: {
      technical: [
        {
          question:
            "Which steel grade should I choose for shearing 304 stainless steel on a hydraulic guillotine?",
          answer:
            "D2 (Cr12MoV) hardened to HRC 58–62 is the recommended grade for stainless steel (304, 316L) and high-strength plates like Hardox. D2's high chromium-carbide content withstands the severe work-hardening abrasion imposed by austenitic stainless. For standard mild steel, 9CrSi provides excellent edge life at a lower cost.",
        },
        {
          question:
            "Why do my guillotine shear blades chip when cutting mixed or heavier plate?",
          answer:
            "Chipping usually indicates the blade alloy is too hard and brittle for the shearing load. If you are cutting 10–25 mm mixed plate or occasionally encounter harder stock, switch from D2 to 6CrW2Si. This shock-resisting alloy provides a controlled lower hardness (HRC 55–58) with massive core toughness, absorbing impact loads elastically instead of chipping.",
        },
        {
          question:
            "What causes burrs and twist on the sheared edge, and how do guillotine shear blades solve this?",
          answer:
            "Burrs and twist are almost always caused by uneven blade-to-blade contact — when the shear gap varies from one end of the blade to the other. This concentrates shear force at one point, producing compressive rollover burrs and sheet distortion. Our blades are surface-ground to ±0.05 mm full-length parallelism, ensuring a uniform gap across the entire cut length for clean, burr-free shearing.",
        },
        {
          question:
            "How do 4-edge reversible guillotine shear blades reduce my annual tooling cost?",
          answer:
            "A 4-edge reversible blade provides four independent cutting faces from a single blade body. When edge 1 shows wear, loosen the mounting bolts, rotate the blade 90° to expose a fresh edge, and retorque. This multiplies the blade's installed lifespan by 4× before regrinding is required, drastically reducing per-cut tooling cost on high-volume shearing lines.",
        },
        {
          question:
            "What is the maximum single-piece blade length Sureay can manufacture?",
          answer:
            "We manufacture single-piece guillotine shear blades up to 4000 mm in length. For machines wider than 4000 mm, we produce precision segment blade sets — multiple blades indexed end-to-end with matched height tolerance (±0.02 mm) — to create a continuous, gap-free shear line across the full table width.",
        },
        {
          question:
            "How do I select the correct blade dimensions for my specific guillotine shearing machine?",
          answer:
            "Blade dimensions are determined by your machine's cutting capacity (maximum sheet thickness × table width). For example, a 6 × 3200 mm machine uses blades sized 1100 × 80 × 20 mm, supplied as a 6-piece segmented set. Send us your machine model number or a drawing of your existing blade, and we will confirm the exact dimensions, bolt pattern, and recommended steel grade.",
        },
      ],
      company: [
        {
          question:
            "Can you manufacture replacement blades to match my TRUMPF, AMADA, LVD, or Durma guillotine exactly?",
          answer:
            "Yes. We carry OEM-matching dimensions and bolt patterns for TRUMPF, AMADA, Bystronic, LVD, Durma, Haco, Cincinnati, and Adira shearing machines. Supply your machine model number or a worn blade sample and we will confirm fitment. Custom lengths are manufactured to drawing within 15 working days.",
        },
        {
          question:
            "Do you supply both upper and lower guillotine shear blade sets?",
          answer:
            "Yes. Every standard order includes matched upper (ram) and lower (bed) blade sets, ground from the same steel batch to ensure identical hardness, grain structure, and thermal expansion behavior across the pair. Mounting holes are drilled to your exact OEM bolt pattern.",
        },
        {
          question:
            "Can Sureay manufacture replacement blades for older or discontinued shearing machines?",
          answer:
            "Yes. For discontinued or rare guillotine models, we work from customer-supplied drawings or physical blade samples. A dimensional survey template is available on request for accurate measurement of the blade profile, edge angles, and counter-sunk mounting holes. We have successfully produced replacements for machines dating back to the 1980s.",
        },
        {
          question: "What quality documentation ships with each blade set?",
          answer:
            "Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record verifying full-length parallelism, and a heat treatment batch certificate. For OEM qualification programs, full CMM reports and steel mill material certificates are available on request.",
        },
        {
          question:
            "What is the typical lead time for standard guillotine shear blades?",
          answer:
            "Standard sizes (listed in our dimension table) ship within 7–10 working days. Custom sizes, special alloy grades, or high-volume orders typically require 15–20 working days. We offer expedited production on request for urgent machine-down situations.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Three-Knife Trimmer Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "three-knife-trimmer-blades",
    name: "Three-Knife Trimmer Blades",
    fullName: "Premium HSS & Carbide Three-Knife Trimmer Sets for Bookbinding",
    category: "shear_blades",
    sector: "paper",
    categoryDisplay: "Bookbinding Knives",
    badge: "OEM Fit",
    badgeColor: "blue",
    image:
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
    gallery: [
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-03.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-04.webp",
    ],

    description:
      "Matched 3-knife replacement sets (1 Front, 2 Sides) for high-volume print finishing. Bimetallic construction with 18% Tungsten HSS or solid Tungsten Carbide (TC) cutting edges. Direct OEM fit for Müller Martini, Kolbus, and Wohlenberg trimmers.",

    fullDescription:
      "In high-speed commercial bindery and print finishing operations, the three-knife trimmer is the final, critical step before packaging. Substandard trimmer blades cause spine splitting, cover chipping, and PUR/EVA glue build-up, turning finished books into expensive scrap.\n\nSureay Three-Knife Trimmer sets are manufactured to precise OEM specifications to guarantee flawless fore-edges, heads, and tails on thick catalogs, magazines, and perfect-bound books.\n\n## Advanced Bimetallic Construction\n\nSolid high-speed steel blades of this size are too brittle and prone to snapping under the immense clamping pressure of a book trimmer. We utilize an advanced **Bimetallic Inlay** manufacturing process. A premium cutting edge—either 18% Tungsten HSS or micro-grain Tungsten Carbide—is vacuum-brazed onto a shock-absorbing, high-tensile spring steel body. This delivers the ultimate combination: an incredibly hard, wear-resistant cutting edge backed by a flexible, shatter-proof core.\n\n## Material Grades for the Bindery\n\n- **18% Tungsten HSS (High-Speed Steel):** The industry standard for general commercial printing. Delivers an extremely sharp, fine edge that easily handles standard uncoated and lightly coated book stocks.\n- **Tungsten Carbide (TC / Widia Equivalent):** The absolute top-tier specification. TC blades deliver up to **5× to 10× the service life** of HSS. They are mandatory when cutting heavy recycled paper, highly abrasive gloss-coated art paper, or books bound with tough PUR adhesives.\n\n## Anti-Glue Mirror Finish\n\nModern perfect-bound books use aggressive EVA or PUR adhesives. During the trim cycle, friction heats the glue, causing it to smear and stick to the blade face. Sureay trimmer blades are precision-lapped to a Ra ≤0.1 μm mirror finish, significantly reducing friction and adhesive adherence, ensuring a clean cut cycle after cycle.",

    link: "/products/three-knife-trimmer-blades",
    isFeatured: true,

    compatibleMachines: [
      "Müller Martini",
      "Kolbus",
      "Wohlenberg",
      "Perfecta",
      "Meccanotecnica",
      "Horizon",
    ],

    specs: [
      {
        label: "Material",
        value: "18% Tungsten HSS (Duritan eq.) | Tungsten Carbide (TC)",
      },
      {
        label: "Construction",
        value: "Bimetallic Inlay (Hard edge brazed to tough steel body)",
      },
      {
        label: "Surface Finish",
        value: "Mirror Lapped (Ra ≤0.1 μm) to prevent glue build-up",
      },
      {
        label: "Set Configuration",
        value: "Matched 3-Piece Set (1 Front Knife, 2 Side Knives)",
      },
      {
        label: "OEM Tolerance",
        value: "Thickness matched to ±0.01 mm across the full set",
      },
      {
        label: "Applications",
        value: "Perfect Bound Books, Magazines, Hardcover Book Blocks",
      },
    ],

    components: [
      {
        id: "bimetallic-inlay",
        tag: "METALLURGY",
        title: "Bimetallic Inlay Technology",
        description:
          "We braze a premium High-Speed Steel (HSS) or Tungsten Carbide edge onto a tough, flexible alloy steel body. This gives you the extreme wear resistance needed for coated paper, without the risk of the blade snapping under heavy clamping pressure.",
      },
      {
        id: "matched-sets",
        tag: "CONFIGURATION",
        title: "Matched 3-Piece Sets",
        description:
          "Supplied as a ready-to-install set (1 Front, 1 Left, 1 Right). All three blades are precision surface-ground in the same batch to a ±0.01 mm thickness tolerance, ensuring zero-downtime installation and perfect alignment.",
      },
      {
        id: "anti-glue-finish",
        tag: "PERFORMANCE",
        title: "Anti-Glue Mirror Finish",
        description:
          "Cutting through book spines exposes the blade to hot, sticky PUR and EVA adhesives. Our blades are lapped to a microscopic mirror finish, preventing glue drag that would otherwise smear across the book’s edge.",
      },
    ],

    dimensionLabels: {
      col0: "OEM Machine Model",
      col1: "Blade Position",
      col2: "Dimensions (L × W × T)",
      col3: "Mounting Holes / Slots",
      caption:
        "* Dimensions reflect standard Müller Martini and Kolbus models. We carry OEM blueprints for Wohlenberg and Perfecta. Custom hole patterns machined to order.",
    },

    standardDimensions: [
      {
        spec: "Müller Martini 301/361",
        od: "Front Knife",
        id: "540 × 90 × 12 mm",
        type: "12 × M10 Threaded",
      },
      {
        spec: "Müller Martini 301/361",
        od: "Left & Right",
        id: "392 × 90 × 12 mm",
        type: "8 × M10 Threaded",
      },
      {
        spec: "Müller Martini 3671 Merit",
        od: "Front Knife",
        id: "580 × 115 × 12 mm",
        type: "12 × M10, 1 Slot",
      },
      {
        spec: "Müller Martini 3671 Merit",
        od: "Left & Right",
        id: "450 × 115 × 12 mm",
        type: "15 × M10, 2 Slots",
      },
      {
        spec: "Kolbus HD 150/153",
        od: "Front Knife",
        id: "510 × 110 × 10 mm",
        type: "10 × M10 Threaded",
      },
      {
        spec: "Kolbus HD 150/153",
        od: "Left & Right",
        id: "400 × 110 × 10 mm",
        type: "8 × M10 Threaded",
      },
    ],

    relatedBladeIds: ["paper-cutting-blades", "tissue-log-saw-blades"],
    offers: {
      lowPrice: 120,
      highPrice: 850,
    },
    faqs: {
      technical: [
        {
          question:
            "When should I upgrade from HSS to Tungsten Carbide (TC) trimmer blades?",
          answer:
            "You should upgrade to Tungsten Carbide (TC) when cutting high volumes of recycled paper, gloss-coated art paper, or thick books bound with heavy PUR adhesive. Coated papers contain clay and minerals that dull HSS very quickly. TC blades provide 5 to 10 times the cutting life of HSS, drastically reducing machine downtime for blade changes.",
        },
        {
          question:
            "Why do my trimmer blades keep tearing or chipping the book spine?",
          answer:
            "Spine tearing is usually caused by one of three things: (1) The blade is dull and needs changing; (2) The bevel angle is incorrect for the type of paper/glue being cut; or (3) Adhesive build-up on the back of the blade is causing ‘drag’. Ensure your blades have a mirror-lapped finish to prevent glue adhesion, and consider upgrading to HSS or Carbide for better edge retention.",
        },
        {
          question: "Can Tungsten Carbide (TC) trimmer blades be resharpened?",
          answer:
            "Yes, but they must be sharpened using specialized diamond grinding wheels. Using standard aluminum oxide or silicon carbide wheels will destroy the carbide edge and generate micro-cracks. If your local sharpening service does not have the correct diamond wheel equipment, we recommend sending them to a specialized industrial grinder.",
        },
        {
          question:
            "What is the correct installation sequence for a three-knife set?",
          answer:
            "Because the side knives often shear slightly against the cutting stick or front knife path, alignment is critical. Install all three blades loosely first. Set and torque the front knife to establish the head datum, then alternate tightening the side knives. Since our 3-piece sets are ground to an identical thickness tolerance, they prevent the uneven clamping pressure that causes binding.",
        },
      ],
      company: [
        {
          question:
            "Do your trimmer blades fit Kolbus, Wohlenberg, and Perfecta machines?",
          answer:
            "Yes. We maintain a comprehensive database of exact OEM blueprints for all major European and Japanese bookbinding lines, including Müller Martini, Kolbus, Wohlenberg, Perfecta, and Horizon. The mounting holes, slots, and threaded inserts will be a perfect drop-in fit.",
        },
        {
          question:
            "What is the lead time for a custom Tungsten Carbide trimmer set?",
          answer:
            "Standard HSS sets for popular Müller Martini and Kolbus models are often in stock. Custom Tungsten Carbide (TC) inlaid sets typically require 15–20 working days to manufacture, due to the complex vacuum brazing and diamond grinding processes required for carbide.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. Lithium Battery Electrode Slitting Knives
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lithium-battery-slitting-knives",
    name: "Battery Slitting Knives",
    fullName:
      "Tungsten Carbide Circular Slitting Knives for Lithium Battery Electrode Foil",
    category: "slitter_knives",
    sector: "new_energy",
    categoryDisplay: "Battery Precision Blades",
    image:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
    badge: "New Energy",
    badgeColor: "blue",
    gallery: [
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-07.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-detail.webp",
    ],
    description:
      "Mirror-finish tungsten carbide circular slitting knives for lithium-ion battery electrode foil. Zero-notch Ra ≤ 0.05μm edge quality prevents micro-burrs on Al cathode and Cu anode foil, maintaining ISO Class 7 cell assembly cleanliness. Tolerance: ±0.001mm thickness, ≤0.01mm T.I.R.",
    fullDescription:
      "Lithium battery electrode slitting is among the most demanding precision cutting applications in industrial manufacturing. A single micro-burr or edge notch on the cut foil edge can penetrate the separator membrane during cell assembly, causing internal short-circuit and catastrophic battery failure. Sureay lithium battery slitting knives are engineered to eliminate this risk through extreme dimensional precision and surface metallurgy.\n\nEvery knife is manufactured from ultra-fine grain tungsten carbide (WC-Co, grain size ≤ 0.5μm) and precision ground to a Ra ≤ 0.05μm mirror finish on the cutting bevel. Thickness tolerance is held to ±0.001mm across the full disc face — three times tighter than standard slitter knife specifications — and total indicated runout (T.I.R.) is verified at ≤0.01mm on every unit before shipment. This zero-notch edge geometry prevents micro-delamination at the foil cut edge and eliminates the metallic particle generation that contaminates dry-room cell assembly environments.\n\n## Electrode Foil Applications\n\n**Aluminum Cathode Foil (LFP, NMC, NCA Cells):** Thickness range 12–20μm. The hard, brittle oxide layer on battery-grade Al foil rapidly abrades standard HSS and D2 edges within a single roll. Tungsten carbide grades maintain a geometric edge life 8–12× longer, reducing unplanned stops on high-speed winder lines running at 80–120 m/min.\n\n**Copper Anode Foil (LFP, NMC, Solid-State Cells):** Thickness range 6–12μm. Ultra-thin Cu foil requires the knife/anvil clearance to be set within ±0.002mm to prevent foil wrinkling and telescoping on the rewind roll. Our diameter-matched knife pairs are ground as mated sets with clearance pre-verified to your machine specification.\n\n**PVDF Separator Film (Dry Process):** Ceramic-coated separator film for dry-electrode processes (used in Gen 4 solid-state cell lines) presents an extremely abrasive cutting substrate. Cermet-grade or solid PCD (polycrystalline diamond) knives are available for this application on request.\n\n## Cleanroom Compatibility\n\nAll knives are ultrasonically cleaned, individually packaged in sealed anti-static bags, and certified particulate-free to ISO Class 7 standards. Packaging and material certificates are compliant with IATF 16949 documentation requirements for EV battery supply chains.",
    link: "/products/lithium-battery-slitting-knives",
    isFeatured: true,
    compatibleMachines: [
      "Kaido",
      "Koem",
      "Hirano Tecseed",
      "CKD",
      "Manz",
      "Targray",
    ],

    specs: [
      {
        label: "Material",
        value: "Ultra-fine WC-Co Tungsten Carbide, Cermet (on request)",
      },
      {
        label: "Surface Finish",
        value: "Mirror polish Ra ≤ 0.05μm — zero-notch edge",
      },
      {
        label: "Tolerance",
        value: "Thickness: ±0.001mm | T.I.R. Runout: ≤0.01mm",
      },
      { label: "Hardness", value: "HRA 91–93 (WC-Co grade)" },
      {
        label: "Coatings",
        value: "DLC, TiN (optional, anti-adhesion for PVDF-coated foil)",
      },
      {
        label: "Application",
        value:
          "Al cathode foil (12–20μm), Cu anode foil (6–12μm), PVDF separator film",
      },
    ],

    components: [
      {
        id: "zero-notch-edge",
        tag: "PRECISION",
        title: "Zero-Notch Mirror Finish",
        description:
          "Every cutting bevel is lapped to Ra ≤ 0.05μm — the same surface quality standard used for optical lens grinding. This eliminates the micro-notching that generates metallic particles in dry-room cell assembly environments and prevents separator membrane puncture.",
      },
      {
        id: "ultra-fine-carbide",
        tag: "METALLURGY",
        title: "Ultra-Fine WC-Co Carbide Grade",
        description:
          "Standard industrial carbide uses grain sizes of 1–3μm. Our battery-grade knives are manufactured from ≤0.5μm submicron WC-Co, providing dramatically higher edge hardness (HRA 91–93), superior abrasion resistance on thin Al and Cu foils, and a longer polishable service life between regrinding cycles.",
      },
      {
        id: "matched-knife-pairs",
        tag: "PROCESS CAPABILITY",
        title: "Pre-Verified Clearance Pairs",
        description:
          "Upper and lower knife sets are ground as matched diameter pairs with clearance pre-verified to your winding machine specification (typically 0.002–0.005mm for Cu foil). Each pair ships with an engineering data sheet recording OD, ID, thickness, and measured clearance, enabling consistent line-side reinstallation.",
      },
    ],

    dimensionLabels: {
      col1: "Outer Diameter (OD)",
      col2: "Inner Diameter (ID)",
      col3: "Thickness",
      caption:
        "* Standard dimensions for battery electrode foil slitting. Custom OD/ID and thickness available for all winding machine models. Matched top/bottom pairs supplied with pre-verified clearance data sheet.",
    },

    standardDimensions: [
      { od: "76 mm", id: "38 mm", thickness: "0.5 mm" },
      { od: "76 mm", id: "38 mm", thickness: "1.0 mm" },
      { od: "100 mm", id: "50 mm", thickness: "0.5 mm" },
      { od: "100 mm", id: "50 mm", thickness: "1.0 mm" },
      { od: "100 mm", id: "50 mm", thickness: "1.5 mm" },
      { od: "120 mm", id: "60 mm", thickness: "0.5 mm" },
      { od: "120 mm", id: "60 mm", thickness: "1.0 mm" },
      { od: "150 mm", id: "76 mm", thickness: "1.0 mm" },
    ],

    relatedBladeIds: ["rotary-slitter-knives", "metal-coil-slitting-knives"],
    offers: {
      lowPrice: 45,
      highPrice: 480,
    },
    faqs: {
      technical: [
        {
          question:
            "What surface finish standard is required to prevent micro-burrs on battery electrode foil?",
          answer:
            "For lithium-ion battery electrode slitting, the cutting bevel must be polished to Ra ≤ 0.05μm (mirror finish) and verified for zero notches under 400× magnification. Any surface irregularity above this threshold generates micro-metallic particles that contaminate ISO Class 7 dry-room environments and can penetrate the separator, causing internal short-circuit in the finished cell.",
        },
        {
          question:
            "How do I set the knife-to-knife clearance for ultra-thin copper anode foil?",
          answer:
            "For 6–12μm Cu anode foil, the upper/lower knife clearance should be set at 0.002–0.005mm (2–5% of foil thickness). Clearance below this range causes burr formation; above it results in foil wrinkling and rewind telescoping. Our matched pairs are pre-verified to your specified clearance and supplied with a dimensional data sheet for consistent line-side installation.",
        },
        {
          question:
            "What carbide grade should I specify for aluminum cathode foil vs. copper anode foil?",
          answer:
            "Both foil types benefit from submicron WC-Co (≤0.5μm grain, HRA 91–93). For Al cathode foil, the hard oxide surface layer is the primary abrasion driver — a standard K10/K20 carbide grade provides acceptable edge life. For Cu anode foil, the priority shifts to achieving the lowest possible surface roughness (Ra ≤ 0.05μm) to prevent adhesive transfer and foil marking at the cut edge.",
        },
        {
          question:
            "What is the typical regrinding cycle on battery slitting knives?",
          answer:
            "On a standard 600mm-wide foil slitting line running 80 m/min, submicron WC-Co knives typically sustain acceptable edge quality for 4–6 months of continuous operation before regrinding is required. Edge degradation appears first as increased cut-edge roughness (Ra climbing above 0.1μm) visible under SEM inspection, not as catastrophic chipping. We offer a regrinding service with full dimensional re-certification.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply battery slitting knives certified to IATF 16949 requirements?",
          answer:
            "Yes. We supply full material traceability documentation for EV battery supply chain qualification: WC-Co raw material mill certificates, hardness test reports (HRA per ASTM E18), surface roughness measurement records (Ra per ISO 4287), and dimensional CMM reports. All documentation is referenced to your purchase order batch number.",
        },
        {
          question:
            "What is the lead time for standard and custom battery slitting knife orders?",
          answer:
            "Standard stock dimensions: 3–5 working days. Custom OD/ID dimensions not held in stock: 10–15 working days including full QC documentation. For initial OEM qualification orders requiring sample verification before full production, allow 7–10 working days for first-article samples.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. Corrugated Slitter Scorer Blades (瓦楞纸薄刀及全系刀具能力展示)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "corrugated-slitter-scorer-blades",
    name: "Corrugated Slitter Blades",
    fullName:
      "Tungsten Carbide Thin Slitter Blades for Corrugator Dry-End Lines",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Corrugated Blades",
    image:
      "/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades-01.webp",
    badge: "Zero Crush",
    badgeColor: "orange",
    gallery: [
      "/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades-01.webp",
      "/images/products/corrugated-slitter-scorer-blades/corrugated-tooling-portfolio.webp",
      "/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades.webp",
    ],
    description:
      "Solid Tungsten Carbide thin slitter blades engineered for zero-crush corrugated board slitting. Exact OEM replacements for BHS, Fosber, and Marquip. As a complete box plant tooling manufacturer, we also supply slotter knives, Z cut-off knives, scorer/creaser knives, and stitch lap knives.",
    fullDescription:
      "On a high-speed corrugating line running at over 250 m/min, the dry-end slitter-scorer dictates the final quality of the corrugated board. Using inferior blades results in crushed flutes, ragged edges, and excessive paper dust. Sureay Corrugated Thin Slitter Blades are manufactured from 100% solid, sub-micron grain Tungsten Carbide via HIP (Hot Isostatic Pressing) sintering, delivering unparalleled transverse rupture strength and edge stability.\n\n## The 'Zero-Crush' Razor Geometry\n\nThe term 'Thin Blade' refers to the cutting edge, not the entire blade body. To prevent high-speed wobble, our blade bodies are machined to a rigid 1.0mm to 1.2mm thickness. The cutting edge is then precision-lapped by diamond wheels to a microscopic razor profile (typically 0.3mm wide at the apex). This specific geometry slices through heavy double-wall boards purely by shearing action, generating zero compressive force and completely eliminating flute crushing.\n\n## Continuous In-Line Sharpening\n\nModern corrugators utilize automatic, in-line CBN grinding wheels to hone the slitter blades during operation. Sureay specifically formulates our Tungsten Carbide matrix to balance extreme wear resistance with perfect grindability, ensuring the blade sheds material cleanly without glazing or loading the machine's grinding stones.\n\n## Complete Corrugated Tooling Portfolio\n\nWhile our Tungsten Carbide thin slitters are the heartbeat of the corrugator dry-end, Sureay is a comprehensive tooling partner for the entire box plant. Beyond slitter blades, we manufacture and supply:\n- **Slotter Knives (Slotting) & Beam Slot Knives:** For clean, tear-free slots on Flexo Folder Gluers (FFG).\n- **Z Cut-off Knives:** High-speed cross-cutting serrated blades for the dry-end cutoff station.\n- **Stitch Lap Knives:** Precision blades for cutting the critical glue/stitch tab on folding cartons.\n- **Scorer & Creaser Knives:** Male/female scoring rings that create the perfect folding hinge.\n- **Split Top and Bottom Circular Knives:** Two-piece design for rapid in-machine replacement, saving hours of arbor maintenance downtime.",
    link: "/products/corrugated-slitter-scorer-blades",
    isFeatured: true,
    compatibleMachines: [
      "BHS",
      "FOSBER",
      "Marquip",
      "Agnati",
      "Martin / Bobst",
      "TCY",
      "Isowa",
    ],

    specs: [
      {
        label: "Main Product",
        value: "Solid Tungsten Carbide Thin Slitter Blades (HIP Sintered)",
      },
      {
        label: "Material",
        value: "Tungsten Carbide WC-Co K05 / K10 / K20 (grade by board type)",
      },
      {
        label: "Blade Hardness",
        value: "HRA 90–92 (Optimized for wear and in-line grindability)",
      },
      {
        label: "Body Thickness",
        value: "1.0 mm – 1.2 mm (Ensures high-speed rigidity)",
      },
      {
        label: "Edge Geometry",
        value: "Precision lapped razor profile, ~0.3 mm apex (Zero-crush)",
      },
      {
        label: "Line Speed Rating",
        value: "Up to 350+ m/min on modern high-speed corrugators",
      },
      {
        label: "Application",
        value:
          "B/C/E/F flute corrugated board — slit and score on BHS, Marquip, FOSBER corrugators",
      },
      {
        label: "Other Tooling Cap.",
        value: "Slotter Knives, Z Cut-off Knives, Scorer Knives, Split Knives",
      },
    ],

    components: [
      {
        id: "hip-sintering",
        tag: "METALLURGY",
        title: "HIP Sintered Carbide",
        description:
          "Hot Isostatic Pressing (HIP) ensures our thin slitter blades have zero microscopic pores. This ultra-dense structure holds a flawless razor edge (~0.3mm tip) without micro-chipping under high-speed corrugated board impact.",
      },
      {
        id: "zero-crush",
        tag: "GEOMETRY",
        title: "Zero-Crush Razor Edge",
        description:
          "A thick blade body (1.0–1.2mm) provides absolute stability against lateral wobble at speed, while the edge is deeply tapered and diamond-lapped to a razor finish. This slices the flutes cleanly instead of pressing them down.",
      },
      {
        id: "full-portfolio",
        tag: "MANUFACTURING CAPABILITY",
        title: "Complete Box Plant Tooling",
        description:
          "From Tungsten Carbide Thin Slitters on the corrugator, to Z Cut-off knives, Scorer rings, and upper/lower Slotter Knives on your Flexo Folder Gluer — we engineer the entire cutting spectrum for your box plant.",
      },
    ],

    dimensionLabels: {
      col0: "Target Corrugator OEM",
      col1: "Outer Diameter (OD)",
      col2: "Inner Diameter (ID)",
      col3: "Body Thickness",
      caption:
        "* Dimensions above are standard OEM specifications for Thin Slitter Blades. Drive pin holes are machined to brand tolerances. Slotter, Scorer, and Z Cut-off knives are manufactured to exact customer or OEM blueprints.",
    },

    standardDimensions: [
      { spec: "BHS", od: "240 mm", id: "115 mm", thickness: "1.0 / 1.2 mm" },
      { spec: "BHS", od: "260 mm", id: "140 mm", thickness: "1.2 mm" },
      {
        spec: "FOSBER",
        od: "230 mm",
        id: "135 mm",
        thickness: "1.15 / 1.2 mm",
      },
      { spec: "FOSBER", od: "260 mm", id: "112 mm", thickness: "1.2 mm" },
      {
        spec: "Marquip",
        od: "230 mm",
        id: "110 mm",
        thickness: "1.2 / 1.5 mm",
      },
      { spec: "Agnati", od: "240 mm", id: "115 mm", thickness: "1.0 mm" },
      { spec: "TCY / Justu", od: "200 mm", id: "122 mm", thickness: "1.2 mm" },
    ],

    relatedBladeIds: ["paper-cutting-blades", "rotary-slitter-knives"],
    offers: {
      lowPrice: 35,
      highPrice: 150,
    },
    faqs: {
      technical: [
        {
          question:
            "Why are my thin slitter blades crushing the flutes on E and F flute boards?",
          answer:
            "Flute crushing is caused by a blade that has lost its razor geometry. This happens if the blade carbide is wearing too fast, or if your automatic in-line sharpening stones are glazed. Switching to our HIP-sintered Tungsten Carbide blades ensures the edge stays microscopically sharp, shearing the flutes cleanly without compressive force.",
        },
        {
          question:
            "How do your blades interact with automatic slitter-scorer sharpening systems?",
          answer:
            "Our blades are engineered specifically for continuous in-line sharpening (common on Fosber and BHS lines). The carbide grain structure and cobalt binder ratio are balanced so that the blade sheds material cleanly when hit by the CBN stones, keeping the blade sharp without loading (glazing) the sharpening wheels.",
        },
        {
          question:
            "What is the advantage of a Split Top and Bottom Circular Knife?",
          answer:
            "On legacy slitter-scorers, changing a worn solid circular knife requires operators to pull the entire heavy shaft out of the machine. Split circular knives are manufactured in two interlocking halves. You simply bolt the halves directly around the shaft in minutes, saving hours of maintenance downtime.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply the entire knife package for a new corrugator and FFG installation?",
          answer:
            "Absolutely. We are a comprehensive tooling partner for box plants. In addition to Tungsten Carbide thin slitters, we manufacture the complete converting spectrum: Slotter knives, Beam slot knives, Stitch lap knives, Scorer/Creaser knives, and Z cut-off knives.",
        },
        {
          question:
            "Do you maintain dimensions for Bobst / Martin Flexo Folder Gluers?",
          answer:
            "Yes, we have an extensive database of OEM blueprints covering the slitting, slotting, and scoring sections of major converting machines including Bobst, Martin, Isowa, Ward, and TCY. Your replacement knives will be an exact drop-in fit.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. Tire Shredder Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tire-shredder-blades",
    name: "Tire Shredder Blades",
    fullName: "Heavy-Duty 3-Claw Rotary Shear Blades for Tire Recycling",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Tire Shredder Blades",
    image: "/images/products/shredder-blades/3-claw-shredder-blades.webp",
    badge: "OEM Standard",
    badgeColor: "red",
    gallery: [
      "/images/products/shredder-blades/3-claw-shredder-blades.webp",
      "/images/products/shredder-blades/3-claw-shredder-blades-00.webp",
      "/images/products/shredder-blades/3-claw-shredder-blades-01.webp",
    ],

    description:
      'Premium 3-claw rotary shear blades engineered for primary tire shredding and TDF (Tire Derived Fuel) production. Manufactured from OEM-grade Cru-Wear (PGK) and Modified A8 tool steels to withstand extreme impact from bead wires. Precision machined to exact ±0.05mm (0.002") tolerances to ensure tires are cleanly cut rather than torn.',

    fullDescription:
      "Primary tire shredding is arguably the most brutal application in the size-reduction industry. Rotary blades must simultaneously slice through elastic rubber while repeatedly impacting high-tensile steel bead wires. Standard shredder alloys fail prematurely in this environment, either through rapid edge rounding or catastrophic brittle fracture.\n\n## Premium Tire-Grade Metallurgy\n\nWe manufacture our tire shredder blades using the exact premium material grades proven in top-tier OEM equipment (such as Barclay and CM shredders):\n\n**Cru-Wear (PGK):** The ultimate factory-standard material. It offers an exceptionally high vanadium and tungsten carbide volume, delivering superior wear resistance while maintaining the extreme toughness required to shear thick steel belts without micro-chipping.\n\n**Modified A8:** Offers an excellent balance of performance and cost-effectiveness, providing massive impact resistance for operations focused on minimizing upfront tooling costs.\n\n## The Two-Thousandths (0.05mm) Tolerance Rule\n\nThe difference between an efficient tire shredder and a constantly jammed machine lies in the cutting clearance. All our tire knives, regardless of material, are ground to precise thickness tolerances — two thousandths of an inch (0.05mm) to be exact.\n\nThis precision ensures that elastic tires and steel wires are cleanly **cut** as opposed to being **torn** and stretched. A proper shearing action drastically reduces pulling forces on the rotor shafts, lowers electrical energy consumption (amp draw), and prevents exposed steel wires from wrapping around the rotor block.\n\n## 3-Claw Geometry & TDF Sizing\n\nThe standard 3-claw (hook) geometry provides the optimal bite-angle to grab whole passenger and light truck tires, pulling them aggressively into the cutting chamber. Blade thickness (typically 2-inch / 50mm) directly dictates the size of your Tire Derived Fuel (TDF) chips, ensuring a consistent, high-quality end product suitable for cement kilns or downstream wire liberation.",

    link: "/products/tire-shredder-blades",
    isFeatured: true,
    compatibleMachines: [
      "Granutech-Saturn Systems",
      "UNTHA",
      "WEIMA",
      "Eldan Recycling",
      "Lindner",
      "Eco Green Equipment",
      "American Pulverizer",
      "Shred-Tech",
    ],

    specs: [
      { label: "Material", value: "Cru-Wear (PGK), Modified A8, 42CrMo" },
      { label: "Machining Tol.", value: "Strictly ±0.05 mm (0.002 inches)" },
      {
        label: "Standard Geometry",
        value: "3-Claw Rotary (Custom hook counts available)",
      },
      { label: "Hardness", value: "HRC 54–58 (Optimized for Wire Impact)" },
      { label: "Application", value: "Whole Tires, TDF Chips, OTR Tires" },
      {
        label: "OEM Fitment",
        value: "Barclay, CM, SSI, Untha, Granutech-Saturn",
      },
    ],

    components: [
      {
        id: "premium-metallurgy",
        tag: "MATERIALS",
        title: "Cru-Wear (PGK) & Modified A8",
        description:
          "Utilizing OEM-grade premium alloys. Cru-Wear provides ultimate toughness and durability for high-volume lines, while Modified A8 offers the best balance of cost and performance.",
      },
      {
        id: "precise-cutting",
        tag: "EFFICIENCY",
        title: "Cut, Don't Tear",
        description:
          "Precision ground to ±0.05mm. This ensures a true scissor-like cutting action, preventing wire pull-out, reducing machine wear, and drastically lowering energy consumption.",
      },
      {
        id: "consistent-tdf",
        tag: "OUTPUT QUALITY",
        title: "Consistent TDF Chips",
        description:
          "Exact blade thicknesses (e.g., 2-inch standard) combined with zero-clearance shearing produce uniform, high-quality Tire Derived Fuel (TDF) chips with minimal exposed wire.",
      },
    ],

    dimensionLabels: {
      col0: "OEM Platform",
      col1: "Outer Diameter",
      col2: "Thickness (Chip Size)",
      col3: "Bore (Inner Hole)",
      col4: "Claw Count",
      caption:
        "* Dimensions shown are industry standard examples. We manufacture strictly to your exact machine specifications and required TDF chip size.",
    },

    // Rendering: hasBoreHooks=true (bore+hooks) + hasSpec=true (spec+col0)
    // → col0=spec(OEM) | col1=od | col2=thickness | col3=bore | col4=hooks(claw count)
    standardDimensions: [
      {
        spec: "Barclay Standard",
        od: 'Φ 450 mm (17.7")',
        thickness: '50.8 mm (2.0")',
        bore: "Hex / Splined",
        hooks: "3 Claws",
      },
      {
        spec: "CM Primary",
        od: 'Φ 500 mm (19.6")',
        thickness: '50.8 mm (2.0")',
        bore: "Heavy Splined",
        hooks: "3 Claws",
      },
      {
        spec: "SSI / Untha",
        od: "Φ 400–600 mm",
        thickness: "25–75 mm",
        bore: "Hex / Octagon",
        hooks: "1 / 3 / 5 Claws",
      },
      {
        spec: "OTR Shredder",
        od: "Φ 800+ mm",
        thickness: "100+ mm",
        bore: "Heavy Keyed",
        hooks: "1 / 3 Claws",
      },
    ],

    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
    ],
    offers: {
      lowPrice: 250,
      highPrice: 2500,
    },
    faqs: {
      technical: [
        {
          question:
            "Why should I upgrade to Cru-Wear (PGK) from standard D2 tool steel?",
          answer:
            "Tires contain high-tensile bead wires that act as extreme impact loads. Standard D2 is highly wear-resistant but brittle; the edge will chip when it strikes bead wire. Cru-Wear (PGK) is engineered with a different carbide structure, making it significantly tougher and more durable than D2, absorbing the impact without fracturing while maintaining excellent edge retention.",
        },
        {
          question:
            "How does blade tolerance affect my shredder's energy consumption?",
          answer:
            "If the thickness tolerance of the rotary blades varies by more than 0.05mm (0.002\"), a gap forms between the counter-rotating knives. Instead of shearing the elastic tire, the machine tries to stretch and tear it. This pulling action requires massive amounts of torque, which spikes the motor's amp draw and wastes energy. Precision tolerances ensure a low-friction, clean cut.",
        },
        {
          question: "How does the 3-claw design benefit whole tire processing?",
          answer:
            "A 3-claw geometry provides the ideal bite angle and spacing. If there are too many claws (e.g., 8 or 10), the tire will bounce on top of the rotor because the hook gaps are too small to grab the thick rubber. 3 claws provide a massive opening that hooks into the tire cavity and pulls the entire tire down into the cutting chamber.",
        },
      ],
      company: [
        {
          question:
            "Can you supply spacers and cleaning fingers (scraper plates) to match the blades?",
          answer:
            "Yes. A complete tire shredding rotor requires matched blades, spacers, and cleaning fingers. We manufacture the complete set to the same strict tolerances to ensure zero-gap assembly across the entire length of the rotor shaft.",
        },
        {
          question: "Do you have the blueprints for Barclay or CM shredders?",
          answer:
            "We maintain a comprehensive database of OEM blade drawings for major tire shredding platforms. Supplying us with your machine model or a basic confirmation drawing allows us to manufacture exact drop-in replacements.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. Nonwoven / Spunbond Slitting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nonwoven-slitter-knives",
    name: "Nonwoven Slitter Knives",
    fullName:
      "M2 HSS Circular Slitter Knives for Spunbond, Meltblown & SMS Nonwoven Fabrics",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/nonwoven-slitter-knives.webp",
    badge: "Medical Grade",
    badgeColor: "teal",
    gallery: [
      "/images/products/rotary-slitter-knives/nonwoven-slitter-knives.webp",
      "/images/products/rotary-slitter-knives/nonwoven-slitter-knives-01.webp",
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-08.webp",
    ],
    description:
      "M2 HSS and D2 circular slitter knives for spunbond PP, meltblown, SMS, and SMMS nonwoven fabrics. Specialised rake angle geometry prevents fibre fraying and slub formation on loose-structure materials. Used in hygiene, medical, filtration, and geotextile slitting lines.",
    fullDescription:
      "Nonwoven fabric slitting presents a fundamentally different challenge from film or paper converting: the material has no grain direction, low tensile strength in the cross-machine direction, and a loose, fibrous structure that can fray, distort, or pill at the slit edge if the knife geometry is not matched to the fabric construction and line tension.\n\nSureay nonwoven slitter knives are manufactured from M2 high-speed steel with a specialist rake angle geometry developed specifically for loose-structure spunbond, meltblown, and hydroentangled materials. The optimised positive rake angle shears through fibre bundles cleanly rather than pushing them aside, eliminating the frayed edge and loose fibre slub that cause downstream quality rejections in baby diaper, feminine hygiene, and surgical drape converting lines.\n\n## Nonwoven Fabric Types\n\n**Spunbond PP (S, SS, SSS structures):** The most common nonwoven substrate. Available in 8–120 GSM. Standard M2 HSS at Ra ≤ 0.4μm surface finish, positive rake 15°–20°. Used in hygiene absorbent product converting, geotextile roll slitting, and agricultural mulch film.\n\n**Meltblown (M layer):** Ultra-fine fibre (1–5μm diameter) layers used as the filtration core in N95/FFP2 respirators and surgical masks. Extremely fragile and sensitive to lateral tensile loading. Requires reduced slit speed (60–100 m/min), low-mass knife body to minimise vibration, and electrostatic discharge (ESD) coatings to prevent fibre attraction to the blade face.\n\n**SMS / SMMS Medical Fabrics:** Spunbond-Meltblown-Spunbond composite used in surgical gowns, drapes, and sterilisation wraps. Medical-grade SMS requires validated equipment — we supply material certificates and dimensional reports traceable to your batch number for regulatory compliance.\n\n**Hydroentangled / Wetlaid Nonwovens:** Higher basis weight (50–200 GSM) fabric with more coherent structure. Closer to foam or paper in cutting characteristics — standard D2 or 52100 steel knives perform well on these substrates.\n\n## ESD Coating Option\n\nFor meltblown and electrospun filtration media slitting, an ESD (electrostatic discharge) conductive surface treatment is available that prevents static charge accumulation on the blade face. Static buildup causes lightweight fibres (particularly PP meltblown at <15 GSM) to cling to the blade and transfer as contamination to the reslitted roll edge.",
    link: "/products/nonwoven-slitter-knives",
    isFeatured: false,
    compatibleMachines: [
      "Parkinson Spencer Rees",
      "Atlas Converting",
      "Euromac",
      "ACCO Brands",
      "Erhardt+Leimer",
    ],

    specs: [
      {
        label: "Material",
        value:
          "M2 HSS (standard) / D2 (heavy nonwoven) / 52100 (hydroentangled)",
      },
      { label: "Hardness", value: "HRC 62–64 (M2) | HRC 60–62 (D2)" },
      {
        label: "Rake Angle",
        value: "15°–20° positive rake (nonwoven-optimised geometry)",
      },
      {
        label: "Surface Finish",
        value: "Ra ≤ 0.4μm — reduces fibre adhesion and slub formation",
      },
      {
        label: "Options",
        value: "ESD conductive coating (meltblown / filtration media)",
      },
      {
        label: "Application",
        value: "Spunbond PP, Meltblown, SMS/SMMS, Hydroentangled, Geotextile",
      },
    ],

    components: [
      {
        id: "rake-geometry",
        tag: "EDGE DESIGN",
        title: "Nonwoven-Optimised Rake Angle",
        description:
          "Standard slitter knife geometries designed for paper and plastic film use a 5°–10° positive or neutral rake angle. For loose-structure nonwoven, this geometry pushes fibres laterally before shearing, causing the frayed edge that registers as a quality defect in hygiene product inspection. Our 15°–20° positive rake shears through fibre bundles in a single progressive action, producing a clean, tight slit edge at line speeds up to 400 m/min.",
      },
      {
        id: "esd-coating",
        tag: "SURFACE TREATMENT",
        title: "ESD Conductive Coating",
        description:
          "Electrostatic charge is generated when lightweight PP nonwoven fabric runs over metallic surfaces at high speed. On meltblown layers (<15 GSM), this charge causes fibres to cling to the blade face and transfer as contamination to the reslitted roll edge. Our ESD conductive coating dissipates charge from the blade face continuously, eliminating fibre attraction without requiring process speed reduction.",
      },
      {
        id: "medical-traceability",
        tag: "COMPLIANCE",
        title: "Medical Batch Traceability",
        description:
          "For converting lines supplying surgical drape, gown, and sterilisation wrap manufacturers, we provide full batch traceability: M2 steel mill certificates, hardness test records, and dimensional CMM reports referenced to your purchase order batch number. Documentation is formatted for inclusion in your supplier qualification file.",
      },
    ],

    dimensionLabels: {
      col1: "Outer Diameter (OD)",
      col2: "Inner Diameter (ID)",
      col3: "Thickness",
      caption:
        "* Standard dimensions for common nonwoven slitting machine models. Custom OD, ID, and edge geometry available. ESD coating (+10–15% on unit price) available for all sizes.",
    },

    standardDimensions: [
      { od: "75 mm", id: "32 mm", thickness: "1.0 mm" },
      { od: "100 mm", id: "40 mm", thickness: "1.0 mm" },
      { od: "100 mm", id: "50 mm", thickness: "1.5 mm" },
      { od: "120 mm", id: "50 mm", thickness: "1.0 mm" },
      { od: "120 mm", id: "60 mm", thickness: "1.5 mm" },
      { od: "150 mm", id: "75 mm", thickness: "2.0 mm" },
    ],

    relatedBladeIds: [
      "rotary-slitter-knives",
      "lithium-battery-slitting-knives",
    ],
    offers: {
      lowPrice: 20,
      highPrice: 150,
    },
    faqs: {
      technical: [
        {
          question:
            "What rake angle should I specify for spunbond polypropylene at 200 m/min?",
          answer:
            "For spunbond PP at 200 m/min in basis weights 15–80 GSM, specify 15° positive rake on the cutting bevel. This geometry shears polypropylene fibres cleanly at the contact point without the lateral displacement that causes fraying. For heavier basis weights (80–150 GSM SSS or SMMS), a 20° positive rake with a slightly wider bevel width provides better stability at reduced line speed (150 m/min).",
        },
        {
          question:
            "My meltblown slitting produces visible fibre transfer on the blade face. What is the cause?",
          answer:
            "Fibre transfer on meltblown fabric (particularly <10 GSM layers) is caused by electrostatic charge accumulation on the blade face, not edge geometry. PP meltblown fibres at 1–5μm diameter are extremely susceptible to static attraction. Specify the ESD conductive coating option on your next order and ensure the slitter machine frame is properly earthed. This typically eliminates visible blade-face contamination within one production shift.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply nonwoven slitter knives with a certificate of conformance for our medical device supplier audit?",
          answer:
            "Yes. We issue a Certificate of Conformance (CoC) with each batch referencing the purchase order number, steel grade (M2 AISI M2 / DIN 1.3343), hardness range (HRC 62–64), and dimensional verification results. For full medical device supplier qualification, we can also provide the steel mill certificate and heat treatment batch record on request.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Bottom Grooved Anvil Knives (Shear Slitting Bottom Knife)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "bottom-grooved-anvil-knives",
    name: "Bottom Grooved Anvil Knives",
    fullName:
      "Bottom Grooved Anvil Knives for Shear Slitting — Film, Paper & Metal Foil Converting",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/bottom-grooved-slitter-knives.webp",
    badge: "OEM Matched Pairs",
    badgeColor: "blue",
    gallery: [
      "/images/products/rotary-slitter-knives/bottom-grooved-slitter-knives.webp",
      "/images/products/rotary-slitter-knives/bottom-grooved-slitter-knives-01.webp",
      "/images/products/rotary-slitter-knives/bottom-grooved-slitter-knives-02.webp",
    ],

    description:
      "Precision-ground bottom grooved anvil knives for shear slitting of film, paper, foil & tape. Matched to Tidland, Kampf, Atlas, Goebel & BHS top-knife arbor systems. Multi-groove profiles in D2, M2 HSS & solid carbide. Supplied as verified shear pairs or as standalone bottom anvil replacements.",

    fullDescription:
      "In shear slitting, the bottom grooved anvil knife is the fixed lower half of the scissor pair — yet it is routinely under-specified. When the anvil groove geometry is mismatched to the top blade dish angle, or when the anvil bore tolerance deviates from the arbor design, the result is uncontrolled shear clearance, edge burr, and premature wear on both knives simultaneously.\n\nSureay bottom grooved anvil knives are manufactured to the same ±0.002 mm thickness tolerance and ≤0.02 mm T.I.R. runout specification as our top slitter knives. Every anvil is ground to the groove profile of your OEM platform — whether that is a Tidland single-groove, a Kampf double-groove, or a Goebel / BHS wide-body anvil — and verified against the mating top blade before shipment.\n\n## Why Bottom Anvil Knives Need Individual Attention\n\n**Groove Profile Determines Clearance:** The groove width and depth in the anvil knife directly controls the working shear clearance between the top and bottom knife pair. A worn or incorrectly profiled groove increases effective clearance, producing a ragged slit edge even when the top blade is new. We profile-grind every anvil groove to your OEM specification (groove width ±0.01 mm) to restore factory-designed clearance.\n\n**Different Wear Rate, Different Replacement Cycle:** Bottom anvil knives operate under compressive loading rather than the shear-dominant loading on the top blade. This means the anvil typically outlasts the top blade by a factor of 3–5× — but when it does wear, the groove face rounds off gradually, causing a progressive deterioration in cut quality that is easy to miss until reject rates climb. Ordering replacement anvils independently of top blades avoids unnecessary top-blade disposal.\n\n**Bore and Face Flatness Are Critical:** The anvil knife seats on the lower arbor and must run true. A bore deviation of 0.02 mm induces blade wobble that translates directly to slit-width variation across a multi-knife arbor stack. All Sureay anvil bores are finish-ground to H6 tolerance and face-lapped to ≤0.003 mm parallelism.\n\n## Application Areas\n\n**Flexible Film & Packaging Slitting:** BOPP, BOPET, CPP, PE stretch film, shrink sleeve. Standard D2 or M2 HSS anvil with single or double groove profile. Optional TiN PVD on the groove face extends contact-wear life on high-speed film lines running 400–600 m/min.\n\n**Paper & Board Converting:** Tissue, kraft, coated paper. For crush-cutting (knife against anvil roll), the anvil is manufactured with multi-groove geometry that compresses and fractures paper fibres without tearing. D2 or 52100 steel, HRC 58–62.\n\n**Metal Foil Slitting:** Aluminium cathode foil, copper anode foil, silicon-steel strip. The anvil knife for metal foil must resist adhesive wear from the metal substrate. ASP23 PM steel or solid carbide grade matched to the top knife alloy; groove form tolerance held to ±0.005 mm.\n\n**Pressure-Sensitive Tape & Labels:** Masking tape, double-coated foam, transfer adhesive. Adhesive contamination on the groove face is the primary failure mode. Teflon or DLC-coated groove faces reduce adhesive build-up intervals by 60–80%.",

    link: "/products/bottom-grooved-anvil-knives",
    isFeatured: true,

    compatibleMachines: [
      "Tidland",
      "Kampf",
      "Atlas Converting",
      "Goebel",
      "BHS",
      "Agnati",
      "Dusenbery",
      "Euromac",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 / M2 HSS / ASP23 PM / Solid Carbide",
      },
      {
        label: "Groove Tolerance",
        value: "Groove width ±0.01\u202fmm | Face flatness ≤0.003\u202fmm",
      },
      {
        label: "Bore Tolerance",
        value: "H6 finish-ground | T.I.R. ≤0.02\u202fmm",
      },
      {
        label: "Shear Clearance",
        value: "Pre-verified to substrate spec (0.02–0.15\u202fmm)",
      },
      {
        label: "Coatings",
        value: "TiN groove face, DLC, Teflon anti-adhesion (optional)",
      },
      {
        label: "Applications",
        value: "Film, Paper, Metal Foil, PSA Tape, Nonwovens",
      },
    ],

    components: [
      {
        id: "groove-geometry-control",
        tag: "PRECISION GRINDING",
        title: "OEM-Profile Groove Geometry",
        description:
          "The groove width and depth of each anvil knife is profile-ground to your OEM platform specification — Tidland single-groove, Kampf double-groove, or Goebel wide-body — and held to ±0.01 mm. Correct groove geometry restores factory-designed shear clearance and eliminates the progressive slit-edge deterioration caused by a worn anvil profile.",
      },
      {
        id: "bore-face-flatness",
        tag: "DIMENSIONAL ACCURACY",
        title: "H6 Bore & Lapped Face Flatness",
        description:
          "All anvil bores are finish-ground to H6 tolerance and face-lapped to ≤0.003 mm parallelism. A bore deviation of 0.02 mm on the lower arbor induces blade wobble that translates directly to slit-width variation across a multi-knife stack. Our bore and face tolerances are verified on a CMM for every batch.",
      },
      {
        id: "anti-adhesion-groove-coating",
        tag: "SURFACE TREATMENT",
        title: "Anti-Adhesion Groove Coatings",
        description:
          "For pressure-sensitive tape and adhesive laminate slitting, Teflon and DLC PVD coatings on the groove contact face reduce adhesive build-up intervals by 60–80%. Coated anvils run clean through 8–12 hour production shifts without groove contamination that degrades shear clearance and forces unplanned stops.",
      },
    ],

    dimensionLabels: {
      col0: "OEM Platform / Type",
      col1: "OD × ID (mm)",
      col2: "Thickness (mm)",
      col3: "Groove (W × D / Angle)",
      caption:
        "* Standard OEM-matched anvil dimensions. Exact groove geometry ensures zero-wobble mating with top slitters. Multi-groove (2+ slots) configurations available on request.",
    },

    standardDimensions: [
      {
        spec: "Tidland — Single Groove",
        od: "70 × 25.4",
        id: "8 / 10",
        thickness: "W: 1.2 × D: 2.0 / 60°",
      },
      {
        spec: "Atlas — Multi-Groove (3 Slots)",
        od: "100 × 60",
        id: "20 / 25",
        thickness: "W: 1.5 × D: 2.5 / 60°",
      },
      {
        spec: "Mario Cotta — Single Groove",
        od: "80 × 30",
        id: "10",
        thickness: "W: 1.3 × D: 2.2 / 45°",
      },
      {
        spec: "Dienes — Single Groove",
        od: "130 × 80",
        id: "12",
        thickness: "W: 1.5 × D: 3.0 / 60°",
      },
      {
        spec: "Custom Anvil / Hardfaced",
        od: "Per Drawing",
        id: "OEM Spec",
        thickness: "Exact CNC Machined Groove",
      },
    ],

    relatedBladeIds: [
      "rotary-slitter-knives",
      "rotary-slitter-knives-paper",
      "metal-foil-strip-slitter-knives",
    ],
    offers: {
      lowPrice: 20,
      highPrice: 200,
    },
    faqs: {
      technical: [
        {
          question:
            "How often should I replace the bottom grooved anvil knife versus the top blade?",
          answer:
            "Bottom anvil knives operate under compressive groove-face loading and typically last 3–5× longer than the top shear blade. However, because wear is gradual — the groove face rounds off slowly — the deterioration in slit quality is easy to miss until scrap rates climb. We recommend inspecting groove face geometry (groove width and depth) every 3 top-blade replacement cycles and replacing the anvil when groove width deviation exceeds ±0.03 mm from the OEM specification.",
        },
        {
          question:
            "What shear clearance should I set between the top blade and bottom anvil groove?",
          answer:
            "Shear clearance is substrate-dependent. For flexible plastic films (BOPP, BOPET, CPP) at 0.02–0.05 mm per side is standard. For kraft paper and board, 0.05–0.10 mm. For aluminium and copper foils, 0.01–0.03 mm per side. We pre-verify matched top/bottom pairs to your specified clearance and record the setting on an engineering data sheet that ships with each order, allowing operators to replicate the clearance on every reinstallation.",
        },
        {
          question:
            "Can I order replacement anvil knives without buying a full matched pair?",
          answer:
            "Yes. We supply bottom anvil knives as standalone replacements machined to the groove profile and OD/ID of your existing top-knife arbor system. Provide your OEM platform (Tidland, Kampf, Atlas, etc.) and the top knife OD/ID, and we will match the anvil to the mating geometry. If you supply a worn anvil as a sample, we can reverse-engineer the original groove profile before regrinding.",
        },
        {
          question:
            "Why does my slit edge quality degrade even after I replace the top blade with a new one?",
          answer:
            "If new top blades do not restore slit quality, the anvil groove is almost certainly worn beyond its specification. A rounded or widened groove face increases effective shear clearance regardless of top-blade condition, producing a ragged, feathered slit edge. Inspect the groove width and depth with a groove gauge or profilometer. If groove deviation exceeds ±0.03 mm from OEM spec, anvil replacement or regrinding is required.",
        },
      ],
      company: [
        {
          question:
            "Do you supply bottom anvil knives as part of a matched pair, or only individually?",
          answer:
            "Both options are available. For new installations or full arbor rebuilds, we recommend matched pairs — top blade and bottom anvil verified to a specified shear clearance, with a joint engineering data sheet. For replacement orders on existing lines, standalone anvil knives machined to your OEM groove profile are available with standard 5–7 day lead time.",
        },
        {
          question:
            "What OEM platforms does Sureay supply matched anvil knives for?",
          answer:
            "We currently stock and supply groove-profiled anvil knives for Tidland (single-groove and double-groove arbors), Kampf (narrow and wide arbor series), Atlas Converting Equipment, Goebel, BHS, Agnati, and Dusenbery. For other OEM platforms, provide the arbor drawing or worn sample and we will engineer a matched replacement.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM-profile anvil knives ship within 48–72 hours. Custom groove profiles take 7–12 working days. We partner with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. Metal Cold Circular Saw Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-cold-saw-blades",
    name: "Metal Cold Saw Blades",
    fullName:
      "HSS & TCT Cold Circular Saw Blades for Metal Tube and Profile Cutting",
    category: "cold_saw_blades",
    sector: "metal",
    categoryDisplay: "Metal Processing Blades",
    image: "/images/products/metal-cold-saw-blades/metal-cold-saw-blades.webp",
    badge: "Burr-Free Cut",
    badgeColor: "purple",
    gallery: [
      "/images/products/metal-cold-saw-blades/metal-cold-saw-blades.webp",
      "/images/products/metal-cold-saw-blades/metal-cold-saw-blades-01.webp",
      "/images/products/metal-cold-saw-blades/metal-cold-saw-blades-02.webp",
    ],
    description:
      "Premium HSS (M2 / M35 Cobalt) and TCT cold saw blades for cutting steel tubes, solid bars, aluminum profiles, and stainless steel. The cold cutting process produces a precise, burr-free end with no heat-affected zone (HAZ)—ready for immediate welding or threading.",

    fullDescription:
      "Cold circular sawing is the preferred metal cutting process for tube mills, structural fabrication, and precision bar stock applications. Unlike abrasive cut-off wheels or bandsaws, a cold circular saw blade cuts by metal-removal (chip formation) rather than high-friction abrasion. This keeps the material cool, producing a smooth, perfectly square end-face with zero thermal distortion and no secondary deburring required.\n\nSureay cold saw blades are manufactured from M2 (Standard HSS), M35 (5% Cobalt HSS), and TCT (Tungsten Carbide Tipped) configurations. All blades are manufactured to strict DIN 1837/1840 standards and are available in standard diameters from 200 mm to 450 mm with tooth configurations and PVD coatings matched to the workpiece material.\n\n## Material & Grade Selection Guide\n\n**M2 HSS (Standard / Steam Treated):** The baseline grade for cold sawing mild steel pipes, structural tubing, and angle sections up to 400 MPa tensile strength. Provides excellent toughness for interrupted cuts on hollow sections. Typically supplied with a black oxide (steam treated) finish to retain coolant and prevent micro-welding.\n\n**M35 Cobalt HSS (Recommended for Stainless):** The addition of 5% cobalt dramatically elevates the blade’s red-hardness (hot hardness) and wear resistance. This is essential when cutting 304/316 austenitic stainless steel, which work-hardens rapidly under the blade. M35 maintains sharp edge geometry through the elevated cutting temperatures generated by stainless steel.\n\n**TCT (Tungsten Carbide Tipped):** Brazed carbide inserts on a high-alloy steel body. Best for high-volume tube mill applications and non-ferrous metals (aluminum extrusions, copper pipes) running at elevated cutting speeds. Delivers 5–8× longer service life vs HSS on aluminum profiles.\n\n## Advanced PVD Coatings\nTo significantly extend blade life and reduce cutting friction, we offer advanced PVD coatings:\n- **TiN (Titanium Nitride — Gold):** Lowers the friction coefficient, ideal for cutting standard steel tubes at higher speeds.\n- **TiAlN (Titanium Aluminum Nitride — Violet/Black):** Forms a hard aluminum oxide layer during cutting, protecting the teeth from extreme heat. The ultimate choice for cutting stainless steel, cast iron, and high-tensile alloys.",

    link: "/products/metal-cold-saw-blades",
    isFeatured: false,
    compatibleMachines: [
      "Kaltenbach",
      "Bewo",
      "MEP",
      "Kasto",
      "Macc",
      "Pedrazzoli",
      "Ficep",
    ],

    specs: [
      {
        label: "Grade Options",
        value: "M2 HSS (DMo5) · M35 Cobalt (Co5) · TCT Carbide",
      },
      {
        label: "Hardness",
        value: "HRC 63–65 (M2) | HRC 64–66 (M35) | Carbide Tipped",
      },
      {
        label: "Surface Finish",
        value: "Steam Treated (Black) / TiN / TiAlN PVD Coatings",
      },
      {
        label: "Tooth Form",
        value: "BW, HZ (Standard) | Fine / Medium / Coarse Pitch",
      },
      {
        label: "Application",
        value: "Steel Pipes, Stainless Tubes, Aluminum Profiles, Solid Bars",
      },
    ],

    components: [
      {
        id: "cold-cut-quality",
        tag: "PROCESS ADVANTAGE",
        title: "Cold Cut vs. Abrasive Wheels",
        description:
          "Abrasive wheels generate temperatures above 800°C, producing a heat-affected zone (HAZ) and heavy slag that must be ground off. Cold circular sawing operates at low RPM with coolant, keeping the cut face below 200°C. The result is a clean, weld-ready surface right off the machine.",
      },
      {
        id: "grade-cobalt",
        tag: "METALLURGY",
        title: "M35 Cobalt for Stainless",
        description:
          "Stainless steel (304/316) work-hardens under cutting pressure, instantly dulling standard M2 blades. Our M35 grade contains 5% Cobalt, granting it extreme ‘red hardness’ to slice through austenitic stainless steel without losing edge geometry.",
      },
      {
        id: "pvd-coatings",
        tag: "SURFACE TECH",
        title: "TiN & TiAlN Coatings",
        description:
          "While standard steam-treated blades are great for mild steel, upgrading to TiN (Titanium Nitride) or TiAlN PVD coatings drastically reduces friction and heat. This allows for faster feed rates and prevents material from cold-welding to the saw teeth.",
      },
    ],

    dimensionLabels: {
      col0: "Blade Grade & Finish",
      col1: "Outer Diameter (mm)",
      col2: "Bore (mm)",
      col3: "Thickness (mm)",
      col4: "Teeth (Z)",
      caption:
        "* Standard dimensions for Kaltenbach, Bewo, and MEP machines. Tooth count (Z) is selected based on your pipe wall thickness. Custom drive pin holes machined to order.",
    },

    standardDimensions: [
      {
        spec: "M2 HSS (Steam Treated)",
        od: "250",
        id: "32 / 40",
        length: "2.0",
        teeth: "120 z / 160 z",
      },
      {
        spec: "M2 HSS (Steam Treated)",
        od: "275",
        id: "32 / 40",
        length: "2.5",
        teeth: "140 z / 180 z",
      },
      {
        spec: "M35 Cobalt (TiN Coated)",
        od: "315",
        id: "32 / 40",
        length: "2.5",
        teeth: "160 z / 200 z",
      },
      {
        spec: "M35 Cobalt (TiAlN Coated)",
        od: "350",
        id: "40 / 50",
        length: "2.5",
        teeth: "160 z / 220 z",
      },
      {
        spec: "M2 / M35 HSS",
        od: "400",
        id: "40 / 50",
        length: "3.0",
        teeth: "180 z / 240 z",
      },
      {
        spec: "TCT (Aluminum Profile)",
        od: "450",
        id: "30 / 32",
        length: "3.5",
        teeth: "120 z",
      },
    ],

    relatedBladeIds: ["metal-coil-slitting-knives", "metal-shear-knives"],
    offers: {
      lowPrice: 35,
      highPrice: 420,
    },
    faqs: {
      technical: [
        {
          question: "How do I choose between M2 and M35 Cobalt HSS grades?",
          answer:
            "For standard structural steel, mild steel pipes, and box sections, M2 HSS provides excellent toughness and value. If you are cutting stainless steel (304, 316), high-tensile steel, or using high-speed automatic saws, you must upgrade to M35. M35 contains 5% Cobalt, which prevents the teeth from softening under high friction heat.",
        },
        {
          question:
            "How many teeth (TPI / Pitch) do I need for my steel pipes?",
          answer:
            "The golden rule of cold sawing is to always have 3 to 4 teeth simultaneously engaged in the material thickness. If you are cutting thin-walled tubes (e.g., 1.5 mm wall), you need a fine pitch (high tooth count, e.g., 220Z or 240Z) to prevent the teeth from hooking and snapping. If you are cutting thick solid bars (e.g., 40 mm solid), you need a coarse pitch (low tooth count, e.g., 120Z) to allow room for the massive metal chips to escape.",
        },
        {
          question: "Can HSS cold saw blades be resharpened?",
          answer:
            "Yes. This is the biggest advantage of HSS cold saw blades. Unlike abrasive discs that are thrown away, an HSS blade can be CNC-resharpened 10 to 15 times before the diameter becomes too small to use. We offer professional regrinding and recoating services to restore factory-new performance.",
        },
        {
          question: "Should I use coolant when cutting with HSS cold saws?",
          answer:
            "Absolutely. You must use a flood coolant (water-soluble synthetic or semi-synthetic oil, mixed at about 8–10%) directed right at the cutting teeth. Coolant flushes away the metal chips and keeps the blade cool. Cutting dry with an HSS blade will burn the teeth instantly. Only specialized TCT blades on high-end machines are designed for dry cutting.",
        },
      ],
      company: [
        {
          question: "Will these blades fit my specific cold saw machine?",
          answer:
            "Our blades feature standard bore sizes (e.g., 32 mm, 40 mm, 50 mm) and universal drive pin hole patterns that fit 95% of the market, including Kaltenbach, Bewo, MEP, Macc, Pedrazzoli, and Kasto. If your machine has a non-standard drive pin layout, we can CNC-machine the exact mounting holes before shipping.",
        },
        {
          question:
            "What is the lead time for M35 Cobalt or TiAlN coated blades?",
          answer:
            "Standard M2 (Steam Treated) blades in common sizes are often in stock and ship within 3–5 days. Premium M35 Cobalt blades and customized PVD coatings (TiN, TiAlN) typically require 10–15 working days.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. Heavy-Duty Scrap Chopper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "scrap-chopper-blades",
    name: "Scrap Chopper Blades",
    fullName:
      "Heavy-Duty Scrap Chopper Blades for Metal Slitting & Coil Processing Lines",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Scrap Chopper Blades",
    image: "/images/products/granulator-blades/scrap-chopper-blades.webp",
    badge: "Extreme Impact",
    badgeColor: "orange",
    gallery: [
      "/images/products/granulator-blades/scrap-chopper-blades.webp",
      "/images/products/granulator-blades/scrap-chopper-blades-01.webp",
      "/images/products/granulator-blades/scrap-chopper-blades-02.webp",
    ],
    description:
      "Specifically engineered to survive the chaotic, extreme-impact environments of processing line edge-trim chopping. Forged from S7 shock-resisting tool steel or featuring specialized carbide-inlaid geometries, these blades cleanly fracture and reduce irregular steel strips, aluminum strip trim, and copper foil edge scrap without suffering catastrophic blade failure or chipping.",
    fullDescription:
      "Located at the terminus of metal slitting and conversion lines, scrap choppers are tasked with destroying the irregular, edge-trim waste generated during processing. The operating environment involves severe, unpredictable impact loads capable of shattering standard blades. Consequently, scrap chopper blades are forged from high-impact, shock-resistant alloys such as S7 tool steel, or employ heavily supported carbide-inlaid designs to cleanly fracture steel, aluminum, and copper waste without failing.\n\n## Operating Environment & Challenges\n\nScrap choppers operate under conditions fundamentally different from precision slitting or shearing:\n\n**Unpredictable Material Geometry:** Edge trim from slitting lines arrives at the chopper in irregular, curled, and twisted configurations. Unlike straight sheet shearing, the blade must engage the scrap at random angles, creating variable impact loads that can exceed 3–5× the nominal rated force.\n\n**Metal Inclusions & Contamination:** The scrap stream frequently contains metal fasteners, weld spatter, and mill scale that create localized stress concentrations. Standard high-hardness blades (D2 at HRC 60–62) are brittle and catastrophically fracture when impacted by such inclusions.\n\n**High Cycle Frequency:** Scrap choppers operate at 40–120 chops per minute depending on line speed. Each chop imparts a shock load, and the blade must resist fatigue crack propagation over millions of cycles.\n\n## Metallurgical Solutions\n\n**S7 Shock-Resisting Tool Steel:** S7 is a chromium-molybdenum-tungsten tool steel specifically developed for impact tooling applications. Unlike D2 (which achieves wear resistance through 12% chromium carbide precipitates), S7 utilizes a lower carbon content (0.50% C vs. 1.55% C in D2) and a balanced alloy system that produces a tough, resilient matrix. Heat-treated to HRC 54–58, S7 delivers twice the impact toughness of D2, virtually eliminating catastrophic blade fracture.\n\n**H13 Hot-Work Tool Steel:** H13 (5% chromium, 1.5% molybdenum, 1% vanadium) is the workhorse grade for aluminum and copper scrap chopping. Its austenitic structure at operating temperature provides excellent shock absorption, and the low carbide volume fraction prevents brittle fracture on metal inclusion impacts. Best suited for non-ferrous scrap streams.\n\n**Carbide-Inlaid Edges:** For steel service centers processing high-tensile and stainless steel trim, tungsten carbide edge inserts are mechanically supported in an S7 or H13 body. The carbide provides localized wear resistance at the cutting edge, while the tool steel body absorbs the gross impact energy. This hybrid construction delivers 3–5× longer service life than solid S7 in heavily contaminated scrap streams.",
    link: "/products/scrap-chopper-blades",
    isFeatured: false,
    compatibleMachines: [
      "Butech Bliss",
      "Red Bud Industries",
      "Braner USA",
      "Herr-Voss Stamco",
      "Kohler Maschinenbau",
      "Fagor Arrasate",
    ],

    specs: [
      {
        label: "Material",
        value:
          "S7 Shock-Resisting Tool Steel | H13 Hot-Work Steel | Carbide-Inlaid S7",
      },
      {
        label: "Hardness",
        value: "HRC 54–58 (optimized for maximum impact toughness)",
      },
      {
        label: "Edge Configuration",
        value: "Square/Rectangular Profile (4-edge usable)",
      },
      {
        label: "Impact Resistance",
        value: "2× toughness vs. D2 — prevents catastrophic fracture",
      },
      {
        label: "Application",
        value:
          "Steel, aluminum, copper edge-trim scrap from slitting & coil processing lines",
      },
      {
        label: "Cycle Life",
        value: "50,000–200,000 chops (material & contamination dependent)",
      },
    ],

    components: [
      {
        id: "s7-metallurgy",
        tag: "MATERIAL SCIENCE",
        title: "S7 Shock-Resisting Alloy Structure",
        description:
          "S7 tool steel achieves its superior toughness through a carefully balanced alloy system: 0.50% carbon (vs. 1.55% in D2) minimizes brittle carbide formation, while chromium (3.25%), molybdenum (1.40%), and tungsten (1.80%) additions provide hardenability and temper resistance. Heat treated to HRC 54–58 rather than the HRC 60–62 typical of D2, S7 sacrifices some abrasion resistance in exchange for double the Charpy impact energy. This is the critical trade-off for scrap chopper applications: the blade must absorb unpredictable shock loads without shattering.",
      },
      {
        id: "4-edge-design",
        tag: "DESIGN EFFICIENCY",
        title: "Four-Edge Reversible Configuration",
        description:
          "Scrap chopper blades are manufactured as rectangular blocks with four usable cutting edges. When the active edge exhibits visible wear (typically indicated by increased chopping noise or incomplete scrap fracture), the operator indexes the blade 90° to present a fresh edge. This design quadruples the effective service life compared to single-edge blades and reduces non-productive downtime. The blade body geometry is precision-ground to ensure all four edges are parallel within ±0.05mm, preventing uneven loading that would cause premature wear on indexed edges.",
      },
      {
        id: "carbide-inlay",
        tag: "ADVANCED OPTION",
        title: "Carbide-Inlaid Hybrid Construction",
        description:
          "For steel service centers processing high-carbon or stainless steel trim with heavy mill scale contamination, we offer carbide-inlaid scrap chopper blades. A tungsten carbide insert (typically 6–10mm wide, full blade thickness) is mechanically locked into a precision-ground slot in the S7 body using a shrink-fit or brazed joint. The carbide provides localized wear resistance where the blade contacts the scrap, while the S7 body absorbs the gross impact energy. This construction is the optimal solution for contaminated scrap streams where solid carbide would fracture and solid S7 wears too rapidly.",
      },
    ],

    dimensionLabels: {
      col0: "Typical Machine / Duty",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard dimensions for common scrap chopper models. Custom sizes available. All blades are 4-edge reversible. Carbide-inlaid option available for all dimensions (+30–40% unit price premium).",
    },

    standardDimensions: [
      { spec: "Light Gauge Trim", od: "100", id: "40", thickness: "15" },
      { spec: "Standard Capacity", od: "150", id: "50", thickness: "20" },
      { spec: "Butech / Medium Duty", od: "200", id: "60", thickness: "25" },
      { spec: "Heavy Duty Coil Line", od: "250", id: "80", thickness: "25" },
      { spec: "Extra Heavy", od: "300", id: "80", thickness: "30" },
      { spec: "Extreme Plate Chopper", od: "400", id: "100", thickness: "30" },
    ],

    relatedBladeIds: ["metal-shear-knives", "metal-coil-slitting-knives"],
    offers: {
      lowPrice: 35,
      highPrice: 280,
    },
    faqs: {
      technical: [
        {
          question:
            "Should I use S7 or H13 for chopping stainless steel edge trim?",
          answer:
            "For stainless steel trim (304, 316, or duplex grades), specify S7 at HRC 54–58. Stainless generates higher cutting forces than mild steel due to work hardening, and S7's balanced alloy system provides better edge retention than H13 in this application. H13 is optimized for aluminum and copper scrap where the lower cutting forces allow the softer H13 matrix to absorb impact without excessive edge deformation. For heavily contaminated stainless scrap with weld spatter or fasteners, upgrade to carbide-inlaid S7.",
        },
        {
          question:
            "How do I know when to index the blade to the next cutting edge?",
          answer:
            "The primary indicator is increased chopping noise or vibration, which signals that the active edge has developed a wear flat and is no longer cleanly fracturing the scrap. Visually, inspect the active edge every 8–12 hours of operation. When the wear flat (the dulled, polished zone on the cutting corner) exceeds 1.0–1.5mm width, it is time to index to the next edge. Indexing before the wear flat contacts the blade body prevents accelerated wear on the holder and frame.",
        },
        {
          question: "Can scrap chopper blades be resharpened or reground?",
          answer:
            "Scrap chopper blades are a wear consumable and are not typically reground. The 4-edge reversible design already provides extended service life, and regrinding would require re-heat-treatment and precision grinding to restore the edge geometry and hardness. The cost of regrinding approaches 60–70% of new blade cost, making replacement more economical. However, for very large custom blades (above 500mm length), regrinding may be cost-effective — contact us with your blade dimensions.",
        },
      ],
      company: [
        {
          question:
            "Does Sureay stock scrap chopper blades, or are they made to order?",
          answer:
            "We maintain stock inventory of standard S7 scrap chopper blades in the six most common sizes (100×40×15mm through 400×100×30mm). Stock blades ship within 3–5 working days. Custom dimensions, H13 material, and carbide-inlaid configurations are manufactured to order with lead times of 12–18 working days from drawing approval. Rush production (7–10 days) available for standard sizes subject to heat-treat schedule availability.",
        },
        {
          question:
            "Can Sureay supply scrap chopper blades that match our existing blade dimensions?",
          answer:
            "Yes. Send us a sample blade, technical drawing, or the chopper machine make and model number. We will confirm the length, width, thickness, mounting hole pattern (if applicable), and material grade. Most chopper blades are standard rectangular blocks without mounting holes, but some models use clamped or bolted retention that requires specific hole locations. We can replicate any existing blade geometry.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Strand Pelletizer Rotors
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "strand-pelletizer-rotors",
    name: "Strand Pelletizer Rotors",
    fullName: "High-Precision Strand Pelletizer Rotors for Compounding Lines",
    category: "granulator_blades",
    sector: "recycling",
    categoryDisplay: "Pelletizer Blades",
    image: "/images/products/blades/strand-pelletizer-rotor-01.webp",
    badge: "PM-HSS & Carbide",
    badgeColor: "blue",
    gallery: [
      "/images/products/blades/strand-pelletizer-rotor-01.webp",
      "/images/products/blades/strand-pelletizer-rotor-02.webp",
      "/images/products/blades/strand-pelletizer-rotor-03.webp",
    ],

    description:
      "Precision strand pelletizer rotors engineered for continuous, high-volume compounding lines. PM-HSS (ASP2023, ASP2052) and solid tungsten carbide construction. Helical geometry with ≤0.005\u202fmm concentricity, dynamic balancing to ISO 1940-1 G2.5. Drop-in replacement for Maag, Coperion, Cumberland, Conair, and Reduction Engineering pelletizers.",

    fullDescription:
      "Engineered for continuous, high-volume compounding lines, Sureay's strand pelletizer rotors deliver flawless, uniform micro-pellets with zero tailing. Manufactured from advanced Powder Metallurgy High-Speed Steels (PM-HSS) and Solid Tungsten Carbide, our helical rotors are designed to withstand the extreme abrasive wear of glass-filled (GF), carbon-filled, and heavily pigmented polymers. Every rotor undergoes rigorous dynamic balancing and precision profile grinding to ensure perfect concentricity, reducing bearing wear and vibration even at peak RPMs.\n\n## Rotor Types\n\n**Helical (Spiral) Rotors:** The standard configuration for high-speed continuous compounding. The constant helical pitch across the full cutting width ensures a progressive shear action — one tooth engages at any given instant rather than the full edge impacting simultaneously. This dramatically reduces peak cutting force, motor load, and strand snap events. Sureay's 5-axis CNC grinding centers maintain helical pitch constancy to within ±0.01° across the entire rotor face.\n\n**Straight Edge Rotors:** Specified for softer elastomers and low-viscosity polymer melts where the helical shear force is excessive. The full-width simultaneous cut action provides a clean, consistent pellet length on TPE, TPU, and TPV strands.\n\n**Brazed Carbide Inlay Rotors:** The optimal solution for abrasive compounding of glass-filled (GF), carbon-filled (CF), and mineral-filled compounds. Tungsten carbide cutting inserts are vacuum-brazed into precision-machined HSS rotor bodies. The carbide edges deliver 5–10× longer service life versus standard M2 on GF40 and CF30 compounds, while the tough HSS body absorbs shock loads from intermittent strands and cold-start events without brittle fracture.\n\n**Solid Carbide Rotors:** The ultimate specification for extreme abrasive compounds at moderate throughput. Used in specialty compounding of ultra-abrasive ceramic, boron nitride, and SiC-filled polymers where even brazed carbide tips wear rapidly.\n\n## Material Selection by Application\n\n**M2, M35 HSS (Standard Compounding):** Cost-effective for non-filled thermoplastics — PA6, PA66, PC, POM, PBT — at standard compounding temperatures. M35 cobalt-grade extends service life on moderately abrasive fillers (talc, CaCO₃) by 30–40% versus standard M2.\n\n**PM-HSS: ASP2023, ASP2052, CPM10V (Abrasive Compounding):** Powder metallurgy manufacturing produces an ultra-fine, homogeneous carbide distribution that conventional HSS cannot achieve. ASP2023 delivers 2–3× longer edge life on GF20 and CF15 compounds. ASP2052 and CPM10V push tool life to 4–6× M2 on the most demanding filled compounds. The PM microstructure also reduces edge micro-chipping that causes pellet fines and dust contamination.\n\n**Solid Tungsten Carbide (WC) & Brazed Carbide Tips (Extreme Wear):** For long glass fiber (LGF) compounds, carbon fiber reinforced polymers, and high-mineral-content masterbatch. Carbide maintains its cutting edge under sustained abrasive loading that would strip PM-HSS within hours.\n\n## Application Scenarios\n\n**Long Glass Fiber (LGF) & Carbon Fiber Compounding:** Brazed tungsten carbide rotors maintain their cutting edge 5–10× longer than standard HSS when shearing highly abrasive structural composites. The vacuum brazing process guarantees carbide teeth cannot detach, even under severe shock loads from cold strand starts.\n\n**Masterbatch & High-Pigment Production:** Mirror-polished tooth flutes (Ra 0.2\u202fµm) prevent color accumulation, allowing for rapid color changes and zero cross-contamination between batches.\n\n**Engineering Thermoplastics (PA, PC, POM, PBT):** The ultra-tight concentricity (≤0.005\u202fmm) allows operators to set extreme micro-gaps, resulting in a clean, scissor-like shear that eliminates fines, dust, and snake-skins.\n\n**Soft Elastomers (TPE, TPU, TPV):** Optimized acute cutting angles prevent the stretching and smearing of soft strands, eliminating the dreaded tailing effect.\n\n## OEM Compatibility\n\nSureay manufactures exact fitment replacement rotors for major pelletizer platforms. All replacement rotors are reverse-engineered from OEM drawings or customer samples, verified on CMM, and supplied with full dimensional inspection reports.\n\n*All manufacturer names and models are used for reference and compatibility purposes only.*",

    link: "/products/strand-pelletizer-rotors",
    isFeatured: true,

    compatibleMachines: [
      "Maag",
      "Coperion",
      "Cumberland",
      "Conair",
      "Reduction Engineering",
    ],

    specs: [
      {
        label: "Material",
        value:
          "M2 (AISI M2 / 1.3343) | M35 (1.3243) | PM-HSS ASP2023 (1.3395) / ASP2052 / CPM10V | Solid WC & Brazed Carbide",
      },
      {
        label: "Application",
        value:
          "GF/CF Compounding, Masterbatch, Engineering Thermoplastics (PA/PC/POM/PBT), Soft Elastomers (TPE/TPU/TPV)",
      },
      {
        label: "Rotor Types",
        value:
          "Helical (Spiral), Straight Edge, Brazed Carbide Inlay, Solid Carbide",
      },
      {
        label: "Tooth Count",
        value: "10, 12, 16, 24, 32, 48, 60, up to 120 (custom)",
      },
      {
        label: "Concentricity (Runout)",
        value: "≤ 0.005\u202fmm — critical for micro-clearance setting",
      },
      {
        label: "Surface Polish",
        value: "Ra 0.2\u202fµm — prevents polymer build-up and sticking",
      },
      {
        label: "Dynamic Balancing",
        value: "ISO 1940-1 G2.5 — vibration-free at peak RPM",
      },
      {
        label: "Helical Angle",
        value: "1.5°, 2°, 3° or custom-milled to OEM blueprints",
      },
    ],

    components: [
      {
        id: "dynamic-balancing",
        tag: "PRECISION ENGINEERING",
        title: "Zero-Defect Dynamic Balancing",
        description:
          "Operating at high speeds, unbalanced rotors destroy bearings and ruin clearances. Every Sureay rotor is dynamically balanced at operating speeds to ISO 1940-1 G2.5 standards, ensuring whisper-quiet, vibration-free operation and protecting the pelletizer's bearing investment.",
      },
      {
        id: "helical-geometry",
        tag: "5-AXIS CNC GRINDING",
        title: "Flawless Helical Geometry",
        description:
          "Using state-of-the-art 5-axis CNC grinding centers, we guarantee the helical pitch is constant across the entire cutting width. This ensures constant shear force, reducing motor load and preventing strand snapping on high-speed compounding lines.",
      },
      {
        id: "vacuum-brazing",
        tag: "CARBIDE TECHNOLOGY",
        title: "Proprietary Vacuum Brazing",
        description:
          "For carbide-tipped rotors, a specialized high-strength vacuum brazing process guarantees that carbide teeth will never detach, even under severe shock loads from cold strand starts or intermittent strand feed conditions.",
      },
    ],

    dimensionLabels: {
      col0: "OEM Platform",
      col1: "Rotor Diameter (mm)",
      col2: "Cutting Width (mm)",
      col3: "Tooth Count",
      col4: "Helix Angle",
      caption:
        "* Representative dimensions for common strand pelletizer platforms. All rotors manufactured to exact OEM blueprints or customer sample. Custom diameters, widths, tooth counts, and helix angles available on request.",
    },

    standardDimensions: [
      {
        spec: "Maag Primo / Baoli",
        od: "100 – 200",
        id: "80 – 300",
        length: "12 / 16 / 24",
        teeth: "2° / 3°",
      },
      {
        spec: "Coperion SP Series",
        od: "120 – 250",
        id: "100 – 350",
        length: "16 / 24 / 32",
        teeth: "1.5° / 2°",
      },
      {
        spec: "Cumberland Quietizer",
        od: "100 – 180",
        id: "80 – 250",
        length: "12 / 16",
        teeth: "2° / 3°",
      },
      {
        spec: "Conair 304 / 306 / CS",
        od: "100 – 200",
        id: "80 – 300",
        length: "12 / 16 / 24",
        teeth: "2°",
      },
      {
        spec: "Reduction Engineering SGS",
        od: "120 – 220",
        id: "100 – 320",
        length: "16 / 24 / 32",
        teeth: "1.5° / 2° / 3°",
      },
    ],

    relatedBladeIds: [
      "granulator-blades",
      "continuous-melt-filter-scraper-blades",
      "twin-shaft-blades-recycling",
    ],

    offers: {
      lowPrice: 80,
      highPrice: 1200,
    },

    faqs: {
      technical: [
        {
          question:
            "We process 40% Glass-Filled Nylon (PA66 GF40). Standard M2 rotors wear out in days. What is your solution?",
          answer:
            "For extreme abrasive wear, M2 steel is insufficient. We recommend our PM-HSS grades (ASP2023 or ASP2052) or our brazed Tungsten Carbide rotors. While the initial investment is higher, tool life is extended by up to 1000%, drastically reducing machine downtime and lowering your cost-per-ton of compound. For PA66 GF40 specifically, brazed carbide inlay rotors are the most cost-effective long-term solution — the HSS body handles shock loading while the carbide cutting edges resist abrasion.",
        },
        {
          question:
            "Why are we getting 'tails' on our pellets, and how can your rotors fix this?",
          answer:
            "Tailing occurs when the polymer strand is torn or melted rather than cleanly sheared. This is caused by blunt rotor teeth, irregular helical angles, or excessive clearance from rotor runout. Sureay rotors feature a concentricity of ≤0.005\u202fmm, allowing your technicians to set a micro-gap against the bed knife for a perfect, scissor-like cut. The polished flute surface (Ra 0.2\u202fµm) also prevents polymer sticking that creates drag and uneven shear force.",
        },
        {
          question:
            "What is the difference between helical and straight-edge rotors, and when should I use each?",
          answer:
            "Helical rotors produce a progressive shear action — only one tooth segment engages at a time — which reduces peak cutting force, motor amperage spikes, and strand snap events. This makes them the standard choice for rigid thermoplastics and filled compounds on high-speed lines. Straight-edge rotors engage the full cutting width simultaneously, which is preferred for soft elastomers (TPE, TPU, TPV) where the gradual helical shear force can stretch and deform the strand rather than cutting it cleanly.",
        },
        {
          question:
            "Can you duplicate a custom rotor if we send a physical sample or CAD drawing?",
          answer:
            "Absolutely. As a direct manufacturing facility, we have full reverse-engineering capabilities. You can send us your worn rotor or technical blueprints, and we will produce a detailed CAD drawing for your approval before manufacturing the exact replacement. Dimensional verification on CMM is performed before shipment.",
        },
        {
          question:
            "How do I know when to replace or regrind my strand pelletizer rotor?",
          answer:
            "Key indicators: (1) increasing pellet fines and dust in the pellet stream — dulled teeth tear rather than shear; (2) rising motor amperage on the pelletizer drive — blunt edges require more force; (3) strand snapping becoming more frequent — irregular shear force from worn geometry increases tension spikes; (4) tailing reappearing despite correct gap setting — worn concentricity causes gap variation around the rotor circumference. For PM-HSS rotors, precision regrinding to OEM geometry is cost-effective. For carbide-tipped rotors, carbide can be re-tipped once before full rotor replacement is required.",
        },
      ],
      company: [
        {
          question:
            "Can Sureay supply matched rotor and bed knife (stator) sets?",
          answer:
            "Yes, and we strongly recommend purchasing them as matched pairs. We manufacture stator bed knives in Stellite 6 (for HSS rotors) and Solid Carbide (for carbide-tipped rotors). A matched pair ensures the cutting gap geometry and hardness differential are optimized together, delivering zero-tail pelletizing from the first strand. Mismatched rotor-stator combinations are a leading cause of premature wear and tailing on otherwise well-maintained lines.",
        },
        {
          question:
            "What lead times and documentation can Sureay provide for replacement rotors?",
          answer:
            "Standard PM-HSS replacement rotors for common OEM platforms (Maag, Coperion, Cumberland) ship in 10–15 working days from drawing approval. Custom helix angles or non-standard tooth counts require 15–20 working days. Every rotor ships with: CMM dimensional inspection certificate, dynamic balancing report (ISO 1940-1 G2.5), hardness test certificate, and steel mill material traceability. Rush production available subject to schedule.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Continuous Melt Filter Scraper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "continuous-melt-filter-scraper-blades",
    name: "Melt Filter Scraper Blades",
    fullName:
      "Premium Scraper Blades & Filter Plates for Continuous Melt Filters",
    category: "granulator_blades",
    sector: "recycling",
    categoryDisplay: "Melt Filter Scraper Blades",
    image: "/images/products/blades/scraper-blades.webp",
    badge: "PCR Recycling",
    badgeColor: "orange",
    gallery: [
      "/images/products/blades/scraper-blades.webp",
      "/images/products/blades/scraper-blades-01.webp",
      "/images/products/blades/scraper-blades-02.webp",
    ],

    description:
      "Precision D2/H13/Carbide scraper blades & laser-drilled conical filter plates for PCR continuous melt filters. Engineered hardness synergy (blade HRC 58–62 vs. plasma-nitrided plate HV 1,000+) protects filter plate capital investment. HCl-resistant alloys for PVC blends. Backflush-compatible with EREMA, Gneuß, Ettlinger & FIMIC.",

    fullDescription:
      "Continuous melt filters are the heart of any high-throughput PCR plastic recycling line. When processing heavily contaminated post-consumer regrind — containing mineral fillers, glass fibers, carbonized residues, and hard foreign particles — the scraper blade is the single component under the most extreme combined load: abrasive wear from hard contaminants, thermal fatigue from cyclic melt temperature exposure (220–300 °C), and cyclic bending stress from the rotation mechanism. A blade that fails prematurely forces an emergency line stop, costing hours of restarting time and wasting significant volumes of in-process melt.\n\nSureay continuous melt filter scraper blades are precision-manufactured from premium D2 cold-work tool steel and H13 hot-work tool steel — two alloys specifically selected for this dual wear-plus-heat-resistance requirement — and vacuum heat-treated to HRC 58–62 with deep cryogenic post-treatment to eliminate retained austenite and extend wear life by 30–40% versus standard heat treatment.\n\n## Alloy Selection by Contamination Level\n\n**D2 Tool Steel (HRC 60–62):** The standard specification for PCR HDPE, PP, and mixed rigid plastics with moderate contamination (< 3% mineral filler content). The 12% chromium and 1.5% carbon content delivers excellent abrasion resistance against glass particles and calcium carbonate fillers at melt processing temperatures up to 260 °C. Cost-effective for medium-duty continuous filtration at throughputs of 300–800 kg/h.\n\n**H13 Hot-Work Tool Steel (HRC 48–52):** Selected for heavily contaminated streams — post-consumer film regrind, agricultural mulch film, WEEE plastics — where melt temperatures exceed 280 °C and thermal cycling is severe. H13's molybdenum-vanadium carbide matrix maintains dimensional stability and edge geometry under sustained thermal loading that would cause D2 to soften and deform.\n\n**Solid Tungsten Carbide (HRA 88–91):** The ultimate specification for ultra-abrasive feedstocks: glass-filled engineering plastics (PA-GF30, PBT-GF), ceramic-contaminated streams, and silicon-rich agricultural film with embedded soil particles. Carbide scrapers deliver 5–8× longer service life versus D2 on these feedstocks, reducing blade change frequency to once per 1,000+ operating hours.\n\n## Precision-Ground Blade Geometry\n\nThe scraper blade's edge geometry directly controls filtration screen surface cleanliness and therefore melt pressure consistency. A worn or incorrectly profiled scraper leaves a residual contamination layer on the filter screen, causing progressive pressure build-up, reduced throughput, and ultimately screen breakthrough. Sureay blades are precision-ground to ±0.05 mm dimensional tolerance with edge bevel profiles matched to each filter OEM's screen contact geometry. The result is a consistent, reproducible scraping action that maintains screen cleanliness throughout the full blade service life.\n\n## Drop-In OEM Compatibility\n\nScraper blade geometry is machine-specific: each continuous melt filter OEM uses proprietary rotor dimensions, blade mounting interfaces, and screen diameters. Sureay reverse-engineers replacement blades from OEM drawings or customer samples, verifying fit on a coordinate measuring machine (CMM) before production. Compatible with EREMA Continuous Filter, Gneuß Rotary Filtration System, Ettlinger ERF series, FIMIC RAS series, Kreyenborg KSF series, and Nordson BKG continuous screen changers.\n\n## Laser-Drilled Conical Filter Plate Micro-Perforations\n\nThe filter plate's hole geometry is as critical as the scraper blade material. Standard punched or drilled cylindrical holes create a flat-wall channel where molten polymer and suspended contaminants can stagnate — carbonizing inside the hole under sustained heat, progressively reducing effective open area, and eventually causing premature screen blockage. Sureay filter plates use laser-drilled conical (tapered) micro-perforations: the hole is narrowest at the upstream melt-contact surface and widens progressively toward the downstream outlet. This conical profile exploits melt-side hydraulic pressure: once a contaminant particle passes the narrow inlet restriction, the expanding channel geometry immediately expels it toward the outlet with no dead-zone stagnation. The result is a filter plate that maintains consistent differential pressure and open-area percentage over a significantly longer service interval — particularly critical on heavily contaminated PCR streams where cylindrical-hole plates would require frequent replacement.\n\nAvailable filtration fineness: 80 µm (food-contact rPET/rHDPE), 150–200 µm (film-grade PCR), 300–500 µm (injection-grade PCR), 500–2,000 µm (coarse pre-filtration). Conical profile available across all fineness grades.\n\n## Hardness Synergy: Protecting Your Filter Plate Capital Investment\n\nA common and justified concern when sourcing aftermarket scraper blades is whether a high-hardness replacement blade will score or gouge the filter plate — a capital component that costs significantly more than the blade itself. Sureay engineers a deliberate and verified hardness differential between the scraper blade and the filter plate surface.\n\nThe filter plate's upstream face is plasma nitrided to HV 1,000+ (approximately equivalent to HRC 70+), creating an extremely hard, wear-resistant ceramic-like surface layer 0.1–0.3 mm deep. The scraper blade is intentionally manufactured to a lower HRC 58–62. This differential means that under all operating conditions, the blade is the controlled-wear consumable: it wears gradually against the harder plate surface without generating metal-transfer scoring or gouging. The filter plate surface remains intact across multiple blade replacement cycles. Every Sureay blade shipment includes a hardness test certificate confirming the blade is within the specified HRC range — verifiable documentation that the controlled-wear principle is maintained in every production batch.\n\n## Chemical & Corrosion Resistance for PVC and Mixed-Plastic Streams\n\nProcessing washed post-consumer PVC, mixed flexible films, or WEEE-derived plastics releases aggressive corrosive outgassing — primarily hydrochloric acid (HCl) and organochlorine compounds — at melt temperatures of 200–260 °C. Standard D2 and H13 tool steels corrode under sustained HCl exposure: surface pitting initiates at grain boundaries, progressively degrading the micro-perforation edge geometry and enlarging hole diameters beyond specification, compromising filtration quality without any visible external indication.\n\nFor PVC-inclusive streams, Sureay applies two protective measures: (1) base alloy upgrade to corrosion-resistant PM (powder-metallurgy) steel grades with homogeneous chromium distribution that resists acid grain-boundary attack; (2) physical vapour deposition (PVD) barrier coatings on filter plate surfaces that seal the micro-perforation walls against HCl diffusion. This combination extends filter plate service life by 2–3× versus uncoated standard-alloy plates on PVC-containing feedstocks, and prevents the insidious hole-enlargement failure mode that undermines filtration efficiency without triggering a pressure alarm.\n\n## Backflush Compatibility\n\nHigh-end continuous melt filters (Ettlinger ERF, Gneuß RSFgenius, Kreyenborg KSF) incorporate automated backflushing mechanisms: a high-pressure reverse pulse of clean melt is periodically fired backward through a localized section of the filter plate to expel embedded contaminant cake from the micro-perforations, restoring open area without stopping the line. The backflush pulse generates a localized reverse pressure spike — typically 150–400 bar depending on the OEM — applied to a small area of the filter plate.\n\nSureay filter plates are designed and manufactured to withstand OEM-rated backflush pressures without micro-cracking or deformation. The conical hole geometry is dimensionally optimized for this: the wider downstream outlet of each conical perforation acts as a flared nozzle that accelerates the backflush pulse, improving contaminant ejection efficiency versus cylindrical holes. Structural integrity under repeated high-pressure reverse cycles is validated through finite element analysis (FEA) of the inter-hole ligament stress distribution. Replacement Sureay plates maintain 100% compatibility with OEM backflush timing, pressure, and hole-array layout — no recalibration of the backflush controller is required.\n\n## Failure Analysis: Diagnosing & Eliminating Common Scraper and Filter Failures\n\nEngineers sourcing replacement components are typically dealing with a specific failure mode. The correct material upgrade depends on the root cause.\n\n**Edge Chipping (Brittle Fracture at Blade Tip):** Caused by a single high-energy impact from tramp metal — bolts, nuts, wire fragments — embedded in the PCR regrind feedstock. D2 and standard carbide grades are vulnerable to brittle fracture under this impulse loading. **Upgrade:** Specify H13 (higher impact toughness than D2) for mixed-contamination streams where tramp metal risk is moderate, or a toughness-optimized carbide grade (Co content ≥ 12%) for high-risk streams. Add upstream magnet and/or metal detector to reduce tramp metal frequency.\n\n**Progressive Surface Scoring on Filter Plate:** Fine parallel grooves on the filter plate face, accompanied by rising differential pressure and shortened blade intervals. Caused by incorrect blade hardness (blade harder than plate), incorrect bevel angle causing concentrated edge loading, or grit contamination in the blade-plate interface. **Upgrade:** Verify blade hardness certificate (must be ≤ HRC 62). Confirm edge bevel angle matches OEM screen contact geometry (±0.5°). Inspect plate surface for plasma-nitride layer depletion — if scoring has reached the base metal, the plate requires replacement before installing new blades.\n\n**Rapid Blade Wear (< 200 Hours on Standard PCR):** Unexpectedly short service life on a nominally moderate feedstock indicates higher-than-declared contamination: elevated glass-fiber, silica, or ceramic filler content in the regrind. Submit regrind sample for XRF contamination analysis. **Upgrade:** Step from D2 to H13 first; if service life remains inadequate, move to solid tungsten carbide which delivers 5–8× longer life on abrasive-dominated failure streams.\n\n**Hole Enlargement / Filtration Quality Degradation Without Pressure Alarm:** Filter plate micro-perforations gradually enlarge over time, allowing oversized contaminant particles through at stable differential pressure. Root cause: HCl corrosion from PVC outgassing dissolving hole-wall material. No pressure alarm because the enlarged holes maintain low resistance. **Upgrade:** Specify PVD-coated, corrosion-resistant PM steel filter plates for all streams containing ≥ 5% PVC by weight.",

    link: "/products/continuous-melt-filter-scraper-blades",
    isFeatured: true,

    compatibleMachines: [
      "EREMA",
      "Gneuß",
      "Ettlinger",
      "FIMIC",
      "Kreyenborg",
      "Nordson BKG",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 Tool Steel / H13 Hot-Work Steel / Solid Tungsten Carbide",
      },
      {
        label: "Hardness Differential",
        value:
          "Blade: HRC 58–62 (controlled-wear consumable) | Filter Plate Surface: Plasma Nitrided HV 1,000+",
      },
      {
        label: "Filter Plate Profile",
        value:
          "Laser-drilled conical micro-perforations, 80–2,000 µm — tapered inlet expels contaminants, prevents polymer stagnation",
      },
      {
        label: "Dimensional Tolerance",
        value: "±0.05 mm (blade profile) | ±0.02 mm (thickness)",
      },
      {
        label: "Operating Temperature",
        value: "Up to 300 °C (H13 / Carbide grades)",
      },
      {
        label: "Corrosion Resistance",
        value:
          "HCl-resistant alloys & barrier coatings for PVC and mixed-plastic melt outgassing",
      },
      {
        label: "Applications",
        value:
          "PCR HDPE/PP, Glass-Filled Compounds, PVC Blends, Agricultural Film, WEEE Plastics",
      },
    ],

    components: [
      {
        id: "hardness-synergy",
        tag: "ASSET PROTECTION",
        title: "Engineered Hardness Synergy",
        description:
          "Filter plates are plasma nitrided to HV 1,000+ (≈ HRC 70+). Scraper blades are deliberately held at HRC 58–62. This verified differential makes the blade the controlled-wear consumable — it wears against the harder plate surface without scoring or gouging. Every shipment includes a hardness certificate confirming the blade is within range.",
      },
      {
        id: "conical-laser-plates",
        tag: "FILTRATION TECHNOLOGY",
        title: "Conical Laser-Drilled Micro-Perforations",
        description:
          "Tapered hole geometry (narrow inlet, wide outlet) exploits melt pressure to immediately expel contaminants rather than allowing them to stagnate inside cylindrical-wall holes. Prevents carbonization-driven hole blockage, maintains consistent differential pressure, and supports OEM backflush pulse dynamics at 150–400 bar without micro-cracking.",
      },
      {
        id: "failure-upgrade-path",
        tag: "FAILURE ANALYSIS",
        title: "Diagnostic Upgrade Path",
        description:
          "Edge chipping from tramp metal → upgrade to H13 or toughness-grade carbide. Progressive plate scoring → verify blade HRC certificate and bevel angle. Service life < 200 h on standard PCR → step to solid carbide for abrasion-dominated failure. Silent hole enlargement → specify PVD-coated corrosion-resistant PM plates for PVC-containing streams.",
      },
    ],

    dimensionLabels: {
      col0: "Filter Model / OEM",
      col1: "Blade Length (mm)",
      col2: "Blade Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Representative dimensions for common continuous melt filter platforms. All blades reverse-engineered to exact OEM drawing or customer sample. Custom geometries and mounting interfaces available on request.",
    },

    standardDimensions: [
      {
        spec: "EREMA",
        od: "180 – 420",
        id: "25 – 40",
        thickness: "6 / 8",
      },
      {
        spec: "Gneuß Rotary System",
        od: "150 – 380",
        id: "20 – 35",
        thickness: "5 / 8",
      },
      {
        spec: "Ettlinger ERF 200/350",
        od: "200 / 350",
        id: "30 / 40",
        thickness: "8 / 10",
      },
      {
        spec: "FIMIC",
        od: "160 – 400",
        id: "22 – 38",
        thickness: "6 / 8",
      },
      {
        spec: "Kreyenborg KSF",
        od: "200 – 500",
        id: "30 – 50",
        thickness: "8 / 12",
      },
      {
        spec: "Nordson BKG",
        od: "150 – 350",
        id: "20 – 35",
        thickness: "5 / 8",
      },
    ],

    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "granulator-blades",
      "scrap-chopper-blades",
    ],
    offers: {
      lowPrice: 35,
      highPrice: 480,
    },
    faqs: {
      technical: [
        {
          question:
            "When should I upgrade from D2 to H13 for my scraper blades?",
          answer:
            "Upgrade to H13 when your melt processing temperature consistently exceeds 260 °C, or when you are processing highly contaminated streams such as post-consumer agricultural film, WEEE plastics, or heavily printed packaging waste. These feedstocks generate significant thermal cycling stress that causes D2 to soften and lose edge geometry within 200–400 operating hours. H13's molybdenum-vanadium carbide matrix maintains hardness and dimensional stability up to 300 °C, extending scraper service life by 60–80% on these feedstocks.",
        },
        {
          question:
            "How does scraper blade wear affect melt pressure and throughput on a continuous filter?",
          answer:
            "A worn scraper blade leaves a residual contamination film on the filter screen surface after each rotation. This film progressively reduces the effective open screen area, causing melt pressure to rise and throughput to fall. On a heavily loaded PCR line, a blade worn beyond its service limit can cause a 15–25% throughput reduction and accelerate screen clogging to the point of breakthrough failure. Monitoring melt pressure differential across the filter is the most reliable wear indicator — we recommend blade inspection when differential pressure rises more than 20% above baseline.",
        },
        {
          question:
            "What filtration fineness should I specify for recycled HDPE and PP pellet production?",
          answer:
            "For standard PCR HDPE and PP pellet production targeting film or injection moulding applications, specify 300–500 µm filtration fineness. This removes hard particles that cause die-face streaking and surface defects without excessive pressure drop on moderately contaminated feedstock. For food-grade contact recycled resin (rHDPE, rPP under EU 10/2011), specify 150–200 µm to meet the stricter contamination removal requirements. For highly contaminated agricultural film or MSW-derived feedstock, start with 500–800 µm to manage pressure and step down as the input quality improves.",
        },
        {
          question:
            "Will high-hardness aftermarket scraper blades score or damage my filter plates?",
          answer:
            "This is the most important question to ask any aftermarket blade supplier. Sureay engineers a deliberate hardness differential: filter plates are plasma nitrided to HV 1,000+ (approximately HRC 70+), and scraper blades are manufactured to a strictly controlled HRC 58–62. The blade is always softer than the plate surface — it functions as a controlled-wear consumable that gradually wears away without generating metal-transfer scoring or gouging on the harder plate face. Every shipment includes a Rockwell HRC test certificate confirming the blade is within this range. If a supplier cannot provide this certificate, you have no guarantee the hardness differential is correct.",
        },
        {
          question:
            "Are Sureay filter plates compatible with automated backflushing on Ettlinger and Gneuß systems?",
          answer:
            "Yes, fully compatible. Sureay filter plates are designed and FEA-validated for OEM-rated backflush pulse pressures (typically 150–400 bar on Ettlinger ERF and Gneuß RSFgenius systems). The conical laser-drilled hole geometry enhances backflush efficiency: the wider downstream outlet acts as a nozzle that accelerates the reverse pulse through each perforation, improving contaminant ejection versus cylindrical-hole plates. Hole array layout and plate dimensions replicate OEM specifications exactly — no recalibration of backflush timing, pressure, or controller parameters is required after installation.",
        },
        {
          question:
            "My filter is losing filtration quality without a differential pressure alarm. How do I diagnose this?",
          answer:
            "This is the symptom of silent hole enlargement — a failure mode where filter plate micro-perforations gradually widen due to chemical corrosion of the hole walls rather than mechanical wear. Enlarged holes allow oversized contaminant particles through while maintaining low differential pressure because the wider holes offer less resistance. The root cause is almost always HCl outgassing from PVC or organochlorine contamination in the feedstock reacting with standard tool steel at melt temperatures. Confirm by: (1) measuring output melt contamination particle size — if oversized particles are present without pressure rise, hole enlargement is confirmed; (2) inspect a removed plate under magnification for hole-wall pitting or rounding. The solution is to specify Sureay PVD-coated, corrosion-resistant PM steel filter plates, which seal the micro-perforation walls against acid diffusion and prevent the insidious progressive enlargement.",
        },
        {
          question:
            "Can Sureay match our existing EREMA or Gneuß scraper blade dimensions?",
          answer:
            "Yes. Send us your existing blade sample or the OEM part number and machine model. We will dimensionally verify the blade profile on our CMM, confirm the mounting interface, edge bevel angle, and material specification, and supply direct drop-in replacements. For EREMA Continuous Filter and Gneuß Rotary Filtration Systems, we maintain reference drawings for the most common platform sizes. Lead time for standard replacement blades is 7–12 working days from dimension confirmation.",
        },
        {
          question:
            "How many operating hours can I expect from D2 scraper blades on a mixed PCR line?",
          answer:
            "On a mixed PCR rigid plastics line (HDPE/PP, < 3% mineral contamination, melt temperature 230–260 °C), D2 scraper blades typically deliver 400–700 operating hours before the edge profile degrades to the point of rising differential pressure. H13 blades on the same line extend service intervals to 600–1,000 hours. On highly abrasive streams (glass-filled compounds, agricultural film with embedded soil), D2 service life drops to 150–300 hours; H13 extends this to 250–450 hours; solid carbide delivers 1,000–2,000+ hours on these feedstocks.",
        },
      ],
      company: [
        {
          question:
            "Are your melt filter scraper blades direct OEM replacements or aftermarket parts?",
          answer:
            "They are precision aftermarket replacements manufactured to OEM dimensional specifications. We reverse-engineer each blade from OEM drawings or customer samples, verify fit on a CMM, and supply with a dimensional inspection certificate. Our blades are not rebranded OEM parts — they are manufactured directly in our facility using premium D2, H13, or carbide materials with our full quality documentation package.",
        },
        {
          question:
            "What quality documentation is included with scraper blade shipments?",
          answer:
            "Every shipment includes: Rockwell HRC hardness test certificate, CMM dimensional inspection report confirming edge profile and mounting interface tolerances, steel mill material traceability certificate, and heat treatment batch certificate. For customers requiring enhanced documentation for ISO 9001 or recycling process qualification, full material test reports and process records are available on request.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Special-Shaped Blades (Custom Profile)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "special-shaped-blades",
    name: "Special-Shaped Blades",
    fullName: "Custom Profile & Special-Shaped Industrial Blades",
    category: "custom_profile",
    sector: "other",
    categoryDisplay: "Custom Profile Blades",
    image: "/images/products/blades/special-shaped-knife.webp",
    badge: "OEM Custom",
    badgeColor: "teal",
    description:
      "Precision-manufactured custom profile and special-shaped industrial blades produced from customer DXF/DWG drawings or physical samples. D2, H13, PM-HSS, and solid carbide. Tolerances to ±0.02 mm. Any profile, any industry.",
    link: "/custom",
    specs: [
      { label: "Material", value: "D2 / H13 / PM-HSS / Carbide" },
      { label: "Tolerance", value: "±0.02 mm" },
      { label: "Drawing Input", value: "DXF / DWG / STEP / Sample" },
      { label: "Lead Time", value: "7–15 working days" },
    ],
    offers: {
      lowPrice: 20,
      highPrice: 800,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Wood Chipper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-blades",
    name: "Wood Chipper Blades",
    fullName:
      "Heavy-Duty Drum & Disc Chipper Knives for Biomass, Forestry & Wood Recycling",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Wood Chipper Blades",
    image: "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
    badge: "Forestry Grade",
    badgeColor: "green",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-10.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-drawing.webp",
    ],
    description:
      "Premium D2, Cr12MoV & TCT drum and disc chipper knives for biomass processing, forestry operations & wood recycling. Through-hardened HRC 57–62 with deep cryogenic treatment. Precision-ground to ±0.05 mm thickness tolerance for clean, uniform chip geometry. Drop-in OEM fit for Bandit, Vermeer, Morbark, Peterson, Doppstadt & Jenz chippers.",
    fullDescription:
      "Wood chipper blades operate under some of the most punishing conditions in the size-reduction industry. Every rotation drives the cutting edge into dense hardwood, green timber with high moisture content, contaminated demolition wood, or recycled pallets embedded with nails and staples. A blade that lacks the correct balance of hardness and toughness will either dull within hours on clean hardwood or shatter on the first nail strike in contaminated feedstock.\n\nSureay wood chipper blades are forged from premium tool steels — D2 (1.2379), Cr12MoV, and high-carbon chipper knife steel — vacuum heat-treated to HRC 57–62, followed by a mandatory deep cryogenic soak at −196°C. This processing sequence produces a fully stabilised martensitic microstructure with uniform carbide distribution across the entire blade cross-section, delivering the dual performance requirement of wood chipping: abrasion resistance to hold a sharp edge through hundreds of cubic meters of timber, combined with sufficient core toughness to survive impacts from embedded metal contaminants without catastrophic fracture.\n\n## Chipper Type & Blade Geometry\n\n### Drum Chipper Blades\n\nDrum chippers (Vermeer BC1800, Bandit 1990, Morbark 40/36) use rectangular straight knives bolted to a high-speed rotating drum (typically 1,000–2,500 RPM). The blade acts as a planer knife — each revolution peels a chip from the infeed timber at the programmed depth of cut. Blade length corresponds to the drum width (typically 200–600 mm), and thickness (typically 12–30 mm) determines maximum chip depth.\n\nCritical parameters for drum chipper performance:\n- **Bevel angle:** 30°–37° (hardwood) or 25°–30° (softwood/green timber)\n- **Thickness parallelism:** ≤ 0.05 mm — uneven blade thickness causes drum imbalance, destructive vibration, and inconsistent chip size\n- **Bolt-hole positional tolerance:** ±0.10 mm — ensures the cutting edge projects evenly across the full drum width after mounting\n\n### Disc Chipper Blades\n\nDisc chippers (Peterson 5710, Morbark 50/48, Precision Husky) mount blades radially on a heavy rotating disc. The timber is fed axially into the disc face, and the blades produce chips by a combination of shearing and splitting action. Disc chipper blades are typically shorter but thicker than drum chipper knives, and are subjected to higher individual impact loads from large-diameter logs.\n\nDisc chipper blades require maximum toughness specification: Cr12MoV or modified chipper knife steel at HRC 55–58 is recommended for whole-log disc chippers processing hardwood above 300 mm diameter.\n\n### Whole-Tree / Biomass Chipper Blades\n\nBiomass and whole-tree chippers (Doppstadt DH 910, Jenz HEM 820, CBI Magnum Force) process entire trees including branches, root balls, and brush. The feedstock contains embedded soil, stones, and occasional metal debris. Blades for these applications are manufactured from impact-optimised steel at HRC 55–58, with a wider bevel angle (35°–42°) that distributes impact forces across a broader cutting face and prevents edge rollover on contaminated feedstock.\n\n## Material Selection by Feedstock\n\n**High-Carbon Chipper Knife Steel (HRC 55–58):** The industry-standard grade for general forestry and green timber chipping. Cost-effective, easily resharpened on standard surface grinders, and tough enough for moderate nail contamination. Suited to landscape contractors, tree service companies, and municipal green waste operations.\n\n**D2 / Cr12MoV Cold-Work Tool Steel (HRC 58–62):** Premium specification for high-volume commercial wood recycling and biomass fuel chip production. The 12% chromium carbide matrix provides 2–3× longer edge life versus standard carbon steel on abrasive hardwoods (oak, hickory, ironbark) and dry recycled timber. Recommended for industrial drum chippers running 8–16 hour continuous shifts.\n\n**TCT — Tungsten Carbide Tipped (Brazed Inserts):** The ultimate specification for extreme-duty biomass processing. Carbide-tipped chipper knives deliver 5–10× the service life of D2 on contaminated demolition wood, railroad ties, and heavily soiled root balls. The carbide cutting edge is vacuum-brazed onto a tough alloy steel body that absorbs the gross impact energy without transmitting brittle fracture to the carbide insert.\n\n## Precision Grinding for Chip Quality\n\nChip geometry is the primary product quality metric in biomass fuel production: pulp mills, biomass power plants, and pellet manufacturers specify strict chip size distribution standards (e.g., EN 17225-4 / TAPPI T257). Uneven blade thickness or inconsistent bevel angles across a multi-blade drum or disc produce oversized and undersized chips that fail screening specifications, requiring secondary processing or causing price deductions.\n\nSureay chipper blades are precision surface-ground to:\n- **Thickness tolerance:** ±0.05 mm across the full blade length\n- **Bevel angle:** ±0.5° (verified by optical comparator)\n- **Face flatness:** ≤ 0.05 mm per 300 mm length\n- **Surface finish:** Ra ≤ 1.6 μm on the rake face for reduced friction and clean chip ejection\n\n## Counter-Knife (Anvil) & Wear Plate Supply\n\nThe counter-knife (anvil or bed knife) sets the clearance gap that determines minimum chip thickness. Worn or misaligned counter-knives negate the benefit of new chipper blades. Sureay manufactures matched counter-knives and replaceable wear plates in D2 and manganese steel, supplied as integrated sets with pre-verified clearance specifications for your chipper model.\n\n## Resharpening Capability\n\nUnlike shredder blades, chipper knives are designed for multiple regrinding cycles. Our through-hardened heat treatment ensures uniform hardness from the surface to the core — each regrind exposes steel of identical hardness and wear characteristics. A standard D2 chipper blade can be reground 8–12 times before reaching minimum safe thickness, making the total cost of ownership extremely competitive.",
    link: "/products/wood-chipper-blades",
    isFeatured: true,
    compatibleMachines: [
      "Bandit Industries",
      "Vermeer",
      "Morbark",
      "Peterson Pacific",
      "Doppstadt",
      "Jenz",
      "CBI",
      "Precision Husky",
      "Bruks Siwertell",
    ],
    specs: [
      {
        label: "Material",
        value:
          "High-Carbon Chipper Steel | D2 (1.2379) / Cr12MoV | TCT Carbide Tipped",
      },
      {
        label: "Hardness",
        value: "HRC 55–58 (Standard) | HRC 58–62 (D2/Cr12MoV) | HRA 89–91 (TCT)",
      },
      {
        label: "Thickness Tolerance",
        value: "±0.05 mm (prevents drum imbalance & vibration)",
      },
      {
        label: "Bevel Angle",
        value: "25°–42° (optimised per timber species & contamination level)",
      },
      {
        label: "Heat Treatment",
        value: "Vacuum Hardening + Deep Cryogenic (−196°C)",
      },
      {
        label: "Resharpening",
        value: "Through-hardened — 8–12 regrind cycles per blade",
      },
      {
        label: "Application",
        value:
          "Forestry Drum Chippers, Disc Chippers, Biomass Whole-Tree Chippers, Pallet Recycling",
      },
    ],
    components: [
      {
        id: "through-hardened-core",
        tag: "METALLURGY",
        title: "Through-Hardened for Maximum Regrind Life",
        description:
          "Unlike case-hardened alternatives that expose a soft core after the first regrind, Sureay chipper blades are vacuum heat-treated to achieve uniform hardness (HRC 57–62) from surface to core. Each regrind delivers identical edge performance to a new blade, yielding 8–12 productive service cycles per blade.",
      },
      {
        id: "impact-toughness",
        tag: "DURABILITY",
        title: "Nail & Contaminant Resistance",
        description:
          "Contaminated demolition wood, recycled pallets, and urban green waste contain hidden nails, screws, and stones. Our deep cryogenic treatment (−196°C) stabilises the martensitic microstructure, delivering the core toughness needed to absorb metal-strike impacts without brittle edge fracture or blade cracking.",
      },
      {
        id: "chip-quality",
        tag: "OUTPUT QUALITY",
        title: "Precision Bevel for Uniform Chip Size",
        description:
          "Biomass power plants and pulp mills penalise off-spec chip size distributions. Every blade is surface-ground to ±0.05 mm thickness and ±0.5° bevel angle, ensuring consistent chip geometry across the full drum or disc width that meets EN 17225 and TAPPI T257 standards.",
      },
    ],
    dimensionLabels: {
      col0: "Chipper Type / OEM Platform",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard dimensions for major chipper OEMs. 2-hole, 3-hole, and 4-hole bolt patterns CNC-machined to exact OEM blueprints. Counter-knives and wear plates available as matched sets. Custom lengths up to 800 mm.",
    },
    standardDimensions: [
      { spec: "Bandit 12\" / 15\" Drum", od: "230", id: "80", thickness: "16" },
      { spec: "Bandit 18\" / 19\" Drum", od: "295", id: "80", thickness: "19" },
      { spec: "Vermeer BC1800 / BC2100", od: "310", id: "100", thickness: "19" },
      { spec: "Morbark 40/36 Drum", od: "400", id: "100", thickness: "22" },
      { spec: "Morbark 50/48 Disc", od: "250", id: "120", thickness: "25" },
      { spec: "Peterson 5710 Disc", od: "280", id: "130", thickness: "25" },
      { spec: "Doppstadt / Jenz Biomass", od: "350", id: "100", thickness: "20" },
      { spec: "Heavy Whole-Tree Chipper", od: "600", id: "150", thickness: "30" },
    ],
    relatedBladeIds: [
      "wood-chipper-anvils",
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
      "granulator-blades",
    ],
    offers: {
      lowPrice: 25,
      highPrice: 380,
    },
    faqs: {
      technical: [
        {
          question:
            "What blade material should I use for chipping clean green timber versus contaminated demolition wood?",
          answer:
            "For clean green timber (forestry, tree service, land clearing), standard high-carbon chipper knife steel at HRC 55–58 delivers excellent edge life at the lowest cost per regrind cycle. For contaminated demolition wood, recycled pallets, or urban green waste with embedded nails, screws, and stones, upgrade to Cr12MoV or D2 at HRC 58–60. The chromium-carbide matrix provides 2–3× longer edge life on abrasive dry wood while maintaining sufficient toughness to survive moderate metal impacts. For heavily contaminated streams (railroad ties, C&D debris), specify TCT carbide-tipped blades that deliver 5–10× longer service life than D2.",
        },
        {
          question:
            "How does blade thickness tolerance affect chip quality and drum vibration?",
          answer:
            "Blade thickness directly controls chip depth and influences drum balance. If blade thicknesses vary by more than 0.10 mm across a multi-blade drum, the thicker blades cut deeper and produce oversized chips while thinner blades produce undersized chips — both conditions fail biomass fuel screening specifications (EN 17225-4). Additionally, uneven blade mass creates dynamic imbalance at operating RPM (1,000–2,500 RPM), causing destructive vibration that accelerates bearing failure and fatigues the drum housing. Our ±0.05 mm thickness tolerance eliminates both issues.",
        },
        {
          question:
            "What bevel angle should I specify for hardwood versus softwood chipping?",
          answer:
            "For softwood and green timber with high moisture content (pine, spruce, poplar), specify 25°–30° bevel angle. The sharper included angle slices through soft, fibrous wood with minimum cutting force and produces clean chip faces with low fibre tear. For dry hardwood (oak, hickory, eucalyptus), increase to 30°–37° to strengthen the cutting edge against the higher density and impact loading. For contaminated biomass and whole-tree chipping with soil and stone contamination, specify 35°–42° — the wider bevel distributes impact forces across a broader cutting face, preventing edge rollover.",
        },
        {
          question:
            "How many times can Sureay chipper blades be resharpened, and what is the correct regrinding procedure?",
          answer:
            "Our through-hardened chipper blades can be resharpened 8–12 times before reaching minimum safe thickness (typically 60–70% of original thickness). Regrind on a wet surface grinder using an aluminum oxide wheel (46–60 grit) at 0.02–0.05 mm depth per pass to prevent thermal damage to the heat-treated edge. Never dry-grind chipper knives — the localised overheating above 200°C draws the temper and softens the edge. After grinding, verify the bevel angle with an optical comparator or digital protractor. We also offer a professional regrinding service with hardness re-verification.",
        },
        {
          question:
            "What causes premature edge rollover on my chipper blades, and how do I prevent it?",
          answer:
            "Edge rollover (the cutting edge folding over rather than chipping or wearing gradually) indicates the blade hardness is too low for the feedstock, or the bevel angle is too acute for the impact loading. On standard carbon steel blades processing dry hardwood, the edge lacks sufficient carbide reinforcement to resist plastic deformation. Upgrade to D2 or Cr12MoV at HRC 58–62 and increase the bevel angle by 3°–5°. Also verify counter-knife clearance: excessive clearance (> 1.5 mm) forces the blade to fracture the wood by bending rather than shearing, dramatically increasing edge loading.",
        },
        {
          question:
            "Should I replace the counter-knife (anvil) when I install new chipper blades?",
          answer:
            "The counter-knife should be inspected every time chipper blades are changed. A worn counter-knife with a rounded or chipped edge forces new blades to work against an inconsistent shear gap, reducing their effective service life by 30–50% and producing poor chip quality. Replace or regrind the counter-knife when the cutting edge shows visible rounding exceeding 1.0 mm or chipping deeper than 0.5 mm. We supply matched counter-knives manufactured from D2 or manganese steel as integrated sets with pre-verified clearance.",
        },
        {
          question:
            "What chip size distribution should I target for biomass fuel production versus pulp mill supply?",
          answer:
            "Biomass power plants typically require chips within 3–50 mm (EN 17225-4 Class P31s or P45s) with less than 5% fines (< 3 mm) and less than 1% oversized (> 63 mm). Pulp mills require tighter specifications per TAPPI T257: typically 80% acceptance in 7–25 mm range with strict limits on pin chips and overthick pieces. Achieving these specifications requires consistent blade thickness (±0.05 mm), correct bevel angle, proper counter-knife clearance (0.5–1.0 mm), and uniform drum speed. We can recommend the optimal blade geometry for your target specification.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question:
            "Can you supply blades for my specific chipper model if it is not listed in your standard dimensions?",
          answer:
            "Yes. Send us your existing blade sample, a technical drawing, or your chipper make and model number. We will confirm the length, width, thickness, bevel angle, and bolt-hole pattern, and manufacture exact drop-in replacements. We maintain an extensive database of OEM chipper blade blueprints for Bandit, Vermeer, Morbark, Peterson, Doppstadt, Jenz, and CBI platforms. Custom dimensions are manufactured to drawing within 10–15 working days.",
        },
        {
          question:
            "What makes Sureay's heat treatment different from cheaper alternatives?",
          answer:
            "Unlike standard quench-and-temper processes, every Sureay chipper blade undergoes vacuum hardening followed by deep cryogenic treatment at −196°C. The cryogenic step transforms retained austenite into stable martensite, improving wear resistance by up to 40% and ensuring uniform hardness from surface to core. This means every regrind exposes steel of identical quality — cheap blades often expose a softer core after the first regrind, halving the edge life of subsequent sharpening cycles.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement chipper blades in stock sizes typically ship within 48–72 hours. Custom profiles and TCT carbide-tipped blades take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question:
            "What quality certifications does Sureay hold, and can you provide material test reports?",
          answer:
            "Sureay is ISO 9001:2015 certified. Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record (thickness, bevel angle, bolt-hole positions), and a heat treatment batch certificate. For large-volume biomass operations requiring full traceability, steel mill composition certificates and CMM dimensional reports are available on request.",
        },
        {
          question:
            "Can we trial a sample set before committing to a full production order?",
          answer:
            "Yes. We offer sample sets (typically 2–4 blades) for machine fit verification and edge life benchmarking against your current supplier. Standard sample lead time is 5–7 working days. For TCT carbide-tipped blades, sample lead time is 10–12 working days.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Wood Chipper Blades — Industrial (HSS & D2)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-blades-industrial",
    name: "Industrial Wood Chipper Blades",
    fullName:
      "HSS & D2 Tool Steel Drum Chipper Knives for Heavy Forestry, Biomass & Wood Recycling",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Wood Chipper Blades",
    image: "/images/products/wood-chipper-blades/wood-chipper-blades-12.webp",
    badge: "Industrial Grade",
    badgeColor: "red",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-blades-12.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-14.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-13.webp",
    ],
    description:
      "Heavy-duty drum chipper knives in M2 HSS, D2 (SKD11), and Cr12MoV tool steel for industrial forestry, whole-tree biomass processing & demolition wood recycling. Vacuum-hardened HRC 58–62 with deep cryogenic treatment. Precision surface-ground to ±0.05\u202fmm thickness parallelism. Drop-in OEM fit for Vermeer, Morbark, Doppstadt, Jenz & Bruks Siwertell.",
    fullDescription:
      "Industrial wood chippers in forestry, biomass energy, and C&D wood recycling operate under sustained high-torque loading that exposes every weakness in blade metallurgy. A standard high-carbon steel blade will dull within a single shift on dense hardwood, and shatter on the first nail strike in contaminated demolition timber. Sureay industrial wood chipper blades are manufactured from premium tool steels — M2 HSS, D2 (1.2379 / SKD11), and Cr12MoV — selected specifically for the dual requirement of abrasion resistance and impact toughness.\n\nEvery blade is vacuum heat-treated through a controlled 4-cycle tempering sequence and deep cryogenically processed at −196°C.\n\n## Material Selection by Feedstock & Duty Cycle\n\n**D2 / SKD11 Cold-Work Tool Steel (HRC 58–62):** The premium specification for high-volume commercial wood recycling and biomass chip production. The 12% chromium and 1.55% carbon content delivers outstanding abrasion resistance against lignin-rich hardwood fibres and silica-bearing bark.\n\n**Cr12MoV (HRC 58–60):** An excellent balance of wear resistance and toughness for mixed feedstock operations. Cr12MoV's molybdenum-vanadium additions improve impact energy absorption compared to standard D2, making it the correct choice for disc chippers and whole-tree biomass processors.\n\n**M2 HSS (HRC 62–64):** The highest-hardness specification for clean, high-speed drum chipping of softwood logs and pulpwood where maximum edge retention is the priority.\n\n**6CrW2Si (HRC 55–58):** Shock-resisting alloy for heavily contaminated demolition wood, railroad ties, and urban green waste with high metal contamination risk.\n\n## Precision Grinding for Chip Quality\n\nSureay industrial chipper blades are precision surface-ground to ±0.05 mm thickness parallelism, ±0.5° bevel angle, ≤0.05 mm face flatness per 300 mm, and ±0.10 mm bolt-hole positional tolerance.",
    link: "/products/wood-chipper-blades-industrial",
    isFeatured: true,
    compatibleMachines: [
      "Vermeer",
      "Morbark",
      "Doppstadt",
      "Jenz",
      "Bruks Siwertell",
      "Peterson Pacific",
      "CBI",
      "Precision Husky",
    ],
    specs: [
      { label: "Material", value: "M2 HSS (1.3343) | D2 / SKD11 (1.2379) | Cr12MoV | 6CrW2Si" },
      { label: "Hardness", value: "HRC 58–62 (D2/Cr12MoV) | HRC 62–64 (M2 HSS) | HRC 55–58 (6CrW2Si)" },
      { label: "Heat Treatment", value: "Vacuum Hardening, 4-Cycle Tempering + Deep Cryogenic (−196°C)" },
      { label: "Thickness Tol.", value: "±0.05 mm (ensures drum dynamic balance at 2,500 RPM)" },
      { label: "Bevel Angle", value: "25°–42° (optimised per species & contamination level)" },
      { label: "Resharpening", value: "Through-hardened — 8–12 regrind cycles per blade" },
      { label: "Application", value: "Industrial Drum & Disc Chippers, Whole-Tree Biomass, Demolition Wood, Pulpwood" },
    ],
    components: [
      {
        id: "premium-metallurgy",
        tag: "METALLURGY",
        title: "HSS & D2 Tool Steel — Not Standard Carbon Steel",
        description:
          "Standard high-carbon chipper knives dull within hours on dense hardwood and shatter on contaminated feedstock. Our D2/SKD11 blades deliver 2–3× longer edge life through uniform chromium-carbide distribution, while M2 HSS provides the ultimate edge retention on clean softwood at high-RPM drum speeds.",
      },
      {
        id: "cryo-through-hardened",
        tag: "DURABILITY",
        title: "Deep Cryogenic + Through-Hardened Core",
        description:
          "Vacuum hardening followed by deep cryogenic treatment at −196°C transforms retained austenite into stable martensite, boosting wear resistance by up to 40%. Through-hardening ensures each of the 8–12 regrind cycles delivers identical edge performance — no soft core exposed after sharpening.",
      },
      {
        id: "drum-balance-precision",
        tag: "PRECISION",
        title: "±0.05 mm for Dynamic Drum Balance",
        description:
          "At drum tip speeds above 60 m/s, a 0.10 mm blade thickness variation creates destructive centrifugal imbalance. Every blade is surface-ground to ±0.05 mm parallelism and verified before dispatch, ensuring the drum stays within OEM balance specification after installation.",
      },
    ],
    dimensionLabels: {
      col0: "Chipper OEM / Model",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard OEM replacement dimensions. 2-hole, 3-hole, and 4-hole bolt patterns CNC-machined to exact blueprints. Counter-knives and throat wear plates available as matched sets. Custom lengths up to 800 mm.",
    },
    standardDimensions: [
      { spec: "Vermeer BC1800 / BC2100", od: "310", id: "100", thickness: "19" },
      { spec: "Morbark 40/36 Drum", od: "400", id: "100", thickness: "22" },
      { spec: "Morbark 50/48 Disc", od: "250", id: "120", thickness: "25" },
      { spec: "Peterson 5710 / 6710 Disc", od: "280", id: "130", thickness: "25" },
      { spec: "Doppstadt DH 910 Biomass", od: "350", id: "100", thickness: "20" },
      { spec: "Jenz HEM 820", od: "380", id: "110", thickness: "22" },
      { spec: "CBI Magnum Force", od: "450", id: "120", thickness: "25" },
      { spec: "Heavy Whole-Tree / Custom", od: "600", id: "150", thickness: "30" },
    ],
    relatedBladeIds: [
      "wood-chipper-anvils",
      "wood-chipper-blades-standard",
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
    ],
    offers: { lowPrice: 45, highPrice: 380 },
    faqs: {
      technical: [
        {
          question: "When should I upgrade from standard high-carbon steel to D2 or M2 HSS chipper blades?",
          answer:
            "Upgrade to D2 (SKD11) when your chipper processes dense hardwood (oak, hickory, eucalyptus) or dry recycled timber on continuous 8+ hour shifts. D2's chromium-carbide matrix provides 2–3× longer edge life versus standard carbon steel. Upgrade to M2 HSS only for clean softwood at high drum RPM (1,500–2,500) where maximum edge retention is the priority — M2 at HRC 62–64 is more susceptible to impact damage on contaminated feedstock.",
        },
        {
          question: "How does blade thickness tolerance affect chip quality and drum vibration?",
          answer:
            "A ±0.10 mm deviation across blade sets produces both oversized and undersized chips that fail biomass screening specs (EN 17225-4). The same deviation creates centrifugal force imbalance at 1,500–2,500 RPM that accelerates bearing failure. Our ±0.05 mm tolerance eliminates both issues.",
        },
        {
          question: "How many times can industrial D2 chipper blades be resharpened?",
          answer:
            "Our through-hardened D2 blades can be reground 8–12 times before reaching minimum safe thickness (typically 60–70% of original). Regrind on a wet surface grinder using an aluminum oxide wheel (46–60 grit) at 0.02–0.05 mm depth per pass. Never dry-grind — localised overheating above 200°C draws the temper and softens the edge.",
        },
        {
          question: "Should I replace the counter-knife when I install new chipper blades?",
          answer:
            "The counter-knife should be inspected every time chipper blades are changed. A worn counter-knife reduces service life by 30–50% and degrades chip quality. Replace when visible edge rounding exceeds 1.0 mm or chipping exceeds 0.5 mm depth. We manufacture matched counter-knives in D2 and manganese steel as integrated sets.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades.",
        },
        {
          question: "Can you supply blades for my specific chipper model?",
          answer:
            "Yes. Send us your existing blade sample, a technical drawing, or your chipper make and model number. We maintain an extensive database of OEM blueprints for Vermeer, Morbark, Doppstadt, Jenz, Peterson, CBI, and Bruks platforms. Custom dimensions within 10–15 working days.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Wood Chipper Blades — Standard Reversible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-blades-standard",
    name: "Wood Chipper Knives",
    fullName:
      "Reversible Double-Edge Wood Chipper Knives | T10 · 9CrSi · Cr12MoV | Landscaping & Forestry",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Wood Chipper Blades",
    image: "/images/products/wood-chipper-blades/wood-chipper-blades-standard-00.webp",
    badge: "Best Seller",
    badgeColor: "green",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-blades-standard-00.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-standard-01.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-standard-02.webp",
    ],
    description:
      "Reversible double-edge wood chipper knives in T10, 9CrSi & Cr12MoV. HRC 55–60, precision-ground 25°–30° bevel. Flip when dull — doubles installed life before regrinding. 200–350 mm lengths, 2/4/6-hole bolt patterns. OEM fit for Bandit, Vermeer, Patriot, Wallenstein & Timberwolf. Optional Teflon anti-sap coating.",
    fullDescription:
      "Wood chipper knives are the highest-volume consumable in the landscaping, tree service, and municipal green waste industries. Sureay standard chipper knives are manufactured from heat-treated high-carbon and chrome-alloy tool steels — proven grades that deliver the right balance of edge sharpness, impact toughness, and resharpening economy for everyday chipping operations.\n\n## Reversible Double-Edge Design\n\nEvery blade features a symmetrical double-edge geometry. When the working edge dulls, simply unbolt, flip 180°, retorque — and you have a factory-sharp second edge ready to cut. This halves blade-change downtime and doubles installed service life before any regrinding is needed.\n\n## Material Grades\n\n**T10 High-Carbon Steel (HRC 55–58):** The cost-effective standard for landscaping and tree service operations cutting softwood, green timber, and mixed yard waste.\n\n**9CrSi Chrome-Silicon Alloy (HRC 57–60):** Delivers 40–60% longer sharp-edge intervals over T10 for mixed hardwood/softwood species — maple, birch, ash.\n\n**Cr12MoV Tool Steel (HRC 58–60):** Premium spec for operators processing dry hardwood or lightly contaminated urban green waste.\n\n## Precision Grinding\n\nBlades are surface-ground to ±0.05 mm thickness tolerance and ±0.5° bevel angle (optical comparator verified). Uniform blade thickness across the full drum width eliminates vibration and produces consistent chip geometry meeting biomass and mulch size specifications.\n\n## Anti-Sap Coating\n\nOptional Teflon (PTFE) coating on the rake face reduces sap adhesion by ~70%, extending clean-running intervals on pine, spruce, and eucalyptus chipping. The coating survives 4–6 regrind cycles before recoating is beneficial.\n\n## Resharpening Economy\n\nThrough-hardened from surface to core, every regrind cycle exposes steel of identical hardness. Each blade yields 6–10 total cutting edges (2 factory edges × 3–5 grinds per edge) before reaching minimum safe thickness — making total cost-per-hour highly competitive against imported alternatives.",
    link: "/products/wood-chipper-blades-standard",
    isFeatured: true,
    compatibleMachines: [
      "Bandit",
      "Vermeer",
      "Patriot",
      "Wallenstein",
      "Timberwolf",
      "Linddana",
      "Schliesing",
      "Junkkari",
    ],
    specs: [
      { label: "Material", value: "T10 High-Carbon | 9CrSi Chrome-Alloy | Cr12MoV Tool Steel" },
      { label: "Hardness", value: "HRC 55–60 (Triple-Tempered, Through-Hardened)" },
      { label: "Edge Design", value: "Reversible Double-Edge — flip when dull, 2× installed life" },
      { label: "Bevel Angle", value: "25°–30° precision-ground (±0.5°)" },
      { label: "Lengths", value: "200–350 mm (8\u2033–14\u2033)" },
      { label: "Bolt Patterns", value: "2-hole · 4-hole · 6-hole (custom available)" },
      { label: "Coating", value: "Black Oxide (std) · Teflon PTFE anti-sap (opt)" },
      { label: "Application", value: "Tree Service · Landscaping · Green Waste · Storm Debris" },
    ],
    components: [
      {
        id: "reversible-double-edge",
        tag: "ECONOMY",
        title: "Flip, Don't Replace — Double the Installed Life",
        description:
          "Symmetrical double-edge geometry gives two independent cutting edges per blade. When edge 1 dulls, unbolt, flip 180°, retorque — factory-sharp and back chipping in under two minutes. Halves blade-change downtime and doubles service life before regrinding.",
      },
      {
        id: "triple-temper",
        tag: "HEAT TREATMENT",
        title: "Triple-Tempered Through-Hardened Core",
        description:
          "Controlled triple-tempering eliminates residual stress and stabilises the martensitic microstructure at HRC 55–60 from surface to core. Every regrind cycle exposes steel of identical quality — no soft spots, no inconsistent edge life across the blade set.",
      },
      {
        id: "anti-sap-coating",
        tag: "SURFACE TREATMENT",
        title: "Teflon Anti-Sap Coating",
        description:
          "Pine, spruce, and eucalyptus resin adheres to blade faces and accelerates edge wear. Optional Teflon (PTFE) rake-face coating cuts sap adhesion by ~70%, extending clean-running intervals and reducing the frequency of mid-shift blade pulls.",
      },
    ],
    dimensionLabels: {
      col0: "Chipper OEM / Size Class",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Reversible double-edge dimensions. 2-hole, 4-hole and 6-hole bolt patterns available. Custom lengths and hole patterns within 7 working days.",
    },
    standardDimensions: [
      { spec: 'Compact / 8" Class', od: "200", id: "50", thickness: "12" },
      { spec: 'Bandit 12" / Patriot', od: "230", id: "60", thickness: "12" },
      { spec: 'Vermeer BC1200 / 10"', od: "260", id: "65", thickness: "16" },
      { spec: 'Bandit 15" / Vermeer BC1500', od: "295", id: "75", thickness: "16" },
      { spec: 'Bandit 18" / 19"', od: "295", id: "80", thickness: "19" },
      { spec: 'Vermeer BC1800 / 12"', od: "310", id: "100", thickness: "19" },
      { spec: 'Timberwolf / 13"', od: "330", id: "100", thickness: "19" },
      { spec: 'Heavy Landscape / 14"', od: "350", id: "100", thickness: "22" },
    ],
    relatedBladeIds: [
      "wood-chipper-anvils",
      "wood-chipper-blades-industrial",
      "single-shaft-rotor-inserts",
      "granulator-blades",
    ],
    offers: { lowPrice: 15, highPrice: 120 },
    faqs: {
      technical: [
        {
          question: "How do I choose between T10, 9CrSi, and Cr12MoV?",
          answer:
            "T10 suits green softwood and general landscaping. Upgrade to 9CrSi for mixed hardwood/softwood — maple, birch, ash — where it delivers 40–60% longer edge life. Specify Cr12MoV for high-volume dry hardwood or lightly contaminated urban green waste.",
        },
        {
          question: "When should I flip the blade, and how many times can I regrind?",
          answer:
            "Flip when chipping efficiency drops — ragged chip faces, increased motor load, or visible edge rounding over 0.5 mm. After both edges are consumed, each edge can be reground 3–5 times on a standard surface grinder, yielding 6–10 total cutting edges per blade.",
        },
        {
          question: "Will the Teflon coating survive regrinding?",
          answer:
            "Yes — only the bevel face is ground during resharpening; the rake-face Teflon coating remains intact. It typically persists through 4–6 regrind cycles before recoating is beneficial.",
        },
        {
          question: "What bolt-hole pattern do I need for my chipper model?",
          answer:
            "Bandit 12\u2033/15\u2033: 2-hole. Bandit 18\u2033/19\u2033: 4-hole. Vermeer BC900/BC1200: 2-hole. BC1500/BC1800: 4-hole. Provide your model number or send your worn blade and we confirm the exact configuration. Custom patterns within 7 working days.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "Direct OEM manufacturer since 2008. When you buy from Sureay you communicate with the engineers who forge and grind your blades — no middleman, no markup.",
        },
        {
          question: "Do you offer bulk pricing for landscape contractors?",
          answer:
            "Yes. Orders of 50+ blades per shipment qualify for volume pricing. Annual supply agreements with scheduled quarterly deliveries are available — contact us with your annual consumption estimate.",
        },
      ],
    },
  },

  // Wood Chipper Anvils (Counter-Knives / Bed Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-anvils",
    name: "Wood Chipper Anvils",
    fullName:
      "Heavy-Duty Counter-Knives & Bed Knife Anvils for Drum & Disc Wood Chippers",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Counter-Knives & Anvils",
    image: "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
    badge: "Matched Sets",
    badgeColor: "blue",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
      "/images/products/wood-chipper-blades/wood-chipper-anvil-01.webp",
      "/images/products/wood-chipper-blades/wood-chipper-anvil-02.webp",
    ],

    description:
      "Precision-ground wood chipper anvils (counter-knives / bed knives) in D2, Cr12MoV, and A8 Modified tool steel. Through-hardened HRC 55–60 for maximum resharpening life. Sets the blade-to-anvil clearance gap that controls chip thickness and chipper efficiency. Surface-ground to ±0.05 mm full-length parallelism. OEM-compatible replacements for Bandit, Vermeer, Morbark, Timberwolf, Schliesing, Greenmech, Jensen & Jenz chippers.",

    fullDescription:
      "The anvil — also called the counter-knife, bed knife, or stationary blade — is the fixed cutting edge inside a wood chipper that the rotating drum or disc blade cuts against. Together, the chipper blade and anvil form a scissor-like shearing pair: the blade slices chips from the timber, and the anvil sets the clearance gap that determines minimum chip thickness, cutting efficiency, and motor load.\n\nA worn or misaligned anvil is the single most overlooked cause of poor chipper performance. When the anvil edge rounds off, the blade-to-anvil clearance gap widens progressively. Instead of a clean shearing action, the timber is torn and crushed rather than cut — spiking fuel consumption by 15–25%, producing ragged chips that fail screening specs, and accelerating wear on the chipper blades themselves. Replacing chipper blades without inspecting the anvil is throwing away money: new blades working against a dull anvil deliver only 50–70% of their potential service life.\n\n## Why the Anvil Matters as Much as the Blade\n\n**Clearance Gap Control:** The blade-to-anvil clearance gap — typically set at 0.5–1.5 mm for drum chippers and 0.8–2.0 mm for disc chippers — directly controls minimum chip thickness. A worn anvil increases this gap beyond specification, producing oversized chips and long fibrous slivers that fail biomass fuel screening standards (EN 17225-4). Our anvils are precision surface-ground to ±0.05 mm full-length parallelism, ensuring a uniform shear gap across the entire cutting width.\n\n**Impact Absorption:** Unlike the chipper blade (which rotates at high speed), the anvil absorbs the full reaction force of every cut as a static impact load. Over millions of chipping cycles, this sustained impact loading causes edge deformation, micro-cracking, and eventual bulk fracture in poorly heat-treated anvils. Sureay anvils are through-hardened to HRC 55–60 via vacuum heat treatment — hard enough to hold a sharp edge against abrasive timber, yet tough enough to absorb repeated impact without brittle fracture.\n\n**Different Wear Rate, Different Replacement Cycle:** The anvil typically outlasts chipper blades by a factor of 2–4× because it operates under compressive (static) loading rather than the dynamic shear loading on the blade. However, because anvil wear is gradual, operators often miss the progressive deterioration until chip quality has degraded significantly. We recommend inspecting the anvil edge every time chipper blades are changed or sharpened.\n\n## Material Selection\n\n**D2 / Cr12MoV Tool Steel (HRC 58–60):** The premium specification for high-volume commercial wood processing and biomass operations. The 12% chromium-carbide matrix provides outstanding abrasion resistance against dense hardwoods and bark-heavy feedstock. Recommended for industrial drum chippers (Morbark, Vermeer HG series, Doppstadt) running continuous 8–16 hour shifts.\n\n**A8 Modified Tool Steel (HRC 54–58):** The industry-standard OEM grade used by Bandit, Morbark, and Vermeer for factory-original anvils. A8 Modified provides an excellent balance of wear resistance and impact toughness — critical for anvils that must absorb millions of impact cycles without micro-cracking. The correct choice for general forestry and tree service operations processing mixed species with moderate contamination.\n\n**42CrMo / Manganese Steel (HRC 50–55):** A cost-effective, high-toughness option for operators processing heavily contaminated demolition wood, railroad ties, and urban green waste where the feedstock contains significant metal debris. The lower hardness prioritises impact absorption over wear resistance, preventing the catastrophic anvil fracture that can damage the drum housing.\n\n## Adjustable Mounting & Clearance Setting\n\nMost chipper OEMs provide a mechanical adjustment system — typically shim plates or adjustable mounting bolts — to advance the anvil toward the blade as both components wear, maintaining the designed clearance gap. Sureay anvils are CNC-machined with slotted or oversized mounting holes that match your OEM's adjustment mechanism precisely, ensuring maintenance teams can set the gap accurately and lock it down securely.\n\n## Matched Blade + Anvil Sets\n\nFor operators changing both blades and anvil simultaneously, we offer matched sets: chipper blades and counter-knife manufactured from the same steel batch, heat-treated in the same vacuum furnace cycle, and surface-ground to the same parallelism tolerance. A matched set eliminates the hardness mismatch between blade and anvil that causes accelerated wear when sourcing components from different suppliers.",

    link: "/products/wood-chipper-anvils",
    isFeatured: true,

    compatibleMachines: [
      "Bandit",
      "Vermeer",
      "Morbark",
      "Timberwolf",
      "Schliesing",
      "Greenmech",
      "Jensen",
      "Jenz",
      "Eschlböck",
      "Forst",
    ],

    specs: [
      {
        label: "Material",
        value: "D2 (Cr12MoV) | A8 Modified | 42CrMo Manganese Steel",
      },
      {
        label: "Hardness",
        value: "HRC 54–60 (Through-Hardened, Surface = Core)",
      },
      {
        label: "Parallelism",
        value: "±0.05 mm full-length (uniform shear gap)",
      },
      {
        label: "Edge Geometry",
        value: "Single-bevel 30°–37° (matched to chipper blade angle)",
      },
      {
        label: "Mounting",
        value: "Slotted holes / shim-adjustable (OEM clearance adjustment)",
      },
      {
        label: "Resharpening",
        value: "Through-hardened — 5–10 regrind cycles per anvil",
      },
      {
        label: "Application",
        value:
          "Drum Chippers, Disc Chippers, Biomass Chippers, Landscape Chippers",
      },
    ],

    components: [
      {
        id: "clearance-gap-control",
        tag: "CUTTING EFFICIENCY",
        title: "Precision Clearance Gap Control",
        description:
          "The blade-to-anvil gap determines chip thickness, cutting force, and fuel consumption. A rounded anvil edge widens this gap beyond specification, turning clean shearing into inefficient crushing. Our anvils are surface-ground to ±0.05 mm parallelism to maintain the designed clearance across the full cutting width — restoring the self-feeding bite and reducing motor load by up to 20%.",
      },
      {
        id: "impact-toughness",
        tag: "DURABILITY",
        title: "Static Impact Resistance",
        description:
          "The anvil absorbs the full reaction force of every cut as a static impact load — millions of hits per shift. Through-hardened D2 and A8 Modified steel at HRC 54–60 provides the correct balance: hard enough to hold a sharp edge against abrasive timber, tough enough to absorb repeated impacts without micro-cracking or catastrophic fracture.",
      },
      {
        id: "matched-sets",
        tag: "SYSTEM INTEGRATION",
        title: "Matched Blade + Anvil Sets",
        description:
          "Chipper blades and counter-knives from different suppliers often have mismatched hardness — a harder anvil wears the blade prematurely, or a softer anvil degrades faster than expected. Our matched sets are manufactured from the same steel batch and heat-treated in the same cycle, ensuring balanced wear rates and maximum combined service life.",
      },
    ],

    dimensionLabels: {
      col0: "Chipper OEM / Model",
      col1: "Length (mm)",
      col2: "Width (mm)",
      col3: "Thickness (mm)",
      caption:
        "* Standard OEM replacement anvil dimensions. Slotted mounting holes CNC-machined to exact OEM clearance adjustment patterns. Matched blade + anvil sets available for all sizes. Custom lengths up to 600 mm.",
    },

    standardDimensions: [
      { spec: "Bandit 12\" / 15\" / Mighty Bandit", od: "185", id: "75", thickness: "10" },
      { spec: "Bandit 18\" / 19\" / 1290 / 1590",   od: "265", id: "95", thickness: "12" },
      { spec: "Vermeer BC1200 / BC1500",              od: "200", id: "80", thickness: "12" },
      { spec: "Vermeer BC1800 / BC2000",              od: "260", id: "100", thickness: "16" },
      { spec: "Morbark 2 / 5 / 7 / 12 / 13",         od: "265", id: "95", thickness: "12" },
      { spec: "Morbark 40/36 / 50/48",                od: "400", id: "100", thickness: "20" },
      { spec: "Timberwolf 150 / 190 / 230",           od: "230", id: "80", thickness: "16" },
      { spec: "Schliesing 400 / 500 / 550 / 600 / 660", od: "260", id: "80", thickness: "20" },
      { spec: "Greenmech / Jensen / Forst",           od: "Per OEM Drawing", id: "Per OEM Drawing", thickness: "Per OEM Drawing" },
    ],

    relatedBladeIds: [
      "wood-chipper-blades",
      "wood-chipper-blades-industrial",
      "wood-chipper-blades-standard",
    ],

    offers: { lowPrice: 25, highPrice: 250 },

    faqs: {
      technical: [
        {
          question:
            "How often should I replace or resharpen the anvil compared to the chipper blades?",
          answer:
            "The anvil typically outlasts chipper blades by 2–4× because it operates under static compressive loading rather than the dynamic shear loading on the blade. However, we recommend inspecting the anvil edge every time chipper blades are changed or flipped. When the anvil edge shows visible rounding exceeding 1.0 mm (check with a straightedge under bright light), regrind or replace it. Installing new chipper blades against a worn anvil delivers only 50–70% of their potential edge life and produces poor chip quality regardless of blade sharpness.",
        },
        {
          question:
            "What clearance gap should I set between the chipper blade and the anvil?",
          answer:
            "Clearance varies by chipper type and timber species. For drum chippers processing green softwood: 0.5–1.0 mm. For drum chippers on dry hardwood: 0.8–1.5 mm. For disc chippers: 1.0–2.0 mm. Always refer to your chipper OEM manual for the exact specification. The gap should be measured at multiple points across the full anvil width using a feeler gauge. If the gap varies by more than 0.3 mm from end to end, the anvil face parallelism has degraded and the anvil needs regrinding or replacement.",
        },
        {
          question:
            "Should I use the same steel grade for the anvil as the chipper blade?",
          answer:
            "Not necessarily — the anvil and blade have different wear modes and therefore different optimal metallurgy. The blade experiences dynamic shear loading at high speed and benefits from maximum edge hardness (HRC 58–62). The anvil experiences static compressive impact and benefits from a slightly lower hardness (HRC 54–58) that provides greater impact absorption. A8 Modified at HRC 54–58 is the industry-standard anvil grade for this reason. However, for high-volume biomass operations on clean hardwood, upgrading both blade and anvil to D2 at HRC 58–60 is recommended.",
        },
        {
          question:
            "What causes a chipper to stop self-feeding even with sharp blades?",
          answer:
            "If the chipper stops pulling timber into the cutting chamber despite having freshly sharpened or new blades, the anvil is almost certainly worn. A rounded anvil edge increases the effective clearance gap, which means the blade can no longer bite into the timber with sufficient depth to generate the pulling force. The timber bounces on the blade surface instead of being grabbed and drawn in. Inspect and regrind or replace the anvil, then reset the clearance gap to OEM specification.",
        },
        {
          question:
            "Can I sharpen the anvil with the same tools I use for chipper blades?",
          answer:
            "Yes — the same wet surface grinder and aluminum oxide wheel (46–60 grit) used for chipper blades works for anvils. The same rules apply: light passes (0.02–0.05 mm per pass), never dry-grind without quenching, and verify the bevel angle with a protractor after grinding. The anvil bevel angle should match the chipper OEM specification (typically 30°–37°). Some operators neglect the anvil during regrinding because it appears less worn than the blade — this is a false economy that shortens blade life and degrades chip quality.",
        },
        {
          question:
            "Why does my chipper produce long, stringy fibres instead of clean chips?",
          answer:
            "Long fibrous slivers — sometimes called 'spaghetti' or 'stringers' — indicate the blade-to-anvil clearance gap is too wide. The timber is being torn and pulled apart rather than sheared cleanly. This happens when the anvil edge has rounded off or when the anvil has been improperly shimmed after blade replacement. Reset the clearance to OEM specification using a feeler gauge. If the anvil edge cannot be resharpened to a clean, straight edge (due to deep chips or cracks), replace the anvil.",
        },
      ],
      company: [
        {
          question: "Are you a trading company or a direct manufacturer?",
          answer:
            "We are a 100% direct OEM manufacturer established in 2008. When you buy from Sureay, you bypass middleman markups and communicate directly with the engineers who forge and grind your blades and anvils.",
        },
        {
          question:
            "Can you supply matched blade + anvil sets for my specific chipper model?",
          answer:
            "Yes. We strongly recommend purchasing blades and anvils as matched sets — manufactured from the same steel batch and heat-treated in the same vacuum furnace cycle. This ensures balanced hardness and wear rates across both components. Provide your chipper make and model number, and we will supply a complete matched set with pre-verified clearance recommendations. Matched sets are available for Bandit, Vermeer, Morbark, Timberwolf, Schliesing, Greenmech, Jensen, Jenz, Eschlböck, and Forst platforms.",
        },
        {
          question:
            "Can you manufacture an anvil for my chipper if it is not listed in your standard dimensions?",
          answer:
            "Yes. Send us your existing anvil, a technical drawing, or your chipper make and model number. We reverse-engineer replacement anvils from OEM drawings or physical samples, verifying fit on a CMM before production. Custom lengths up to 600 mm are manufactured within 10–15 working days.",
        },
        {
          question: "Do you ship globally and how long does it take?",
          answer:
            "Yes, we export to over 50 countries. Standard OEM replacement anvils in stock sizes typically ship within 48–72 hours. Custom dimensions take 10–15 working days. We partner directly with DHL, FedEx, and international sea freight forwarders for reliable door-to-door delivery.",
        },
        {
          question:
            "What quality documentation ships with each anvil?",
          answer:
            "Every shipment includes a Rockwell HRC hardness test report, a dimensional inspection record (length, width, thickness parallelism, mounting hole positions), and a heat treatment batch certificate. For matched blade + anvil sets, a combined inspection report documents the hardness of both components to verify the designed hardness differential.",
        },
      ],
    },
  },
];

// ───────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get a blade by ID
 */
export function getBladeById(id: string): Blade | undefined {
  return blades.find(b => b.id === id);
}

function normalizeBladeOfferId(value: string): string {
  return value
    .replace(/^https?:\/\/[^/]+\/products\//, "")
    .replace(/^\/products\//, "")
    .replace(/\/$/, "");
}

export function getBladeAggregateOffer(target: string): BladeAggregateOffer {
  const blade = getBladeById(normalizeBladeOfferId(target));
  const offer = blade?.offers ?? { lowPrice: 20, highPrice: 800 };

  return {
    "@type": "AggregateOffer",
    lowPrice: offer.lowPrice,
    highPrice: offer.highPrice,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    offerCount: "1",
  };
}

/**
 * Get featured blades
 */
export function getFeaturedBlades(): Blade[] {
  return blades.filter(b => b.isFeatured);
}

/**
 * Get related blades (by relatedBladeIds, then same category fallback)
 */
export function getRelatedBlades(currentId: string, limit = 4): Blade[] {
  const current = getBladeById(currentId);
  if (!current) return [];

  if (current.relatedBladeIds && current.relatedBladeIds.length > 0) {
    return current.relatedBladeIds
      .map(id => getBladeById(id))
      .filter((b): b is Blade => !!b)
      .slice(0, limit);
  }

  return blades
    .filter(b => b.category === current.category && b.id !== currentId)
    .slice(0, limit);
}

/**
 * Badge styling helper (mirrors machines.ts pattern)
 */
/**
 * Catalog PDF URL — single complete catalog for all products
 */
const CATALOG_URL = "/catalogs/sureay-complete-product-catalog.pdf";

export function getCatalogUrl(_blade: Blade): string {
  return CATALOG_URL;
}

/**
 * Badge styling helper (mirrors machines.ts pattern)
 */
export const getBadgeClasses = (color?: string): string => {
  const base =
    "absolute top-4 left-4 z-10 px-2 py-1 text-[10px] font-bold  tracking-wider rounded border";
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
