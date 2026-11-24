/**
 * ProductDetail — Page Orchestrator
 * Route: /products/:id
 *
 * Content zones:
 *   1  BladeHero          — CAD Viewport + Spec Ledger
 *   1b TrustProtocol      — ISO / Heat Treatment credential strip
 *   1c introNote          — Optional lead-in prose
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
import ContactRFQ from "@/components/home/ContactRFQ";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import { getBladeById, getRelatedBlades, getSEO } from "@/data/locales";
import { getShredderDetailBlade, isUpgradedShredderBlade } from "@/data/blades";

// Zone sub-components
import BladeHero from "@/components/product-detail/BladeHero";
import DecisiveSpecs from "@/components/product-detail/DecisiveSpecs";
import SteelGradeTable from "@/components/product-detail/SteelGradeTable";
import TechnicalAudit from "@/components/product-detail/TechnicalAudit";
import ProductDrawings from "@/components/product-detail/ProductDrawings";
import ComprehensiveData from "@/components/product-detail/ComprehensiveData";
import CompatibleTooling from "@/components/product-detail/CompatibleTooling";
import InlineRFQPrompt from "@/components/product-detail/InlineRFQPrompt";
import { bladeHeroSpecs } from "@/components/product-detail/bladeSpecs";
import CompatibleMachines from "@/components/product-detail/CompatibleMachines";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import ProductFAQ from "@/components/product-detail/ProductFAQ";

// ── Component ────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const lang = useLang();
  const { t } = useTranslation();
  const [, params] = useRoute("/products/:id");
  const bladeId = params?.id || "";
  const product = getBladeById(bladeId, lang);

  // 404 — Blade not found
  if (!product) {
    return (
      <>
        <SEO
          title={t("productDetail.notFound.title")}
          description={t("productDetail.notFound.description")}
          noIndex
        />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">
              {t("productDetail.notFound.message")}
            </p>
            <Link href="/products" asChild>
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-black  tracking-widest rounded-none hover:bg-[#001f4d] transition-colors duration-200">
                {t("productDetail.notFound.backToBlades")}
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isEnglishShredder = lang === "en" && isUpgradedShredderBlade(product);
  const blade = isEnglishShredder && !product.detailLayout
    ? getShredderDetailBlade(product)
    : product;
  const relatedBlades = getRelatedBlades(bladeId, lang, 3);
  const pageSeo = getSEO(bladeId, lang);
  const detailLayout = blade.detailLayout;
  const { specs: heroSpecs, material } = bladeHeroSpecs(blade, t);
  const breadcrumbItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.products"), href: "/products" },
    { label: blade.name },
  ];
  const breadcrumbs = (
    <Breadcrumbs
      variant={detailLayout ? "embedded" : "bar"}
      items={breadcrumbItems}
    />
  );
  const hero = (
    <BladeHero
      blade={blade}
      heroSpecs={heroSpecs}
      breadcrumbs={detailLayout ? breadcrumbs : undefined}
    />
  );
  const dimensions = <ComprehensiveData blade={blade} />;

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <SEO
        key={blade.id}
        title={
          pageSeo.title ||
          detailLayout?.seoTitle ||
          blade.fullName ||
          blade.name
        }
        noIndex={blade.draft}
        description={pageSeo.description || blade.description}
        canonicalUrl={`/products/${blade.id}`}
        keywords={pageSeo.keywords}
        socialImageAlt={
          blade.imagePending ? undefined : detailLayout?.heroAlt ??
          (detailLayout ? blade.galleryAlts?.[0] : undefined)
        }
        {...(blade.id === "tissue-log-saw-blades" && !detailLayout && {
          preloadImage: blade.image,
        })}
        breadcrumbs={breadcrumbItems.map(item => ({
          name: item.label,
          url: item.href ?? `/products/${blade.id}`,
        }))}
        productData={{
          name: detailLayout?.heroTitle || blade.fullName || blade.name,
          image: blade.imagePending ? undefined : blade.image,
          images: blade.imagePending ? undefined : detailLayout?.specificationImage
            ? [detailLayout.specificationImage.src]
            : blade.gallery?.slice(0, 4),
          description:
            pageSeo.description ||
            blade.fullDescription ||
            blade.description,
          brand: "Sureay",
          material,
          specs:
            detailLayout?.technicalSpecs ??
            (detailLayout
              ? [
                  { label: t("bladeUi.sizes"), value: detailLayout.sizeRange },
                  ...blade.specs,
                ]
              : blade.specs),
          // The redesigned page lists multiple part numbers and quotes by request.
          ...(!getBladeById(bladeId, "en")?.detailLayout && {
            sku: blade.id,
            mpn: blade.id,
            ...(!blade.quoteRequirements &&
              blade.offers && { offers: blade.offers }),
          }),
        }}
      />

      <Navbar />

      <main className="blade-page flex-grow pt-[68px]">
        {!detailLayout && breadcrumbs}

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div
          className={`pt-8 ${detailLayout ? "@container" : ""}`}
        >
          <div className="flex flex-col gap-y-12 lg:gap-y-16">
            {/* Zone 1 — CAD Viewport Hero keeps its original content width. */}
            <div className={`w-full max-w-7xl mx-auto px-4 sm:px-8 ${detailLayout ? "@container" : ""}`}>
              {hero}
            </div>

            <DecisiveSpecs blade={blade} />

            {detailLayout && dimensions}

            {/* Inline CTA after dimensions + key specs */}
            <div>
              <InlineRFQPrompt
                content={
                  detailLayout?.inlineRfq ??
                  (blade.quoteRequirements
                    ? {
                        title: t("bladeUi.quoteRequirements"),
                        description: blade.quoteRequirements,
                        buttonLabel: t("cta.sendDrawing"),
                      }
                    : undefined)
                }
              />
            </div>

            {/* Zone 2b — Steel grade selection guidance (renders only when present) */}
            <SteelGradeTable blade={blade} />

            {/* Zone 3 — Comprehensive Technical Data */}
            {!detailLayout && dimensions}

            {/* Zone 3b — Compatible Machine Brands */}
            <div className="empty:hidden">
              <CompatibleMachines blade={blade} />
            </div>

            {/* Zone 4 — Technical Audit Log */}
            <div className="empty:hidden">
              <TechnicalAudit blade={blade} />
            </div>

            {/* Zone 4b — Engineering drawings (renders only when present) */}
            <div className="empty:hidden">
              <ProductDrawings blade={blade} />
            </div>
          </div>
        </div>

        {/* Zone 5 — Compatible Tooling */}
        <div className="mt-12 lg:mt-16">
          <CompatibleTooling
            blades={relatedBlades}
            responsiveImages={Boolean(detailLayout)}
          />
        </div>

        {/* Zone 6 — FAQ (just above RFQ) */}
        {blade.faqs && (
          <div className="mt-12 lg:mt-16">
            <ProductFAQ
              faqs={blade.faqs}
              productName={
                detailLayout?.heroTitle || blade.fullName || blade.name
              }
              questionHeading={
                detailLayout && blade.faqs.company.length ? "h4" : "h3"
              }
            />
          </div>
        )}

        {/* Zone 7 — Contact / RFQ form */}
        <div id="rfq" className="mt-8 lg:mt-12">
          <ContactRFQ
            productName={blade.name}
            messagePlaceholder={blade.rfqPlaceholder}
          />
        </div>
      </main>

      <FloatingContactButtons
        whatsappPrefillText={t("productDetail.whatsappPrefill").replace(
          "{{name}}",
          blade.name
        )}
        rfqAnchorId="rfq"
      />
      <Footer />
    </div>
  );
}
