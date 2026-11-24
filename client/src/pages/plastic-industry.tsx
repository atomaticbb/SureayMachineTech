/*
 * plastic-industry.tsx — Plastics Recycling & Extrusion
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

export default function PlasticIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.plastic.hero.breadcrumb"),
    h1: t("industry.plastic.hero.h1"),
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
      grade: t("industry.grade.tungsten"),
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

  const industryBlades = getIndustryBlades(getBlades(lang), "recycling");

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
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/plastic-industry", lang),
        ]}
      />

      <div className="min-h-screen bg-white pt-[68px]">
        <Navbar />
        <main>
          <IndustryHero data={HERO_DATA} />
          <IndustryToolingMatrix blades={industryBlades} catalogCards />

          <IndustryBlueprintDashboard narrative={NARRATIVE} specs={SPECS} />
          <IndustryMaterialFocus materials={MATERIALS} />
          <ContactRFQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
