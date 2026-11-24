import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  blades,
  draftBlades,
  getCatalogUrl,
  getBladeSizeRange,
  getShredderDetailBlade,
  getWebpImageSrcSet,
  isUpgradedShredderBlade,
} from "./blades";
import { COMPLETE_CATALOG_URL } from "../lib/catalogPdf";

const catalog = [...blades, ...draftBlades];

describe("published blade catalog downloads", () => {
  it("uses the English catalog for all blade downloads", () => {
    expect(COMPLETE_CATALOG_URL).toBe(
      "/catalogs/sureay-complete-product-catalog.pdf"
    );
    expect(blades.every(blade => getCatalogUrl(blade) === COMPLETE_CATALOG_URL))
      .toBe(true);
  });
});

describe("English catalog item numbers", () => {
  it("retains all 40 original Wood and Other dimension rows plus the Biber supplement with stable identifiers", () => {
    const configurations = [
      {
        id: "wood-chipper-blades",
        prefix: "SR006",
        start: 101,
        labels: [
          "Chipper Type / OEM Platform",
          "Length (mm)",
          "Width (mm)",
          "Thickness (mm)",
        ],
        fields: ["spec", "od", "id", "thickness"],
        rows: [
          ['Bandit 12" / 15" Drum', "230", "80", "16"],
          ['Bandit 18" / 19" Drum', "295", "80", "19"],
          ["Vermeer BC1800 / BC2100", "310", "100", "19"],
          ["Morbark 40/36 Drum", "400", "100", "22"],
          ["Morbark 50/48 Disc", "250", "120", "25"],
          ["Peterson 5710 Disc", "280", "130", "25"],
          ["Doppstadt / Jenz Biomass", "350", "100", "20"],
          ["Heavy Whole-Tree Chipper", "600", "150", "30"],
          ["Eschlböck Biber", "245", "285", "20"],
        ],
      },
      {
        id: "wood-chipper-anvils",
        prefix: "SR006",
        start: 201,
        labels: [
          "Chipper OEM / Model",
          "Length (mm)",
          "Width (mm)",
          "Thickness (mm)",
        ],
        fields: ["spec", "od", "id", "thickness"],
        rows: [
          ['Bandit 12" / 15" / Mighty Bandit', "185", "75", "10"],
          ['Bandit 18" / 19" / 1290 / 1590', "265", "95", "12"],
          ["Vermeer BC1200 / BC1500", "200", "80", "12"],
          ["Vermeer BC1800 / BC2000", "260", "100", "16"],
          ["Morbark 2 / 5 / 7 / 12 / 13", "265", "95", "12"],
          ["Morbark 40/36 / 50/48", "400", "100", "20"],
          ["Timberwolf 150 / 190 / 230", "230", "80", "16"],
          ["Schliesing 400 / 500 / 550 / 600 / 660", "260", "80", "20"],
          [
            "Greenmech / Jensen / Forst",
            "Per OEM Drawing",
            "Per OEM Drawing",
            "Per OEM Drawing",
          ],
        ],
      },
      {
        id: "strand-pelletizer-rotors",
        prefix: "SR007",
        start: 101,
        labels: [
          "OEM Platform",
          "Rotor Diameter (mm)",
          "Cutting Width (mm)",
          "Tooth Count",
          "Helix Angle",
        ],
        fields: ["spec", "od", "id", "length", "teeth"],
        rows: [
          [
            "Maag Primo / Baoli",
            "100 – 200",
            "80 – 300",
            "12 / 16 / 24",
            "2° / 3°",
          ],
          [
            "Coperion SP Series",
            "120 – 250",
            "100 – 350",
            "16 / 24 / 32",
            "1.5° / 2°",
          ],
          ["Cumberland Quietizer", "100 – 180", "80 – 250", "12 / 16", "2° / 3°"],
          [
            "Conair 304 / 306 / CS",
            "100 – 200",
            "80 – 300",
            "12 / 16 / 24",
            "2°",
          ],
          [
            "Reduction Engineering SGS",
            "120 – 220",
            "100 – 320",
            "16 / 24 / 32",
            "1.5° / 2° / 3°",
          ],
        ],
      },
      {
        id: "continuous-melt-filter-scraper-blades",
        prefix: "SR007",
        start: 201,
        labels: [
          "Filter Model / OEM",
          "Blade Length (mm)",
          "Blade Width (mm)",
          "Thickness (mm)",
        ],
        fields: ["spec", "od", "id", "thickness"],
        rows: [
          ["EREMA", "180 – 420", "25 – 40", "6 / 8"],
          ["Gneuß Rotary System", "150 – 380", "20 – 35", "5 / 8"],
          ["Ettlinger ERF 200/350", "200 / 350", "30 / 40", "8 / 10"],
          ["FIMIC", "160 – 400", "22 – 38", "6 / 8"],
          ["Kreyenborg KSF", "200 – 500", "30 – 50", "8 / 12"],
          ["Nordson BKG", "150 – 350", "20 – 35", "5 / 8"],
        ],
      },
      {
        id: "cutter-compactor-blades",
        prefix: "SR007",
        start: 301,
        labels: ["Knife Type", "Length (mm)", "Width (mm)", "Thickness (mm)"],
        fields: ["spec", "od", "bolt", "thickness"],
        rows: [
          ["Rotor knife (movable)", "150 – 250", "40 – 60", "8 – 12"],
          ["Rotor knife (movable)", "250 – 400", "60 – 80", "12 – 20"],
          ["Stator knife (fixed)", "120 – 220", "40 – 60", "10 – 16"],
          ["Stator knife (fixed)", "220 – 350", "60 – 80", "16 – 25"],
          ["Pre-cutter / feed blade", "80 – 160", "30 – 50", "8 – 14"],
          ["Knife holder block", "60 – 120", "50 – 90", "20 – 40"],
        ],
      },
      {
        id: "die-face-cutting-knives",
        prefix: "SR007",
        start: 401,
        labels: [
          "Blade Profile",
          "Length × Width (mm)",
          "Thickness (mm)",
          "Mounting",
        ],
        fields: ["spec", "od", "bolt", "thickness"],
        rows: [
          ["Straight, twin slot", "45 × 25", "3 – 6", "2 × Ø5.5 slots"],
          ["Straight, twin slot", "60 × 30", "3 – 6", "2 × R3.5 slots"],
          ["Straight, wide body", "60 × 46", "4 – 8", "2 × R3.5, R5 relief"],
          ["Forked, triple slot", "55 × 34", "3 – 6", "3 × R3.5 slots"],
          ["Stepped / shouldered", "60 × 35", "4 – 8", "2 slots, 129° flank"],
          ["Tapered / hooked", "70 × 60", "4 – 8", "63° flank"],
        ],
      },
    ];
    const identifiers = catalog.flatMap((blade) => [
      ...(blade.standardDimensions ?? []).map((row) => row.itemNo),
      ...(blade.detailLayout?.dimensionTables ?? []).flatMap((table) =>
        table.rows.map((row) => row[0])
      ),
    ]);

    for (const expected of configurations) {
      const blade = blades.find((product) => product.id === expected.id)!;
      const rows = blade.standardDimensions ?? [];
      const labels = blade.dimensionLabels;
      expect(
        [
          labels?.col0,
          labels?.col1,
          labels?.col2,
          labels?.col3,
          labels?.col4,
        ].slice(0, expected.labels.length),
        blade.id
      ).toEqual(expected.labels);
      expect(rows, blade.id).toHaveLength(expected.rows.length);
      expected.rows.forEach((values, index) => {
        const itemNo = `${expected.prefix}${expected.start + index}`;
        expect(
          rows.find((row) => row.itemNo === itemNo),
          `${blade.id}/${itemNo}`
        ).toEqual({
          itemNo,
          ...Object.fromEntries(
            expected.fields.map((field, i) => [field, values[i]])
          ),
        });
      });
      for (const row of rows) {
        expect(row.itemNo, blade.id).toMatch(
          new RegExp(`^${expected.prefix}\\d{3}$`)
        );
        expect(
          identifiers.filter((item) => item === row.itemNo),
          row.itemNo
        ).toHaveLength(1);
      }
      expect(blade.detailLayout?.sizeRange, blade.id).not.toBe("Made to Drawing");
      expect(
        blade.specs.find((spec) => spec.label === "Sizes")?.value,
        blade.id
      ).not.toBe("Made to Drawing");
    }
  });

  it("uses SR005 for the six confirmed Tissue Log Saw configurations", () => {
    const rows = blades.find(b => b.id === "tissue-log-saw-blades")?.standardDimensions;
    expect(rows?.map(({ itemNo, od, id, thickness }) => [itemNo, od, id, thickness])).toEqual([
      ["SR005101", "610", "68.26", "4.76"],
      ["SR005102", "610", "68.26", "3.80"],
      ["SR005103", "610", "82.55", "4.76"],
      ["SR005104", "680", "68.26", "4.76"],
      ["SR005105", "870", "60", "6.0"],
      ["SR005106", "1000", "60", "6.0"],
    ]);
    const identifiers = catalog.flatMap(b => [
      ...(b.standardDimensions ?? []).flatMap(row => row.itemNo ? [row.itemNo] : []),
      ...(b.detailLayout?.dimensionTables ?? []).flatMap(table => table.rows.map(row => row[0])),
    ]);
    for (const row of rows ?? []) {
      expect(identifiers.filter(item => item === row.itemNo)).toHaveLength(1);
    }
  });

  it("retains Nonwoven dimensions without restoring excluded application labels", () => {
    const blade = blades.find(b => b.id === "nonwoven-log-saw-blades")!;
    expect(blade.standardDimensions).toEqual([
      { itemNo: "SR005201", od: "400", id: "To drawing", thickness: "3.80" },
      { itemNo: "SR005202", od: "450", id: "To drawing", thickness: "4.00" },
      { itemNo: "SR005203", od: "500", id: "To drawing", thickness: "4.00" },
      { itemNo: "SR005204", od: "550", id: "To drawing", thickness: "4.76" },
      { itemNo: "SR005205", od: "600", id: "To drawing", thickness: "4.76" },
      {
        itemNo: "SR005206",
        od: "Ø350–700",
        id: "To drawing",
        thickness: "3.80–6.00",
      },
    ]);
    expect(blade.dimensionLabels?.col0).toBeUndefined();
  });

  it("retains the eight original Granulator configurations alongside six OEM supplements", () => {
    const blade = blades.find(b => b.id === "granulator-blades")!;
    const rows = blade.standardDimensions ?? [];
    expect(rows).toHaveLength(14);
    expect(rows.slice(0, 8).map(row => [row.itemNo, row.spec, row.od, row.bolt])).toEqual([
      ["SR002801", "Double hole", "90 × 70 × 8", "40 / 45 / 50"],
      ["SR002802", "Double hole", "120 × 70 × 8", "60"],
      ["SR002803", "Triple hole", "126 × 60 × 8", "40"],
      ["SR002804", "Triple hole", "150 × 70 × 8", "50 / 55"],
      ["SR002805", "Triple hole", "170 × 70 × 8", "45"],
      ["SR002806", "Triple hole", "180 × 70 × 8", "60"],
      ["SR002807", "Quadra hole", "170 × 70 × 8", "40"],
      ["SR002808", "Quadra hole", "200 × 70 × 8", "50"],
    ]);
    expect(rows.slice(8).map(row => [row.itemNo, row.od, row.bolt])).toEqual([
      ["SR002809", "310 × 100 × 22", "To drawing"],
      ["SR002810", "646 × 100 × 22", "To drawing"],
      ["SR002811", "568 × 100 × 22", "To drawing"],
      ["SR002812", "1178 × 100 × 22", "To drawing"],
      ["SR002813", "385 × 100 × 22", "To drawing"],
      ["SR002814", "795 × 100 × 22", "To drawing"],
    ]);
    expect(rows.slice(8).every(row => row.spec?.includes("ZERMA"))).toBe(true);
    expect(blade.dimensionLabels?.col0).toBe("Configuration");
    expect(getBladeSizeRange(blade)).toBe("90–1178 mm");

    const allIdentifiers = catalog.flatMap(product => [
      ...(product.standardDimensions ?? []).map(row => row.itemNo),
      ...(product.detailLayout?.dimensionTables ?? []).flatMap(table => table.rows.map(row => row[0])),
    ]);
    const restored = [
      ...rows,
      ...(blades.find(product => product.id === "nonwoven-log-saw-blades")?.standardDimensions ?? []),
    ];
    for (const row of restored) {
      expect(allIdentifiers.filter(item => item === row.itemNo), row.itemNo).toHaveLength(1);
    }
  });

  it("uses Item No. for every configured dimensions table", () => {
    for (const blade of catalog) {
      for (const table of blade.detailLayout?.dimensionTables ?? []) {
        const context = `${blade.id}/${table.id}`;
        expect(table.columns[0], context).toBe("Item No.");
        expect(table.rows.length, context).toBeGreaterThan(0);
        for (const row of table.rows) {
          expect(row.length, context).toBe(table.columns.length);
        }
      }
    }
  });

  it("uses SR001 for each Slitter configuration and keeps shared dimensions consistent", () => {
    const dimensionsByItem = new Map<string, string>();

    for (const blade of catalog.filter(b => b.category === "slitter_knives")) {
      const tables = blade.detailLayout?.dimensionTables ?? [];
      expect(tables.length, blade.id).toBeGreaterThan(0);
      for (const table of tables) {
        const context = `${blade.id}/${table.id}`;
        const items = table.rows.map(([itemNo]) => itemNo);
        expect(new Set(items).size, context).toBe(items.length);

        for (const [itemNo, dimensions] of table.rows) {
          expect(itemNo, context).toMatch(/^SR001\d{3}$/);
          if (dimensionsByItem.has(itemNo)) {
            expect(dimensions, `${context}/${itemNo}`).toBe(
              dimensionsByItem.get(itemNo)
            );
          }
          dimensionsByItem.set(itemNo, dimensions);
        }
      }
    }
  });

  it("assigns a distinct SR002 number to every upgraded Shredder row", () => {
    const items = new Set<string>();

    for (const blade of catalog.filter(isUpgradedShredderBlade)) {
      const rows = blade.standardDimensions ?? [];
      expect(rows.length, blade.id).toBeGreaterThan(0);
      for (const { itemNo = "" } of rows) {
        expect(itemNo, blade.id).toMatch(/^SR002\d{3}$/);
        expect(items.has(itemNo), itemNo).toBe(false);
        items.add(itemNo);
      }
    }
  });

  it("keeps legacy paper identifiers and assigns distinct category codes to new configurations", () => {
    const items = new Set<string>();
    const legacyPaper = ["paper-cutting-blades", "three-knife-trimmer-blades"];
    for (const blade of catalog.filter(b => ["shear_blades", "paper_cutting"].includes(b.category))) {
      const tables = blade.detailLayout?.dimensionTables ?? [];
      const drawingOnly = ["flying-shear-blades"].includes(blade.id);
      expect(tables.length > 0, blade.id).toBe(!drawingOnly);
      for (const table of tables) {
        for (const [itemNo] of table.rows) {
          const prefix = blade.category === "shear_blades" || legacyPaper.includes(blade.id) ? "SR003" : "SR004";
          expect(itemNo, blade.id).toMatch(new RegExp(`^${prefix}\\d{3}$`));
          expect(items.has(itemNo), itemNo).toBe(false);
          items.add(itemNo);
        }
      }
    }
    expect(items.size).toBe(62);
    expect([...items].filter(item => item.startsWith("SR004"))).toHaveLength(11);
    for (const serial of [101,102,103,104,105,106,107,108, ...Array.from({length:18}, (_,i) => 401+i)]) {
      expect(items.has(`SR003${serial}`)).toBe(true);
    }
  });
});

