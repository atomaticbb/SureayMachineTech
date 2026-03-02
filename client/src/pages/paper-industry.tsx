/*
 * paper-industry.tsx — Paper & Tissue Converting
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import { Helmet } from "react-helmet-async";
import Navbar    from "@/components/layout/Navbar";
import Footer    from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero               from "@/components/industry/IndustryHero";
import IndustryToolingMatrix      from "@/components/industry/IndustryToolingMatrix";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline        from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus      from "@/components/industry/IndustryMaterialFocus";
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
  breadcrumb: "Home / Markets / Paper & Tissue",
  h1:   "Paper & Tissue Converting Knives & Equipment",
  h2:   "Log Saw Blades, Rewinder Knives & OEM Wear Parts",
  body1:
    "Sureay Machinery manufactures triple-ground tissue log saw blades, rewinder perforation " +
    "knives, and precision slitting tooling engineered for maximum throughput on high-speed paper " +
    "and tissue converting lines. Our blade profiles are matched to Fabio Perini, Körber, Fosber " +
    "and all major OEM geometries.",
  body2:
    "Our in-house CNC profile grinding delivers consistent tooth form across the full blade width, " +
    "while our M2 and M42 HSS grades are vacuum-hardened for optimal edge retention at 500+ m/min " +
    "line speeds. Every blade ships fully inspected—blade runout, tooth pitch, and diameter all " +
    "CMM-verified—for zero-rework drop-in installation.",
  ctaHref: "#tooling-matrix",
  gallery: [
    { src: "/images/applications/paper-industry/hero.webp",               alt: "Tissue log saw converting line"                 },
    { src: "/images/applications/paper-industry/log-saw-blade.webp",      alt: "Tissue log saw blade close-up"                 },
    { src: "/images/applications/paper-industry/rewinder.webp",           alt: "Surface rewinder converting operation"          },
    { src: "/images/applications/paper-industry/tissue-rolls.webp",       alt: "Tissue roll production"                        },
    { src: "/images/applications/paper-industry/perforation.webp",        alt: "Perforation blade detail"                      },
    { src: "/images/applications/paper-industry/slitting.webp",           alt: "Paper reel slitting operation"                 },
    { src: "/images/applications/paper-industry/tooth-profile.webp",      alt: "Blade tooth profile grinding detail"           },
    { src: "/images/applications/paper-industry/inspection.webp",         alt: "Blade dimensional inspection"                  },
  ],
};

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: IndustryProduct[] = [
  { category: "Log Saw Blades",    name: "Tissue Log Saw Blades",           image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: true,
    desc: "Triple-ground M2 HSS log saw blades for tissue and kitchen towel lines. OEM profile-matched to Fabio Perini, Körber, Fosber." },
  { category: "Log Saw Blades",    name: "Napkin Paper Log Saw Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Fine-tooth M2 HSS blades optimised for facial tissue and napkin log converting. Reduced fibre pull-out geometry." },
  { category: "Log Saw Blades",    name: "TTB / TTBF Log Saw Blades",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Through-the-blade (TTB/TTBF) tooth geometry for high-speed automatic log saws. Superior chip clearance at 500+ m/min." },
  { category: "Rewinder Blades",   name: "Surface Rewinder Knives",         image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Precision ground rewinder trim and crush-cut knives. Matched upper and lower sets for clean edge quality at the reel." },
  { category: "Rewinder Blades",   name: "Rewinder Perforation Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "M42 HSS perforation blades with precisely spaced tooth and land geometry for consistent toilet tissue perforation." },
  { category: "Rewinder Blades",   name: "Tail Tie & Glue Unit Knives",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Tail tie and dispensing unit knives precision-ground to OEM blade thickness and profile tolerances." },
  { category: "Slitting Blades",   name: "Crush-Cut Slitting Knives",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Circular crush-cut slitting knives for light-duty tissue and wet wipe converting. D2 and M2 HSS grades." },
  { category: "Slitting Blades",   name: "Paper Reel Slitter Knives",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades", isFlagship: false,
    desc: "Upper and lower reel slitter sets for jumbo roll reducing. Matched ground pair ensuring consistent slit width." },
];

const FILTER_CATEGORIES = ["ALL", "LOG SAW BLADES", "REWINDER BLADES", "SLITTING BLADES"];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Cost of Blade Dullness.",
  challengeBody:
    "High-speed tissue and paper converting lines run at 500+ m/min, demanding blades that sustain " +
    "a clean, consistent cut across millions of cycles. Dull or misground blades cause log tearing, " +
    "fibre dust contamination, and unplanned rewinder shutdowns that erode OEE.",
  solutionTitle:  "Maximum Cuts. Zero Fibre Pull.",
  solutionBody:
    "Our triple-ground hollow-ground tissue log saw blades are engineered to exacting OEM tooth profiles, " +
    "delivering burr-free, dust-free cuts at full line speed and (+40% More Cuts Per Grind).",
  highlightToken: "(+40% More Cuts Per Grind)",
};

const SPECS: IndustrySpec[] = [
  { label: "Grind Specification", mainValue: "Triple\\nGround",             subtext: "Profile-Matched to OEM", isTextual: true },
  { label: "Material Grade",      mainValue: "M2\\nHSS",                    subtext: "High-Speed Steel",       isTextual: true },
  { label: "Tooth Pitch",         mainValue: "54–120",   unit: "TPI",       subtext: "Custom Profile Available" },
  { label: "Surface Finish",      mainValue: "Ra ≤ 0.6", unit: "μm",        subtext: "Mirror Polish"             },
];

// ─── OEM Pipeline ─────────────────────────────────────────────────────────────
const OEM_STEPS: OemStep[] = [
  { step: "01", name: "Profile Mapping",       desc: "Blade profile mapping: tooth form, grind angle, and OEM clearance tolerances documented.", phaseKey: "PROTOCOL",  protocolVersion: "2.0", technicalTitle: "TECHNICAL AUDIT",       coords: "31.23°N / 121.47°E" },
  { step: "02", name: "CNC Profile Grinding",  desc: "CNC tooth profile grinding matched to OEM log saw geometry and pitch specification.",       phaseKey: "TOPOLOGY",  protocolVersion: "4.1", technicalTitle: "TOOTH GRINDING",        coords: "48.85°N / 002.35°E" },
  { step: "03", name: "Vacuum Heat Treatment", desc: "Tailored M2/M42 HSS hardening cycle ensuring chip-resistant tooth edge retention.",         phaseKey: "MACHINING", protocolVersion: "3.0", technicalTitle: "HSS HARDENING",         coords: "22.54°N / 114.06°E" },
  { step: "04", name: "CMM Verification",      desc: "100% verification of profile, diameter, runout, and tooth pitch before shipment.",          phaseKey: "METROLOGY", protocolVersion: "2.1", technicalTitle: "METROLOGY VALIDATION",  coords: "35.68°N / 139.69°E" },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "Virgin Tissue Rolls",  abrasion: "LOW",      grade: "M2 HSS Triple-Ground", image: "/images/materials/virgin-tissue.webp"   },
  { name: "Recycled Fibre Logs",  abrasion: "MODERATE", grade: "D2 / M2 HSS",          image: "/images/materials/recycled-fibre.webp"  },
  { name: "Kraft & Board Stock",  abrasion: "HIGH",     grade: "Bimetal / TC-Tipped",  image: "/images/materials/kraft-board.webp"     },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function PaperIndustry() {
  return (
    <>
      <Helmet>
        <title>Paper & Tissue Converting Knives & Equipment | Sureay Machinery</title>
        <meta
          name="description"
          content="Triple-ground tissue log saw blades, rewinder perforation knives and slitting tooling for high-speed paper and tissue converting lines. OEM-compatible with Fabio Perini, Körber, Fosber."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sureaymachinery.com/industry/paper-tissue" />
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
