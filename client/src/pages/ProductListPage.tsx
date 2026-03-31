/*
 * BladeListPage.tsx — "Industrial Blade Catalogue"
 * Swiss Brutalist · High-End Corporate Industrial
 * Zero radius · No shadows · Deep Navy + White palette
 */

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Link } from "wouter";
import { blades, type BladeCategoryType } from "@/data/blades";
import ProductGrid from "@/components/product/ProductGrid";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import ContactRFQ from "@/components/home/ContactRFQ";
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
      { value: "shredder_blades", label: "Shredder Blades" },
      { value: "granulator_blades", label: "Granulator Blades" },
    ],
  },
  {
    groupLabel: "Paper & Tissue Converting",
    items: [
      { value: "log_saw_blades", label: "Log Saw Blades" },
      { value: "trim_cut_blades", label: "Paper Cutting & Trim" },
    ],
  },
  {
    groupLabel: "Slitting & Converting",
    items: [{ value: "slitter_knives", label: "Slitter Knives" }],
  },
  {
    groupLabel: "Metal Processing",
    items: [{ value: "metal_processing", label: "Metal Processing Blades" }],
  },
  {
    groupLabel: "New Energy",
    items: [{ value: "battery_precision", label: "Battery Precision Blades" }],
  },
];

const FACTORY_IMAGES = [
  {
    src: "/images/process/premium-steel-selection.webp",
    ref: "REF: PREMIUM STEEL SELECTION",
    alt: "Premium Steel Selection",
  },
  {
    src: "/images/process/vacuum-heat-treatment.webp",
    ref: "REF: VACUUM HEAT TREATMENT",
    alt: "Vacuum Heat Treatment",
  },
  {
    src: "/images/process/cnc-precision-grinding.webp",
    ref: "REF: CNC PRECISION GRINDING",
    alt: "CNC Precision Grinding",
  },
  {
    src: "/images/process/quality-control.webp",
    ref: "REF: RIGOROUS QUALITY CONTROL",
    alt: "Rigorous Quality Control",
  },
];

