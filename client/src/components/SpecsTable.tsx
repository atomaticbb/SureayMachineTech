/**
 * SpecsTable Component - Technical specifications table
 * Used in MachineDetail page for displaying complete technical parameters
 */

import React from "react";
import { MachineSpec } from "@/data/machines";

interface SpecsTableProps {
  specs: MachineSpec[];
  title?: string;
}

export default function SpecsTable({ specs, title = "Technical Specifications" }: SpecsTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#004080] px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-3 text-left text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Parameter
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-slate-50 dark:bg-slate-900"
                } hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 border-b border-slate-200 dark:border-slate-700`}
              >
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {spec.label}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-bold">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
