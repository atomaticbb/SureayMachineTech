/**
 * CategoryAggregation — Category Hub Page
 * Route: /categories/:slug
 */

import { useRoute, Redirect } from "wouter";
import PageHelmet from "@/components/common/PageHelmet";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductVariantCard from "@/components/product/ProductVariantCard";
import MobileContactBar from "@/components/product/MobileContactBar";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import ContactRFQ from "@/components/home/ContactRFQ";

import { useLang } from "@/contexts/LangContext";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import { useTranslation } from "@/lib/useTranslation";
import { getSlitterProductGroups } from "@/data/blade-categories";
import { getShredderDetailBlade, isUpgradedShredderBlade } from "@/data/blades";
import { localizedPath } from "@/lib/i18n";
import {
  appendRedirectQuery,
  getCategoryRedirect,
} from "@shared/catalog-routing";
import {
  getCategoryBySlug,
  getBladesByCategory,
  getRepresentativeBlade,
  getOemMachinesForCategory,
} from "@/data/locales";

const SlitterCategorySections = lazyWithRetry(
  () => import("@/components/product/SlitterCategorySections"),
  "slitter-category-sections"
);

function firstParagraph(text: string | undefined): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  const splitAt = trimmed.indexOf("\n\n");
  return splitAt === -1 ? trimmed : trimmed.slice(0, splitAt).trim();
}

// Wide hero-banner crops for hubs that have one, keyed by category slug.
// Hubs without an entry fall back to their meta.heroImage product photo.
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "slitter-knives": "/images/hero/slitter-knives-hero.webp",
  "log-saw-blades": "/images/hero/log-saw-blades-hero.webp",
  "granulator-blades": "/images/hero/granulator-blades-hero.webp",
  "shredder-blades": "/images/hero/shredder-blades-hero.webp",
  "wood-chipper-blades": "/images/hero/wood-chipper-blades-hero.webp",
  "shear-blades": "/images/hero/shear-blades-hero.webp",
};

const CUTOUT_HERO_IMAGES = new Map([
  ["paper-cutting-knives", {
    src: "/images/hero/paper-cutting-knife-transparent.webp",
    srcSet: "/images/hero/paper-cutting-knife-transparent-320w.webp 320w, /images/hero/paper-cutting-knife-transparent-640w.webp 640w, /images/hero/paper-cutting-knife-transparent.webp 800w",
    sizes: "(min-width: 1024px) 260px, 220px",
    width: 800,
    height: 800,
    altKey: "bladeUi.paperHeroAlt",
    pictureWidth: "w-[30%]",
    imageSize: "h-[220px] w-[220px] lg:h-[260px] lg:w-[260px]",
  }],
  ["other-custom-blades", {
    src: "/images/hero/custom-blade-samples-880w.webp",
    srcSet: [320, 560, 880, 1100]
      .map(width => `/images/hero/custom-blade-samples-${width}w.webp ${width}w`)
      .join(", "),
    sizes: "(min-width: 1250px) 550px, (min-width: 1024px) 44vw, 32vw",
    width: 880,
    height: 420,
    altKey: "bladeUi.customHeroAlt",
    pictureWidth: "w-[32%] max-w-[550px] lg:w-[44%]",
    imageSize: "h-auto w-full",
  }],
]);

