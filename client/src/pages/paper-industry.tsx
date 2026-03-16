/*
 * paper-industry.tsx — Paper & Tissue Converting
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import { Helmet } from "react-helmet-async";
import SEO from "@/components/common/SEO";
import Navbar    from "@/components/layout/Navbar";
import Footer    from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero               from "@/components/industry/IndustryHero";
import IndustryToolingMatrix      from "@/components/industry/IndustryToolingMatrix";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline        from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus      from "@/components/industry/IndustryMaterialFocus";
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
  breadcrumb: "Home / Markets / Paper & Tissue",
  h1:   "Paper & Tissue Knife Manufacturer — HSS & TC Grades",
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
    { src: "/images/applications/tissue-industry/tissue-and-paper.webp",           alt: "Tissue and paper converting"                    },
    { src: "/images/applications/tissue-industry/virgin-tissue.webp",              alt: "Virgin tissue rolls production"                 },
    { src: "/images/applications/tissue-industry/granulator-blades-05.webp",       alt: "Granulator blades for paper processing"         },
    { src: "/images/applications/tissue-industry/paper-cutting-blades-02.webp",    alt: "Paper cutting blades precision"                 },
    { src: "/images/applications/tissue-industry/blades.webp",                     alt: "Industrial blades for tissue processing"        },
    { src: "/images/applications/tissue-industry/6-Wire%20Cut.webp",               alt: "Wire-cut machining process detail"              },
    { src: "/images/applications/tissue-industry/Raw%20Material%20Selection.webp", alt: "Raw material selection for tissue processing"   },
    { src: "/images/applications/tissue-industry/acuum-heat-treatment.webp",       alt: "Vacuum heat treatment process"                  },
  ],
};

// Preload href for the LCP image (gallery[0]) — 640w variant for 2× retina desktop
const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
// Dynamically load products from blades.ts where sector === "paper" || sector === "converting"
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.sector === "paper" || blade.sector === "converting")
  .map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0, // First product is flagship
    desc: blade.description, // Use blade description from blades.ts
  }));

const FILTER_CATEGORIES = ["ALL", ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase())))];

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

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "Virgin Tissue Rolls",  abrasion: "LOW",      grade: "M2 HSS Triple-Ground", image: "/images/materials/virgin-tissue.webp"   },
  { name: "Recycled Fibre Logs",  abrasion: "MODERATE", grade: "D2 / M2 HSS",          image: "/images/materials/recycled-fibre.webp"  },
  { name: "Kraft & Board Stock",  abrasion: "HIGH",     grade: "Bimetal / TC-Tipped",  image: "/images/materials/kraft-board.webp"     },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Paper & Tissue Converting Knives",
  url: "https://www.sureay.com/industry/paper-tissue",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Tissue Log Saw Blades",
        image: "https://www.sureay.com/images/products/blades/tissue-log-saw-blades.webp",
        description: "Triple-ground M2 HSS log saw blades for tissue, kitchen towel and napkin converting lines. OEM profile-matched to Fabio Perini, Körber and Fosber.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://www.sureay.com/products/tissue-log-saw-blades",
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
