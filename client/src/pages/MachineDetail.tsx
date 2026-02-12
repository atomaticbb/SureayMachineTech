/**
 * MachineDetail Page - Final Refactored Controller View
 * Route: /products/machinery/:id
 * Description: A clean, data-driven page that renders the product journey.
 */

import React from "react";
import { Link, useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getMachineById, getRelatedMachines } from "@/data/machines";
import MachineCard from "@/components/MachineCard";

// SEO & Meta
import PageMeta from "@/components/common/PageMeta";

// Sub-components
import ProductHero from "@/components/product-detail/ProductHero";
import TrustBar from "@/components/product-detail/TrustBar";
import VideoShowcase from "@/components/product-detail/VideoShowcase";
import CoreFeatures from "@/components/product-detail/CoreFeatures";
import ApplicationGallery from "@/components/product-detail/ApplicationGallery";
import TechSpecsTable from "@/components/product-detail/TechSpecsTable";
import ManufacturingProcess from "@/components/product-detail/ManufacturingProcess";
import MobileStickyCTA from "@/components/product-detail/MobileStickyCTA";

export default function MachineDetail() {
  const [, params] = useRoute("/products/machinery/:id");
  const machineId = params?.id || "";
  const machine = getMachineById(machineId);

  // 404: Machine not found
  if (!machine) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Machine not found</p>
            <Link href="/products/machinery">
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#FF6600] transition-colors duration-300">
                Back to Machinery
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Related machines for the bottom carousel
  const relatedMachines = getRelatedMachines(machineId, 4);

  // Construct JSON-LD Structured Data for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": machine.fullName || machine.name,
    "image": machine.image,
    "description": machine.fullDescription || machine.description,
    "brand": {
      "@type": "Brand",
      "name": "Sureay Heavy Machinery"
    },
    "category": machine.categoryDisplay,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      {/* 1. SEO Head Management */}
      <PageMeta
        title={machine.fullName || machine.name}
        description={machine.fullDescription || machine.description}
        image={machine.image}
        schema={productSchema}
      />

      <Navbar />

      {/* 2. Hero Section: The First Impression */}
      <ProductHero machine={machine} />

      {/* 3. Trust Bar: Immediate Credibility */}
      <TrustBar />

      {/* 4. Video Showcase: Visual Proof */}
      {/* Only render if video exists. Assumes machine.video is populated or undefined */}
      {machine.video && <VideoShowcase video={machine.video} />}

      {/* 5. Core Features: Key Selling Points */}
      {/* Only render if features exist. Remove 'as any' by ensuring types match in data layer */}
      {machine.components && machine.components.length > 0 && (
        <CoreFeatures components={machine.components} />
      )}

      {/* 6. Application Gallery: "What can I build?" (Moved UP for better flow) */}
      {machine.applicationItems && machine.applicationItems.length > 0 && (
        <ApplicationGallery applications={machine.applicationItems} />
      )}

      {/* 7. Technical Specifications: The Rational Validation */}
      {machine.specCategories && machine.specCategories.length > 0 && (
        <TechSpecsTable 
          machineName={machine.name} 
          categories={machine.specCategories} 
        />
      )}

      {/* 8. Manufacturing Process: Quality Assurance */}
      {machine.manufacturingProcess && machine.manufacturingProcess.length > 0 && (
        <ManufacturingProcess items={machine.manufacturingProcess} />
      )}

      {/* 9. Related Products: Cross-sell */}
      {relatedMachines.length > 0 && (
        <section className="max-w-7xl mx-auto py-16 px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Related Machines</h2>
            <Link href="/products/machinery">
              <a className="text-[#003366] dark:text-[#FF6600] font-semibold hover:underline">View All →</a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMachines.map((relatedMachine) => (
              <MachineCard key={relatedMachine.id} machine={relatedMachine} />
            ))}
          </div>
        </section>
      )}

      {/* 10. Sticky CTA: Mobile Conversion Booster */}
      <MobileStickyCTA />

      <Footer />
    </>
  );
}