/**
 * TechSpecsTable Component
 * Displays technical specifications in a tabbed table format
 */

import React, { useState } from "react";
import { Link } from "wouter";
import { SpecCategory } from "@/data/machines";

interface TechSpecsTableProps {
  machineName: string;
  categories: SpecCategory[];
}

export default function TechSpecsTable({ machineName, categories }: TechSpecsTableProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

  if (!categories || categories.length === 0) {
    return null;
  }

  const activeCategory = categories.find(cat => cat.id === activeTab) || categories[0];

  return (
    <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-[#FF6600]"></div>
            <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
              Technical Data
            </span>
            <div className="h-[2px] w-8 bg-[#FF6600]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] dark:text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            All information on the {machineName}
          </p>
        </div>

        {/* Tabbed Specifications */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              {categories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'text-[#003366] dark:text-white border-b-2 border-[#FF6600] bg-white dark:bg-slate-900'
                      : 'text-slate-500 dark:text-slate-400 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:text-[#003366] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Table Content */}
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {Object.entries(activeCategory.specs).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex justify-between px-8 py-4 transition-colors ${
                    index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'
                  } hover:bg-slate-100 dark:hover:bg-slate-700/50`}
                >
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider">
                    {key}
                  </span>
                  <span className="text-slate-900 dark:text-white font-medium text-sm">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Table Footer CTA */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Need custom specifications or have technical questions?
                </p>
                <Link href="/contact">
                  <a className="px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-bold rounded-lg transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                    Contact Engineering Team
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
