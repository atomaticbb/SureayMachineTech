import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  extractTranslatableFields,
  applyTranslations,
  preprocessGlossary,
  postprocessGlossary,
  GLOSSARY,
  DeepLProvider,
  MyMemoryProvider,
  translateAll,
  type LangCode,
  type TranslationProvider,
} from "./translate-lib";

// ── extractTranslatableFields ───────────────────────────────────────────────

describe("extractTranslatableFields", () => {
  it("extracts strings from top-level object", () => {
    const fields = extractTranslatableFields({
      name: "Granulator Blades",
      description: "High wear-resistant tool steel",
    });
    expect(fields).toEqual([
      { path: ["name"], value: "Granulator Blades" },
      { path: ["description"], value: "High wear-resistant tool steel" },
    ]);
  });

  it("recurses into nested objects", () => {
    const fields = extractTranslatableFields({
      meta: { tagline: "Precision blades", subtitle: "Since 2008" },
    });
    expect(fields).toEqual([
      { path: ["meta", "tagline"], value: "Precision blades" },
      { path: ["meta", "subtitle"], value: "Since 2008" },
    ]);
  });

  it("recurses into arrays with numeric indices", () => {
    // Use a key that isn't in the skip list — "highlights" stands in for
    // any non-excluded array. (faqs / components / standardDimensions / specs
    // are excluded by NON_TRANSLATABLE_KEYS — see other tests.)
    const fields = extractTranslatableFields({
      highlights: [
        { question: "Q1", answer: "A1" },
        { question: "Q2", answer: "A2" },
      ],
    });
    expect(fields).toHaveLength(4);
    expect(fields[0]).toEqual({
      path: ["highlights", 0, "question"],
      value: "Q1",
    });
    expect(fields[3]).toEqual({
      path: ["highlights", 1, "answer"],
      value: "A2",
    });
  });

  it("skips faqs / components arrays entirely (bulk content stays English)", () => {
    const fields = extractTranslatableFields({
      faqs: { technical: [{ question: "Q1", answer: "A1" }] },
      components: [{ title: "Step One", description: "Detail" }],
      name: "Product Name",
    });
    expect(fields).toEqual([{ path: ["name"], value: "Product Name" }]);
  });

  it("skips non-translatable keys (slug, id, image, etc)", () => {
    const fields = extractTranslatableFields({
      id: "granulator-blades",
      slug: "granulator",
      image: "/images/blade.webp",
      gallery: ["/a.webp", "/b.webp"],
      href: "/products/granulator",
      url: "https://sureay.com",
      category: "granulator_blades",
      sector: "recycling",
      badgeColor: "green",
      compatibleMachines: ["BHS", "Vecoplan"],
      relatedBladeIds: ["a", "b"],
      offers: { lowPrice: 100, highPrice: 500 },
      isFeatured: true,
      // Tables of dimensional codes — values like "450 * 51 * 12/10" and
      // "Komatsu LG-1500" don't translate sensibly, so the whole array is
      // skipped. Column headers come from en.json (product.tableHeader.*).
      standardDimensions: [
        { spec: "450 * 51 * 12/10", oem: "Komatsu LG-1500" },
      ],
      specs: [{ label: "Material", value: "D2 / SKD11" }],
      name: "Granulator Blades",
    });
    expect(fields).toEqual([{ path: ["name"], value: "Granulator Blades" }]);
  });

  it("skips URL-like strings", () => {
    const fields = extractTranslatableFields({
      anyKey: "https://sureay.com/products",
      anotherKey: "/products/foo",
      mail: "mailto:lynn@sureay.com",
      tel: "tel:+86123",
      normal: "Real text",
    });
    expect(fields.map(f => f.path[0])).toEqual(["normal"]);
  });

  it("skips file-path-like strings", () => {
    const fields = extractTranslatableFields({
      a: "blade-v2.webp",
      b: "spec-sheet.pdf",
      c: "Real description",
    });
    expect(fields.map(f => f.path[0])).toEqual(["c"]);
  });

  it("skips short / empty / whitespace strings", () => {
    const fields = extractTranslatableFields({
      a: "",
      b: " ",
      c: "x",
      d: "Good text",
    });
    expect(fields.map(f => f.path[0])).toEqual(["d"]);
  });

  it("handles deeply nested mixed structures", () => {
    const fields = extractTranslatableFields({
      sections: [
        {
          title: "Process Audit",
          items: [
            { id: "1", label: "Step One" },
            { id: "2", label: "Step Two", image: "/x.webp" },
          ],
        },
      ],
    });
    expect(fields).toEqual([
      { path: ["sections", 0, "title"], value: "Process Audit" },
      { path: ["sections", 0, "items", 0, "label"], value: "Step One" },
      { path: ["sections", 0, "items", 1, "label"], value: "Step Two" },
    ]);
  });
});

