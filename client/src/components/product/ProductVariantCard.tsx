import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import type { Blade, BladeSectorType } from "@/data/blades";
import { getWebpImageSrcSet } from "@/data/blades";
import { localizedSizeRange } from "@/components/product-detail/bladeSpecs";
import { SECTOR_LABEL_KEY } from "@/data/blade-categories";
import { useTranslation } from "@/lib/useTranslation";

interface ProductVariantCardProps {
  blade: Blade;
  sectorBadge?: BladeSectorType | null;
  variant?: "default" | "compact";
  imageSizes?: string;
}

export default function ProductVariantCard({
  blade,
  sectorBadge = blade.sector,
  variant = "default",
  imageSizes,
}: ProductVariantCardProps) {
  const { t, lang } = useTranslation();
  const compact = variant === "compact";
  const srcSet = getWebpImageSrcSet(blade.image, blade.imageDimensions);
  const sizes =
    imageSizes ??
    (compact
      ? "(min-width: 1920px) 406px, (min-width: 1024px) calc((100vw - 128px) / 4 - 42px), (min-width: 768px) calc((100vw - 64px) / 2 - 42px), (min-width: 640px) calc(50vw - 56px), calc(50vw - 48px)"
      : "(min-width: 1920px) 398px, (min-width: 1024px) calc((100vw - 128px) / 4 - 50px), (min-width: 768px) calc((100vw - 64px) / 2 - 50px), (min-width: 640px) calc(50vw - 56px), calc(50vw - 48px)");
  const subtitle =
    localizedSizeRange(blade) ??
    (compact ? t("bladeUi.madeToDrawing") : undefined);

  return (
    <Link
      href={blade.link}
      aria-label={blade.categoryCardAnchorText}
      className={`blade-catalog-card group relative flex h-full min-w-0 border border-slate-200 bg-white ${
        compact
          ? "flex-row hover:border-[#001f4d] motion-safe:transition-colors md:flex-col"
          : "flex-col motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-[6px]"
      }`}
    >
      <div
        className={`blade-card-photo relative shrink-0 overflow-hidden bg-white ${
          compact ? "min-h-24 w-24 md:aspect-[16/9] md:w-full" : "aspect-[4/3]"
        }`}
      >
        <img
          src={blade.image}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={compact ? "" : blade.name}
          width={blade.imageDimensions?.width ?? 440}
          height={blade.imageDimensions?.height ?? 330}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.06] ${
            compact ? "p-2 sm:p-4 md:p-5" : "p-6"
          }`}
          onError={event => {
            if (!event.currentTarget.src.endsWith("/sureay.svg")) {
              event.currentTarget.srcset = "";
              event.currentTarget.src = "/sureay.svg";
            }
          }}
        />
      </div>

      <div
        className={`flex min-w-0 flex-1 flex-col gap-2 p-3 ${compact ? "md:p-4" : ""}`}
      >
        {!compact && sectorBadge && (
          <span className="blade-card-sector absolute top-2 left-2 max-w-[calc(100%-1rem)] bg-[#001f4d] px-2 py-1 text-[12px] font-semibold text-white">
            {t(SECTOR_LABEL_KEY[sectorBadge])}
          </span>
        )}
        <h3
          className={`font-semibold leading-snug text-[#001f4d] ${
            compact
              ? "text-[16px] md:text-[18px]"
              : "line-clamp-2 min-h-[2.75rem] text-[18px]"
          }`}
        >
          {blade.name}
        </h3>
        <div className="blade-card-dimensions min-h-5">
          {subtitle && (
            <p
              className={`text-[14px] text-muted-foreground ${compact ? "" : "line-clamp-1"}`}
              title={subtitle}
            >
              {subtitle}
            </p>
          )}
        </div>
        <span className="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold text-[#001f4d]">
          {compact && lang === "en" ? "View Details" : t("productCard.viewDetails")}
          <ChevronRight
            aria-hidden="true"
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
