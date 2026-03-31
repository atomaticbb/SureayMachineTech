/*
 * IndustryToolingMatrix — Module 2
 * Filterable, paginated product grid.
 * Framer Motion AnimatePresence popLayout + mechanical spring (stiffness 500).
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { IndustryProduct } from "./types";
import { MONO, SPRING_MECHANICAL } from "./types";

const PAGE_SIZE = 6;

interface Props {
  products: IndustryProduct[];
  filterCategories: string[]; // ["ALL", "SHREDDING", ...]
}

export default function IndustryToolingMatrix({
  products,
  filterCategories,
}: Props) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "ALL"
      ? products
      : products.filter(p => p.category.toUpperCase() === activeFilter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    setPage(1);
  };

  const handlePage = (p: number) => {
    setPage(p);
    const el = document.getElementById("tooling-matrix");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="tooling-matrix" className="bg-slate-50 py-12 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-bold text-[11px] text-slate-400 uppercase tracking-[0.45em] mb-3">
            Engineered Product Range
          </p>
          <h2 className="font-black text-2xl md:text-3xl text-[#001f4d] uppercase tracking-tight leading-[1.0]">
            Core Tooling Matrix.
          </h2>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filterCategories.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilter(f)}
              className={`border-2 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-200 rounded-none cursor-pointer ${
                activeFilter === f
                  ? "border-[#001f4d] bg-[#001f4d] text-white"
                  : "border-slate-200 text-slate-500 bg-transparent hover:border-[#001f4d] hover:text-[#001f4d]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Card grid — mechanical AnimatePresence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {pageItems.map(product => (
              <motion.div
                key={`${product.href}-${product.name}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={SPRING_MECHANICAL}
              >
                <Link href={product.href}>
                  <div className="border border-slate-200 bg-white flex flex-col h-full group relative cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#001f4d]">
                    {/* Image viewport */}
                    <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden flex items-center justify-center p-5">
                      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-300 pointer-events-none" />
                      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-300 pointer-events-none" />
                      <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-300 pointer-events-none" />
                      <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-300 pointer-events-none" />

                      <div className="absolute top-0 left-0 z-10">
                        <span className="inline-block border-l-4 border-[#001f4d] bg-white/80 backdrop-blur-sm text-[#001f4d] font-black text-[10px] uppercase tracking-[0.3em] px-3 py-2">
                          {product.isFlagship ? "★ FLAGSHIP" : product.category}
                        </span>
                      </div>

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Nameplate */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-black text-[17px] text-[#001f4d] uppercase tracking-[-0.03em] leading-[1.15] mb-3 line-clamp-2 min-h-[42px]">
                        {product.name}
                      </h3>
                      <p className="text-[14px] text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-2">
                        {product.desc ??
                          (product.isFlagship
                            ? "Extreme-wear grade engineered for maximum continuous uptime. 100% CMM-verified tolerance."
                            : "Precision-engineered OEM replacement tooling designed for drop-in compatibility and extended service life.")}
                      </p>
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#001f4d] transition-colors duration-300">
                          [ View Spec Sheet ]
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#001f4d] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePage(Math.max(1, page - 1))}
              disabled={page === 1}
              style={MONO}
              className="w-10 h-10 border border-slate-200 text-[13px] text-slate-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => handlePage(p)}
                style={MONO}
                className={`w-10 h-10 border text-[13px] transition-colors duration-200 ${
                  page === p
                    ? "border-[#001f4d] bg-[#001f4d] text-white"
                    : "border-slate-200 text-slate-500 hover:border-[#001f4d] hover:text-[#001f4d]"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              style={MONO}
              className="w-10 h-10 border border-slate-200 text-[13px] text-slate-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
            >
              »
            </button>
          </div>

          <div className="w-48 h-[2px] bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-[#001f4d] transition-all duration-300"
              style={{ width: `${(page / totalPages) * 100}%` }}
            />
          </div>
          <p
            style={MONO}
            className="text-[10px] text-slate-400 uppercase tracking-[0.3em]"
          >
            {page} / {totalPages}
          </p>
        </div>
      </div>
    </section>
  );
}
