/**
 * LanguageSwitcher
 *
 * Swiss Brutalist hover dropdown. Lists all supported languages with their
 * native label. Selection triggers a full page reload via plain <a href>
 * (NOT wouter <Link>) so the App-level lang detection re-runs against the
 * new URL and the prerendered HTML for that locale is served fresh.
 *
 * Renders the same markup on every prerendered page — verify-i18n-build.ts
 * uses [data-testid="language-switcher"] as the assertion marker.
 */

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GB from "country-flag-icons/react/3x2/GB";
import ES from "country-flag-icons/react/3x2/ES";
import FR from "country-flag-icons/react/3x2/FR";
import RU from "country-flag-icons/react/3x2/RU";
import VN from "country-flag-icons/react/3x2/VN";
import SA from "country-flag-icons/react/3x2/SA";
import BR from "country-flag-icons/react/3x2/BR";
import TR from "country-flag-icons/react/3x2/TR";
import {
  getPageLanguages,
  isEnglishOnlyProductPath,
  localizedPath,
  stripLangPrefix,
  type Lang,
} from "@/lib/i18n";
import { useTranslation } from "@/lib/useTranslation";

type FlagComponent = React.ComponentType<{
  title?: string;
  className?: string;
}>;

const LANG_META: Record<Lang, { label: string; Flag: FlagComponent }> = {
  en: { label: "English", Flag: GB },
  es: { label: "Español", Flag: ES },
  fr: { label: "Français", Flag: FR },
  ru: { label: "Русский", Flag: RU },
  vi: { label: "Tiếng Việt", Flag: VN },
  ar: { label: "العربية", Flag: SA },
  // Brazilian Portuguese — the market analysis pointed at Brazil, not Portugal.
  pt: { label: "Português", Flag: BR },
  tr: { label: "Türkçe", Flag: TR },
};

interface Props {
  variant?: "light" | "mobile";
  onSelect?: () => void;
}

export default function LanguageSwitcher({ variant = "light", onSelect }: Props) {
  const { t, lang: currentLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const { label: currentLabel, Flag: CurrentFlag } = LANG_META[currentLang];

  // The canonical path stripped of any language prefix. Computed once per
  // render from the live URL — Puppeteer prerender visits each route as a
  // fresh page load so window.location is always set correctly.
  const canonicalPath =
    typeof window !== "undefined"
      ? stripLangPrefix(window.location.pathname)
      : "/";

  // English-only sections — language switcher links must not add a prefix;
  // they point to the English canonical URL instead. Mirrors the
  // isEnglishOnly grouping in SEO.tsx (news, legal pages).
  const isNewsPath =
    canonicalPath === "/news" || canonicalPath.startsWith("/news/");
  const isLegalPath =
    canonicalPath === "/privacy-policy" || canonicalPath === "/terms";
  const isEnglishOnlyPath =
    isNewsPath || isLegalPath || isEnglishOnlyProductPath(canonicalPath);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (variant === "mobile") {
    const languages: Lang[] = isEnglishOnlyPath
      ? ["en"]
      : getPageLanguages(canonicalPath);
    const suffix = typeof window === "undefined"
      ? ""
      : window.location.search + window.location.hash;
    const currentLanguage = (
      <>
        <Globe aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={1.6} />
        <span lang={currentLang} translate="no">{currentLabel}</span>
      </>
    );

    return (
      <div
        ref={rootRef}
        data-testid="language-switcher"
        data-current-lang={currentLang}
        className="text-[#243d52]"
        onKeyDown={event => {
          if (event.key === "Escape" && open) {
            event.stopPropagation();
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        {languages.length === 1 && languages[0] === currentLang ? (
          <div className="flex min-h-12 items-center gap-3 text-[16px]">
            {currentLanguage}
          </div>
        ) : (
          <>
            <button
              ref={triggerRef}
              type="button"
              aria-controls={listId}
              aria-expanded={open}
              aria-label={`${t("common.chooseLanguage")}, ${currentLabel}`}
              onClick={() => setOpen(value => !value)}
              className="flex min-h-12 w-full items-center gap-3 text-start text-[16px] font-normal"
            >
              {currentLanguage}
              <ChevronDown
                aria-hidden="true"
                className={`ms-auto size-4 motion-safe:transition-transform ${open ? "rotate-180" : ""}`}
                strokeWidth={1.6}
              />
            </button>
            <ul
              id={listId}
              aria-label={t("common.chooseLanguage")}
              className={open ? "grid grid-cols-2 gap-x-2 pb-3" : "hidden"}
            >
              {languages.map(lang => (
                <li key={lang}>
                  <a
                    href={localizedPath(canonicalPath, lang) + suffix}
                    hrefLang={lang}
                    lang={lang}
                    translate="no"
                    data-lang={lang}
                    aria-current={lang === currentLang ? "page" : undefined}
                    onClick={onSelect}
                    className={`flex min-h-11 items-center justify-between gap-2 px-3 text-[15px] hover:bg-slate-50 ${
                      lang === currentLang ? "bg-slate-100 font-medium text-[#001f4d]" : "font-normal"
                    }`}
                  >
                    <bdi dir={lang === "ar" ? "rtl" : "ltr"}>{LANG_META[lang].label}</bdi>
                    {lang === currentLang && <Check aria-hidden="true" className="size-4 shrink-0" />}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  // Desktop: hover dropdown
  return (
    <div
      ref={rootRef}
      data-testid="language-switcher"
      data-current-lang={currentLang}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose language"
        className={`flex items-center gap-1.5 px-2 py-1 transition-colors cursor-pointer ${
          open ? "text-[#003366]" : "text-muted-foreground hover:text-[#003366]"
        }`}
        onClick={() => setOpen(v => !v)}
      >
        <CurrentFlag className="w-5 h-auto flex-shrink-0" />
        <span className="text-[16px] font-medium">{currentLabel}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute right-0 top-full mt-1.5 min-w-[180px] py-1 z-50 bg-white border border-slate-200 shadow-none"
          >
            {getPageLanguages(canonicalPath).map(lang => {
              const isCurrent = lang === currentLang;
              const href = isEnglishOnlyPath
                ? canonicalPath
                : localizedPath(canonicalPath, lang);
              const { label, Flag } = LANG_META[lang];
              return (
                <li key={lang} role="option" aria-selected={isCurrent}>
                  <a
                    href={href}
                    hrefLang={lang}
                    data-lang={lang}
                    className={`flex items-center gap-3 px-4 py-2.5 text-[16px] font-medium transition-colors border-l-2 ${
                      isCurrent
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d] font-bold"
                        : "border-transparent text-muted-foreground hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#003366]"
                    }`}
                  >
                    <Flag className="w-5 h-auto flex-shrink-0" />
                    <span className="flex-1">{label}</span>
                    {isCurrent && (
                      <Check
                        className="w-3 h-3 text-[#001f4d] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
