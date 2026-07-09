/**
 * NewsDetail.tsx — Technical Engineering Magazine Article View
 * Industrial B2B: precise, trustworthy, buyer reference.
 * Navy · White · Slate · Restrained gold accent
 */

import { useRoute, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import {
  getDispatchAuthor,
  getDispatchAuthorInfo,
  getDispatchById,
  getAdjacentDispatches,
} from "@/data/news";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";
import type { Blade } from "@/data/blades";
import { useLang } from "@/contexts/LangContext";
import { getBladeById } from "@/data/locales";

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={i} href={match[2]}>
          <a className="text-[#001f4d] underline underline-offset-2 decoration-[#001f4d]/40 hover:text-[#c49a2a] hover:decoration-[#e8b84b] transition-colors font-medium">
            {match[1]}
          </a>
        </Link>
      );
    }
    return part;
  });
}

const MONTH_NUMS: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04",
  MAY: "05", JUN: "06", JUL: "07", AUG: "08",
  SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

function formatDisplayDate(date: string): string {
  const [day, month, year] = date.split(".");
  const mm = MONTH_NUMS[month] ?? month;
  return `${year}-${mm}-${(day ?? "").padStart(2, "0")}`;
}

function formatHeadingCase(text: string): string {
  if (/[a-z]/.test(text)) return text;
  const lowered = text.toLowerCase();
  return lowered.charAt(0).toUpperCase() + lowered.slice(1);
}

