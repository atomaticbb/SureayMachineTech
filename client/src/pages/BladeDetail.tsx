/**
 * BladeDetail — Page Orchestrator
 * Route: /products/blades/:id
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
import type { OemStep } from "@/components/industry/types";

import { getBladeById, getRelatedBlades } from "@/data/blades";

// Zone sub-components
import BladeHero from "@/components/product-detail/BladeHero";
import TrustProtocol from "@/components/product-detail/TrustProtocol";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import ComprehensiveData from "@/components/product-detail/ComprehensiveData";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";

// ── OEM pipeline steps ────────────────────────────────────────────────────────

const OEM_STEPS: OemStep[] = [
  { step: "01", name: "CAD/CAM Analysis",      desc: "Reverse engineering and blueprint verification.",               phaseKey: "PROTOCOL",  protocolVersion: "2.0", technicalTitle: "TECHNICAL AUDIT",       coords: "31.23°N / 121.47°E" },
  { step: "02", name: "5-Axis CNC Machining",  desc: "Precision milling to exact OEM bore/keyway specs.",           phaseKey: "TOPOLOGY",  protocolVersion: "4.1", technicalTitle: "CAD TOPOLOGY",          coords: "48.85°N / 002.35°E" },
  { step: "03", name: "Vacuum Heat Treatment", desc: "In-house hardening for optimal core toughness.",               phaseKey: "MACHINING", protocolVersion: "3.0", technicalTitle: "PRECISION MANUFACTURE", coords: "22.54°N / 114.06°E" },
  { step: "04", name: "CMM Verification",      desc: "100% dimensional inspection before shipping.",                 phaseKey: "METROLOGY", protocolVersion: "2.1", technicalTitle: "METROLOGY VALIDATION",  coords: "35.68°N / 139.69°E" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function BladeDetail() {
  const [, params] = useRoute("/products/blades/:id");
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

  // JSON-LD Structured Data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: blade.fullName || blade.name,
    image: blade.image,
    description: blade.fullDescription || blade.description,
    brand: { "@type": "Brand", name: "Sureay Machinery" },
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

        {/* Breadcrumbs */}
        <Breadcrumbs
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Blades & Knives", href: "/products/blades" },
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
        <IndustryOemPipeline steps={OEM_STEPS} />

        {/* Zone 6 — Compatible Tooling */}
        <CompatibleTooling blades={relatedBlades} />

      </main>

      <MobileStickyCTA />
      <Footer />
    </div>
  );
}
