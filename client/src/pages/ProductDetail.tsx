/*
 * Product Detail Page - Modern B2B Design
 * Based on reference: product_detail.html
 * Updated with Material Symbols icons and new layout
 */

import { Link, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { getProductBySlug } from "@/data/products";

export default function ProductDetail() {
  const [location] = useLocation();
  const slug = location.split("/").pop() || "";
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Not Found</h1>
          <Link href="/products">
            <button className="bg-[#003366] hover:bg-[#003366]/90 text-white px-6 py-3 rounded-lg font-bold">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.gallery || [product.image];

  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Navbar />

      {/* Header Section with Gray Gradient Background */}
      <div className="relative pt-32 pb-8 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
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
            <span className="text-slate-900 dark:text-white font-medium">{product.nameEn}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

        {/* Main Product Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group relative">
              <img
                alt={product.nameEn}
                className="w-full h-full object-cover"
                src={images[selectedImage]}
              />
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => (
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
              {product.isFeatured && (
                <span className="bg-[#003366]/10 text-[#003366] dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Featured Product
                </span>
              )}
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
                {product.nameEn}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.shortDescription || product.description.split("\n\n")[0]}
              </p>
            </div>

            {/* Key Specs Grid */}
            {product.specs && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {product.specs.material && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Material</p>
                      <p className="text-sm font-bold">{product.specs.material}</p>
                    </div>
                  </div>
                )}
                {product.specs.hardness && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Hardness</p>
                      <p className="text-sm font-bold">{product.specs.hardness}</p>
                    </div>
                  </div>
                )}
                {product.specs.thickness && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Thickness</p>
                      <p className="text-sm font-bold">{product.specs.thickness}</p>
                    </div>
                  </div>
                )}
                {product.specs.coating && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Coating</p>
                      <p className="text-sm font-bold">{product.specs.coating}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

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

        {/* Product Details Sections - Vertical Layout */}
        <div className="space-y-12 mb-16">
          {/* Technical Specs Section */}
          {product.specs && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Technical Specs
              </h2>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 border-b-2 border-[#003366]/20">
                      <th className="px-6 py-4 text-sm font-bold text-[#003366] dark:text-blue-300 uppercase tracking-wide">Parameter</th>
                      <th className="px-6 py-4 text-sm font-bold text-[#003366] dark:text-blue-300 uppercase tracking-wide">Value</th>
                      <th className="px-6 py-4 text-sm font-bold text-[#003366] dark:text-blue-300 uppercase tracking-wide">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={`${
                          idx % 2 === 1 ? "bg-slate-50/50 dark:bg-slate-800/30" : "bg-white dark:bg-slate-900"
                        } hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize border-l-2 border-transparent hover:border-[#003366]">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{value}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 italic">Standard specification</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Demonstration Video Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Demonstration Video
            </h2>
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Product Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Product Demonstration
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Watch our comprehensive video guide showcasing the product features, installation process, and
                  real-world applications.
                </p>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Applications
            </h2>
            {product.applications && product.applications.length > 0 ? (
              <div className="space-y-8">
                {product.applications.slice(0, 3).map((app, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8 items-center bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300`}
                  >
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative overflow-hidden group">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={product.image}
                          alt={app}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/20 to-transparent"></div>
                        {/* Number Badge */}
                        <div className="absolute top-6 right-6 w-16 h-16 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                          {idx + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12">
                      <div className="mb-4">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                            {app}
                          </h3>
                          <div className="w-20 h-1 bg-[#FF6600] mb-4"></div>
                          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            High-performance solution ideal for industrial applications requiring precision, reliability, and consistent output quality.
                          </p>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">✓ Superior Performance</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">✓ High Efficiency Processing</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">✓ Industry-Leading Quality</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-sm">
                <p className="text-lg text-slate-500">
                  This product is suitable for various industrial applications. Contact us for specific use cases.
                </p>
              </div>
            )}
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
                  <img className="w-full h-full object-cover" src={product.image} alt="Related product" />
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
