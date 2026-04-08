/*
 * converting-industry.tsx — Flexible Converting & Packaging
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture mirrors plastic-industry.tsx
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
  breadcrumb: "Home / Markets / Flexible Converting & Packaging",
  h1: "Flexible Converting & Packaging Slitter Knife Supplier",
  h2: "Film · Nonwoven · PSA Tape · Label Converting Blades",
  body1:
    "Sureay Machinery manufactures precision circular slitter knives and specialty cutting tools for " +
    "the flexible packaging, nonwoven fabric, and label converting industries. Our tooling is engineered " +
    "for high-speed lines running at 150–600 m/min across BOPP, BOPET, CPP film, SMS medical nonwoven, " +
    "pressure-sensitive tape, and adhesive-laminate substrates.",
  body2:
    "From matched top-and-bottom shear pairs for film and label slitting to DLC-coated blades for " +
    "PSA tape lines, every Sureay converting knife is precision ground to ±0.002mm dimensional " +
    "tolerance with optional TiN and DLC anti-adhesion coatings for pressure-sensitive tape and " +
    "adhesive laminate applications.",
  ctaHref: "#tooling-matrix",
  gallery: [
    {
      src: "/images/applications/converting-industry/converting-industry.webp",
      alt: "Flexible converting and packaging industry overview",
    },
    {
      src: "/images/applications/converting-industry/rotary-slitter-knives-02.webp",
      alt: "Rotary slitter knives for flexible packaging",
    },
    {
      src: "/images/applications/converting-industry/rotary-slitter-knives-08.webp",
      alt: "Precision slitter knife for film converting",
    },
    {
      src: "/images/applications/converting-industry/rotary-slitter-knives-09.webp",
      alt: "Slitter knife array for packaging line",
    },
    {
      src: "/images/applications/converting-industry/nonwoven-slitter-knives.webp",
      alt: "Nonwoven slitter knives for SMS fabric",
    },
    {
      src: "/images/applications/converting-industry/nonwoven-slitter-knives-01.webp",
      alt: "Nonwoven fabric slitter knife detail",
    },
    {
      src: "/images/applications/converting-industry/cnc-machine.webp",
      alt: "CNC precision grinding for converting knives",
    },
    {
      src: "/images/applications/converting-industry/material.webp",
      alt: "Premium steel material for converting blades",
    },
  ],
};

const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.sector === "converting")
  .map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0,
  }));

const FILTER_CATEGORIES = [
  "ALL",
  ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase()))),
];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "Speed Demands Precision.",
  challengeBody:
    "At 400 m/min on a BOPP film line, a 0.005mm runout error per blade compounds across a 12-knife arbor, " +
    "producing visible slit-width deviation, edge curl, and web tension spikes that drive unplanned downtime " +
    "and customer complaints on the finished slit roll.",
  solutionTitle: "±0.002mm. Every Knife. Every Time.",
  solutionBody:
    "Sureay converting knives are precision ground to ±0.002mm thickness tolerance and ≤0.02mm T.I.R. runout, " +
    "with optional DLC coating for adhesive tape converting. Consistent geometry eliminates arbor wobble " +
    "and reduces Mean Time Between Replacements by 40%.",
  highlightToken: "(40% longer MTBR)",
};

const SPECS: IndustrySpec[] = [
  {
    label: "Thickness Tol.",
    mainValue: "±0.002",
    unit: "mm",
    subtext: "Across Full Diameter",
  },
  {
    label: "T.I.R. Runout",
    mainValue: "≤ 0.02",
    unit: "mm",
    subtext: "Per Knife, CMM Verified",
  },
  {
    label: "Surface Finish",
    mainValue: "Ra ≤ 0.4",
    unit: "μm",
    subtext: "Precision Ground",
  },
  {
    label: "Line Speed",
    mainValue: "600",
    unit: "m/min",
    subtext: "Verified Performance",
  },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  {
    name: "BOPP / BOPET Film",
    abrasion: "MODERATE",
    grade: "M2 HSS / ASP23 PM",
    image: "/images/materials/BOPP-BOPET.webp",
  },
  {
    name: "Label Stock / Release Liner",
    abrasion: "LOW",
    grade: "D2 / M2 HSS with TiN",
    image: "/images/materials/label-stock.webp",
  },
  {
    name: "SMS Medical Nonwoven",
    abrasion: "LOW",
    grade: "M2 HSS (ESD Coated)",
    image: "/images/materials/medical-nonwoven.webp",
  },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Flexible Converting & Packaging Tooling",
  url: "https://sureay.com/converting-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Rotary Slitter Knives",
        image:
          "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
        description:
          "Precision circular slitting knives for BOPP film, flexible packaging, and label converting at ±0.002mm tolerance.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://sureay.com/products/rotary-slitter-knives",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "PSA Tape & Label Slitter Knives",
        image:
          "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-02.webp",
        description:
          "D2 and M2 HSS circular slitter knives with DLC anti-adhesion coating for pressure-sensitive tape, adhesive laminate, and label stock slitting.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://sureay.com/products/rotary-slitter-knives",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Nonwoven Slitter Knives",
        image: "https://sureay.com/images/products/blades.webp",
        description:
          "M2 HSS circular slitter knives with 15-20° positive rake geometry for spunbond, SMS, and meltblown nonwoven fabrics.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://sureay.com/products/nonwoven-slitter-knives",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ConvertingIndustry() {
  return (
    <>
      <SEO
        title="Flexible Converting & Packaging Slitter Knives — Film, Nonwoven, PSA Tape"
        description="Precision slitter knives for BOPP film, SMS nonwoven, PSA tape, and adhesive-laminate converting. ±0.002mm tolerance. Compatible with Tidland, Atlas, Kampf, and Mario Cotta lines."
        canonicalUrl="/converting-industry"
        keywords="slitter knives converting, film slitter knives, nonwoven slitter blades, BOPP film slitting, PSA tape slitter, flexible packaging knives"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          {
            name: "Flexible Converting & Packaging",
            url: "/converting-industry",
          },
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
