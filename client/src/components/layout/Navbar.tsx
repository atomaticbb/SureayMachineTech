/*
 * Design: Forged Aesthetics - Industrial precision navigation
 * Metal texture background with forge orange accent for CTA
 * Sharp edges and blade-edge highlights
 */

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "PRODUCTS", path: "/products" },
    { label: "APPLICATIONS", path: "/applications" },
    { label: "MATERIALS", path: "/materials" },
    { label: "CUSTOM OEM", path: "/custom" },
    { label: "ABOUT US", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="/likun-logo.svg"
                alt="Likun Logo"
                className="w-10 h-10 transition-transform group-hover:scale-110"
              />
              <span className="text-foreground font-bold text-sm tracking-wider group-hover:text-primary transition-colors">
                LIKUN SHREDDER BLADES & KNIVES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                    location === item.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide animate-forge-pulse"
                size="sm"
              >
                CONTACT US
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navItems.map(item => (
              <Link key={item.path} href={item.path}>
                <div
                  className={`block py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                    location === item.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT US
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
