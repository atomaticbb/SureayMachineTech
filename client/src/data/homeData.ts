import {
  Clock,
  Globe2,
  PenTool,
  HeadphonesIcon,
  Recycle,
  Layers,
  FileText,
  Scissors,
  Zap,
} from "lucide-react";

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { icon: Clock,          value: 15,    suffix: "+", label: "Years Blade Manufacturing",   sub: "Est. 2008" },
  { icon: PenTool,        value: 10000, suffix: "+", label: "Blade Designs Delivered",     sub: "Custom Variants" },
  { icon: Globe2,         value: 50,    suffix: "+", label: "Countries Served",             sub: "Global Shipments" },
  { icon: HeadphonesIcon, value: 98,    suffix: "%", label: "Repeat Client Retention",      sub: "Long-Term Supply" },
];

// ─── Industry Ecosystems ──────────────────────────────────────────────────────
export const ECOSYSTEMS = [
  {
    icon: Recycle,
    label: "Recycling & Waste Management",
    industry: "Plastics & Recycling",
    desc: "For shredders, granulators, and recycling lines that need blades matched to abrasive feedstock, impact load, contamination level, and uptime targets.",
    specs: [
      { label: "Typical Lines", value: "Single-shaft shredders, dual-shaft shredders, granulators, pelletizer systems" },
      { label: "Typical Problems", value: "Fast wear, edge chipping, unstable blade life, inconsistent particle reduction" },
      { label: "Material Direction", value: "D2, DC53, SKD-11, carbide grades based on abrasion and impact profile" },
      { label: "What You Can Review", value: "Recommended blade families, material logic, and recycling application examples" },
    ],
    href: "/plastic-industry",
    image: "/images/applications/Plastic-Waste-Recycling.webp",
    cta: "Recycling Solutions",
  },
  {
    icon: FileText,
    label: "Paper, Packaging & Converting",
    industry: "Paper & Converting",
    desc: "For tissue, paper, and packaging lines that need cleaner cuts, longer blade life, and OEM-fit tooling for high-speed converting equipment.",
    specs: [
      { label: "Typical Lines", value: "Log saws, rewinders, slitter-rewinders, guillotine cutters" },
      { label: "Typical Problems", value: "Poor cut finish, dust generation, short regrind intervals, fit inconsistency" },
      { label: "Material Direction", value: "M2 HSS, D2, and bi-metal options based on speed, finish, and service life" },
      { label: "What You Can Review", value: "Blade options by converting process, polish requirement, and OEM platform" },
    ],
    href: "/paper-industry",
    image: "/images/applications/tissue-industry/tissue-and-paper.webp",
    cta: "Paper & Converting Solutions",
  },
  {
    icon: Layers,
    label: "Metal Coil Processing",
    industry: "Metal Processing",
    desc: "For slitting and shearing lines where burr control, dimensional stability, regrind life, and consistent performance on metal coils drive the tooling decision.",
    specs: [
      { label: "Typical Lines", value: "Coil slitting lines, flying shear, guillotine cutters, rotary shear systems" },
      { label: "Typical Problems", value: "Burr buildup, edge collapse, tolerance drift, short regrind cycles" },
      { label: "Material Direction", value: "D2, SKD11, H13, M2 HSS, and related grades by strip type and line speed" },
      { label: "What You Can Review", value: "Knife sets, clearance-critical tooling, and metal-processing application guidance" },
    ],
    href: "/metal-industry",
    image: "/images/applications/slitting-line-machine-working.webp",
    cta: "Metal Processing Solutions",
  },
  {
    icon: Scissors,
    label: "Film & Flexible Converting",
    industry: "Film & Converting",
    desc: "For film slitter-rewinders, label converting lines, and nonwoven slitting systems that demand tight slit-width tolerance and consistent edge quality at 150–600 m/min.",
    specs: [
      { label: "Typical Lines", value: "Film slitter-rewinders, label converting lines, nonwoven slitting, PSA tape winding" },
      { label: "Typical Problems", value: "Edge curl, slit-width deviation, adhesive buildup on blades, short regrind cycles" },
      { label: "Material Direction", value: "M2 HSS, ASP23 PM steel, D2 with TiN / DLC coating based on substrate and speed" },
      { label: "What You Can Review", value: "Circular slitter knife families, coating options, and film / nonwoven application examples" },
    ],
    href: "/converting-industry",
    image: "/images/applications/converting-industry.webp",
    cta: "Converting Solutions",
  },
  {
    icon: Zap,
    label: "New Energy & Battery",
    industry: "New Energy",
    desc: "For lithium-ion battery electrode foil slitting lines where zero-burr Ra ≤ 0.05 μm mirror finish and ±0.001 mm dimensional tolerance are required for ISO Class 7 dry-room cell assembly.",
    specs: [
      { label: "Typical Lines", value: "Electrode foil slitting lines, separator film slitting, EV battery cell production" },
      { label: "Typical Problems", value: "Micro-burr on foil edge, separator puncture, dry-room contamination, short tool life" },
      { label: "Material Direction", value: "WC-Co submicron carbide K05–K10, Cermet and PCD grades for separator film" },
      { label: "What You Can Review", value: "Carbide knife specs, CMM certification data, and battery electrode application examples" },
    ],
    href: "/new-energy-industry",
    image: "/images/applications/new-energy-industry.webp",
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
    summary: "For heavy-duty volume reduction under abrasive and impact-loaded waste streams.",
  },
  {
    name: "Paper Slitter Knives",
    image: "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
    href: "/products/rotary-slitter-knives-paper",
    tag: "Paper & Packaging",
    summary: "For high-speed paper slitting lines demanding clean edges and long blade life.",
  },
  {
    name: "Tissue Log Saw Blades",
    image: "/images/products/blades/tissue-log-saw-blades-05.webp",
    href: "/products/tissue-log-saw-blades",
    tag: "Paper & Packaging",
    summary: "For log saw cutting where polish, sharpness retention, and finish consistency matter.",
  },
  {
    name: "Paper Cutting Blades",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
    href: "/products/paper-cutting-blades",
    tag: "Paper & Packaging",
    summary: "For sheeting and converting operations requiring clean cuts and repeatable geometry.",
  },
  {
    name: "Metal Shear Knives",
    image: "/images/products/granulator-blades/metal-shear-blades-00.webp",
    href: "/products/metal-shear-knives",
    tag: "Metal Processing",
    summary: "For guillotine and flying shear applications where toughness and regrind life lead decisions.",
  },
  {
    name: "Corrugated Slitter Blades",
    image: "/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades-01.webp",
    href: "/products/corrugated-slitter-scorer-blades",
    tag: "Paper & Packaging",
    summary: "For corrugated box lines requiring precise scoring and clean slitting performance.",
  },
  {
    name: "Nonwoven Slitter Knives",
    image: "/images/products/rotary-slitter-knives/nonwoven-slitter-knives.webp",
    href: "/products/nonwoven-slitter-knives",
    tag: "Converting",
    summary: "For nonwoven fabric slitting where burr-free edges and stable tension are essential.",
  },
  {
    name: "Battery Slitting Knives",
    image: "/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
    href: "/products/lithium-battery-slitting-knives",
    tag: "New Energy",
    summary: "For electrode foil slitting requiring micron-level precision and zero burr tolerance.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "Can you quote from a drawing, worn sample, or basic dimensions?",
    a: "Yes. We can quote from technical drawings, used blade samples, or a dimension set with machine model, material type, and application details. For OEM replacements, matching fit and tolerance is part of the engineering review.",
  },
  {
    q: "What information do you need for an accurate quotation?",
    a: "The fastest quotations come with blade drawing or sample, material being cut, machine model, hardness or steel preferences if known, and any target concerns such as wear life, edge quality, or downtime reduction.",
  },
  {
    q: "How do you recommend the right steel grade for different applications?",
    a: "We match steel grade and heat treatment to abrasion level, impact load, cutting speed, and feedstock. Common options include D2, DC53, SKD11, H13, M2 HSS, and tungsten carbide depending on the operating conditions.",
  },
  {
    q: "What tolerances, inspection, and lead times can you support?",
    a: "Typical production is verified by CMM inspection with edge tolerances down to ±0.002 mm depending on blade type. Standard custom orders usually ship in 15 to 25 business days after drawing approval, with faster repeat-order options available.",
  },
];

