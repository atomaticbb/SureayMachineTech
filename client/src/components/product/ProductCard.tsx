/**
 * ProductCard — blade product card in four variants:
 *   'grid'    → vertical card (large image + title + CTA) for 2-col grid
 *   'compact' → shared catalogue card
 *   'list'    → compact horizontal row used in BladeListPage sidebar layout
 *   'related' → compact horizontal row used in Related Blades section of BladeDetail
 */

import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import {
  getWebpImageSrcSet,
  type Blade,
  type BladeSectorType,
} from "@/data/blades";
import { SECTOR_LABEL } from "@/data/blade-categories";
import ProductVariantCard from "./ProductVariantCard";
import { useTranslation } from "@/lib/useTranslation";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  blade: Blade;
  variant?: "grid" | "compact" | "list" | "related";
  sectorBadge?: BladeSectorType;
}

const mobileImageSizes =
  "(min-width: 640px) calc(50vw - 56px), calc(50vw - 48px)";

export default function ProductCard({
  blade,
  variant = "list",
  sectorBadge,
}: ProductCardProps) {
  const { t, lang } = useTranslation();
  const srcSet = getWebpImageSrcSet(blade.image, blade.imageDimensions);
  const english = lang === "en";

  // ─── Grid variant: large image + title + CTA ─────────────────────────────
  if (variant === "grid") {
    return (
      <Link href={blade.link} asChild>
        <a className="group flex flex-col bg-white border border-slate-200 hover:border-[#65AAD6]/50 transition-colors duration-200 cursor-pointer h-full">
          {/* Large image */}
          <div
            className={cn(
              "relative aspect-[4/3] bg-slate-50 overflow-hidden flex-shrink-0",
              english && "max-md:aspect-square max-md:bg-white"
            )}
          >
            <img
              src={blade.image}
              srcSet={srcSet}
              sizes={
                lang === "en"
                  ? `(min-width: 1920px) 532px, (min-width: 1024px) calc((100vw - 128px) / 3 - 66px), (min-width: 768px) calc((100vw - 72px) / 2 - 66px), ${mobileImageSizes}`
                  : "(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 360px"
              }
              alt={blade.name}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width={blade.imageDimensions?.width ?? 400}
              height={blade.imageDimensions?.height ?? 300}
              className={cn(
                "absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500",
                english && "max-md:p-3"
              )}
              onError={e => {
                // Clear srcSet first — a srcset candidate still wins over src,
                // so setting src alone leaves the broken candidate in place.
                e.currentTarget.srcset = "";
                e.currentTarget.src = "/sureay.svg";
              }}
            />
            {sectorBadge && (
              <span className="absolute top-3 right-3 bg-[#001f4d] text-white text-[12px] font-black  px-2 py-1 tracking-wider">
                {SECTOR_LABEL[sectorBadge]}
              </span>
            )}
            {lang !== "en" && (
              <span className="absolute bottom-3 left-3 bg-white/80 text-[#001f4d] text-[12px] font-black  px-2 py-1 tracking-wider backdrop-blur-sm">
                {t("productCard.oemAvailable")}
              </span>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              "p-6 lg:p-8 flex flex-col flex-1 border-t border-slate-100 group-hover:border-[#65AAD6]/20 transition-colors",
              english && "max-md:p-3"
            )}
          >
            {lang !== "en" && (
              <p className="text-[12px] font-black text-muted-foreground  tracking-widest mb-2">
                {blade.categoryDisplay}
              </p>
            )}
            <h3
              className={cn(
                "text-xl lg:text-2xl font-black text-[#001f4d] group-hover:text-[#003366] tracking-tight leading-tight min-h-[6rem] lg:min-h-[7.2rem] mb-6 transition-colors",
                english
                  ? "md:line-clamp-4 max-md:min-h-0 max-md:mb-2 max-md:text-[16px] max-md:font-semibold max-md:leading-snug max-md:break-words"
                  : "line-clamp-4"
              )}
            >
              {english && <span className="md:hidden">{blade.name}</span>}
              <span className={english ? "max-md:hidden" : undefined}>
                {blade.fullName || blade.name}
              </span>
            </h3>
            <div className="mt-auto">
              <div
                className={cn(
                  "inline-flex items-center gap-2 border border-[#001f4d] bg-white group-hover:bg-[#001f4d] text-[#001f4d] group-hover:text-white text-[14px] font-black tracking-[0.18em] px-5 py-3 transition-colors duration-200 self-start",
                  english && "max-md:gap-1 max-md:border-0 max-md:p-0 max-md:font-semibold max-md:tracking-normal max-md:group-hover:bg-white max-md:group-hover:text-[#001f4d]"
                )}
              >
                {t("productCard.viewDetails")}
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <ProductVariantCard
        blade={blade}
        sectorBadge={sectorBadge}
        imageSizes={
          lang === "en"
            ? `(min-width: 1920px) 462px, (min-width: 1024px) calc((100vw - 384px) / 3 - 50px), (min-width: 768px) calc((100vw - 64px) / 2 - 50px), ${mobileImageSizes}`
            : undefined
        }
      />
    );
  }

  // ─── Related variant: compact horizontal row ──────────────────────────────
  if (variant === "related") {
    return (
      <Link key={blade.id} href={blade.link} asChild>
        <a
          className={cn(
            "group flex gap-4 bg-white border border-slate-200 hover:border-[#001f4d] overflow-hidden transition-colors duration-200 p-4 items-center",
            english && "max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:p-0"
          )}
        >
          <div
            className={cn(
              "w-20 h-20 flex-shrink-0 bg-slate-50 overflow-hidden",
              english && "max-md:aspect-square max-md:h-auto max-md:w-full max-md:bg-white"
            )}
          >
            <img
              src={blade.image}
              srcSet={srcSet}
              sizes={english ? `(min-width: 768px) 72px, ${mobileImageSizes}` : "80px"}
              alt={blade.name}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width={blade.imageDimensions?.width ?? 80}
              height={blade.imageDimensions?.height ?? 80}
              className={cn(
                "w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300",
                english && "max-md:p-3"
              )}
              onError={e => {
                // Clear srcSet first — a srcset candidate still wins over src,
                // so setting src alone leaves the broken candidate in place.
                e.currentTarget.srcset = "";
                e.currentTarget.src = "/sureay.svg";
              }}
            />
          </div>
          <div
            className={cn(
              "flex-1 min-w-0",
              english && "max-md:flex max-md:flex-col max-md:gap-2 max-md:border-t max-md:border-slate-100 max-md:p-3"
            )}
          >
            {lang !== "en" && (
              <p className="text-[12px] font-black text-muted-foreground  tracking-widest mb-0.5">
                {blade.categoryDisplay}
              </p>
            )}
            <h3
              className={cn(
                "text-sm font-bold text-slate-900 group-hover:text-[#001f4d] transition-colors leading-snug mb-1",
                english && "max-md:mb-0 max-md:break-words max-md:text-[16px] max-md:font-semibold max-md:text-[#001f4d]"
              )}
            >
              {blade.name}
            </h3>
            <p
              className={cn(
                "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
                english && "max-md:hidden"
              )}
            >
              {blade.description}
            </p>
            {english && (
              <span className="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold text-[#001f4d] md:hidden">
                {t("productCard.viewDetails")}
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </span>
            )}
          </div>
          <svg
            className={cn(
              "w-4 h-4 text-muted-foreground group-hover:text-[#001f4d] flex-shrink-0 group-hover:translate-x-1 transition-all",
              english && "max-md:hidden"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </Link>
    );
  }

  // ─── List variant: horizontal row (image left, specs right) ──────────────
  return (
    <Link key={blade.id} href={blade.link} asChild>
      <a className="group block bg-white border border-slate-200 hover:border-[#65AAD6]/50 transition-colors duration-300 cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
          {/* Left: Image */}
          <div
            className="relative bg-slate-50 overflow-hidden"
            style={{ minHeight: "220px" }}
          >
            <img
              src={blade.image}
              srcSet={srcSet}
              sizes="(max-width: 768px) 100vw, 300px"
              alt={blade.name}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width={300}
              height={220}
              className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              style={{ minHeight: "220px" }}
              onError={e => {
                // Clear srcSet first — a srcset candidate still wins over src,
                // so setting src alone leaves the broken candidate in place.
                e.currentTarget.srcset = "";
                e.currentTarget.src = "/sureay.svg";
              }}
            />
            {blade.badge && (
              <span className="absolute top-3 left-3 bg-[#001f4d] text-white text-[12px] font-black  px-2 py-1 tracking-wider">
                {blade.badge}
              </span>
            )}
            {lang !== "en" && (
              <span className="absolute bottom-3 left-3 bg-white/80 text-[#001f4d] text-[12px] font-black  px-2 py-1 tracking-wider backdrop-blur-sm">
                {t("productCard.oemAvailable")}
              </span>
            )}
          </div>

          {/* Right: Data, Specs */}
          <div className="p-6 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 group-hover:border-[#65AAD6]/20 transition-colors">
            <div>
              {lang !== "en" && (
                <p className="text-[12px] font-black text-muted-foreground  tracking-widest mb-1">
                  {blade.categoryDisplay}
                </p>
              )}
              <h3 className="text-xl font-bold text-[#001f4d] group-hover:text-[#003366] leading-snug mb-2 transition-colors">
                {blade.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                {blade.description}
              </p>
            </div>

            {/* Specs Grid — 3 items: material / hardness / application first */}
            {blade.specs &&
              blade.specs.length > 0 &&
              (() => {
                const PRIORITY = ["material", "hardness", "application"];
                const sorted = [
                  ...PRIORITY.map(key =>
                    blade.specs!.find(s => s.label.toLowerCase().includes(key))
                  ).filter(Boolean),
                  ...blade.specs.filter(
                    s =>
                      !PRIORITY.some(key => s.label.toLowerCase().includes(key))
                  ),
                ].slice(0, 3) as { label: string; value: string }[];

                return (
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3 pt-4 border-t border-slate-100">
                    {sorted.map((spec, i) => (
                      <div key={i}>
                        <p className="text-[12px] text-muted-foreground  tracking-widest leading-none mb-1">
                          {spec.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}

            {/* Click affordance arrow */}
            <div className="flex justify-end">
              <svg
                className="w-5 h-5 text-slate-300 group-hover:text-[#65AAD6] group-hover:translate-x-1 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