export default function BladeListPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    BladeCategoryType | "all"
  >("all");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"featured" | "az">("featured");
  const [filterTop, setFilterTop] = useState(74);
  const listSectionRef = useRef<HTMLElement | null>(null);
  const didMountRef = useRef<boolean>(false);
  const filterScrollRef = useRef(0);

  // Mirror navbar hide/show logic so filter bar tracks navbar position
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setFilterTop(74);
      } else if (y > filterScrollRef.current + 4) {
        setFilterTop(0);
      } else if (y < filterScrollRef.current - 4) {
        setFilterTop(74);
      }
      filterScrollRef.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredBlades = blades.filter(b =>
    selectedCategory === "all" ? true : b.category === selectedCategory
  );

  const sortedBlades =
    sortOrder === "az"
      ? [...filteredBlades].sort((a, b) => a.name.localeCompare(b.name))
      : filteredBlades;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    listSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title="Industrial Blades & Cutting Tools"
        description="Browse Sureay's full catalogue of precision shredder blades, granulator knives and OEM cutting tools. ISO 9001:2015 certified. Custom engineering available."
        canonicalUrl="/products"
        keywords="industrial blades catalog, cutting tools, rotary blades, shredder knives, granulator blades"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blades & Knives", url: "/products" },
        ]}
      />
      <Navbar />

      {/* Navbar-height offset + breadcrumb bar */}
      <div className="pt-[74px]">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blades & Knives" }]}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 1 — Technical Hero (Left Navy / Right Image)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-slate-200 h-[420px] lg:h-[500px] overflow-hidden">
        {/* Full-bleed background image */}
        <img
          src="/images/hero/cnc-machine-produce-blades.webp"
          alt="Industrial Blades & Cutting Tools — Sureay Machinery"
          className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-75"
          width={1920}
          height={500}
          decoding="async"
        />

        {/* Navy panel — diagonal right edge via clip-path */}
        <div
          className="absolute inset-y-0 left-0 h-full bg-[#001f4d] flex flex-col justify-between pl-12 pr-24 sm:pl-20 sm:pr-32 lg:pl-28 lg:pr-40 py-8 lg:py-16 w-full lg:w-[62%]"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
          }}
        >
          <div>
            <p className="font-mono text-[10px] text-white/40 tracking-[0.35em] uppercase mb-8">
              [ PRODUCT CATALOGUE — INDUSTRIAL BLADES ]
            </p>

            <h1 className="text-[clamp(1.75rem,6vw,3.25rem)] font-black text-white uppercase tracking-tight leading-[1.0] mb-8">
              Industrial
              <br />
              Blades &amp;
              <br />
              Cutting Tools
            </h1>

            <div className="border-l-4 border-white/30 pl-5 max-w-xl mb-10">
              <p className="text-white/70 text-base leading-relaxed">
                Premium alloy steel blades for recycling, paper, and converting
                industries — engineered for maximum wear resistance and extended
                service life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 2 + 3 — Filter Bar + Full-Width Product Grid
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── Sticky wrapper: bar + panel track navbar show/hide ────────── */}
      <div
        className="sticky z-30 transition-[top] duration-300 ease-in-out"
        style={{ top: filterTop }}
      >
        {/* Filter / Sort Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between py-3 gap-4">
              <button
                onClick={() => setFilterOpen(o => !o)}
                className={`inline-flex items-center gap-2 font-mono text-[12px] font-bold tracking-[0.2em] uppercase border px-4 py-2 transition-colors ${
                  filterOpen || selectedCategory !== "all"
                    ? "bg-[#001f4d] text-white border-[#001f4d]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#001f4d] hover:text-[#001f4d]"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6h18M7 12h10M11 18h2"
                  />
                </svg>
                Filter
                {selectedCategory !== "all" && (
                  <span className="bg-white text-[#001f4d] text-[10px] font-black px-1.5 py-0.5 leading-none">
                    1
                  </span>
                )}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-5">
                <p className="font-mono text-[11px] text-slate-400 tracking-[0.3em] uppercase hidden sm:block">
                  {filteredBlades.length} Product
                  {filteredBlades.length !== 1 ? "s" : ""}
                </p>
                <select
                  value={sortOrder}
                  onChange={e =>
                    setSortOrder(e.target.value as "featured" | "az")
                  }
                  className="font-mono text-[11px] text-slate-500 uppercase tracking-widest border border-slate-200 bg-white px-3 py-1.5 rounded-none focus:outline-none focus:border-[#001f4d] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="az">Sort: A → Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel — inside sticky so always visible */}
        <div
          className={`overflow-hidden transition-all duration-300 bg-slate-50 border-b border-slate-200 ${filterOpen ? "max-h-[300px]" : "max-h-0"}`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
            <div className="flex flex-wrap gap-2 items-center">
              {FILTER_GROUPS.flatMap(g => g.items).map(item => {
                const count =
                  item.value === "all"
                    ? blades.length
                    : blades.filter(b => b.category === item.value).length;
                if (item.value !== "all" && count === 0) return null;
                const isActive = selectedCategory === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSelectedCategory(item.value);
                      setFilterOpen(false);
                      if (item.value !== "all") {
                        gtagEvent("view_item_list", {
                          event_category: "blade_filter",
                          item_list_name: item.label,
                          blade_category: item.value,
                        });
                      }
                    }}
                    className={`px-4 py-2 font-mono text-[12px] font-bold tracking-[0.12em] uppercase border transition-none ${
                      isActive
                        ? "bg-[#001f4d] text-white border-[#001f4d]"
                        : "bg-white text-slate-500 border-slate-200 hover:border-[#001f4d] hover:text-[#001f4d]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`ml-2 text-[11px] font-black ${isActive ? "text-white/50" : "text-slate-300"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
              {/* Clear filter — inline with chips */}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setFilterOpen(false);
                  }}
                  className="px-4 py-2 font-mono text-[12px] font-bold tracking-[0.12em] uppercase border border-dashed border-slate-300 text-slate-400 hover:border-[#001f4d] hover:text-[#001f4d] inline-flex items-center gap-1.5 transition-colors"
                >
                  Clear ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid Section ─────────────────────────────────────── */}
      <section
        id="products"
        ref={listSectionRef}
        className="border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-14">
          <ProductGrid
            blades={sortedBlades}
            layout="grid"
            onShowAll={() => setSelectedCategory("all")}
          />
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
                Your Trusted Industrial
                <br />
                Blade Manufacturer
              </h2>
              <div className="border-l-4 border-[#001f4d] pl-6 space-y-5">
                <p className="text-slate-600 text-base leading-relaxed">
                  At Sureay, we don't just supply blades — we engineer cutting
                  solutions. With over 15 years of experience in metallurgical
                  processing and precision manufacturing, we produce
                  high-performance machine knives for the recycling, paper
                  converting, and plastic processing industries.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Whether you need high-wear shredder rotor knives, precision
                  log saw blades, or custom guillotine shears, our in-house
                  production ensures strict quality control from raw material
                  selection to final edge grinding. Every batch undergoes
                  rigorous CMM inspection to achieve the perfect balance of
                  hardness and toughness.
                </p>
              </div>
              <div className="border-t border-slate-200 mt-10 pt-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">
                    Facility
                  </p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">
                    15,000 m²
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">
                    Founded
                  </p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">
                    Est. 2008
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">
                    Standard
                  </p>
                  <p className="font-black text-sm text-[#001f4d] uppercase">
                    ISO 9001
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 4-Image Grid with Caption Plates */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[400px] lg:min-h-0">
              {FACTORY_IMAGES.map(img => (
                <div
                  key={img.ref}
                  className="relative overflow-hidden bg-slate-100 border border-slate-200 group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-75 transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
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
      <ContactRFQ />

      <Footer />
    </div>
  );
}
