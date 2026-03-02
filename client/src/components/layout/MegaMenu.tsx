/*
 * MegaMenu.tsx — Reusable Swiss Brutalist 3-column Mega Menu
 * Renders either a "Products" or "Industry" dropdown from passed data.
 * Zero rounded corners · Deep Navy palette · Framer Motion transitions.
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface MegaItem {
  id:      string;
  name:    string;
  refCode: string;
  image:   string;
  href:    string;
}

export interface MegaFeatured {
  coverImage: string;
  subtitle:   string;  // "ACTIVE CATEGORY" | "ACTIVE INDUSTRY"
  title:      string;
  ctaText:    string;  // "VIEW ALL SOLUTIONS" | "EXPLORE INDUSTRY PAGE"
  ctaHref:    string;
}

export interface MegaCategory {
  id:       string;
  title:    string;
  items:    MegaItem[];
  featured: MegaFeatured;
}

export interface MegaMenuData {
  columnLabel:    string;  // "CATEGORIES" | "INDUSTRIES"
  bottomLinkText: string;  // "→ ALL PRODUCTS" | "→ BROWSE ALL TOOLING"
  bottomLinkHref: string;
  categories:     MegaCategory[];
}

// ── Mock Datasets ──────────────────────────────────────────────────────────────

export const PRODUCTS_MENU_DATA: MegaMenuData = {
  columnLabel:    "CATEGORIES",
  bottomLinkText: "→ ALL PRODUCTS",
  bottomLinkHref: "/products",
  categories: [
    {
      id: "shredder",
      title: "SHREDDER BLADES",
      featured: {
        coverImage: "/images/applications/plastic-industry/single-shredder-blades-001-w1200.webp",
        subtitle:   "ACTIVE CATEGORY",
        title:      "SHREDDER BLADES",
        ctaText:    "VIEW ALL SOLUTIONS",
        ctaHref:    "/products/blades",
      },
      items: [
        { id: "shr-01", refCode: "SHR-01", name: "Single-Shaft Shredder Blades",    image: "/images/applications/plastic-industry/single-shredder-blades-001-w1200.webp", href: "/products/blades" },
        { id: "shr-02", refCode: "SHR-02", name: "Twin-Shaft Shredder Knives",      image: "/images/applications/plastic-industry/single-shredder-blades-010.webp",        href: "/products/blades" },
        { id: "shr-03", refCode: "SHR-03", name: "Heavy-Duty Granulator Knives",    image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "grn-01", refCode: "GRN-01", name: "Granulator Rotor Knives",         image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "grn-02", refCode: "GRN-02", name: "Granulator Bed Knives",           image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "plz-01", refCode: "PLZ-01", name: "Strand Pelletizer Cutter Blades", image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
      ],
    },
    {
      id: "metal",
      title: "METAL SLITTER KNIVES",
      featured: {
        coverImage: "/images/applications/metal-industry/slitter-knives.webp",
        subtitle:   "ACTIVE CATEGORY",
        title:      "METAL SLITTER KNIVES",
        ctaText:    "VIEW ALL SOLUTIONS",
        ctaHref:    "/products/blades",
      },
      items: [
        { id: "slt-01", refCode: "SLT-01", name: "Circular Slitter Knives",         image: "/images/products/blades/11-6-2_metal-slitter-knife.webp",  href: "/products/blades/metal-slitter-knife" },
        { id: "slt-02", refCode: "SLT-02", name: "Tungsten Carbide Slitter Discs",  image: "/images/products/blades/11-6-2_metal-slitter-knife.webp",  href: "/products/blades/metal-slitter-knife" },
        { id: "slt-03", refCode: "SLT-03", name: "HSS Slitter Knives",              image: "/images/products/blades/11-6-2_metal-slitter-knife.webp",  href: "/products/blades/metal-slitter-knife" },
        { id: "shr-04", refCode: "SHR-04", name: "Guillotine Shear Blades",         image: "/images/applications/metal-industry/shear-blades.webp",    href: "/products/blades/metal-slitter-knife" },
        { id: "shr-05", refCode: "SHR-05", name: "Flying Shear Blades",             image: "/images/applications/metal-industry/shear-blades.webp",    href: "/products/blades/metal-slitter-knife" },
        { id: "die-01", refCode: "DIE-01", name: "Precision Punch & Die Sets",      image: "/images/applications/metal-industry/punch-die.webp",        href: "/products/blades/metal-slitter-knife" },
      ],
    },
    {
      id: "tissue",
      title: "LOG SAW & TISSUE",
      featured: {
        coverImage: "/images/applications/paper-industry/log-saw-blade.webp",
        subtitle:   "ACTIVE CATEGORY",
        title:      "LOG SAW & TISSUE",
        ctaText:    "VIEW ALL SOLUTIONS",
        ctaHref:    "/products/blades",
      },
      items: [
        { id: "log-01", refCode: "LOG-01", name: "Tissue Log Saw Blades",           image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "log-02", refCode: "LOG-02", name: "Napkin Paper Log Saw Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "log-03", refCode: "LOG-03", name: "TTB / TTBF Log Saw Blades",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "rwd-01", refCode: "RWD-01", name: "Surface Rewinder Knives",         image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "rwd-02", refCode: "RWD-02", name: "Rewinder Perforation Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "slt-04", refCode: "SLT-04", name: "Crush-Cut Slitting Knives",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
      ],
    },
    {
      id: "machinery",
      title: "SHEET METAL MACHINERY",
      featured: {
        coverImage: "/images/applications/metal-industry/cnc-grinding.webp",
        subtitle:   "ACTIVE CATEGORY",
        title:      "SHEET METAL MACHINERY",
        ctaText:    "VIEW ALL SOLUTIONS",
        ctaHref:    "/products/machinery",
      },
      items: [
        { id: "mch-01", refCode: "MCH-01", name: "CNC Press Brake Machines",        image: "/images/products/machinery/press-brake.webp",      href: "/products/machinery" },
        { id: "mch-02", refCode: "MCH-02", name: "Hydraulic Sheet Metal Shears",    image: "/images/products/machinery/hydraulic-shear.webp",  href: "/products/machinery" },
        { id: "mch-03", refCode: "MCH-03", name: "Plate Rolling Machines",          image: "/images/products/machinery/plate-roll.webp",       href: "/products/machinery" },
        { id: "mch-04", refCode: "MCH-04", name: "Panel Bending Machines",          image: "/images/products/machinery/panel-bender.webp",     href: "/products/machinery" },
        { id: "mch-05", refCode: "MCH-05", name: "Laser Cutting Systems",           image: "/images/products/machinery/laser-cutting.webp",    href: "/products/machinery" },
        { id: "mch-06", refCode: "MCH-06", name: "Decoiler Straightener Feeders",   image: "/images/products/machinery/decoiler.webp",         href: "/products/machinery" },
      ],
    },
    {
      id: "molds",
      title: "PRESS BRAKE MOLDS",
      featured: {
        coverImage: "/images/applications/metal-industry/punch-die.webp",
        subtitle:   "ACTIVE CATEGORY",
        title:      "PRESS BRAKE MOLDS",
        ctaText:    "VIEW ALL SOLUTIONS",
        ctaHref:    "/products/molds",
      },
      items: [
        { id: "mld-01", refCode: "MLD-01", name: "European Precision Punches",      image: "/images/products/molds/euro-punch.webp",       href: "/products/molds" },
        { id: "mld-02", refCode: "MLD-02", name: "American Style Tooling",          image: "/images/products/molds/american-tooling.webp", href: "/products/molds" },
        { id: "mld-03", refCode: "MLD-03", name: "Acute Angle Dies (20°–30°)",      image: "/images/products/molds/acute-die.webp",        href: "/products/molds" },
        { id: "mld-04", refCode: "MLD-04", name: "Gooseneck Punch Sets",            image: "/images/products/molds/gooseneck.webp",        href: "/products/molds" },
        { id: "mld-05", refCode: "MLD-05", name: "Deflection Compensated Dies",     image: "/images/products/molds/compensated-die.webp",  href: "/products/molds" },
        { id: "mld-06", refCode: "MLD-06", name: "OEM Custom Tooling Profiles",     image: "/images/products/molds/custom-tooling.webp",   href: "/products/molds" },
      ],
    },
  ],
};

export const INDUSTRY_MENU_DATA: MegaMenuData = {
  columnLabel:    "INDUSTRIES",
  bottomLinkText: "→ BROWSE ALL TOOLING",
  bottomLinkHref: "/products/blades",
  categories: [
    {
      id: "plastics",
      title: "PLASTICS RECYCLING",
      featured: {
        coverImage: "/images/applications/plastic-industry/hero.webp",
        subtitle:   "ACTIVE INDUSTRY",
        title:      "PLASTICS RECYCLING",
        ctaText:    "EXPLORE INDUSTRY PAGE",
        ctaHref:    "/industry/plastics-recycling",
      },
      items: [
        { id: "plr-01", refCode: "PLR-01", name: "Single-Shaft Shredder Blades",    image: "/images/applications/plastic-industry/single-shredder-blades-001-w1200.webp", href: "/products/blades" },
        { id: "plr-02", refCode: "PLR-02", name: "Twin-Shaft Shredder Knives",      image: "/images/applications/plastic-industry/single-shredder-blades-010.webp",        href: "/products/blades" },
        { id: "plr-03", refCode: "PLR-03", name: "Granulator Rotor Knives",         image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "plr-04", refCode: "PLR-04", name: "Granulator Bed Knives",           image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "plr-05", refCode: "PLR-05", name: "Underwater Pelletizer Hob Cuts",  image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
        { id: "plr-06", refCode: "PLR-06", name: "Strand Pelletizer Cutter Blades", image: "/images/applications/plastic-industry/blades.webp",                             href: "/products/blades" },
      ],
    },
    {
      id: "metal",
      title: "METAL PROCESSING",
      featured: {
        coverImage: "/images/applications/metal-industry/hero.webp",
        subtitle:   "ACTIVE INDUSTRY",
        title:      "METAL PROCESSING",
        ctaText:    "EXPLORE INDUSTRY PAGE",
        ctaHref:    "/industry/metal-processing",
      },
      items: [
        { id: "met-01", refCode: "MET-01", name: "Circular Slitter Knives",         image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife" },
        { id: "met-02", refCode: "MET-02", name: "Tungsten Carbide Slitter Discs",  image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife" },
        { id: "met-03", refCode: "MET-03", name: "HSS Slitter Knives",              image: "/images/products/blades/11-6-2_metal-slitter-knife.webp", href: "/products/blades/metal-slitter-knife" },
        { id: "met-04", refCode: "MET-04", name: "Guillotine Shear Blades",         image: "/images/applications/metal-industry/shear-blades.webp",   href: "/products/blades/metal-slitter-knife" },
        { id: "met-05", refCode: "MET-05", name: "Flying Shear Blades",             image: "/images/applications/metal-industry/shear-blades.webp",   href: "/products/blades/metal-slitter-knife" },
        { id: "met-06", refCode: "MET-06", name: "Precision Punch & Die Sets",      image: "/images/applications/metal-industry/punch-die.webp",      href: "/products/blades/metal-slitter-knife" },
      ],
    },
    {
      id: "paper",
      title: "PAPER & TISSUE",
      featured: {
        coverImage: "/images/applications/paper-industry/hero.webp",
        subtitle:   "ACTIVE INDUSTRY",
        title:      "PAPER & TISSUE",
        ctaText:    "EXPLORE INDUSTRY PAGE",
        ctaHref:    "/industry/paper-tissue",
      },
      items: [
        { id: "pap-01", refCode: "PAP-01", name: "Tissue Log Saw Blades",           image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "pap-02", refCode: "PAP-02", name: "Napkin Paper Log Saw Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "pap-03", refCode: "PAP-03", name: "TTB / TTBF Log Saw Blades",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "pap-04", refCode: "PAP-04", name: "Surface Rewinder Knives",         image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "pap-05", refCode: "PAP-05", name: "Rewinder Perforation Blades",     image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
        { id: "pap-06", refCode: "PAP-06", name: "Crush-Cut Slitting Knives",       image: "/images/products/blades/tissue-log-saw-blades.webp", href: "/products/blades/tissue-log-saw-blades" },
      ],
    },
  ],
};

// ── Animation Variants ─────────────────────────────────────────────────────────

const GRID_VARIANTS = {
  enter:  { opacity: 0, y: 10 },
  center: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 45 },
  },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.1, ease: "easeIn" } },
};

const FEATURED_VARIANTS = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit:   { opacity: 0, transition: { duration: 0.1 } },
};

// ── Component ──────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  data:    MegaMenuData;
  onClose: () => void;
}

export default function MegaMenu({ data, onClose }: MegaMenuProps) {
  const [activeId, setActiveId] = useState<string>(data.categories[0].id);
  const active = data.categories.find((c) => c.id === activeId) ?? data.categories[0];

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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex py-7">

        {/* ── Column 1: Category Index (20%) ───────────────────────────── */}
        <div className="w-[20%] flex-shrink-0 flex flex-col">

          <p className="font-mono text-[9px] text-slate-300 uppercase tracking-[0.2em] mb-4 pl-4">
            {data.columnLabel}
          </p>

          <div className="flex-1">
            {data.categories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <Link key={cat.id} href={cat.featured.ctaHref}>
                  <div
                    onMouseEnter={() => setActiveId(cat.id)}
                    onClick={onClose}
                    className={`w-full text-left py-3 pl-4 border-l-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-150 cursor-pointer ${
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
          </div>

        </div>

        {/* ── Column 2: High-Density Matrix (55%) ──────────────────────── */}
        <div className="w-[55%] flex-shrink-0 border-x border-slate-200 px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "-grid"}
              variants={GRID_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-3 gap-x-6 gap-y-8"
            >
              {active.items.map((item) => (
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
                    <p className="font-black text-[11px] uppercase leading-tight text-[#001f4d] group-hover:text-[#003366] transition-colors">
                      {item.name}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Column 3: Featured Viewport (25%) ────────────────────────── */}
        <div className="w-[25%] flex-shrink-0 pl-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "-featured"}
              variants={FEATURED_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
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
                  <p className="font-mono text-[9px] text-white/70 uppercase tracking-[0.25em] mb-1.5">
                    {active.featured.subtitle}
                  </p>
                  <p className="font-black text-xl text-white uppercase leading-tight tracking-tight">
                    {active.featured.title}
                  </p>
                </div>
              </div>

              {/* Status strip */}
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-4">
                ■ ISO 9001:2015 · CMM VERIFIED
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
