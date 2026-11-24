/*
 * wood-industry.tsx — Wood & Forestry Industry
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

export default function WoodIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.wood.hero.breadcrumb"),
    h1: t("industry.wood.hero.h1"),
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
    {
      label: t("industry.wood.specs.s1.label"),
      mainValue: "55–62",
      unit: "HRC",
      subtext: t("industry.wood.specs.s1.subtext"),
    },
    {
      label: t("industry.wood.specs.s2.label"),
      mainValue: "T10 → TCT",
      subtext: t("industry.wood.specs.s2.subtext"),
      isTextual: true,
    },
    {
      label: t("industry.wood.specs.s3.label"),
      mainValue: "±0.05",
      unit: "mm",
      subtext: t("industry.wood.specs.s3.subtext"),
    },
    {
      label: t("industry.wood.specs.s4.label"),
      mainValue: "25°–42°",
      subtext: t("industry.wood.specs.s4.subtext"),
      isTextual: true,
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.wood.materials.m1.name"),
      abrasion: t("industry.wood.materials.m1.abrasion"),
      grade: "T10 / 9CrSi (HRC 55–58)",
      image: "/images/materials/green-softwood.webp",
    },
    {
      name: t("industry.wood.materials.m2.name"),
      abrasion: t("industry.wood.materials.m2.abrasion"),
      grade: "D2 / Cr12MoV (HRC 58–62)",
      image: "/images/materials/dry-hardwood.webp",
    },
    {
      name: t("industry.wood.materials.m3.name"),
      abrasion: t("industry.wood.materials.m3.abrasion"),
      grade: t("industry.grade.tct"),
      image: "/images/materials/demolition-wood.webp",
    },
  ];

  const industryBlades = getIndustryBlades(getBlades(lang), "wood");

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
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/wood-industry", lang),
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
