/**
 * LogSawSizingTable Component
 * Engineering catalog sizing data for Tissue Log Saw Blades (circular saw blades).
 * Displays D / B / d / d1 / L / Pin Holes in a responsive data table.
 */

import React, { useState } from "react";
import { Link } from "wouter";

type SizingRow = {
  D: string;
  B: string;
  d: string;
  d1: string;
  L: string;
  pinHoles: string;
};

const SIZING_DATA: SizingRow[] = [
  { D: "610", B: "4.76", d: "68.26", d1: "216", L: "197", pinHoles: "4/11.5/108 + 4/4 UNC/203.2" },
  { D: "610", B: "4.76", d: "68.26", d1: "230", L: "190", pinHoles: "4/11.5/108 + 4/4 UNC/203.2" },
  { D: "610", B: "4.76", d: "82.55", d1: "230", L: "190", pinHoles: "4/11.5/108 + 4/4 UNC/203.2" },
  { D: "700", B: "4.76", d: "68.26", d1: "320", L: "190", pinHoles: "4/11.5/108 + 4/14 UNC/203.2" },
  { D: "810", B: "5.00", d: "60.00", d1: "320", L: "245", pinHoles: "4/14 UNC/254 + 4/14 UNC/289" },
  { D: "810", B: "6.00", d: "60.00", d1: "320", L: "245", pinHoles: "4/14 UNC/254 + 4/14 UNC/289" },
];

const COLUMNS: { key: keyof SizingRow; label: string; sub: string }[] = [
  { key: "D",         label: "D",         sub: "Outer Diameter (mm)" },
  { key: "B",         label: "B",         sub: "Thickness (mm)" },
  { key: "d",         label: "d",         sub: "Bore / Inner Dia. (mm)" },
  { key: "d1",        label: "d1",        sub: "Hub / Clamp Dia. (mm)" },
  { key: "L",         label: "L",         sub: "Bevel Length (mm)" },
  { key: "pinHoles",  label: "Pin Holes", sub: "N° × A × PCD (mm)" },
];

export default function LogSawSizingTable() {
  const [highlight, setHighlight] = useState<number | null>(null);

  return (
    <section className="relative py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          backgroundSize: '30px 30px',
          backgroundImage: 'linear-gradient(to right, rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.5) 1px, transparent 1px)'
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-[#FF6600]" />
            <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
              Engineering Catalog
            </span>
            <div className="h-[2px] w-8 bg-[#FF6600]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] dark:text-white mb-3">
            Standard Sizing Data
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            All dimensions in millimeters (mm). Custom diameters, bore sizes, and pin-hole configurations available on request.
          </p>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">

          {/* Column Legend Bar */}
          <div className="bg-[#003366] px-6 py-3 flex flex-wrap gap-x-8 gap-y-1">
            {COLUMNS.map((col) => (
              <span key={col.key} className="text-xs text-blue-200 font-medium whitespace-nowrap">
                <span className="font-black text-white mr-1">{col.label}</span>= {col.sub}
              </span>
            ))}
          </div>

          {/* Scrollable Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 whitespace-nowrap"
                    >
                      <span className="text-[#003366] dark:text-blue-400 font-black mr-1">{col.label}</span>
                      <span className="hidden lg:inline text-slate-400 font-normal normal-case">
                        {col.sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZING_DATA.map((row, i) => (
                  <tr
                    key={i}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseLeave={() => setHighlight(null)}
                    className={`border-b border-slate-100 dark:border-slate-700/60 transition-colors cursor-default ${
                      highlight === i
                        ? "bg-blue-50 dark:bg-slate-700"
                        : i % 2 === 0
                        ? "bg-white dark:bg-slate-900"
                        : "bg-slate-50/60 dark:bg-slate-800/40"
                    }`}
                  >
                    {/* D */}
                    <td className="px-5 py-3.5 font-black text-[#003366] dark:text-blue-300 text-base whitespace-nowrap">
                      {row.D}
                    </td>
                    {/* B */}
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.B}
                    </td>
                    {/* d */}
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.d}
                    </td>
                    {/* d1 */}
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.d1}
                    </td>
                    {/* L */}
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.L}
                    </td>
                    {/* Pin Holes */}
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 font-mono text-xs leading-relaxed">
                      {row.pinHoles}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer CTA */}
          <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-5 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
              Need a <span className="font-semibold text-slate-700 dark:text-slate-200">non-standard size</span>? Send your drawing or machine model — we'll engineer it.
            </p>
            <Link href="/contact">
              <a className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold rounded-lg transition-colors text-sm shadow-md hover:shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Request Custom Size
              </a>
            </Link>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
          * Pin Holes format: N° (quantity) × A (hole diameter mm or thread) × PCD (pitch circle diameter mm)
        </p>

      </div>
    </section>
  );
}
