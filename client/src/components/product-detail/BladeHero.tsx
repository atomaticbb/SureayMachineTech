/**
 * BladeHero — ZONE 1: CAD Viewport Hero.
 * Left: single product image (618px fixed width, right border only).
 * Right: title, category, description, spec bullets, CTA.
 */

import { useEffect, useState } from "react";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { Link } from "wouter";
import type { Blade, BladeSpec } from "@/data/blades";
import {
  getCatalogUrl,
  getWebpImageSrcSet,
  isUpgradedShredderBlade,
} from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface BladeHeroProps {
  blade: Blade;
  heroSpecs: (BladeSpec & { emphasis?: string })[];
  breadcrumbs?: React.ReactNode;
}

/** Renders a single `[text](/url)` markdown link inside plain text. */
function renderDisambiguation(text: string): React.ReactNode {
  const match = text.match(/^(.*)\[([^\]]+)\]\(([^)]+)\)(.*)$/);
  if (!match) return text;
  const [, before, linkText, href, after] = match;
  return (
    <>
      {before}
      <Link href={href} asChild>
        <a className="underline underline-offset-2 decoration-slate-400 hover:text-[#001f4d] hover:decoration-[#001f4d] transition-colors font-semibold">
          {linkText}
        </a>
      </Link>
      {after}
    </>
  );
}

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

type CatalogState = "idle" | "form" | "loading" | "done";

