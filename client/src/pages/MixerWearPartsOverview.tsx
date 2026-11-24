/**
 * MixerWearPartsOverview — Mixer Wear Parts business-line landing
 * Route: /mixer-wear-parts
 *
 * Tells the wear-parts story (Ni-Hard / high-chrome materials, the casting
 * capability shared with the blade business, OEM fit, ISO) then splits to the
 * two aggregation pages. Internal links stay inside the mixer cluster.
 */

import Link from "@/components/common/SiteLink";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import MixerCategoryCards from "@/components/product/MixerCategoryCards";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";

import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import {
  getMixerCategories,
  getFeaturedMixerParts,
  getMixerPartsByCategory,
  getMixerCompanyFaq,
  getMixerContent,
} from "@/data/locales";
import { mixerToBlade } from "@/lib/mixerToBlade";

export default function MixerWearPartsOverview() {
  const lang = useLang();
  const { t } = useTranslation();
  const mixerCategories = getMixerCategories(lang);
  const { story, trustItems, orderSteps, hubFaq } = getMixerContent(lang);
  const featured = getFeaturedMixerParts(lang, 4).map(mixerToBlade);
  const oemByCategory = mixerCategories.map(cat => ({
    cat,
    brands: Array.from(
      new Set(
        getMixerPartsByCategory(cat.category, lang).flatMap(
          p => p.compatibleMachines
        )
      )
    ),
  }));

  // Hub structured data — CollectionPage whose ItemList members are the 2
  // category hubs (not the leaf products), so schema tiers == URL tiers:
  // overview → category → product. Emitted via <SEO extraJsonLd>.
  const collectionLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("mixer.hub.title"),
    url: "https://sureay.com/mixer-wear-parts",
    description: t("mixer.hub.collectionDescription"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: mixerCategories.length,
      itemListElement: mixerCategories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sureay.com${cat.link}`,
        name: cat.name,
        image: `https://sureay.com/images/mixer-parts/hero/${cat.id}-scene.webp`,
      })),
    },
  });

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title={t("mixer.hub.title")}
        description={t("mixer.hub.seoDescription")}
        canonicalUrl="/mixer-wear-parts"
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.mixerWearParts"), url: "/mixer-wear-parts" },
        ]}
        extraJsonLd={[collectionLd]}
      />
      <Navbar />
      <main>

      {/* 1 · Hero */}
      <section className="relative mt-[74px] h-[420px] lg:h-[500px] overflow-hidden border-b border-slate-200">
        {/* Right image region — full height so the whole part shows, not cropped */}
        <div className="absolute inset-y-0 right-0 h-full w-full lg:w-[46%]">
          <img
            src="/images/mixer-parts/hero/mixer-wear-parts-hero.webp"
            srcSet="/images/mixer-parts/hero/mixer-wear-parts-hero-800w.webp 800w, /images/mixer-parts/hero/mixer-wear-parts-hero.webp 1600w"
            sizes="(max-width: 1024px) 100vw, 46vw"
            alt={t("mixer.hub.hero.imageAlt")}
            className="h-full w-full object-cover object-right"
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        {/* Navy panel — diagonal right edge via clip-path */}
        <div
          className="absolute inset-y-0 left-0 h-full w-full lg:w-[60%] bg-[#001f4d] flex flex-col justify-between pl-12 pr-24 sm:pl-20 sm:pr-32 lg:pl-28 lg:pr-40 py-8 lg:py-16"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
          }}
        >
          <div>
            {lang !== "en" && (
              <p className="text-[14px] font-semibold tracking-[0.28em] text-white/80 mb-6 ">
                {t("mixer.hub.hero.eyebrow")}
              </p>
            )}
            <h1 className="text-[36px] lg:text-[60px] font-black text-white tracking-tight leading-none mb-6">
              {t("mixer.hub.hero.titleLine1")}
              <br />
              {t("mixer.hub.hero.titleLine2")}
              <br />
              {t("mixer.hub.hero.titleLine3")}
            </h1>
            <div className="w-12 h-[3px] bg-white/30 mb-6" />
            <p className="text-description text-white/70 leading-relaxed max-w-lg">
              {t("mixer.hub.hero.lead")}
            </p>
          </div>
          <ul className="hidden lg:flex flex-wrap gap-x-6 gap-y-2">
            {trustItems.map(item => (
              <li
                key={item}
                className="font-mono text-[14px] text-white/60 tracking-widest"
              >
                ■ {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.mixerWearParts") },
        ]}
      />

      {/* Two Plant Types — primary navigation, directly under the hero */}
      <section
        aria-label={t("mixer.hub.plantTypes.eyebrow")}
        className="site-section border-b border-slate-200 bg-slate-50"
      >
        <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-16">
          {lang !== "en" && (
            <p className="font-mono text-[12px] text-muted-foreground tracking-[0.28em] mb-5 ">
              {t("mixer.hub.plantTypes.eyebrow")}
            </p>
          )}
          <h2 className="text-[28px] lg:text-[36px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-8">
            {t("mixer.hub.plantTypes.heading")}
          </h2>
          <MixerCategoryCards categories={mixerCategories} />
        </div>
      </section>

      {/* 2 · Story */}
      <section
        aria-label={t("mixer.hub.story.eyebrow")}
        className="site-section border-b border-slate-200 bg-white"
      >
        <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
          {lang !== "en" && (
            <p className="font-mono text-[12px] text-muted-foreground tracking-[0.28em] mb-5 ">
              {t("mixer.hub.story.eyebrow")}
            </p>
          )}
          <h2 className="text-[32px] lg:text-[42px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-12 max-w-3xl">
            {t("mixer.hub.story.heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {story.map(item => (
              <div key={item.tag} className="bg-white p-6 lg:p-8 flex flex-col">
                {lang !== "en" && (
                  <span className="font-mono text-[12px] text-[#003a8c] tracking-[0.28em]  mb-3">
                    {item.tag}
                  </span>
                )}
                <h3 className="font-black text-lg text-[#001f4d] tracking-tight leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-description text-slate-600 leading-[1.7]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Featured parts */}
      {featured.length > 0 && (
        <section
          aria-label={t("mixer.hub.featured.heading")}
          className="site-section border-b border-slate-200 bg-white"
        >
          <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
            {lang !== "en" && (
              <p className="font-mono text-[12px] text-muted-foreground tracking-[0.28em] mb-5 ">
                {t("mixer.hub.featured.eyebrow")}
              </p>
            )}
            <h2 className="text-[32px] lg:text-[42px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-12">
              {t("mixer.hub.featured.heading")}
            </h2>
            <ProductGrid blades={featured} layout="grid" />
          </div>
        </section>
      )}

      {/* 4 · How to order */}
      <section
        aria-label={t("mixer.order.eyebrow")}
        className="site-section border-b border-slate-200 bg-slate-50"
      >
        <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20">
          {lang !== "en" && (
            <p className="font-mono text-[12px] text-muted-foreground tracking-[0.28em] mb-3 ">
              {t("mixer.order.eyebrow")}
            </p>
          )}
          <h2 className="font-black text-[30px] lg:text-[36px] text-[#001f4d] tracking-tight mb-4">
            {t("mixer.order.heading")}
          </h2>
          <p className="text-description text-slate-600 leading-[1.7] max-w-3xl mb-4">
            {t("mixer.order.lead")}
          </p>
          <Link href="/news/mixer-wear-parts-oem-matching" asChild>
            <a className="group inline-flex items-center gap-2 pb-1.5 text-[16px] font-bold text-[#001f4d] mb-10 bg-no-repeat [background-image:linear-gradient(#001f4d,#001f4d),linear-gradient(#cbd5e1,#cbd5e1)] [background-position:left_bottom,left_bottom] [background-size:0%_2px,100%_2px] hover:[background-size:100%_2px,100%_2px] transition-[background-size] duration-300">
              {t("mixer.order.articleLink")}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {orderSteps.map(step => (
              <div key={step.tag} className="bg-white p-6 flex flex-col">
                <span className="font-mono text-[14px] text-[#003a8c] tracking-[0.28em] mb-3">
                  {step.tag}
                </span>
                <h3 className="font-black text-lg text-[#001f4d] tracking-tight leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-description text-slate-600 leading-[1.7]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · OEM compatibility — brand names grouped by plant type */}
      <section
        aria-label={t("mixer.oem.eyebrow")}
        className="site-section border-b border-slate-200 bg-white"
      >
        <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <aside className="lg:col-span-4">
            {lang !== "en" && (
              <p className="font-mono text-[12px] text-muted-foreground tracking-[0.28em] mb-5 ">
                {t("mixer.oem.eyebrow")}
              </p>
            )}
            <h2 className="text-[30px] lg:text-[36px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
              {lang === "en"
                ? "Compatible Mixer & Plant Brands"
                : t("mixer.oem.heading")}
            </h2>
            <p className="text-description text-muted-foreground leading-[1.7] max-w-sm">
              {lang === "en"
                ? "Sureay manufactures replacement wear parts for the listed mixing plants. Share the plant model and a drawing or worn sample to confirm fit; Sureay is independent of the listed manufacturers."
                : t("mixer.oem.plantNote")}
            </p>
          </aside>
          <div className="lg:col-span-8 flex flex-col justify-center gap-8">
            {oemByCategory.map(({ cat, brands }) => (
              <div key={cat.id}>
                <Link href={cat.link} asChild>
                  <a className="group inline-flex items-center gap-2 pb-1.5 text-[18px] font-bold text-[#001f4d] mb-3 bg-no-repeat [background-image:linear-gradient(#001f4d,#001f4d),linear-gradient(#cbd5e1,#cbd5e1)] [background-position:left_bottom,left_bottom] [background-size:0%_2px,100%_2px] hover:[background-size:100%_2px,100%_2px] transition-[background-size] duration-300">
                    {cat.name}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Link>
                <ul className="flex flex-wrap gap-2">
                  {brands.map(m => (
                    <li
                      key={m}
                      className="border border-slate-200 bg-slate-50 px-4 py-2"
                    >
                      <span className="font-bold text-[16px] text-[#001f4d] tracking-tight">
                        {m}
                        <sup className="text-[12px] font-normal text-muted-foreground ml-px">
                          ®
                        </sup>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · FAQ — hub-level (distinct from category and per-part FAQs) */}
      <section
        aria-label={t("mixer.faq.ariaLabel")}
        className="site-section bg-slate-50 border-b border-slate-200 py-14 lg:py-20"
      >
        <ProductFAQ
          faqs={{ technical: hubFaq, company: getMixerCompanyFaq(lang) }}
          productName={t("nav.mixerWearParts")}
        />
      </section>

      <div id="rfq">
        <ContactRFQ formLocation="mixer_parts" />
      </div>
      </main>
      <Footer />
    </div>
  );
}