describe("upgraded English catalog pages", () => {
  const products = blades.filter(
    blade => Boolean(blade.detailLayout) || isUpgradedShredderBlade(blade)
  );

  it("keeps the approved Wood and process-specific products on the complete detail template", () => {
    for (const id of [
      "wood-chipper-blades", "wood-chipper-anvils",
      "strand-pelletizer-rotors", "continuous-melt-filter-scraper-blades",
      "cutter-compactor-blades", "die-face-cutting-knives",
    ]) {
      const blade = blades.find(b => b.id === id)!;
      expect(blade.detailLayout?.heroAlt, id).toBeTruthy();
      expect(blade.seoTitle || blade.detailLayout?.seoTitle, id).toBeTruthy();
      expect(blade.detailLayout?.technicalSpecs, id).toEqual(blade.specs);
      expect(blade.detailLayout?.additionalHeroImages ?? [], id).toEqual([]);
      expect(blade.compatibleMachines?.length, id).toBeGreaterThan(0);
      expect(blade.compatibleMachinesIntro, id).toBeTruthy();
      expect(blade.components, id).toHaveLength(3);
      expect(blade.faqs?.technical.length, id).toBeGreaterThanOrEqual(6);
      expect(blade.faqs?.company, id).toEqual([]);
      expect(blade.detailLayout?.inlineRfq?.description, id).toBeTruthy();
      for (const related of blade.components?.flatMap(c => c.relatedBladeIds ?? []) ?? []) {
        expect(blades.some(b => b.id === related), `${id}/${related}`).toBe(true);
      }
    }
    expect(blades.find(b => b.id === "die-face-cutting-knives")?.drawings?.items).toHaveLength(11);
  });

  it("retains brand and engineering sections on every Shear product", () => {
    for (const blade of blades.filter(b => ["shear_blades", "paper_cutting"].includes(b.category))) {
      expect(blade.compatibleMachines?.length, blade.id).toBeGreaterThan(0);
      expect(blade.compatibleMachinesIntro, blade.id).toBeTruthy();
      expect(blade.components?.length, blade.id).toBeGreaterThan(0);
      expect(blade.detailLayout?.additionalHeroImages ?? [], blade.id).toEqual([]);
    }
  });

  it("keeps Log Saw pages complete without reintroducing excluded claims", () => {
    for (const blade of blades.filter(b => b.category === "log_saw_blades")) {
      expect(blade.detailLayout?.heroAlt, blade.id).toBeTruthy();
      expect(blade.detailLayout?.additionalHeroImages ?? [], blade.id).toEqual([]);
      expect(blade.compatibleMachines?.length, blade.id).toBeGreaterThan(0);
      expect(blade.compatibleMachinesIntro, blade.id).toBeTruthy();
      expect(blade.components, blade.id).toHaveLength(3);
      expect(blade.faqs?.technical.length, blade.id).toBeGreaterThanOrEqual(6);
      expect(blade.faqs?.company, blade.id).toEqual([]);
      for (const id of blade.components?.flatMap(c => c.relatedBladeIds ?? []) ?? []) {
        expect(blades.some(b => b.id === id), id).toBe(true);
      }
    }
    const nonwoven = blades.find(b => b.id === "nonwoven-log-saw-blades")!;
    expect(nonwoven.detailLayout?.sizeRange).toBe("Ø350–700 mm");
    expect(nonwoven.standardDimensions).toHaveLength(6);
    const copy = JSON.stringify([
      nonwoven.description, nonwoven.specs, nonwoven.components,
      nonwoven.faqs, nonwoven.detailLayout, nonwoven.quoteRequirements,
      nonwoven.rfqPlaceholder, nonwoven.badge, nonwoven.standardDimensions,
      nonwoven.dimensionLabels,
    ]);
    expect(copy).not.toMatch(/wet or dry|dry or wet|wet at the cut|femcare|adult incontinence|golden|gold.colou?r/i);
  });

  it("uses a measured size or Made to Drawing on each card", () => {
    for (const blade of products) {
      expect(getBladeSizeRange(blade) ?? "Made to Drawing", blade.id).toMatch(
        /\d\s*\+?\s*mm\b|^Made to Drawing$/
      );
    }
  });

  it("keeps dimensions on every catalog page except the approved drawing-only products", () => {
    const drawingOnly = new Set(["special-shaped-blades", "flying-shear-blades"]);
    for (const blade of blades) {
      const count = (blade.standardDimensions?.length ?? 0) +
        (blade.detailLayout?.dimensionTables ?? []).reduce((total, table) => total + table.rows.length, 0);
      if (drawingOnly.has(blade.id)) {
        expect(count, blade.id).toBe(0);
      } else {
        expect(count, blade.id).toBeGreaterThan(0);
      }
    }
  });

  it("matches cover and specification image metadata to the WebP assets", async () => {
    const publicFile = (src: string) =>
      fileURLToPath(new URL(`../../public${src}`, import.meta.url));

    for (const blade of products) {
      if (blade.imagePending) {
        expect(blade.image).toBe("/images/products/product-photo-pending.svg");
        continue;
      }
      const specification =
        blade.detailLayout?.specificationImage?.src ??
        blade.gallery?.at(-1) ??
        blade.image;
      const images = [
        [blade.image, blade.imageDimensions],
        [specification, blade.specificationImageDimensions],
        ...(blade.detailLayout?.additionalHeroImages ?? []).map(image =>
          [image.src, image.dimensions] as const
        ),
      ] as const;

      for (const [src, dimensions] of images) {
        if (!dimensions) throw Error(`Missing image dimensions for ${src}`);
        const metadata = await sharp(publicFile(src)).metadata();
        expect(metadata.format, src).toBe("webp");
        expect([metadata.width, metadata.height], src).toEqual([
          dimensions.width,
          dimensions.height,
        ]);
        const srcSet = getWebpImageSrcSet(src, dimensions);
        if (!srcSet) throw Error(`Missing responsive variants for ${src}`);
        expect(dimensions.smallerWidths.length, src).toBeGreaterThan(0);
        for (const candidate of srcSet.split(", ")) {
          const [file, descriptor] = candidate.split(" ");
          const variant = await sharp(publicFile(file)).metadata();
          expect(variant.format, file).toBe("webp");
          expect(`${variant.width}w`, file).toBe(descriptor);
          expect(variant.hasAlpha, file).toBe(metadata.hasAlpha);
        }
      }
    }
  });
});

