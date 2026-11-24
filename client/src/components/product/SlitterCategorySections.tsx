import { useEffect } from "react";
import NewsArticleCard from "@/components/common/NewsArticleCard";
import type { BladeCategoryMeta } from "@/data/blade-categories";
import type { Blade } from "@/data/blades";
import { getWebpImageSrcSet } from "@/data/blades";
import { getDispatchById } from "@/data/news";
import { useTranslation } from "@/lib/useTranslation";
import ProductVariantCard from "./ProductVariantCard";

const selectionGuideArticles = [
  {
    id: "rotary-slitter-knives-overspeed-ratio",
    width: 1672,
    height: 941,
    smallerWidths: [400, 800],
  },
  {
    id: "lithium-battery-electrode-slitting-knives-guide",
    width: 800,
    height: 550,
    smallerWidths: [400],
  },
  {
    id: "groove-bottom-knives-vs-spacer-stacks",
    width: 1600,
    height: 900,
    smallerWidths: [400, 640, 800],
  },
].flatMap(({ id, ...dimensions }) => {
  const article = getDispatchById(id);
  return article ? [{ article, dimensions }] : [];
});
const selectionGuideImageSizes = [
  "(min-width: 1920px) 596px",
  "(min-width: 1024px) calc((100vw - 128px) / 3 - 2px)",
  "(min-width: 768px) calc((100vw - 64px) / 2 - 2px)",
  "(min-width: 640px) calc(100vw - 50px)",
  "calc(100vw - 34px)",
].join(", ");

function normalizeBrand(brand: string) {
  if (/^bandit(?: industries)?$/i.test(brand)) return "Bandit";
  if (/^dienes$/i.test(brand)) return "DIENES";
  if (/^(goebel|göbel)$/i.test(brand)) return "GOEBEL";
  if (/^(weima|untha|zerma)$/i.test(brand)) return brand.toUpperCase();
  return brand;
}

export default function SlitterCategorySections({
  groups,
  machineBrands,
  selectionGuide,
  compatibilityPrompt,
  idPrefix = "slitter",
  legacyAnchor,
}: {
  groups: { id: string; products: Blade[] }[];
  machineBrands: string[];
  selectionGuide?: BladeCategoryMeta["selectionGuide"];
  compatibilityPrompt?: string;
  idPrefix?: string;
  legacyAnchor?: string;
}) {
  const { t } = useTranslation();
  // The product anchors exist only after this lazy-loaded section has mounted.
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [idPrefix]);
  const articles = selectionGuide
    ? selectionGuide.articles.flatMap(({ id, image, ...dimensions }) => {
        const article = getDispatchById(id);
        return article
          ? [{ article: image ? { ...article, image } : article, dimensions }]
          : [];
      })
    : selectionGuideArticles;
  const brands = Array.from(
    new Map(
      machineBrands
        .filter(brand => !/^pneumatic$/i.test(brand))
        .map(normalizeBrand)
        .map(brand => [brand.toLowerCase(), brand])
    ).values()
  );

  return (
    <div
      id={legacyAnchor}
      className="site-content mx-auto max-w-7xl scroll-mt-24 px-4 pb-12 sm:px-8 lg:pb-16"
    >
      <div className="pt-8 space-y-14 lg:pt-12 lg:space-y-16">
        <section id="products" aria-label={t("nav.products")} className="site-section scroll-mt-24">
          <div className="mobile-product-grid grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {groups
              .flatMap(group => group.products)
              .map(blade => (
                <div
                  key={blade.id}
                  id={
                    groups.find(
                      group =>
                        group.id !== "products" &&
                        group.products[0]?.id === blade.id
                    )?.id
                  }
                  className="min-w-0 scroll-mt-24"
                >
                  <ProductVariantCard blade={blade} variant="compact" />
                </div>
              ))}
          </div>
        </section>

        {articles.length > 0 && (
          <section aria-labelledby={`${idPrefix}-selection-heading`} className="site-section">
            <h2
              id={`${idPrefix}-selection-heading`}
              className="mb-5 text-[26px] font-black leading-tight tracking-tight text-[#001f4d] sm:text-[38px]"
            >
              {selectionGuide?.title ?? t("bladeUi.slitterGuide")}
            </h2>
            <div lang="en" dir="ltr" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {articles.map(({ article, dimensions }) => (
                <NewsArticleCard
                  key={article.id}
                  article={article}
                  responsiveImage={{
                    srcSet: getWebpImageSrcSet(article.image, dimensions),
                    sizes: selectionGuideImageSizes,
                    width: dimensions.width,
                    height: dimensions.height,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {brands.length > 0 && (
          <section
            aria-labelledby={`${idPrefix}-compatibility-heading`}
            className="site-section grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
          >
            <div>
              <h2
                id={`${idPrefix}-compatibility-heading`}
                className="text-[26px] font-black leading-tight tracking-tight text-[#001f4d] sm:text-[38px]"
              >
                {t("bladeUi.compatibility")}
              </h2>
              <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-slate-700">
                {t("bladeUi.listedBrands")}{" "}
                {compatibilityPrompt ?? t("bladeUi.holderPrompt")}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex min-h-11 items-center border border-[#001f4d] px-4 text-sm font-semibold text-[#001f4d] transition-colors hover:bg-[#001f4d] hover:text-white"
              >
                {t("bladeUi.checkFit")}
              </a>
            </div>
            <div className="self-center">
              <ul
                className="flex flex-wrap gap-2"
                aria-label={t("categoryPage.oemCompatibility")}
              >
                {brands.map(brand => (
                  <li
                    key={brand}
                    className="max-w-full border border-slate-200 bg-slate-50 px-3 py-2 text-[16px] font-bold text-[#001f4d] sm:px-4"
                  >
                    {brand}
                    <sup className="ml-0.5 text-[12px] leading-none">®</sup>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
