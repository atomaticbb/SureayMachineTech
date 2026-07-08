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
import ProductVariantCard from "@/components/product/ProductVariantCard";
import MobileContactBar from "@/components/product/MobileContactBar";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";

import { useLang } from "@/contexts/LangContext";
import {
  getCategoryBySlug,
  getBladesByCategory,
  getRepresentativeBlade,
  getOemMachinesForCategory,
} from "@/data/locales";

function firstParagraph(text: string | undefined): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  const splitAt = trimmed.indexOf("\n\n");
  return splitAt === -1 ? trimmed : trimmed.slice(0, splitAt).trim();
}

// Wide hero-banner crops for hubs that have one, keyed by category slug.
// Hubs without an entry fall back to their meta.heroImage product photo.
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "slitter-knives": "/images/hero/slitter-knives-hero.webp",
  "log-saw-blades": "/images/hero/log-saw-blades-hero.webp",
  "granulator-blades": "/images/hero/granulator-blades-hero.webp",
  "cold-saw-blades": "/images/hero/cold-saw-blades-hero.webp",
  "shredder-blades": "/images/hero/shredder-blades-hero.webp",
  "wood-chipper-blades": "/images/hero/wood-chipper-blades-hero.webp",
  "shear-blades": "/images/hero/shear-blades-hero.webp",
};

export default function CategoryAggregation() {
  const lang = useLang();
  const [, params] = useRoute("/categories/:slug");
  const slug = params?.slug ?? "";

  const meta = getCategoryBySlug(slug, lang);

  if (!meta) {
    return <Redirect to="/products" />;
  }

  const variants = getBladesByCategory(meta.category, lang);
  const rep = getRepresentativeBlade(meta.category, lang);
  const oemMachines = getOemMachinesForCategory(meta.category, lang);
  const overviewBody = firstParagraph(rep?.fullDescription);
  // A few hubs have a dedicated wide hero crop; every other hub falls back
  // to its existing product photo (meta.heroImage).
  const heroImageSrc = HERO_IMAGE_OVERRIDES[meta.slug] ?? meta.heroImage;
  const productsIntro = meta.description.split(".")[0] + ".";
  const whatsappPrefillText = `Hi, I'm interested in your ${meta.shortName.toLowerCase()}. My machine model is: `;

  function scrollToContact(e: { preventDefault: () => void }) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

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
        <script type="application/ld+json">
          {JSON.stringify({
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
          }).replace(/</g, "\\u003c")}
        </script>
        <link
          rel="preload"
          as="image"
          href={heroImageSrc}
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </Helmet>
      <Navbar />

      {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Category header"
        className="relative mt-[74px] h-[379px] bg-[#001f4d] border-b border-white/10 overflow-hidden"
      >
        <div
          className="hidden md:block absolute inset-y-0 right-0 w-1/2 lg:w-[45%]"
          style={{
            backgroundImage: `linear-gradient(to right, #001f4d 0%, rgba(0,31,77,0) 22%), url(${heroImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        />
        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center">
          <div className="w-full md:w-[68%] lg:w-[72%]">
            <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-black text-white tracking-tight leading-tight md:whitespace-nowrap">
              {meta.title}
            </h1>
            <p className="text-white/50 text-[16px] leading-snug mt-1.5 max-w-2xl">
              {meta.description.split(".")[0]}.
            </p>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-white text-[#001f4d] border-2 border-white hover:bg-[#001f4d] hover:text-white px-7 py-3.5 mt-7 font-black text-sm tracking-widest transition-all duration-300 rounded-none"
            >
              Get a Quote
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

      {/* ── 2 · Products ─────────────────────────────────────────────────── */}
      <section
        aria-label="Product configurations"
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-16">
          <div className="border-b border-slate-200 pb-2 mb-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h2 className="text-[36px] font-black text-[#001f4d] tracking-tight">
                {meta.shortName} Configurations
              </h2>
            </div>
            <p className="text-[14px] text-slate-500 leading-snug mt-1 max-w-[70ch]">
              {productsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {variants.map(blade => (
              <ProductVariantCard
                key={blade.id}
                blade={blade}
                sectorBadge={blade.sector}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Overview ─────────────────────────────────────────────────── */}
      <section
        aria-label="Technical overview"
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="font-mono text-[10px] tracking-[0.28em] mb-5 uppercase text-slate-600 font-bold">
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
                <p className="font-mono text-[10px] tracking-[0.28em] mb-5 uppercase text-slate-600 font-bold">
                  Key Specifications
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-10 bg-slate-300 border border-slate-300">
                  {meta.specItems.map(item => (
                    <div
                      key={item.label}
                      className="bg-white px-5 py-4 flex flex-col gap-1"
                    >
                      <dt className="font-mono tracking-[0.25em] uppercase text-[10px] text-slate-600 font-bold">
                        {item.label}
                      </dt>
                      <dd className="font-bold text-[#001f4d] leading-snug text-[17px]">
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
                <p className="font-mono text-[10px] tracking-[0.28em] mb-5 uppercase text-slate-600 font-bold">
                  Engineering Detail
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-300 border border-slate-300">
                  {rep.components.slice(0, 3).map(c => (
                    <li key={c.id} className="bg-white p-5 flex flex-col gap-2">
                      <span className="font-mono text-[9px] text-[#003a8c] tracking-[0.28em] uppercase font-bold">
                        {c.tag}
                      </span>
                      <h3 className="font-bold text-[15px] text-[#001f4d] leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-[13px] leading-[1.6] text-slate-700">
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
        <section
          aria-label="OEM compatibility"
          className="border-b border-slate-200 bg-white"
        >
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
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 self-start border-2 border-[#001f4d] bg-[#001f4d] hover:bg-white text-white hover:text-[#001f4d] font-black text-[12px] tracking-[0.18em] px-6 py-3.5 mt-6 transition-colors duration-200"
              >
                Check Compatibility with Us
              </a>
            </aside>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <ul className="flex flex-wrap gap-2">
                {oemMachines.map(m => (
                  <li
                    key={m}
                    className="border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <span className="font-bold text-[13px] text-[#001f4d] tracking-tight">
                      {m}®
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-4 max-w-2xl">
                All brand names and trademarks are the property of their
                respective owners and are used for machine compatibility
                reference only. Sureay is not affiliated with or endorsed by
                these manufacturers.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 5 · FAQ ──────────────────────────────────────────────────────── */}
      {rep?.faqs && (
        <section
          aria-label="Frequently asked questions"
          className="bg-slate-50 border-b border-slate-200 py-16 lg:py-20"
        >
          <ProductFAQ faqs={rep.faqs} productName={meta.title} />
        </section>
      )}

      <div id="contact-rfq">
        <ContactRFQ />
      </div>
      <Footer />

      <MobileContactBar whatsappPrefillText={whatsappPrefillText} />
      <FloatingContactButtons whatsappPrefillText={whatsappPrefillText} />
    </div>
  );
}
