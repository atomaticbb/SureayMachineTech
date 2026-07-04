/*
 * Navbar.tsx — Swiss Brutalist Navigation
 *
 * Desktop: Industrial Blades ▾ · Mixer Wear Parts ▾ · News · About · Contact · CTA
 * Mobile:  Full-screen drawer with matching accordions
 *
 * Two product mega menus:
 *   Industrial Blades — blade categories by type (icon + name + top variants)
 *   Mixer Wear Parts  — plant-type nav + part grid + scene image (parallel line)
 * Industry is surfaced on the homepage, not in the nav.
 * Data: getCategories / getBlades (locales) + mixerParts.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getBlades, getCategories } from "@/data/locales";
import { mixerCategories, getMixerPartsByCategory } from "@/data/mixerParts";
import { TRUST_ITEMS } from "@/data/mixerContent";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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

function ProductsMegaMenu({ onClose }: { onClose: () => void }) {
  const lang = useLang();

  const groups = useMemo(() => {
    const categories = getCategories(lang);
    const blades = getBlades(lang);
    const custom = categories.find(c => c.slug === "custom-profile");
    const ordered = [
      ...categories.filter(c => c.slug !== "custom-profile"),
      ...(custom ? [custom] : []),
    ];
    return ordered.map(category => {
      const catBlades = blades.filter(b => b.category === category.category);
      return {
        slug: category.slug,
        shortName: category.shortName,
        href:
          category.slug === "custom-profile"
            ? "/custom"
            : `/categories/${category.slug}`,
        icon: catBlades[0]?.image ?? category.heroImage,
        links: catBlades.slice(0, 3),
        hasMore: catBlades.length > 3,
      };
    });
  }, [lang]);

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-2xl z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-x-5 gap-y-7">
          {groups.map(group => (
            <div key={group.slug} className="flex gap-3 min-w-0 group/card">
              <Link href={group.href}>
                <div
                  onClick={onClose}
                  className="w-[100px] h-[100px] flex-shrink-0 bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={group.icon}
                    alt={group.shortName}
                    loading="eager"
                    decoding="async"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={group.href}>
                  <p
                    onClick={onClose}
                    className="font-black text-[15px] leading-snug text-[#001f4d] hover:text-[#001f4d]/60 underline-offset-2 hover:underline transition-all cursor-pointer mb-2"
                  >
                    {group.shortName}
                  </p>
                </Link>

                {group.slug === "custom-profile" ? (
                  <Link href="/contact">
                    <div
                      onClick={onClose}
                      className="text-[14px] text-slate-500 hover:text-[#001f4d] hover:translate-x-1 transition-all leading-relaxed py-0.5 cursor-pointer whitespace-nowrap"
                    >
                      Upload CAD
                    </div>
                  </Link>
                ) : (
                  <>
                    {group.links.map(blade => (
                      <Link key={blade.id} href={`/products/${blade.id}`}>
                        <div
                          onClick={onClose}
                          className="text-[14px] text-slate-500 hover:text-[#001f4d] hover:translate-x-1 transition-all leading-relaxed py-0.5 cursor-pointer whitespace-nowrap"
                        >
                          ·{" "}
                          {/* menu-only short label; product page keeps full name */}
                          {blade.id === "wood-chipper-blades-industrial"
                            ? "Industrial Chipper Blades"
                            : blade.name}
                        </div>
                      </Link>
                    ))}
                    {group.hasMore && (
                      <Link href={group.href}>
                        <div
                          onClick={onClose}
                          className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-[#003366] hover:text-[#001f4d] hover:gap-1.5 transition-all cursor-pointer"
                        >
                          View all
                          <ChevronRight
                            className="w-3.5 h-3.5"
                            strokeWidth={2.5}
                          />
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link — View All Products */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-right">
          <Link href="/products">
            <span
              onClick={onClose}
              className="inline-flex items-center gap-1 font-mono text-[11px] font-bold tracking-[0.15em] text-[#003366] hover:text-[#001f4d] transition-colors cursor-pointer uppercase"
            >
              View All Products
              <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Mixer Wear Parts mega menu (Industry-style: plant-type nav + grid + image) ──
function MixerMenu({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = mixerCategories[activeIdx];
  const parts = getMixerPartsByCategory(active.category);
  const scene = `/images/mixer-parts/hero/${active.id}-scene.webp`;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-2xl z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7 flex gap-0">
        {/* ── Col 1: Browse by plant type (20%) ────────────────────────── */}
        <div className="w-[24%] flex-shrink-0 flex flex-col border-r border-slate-200 pr-5">
          <nav className="flex flex-col gap-0.5 flex-1">
            {mixerCategories.map((cat, i) => {
              const isActive = i === activeIdx;
              return (
                <Link key={cat.id} href={cat.link}>
                  <div
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={onClose}
                    className={`flex items-center gap-2 py-3 px-3 border-l-2 transition-all duration-150 cursor-pointer group ${
                      isActive
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d]"
                        : "border-transparent text-slate-500 hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#001f4d]"
                    }`}
                  >
                    <span className="text-[14px] font-bold leading-tight whitespace-nowrap">
                      {cat.name}
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
          <Link href="/mixer-wear-parts">
            <div
              onClick={onClose}
              className="mt-5 pl-3 inline-flex items-center gap-1 font-mono text-[11px] font-bold tracking-[0.15em] text-[#003366] hover:text-[#001f4d] transition-colors cursor-pointer uppercase"
            >
              View All Mixer Parts
              <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        {/* ── Col 2: Part grid for the active plant type ───────────────── */}
        <div className="flex-1 min-w-0 px-8">
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            {parts.map(p => (
              <Link key={p.id} href={p.link}>
                <div
                  onClick={onClose}
                  className="group cursor-pointer text-center"
                >
                  <div className="w-full aspect-[4/3] bg-slate-50 overflow-hidden mb-2 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-black text-[13px] leading-tight text-[#001f4d] group-hover:text-[#003366] transition-colors text-center">
                    {p.name.replace(/^(Concrete|Asphalt)\s+/, "")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Col 3: active plant scene + CTA (28%) ────────────────────── */}
        <div className="w-[28%] flex-shrink-0 flex flex-col border-l border-slate-200 pl-6">
          <Link href={active.link} className="flex-1 flex flex-col">
            <div
              onClick={onClose}
              className="relative flex-1 min-h-[180px] overflow-hidden cursor-pointer group bg-slate-100"
            >
              <img
                src={scene}
                alt={active.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001f4d]/85 via-[#001f4d]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-black text-[14px] text-white tracking-tight leading-tight">
                  {active.name}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] text-white/80 tracking-[0.18em]">
                  Browse {parts.length} parts
                  <ChevronRight className="w-3 h-3" strokeWidth={2} />
                </p>
              </div>
            </div>
          </Link>
          <p className="mt-3 font-mono text-[10px] text-slate-400 tracking-[0.15em] leading-relaxed">
            ■ {TRUST_ITEMS.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { t, lang } = useTranslation();
  const categories = getCategories(lang);
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // News / About / Contact — computed per-render so locale changes are reflected.
  const NAV_LINKS = [
    { label: t("nav.news"), path: "/news" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];
  const [productsOpen, setProductsOpen] = useState(false);
  const [mixerOpen, setMixerOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileMixer, setMobileMixer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const mixerCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastProdClickTime = useRef(0);

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
        setMixerOpen(false);
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

  // Preload product card images so the Products dropdown is instant
  useEffect(() => {
    const allBlades = getBlades(lang);
    categories.forEach(cat => {
      const src =
        allBlades.find(b => b.category === cat.category)?.image ??
        cat.heroImage;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [lang, categories]);

  // Debounced hover handlers — Industrial Blades mega menu
  const openProducts = () => {
    clearTimeout(productsCloseTimer.current);
    clearTimeout(mixerCloseTimer.current);
    setMixerOpen(false);
    setProductsOpen(true);
  };
  const closeProducts = () => {
    productsCloseTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };

  // Debounced hover handlers — Mixer Wear Parts dropdown
  const openMixer = () => {
    clearTimeout(mixerCloseTimer.current);
    clearTimeout(productsCloseTimer.current);
    setProductsOpen(false);
    setMixerOpen(true);
  };
  const closeMixer = () => {
    mixerCloseTimer.current = setTimeout(() => setMixerOpen(false), 120);
  };

  const handleProductsClick = () => {
    const now = Date.now();
    if (now - lastProdClickTime.current < 300) {
      setProductsOpen(false);
      navigate("/products");
    }
    lastProdClickTime.current = now;
  };

  const isActive = (path: string) => location === path;
  // Industrial Blades now also owns the blade-industry landing pages.
  const isProductsRoute =
    location.startsWith("/products") ||
    location.startsWith("/categories") ||
    location.endsWith("-industry") ||
    location === "/custom";
  const isMixerRoute = location.startsWith("/mixer-wear-parts");

  const linkCls = (active: boolean) =>
    `text-[16px] font-medium transition-colors cursor-pointer ${
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
                  SUREAY MACHINERY
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-8">
              {/* Industrial Blades — blade categories + by-industry mega menu */}
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
                  Industrial Blades
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {/* Mixer Wear Parts — parallel business line mega menu */}
              <div onMouseEnter={openMixer} onMouseLeave={closeMixer}>
                <button
                  className={`${linkCls(isMixerRoute || mixerOpen)} flex items-center gap-1`}
                  aria-haspopup="true"
                  aria-expanded={mixerOpen}
                  onClick={() => {
                    setMixerOpen(false);
                    navigate("/mixer-wear-parts");
                  }}
                >
                  Mixer Wear Parts
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${mixerOpen ? "rotate-180" : ""}`}
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
                {t("cta.getQuote")}
              </Link>

              <LanguageSwitcher variant="light" />
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
              <ProductsMegaMenu onClose={() => setProductsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mixer Wear Parts Mega Menu ─────────────────────────────────── */}
        <AnimatePresence>
          {mixerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={openMixer}
              onMouseLeave={closeMixer}
            >
              <MixerMenu onClose={() => setMixerOpen(false)} />
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
                    SUREAY MACHINERY
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
              {/* Language switcher — tap-driven dropdown works on touch */}
              <div className="py-3 border-b border-white/10 flex justify-end">
                <LanguageSwitcher variant="dark" />
              </div>

              {/* ── INDUSTRIAL BLADES accordion (categories + by industry) ── */}
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
                    INDUSTRIAL BLADES
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
                        {categories.map(c => (
                          <Link
                            key={c.slug}
                            href={
                              c.slug === "custom-profile"
                                ? "/custom"
                                : `/categories/${c.slug}`
                            }
                          >
                            <div className="flex items-center gap-3 py-2.5 pl-4 border-l border-white/20 text-[13px] font-medium tracking-[0.1em]  text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                              {c.shortName}
                            </div>
                          </Link>
                        ))}

                        <Link href="/products">
                          <div className="mt-3 ml-4 font-mono text-[10px] font-bold tracking-[0.22em]  text-white/40 hover:text-white cursor-pointer">
                            → All Products
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── MIXER WEAR PARTS accordion (parallel business line) ─── */}
              <div className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => setMobileMixer(v => !v)}
                >
                  <span
                    className={`text-2xl font-black  tracking-widest transition-colors ${
                      mobileMixer
                        ? "text-white"
                        : "text-white group-hover:text-white/70"
                    }`}
                  >
                    MIXER WEAR PARTS
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                      mobileMixer ? "rotate-180 text-white" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileMixer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5">
                        {mixerCategories.map(c => (
                          <Link key={c.id} href={c.link}>
                            <div className="flex items-center gap-3 py-2.5 pl-4 border-l border-white/20 text-[13px] font-medium tracking-[0.1em]  text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                              {c.name}
                            </div>
                          </Link>
                        ))}
                        <Link href="/mixer-wear-parts">
                          <div className="mt-3 ml-4 font-mono text-[10px] font-bold tracking-[0.22em]  text-white/40 hover:text-white cursor-pointer">
                            → View All
                          </div>
                        </Link>
                      </div>
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
                  {t("cta.getQuote")}
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
