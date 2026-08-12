/**
 * ProductDrawings — engineering drawing reference row.
 * Renders only when blade.drawings is present (currently die face cutting
 * knives only). Sits after TechnicalAudit. A single scroll-snap row paged by
 * the arrow buttons; each card opens a dialog with the full-size drawing.
 *
 * Scope note: these are outline/geometry drawings used as a reverse-engineering
 * capability proof. Drawings carrying a customer or OEM title block, part
 * number or tolerance table must never be published here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Blade } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const ARROW_CLASS =
  "flex h-9 w-9 items-center justify-center border border-slate-300 text-[#001f4d] transition-colors hover:bg-[#001f4d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001f4d] disabled:pointer-events-none disabled:opacity-30";

export default function ProductDrawings({ blade }: Props) {
  const { t } = useTranslation();
  const data = blade.drawings;
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // 1px slack absorbs sub-pixel rounding at the track ends.
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (!data || data.items.length === 0) return null;

  const active = openIndex === null ? null : data.items[openIndex];

  return (
    <section
      aria-label="Engineering drawings"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      <p className="font-mono text-[10px] text-slate-700 tracking-widest mb-3">
        [ {t("productDetail.drawings.eyebrow")} ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d] tracking-tight mb-6">
        {t("productDetail.drawings.headline")}
      </h2>

      {data.intro && (
        <p className="text-[16px] text-slate-600 leading-relaxed max-w-[80ch] mb-8">
          {data.intro}
        </p>
      )}

      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={!canPrev}
          className={ARROW_CLASS}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("productDetail.drawings.prev")}</span>
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={!canNext}
          className={ARROW_CLASS}
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("productDetail.drawings.next")}</span>
        </button>
      </div>

      <ul
        ref={scrollerRef}
        onScroll={sync}
        className="flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-proximity [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {data.items.map((item, i) => (
          <li
            key={item.image}
            className="snap-start shrink-0 basis-[calc(50%-8px)] md:basis-[calc(33.333%-11px)] lg:basis-[calc(25%-12px)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t("productDetail.drawings.zoom")} — ${item.caption}`}
              className="group w-full text-left border border-slate-200 bg-white hover:border-[#001f4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001f4d] transition-colors"
            >
              <div
                className="w-full aspect-square bg-slate-50 overflow-hidden flex items-center justify-center"
                style={DOT_GRID_STYLE}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-contain p-3 mix-blend-multiply"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={800}
                />
              </div>
              <p className="font-mono text-[11px] text-slate-600 group-hover:text-[#001f4d] leading-snug px-3 py-2.5 border-t border-slate-200">
                {item.caption}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <p className="font-mono text-[11px] text-slate-500 tracking-wide mt-4">
        ■ {t("productDetail.drawings.note")}
      </p>

      <Dialog
        open={openIndex !== null}
        onOpenChange={open => !open && setOpenIndex(null)}
      >
        <DialogContent className="rounded-none border-slate-300 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-mono text-[12px] text-slate-600 tracking-wide text-left">
              {active?.caption}
            </DialogTitle>
          </DialogHeader>
          {active && (
            <div
              className="w-full aspect-square bg-slate-50 border border-slate-200 flex items-center justify-center"
              style={DOT_GRID_STYLE}
            >
              <img
                src={active.image}
                alt={active.caption}
                className="w-full h-full object-contain p-4 mix-blend-multiply"
                width={800}
                height={800}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
