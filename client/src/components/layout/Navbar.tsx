/*
 * Navbar.tsx — Swiss Brutalist Navigation
 *
 * Desktop: Home · [PRODUCTS mega-menu] · News · About · Contact · CTA
 * Mobile:  Full-screen drawer with PRODUCTS accordion (By Industry / By Category)
 *
 * Products mega menu — 3-column "Business Board":
 *   Col 1 (22%) — Browse by Industry (icon list, hover changes active industry)
 *   Col 2 (50%) — Product grid: 3 cols × 2 rows = max 6 blade cards (image + ref + name)
 *   Col 3 (28%) — Industry cover image + Upload CAD CTA → /contact
 *
 * All three columns are driven by a single `activeIdx` state.
 * Data source: INDUSTRY_MENU_DATA from MegaMenu.tsx (SSOT).
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Upload,
} from "lucide-react";
import { INDUSTRY_MENU_DATA } from "./MegaMenu";

// ── Static nav links ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "NEWS",       path: "/news"    },
  { label: "ABOUT US",  path: "/about"   },
  { label: "CONTACT US",path: "/contact" },
];

// ── Product category groups for mobile "By Category" panel ───────────────────
const PRODUCT_GROUPS = [
  {
    group: "CUTTING TOOLING",
    items: [
      { label: "Circular Slitting Knives", href: "/products" },
      { label: "Rotary Blades",            href: "/products" },
      { label: "Alloy Steel Blades",       href: "/products" },
    ],
  },
  {
    group: "SHREDDING & RECYCLING",
    items: [
      { label: "Shredder Blades",   href: "/products" },
      { label: "Granulator Knives", href: "/products" },
    ],
  },
  {
    group: "PAPER CONVERTING",
    items: [
      { label: "Tissue Log Saw Blades", href: "/products" },
      { label: "Paper Cutting Blades",  href: "/products" },
    ],
  },
  {
    group: "CUSTOM ENGINEERING",
    items: [
      { label: "Tungsten Carbide Parts", href: "/products" },
      { label: "OEM Tooling Solutions",  href: "/contact"         },
    ],
  },
];

// ── Sharp icons ───────────────────────────────────────────────────────────────
function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <line x1="1"  y1="1"  x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="21" y1="1"  x2="1"  y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

// ── Products Mega Menu ────────────────────────────────────────────────────────
function ProductsMegaMenu({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const categories = INDUSTRY_MENU_DATA.categories;
  const active     = categories[activeIdx];

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-2xl z-50 overflow-hidden">

      {/* Scanner line — sweeps left→right on mount / category switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx + "-scan"}
          className="absolute top-0 left-0 h-[2px] bg-[#003366] pointer-events-none"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7 flex gap-0">

        {/* ── Col 1: Browse by Industry (20%) ──────────────────────────── */}
        <div className="w-[20%] flex-shrink-0 flex flex-col border-r border-slate-200 pr-6">

          <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.28em] mb-4">
            Browse by Industry
          </p>

          <nav className="flex flex-col gap-0.5 flex-1">
            {categories.map((cat, i) => {
              const isActive = i === activeIdx;
              return (
                <Link key={cat.id} href={cat.featured.ctaHref}>
                  <div
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={onClose}
                    className={`flex items-center gap-3 py-3 px-3 border-l-2 transition-all duration-150 cursor-pointer group ${
                      isActive
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d]"
                        : "border-transparent text-slate-500 hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#001f4d]"
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] leading-tight">
                      {cat.title}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 ml-auto flex-shrink-0 transition-opacity ${
                        isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>

          <Link href="/products">
            <div
              onClick={onClose}
              className="mt-5 font-mono text-[11px] font-bold text-[#003366] uppercase tracking-[0.22em] hover:underline cursor-pointer pl-3"
            >
              → All Products
            </div>
          </Link>

        </div>

        {/* ── Col 2: Product Grid 3×2 (54%) ───────────────────────────── */}
        <div className="w-[54%] flex-shrink-0 px-8 border-r border-slate-200">

          <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.28em] mb-4">
            {active.title} — Tooling
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx + "-grid"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 500, damping: 45 }}
              className="grid grid-cols-3 gap-x-5 gap-y-6"
            >
              {active.items.slice(0, 6).map((item) => (
                <Link key={item.id} href={item.href}>
                  <div onClick={onClose} className="group cursor-pointer">

                    {/* Product image — 21:9 slab ratio */}
                    <div className="aspect-[21/9] bg-slate-100 overflow-hidden mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* REF code */}
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
                      {item.refCode}
                    </p>

                    {/* Name */}
                    <p className="font-black text-[12px] uppercase leading-tight text-[#001f4d] group-hover:text-[#003366] transition-colors">
                      {item.name}
                    </p>

                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          <Link href="/products">
            <div
              onClick={onClose}
              className="mt-5 font-mono text-[10px] font-bold text-[#003366] uppercase tracking-[0.22em] hover:underline cursor-pointer"
            >
              → View All {active.title} Blades
            </div>
          </Link>

        </div>

        {/* ── Col 3: Industry Image + CTA (26%) ───────────────────────── */}
        <div className="w-[26%] flex-shrink-0 pl-8 flex flex-col">

          {/* Cover image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx + "-cover"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden flex-shrink-0 mb-4"
            >
              <img
                src={active.featured.coverImage}
                alt={active.featured.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/85 via-[#001f4d]/30 to-transparent" />
              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-mono text-[8px] text-white/55 uppercase tracking-[0.25em] mb-1">
                  {active.featured.subtitle}
                </p>
                <p className="font-black text-[13px] text-white uppercase leading-tight tracking-tight">
                  {active.featured.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Upload CAD CTA */}
          <Link href="/contact">
            <div
              onClick={onClose}
              className="w-full bg-[#001f4d] hover:bg-[#003399] text-white
                         font-mono text-[11px] font-black tracking-[0.18em] uppercase
                         px-4 py-3 rounded-none transition-colors duration-150
                         flex items-center justify-between cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" strokeWidth={2} />
                Upload CAD
              </span>
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </Link>

          {/* Quality strip */}
          <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-3">
            ■ ISO 9001:2015 · CMM VERIFIED
          </p>

        </div>

      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileProdTab, setMobileProdTab] = useState<"industry" | "category">("industry");
  const [hidden,        setHidden]        = useState(false);
  const lastScrollY    = useRef(0);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Hide on scroll-down, reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setHidden(true);
        setMobileOpen(false);
        setMegaOpen(false);
      } else if (y < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Debounced hover handlers
  const openMega  = () => { clearTimeout(megaCloseTimer.current); setMegaOpen(true);  };
  const closeMega = () => { megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  const isActive   = (path: string) => location === path;
  const isProducts = location.startsWith("/products") || location.startsWith("/industry");

  const linkCls = (active: boolean) =>
    `text-[13px] font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer ${
      active ? "text-[#003366]" : "text-slate-500 hover:text-[#003366]"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-transform duration-300 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-[74px]">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link href="/">
              <div className="flex items-center gap-1 cursor-pointer group">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-16 h-16 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-black text-[13px] tracking-[0.12em] text-[#001f4d] uppercase leading-none">
                  SUREAY BLADES
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-7">

              <Link href="/">
                <span className={linkCls(isActive("/"))}>HOME</span>
              </Link>

              {/* Products — unified mega menu trigger */}
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  className={`${linkCls(isProducts || megaOpen)} flex items-center gap-1`}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                >
                  PRODUCTS
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {NAV_LINKS.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className={linkCls(isActive(item.path))}>{item.label}</span>
                </Link>
              ))}

              <Link
                href="/contact"
                className="inline-block bg-[#003366] hover:bg-[#004488] text-white text-[13px] font-black
                           tracking-[0.18em] uppercase px-5 py-2.5 rounded-none transition-colors duration-200 shadow-sm"
              >
                GET A QUOTE
              </Link>

            </div>

            {/* ── Mobile toggle ──────────────────────────────────────────── */}
            <button
              className="md:hidden text-slate-700 hover:text-[#003366] transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon />
            </button>

          </div>
        </div>

        {/* ── Products Mega Menu ─────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <ProductsMegaMenu onClose={() => setMegaOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </nav>

      {/* ── Mobile Full-Screen Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#001f4d] flex flex-col md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.18, 1] }}
          >

            {/* ── Drawer Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 h-[74px] border-b border-white/10 flex-shrink-0">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src="/sureay.svg" alt="Sureay Logo" className="w-12 h-12 brightness-0 invert" />
                  <span className="font-black text-[11px] tracking-[0.12em] text-white uppercase leading-none">
                    SUREAY BLADES
                  </span>
                </div>
              </Link>
              <button
                className="text-white/80 hover:text-white transition-colors p-1"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ── Drawer Nav Body ───────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">

              {/* HOME */}
              <Link href="/">
                <div className="py-5 border-b border-white/10 cursor-pointer group">
                  <span className="text-2xl font-black uppercase tracking-widest text-white group-hover:text-white/70 transition-colors">
                    HOME
                  </span>
                </div>
              </Link>

              {/* ── PRODUCTS accordion ─────────────────────────────────── */}
              <div className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => setMobileProduct((v) => !v)}
                >
                  <span className={`text-2xl font-black uppercase tracking-widest transition-colors ${
                    mobileProduct ? "text-white" : "text-white group-hover:text-white/70"
                  }`}>
                    PRODUCTS
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                      mobileProduct ? "rotate-180 text-white" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileProduct && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >

                      {/* Tab switcher */}
                      <div className="flex mb-4 border border-white/20">
                        {(["industry", "category"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setMobileProdTab(tab)}
                            className={`flex-1 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                              mobileProdTab === tab
                                ? "bg-white text-[#001f4d]"
                                : "text-white/50 hover:text-white"
                            }`}
                          >
                            {tab === "industry" ? "By Industry" : "By Category"}
                          </button>
                        ))}
                      </div>

                      {/* By Industry panel — sourced from INDUSTRY_MENU_DATA */}
                      {mobileProdTab === "industry" && (
                        <div className="pb-5">
                          {INDUSTRY_MENU_DATA.categories.map((cat) => {
                            return (
                              <Link key={cat.id} href={cat.featured.ctaHref}>
                                <div className="flex items-center gap-3 py-2.5 pl-4 border-l border-white/20 text-[13px] font-semibold tracking-[0.1em] uppercase text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                                  {cat.title}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}

                      {/* By Category panel */}
                      {mobileProdTab === "category" && (
                        <div className="pb-5">
                          {PRODUCT_GROUPS.map((group) => (
                            <div key={group.group} className="mb-5">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 pl-4 border-l border-white/20">
                                {group.group}
                              </p>
                              {group.items.map((item) => (
                                <Link key={item.label} href={item.href}>
                                  <div className="py-2 pl-4 border-l border-white/20 text-[13px] font-semibold tracking-[0.1em] uppercase text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                                    {item.label}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Upload CAD shortcut */}
                      <Link href="/contact">
                        <div className="mb-5 flex items-center gap-2 pl-4 border-l-2 border-white/40 text-[11px] font-black tracking-[0.18em] uppercase text-white/50 hover:text-white hover:border-white transition-colors cursor-pointer">
                          <Upload className="w-3 h-3" strokeWidth={2} />
                          Upload CAD →
                        </div>
                      </Link>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static links */}
              {NAV_LINKS.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div className="py-5 border-b border-white/10 cursor-pointer group">
                    <span className="text-2xl font-black uppercase tracking-widest text-white group-hover:text-white/70 transition-colors">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}

            </div>

            {/* ── Drawer Footer CTA ─────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 py-6 border-t border-white/10">
              <Link href="/contact">
                <div className="w-full bg-white text-[#001f4d] text-[13px] font-black tracking-[0.22em] uppercase py-4 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                  GET A QUOTE
                </div>
              </Link>
              <p className="mt-4 font-mono text-[10px] text-white/25 uppercase tracking-[0.2em] text-center">
                ■ ISO 9001:2015 · CMM VERIFIED
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
