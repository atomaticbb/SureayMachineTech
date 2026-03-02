/*
 * metal-industry.tsx — Metal Processing & Coil Slitting
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
  breadcrumb: "Home / Markets / Metal Processing",
  h1:   "Metal Processing Tooling & Coil Slitting Equipment",
  h2:   "Slitter Knives, Shear Blades & OEM Wear Parts",
  body1:
    "Sureay Machinery manufactures through-hardened circular slitter knives, guillotine shear " +
    "blades, and precision punch-and-die sets engineered for continuous-run metal coil processing. " +
    "We select alloys precisely—from through-hardened SKH-51 to submicron-grain Tungsten Carbide—" +
    "matched to your specific strip material, thickness, and line speed.",
  body2:
    "Every knife profile is reverse-engineered from OEM drawings or customer samples, then " +
    "precision-ground on our 5-axis CNC equipment and verified on a calibrated CMM. The result: " +
    "drop-in slitter and shear tooling delivering burr-free edge quality from the first coil and " +
    "maintained throughout the full production run.",
  ctaHref: "#tooling-matrix",
  gallery: [
    { src: "/images/applications/metal-industry/hero.webp",               alt: "Metal coil slitting line"                      },
    { src: "/images/applications/metal-industry/slitter-knives.webp",     alt: "Circular slitter knife set"                    },
    { src: "/images/applications/metal-industry/shear-blades.webp",       alt: "Guillotine shear blade close-up"               },
    { src: "/images/applications/metal-industry/steel-coil.webp",         alt: "Cold-rolled steel coil processing"             },
    { src: "/images/applications/metal-industry/punch-die.webp",          alt: "Precision punch and die set"                   },
    { src: "/images/applications/metal-industry/carbide-disc.webp",       alt: "Tungsten carbide slitter disc"                 },
    { src: "/images/applications/metal-industry/cnc-grinding.webp",       alt: "5-axis CNC profile grinding"                   },
    { src: "/images/applications/metal-industry/cmm-inspection.webp",     alt: "CMM dimensional verification"                  },
  ],
};

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: IndustryProduct[] = [
  { category: "Slitter Knives", name: "Circular Slitter Knives",        image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: true,
    desc: "Through-hardened SKH-51 circular slitter knives precision-ground to ±0.005 mm side run-out. Burr-free steel coil slitting." },
  { category: "Slitter Knives", name: "Tungsten Carbide Slitter Discs", image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "Submicron-grain TC slitter discs for stainless steel and abrasive strip materials. Extended tool life versus HSS." },
  { category: "Slitter Knives", name: "HSS Slitter Knives",             image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "M2 HSS circular knives for mild steel and aluminium coil slitting. Cost-effective OEM-compatible geometry." },
  { category: "Shear Blades",   name: "Guillotine Shear Blades",        image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "Precision-ground upper and lower guillotine blades for hydraulic and mechanical shears. Clean, straight cuts on sheet and plate." },
  { category: "Shear Blades",   name: "Flying Shear Blades",            image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "High-speed flying shear tooling for continuous strip processing lines. Matched pairs ground to ±0.01 mm gap tolerance." },
  { category: "Shear Blades",   name: "Rotary Shear Blades",            image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "OEM-specification rotary shear blades for coil-fed blanking and trimming operations." },
  { category: "Punch Dies",     name: "Precision Punch & Die Sets",     image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "EDM-finished punch-and-die sets for high-volume stamping. Tungsten carbide and D2 tooling available." },
  { category: "Punch Dies",     name: "Tungsten Carbide Insert Dies",   image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife", isFlagship: false,
    desc: "TC insert dies for ultra-high-volume progressive stamping. OEM bore and flange geometry matched on CMM." },
];

const FILTER_CATEGORIES = ["ALL", "SLITTER KNIVES", "SHEAR BLADES", "PUNCH DIES"];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Cost of the Micro-Chip.",
  challengeBody:
    "High-tensile steel and stainless coils demand extreme edge retention. Standard slitter knives " +
    "develop micro-chips within hours at high line speed, producing burrs that contaminate downstream " +
    "components, trigger scrap, and force costly unplanned line stops.",
  solutionTitle:  "Zero Burr. Extended Runs.",
  solutionBody:
    "Our through-hardened SKH-51 and Tungsten Carbide circular knives maintain zero-burr performance " +
    "across extended production runs, achieving precise slit widths on demanding materials and delivering (+45% Tool Life).",
  highlightToken: "(+45% Tool Life)",
};

const SPECS: IndustrySpec[] = [
  { label: "Side Run-Out",    mainValue: "±0.005",   unit: "mm",  subtext: "CMM Run-Out Verified"   },
  { label: "Material Grade",  mainValue: "SKH-51\\nTC Grade",      subtext: "OEM Grade Selection",   isTextual: true },
  { label: "Core Hardness",   mainValue: "62–66",    unit: "HRC", subtext: "Through-Hardened"       },
  { label: "Surface Finish",  mainValue: "Ra ≤ 0.4", unit: "μm",  subtext: "Ground & Lapped"        },
];

// ─── OEM Pipeline ─────────────────────────────────────────────────────────────
const OEM_STEPS: OemStep[] = [
  { step: "01", name: "Geometry Audit",        desc: "Reverse-engineering of OEM bore, keyway, side face, and run-out specifications.",      phaseKey: "PROTOCOL",  protocolVersion: "2.0", technicalTitle: "TECHNICAL AUDIT",       coords: "31.23°N / 121.47°E" },
  { step: "02", name: "5-Axis CNC Grinding",   desc: "Precision profile grinding and OD turning to exact run-out and diameter tolerances.",  phaseKey: "TOPOLOGY",  protocolVersion: "4.1", technicalTitle: "PROFILE GRINDING",      coords: "48.85°N / 002.35°E" },
  { step: "03", name: "Vacuum Heat Treatment", desc: "In-house through-hardening cycle tailored for SKH-51 or Tungsten Carbide grades.",     phaseKey: "MACHINING", protocolVersion: "3.0", technicalTitle: "PRECISION HARDENING",   coords: "22.54°N / 114.06°E" },
  { step: "04", name: "CMM Verification",      desc: "100% dimensional and run-out inspection on calibrated CMM before shipment.",           phaseKey: "METROLOGY", protocolVersion: "2.1", technicalTitle: "METROLOGY VALIDATION",  coords: "35.68°N / 139.69°E" },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "Cold-Rolled Steel Coil",  abrasion: "HIGH",     grade: "SKH-51",           image: "/images/materials/cold-rolled-steel.webp"  },
  { name: "Stainless Steel Strip",   abrasion: "EXTREME",  grade: "Tungsten Carbide", image: "/images/materials/stainless-strip.webp"    },
  { name: "Aluminum Sheet Stock",    abrasion: "MODERATE", grade: "D2 Steel",         image: "/images/materials/aluminum-sheet.webp"     },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function MetalIndustry() {
  return (
    <>
      <Helmet>
        <title>Metal Processing Tooling & Coil Slitting Equipment | Sureay Machinery</title>
        <meta
          name="description"
          content="Through-hardened circular slitter knives, guillotine shear blades and precision punch dies engineered for zero-burr metal coil processing. OEM-compatible with TRUMPF, AMADA, BYSTRONIC."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sureaymachinery.com/industry/metal-processing" />
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
