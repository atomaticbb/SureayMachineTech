/**
 * TrustProtocol — ZONE 2: Trust credential strip.
 * Static, no props. Four bullet points in navy bar.
 */

import { useTranslation } from "@/lib/useTranslation";

const TRUST_ITEM_KEYS = [
  "productDetail.trustProtocol.item1",
  "productDetail.trustProtocol.item2",
  "productDetail.trustProtocol.item3",
  "productDetail.trustProtocol.item4",
];

export default function TrustProtocol() {
  const { t } = useTranslation();
  return (
    <section
      aria-label="Trust credentials"
      className="border-y border-slate-700 bg-white py-4 mt-0"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3">
          {TRUST_ITEM_KEYS.map((key, i) => (
            <p
              key={i}
              className="font-mono text-[11px] text-slate-700  tracking-widest"
            >
              ■ {t(key)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
