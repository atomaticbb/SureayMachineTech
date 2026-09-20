/**
 * MixerCategoryPage — Mixer Wear Parts category hub
 * Route: /mixer-wear-parts/:slug  (concrete-mixing-plant | asphalt-mixing-plant)
 *
 * Aggregation page for one plant type: scene hero + trust, the product grid, a
 * category-level overview, materials/grade guidance, the made-to-order process,
 * OEM compatibility, a full-set RFQ CTA and category-level FAQ. All links stay
 * inside the mixer cluster. FAQ is category-level (not the per-part FAQs) so the
 * FAQPage schema does not duplicate the product pages'.
 */

import { useRoute, Redirect, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";

import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import {
  getMixerCategoryBySlug,
  getMixerPartsByCategory,
  getMixerCompanyFaq,
  getMixerContent,
} from "@/data/locales";
import { mixerToBlade } from "@/lib/mixerToBlade";

export default function MixerCategoryPage() {
  const lang = useLang();
  const { t } = useTranslation();
  const [, params] = useRoute("/mixer-wear-parts/:slug");
  const meta = getMixerCategoryBySlug(params?.slug ?? "", lang);

  if (!meta) {
    return <Redirect to="/mixer-wear-parts" />;
  }

  const {
    categoryContent,
    trustItems,
    orderSteps,
    contentReviewer,
    contentLastReviewed,
  } = getMixerContent(lang);
  const parts = getMixerPartsByCategory(meta.category, lang);
  const blades = parts.map(mixerToBlade);
  const oemMachines = Array.from(
    new Set(parts.flatMap(p => p.compatibleMachines))
  );
  const content = categoryContent[meta.category];
  const sceneImage = `/images/mixer-parts/hero/${meta.id}-scene.webp`;

  const scrollToRfq = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title={meta.seoTitle}
        description={meta.description}
        canonicalUrl={meta.link}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.mixerWearParts"), url: "/mixer-wear-parts" },
          { name: meta.name, url: meta.link },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: meta.name,
            url: `https://sureay.com${meta.link}`,
            numberOfItems: parts.length,
            itemListElement: parts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://sureay.com${p.link}`,
              name: p.name,
              image: `https://sureay.com${p.image}`,
            })),
          }).replace(/</g, "\\u003c")}
        </script>
      </Helmet>
      <Navbar />

      {/* 1 · Hero — plant scene + navy gradient + trust strip */}
      <section className="relative mt-[74px] h-[300px] lg:h-[380px] overflow-hidden border-b border-slate-200 bg-[#001229]">
        <img
          src={sceneImage}
          alt={t("mixer.category.heroImageAlt").replace("{{name}}", meta.name)}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          width={1300}
          height={795}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={e => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#001229] via-[#001229]/80 to-[#001229]/30"
          aria-hidden="true"
        />
        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/50 mb-4 uppercase">
              {t("nav.mixerWearParts")}
            </p>
            <h1 className="text-[clamp(1.9rem,4.4vw,3rem)] font-black text-white tracking-tight leading-[1.05] mb-4">
              {meta.name}
            </h1>
            <p className="text-white/75 text-[14px] lg:text-[16px] leading-relaxed max-w-xl">
              {content.heroTagline}
            </p>
            <ul className="hidden lg:flex flex-wrap gap-x-6 gap-y-2 mt-7">
              {trustItems.map(item => (
                <li
                  key={item}
                  className="font-mono text-[11px] text-white/60 tracking-widest"
                >
                  ■ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.mixerWearParts"), href: "/mixer-wear-parts" },
          { label: meta.name },
        ]}
      />

      {/* 2 · Products */}
      <section
        aria-label={t("mixer.category.productsAria")}
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-16">
          <div className="border-b border-slate-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-[26px] lg:text-[32px] font-black text-[#001f4d] tracking-tight">
              {t("mixer.category.allHeading").replace(
                "{{name}}",
                meta.name.toLowerCase()
              )}
            </h2>
            <p className="text-[12px] text-slate-400 font-medium">
              {t("mixer.category.countLine").replace(
                "{{count}}",
                String(parts.length)
              )}
            </p>
          </div>
          <ProductGrid blades={blades} layout="grid" />
        </div>
      </section>

      {/* 3 · Overview — unique category prose */}
      <section
        aria-label={t("mixer.category.overview.eyebrow")}
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <aside className="lg:col-span-4">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
              {t("mixer.category.overview.eyebrow")}
            </p>
            <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.1]">
              {content.overviewLead}
            </h2>
            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {t("mixer.category.reviewedBy")}{" "}
                <span className="font-bold text-[#001f4d]">
                  {contentReviewer.name}
                </span>
                , {contentReviewer.title}
              </p>
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.18em] mt-1.5 uppercase">
                {t("mixer.category.lastReviewed")} · {contentLastReviewed}
              </p>
              <Link href="/about#certifications" asChild>
                <a className="group inline-flex items-center gap-2 pb-1 mt-4 text-[13px] font-bold text-[#001f4d] bg-no-repeat [background-image:linear-gradient(#001f4d,#001f4d),linear-gradient(#cbd5e1,#cbd5e1)] [background-position:left_bottom,left_bottom] [background-size:0%_2px,100%_2px] hover:[background-size:100%_2px,100%_2px] transition-[background-size] duration-300">
                  {t("mixer.category.isoLink")}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Link>
            </div>
          </aside>
          <div className="lg:col-span-8 space-y-5">
            {content.overviewBody.map((para, i) => (
              <p
                key={i}
                className="text-[16px] text-slate-700 leading-[1.75] max-w-[70ch]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Materials & grade selection */}
      <section
        aria-label={t("mixer.category.materials.eyebrow")}
        className="border-b border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <aside className="lg:col-span-4">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
              {t("mixer.category.materials.eyebrow")}
            </p>
            <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
              {t("mixer.category.materials.heading")}
            </h2>
            <p className="text-[14px] text-slate-500 leading-[1.7] max-w-sm">
              {content.gradeNote}
            </p>
          </aside>
          <div className="lg:col-span-8">
            <div className="border border-slate-300 border-t-2 border-t-[#001f4d] divide-y divide-slate-200">
              {content.materialRows.map(row => (
                <div
                  key={row.part}
                  className="grid grid-cols-1 sm:grid-cols-[minmax(0,12rem)_1fr] gap-x-6 gap-y-1 px-5 py-3.5"
                >
                  <span className="font-black text-[14px] text-[#001f4d] tracking-tight">
                    {row.part}
                  </span>
                  <span className="text-[14px] text-slate-600 leading-snug">
                    {row.material}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 · How to order */}
      <section
        aria-label={t("mixer.order.eyebrow")}
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20">
          <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-3 uppercase">
            {t("mixer.order.eyebrow")}
          </p>
          <h2 className="font-black text-[28px] lg:text-[34px] text-[#001f4d] tracking-tight mb-4">
            {t("mixer.order.heading")}
          </h2>
          <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-4">
            {t("mixer.order.lead")}
          </p>
          <Link href="/news/mixer-wear-parts-oem-matching" asChild>
            <a className="group inline-flex items-center gap-2 pb-1.5 text-[14px] font-bold text-[#001f4d] mb-10 bg-no-repeat [background-image:linear-gradient(#001f4d,#001f4d),linear-gradient(#cbd5e1,#cbd5e1)] [background-position:left_bottom,left_bottom] [background-size:0%_2px,100%_2px] hover:[background-size:100%_2px,100%_2px] transition-[background-size] duration-300">
              {t("mixer.order.articleLink")}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {orderSteps.map(step => (
              <div key={step.tag} className="bg-white p-6 flex flex-col">
                <span className="font-mono text-[11px] text-[#003a8c] tracking-[0.28em] mb-3">
                  {step.tag}
                </span>
                <h3 className="font-black text-lg text-[#001f4d] tracking-tight leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-[1.7]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b · Case study — real matched-part case (only where material exists) */}
      {content.caseStudy && (
        <section
          aria-label={t("mixer.category.caseStudy.eyebrow")}
          className="border-b border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-3 uppercase">
              {t("mixer.category.caseStudy.eyebrow")}
            </p>
            <h2 className="font-black text-[28px] lg:text-[34px] text-[#001f4d] tracking-tight mb-8 max-w-3xl">
              {content.caseStudy.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
              <div className="lg:col-span-5 space-y-5">
                {content.caseStudy.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] text-slate-700 leading-[1.75]"
                  >
                    {para}
                  </p>
                ))}
                <Link href={content.caseStudy.articleLink} asChild>
                  <a className="group inline-flex items-center gap-2 pb-1.5 text-[14px] font-bold text-[#001f4d] bg-no-repeat [background-image:linear-gradient(#001f4d,#001f4d),linear-gradient(#cbd5e1,#cbd5e1)] [background-position:left_bottom,left_bottom] [background-size:0%_2px,100%_2px] hover:[background-size:100%_2px,100%_2px] transition-[background-size] duration-300">
                    {t("mixer.category.caseStudy.link")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Link>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 content-start">
                {content.caseStudy.images.map(img => (
                  <figure key={img.src}>
                    <div className="aspect-[4/3] overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="font-mono text-[10px] text-slate-500 leading-relaxed mt-2">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6 · OEM compatibility */}
      {oemMachines.length > 0 && (
        <section
          aria-label={t("mixer.oem.eyebrow")}
          className="border-b border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
            <aside className="lg:col-span-4">
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
                {t("mixer.oem.eyebrow")}
              </p>
              <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
                {t("mixer.oem.heading")}
              </h2>
              <p className="text-[14px] text-slate-500 leading-[1.7] max-w-sm">
                {t("mixer.oem.plantNote")}
              </p>
            </aside>
            <div className="lg:col-span-8 flex flex-col justify-center">
              <ul className="flex flex-wrap gap-2">
                {oemMachines.map(m => (
                  <li
                    key={m}
                    className="border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <span className="font-bold text-[13px] text-[#001f4d] tracking-tight">
                      {m}
                      <sup className="text-[8px] font-normal text-slate-400 ml-px">
                        ®
                      </sup>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 7 · Full-set RFQ CTA */}
      <section
        aria-label={t("mixer.category.cta.eyebrow")}
        className="bg-[#001f4d]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] text-white/40 tracking-[0.28em] mb-2 uppercase">
              {t("mixer.category.cta.eyebrow")}
            </p>
            <p className="text-white text-lg lg:text-xl font-black tracking-tight max-w-2xl">
              {t("mixer.category.cta.lead")}
            </p>
          </div>
          <a
            href="#rfq"
            onClick={scrollToRfq}
            className="shrink-0 inline-flex items-center gap-3 bg-white text-[#001f4d] hover:bg-slate-100 font-black text-sm tracking-widest px-6 py-4 rounded-none transition-colors duration-200"
          >
            {t("mixer.category.cta.button")}
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </section>

      {/* 8 · FAQ — category-level (distinct from per-part FAQs) */}
      {content.faq.length > 0 && (
        <section
          aria-label={t("mixer.faq.ariaLabel")}
          className="bg-slate-50 border-b border-slate-200 py-14 lg:py-20"
        >
          <ProductFAQ
            faqs={{ technical: content.faq, company: getMixerCompanyFaq(lang) }}
            productName={meta.name}
          />
        </section>
      )}

      {/* 9 · RFQ form */}
      <div id="rfq">
        <ContactRFQ productName={meta.name} formLocation="mixer_parts" />
      </div>
      <Footer />
    </div>
  );
}
