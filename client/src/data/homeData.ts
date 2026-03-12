import {
  Clock,
  Globe2,
  PenTool,
  HeadphonesIcon,
  Recycle,
  Layers,
  FileText,
} from "lucide-react";

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { icon: Clock,          value: 15,  suffix: "+",  label: "Years Experience",  sub: "Est. 2008"        },
  { icon: Globe2,         value: 50,  suffix: "+",  label: "Global Markets",    sub: "Worldwide Export" },
  { icon: PenTool,        value: 100, suffix: "%",  label: "Custom Design",     sub: "OEM / ODM"        },
  { icon: HeadphonesIcon, value: 24,  suffix: "/7", label: "Technical Support", sub: "Response < 5 min" },
];

// ─── Industry Ecosystems ──────────────────────────────────────────────────────
export const ECOSYSTEMS = [
  {
    icon: Recycle,
    label: "Recycling & Waste Management",
    industry: "Plastics & Recycling",
    desc: "From post-consumer PET bottles to mixed municipal solid waste, we supply shredder blades, granulator knives, and pelletizer rotors precision-engineered for maximum throughput and minimum downtime across the full waste reduction chain.",
    specs: [
      { label: "Materials",    value: "D2, DC53, SKD-11 (Cr12MoV), Tungsten Carbide (YG8/YG15)" },
      { label: "Tolerances",   value: "±0.002 mm edge — 100% CMM verified per batch" },
      { label: "Applications", value: "Single & multi-shaft shredders, Granulators, Pelletizer heads" },
      { label: "Surface",      value: "Ra ≤ 0.8 μm (standard) · Ra ≤ 0.4 μm (mirror, on request)" },
    ],
    href: "/plastic-industry",
    image: "/images/applications/Plastic-Waste-Recycling.webp",
  },
  {
    icon: FileText,
    label: "Paper, Packaging & Converting",
    industry: "Paper & Converting",
    desc: "Mirror-polished log-saw blades, guillotine cutter knives, and precision slitter tooling built for continuous, high-speed converting lines. Matched to Fabio Perini, Körber, and all major OEM geometries for zero-rework drop-in installation.",
    specs: [
      { label: "Materials",    value: "M2 HSS, D2, Bi-metal (HSS + carbon steel body)" },
      { label: "Tolerances",   value: "±0.002 mm TIR · flatness verified on granite surface plate" },
      { label: "Applications", value: "Log saws, Rewinders, Slitter-rewinders, Guillotine cutters" },
      { label: "Surface",      value: "Ra ≤ 0.4 μm mirror polish — cutting edge radius < 5 μm" },
    ],
    href: "/paper-industry",
    image: "/images/applications/tissue-industry/tissue-and-paper.webp",
  },
  {
    icon: Layers,
    label: "Metal Coil Processing",
    industry: "Metal Processing",
    desc: "High-precision rotary slitter knives, guillotine shear blades, and complete coil-slitting tooling sets manufactured to micron-level tolerances for ferrous and non-ferrous service centers, steel mills, and heavy fabrication lines.",
    specs: [
      { label: "Materials",    value: "D2, SKD11, H13, 9CrSi, M2 HSS, Cr12MoV" },
      { label: "Tolerances",   value: "Thickness ±0.001 mm · OD ±0.01 mm — laser verified" },
      { label: "Applications", value: "Slitting lines, Flying shear, Guillotine cutters, Rotary shear" },
      { label: "Hardness",     value: "58–64 HRC (vacuum heat treated, deformation < 0.01 mm)" },
    ],
    href: "/metal-industry",
    image: "/images/applications/Metal-Waste-Recycling.webp",
  },
];

// ─── Featured Products ────────────────────────────────────────────────────────
export const FEATURED_PRODUCTS = [
  { name: "Rotary Slitter Knives",        image: "/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",    href: "/products/rotary-slitter-knives" },
  { name: "Shredder Blades",              image: "/images/products/shredder-blades/shredder-blades-04.webp",                 href: "/products/shredder-blades" },
  { name: "Tissue Paper Blades",          image: "/images/products/blades/tissue-log-saw-blades.webp",                      href: "/products/tissue-log-saw-blades" },
  { name: "Granulator Blades",            image: "/images/products/granulator-blades/granulator-blades-01.webp",             href: "/products/granulator-blades" },
  { name: "Paper Cutting Blades",         image: "/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",      href: "/products/paper-cutting-blades" },
  { name: "Single Shaft Shredder Blades", image: "/images/products/shredder-blades/single-shredder-blades-06.webp",          href: "/products/single-shaft-shredder-blades" },
  { name: "Metal Slitting Blades",        image: "/images/products/rotary-slitter-knives/metal-slitter-knives-00.webp",     href: "/products/metal-coil-slitting-knives" },
  { name: "Metal Shear Knives",           image: "/images/products/granulator-blades/metal-shear-blades-00.webp",           href: "/products/metal-shear-blades" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "What steel grades do you stock for industrial blades?",
    a: "We maintain a full library of D2, SKD-11 (Cr12MoV), H13, 9CrSi, M2 HSS, and tungsten carbide (YG8/YG15) — matched to your abrasion, impact, and temperature profile.",
  },
  {
    q: "What dimensional tolerances can you achieve?",
    a: "Our 5-axis CNC profile grinders achieve ±0.01 mm flatness and ±0.002 mm edge tolerances, verified by CMM inspection on every batch.",
  },
  {
    q: "Do you support custom OEM / ODM blade designs?",
    a: "Yes. Send us your drawing, sample, or concept. Our engineering team handles reverse engineering, CAD modelling, prototype grinding, and series production.",
  },
  {
    q: "What is your standard lead time for custom orders?",
    a: "Standard custom blades ship in 15–25 business days after drawing approval. Rush production (7–10 days) is available for repeat specifications.",
  },
];

