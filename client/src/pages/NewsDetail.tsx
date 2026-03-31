/**
 * NewsDetail.tsx — "Engineering Whitepaper" Article View
 * Swiss Brutalist: classified document aesthetic.
 * Zero radius · 1px grids · Monospace metadata · Asymmetric reading layout
 * Data sourced from client/src/data/news.ts
 */

import { useRoute, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import { getDispatchById, getAdjacentDispatches } from "@/data/news";

// ── Component ─────────────────────────────────────────────────────────────────

export default function NewsDetail() {
  const [, params] = useRoute<{ id: string }>("/news/:id");
  const id = params?.id ?? "";

  const article = getDispatchById(id);
  const { prev, next } = getAdjacentDispatches(id);

  // ── 404 guard ──────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <div className="min-h-screen bg-white antialiased">
        <Navbar />
        <main className="pt-[74px] max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <p className="font-mono text-[10px] text-slate-400 tracking-widest uppercase mb-4">
            [ ERROR: DOCUMENT NOT FOUND ]
          </p>
          <h1 className="text-5xl font-black text-[#001f4d] uppercase mb-8">
            No Dispatch Found
          </h1>
          <Link href="/news">
            <a className="font-mono text-sm text-[#001f4d] tracking-widest uppercase border-b-2 border-[#001f4d] pb-1 hover:text-slate-500 hover:border-slate-500 transition-colors">
              ← Return to Corporate Dispatches
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title={article.title}
        description={article.excerpt}
        canonicalUrl={`/news/${article.id}`}
      />
      <Navbar />

      <main className="pt-[74px]">
        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 1 — Technical Datasheet Header (Left Text / Right Image)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-slate-200">
          <div className="lg:grid lg:grid-cols-2">
            {/* ── Left: Ledger Panel ─────────────────────────────────────── */}
            <div className="lg:border-r border-slate-200 border-b lg:border-b-0 p-6 lg:p-16 flex flex-col justify-between">
              {/* Top: back-nav + metadata */}
              <div>
                <Link href="/news">
                  <a className="font-mono text-[10px] text-slate-400 tracking-widest uppercase hover:text-[#001f4d] transition-colors mb-8 inline-block">
                    ← CORPORATE DISPATCHES
                  </a>
                </Link>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mb-8">
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                    [ ID: {article.id.toUpperCase()} ]
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                    [ {article.tag} ]
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                    [ {article.date} ]
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                    [ {article.readTime} ]
                  </span>
                </div>
              </div>

              {/* Middle: title + summary */}
              <div className="flex-1 flex flex-col justify-center py-8">
                <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-black text-[#001f4d] uppercase leading-[1.1] tracking-tight mb-8">
                  {article.title}
                </h1>

                <div className="border-l-4 border-[#001f4d] pl-5">
                  <p className="text-lg font-bold text-slate-700 leading-snug">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom: read time stamp */}
              <div className="border-t border-slate-200 pt-5">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  READ TIME: {article.readTime} &nbsp;·&nbsp; AUTHORED BY: CORE
                  ENGINEERING
                </span>
              </div>
            </div>

            {/* ── Right: Evidence Viewport ────────────────────────────────── */}
            <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-125 saturate-75"
                width={800}
                height={500}
                decoding="async"
              />
              {/* Caption plate — bottom-left, borders connect with grid lines */}
              <div className="absolute bottom-0 left-0 bg-white border-t border-r border-slate-200 px-5 py-3">
                <span className="font-mono text-[10px] font-bold text-[#001f4d] tracking-widest uppercase">
                  FIG. 1.0 — {article.title} OVERVIEW
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3 — The Asymmetrical Reading Grid
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-12 gap-12">
            {/* ── Left: Document Navigator (sticky) ─────────────────────── */}
            <aside className="lg:col-span-3 mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-[110px] border border-slate-200">
                {/* Author */}
                <div className="border-b border-slate-200 px-5 py-4">
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1">
                    Authored By
                  </p>
                  <p className="font-black text-sm text-[#001f4d] uppercase tracking-wide">
                    CORE ENGINEERING
                  </p>
                </div>

                {/* Actions */}
                <div className="border-b border-slate-200 flex flex-col">
                  <button
                    onClick={() => window.print()}
                    className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest uppercase border-b border-slate-200 hover:bg-[#001f4d] hover:text-white transition-none"
                  >
                    [ PRINT DOCUMENT ]
                  </button>
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(window.location.href)
                    }
                    className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest uppercase hover:bg-[#001f4d] hover:text-white transition-none"
                  >
                    [ COPY LINK ]
                  </button>
                </div>

                {/* Classification block */}
                <div className="px-5 py-4">
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-3">
                    Classification
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#001f4d] tracking-wide uppercase">
                    {article.tag}
                  </p>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mt-3 mb-1">
                    Issued
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#001f4d] tracking-wide uppercase">
                    {article.date}
                  </p>
                </div>
              </div>
            </aside>

            {/* ── Right: Main Article Content ───────────────────────────── */}
            <article className="lg:col-span-9">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="font-black text-2xl md:text-3xl text-[#001f4d] uppercase tracking-tight border-t-2 border-slate-200 pt-6 mt-14 mb-6"
                      >
                        {block.value}
                      </h2>
                    );
                  case "h3":
                    return (
                      <h3
                        key={i}
                        className="font-black text-xl text-[#001f4d] uppercase tracking-tight border-t border-slate-200 pt-5 mt-10 mb-5"
                      >
                        {block.value}
                      </h3>
                    );
                  case "callout":
                    return (
                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-200 border-l-4 border-l-[#001f4d] px-8 py-6 my-8"
                      >
                        <p className="font-mono text-sm text-[#001f4d] leading-relaxed tracking-wide">
                          {block.value}
                        </p>
                      </div>
                    );
                  case "image":
                    return (
                      <div
                        key={i}
                        className="my-10 border border-slate-200 overflow-hidden"
                      >
                        <img
                          src={block.value}
                          alt=""
                          className="w-full object-cover brightness-95 contrast-125 saturate-75"
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={450}
                        />
                      </div>
                    );
                  default:
                    return (
                      <p
                        key={i}
                        className="text-lg leading-relaxed text-slate-700 mb-6"
                      >
                        {block.value}
                      </p>
                    );
                }
              })}

              {/* End mark */}
              <div className="border-t border-slate-200 mt-16 pt-6">
                <span className="font-mono text-[11px] text-slate-400 tracking-widest uppercase">
                  // END OF DISPATCH //
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 4 — The Archive Traversal (Footer Navigation)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-t-2 border-[#001f4d]">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link href={`/news/${prev.id}`}>
                <a className="group border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase group-hover:text-white/50">
                    ← PREVIOUS DISPATCH
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] uppercase leading-tight group-hover:text-white">
                    {prev.title}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  ← PREVIOUS DISPATCH
                </span>
                <span className="font-black text-base text-[#001f4d] uppercase">
                  — NONE —
                </span>
              </div>
            )}

            {next ? (
              <Link href={`/news/${next.id}`}>
                <a className="group px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase group-hover:text-white/50">
                    NEXT DISPATCH →
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] uppercase leading-tight group-hover:text-white">
                    {next.title}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  NEXT DISPATCH →
                </span>
                <span className="font-black text-base text-[#001f4d] uppercase">
                  — NONE —
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
