import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/homeData";

function CountUp({
  to,
  duration = 1600,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, started, to]);

  const display = to >= 1000 ? value.toLocaleString() : value.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function HomeStatsStrip() {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "px-6 md:px-8 py-12 flex flex-col gap-1.5",
                index < 3 ? "border-r border-slate-200" : "",
                index >= 2 ? "border-t border-slate-200 md:border-t-0" : "",
              ].join(" ")}
            >
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                {stat.sub}
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001f4d] leading-none tracking-tight">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-500 mt-0.5 max-w-[14rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase px-8 pb-3 text-right">
          * Based on current internal production and export records
        </p>
      </div>
    </section>
  );
}