export default function CategoryAggregation() {
  const lang = useLang();
  const { t } = useTranslation();
  const [, params] = useRoute("/categories/:slug");
  const slug = params?.slug ?? "";
  const migration = getCategoryRedirect(`/categories/${slug}`);
  if (migration) {
    return (
      <Redirect
        to={appendRedirectQuery(migration, window.location.search)}
        replace
      />
    );
  }
  const meta = getCategoryBySlug(slug, lang);

  if (!meta) {
    return <Redirect to="/products" />;
  }

  const variants = getBladesByCategory(meta.category, lang);
  const slitterGroups =
    meta.slug === "slitter-knives"
      ? getSlitterProductGroups(variants)
      : undefined;
  const buyingGuide = meta.buyingGuide;
  const remaining = new Map(variants.map(blade => [blade.id, blade]));
  const buyingGroups = buyingGuide?.groups.flatMap(
    ({ productIds, ...group }) => {
      const products = productIds.flatMap(id => {
        const blade = remaining.get(id);
        remaining.delete(id);
        return blade ? [blade] : [];
      });
      return products.length ? [{ ...group, products }] : [];
    }
  );
  if (buyingGroups && remaining.size) {
    buyingGroups.push({
      id: "other-parts",
      title: t("bladeUi.otherParts"),
      products: Array.from(remaining.values()),
    });
  }
  const compactHeader = slitterGroups || buyingGuide;
  const paperHero = meta.slug === "paper-cutting-knives";
  const listedProducts =
    (slitterGroups ?? buyingGroups)?.flatMap(group => group.products) ??
    variants;
  const breadcrumbItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.products"), href: "/products" },
    { label: meta.shortName },
  ];
  const rep = getRepresentativeBlade(meta.category, lang);
  const oemMachines =
    lang === "en"
      ? Array.from(
          new Set(
            variants.flatMap(
              blade =>
                (isUpgradedShredderBlade(blade)
                  ? getShredderDetailBlade(blade)
                  : blade
                ).compatibleMachines ?? []
            )
          )
        )
      : getOemMachinesForCategory(meta.category, lang);
  const overviewBody = firstParagraph(rep?.fullDescription);
  // A few hubs have a dedicated wide hero crop; every other hub falls back
  // to its existing product photo (meta.heroImage).
  const cutoutHero = CUTOUT_HERO_IMAGES.get(meta.slug);
  const heroImageSrc = cutoutHero?.src ?? HERO_IMAGE_OVERRIDES[meta.slug] ?? meta.heroImage;
  const productsIntro =
    meta.routingCopy ?? meta.description.split(".")[0] + ".";
  const oemMachinesFiltered = meta.oemExcludeList
    ? oemMachines.filter(m => !meta.oemExcludeList!.includes(m))
    : oemMachines;
  const whatsappPrefillText = t("categoryPage.whatsappPrefill").replace(
    "{{name}}",
    meta.shortName.toLowerCase()
  );

  function scrollToContact(e: { preventDefault: () => void }) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        key={meta.slug}
        title={meta.seoTitle ?? meta.title}
        description={meta.description}
        canonicalUrl={`/categories/${meta.slug}`}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.products"), url: "/products" },
          { name: meta.shortName, url: `/categories/${meta.slug}` },
        ]}
      />
      <PageHelmet key={`category-${meta.slug}`}>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: meta.title,
            url: `https://sureay.com${localizedPath(`/categories/${meta.slug}`, lang)}`,
            itemListElement: listedProducts.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://sureay.com${localizedPath(b.link, lang)}`,
              name: b.name,
            })),
          }).replace(/</g, "\\u003c")}
        </script>
        <link
          rel="preload"
          as="image"
          href={heroImageSrc}
          imageSrcSet={cutoutHero?.srcSet}
          imageSizes={cutoutHero?.sizes}
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </PageHelmet>
      <Navbar />
      <main>
        {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
        <section
          aria-label={meta.title}
          className={`relative mt-[74px] overflow-hidden bg-[#001f4d] ${
            compactHeader ? "" : "h-[379px] border-b border-white/10"
          }`}
        >
          {!cutoutHero && (
            <div
              className="hidden md:block absolute inset-y-0 end-0 w-1/2 lg:w-[45%]"
              style={{
                backgroundImage: `linear-gradient(to ${lang === "ar" ? "left" : "right"}, #001f4d 0%, rgba(0,31,77,0) 22%), url(${heroImageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "right center",
              }}
            />
          )}
          <div
            className={`relative mx-auto max-w-7xl sm:px-8 ${
              compactHeader
                ? "px-4 py-4 md:min-h-[300px] md:py-5"
                : "flex h-full items-center px-6"
            }`}
          >
            {cutoutHero && (
              <picture className={`pointer-events-none absolute inset-y-0 end-8 hidden items-center justify-end md:flex ${cutoutHero.pictureWidth}`}>
                <source
                  media="(min-width: 768px)"
                  srcSet={cutoutHero.srcSet}
                  sizes={cutoutHero.sizes}
                />
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  alt={t(cutoutHero.altKey)}
                  width={cutoutHero.width}
                  height={cutoutHero.height}
                  fetchPriority="high"
                  className={`object-contain ${cutoutHero.imageSize}`}
                />
              </picture>
            )}
            {compactHeader && (
              <div className="[&_a]:text-white/80 [&_a:hover]:text-white [&_[aria-current=page]]:text-white [&_[aria-hidden=true]]:text-white/60">
                <Breadcrumbs variant="embedded" items={breadcrumbItems} />
              </div>
            )}
            <div
              className={
                paperHero
                  ? "relative w-full py-4 md:w-[65%] md:py-6 lg:w-[70%]"
                  : compactHeader
                    ? "w-full py-4 md:w-[62%] md:py-6"
                    : "w-full md:w-[68%] lg:w-[72%]"
              }
            >
              <h1
                className={`text-[30px] font-black leading-tight tracking-tight text-white ${paperHero ? "text-balance md:text-[36px] xl:text-[44px]" : `md:text-[40px] ${compactHeader ? "xl:text-[50px]" : "lg:text-[50px]"}`}`}
              >
                {meta.title}
              </h1>
              <p
                className={`mt-1.5 max-w-2xl leading-snug text-white/80 ${compactHeader ? "text-[16px] md:text-[18px]" : "text-[18px]"}`}
              >
                {paperHero
                  ? meta.tagline
                  : slitterGroups
                    ? t("bladeUi.slitterTagline")
                    : buyingGuide
                      ? meta.tagline
                      : `${meta.description.split(".")[0]}.`}
              </p>
              {compactHeader ? (
                <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="#contact"
                    className="inline-flex min-h-11 items-center border border-white/70 px-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#001f4d] sm:px-5 sm:text-sm"
                  >
                    {lang === "en" ? "Request a Quote" : t("cta.getQuote")}
                  </a>
                </div>
              ) : (
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-white text-[#001f4d] border-2 border-white hover:bg-[#001f4d] hover:text-white px-7 py-3.5 mt-7 font-black text-sm tracking-widest transition-all duration-300 rounded-none"
                >
                  {t("home.hero.ctaPrimary")}
                </a>
              )}
            </div>
          </div>
        </section>

        {slitterGroups || buyingGroups ? (
          <SlitterCategorySections
            groups={slitterGroups ?? buyingGroups!}
            machineBrands={oemMachinesFiltered}
            selectionGuide={meta.selectionGuide}
            compatibilityPrompt={buyingGuide?.quotePrompt}
            idPrefix={slitterGroups ? "slitter" : meta.slug}
            legacyAnchor={
              meta.slug === "shear-blades"
                ? "paper-and-print-finishing"
                : undefined
            }
          />
        ) : (
          <>
            <Breadcrumbs items={breadcrumbItems} />

            {/* ── 2 · Products ─────────────────────────────────────────────────── */}
            <section
              aria-label={t("categoryPage.configurations")}
              className="site-section bg-white border-b border-slate-200"
            >
              <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-16">
                <div className="border-b border-slate-200 pb-2 mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h2 className="text-[38px] font-black text-[#001f4d] tracking-tight">
                      {meta.shortName} {t("categoryPage.configurations")}
                    </h2>
                  </div>
                  <p
                    className={`text-[16px] text-muted-foreground mt-1 ${
                      meta.routingCopy
                        ? "max-w-[75%] leading-relaxed"
                        : "leading-snug max-w-[70ch]"
                    }`}
                  >
                    {productsIntro}
                  </p>
                </div>
                <div className="mobile-product-grid grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {variants.map(blade => (
                    <ProductVariantCard
                      key={blade.id}
                      blade={blade}
                      sectorBadge={blade.sector}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ── 3 · Overview ─────────────────────────────────────────────────── */}
            <section
              aria-label={t("categoryPage.technicalOverview")}
              className="site-section border-b border-slate-200 bg-slate-50"
            >
              <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
                <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
                  <h2 className="text-[38px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-6">
                    {meta.title}
                  </h2>
                  <div className="aspect-[4/3] overflow-hidden border border-slate-200 bg-white">
                    <img
                      src={rep?.gallery?.[1] ?? meta.heroImage}
                      alt={meta.shortName}
                      width={480}
                      height={360}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </aside>

                <div className="lg:col-span-8">
                  {meta.specItems && meta.specItems.length > 0 ? (
                    <>
                      <p className="font-mono text-[12px] tracking-[0.28em] mb-5  text-slate-600 font-bold">
                        {t("categoryPage.keySpecifications")}
                      </p>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-10 bg-slate-300 border border-slate-300">
                        {meta.specItems.map(item => (
                          <div
                            key={item.label}
                            className="bg-white px-5 py-4 flex flex-col gap-1"
                          >
                            <dt className="font-mono tracking-[0.25em]  text-[12px] text-slate-600 font-bold">
                              {item.label}
                            </dt>
                            <dd className="font-bold text-[#001f4d] leading-snug text-[20px]">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : (
                    <>
                      <p className="text-description text-slate-700 leading-[1.65] mb-5">
                        {meta.description}
                      </p>
                      {overviewBody && (
                        <p className="text-description text-muted-foreground leading-[1.75] max-w-[68ch]">
                          {overviewBody}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* ── 4 · OEM Compatibility ────────────────────────────────────────── */}
            {oemMachinesFiltered.length > 0 && (
              <section
                aria-label={t("categoryPage.oemCompatibility")}
                className="site-section border-b border-slate-200 bg-white"
              >
                <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
                  <aside className="lg:col-span-4">
                    <h2 className="text-[38px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-4">
                      {t("categoryPage.dropInFit")}
                    </h2>
                    <p className="text-description text-muted-foreground leading-[1.7] max-w-sm">
                      {t("bladeUi.modelFit").replace("{name}", meta.shortName.toLocaleLowerCase(lang))}
                    </p>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 self-start border-2 border-[#001f4d] bg-[#001f4d] hover:bg-white text-white hover:text-[#001f4d] font-black text-[14px] tracking-[0.18em] px-6 py-3.5 mt-6 transition-colors duration-200"
                    >
                      {t("categoryPage.checkCompatibility")}
                    </a>
                  </aside>

                  <div className="lg:col-span-8 flex flex-col justify-center">
                    <ul className="flex flex-wrap gap-2">
                      {oemMachinesFiltered.map(m => (
                        <li
                          key={m}
                          className="border border-slate-200 bg-slate-50 px-4 py-2"
                        >
                          <span className="font-bold text-[16px] text-[#001f4d] tracking-tight">
                            {m}®
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <div
          id="contact-rfq"
          className={compactHeader ? "[&>section]:scroll-mt-24" : undefined}
        >
          <ContactRFQ
            messagePlaceholder={
              slitterGroups
                ? t("bladeUi.slitterQuote")
                : buyingGuide?.quotePrompt
            }
          />
        </div>
      </main>
      <Footer />

      <MobileContactBar whatsappPrefillText={whatsappPrefillText} />
      <FloatingContactButtons whatsappPrefillText={whatsappPrefillText} />
    </div>
  );
}
