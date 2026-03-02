/*
 * Products Hub — Industry Solution Hub
 * Unified Plastics + Paper + Food taxonomy with cross-category tab navigation.
 * Both heavy machinery and precision blade consumables coexist per industry pillar.
 */

import { Link, useSearch } from "wouter";
import { useState, useMemo } from "react";
import {
  Recycle,
  FileText,
  Utensils,
  Layers,
  ChevronRight,
  ArrowRight,
  Wrench,
  Cpu,
  Scissors,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blades } from "@/data/blades";
import { machines } from "@/data/machines";

// ─── Types ────────────────────────────────────────────────────────────────────
type TabId = "all" | "plastics" | "paper" | "food";
type ProductType = "machine" | "blade";
type PillarId = "plastics" | "paper" | "food";

interface UnifiedProduct {
  id: string;
  name: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  link: string;
  type: ProductType;
  pillar: PillarId;
  specs: { label: string; value: string }[];
}

// ─── Pillar Membership ─────────────────────────────────────────────────────────
const PILLAR_MAP: Record<PillarId, { machineIds: string[]; bladeIds: string[] }> = {
  plastics: {
    machineIds: ["copper-wire-granulator-sg400"],
    bladeIds: ["shredder-blades", "granulator-blades", "alloy-blades", "rotary-cutter-blades"],
  },
  paper: {
    machineIds: [],
    bladeIds: ["tissue-log-saw-blades", "paper-cutting-blades"],
  },
  food: {
    machineIds: [],
    // alloy-blades and rotary-cutter-blades are cross-listed for food precision cutting
    bladeIds: ["alloy-blades", "rotary-cutter-blades"],
  },
};

// ─── Build Unified Catalog ─────────────────────────────────────────────────────
function buildCatalog(): UnifiedProduct[] {
  const result: UnifiedProduct[] = [];
  const seen = new Set<string>(); // track id+pillar to avoid exact duplicates

  (Object.entries(PILLAR_MAP) as [PillarId, typeof PILLAR_MAP["plastics"]][]).forEach(
    ([pillar, { machineIds, bladeIds }]) => {
      // Machines for this pillar
      machineIds.forEach((id) => {
        const machine = machines.find((m) => m.id === id);
        if (!machine) return;
        const key = `${pillar}:${id}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({
          id: machine.id,
          name: machine.name,
          image: machine.image,
          badge: machine.badge,
          badgeColor: machine.badgeColor,
          description: machine.description,
          link: machine.link,
          type: "machine",
          pillar,
          specs: machine.specs.slice(0, 3),
        });
      });

      // Blades for this pillar
      bladeIds.forEach((id) => {
        const blade = blades.find((b) => b.id === id);
        if (!blade) return;
        const key = `${pillar}:${id}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({
          id: blade.id,
          name: blade.name,
          image: blade.image,
          badge: blade.badge,
          badgeColor: blade.badgeColor,
          description: blade.description,
          link: blade.link,
          type: "blade",
          pillar,
          specs: blade.specs.slice(0, 3),
        });
      });
    }
  );

  return result;
}

const CATALOG = buildCatalog();

// Deduplicated list for "All" tab (first occurrence of each id wins)
const ALL_PRODUCTS: UnifiedProduct[] = (() => {
  const seen = new Set<string>();
  return CATALOG.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
})();

// ─── Tab Config ───────────────────────────────────────────────────────────────
const TABS: {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  description: string;
  productTypes: string;
}[] = [
  {
    id: "all",
    label: "All Solutions",
    shortLabel: "All",
    icon: <Layers className="w-4 h-4" />,
    description: "Complete product catalog across all industry verticals.",
    productTypes: "Machinery · Blades · Consumables",
  },
  {
    id: "plastics",
    label: "Plastics Recycling & Extrusion",
    shortLabel: "Plastics",
    icon: <Recycle className="w-4 h-4" />,
    description:
      "Integrated systems for plastics recycling lines — from shredder blades and granulator knives to melt-filtration screen changers and pelletizers.",
    productTypes: "Screen Changers · Pelletizers · Shredder Blades · Granulator Knives",
  },
  {
    id: "paper",
    label: "Paper & Tissue Converting",
    shortLabel: "Paper",
    icon: <FileText className="w-4 h-4" />,
    description:
      "Precision blades for tissue converting, log saw operations, guillotine cutting, and inline packaging lines.",
    productTypes: "Log Saw Blades · Tissue Slitters · Guillotine Knives · Inline Blades",
  },
  {
    id: "food",
    label: "Food & Specialty",
    shortLabel: "Food",
    icon: <Utensils className="w-4 h-4" />,
    description:
      "Food-grade alloy blades with FDA-compliant surface treatments for poultry, bakery, seafood, and specialty processing. Custom OEM shapes available.",
    productTypes: "Food Processing Blades · Custom OEM Shapes · Hygienic Grade",
  },
];

