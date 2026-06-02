import { describe, it, expect } from "vitest";
import en from "./en.json";

const entries = Object.entries(en as Record<string, string>);

describe("locales/en.json", () => {
  it("has a meaningful number of keys (Task 2.1 expanded coverage)", () => {
    expect(entries.length).toBeGreaterThanOrEqual(60);
  });

  it("every value is a non-empty string", () => {
    for (const [key, value] of entries) {
      expect(typeof value, key).toBe("string");
      expect(value.trim(), key).not.toBe("");
    }
  });

  it("keys follow the namespace.path convention", () => {
    // namespace.path[.subpath]  → at least one dot, lowercase namespace,
    // alnum/dot/hyphen/camelCase segments.
    const pattern = /^[a-z][a-zA-Z0-9]*(\.[a-zA-Z0-9-]+)+$/;
    for (const [key] of entries) {
      expect(key, key).toMatch(pattern);
    }
  });

  it("namespaces include the expected top-level groups", () => {
    const namespaces = new Set(entries.map(([k]) => k.split(".")[0]));
    expect(namespaces).toContain("nav");
    expect(namespaces).toContain("cta");
    expect(namespaces).toContain("common");
    expect(namespaces).toContain("footer");
    expect(namespaces).toContain("contact");
    expect(namespaces).toContain("product");
  });

  it("no duplicate values within the same namespace (suggests key consolidation)", () => {
    // Cross-namespace dupes (e.g. cta.requestQuote = footer.requestQuote) are
    // OK — different contexts may need different translations. But two keys
    // in the same namespace with identical English are a smell.
    //
    // The `industry` namespace is EXEMPT: industries legitimately share
    // vocabulary (abrasion levels HIGH/LOW/EXTREME, spec labels like
    // "Surface Finish") across pages that translate to the same target
    // strings. Consolidating them would couple unrelated industry pages.
    const EXEMPT_NAMESPACES = new Set(["industry"]);
    const byNamespace: Record<string, Map<string, string[]>> = {};
    for (const [key, value] of entries) {
      const ns = key.split(".")[0];
      if (EXEMPT_NAMESPACES.has(ns)) continue;
      byNamespace[ns] ??= new Map();
      const existing = byNamespace[ns].get(value) ?? [];
      existing.push(key);
      byNamespace[ns].set(value, existing);
    }
    const offenders: string[] = [];
    for (const [ns, map] of Object.entries(byNamespace)) {
      for (const [value, keys] of map.entries()) {
        if (keys.length > 1) {
          offenders.push(`[${ns}] "${value}" → ${keys.join(", ")}`);
        }
      }
    }
    expect(offenders, "duplicate values within namespace").toEqual([]);
  });
});
