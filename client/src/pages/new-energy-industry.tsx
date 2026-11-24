/*
 * new-energy-industry.tsx — New Energy & Battery Manufacturing
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

export default function NewEnergyIndustry() {
  const lang = useLang();
  const { t } = useTranslation();

  const HERO_DATA: IndustryHeroData = {
    breadcrumb: t("industry.newEnergy.hero.breadcrumb"),
    h1: t("industry.newEnergy.hero.h1"),
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
    {
      label: t("industry.newEnergy.specs.s1.label"),
      mainValue: "Ra ≤ 0.05",
      unit: "μm",
      subtext: t("industry.newEnergy.specs.s1.subtext"),
    },
    {
      label: t("industry.newEnergy.specs.s2.label"),
      mainValue: "±0.001",
      unit: "mm",
      subtext: t("industry.newEnergy.specs.s2.subtext"),
    },
    {
      label: t("industry.newEnergy.specs.s3.label"),
      mainValue: "≤ 0.01",
      unit: "mm",
      subtext: t("industry.newEnergy.specs.s3.subtext"),
    },
    {
      label: t("industry.newEnergy.specs.s4.label"),
      mainValue: t("industry.grade.submicron"),
      subtext: t("industry.newEnergy.specs.s4.subtext"),
      isTextual: true,
    },
  ];

  const MATERIALS: IndustryMaterial[] = [
    {
      name: t("industry.newEnergy.materials.m1.name"),
      abrasion: t("industry.newEnergy.materials.m1.abrasion"),
      grade: t("industry.grade.submicroK10"),
      image: "/images/materials/al-cathode-foil.webp",
    },
    {
      name: t("industry.newEnergy.materials.m2.name"),
      abrasion: t("industry.newEnergy.materials.m2.abrasion"),
      grade: t("industry.grade.submicroK05"),
      image: "/images/materials/cu-anode-foil.webp",
    },
    {
      name: t("industry.newEnergy.materials.m3.name"),
      abrasion: t("industry.newEnergy.materials.m3.abrasion"),
      grade: t("industry.grade.cermet"),
      image: "/images/materials/PVDF-separator-film.webp",
    },
  ];

  const industryBlades = getIndustryBlades(getBlades(lang), "new_energy");

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
        preloadImage={LCP_PRELOAD}
        extraJsonLd={[
          industryProductList(industryBlades, HERO_DATA.h1, "/new-energy-industry", lang),
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
