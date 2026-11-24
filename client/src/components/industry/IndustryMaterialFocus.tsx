/*
 * IndustryMaterialFocus — Module 5
 * Physical catalog layout. Material sample cards.
 * All images: loading="lazy" decoding="async"
 * REF IDs and spec values: JetBrains Mono
 */

import type { IndustryMaterial } from "./types";
import { MONO } from "./types";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  materials: IndustryMaterial[];
}

export default function IndustryMaterialFocus({ materials }: Props) {
  const { t } = useTranslation();
  return (
    <section className="site-section bg-white border-b border-slate-200 py-20 lg:py-24">
      <div className="site-content max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-14">

          <h2 className="font-black text-2xl md:text-3xl text-[#001f4d]  tracking-tight leading-[1.0]">
            {t("industry.materials.heading")}
          </h2>
          <p className="text-description text-muted-foreground leading-relaxed max-w-3xl mt-5">
            {t("industry.materials.description")}
          </p>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {materials.map(mat => (
            <div
              key={mat.name}
              className="bg-white border border-slate-200 hover:border-[#001f4d] overflow-hidden flex flex-col transition-colors duration-150"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden flex-shrink-0">
                <img
                  src={mat.image}
                  alt={mat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Data tray */}
              <div className="p-8 flex flex-col flex-grow bg-white">

                <h3 className="font-black text-lg text-[#001f4d]  tracking-tight mb-4">
                  {mat.name}
                </h3>

                <div className="mt-auto">
                  <div className="flex items-baseline justify-between py-2.5 border-t border-slate-100">
                    <span className="text-[12px] font-bold text-muted-foreground  tracking-[0.25em]">
                      {t("industry.materials.abrasion")}
                    </span>
                    <span
                      style={MONO}
                      className="text-[16px] font-black text-[#001f4d] "
                    >
                      {mat.abrasion}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between py-2.5 border-t border-slate-100">
                    <span className="text-[12px] font-bold text-muted-foreground  tracking-[0.25em]">
                      {t("industry.materials.grade")}
                    </span>
                    <span
                      style={MONO}
                      className="text-[16px] font-black text-[#001f4d]"
                    >
                      {mat.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