// ── applyTranslations ────────────────────────────────────────────────────────

describe("applyTranslations", () => {
  it("round-trips: extract → translate → apply preserves shape", () => {
    // Use "highlights" rather than "faqs" — the latter is now in the skip
    // list (translation of long-form Q&A is deferred per Task 2.3 scope).
    const original = {
      id: "granulator",
      name: "Granulator Blades",
      highlights: [{ id: "h1", question: "Are these durable?", answer: "Yes." }],
      image: "/keep.webp",
    };
    const fields = extractTranslatableFields(original);
    const translated = fields.map(f => `[ES] ${f.value}`);
    const result = applyTranslations(original, fields, translated);

    expect(result.id).toBe("granulator"); // untouched
    expect(result.image).toBe("/keep.webp"); // untouched
    expect(result.name).toBe("[ES] Granulator Blades");
    expect(result.highlights[0].id).toBe("h1"); // untouched
    expect(result.highlights[0].question).toBe("[ES] Are these durable?");
    expect(result.highlights[0].answer).toBe("[ES] Yes.");
  });

  it("does not mutate the input", () => {
    const original = { name: "Original" };
    const fields = extractTranslatableFields(original);
    applyTranslations(original, fields, ["Modified"]);
    expect(original.name).toBe("Original");
  });

  it("throws on length mismatch", () => {
    const original = { name: "X", other: "Y" };
    const fields = extractTranslatableFields(original);
    expect(() => applyTranslations(original, fields, ["only one"])).toThrow();
  });
});

// ── Glossary preprocessing ──────────────────────────────────────────────────

describe("preprocessGlossary / postprocessGlossary", () => {
  it("round-trips a known glossary term", () => {
    const { processed, placeholders } = preprocessGlossary(
      "Our shredder blades cut everything",
      "es"
    );
    expect(processed).not.toContain("shredder blades");
    expect(processed).toContain("zGTR");

    // Simulate "translation": replace English text but keep placeholders.
    const restored = postprocessGlossary(
      processed.replace("Our", "Nuestras").replace("cut everything", "cortan todo"),
      placeholders
    );
    expect(restored).toContain(GLOSSARY.es["shredder blades"]);
    expect(restored).not.toContain("zGTR");
  });

  it("leaves untouched text without glossary terms", () => {
    const { processed, placeholders } = preprocessGlossary(
      "Random unrelated sentence",
      "fr"
    );
    expect(processed).toBe("Random unrelated sentence");
    expect(placeholders.size).toBe(0);
  });

  it("handles multiple distinct terms in one string", () => {
    const { processed, placeholders } = preprocessGlossary(
      "Our granulator blades and shredder blades both use tungsten carbide.",
      "es"
    );
    // Three distinct glossary terms — each gets its own placeholder.
    expect(placeholders.size).toBeGreaterThanOrEqual(3);
    const restored = postprocessGlossary(processed, placeholders);
    expect(restored).toContain(GLOSSARY.es["granulator blades"]);
    expect(restored).toContain(GLOSSARY.es["shredder blades"]);
    expect(restored).toContain(GLOSSARY.es["tungsten carbide"]);
  });
});

// ── DeepL provider (mocked fetch) ───────────────────────────────────────────

