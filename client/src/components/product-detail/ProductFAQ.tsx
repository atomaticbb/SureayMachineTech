/**
 * ProductFAQ — Zone: just above the RFQ form on product detail pages.
 *
 * Products with company FAQs also show a second column.
 *
 * Keeps FAQPage JSON-LD aligned with the visible technical questions.
 * Uses native <details>/<summary> — zero JS state, fully accessible,
 * CSS-animated via the Tailwind `group` + `group-open` variant.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/useTranslation";

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
  questionHeading?: "h3" | "h4";
}

function getAnswerParts(answer: string) {
  const parts: Array<{ text: string; href?: string }> = [];
  const links = Array.from(
    answer.matchAll(/\[([^\]\n]+)\]\((\/products\/[a-z0-9-]+)\)/g)
  );
  let start = 0;

  for (const match of links) {
    const { index } = match;
    parts.push({ text: answer.slice(start, index) });
    parts.push({ text: match[1], href: match[2] });
    start = index + match[0].length;
  }

  parts.push({ text: answer.slice(start) });
  return parts;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductFAQ({
  faqs,
  productName,
  questionHeading = "h3",
}: Props) {
  const { t, lang } = useTranslation();
  const allItems = [...faqs.technical, ...faqs.company];

  // ── FAQPage JSON-LD ─────────────────────────────────────────────────────────
  // Only the product's technical questions are included in structured data.
  useEffect(() => {
    if (faqs.technical.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: `${productName} — ${t("productDetail.faq.schemaSuffix")}`,
      mainEntity: faqs.technical.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: getAnswerParts(answer).map(part => part.text).join(""),
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
  }, [faqs.technical, productName, t]);

  if (allItems.length === 0) return null;

  return (
    <section
      aria-label={t("productDetail.faq.headline")}
      className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* ── Section header — matches TechnicalAudit / ComprehensiveData pattern ── */}
      {lang !== "en" && faqs.company.length > 0 && (
        <p className="font-mono text-[12px] text-slate-700  tracking-widest mb-3">
          {t("productDetail.faq.eyebrow")}
        </p>
      )}
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-8">
        {t(
          faqs.company.length === 0
            ? "productDetail.faq.technicalLabel"
            : "productDetail.faq.headline"
        )}
      </h2>

      {/* ── 2-column accordion grid ────────────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 border border-slate-200 ${faqs.company.length ? "lg:grid-cols-2" : ""}`}
      >
        {/* Left — Technical FAQs */}
        <div
          className={
            faqs.company.length
              ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
              : undefined
          }
        >
          {faqs.company.length > 0 && (
            <ColHeader
              index="01"
              label={t("productDetail.faq.technicalLabel")}
              dark
            />
          )}
          <div className="divide-y divide-slate-200">
            {faqs.technical.map((item, i) => (
              <FaqRow
                key={i}
                item={item}
                index={i}
                heading={questionHeading}
                linkProductReferences
              />
            ))}
          </div>
        </div>

        {/* Right — Why Choose Sureay */}
        {faqs.company.length > 0 && (
          <div>
            <ColHeader
              index="02"
              label={t("productDetail.faq.whyChooseLabel")}
              dark={false}
            />
            <div className="divide-y divide-slate-200">
              {faqs.company.map((item, i) => (
                <FaqRow
                  key={i}
                  item={item}
                  index={i}
                  heading={questionHeading}
                />
              ))}
            </div>
          </div>
        )}
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
      <span className="font-mono text-[12px] text-white  tracking-[0.28em] shrink-0">
        {index} /
      </span>
      <h3 className="font-black text-sm text-white  tracking-widest">
        {label}
      </h3>
    </div>
  );
}

function FaqRow({
  item,
  index,
  heading: Heading,
  linkProductReferences = false,
}: {
  item: FaqItem;
  index: number;
  heading: "h3" | "h4";
  linkProductReferences?: boolean;
}) {
  return (
    <details className="group">
      {/* ── Summary / trigger ──────────────────────────────────────────────── */}
      <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-slate-50 transition-colors duration-150">
        <div className="flex items-start gap-3 min-w-0">
          <span className="font-mono text-[12px] text-muted-foreground mt-[3px] shrink-0 tabular-nums w-5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Heading className="font-normal text-[18px] text-[#001f4d] leading-snug">
            {item.question}
          </Heading>
        </div>
        {/* +/− toggle indicator */}
        <span className="shrink-0 font-mono text-lg leading-none text-muted-foreground group-open:text-[#001f4d] transition-colors duration-150 mt-0.5">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>

      {/* ── Answer body ────────────────────────────────────────────────────── */}
      <div className="px-5 pt-0 pb-5 pl-14">
        <p className="text-[18px] text-slate-600 leading-relaxed border-l-2 border-[#001f4d] pl-3">
          {linkProductReferences
            ? getAnswerParts(item.answer).map(({ text, href }, i) =>
                href ? (
                  <Link
                    key={i}
                    href={href}
                    className="font-semibold text-[#003366] underline underline-offset-4"
                  >
                    {text}
                  </Link>
                ) : (
                  text
                )
              )
            : item.answer}
        </p>
      </div>
    </details>
  );
}
