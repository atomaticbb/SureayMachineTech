/**
 * CategoryLayout — High-Conversion B2B Category Page
 * Route: /categories/:slug
 *
 * 6 components, strict top-to-bottom order:
 *  1. CategoryHero              — Dark navy hero, H1, immediate quote CTA
 *  2. ProductConfigurationsGrid — 3-col cards with alloy/HRC/OEM on card face
 *  3. OemFitmentTable           — Dense dimensional compatibility table
 *  4. SeoTextCluster            — Semantic H2/H3 long-form for crawlers
 *  5. TechnicalFaq              — +/- accordion for engineering queries
 *  6. StickyRfqFooter           — Persistent fixed-bottom conversion banner
 */

import { useState } from "react";
import { useRoute, Link, Redirect } from "wouter";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactRFQ from "@/components/home/ContactRFQ";

import {
  getCategoryBySlug,
  getBladesByCategory,
  getRepresentativeBlade,
  getOemMachinesForCategory,
  type BladeCategoryMeta,
} from "@/data/blade-categories";
import { type Blade, type BladeSpec } from "@/data/blades";

// ── TypeScript interfaces ─────────────────────────────────────────────────────

interface IndustrialBlade {
  id: string;
  name: string;
  alloy: string;
  hardnessHRC: string;
  oemTargets: string[];
  imageUrl: string;
  link: string;
  badge?: string;
}

interface OemFitmentRow {
  platform: string;
  length: string;
  width: string;
  thickness: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const CAT_REF: Record<string, string> = {
  slitter_knives:    "SLT",
  shredder_blades:   "SHR",
  granulator_blades: "GRN",
  log_saw_blades:    "LSW",
  shear_blades:      "SHA",
  cold_saw_blades:   "CSW",
  wood_chipper:      "WCH",
  custom_profile:    "CST",
};

// ── Data helpers ──────────────────────────────────────────────────────────────

function findSpec(specs: BladeSpec[], keywords: string[]): string {
  const hit = specs.find(s =>
    keywords.some(k => s.label.toLowerCase().includes(k.toLowerCase()))
  );
  return hit?.value ?? "—";
}

function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1");
}

function extractHrc(raw: string): string {
  const m = raw.match(/HRC[\s\u00a0][\d\u2013\-]+/);
  return m ? m[0] : raw.split(/[|(]/)[0].trim().slice(0, 14);
}

function toIndustrialBlade(b: Blade): IndustrialBlade {
  return {
    id: b.id,
    name: b.name,
    alloy: findSpec(b.specs, ["material", "alloy", "steel"]),
    hardnessHRC: findSpec(b.specs, ["hardness", "hrc"]),
    oemTargets: b.compatibleMachines?.slice(0, 4) ?? [],
    imageUrl: b.image,
    link: b.link,
    badge: b.badge,
  };
}

function toFitmentRows(rep: Blade | undefined): OemFitmentRow[] {
  if (!rep?.standardDimensions) return [];
  return rep.standardDimensions
    .filter(d => d.spec)
    .map(d => ({
      platform:  d.spec ?? "—",
      length:    d.od ?? d.dimension ?? "—",
      width:     d.id ?? "—",
      thickness: d.thickness ?? "—",
    }));
}

function parseMarkdownSections(
  md: string | undefined
): { level: 2 | 3; heading: string; paragraphs: string[] }[] {
  if (!md) return [];
  const blocks: { level: 2 | 3; heading: string; paragraphs: string[] }[] = [];
  let current: (typeof blocks)[0] | null = null;
  let para = "";

  const flush = () => {
    if (current && para) {
      current.paragraphs.push(stripBold(para));
      para = "";
    }
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("### ")) {
      flush();
      if (current) blocks.push(current);
      current = { level: 3, heading: line.slice(4), paragraphs: [] };
    } else if (line.startsWith("## ")) {
      flush();
      if (current) blocks.push(current);
      current = { level: 2, heading: line.slice(3), paragraphs: [] };
    } else if (line === "") {
      flush();
    } else {
      para = para ? `${para} ${line}` : line;
    }
  }
  if (current) {
    flush();
    blocks.push(current);
  }
  return blocks.filter(b => b.paragraphs.length > 0).slice(0, 8);
}

// ── 1 · CategoryHero ─────────────────────────────────────────────────────────

