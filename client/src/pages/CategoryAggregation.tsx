/**
 * CategoryAggregation — Category Hub Page
 * Route: /categories/:slug
 *
 * One hub per BladeCategoryType. Combines a long-form category overview,
 * the variant catalogue (with sector badges), the union of OEM platforms
 * served, and the representative variant's technical FAQs. Industry chips
 * cross-link to each sector landing page so the same family of blades can
 * be reached from either a product or industry mental model.
 *
 * Content is largely derived from the first blade in the category (its
 * fullDescription, compatibleMachines, faqs) so this page stays in sync
 * with blades.ts without a parallel content store.
 */

import { useRoute, Link, Redirect } from "wouter";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";

import {
  getCategoryBySlug,
  getBladesByCategory,
  getSectorsForCategory,
  getRepresentativeBlade,
  getOemMachinesForCategory,
  SECTOR_INDUSTRY_URL,
  SECTOR_LABEL,
} from "@/data/blade-categories";

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Pull the first paragraph (everything before the first blank line) from
 *  the representative blade's fullDescription so we get a clean intro
 *  without dragging in the markdown subsections that follow. */
function firstParagraph(text: string | undefined): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  const splitAt = trimmed.indexOf("\n\n");
  return splitAt === -1 ? trimmed : trimmed.slice(0, splitAt).trim();
}

