/*
 * AlloyBladesDemo Page - Modern B2B Design
 * Based on reference: product_detail.html
 */

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function AlloyBladesDemo() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "video" | "applications">("specs");

  // Product data
  const product = {
    id: "alloy-blades-001",
    name: "Industrial Alloy Blades",
    shortDescription: "High-performance alloy steel blades for industrial cutting applications",
    description: `Our industrial alloy blades are precision-engineered cutting tools manufactured from premium high-grade tool steel alloys including 9CrSi, Cr12MoV, and W6Mo5Cr4V2.

Designed for demanding industrial cutting operations that require superior wear resistance, edge retention, and cutting precision. Each blade undergoes advanced vacuum heat treatment to achieve optimal hardness (58-62 HRC) and dimensional stability.

Ideal for recycling facilities, paper processing plants, plastic extrusion lines, and food processing operations requiring consistent, high-quality cuts over extended service periods.`,

    images: [
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
      "/images/products/product.webp",
    ],

    specs: {
      Material: "9CrSi, Cr12MoV, W6Mo5Cr4V2, SKD-11",
      Hardness: "58-62 HRC",
      Dimensions: "40×40×25mm to 150×150×35mm",
      Thickness: "5mm to 35mm",
      Tolerance: "±0.05mm",
      Weight: "0.5kg to 8kg per piece",
      "Edge Angle": "20° to 45° (customizable)",
      Coating: "Optional: TiN, TiCN, CrN",
      "Max Temperature": "Up to 600°C",
    },

    applications: [
      "Plastic recycling and extrusion",
      "Paper and pulp processing",
      "Food processing and packaging",
      "Chemical and pharmaceutical industries",
      "Waste management and recycling",
      "Rubber and tire recycling",
      "Wood processing and chipping",
      "Textile cutting and processing",
    ],

    compatibleBrands: [
      "WEIMA Shredders",
      "SSI Shredding Systems",
      "Vecoplan Equipment",
      "UNTHA Shredders",
      "Lindner Recyclingtech",
      "Generic industrial cutters",
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 mt-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/">
            <a className="hover:text-[#003366]">
              Home
            </a>
          </Link>
          <span>→</span>
          <Link href="/products">
            <a className="hover:text-[#003366]">Products</a>
          </Link>
          <span>→</span>
          <Link href="/products/blades">
            <a className="hover:text-[#003366]">Industrial Blades</a>
          </Link>
          <span>→</span>
          <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
        </nav>

        {/* Main Product Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group relative">
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src={product.images[selectedImage]}
              />
            </div>

            {/* Thumbnail Grid */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === idx
                        ? "border-2 border-[#003366]"
                        : "border border-slate-200 dark:border-slate-700 hover:border-[#003366]"
                    }`}
                  >
                    <img className="w-full h-full object-cover" src={img} alt={`View ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="bg-[#003366]/10 text-[#003366] dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured Product
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Material</p>
                  <p className="text-sm font-bold">{product.specs.Material.split(",")[0]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Hardness</p>
                  <p className="text-sm font-bold">{product.specs.Hardness}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Thickness</p>
                  <p className="text-sm font-bold">{product.specs.Thickness}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Coating</p>
                  <p className="text-sm font-bold">{product.specs.Coating}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Link href="/contact">
                <button className="w-full bg-[#003366] hover:bg-[#003366]/95 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#003366]/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                  Request Pricing &amp; Lead Time
                </button>
              </Link>
              <button className="w-full border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-[#003366] py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                Download Technical Datasheet (PDF)
              </button>
            </div>

            <p className="text-center text-slate-500 text-xs mt-4 italic">
              Typical shipping lead time: 4-6 weeks
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-1 py-4 font-bold transition-colors ${
                  activeTab === "specs"
                    ? "text-[#003366] border-b-2 border-[#003366]"
                    : "text-slate-500 hover:text-[#003366]"
                }`}
              >
                Technical Specs
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-1 py-4 font-medium transition-colors ${
                  activeTab === "video"
                    ? "text-[#003366] border-b-2 border-[#003366]"
                    : "text-slate-500 hover:text-[#003366]"
                }`}
              >
                Demonstration Video
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-1 py-4 font-medium transition-colors ${
                  activeTab === "applications"
                    ? "text-[#003366] border-b-2 border-[#003366]"
                    : "text-slate-500 hover:text-[#003366]"
                }`}
              >
                Applications
              </button>
            </nav>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Technical Specs Tab */}
            {activeTab === "specs" && (
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="px-6 py-4 text-sm font-bold text-slate-500">Parameter</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500">Value</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={`${
                          idx % 2 === 1 ? "bg-slate-50/50 dark:bg-slate-800/30" : ""
                        } hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold">{key}</td>
                        <td className="px-6 py-4 text-sm">{value}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">Standard specification</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Video Tab */}
            {activeTab === "video" && (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Product Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    Product Demonstration
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Watch our comprehensive video guide showcasing the product features, installation process, and
                    real-world applications.
                  </p>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-xl font-bold mb-4">Typical Applications</h3>
                  <div className="space-y-3">
                    {product.applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-[#003366]"
                      >
                        <span className="text-sm font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-xl font-bold mb-4">Compatible Equipment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.compatibleBrands.map((brand, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-sm font-medium">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Material Processing Capability Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">
                Material Processing Capability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                    <div className="grid grid-cols-2 gap-1 h-48">
                      <div className="relative overflow-hidden rounded-l-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="Before processing"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          Before
                        </span>
                      </div>
                      <div className="relative overflow-hidden rounded-r-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="After processing"
                        />
                        <span className="absolute top-2 left-2 bg-[#003366]/80 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-2 pb-2">
                      <h4 className="font-bold text-sm">Efficient Processing</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        High efficiency material reduction and processing capability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                    <div className="grid grid-cols-2 gap-1 h-48">
                      <div className="relative overflow-hidden rounded-l-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="Material before"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          Before
                        </span>
                      </div>
                      <div className="relative overflow-hidden rounded-r-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="Material after"
                        />
                        <span className="absolute top-2 left-2 bg-[#003366]/80 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-2 pb-2">
                      <h4 className="font-bold text-sm">Quality Output</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Consistent size reduction with uniform output quality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                    <div className="grid grid-cols-2 gap-1 h-48">
                      <div className="relative overflow-hidden rounded-l-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="Raw material"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          Before
                        </span>
                      </div>
                      <div className="relative overflow-hidden rounded-r-lg">
                        <img
                          className="h-full w-full object-cover"
                          src="/images/products/product.webp"
                          alt="Processed material"
                        />
                        <span className="absolute top-2 left-2 bg-[#003366]/80 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-2 pb-2">
                      <h4 className="font-bold text-sm">Optimal Performance</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Maximum throughput with minimal maintenance requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complementary Equipment Section */}
        <section className="border-t border-slate-200 dark:border-slate-800 pt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                ←
              </button>
              <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video">
                  <img className="w-full h-full object-cover" src="/images/products/product.webp" alt="Related product" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Related Product {i}</h4>
                  <p className="text-sm text-slate-500 mb-4 italic">Complementary equipment</p>
                  <Link href="/products">
                    <button className="text-[#003366] dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:underline">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-slate-200 dark:border-slate-800 pt-16 mb-20">
          <div className="bg-gradient-to-br from-[#003366] to-[#003366]/90 rounded-2xl p-12 text-white text-center">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              Premium Industrial Product
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto">
              Contact our team for pricing, custom specifications, and technical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[#FF6600] hover:bg-orange-600 text-white font-bold px-10 h-14 text-base rounded-lg shadow-xl flex items-center gap-2">
                  Request a Quote →
                </button>
              </Link>
              <Link href="/products">
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#003366] font-bold px-10 h-14 text-base rounded-lg transition-all flex items-center gap-2">
                  ← Browse More Products
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
