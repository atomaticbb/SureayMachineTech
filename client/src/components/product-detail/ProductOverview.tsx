/**
 * ProductOverview — Product Intelligence / SEO Content Zone.
 * Two-column: left = long-form copy + trust metrics grid, right = factory/inspection image.
 * Placed between Specifications and Engineering Advantages in the B2B funnel.
 */

import type { CSSProperties } from "react";
import type { Blade } from "@/data/blades";

interface ProductOverviewProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const TRUST_POINTS = [
  { stat: "ISO 9001:2015", label: "Quality Certified" },
  { stat: "In-House", label: "Heat Treatment" },
  { stat: "±0.05 mm", label: "CMM Tolerance" },
  { stat: "Global", label: "Door-to-Door Delivery" },
];

export default function ProductOverview({ blade }: ProductOverviewProps) {
  // Pick the best available gallery shot for the trust-building visual.
  // Prefers later indices (more likely to be factory/inspection shots).
  const gallery = blade.gallery ?? [];
  const trustImage =
    gallery[3] && gallery[3] !== ""
      ? gallery[3]
      : gallery[2] && gallery[2] !== ""
        ? gallery[2]
        : gallery[1] && gallery[1] !== ""
          ? gallery[1]
          : gallery[0] && gallery[0] !== ""
            ? gallery[0]
            : blade.image && blade.image !== ""
              ? blade.image
              : "";

  const materialSpec = blade.specs.find(s => s.label === "Material");
  const hardnessSpec = blade.specs.find(s => s.label === "Hardness");

  return (
    <section
      aria-label="Product overview"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
        {/* ── Left: SEO Copy ──────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] text-slate-700  tracking-widest mb-3">
            [ Product Intelligence ]
          </p>
          <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-8 leading-[1.05]">
            Material &amp; Process Excellence
          </h2>

          {/* Lead paragraph — blade.description */}
          <p className="text-base text-slate-700 leading-relaxed mb-5">
            {blade.description}
          </p>

          {/* Extended copy — fullDescription (if distinct) */}
          {blade.fullDescription &&
            blade.fullDescription !== blade.description && (
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {blade.fullDescription}
              </p>
            )}

          {/* Material + Hardness pull-out block */}
          {(materialSpec || hardnessSpec) && (
            <div className="border-l-4 border-[#001f4d] pl-5 space-y-3 mb-8 py-1">
              {materialSpec && (
                <p className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-black text-[#001f4d]  tracking-wide text-[11px]">
                    Material:{" "}
                  </span>
                  {materialSpec.value} — sourced from certified mill stock,
                  every batch spectrographically verified to confirm alloy
                  composition before entering production.
                </p>
              )}
              {hardnessSpec && (
                <p className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-black text-[#001f4d]  tracking-wide text-[11px]">
                    Hardness:{" "}
                  </span>
                  {hardnessSpec.value} achieved through in-house vacuum heat
                  treatment, delivering the precise balance of edge retention
                  and impact toughness required for continuous industrial
                  operation.
                </p>
              )}
            </div>
          )}

          {/* TCO argument */}
          <p className="text-base text-slate-600 leading-relaxed mb-10">
            Total cost of ownership is the measure that matters. Sureay blades
            are engineered to extend service intervals, reduce unplanned
            downtime, and outlast lower-grade alternatives — delivering a
            measurably lower cost-per-cut across the full service life of your
            equipment.
          </p>

          {/* Trust statistics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-slate-200 bg-slate-200">
            {TRUST_POINTS.map(item => (
              <div key={item.stat} className="bg-white px-4 py-5 text-center">
                <p className="font-black text-sm text-[#001f4d]  tracking-tight leading-tight mb-1">
                  {item.stat}
                </p>
                <p className="font-mono text-[9px] text-slate-500  tracking-widest">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Factory / Inspection Image ─────────────────── */}
        <div className="w-full lg:w-[38%] xl:w-[40%] flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <div className="border border-slate-300 border-t-4 border-t-[#001f4d] overflow-hidden">
            {trustImage ? (
              <img
                src={trustImage}
                alt={`${blade.name} — manufacturing quality control`}
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="w-full aspect-[4/5] bg-slate-100 flex flex-col items-center justify-center gap-2"
                style={DOT_GRID_STYLE}
              >
                <p className="font-mono text-[9px] text-slate-400  tracking-widest text-center px-6 leading-relaxed">
                  [ FACTORY / INSPECTION PHOTOGRAPH ]<br />
                  REF: {blade.id.toUpperCase()}
                </p>
              </div>
            )}
            <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2">
              <span className="text-[#001f4d] text-[10px]">■</span>
              <p className="font-mono text-[9px] text-slate-400  tracking-widest">
                In-House Production · QC Verified · {blade.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
