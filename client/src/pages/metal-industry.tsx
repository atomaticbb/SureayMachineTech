/*
 * metal-industry.tsx — Metal Processing & Coil Slitting
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

export default function MetalIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.metal.hero.breadcrumb"),
    h1: t("industry.metal.hero.h1"),
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
    {
      label: t("industry.metal.specs.s1.label"),
      mainValue: "±0.005",
      unit: "mm",
      subtext: t("industry.metal.specs.s1.subtext"),
    },
    {
      label: t("industry.metal.specs.s2.label"),
      mainValue: t("industry.grade.tc"),
      subtext: t("industry.metal.specs.s2.subtext"),
      isTextual: true,
    },
    {
      label: t("industry.metal.specs.s3.label"),
      mainValue: "62–66",
      unit: "HRC",
      subtext: t("industry.metal.specs.s3.subtext"),
    },
    {
      label: t("industry.metal.specs.s4.label"),
      mainValue: "Ra ≤ 0.4",
      unit: "μm",
      subtext: t("industry.metal.specs.s4.subtext"),
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.metal.materials.m1.name"),
      abrasion: t("industry.metal.materials.m1.abrasion"),
      grade: "SKH-51",
      image: "/images/materials/cold-rolled-steel.webp",
    },
    {
      name: t("industry.metal.materials.m2.name"),
      abrasion: t("industry.metal.materials.m2.abrasion"),
      grade: t("industry.grade.tungsten"),
      image: "/images/materials/stainless-strip.webp",
    },
    {
      name: t("industry.metal.materials.m3.name"),
      abrasion: t("industry.metal.materials.m3.abrasion"),
      grade: t("industry.grade.d2"),
      image: "/images/materials/aluminum-sheet.webp",
    },
  ];

  const industryBlades = getIndustryBlades(getBlades(lang), "metal");

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
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/metal-industry", lang),
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
