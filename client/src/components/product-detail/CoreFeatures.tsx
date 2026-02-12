/**
 * CoreFeatures Component
 * Displays core machine components in an alternating Z-pattern layout
 */

import React from "react";
import { MachineComponent } from "@/data/machines";

interface CoreFeaturesProps {
  components: MachineComponent[];
}

export default function CoreFeatures({ components }: CoreFeaturesProps) {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-[#FF6600]"></div>
            <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
              Core Components
            </span>
            <div className="h-[2px] w-8 bg-[#FF6600]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] dark:text-white mb-4">
            Precision-Engineered Components
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Customize your machine with world-class components designed for reliability and extreme precision in demanding industrial environments.
          </p>
        </div>

        {/* Alternating Z-Layout Blocks */}
        <div className="space-y-20 lg:space-y-24">
          {components.map((component, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={component.id}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 group ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Column - 50% */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-xl bg-slate-50 dark:bg-slate-800/50 p-8 lg:p-10 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] h-[375px] lg:h-[500px] flex items-center justify-center">
                    {/* Blueprint Grid Background */}
                    <div
                      className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
                      style={{
                        backgroundSize: '30px 30px',
                        backgroundImage: 'linear-gradient(to right, rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.5) 1px, transparent 1px)'
                      }}
                    ></div>

                    {/* Component Image */}
                    <img
                      src={component.image}
                      alt={component.title}
                      loading="lazy"
                      width={600}
                      height={450}
                      className="relative z-10 w-full h-full max-h-[313px] lg:max-h-[438px] object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/images/products/machinery.webp";
                      }}
                    />
                  </div>
                </div>

                {/* Content Column - 50% */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-[#FF6600] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-[#FF6600]"></span>
                    {component.tag}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-bold text-[#003366] dark:text-white mb-4 leading-tight">
                    {component.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
                    {component.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