describe("DeepLProvider", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            translations: [{ text: "[deepl-es] hello" }, { text: "[deepl-es] world" }],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        )
      )
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it("translates a batch and sends correct headers/body", async () => {
    const provider = new DeepLProvider("test-key");
    const result = await provider.translateBatch(["hello", "world"], "es");
    expect(result).toEqual(["[deepl-es] hello", "[deepl-es] world"]);

    const fetchMock = vi.mocked(global.fetch);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api-free.deepl.com/v2/translate");
    expect((init?.headers as Record<string, string>).Authorization).toBe(
      "DeepL-Auth-Key test-key"
    );
    const body = (init?.body as URLSearchParams).toString();
    expect(body).toContain("text=hello");
    expect(body).toContain("text=world");
    expect(body).toContain("target_lang=ES");
    expect(body).toContain("source_lang=EN");
  });

  it("rejects unsupported languages", async () => {
    const provider = new DeepLProvider("test-key");
    await expect(provider.translateBatch(["x"], "vi")).rejects.toThrow(/does not support/);
  });

  it("throws on non-200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("rate limited", { status: 429 }))
    );
    const provider = new DeepLProvider("test-key");
    await expect(provider.translateBatch(["x"], "es")).rejects.toThrow(/DeepL 429/);
  });
});

// ── MyMemory provider (mocked fetch) ────────────────────────────────────────

describe("MyMemoryProvider", () => {
  it("translates per-text and sends correct query params", async () => {
    const responses = ["[vi] hello", "[vi] world"];
    let call = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            responseStatus: 200,
            responseData: { translatedText: responses[call++] },
          }),
          { status: 200 }
        )
      )
    );

    const provider = new MyMemoryProvider(undefined, undefined, 0);
    const result = await provider.translateBatch(["hello", "world"], "vi");
    expect(result).toEqual(["[vi] hello", "[vi] world"]);

    const fetchMock = vi.mocked(global.fetch);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [url1] = fetchMock.mock.calls[0];
    expect(url1).toContain("langpair=en%7Cvi");
    expect(url1).toContain("q=hello");
    vi.unstubAllGlobals();
  });
});

// ── translateAll integration with mock provider ─────────────────────────────

class MockProvider implements TranslationProvider {
  readonly name = "mock";
  readonly supportedLangs: ReadonlyArray<LangCode> = ["es", "fr", "ru", "vi"];
  calls: { texts: string[]; lang: LangCode }[] = [];

  async translateBatch(texts: string[], targetLang: LangCode): Promise<string[]> {
    this.calls.push({ texts: [...texts], lang: targetLang });
    return texts.map(t => `[${targetLang}] ${t}`);
  }
}

describe("translateAll", () => {
  it("batches with the configured batch size", async () => {
    const provider = new MockProvider();
    const texts = Array.from({ length: 125 }, (_, i) => `text ${i}`);
    const result = await translateAll(provider, texts, "es", { batchSize: 50 });
    expect(result).toHaveLength(125);
    expect(provider.calls).toHaveLength(3); // 50 + 50 + 25
    expect(provider.calls[0].texts).toHaveLength(50);
    expect(provider.calls[2].texts).toHaveLength(25);
  });

  it("preserves glossary terms across the round-trip", async () => {
    const provider = new MockProvider();
    const result = await translateAll(
      provider,
      ["We make shredder blades and tungsten carbide tooling"],
      "es",
      { batchSize: 50 }
    );
    // The mock prefixes with [es] — but the glossary terms should be the
    // Spanish equivalent, restored by postprocessGlossary.
    expect(result[0]).toContain(GLOSSARY.es["shredder blades"]);
    expect(result[0]).toContain(GLOSSARY.es["tungsten carbide"]);
  });

  it("rejects unsupported lang per provider", async () => {
    const provider = new DeepLProvider("k");
    await expect(translateAll(provider, ["x"], "vi")).rejects.toThrow(/does not support/);
  });

  it("reports progress for every batch", async () => {
    const provider = new MockProvider();
    const progress: [number, number][] = [];
    await translateAll(provider, ["a", "b", "c", "d", "e"], "fr", {
      batchSize: 2,
      onProgress: (done, total) => progress.push([done, total]),
    });
    expect(progress).toEqual([
      [2, 5],
      [4, 5],
      [5, 5],
    ]);
  });
});
