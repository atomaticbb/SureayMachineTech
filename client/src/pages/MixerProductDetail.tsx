/**
 * MixerProductDetail — Mixer Wear Part detail page
 * Route: /mixer-wear-parts/:slug/:id  (slug = category, id = product)
 *
 * Reuses the generic, data-driven blade detail components (DecisiveSpecs,
 * TechnicalAudit, InlineRFQPrompt, ProductFAQ, ProductGrid) via the
 * mixerToBlade adapter. The hero, trust strip and OEM section are inlined here
 * because the blade versions carry blade-specific copy / links (blade catalog
 * download, hardcoded /products link) that must not appear in the mixer cluster.
 */

import { useEffect, useState } from "react";
import { useRoute, Redirect, Link } from "wouter";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactRFQ from "@/components/home/ContactRFQ";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";

import DecisiveSpecs from "@/components/product-detail/DecisiveSpecs";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import InlineRFQPrompt from "@/components/product-detail/InlineRFQPrompt";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import ProductGrid from "@/components/product/ProductGrid";

import {
  getMixerPartById,
  getRelatedMixerParts,
  getMixerCategoryByType,
  mixerCompanyFaq,
} from "@/data/mixerParts";
import { mixerToBlade } from "@/lib/mixerToBlade";
import {
  GRADE_GUIDE,
  gradeGroupForSector,
  ORDER_STEPS,
} from "@/data/mixerContent";

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

// Trust bar — slots 1 & 4 are global (true for every mixer part); slots 2 & 3
// come from each product's trustProcess / trustProperty (see mixerParts.ts),
// falling back to the old globals so any part without them still renders.

