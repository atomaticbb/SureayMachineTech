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
  OemStep,
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
  { category: "Shredder Blades",  name: "Single-Shaft Shredder Blades",   image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: true  },
  { category: "Shredder Blades",  name: "Twin-Shaft Shredder Knives",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Granulator Blades",name: "Granulator Rotor Knives",        image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Granulator Blades",name: "Granulator Bed Knives",          image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Pelletizer Blades",name: "Underwater Pelletizer Hob Cuts", image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Pelletizer Blades",name: "Strand Pelletizer Cutter Blades",image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Shredder Blades",  name: "Heavy-Duty Granulator Knives",   image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
  { category: "Pelletizer Blades",name: "Ring Die Pelletizer Knives",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false },
];

const FILTER_CATEGORIES = ["ALL", "SHREDDER BLADES", "GRANULATOR BLADES", "PELLETIZER BLADES"];

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

// ─── OEM Pipeline ─────────────────────────────────────────────────────────────
const OEM_STEPS: OemStep[] = [
  { step: "01", name: "CAD/CAM Analysis",      desc: "Reverse engineering and blueprint verification.",                        phaseKey: "PROTOCOL",  protocolVersion: "2.0", technicalTitle: "TECHNICAL AUDIT",       coords: "31.23°N / 121.47°E" },
  { step: "02", name: "5-Axis CNC Machining",  desc: "Precision milling to exact OEM bore/keyway specs.",                    phaseKey: "TOPOLOGY",  protocolVersion: "4.1", technicalTitle: "CAD TOPOLOGY",          coords: "48.85°N / 002.35°E" },
  { step: "03", name: "Vacuum Heat Treatment", desc: "In-house hardening for optimal core toughness.",                        phaseKey: "MACHINING", protocolVersion: "3.0", technicalTitle: "PRECISION MANUFACTURE", coords: "22.54°N / 114.06°E" },
  { step: "04", name: "CMM Verification",      desc: "100% dimensional inspection before shipping.",                          phaseKey: "METROLOGY", protocolVersion: "2.1", technicalTitle: "METROLOGY VALIDATION",  coords: "35.68°N / 139.69°E" },
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
        <link rel="canonical" href="https://www.sureaymachinery.com/industry/plastics-recycling" />
      </Helmet>

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <IndustryHero              data={HERO_DATA}                                       />
        <IndustryToolingMatrix     products={PRODUCTS} filterCategories={FILTER_CATEGORIES} />
        <IndustryBlueprintDashboard narrative={NARRATIVE}    specs={SPECS}               />
        <IndustryMaterialFocus     materials={MATERIALS}                                  />
        <IndustryOemPipeline       steps={OEM_STEPS}                                      />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
