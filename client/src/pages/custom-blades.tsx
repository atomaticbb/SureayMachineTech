/*
 * custom-blades.tsx — Special-Shaped & Custom Profile Blades
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Hero follows ProductListPage pattern: left navy diagonal + right image
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SEO from "@/components/common/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactRFQ from "@/components/home/ContactRFQ";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import ProductFAQ, {
  type ProductFaqData,
} from "@/components/product-detail/ProductFAQ";
import { useTranslation } from "@/lib/useTranslation";

// ─── Capabilities ─────────────────────────────────────────────────────────────
// keys resolve via t() at render time — see client/src/locales/*.json "custom.*"
const CAPABILITIES = [
  {
    labelKey: "custom.capabilities.c1.label",
    titleKey: "custom.capabilities.c1.title",
    summaryKey: "custom.capabilities.c1.summary",
    pointKeys: [
      "custom.capabilities.c1.point1",
      "custom.capabilities.c1.point2",
    ],
    imageSrc: "/images/process/drawing-review.webp",
    imageAltKey: "custom.capabilities.c1.imageAlt",
  },
  {
    labelKey: "custom.capabilities.c2.label",
    titleKey: "custom.capabilities.c2.title",
    summaryKey: "custom.capabilities.c2.summary",
    pointKeys: [
      "custom.capabilities.c2.point1",
      "custom.capabilities.c2.point2",
    ],
    imageSrc: "/images/common/material-selection.webp",
    imageAltKey: "custom.capabilities.c2.imageAlt",
  },
  {
    labelKey: "custom.capabilities.c3.label",
    titleKey: "custom.capabilities.c3.title",
    summaryKey: "custom.capabilities.c3.summary",
    pointKeys: [
      "custom.capabilities.c3.point1",
      "custom.capabilities.c3.point2",
    ],
    imageSrc: "/images/common/Quality-Inspection.webp",
    imageAltKey: "custom.capabilities.c3.imageAlt",
  },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────
const SHOWCASE = [
  {
    labelKey: "custom.showcase.label",
    titleKey: "custom.showcase.s1.title",
    summaryKey: "custom.showcase.s1.summary",
    imageSrc: "/images/products/blades/custom-blade-showcase-01.webp",
    imageAltKey: "custom.showcase.s1.imageAlt",
  },
  {
    labelKey: "custom.showcase.label",
    titleKey: "custom.showcase.s2.title",
    summaryKey: "custom.showcase.s2.summary",
    imageSrc: "/images/products/blades/custom-blade-showcase-02.webp",
    imageAltKey: "custom.showcase.s2.imageAlt",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const PROCESS = [
  {
    step: "01",
    titleKey: "custom.process.step1.title",
    bodyKey: "custom.process.step1.body",
  },
  {
    step: "02",
    titleKey: "custom.process.step2.title",
    bodyKey: "custom.process.step2.body",
  },
  {
    step: "03",
    titleKey: "custom.process.step3.title",
    bodyKey: "custom.process.step3.body",
  },
  {
    step: "04",
    titleKey: "custom.process.step4.title",
    bodyKey: "custom.process.step4.body",
  },
];

// ─── Profile Types ────────────────────────────────────────────────────────────
const PROFILES = [
  { nameKey: "custom.profiles.p1.name", descriptionKey: "custom.profiles.p1.description" },
  { nameKey: "custom.profiles.p2.name", descriptionKey: "custom.profiles.p2.description" },
  { nameKey: "custom.profiles.p3.name", descriptionKey: "custom.profiles.p3.description" },
  { nameKey: "custom.profiles.p4.name", descriptionKey: "custom.profiles.p4.description" },
  { nameKey: "custom.profiles.p5.name", descriptionKey: "custom.profiles.p5.description" },
  { nameKey: "custom.profiles.p6.name", descriptionKey: "custom.profiles.p6.description" },
  { nameKey: "custom.profiles.p7.name", descriptionKey: "custom.profiles.p7.description" },
  { nameKey: "custom.profiles.p8.name", descriptionKey: "custom.profiles.p8.description" },
];

// ─── Standard-shape cross-links — reuse existing productList.filters.* labels ──
const STANDARD_SHAPE_LINKS = [
  { href: "/categories/granulator-blades", labelKey: "productList.filters.granulatorBlades" },
  { href: "/categories/shredder-blades", labelKey: "productList.filters.shredderBlades" },
  { href: "/categories/slitter-knives", labelKey: "productList.filters.slitterKnives" },
  { href: "/categories/shear-blades", labelKey: "productList.filters.shearBlades" },
  { href: "/categories/cold-saw-blades", labelKey: "productList.filters.coldSawBlades" },
  { href: "/categories/log-saw-blades", labelKey: "productList.filters.logSawBlades" },
  { href: "/categories/wood-chipper-blades", labelKey: "productList.filters.woodChipperBlades" },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    valueKey: "custom.stats.moq.value",
    labelKey: "custom.stats.moq.label",
    subKey: "custom.stats.moq.sub",
  },
  {
    valueKey: "custom.stats.lead.value",
    labelKey: "custom.stats.lead.label",
    subKey: "custom.stats.lead.sub",
  },
  {
    valueKey: "custom.stats.input.value",
    labelKey: "custom.stats.input.label",
    subKey: "custom.stats.input.sub",
  },
  {
    valueKey: "custom.stats.quality.value",
    labelKey: "custom.stats.quality.label",
    subKey: "custom.stats.quality.sub",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_KEYS = {
  technical: [
    { q: "custom.faq.tech1.question", a: "custom.faq.tech1.answer" },
    { q: "custom.faq.tech2.question", a: "custom.faq.tech2.answer" },
    { q: "custom.faq.tech3.question", a: "custom.faq.tech3.answer" },
    { q: "custom.faq.tech4.question", a: "custom.faq.tech4.answer" },
    { q: "custom.faq.tech5.question", a: "custom.faq.tech5.answer" },
    { q: "custom.faq.tech6.question", a: "custom.faq.tech6.answer" },
    { q: "custom.faq.tech7.question", a: "custom.faq.tech7.answer" },
  ],
  company: [
    { q: "custom.faq.comp1.question", a: "custom.faq.comp1.answer" },
    { q: "custom.faq.comp2.question", a: "custom.faq.comp2.answer" },
    { q: "custom.faq.comp3.question", a: "custom.faq.comp3.answer" },
    { q: "custom.faq.comp4.question", a: "custom.faq.comp4.answer" },
  ],
};

export default function CustomBlades() {
  const { t } = useTranslation();

  const faqData: ProductFaqData = {
    technical: FAQ_KEYS.technical.map(({ q, a }) => ({
      question: t(q),
      answer: t(a),
    })),
    company: FAQ_KEYS.company.map(({ q, a }) => ({
      question: t(q),
      answer: t(a),
    })),
  };

  return (
    <>
      <SEO
        title={t("custom.seo.title")}
        description={t("custom.seo.description")}
        canonicalUrl="/custom"
        keywords={t("custom.seo.keywords")}
        preloadImage="/images/products/blades/special-shaped-knife-01.webp"
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.products"), url: "/products" },
          { name: t("custom.breadcrumb.current"), url: "/custom" },
        ]}
        productData={{
          name: t("custom.productData.name"),
          image: "/images/products/blades/special-shaped-knife.webp",
          images: [
            "/images/process/material-choosing.webp",
            "/images/process/CMM-verification.webp",
          ],
          description: t("custom.productData.description"),
          material: "D2, H13, PM-HSS, Solid Carbide",
          specs: [
            { label: t("custom.productData.specs.profileToleranceLabel"), value: "±0.02 mm" },
            { label: t("custom.productData.specs.edgeToleranceLabel"), value: "±0.005 mm" },
            { label: t("custom.stats.moq.label"), value: t("custom.stats.moq.value") },
            { label: t("custom.productData.specs.leadTimeLabel"), value: t("custom.stats.lead.value") },
          ],
          offers: { lowPrice: 20, highPrice: 800 },
        }}
      />

      <div className="min-h-screen bg-slate-50">
        <Navbar />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section
          aria-label="Custom blade header"
          className="relative mt-[74px] h-[379px] bg-[#001f4d] border-b border-white/10 overflow-hidden"
        >
          <div
            className="hidden md:block absolute inset-y-0 right-0 w-1/2 lg:w-[45%]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #001f4d 0%, rgba(0,31,77,0) 22%), url(/images/products/blades/special-shaped-knife-01.webp)",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          />
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center">
            <div className="w-full md:w-[68%] lg:w-[72%]">
              <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-black text-white tracking-tight leading-tight">
                {t("custom.hero.title")}
              </h1>
              <p className="text-white/50 text-[16px] leading-snug mt-1.5 max-w-2xl">
                {t("custom.hero.subtitle")}
              </p>
              <a
                href="#rfq"
                className="inline-flex items-center gap-2 bg-white text-[#001f4d] border-2 border-white hover:bg-[#001f4d] hover:text-white px-7 py-3.5 mt-7 font-black text-sm tracking-widest transition-all duration-300 rounded-none"
              >
                {t("custom.hero.cta")}
              </a>
            </div>
          </div>
        </section>

        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.products"), href: "/products" },
            { label: t("custom.breadcrumb.current") },
          ]}
        />

        {/* ── Stats Strip ─────────────────────────────────────────────────── */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.labelKey}
                  className={[
                    "group relative px-6 md:px-8 py-10 md:py-12 flex flex-col gap-2 transition-colors duration-300 hover:bg-slate-50",
                    i % 2 === 0 ? "border-r border-slate-200" : "",
                    i < 2 ? "border-b border-slate-200 md:border-b-0" : "",
                    i < 3 ? "md:border-r border-slate-200" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="font-mono text-[10px] text-[#001f4d]/65  tracking-[0.28em]">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <p className="text-[10px] font-semibold tracking-[0.25em]  text-slate-500">
                    {t(stat.subKey)}
                  </p>
                  <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-black text-[#001f4d] leading-tight tracking-tight font-mono">
                    {t(stat.valueKey)}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.15em]  text-slate-600 mt-0.5">
                    {t(stat.labelKey)}
                  </p>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#001f4d] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Verified Track Record ───────────────────────────────────────── */}
        <section className="bg-white border-b border-slate-200 py-10 lg:py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <Link href="/about#certifications" asChild>
                <a className="group flex items-center gap-4 border border-slate-200 hover:border-[#001f4d] p-4 transition-colors">
                  <img
                    src="/images/about/iso-9001-2015-certificate.webp"
                    alt={t("custom.verified.certImageAlt")}
                    loading="lazy"
                    decoding="async"
                    width={120}
                    height={160}
                    className="w-14 h-auto border border-slate-200 flex-shrink-0"
                  />
                  <div>
                    <p className="font-black text-sm text-[#001f4d] tracking-tight">
                      {t("custom.verified.certLabel")}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 group-hover:text-[#001f4d] transition-colors">
                      {t("custom.verified.certLink")}
                    </p>
                  </div>
                </a>
              </Link>
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  &ldquo;{t("home.testimonials.t2.quote")}&rdquo;
                </p>
                <p className="text-xs font-black text-[#001f4d] mt-3">
                  Kevin L. — {t("home.testimonials.t2.role")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Custom Blades Showcase ──────────────────────────────────────── */}
        <section className="bg-slate-50 border-t border-slate-200 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-4">
              {t("custom.showcase.eyebrow")}
            </p>
            <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d]  tracking-tight leading-[1.05] max-w-2xl">
              {t("custom.showcase.headline")}
            </h2>
            <div className="w-12 h-[3px] bg-slate-300 mt-6" />

            <div className="mt-10 lg:mt-14">
              {SHOWCASE.map((block, index) => {
                const reverse = index % 2 === 1;
                return (
                  <motion.div
                    key={block.titleKey}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 lg:py-10 border-b border-slate-200 last:border-0"
                  >
                    <div
                      className={[
                        "lg:col-span-6",
                        reverse ? "lg:order-2" : "lg:order-1",
                      ].join(" ")}
                    >
                      <div className="group border border-slate-200 bg-white overflow-hidden">
                        <img
                          src={block.imageSrc}
                          alt={t(block.imageAltKey)}
                          loading="lazy"
                          decoding="async"
                          width={1448}
                          height={1086}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div
                      className={[
                        "lg:col-span-6 flex flex-col justify-center",
                        reverse ? "lg:order-1" : "lg:order-2",
                      ].join(" ")}
                    >
                      <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
                        {t(block.labelKey)}
                      </p>
                      <h3 className="font-black text-xl md:text-2xl text-[#001f4d]  tracking-tight leading-[1.1] mb-4 max-w-lg">
                        {t(block.titleKey)}
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg">
                        {t(block.summaryKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Capabilities ────────────────────────────────────────────────── */}
        <section
          id="capabilities"
          className="bg-white border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
            <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-4">
              {t("custom.capabilities.eyebrow")}
            </p>
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d]  tracking-tight leading-[1.05] max-w-3xl">
              {t("custom.capabilities.headline")}
            </h2>
            <div className="w-12 h-[3px] bg-slate-300 mt-6" />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-14 lg:pb-20">
            {CAPABILITIES.map((block, index) => {
              const reverse = index % 2 === 1;
              return (
                <motion.div
                  key={block.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 lg:py-14 border-b border-slate-100 last:border-0"
                >
                  <div
                    className={[
                      "lg:col-span-5",
                      reverse ? "lg:order-2" : "lg:order-1",
                    ].join(" ")}
                  >
                    <div className="relative h-[260px] md:h-[300px] lg:h-[340px] overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={block.imageSrc}
                        alt={t(block.imageAltKey)}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent" />
                    </div>
                  </div>
                  <div
                    className={[
                      "lg:col-span-7 flex flex-col justify-center",
                      reverse ? "lg:order-1" : "lg:order-2",
                    ].join(" ")}
                  >
                    <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
                      {t(block.labelKey)}
                    </p>
                    <h3 className="font-black text-2xl md:text-[30px] text-[#001f4d]  tracking-tight leading-[1.08] mb-5 max-w-2xl">
                      {t(block.titleKey)}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                      {t(block.summaryKey)}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {block.pointKeys.map(pointKey => (
                        <div
                          key={pointKey}
                          className="border-l-2 border-slate-200 pl-4"
                        >
                          <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                            {t(pointKey)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Profile Types ────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="lg:pt-2">
                <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
                  {t("custom.profiles.eyebrow")}
                </p>
                <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d]  tracking-tight leading-[1.05] mb-4">
                  {t("custom.profiles.headline")}
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                  {t("custom.profiles.body")}
                </p>
                <a href="#rfq">
                  <button className="bg-[#001f4d] text-white hover:bg-[#003366] px-7 py-3.5 font-black text-sm  tracking-widest transition-colors rounded-none">
                    {t("custom.profiles.cta")}
                  </button>
                </a>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-slate-500 font-bold text-[10px]  tracking-[0.25em] mb-3">
                    {t("custom.profiles.standardShapePrompt")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STANDARD_SHAPE_LINKS.map(link => (
                      <Link key={link.href} href={link.href} asChild>
                        <a className="inline-block border border-[#001f4d]/25 text-[#001f4d] hover:bg-[#001f4d] hover:text-white text-xs font-bold tracking-wide px-3.5 py-2 transition-colors">
                          {t(link.labelKey)}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="border border-slate-200 bg-white">
                {PROFILES.map((profile, i) => (
                  <li
                    key={profile.nameKey}
                    className={[
                      "px-6 py-4 flex items-start gap-4",
                      i < PROFILES.length - 1
                        ? "border-b border-slate-100"
                        : "",
                    ].join(" ")}
                  >
                    <span className="w-[3px] h-5 bg-[#001f4d] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-semibold text-slate-700 tracking-[0.06em]">
                        {t(profile.nameKey)}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed mt-1">
                        {t(profile.descriptionKey)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process Timeline ─────────────────────────────────────────────── */}
        <section className="bg-white border-b border-slate-200 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-4">
              {t("custom.process.eyebrow")}
            </p>
            <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d]  tracking-tight leading-[1.05] mb-12 max-w-xl">
              {t("custom.process.headline")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 divide-y divide-slate-200 sm:divide-y-0">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: i * 0.1 },
                    },
                  }}
                  className={[
                    "p-7",
                    i % 2 === 0 && i < 3 ? "sm:border-r border-slate-200" : "",
                    i < 2 ? "sm:border-b border-slate-200 lg:border-b-0" : "",
                    i >= 2 ? "sm:border-t border-slate-200 lg:border-t-0" : "",
                    i < 3 ? "lg:border-r border-slate-200" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="font-mono text-[28px] font-black text-slate-200 leading-none mb-4">
                    {step.step}
                  </p>
                  <h3 className="font-black text-[14px]  tracking-[0.1em] text-[#001f4d] mb-3 leading-tight">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t(step.bodyKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section
          aria-label="Frequently asked questions"
          className="bg-slate-50 border-y border-slate-200 py-14 lg:py-20"
        >
          <ProductFAQ
            faqs={faqData}
            productName="Special-Shaped & Custom Profile Blades"
          />
        </section>

        {/* ── RFQ Form ─────────────────────────────────────────────────────── */}
        <div id="rfq">
          <ContactRFQ productName="Special-Shaped / Custom Profile Blades" />
        </div>

        <FloatingContactButtons
          whatsappPrefillText={t("custom.floatingContact.whatsappPrefill")}
          rfqAnchorId="rfq"
        />

        <Footer />
      </div>
    </>
  );
}
