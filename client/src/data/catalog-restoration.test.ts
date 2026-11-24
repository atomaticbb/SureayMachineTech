import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { blades } from "./blades";

// Historical catalog rows restored on 2026-11-15, alongside the previously
// approved Slitter tables. Fixtures intentionally retain slash alternatives.
const restoredTables = [
  {
    id: "rotary-slitter-knives",
    tables: [
      {
        id: "catalog-configurations",
        columns: [
          "Item No.",
          "Dimensions (OD × ID × W)",
          "Knife Type / Platform Reference",
        ],
        rows: [
          [
            "SR001801",
            "75 × 25.4 × 1.0 / 1.2 mm",
            "Top Blade — Tidland / Atlas",
          ],
          [
            "SR001802",
            "70 × 25.4 × 8 / 10 mm",
            "Bottom Anvil — Tidland / Atlas",
          ],
          [
            "SR001803",
            "100 × 32 × 1.2 / 1.5 mm",
            "Top Blade — Kampf / Dusenbery",
          ],
          [
            "SR001804",
            "80 × 60 × 16 / 20 mm",
            "Bottom Anvil — Kampf / Dusenbery",
          ],
          [
            "SR001805",
            "118 × 80 × 1.2 / 2.0 mm",
            "Top Blade — Goebel / BHS / Agnati",
          ],
          [
            "SR001806",
            "100 × 70 × 16 / 20 mm",
            "Bottom Anvil — Goebel / BHS / Agnati",
          ],
        ],
      },
    ],
  },
  {
    id: "rotary-slitter-knives-paper",
    tables: [
      {
        id: "catalog-configurations",
        columns: [
          "Item No.",
          "Dimensions (OD × ID × W)",
          "Knife Type / Platform Reference",
        ],
        rows: [
          ["SR001807", "75 × 45 × 1.0 / 1.2 mm", "Top Blade (Shear)"],
          ["SR001808", "70 × 45 × 10 / 8 mm", "Bottom Anvil"],
          ["SR001809", "100 × 32 × 1.2 mm", "Top Blade (Shear)"],
          ["SR001810", "80 × 60 × 20 / 16 mm", "Bottom Anvil"],
          ["SR001811", "150 × 80 × 1.5 mm", "Top Blade (Tissue)"],
          ["SR001812", "108 × 80 × 20 / 18 mm", "Bottom Anvil"],
        ],
      },
    ],
  },
  {
    id: "metal-foil-strip-slitter-knives",
    tables: [
      {
        id: "catalog-configurations",
        columns: [
          "Item No.",
          "Dimensions (OD × ID × W)",
          "Knife Type / Platform Reference",
        ],
        rows: [
          ["SR001813", "100 × 40 × 1.0 / 1.5 mm", "Thin Foil Slitter"],
          ["SR001814", "150 × 80 × 2.0 / 3.0 mm", "Precision Strip Slitter"],
          ["SR001815", "200 × 120 × 3.0 / 4.0 mm", "General Strip Slitter"],
          ["SR001816", "250 × 150 × 4.0 / 5.0 mm", "Silicon / Stainless Steel"],
          ["SR001817", "300 × 200 × 5.0 / 10.0 mm", "Heavy Gauge Strip"],
        ],
      },
    ],
  },
  {
    id: "metal-coil-slitting-knives",
    tables: [
      {
        id: "additional-steel-knives",
        columns: ["Item No.", "Dimensions (OD × ID × W)", "Application"],
        rows: [
          ["SR001818", "400 × 260 × 20 mm", "Heavy gauge hot-rolled steel"],
          ["SR001819", "500 × 320 × 30 mm", "Heavy plate"],
        ],
      },
    ],
  },
  {
    id: "lithium-battery-slitting-knives",
    tables: [
      {
        id: "individual-electrode-knives",
        columns: ["Item No.", "Dimensions (OD × ID × W)", "Configuration"],
        rows: [
          ["SR001820", "76 × 38 × 0.5 mm", "Individual knife"],
          ["SR001821", "76 × 38 × 1.0 mm", "Individual knife"],
          ["SR001822", "100 × 50 × 0.5 mm", "Individual knife"],
          ["SR001823", "100 × 50 × 1.0 mm", "Individual knife"],
          ["SR001824", "100 × 50 × 1.5 mm", "Individual knife"],
          ["SR001825", "120 × 60 × 0.5 mm", "Individual knife"],
          ["SR001826", "120 × 60 × 1.0 mm", "Individual knife"],
          ["SR001827", "150 × 76 × 1.0 mm", "Individual knife"],
        ],
      },
    ],
  },
  {
    id: "corrugated-slitter-scorer-blades",
    tables: [
      {
        id: "catalog-configurations",
        columns: [
          "Item No.",
          "Dimensions (OD × ID × W)",
          "Knife Type / Platform Reference",
        ],
        rows: [
          ["SR001828", "240 × 115 × 1.0 / 1.2 mm", "BHS"],
          ["SR001829", "260 × 140 × 1.2 mm", "BHS"],
          ["SR001830", "230 × 135 × 1.15 / 1.2 mm", "FOSBER"],
          ["SR001831", "260 × 112 × 1.2 mm", "FOSBER"],
          ["SR001832", "230 × 110 × 1.2 / 1.5 mm", "Marquip"],
          ["SR001833", "200 × 122 × 1.2 mm", "TCY / Justu"],
        ],
      },
    ],
  },
  {
    id: "nonwoven-slitter-knives",
    tables: [
      {
        id: "additional-nonwoven-knives",
        columns: ["Item No.", "Dimensions (OD × ID × W)", "Knife Type"],
        rows: [
          ["SR001834", "75 × 32 × 1.0 mm", "Nonwoven slitter knife"],
          ["SR001835", "100 × 40 × 1.0 mm", "Nonwoven slitter knife"],
          ["SR001836", "100 × 50 × 1.5 mm", "Nonwoven slitter knife"],
          ["SR001837", "120 × 50 × 1.0 mm", "Nonwoven slitter knife"],
          ["SR001838", "120 × 60 × 1.5 mm", "Nonwoven slitter knife"],
          ["SR001839", "150 × 75 × 2.0 mm", "Nonwoven slitter knife"],
        ],
      },
    ],
  },
  {
    id: "bottom-grooved-anvil-knives",
    tables: [
      {
        id: "groove-profile-configurations",
        columns: [
          "Item No.",
          "Dimensions (OD × ID × W)",
          "Platform Reference",
          "Groove Profile",
        ],
        rows: [
          [
            "SR001840",
            "70 × 25.4 × 8 / 10 mm",
            "Tidland — Single Groove",
            "W: 1.2 × D: 2.0 / 60°",
          ],
          [
            "SR001841",
            "100 × 60 × 20 / 25 mm",
            "Atlas — 3-Slot Anvil",
            "W: 1.5 × D: 2.5 / 60°",
          ],
          [
            "SR001842",
            "80 × 30 × 10 mm",
            "Mario Cotta — Single Groove",
            "W: 1.3 × D: 2.2 / 45°",
          ],
          [
            "SR001843",
            "130 × 80 × 12 mm",
            "Dienes — Single Groove",
            "W: 1.5 × D: 3.0 / 60°",
          ],
          [
            "SR001844",
            "Per drawing",
            "Custom Anvil / Hardfaced",
            "OEM Spec; Exact CNC Machined Groove",
          ],
        ],
      },
    ],
  },
  {
    id: "slitter-rewinder-bottom-knives",
    tables: [
      {
        id: "additional-rewinder-knives",
        columns: ["Item No.", "Dimensions (OD × ID × W)", "Knife Type"],
        rows: [
          ["SR001845", "250 × 188 × 25 mm", "Rewinder bottom knife"],
          ["SR001846", "254 × 195 × 50 mm", "Rewinder bottom knife"],
          ["SR001847", "250 × 140 × 20 mm", "Rewinder bottom knife"],
        ],
      },
    ],
  },
  {
    id: "paper-straw-slitting-blades",
    tables: [
      {
        id: "additional-straw-knives",
        columns: ["Item No.", "Dimensions (OD × ID × W)", "Application"],
        rows: [
          ["SR001848", "88 × 16 × 0.26 mm", "Paper straw cut-off"],
          ["SR001849", "89 × 15 × 0.30 mm", "Paper straw cut-off"],
          ["SR001850", "90 × 15 × 0.30 mm", "Paper straw cut-off"],
          ["SR001851", "100 × 15 × 0.15 mm", "Paper straw cut-off"],
          ["SR001852", "100 × 45 × 0.20 mm", "Paper straw cut-off"],
        ],
      },
    ],
  },
  {
    id: "groove-bottom-knives",
    tables: [
      {
        id: "multi-groove-configurations",
        columns: [
          "Item No.",
          "Outside Diameter (mm / in)",
          "Configuration",
          "Shaft / Mounting",
          "Pitch / Working Edge",
        ],
        rows: [
          [
            "SR001853",
            "Up to Φ406 (16 in)",
            "Multi-groove ring — plain bore",
            "Expandable air shaft",
            "From 5 mm pitch",
          ],
          [
            "SR001854",
            "Up to Φ406 (16 in)",
            "Multi-groove ring — set screw",
            "Solid bottom shaft",
            "From 5 mm pitch",
          ],
          [
            "SR001855",
            "Up to Φ406 (16 in)",
            "Two-piece split ring",
            "Air or solid shaft",
            "From 5 mm pitch",
          ],
          [
            "SR001856",
            "Up to Φ406 (16 in)",
            "Double-edged multi-groove ring",
            "Air or solid shaft",
            "Cutting edges both sides",
          ],
          [
            "SR001857",
            "To drawing",
            "Single-groove cutter ring",
            "Air or solid shaft",
            "One fixed position",
          ],
          [
            "SR001858",
            "To drawing",
            "Smooth spacer ring",
            "Air or solid shaft",
            "No groove — sets spacing",
          ],
        ],
      },
    ],
  },
];

