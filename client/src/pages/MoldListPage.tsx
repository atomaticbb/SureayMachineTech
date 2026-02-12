/*
 * Mold List Page - Dedicated page for Press Brake Molds & Dies
 * With mold-specific filters: System Style, Material, Segmented
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "wouter";
import { getProductsByMainCategory } from "@/data/products";

export default function MoldListPage() {
  const category = "molds";
  const products = getProductsByMainCategory(category);

  // Mold-specific filter states
  const [selectedSystem, setSelectedSystem] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedSegmented, setSelectedSegmented] = useState<string>("all");

  const categoryConfig = {
    title: "Custom Molds",
    subtitle: "Molds & Dies",
    hero: {
      title: "Custom-Engineered\nMolds & Dies",
      description: "Precision-machined molds for stamping, injection, and press brakes tailored to your exact specifications.",
      image: "/images/hero/hero.webp",
    },
    icon: "view_in_ar",
    features: [
      {
        icon: "architecture",
        title: "Custom Engineering",
        description: "Molds designed from your technical drawings with expert engineering consultation.",
      },
      {
        icon: "diamond",
        title: "Premium Materials",
        description: "High-grade tool steels with advanced heat treatment for extended service life.",
      },
      {
        icon: "science",
        title: "Precision Grinding",
        description: "CNC finishing to micron-level tolerances for perfect fit and function.",
      },
    ],
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Add filter logic here when product data includes system, material, segmented
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={categoryConfig.subtitle}
            className="w-full h-full object-cover opacity-40"
            src={categoryConfig.hero.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32 flex flex-col justify-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {categoryConfig.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed font-light">
              {categoryConfig.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="bg-[#003366] hover:bg-[#002952] text-white px-8 py-3.5 rounded-md font-semibold text-center transition-colors shadow-lg border border-[#003366]"
                href="#products"
              >
                Explore Products
              </a>
              <Link href="/contact">
                <a className="bg-transparent hover:bg-white hover:text-slate-900 text-white border border-white px-8 py-3.5 rounded-md font-semibold text-center transition-colors">
                  Request Quote
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-transparent relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryConfig.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border-t-4 border-[#003366] hover:shadow-2xl transition-shadow group"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              >
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{feature.description}</p>
                <a className="text-[#FF6600] font-semibold text-sm hover:underline inline-flex items-center" href="#products">
                  VIEW PRODUCTS →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section - Mold Specific */}
      <section id="products" className="py-12 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Filter Molds & Dies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* System Style Filter */}
            <div>
              <label htmlFor="system-style-filter" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                System Style
              </label>
              <select
                id="system-style-filter"
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Systems</option>
                <option value="amada">Amada Compatible</option>
                <option value="trumpf">Trumpf Compatible</option>
                <option value="promecam">Promecam Compatible</option>
                <option value="wila">Wila Compatible</option>
              </select>
            </div>

            {/* Material Filter */}
            <div>
              <label htmlFor="material-grade-filter" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Material Grade
              </label>
              <select
                id="material-grade-filter"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Materials</option>
                <option value="42crmo">42CrMo</option>
                <option value="gcr15">GCr15</option>
                <option value="t10">T10 Tool Steel</option>
                <option value="custom">Custom Alloy</option>
              </select>
            </div>

            {/* Segmented Filter */}
            <div>
              <label htmlFor="configuration-filter" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Configuration
              </label>
              <select
                id="configuration-filter"
                value={selectedSegmented}
                onChange={(e) => setSelectedSegmented(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="segmented">Segmented</option>
                <option value="full-length">Full Length</option>
                <option value="gooseneck">Gooseneck</option>
                <option value="acute">Acute Angle</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mold & Die Range</h2>
            <div className="w-16 h-1 bg-[#FF6600] mx-auto mt-4 rounded"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-600 transition-all hover:shadow-lg bg-white dark:bg-slate-800"
              >
                <div className="relative h-64 overflow-hidden bg-slate-50 dark:bg-slate-700">
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                  {product.isFeatured && (
                    <div className="absolute top-3 right-3 bg-[#003366] text-white px-2 py-1 rounded text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {product.nameEn}
                    </h3>
                    {product.nameCn && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">{product.nameCn}</p>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">
                    {product.shortDescription || product.description}
                  </p>

                  <Link href={`/products/${product.slug}`}>
                    <Button className="w-full border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-all" variant="outline">
                      View Details →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-[#003366] dark:text-blue-400 mb-4">Need Custom Molds?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Upload your technical drawings, and our engineers will design the perfect mold solution for your application.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <a className="bg-[#FF6600] hover:bg-[#e55c00] text-white px-8 py-3.5 rounded-md font-bold transition-colors shadow-md flex items-center justify-center">
                  Submit Requirements
                </a>
              </Link>
              <Link href="/custom">
                <a className="bg-transparent border-2 border-[#003366] dark:border-blue-600 text-[#003366] dark:text-blue-400 hover:bg-[#003366] dark:hover:bg-blue-600 hover:text-white px-8 py-3.5 rounded-md font-bold transition-colors flex items-center justify-center">
                  Custom OEM Services
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
