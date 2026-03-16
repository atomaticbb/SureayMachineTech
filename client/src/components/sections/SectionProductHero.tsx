/**
 * ProductHero — 2-column blade detail hero
 * Left: product image with photo/blueprint toggle
 * Right: category tag, H1, quick-specs panel, description, Request Quote CTA
 *
 * Owns viewMode state internally.
 */

import { useState } from "react";
import { Link } from "wouter";
import { type Blade } from "@/data/blades";

interface ProductHeroProps {
  blade: Blade;
  className?: string;
}

export default function ProductHero({ blade, className = "" }: ProductHeroProps) {
  const [viewMode, setViewMode] = useState<"photo" | "blueprint">("photo");

  return (
    <div className={`max-w-7xl mx-auto px-4 lg:px-8 mb-10 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left: Image + view toggle */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center p-4">
            <img
              src={viewMode === "photo" ? blade.image : "/images/products/blades/tissue-log-saw-blades-00.webp"}
              alt={viewMode === "photo" ? blade.name : `${blade.name} engineering schematic`}
              className="w-full h-full object-contain transition-opacity duration-300"
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />
            <div className="absolute top-4 left-4 z-20 bg-[#003366] text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded shadow-sm tracking-wider">
              OEM / Custom Available
            </div>
            {blade.badge && (
              <div className="absolute top-4 right-4 z-20 bg-[#003366] text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded shadow-sm tracking-wider">
                {blade.badge}
              </div>
            )}
          </div>

          {/* Photo / Schematic segmented control */}
          <div className="flex self-start rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shadow-sm">
            <button
              onClick={() => setViewMode("photo")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
                viewMode === "photo"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photo
            </button>
            <button
              onClick={() => setViewMode("blueprint")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
                viewMode === "blueprint"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Schematic
            </button>
          </div>
        </div>

        {/* Right: Data & Actions */}
        <div className="flex flex-col gap-6">
          {/* Category Tag */}
          <span className="inline-flex w-fit items-center bg-[#003366]/10 text-[#003366] dark:bg-blue-900/30 dark:text-blue-300 border border-[#003366]/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
            {blade.categoryDisplay}
          </span>

          {/* H1 */}
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            {blade.fullName || blade.name}
          </h1>

          {/* Quick Specs — engineering leader-line style */}
          {blade.specs && blade.specs.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-3.5">
              {blade.specs.slice(0, 5).map((spec, i) => (
                <div key={i} className="flex items-end gap-1">
                  <span className="text-base text-slate-500 dark:text-slate-400 whitespace-nowrap">{spec.label}</span>
                  <div className="flex-grow border-b-2 border-dotted border-slate-200 dark:border-slate-700 mx-1 mb-1"></div>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white whitespace-nowrap text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed line-clamp-4">
            {blade.fullDescription || blade.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-4">
            <Link href="/contact">
              <a className="inline-block w-full text-center px-18 py-4 bg-[#003366] text-white font-bold text-base rounded-lg hover:bg-[#FF6600] transition-colors duration-300">
                Request Quote
              </a>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