// Fingerprints cover only the pre-existing columns and rows, not new tables,
// so a restoration cannot silently replace an already approved configuration.
const approvedTableFingerprints = [
  {
    product: "rotary-slitter-knives",
    table: "slitter-knives",
    digest: "7bce93d6cc26b5eb42c22600ee5145460923c1fb1d9916e0857916e258b58436",
  },
  {
    product: "rotary-slitter-knives-paper",
    table: "top",
    digest: "940a7aca44d45454c444bc96010eb2499022674dea3e6fd80061692767fe8db9",
  },
  {
    product: "rotary-slitter-knives-paper",
    table: "bottom",
    digest: "ac72df76ed3872e4274d5fabe223d7741b811dc2a3ac50a6eed5aa182e8bfae7",
  },
  {
    product: "metal-foil-strip-slitter-knives",
    table: "slitter-knives",
    digest: "bf5e17f4f41d1ab66a8c2680de63a5bed190617614fceb39f655833ec538ac43",
  },
  {
    product: "metal-coil-slitting-knives",
    table: "steel",
    digest: "0f1eb195a6d3dcfae467a46e664c62fb7a391f4d06ab37157aa12fd2174dc98f",
  },
  {
    product: "metal-coil-slitting-knives",
    table: "carbide",
    digest: "44e3229ce0c6e40fa5008a86b2974d5276c653f586588be22c6e347a2b9c9dfb",
  },
  {
    product: "metal-coil-slitting-knives",
    table: "tooling",
    digest: "0f197dcc445db9a261e817d6ca4202e862685a5daf54d2b06fbc7b47240d1c82",
  },
  {
    product: "lithium-battery-slitting-knives",
    table: "electrode",
    digest: "cb5f86d3ca2536fef3cf697a7623af0871b7f0641398922f9cc8e68188012bfc",
  },
  {
    product: "corrugated-slitter-scorer-blades",
    table: "thin",
    digest: "f35ab3518a087b3459da9880564369faf6a69330dd10d56482e6ff787ae3b77c",
  },
  {
    product: "nonwoven-slitter-knives",
    table: "top",
    digest: "4872eabe7034d10a3b456011af8b43bbc0f298231d6524634234defc4893d4c7",
  },
  {
    product: "nonwoven-slitter-knives",
    table: "bottom",
    digest: "984fa85dbbd7621bc01543f7e1a17689fe6c568d46e7d79f99e3379c47bf6632",
  },
  {
    product: "bottom-grooved-anvil-knives",
    table: "ring",
    digest: "9fe5ecece2036b5c169abbc0f8590c087a37002d99dc39ebaf34beae9d267289",
  },
  {
    product: "tungsten-carbide-slitter-knives",
    table: "thin",
    digest: "f35ab3518a087b3459da9880564369faf6a69330dd10d56482e6ff787ae3b77c",
  },
  {
    product: "tungsten-carbide-slitter-knives",
    table: "carbide",
    digest: "44e3229ce0c6e40fa5008a86b2974d5276c653f586588be22c6e347a2b9c9dfb",
  },
  {
    product: "slitter-rewinder-bottom-knives",
    table: "flange",
    digest: "ac72df76ed3872e4274d5fabe223d7741b811dc2a3ac50a6eed5aa182e8bfae7",
  },
  {
    product: "slitter-rewinder-bottom-knives",
    table: "tipped",
    digest: "8bcd80fe8e25cefb3427ac7352200fcb89343d95c8a449fbb334fb5fc02c2d81",
  },
  {
    product: "slitter-rewinder-bottom-knives",
    table: "keyed",
    digest: "c33c3f3d3af1bb2d1d3488b54db1aa8f182e14d59bda53ae39e2094e75e9389d",
  },
  {
    product: "corrugated-slotter-knives",
    table: "male",
    digest: "c67109d8d2ba21bfa1b09016706b0636a738003a02323fd7e2c920f9773636b6",
  },
  {
    product: "corrugated-slotter-knives",
    table: "female",
    digest: "b3a972808933443b40975ce81a427894fb086c6dcfc9127e7f5bda04777f11f3",
  },
  {
    product: "paper-straw-slitting-blades",
    table: "straw",
    digest: "90e12bf8c63ee1c99e0b1a5782665a9e6b150d7dbc1d5649c089048b764ae941",
  },
  {
    product: "groove-bottom-knives",
    table: "multi-groove",
    digest: "b3d6fc23784dce7247ccd12c732bc653576fad89d901b1d5d45955630b085b17",
  },
];

