/*
 * wood-industry.tsx — Wood & Forestry Industry
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
  breadcrumb: "Home / Industries / Wood & Forestry",
  h1: "Wood Chipper Knife Manufacturer — Forestry, Biomass & Landscape Grade",
  h2: "Drum Chipper Blades, Disc Chipper Knives & Counter-Knives",
  body1:
    "Sureay manufactures through-hardened drum and disc chipper knives in D2, Cr12MoV, M2 HSS, " +
    "and TCT carbide-tipped configurations for industrial forestry, biomass energy production, " +
    "landscape tree service, and pallet/demolition wood recycling. OEM-compatible with Bandit, " +
    "Vermeer, Morbark, Doppstadt, Jenz, Peterson, CBI, and Bruks Siwertell.",
  body2:
    "Vacuum heat treatment and deep cryogenic processing (−196°C) delivers uniform HRC 55–62 " +
    "from surface to core — every regrind cycle delivers identical edge performance. Reversible " +
    "double-edge blades for landscape operations, and heavy-duty single-edge industrial blades for " +
    "biomass plants and whole-tree chippers. Precision surface-ground to ±0.05 mm thickness " +
    "parallelism for vibration-free drum balance at 2,500 RPM.",
  ctaHref: "#tooling-matrix",
  gallery: [
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-standard-00.webp",
      alt: "Reversible double-edge wood chipper knives",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-working.webp",
      alt: "Wood chipper in operation — forestry land clearing",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
      alt: "Wood chipper anvil counter-knife — D2 tool steel, precision ground",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
      alt: "Drum chipper blades for forestry operations",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-14.webp",
      alt: "Industrial wood chipper knives on workbench",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-install.webp",
      alt: "Installing wood chipper knives on drum chipper",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-12.webp",
      alt: "Heavy-duty chipper blades for biomass processing",
    },
    {
      src: "/images/products/wood-chipper-blades/wood-chipper-blades-18.webp",
      alt: "Wood chipper blades batch — multiple knives surface-ground and ready for shipment",
    },

  ],
};

// Preload href for the LCP image (gallery[0])
const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
// Filter from blades.ts where category === "wood_chipper"
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.category === "wood_chipper")
  .map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0,
    desc: blade.description,
  }));

const FILTER_CATEGORIES = [
  "ALL",
  ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase()))),
];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "The Cost of a Dull Blade.",
  challengeBody:
    "A wood chipper running dull knives doesn't just slow down — it tears fibres instead of " +
    "shearing them, spikes fuel consumption by 15–25%, destroys drum bearings through vibration, " +
    "and turns uniform biomass chips into off-spec splinters that fail EN 17225 screening.",
  solutionTitle: "Through-Hardened. Every Regrind Identical.",
  solutionBody:
    "Vacuum heat treatment and deep cryogenic processing at −196°C produce uniform HRC 55–62 " +
    "from surface to core. Unlike case-hardened alternatives that expose a soft core after the " +
    "first regrind, every Sureay chipper knife delivers identical edge performance across 8–12 " +
    "regrind cycles (+2× Blade Life vs. Standard Carbon Steel).",
  highlightToken: "(+2× Blade Life vs. Standard Carbon Steel)",
};

const SPECS: IndustrySpec[] = [
  {
    label: "Core Hardness",
    mainValue: "55–62",
    unit: "HRC",
    subtext: "Through-Hardened",
  },
  {
    label: "Material Range",
    mainValue: "T10 → TCT",
    subtext: "9CrSi / D2 / M2 HSS / Carbide",
    isTextual: true,
  },
  {
    label: "Thickness Tol.",
    mainValue: "±0.05",
    unit: "mm",
    subtext: "Drum Balance Precision",
  },
  {
    label: "Bevel Angle",
    mainValue: "25°–42°",
    subtext: "Matched to Wood Species",
    isTextual: true,
  },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  {
    name: "Green Softwood (Pine, Spruce)",
    abrasion: "LOW",
    grade: "T10 / 9CrSi (HRC 55–58)",
    image: "/images/materials/green-softwood.webp",
  },
  {
    name: "Dry Hardwood (Oak, Eucalyptus)",
    abrasion: "HIGH",
    grade: "D2 / Cr12MoV (HRC 58–62)",
    image: "/images/materials/dry-hardwood.webp",
  },
  {
    name: "Contaminated Demo Wood",
    abrasion: "EXTREME",
    grade: "6CrW2Si / TCT Carbide",
    image: "/images/materials/demolition-wood.webp",
  },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wood Chipper Knives & Forestry Blades",
  url: "https://sureay.com/wood-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Wood Chipper Blades — Industrial Grade",
        image:
          "https://sureay.com/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
        description:
          "Heavy-duty D2, Cr12MoV & TCT drum and disc chipper knives for industrial forestry and biomass processing. Through-hardened HRC 57–62 with deep cryogenic treatment.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/wood-chipper-blades",
        offers: getBladeAggregateOffer("wood-chipper-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Industrial Wood Chipper Blades",
        image:
          "https://sureay.com/images/products/wood-chipper-blades/wood-chipper-blades-12.webp",
        description:
          "HSS & D2 drum chipper knives for heavy forestry, whole-tree biomass processing and demolition wood recycling. Vacuum-hardened HRC 58–62.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/wood-chipper-blades-industrial",
        offers: getBladeAggregateOffer("wood-chipper-blades-industrial"),
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Wood Chipper Knives",
        image:
          "https://sureay.com/images/products/wood-chipper-blades/wood-chipper-blades-standard-00.webp",
        description:
          "Reversible double-edge wood chipper knives in T10, 9CrSi & Cr12MoV. Flip when dull — doubles installed life before regrinding. OEM fit for Bandit, Vermeer & Patriot.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/wood-chipper-blades-standard",
        offers: getBladeAggregateOffer("wood-chipper-blades-standard"),
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Wood Chipper Anvils",
        image:
          "https://sureay.com/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
        description:
          "Precision-ground wood chipper anvils (counter-knives / bed knives) in D2, Cr12MoV and A8 Modified steel. HRC 54–60 through-hardened, ±0.05 mm parallelism. OEM fit for Bandit, Vermeer & Morbark.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/wood-chipper-anvils",
        offers: getBladeAggregateOffer("wood-chipper-anvils"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function WoodIndustry() {
  return (
    <>
      <SEO
        title="Wood Chipper Blades & Chipper Knives | Forestry Grade | Sureay"
        description="Through-hardened D2, Cr12MoV & TCT wood chipper knives for drum and disc chippers. OEM-compatible with Bandit, Vermeer, Morbark, Doppstadt & Jenz. Reversible double-edge and industrial single-edge configurations."
        canonicalUrl="/wood-industry"
        keywords="wood chipper blades, chipper knives, drum chipper blades, disc chipper knives, biomass chipper blades, Bandit chipper blades, Vermeer chipper knives, Morbark replacement blades, forestry chipper blades, TCT chipper knives"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "Wood & Forestry", url: "/wood-industry" },
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
