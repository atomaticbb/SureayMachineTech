/*
 * converting-industry.tsx — Flexible Converting & Packaging
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Architecture mirrors plastic-industry.tsx
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

export default function ConvertingIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.converting.hero.breadcrumb"),
    h1: t("industry.converting.hero.h1"),
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
    {
      label: t("industry.converting.specs.s1.label"),
      mainValue: "±0.002",
      unit: "mm",
      subtext: t("industry.converting.specs.s1.subtext"),
    },
    {
      label: t("industry.converting.specs.s2.label"),
      mainValue: "≤ 0.02",
      unit: "mm",
      subtext: t("industry.converting.specs.s2.subtext"),
    },
    {
      label: t("industry.converting.specs.s3.label"),
      mainValue: "Ra ≤ 0.4",
      unit: "μm",
      subtext: t("industry.converting.specs.s3.subtext"),
    },
    {
      label: t("industry.converting.specs.s4.label"),
      mainValue: "600",
      unit: "m/min",
      subtext: t("industry.converting.specs.s4.subtext"),
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.converting.materials.m1.name"),
      abrasion: t("industry.converting.materials.m1.abrasion"),
      grade: "M2 HSS / ASP23 PM",
      image: "/images/materials/BOPP-BOPET.webp",
    },
    {
      name: t("industry.converting.materials.m2.name"),
      abrasion: t("industry.converting.materials.m2.abrasion"),
      grade: t("industry.grade.tin"),
      image: "/images/materials/label-stock.webp",
    },
    {
      name: t("industry.converting.materials.m3.name"),
      abrasion: t("industry.converting.materials.m3.abrasion"),
      grade: t("industry.grade.esd"),
      image: "/images/materials/medical-nonwoven.webp",
    },
  ];

  const industryBlades = getIndustryBlades(getBlades(lang), "converting");

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
          {
            name: t("footer.industry.converting"),
            url: "/converting-industry",
          },
        ]}
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/converting-industry", lang),
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
