/*
 * About.tsx — "Swiss Brutalist Heavy Industry" | Sureay Machinery
 * Edge-to-Edge hero · Count-up stats · Production Epochs · Architectural Sign-off CTA
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";

// ── Count-Up Component ───────────────────────────────────────────────────────

function CountUp({
  to,
  duration = 1800,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  const display = to >= 1000 ? val.toLocaleString() : val.toString();
  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { to: 15,    suffix: "+", label: "Years of Experience",     sub: "Est. 2008"       },
  { to: 10000, suffix: "+", label: "Blade Designs Delivered", sub: "Active Variants"  },
  { to: 98,    suffix: "%", label: "Client Retention Rate",   sub: "Satisfaction"     },
  { to: 50,    suffix: "+", label: "Countries Served",        sub: "Global Coverage"  },
];

const EPOCHS = [
  {
    year: "2008",
    title: "First Blade Shipped",
    desc: "Founded in Ma'anshan, Anhui. 500 m² workshop. 12 founding engineers. First industrial blade delivered.",
  },
  {
    year: "2012",
    title: "5,000 M² CNC Grid Online",
    desc: "Vacuum heat treatment furnaces and CNC grinding lines commissioned. Southeast Asia export initiated.",
  },
  {
    year: "2016",
    title: "ISO 9001 Protocol Active",
    desc: "ISO 9001:2015 certification achieved. OEM partnerships established with European machine builders.",
  },
  {
    year: "2020",
    title: "15,000 M² Smart Factory",
    desc: "Relocated to modern facility. 20+ multi-axis CNC centers, metallurgical lab, and CMM inspection stations.",
  },
  {
    year: "2024",
    title: "50+ Countries Deployed",
    desc: "10,000+ blade design variants active. Serving tissue, plastics, and metal processing sectors worldwide.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Precision Manufacturing",
    desc: "State-of-the-art CNC machining centers and vacuum heat treatment facilities ensure consistent dimensional accuracy and metallurgical integrity in every blade produced.",
  },
  {
    num: "02",
    title: "Global Deployment",
    desc: "Engineered logistics and responsive field support serve industrial operators in 50+ countries with full traceability documentation on every shipment.",
  },
  {
    num: "03",
    title: "OEM Integration",
    desc: "Embedded co-engineering with OEM machine builders and end-users to define steel grade, heat treatment schedule, and edge geometry for maximum uptime.",
  },
  {
    num: "04",
    title: "Quality Assurance",
    desc: "ISO 9001:2015 certified process control. Full CMM dimensional inspection, hardness verification, and material traceability on every production batch.",
  },
];

const CERTIFICATIONS = [
  { label: "ISO 9001:2015",    sub: "Quality Management"    },
  { label: "CE Certified",     sub: "European Conformity"   },
  { label: "SGS Audited",      sub: "Third-Party Verified"  },
  { label: "RoHS Compliant",   sub: "Hazardous Materials"   },
  { label: "Global Logistics", sub: "Door-to-Door"          },
  { label: "CMM Verified",     sub: "Dimensional Report"    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Sureay — 15+ Years of Blade Engineering"
        description="ISO 9001:2015 certified OEM blade manufacturer since 2008. 10,000+ custom designs, 98% client retention, serving 50+ countries worldwide."
        canonicalUrl="/about"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO — The Structural Anvil
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-[74px]">

        {/* Main split — 42 / 58 */}
        <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[700px]">

          {/* Left — Solid Text Panel */}
          <motion.div
            className="flex flex-col px-5 sm:px-10 lg:px-20 py-10 lg:py-16 bg-white lg:w-[42%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-visible"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Main content — fills vertical space and centers itself */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-slate-400 mb-6">
                About Sureay Machinery
              </p>

              <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-black text-[#001f4d] leading-none tracking-tight uppercase mb-8">
                Engineering<br />Blade<br />Excellence
              </h1>

              <div className="w-14 h-[3px] bg-[#001f4d] mb-8" />

              <motion.p
                className="text-slate-600 text-base leading-relaxed max-w-sm"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Xunrui (Sureay) Machinery specializes in high-performance industrial blades, precision machine knives, and recycling equipment — engineered for the world's most demanding production environments since 2008.
              </motion.p>
            </div>

          </motion.div>

          {/* Right — Grand Factory Image */}
          <div className="relative flex-1 overflow-hidden min-h-[380px] lg:min-h-0">
            <img
              src="/images/about/factory.webp"
              alt="Sureay factory floor overview — Ma'anshan facility"
              className="absolute inset-0 w-full h-full object-cover contrast-105"
              width={1920}
              height={1078}
              decoding="async"
            />
          </div>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          2. STATS STRIP — Heavy Dashboard with Count-Up
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={[
                  "px-6 md:px-8 py-12 flex flex-col gap-1.5",
                  i < 3              ? "border-r border-slate-200" : "",
                  i === 2 || i === 3 ? "border-t border-slate-200 md:border-t-0" : "",
                ].join(" ")}
              >
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                  {s.sub}
                </p>
                <p className="text-[clamp(2.25rem,7vw,3.75rem)] font-black text-[#001f4d] leading-none tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-500 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase px-8 pb-3 text-right">
            * Based on 2024 internal records
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. FACILITY — Engineering Bento Grid (Cold Documentary Filter)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3">
              Manufacturing Infrastructure
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d] uppercase leading-tight">
              Our Facility
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-xl leading-relaxed">
              15,000 m² facility in Ma'anshan housing advanced CNC machining centers, vacuum heat treatment furnaces, and comprehensive metrology equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">

            {/* Main: Wide factory floor — use full workshop establishing shot */}
            <div className="lg:col-span-7 relative overflow-hidden group aspect-[4/3] lg:aspect-auto lg:row-span-2 border border-slate-200">
              <img
                src="/images/about/factory-00.webp"
                alt="Sureay CNC machining workshop — full floor establishing shot"
                className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-90 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width={1920}
                height={1233}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[#001f4d]">CNC Machining Workshop</p>
              </div>
            </div>

            {/* Top-right: CNC grinding macro — REPLACE WITH MACRO: extreme close-up of grinding wheel on blade edge */}
            <div className="lg:col-span-5 relative overflow-hidden group aspect-video border border-slate-200">
              <img
                src="/images/process/cnc-precision-grinding.webp"
                alt="CNC precision grinding — macro close-up of wheel contact on blade edge"
                className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-[1.2] saturate-[0.7] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width={600}
                height={340}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#001f4d] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-white">Precision Grinding</p>
              </div>
            </div>

            {/* Bottom-right pair — REPLACE WITH MACROS: furnace glow / CMM probe tip */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {/* Heat Treatment — REPLACE WITH MACRO: furnace chamber, glowing blade cross-section */}
              <div className="relative overflow-hidden group aspect-square border border-slate-200">
                <img
                  src="/images/process/heat-treatment.webp"
                  alt="Vacuum heat treatment — macro furnace interior with blade batch"
                  className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-[1.2] saturate-[0.65] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#001f4d]">Heat Treatment</p>
                </div>
              </div>
              {/* QC Inspection — REPLACE WITH MACRO: CMM probe tip touching blade surface */}
              <div className="relative overflow-hidden group aspect-square border border-slate-200">
                <img
                  src="/images/common/Quality-Inspection.webp"
                  alt="CMM dimensional inspection — macro probe contact on blade surface"
                  className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-[1.2] saturate-[0.65] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#001f4d]">CMM Quality Control</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. OUR STORY — The Production Epochs (Horizontal)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Header + Statement */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Company History
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <h2 className="text-3xl md:text-4xl font-black text-[#001f4d] uppercase leading-tight">
                Production Epochs
              </h2>
              <div className="border-l-4 border-[#001f4d] pl-5">
                <p className="text-base lg:text-lg font-bold text-[#001f4d] leading-snug">
                  "We don't just supply blades — we are your strategic partner in maximizing uptime and cutting performance."
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Epoch Grid */}
          <div className="relative">
            {/* Continuous horizontal rail */}
            <div className="absolute top-0 left-0 right-0 border-t-2 border-slate-200 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
              {EPOCHS.map((epoch, i) => (
                <div
                  key={i}
                  className={[
                    "relative pt-8 pb-6 pr-5",
                    i < EPOCHS.length - 1 ? "border-r border-slate-200" : "",
                    i > 0                 ? "pl-5 md:pl-6" : "",
                    i < 2 && "border-b border-slate-200 md:border-b-0",
                  ].join(" ")}
                >
                  {/* Square marker on the rail */}
                  <div
                    className={`absolute top-0 left-0 -translate-y-1/2 w-2.5 h-2.5 hidden md:block ${
                      i === EPOCHS.length - 1 ? "bg-[#001f4d]" : "bg-white border-2 border-slate-300"
                    }`}
                  />

                  {/* Ghost year */}
                  <p className="text-6xl font-black text-slate-100 leading-none mb-3 select-none tabular-nums">
                    {epoch.year}
                  </p>

                  {/* Milestone title */}
                  <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#001f4d] leading-snug mb-2.5">
                    {epoch.title}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {epoch.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. CORE VALUES — High-End Exhibition Layout
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3">
              Our Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f4d] uppercase">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-slate-200">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="border-r border-b border-slate-200 px-8 py-10 lg:px-10 lg:py-12 flex items-start gap-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-shrink-0 w-[5.5rem] text-right select-none -mt-2">
                  <span className="text-[6rem] font-black leading-none text-slate-100">
                    {v.num}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-black text-[#001f4d] uppercase tracking-wide leading-tight mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CERTIFICATIONS — Dog Tag Matrix
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3">
              Compliance & Standards
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#001f4d] uppercase">
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="border border-slate-300 bg-white px-4 py-5 flex flex-col items-center justify-center gap-1.5 hover:border-[#001f4d] hover:bg-[#001f4d] group transition-colors cursor-default"
              >
                <span className="text-[11px] font-black uppercase tracking-wide text-[#001f4d] group-hover:text-white text-center leading-tight transition-colors">
                  {cert.label}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 group-hover:text-white/60 text-center transition-colors">
                  {cert.sub}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. OEM PROCESS PIPELINE
      ═══════════════════════════════════════════════════════════════════ */}
      <IndustryOemPipeline />

      <Footer />
    </div>
  );
}
