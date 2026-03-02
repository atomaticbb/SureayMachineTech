import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/homeData";

export default function AuthorityCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const item = el.querySelector("[data-carousel-item]") as HTMLElement | null;
    const itemW = item ? item.offsetWidth + 32 : 232;
    if (dir === "right") {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: itemW, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft <= 5) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -itemW, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!carouselRef.current) return;
      const el = carouselRef.current;
      const item = el.querySelector("[data-carousel-item]") as HTMLElement | null;
      const itemW = item ? item.offsetWidth + 32 : 232;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: itemW, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Marquee statement */}
        <div className="text-center mb-10">
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-4xl mx-auto">
            The definitive OEM source for precision blades and cutting solutions.
          </h2>
        </div>

        {/* Featured Products carousel */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollCarousel("left")}
              aria-label="Previous"
              className="flex-shrink-0 text-slate-600 hover:text-[#003366] transition-colors duration-200"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <div
              ref={carouselRef}
              className="flex-1 flex gap-8 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {FEATURED_PRODUCTS.map((product) => (
                <Link href={product.href} key={product.name}>
                  <div
                    data-carousel-item
                    className="flex-shrink-0 flex flex-col items-center w-48 group cursor-pointer"
                  >
                    <div className="w-40 h-40 rounded-none overflow-hidden bg-slate-50 transition-all duration-300 shadow-sm group-hover:shadow-[0_8px_24px_-8px_rgba(0,51,102,0.25)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-4 text-center font-bold text-base text-[#003366] leading-snug group-hover:text-[#004488] transition-colors duration-200">
                      {product.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel("right")}
              aria-label="Next"
              className="flex-shrink-0 text-slate-600 hover:text-[#003366] transition-colors duration-200"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
