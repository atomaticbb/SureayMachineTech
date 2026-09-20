/**
 * MixerProductDetail — Mixer Wear Part detail page
 * Route: /mixer-wear-parts/:slug/:id  (slug = category, id = product)
 *
 * Reuses the generic, data-driven blade detail components (DecisiveSpecs,
 * TechnicalAudit, InlineRFQPrompt, ProductFAQ, ProductGrid) via the
 * mixerToBlade adapter. The hero, trust strip and OEM section are inlined here
 * because the blade versions carry blade-specific copy / links (blade catalog
 * download, hardcoded /products link) that must not appear in the mixer cluster.
 */

import { useEffect, useState } from "react";
import { useRoute, Redirect, Link } from "wouter";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactRFQ from "@/components/home/ContactRFQ";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";

import DecisiveSpecs from "@/components/product-detail/DecisiveSpecs";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import InlineRFQPrompt from "@/components/product-detail/InlineRFQPrompt";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ProductGrid from "@/components/product/ProductGrid";

import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import { DEFAULT_LANG } from "@/lib/i18n";
import {
  getMixerPartById,
  getRelatedMixerParts,
  getMixerCategoryByType,
  getMixerCompanyFaq,
  getMixerContent,
} from "@/data/locales";
import { mixerToBlade } from "@/lib/mixerToBlade";
import { gradeGroupForSector } from "@/data/mixerContent";

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

// Trust bar — slots 1 & 4 are global (true for every mixer part); slots 2 & 3
// come from each product's trustProcess / trustProperty (see mixerParts.ts),
// falling back to the old globals so any part without them still renders.

