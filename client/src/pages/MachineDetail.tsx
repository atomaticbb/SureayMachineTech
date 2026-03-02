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
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-6">
            <h1 className="text-6xl font-black text-[#001f4d] mb-4">404</h1>
            <p className="text-xl text-slate-600 mb-8">Machine not found</p>
            <Link href="/products/machinery">
              <a className="inline-block px-8 py-3 bg-[#003366] text-white font-black uppercase tracking-widest rounded-none hover:bg-[#001f4d] transition-colors duration-200">
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
        <div className="bg-slate-50 border-t border-slate-200 py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="mb-10">
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
                You May Also Need
              </p>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight leading-[1.05]">
                  Related Machines
                </h2>
                <Link href="/products/machinery">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
                    VIEW ALL →
                  </span>
                </Link>
              </div>
              <div className="w-14 h-[3px] bg-slate-300 mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMachines.map((relatedMachine) => (
                <MachineCard key={relatedMachine.id} machine={relatedMachine} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 10. Sticky CTA: Mobile Conversion Booster */}
      <MobileStickyCTA />

      <Footer />
    </>
  );
}