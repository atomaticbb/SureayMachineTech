/**
 * TissueLogSawBladePage — Dedicated Product Detail Page
 * Route: /products/blades/tissue-log-saw-blades
 *
 * B2B CRO-optimized PDP for Tissue Log Saw Blades.
 * Design: Industrial precision. Navy-dominant. Orange reserved for CTAs only.
 */

import React, { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LogSawSizingTable from "@/components/product-detail/LogSawSizingTable";

// ─── Gallery Images ───────────────────────────────────────────────────────────
const GALLERY = [
  "/images/products/blades/tissue-log-saw-blades.webp",
  "/images/products/blades/tissue-log-saw-blades.webp",
  "/images/products/blades/tissue-log-saw-blades.webp",
  "/images/products/blades/tissue-log-saw-blades.webp",
];

// ─── Key Specs Summary ────────────────────────────────────────────────────────
const KEY_SPECS = [
  { label: "Material",    value: "SKD-11 / Cr12MoV" },
  { label: "Hardness",    value: "56 – 60 HRC" },
  { label: "Tolerance",   value: "± 0.02 mm" },
  { label: "Edge Angle",  value: "15° – 25°" },
  { label: "Finish",      value: "Ra ≤ 0.4 μm" },
  { label: "Lead Time",   value: "10 – 20 days" },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "SURFACE FINISH",
    title: "Mirror-Polish Grinding (Ra ≤ 0.4)",
    body:
      "Multi-stage lapping achieves mirror-like surface finish that eliminates fibre adhesion, minimises dust generation, and delivers burr-free cuts on the fastest tissue-converting lines.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 3L3 8.5v7L12 21l9-5.5v-7L12 3z" strokeLinejoin="round" />
        <path d="M12 3v18M3 8.5l9 5.5 9-5.5" strokeLinejoin="round" />
      </svg>
    ),
    tag: "EDGE GEOMETRY",
    title: "Optimised Shallow Bevel (15° – 25°)",
    body:
      "Our proprietary bevel geometry minimises cutting force on delicate tissue webs, preventing fibre crushing and delivering clean, straight cuts that meet premium tissue brand QC standards.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 13h4" strokeLinecap="round" />
      </svg>
    ),
    tag: "PROTECTIVE COATING",
    title: "Optional Chrome / TiN Coating",
    body:
      "Electrolytic hard chrome or PVD titanium nitride coating extends service lifespan by 40–80 % in high-humidity and tissue-wet conditions, reducing total cost of ownership.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
      </svg>
    ),
    tag: "DIMENSIONAL ACCURACY",
    title: "CNC Ground to ±0.02 mm Tolerance",
    body:
      "Every blade is CNC-finished on 5-axis grinders. Dimensional runout ≤ 0.02 mm ensures vibration-free operation, extending both blade life and machine-spindle bearing life.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M4 19l8-14 8 14H4z" strokeLinejoin="round" />
        <path d="M12 9v5M12 16v.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "HEAT TREATMENT",
    title: "Vacuum-Hardened 56 – 60 HRC",
    body:
      "Vacuum furnace hardening with controlled atmosphere prevents decarburisation and warping, delivering uniform hardness and toughness across the full disc cross-section.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "CUSTOMISATION",
    title: "OEM & Custom Orders Welcome",
    body:
      "Submit your machine drawing or physical sample. We engineer blades to your exact bore diameter, outer diameter, pin-hole pattern, and bevel specification — with RFQ response in 24 h.",
  },
];

// ─── Applications ─────────────────────────────────────────────────────────────
const APPLICATIONS = [
  { industry: "Tissue Paper Mills",       detail: "Toilet tissue, facial tissue, kitchen towel" },
  { industry: "Log Saw Stations",         detail: "Perini, Fabio Perini, PCMC, Körber S+S" },
  { industry: "Toilet Paper Converting",  detail: "High-speed 3+ lane log-saw lines" },
  { industry: "Paper Towel Production",   detail: "Commercial and jumbo-roll converting" },
  { industry: "Wet Wipes Manufacturing",  detail: "Spunlace nonwoven log-cutting" },
  { industry: "Specialty Tissue",         detail: "Medical, industrial, and hygiene-grade paper" },
];

// ─── Performance Stats ────────────────────────────────────────────────────────
const STATS = [
  { value: "±0.02",  unit: "mm",      label: "Dimensional tolerance" },
  { value: "56–60",  unit: "HRC",     label: "Vacuum-hardened hardness" },
  { value: "Ra ≤ 0.4", unit: "μm",   label: "Mirror surface finish" },
  { value: "40–80",  unit: "%",       label: "Lifespan boost w/ coating" },
];

// ─── Compatible Brands ────────────────────────────────────────────────────────
const COMPATIBLE_BRANDS = [
  "Fabio Perini",
  "PCMC",
  "Körber S+S",
  "Futura",
  "Gambini",
  "MTorres",
  "Casmatic",
  "Bretting MFG",
];

