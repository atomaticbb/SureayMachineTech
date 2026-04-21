/**
 * HeaderIndustrial.tsx - B2B Industrial Header with Sector-Based Mega Menu
 * Design: "Industrial Trust" - Clean, high-contrast, fast interactions
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  Menu,
  X,
  Factory,
  Recycle,
  Scissors,
  Layers,
  Phone,
  ChevronDown,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// SECTOR DATA STRUCTURE
// ══════════════════════════════════════════════════════════════════════════════

interface Product {
  id: string;
  name: string;
  href: string;
}

interface Sector {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  products: Product[];
}

const SECTORS: Sector[] = [
  {
    id: "recycling-waste",
    title: "Recycling & Waste Management",
    icon: Recycle,
    products: [
      {
        id: "twin-shaft-blades-recycling",
        name: "Twin-Shaft Shredder Blades",
        href: "/products/twin-shaft-blades-recycling",
      },
      {
        id: "single-shaft-rotor-inserts",
        name: "Single Shaft Rotor Inserts",
        href: "/products/single-shaft-rotor-inserts",
      },
      {
        id: "single-shaft-bed-knives",
        name: "Single Shaft Bed Knives",
        href: "/products/single-shaft-bed-knives",
      },
      {
        id: "granulator-blades",
        name: "Granulator Blades",
        href: "/products/granulator-blades",
      },
    ],
  },
  {
    id: "paper-tissue",
    title: "Paper & Tissue Converting",
    icon: Scissors,
    products: [
      {
        id: "tissue-log-saw-blades",
        name: "Tissue Log Saw Blades",
        href: "/products/tissue-log-saw-blades",
      },
      {
        id: "paper-cutting-blades",
        name: "Paper Cutting Blades",
        href: "/products/paper-cutting-blades",
      },
    ],
  },
  {
    id: "flexible-converting",
    title: "Flexible Packaging & Converting",
    icon: Layers,
    products: [
      {
        id: "rotary-slitter-knives",
        name: "Film & Tape Slitter Knives",
        href: "/products/rotary-slitter-knives",
      },
    ],
  },
  {
    id: "metal-processing",
    title: "Metal Coil Processing",
    icon: Factory,
    products: [
      {
        id: "metal-coil-slitting-knives",
        name: "Metal Coil Slitting Knives",
        href: "/products/metal-coil-slitting-knives",
      },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// DESKTOP MEGA MENU
// ══════════════════════════════════════════════════════════════════════════════

interface MegaMenuProps {
  onClose: () => void;
}

function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#001f4d] shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sector Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTORS.map(sector => {
            const Icon = sector.icon;
            return (
              <div key={sector.id} className="space-y-4">
                {/* Sector Header */}
                <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                  <Icon className="w-5 h-5 text-[#001f4d] mt-0.5 flex-shrink-0" />
                  <h3 className="font-bold text-sm uppercase tracking-wide text-[#001f4d] leading-tight">
                    {sector.title}
                  </h3>
                </div>

                {/* Product Links */}
                <div className="space-y-2">
                  {sector.products.map(product => (
                    <Link key={product.id} href={product.href}>
                      <a
                        onClick={onClose}
                        className="block text-sm text-slate-700 hover:text-[#001f4d] hover:bg-slate-50 px-3 py-2 rounded transition-colors duration-150"
                      >
                        {product.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Need a custom blade solution?{" "}
            <Link href="/contact">
              <a
                onClick={onClose}
                className="text-[#001f4d] font-semibold hover:underline"
              >
                Contact Engineering →
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════════════════════════════════════════════

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <Link href="/">
          <a onClick={onClose} className="font-black text-xl text-[#001f4d]">
            SUREAY
          </a>
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-slate-700 hover:text-[#001f4d] transition-colors duration-150"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-6 space-y-6">
        {/* Home Link */}
        <Link href="/">
          <a
            onClick={onClose}
            className="block text-base font-semibold text-slate-700 hover:text-[#001f4d] transition-colors duration-150"
          >
            Home
          </a>
        </Link>

        {/* Industries & Products - Accordion */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Industries & Products
          </div>
          <div className="space-y-2">
            {SECTORS.map(sector => {
              const Icon = sector.icon;
              const isExpanded = expandedSector === sector.id;

              return (
                <div
                  key={sector.id}
                  className="border border-slate-200 rounded"
                >
                  {/* Sector Toggle */}
                  <button
                    onClick={() =>
                      setExpandedSector(isExpanded ? null : sector.id)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#001f4d]" />
                      <span className="font-semibold text-sm text-slate-700">
                        {sector.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Product List */}
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-1 bg-slate-50 space-y-1">
                      {sector.products.map(product => (
                        <Link key={product.id} href={product.href}>
                          <a
                            onClick={onClose}
                            className="block text-sm text-slate-600 hover:text-[#001f4d] py-2 transition-colors duration-150"
                          >
                            {product.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Links */}
        <Link href="/about">
          <a
            onClick={onClose}
            className="block text-base font-semibold text-slate-700 hover:text-[#001f4d] transition-colors duration-150"
          >
            About
          </a>
        </Link>

        <Link href="/contact">
          <a
            onClick={onClose}
            className="block text-base font-semibold text-slate-700 hover:text-[#001f4d] transition-colors duration-150"
          >
            Contact
          </a>
        </Link>

        {/* CTA Button */}
        <Link href="/contact">
          <a
            onClick={onClose}
            className="block w-full bg-[#001f4d] hover:bg-[#003366] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors duration-150 text-center"
          >
            Get a Quote
          </a>
        </Link>
      </nav>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN HEADER COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

export default function HeaderIndustrial() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#001f4d] text-white shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="font-black text-2xl tracking-tight hover:opacity-80 transition-opacity duration-150">
              SUREAY
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/">
              <a className="text-sm font-semibold uppercase tracking-wide hover:text-slate-300 transition-colors duration-150">
                Home
              </a>
            </Link>

            {/* Industries & Products - Mega Menu Trigger */}
            <div
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="relative"
            >
              <button className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide hover:text-slate-300 transition-colors duration-150">
                Industries & Products
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
              )}
            </div>

            <Link href="/about">
              <a className="text-sm font-semibold uppercase tracking-wide hover:text-slate-300 transition-colors duration-150">
                About
              </a>
            </Link>

            <Link href="/contact">
              <a className="text-sm font-semibold uppercase tracking-wide hover:text-slate-300 transition-colors duration-150">
                Contact
              </a>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <Link href="/contact">
            <a className="hidden lg:flex items-center gap-2 bg-white text-[#001f4d] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors duration-150">
              <Phone className="w-4 h-4" />
              Get a Quote
            </a>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:text-slate-300 transition-colors duration-150"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
