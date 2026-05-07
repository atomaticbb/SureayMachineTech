/*
 * paper-industry.tsx — Paper & Tissue Converting
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
  breadcrumb: "Home / Industries / Paper and Tissue",
  h1: "Paper and Tissue Knife Manufacturer — HSS & TC Grades",
  h2: "Log Saw Blades, Slitter Knives, Trimmer Blades & OEM Wear Parts",
  body1:
    "Sureay Machinery manufactures triple-ground tissue log saw blades, rewinder perforation " +
    "knives, precision slitting tooling, and corrugated slitter-scorer blades engineered for " +
    "maximum throughput on high-speed paper, tissue, and corrugated converting lines. Our blade " +
    "profiles are matched to Fabio Perini, Körber, Fosber, BHS, Marquip, and all major OEM geometries.",
  body2:
    "Our in-house CNC profile grinding delivers consistent tooth form across the full blade width, " +
    "while our M2 and M42 HSS grades are vacuum-hardened for optimal edge retention at 500+ m/min " +
    "line speeds. Every blade ships fully inspected—blade runout, tooth pitch, and diameter all " +
    "CMM-verified—for zero-rework drop-in installation.",
  ctaHref: "#tooling-matrix",
  gallery: [
    {
      src: "/images/applications/tissue-industry/tissue-and-paper.webp",
      alt: "Tissue and paper converting line",
    },
    {
      src: "/images/applications/tissue-industry/tissue-log-saw-blades-02.webp",
      alt: "Tissue log saw blades",
    },
    {
      src: "/images/applications/tissue-industry/paper-cutting-blades-02.webp",
      alt: "Paper cutting blades precision",
    },
    {
      src: "/images/applications/tissue-industry/granulator-blades-05.webp",
      alt: "Granulator blades for paper processing",
    },
    {
      src: "/images/applications/tissue-industry/rotary-slitter-knives-00.webp",
      alt: "Rotary slitter knives for tissue converting",
    },
    {
      src: "/images/applications/tissue-industry/granulator-blades-04.webp",
      alt: "Granulator blades close-up",
    },
    {
      src: "/images/applications/tissue-industry/blades.webp",
      alt: "Industrial blades for tissue processing",
    },
    {
      src: "/images/applications/tissue-industry/virgin-tissue.webp",
      alt: "Virgin tissue rolls production",
    },
  ],
};

// Preload href for the LCP image (gallery[0]) — 640w variant for 2× retina desktop
const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
// Dynamically load products from blades.ts where sector === "paper"
const PRODUCTS: IndustryProduct[] = [
  ...blades.filter(blade => blade.sector === "paper"),
  ...blades.filter(blade => blade.id === "bottom-grooved-anvil-knives"),
].map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0, // First product is flagship
    desc: blade.description, // Use blade description from blades.ts
  }));

const FILTER_CATEGORIES = [
  "ALL",
  ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase()))),
];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Cost of Blade Dullness.",
  challengeBody:
    "High-speed tissue and paper converting lines run at 500+ m/min, demanding blades that sustain " +
    "a clean, consistent cut across millions of cycles. Dull or misground blades cause log tearing, " +
    "fibre dust contamination, and unplanned rewinder shutdowns that erode OEE.",
  solutionTitle: "Maximum Cuts. Zero Fibre Pull.",
  solutionBody:
    "Our triple-ground hollow-ground tissue log saw blades are engineered to exacting OEM tooth profiles, " +
    "delivering burr-free, dust-free cuts at full line speed and (+40% More Cuts Per Grind).",
  highlightToken: "(+40% More Cuts Per Grind)",
};

const SPECS: IndustrySpec[] = [
  {
    label: "Grind Specification",
    mainValue: "Triple\\nGround",
    subtext: "Profile-Matched to OEM",
    isTextual: true,
  },
  {
    label: "Material Grade",
    mainValue: "M2\\nHSS",
    subtext: "High-Speed Steel",
    isTextual: true,
  },
  {
    label: "Tooth Pitch",
    mainValue: "54–120",
    unit: "TPI",
    subtext: "Custom Profile Available",
  },
  {
    label: "Surface Finish",
    mainValue: "Ra ≤ 0.6",
    unit: "μm",
    subtext: "Mirror Polish",
  },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  {
    name: "Virgin Tissue Rolls",
    abrasion: "LOW",
    grade: "M2 HSS Triple-Ground",
    image: "/images/materials/virgin-tissue.webp",
  },
  {
    name: "Recycled Fibre Logs",
    abrasion: "MODERATE",
    grade: "D2 / M2 HSS",
    image: "/images/materials/recycled-fibre.webp",
  },
  {
    name: "Kraft & Board Stock",
    abrasion: "HIGH",
    grade: "Bimetal / TC-Tipped",
    image: "/images/materials/kraft-board.webp",
  },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Paper & Tissue Converting Knives",
  url: "https://sureay.com/paper-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Tissue Log Saw Blades",
        image: "https://sureay.com/images/products/blades/tissue-log-saw-blades-05.webp",
        description: "Triple-ground M2 HSS log saw blades for tissue, kitchen towel and napkin converting lines. OEM profile-matched to Fabio Perini, Körber and Fosber.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/tissue-log-saw-blades",
        offers: getBladeAggregateOffer("tissue-log-saw-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Paper Slitter Knives",
        image: "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
        description: "M2 HSS and D2 rotary slitter knives for paper, kraft board, and release liner slitting. OEM profile-matched for Valmet, Metso, and Kampf rewinders.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/rotary-slitter-knives-paper",
        offers: getBladeAggregateOffer("rotary-slitter-knives-paper"),
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Paper Cutting Blades",
        image: "https://sureay.com/images/products/paper-cutting-blades/paper-cutting-blades-00.webp",
        description: "Guillotine blades for hydraulic paper cutters and bookbinding machines. M2 HSS for clean, burr-free cuts on paper stacks.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/paper-cutting-blades",
        offers: getBladeAggregateOffer("paper-cutting-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Three-Knife Trimmer Blades",
        image: "https://sureay.com/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
        description: "Three-knife trimmer blades for Muller Martini, Kolbus, and Wohlenberg book trimming systems. Drop-in OEM replacements.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/three-knife-trimmer-blades",
        offers: getBladeAggregateOffer("three-knife-trimmer-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Corrugated Slitter Blades",
        image: "https://sureay.com/images/products/corrugated-slitter-scorer-blades/corrugated-slitter-scorer-blades-01.webp",
        description: "Circular slitter and scorer blades for corrugated board and cardboard converting lines. Compatible with BHS, Fosber, and SHM machinery.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/corrugated-slitter-scorer-blades",
        offers: getBladeAggregateOffer("corrugated-slitter-scorer-blades"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function PaperIndustry() {
  return (
    <>
      <SEO
        title="Paper & Tissue Converting Knives & Equipment"
        description="Triple-ground tissue log saw blades, rewinder perforation knives and slitting tooling for high-speed paper and tissue converting lines. OEM-compatible with Fabio Perini, Körber, Fosber."
        canonicalUrl="/paper-industry"
        keywords="tissue log saw blades, paper cutting knives, guillotine blades, paper converting, printing industry blades"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "Paper & Tissue", url: "/paper-industry" },
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
