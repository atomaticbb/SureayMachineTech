/*
 * About.tsx — Sureay Machinery
 * Sections: Hero · Stats · Our Story · Manufacturing · Precision · Certifications · OEM Process
 */

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import { useTranslation } from "@/lib/useTranslation";

// ── Data — only language-invariant fields (year, image src, code values)
//          stay inline. Display strings are referenced via i18n keys.

const EPOCHS = [
  {
    year: "2008",
    titleKey: "about.epoch.y2008.title",
    descKey: "about.epoch.y2008.desc",
  },
  {
    year: "2012",
    titleKey: "about.epoch.y2012.title",
    descKey: "about.epoch.y2012.desc",
  },
  {
    year: "2016",
    titleKey: "about.epoch.y2016.title",
    descKey: "about.epoch.y2016.desc",
  },
  {
    year: "2020",
    titleKey: "about.epoch.y2020.title",
    descKey: "about.epoch.y2020.desc",
  },
  {
    year: "2024",
    titleKey: "about.epoch.y2024.title",
    descKey: "about.epoch.y2024.desc",
  },
];

const CAPABILITIES = [
  { num: "01", titleKey: "about.cap.cnc.title", descKey: "about.cap.cnc.desc" },
  { num: "02", titleKey: "about.cap.edm.title", descKey: "about.cap.edm.desc" },
  {
    num: "03",
    titleKey: "about.cap.heat.title",
    descKey: "about.cap.heat.desc",
  },
];

const PROCESS_IMAGES = [
  {
    src: "/images/about/grinding-workshop.webp",
    altKey: "about.process.grinding.alt",
    labelKey: "about.process.grinding.label",
  },
  {
    src: "/images/about/cnc-machining-center.webp",
    altKey: "about.process.cnc.alt",
    labelKey: "about.process.cnc.label",
  },
  {
    src: "/images/common/Quality-Inspection.webp",
    altKey: "about.process.cmm.alt",
    labelKey: "about.process.cmm.label",
  },
];

const PRECISION_STATS = [
  {
    value: "±0.001 mm",
    labelKey: "about.precision.thicknessLabel",
    subKey: "about.precision.s1.sub",
  },
  {
    value: "±0.002 mm",
    labelKey: "about.precision.thicknessLabel",
    subKey: "about.precision.s2.sub",
  },
  {
    value: "Ra ≤ 0.02 µm",
    labelKey: "about.precision.s3.label",
    subKey: "about.precision.s3.sub",
  },
  {
    value: "100%",
    labelKey: "about.precision.s4.label",
    subKey: "about.precision.s4.sub",
  },
];

// Material grades/HRC stay verbatim — codes don't translate. Use case translates.
const MATERIALS = [
  { grade: "D2 / SKD11", hrc: "58–62 HRC", useKey: "about.material.d2.use" },
  { grade: "DC53", hrc: "60–62 HRC", useKey: "about.material.dc53.use" },
  {
    grade: "H13 / 4Cr5MoSiV1",
    hrc: "48–54 HRC",
    useKey: "about.material.h13.use",
  },
  { grade: "M2 HSS", hrc: "62–65 HRC", useKey: "about.material.m2.use" },
  {
    grade: "M35 Cobalt HSS",
    hrc: "63–66 HRC",
    useKey: "about.material.m35.use",
  },
  {
    grade: "ASP23 / ASP52",
    hrc: "64–67 HRC",
    useKey: "about.material.asp.use",
  },
  {
    grade: "S7 Shock Steel",
    hrc: "54–58 HRC",
    useKey: "about.material.s7.use",
  },
  {
    grade: "WC-Co Carbide K05–K20",
    hrc: "HRA 88–91",
    useKey: "about.material.wc.use",
  },
];

const CERTIFICATIONS = [
  { labelKey: "about.cert.iso.label", subKey: "about.cert.iso.sub" },
  { labelKey: "about.cert.ce.label", subKey: "about.cert.ce.sub" },
  { labelKey: "about.cert.sgs.label", subKey: "about.cert.sgs.sub" },
  { labelKey: "about.cert.rohs.label", subKey: "about.cert.rohs.sub" },
  {
    labelKey: "about.cert.logistics.label",
    subKey: "about.cert.logistics.sub",
  },
  { labelKey: "about.cert.cmm.label", subKey: "about.cert.cmm.sub" },
];

