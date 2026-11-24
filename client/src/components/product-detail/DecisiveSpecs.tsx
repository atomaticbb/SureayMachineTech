/**
 * DecisiveSpecs — Decisive Specifications table.
 * Two-column layout: product image on the left, specs table on the right.
 * Header and footnote sit outside the flex row so the image height
 * matches the table height exactly.
 */

import type { CSSProperties } from "react";
import { TableScrollRegion } from "@/components/ui/table";
import type { Blade } from "@/data/blades";
import { getWebpImageSrcSet } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface DecisiveSpecsProps {
  blade: Blade;
  /** Override the spec-table image. Blades default to their dedicated spec
   *  image (last gallery item); mixer parts pass their primary image so the
   *  spec image always belongs to the current product. */
  specImage?: string;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function DecisiveSpecs({
  blade,
  specImage,
}: DecisiveSpecsProps) {
  const { t, lang } = useTranslation();
  const catalogLayout = lang === "en" || !blade.link.startsWith("/mixer-wear-parts/");
  const detailLayout = blade.detailLayout;
  const specs =
    detailLayout?.technicalSpecs ??
    (detailLayout
      ? [{ label: t("bladeUi.sizes"), value: detailLayout.sizeRange }, ...blade.specs]
      : blade.specs);
  if (specs.length === 0) return null;

  const title = detailLayout
    ? t("bladeUi.technicalSpecifications")
    : t("productDetail.decisiveSpecs.headline");
  const specificationImage = detailLayout?.specificationImage;
  const panelImage =
    specificationImage?.src ??
    specImage ??
    blade.gallery?.at(-1) ??
    blade.image;
  const panelAlt =
    specificationImage?.alt ??
    ((!specImage && blade.galleryAlts?.at(-1)) || blade.fullName || blade.name);
  const panelDimensions =
    specificationImage || !specImage
      ? blade.specificationImageDimensions
      : undefined;
  const panelSrcSet = getWebpImageSrcSet(panelImage, panelDimensions);
  const description =
    catalogLayout
      ? [
          blade.introNote,
          !detailLayout
            ? blade.id === "granulator-blades" || blade.id === "special-shaped-blades"
              ? t("bladeUi.manufacturingNote")
              : t("productDetail.decisiveSpecs.footnote")
            : undefined,
        ].filter(Boolean).join(" ")
      : undefined;

  return (
    <section
      aria-label={detailLayout ? undefined : title}
      aria-labelledby={
        detailLayout ? "product-technical-specifications-heading" : undefined
      }
      className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section header — outside the flex row */}
      {!catalogLayout && (
        <p
          className={`font-mono text-[12px] text-slate-700 mb-3 ${detailLayout ? "tracking-normal" : "tracking-widest"}`}
        >
          {t("productDetail.decisiveSpecs.eyebrow")}
        </p>
      )}
      <h2
        id={
          detailLayout ? "product-technical-specifications-heading" : undefined
        }
        className="font-black text-4xl text-[#001f4d]  tracking-tight mb-10"
      >
        {title}
      </h2>

      {description && (
        <p className="mb-8 max-w-[80ch] text-description leading-relaxed text-slate-600">
          {description}
        </p>
      )}

      {/* Flex row: items-start — each column its own height, no cross-stretch */}
      <div
        className={`flex flex-col items-start lg:flex-row ${detailLayout ? "gap-6 xl:gap-8" : "gap-10 xl:gap-14"}`}
      >
        {/* Left — technical specifications */}
        <div
          className={
            detailLayout
              ? "w-full min-w-0 lg:flex-1"
              : "w-full flex-shrink-0 lg:w-[500px] xl:w-[540px]"
          }
        >
          {detailLayout ? (
            <ul className="list-disc space-y-3 ps-5 text-[18px] leading-[1.6] text-black">
              {specs.map(spec => (
                <li key={spec.label}>
                  <strong className="font-bold tracking-wide">
                    {spec.label}:
                  </strong>{" "}
                  {spec.value}
                </li>
              ))}
            </ul>
          ) : (
            <TableScrollRegion
              label={title}
              pinFirstColumn={catalogLayout}
              className="h-full border border-t-2 border-slate-300 border-t-[#001f4d]"
            >
              <table className="w-full text-left border-collapse">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-200 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3 border-r border-slate-200 font-mono text-[14px] text-slate-600 font-semibold tracking-wider w-[36%] lg:w-[28%]"
                      >
                        {spec.label}
                      </th>
                      <td className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScrollRegion>
          )}
        </div>

        {/* Right — product image, fixed aspect ratio */}
        <div className={`flex-1 min-w-0 ${detailLayout ? "w-full" : ""}`}>
          <div
            className={
              detailLayout
                ? "w-full"
                : "w-full aspect-[4/3] border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
            }
            style={detailLayout ? undefined : DOT_GRID_STYLE}
          >
            <img
              src={panelImage}
              srcSet={
                panelSrcSet ??
                (specificationImage
                  ? `${panelImage.replace(/\.webp$/, "-640w.webp")} 640w, ${panelImage} 800w`
                  : undefined)
              }
              sizes={
                panelSrcSet || specificationImage
                  ? "(min-width: 1024px) 480px, 288px"
                  : undefined
              }
              alt={panelAlt}
              className={
                detailLayout
                  ? "product-detail-image mx-auto"
                  : "w-full h-full object-contain p-4 mix-blend-multiply"
              }
              loading="lazy"
              decoding="async"
              width={panelDimensions?.width ?? 800}
              height={panelDimensions?.height ?? (detailLayout ? 800 : 600)}
            />
          </div>
        </div>
      </div>

      {/* Footnote — outside the flex row */}
      {!catalogLayout && !detailLayout && (
        <p className="font-mono text-[14px] text-muted-foreground  tracking-widest mt-4">
          ■ {t("productDetail.decisiveSpecs.footnote")}
        </p>
      )}
    </section>
  );
}
