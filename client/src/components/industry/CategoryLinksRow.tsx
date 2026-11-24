/*
 * CategoryLinksRow — links from an industry page to the relevant
 * category hub pages (/categories/:slug), additive alongside the
 * direct-to-product links in IndustryToolingMatrix. Category display
 * names are resolved from the localized category metadata so they
 * follow the active language.
 */

import { Link } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import { getCategoryBySlug } from "@/data/locales";

interface Props {
  slugs: string[];
}

export default function CategoryLinksRow({ slugs }: Props) {
  const lang = useLang();
  const { t } = useTranslation();
  if (lang === "en" || slugs.length === 0) return null;

  return (
    <section className="site-section bg-white border-b border-slate-200 py-10">
      <div className="site-content max-w-7xl mx-auto px-6 sm:px-8">
        <p className="font-bold text-[14px] text-muted-foreground tracking-[0.45em] mb-4">
          {t("industry.browseByCategory")}
        </p>
        <div className="flex flex-wrap gap-3">
          {slugs.map(slug => {
            const name = getCategoryBySlug(slug, lang)?.shortName ?? slug;
            return (
              <Link
                key={slug}
                href={`/categories/${slug}`}
                className="border-2 border-slate-200 px-6 py-2.5 text-[14px] font-black tracking-[0.2em] text-muted-foreground rounded-none transition-colors duration-200 hover:border-[#001f4d] hover:text-[#001f4d]"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
