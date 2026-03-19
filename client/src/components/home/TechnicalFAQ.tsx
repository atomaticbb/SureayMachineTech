/*
 * TechnicalFAQ — Manufacturing Excellence image + FAQ accordion
 * bg-slate-50. Used on Home page.
 */

import FaqItem from "@/components/ui/FaqItem";
import { FAQ_ITEMS } from "@/data/homeData";

export default function TechnicalFAQ() {
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Left — Manufacturing Image */}
          <div className="relative overflow-hidden border border-slate-200 h-[400px] lg:h-[440px] lg:sticky lg:top-20 self-start bg-slate-900">
            <img
              src="/images/common/rfq-qa.webp"
              alt="CNC precision manufacturing — in-house vacuum heat treatment and 5-axis grinding"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/75 via-[#001f4d]/40 to-[#001f4d]/30" />

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-3">
                RFQ Support
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-[1.05] mb-3">
                Questions Teams Ask Before Sending A Blade Inquiry
              </h3>
              <div className="w-10 h-[2px] bg-slate-400 mb-4" />
              <p className="text-sm text-white/75 leading-relaxed max-w-md">
                Most RFQs start with the same practical questions: what information to send, how material is selected, what tolerance can be held, and how quickly a custom order can move.
              </p>
            </div>
          </div>

          {/* Right — Technical FAQ */}
          <div className="bg-white border border-slate-200 rounded-none flex flex-col">
            <div className="px-6 lg:px-8 pt-6 lg:pt-7 pb-5 border-b border-slate-100">
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
                Common Questions
              </p>
              <h3 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05]">
                RFQ Questions
              </h3>
              <div className="w-14 h-[3px] bg-slate-300 mt-5 mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                Straight answers to the questions that usually come up before a drawing is sent, a tolerance is confirmed, or a custom quotation is requested.
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
