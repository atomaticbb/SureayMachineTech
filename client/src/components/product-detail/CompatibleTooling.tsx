/**
 * CompatibleTooling — ZONE 6: System Inventory Matrix.
 * Accepts blades: Blade[]. Compact 2/4-column card grid.
 */

import { Link } from "wouter";
import type { Blade } from "@/data/blades";
import { localizedSizeRange } from "./bladeSpecs";
import { getWebpImageSrcSet } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface CompatibleToolingProps {
  blades: Blade[];
  title?: string;
  subtitle?: string;
  responsiveImages?: boolean;
}

export default function CompatibleTooling({
  blades,
  title,
  responsiveImages = false,
}: CompatibleToolingProps) {
  const { t } = useTranslation();
  const display = blades.slice(0, 4);
  if (display.length === 0) return null;

  return (
    <section
      aria-label={title ?? t("bladeUi.related")}
      className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Header row */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="font-black text-3xl text-[#001f4d]  tracking-tight">
          {title ?? t("bladeUi.related")}
        </h2>
        <Link href="/products">
          <span className="font-mono text-[12px] text-slate-700  tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
            {t("productDetail.compatibleTooling.viewAll")} →
          </span>
        </Link>
      </div>

      {/* Compact inventory grid */}
      <div className="mobile-product-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        {display.map(related => {
          const dimensions = responsiveImages
            ? related.imageDimensions
            : undefined;
          const srcSet = getWebpImageSrcSet(related.image, dimensions);

          return (
            <Link key={related.id} href={related.link}>
              <div className="bg-white border border-slate-200 hover:border-[#001f4d] transition-colors duration-200 cursor-pointer group h-full flex flex-col">
                {/* Image viewport */}
                <div className="aspect-square bg-slate-50 flex items-center justify-center p-4 max-md:bg-white max-md:p-3">
                  <img
                    src={related.image}
                    srcSet={srcSet}
                    sizes={
                      srcSet
                        ? "(min-width: 768px) min(144px, calc(25vw - 58px)), (min-width: 640px) calc(50vw - 56px), calc(50vw - 48px)"
                        : undefined
                    }
                    alt={related.name}
                    className="max-h-36 w-auto mx-auto object-contain mix-blend-multiply max-md:h-full max-md:max-h-none max-md:w-full"
                    loading="lazy"
                    decoding="async"
                    width={dimensions?.width ?? 300}
                    height={dimensions?.height ?? 300}
                  />
                </div>

                {/* Metadata */}
                <div className="p-4 flex flex-col flex-grow justify-between max-md:p-3">
                  <div>
                    <p className="font-black text-sm text-[#001f4d] leading-tight mb-3 max-md:wrap-anywhere max-md:text-[16px] max-md:font-semibold max-md:leading-snug">
                      {related.name}
                    </p>
                  </div>
                  <p className="font-mono text-[14px] text-slate-700  tracking-widest mt-auto">
                    {localizedSizeRange(related) ?? t("bladeUi.madeToDrawing")}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
