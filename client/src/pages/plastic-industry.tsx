/*
 * plastic-industry.tsx — Plastics Recycling & Extrusion
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import { Helmet } from "react-helmet-async";
import SEO from "@/components/common/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryToolingMatrix from "@/components/industry/IndustryToolingMatrix";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus from "@/components/industry/IndustryMaterialFocus";
import { blades, getBladeAggregateOffer } from "@/data/blades";
import type {
  IndustryHeroData,
  IndustryProduct,
  IndustryNarrative,
  IndustrySpec,
  IndustryMaterial,
} from "@/components/industry/types";

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_DATA: IndustryHeroData = {
  breadcrumb: "Home / Industries / Plastics Recycling",
  h1: "Plastic Recycling & Compounding Blade Supplier",
  h2: "Shredder Blades, Pelletizer Rotors & Melt Filter Scrapers",
  body1:
    "Sureay Machinery specializes in manufacturing premium industrial knives and precision wear parts " +
    "for the plastics recycling and compounding industry. Our material expertise sets us apart — " +
    "from impact-resistant D2 steel for mixed post-consumer feedstocks to PM-HSS and Solid Tungsten " +
    "Carbide for glass-filled and carbon-fiber-reinforced compounding lines.",
  body2:
    "Vacuum heat treatment and 5-axis CNC machining ensure every component delivers consistent, " +
    "cost-effective performance. From heavy-duty twin-shaft shredder blades and granulator knives " +
    "to precision strand pelletizer rotors and continuous melt filter scraper blades, our product " +
    "line covers the full plastics processing chain — 100% drop-in OEM compatible.",
  ctaHref: "#tooling-matrix",
  gallery: [
    {
      src: "/images/applications/plastic-industry/four-shaft-shredder-blade-00.webp",
      alt: "Four-shaft shredder blade assembly",
    },
    {
      src: "/images/applications/plastic-industry/strand-pelletizer-rotor-03.webp",
      alt: "Strand pelletizer rotor for compounding lines",
    },
    {
      src: "/images/applications/plastic-industry/scraper-blades-02.webp",
      alt: "Melt filter scraper blades for continuous filtration",
    },
    {
      src: "/images/applications/plastic-industry/granulator-blades-03.webp",
      alt: "Granulator blades for plastic size reduction",
    },
    {
      src: "/images/applications/plastic-industry/mutil-shaft-shredder-blades.webp",
      alt: "Multi-shaft shredder blades for plastic recycling",
    },

    {
      src: "/images/applications/plastic-industry/single-shredder-blades-04.webp",
      alt: "Single shaft shredder blades for plastic",
    },     
    {
      src: "/images/applications/plastic-industry/6-Wire%20Cut.webp",
      alt: "Wire-cut machining process detail",
    },
    {
      src: "/images/applications/plastic-industry/vacuum-heat-treatment.webp",
      alt: "Vacuum heat treatment process",
    },
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

const FILTER_CATEGORIES = [
  "ALL",
  ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase()))),
];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Real Cost of Wear.",
  challengeBody:
    "Processing mixed polymers, glass-filled compounds, and post-consumer waste introduces severe " +
    "abrasive wear. Standard blades degrade rapidly, forcing costly unplanned line stoppages and " +
    "contaminated pellet output.",
  solutionTitle: "Engineered for the Full Processing Chain.",
  solutionBody:
    "PM-HSS and Tungsten Carbide rotors deliver up to 10× longer tool life on GF/CF compounds. " +
    "Precision scraper blades maintain continuous melt filtration without screen shutdowns. " +
    "Every component is CMM-verified for zero-defect drop-in fit (+30% Uptime).",
  highlightToken: "(+30% Uptime)",
};

const SPECS: IndustrySpec[] = [
  {
    label: "Rotor Concentricity",
    mainValue: "≤0.005",
    unit: "mm",
    subtext: "Pelletizer Runout (TIR)",
  },
  {
    label: "Material Range",
    mainValue: "D2 → WC",
    subtext: "M2 / PM-HSS / Carbide",
    isTextual: true,
  },
  {
    label: "Core Hardness",
    mainValue: "58–64",
    unit: "HRC",
    subtext: "Vacuum Heat Treat",
  },
  {
    label: "Balancing Grade",
    mainValue: "ISO G2.5",
    subtext: "Dynamic @ Operating RPM",
    isTextual: true,
  },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  {
    name: "PET Bottle Flakes",
    abrasion: "EXTREME",
    grade: "Tungsten Carbide",
    image: "/images/materials/pet-flakes.webp",
  },
  {
    name: "HDPE Thick-Wall Pipes",
    abrasion: "HIGH",
    grade: "SKD-11 (Cr12MoV)",
    image: "/images/materials/hdpe-pipe.webp",
  },
  {
    name: "Mixed Post-Consumer",
    abrasion: "VARIABLE",
    grade: "D2 / M2 HSS",
    image: "/images/materials/mixed-plastic.webp",
  },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Plastics Recycling & Compounding Tooling",
  url: "https://sureay.com/plastic-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Twin Shaft Shredder Blades",
        image: "https://sureay.com/images/products/shredder-blades/shredder-blades-01.webp",
        description: "Heavy-duty D2 and H13 twin-shaft shredder blades for plastic waste, HDPE pipes and mixed post-consumer feedstocks.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/twin-shaft-blades-recycling",
        offers: getBladeAggregateOffer("twin-shaft-blades-recycling"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Granulator Blades",
        image: "https://sureay.com/images/products/granulator-blades/granulator-blades-01.webp",
        description: "Tungsten Carbide and D2 granulator rotor knives precision-ground for plastic recycling and size reduction lines.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/granulator-blades",
        offers: getBladeAggregateOffer("granulator-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Strand Pelletizer Rotors",
        image: "https://sureay.com/images/products/blades/strand-pelletizer-rotor-01.webp",
        description: "PM-HSS and solid tungsten carbide strand pelletizer rotors with ≤0.005 mm concentricity, dynamic balanced to ISO 1940-1 G2.5 for Maag, Coperion and Cumberland lines.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/strand-pelletizer-rotors",
        offers: getBladeAggregateOffer("strand-pelletizer-rotors"),
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Melt Filter Scraper Blades",
        image: "https://sureay.com/images/products/blades/scraper-blades.webp",
        description: "D2, H13 and solid carbide scraper blades for continuous melt filters. Compatible with EREMA, Gneuß, Ettlinger and FIMIC filtration systems.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/continuous-melt-filter-scraper-blades",
        offers: getBladeAggregateOffer("continuous-melt-filter-scraper-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Single Shaft Rotor Inserts",
        image: "https://sureay.com/images/products/shredder-blades/single-shredder-blades-06.webp",
        description: "Indexable D2 and H13 single-shaft shredder rotor inserts for plastic waste, HDPE, and mixed post-consumer feedstocks.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/single-shaft-rotor-inserts",
        offers: getBladeAggregateOffer("single-shaft-rotor-inserts"),
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Product",
        name: "Single Shaft Bed Knives",
        image: "https://sureay.com/images/products/shredder-blades/single-shredder-bed-knives.webp",
        description: "Precision-ground D2 counter blades for single-shaft shredder systems. Drop-in OEM replacements with controlled-wear hardness.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/single-shaft-bed-knives",
        offers: getBladeAggregateOffer("single-shaft-bed-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Product",
        name: "Tire Shredder Blades",
        image: "https://sureay.com/images/products/shredder-blades/3-claw-shredder-blades.webp",
        description: "3-claw and 4-claw tire shredder blades in CR12 and D2 for rubber tire and cable shredding under extreme impact and abrasive loads.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/tire-shredder-blades",
        offers: getBladeAggregateOffer("tire-shredder-blades"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function PlasticIndustry() {
  return (
    <>
      <SEO
        title="Plastics Recycling & Compounding Blades — Shredder, Pelletizer & Melt Filter"
        description="Precision shredder blades, strand pelletizer rotors and melt filter scraper blades for plastics recycling and compounding lines. PM-HSS & carbide grades for GF/CF compounds. OEM-compatible with EREMA, Maag, Coperion, Cumberland and LINDNER."
        canonicalUrl="/plastic-industry"
        keywords="plastic recycling blades, strand pelletizer rotors, granulator knives, shredder blades, melt filter scraper blades, PM-HSS compounding blades, GF40 pelletizer rotor, Coperion replacement rotor"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "Plastics Recycling", url: "/plastic-industry" },
        ]}
      />
      <Helmet>
        <link rel="preload" as="image" href={LCP_PRELOAD} />
        <script type="application/ld+json">
          {JSON.stringify(PAGE_SCHEMA)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <IndustryHero data={HERO_DATA} />
        <IndustryToolingMatrix
          products={PRODUCTS}
          filterCategories={FILTER_CATEGORIES}
        />
        <IndustryBlueprintDashboard narrative={NARRATIVE} specs={SPECS} />
        <IndustryMaterialFocus materials={MATERIALS} />
        <IndustryOemPipeline />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