// ─── Manufacturing Process ────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Alloy Billet Selection",
    body: "Premium SKD-11 / Cr12MoV billets sourced from certified mills are spectrally verified before cutting. Material certification supplied with each order.",
  },
  {
    num: "02",
    title: "Rough Blank CNC Turning",
    body: "Rough-turned blanks are CNC-checked for concentricity on a coordinate measurement machine before proceeding to hardening.",
  },
  {
    num: "03",
    title: "Vacuum Heat Treatment",
    body: "Blades are hardened in a controlled-atmosphere vacuum furnace to 56–60 HRC depth. Each batch includes a hardness test certificate.",
  },
  {
    num: "04",
    title: "5-Axis CNC Grinding",
    body: "Post-hardening grinding on 5-axis CNC machines achieves dimensional tolerance within ±0.02 mm and flatness ≤ 0.01 mm across the disc face.",
  },
  {
    num: "05",
    title: "Multi-Stage Lapping & Polishing",
    body: "Three-pass lapping brings the cutting face to Ra ≤ 0.4 μm. Final visual inspection and surface-roughness measurement are recorded for each disc.",
  },
  {
    num: "06",
    title: "Coating & Final QC",
    body: "Optional TiN or hard-chrome coating applied. Final QC checks dimension, hardness, runout (≤ 0.02 mm), and surface finish before packing.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function TissueLogSawBladePage() {
  const [activeImg, setActiveImg] = useState(0);

  const prevImg = () => setActiveImg((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % GALLERY.length);

  return (
    <>
      <Navbar />

      {/* ── 1. BREADCRUMBS ─────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/">
              <a className="hover:text-slate-800 transition-colors">Home</a>
            </Link>
            <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/products">
              <a className="hover:text-slate-800 transition-colors">Products</a>
            </Link>
            <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/products/blades">
              <a className="hover:text-slate-800 transition-colors">Blades</a>
            </Link>
            <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-slate-900 font-bold truncate">Tissue Log Saw Blades</span>
          </nav>
        </div>
      </div>

      {/* ── 2. PRODUCT OVERVIEW (Above the fold) ───────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: Visual ── */}
            <div className="sticky top-24">
              {/* Main Image Container */}
              <div className="relative bg-slate-50 border border-slate-200 aspect-square rounded-2xl overflow-hidden group">
                {/* OEM Badge */}
                <div className="absolute top-4 left-4 z-10 bg-[#003366] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-lg">
                  OEM / Custom Available
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Paper Industry
                </div>

                {/* Main Image */}
                <img
                  key={activeImg}
                  src={GALLERY[activeImg]}
                  alt="Tissue Log Saw Blade"
                  className="object-contain w-full h-full p-8 transition-opacity duration-300"
                  onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
                />

                {/* Prev / Next arrows */}
                {GALLERY.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-[#003366] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={nextImg}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-[#003366] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {GALLERY.length > 1 && (
                <div className="flex gap-2.5 mt-3 justify-center">
                  {GALLERY.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-lg border-2 overflow-hidden bg-slate-50 transition-all flex-shrink-0 ${
                        i === activeImg
                          ? "border-[#003366] shadow-md"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-contain p-1.5"
                        onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Signals below image */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {[
                  { icon: "🏭", label: "Factory Direct" },
                  { icon: "📋", label: "ISO Certified" },
                  { icon: "✈️", label: "Ships Worldwide" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-1 py-3 bg-slate-50 text-center">
                    <span className="text-lg leading-none">{t.icon}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Sales Copy & Action ── */}
            <div className="flex flex-col gap-6">

              {/* Eyebrow */}
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Paper Industry Blades
              </p>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-tight tracking-tight">
                  Tissue Log Saw Blades
                </h1>
                <p className="mt-1.5 text-base font-medium text-slate-500">
                  Ultra-Sharp Paper Converting &amp; Cutting Blades
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Maximize your paper converting line's uptime with Sureay's precision-engineered tissue log saw blades.
                Manufactured specifically for the high-speed cutting of toilet tissue, kitchen towels, and industrial rolls,
                our log-saw blades deliver exceptionally clean, dust-free cuts while drastically reducing blade replacement
                frequency — lowering your total cost per thousand cuts.
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {KEY_SPECS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{s.label}</p>
                    <p className="text-sm font-bold text-[#003366] leading-snug">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/contact">
                  <a className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF6600] hover:bg-[#e55a00] text-white font-bold rounded-xl text-[15px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/50">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Request a Quote
                  </a>
                </Link>
                <a
                  href="mailto:sales@sureay.com?subject=Custom%20Tissue%20Log%20Saw%20Blades%20Inquiry"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#003366] border-2 border-[#003366] text-[#003366] hover:text-white font-bold rounded-xl text-[15px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003366]/30"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" /></svg>
                  Technical Consultation
                </a>
              </div>

              {/* Availability Badge */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-sm text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                  In Production · Ships 10–20 Business Days
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-slate-500">Custom: contact for lead time</span>
              </div>

              {/* Compatible Machines */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Compatible with</p>
                <div className="flex flex-wrap gap-1.5">
                  {COMPATIBLE_BRANDS.map((b) => (
                    <span key={b} className="text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                      {b}
                    </span>
                  ))}
                  <span className="text-xs bg-white border border-dashed border-slate-300 text-slate-400 px-2.5 py-1 rounded-full font-medium">
                    + others
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PERFORMANCE STATS STRIP ─────────────────────────────────── */}
      <section className="bg-[#003366] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{s.value}</span>
                  <span className="text-sm font-bold text-blue-300">{s.unit}</span>
                </div>
                <p className="text-xs text-blue-300 font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KEY FEATURES ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Product Engineering</p>
            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
              Why Engineers Specify Sureay Log-Saw Blades
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Every performance claim is backed by measurable specification data. We don't sell blades — we guarantee uptime.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#003366]/30 hover:shadow-lg rounded-2xl p-6 transition-all duration-300 cursor-default"
              >
                {/* Tag line */}
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{f.tag}</p>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003366]/10 text-[#003366] flex items-center justify-center flex-shrink-0 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug pt-0.5">{f.title}</h3>
                </div>

                {/* Body */}
                <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#003366] rounded-b-2xl group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ENGINEERING SIZING TABLE ───────────────────────────────── */}
      <LogSawSizingTable />

      {/* ── 6. APPLICATIONS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left — Intro */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Industries Served</p>
              <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
                Trusted Across Paper-Converting Operations
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                From single-ply facial tissue to 3-ply kitchen towels and industrial jumbo-roll slitting, Sureay blades
                operate in some of the highest-speed converting environments in Asia, Europe, and North America.
              </p>
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 text-sm font-bold text-[#003366] hover:text-[#FF6600] transition-colors group">
                  Discuss your application
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Link>
            </div>

            {/* Right — Application Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {APPLICATIONS.map((a, i) => (
                <div key={i} className="group flex items-start gap-3 bg-slate-50 hover:bg-[#003366] border border-slate-200 hover:border-[#003366] rounded-xl px-5 py-4 transition-all duration-300 cursor-default">
                  <div className="w-2 h-2 rounded-full bg-[#003366] group-hover:bg-[#FF6600] mt-1.5 flex-shrink-0 transition-colors duration-300" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-white transition-colors">{a.industry}</p>
                    <p className="text-xs text-slate-500 group-hover:text-blue-200 mt-0.5 transition-colors">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. MANUFACTURING PROCESS ───────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quality Assurance</p>
            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-3">
              6-Stage Manufacturing Process
            </h2>
            <p className="text-slate-500 text-[15px]">Every blade is traceable from raw billet to final packing. Inspection records on request.</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-[#003366]/30 transition-all duration-300">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-[#003366]/10 leading-none select-none">{step.num}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>

                {/* Connector dot */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border-2 border-white shadow z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* QC Badges row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              "ISO 9001:2015 Certified",
              "Material Test Report",
              "Hardness Certificate",
              "Dimensional Report",
              "Surface Finish Report",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
                <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-xs font-semibold text-slate-700">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LEAD GENERATION CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-[#003366] relative overflow-hidden">
        {/* Subtle dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Ready to Order?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Get a Custom Quote in 24 Hours
          </h2>
          <p className="text-blue-200 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Send us your machine model, blade OD, bore size, and annual consumption. We'll respond with a
            competitive price, lead time, and — if needed — a free sample blade for your trial run.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <a className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#e55a00] text-white font-bold rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Request a Free Quote
              </a>
            </Link>
            <a
              href="https://wa.me/8618838100728"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-bold rounded-xl text-base transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Us
            </a>
          </div>
          {/* Micro-trust */}
          <p className="text-blue-400 text-xs mt-6">
            No obligation · Responds within 1 business day · Factory-direct pricing
          </p>
        </div>
      </section>

      {/* ── 9. RELATED BLADES ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Continue Browsing</p>
              <h2 className="text-2xl font-black text-slate-900">Related Blade Products</h2>
            </div>
            <Link href="/products/blades">
              <a className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#003366] hover:text-[#FF6600] transition-colors group">
                View All Blades
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                id: "paper-cutting-blades",
                name: "Paper Cutting Blades",
                desc: "Guillotine and industrial paper cutting blades for sheeting and trimming operations.",
                image: "/images/products/product.webp",
                tag: "Paper Industry",
              },
              {
                id: "alloy-blades",
                name: "Industrial Alloy Blades",
                desc: "High-performance alloy steel blades for versatile industrial cutting applications.",
                image: "/images/products/blades/11-2-2_circular-blade_01.webp",
                tag: "Alloy Blades",
              },
              {
                id: "granulator-blades",
                name: "Granulator Blades",
                desc: "Precision rotor and stator blades for plastic granulators and size-reduction machinery.",
                image: "/images/products/product.webp",
                tag: "Recycling",
              },
            ].map((r) => (
              <Link key={r.id} href={`/products/blades/${r.id}`}>
                <a className="group block bg-white border border-slate-200 hover:border-[#003366]/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 bg-slate-50 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{r.tag}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#003366] transition-colors">
                      {r.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{r.desc}</p>
                    <p className="mt-3 text-xs font-bold text-[#003366] group-hover:text-[#FF6600] transition-colors inline-flex items-center gap-1">
                      View Details
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
