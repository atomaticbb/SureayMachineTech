import {
  Recycle,
  Layers,
  FileText,
  Scissors,
  Zap,
  TreePine,
} from "lucide-react";

// ─── Industry Ecosystems ──────────────────────────────────────────────────────
export const ECOSYSTEMS = [
  {
    icon: Recycle,
    key: "plastic",
    desc: "For shredders, granulators, and recycling lines that need blades matched to abrasive feedstock, impact load, contamination level, and uptime targets.",
    specs: [
      {
        label: "Typical Lines",
        value:
          "Single-shaft shredders, dual-shaft shredders, granulators, pelletizer systems",
      },
      {
        label: "Typical Problems",
        value:
          "Fast wear, edge chipping, unstable blade life, inconsistent particle reduction",
      },
      {
        label: "Material Direction",
        value:
          "D2, DC53, SKD-11, carbide grades based on abrasion and impact profile",
      },
      {
        label: "What You Can Review",
        value:
          "Recommended blade families, material logic, and recycling application examples",
      },
    ],
    href: "/plastic-industry",
    image: "/images/applications/Plastic-Waste-Recycling.webp",
    imageMobile: "/images/applications/Plastic-Waste-Recycling-640w.webp",
    cta: "Recycling Solutions",
  },
  {
    icon: FileText,
    key: "paper",
    desc: "For tissue, paper, and packaging lines that need cleaner cuts, longer blade life, and OEM-fit tooling for high-speed converting equipment.",
    specs: [
      {
        label: "Typical Lines",
        value: "Log saws, rewinders, slitter-rewinders, guillotine cutters",
      },
      {
        label: "Typical Problems",
        value:
          "Poor cut finish, dust generation, short regrind intervals, fit inconsistency",
      },
      {
        label: "Material Direction",
        value:
          "M2 HSS, D2, and bi-metal options based on speed, finish, and service life",
      },
      {
        label: "What You Can Review",
        value:
          "Blade options by converting process, polish requirement, and OEM platform",
      },
    ],
    href: "/paper-industry",
    image: "/images/applications/tissue-industry/tissue-and-paper.webp",
    imageMobile: "/images/applications/tissue-and-paper-640w.webp",
    cta: "Paper & Tissue Solutions",
  },
  {
    icon: Layers,
    key: "metal",
    desc: "For slitting and shearing lines where burr control, dimensional stability, regrind life, and consistent performance on metal coils drive the tooling decision.",
    specs: [
      {
        label: "Typical Lines",
        value:
          "Coil slitting lines, flying shear, guillotine cutters, rotary shear systems",
      },
      {
        label: "Typical Problems",
        value:
          "Burr buildup, edge collapse, tolerance drift, short regrind cycles",
      },
      {
        label: "Material Direction",
        value:
          "D2, SKD11, H13, M2 HSS, and related grades by strip type and line speed",
      },
      {
        label: "What You Can Review",
        value:
          "Knife sets, clearance-critical tooling, and metal-processing application guidance",
      },
    ],
    href: "/metal-industry",
    image: "/images/applications/slitting-line-machine-working.webp",
    imageMobile: "/images/applications/slitting-line-machine-working-640w.webp",
    cta: "Metal Processing Solutions",
  },
  {
    icon: Scissors,
    key: "converting",
    desc: "For film slitter-rewinders, label converting lines, and nonwoven slitting systems that demand tight slit-width tolerance and consistent edge quality at 150–600 m/min.",
    specs: [
      {
        label: "Typical Lines",
        value:
          "Film slitter-rewinders, label converting lines, nonwoven slitting, PSA tape winding",
      },
      {
        label: "Typical Problems",
        value:
          "Edge curl, slit-width deviation, adhesive buildup on blades, short regrind cycles",
      },
      {
        label: "Material Direction",
        value:
          "M2 HSS, ASP23 PM steel, D2 with TiN / DLC coating based on substrate and speed",
      },
      {
        label: "What You Can Review",
        value:
          "Circular slitter knife families, coating options, and film / nonwoven application examples",
      },
    ],
    href: "/converting-industry",
    image: "/images/applications/converting-industry.webp",
    imageMobile: "/images/applications/converting-industry-640w.webp",
    cta: "Converting Solutions",
  },
  {
    icon: TreePine,
    key: "wood",
    desc: "For drum and disc chippers in forestry, biomass energy, and landscape tree service that need blades matched to wood species, contamination level, and regrind cycle targets.",
    specs: [
      {
        label: "Typical Lines",
        value:
          "Drum chippers, disc chippers, biomass whole-tree chippers, landscape chippers",
      },
      {
        label: "Typical Problems",
        value:
          "Fast dulling on hardwood, vibration from uneven blade thickness, poor chip quality from worn anvil",
      },
      {
        label: "Material Direction",
        value:
          "T10 / 9CrSi for softwood, D2 / Cr12MoV for hardwood, TCT carbide for demolition wood",
      },
      {
        label: "What You Can Review",
        value:
          "Drum & disc chipper knives, reversible double-edge blades, counter-knife anvils, matched sets",
      },
    ],
    href: "/wood-industry",
    image: "/images/products/wood-chipper-blades/wood-chipper-blades-working.webp",
    imageMobile: "/images/applications/wood-chipper-blades-working-640w.webp",
    cta: "Wood & Forestry Solutions",
  },
  {
    icon: Zap,
    key: "newEnergy",
    desc: "For lithium-ion battery electrode foil slitting lines where zero-burr Ra ≤ 0.05 μm mirror finish and ±0.001 mm dimensional tolerance are required for ISO Class 7 dry-room cell assembly.",
    specs: [
      {
        label: "Typical Lines",
        value:
          "Electrode foil slitting lines, separator film slitting, EV battery cell production",
      },
      {
        label: "Typical Problems",
        value:
          "Micro-burr on foil edge, separator puncture, dry-room contamination, short tool life",
      },
      {
        label: "Material Direction",
        value:
          "WC-Co submicron carbide K05–K10, Cermet and PCD grades for separator film",
      },
      {
        label: "What You Can Review",
        value:
          "Carbide knife specs, CMM certification data, and battery electrode application examples",
      },
    ],
    href: "/new-energy-industry",
    image: "/images/applications/new-energy-industry.webp",
    imageMobile: "/images/applications/new-energy-industry-640w.webp",
    cta: "New Energy Solutions",
  },
];

