import type { ImgHTMLAttributes } from "react";
import Link from "@/components/common/SiteLink";
import { useTranslation } from "@/lib/useTranslation";
import type { DispatchArticle } from "@/data/news";
import { articleDateISO, articleDateLabel } from "@/lib/articleDate";

export default function NewsArticleCard({
  article,
  variant = "feature",
  responsiveImage,
}: {
  article: DispatchArticle;
  variant?: "feature" | "listing" | "home";
  responsiveImage?: Pick<
    ImgHTMLAttributes<HTMLImageElement>,
    "srcSet" | "sizes" | "width" | "height"
  >;
}) {
  const { t, lang } = useTranslation();
  const Heading = variant === "listing" ? "h2" : "h3";

  return (
    <Link href={`/news/${article.id}`} asChild>
      <a lang="en" dir="ltr" aria-label={variant === "home" ? article.title : undefined} className="group flex h-full min-w-0 flex-col border border-[#E5E9EF] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[transform,translate,box-shadow,border-color] duration-300 ease-[cubic-bezier(.2,.6,.2,1)] md:pointer-fine:hover:border-[#CBD5E1] md:pointer-fine:hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] md:pointer-fine:motion-safe:hover:-translate-y-1">
        <div className="aspect-video overflow-hidden border-b border-slate-200 bg-slate-100">
          <img
            src={article.image}
            {...(article.imageSrcSet && {
              srcSet: article.imageSrcSet,
              sizes: "auto, (min-width: 1920px) 596px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
              width: article.imageWidth,
              height: article.imageHeight,
            })}
            {...responsiveImage}
            alt={article.imageAlt ?? article.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.2,.6,.2,1)] md:pointer-fine:motion-safe:group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <p className="flex items-baseline gap-2 whitespace-nowrap text-[14px] leading-5 text-slate-600 max-[360px]:gap-1.5 max-[360px]:text-[13px]">
            <span className="shrink-0 font-medium">{article.tag}</span>{" "}
            <span aria-hidden="true" className="shrink-0">
              ·
            </span>{" "}
            <time dateTime={articleDateISO(article.date)} className="shrink-0">
              {articleDateLabel(article.date)}
            </time>
          </p>
          <Heading className={`line-clamp-3 text-[18px] font-black leading-[1.2] tracking-tight text-[#001f4d] transition-colors duration-300 ease-[cubic-bezier(.2,.6,.2,1)] md:pointer-fine:group-hover:text-[#003366] ${variant === "feature" ? "" : "font-display"}`}>
            {article.title}
          </Heading>
          <p className="line-clamp-3 text-[16px] leading-[1.4] text-slate-700">
            {/* Keep each word intact when the browser adds the ellipsis. */}
            {article.excerpt.split(/(\s+)/).map((part, index) =>
              part.trim() ? (
                <span key={index} className="inline-block whitespace-nowrap">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>

          <span lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="mt-auto inline-flex items-center gap-1 self-start pt-1 text-[14px] font-semibold leading-5 text-[#001f4d]">
            {t("news.readMore")}{" "}
            <span
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.6,.2,1)] md:pointer-fine:motion-safe:group-hover:translate-x-1.5"
            >
              {lang === "ar" ? "<<" : ">>"}
            </span>
          </span>
        </div>
      </a>
    </Link>
  );
}
