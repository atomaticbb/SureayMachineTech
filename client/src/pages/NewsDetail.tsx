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
import {
  getDispatchAuthor,
  getDispatchById,
  getAdjacentDispatches,
} from "@/data/news";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";
import { getBladeById } from "@/data/blades";
import type { Blade } from "@/data/blades";

// ── Inline Link Parser ───────────────────────────────────────────────────────
// Parses [anchor text](/path) markdown-link syntax within content strings.

function renderInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={i} href={match[2]}>
          <a className="text-[#001f4d] border-b border-[#001f4d] hover:text-[#e8b84b] hover:border-[#e8b84b] transition-colors font-semibold">
            {match[1]}
          </a>
        </Link>
      );
    }
    return part;
  });
}

function formatHeadingCase(text: string): string {
  if (/[a-z]/.test(text)) {
    return text;
  }

  const lowered = text.toLowerCase();
  return lowered.charAt(0).toUpperCase() + lowered.slice(1);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NewsDetail() {
  const [, params] = useRoute<{ id: string }>("/news/:id");
  const id = params?.id ?? "";

  const article = getDispatchById(id);
  const { prev, next } = getAdjacentDispatches(id);
  const author = getDispatchAuthor(id);

  const relatedBlades = (article?.relatedProductIds ?? [])
    .map((pid) => getBladeById(pid))
    .filter((b): b is Blade => !!b);

  let figureCount = 0;

  // ── 404 guard ──────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <div className="min-h-screen bg-white antialiased">
        <SEO
          title="404 — Dispatch Not Found"
          description="The requested article does not exist."
          noIndex
        />
        <Navbar />
        <main className="pt-[74px] max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <p className="font-mono text-[10px] text-slate-400 tracking-widest  mb-4">
            [ ERROR: DOCUMENT NOT FOUND ]
          </p>
          <h1 className="text-5xl font-black text-[#001f4d]  mb-8">
            No Dispatch Found
          </h1>
          <Link href="/news">
            <a className="font-mono text-sm text-[#001f4d] tracking-widest  border-b-2 border-[#001f4d] pb-1 hover:text-slate-500 hover:border-slate-500 transition-colors">
              ← Return to Corporate Dispatches
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] antialiased">
      <SEO
        title={article.seoTitle ?? article.title}
        description={article.metaDescription ?? article.excerpt}
        canonicalUrl={`/news/${article.id}`}
        keywords={article.keywords}
      />
      <Navbar />

      <main className="pt-[74px]">
        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 1 — Technical Datasheet Header (Left Text / Right Image)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
            <Link href="/news">
              <a className="font-mono text-[10px] text-slate-400 tracking-widest  hover:text-[#001f4d] transition-colors inline-block">
                ← CORPORATE DISPATCHES
              </a>
            </Link>

            <div className="mt-6 border border-slate-200 bg-[#f8fafc]">
              <div className="border-b border-slate-200 px-5 py-4 lg:px-6">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 ">
                    FILE: {article.id.toUpperCase()}
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 ">
                    {article.tag}
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 ">
                    {article.date}
                  </span>
                  <span className="w-px h-3 bg-slate-300 hidden sm:block" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 ">
                    {article.readTime}
                  </span>
                </div>
              </div>

              <div className="grid gap-8 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.95fr)] lg:px-6 lg:py-8 lg:items-stretch">
                <div className="max-w-4xl">
                  <h1 className="text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold text-[#001f4d] leading-[1.1] tracking-tight max-w-[28ch]">
                    {formatHeadingCase(article.title)}
                  </h1>

                  <p className="mt-6 max-w-[65ch] text-[14px] lg:text-[15px] text-slate-700 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-8 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.22em] text-slate-400 mb-1">
                        Authored By
                      </p>
                      <p className="text-sm font-black tracking-wide text-[#001f4d]">
                        {author}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.22em] text-slate-400 mb-1">
                        Classification
                      </p>
                      <p className="text-sm font-black tracking-wide text-[#001f4d]">
                        {article.tag}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.22em] text-slate-400 mb-1">
                        Document Use
                      </p>
                      <p className="text-sm font-black tracking-wide text-[#001f4d]">
                        Buyer Reference
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 bg-white overflow-hidden">
                  <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110 saturate-75"
                      width={960}
                      height={720}
                      decoding="async"
                    />
                  </div>
                  <div className="border-t border-slate-200 px-4 py-3">
                    <span className="font-mono text-[10px] font-bold text-[#001f4d] tracking-widest ">
                      Fig. 1.0 / Dispatch Overview Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3 — The Asymmetrical Reading Grid
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
            {/* ── Left: Document Navigator (sticky) ─────────────────────── */}
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-[110px] border border-slate-200 bg-white">
                {/* Author */}
                <div className="border-b border-slate-200 px-5 py-4">
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest mb-1">
                    Authored By
                  </p>
                  <p className="font-black text-sm text-[#001f4d] tracking-wide">
                    {author}
                  </p>
                </div>

                {/* Actions */}
                <div className="border-b border-slate-200 flex flex-col">
                  <button
                    onClick={() => window.print()}
                    className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest  border-b border-slate-200 hover:bg-[#001f4d] hover:text-white transition-none"
                  >
                    [ PRINT DOCUMENT ]
                  </button>
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(window.location.href)
                    }
                    className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest  hover:bg-[#001f4d] hover:text-white transition-none"
                  >
                    [ COPY LINK ]
                  </button>
                </div>

                {/* Classification block */}
                <div className="px-5 py-4">
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest mb-3">
                    Classification
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#001f4d] tracking-wide">
                    {article.tag}
                  </p>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest mt-3 mb-1">
                    Issued
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#001f4d] tracking-wide">
                    {article.date}
                  </p>
                  <p className="font-mono text-[9px] text-slate-400 tracking-widest mt-3 mb-1">
                    Read Time
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#001f4d] tracking-wide">
                    {article.readTime}
                  </p>
                </div>
              </div>
            </aside>

            {/* ── Right: Main Article Content ───────────────────────────── */}
            <article className="min-w-0">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="font-bold text-[1.15rem] md:text-[1.3rem] text-[#001f4d] tracking-tight border-t border-slate-300 pt-8 mt-14 mb-6"
                      >
                        {formatHeadingCase(block.value)}
                      </h2>
                    );
                  case "h3":
                    return (
                      <h3
                        key={i}
                        className="font-semibold text-[1rem] md:text-[1.05rem] text-[#001f4d] tracking-tight pt-1 mt-10 mb-4"
                      >
                        {formatHeadingCase(block.value)}
                      </h3>
                    );
                  case "callout":
                    return (
                      <div
                        key={i}
                        className="border border-slate-200 bg-[#f8fafc] px-6 py-5 my-8"
                      >
                        <p className="font-mono text-sm text-[#001f4d] leading-relaxed tracking-wide ">
                          {renderInlineLinks(block.value)}
                        </p>
                      </div>
                    );
                  case "image":
                    return (
                      <div
                        key={i}
                        className="my-8 sm:my-10"
                      >
                        <div className="mx-auto max-w-lg border border-slate-200 bg-white overflow-hidden">
                          <img
                            src={block.value}
                            alt=""
                            className="w-full max-h-[360px] object-cover brightness-95 contrast-110 saturate-75"
                            loading="lazy"
                            decoding="async"
                            width={720}
                            height={540}
                          />
                          <div className="border-t border-slate-200 px-4 py-3">
                            <span className="font-mono text-[9px] font-bold text-[#001f4d] tracking-[0.22em] ">
                              {`Fig. ${String((figureCount += 1) + 1)}.0 / Production Record`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  case "table":
                    return (
                      <div key={i} className="my-8 overflow-x-auto">
                        <table className="w-full border-collapse border border-slate-300 text-[13px] lg:text-[14px]">
                          {block.tableHeaders && block.tableHeaders.length > 0 && (
                            <thead>
                              <tr className="bg-[#001f4d]">
                                {block.tableHeaders.map((header, hi) => (
                                  <th
                                    key={hi}
                                    className="border border-slate-300 px-4 py-3 text-left font-mono text-[10px] tracking-widest text-white"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          {block.tableRows && (
                            <tbody>
                              {block.tableRows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className={
                                    ri % 2 === 0
                                      ? "bg-white"
                                      : "bg-[#f8fafc]"
                                  }
                                >
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className="border border-slate-200 px-4 py-3 text-slate-700 leading-relaxed align-top"
                                    >
                                      {renderInlineLinks(cell)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </table>
                      </div>
                    );
                  default:
                    return (
                      <p
                        key={i}
                        className="text-[14px] lg:text-[15px] leading-[1.8] text-slate-700 mb-6"
                      >
                        {renderInlineLinks(block.value)}
                      </p>
                    );
                }
              })}

              {/* End mark */}
              <div className="border-t border-slate-300 mt-16 pt-6">
                <span className="font-mono text-[11px] text-slate-400 tracking-widest ">
                  // END OF DISPATCH //
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3.5 — Referenced Products (Internal Linking)
        ═══════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <CompatibleTooling blades={relatedBlades} />
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 4 — The Archive Traversal (Footer Navigation)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-t-2 border-[#001f4d]">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link href={`/news/${prev.id}`}>
                <a className="group border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest  group-hover:text-white/50">
                    ← PREVIOUS DISPATCH
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(prev.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest ">
                  ← PREVIOUS DISPATCH
                </span>
                <span className="font-black text-base text-[#001f4d] ">
                  — NONE —
                </span>
              </div>
            )}

            {next ? (
              <Link href={`/news/${next.id}`}>
                <a className="group px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest  group-hover:text-white/50">
                    NEXT DISPATCH →
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(next.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest ">
                  NEXT DISPATCH →
                </span>
                <span className="font-black text-base text-[#001f4d] ">
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
