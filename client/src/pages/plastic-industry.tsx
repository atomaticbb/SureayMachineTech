/*
 * plastic-industry.tsx — Plastics Recycling & Extrusion
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import { Helmet } from "react-helmet-async";
import Navbar    from "@/components/layout/Navbar";
import Footer    from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero             from "@/components/industry/IndustryHero";
import IndustryToolingMatrix    from "@/components/industry/IndustryToolingMatrix";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline      from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus    from "@/components/industry/IndustryMaterialFocus";
import type {
  IndustryHeroData,
  IndustryProduct,
  IndustryNarrative,
  IndustrySpec,
  IndustryMaterial,
} from "@/components/industry/types";

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_DATA: IndustryHeroData = {
  breadcrumb: "Home / Markets / Plastics Recycling",
  h1:   "Plastics Recycling Tooling & Extrusion Equipment",
  h2:   "Precision Knives, Filterless Systems & OEM Wear Parts",
  body1:
    "Sureay Machinery specializes in manufacturing premium industrial knives, " +
    "melt filtration equipment, and high-wear components for the plastics recycling industry. " +
    "Our material expertise sets us apart. We match the exact alloy—from impact-resistant D2 " +
    "steel to extreme-wear Tungsten Carbide—to handle your specific abrasive or mixed feedstocks.",
  body2:
    "Our uncompromising vacuum heat treatment and 5-axis CNC machining ensure every blade and " +
    "machine component delivers consistent, cost-effective performance. From heavy-duty shredder " +
    "rotors and filterless screen changers to 100% drop-in OEM replacement knives, our expanded " +
    "product line keeps your extrusion systems running at peak productivity.",
  ctaHref: "#tooling-matrix",
  gallery: [
    { src: "/images/applications/plastic-industry/Raw%20Material%20Selection.webp",       alt: "Raw material selection for plastic processing"    },
    { src: "/images/applications/plastic-industry/blades.webp",                            alt: "Industrial blades for plastics recycling"          },
    { src: "/images/applications/plastic-industry/hero.webp",                              alt: "Plastic industry production hero scene"            },
    { src: "/images/applications/plastic-industry/single-shredder-blades-001-w1200.webp", alt: "Single shredder blades close-up"                   },
    { src: "/images/applications/plastic-industry/single-shredder-blades-010.webp",       alt: "Shredder blade set for heavy-duty recycling"       },
    { src: "/images/applications/plastic-industry/metal-slitter-knife.webp",               alt: "Metal slitter knife for precision cutting"          },
    { src: "/images/applications/plastic-industry/6-Wire%20Cut.webp",                      alt: "Wire-cut machining process detail"                  },
    { src: "/images/applications/plastic-industry/acuum-heat-treatment.webp",              alt: "Vacuum heat treatment process"                     },
  ],
};

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: IndustryProduct[] = [
  { category: "Shredder Blades",  name: "Single-Shaft Shredder Blades", image: "/images/products/blades/11-4-2_metal-shear-blade_01.webp", href: "/products/shredder-blades",   isFlagship: true  },
  { category: "Shredder Blades",  name: "Twin-Shaft Shredder Knives",   image: "/images/products/blades/11-4-2_metal-shear-blade_01.webp", href: "/products/shredder-blades",   isFlagship: false },
  { category: "Granulator Blades",name: "Granulator Rotor Knives",      image: "/images/products/blades/11-2-2_circular-blade_05.webp",   href: "/products/granulator-blades", isFlagship: false },
  { category: "Granulator Blades",name: "Granulator Bed Knives",        image: "/images/products/blades/11-2-2_circular-blade_05.webp",   href: "/products/granulator-blades", isFlagship: false },
  { category: "Shredder Blades",  name: "Heavy-Duty Granulator Knives", image: "/images/products/blades/11-4-2_metal-shear-blade_01.webp", href: "/products/shredder-blades",   isFlagship: false },
];

const FILTER_CATEGORIES = ["ALL", "SHREDDER BLADES", "GRANULATOR BLADES"];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Real Cost of Wear.",
  challengeBody:
    "Processing mixed polymers introduces severe abrasive wear. Standard blades degrade rapidly, " +
    "and traditional screen filtration forces frequent, costly line shutdowns.",
  solutionTitle:  "Engineered to Run Longer.",
  solutionBody:
    "Filterless Systems eliminate manual mesh replacements, while our extreme-hardness Tungsten " +
    "Carbide blades maximize continuous pelletizing (+30% Uptime).",
  highlightToken: "(+30% Uptime)",
};

const SPECS: IndustrySpec[] = [
  { label: "Edge Tolerance",  mainValue: "±0.002",          unit: "mm",  subtext: "100% CMM Verified"   },
  { label: "Material Grade",  mainValue: "Tungsten\\nCarbide",            subtext: "YG8 / YG15 Alloys",  isTextual: true },
  { label: "Core Hardness",   mainValue: "58–64",           unit: "HRC", subtext: "Vacuum Heat Treat"   },
  { label: "Surface Finish",  mainValue: "Ra ≤ 0.4",        unit: "μm",  subtext: "Mirror Standard"     },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "PET Bottle Flakes",     abrasion: "EXTREME",  grade: "Tungsten Carbide",  image: "/images/materials/pet-flakes.webp"    },
  { name: "HDPE Thick-Wall Pipes", abrasion: "HIGH",     grade: "SKD-11 (Cr12MoV)", image: "/images/materials/hdpe-pipe.webp"     },
  { name: "Mixed Post-Consumer",   abrasion: "VARIABLE", grade: "D2 / M2 HSS",      image: "/images/materials/mixed-plastic.webp" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function PlasticIndustry() {
  return (
    <>
      <Helmet>
        <title>Plastics Recycling &amp; Extrusion Tooling — Filterless Systems | Sureay Machinery</title>
        <meta
          name="description"
          content="Precision granulator knives, filterless screen changers and pelletizer hob cutters engineered for zero-downtime plastic recycling and extrusion lines. OEM-compatible with EREMA, LINDNER, VECOPLAN."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sureay.com/industry/plastics-recycling" />
      </Helmet>

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <IndustryHero              data={HERO_DATA}                                       />
        <IndustryToolingMatrix     products={PRODUCTS} filterCategories={FILTER_CATEGORIES} />
        <IndustryBlueprintDashboard narrative={NARRATIVE}    specs={SPECS}               />
        <IndustryMaterialFocus     materials={MATERIALS}                                  />
        <IndustryOemPipeline />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
