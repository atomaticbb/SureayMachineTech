/**
 * ProductCard — blade product card in two variants:
 *   'list'    → full horizontal row used in BladeListPage (image left, specs right)
 *   'related' → compact horizontal row used in Related Blades section of BladeDetail
 */

import { Link } from "wouter";
import { type Blade } from "@/data/blades";

interface ProductCardProps {
  blade: Blade;
  variant?: "list" | "related";
}

export default function ProductCard({ blade, variant = "list" }: ProductCardProps) {
  if (variant === "related") {
    return (
      <Link key={blade.id} href={blade.link}>
        <a className="group flex gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-500 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 p-4 items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden">
            <img
              src={blade.image}
              alt={blade.name}
              loading="lazy"
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{blade.categoryDisplay}</p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#003366] dark:group-hover:text-blue-400 transition-colors leading-snug mb-1">{blade.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{blade.description}</p>
          </div>
          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#003366] flex-shrink-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </Link>
    );
  }

  // variant === "list"
  return (
    <Link key={blade.id} href={blade.link}>
      <a className="group block bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">

          {/* Left: Image */}
          <div className="relative bg-slate-50 dark:bg-slate-700 overflow-hidden" style={{ minHeight: "220px" }}>
            <img
              src={blade.image}
              alt={blade.name}
              className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              style={{ minHeight: "220px" }}
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />
            {blade.badge && (
              <span className="absolute top-3 left-3 bg-[#003366] text-white text-[10px] font-bold uppercase px-2 py-1 rounded tracking-wider shadow">
                {blade.badge}
              </span>
            )}
            <span className="absolute bottom-3 left-3 bg-white/80 dark:bg-slate-800/80 text-[#FF6600] text-[10px] font-bold uppercase px-2 py-1 rounded tracking-wider backdrop-blur-sm">
              OEM Available
            </span>
          </div>

          {/* Right: Data, Specs & CTA */}
          <div className="p-6 flex flex-col justify-between gap-4 border-t-2 md:border-t-0 md:border-l-2 border-slate-100 dark:border-slate-700 group-hover:border-[#003366]/20 transition-colors">
            <div>
              <p className="text-[10px] font-bold text-[#FF6600] uppercase tracking-widest mb-1">
                {blade.categoryDisplay}
              </p>
              <h3 className="text-xl font-bold text-[#003366] dark:text-white group-hover:text-[#FF6600] transition-colors leading-snug mb-2">
                {blade.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {blade.description}
              </p>
            </div>

            {/* Specs Grid */}
            {blade.specs && blade.specs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                {blade.specs.map((spec, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* View Details Row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#003366] dark:text-blue-400 group-hover:text-[#FF6600] transition-colors">
                View Details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Custom specs available
              </span>
            </div>
          </div>

        </div>
      </a>
    </Link>
  );
}
