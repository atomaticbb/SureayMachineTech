/**
 * ProductHero Component
 * Displays the main product hero section with image gallery and product information
 */

import React from "react";
import { Link } from "wouter";
import { Machine } from "@/data/machines";

interface ProductHeroProps {
  machine: Machine;
}

export default function ProductHero({ machine }: ProductHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-slate-900 pt-20">
      {/* Left Side: Product Image with Blueprint Background */}
      <div className="w-full lg:w-1/2 relative bg-white dark:bg-slate-900 flex items-center justify-center p-4 lg:p-8 order-2 lg:order-1">
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: 'linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 dark:to-black/20"></div>

        {/* Product Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center py-8 lg:py-12">
          <img
            alt={machine.fullName}
            loading="eager"
            width={800}
            height={600}
            className="w-full h-auto max-h-[300px] lg:max-h-[300px] xl:max-h-[420px] object-contain drop-shadow-2xl contrast-110 transform transition-transform duration-700 hover:scale-105"
            src={machine.image}
            onError={(e) => {
              e.currentTarget.src = "/images/products/machinery.webp";
            }}
          />
        </div>
      </div>

      {/* Right Side: Product Information */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 lg:px-12 xl:px-16 relative z-10 bg-white dark:bg-slate-900 order-1 lg:order-2 border-l border-slate-100 dark:border-white/5">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center space-x-2 mx-2 text-sm font-medium text-slate-400 dark:text-slate-500">
          <Link href="/">
            <a className="hover:text-[#FF6600] transition-colors">Home</a>
          </Link>
          <span className="text-slate-300 mx-1">/</span>
          <Link href="/products/machinery">
            <a className="hover:text-[#FF6600] transition-colors">Machinery</a>
          </Link>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-[#FF6600] font-semibold">{machine.categoryDisplay}</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl">
            {machine.name}
            <br />
            <span className="text-slate-900 dark:text-slate-200">{machine.categoryDisplay}</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mb-8 line-clamp-4">
          {machine.fullDescription || machine.description}
        </p>

        {/* Dashboard Panel - Key Specs */}
        {machine.specs && machine.specs.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 lg:p-6 mb-8 shadow-lg max-w-xl">
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {machine.specs.slice(0, 4).map((spec, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-[#FF6600]/20 hover:border-[#FF6600] transition-colors">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-4">
          <Link href="/contact">
            <a className="inline-block w-full text-center px-8 py-3.5 bg-[#003366] text-white font-bold text-base rounded-lg hover:bg-[#FF6600] transition-colors duration-300">
              Request Quote
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
