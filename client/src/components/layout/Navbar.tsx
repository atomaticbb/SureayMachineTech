import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu, { PRODUCTS_MENU_DATA, INDUSTRY_MENU_DATA } from "./MegaMenu";

// ── Static nav links ────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "NEWS",       path: "/news"    },
  { label: "ABOUT US",  path: "/about"   },
  { label: "CONTACT US",path: "/contact" },
];

// ── Sharp hamburger icon (square linecaps, brutalist) ───────────────────────────
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
      <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

// ── Sharp close icon (square linecaps) ──────────────────────────────────────────
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
      <line x1="1"  y1="1"  x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="21" y1="1"  x2="1"  y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [megaOpen,       setMegaOpen]       = useState(false);
  const [industryOpen,   setIndustryOpen]   = useState(false);
  const [mobileProduct,  setMobileProduct]  = useState(false);
  const [mobileIndustry, setMobileIndustry] = useState(false);
  const [hidden,         setHidden]         = useState(false);
  const lastScrollY    = useRef(0);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const industryTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Hide navbar on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setHidden(true);
        setMobileOpen(false);
        setMegaOpen(false);
        setIndustryOpen(false);
      } else if (y < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Debounced hover handlers to avoid flicker
  const openMega  = () => { clearTimeout(megaCloseTimer.current); setMegaOpen(true);  };
  const closeMega = () => { megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  const openIndustry  = () => { clearTimeout(industryTimer.current); setIndustryOpen(true);  };
  const closeIndustry = () => { industryTimer.current = setTimeout(() => setIndustryOpen(false), 120); };

  const isActive   = (path: string) => location === path;
  const isIndustry = location.startsWith("/industry");
  const isProducts = location.startsWith("/products");

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

            {/* ── Logo ─────────────────────────────────────────────────── */}
            <Link href="/">
              <div className="flex items-center gap-1 cursor-pointer group">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-16 h-16 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-black text-[13px] tracking-[0.12em] text-[#001f4d] uppercase leading-none">
                  SUREAY KNIVES
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-7">

              <Link href="/">
                <span className={linkCls(isActive("/"))}>HOME</span>
              </Link>

              {/* Products — triggers mega menu */}
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button className={`${linkCls(isProducts || megaOpen)} flex items-center gap-1`}>
                  PRODUCTS
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Industry — triggers mega menu */}
              <div onMouseEnter={openIndustry} onMouseLeave={closeIndustry}>
                <button className={`${linkCls(isIndustry || industryOpen)} flex items-center gap-1`}>
                  INDUSTRY
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${industryOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {NAV_LINKS.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className={linkCls(isActive(item.path))}>{item.label}</span>
                </Link>
              ))}

              <Link
                href="/contact"
                className="inline-block bg-[#003366] hover:bg-[#004488] text-white text-[13px] font-black tracking-[0.18em] uppercase px-5 py-2.5 rounded-none transition-colors duration-200 shadow-sm"
              >
                GET A QUOTE
              </Link>
            </div>

            {/* ── Mobile toggle ─────────────────────────────────────────── */}
            <button
              className="md:hidden text-slate-700 hover:text-[#003366] transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        {/* ── Products Mega Menu ──────────────────────────────────────────── */}
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
              <MegaMenu data={PRODUCTS_MENU_DATA} onClose={() => setMegaOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Industry Mega Menu ──────────────────────────────────────────── */}
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
              <MegaMenu data={INDUSTRY_MENU_DATA} onClose={() => setIndustryOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile Full-Screen Drawer ────────────────────────────────────────── */}
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
                  <img
                    src="/sureay.svg"
                    alt="Sureay Logo"
                    className="w-12 h-12 brightness-0 invert"
                  />
                  <span className="font-black text-[11px] tracking-[0.12em] text-white uppercase leading-none">
                    SUREAY HEAVY MACHINERY
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

              {/* PRODUCTS accordion */}
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
                      <div className="pb-4">
                        {PRODUCTS_MENU_DATA.categories.map((cat) => (
                          <div key={cat.id} className="mb-5">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 pl-4 border-l border-white/20">
                              {cat.title}
                            </p>
                            {cat.items.map((item) => (
                              <Link key={item.id} href={item.href}>
                                <div className="py-2 pl-4 border-l border-white/20 text-[13px] font-semibold tracking-[0.1em] uppercase text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                                  {item.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link href={PRODUCTS_MENU_DATA.bottomLinkHref}>
                          <div className="mt-2 text-[11px] font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer pl-4">
                            {PRODUCTS_MENU_DATA.bottomLinkText}
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* INDUSTRY accordion */}
              <div className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => setMobileIndustry((v) => !v)}
                >
                  <span className={`text-2xl font-black uppercase tracking-widest transition-colors ${
                    mobileIndustry ? "text-white" : "text-white group-hover:text-white/70"
                  }`}>
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
                      <div className="pb-4">
                        {INDUSTRY_MENU_DATA.categories.map((ind) => (
                          <div key={ind.id} className="mb-5">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 pl-4 border-l border-white/20">
                              {ind.title}
                            </p>
                            {ind.items.map((item) => (
                              <Link key={item.id} href={item.href}>
                                <div className="py-2 pl-4 border-l border-white/20 text-[13px] font-semibold tracking-[0.1em] uppercase text-white/60 hover:text-white hover:border-white/60 transition-colors cursor-pointer">
                                  {item.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link href={INDUSTRY_MENU_DATA.bottomLinkHref}>
                          <div className="mt-2 text-[11px] font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer pl-4">
                            {INDUSTRY_MENU_DATA.bottomLinkText}
                          </div>
                        </Link>
                      </div>
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
              <p className="mt-4 font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] text-center">
                ■ ISO 9001:2015 · CMM VERIFIED
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
