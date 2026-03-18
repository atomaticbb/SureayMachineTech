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
        <a className="group flex gap-4 bg-white border border-slate-200 hover:border-[#001f4d] overflow-hidden transition-colors duration-200 p-4 items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-50 overflow-hidden">
            <img
              src={blade.image}
              alt={blade.name}
              loading="lazy"
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{blade.categoryDisplay}</p>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#001f4d] transition-colors leading-snug mb-1">{blade.name}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{blade.description}</p>
          </div>
          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#001f4d] flex-shrink-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </Link>
    );
  }

  // variant === "list"
  return (
    <Link key={blade.id} href={blade.link}>
      <a className="group block bg-white border border-slate-200 hover:border-[#001f4d] transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">

          {/* Left: Image */}
          <div className="relative bg-slate-50 overflow-hidden" style={{ minHeight: "220px" }}>
            <img
              src={blade.image}
              alt={blade.name}
              className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              style={{ minHeight: "220px" }}
              onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
            />
            {blade.badge && (
              <span className="absolute top-3 left-3 bg-[#001f4d] text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                {blade.badge}
              </span>
            )}
            <span className="absolute bottom-3 left-3 bg-white/80 text-[#001f4d] text-[10px] font-black uppercase px-2 py-1 tracking-wider backdrop-blur-sm">
              OEM Available
            </span>
          </div>

          {/* Right: Data, Specs & CTA */}
          <div className="p-6 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 group-hover:border-[#001f4d]/20 transition-colors">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {blade.categoryDisplay}
              </p>
              <h3 className="text-xl font-bold text-[#001f4d] leading-snug mb-2">
                {blade.name}
              </h3>
              <div className="relative group/desc">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 cursor-help">
                  {blade.fullDescription || blade.description}
                </p>
                {/* Tooltip - only show if text is clamped */}
                <div className="absolute left-0 top-full mt-1 w-full max-w-md bg-white border-2 border-[#001f4d] p-4 opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-200 z-50 pointer-events-none">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {blade.fullDescription || blade.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            {blade.specs && blade.specs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 pt-4 border-t border-slate-100">
                {blade.specs.slice(0, 4).map((spec, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* View Details Row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#001f4d] uppercase tracking-[0.12em] group-hover:underline underline-offset-4 decoration-2 transition-all">
                View Specs &amp; Request Quote
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Custom specs available
              </span>
            </div>
          </div>

        </div>
      </a>
    </Link>
  );
}
