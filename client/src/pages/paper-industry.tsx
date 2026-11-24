/*
 * paper-industry.tsx — Paper & Tissue Converting
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture follows Home.tsx: page orchestrates imported section components.
 */

import SEO from "@/components/common/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryToolingMatrix from "@/components/industry/IndustryToolingMatrix";
import { industryProductList } from "@/components/industry/industryProductList";
import IndustryBlueprintDashboard from "@/components/industry/IndustryBlueprintDashboard";
import IndustryMaterialFocus from "@/components/industry/IndustryMaterialFocus";
import { useLang } from "@/contexts/LangContext";
import { getBlades } from "@/data/locales";
import { getIndustryBlades } from "@/data/industry-blades";
import { useTranslation } from "@/lib/useTranslation";
import type {
  IndustryHeroData,
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

export default function PaperIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.paper.hero.breadcrumb"),
    h1: t("industry.paper.hero.h1"),
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
    {
      label: t("industry.paper.specs.s1.label"),
      mainValue: t("industry.grade.precision"),
      subtext: t("industry.paper.specs.s1.subtext"),
      isTextual: true,
    },
    {
      label: t("industry.paper.specs.s2.label"),
      mainValue: "D2 /\\nCr12MoV",
      subtext: t("industry.paper.specs.s2.subtext"),
      isTextual: true,
    },
    {
      label: t("industry.paper.specs.s4.label"),
      mainValue: "Ra ≤ 0.2",
      unit: "μm",
      subtext: t("industry.paper.specs.s4.subtext"),
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.paper.materials.m1.name"),
      abrasion: t("industry.paper.materials.m1.abrasion"),
      grade: t("industry.grade.triple"),
      image: "/images/materials/virgin-tissue.webp",
    },
    {
      name: t("industry.paper.materials.m2.name"),
      abrasion: t("industry.paper.materials.m2.abrasion"),
      grade: "D2 / M2 HSS",
      image: "/images/materials/recycled-fibre.webp",
    },
    {
      name: t("industry.paper.materials.m3.name"),
      abrasion: t("industry.paper.materials.m3.abrasion"),
      grade: t("industry.grade.bimetal"),
      image: "/images/materials/kraft-board.webp",
    },
  ];

  const industryBlades = getIndustryBlades(getBlades(lang), "paper");

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
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/paper-industry", lang),
        ]}
      />

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <main>
          <IndustryHero data={HERO_DATA} />
          <IndustryToolingMatrix blades={industryBlades} />

          <IndustryBlueprintDashboard narrative={NARRATIVE} specs={SPECS} />
          <IndustryMaterialFocus materials={MATERIALS} />
          <ContactRFQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
