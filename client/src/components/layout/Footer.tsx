import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0a1219] text-slate-400 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-5 cursor-pointer group">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-10 h-10 brightness-0 invert opacity-90"
                />
                <span className="text-base font-black text-white tracking-[0.08em] uppercase leading-none">
                  SUREAY MACHINERY
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 pr-4">
              ISO&nbsp;9001:2015 certified OEM manufacturer of precision industrial blades, cutting tooling, and recycling machine solutions. Global export since 2008.
            </p>
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-slate-800 hover:bg-[#003366] flex items-center justify-center transition-colors duration-200 rounded-none"
              >
                <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5S0 4.881 0 3.5C0 2.12 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 bg-slate-800 hover:bg-[#003366] flex items-center justify-center transition-colors duration-200 rounded-none"
              >
                <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
              Products
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/machinery" className="hover:text-white transition-colors">
                  Sheet Metal Machinery
                </Link>
              </li>
              <li>
                <Link href="/products/molds" className="hover:text-white transition-colors">
                  Press Brake Molds
                </Link>
              </li>
              <li>
                <Link href="/products/blades" className="hover:text-white transition-colors">
                  Industrial Blades
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-white transition-colors">
                  Custom OEM / ODM
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
              Industries
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/industry/plastics-recycling" className="hover:text-white transition-colors">
                  Plastics Recycling
                </Link>
              </li>
              <li>
                <Link href="/industry/metal-processing" className="hover:text-white transition-colors">
                  Metal Processing
                </Link>
              </li>
              <li>
                <Link href="/industry/paper-tissue" className="hover:text-white transition-colors">
                  Paper &amp; Tissue
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Industry News
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Sureay
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-1">Address</p>
                <p className="leading-relaxed">
                  Industrial Development Zone, Bowang Town,<br />
                  Ma'anshan City, Anhui Province, China
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-1">WhatsApp / Phone</p>
                <a href="tel:+8615655530829" className="hover:text-white transition-colors">
                  +86 156 5553 0829
                </a>
                <p className="text-xs text-slate-600 mt-0.5">Available 24/7 for support</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-1">Email</p>
                <a href="mailto:sales@sureaymachinery.com" className="hover:text-white transition-colors break-all">
                  sales@sureaymachinery.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold uppercase tracking-widest text-slate-600">
          <p>© {new Date().getFullYear()} Sureay Machinery Manufacturing Co., Ltd.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="text-white bg-[#003366] hover:bg-[#004488] px-4 py-1.5 transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
