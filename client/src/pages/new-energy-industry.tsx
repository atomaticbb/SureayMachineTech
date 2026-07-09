/*
 * new-energy-industry.tsx — New Energy & Battery Manufacturing
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
  "/images/applications/energy-industry/knives-using-in-energy-industry.webp",
  "/images/applications/energy-industry/slitting-blades.webp",
  "/images/applications/energy-industry/slitting-blades-11.webp",
  "/images/applications/energy-industry/slitting-blades-12.webp",
  "/images/applications/energy-industry/slitting-blades-13.webp",
  "/images/applications/energy-industry/slitting-blades-14.webp",
  "/images/applications/energy-industry/rotary-slitter-knives-detail.webp",
  "/images/applications/energy-industry/knives-using-in-energy-industry-02.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

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
        image: "https://sureay.com/images/products/rotary-slitter-knives/rotary-slitter-knives-10.webp",
        description: "Tungsten carbide circular slitting knives for Al cathode and Cu anode electrode foil — Ra ≤ 0.05μm mirror finish, ±0.001mm tolerance, IATF 16949 certified.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/lithium-battery-slitting-knives",
        offers: getBladeAggregateOffer("lithium-battery-slitting-knives"),
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Battery Recycling Blades",
        image: "https://sureay.com/images/products/shredder-blades/shredder-blades.webp",
        description: "Twin-shaft shredder blades for lithium battery cell and module recycling. Impact-resistant alloys for safe, controlled battery waste size reduction.",
        brand: { "@type": "Brand", name: "Sureay" },
        url: "https://sureay.com/products/twin-shaft-blades-battery",
        offers: getBladeAggregateOffer("twin-shaft-blades-battery"),
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
export default function NewEnergyIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.newEnergy.hero.breadcrumb"),
    h1: t("industry.newEnergy.hero.h1"),
    h2: t("industry.newEnergy.hero.h2"),
    body1: t("industry.newEnergy.hero.body1"),
    body2: t("industry.newEnergy.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.newEnergy.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.newEnergy.narrative.challengeTitle"),
    challengeBody: t("industry.newEnergy.narrative.challengeBody"),
    solutionTitle: t("industry.newEnergy.narrative.solutionTitle"),
    solutionBody: t("industry.newEnergy.narrative.solutionBody"),
    highlightToken: t("industry.newEnergy.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    { label: t("industry.newEnergy.specs.s1.label"), mainValue: "Ra ≤ 0.05", unit: "μm", subtext: t("industry.newEnergy.specs.s1.subtext") },
    { label: t("industry.newEnergy.specs.s2.label"), mainValue: "±0.001", unit: "mm", subtext: t("industry.newEnergy.specs.s2.subtext") },
    { label: t("industry.newEnergy.specs.s3.label"), mainValue: "≤ 0.01", unit: "mm", subtext: t("industry.newEnergy.specs.s3.subtext") },
    { label: t("industry.newEnergy.specs.s4.label"), mainValue: "WC-Co\\nSubmicron", subtext: t("industry.newEnergy.specs.s4.subtext"), isTextual: true },
  ];

  const MATERIALS: IndustryMaterial[] = [
    { name: t("industry.newEnergy.materials.m1.name"), abrasion: t("industry.newEnergy.materials.m1.abrasion"), grade: "WC-Co K10 Submicron", image: "/images/materials/al-cathode-foil.webp" },
    { name: t("industry.newEnergy.materials.m2.name"), abrasion: t("industry.newEnergy.materials.m2.abrasion"), grade: "WC-Co K05 Submicron", image: "/images/materials/cu-anode-foil.webp" },
    { name: t("industry.newEnergy.materials.m3.name"), abrasion: t("industry.newEnergy.materials.m3.abrasion"), grade: "Cermet / PCD", image: "/images/materials/PVDF-separator-film.webp" },
  ];

  const PRODUCTS: IndustryProduct[] = getBlades(lang)
    .filter(blade => blade.sector === "new_energy")
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
        title={t("industry.newEnergy.seo.title")}
        description={t("industry.newEnergy.seo.description")}
        canonicalUrl="/new-energy-industry"
        keywords={t("industry.newEnergy.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.newEnergy"), url: "/new-energy-industry" },
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
            { slug: "slitter-knives", name: "Slitter Knives" },
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
