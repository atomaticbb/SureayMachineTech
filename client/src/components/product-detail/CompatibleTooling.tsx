/**
 * CompatibleTooling — ZONE 6: System Inventory Matrix.
 * Accepts blades: Blade[]. Compact 2/4-column card grid.
 */

import { Link } from "wouter";
import type { Blade } from "@/data/blades";

interface CompatibleToolingProps {
  blades: Blade[];
}

export default function CompatibleTooling({ blades }: CompatibleToolingProps) {
  if (blades.length === 0) return null;

  return (
    <section
      aria-label="Compatible tooling"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Header row */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ System Inventory ]
      </p>
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight">
          Compatible Tooling
        </h2>
        <Link href="/products">
          <span className="font-mono text-[10px] text-slate-700 uppercase tracking-[0.2em] hover:text-[#001f4d] cursor-pointer transition-colors">
            View All →
          </span>
        </Link>
      </div>

      {/* Compact inventory grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blades.map((related) => (
          <Link key={related.id} href={related.link}>
            <div className="bg-white border border-slate-200 hover:border-[#001f4d] transition-colors duration-200 cursor-pointer group h-full flex flex-col">

              {/* Image viewport */}
              <div className="aspect-square bg-slate-50 flex items-center justify-center p-4">
                <img
                  src={related.image}
                  alt={related.name}
                  className="max-h-36 w-auto mx-auto object-contain mix-blend-multiply"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Metadata */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <p className="font-mono text-[11px] text-slate-500 uppercase tracking-widest mb-1.5">
                    {related.categoryDisplay}
                  </p>
                  <p className="font-black text-sm text-[#001f4d] uppercase leading-tight mb-3">
                    {related.name}
                  </p>
                </div>
                <p className="font-mono text-[11px] text-slate-700 uppercase tracking-widest mt-auto">
                  REF: {related.id.toUpperCase()}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
