import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ECOSYSTEMS } from "@/data/homeData";

export default function TabEcosystem() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const active = expanded !== null ? ECOSYSTEMS[expanded] : null;

  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
            Markets We Serve
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-xl">
              Choose Your Industry. <br />
              Find Your Blade.
            </h2>
            <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed md:text-right">
              Select your application below to explore blade materials, OEM
              compatibilities, and cutting solutions tailored to your production
              line.
            </p>
          </div>
          <div className="w-14 h-[3px] bg-slate-300 mt-8" />
        </div>

        {/* Industry card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {ECOSYSTEMS.map((eco, i) => {
            const isActive = expanded === i;
            return (
              <button
                key={eco.industry}
                onClick={() => setExpanded(isActive ? null : i)}
                className={[
                  "relative overflow-hidden rounded-none text-left cursor-pointer transition-all duration-300 group",
                  "aspect-[4/3]",
                ].join(" ")}
              >
                {/* Background image */}
                <img
                  src={eco.image}
                  alt={eco.industry}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div
                  className={[
                    "absolute inset-0 transition-all duration-300",
                    isActive
                      ? "bg-[#001224]/80"
                      : "bg-gradient-to-t from-[#001224]/80 via-[#001224]/40 to-[#001224]/15 group-hover:from-[#001224]/85",
                  ].join(" ")}
                />
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4 lg:p-5">
                  <p className="text-white font-black text-sm lg:text-base uppercase tracking-wide leading-tight">
                    {eco.industry}
                  </p>
                  {isActive && <div className="w-8 h-[3px] bg-white mt-2" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expandable detail panel */}
        <AnimatePresence mode="wait">
          {active && expanded !== null && (
            <motion.div
              key={expanded}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-8 lg:pt-10">
                <div className="border-t-2 border-[#003366] pt-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left — Text & Specs */}
                  <div className="w-full lg:w-3/5 flex flex-col justify-center">
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.35em] mb-2">
                      {active.industry}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-black text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-3">
                      {active.label}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed mb-5 hidden sm:block">
                      {active.desc}
                    </p>

                    <p className="text-[11px] font-bold text-[#001f4d] uppercase tracking-[0.22em] mb-3">
                      Typical Selection Checklist
                    </p>

                    <div className="flex flex-col border-t border-slate-200">
                      {active.specs.slice(0, 4).map(spec => (
                        <div
                          key={spec.label}
                          className="flex flex-row items-baseline py-2.5 border-b border-slate-100 last:border-0 gap-6"
                        >
                          <span className="min-w-[130px] w-[130px] lg:min-w-[160px] lg:w-[160px] text-[11px] font-bold text-slate-600 uppercase tracking-widest flex-shrink-0">
                            {spec.label}
                          </span>
                          <span className="flex-1 text-[13px] lg:text-[15px] font-normal text-[#003366] leading-relaxed">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href={active.href} className="self-start mt-4">
                      <span className="inline-flex items-center gap-2 bg-[#003366] text-white px-5 lg:px-6 py-2 lg:py-2.5 text-[11px] font-black uppercase tracking-widest hover:bg-[#001f4d] transition-colors rounded-none cursor-pointer whitespace-nowrap">
                        Explore {active.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>

                  {/* Right — Image (hidden on mobile) */}
                  <div className="hidden lg:flex w-full lg:w-2/5 items-center">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ minHeight: 280 }}
                    >
                      <img
                        src={active.image}
                        alt={`${active.label} industrial cutting solutions`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/20 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
