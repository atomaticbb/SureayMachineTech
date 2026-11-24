import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ECOSYSTEMS } from "@/data/homeData";
import { useTranslation } from "@/lib/useTranslation";

export default function TabEcosystem() {
  const { t, lang } = useTranslation();
  return (
    <section className={`home-section bg-white py-16 lg:py-24 ${lang === "en" ? "" : "border-t border-slate-200"}`}>
      <div className="home-content max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className={lang === "en" ? "mb-5 lg:mb-6" : "mb-10 lg:mb-14"}>
          {lang !== "en" && (
            <p className="text-muted-foreground font-bold text-xs tracking-[0.3em] mb-3">
              {t("home.ecosystem.eyebrow")}
            </p>
          )}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="home-section-title font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05] max-w-xl">
              {lang !== "en" && <>{t("home.ecosystem.headlineLine1")}<br /></>}
              {t("home.ecosystem.headlineLine2")}
            </h2>
            {lang !== "en" && (
              <p className="text-description text-muted-foreground max-w-sm leading-relaxed md:text-right">
                {t("home.ecosystem.subtitle")}
              </p>
            )}
          </div>
          {lang !== "en" && <div className="w-14 h-[3px] bg-slate-300 mt-8" />}
        </div>

        {/* 2×3 grid — 6 industries, clean 16:9 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {ECOSYSTEMS.map(eco => {
            const label = t(`home.ecosystem.items.${eco.key}.label`);
            const industry = t(`home.ecosystem.items.${eco.key}.industry`);
            return (
              <Link key={eco.key} href={eco.href} asChild>
                <a className="relative overflow-hidden block group aspect-video rounded-none">
                  {/* Photo */}
                  <img
                    src={eco.image}
                    srcSet={`${eco.imageMobile ?? eco.image} 640w, ${eco.image} 1280w`}
                    sizes={lang === "en"
                      ? "(min-width: 1920px) 597px, (min-width: 1024px) calc((100vw - 128px) / 3), (min-width: 768px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 84px) / 2), calc((100vw - 60px) / 2)"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"}
                    alt={lang === "en" ? "" : industry}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />

                  {/* Gradient — lifts from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/90 via-[#001224]/30 to-transparent group-hover:from-[#001224]/75 transition-colors duration-300" />

                  {/* White reveal bar at bottom edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                  {/* Text */}
                  <div className={`relative z-10 flex h-full lg:p-6 ${lang === "en" ? "items-end justify-between gap-2 p-3 sm:p-4" : "flex-col justify-end p-4"}`}>
                    {lang !== "en" && (
                      <p className="font-mono text-[12px] lg:text-[14px] tracking-[0.28em] text-white/80 mb-2  leading-none">
                        {label}
                      </p>
                    )}
                    <p className={`text-white font-black lg:text-[22px] tracking-tight leading-tight ${lang === "en" ? "text-[16px] sm:text-base" : "text-base"}`}>
                      {industry}
                    </p>
                    {lang === "en" ? (
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-white" />
                    ) : (
                      <p className="font-mono text-[12px] lg:text-[14px] tracking-[0.22em] text-white font-bold mt-2.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out underline underline-offset-4 decoration-white/60 decoration-[1.5px]">
                        {t("home.ecosystem.explore")}
                      </p>
                    )}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
