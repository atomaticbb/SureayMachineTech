/*
 * metal-industry.tsx — Metal Processing & Coil Slitting
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
  breadcrumb: "Home / Markets / Metal Processing",
  h1:   "Industrial Metal Slitting & Shear Blade Manufacturer",
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
    { src: "/images/applications/metal-industry/cold-rolled-steel.webp",           alt: "Cold rolled steel coil processing"               },
    { src: "/images/applications/metal-industry/machine.webp",                     alt: "Metal processing machine"                        },
    { src: "/images/applications/metal-industry/metal-slitter-knives-00.webp",     alt: "Metal slitter knives for coil slitting"          },
    { src: "/images/applications/metal-industry/metal-slitter-knives-01.webp",     alt: "Rotary metal slitter knives close-up"            },
    { src: "/images/applications/metal-industry/metal-shear-blades-00.webp",       alt: "Metal shear blades for guillotine shearing"      },
    { src: "/images/applications/metal-industry/metal-shear-blades-03.webp",       alt: "Heavy-duty metal shear knife detail"             },
    { src: "/images/applications/metal-industry/single-shredder-blades-010.webp",  alt: "Industrial blades for metal fabrication"         },
    { src: "/images/applications/metal-industry/metal-slitter-knives-04.webp",  alt: "Industrial metal slitter knives for coil slitting equipment"},
  ],
};

// Preload href for the LCP image (gallery[0]) — 640w variant for 2× retina desktop
const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
// Dynamically load products from blades.ts where sector === "metal"
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.sector === "metal")
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

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "Cold-Rolled Steel Coil",  abrasion: "HIGH",     grade: "SKH-51",           image: "/images/materials/cold-rolled-steel.webp"  },
  { name: "Stainless Steel Strip",   abrasion: "EXTREME",  grade: "Tungsten Carbide", image: "/images/materials/stainless-strip.webp"    },
  { name: "Aluminum Sheet Stock",    abrasion: "MODERATE", grade: "D2 Steel",         image: "/images/materials/aluminum-sheet.webp"     },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Metal Processing Tooling & Coil Slitting Equipment",
  url: "https://www.sureay.com/industry/metal-processing",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Circular Slitter Knives",
        image: "https://www.sureay.com/images/products/blades/11-6-2_metal-slitter-knife.webp",
        description: "Through-hardened SKH-51 circular slitter knives precision-ground to ±0.005 mm side run-out for burr-free steel coil slitting.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://www.sureay.com/products/rotary-cutter-blades",
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
        name: "Guillotine Shear Blades",
        image: "https://www.sureay.com/images/products/blades/11-6-2_metal-slitter-knife.webp",
        description: "Precision-ground upper and lower guillotine blades for hydraulic and mechanical shears. Clean, straight cuts on sheet and plate.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://www.sureay.com/products/alloy-blades",
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
export default function MetalIndustry() {
  return (
    <>
      <SEO
        title="Metal Processing Tooling & Coil Slitting Equipment"
        description="Through-hardened circular slitter knives, guillotine shear blades and precision punch dies engineered for zero-burr metal coil processing. OEM-compatible with TRUMPF, AMADA, BYSTRONIC."
        canonicalUrl="/metal-industry"
        keywords="metal slitting knives, guillotine shear blades, coil processing, steel cutting, metal fabrication blades"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "Metal Processing", url: "/metal-industry" },
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
