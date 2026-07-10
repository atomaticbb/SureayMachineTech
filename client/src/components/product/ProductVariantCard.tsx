/**
 * ProductVariantCard — large grid card used on Category Hub pages
 * (/categories/:slug). Whole card is a "stretched link" to the variant
 * detail page; the CTA button sits above it (its own z-index) so it can
 * trigger the RFQ prefill instead of navigating.
 */

import { Link } from "wouter";
import { type Blade, type BladeSpec, type BladeSectorType } from "@/data/blades";
import { SECTOR_LABEL } from "@/data/blade-categories";
import { useTranslation } from "@/lib/useTranslation";

interface ProductVariantCardProps {
  blade: Blade;
  sectorBadge?: BladeSectorType;
}

/** Picks the two most relevant spec rows (material first, then a
 * dimension-ish spec) straight from the blade's own data — keeps the card
 * accurate for any category without hand-authoring a separate lookup table. */
function getCardSpecs(blade: Blade): BladeSpec[] {
  const material = blade.specs.find(s => /material/i.test(s.label));
  const dimensionish = blade.specs.find(
    s =>
      s !== material &&
      /diameter|dimension|length|size|capacity|thickness/i.test(s.label)
  );
  const picks = [material, dimensionish].filter(
    (s): s is BladeSpec => Boolean(s)
  );
  for (const s of blade.specs) {
    if (picks.length >= 2) break;
    if (!picks.includes(s)) picks.push(s);
  }
  return picks.slice(0, 2);
}

function getResponsiveImage(bladeImage: string): {
  src: string;
  srcSet?: string;
} {
  if (!bladeImage.endsWith(".webp")) {
    return { src: bladeImage };
  }

  const mobile = bladeImage.replace(/\.webp$/i, "-640w.webp");
  return {
    src: bladeImage,
    srcSet: `${mobile} 640w, ${bladeImage} 1280w`,
  };
}

function handleRequestQuote(
  e: { preventDefault: () => void; stopPropagation: () => void },
  blade: Blade
) {
  e.preventDefault();
  e.stopPropagation();
  const textarea = document.getElementById(
    "rfq-message"
  ) as HTMLTextAreaElement | null;
  if (textarea && !textarea.value.trim()) {
    textarea.value = `RFQ: ${blade.fullName || blade.name} — `;
  }
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, 450);
}

export default function ProductVariantCard({
  blade,
  sectorBadge,
}: ProductVariantCardProps) {
  const { t } = useTranslation();
  const responsiveImage = getResponsiveImage(blade.image);
  const cardSpecs = getCardSpecs(blade);

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 hover:border-[#001f4d] hover:shadow-md transition-all duration-200 h-full">
      <Link
        href={blade.link}
        className="absolute inset-0 z-[1]"
        aria-label={blade.name}
      />

      <div className="relative aspect-[4/3] bg-white overflow-hidden flex-shrink-0">
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 440px"
          alt={blade.name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={440}
          height={385}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          onError={e => {
            e.currentTarget.src = "/images/products/product.webp";
          }}
        />
        {sectorBadge && (
          <span className="absolute top-2 left-2 bg-[#001f4d] text-white text-[10px] font-black px-1.5 py-0.5 tracking-wider">
            {SECTOR_LABEL[sectorBadge]}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-base lg:text-lg font-semibold text-[#001f4d] leading-snug line-clamp-2">
          {blade.name}
        </h3>

        <div className="border-t border-slate-200 my-2" />

        {cardSpecs.map(spec => (
          <p key={spec.label} className="text-sm text-slate-600 leading-snug">
            {spec.value}
          </p>
        ))}

        <div className="border-t border-slate-200 my-2" />

        <p className="text-xs text-slate-400 mb-2">
          {t("productCard.madeToOrder")}
        </p>

        <button
          type="button"
          onClick={e => handleRequestQuote(e, blade)}
          className="relative z-10 mt-auto w-full inline-flex items-center justify-center gap-2 border border-[#001f4d] bg-white hover:bg-[#001f4d] text-[#001f4d] hover:text-white text-[11px] font-black tracking-[0.18em] py-3 transition-colors duration-200"
        >
          {t("cta.requestQuote")} →
        </button>
      </div>
    </div>
  );
}
