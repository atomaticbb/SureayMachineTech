/*
 * MegaMenu.tsx — Swiss Brutalist 3-Column Mega Menu
 *
 * Data is derived from blades.ts (SSOT) via two adapters:
 *   PRODUCTS_MENU_DATA  — "Tooling Specialist" persona, grouped by blade-type family
 *   INDUSTRY_MENU_DATA  — "Solution Seeker" persona, grouped by application sector
 *
 * Layout: 20% index | 55% matrix | 25% authority viewport
 * Zero rounded corners · Deep Navy (#001f4d) active states
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { blades, type BladeCategoryType } from "../../data/blades";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface MegaItem {
  id: string;
  name: string;
  refCode: string;
  image: string;
  href: string;
}

export interface MegaFeatured {
  coverImage: string;
  tagline: string; // e.g. "PREMIUM GRADE STEEL"
  subtitle: string; // "ACTIVE CATEGORY" | "ACTIVE INDUSTRY"
  title: string;
  ctaText: string;
  ctaHref: string;
}

export interface MegaCategory {
  id: string;
  title: string;
  items: MegaItem[];
  featured: MegaFeatured;
}

export interface MegaMenuData {
  columnLabel: string;
  bottomLinkText: string;
  bottomLinkHref: string;
  categories: MegaCategory[];
}

// ── Data Adapter ───────────────────────────────────────────────────────────────

// Short REF codes for the product matrix cards
const REF_CODE: Record<BladeCategoryType, string> = {
  slitter_knives: "SLT",
  shredder_blades: "SHR",
  granulator_blades: "GRN",
  log_saw_blades: "LSW",
  trim_cut_blades: "TRM",
  metal_processing: "MTL",
  battery_precision: "BAT",
  custom_profile: "CST",
};

const bladeToItem = (b: (typeof blades)[number], seq: number): MegaItem => ({
  id: b.id,
  name: b.name,
  refCode: `${REF_CODE[b.category] ?? "BLD"}-${String(seq).padStart(3, "0")}`,
  image: b.image,
  href: `/products/${b.id}`,
});

// ── PRODUCTS Data — grouped by blade-type family ───────────────────────────────

export const PRODUCTS_MENU_DATA: MegaMenuData = {
  columnLabel: "PRODUCT TYPES",
  bottomLinkText: "→ VIEW ALL BLADES",
  bottomLinkHref: "/products",
  categories: [
    {
      id: "cutting",
      title: "SLITTING & CONVERTING",
      featured: {
        coverImage: "/images/products/blades/11-2-2_circular-blade_01.webp",
        tagline: "PRECISION GROUND · MIRROR FINISH",
        subtitle: "ACTIVE CATEGORY",
        title: "SLITTING & CONVERTING",
        ctaText: "EXPLORE SLITTER KNIVES",
        ctaHref: "/products",
      },
      items: blades
        .filter(
          b =>
            b.category === "slitter_knives" ||
            b.category === "battery_precision"
        )
        .map(bladeToItem),
    },
    {
      id: "shredding",
      title: "SHREDDING & GRANULATING",
      featured: {
        coverImage: "/images/products/blades/11-4-2_metal-shear-blade_01.webp",
        tagline: "MAX IMPACT RESISTANCE",
        subtitle: "ACTIVE CATEGORY",
        title: "SHREDDING & GRANULATING",
        ctaText: "EXPLORE SHREDDER BLADES",
        ctaHref: "/products",
      },
      items: blades
        .filter(
          b =>
            b.category === "shredder_blades" ||
            b.category === "granulator_blades"
        )
        .map(bladeToItem),
    },
    {
      id: "paper",
      title: "PAPER, TRIM & METAL",
      featured: {
        coverImage: "/images/products/blades/tissue-log-saw-blades.webp",
        tagline: "ZERO DUST. BURR-FREE.",
        subtitle: "ACTIVE CATEGORY",
        title: "PAPER, TRIM & METAL",
        ctaText: "EXPLORE PAPER BLADES",
        ctaHref: "/products",
      },
      items: blades
        .filter(
          b =>
            b.category === "log_saw_blades" ||
            b.category === "trim_cut_blades" ||
            b.category === "metal_processing"
        )
        .map(bladeToItem),
    },
  ],
};

// ── INDUSTRY Data — grouped by application sector ─────────────────────────────

export const INDUSTRY_MENU_DATA: MegaMenuData = {
  columnLabel: "INDUSTRIES",
  bottomLinkText: "→ BROWSE ALL TOOLING",
  bottomLinkHref: "/products",
  categories: [
    {
      id: "recycling-waste",
      title: "Recycling & Waste",
      featured: {
        coverImage: "/images/applications/Plastic-Waste-Recycling.webp",
        tagline: "EXTREME DURABILITY & IMPACT RESISTANCE",
        subtitle: "ACTIVE INDUSTRY",
        title: "RECYCLING & WASTE MANAGEMENT",
        ctaText: "VIEW RECYCLING SOLUTIONS",
        ctaHref: "/plastic-industry",
      },
      items: blades.filter(b => b.sector === "recycling").map(bladeToItem),
    },
    {
      id: "paper-packaging-converting",
      title: "Paper & Tissue",
      featured: {
        coverImage: "/images/applications/tissue-and-paper.webp",
        tagline: "PRECISION CUTTING · ZERO DUST",
        subtitle: "ACTIVE INDUSTRY",
        title: "PAPER & TISSUE",
        ctaText: "VIEW PAPER SOLUTIONS",
        ctaHref: "/paper-industry",
      },
      items: blades.filter(b => b.sector === "paper").map(bladeToItem),
    },
    {
      id: "metal-processing",
      title: "Metal Processing",
      featured: {
        coverImage: "/images/applications/Metal-Waste-Recycling.webp",
        tagline: "HIGH-SPEED SHEAR CUTTING",
        subtitle: "ACTIVE INDUSTRY",
        title: "METAL COIL PROCESSING",
        ctaText: "VIEW METAL SOLUTIONS",
        ctaHref: "/metal-industry",
      },
      items: blades.filter(b => b.sector === "metal").map(bladeToItem),
    },
    {
      id: "flexible-converting",
      title: "Film & Converting",
      featured: {
        coverImage:
          "/images/applications/tissue-industry/rotary-slitter-knives-00.webp",
        tagline: "PRECISION FILM & FOIL SLITTING",
        subtitle: "ACTIVE INDUSTRY",
        title: "FLEXIBLE CONVERTING & PACKAGING",
        ctaText: "VIEW CONVERTING SOLUTIONS",
        ctaHref: "/converting-industry",
      },
      items: blades.filter(b => b.sector === "converting").map(bladeToItem),
    },
    {
      id: "new-energy",
      title: "New Energy",
      featured: {
        coverImage:
          "/images/applications/metal-industry/metal-slitter-knives-00.webp",
        tagline: "ZERO-BURR ELECTRODE SLITTING",
        subtitle: "ACTIVE INDUSTRY",
        title: "NEW ENERGY & BATTERY",
        ctaText: "VIEW NEW ENERGY SOLUTIONS",
        ctaHref: "/new-energy-industry",
      },
      items: blades.filter(b => b.sector === "new_energy").map(bladeToItem),
    },
    {
      id: "custom-profile",
      title: "Custom Blades",
      featured: {
        coverImage: "/images/products/blades/special-shaped-knife.webp",
        tagline: "ANY GEOMETRY · ANY ALLOY",
        subtitle: "CUSTOM MANUFACTURING",
        title: "CUSTOM BLADES",
        ctaText: "VIEW CUSTOM SOLUTIONS",
        ctaHref: "/custom",
      },
      items: blades.filter(b => b.sector === "other").map(bladeToItem),
    },
  ],
};

// ── Component ──────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  data: MegaMenuData;
  onClose: () => void;
}

export default function MegaMenu({ data, onClose }: MegaMenuProps) {
  const [activeId, setActiveId] = useState<string>(data.categories[0].id);
  const active =
    data.categories.find(c => c.id === activeId) ?? data.categories[0];

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] shadow-2xl z-50 overflow-hidden">
      {/* Scanner line — sweeps across on category switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId + "-scan"}
          className="absolute top-0 left-0 h-[2px] bg-[#003366] pointer-events-none"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex py-7 gap-0">
        {/* ── Column 1: Category Index (20%) ────────────────────────────── */}
        <div className="w-[20%] flex-shrink-0 flex flex-col">
          <p className="font-mono text-[9px] text-slate-300 uppercase tracking-[0.2em] mb-4 pl-4">
            {data.columnLabel}
          </p>

          <nav className="flex-1">
            {data.categories.map(cat => {
              const isActive = cat.id === activeId;
              return (
                <Link key={cat.id} href={cat.featured.ctaHref}>
                  <div
                    onMouseEnter={() => setActiveId(cat.id)}
                    onClick={onClose}
                    className={`w-full text-left py-3 pl-4 border-l-2 font-mono text-[11px] font-bold tracking-wide transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "text-[#001f4d] bg-slate-50 border-[#001f4d]"
                        : "text-slate-500 border-transparent hover:text-[#001f4d] hover:bg-slate-50 hover:border-[#001f4d]"
                    }`}
                  >
                    {cat.title}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom "view all" link */}
          <Link href={data.bottomLinkHref}>
            <div
              onClick={onClose}
              className="mt-6 pl-4 font-mono text-[9px] text-[#003366] uppercase tracking-widest hover:underline cursor-pointer"
            >
              {data.bottomLinkText}
            </div>
          </Link>
        </div>

        {/* ── Column 2: Recommendation Matrix (55%) ─────────────────────── */}
        <div className="w-[55%] flex-shrink-0 border-x border-slate-200 px-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "-grid"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 500, damping: 45 }}
              className="grid grid-cols-3 gap-x-6 gap-y-8"
            >
              {active.items.map(item => (
                <Link key={item.id} href={item.href}>
                  <div onClick={onClose} className="group cursor-pointer">
                    {/* Image — 21:9 blueprint-slab ratio */}
                    <div className="aspect-[21/9] bg-slate-100 mb-3 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* REF code */}
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">
                      {item.refCode}
                    </p>

                    {/* Product name */}
                    <p className="font-black text-[10px] uppercase leading-tight text-[#001f4d] group-hover:text-[#003366] transition-colors">
                      {item.name}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Column 3: Authority Viewport (25%) ────────────────────────── */}
        <div className="w-[25%] flex-shrink-0 pl-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "-featured"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1"
            >
              {/* Cover image with dark overlay */}
              <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                <img
                  src={active.featured.coverImage}
                  alt={active.featured.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/85 via-[#001f4d]/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono text-[9px] text-white/60 uppercase tracking-[0.25em] mb-1.5">
                    {active.featured.subtitle}
                  </p>
                  <p className="font-black text-lg text-white uppercase leading-tight tracking-tight">
                    {active.featured.title}
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-mono text-[9px] text-[#003366] uppercase tracking-[0.22em] font-bold mt-3">
                ■ {active.featured.tagline}
              </p>

              {/* CTA Button */}
              <Link href={active.featured.ctaHref}>
                <div
                  onClick={onClose}
                  className="mt-3 w-full bg-[#001f4d] hover:bg-[#003399] text-white font-mono text-[10px] font-bold tracking-[0.18em] uppercase px-4 py-3 rounded-none transition-colors duration-150 flex items-center justify-between cursor-pointer group"
                >
                  <span>{active.featured.ctaText}</span>
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
              </Link>

              {/* Quality strip */}
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-3">
                ■ ISO 9001:2015 · CMM VERIFIED
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
