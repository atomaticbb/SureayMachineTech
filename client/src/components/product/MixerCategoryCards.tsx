import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { MixerCategory } from "@/data/mixerParts";
import { useTranslation } from "@/lib/useTranslation";

export default function MixerCategoryCards({
  categories,
  showDescriptions = true,
}: {
  categories: MixerCategory[];
  showDescriptions?: boolean;
}) {
  const { lang, t } = useTranslation();

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${lang === "en" ? "md:grid-cols-2" : "lg:grid-cols-2"}`}
    >
      {categories.map(cat => (
        <Link key={cat.id} href={cat.link} asChild>
          <a
            aria-label={lang === "en" ? cat.name : undefined}
            className="group block overflow-hidden bg-white border border-slate-200 hover:border-[#001f4d] shadow-none transition-all duration-200"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              {/* Default — plant scene */}
              <img
                src={`/images/mixer-parts/hero/${cat.id}-scene.webp`}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                loading="lazy"
                decoding="async"
              />
              {/* On hover — the parts in this category */}
              <img
                src={`/images/mixer-parts/hero/${cat.id}-products.webp`}
                alt={t("mixer.hub.cardPartsAlt").replace("{{name}}", cat.name)}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
              {/* Grey overlay — tone down the bright plant photos */}
              <div
                className="absolute inset-0 bg-slate-900/25 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                aria-hidden="true"
              />
            </div>
            <div
              className={`flex justify-between gap-4 border-t border-slate-200 ${lang === "en" ? "items-end p-4" : "items-center p-5 lg:p-6"}`}
            >
              <div className="min-w-0">
                <h3
                  className={`font-black text-lg lg:text-xl text-[#001f4d] tracking-tight ${lang === "en" ? "leading-tight" : "truncate"}`}
                >
                  {cat.name}
                </h3>
                {showDescriptions && (
                  <p
                    className={`mt-0.5 text-[16px] leading-snug text-muted-foreground ${lang === "en" ? "" : "line-clamp-1"}`}
                  >
                    {cat.description}
                  </p>
                )}
              </div>
              {lang === "en" ? (
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#001f4d]"
                />
              ) : (
                <span className="inline-flex shrink-0 items-center gap-2 text-[14px] font-black tracking-[0.18em] text-[#001f4d] group-hover:gap-3 transition-all">
                  {t("mixer.hub.viewParts")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
