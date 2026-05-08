/**
 * ProductCard — blade product card in three variants:
 *   'grid'    → vertical card (large image + title + desc + CTA) for 2-col grid
 *   'list'    → compact horizontal row used in BladeListPage sidebar layout
 *   'related' → compact horizontal row used in Related Blades section of BladeDetail
 */

import { Link } from "wouter";
import { type Blade, type BladeSectorType } from "@/data/blades";
import { SECTOR_LABEL } from "@/data/blade-categories";

interface ProductCardProps {
  blade: Blade;
  variant?: "grid" | "list" | "related";
  sectorBadge?: BladeSectorType;
}

export default function ProductCard({
  blade,
  variant = "list",
  sectorBadge,
}: ProductCardProps) {
  // ─── Grid variant: large image + title + desc + CTA ──────────────────────
  if (variant === "grid") {
    return (
      <Link href={blade.link}>
        <a className="group flex flex-col bg-white border border-slate-200 hover:border-[#65AAD6]/50 transition-colors duration-200 cursor-pointer h-full">
          {/* Large image */}
          <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex-shrink-0">
            <img
              src={blade.image}
              alt={blade.name}
              loading="lazy"
              decoding="async"
              width={400}
              height={300}
              className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
              onError={e => {
                e.currentTarget.src = "/images/products/product.webp";
              }}
            />
            {sectorBadge && (
              <span className="absolute top-3 right-3 bg-[#001f4d] text-white text-[10px] font-black  px-2 py-1 tracking-wider">
                {SECTOR_LABEL[sectorBadge]}
              </span>
            )}
            <span className="absolute bottom-3 left-3 bg-white/80 text-[#001f4d] text-[10px] font-black  px-2 py-1 tracking-wider backdrop-blur-sm">
              OEM Available
            </span>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col flex-1 border-t border-slate-100 group-hover:border-[#65AAD6]/20 transition-colors">
            <p className="text-[10px] font-black text-slate-400  tracking-widest mb-2">
              {blade.categoryDisplay}
            </p>
            <h3 className="text-xl lg:text-2xl font-black text-[#001f4d] group-hover:text-[#003366]  tracking-tight leading-tight mb-4 transition-colors">
              {blade.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
              {blade.description}
            </p>
            <div className="mt-auto">
              <div className="inline-flex items-center gap-2 border border-[#001f4d] bg-white group-hover:bg-[#001f4d] text-[#001f4d] group-hover:text-white text-[11px] font-black  tracking-[0.18em] px-5 py-3 transition-colors duration-200 self-start">
                View Details
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  // ─── Related variant: compact horizontal row ──────────────────────────────
  if (variant === "related") {
    return (
      <Link key={blade.id} href={blade.link}>
        <a className="group flex gap-4 bg-white border border-slate-200 hover:border-[#001f4d] overflow-hidden transition-colors duration-200 p-4 items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-50 overflow-hidden">
            <img
              src={blade.image}
              alt={blade.name}
              loading="lazy"
              decoding="async"
              width={80}
              height={80}
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              onError={e => {
                e.currentTarget.src = "/images/products/product.webp";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-400  tracking-widest mb-0.5">
              {blade.categoryDisplay}
            </p>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#001f4d] transition-colors leading-snug mb-1">
              {blade.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {blade.description}
            </p>
          </div>
          <svg
            className="w-4 h-4 text-slate-400 group-hover:text-[#001f4d] flex-shrink-0 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </Link>
    );
  }

  // ─── List variant: horizontal row (image left, specs right) ──────────────
  return (
    <Link key={blade.id} href={blade.link}>
      <a className="group block bg-white border border-slate-200 hover:border-[#65AAD6]/50 transition-colors duration-300 cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
          {/* Left: Image */}
          <div
            className="relative bg-slate-50 overflow-hidden"
            style={{ minHeight: "220px" }}
          >
            <img
              src={blade.image}
              alt={blade.name}
              loading="lazy"
              decoding="async"
              width={300}
              height={220}
              className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              style={{ minHeight: "220px" }}
              onError={e => {
                e.currentTarget.src = "/images/products/product.webp";
              }}
            />
            {blade.badge && (
              <span className="absolute top-3 left-3 bg-[#001f4d] text-white text-[10px] font-black  px-2 py-1 tracking-wider">
                {blade.badge}
              </span>
            )}
            <span className="absolute bottom-3 left-3 bg-white/80 text-[#001f4d] text-[10px] font-black  px-2 py-1 tracking-wider backdrop-blur-sm">
              OEM Available
            </span>
          </div>

          {/* Right: Data, Specs */}
          <div className="p-6 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 group-hover:border-[#65AAD6]/20 transition-colors">
            <div>
              <p className="text-[10px] font-black text-slate-400  tracking-widest mb-1">
                {blade.categoryDisplay}
              </p>
              <h3 className="text-xl font-bold text-[#001f4d] group-hover:text-[#003366] leading-snug mb-2 transition-colors">
                {blade.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                {blade.description}
              </p>
            </div>

            {/* Specs Grid — 3 items: material / hardness / application first */}
            {blade.specs &&
              blade.specs.length > 0 &&
              (() => {
                const PRIORITY = ["material", "hardness", "application"];
                const sorted = [
                  ...PRIORITY.map(key =>
                    blade.specs!.find(s => s.label.toLowerCase().includes(key))
                  ).filter(Boolean),
                  ...blade.specs.filter(
                    s =>
                      !PRIORITY.some(key => s.label.toLowerCase().includes(key))
                  ),
                ].slice(0, 3) as { label: string; value: string }[];

                return (
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3 pt-4 border-t border-slate-100">
                    {sorted.map((spec, i) => (
                      <div key={i}>
                        <p className="text-[10px] text-slate-400  tracking-widest leading-none mb-1">
                          {spec.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}

            {/* Click affordance arrow */}
            <div className="flex justify-end">
              <svg
                className="w-5 h-5 text-slate-300 group-hover:text-[#65AAD6] group-hover:translate-x-1 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
