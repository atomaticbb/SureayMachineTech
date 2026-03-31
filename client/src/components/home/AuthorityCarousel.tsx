import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/homeData";

// Triple the products for seamless infinite scroll
const LOOP_ITEMS = [
  ...FEATURED_PRODUCTS,
  ...FEATURED_PRODUCTS,
  ...FEATURED_PRODUCTS,
];

export default function AuthorityCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normCooldownRef = useRef(false);

  const getItemWidth = (): number => {
    const el = carouselRef.current;
    if (!el) return 232;
    const item = el.querySelector("[data-carousel-item]") as HTMLElement | null;
    return item ? item.offsetWidth + 32 : 232; // offsetWidth + gap-8 (32px)
  };

  // Teleport to middle set when reaching boundaries (invisible to user)
  const normalise = () => {
    const el = carouselRef.current;
    if (!el) return;
    const oneSetW = el.scrollWidth / 3;

    let jumped = false;
    if (el.scrollLeft >= oneSetW * 2) {
      // Scrolled into set 3, teleport to set 2
      el.scrollLeft -= oneSetW;
      jumped = true;
    } else if (el.scrollLeft < oneSetW - 2) {
      // Scrolled into set 1, teleport to set 2
      el.scrollLeft += oneSetW;
      jumped = true;
    }

    if (jumped) {
      normCooldownRef.current = true;
      setTimeout(() => {
        normCooldownRef.current = false;
      }, 100);
    }
  };

  // Detect when scrolling has stopped (50ms idle), then normalise
  const handleScroll = () => {
    if (normCooldownRef.current) return;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(normalise, 50);
  };

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "right" ? getItemWidth() : -getItemWidth(),
      behavior: "smooth",
    });
  };

  // Initialize scroll to middle set
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
  }, []);

  // Listen to scroll events for infinite loop normalisation
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      el.scrollBy({ left: getItemWidth(), behavior: "smooth" });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Marquee statement */}
        <div className="text-center mb-10">
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-4xl mx-auto">
            The definitive OEM source for precision blades and cutting
            solutions.
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
              {LOOP_ITEMS.map((product, i) => (
                <Link href={product.href} key={`${product.name}-${i}`}>
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
