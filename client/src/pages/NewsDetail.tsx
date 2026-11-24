import { articleDateISO, articleDateLabel } from "@/lib/articleDate";
import { useState } from "react";
/**
 * NewsDetail.tsx — Technical Engineering Magazine Article View
 * Industrial B2B: precise, trustworthy, buyer reference.
 * Navy · White · Slate · Restrained gold accent
 */

import { useRoute, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SEO from "@/components/common/SEO";
import { TableScrollRegion } from "@/components/ui/table";
import {
  getDispatchAuthor,
  getDispatchAuthorInfo,
  getDispatchById,
  getAdjacentDispatches,
} from "@/data/news";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";
import type { Blade } from "@/data/blades";
import { getBladeById } from "@/data/locales";
import { useTranslation } from "@/lib/useTranslation";

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      if (/^https?:\/\//.test(match[2])) {
        return (
          <a
            key={i}
            href={match[2]}
            className="text-[#001f4d] underline underline-offset-2 decoration-[#001f4d]/40 hover:text-[#0b4a8f] hover:decoration-[#001f4d] transition-colors font-medium"
          >
            {renderInlineLinks(match[1])}
          </a>
        );
      }
      return (
        <Link key={i} href={match[2]} asChild>
          <a className="text-[#001f4d] underline underline-offset-2 decoration-[#001f4d]/40 hover:text-[#0b4a8f] hover:decoration-[#001f4d] transition-colors font-medium">
            {renderInlineLinks(match[1])}
          </a>
        </Link>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{renderInlineLinks(part.slice(2, -2))}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{renderInlineLinks(part.slice(1, -1))}</em>;
    }
    return part;
  });
}

function formatHeadingCase(text: string): string {
  if (/[a-z]/.test(text)) return text;
  const lowered = text.toLowerCase();
  return lowered.charAt(0).toUpperCase() + lowered.slice(1);
}