export default function MixerProductDetail() {
  const lang = useLang();
  const { t } = useTranslation();
  const [, params] = useRoute("/mixer-wear-parts/:slug/:id");
  const [activeImg, setActiveImg] = useState(0);
  const slug = params?.slug ?? "";
  const part = getMixerPartById(params?.id ?? "", lang);

  // Reset the gallery to the hero shot when navigating between products
  // (the route stays mounted, so state would otherwise carry over).
  useEffect(() => setActiveImg(0), [params?.id]);

  // 404 — part not found
  if (!part) {
    return (
      <>
        <SEO
          title={t("mixer.product.notFound.title")}
          description={t("mixer.product.notFound.description")}
          noIndex
        />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">
              {t("mixer.product.notFound.message")}
            </p>
            <Link href="/mixer-wear-parts" asChild>
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-black tracking-widest rounded-none hover:bg-[#001f4d] transition-colors duration-200">
                {t("mixer.product.notFound.back")}
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const category = getMixerCategoryByType(part.category, lang);

  // The category slug in the URL must match the product's actual category;
  // otherwise send the crawler/user to the one canonical 3-segment path.
  if (category && slug !== category.id) {
    return <Redirect to={part.link} />;
  }

  const { gradeGuide, orderSteps, trustItems } = getMixerContent(lang);
  const bladeLike = mixerToBlade(part);
  const related = getRelatedMixerParts(part.id, lang, 4).map(mixerToBlade);
  const galleryImages =
    part.gallery && part.gallery.length > 0 ? part.gallery : [part.image];
  const activeSrc =
    galleryImages[Math.min(activeImg, galleryImages.length - 1)];

  // Spec labels are translated per locale, so "Material" / "Application" are
  // matched against the English array and read back by index — the locale
  // files are generated from it, so the two always line up.
  const enSpecLabels = (
    getMixerPartById(part.id, DEFAULT_LANG) ?? part
  ).specs.map(s => s.label);
  const isSpec = (i: number, re: RegExp) => re.test(enSpecLabels[i] ?? "");
  const material = part.specs.find((_, i) => isSpec(i, /^material$/i))?.value;
  const heroSpecs = part.specs.filter(
    (_, i) => isSpec(i, /^material$/i) || isSpec(i, /^application$/i)
  );

  const productTrustItems = [
    trustItems[0],
    part.trustProcess ?? trustItems[1],
    part.trustProperty ?? trustItems[2],
    trustItems[3],
  ];

  const guide = gradeGuide[gradeGroupForSector(part.sector)];

  // SEO title keeps the high-intent OEM names; brand suffix added by <SEO>.
  const oemTop = part.compatibleMachines.slice(0, 2).join(" & ");
  const seoTitle =
    part.seoTitle ??
    t("mixer.product.seoTitle")
      .replace("{{name}}", part.name)
      .replace("{{oem}}", oemTop);

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <SEO
        title={seoTitle}
        description={part.description}
        canonicalUrl={part.link}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.mixerWearParts"), url: "/mixer-wear-parts" },
          ...(category ? [{ name: category.name, url: category.link }] : []),
          { name: part.name, url: part.link },
        ]}
        productData={{
          name: part.fullName || part.name,
          image: part.image,
          images: part.gallery?.slice(0, 4),
          description: part.fullDescription || part.description,
          sku: part.id,
          mpn: part.id,
          brand: "Sureay",
          material,
          specs: part.specs,
          offers: part.offers,
        }}
      />

      <Navbar />

      <main className="flex-grow pt-[68px]">
        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.mixerWearParts"), href: "/mixer-wear-parts" },
            ...(category
              ? [{ label: category.name, href: category.link }]
              : []),
            { label: part.name },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
          <div className="flex flex-col gap-y-8">
            {/* Zone 1 — Hero */}
            <section
              aria-label={part.fullName || part.name}
              className="flex flex-col lg:flex-row overflow-hidden"
            >
              <div className="lg:w-[580px] lg:shrink-0 border-r border-slate-200">
                <div
                  className="h-[320px] lg:h-[520px] bg-slate-100 flex items-center justify-center overflow-hidden"
                  style={DOT_GRID_STYLE}
                >
                  <img
                    src={activeSrc}
                    alt={part.fullName || part.name}
                    className="h-full w-full object-contain p-3 mix-blend-multiply"
                    loading="eager"
                    decoding="async"
                    width={580}
                    height={520}
                    onError={e => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                </div>
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 p-3 border-t border-slate-200 bg-white">
                    {galleryImages.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        aria-label={t("mixer.product.thumbAria")
                          .replace("{{n}}", String(i + 1))
                          .replace("{{name}}", part.name)}
                        aria-current={i === activeImg}
                        className={`h-16 w-16 lg:h-20 lg:w-20 shrink-0 border overflow-hidden transition-colors ${
                          i === activeImg
                            ? "border-[#001f4d]"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                        style={DOT_GRID_STYLE}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-contain p-1 mix-blend-multiply"
                          loading="lazy"
                          decoding="async"
                          onError={e => {
                            e.currentTarget.src =
                              "/images/products/product.webp";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
                <div className="space-y-5">
                  <h1 className="font-black text-[26px] text-[#001f4d] leading-[1.15] tracking-tight">
                    {part.fullName || part.name}
                  </h1>
                  <p className="text-[16px] font-bold text-black tracking-widest border-l-2 border-[#001f4d] pl-3">
                    {part.categoryDisplay}
                  </p>
                  <p className="text-[16px] text-black leading-relaxed">
                    {part.description}
                  </p>
                  {heroSpecs.length > 0 && (
                    <ul className="space-y-2.5 pt-1">
                      {heroSpecs.map((spec, i) => (
                        <li key={i} className="flex items-baseline gap-2">
                          <span className="text-black font-black flex-shrink-0 text-[11px]">
                            ■
                          </span>
                          <span className="text-[16px] leading-snug">
                            <span className="font-bold text-black tracking-wide">
                              {spec.label}:{" "}
                            </span>
                            <span className="text-black">{spec.value}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8">
                  <a
                    href="#rfq"
                    onClick={e => {
                      e.preventDefault();
                      document
                        .getElementById("rfq")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
                  >
                    <span>{t("mixer.product.requestQuote")}</span>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                </div>
              </div>
            </section>

            {/* Zone 1b — Trust strip */}
            <div className="-mx-4 sm:-mx-8">
              <section
                aria-label={t("mixer.product.trustAria")}
                className="border-y border-slate-700 bg-white py-4"
              >
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                  <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3">
                    {productTrustItems.map((item, i) => (
                      <p
                        key={i}
                        className="font-mono text-[11px] text-slate-700 tracking-widest"
                      >
                        ■ {item}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Zone 2 — Decisive Specs (reused) */}
            {/* TODO: dimensioned spec drawing — primary image used until a
                CAD/dimension asset exists */}
            <div className="-mx-4 sm:-mx-8">
              <DecisiveSpecs blade={bladeLike} specImage={part.image} />
            </div>

            {/* Zone 2b — Grade selection guidance (how to choose) */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <section
                aria-label={t("mixer.grade.heading")}
                className="max-w-7xl mx-auto px-6 sm:px-8"
              >
                <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                  [ {t("mixer.grade.eyebrow")} ]
                </p>
                <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-4">
                  {t("mixer.grade.heading")}
                </h2>
                <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-8">
                  {guide.intro}
                </p>
                <div className="border border-slate-300 divide-y divide-slate-200">
                  {guide.rows.map(row => (
                    <div
                      key={row.duty}
                      className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_1fr] gap-x-6 gap-y-1 px-5 py-4"
                    >
                      <span className="font-black text-[14px] text-[#001f4d] tracking-tight border-l-2 border-[#001f4d] pl-3">
                        {row.duty}
                      </span>
                      <span className="text-[14px] text-slate-600 leading-snug">
                        {row.grade}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-slate-500 leading-[1.7] mt-5 max-w-3xl">
                  {t("mixer.grade.footnote")}
                </p>
              </section>
            </div>

            {/* Zone 2c — Available Grades / Variants (what's on offer) */}
            {part.variants && part.variants.length > 0 && (
              <div className="-mx-4 sm:-mx-8 pt-8">
                <section
                  aria-label={t("mixer.variants.heading")}
                  className="max-w-7xl mx-auto px-6 sm:px-8"
                >
                  <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                    [ {t("mixer.variants.eyebrow")} ]
                  </p>
                  <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-4">
                    {t("mixer.variants.heading")}
                  </h2>
                  <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-8">
                    {t("mixer.variants.lead")}
                  </p>
                  <div className="border border-slate-300 divide-y divide-slate-200">
                    {part.variants.map(v => (
                      <div
                        key={v.grade}
                        className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_1fr] gap-x-6 gap-y-1 px-5 py-4 hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-black text-[14px] text-[#001f4d] tracking-tight border-l-2 border-[#001f4d] pl-3">
                          {v.grade}
                        </span>
                        <span className="text-[14px] text-slate-600 leading-snug">
                          {v.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Inline RFQ prompt (reused) — before OEM / decision content */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <InlineRFQPrompt />
            </div>

            {/* Zone 3 — OEM compatibility (mixer wording) */}
            {part.compatibleMachines.length > 0 && (
              <div className="-mx-4 sm:-mx-8">
                <section
                  aria-label={t("mixer.product.oemHeading")}
                  className="max-w-7xl mx-auto px-6 sm:px-8"
                >
                  <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                    [ {t("mixer.oem.eyebrow")} ]
                  </p>
                  <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-10">
                    {t("mixer.product.oemHeading")}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {part.compatibleMachines.map(brand => (
                      <span
                        key={brand}
                        className="border-t-2 border-t-[#001f4d] border border-slate-300 bg-white px-4 py-2 font-mono text-[13px] text-[#001f4d] font-semibold tracking-wide"
                      >
                        {brand}&#174;
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] text-slate-500 tracking-widest mt-6">
                    &#174; {t("mixer.oem.trademarkNote")}
                  </p>
                </section>
              </div>
            )}

            {/* Zone 4 — Technical Audit (reused) */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <TechnicalAudit blade={bladeLike} />
            </div>
          </div>
        </div>

        {/* Overview — long-form detail, below the decision content */}
        {part.fullDescription && (
          <div className="mt-16">
            <section
              aria-label={t("mixer.product.overview.heading")}
              className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6"
            >
              <aside className="lg:col-span-4">
                <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                  [ {t("mixer.category.overview.eyebrow")} ]
                </p>
                <h2 className="font-black text-3xl lg:text-4xl text-[#001f4d] tracking-tight leading-[1.1]">
                  {t("mixer.product.overview.heading")}
                </h2>
                <div
                  className="mt-6 aspect-[4/3] border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
                  style={DOT_GRID_STYLE}
                >
                  <img
                    src={galleryImages[1] ?? galleryImages[0]}
                    alt={part.fullName || part.name}
                    className="w-full h-full object-contain p-4 mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                    onError={e => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                </div>
              </aside>
              <div className="lg:col-span-8 space-y-5">
                {part.fullDescription.split(/\n\n+/).map((para, i) => (
                  <p
                    key={i}
                    className="text-[16px] text-slate-700 leading-[1.8] max-w-[70ch]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* How to Order — reverse-engineer process (primes the decision) */}
        <div className="mt-16">
          <section
            aria-label={t("mixer.order.eyebrow")}
            className="max-w-7xl mx-auto px-6 sm:px-8"
          >
            <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
              [ {t("mixer.order.eyebrow")} ]
            </p>
            <h2 className="font-black text-3xl lg:text-4xl text-[#001f4d] tracking-tight mb-4">
              {t("mixer.order.heading")}
            </h2>
            <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-10">
              {t("mixer.order.lead")}
            </p>
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
          </section>
        </div>

        {/* Zone 5 — Related mixer parts (same category only) */}
        {related.length > 0 && (
          <div className="mt-16">
            <section
              aria-label={t("mixer.product.related.eyebrow")}
              className="max-w-7xl mx-auto px-6 sm:px-8"
            >
              <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                [ {t("mixer.product.related.eyebrow")} ]
              </p>
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="font-black text-3xl text-[#001f4d] tracking-tight">
                  {t("mixer.product.related.heading").replace(
                    "{{category}}",
                    part.categoryDisplay
                  )}
                </h2>
                {category && (
                  <Link href={category.link}>
                    <span className="font-mono text-[10px] text-slate-700 tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
                      {t("mixer.product.viewAll")} →
                    </span>
                  </Link>
                )}
              </div>
              <ProductGrid blades={related} layout="related" />
            </section>
          </div>
        )}

        {/* Zone 6 — FAQ (reused) */}
        <div className="mt-16">
          <ProductFAQ
            faqs={{
              technical: part.faq ?? [],
              company: getMixerCompanyFaq(lang),
            }}
            productName={part.fullName || part.name}
          />
        </div>

        {/* Zone 7 — RFQ form (reused) */}
        <div id="rfq">
          <ContactRFQ productName={part.name} formLocation="mixer_parts" />
        </div>

        {/* OEM-brand disclaimer (page footer) */}
        <div className="border-t border-slate-200 bg-slate-50">
          <p className="max-w-7xl mx-auto px-6 sm:px-8 py-6 font-mono text-[11px] text-slate-500 tracking-wide leading-relaxed">
            {t("mixer.oem.disclaimer")}
          </p>
        </div>
      </main>

      <FloatingContactButtons
        whatsappPrefillText={t("mixer.product.whatsappPrefill").replace(
          "{{name}}",
          part.name
        )}
        rfqAnchorId="rfq"
      />
      <Footer />
    </div>
  );
}
