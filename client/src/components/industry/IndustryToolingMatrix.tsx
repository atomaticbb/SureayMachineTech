import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductVariantCard from "@/components/product/ProductVariantCard";
import { getWebpImageSrcSet, type Blade } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";
import { SPRING_MECHANICAL } from "./types";

interface Props {
  blades: Blade[];
  catalogCards?: boolean;
}

export default function IndustryToolingMatrix({ blades, catalogCards }: Props) {
  const { t } = useTranslation();

  return (
    <section id="tooling-matrix" className="site-section bg-slate-50 py-12 lg:py-28">
      <div className="site-content max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="mb-6 font-black text-2xl md:text-3xl text-[#001f4d] tracking-tight leading-[1.0]">
          {t("industry.products.heading")}
        </h2>
        {catalogCards ? (
          <div className="mobile-product-grid grid auto-rows-fr grid-cols-2 gap-x-3 gap-y-4 md:gap-4 lg:grid-cols-4">
            {blades.map(blade => (
              <ProductVariantCard key={blade.id} blade={blade} sectorBadge={null} />
            ))}
          </div>
        ) : (
          <div className="mobile-product-grid grid grid-cols-2 gap-x-3 gap-y-4 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {blades.map(blade => (
              <motion.div
                key={blade.id}
                className="min-w-0"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_MECHANICAL}
              >
                <Link href={blade.link} className="group flex h-full flex-col border border-slate-200 bg-white hover:-translate-y-1 hover:-translate-x-1 transition-transform">
                  <div className="relative aspect-square bg-white overflow-hidden p-3 md:aspect-[16/10] md:bg-slate-50 md:p-5">
                    <img
                      src={blade.image}
                      srcSet={getWebpImageSrcSet(blade.image, blade.imageDimensions)}
                      sizes="(min-width: 1920px) 550px, (min-width: 1024px) calc((100vw - 144px) / 3 - 42px), (min-width: 768px) calc((100vw - 72px) / 2 - 42px), (min-width: 640px) calc(50vw - 56px), calc(50vw - 48px)"
                      width={blade.imageDimensions?.width}
                      height={blade.imageDimensions?.height}
                      alt={blade.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain mix-blend-multiply motion-safe:group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="hidden md:block absolute top-2 left-2 size-2 border-t border-l border-slate-300" />
                    <span className="hidden md:block absolute top-2 right-2 size-2 border-t border-r border-slate-300" />
                    <span className="hidden md:block absolute bottom-2 left-2 size-2 border-b border-l border-slate-300" />
                    <span className="hidden md:block absolute bottom-2 right-2 size-2 border-b border-r border-slate-300" />
                  </div>
                  <div className="flex flex-1 flex-col p-3 md:p-6">
                    <h3 className="mb-2 text-[16px] font-semibold leading-snug wrap-anywhere text-[#001f4d] md:mb-3 md:min-h-[42px] md:line-clamp-2 md:text-[20px] md:font-black md:leading-[1.15] md:tracking-[-0.03em]">
                      {blade.name}
                    </h3>
                    <p className="mb-3 flex-1 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground md:mb-6 md:text-[16px]">
                      {blade.description}
                    </p>
                    <span className="mt-auto flex min-w-0 items-center justify-between gap-1 border-t border-slate-100 pt-2 text-[14px] font-semibold text-[#001f4d] md:pt-4 md:text-[12px] md:font-black md:tracking-widest md:text-muted-foreground">
                      {t("industry.products.specSheet")}
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-slate-400 rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
