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
  "/images/applications/tissue-industry/tissue-and-paper.webp",
  "/images/applications/tissue-industry/tissue-log-saw-blades-02.webp",
  "/images/applications/tissue-industry/paper-cutting-blades-02.webp",
  "/images/applications/tissue-industry/granulator-blades-05.webp",
  "/images/applications/tissue-industry/rotary-slitter-knives-00.webp",
  "/images/applications/tissue-industry/granulator-blades-04.webp",
  "/images/applications/tissue-industry/blades.webp",
  "/images/applications/tissue-industry/virgin-tissue.webp",
];

const LCP_IMG = GALLERY_IMAGES[0];
const LCP_PRELOAD = LCP_IMG.replace(/(\.\w+)$/, "-640w.webp");

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
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.paper.hero.breadcrumb"),
    h1: t("industry.paper.hero.h1"),
    h2: t("industry.paper.hero.h2"),
    body1: t("industry.paper.hero.body1"),
    body2: t("industry.paper.hero.body2"),
    ctaHref: "#tooling-matrix",
    gallery: GALLERY_IMAGES.map((src, i) => ({
      src,
      alt: t(`industry.paper.hero.gallery${i}Alt`),
    })),
  };

  const NARRATIVE: IndustryNarrative = {
    challengeTitle: t("industry.paper.narrative.challengeTitle"),
    challengeBody: t("industry.paper.narrative.challengeBody"),
    solutionTitle: t("industry.paper.narrative.solutionTitle"),
    solutionBody: t("industry.paper.narrative.solutionBody"),
    highlightToken: t("industry.paper.narrative.highlightToken"),
  };

  const SPECS: IndustrySpec[] = [
    { label: t("industry.paper.specs.s1.label"), mainValue: "Triple\\nGround", subtext: t("industry.paper.specs.s1.subtext"), isTextual: true },
    { label: t("industry.paper.specs.s2.label"), mainValue: "M2\\nHSS", subtext: t("industry.paper.specs.s2.subtext"), isTextual: true },
    { label: t("industry.paper.specs.s3.label"), mainValue: "54–120", unit: "TPI", subtext: t("industry.paper.specs.s3.subtext") },
    { label: t("industry.paper.specs.s4.label"), mainValue: "Ra ≤ 0.6", unit: "μm", subtext: t("industry.paper.specs.s4.subtext") },
  ];

  const MATERIALS: IndustryMaterial[] = [
    { name: t("industry.paper.materials.m1.name"), abrasion: t("industry.paper.materials.m1.abrasion"), grade: "M2 HSS Triple-Ground", image: "/images/materials/virgin-tissue.webp" },
    { name: t("industry.paper.materials.m2.name"), abrasion: t("industry.paper.materials.m2.abrasion"), grade: "D2 / M2 HSS", image: "/images/materials/recycled-fibre.webp" },
    { name: t("industry.paper.materials.m3.name"), abrasion: t("industry.paper.materials.m3.abrasion"), grade: "Bimetal / TC-Tipped", image: "/images/materials/kraft-board.webp" },
  ];

  const allBlades = getBlades(lang);
  const PRODUCTS: IndustryProduct[] = [
    ...allBlades.filter(blade => blade.sector === "paper"),
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
        title={t("industry.paper.seo.title")}
        description={t("industry.paper.seo.description")}
        canonicalUrl="/paper-industry"
        keywords={t("industry.paper.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("footer.industries"), url: "/products" },
          { name: t("footer.industry.paper"), url: "/paper-industry" },
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
            { slug: "shear-blades", name: "Shear Blades" },
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
