import { useEffect, useRef } from "react";
import { STATS } from "@/data/homeData";

function CountUp({
  to,
  duration = 1600,
  suffix = "",
  formatted,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  formatted: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const current = Math.round(eased * to);
          el.textContent =
            (to >= 1000 ? current.toLocaleString() : String(current)) + suffix;
          if (t < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [duration, suffix, to]);

  return (
    <>
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        0{suffix}
      </span>
      <span className="sr-only">{formatted}</span>
    </>
  );
}

export default function HomeStatsStrip() {
  return (
    <section
      aria-label="Company Statistics"
      className="bg-slate-50 border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, index) => {
            const borderR =
              index % 2 === 0
                ? "border-r border-slate-200"
                : index < 3
                  ? "md:border-r border-slate-200"
                  : "";
            const borderT =
              index >= 2 ? "border-t border-slate-200 md:border-t-0" : "";
            const formatted =
              (stat.value >= 1000
                ? stat.value.toLocaleString()
                : String(stat.value)) + stat.suffix;

            return (
              <div
                key={stat.label}
                className={[
                  "px-6 md:px-8 py-12 flex flex-col gap-1.5",
                  borderR,
                  borderT,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="text-[10px] font-semibold tracking-[0.25em]  text-slate-400">
                  {stat.sub}
                </p>
                <p className="text-[clamp(2.5rem,5vw,3.75rem)] font-black text-[#001f4d] leading-none tracking-tight">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    formatted={formatted}
                  />
                </p>
                <p className="text-[11px] font-semibold tracking-[0.15em]  text-slate-500 mt-0.5 max-w-[14rem]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
        <p className="font-mono text-[9px] text-slate-400 tracking-widest  px-8 pb-3 text-right">
          * Based on current internal production and export records
        </p>
      </div>
    </section>
  );
}
