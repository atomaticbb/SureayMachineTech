/**
 * CategoryAggregation — Category Hub Page
 * Route: /categories/:slug
 */

import { useRoute, Redirect } from "wouter";
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
  getRepresentativeBlade,
  getOemMachinesForCategory,
} from "@/data/blade-categories";

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

      {/* ── 1 · Slim Hero ───────────────────────────────────────────────── */}
      <section
        aria-label="Category header"
        className="mt-[74px] bg-[#001f4d] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7">
          <h1 className="text-[48px] font-black text-white tracking-tight leading-tight">
            {meta.title}
          </h1>
          <p className="text-white/50 text-[13px] leading-snug mt-1.5 max-w-2xl">
            {meta.description.split(".")[0]}.
          </p>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: meta.shortName },
        ]}
      />

      {/* ── 2 · Products ─────────────────────────────────────────────────── */}
      <section aria-label="Product configurations" className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-16">
          <div className="border-b border-slate-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-[36px] font-black text-[#001f4d] tracking-tight">
              {meta.shortName} Configurations
            </h2>
            <p className="text-[12px] text-slate-400 font-medium">
              {variants.length} variants, click any card for the full spec sheet
            </p>
          </div>
          <ProductGrid blades={variants} layout="grid" showSectorBadge />
        </div>
      </section>

      {/* ── 3 · Overview ─────────────────────────────────────────────────── */}
      <section aria-label="Technical overview" className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">

          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
              Technical Overview
            </p>
            <h2 className="text-[36px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-6">
              {meta.title}
            </h2>
            <div className="aspect-[4/3] overflow-hidden border border-slate-200 bg-white">
              <img
                src={rep?.gallery?.[1] ?? meta.heroImage}
                alt={meta.shortName}
                width={480}
                height={360}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </aside>

          <div className="lg:col-span-8">
            {meta.specItems && meta.specItems.length > 0 ? (
              <>
                <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
                  Key Specifications
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 mb-10">
                  {meta.specItems.map(item => (
                    <div key={item.label} className="bg-white px-5 py-4 flex flex-col gap-1">
                      <dt className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase">
                        {item.label}
                      </dt>
                      <dd className="font-bold text-[16px] text-[#001f4d] leading-snug">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <>
                <p className="text-[17px] text-slate-700 leading-[1.65] mb-5">
                  {meta.description}
                </p>
                {overviewBody && (
                  <p className="text-[15px] text-slate-500 leading-[1.75] max-w-[68ch]">
                    {overviewBody}
                  </p>
                )}
              </>
            )}

            {rep?.components && rep.components.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
                  Engineering Detail
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                  {rep.components.slice(0, 3).map(c => (
                    <li key={c.id} className="bg-white p-5 flex flex-col gap-2">
                      <span className="font-mono text-[9px] text-[#003a8c] tracking-[0.28em] uppercase">
                        {c.tag}
                      </span>
                      <h3 className="font-bold text-[15px] text-[#001f4d] leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-[1.6] line-clamp-4">
                        {c.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4 · OEM Compatibility ────────────────────────────────────────── */}
      {oemMachines.length > 0 && (
        <section aria-label="OEM compatibility" className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
            <aside className="lg:col-span-4">
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
                OEM Compatibility
              </p>
              <h2 className="text-[36px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
                Drop-in fit, no retooling
              </h2>
              <p className="text-[14px] text-slate-500 leading-[1.7] max-w-sm">
                Every {meta.shortName.toLowerCase()} variant ships with bore,
                bolt-circle and tolerance specs matched to the original tool.
                Send your machine model or a sample blade for verification.
              </p>
            </aside>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <ul className="flex flex-wrap gap-2">
                {oemMachines.map(m => (
                  <li
                    key={m}
                    className="border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <span className="font-bold text-[13px] text-[#001f4d] tracking-tight">
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── 5 · FAQ ──────────────────────────────────────────────────────── */}
      {rep?.faqs && (
        <section aria-label="Frequently asked questions" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-20">
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