function CategoryHero({
  meta,
  variantCount,
  oemCount,
  hrcRange,
}: {
  meta: BladeCategoryMeta;
  variantCount: number;
  oemCount: number;
  hrcRange: string;
}) {
  const ref = CAT_REF[meta.category] ?? "CAT";
  return (
    <header className="bg-[#001f4d] border-b-4 border-[#e8b84b]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20">
        <p className="font-mono text-[10px] tracking-[0.36em] text-white/35 mb-5">
          [ CAT-{ref} / {meta.category.replace(/_/g, "-").toUpperCase()} / SUREAY BLADES ]
        </p>

        <h1 className="text-[38px] sm:text-[52px] lg:text-[66px] font-black text-white tracking-[-0.02em] leading-[0.92] mb-6 max-w-4xl">
          {meta.title}
        </h1>

        <div className="w-20 h-px bg-white/15 mb-6" />

        <p className="text-white/65 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl mb-10">
          {meta.description}
        </p>

        <dl className="inline-grid grid-cols-3 border border-white/10 mb-10 divide-x divide-white/10">
          <div className="px-6 py-4">
            <dt className="font-mono text-[9px] tracking-[0.32em] text-white/35 mb-2">
              CONFIGURATIONS
            </dt>
            <dd className="font-black text-[32px] text-white tabular-nums leading-none">
              {String(variantCount).padStart(2, "0")}
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="font-mono text-[9px] tracking-[0.32em] text-white/35 mb-2">
              OEM PLATFORMS
            </dt>
            <dd className="font-black text-[32px] text-white tabular-nums leading-none">
              {String(oemCount).padStart(2, "0")}+
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="font-mono text-[9px] tracking-[0.32em] text-white/35 mb-2">
              HARDNESS
            </dt>
            <dd className="font-black text-[22px] text-white tabular-nums leading-none mt-1.5">
              {hrcRange}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#rfq"
            className="inline-block font-mono text-[12px] font-bold tracking-[0.18em] bg-[#e8b84b] text-[#001f4d] px-7 py-3.5 hover:bg-white transition-colors"
          >
            REQUEST ENGINEERING QUOTE →
          </a>
          <a
            href="#configurations"
            className="inline-block font-mono text-[12px] font-bold tracking-[0.18em] border border-white/25 text-white/60 px-7 py-3.5 hover:border-white/60 hover:text-white transition-colors"
          >
            VIEW {variantCount} CONFIGURATIONS ↓
          </a>
        </div>
      </div>
    </header>
  );
}

// ── 2 · ProductConfigurationsGrid ────────────────────────────────────────────

