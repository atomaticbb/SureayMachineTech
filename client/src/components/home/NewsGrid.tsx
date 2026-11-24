import NewsArticleCard from "@/components/common/NewsArticleCard";
import Link from "@/components/common/SiteLink";
import { ArrowRight } from "lucide-react";
import { SORTED_DISPATCHES } from "@/data/news";
import { useTranslation } from "@/lib/useTranslation";

// Latest 3 articles — single source of truth shared with /news page
const LATEST = SORTED_DISPATCHES.slice(0, 3);

export default function NewsGrid() {
  const { t, lang } = useTranslation();
  return (
    <section className={`home-section bg-white py-20 lg:py-24 ${lang === "en" ? "" : "border-t border-slate-200"}`}>
      <div className="home-content max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${lang === "en" ? "mb-5 lg:mb-6" : "mb-12"}`}>
          <div>
            {lang !== "en" && (
              <p className="text-muted-foreground font-bold text-xs  tracking-[0.3em] mb-3">
                {t("home.news.eyebrow")}
              </p>
            )}
            <h2 className="home-section-title font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05]">
              {t("home.news.headline")}
            </h2>
            {lang !== "en" && <div className="w-14 h-[3px] bg-slate-300 mt-6" />}
          </div>
          <Link href="/news">
            <span className="inline-flex items-center gap-2 text-xs font-black  tracking-widest text-[#003366] hover:text-[#001f4d] transition-colors border-b-2 border-[#003366] hover:border-[#001f4d] pb-0.5">
              {t("home.news.viewAll")}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {LATEST.map(article => (
            <NewsArticleCard key={article.id} article={article} variant={lang === "en" ? "home" : "feature"} />
          ))}
        </div>
      </div>
    </section>
  );
}
