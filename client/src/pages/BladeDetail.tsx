/**
 * BladeDetail Page — Engineering Viewport Layout
 * Route: /products/blades/:id
 * Three-zone: CAD Viewport Hero · Trust Strip · Audit Log + Tooling Sidebar
 */

import { useState } from "react";
import type { CSSProperties } from "react";
import { Link, useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBladeById, getRelatedBlades } from "@/data/blades";

// SEO & Meta
import PageMeta from "@/components/common/PageMeta";

// Shared components
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileStickyCTA from "@/components/product-detail/MobileStickyCTA";

// ── Constants ────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "ISO 9001:2015 Certified",
  "In-House Heat Treatment",
  "Strict Dimensional Tolerances",
  "Global Door-to-Door Delivery",
];

// ── Dot-grid inline style ────────────────────────────────────────────────────

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

// ── Component ────────────────────────────────────────────────────────────────

export default function BladeDetail() {
  const [, params] = useRoute("/products/blades/:id");
  const bladeId = params?.id || "";
  const blade = getBladeById(bladeId);

  // Gallery state — must be declared before any early return (Rules of Hooks)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // 404 — Blade not found
  if (!blade) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">Blade not found</p>
            <Link href="/products/blades">
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-black uppercase tracking-widest rounded-none hover:bg-[#001f4d] transition-colors duration-200">
                Back to Blades
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedBlades = getRelatedBlades(bladeId, 3);

  // First 4 decisive specs for the hero ledger only
  const heroSpecs = (blade.specs ?? []).slice(0, 4);

  // Gallery — up to 4 images; fall back to main image to fill empty slots
  const galleryImages: string[] = Array.from({ length: 4 }, (_, i) => blade.gallery?.[i] ?? blade.image);

  // JSON-LD Structured Data for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: blade.fullName || blade.name,
    image: blade.image,
    description: blade.fullDescription || blade.description,
    brand: {
      "@type": "Brand",
      name: "Sureay Machinery",
    },
    category: blade.categoryDisplay,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <PageMeta
        title={`${blade.fullName || blade.name} | Sureay Blades`}
        description={blade.fullDescription || blade.description}
        image={blade.image}
        schema={productSchema}
      />

      <Navbar />

      <main className="flex-grow pt-[68px] pb-16">

        {/* ── Breadcrumbs ─────────────────────────────────────────────── */}
        <Breadcrumbs
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Blades & Knives", href: "/products/blades" },
            { label: blade.name },
          ]}
        />

        {/* ════════════════════════════════════════════════════════════════
            ZONE 1 — CAD Viewport Hero
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
          <section className="border-2 border-[#001f4d] flex flex-col lg:flex-row overflow-hidden  lg:max-h-[520px]">

            {/* Left — CAD Viewport (60%) */}
            <div className="lg:w-[60%] flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#001f4d] h-[300px] lg:h-auto overflow-hidden">

              {/* ── Main image area — fills remaining height ── */}
              <div
                className="flex-grow bg-slate-100 flex items-center justify-center relative overflow-hidden"
                style={DOT_GRID_STYLE}
              >
                {/* Corner annotation — top-left */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-700 leading-snug z-10">
                  [ VIEW MODE: PRODUCT RENDER ]<br />
                  REF: {blade.id.toUpperCase()}
                </div>

                {/* Active blade image */}
                <img
                  src={galleryImages[activeGalleryIndex]}
                  alt={blade.fullName || blade.name}
                  className="h-full w-full object-contain p-8 mix-blend-multiply transition-opacity duration-200"
                  loading="eager"
                  decoding="sync"
                />

                {/* Scale marker — bottom-right */}
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 z-10">
                  <div className="w-24 h-[2px] bg-[#001f4d]" />
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Scale: 1:1.000</span>
                </div>

                {/* Category tag — bottom-left */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                    {blade.categoryDisplay}
                  </span>
                </div>
              </div>

              {/* ── Engineering View Selector — thumbnail track ── */}
              <div className="shrink-0 h-[76px] border-t border-[#001f4d] bg-white grid grid-cols-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGalleryIndex(i)}
                    className={[
                      "relative cursor-pointer overflow-hidden bg-slate-50 h-full transition-all duration-200",
                      i < 3 ? "border-r border-slate-200" : "",
                      activeGalleryIndex === i
                        ? "border-b-4 border-b-[#001f4d]"
                        : "border-b-4 border-b-transparent hover:bg-slate-100",
                    ].join(" ")}
                  >
                    {/* Slot index label */}
                    <span className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-700 uppercase z-10 leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className={[
                        "w-full h-full object-contain p-2 mix-blend-multiply transition-all duration-200",
                        activeGalleryIndex === i
                          ? ""
                          : "grayscale opacity-60 hover:opacity-100 hover:grayscale-0",
                      ].join(" ")}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* Right — Spec Ledger (40%) */}
            <div className="lg:w-[40%] bg-white p-5 lg:p-6 flex flex-col justify-between">
              <div>
                {/* Document tag */}
                <p className="font-mono text-[10px] font-bold text-[#003366] uppercase tracking-[0.2em] mb-2">
                  [ Product Specification Sheet ]
                </p>

                {/* Product title */}
                <h1 className="font-black text-3xl text-[#001f4d] uppercase leading-none tracking-tighter mb-2">
                  {blade.fullName || blade.name}
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed mb-2">
                  {blade.description}
                </p>

                {/* Feature tags */}
                {blade.features && blade.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {blade.features.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="border border-slate-200 px-3 py-1 font-mono text-[10px] uppercase bg-slate-50 text-slate-600"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Decisive Specs table — max 4 rows */}
                {heroSpecs.length > 0 && (
                  <div className="border border-slate-200 border-t-2 border-t-[#001f4d] mb-2">
                    <div className="px-4 py-1.5 border-b border-slate-100 bg-slate-50">
                      <p className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-widest text-center">
                        [ Decisive Specifications ]
                      </p>
                    </div>
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {heroSpecs.map((spec, i) => (
                          <tr key={i} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-4 py-1.5 font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                              {spec.label}
                            </td>
                            <td className="px-4 py-1.5 text-right text-sm font-black text-[#001f4d]">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Bottom strip: status + CTA */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono">
                    <div className="text-[10px] text-slate-700 uppercase tracking-widest mb-0.5">Lead Time</div>
                    <div className="text-sm font-black text-[#001f4d] uppercase">
                      {blade.leadTime ?? "4 – 6 Weeks"}
                    </div>
                  </div>
                  {blade.isFeatured && (
                    <div className="font-mono text-right">
                      <div className="text-[10px] text-slate-700 uppercase tracking-widest mb-0.5">Status</div>
                      <div className="text-sm font-black text-[#001f4d] uppercase">■ Ready to Dispatch</div>
                    </div>
                  )}
                </div>

                {/* Primary RFQ CTA — Deep Navy, no orange */}
                <Link href="/contact">
                  <button className="w-full bg-[#001f4d] hover:bg-black text-white font-black text-sm uppercase tracking-widest py-3 rounded-none transition-colors duration-200">
                    Request Engineering Quote ↗
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ZONE 2 — Trust Protocol Strip
        ════════════════════════════════════════════════════════════════ */}
        <div className="border-y border-slate-200 bg-white py-4 mt-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3">
              {TRUST_ITEMS.map((item, i) => (
                <p key={i} className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                  ■ {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ZONE 3 — Technical Audit Log + Single Sticky Viewport
        ════════════════════════════════════════════════════════════════ */}
        {blade.components && blade.components.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">

            {/* Section header */}
            <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
              [ Technical Audit ]
            </p>
            <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight mb-12">
              Engineering Advantages
            </h2>

            {/* Two-column: text left + single sticky viewport right */}
            <div className="flex items-start gap-12">

              {/* Left — 3 text blocks stacked (55%) */}
              <div className="lg:w-[55%] shrink-0 flex flex-col space-y-24 py-10">
                {blade.components.map((comp, i) => (
                  <div key={comp.id} className="flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-[#003366] font-bold uppercase bg-[#003366]/10 px-2 py-0.5 tracking-widest">
                        {String(i + 1).padStart(2, "0")} — {comp.tag}
                      </span>
                      <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                        Status: Verified
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-[#001f4d] uppercase tracking-tight leading-[1.05]">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right — single sticky visual viewport (45%) */}
              <div className="hidden lg:block lg:w-[45%] shrink-0">
                <div
                  className="sticky top-32 h-[500px] w-full bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden"
                  style={DOT_GRID_STYLE}
                >
                  {/* Corner label */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-700 leading-snug z-10">
                    [ MACRO METALLURGY VIEWPORT ]<br />
                    REF: {blade.id.toUpperCase()}
                  </div>

                  <img
                    src={blade.gallery?.[1] ?? blade.image}
                    alt={`${blade.name} — detail`}
                    className="h-full w-full object-contain p-10 mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white/70 px-4 py-2 flex justify-between items-center">
                    <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest">
                      ■ CMM Verified · ISO 9001:2015
                    </span>
                    <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                      Scale: 1:1.000
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            Compatible Tooling — Full-width horizontal grid
        ════════════════════════════════════════════════════════════════ */}
        {relatedBlades.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-20">
            <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
              [ System Inventory ]
            </p>
            <div className="flex items-end justify-between gap-4 mb-12">
              <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight">
                Compatible Tooling
              </h2>
              <Link href="/products/blades">
                <span className="font-mono text-[10px] text-slate-700 uppercase tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
                  View All →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBlades.map((related) => (
                <Link key={related.id} href={related.link}>
                  <div className="bg-white border border-slate-200 hover:border-[#001f4d] transition-colors cursor-pointer group h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-square bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Meta */}
                    <div className="p-4 flex flex-col gap-1 flex-grow">
                      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                        {related.categoryDisplay}
                      </p>
                      <p className="text-sm font-black uppercase text-[#001f4d] group-hover:text-[#003366] transition-colors leading-tight">
                        {related.name}
                      </p>
                      <p className="font-mono text-[10px] text-slate-300 uppercase tracking-widest mt-auto pt-3">
                        REF: {related.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            Comprehensive Technical Data — ALL specCategories consolidated
        ════════════════════════════════════════════════════════════════ */}
        {blade.specCategories && blade.specCategories.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-20">
            <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
              [ Engineering Reference ]
            </p>
            <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight mb-12">
              Comprehensive Technical Data
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blade.specCategories.map((cat) => (
                <div key={cat.id} className="border border-slate-200 border-t-2 border-t-[#001f4d] bg-white">
                  <div className="px-5 pt-4 pb-2 border-b border-slate-100">
                    <p className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                      {cat.label}
                    </p>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {Object.entries(cat.specs).map(([k, v], i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-5 py-3 font-mono text-[10px] text-slate-700 uppercase tracking-widest">{k}</td>
                          <td className="px-5 py-3 text-right text-sm font-black text-[#001f4d]">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-start">
              <Link href="/contact">
                <button className="border-2 border-[#001f4d] text-[#001f4d] font-black font-mono text-[11px] uppercase tracking-widest px-8 py-3 hover:bg-[#001f4d] hover:text-white transition-all rounded-none">
                  Download Full Datasheet (PDF)
                </button>
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <div className="bg-[#001f4d] py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em] mb-4">
            ■ ISO 9001:2015 Certified Manufacturing
          </p>
          <h2 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-[1.05] mb-6">
            Ready to Order?
          </h2>
          <div className="w-14 h-[3px] bg-white/30 mx-auto mb-8" />
          <p className="text-sm text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Contact our engineering team for pricing, custom specifications, and technical consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white hover:bg-slate-100 text-[#001f4d] font-black px-10 py-4 text-sm uppercase tracking-widest rounded-none transition-colors duration-200">
                Request a Quote
              </button>
            </Link>
            <Link href="/products/blades">
              <button className="border-2 border-white/40 text-white hover:bg-white hover:text-[#003366] font-black px-10 py-4 text-sm uppercase tracking-widest rounded-none transition-all duration-200">
                Browse More Blades
              </button>
            </Link>
          </div>
        </div>
      </div>

      <MobileStickyCTA />
      <Footer />
    </div>
  );
}