function ProductConfigurationsGrid({
  blades: items,
  categoryShortName,
}: {
  blades: IndustrialBlade[];
  categoryShortName: string;
}) {
  return (
    <section id="configurations" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 border-b border-slate-200 pb-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.32em] text-slate-400 mb-3">
              [ 01 / PRODUCT CONFIGURATIONS ]
            </p>
            <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.0]">
              {items.length} {categoryShortName} Configurations
            </h2>
          </div>
          <p className="text-[13px] text-slate-500 max-w-xs leading-snug">
            Alloy, hardness and OEM fitment visible on each card. Click for
            full dimensional spec sheet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {items.map(blade => (
            <article key={blade.id} className="bg-white flex flex-col">
              <div className="aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-200 relative">
                <img
                  src={blade.imageUrl}
                  alt={blade.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {blade.badge && (
                  <span className="absolute top-3 left-3 font-mono text-[9px] font-bold tracking-[0.2em] bg-[#001f4d] text-white px-2 py-1">
                    {blade.badge.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                <p className="font-mono text-[9px] tracking-[0.28em] text-slate-400 mb-1.5">
                  {categoryShortName.toUpperCase()}
                </p>
                <h3 className="font-black text-[17px] text-[#001f4d] tracking-tight leading-[1.15]">
                  {blade.name}
                </h3>
              </div>

              <dl className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100">
                <div className="bg-white px-5 py-3.5">
                  <dt className="font-mono text-[8px] tracking-[0.28em] text-slate-400 mb-1">
                    ALLOY / MATERIAL
                  </dt>
                  <dd className="font-bold text-[12px] text-[#001f4d] leading-tight line-clamp-2">
                    {blade.alloy}
                  </dd>
                </div>
                <div className="bg-white px-5 py-3.5">
                  <dt className="font-mono text-[8px] tracking-[0.28em] text-slate-400 mb-1">
                    HARDNESS
                  </dt>
                  <dd className="font-bold text-[12px] text-[#001f4d] leading-tight">
                    {blade.hardnessHRC}
                  </dd>
                </div>
              </dl>

              <div className="px-5 py-4 bg-slate-50 flex-1 border-b border-slate-100">
                <p className="font-mono text-[8px] tracking-[0.28em] text-slate-400 mb-2.5">
                  OEM FITMENT
                </p>
                {blade.oemTargets.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {blade.oemTargets.map(oem => (
                      <span
                        key={oem}
                        className="font-mono text-[10px] bg-white border border-slate-200 px-2.5 py-1 text-slate-700"
                      >
                        {oem}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-[11px] text-slate-400">
                    Custom order
                  </span>
                )}
              </div>

              <Link href={blade.link}>
                <a className="block text-center font-mono text-[11px] font-bold tracking-[0.2em] py-3.5 bg-[#001f4d] text-white hover:bg-[#003366] transition-colors">
                  FULL SPEC SHEET →
                </a>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3 · OemFitmentTable ──────────────────────────────────────────────────────

function OemFitmentTable({
  rows,
  categoryShortName,
  dimLabels,
}: {
  rows: OemFitmentRow[];
  categoryShortName: string;
  dimLabels?: { col1?: string; col2?: string; col3?: string };
}) {
  if (rows.length === 0) return null;

  const colL = (dimLabels?.col1 ?? "Length (mm)").toUpperCase();
  const colW = (dimLabels?.col2 ?? "Width (mm)").toUpperCase();
  const colT = (dimLabels?.col3 ?? "Thickness (mm)").toUpperCase();

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.32em] text-slate-400 mb-3">
            [ 02 / OEM DROP-IN FITMENT ]
          </p>
          <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.0] mb-3">
            Standard OEM Dimensions
          </h2>
          <p className="text-[15px] text-slate-600 max-w-2xl leading-relaxed">
            All {categoryShortName.toLowerCase()} supplied to the exact bore,
            bolt-circle and dimensional tolerance of the original OEM tool. Send
            your machine model number or a sample blade for instant verification.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="bg-[#001f4d]">
                <th className="font-mono text-[9px] tracking-[0.28em] text-white/50 px-5 py-3.5 border-r border-white/10">
                  OEM PLATFORM / MODEL
                </th>
                <th className="font-mono text-[9px] tracking-[0.28em] text-white/50 px-5 py-3.5 border-r border-white/10 text-right">
                  {colL}
                </th>
                <th className="font-mono text-[9px] tracking-[0.28em] text-white/50 px-5 py-3.5 border-r border-white/10 text-right">
                  {colW}
                </th>
                <th className="font-mono text-[9px] tracking-[0.28em] text-white/50 px-5 py-3.5 border-r border-white/10 text-right">
                  {colT}
                </th>
                <th className="font-mono text-[9px] tracking-[0.28em] text-white/50 px-5 py-3.5">
                  FIT STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                  <td className="font-bold text-[13px] text-[#001f4d] px-5 py-3.5 border-r border-slate-200">
                    {row.platform}
                  </td>
                  <td className="font-mono text-[13px] text-slate-700 px-5 py-3.5 border-r border-slate-200 text-right tabular-nums">
                    {row.length}
                  </td>
                  <td className="font-mono text-[13px] text-slate-700 px-5 py-3.5 border-r border-slate-200 text-right tabular-nums">
                    {row.width}
                  </td>
                  <td className="font-mono text-[13px] text-slate-700 px-5 py-3.5 border-r border-slate-200 text-right tabular-nums">
                    {row.thickness}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-[9px] font-bold tracking-[0.22em] border border-[#001f4d]/20 text-[#001f4d] bg-[#001f4d]/5 px-2.5 py-1">
                      DROP-IN ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-[11px] text-slate-400">
          * Custom dimensions available for unlisted platforms. Tolerance ±0.02
          mm. Matched counter-knife sets supplied on request.
        </p>
      </div>
    </section>
  );
}

// ── 4 · SeoTextCluster ───────────────────────────────────────────────────────

function SeoTextCluster({
  meta,
  rep,
}: {
  meta: BladeCategoryMeta;
  rep: Blade | undefined;
}) {
  const sections = parseMarkdownSections(rep?.fullDescription);
  if (sections.length === 0) return null;

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          <aside className="lg:col-span-3 lg:sticky lg:top-24 self-start">
            <p className="font-mono text-[10px] tracking-[0.32em] text-slate-400 mb-3">
              [ 03 / TECHNICAL OVERVIEW ]
            </p>
            <p className="text-[22px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
              {meta.title} — Engineering Overview
            </p>
            <div className="w-10 h-[2px] bg-[#001f4d] mb-4" />
            <p className="text-[14px] text-slate-500 leading-relaxed">
              {meta.description}
            </p>
          </aside>

          <div className="lg:col-span-9">
            {sections.map((section, i) => (
              <div
                key={i}
                className={i > 0 ? "mt-10 pt-10 border-t border-slate-100" : ""}
              >
                {section.level === 2 ? (
                  <h2 className="font-black text-[20px] text-[#001f4d] tracking-tight leading-tight mb-4">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="font-bold text-[17px] text-[#001f4d] tracking-tight leading-tight mb-3">
                    {section.heading}
                  </h3>
                )}
                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className={`text-[15px] text-slate-600 leading-[1.75] max-w-[72ch] ${j > 0 ? "mt-4" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5 · TechnicalFaq ─────────────────────────────────────────────────────────

function TechnicalFaq({
  faqs,
  productName,
}: {
  faqs: Blade["faqs"];
  productName: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  if (!faqs?.technical?.length) return null;

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.32em] text-slate-400 mb-3">
            [ 04 / ENGINEERING FAQ ]
          </p>
          <h2 className="text-[28px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.0]">
            Technical Q&amp;A — {productName}
          </h2>
        </div>

        <div className="border border-slate-200 divide-y divide-slate-200 bg-white">
          {faqs.technical.map((item, i) => (
            <article key={i}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIdx === i}
              >
                <h3 className="font-bold text-[15px] text-[#001f4d] tracking-tight leading-snug flex-1">
                  {item.question}
                </h3>
                <span
                  className="font-mono text-[22px] font-light text-slate-300 flex-shrink-0 leading-none mt-0.5 select-none"
                  aria-hidden
                >
                  {openIdx === i ? "\u2212" : "+"}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 border-t border-slate-100">
                  <p className="text-[14px] text-slate-600 leading-[1.75] max-w-[72ch] pt-4">
                    {item.answer}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6 · StickyRfqFooter ──────────────────────────────────────────────────────

function StickyRfqFooter({ categoryName }: { categoryName: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:block bg-[#001f4d] border-t-2 border-[#e8b84b]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <span className="font-mono text-[9px] tracking-[0.32em] text-white/30 flex-shrink-0 hidden lg:block">
            ENGINEERING INQUIRY
          </span>
          <p className="font-bold text-[14px] text-white leading-tight">
            Have a drawing or OEM part number?{" "}
            <span className="font-normal text-white/55">
              Request drop-in {categoryName.toLowerCase()} for your machine.
            </span>
          </p>
        </div>
        <a
          href="#rfq"
          className="flex-shrink-0 font-mono text-[11px] font-bold tracking-[0.18em] bg-[#e8b84b] text-[#001f4d] px-6 py-2.5 hover:bg-white transition-colors whitespace-nowrap"
        >
          REQUEST QUOTE →
        </a>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CategoryLayout() {
  const [, params] = useRoute("/categories/:slug");
  const slug = params?.slug ?? "";

  if (slug === "custom-profile") return <Redirect to="/custom" />;

  const meta = getCategoryBySlug(slug);
  if (!meta) return <Redirect to="/products" />;

  const variants         = getBladesByCategory(meta.category);
  const rep              = getRepresentativeBlade(meta.category);
  const oemCount         = getOemMachinesForCategory(meta.category).length;
  const industrialBlades = variants.map(toIndustrialBlade);
  const fitmentRows      = toFitmentRows(rep);
  const hrcRaw           = rep ? findSpec(rep.specs, ["hardness", "hrc"]) : "";
  const hrcDisplay       = hrcRaw ? extractHrc(hrcRaw) : "HRC 55+";

  return (
    <div className="min-h-screen bg-white antialiased pb-14 md:pb-0">
      <SEO
        title={meta.title}
        description={meta.description}
        canonicalUrl={`/categories/${meta.slug}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: meta.shortName, url: `/categories/${meta.slug}` },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: meta.title,
            url: `https://sureay.com/categories/${meta.slug}`,
            itemListElement: variants.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://sureay.com${b.link}`,
              name: b.name,
            })),
          }).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <Navbar />

      <main className="mt-[74px]">
        <CategoryHero
          meta={meta}
          variantCount={variants.length}
          oemCount={oemCount}
          hrcRange={hrcDisplay}
        />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: meta.shortName },
          ]}
        />

        <ProductConfigurationsGrid
          blades={industrialBlades}
          categoryShortName={meta.shortName}
        />

        <OemFitmentTable
          rows={fitmentRows}
          categoryShortName={meta.shortName}
          dimLabels={
            rep?.dimensionLabels
              ? {
                  col1: rep.dimensionLabels.col1,
                  col2: rep.dimensionLabels.col2,
                  col3: rep.dimensionLabels.col3,
                }
              : undefined
          }
        />

        <SeoTextCluster meta={meta} rep={rep} />

        <TechnicalFaq faqs={rep?.faqs} productName={meta.title} />

        <div id="rfq">
          <ContactRFQ />
        </div>
      </main>

      <Footer />

      <StickyRfqFooter categoryName={meta.shortName} />
    </div>
  );
}
