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
  "/images/products/wood-chipper-blades/wood-chipper-blades-standard-00.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-working.webp",
  "/images/products/wood-chipper-blades/wood-chipper-anvil-00.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-11.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-14.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-install.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-12.webp",
  "/images/products/wood-chipper-blades/wood-chipper-blades-18.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

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
        url: "https://sureay.com/products/wood-chipper-blades",
        offers: getBladeAggregateOffer("wood-chipper-blades"),
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
        url: "https://sureay.com/products/wood-chipper-blades",
        offers: getBladeAggregateOffer("wood-chipper-blades"),
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
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.wood.hero.breadcrumb"),
    h1: t("industry.wood.hero.h1"),
    h2: t("industry.wood.hero.h2"),
    body1: t("industry.wood.hero.body1"),
    body2: t("industry.wood.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.wood.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.wood.narrative.challengeTitle"),
    challengeBody: t("industry.wood.narrative.challengeBody"),
    solutionTitle: t("industry.wood.narrative.solutionTitle"),
    solutionBody: t("industry.wood.narrative.solutionBody"),
    highlightToken: t("industry.wood.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    { label: t("industry.wood.specs.s1.label"), mainValue: "55–62", unit: "HRC", subtext: t("industry.wood.specs.s1.subtext") },
    { label: t("industry.wood.specs.s2.label"), mainValue: "T10 → TCT", subtext: t("industry.wood.specs.s2.subtext"), isTextual: true },
    { label: t("industry.wood.specs.s3.label"), mainValue: "±0.05", unit: "mm", subtext: t("industry.wood.specs.s3.subtext") },
    { label: t("industry.wood.specs.s4.label"), mainValue: "25°–42°", subtext: t("industry.wood.specs.s4.subtext"), isTextual: true },
  ];

  const MATERIALS: IndustryMaterial[] = [
    { name: t("industry.wood.materials.m1.name"), abrasion: t("industry.wood.materials.m1.abrasion"), grade: "T10 / 9CrSi (HRC 55–58)", image: "/images/materials/green-softwood.webp" },
    { name: t("industry.wood.materials.m2.name"), abrasion: t("industry.wood.materials.m2.abrasion"), grade: "D2 / Cr12MoV (HRC 58–62)", image: "/images/materials/dry-hardwood.webp" },
    { name: t("industry.wood.materials.m3.name"), abrasion: t("industry.wood.materials.m3.abrasion"), grade: "6CrW2Si / TCT Carbide", image: "/images/materials/demolition-wood.webp" },
  ];

  const PRODUCTS: IndustryProduct[] = getBlades(lang)
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

  return (
    <>
      <SEO
        title={t("industry.wood.seo.title")}
        description={t("industry.wood.seo.description")}
        canonicalUrl="/wood-industry"
        keywords={t("industry.wood.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.wood"), url: "/wood-industry" },
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
