/**
 * Blade Data Structure - Source of Truth for BladeListPage and BladeDetail
 */

import { COMPLETE_CATALOG_URL } from "../lib/catalogPdf";

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
  relatedBladeIds?: string[];
}

export const ITEM_NO_COLUMN = "Item No.";

/** One row in the Common Standard Dimensions table (ComprehensiveData) */
export interface StandardDimension {
  itemNo?: string; // Stable Sureay catalog identifier
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
  | "shear_blades" // Metal shearing and coil-line knives
  | "paper_cutting" // Paper sheeters and print-finishing knives
  | "cold_saw_blades" // Retired; retained for existing locale data types
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
interface BladeImageDimensions {
  width: number;
  height: number;
  smallerWidths: number[]; // Each has a matching -{width}w.webp asset.
}

export interface Blade {
  // ── List page (always present) ───────────────────────────────────────────
  id: string;
  name: string;
  fullName: string;
  seoTitle?: string; // English search title; product metadata stays in this catalog.
  seoDescription?: string; // Search snippet when it differs from the catalog-card copy.
  legacyLocaleSeoTitle?: string; // Existing fallback title for languages without an SEO entry.
  category: BladeCategoryType;
  sector: BladeSectorType;
  categoryDisplay: string;
  image: string;
  imagePending?: boolean; // Approved empty photo slot; excluded from product image schema
  imageDimensions?: BladeImageDimensions;
  description: string;
  link: string;
  specs: BladeSpec[]; // Key specs: ProductCard + DecisiveSpecs table

  draft?: true;

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
  specificationImageDimensions?: BladeImageDimensions;
  gallery?: string[]; // [0–3] thumbnail track · [4] DecisiveSpecs · [5] ComprehensiveData
  galleryAlts?: string[]; // per-image alt text, parallel to `gallery`; falls back to fullName/name when absent
  fullDescription?: string; // PageMeta description (longer copy)
  /** One-line disambiguation note shown between category label and
   *  description on product pages that share a keyword root with a sibling
   *  product (e.g. paper vs film slitter knives). Supports one [text](/url)
   *  markdown link. */
  disambiguation?: string;
  /** Overrides the accessible name of the stretched-link card on category
   *  hub pages (ProductVariantCard). Falls back to `name`. Use when the
   *  generic name is ambiguous with a sibling product's card on the same
   *  category page. */
  categoryCardAnchorText?: string;
  components?: BladeComponent[]; // TechnicalAudit cards
  componentsIntro?: string; // optional lede paragraph above the TechnicalAudit card grid
  standardDimensions?: StandardDimension[]; // ComprehensiveData table
  detailLayout?: {
    seoTitle?: string;
    heroAlt?: string;
    additionalHeroImages?: {
      src: string;
      alt: string;
      dimensions: BladeImageDimensions;
    }[];
    specificationImage?: { src: string; alt: string };
    dimensionsHeading?: string;
    heroTitle?: string;
    sizeRange: string;
    heroSpecs?: (BladeSpec & { emphasis?: string })[];
    technicalSpecs?: BladeSpec[];
    inlineRfq?: {
      title: string;
      description: string;
      buttonLabel: string;
    };
    dimensionTables: {
      id: string;
      tabLabel: string;
      title: string;
      columns: string[];
      rows: string[][];
    }[];
  };
  steelGrades?: {
    // Steel grade comparison table, rendered between DecisiveSpecs and ComprehensiveData
    intro: string;
    rows: {
      grade: string;
      hardness: string;
      bestFor: string;
      tradeoff: string;
    }[];
    outro?: string;
  };
  /** Engineering drawing gallery (ProductDrawings), rendered after the
   *  TechnicalAudit cards. Line drawings are shown as a reverse-engineering
   *  capability proof — outline geometry and edge profile only. Never publish
   *  drawings carrying a customer/OEM title block, part number or tolerance
   *  table; those stay confidential per the IP promise on the RFQ forms. */
  drawings?: {
    intro?: string;
    items: {
      image: string;
      /** Short geometry label, e.g. "Straight body, twin slot — 45 × 25 mm". */
      caption: string;
    }[];
  };

  // ── Detail page table label overrides (for non-circular blades) ──────────
  dimensionLabels?: {
    col0?: string; // optional first "Specification" column
    col1?: string; // replaces "Outer Diameter (OD)"
    col2?: string; // replaces "Inner Diameter (ID)"
    col3?: string; // replaces "Thickness"
    col4?: string; // replaces "Teeth" (length/teeth mode only)
    caption?: string; // replaces default table footnote
    intro?: string; // Visible note above the detail dimensions table
  };

  // ── Meta / utility ────────────────────────────────────────────────────────
  relatedBladeIds?: string[];
  isFeatured?: boolean;
  catalogUrl?: string;
  compatibleMachines?: string[]; // OEM brand compatibility e.g. ["BHS", "Tidland", "EREMA"]
  compatibleMachinesIntro?: string;

  /** Optional prose paragraph rendered between the hero and the Decisive
   *  Specifications table. Use for buyer-facing context that belongs above the
   *  spec tables rather than further down in the technical audit. */
  introNote?: string;

  /** Product-specific example text for the RFQ message field. Overrides the
   *  brand-neutral global placeholder so the example names a machine this
   *  product actually fits. */
  rfqPlaceholder?: string;
  /** Quote-to-drawing products list the information needed to check fit. */
  quoteRequirements?: string;

  // ── Indicative price range — internal reference, NOT published ───────
  // No product page shows a price, and marking up a price that is not visible
  // violates Google's structured-data policy while buying nothing: only pages
  // where a shopper can purchase are eligible for merchant listings. To
  // publish a range, set showPrice in <SEO> on a page that states it on-page
  // (see /custom).
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

export interface BladeOffer {
  "@type": "Offer";
  availability: "https://schema.org/InStock";
  url: string;
}

// ===== BLADE DATA =====
const nonwovenTopKnifeOdMm = [60, 250];
const nonwovenBottomRingOdMm = [80, 300];
const nonwovenOdMm = [...nonwovenTopKnifeOdMm, ...nonwovenBottomRingOdMm];
const nonwovenSlitterImage =
  "/images/products/rotary-slitter-knives/nonwoven-slitter-knives-00-white.webp";

const slitterRfq = {
  title: "Need a size that is not listed?",
  description:
    "Send a drawing, a worn sample, or just your machine model. We reply with a quotation within 24 hours.",
  buttonLabel: "Request a Quote",
};
const nonwovenCrushModel = [
  "SR001111",
  "76.2 × 19.05 × 4.76 mm",
  "Score / Crush Cutter",
  "52100 / M2 HSS",
  "R0.05–R0.1 mm Tip Radius",
];
const sharedSlitterModels = {
  SR001452: ["SR001452", "80 × 60 × 10 mm", "Grooved bottom ring"],
  SR001453: ["SR001453", "105 × 90 × 15 mm", "Grooved bottom ring"],
  SR001211: [
    "SR001211",
    "105 × 80 × 15 mm",
    "Flange",
    "DIENES dimensional series",
  ],
  SR001212: [
    "SR001212",
    "130 × 90 × 20 mm",
    "Flange",
    "DIENES dimensional series",
  ],
  SR001213: [
    "SR001213",
    "190 × 138 × 15 mm",
    "Double edge",
    "Tidland TID131393",
  ],
  SR001214: [
    "SR001214",
    "130 × 100 × 30 mm",
    "Double edge",
    "Tidland TID133503",
  ],
  SR001215: [
    "SR001215",
    "250 × 188 × 15 mm",
    "Double edge",
    "Tidland TID131395",
  ],
  SR001561: [
    "SR001561",
    "90.81 × 60.00 × 12.70 mm",
    "Carbide-tipped",
    "Dusenbery 783533",
  ],
};

type BladeDimensionTable = NonNullable<
  Blade["detailLayout"]
>["dimensionTables"][number];

const corrugatedThinBladeTable: BladeDimensionTable = {
  id: "thin",
  tabLabel: "Carbide Thin Blades",
  title: "Carbide Thin Blades",
  columns: [
    ITEM_NO_COLUMN,
    "Dimensions (OD × ID × W)",
    "Equipment reference",
    "Mounting pattern",
  ],
  rows: [
    ["SR001401", "240 × 32 × 1.2 mm", "BHS", "2 × Ø8.5 mm"],
    ["SR001402", "240 × 32 × 1.3 mm", "BHS", "2 × Ø8.5 mm"],
    ["SR001403", "230 × 110 × 1.1 mm", "Fosber", "6 × Ø9 mm pattern"],
    ["SR001404", "230 × 135 × 1.1 mm", "Fosber", "4-slot pattern"],
    ["SR001405", "257 × 135 × 1.1 mm", "Fosber", "Match drawing"],
    ["SR001406", "291 × 203 × 1.1 mm", "Fosber", "Match drawing"],
    ["SR001408", "220 × 115 × 1.0 mm", "Agnati", "Match drawing"],
    ["SR001409", "240 × 115 × 1.0 mm", "Agnati", "Match drawing"],
    ["SR001410", "280 × 160 × 1.1 mm", "Mitsubishi", "Match drawing"],
    ["SR001411", "260 × 140 × 1.1 mm", "Isowa", "Match drawing"],
    ["SR001412", "300 × 112 × 1.2 mm", "TCY", "Match drawing"],
    ["SR001413", "340 × 230.2 × 1.0 mm", "Göpfert", "Match drawing"],
  ],
};

const carbideCoilKnifeTable: BladeDimensionTable = {
  id: "carbide",
  tabLabel: "Carbide Knives",
  title: "Carbide Rotary Knives",
  columns: [ITEM_NO_COLUMN, "Dimensions (OD × ID × W)", "Construction"],
  rows: [
    ["SR001331", "150.1 × 95 × 6.35 mm", "Solid carbide"],
    ["SR001332", "181 × 125 × 9.5 mm", "Solid carbide"],
    ["SR001333", "204 × 125 × 10 mm", "Solid carbide"],
    ["SR001334", "250 × 125 × 10.1 mm", "Solid carbide"],
    ["SR001335", "300.15 × 160 × 28 mm", "Solid carbide"],
  ],
};

const foilStandardOdMm = 130;
const standardSquareImage = { width: 800, height: 800, smallerWidths: [320, 640] };

function listedOuterDiameterRange(table: BladeDimensionTable): string {
  const diameters = table.rows.map(([, size]) => Number(size.split(" × ")[0]));
  return `${Math.min(...diameters)}–${Math.max(...diameters)} mm`;
}

export const blades: Blade[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Slitter Knives & Circular Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement film and tape slitter knives made for your holders, with custom bores, cutting profiles and surface options. Send Sureay your drawing or sample for a quotation on individual knives or a top-and-bottom pair.",
    id: "rotary-slitter-knives",
    name: "Film & Tape Slitter Knives",
    fullName: "Film & Tape Slitter Knives for Flexible Packaging",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Film & Tape Slitter Knives",
    image: "/images/products/slitter-detail/rotary-slitter-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement slitter knives for BOPP, PET, CPP film and adhesive tape. Tool steel or carbide top and bottom knives, with custom bores and profiles to drawing.",
    link: "/products/rotary-slitter-knives",
    isFeatured: true,
    specs: [
      { label: "Sizes", value: "Circular OD 20–300 mm" },
      {
        label: "Material",
        value: "52100, D2, M2 HSS, ASP23 PM steel or solid tungsten carbide",
      },
      {
        label: "Applications",
        value: "BOPP, BOPET, CPP, stretch film and pressure-sensitive tape",
      },
      {
        label: "Optional Coatings",
        value:
          "TiN, DLC, PTFE (Teflon), CrAlN or ceramic, depending on blade substrate",
      },
      { label: "Mounting", value: "Rotary shear holders or crush-cut holders" },
      { label: "Thickness tolerance", value: "±0.002 mm" },
      { label: "Runout", value: "≤0.02 mm T.I.R." },
    ],
    detailLayout: {
      seoTitle: "Film & Tape Slitter Knives for Flexible Packaging",
      sizeRange: "Circular OD 20–300 mm",
      heroAlt: "Circular film and tape slitter knives and bottom rings",
      specificationImage: {
        src: "/images/products/slitter-detail/rotary-slitter-knives-detail.webp",
        alt: "Close-up of the ground bevel and face of a circular slitter knife",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "slitter-knives",
          tabLabel: "Slitter Knives",
          title: "Top & Bottom Slitter Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Knife Type"],
          rows: [
            ["SR001154", "60 × 40 × 1.0 mm", "Top knife"],
            ["SR001155", "62 × 35 × 0.5 mm", "Top knife"],
            ["SR001156", "75 × 45 × 1.2 mm", "Top knife"],
            ["SR001151", "90 × 60 × 1.0 mm", "Top knife"],
            ["SR001152", "105 × 70 × 1.2 mm", "Top knife"],
            ["SR001157", "130 × 80 × 1.2 mm", "Top knife"],
            ["SR001158", "150 × 75 × 2.0 mm", "Top knife"],
            ["SR001168", "70 × 28 × 12 mm", "Bottom knife"],
            ["SR001169", "70 × 45 × 3 mm", "Bottom knife"],
            ["SR001170", "70 × 45 × 20 mm", "Bottom knife"],
            ["SR001182", "80 × 55 × 5 mm", "Bottom knife"],
            ["SR001452", "80 × 60 × 10 mm", "Bottom knife"],
            ["SR001183", "105 × 60 × 15 mm", "Bottom knife"],
            ["SR001184", "108 × 80 × 8 mm", "Bottom knife"],
            ["SR001185", "150 × 120 × 15 mm", "Bottom knife"],
          ],
        },
        {
          id: "catalog-configurations",
          tabLabel: "Additional Top & Bottom Knives",
          title: "Additional Top & Bottom Knives",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Knife Type / Platform Reference",
          ],
          rows: [
            ["SR001801", "75 × 25.4 × 1.0 / 1.2 mm", "Top Blade — Tidland / Atlas"],
            ["SR001802", "70 × 25.4 × 8 / 10 mm", "Bottom Anvil — Tidland / Atlas"],
            ["SR001803", "100 × 32 × 1.2 / 1.5 mm", "Top Blade — Kampf / Dusenbery"],
            ["SR001804", "80 × 60 × 16 / 20 mm", "Bottom Anvil — Kampf / Dusenbery"],
            [
              "SR001805",
              "118 × 80 × 1.2 / 2.0 mm",
              "Top Blade — Goebel / BHS / Agnati",
            ],
            [
              "SR001806",
              "100 × 70 × 16 / 20 mm",
              "Bottom Anvil — Goebel / BHS / Agnati",
            ],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Circular OD 20–300 mm" },
        {
          label: "Material",
          value: "52100, D2, M2 HSS, ASP23 PM steel or solid tungsten carbide",
        },
        {
          label: "Applications",
          value: "BOPP, BOPET, CPP, stretch film and pressure-sensitive tape",
        },
        {
          label: "Optional Coatings",
          value:
            "TiN, DLC, PTFE (Teflon), CrAlN or ceramic, depending on blade substrate",
        },
        { label: "Mounting", value: "Rotary shear holders or crush-cut holders" },
        { label: "Thickness tolerance", value: "±0.002 mm" },
        { label: "Runout", value: "≤0.02 mm T.I.R." },
      ],
    },
    compatibleMachines: [
      "DIENES",
      "Tidland",
      "Kampf",
      "Atlas",
      "Goebel",
      "Windmöller & Hölscher",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Application-Matched Steel and Carbide Options",
        description:
          "From 52100 and D2 to M2 HSS, PM steel and solid carbide, Sureay offers material choices for routine film cutting and more demanding wear conditions.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Precision-Ground Edges and Optional Coatings",
        description:
          "Precision-ground cutting edges are available with TiN, DLC, PTFE (Teflon), CrAlN or ceramic coating options, selected for the blade substrate and the film or tape being cut.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Replacement Knives and Matched Pairs",
        description:
          "Order individual replacement knives or matched top-and-bottom pairs with bores, profiles and mounting details made to your existing slitting arrangement.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which replacement knife fits my film or tape slitter?",
          answer:
            "Identify the cutting method and knife position first. Rotary shear stations use cooperating top and bottom edges; crush-cut stations press a cutter against a supporting surface. The holder reference, bore, cutting profile and axial dimensions establish the replacement. Film slitter blades and tape slitter knives are common purchasing names, but the installed cutting arrangement determines the required part.",
        },
        {
          question:
            "When should wear resistance take priority in shear-slitting knife selection?",
          answer:
            "Greater wear resistance is worth considering when the working edge wears gradually under an otherwise suitable shear-slitting setup. Where chipping or contact damage dominates, the material decision also needs to account for toughness and knife support. Compare the used edge, processed web and existing knife pair before choosing the material for a replacement order.",
        },
        {
          question: "Why does adhesive build up on tape slitter knives?",
          answer:
            "Adhesive can transfer from the tape to the blade during contact. Blade profile, contact area and surface finish influence how readily residue accumulates. Check where it collects and compare the current bevel and working faces with the tape construction. A suitable profile, polished surface or optional coating can then be considered for that blade material and adhesive.",
        },
        {
          question:
            "What can cause edge damage in a shear-slitting knife pair?",
          answer:
            "Unintended contact between the top and bottom knife edges during engagement can damage a shear-slitting pair. Inspect both edges, the holder's engagement movement and the installed knife positions. Compare localized damage with gradual wear before changing material, so the replacement addresses the observed condition rather than repeating a contact or setup problem.",
        },
        {
          question:
            "How do blade thickness, bore and dish height affect replacement fit?",
          answer:
            "The bore locates the knife on its mount, blade thickness describes the material section, and dish height describes the overall axial profile of a dished knife. Together with the bottom-ring width and mounting details, these dimensions determine where the working edges meet. Record them separately when replacing a knife in an existing holder.",
        },
        {
          question: "Should I replace both the top and bottom slitter knives?",
          answer:
            "You can order a single replacement when the retained mating knife remains serviceable and its geometry is known. Inspect both cutting edges, mounting faces and working diameters. For a complete pair, identify the upper and lower positions separately so their dimensions and material choices can be considered together, including any previous regrinding.",
        },
        {
          question:
            "Can Sureay make custom film slitter knives from a drawing or sample?",
          answer:
            "Yes. Sureay can supply custom bores, blade sections, mounting features and cutting profiles. A drawing establishes the intended new dimensions; a worn sample helps identify the installed geometry and any material lost through use or sharpening. Include the mating knife or anvil details for a working pair and state the quantity required for each configuration.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "bottom-grooved-anvil-knives",
      "rotary-slitter-knives-paper",
      "nonwoven-slitter-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.1 Rotary Slitter Knives for Paper & Tissue Converting
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Source replacement paper slitter knives for your rewinder, with dished or flat top knives and matching bottom configurations. Share your drawing or sample and paper grade with Sureay for a quotation tailored to your cutting pair.",
    id: "rotary-slitter-knives-paper",
    seoDescription:
      "Paper slitter blades for tissue, kraft and coated paper. Pair dished or flat top knives with matching bottom knives in tool steel or carbide-tipped construction.",
    name: "Paper Slitter Knives",
    fullName: "Paper Slitter Knives for Tissue, Kraft & Coated Paper",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Paper Slitter Knives",
    image: "/images/products/slitter-detail/rotary-slitter-knives-paper.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement paper slitter knives for tissue, kraft and coated paper. Dished or flat top knives and bottom knives in steel or carbide, made to drawing.",
    link: "/products/rotary-slitter-knives-paper",
    specs: [
      { label: "Sizes", value: "Dished OD 62–203 mm · Bottom OD 70–300 mm" },
      {
        label: "Material",
        value: "52100, D2, M2, ASP23, CPM 10V or carbide-tipped construction",
      },
      { label: "Applications", value: "Tissue, kraft, coated and recycled paper" },
      {
        label: "Mounting",
        value:
          "Shaft-mounted top knife or matching flange and cutting face on the bottom knife",
      },
      {
        label: "Hardness",
        value: "58–64 HRC for steel knives; 90–92 HRA for carbide edges",
      },
      { label: "Surface finish", value: "Precision-ground faces, Ra 0.2–0.4 μm" },
      { label: "Thickness tolerance", value: "±0.002 mm" },
      { label: "Runout", value: "≤0.02 mm T.I.R." },
      {
        label: "Cutting Styles",
        value:
          "Shear slitting with matched top and bottom knives or crush cutting with anvil pairs",
      },
    ],
    detailLayout: {
      seoTitle: "Paper Slitter Knives for Tissue & Kraft",
      sizeRange: "Dished OD 62–203 mm · Bottom OD 70–300 mm",
      heroAlt:
        "Pair of circular paper slitter knives showing upper blade and bottom ring",
      specificationImage: {
        src: "/images/products/slitter-detail/rotary-slitter-knives-paper-detail.webp",
        alt: "Paper slitter knife showing the ground cutting face and center bore",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "top",
          tabLabel: "Top Knives",
          title: "Top Knives",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Profile or reference",
            "Dish height",
          ],
          rows: [
            ["SR001201", "90 × 60 × 1.2 mm", "Dished", "To drawing"],
            ["SR001202", "130 × 80 × 1.5 mm", "Dished", "To drawing"],
            [
              "SR001203",
              "150 × 80 × 2.5 mm",
              "Dished / Tidland Class II",
              "To drawing",
            ],
            ["SR001204", "180 × 90 × 3.5 mm", "Dished", "To drawing"],
            [
              "SR001205",
              "200 × 80 × 4.0 mm",
              "Dished / Tidland Class III",
              "9.25 mm",
            ],
            ["SR001206", "203 × 90 × 4.0 mm", "Bielomatik 701.115", "To drawing"],
          ],
        },
        {
          id: "bottom",
          tabLabel: "Bottom Knives",
          title: "Bottom Knives",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Mounting or edge",
            "Reference",
          ],
          rows: [
            ["SR001211", "105 × 80 × 15 mm", "Flange", "DIENES dimensional series"],
            ["SR001212", "130 × 90 × 20 mm", "Flange", "DIENES dimensional series"],
            ["SR001213", "190 × 138 × 15 mm", "Double edge", "Tidland TID131393"],
            ["SR001214", "130 × 100 × 30 mm", "Double edge", "Tidland TID133503"],
            ["SR001215", "250 × 188 × 15 mm", "Double edge", "Tidland TID131395"],
          ],
        },
        {
          id: "catalog-configurations",
          tabLabel: "Additional Paper Slitter Knives",
          title: "Additional Paper Slitter Knives",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Knife Type / Platform Reference",
          ],
          rows: [
            ["SR001807", "75 × 45 × 1.0 / 1.2 mm", "Top Blade (Shear)"],
            ["SR001808", "70 × 45 × 10 / 8 mm", "Bottom Anvil"],
            ["SR001809", "100 × 32 × 1.2 mm", "Top Blade (Shear)"],
            ["SR001810", "80 × 60 × 20 / 16 mm", "Bottom Anvil"],
            ["SR001811", "150 × 80 × 1.5 mm", "Top Blade (Tissue)"],
            ["SR001812", "108 × 80 × 20 / 18 mm", "Bottom Anvil"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Dished OD 62–203 mm · Bottom OD 70–300 mm" },
        {
          label: "Material",
          value: "52100, D2, M2, ASP23, CPM 10V or carbide-tipped construction",
        },
        { label: "Applications", value: "Tissue, kraft, coated and recycled paper" },
        {
          label: "Mounting",
          value:
            "Shaft-mounted top knife or matching flange and cutting face on the bottom knife",
        },
        {
          label: "Hardness",
          value: "58–64 HRC for steel knives; 90–92 HRA for carbide edges",
        },
        { label: "Surface finish", value: "Precision-ground faces, Ra 0.2–0.4 μm" },
        { label: "Thickness tolerance", value: "±0.002 mm" },
        { label: "Runout", value: "≤0.02 mm T.I.R." },
        {
          label: "Cutting Styles",
          value:
            "Shear slitting with matched top and bottom knives or crush cutting with anvil pairs",
        },
      ],
    },
    compatibleMachines: [
      "DIENES",
      "Valmet",
      "Voith",
      "Tidland",
      "Jagenberg",
      "Bielomatik",
      "E.C.H. Will",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Material Options for Paper Converting",
        description:
          "Tool-steel, HSS, PM-steel and carbide-edged options give paper converters material choices for tissue, kraft, coated and recycled grades.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Precision-Ground Thickness and Cutting Faces",
        description:
          "Paper slitter knives can be precision-ground to your specified thickness and working-face finish for the top or bottom position in the cutting pair.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Top and Bottom Knife Sets",
        description:
          "Custom bores, dished profiles, bottom-knife flanges and cutting faces support single-knife replacements and complete sets for existing paper rewinders.",
        relatedBladeIds: ["slitter-rewinder-bottom-knives"],
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "Can Sureay reproduce paper slitter knives for my existing rewinder?",
          answer:
            "Yes. A drawing or sample can establish the bore, profile and mounting arrangement for a replacement top or bottom knife. Include the paper grade and mating-knife dimensions. An original part reference helps distinguish the intended new dimensions from a worn sample. For flange, cup or replaceable-ring assemblies, see [Slitter Rewinder Bottom Knives](/products/slitter-rewinder-bottom-knives).",
        },
        {
          question:
            "When do coated or filled papers justify HSS or carbide slitter knives?",
          answer:
            "Consider a different working-edge material when the current knife shows gradual wear on the actual paper grade. Coating or filler content, the retained mating knife and observed chipping all affect that decision. Compare wear resistance with the edge's behaviour in the existing pair, keeping mounting stability and slitting setup part of the assessment.",
        },
        {
          question: "What causes paper dust or ragged edges during slitting?",
          answer:
            "Paper structure, mating-knife condition, holder stability and slitting setup can affect the edge even when the top knife is sharp. Inspect both working edges and compare the slit sample at normal production settings. Recording the paper grade and settings helps distinguish changes in the material or setup from wear in the knife pair.",
        },
        {
          question:
            "Must top and bottom paper slitter knives be replaced together?",
          answer:
            "They can be ordered separately when the retained component is in suitable condition and the working geometry is known. Check the bottom cutting face as well as the top edge. If either knife has been reground, confirm its remaining dimensions before selecting a single replacement or ordering a complete matched pair.",
        },
        {
          question:
            "Are dished knives, top knives and male knives the same part?",
          answer:
            "These names often refer to the upper member of a shear-slitting pair. Dished describes the axial shape, while top and male describe the knife's position. Flat top knives also exist. Compare the actual profile, mounting arrangement and relationship to the bottom knife to identify the correct replacement from these purchasing terms.",
        },
        {
          question:
            "Why are blade thickness and dish height listed separately?",
          answer:
            "Blade thickness measures the material section; dish height measures the knife's overall axial profile. Two dished knives can share an outside diameter and bore but position their cutting edges differently. Keeping these dimensions separate lets the replacement match the existing holder and bottom-knife arrangement while preserving the intended working-edge position.",
        },
        {
          question: "When should paper slitter knives be reground or replaced?",
          answer:
            "Regrinding is appropriate when the worn cutting geometry can be restored within the knife's permitted dimensions. Inspect the edge, working faces and relationship to the mating knife before deciding. The knife drawing and machine requirements define the allowable remaining geometry. Replacement is appropriate when damage or dimensional loss prevents that geometry from being restored.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "slitter-rewinder-bottom-knives",
      "groove-bottom-knives",
      "rotary-slitter-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.2 Rotary Slitter Knives for Metal Foil Processing
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement copper and aluminum foil slitter knives with custom widths, bores and matching spacers for your arbor assembly. Send Sureay your drawings and slit-width schedule for a quotation covering the tooling you need.",
    id: "metal-foil-strip-slitter-knives",
    name: "Slitter Knives for Copper & Aluminum Foil",
    fullName: "Slitter Knives for Copper & Aluminum Foil",
    category: "slitter_knives",
    sector: "metal",
    categoryDisplay: "Slitter Knives for Copper & Aluminum Foil",
    image:
      "/images/products/slitter-detail/metal-foil-strip-slitter-knives-copper-aluminum.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement rotary slitter knives for copper and aluminum foil. Carbide, tool steel and PM steel options, with custom bores, widths and matching spacers.",
    link: "/products/metal-foil-strip-slitter-knives",
    isFeatured: true,
    specs: [
      { label: "Sizes", value: "OD 100–300 mm" },
      {
        label: "Material",
        value: "D2, D3, M2, ASP2023, ASP2052 or tungsten carbide (WC-Co)",
      },
      { label: "Applications", value: "Copper foil and aluminum foil" },
      { label: "Hardness", value: "64–67 HRC for PM steel; 91–92 HRA for carbide" },
      { label: "Thickness tolerance", value: "±0.001 mm" },
      { label: "Runout", value: "≤0.01 mm T.I.R." },
      { label: "Surface finish", value: "Mirror-lapped faces, Ra ≤0.02 μm" },
      {
        label: "Mounting",
        value: "Arbor-mounted knives with plain or keyed bores",
      },
    ],
    detailLayout: {
      seoTitle: "Copper & Aluminum Foil Slitter Knives | Custom",
      sizeRange: "OD 100–300 mm",
      heroAlt:
        "Circular foil slitter knife with a polished face and plain bore",
      specificationImage: {
        src: "/images/products/slitter-detail/metal-foil-strip-slitter-knives-keyway.webp",
        alt: "Circular metal foil slitter knife showing a keyway in the bore",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "slitter-knives",
          tabLabel: "Slitter Knives",
          title: "Slitter Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Material"],
          rows: [
            ["SR001253", "130 × 60 × 1 mm", "Tungsten Carbide"],
            ["SR001254", "130 × 60 × 2 mm", "Tungsten Carbide"],
            ["SR001255", "130 × 60 × 3 mm", "Tungsten Carbide"],
            ["SR001256", "130 × 60 × 4 mm", "Tungsten Carbide"],
            ["SR001257", "130 × 66.68 × 1 mm", "Tungsten Carbide"],
            ["SR001258", "130 × 66.68 × 2 mm", "Tungsten Carbide"],
            ["SR001259", "130 × 66.68 × 3 mm", "Tungsten Carbide"],
            ["SR001260", "130 × 66.68 × 4 mm", "Tungsten Carbide"],
            ["SR001261", "130 × 66.68 × 5 mm", "Tungsten Carbide"],
          ],
        },
        {
          id: "catalog-configurations",
          tabLabel: "Additional Foil & Strip Knife Sizes",
          title: "Additional Foil & Strip Knife Sizes",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Knife Type / Platform Reference",
          ],
          rows: [
            ["SR001813", "100 × 40 × 1.0 / 1.5 mm", "Thin Foil Slitter"],
            ["SR001814", "150 × 80 × 2.0 / 3.0 mm", "Precision Strip Slitter"],
            ["SR001815", "200 × 120 × 3.0 / 4.0 mm", "General Strip Slitter"],
            ["SR001816", "250 × 150 × 4.0 / 5.0 mm", "Silicon / Stainless Steel"],
            ["SR001817", "300 × 200 × 5.0 / 10.0 mm", "Heavy Gauge Strip"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "OD 100–300 mm" },
        {
          label: "Material",
          value: "D2, D3, M2, ASP2023, ASP2052 or tungsten carbide (WC-Co)",
        },
        { label: "Applications", value: "Copper foil and aluminum foil" },
        { label: "Hardness", value: "64–67 HRC for PM steel; 91–92 HRA for carbide" },
        { label: "Thickness tolerance", value: "±0.001 mm" },
        { label: "Runout", value: "≤0.01 mm T.I.R." },
        { label: "Surface finish", value: "Mirror-lapped faces, Ra ≤0.02 μm" },
        {
          label: "Mounting",
          value: "Arbor-mounted knives with plain or keyed bores",
        },
      ],
    },
    compatibleMachines: [
      "Braner",
      "Red Bud Industries",
      "Fagor Arrasate",
      "Burghardt + Schmidt",
      "Heinrich Georg",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Tool Steel and Carbide Options for Metal Foil",
        description:
          "D2, D3, M2, PM HSS and tungsten carbide options give foil processors material choices for their copper or aluminum grade, foil gauge and observed knife wear.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Precision-Ground Knife Faces for Foil Tooling",
        description:
          "Sureay supplies precision-ground foil knives made to the specified axial widths and working-face finish, supporting replacement of individual blades within your existing arbor stack.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Knives and Matching Spacers",
        description:
          "Order custom foil knives and matching spacers together, with individual widths, bore details and quantities defined around your slit-width schedule and retained tooling.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "How do I specify custom replacement foil knives and matching spacers?",
          answer:
            "Specify each knife's outside diameter, bore, axial width and keyway, together with the spacer widths and stack arrangement. Include the foil specification, slit-width schedule and quantity of each configuration. Identify the parts that will remain in use so new knives and spacers can be considered within the complete arbor layout.",
        },
        {
          question:
            "How do foil gauge and edge damage affect the choice of steel or carbide?",
          answer:
            "Foil alloy, thickness, surface condition and the required slit edge provide the starting point. Compare the current knife's gradual wear and any edge chipping at that station. The material choice should address the observed condition while retaining the required knife geometry and paired setup, rather than being selected from hardness alone.",
        },
        {
          question: "What can cause burrs on slit copper or aluminum foil?",
          answer:
            "Knife-edge condition, assembled clearances, arbor condition and alignment all need attention when burrs appear. Compare the foil specification with the setup being used, then record which edge and slit position is affected. This makes it easier to distinguish a damaged knife from a recurring issue with the stack or operating setup.",
        },
        {
          question:
            "Why can slit widths vary even when individual knives are accurate?",
          answer:
            "A knife's axial width describes the individual component, while the assembled knife-and-spacer arrangement establishes the cutting positions. Accurate replacement knives still need to occupy the intended positions within that layout. Read their dimensions alongside the stack drawing and spacer widths, especially where some components are retained from an existing setup.",
        },
        {
          question:
            "Are bare-foil knives and coated battery electrode knives interchangeable?",
          answer:
            "Bare copper or aluminum foil and coated battery electrodes present different slitting requirements. An electrode combines collector foil with coating layers, so its cutting profile and paired setup must suit that construction. Identify the actual web and station when selecting a replacement; coated anode and cathode applications are covered under [Battery Slitting Knives](/products/lithium-battery-slitting-knives).",
        },
        {
          question:
            "Can I reuse existing spacers when replacing foil slitter knives?",
          answer:
            "Yes, if the retained spacers still meet the width, bore and face requirements of the intended stack. Record their actual dimensions and positions alongside the new knife widths and slit-width schedule. Confirm the assembled layout before ordering so the replacement knives work with the spacers you intend to keep.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "metal-coil-slitting-knives",
      "lithium-battery-slitting-knives",
      "tungsten-carbide-slitter-knives",
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3a. Twin Shaft Shredder Blades — Recycling & Waste
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Keep your recycling line supplied with replacement twin-shaft shredder blades built around your existing cutter stack. Custom hook profiles, thicknesses and wire-EDM bores are available. Share your drawing or sample for a quotation for individual cutters or a complete set. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "twin-shaft-blades-recycling",
    name: "Twin-Shaft Shredder Blades",
    fullName: "Twin-Shaft Shredder Blades for General Recycling",
    seoTitle: "Twin-Shaft Shredder Blades | Plastics & Mixed Waste",
    seoDescription:
      "Replacement twin-shaft shredder blades for plastics, wood pallets and mixed waste. D2, SKD11 and 42CrMo options with custom hooks and bores.",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Shredder Blades",
    image:
      "/images/products/shredder-blades/twin-shaft-shredder-blades-recycling-cover.webp",
    imageDimensions: {
      width: 1280,
      height: 1280,
      smallerWidths: [320, 480, 640],
    },
    specificationImageDimensions: { width: 1280, height: 1280, smallerWidths: [320, 640] },
    gallery: [
      "/images/products/shredder-blades/twin-shaft-shredder-blades-recycling-cover.webp",
      "/images/products/shredder-blades/shredder-blades-for-recycling.webp",
      "/images/products/shredder-blades/twin-shaft-shredder-blade-01.webp",
    ],
    description:
      "D2/SKD11 replacement blades for twin-shaft shredders processing plastics, wood and MSW. Custom bores, thicknesses and hook profiles made to drawing.",
    link: "/products/twin-shaft-blades-recycling",
    isFeatured: true,
    specs: [
      { label: "Material", value: "D2 (1.2379), SKD11, 42CrMo" },
      { label: "Hardness", value: "HRC 55–62 (4–5 tempering cycles)" },
      { label: "Claw Count", value: "3-Claw · 5-Claw · 8-Claw · 12-Claw" },
      {
        label: "Bore Design",
        value: "Precision Wire-EDM: Hex / Octagonal / Splined",
      },
      { label: "Compatibility", value: "Weima, Untha, SSI, Vecoplan, Genox" },
      {
        label: "Application",
        value: "MSW · Plastics · Wood Pallets · Bulky Waste",
      },
      {
        label: "Sizes",
        value:
          "Listed OD Ø150–450 mm; custom OD up to Ø800 mm; thickness 10–150 mm",
      },
    ],
    relatedBladeIds: [
      "multi-shaft-blades-metal",
      "tire-shredder-blades",
      "twin-shaft-blades-battery",
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
        itemNo: "SR002101",
        spec: "200 Series",
        od: "Φ 150 mm",
        thickness: "15 mm",
        bore: "Hex Ø70 mm",
        hooks: "5-Claw",
      },
      {
        itemNo: "SR002102",
        spec: "400 Series",
        od: "Φ 180 mm",
        thickness: "20 mm",
        bore: "Hex Ø90 mm",
        hooks: "8-Claw",
      },
      {
        itemNo: "SR002103",
        spec: "600 Series",
        od: "Φ 200 mm",
        thickness: "20 mm",
        bore: "Hex Ø140 mm",
        hooks: "8-Claw",
      },
      {
        itemNo: "SR002104",
        spec: "800 Series",
        od: "Φ 250 mm",
        thickness: "25 mm",
        bore: "Hex Ø160 mm",
        hooks: "8-Claw",
      },
      {
        itemNo: "SR002105",
        spec: "1000 Series",
        od: "Φ 300 mm",
        thickness: "30 mm",
        bore: "Hex Ø180 mm",
        hooks: "12-Claw",
      },
      {
        itemNo: "SR002106",
        spec: "1200 Series",
        od: "Φ 350 mm",
        thickness: "40 mm",
        bore: "Splined Ø200 mm",
        hooks: "12-Claw",
      },
      {
        itemNo: "SR002107",
        spec: "1500 Series",
        od: "Φ 400 mm",
        thickness: "40 mm",
        bore: "Splined Ø220 mm",
        hooks: "3-Claw",
      },
      {
        itemNo: "SR002108",
        spec: "2000 Series",
        od: "Φ 450 mm",
        thickness: "30 mm",
        bore: "Splined Ø260 mm",
        hooks: "3-Claw",
      },
    ],
    offers: {
      lowPrice: 45,
      highPrice: 600,
    },
    components: [
      {
        id: "twin-shaft-blades-recycling-advantage-1",
        tag: "Steel Options for General Recycling",
        title: "Steel Options for General Recycling",
        description:
          "D2, SKD11 and 42CrMo cutters are available for plastics, wood pallets and mixed-waste shredding, giving replacement orders a material choice alongside the required hook and shaft geometry.",
      },
      {
        id: "twin-shaft-blades-recycling-advantage-2",
        tag: "Custom Hooks and Wire-EDM Bores",
        title: "Custom Hooks and Wire-EDM Bores",
        description:
          "Sureay makes hooked cutters with hexagonal, octagonal or splined bores. Listed configurations span Ø150–450 mm, with custom diameters up to Ø800 mm for drawing-based replacements.",
      },
      {
        id: "twin-shaft-blades-recycling-advantage-3",
        tag: "Individual Cutters and Complete Changeout Sets",
        title: "Individual Cutters and Complete Changeout Sets",
        description:
          "Order a single cutter configuration or a set covering several shaft positions, with the required thicknesses, hook orientations and quantities defined for your installed cutting stack.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which replacement blades fit a twin-shaft shredder?",
          answer:
            "A replacement fits when its bore, hook profile, thickness and installed orientation match its position in the cutter stack. Two cutters with the same outside diameter can have different bore sizes or hook directions. Use the part reference and spacer layout to tell similar cutters apart.",
        },
        {
          question: "Are twin-shaft, double-shaft and dual-shaft shredder blades the same?",
          answer:
            "Yes. In rotary-shear recycling equipment, all three names commonly refer to cutters on the machine's two shafts. Hooked cutters and claw blades describe the cutting outline. A knife set refers to multiple parts, so match each cutter to its own shaft position.",
        },
        {
          question: "How do hook count and cutter thickness affect replacement selection?",
          answer:
            "Hook geometry influences how the cutter engages the feed. Cutter thickness and spacer width establish the axial arrangement of the cutting stack. Retain those dimensions for a like-for-like replacement. A change in hook count or width needs to be considered with the opposing cutters and the material being processed.",
        },
        {
          question: "When should wear resistance or toughness guide the steel choice?",
          answer:
            "Gradual rounding of the working edge makes wear resistance a useful comparison. Repeated chips or broken hooks also require attention to toughness, edge support and feed impact. Evaluate the original steel and heat-treated condition together with the damage pattern, so the replacement material addresses the condition observed on that machine.",
        },
        {
          question: "What can cause cutters to wear or chip prematurely?",
          answer:
            "Abrasive feed can accelerate gradual wear, while unexpected hard objects or excessive local loading can damage hooks and cutting faces. A loose or incorrectly assembled cutter stack can contribute to damage as well. Compare where the damage occurs with the feed history and stack condition before changing the replacement specification.",
        },
        {
          question: "Do plastics, scrap metal and tires use the same cutter configuration?",
          answer:
            "Usually no. General recycling cutters are configured for plastics, wood pallets and mixed waste. The feed loads and cutter geometry differ in dedicated [Scrap Metal Shredder Blades](/products/multi-shaft-blades-metal) and [Tire Shredder Blades](/products/tire-shredder-blades). Choose the range for your feed and match the configuration to your installed machine.",
        },
        {
          question: "What information do you need to quote twin-shaft shredder blades?",
          answer:
            "Send the machine model, cutter drawing or part number, feed material and quantities by shaft position. For a complete changeout, include the spacer layout, cutter thicknesses and hook directions. A worn sample can show the bore and mounting details. Mark the worn hook tips and add an unused reference or original drawing if available.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the machine model, cutter OD, thickness, bore profile, hook count and spacer width.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3b. Multi-Shaft Shredder Blades — Metal Processing
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Source replacement scrap-metal shredder cutters with the hook geometry and shaft interface your machine needs. Sureay offers H13 and 42CrMo configurations with custom splined or keyed bores. Share your cutter drawings for a quotation covering individual positions or a multi-shaft set. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "multi-shaft-blades-metal",
    name: "Scrap Metal Shredder Blades",
    fullName: "Scrap Metal Shredder Blades for Multi-Shaft Machines",
    seoTitle: "Scrap Metal Shredder Blades | H13 & 42CrMo",
    seoDescription:
      "Source H13 or 42CrMo cutters for multi-shaft shredders processing end-of-life vehicles, e-scrap or appliances. Specify the hook profile and splined or keyed bore.",
    category: "shredder_blades",
    sector: "metal",
    categoryDisplay: "Metal Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades-05.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: { width: 1920, height: 1309, smallerWidths: [320, 640] },
    badge: "Heavy Duty",
    badgeColor: "red",
    gallery: [
      "/images/products/shredder-blades/shredder-blades-05.webp",
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/shredder-blades-for-metal.webp",
    ],
    description:
      "Replacement multi-shaft shredder cutters for scrap metal, ELV and WEEE. H13 and 42CrMo options, with custom splined or keyed bores to drawing.",
    link: "/products/multi-shaft-blades-metal",
    isFeatured: true,
    specs: [
      {
        label: "Material",
        value: "H13 (AISI H13 / 1.2344), 42CrMo (AISI 4140)",
      },
      {
        label: "Hardness",
        value: "HRC 50–54",
      },
      { label: "Claw Geometry", value: "1, 2, or 3 Low-Profile Thick Hooks" },
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
        itemNo: "SR002201",
        spec: "E-Waste / Light Scrap",
        od: "Φ 300–450 mm",
        thickness: "40–60 mm",
        bore: "Hex / Light Splined",
        hooks: "3 Hooks",
      },
      {
        itemNo: "SR002202",
        spec: "Appliances / Steel Drums",
        od: "Φ 450–600 mm",
        thickness: "60–80 mm",
        bore: "Medium Splined",
        hooks: "2–3 Hooks",
      },
      {
        itemNo: "SR002203",
        spec: "ELV / Heavy Demolition",
        od: "Φ 600–800+ mm",
        thickness: "80–150 mm",
        bore: "Heavy Splined",
        hooks: "1–2 Hooks",
      },
    ],
    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "scrap-chopper-blades",
      "metal-shear-knives",
    ],
    offers: {
      lowPrice: 250,
      highPrice: 3500,
    },
    components: [
      {
        id: "multi-shaft-blades-metal-advantage-1",
        tag: "H13 and 42CrMo Cutter Options",
        title: "H13 and 42CrMo Cutter Options",
        description:
          "H13 and 42CrMo configurations give scrap processors material options for replacement cutters, with the specified steel considered alongside the metal stream and existing thick-hook design.",
      },
      {
        id: "multi-shaft-blades-metal-advantage-2",
        tag: "One-, Two- and Three-Hook Profiles",
        title: "One-, Two- and Three-Hook Profiles",
        description:
          "Sureay supplies low-profile thick-hook cutters in listed one-, two- and three-hook configurations. Splined and multi-keyway bores can be made to the shaft drawing, with the hook position defined relative to the bore.",
      },
      {
        id: "multi-shaft-blades-metal-advantage-3",
        tag: "Replacement Sets by Shaft Position",
        title: "Replacement Sets by Shaft Position",
        description:
          "Individual cutters and multi-position sets can be ordered with distinct drawing references for each shaft, supporting changeouts where the machine uses several cutter widths or profiles.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "How are replacement scrap-metal shredder cutters identified?",
          answer:
            "Identify the shaft and cutter position, then compare diameter, axial thickness, hook form and shaft interface. Multi-shaft machines can use different designs within the same cutting chamber. The machine model, original part number and assembly drawing provide the reference for a replacement set, including the relationship to retained spacers and cutters.",
        },
        {
          question: "Are rotary shredder cutters, hammers and scrap shear blades interchangeable?",
          answer:
            "No. Rotary cutters interleave on shredder shafts, hammermill hammers break material by impact, and [Alligator Shear Blades](/products/metal-shear-knives) cut as a jaw-mounted pair. The equipment type establishes which wear part to order.",
        },
        {
          question: "Which scrap characteristics matter when choosing cutter material?",
          answer:
            "The thickest metal sections, strength of the feed and presence of mixed or abrasive material affect the loads at the edge. Light appliance sheet, electronic scrap and dense metal sections can produce different wear patterns. Compare those conditions with the existing H13 or 42CrMo specification and the condition of the used hooks.",
        },
        {
          question: "Why can a harder scrap-metal cutter still suffer edge breakage?",
          answer:
            "Hardness is only one part of the material specification. Repeated impact, concentrated loading at a hook and inadequate support can cause breakage even when abrasive wear is limited. Evaluate the cutter shape, heat-treated condition and actual feed together before changing hardness, particularly when the current failure is localized chipping rather than gradual wear.",
        },
        {
          question: "Can splined and multi-keyway cutter bores be customized?",
          answer:
            "Yes. Sureay can manufacture the shaft interface to the cutter drawing, including spline or keyway geometry, seating faces and orientation. The drawing should locate the bore features relative to the hook profile. This is particularly useful when adjacent cutters have similar diameters but different clocking or shaft connections.",
        },
        {
          question: "Can a replacement scrap-metal cutter keep the original hook profile?",
          answer:
            "Yes. Use the original hook count, outline and body thickness on the drawing, with the bore clocked to the hook profile. Use an unworn reference to recover the intended tip geometry if the old cutter has chipped or rounded hooks.",
        },
        {
          question: "How do I request a quote for a multi-shaft scrap-metal cutter set?",
          answer:
            "Provide the machine model, scrap stream and thickest sections, then list the cutter drawings and quantities by shaft and position. Mark which spacers and cutters will stay in service. Separate line items distinguish low-profile hook shapes, axial widths and bore orientations even when cutter diameters match.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the machine model, scrap type, cutter and spacer drawings, and which shaft the part came from.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3c. Twin Shaft Shredder Blades — Battery Recycling (New Energy)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "twin-shaft-blades-battery",
    name: "Battery Recycling Shredder Blades",
    fullName: "Battery Recycling Shredder Blades for Pre-Shredding",
    seoTitle: "Battery Recycling Shredder Blades | Custom Replacements",
    category: "shredder_blades",
    sector: "new_energy",
    categoryDisplay: "Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades.webp",
    imageDimensions: { width: 1920, height: 1920, smallerWidths: [320, 640] },
    specificationImageDimensions: { width: 1920, height: 1440, smallerWidths: [320, 640] },
    badge: "New Energy",
    badgeColor: "teal",
    gallery: [
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/shredder-blades.webp",
      "/images/products/shredder-blades/four-shaft-shredder-blade-00.webp",
    ],
    description:
      "Replacement rotary-shear cutters for battery-recycling pre-shredders. Custom cutter profiles and shaft interfaces made to approved drawings.",
    link: "/products/twin-shaft-blades-battery",
    isFeatured: false,
    specs: [
      { label: "Tolerance", value: "±0.02 mm Thickness Parallelism" },
      { label: "Hardness", value: "HRC 54–58" },
      { label: "Bore Design", value: "Precision Wire-EDM Hex / Splined" },
      { label: "Optional Coatings", value: "Anti-corrosion surface treatment available" },
      {
        label: "Application",
        value: "EV Battery Packs · Pouch Cells · 18650/21700",
      },
      { label: "Environment", value: "Inert gas (N₂ / Ar) compatible" },
    ],
    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "lithium-battery-slitting-knives",
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
        itemNo: "SR002401",
        spec: "Cylindrical / Pouch Cells",
        od: "Φ 200–350 mm",
        thickness: "10–20 mm",
        bore: "Hex / Splined",
        hooks: "±0.02 mm",
      },
      {
        itemNo: "SR002402",
        spec: "EV Module / Battery Pack",
        od: "Φ 400–600 mm",
        thickness: "30–50 mm",
        bore: "Splined",
        hooks: "±0.05 mm",
      },
    ],
    offers: {
      lowPrice: 300,
      highPrice: 3000,
    },
    components: [
      {
        id: "twin-shaft-blades-battery-advantage-1",
        tag: "Drawing-Based Pre-Shredder Cutters",
        title: "Drawing-Based Pre-Shredder Cutters",
        description:
          "Sureay supplies replacement battery pre-shredder cutters to the specified part drawing and revision. The listed cutter hardness is 54–58 HRC, with the material, finish and shaft interface set by the individual part specification.",
      },
      {
        id: "twin-shaft-blades-battery-advantage-2",
        tag: "Wire-EDM Hexagonal and Splined Bores",
        title: "Wire-EDM Hexagonal and Splined Bores",
        description:
          "Hexagonal and splined shaft interfaces can be manufactured with the specified cutter thickness and seating geometry, so the bore and axial arrangement are addressed in the same replacement order.",
      },
      {
        id: "twin-shaft-blades-battery-advantage-3",
        tag: "Optional Corrosion-Resistant Surface Treatment",
        title: "Optional Corrosion-Resistant Surface Treatment",
        description:
          "Optional anti-corrosion surface treatment is available for specified cutter configurations, allowing the finish requirement to be included alongside the material and dimensional requirements of the part.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which battery-recycling stage uses these cutters?",
          answer:
            "These rotary-shear cutters serve the pre-shredding stage of battery-recycling equipment. Later fine-shredding stages have different tooling. Battery manufacturing uses [Battery Slitting Knives](/products/lithium-battery-slitting-knives) for coated electrode webs. The equipment stage and existing cutter drawing establish which replacement belongs in the recycling machine.",
        },
        {
          question: "Which dimensions determine whether a battery shredder cutter fits?",
          answer:
            "Fit depends on the cutter profile, bore or spline, seating faces and axial position matching the original assembly. Spacer widths determine where neighboring cutters seat. A stack drawing distinguishes similar cutter outlines assigned to different shaft positions.",
        },
        {
          question: "Can a cutter for battery cells also be used for modules or packs?",
          answer:
            "Only if the machine's approved configuration covers that feed. Cell, module and pack describe the input, and the same cutter dimensions can correspond to different pre-shredding duties. Use the approved part reference for your installed line and have any feed change assessed against its process requirements.",
        },
        {
          question: "How should material and optional surface treatment be specified?",
          answer:
            "State the material and surface treatment required by the cutter drawing as separate order requirements. For an optional corrosion-resistant treatment, define the requested finish together with the finished dimensions and mating surfaces. Selection should follow the line's component requirements, including any restrictions on changing the existing material or surface configuration.",
        },
        {
          question: "How does a loose cutter stack affect replacement blades?",
          answer:
            "Loosening within the cutter and spacer stack can reduce shredding performance and increase the risk of assembly damage. New cutting edges alone do not correct a worn or inadequately secured stack. Review its condition against the machine's maintenance requirements, and retain the specified seating faces and axial dimensions when ordering replacement cutters.",
        },
        {
          question: "How do I request a quote for battery pre-shredder cutters?",
          answer:
            "Send the line or machine model, approved cutter drawing and revision, quantity by shaft position, and required material and surface treatment. Specify the feed handled at that stage. If you need a revised part, mark the changed features and the retained seating and stack dimensions on the drawing.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the pre-shredder model, approved cutter and spacer drawings, and your material or surface requirements.",
    disambiguation:
      "For electrode manufacturing, see [Lithium Battery Electrode Slitting Knives](/products/lithium-battery-slitting-knives).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Tissue Paper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tissue-log-saw-blades",
    seoDescription:
      "Cut toilet tissue and kitchen towel logs with D2, Cr12MoV or M2 HSS blades. Listed diameters are 610–1000 mm, with custom sizes up to 1200 mm.",
    name: "Tissue Log Saw Blades",
    fullName: "Tissue Log Saw Blades for Paper Roll Converting",
    category: "log_saw_blades",
    sector: "paper",
    categoryDisplay: "Tissue Paper Blades",
    image: "/images/products/blades/tissue-log-saw-blades-05.webp",
    imageDimensions: { width: 2000, height: 2000, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: {
      width: 1108,
      height: 1108,
      smallerWidths: [320, 480],
    },
    gallery: [
      "/images/products/blades/tissue-log-saw-blades-05.webp",
      "/images/products/blades/tissue-log-saw-blades-real-02.webp",
      "/images/products/blades/tissue-log-saw-blades-real-03.webp",
      "/images/products/blades/tissue-log-saw-blades-real-01.webp",
      "/images/products/blades/tissue-log-saw-blades-01.webp",
      "/images/products/blades/tissue-log-saw-blades-02.webp",
    ],
    galleryAlts: [
      "Tissue log saw blade render showing mirror-polished face and drive pin hole pattern",
      "Stack of finished tissue log saw blades in a wooden packing crate at Sureay",
      "Tissue log saw blade packed in a wooden crate with edge protector before shipment",
      "Tissue log saw blade with a polished face and mounting holes",
      "Central bore and mounting-hole pattern on a tissue log saw blade",
      "Tissue log saw blade face showing mirror-polished finish under workshop lighting",
    ],
    description:
      "Replacement tissue log saw blades for toilet rolls and kitchen towels. D2, Cr12MoV or M2 HSS, with custom bores, mounting patterns and bevel profiles.",
    link: "/products/tissue-log-saw-blades",
    isFeatured: true,
    compatibleMachines: [
      "Fabio Perini", "PCMC", "Casmatic", "Gambini", "Bretting", "MTC",
      "Futura", "United Converting", "Italconverting", "Maflex", "MTorres",
    ],
    compatibleMachinesIntro:
      "Source replacement tissue log saw blades in D2, Cr12MoV or M2 HSS for your converting line. Sureay offers custom bores, mounting patterns and blade profiles; send your drawing for a quotation tailored to your saw. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "tissue-log-saw-mounting",
        tag: "Mounting geometry",
        title: "Tool-Steel and HSS Options for Tissue Converting",
        description:
          "Sureay supplies D2, Cr12MoV and M2 HSS log saw blades for tissue and kitchen-towel converting, giving you material options for your existing saw and sharpening arrangement.",
      },
      {
        id: "tissue-log-saw-profile",
        tag: "Blade profile",
        title: "Polished Faces and Optional Surface Treatments",
        description:
          "Mirror-polished blade faces are available with hard-chrome, PTFE or TiN options, allowing the surface specification to be selected alongside the tissue product and blade material.",
      },
      {
        id: "tissue-log-saw-replacement",
        tag: "Replacement reference",
        title: "Custom Mounting Patterns and Bevel Profiles",
        description:
          "Order replacement blades with custom bores, drive-hole patterns, hubs and bevels for your converting line. Listed diameters cover 610–1000 mm, with custom diameters up to 1200 mm.",
        relatedBladeIds: ["rotary-slitter-knives-paper"],
      },
    ],
    specs: [
      {
        label: "Sizes",
        value: "Listed OD Ø610–1000 mm; custom diameters up to Ø1200 mm",
      },
      { label: "Material", value: "D2 (1.2379), Cr12MoV or M2 HSS" },
      { label: "Optional Coatings", value: "Hard chrome, PTFE or TiN" },
      {
        label: "Application",
        value:
          "Toilet tissue, kitchen towels, industrial wipers and jumbo roll tissue",
      },
      { label: "Lateral Runout", value: "≤0.15 mm" },
      { label: "Edge Runout", value: "≤0.10 mm" },
      { label: "Surface Finish", value: "Mirror polished, Ra ≤0.2 µm" },
      {
        label: "Reference Cutting Rate",
        value: "Up to 300 strokes/min, dependent on the saw and cutting setup",
      },
    ],
    relatedBladeIds: [
      "nonwoven-log-saw-blades",
      "rotary-slitter-knives-paper",
    ],
    offers: {
      lowPrice: 180,
      highPrice: 1200,
    },
    faqs: {
      technical: [
        {
          question: "Which replacement tissue log saw blade fits my converting line?",
          answer:
            "The replacement must match the blade diameter, bore, thickness, hub, bevel and drive-hole pattern specified for the saw. Two Ø610 mm blades can have different bores or body thicknesses, so use the original knife reference as well as the machine model. Toilet paper cutting knife and tissue log saw blade can both refer to this circular cross-cutting blade. For lengthwise web cutting, see [Paper Slitter Knives](/products/rotary-slitter-knives-paper).",
        },
        {
          question: "How should I choose between D2, Cr12MoV and M2 HSS?",
          answer:
            "Start with the current blade material, tissue or towel grade and sharpening arrangement. Compare gradual wear, edge damage and the cut produced between sharpening cycles. The replacement specification should combine the steel choice with the existing bevel and blade section, so a material change can be evaluated under comparable production conditions.",
        },
        {
          question: "What should guide the choice of a coating for a tissue log saw blade?",
          answer:
            "Consider the blade material, tissue product and the location of residue or heat-related cutting problems. Friction between the blade and roll can contribute to heating. Specify the requested surface treatment separately from the steel grade and bevel, and compare coated and uncoated configurations under the same cutting conditions.",
        },
        {
          question: "Why can a tissue log saw blade become scalloped after sharpening?",
          answer:
            "Uneven grinding around the circumference can produce a scalloped or polygonal edge. Relevant checks include grinding-wheel condition, contact on the two faces and runout of the mounted blade. Compare the pattern with the sharpening history and follow the saw maker's grinding procedure before selecting a different replacement material.",
        },
        {
          question: "Why do the hub and bevel matter when the diameter already matches?",
          answer:
            "The hub establishes the blade's mounting relationship, while the bevel determines its working-edge profile and contact with the sharpening wheels. Two knives with the same diameter, bore and body thickness can differ in these features. A cross-section drawing identifies the full configuration needed by the saw and its grinding arrangement.",
        },
        {
          question: "Should a reground blade's diameter be used for a new replacement?",
          answer:
            "Use the original new-blade diameter where available. Repeated sharpening reduces the outside diameter, so record the reground dimension separately. The catalog Item No. gives the listed size, and the blade drawing adds the hub, mounting and bevel geometry for a new replacement.",
        },
        {
          question: "What information do you need to quote a tissue log saw blade?",
          answer:
            "Share the saw model, original blade reference or drawing, quantity and the tissue product you cut. Include the new-blade diameter and thickness, bore, drive-pin layout, hub cross-section and bevel. Specify the requested steel and finish if already defined, and label the current diameter separately if the sample has been reground.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the log saw model, log material, blade OD, bore, thickness, bevel and drive-pin hole pattern.",
    dimensionLabels: {
      col1: "Outer Diameter (mm)",
      col2: "Bore (mm)",
      col3: "Body Thickness (mm)",
      intro:
        "Each Item No. identifies a complete outside diameter, bore and body thickness combination.",
    },
    standardDimensions: [
      { itemNo: "SR005101", od: "610", id: "68.26", thickness: "4.76" },
      { itemNo: "SR005102", od: "610", id: "68.26", thickness: "3.80" },
      { itemNo: "SR005103", od: "610", id: "82.55", thickness: "4.76" },
      { itemNo: "SR005104", od: "680", id: "68.26", thickness: "4.76" },
      { itemNo: "SR005105", od: "870", id: "60", thickness: "6.0" },
      { itemNo: "SR005106", od: "1000", id: "60", thickness: "6.0" },
    ],
    detailLayout: {
      seoTitle: "Tissue Log Saw Blades | Ø610–1000 mm",
      heroAlt: "Tissue log saw blade with a circular cutting edge, central bore and mounting holes",
      sizeRange: "Ø610–1000 mm",
      heroSpecs: [
        { label: "Application", value: "Tissue and kitchen towel log cutting" },
      ],
      technicalSpecs: [
        {
          label: "Sizes",
          value: "Listed OD Ø610–1000 mm; custom diameters up to Ø1200 mm",
        },
        { label: "Material", value: "D2 (1.2379), Cr12MoV or M2 HSS" },
        { label: "Optional Coatings", value: "Hard chrome, PTFE or TiN" },
        {
          label: "Application",
          value:
            "Toilet tissue, kitchen towels, industrial wipers and jumbo roll tissue",
        },
        { label: "Lateral Runout", value: "≤0.15 mm" },
        { label: "Edge Runout", value: "≤0.10 mm" },
        { label: "Surface Finish", value: "Mirror polished, Ra ≤0.2 µm" },
        {
          label: "Reference Cutting Rate",
          value: "Up to 300 strokes/min, dependent on the saw and cutting setup",
        },
      ],
      specificationImage: {
        src: "/images/products/blades/tissue-log-saw-blades-02.webp",
        alt: "Tissue log saw blade showing its face and central mounting area",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your log saw blade",
        description:
          "Include the Item No. or original knife reference, saw model, mounting and bevel drawings, and quantity.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the Item No. or original knife reference, saw model, mounting and bevel drawings, and quantity.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Nonwoven & Hygiene Log Saw Blades (variant of tissue-log-saw-blades)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nonwoven-log-saw-blades",
    name: "Nonwoven Log Saw Blades",
    fullName: "Nonwoven Log Saw Blades for Wound Rolls",
    category: "log_saw_blades",
    sector: "converting",
    categoryDisplay: "Nonwoven Converting Blades",
    image: "/images/products/blades/nonwoven-log-saw-blades-01.webp",
    imageDimensions: { width: 1000, height: 1000, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: {
      width: 1000,
      height: 1000,
      smallerWidths: [320, 480],
    },
    gallery: [
      "/images/products/blades/nonwoven-log-saw-blades-01.webp",
      "/images/products/blades/nonwoven-log-saw-blades-02.webp",
      "/images/products/blades/nonwoven-log-saw-blades-03.webp",
    ],
    description:
      "D2 replacement log saw blades for cross-cutting wound nonwoven rolls. Custom bores, mounting-hole patterns and blade profiles made to your knife drawing.",
    link: "/products/nonwoven-log-saw-blades",
    isFeatured: false,
    compatibleMachines: [
      "Fameccanica", "GDM", "Curt G. Joa", "Zuiko", "Zlink", "Dachang",
    ],
    compatibleMachinesIntro:
      "Order D2 replacement log saw blades for your nonwoven roll-cutting equipment, with custom bores and mounting patterns plus uncoated, TiN or hard-chrome options. Send your drawing or sample, and Sureay will prepare a quotation for your configuration. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "nonwoven-log-saw-installation",
        tag: "Installation geometry",
        title: "D2 Knives for Wound Nonwoven Rolls",
        description:
          "Sureay supplies D2 log saw knives at a listed hardness of 58–60 HRC for cross-cutting wound nonwoven rolls. The cutting profile and blade section can be specified for the installed roll-cutting equipment.",
      },
      {
        id: "nonwoven-log-saw-edge",
        tag: "Edge geometry",
        title: "Uncoated, TiN and Hard-Chrome Options",
        description:
          "Uncoated blades, TiN PVD and hard-chrome configurations give you surface options for a replacement order, with the coating specified separately from the blade geometry.",
      },
      {
        id: "nonwoven-log-saw-reference",
        tag: "Part identification",
        title: "Custom Bores and Complete Mounting Patterns",
        description:
          "Custom centre bores, fixing features and locating surfaces allow replacement knives to follow your existing saw drawing, including configurations that share a diameter but use different mounts.",
        relatedBladeIds: ["nonwoven-slitter-knives"],
      },
    ],
    specs: [
      { label: "Application", value: "Cross-cutting wound nonwoven logs" },
      { label: "Material", value: "D2 (1.2379)" },
      { label: "Hardness", value: "58–60 HRC" },
      {
        label: "Sizes",
        value: "Ø350–700 mm",
      },
      { label: "Optional Coatings", value: "TiN PVD or hard chrome; uncoated blades also available" },
      {
        label: "Lateral runout",
        value: "≤0.15 mm",
      },
      {
        label: "Edge runout",
        value: "≤0.10 mm",
      },
    ],
    relatedBladeIds: ["tissue-log-saw-blades", "nonwoven-slitter-knives"],
    offers: {
      lowPrice: 150,
      highPrice: 900,
    },
    faqs: {
      technical: [
        {
          question: "How do I identify a replacement nonwoven log saw knife?",
          answer:
            "Identify the saw and original part reference, then compare diameter, bore, thickness, mounting pattern and bevel. Nonwoven roll-cutting blade is a related purchasing name. Confirm that the part cross-cuts a wound roll. For cutting a moving web lengthwise, see [Nonwoven Slitter Knives](/products/nonwoven-slitter-knives).",
        },
        {
          question: "Can Sureay make a custom bore and hole pattern for an existing saw?",
          answer:
            "Yes. Sureay can make the bore and bolt or slot pattern to drawing. State the pitch-circle diameter and angular positions of the fixing features as well as their size. Two mountings can have the same number of holes and still use different pitch circles or angular layouts.",
        },
        {
          question: "How should D2 hardness and surface treatment be specified?",
          answer:
            "Specify the D2 base-steel hardness and the surface finish separately. If changing from an uncoated blade to TiN PVD or hard chrome, identify the requested finish on the replacement drawing and keep the specified blade section and mounting dimensions clear.",
        },
        {
          question: "Does body thickness fully describe the cutting profile?",
          answer:
            "No. The body thickness gives only one dimension of the axial profile. Include the bevel and its orientation, plus any hub or stepped section, on the cross-section drawing. Those details locate the cutting edge relative to the mounting face.",
        },
        {
          question: "What do lateral runout and edge runout describe?",
          answer:
            "Lateral runout describes the blade's side-to-side variation as it rotates, while edge runout describes radial variation at the cutting circumference. Both belong to the blade specification, alongside the mounting reference used for measurement. When assessing an installed knife, distinguish the blade measurements from variation introduced by the shaft, flange or seating condition.",
        },
        {
          question: "What should I include in a nonwoven log saw knife inquiry?",
          answer:
            "Provide the saw model, knife drawing or part number, type of wound nonwoven and quantity. Identify the centre bore, pitch circle, bevel direction and finish. For a sample, provide front, back and edge views and mark any reground or damaged areas that no longer represent the new-knife profile.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the saw model, blade drawing, outer diameter, bore, body thickness, bevel and mounting-hole pattern.",
    detailLayout: {
      seoTitle: "Nonwoven Log Saw Blades | Custom Replacements",
      heroAlt: "Nonwoven log saw blade with a circular cutting edge, central bore and mounting holes",
      sizeRange: "Ø350–700 mm",
      heroSpecs: [
        { label: "Application", value: "Nonwoven log cutting" },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Ø350–700 mm" },
        { label: "Material", value: "D2 (1.2379)" },
        { label: "Hardness", value: "58–60 HRC" },
        { label: "Optional Coatings", value: "TiN PVD or hard chrome; uncoated blades also available" },
        { label: "Lateral runout", value: "≤0.15 mm" },
        { label: "Edge runout", value: "≤0.10 mm" },
        { label: "Application", value: "Cross-cutting wound nonwoven logs" },
      ],
      specificationImage: {
        src: "/images/products/blades/nonwoven-log-saw-blades-03.webp",
        alt: "Nonwoven log saw blade sample showing the bore and mounting holes",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your log saw blade",
        description:
          "Send the saw model, original knife reference, complete dimensioned drawing and quantity.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Send the saw model, original knife reference, complete dimensioned drawing and quantity.",
    dimensionLabels: {
      col1: "Outer Diameter (mm)",
      col2: "Bore / ID (mm)",
      col3: "Thickness (mm)",
    },
    standardDimensions: [
      { itemNo: "SR005201", od: "400", id: "To drawing", thickness: "3.80" },
      { itemNo: "SR005202", od: "450", id: "To drawing", thickness: "4.00" },
      { itemNo: "SR005203", od: "500", id: "To drawing", thickness: "4.00" },
      { itemNo: "SR005204", od: "550", id: "To drawing", thickness: "4.76" },
      { itemNo: "SR005205", od: "600", id: "To drawing", thickness: "4.76" },
      {
        itemNo: "SR005206",
        od: "Ø350–700",
        id: "To drawing",
        thickness: "3.80–6.00",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Paper Cutting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "paper-cutting-blades",
    name: "Paper Guillotine Knives",
    fullName: "Paper Cutter Blades & Paper Guillotine Knives",
    seoTitle: "Paper Cutter Blades | Paper Guillotine Knives",
    seoDescription:
      "Order HSS-inlaid or carbide-tipped paper guillotine knives for stack cutters. Listed lengths are 450–2050 mm, with custom lengths and mounting holes available.",
    category: "paper_cutting",
    sector: "paper",
    categoryDisplay: "Paper Cutting Blades",
    image: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    badge: "OEM Precision",
    badgeColor: "teal",
    gallery: [
      "/images/products/shear-detail/paper-cutting-blades-cover.webp",
      "/images/products/paper-cutting-blades/paper-cutting-blades-02.webp",
      "/images/products/shear-detail/paper-guillotine-knives-detail.webp",
    ],
    description:
      "Replacement paper cutter blades and paper guillotine knives for stack cutting. HSS inlay or carbide-tipped edges, with custom lengths and mounting holes.",
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
    compatibleMachinesIntro:
      "Sureay manufactures HSS-inlaid and carbide-tipped paper guillotine knives, with custom lengths, mounting patterns and bevel profiles for your cutter. Share your drawing or sample to receive a quotation for the blade configuration and material you need. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "paper-knife-edge-selection",
        tag: "Material selection",
        title: "HSS Inlay and Carbide-Tipped Cutting Edges",
        description:
          "Sureay offers 18% tungsten HSS inlay and tungsten carbide-tipped edges on steel bodies, giving stack cutters a choice of knife constructions for their paper stock and production duty.",
      },
      {
        id: "paper-guillotine-bevel",
        tag: "Cutting geometry",
        title: "Ground Faces and Specified Bevel Profiles",
        description:
          "Paper cutter knives are available with ground faces and drawing-defined bevels, including double-bevel configurations, so the working geometry can be specified alongside the cutting-edge material.",
      },
      {
        id: "paper-cutter-replacement-fit",
        tag: "Replacement fit",
        title: "Custom Lengths and Mounting Patterns",
        description:
          "Listed paper guillotine knives span 450–2050 mm in length. Sureay also makes replacement knife bodies, bevels and mounting patterns to the drawing for your existing cutting beam.",
      },
    ],
    specs: [
      { label: "Sizes", value: "450–2050 mm" },
      {
        label: "Material",
        value: "18% tungsten HSS inlay or tungsten carbide-tipped (TCT)",
      },
      { label: "Hardness", value: "HSS: 62–64 HRC; carbide: 89–91 HRA" },
      {
        label: "Blade construction",
        value: "Bimetallic: cutting-edge inlay brazed to an alloy-steel body",
      },
      {
        label: "Bevel angle",
        value: "21°–24°; double-bevel configurations available",
      },
      {
        label: "Application",
        value:
          "Paper stacks, coated art paper, recycled board and carbonless copy paper",
      },
      { label: "Face Flatness", value: "≤0.05 mm" },
    ],
    relatedBladeIds: ["three-knife-trimmer-blades"],
    offers: { lowPrice: 80, highPrice: 650 },
    faqs: {
      technical: [
        {
          question: "How do I identify a replacement paper cutter blade?",
          answer:
            "Use the full cutter model and version with the original knife reference or drawing. Check length, body and edge thickness, mounting holes and bevel orientation together. A used sample should include its grinding history. The cutter's advertised working width helps identify the machine, while the complete knife dimensions establish the replacement.",
        },
        {
          question: "When should I consider a carbide-tipped paper guillotine knife?",
          answer:
            "Carbide is worth assessing when gradual edge wear on the actual paper stock drives frequent knife changes. Coatings, fillers, recycled content and the available grinding process influence that choice. If the current knife chips or cuts unevenly, inspect its bevel, the cutting stick and clamping conditions alongside the material requirement.",
        },
        {
          question: "Are paper cutter blades and paper guillotine knives the same?",
          answer:
            "Yes. In industrial stack cutting, both names refer to the straight blade that cuts a clamped stack of paper or board. For machinery that cross-cuts a moving web into sheets, see [Paper Sheeter Knives](/products/paper-sheeter-knives).",
        },
        {
          question: "Why can the bottom sheets remain poorly cut after sharpening?",
          answer:
            "A worn cutting stick, incorrect knife penetration or uneven clamping can leave the bottom sheets poorly cut even with a sharp blade. Check whether the defect is concentrated at the same point across the stack and inspect the corresponding area of the stick. Use the cutter's specified setup to check the cause.",
        },
        {
          question: "How should the bevel be selected for coated paper or board?",
          answer:
            "Start with the specified knife bevel and the stock being processed. Paper structure, coating or filler content and stack conditions influence the cut. Compare edge wear, chipping and cut quality before requesting a different profile. The new bevel must remain compatible with the knife construction and the cutter's working arrangement.",
        },
        {
          question: "When should a paper guillotine knife be reground or replaced?",
          answer:
            "Regrinding is appropriate when sufficient knife height and cutting-edge material remain to restore the specified bevel within the cutter's service limits. Inspect the inlay or tipped edge and body before grinding. Replacement is appropriate when damage, remaining edge material or adjustment limits prevent the required working configuration from being restored.",
        },
        {
          question: "How do I request a quote for a paper cutter blade?",
          answer:
            "Send the cutter model and version, original knife number or drawing, paper stock and quantity. For an older machine, include the mounting hole pattern, bevel orientation and new-knife height. If the only reference is a used knife, show its remaining height separately from the new target dimension.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the cutter model, knife drawing or part number, stack material and height, and mounting-hole pitch.",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 640] },
    specificationImageDimensions: {
      width: 800,
      height: 800,
      smallerWidths: [320, 480],
    },
    detailLayout: {
      heroAlt:
        "Paper guillotine knife with mounting holes and a straight cutting edge",
      sizeRange: "450–2050 mm",
      heroSpecs: [
        { label: "Application", value: "Stack cutting of paper and board" },
      ],
      specificationImage: {
        src: "/images/products/shear-detail/paper-guillotine-knives-detail.webp",
        alt: "Paper guillotine knife showing the straight cutting edge and mounting-hole pattern",
      },
      technicalSpecs: [
        { label: "Sizes", value: "450–2050 mm" },
        {
          label: "Material",
          value: "18% tungsten HSS inlay or tungsten carbide-tipped (TCT)",
        },
        { label: "Hardness", value: "HSS: 62–64 HRC; carbide: 89–91 HRA" },
        {
          label: "Blade construction",
          value: "Bimetallic: cutting-edge inlay brazed to an alloy-steel body",
        },
        {
          label: "Bevel angle",
          value: "21°–24°; double-bevel configurations available",
        },
        {
          label: "Application",
          value:
            "Paper stacks, coated art paper, recycled board and carbonless copy paper",
        },
        { label: "Face Flatness", value: "≤0.05 mm" },
      ],
      dimensionTables: [
        {
          id: "standard-dimensions",
          tabLabel: "Standard dimensions",
          title: "Common Standard Dimensions",
          columns: [
            "Item No.",
            "Length (mm)",
            "Width (mm)",
            "Edge thickness (mm)",
            "Body thickness (mm)",
          ],
          rows: [
            ["SR003101", "450", "51", "12", "10"],
            ["SR003102", "595", "55", "13.5", "10"],
            ["SR003103", "795", "60", "13.5", "10"],
            ["SR003104", "895", "60", "13.5", "10"],
            ["SR003105", "995", "60", "14", "11"],
            ["SR003106", "1095", "65", "14", "11"],
            ["SR003107", "1350", "80", "16", "13"],
            ["SR003108", "2050", "85", "16", "14"],
          ],
        },
      ],
      inlineRfq: {
        title: "Request a quote for your knife configuration",
        description:
          "Include the cutter model, knife drawing or part number, stack material and height, and mounting-hole pitch.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the cutter model, knife drawing or part number, stack material and height, and mounting-hole pitch.",
    dimensionLabels: {
      intro:
        "Listed knife dimensions are catalog configurations, not machine cutting widths. Confirm the mounting pattern and show the edge and body thickness on a cross-section drawing.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Single Shaft Rotor Inserts
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement rotor knives shaped for your single-shaft shredder, including flat, concave, V-groove and crown profiles. Sureay offers custom cutting faces and fixing-bolt seats, with matching bed knives quoted separately. Send your drawing or sample for a tailored quotation. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "single-shaft-shredder-blades",
    name: "Single-Shaft Shredder Rotor Knives",
    fullName: "Single-Shaft Shredder Rotor Knives",
    seoTitle: "Single-Shaft Shredder Rotor Knives | Square Inserts",
    seoDescription:
      "Choose square rotor inserts or concave cutting crowns in DC53, D2 or Cr12MoV. Match the knife face and bolt seat to your single-shaft shredder.",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Single-Shaft Rotor Knives",
    image: "/images/products/shredder-blades/single-shredder-blades-06.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: { width: 1918, height: 1769, smallerWidths: [320, 640] },
    badge: "Heavy Duty",
    badgeColor: "orange",
    gallery: [
      "/images/products/shredder-blades/single-shredder-blades-06.webp",
      "/images/products/shredder-blades/single-shredder-blades-00.webp",
      "/images/products/shredder-blades/single-shredder-blades-01.webp",
    ],
    description:
      "Replacement single-shaft shredder rotor knives in DC53, D2 and Cr12MoV. Square inserts and concave cutting crowns with custom faces and bolt seats.",
    link: "/products/single-shaft-shredder-blades",
    isFeatured: true,
    specs: [
      { label: "Material", value: "DC53, D2 (1.2379), Cr12MoV, 42CrMo" },
      {
        label: "Target Hardness",
        value: "HRC 58–62 (Cryogenically Stabilized)",
      },
      { label: "Machining Tolerance", value: "±0.02 mm Face Flatness" },
      { label: "Edge Geometry", value: "4-Way Indexable (90° Rotation)" },
      { label: "Face Profile", value: "Concave, Flat, V-Groove, Crown" },
      {
        label: "Mounting Style",
        value: "M12–M24 fixing bolts; countersunk or socket-head seats by configuration",
      },
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
    relatedBladeIds: [
      "single-shaft-bed-knives",
      "shredder-screens",
      "granulator-blades",
    ],
    dimensionLabels: {
      col1: "Knife Dimensions (L × W × T)",
      col2: "Fixing Bolt",
      col3: "Cutting Face",
      col4: "Machine / OEM Reference",
      intro:
        "Use the machine model and OEM reference to identify the part, then compare the cutting face, mounting seat and fixing bolt with the original knife.",
    },
    standardDimensions: [
      {
        itemNo: "SR002501",
        spec: "34 × 34 × 20 mm",
        bolt: "M12 × 40 (DIN 912)",
        type: "—",
        oem: "ZERMA ZSS 850 / 1200 · 80001003",
      },
      {
        itemNo: "SR002502",
        spec: "34 × 34 × 23 mm",
        bolt: "M12",
        type: "Concave / Flat",
        oem: "Weima / Vecoplan Standard",
      },
      {
        itemNo: "SR002503",
        spec: "40 × 40 × 25 mm",
        bolt: "M14",
        type: "Concave / Flat",
        oem: "Vecoplan / Heavy Plastics",
      },
      {
        itemNo: "SR002504",
        spec: "43 × 43 × 19.5 mm",
        bolt: "M14",
        type: "Crown / Concave",
        oem: "Lindner Micromat",
      },
      {
        itemNo: "SR002505",
        spec: "50 × 50 × 30 mm",
        bolt: "M16",
        type: "Concave / Flat",
        oem: "Heavy Duty MSW",
      },
      {
        itemNo: "SR002506",
        spec: "60 × 60 × 30 mm",
        bolt: "M16 / M18",
        type: "Flat / V-Groove",
        oem: "Zerma / Tyre Shredding",
      },
      {
        itemNo: "SR002507",
        spec: "80 × 80 × 45 mm",
        bolt: "M24",
        type: "Concave",
        oem: "Extreme High-Torque",
      },
    ],
    offers: {
      lowPrice: 20,
      highPrice: 200,
    },
    components: [
      {
        id: "single-shaft-shredder-blades-advantage-1",
        tag: "Tool-Steel Choices for Rotor Inserts",
        title: "Tool-Steel Choices for Rotor Inserts",
        description:
          "DC53, D2, Cr12MoV and 42CrMo configurations give you material options for replacement rotor knives, considered with the existing cutting face and the wear conditions of your feed.",
      },
      {
        id: "single-shaft-shredder-blades-advantage-2",
        tag: "Flat, Concave and Crown Cutting Faces",
        title: "Flat, Concave and Crown Cutting Faces",
        description:
          "Sureay supplies flat, concave, V-groove and crown profiles. Listed insert sizes include 34 × 34 × 20 mm. Indexable configurations are available where the knife and holder are designed for successive working edges.",
      },
      {
        id: "single-shaft-shredder-blades-advantage-3",
        tag: "Mounting Seats Made to the Rotor Drawing",
        title: "Mounting Seats Made to the Rotor Drawing",
        description:
          "Sureay makes knife undersides and fixing-bolt seats to the rotor drawing, so a replacement can reproduce the seating profile and clamping geometry of the existing holder.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "How do I identify a replacement rotor knife for a single-shaft shredder?",
          answer:
            "Use the machine model and part reference, then compare the cutting face, underside and fixing-bolt seat. Two inserts with the same length and width can have different raised centers, holes or seating profiles. These details establish how the new knife sits and clamps in the existing rotor holder.",
        },
        {
          question: "Are rotor knives, inserts and cutting crowns the same product?",
          answer:
            "Rotor knife is the general term for a moving knife on the rotor. Insert and cutting crown describe particular designs within that group. The fixed cutting edge opposite these parts is a [Single-Shaft Shredder Stator Knife](/products/single-shaft-bed-knives).",
        },
        {
          question: "How should flat and concave rotor-knife faces be selected?",
          answer:
            "Retain the installed face for a like-for-like replacement. Flat and concave profiles change the way the cutting edge engages the feed, so a proposed change should account for the material, holder and mating stator. An existing knife reference provides a clearer starting point than choosing a face solely from its appearance.",
        },
        {
          question: "Can I rotate a worn square insert to use another edge?",
          answer:
            "Yes, where the insert and holder are designed for indexing and an undamaged working edge remains available. Inspect the seating surfaces and fixing features as well as the next edge. Use the indexing arrangement specified for that knife, because a square outline alone does not establish the permitted number or direction of rotations.",
        },
        {
          question: "What should guide material selection when rotor corners chip?",
          answer:
            "Compare chipped corners with gradual wear across the other inserts. Feed contamination, localized impact and the support offered by the face and holder can affect the damage. Evaluate the current steel, heat-treated condition and cutting profile together before changing material, particularly if damage repeatedly appears in one part of the rotor.",
        },
        {
          question: "Can custom fixing-bolt seats and knife undersides be reproduced?",
          answer:
            "Yes. The fixing-bolt seat and underside can be reproduced with the cutting face on one drawing. Photos of both sides are useful when the insert has a raised centre or a shaped seating surface. Mark any worn contact areas and identify the bolt and holder used with it.",
        },
        {
          question: "What should I provide for a single-shaft shredder rotor knife quote?",
          answer:
            "Send the shredder model, original insert number or drawing, feed material and quantity. If you have a sample instead, include the insert dimensions and photos of the cutting face and underside, with the fixing-bolt seat visible. Those views distinguish inserts with the same square outline but different holder profiles.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Send the machine model, OEM part number and quantity. Include a drawing or photos of both sides of the knife, and tell us if you also need the rotor knife holder.",
    disambiguation:
      "For the fixed knife opposite the rotor, see [Single-Shaft Shredder Stator Knives](/products/single-shaft-bed-knives).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Single-Shaft Bed Knives (Stationary Counter Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement stator knives with the edge profile and mounting features required by your single-shaft shredder. Sureay supplies straight and serrated configurations, custom lengths and segmented sets. Share your drawing or sample for a quotation, including rotor inserts when needed. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "single-shaft-bed-knives",
    name: "Single-Shaft Shredder Stator Knives",
    fullName: "Single-Shaft Shredder Stator Knives (Bed Knives)",
    seoTitle: "Single-Shaft Shredder Stator Knives (Bed Knives)",
    seoDescription:
      "Stationary bed knives for single-shaft shredders in listed lengths of 279–3000 mm. Order straight or serrated edges and mounting slots matched to your drawing.",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Single-Shaft Stator Knives",
    image: "/images/products/shredder-blades/single-shredder-bed-knives.webp",
    imageDimensions: { width: 3200, height: 3200, smallerWidths: [320, 640] },
    specificationImageDimensions: { width: 1814, height: 1020, smallerWidths: [320, 640] },
    badge: "Precision Ground",
    badgeColor: "blue",
    gallery: [
      "/images/products/shredder-blades/single-shredder-bed-knives.webp",
      "/images/products/shredder-blades/single-shaft-bed-knives-drawing.webp",
      "/images/products/shredder-blades/single-shredder-bed-knives-02.webp",
    ],
    description:
      "Replacement single-shaft shredder stator and bed knives in D2, DC53 or 42CrMo. Custom edge profiles and mounting slots made to drawing.",
    link: "/products/single-shaft-bed-knives",
    isFeatured: true,
    specs: [
      {
        label: "Material",
        value: "D2 (1.2379), DC53, 42CrMo (AISI 4140), Chipper Knife Steel",
      },
      { label: "Target Hardness", value: "HRC 56–60 (Through-Hardened)" },
      { label: "Straightness Tol.", value: "≤ 0.05 mm per linear meter" },
      {
        label: "Sizes",
        value: "Listed lengths 279–3000 mm; custom single-piece knives up to 3,500 mm",
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
    relatedBladeIds: ["single-shaft-shredder-blades", "shredder-screens"],
    dimensionLabels: {
      col0: "Overall Length (mm)",
      col1: "Width (mm)",
      col2: "Thickness (mm)",
      col3: "Mounting / OEM Reference",
      intro:
        "Compare the knife profile, mounting slots and OEM part number with the original part. For a segmented set, identify which segment you need.",
    },
    standardDimensions: [
      {
        itemNo: "SR002601",
        spec: "279",
        od: "80",
        bolt: "30",
        type: "Segmented · M12 × 55 fixing · ZERMA ZSS 850 (80001202)",
      },
      {
        itemNo: "SR002602",
        spec: "396",
        od: "80",
        bolt: "20",
        type: "6 slots, 22 × 40 mm, at 68 mm centres",
      },
      {
        itemNo: "SR002603",
        spec: "396",
        od: "85",
        bolt: "20",
        type: "6 slots, 22 × 40 mm, at 68 mm centres",
      },
      {
        itemNo: "SR002604",
        spec: "800",
        od: "100",
        bolt: "30",
        type: "Slotted / Counter-Bored",
      },
      {
        itemNo: "SR002605",
        spec: "1000",
        od: "120",
        bolt: "35",
        type: "Slotted / Counter-Bored",
      },
      {
        itemNo: "SR002606",
        spec: "1300",
        od: "150",
        bolt: "40",
        type: "Slotted / Counter-Bored",
      },
      {
        itemNo: "SR002607",
        spec: "1500",
        od: "150",
        bolt: "40",
        type: "Slotted / Counter-Bored",
      },
      {
        itemNo: "SR002608",
        spec: "2000",
        od: "200",
        bolt: "50",
        type: "Custom OEM Pattern",
      },
      {
        itemNo: "SR002609",
        spec: "3000",
        od: "250",
        bolt: "60",
        type: "Heavy Duty Multi-Hole",
      },
    ],
    offers: {
      lowPrice: 150,
      highPrice: 1200,
    },
    components: [
      {
        id: "single-shaft-bed-knives-advantage-1",
        tag: "Steel Options for Stationary Cutting Edges",
        title: "Steel Options for Stationary Cutting Edges",
        description:
          "D2, DC53, 42CrMo and chipper-knife-steel configurations are available for stator knives, supporting replacement orders with the material and edge form specified for the existing shredder.",
      },
      {
        id: "single-shaft-bed-knives-advantage-2",
        tag: "Straight and Serrated Edges with Custom Fixings",
        title: "Straight and Serrated Edges with Custom Fixings",
        description:
          "Single-bevel, double-bevel and serrated profiles can be supplied with slotted, counter-bored or threaded mounting features, allowing the cutting edge and fixing pattern to be made as one replacement part.",
      },
      {
        id: "single-shaft-bed-knives-advantage-3",
        tag: "Individual Segments and Full Stator Sets",
        title: "Individual Segments and Full Stator Sets",
        description:
          "Listed stator lengths span 279–3000 mm. Order an individual stationary segment or a complete set with end and intermediate positions specified separately. Matching rotor knives can be quoted in the same inquiry.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Are stator knives, bed knives and counter knives the same part?",
          answer:
            "Yes. On a single-shaft shredder, stator knife, bed knife and counter knife all describe the fixed cutting edge opposite the [Single-Shaft Shredder Rotor Knives](/products/single-shaft-shredder-blades). Other machines also use some of these names, so the shredder model and stationary position matter when ordering.",
        },
        {
          question: "Can a plastic granulator bed knife replace a shredder stator knife?",
          answer:
            "Generally no. The profile, seat and adjustment of a shredder stator knife are defined by its original machine. A granulator bed knife works in a different cutting chamber. For rotor-and-bed sets that produce plastic regrind, see [Plastic Granulator Knives](/products/granulator-blades).",
        },
        {
          question: "Why can cutting performance remain poor after new rotor inserts are fitted?",
          answer:
            "The retained stator edge and the cutting gap still participate in each cut. A worn stationary profile or unsuitable adjustment can affect engagement even when the rotor inserts are new. Check the stator segments, mounting condition and machine-specified adjustment together before deciding which parts of the cutting pair need replacement.",
        },
        {
          question: "How should a reground stator knife be measured for replacement?",
          answer:
            "Measure from the fixing datums to the remaining edge and record that measurement as reground height. An unused matching knife or original drawing can establish the new edge position. The distinction matters when a shortened knife has already used part of the machine's adjustment range.",
        },
        {
          question: "Which edge and mounting details can be customized?",
          answer:
            "Sureay can make single-bevel, double-bevel and serrated edges with the specified slots, counterbores or threads. Define the edge orientation from the fixing datums and identify the segment position. This allows two knives of similar overall length to retain their distinct cutting profiles and installation arrangements.",
        },
        {
          question: "How do I get a quote for single-shaft shredder bed knives or stator segments?",
          answer:
            "Send the machine model, drawing or original part references, and quantities by segment. For a segmented stator, label the end and intermediate pieces and show their adjoining faces, edge profiles and fixing patterns in a layout. Include the original new-knife height when the reference has been reground.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Send the machine model, OEM part number and quantity. Include a drawing or photos showing the cutting edge and mounting slots, and tell us if you also need the mounting plate.",
    disambiguation:
      "For the knives mounted on the rotor, see [Single-Shaft Shredder Rotor Knives](/products/single-shaft-shredder-blades).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Granulator Blades (Crusher & Granulator Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "granulator-blades",
    name: "Plastic Granulator Knives",
    fullName: "Plastic Granulator Knives: Rotor & Bed Blades",
    seoTitle: "Plastic Granulator Knives | Rotor & Bed Blades",
    seoDescription:
      "Replace rotor and bed knives on granulators processing PET, PP, HDPE or PVC. Plastic granulator blades in listed lengths of 90–1178 mm, with custom bolt patterns.",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Granulator Blades",
    image: "/images/products/granulator-blades/granulator-blades-06.webp",
    gallery: [
      "/images/products/granulator-blades/granulator-blades-06.webp",
      "/images/products/granulator-blades/granulator-blades-03.webp",
      "/images/products/granulator-blades/edge-configurations.webp",
    ],
    description:
      "Replacement plastic granulator rotor and bed knives in D2, SKD11, DC53 or Cr12MoV. Custom profiles and bolt patterns for plastic regrind production.",
    link: "/products/granulator-blades",
    isFeatured: true,
    quoteRequirements:
      "Include the granulator model, rotor or bed position, knife dimensions, mounting-hole pitch and material being cut.",
    introNote:
      "Straight and skewed knife arrangements change how the edges meet across the cutting chamber. Identify the original arrangement before choosing a replacement set.",
    specs: [
      { label: "Sizes", value: "90–1178 mm" },
      { label: "Application", value: "Plastic regrind production" },
      {
        label: "Knife positions",
        value: "Rotating rotor knife and stationary bed knife",
      },
      { label: "Material", value: "D2 (1.2379), SKD-11, DC53 or Cr12MoV" },
      { label: "Hardness", value: "HRC 58–62" },
      { label: "Bevel Angle", value: "30°–55°" },
      { label: "Bolt-hole Tolerance", value: "±0.02 mm" },
      { label: "Face Flatness", value: "≤0.05 mm" },
      { label: "Parallelism", value: "≤0.03 mm" },
      {
        label: "Heat Treatment",
        value: "Vacuum hardening and deep cryogenic treatment (−196°C)",
      },
      { label: "Feedstock", value: "PET, PVC, PP, HDPE and engineering plastics" },
    ],
    relatedBladeIds: [
      "single-shaft-shredder-blades",
      "cutter-compactor-blades",
    ],
    offers: {
      lowPrice: 25,
      highPrice: 320,
    },
    components: [
      {
        id: "granulator-blades-advantage-1",
        tag: "Tool-Steel Options for Plastic Regrind",
        title: "Tool-Steel Options for Plastic Regrind",
        description:
          "D2, SKD11, DC53 and Cr12MoV knives provide material choices for plastic regrind production, with the specified steel considered alongside the polymer, fillers and existing cutting arrangement.",
      },
      {
        id: "granulator-blades-advantage-2",
        tag: "Ground Bevels and Defined Mounting Geometry",
        title: "Ground Bevels and Defined Mounting Geometry",
        description:
          "Sureay supplies rotor and bed knives with specified bevels, working faces and bolt patterns, allowing replacement orders to retain the cutting orientation and seating geometry of the machine.",
      },
      {
        id: "granulator-blades-advantage-3",
        tag: "Custom Rotor and Bed Knife Sets",
        title: "Custom Rotor and Bed Knife Sets",
        description:
          "Sureay supplies individual rotor and bed knives or complete sets to drawing or sample. Listed knife lengths span 90–1178 mm, with moving and stationary positions specified separately for the cutting chamber.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "How do I select replacement knives for my plastic granulator?",
          answer:
            "Use the machine model, knife position and original part number, then compare the length, section, bevel and fixing pattern. Rotor and bed knives can differ within the same machine. The standard-dimensions table gives individual configurations, while the knife drawing establishes the exact replacement for your installed cutting chamber.",
        },
        {
          question: "What do rotor knives, fly knives and bed knives mean?",
          answer:
            "Rotor knives, also called fly knives, move with the granulator rotor. Bed knives form the stationary opposing edge. Plastic crusher knives is a broader purchasing name sometimes used for these parts. Identify the actual machine and position, because the same terms can be used for different cutting arrangements in size-reduction equipment.",
        },
        {
          question: "When should the polymer or filler content change the material choice?",
          answer:
            "Abrasive fillers and contamination can alter how quickly the working edge wears, while impact and brittle edge damage raise different concerns. Compare the actual compound and used knife with the current material specification. That comparison helps assess a replacement grade without changing the machine's required knife section, bevel or mounting geometry.",
        },
        {
          question: "Why does a granulator produce more fines or poorer regrind?",
          answer:
            "A dull cutting pair, incorrect rotor-to-bed clearance or a worn screen can increase fines or change regrind quality. Look for rounded edges or uneven wear across the rotor and bed knives and compare output under the same feed conditions before changing the knife specification.",
        },
        {
          question: "Is there one standard knife gap for all granulators?",
          answer:
            "No. The specified rotor-to-bed gap depends on your granulator and its knife configuration. The OEM settings identify which knives can be adjusted and the minimum knife dimensions after regrinding. Check both limits when fitting a sharpened or replacement set.",
        },
        {
          question: "Why do straight and slanted knife arrangements need different drawings?",
          answer:
            "The cutting angle can result from the knife profile, its position on the rotor or bed, or both. The overall knife length therefore describes only part of the configuration. The drawing needs to preserve the bevel orientation and fixing geometry used by the machine's rotor-and-bed combination.",
        },
        {
          question: "When can granulator knives be reground?",
          answer:
            "Regrinding is suitable when the specified cutting profile can be restored within the permitted minimum knife dimensions. Check the remaining height and adjustment allowance against the machine instructions. Knives that have reached their service limit or cannot recover a sound edge need replacement, with rotor and bed positions assessed as a working pair.",
        },
        {
          question: "What information is needed to quote plastic granulator rotor and bed knives?",
          answer:
            "Send the granulator model and separate drawings, part numbers or samples for the rotor and bed positions, plus the plastic type, fillers and quantity for each knife. Show the bevel and hole pattern for each position. Mark the reground height separately if your only reference is a sharpened knife.",
        },
      ],
      company: [],
    },
    dimensionLabels: {
      col0: "Configuration",
      col1: "Dimensions (L × W × T)",
      col2: "Hole Center Pitch",
      caption:
        "* Standard dimensions for rotor and stator knives in millimeters (mm). Custom profiles to drawing within 10 days.",
    },
    standardDimensions: [
      {
        itemNo: "SR002801",
        spec: "Double hole",
        od: "90 × 70 × 8",
        bolt: "40 / 45 / 50",
      },
      { itemNo: "SR002802", spec: "Double hole", od: "120 × 70 × 8", bolt: "60" },
      { itemNo: "SR002803", spec: "Triple hole", od: "126 × 60 × 8", bolt: "40" },
      {
        itemNo: "SR002804",
        spec: "Triple hole",
        od: "150 × 70 × 8",
        bolt: "50 / 55",
      },
      { itemNo: "SR002805", spec: "Triple hole", od: "170 × 70 × 8", bolt: "45" },
      { itemNo: "SR002806", spec: "Triple hole", od: "180 × 70 × 8", bolt: "60" },
      { itemNo: "SR002807", spec: "Quadra hole", od: "170 × 70 × 8", bolt: "40" },
      { itemNo: "SR002808", spec: "Quadra hole", od: "200 × 70 × 8", bolt: "50" },
      {
        itemNo: "SR002809",
        spec: "ZERMA GSP 560/700 rotor — position 501",
        od: "310 × 100 × 22",
        bolt: "To drawing",
      },
      {
        itemNo: "SR002810",
        spec: "ZERMA GSP 560/700 stator — position 601",
        od: "646 × 100 × 22",
        bolt: "To drawing",
      },
      {
        itemNo: "SR002811",
        spec: "ZERMA GSH 800/1200 rotor — 80000900",
        od: "568 × 100 × 22",
        bolt: "To drawing",
      },
      {
        itemNo: "SR002812",
        spec: "ZERMA GSH 800/1200 stator — 80001050",
        od: "1178 × 100 × 22",
        bolt: "To drawing",
      },
      {
        itemNo: "SR002813",
        spec: "ZERMA GSH 800/1600 rotor — 80000920",
        od: "385 × 100 × 22",
        bolt: "To drawing",
      },
      {
        itemNo: "SR002814",
        spec: "ZERMA GSH 800/1600 stator — 80001070",
        od: "795 × 100 × 22",
        bolt: "To drawing",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Rotary Metal Slitters (金属卷材纵剪/分条刀具组)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Order steel coil slitting knives with the spacers, stripper rings and separator discs needed for your line. Sureay offers grade options, custom bores and tooling widths; send your drawings and slit schedule for a coordinated quotation.",
    id: "metal-coil-slitting-knives",
    name: "Steel Coil Slitting Knives",
    fullName: "Steel Coil Slitting Knives & Rotary Shear Tooling",
    category: "slitter_knives",
    sector: "metal",
    categoryDisplay: "Steel Coil Slitting Knives",
    image: "/images/products/slitter-detail/metal-coil-slitting-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement steel coil slitting knives for carbon, stainless and high-strength steel. Custom rotary shear knives, spacers and stripper rings to drawing.",
    link: "/products/metal-coil-slitting-knives",
    isFeatured: true,
    specs: [
      { label: "Sizes", value: "Rotary shear OD 80–680 mm" },
      {
        label: "Material",
        value:
          "D2, SKD11, Cr12MoV, H13, 6CrW2Si, DC53, M2, PM HSS or WC-Co carbide",
      },
      {
        label: "Applications",
        value: "Cold-rolled, hot-rolled, stainless and high-strength coil",
      },
      { label: "Surface finish", value: "Mirror-lapped faces, Ra ≤0.2 μm" },
      {
        label: "Bore fit",
        value: "H7 for the listed H7 model. Other fits to drawing.",
      },
      {
        label: "Typical hardness",
        value:
          "D2 58–62 HRC · H13 54–58 HRC for ambient plate slitting · PM HSS 64–66 HRC",
      },
      {
        label: "Precision options",
        value:
          "For OD up to 420 mm, ±0.001 mm thickness and 0.002 mm face parallelism. Other sizes to drawing.",
      },
      {
        label: "Tooling",
        value: "Spacers, stripper rings and overarm separator discs",
      },
      { label: "Mounting", value: "Solid arbor with a plain or keyed bore" },
    ],
    detailLayout: {
      seoTitle: "Steel Coil Slitting Knives | Custom Tooling",
      sizeRange: "Rotary shear OD 80–680 mm",
      heroAlt: "Thick ground rotary shear knife for steel coil slitting",
      specificationImage: {
        src: "/images/products/slitter-detail/metal-coil-slitting-knives-detail.webp",
        alt: "Coil slitting stripper ring with a steel core and bonded outer ring",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "steel",
          tabLabel: "Steel Knives",
          title: "Steel Rotary Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Line class"],
          rows: [
            ["SR001301", "200 × 120 × 10 mm", "Light gauge"],
            ["SR001302", "200 × 120 × 12 mm", "Light gauge"],
            ["SR001303", "250 × 150 × 12 mm", "Service center"],
            ["SR001304", "250 × 150 × 15 mm", "Service center"],
            ["SR001305", "300 × 200 H7 × 12 mm", "Medium-duty"],
            ["SR001306", "315 × 200 × 15 mm", "Cold / hot rolled"],
            ["SR001307", "315 × 200 × 20 mm", "Cold / hot rolled"],
            ["SR001308", "400 × 260 × 25 mm", "Hot rolled"],
            ["SR001309", "500 × 320 × 40 mm", "Heavy plate"],
          ],
        },
        {
          id: "carbide",
          tabLabel: "Carbide Knives",
          title: "Carbide Rotary Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Construction"],
          rows: [
            ["SR001331", "150.1 × 95 × 6.35 mm", "Solid carbide"],
            ["SR001332", "181 × 125 × 9.5 mm", "Solid carbide"],
            ["SR001333", "204 × 125 × 10 mm", "Solid carbide"],
            ["SR001334", "250 × 125 × 10.1 mm", "Solid carbide"],
            ["SR001335", "300.15 × 160 × 28 mm", "Solid carbide"],
          ],
        },
        {
          id: "tooling",
          tabLabel: "Arbor Tooling",
          title: "Arbor Tooling",
          columns: ["Item No.", "Component", "Function", "Selection inputs"],
          rows: [
            [
              "SR001341",
              "Spacers",
              "Set cutting positions",
              "Width, bore and stack fit",
            ],
            [
              "SR001342",
              "Stripper rings",
              "Support and release strip",
              "Steel or bonded elastomer, hardness and width",
            ],
            [
              "SR001343",
              "Separator discs",
              "Guide separated strips",
              "Overarm bore, OD and edge form",
            ],
          ],
        },
        {
          id: "additional-steel-knives",
          tabLabel: "Additional Steel Knife Sizes",
          title: "Additional Steel Knife Sizes",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Application"],
          rows: [
            ["SR001818", "400 × 260 × 20 mm", "Heavy gauge hot-rolled steel"],
            ["SR001819", "500 × 320 × 30 mm", "Heavy plate"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Rotary shear OD 80–680 mm" },
        {
          label: "Material",
          value:
            "D2, SKD11, Cr12MoV, H13, 6CrW2Si, DC53, M2, PM HSS or WC-Co carbide",
        },
        {
          label: "Applications",
          value: "Cold-rolled, hot-rolled, stainless and high-strength coil",
        },
        { label: "Surface finish", value: "Mirror-lapped faces, Ra ≤0.2 μm" },
        {
          label: "Bore fit",
          value: "H7 for the listed H7 model. Other fits to drawing.",
        },
        {
          label: "Typical hardness",
          value:
            "D2 58–62 HRC · H13 54–58 HRC for ambient plate slitting · PM HSS 64–66 HRC",
        },
        {
          label: "Precision options",
          value:
            "For OD up to 420 mm, ±0.001 mm thickness and 0.002 mm face parallelism. Other sizes to drawing.",
        },
        {
          label: "Tooling",
          value: "Spacers, stripper rings and overarm separator discs",
        },
        { label: "Mounting", value: "Solid arbor with a plain or keyed bore" },
      ],
    },
    compatibleMachines: [
      "Braner",
      "Fagor Arrasate",
      "Heinrich Georg",
      "Burghardt + Schmidt",
      "ANDRITZ",
      "Red Bud Industries",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Steel Grades for Different Coil Loads",
        description:
          "Sureay offers tool-steel and PM-steel configurations for different coil grades and processing loads, allowing replacement knife orders to reflect the strip specification and observed wear or chipping.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Ground Dimensions for Knife and Spacer Stacks",
        description:
          "Replacement knives are ground to the specified width and face geometry for your coil-slitting stack, with matching spacer dimensions coordinated to the same tooling layout.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Slitting Knives with Companion Tooling",
        description:
          "Source slitting knives, spacers, stripper rings and separator discs in one enquiry, with the required components and quantities arranged around your coil-line tooling layout.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "What identifies a replacement steel coil slitting knife?",
          answer:
            "Outside diameter, bore, axial width and arbor interface establish the basic fit. Include the strip grade, thickness and retained tooling. Rotary shear knives are the circular knives used for longitudinal coil slitting; straight shear knives cut across the strip, while [Scrap Chopper Blades](/products/scrap-chopper-blades) cut the edge trim into shorter pieces.",
        },
        {
          question:
            "How do coil strength and blade damage affect knife material selection?",
          answer:
            "Consider strip strength, thickness and processing conditions alongside the used knife's condition. Gradual abrasion and edge chipping present different material-selection questions. Comparing the coil specification and current wear pattern with the existing tooling helps define the replacement requirement, including the balance between wear resistance and resistance to edge damage.",
        },
        {
          question:
            "Why do coil slitting knives chip instead of wearing gradually?",
          answer:
            "Chipping can indicate mechanical overload. Incorrect horizontal clearance, excessive overlap, deformed tooling or a fatigued cutting edge can contribute. Knife material and hardness also affect the result. Check the damaged position, retained tooling and grinding history against the actual strip grade and thickness before deciding whether the setup or replacement material needs to change.",
        },
        {
          question: "What causes burrs or uneven slit edges on a coil line?",
          answer:
            "Blade wear or chipping, knife clearance, overlap, arbor condition and changes in the strip grade can all contribute. Compare the defect's position and direction across the slit pattern. That record helps determine whether it follows one knife, a particular tooling setup or a change in the material being processed.",
        },
        {
          question:
            "How should knife and spacer tolerances be specified for a complete stack?",
          answer:
            "Define permitted variation for individual widths and for the completed stack. Bore fit, face condition and parallelism also affect assembly. The catalog precision options apply to knives up to 420 mm outside diameter; other sizes are specified to drawing. Record retained components alongside the replacements so the complete arrangement has clear dimensional requirements.",
        },
        {
          question:
            "Can Sureay supply knives, spacers, stripper rings and separator discs together?",
          answer:
            "Yes. These four tooling types can be included in the same quotation. The slit-width schedule and component drawings define their arrangement. List the quantity of each configuration and identify which existing parts will remain in use, allowing the replacement widths, interfaces and working diameters to be considered as part of one assembly.",
        },
        {
          question:
            "How do I compare the cost of different coil slitter knife materials?",
          answer:
            "Compare cost per acceptable tonne or metre under the same coil grade, gauge, slit pattern and edge-quality requirements. Include knife purchase, regrinding, changeover time and scrap, using recorded output between knife changes. Apply the same accounting period to each option so changes in production conditions are separated from differences in knife performance.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "metal-foil-strip-slitter-knives",
      "tungsten-carbide-slitter-knives",
      "guillotine-shear-blades",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Alligator Shear Blades (existing product URL retained)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "metal-shear-knives",
    name: "Alligator Shear Blades",
    fullName: "Alligator Shear Blades for Scrap Metal Recycling",
    seoTitle: "Alligator Shear Blades for Scrap Metal",
    seoDescription:
      "Replace the upper moving blade or lower fixed knife on your alligator shear. Listed lengths are 320–508 mm, with S1, 6CrW2Si and H13 steel options.",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Alligator Shear Blades",
    image: "/images/products/shear-detail/alligator-shear-knives-cover.webp",
    badge: "Alligator Shears",
    badgeColor: "blue",
    gallery: [
      "/images/products/shear-detail/alligator-shear-knives-cover.webp",
      "/images/products/shear-detail/alligator-shear-knives-detail.webp",
    ],
    description:
      "Replacement alligator shear blades for scrap metal cutting. S1, 6CrW2Si or H13 upper and lower knives, with mounting details matched to your drawing.",
    link: "/products/metal-shear-knives",
    isFeatured: true,
    compatibleMachines: ["JMC McIntyre", "Bronneberg"],
    compatibleMachinesIntro:
      "Source individual upper or lower alligator shear knives, or a complete replacement pair, from Sureay. Custom dimensions and mounting holes are available in S1, 6CrW2Si or H13 tool steel; send your knife drawing for a quotation. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "alligator-knife-position",
        tag: "Knife position",
        title: "Steel Choices for Scrap-Cutting Duty",
        description:
          "S1, 6CrW2Si and H13 tool-steel options give you a choice of replacement materials for the scrap sections and edge-wear conditions encountered on your alligator shear.",
      },
      {
        id: "alligator-edge-selection",
        tag: "Scrap conditions",
        title: "Upper and Lower Knives Available Separately",
        description:
          "Order a moving upper knife, a fixed lower knife or a complete pair, with each part specified for its jaw position and the components you intend to retain.",
      },
      {
        id: "alligator-indexing",
        tag: "Edge configuration",
        title: "Custom Knife Bodies and Mounting Holes",
        description:
          "Listed alligator shear knives span 320–508 mm in length. Sureay also makes drawing-based replacements with the body section, hole pattern and locating faces required by the upper or lower jaw.",
      },
    ],
    specs: [
      { label: "Sizes", value: "320–508 mm" },
      {
        label: "Material",
        value: "S1, 6CrW2Si or H13 tool steel for scrap-cutting configurations",
      },
      {
        label: "Knife positions",
        value: "Upper moving knife and lower fixed knife",
      },
      { label: "Blade form", value: "Straight rectangular knives" },
      {
        label: "Application",
        value: "Scrap metal cutting on alligator shears",
      },
    ],
    relatedBladeIds: [
      "guillotine-shear-blades",
      "scrap-chopper-blades",
      "multi-shaft-blades-metal",
    ],
    offers: { lowPrice: 120, highPrice: 2500 },
    faqs: {
      technical: [
        {
          question: "Which replacement alligator shear blade fits my machine?",
          answer:
            "Use the shear model and version together with the upper or lower knife position. Match length, width, thickness, mounting holes and blade-seat features to the original part. Jaw opening and advertised cutting capacity describe the machine's operation. The knife reference or drawing establishes the body and mounting geometry needed for replacement.",
        },
        {
          question: "Can I order a single upper or lower knife instead of a pair?",
          answer:
            "Yes. Both positions can be ordered individually or together. Identify the moving upper and fixed lower knives separately, including any differences in their mounting or cutting profiles. For a single replacement, inspect the retained knife and record its working dimensions so the new part is specified for that existing pair.",
        },
        {
          question: "How does the scrap feed affect alligator shear knife material selection?",
          answer:
            "Scrap composition, section shape and thickness affect the load on the cutting edge. Compare those conditions with the current knife's gradual wear, chipping or deformation. They help establish the required balance of toughness and wear resistance among the available materials, alongside the shear's capacity and original knife specification.",
        },
        {
          question: "Can an alligator shear knife be rotated to use another edge?",
          answer:
            "Yes, if the original knife and jaw allow another working edge. Confirm that the next position retains the specified seating, bolt pattern and clearance. The machine instructions define which positions are usable, even on a rectangular knife.",
        },
        {
          question: "Do McIntyre 320, 407 and 500 knives share one specification?",
          answer:
            "No. The catalog lists different knife-body configurations for the McIntyre 320, 407 and 500. Use the table and Item No. to narrow the selection, then check the hole pattern, knife position and machine version. These model names identify reference configurations for Sureay replacements.",
        },
        {
          question: "How do alligator shear knives differ from stationary scrap shear blades?",
          answer:
            "Alligator shear knives fit a hinged jaw and its opposing fixed position. Stationary gantry shears use a different moving knife and counter-knife assembly. For the latter, see [Stationary Scrap Shear Blades](/products/stationary-scrap-shear-blades).",
        },
        {
          question: "What should I send for an alligator shear blade quote?",
          answer:
            "Provide the machine model and version, a drawing or dimensioned sample, knife position and quantity. Indicate whether you need the moving upper knife, fixed lower knife or both. Add the typical scrap section and mark any changes to cutting height from regrinding the sample.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the alligator shear model, upper or lower knife position, part number or drawing, quantity, and the metal grade and section size you cut.",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 640] },
    specificationImageDimensions: {
      width: 1024,
      height: 765,
      smallerWidths: [320, 640],
    },
    detailLayout: {
      heroAlt:
        "Two alligator shear knife samples with recessed mounting holes and straight cutting edges",
      sizeRange: "320–508 mm",
      heroSpecs: [
        { label: "Application", value: "Scrap metal cutting on alligator shears" },
      ],
      specificationImage: {
        src: "/images/products/shear-detail/alligator-shear-knives-detail.webp",
        alt: "Five alligator shear knife samples showing different body profiles and mounting-hole patterns",
      },
      technicalSpecs: [
        { label: "Sizes", value: "320–508 mm" },
        {
          label: "Material",
          value:
            "S1, 6CrW2Si or H13 tool steel for scrap-cutting configurations",
        },
        {
          label: "Knife positions",
          value: "Upper moving knife and lower fixed knife",
        },
        { label: "Blade form", value: "Straight rectangular knives" },
        {
          label: "Application",
          value: "Scrap metal cutting on alligator shears",
        },
      ],
      dimensionTables: [
        {
          id: "standard-dimensions",
          tabLabel: "Standard dimensions",
          title: "Common Standard Dimensions",
          columns: [
            "Item No.",
            "Machine reference",
            "Length (mm)",
            "Width (mm)",
            "Thickness (mm)",
          ],
          rows: [
            ["SR003501", "JMC McIntyre 320", "320", "65", "30"],
            ["SR003502", "JMC McIntyre 407", "407", "64", "32"],
            ["SR003503", "JMC McIntyre 500", "508", "70", "30"],
            ["SR003504", "Bronneberg A-400", "406", "70", "32"],
            ["SR003505", "Bronneberg A-500PB", "500", "70", "32"],
          ],
        },
      ],
      inlineRfq: {
        title: "Request a quote for your knife configuration",
        description:
          "Include the alligator shear model, upper or lower knife position, part number or drawing, quantity, and the metal grade and section size you cut.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the alligator shear model, upper or lower knife position, part number or drawing, quantity, and the metal grade and section size you cut.",
    dimensionLabels: {
      intro:
        "Machine references identify the listed configurations. Confirm the machine version, upper or lower knife position and complete mounting-hole drawing before ordering; body dimensions alone do not establish fit.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2b. Guillotine Shear Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "guillotine-shear-blades",
    name: "Guillotine Shear Blades",
    fullName: "Guillotine Shear Blades for Sheet Metal",
    seoTitle: "Guillotine Shear Blades for Sheet Metal",
    seoDescription:
      "Cut sheet metal with D2, 6CrW2Si or 9CrSi guillotine shear blades. Order upper and lower knives in single-piece or segmented sets with custom mounting patterns.",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Guillotine Shear Blades",
    image: "/images/products/shear-detail/guillotine-shear-blades-cover.webp",
    badge: "Sheet Metal",
    badgeColor: "blue",
    gallery: [
      "/images/products/shear-detail/guillotine-shear-blades-cover.webp",
      "/images/products/guillotine-shear-blades/guillotine-shear-blades-01.webp",
      "/images/products/shear-detail/guillotine-sheet-metal-knives.webp",
    ],
    description:
      "Replacement guillotine shear blades for sheet metal, in D2, 6CrW2Si or 9CrSi. Upper and lower knives with custom lengths and mounting patterns.",
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
    compatibleMachinesIntro:
      "Equip your sheet-metal shear with replacement upper and lower knives, supplied as single-piece blades or segmented sets. Sureay offers drawing-based dimensions and steel options for your cutting duty; contact us for a quotation for your machine. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "guillotine-upper-lower",
        tag: "Knife configuration",
        title: "Tool-Steel Options for Sheet-Metal Cutting",
        description:
          "Sureay offers D2, 6CrW2Si, 9CrSi and high-carbon tool steel, with listed hardness of 55–62 HRC depending on the grade. Specify the sheet strength, thickness range and edge-wear conditions when comparing replacement materials.",
      },
      {
        id: "guillotine-segmented-knives",
        tag: "Segmented sets",
        title: "Single-Piece and Segmented Knife Sets",
        description:
          "Upper and lower knives are available as individual pieces or segmented sets, with lengths, end faces and mounting details specified for the existing cutting beam.",
      },
      {
        id: "guillotine-material-setup",
        tag: "Cutting conditions",
        title: "Custom Mounting Patterns and Usable Edges",
        description:
          "Custom hole patterns and cutting profiles support replacement of the installed knife configuration. One-, two- and four-edge versions are available according to the knife design and its permitted indexing positions.",
      },
    ],
    specs: [
      { label: "Sizes", value: "508–1300 mm" },
      { label: "Material", value: "D2, 6CrW2Si, 9CrSi or high-carbon tool steel" },
      { label: "Hardness", value: "55–62 HRC, depending on steel grade" },
      {
        label: "Knife positions",
        value: "Upper and lower knives; single-piece or segmented sets",
      },
      {
        label: "Edge configurations",
        value: "One, two or four usable cutting edges, depending on knife profile",
      },
      {
        label: "Application",
        value: "Sheet-metal cutting on guillotine and squaring shears",
      },
      { label: "Parallelism", value: "±0.05 mm over the full knife length" },
    ],
    relatedBladeIds: ["metal-shear-knives", "scrap-chopper-blades"],
    offers: { lowPrice: 30, highPrice: 350 },
    faqs: {
      technical: [
        {
          question: "How do I identify a replacement guillotine shear blade?",
          answer:
            "The upper or lower knife drawing identifies the replacement more reliably than the shear's advertised cutting width. Compare the actual length, section, bolt holes, locating faces and working edge. On a segmented beam, match the individual piece and its position in the row.",
        },
        {
          question: "How should blade material be chosen for mild steel, stainless steel or aluminium?",
          answer:
            "Start with the actual sheet grade, strength, thickness range and used knife's condition. Gradual wear, edge chipping and deformation call for different material considerations. Compare the current material with the available steel options while retaining the required edge geometry. A change in sheet specification may also require reviewing the machine's cutting settings.",
        },
        {
          question: "Why do sheet-metal shear blades chip?",
          answer:
            "Inspect the working edge and compare the damage with the sheet specification and cutting clearance. Mechanical overload, an unsuitable clearance or unintended double layers can contribute to chipping. A worn or damaged edge can affect the finished cut. Check these conditions together before deciding whether to change the knife material or replace a damaged segment.",
        },
        {
          question: "Are squaring shear knives and guillotine shear blades the same?",
          answer:
            "Yes, in sheet-metal equipment both names can refer to straight upper and lower knives for a transverse cut. Match the knife to the machine's upper or lower beam. For a knife that cuts a clamped stack of paper, see [Paper Guillotine Knives](/products/paper-cutting-blades).",
        },
        {
          question: "What is the difference between blade clearance and rake angle?",
          answer:
            "Clearance is the gap between the opposing cutting edges. Rake angle describes their relative inclination along the cut. Both affect cutting conditions, but they are separate settings. Use the shear manufacturer's procedure for the sheet grade and thickness, and retain those requirements when specifying replacement knife geometry.",
        },
        {
          question: "Can a guillotine shear blade be turned or reground?",
          answer:
            "A shear blade can be indexed if the knife and holder support another working edge. It can be reground if the specified profile can be restored within the permitted remaining dimensions. After either operation, check seating, cutting height and clearance against the original drawing and machine limits.",
        },
        {
          question: "How do I request a quote for guillotine shear blades or a segmented set?",
          answer:
            "Share the shear model, upper and lower drawings or part numbers, sheet grades and thicknesses, and quantities. For a segmented row, label the segment sequence and show the adjoining faces. If you're replacing only part of the row, identify the segments staying in service.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the shear model, upper and lower drawings, sheet grade and thickness, and required quantity.",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 640] },
    specificationImageDimensions: {
      width: 800,
      height: 800,
      smallerWidths: [320, 640],
    },
    detailLayout: {
      heroAlt:
        "Guillotine shear knife samples showing straight cutting edges and different mounting holes",
      sizeRange: "508–1300 mm",
      heroSpecs: [
        {
          label: "Application",
          value: "Sheet-metal cutting on a guillotine or squaring shear",
        },
      ],
      specificationImage: {
        src: "/images/products/shear-detail/guillotine-sheet-metal-knives.webp",
        alt: "Four sheet-metal guillotine knife samples showing straight edges and mounting holes",
      },
      technicalSpecs: [
        { label: "Sizes", value: "508–1300 mm" },
        { label: "Material", value: "D2, 6CrW2Si, 9CrSi or high-carbon tool steel" },
        { label: "Hardness", value: "55–62 HRC, depending on steel grade" },
        {
          label: "Knife positions",
          value: "Upper and lower knives; single-piece or segmented sets",
        },
        {
          label: "Edge configurations",
          value: "One, two or four usable cutting edges, depending on knife profile",
        },
        {
          label: "Application",
          value: "Sheet-metal cutting on guillotine and squaring shears",
        },
        { label: "Parallelism", value: "±0.05 mm over the full knife length" },
      ],
      dimensionTables: [
        {
          id: "standard-dimensions",
          tabLabel: "Standard dimensions",
          title: "Common Standard Dimensions",
          columns: [
            "Item No.",
            "Machine cutting capacity (mm)",
            "Knife length (mm)",
            "Width (mm)",
            "Thickness (mm)",
            "Pcs / set",
          ],
          rows: [
            ["SR003201", "4 × 2500", "508", "80", "25", "10"],
            ["SR003202", "4 × 2500", "1300", "63", "16", "4"],
            ["SR003203", "6 × 2500", "1300", "80", "20", "4"],
            ["SR003204", "6 × 3200", "1100", "80", "20", "6"],
            ["SR003205", "6 × 4000", "1025", "80", "20", "8"],
            ["SR003206", "16 × 2500", "1300", "100", "25", "4"],
            ["SR003207", "16 × 3200", "1100", "100", "25", "6"],
            ["SR003208", "16 × 4000", "1025", "100", "25", "8"],
          ],
        },
      ],
      inlineRfq: {
        title: "Request a quote for your knife configuration",
        description:
          "Include the shear model, upper and lower drawings, sheet grade and thickness, and required quantity.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the shear model, upper and lower drawings, sheet grade and thickness, and required quantity.",
    dimensionLabels: {
      intro:
        "Machine cutting capacity is a reference, not a unique model or fit guarantee. Confirm upper and lower knife positions, segment order and mounting holes for the listed configurations.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Three-Knife Trimmer Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "three-knife-trimmer-blades",
    name: "Three-Knife Trimmer Blades",
    fullName: "Three-Knife Trimmer Blades for Book Finishing",
    seoTitle: "Three-Knife Trimmer Blades for Book Finishing",
    seoDescription:
      "Trim the front, head and foot of bound books with HSS or carbide knives. Order one replacement blade or a matched set with one front and two side knives.",
    category: "paper_cutting",
    sector: "paper",
    categoryDisplay: "Bookbinding Knives",
    badge: "OEM Fit",
    badgeColor: "blue",
    image:
      "/images/products/shear-detail/three-knife-trimmer-blades-cover.webp",
    gallery: [
      "/images/products/shear-detail/three-knife-trimmer-blades-cover.webp",
      "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-03.webp",
      "/images/products/shear-detail/three-knife-trimmer-blades-detail.webp",
    ],
    description:
      "Replacement three-knife trimmer blades for book finishing. HSS or carbide front and side knives, supplied as individual parts or matched sets to drawing.",
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
    compatibleMachinesIntro:
      "Order replacement front and side knives for your book trimmer as a matched set or individual pieces. With HSS and carbide cutting-edge options plus custom mounting profiles, Sureay can quote the knife configuration your finishing line needs. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "trimmer-front-side-set",
        tag: "Set configuration",
        title: "HSS and Carbide Inlays for Book Trimming",
        description:
          "18% tungsten HSS and tungsten carbide cutting edges are available on steel bodies, giving binders material choices for the paper stock and cutting duty of their book-finishing line.",
      },
      {
        id: "trimmer-edge-selection",
        tag: "Edge selection",
        title: "Matched Thickness and Lapped Working Faces",
        description:
          "The listed set thickness matching is ±0.01 mm. Mirror-lapped working faces and thickness matching give front and side knives a defined finish and geometry for ordering together.",
      },
      {
        id: "trimmer-spine-finish",
        tag: "Spine trimming",
        title: "Front and Side Knives as Sets or Individual Parts",
        description:
          "Order a complete front, left and right set or an individual replacement, with position-specific bevels and mounting details reproduced from the knife drawings.",
      },
    ],
    specs: [
      { label: "Sizes", value: "392–585 mm" },
      {
        label: "Material",
        value: "18% tungsten HSS or tungsten carbide cutting edges",
      },
      {
        label: "Blade construction",
        value: "Bimetallic inlay with a brazed cutting edge and steel body",
      },
      { label: "Set configuration", value: "One front knife and two side knives" },
      { label: "Surface Finish", value: "Mirror lapped, Ra ≤0.1 µm" },
      {
        label: "Application",
        value: "Front, head and foot trimming of bound books and book blocks",
      },
      { label: "Set Thickness Matching", value: "±0.01 mm across the matched set" },
    ],
    relatedBladeIds: ["paper-cutting-blades"],
    offers: { lowPrice: 120, highPrice: 850 },
    faqs: {
      technical: [
        {
          question: "Which knives make up a three-knife trimmer replacement set?",
          answer:
            "The set comprises one front knife and two side knives for the front, head and foot cuts on a book block. Each position has its own dimensions and mounting details. Identify the left and right knives separately, including their bevel orientation, so the ordered set follows the installed trimmer arrangement.",
        },
        {
          question: "How do I match knives to a Müller Martini or Kolbus trimmer?",
          answer:
            "Match the front, left and right knife references to the complete trimmer model and version. Catalog entries cover specific Müller Martini 367x and Kolbus HD configurations. Compare the separate Item No., bevel and mounting pattern for each position against your drawing.",
        },
        {
          question: "How does paper stock affect the choice between HSS and carbide edges?",
          answer:
            "Paper coating, filler content and production duty influence edge wear. Consider carbide when gradual wear is the main issue, and assess the sharpening process available for that construction. Retain the required front and side bevels and set dimensions. For chipping, inspect the edge and cutting conditions before selecting a harder material.",
        },
        {
          question: "What can cause a persistent mark on a book's trimmed edge?",
          answer:
            "Small chips in the working edge are one possible cause. Locate the mark on the front, head or foot cut and inspect the corresponding knife. Check its sharpness, bevel and cutting-stick condition together. Restoring the edge geometry and support addresses a different problem from removing adhesive residue from an otherwise intact knife.",
        },
        {
          question: "Why does glue build up on book-trimming knives?",
          answer:
            "Glue that has not dried sufficiently can leave residue during trimming, and incompletely dried ink can also affect the finish. Record whether buildup occurs near the spine and review drying conditions with the binding process. Compare the cleaned knife and affected cut before deciding whether the knife geometry or surface requires further attention.",
        },
        {
          question: "Can I replace one side knife without buying the complete set?",
          answer:
            "Yes. A front, left-side or right-side knife can be ordered individually. Identify its original reference and the dimensions of the knives staying in service, including any regrinding. The replacement needs the appropriate bevel orientation and mounting pattern, together with the working dimensions required by that set.",
        },
        {
          question: "Are three-way trimmer knives and saddle-stitcher knives interchangeable?",
          answer:
            "Generally no. Three-way and three-knife refer to trimming three edges of a bound book block. A saddle-stitching line can also trim three edges, but its upper, lower, front and side knives depend on the machine. See [Saddle Stitcher Trimmer Knives](/products/saddle-stitcher-trimmer-knives) for booklet-line configurations.",
        },
        {
          question: "How do I request a quote for a three-knife trimmer set?",
          answer:
            "Send the trimmer model and version, paper or book-block specification and quantities. Label the front, left and right knife drawings separately with their bevel directions and mounting details. For reorders, include each Item No. or original part number. For a partial change, identify the knives staying in the set.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the trimmer model, drawings for the front and side positions, and the book format and stock.",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 640] },
    specificationImageDimensions: {
      width: 960,
      height: 960,
      smallerWidths: [320, 640],
    },
    detailLayout: {
      heroAlt:
        "Three-knife trimmer blade samples showing a long front knife and two shorter side knives",
      sizeRange: "392–585 mm",
      heroSpecs: [
        {
          label: "Application",
          value: "Trimming the front, head and foot of bound products",
        },
      ],
      specificationImage: {
        src: "/images/products/shear-detail/three-knife-trimmer-blades-detail.webp",
        alt: "Three-knife trimmer knife samples with different body profiles and mounting-hole patterns",
      },
      technicalSpecs: [
        { label: "Sizes", value: "392–585 mm" },
        {
          label: "Material",
          value: "18% tungsten HSS or tungsten carbide cutting edges",
        },
        {
          label: "Blade construction",
          value: "Bimetallic inlay with a brazed cutting edge and steel body",
        },
        { label: "Set configuration", value: "One front knife and two side knives" },
        { label: "Surface Finish", value: "Mirror lapped, Ra ≤0.1 µm" },
        {
          label: "Application",
          value: "Front, head and foot trimming of bound books and book blocks",
        },
        { label: "Set Thickness Matching", value: "±0.01 mm across the matched set" },
      ],
      dimensionTables: [
        {
          id: "standard-dimensions",
          tabLabel: "Standard dimensions",
          title: "Common Standard Dimensions",
          columns: [
            "Item No.",
            "Machine / version",
            "Knife position",
            "Length (mm)",
            "Width (mm)",
            "Thickness (mm)",
            "Mounting holes / slots",
          ],
          rows: [
            [
              "SR003401",
              "Müller Martini 3670 / 3672 — New style",
              "Front",
              "540",
              "90",
              "12",
              "12 × M10",
            ],
            [
              "SR003402",
              "Müller Martini 3670 / 3672 — New style",
              "Left side",
              "392",
              "90",
              "12",
              "8 × M10",
            ],
            [
              "SR003403",
              "Müller Martini 3670 / 3672 — New style",
              "Right side",
              "392",
              "90",
              "12",
              "8 × M10",
            ],
            [
              "SR003404",
              "Müller Martini 3671 Merit — Series 97",
              "Front",
              "540",
              "90",
              "12",
              "12 × M10",
            ],
            [
              "SR003405",
              "Müller Martini 3671 Merit — Series 97",
              "Left side",
              "417",
              "90",
              "12",
              "20 × M10",
            ],
            [
              "SR003406",
              "Müller Martini 3671 Merit — Series 97",
              "Right side",
              "417",
              "90",
              "12",
              "20 × M10",
            ],
            [
              "SR003407",
              "Müller Martini 3675 Orbit — Old style",
              "Front",
              "580",
              "115",
              "12",
              "12 × M10 + 1 slot",
            ],
            [
              "SR003408",
              "Müller Martini 3675 Orbit — Old style",
              "Left side",
              "450",
              "115",
              "12",
              "15 × M10 + 2 slots",
            ],
            [
              "SR003409",
              "Müller Martini 3675 Orbit — Old style",
              "Right side",
              "450",
              "115",
              "12",
              "15 × M10 + 2 slots",
            ],
            [
              "SR003410",
              "Müller Martini 3675 Orbit — New style",
              "Front",
              "585",
              "115",
              "12",
              "12 × M10",
            ],
            [
              "SR003411",
              "Müller Martini 3675 Orbit — New style",
              "Left side",
              "466.6",
              "115",
              "12",
              "15 × M10",
            ],
            [
              "SR003412",
              "Müller Martini 3675 Orbit — New style",
              "Right side",
              "466.6",
              "115",
              "12",
              "15 × M10",
            ],
            [
              "SR003413",
              "Kolbus HD150 — Old style",
              "Front",
              "560",
              "115",
              "10",
              "10 × M12",
            ],
            [
              "SR003414",
              "Kolbus HD150 — Old style",
              "Left side",
              "445",
              "115",
              "10",
              "6 × M12",
            ],
            [
              "SR003415",
              "Kolbus HD150 — Old style",
              "Right side",
              "445",
              "115",
              "10",
              "6 × M12",
            ],
            [
              "SR003416",
              "Kolbus HD153",
              "Front",
              "560",
              "115",
              "10",
              "10 × M12",
            ],
            [
              "SR003417",
              "Kolbus HD153",
              "Left side",
              "405",
              "115",
              "10",
              "9 × M12",
            ],
            [
              "SR003418",
              "Kolbus HD153",
              "Right side",
              "405",
              "115",
              "10",
              "9 × M12",
            ],
          ],
        },
      ],
      inlineRfq: {
        title: "Request a quote for your knife configuration",
        description:
          "Include the trimmer model, drawings for the front and side positions, and the book format and stock.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the trimmer model, drawings for the front and side positions, and the book format and stock.",
    dimensionLabels: {
      intro:
        "Each set has one front knife and one knife for each side. Match the machine version, bevel direction and complete hole and slot pattern to your drawing before ordering.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. Lithium Battery Electrode Slitting Knives
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement upper and lower knives for your battery electrode slitting station, with custom bores, widths and edge profiles. Send Sureay your station drawings and electrode details for a quotation on the carbide pair and surface options.",
    id: "lithium-battery-slitting-knives",
    seoDescription:
      "Fine-grain carbide slitting knives for coated lithium battery anodes and cathodes. Order matched upper and lower rotary knives with optional DLC or TiN.",
    name: "Battery Slitting Knives",
    fullName: "Lithium Battery Electrode Slitting Knives",
    category: "slitter_knives",
    sector: "new_energy",
    categoryDisplay: "Battery Slitting Knives",
    image:
      "/images/products/slitter-detail/lithium-battery-slitting-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Carbide replacement slitting knives for coated lithium battery anodes and cathodes. Custom upper and lower knife pairs, with DLC or TiN coating options.",
    link: "/products/lithium-battery-slitting-knives",
    isFeatured: true,
    specs: [
      { label: "Sizes", value: "Electrode series OD 60–150 mm" },
      {
        label: "Material",
        value: "Fine-grain tungsten carbide (WC-Co); cermet on request",
      },
      {
        label: "Applications",
        value: "Coated lithium battery anode and cathode webs",
      },
      { label: "Electrode grades", value: "YG6X, YG6H, YG8 and YG10X" },
      { label: "Edge finish", value: "Mirror-polished cutting faces, Ra ≤0.05 μm" },
      { label: "Optional Coatings", value: "DLC or TiN" },
      { label: "Hardness", value: "91–93 HRA, depending on WC-Co grade" },
      { label: "Thickness tolerance", value: "±0.001 mm" },
      { label: "Runout", value: "≤0.01 mm T.I.R." },
      {
        label: "Mounting",
        value:
          "Matched upper and lower rotary knife pair by electrode slitting station",
      },
      {
        label: "Current Collector Foil",
        value: "Aluminum 12–20 µm; copper 6–12 µm",
      },
    ],
    detailLayout: {
      seoTitle: "Battery Electrode Slitting Knives | Carbide Pairs",
      sizeRange: "Electrode series OD 60–150 mm",
      heroAlt:
        "Circular battery slitter knives arranged to show the bores and polished cutting faces",
      specificationImage: {
        src: "/images/products/slitter-detail/lithium-battery-slitting-knives-detail.webp",
        alt: "Close-up of the polished cutting edge on a circular slitter knife",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "electrode",
          tabLabel: "Electrode Pairs",
          title: "Electrode Pairs",
          columns: ["Item No.", "Series", "Upper OD × ID × W", "Lower OD × ID × W"],
          rows: [
            ["SR001351", "60 series", "72 × 46 × 0.5 mm", "60 × 40 × 5.0 mm"],
            ["SR001352", "80/98 series", "98 × 66 × 0.7 mm", "80 × 55 × 5.0 mm"],
            ["SR001353", "100 series", "100 × 65 × 0.7 mm", "100 × 65 × 3.0 mm"],
            ["SR001354", "100 series", "100 × 65 × 1.0 mm", "100 × 55 × 5.0 mm"],
            ["SR001355", "130 series", "130 × 88 × 0.8 mm", "130 × 95 × 3.0 mm"],
            ["SR001356", "130 series", "130 × 97 × 1.0 mm", "130 × 70 × 5.0 mm"],
          ],
        },
        {
          id: "individual-electrode-knives",
          tabLabel: "Individual Electrode Knives",
          title: "Individual Electrode Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Configuration"],
          rows: [
            ["SR001820", "76 × 38 × 0.5 mm", "Individual knife"],
            ["SR001821", "76 × 38 × 1.0 mm", "Individual knife"],
            ["SR001822", "100 × 50 × 0.5 mm", "Individual knife"],
            ["SR001823", "100 × 50 × 1.0 mm", "Individual knife"],
            ["SR001824", "100 × 50 × 1.5 mm", "Individual knife"],
            ["SR001825", "120 × 60 × 0.5 mm", "Individual knife"],
            ["SR001826", "120 × 60 × 1.0 mm", "Individual knife"],
            ["SR001827", "150 × 76 × 1.0 mm", "Individual knife"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Electrode series OD 60–150 mm" },
        {
          label: "Material",
          value: "Fine-grain tungsten carbide (WC-Co); cermet on request",
        },
        {
          label: "Applications",
          value: "Coated lithium battery anode and cathode webs",
        },
        { label: "Electrode grades", value: "YG6X, YG6H, YG8 and YG10X" },
        { label: "Edge finish", value: "Mirror-polished cutting faces, Ra ≤0.05 μm" },
        { label: "Optional Coatings", value: "DLC or TiN" },
        { label: "Hardness", value: "91–93 HRA, depending on WC-Co grade" },
        { label: "Thickness tolerance", value: "±0.001 mm" },
        { label: "Runout", value: "≤0.01 mm T.I.R." },
        {
          label: "Mounting",
          value:
            "Matched upper and lower rotary knife pair by electrode slitting station",
        },
        {
          label: "Current Collector Foil",
          value: "Aluminum 12–20 µm; copper 6–12 µm",
        },
      ],
    },
    compatibleMachines: [
      "Nishimura",
      "DIENES",
      "Kampf",
      "CIS",
      "PNT",
      "Hirano Tecseed",
      "CKD",
      "Lead Intelligent",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Carbide Configurations for Coated Electrodes",
        description:
          "WC-Co carbide knives are available for coated anode and cathode slitting, with the material requirement and knife configuration defined for your electrode station.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Ground Cutting Faces and Optional DLC or TiN",
        description:
          "Mirror-polished cutting faces and optional DLC or TiN surface configurations allow electrode knife orders to specify the working surface separately from the carbide material and blade geometry.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Upper and Lower Knives for Electrode Stations",
        description:
          "Order custom upper-and-lower knife pairs or individual replacements, with bores, widths and cutting profiles specified around your existing electrode-slitting station and retained mating knife.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "How do I identify a replacement upper and lower electrode knife pair?",
          answer:
            "Identify both knife positions and record their bores, widths, cutting profiles and installed relationship. The station model and current drawings establish the mounting requirements. Include the electrode web construction so the replacement pair can be specified for the coated material as well as the mechanical arrangement, with each position clearly identified.",
        },
        {
          question:
            "How should current wear guide carbide selection for coated electrodes?",
          answer:
            "Record the used knife's wear pattern alongside the electrode construction and required edge quality. These provide the basis for discussing the carbide material requirement. Keep the substrate grade and optional surface coating as separate specifications, and compare them with the existing knife geometry and production acceptance criteria when assessing a replacement.",
        },
        {
          question:
            "What can cause burrs, dust or coating damage at the electrode edge?",
          answer:
            "Knife-edge condition, cutting geometry, pair alignment and electrode structure can all contribute. Examine the collector edge and coating separately, noting whether the defect appears on one side or at several slit positions. Compare those observations with the validated machine settings and edge-quality requirements to define what the replacement knife pair needs to address.",
        },
        {
          question: "Why does a carbide electrode knife develop micro-chips?",
          answer:
            "Hard carbide edges are sensitive to handling impacts, unintended knife contact and unstable positioning. Inspect both edges, mounting condition and runout, then compare the pair alignment and cutting geometry with the station requirements. Record whether damage first appears during installation, startup or running to distinguish contact damage from a recurring operating problem before changing grade.",
        },
        {
          question:
            "How should DLC or TiN be specified for replacement electrode knives?",
          answer:
            "Specify the coating separately from the carbide grade, bore, knife width and cutting profile. Identify whether the order should reproduce an existing coated knife or evaluate a change from an uncoated configuration. Keep the electrode construction and edge-quality requirements with the specification so the requested surface treatment is defined for that station.",
        },
        {
          question:
            "Can Sureay supply a custom knife pair or replace only the upper knife?",
          answer:
            "Yes. Custom pairs can be specified from the station drawings, and an upper knife can be supplied separately when the retained lower knife is identified and serviceable. Include its actual dimensions, edge profile and regrinding history. Clearly identify which knife is being replaced and whether the order should reproduce or change the existing configuration.",
        },
        {
          question:
            "Are electrode slitter knives the same as bare copper or aluminum foil knives?",
          answer:
            "Electrode knives cut a coated anode or cathode web containing both collector foil and coating layers. Bare-foil knives slit the uncoated copper or aluminum substrate. Their edge and particle requirements can differ despite a similar circular shape. For uncoated substrates, see [Slitter Knives for Copper & Aluminum Foil](/products/metal-foil-strip-slitter-knives).",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "metal-foil-strip-slitter-knives",
      "tungsten-carbide-slitter-knives",
      "rotary-slitter-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. Corrugated Slitter Scorer Blades (瓦楞纸薄刀及全系刀具能力展示)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Source replacement carbide slitter blades for your corrugator dry end, with custom bores, fixing holes and slotted mounting patterns. Send Sureay the part drawing or sample for a quotation on your solid or split blade configuration.",
    id: "corrugated-slitter-scorer-blades",
    seoDescription:
      "Carbide slitter blades for corrugator dry-end lines, with BHS and Fosber reference configurations. Custom bores and fixing patterns made to drawing.",
    name: "Corrugated Board Slitter Blades",
    fullName: "Corrugated Board Slitter Blades for Dry-End Lines",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Corrugated Board Slitter Blades",
    image:
      "/images/products/slitter-detail/corrugated-slitter-scorer-blades.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Carbide replacement slitter blades for corrugator dry-end lines. BHS, Fosber and other machine references, with custom bores and fixing patterns to drawing.",
    link: "/products/corrugated-slitter-scorer-blades",
    isFeatured: true,
    specs: [
      { label: "Sizes", value: "Thin blade OD 15–340 mm" },
      {
        label: "Material",
        value: "WC-Co carbide in K05, K10, K20, YG8, YG10, YG12X or YG15 grades",
      },
      {
        label: "Applications",
        value: "Longitudinal slitting on the corrugator dry end",
      },
      { label: "Blade options", value: "Solid disc or split construction" },
      { label: "Hardness", value: "90–92 HRA, depending on carbide grade" },
      {
        label: "Mounting",
        value: "Plain bore, fixing-hole pattern or slotted mounting pattern",
      },
      { label: "Production Method", value: "HIP-sintered solid tungsten carbide" },
      { label: "Edge Apex", value: "Approximately 0.3 mm" },
    ],
    detailLayout: {
      seoTitle: "Corrugated Slitter Scorer Blades | BHS & Fosber",
      sizeRange: "Thin blade OD 15–340 mm",
      heroAlt:
        "Corrugated board thin slitter blades with different bore and mounting patterns",
      specificationImage: {
        src: "/images/products/slitter-detail/corrugated-slitter-scorer-blades-detail.webp",
        alt: "Circular corrugated slitter blade showing its large bore and fixing holes",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "thin",
          tabLabel: "Carbide Thin Blades",
          title: "Carbide Thin Blades",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Equipment reference",
            "Mounting pattern",
          ],
          rows: [
            ["SR001401", "240 × 32 × 1.2 mm", "BHS", "2 × Ø8.5 mm"],
            ["SR001402", "240 × 32 × 1.3 mm", "BHS", "2 × Ø8.5 mm"],
            ["SR001403", "230 × 110 × 1.1 mm", "Fosber", "6 × Ø9 mm pattern"],
            ["SR001404", "230 × 135 × 1.1 mm", "Fosber", "4-slot pattern"],
            ["SR001405", "257 × 135 × 1.1 mm", "Fosber", "Match drawing"],
            ["SR001406", "291 × 203 × 1.1 mm", "Fosber", "Match drawing"],
            ["SR001408", "220 × 115 × 1.0 mm", "Agnati", "Match drawing"],
            ["SR001409", "240 × 115 × 1.0 mm", "Agnati", "Match drawing"],
            ["SR001410", "280 × 160 × 1.1 mm", "Mitsubishi", "Match drawing"],
            ["SR001411", "260 × 140 × 1.1 mm", "Isowa", "Match drawing"],
            ["SR001412", "300 × 112 × 1.2 mm", "TCY", "Match drawing"],
            ["SR001413", "340 × 230.2 × 1.0 mm", "Göpfert", "Match drawing"],
          ],
        },
        {
          id: "catalog-configurations",
          tabLabel: "Additional Corrugator Knife Sizes",
          title: "Additional Corrugator Knife Sizes",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Knife Type / Platform Reference",
          ],
          rows: [
            ["SR001828", "240 × 115 × 1.0 / 1.2 mm", "BHS"],
            ["SR001829", "260 × 140 × 1.2 mm", "BHS"],
            ["SR001830", "230 × 135 × 1.15 / 1.2 mm", "FOSBER"],
            ["SR001831", "260 × 112 × 1.2 mm", "FOSBER"],
            ["SR001832", "230 × 110 × 1.2 / 1.5 mm", "Marquip"],
            ["SR001833", "200 × 122 × 1.2 mm", "TCY / Justu"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Thin blade OD 15–340 mm" },
        {
          label: "Material",
          value: "WC-Co carbide in K05, K10, K20, YG8, YG10, YG12X or YG15 grades",
        },
        {
          label: "Applications",
          value: "Longitudinal slitting on the corrugator dry end",
        },
        { label: "Blade options", value: "Solid disc or split construction" },
        { label: "Hardness", value: "90–92 HRA, depending on carbide grade" },
        {
          label: "Mounting",
          value: "Plain bore, fixing-hole pattern or slotted mounting pattern",
        },
        { label: "Production Method", value: "HIP-sintered solid tungsten carbide" },
        { label: "Edge Apex", value: "Approximately 0.3 mm" },
      ],
    },
    compatibleMachines: [
      "BHS",
      "Fosber",
      "MarquipWardUnited",
      "Agnati",
      "Mitsubishi",
      "Isowa",
      "TCY",
      "Göpfert",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Carbide Material Options for Corrugator Slitting",
        description:
          "WC-Co carbide options give you a choice of replacement materials for corrugator slitting. Specify your current grade, blade configuration and board conditions to define the required knife.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Solid and Split Blade Constructions",
        description:
          "Solid-disc and split constructions are available for existing corrugator knife stations, allowing you to order the blade form required by your installed assembly.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Bores and Mounting Patterns",
        description:
          "Replacement blades can be made with drawing-defined bores, fixing holes and slots, giving you a direct purchasing route for the mounting pattern used on your line.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "How do I identify the correct replacement corrugator slitter blade?",
          answer:
            "Start with the machine model and knife reference, then specify the outside diameter, bore, thickness and fixing pattern. Include whether the installed blade is a solid disc or split construction. A drawing or clear photographs of the mounting arrangement help identify the required configuration, particularly when the same machine brand uses different knife assemblies.",
        },
        {
          question: "Do BHS and Fosber slitter blades interchange?",
          answer:
            "Interchangeability depends on the complete blade and mounting geometry. Compare the bore, fixing holes or slots, thickness and cutting profile with the installed part. Similar outside diameters can conceal different interfaces, so use the knife drawing or part reference to establish the replacement configuration for the specific BHS or Fosber station.",
        },
        {
          question:
            "Why is tungsten carbide used for corrugated slitter-scorer blades?",
          answer:
            "Tungsten carbide provides a wear-resistant cutting edge for corrugated board slitting. Grade selection should reflect the blade construction and actual working conditions. Compare gradual edge wear with chipping, and include the machine's sharpening arrangement when specifying a replacement. These details help define the required material more usefully than a hardness value alone.",
        },
        {
          question:
            "Why does corrugated board show rough edges after slitting?",
          answer:
            "Check the blade's cutting edge, sharpening condition and board support at the cut. A worn edge or an unsuitable grinding setup can undermine the thin blade's cutting action. Compare cut samples before and after sharpening, and note changes in paper grade. Follow the corrugator's settings for grinding and support, rather than treating every rough edge as a carbide-grade problem.",
        },
        {
          question:
            "What should be checked when matching a blade to the automatic sharpening unit?",
          answer:
            "Check the blade profile and remaining diameter against the sharpening arrangement, along with the condition and alignment of the grinding components. Use the machine documentation for sharpening settings and service limits. Include the sharpening-unit details when ordering a replacement so the knife is specified as part of the installed cutting and grinding assembly.",
        },
        {
          question:
            "Can Sureay reproduce a corrugator blade with a specific mounting pattern?",
          answer:
            "Yes. Sureay can make replacement blades to drawings defining the bore, fixing-hole arrangement, slots and cutting profile. The original part reference or sample helps identify the installed interface. Specify whether the blade is solid or split, and include the locating and fixing details needed to reproduce the mounting pattern.",
        },
        {
          question:
            "Are slitter-scorer blades the same as scoring wheels or slotter knives?",
          answer:
            "These parts perform different operations. Corrugator slitter blades cut board lengthwise, scoring wheels form fold lines, and slotter knives cut flap slots during box converting. Male and female slotter knives use different profiles and mounting arrangements. Identify the cutting operation when requesting a replacement so the enquiry reaches the correct product configuration.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "corrugated-slotter-knives",
      "tungsten-carbide-slitter-knives",
      "rotary-slitter-knives-paper",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. Tire Shredder Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement tire-shredder cutters built for your existing primary cutting stack, with custom hooks and bores. Sureay can quote individual cutters or complete sets for whole-tire and TDF processing. Share your machine details and drawing to discuss the required configuration. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "tire-shredder-blades",
    name: "Tire Shredder Blades",
    fullName: "Tire Shredder Blades for Primary Rotary Shears",
    seoTitle: "Tire Shredder Blades for Primary Rotary Shears",
    seoDescription:
      "Source modified A8 or 42CrMo cutters for primary tire shredding. Match the hook count, cutter thickness and shaft bore to your rotary shear.",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Tire Shredder Blades",
    image: "/images/products/shredder-blades/3-claw-shredder-blades.webp",
    imageDimensions: { width: 3200, height: 3200, smallerWidths: [320, 640] },
    specificationImageDimensions: { width: 880, height: 880, smallerWidths: [320, 640] },
    badge: "OEM Standard",
    badgeColor: "red",
    gallery: [
      "/images/products/shredder-blades/3-claw-shredder-blades.webp",
      "/images/products/shredder-blades/3-claw-shredder-blades-00.webp",
      "/images/products/shredder-blades/3-claw-shredder-blades-01.webp",
    ],
    description:
      "Replacement tire shredder cutters for primary rotary shears. Modified A8 and 42CrMo options, with custom hook profiles and shaft bores to drawing.",
    link: "/products/tire-shredder-blades",
    isFeatured: true,
    specs: [
      { label: "Material", value: "Cru-Wear (PGK), Modified A8, 42CrMo" },
      { label: "Machining Tol.", value: "Strictly ±0.05 mm (0.002 inches)" },
      {
        label: "Claw Geometry",
        value: "1, 3 or 5 claws, depending on the listed configuration",
      },
      { label: "Hardness", value: "HRC 54–58 (Optimized for Wire Impact)" },
      { label: "Application", value: "Whole Tires, TDF Chips, OTR Tires" },
      {
        label: "OEM Fitment",
        value: "Barclay, CM, SSI, Untha, Granutech-Saturn",
      },
    ],
    relatedBladeIds: [
      "twin-shaft-blades-recycling",
      "multi-shaft-blades-metal",
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
    standardDimensions: [
      {
        itemNo: "SR002301",
        spec: "Barclay Standard",
        od: 'Φ 450 mm (17.7")',
        thickness: '50.8 mm (2.0")',
        bore: "Hex / Splined",
        hooks: "3 Claws",
      },
      {
        itemNo: "SR002302",
        spec: "CM Primary",
        od: 'Φ 500 mm (19.6")',
        thickness: '50.8 mm (2.0")',
        bore: "Heavy Splined",
        hooks: "3 Claws",
      },
      {
        itemNo: "SR002303",
        spec: "SSI / Untha",
        od: "Φ 400–600 mm",
        thickness: "25–75 mm",
        bore: "Hex / Octagon",
        hooks: "1 / 3 / 5 Claws",
      },
      {
        itemNo: "SR002304",
        spec: "OTR Shredder",
        od: "Φ 800+ mm",
        thickness: "100+ mm",
        bore: "Heavy Keyed",
        hooks: "1 / 3 Claws",
      },
    ],
    offers: {
      lowPrice: 250,
      highPrice: 2500,
    },
    components: [
      {
        id: "tire-shredder-blades-advantage-1",
        tag: "Steel Configurations for Reinforced Tire Feed",
        title: "Steel Configurations for Reinforced Tire Feed",
        description:
          "Modified A8 and 42CrMo options support replacement orders for tire-shredding cutters, with the material specified around the existing knife design and the wear or impact conditions in service.",
      },
      {
        id: "tire-shredder-blades-advantage-2",
        tag: "One-, Three- and Five-Claw Cutters",
        title: "One-, Three- and Five-Claw Cutters",
        description:
          "Listed tire cutter configurations use one, three or five claws. Sureay makes the required claw profile and hexagonal, octagonal, splined or keyed bore to suit the replacement position on your primary shredder.",
      },
      {
        id: "tire-shredder-blades-advantage-3",
        tag: "Single Cutters and Shaft Sets",
        title: "Single Cutters and Shaft Sets",
        description:
          "Individual cutter configurations and sets covering multiple shaft positions can be quoted together, with complete cutters and replaceable inserts identified separately for the planned changeout.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which recycling stage uses these tire shredder blades?",
          answer:
            "These tire shredder blades, also called tyre shredder knives, are shaft-mounted cutters for primary rotary-shear equipment. Downstream raspers and rubber granulators use their own cutting arrangements. Specify the machine and stage first, then identify whether the required replacement is a complete cutter or an insert fitted to an existing body.",
        },
        {
          question: "Does cutter thickness determine the final tire-chip size?",
          answer:
            "No. Cutter thickness influences one dimension of the primary cut. Hook geometry, cutter arrangement and any downstream sizing stage also affect the final tire-chip size. Keep the existing cutter thickness and the target TDF chip size as separate requirements.",
        },
        {
          question: "How should steel reinforcement affect cutter selection?",
          answer:
            "Steel cords and bead sections add local loads to the cutting of the rubber body. Compare the original cutter material, hook support and current wear pattern when assessing a replacement. Gradual wear and chipped hooks call for different balances of wear resistance and toughness, so keep the feed description specific to the tires being processed.",
        },
        {
          question: "What can cause rapid wear or chipped hooks on tire cutters?",
          answer:
            "Abrasive contact can wear cutting faces gradually, while reinforcement or foreign material can create concentrated loads at the hooks. Stack condition also matters when damage appears at particular positions. Record the affected faces and compare them with adjacent cutters before deciding whether the replacement needs a different material, profile or assembly correction.",
        },
        {
          question: "Can hook count or bore geometry be changed on a custom tire blade?",
          answer:
            "Yes. Sureay can make a revised hook count or bore to drawing. Show how the revised cutter seats on the shaft and how its hooks line up with the opposing cutters. A revision reference distinguishes this change from a like-for-like replacement.",
        },
        {
          question: "Can one worn cutter be replaced without ordering a complete set?",
          answer:
            "Yes. A single cutter can be supplied when the retained parts and mating geometry are known. Check the adjacent cutters, spacer widths and installed orientation before defining that replacement. For a full changeout, list each position separately so differences between complete cutters, inserts and shaft-specific parts remain clear in the order.",
        },
        {
          question: "What do you need to quote replacement tire shredder knives?",
          answer:
            "Send the primary shredder's model, cutter drawing or part number, tire feed and quantities. Specify complete cutters or replaceable inserts. For each position, include the outside diameter, thickness, hook form and bore, together with the spacer arrangement if the order covers a shaft set.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the primary shredder model, tire feed, target chip size and cutter and spacer dimensions.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. Nonwoven / Spunbond Slitting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement nonwoven slitter knives with custom profiles, mounting dimensions and coating options for your converting line. Share your drawing or sample and web application with Sureay for a quotation covering the blade configuration and documentation you need.",
    id: "nonwoven-slitter-knives",
    name: "Nonwoven Slitter Knives",
    fullName:
      "Nonwoven Slitter Knives for Spunbond, Meltblown & SMS",
    seoTitle: "Nonwoven Slitter Knives | PP Spunbond & SMS",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Slitter Knives",
    image: nonwovenSlitterImage,
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    badge: "Medical Grade",
    badgeColor: "teal",
    gallery: [
      nonwovenSlitterImage,
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-08.webp",
      "/images/products/rotary-slitter-knives/nonwoven-slitter-knives-02.webp",
    ],
    galleryAlts: [
      "Circular nonwoven slitter blades and black anvil rings",
      "Close-up of a circular slitter blade bevel",
      "Circular slitter blades and split rings viewed from above",
    ],
    detailLayout: {
      heroTitle:
        "Nonwoven Slitter Knives for Spunbond, Meltblown & SMS",
      sizeRange: "OD 60–300 mm",
      heroSpecs: [
        { label: "Material", value: "M2 HSS, D2, tungsten carbide, 52100" },
        {
          label: "Fits",
          value:
            "Pneumatic shear cut holders (80/90/100/110 type) & slitter rewinders up to",
          emphasis: "800 m/min",
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "OD 60–300 mm" },
        { label: "Materials", value: "M2 HSS, D2, tungsten carbide, 52100" },
        {
          label: "Hardness",
          value: "M2: 62–64 HRC; D2: 60–62 HRC; carbide: 89–92 HRA",
        },
        { label: "Tolerance", value: "Thickness ±0.002 mm" },
        { label: "Interface", value: "H7 bore, set-screw locking" },
        { label: "Geometry", value: "Bevel 25°–45°" },
        {
          label: "Optional Coatings",
          value: "PTFE, TiN, DLC or ESD conductive coating",
        },
        { label: "Rake Angle", value: "15°–20° positive rake" },
        { label: "Surface Finish", value: "Ra ≤0.4 µm" },
        {
          label: "Application",
          value: "Spunbond PP, Meltblown, SMS/SMMS, Hydroentangled, Geotextile",
        },
      ],
      inlineRfq: {
        title: "Need a size that is not listed?",
        description:
          "Send a drawing, a worn sample, or just your machine model. We reply with a quotation within 24 hours.",
        buttonLabel: "Request a Quote",
      },
      // Item No. = SR + 001 (slitter knives) + three-digit model code.
      // Nonwoven models start at 101 and share one sequence across both tables.
      dimensionTables: [
        {
          id: "top",
          tabLabel: "Top Slitter Blades",
          title: "Top Slitter Blades (Shear Cut – Dished & Flat)",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Profile",
            "Material Options",
            "Holder Fit",
          ],
          rows: [
            ["SR001101", "76.2 × 17.0 × 1.00 mm", "Dished", "M2 HSS / D2", "Type 80"],
            [
              "SR001102",
              "90.0 × 22.0 × 1.20 mm",
              "Dished",
              "M2 HSS / Carbide",
              "Type 90",
            ],
            [
              "SR001103",
              "100.0 × 40.0 × 1.20 mm",
              "Dished",
              "M2 HSS / ASP-23",
              "Dienes / Cotta 100",
            ],
            [
              "SR001104",
              "105.0 × 40.0 × 1.50 mm",
              "Dished",
              "M2 HSS / D2",
              "Type 105 / 110",
            ],
            [
              "SR001105",
              "130.0 × 60.0 × 1.50 mm",
              "Dished",
              "M2 HSS / D2",
              "Dienes PSG",
            ],
            [
              "SR001106",
              "150.0 × 70.0 × 2.00 mm",
              "Dished / Flat",
              "D2 / M2 HSS",
              "A.Celli",
            ],
            ["SR001107", "200.0 × 80.0 × 3.00 mm", "Flat", "D2 / Cr12MoV", "—"],
          ],
        },
        {
          id: "bottom",
          tabLabel: "Bottom Rings & Crush Cutters",
          title: "Bottom Slitter Rings & Crush Cutters",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Knife Type",
            "Material Options",
            "Key Specification",
          ],
          rows: [
            [
              "SR001108",
              "80.0 × 50.0 × 15.0 mm",
              "Bottom Anvil Ring",
              "D2 / 52100",
              "H7 Bore, Set Screw",
            ],
            [
              "SR001109",
              "100.0 × 60.0 × 20.0 mm",
              "Double-Edge Ring",
              "D2 / M2 HSS",
              "Air / Solid Shafts",
            ],
            [
              "SR001110",
              "126.0 × 76.2 × 50.0 mm",
              "Multi-Groove Sleeve",
              "D2 / Cr12MoV",
              "Groove Width ±0.01 mm",
            ],
            [
              "SR001111",
              "76.2 × 19.05 × 4.76 mm",
              "Score / Crush Cutter",
              "52100 / M2 HSS",
              "R0.05–R0.1 mm Tip Radius",
            ],
            [
              "SR001112",
              "100.0 × 25.4 × 6.00 mm",
              "Heavy-Duty Crush Cutter",
              "52100 / D2",
              "For Thick Felt & Batting",
            ],
          ],
        },
        {
          id: "additional-nonwoven-knives",
          tabLabel: "Additional Nonwoven Knife Sizes",
          title: "Additional Nonwoven Knife Sizes",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Knife Type"],
          rows: [
            ["SR001834", "75 × 32 × 1.0 mm", "Nonwoven slitter knife"],
            ["SR001835", "100 × 40 × 1.0 mm", "Nonwoven slitter knife"],
            ["SR001836", "100 × 50 × 1.5 mm", "Nonwoven slitter knife"],
            ["SR001837", "120 × 50 × 1.0 mm", "Nonwoven slitter knife"],
            ["SR001838", "120 × 60 × 1.5 mm", "Nonwoven slitter knife"],
            ["SR001839", "150 × 75 × 2.0 mm", "Nonwoven slitter knife"],
          ],
        },
      ],
    },
    description:
      "Replacement slitter knives for spunbond, meltblown and SMS nonwovens. M2 HSS, D2 or carbide options, with custom profiles and application-specific coatings.",
    fullDescription:
      "Nonwoven fabric slitting presents a fundamentally different challenge from film or paper converting: the material has no grain direction, low tensile strength in the cross-machine direction, and a loose, fibrous structure that can fray, distort, or pill at the slit edge if the knife geometry is not matched to the fabric construction and line tension.\n\nSureay nonwoven slitter knives are manufactured from M2 high-speed steel with a specialist rake angle geometry developed specifically for loose-structure spunbond, meltblown, and hydroentangled materials. The optimised positive rake angle shears through fibre bundles cleanly rather than pushing them aside, eliminating the frayed edge and loose fibre slub that cause downstream quality rejections in baby diaper, feminine hygiene, and surgical drape converting lines.\n\n## Nonwoven Fabric Types\n\n**Spunbond PP (S, SS, SSS structures):** The most common nonwoven substrate. Available in 8–120 GSM. Standard M2 HSS at Ra ≤ 0.4μm surface finish, positive rake 15°–20°. Used in hygiene absorbent product converting, geotextile roll slitting, and agricultural mulch film.\n\n**Meltblown (M layer):** Ultra-fine fibre (1–5μm diameter) layers used as the filtration core in N95/FFP2 respirators and surgical masks. Extremely fragile and sensitive to lateral tensile loading. Requires reduced slit speed (60–100 m/min), low-mass knife body to minimise vibration, and electrostatic discharge (ESD) coatings to prevent fibre attraction to the blade face.\n\n**SMS / SMMS Medical Fabrics:** Spunbond-Meltblown-Spunbond composite used in surgical gowns, drapes, and sterilisation wraps. Medical-grade SMS requires validated equipment — we supply material certificates and dimensional reports traceable to your batch number for regulatory compliance.\n\n**Hydroentangled / Wetlaid Nonwovens:** Higher basis weight (50–200 GSM) fabric with more coherent structure. Closer to foam or paper in cutting characteristics — standard D2 or 52100 steel knives perform well on these substrates.\n\n## ESD Coating Option\n\nFor meltblown and electrospun filtration media slitting, an ESD (electrostatic discharge) conductive surface treatment is available that prevents static charge accumulation on the blade face. Static buildup causes lightweight fibres (particularly PP meltblown at <15 GSM) to cling to the blade and transfer as contamination to the reslitted roll edge.",
    link: "/products/nonwoven-slitter-knives",
    isFeatured: false,
    compatibleMachines: ["Tidland", "Pneumatic", "Dienes", "Mario Cotta"],

    specs: [
      { label: "Sizes", value: "OD 60–300 mm" },
      { label: "Materials", value: "M2 HSS, D2, tungsten carbide, 52100" },
      {
        label: "Hardness",
        value: "M2: 62–64 HRC; D2: 60–62 HRC; carbide: 89–92 HRA",
      },
      { label: "Tolerance", value: "Thickness ±0.002 mm" },
      { label: "Interface", value: "H7 bore, set-screw locking" },
      { label: "Geometry", value: "Bevel 25°–45°" },
      {
        label: "Optional Coatings",
        value: "PTFE, TiN, DLC or ESD conductive coating",
      },
      { label: "Rake Angle", value: "15°–20° positive rake" },
      { label: "Surface Finish", value: "Ra ≤0.4 µm" },
      {
        label: "Application",
        value: "Spunbond PP, Meltblown, SMS/SMMS, Hydroentangled, Geotextile",
      },
    ],

    components: [
      {
        id: "rake-geometry",
        tag: "EDGE DESIGN",
        title: "Material Options for Nonwoven Cutting",
        description:
          "M2 HSS, D2, bearing steel and carbide options support replacement orders for different nonwoven webs. Specify the material around your existing knife arrangement and observed edge wear.",
      },
      {
        id: "esd-coating",
        tag: "SURFACE TREATMENT",
        title: "Defined Edge Profiles and Optional Surface Treatments",
        description:
          "Blade profiles and optional PTFE, TiN, DLC or ESD conductive coatings can be specified separately, allowing your order to distinguish the required cutting geometry from the selected surface treatment.",
      },
      {
        id: "medical-traceability",
        tag: "COMPLIANCE",
        title: "Custom Interfaces for Existing Knife Holders",
        description:
          "Custom bores, mounting dimensions and cutting profiles let you source replacement knives for your existing holders from a drawing or sample, including the required shaft fit and locking arrangement.",
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
      "tungsten-carbide-slitter-knives",
    ],
    offers: {
      lowPrice: 20,
      highPrice: 150,
    },
    faqs: {
      technical: [
        {
          question: "Which replacement knife fits my nonwoven slitting holder?",
          answer:
            "Identify whether the station uses shear or crush cutting, then specify the holder, mating component and knife dimensions. Include the web construction and basis weight. Shear knives work with a mating cutting edge; crush cutters press against a supporting surface. For cross-cutting already wound rolls, see [Nonwoven Log Saw Blades](/products/nonwoven-log-saw-blades).",
        },
        {
          question:
            "How should knife material be chosen when nonwoven edges fray or wear increases?",
          answer:
            "Compare the condition of the used edge with the web construction and stability of the cutting pair. Gradual wear and chipping call for different material considerations. Record the current knife material and production conditions when discussing a replacement, so a material change can be evaluated alongside the existing geometry and support arrangement.",
        },
        {
          question:
            "What can cause fraying or loose fibres during nonwoven slitting?",
          answer:
            "Edge wear, unsuitable geometry, unstable support and cutting settings can all contribute to loose fibres. Inspect the cut edge and both working components under normal production conditions. The web construction matters alongside speed and basis weight, so compare these details before changing the blade profile or treating one rake angle as suitable for every nonwoven.",
        },
        {
          question: "Does fibre buildup always require an antistatic coating?",
          answer:
            "No. Residue, blade condition, web handling and the cutting setup should be checked before attributing fibre buildup to static. A conductive coating addresses a different issue from a damaged edge or unstable cutting support. Describe the buildup and current knife configuration when discussing a surface treatment, so the coating choice addresses the observed condition.",
        },
        {
          question:
            "How should custom nonwoven knife profiles and coatings be specified?",
          answer:
            "Send a drawing or sample defining the bore, mounting dimensions and cutting profile. Specify the blade material and coating separately, together with the nonwoven construction and intended cutting station. Keeping geometry and surface treatment distinct makes it easier to compare a replacement with the existing knife and identify exactly what changes in the order.",
        },
        {
          question:
            "Which material and dimensional requirements matter for hygiene-converting knives?",
          answer:
            "Define the required material identification, hardness and dimensional checks in the purchasing specification. Include the dimensions relevant to the holder and mating component, and agree any documentation requirements before ordering. Batch and purchase-order references can then connect the knife configuration with the requested inspection information and support your own supplier qualification process.",
        },
        {
          question:
            "When should nonwoven slitter knives be sharpened or replaced?",
          answer:
            "Persistent fraying or dust alongside a worn edge is a reason to assess sharpening, after checking the cutting setup. Regrinding is suitable only when the required profile and working dimensions can be restored. On shear stations, retain the specified overlap with the lower knife; assess crush profiles against their own drawing. Replace knives when damage or remaining dimensions prevent a usable cutting configuration.",
        },
      ],
      company: [],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Bottom Grooved Anvil Knives (Shear Slitting Bottom Knife)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "bottom-grooved-anvil-knives",
    name: "Bottom Grooved Anvil Knives",
    fullName: "Bottom Grooved Anvil Knives for Shear Slitting",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Bottom Grooved Anvil Knives",
    image: "/images/products/slitter-detail/bottom-grooved-anvil-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement grooved anvil knives and cutting rings for web slitters. Steel or carbide options, with custom groove profiles, bores and locking arrangements.",
    link: "/products/bottom-grooved-anvil-knives",
    isFeatured: true,
    compatibleMachinesIntro:
      "Get replacement bottom grooved anvil knives tailored to your slitting line, with custom groove profiles, bores and locking options. Send us your drawing or sample, and Sureay will help you select the right replacement and prepare a quotation.",
    specs: [
      { label: "Sizes", value: "Grooved rings OD 46–250 mm" },
      {
        label: "Material",
        value:
          "52100, D2, M2 HSS, PM HSS (including ASP23), solid carbide or carbide-tipped construction",
      },
      { label: "Applications", value: "Film, paper, foil and nonwoven slitting" },
      { label: "Razor sleeves", value: "Relieved groove to clear the razor edge" },
      { label: "Groove width tolerance", value: "±0.01 mm" },
      { label: "Face flatness", value: "≤0.003 mm" },
      { label: "Bore tolerance", value: "H6 finish-ground bore" },
      {
        label: "Optional Coatings",
        value: "TiN on the groove face, DLC or PTFE (Teflon)",
      },
      { label: "Runout", value: "≤0.02 mm T.I.R." },
      {
        label: "Mounting",
        value:
          "Plain bore (NN), eccentric lock (NG), set-screw lock (NS), or split-ring / clamp mounting",
      },
      {
        label: "Shear Clearance",
        value: "0.02–0.15 mm, according to the substrate and knife pair",
      },
    ],
    detailLayout: {
      seoTitle: "Bottom Grooved Anvil Knives | Replacement Rings",
      sizeRange: "Grooved rings OD 46–250 mm",
      heroAlt: "Grooved bottom anvil knives and detachable cutting rings",
      specificationImage: {
        src: "/images/products/slitter-detail/bottom-grooved-anvil-knives-detail.webp",
        alt: "Two bottom rings showing the recessed running face and cutting shoulder",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "ring",
          tabLabel: "Grooved Rings",
          title: "Grooved Rings",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Profile or reference"],
          rows: [
            ["SR001451", "46 × 25 × 5 mm", "DIENES dimensional series"],
            ["SR001452", "80 × 60 × 10 mm", "Grooved bottom ring"],
            ["SR001453", "105 × 90 × 15 mm", "Grooved bottom ring"],
            ["SR001454", "105 × 90 × 8 mm", "Kampf dimensional reference"],
            ["SR001455", "105 × 90 × 17 mm", "Kampf dimensional reference"],
          ],
        },
        {
          id: "groove-profile-configurations",
          tabLabel: "Groove Profile Configurations",
          title: "Groove Profile Configurations",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Platform Reference",
            "Groove Profile",
          ],
          rows: [
            [
              "SR001840",
              "70 × 25.4 × 8 / 10 mm",
              "Tidland — Single Groove",
              "W: 1.2 × D: 2.0 / 60°",
            ],
            [
              "SR001841",
              "100 × 60 × 20 / 25 mm",
              "Atlas — 3-Slot Anvil",
              "W: 1.5 × D: 2.5 / 60°",
            ],
            [
              "SR001842",
              "80 × 30 × 10 mm",
              "Mario Cotta — Single Groove",
              "W: 1.3 × D: 2.2 / 45°",
            ],
            [
              "SR001843",
              "130 × 80 × 12 mm",
              "Dienes — Single Groove",
              "W: 1.5 × D: 3.0 / 60°",
            ],
            [
              "SR001844",
              "Per drawing",
              "Custom Anvil / Hardfaced",
              "OEM Spec; Exact CNC Machined Groove",
            ],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Grooved rings OD 46–250 mm" },
        {
          label: "Material",
          value:
            "52100, D2, M2 HSS, PM HSS (including ASP23), solid carbide or carbide-tipped construction",
        },
        { label: "Applications", value: "Film, paper, foil and nonwoven slitting" },
        { label: "Razor sleeves", value: "Relieved groove to clear the razor edge" },
        { label: "Groove width tolerance", value: "±0.01 mm" },
        { label: "Face flatness", value: "≤0.003 mm" },
        { label: "Bore tolerance", value: "H6 finish-ground bore" },
        {
          label: "Optional Coatings",
          value: "TiN on the groove face, DLC or PTFE (Teflon)",
        },
        { label: "Runout", value: "≤0.02 mm T.I.R." },
        {
          label: "Mounting",
          value:
            "Plain bore (NN), eccentric lock (NG), set-screw lock (NS), or split-ring / clamp mounting",
        },
        {
          label: "Shear Clearance",
          value: "0.02–0.15 mm, according to the substrate and knife pair",
        },
      ],
    },
    compatibleMachines: [
      "DIENES",
      "Mario Cotta",
      "Tidland",
      "Kampf",
      "Goebel",
      "Atlas",
      "Nishimura",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Steel and Carbide Anvil Configurations",
        description:
          "Grooved anvil knives are available in tool steel, HSS, PM HSS, solid carbide and carbide-tipped constructions for replacement and application-specific orders.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Ground Grooves, Bores and Locating Faces",
        description:
          "Finish-ground replacement rings are made with the bore, groove profile and locating faces specified for your existing shaft and upper knife.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Groove Profiles and Locking Designs",
        description:
          "Plain-bore, eccentric-lock, screw-lock and split or clamp mounting designs are available with drawing-defined groove profiles and ring widths.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "What defines a replacement grooved bottom anvil knife?",
          answer:
            "The working edge, groove profile, ring width, bore and locking arrangement define the replacement. Include groove depth and the axial position of the cutting edge relative to the mating upper knife. These features establish the working geometry beyond OD and ID. For several cutting positions on one body, see [Multi-Groove Bottom Knives](/products/groove-bottom-knives).",
        },
        {
          question: "What do NN, NG and NS locking types mean?",
          answer:
            "In DIENES terminology, NN means a smooth bore, NG uses eccentric locking, and NS uses screw locking. NN rings are positioned with spacers and axially clamped; NG uses an eccentric ring, while NS uses a screw acting on the shaft. Specify the bore, ring width and working profile alongside the mounting type when ordering replacements.",
        },
        {
          question:
            "Why can paper slit quality remain poor after the top knife is replaced?",
          answer:
            "Paper shear slitting depends on the complete knife pair and its setup. Check the lower working edge, the material pairing, holder condition, overlap, side pressure and cant angle. A new top knife still works against the retained lower knife, so comparing both working surfaces and their adjustment helps identify what remains unresolved in the cutting arrangement.",
        },
        {
          question:
            "Which material or coating suits an anvil knife used with adhesive webs?",
          answer:
            "Separate adhesive pickup from cutting-edge wear. For glue accumulation on an otherwise sound edge, review contact geometry, surface finish and the adhesive system when considering the available TiN, DLC or PTFE options. For wear or chipping, assess the base material and mating knife first. Compare surface options under the same web and cutting conditions to judge whether they address the actual problem.",
        },
        {
          question:
            "Can Sureay supply a custom anvil ring without replacing the top knife?",
          answer:
            "Yes. A replacement ring can be made to the bore, ring width, groove profile, cutting-edge position and locking details required by the existing shaft. Include the retained upper knife's dimensions and working position. For sample-based orders, distinguish worn cutting surfaces from mounting surfaces so the new ring is defined around the upper knife you will keep.",
        },
        {
          question:
            "Can a razor support sleeve replace a shear-slitting anvil?",
          answer:
            "A razor support sleeve provides clearance for the razor edge, while a shear-slitting anvil provides a cooperating cutting edge. Their working profiles serve different cutting methods. Specify the mating blade, cutting method and required edge position when ordering; the presence of a groove alone does not identify the correct lower component.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "rotary-slitter-knives",
      "groove-bottom-knives",
      "slitter-rewinder-bottom-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13.1 Tungsten Carbide Slitter Knives (material page — cuts across
  //      applications rather than competing with the application variants)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Source replacement carbide slitter knives with custom bores, thicknesses and cutting profiles. Sureay offers solid carbide and carbide-ring constructions; share your drawing and application for a quotation on the configuration required by your machine.",
    id: "tungsten-carbide-slitter-knives",
    name: "Tungsten Carbide Slitter Knives",
    fullName: "Tungsten Carbide Slitter Knives – Solid & Tipped",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Tungsten Carbide Slitter Knives",
    image:
      "/images/products/slitter-detail/tungsten-carbide-slitter-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Solid and carbide-tipped replacement slitter knives for converting and metal processing. Custom sizes, bores and cutting profiles matched to the application.",
    link: "/products/tungsten-carbide-slitter-knives",
    specs: [
      {
        label: "Sizes",
        value:
          "Thin profiles: OD 20–300 mm × 0.3–5.0 mm; corrugator OD 220–340 mm; rotary OD 150.1–300.15 mm",
      },
      {
        label: "Material",
        value: "WC-Co carbide in YG6, YG6X, YG8, YG10X, YG12X and YG15 grades",
      },
      {
        label: "Applications",
        value: "Corrugated board, film, electrode web and metal strip",
      },
      { label: "Hardness", value: "89.5–92.5 HRA, depending on carbide grade" },
      { label: "Fine-grain options", value: "0.4–0.8 μm carbide grain size" },
      {
        label: "Construction",
        value: "Solid carbide disc or steel body with a carbide cutting ring",
      },
      {
        label: "Precision options",
        value: "Thickness ±0.002 mm; face parallelism ≤0.005 mm; T.I.R. ≤0.01 mm",
      },
      { label: "Edge finish", value: "Ra 0.2–0.4 μm" },
      {
        label: "Edge Geometry",
        value: "Single bevel, double bevel, hollow-ground or razor profile",
      },
      {
        label: "Optional Coatings",
        value: "DLC, TiN or TiAlN; uncoated knives also available",
      },
      { label: "Transverse Rupture Strength", value: "2,500–3,000 N/mm²" },
    ],
    detailLayout: {
      seoTitle: "Tungsten Carbide Slitter Knives | Custom Sizes",
      sizeRange: "OD 20–340 mm",
      heroAlt: "Three solid tungsten carbide circular slitter knives",
      specificationImage: {
        src: "/images/products/slitter-detail/tungsten-carbide-slitter-knives-detail.webp",
        alt: "Rewinder bottom knife rings showing the body and cutting perimeter",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [corrugatedThinBladeTable, carbideCoilKnifeTable],
      technicalSpecs: [
        {
          label: "Sizes",
          value:
            "Thin profiles: OD 20–300 mm × 0.3–5.0 mm; corrugator OD 220–340 mm; rotary OD 150.1–300.15 mm",
        },
        {
          label: "Material",
          value: "WC-Co carbide in YG6, YG6X, YG8, YG10X, YG12X and YG15 grades",
        },
        {
          label: "Applications",
          value: "Corrugated board, film, electrode web and metal strip",
        },
        { label: "Hardness", value: "89.5–92.5 HRA, depending on carbide grade" },
        { label: "Fine-grain options", value: "0.4–0.8 μm carbide grain size" },
        {
          label: "Construction",
          value: "Solid carbide disc or steel body with a carbide cutting ring",
        },
        {
          label: "Precision options",
          value: "Thickness ±0.002 mm; face parallelism ≤0.005 mm; T.I.R. ≤0.01 mm",
        },
        { label: "Edge finish", value: "Ra 0.2–0.4 μm" },
        {
          label: "Edge Geometry",
          value: "Single bevel, double bevel, hollow-ground or razor profile",
        },
        {
          label: "Optional Coatings",
          value: "DLC, TiN or TiAlN; uncoated knives also available",
        },
        { label: "Transverse Rupture Strength", value: "2,500–3,000 N/mm²" },
      ],
    },
    compatibleMachines: [
      "BHS",
      "Fosber",
      "Dusenbery",
      "DIENES",
      "Tidland",
      "Nishimura",
      "Fagor Arrasate",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Solid and Carbide-Tipped Knife Configurations",
        description:
          "Choose solid carbide discs or steel bodies with carbide cutting rings to match the construction required by your existing slitter and replacement order.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Ground Edge Forms with Optional Coatings",
        description:
          "Single-bevel, double-bevel, hollow-ground and razor profiles can be specified with uncoated surfaces or selected DLC, TiN and TiAlN coatings, giving you control over the blade form and finish you order.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Carbide Knives for Existing Slitters",
        description:
          "Custom bores, axial sections and cutting profiles are available to your knife drawing or machine-specific part reference, so replacement orders can follow the geometry of the installed cutting station.",
        relatedBladeIds: [
          "corrugated-slitter-scorer-blades",
          "metal-coil-slitting-knives",
        ],
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "What is the difference between solid carbide and carbide-tipped knives?",
          answer:
            "A solid carbide knife uses carbide through the knife body. A carbide-tipped knife combines a steel body with a carbide working edge or cutting ring. Specify the construction as well as the mounting geometry. Carbide rotary knives and carbide slitter blades are overlapping purchasing names; neither name identifies the construction or cutting station by itself.",
        },
        {
          question:
            "When should I choose carbide instead of HSS or tool steel slitter knives?",
          answer:
            "Consider carbide in relation to the wear pattern you need to address. A knife that wears gradually presents a different selection problem from one that chips. Compare the current material, edge geometry and working conditions, including support and machine setup. Hardness alone does not establish longer service life, and a harder edge cannot correct poor support or incorrect setup.",
        },
        {
          question:
            "Are YG6, YG8 and similarly named carbide grades interchangeable?",
          answer:
            "Similar grade names do not establish equivalence between suppliers or grading systems. Carbide grain structure, binder content and the intended application also define the material. Provide the specified material requirements and the performance of the current knife when requesting a replacement, so the proposed grade can be assessed beyond its name or nominal hardness.",
        },
        {
          question:
            "Why does a carbide slitter knife chip before it wears out?",
          answer:
            "Impact, excessive edge loading or grinding damage can break a carbide edge before gradual wear becomes the main issue. Inspect the damage location, knife engagement, support and recent sharpening history. Carbide's wear resistance does not remove its sensitivity to shock. Establish whether the problem follows handling, setup or grinding before changing the grade or cutting-edge geometry.",
        },
        {
          question: "Should carbide slitter knives be coated or left uncoated?",
          answer:
            "Both uncoated knives and selected DLC, TiN or TiAlN options are available. Choose with reference to the carbide substrate, processed material and observed wear. Specify the coating separately from the required bore, thickness and cutting profile, so the replacement retains the necessary mounting geometry while the surface option is considered for the actual application.",
        },
        {
          question:
            "Can custom carbide knives be made for an existing slitter?",
          answer:
            "Yes. Sureay can make solid or carbide-tipped knives to a machine-specific drawing or part reference. Define the bore, axial section, cutting profile, mounting and mating component. Include the processed material, such as [metal foil](/products/metal-foil-strip-slitter-knives) or [coated electrode](/products/lithium-battery-slitting-knives), so the material and construction are considered with the complete replacement geometry.",
        },
        {
          question: "Can carbide slitter knives be reground?",
          answer:
            "Yes, where sufficient material remains to restore the specified edge profile and working dimensions. Assess the disc on a solid carbide knife; on a tipped design, also check the remaining carbide ring and its attachment to the body. Specialist carbide grinding and dimensional checks are needed. Extensive damage or insufficient remaining material may make replacement the appropriate option.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "corrugated-slitter-scorer-blades",
      "metal-coil-slitting-knives",
      "lithium-battery-slitting-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. Heavy-Duty Scrap Chopper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "scrap-chopper-blades",
    name: "Scrap Chopper Blades",
    fullName: "Scrap Chopper Blades for Coil Slitting Lines",
    seoTitle: "Scrap Chopper Blades | Custom Coil-Line Knives",
    category: "shear_blades",
    sector: "metal",
    categoryDisplay: "Scrap Chopper Blades",
    image: "/images/products/shear-detail/scrap-chopper-blades-cover.webp",
    badge: "Extreme Impact",
    badgeColor: "orange",
    gallery: [
      "/images/products/shear-detail/scrap-chopper-blades-cover.webp",
      "/images/products/granulator-blades/scrap-chopper-blades-01.webp",
      "/images/products/shear-detail/scrap-chopper-knives-samples.webp",
    ],
    description:
      "Custom replacement scrap chopper blades for coil-line edge trim. S7, H13 or carbide-inlaid knives with straight, raked or profiled cutting arrangements.",
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
    compatibleMachinesIntro:
      "Get replacement scrap chopper knives for your coil slitting line, with S7, H13 or carbide-inlaid cutting edges and custom profiles. Send your existing knife drawing or sample, and Sureay will prepare a quotation for your chopper. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "scrap-chopper-profile",
        tag: "Cutting geometry",
        title: "Tool Steel and Carbide-Inlaid Options",
        description:
          "Sureay offers S7, H13 and carbide-inlaid S7 configurations for steel, aluminium or copper edge trim. The listed hardness for steel knife versions is 54–58 HRC.",
      },
      {
        id: "scrap-chopper-mounting",
        tag: "Installation",
        title: "Straight, Raked and Profiled Cutting Arrangements",
        description:
          "Sureay supplies replacement knives for straight or raked arrangements, including radius and spiral-ground profiles to drawing, so orders can reproduce the working geometry of the installed chopper.",
      },
      {
        id: "scrap-chopper-feed",
        tag: "Coil-line conditions",
        title: "Custom Knife Blocks with Indexable Options",
        description:
          "Square and rectangular bodies are available with machine-specific mounting details. Four-edge versions can be ordered where the original knife configuration supports indexing, alongside individual replacement pieces.",
      },
    ],
    specs: [
      { label: "Sizes", value: "100–400 mm" },
      {
        label: "Material",
        value: "S7 tool steel, H13 tool steel or carbide-inlaid S7",
      },
      { label: "Hardness", value: "Steel knife versions: 54–58 HRC" },
      {
        label: "Blade bodies",
        value: "Square or rectangular profiles; four-edge versions available",
      },
      {
        label: "Chopper configurations",
        value:
          "Straight or raked knife arrangements; radius and spiral-ground profiles to drawing",
      },
      {
        label: "Application",
        value:
          "Steel, aluminium and copper edge-trim scrap from coil slitting lines",
      },
      {
        label: "Cycle Life",
        value: "50,000–200,000 chops, dependent on the material and contamination",
      },
    ],
    relatedBladeIds: ["metal-coil-slitting-knives", "guillotine-shear-blades"],
    offers: { lowPrice: 35, highPrice: 280 },
    faqs: {
      technical: [
        {
          question: "Are scrap chopper blades and edge-trim chopper knives the same product?",
          answer:
            "Yes. On a coil line, both names refer to knives that chop discarded edge trim into short pieces. The chopper assembly determines their working profile and mounting. The circular knives that slit the production coil are [Steel Coil Slitting Knives](/products/metal-coil-slitting-knives).",
        },
        {
          question: "How do strip thickness and trim width affect the knife specification?",
          answer:
            "Strip grade, thickness and trim width describe the material entering the chopper and help define the cutting duty. The chopper assembly establishes the knife body's dimensions and mounting. Review both sets of information when comparing material or edge options, particularly if the line processes a different trim specification from before.",
        },
        {
          question: "Why can scrap chopper knife edges chip?",
          answer:
            "Mechanical overload, unsuitable cutting clearance and doubled edge trim can contribute to chipping. Excessive time between regrinds and an unsuitable material or hardness may also be involved. Examine the feed, cutting setup and damage pattern together. The chopper manufacturer's procedure provides the clearance requirements for the material being processed.",
        },
        {
          question: "What identifies straight, raked, radius and spiral-ground chopper knives?",
          answer:
            "These terms describe the working-edge form or its arrangement in the machine. The knife and assembly drawings establish the contour, orientation and relationship with the opposing edge. Retain those features when ordering a replacement, especially where the same outside block dimensions can accommodate different working profiles.",
        },
        {
          question: "Does every scrap chopper knife have four usable edges?",
          answer:
            "No. Four edges are usable only on knife bodies and mounts designed for four indexing positions. Use the knife drawing to confirm each orientation, inspect the unused edges for damage and restore the specified cutting setup when changing edges.",
        },
        {
          question: "Can worn scrap chopper knives be reground?",
          answer:
            "Yes, if the worn or damaged faces can be restored within the knife's permitted dimensions. Check the cutting profile, seating surfaces and remaining stock against the drawing. A reground knife must still seat correctly and allow the specified cutting clearance.",
        },
        {
          question: "What information do you need to quote edge-trim chopper knives?",
          answer:
            "Send the chopper model, knife drawing or original part number, trim grade, thickness and width, and quantity. Label the cutting position and working profile, especially for raked, radius or spiral-ground knives. If using a sample, mark the faces already reground.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the chopper model, knife drawing, mounting pattern, strip grade, thickness and edge-trim width.",
    disambiguation:
      "For the circular knives that slit the production coil, see [Steel Coil Slitting Knives](/products/metal-coil-slitting-knives).",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 640] },
    specificationImageDimensions: {
      width: 1920,
      height: 1280,
      smallerWidths: [320, 640],
    },
    detailLayout: {
      heroAlt:
        "Two rectangular scrap chopper knives showing mounting holes and cutting edges",
      sizeRange: "100–400 mm",
      heroSpecs: [
        {
          label: "Application",
          value: "Chopping edge trim discharged from a coil slitting line",
        },
      ],
      specificationImage: {
        src: "/images/products/shear-detail/scrap-chopper-knives-samples.webp",
        alt: "Scrap chopper knife samples showing different body profiles and mounting-hole patterns",
      },
      technicalSpecs: [
        { label: "Sizes", value: "100–400 mm" },
        {
          label: "Material",
          value: "S7 tool steel, H13 tool steel or carbide-inlaid S7",
        },
        { label: "Hardness", value: "Steel knife versions: 54–58 HRC" },
        {
          label: "Blade bodies",
          value: "Square or rectangular profiles; four-edge versions available",
        },
        {
          label: "Chopper configurations",
          value:
            "Straight or raked knife arrangements; radius and spiral-ground profiles to drawing",
        },
        {
          label: "Application",
          value:
            "Steel, aluminium and copper edge-trim scrap from coil slitting lines",
        },
        {
          label: "Cycle Life",
          value: "50,000–200,000 chops, dependent on the material and contamination",
        },
      ],
      dimensionTables: [
        {
          id: "standard-dimensions",
          tabLabel: "Standard dimensions",
          title: "Common Standard Dimensions",
          columns: ["Item No.", "Length (mm)", "Width (mm)", "Thickness (mm)"],
          rows: [
            ["SR003301", "100", "40", "15"],
            ["SR003302", "150", "50", "20"],
            ["SR003303", "200", "60", "25"],
            ["SR003304", "250", "80", "25"],
            ["SR003305", "300", "80", "30"],
            ["SR003306", "400", "100", "30"],
          ],
        },
      ],
      inlineRfq: {
        title: "Request a quote for your knife configuration",
        description:
          "Include the chopper model, knife drawing, mounting pattern, strip grade, thickness and edge-trim width.",
        buttonLabel: "Request a quote",
      },
    },
    rfqPlaceholder:
      "Include the chopper model, knife drawing, mounting pattern, strip grade, thickness and edge-trim width.",
    dimensionLabels: {
      intro:
        "Listed dimensions identify catalog configurations. Confirm the drawing, mounting interface, knife position and usable cutting edges; size alone does not identify the chopper model.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Strand Pelletizer Rotors
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "strand-pelletizer-rotors",
    name: "Strand Pelletizer Rotors",
    fullName: "Strand Pelletizer Cutting Rotors",
    category: "custom_profile",
    sector: "recycling",
    categoryDisplay: "Pelletizer Blades",
    image: "/images/products/blades/strand-pelletizer-rotor-01.webp",
    imageDimensions: { width: 1600, height: 1600, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1500, height: 1500, smallerWidths: [320, 480, 640] },
    badge: "PM-HSS & Carbide",
    badgeColor: "blue",
    gallery: [
      "/images/products/blades/strand-pelletizer-rotor-01.webp",
      "/images/products/blades/strand-pelletizer-rotor-02.webp",
      "/images/products/blades/strand-pelletizer-rotor-03.webp",
    ],
    description:
      "Replacement strand pelletizer rotors with helical or straight cutting edges. HSS and carbide options, with custom tooth profiles and shaft ends.",
    link: "/products/strand-pelletizer-rotors",
    isFeatured: true,
    compatibleMachines: [
      "Maag", "Coperion", "Cumberland", "Conair", "Reduction Engineering",
    ],
    compatibleMachinesIntro:
      "Source replacement strand pelletizer rotors with the tooth pattern, working width and shaft interfaces your line requires. Sureay offers helical or straight-edge designs in steel and carbide constructions. Share your drawing or worn rotor for a custom replacement quotation. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "strand-rotor-tooth-layout",
        tag: "Cutting geometry",
        title: "HSS, PM-Steel and Carbide Rotor Options",
        description:
          "Sureay offers M2, M35, ASP2023, ASP2052 and CPM 10V options alongside solid or brazed-carbide cutting constructions, allowing rotor material to be specified for the polymer compound and existing cutter design.",
      },
      {
        id: "strand-rotor-construction",
        tag: "Construction",
        title: "Helical and Straight Cutting Geometries",
        description:
          "Listed cutting diameters span Ø100–250 mm. Sureay supplies helical and straight-edge rotors with tooth count, profile and working width specified for the existing pelletizer.",
      },
      {
        id: "strand-rotor-cutting-pair",
        tag: "Cutting assembly",
        title: "Custom Shaft Ends and Bearing Interfaces",
        description:
          "Rotors can be made with the shaft ends, bearing seats, shoulders and drive connections required by the existing machine, combining the cutting section and mounting interfaces in one replacement specification.",
        relatedBladeIds: ["die-face-cutting-knives"],
      },
    ],
    specs: [
      { label: "Sizes", value: "Ø100–250 mm" },
      {
        label: "Application",
        value: "Cutting cooled polymer strands into pellets",
      },
      {
        label: "Material",
        value:
          "M2, M35, ASP2023, ASP2052, CPM 10V, solid tungsten carbide or brazed carbide",
      },
      {
        label: "Rotor Types",
        value:
          "Helical or straight-edge rotors; solid or brazed-carbide cutting edges",
      },
      {
        label: "Tooth Count",
        value: "10, 12, 16, 24, 32, 48 or 60; custom counts up to 120",
      },
      { label: "Helical Angle", value: "1.5°, 2° or 3°; custom helix available" },
      { label: "Concentricity (Runout)", value: "≤0.005 mm" },
      { label: "Surface Finish", value: "Ra 0.2 µm" },
      { label: "Dynamic Balancing", value: "ISO 1940-1, grade G2.5" },
      {
        label: "Feedstock",
        value:
          "GF/CF compounds, masterbatch, PA, PC, POM, PBT and TPE/TPU/TPV elastomers",
      },
    ],
    relatedBladeIds: ["die-face-cutting-knives", "granulator-blades"],
    offers: {
      lowPrice: 80,
      highPrice: 1200,
    },
    faqs: {
      technical: [
        {
          question: "What identifies a replacement strand pelletizer rotor?",
          answer:
            "The cutting diameter, working width, tooth form, helix and both shaft ends identify the rotor together. Include bearing seats, drive connections and the mating bed knife. Pelletizing cutter rotor is a related purchasing name for the toothed component that cuts polymer strands, while the complete cutting-head assembly contains additional parts.",
        },
        {
          question: "How should rotor material be selected for filled polymer compounds?",
          answer:
            "Consider the polymer, filler type and loading alongside the current edge condition. Abrasive wear and tooth chipping call for different material considerations. Compare the existing HSS, PM-steel or carbide construction with the actual wear pattern and cutting arrangement, including the bed knife, before selecting a different replacement material.",
        },
        {
          question: "How does a strand rotor differ from a die-face cutting knife?",
          answer:
            "A strand rotor cuts formed polymer strands against a stationary bed knife. [Die-Face Cutting Knives](/products/die-face-cutting-knives) are individual blades carried by a hub at the extrusion die face. Some strand systems also cut underwater, so the process location and cutting assembly provide a clearer identification than the word underwater alone.",
        },
        {
          question: "Can changing the tooth count alone change pellet size?",
          answer:
            "Yes. Changing the tooth count can change pellet length even with the same rotor speed and strand feed. Changing the tooth count changes the cutting configuration. For a like-for-like replacement, retain the approved tooth pattern and specify the existing setup and target pellet length separately.",
        },
        {
          question: "Why can pellet quality change even when the rotor edges are sharp?",
          answer:
            "Uneven strand feed or cooling can change pellet quality even when the rotor edges are sharp. Compare the strand condition at the cutting head with the rotor-to-bed knife setup. If the defect changes with the feed, check upstream of the cutting edge as well.",
        },
        {
          question: "Can a strand pelletizer rotor be reground?",
          answer:
            "Yes, when the construction and remaining cutting material allow the specified tooth geometry to be restored. Check the reduced rotor diameter against its working position relative to the bed knife. Record the reground diameter separately when ordering a new rotor.",
        },
        {
          question: "How do I request a quote for a strand pelletizer cutting rotor?",
          answer:
            "Send the pelletizer model, rotor drawing or original reference, polymer and filler, and quantity. Specify the cutting diameter, working width, tooth count and helix direction, and include drawings of both shaft ends and the mating bed knife. Mark the reduced diameter separately if the reference rotor has been reground.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the pelletizer model, rotor drawing, working width, tooth count and profile, shaft ends and bed knife details.",
    dimensionLabels: {
      "col0": "OEM Platform",
      "col1": "Rotor Diameter (mm)",
      "col2": "Cutting Width (mm)",
      "col3": "Tooth Count",
      "col4": "Helix Angle",
      "caption": "* Representative dimensions for common strand pelletizer platforms. All rotors manufactured to exact OEM blueprints or customer sample. Custom diameters, widths, tooth counts, and helix angles available on request."
    },
    standardDimensions: [
      {
        "itemNo": "SR007101",
        "spec": "Maag Primo / Baoli",
        "od": "100 – 200",
        "id": "80 – 300",
        "length": "12 / 16 / 24",
        "teeth": "2° / 3°"
      },
      {
        "itemNo": "SR007102",
        "spec": "Coperion SP Series",
        "od": "120 – 250",
        "id": "100 – 350",
        "length": "16 / 24 / 32",
        "teeth": "1.5° / 2°"
      },
      {
        "itemNo": "SR007103",
        "spec": "Cumberland Quietizer",
        "od": "100 – 180",
        "id": "80 – 250",
        "length": "12 / 16",
        "teeth": "2° / 3°"
      },
      {
        "itemNo": "SR007104",
        "spec": "Conair 304 / 306 / CS",
        "od": "100 – 200",
        "id": "80 – 300",
        "length": "12 / 16 / 24",
        "teeth": "2°"
      },
      {
        "itemNo": "SR007105",
        "spec": "Reduction Engineering SGS",
        "od": "120 – 220",
        "id": "100 – 320",
        "length": "16 / 24 / 32",
        "teeth": "1.5° / 2° / 3°"
      }
    ],
    detailLayout: {
      seoTitle: "Strand Pelletizer Cutting Rotors | Custom Replacement",
      heroAlt: "Strand pelletizer cutting rotor with toothed cutting surface and shaft ends",
      sizeRange: "Ø100–250 mm",
      heroSpecs: [
        { label: "Material", value: "HSS, PM steel or tungsten carbide" },
        { label: "Application", value: "Cutting cooled polymer strands into pellets" },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Ø100–250 mm" },
        {
          label: "Application",
          value: "Cutting cooled polymer strands into pellets",
        },
        {
          label: "Material",
          value:
            "M2, M35, ASP2023, ASP2052, CPM 10V, solid tungsten carbide or brazed carbide",
        },
        {
          label: "Rotor Types",
          value:
            "Helical or straight-edge rotors; solid or brazed-carbide cutting edges",
        },
        {
          label: "Tooth Count",
          value: "10, 12, 16, 24, 32, 48 or 60; custom counts up to 120",
        },
        { label: "Helical Angle", value: "1.5°, 2° or 3°; custom helix available" },
        { label: "Concentricity (Runout)", value: "≤0.005 mm" },
        { label: "Surface Finish", value: "Ra 0.2 µm" },
        { label: "Dynamic Balancing", value: "ISO 1940-1, grade G2.5" },
        {
          label: "Feedstock",
          value:
            "GF/CF compounds, masterbatch, PA, PC, POM, PBT and TPE/TPU/TPV elastomers",
        },
      ],
      specificationImage: {
        src: "/images/products/blades/strand-pelletizer-rotor-03.webp",
        alt: "Strand pelletizer rotor showing its cutting surface and shaft arrangement",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your pelletizer rotor",
        description: "Include the machine model, rotor drawing, working width, tooth form, shaft-end details and quantity.",
        buttonLabel: "Request a quote",
      },
    },
    disambiguation:
      "For blades mounted on a die-face cutter hub, see [Die-Face Cutting Knives](/products/die-face-cutting-knives).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Continuous Melt Filter Scraper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "continuous-melt-filter-scraper-blades",
    name: "Melt Filter Scraper Blades",
    fullName: "Continuous Melt Filter Scraper Blades",
    category: "custom_profile",
    sector: "recycling",
    categoryDisplay: "Melt Filter Scraper Blades",
    image: "/images/products/blades/scraper-blades.webp",
    imageDimensions: { width: 2560, height: 1440, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1280, height: 720, smallerWidths: [320, 480, 640] },
    badge: "PCR Recycling",
    badgeColor: "orange",
    gallery: [
      "/images/products/blades/scraper-blades.webp",
      "/images/products/blades/scraper-blades-01.webp",
      "/images/products/blades/scraper-blades-02.webp",
    ],
    description:
      "Replacement scraper blades for continuous plastic melt filters. D2, H13 and carbide options, with custom profiles and mounting details to drawing.",
    link: "/products/continuous-melt-filter-scraper-blades",
    isFeatured: true,
    compatibleMachines: [
      "EREMA", "Gneuß", "Ettlinger", "FIMIC", "Kreyenborg", "Nordson BKG",
    ],
    compatibleMachinesIntro:
      "Get replacement melt-filter scraper blades with custom working edges, body profiles and carrier mountings. Sureay offers D2, H13 and carbide configurations with surface-treatment options for your melt service. Send your drawing or sample for a quotation tailored to your filter. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "melt-scraper-working-edge",
        tag: "Working edge",
        title: "Steel and Carbide Scraper Options",
        description:
          "D2, H13 and solid-carbide configurations give you material choices for replacement melt-filter scrapers, specified with the polymer, contaminants and mating screen in view.",
      },
      {
        id: "melt-scraper-carrier",
        tag: "Installation",
        title: "Custom Edges and Carrier Mounting Profiles",
        description:
          "Listed scraper lengths span 150–500 mm. Sureay can make the outline, thickness and carrier mounting features to the filter drawing so the new scraper places its working edge at the specified position against the screen.",
      },
      {
        id: "melt-scraper-material",
        tag: "Material options",
        title: "Surface Options for Specified Melt Service",
        description:
          "Barrier-coating and corrosion-resistant alloy options are available for specified PVC and mixed-plastic melt service, allowing the surface and material requirements to be included in the blade enquiry.",
      },
    ],
    specs: [
      { label: "Sizes", value: "150–500 mm" },
      {
        label: "Application",
        value: "Removal of contamination from a melt filter screen",
      },
      { label: "Part position", value: "Scraper carrier at the filter screen" },
      {
        label: "Material",
        value: "D2 tool steel, H13 hot-work steel or solid tungsten carbide",
      },
      { label: "Steel Blade Hardness", value: "HRC 58–62" },
      { label: "Profile Tolerance", value: "±0.05 mm" },
      { label: "Thickness Tolerance", value: "±0.02 mm" },
      {
        label: "Operating Temperature",
        value: "Up to 300 °C for H13 or carbide configurations",
      },
      {
        label: "Optional Coatings",
        value: "Barrier coatings for PVC and mixed-plastic melt service",
      },
      {
        label: "Corrosion Resistance",
        value: "HCl-resistant alloy options for PVC and mixed-plastic melt service",
      },
      {
        label: "Feedstock",
        value:
          "PCR HDPE/PP, glass-filled compounds, PVC blends, agricultural film and WEEE plastics",
      },
    ],
    relatedBladeIds: ["cutter-compactor-blades", "die-face-cutting-knives"],
    offers: {
      lowPrice: 35,
      highPrice: 480,
    },
    faqs: {
      technical: [
        {
          question: "What do melt filter knives and scraper blades refer to?",
          answer:
            "They describe the replaceable elements that lift retained contamination from the filter-screen surface. The perforated screen performs filtration and the carrier locates the scraper. Identify the installed position and part reference when ordering, so the blade, screen and carrier are each specified as the required component.",
        },
        {
          question: "Which features identify a replacement melt-filter scraper?",
          answer:
            "Use the filter model and version, blade outline, working-edge profile, thickness and carrier mounting. The edge must occupy the intended position relative to the screen. Overall length is only one identifier, particularly when similarly named continuous filters use different screen or scraper mechanisms.",
        },
        {
          question: "How should scraper material be chosen for contaminated plastic melt?",
          answer:
            "Consider the polymer, contaminant type, melt-service conditions and the mating screen specification together. Compare gradual edge wear with local damage in the used scraper. The selected steel or carbide construction must suit the filter's contact arrangement, with any coating or corrosion-resistance requirement recorded separately.",
        },
        {
          question: "Does a self-cleaning melt filter use a universally interchangeable scraper?",
          answer:
            "No. A self-cleaning melt filter's scraper must match the working profile, carrier and screen of that specific assembly. Some OEM systems use controlled contact with a harder screen to maintain the edge. The replacement needs to preserve the geometry and material pairing specified for the filter.",
        },
        {
          question: "What should be reviewed when contamination is no longer removed effectively?",
          answer:
            "Check whether the scraper edge still makes the intended contact with the screen. Contaminant load or an obstruction in the discharge system can also affect removal. Compare those conditions with changes in the melt feed and use the filter maker's service procedure to identify the part that needs attention.",
        },
        {
          question: "What should I send for a melt filter scraper blade quote?",
          answer:
            "Send the filter model and version, scraper drawing or part number, polymer and contaminants, and quantity. Add the carrier mounting and retained screen specification. If you use a sample, show which way it mounts on the carrier and mark the worn working edge.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the filter model, scraper drawing, screen plate details, polymer and typical contaminants.",
    dimensionLabels: {
      "col0": "Filter Model / OEM",
      "col1": "Blade Length (mm)",
      "col2": "Blade Width (mm)",
      "col3": "Thickness (mm)",
      "caption": "* Representative dimensions for common continuous melt filter platforms. All blades reverse-engineered to exact OEM drawing or customer sample. Custom geometries and mounting interfaces available on request."
    },
    standardDimensions: [
      {
        "itemNo": "SR007201",
        "spec": "EREMA",
        "od": "180 – 420",
        "id": "25 – 40",
        "thickness": "6 / 8"
      },
      {
        "itemNo": "SR007202",
        "spec": "Gneuß Rotary System",
        "od": "150 – 380",
        "id": "20 – 35",
        "thickness": "5 / 8"
      },
      {
        "itemNo": "SR007203",
        "spec": "Ettlinger ERF 200/350",
        "od": "200 / 350",
        "id": "30 / 40",
        "thickness": "8 / 10"
      },
      {
        "itemNo": "SR007204",
        "spec": "FIMIC",
        "od": "160 – 400",
        "id": "22 – 38",
        "thickness": "6 / 8"
      },
      {
        "itemNo": "SR007205",
        "spec": "Kreyenborg KSF",
        "od": "200 – 500",
        "id": "30 – 50",
        "thickness": "8 / 12"
      },
      {
        "itemNo": "SR007206",
        "spec": "Nordson BKG",
        "od": "150 – 350",
        "id": "20 – 35",
        "thickness": "5 / 8"
      }
    ],
    detailLayout: {
      seoTitle: "Melt Filter Scraper Blades | Custom Replacements",
      heroAlt: "Replacement scraper blades for a continuous melt filter",
      sizeRange: "150–500 mm",
      heroSpecs: [
        { label: "Material", value: "D2, H13 or tungsten carbide" },
        { label: "Application", value: "Continuous plastic melt filtration" },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "150–500 mm" },
        {
          label: "Application",
          value: "Removal of contamination from a melt filter screen",
        },
        { label: "Part position", value: "Scraper carrier at the filter screen" },
        {
          label: "Material",
          value: "D2 tool steel, H13 hot-work steel or solid tungsten carbide",
        },
        { label: "Steel Blade Hardness", value: "HRC 58–62" },
        { label: "Profile Tolerance", value: "±0.05 mm" },
        { label: "Thickness Tolerance", value: "±0.02 mm" },
        {
          label: "Operating Temperature",
          value: "Up to 300 °C for H13 or carbide configurations",
        },
        {
          label: "Optional Coatings",
          value: "Barrier coatings for PVC and mixed-plastic melt service",
        },
        {
          label: "Corrosion Resistance",
          value: "HCl-resistant alloy options for PVC and mixed-plastic melt service",
        },
        {
          label: "Feedstock",
          value:
            "PCR HDPE/PP, glass-filled compounds, PVC blends, agricultural film and WEEE plastics",
        },
      ],
      specificationImage: {
        src: "/images/products/blades/scraper-blades-02.webp",
        alt: "Melt filter scraper blades showing their body profiles and working edges",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your melt filter scraper",
        description: "Include the filter model, blade drawing or sample, carrier details, polymer and required quantity.",
        buttonLabel: "Request a quote",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Shredder Screens & Screen Baskets
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement screen baskets and plates made around your shredder's mounting layout, curvature and aperture pattern. Sureay offers custom hole arrangements and wear-material options. Share your screen drawing or sample for a quotation tailored to your discharge-screening application. Machine brands are compatibility references for Sureay aftermarket parts.",
    id: "shredder-screens",
    name: "Shredder Screens",
    fullName: "Shredder Screens, Baskets & Screen Plates",
    seoTitle: "Replacement Shredder Screens | Custom Baskets & Plates",
    category: "shredder_blades",
    sector: "recycling",
    categoryDisplay: "Shredder Screens",
    image: "/images/products/shredder-screens/shredder-screens-04-square.webp",
    imageDimensions: { width: 836, height: 836, smallerWidths: [320, 640] },
    specificationImageDimensions: standardSquareImage,
    badge: "Wear Parts",
    badgeColor: "teal",
    gallery: [
      "/images/products/shredder-screens/shredder-screens-04-square.webp",
      "/images/products/shredder-screens/shredder-screens-02.webp",
      "/images/products/shredder-screens/shredder-screens-01.webp",
    ],
    galleryAlts: [
      "Half-round perforated shredder screen basket with mounting flanges, showing staggered round hole pattern",
      "Batch of perforated shredder screen baskets prepared for export shipment",
      "Stack of curved shredder screen plates on a pallet, showing staggered round hole pattern",
    ],
    description:
      "Replacement screens for single-shaft shredders, with 8–80 mm apertures. Custom baskets and plates matched to the hole pattern, curvature and mounting.",
    disambiguation:
      "For the moving cutting tools, see [Single-Shaft Shredder Rotor Knives](/products/single-shaft-shredder-blades).",
    link: "/products/shredder-screens",
    specs: [
      {
        label: "Screen Forms",
        value: "Basket (half/full round) · Flat Plate · Sickle · Cassette",
      },
      { label: "Sizes", value: "Apertures 8–80 mm" },
      {
        label: "Material",
        value: "S355J2 · Hardox 400 / 450 / 500 · Hardfaced",
      },
      { label: "Open Area", value: "34 – 58% (pattern-dependent)" },
      { label: "Hole Pattern", value: "60° staggered · Straight · Slotted" },
      { label: "Application", value: "Discharge screening in single-shaft shredders" },
      {
        label: "OEM Fitment",
        value: "Lindner, Vecoplan, UNTHA, WEIMA, Herbold, ZERMA",
      },
    ],
    relatedBladeIds: [
      "single-shaft-shredder-blades",
      "single-shaft-bed-knives",
      "granulator-blades",
    ],
    dimensionLabels: {
      col0: "Output Class",
      col1: "Hole Ø (mm)",
      col2: "Plate Thickness (mm)",
      col3: "Ligament (mm)",
      caption:
        "* Representative round-hole specifications on a 60° staggered pitch. Square, slotted and mixed-pattern screens available. Every screen is rolled to the customer's rotor radius — send the machine model or a photograph of the worn screen for reverse engineering.",
    },
    standardDimensions: [
      {
        itemNo: "SR002701",
        spec: "Fine regrind — PET flake, film",
        od: "8",
        bolt: "12 – 15",
        thickness: "5",
      },
      {
        itemNo: "SR002702",
        spec: "Fine regrind — PET flake, film",
        od: "10",
        bolt: "12 – 15",
        thickness: "5",
      },
      {
        itemNo: "SR002703",
        spec: "General regrind",
        od: "12",
        bolt: "15",
        thickness: "6",
      },
      {
        itemNo: "SR002704",
        spec: "General regrind",
        od: "16",
        bolt: "15 – 20",
        thickness: "7",
      },
      {
        itemNo: "SR002705",
        spec: "Coarse regrind",
        od: "20",
        bolt: "20",
        thickness: "8",
      },
      {
        itemNo: "SR002706",
        spec: "Coarse regrind",
        od: "25",
        bolt: "20 – 25",
        thickness: "9",
      },
      {
        itemNo: "SR002707",
        spec: "Pre-shred / bulky waste",
        od: "30",
        bolt: "25",
        thickness: "10",
      },
      {
        itemNo: "SR002708",
        spec: "Pre-shred / bulky waste",
        od: "40",
        bolt: "25 – 30",
        thickness: "12",
      },
      {
        itemNo: "SR002709",
        spec: "Primary shred / RDF",
        od: "50 – 80",
        bolt: "30",
        thickness: "14 – 20",
      },
    ],
    offers: {
      lowPrice: 120,
      highPrice: 1900,
    },
    components: [
      {
        id: "shredder-screens-advantage-1",
        tag: "Plate and Wear-Resistant Material Options",
        title: "Plate and Wear-Resistant Material Options",
        description:
          "S355J2, Hardox 400, 450 and 500, and hardfaced configurations give you material options for replacement shredder screens, with the chosen construction specified for the feed and panel design.",
      },
      {
        id: "shredder-screens-advantage-2",
        tag: "Custom Apertures from 8 to 80 mm",
        title: "Custom Apertures from 8 to 80 mm",
        description:
          "Sureay makes round and slotted screen patterns. Listed apertures span 8–80 mm. Aperture size and pitch can be specified together to reproduce the discharge openings and the material left between them.",
      },
      {
        id: "shredder-screens-advantage-3",
        tag: "Formed Baskets, Plates and Cassette Screens",
        title: "Formed Baskets, Plates and Cassette Screens",
        description:
          "Half-round or full-round baskets, flat plates, sickle forms and cassette configurations can be made to the required curvature and fixing layout for your existing screen supports.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which details identify a replacement shredder screen?",
          answer:
            "The machine model, panel outline, plate thickness, curvature and fixing positions establish fit. Hole size and pattern define the discharge openings. A flat plate and a curved basket can share an aperture size while requiring different installation geometry, so use the original panel drawing or unworn reference dimensions for the replacement.",
        },
        {
          question: "How do I choose a shredder screen aperture size?",
          answer:
            "Start with the downstream size requirement and the feed shape. Smaller apertures generally target finer output, while larger openings allow coarser material to discharge. Flat or flexible feed can pass differently from rigid pieces, so confirm the existing hole shape and machine configuration. The aperture is an opening size. Actual output has a size distribution.",
        },
        {
          question: "What do screen basket, cassette and screen plate mean?",
          answer:
            "A basket describes a curved screen form, while a plate may be flat or shaped. Cassette describes a removable assembly that can include supporting features. The actual scope of the replacement should identify the perforated panel, frame and fixing details, because these purchasing names can refer to different assemblies on different machines.",
        },
        {
          question: "Can hole shape and pitch be customized?",
          answer:
            "Yes. Sureay can make the specified aperture and spacing pattern to the screen drawing. Hole pitch, opening size and plate thickness should be considered together because they determine the open area and material remaining between holes. Include the mounting layout when proposing a pattern change for an existing basket or panel.",
        },
        {
          question: "How do I choose between structural steel, Hardox and hardfaced screens?",
          answer:
            "Compare feed abrasiveness and impact with the current screen's wear pattern, thickness and formed geometry. Hardox grades and hardfaced constructions provide alternatives to the listed structural-steel option. Specify the required plate or surface construction explicitly, keeping the machine's support and fixing requirements part of the replacement design.",
        },
        {
          question: "Why does material accumulate at a shredder screen?",
          answer:
            "An opening pattern that works with one feed may clog with another, particularly when processing flat material. Compare the accumulated material with the hole pattern and condition before changing aperture size. Screen geometry can address feed-specific passage problems, but a replacement should retain the support and mounting arrangement required by the machine.",
        },
        {
          question: "How do I get a quote for a replacement shredder screen or basket?",
          answer:
            "Send the shredder model and screen drawing or part number, panel quantity, feed and target output size. For a custom basket, show the mounting pattern, curvature, plate thickness and hole layout. If a worn panel is your reference, flag enlarged holes, bent areas and damaged fixings.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the machine model, hole shape and size, pitch, plate thickness, panel radius and fixing positions. For Ø100 mm round holes, send the model and screen drawing so we can check the configuration.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Cutter Compactor Blades (Rotor & Stator Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cutter-compactor-blades",
    legacyLocaleSeoTitle: "Cutter Compactor Blades | OEM Replacement",
    seoDescription:
      "Prepare PE or PP film and PET flakes for extrusion with replacement rotor and stator knives in D2, M2 HSS or carbide-tipped construction.",
    name: "Cutter Compactor Blades",
    fullName: "Cutter Compactor Blades for Extrusion Lines",
    category: "custom_profile",
    sector: "recycling",
    categoryDisplay: "Cutter Compactor Blades",
    image:
      "/images/products/cutter-compactor-blades/cutter-compactor-blades-02.webp",
    imageDimensions: { width: 1500, height: 1500, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1920, height: 1920, smallerWidths: [320, 480, 640] },
    badge: "PCR Recycling",
    badgeColor: "orange",
    gallery: [
      "/images/products/cutter-compactor-blades/cutter-compactor-blades-02.webp",
      "/images/products/cutter-compactor-blades/cutter-compactor-blades-00.webp",
      "/images/products/cutter-compactor-blades/cutter-compactor-blades-01.webp",
    ],
    galleryAlts: [
      "Pair of cutter compactor stator knives showing the ground bevel and countersunk mounting",
      "Cutter compactor blade set — rotor knife, knife holder block and stator knife",
      "Long cutter compactor rotor knife with ground cutting edge and counterbored fixing hole",
    ],
    description:
      "Replacement rotor and stator knives for plastic cutter compactors. D2, M2 HSS and carbide-tipped options, with custom profiles for extrusion feed preparation.",
    link: "/products/cutter-compactor-blades",
    compatibleMachines: [
      "EREMA", "NGR", "Starlinger", "Erdwich", "Previero", "Sorema", "Plasmac", "Munchy",
    ],
    compatibleMachinesIntro:
      "Source replacement cutter-compactor knives for your extrusion line, including rotor, stator and pre-cutter positions. Sureay offers custom profiles in D2, M2 HSS and carbide-tipped constructions. Share your drawing or sample for a quotation covering the knives and separately specified holder blocks. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "compactor-knife-positions",
        tag: "Knife positions",
        title: "Steel and Carbide-Tipped Cutting Options",
        description:
          "D2, M2 HSS and carbide-tipped knives give you material and construction choices for plastic feed preparation, with the replacement specified around the feed form and existing knife position.",
      },
      {
        id: "compactor-edge-construction",
        tag: "Edge construction",
        title: "Rotor, Stator and Pre-Cutter Knives",
        description:
          "Sureay supplies moving, fixed and pre-cutter knives for cutter-compactor assemblies. Listed knife lengths span 80–400 mm. Each position can be ordered separately or coordinated with the other cutting positions in the assembly.",
      },
      {
        id: "compactor-process-position",
        tag: "Process position",
        title: "Custom Profiles with Holder Blocks",
        description:
          "Custom blade outlines, fixing features and cutting profiles can be quoted alongside the required holder blocks, keeping the blade and its supporting parts aligned with your existing assembly.",
        relatedBladeIds: ["granulator-blades"],
      },
    ],
    specs: [
      { label: "Sizes", value: "80–400 mm" },
      { label: "Application", value: "Preconditioning feedstock before extrusion" },
      {
        label: "Knife Types",
        value:
          "Rotor knives, fixed stator knives, pre-cutter knives and knife holder blocks",
      },
      {
        label: "Material",
        value: "D2 (1.2379), M2 HSS (1.3343) or carbide-tipped construction",
      },
      {
        label: "Hardness",
        value: "D2: HRC 58–61; M2: HRC 62–64; carbide cutting edge: HRA 89–91",
      },
      { label: "Face Flatness", value: "≤0.03 mm over the blade length" },
      { label: "Parallelism", value: "≤0.02 mm" },
      {
        label: "Feedstock",
        value: "PE / PP film, PET flake, woven bags, fibre and foam",
      },
      { label: "Typical Cutting Gap", value: "0.2–0.5 mm (machine-dependent)" },
      {
        label: "Heat Treatment",
        value: "Vacuum hardening and deep cryogenic treatment (−196°C)",
      },
    ],
    relatedBladeIds: [
      "granulator-blades",
      "continuous-melt-filter-scraper-blades",
    ],
    offers: {
      lowPrice: 40,
      highPrice: 560,
    },
    faqs: {
      technical: [
        {
          question: "Are agglomerator knives and cutter-compactor blades the same?",
          answer:
            "Yes, the names can refer to knives on the same extrusion feed-preparation equipment. The actual part depends on the machine and on whether the knife sits on the rotor, stator or pre-cutting station.",
        },
        {
          question: "How do flexible film and pre-cut flakes affect knife selection?",
          answer:
            "Flexible film and pre-cut flakes present different feed forms to the preconditioning unit. Compare the installed knife position and bevel with the material being processed. Retaining those details helps specify a replacement, while a change of feed form may require review of the machine's intended knife configuration.",
        },
        {
          question: "When should carbide-tipped compactor knives be considered?",
          answer:
            "Evaluate carbide-tipped edges when the current steel knife's wear pattern suggests an abrasive duty, alongside the cleanliness and consistency of the feed. Recurring impact damage calls for a separate assessment of contamination and edge support. Compare the complete blade construction and bevel with the original rotor or stator configuration.",
        },
        {
          question: "Can a granulator knife replace a cutter-compactor knife?",
          answer:
            "Generally no. Cutter-compactor knives prepare feed for extrusion, while [Plastic Granulator Knives](/products/granulator-blades) cut material into regrind. Choose by the working position, knife seat and cutting profile even if the two blades have similar lengths or hole spacing.",
        },
        {
          question: "Can Sureay supply rotor and stator knives together?",
          answer:
            "Yes. Moving and fixed knives can be included in one order with each position separately identified. List any pre-cutter knives and holder blocks as distinct items. The machine model and drawings define the relevant profiles, cutting directions and quantities for the complete replacement requirement.",
        },
        {
          question: "How do I get a quote for cutter compactor knives and holder blocks?",
          answer:
            "Send the machine model, drawings or part numbers and quantities by rotor, stator and pre-cutter position. Describe whether you process film or pre-cut flakes, and indicate whether holder blocks are needed. If the reference knife was sharpened, distinguish its remaining edge position from the original dimension.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the compactor model, rotor or stationary position, blade drawing, polymer, feed form and wear pattern.",
    dimensionLabels: {
      "col0": "Knife Type",
      "col1": "Length (mm)",
      "col2": "Width (mm)",
      "col3": "Thickness (mm)",
      "caption": "* Representative envelope sizes across common compactor platforms. Every blade is manufactured to the OEM drawing or reverse-engineered from your sample — send the machine model and a photograph of the worn blade for an exact quotation."
    },
    standardDimensions: [
      {
        "itemNo": "SR007301",
        "spec": "Rotor knife (movable)",
        "od": "150 – 250",
        "bolt": "40 – 60",
        "thickness": "8 – 12"
      },
      {
        "itemNo": "SR007302",
        "spec": "Rotor knife (movable)",
        "od": "250 – 400",
        "bolt": "60 – 80",
        "thickness": "12 – 20"
      },
      {
        "itemNo": "SR007303",
        "spec": "Stator knife (fixed)",
        "od": "120 – 220",
        "bolt": "40 – 60",
        "thickness": "10 – 16"
      },
      {
        "itemNo": "SR007304",
        "spec": "Stator knife (fixed)",
        "od": "220 – 350",
        "bolt": "60 – 80",
        "thickness": "16 – 25"
      },
      {
        "itemNo": "SR007305",
        "spec": "Pre-cutter / feed blade",
        "od": "80 – 160",
        "bolt": "30 – 50",
        "thickness": "8 – 14"
      },
      {
        "itemNo": "SR007306",
        "spec": "Knife holder block",
        "od": "60 – 120",
        "bolt": "50 – 90",
        "thickness": "20 – 40"
      }
    ],
    detailLayout: {
      seoTitle: "Cutter Compactor Blades | Rotor & Stator Knives",
      heroAlt: "Cutter compactor stator knives with ground cutting edges and mounting features",
      sizeRange: "80–400 mm",
      heroSpecs: [
        { label: "Material", value: "D2, M2 HSS or carbide-tipped construction" },
        { label: "Application", value: "Preconditioning plastics before extrusion" },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "80–400 mm" },
        { label: "Application", value: "Preconditioning feedstock before extrusion" },
        {
          label: "Knife Types",
          value:
            "Rotor knives, fixed stator knives, pre-cutter knives and knife holder blocks",
        },
        {
          label: "Material",
          value: "D2 (1.2379), M2 HSS (1.3343) or carbide-tipped construction",
        },
        {
          label: "Hardness",
          value: "D2: HRC 58–61; M2: HRC 62–64; carbide cutting edge: HRA 89–91",
        },
        { label: "Face Flatness", value: "≤0.03 mm over the blade length" },
        { label: "Parallelism", value: "≤0.02 mm" },
        {
          label: "Feedstock",
          value: "PE / PP film, PET flake, woven bags, fibre and foam",
        },
        { label: "Typical Cutting Gap", value: "0.2–0.5 mm (machine-dependent)" },
        {
          label: "Heat Treatment",
          value: "Vacuum hardening and deep cryogenic treatment (−196°C)",
        },
      ],
      specificationImage: {
        src: "/images/products/cutter-compactor-blades/cutter-compactor-blades-01.webp",
        alt: "Cutter compactor rotor knife with a ground cutting edge and fixing hole",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your compactor knives",
        description: "Include the machine model, rotor or stator position, blade drawing or sample, feed form and quantity.",
        buttonLabel: "Request a quote",
      },
    },
    disambiguation:
      "For regrind production, see [Plastic Granulator Knives](/products/granulator-blades).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Die Face Cutting Knives & Underwater Pelletizer Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "die-face-cutting-knives",
    name: "Die-Face Cutting Knives",
    fullName: "Die-Face Cutting Knives for Plastic Pelletizers",
    category: "custom_profile",
    sector: "recycling",
    categoryDisplay: "Die Face Cutting Knives",
    image:
      "/images/products/die-face-cutting-knives/die-face-cutting-knives-00.webp",
    imageDimensions: { width: 1200, height: 1200, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1199, height: 899, smallerWidths: [320, 480, 640] },
    badge: "Die-Safe",
    badgeColor: "blue",
    gallery: [
      "/images/products/die-face-cutting-knives/die-face-cutting-knives-00.webp",
      "/images/products/die-face-cutting-knives/die-face-cutting-knives-02.webp",
      "/images/products/die-face-cutting-knives/die-face-cutting-knives-01.webp",
    ],
    galleryAlts: [
      "Range of die face cutting knife profiles — straight, forked, stepped and tapered geometries",
      "Close-up of a single die face cutting knife showing the ground cutting edge and twin mounting slots",
      "Pair of die face cutting knives on a white background showing slot geometry and edge finish",
    ],
    description:
      "Replacement die-face pelletizer knives for underwater, water-ring and hot-face systems. Custom blade slots, edge profiles and matched sets to drawing.",
    link: "/products/die-face-cutting-knives",
    isFeatured: true,
    compatibleMachines: [
      "Gala", "Nordson BKG", "Maag", "ECON", "Coperion", "Starlinger", "NGR", "Tecnova", "IPS", "Filtec",
    ],
    compatibleMachinesIntro:
      "Get replacement die-face cutting knives made for your cutter hub, with custom slots, shoulders and edge profiles. Sureay offers matched knife sets in steel, HSS, stainless and carbide configurations. Send your drawings for a quotation tailored to your pelletizing system. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "die-face-body-profiles",
        tag: "Body profiles",
        title: "Material Choices for the Blade-and-Die Pair",
        description:
          "Sureay offers D2, M2 HSS, T42, PM-HSS, 440C stainless steel and carbide configurations, allowing knife material to be selected with the polymer and mating die plate.",
      },
      {
        id: "die-face-working-edge",
        tag: "Working edge",
        title: "Custom Bodies and Working-Edge Profiles",
        description:
          "Listed knife bodies span 45–70 mm in length. Sureay makes straight, forked and stepped bodies with the slots, seating faces and square, bevelled or curved working edges specified for the installed cutter hub.",
      },
      {
        id: "die-face-pelletizing-station",
        tag: "Pelletizing method",
        title: "Matched Knife Sets and Companion Components",
        description:
          "Order matched knife sets made to a common drawing, with blade thickness, seating geometry and cutting direction specified for the required hub positions. Hubs and die plates can be included in the enquiry.",
        relatedBladeIds: ["strand-pelletizer-rotors"],
      },
    ],
    specs: [
      { label: "Application", value: "Pellet cutting at the extrusion die face" },
      {
        label: "Material",
        value: "D2, M2 HSS, T42, PM-HSS, 440C stainless steel or carbide",
      },
      {
        label: "Edge Geometry",
        value: "45° bevel, 90° square, stepped bevel or curved / hooked edge",
      },
      { label: "Sizes", value: "45–70 mm" },
      {
        label: "Thickness Consistency",
        value: "≤0.01 mm variation within a matched set",
      },
      { label: "Flatness", value: "≤0.01 mm" },
      {
        label: "Pelletizing Methods",
        value: "Underwater, water-ring or hot die-face pelletizing",
      },
      {
        label: "Hardness Differential",
        value:
          "Blade hardness below the mating die plate (controlled-wear configuration)",
      },
      {
        label: "Supply Format",
        value: "Matched sets, CMM-verified; hubs and die plates available",
      },
    ],
    drawings: {
      intro:
        "These drawing examples show how body shape, mounting slots and flank angles vary by cutter hub. Use your approved drawing or a measured sample when requesting a replacement.",
      items: [
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-00.webp",
          caption: "Straight body, twin slot — 45 × 25 mm, Ø5.5 slots",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-01.webp",
          caption: "Forked, three open slots — 55 × 34 mm, R3.5",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-02.webp",
          caption: "Straight body, twin slot — 60 × 28 mm, 15 mm pitch",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-03.webp",
          caption: "Straight body, twin slot — 60 × 30 mm, R3.5",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-04.webp",
          caption: "Straight body, long slot — 60 × 34 mm, R3.3",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-05.webp",
          caption: "Stepped shoulder, 129° flank — 60 × 35 mm",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-06.webp",
          caption: "Wide body, radiused heel — 60 × 46 mm, 2 × R5",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-07.webp",
          caption: "Wide body, offset slots — 60 × 46 mm, 2 × R5",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-08.webp",
          caption: "Wide body, centred slots — 60 × 46 mm, 16 mm pitch",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-09.webp",
          caption: "Tall body, twin slot — 69 × 34 mm, Ø7 slots",
        },
        {
          image:
            "/images/products/die-face-cutting-knives/die-face-cutting-knife-drawing-10.webp",
          caption: "Tapered neck, 63° flanks — 70 mm, 60 → 25 mm",
        },
      ],
    },
    relatedBladeIds: [
      "strand-pelletizer-rotors",
      "continuous-melt-filter-scraper-blades",
    ],
    offers: {
      lowPrice: 18,
      highPrice: 320,
    },
    faqs: {
      technical: [
        {
          question: "Which replacement die-face knife fits my pelletizer?",
          answer:
            "Identify the pelletizer and cutter hub, then specify the knife body, thickness, fixing slots, seating face and cutting direction. Die-face knives and hot-face pelletizer blades are related purchasing terms. The complete working profile and mounting relationship establish the particular replacement within that machine.",
        },
        {
          question: "Are underwater, water-ring and hot-face pelletizer knives interchangeable?",
          answer:
            "No. Underwater, water-ring and hot-face machines can use different hubs, mounting features and blade profiles. Match the actual hub and knife drawing. If the machine cuts strands underwater with a toothed rotor and bed knife, see [Strand Pelletizer Rotors](/products/strand-pelletizer-rotors).",
        },
        {
          question: "Why does die-plate material matter when choosing the knife?",
          answer:
            "The knife and die face form a working pair, so their materials and wear characteristics need to be considered together. Use the original die-face specification alongside the polymer and current knife wear. A change in blade hardness or construction should preserve the material relationship intended for that pelletizing system.",
        },
        {
          question: "Why should knives in one set share the specified seating geometry?",
          answer:
            "Each blade must reach its intended working position on the hub. Variations in thickness, seating faces or edge position can affect how the knives meet the die. Specify the complete set to the same drawing revision, including any deliberately different positions, so the installed cutting geometry is clearly defined.",
        },
        {
          question: "What should be reviewed when one knife wears faster than the others?",
          answer:
            "Start by checking whether that knife sits at the same specified height and angle as the others on the hub. Compare its thickness, seating face and edge position, then check holder alignment and the shared die face. Inspecting those contact points helps assess uneven wear before changing the blade material.",
        },
        {
          question: "Can Sureay reproduce a forked or stepped knife from a sample?",
          answer:
            "Yes. A sample can identify the outline, slots and seating features, while the drawing establishes the intended new dimensions and cutting profile. Mark the working face and cutting direction clearly. The illustrated shapes provide references, with the complete thickness and mounting details defining the blade for your cutter hub.",
        },
        {
          question: "What do you need to quote die-face pelletizer blades, hubs or die plates?",
          answer:
            "Provide the pelletizer model, polymer, knife drawing and quantity for the set. Show the blade seats, fixing slots and cutting direction. If the quote should include a cutter hub or die plate, send a separate drawing or part reference for each and identify the components you will retain.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the pelletizer and cutter hub model, blade drawing, slot pattern, working edge direction and die plate details.",
    dimensionLabels: {
      "col0": "Blade Profile",
      "col1": "Length × Width (mm)",
      "col2": "Thickness (mm)",
      "col3": "Mounting",
      "caption": "* Representative geometries from blades currently in production. Underwater pelletizer blades are made to the specific cutter hub — send the machine model with a sample blade or a dimensioned photograph for an exact quotation."
    },
    standardDimensions: [
      {
        "itemNo": "SR007401",
        "spec": "Straight, twin slot",
        "od": "45 × 25",
        "bolt": "3 – 6",
        "thickness": "2 × Ø5.5 slots"
      },
      {
        "itemNo": "SR007402",
        "spec": "Straight, twin slot",
        "od": "60 × 30",
        "bolt": "3 – 6",
        "thickness": "2 × R3.5 slots"
      },
      {
        "itemNo": "SR007403",
        "spec": "Straight, wide body",
        "od": "60 × 46",
        "bolt": "4 – 8",
        "thickness": "2 × R3.5, R5 relief"
      },
      {
        "itemNo": "SR007404",
        "spec": "Forked, triple slot",
        "od": "55 × 34",
        "bolt": "3 – 6",
        "thickness": "3 × R3.5 slots"
      },
      {
        "itemNo": "SR007405",
        "spec": "Stepped / shouldered",
        "od": "60 × 35",
        "bolt": "4 – 8",
        "thickness": "2 slots, 129° flank"
      },
      {
        "itemNo": "SR007406",
        "spec": "Tapered / hooked",
        "od": "70 × 60",
        "bolt": "4 – 8",
        "thickness": "63° flank"
      }
    ],
    detailLayout: {
      seoTitle: "Die-Face Cutting Knives | Custom Replacement Blades",
      heroAlt: "Die-face cutting knife profiles with straight, forked and stepped body shapes",
      sizeRange: "45–70 mm",
      heroSpecs: [
        { label: "Material", value: "Tool steel, HSS, PM steel, stainless steel or carbide" },
        { label: "Application", value: "Pellet cutting at the extrusion die face" },
      ],
      technicalSpecs: [
        { label: "Application", value: "Pellet cutting at the extrusion die face" },
        {
          label: "Material",
          value: "D2, M2 HSS, T42, PM-HSS, 440C stainless steel or carbide",
        },
        {
          label: "Edge Geometry",
          value: "45° bevel, 90° square, stepped bevel or curved / hooked edge",
        },
        { label: "Sizes", value: "45–70 mm" },
        {
          label: "Thickness Consistency",
          value: "≤0.01 mm variation within a matched set",
        },
        { label: "Flatness", value: "≤0.01 mm" },
        {
          label: "Pelletizing Methods",
          value: "Underwater, water-ring or hot die-face pelletizing",
        },
        {
          label: "Hardness Differential",
          value:
            "Blade hardness below the mating die plate (controlled-wear configuration)",
        },
        {
          label: "Supply Format",
          value: "Matched sets, CMM-verified; hubs and die plates available",
        },
      ],
      specificationImage: {
        src: "/images/products/die-face-cutting-knives/die-face-cutting-knives-01.webp",
        alt: "Die-face cutting knives showing their mounting slots and ground edges",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your die-face knives",
        description: "Include the pelletizer and cutter-hub model, blade drawing or sample, slot pattern, edge orientation and quantity.",
        buttonLabel: "Request a quote",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Special-Shaped Blades (Custom Profile)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "special-shaped-blades",
    name: "Special-Shaped Industrial Blades",
    fullName: "Special-Shaped Industrial Blades Made to Drawing",
    seoTitle: "Special-Shaped Industrial Blades | Custom Profiles",
    category: "custom_profile",
    sector: "other",
    categoryDisplay: "Custom Profile Blades",
    image: "/images/products/blades/special-shaped-knife.webp",
    badge: "OEM Custom",
    badgeColor: "teal",
    description:
      "Custom-profile replacement machine knives in D2, H13, PM-HSS or carbide. Part-specific outlines, cutting edges and mounting features made to drawing.",
    link: "/custom",
    specs: [
      {
        label: "Application",
        value: "Machine knives with a part-specific outline or edge profile",
      },
      {
        label: "Material",
        value: "D2, H13, PM-HSS or carbide",
      },
      {
        label: "Sizes",
        value: "Made to Drawing",
      },
      { label: "Dimensional Tolerance", value: "±0.02 mm" },
    ],
    offers: {
      lowPrice: 20,
      highPrice: 800,
    },
    quoteRequirements:
      "Include the machine and material, drawing revision, blade outline, mounting dimensions and critical edge or tolerance requirements.",
    components: [
      {
        id: "special-shaped-blades-advantage-1",
        tag: "Part-Specific Cutting Profiles",
        title: "Part-Specific Cutting Profiles",
        description:
          "Sureay makes industrial blades with custom outlines, bevels and working-edge positions, giving you a replacement route for knife profiles outside standard straight or circular configurations.",
      },
      {
        id: "special-shaped-blades-advantage-2",
        tag: "Tool-Steel, PM-HSS and Carbide Options",
        title: "Tool-Steel, PM-HSS and Carbide Options",
        description:
          "D2, H13, PM-HSS and carbide configurations allow the cutting material to be specified around your existing blade design and the material being processed.",
      },
      {
        id: "special-shaped-blades-advantage-3",
        tag: "Drawing-Based Mounting and Handed Profiles",
        title: "Drawing-Based Mounting and Handed Profiles",
        description:
          "Sureay makes custom holes, slots and seating faces to your mounting datums. Specify the edge-to-seat distance, cutting direction and any left- or right-hand differences so the replacement preserves the original working position.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "What is a special-shaped industrial blade?",
          answer:
            "It is a machine knife whose outline, edge profile or mounting arrangement needs a part-specific drawing. Custom-profile knife and specialty blade are related purchasing names. The cutting task and installed position establish the actual geometry, including features that cannot be identified by overall length, width and thickness alone.",
        },
        {
          question: "Which dimensions determine fit on a special-profile knife?",
          answer:
            "The edge position relative to the mounting datums is particularly important. Define the outline, thickness, holes, slots, recesses and bevel, then identify which dimensions control location and clamping. This connects the cutting profile to the installed position rather than relying on overall dimensions alone.",
        },
        {
          question: "How should left-hand and right-hand knives be identified?",
          answer:
            "Use a defined drawing view and show the installed orientation and cutting direction. Include both faces where the bevel, countersink or mounting recess changes sides. A mirrored outline may preserve overall dimensions while moving a critical feature, so each required hand should have an unambiguous part reference.",
        },
        {
          question: "Can the material be changed while keeping the existing profile?",
          answer:
            "Yes, a new material can be considered while retaining the required profile. Choose the candidate grade using the stock being cut, wear on the current knife and support at the edge. Treat it as a revised material specification and retain the required cutting and mounting geometry.",
        },
        {
          question: "Can a special-shaped blade be resharpened?",
          answer:
            "Yes, if grinding can restore the specified cutting profile without moving the edge beyond the drawing limits. Reference the same hole, shoulder or seating face when measuring the reground edge. Replace the knife if the edge can no longer be restored within those limits.",
        },
        {
          question: "What should I send for a custom-profile industrial blade quote?",
          answer:
            "Send the machine or cutting station, material being cut, approved part drawing and quantity. Mark the cutting direction, mounting datums and toleranced edge-to-seat dimensions, including each handed profile. If you only have a sample, show the mating component or an unused reference and mark the worn areas.",
        },
      ],
      company: [],
    },
    disambiguation:
      "For drawing submission and the manufacturing process, see [Custom Industrial Blades](/custom).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Wood Chipper Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-blades",
    seoDescription:
      "Moving knives for drum and disc wood chippers in listed lengths of 230–600 mm. Specify chipper steel, D2 or a carbide-tipped edge, plus your bevel and bolt pattern.",
    name: "Wood Chipper Blades",
    fullName: "Wood Chipper Blades for Drum & Disc Chippers",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Wood Chipper Blades",
    image: "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
    imageDimensions: { width: 800, height: 800, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1600, height: 846, smallerWidths: [320, 480, 640] },
    badge: "Forestry Grade",
    badgeColor: "green",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-10.webp",
      "/images/products/wood-chipper-blades/wood-chipper-blades-drawing.webp",
    ],
    description:
      "Replacement knives for drum and disc wood chippers. Chipper steel, D2 and carbide-tipped options, with custom bevels and bolt patterns to drawing.",
    link: "/products/wood-chipper-blades",
    isFeatured: true,
    compatibleMachines: [
      "Bandit Industries", "Vermeer", "Morbark", "Peterson Pacific",
      "Doppstadt", "Jenz", "CBI", "Precision Husky", "Bruks Siwertell",
    ],
    compatibleMachinesIntro:
      "Get replacement knives made for your drum or disc chipper, with custom bevels, fixing holes and clamping profiles. Sureay offers chipper steel, D2, Cr12MoV and carbide-tipped options. Share your drawing or sample for a quotation, including the matching anvil when required. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "chipper-knife-body",
        tag: "Knife geometry",
        title: "Chipper Steel and Carbide-Tipped Options",
        description:
          "High-carbon chipper steel, D2, Cr12MoV and carbide-tipped constructions give you replacement choices for different wood feeds and observed wear conditions.",
      },
      {
        id: "chipper-knife-material",
        tag: "Material options",
        title: "Custom Bevels and Mounting Profiles",
        description:
          "Listed wood chipper knife lengths span 230–600 mm, with custom lengths up to 800 mm. Sureay makes the bevel, bolt pattern and seating profile to drawing for existing drum and disc chippers.",
      },
      {
        id: "chipper-knife-anvil-pair",
        tag: "Cutting pair",
        title: "Moving Knives and Matching Anvils",
        description:
          "Order moving knives and stationary anvils in one enquiry, with each part specified for the chipper's cutting assembly and the components you intend to retain.",
        relatedBladeIds: ["wood-chipper-anvils"],
      },
    ],
    specs: [
      {
        label: "Sizes",
        value: "Listed lengths 230–600 mm; custom lengths up to 800 mm",
      },
      {
        label: "Application",
        value:
          "Moving knives for drum, disc and biomass whole-tree chippers and pallet recycling",
      },
      {
        label: "Material",
        value:
          "High-carbon chipper steel, D2 (1.2379), Cr12MoV or carbide-tipped construction",
      },
      {
        label: "Hardness",
        value:
          "Chipper steel: HRC 55–58; D2 / Cr12MoV: HRC 58–62; carbide cutting edge: HRA 89–91",
      },
      { label: "Bevel Angle", value: "25°–42°" },
      { label: "Thickness Tolerance", value: "±0.05 mm" },
      {
        label: "Heat Treatment",
        value: "Vacuum hardening and deep cryogenic treatment (−196°C)",
      },
      {
        label: "Resharpening",
        value:
          "Through-hardened; 8–12 regrind cycles, subject to wear and remaining knife height",
      },
    ],
    dimensionLabels: {
      "col0": "Chipper Type / OEM Platform",
      "col1": "Length (mm)",
      "col2": "Width (mm)",
      "col3": "Thickness (mm)",
      "caption": "* Standard dimensions for major chipper OEMs. 2-hole, 3-hole, and 4-hole bolt patterns CNC-machined to exact OEM blueprints. Counter-knives and wear plates available as matched sets. Custom lengths up to 800 mm."
    },
    standardDimensions: [
      {
        "itemNo": "SR006101",
        "spec": "Bandit 12\" / 15\" Drum",
        "od": "230",
        "id": "80",
        "thickness": "16"
      },
      {
        "itemNo": "SR006102",
        "spec": "Bandit 18\" / 19\" Drum",
        "od": "295",
        "id": "80",
        "thickness": "19"
      },
      {
        "itemNo": "SR006103",
        "spec": "Vermeer BC1800 / BC2100",
        "od": "310",
        "id": "100",
        "thickness": "19"
      },
      {
        "itemNo": "SR006104",
        "spec": "Morbark 40/36 Drum",
        "od": "400",
        "id": "100",
        "thickness": "22"
      },
      {
        "itemNo": "SR006105",
        "spec": "Morbark 50/48 Disc",
        "od": "250",
        "id": "120",
        "thickness": "25"
      },
      {
        "itemNo": "SR006106",
        "spec": "Peterson 5710 Disc",
        "od": "280",
        "id": "130",
        "thickness": "25"
      },
      {
        "itemNo": "SR006107",
        "spec": "Doppstadt / Jenz Biomass",
        "od": "350",
        "id": "100",
        "thickness": "20"
      },
      {
        "itemNo": "SR006108",
        "spec": "Heavy Whole-Tree Chipper",
        "od": "600",
        "id": "150",
        "thickness": "30"
      },
      {
        "itemNo": "SR006109",
        "spec": "Eschlböck Biber",
        "od": "245",
        "id": "285",
        "thickness": "20"
      }
    ],
    detailLayout: {
      seoTitle: "Wood Chipper Blades for Drum & Disc Chippers",
      heroAlt: "Wood chipper knife with a straight cutting edge, open mounting slots and fixing holes",
      sizeRange: "230–600 mm",
      heroSpecs: [
        { label: "Material", value: "Chipper steel, D2, Cr12MoV or carbide-tipped" },
        { label: "Application", value: "Drum and disc wood chippers" },
      ],
      technicalSpecs: [
        {
          label: "Sizes",
          value: "Listed lengths 230–600 mm; custom lengths up to 800 mm",
        },
        {
          label: "Application",
          value:
            "Moving knives for drum, disc and biomass whole-tree chippers and pallet recycling",
        },
        {
          label: "Material",
          value:
            "High-carbon chipper steel, D2 (1.2379), Cr12MoV or carbide-tipped construction",
        },
        {
          label: "Hardness",
          value:
            "Chipper steel: HRC 55–58; D2 / Cr12MoV: HRC 58–62; carbide cutting edge: HRA 89–91",
        },
        { label: "Bevel Angle", value: "25°–42°" },
        { label: "Thickness Tolerance", value: "±0.05 mm" },
        {
          label: "Heat Treatment",
          value: "Vacuum hardening and deep cryogenic treatment (−196°C)",
        },
        {
          label: "Resharpening",
          value:
            "Through-hardened; 8–12 regrind cycles, subject to wear and remaining knife height",
        },
      ],
      specificationImage: {
        src: "/images/products/wood-chipper-blades/wood-chipper-blades-drawing.webp",
        alt: "Wood chipper knife drawing showing the body, open mounting slots and bevel cross-section",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your chipper knives",
        description:
          "Include the chipper model and serial number, drum or disc type, knife drawing or sample, and required quantity.",
        buttonLabel: "Request a quote",
      },
    },
    relatedBladeIds: ["wood-chipper-anvils"],
    offers: {
      lowPrice: 25,
      highPrice: 380,
    },
    faqs: {
      technical: [
        {
          question: "Which replacement wood chipper knives fit my machine?",
          answer:
            "Use the chipper model, serial number and original part reference to identify the new-knife dimensions, bevel, fixing pattern and seat. Chipper blades and chipper knives commonly describe the moving knives on a drum or disc. Grinder teeth are a separate wear-part type, so the actual cutting assembly should accompany the purchasing name.",
        },
        {
          question: "When should carbide-tipped chipper knives be considered?",
          answer:
            "Consider the wear pattern and feed condition before changing the working-edge construction. Gradual abrasive wear and localized impact damage call for different material decisions. Compare the current steel knife, bevel and contamination history with the proposed carbide-tipped design, while preserving the mounting and working geometry required by the chipper.",
        },
        {
          question: "Why do chip quality and cutting effort change as knives wear?",
          answer:
            "A dull or damaged edge changes how the knife engages the wood and can increase the effort needed to process it. Compare the used edges with the chip sample and feed condition. Include the stationary anvil in the inspection, because both parts establish the cutting relationship.",
        },
        {
          question: "Are reversible knives and resharpenable knives the same?",
          answer:
            "No. A reversible chipper knife can be turned to use a second cutting edge. A resharpenable knife can have a worn edge reground within its service limits. Some knives support both. Use the blade drawing and chipper manual to confirm the allowed orientation, bevel and remaining dimensions.",
        },
        {
          question: "When should a chipper knife be replaced instead of sharpened?",
          answer:
            "Replace knives with cracks, distortion or damage that prevents restoration of the specified working geometry. A worn edge may be reground when the remaining knife dimensions allow it. Use the chipper's limits for the particular knife rather than a fixed regrind count, and inspect the mounting surfaces as well as the edge.",
        },
        {
          question: "Should the anvil be replaced whenever the moving knives are changed?",
          answer:
            "No. A new moving knife does not always require a new anvil. Assess the anvil for wear, damage and remaining adjustment. A serviceable anvil can stay in place if its edge and mounting still allow the required cutting gap. See [Wood Chipper Anvils](/products/wood-chipper-anvils) for replacement stationary knives.",
        },
        {
          question: "How do I request a quote for drum or disc chipper blades?",
          answer:
            "Send the chipper model and serial number, original part reference or drawing, wood feed and quantity. Include the bevel, bolt or slot dimensions and blade-seat profile. For an older machine with no drawing, a dimensioned sample can show the seat and fixing pattern. Mark any height lost to sharpening.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the chipper model and serial, drum or disc type, knife drawing, bolt pattern and wood feedstock.",
    rfqPlaceholder:
      "Chipper model and serial number, drum or disc type, knife drawing or sample, and quantity required.",
    disambiguation:
      "For the stationary part opposite the rotating knife, see [Wood Chipper Anvils](/products/wood-chipper-anvils).",
  },

  // Wood Chipper Anvils (Counter-Knives / Bed Knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-anvils",
    seoDescription:
      "Replace the stationary counter knife opposite the moving chipper knives. Wood chipper anvils are listed in 185–400 mm lengths, with custom mounting slots.",
    name: "Wood Chipper Anvils",
    fullName: "Wood Chipper Anvils & Counter Knives",
    category: "wood_chipper",
    sector: "wood",
    categoryDisplay: "Counter-Knives & Anvils",
    image: "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
    imageDimensions: { width: 1920, height: 1439, smallerWidths: [320, 480, 640] },
    specificationImageDimensions: { width: 1920, height: 1440, smallerWidths: [320, 480, 640] },
    badge: "Matched Sets",
    badgeColor: "blue",
    gallery: [
      "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
      "/images/products/wood-chipper-blades/wood-chipper-anvil-01.webp",
      "/images/products/wood-chipper-blades/wood-chipper-anvil-02.webp",
    ],
    description:
      "Replacement wood chipper anvils in D2, Cr12MoV, modified A8 or 42CrMo. Custom working-edge profiles and mounting slots matched to the original part.",
    link: "/products/wood-chipper-anvils",
    isFeatured: true,
    compatibleMachines: [
      "Bandit", "Vermeer", "Morbark", "Timberwolf", "Schliesing",
      "Greenmech", "Jensen", "Jenz", "Eschlböck", "Forst",
    ],
    compatibleMachinesIntro:
      "Get a replacement chipper anvil with the working edge, fixing slots and seating faces your machine needs. Sureay offers through-hardened material options and custom profiles. Share your drawing or sample for an anvil quotation, with moving knives available as separate items. Machine brands are compatibility references for Sureay aftermarket parts.",
    components: [
      {
        id: "chipper-anvil-edge",
        tag: "Stationary edge",
        title: "Multiple Steel Options for Stationary Edges",
        description:
          "Sureay offers D2, Cr12MoV, modified A8 and 42CrMo anvils, allowing the replacement material to be specified around the chipper's existing knife pair and wear conditions.",
      },
      {
        id: "chipper-anvil-adjustment",
        tag: "Mounting",
        title: "Defined Working Edges and Seating Faces",
        description:
          "Listed anvil lengths span 185–400 mm, with custom lengths up to 600 mm. Sureay makes the stationary edge and locating surfaces to the drawing for your existing chipper housing.",
      },
      {
        id: "chipper-anvil-pair",
        tag: "Replacement pair",
        title: "Mounting Slots for Existing Adjustment Systems",
        description:
          "Slotted mounting configurations are available for shim-adjusted assemblies, with slot locations and body dimensions made to the original anvil drawing.",
        relatedBladeIds: ["wood-chipper-blades"],
      },
    ],
    specs: [
      {
        label: "Sizes",
        value: "Listed lengths 185–400 mm; custom lengths up to 600 mm",
      },
      {
        label: "Application",
        value: "Stationary counter knife opposite the moving chipper knives",
      },
      { label: "Material", value: "D2, Cr12MoV, modified A8 or 42CrMo" },
      {
        label: "Mounting",
        value: "Slotted holes with shim-adjustable knife clearance",
      },
      { label: "Hardness", value: "HRC 54–60, through-hardened" },
      { label: "Edge Geometry", value: "Single bevel, 30°–37°" },
      { label: "Parallelism", value: "±0.05 mm over the blade length" },
      {
        label: "Resharpening",
        value:
          "Through-hardened; 5–10 regrind cycles, subject to wear and remaining anvil height",
      },
    ],
    dimensionLabels: {
      "col0": "Chipper OEM / Model",
      "col1": "Length (mm)",
      "col2": "Width (mm)",
      "col3": "Thickness (mm)",
      "caption": "* Standard OEM replacement anvil dimensions. Slotted mounting holes CNC-machined to exact OEM clearance adjustment patterns. Matched blade + anvil sets available for all sizes. Custom lengths up to 600 mm."
    },
    standardDimensions: [
      {
        "itemNo": "SR006201",
        "spec": "Bandit 12\" / 15\" / Mighty Bandit",
        "od": "185",
        "id": "75",
        "thickness": "10"
      },
      {
        "itemNo": "SR006202",
        "spec": "Bandit 18\" / 19\" / 1290 / 1590",
        "od": "265",
        "id": "95",
        "thickness": "12"
      },
      {
        "itemNo": "SR006203",
        "spec": "Vermeer BC1200 / BC1500",
        "od": "200",
        "id": "80",
        "thickness": "12"
      },
      {
        "itemNo": "SR006204",
        "spec": "Vermeer BC1800 / BC2000",
        "od": "260",
        "id": "100",
        "thickness": "16"
      },
      {
        "itemNo": "SR006205",
        "spec": "Morbark 2 / 5 / 7 / 12 / 13",
        "od": "265",
        "id": "95",
        "thickness": "12"
      },
      {
        "itemNo": "SR006206",
        "spec": "Morbark 40/36 / 50/48",
        "od": "400",
        "id": "100",
        "thickness": "20"
      },
      {
        "itemNo": "SR006207",
        "spec": "Timberwolf 150 / 190 / 230",
        "od": "230",
        "id": "80",
        "thickness": "16"
      },
      {
        "itemNo": "SR006208",
        "spec": "Schliesing 400 / 500 / 550 / 600 / 660",
        "od": "260",
        "id": "80",
        "thickness": "20"
      },
      {
        "itemNo": "SR006209",
        "spec": "Greenmech / Jensen / Forst",
        "od": "Per OEM Drawing",
        "id": "Per OEM Drawing",
        "thickness": "Per OEM Drawing"
      }
    ],
    detailLayout: {
      seoTitle: "Wood Chipper Anvils & Counter Knives",
      heroAlt: "Rectangular wood chipper anvil with three fixing holes and a ground working edge",
      sizeRange: "185–400 mm",
      heroSpecs: [
        { label: "Material", value: "D2, Cr12MoV, modified A8 or 42CrMo" },
        { label: "Application", value: "Stationary counter knives for wood chippers" },
      ],
      technicalSpecs: [
        {
          label: "Sizes",
          value: "Listed lengths 185–400 mm; custom lengths up to 600 mm",
        },
        {
          label: "Application",
          value: "Stationary counter knife opposite the moving chipper knives",
        },
        { label: "Material", value: "D2, Cr12MoV, modified A8 or 42CrMo" },
        {
          label: "Mounting",
          value: "Slotted holes with shim-adjustable knife clearance",
        },
        { label: "Hardness", value: "HRC 54–60, through-hardened" },
        { label: "Edge Geometry", value: "Single bevel, 30°–37°" },
        { label: "Parallelism", value: "±0.05 mm over the blade length" },
        {
          label: "Resharpening",
          value:
            "Through-hardened; 5–10 regrind cycles, subject to wear and remaining anvil height",
        },
      ],
      specificationImage: {
        src: "/images/products/wood-chipper-blades/wood-chipper-anvil-02.webp",
        alt: "Two wood chipper counter knives showing the bevel and counterbored fixing holes",
      },
      dimensionTables: [],
      inlineRfq: {
        title: "Request a quote for your chipper anvils",
        description:
          "Include the chipper model and serial number, anvil position, drawing or sample, and required quantity.",
        buttonLabel: "Request a quote",
      },
    },
    relatedBladeIds: ["wood-chipper-blades"],
    offers: { lowPrice: 25, highPrice: 250 },
    faqs: {
      technical: [
        {
          question: "What does a wood chipper anvil do, and is it a counter knife?",
          answer:
            "The anvil provides the stationary edge that the moving chipper knives cut against. Counter knife and bed knife can refer to that same position, depending on the machine. Use the parts diagram to identify the stationary edge and its mounting before ordering by name.",
        },
        {
          question: "Why can cutting remain poor after the moving knives are replaced?",
          answer:
            "The moving knives still work against the existing stationary edge. Rounding, damage or an altered installed position at the anvil can affect their cutting relationship. Compare both parts and their mounting condition, then use the chipper manufacturer's procedure to assess clearance. A new moving knife does not restore a worn stationary face.",
        },
        {
          question: "What should guide the choice of anvil steel?",
          answer:
            "Compare the current material, edge wear and any local damage with the wood feed and moving-knife configuration. The material decision should address the observed condition while retaining the required bevel and body profile. Distinguish gradual wear from impact-related damage before selecting among the listed steel options.",
        },
        {
          question: "Can a worn anvil be turned to expose another edge?",
          answer:
            "Yes, if the anvil was designed with another usable edge and that orientation is permitted by the mounting. Check the drawing for its seating faces and adjustment requirements. Some faces of a rectangular anvil may locate or support it without serving as working edges.",
        },
        {
          question: "Can I order the anvil separately from the chipper knives?",
          answer:
            "Yes. The anvil can be supplied as an individual replacement or included with [Wood Chipper Blades](/products/wood-chipper-blades). Keep the two drawings and quantities separate. The dimensions and condition of retained moving knives remain relevant because the new anvil must occupy its intended position in the existing cutting pair.",
        },
        {
          question: "What details do I need to get a wood chipper anvil quote?",
          answer:
            "Send the chipper model and serial number, anvil drawing or part number, quantity and the wood you process. For a shim-adjusted assembly, show the slot spacing, seating faces, shim arrangement and working-edge position relative to the moving knife. Mark any dimensions changed by wear or regrinding.",
        },
      ],
      company: [],
    },
    quoteRequirements:
      "Include the chipper model and serial, anvil drawing, mounting-slot pattern, working faces and knife details.",
    rfqPlaceholder:
      "Chipper model and serial number, anvil position, drawing or sample, and quantity required.",
    disambiguation:
      "For the knives attached to the rotating drum or disc, see [Wood Chipper Blades](/products/wood-chipper-blades).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 37. Slitter Rewinder Bottom Knives (circular bottom knives, paper rewinding)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement bottom knives for your slitter rewinder, including cup, double-edge and replaceable-ring designs. Send Sureay your drawing or sample for a quotation on the flange, bore and cutting-face configuration your existing assembly needs.",
    id: "slitter-rewinder-bottom-knives",
    seoDescription:
      "Cup, double-edge and replaceable-ring bottom knives for paper rewinders, in OD 70–300 mm. Specify a keyed bore, flange mount or carbide cutting edge.",
    name: "Slitter Rewinder Bottom Knives",
    fullName: "Slitter Rewinder Bottom Knives – Cup, Double Edge & Tipped",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Slitter Rewinder Bottom Knives",
    image:
      "/images/products/slitter-detail/slitter-rewinder-bottom-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement bottom knives for paper slitter rewinders. Cup, double-edge and carbide-tipped designs, with custom bores, flanges and widths to drawing.",
    link: "/products/slitter-rewinder-bottom-knives",
    specs: [
      { label: "Sizes", value: "OD 70–300 mm" },
      {
        label: "Material",
        value:
          "52100, D2, M2 HSS, PM HSS, solid tungsten carbide or WC-Co on a steel body",
      },
      {
        label: "Applications",
        value: "Paper slitter rewinders and other web converting lines",
      },
      { label: "Profiles", value: "Cup, double edge or replaceable cutting ring" },
      {
        label: "Carbide options",
        value: "Tipped and inlay constructions for the working edge",
      },
      {
        label: "Mounting",
        value: "Flange mounting, keyed bore or plain shaft bore",
      },
      { label: "Face finish", value: "Mirror finished" },
    ],
    detailLayout: {
      seoTitle: "Slitter Rewinder Bottom Knives | Cup & Double-Edge",
      sizeRange: "OD 70–300 mm",
      heroAlt:
        "Circular rewinder bottom knives with several flange and mounting hole patterns",
      specificationImage: {
        src: "/images/products/slitter-detail/slitter-rewinder-bottom-knives-detail.webp",
        alt: "Close-up of rewinder bottom knives with drilled and recessed flange faces",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "flange",
          tabLabel: "Flange & Double Edge",
          title: "Flange-Mounted and Double-Edge Bottom Knives",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Mounting or edge",
            "Reference",
          ],
          rows: [
            ["SR001211", "105 × 80 × 15 mm", "Flange", "DIENES dimensional series"],
            ["SR001212", "130 × 90 × 20 mm", "Flange", "DIENES dimensional series"],
            ["SR001213", "190 × 138 × 15 mm", "Double edge", "Tidland TID131393"],
            ["SR001214", "130 × 100 × 30 mm", "Double edge", "Tidland TID133503"],
            ["SR001215", "250 × 188 × 15 mm", "Double edge", "Tidland TID131395"],
          ],
        },
        {
          id: "tipped",
          tabLabel: "Carbide Edge",
          title: "Bottom Knives with a Carbide Cutting Edge",
          columns: [
            "Item No.",
            "Dimensions (OD × ID × W)",
            "Construction",
            "Reference",
          ],
          rows: [
            [
              "SR001561",
              "90.81 × 60.00 × 12.70 mm",
              "Carbide-tipped",
              "Dusenbery 783533",
            ],
          ],
        },
        {
          id: "keyed",
          tabLabel: "Keyway Mount",
          title: "Bottom Knives with a Keyway",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Mounting"],
          rows: [
            ["SR001571", "70 × 45 × 10 mm", "10 mm keyway series"],
            ["SR001572", "80 × 50 × 10 mm", "10 mm keyway series"],
            ["SR001573", "108 × 80 × 20 mm", "10 mm keyway series"],
          ],
        },
        {
          id: "additional-rewinder-knives",
          tabLabel: "Additional Rewinder Knife Sizes",
          title: "Additional Rewinder Knife Sizes",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Knife Type"],
          rows: [
            ["SR001845", "250 × 188 × 25 mm", "Rewinder bottom knife"],
            ["SR001846", "254 × 195 × 50 mm", "Rewinder bottom knife"],
            ["SR001847", "250 × 140 × 20 mm", "Rewinder bottom knife"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "OD 70–300 mm" },
        {
          label: "Material",
          value:
            "52100, D2, M2 HSS, PM HSS, solid tungsten carbide or WC-Co on a steel body",
        },
        {
          label: "Applications",
          value: "Paper slitter rewinders and other web converting lines",
        },
        { label: "Profiles", value: "Cup, double edge or replaceable cutting ring" },
        {
          label: "Carbide options",
          value: "Tipped and inlay constructions for the working edge",
        },
        {
          label: "Mounting",
          value: "Flange mounting, keyed bore or plain shaft bore",
        },
        { label: "Face finish", value: "Mirror finished" },
      ],
    },
    compatibleMachines: [
      "DIENES",
      "Tidland",
      "Mario Cotta",
      "Jagenberg",
      "Valmet",
      "Voith",
      "Dusenbery",
      "Cameron",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Steel and Carbide Working-Edge Options",
        description:
          "Sureay supplies steel, solid carbide and carbide-edged bottom knives, giving paper converters a choice of working-edge materials and constructions for their existing rewinder assemblies.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Cup, Double-Edge and Replaceable-Ring Designs",
        description:
          "Cup knives, double-edge profiles and replaceable cutting rings are available with finished working faces, supporting replacement of the specific knife body or cutting ring your assembly requires.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Custom Mounting Interfaces for Rewinders",
        description:
          "Flanges, keyed bores, plain bores and cutting profiles can be made to your drawing or sample, supporting replacement orders for existing rewinders and older knife assemblies.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Which replacement bottom knife fits my slitter rewinder?",
          answer:
            "Identify the machine model or part reference, then compare outside diameter, bore, width, flange details and fixing holes with the installed assembly. Bottom bands, lower knives and female knives are common names for the lower member of a shear-slitting pair. The working profile and mounting arrangement establish fit more precisely than the name alone.",
        },
        {
          question:
            "Can custom bottom knives be supplied for an older rewinder without replacing the upper knife?",
          answer:
            "Yes. Sureay can make the bottom knife to a drawing or sample while retaining a serviceable upper knife. Define the bore, flange, working width and cutting profile, and include the upper knife dimensions, condition and regrinding history. These details establish the lower knife's working position within the existing assembly.",
        },
        {
          question:
            "How do cup, double-edge and replaceable-ring bottom knives differ?",
          answer:
            "A cup knife uses a shaped body to position its working edge. A double-edge knife provides two working cutting faces, while a replaceable-ring assembly separates the cutting ring from its support. Select the construction required by the installed holder. For a station designed around several cutting positions on one body, see [Multi-Groove Bottom Knives](/products/groove-bottom-knives).",
        },
        {
          question:
            "Should a rewinder bottom knife use steel, solid carbide or a carbide edge?",
          answer:
            "For paper shear slitting, start with the existing knife construction and retained upper knife. A carbide working edge is worth evaluating when gradual wear drives knife changes; recurring chips or contact damage call for checking the pair and support first. Solid carbide and steel bodies with carbide cutting rings have different constructions, so retain the required mounting and working geometry when comparing alternatives.",
        },
        {
          question:
            "Why is the paper edge still poor after replacing a bottom knife?",
          answer:
            "The retained upper knife, holder stability, working-face condition and slitting settings can still affect the paper edge. Inspect both members of the pair and their mounting faces, including any geometry changed by regrinding. Comparing the same paper grade at the normal settings helps distinguish the replacement knife from other conditions in the cutting station.",
        },
        {
          question:
            "When can a rewinder bottom knife be reground rather than replaced?",
          answer:
            "Regrinding can be considered for a bottom-knife design whose working geometry can be restored within its permitted remaining dimensions. Assess the damaged working face and its relationship to the upper knife against the original drawing. Cup knives and replaceable cutting rings require their own geometry and allowance checks before deciding between regrinding and replacement.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "rotary-slitter-knives-paper",
      "groove-bottom-knives",
      "bottom-grooved-anvil-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 38. Corrugated Slotter Knives (male arcs and female counter knives)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement slotter knives for your printer-slotter or flexo folder-gluer, with custom arcs, mounting holes and cutting profiles. Send Sureay a drawing or sample for a quotation on male knives, counter knives and matching spacers.",
    id: "corrugated-slotter-knives",
    seoDescription:
      "Plain or serrated male arcs and female counter knives for corrugated flap slotting. Order replacement blades made to your slot width and mounting drawing.",
    name: "Corrugated Slotter Knives",
    fullName: "Corrugated Slotter Knives – Male & Female Blades",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Corrugated Slotter Knives",
    image: "/images/products/slitter-detail/box-slotting-knives-white.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement male and female slotter knives for corrugated box machines. Plain or serrated arcs, counter knives and custom mounting patterns to drawing.",
    link: "/products/corrugated-slotter-knives",
    specs: [
      {
        label: "Material",
        value:
          "D2, M2 HSS, 9CrSi, 9Mn2V, 52100 or carbide-tipped counter knives",
      },
      {
        label: "Applications",
        value:
          "Corrugated flap slotting on flexo folder-gluers and printer-slotters",
      },
      {
        label: "Typical hardness",
        value: "D2 58–62 HRC · M2 62–65 HRC · Carbide working edge 89–92 HRA",
      },
      {
        label: "Male blade",
        value:
          "Plain or serrated arc, with stitch-lap and corner segments available",
      },
      {
        label: "Female assembly",
        value: "Two counter-knife halves with a matched spacer",
      },
      {
        label: "Mounting",
        value:
          "Round holes, countersunk holes or arc adjustment slots",
      },
    ],
    detailLayout: {
      seoTitle: "Corrugated Slotter Knives | Male & Female",
      sizeRange: "Arc series R105–R406 mm",
      heroAlt:
        "Arc-shaped corrugated slotter components with round mounting holes and elongated slots",
      specificationImage: {
        src: "/images/products/slitter-detail/box-slotting-knives-detail-white.webp",
        alt: "Detail of curved slotter segments showing round fixing holes and arc adjustment slots",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "male",
          tabLabel: "Male Blades",
          title: "Male Slotter Blades",
          columns: [ITEM_NO_COLUMN, "Outer R × Inner r × T", "Arc angle", "Edge"],
          rows: [
            ["SR001601", "105 × 58 × 5 mm", "To drawing", "Plain or serrated"],
            [
              "SR001602",
              "113 × 63.5 × 7.5 mm",
              "To drawing",
              "Plain or serrated",
            ],
            ["SR001603", "115 × 58 × 8 mm", "To drawing", "Plain or serrated"],
            ["SR001604", "168.7 × 120.3 × 8 mm", "36.2°", "To drawing"],
            ["SR001605", "213.5 × 130 × 7.5 mm", "20.5°", "To drawing"],
            ["SR001606", "213.5 × 130 × 7.5 mm", "72°", "To drawing"],
            ["SR001607", "212 × 159 × 10 mm", "60°", "To drawing"],
            ["SR001608", "281.5 × 237.5 × 7.2 mm", "88°", "To drawing"],
            ["SR001609", "406 × 316 × 7.9 mm", "To drawing", "To drawing"],
          ],
        },
        {
          id: "female",
          tabLabel: "Female Knives",
          title: "Female Counter Knives",
          columns: [
            ITEM_NO_COLUMN,
            "Configuration",
            "Dimensions",
            "Mounting or reference",
          ],
          rows: [
            [
              "SR001610",
              "Plain counter knife",
              "OD 90–450 mm range",
              "Mounting and thickness to drawing",
            ],
            [
              "SR001611",
              "Split counter knife",
              "OD 90–450 mm range",
              "Plain lower halves, spacer to drawing",
            ],
            [
              "SR001612",
              "Carbide-tipped lower set",
              "To matched slot and drawing",
              "Confirm lower shaft and upper blade",
            ],
          ],
        },
      ],
    },
    compatibleMachines: [
      "BOBST",
      "Martin",
      "EMBA",
      "Mitsubishi EVOL",
      "Isowa",
      "Göpfert",
      "MarquipWardUnited",
      "TCY",
      "Shinko",
      "Dongfang",
    ],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Materials Selected by Male and Female Knife Position",
        description:
          "Sureay supplies steel slotter knives and carbide-tipped counter knives, allowing male and female components to be specified separately for the material and construction required by your slotting assembly.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Plain and Serrated Arcs with Custom Mounting",
        description:
          "Plain and serrated arcs, stitch-lap segments and corner segments are available with round holes, countersunk holes or adjustment slots made for the existing slotter head.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Male Knives, Female Knives and Matching Spacers",
        description:
          "Order replacement male arcs, female counter-knife halves and matching spacers individually or together, with each component defined for the parts you plan to retain.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "How are replacement slotter knives matched to a box converting machine?",
          answer:
            "Identify the printer-slotter or flexo folder-gluer station and whether you need a male arc, female counter knife or spacer. Compare the arc geometry, thickness, mounting pattern and installed hand with the existing part. Slotter knives form flap slots during box converting; [slitter-scorer blades](/products/corrugated-slitter-scorer-blades) slit board lengthwise at the corrugator dry end and use different geometry. For grooves in greyboard used to make rigid boxes, see [Carbide Box V-Grooving Knives](/products/box-slotting-knives).",
        },
        {
          question:
            "What is the difference between male and female slotter knives?",
          answer:
            "The male arc enters the female knife assembly to form the board slot. Two female counter faces and their spacer establish the cooperating opening. A replacement order should identify which component is being changed and the dimensions of the retained parts, so the male blade and female opening remain defined as a working combination.",
        },
        {
          question: "Should I choose a plain or serrated male slotter blade?",
          answer:
            "For a like-for-like replacement, retain the plain or serrated edge form used by the installed slotter head. Changing the edge form requires checking the male arc with the female opening, board specification and slot-quality requirement. Specify the intended edge form on the drawing so the replacement is not identified by arc dimensions alone.",
        },
        {
          question: "Why do corrugated slots have torn edges or uneven widths?",
          answer:
            "Torn slot edges or width variation can involve worn cutting faces or the way the male and female heads run together. Check the male edge, both female counter faces, spacer, head alignment and runout against the machine's setup requirements. Compare the defect across slot positions before deciding which knives or supporting components need replacement.",
        },
        {
          question:
            "When should a carbide-tipped female slotter knife be considered?",
          answer:
            "Consider carbide-tipped counter knives when recurring wear of the female cutting faces is the main replacement issue, after checking head alignment, runout and the mating clearance. Keep the male-blade geometry and female opening consistent with the original assembly. Compare the existing steel knife's wear pattern and operating conditions when specifying the carbide-tipped alternative.",
        },
        {
          question: "Can custom slotter arcs be made from a drawing or sample?",
          answer:
            "Yes. Sureay can reproduce arcs with specified inner and outer radii, arc angle, thickness, edge form and mounting holes or slots. A sample helps identify the installed profile and hand; the intended new dimensions should account for wear on the sample. Identify the mating female assembly and which arc segments are required.",
        },
        {
          question: "Must male and female slotter knives be replaced together?",
          answer:
            "They can be ordered separately when the retained components remain serviceable and their mating geometry is known. Check both female counter faces and the spacer as well as the male arc. The replacement needs the correct relationship to the female opening, in addition to matching the mounting pattern.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "corrugated-slitter-scorer-blades",
      "rotary-slitter-knives-paper",
      "tungsten-carbide-slitter-knives",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 39. Paper Straw Cutting Blades
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Get replacement paper straw cutting blades with custom bores, thicknesses and edge profiles for your winding-line cutter. Share your drawing or sample with Sureay for a quotation on the blade material and coating options for your station.",
    id: "paper-straw-slitting-blades",
    name: "Paper Straw Cutting Blades",
    fullName: "Paper Straw Cutting Blades",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Paper Straw Cutting Blades",
    image: "/images/products/slitter-detail/paper-straw-slitting-blades.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Replacement circular knives for paper straw cut-off and trimming. Carbide or M2 HSS options, custom bores and profiles, and coatings selected for the line.",
    link: "/products/paper-straw-slitting-blades",
    specs: [
      { label: "Sizes", value: "Standard OD 88–100 mm" },
      {
        label: "Material",
        value: "Fine-grain carbide, M2 HSS or zirconia, depending on station",
      },
      {
        label: "Applications",
        value: "Paper straw trimming and cut-off on winding lines",
      },
      {
        label: "Optional Coatings",
        value: "DLC, TiN, TiAlN or CrN by blade and application",
      },
    ],
    detailLayout: {
      seoTitle: "Paper Straw Cutting Blades | Replacement Knives",
      sizeRange: "Standard OD 88–100 mm",
      heroAlt: "Circular paper straw cutting knife with a small center bore",
      specificationImage: {
        src: "/images/products/slitter-detail/paper-straw-slitting-blades-detail.webp",
        alt: "Thin circular cutting blades showing the polished faces and cutting edges",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "straw",
          tabLabel: "Paper Straw Knives",
          title: "Paper Straw Knives",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Station"],
          rows: [
            ["SR001651", "100 × 15 × 0.20 mm", "Paper straw trim"],
            ["SR001652", "100 × 15 × 0.30 mm", "Paper straw trim"],
            ["SR001653", "100 × 16 × 0.30 mm", "Paper straw trim"],
            ["SR001654", "100 × 45 × 0.30 mm", "Paper straw trim"],
          ],
        },
        {
          id: "additional-straw-knives",
          tabLabel: "Additional Straw Knife Sizes",
          title: "Additional Straw Knife Sizes",
          columns: ["Item No.", "Dimensions (OD × ID × W)", "Application"],
          rows: [
            ["SR001848", "88 × 16 × 0.26 mm", "Paper straw cut-off"],
            ["SR001849", "89 × 15 × 0.30 mm", "Paper straw cut-off"],
            ["SR001850", "90 × 15 × 0.30 mm", "Paper straw cut-off"],
            ["SR001851", "100 × 15 × 0.15 mm", "Paper straw cut-off"],
            ["SR001852", "100 × 45 × 0.20 mm", "Paper straw cut-off"],
          ],
        },
      ],
      technicalSpecs: [
        { label: "Sizes", value: "Standard OD 88–100 mm" },
        {
          label: "Material",
          value: "Fine-grain carbide, M2 HSS or zirconia, depending on station",
        },
        {
          label: "Applications",
          value: "Paper straw trimming and cut-off on winding lines",
        },
        {
          label: "Optional Coatings",
          value: "DLC, TiN, TiAlN or CrN by blade and application",
        },
      ],
    },
    compatibleMachines: ["Jota", "KETE"],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Carbide, HSS and Ceramic Material Options",
        description:
          "Fine-grain carbide, M2 HSS and station-dependent zirconia options give you a choice of blade materials for formed-straw cutting, with the construction specified for your existing cutting station.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Custom Cutting Edges and Optional Coatings",
        description:
          "Sureay supplies custom cutting profiles with optional DLC, TiN, TiAlN or CrN coatings selected for the blade material and application, so edge geometry and surface configuration can be specified separately.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "Replacement Knives for Formed-Straw Cut-Off",
        description:
          "Circular replacement knives are made for trimming and cutting formed paper straws, with bores, blade sections and working edges defined for the holder on your winding line.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "Can Sureay make a replacement knife for my paper straw cutting station?",
          answer:
            "Yes. A drawing or sample can define the bore, thickness and cutting profile required by your cut-off or trimming holder. Include the current blade material, straw wall thickness and paper construction. These details distinguish knives that share an outside diameter but serve different cutting arrangements on a straw-production line.",
        },
        {
          question:
            "Are paper straw cutting blades the same as paper slitter knives?",
          answer:
            "Paper straw cutting blades cut or trim the formed tube on its production line. [Paper slitter knives](/products/rotary-slitter-knives-paper) divide a continuous flat paper web into narrower strips. Establish whether the required part works on the incoming web or the finished straw, then identify its holder and cutting profile.",
        },
        {
          question:
            "How should blade wear guide paper straw knife material selection?",
          answer:
            "Use the cutting station and condition of the used blade as the starting point. Compare gradual edge wear, chipping and adhesive residue separately, then evaluate a material change against the issue observed. Keep the required bore, blade section and holder geometry defined when considering an alternative to the current blade.",
        },
        {
          question: "Why are paper straw ends ragged or distorted?",
          answer:
            "Inspect the cutting edge, adhesive buildup and tube support alongside the paper ply count, wall thickness and adhesive condition. Compare the cut made by a clean blade with the affected blade at normal machine settings. This gives a more useful picture of the cutting conditions than judging sharpness alone.",
        },
        {
          question:
            "What should guide coating selection when adhesive builds up on straw knives?",
          answer:
            "Select the coating together with the blade material, adhesive system and residue pattern at the cutting station. Record where buildup occurs and compare it with the original blade under the normal production conditions. Used-blade photographs and cut samples help define the surface requirement when considering a coating change.",
        },
        {
          question: "When should a paper straw cutting blade be replaced?",
          answer:
            "Replace a blade when edge damage or continuing wear prevents the required clean end cut, or when its remaining dimensions fall outside the machine's specified working range. Check adhesive residue and tube support when comparing cut samples under the same production conditions. Base replacement on blade condition and the required cut quality rather than a fixed calendar interval.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "tungsten-carbide-slitter-knives",
      "rotary-slitter-knives",
      "rotary-slitter-knives-paper",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 36. Groove Bottom Knives (multi-groove bottom rings / cutter rings)
  // ─────────────────────────────────────────────────────────────────────────
  {
    compatibleMachinesIntro: "Order multi-groove bottom knives made to your slit pattern, with custom pitch, working-edge layout and shaft mounting. Send Sureay your drawing and width schedule for a quotation on a one-piece or split-ring configuration.",
    id: "groove-bottom-knives",
    seoDescription:
      "Multi-groove cutter rings for shear slitting. Groove pitch from 5 mm and OD up to 406 mm, with one-piece and split configurations made to drawing.",
    name: "Multi-Groove Bottom Knives",
    fullName: "Multi-Groove Bottom Knives & Cutter Rings",
    category: "slitter_knives",
    sector: "paper",
    categoryDisplay: "Multi-Groove Bottom Knives",
    image: "/images/products/slitter-detail/groove-bottom-knives.webp",
    imageDimensions: standardSquareImage,
    specificationImageDimensions: standardSquareImage,
    description:
      "Custom multi-groove bottom knives for rewinder shear slitting. Replacement cutter rings with specified groove pitch, width, bore and solid or split construction.",
    link: "/products/groove-bottom-knives",
    specs: [
      { label: "Sizes", value: "OD up to 406 mm" },
      {
        label: "Material options",
        value: "Cr12MoV, SKD11, 9CrSi, 65Mn, HSS or carbide-tipped construction",
      },
      {
        label: "Groove pitch",
        value: "From 5 mm; pitch and groove count vary by knife configuration",
      },
      { label: "Construction", value: "One-piece ring or two-piece split ring" },
      { label: "Cutting edges", value: "Single or double working shoulder" },
      {
        label: "Mounting",
        value:
          "Plain bore for an expandable air shaft, or set screw for a solid shaft",
      },
      {
        label: "Applications",
        value:
          "Paper, board, film and foil shear slitting with multiple slit positions",
      },
    ],
    detailLayout: {
      seoTitle: "Multi-Groove Bottom Knives | Bottom Cutter Rings",
      sizeRange: "OD up to 406 mm",
      technicalSpecs: [
        { label: "Sizes", value: "OD up to 406 mm" },
        {
          label: "Material options",
          value: "Cr12MoV, SKD11, 9CrSi, 65Mn, HSS or carbide-tipped construction",
        },
        {
          label: "Groove pitch",
          value: "From 5 mm; pitch and groove count vary by knife configuration",
        },
        { label: "Construction", value: "One-piece ring or two-piece split ring" },
        { label: "Cutting edges", value: "Single or double working shoulder" },
        {
          label: "Mounting",
          value:
            "Plain bore for an expandable air shaft, or set screw for a solid shaft",
        },
        {
          label: "Applications",
          value:
            "Paper, board, film and foil shear slitting with multiple slit positions",
        },
      ],
      heroAlt: "Multi-groove bottom knife ring showing parallel ground grooves",
      specificationImage: {
        src: "/images/products/slitter-detail/groove-bottom-knives-detail.webp",
        alt: "Multi-groove ring showing the stepped bore, grooves and overall body width",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "multi-groove",
          tabLabel: "Multi-Groove Bottom Knives",
          title: "Multi-Groove Bottom Knife Sizes",
          columns: [
            "Item No.",
            "Outer Diameter (mm)",
            "Bore Options (mm)",
            "Width Options (mm)",
          ],
          rows: [
            ["SR001701", "150", "60 / 80 / 90", "39 / 49 / 50"],
            ["SR001702", "130", "100 / 110", "50 / 100"],
            ["SR001703", "150", "120 / 130", "50 / 100"],
            ["SR001704", "180", "150", "50 / 100"],
          ],
        },
        {
          id: "multi-groove-configurations",
          tabLabel: "Ring & Shaft Configurations",
          title: "Ring & Shaft Configurations",
          columns: [
            "Item No.",
            "Outside Diameter (mm / in)",
            "Configuration",
            "Shaft / Mounting",
            "Pitch / Working Edge",
          ],
          rows: [
            [
              "SR001853",
              "Up to Φ406 (16 in)",
              "Multi-groove ring — plain bore",
              "Expandable air shaft",
              "From 5 mm pitch",
            ],
            [
              "SR001854",
              "Up to Φ406 (16 in)",
              "Multi-groove ring — set screw",
              "Solid bottom shaft",
              "From 5 mm pitch",
            ],
            [
              "SR001855",
              "Up to Φ406 (16 in)",
              "Two-piece split ring",
              "Air or solid shaft",
              "From 5 mm pitch",
            ],
            [
              "SR001856",
              "Up to Φ406 (16 in)",
              "Double-edged multi-groove ring",
              "Air or solid shaft",
              "Cutting edges both sides",
            ],
            [
              "SR001857",
              "To drawing",
              "Single-groove cutter ring",
              "Air or solid shaft",
              "One fixed position",
            ],
            [
              "SR001858",
              "To drawing",
              "Smooth spacer ring",
              "Air or solid shaft",
              "No groove — sets spacing",
            ],
          ],
        },
      ],
    },
    compatibleMachines: ["Kampf", "Göbel"],
    components: [
      {
        id: "selection-1",
        tag: "Selection",
        title: "Steel and Carbide-Edged Working Shoulders",
        description:
          "Steel and carbide-tipped constructions are available for multi-groove bottom knives, giving you defined working-edge material options while retaining the ring geometry required by your slitting station.",
      },
      {
        id: "selection-2",
        tag: "Setup",
        title: "Custom Pitch and Cutting-Edge Layouts",
        description:
          "Sureay makes groove patterns, body widths and single- or double-working-shoulder layouts to drawing, allowing replacement blocks to reproduce the cutting positions required by your slit-width schedule.",
      },
      {
        id: "selection-3",
        tag: "Application",
        title: "One-Piece and Split Mounting Designs",
        description:
          "One-piece and two-piece split rings are available with plain bores for expandable air shafts or screw locking for solid shafts, specified to suit the existing mounting arrangement.",
      },
    ],
    faqs: {
      technical: [
        {
          question:
            "Which dimensions define a replacement multi-groove knife block?",
          answer:
            "Define the cutting positions, first-edge location, overall width, outside diameter, bore and locking method together. Multi-groove anvils, knife blocks and bottom slitters describe a bottom cutting body, but do not establish its mounting or edge arrangement. Identify the mating upper knife and cutting method as well: a grooved razor support sleeve performs a different function.",
        },
        {
          question:
            "How should groove pitch and cutting-edge positions be specified?",
          answer:
            "Pitch is the distance between corresponding cutting edges on adjacent grooves. Mark the first working edge from a common axial datum, then show the remaining cutting positions and overall body width. Groove opening width is a separate measurement; it does not define the distance between cutting edges.",
        },
        {
          question:
            "Can Sureay make a knife block to a custom slit-width pattern?",
          answer:
            "Yes. Sureay can make the groove layout, working-edge count, body width and shaft mounting to your drawing. Specify each cutting position from the same axial datum and include the mating top knife. Identify the active cutting edges in the intended slit pattern so the replacement block reproduces the required layout.",
        },
        {
          question:
            "When should I choose a split ring instead of a one-piece ring?",
          answer:
            "Choose according to the shaft arrangement and available installation or removal access. A split ring can provide access where the assembly accommodates that construction, while its joints and locking features must suit the existing design. Keep the required cutting profile, bore fit and working-edge positions defined for either option.",
        },
        {
          question:
            "What should I check when slit quality varies across a multi-groove block?",
          answer:
            "Compare the upper knife and working shoulder at each affected cutting position, including their condition, material pairing and working geometry. Review mounting, knife movement and any previous grinding alongside the slit pattern. Recording which positions produce the defect helps focus the checks on the relevant knife pair and assembly conditions.",
        },
        {
          question:
            "How should working-edge material be chosen when some slit positions wear faster?",
          answer:
            "For paper winding lines, compare the affected working shoulders with their mating top knives before changing material. Separate gradual wear from chips or damage associated with knife movement, geometry or grinding. Once the pair and mounting conditions are established, compare the current steel or carbide-tipped configuration against the actual wear pattern and production requirement.",
        },
        {
          question:
            "What does an Item No. identify when ordering a replacement block?",
          answer:
            "The Item No. identifies the catalog row or series used as the reference for your order. Confirm the selected bore, body width, groove pattern and mating upper knife on the order drawing; some entries cover size options or made-to-drawing layouts. Use the item reference together with that drawing and its revision for repeat purchases.",
        },
      ],
      company: [],
    },
    relatedBladeIds: [
      "bottom-grooved-anvil-knives",
      "slitter-rewinder-bottom-knives",
      "rotary-slitter-knives-paper",
    ],
  },
  {
    "id": "stationary-scrap-shear-blades",
    "name": "Stationary Scrap Shear Blades",
    "fullName": "Stationary Scrap Shear Blades for Gantry Shears",
    seoTitle: "Stationary Scrap Shear Blades for Gantry Shears",
    seoDescription:
      "Order bolt-mounted moving knife blocks and fixed counter knives for stationary gantry scrap shears. Choose 1.2746 or 1.2767 steel and send your mounting drawing.",
    "category": "shear_blades",
    "sector": "metal",
    "categoryDisplay": "Stationary Scrap Shear Blades",
    "image": "/images/products/shear-detail/stationary-scrap-shear-blades.webp",
    "imageDimensions": {
      "width": 800,
      "height": 800,
      "smallerWidths": [320, 480]
    },
    "specificationImageDimensions": {
      "width": 800,
      "height": 800,
      "smallerWidths": [320, 480]
    },
    "description": "Replacement gantry and stationary scrap shear blades in 1.2746 or 1.2767 steel. Moving knives and counter knives made to the specified mounting drawing.",
    "link": "/products/stationary-scrap-shear-blades",
    "specs": [
      { label: "Sizes", value: "260–550 mm" },
      { label: "Material options", value: "1.2746 or 1.2767 tool steel" },
      {
        label: "Knife positions",
        value: "Moving cutting knives and fixed counter knives",
      },
      { label: "Mounting", value: "Bolt-mounted knife blocks" },
      {
        label: "Application",
        value: "Stationary scrap shears and gantry shears",
      },
    ],
    "compatibleMachines": [
      "Danieli Henschel",
      "Metso-Lindemann",
      "Lefort",
      "Becker-Leimbach"
    ],
    "compatibleMachinesIntro": "Replace moving knives and fixed counter knives on your stationary scrap shear with drawing-made knife blocks from Sureay. Order individual pieces or a complete set in 1.2746 or 1.2767 tool steel, and request a quotation for your installation. Machine brands are compatibility references for Sureay aftermarket parts.",
    "components": [
      {
        "id": "stationary-scrap-shear-blades-1",
        "tag": "Knife seat",
        "title": "1.2746 and 1.2767 Tool-Steel Options",
        "description":
          "Sureay offers these steel options for stationary scrap-shear knife blocks, allowing the material requirement to be specified around the scrap duty and the wear or damage observed on the existing knives."
      },
      {
        "id": "stationary-scrap-shear-blades-2",
        "tag": "Scrap duty",
        "title": "Moving Knives and Fixed Counter Knives",
        "description":
          "Replacement cutting knives and counter knives can be supplied individually or as the required set, with each block identified by its position within the shear assembly."
      },
      {
        "id": "stationary-scrap-shear-blades-3",
        "tag": "Knife arrangement",
        "title": "Custom Blocks for Existing Knife Seats",
        "description":
          "Listed knife blocks span 260–550 mm in length. Sureay makes the recesses, seating faces and bolt patterns to your drawing, including blocks with the same length and width but different thicknesses or mounting details."
      }
    ],
    "faqs": {
      technical: [
        {
          question: "Can Sureay supply one counter knife or a complete knife set?",
          answer:
            "Yes. A fixed counter knife can be supplied separately, and the moving and fixed knives can be specified as a complete set. For a set, identify the position, drawing and quantity of each block. For a single replacement, include the retained components that determine its cutting and mounting relationship.",
        },
        {
          question: "What is the difference between a moving knife and a counter knife?",
          answer:
            "The moving knife travels with the shear mechanism. The fixed counter knife supplies the opposing cutting edge. Their body shapes, mounting faces and installed orientations can differ even when their nominal dimensions look similar. Identify each by its working position so a replacement preserves the intended cutting relationship.",
        },
        {
          question: "How should 1.2746 or 1.2767 steel be selected for scrap shear knives?",
          answer:
            "Use the current material specification alongside the scrap composition, section size and knife's wear history. Gradual abrasion, localized chipping and edge deformation indicate different conditions for review. Assess the material and hardness requirements together with the knife support and cutting duty before selecting an alternative to the existing steel.",
        },
        {
          question: "How do I identify a stationary scrap shear knife block when length and width match?",
          answer:
            "Check thickness first, followed by the bolt pattern, recesses and locating faces. For example, the catalog includes 525 × 200 mm blocks with different thicknesses. Use the full dimensions, Item No. and drawing together to confirm the block for the correct moving or fixed position.",
        },
        {
          question: "Can a worn stationary scrap-shear knife be indexed or reground?",
          answer:
            "Indexing is possible if the design allows an unused edge to seat correctly. Regrinding is possible if the block can recover its specified cutting height and seating within the machine's limits. Assess the cutting edge and the body surfaces that locate the block before returning it to service.",
        },
        {
          question: "Can stationary scrap shear knives replace alligator shear blades?",
          answer:
            "No. A stationary gantry shear uses a different knife seat and cutting mechanism from a hinged-jaw alligator shear. For upper and lower knives on a hinged-jaw machine, see [Alligator Shear Blades](/products/metal-shear-knives).",
        },
        {
          question: "How do I get a quote for stationary gantry scrap shear knives?",
          answer:
            "Send the machine model and version, scrap section and the drawing or part number for each block. List moving and fixed positions separately with quantities. Include full block thickness, recesses and mounting datums when several positions use similar body outlines.",
        },
      ],
      company: [],
    },
    "quoteRequirements": "Send the stationary shear model and serial number, blade position, full knife drawing, scrap material and quantity.",
    "rfqPlaceholder": "Send the stationary shear model and serial number, blade position, full knife drawing, scrap material and quantity.",
    "relatedBladeIds": [
      "metal-shear-knives",
      "guillotine-shear-blades"
    ],
    "isFeatured": false,
    "dimensionLabels": {
      "intro": "Published replacement-knife configurations are shown for dimensional reference. Each family has multiple models and mounting patterns. Supply the full drawing before ordering; these are not interchangeable blades or an industry-wide size standard."
    },
    "detailLayout": {
      "heroAlt": "Stationary scrap shear blade with two mounting holes",
      "sizeRange": "260–550 mm",
      "heroSpecs": [
        {
          "label": "Material",
          "value": "1.2746 / 1.2767; specified heat treatment"
        },
        {
          "label": "Application",
          "value": "Stationary scrap shears and gantry shears"
        }
      ],
      "technicalSpecs": [
        { label: "Sizes", value: "260–550 mm" },
        { label: "Material options", value: "1.2746 or 1.2767 tool steel" },
        {
          label: "Knife positions",
          value: "Moving cutting knives and fixed counter knives",
        },
        { label: "Mounting", value: "Bolt-mounted knife blocks" },
        {
          label: "Application",
          value: "Stationary scrap shears and gantry shears",
        },
      ],
      "dimensionTables": [
        {
          "id": "standard-dimensions",
          "tabLabel": "Standard dimensions",
          "title": "Common Standard Dimensions",
          "columns": [
            "Item No.",
            "Reference family",
            "Length (mm)",
            "Width (mm)",
            "Thickness (mm)"
          ],
          "rows": [
            [
              "SR003601",
              "Danieli Henschel · knife configuration",
              "525",
              "200",
              "100"
            ],
            [
              "SR003602",
              "Metso-Lindemann · knife configuration",
              "525",
              "200",
              "80"
            ],
            [
              "SR003603",
              "Becker-Leimbach · knife configuration",
              "518",
              "200",
              "120"
            ],
            [
              "SR003604",
              "Danieli Henschel · counter knife",
              "260",
              "200",
              "100"
            ],
            [
              "SR003605",
              "Lefort · knife configuration",
              "550",
              "200",
              "100"
            ],
            [
              "SR003606",
              "Lefort · knife configuration",
              "510",
              "140",
              "50"
            ]
          ]
        }
      ],
      "inlineRfq": {
        "title": "Request a quote for your knife configuration",
        "description": "Send the stationary shear model and serial number, blade position, full knife drawing, scrap material and quantity.",
        "buttonLabel": "Request a quote"
      }
    }
  },
  {
    "id": "flying-shear-blades",
    "name": "Flying Shear Blades",
    "fullName": "Crop & Flying Shear Blades for Rolling Mills",
    seoTitle: "Flying Shear Blades | Custom Rolling-Mill Knives",
    "category": "shear_blades",
    "sector": "metal",
    "categoryDisplay": "Flying Shear Blades",
    "image": "/images/products/shear-detail/crop-flying-shear-blades.webp",
    "imagePending": false,
    "imageDimensions": {
      "width": 600,
      "height": 600,
      "smallerWidths": [
        320,
        480
      ]
    },
    "specificationImageDimensions": {
      "width": 600,
      "height": 600,
      "smallerWidths": [
        320,
        480
      ]
    },
    "description": "Custom crop and flying shear blades for rolling mills. Straight or profiled knives for hot, cold or quenched-bar cutting, manufactured to drawing.",
    "link": "/products/flying-shear-blades",
    "specs": [
      { label: "Sizes", value: "Made to Drawing" },
      {
        label: "Blade geometry",
        value: "Straight or profiled cutting edges; stepped knife bodies",
      },
      {
        label: "Material options",
        value: "Hot-work tool steel or high-alloy tool steel",
      },
      {
        label: "Cutting duty",
        value:
          "Hot cutting, cold cutting or quenched-bar cutting configurations",
      },
      {
        label: "Application",
        value:
          "Head/tail cropping and dividing cuts on rolling-mill flying shears",
      },
    ],
    "compatibleMachines": [
      "Danieli"
    ],
    "compatibleMachinesIntro": "Source custom crop and flying shear blades for your rolling mill, including straight, profiled and stepped knife bodies. Sureay offers hot-work and high-alloy tool-steel options; share your drawing and cutting duty for a tailored replacement quotation. Machine brands are compatibility references for Sureay aftermarket parts.",
    "components": [
      {
        "id": "flying-shear-blades-1",
        "tag": "Thermal duty",
        "title": "Materials for Hot, Cold and Quenched-Bar Cutting",
        "description":
          "Hot-work and high-alloy tool-steel options allow the knife material to be specified for the rolled product and temperature conditions at the cutting station."
      },
      {
        "id": "flying-shear-blades-2",
        "tag": "Profile matching",
        "title": "Drawing-Matched Profiles for Bar and Section Cutting",
        "description":
          "Sureay makes straight and profiled blades, including stepped bodies and shaped cutting edges. The stock cross-section and installed shear geometry define the blade contour and mounting datums for each knife position."
      },
      {
        "id": "flying-shear-blades-3",
        "tag": "Service condition",
        "title": "Custom Knife Pairs for Cropping and Dividing",
        "description":
          "Individual knives and paired replacements can be made to position-specific drawings for head-and-tail cropping or dividing cuts, with each knife's orientation and interface defined for the existing assembly."
      }
    ],
    "faqs": {
      technical: [
        {
          question: "Can Sureay make custom flying shear blades for an existing rolling mill?",
          answer:
            "Yes. Sureay makes straight, profiled and stepped replacements to drawing. For a profiled bar or section knife, the working contour, datum faces and mounting features are specified together. The material can then be selected for the actual cut temperature and load.",
        },
        {
          question: "Are crop shear knives and flying shear blades the same?",
          answer:
            "They overlap when a flying shear crops the head or tail of moving stock. Cropping describes where the cut is made. Flying describes cutting in coordination with moving stock, which can also be used to divide it into lengths. The installed shear and knife position define the replacement.",
        },
        {
          question: "What changes when selecting knives for hot and cold cutting?",
          answer:
            "The edge encounters different thermal and mechanical conditions. Specify the stock grade, cross-section and temperature condition at the cutting station, together with the existing knife material. Compare those requirements with the available hot-work or high-alloy tool-steel options while retaining the required body and cutting profile.",
        },
        {
          question: "Why should quenched-bar cutting be identified separately?",
          answer:
            "The surface and core of a quenched bar can be in different conditions when it reaches the shear. Those conditions affect the duty alongside the steel grade and bar section. Record the actual condition at the cutting point so a replacement material can be assessed for that operation rather than from a general hot-or-cold label alone.",
        },
        {
          question: "What determines the profile of a flying shear knife?",
          answer:
            "The stock cross-section and motion of the shear determine how the cutting edges engage. Curves, steps and edge orientation form part of that working geometry, together with the knife's mounting datums. Reproduce the specified contour when replacing the knife, including the relationship with its mating component.",
        },
        {
          question: "Can a worn flying shear knife be used as the replacement sample?",
          answer:
            "Yes. A worn knife can show the stepped body, locating faces and mounting holes. Identify which position it came from and mark reground surfaces. Use the original drawing or an unused mating reference, where available, to distinguish the intended contour from the remaining edge.",
        },
        {
          question: "What should I send to quote a flying shear blade pair?",
          answer:
            "Send the mill or shear model, drawings for both knife positions and quantities. State whether the cut crops the head or tail or divides the stock to length. Include the rolled section, steel grade, cutting-point temperature and line speed so the drawings and material specification can be considered together.",
        },
      ],
      company: [],
    },
    "quoteRequirements": "Send the mill/shear model, knife drawings, product section and grade, cutting temperature, line speed, blade positions and quantities.",
    "rfqPlaceholder": "Send the mill/shear model, knife drawings, product section and grade, cutting temperature, line speed, blade positions and quantities.",
    "relatedBladeIds": [
      "guillotine-shear-blades",
      "stationary-scrap-shear-blades"
    ],
    "isFeatured": false,
    "dimensionLabels": {
      "intro": "Flying shear bodies and profiles are specific to the mill and shear mechanism. Complete standard body dimensions are not available for a universal configuration; supply the original drawing or a dimensioned sample."
    },
    "detailLayout": {
      "heroAlt": "Crop and flying shear knife samples with stepped bodies and mounting holes",
      "sizeRange": "Made to Drawing",
      "heroSpecs": [
        {
          "label": "Material",
          "value": "Hot-work / high-alloy tool steel to duty"
        },
        {
          "label": "Application",
          "value": "Head/tail cropping and dividing cuts on rolling-mill flying shears"
        }
      ],
      "technicalSpecs": [
        { label: "Sizes", value: "Made to Drawing" },
        {
          label: "Blade geometry",
          value: "Straight or profiled cutting edges; stepped knife bodies",
        },
        {
          label: "Material options",
          value: "Hot-work tool steel or high-alloy tool steel",
        },
        {
          label: "Cutting duty",
          value:
            "Hot cutting, cold cutting or quenched-bar cutting configurations",
        },
        {
          label: "Application",
          value:
            "Head/tail cropping and dividing cuts on rolling-mill flying shears",
        },
      ],
      "dimensionTables": [],
      "inlineRfq": {
        "title": "Request a quote for your knife configuration",
        "description": "Send the mill/shear model, knife drawings, product section and grade, cutting temperature, line speed, blade positions and quantities.",
        "buttonLabel": "Request a quote"
      }
    }
  },
  {
    "id": "paper-sheeter-knives",
    "name": "Paper Sheeter Knives",
    "fullName": "Paper Sheeter & Cross-Cutting Knives",
    seoTitle: "Paper Sheeter Knives | Custom Replacement Blades",
    "category": "paper_cutting",
    "sector": "paper",
    "categoryDisplay": "Paper Sheeter Knives",
    "image": "/images/products/shear-detail/paper-sheeter-knives-cover.webp",
    "imageDimensions": {
      "width": 800,
      "height": 800,
      "smallerWidths": [320, 480]
    },
    "specificationImageDimensions": {
      "width": 680,
      "height": 1208,
      "smallerWidths": [320, 480]
    },
    "description": "Custom replacement paper sheeter and cross-cutting knives. HSS, PM steel or carbide-tipped edges for paper and board webs, made to your mounting profile.",
    "link": "/products/paper-sheeter-knives",
    "specs": [
      { label: "Sizes", value: "2230–2285 mm" },
      {
        label: "Reference configurations",
        value: "Jagenberg Synchro-series knife bodies listed below",
      },
      {
        label: "Knife arrangement",
        value: "Radial or tangential installation",
      },
      {
        label: "Material options",
        value: "HSS, powder-metallurgy steel or carbide-tipped constructions",
      },
      {
        label: "Application",
        value: "Cross cutting continuous paper and board webs into sheets",
      },
    ],
    "compatibleMachines": [
      "Jagenberg",
      "Bielomatik",
      "E.C.H. Will",
      "Pasaban"
    ],
    "compatibleMachinesIntro": "Get replacement paper sheeter knives with custom lengths, clamping profiles and cutting-edge geometry for your machine. Sureay offers HSS, powder-metallurgy steel and carbide-tipped options for paper and board cross-cutting; send your drawing for a quotation. Machine brands are compatibility references for Sureay aftermarket parts.",
    "components": [
      {
        "id": "paper-sheeter-knives-1",
        "tag": "Cross-cutting duty",
        "title": "HSS, PM Steel and Carbide-Tipped Options",
        "description":
          "Sureay offers these material choices for cross-cutting paper and board webs, allowing the knife construction to be specified for the stock, production duty and existing maintenance process."
      },
      {
        "id": "paper-sheeter-knives-2",
        "tag": "Installation",
        "title": "Radial and Tangential Knife Configurations",
        "description":
          "Replacement knives are available for radial and tangential arrangements, with body profiles and clamping features made for the installed cutting cylinder."
      },
      {
        "id": "paper-sheeter-knives-3",
        "tag": "Edge finish",
        "title": "Long Sheeter Knives Made to Drawing",
        "description":
          "Listed sheeter knife lengths span 2230–2285 mm. Sureay makes the complete cross-section, clamping profile, working edge and finish to drawing for replacement knives on existing cutting cylinders."
      }
    ],
    "faqs": {
      technical: [
        {
          question: "Which replacement paper sheeter knife fits my machine?",
          answer:
            "Identify the sheeter model and version, knife position and mounting drawing. Match the complete cross-section, clamping surfaces, cutting profile and installed orientation. The mating knife also forms part of the arrangement. Use those details with the original part reference to select the required replacement configuration.",
        },
        {
          question: "How are paper sheeter knives different from slitter and guillotine knives?",
          answer:
            "A sheeter knife cuts across a moving paper or board web to make sheets. A slitter knife cuts lengthwise along the web and a guillotine knife cuts a clamped stack. For the lengthwise operation, see [Paper Slitter Knives](/products/rotary-slitter-knives-paper).",
        },
        {
          question: "How should HSS, PM steel and carbide-tipped sheeter knives be compared?",
          answer:
            "Compare performance on the same paper grade, web arrangement and cut-quality requirement. Gradual edge wear, chipping and the available sharpening process should guide the material assessment. Keep the existing mounting and working profile defined so that an alternative material can be evaluated within the actual sheeter configuration.",
        },
        {
          question: "Why can a sheeter leave a poor cross-cut even with new knives?",
          answer:
            "The adjustment between the mating knives, their cutting geometry, ground finish and machine condition can affect the cut. Higher grammage or several webs together can change the cutting duty. Compare the installed geometry and setup with the machine requirements, and record the stock and defect before deciding that the knife material needs changing.",
        },
        {
          question: "What does radial or tangential knife installation mean?",
          answer:
            "The terms describe the knife's position relative to the cutting cylinder. Each arrangement has its own body profile, clamping and working-edge position. The replacement should reproduce the installed design, including the mating knife relationship. Overall length and thickness are only part of the information required to identify that arrangement.",
        },
        {
          question: "Do the listed sizes fit every Jagenberg Synchro sheeter?",
          answer:
            "No. Jagenberg Synchro machines can use different knife bodies and clamping arrangements by version. Use the listed Item No. as a reference and compare the full cross-section and clamping faces with the drawing for your installed knife.",
        },
        {
          question: "Which geometric requirements matter when ordering long sheeter knives?",
          answer:
            "Cutting-edge straightness, face parallelism, thickness and bevel finish describe different aspects of the knife. State their required values and measurement datums on the working drawing. Those requirements allow the finished knife to be assessed consistently and help preserve the intended relationship between its clamping surfaces and working edge.",
        },
        {
          question: "What do you need to quote a radial or tangential paper sheeter knife?",
          answer:
            "Provide the sheeter model and version, mounting and knife drawings, paper or board grade, and quantity. Label radial or tangential installation, the clamping surfaces and the mating position. Include the working-edge datums and finish requirement if defined on your drawing.",
        },
      ],
      company: [],
    },
    "quoteRequirements": "Send the sheeter model, knife and clamp drawings, radial/tangential arrangement, stock grade, web conditions and quantities.",
    "rfqPlaceholder": "Send the sheeter model, knife and clamp drawings, radial/tangential arrangement, stock grade, web conditions and quantities.",
    "relatedBladeIds": [
      "paper-cutting-blades",
      "rotary-slitter-knives-paper"
    ],
    "isFeatured": false,
    "dimensionLabels": {
      "intro": "Reference dimensions follow historical IKS Klingelnberg sheeter configurations. They do not identify every Synchro version or specify the full clamping profile. Confirm the model, installation arrangement and original knife drawing before ordering."
    },
    "detailLayout": {
      "heroAlt": "Long paper sheeter knife with countersunk mounting holes",
      "specificationImage": {
        "src": "/images/products/shear-detail/paper-sheeter-knives-detail.webp",
        "alt": "Paper sheeter knives on workshop supports showing mounting holes and edge details"
      },
      "sizeRange": "2230–2285 mm",
      "heroSpecs": [
        {
          "label": "Material",
          "value": "HSS / PM steel / carbide-tipped"
        },
        {
          "label": "Application",
          "value": "Cross cutting continuous paper and board webs into sheets"
        }
      ],
      "technicalSpecs": [
        { label: "Sizes", value: "2230–2285 mm" },
        {
          label: "Reference configurations",
          value: "Jagenberg Synchro-series knife bodies listed below",
        },
        {
          label: "Knife arrangement",
          value: "Radial or tangential installation",
        },
        {
          label: "Material options",
          value: "HSS, powder-metallurgy steel or carbide-tipped constructions",
        },
        {
          label: "Application",
          value: "Cross cutting continuous paper and board webs into sheets",
        },
      ],
      "dimensionTables": [
        {
          "id": "standard-dimensions",
          "tabLabel": "Standard dimensions",
          "title": "Common Standard Dimensions",
          "columns": [
            "Item No.",
            "Reference configuration",
            "Length (mm)",
            "Width (mm)",
            "Thickness (mm)"
          ],
          "rows": [
            [
              "SR004101",
              "Jagenberg Synchro · radial",
              "2285",
              "55",
              "10"
            ],
            [
              "SR004102",
              "Jagenberg Synchro · radial",
              "2285",
              "32",
              "10"
            ],
            [
              "SR004103",
              "Jagenberg Synchro · radial / conical",
              "2230",
              "60",
              "9.5"
            ],
            [
              "SR004104",
              "Jagenberg Synchro · radial / conical",
              "2230",
              "35",
              "10"
            ],
            [
              "SR004105",
              "Jagenberg Synchro · tangential",
              "2285",
              "40",
              "12"
            ],
            [
              "SR004106",
              "Jagenberg Synchro · tangential",
              "2285",
              "38",
              "12"
            ]
          ]
        }
      ],
      "inlineRfq": {
        "title": "Request a quote for your knife configuration",
        "description": "Send the sheeter model, knife and clamp drawings, radial/tangential arrangement, stock grade, web conditions and quantities.",
        "buttonLabel": "Request a quote"
      }
    }
  },
  {
    "id": "saddle-stitcher-trimmer-knives",
    "name": "Saddle Stitcher Trimmer Knives",
    "fullName": "Saddle Stitcher Trimmer Knives",
    seoTitle: "Saddle Stitcher Trimmer Knives for Booklets",
    seoDescription:
      "Replace front or side knives on saddle-stitching lines for booklets and magazines. See DS 304 / Tempo reference sizes and HSS or carbide-tipped options.",
    "category": "paper_cutting",
    "sector": "paper",
    "categoryDisplay": "Saddle Stitcher Trimmer Knives",
    "image": "/images/products/shear-detail/saddle-stitcher-trimmer-knives-cover-transparent.webp",
    "imageDimensions": {
      "width": 800,
      "height": 800,
      "smallerWidths": [320, 480]
    },
    "specificationImageDimensions": {
      "width": 800,
      "height": 559,
      "smallerWidths": [320, 480]
    },
    "description": "Replacement saddle stitcher trimmer knives for booklets and magazines. Front, side, upper and lower knives in tool steel, HSS or carbide-tipped versions.",
    "link": "/products/saddle-stitcher-trimmer-knives",
    "specs": [
      { label: "Sizes", value: "280–400 mm" },
      {
        label: "Reference configurations",
        value: "Müller Martini DS 304 / Tempo knife positions listed below",
      },
      {
        label: "Knife positions",
        value:
          "Front upper, side upper, front lower and side lower; left- and right-hand knives",
      },
      {
        label: "Material options",
        value: "Tool steel, HSS or carbide-tipped cutting edges",
      },
      {
        label: "Application",
        value: "Trimming stitched booklets, brochures and magazines",
      },
    ],
    "compatibleMachines": [
      "Müller Martini",
      "Heidelberg",
      "Horizon"
    ],
    "compatibleMachinesIntro": "Order front, side, upper or lower saddle-stitcher trimmer knives from Sureay, including individual replacements and custom knife profiles. Tool steel, HSS and carbide-tipped options are available; send your position-labelled drawings for a quotation tailored to your stitching line. Machine brands are compatibility references for Sureay aftermarket parts.",
    "components": [
      {
        "id": "saddle-stitcher-trimmer-knives-1",
        "tag": "Knife matching",
        "title": "Tool Steel, HSS and Carbide-Tipped Edges",
        "description":
          "Material options for booklet and magazine trimming allow replacement orders to reflect the paper stock, cutting duty and edge wear on the existing line."
      },
      {
        "id": "saddle-stitcher-trimmer-knives-2",
        "tag": "Booklet finish",
        "title": "Front, Side, Upper and Lower Knife Positions",
        "description":
          "Listed knife lengths span 280–400 mm. Sureay supplies front and side positions in upper, lower, left- and right-hand configurations so buyers can order the parts needed for their trimmer."
      },
      {
        "id": "saddle-stitcher-trimmer-knives-3",
        "tag": "Special configurations",
        "title": "Custom Profiles for Existing Stitching Lines",
        "description":
          "Drawing-defined bodies, bevels and mounting holes support replacement of existing knives, with special profiles specified together with their mating parts and installed orientation."
      }
    ],
    "faqs": {
      technical: [
        {
          question: "How do I identify replacement knives for a saddle-stitching line?",
          answer:
            "Identify the stitcher and trimmer version, then specify front or side, upper or lower, and left or right where relevant. The original reference and mounting drawing distinguish the positions. Include bevel direction and installed orientation so the replacement follows the actual knife arrangement used for your booklets or magazines.",
        },
        {
          question: "Can I replace just one damaged side knife?",
          answer:
            "Yes. A side knife can be supplied separately when its position and mounting are identified. Inspect the retained mating knife and record its dimensions and regrinding history. Use the left- or right-hand part reference with the upper or lower position, because those features determine which replacement is required.",
        },
        {
          question: "How should knife material be chosen for coated booklet stock?",
          answer:
            "Compare the existing edge wear with the paper coating, booklet thickness and production duty. Gradual abrasion and edge chipping call for different material considerations. The available grinding process also affects the choice of tool steel, HSS or carbide-tipped construction. Keep the specified bevel and mounting geometry with the material requirement.",
        },
        {
          question: "Do the listed knives cover every Müller Martini DS 304 / Tempo configuration?",
          answer:
            "No. The listed Item No. entries cover specific Müller Martini DS 304 / Tempo knife positions and dimensions. Compare the version and original part reference for the front upper, side upper, front lower or side lower knife with the full mounting drawing.",
        },
        {
          question: "When should a saddle-stitcher knife be replaced instead of reground?",
          answer:
            "Remaining knife height and, for inlaid or tipped knives, usable cutting-edge material govern whether the working geometry can be restored. Use the wear limit for that knife construction and the trimmer's adjustment limits. Upper and lower knives can differ in construction, so assess each position separately when deciding which parts require replacement.",
        },
        {
          question: "Are saddle-stitcher knives also called three-knife trimmer blades?",
          answer:
            "Sometimes. The terms overlap when a saddle-stitching line trims three sides of a booklet. Identify the stitcher and the exact upper, lower, front or side position when ordering. For separate three-knife sets used on bound book blocks, see [Three-Knife Trimmer Blades](/products/three-knife-trimmer-blades).",
        },
        {
          question: "What should I send for a saddle stitcher trimmer knife quote?",
          answer:
            "Send the stitcher and trimmer model, booklet stock, original part numbers or drawings, and quantities. Label upper or lower, front or side, and left or right where applicable. For a splitter or V-phase arrangement, include the actual profile and the mating knife drawing.",
        },
      ],
      company: [],
    },
    "quoteRequirements": "Send the saddle stitcher/trimmer model, version, position-labelled knife drawings, stock and booklet thickness, and quantities.",
    "rfqPlaceholder": "Send the saddle stitcher/trimmer model, version, position-labelled knife drawings, stock and booklet thickness, and quantities.",
    "relatedBladeIds": [
      "three-knife-trimmer-blades",
      "paper-cutting-blades"
    ],
    "isFeatured": false,
    "dimensionLabels": {
      "intro": "DS 304 / Tempo reference dimensions follow the DIENES paper-knife catalogue, page 34. Left and right upper knives have separate Item No. entries even where their outside dimensions match. Confirm the full hole pattern and knife drawing; other machine versions are made to drawing."
    },
    "detailLayout": {
      "heroAlt": "Saddle stitcher trimmer knife set showing straight and shaped blades with mounting holes",
      "specificationImage": {
        "src": "/images/products/shear-detail/saddle-stitcher-trimmer-knives-detail.webp",
        "alt": "Three trimmer knives on a workshop surface showing cutting bevels and mounting holes"
      },
      "sizeRange": "280–400 mm",
      "heroSpecs": [
        {
          "label": "Material",
          "value": "Tool steel / HSS / carbide-tipped"
        },
        {
          "label": "Application",
          "value": "Trimming stitched booklets, brochures and magazines"
        }
      ],
      "technicalSpecs": [
        { label: "Sizes", value: "280–400 mm" },
        {
          label: "Reference configurations",
          value: "Müller Martini DS 304 / Tempo knife positions listed below",
        },
        {
          label: "Knife positions",
          value:
            "Front upper, side upper, front lower and side lower; left- and right-hand knives",
        },
        {
          label: "Material options",
          value: "Tool steel, HSS or carbide-tipped cutting edges",
        },
        {
          label: "Application",
          value: "Trimming stitched booklets, brochures and magazines",
        },
      ],
      "dimensionTables": [
        {
          "id": "standard-dimensions",
          "tabLabel": "Standard dimensions",
          "title": "Common Standard Dimensions",
          "columns": [
            "Item No.",
            "Machine / position",
            "Length (mm)",
            "Width (mm)",
            "Thickness (mm)"
          ],
          "rows": [
            [
              "SR004201",
              "DS 304 / Tempo · front upper",
              "390",
              "60",
              "8"
            ],
            [
              "SR004202",
              "DS 304 / Tempo · side upper, right",
              "280",
              "60",
              "8"
            ],
            [
              "SR004203",
              "DS 304 / Tempo · side upper, left",
              "280",
              "60",
              "8"
            ],
            [
              "SR004204",
              "DS 304 / Tempo · front lower",
              "400",
              "40",
              "15"
            ],
            [
              "SR004205",
              "DS 304 / Tempo · side lower",
              "295",
              "32",
              "15"
            ]
          ]
        }
      ],
      "inlineRfq": {
        "title": "Request a quote for your knife configuration",
        "description": "Send the saddle stitcher/trimmer model, version, position-labelled knife drawings, stock and booklet thickness, and quantities.",
        "buttonLabel": "Request a quote"
      }
    }
  },

];

// Preserve the established detail page for grayboard tooling separately from
// the corrugated slotter and the current product grids.
const boxSlottingBlade: Blade = {
  id: "box-slotting-knives",
  name: "Box Slotting Knives",
  fullName: "Precision Carbide Slotting Knives for Rigid & Gift Box Grooving",
  seoTitle: "Box Slotting Knives | Carbide Grooving Knives",
  category: "slitter_knives",
  sector: "converting",
  categoryDisplay: "Packaging & Board Knives",
  image: "/images/products/box-slotting-knives/box-slotting-knives-01.webp",
  description:
    "Carbide slotting knives for greyboard V-grooving on rigid and gift box lines. Matched left- and right-hand pairs in GS05U and GS20U, with five listed sizes.",
  link: "/products/box-slotting-knives",
  specs: [
    { label: "Material", value: "Tungsten carbide" },
    { label: "Grades", value: "GS05U or GS20U" },
    { label: "Length", value: "50 / 60 mm" },
    { label: "Width", value: "12 / 15 / 16 mm" },
    { label: "Thickness", value: "2.0 / 2.2 mm" },
    { label: "Supply", value: "Matched left- and right-hand pairs" },
    { label: "Application", value: "Greyboard V-grooving on rigid and gift box lines" },
  ],
  dimensionLabels: { col0: "Item", col1: "L × W (mm)", col2: "Thickness (mm)" },
  standardDimensions: [
    { spec: "1", od: "50 × 12", id: "2 / 2.2" },
    { spec: "2", od: "50 × 15", id: "2 / 2.2" },
    { spec: "3", od: "50 × 16", id: "2 / 2.2" },
    { spec: "4", od: "60 × 12", id: "2 / 2.2" },
    { spec: "5", od: "60 × 15", id: "2 / 2.2" },
  ],
  components: [
    {
      id: "matched-pairs",
      tag: "Supply format",
      title: "Matched Left- and Right-Hand Pairs",
      description:
        "Order the two knives together so each side of the V-groove can be specified with its mating cutting edge.",
    },
    {
      id: "carbide-grades",
      tag: "Material options",
      title: "GS05U and GS20U Carbide Options",
      description:
        "Choose a wear-oriented or toughness-oriented grade according to the board and the wear on your existing knives.",
    },
    {
      id: "drawing-based-pairs",
      tag: "Custom dimensions",
      title: "Replacement Pairs Made to Drawing",
      description:
        "Specify the knife body, bevel and cutting hand for your existing V-grooving station. Five reference sizes give buyers a starting point for repeat orders.",
    },
  ],
  relatedBladeIds: ["corrugated-slotter-knives"],
  quoteRequirements:
    "Send your machine model, knife drawing or sample, greyboard thickness and the number of pairs you need.",
  faqs: {
    technical: [
      {
        question: "What is a rigid box V-grooving knife used for?",
        answer:
          "It cuts a groove in greyboard so the board can fold at the required line on a rigid box or gift box. For flap slots in corrugated cartons, see [Corrugated Slotter Knives](/products/corrugated-slotter-knives).",
      },
      {
        question: "Are V-grooving knives supplied as pairs?",
        answer:
          "Yes. A matched left- and right-hand pair defines both walls of the groove. Specify the two hands and the orientation for your machine.",
      },
      {
        question: "How should I choose between GS05U and GS20U?",
        answer:
          "GS05U is the wear-oriented option and GS20U is the toughness-oriented option. Compare your board composition and whether your existing edge wears smoothly or chips.",
      },
      {
        question: "Do the listed sizes cover custom V-grooving knives?",
        answer:
          "The table lists five reference configurations. Custom lengths, widths and bevels can be specified to drawing for the installed knife holder.",
      },
      {
        question: "What should I check if the face of the greyboard frays?",
        answer:
          "Check for dull or chipped edges and confirm the knife setting for the board thickness. A defect appearing immediately after a board change can indicate a setup issue.",
      },
      {
        question: "What should I send for a box V-grooving knife quote?",
        answer:
          "Send the machine model, knife drawing or sample and the number of pairs. Include the board thickness and show the bevels and mounting faces for both cutting hands.",
      },
    ],
    company: [],
  },
};

export const bladeDetailPages = [...blades, boxSlottingBlade];

// Local product previews are kept outside the public catalog.
export const draftBlades: Blade[] = [
  {
    id: "filter-rod-cutting-blades",
    draft: true,
    name: "Filter Rod Cutting Blades",
    fullName: "Filter Rod Cutting Blades",
    category: "slitter_knives",
    sector: "converting",
    categoryDisplay: "Filter Rod Cutting Blades",
    image: "/images/products/slitter-detail/filter-rod-cutting-blades.webp",
    description:
      "Circular knives for filter rod cutting stations. Compare five standard reference sizes for Hauni KDF 2 and G.D AF machines and quote to drawing.",
    link: "/products/filter-rod-cutting-blades",
    specs: [
      { label: "Material", value: "Fine-grain tungsten carbide" },
      { label: "Applications", value: "Filter rod cut-off and segmentation" },
      { label: "Listed bore sizes", value: "19, 19.05, 19.5 or 20 mm" },
      { label: "Listed blade thickness", value: "0.25 or 0.30 mm" },
      { label: "Mounting", value: "Bore, drive holes and cutting hand to station drawing" },
    ],
    detailLayout: {
      seoTitle: "Filter Rod Cutting Blades for Hauni KDF & G.D AF",
      sizeRange: "Standard examples OD 60–64 mm",
      heroAlt: "Schematic of a circular filter rod cutting blade with a center bore",
      specificationImage: {
        src: "/images/products/slitter-detail/filter-rod-cutting-blades-detail.webp",
        alt: "Filter rod knife schematic showing a 60 mm outer diameter and 19 mm bore",
      },
      inlineRfq: slitterRfq,
      dimensionTables: [
        {
          id: "rod",
          tabLabel: "Filter Rod Cutting Blades",
          title: "Filter Rod Cutting Blades",
          columns: [
            ITEM_NO_COLUMN,
            "Dimensions (OD × ID × W)",
            "Equipment reference",
          ],
          rows: [
            ["SR001671", "60 × 19 × 0.25 mm", "Hauni KDF 2"],
            ["SR001672", "60 × 20 × 0.30 mm", "Hauni KDF 2"],
            ["SR001673", "61 × 19.05 × 0.30 mm", "G.D AF"],
            ["SR001674", "63 × 19.05 × 0.30 mm", "G.D AF"],
            ["SR001675", "64 × 19.5 × 0.30 mm", "G.D AF dimensional reference"],
          ],
        },
      ],
    },
    compatibleMachines: ["Hauni", "G.D"],
    components: [
      {
        id: "station",
        tag: "Selection",
        title: "Identify the filter rod cutting station",
        description:
          "Start with the machine model and knife position. Send the existing blade drawing or a worn sample to confirm the bore, mounting and cutting hand.",
      },
      {
        id: "bore",
        tag: "Mounting",
        title: "Check the bore and drive holes",
        description:
          "Use the drawing or installed blade to verify the bore and any drive-hole pattern. The machine family alone leaves several possible sizes.",
      },
      {
        id: "cut",
        tag: "Application",
        title: "Specify the rod construction",
        description:
          "Include the rod material, diameter and the finish required at the cut end when requesting a replacement.",
      },
    ],
    faqs: {
      technical: [
        {
          question: "Can I order by Hauni KDF 2 or G.D AF model alone?",
          answer:
            "Use the table to identify a reference size, then supply the station model and drawing or sample so we can check the fit.",
        },
        {
          question: "What measurements should I send with a sample?",
          answer:
            "Include the outer diameter, bore, blade thickness and any mounting holes. A photo of both faces helps identify the cutting edge.",
        },
      ],
      company: [
        {
          question: "Can you quote a size outside the table?",
          answer: "Send a drawing or sample with the required quantity for a custom quotation.",
        },
      ],
    },
    relatedBladeIds: ["tungsten-carbide-slitter-knives", "rotary-slitter-knives"],
  },
];

// ───────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get a blade by ID
 */
export function getBladeById(id: string): Blade | undefined {
  return bladeDetailPages.find(b => b.id === id);
}

export function getWebpImageSrcSet(
  src: string,
  dimensions?: BladeImageDimensions
): string | undefined {
  if (!dimensions || !src.endsWith(".webp")) return undefined;

  const stem = src.slice(0, -".webp".length);
  return [
    ...dimensions.smallerWidths.map(width => `${stem}-${width}w.webp ${width}w`),
    `${src} ${dimensions.width}w`,
  ].join(", ");
}

/** Summarize the listed primary dimensions for cards and detail-page heroes. */
export function getBladeSizeRange(
  blade: Blade,
  source: Blade = blade
): string | undefined {
  if (source.detailLayout?.sizeRange) return source.detailLayout.sizeRange;

  const { col0, col1, col2 } = source.dimensionLabels ?? {};
  const hasLengthColumn = /^Overall Length\b/i.test(col0 ?? "");
  const secondColumn = /^Dimensions\b/i.test(col2 ?? "");
  const values = source.standardDimensions?.map(row =>
    hasLengthColumn
      ? row.spec
      : secondColumn
        ? row.id
        : (row.dimension ?? row.od ?? row.spec)
  );
  // Use the primary dimension, in mm. Reject text-only or mixed-unit columns.
  const sizes = values?.map(value =>
    value?.match(
      /^\s*([ØΦ])?\s*(\d+(?:\.\d+)?)(?:\s*[–—-]\s*(\d+(?:\.\d+)?))?(\+)?(?=\s*(?:mm\b|[×x*()]|$))/i
    )
  );
  if (
    sizes?.length &&
    sizes.every((size): size is RegExpMatchArray => size != null)
  ) {
    const numbers = sizes.flatMap(size => [
      Number(size[2]),
      Number(size[3] ?? size[2]),
    ]);
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const diameter =
      sizes.every(size => size[1]) || /diameter|^Hole Ø/i.test(col1 ?? "");
    const openEnded = sizes.some(
      size => size[4] && Number(size[3] ?? size[2]) === max
    );
    const range = min === max ? `${max}` : `${min}–${max}`;
    return `${diameter ? "Ø" : ""}${range}${openEnded ? "+" : ""} mm`;
  }

  const index = source.specs.findIndex(spec =>
    /^(?:outer diameter|diameter (?:range|capacity)|length(?: capability| capacity)?|hole diameter)$/i.test(
      spec.label
    )
  );
  return blade.specs[index]?.value ?? source.specs[index]?.value;
}

/** Only the seven reviewed Shredder products use the upgraded detail template. */
export function isUpgradedShredderBlade(blade: Blade): boolean {
  return [
    "twin-shaft-blades-recycling",
    "multi-shaft-blades-metal",
    "tire-shredder-blades",
    "twin-shaft-blades-battery",
    "single-shaft-shredder-blades",
    "single-shaft-bed-knives",
    "shredder-screens",
  ].includes(blade.id);
}

/** Use the shared detail template with the catalog's existing Shredder data. */
export function getShredderDetailBlade(blade: Blade): Blade {
  const sizeRange = getBladeSizeRange(blade) ?? "Made to Drawing";
  const technicalSize = blade.specs.find(spec => spec.label === "Sizes");
  const fitment = blade.specs.find(spec =>
    /^(?:OEM Fitment|Compatibility)$/.test(spec.label)
  );

  return {
    ...blade,
    compatibleMachines:
      blade.compatibleMachines ??
      fitment?.value.split(",").map(brand => brand.trim()),
    detailLayout: {
      sizeRange,
      heroSpecs: ["Material", "Application", "Screen Forms"].flatMap(label =>
        blade.specs.filter(spec => spec.label === label)
      ),
      technicalSpecs: [
        technicalSize ?? { label: "Sizes", value: sizeRange },
        ...blade.specs.filter(spec => spec !== fitment && spec !== technicalSize),
      ],
      dimensionTables: [],
      inlineRfq: blade.quoteRequirements
        ? { ...slitterRfq, description: blade.quoteRequirements }
        : undefined,
    },
  };
}

function normalizeBladeOfferId(value: string): string {
  return value
    .replace(/^https?:\/\/[^/]+\/products\//, "")
    .replace(/^\/products\//, "")
    .replace(/\/$/, "");
}

/** Offer block for the Product entries in industry-page ItemLists. Carries no
 *  price: the linked product pages don't show one, so publishing a range here
 *  would put the same unmarked-up price in front of Google by another route. */
export function getBladeOffer(target: string): BladeOffer {
  const id = normalizeBladeOfferId(target);
  return {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: `https://sureay.com/products/${id}`,
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
export function getCatalogUrl(_blade: Blade): string {
  return COMPLETE_CATALOG_URL;
}

/**
 * Badge styling helper (mirrors machines.ts pattern)
 */
export const getBadgeClasses = (_color?: string): string =>
  "absolute top-4 left-4 z-10 px-2 py-1 text-[12px] font-bold tracking-wider rounded-none border border-slate-300 bg-white text-[#001f4d]";
