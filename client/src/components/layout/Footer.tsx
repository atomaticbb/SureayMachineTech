import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0a1219] text-slate-400 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-8 md:gap-12 lg:gap-16 xl:gap-20 mb-12 lg:mb-16">
          {/* ── Col 1: Brand ─────────────────────────────────────────── */}
          <div>
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 cursor-pointer">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-11 h-11 brightness-0 invert opacity-90"
                  width={44}
                  height={44}
                />
                <span className="text-base font-black text-white tracking-[0.1em] uppercase leading-none">
                  SUREAY BLADES
                </span>
              </div>
            </Link>

            <p className="text-[15px] leading-relaxed mb-8 max-w-sm text-slate-400">
              OEM precision blades for plastics recycling, paper converting, and
              metal processing. Vacuum heat treatment · CMM inspection ·
              ISO&nbsp;9001:2015 certified. Global export since 2008.
            </p>

            {/* Social */}
            <div className="flex gap-2.5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-slate-800 hover:bg-[#003366] flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 fill-current text-slate-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5S0 4.881 0 3.5C0 2.12 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 bg-slate-800 hover:bg-[#003366] flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 fill-current text-slate-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Col 2: Products ──────────────────────────────────────── */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              Products
            </h4>
            <ul className="space-y-4 text-[15px]">
              <li>
                <Link
                  href="/products/twin-shaft-blades-recycling"
                  className="hover:text-white transition-colors"
                >
                  Shredder Blades
                </Link>
              </li>
              <li>
                <Link
                  href="/products/granulator-blades"
                  className="hover:text-white transition-colors"
                >
                  Granulator Blades
                </Link>
              </li>
              <li>
                <Link
                  href="/products/rotary-slitter-knives"
                  className="hover:text-white transition-colors"
                >
                  Film & Tape Slitter Knives
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tissue-log-saw-blades"
                  className="hover:text-white transition-colors"
                >
                  Tissue Log Saw Blades
                </Link>
              </li>
              <li>
                <Link
                  href="/products/paper-cutting-blades"
                  className="hover:text-white transition-colors"
                >
                  Paper Cutting Blades
                </Link>
              </li>
              <li>
                <Link
                  href="/products/metal-shear-knives"
                  className="hover:text-white transition-colors"
                >
                  Metal Shear Knives
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href="/products"
                className="text-[13px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* ── Col 3: Industries + Company ──────────────────────────── */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              Industries
            </h4>
            <ul className="space-y-4 text-[15px] mb-8">
              <li>
                <Link
                  href="/plastic-industry"
                  className="hover:text-white transition-colors"
                >
                  Plastics Recycling
                </Link>
              </li>
              <li>
                <Link
                  href="/metal-industry"
                  className="hover:text-white transition-colors"
                >
                  Metal Processing
                </Link>
              </li>
              <li>
                <Link
                  href="/paper-industry"
                  className="hover:text-white transition-colors"
                >
                  Paper, Tissue &amp; Corrugated
                </Link>
              </li>
              <li>
                <Link
                  href="/converting-industry"
                  className="hover:text-white transition-colors"
                >
                  Flexible Converting
                </Link>
              </li>
              <li>
                <Link
                  href="/new-energy-industry"
                  className="hover:text-white transition-colors"
                >
                  New Energy &amp; Battery
                </Link>
              </li>
            </ul>

            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
              Company
            </h4>
            <ul className="space-y-4 text-[15px]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Sureay
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-white transition-colors"
                >
                  Industry News
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Get In Touch ───────────────────────────────────── */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              Get In Touch
            </h4>
            <div className="space-y-6 text-[15px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-600 mb-2">
                  Address
                </p>
                <p className="leading-relaxed text-slate-400">
                  Industrial Development Zone,
                  <br />
                  Ma'anshan, Anhui Province, China
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-600 mb-2">
                  WhatsApp / Phone
                </p>
                <a
                  href="tel:+8618005550657"
                  className="text-slate-300 hover:text-white transition-colors font-semibold"
                >
                  +86 180 0555 0657
                </a>
                <p className="text-[11px] text-slate-600 mt-1">
                  Available 24/7
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-600 mb-2">
                  Email
                </p>
                <a
                  href="mailto:lynn@sureay.com"
                  className="text-slate-300 hover:text-white transition-colors font-semibold"
                >
                  lynn@sureay.com
                </a>
              </div>

              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-[#003366] hover:bg-[#004488] text-white text-xs font-black uppercase tracking-widest transition-colors duration-200"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="border-t border-slate-800 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
          <p>
            © {new Date().getFullYear()} Sureay Machinery Technology Co., Ltd.
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-slate-700">
              ISO 9001:2015 · Est. 2008 · 50+ Countries
            </span>
            <Link
              href="/about"
              className="hover:text-slate-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-slate-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
