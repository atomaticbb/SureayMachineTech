/*
 * Products List Page - Modern B2B Industrial Design
 * Based on reference: product_list.html
 */

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { products } from "@/data/products";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["Shredders"]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedPower, setSelectedPower] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Navbar />

      {/* Header Section with Gray Gradient Background */}
      <div className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Header */}
          <div className="mb-4">
            <nav className="flex text-sm text-slate-500 mb-4 gap-2 items-center">
              <Link href="/">
                <a className="hover:text-[#003366] transition-colors">Home</a>
              </Link>
              <span>→</span>
              <a className="hover:text-[#003366] transition-colors" href="#">Equipment</a>
              <span>→</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">Industrial Shredders</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Industrial Shredders
                </h1>
                <p className="text-slate-500 mt-2">{products.length} heavy-duty shredding solutions for industrial applications.</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-600 hidden lg:block">Sort by:</label>
                <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-[#003366] transition-colors">
                  Recommended
                  <span>▼</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-xs text-[#003366] font-semibold hover:underline">Clear All</button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <button className="flex w-full items-center justify-between font-semibold text-sm mb-3">
                  Category
                  <span>▲</span>
                </button>
                <div className="space-y-2">
                  {["Shredders", "Granulators", "Conveyors", "Baling Presses"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategory([...selectedCategory, cat]);
                          } else {
                            setSelectedCategory(selectedCategory.filter((c) => c !== cat));
                          }
                        }}
                        className="rounded border-slate-300 text-[#003366] focus:ring-[#003366] h-4 w-4"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-[#003366]">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Compatibility */}
              <div className="mb-6">
                <button className="flex w-full items-center justify-between font-semibold text-sm mb-3">
                  Material
                  <span>▼</span>
                </button>
                <div className="space-y-2">
                  {["Plastic", "Metal", "Wood"].map((mat) => (
                    <label key={mat} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterial.includes(mat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMaterial([...selectedMaterial, mat]);
                          } else {
                            setSelectedMaterial(selectedMaterial.filter((m) => m !== mat));
                          }
                        }}
                        className="rounded border-slate-300 text-[#003366] focus:ring-[#003366] h-4 w-4"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-[#003366]">
                        {mat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Power Rating */}
              <div>
                <button className="flex w-full items-center justify-between font-semibold text-sm mb-3">
                  Power Rating
                  <span>▼</span>
                </button>
                <div className="space-y-2">
                  {["< 50kW", "50kW - 150kW", "> 150kW"].map((power) => (
                    <label key={power} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPower.includes(power)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPower([...selectedPower, power]);
                          } else {
                            setSelectedPower(selectedPower.filter((p) => p !== power));
                          }
                        }}
                        className="rounded border-slate-300 text-[#003366] focus:ring-[#003366] h-4 w-4"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-[#003366]">
                        {power}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={product.image}
                      alt={product.nameEn}
                    />
                    {product.isFeatured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#003366] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Top Seller
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
                      {product.nameEn}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>

                    {/* Specs Badges */}
                    {product.specs && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.specs.material && (
                          <div className="bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 px-2 py-1 rounded-md text-[11px] font-bold">
                            {product.specs.material.split(",")[0].trim()}
                          </div>
                        )}
                        {product.specs.hardness && (
                          <div className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-[11px] font-bold">
                            {product.specs.hardness}
                          </div>
                        )}
                        {product.specs.thickness && (
                          <div className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-[11px] font-bold">
                            {product.specs.thickness}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-auto flex flex-col gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <button className="w-full bg-[#003366] text-white py-2 rounded-lg font-bold text-sm hover:bg-[#003366]/90 transition-colors">
                          View Specs
                        </button>
                      </Link>
                      <Link href="/contact">
                        <button className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                          Inquiry
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-2 mt-12 mb-8">
              <button className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                ←
              </button>
              <button className="size-10 rounded-lg flex items-center justify-center bg-[#003366] text-white font-bold shadow-md">
                1
              </button>
              <button className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                2
              </button>
              <button className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                3
              </button>
              <span className="px-2 text-slate-400">...</span>
              <button className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                12
              </button>
              <button className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                →
              </button>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
