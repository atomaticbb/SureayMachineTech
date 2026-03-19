import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ECOSYSTEMS } from "@/data/homeData";

const SCROLL_PER_TAB_VH = 80;

export default function TabEcosystem() {
  const [activeTab, setActiveTab] = useState(0);
  const activeEcosystem = ECOSYSTEMS[activeTab];
  const outerRef = useRef<HTMLDivElement>(null);

  // ── Scroll → tab ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, scrolled / total);
      const next = Math.min(
        ECOSYSTEMS.length - 1,
        Math.floor(progress * ECOSYSTEMS.length)
      );
      setActiveTab(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Tab click → scroll to matching position ──────────────────────────────
  const scrollToTab = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const outerAbsTop = window.scrollY + el.getBoundingClientRect().top;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: outerAbsTop + (i / ECOSYSTEMS.length) * total, behavior: "smooth" });
  };

  return (
    <div
      ref={outerRef}
      style={{ height: `calc(${ECOSYSTEMS.length * SCROLL_PER_TAB_VH}vh + 100vh)` }}
    >
      {/* Section header — scrolls normally */}
      <div className="bg-white border-t border-slate-200 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
              Markets We Serve
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-xl">
                Choose Your Industry. <br />Find Your Blade.
              </h2>
              <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed md:text-right">
                Select your application below to explore blade materials, OEM compatibilities, and cutting solutions tailored to your production line.
              </p>
            </div>
            <div className="w-14 h-[3px] bg-slate-300 mt-8" />
          </div>
        </div>
      </div>

      {/* sticky part — tab bar + content locks below navbar */}
      <section className="sticky top-[60px] lg:top-[74px] bg-white pb-10 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">

          {/* Tab bar */}
          <div className="flex gap-0 border-b border-slate-200 mb-6 lg:mb-12 overflow-x-auto pt-4 lg:pt-6">
            {ECOSYSTEMS.map((eco, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={eco.label}
                  onClick={() => scrollToTab(i)}
                  className={[
                    "flex-shrink-0 px-4 lg:px-6 mr-1 lg:mr-2 text-xs lg:text-sm transition-all cursor-pointer whitespace-nowrap",
                    isActive
                      ? "text-[#001f4d] font-black uppercase tracking-wider border-b-4 border-[#003366] pb-3 lg:pb-4"
                      : "text-slate-500 font-bold uppercase tracking-wider border-b-4 border-slate-200 hover:text-[#001f4d] hover:border-slate-300 pb-3 lg:pb-4",
                  ].join(" ")}
                >
                  {eco.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Left — Text, Specs & CTA */}
              <div className="w-full lg:w-3/5 lg:p-8 xl:p-10 flex flex-col justify-center bg-white">

                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.35em] mb-2">
                  {activeEcosystem.industry}
                </p>

                <h3 className="text-xl lg:text-2xl font-black text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-2">
                  {activeEcosystem.label}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-4 hidden sm:block">
                  {activeEcosystem.desc}
                </p>

                <p className="text-[11px] font-bold text-[#001f4d] uppercase tracking-[0.22em] mb-2">
                  Typical Selection Checklist
                </p>

                {/* Spec list — limit to 4 items on mobile */}
                <div className="flex flex-col border-t border-slate-200">
                  {activeEcosystem.specs.slice(0, 4).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-row items-center py-2 border-b border-slate-100 last:border-0 gap-3"
                    >
                      <span className="w-1/3 text-[11px] font-bold text-slate-700 uppercase tracking-widest flex-shrink-0">
                        {spec.label}
                      </span>
                      <span className="flex-1 text-[13px] lg:text-[16px] font-normal text-[#003366]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={activeEcosystem.href} className="self-start">
                  <button className="mt-4 lg:mt-6 inline-flex items-center gap-3 bg-[#003366] text-white px-6 lg:px-8 py-2.5 lg:py-3 text-xs font-black uppercase tracking-widest hover:bg-[#001f4d] transition-colors rounded-none shadow-md hover:shadow-lg">
                    View {activeEcosystem.label} Solutions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

              </div>

              {/* Right — Image (hidden on mobile) */}
              <div className="hidden lg:flex w-full lg:w-2/5 bg-white p-6 lg:p-8 items-center">
                <div className="relative w-full h-full min-h-[220px] overflow-hidden">
                  <img
                    src={activeEcosystem.image}
                    alt={`${activeEcosystem.label} industrial cutting solutions`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent pointer-events-none" />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