describe("Slitter original catalog restoration", () => {
  it("retains all 58 restored rows with their dimensions, mappings and stable identifiers", () => {
    const identifiers: string[] = [];
    const catalogIdentifiers = blades.flatMap(blade => [
      ...(blade.standardDimensions ?? []).flatMap(row =>
        row.itemNo ? [row.itemNo] : []
      ),
      ...(blade.detailLayout?.dimensionTables ?? []).flatMap(table =>
        table.rows.map(row => row[0])
      ),
    ]);
    for (const fixture of restoredTables) {
      const blade = blades.find(product => product.id === fixture.id)!;
      for (const expected of fixture.tables) {
        const actual = blade.detailLayout?.dimensionTables.find(
          table => table.id === expected.id
        );
        const context = fixture.id + "/" + expected.id;
        expect(actual, context).toBeDefined();
        expect(actual?.columns, context).toEqual(expected.columns);
        expect(actual?.rows, context).toEqual(expected.rows);
        for (const [itemNo] of expected.rows) {
          expect(itemNo, context).toMatch(/^SR0018\d{2}$/);
          expect(
            catalogIdentifiers.filter(value => value === itemNo),
            itemNo
          ).toHaveLength(1);
          identifiers.push(itemNo);
        }
      }
    }
    expect(identifiers).toHaveLength(58);
    expect(new Set(identifiers).size).toBe(58);
    expect(identifiers[0]).toBe("SR001801");
    expect(identifiers.at(-1)).toBe("SR001858");
  });

  it("keeps every previously approved Slitter table alongside the restored tables", () => {
    for (const approved of approvedTableFingerprints) {
      const blade = blades.find(product => product.id === approved.product)!;
      const table = blade.detailLayout?.dimensionTables.find(
        value => value.id === approved.table
      );
      const context = approved.product + "/" + approved.table;
      expect(table, context).toBeDefined();
      const digest = createHash("sha256")
        .update(JSON.stringify([table!.columns, table!.rows]))
        .digest("hex");
      expect(digest, context).toBe(approved.digest);
    }
  });

  it("publishes restored parameters in the active technical specifications", () => {
    const required: [string, RegExp, RegExp][] = [
      [
        "rotary-slitter-knives",
        /^material$/i,
        /52100.*ASP23.*solid tungsten carbide/i,
      ],
      ["metal-foil-strip-slitter-knives", /^material$/i, /\bD3\b/],
      ["metal-coil-slitting-knives", /^material$/i, /SKD11.*Cr12MoV.*6CrW2Si/i],
      ["lithium-battery-slitting-knives", /^material$/i, /cermet on request/i],
      [
        "lithium-battery-slitting-knives",
        /current collector/i,
        /Aluminum 12–20 µm; copper 6–12 µm/,
      ],
      ["corrugated-slitter-scorer-blades", /^material$/i, /K05.*K10.*K20/],
      [
        "corrugated-slitter-scorer-blades",
        /production method/i,
        /HIP-sintered solid tungsten carbide/,
      ],
      ["corrugated-slitter-scorer-blades", /edge apex/i, /0\.3 mm/],
      ["nonwoven-slitter-knives", /rake angle/i, /15°–20° positive rake/],
      ["nonwoven-slitter-knives", /surface finish/i, /Ra ≤0\.4 µm/],
      [
        "nonwoven-slitter-knives",
        /^hardness$/i,
        /M2: 62–64 HRC; D2: 60–62 HRC; carbide: 89–92 HRA/,
      ],
      ["nonwoven-slitter-knives", /^geometry$/i, /Bevel 25°–45°/],
      ["bottom-grooved-anvil-knives", /shear clearance/i, /0\.02–0\.15 mm/],
      ["bottom-grooved-anvil-knives", /^material$/i, /ASP23.*solid carbide/],
      [
        "tungsten-carbide-slitter-knives",
        /transverse rupture strength/i,
        /2,500–3,000 N\/mm²/,
      ],
      [
        "tungsten-carbide-slitter-knives",
        /^sizes$/i,
        /Thin profiles: OD 20–300 mm × 0\.3–5\.0 mm/,
      ],
      [
        "slitter-rewinder-bottom-knives",
        /^material$/i,
        /solid tungsten carbide/,
      ],
      ["groove-bottom-knives", /^sizes$/i, /406 mm/],
    ];
    for (const [id, label, value] of required) {
      const blade = blades.find(product => product.id === id)!;
      const active = blade.detailLayout?.technicalSpecs ?? blade.specs;
      expect(
        active.find(spec => label.test(spec.label))?.value,
        id + "/" + label
      ).toMatch(value);
    }
    for (const blade of blades.filter(
      product =>
        product.category === "slitter_knives" &&
        product.id !== "corrugated-slotter-knives"
    )) {
      expect(blade.detailLayout?.technicalSpecs, blade.id).toEqual(blade.specs);
      expect(
        blade.detailLayout?.technicalSpecs?.filter(
          spec => spec.label === "Sizes"
        ),
        blade.id
      ).toHaveLength(1);
    }
    expect(
      blades.find(blade => blade.id === "rotary-slitter-knives-paper")
        ?.detailLayout?.sizeRange
    ).toContain("203 mm");
    expect(
      blades.find(blade => blade.id === "paper-straw-slitting-blades")
        ?.detailLayout?.sizeRange
    ).toContain("88–100 mm");
  });

  it("does not restore greyboard V-grooving dimensions into the corrugated slotter page", () => {
    const slotter = blades.find(
      blade => blade.id === "corrugated-slotter-knives"
    )!;
    const dimensions = slotter.detailLayout!.dimensionTables.flatMap(table =>
      table.rows.map(row => row[1])
    );
    expect(dimensions).toHaveLength(12);
    for (const dimension of dimensions)
      expect(dimension).not.toMatch(/^(50|60)\s*×\s*(12|15|16)\s*×\s*2/);
    expect(
      JSON.stringify(slotter.detailLayout?.technicalSpecs ?? slotter.specs)
    ).not.toMatch(/GS05U|GS20U|greyboard|V-grooving/i);
    expect(
      slotter.specs.find(spec => /application/i.test(spec.label))?.value
    ).toMatch(/corrugated flap slotting/i);
  });
});
