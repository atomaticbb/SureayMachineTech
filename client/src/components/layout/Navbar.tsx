/*
 * Navbar.tsx — Swiss Brutalist Navigation
 *
 * Desktop: Industrial Blades ▾ · Mixer Wear Parts ▾ · News · About · Contact · CTA
 * Mobile:  MobileNavigation provides the header and full-screen menu
 *
 * Two product mega menus:
 *   Industrial Blades — blade categories by type (icon + name + top variants)
 *   Mixer Wear Parts  — plant-type nav + part grid + scene image (parallel line)
 * Industry is surfaced on the homepage, not in the nav.
 * Data: getCategories / getBlades (locales) + mixerParts.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import Link from "@/components/common/SiteLink";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  getBlades,
  getCategories,
  getMixerCategories,
  getMixerPartsByCategory,
} from "@/data/locales";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "@/lib/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNavigation from "./MobileNavigation";
import type { Blade } from "@/data/blades";

// Categories with a dedicated, curated 4:3 nav thumbnail
// (client/public/images/categories/*-nav.webp). All other categories keep
// showing their first product's own photo, as before.
const CURATED_ICON_SLUGS = new Set([
  "slitter-knives",
  "shredder-blades",
  "shear-blades",
  "paper-cutting-knives",
  "other-custom-blades",
]);

function categoryThumbnail(
  slug: string,
  heroImage: string,
  firstBlade: Blade | undefined
) {
  if (CURATED_ICON_SLUGS.has(slug)) return heroImage;
  if (
    firstBlade?.imageDimensions?.smallerWidths.includes(320) &&
    firstBlade.image.endsWith(".webp")
  ) {
    return firstBlade.image.replace(/\.webp$/, "-320w.webp");
  }
  return firstBlade?.image ?? heroImage;
}

// Desktop and mobile order the tail categories differently.
const DESKTOP_CATEGORY_ORDER = [
  "slitter-knives",
  "shredder-blades",
  "log-saw-blades",
  "shear-blades",
  "paper-cutting-knives",
  "wood-chipper-blades",
  "other-custom-blades",
];

const megaMenuHeading = "font-black text-[18px] leading-snug text-[#001f4d] hover:text-[#001f4d]/60 underline-offset-2 hover:underline transition-all cursor-pointer";
const megaMenuItem = "text-[16px] text-muted-foreground hover:text-[#001f4d] hover:translate-x-1 transition-all leading-relaxed py-0.5 cursor-pointer";

function ProductsMegaMenu({ onClose }: { onClose: () => void }) {
  const lang = useLang();
  const { t } = useTranslation();

  const groups = useMemo(() => {
    const categories = getCategories(lang);
    const blades = getBlades(lang);
    const ordered = [...categories].sort(
      (a, b) =>
        DESKTOP_CATEGORY_ORDER.indexOf(a.slug) -
        DESKTOP_CATEGORY_ORDER.indexOf(b.slug)
    );
    return ordered.map(category => {
      const catBlades = blades.filter(b => b.category === category.category);
      return {
        slug: category.slug,
        shortName: category.shortName,
        href: `/categories/${category.slug}`,
        // Curated categories use their dedicated 4:3 nav thumbnail; everything
        // else keeps the original behavior (first product's own photo, falling
        // back to category.heroImage) so untouched categories don't shift.
        icon: categoryThumbnail(category.slug, category.heroImage, catBlades[0]),
        links: catBlades.slice(0, 3),
        hasMore: catBlades.length > 3,
      };
    });
  }, [lang]);

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-none z-50 overflow-hidden">
      <div className="home-content max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-x-6 gap-y-7">
          {groups.map(group => (
            <div key={group.slug} className="flex gap-3 min-w-0 group/card">
              <Link href={group.href}>
                <div
                  onClick={onClose}
                  className="w-[128px] h-[96px] flex-shrink-0 bg-white overflow-hidden cursor-pointer"
                >
                  <img
                    src={group.icon}
                    alt={group.shortName}
                    loading="eager"
                    decoding="async"
                    width={128}
                    height={96}
                    // object-contain (not cover): curated 4:3 thumbnails already
                    // fill the frame exactly, but the other categories still
                    // fall back to a square product photo — contain shows that
                    // in full instead of cropping the top/bottom off a circle.
                    className="w-full h-full object-contain p-1.5 group-hover/card:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={group.href}>
                  <p
                    onClick={onClose}
                    className={`${megaMenuHeading} mb-2`}
                  >
                    {group.shortName}
                  </p>
                </Link>

                {group.links.map(blade => (
                  <Link key={blade.id} href={blade.link}>
                    <div
                      onClick={onClose}
                      className={megaMenuItem}
                    >
                      · {blade.name}
                    </div>
                  </Link>
                ))}
                {group.hasMore && (
                  <Link href={group.href}>
                    <div
                      onClick={onClose}
                      className="mt-1.5 inline-flex items-center gap-1 text-[16px] font-bold text-[#003366] hover:text-[#001f4d] hover:gap-1.5 transition-all cursor-pointer"
                    >
                      {t("navbar.viewAll")}
                      <ChevronRight
                        className="w-3.5 h-3.5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </Link>
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
              className="inline-flex items-center gap-1 font-sans text-[14px] font-bold tracking-[0.15em] text-[#003366] hover:text-[#001f4d] transition-colors cursor-pointer "
            >
              {t("cta.viewAllProducts")}
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
  const { t, lang } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const mixerCategories = getMixerCategories(lang);
  const active = mixerCategories[activeIdx];
  const parts = getMixerPartsByCategory(active.category, lang);
  const scene = `/images/mixer-parts/hero/${active.id}-scene.webp`;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] border-b border-slate-200 shadow-none z-50 overflow-hidden">
      <div className="home-content max-w-7xl mx-auto px-6 sm:px-8 py-7 flex gap-0">
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
                    className={`flex items-center gap-2 py-2 px-3 border-l-2 transition-colors duration-150 group ${
                      isActive
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d]"
                        : "border-transparent text-muted-foreground hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#001f4d]"
                    }`}
                  >
                    <span className={megaMenuHeading}>
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
              className="mt-5 pl-3 inline-flex items-center gap-1 font-sans text-[14px] font-bold tracking-[0.15em] text-[#003366] hover:text-[#001f4d] transition-colors cursor-pointer "
            >
              {t("navbar.viewAllMixerParts")}
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
                  className="group cursor-pointer"
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
                  <p className={`${megaMenuItem} text-center`}>
                    · {p.name.replace(/^(Concrete|Asphalt)\s+/, "")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Col 3: active plant scene + CTA (28%) ────────────────────── */}
        <div className="w-[28%] flex-shrink-0 flex flex-col justify-center border-l border-slate-200 pl-6">
          <Link href={active.link} className="block w-full">
            <div
              onClick={onClose}
              className="relative aspect-[4/3] overflow-hidden cursor-pointer group bg-slate-100"
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
                <p className="font-black text-[16px] text-white tracking-tight leading-tight">
                  {active.name}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 font-sans text-[12px] text-white/80 tracking-[0.18em]">
                  {t("navbar.browse")} {parts.length} {t("navbar.parts")}
                  <ChevronRight className="w-3 h-3" strokeWidth={2} />
                </p>
              </div>
            </div>
          </Link>
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

  // News / About / Contact — computed per-render so locale changes are reflected.
  const NAV_LINKS = [
    { label: t("nav.news"), path: "/news" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];
  const [productsOpen, setProductsOpen] = useState(false);
  const [mixerOpen, setMixerOpen] = useState(false);
  const productsTrigger = useRef<HTMLButtonElement>(null);
  const mixerTrigger = useRef<HTMLButtonElement>(null);
  const productsMenu = useRef<HTMLDivElement>(null);
  const mixerMenu = useRef<HTMLDivElement>(null);
  const keyboardMenu = useRef<"products" | "mixer" | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const mixerCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastProdClickTime = useRef(0);

  useEffect(() => {
    const target = keyboardMenu.current;
    if ((target === "products" && productsOpen) || (target === "mixer" && mixerOpen)) {
      keyboardMenu.current = null;
      const frame = requestAnimationFrame(() => {
        (target === "products" ? productsMenu : mixerMenu).current
          ?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [productsOpen, mixerOpen]);

  // Hide on scroll-down, reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setHidden(true);
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

  // Preload category thumbnails so the Products dropdown is instant.
  // Mirrors the icon source logic in ProductsMegaMenu above.
  useEffect(() => {
    const allBlades = getBlades(lang);
    categories.forEach(cat => {
      const src = categoryThumbnail(
        cat.slug,
        cat.heroImage,
        allBlades.find(b => b.category === cat.category)
      );
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
    `text-[16px] whitespace-nowrap font-semibold transition-colors cursor-pointer ${
      active ? "text-[#003366]" : "text-muted-foreground hover:text-[#003366]"
    }`;

  return (
    <>
      <nav
        data-scroll-hidden={hidden}
        onKeyDown={event => {
          if (event.key !== "Escape") return;
          if (productsOpen) {
            setProductsOpen(false);
            productsTrigger.current?.focus();
          } else if (mixerOpen) {
            setMixerOpen(false);
            mixerTrigger.current?.focus();
          }
        }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setProductsOpen(false);
            setMixerOpen(false);
          }
        }}
        className={`font-nav fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-none transition-transform duration-300 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <MobileNavigation />
        <div className="home-content hidden max-w-[1536px] xl:block mx-auto px-6 sm:px-8 xl:max-2xl:px-5">
          <div className="flex items-center justify-between gap-4 xl:max-2xl:gap-2 h-[74px]">
            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link href="/" className="xl:shrink-0 xl:whitespace-nowrap">
              <div className="flex items-center gap-1 cursor-pointer group">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-16 h-16 xl:max-2xl:size-12 transition-transform duration-200 group-hover:scale-105"
                  width={64}
                  height={64}
                />
                <span className="font-black text-[16px] tracking-[0.12em] text-[#001f4d]  leading-none">
                  SUREAY
                  <span className={lang === "en" ? undefined : "xl:max-2xl:sr-only"}>
                    {" "}MACHINERY
                  </span>
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ────────────────────────────────────────────── */}
            <div className="hidden xl:flex flex-1 items-center gap-2 2xl:gap-4">
              <div className={`flex flex-1 items-center ${lang === "en" ? "justify-end gap-8 pr-4 2xl:gap-10 2xl:pr-6" : "justify-evenly gap-2 2xl:gap-3"}`}>
                {/* Industrial Blades — blade categories + by-industry mega menu */}
                {/* A scrolling header can pass under a stationary pointer. */}
                <div onMouseMove={openProducts} onMouseLeave={closeProducts}>
                  <button
                    ref={productsTrigger}
                    className={`${linkCls(isProductsRoute || productsOpen)} flex items-center gap-1`}
                    aria-expanded={productsOpen}
                    aria-controls="products-mega-menu"
                    onClick={event => {
                      if (event.detail === 0) {
                        if (productsOpen) {
                          productsMenu.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
                        } else {
                          keyboardMenu.current = "products";
                          openProducts();
                        }
                      } else handleProductsClick();
                    }}
                    onDoubleClick={() => {
                      setProductsOpen(false);
                      navigate("/products");
                    }}
                  >
                    {t("nav.industrialBlades")}
                    <ChevronDown
                      className={`w-3 h-3 shrink-0 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                {/* Mixer Wear Parts — parallel business line mega menu */}
                <div onMouseMove={openMixer} onMouseLeave={closeMixer}>
                  <button
                    ref={mixerTrigger}
                    className={`${linkCls(isMixerRoute || mixerOpen)} flex items-center gap-1`}
                    aria-expanded={mixerOpen}
                    aria-controls="mixer-mega-menu"
                    onClick={event => {
                      if (event.detail === 0) {
                        if (mixerOpen) {
                          mixerMenu.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
                        } else {
                          keyboardMenu.current = "mixer";
                          openMixer();
                        }
                      } else {
                        setMixerOpen(false);
                        navigate("/mixer-wear-parts");
                      }
                    }}
                  >
                    {t("nav.mixerWearParts")}
                    <ChevronDown
                      className={`w-3 h-3 shrink-0 transition-transform duration-200 ${mixerOpen ? "rotate-180" : ""}`}
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

              </div>

              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center whitespace-nowrap bg-[#003366] hover:bg-[#001f4d] text-white text-[14px] font-bold tracking-wide px-4 py-2 rounded-none transition-colors duration-200 shadow-none"
              >
                {t("cta.getQuote")}
              </Link>

              <LanguageSwitcher variant="light" />
            </div>

          </div>
        </div>

        <AnimatePresence>
          {productsOpen && (
            <motion.div
              id="products-mega-menu"
              className="hidden xl:block"
              ref={productsMenu}
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
              id="mixer-mega-menu"
              className="hidden xl:block"
              ref={mixerMenu}
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
    </>
  );
}
