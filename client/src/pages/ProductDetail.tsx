/**
 * ProductDetail — Page Orchestrator
 * Route: /products/:id
 *
 * Content zones:
 *   1  BladeHero          — CAD Viewport + Spec Ledger
 *   1b TrustProtocol      — ISO / Heat Treatment credential strip
 *   2  DecisiveSpecs      — Image combination + spec table
 *   3  ComprehensiveData  — Standard dimension tables
 *   4  TechnicalAudit     — Engineering Audit Log
 *   5  CompatibleTooling  — Related blade cards
 *   6  ContactRFQ         — In-page RFQ form (#rfq anchor)
 */

import { useRoute, Link } from "wouter";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileStickyCTA from "@/components/product-detail/MobileStickyCTA";
import ContactRFQ from "@/components/home/ContactRFQ";
import { getSEO } from "@/utils/seo-config";

import { getBladeById, getRelatedBlades } from "@/data/blades";

// Zone sub-components
import BladeHero from "@/components/product-detail/BladeHero";
import DecisiveSpecs from "@/components/product-detail/DecisiveSpecs";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import ComprehensiveData from "@/components/product-detail/ComprehensiveData";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";
import InlineRFQPrompt from "@/components/product-detail/InlineRFQPrompt";
import TrustProtocol from "@/components/product-detail/TrustProtocol";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import ProductFAQ from "@/components/product-detail/ProductFAQ";

// ── Component ────────────────────────────────────────────────────────────────

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
  const pageSeo = getSEO(bladeId);

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <SEO
        title={blade.fullName || blade.name}
        description={blade.fullDescription || blade.description}
        canonicalUrl={`/products/${blade.id}`}
        keywords={pageSeo.keywords}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blades & Knives", url: "/products" },
          { name: blade.name, url: `/products/${blade.id}` },
        ]}
        productData={{
          name:        blade.fullName || blade.name,
          image:       blade.image,
          description: blade.fullDescription || blade.description,
          sku:         blade.id,
          mpn:         blade.id,
          brand:       "Sureay Industrial Blades",
          ...(blade.offers && { offers: blade.offers }),
        }}
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

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
          <div className="flex flex-col gap-y-8">

            {/* Zone 1 — CAD Viewport Hero (no inner px, uses outer container padding) */}
            <BladeHero blade={blade} />

            {/* Zone 1b — Trust credentials strip */}
            <div className="-mx-4 sm:-mx-8">
              <TrustProtocol />
            </div>

            {/* Zone 2 — Decisive Specifications: spec table + image */}
            <div className="-mx-4 sm:-mx-8">
              <DecisiveSpecs blade={blade} />
            </div>

            {/* Inline CTA after dimensions + key specs */}
            <div className="-mx-4 sm:-mx-8">
              <InlineRFQPrompt />
            </div>

            {/* Zone 3 — Comprehensive Technical Data */}
            <div className="-mx-4 sm:-mx-8">
              <ComprehensiveData blade={blade} />
            </div>

            {/* Zone 4 — Technical Audit Log */}
            <div className="-mx-4 sm:-mx-8 pt-8">
              <TechnicalAudit blade={blade} />
            </div>

          </div>
        </div>

        {/* Zone 5 — Compatible Tooling */}
        <div className="mt-16">
          <CompatibleTooling blades={relatedBlades} />
        </div>

        {/* Zone 6 — FAQ (just above RFQ) */}
        {blade.faqs && (
          <div className="mt-16">
            <ProductFAQ
              faqs={blade.faqs}
              productName={blade.fullName || blade.name}
            />
          </div>
        )}

        {/* Zone 7 — Contact / RFQ form */}
        <div id="rfq">
          <ContactRFQ productName={blade.name} />
        </div>

      </main>

      <WhatsAppFloat />
      <MobileStickyCTA />
      <Footer />
    </div>
  );
}
