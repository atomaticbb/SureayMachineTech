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

// ─── Gallery (image paths only — alt text built per-locale inside component) ──
const GALLERY_IMAGES = [
  "/images/applications/plastic-industry/four-shaft-shredder-blade-00.webp",
  "/images/applications/plastic-industry/strand-pelletizer-rotor-03.webp",
  "/images/applications/plastic-industry/scraper-blades-02.webp",
  "/images/applications/plastic-industry/granulator-blades-03.webp",
  "/images/applications/plastic-industry/mutil-shaft-shredder-blades.webp",
  "/images/applications/plastic-industry/single-shredder-blades-04.webp",
  "/images/applications/plastic-industry/6-Wire%20Cut.webp",
  "/images/applications/plastic-industry/vacuum-heat-treatment.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

// JSON-LD structured data — Google indexes English structured data even
// from localized pages, so keep it in English regardless of active locale.
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
        url: "https://sureay.com/products/single-shaft-shredder-blades",
        offers: getBladeAggregateOffer("single-shaft-shredder-blades"),
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
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.plastic.hero.breadcrumb"),
    h1: t("industry.plastic.hero.h1"),
    h2: t("industry.plastic.hero.h2"),
    body1: t("industry.plastic.hero.body1"),
    body2: t("industry.plastic.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.plastic.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.plastic.narrative.challengeTitle"),
    challengeBody: t("industry.plastic.narrative.challengeBody"),
    solutionTitle: t("industry.plastic.narrative.solutionTitle"),
    solutionBody: t("industry.plastic.narrative.solutionBody"),
    highlightToken: t("industry.plastic.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    {
      label: t("industry.plastic.specs.s1.label"),
      mainValue: "≤0.005",
      unit: "mm",
      subtext: t("industry.plastic.specs.s1.subtext"),
    },
    {
      label: t("industry.plastic.specs.s2.label"),
      mainValue: "D2 → WC",
      subtext: t("industry.plastic.specs.s2.subtext"),
      isTextual: true,
    },
    {
      label: t("industry.plastic.specs.s3.label"),
      mainValue: "58–64",
      unit: "HRC",
      subtext: t("industry.plastic.specs.s3.subtext"),
    },
    {
      label: t("industry.plastic.specs.s4.label"),
      mainValue: "ISO G2.5",
      subtext: t("industry.plastic.specs.s4.subtext"),
      isTextual: true,
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.plastic.materials.m1.name"),
      abrasion: t("industry.plastic.materials.m1.abrasion"),
      grade: "Tungsten Carbide",
      image: "/images/materials/pet-flakes.webp",
    },
    {
      name: t("industry.plastic.materials.m2.name"),
      abrasion: t("industry.plastic.materials.m2.abrasion"),
      grade: "SKD-11 (Cr12MoV)",
      image: "/images/materials/hdpe-pipe.webp",
    },
    {
      name: t("industry.plastic.materials.m3.name"),
      abrasion: t("industry.plastic.materials.m3.abrasion"),
      grade: "D2 / M2 HSS",
      image: "/images/materials/mixed-plastic.webp",
    },
  ];

  const PRODUCTS: IndustryProduct[] = getBlades(lang)
    .filter(blade => blade.sector === "recycling")
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
        title={t("industry.plastic.seo.title")}
        description={t("industry.plastic.seo.description")}
        canonicalUrl="/plastic-industry"
        keywords={t("industry.plastic.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.plastic"), url: "/plastic-industry" },
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
            { slug: "shredder-blades", name: "Shredder Blades" },
            { slug: "granulator-blades", name: "Granulator Blades" },
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
