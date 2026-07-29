/*
 * BladeListPage.tsx — "Industrial Blade Catalogue"
 * Swiss Brutalist · High-End Corporate Industrial
 * Zero radius · No shadows · Deep Navy + White palette
 */

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, X } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import { Link, useSearchParams } from "wouter";
import { type BladeCategoryType, type BladeSectorType } from "@/data/blades";
import { SECTOR_LABEL } from "@/data/blade-categories";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import { getBlades } from "@/data/locales";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFacetSidebar, {
  CATEGORY_FACETS,
  SECTOR_FACETS,
} from "@/components/product/ProductFacetSidebar";
import ProductPagination from "@/components/product/ProductPagination";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";
import ContactRFQ from "@/components/home/ContactRFQ";
import { gtagEvent } from "@/lib/gtag";

// 4 columns × 4 rows.
const PER_PAGE = 16;

// Height of the sticky filter bar below, so the facet column can park under it.
// Tied to the bar's own markup (py-3 + the min-h-[58px] catalog button) — keep
// in sync if that row's padding or button size changes.
const FILTER_BAR_H = 82;

const CATEGORY_VALUES = CATEGORY_FACETS.map(f => f.value);
const SECTOR_VALUES = SECTOR_FACETS.map(f => f.value);

/** Reads a comma-separated query param, dropping anything not in `allowed`. */
function parseFacetParam<T extends string>(
  raw: string | null,
  allowed: readonly T[]
): T[] {
  if (!raw) return [];
  const seen = new Set<string>();
  return raw.split(",").filter((v): v is T => {
    if (seen.has(v) || !(allowed as readonly string[]).includes(v))
      return false;
    seen.add(v);
    return true;
  });
}

const FACTORY_IMAGES = [
  {
    src: "/images/process/premium-steel-selection.webp",
    ref: "REF: PREMIUM STEEL SELECTION",
    altKey: "productList.factory.altSteelSelection",
  },
  {
    src: "/images/process/vacuum-heat-treatment.webp",
    ref: "REF: VACUUM HEAT TREATMENT",
    altKey: "productList.factory.altHeatTreatment",
  },
  {
    src: "/images/process/cnc-precision-grinding.webp",
    ref: "REF: CNC PRECISION GRINDING",
    altKey: "productList.factory.altPrecisionGrinding",
  },
  {
    src: "/images/process/quality-control.webp",
    ref: "REF: RIGOROUS QUALITY CONTROL",
    altKey: "productList.factory.altQualityControl",
  },
];

const COMPLETE_CATALOG_URL = "/catalogs/sureay-complete-product-catalog.pdf";
type CatalogState = "idle" | "form" | "loading" | "done";

