import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import { getBladeById, getSEO } from "@/data/locales";
import { FEATURED_PRODUCTS } from "@/data/homeData";
import { localizedPath } from "@/lib/i18n";
import { useTranslation } from "@/lib/useTranslation";
import { SEO_CONFIG as EN_SEO } from "@/utils/seo-config";
import HomeHero from "@/components/home/HomeHero";
import AuthorityCarousel from "@/components/home/AuthorityCarousel";
import TabEcosystem from "@/components/home/TabEcosystem";
import ContactRFQ from "@/components/home/ContactRFQ";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// Below-the-fold sections — lazy-loaded to cut the homepage's eager
// modulepreload chunks. scripts/prerender.ts waits for the
// data-lazy-ready="home" marker (rendered only once this Suspense
// boundary has resolved) before capturing the homepage snapshot, so the
// prerendered HTML still contains this content.
const MixerWearPartsTeaser = lazyWithRetry(
  () => import("@/components/home/MixerWearPartsTeaser"),
  "home-mixer-teaser"
);
const ManufacturingBlocks = lazyWithRetry(
  () => import("@/components/home/ManufacturingBlocks"),
  "home-manufacturing-blocks"
);
const HomeTestimonials = lazyWithRetry(
  () => import("@/components/home/HomeTestimonials"),
  "home-testimonials"
);
const TechnicalFAQ = lazyWithRetry(
  () => import("@/components/home/TechnicalFAQ"),
  "home-technical-faq"
);
const NewsGrid = lazyWithRetry(
  () => import("@/components/home/NewsGrid"),
  "home-news-grid"
);

const WEBSITE_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://sureay.com",
  name: "Sureay Machinery Technology",
});

export default function Home() {
  const { lang, t } = useTranslation();
  const featuredList = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("nav.industrialBlades"),
    itemListElement: FEATURED_PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getBladeById(product.href.replace("/products/", ""), lang)?.name ?? product.name,
      url: "https://sureay.com" + localizedPath(product.href, lang),
    })),
  }).replace(/</g, "\\u003c");
  // Was hardcoded English, so every /{lang}/ homepage shipped the English
  // title and description — eight URLs sharing one snippet.
  // getSEO already falls back to English when a key is missing; the second
  // fallback is only here because every PageSEO field is optional.
  const pageSeo = getSEO("home", lang);
  const enHome = EN_SEO.home;

  return (
    <>
      <SEO
        title={pageSeo.title || enHome.title || ""}
        description={pageSeo.description || enHome.description || ""}
        canonicalUrl="/"
        keywords={pageSeo.keywords || enHome.keywords}
        preloadImage={lang === "en" ? undefined : "/images/hero/homehero.webp"}
      />
      {/* Rendered outside <Helmet> to avoid React 19 script-hoisting interference */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: WEBSITE_LD }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: featuredList }}
      />

      <div className={`min-h-screen ${lang === "en" ? "english-home bg-white pt-[74px]" : "bg-slate-50 pt-[68px]"}`}>
        <Navbar />
        <main>
          <HomeHero />
          <AuthorityCarousel />
          <TabEcosystem />
          <Suspense fallback={null}>
            <MixerWearPartsTeaser />
            <ManufacturingBlocks />
            <HomeTestimonials />
            <TechnicalFAQ />
            <NewsGrid />
            {/* Prerender-readiness marker — see scripts/prerender.ts */}
            <div data-lazy-ready="home" hidden />
          </Suspense>
          <ContactRFQ hideIntro={lang === "en"} />
        </main>
        <Footer />
      </div>
    </>
  );
}
