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
  "/images/applications/converting-industry/converting-industry.webp",
  "/images/applications/converting-industry/rotary-slitter-knives-02.webp",
  "/images/applications/converting-industry/rotary-slitter-knives-08.webp",
  "/images/applications/converting-industry/rotary-slitter-knives-09.webp",
  "/images/applications/converting-industry/nonwoven-slitter-knives.webp",
  "/images/applications/converting-industry/nonwoven-slitter-knives-01.webp",
  "/images/applications/converting-industry/cnc-machine.webp",
  "/images/applications/converting-industry/material.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

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
        name: "Film & Tape Slitter Knives",
        image: "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-01.webp",
        description: "Precision circular slitting knives for BOPP film, flexible packaging, and label converting at ±0.002mm tolerance.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/rotary-slitter-knives",
        offers: getBladeAggregateOffer("rotary-slitter-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Nonwoven Slitter Knives",
        image: "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-09.webp",
        description: "M2 HSS circular slitter knives with 15–20° positive rake geometry for spunbond, SMS, and meltblown nonwoven fabrics.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/nonwoven-slitter-knives",
        offers: getBladeAggregateOffer("nonwoven-slitter-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Bottom Grooved Anvil Knives",
        image: "https://sureay.com/images/products/rotary-slitter-knives/bottom-grooved-slitter-knives.webp",
        description: "Bottom grooved anvil knives for film, tape, and flexible packaging shear slitting systems. Precision-ground groove geometry for consistent nip pressure.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/bottom-grooved-anvil-knives",
        offers: getBladeAggregateOffer("bottom-grooved-anvil-knives"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ConvertingIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.converting.hero.breadcrumb"),
    h1: t("industry.converting.hero.h1"),
    h2: t("industry.converting.hero.h2"),
    body1: t("industry.converting.hero.body1"),
    body2: t("industry.converting.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.converting.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.converting.narrative.challengeTitle"),
    challengeBody: t("industry.converting.narrative.challengeBody"),
    solutionTitle: t("industry.converting.narrative.solutionTitle"),
    solutionBody: t("industry.converting.narrative.solutionBody"),
    highlightToken: t("industry.converting.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    { label: t("industry.converting.specs.s1.label"), mainValue: "±0.002", unit: "mm", subtext: t("industry.converting.specs.s1.subtext") },
    { label: t("industry.converting.specs.s2.label"), mainValue: "≤ 0.02", unit: "mm", subtext: t("industry.converting.specs.s2.subtext") },
    { label: t("industry.converting.specs.s3.label"), mainValue: "Ra ≤ 0.4", unit: "μm", subtext: t("industry.converting.specs.s3.subtext") },
    { label: t("industry.converting.specs.s4.label"), mainValue: "600", unit: "m/min", subtext: t("industry.converting.specs.s4.subtext") },
  ];

  const MATERIALS: IndustryMaterial[] = [
    { name: t("industry.converting.materials.m1.name"), abrasion: t("industry.converting.materials.m1.abrasion"), grade: "M2 HSS / ASP23 PM", image: "/images/materials/BOPP-BOPET.webp" },
    { name: t("industry.converting.materials.m2.name"), abrasion: t("industry.converting.materials.m2.abrasion"), grade: "D2 / M2 HSS with TiN", image: "/images/materials/label-stock.webp" },
    { name: t("industry.converting.materials.m3.name"), abrasion: t("industry.converting.materials.m3.abrasion"), grade: "M2 HSS (ESD Coated)", image: "/images/materials/medical-nonwoven.webp" },
  ];

  const PRODUCTS: IndustryProduct[] = getBlades(lang)
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

  return (
    <>
      <SEO
        title={t("industry.converting.seo.title")}
        description={t("industry.converting.seo.description")}
        canonicalUrl="/converting-industry"
        keywords={t("industry.converting.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.converting"), url: "/converting-industry" },
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
            { slug: "log-saw-blades", name: "Log Saw Blades" },
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
