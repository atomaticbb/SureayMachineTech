/**
 * BladeHero Component
 * Displays the product hero section for blade detail pages.
 * Mirrors ProductHero but uses the Blade type and blade-specific breadcrumbs.
 */

import React, { useState } from "react";
import { Link } from "wouter";
import { Blade } from "@/data/blades";

interface BladeHeroProps {
  blade: Blade;
}

export default function BladeHero({ blade }: BladeHeroProps) {
  const images = blade.gallery && blade.gallery.length > 0 ? blade.gallery : [blade.image];
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <>
      {/* Top Hero Banner */}
      <section className="relative w-full h-[320px] md:h-[400px] lg:h-[460px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: "url('/images/hero/product-hero.webp')" }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/45 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent z-10"></div>

        {/* Left-aligned content */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
              {blade.name}
            </h1>

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
              <Link href="/products/blades">
                <a className="hover:text-white transition-colors hover:underline">Blades</a>
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-white">{blade.categoryDisplay}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="relative flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-slate-900 min-h-[560px] lg:min-h-[640px]">
        {/* Left Side: Image Carousel */}
        <div className="w-full lg:w-1/2 relative bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-6 lg:p-10">
          {/* Blueprint Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundSize: "40px 40px",
              backgroundImage:
                "linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 dark:to-black/20"></div>

          {/* Main Image */}
          <div className="relative z-10 w-full flex items-center justify-center">
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-0 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-700/80 shadow hover:bg-white dark:hover:bg-slate-600 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-slate-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <img
              key={activeIdx}
              alt={`${blade.fullName} - image ${activeIdx + 1}`}
              loading="eager"
              className="w-full h-auto max-h-[340px] lg:max-h-[400px] object-contain drop-shadow-xl transition-opacity duration-300"
              src={images[activeIdx]}
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={next}
                className="absolute right-0 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-700/80 shadow hover:bg-white dark:hover:bg-slate-600 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-slate-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="relative z-10 flex gap-2 mt-5 flex-wrap justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    i === activeIdx
                      ? "border-[#003366] shadow-md scale-105"
                      : "border-slate-200 dark:border-slate-600 hover:border-[#003366]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Information */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-14 lg:px-14 xl:px-20 relative z-10 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-white/5">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl">
              {blade.name}
            </h1>
          </div>

          {/* Description */}
          <p className="text-md text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8 line-clamp-4">
            {blade.fullDescription || blade.description}
          </p>

          {/* Dashboard Panel - Key Specs */}
          {blade.specs && blade.specs.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 lg:p-6 mb-8 shadow-lg max-w-xl">
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                {blade.specs.slice(0, 4).map((spec, index) => (
                  <div
                    key={index}
                    className="relative pl-4 border-l-2 border-[#FF6600]/20 hover:border-[#FF6600] transition-colors"
                  >
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                      {spec.label}
                    </p>
                    <p className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-4">
            <Link href="/contact">
              <a className="inline-block w-full text-center px-18 py-4 bg-[#003366] text-white font-bold text-base rounded-lg hover:bg-[#FF6600] transition-colors duration-300">
                Request Quote
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
