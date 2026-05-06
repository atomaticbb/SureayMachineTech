/**
 * ProductFAQ — Zone: just above the RFQ form on product detail pages.
 *
 * Two-column accordion layout:
 *   Left  → Technical FAQs (product-specific)
 *   Right → Why Choose Sureay (company trust)
 *
 * Injects FAQPage JSON-LD into <head> for Google SERP rich results.
 * Uses native <details>/<summary> — zero JS state, fully accessible,
 * CSS-animated via the Tailwind `group` + `group-open` variant.
 */

import { useEffect } from "react";

// ── Types (also exported so blades.ts can reference them) ─────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductFaqData {
  technical: FaqItem[];
  company: FaqItem[];
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  faqs: ProductFaqData;
  /** Used as the FAQPage schema name — pass blade.fullName or blade.name */
  productName: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductFAQ({ faqs, productName }: Props) {
  const allItems = [...faqs.technical, ...faqs.company];

  // ── FAQPage JSON-LD ─────────────────────────────────────────────────────────
  // Only technical FAQs go into the schema — they are unique per product page.
  // Company FAQs are identical across all pages; including them in JSON-LD
  // would create duplicate structured data across 9 URLs, suppressing rich
  // results sitewide. Company FAQs remain visible in the UI for conversion.
  useEffect(() => {
    if (faqs.technical.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: `${productName} — Frequently Asked Questions`,
      mainEntity: faqs.technical.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    };

    const existing = document.getElementById("faq-jsonld");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("faq-jsonld")?.remove();
    };
  }, [faqs.technical, productName]);

  if (allItems.length === 0) return null;

  return (
    <section
      aria-label="Product FAQs and buying guidance"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* ── Section header — matches TechnicalAudit / ComprehensiveData pattern ── */}
      <p className="font-mono text-[10px] text-slate-700  tracking-widest mb-3">
        [ Knowledge Base ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-8">
        Product FAQs &amp; Buying Guidance
      </h2>

      {/* ── 2-column accordion grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200">
        {/* Left — Technical FAQs */}
        <div className="border-b border-slate-200 lg:border-b-0 lg:border-r lg:border-slate-200">
          <ColHeader index="01" label="Technical FAQs" dark />
          <div className="divide-y divide-slate-200">
            {faqs.technical.map((item, i) => (
              <FaqRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Right — Why Choose Sureay */}
        <div>
          <ColHeader index="02" label="Why Choose Sureay" dark={false} />
          <div className="divide-y divide-slate-200">
            {faqs.company.map((item, i) => (
              <FaqRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ColHeader({
  index,
  label,
  dark,
}: {
  index: string;
  label: string;
  dark: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 ${
        dark ? "bg-[#001f4d]" : "bg-slate-900"
      }`}
    >
      <span className="font-mono text-[10px] text-[#e8b84b]  tracking-[0.28em] shrink-0">
        {index} /
      </span>
      <h3 className="font-black text-sm text-white  tracking-widest">
        {label}
      </h3>
    </div>
  );
}

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  return (
    <details className="group">
      {/* ── Summary / trigger ──────────────────────────────────────────────── */}
      <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-slate-50 transition-colors duration-150">
        <div className="flex items-start gap-3 min-w-0">
          <span className="font-mono text-[10px] text-slate-400 mt-[3px] shrink-0 tabular-nums w-5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-[16px] text-[#001f4d] leading-snug">
            {item.question}
          </span>
        </div>
        {/* +/− toggle indicator */}
        <span className="shrink-0 font-mono text-lg leading-none text-slate-400 group-open:text-[#e8b84b] transition-colors duration-150 mt-0.5">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>

      {/* ── Answer body ────────────────────────────────────────────────────── */}
      <div className="px-5 pt-0 pb-5 pl-14">
        <p className="text-[16px] text-slate-600 leading-relaxed border-l-2 border-[#e8b84b] pl-3">
          {item.answer}
        </p>
      </div>
    </details>
  );
}