function captionFromUrl(url: string): string {
  const filename = url.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return filename
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const CALLOUT_PREFIXES = [
  "Engineering Note",
  "Selection Tip",
  "Maintenance Tip",
  "Warning",
  "Important",
];

function parseCalloutLabel(value: string): { label: string; body: string } {
  for (const prefix of CALLOUT_PREFIXES) {
    if (value.startsWith(prefix + ": ") || value.startsWith(prefix + ":")) {
      return {
        label: prefix,
        body: value.slice(prefix.length).replace(/^:\s*/, ""),
      };
    }
  }
  return { label: "Technical Note", body: value };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NewsDetail() {
  const lang = useLang();
  const [, params] = useRoute<{ id: string }>("/news/:id");
  const id = params?.id ?? "";

  const article = getDispatchById(id);
  const { prev, next } = getAdjacentDispatches(id);
  const author = getDispatchAuthor(id);
  const authorInfo = getDispatchAuthorInfo(id);

  const relatedBlades = (article?.relatedProductIds ?? [])
    .map((pid) => getBladeById(pid, lang))
    .filter((b): b is Blade => !!b);

  // ── 404 guard ──────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <div className="min-h-screen bg-white antialiased">
        <SEO
          title="404 — Article Not Found"
          description="The requested article does not exist."
          noIndex
        />
        <Navbar />
        <main className="pt-[74px] max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <p className="font-mono text-[10px] text-slate-400 tracking-widest mb-4">
            [ ERROR: DOCUMENT NOT FOUND ]
          </p>
          <h1 className="text-5xl font-black text-[#001f4d] mb-8">
            Article Not Found
          </h1>
          <Link href="/news">
            <a className="font-mono text-sm text-[#001f4d] tracking-widest border-b-2 border-[#001f4d] pb-1 hover:text-slate-500 hover:border-slate-500 transition-colors">
              ← Back to Articles
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Pre-compute TOC from H2 headings
  const h2Sections = article.content
    .filter((b) => b.type === "h2")
    .map((b, i) => ({
      id: `section-${i}`,
      label: formatHeadingCase(b.value),
    }));

  // Mutable counters reset on each render
  let h2Idx = 0;
  let figIdx = 0;

  return (
    <div className="min-h-screen bg-[#f4f6f8] antialiased">
      <SEO
        title={article.seoTitle ?? article.title}
        description={article.metaDescription ?? article.excerpt}
        canonicalUrl={`/news/${article.id}`}
        keywords={article.keywords}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "News", url: "/news" },
          { name: article.title, url: `/news/${article.id}` },
        ]}
        extraJsonLd={[
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: [`https://sureay.com${article.image}`],
            datePublished: formatDisplayDate(article.date),
            dateModified: formatDisplayDate(article.date),
            author: {
              "@type": "Person",
              name: author,
              jobTitle: authorInfo.title,
            },
            publisher: {
              "@type": "Organization",
              name: "Sureay Machinery Technology Co., Ltd.",
              logo: {
                "@type": "ImageObject",
                url: "https://sureay.com/sureay.svg",
              },
            },
            mainEntityOfPage: `https://sureay.com/news/${article.id}`,
          }),
        ]}
      />
      <Navbar />

      <main className="pt-[74px]">
        {/* ══════════════════════════════════════════════════════════════════
            HERO — Article Header
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
            {/* Breadcrumb */}
            <Link href="/news">
              <a className="inline-flex items-center gap-1.5 font-mono text-[12px] text-slate-400 tracking-widest hover:text-[#001f4d] transition-colors mb-8">
                ← Technical Articles
              </a>
            </Link>

            <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-start">
              {/* Left: Title + meta */}
              <div>
                {/* Tag + date + read time */}
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 sm:gap-2.5 border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 whitespace-nowrap">
                    <span className="font-mono text-[10px] font-bold text-[#001f4d] tracking-[0.14em]">
                      {article.tag}
                    </span>
                    <span
                      className="h-3 w-px bg-slate-300"
                      aria-hidden="true"
                    />
                    <time className="font-mono text-[10px] font-semibold text-slate-600">
                      {formatDisplayDate(article.date)}
                    </time>
                    <span className="text-slate-300 select-none" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-slate-600">
                      {article.readTime.toLowerCase()} read
                    </span>
                  </div>
                </div>

                {/* H1 */}
                <h1 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-black text-[#001f4d] leading-[1.1] tracking-tight max-w-[24ch]">
                  {formatHeadingCase(article.title)}
                </h1>

                {/* Excerpt */}
                <p className="mt-5 text-[16px] text-slate-600 leading-relaxed max-w-[60ch]">
                  {article.excerpt}
                </p>

                {/* Author row */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#001f4d] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                      {author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#001f4d] leading-none">
                      {author}
                    </p>
                    <p className="font-mono text-[11px] font-semibold text-slate-500 tracking-widest mt-1">
                      {authorInfo.title} · Sureay
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={article.image}
                  alt={formatHeadingCase(article.title)}
                  className="w-full aspect-[4/3] lg:aspect-auto lg:h-[420px] object-cover"
                  width={920}
                  height={690}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            READING LAYOUT — Sidebar + Article
        ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* Mobile TOC */}
          {h2Sections.length > 0 && (
            <details className="lg:hidden mb-8 border border-slate-200 bg-white group">
              <summary className="px-5 py-3.5 cursor-pointer list-none flex items-center justify-between select-none">
                <span className="font-mono text-[10px] text-slate-600 tracking-widest">
                  JUMP TO SECTION
                </span>
                <svg
                  className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <nav className="border-t border-slate-200 px-5 py-3">
                {h2Sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block py-2.5 text-sm text-slate-700 hover:text-[#001f4d] border-b border-slate-100 last:border-b-0 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </details>
          )}

          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-[100px] space-y-3">
                {/* Table of Contents */}
                {h2Sections.length > 0 && (
                  <div className="border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-3">
                      <p className="font-mono text-[11px] text-slate-600 tracking-widest font-semibold">
                        Contents
                      </p>
                    </div>
                    <nav className="px-5 py-3">
                      {h2Sections.map((s, si) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className="flex items-start gap-2.5 py-2.5 text-[12px] text-slate-600 hover:text-[#001f4d] border-b border-slate-100 last:border-b-0 transition-colors leading-snug group"
                        >
                          <span className="font-mono text-[11px] text-slate-500 mt-0.5 tabular-nums group-hover:text-[#001f4d] flex-shrink-0 w-4 font-semibold">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <span className="group-hover:font-semibold">{s.label}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Article meta + actions */}
                <div className="border border-slate-200 bg-white">
                  <div className="grid grid-cols-2">
                    <button
                      onClick={() => window.print()}
                      className="py-3 font-mono text-[9px] text-slate-500 tracking-widest border-r border-slate-200 hover:bg-slate-50 hover:text-[#001f4d] transition-colors"
                    >
                      Print
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(window.location.href)
                      }
                      className="py-3 font-mono text-[9px] text-slate-500 tracking-widest hover:bg-slate-50 hover:text-[#001f4d] transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Article Content ─────────────────────────────────────────── */}
            <article className="min-w-0">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case "h2": {
                    const sectionId = `section-${h2Idx++}`;
                    return (
                      <h2
                        key={i}
                        id={sectionId}
                        className="max-w-[760px] font-bold text-[1.2rem] md:text-[1.35rem] text-[#001f4d] tracking-tight border-t-2 border-[#001f4d]/10 pt-8 mt-14 mb-5 scroll-mt-[100px]"
                      >
                        {formatHeadingCase(block.value)}
                      </h2>
                    );
                  }
                  case "h3":
                    return (
                      <h3
                        key={i}
                        className="max-w-[760px] font-semibold text-[1rem] md:text-[1.1rem] text-[#001f4d] tracking-tight mt-10 mb-4"
                      >
                        {formatHeadingCase(block.value)}
                      </h3>
                    );
                  case "callout": {
                    const { label, body } = parseCalloutLabel(block.value);
                    return (
                      <div
                        key={i}
                        className="max-w-[760px] my-8 border-l-[3px] border-[#e8b84b] bg-amber-50/60 px-5 py-4"
                      >
                        <p className="font-mono text-[9px] text-[#b8892a] tracking-[0.2em] mb-2.5 uppercase">
                          {label}
                        </p>
                        <p className="text-[14px] text-slate-700 leading-relaxed">
                          {renderInlineLinks(body)}
                        </p>
                      </div>
                    );
                  }
                  case "image": {
                    figIdx += 1;
                    const cap = captionFromUrl(block.value);
                    return (
                      <div key={i} className="my-10 sm:my-12">
                        <div className="max-w-[760px] border border-slate-200 bg-white overflow-hidden">
                          <img
                            src={block.value}
                            alt={cap || formatHeadingCase(article.title)}
                            className="w-full max-h-[400px] object-contain bg-slate-50"
                            loading="lazy"
                            decoding="async"
                            width={1200}
                            height={800}
                          />
                          <div className="border-t border-slate-200 bg-[#f8fafc] px-5 py-3 flex items-center gap-3">
                            <span className="font-mono text-[9px] text-[#001f4d] tracking-[0.18em] font-bold flex-shrink-0">
                              Fig. {figIdx}
                            </span>
                            <span className="w-px h-3 bg-slate-300 flex-shrink-0" />
                            <span className="font-mono text-[9px] text-slate-500 tracking-widest">
                              {cap}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  case "table":
                    return (
                      <div
                        key={i}
                        className="my-10 -mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto"
                      >
                        <table className="w-full min-w-[520px] border-collapse text-[13px] lg:text-[14px]">
                          {block.tableHeaders &&
                            block.tableHeaders.length > 0 && (
                              <thead>
                                <tr className="bg-[#001f4d]">
                                  {block.tableHeaders.map((header, hi) => (
                                    <th
                                      key={hi}
                                      className="px-4 py-3.5 text-left font-mono text-[9px] tracking-widest text-white border-r border-white/10 last:border-r-0"
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
                                    ri % 2 === 0 ? "bg-white" : "bg-slate-50"
                                  }
                                >
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className={`px-4 py-3.5 text-slate-700 leading-relaxed align-top border-b border-slate-100 border-r border-slate-100 last:border-r-0 ${
                                        ci === 0
                                          ? "font-medium text-[#001f4d]"
                                          : ""
                                      }`}
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
                        className="max-w-[760px] text-[15px] leading-[1.85] text-slate-700 mb-6"
                      >
                        {renderInlineLinks(block.value)}
                      </p>
                    );
                }
              })}

              {/* End mark */}
              <div className="max-w-[760px] border-t border-slate-200 mt-16 pt-5 flex items-center gap-4">
                <div className="w-6 h-px bg-[#e8b84b]" />
                <span className="font-mono text-[9px] text-slate-400 tracking-[0.22em]">
                  END OF ARTICLE
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA — Technical Support Prompt
        ══════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <section className="border-t border-b border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-14">
              <div className="lg:pl-[calc(220px+4rem)] max-w-[calc(220px+4rem+760px)]">
                <p className="font-mono text-[9px] text-[#b8892a] tracking-[0.2em] mb-3 uppercase">
                  Technical Support
                </p>
                <h2 className="text-xl lg:text-2xl font-black text-[#001f4d] mb-3 tracking-tight">
                  Need help selecting the right blade for your application?
                </h2>
                <p className="text-[14px] text-slate-600 mb-7 leading-relaxed max-w-[58ch]">
                  Our engineering team can review your line specifications and
                  recommend the correct knife material, geometry, and regrind
                  schedule.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact">
                    <a className="block sm:inline-block bg-[#001f4d] text-white px-7 py-3.5 font-mono text-[10px] tracking-widest text-center hover:bg-[#002d6e] transition-colors">
                      Request Blade Recommendation
                    </a>
                  </Link>
                  <Link href={relatedBlades[0]?.link ?? "/products"}>
                    <a className="block sm:inline-block border border-[#001f4d] text-[#001f4d] px-7 py-3.5 font-mono text-[10px] tracking-widest text-center hover:bg-[#001f4d] hover:text-white transition-colors">
                      View {relatedBlades[0]?.name ?? "Related Products"}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            REFERENCED TOOLING
        ══════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <section className="bg-[#f4f6f8] py-16">
            <CompatibleTooling
              blades={relatedBlades}
              title="Referenced Tooling"
              subtitle="[ Articles → Products ]"
            />
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ARTICLE NAVIGATION — Prev / Next
        ══════════════════════════════════════════════════════════════════ */}
        <section className="border-t-2 border-[#001f4d]">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link href={`/news/${prev.id}`}>
                <a className="group border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest group-hover:text-white/50">
                    ← Previous Article
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(prev.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest">
                  ← Previous Article
                </span>
                <span className="font-black text-base text-[#001f4d]">
                  — None —
                </span>
              </div>
            )}

            {next ? (
              <Link href={`/news/${next.id}`}>
                <a className="group px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest group-hover:text-white/50">
                    Next Article →
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(next.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 opacity-30">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest">
                  Next Article →
                </span>
                <span className="font-black text-base text-[#001f4d]">
                  — None —
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
