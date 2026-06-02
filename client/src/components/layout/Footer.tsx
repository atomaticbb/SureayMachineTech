import { Link } from "wouter";
import { useTranslation } from "@/lib/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
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
                <span className="text-base font-black text-white tracking-[0.1em]  leading-none">
                  SUREAY BLADES
                </span>
              </div>
            </Link>

            <p className="text-[15px] leading-relaxed mb-8 max-w-sm text-slate-400">
              {t("footer.tagline")}
            </p>

            {/* Social */}
            <div className="flex gap-2.5">
              <a
                href="https://www.linkedin.com/in/lynn-shang-sureay"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer noopener"
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
                href="https://www.youtube.com/@SureayBlades"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer noopener"
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
            <h4 className="text-white font-black text-xs  tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              {t("footer.products")}
            </h4>
            <ul className="space-y-4 text-[15px]">
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
              <li>
                <Link
                  href="/products/metal-coil-slitting-knives"
                  className="hover:text-white transition-colors"
                >
                  Metal Coil Slitting Knives
                </Link>
              </li>
              <li>
                <Link
                  href="/products/rotary-slitter-knives"
                  className="hover:text-white transition-colors"
                >
                  Rotary Slitter Knives
                </Link>
              </li>
              <li>
                <Link
                  href="/products/twin-shaft-blades-recycling"
                  className="hover:text-white transition-colors"
                >
                  Shredder Blades
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href="/products"
                className="text-[13px] font-black text-slate-300  tracking-widest hover:text-white transition-colors"
              >
                {t("cta.viewAllProducts")}
              </Link>
            </div>
          </div>

          {/* ── Col 3: Industries + Company ──────────────────────────── */}
          <div>
            <h4 className="text-white font-black text-xs  tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              {t("footer.industries")}
            </h4>
            <ul className="space-y-4 text-[15px] mb-8">
              <li>
                <Link href="/plastic-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.plastic")}
                </Link>
              </li>
              <li>
                <Link href="/metal-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.metal")}
                </Link>
              </li>
              <li>
                <Link href="/paper-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.paper")}
                </Link>
              </li>
              <li>
                <Link href="/converting-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.converting")}
                </Link>
              </li>
              <li>
                <Link href="/new-energy-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.newEnergy")}
                </Link>
              </li>
              <li>
                <Link href="/wood-industry" className="hover:text-white transition-colors">
                  {t("footer.industry.wood")}
                </Link>
              </li>
            </ul>

            <h4 className="text-white font-black text-xs  tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
              {t("footer.company")}
            </h4>
            <ul className="space-y-4 text-[15px]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t("footer.aboutSureay")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t("footer.newsCenter")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Get In Touch ───────────────────────────────────── */}
          <div>
            <h4 className="text-white font-black text-xs  tracking-[0.3em] mb-6 pb-3 border-b border-slate-800">
              {t("footer.getInTouch")}
            </h4>
            <div className="space-y-6 text-[15px]">
              <div>
                <p className="text-[10px] font-black  tracking-[0.28em] text-slate-600 mb-2">
                  {t("footer.address")}
                </p>
                <p className="leading-relaxed text-slate-400">
                  {t("footer.addressLine1")}
                  <br />
                  {t("footer.addressLine2")}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black  tracking-[0.28em] text-slate-600 mb-2">
                  {t("footer.whatsappPhone")}
                </p>
                <a
                  href="tel:+8618005550657"
                  className="text-slate-300 hover:text-white transition-colors font-semibold"
                >
                  +86 180 0555 0657
                </a>
                <p className="text-[11px] text-slate-600 mt-1">
                  {t("footer.available247")}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black  tracking-[0.28em] text-slate-600 mb-2">
                  {t("footer.email")}
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
                className="inline-block px-6 py-3 bg-[#003366] hover:bg-[#003366] text-white text-xs font-black  tracking-widest transition-colors duration-200"
              >
                {t("cta.requestQuote")}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="border-t border-slate-800 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-semibold  tracking-widest text-slate-600">
          <p>
            © {new Date().getFullYear()} {t("footer.copyrightCompany")}
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-slate-700">
              {t("footer.credentialsLine")}
            </span>
            <Link
              href="/about"
              className="hover:text-slate-400 transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/contact"
              className="hover:text-slate-400 transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
