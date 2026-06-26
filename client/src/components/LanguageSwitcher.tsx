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

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GB from "country-flag-icons/react/3x2/GB";
import ES from "country-flag-icons/react/3x2/ES";
import FR from "country-flag-icons/react/3x2/FR";
import RU from "country-flag-icons/react/3x2/RU";
import VN from "country-flag-icons/react/3x2/VN";
import SA from "country-flag-icons/react/3x2/SA";
import {
  SUPPORTED_LANGS,
  localizedPath,
  stripLangPrefix,
  type Lang,
} from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

type FlagComponent = React.ComponentType<{ title?: string; className?: string }>;

const LANG_META: Record<Lang, { label: string; Flag: FlagComponent }> = {
  en: { label: "English", Flag: GB },
  es: { label: "Español", Flag: ES },
  fr: { label: "Français", Flag: FR },
  ru: { label: "Русский", Flag: RU },
  vi: { label: "Tiếng Việt", Flag: VN },
  ar: { label: "العربية", Flag: SA },
};

interface Props {
  // Visual variant. "light" = navbar (dark text on white), "dark" = drawer.
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({ variant = "light" }: Props) {
  const currentLang = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // The canonical path stripped of any language prefix. Computed once per
  // render from the live URL — Puppeteer prerender visits each route as a
  // fresh page load so window.location is always set correctly.
  const canonicalPath =
    typeof window !== "undefined"
      ? stripLangPrefix(window.location.pathname)
      : "/";

  // News pages are English-only — language switcher links must not add a
  // prefix; they point to the English canonical URL for news routes.
  const isNewsPath =
    canonicalPath === "/news" || canonicalPath.startsWith("/news/");

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

  // Mobile drawer: flex-wrap chip row — no dropdown needed on touch
  if (variant === "dark") {
    return (
      <div
        data-testid="language-switcher"
        data-current-lang={currentLang}
        className="flex flex-wrap gap-1.5"
      >
        {SUPPORTED_LANGS.map((lang) => {
          const isCurrent = lang === currentLang;
          const href = isNewsPath
            ? canonicalPath
            : localizedPath(canonicalPath, lang);
          const { label, Flag } = LANG_META[lang];
          return (
            <a
              key={lang}
              href={href}
              hrefLang={lang}
              data-lang={lang}
              className={`flex items-center gap-2 text-[12px] font-medium px-2.5 py-1.5 transition-colors ${
                isCurrent
                  ? "bg-white text-[#001f4d]"
                  : "text-white/50 border border-white/20 hover:text-white hover:border-white/50"
              }`}
            >
              <Flag className="w-5 h-auto flex-shrink-0" />
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Desktop: hover dropdown
  const { label: currentLabel, Flag: CurrentFlag } = LANG_META[currentLang];

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
          open ? "text-[#003366]" : "text-slate-500 hover:text-[#003366]"
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <CurrentFlag className="w-5 h-auto flex-shrink-0" />
        <span className="text-[13px] font-medium">{currentLabel}</span>
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
            className="absolute right-0 top-full mt-1.5 min-w-[180px] py-1 z-50 bg-white border border-slate-200 shadow-xl"
          >
            {SUPPORTED_LANGS.map((lang) => {
              const isCurrent = lang === currentLang;
              const href = isNewsPath
                ? canonicalPath
                : localizedPath(canonicalPath, lang);
              const { label, Flag } = LANG_META[lang];
              return (
                <li key={lang} role="option" aria-selected={isCurrent}>
                  <a
                    href={href}
                    hrefLang={lang}
                    data-lang={lang}
                    className={`flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors border-l-2 ${
                      isCurrent
                        ? "border-[#001f4d] bg-slate-50 text-[#001f4d] font-bold"
                        : "border-transparent text-slate-500 hover:border-[#001f4d] hover:bg-slate-50 hover:text-[#003366]"
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
