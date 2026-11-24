/**
 * News.tsx → "Corporate Dispatches"
 * Swiss Brutalist Architecture: Zero radius, high contrast, strict grids.
 * Data sourced from client/src/data/news.ts
 */

import { useRef, useState } from "react";
import NewsArticleCard from "@/components/common/NewsArticleCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import { SORTED_DISPATCHES } from "@/data/news";
import { useTranslation } from "@/lib/useTranslation";

// ── UI Constants ──────────────────────────────────────────────────────────────

const CATEGORIES: { value: string; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "TECHNICAL GUIDE", label: "Technical Guides" },
  { value: "COMPANY NEWS", label: "Company News" },
];

const PER_PAGE = 12;

// ── Component ─────────────────────────────────────────────────────────────────

export default function CorporateDispatches() {
  const { t, lang } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLElement>(null);

  const allPosts = SORTED_DISPATCHES;

  const filteredDispatches =
    activeCategory === "ALL"
      ? allPosts
      : allPosts.filter(d => d.tag === activeCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDispatches.length / PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);
  const pagedDispatches = filteredDispatches.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function selectCategory(value: string) {
    setActiveCategory(value);
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={`group/news min-h-screen antialiased ${lang === "en" ? "bg-white" : "bg-slate-50"}`}>
      <SEO
        title="Industry Dispatches — Blade Technology & News"
        description="Latest updates from Sureay: technology innovations, exhibition reports and company milestones in industrial blade manufacturing."
        canonicalUrl="/news"
      />
      <Navbar />

      <main className="pt-[74px]">
        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 1 — Hero
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative border-b border-slate-200 h-[420px] lg:h-[500px] overflow-hidden">
          {/* Background image */}
          <img
            src="/images/hero/product-hero.webp"
            alt="Sureay News & Industry Updates"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            width={1920}
            height={500}
            decoding="async"
          />
          {/* Text overlay */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-4xl">
            {lang !== "en" && (
              <p className="text-[14px] font-semibold tracking-[0.28em]  text-white/80 mb-5">
                News & Industry Updates
              </p>
            )}
            <h1 className="text-[42px] lg:text-[66px] font-black text-white  tracking-tight leading-none mb-6">
              {t("nav.news")}
            </h1>
            <div className="w-12 h-[3px] bg-white/30 mb-6" />
            <p className="text-white/70 text-[18px] leading-relaxed max-w-xl">
              {lang === "en"
                ? "Industrial blade selection, maintenance guides and manufacturing updates from Sureay."
                : "Latest news and technology articles about us."}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 2 — Category Filter
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="site-section sticky top-[75px] z-10 border-b border-slate-200 bg-white transition-[top] duration-300 ease-in-out group-has-[[data-scroll-hidden=true]]/news:top-0">
          <div className="site-content max-w-7xl mx-auto border-l border-slate-200">
            <div className="flex overflow-x-auto flex-nowrap w-full no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => selectCategory(cat.value)}
                  className={`flex-shrink-0 min-w-fit md:flex-1 px-8 py-4 border-r border-slate-200 text-center font-mono text-[14px] font-semibold tracking-[0.16em] whitespace-nowrap transition-colors ${
                    activeCategory === cat.value
                      ? "bg-[#001f4d] text-white"
                      : "bg-transparent text-muted-foreground hover:bg-slate-50 hover:text-[#001f4d]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3 — Articles Grid
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={gridRef}
          className="site-section site-content scroll-mt-20 py-16 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8"
        >
          {filteredDispatches.length === 0 ? (
            <p className="font-mono text-sm text-muted-foreground tracking-widest">
              — No dispatches in this category —
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {pagedDispatches.map(post => (
                <NewsArticleCard key={post.id} article={post} variant="listing" />
              ))}
            </div>
          )}

          {/* Pagination — unified with IndustryToolingMatrix */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="font-mono w-10 h-10 border border-slate-200 text-[16px] text-muted-foreground flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
                >
                  «
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goToPage(n)}
                    aria-current={n === currentPage ? "page" : undefined}
                    className={`font-mono w-10 h-10 border text-[16px] transition-colors duration-200 ${
                      n === currentPage
                        ? "border-[#001f4d] bg-[#001f4d] text-white"
                        : "border-slate-200 text-muted-foreground hover:border-[#001f4d] hover:text-[#001f4d]"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="font-mono w-10 h-10 border border-slate-200 text-[16px] text-muted-foreground flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
                >
                  »
                </button>
              </div>

              <div className="w-48 h-[2px] bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-[#001f4d] transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
              <p className="font-mono text-[12px] text-muted-foreground tracking-[0.3em]">
                {currentPage} / {totalPages}
              </p>
            </nav>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
