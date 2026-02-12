/*
 * Design: Forged Aesthetics - Industrial precision navigation
 * Metal texture background with forge orange accent for CTA
 * Sharp edges and blade-edge highlights
 */

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if on detail page (white background pages)
  const isDetailPage = location.includes('/products/machinery/') ||
                       location.includes('/products/blades/') ||
                       location.includes('/products/molds/');

  // Dynamic text color based on page
  const textColor = isDetailPage ? 'text-slate-900' : 'text-white';
  const textColorHover = isDetailPage ? 'hover:text-[#FF6600]' : 'hover:text-white';
  const textColorOpacity = isDetailPage ? 'text-slate-800' : 'text-white/90';
  const textShadow = isDetailPage ? '' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
  const textShadowLight = isDetailPage ? '' : 'drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]';

  // Auto-hide navbar on scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling past 100px
      else if (currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "APPLICATIONS", path: "/applications" },
    { label: "BLOGS", path: "/blogs" },
    { label: "ABOUT US", path: "/about" },
    { label: "CONTACT US", path: "/contact" },
  ];

  const productItems = [
    { label: "Sheet Metal Machinery", path: "/products/machinery" },
    { label: "Press Brake Molds", path: "/products/molds" },
    { label: "Industrial Blades", path: "/products/blades" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="/likun-logo.svg"
                alt="Sureay Logo"
                className="w-10 h-10 transition-transform group-hover:scale-110"
              />
              <span className={`font-bold text-sm tracking-wider ${textShadow} ${textColor}`}>
                SUREAY HEAVY MACHINERY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home Link */}
            <Link href="/">
              <span className={`text-sm font-medium tracking-wide transition-colors cursor-pointer ${textShadowLight} ${textColorOpacity} ${textColorHover}`}>
                HOME
              </span>
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button className={`text-sm font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1 ${textShadowLight} ${textColorOpacity} ${textColorHover}`}>
                PRODUCTS
                <span className="inline-block ml-1 text-xs">{productsDropdownOpen ? "▲" : "▼"}</span>
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-80 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 py-4">
                    {productItems.map(item => (
                      <Link key={item.path} href={item.path}>
                        <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{item.label}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.path === '/products/machinery' && 'CNC Press Brakes & Sheet Metal Equipment'}
                            {item.path === '/products/molds' && 'Custom Precision Press Brake Tooling'}
                            {item.path === '/products/blades' && 'High-Performance Industrial Cutting Blades'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other nav items (APPLICATIONS, BLOGS, ABOUT US, CONTACT US) */}
            {navItems.slice(1).map(item => (
              <Link key={item.path} href={item.path}>
                <span className={`text-sm font-medium tracking-wide transition-colors cursor-pointer ${textShadowLight} ${textColorOpacity} ${textColorHover}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textShadow} ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-slate-800/95 backdrop-blur-md rounded-lg -mx-4 px-4 mt-2 border border-slate-700/50">
            <Link href="/">
              <div
                className="block py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer text-white/90 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </div>
            </Link>

            {/* Products Section in Mobile */}
            <div className="border-t border-slate-700 pt-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Products</div>
              {productItems.map(item => (
                <Link key={item.path} href={item.path}>
                  <div
                    className="py-2 px-2 text-sm font-medium tracking-wide transition-colors cursor-pointer text-white/90 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>

            {navItems.map(item => (
              <Link key={item.path} href={item.path}>
                <div
                  className="block py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer text-white/90 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
