/*
 * Design: Forged Aesthetics - Industrial footer with metal texture
 * Blade-cut top edge and forge gradient background
 */

import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="relative mt-32 bg-card blade-cut-top pt-24 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground tracking-wider">
              LIKUN MACHINERY
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional manufacturer of high-performance shredder blades and
              cutting tools. Direct factory pricing with superior wear
              resistance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/products" className="hover:text-primary transition-colors cursor-pointer">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-primary transition-colors cursor-pointer">
                  Materials & Metallurgy
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-primary transition-colors cursor-pointer">
                  Custom OEM Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider">
              PRODUCTS
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/products/single-shaft" className="hover:text-primary transition-colors cursor-pointer">
                  Single Shaft Shredder Blades
                </Link>
              </li>
              <li>
                <Link to="/products/metal" className="hover:text-primary transition-colors cursor-pointer">
                  Shredder Blades for Metal
                </Link>
              </li>
              <li>
                <Link to="/products/plastic" className="hover:text-primary transition-colors cursor-pointer">
                  Shredder Blades for Plastic
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider">
              CONTACT
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                <span>
                  Bowang High-tech Industrial Development Zone, Ma'anshan City,
                  China
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>+86 155 5175 7389</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>info@shredderbladesdirect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © 2026 Likun Machinery & Cutting Tools Co., Ltd. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="hover:text-primary transition-colors cursor-pointer">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors cursor-pointer">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blade edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </footer>
  );
}
