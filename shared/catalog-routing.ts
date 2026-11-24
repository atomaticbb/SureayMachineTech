/** Catalog migrations apply to each language and preserve the visitor’s locale. */
export const RETIRED_PRODUCT_PATHS: readonly string[] = [
  "/products/mobile-scrap-shear-blades",
  "/products/cut-to-length-shear-knives",
  "/products/rotary-trimmer-knives",
];

export const CATEGORY_REDIRECTS: readonly {
  from: string;
  to: string;
}[] = [
  {
    from: "/categories/granulator-blades",
    to: "/categories/shredder-blades#single-shaft-parts",
  },
  {
    from: "/categories/custom-profile",
    to: "/categories/other-custom-blades",
  },
];

const localePrefix = /^\/(en|es|fr|ru|vi|ar|pt|tr)(?=\/)/;

export function getCategoryRedirect(pathname: string): string | undefined {
  const prefix = pathname.match(localePrefix)?.[0] ?? "";
  const canonical = pathname.slice(prefix.length).replace(/\/$/, "");
  const rule = CATEGORY_REDIRECTS.find(item => item.from === canonical);
  if (rule) return (prefix === "/en" ? "" : prefix) + rule.to;
}

export function isRetiredProductPath(pathname: string): boolean {
  return RETIRED_PRODUCT_PATHS.includes(
    pathname.replace(localePrefix, "").replace(/\/$/, "")
  );
}

export function appendRedirectQuery(target: string, query: string): string {
  const [pathname, hash] = target.split("#");
  return `${pathname}${query}${hash ? `#${hash}` : ""}`;
}