function captionFromUrl(url: string): string {
  const filename =
    url
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "") ?? "";
  return filename
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
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
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [copyUrl, setCopyUrl] = useState("");
  const { lang, t } = useTranslation();
  const [, params] = useRoute<{ id: string }>("/news/:id");
  const id = params?.id ?? "";

  const article = getDispatchById(id);
  const { prev, next } = getAdjacentDispatches(id);
  const author = getDispatchAuthor(id);
  const authorInfo = getDispatchAuthorInfo(id);

  const relatedBlades = (article?.relatedProductIds ?? [])
    .map(pid => getBladeById(pid, lang))
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
        <main className="site-content pt-[74px] max-w-7xl mx-auto px-6 lg:px-8 py-32">
          {lang !== "en" && (
            <p className="font-mono text-[12px] text-muted-foreground tracking-widest mb-4">
              Error: document not found
            </p>
          )}
          <h1 className="text-5xl font-black text-[#001f4d] mb-8">
            Article Not Found
          </h1>
          <Link href="/news" asChild>
            <a className="font-mono text-sm text-[#001f4d] tracking-widest border-b-2 border-[#001f4d] pb-1 hover:text-muted-foreground hover:border-slate-500 transition-colors">
              ← Back to {t("nav.news")}
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const articlePath = `/news/${article.id}`;
  const articleHeading = formatHeadingCase(article.title);
  const breadcrumbs = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.news"), href: "/news" },
    { label: articleHeading, href: articlePath },
  ];

  // Pre-compute TOC from H2 headings
  const h2Sections = article.content
    .filter(b => b.type === "h2")
    .map((b, i) => ({
      id: b.id ?? `section-${i}`,
      label: formatHeadingCase(b.value),
    }));

  // Visible FAQ blocks double as the FAQPage JSON-LD source, so the two
  // can never drift out of sync.
  const faqEntries = article.content.flatMap(b =>
    b.type === "faq" ? (b.faqItems ?? []) : []
  );

  // Mutable counters reset on each render
  let h2Idx = 0;
  let figIdx = 0;

  return (
    <div className={`min-h-screen antialiased ${lang === "en" ? "bg-white" : "bg-[#f4f6f8]"}`}>
      <SEO
        title={article.seoTitle ?? article.title}
        exactTitle={article.exactSeoTitle}
        ogType="article"
        description={article.metaDescription ?? article.excerpt}
        canonicalUrl={articlePath}
        keywords={article.keywords}
        ogImage={article.image}
        breadcrumbs={breadcrumbs.map(({ label, href }) => ({
          name: label,
          url: href,
        }))}
        extraJsonLd={[
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: [`https://sureay.com${article.image}`],
            datePublished: articleDateISO(article.date),
            dateModified: articleDateISO(article.modifiedDate ?? article.date),
            author: {
              "@type": article.authorType ?? "Person",
              name: author,
              ...(article.authorType === "Organization"
                ? { url: "https://sureay.com/about" }
                : { jobTitle: authorInfo.title }),
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
          ...(faqEntries.length > 0
            ? [
                JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqEntries.map(f => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer,
                    },
                  })),
                }),
              ]
            : []),
        ]}
      />
      <Navbar />

      <main className="pt-[74px]">
        <Breadcrumbs items={breadcrumbs} />
        {/* ══════════════════════════════════════════════════════════════════
            HERO — Article Header
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-start">
              {/* Left: Title + meta */}
              <div>
                {/* Tag + date + read time */}
                <div className="mb-5">
                  <div className="inline-flex max-w-full flex-wrap items-center gap-2 sm:gap-2.5 border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 whitespace-nowrap">
                    <span className="font-mono text-[12px] font-bold text-[#001f4d] tracking-[0.14em]">
                      {article.tag}
                    </span>
                    <span
                      className="h-3 w-px bg-slate-300"
                      aria-hidden="true"
                    />
                    <time
                      dateTime={articleDateLabel(article.date)}
                      className="font-mono text-[12px] font-semibold text-slate-600"
                    >
                      {articleDateLabel(article.date)}
                    </time>
                    <span
                      className="text-slate-300 select-none"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-slate-600">
                      {article.readTime.toLowerCase()} read
                    </span>
                  </div>
                </div>

                {/* H1 */}
                <h1 className="text-[30px] lg:text-[46px] font-black text-[#001f4d] leading-[1.1] tracking-tight max-w-[24ch]">
                  {articleHeading}
                </h1>

                {/* Excerpt */}
                {!article.keyFacts?.label && (
                  <p className="mt-5 text-[18px] text-slate-600 leading-relaxed max-w-[60ch]">
                    {article.excerpt}
                  </p>
                )}

                {/* Answer-first key facts */}
                {article.keyFacts && (
                  <div className="mt-6 max-w-[60ch] border border-slate-200 bg-slate-50/60 px-5 py-4">
                    {lang !== "en" && article.keyFacts.label && (
                      <p className="font-mono text-[14px] font-bold text-[#001f4d] tracking-[0.12em] mb-3 ">
                        {article.keyFacts.label}
                      </p>
                    )}
                    <p className="text-[16px] text-slate-700 leading-relaxed">
                      {article.keyFacts.intro}
                    </p>
                    {lang !== "en" && !article.keyFacts.label && (
                      <p className="font-mono text-[12px] text-muted-foreground tracking-[0.18em] mt-4 mb-2 ">
                        Quick Numbers
                      </p>
                    )}
                    <ul className="space-y-1.5 mt-3">
                      {article.keyFacts.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-[16px] text-slate-700 leading-snug"
                        >
                          <span className="text-[#001f4d] flex-shrink-0">
                            ·
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.modifiedDate && (
                  <p className="mt-4 text-[14px] text-muted-foreground">
                    Published{" "}
                    <time dateTime={articleDateISO(article.date)}>
                      {articleDateLabel(article.date)}
                    </time>{" "}
                    · Updated{" "}
                    <time dateTime={articleDateISO(article.modifiedDate)}>
                      {articleDateLabel(article.modifiedDate)}
                    </time>
                  </p>
                )}

                {/* Author row */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#001f4d] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[12px] text-white font-bold tracking-wider">
                      {author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-[#001f4d] leading-none">
                      {author}
                    </p>
                    <p className="font-mono text-[14px] font-semibold text-muted-foreground tracking-widest mt-1">
                      {authorInfo.title} · Sureay
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="overflow-hidden bg-slate-100 border border-slate-200 print:break-inside-avoid">
                <img
                  src={article.image}
                  {...(article.id ===
                    "granulator-rotor-bed-knife-configuration" && {
                    srcSet: `${article.image.replace(/\.webp$/i, "-640w.webp")} 640w, ${article.image} 1672w`,
                    sizes: "(max-width: 1024px) 100vw, 460px",
                  })}
                  {...(article.imageSrcSet && {
                    srcSet: article.imageSrcSet,
                    sizes: "(min-width: 1024px) 458px, calc(100vw - 50px)",
                  })}
                  alt={article.imageAlt ?? formatHeadingCase(article.title)}
                  className="w-full aspect-[4/3] lg:aspect-auto lg:h-[420px] object-cover print:h-auto print:max-h-[240px] print:object-contain"
                  width={article.imageWidth ?? 920}
                  height={article.imageHeight ?? 690}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            READING LAYOUT — Sidebar + Article
        ══════════════════════════════════════════════════════════════════ */}
        <section className="site-section site-content max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* Mobile TOC */}
          {h2Sections.length > 0 && (
            <details
              open={!!article.keyFacts?.label}
              className="lg:hidden mb-8 border border-slate-200 bg-white group"
            >
              <summary className="px-5 py-3.5 cursor-pointer list-none flex items-center justify-between select-none">
                <span className="font-mono text-[12px] text-slate-600 tracking-widest">
                  In this guide
                </span>
                <svg
                  className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform"
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
              <nav
                aria-label="In this guide"
                className="border-t border-slate-200 px-5 py-3"
              >
                {h2Sections.map(s => (
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
              <div className="lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto space-y-3">
                {/* Table of Contents */}
                {h2Sections.length > 0 && (
                  <div className="border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-3">
                      <p className="font-mono text-[14px] text-slate-600 tracking-widest font-semibold">
                        In this guide
                      </p>
                    </div>
                    <nav aria-label="In this guide" className="px-5 py-3">
                      {h2Sections.map((s, si) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className="flex items-start gap-2.5 py-2.5 text-[14px] text-slate-600 hover:text-[#001f4d] border-b border-slate-100 last:border-b-0 transition-colors leading-snug group"
                        >
                          <span className="font-mono text-[14px] text-muted-foreground mt-0.5 tabular-nums group-hover:text-[#001f4d] flex-shrink-0 w-4 font-semibold">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <span className="group-hover:font-semibold">
                            {s.label}
                          </span>
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
                      className="py-3 font-mono text-[12px] text-muted-foreground tracking-widest border-r border-slate-200 hover:bg-slate-50 hover:text-[#001f4d] transition-colors"
                    >
                      Print
                    </button>
                    <button
                      onClick={async () => {
                        const url = window.location.href;
                        setCopyUrl(url);
                        try {
                          if (!navigator.clipboard) throw new Error("Clipboard unavailable");
                          await navigator.clipboard.writeText(url);
                          setCopyStatus("copied");
                        } catch {
                          setCopyStatus("failed");
                        }
                      }}
                      className="py-3 font-mono text-[12px] text-muted-foreground tracking-widest hover:bg-slate-50 hover:text-[#001f4d] transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                  <div role="status" aria-live="polite" className="px-3 text-sm text-muted-foreground">
                    {copyStatus === "copied" && "Link copied."}
                    {copyStatus === "failed" && (
                      <label className="block py-2">
                        Copy this link manually:
                        <input className="block w-full border border-input p-2 text-foreground" readOnly value={copyUrl} onFocus={event => event.currentTarget.select()} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Article Content ─────────────────────────────────────────── */}
            <article className="min-w-0">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case "h2": {
                    const sectionId = h2Sections[h2Idx++].id;
                    return (
                      <h2
                        key={i}
                        id={sectionId}
                        className="max-w-[760px] font-bold text-[22px] md:text-[24px] text-[#001f4d] tracking-tight border-t-2 border-[#001f4d]/10 pt-8 mt-14 mb-5 scroll-mt-[100px]"
                      >
                        {formatHeadingCase(block.value)}
                      </h2>
                    );
                  }
                  case "h3":
                    return (
                      <h3
                        key={i}
                        className="max-w-[760px] font-semibold text-[18px] md:text-[20px] text-[#001f4d] tracking-tight mt-10 mb-4"
                      >
                        {formatHeadingCase(block.value)}
                      </h3>
                    );
                  case "list": {
                    const List = block.ordered ? "ol" : "ul";
                    return (
                      <List
                        key={i}
                        className={`max-w-[760px] pl-6 mb-6 space-y-2 text-[18px] leading-[1.85] text-slate-700 ${
                          block.ordered ? "list-decimal" : "list-disc"
                        }`}
                      >
                        {(block.items ?? []).map((item, itemIndex) => (
                          <li key={itemIndex}>{renderInlineLinks(item)}</li>
                        ))}
                      </List>
                    );
                  }
                  case "callout": {
                    const { label, body } = parseCalloutLabel(block.value);
                    return (
                      <div
                        key={i}
                        className="max-w-[760px] my-8 border-l-[3px] border-[#001f4d] bg-slate-50 px-5 py-4"
                      >
                        {lang !== "en" && (
                          <p className="font-mono text-[12px] text-[#001f4d] tracking-[0.2em] mb-2.5 ">
                            {label}
                          </p>
                        )}
                        <p className="text-[16px] text-slate-700 leading-relaxed">
                          {lang === "en" &&
                            (label === "Warning" || label === "Important") && (
                              <strong>{label}: </strong>
                            )}
                          {renderInlineLinks(body)}
                        </p>
                      </div>
                    );
                  }
                  case "image": {
                    figIdx += 1;
                    const cap =
                      block.imageCaption ??
                      block.caption ??
                      captionFromUrl(block.value);
                    const alt =
                      block.imageAlt ??
                      block.alt ??
                      (cap || formatHeadingCase(article.title));
                    return (
                      <div key={i} className="my-10 sm:my-12">
                        <figure className="max-w-[760px] border border-slate-200 bg-white overflow-hidden">
                          <img
                            src={block.value}
                            srcSet={block.imageSrcSet}
                            sizes={
                              block.imageSrcSet
                                ? "(min-width: 1024px) min(758px, calc(100vw - 366px)), (min-width: 640px) min(758px, calc(100vw - 50px)), calc(100vw - 34px)"
                                : undefined
                            }
                            alt={alt}
                            className="w-full max-h-[400px] object-contain bg-slate-50"
                            loading="eager"
                            fetchPriority="low"
                            decoding="async"
                            width={block.imageWidth ?? 1200}
                            height={block.imageHeight ?? 800}
                          />
                          <figcaption className="border-t border-slate-200 bg-[#f8fafc] px-5 py-3 flex items-center gap-3">
                            <span className="font-mono text-[12px] text-[#001f4d] tracking-[0.18em] font-bold flex-shrink-0">
                              Fig. {figIdx}
                            </span>
                            <span className="w-px h-3 bg-slate-300 flex-shrink-0" />
                            <span className="font-mono text-[12px] text-muted-foreground tracking-widest">
                              {cap}
                            </span>
                          </figcaption>
                        </figure>
                      </div>
                    );
                  }
                  case "gallery":
                    return (
                      <section
                        key={i}
                        aria-label={block.value}
                        className="max-w-[760px] my-10 grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        {(block.images ?? []).map((image, imageIndex) => (
                          <figure
                            key={imageIndex}
                            className="rounded-none border border-slate-200 bg-white overflow-hidden"
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full aspect-[4/3] object-contain bg-slate-50"
                              loading="eager"
                              fetchPriority="low"
                              decoding="async"
                              width={640}
                              height={480}
                            />
                            <figcaption className="border-t border-slate-200 px-4 py-3 text-[16px] leading-relaxed text-slate-600">
                              {image.href ? (
                                <Link href={image.href} asChild>
                                  <a className="font-semibold text-[#001f4d] underline underline-offset-4 decoration-[#001f4d] hover:text-[#0b4a8f] transition-colors">
                                    {image.caption}
                                  </a>
                                </Link>
                              ) : (
                                image.caption
                              )}
                            </figcaption>
                          </figure>
                        ))}
                      </section>
                    );
                  case "stats":
                    return (
                      <section
                        key={i}
                        aria-label={block.value}
                        className="max-w-[760px] my-8 rounded-none bg-[#001f4d] px-6 py-7 text-white"
                      >
                        <p className="font-mono text-[12px] tracking-[0.16em]  text-white/75 mb-6">
                          {block.value}
                        </p>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {(block.stats ?? []).map((stat, statIndex) => (
                            <div
                              key={statIndex}
                              className="flex flex-col gap-2"
                            >
                              <dt className="text-[16px] leading-relaxed text-white/80">
                                {stat.label}
                              </dt>
                              <dd className="order-first font-display text-3xl font-bold tracking-tight text-white">
                                {stat.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </section>
                    );
                  case "cta":
                    return (
                      <section
                        key={i}
                        aria-labelledby={`article-cta-${i}`}
                        className="max-w-[760px] my-10 rounded-none border-t-[3px] border-white bg-[#001f4d] px-6 py-8 sm:px-8 text-white"
                      >
                        <h3
                          id={`article-cta-${i}`}
                          className="text-xl sm:text-2xl font-bold tracking-tight"
                        >
                          {block.value}
                        </h3>
                        {block.description && (
                          <p className="mt-3 text-[16px] leading-relaxed text-white/80">
                            {block.description}
                          </p>
                        )}
                        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                          {(block.links ?? []).map((link, linkIndex) => (
                            <Link key={linkIndex} href={link.href} asChild>
                              <a
                                className={`rounded-none px-5 py-3 text-[16px] font-semibold text-center transition-colors ${
                                  linkIndex === 0
                                    ? "bg-white text-[#001f4d] hover:underline"
                                    : "border border-white/50 text-white hover:bg-white/10"
                                }`}
                              >
                                {link.label}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </section>
                    );
                  case "faq":
                    return (
                      <div key={i} className="max-w-[760px] my-8 space-y-5">
                        {(block.faqItems ?? []).map((item, qi) => (
                          <div
                            key={qi}
                            className="border-l-[3px] border-[#001f4d]/20 pl-5"
                          >
                            <p className="font-bold text-[18px] text-[#001f4d] mb-1.5">
                              {item.question}
                            </p>
                            <p className="text-[16px] text-slate-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  case "table":
                    return (
                      <div key={i} className="my-10">
                        <TableScrollRegion
                          label={block.tableCaption || "Table"}
                          pinFirstColumn={lang === "en"}
                          className={lang === "en" ? undefined : "-mx-6 px-6 sm:mx-0 sm:px-0"}
                        >
                          <table className="w-full min-w-[520px] border-collapse text-[16px] lg:text-[16px]">
                            {block.tableCaption && (
                              <caption className="text-left text-[16px] text-slate-600 mb-3">
                                {block.tableCaption}
                              </caption>
                            )}
                            {block.tableHeaders &&
                              block.tableHeaders.length > 0 && (
                                <thead>
                                  <tr className="bg-[#001f4d]">
                                    {block.tableHeaders.map((header, hi) => (
                                      <th
                                        key={hi}
                                        scope="col"
                                        className="px-4 py-3.5 text-left font-mono text-[12px] tracking-widest text-white border-r border-white/10 last:border-r-0"
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
                                    {row.map((cell, ci) => {
                                      const Cell = ci === 0 ? "th" : "td";
                                      return (
                                        <Cell
                                          key={ci}
                                          scope={ci === 0 ? "row" : undefined}
                                          className={`px-4 py-3.5 text-left text-slate-700 leading-relaxed align-top border-b border-slate-100 border-r border-slate-100 last:border-r-0 ${
                                            ci === 0
                                              ? "font-medium text-[#001f4d]"
                                              : ""
                                          }`}
                                        >
                                          {renderInlineLinks(cell)}
                                        </Cell>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            )}
                          </table>
                        </TableScrollRegion>
                      </div>
                    );
                  default:
                    return (
                      <p
                        key={i}
                        className="max-w-[760px] text-[18px] leading-[1.85] text-slate-700 mb-6"
                      >
                        {renderInlineLinks(block.value)}
                      </p>
                    );
                }
              })}

              {/* End mark */}
              {lang !== "en" && (
                <div className="max-w-[760px] border-t border-slate-200 mt-16 pt-5 flex items-center gap-4">
                  <div className="w-6 h-px bg-[#001f4d]" />
                  <span className="font-mono text-[12px] text-muted-foreground tracking-[0.22em]">
                    End of article
                  </span>
                </div>
              )}
            </article>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA — Technical Support Prompt
        ══════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <section className="site-section border-t border-b border-slate-200 bg-white">
            <div className="site-content max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-14">
              <div className="lg:pl-[calc(220px+4rem)] max-w-[calc(220px+4rem+760px)]">
                {lang !== "en" && (
                  <p className="font-mono text-[12px] text-[#001f4d] tracking-[0.2em] mb-3 ">
                    Technical Support
                  </p>
                )}
                <h2 className="text-xl lg:text-2xl font-black text-[#001f4d] mb-3 tracking-tight">
                  Need help selecting the right blade for your application?
                </h2>
                <p className="text-[16px] text-slate-600 mb-7 leading-relaxed max-w-[58ch]">
                  Our engineering team can review your line specifications and
                  recommend the correct knife material, geometry, and regrind
                  schedule.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" asChild>
                    <a className="block sm:inline-block bg-[#001f4d] text-white px-7 py-3.5 font-mono text-[12px] tracking-widest text-center hover:bg-[#002d6e] transition-colors">
                      Request Blade Recommendation
                    </a>
                  </Link>
                  <Link href={relatedBlades[0]?.link ?? "/products"} asChild>
                    <a className="block sm:inline-block border border-[#001f4d] text-[#001f4d] px-7 py-3.5 font-mono text-[12px] tracking-widest text-center hover:bg-[#001f4d] hover:text-white transition-colors">
                      View {relatedBlades[0]?.name ?? "Related Products"}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            Referenced tooling
        ══════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <section className="site-section bg-[#f4f6f8] py-16">
            <CompatibleTooling
              blades={relatedBlades}
              title="Referenced Tooling"
              subtitle={lang === "en" ? "" : "Articles → products"}
            />
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ARTICLE NAVIGATION — Prev / Next
        ══════════════════════════════════════════════════════════════════ */}
        <section className="site-section border-t-2 border-[#001f4d]">
          <div className="site-content grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link href={`/news/${prev.id}`} asChild>
                <a className="group border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[12px] text-muted-foreground tracking-widest group-hover:text-white/80">
                    ← Previous Article
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(prev.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="border-b sm:border-b-0 sm:border-r border-[#001f4d] px-8 lg:px-16 py-12 flex flex-col gap-3">
                <span className="font-mono text-[12px] text-muted-foreground tracking-widest">
                  ← Previous Article
                </span>
                <span className="font-black text-base text-[#001f4d]">
                  — None —
                </span>
              </div>
            )}

            {next ? (
              <Link href={`/news/${next.id}`} asChild>
                <a className="group px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3 hover:bg-[#001f4d] transition-none cursor-pointer">
                  <span className="font-mono text-[12px] text-muted-foreground tracking-widest group-hover:text-white/80">
                    Next Article →
                  </span>
                  <span className="font-black text-base lg:text-lg text-[#001f4d] leading-tight group-hover:text-white">
                    {formatHeadingCase(next.title)}
                  </span>
                </a>
              </Link>
            ) : (
              <div className="px-8 lg:px-16 py-12 flex flex-col items-start sm:items-end sm:text-right gap-3">
                <span className="font-mono text-[12px] text-muted-foreground tracking-widest">
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
