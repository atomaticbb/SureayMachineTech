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
import { ChevronDown, ChevronRight, Upload } from "lucide-react";
import { INDUSTRY_MENU_DATA } from "./MegaMenu";
import { BLADE_CATEGORIES } from "../../data/blade-categories";
import { blades } from "../../data/blades";

// ── Static nav links ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "News", path: "/news" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

// ── Sharp icons ───────────────────────────────────────────────────────────────
function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="1"
        x2="22"
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <line
        x1="0"
        y1="8"
        x2="22"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <line
        x1="0"
        y1="15"
        x2="22"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="1"
        y1="1"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <line
        x1="21"
        y1="1"
        x2="1"
        y2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

// ── Products Category Menu — flat 4×2 image grid, scan-and-click, no drilldown
//   Designed to contrast with IndustryMegaMenu (drill-down). All 8 categories
//   are visible at first glance; the image is the primary identifier — users
//   recognise blade families by silhouette, not by typed taxonomy.
function ProductsCategoryMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-2xl z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="products-scan"
          className="absolute top-0 left-0 h-[2px] bg-[#003366] pointer-events-none"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7">
        {/* Header strip */}
        <div className="flex items-end justify-between mb-5 pb-4 border-b border-slate-200">
          <div>
            <p className="font-mono text-[12px] font-bold text-slate-700 tracking-[0.18em] mb-1">
              Browse by Product Type
            </p>
          </div>
          <Link href="/products">
            <a
              onClick={onClose}
              className="font-mono text-[14px] font-bold text-[#003366] tracking-[0.18em] hover:text-[#001f4d] cursor-pointer"
            >
              → All Products
            </a>
          </Link>
        </div>

        {/* 4×2 image-led card grid */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="grid grid-cols-4 gap-x-4 gap-y-5"
        >
          {BLADE_CATEGORIES.map(c => {
            const variantCount = blades.filter(
              b => b.category === c.category
            ).length;
            return (
              <Link key={c.slug} href={c.slug === "custom-profile" ? "/custom" : `/categories/${c.slug}`}>
                <a
                  onClick={onClose}
                  className="group cursor-pointer text-center"
                >
                  <div className="w-36 h-32 mx-auto bg-slate-100 overflow-hidden mb-2">
                    <img
                      src={c.heroImage}
                      alt={c.shortName}
                      loading="lazy"
                      decoding="async"
                      width={144}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-black text-[14px] leading-tight text-[#001f4d] group-hover:text-[#003366] tracking-tight transition-colors">
                    {c.shortName}
                    <span className="ml-1.5 font-mono text-[12px] font-normal text-slate-600">
                      · {variantCount} products
                    </span>
                  </p>
                </a>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

// ── Industry Mega Menu (sector-grouped product image grid) ──────────────────
function IndustryMegaMenu({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const categories = INDUSTRY_MENU_DATA.categories;
  const active = categories[activeIdx];

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
          <p className="font-mono text-[12px] font-bold text-slate-700 tracking-[0.18em] mb-4">
            Browse by Industry
          </p>

          <nav className="flex flex-col gap-0.5 flex-1">
            {categories.map((cat, i) => {
              const isActive = i === activeIdx;
              const isCustom = cat.id === "custom-profile";
              return (
                <Link key={cat.id} href={cat.featured.ctaHref}>
                  <div
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={onClose}
                    className={`flex items-center gap-3 py-3 px-3 border-l-2 transition-all duration-150 cursor-pointer group ${
                      isCustom ? "mt-1 border-t border-slate-100 pt-4" : ""
                    } ${
                      isActive
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d]"
                        : "border-transparent text-slate-500 hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#001f4d]"
                    }`}
                  >
                    <span className={`text-[12px] font-bold tracking-[0.12em] leading-tight ${isCustom ? "font-black" : ""}`}>
                      {cat.title}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 ml-auto flex-shrink-0 transition-opacity ${
                        isActive
                          ? "opacity-60"
                          : "opacity-0 group-hover:opacity-40"
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
              className="mt-5 font-mono text-[14px] font-bold text-[#003366] tracking-[0.22em] hover:underline cursor-pointer pl-3"
            >
              → All Products
            </div>
          </Link>
        </div>

        {/* ── Col 2: Product Grid or Custom Large Image ───────────────── */}
        <div className="flex-1 min-w-0 px-8">
          <AnimatePresence mode="wait">
            {active.id === "custom-profile" ? (
              <motion.div
                key="custom-profile-image"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 500, damping: 45 }}
                className="flex gap-5 h-80"
              >
                {/* Left: hero image + title below */}
                <Link href="/custom" className="flex-1 min-w-0 flex flex-col">
                  <div
                    onClick={onClose}
                    className="relative flex-1 overflow-hidden cursor-pointer group bg-white"
                  >
                    <img
                      src="/images/products/blades/special-shaped-knife.webp"
                      alt="Special-Shaped & Custom Profile Blades"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent" />
                  </div>
                  <p
                    onClick={onClose}
                    className="font-black text-[14px] text-[#001f4d] tracking-tight leading-tight pt-2 text-center"
                  >
                    Special-Shaped &amp; Custom Profile Blades
                  </p>
                </Link>

                {/* Right: profile types */}
                <div className="w-[25%] flex-shrink-0 flex flex-col pl-4">
                  <p className="font-mono text-[12px] text-slate-400 tracking-[0.28em] mb-2">
                    Profile Types
                  </p>
                  {[
                    "Straight — Single/Double Bevel",
                    "Circular Disc (Any OD/ID)",
                    "Serrated & Perforated Edge",
                    "Multi-Step & Shoulder Profile",
                    "Asymmetric Cross-Section",
                    "Hook & Hook-Tooth Forms",
                    "Conical & Tapered Profile",
                    "Carbide-Tipped Composite",
                  ].map(p => (
                    <div
                      key={p}
                      className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="w-[3px] h-3 bg-[#001f4d] flex-shrink-0" />
                      <span className="text-[12px] text-slate-600 leading-tight">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeIdx + "-grid"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 500, damping: 45 }}
                className="grid grid-cols-4 gap-x-4 gap-y-4"
              >
                {active.items.slice(0, 8).map(item => (
                  <Link key={item.id} href={item.href}>
                    <div
                      onClick={onClose}
                      className="group cursor-pointer text-center"
                    >
                      <div className="w-36 h-32 mx-auto bg-slate-100 overflow-hidden mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          width={144}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="font-black text-[14px] leading-tight text-[#001f4d] group-hover:text-[#003366] transition-colors text-center">
                        {item.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileIndustry, setMobileIndustry] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const industryCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastProdClickTime = useRef(0);
  const lastIndClickTime = useRef(0);

  // Hide on scroll-down, reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setHidden(true);
        setMobileOpen(false);
        setProductsOpen(false);
        setIndustryOpen(false);
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Debounced hover handlers — Products (categories) dropdown
  const openProducts = () => {
    clearTimeout(productsCloseTimer.current);
    clearTimeout(industryCloseTimer.current);
    setIndustryOpen(false);
    setProductsOpen(true);
  };
  const closeProducts = () => {
    productsCloseTimer.current = setTimeout(
      () => setProductsOpen(false),
      120
    );
  };

  // Debounced hover handlers — Industry mega menu
  const openIndustry = () => {
    clearTimeout(industryCloseTimer.current);
    clearTimeout(productsCloseTimer.current);
    setProductsOpen(false);
    setIndustryOpen(true);
  };
  const closeIndustry = () => {
    industryCloseTimer.current = setTimeout(
      () => setIndustryOpen(false),
      120
    );
  };

  const handleProductsClick = () => {
    const now = Date.now();
    if (now - lastProdClickTime.current < 300) {
      setProductsOpen(false);
      navigate("/products");
    }
    lastProdClickTime.current = now;
  };

  const handleIndustryClick = () => {
    const now = Date.now();
    if (now - lastIndClickTime.current < 300) {
      setIndustryOpen(false);
      navigate("/converting-industry");
    }
    lastIndClickTime.current = now;
  };

  const isActive = (path: string) => location === path;
  const isProductsRoute =
    location.startsWith("/products") || location.startsWith("/categories");
  const isIndustryRoute =
    location.endsWith("-industry") || location === "/custom";

  const linkCls = (active: boolean) =>
    `text-[14px] font-medium transition-colors cursor-pointer ${
      active ? "text-[#003366]" : "text-slate-500 hover:text-[#003366]"
    }`;

  return (
    <>
      <nav
        className={`font-nav fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-transform duration-300 ease-in-out ${
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
                  width={64}
                  height={64}
                />
                <span className="font-black text-[14px] tracking-[0.12em] text-[#001f4d]  leading-none">
                  SUREAY BLADES
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/">
                <span className={linkCls(isActive("/"))}>Home</span>
              </Link>

              {/* Products — category aggregation dropdown */}
              <div onMouseEnter={openProducts} onMouseLeave={closeProducts}>
                <button
                  className={`${linkCls(isProductsRoute || productsOpen)} flex items-center gap-1`}
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                  onClick={handleProductsClick}
                  onDoubleClick={() => {
                    setProductsOpen(false);
                    navigate("/products");
                  }}
                >
                  Products
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {/* Industry — sector-grouped product mega menu */}
              <div onMouseEnter={openIndustry} onMouseLeave={closeIndustry}>
                <button
                  className={`${linkCls(isIndustryRoute || industryOpen)} flex items-center gap-1`}
                  aria-haspopup="true"
                  aria-expanded={industryOpen}
                  onClick={handleIndustryClick}
                >
                  Industry
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${industryOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {NAV_LINKS.map(item => (
                <Link key={item.path} href={item.path}>
                  <span className={linkCls(isActive(item.path))}>
                    {item.label}
                  </span>
                </Link>
              ))}

              <Link
                href="/contact"
                className="inline-block bg-[#003366] hover:bg-[#001f4d] text-white text-[12px] font-bold tracking-wide px-4 py-2 rounded-none transition-colors duration-200 shadow-sm"
              >
                GET A QUOTE
              </Link>
            </div>

            {/* ── Mobile toggle ──────────────────────────────────────────── */}
            <button
              className="md:hidden text-slate-700 hover:text-[#003366] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        {/* ── Products Category Dropdown ─────────────────────────────────── */}
        <AnimatePresence>
          {productsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              <ProductsCategoryMenu
                onClose={() => setProductsOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Industry Mega Menu ─────────────────────────────────────────── */}
        <AnimatePresence>
          {industryOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={openIndustry}
              onMouseLeave={closeIndustry}
            >
              <IndustryMegaMenu onClose={() => setIndustryOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile Full-Screen Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="font-nav fixed inset-0 z-[60] bg-[#001f4d] flex flex-col md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.18, 1] }}
          >
            {/* ── Drawer Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 h-[74px] border-b border-white/10 flex-shrink-0">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src="/sureay-logo.svg"
                    alt="Sureay Logo"
                    className="w-16 h-16 brightness-0 invert"
                    width={64}
                    height={64}
                  />
                  <span className="font-black text-[11px] tracking-[0.12em] text-white  leading-none">
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
                  <span className="text-2xl font-black  tracking-widest text-white group-hover:text-white/70 transition-colors">
                    Home
                  </span>
                </div>
              </Link>

              {/* ── PRODUCTS accordion (8 category aggregation pages) ───── */}
              <div className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => setMobileProduct(v => !v)}
                >
                  <span
                    className={`text-2xl font-black  tracking-widest transition-colors ${
                      mobileProduct
                        ? "text-white"
                        : "text-white group-hover:text-white/70"
                    }`}
                  >
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
                      <div className="pb-5">
                        {BLADE_CATEGORIES.map(c => (
                          <Link key={c.slug} href={c.slug === "custom-profile" ? "/custom" : `/categories/${c.slug}`}>
                            <div className="flex items-center gap-3 py-2.5 pl-4 border-l border-white/20 text-[13px] font-semibold tracking-[0.1em]  text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                              {c.shortName}
                            </div>
                          </Link>
                        ))}
                        <Link href="/products">
                          <div className="mt-3 ml-4 font-mono text-[10px] font-bold tracking-[0.22em]  text-white/40 hover:text-white cursor-pointer">
                            → All Variants
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── INDUSTRY accordion (sector landing pages) ──────────── */}
              <div className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => setMobileIndustry(v => !v)}
                >
                  <span
                    className={`text-2xl font-black  tracking-widest transition-colors ${
                      mobileIndustry
                        ? "text-white"
                        : "text-white group-hover:text-white/70"
                    }`}
                  >
                    INDUSTRY
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                      mobileIndustry ? "rotate-180 text-white" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileIndustry && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5">
                        {INDUSTRY_MENU_DATA.categories.map(cat => {
                          const isCustom = cat.id === "custom-profile";
                          return (
                            <Link key={cat.id} href={cat.featured.ctaHref}>
                              <div className={`flex items-center gap-3 py-2.5 pl-4 border-l text-[13px] font-semibold tracking-[0.1em]  transition-colors cursor-pointer ${
                                isCustom
                                  ? "mt-1 border-l-2 border-white/40 font-black text-white/80 hover:text-white hover:border-white"
                                  : "border-white/20 text-white/60 hover:text-white hover:border-white/60"
                              }`}>
                                {cat.title}
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Upload CAD shortcut */}
                      <Link href="/contact">
                        <div className="mb-5 flex items-center gap-2 pl-4 border-l-2 border-white/40 text-[11px] font-black tracking-[0.18em]  text-white/50 hover:text-white hover:border-white transition-colors cursor-pointer">
                          <Upload className="w-3 h-3" strokeWidth={2} />
                          Upload CAD →
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static links */}
              {NAV_LINKS.map(item => (
                <Link key={item.path} href={item.path}>
                  <div className="py-5 border-b border-white/10 cursor-pointer group">
                    <span className="text-2xl font-black  tracking-widest text-white group-hover:text-white/70 transition-colors">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Drawer Footer CTA ─────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 py-6 border-t border-white/10">
              <Link href="/contact">
                <div className="w-full bg-white text-[#001f4d] text-[13px] font-black tracking-[0.22em]  py-4 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                  GET A QUOTE
                </div>
              </Link>
              <p className="mt-4 font-mono text-[10px] text-white/25  tracking-[0.2em] text-center">
                ■ ISO 9001:2015 · CMM VERIFIED
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
