/**
 * BladeCard Component - Reusable Product Card for Blades & Knives
 * Used in BladeListPage to display individual blade products
 * Mirrors MachineCard.tsx structure/pattern
 */

import React from "react";
import { Link } from "wouter";
import { Blade, getBadgeClasses } from "@/data/blades";

interface BladeCardProps {
  blade: Blade;
}

export default function BladeCard({ blade }: BladeCardProps) {
  return (
    <article className="group relative h-[460px] w-full bg-white dark:bg-slate-800 rounded-xl shadow-none shadow-none transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative h-[260px] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
        {/* Badge */}
        {blade.badge && (
          <span className={getBadgeClasses(blade.badgeColor)}>
            {blade.badge}
          </span>
        )}

        {/* OEM Label */}
        <span className="absolute bottom-3 left-3 z-10 bg-white/80 dark:bg-slate-800/80 text-[#0b4a8f] text-[12px] font-bold  px-2 py-1 rounded tracking-wider backdrop-blur-sm">
          OEM Available
        </span>

        {/* Product Image */}
        <img
          alt={blade.fullName}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          src={blade.image}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          onError={e => {
            e.currentTarget.src = "/sureay.svg";
          }}
        />
      </div>

      {/* Content Section */}
      <div className="px-5 pt-4 pb-0 flex flex-col flex-1 bg-white dark:bg-slate-800">
        {/* Category Tag */}
        <p className="text-[12px] font-bold text-[#0b4a8f]  tracking-widest mb-1">
          {blade.categoryDisplay}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#003366] transition-colors mb-2">
          {blade.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-snug line-clamp-2 mb-3">
          {blade.description}
        </p>

        {/* Specs Mini-Grid */}
        {blade.specs && blade.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-slate-100 dark:border-slate-700 mb-3">
            {blade.specs.slice(0, 4).map((spec, i) => (
              <div key={i}>
                <p className="text-[12px] text-muted-foreground dark:text-muted-foreground  tracking-widest leading-none mb-0.5">
                  {spec.label}
                </p>
                <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <Link
            href={blade.link}
            className="group/btn block w-full text-center"
          >
            <div className="inline-block relative py-1">
              <span className="text-xs font-black  tracking-[0.2em] text-[#003366] dark:text-muted-foreground group-hover/btn:text-[#0b4a8f] transition-colors duration-300">
                View Details
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0b4a8f] transition-all duration-300 group-hover/btn:w-full"></span>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
