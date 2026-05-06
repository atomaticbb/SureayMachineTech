/*
 * About.tsx — Sureay Machinery
 * Sections: Hero · Stats · Our Story · Manufacturing · Precision · Certifications · OEM Process
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { display: "15+",    label: "Years of Experience",     sub: "Est. 2008" },
  { display: "10,000+", label: "Blade Designs Delivered", sub: "Active Variants" },
  { display: "98%",    label: "Client Retention Rate",   sub: "Satisfaction" },
  { display: "50+",    label: "Countries Served",        sub: "Global Coverage" },
];

const EPOCHS = [
  { year: "2008", title: "First Blade Shipped",    desc: "Founded in Ma'anshan, Anhui. 500 m² workshop, 12 founding engineers, first industrial blade delivered." },
  { year: "2012", title: "5,000 M² CNC Grid",      desc: "Vacuum heat treatment furnaces and CNC grinding lines commissioned. Southeast Asia export initiated." },
  { year: "2016", title: "ISO 9001 Certified",     desc: "ISO 9001:2015 certification achieved. OEM partnerships established with European machine builders." },
  { year: "2020", title: "15,000 M² Factory",      desc: "Relocated to modern facility. 20+ multi-axis CNC centers, metallurgical lab, and CMM inspection stations." },
  { year: "2024", title: "50+ Countries",          desc: "10,000+ blade design variants active. Serving tissue, plastics, and metal processing sectors worldwide." },
];

const CAPABILITIES = [
  {
    num: "01",
    title: "CNC Precision Grinding",
    desc: "5-axis surface and cylindrical grinders. Tolerances to ±0.001 mm with submicron positional feedback.",
  },
  {
    num: "02",
    title: "CNC Machining & Wire EDM",
    desc: "Multi-axis milling centers and Wire EDM for complex profiles, bores, and keyways. ±0.003 mm typical.",
  },
  {
    num: "03",
    title: "Vacuum Heat Treatment",
    desc: "1,300 °C vacuum furnaces with deep cryogenic treatment at −196 °C for distortion-free hardening.",
  },
];

const PROCESS_IMAGES = [
  {
    src: "/images/about/grinding-workshop.webp",
    alt: "Precision grinding workshop — CNC grinding machines in rows",
    label: "Precision Grinding",
  },
  {
    src: "/images/about/cnc-machining-center.webp",
    alt: "CNC machining center — blade workpieces on machine table",
    label: "CNC Machining",
  },
  {
    src: "/images/common/Quality-Inspection.webp",
    alt: "CMM dimensional inspection — quality control station",
    label: "CMM Inspection",
  },
];

const PRECISION_STATS = [
  { value: "±0.001 mm", label: "Thickness tolerance", sub: "Metal foil slitter knives" },
  { value: "±0.002 mm", label: "Thickness tolerance", sub: "Film & tape slitter knives" },
  { value: "Ra ≤ 0.02 µm", label: "Surface finish",    sub: "Metal foil precision knives" },
  { value: "100%",       label: "HRC hardness tested", sub: "Every blade before dispatch" },
];

const MATERIALS = [
  { grade: "D2 / SKD11",          hrc: "58–62 HRC",  use: "Granulators, slitters, shredder blades" },
  { grade: "DC53",                 hrc: "60–62 HRC",  use: "High-wear granulator / shredder" },
  { grade: "H13 / 4Cr5MoSiV1",   hrc: "48–54 HRC",  use: "Metal shredder blades, impact-heavy" },
  { grade: "M2 HSS",               hrc: "62–65 HRC",  use: "Circular slitters, paper knives" },
  { grade: "M35 Cobalt HSS",       hrc: "63–66 HRC",  use: "Cold saw blades, stainless cutting" },
  { grade: "ASP23 / ASP52",        hrc: "64–67 HRC",  use: "Metal foil slitters, precision knives" },
  { grade: "S7 Shock Steel",       hrc: "54–58 HRC",  use: "Scrap chopper blades" },
  { grade: "WC-Co Carbide K05–K20", hrc: "HRA 88–91", use: "Battery slitters, electrode foil" },
];

const CERTIFICATIONS = [
  { label: "ISO 9001:2015", sub: "Quality Management" },
  { label: "CE Certified",  sub: "European Conformity" },
  { label: "SGS Audited",   sub: "Third-Party Verified" },
  { label: "RoHS Compliant",sub: "Hazardous Materials" },
  { label: "Global Logistics", sub: "Door-to-Door" },
  { label: "CMM Verified",  sub: "Dimensional Report" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Sureay — 15+ Years of Blade Engineering"
        description="ISO 9001:2015 certified OEM blade manufacturer since 2008. 15,000 m² facility, 5-axis CNC grinding, vacuum heat treatment, CMM inspection. Serving 50+ countries."
        canonicalUrl="/about"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO — edge-to-edge split
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-[74px]">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-74px)]">
          {/* Left — Text */}
          <motion.div
            className="flex flex-col px-8 sm:px-14 lg:px-20 py-14 lg:py-20 bg-white lg:w-[44%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center max-w-sm">
              <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-6">
                About Sureay Machinery
              </p>
              <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black text-[#001f4d] leading-none tracking-tight  mb-7">
                Engineering
                <br />
                Blade
                <br />
                Excellence
              </h1>
              <div className="w-12 h-[3px] bg-[#001f4d] mb-7" />
              <p className="text-slate-500 text-[16px] leading-relaxed mb-10">
                Sureay specializes in high-performance industrial blades and
                precision machine knives, engineered for demanding production
                environments since 2008. ISO 9001:2015 certified. 15,000 m²
                facility in Ma'anshan, China.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Our Story",      href: "#story" },
                  { label: "Manufacturing",  href: "#manufacturing" },
                  { label: "Precision",      href: "#precision" },
                  { label: "Certifications", href: "#certifications" },
                ].map(a => (
                  <a
                    key={a.href}
                    href={a.href}
                    className="text-[11px] font-semibold tracking-[0.14em]  border border-slate-200 px-3 py-1.5 text-slate-400 hover:border-[#001f4d] hover:text-[#001f4d] transition-colors"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Factory photo */}
          <div className="relative flex-1 overflow-hidden min-h-[340px] lg:min-h-0">
            <img
              src="/images/about/cnc-workshop.webp"
              alt="Sureay CNC workshop — machining centers with blade workpieces"
              className="absolute inset-0 w-full h-full object-cover"
              width={1272}
              height={702}
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/75 px-8 py-4">
              <p className="text-[11px] font-semibold tracking-[0.22em]  text-white/70">
                Ma'anshan, Anhui Province, China · 15,000 m² · Est. 2008
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#001f4d] border-y border-[#001f4d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`px-8 py-14 flex flex-col gap-2 ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""}`}
              >
                <p className="text-[10px] font-semibold tracking-[0.25em]  text-white/40">
                  {s.sub}
                </p>
                <p className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white leading-none tracking-tight tabular-nums">
                  {s.display}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.14em]  text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. OUR STORY — dark bg, vertical timeline + image
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="story" className="bg-white py-24 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              Company History
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              Our Story
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left — vertical timeline */}
            <div className="flex-1 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-slate-200 hidden sm:block" />

              <div className="flex flex-col gap-0">
                {EPOCHS.map((epoch, i) => (
                  <div key={i} className="flex gap-6 pb-10 last:pb-0">
                    {/* Node */}
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
                            i === EPOCHS.length - 1 ? "bg-white" : "bg-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                    {/* Content */}
                    <div>
                      <p className="text-[11px] font-black tracking-[0.2em] text-slate-400 mb-1.5">
                        {epoch.year}
                      </p>
                      <p className="text-[14px] font-black  tracking-tight text-[#001f4d] leading-snug mb-2">
                        {epoch.title}
                      </p>
                      <p className="text-[15px] text-slate-500 leading-relaxed max-w-xs">
                        {epoch.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 4 stacked photos */}
            <div className="lg:w-[45%] flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src="/images/about/factory.webp"
                    alt="Sureay factory floor — Ma'anshan manufacturing facility"
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
                    alt="Sureay CNC machining workshop — production floor overview"
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
                    alt="Sureay precision grinding workshop"
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
                    alt="Sureay CNC machining center — blade workpieces on machine table"
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                    width={616}
                    height={518}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-6 py-4 border-t border-white/10">
                    <p className="text-[10px] font-semibold tracking-[0.2em]  text-white/60">
                      2020 — 15,000 m² Facility · Ma'anshan, China
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. MANUFACTURING
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="manufacturing" className="py-24 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              Facility
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              Manufacturing
            </h2>
          </div>

          {/* Main: large image + capabilities list */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-12">
            {/* Image */}
            <div className="lg:w-[55%] flex-shrink-0 relative overflow-hidden h-[340px] lg:h-[420px]">
              <img
                src="/images/about/cnc-workshop.webp"
                alt="Sureay CNC workshop — machining centers with blade workpieces"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1272}
                height={702}
              />
            </div>

            {/* Capabilities */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              <p className="text-[15px] text-slate-500 leading-relaxed">
                15,000 m² production facility housing 20+ CNC grinding centers,
                vacuum heat treatment furnaces, Wire EDM, and a dedicated
                metallurgical lab for incoming material verification.
              </p>
              <div className="flex flex-col gap-7">
                {CAPABILITIES.map((cap) => (
                  <div key={cap.num} className="flex gap-5 items-start">
                    <span className="text-[11px] font-black text-slate-300 tracking-widest flex-shrink-0 mt-0.5 w-6">
                      {cap.num}
                    </span>
                    <div>
                      <p className="text-[15px] font-black  tracking-tight text-[#001f4d] mb-1">
                        {cap.title}
                      </p>
                      <p className="text-[15px] text-slate-500 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 process images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROCESS_IMAGES.map((img) => (
              <div key={img.src} className="relative overflow-hidden h-[200px] group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/70 px-4 py-2.5">
                  <p className="text-[10px] font-black tracking-[0.2em]  text-white">
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. PRECISION STANDARDS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="precision" className="py-24 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-3">
              Dimensional Accuracy
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d]  tracking-tight">
              Precision Standards
            </h2>
          </div>

          {/* Full-width 4-stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 mb-14">
            {PRECISION_STATS.map((s, i) => (
              <div key={i} className="bg-white px-8 py-8">
                <p className="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#001f4d] leading-none tracking-tight mb-2">
                  {s.value}
                </p>
                <p className="text-[12px] font-semibold  tracking-[0.14em] text-slate-500 leading-snug mb-1">
                  {s.label}
                </p>
                <p className="text-[11px]  tracking-[0.12em] text-slate-400">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* 2-col: image left + materials right */}
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            {/* Image */}
            <div className="lg:w-[42%] flex-shrink-0">
              <div className="relative overflow-hidden h-[380px]">
                <img
                  src="/images/common/material-selection.webp"
                  alt="Tool steel library and material selection — Sureay blade manufacturing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d]/80 px-5 py-3">
                  <p className="text-[10px] font-black tracking-[0.18em]  text-white/60 mb-0.5">
                    Material Selection
                  </p>
                  <p className="text-[16px] font-black text-white">
                    Application-Matched Alloys
                  </p>
                </div>
              </div>
            </div>

            {/* Materials table */}
            <div className="flex-1">
              <p className="text-[11px] font-black tracking-[0.22em]  text-slate-400 mb-5">
                Steel Grades & Materials
              </p>
              <div className="border border-slate-200">
                {MATERIALS.map((m, i) => (
                  <div key={i} className={`flex items-start gap-4 px-4 py-3 ${i < MATERIALS.length - 1 ? "border-b border-slate-200" : ""}`}>
                    <span className="text-[13px] font-black text-[#001f4d] w-48 flex-shrink-0 leading-snug">
                      {m.grade}
                    </span>
                    <span className="text-[13px] font-mono text-slate-400 w-24 flex-shrink-0">
                      {m.hrc}
                    </span>
                    <span className="text-[13px] text-slate-500 hidden sm:block">
                      {m.use}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CERTIFICATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="certifications" className="py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em]  text-slate-400 mb-3">
              Compliance & Standards
            </p>
            <h2 className="text-3xl font-black text-[#001f4d]  tracking-tight">
              Certifications
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="border border-slate-200 bg-white px-4 py-10 flex flex-col items-center justify-center gap-2 hover:border-[#001f4d] hover:bg-[#001f4d] group transition-colors cursor-default"
              >
                <span className="text-[11px] font-black  tracking-wide text-[#001f4d] group-hover:text-white text-center leading-tight transition-colors">
                  {cert.label}
                </span>
                <span className="text-[9px] font-medium  tracking-wider text-slate-400 group-hover:text-white/60 text-center transition-colors">
                  {cert.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. OEM PROCESS
      ═══════════════════════════════════════════════════════════════════ */}
      <IndustryOemPipeline />

      <Footer />
    </div>
  );
}
