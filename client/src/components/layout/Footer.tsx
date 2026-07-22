import { Link } from "wouter";
import { useTranslation } from "@/lib/useTranslation";
import { gtagEvent } from "@/lib/gtag";
import { mixerCategories } from "@/data/mixerParts";

const PRODUCT_LINKS = [
  {
    labelKey: "footer.productLinks.tissueLogSaw",
    href: "/products/tissue-log-saw-blades",
  },
  {
    labelKey: "footer.productLinks.paperCutting",
    href: "/products/paper-cutting-blades",
  },
  {
    labelKey: "footer.productLinks.metalShear",
    href: "/products/metal-shear-knives",
  },
  {
    labelKey: "footer.productLinks.rotarySlitter",
    href: "/products/rotary-slitter-knives",
  },
  {
    labelKey: "footer.productLinks.shredder",
    href: "/products/twin-shaft-blades-recycling",
  },
];

const HEAD =
  "text-white font-black text-[11px] tracking-[0.28em] uppercase mb-5";
const LINK = "text-[14px] text-slate-400 hover:text-white transition-colors";
const MORE =
  "text-[13px] font-bold text-slate-300 tracking-wide hover:text-white transition-colors";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const industries = [
    { label: t("footer.industry.plastic"), href: "/plastic-industry" },
    { label: t("footer.industry.metal"), href: "/metal-industry" },
    { label: t("footer.industry.paper"), href: "/paper-industry" },
    { label: t("footer.industry.converting"), href: "/converting-industry" },
    { label: t("footer.industry.newEnergy"), href: "/new-energy-industry" },
    { label: t("footer.industry.wood"), href: "/wood-industry" },
  ];

  return (
    <footer className="bg-[#0a1219] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-10">
        {/* ── Top grid — one section per column ── */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/">
              <div className="flex items-center gap-3 mb-5 cursor-pointer">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-10 h-10 brightness-0 invert opacity-90"
                  width={40}
                  height={40}
                />
                <span className="text-base font-black text-white tracking-[0.1em] leading-none">
                  SUREAY MACHINERY
                </span>
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed text-slate-400 max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
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

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className={HEAD}>{t("footer.products")}</h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className={MORE}>
                  {t("cta.viewAllProducts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Wear Parts */}
          <div className="lg:col-span-2">
            <h4 className={HEAD}>{t("footer.wearParts")}</h4>
            <ul className="space-y-3">
              {mixerCategories.map(c => (
                <li key={c.id}>
                  <Link href={c.link} className={LINK}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mixer-wear-parts" className={MORE}>
                  {t("footer.viewAllWearParts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-2">
            <h4 className={HEAD}>{t("footer.industries")}</h4>
            <ul className="space-y-3">
              {industries.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className={HEAD}>{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className={LINK}>
                  {t("footer.aboutSureay")}
                </Link>
              </li>
              <li>
                <Link href="/news" className={LINK}>
                  {t("footer.newsCenter")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={LINK}>
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Contact row ── */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row md:items-center gap-5 md:gap-10 text-[14px]">
          <a
            href="mailto:lynn@sureay.com"
            onClick={() =>
              gtagEvent("email_click", { link_location: "footer" })
            }
            className="font-semibold text-slate-300 hover:text-white transition-colors"
          >
            lynn@sureay.com
          </a>
          <a
            href="tel:+8618005550657"
            onClick={() =>
              gtagEvent("phone_click", { link_location: "footer" })
            }
            className="font-semibold text-slate-300 hover:text-white transition-colors"
          >
            +86 180 0555 0657
          </a>
          <span className="text-slate-500">
            {t("footer.addressLine1")} {t("footer.addressLine2")}
          </span>
          <Link
            href="/contact"
            className="md:ml-auto inline-block px-5 py-2.5 bg-[#003366] hover:bg-[#00478f] text-white text-[11px] font-black tracking-widest transition-colors duration-200"
          >
            {t("cta.requestQuote")}
          </Link>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-semibold tracking-widest text-slate-600">
          <p>
            © {year} {t("footer.copyrightCompany")}
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-slate-700">
              {t("footer.credentialsLine")}
            </span>
            <Link
              href="/privacy-policy"
              className="hover:text-slate-400 transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-400 transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
