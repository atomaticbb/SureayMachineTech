/*
 * BladeListPage.tsx — "Industrial Blade Catalogue"
 * Swiss Brutalist · High-End Corporate Industrial
 * Zero radius · No shadows · Deep Navy + White palette
 */

import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import { Link } from "wouter";
import { type BladeCategoryType } from "@/data/blades";
import { useLang } from "@/contexts/LangContext";
import { getBlades } from "@/data/locales";
import ProductGrid from "@/components/product/ProductGrid";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import ContactRFQ from "@/components/home/ContactRFQ";
import { gtagEvent } from "@/lib/gtag";

// ── Flat filter list — all 8 categories + All ──────────────────────────────
type FilterItem = { value: BladeCategoryType | "all"; label: string };
const FILTERS: FilterItem[] = [
  { value: "all",              label: "All" },
  { value: "slitter_knives",   label: "Slitter Knives" },
  { value: "shredder_blades",  label: "Shredder Blades" },
  { value: "granulator_blades",label: "Granulator Blades" },
  { value: "log_saw_blades",   label: "Log Saw Blades" },
  { value: "shear_blades",     label: "Shear Blades" },
  { value: "cold_saw_blades",  label: "Cold Saw Blades" },
  { value: "wood_chipper",     label: "Wood Chipper Blades" },
  { value: "custom_profile",   label: "Custom Blades" },
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

const COMPLETE_CATALOG_URL = "/catalogs/sureay-complete-product-catalog.pdf";
type CatalogState = "idle" | "form" | "loading" | "done";

export default function BladeListPage() {
  const lang = useLang();
  const blades = getBlades(lang);
  const [selectedCategory, setSelectedCategory] = useState<
    BladeCategoryType | "all"
  >("all");
  const [filterTop, setFilterTop] = useState(74);
  const [catalogState, setCatalogState] = useState<CatalogState>("idle");
  const [catalogEmail, setCatalogEmail] = useState("");
  const [catalogError, setCatalogError] = useState("");
  const catalogBoxRef = useRef<HTMLDivElement | null>(null);
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

  // Hub structured data — built from the base (unfiltered) catalogue so the
  // prerendered snapshot reflects a stable canonical list, not transient
  // client-side filter UI state.
  const collectionLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Blades & Cutting Tools",
    url: "https://sureay.com/products",
    description:
      "Sureay's full catalogue of precision shredder blades, granulator knives and OEM cutting tools.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blades.length,
      itemListElement: blades.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sureay.com${b.link}`,
        name: b.name,
      })),
    },
  });

  const handleCatalogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatalogState("loading");
    setCatalogError("");

    try {
      const res = await fetch("/api/catalog-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: catalogEmail }),
      });

      if (!res.ok) throw new Error();

      setCatalogState("done");

      const a = document.createElement("a");
      a.href = COMPLETE_CATALOG_URL;
      a.download = "sureay-complete-product-catalog.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      gtagEvent("file_download", {
        event_category: "catalog",
        file_name: "sureay-complete-product-catalog.pdf",
        file_extension: "pdf",
        link_url: COMPLETE_CATALOG_URL,
        page_context: "products",
      });
    } catch {
      setCatalogState("form");
      setCatalogError("Something went wrong. Please try again.");
    }
  };

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

  useEffect(() => {
    if (catalogState === "idle") return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (catalogBoxRef.current && !catalogBoxRef.current.contains(target)) {
        setCatalogState("idle");
        setCatalogError("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [catalogState]);

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
        extraJsonLd={[collectionLd]}
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 1 — Technical Hero (Left Navy / Right Image)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-slate-200 h-[420px] lg:h-[500px] overflow-hidden mt-[74px]">
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
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-white/40 mb-6">
              Product Catalogue — Industrial Blades
            </p>

            <h1 className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-black text-white  tracking-tight leading-none mb-7">
              Industrial
              <br />
              Blades &amp;
              <br />
              Cutting Tools
            </h1>

            <div className="w-12 h-[3px] bg-white/30 mb-7" />
            <p className="text-white/70 text-[16px] leading-relaxed max-w-xl mb-10">
              Premium alloy steel blades for recycling, paper, and converting
              industries — engineered for maximum wear resistance and extended
              service life.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 2 + 3 — Filter Bar + Full-Width Product Grid
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── Sticky filter bar — single compact row ───────────────────── */}
      <div
        className="sticky z-30 transition-[top] duration-300 ease-in-out bg-white border-b border-slate-200"
        style={{ top: filterTop }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-start gap-4 py-3">

            {/* Two-row chip grid */}
            <div className="flex-1 flex items-center flex-wrap gap-1.5 py-0.5">
              {FILTERS.map(item => {
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
                      if (item.value !== "all") {
                        gtagEvent("view_item_list", {
                          event_category: "blade_filter",
                          item_list_name: item.label,
                          blade_category: item.value,
                        });
                      }
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 font-mono text-[12px] font-medium tracking-[0.1em] border transition-none whitespace-nowrap ${
                      isActive
                        ? "bg-[#001f4d] text-white border-[#001f4d]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#001f4d] hover:text-[#001f4d]"
                    }`}
                  >
                    {item.label}
                    <span className={`ml-1.5 text-[10px] font-medium ${isActive ? "text-white/50" : "text-slate-600"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: download + sort */}
            <div
              ref={catalogBoxRef}
              className="relative flex items-center gap-2 flex-shrink-0"
            >
              {catalogState === "idle" && (
                <button
                  type="button"
                  onClick={() => {
                    setCatalogState("form");
                    setCatalogError("");
                  }}
                  className="inline-flex items-center gap-3 font-mono text-sm font-black text-white tracking-[0.12em] border-2 border-[#001f4d] bg-[#001f4d] px-6 py-3.5 min-h-[58px] min-w-[250px] rounded-none hover:bg-white hover:text-[#001f4d] hover:border-[#001f4d] transition-colors"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap text-[14px] tracking-[0.08em]">
                    Download Catalog PDF
                  </span>
                  <span className="sm:hidden whitespace-nowrap text-[13px]">
                    Catalog PDF
                  </span>
                </button>
              )}

              {(catalogState === "form" || catalogState === "loading") && (
                <form
                  onSubmit={handleCatalogSubmit}
                  className="absolute right-0 top-full mt-2 z-40 w-[min(92vw,340px)] border-2 border-slate-300 bg-white p-3 space-y-2"
                >
                  <p className="font-mono text-[10px] text-slate-500 tracking-[0.14em]">
                    Enter your work email to download
                  </p>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={catalogEmail}
                    onChange={e => setCatalogEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-slate-300 px-3 py-2 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#001f4d] rounded-none"
                  />
                  {catalogError && (
                    <p className="text-red-500 text-xs font-mono">{catalogError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={catalogState === "loading"}
                      className="flex-1 bg-[#001f4d] text-white font-black text-[11px] tracking-[0.14em] px-3 py-2 hover:bg-[#003366] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {catalogState === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        "Send & Download"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogState("idle");
                        setCatalogError("");
                      }}
                      className="px-3 py-2 border border-slate-300 text-slate-500 text-[11px] font-mono tracking-[0.14em] hover:border-slate-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {catalogState === "done" && (
                <div className="absolute right-0 top-full mt-2 z-40 w-[min(92vw,340px)] border-2 border-slate-300 bg-white px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-green-600 font-black text-sm">✓</span>
                    <span className="font-mono text-[10px] text-slate-600 tracking-[0.12em]">
                      Download started
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCatalogState("idle")}
                    className="text-[10px] font-mono tracking-[0.12em] text-slate-500 hover:text-slate-700"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* ── Product Grid Section ─────────────────────────────────────── */}
      <section
        id="products"
        ref={listSectionRef}
        className="border-b border-slate-200 min-h-[720px]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-14">
          <ProductGrid
            blades={filteredBlades}
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
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em]  mb-6">
                [ MANUFACTURING CAPABILITY ]
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d]  tracking-tight leading-tight mb-8">
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
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    Facility
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">
                    15,000 m²
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    Founded
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">
                    Est. 2008
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    Standard
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">
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