// Featured certificate. Language-neutral values only; labels come from i18n.
// The certificate number is intentionally omitted from all client-readable markup.
const ISO_CERTIFICATE = {
  image: "/images/about/iso-9001-2015-certificate.webp",
  issuer: "Beijing Zhongliantianrun Certification Center (ZLTR)",
  accreditation: "IAF · SCC/OCSM",
  validity: "27 Jan 2024 – 26 Jan 2027",
};

// Download-deterrence inline style for the cert image (thumbnail + lightbox).
// -webkit-user-drag is non-standard (absent from csstype), hence the cast.
const CERT_IMG_STYLE = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
} as CSSProperties;

const HERO_NAV_ANCHORS = [
  { labelKey: "about.story.headline", href: "#story" },
  { labelKey: "about.mfg.headline", href: "#manufacturing" },
  { labelKey: "about.heroNav.precision", href: "#precision" },
  { labelKey: "about.cert.headline", href: "#certifications" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  const { t } = useTranslation();
  const [certZoom, setCertZoom] = useState(false);

  // Lightbox closes on Escape.
  useEffect(() => {
    if (!certZoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [certZoom]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        canonicalUrl="/about"
        extraJsonLd={[
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Sureay Machinery Technology — Factory Tour",
            description: t("about.seo.description"),
            thumbnailUrl:
              "https://img.youtube.com/vi/UfjqDYlewko/maxresdefault.jpg",
            uploadDate: "2026-05-15",
            embedUrl: "https://www.youtube.com/embed/UfjqDYlewko",
            contentUrl: "https://www.youtube.com/watch?v=UfjqDYlewko",
            publisher: {
              "@type": "Organization",
              name: "Sureay Machinery Technology",
              url: "https://sureay.com",
            },
          }),
        ]}
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="pt-[74px]">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-74px)]">
          <motion.div
            className="flex flex-col px-8 sm:px-14 lg:px-20 py-14 lg:py-20 bg-white lg:w-[44%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center max-w-sm">
              <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-6">
                {t("about.hero.eyebrow")}
              </p>
              <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black text-[#001f4d] leading-none tracking-tight  mb-7">
                {t("about.hero.headline")}
              </h1>
              <div className="w-12 h-[3px] bg-[#001f4d] mb-7" />
              <p className="text-slate-500 text-[16px] leading-relaxed mb-10">
                {t("about.hero.body")}
              </p>
              <div className="flex flex-wrap gap-2">
                {HERO_NAV_ANCHORS.map(a => (
                  <a
                    key={a.href}
                    href={a.href}
                    className="text-[11px] font-semibold tracking-[0.14em]  border border-slate-200 px-3 py-1.5 text-slate-400 hover:border-[#001f4d] hover:text-[#001f4d] transition-colors"
                  >
                    {t(a.labelKey)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="relative flex-1 overflow-hidden min-h-[340px] lg:min-h-0">
            <img
              src="/images/about/factory-image-02.webp"
              alt={t("about.hero.imageAlt")}
              className="absolute inset-0 w-full h-full object-cover"
              width={1272}
              height={702}
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/75 px-8 py-4">
              <p className="text-[11px] font-semibold tracking-[0.22em]  text-white/70">
                {t("about.hero.imageCaption")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FACTORY VIDEO */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 lg:py-10">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-400 mb-5">
            {t("about.video.eyebrow")}
          </p>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/UfjqDYlewko"
              title={t("about.video.title")}
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section
        id="story"
        className="bg-white py-24 lg:py-28 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              {t("about.story.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              {t("about.story.headline")}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            <div className="flex-1 relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-slate-200 hidden sm:block" />

              <div className="flex flex-col gap-0">
                {EPOCHS.map((epoch, i) => (
                  <div key={i} className="flex gap-6 pb-10 last:pb-0">
                    <div className="flex-shrink-0 relative z-10 mt-1">
                      <div
                        className={`w-5 h-5 border-2 flex items-center justify-center ${
                          i === EPOCHS.length - 1
                            ? "bg-[#001f4d] border-[#001f4d]"
                            : "bg-white border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 ${
                            i === EPOCHS.length - 1
                              ? "bg-white"
                              : "bg-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black tracking-[0.2em] text-slate-400 mb-1.5">
                        {epoch.year}
                      </p>
                      <p className="text-[14px] font-black  tracking-tight text-[#001f4d] leading-snug mb-2">
                        {t(epoch.titleKey)}
                      </p>
                      <p className="text-[15px] text-slate-500 leading-relaxed max-w-xs">
                        {t(epoch.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-[45%] flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src="/images/about/factory-image-01.webp"
                    alt={t("about.story.image1Alt")}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                    width={1920}
                    height={1078}
                  />
                </div>
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src="/images/about/factory-00.webp"
                    alt={t("about.story.image2Alt")}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                    width={1920}
                    height={1233}
                  />
                </div>
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src="/images/about/grinding-workshop.webp"
                    alt={t("about.story.image3Alt")}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                    width={630}
                    height={516}
                  />
                </div>
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src="/images/about/cnc-machining-center.webp"
                    alt={t("about.story.image4Alt")}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                    width={616}
                    height={518}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-6 py-4 border-t border-white/10">
                    <p className="text-[10px] font-semibold tracking-[0.2em]  text-white/60">
                      {t("about.story.image4Caption")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MANUFACTURING */}
      <section
        id="manufacturing"
        className="py-24 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              {t("about.mfg.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              {t("about.mfg.headline")}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-12">
            <div className="lg:w-[55%] flex-shrink-0 relative overflow-hidden h-[340px] lg:h-[420px]">
              <img
                src="/images/about/cnc-workshop.webp"
                alt={t("about.hero.imageAlt")}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1272}
                height={702}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8">
              <p className="text-[15px] text-slate-500 leading-relaxed">
                {t("about.mfg.body")}
              </p>
              <div className="flex flex-col gap-7">
                {CAPABILITIES.map(cap => (
                  <div key={cap.num} className="flex gap-5 items-start">
                    <span className="text-[11px] font-black text-slate-300 tracking-widest flex-shrink-0 mt-0.5 w-6">
                      {cap.num}
                    </span>
                    <div>
                      <p className="text-[15px] font-black  tracking-tight text-[#001f4d] mb-1">
                        {t(cap.titleKey)}
                      </p>
                      <p className="text-[15px] text-slate-500 leading-relaxed">
                        {t(cap.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                The same foundry, tool-steel metallurgy and precision-grinding
                lines now also produce{" "}
                <Link
                  href="/mixer-wear-parts"
                  className="font-semibold text-[#001f4d] underline underline-offset-2 hover:text-[#003366]"
                >
                  concrete &amp; asphalt mixing plant wear parts
                </Link>{" "}
                — cast mixing arms, liner plates, scrapers and blades for mixing
                plants.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROCESS_IMAGES.map(img => (
              <div
                key={img.src}
                className="relative overflow-hidden h-[200px] group"
              >
                <img
                  src={img.src}
                  alt={t(img.altKey)}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/70 px-4 py-2.5">
                  <p className="text-[10px] font-black tracking-[0.2em]  text-white">
                    {t(img.labelKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRECISION STANDARDS */}
      <section
        id="precision"
        className="py-24 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              {t("about.precision.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              {t("about.precision.headline")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 mb-14">
            {PRECISION_STATS.map((s, i) => (
              <div key={i} className="bg-white px-8 py-8">
                <p className="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#001f4d] leading-none tracking-tight mb-2">
                  {s.value}
                </p>
                <p className="text-[12px] font-semibold  tracking-[0.14em] text-slate-500 leading-snug mb-1">
                  {t(s.labelKey)}
                </p>
                <p className="text-[11px]  tracking-[0.12em] text-slate-400">
                  {t(s.subKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            <div className="lg:w-[42%] flex-shrink-0">
              <div className="relative overflow-hidden h-[380px]">
                <img
                  src="/images/common/material-selection.webp"
                  alt={t("about.precision.imageAlt")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/80 px-5 py-3">
                  <p className="text-[10px] font-black tracking-[0.18em]  text-white/60 mb-0.5">
                    {t("about.precision.imageEyebrow")}
                  </p>
                  <p className="text-[16px] font-black text-white">
                    {t("about.precision.imageTitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[11px] font-black tracking-[0.22em]  text-slate-400 mb-5">
                {t("about.precision.tableEyebrow")}
              </p>
              <div className="border border-slate-200">
                {MATERIALS.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 px-4 py-3 ${i < MATERIALS.length - 1 ? "border-b border-slate-200" : ""}`}
                  >
                    <span className="text-[13px] font-black text-[#001f4d] w-48 flex-shrink-0 leading-snug">
                      {m.grade}
                    </span>
                    <span className="text-[13px] font-mono text-slate-400 w-24 flex-shrink-0">
                      {m.hrc}
                    </span>
                    <span className="text-[13px] text-slate-500 hidden sm:block">
                      {t(m.useKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS */}
      <section
        id="certifications"
        className="py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em]  text-slate-400 mb-3">
              {t("about.cert.eyebrow")}
            </p>
            <h2 className="text-3xl font-black text-[#001f4d]  tracking-tight">
              {t("about.cert.headline")}
            </h2>
          </div>

          {/* Featured ISO 9001:2015 certificate — real-text details (no number).
              Stacked on mobile, two-column at md:. */}
          <div className="mb-10 flex flex-col border border-slate-200 md:flex-row">
            {/* LEFT — clickable thumbnail. A transparent overlay sits over the
                <img> so right-click / long-press land on the overlay; its click
                opens the lightbox. Deterrence only — the browser must load the
                image to render it; download cannot be fully blocked. */}
            <div className="flex-shrink-0 border-b border-slate-200 bg-slate-50 p-5 sm:p-6 md:w-[44%] md:border-b-0 md:border-r">
              <div
                className="relative cursor-zoom-in select-none"
                role="button"
                tabIndex={0}
                onClick={() => setCertZoom(true)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCertZoom(true);
                  }
                }}
                onContextMenu={e => e.preventDefault()}
              >
                <img
                  src={ISO_CERTIFICATE.image}
                  alt={t("about.cert.iso.imageAlt")}
                  className="block h-auto w-full max-w-full border border-slate-200"
                  loading="lazy"
                  decoding="async"
                  width={1086}
                  height={1448}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                  style={CERT_IMG_STYLE}
                />
                <div
                  className="absolute inset-0"
                  onContextMenu={e => e.preventDefault()}
                />
              </div>
            </div>

            {/* RIGHT — definition list. No certificate number anywhere. */}
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
              <h3 className="mb-7 text-xl font-black tracking-tight text-[#001f4d] sm:text-2xl">
                {t("about.cert.featured.heading")}
              </h3>
              <dl className="flex flex-col gap-5">
                <div>
                  <dt className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {t("about.cert.featured.issuerLabel")}
                  </dt>
                  <dd className="text-[14px] leading-snug text-[#001f4d]">
                    {ISO_CERTIFICATE.issuer}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {t("about.cert.featured.accredLabel")}
                  </dt>
                  <dd className="text-[14px] leading-snug text-[#001f4d]">
                    {ISO_CERTIFICATE.accreditation}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {t("about.cert.featured.validLabel")}
                  </dt>
                  <dd className="font-mono text-[14px] leading-snug text-[#001f4d]">
                    {ISO_CERTIFICATE.validity}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="border border-slate-200 bg-white px-4 py-10 flex flex-col items-center justify-center gap-2 hover:border-[#001f4d] hover:bg-[#001f4d] group transition-colors cursor-default"
              >
                <span className="text-[11px] font-black  tracking-wide text-[#001f4d] group-hover:text-white text-center leading-tight transition-colors">
                  {t(cert.labelKey)}
                </span>
                <span className="text-[9px] font-medium  tracking-wider text-slate-400 group-hover:text-white/60 text-center transition-colors">
                  {t(cert.subKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OEM PROCESS */}
      <IndustryOemPipeline />

      {/* Certificate lightbox — local to this page, framer-motion fade.
          Closes on Escape (effect above), backdrop click, and the × button. */}
      <AnimatePresence>
        {certZoom && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCertZoom(false)}
            onContextMenu={e => e.preventDefault()}
            role="dialog"
            aria-modal="true"
            aria-label={t("about.cert.featured.heading")}
          >
            <button
              type="button"
              onClick={() => setCertZoom(false)}
              aria-label={t("common.close")}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-white/40 text-2xl leading-none text-white transition-colors hover:bg-white hover:text-[#001f4d] sm:right-6 sm:top-6"
            >
              ×
            </button>
            {/* stopPropagation: clicks on the image must not close the overlay. */}
            <div
              className="relative max-h-full max-w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={ISO_CERTIFICATE.image}
                alt={t("about.cert.iso.imageAlt")}
                className="block h-auto max-h-[90vh] w-auto max-w-full object-contain"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                style={CERT_IMG_STYLE}
              />
              <div
                className="absolute inset-0"
                onContextMenu={e => e.preventDefault()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
