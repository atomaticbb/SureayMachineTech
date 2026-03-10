/**
 * TrustProtocol — ZONE 2: Trust credential strip.
 * Static, no props. Four bullet points in navy bar.
 */

const TRUST_ITEMS = [
  "ISO 9001:2015 Certified",
  "In-House Heat Treatment",
  "Strict Dimensional Tolerances",
  "Global Door-to-Door Delivery",
];

export default function TrustProtocol() {
  return (
    <section
      aria-label="Trust credentials"
      className="border-y border-slate-700 bg-white py-4 mt-0"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item, i) => (
            <p
              key={i}
              className="font-mono text-[11px] text-slate-700 uppercase tracking-widest"
            >
              ■ {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