export default function MixerProductDetail() {
  const [, params] = useRoute("/mixer-wear-parts/:slug/:id");
  const [activeImg, setActiveImg] = useState(0);
  const slug = params?.slug ?? "";
  const part = getMixerPartById(params?.id ?? "");

  // Reset the gallery to the hero shot when navigating between products
  // (the route stays mounted, so state would otherwise carry over).
  useEffect(() => setActiveImg(0), [params?.id]);

  // 404 — part not found
  if (!part) {
    return (
      <>
        <SEO
          title="404 — Mixer Wear Part Not Found"
          description="The requested mixer wear part page does not exist."
          noIndex
        />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">
              Mixer wear part not found
            </p>
            <Link href="/mixer-wear-parts">
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-black tracking-widest rounded-none hover:bg-[#001f4d] transition-colors duration-200">
                Back to Mixer Wear Parts
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const category = getMixerCategoryByType(part.category);

  // The category slug in the URL must match the product's actual category;
  // otherwise send the crawler/user to the one canonical 3-segment path.
  if (category && slug !== category.id) {
    return <Redirect to={part.link} />;
  }

  const bladeLike = mixerToBlade(part);
  const related = getRelatedMixerParts(part.id, 4).map(mixerToBlade);
  const galleryImages =
    part.gallery && part.gallery.length > 0 ? part.gallery : [part.image];
  const activeSrc =
    galleryImages[Math.min(activeImg, galleryImages.length - 1)];
  const material = part.specs.find(s => s.label === "Material")?.value;
  const heroSpecs = part.specs.filter(
    s => /^material$/i.test(s.label) || /^application$/i.test(s.label)
  );

  const trustItems = [
    "ISO 9001:2015 Certified",
    part.trustProcess ?? "Lost-Foam & DISA Casting",
    part.trustProperty ?? "HB 600+ Wear Hardness",
    "Ships to 50+ Countries",
  ];

  const gradeGuide = GRADE_GUIDE[gradeGroupForSector(part.sector)];

  // SEO title keeps the high-intent OEM names; brand suffix added by <SEO>.
  const oemTop = part.compatibleMachines.slice(0, 2).join(" & ");
  const seoTitle = `${part.name} for ${oemTop}`;

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <SEO
        title={seoTitle}
        description={part.description}
        canonicalUrl={part.link}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Mixer Wear Parts", url: "/mixer-wear-parts" },
          ...(category ? [{ name: category.name, url: category.link }] : []),
          { name: part.name, url: part.link },
        ]}
        productData={{
          name: part.fullName || part.name,
          image: part.image,
          images: part.gallery?.slice(0, 4),
          description: part.fullDescription || part.description,
          sku: part.id,
          mpn: part.id,
          brand: "Sureay",
          material,
        }}
      />

      <Navbar />

      <main className="flex-grow pt-[68px]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Mixer Wear Parts", href: "/mixer-wear-parts" },
            ...(category
              ? [{ label: category.name, href: category.link }]
              : []),
            { label: part.name },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
          <div className="flex flex-col gap-y-8">
            {/* Zone 1 — Hero */}
            <section
              aria-label={`${part.fullName || part.name} — product hero`}
              className="flex flex-col lg:flex-row overflow-hidden"
            >
              <div className="lg:w-[580px] lg:shrink-0 border-r border-slate-200">
                <div
                  className="h-[320px] lg:h-[520px] bg-slate-100 flex items-center justify-center overflow-hidden"
                  style={DOT_GRID_STYLE}
                >
                  <img
                    src={activeSrc}
                    alt={part.fullName || part.name}
                    className="h-full w-full object-contain p-3 mix-blend-multiply"
                    loading="eager"
                    decoding="async"
                    width={580}
                    height={520}
                    onError={e => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                </div>
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 p-3 border-t border-slate-200 bg-white">
                    {galleryImages.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        aria-label={`View image ${i + 1} of ${part.name}`}
                        aria-current={i === activeImg}
                        className={`h-16 w-16 lg:h-20 lg:w-20 shrink-0 border overflow-hidden transition-colors ${
                          i === activeImg
                            ? "border-[#001f4d]"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                        style={DOT_GRID_STYLE}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-contain p-1 mix-blend-multiply"
                          loading="lazy"
                          decoding="async"
                          onError={e => {
                            e.currentTarget.src =
                              "/images/products/product.webp";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
                <div className="space-y-5">
                  <h1 className="font-black text-[26px] text-[#001f4d] leading-[1.15] tracking-tight">
                    {part.fullName || part.name}
                  </h1>
                  <p className="text-[16px] font-bold text-black tracking-widest border-l-2 border-[#001f4d] pl-3">
                    {part.categoryDisplay}
                  </p>
                  <p className="text-[16px] text-black leading-relaxed">
                    {part.description}
                  </p>
                  {heroSpecs.length > 0 && (
                    <ul className="space-y-2.5 pt-1">
                      {heroSpecs.map((spec, i) => (
                        <li key={i} className="flex items-baseline gap-2">
                          <span className="text-black font-black flex-shrink-0 text-[11px]">
                            ■
                          </span>
                          <span className="text-[16px] leading-snug">
                            <span className="font-bold text-black tracking-wide">
                              {spec.label}:{" "}
                            </span>
                            <span className="text-black">{spec.value}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8">
                  <a
                    href="#rfq"
                    onClick={e => {
                      e.preventDefault();
                      document
                        .getElementById("rfq")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
                  >
                    <span>Request Engineering Quote</span>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                </div>
              </div>
            </section>

            {/* Zone 1b — Trust strip */}
            <div className="-mx-4 sm:-mx-8">
              <section
                aria-label="Trust credentials"
                className="border-y border-slate-700 bg-white py-4"
              >
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                  <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3">
                    {trustItems.map((item, i) => (
                      <p
                        key={i}
                        className="font-mono text-[11px] text-slate-700 tracking-widest"
                      >
                        ■ {item}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Zone 2 — Decisive Specs (reused) */}
            {/* TODO: dimensioned spec drawing — primary image used until a
                CAD/dimension asset exists */}
            <div className="-mx-4 sm:-mx-8">
              <DecisiveSpecs blade={bladeLike} specImage={part.image} />
            </div>

            {/* Zone 2b — Grade selection guidance (how to choose) */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <section
                aria-label="Choosing the right grade"
                className="max-w-7xl mx-auto px-6 sm:px-8"
              >
                <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                  [ Grade Selection ]
                </p>
                <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-4">
                  Choosing the Right Grade
                </h2>
                <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-8">
                  {gradeGuide.intro}
                </p>
                <div className="border border-slate-300 divide-y divide-slate-200">
                  {gradeGuide.rows.map(row => (
                    <div
                      key={row.duty}
                      className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_1fr] gap-x-6 gap-y-1 px-5 py-4"
                    >
                      <span className="font-black text-[14px] text-[#001f4d] tracking-tight border-l-2 border-[#001f4d] pl-3">
                        {row.duty}
                      </span>
                      <span className="text-[14px] text-slate-600 leading-snug">
                        {row.grade}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-slate-500 leading-[1.7] mt-5 max-w-3xl">
                  Not sure which grade fits your plant? Send your aggregate
                  type, output and plant model and we recommend the grade with
                  your quote.
                </p>
              </section>
            </div>

            {/* Zone 2c — Available Grades / Variants (what's on offer) */}
            {part.variants && part.variants.length > 0 && (
              <div className="-mx-4 sm:-mx-8 pt-8">
                <section
                  aria-label="Available grades and variants"
                  className="max-w-7xl mx-auto px-6 sm:px-8"
                >
                  <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                    [ Available Grades / Variants ]
                  </p>
                  <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-4">
                    Available Grades &amp; Variants
                  </h2>
                  <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-8">
                    This part ships in several cast grades. Send your output,
                    aggregate hardness and plant model and we match the grade —
                    or cast to your exact OEM specification.
                  </p>
                  <div className="border border-slate-300 divide-y divide-slate-200">
                    {part.variants.map(v => (
                      <div
                        key={v.grade}
                        className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_1fr] gap-x-6 gap-y-1 px-5 py-4 hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-black text-[14px] text-[#001f4d] tracking-tight border-l-2 border-[#001f4d] pl-3">
                          {v.grade}
                        </span>
                        <span className="text-[14px] text-slate-600 leading-snug">
                          {v.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Inline RFQ prompt (reused) — before OEM / decision content */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <InlineRFQPrompt />
            </div>

            {/* Zone 3 — OEM compatibility (mixer wording) */}
            {part.compatibleMachines.length > 0 && (
              <div className="-mx-4 sm:-mx-8">
                <section
                  aria-label="Compatible mixing plant brands"
                  className="max-w-7xl mx-auto px-6 sm:px-8"
                >
                  <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                    [ OEM Compatibility ]
                  </p>
                  <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-10">
                    Compatible Mixing Plant Brands
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {part.compatibleMachines.map(brand => (
                      <span
                        key={brand}
                        className="border-t-2 border-t-[#001f4d] border border-slate-300 bg-white px-4 py-2 font-mono text-[13px] text-[#001f4d] font-semibold tracking-wide"
                      >
                        {brand}&#174;
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] text-slate-500 tracking-widest mt-6">
                    &#174; Registered trademarks are property of their
                    respective owners.
                  </p>
                </section>
              </div>
            )}

            {/* Zone 4 — Technical Audit (reused) */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <TechnicalAudit blade={bladeLike} />
            </div>
          </div>
        </div>

        {/* Overview — long-form detail, below the decision content */}
        {part.fullDescription && (
          <div className="mt-16">
            <section
              aria-label={`${part.name} overview`}
              className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6"
            >
              <aside className="lg:col-span-4">
                <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                  [ Overview ]
                </p>
                <h2 className="font-black text-3xl lg:text-4xl text-[#001f4d] tracking-tight leading-[1.1]">
                  About this part
                </h2>
                <div
                  className="mt-6 aspect-[4/3] border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
                  style={DOT_GRID_STYLE}
                >
                  <img
                    src={galleryImages[1] ?? galleryImages[0]}
                    alt={part.fullName || part.name}
                    className="w-full h-full object-contain p-4 mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                    onError={e => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                </div>
              </aside>
              <div className="lg:col-span-8 space-y-5">
                {part.fullDescription.split(/\n\n+/).map((para, i) => (
                  <p
                    key={i}
                    className="text-[16px] text-slate-700 leading-[1.8] max-w-[70ch]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* How to Order — reverse-engineer process (primes the decision) */}
        <div className="mt-16">
          <section
            aria-label="How to order"
            className="max-w-7xl mx-auto px-6 sm:px-8"
          >
            <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
              [ How to Order ]
            </p>
            <h2 className="font-black text-3xl lg:text-4xl text-[#001f4d] tracking-tight mb-4">
              Made to fit your plant — from a sample or a model
            </h2>
            <p className="text-[15px] text-slate-600 leading-[1.7] max-w-3xl mb-10">
              Every part is cast to order. There is no catalogue number to look
              up — we reverse-engineer the fit from your worn part or plant
              model, so you get an exact replacement rather than a near-miss.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
              {ORDER_STEPS.map(step => (
                <div key={step.tag} className="bg-white p-6 flex flex-col">
                  <span className="font-mono text-[11px] text-[#003a8c] tracking-[0.28em] mb-3">
                    {step.tag}
                  </span>
                  <h3 className="font-black text-lg text-[#001f4d] tracking-tight leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-[1.7]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Zone 5 — Related mixer parts (same category only) */}
        {related.length > 0 && (
          <div className="mt-16">
            <section
              aria-label="Related mixer wear parts"
              className="max-w-7xl mx-auto px-6 sm:px-8"
            >
              <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
                [ Same Mixing Plant ]
              </p>
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="font-black text-3xl text-[#001f4d] tracking-tight">
                  Related {part.categoryDisplay} Parts
                </h2>
                {category && (
                  <Link href={category.link}>
                    <span className="font-mono text-[10px] text-slate-700 tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
                      View All →
                    </span>
                  </Link>
                )}
              </div>
              <ProductGrid blades={related} layout="related" />
            </section>
          </div>
        )}

        {/* Zone 6 — FAQ (reused) */}
        <div className="mt-16">
          <ProductFAQ
            faqs={{ technical: part.faq ?? [], company: mixerCompanyFaq }}
            productName={part.fullName || part.name}
          />
        </div>

        {/* Zone 7 — RFQ form (reused) */}
        <div id="rfq">
          <ContactRFQ productName={part.name} formLocation="mixer_parts" />
        </div>

        {/* OEM-brand disclaimer (page footer) */}
        <div className="border-t border-slate-200 bg-slate-50">
          <p className="max-w-7xl mx-auto px-6 sm:px-8 py-6 font-mono text-[11px] text-slate-500 tracking-wide leading-relaxed">
            Sureay manufactures replacement wear parts to fit the listed OEM
            machines and is not affiliated with these manufacturers. All brand
            names and trademarks are the property of their respective owners.
          </p>
        </div>
      </main>

      <FloatingContactButtons
        whatsappPrefillText={`Hi, I'm interested in your ${part.name}. Please send me more information.`}
        rfqAnchorId="rfq"
      />
      <Footer />
    </div>
  );
}
