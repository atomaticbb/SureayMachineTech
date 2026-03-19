/**
 * ComprehensiveData — ZONE 3: Common Standard Dimensions.
 * Two-column layout: dimensions table on the left, product image on the right.
 * Header sits outside the flex row so the image height matches the table exactly.
 */

import type { CSSProperties } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Blade } from "@/data/blades";

interface ComprehensiveDataProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function ComprehensiveData({ blade }: ComprehensiveDataProps) {
  if (!blade.standardDimensions || blade.standardDimensions.length === 0) return null;

  const hasLengthTeeth = blade.standardDimensions.some((r) => r.length !== undefined || r.teeth !== undefined);
  // Only show spec column if col0 label is explicitly defined
  const hasSpec = blade.dimensionLabels?.col0 !== undefined && blade.standardDimensions.some((r) => r.spec !== undefined);
  // Only show col3 if explicitly defined or if there's thickness/type data
  const hasCol3 = blade.dimensionLabels?.col3 !== undefined || blade.standardDimensions.some((r) => r.thickness !== undefined || r.type !== undefined);
  const panelImage = blade.gallery?.[5] ?? blade.image;

  const col0Label = blade.dimensionLabels?.col0 ?? "Specification";
  const col1Label = blade.dimensionLabels?.col1 ?? "Outer Diameter (OD)";
  const col2Label = blade.dimensionLabels?.col2 ?? "Inner Diameter (ID)";
  const col3Label = blade.dimensionLabels?.col3 ?? "Thickness";
  const col4Label = blade.dimensionLabels?.col4 ?? "Teeth";
  const captionText = blade.dimensionLabels?.caption ??
    "* Custom manufacturing is available. The outer diameter can reach up to 1200 mm upon request.";

  return (
    <section
      aria-label="Common standard dimensions"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section header — outside the flex row */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ Standard Reference ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d] uppercase tracking-tight mb-10">
        Common Standard Dimensions
      </h2>

      {/* Flex row: table left, image right — equal height */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-stretch">

        {/* Left — dimensions table only */}
        <div className="flex-1 min-w-0">
          <div className="border border-slate-200 border-t-2 border-t-[#001f4d] overflow-hidden h-full shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100 border-b border-slate-200">
                  {hasSpec && (
                    <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                      {col0Label}
                    </TableHead>
                  )}
                  <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                    {col1Label}
                  </TableHead>
                  <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                    {col2Label}
                  </TableHead>
                  {hasLengthTeeth ? (
                    <>
                      <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                        {col3Label}
                      </TableHead>
                      <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                        {col4Label}
                      </TableHead>
                    </>
                  ) : hasCol3 ? (
                    <TableHead className="h-auto px-5 py-3 font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                      {col3Label}
                    </TableHead>
                  ) : null}
                </TableRow>
              </TableHeader>

              <TableBody>
                {blade.standardDimensions.map((row, i) => (
                  <TableRow
                    key={i}
                    className={i % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/60 hover:bg-slate-50"}
                  >
                    {hasSpec && (
                      <TableCell className="px-5 py-3 font-mono text-[16px] text-slate-500 whitespace-pre-line">
                        {row.spec ?? "—"}
                      </TableCell>
                    )}
                    <TableCell className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                      {hasSpec ? (row.dimension ?? row.od) : (row.dimension ?? row.spec ?? row.od)}
                    </TableCell>
                    <TableCell className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                      {row.bolt ?? row.id}
                    </TableCell>
                    {hasLengthTeeth ? (
                      <>
                        <TableCell className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                          {row.length ?? "—"}
                        </TableCell>
                        <TableCell className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                          {row.teeth ?? "—"}
                        </TableCell>
                      </>
                    ) : hasCol3 ? (
                      <TableCell className="px-5 py-3 font-mono font-medium text-[16px] text-[#001f4d]">
                        {row.type ?? row.thickness}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>

              <TableCaption className="text-left px-5 py-2.5 border-t border-slate-100 bg-slate-50/50">
                <span className="italic text-slate-400 text-xs">
                  {captionText}
                </span>
              </TableCaption>
            </Table>
          </div>
        </div>

        {/* Right — product image */}
        <div className="w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 h-full">
          <div
            className="w-full h-full min-h-[280px] border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
            style={DOT_GRID_STYLE}
          >
            <img
              src={panelImage}
              alt={blade.fullName || blade.name}
              className="w-full h-full object-contain p-8 mix-blend-multiply"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
