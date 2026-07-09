import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
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
const IndustryOemPipeline = lazyWithRetry(
  () => import("@/components/industry/IndustryOemPipeline"),
  "home-oem-pipeline"
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

const ITEM_LIST_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industrial Blades & Recycling Solutions",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Plastic Recycling Blades",
      url: "https://sureay.com/products/twin-shaft-blades-recycling",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Rotary Slitter Knives for Film & Flexible Packaging Converting",
      url: "https://sureay.com/products/rotary-slitter-knives",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Metal Foil & Strip Slitter Knives",
      url: "https://sureay.com/products/metal-foil-strip-slitter-knives",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Paper & Tissue Blades",
      url: "https://sureay.com/products/tissue-log-saw-blades",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Granulator Blades",
      url: "https://sureay.com/products/granulator-blades",
    },
  ],
});

export default function Home() {
  return (
    <>
      <SEO
        title="Industrial Blades for Recycling, Metal & Converting"
        description="Sureay manufactures industrial blades, shredder knives, slitter tooling & custom OEM machine knives for plastic recycling, metal & paper converting."
        canonicalUrl="/"
        keywords="industrial blades manufacturer, custom machine knives, shredder blades, granulator knives, slitter blades, shear blades, OEM custom blades"
        preloadImage="/images/hero/homehero.webp"
      />
      {/* Rendered outside <Helmet> to avoid React 19 script-hoisting interference */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: WEBSITE_LD }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ITEM_LIST_LD }}
      />

      <div className="min-h-screen bg-slate-50 pt-[68px]">
        <Navbar />
        <HomeHero />
        <AuthorityCarousel />
        <TabEcosystem />
        <Suspense fallback={null}>
          <MixerWearPartsTeaser />
          <ManufacturingBlocks />
          <IndustryOemPipeline />
          <HomeTestimonials />
          <TechnicalFAQ />
          <NewsGrid />
          {/* Prerender-readiness marker — see scripts/prerender.ts */}
          <div data-lazy-ready="home" hidden />
        </Suspense>
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
