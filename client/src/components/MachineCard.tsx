/**
 * MachineCard Component - Reusable Product Card for Machinery
 * Used in MachineListPage to display individual machine products
 */

import React from "react";
import { Link } from "wouter";
import { Machine, getBadgeClasses } from "@/data/machines";

interface MachineCardProps {
  machine: Machine;
}

export default function MachineCard({ machine }: MachineCardProps) {
  return (
    <article className="group relative h-[480px] w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative h-[290px] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
        {/* Badge */}
        {machine.badge && (
          <span className={getBadgeClasses(machine.badgeColor)}>
            {machine.badge}
          </span>
        )}

        {/* Product Image */}
        <img
          alt={machine.fullName}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
          src={machine.image}
          onError={(e) => {
            e.currentTarget.src = "/images/products/machinery.webp";
          }}
        />
      </div>

      {/* Content Section */}
      <div className="px-6 pt-4 pb-0 flex flex-col relative bg-white dark:bg-slate-800">
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#003366] transition-colors">
            {machine.name} <br />
            {machine.fullName.replace(machine.name, "").trim()}
          </h3>
        </div>

        {/* Description / Specs Toggle Area */}
        <div className="relative h-[70px] mb-3">
          {/* Description (Default View) */}
          <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-center">
            <p className="text-slate-500 dark:text-slate-400 text-base leading-snug line-clamp-3">
              {machine.description}
            </p>
          </div>

          {/* Specs (Hover View) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm w-full">
              {machine.specs.map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-400">{spec.label}:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-auto pt-0 border-t border-slate-100 dark:border-slate-700">
          <Link href={machine.link} className="group/btn block w-full text-center">
            <div className="inline-block relative py-1">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#003366] dark:text-slate-500 group-hover/btn:text-[#FF6600] transition-colors duration-300">
                View Full Specs
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6600] transition-all duration-300 group-hover/btn:w-full"></span>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
