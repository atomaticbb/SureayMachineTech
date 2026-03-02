/*
 * TechnicalFAQ — Manufacturing Excellence image + FAQ accordion
 * bg-slate-50. Used on Home page.
 */

import FaqItem from "@/components/ui/FaqItem";
import { FAQ_ITEMS } from "@/data/homeData";

export default function TechnicalFAQ() {
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Left — Manufacturing Image */}
          <div className="relative overflow-hidden rounded-none shadow-xl h-[500px] lg:sticky lg:top-24 self-start">
            <img
              src="/images/process/cnc-precision-grinding.webp"
              alt="CNC precision manufacturing — in-house vacuum heat treatment and 5-axis grinding"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/75 via-[#001f4d]/40 to-[#001f4d]/30" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-[1.05] mb-3">
                Manufacturing<br />Excellence
              </h3>
              <div className="w-10 h-[2px] bg-slate-400 mb-4" />
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                In-house vacuum heat treatment, 5-axis CNC profile grinding, and 100% CMM-verified dimensional audit — certified to ISO&nbsp;9001:2015.
              </p>
            </div>
          </div>

          {/* Right — Technical FAQ */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm flex flex-col">
            <div className="px-8 pt-8 pb-6 border-b border-slate-100">
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
                Common Questions
              </p>
              <h3 className="font-black text-3xl md:text-4xl lg:text-[42px] text-[#001f4d] uppercase tracking-tight leading-[1.05]">
                Technical FAQ
              </h3>
              <div className="w-14 h-[3px] bg-slate-300 mt-6 mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed">
                Answers to the most common questions about our materials, tolerances, lead times, and custom capabilities.
              </p>
            </div>

            <div className="flex-1">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} index={i + 1} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
