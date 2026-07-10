/*
 * TechnicalFAQ — Manufacturing Excellence image + FAQ accordion
 * bg-slate-50. Used on Home page.
 */

import FaqItem from "@/components/ui/FaqItem";
import { FAQ_ITEM_IDS } from "@/data/homeData";
import { useTranslation } from "@/lib/useTranslation";

export default function TechnicalFAQ() {
  const { t } = useTranslation();
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left — Manufacturing Image */}
          <div className="relative overflow-hidden border border-slate-200 h-[400px] lg:h-[440px] lg:sticky lg:top-20 self-start bg-slate-900">
            <img
              src="/images/common/rfq-qa.webp"
              alt={t("home.faq.imageAlt")}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/75 via-[#001f4d]/40 to-[#001f4d]/30" />

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
              <p className="text-[11px] font-bold  tracking-[0.3em] text-white/60 mb-3">
                {t("home.faq.imageEyebrow")}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-[1.05] mb-3">
                {t("home.faq.imageHeadline")}
              </h3>
              <div className="w-10 h-[2px] bg-slate-400 mb-4" />
              <p className="text-sm text-white/75 leading-relaxed max-w-md">
                {t("home.faq.imageBody")}
              </p>
            </div>
          </div>

          {/* Right — Technical FAQ */}
          <div className="bg-white border border-slate-200 rounded-none flex flex-col">
            <div className="px-6 lg:px-8 pt-6 lg:pt-7 pb-5 border-b border-slate-100">
              <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
                {t("home.faq.eyebrow")}
              </p>
              <h3 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05]">
                {t("home.faq.headline")}
              </h3>
              <div className="w-14 h-[3px] bg-slate-300 mt-5 mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                {t("home.faq.subtitle")}
              </p>
            </div>

            <div className="flex-1">
              {FAQ_ITEM_IDS.map((id, i) => (
                <FaqItem
                  key={id}
                  q={t(`home.faq.items.q${id}`)}
                  a={t(`home.faq.items.a${id}`)}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
