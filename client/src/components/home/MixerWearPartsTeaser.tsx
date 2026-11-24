/**
 * MixerWearPartsTeaser — homepage section for the parallel Mixer Wear Parts
 * business line, shown right below "Markets We Serve". The header mirrors the
 * TabEcosystem section for consistency; the cards mirror the /mixer-wear-parts
 * "Two Plant Types" section (scene→products hover cross-fade, greyed down).
 */

import MixerCategoryCards from "@/components/product/MixerCategoryCards";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import { getMixerCategories } from "@/data/locales";

export default function MixerWearPartsTeaser() {
  const lang = useLang();
  const { t } = useTranslation();
  const mixerCategories = getMixerCategories(lang);

  return (
    <section
      aria-label={t("nav.mixerWearParts")}
      className={`home-section bg-slate-50 ${lang === "en" ? "" : "border-y border-slate-200"}`}
    >
      <div className={`home-content max-w-7xl mx-auto px-6 sm:px-8 ${lang === "en" ? "" : "py-16 lg:py-24"}`}>
        {/* Header — mirrors the TabEcosystem "Markets We Serve" section */}
        <div className={lang === "en" ? "mb-5 lg:mb-6" : "mb-10 lg:mb-14"}>
          {lang !== "en" && (
            <p className="text-muted-foreground font-bold text-xs tracking-[0.3em] mb-3">
              {t("mixer.teaser.eyebrow")}
            </p>
          )}
          <div className={lang === "en" ? "space-y-3" : "flex flex-col md:flex-row md:items-end md:justify-between gap-6"}>
            <h2 className="home-section-title font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05]">
              {lang === "en" ? t("mixer.hub.title") : (
                <>{t("mixer.hub.hero.titleLine1")}<br />{t("mixer.teaser.titleLine2")}</>
              )}
            </h2>
            <p className={`text-description text-muted-foreground leading-relaxed ${lang === "en" ? "max-w-prose" : "max-w-sm md:text-right"}`}>
              {t("mixer.teaser.lead")}
            </p>
          </div>
          {lang !== "en" && <div className="w-14 h-[3px] bg-slate-300 mt-8" />}
        </div>

        <MixerCategoryCards categories={mixerCategories} showDescriptions={lang !== "en"} />
      </div>
    </section>
  );
}
