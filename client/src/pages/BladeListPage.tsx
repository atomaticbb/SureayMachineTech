/*
 * Blade List Page - Dedicated page for Industrial Blades & Cutting Tools
 * With blade-specific filters: Steel Grade, Application, Hardness
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "wouter";
import { getProductsByMainCategory } from "@/data/products";

export default function BladeListPage() {
  const category = "blades";
  const products = getProductsByMainCategory(category);

  // Blade-specific filter states
  const [selectedSteel, setSelectedSteel] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<string>("all");
  const [selectedHardness, setSelectedHardness] = useState<string>("all");

  const categoryConfig = {
    title: "Industrial Blades",
    subtitle: "Cutting Solutions",
    hero: {
      title: "Industrial Shredder\nBlades & Cutting Tools",
      description: "Durable cutting blades manufactured from premium alloy steels. Designed for maximum cutting efficiency and long service life.",
      image: "/images/products/product.webp",
    },
    icon: "cut",
    features: [
      {
        icon: "straighten",
        title: "Premium Steel",
        description: "High-carbon and alloy tool steels selected for optimal hardness and toughness.",
      },
      {
        icon: "local_fire_department",
        title: "Heat Treatment",
        description: "Vacuum heat treatment process ensures consistent hardness throughout the blade.",
      },
      {
        icon: "insights",
        title: "Long Service Life",
        description: "Engineered geometries and coatings maximize cutting performance and durability.",
      },
    ],
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Add filter logic here when product data includes steel grade, application, hardness
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

      {/* Filters Section - Blade Specific */}
      <section id="products" className="py-12 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Filter Industrial Blades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Steel Grade Filter */}
            <div>
              <label htmlFor="steel-grade-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Steel Grade
              </label>
              <select
                id="steel-grade-select"
                value={selectedSteel}
                onChange={(e) => setSelectedSteel(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Grades</option>
                <option value="h13">H13 Tool Steel</option>
                <option value="skd11">SKD11 (D2)</option>
                <option value="9crsi">9CrSi</option>
                <option value="6crw2si">6CrW2Si</option>
                <option value="custom">Custom Alloy</option>
              </select>
            </div>

            {/* Application Filter */}
            <div>
              <label htmlFor="application-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Application
              </label>
              <select
                id="application-select"
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Applications</option>
                <option value="shredder">Shredder Blades</option>
                <option value="crusher">Crusher Blades</option>
                <option value="granulator">Granulator Blades</option>
                <option value="slitter">Slitter Knives</option>
                <option value="chipper">Chipper Blades</option>
              </select>
            </div>

            {/* Hardness Filter */}
            <div>
              <label htmlFor="hardness-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Hardness (HRC)
              </label>
              <select
                id="hardness-select"
                value={selectedHardness}
                onChange={(e) => setSelectedHardness(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Hardness</option>
                <option value="52-54">52-54 HRC</option>
                <option value="56-58">56-58 HRC</option>
                <option value="60-62">60-62 HRC</option>
                <option value="custom">Custom Hardness</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Blade Range</h2>
            <div className="w-16 h-1 bg-[#FF6600] mx-auto mt-4 rounded"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              Showing {filteredProducts.length} blade{filteredProducts.length !== 1 ? 's' : ''}
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
            <h2 className="text-3xl font-bold text-[#003366] dark:text-blue-400 mb-4">Need Custom Blades?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Upload your blade specifications, and our metallurgy experts will recommend the optimal steel grade and heat treatment for your application.
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
