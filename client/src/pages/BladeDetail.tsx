/**
 * BladeDetail Page
 * Route: /products/blades/:id
 * Componentized: sections extracted to reusable components — zero UI regression.
 */

import { Link, useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBladeById, getRelatedBlades } from "@/data/blades";

// SEO & Meta
import PageMeta from "@/components/common/PageMeta";

// Sub-components (page-specific)
import MobileStickyCTA from "@/components/product-detail/MobileStickyCTA";
import LogSawSizingTable from "@/components/product-detail/LogSawSizingTable";

// Shared components
import Breadcrumbs from "@/components/common/Breadcrumbs";
import TrustBadges from "@/components/common/TrustBadges";
import ProductHero from "@/components/sections/ProductHero";
import TechSpecsSection from "@/components/sections/TechSpecsSection";
import ZLayoutFeature from "@/components/sections/ZLayoutFeature";
import OEMConversionFunnel from "@/components/sections/OEMConversionFunnel";
import ProductGrid from "@/components/product/ProductGrid";

export default function BladeDetail() {
  const [, params] = useRoute("/products/blades/:id");
  const bladeId = params?.id || "";
  const blade = getBladeById(bladeId);

  // 404: Blade not found
  if (!blade) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Blade not found</p>
            <Link href="/products/blades">
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#FF6600] transition-colors duration-300">
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
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col antialiased">
      <PageMeta
        title={`${blade.fullName || blade.name} | Sureay Blades`}
        description={blade.fullDescription || blade.description}
        image={blade.image}
        schema={productSchema}
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-16">

        {/* --- Breadcrumbs --- */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-10">
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Blades & Knives", href: "/products/blades" },
              { label: blade.name },
            ]}
          />
        </div>

        {/* --- Hero: image toggle + specs panel --- */}
        <ProductHero blade={blade} />

        {/* --- Trust Badge Strip --- */}
        <TrustBadges className="mb-16" />

        {/* --- Technical Specifications (renders nothing if specCategories is empty) --- */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
          <TechSpecsSection blade={blade} />
        </div>

        {/* --- Z-Layout 1: Decades of Cutting Excellence (text left, image right) --- */}
        <div className="mb-16 max-w-7xl mx-auto px-4 lg:px-8">
          <ZLayoutFeature
            title="Decades of Cutting Excellence"
            accentColor="blue"
            paragraphs={[
              "The Sureay Co. Inc., has a long history of providing the highest quality industrial knives to the Tissue, film and foil industries.",
              "As industry technology has progressed, so have Sureay industrial knives. Today, our material expertise is the best in the knife industry. Our experts match the right knife material to your application. Then, we provide an uncompromising heat-treating and finishing process that results in consistent, accurate knives that provide high productivity and cost-effective performance.",
              "Sureay has expanded our product offering allowing us to provide more solutions for tissue, towel, napkin, sanitary, non-woven, wipes, packaging, and wrapping applications. We now offer roll services, which includes new rolls, repairs and re-coating.",
            ]}
            imageSrc="/images/products/blades/tissue-log-saw-blades-04.webp"
            imageAlt="Sureay precision industrial blade manufacturing"
            imagePosition="right"
          />
        </div>

        {/* --- Z-Layout 2: Engineered for Your Application (image left, text right) --- */}
        <div className="bg-slate-50/50 dark:bg-slate-800/30 border-y border-slate-100 dark:border-slate-800 py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <ZLayoutFeature
              title="Engineered for Your Application"
              accentColor="orange"
              paragraphs={[
                "Every Sureay blade is engineered from the ground up to meet the exact demands of your production line. We work closely with OEM machine builders and end-users to ensure perfect fit, optimal edge geometry, and maximum service life.",
                "Our advanced CNC grinding and precision balancing processes deliver blades with exceptional concentricity and surface finish. Combined with vacuum heat treatment and cryogenic processing, each blade achieves the ideal hardness profile for consistent, clean cuts across thousands of cycles.",
                "From standard catalog sizes to fully custom specifications, Sureay delivers with short lead times and full dimensional inspection reports included with every order.",
              ]}
              imageSrc="/images/products/blades/tissue-log-saw-blades-03.webp"
              imageAlt="Sureay blade precision manufacturing process"
              imagePosition="left"
            />
          </div>
        </div>

        {/* --- Log Saw Engineering Sizing Table (tissue blades only) --- */}
        {blade.id === "tissue-log-saw-blades" && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8">
            <LogSawSizingTable />
          </div>
        )}

      </main>

      {/* --- Related Blades --- */}
      {relatedBlades.length > 0 && (
        <div className="bg-slate-50/30 dark:bg-slate-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#003366] rounded-full"></span>
                Related Blades
              </h2>
              <Link href="/products/blades">
                <a className="text-sm text-[#003366] dark:text-blue-400 font-semibold hover:underline">View All &#8594;</a>
              </Link>
            </div>
            <ProductGrid blades={relatedBlades} layout="related" />
          </div>
        </div>
      )}

      {/* --- OEM Conversion Funnel --- */}
      <OEMConversionFunnel />

      <MobileStickyCTA />
      <Footer />
    </div>
  );
}