// ─── Featured Products ────────────────────────────────────────────────────────
export const FEATURED_PRODUCTS = [
  {
    name: "Twin Shaft Shredder Blades",
    image: "/images/products/shredder-blades/shredder-blades-01.webp",
    href: "/products/twin-shaft-blades-recycling",
    tag: "Recycling",
    summary:
      "For heavy-duty volume reduction under abrasive and impact-loaded waste streams.",
  },
  {
    name: "Paper Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
    href: "/products/rotary-slitter-knives-paper",
    tag: "Paper & Packaging",
    summary:
      "For high-speed paper slitting lines demanding clean edges and long blade life.",
  },
  {
    name: "Tissue Log Saw Blades",
    image: "/images/products/blades/tissue-log-saw-blades-05.webp",
    href: "/products/tissue-log-saw-blades",
    tag: "Paper & Packaging",
    summary:
      "For log saw cutting where polish, sharpness retention, and finish consistency matter.",
  },
  {
    name: "Paper Cutting Blades",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
    href: "/products/paper-cutting-blades",
    tag: "Paper & Packaging",
    summary:
      "For sheeting and converting operations requiring clean cuts and repeatable geometry.",
  },
  {
    name: "Metal Shear Knives",
    image: "/images/products/granulator-blades/metal-shear-blades-00.webp",
    href: "/products/metal-shear-knives",
    tag: "Metal Processing",
    summary:
      "For guillotine and flying shear applications where toughness and regrind life lead decisions.",
  },
  {
    name: "Corrugated Slitter Blades",
    image:
      "/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades-01.webp",
    href: "/products/corrugated-slitter-scorer-blades",
    tag: "Paper & Packaging",
    summary:
      "For corrugated box lines requiring precise scoring and clean slitting performance.",
  },
  {
    name: "Nonwoven Slitter Knives",
    image:
      "/images/products/rotary-slitter-knives/nonwoven-slitter-knives.webp",
    href: "/products/nonwoven-slitter-knives",
    tag: "Converting",
    summary:
      "For nonwoven fabric slitting where burr-free edges and stable tension are essential.",
  },
  {
    name: "Strand Pelletizer Rotors",
    image: "/images/products/blades/strand-pelletizer-rotor-01.webp",
    href: "/products/strand-pelletizer-rotors",
    tag: "Recycling",
    summary:
      "PM-HSS and solid tungsten carbide strand pelletizer rotors with ≤0.005 mm concentricity for Maag, Coperion, and Cumberland compounding lines.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// q/a text lives in client/src/locales/*.json under home.faq.items.q{n}/a{n}.
export const FAQ_ITEM_IDS = [1, 2, 3, 4];
