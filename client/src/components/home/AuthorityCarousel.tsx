import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/homeData";
import { useTranslation } from "@/lib/useTranslation";
import { useLang } from "@/contexts/LangContext";
import { getBladeById } from "@/data/locales";
import { getWebpImageSrcSet } from "@/data/blades";

export default function AuthorityCarousel() {
  const { t } = useTranslation();
  const lang = useLang();
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastInteraction = useRef(0);
  const english = lang === "en";

  const getItemWidth = (): number => {
    const el = carouselRef.current;
    if (!el) return 232;
    const item = el.querySelector("[data-carousel-item]") as HTMLElement | null;
    if (!item) return 232;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    return item.getBoundingClientRect().width + gap;
  };

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    lastInteraction.current = Date.now();
    el.scrollBy({
      left: dir === "right" ? getItemWidth() : -getItemWidth(),
      behavior: "smooth",
    });
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      const itemWidth = getItemWidth();
      const mobilePair =
        english && window.matchMedia("(width < 768px)").matches;
      if (mobilePair && Date.now() - lastInteraction.current < 3000) return;
      const atEnd =
        el.scrollWidth - el.clientWidth - el.scrollLeft <=
        (mobilePair ? 1 : itemWidth);
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      el.scrollBy({ left: itemWidth, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(timer);
  }, [english]);

  return (
    <section className="home-section bg-white text-slate-900 py-12 lg:py-16">
      <div className="home-content max-w-7xl mx-auto px-6 sm:px-8">
        {/* Marquee statement — forced 2-line layout */}
        <div
          className={`text-center ${lang === "en" ? "mb-5 lg:mb-6" : "mb-10"}`}
        >
          <h2 className="home-section-title font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05] mx-auto">
            {t("home.authority.headlineLine1")}
            <br />
            {t("home.authority.headlineLine2")}
          </h2>
        </div>

        {/* Featured Products carousel */}
        <div className={lang === "en" ? undefined : "mb-10"}>
          <div
            className={
              english
                ? "grid grid-cols-[1fr_2.75rem_2.75rem_1fr] items-center gap-x-3 gap-y-1 md:flex md:gap-4"
                : "flex items-center gap-4"
            }
          >
            <button
              onClick={() => scrollCarousel("left")}
              aria-label={t("common.previous")}
              className="col-start-2 row-start-2 flex h-11 w-11 flex-shrink-0 items-center justify-center text-slate-600 hover:text-[#003366] transition-colors duration-200"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <div
              ref={carouselRef}
              onTouchEnd={() => {
                lastInteraction.current = Date.now();
              }}
              className={`flex min-w-0 flex-1 overflow-x-auto py-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${
                english
                  ? "col-span-full row-start-1 gap-3 md:gap-8 md:snap-none"
                  : "gap-0 sm:gap-8 sm:snap-none"
              }`}
              style={{ scrollbarWidth: "none" }}
            >
              {FEATURED_PRODUCTS.map((product, i) => {
                const id = product.href.replace(/^\/products\//, "");
                const blade = getBladeById(id, lang);
                const name = blade?.name ?? product.name;
                const alligator = id === "metal-shear-knives" ? blade : undefined;
                const image = alligator?.image ?? product.image;
                const dimensions =
                  alligator?.imageDimensions ?? product.imageDimensions;
                return (
                  <Link
                    href={product.href}
                    key={`${product.name}-${i}`}
                    data-carousel-item
                    className={`flex-shrink-0 flex flex-col items-center ${
                      english
                        ? "w-[calc(50%_-_0.375rem)] snap-start border border-slate-200 md:w-48 md:snap-center md:border-0"
                        : "w-full sm:w-48 snap-center"
                    }`}
                  >
                    <div className="flex flex-col items-center w-full group cursor-pointer">
                      <div
                        className={`overflow-hidden bg-slate-50 ${english ? "aspect-square w-full md:h-40 md:w-40" : "w-40 h-40"}`}
                      >
                        <img
                          src={image}
                          srcSet={
                            english
                              ? getWebpImageSrcSet(image, dimensions)
                              : undefined
                          }
                          sizes={
                            english
                              ? "(min-width: 768px) 160px, (min-width: 640px) calc((100vw - 84px) / 2 - 2px), calc((100vw - 60px) / 2 - 2px)"
                              : undefined
                          }
                          width={dimensions.width}
                          height={dimensions.height}
                          alt={name}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${english ? "object-contain md:object-cover" : "object-cover"}`}
                        />
                      </div>
                      <p
                        className={`text-center font-bold text-base text-[#003366] leading-snug group-hover:text-[#003366] transition-colors duration-200 ${english ? "break-words px-2 py-3 max-md:text-[16px] md:mt-4 md:p-0" : "mt-4"}`}
                      >
                        {name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => scrollCarousel("right")}
              aria-label={t("common.next")}
              className="col-start-3 row-start-2 flex h-11 w-11 flex-shrink-0 items-center justify-center text-slate-600 hover:text-[#003366] transition-colors duration-200"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