// ─── Badge Color Map ──────────────────────────────────────────────────────────
const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-500 text-white",
  blue: "bg-blue-600 text-white",
  orange: "bg-[#FF6600] text-white",
  red: "bg-red-600 text-white",
  purple: "bg-purple-600 text-white",
  teal: "bg-teal-600 text-white",
  slate: "bg-slate-600 text-white",
};

// ─── OEM Custom Card ──────────────────────────────────────────────────────────
function OEMCustomCard() {
  return (
    <Link href="/contact">
      <div className="group relative overflow-hidden rounded-xl cursor-pointer flex flex-col min-h-[360px] bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] border border-[#FF6600]/30 hover:border-[#FF6600] shadow-xl hover:shadow-[#FF6600]/20 hover:shadow-2xl transition-all duration-400">
        {/* Blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Orange corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-[#FF6600]/80 transition-all duration-300 group-hover:border-l-[80px] group-hover:border-t-[80px]" />

        {/* Glow pulse */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#FF6600]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full p-7">
          {/* Tag */}
          <div className="mb-auto">
            <span className="inline-block text-[#FF6600] text-[9px] font-black tracking-[0.35em] uppercase border border-[#FF6600]/40 px-3 py-1 mb-5">
              CUSTOM OEM SERVICE
            </span>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FF6600]/20 border border-[#FF6600]/40 rounded flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-[#FF6600]" />
              </div>
              <h3 className="text-white font-black text-xl uppercase leading-tight">
                Custom OEM Blade
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Can't find your exact profile? Submit a CAD drawing, part number, or physical sample.
              Our metallurgy engineers will match the alloy grade, hardness, and geometry to your
              production requirements.
            </p>

            {/* Feature list */}
            <ul className="space-y-2 mb-6">
              {[
                "Any alloy: D2, SKD-11, H13, M2 HSS, Carbide",
                "Tolerance to ±0.01 mm",
                "MOQ: 1 piece for prototypes",
                "Lead time: 7–15 days standard",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-[#FF6600] mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 bg-[#FF6600] group-hover:bg-[#E55A00] px-6 py-3.5 rounded transition-colors duration-300 justify-center">
            <span className="text-white font-black text-sm uppercase tracking-wider">
              Submit Requirements
            </span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: UnifiedProduct }) {
  const badgeClass = BADGE_COLORS[product.badgeColor ?? ""] ?? "bg-slate-600 text-white";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:border-[#003366]/30 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Product type chip — top left */}
        <div className="absolute top-3 left-3">
          <span
            className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm ${
              product.type === "machine"
                ? "bg-[#003366]/90 text-white"
                : "bg-[#0a1628]/85 text-slate-200"
            }`}
          >
            {product.type === "machine" ? (
              <Cpu className="w-2.5 h-2.5" />
            ) : (
              <Scissors className="w-2.5 h-2.5" />
            )}
            {product.type === "machine" ? "MACHINERY" : "BLADE"}
          </span>
        </div>

        {/* Product badge — top right */}
        {product.badge && (
          <div className="absolute top-3 right-3">
            <span className={`text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-widest ${badgeClass}`}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-2 uppercase tracking-tight group-hover:text-[#003366] dark:group-hover:text-blue-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specs Badges */}
        {product.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-bold"
              >
                <span className="text-slate-400 dark:text-slate-500 mr-1">{spec.label}:</span>
                {spec.value}
              </div>
            ))}
          </div>
        )}

        {/* Pillar tag */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#003366]/60 dark:text-blue-400/70">
            <span className="w-1 h-1 rounded-full bg-[#FF6600] inline-block" />
            {product.pillar === "plastics"
              ? "Plastics & Extrusion"
              : product.pillar === "paper"
              ? "Paper & Tissue"
              : "Food & Specialty"}
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-2">
          <Link href={product.link}>
            <button className="w-full bg-[#003366] hover:bg-[#004488] text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
              View Specifications
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-[#FF6600] hover:text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300">
              Request Inquiry
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Products() {
  // Read ?pillar= from URL to set initial tab
  const search = useSearch();
  const initialPillar = (() => {
    const params = new URLSearchParams(search);
    const p = params.get("pillar");
    if (p === "plastics" || p === "paper" || p === "food") return p;
    return "all";
  })();

  const [activeTab, setActiveTab] = useState<TabId>(initialPillar as TabId);

  const activeTabConfig = TABS.find((t) => t.id === activeTab)!;

  // Filter products for current tab
  const displayProducts = useMemo<UnifiedProduct[]>(() => {
    if (activeTab === "all") return ALL_PRODUCTS;
    return CATALOG.filter((p) => p.pillar === activeTab);
  }, [activeTab]);

  // Inject OEM card at position 4 (0-indexed)
  const OEM_INJECT_POSITION = 4;
  type GridItem = { kind: "product"; data: UnifiedProduct } | { kind: "oem" };

  const gridItems = useMemo<GridItem[]>(() => {
    const productItems: GridItem[] = displayProducts.map((p) => ({
      kind: "product",
      data: p,
    }));
    const pos = Math.min(OEM_INJECT_POSITION, productItems.length);
    return [
      ...productItems.slice(0, pos),
      { kind: "oem" },
      ...productItems.slice(pos),
    ];
  }, [displayProducts]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          HEADER — Industry Solution Hub
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative pt-28 pb-14 overflow-hidden bg-gradient-to-br from-[#001a33] via-[#003366] to-[#001a33]">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6600]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex text-xs text-blue-300/70 mb-6 gap-2 items-center">
            <Link href="/">
              <a className="hover:text-white transition-colors">Home</a>
            </Link>
            <span className="text-white/30">›</span>
            <span className="text-white/80 font-medium">Industry Solution Hub</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              {/* Eyebrow */}
              <p className="text-[#FF6600] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">
                Dual-Core Product Ecosystem
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Industry Solution<br />
                <span className="text-[#FF6600]">Hub</span>
              </h1>
              <div className="w-16 h-[3px] bg-[#FF6600] mt-4" />
            </div>
            <p className="text-blue-200/70 text-sm leading-relaxed max-w-md text-left md:text-right">
              Machinery and precision blades — unified by industry. Select a vertical to explore complete solutions designed for your production environment.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          STICKY TAB NAVIGATION
      ════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#0f1923] border-b border-slate-200 dark:border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 whitespace-nowrap font-bold text-xs uppercase tracking-wider border-b-[3px] transition-all duration-200 flex-shrink-0 ${
                  activeTab === tab.id
                    ? "border-[#FF6600] text-[#003366] dark:text-white bg-[#FF6600]/5"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-[#003366] dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <span
                  className={
                    activeTab === tab.id
                      ? "text-[#FF6600]"
                      : "text-slate-400 dark:text-slate-500"
                  }
                >
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          PILLAR CONTEXT BANNER
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[#FF6600]">{activeTabConfig.icon}</span>
              <div>
                <p className="font-black text-[#003366] dark:text-white text-sm uppercase tracking-wide">
                  {activeTabConfig.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeTabConfig.productTypes}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg sm:text-right">
              {activeTabConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          PRODUCT GRID
      ════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">{displayProducts.length}</span>
            {" "}solutions in{" "}
            <span className="font-bold text-[#003366] dark:text-blue-300">{activeTabConfig.label}</span>
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3" />
              Machinery
            </span>
            <span className="text-slate-300 dark:text-slate-600">+</span>
            <span className="flex items-center gap-1.5">
              <Scissors className="w-3 h-3" />
              Blades
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {gridItems.map((item, idx) =>
            item.kind === "oem" ? (
              <OEMCustomCard key="oem-card" />
            ) : (
              <ProductCard key={`${item.data.pillar}:${item.data.id}`} product={item.data} />
            )
          )}
        </div>

        {/* Empty state (should not happen but just in case) */}
        {displayProducts.length === 0 && (
          <div className="text-center py-24">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">
              No products in this category yet.{" "}
              <Link href="/contact">
                <a className="text-[#FF6600] font-bold underline">Contact us</a>
              </Link>{" "}
              for custom solutions.
            </p>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-16 border border-[#003366]/20 dark:border-slate-700 rounded-xl p-8 bg-white dark:bg-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em] mb-2">
              Can't find what you need?
            </p>
            <h3 className="text-xl font-black text-[#003366] dark:text-white uppercase">
              Custom OEM Manufacturing
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Submit your drawing or sample — we engineer any blade to your exact specification.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact">
              <button className="flex items-center gap-2 bg-[#FF6600] hover:bg-[#E55A00] text-white px-8 py-3.5 font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 rounded-sm shadow-lg">
                Submit Requirements
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/custom">
              <button className="flex items-center gap-2 border-2 border-[#003366] dark:border-slate-500 text-[#003366] dark:text-slate-300 hover:bg-[#003366] hover:text-white dark:hover:bg-slate-700 px-6 py-3.5 font-black text-xs uppercase tracking-widest transition-all duration-300 rounded-sm">
                OEM Services
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
