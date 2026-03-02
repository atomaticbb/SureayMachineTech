import { Menu, X, ChevronDown } from "lucide-react";
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
                SUREAY HEAVY MACHINERY
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
            className="md:hidden text-slate-700 hover:text-[#003366] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Products Mega Menu ───────────────────────────────────────────── */}
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

      {/* ── Industry Mega Menu ───────────────────────────────────────────── */}
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

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">

            <Link href="/">
              <div
                className="py-3 border-b border-slate-100 text-sm font-medium tracking-wide text-slate-700 hover:text-[#003366] cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                HOME
              </div>
            </Link>

            {/* Products accordion */}
            <div className="border-b border-slate-100">
              <button
                className="w-full flex items-center justify-between py-3 text-sm font-medium tracking-wide text-slate-700 hover:text-[#003366] cursor-pointer"
                onClick={() => setMobileProduct((v) => !v)}
              >
                <span>PRODUCTS</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProduct ? "rotate-180" : ""}`} />
              </button>
              {mobileProduct && (
                <div className="pb-3">
                  {PRODUCTS_MENU_DATA.categories.map((cat) => (
                    <div key={cat.id} className="mb-3 pl-3 border-l-2 border-slate-200">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5 pt-1">
                        {cat.title}
                      </p>
                      {cat.items.map((item) => (
                        <Link key={item.id} href={item.href}>
                          <div
                            className="py-1.5 text-xs font-medium text-slate-700 hover:text-[#003366] cursor-pointer pl-2"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Industry accordion */}
            <div className="border-b border-slate-100">
              <button
                className="w-full flex items-center justify-between py-3 text-sm font-medium tracking-wide text-slate-700 hover:text-[#003366] cursor-pointer"
                onClick={() => setMobileIndustry((v) => !v)}
              >
                <span>INDUSTRY</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileIndustry ? "rotate-180" : ""}`} />
              </button>
              {mobileIndustry && (
                <div className="pb-3">
                  {INDUSTRY_MENU_DATA.categories.map((ind) => (
                    <div key={ind.id} className="mb-3 pl-3 border-l-2 border-slate-200">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5 pt-1">
                        {ind.title}
                      </p>
                      {ind.items.map((item) => (
                        <Link key={item.id} href={item.href}>
                          <div
                            className="py-1.5 text-xs font-medium text-slate-700 hover:text-[#003366] cursor-pointer pl-2"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className="py-3 border-b border-slate-100 last:border-0 text-sm font-medium tracking-wide text-slate-700 hover:text-[#003366] cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full bg-[#003366] text-white text-xs font-black tracking-widest uppercase py-3 rounded-none text-center"
                onClick={() => setMobileOpen(false)}
              >
                GET A QUOTE
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
