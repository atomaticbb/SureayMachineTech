/*
 * BladeListPage.tsx — "Industrial Blade Catalogue"
 * Swiss Brutalist · High-End Corporate Industrial
 * Zero radius · No shadows · Deep Navy + White palette
 */

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "wouter";
import { blades, type BladeCategoryType } from "@/data/blades";
import ProductGrid from "@/components/product/ProductGrid";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import { gtagEvent } from "@/lib/gtag";

// ── Application-grouped Filter Taxonomy ────────────────────────────────────
type FilterItem = { value: BladeCategoryType | "all"; label: string };
const FILTER_GROUPS: { groupLabel: string; items: FilterItem[] }[] = [
  {
    groupLabel: "All Products",
    items: [{ value: "all", label: "All Blades" }],
  },
  {
    groupLabel: "Recycling & Waste Processing",
    items: [
      { value: "shredder_blades",   label: "Shredder Blades" },
      { value: "granulator_blades", label: "Granulator Blades" },
      { value: "alloy_blades",      label: "Alloy Blades" },
    ],
  },
  {
    groupLabel: "Paper Industry",
    items: [
      { value: "tissue_paper_blades",  label: "Tissue Paper Blades" },
      { value: "paper_cutting_blades", label: "Paper Cutting Blades" },
    ],
  },
  {
    groupLabel: "Slitting & Converting",
    items: [
      { value: "rotary_blades", label: "Rotary Cutter Blades" },
    ],
  },
  {
    groupLabel: "Other",
    items: [{ value: "other_blades", label: "Other Blades" }],
  },
];

const FACTORY_IMAGES = [
  { src: "/images/process/premium-steel-selection.webp", ref: "REF: PREMIUM STEEL SELECTION",   alt: "Premium Steel Selection" },
  { src: "/images/process/heat-treatment.webp",          ref: "REF: VACUUM HEAT TREATMENT",      alt: "Vacuum Heat Treatment" },
  { src: "/images/process/cnc-precision-grinding.webp",  ref: "REF: CNC PRECISION GRINDING",     alt: "CNC Precision Grinding" },
  { src: "/images/process/quality-control.webp",         ref: "REF: RIGOROUS QUALITY CONTROL",   alt: "Rigorous Quality Control" },
];