describe("buyer-facing technical specifications", () => {
  it("summarizes the confirmed Tissue dimensions without inventing configurations", () => {
    const tissue = blades.find(b => b.id === "tissue-log-saw-blades")!;
    const summary = tissue.detailLayout!.technicalSpecs!.find(s => s.label === "Sizes")!;
    const displayed = summary.value.match(/\d+(?:\.\d+)?/g)!.map(Number);
    const listed = tissue.standardDimensions!.map(row => Number(row.od));
    expect(displayed.slice(0, 2)).toEqual([Math.min(...listed), Math.max(...listed)]);
    expect(displayed.slice(2)).toEqual([1200]);
    expect(summary.value).toMatch(/custom.*1200/i);
    expect(getBladeSizeRange(tissue)).toBe("Ø610–1000 mm");
    expect(tissue.detailLayout!.technicalSpecs!.some(s => /^(?:Bore diameter|Body thickness)$/.test(s.label))).toBe(false);
  });

  it("retains original numerical tolerances, treatment and balancing specifications", () => {
    const required: [string, RegExp, RegExp][] = [
      ["tissue-log-saw-blades", /lateral.*runout/i, /≤\s*0\.15\s*mm/],
      ["tissue-log-saw-blades", /edge.*runout/i, /≤\s*0\.10\s*mm/],
      ["tissue-log-saw-blades", /surface.*finish/i, /Ra\s*≤\s*0\.2/],
      ["paper-cutting-blades", /flatness/i, /≤\s*0\.05\s*mm/],
      ["guillotine-shear-blades", /parallelism|tolerance/i, /±\s*0\.05\s*mm/],
      ["three-knife-trimmer-blades", /surface.*finish/i, /Ra\s*≤\s*0\.1/],
      ["three-knife-trimmer-blades", /thickness.*match|set.*thickness|OEM.*tolerance/i, /±\s*0\.01\s*mm/],
      ["granulator-blades", /heat.*treatment/i, /[−-]196\s*°C/],
      ["strand-pelletizer-rotors", /balancing/i, /G2\.5/],
      ["cutter-compactor-blades", /cutting.*gap/i, /0\.2\s*[–-]\s*0\.5\s*mm/],
      ["cutter-compactor-blades", /heat.*treatment/i, /[−-]196\s*°C/],
      ["wood-chipper-blades", /heat.*treatment/i, /[−-]196\s*°C/],
    ];
    for (const [id, label, value] of required) {
      const blade = blades.find(product => product.id === id)!;
      const specs = blade.detailLayout?.technicalSpecs ?? blade.specs;
      expect(specs.find(spec => label.test(spec.label))?.value, `${id}/${label}`).toMatch(value);
    }
    for (const [id, maximum] of [
      ["wood-chipper-blades", 800],
      ["wood-chipper-anvils", 600],
      ["twin-shaft-blades-recycling", 800],
    ] as const) {
      const blade = blades.find(product => product.id === id)!;
      const specs = blade.detailLayout?.technicalSpecs ?? blade.specs;
      const sizes = specs.find(spec => spec.label === "Sizes")?.value;
      expect(sizes, id).toMatch(new RegExp(`custom.*${maximum}`, "i"));
    }
  });

  it("retains existing optional coating selections", () => {
    for (const id of [
      "rotary-slitter-knives", "lithium-battery-slitting-knives",
      "nonwoven-slitter-knives", "bottom-grooved-anvil-knives",
      "tungsten-carbide-slitter-knives", "paper-straw-slitting-blades",
      "tissue-log-saw-blades", "nonwoven-log-saw-blades",
      "twin-shaft-blades-battery", "continuous-melt-filter-scraper-blades",
    ]) {
      const blade = blades.find(b => b.id === id)!;
      const specs = blade.detailLayout?.technicalSpecs ?? blade.specs;
      expect(specs.find(s => s.label === "Optional Coatings")?.value, id).toBeTruthy();
    }
  });

  it("does not publish inquiry instructions or empty dimension labels as specifications", () => {
    for (const product of blades) {
      const blade = isUpgradedShredderBlade(product) && !product.detailLayout
        ? getShredderDetailBlade(product)
        : product;
      const specs = blade.detailLayout?.technicalSpecs ?? (blade.detailLayout
        ? [{ label: "Sizes", value: blade.detailLayout.sizeRange }, ...blade.specs]
        : blade.specs);
      expect(specs.filter(s => s.label === "Sizes"), blade.id).toHaveLength(1);
      for (const { label, value } of specs) {
        const context = `${blade.id}/${label}`;
        expect(value, context).not.toMatch(/^(?:Confirm|Identify|Include|Provide|Send|Match|Check|Measure)\b/i);
        expect(label, context).not.toMatch(/^(?:Quote inputs|Order data|Part identification|Machine identification)$/i);
        if (/^(?:(?:Outside|Outer|Bore) diameter|Body thickness|(?:Blade )?dimensions)$/i.test(label)) {
          expect(value, context).toMatch(/\d|^Made to drawing\b/i);
        }
      }
    }
  });
});
