import Link from "@/components/common/SiteLink";
import { useTranslation } from "@/lib/useTranslation";
import { gtagEvent } from "@/lib/gtag";
import { getMixerCategories } from "@/data/locales";

const PRODUCT_LINKS = [
  {
    labelKey: "footer.productLinks.tissueLogSaw",
    href: "/products/tissue-log-saw-blades",
  },
  {
    labelKey: "footer.productLinks.paperCutting",
    href: "/categories/paper-cutting-knives",
  },
  {
    labelKey: "footer.productLinks.metalShear",
    href: "/categories/shear-blades#metal-shearing",
  },
  {
    // "Rotary slitter knives" is a family term covering every slitter variant,
    // so this site-wide anchor points at the category hub, not the film & tape
    // product page. The hub is the page that should rank for it.
    labelKey: "footer.productLinks.rotarySlitter",
    href: "/categories/slitter-knives",
  },
  {
    labelKey: "footer.productLinks.shredder",
    href: "/products/twin-shaft-blades-recycling",
  },
];

const HEAD =
  "text-white font-semibold text-[14px] mb-3 [overflow-wrap:anywhere]";
const LINK = "text-[14px] text-slate-300 hover:text-white transition-colors";
const MORE =
  "text-[14px] font-medium text-white hover:underline transition-colors";

export default function Footer() {
  const { t, lang } = useTranslation();
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
    <footer className="border-t border-slate-800 bg-[#0a1219] text-slate-300">
      <div className="home-content max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-5">
        {/* ── Top grid — one section per column ── */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-7">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/">
              <div className="flex items-center gap-3 mb-3 cursor-pointer">
                <img
                  src="/sureay.svg"
                  alt="Sureay Logo"
                  className="w-10 h-10 brightness-0 invert"
                  width={40}
                  height={40}
                />
                <span className="text-[16px] font-semibold text-white leading-none">
                  SUREAY MACHINERY
                </span>
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed text-slate-300 max-w-xs mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.linkedin.com/in/lynn-shang-sureay"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 fill-current text-white"
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
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 fill-current text-white"
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
            <ul className="space-y-2">
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
            <ul className="space-y-2">
              {getMixerCategories(lang).map(c => (
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
            <ul className="space-y-2">
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
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={LINK}>
                  {t("footer.aboutSureay")}
                </Link>
              </li>
              <li>
                <Link href="/news" className={LINK}>
                  {t("nav.news")}
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
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 md:gap-5 text-[14px]">
          <a
            href="mailto:lynn@sureay.com"
            onClick={() =>
              gtagEvent("email_click", { link_location: "footer" })
            }
            className="font-medium text-white hover:underline transition-colors"
          >
            lynn@sureay.com
          </a>
          <a
            href="tel:+8618005550657"
            onClick={() =>
              gtagEvent("phone_click", { link_location: "footer" })
            }
            className="font-medium text-white hover:underline transition-colors"
          >
            +86 180 0555 0657
          </a>
          <span className="text-slate-300">
            {t("footer.addressLine1")} {t("footer.addressLine2")}
          </span>
          <Link
            href="/contact"
            className="md:ml-auto inline-block px-4 py-2 border border-slate-500 hover:border-white text-white text-[14px] font-medium transition-colors duration-200"
          >
            {t("cta.requestQuote")}
          </Link>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[14px] text-slate-300">
          <p>
            © {year} {t("footer.copyrightCompany")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="hidden md:inline text-slate-400">
              {t("footer.credentialsLine")}
            </span>
            <button
              type="button"
              className="min-h-11 text-white underline underline-offset-4"
              onClick={() => window.dispatchEvent(new Event("sureay:cookie-settings"))}
            >
              {t("cookieConsent.title")}
            </button>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
