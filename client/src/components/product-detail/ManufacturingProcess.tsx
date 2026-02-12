/**
 * ManufacturingProcess Component
 * Displays the manufacturing process in a Bento Box grid layout
 */

import React from "react";
import { ProcessItem } from "@/data/machines";

interface ManufacturingProcessProps {
  items: ProcessItem[];
}

export default function ManufacturingProcess({ items }: ManufacturingProcessProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Separate large and small items
  const largeItem = items.find(item => item.size === 'large');
  const smallItems = items.filter(item => item.size === 'small' || !item.size);

  return (
    <section className="bg-[#0f172a] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-5 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-6 bg-[#FF6600]"></div>
            <span className="text-[#FF6600] tracking-[0.2em] text-[12px] font-bold uppercase">
              THE SUREAY STANDARD
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl mb-3 whitespace-nowrap">
            Precision Manufacturing & Quality Control
          </h2>
          <p className="text-slate-300 max-w-xl text-base font-light leading-relaxed">
            We control the full lifecycle to ensure lifetime accuracy—integrating stress relief
            annealing, laser verification, and clean assembly.
          </p>
        </div>

        {/* Bento Box Gallery */}
        <div className="grid grid-cols-12 gap-2.5">
          {/* Featured Large Item */}
          {largeItem && (
            <div className="col-span-12 lg:col-span-8 lg:row-span-2 relative rounded-lg overflow-hidden bg-slate-800 group min-h-[120px] lg:min-h-[200px]">
              <img
                alt={largeItem.title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                src={largeItem.image}
                onError={(e) => {
                  e.currentTarget.src = "/images/products/machinery.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-4 w-0.5 bg-[#FF6600]"></div>
                  <span className="text-[#FF6600] font-bold tracking-widest text-sm">{largeItem.number}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                  {largeItem.title}
                </h3>
                {largeItem.description && (
                  <p className="text-slate-300 text-sm font-light max-w-md hidden md:block">
                    {largeItem.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Secondary Items */}
          {smallItems.map((item, index) => (
            <div
              key={item.id}
              className="col-span-12 md:col-span-6 lg:col-span-4 relative rounded-lg overflow-hidden bg-slate-800 group min-h-[90px]"
            >
              <img
                alt={item.title}
                loading="lazy"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                src={item.image}
                onError={(e) => {
                  e.currentTarget.src = "/images/products/machinery.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex flex-col justify-end p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="h-3 w-[2px] bg-[#FF6600]"></div>
                  <span className="text-[#FF6600] font-bold tracking-widest text-sm uppercase">{item.number}</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