export default function CategoryAggregation() {
  const [, params] = useRoute("/categories/:slug");
  const slug = params?.slug ?? "";

  if (slug === "custom-profile") {
    return <Redirect to="/custom" />;
  }

  const meta = getCategoryBySlug(slug);

  if (!meta) {
    return <Redirect to="/products" />;
  }

  const variants = getBladesByCategory(meta.category);
  const sectors = getSectorsForCategory(meta.category);
  const rep = getRepresentativeBlade(meta.category);
  const oemMachines = getOemMachinesForCategory(meta.category);
  const overviewBody = firstParagraph(rep?.fullDescription);

  return (
    <div className="min-h-screen bg-white antialiased">
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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: meta.title,
          url: `https://sureay.com/categories/${meta.slug}`,
          itemListElement: variants.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://sureay.com/products/${b.id}`,
            name: b.name,
          })),
        }).replace(/</g, "\\u003c")}</script>
      </Helmet>
      <Navbar />

      {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
      <section className="relative border-b border-slate-200 overflow-hidden mt-[74px] bg-white">
        {/* Right image panel — absolute, fills whatever height the left panel drives */}
        <div className="absolute inset-y-0 right-0 w-[48%] hidden lg:flex items-center p-8 bg-white">
          <img
            src={meta.heroImage}
            alt={meta.title}
            className="w-full h-full object-contain"
            width={700}
            height={460}
            decoding="async"
          />
        </div>

        {/* Left navy overlay — in normal flow so it drives section height */}
        <div
          className="relative bg-[#001f4d] flex flex-col justify-between pl-12 pr-24 sm:pl-20 sm:pr-32 lg:pl-28 lg:pr-40 py-10 lg:py-16 min-h-[420px] lg:min-h-[460px] w-full lg:w-[58%]"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
          }}
        >
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.28em] text-white/40 mb-6">
              [ Catalogue · Product Family ]
            </p>
            <h1 className="text-[56px] font-black text-white tracking-tight leading-[0.95] mb-7">
              {meta.title}
            </h1>
            <div className="w-12 h-[3px] bg-white/20 mb-7" />
            <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
              {meta.tagline}
            </p>
          </div>

          {/* Stat ledger — variant count, industries, OEM brands */}
          <dl className="grid grid-cols-3 gap-x-6 max-w-md font-mono">
            <div>
              <dt className="text-[10px] tracking-[0.28em] text-white/40 mb-1.5">
                Products
              </dt>
              <dd className="text-3xl font-black text-white tabular-nums leading-none">
                {String(variants.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.28em] text-white/40 mb-1.5">
                Industries
              </dt>
              <dd className="text-3xl font-black text-white tabular-nums leading-none">
                {String(sectors.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.28em] text-white/40 mb-1.5">
                OEM Brands
              </dt>
              <dd className="text-3xl font-black text-white tabular-nums leading-none">
                {String(oemMachines.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="#contact-rfq"
              className="inline-block font-sans text-[14px] font-bold tracking-[0.08em] bg-white text-[#001f4d] px-6 py-3 hover:bg-[#001f4d] hover:text-white border border-white transition-colors"
            >
              REQUEST A QUOTE
            </a>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: meta.shortName },
        ]}
      />

      {/* ── 2 · Industry Application Matrix ─────────────────────────────── */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          {/* Left — hook */}
          <div className="flex-shrink-0">
            <p className="font-black text-[13px] tracking-[0.22em] uppercase text-slate-900 leading-none">
              Engineered For
            </p>
            <div className="w-10 h-1 bg-[#001f4d] mt-2.5 mb-3" />
            <p className="text-xs text-slate-500 font-medium">
              Select your industry
            </p>
          </div>

          {/* Right — matrix buttons */}
          <div className="flex flex-wrap gap-3">
            {sectors.map(s => (
              <Link key={s} href={SECTOR_INDUSTRY_URL[s]}>
                <a className="group inline-flex items-center justify-between gap-4 min-w-[160px] bg-white border-2 border-slate-200 px-5 py-3.5 text-slate-800 font-bold text-[13px] hover:border-[#001f4d] hover:text-[#001f4d] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <span>{SECTOR_LABEL[s]}</span>
                  <svg
                    className="w-4 h-4 text-slate-300 group-hover:text-[#001f4d] transition-colors duration-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Overview (asymmetric two-column) ────────────────────────── */}
      <section className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          {/* Sidecar — section label + family name + image */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="font-mono text-[10px] text-slate-700  tracking-[0.32em] mb-4">
              [ 01 · Overview ]
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d]  tracking-tight leading-[1.05] mb-5">
              What are {meta.shortName.toLowerCase()}?
            </h2>
            {/* Product image */}
            <div className="mt-5 overflow-hidden border border-slate-200">
              <img
                src={rep?.gallery?.[1] ?? meta.heroImage}
                alt={meta.shortName}
                width={480}
                height={360}
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </aside>

          {/* Body — spec grid when available, otherwise text fallback */}
          <div className="lg:col-span-8">
            {meta.specItems && meta.specItems.length > 0 ? (
              <>
                <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-6">
                  [ KEY SPECIFICATIONS ]
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 mb-10">
                  {meta.specItems.map(item => (
                    <div key={item.label} className="bg-white px-5 py-4 flex flex-col gap-1">
                      <dt className="font-mono text-[9px] tracking-[0.28em] text-slate-400 uppercase">
                        {item.label}
                      </dt>
                      <dd className="font-black text-[18px] text-[#001f4d] tracking-tight leading-tight">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <>
                <p className="text-[18px] text-slate-800 leading-[1.55] mb-6 font-medium">
                  {meta.description}
                </p>
                {overviewBody && (
                  <p className="text-[16px] text-slate-600 leading-[1.7] max-w-[68ch]">
                    {overviewBody}
                  </p>
                )}
              </>
            )}

            {/* Engineering audit excerpts (if available on representative SKU) */}
            {rep?.components && rep.components.length > 0 && (
              <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                {rep.components.slice(0, 3).map(c => (
                  <li
                    key={c.id}
                    className="bg-white p-5 flex flex-col gap-2"
                  >
                    <span className="font-mono text-[9px] text-[#003366]  tracking-[0.32em]">
                      {c.tag}
                    </span>
                    <h3 className="font-black text-[16px] text-[#001f4d]  tracking-tight leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-[14px] text-slate-600 leading-snug line-clamp-4">
                      {c.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── 4 · Products catalogue (the core of the hub) ───────────────── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <p className="font-mono text-[10px] text-slate-700  tracking-[0.32em] mb-3">
                [ 02 · Products ]
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d]  tracking-tight leading-[1.05]">
                {variants.length} {meta.shortName} Configurations
              </h2>
              <p className="text-[16px] text-slate-600 leading-relaxed mt-3 max-w-2xl">
                Each card opens the OEM-specific spec sheet. The sector chip
                indicates the industry the SKU is engineered for; click an
                industry chip above to see every blade family used there.
              </p>
            </div>
          </div>

          <ProductGrid blades={variants} layout="grid" showSectorBadge />
        </div>
      </section>

      {/* ── 5 · Compatible OEM platforms ────────────────────────────────── */}
      {oemMachines.length > 0 && (
        <section className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
            <aside className="lg:col-span-4">
              <p className="font-mono text-[10px] text-slate-700  tracking-[0.32em] mb-4">
                [ 03 · OEM Compatibility ]
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#001f4d]  tracking-tight leading-[1.05] mb-4">
                Drop-in fit, no retooling
              </h2>
              <p className="text-[15px] text-slate-600 leading-[1.7] max-w-md">
                Every {meta.shortName.toLowerCase()} variant ships with bore,
                bolt-circle and tolerance specs matched to the original tool.
                Send your machine model or a sample blade for verification.
              </p>
            </aside>

            <div className="lg:col-span-8">
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
                {oemMachines.map(m => (
                  <li
                    key={m}
                    className="bg-white px-4 py-4 flex items-center justify-between gap-3"
                  >
                    <span className="font-black text-[14px] text-[#001f4d] tracking-tight leading-tight">
                      {m}
                      <sup className="font-mono text-[8px] font-normal text-slate-400 ml-0.5">®</sup>
                    </span>
                    <span className="font-mono text-[9px] text-[#003366] tracking-[0.22em] flex-shrink-0">
                      OEM
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── 6 · FAQ (representative SKU's technical Q&A) ───────────────── */}
      {rep?.faqs && (
        <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
          <ProductFAQ faqs={rep.faqs} productName={meta.title} />
        </section>
      )}

      <div id="contact-rfq">
        <ContactRFQ />
      </div>
      <Footer />
    </div>
  );
}
