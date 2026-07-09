/*
 * metal-industry.tsx — Metal Processing & Coil Slitting
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
import CategoryLinksRow from "@/components/industry/CategoryLinksRow";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import IndustryMaterialFocus from "@/components/industry/IndustryMaterialFocus";
import { getBladeAggregateOffer } from "@/data/blades";
import { useLang } from "@/contexts/LangContext";
import { getBlades } from "@/data/locales";
import { useTranslation } from "@/lib/useTranslation";
import type {
  IndustryHeroData,
  IndustryProduct,
  IndustryNarrative,
  IndustrySpec,
  IndustryMaterial,
} from "@/components/industry/types";

// ─── Gallery image paths (alt text built per-locale inside component) ──
const GALLERY_IMAGES = [
  "/images/applications/metal-industry/metal-slitter-knives-04.webp",
  "/images/applications/metal-industry/single-shredder-blades-010.webp",
  "/images/applications/metal-industry/metal-shear-blades-00.webp",
  "/images/applications/metal-industry/metal-slitter-knives-00.webp",
  "/images/applications/metal-industry/metal-slitter-knives-01.webp",
  "/images/applications/metal-industry/metal-shear-blades-03.webp",
  "/images/applications/metal-industry/cold-rolled-steel.webp",
  "/images/applications/metal-industry/machine.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Metal Processing Tooling & Coil Slitting Equipment",
  url: "https://sureay.com/metal-industry",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Metal Coil Slitting Knives",
        image: "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-00.webp",
        description: "Through-hardened SKH-51 circular slitter knives precision-ground to ±0.005 mm side run-out for burr-free steel coil slitting.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/metal-coil-slitting-knives",
        offers: getBladeAggregateOffer("metal-coil-slitting-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Metal Shear Knives",
        image: "https://sureay.com/images/products/granulator-blades/metal-shear-blades-00.webp",
        description: "Precision-ground upper and lower guillotine blades for hydraulic and mechanical shears. Clean, straight cuts on sheet and plate.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/metal-shear-knives",
        offers: getBladeAggregateOffer("metal-shear-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Metal Shredder Blades",
        image: "https://sureay.com/images/products/shredder-blades/shredder-blades-02.webp",
        description: "Multi-shaft shredder blades in D2 and H13 for steel, aluminum, and mixed metal scrap size reduction.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/multi-shaft-blades-metal",
        offers: getBladeAggregateOffer("multi-shaft-blades-metal"),
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Metal Cold Saw Blades",
        image: "https://sureay.com/images/products/metal-cold-saw-blades/metal-cold-saw-blades.webp",
        description: "Cermet and HSS metal cold saw blades for precision burr-free cutting of steel tubes, profiles, and structural sections.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/metal-cold-saw-blades",
        offers: getBladeAggregateOffer("metal-cold-saw-blades"),
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Scrap Chopper Blades",
        image: "https://sureay.com/images/products/granulator-blades/scrap-chopper-blades.webp",
        description: "S7 and H13 reversible 4-edge scrap chopper blades for metal stamping offcuts and sheet metal scrap processing.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/scrap-chopper-blades",
        offers: getBladeAggregateOffer("scrap-chopper-blades"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function MetalIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.metal.hero.breadcrumb"),
    h1: t("industry.metal.hero.h1"),
    h2: t("industry.metal.hero.h2"),
    body1: t("industry.metal.hero.body1"),
    body2: t("industry.metal.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.metal.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.metal.narrative.challengeTitle"),
    challengeBody: t("industry.metal.narrative.challengeBody"),
    solutionTitle: t("industry.metal.narrative.solutionTitle"),
    solutionBody: t("industry.metal.narrative.solutionBody"),
    highlightToken: t("industry.metal.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    { label: t("industry.metal.specs.s1.label"), mainValue: "±0.005", unit: "mm", subtext: t("industry.metal.specs.s1.subtext") },
    { label: t("industry.metal.specs.s2.label"), mainValue: "SKH-51\\nTC Grade", subtext: t("industry.metal.specs.s2.subtext"), isTextual: true },
    { label: t("industry.metal.specs.s3.label"), mainValue: "62–66", unit: "HRC", subtext: t("industry.metal.specs.s3.subtext") },
    { label: t("industry.metal.specs.s4.label"), mainValue: "Ra ≤ 0.4", unit: "μm", subtext: t("industry.metal.specs.s4.subtext") },
  ];

  const MATERIALS: IndustryMaterial[] = [
    { name: t("industry.metal.materials.m1.name"), abrasion: t("industry.metal.materials.m1.abrasion"), grade: "SKH-51", image: "/images/materials/cold-rolled-steel.webp" },
    { name: t("industry.metal.materials.m2.name"), abrasion: t("industry.metal.materials.m2.abrasion"), grade: "Tungsten Carbide", image: "/images/materials/stainless-strip.webp" },
    { name: t("industry.metal.materials.m3.name"), abrasion: t("industry.metal.materials.m3.abrasion"), grade: "D2 Steel", image: "/images/materials/aluminum-sheet.webp" },
  ];

  const allBlades = getBlades(lang);
  const PRODUCTS: IndustryProduct[] = [
    ...allBlades.filter(blade => blade.sector === "metal"),
    ...allBlades.filter(blade => blade.id === "bottom-grooved-anvil-knives"),
  ].map((blade, index) => ({
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

  return (
    <>
      <SEO
        title={t("industry.metal.seo.title")}
        description={t("industry.metal.seo.description")}
        canonicalUrl="/metal-industry"
        keywords={t("industry.metal.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.metal"), url: "/metal-industry" },
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
        <CategoryLinksRow
          categories={[
            { slug: "slitter-knives", name: "Slitter Knives" },
            { slug: "shredder-blades", name: "Shredder Blades" },
            { slug: "shear-blades", name: "Shear Blades" },
            { slug: "cold-saw-blades", name: "Cold Saw Blades" },
          ]}
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