export default function BladeListPage() {
  const lang = useLang();
  const { t } = useTranslation();
  const blades = getBlades(lang);
  // The query string is the single source of truth for facets + page, so a
  // filtered view is shareable and the back button steps through it.
  const [searchParams, setSearchParams] = useSearchParams();
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

  const selectedCategories = parseFacetParam(
    searchParams.get("category"),
    CATEGORY_VALUES
  );
  const selectedSectors = parseFacetParam(
    searchParams.get("sector"),
    SECTOR_VALUES
  );

  const filteredBlades = blades.filter(
    b =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(b.category)) &&
      (selectedSectors.length === 0 || selectedSectors.includes(b.sector))
  );

  const totalPages = Math.max(1, Math.ceil(filteredBlades.length / PER_PAGE));
  const requestedPage = Math.floor(Number(searchParams.get("page")));
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage >= 1
      ? Math.min(requestedPage, totalPages)
      : 1;
  const pageBlades = filteredBlades.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  /** Rebuilds the query string; defaults are omitted so bare /products stays
   *  clean — that is the URL the prerenderer snapshots. */
  const applyFacets = (next: {
    categories?: BladeCategoryType[];
    sectors?: BladeSectorType[];
    page?: number;
  }) => {
    const categories = next.categories ?? selectedCategories;
    const sectors = next.sectors ?? selectedSectors;
    const page = next.page ?? 1;
    const params = new URLSearchParams();
    if (categories.length) params.set("category", categories.join(","));
    if (sectors.length) params.set("sector", sectors.join(","));
    if (page > 1) params.set("page", String(page));
    setSearchParams(params);
  };

  // Only a box being ticked ON is a filter intent worth reporting; unticking
  // and paging would just inflate the funnel.
  const toggleCategory = (value: BladeCategoryType) => {
    const turningOn = !selectedCategories.includes(value);
    applyFacets({
      categories: turningOn
        ? [...selectedCategories, value]
        : selectedCategories.filter(v => v !== value),
    });
    if (turningOn) {
      gtagEvent("view_item_list", {
        event_category: "blade_filter",
        item_list_name: CATEGORY_FACETS.find(f => f.value === value)
          ?.analyticsName,
        blade_category: value,
      });
    }
  };

  const toggleSector = (value: BladeSectorType) => {
    const turningOn = !selectedSectors.includes(value);
    applyFacets({
      sectors: turningOn
        ? [...selectedSectors, value]
        : selectedSectors.filter(v => v !== value),
    });
    if (turningOn) {
      // SECTOR_LABEL is already a fixed English constant — reuse it as the
      // GA4 dimension so sector rows aggregate across locales.
      gtagEvent("view_item_list", {
        event_category: "blade_filter",
        item_list_name: SECTOR_LABEL[value],
        blade_sector: value,
      });
    }
  };

  const clearAll = () => setSearchParams(new URLSearchParams());

  const activePills = [
    ...selectedCategories.map(value => ({
      key: `category-${value}`,
      label: t(CATEGORY_FACETS.find(f => f.value === value)!.labelKey),
      remove: () => toggleCategory(value),
    })),
    ...selectedSectors.map(value => ({
      key: `sector-${value}`,
      label: t(SECTOR_FACETS.find(f => f.value === value)!.labelKey),
      remove: () => toggleSector(value),
    })),
  ];

  // Hub structured data — built from the base (unfiltered) catalogue so the
  // prerendered snapshot reflects a stable canonical list, not transient
  // client-side filter UI state.
  const collectionLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("productList.seo.title"),
    url: "https://sureay.com/products",
    description: t("productList.collectionLd.description"),
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
      setCatalogError(t("productDetail.hero.catalogError"));
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
    // Query-only changes don't retrigger the app's ScrollToTop (wouter's
    // useLocation is pathname-only), so paging scrolls to the grid, not the top.
  }, [searchParams.toString()]);

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
        title={t("productList.seo.title")}
        description={t("productList.seo.description")}
        canonicalUrl="/products"
        keywords={t("productList.seo.keywords")}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          {
            name: t("productList.seo.breadcrumbBladesKnives"),
            url: "/products",
          },
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
              {t("productList.hero.eyebrow")}
            </p>

            <h1 className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-black text-white  tracking-tight leading-none mb-7">
              {t("productList.hero.headline")}
            </h1>

            <div className="w-12 h-[3px] bg-white/30 mb-7" />
            <p className="text-white/70 text-[16px] leading-relaxed max-w-xl mb-10">
              {t("productList.hero.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 2 + 3 — Filter Bar + Full-Width Product Grid
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── Sticky filter bar — result count + active facets ─────────── */}
      <div
        className="sticky z-30 transition-[top] duration-300 ease-in-out bg-white border-b border-slate-200"
        style={{ top: filterTop }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-start gap-4 py-3">
            {/* Result count + removable active-facet pills */}
            <div className="flex-1 flex items-center flex-wrap gap-1.5 py-0.5">
              {/* translate() has no interpolation, so the number is composed here */}
              <p className="font-mono text-[12px] text-slate-500 tracking-[0.1em] mr-2 whitespace-nowrap">
                <span className="text-[#001f4d] font-bold">
                  {filteredBlades.length}
                </span>
                {filteredBlades.length !== blades.length && (
                  <span className="text-slate-400"> / {blades.length}</span>
                )}{" "}
                {t("productList.facets.productsFound")}
              </p>

              {activePills.map(pill => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={pill.remove}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.1em] border border-[#001f4d] bg-[#001f4d] text-white whitespace-nowrap hover:bg-white hover:text-[#001f4d] transition-colors"
                >
                  {pill.label}
                  <X className="w-3 h-3" />
                </button>
              ))}

              {activePills.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex-shrink-0 px-2 py-1 font-mono text-[11px] text-slate-400 tracking-[0.1em] hover:text-[#001f4d] transition-colors"
                >
                  {t("productList.facets.clearAll")}
                </button>
              )}
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
                    {t("productList.catalog.downloadButton")}
                  </span>
                  <span className="sm:hidden whitespace-nowrap text-[13px]">
                    {t("productList.catalog.downloadButtonShort")}
                  </span>
                </button>
              )}

              {(catalogState === "form" || catalogState === "loading") && (
                <form
                  onSubmit={handleCatalogSubmit}
                  className="absolute right-0 top-full mt-2 z-40 w-[min(92vw,340px)] border-2 border-slate-300 bg-white p-3 space-y-2"
                >
                  <p className="font-mono text-[10px] text-slate-500 tracking-[0.14em]">
                    {t("productDetail.hero.emailPrompt")}
                  </p>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={catalogEmail}
                    onChange={e => setCatalogEmail(e.target.value)}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="w-full border border-slate-300 px-3 py-2 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#001f4d] rounded-none"
                  />
                  {catalogError && (
                    <p className="text-red-500 text-xs font-mono">
                      {catalogError}
                    </p>
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
                          <span>{t("common.sending")}</span>
                        </>
                      ) : (
                        t("productDetail.hero.sendAndDownload")
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
                      {t("common.cancel")}
                    </button>
                  </div>
                </form>
              )}

              {catalogState === "done" && (
                <div className="absolute right-0 top-full mt-2 z-40 w-[min(92vw,340px)] border-2 border-slate-300 bg-white px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-green-600 font-black text-sm">✓</span>
                    <span className="font-mono text-[10px] text-slate-600 tracking-[0.12em]">
                      {t("productList.catalog.downloadStarted")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCatalogState("idle")}
                    className="text-[10px] font-mono tracking-[0.12em] text-slate-500 hover:text-slate-700"
                  >
                    {t("productList.catalog.close")}
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
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 lg:items-start">
            <ProductFacetSidebar
              blades={blades}
              categories={selectedCategories}
              sectors={selectedSectors}
              onToggleCategory={toggleCategory}
              onToggleSector={toggleSector}
              onClearCategories={() => applyFacets({ categories: [] })}
              onClearSectors={() => applyFacets({ sectors: [] })}
              stickyTop={filterTop + FILTER_BAR_H}
            />

            <div className="mt-6 lg:mt-0">
              <ProductGrid
                blades={pageBlades}
                layout="compact"
                showSectorBadge
                onShowAll={clearAll}
              />
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => applyFacets({ page })}
              />
            </div>
          </div>

          {/* Paging drops most products out of the DOM, and query-param views
              are never prerendered — this keeps a crawlable path to every
              product in the static /products snapshot. Must use wouter's Link,
              not a raw <a>: only Link applies the router base, otherwise the
              localised pages would emit 30 links to the English URLs. */}
          <nav
            aria-label={t("productList.seo.breadcrumbBladesKnives")}
            className="sr-only"
          >
            <ul>
              {blades.map(b => (
                <li key={b.id}>
                  <Link href={b.link}>{b.fullName || b.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
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
                [ {t("productList.factory.eyebrow")} ]
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d]  tracking-tight leading-tight mb-8">
                {t("productList.factory.headline")}
              </h2>
              <div className="border-l-4 border-[#001f4d] pl-6 space-y-5">
                <p className="text-slate-600 text-base leading-relaxed">
                  {t("productList.factory.paragraph1")}
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  {t("productList.factory.paragraph2")}
                </p>
              </div>
              <div className="border-t border-slate-200 mt-10 pt-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    {t("productList.factory.statFacility")}
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">
                    15,000 m²
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    {t("productList.factory.statFounded")}
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">
                    {t("productList.factory.foundedValue")}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest  mb-1">
                    {t("productList.factory.statStandard")}
                  </p>
                  <p className="font-black text-sm text-[#001f4d] ">ISO 9001</p>
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
                    alt={t(img.altKey)}
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
