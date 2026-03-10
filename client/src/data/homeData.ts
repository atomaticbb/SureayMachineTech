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
    label: "Plastic Recycling",
    industry: "Plastic Industry",
    desc: "Shredder blades, pelletizer knives, screen changers and granulator rotors precision-engineered for severe abrasion across PET, HDPE, and mixed-polymer recycling lines.",
    specs: [
      { label: "Materials",    value: "D2, SKD-11 (Cr12MoV), Tungsten Carbide (YG8/YG15)" },
      { label: "Tolerances",   value: "±0.002 mm edge — 100% CMM verified per batch" },
      { label: "Applications", value: "Granulators, Single-shaft shredders, Pelletizer heads, Screen changers" },
      { label: "Surface",      value: "Ra ≤ 0.8 μm (standard) · Ra ≤ 0.4 μm (mirror, on request)" },
    ],
    href: "/industry/plastics-recycling",
    image: "/images/applications/Plastic-Waste-Recycling.webp",
  },
  {
    icon: Layers,
    label: "Metal Processing",
    industry: "Metal Industry",
    desc: "Cold-shear blades, slitter knives and heavy-duty guillotine knives manufactured to exact OEM specifications for high-throughput flat-steel and coil-processing lines.",
    specs: [
      { label: "Materials",    value: "H13, 9CrSi, M2 HSS, LD (Cr12MoV2)" },
      { label: "Tolerances",   value: "±0.01 mm flatness · ±0.002 mm edge — laser-verified" },
      { label: "Applications", value: "Slitting lines, Flying shear, Guillotine cutters, Rotary shear" },
      { label: "Hardness",     value: "58–64 HRC (vacuum heat treated, deformation < 0.01 mm)" },
    ],
    href: "/industry/metal-processing",
    image: "/images/applications/Metal-Waste-Recycling.webp",
  },
  {
    icon: FileText,
    label: "Paper & Tissue",
    industry: "Paper Industry",
    desc: "Mirror-polished log-saw blades (Ra ≤ 0.4 μm), tissue slitters and rewinder doctor blades for high-throughput tissue mills and converting lines.",
    specs: [
      { label: "Materials",    value: "M2 HSS, D2, Bi-metal (HSS+carbon steel body)" },
      { label: "Tolerances",   value: "±0.002 mm TIR · flatness verified on granite surface plate" },
      { label: "Applications", value: "Log saws, Rewinders, Slitter-rewinders, Embossing rolls" },
      { label: "Surface",      value: "Ra ≤ 0.4 μm mirror polish — cutting edge radius < 5 μm" },
    ],
    href: "/industry/paper-tissue",
    image: "/images/applications/tissue-and-paper.webp",
  },
];

// ─── Featured Products ────────────────────────────────────────────────────────
export const FEATURED_PRODUCTS = [
  { name: "Tissue Log-Saw Blade",    image: "/images/products/blades/tissue-log-saw-blades.webp",         href: "/products/tissue-log-saw-blades" },
  { name: "Circular Slitter Blade",  image: "/images/products/blades/11-2-2_circular-blade_01.webp",      href: "/products/alloy-blades" },
  { name: "Metal Shear Blade",       image: "/images/products/blades/11-4-2_metal-shear-blade_01.webp",   href: "/products/shredder-blades" },
  { name: "Metal Slitter Knife",     image: "/images/products/blades/11-6-2_metal-slitter-knife_01.webp", href: "/products/rotary-cutter-blades" },
  { name: "Heavy Slitter Knife",     image: "/images/products/blades/11-6-4_metal-slitter-knife_01.webp", href: "/products/paper-cutting-blades" },
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

// ─── News & Articles ──────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    category: "Technical Guide",
    date: "January 15, 2025",
    title: "How to Extend Industrial Blade Service Life by Up to 30%",
    excerpt:
      "Vacuum heat treatment, proper alloy selection, and re-grinding intervals are the three levers that separate blades lasting 3 months from blades lasting 9 months.",
    image: "/images/process/acuum-heat-treatment.webp",
    href: "/news",
  },
  {
    category: "Industry Insight",
    date: "December 28, 2024",
    title: "2025 Trends in Plastic Recycling: What Equipment Buyers Need to Know",
    excerpt:
      "Post-consumer rPET demand is reshaping granulator blade geometry requirements. We break down the shift toward tighter tolerances and harder steel grades in modern recycling lines.",
    image: "/images/news/Electronic-Waste-Recycling.webp",
    href: "/news",
  },
  {
    category: "Material Science",
    date: "December 5, 2024",
    title: "D2 vs SKD-11 vs M2 HSS: Choosing the Right Steel for Your Application",
    excerpt:
      "Not all tool steels are equal. This guide compares wear resistance, toughness, and machinability across the three most common blade grades — with real-world application maps.",
    image: "/images/process/premium-steel-selection.webp",
    href: "/news",
  },
];
