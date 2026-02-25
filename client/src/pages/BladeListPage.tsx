/*
 * Blade List Page - Industrial Blades & Cutting Tools
 * Static hero (LCP-optimized) + application-grouped sidebar filter
 */

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "wouter";
import { blades, type BladeCategoryType } from "@/data/blades";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import OEMConversionFunnel from "@/components/sections/OEMConversionFunnel";

// ── Application-grouped Filter Taxonomy ────────────────────────────────────
// B2B buyers search by application — group categories by industrial use case
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

export default function BladeListPage() {
  const [selectedCategory, setSelectedCategory] = useState<BladeCategoryType | "all">("all");
  const listSectionRef = useRef<HTMLElement | null>(null);
  const didMountRef = useRef<boolean>(false);

  const filteredBlades = blades.filter((b) =>
    selectedCategory === "all" ? true : b.category === selectedCategory
  );

  // Smooth-scroll to product list when filter changes (skip initial mount)
  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return; }
    listSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Industrial Blades & Cutting Tools"
            className="w-full h-full object-cover"
            src="/images/hero/blades-hero-04.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/55 to-slate-900/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32 flex flex-col justify-center h-full">
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <Breadcrumbs
              variant="dark"
              className="mb-4"
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Blades" },
              ]}
            />

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {"Industrial Blades\n& Cutting Tools"}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed font-light">
              Premium alloy steel blades for recycling, paper, and converting industries — engineered for maximum wear resistance and extended service life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <a
                className="w-full sm:w-auto bg-[#003366] hover:bg-white text-white hover:text-[#003366] px-8 py-3.5 rounded-md font-semibold text-center transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 transform inline-block"
                href="#products"
              >
                Explore Products
              </a>
              <Link href="/contact">
                <a className="w-full sm:w-auto bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-[#003366] px-8 py-3.5 rounded-md font-semibold text-center transition-all duration-300 hover:scale-105 transform shadow-2xl inline-block">
                  Request Quote
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products: Grouped Sidebar + Grid ──────────────────────────────── */}
      <section
        id="products"
        ref={listSectionRef}
        className="py-16 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#003366] dark:text-white uppercase mb-1">
              Our Blade Range
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredBlades.length} product{filteredBlades.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Grouped Sidebar Filter ─────────────────────────────────── */}
            <aside className="w-full lg:w-60 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 sticky top-24">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                  Filter by Application
                </p>

                <div className="space-y-5">
                  {FILTER_GROUPS.map((group) => {
                    // Skip groups where every item has 0 products (except "All")
                    const hasItems = group.items.some((item) =>
                      item.value === "all" ||
                      blades.some((b) => b.category === item.value)
                    );
                    if (!hasItems) return null;

                    return (
                      <div key={group.groupLabel}>
                        {/* Group heading — only show for non-"All" groups */}
                        {group.groupLabel !== "All Products" && (
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 px-1">
                            {group.groupLabel}
                          </p>
                        )}
                        <div className="flex flex-col gap-0.5">
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
                                onClick={() => setSelectedCategory(item.value)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-all duration-150 ${
                                  isActive
                                    ? "bg-[#003366] text-white shadow-sm"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                }`}
                              >
                                <span>{item.label}</span>
                                <span
                                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                                  }`}
                                >
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

                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-[#003366] dark:hover:text-blue-400 font-semibold transition-colors pt-4 border-t border-slate-100 dark:border-slate-700"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear filter
                  </button>
                )}
              </div>
            </aside>

            {/* ── Product List ───────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                blades={filteredBlades}
                layout="list"
                onShowAll={() => setSelectedCategory("all")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Factory Showcase (Left Text, Right 4-Image Grid) ────────── */}
      <section className="py-16 lg:py-24 bg-[#f4f5f7] border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* items-stretch 是保证左右两栏高度完全一致的关键 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* ── Left Column: SEO Text ── */}
            <div className="flex flex-col justify-center py-4">
              <h2 className="text-3xl font-black text-[#003366] mb-6 leading-tight">
                Your Trusted Industrial Blades &amp; Machine Knives Manufacturer in China
              </h2>
              
              <div className="text-slate-600 text-lg leading-relaxed space-y-5">
                <p>
                  At Sureay, we don't just supply blades; we engineer cutting solutions. With over 15 years of experience in metallurgical processing and precision manufacturing, we produce high-performance machine knives for the recycling, paper converting, and plastic processing industries.
                </p>
                <p>
                  Whether you need high-wear shredder rotor knives, precision log saw blades, or custom guillotine shears, our in-house production ensures strict quality control from raw material selection to final edge grinding. We maintain tight dimensional tolerances and utilize advanced vacuum heat treatment. Every batch undergoes rigorous quality inspection to achieve the perfect balance of hardness and toughness, significantly reducing your machine downtime.
                </p>
              </div>
            </div>

            {/* ── Right Column: 4 Image Cards Grid ── */}
            {/* grid-rows-2 配合 h-full 让 4 个卡片完美等分并填满左侧文字撑起的高度 */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-5 h-full min-h-[400px] lg:min-h-0">

              {/* Card 1: Premium Steel */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group bg-slate-200">
                <img 
                  src="/images/process/premium-steel-selection.webp" // 建议替换：堆放的模具钢材图片
                  alt="Premium Steel Selection" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 深色渐变遮罩，保证白色标题清晰可见 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm sm:text-base leading-snug z-10">
                  Premium Steel Selection
                </h3>
              </div>

              {/* Card 2: Vacuum Heat Treatment */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group bg-slate-200">
                <img 
                  src="/images/process/heat-treatment.webp" // 建议替换：真空热处理炉或发红的钢材图片
                  alt="Vacuum Heat Treatment" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm sm:text-base leading-snug z-10">
                  Vacuum Heat Treatment
                </h3>
              </div>

              {/* Card 3: CNC Precision Grinding */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group bg-slate-200">
                <img 
                  src="/images/process/cnc-precision-grinding.webp" // 建议替换：数控磨床加工刀片并喷洒切削液的图片
                  alt="CNC Precision Grinding" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm sm:text-base leading-snug z-10">
                  CNC Precision Grinding
                </h3>
              </div>
              
              {/* Card 4: Rigorous Quality Control (Replaced OEM to avoid conflict) */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group bg-slate-200">
                <img 
                  src="/images/process/quality-control.webp" // 建议替换：工程师使用三坐标测量仪(CMM)或硬度计检测刀片的图片
                  alt="Rigorous Quality Control" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm sm:text-base leading-snug z-10">
                  Rigorous Quality Control
                </h3>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Seamless Custom OEM Process & CTA (unified conversion funnel) ── */}
      <OEMConversionFunnel />

      <Footer />
    </div>
  );
}
