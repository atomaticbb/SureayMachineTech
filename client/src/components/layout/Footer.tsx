/*
 * Footer - Modern B2B Industrial Style
 * Based on reference HTML design
 */

import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0a1219] text-slate-300 pt-20 pb-24 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-[#003366] rounded-lg text-white">
              </div>
              <span className="text-xl font-black text-white tracking-tight">SUREAY MACHINERY</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 pr-4">
              A global leader in industrial size-reduction technology. We provide high-efficiency shredders and turnkey recycling lines for the circular economy.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF6600] transition-colors"
                href="#"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF6600] transition-colors"
                href="#"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Equipment</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/products">
                  <a className="hover:text-[#FF6600] transition-colors">Single Shaft Shredders</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-[#FF6600] transition-colors">Double Shaft Shredders</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-[#FF6600] transition-colors">Four Shaft Shredders</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-[#FF6600] transition-colors">Heavy-duty Crushers</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-[#FF6600] transition-colors">Cable Recycling Lines</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about">
                  <a className="hover:text-[#FF6600] transition-colors">About Sureay</a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  Global Network
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  Quality Control
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <p className="text-sm">
                  Industrial Development Zone, Bowang Town, Ma'anshan City, Anhui Province, China
                </p>
              </div>
              <div className="flex gap-3">
                <div className="text-sm">
                  <p>WhatsApp: +86 15655530829</p>
                  <p className="text-xs opacity-60 mt-1">Available 24/7 for support</p>
                </div>
              </div>
              <div className="flex gap-3">
                <p className="text-sm">info@sureay.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          <p>© 2024 Sureay Machinery Manufacturing Co., Ltd.</p>
          <div className="flex gap-8">
            <span>Technical Support: +86 15655530829</span>
            <Link href="/contact">
              <a className="hover:text-white transition-colors underline decoration-[#FF6600] decoration-2 underline-offset-4">
                Get Support Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
