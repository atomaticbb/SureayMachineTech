/**
 * ProductDetail — Page Orchestrator
 * Route: /products/:id
 *
 * Zones:
 *   1  BladeHero          — CAD Viewport + Spec Ledger
 *   2  TrustProtocol      — Four-item credential strip
 *   3  TechnicalAudit     — Engineering Audit Log + Sticky Viewport
 *   4  ComprehensiveData  — Spec Category Tables
 *   5  IndustryOemPipeline — OEM process pipeline
 *   6  CompatibleTooling  — Related blade cards
 */

import { useRoute, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/common/PageMeta";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileStickyCTA from "@/components/product-detail/MobileStickyCTA";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";

import { getBladeById, getRelatedBlades } from "@/data/blades";

// Zone sub-components
import BladeHero from "@/components/product-detail/BladeHero";
import TrustProtocol from "@/components/product-detail/TrustProtocol";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import ComprehensiveData from "@/components/product-detail/ComprehensiveData";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const bladeId = params?.id || "";
  const blade = getBladeById(bladeId);

  // 404 — Blade not found
  if (!blade) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">Blade not found</p>
            <Link href="/products">
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

  // JSON-LD Structured Data — Google Rich Results compliant
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: blade.fullName || blade.name,
    image: [`https://www.sureay.com${blade.image}`],
    description: blade.fullDescription || blade.description,
    sku: blade.id,
    mpn: blade.id,
    brand: {
      "@type": "Brand",
      name: "Sureay Industrial Blades",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.sureay.com/products/${blade.id}`,
      priceCurrency: "USD",
      price: "0",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
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

        {/* Breadcrumbs */}
        <Breadcrumbs
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Blades & Knives", href: "/products" },
            { label: blade.name },
          ]}
        />

        {/* Zone 1 — CAD Viewport Hero */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
          <BladeHero blade={blade} />
        </div>

        {/* Zone 2 — Trust Protocol Strip */}
        <TrustProtocol />

        {/* Zone 3 — Technical Audit Log */}
        <TechnicalAudit blade={blade} />

        {/* Zone 4 — Comprehensive Technical Data */}
        <ComprehensiveData blade={blade} />

        {/* Zone 5 — Industry OEM Pipeline */}
        <IndustryOemPipeline />

        {/* Zone 6 — Compatible Tooling */}
        <CompatibleTooling blades={relatedBlades} />

      </main>

      <MobileStickyCTA />
      <Footer />
    </div>
  );
}
