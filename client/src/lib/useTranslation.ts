/**
 * React hook for translations.
 *
 *   const { t, lang } = useTranslation();
 *   <button>{t("cta.getQuote")}</button>
 *
 * Outside <LangProvider>, useLang() returns DEFAULT_LANG ("en") — safe default.
 */

import { useLang } from "@/contexts/LangContext";
import { translate } from "./translations";
import type { Lang } from "./i18n";

export function useTranslation(): {
  t: (key: string) => string;
  lang: Lang;
} {
  const lang = useLang();
  return {
    t: (key: string) => translate(key, lang),
    lang,
  };
}
