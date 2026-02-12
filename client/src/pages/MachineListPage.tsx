/*
 * Machine List Page - Dedicated page for CNC Machinery & Equipment
 */

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "wouter";
import { getProductsByMainCategory } from "@/data/products";
import { machines } from "@/data/machines";
import MachineCard from "@/components/MachineCard";

export default function MachineListPage() {
  const category = "machinery";
  const products = getProductsByMainCategory(category);

  const listSectionRef = useRef<HTMLElement | null>(null);
  const didMountRef = useRef<boolean>(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTonnage, setSelectedTonnage] = useState<string>("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Filter machines based on selected criteria
  const filteredMachines = machines.filter((machine) => {
    const categoryMatch =
      selectedCategory === "all" ||
      machine.category === selectedCategory ||
      (selectedCategory === "press brake" && machine.category === "press_brake") ||
      (selectedCategory === "shearing machine" && machine.category === "shearing") ||
      (selectedCategory === "rolling machine" && machine.category === "rolling");

    const tonnageMatch =
      selectedTonnage === "all" || machine.tonnage === selectedTonnage;

    return categoryMatch && tonnageMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMachines = filteredMachines.slice(startIndex, endIndex);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    listSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: 'category' | 'tonnage', value: string) => {
    setCurrentPage(1);
    if (filterType === 'category') {
      setSelectedCategory(value);
    } else {
      setSelectedTonnage(value);
    }
  };

  const categoryConfig = {
    subtitle: "Machinery & Equipment",
    hero: {
      title: "Precision CNC\nPress Brakes & Equipment",
      description: "Engineered for heavy industry. Our machinery delivers ±0.01mm accuracy with intelligent servo synchronization.",
      image: "/images/hero/hero.webp",
    },
    icon: "precision_manufacturing",
    features: [
      {
        icon: "settings",
        title: "High Precision",
        description: "Advanced CNC control systems for micron-level accuracy in every operation.",
      },
      {
        icon: "speed",
        title: "High Efficiency",
        description: "Optimized performance with servo motors and integrated automation systems.",
      },
      {
        icon: "engineering",
        title: "Robust Design",
        description: "Heavy-duty steel frames built to withstand demanding industrial environments.",
      },
    ],
  };

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
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs md:text-sm font-medium mb-4 text-slate-300/80 uppercase tracking-wider">
              <Link href="/">
                <a className="hover:text-white transition-colors hover:underline">Home</a>
              </Link>
              <span className="text-slate-500">/</span>
              <Link href="/products">
                <a className="hover:text-white transition-colors hover:underline">Products</a>
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-[#FF6600]">Machinery</span>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {categoryConfig.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed font-light">
              {categoryConfig.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <a
                className="w-full sm:w-auto bg-[#003366] hover:bg-white text-white hover:text-[#003366] px-8 py-3.5 rounded-md font-semibold text-center transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 transform inline-block"
                href="#products"
              >
                Explore Products
              </a>
              <Link href="/contact">
                <a className="w-full sm:w-auto bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-[#003366] px-8 py-3.5 rounded-md font-semibold text-center transition-all duration-300 hover:scale-105 transform shadow-2xl inline-block">
                  Request Quote
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products List - Filter Bar + 3 Column Grid */}
      <section
        id="products"
        ref={listSectionRef}
        className="py-24 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#003366] dark:text-white uppercase mb-2">Our Machinery Range</h2>
          </div>

          {/* Technical Product Filter Bar */}
          <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Filter Groups Container */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                {/* Filter Group A: Machine Category */}
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .208M7 21h10m0 0a2 2 0 002-2v-3" />
                    </svg>
                    Machine Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Press Brake", "Shearing Machine", "Rolling Machine"].map((cat) => {
                      const catValue = cat.toLowerCase();
                      const isActive = selectedCategory === catValue;
                      return (
                        <button
                          key={cat}
                          onClick={() => handleFilterChange('category', isActive ? "all" : catValue)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-[#003366] text-white shadow-md"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filter Group B: Tonnage/Power */}
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tonnage / Power
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Light", "Medium", "Heavy"].map((ton) => {
                      const tonValue = ton.toLowerCase();
                      const isActive = selectedTonnage === tonValue;
                      const displayText = ton === "Light" ? "Light (<100T)" : ton === "Medium" ? "Medium (100-300T)" : ton === "Heavy" ? "Heavy (>300T)" : ton;
                      return (
                        <button
                          key={ton}
                          onClick={() => handleFilterChange('tonnage', isActive ? "all" : tonValue)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-[#FF6600] text-white shadow-md"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {displayText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedTonnage("all");
                    setCurrentPage(1);
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-[#003366] dark:hover:text-blue-400 text-sm font-semibold transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Result Count */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing <span className="font-bold text-slate-900 dark:text-white">{filteredMachines.length}</span> Machines
              </p>
            </div>
          </div>

          {/* Product Cards - 3 Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedMachines.length > 0 ? (
              <>
                {paginatedMachines.map((machine) => (
                  <MachineCard key={machine.id} machine={machine} />
                ))}
              </>
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  No machines match your selected filters. Please adjust your search criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-all ${
                    currentPage === 1
                      ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                      : "border-slate-300 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-600 hover:text-[#003366] dark:hover:text-blue-400 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and adjacent pages
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;

                  // Show ellipsis
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return <span key={`ellipsis-${page}`} className="px-2 text-slate-400">...</span>;
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all ${
                        currentPage === page
                          ? "bg-[#003366] text-white shadow-md"
                          : "border-2 border-slate-300 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-600 hover:text-[#003366] dark:hover:text-blue-400 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-all ${
                    currentPage === totalPages
                      ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                      : "border-slate-300 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-600 hover:text-[#003366] dark:hover:text-blue-400 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>


      {/* Custom Solution CTA Section */}
      <section className="relative py-24 bg-[#003366] overflow-hidden">
        {/* Technical Blueprint Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side: Icon + Text */}
            <div className="flex items-start gap-8">
              {/* Icon */}
              <div className="flex-shrink-0 pt-2">
                <svg className="w-16 h-16 lg:w-20 lg:h-20 text-[#FF6600]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  {/* Gear + Wrench - Industrial Custom Engineering Icon */}
                  {/* Main Gear Body */}
                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.15"/>

                  {/* Gear Teeth (8 directional spokes) */}
                  <path d="M12 2v3M12 19v3M22 12h-3M5 12H2"/>
                  <path d="M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12"/>
                  <path d="M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93"/>

                  {/* Outer Ring */}
                  <circle cx="12" cy="12" r="5"/>

                  {/* Wrench Tool crossing the gear */}
                  <path d="M17.5 6.5l2-2a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12l-2 2" strokeWidth="2.2"/>
                  <path d="M17.5 6.5l-3.5 3.5" strokeWidth="2.2"/>
                  <circle cx="20" cy="4" r="0.8" fill="currentColor"/>
                </svg>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-4xl font-bold text-white leading-tight">
                  Not finding the exact specs?
                </h2>
                <p className="text-lg text-blue-200 leading-relaxed">
                  From 40T to 2000T, we engineer custom solutions for your specific metal bending needs.
                </p>
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-end">
              {/* Primary Button */}
              <Link href="/contact">
                <a className="group relative px-8 py-4 bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold text-center rounded-lg shadow-2xl hover:shadow-[#FF6600]/50 transition-all duration-300 hover:scale-105 transform inline-block">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Request Custom Solution
                  </span>
                </a>
              </Link>

              {/* Secondary Button */}
              <a
                href="https://wa.me/8615655530829?text=Hi%2C%20I%27m%20interested%20in%20custom%20machinery%20solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-transparent border-2 border-white hover:border-[#FF6600] text-white hover:text-[#FF6600] font-bold text-center rounded-lg transition-all duration-300 hover:scale-105 transform inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {/* WhatsApp-style chat icon */}
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.413-2.393-1.476-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.258-1.02 1.022-1.756 2.119-2.259 3.357-.553 1.28-.86 2.123-.948 4.255v.004c-.057 1.577.182 2.968.766 4.166 1.216 2.646 3.544 4.518 6.14 4.9h.004c.433.057.946.118 1.926.118.474 0 .9-.025 1.271-.074 1.947-.226 3.328-.986 4.3-2.212.661-.84 1.123-1.841 1.315-3.116.118-.788.118-1.797-.025-2.305-.314-1.054-.945-1.989-1.868-2.777-.788-.672-1.566-1.045-2.554-1.202--1.195-.168-2.319-.168-3.356 0z"/>
                </svg>
                Talk to Engineer
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Content & Factory Showcase Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: SEO Text Narrative */}
            <div className="space-y-6">

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                China Leading Manufacturer of <br/>
                <span className="text-slate-600">CNC Press Brakes & Shearing Machines</span>
              </h2>

              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>
                  Sureay Machinery is a leading manufacturer located in Ma'anshan (Bowang District), the heart of China's sheet metal machinery industry. Since our inception, we have served as a verified source factory for heavy-duty CNC Press Brakes, Guillotine Shears, and Plate Bending Rolls.
                </p>
                <p>
                  With a 50,000m² production base, we offer distinct advantages over trading companies: full oversight of R&D, welding, and assembly processes.
                </p>
                <p>
                  All Sureay equipment is ISO 9001:2015 and CE certified. We utilize premium hydraulic and electrical components from Delem, Schneider, and Bosch-Rexroth to maximize precision and lifespan. Choose Sureay for factory-direct prices and engineering expertise.
                </p>
              </div>
            </div>

            {/* Right Column: Factory Image (Visual Proof) */}
            <div className="relative group">
              {/* Image Container with style */}
              <div className="relative overflow-hidden shadow-2xl border border-slate-300 aspect-square ">
                <img
                  src="/images/common/factory.webp"
                  alt="Sureay Machinery CNC Workshop in Ma'anshan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Decorative Element behind image */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-[#FF6600]/20 hidden lg:block"></div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}