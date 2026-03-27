/*
 * new-energy-industry.tsx — New Energy & Battery Manufacturing
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture mirrors plastic-industry.tsx
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
  breadcrumb: "Home / Markets / New Energy & Battery",
  h1:   "Lithium Battery & New Energy Precision Slitting Knife Supplier",
  h2:   "Zero-Notch Carbide Electrode Slitting · EV Cell Manufacturing",
  body1:
    "Sureay Machinery manufactures tungsten carbide circular slitting knives for lithium-ion battery " +
    "electrode foil processing — the critical upstream step in EV cell, energy storage, and consumer " +
    "electronics battery manufacturing. Our knives achieve Ra ≤ 0.05μm mirror finish and ±0.001mm " +
    "dimensional tolerance, meeting the zero-burr standard required by ISO Class 7 dry-room assembly environments.",
  body2:
    "From automotive-grade NMC cathode aluminium foil to ultra-thin 6μm copper anode foil, " +
    "every Sureay battery slitting knife is manufactured from submicron WC-Co tungsten carbide, " +
    "individually inspected on CMM, and supplied with full material traceability documentation " +
    "for IATF 16949 EV supply chain qualification.",
  ctaHref: "#tooling-matrix",
  gallery: [
    { src: "/images/applications/energy-industry/knives-using-in-energy-industry.webp",    alt: "Precision knives for new energy battery manufacturing" },
    { src: "/images/applications/energy-industry/slitting-blades.webp",                    alt: "Slitting blades for electrode foil"                   },
    { src: "/images/applications/energy-industry/slitting-blades-11.webp",                 alt: "Carbide slitter knife for battery electrode"           },
    { src: "/images/applications/energy-industry/slitting-blades-12.webp",                 alt: "Precision slitting knife for lithium battery"          },
    { src: "/images/applications/energy-industry/slitting-blades-13.webp",                 alt: "Battery electrode foil slitting process"               },
    { src: "/images/applications/energy-industry/slitting-blades-14.webp",                 alt: "Slitter knife precision detail view"                   },
    { src: "/images/applications/energy-industry/rotary-slitter-knives-detail.webp",       alt: "Rotary slitter knife edge quality detail"              },
    { src: "/images/applications/energy-industry/knives-using-in-energy-industry-02.webp", alt: "Energy industry knife application close-up"            },
  ],
};

const LCP_IMG = HERO_DATA.gallery[0].src;
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: IndustryProduct[] = blades
  .filter(blade => blade.sector === "new_energy")
  .map((blade, index) => ({
    category: blade.categoryDisplay,
    name: blade.name,
    image: blade.image,
    href: blade.link,
    isFlagship: index === 0,
  }));

const FILTER_CATEGORIES = ["ALL", ...Array.from(new Set(PRODUCTS.map(p => p.category.toUpperCase())))];

// ─── Blueprint Dashboard ──────────────────────────────────────────────────────
const NARRATIVE: IndustryNarrative = {
  challengeTitle: "One Burr. One Failed Cell.",
  challengeBody:
    "A single micro-burr on electrode foil penetrates the separator membrane, causing internal short-circuit " +
    "and catastrophic cell failure. Standard slitter knives cannot hold the zero-notch Ra ≤ 0.05μm " +
    "tolerance required by battery-grade aluminium and copper foil specifications.",
  solutionTitle:  "Mirror Finish. Zero Contamination.",
  solutionBody:
    "Sureay submicron WC-Co carbide knives are lapped to Ra ≤ 0.05μm and individually CMM-certified " +
    "to ±0.001mm — delivering the zero-burr edge quality required for ISO Class 7 dry-room cell assembly (+8× edge life vs D2).",
  highlightToken: "(+8× edge life vs D2)",
};

const SPECS: IndustrySpec[] = [
  { label: "Surface Finish", mainValue: "Ra ≤ 0.05", unit: "μm",  subtext: "Mirror — Zero Notch"    },
  { label: "Thickness Tol.", mainValue: "±0.001",    unit: "mm",  subtext: "CMM Verified per Knife"  },
  { label: "T.I.R. Runout",  mainValue: "≤ 0.01",    unit: "mm",  subtext: "100% Inspected"          },
  { label: "Carbide Grade",  mainValue: "WC-Co\\nSubmicron",       subtext: "≤ 0.5μm Grain Size", isTextual: true },
];

// ─── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS: IndustryMaterial[] = [
  { name: "Al Cathode Foil (12–20μm)",  abrasion: "HIGH",    grade: "WC-Co K10 Submicron", image: "/images/materials/al-cathode-foil.webp"       },
  { name: "Cu Anode Foil (6–12μm)",     abrasion: "EXTREME", grade: "WC-Co K05 Submicron", image: "/images/materials/cu-anode-foil.webp"         },
  { name: "PVDF Separator Film",        abrasion: "EXTREME", grade: "Cermet / PCD",         image: "/images/materials/PVDF-separator-film.webp"   },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "New Energy & Battery Electrode Slitting Tooling",
  url: "https://sureay.com/new-energy-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Lithium Battery Electrode Slitting Knives",
        image: "https://sureay.com/images/products/blades.webp",
        description: "Tungsten carbide circular slitting knives for Al cathode and Cu anode electrode foil — Ra ≤ 0.05μm mirror finish, ±0.001mm tolerance, IATF 16949 certified.",
        brand: { "@type": "Brand", name: "Sureay Industrial Blades" },
        url: "https://sureay.com/products/lithium-battery-slitting-knives",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function NewEnergyIndustry() {
  return (
    <>
      <SEO
        title="Lithium Battery Slitting Knives — New Energy Electrode Foil Cutting"
        description="Tungsten carbide circular slitting knives for lithium-ion battery electrode foil. Ra ≤ 0.05μm zero-notch mirror finish. Compatible with Kaido, Koem, Hirano, and CKD battery winding machines. IATF 16949 documentation."
        canonicalUrl="/new-energy-industry"
        keywords="lithium battery slitting knives, electrode foil cutter, tungsten carbide slitter, battery slitting blade, EV battery manufacturing"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/products" },
          { name: "New Energy & Battery", url: "/new-energy-industry" },
        ]}
      />
      <Helmet>
        <link rel="preload" as="image" href={LCP_PRELOAD} />
        <script type="application/ld+json">{JSON.stringify(PAGE_SCHEMA)}</script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <IndustryHero              data={HERO_DATA}                                         />
        <IndustryToolingMatrix     products={PRODUCTS} filterCategories={FILTER_CATEGORIES} />
        <IndustryBlueprintDashboard narrative={NARRATIVE}    specs={SPECS}                 />
        <IndustryMaterialFocus     materials={MATERIALS}                                    />
        <IndustryOemPipeline />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
