/*
 * plastic-industry.tsx — Plastics Recycling & Extrusion
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import { Helmet } from "react-helmet-async";
import SEO from "@/components/common/SEO";
import Navbar    from "@/components/layout/Navbar";
import Footer    from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero             from "@/components/industry/IndustryHero";
import IndustryToolingMatrix    from "@/components/industry/IndustryToolingMatrix";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline      from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus    from "@/components/industry/IndustryMaterialFocus";
import { blades } from "@/data/blades";
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
  h1:   "Plastic Recycling Shredder & Granulator Blade Supplier",
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
    { src: "/images/applications/plastic-industry/single-shredder-blades-04.webp",     alt: "Single shaft shredder blades for plastic"          },
    { src: "/images/applications/plastic-industry/mutil-shaft-shredder-blades.webp",   alt: "Multi-shaft shredder blades for plastic recycling" },
    { src: "/images/applications/plastic-industry/four-shaft-shredder-blade-00.webp",  alt: "Four-shaft shredder blade assembly"                 },
    { src: "/images/applications/plastic-industry/shredder-blades-03.webp",            alt: "Shredder blades for heavy-duty plastic recycling"  },
    { src: "/images/applications/plastic-industry/blades.webp",                        alt: "Industrial blades for plastics recycling"          },
    { src: "/images/applications/plastic-industry/6-Wire%20Cut.webp",                  alt: "Wire-cut machining process detail"                  },
    { src: "/images/applications/plastic-industry/Raw%20Material%20Selection.webp",    alt: "Raw material selection for plastic processing"     },
    { src: "/images/applications/plastic-industry/acuum-heat-treatment.webp",          alt: "Vacuum heat treatment process"                     },
  ],
};

// Preload href for the LCP image (gallery[0]) — 640w variant for 2× retina desktop
const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
// Dynamically load products from blades.ts where sector === "recycling"
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.sector === "recycling")
  .map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0, // First product is flagship
  }));

const FILTER_CATEGORIES = ["ALL", ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase())))];

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

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Plastics Recycling Tooling & Extrusion Equipment",
  url: "https://www.sureay.com/industry/plastics-recycling",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Single-Shaft Shredder Blades",
        image: "https://www.sureay.com/images/products/blades/11-4-2_metal-shear-blade_01.webp",
        description: "Heavy-duty D2 and M2 HSS single-shaft shredder blades for plastic waste, HDPE pipes and mixed post-consumer feedstocks.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://www.sureay.com/products/shredder-blades",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "47",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Granulator Rotor Knives",
        image: "https://www.sureay.com/images/products/blades/11-2-2_circular-blade_05.webp",
        description: "High-wear Tungsten Carbide and D2 granulator rotor knives precision-ground for plastic recycling and pelletizing extrusion lines.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://www.sureay.com/products/granulator-blades",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "47",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function PlasticIndustry() {
  return (
    <>
      <SEO
        title="Plastics Recycling & Extrusion Tooling — Filterless Systems"
        description="Precision granulator knives, filterless screen changers and pelletizer hob cutters engineered for zero-downtime plastic recycling and extrusion lines. OEM-compatible with EREMA, LINDNER, VECOPLAN."
        canonicalUrl="/plastic-industry"
        keywords="plastic recycling blades, granulator knives, shredder blades, PET recycling, PVC processing"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "Plastics Recycling", url: "/plastic-industry" },
        ]}
      />
      <Helmet>
        <link rel="preload" as="image" href={LCP_PRELOAD} />
        <script type="application/ld+json">{JSON.stringify(PAGE_SCHEMA)}</script>
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