export default function BladeHero({ blade, heroSpecs, breadcrumbs }: BladeHeroProps) {
  const { t } = useTranslation();
  const detailLayout = blade.detailLayout;
  const title = detailLayout?.heroTitle || blade.fullName || blade.name;
  const catalogUrl = getCatalogUrl(blade);
  const [catalogState, setCatalogState] = useState<CatalogState>("idle");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [activeImg, setActiveImg] = useState(0);

  // Hero images: the last two gallery slots are reserved for the
  // DecisiveSpecs/ComprehensiveData panels, so only the leading slots
  // are eligible for the hero thumbnail track.
  const detailHeroImages = detailLayout?.heroAlt
    ? [
        {
          src: blade.image,
          alt: detailLayout.heroAlt,
          dimensions: blade.imageDimensions,
        },
        ...(detailLayout.additionalHeroImages ?? []),
      ]
    : undefined;
  const heroImages = detailHeroImages
    ? detailHeroImages.map(image => image.src)
    : blade.gallery && blade.gallery.length > 2
      ? blade.gallery.slice(0, -2)
      : [blade.image];
  const heroAlts =
    detailHeroImages?.map(image => image.alt) ??
    (blade.galleryAlts && blade.galleryAlts.length > 2
      ? blade.galleryAlts.slice(0, -2)
      : undefined);
  const clampedActiveImg = Math.min(activeImg, heroImages.length - 1);
  const activeSrc = heroImages[clampedActiveImg];
  const coverDimensions =
    detailHeroImages?.[clampedActiveImg]?.dimensions ??
    (activeSrc === blade.image ? blade.imageDimensions : undefined);
  const coverSrcSet = getWebpImageSrcSet(activeSrc, coverDimensions);
  const responsiveCover =
    detailLayout?.heroAlt &&
    activeSrc === blade.image &&
    activeSrc.endsWith(".webp");
  const activeAlt =
    detailHeroImages?.[clampedActiveImg]?.alt ??
    heroAlts?.[clampedActiveImg] ??
    (blade.fullName || blade.name);

  // Reset to the cover shot when navigating between products (the page
  // component may reuse this instance across route param changes).
  useEffect(() => setActiveImg(0), [blade.id]);

  const handleCatalogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatalogState("loading");
    setFormError("");

    try {
      const res = await fetch("/api/catalog-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: blade.id }),
      });

      if (!res.ok) throw new Error();

      setCatalogState("done");

      // Trigger download
      const a = document.createElement("a");
      a.href = catalogUrl;
      a.download = "sureay-catalog.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setCatalogState("form");
      setFormError(t("productDetail.hero.catalogError"));
    }
  };

  return (
    <section
      aria-label={title}
      className={`flex flex-col lg:flex-row overflow-hidden ${detailLayout ? "bg-white" : ""}`}
    >
      {/* ── Left: Product Image (580px) ───────────────────────── */}
      <div
        className={`lg:w-[580px] lg:shrink-0 ${detailLayout ? "" : "border-r border-slate-200"}`}
      >
        {breadcrumbs}
        <div
          className={`flex items-center justify-center overflow-hidden ${detailLayout ? "pt-2" : "h-[320px] bg-slate-100 lg:h-[520px]"}`}
          style={detailLayout ? undefined : DOT_GRID_STYLE}
        >
          <img
            src={activeSrc}
            srcSet={
              coverSrcSet ??
              (responsiveCover
                ? `${activeSrc.replace(/\.webp$/, "-640w.webp")} 640w, ${activeSrc} 800w`
                : undefined)
            }
            sizes={
              coverSrcSet || responsiveCover
                ? "(min-width: 1024px) 480px, 288px"
                : undefined
            }
            alt={activeAlt}
            className={`object-contain mix-blend-multiply ${detailLayout ? "aspect-square product-detail-image lg:w-[480px]" : "h-full w-full p-3"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={coverDimensions?.width ?? (detailLayout ? 800 : 580)}
            height={coverDimensions?.height ?? (detailLayout ? 800 : 520)}
          />
        </div>
        {heroImages.length > 1 && (
          <div className="flex gap-2 p-3 border-t border-slate-200 bg-white">
            {heroImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={t("bladeUi.viewImage").replace("{number}", String(i + 1)).replace("{name}", blade.name)}
                aria-current={i === activeImg}
                className={`h-16 w-16 lg:h-20 lg:w-20 shrink-0 border overflow-hidden transition-colors ${
                  i === activeImg
                    ? "border-[#001f4d]"
                    : "border-slate-200 hover:border-slate-400"
                }`}
                style={detailLayout ? undefined : DOT_GRID_STYLE}
              >
                <img
                  src={src}
                  srcSet={getWebpImageSrcSet(
                    src,
                    detailHeroImages?.[i]?.dimensions
                  )}
                  sizes={detailHeroImages ? "80px" : undefined}
                  alt={heroAlts?.[i] ?? ""}
                  className="h-full w-full object-contain p-1 mix-blend-multiply"
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={80}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Right: Product Info ───────────────────────────────── */}
      <div
        className={`flex-1 flex flex-col ${
          detailLayout
            ? "px-6 pt-6 lg:mt-[32px] lg:self-start lg:px-10 lg:pt-10"
            : "justify-between p-6 lg:p-10"
        }`}
      >
        <div className="space-y-5">
          {/* H1 — full product name */}
          <h1 className="blade-product-title font-black text-[#001f4d] leading-[1.15] tracking-tight">
            {title}
          </h1>

          {/* Disambiguation — points to a sibling product sharing this keyword root */}
          {(!detailLayout || isUpgradedShredderBlade(blade)) &&
            blade.disambiguation && (
              <p className="text-description text-muted-foreground leading-relaxed italic">
                {renderDisambiguation(blade.disambiguation)}
              </p>
            )}

          {heroSpecs.length > 0 && (
            <ul className="space-y-2.5 pt-1">
              {heroSpecs.map((spec, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="text-black font-black flex-shrink-0 text-[14px]">
                    ■
                  </span>
                  <span className="text-[18px] leading-snug text-black">
                    <span className="font-bold tracking-wide">
                      {spec.label}:{" "}
                    </span>
                    {spec.value}
                    {spec.emphasis && (
                      <>
                        {" "}
                        <strong>{spec.emphasis}</strong>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-3">
          <a
            href="#rfq"
            onClick={e => {
              e.preventDefault();
              document
                .getElementById("rfq")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm  tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
          >
            <span>{t("cta.getQuote")}</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>

          {/* Catalog download — email gate */}
          {catalogUrl && (
            <div className="border-2 border-slate-300">
              {/* Idle: show button */}
              {catalogState === "idle" && (
                <button
                  type="button"
                  onClick={() => setCatalogState("form")}
                  className="w-full bg-white hover:bg-slate-50 text-[#001f4d] font-bold text-sm  tracking-widest transition-colors duration-200 flex items-center justify-between px-6 py-3"
                >
                  <span>{t("productDetail.hero.downloadCatalog")}</span>
                  <Download className="w-4 h-4 shrink-0" />
                </button>
              )}

              {/* Form: email input */}
              {(catalogState === "form" || catalogState === "loading") && (
                <form onSubmit={handleCatalogSubmit} className="p-4 space-y-3">
                  <p className="font-mono text-[12px] text-muted-foreground  tracking-widest">
                    {t("productDetail.hero.emailPrompt")}
                  </p>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="w-full border border-slate-300 px-4 py-2.5 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#001f4d] rounded-none"
                  />
                  {formError && (
                    <p className="text-red-500 text-xs font-mono">
                      {formError}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={catalogState === "loading"}
                      className="flex-1 bg-[#001f4d] text-white font-black text-xs  tracking-widest px-4 py-2.5 hover:bg-[#001f4d] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {catalogState === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{t("common.sending")}</span>
                        </>
                      ) : (
                        t("productDetail.hero.sendAndDownload")
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogState("idle");
                        setFormError("");
                      }}
                      className="px-4 py-2.5 border border-slate-300 text-muted-foreground text-xs font-mono  tracking-widest hover:border-slate-400 transition-colors"
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                </form>
              )}

              {/* Done: confirmation */}
              {catalogState === "done" && (
                <div className="px-6 py-3 flex items-center gap-3">
                  <span className="text-green-600 font-black text-sm">✓</span>
                  <span className="font-mono text-[14px] text-slate-600  tracking-widest">
                    {t("productDetail.hero.downloadStarted")}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
