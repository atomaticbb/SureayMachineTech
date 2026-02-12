/*
 * Product Category Page - Based on products_modls.html reference design
 * Clean, modern B2B industrial design with hero section and product showcase
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link, useLocation } from "wouter";
import { getProductsByMainCategory } from "@/data/products";

export default function ProductCategory() {
  const [location] = useLocation();

  // Extract category from URL path
  const category = location.split("/").pop() || "blades";

  // Get category configuration
  const categoryConfig = {
    machinery: {
      title: "Precision CNC",
      subtitle: "Machinery & Equipment",
      hero: {
        title: "Precision CNC\nPress Brakes & Equipment",
        description: "Engineered for heavy industry. Our machinery delivers ±0.01mm accuracy with intelligent servo synchronization.",
        image: "/images/hero/hero.webp",
      },
      icon: "precision_manufacturing",
      features: [
        {
          title: "High Precision",
          description: "Advanced CNC control systems for micron-level accuracy in every operation.",
        },
        {
          title: "High Efficiency",
          description: "Optimized performance with servo motors and integrated automation systems.",
        },
        {
          title: "Robust Design",
          description: "Heavy-duty steel frames built to withstand demanding industrial environments.",
        },
      ],
    },
    molds: {
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
          title: "Custom Engineering",
          description: "Molds designed from your technical drawings with expert engineering consultation.",
        },
        {
          title: "Premium Materials",
          description: "High-grade tool steels with advanced heat treatment for extended service life.",
        },
        {
          title: "Precision Grinding",
          description: "CNC finishing to micron-level tolerances for perfect fit and function.",
        },
      ],
    },
    blades: {
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
          title: "Premium Steel",
          description: "High-carbon and alloy tool steels selected for optimal hardness and toughness.",
        },
        {
          title: "Heat Treatment",
          description: "Vacuum heat treatment process ensures consistent hardness throughout the blade.",
        },
        {
          title: "Long Service Life",
          description: "Engineered geometries and coatings maximize cutting performance and durability.",
        },
      ],
    },
  };

  const currentConfig = categoryConfig[category as keyof typeof categoryConfig];
  const categoryProducts = getProductsByMainCategory(category as "machinery" | "blades" | "molds");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt={currentConfig.subtitle}
            className="w-full h-full object-cover opacity-40"
            src={currentConfig.hero.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32 flex flex-col justify-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {currentConfig.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed font-light">
              {currentConfig.hero.description}
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
            {currentConfig.features.map((feature, idx) => (
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

      {/* Star Product Showcase */}
      <section id="products" className="py-24 bg-[#F5F7FA] dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Star Product Showcase</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Our most requested {currentConfig.subtitle.toLowerCase()} solutions.</p>
            </div>
            <a className="hidden sm:inline-block text-[#003366] dark:text-blue-400 font-semibold hover:text-[#FF6600] transition-colors" href="#all-products">
              View All Products &gt;
            </a>
          </div>

          <div className="space-y-8">
            {categoryProducts.slice(0, 3).map((product, idx) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-700"
                style={{ border: '1px solid #eee', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              >
                {/* Product Image */}
                <div className="lg:w-2/5 bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-8 border-r border-gray-100 dark:border-slate-700">
                  <img
                    alt={product.nameEn}
                    className="w-full h-80 object-contain mix-blend-multiply dark:mix-blend-normal dark:opacity-90"
                    src={product.image}
                    onError={(e) => {
                      e.currentTarget.src = "/images/products/product.webp";
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="lg:w-3/5 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    {product.isFeatured && (
                      <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-blue-300 text-xs font-semibold rounded-full mb-2">
                        Best Seller
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{product.nameEn}</h3>
                    {product.nameCn && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{product.nameCn}</p>
                    )}
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {product.shortDescription || product.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  {product.specs && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-gray-50 dark:bg-slate-800 p-4 rounded-md">
                      {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">{key}</p>
                          <p className="font-bold text-slate-900 dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Link href={`/products/${product.slug}`}>
                      <button className="bg-[#FF6600] hover:bg-[#e55c00] text-white px-6 py-2.5 rounded-md font-medium shadow-md transition-colors flex items-center justify-center w-full sm:w-auto">
                        View Details
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="border border-gray-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-900 dark:text-white px-6 py-2.5 rounded-md font-medium transition-colors flex items-center justify-center w-full sm:w-auto">
                        Request Quote
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a className="inline-block text-[#003366] dark:text-blue-400 font-semibold hover:text-[#FF6600] transition-colors" href="#all-products">
              View All Products &gt;
            </a>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      {categoryProducts.length > 3 && (
        <section id="all-products" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Complete Product Range</h2>
              <div className="w-16 h-1 bg-[#FF6600] mx-auto mt-4 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.slice(3).map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-600 transition-all hover:shadow-lg bg-white dark:bg-slate-800"
                >
                  {/* Product Image */}
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

                  {/* Product Info */}
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
      )}

      {/* Services Section */}
      <section className="py-24 bg-[#F5F7FA] dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Premium Material Sourcing</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We partner with top-tier mills to ensure every product meets international quality standards.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Advanced Heat Treatment</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Vacuum heat treatment processes ensure consistent hardness and extended service life.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Precision CNC Processing</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Advanced CNC machining delivers micron-level tolerances for perfect fit and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-[#003366] dark:text-blue-400 mb-4">Need Custom Solutions?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Upload your technical drawing or specifications, and our engineers will recommend the optimal solution for your needs.
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