export default function BladeListPage() {
  const [selectedCategory, setSelectedCategory] = useState<BladeCategoryType | "all">("all");
  const listSectionRef = useRef<HTMLElement | null>(null);
  const didMountRef = useRef<boolean>(false);

  const filteredBlades = blades.filter((b) =>
    selectedCategory === "all" ? true : b.category === selectedCategory
  );

  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return; }
    listSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 1 — Technical Hero (Left Navy / Right Image)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-[74px] border-b border-slate-200">
        <div className="flex flex-col lg:flex-row">

          {/* Left: Navy Text Panel */}
          <div className="lg:w-[45%] flex-shrink-0 bg-[#001f4d] px-10 sm:px-14 lg:px-16 py-8 lg:py-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">

            <div>
              <p className="font-mono text-[10px] text-white/40 tracking-[0.35em] uppercase mb-8">
                [ PRODUCT CATALOGUE — INDUSTRIAL BLADES ]
              </p>

              <h1 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.0] mb-8">
                Industrial<br />Blades &amp;<br />Cutting Tools
              </h1>

              <div className="border-l-4 border-white/30 pl-5 max-w-xl mb-10">
                <p className="text-white/70 text-base leading-relaxed">
                  Premium alloy steel blades for recycling, paper, and converting industries — engineered for maximum wear resistance and extended service life.
                </p>
              </div>
            </div>
{/* 
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#products"
                className="bg-white text-[#001f4d] px-7 py-3.5 font-black text-sm uppercase tracking-[0.15em] hover:bg-white/90 transition-colors inline-block text-center"
              >
                Explore Products ↓
              </a>
              <Link href="/contact">
                <a className="border-2 border-white/40 text-white px-7 py-3.5 font-black text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-[#001f4d] transition-all duration-300 inline-block text-center">
                  Request Quote ↗
                </a>
              </Link>
            </div> */}

          </div>

          {/* Right: Image Viewport */}
          <div className="relative flex-1 overflow-hidden min-h-[320px] lg:min-h-0">
            <img
              src="/images/hero/blades-hero-04.webp"
              alt="Industrial Blades & Cutting Tools — Sureay Machinery"
              className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-75"
            />
            <div className="absolute bottom-0 left-0 bg-white border-t border-r border-slate-200 px-5 py-3">
              <span className="font-mono text-[10px] font-bold text-[#001f4d] tracking-widest uppercase">
                FIG. 1.0 — SUREAY HIGH-PERFORMANCE BLADE RANGE
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 2 + 3 — Index Sidebar + Archive Matrix
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="products" ref={listSectionRef} className="border-b border-slate-200">
        <div className="lg:grid lg:grid-cols-12">

          {/* ── LEFT: Sidebar Filter ─────────────────────────────────────── */}
          <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200">

            {/* ── MOBILE: Horizontal Scrollable Strip ──────────────────────── */}
            <div className="lg:hidden border-b border-slate-200">
              <div className="px-6 pt-4 pb-2">
                <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em] uppercase">
                  [ FILTER BY APPLICATION ]
                </p>
              </div>
              <div className="flex overflow-x-auto snap-x gap-2 px-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {FILTER_GROUPS.flatMap((g) => g.items).map((item) => {
                  const count =
                    item.value === "all"
                      ? blades.length
                      : blades.filter((b) => b.category === item.value).length;
                  if (item.value !== "all" && count === 0) return null;
                  const isActive = selectedCategory === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        setSelectedCategory(item.value);
                        if (item.value !== "all") {
                          gtagEvent("view_item_list", {
                            event_category: "blade_filter",
                            item_list_name: item.label,
                            blade_category: item.value,
                          });
                        }
                      }}
                      className={`snap-start flex-shrink-0 px-4 py-2 font-mono text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap border transition-none ${
                        isActive
                          ? "bg-[#001f4d] text-white border-[#001f4d]"
                          : "bg-white text-slate-500 border-slate-200 hover:border-[#001f4d] hover:text-[#001f4d]"
                      }`}
                    >
                      {item.label}
                      <span className={`ml-2 text-[10px] font-black ${isActive ? "text-white/50" : "text-slate-300"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedCategory !== "all" && (
                <div className="px-6 pb-3">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="font-mono text-[9px] text-slate-400 tracking-widest uppercase hover:text-[#001f4d] transition-colors"
                  >
                    [ CLEAR FILTER × ]
                  </button>
                </div>
              )}
            </div>

            {/* ── DESKTOP: Sticky Grouped Sidebar ──────────────────────────── */}
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-[74px]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                  <p className="font-mono text-[11px] text-slate-900 tracking-[0.35em] uppercase">
                    [ FILTER BY APPLICATION ]
                  </p>
                </div>

                {/* Filter Groups */}
                <div className="px-4 py-5 space-y-6">
                  {FILTER_GROUPS.map((group) => {
                    const hasItems = group.items.some((item) =>
                      item.value === "all" || blades.some((b) => b.category === item.value)
                    );
                    if (!hasItems) return null;

                    return (
                      <div key={group.groupLabel}>
                        {group.groupLabel !== "All Products" && (
                          <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-2 px-1">
                            {group.groupLabel}
                          </p>
                        )}
                        <div className="flex flex-col gap-px border border-slate-200">
                          {group.items.map((item) => {
                            const count =
                              item.value === "all"
                                ? blades.length
                                : blades.filter((b) => b.category === item.value).length;
                            if (item.value !== "all" && count === 0) return null;
                            const isActive = selectedCategory === item.value;
                            return (
                              <button
                                key={item.value}
                                onClick={() => {
                                  setSelectedCategory(item.value);
                                  if (item.value !== "all") {
                                    gtagEvent("view_item_list", {
                                      event_category: "blade_filter",
                                      item_list_name: item.label,
                                      blade_category: item.value,
                                    });
                                  }
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-left transition-none border-b border-slate-200 last:border-b-0 ${
                                  isActive
                                    ? "bg-[#001f4d] text-white"
                                    : "bg-white text-slate-500 hover:bg-slate-50 hover:text-[#001f4d]"
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className={`font-black text-[10px] ${isActive ? "text-white/60" : "text-slate-300"}`}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clear Filter */}
                {selectedCategory !== "all" && (
                  <div className="px-4 pb-5 border-t border-slate-200 pt-4">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="w-full font-mono text-[10px] text-slate-400 tracking-widest uppercase hover:text-[#001f4d] transition-colors text-center"
                    >
                      [ CLEAR FILTER × ]
                    </button>
                  </div>
                )}

              </div>
            </div>

          </aside>

          {/* ── RIGHT: Product Grid ──────────────────────────────────────── */}
          <div className="lg:col-span-9">

            {/* Grid Header */}
            <div className="px-8 py-4 border-b border-slate-200 flex items-center justify-between">
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em] uppercase">
                [ BLADE RANGE — {filteredBlades.length} PRODUCT{filteredBlades.length !== 1 ? "S" : ""} ]
              </p>
            </div>

            <div className="p-6 lg:p-8">
              <ProductGrid
                blades={filteredBlades}
                layout="list"
                onShowAll={() => setSelectedCategory("all")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 4 — Factory Showcase (Left Text / Right 4-Image Grid)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

            {/* Left: SEO Text */}
            <div className="flex flex-col justify-center">
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em] uppercase mb-6">
                [ MANUFACTURING CAPABILITY ]
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d] uppercase tracking-tight leading-tight mb-8">
                Your Trusted Industrial<br />Blade Manufacturer<br />in China
              </h2>
              <div className="border-l-4 border-[#001f4d] pl-6 space-y-5">
                <p className="text-slate-600 text-base leading-relaxed">
                  At Sureay, we don't just supply blades — we engineer cutting solutions. With over 15 years of experience in metallurgical processing and precision manufacturing, we produce high-performance machine knives for the recycling, paper converting, and plastic processing industries.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Whether you need high-wear shredder rotor knives, precision log saw blades, or custom guillotine shears, our in-house production ensures strict quality control from raw material selection to final edge grinding. Every batch undergoes rigorous CMM inspection to achieve the perfect balance of hardness and toughness.
                </p>
              </div>
              <div className="border-t border-slate-200 mt-10 pt-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">Facility</p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">15,000 m²</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">Founded</p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">Est. 2008</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">Standard</p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">ISO 9001</p>
                </div>
              </div>
            </div>

            {/* Right: 4-Image Grid with Caption Plates */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[400px] lg:min-h-0">
              {FACTORY_IMAGES.map((img) => (
                <div key={img.ref} className="relative overflow-hidden bg-slate-100 border border-slate-200 group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-75 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 5 — OEM Conversion Funnel
      ═══════════════════════════════════════════════════════════════════ */}
      <IndustryOemPipeline />

      <Footer />
    </div>
  );
}
