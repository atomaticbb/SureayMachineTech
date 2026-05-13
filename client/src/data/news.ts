/**
 * news.ts — Corporate Dispatches Data Layer
 * Single source of truth for all news/dispatch articles.
 */

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface NewsContent {
  type: "paragraph" | "h2" | "h3" | "callout" | "image" | "table";
  value: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface DispatchArticle {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  isFeatured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string;
  relatedProductIds?: string[];
  content: NewsContent[];
}

export type DispatchAuthor = "Eric" | "lynn";

const DISPATCH_MONTHS: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

function parseDispatchDate(date: string): number {
  const [day, month, year] = date.split(".");
  const monthIndex = DISPATCH_MONTHS[month];

  if (!day || monthIndex === undefined || !year) {
    return 0;
  }

  return new Date(Number(year), monthIndex, Number(day)).getTime();
}

function sortDispatchesByDate(
  dispatches: DispatchArticle[]
): DispatchArticle[] {
  return [...dispatches].sort(
    (left, right) =>
      parseDispatchDate(right.date) - parseDispatchDate(left.date)
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const ALL_DISPATCHES: DispatchArticle[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id: "wood-chipper-knife-sharpening-guide",
    tag: "TECHNICAL GUIDE",
    date: "13.MAY.2026",
    title:
      "Wood Chipper Knife Sharpening Guide: Bevel Angles, Tolerances & Regrind Limits",
    excerpt:
      "Operating with dull wood chipper knives degrades chip uniformity, spikes fuel consumption, and accelerates bearing wear. This technical guide covers OEM bevel angles, grinding thermal limits, and through-hardened vs. case-hardened lifespan — so every regrind cycle delivers full edge performance.",
    image: "/images/news/wood-chipper-blades-working.webp",
    readTime: "8 MIN",
    isFeatured: true,
    seoTitle:
      "Wood Chipper Knife Sharpening Guide: Bevel Angles, Tolerances & Regrind Limits | Sureay",
    metaDescription:
      "Technical guide on wood chipper knife maintenance. Learn optimal bevel angles, grinding tolerances, and metallurgical limits for D2, 9CrSi, and HSS blades.",
    keywords:
      "wood chipper knife sharpening, chipper blade bevel angle, chipper knife regrind, D2 chipper blade maintenance, 9CrSi chipper knife, HSS chipper blade, chipper knife grinding guide",
    relatedProductIds: [
      "wood-chipper-blades",
      "wood-chipper-blades-industrial",
      "wood-chipper-blades-standard",
      "wood-chipper-anvils",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Operating with dull wood chipper knives degrades chip uniformity, spikes fuel consumption by 15–25%, accelerates bearing wear, and introduces destructive friction into the drum assembly. This guide details the precise sharpening protocols — including OEM bevel angles, thermal limits during grinding, and strict balance tolerances — required to maintain edge geometry without compromising the blade's metallurgical integrity.",
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-working.webp",
      },
      {
        type: "h2",
        value: "1. Diagnostics: When to Pull Blades for Sharpening",
      },
      {
        type: "paragraph",
        value:
          "Premature sharpening wastes usable steel; delayed sharpening damages machinery. Monitor these four operational metrics to determine exact sharpening intervals:",
      },
      {
        type: "callout",
        value:
          "DEGRADED CHIP GEOMETRY: Cleanly sheared chips replaced by fibrous, torn splinters — indicates edge rounding. LOSS OF SELF-FEEDING: Operators must force material into the drum — blade geometry has failed. LOAD SPIKES (15–25%): Monitor hydraulic RPM drops or electric amp draw — dull blades crush rather than shear. VISUAL WEAR BAND: A bright reflective band exceeding 0.5 mm on the cutting edge dictates immediate sharpening.",
      },
      {
        type: "h2",
        value: "2. Required Tooling & Tolerances",
      },
      {
        type: "paragraph",
        value:
          "Professional regrinding requires strict thermal and geometric control. Use a wet surface grinder or bench grinder with a fixed tool rest fitted with Aluminum Oxide (46–60 grit) wheels — never use green Silicon Carbide wheels on tool steel. A continuous water bath is mandatory; dry grinding requires manual quenching every 3–5 seconds to prevent drawing the temper. Essential measurement tools: digital protractor for bevel angle verification, micrometer for minimum thickness compliance, and a precision digital scale (±1 g resolution) for drum balancing.",
      },
      {
        type: "h2",
        value: "3. Bevel Angle Specifications",
      },
      {
        type: "paragraph",
        value:
          "The bevel angle dictates the blade's structural durability and cutting efficiency. Deviating from OEM specifications causes premature edge fracture (if too acute) or loss of feed (if too obtuse).",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Feedstock / Application", "Target Bevel Angle", "Technical Rationale"],
        tableRows: [
          ["Green Softwood (Pine, Poplar)", "25° – 28°", "Low-density shearing; acute edge for clean fibre slicing."],
          ["Mixed Species (Birch, Ash)", "28° – 32°", "Optimal balance of impact resistance and shearing efficiency."],
          ["Dry Hardwood (Oak, Hickory)", "32° – 37°", "Dense, high-impact material; greater cross-section prevents edge rollover."],
          ["Contaminated / Urban Waste", "35° – 42°", "Maximum toughness against tramp metal; survivability over sharpness."],
        ],
      },
      {
        type: "paragraph",
        value:
          "Standard OEM baselines: Bandit (30°–35°), Vermeer (30°), Morbark (33°–37°). Always verify against your machine's manual before grinding.",
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-install.webp",
      },
      {
        type: "h2",
        value: "4. Standard Sharpening Protocol",
      },
      {
        type: "h3",
        value: "Step 1 — Pre-Grind Inspection",
      },
      {
        type: "paragraph",
        value:
          "Lay the removed blade on a precision flat surface. Reject and replace any blade showing thermal warping or micro-cracks near the bolt holes. Grinding a cracked blade risks catastrophic centrifugal fragmentation inside the drum.",
      },
      {
        type: "h3",
        value: "Step 2 — Bevel Marking & Jig Setup",
      },
      {
        type: "paragraph",
        value:
          "Coat the existing bevel face with a black marker. Make a light test pass against the wheel. If the marker is removed evenly across the full bevel width, the jig angle is calibrated correctly. If only the heel or tip is exposed, adjust the tool rest before proceeding.",
      },
      {
        type: "h3",
        value: "Step 3 — Controlled Material Removal",
      },
      {
        type: "paragraph",
        value:
          "Remove 0.02–0.05 mm per pass. This is the critical thermal control step: chipper knives are heat-treated to HRC 55–62. Exceeding 200°C — indicated by straw-yellow or blue oxidation on the steel surface — irreversibly draws the temper, leaving localised soft spots. If the steel blues at any point, the heat treatment is ruined and the blade must be replaced.",
      },
      {
        type: "h3",
        value: "Step 4 — Wire Edge (Burr) Removal",
      },
      {
        type: "paragraph",
        value:
          "Grinding pushes a micro-burr onto the rake face. Lay the blade flat (rake face down) and use a fine stone with 3–5 flat strokes to remove this burr completely. Failing to deburr results in immediate edge collapse on first contact with timber.",
      },
      {
        type: "h3",
        value: "Step 5 — Drum Balancing (±2 Gram Tolerance)",
      },
      {
        type: "paragraph",
        value:
          "At 2,000+ RPM, uneven blade weights destroy drum bearings within hours. Weigh all sharpened blades on a digital scale. If variances exist, pair blades of identical weight on opposite sides of the drum to ensure dynamic balance across all positions.",
      },
      {
        type: "h2",
        value: "5. Regrind Limits & Metallurgical Lifespan",
      },
      {
        type: "paragraph",
        value:
          "Stop sharpening and replace the blade when: (1) the blade drops below 60–70% of its original thickness, exceeding the maximum adjustment range of the anvil; (2) removing enough steel to clear deep chips (>2 mm) drops the blade below safe operating dimensions; or (3) previous dry-grinding has blued the steel, permanently compromising the HRC rating.",
      },
      {
        type: "callout",
        value:
          "CRITICAL: Budget aftermarket blades are often only case-hardened. The first regrind strips the hardened exterior, exposing a soft core that dulls rapidly. Premium industrial knives must be through-hardened — uniform HRC from surface to core — so every regrind cycle delivers identical edge performance.",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Material Grade", "Expected Regrind Cycles", "Performance Notes"],
        tableRows: [
          ["T10 High-Carbon", "3 – 5 total", "Base level. Rapid wear on hardwoods; frequent regrinding required."],
          ["9CrSi / Cr12MoV", "6 – 10 total", "Excellent mid-tier alloy. Higher chrome content resists abrasive wear."],
          ["D2 (SKD11)", "8 – 12 total", "Premium tool steel. Exceptional edge retention and impact resistance."],
          ["M2 HSS", "6 – 10 total", "Maximum hardness, but highly sensitive to thermal shock during grinding."],
        ],
      },
      {
        type: "image",
        value: "/images/news/wood-chipper-blades-18.webp",
      },
      {
        type: "h2",
        value: "Upgrade Your Chipper Uptime with Sureay",
      },
      {
        type: "paragraph",
        value:
          "Sureay manufactures precision wood chipper knives in through-hardened 9CrSi, Cr12MoV, D2, and M2 HSS — maintaining identical HRC ratings from surface to core, so every regrind cycle delivers OEM-level edge performance. Exact fitment for single and reversible double-edge configurations across Bandit, Vermeer, Morbark, and Doppstadt platforms.",
      },
      {
        type: "callout",
        value:
          "[Request a technical quote for OEM replacement knives →](/contact)",
      },
    ],
  },
  {
    id: "blade-material-selection-guide-by-industry",
    tag: "INDUSTRY NEWS",
    date: "07.MAY.2026",
    title:
      "One-size-fits-all? A quick reference chart of blade materials for different industries",
    excerpt:
      "Which blade material is best for your industry? No single material fits every application. This quick reference chart helps procurement teams and engineers pinpoint the right blade material — carbide, HSS, tool steel, or stainless — for their specific processing environment.",
    image: "/images/common/material-selection.webp",
    readTime: "5 MIN",
    seoTitle:
      "Blade Material Selection: Carbide vs HSS vs Tool Steel",
    metaDescription:
      "Quick reference chart: which industrial blade material suits your industry? Compare carbide, high-speed steel, tool steel, and stainless steel across paper, plastic, food, metal, and construction sectors.",
    keywords:
      "blade material selection, carbide blade, HSS blade, tool steel, industrial cutting blade, blade material guide",
    relatedProductIds: [
      "rotary-slitter-knives",
      "granulator-blades",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
      "paper-cutting-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          '"Which blade material is best suited for my industry?" This is the question we get asked most often. The answer is straightforward: no single material is suitable for all situations. The quick reference chart below will help you pinpoint the right choice for your specific application.',
      },
      {
        type: "image",
        value: "/images/common/material-selection.webp",
      },
      {
        type: "h2",
        value: "Industry vs. Recommended Blade Material — Quick Reference",
      },
      {
        type: "table",
        value: "",
        tableHeaders: ["Industry / Application", "Recommended Material", "Why?"],
        tableRows: [
          [
            "Household paper processing (tissue log saw blade, paper cutting blade)",
            "Alloy (carbide)",
            "Extremely high wear resistance, fewer tool changes required for continuous production, and lower overall cost.",
          ],
          [
            "Printing and packaging paper cutting (paper cutting blade, three-knife trimmer blade)",
            "High-speed steel (HSS) or powder metallurgy (PM)",
            "Good toughness — withstands frequent starts, stops, and minor impacts.",
          ],
          [
            "Plastic recycling and shredding (shredder blade)",
            "Tool steel — Cr12MoV / D2",
            "High impact resistance, prevents cracking, and can be re-ground multiple times.",
          ],
          [
            "Plastic pelletizing (pelletizer cutting blade)",
            "Alloy (carbide) or high-speed steel (HSS)",
            "Carbide delivers long service life for high-filler materials; HSS is economical and practical.",
          ],
          [
            "Melt filter scraper blade",
            "Alloy (carbide)",
            "Prolonged contact with the mesh plate demands high wear resistance while maintaining cutting edge integrity.",
          ],
          [
            "Food processing (food blade)",
            "Stainless steel or alloy",
            "Must be rust-proof, corrosion-resistant, and meet food-grade requirements.",
          ],
          [
            "Metal slitting shear (rotary slitting blade)",
            "Carbide or powder metallurgy (PM)",
            "High hardness, high wear resistance, smooth cut surface without burrs.",
          ],
          [
            "Press brake mold / shearing machine blade",
            "Tool steel — Cr12MoV / 42CrMo",
            "High strength and deformation resistance, suitable for heavy-duty stamping.",
          ],
          [
            "Construction machinery accessories (wear-resistant parts)",
            "Low-alloy high-strength steel or hardfacing weld",
            "Impact resistant, wear resistant, and adaptable to harsh working conditions.",
          ],
        ],
      },
      {
        type: "h2",
        value: "Quick decision guide",
      },
      {
        type: "callout",
        value:
          "FOR LONG LIFESPAN & FEWER TOOL CHANGES → Choose carbide. FOR TOUGHNESS & COST-EFFECTIVENESS → Choose high-speed steel (HSS). FOR RUST PREVENTION & FOOD CONTACT → Choose stainless steel. FOR IMPACT RESISTANCE & HEAVY-DUTY OPERATION → Choose tool steel.",
      },
      {
        type: "h2",
        value: "Still unsure?",
      },
      {
        type: "paragraph",
        value:
          "Tell us your equipment model, processing materials, and daily output, and Sureay engineers will customize a material selection plan for you — free of charge. [Contact us for a free consultation](/contact).",
      },
    ],
  },
  {
    id: "d2-vs-skd11-vs-tungsten-carbide",
    tag: "INDUSTRY NEWS",
    date: "16.MAR.2026",
    title:
      "D2 vs SKD-11 vs tungsten carbide: a complete guide to choosing industrial blade materials",
    excerpt:
      "Compare D2, SKD-11, and tungsten carbide industrial blade materials. Learn about hardness, wear resistance, toughness, cost, and best applications for industrial cutting knives.",
    image: "/images/news/choosing-industrial-blades-materials.webp",
    readTime: "8 MIN",
    isFeatured: true,
    relatedProductIds: [
      "granulator-blades",
      "rotary-slitter-knives",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
    ],
    content: [
      { type: "h2", value: "Introduction" },
      {
        type: "paragraph",
        value:
          "Choosing the correct material for industrial blades is critical for production efficiency, blade lifespan, and maintenance costs. Three of the most commonly used materials in industrial cutting knives are D2 tool steel, SKD-11 tool steel, and tungsten carbide. Each material has unique advantages in terms of hardness, wear resistance, toughness, and machining cost.",
      },
      {
        type: "paragraph",
        value:
          "This guide helps engineers and procurement teams select the most suitable material for [slitter knives](/products/rotary-slitter-knives), [shredder blades](/products/twin-shaft-blades-recycling), [granulator knives](/products/granulator-blades), and recycling cutting tools.",
      },
      {
        type: "image",
        value:
          "/images/news/a-complete-guide-to-choosing-industrial-blad-materials.webp",
      },

      { type: "h2", value: "D2 Tool Steel" },
      {
        type: "paragraph",
        value:
          "D2 is a high-carbon, high-chromium cold-work tool steel widely used in industrial blades. It offers a hardness range of 55–2 HRC with excellent wear resistance, good dimensional stability, and easy regrindability — making it cost-effective for most applications.",
      },
      {
        type: "callout",
        value:
          "D2 TYPICAL APPLICATIONS: [Slitter knives](/products/rotary-slitter-knives), [paper cutting blades](/products/paper-cutting-blades), plastic cutting knives, [industrial shearing knives](/products/metal-shear-knives).",
      },

      { type: "h2", value: "SKD-11 Tool Steel" },
      {
        type: "paragraph",
        value:
          "SKD-11 is the Japanese JIS standard equivalent to D2. Properties are very similar but SKD-11 often shows slightly improved hardenability, toughness, and wear resistance consistency. It reaches 56–1 HRC and is favored in precision cutting knives, die cutting tools, and industrial machine blades where tighter tolerances are required.",
      },
      {
        type: "callout",
        value:
          "SKD-11 VS D2: While chemically near-identical, SKD-11 benefits from stricter JIS refining standards, resulting in finer carbide distribution and marginally better impact toughness under cyclic loading.",
      },

      { type: "h2", value: "Tungsten Carbide" },
      {
        type: "paragraph",
        value:
          "Tungsten carbide is a sintered composite material made of tungsten carbide particles bonded with cobalt. It is significantly harder than tool steel, reaching 1500–500 HV. It provides extremely high wear resistance and excellent edge retention, but has low impact resistance and higher manufacturing cost.",
      },
      {
        type: "callout",
        value:
          "TUNGSTEN CARBIDE APPLICATIONS: [Recycling shredder knives](/products/twin-shaft-blades-recycling), abrasive material cutting, glass fiber or composite cutting, high-wear environments where blade longevity outweighs regrinding flexibility.",
      },

      { type: "h2", value: "Material Property Comparison" },
      {
        type: "paragraph",
        value:
          "Hardness — D2: 55–2 HRC | SKD-11: 56–1 HRC | Tungsten Carbide: 1500–500 HV. Wear Resistance — D2: High | SKD-11: High | Carbide: Extremely High. Toughness — D2: Medium | SKD-11: Medium-High | Carbide: Low. Regrinding — D2: Easy | SKD-11: Easy | Carbide: Difficult. Cost — D2: Medium | SKD-11: Medium-High | Carbide: High. Impact Resistance — D2: Moderate | SKD-11: Moderate | Carbide: Low.",
      },

      { type: "h2", value: "Material Selection Guide" },
      { type: "h3", value: "High Wear Applications" },
      {
        type: "paragraph",
        value:
          "Best choice: Tungsten Carbide. Ideal for [plastic recycling shredders](/products/twin-shaft-blades-recycling), fiberglass cutting, and abrasive materials. Advantages include extremely long blade life, reduced downtime, and consistent cutting performance. The primary limitation is higher cost and fragility under impact loads.",
      },

      { type: "h3", value: "General Industrial Cutting" },
      {
        type: "paragraph",
        value:
          "Best choice: D2 or SKD-11. Suitable for paper converting lines, plastic sheet cutting, and packaging materials. These steels offer good wear resistance, easy regrinding, and cost-effective total ownership. Most industrial cutting operations fall into this category.",
      },

      { type: "h3", value: "Applications with Impact Loads" },
      {
        type: "paragraph",
        value:
          "Best choice: SKD-11 or modified tool steels. When processing mixed recycling waste or materials with metal contamination risk, tool steels provide significantly better toughness and shock resistance than carbide. Choosing carbide in high-impact scenarios can lead to unexpected blade breakage.",
      },

      { type: "h2", value: "Blade Lifespan Comparison" },
      {
        type: "callout",
        value:
          "RELATIVE BLADE LIFESPAN — D2 Steel: 6/10 | SKD-11 Steel: 7/10 | Tungsten Carbide: 10/10. Measured under standardized abrasive cutting conditions. Actual lifespan varies by application, feed rate, and material being processed.",
      },

      { type: "h2", value: "Maintenance Strategy" },
      {
        type: "paragraph",
        value:
          "Proper maintenance significantly improves blade life regardless of material choice. Key practices include scheduled regrinding (tool steel blades can typically be re-sharpened multiple times, reducing replacement cost and maintaining cutting precision), material contamination control (install magnetic separators and metal detectors to prevent metal fragments from damaging blades), and effective cooling and lubrication (reduces thermal stress, prevents edge deformation, and improves cutting stability).",
      },

      { type: "h2", value: "Common Misconceptions" },
      {
        type: "paragraph",
        value:
          '"Harder is always better" — Not necessarily. Higher hardness often means lower toughness, increasing fracture risk. The optimal material balances hardness against the specific impact and fatigue demands of your application.',
      },
      {
        type: "paragraph",
        value:
          '"Carbide works for every application" — Carbide performs poorly in high-impact environments. Selecting carbide for the wrong scenario leads to unexpected blade breakage and higher total cost than a well-chosen tool steel.',
      },

      { type: "h2", value: "Quick Selection Checklist" },
      {
        type: "paragraph",
        value:
          "Before ordering industrial blades, consider: What material is being cut? Is the environment abrasive? Is there risk of metal contamination? How important is blade regrinding? What is the acceptable downtime cost? Answering these questions helps determine the optimal blade material for your operation.",
      },

      { type: "h2", value: "Conclusion" },
      {
        type: "paragraph",
        value:
          "Selecting the right blade material balances durability, cost, maintenance, and cutting precision. Use tungsten carbide for high-wear environments where longevity justifies the investment. Use D2 or SKD-11 for most industrial cutting applications where regrindability and cost matter. Always consider impact loads before selecting carbide — a well-chosen material can significantly reduce production downtime and operational cost.",
      },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id: "custom-metal-shear-blades-batch-production",
    tag: "COMPANY NEWS",
    date: "28.APR.2026",
    title:
      "Precision manufacturing delivered: high-performance metal shear blades ready for global export",
    excerpt:
      "Sureay recently completed a large batch of custom metal shear blades (900x75x25mm), combining precision grinding, strict quality control, and export-grade VCI packaging for global scrap metal processing facilities.",
    image:
      "/images/products/granulator-blades/metal-shear-blades-09.webp",
    readTime: "5 MIN",
    seoTitle:
      "Precision Manufacturing Delivered: Custom Metal Shear Blades Batch Ready for Export | Sureay",
    metaDescription:
      "Sureay recently completed a large batch of custom metal shear blades (900x75x25mm). Discover our precision grinding, strict quality control, and export-grade VCI packaging for global scrap metal processing facilities.",
    keywords:
      "metal shear blades, guillotine shear knives, scrap metal blades, D2 tool steel blades, Sureay industrial knives",
    relatedProductIds: ["metal-shear-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "At Sureay, we understand that for scrap metal recycling and heavy fabrication facilities, blade failure is not an option. Unscheduled downtime caused by chipped or rapidly wearing shear knives directly impacts your bottom line.",
      },
      {
        type: "paragraph",
        value:
          "This week, our manufacturing facility successfully completed the production, inspection, and packaging of a major batch of custom heavy-duty metal shear blades, engineered specifically for high-volume scrap processing applications.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-09.webp",
      },
      { type: "h2", value: "Uncompromising Dimensional Accuracy" },
      {
        type: "paragraph",
        value:
          "Achieving clean, efficient cuts in thick metal requires strict tolerances. As showcased in our recent production run, every blade undergoes rigorous CNC surface grinding to ensure absolute flatness and parallelism along the entire cutting edge.",
      },
      {
        type: "paragraph",
        value:
          "This specific batch features custom dimensions of 900mm x 75mm x 25mm, manufactured exactly to the client's OEM specifications. The precision-machined countersunk holes guarantee a seamless, secure fitment into the guillotine shear equipment, eliminating micro-vibrations during the shearing impact that often lead to premature blade fracture.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-06.webp",
      },
      { type: "h2", value: "Premium Tool Steel & Heat Treatment" },
      {
        type: "paragraph",
        value:
          "While dimensional accuracy is critical, metallurgical integrity determines the lifespan of the knife. These metal shear blades are forged from premium, high-alloy tool steel (options include D2, H13, or specialized 9CrSi depending on the cutting application).",
      },
      {
        type: "paragraph",
        value:
          "Through advanced vacuum heat treatment processes, we achieve the optimal balance between high surface hardness (for edge retention) and core toughness (to withstand severe mechanical shock from tramp metal).",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-07.webp",
      },
      { type: "h2", value: "Export-Grade Packaging for Global Reliability" },
      {
        type: "paragraph",
        value:
          "A high-quality industrial blade is useless if it arrives damaged or corroded. At Sureay, our commitment to quality extends to our dispatch logistics.",
      },
      {
        type: "paragraph",
        value:
          "Every single shear blade in this batch was coated with an industrial rust-inhibitor, tightly wrapped in VCI (Volatile Corrosion Inhibitor) paper, and securely bundled. This multi-layer export packaging ensures that whether these blades are shipped to North America, Europe, or Southeast Asia, they arrive in pristine, ready-to-install condition.",
      },
      {
        type: "image",
        value:
          "/images/products/granulator-blades/metal-shear-blades-08.webp",
      },
      { type: "h2", value: "Upgrade Your Shearing Operations with Sureay" },
      {
        type: "paragraph",
        value:
          "Are your current metal shear blades wearing out too quickly? We manufacture replacement knives for all major brands of scrap shears, alligator shears, and guillotine shears. We provide exact OEM replacements or upgraded metallurgical formulations tailored to your specific cutting challenges.",
      },
      {
        type: "callout",
        value:
          "[Contact Sureay Engineering Today](/contact) — Send us your drawings or OEM part numbers for a fast, technical evaluation and quote.",
      },
    ],
  },

  {
    id: "shredder-metallurgy-maximizes-recycling-yields",
    tag: "INDUSTRY NEWS",
    date: "30.MAR.2026",
    title:
      "The recycling boom: how advanced shredder metallurgy maximizes mechanical recycling yields",
    excerpt:
      "Discover how upgrading your shredder blades from standard D2 to DC53 or H13 tool steel can prevent catastrophic blade failure, survive tramp metal impacts, and maximize your recycling plant's uptime.",
    image: "/images/news/shredder-machine-working.webp",
    readTime: "7 MIN",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
      "single-shaft-bed-knives",
      "tire-shredder-blades",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "In the mechanical recycling industry, profitability isn't just about the volume of material you process; it is strictly measured by continuous machine uptime. As global mandates push for higher percentages of recycled plastics and metals, recycling facilities are processing unprecedented volumes of Municipal Solid Waste (MSW), industrial scrap, and end-of-life tires.",
      },
      {
        type: "paragraph",
        value:
          "But there is a brutal reality on the tipping floor: waste is never clean.",
      },
      {
        type: "paragraph",
        value:
          'When processing mixed bales of plastics or wood, shredder rotors inevitably encounter "tramp metal" — stray steel bolts, engine blocks, or hidden rebar. When a high-speed shredder blade hits a solid steel inclusion, the kinetic energy is massive. If your blades are made from the wrong metallurgical grade, they won\'t just dull; they will catastrophically shatter, destroying the rotor shaft and halting your entire line for days.',
      },
      {
        type: "paragraph",
        value:
          "To maximize yields and survive the chaos of modern recycling, plant managers must look beyond basic blade geometry and understand the science of shredder metallurgy.",
      },

      {
        type: "h2",
        value: "The Brittle Trap: Why Standard D2 Fails in Mixed Waste",
      },
      {
        type: "paragraph",
        value:
          "For decades, D2 (1.2379) cold-work tool steel has been the default choice for industrial cutting. Packed with 1.5% Carbon and 12% Chromium, D2 hardens beautifully to HRC 60–2, offering fantastic wear resistance when cutting clean, predictable materials like paper or pure plastic films.",
      },
      {
        type: "paragraph",
        value:
          "However, D2 achieves this hardness through the formation of massive, brittle chromium carbides in its microstructure. In a heavy-duty twin-shaft shredder application, high hardness equals low impact toughness. When a D2 hook blade bites into a hidden steel bolt, the brittle chromium carbides act as stress-concentration points. The blade snaps, sending broken shards of hardened steel through the cutting chamber, often destroying adjacent knives and the bed anvil in a domino effect.",
      },
      {
        type: "callout",
        value:
          "For clean, post-industrial plastic regrind (using [granulators](/products/granulator-blades)), D2 remains a cost-effective choice. But for primary breakdown shredders facing unpredictable MSW, D2 is a ticking time bomb.",
      },

      { type: "h2", value: "Upgrading the Arsenal: DC53 and H13 Tool Steels" },
      {
        type: "paragraph",
        value:
          'To conquer extreme impact environments, elite blade manufacturers shift the metallurgical focus from pure "hardness" to "transverse rupture strength" (toughness).',
      },
      { type: "h3", value: "DC53: The Superior Cold-Work Alternative" },
      {
        type: "paragraph",
        value:
          "DC53 is an advanced modification of standard D2. Through a refined alloy composition and tighter control over the steel-making process, DC53 eliminates the massive carbide structures found in D2. Heat-treated to HRC 60, DC53 maintains the excellent wear resistance of D2 but delivers double the impact toughness. It is the ultimate choice for heavy-duty [single-shaft shredder inserts](/products/single-shaft-rotor-inserts) processing tough, thick-walled plastics, copper cables, and tires where moderate shock loads are expected.",
      },
      { type: "h3", value: "H13 (1.2344): The Shock-Absorbing King" },
      {
        type: "paragraph",
        value:
          "Originally developed for hot-forging dies, H13 hot-work tool steel is the undisputed champion of the scrap yard. It contains lower carbon (0.40%) and utilizes a chromium-molybdenum-vanadium matrix. Hardened to a slightly lower HRC 52–6, H13 possesses massive core toughness. When an H13 [twin-shaft shredder blade](/products/twin-shaft-blades-recycling) hits a solid steel engine block, the blade might dent or deform elastically, but it will not shatter. This shock-absorbing characteristic saves the shredder's gearbox, hexagonal shaft, and bearings from catastrophic failure.",
      },

      {
        type: "h2",
        value: "The Ultimate Hybrid: Hardfacing and Surface Armor",
      },
      {
        type: "paragraph",
        value:
          "What if you need the extreme shock absorption of H13, but the wear resistance of a carbide blade to process highly abrasive materials like glass-fiber-reinforced plastics or sand-covered agricultural films?",
      },
      {
        type: "paragraph",
        value:
          "The answer is Hardfacing (Surface Welding). Leading tooling manufacturers take a tough, shatter-proof core (like H13 or customized alloy steel) and use PTA (Plasma Transferred Arc) welding to overlay a super-hard armor matrix — such as Stellite or Tungsten Carbide grit — directly onto the cutting hooks and wear faces.",
      },
      {
        type: "callout",
        value:
          "BIMETALLIC CONSTRUCTION: A blade that absorbs explosive impacts internally, while resisting severe abrasive wear externally — the holy grail of shredding.",
      },

      { type: "h2", value: "Maximizing Your Shredder's Uptime" },
      {
        type: "paragraph",
        value:
          'Every recycling line has a unique "diet." Using a one-size-fits-all blade material guarantees you are either overpaying for unnecessary tooling or bleeding money through excessive maintenance downtime.',
      },
      {
        type: "paragraph",
        value:
          "At Sureay, we engineer our [Single Shaft Shredder Blades](/products/single-shaft-rotor-inserts) and [Twin Shaft Shredder Knives](/products/twin-shaft-blades-recycling) to perfectly match your specific waste stream. From DC53 concave inserts for high-throughput plastic reduction to massive H13 hook blades for heavy metal and [tire processing](/products/tire-shredder-blades), our vacuum heat-treatment protocols ensure your tooling survives the most violent impacts your facility can throw at it.",
      },
      {
        type: "paragraph",
        value:
          "Don't let tramp metal dictate your production schedule. Contact our metallurgical engineering team today for a free wear-analysis of your current shredder blades, and discover how upgrading your alloy can transform your MTBR (Mean Time Between Replacements) from weeks into months.",
      },
    ],
  },
  {
    id: "facility-expansion-phase-iii",
    tag: "COMPANY NEWS",
    date: "24.OCT.2024",
    title: "Global facility expansion phase III",
    excerpt:
      "Commissioning of our new 5,000 m² high-precision CNC grid expands heavy-duty shredder blade production capacity by 40%, establishing Sureay's largest single-facility output in its 16-year operational history.",
    image: "/images/about/factory-00.webp",
    readTime: "5 MIN",
    relatedProductIds: [
      "granulator-blades",
      "metal-shear-knives",
      "rotary-slitter-knives",
    ],
    content: [
      { type: "h2", value: "Background & Rationale" },
      {
        type: "paragraph",
        value:
          "Since the original Ma'anshan facility commissioning in 2008, Sureay Machinery has operated under a constrained floor footprint of 10,000 m². The structural limitation reached critical threshold in Q3 2023, when incoming OEM order volume exceeded single-shift throughput capacity by 23%. A systematic capacity audit — conducted jointly by our operations and metallurgical engineering teams — identified three bottleneck nodes: raw stock pre-treatment staging, 5-axis CNC queue depth, and post-heat-treatment CMM throughput.",
      },
      {
        type: "paragraph",
        value:
          "Phase III expansion was ratified by executive management in November 2023, with groundbreaking commencing January 2024. The investment targets a net increase of 5,000 m² of temperature-controlled precision manufacturing space, directly adjacent to the existing CNC grid.",
      },
      {
        type: "callout",
        value:
          "CAPACITY PROJECTION: Phase III commissioning is forecast to increase annual blade output by 40%, from 18,000 units/year to 25,200 units/year at full operational load.",
      },
      { type: "h2", value: "Phase III Infrastructure" },
      {
        type: "paragraph",
        value:
          "The new wing incorporates six Mazak VARIAXIS i-800 5-axis machining centers, each rated for ±0.002 mm positional repeatability under continuous-duty thermal load. Coolant management has been upgraded to a closed-loop chiller system maintaining ±0.5°C spindle temperature stability — a critical variable for maintaining dimensional consistency across long-run blade batches.",
      },
      {
        type: "paragraph",
        value:
          "Two additional Ipsen TITAN N vacuum heat treatment furnaces have been installed, expanding heat cycle capacity by 60%. Each furnace chamber accommodates batch loads up to 800 kg, enabling simultaneous processing of full production runs for high-volume OEM orders without queue interruption.",
      },
      { type: "h3", value: "Metrology Expansion" },
      {
        type: "paragraph",
        value:
          "A Hexagon Global Silver CMM with 3.0 m × 2.5 m measurement volume has been added to the quality bay, supplementing the existing Renishaw system. Both units are now networked to a centralized metrology database, providing real-time dimensional trend analysis and automated non-conformance flagging for every production batch.",
      },
      { type: "h2", value: "Production Capacity Metrics" },
      {
        type: "callout",
        value:
          "OPERATIONAL DATA — CNC spindle utilization: Previous 71% — Phase III target 85%. Heat treatment throughput: Previous 1,200 kg/week — Phase III 1,920 kg/week. CMM inspection throughput: Previous 340 parts/day — Phase III 520 parts/day.",
      },
      {
        type: "paragraph",
        value:
          "The expanded CNC grid enables parallel scheduling across product families — [shredder blade](/products/twin-shaft-blades-recycling) runs can now proceed concurrently with [log saw blade](/products/tissue-log-saw-blades) batches without resource contention. This architectural separation of machine types by product vertical minimizes setup changeover time and preserves dedicated tooling inventories per product line.",
      },
      { type: "h2", value: "Quality Protocol Integration" },
      {
        type: "paragraph",
        value:
          "Phase III operations are governed under the existing ISO 9001:2015 QMS framework, with scope extension formally filed with our SGS certification body in August 2024. All Phase III equipment has been incorporated into the calibration and preventive maintenance schedule, with baseline capability studies (Cpk ≥1.67) completed on all new machining centers prior to production release.",
      },
      {
        type: "paragraph",
        value:
          "Material traceability has been extended to full heat lot-level tracking across the new furnace units, ensuring end-to-end documentation from incoming steel certification to outbound dimensional report — maintaining unchanged protocol integrity from the legacy facility.",
      },
      { type: "h2", value: "Deployment Timeline" },
      {
        type: "paragraph",
        value:
          "Civil construction completed on schedule in June 2024. Equipment installation and utility commissioning ran July–September 2024. Production qualification runs commenced October 2024, with full commercial capacity release scheduled for Q1 2025. All current OEM delivery commitments are maintained through the legacy facility during the transition window.",
      },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id: "high-hardness-metal-shear-guide",
    tag: "INDUSTRY NEWS",
    date: "11.MAR.2026",
    title: "Why choose high-hardness metal shear knives?",
    excerpt:
      "Enhance precision and longevity in heavy-duty fabrication. High-hardness shear blades deliver exceptional durability, accuracy, and operational efficiency in industrial metal cutting applications.",
    image: "/images/products/granulator-blades/metal-shear-blades-02.webp",
    readTime: "7 MIN",
    relatedProductIds: [
      "metal-shear-knives",
      "metal-coil-slitting-knives",
      "metal-cold-saw-blades",
    ],
    content: [
      {
        type: "h2",
        value: "Introduction: The Stakes in Industrial Metal Cutting",
      },
      {
        type: "paragraph",
        value:
          "In industries that require precision metal cutting, durability and efficiency are non-negotiable. High-hardness shear blades stand out for their ability to handle tough materials like stainless steel and hot-rolled billets while maintaining extreme sharpness and longevity. By choosing the right blade, steel service centers and fabrication plants can significantly reduce downtime, lower cost-per-cut, and optimize their entire business operation.",
      },

      { type: "h2", value: "What Are High-Hardness Metal Shear Knives?" },
      {
        type: "paragraph",
        value:
          "High-hardness shear blades are a class of heavy-duty industrial knives designed to maintain a sharp, durable edge under continuous, high-stress use. Unlike standard off-the-shelf blades, Sureay's [Metal Shear Knives](/products/metal-shear-knives) are forged from premium tool steels and advanced alloys—such as 9CrSi, Cr12MoV (D2 equivalent), and H13.",
      },
      {
        type: "paragraph",
        value:
          "Through strict in-house vacuum heat treatment, we achieve an optimal Rockwell hardness rating, typically ranging from 58 to 62 HRC depending on the specific application. This sophisticated hardening process involves both precise heating and quenching to achieve the perfect balance between absolute hardness and impact toughness. The result? A blade that is highly resistant to wear, deformation, and edge chipping, minimizing maintenance and ensuring uninterrupted production.",
      },

      {
        type: "h2",
        value: "Core Applications: Matching the Blade to the Extreme",
      },
      {
        type: "paragraph",
        value:
          "High-hardness cutting blades are indispensable in numerous heavy industries due to their resilience and precision. At Sureay, we categorize our metal shear knives based on the exact thermal and mechanical stress of your operation:",
      },
      {
        type: "h3",
        value: "Cold-Rolled & Mild Steel Shearing (Standard Duty)",
      },
      {
        type: "paragraph",
        value:
          "Utilizing high-carbon steels like T10 and 65Mn (57-59 HRC), these blades are incredibly cost-effective for shearing standard A3 plates and general metal recycling.",
      },
      { type: "h3", value: "Stainless & Medium Plate Shearing (Heavy Duty)" },
      {
        type: "paragraph",
        value:
          "Cutting stainless steel requires extraordinary wear resistance. Our Cr12MoV and 6CrW2Si blades (58-62 HRC) excel in [metal coil slitting](/products/metal-coil-slitting-knives) and shearing applications by maintaining a sharp edge over prolonged use.",
      },
      { type: "h3", value: "Hot-Rolled Billet Shearing (Extreme Temp)" },
      {
        type: "paragraph",
        value:
          "Engineered for heavy steel mills, our H13 and LD alloy blades feature extreme 'Red Hardness.' They retain their structural integrity and resist annealing even when shearing hot slabs at extreme temperatures.",
      },

      {
        type: "h2",
        value: "Key Benefits of Upgrading to High-Hardness Blades",
      },
      {
        type: "paragraph",
        value:
          "Investing in Sureay's high-hardness shear knives offers transformative benefits to industrial operations:",
      },
      {
        type: "callout",
        value:
          "ENHANCED DURABILITY: High-hardness shear blades are far more wear-resistant, meaning fewer blade changes and longer production runs without interruptions.",
      },
      {
        type: "paragraph",
        value:
          "Superior Cutting Precision: With their ability to hold a sharp edge, these blades provide clean, burr-free cuts across thick alloy plates. This precision reduces material waste and guarantees edge straightness.",
      },
      {
        type: "paragraph",
        value:
          "Reduced Maintenance Costs: The longevity and resilience of high-hardness blades directly lower your maintenance overhead. In heavy-use environments, studies estimate that high-hardness blades can reduce annual maintenance costs by up to 40%.",
      },

      { type: "h2", value: "How to Choose the Right Shear Blade" },
      {
        type: "paragraph",
        value:
          "Selecting the exact match for your mechanical or hydraulic guillotine shear involves careful consideration of several factors:",
      },
      {
        type: "paragraph",
        value:
          "Material Compatibility: Matching the blade material to the specific metal being cut is essential. Do not use a standard T10 carbon blade to cut thick stainless steel; instead, opt for Cr12MoV.",
      },
      {
        type: "paragraph",
        value:
          "Hardness vs. Toughness: While high hardness increases wear resistance, excessive hardness can make a blade brittle. Sureay engineers expertly balance this by recommending 58-62 HRC for heavy-duty applications, ensuring impact resistance without chipping.",
      },
      {
        type: "paragraph",
        value:
          "Edge Geometry: Depending on your machine setup, blades can be manufactured with 1, 2, or 4 indexable cutting edges, effectively multiplying the blade's service lifespan.",
      },

      { type: "h2", value: "Maintenance Tips for Extending Blade Life" },
      {
        type: "paragraph",
        value:
          "To maximize your ROI on high-hardness shear blades, proper maintenance is crucial:",
      },
      {
        type: "callout",
        value:
          "DYNAMIC CLEARANCE CONTROL: Always adjust the horizontal gap between the upper and lower blades based on the thickness of the metal plate. Incorrect clearance is the #1 cause of edge chipping.",
      },
      {
        type: "paragraph",
        value:
          "Use Appropriate Materials Only: Cutting materials beyond the blade's design parameters (e.g., cutting titanium with a mild steel blade) can accelerate wear and lead to catastrophic damage.",
      },
      {
        type: "paragraph",
        value:
          "Timely Sharpening: Regular inspections and scheduled sharpening at the right intervals ensure that blades remain efficient and reduce the tonnage force required from your machine motor.",
      },

      { type: "h2", value: "Conclusion: Partner with Sureay" },
      {
        type: "paragraph",
        value:
          "High-hardness shear blades offer unparalleled durability, precision, and cost savings for heavy metal fabrication. Whether you operate in shipbuilding, aviation, structural steel, or a dedicated steel service center, upgrading your guillotine shears with [exact-match OEM metal shear knives](/products/metal-shear-knives) will guarantee continuous, peak performance.",
      },
      {
        type: "paragraph",
        value:
          "Ready to equip your facility with the ultimate cutting edge? Contact the Sureay engineering team today for a technical audit and custom blade quotation.",
      },
    ],
  },
  {
    id: "cryogenic-treatment-alloy-blades",
    tag: "INDUSTRY NEWS",
    date: "12.SEP.2024",
    title: "Advanced cryogenic treatment for alloy blades",
    excerpt:
      "Technical whitepaper on how deep cryogenic processing (-196°C) enhances wear resistance in plastic recycling applications.",
    image: "/images/process/heat-treatment.webp",
    readTime: "4 MIN",
    relatedProductIds: [
      "granulator-blades",
      "twin-shaft-blades-recycling",
      "metal-shear-knives",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Conventional quench-and-temper heat treatment leaves 10–0% retained austenite in high-alloy tool steels such as D2, M2, and the CPM series. This metastable phase reduces hardness ceiling and accelerates micro-spalling at the cutting edge under cyclic impact loading — a primary failure mode in plastic film and pipe recycling applications.",
      },
      {
        type: "paragraph",
        value:
          "Deep cryogenic processing (DCP) at -196°C transforms residual austenite to martensite, increasing carbide density at the matrix level. Independent laboratory analysis of DCP-treated D2 specimens shows a 12–8% improvement in wear resistance (ASTM G65 dry-sand rubber-wheel test) versus conventionally treated controls.",
      },
      {
        type: "callout",
        value:
          "TEST DATA: D2 blade, conventional treatment — wear scar depth 0.42 mm after 6,000 revolution test cycle. D2 blade, DCP post-treatment — wear scar depth 0.36 mm. Improvement: 14.3% reduction in material loss at equivalent load and abrasion conditions.",
      },
      { type: "h2", value: "Process Protocol" },
      {
        type: "paragraph",
        value:
          "Post-quench, blades are placed in a programmable cryogenic chamber and cooled at a controlled rate of 3°C/min to -196°C. Soak duration is minimum 24 hours. Parts are returned to ambient temperature at 2°C/min to prevent thermal shock cracking. A final low-temperature temper cycle (175°C, 2 hours) follows to relieve transformation stresses.",
      },
      { type: "h2", value: "Application Scope" },
      {
        type: "paragraph",
        value:
          "DCP is recommended for blades operating in abrasive-dominant environments: HDPE/PP pipe [granulation](/products/granulator-blades), wet-process [tissue log sawing](/products/tissue-log-saw-blades), and [multi-shaft recycling](/products/twin-shaft-blades-recycling) of glass-fibre-reinforced polymers. For impact-dominant applications (steel scrap shredding), conventional treatment with toughness-optimized tempering remains the preferred specification.",
      },
    ],
  },
  {
    id: "k-show-2024-recycling-knives",
    tag: "COMPANY NEWS",
    date: "05.AUG.2024",
    title: "K-Show 2024: next-gen recycling knives deployed",
    excerpt:
      "Live demonstrations of our aggressively angled hook-tooth profiles engineered for high-throughput single shaft shredders.",
    image: "/images/process/cnc-precision-grinding.webp",
    readTime: "3 MIN",
    relatedProductIds: [
      "twin-shaft-blades-recycling",
      "granulator-blades",
      "tire-shredder-blades",
      "scrap-chopper-blades",
    ],
    content: [
      { type: "h2", value: "Exhibition Overview" },
      {
        type: "paragraph",
        value:
          "K 2024 (Düsseldorf, October 16–3) marked Sureay Machinery's third consecutive appearance at the world's leading plastics and rubber trade fair. Booth 12C34 in Hall 12 hosted demonstration units for our new hook-tooth [single-shaft shredder blade](/products/single-shaft-rotor-inserts) series, purpose-built for throughput rates exceeding 8 t/h on post-consumer LDPE film bales.",
      },
      {
        type: "callout",
        value:
          "VISITOR DATA: 340 qualified engineering contacts registered at the Sureay booth across 8 exhibition days. 28 active RFQ processes initiated within 30 days of exhibition close.",
      },
      { type: "h2", value: "Hook-Tooth Profile Engineering" },
      {
        type: "paragraph",
        value:
          "The new geometry features a 15° positive rake angle with a sharpened secondary land profile, reducing initial bite force while maintaining edge stability over extended run cycles. Compared to the outgoing flat-top profile, lab trials on 6 mm HDPE sheet show a 22% reduction in motor current draw at equivalent feed rate — directly translating to energy cost savings for the end operator.",
      },
    ],
  },
  {
    id: "tin-vs-chrome-coating",
    tag: "INDUSTRY NEWS",
    date: "28.JUL.2024",
    title: "Surface metallurgy: TiN vs. chrome coating",
    excerpt:
      "A comparative metrology report on blade surface friction coefficients in high-humidity tissue paper converting environments.",
    image: "/images/common/Quality-Inspection.webp",
    readTime: "6 MIN",
    relatedProductIds: [
      "tissue-log-saw-blades",
      "rotary-slitter-knives",
      "paper-cutting-blades",
    ],
    content: [
      { type: "h2", value: "Test Objective" },
      {
        type: "paragraph",
        value:
          "[Tissue log saw blades](/products/tissue-log-saw-blades) operating in wet environments (drum moisture content 8–2%) are subject to adhesive wear from cellulose fibre accumulation at the cutting edge, and corrosive attack from free chlorine in process water. This study benchmarks PVD-deposited TiN and hard chrome coatings against uncoated D2 baseline across friction, adhesion, and service-life metrics.",
      },
      {
        type: "callout",
        value:
          "TEST PARAMETERS: Substrate D2 tool steel, 62 HRC. Log diameter 280 mm. Speed 2,800 RPM. Coolant: 0.5% synthetic emulsion. Test duration: 500 operating hours per sample group (n=3 per coating type).",
      },
      { type: "h2", value: "Results: TiN Coating" },
      {
        type: "paragraph",
        value:
          "TiN-coated blades demonstrated a 31% reduction in friction coefficient (μ = 0.22 vs. 0.32 baseline) at test initiation. Coating adhesion remained intact for the full 500-hour test cycle with no delamination detected by SEM cross-section analysis at 250h and 500h intervals. Edge recession rate: 0.008 mm/100h vs. 0.019 mm/100h uncoated.",
      },
      { type: "h2", value: "Results: Hard Chrome Coating" },
      {
        type: "paragraph",
        value:
          "Hard chrome showed comparable friction reduction (μ = 0.24) at test start, but exhibited micro-cracking at the coating-substrate interface from 180 hours onward due to hydrogen embrittlement under cyclic loading. Edge recession rate climbed to 0.015 mm/100h post-200h, approaching the uncoated baseline.",
      },
      {
        type: "callout",
        value:
          "RECOMMENDATION: TiN PVD coating is the preferred specification for [tissue log saw blades](/products/tissue-log-saw-blades) in high-humidity, chlorinated-water environments. Hard chrome is not recommended for cyclic-impact cutting applications regardless of substrate hardness.",
      },
      { type: "h2", value: "Application Guidelines" },
      {
        type: "paragraph",
        value:
          "TiN coating adds approximately 3–5 μm to nominal blade dimensions. Specifying engineers should account for this in mounting clearance calculations. Re-coating after sharpening is available as a service and restores full friction and corrosion performance with no dimensional penalty beyond standard re-grind stock removal.",
      },
    ],
  },
  {
    id: "iso-9001-recertification-2024",
    tag: "COMPANY NEWS",
    date: "14.JUN.2024",
    title: "ISO 9001:2015 re-certification completed",
    excerpt:
      "Zero non-conformances reported during the latest external audit of our Ma'anshan manufacturing facility.",
    image: "/images/about/factory.webp",
    readTime: "2 MIN",
    relatedProductIds: [
      "granulator-blades",
      "metal-shear-knives",
      "twin-shaft-blades-recycling",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "The triennial ISO 9001:2015 surveillance audit was conducted by SGS Group auditors on 10–1 June 2024, covering the full scope of the Ma'anshan Quality Management System: design and development, production of [industrial blades and cutting knives](/products), inspection and testing, internal audit, management review, and corrective action processes.",
      },
      {
        type: "callout",
        value:
          "AUDIT RESULT: Zero major non-conformances. Zero minor non-conformances. Three opportunities for improvement noted (non-binding). Certificate validity extended to June 2027.",
      },
      {
        type: "paragraph",
        value:
          "Three opportunities for improvement identified in the audit report relate to digital traceability record retention, inter-departmental APQP communication cadence, and calibration interval review scheduling. All three are under evaluation by the Quality Management team for implementation priority.",
      },
    ],
  },
  {
    id: "log-saw-blade-bevel-angles",
    tag: "INDUSTRY NEWS",
    date: "02.MAY.2024",
    title: "Optimizing bevel angles for log saw blades",
    excerpt:
      "Engineering guidelines for balancing edge sharpness and core toughness to prevent blade deflection during high-speed cutting.",
    image: "/images/products/blades/tissue-log-saw-blades-02.webp",
    readTime: "4 MIN",
    relatedProductIds: [
      "tissue-log-saw-blades",
      "paper-cutting-blades",
      "three-knife-trimmer-blades",
    ],
    content: [
      { type: "h2", value: "The Geometry-Performance Trade-off" },
      {
        type: "paragraph",
        value:
          "[Log saw blade](/products/tissue-log-saw-blades) geometry is governed by three competing demands: edge sharpness (low included angle), deflection resistance (blade section thickness and crown profile), and tooth durability (sufficient included angle to resist chipping under cyclic impact from log cores and wrappers). Industry standard bevel angles range from 28° to 42° depending on log diameter, rotation speed, and cellulose density.",
      },
      {
        type: "callout",
        value:
          "GUIDELINE: For tissue logs ≥80 mm diameter at speeds above 2,500 RPM, a 32° included angle with 0.15 mm secondary bevel is the recommended starting specification. Increase to 36° for logs containing recycled fibre content >30%.",
      },
      { type: "h2", value: "Crown Profile and Deflection" },
      {
        type: "paragraph",
        value:
          "Blade deflection mid-cut introduces skew error in slice dimension tolerance and generates lateral loading that accelerates bearing wear in the saw spindle. The crown profile (radial relief from centre to tooth) must be within ±0.03 mm of nominal across the full blade diameter. Crown verification is performed on our Vollmer VGrind optical measurement station post-grind.",
      },
    ],
  },
  {
    id: "melt-filter-scraper-blade-daily-maintenance-checklist",
    tag: "INDUSTRY NEWS",
    date: "21.APR.2026",
    title:
      "Daily maintenance checklist: scraper blades & filter plates for continuous melt filters",
    excerpt:
      "A step-by-step daily, weekly, and monthly maintenance guide for continuous melt filter scraper blades and filter plates — with a printable inspection checklist to extend service life and eliminate unplanned downtime on PCR recycling lines.",
    image: "/images/products/blades/scraper-blades-01.webp",
    readTime: "6 MIN",
    relatedProductIds: ["continuous-melt-filter-scraper-blades"],
    content: [
      {
        type: "paragraph",
        value:
          "Continuous melt filters achieve automatic slag removal by combining a high-precision microporous filter plate with a rotating scraper blade that continuously cleans its surface — eliminating the frequent manual screen changes required by conventional screen changers. However, the [scraper blade and filter plate](/products/continuous-melt-filter-scraper-blades) are wear consumables. Non-standard operation and deferred maintenance accelerate failure, increase replacement costs, and force the unplanned line stops that continuous filtration was designed to prevent.",
      },
      {
        type: "paragraph",
        value:
          "The maintenance programme below is organised into three frequencies — daily, weekly, and monthly — plus a dedicated filter plate deep-cleaning procedure. A printable inspection checklist is attached at the end of the article.",
      },

      {
        type: "h2",
        value: "Daily Inspection (Before and After Each Startup)",
      },
      { type: "h3", value: "1. Listen" },
      {
        type: "paragraph",
        value:
          "During startup and throughout operation, listen for any abnormal friction, squealing, impact, or periodic irregular noise from the filter head. Any sound that was not present in the previous shift is a diagnostic signal and should be investigated before the fault progresses.",
      },
      { type: "h3", value: "2. Observe" },
      {
        type: "paragraph",
        value:
          "Confirm slag discharge is flowing smoothly and continuously — intermittent or absent discharge indicates a blocked discharge port or degraded scraper contact. Check for melt leakage around the filter head seals. Verify that pneumatic or hydraulic supply pressure is stable and within the OEM-specified range; pressure fluctuations directly affect scraper contact force and filtration consistency.",
      },
      { type: "h3", value: "3. Clean" },
      {
        type: "paragraph",
        value:
          "While the machine is at a safe temperature, use a soft cloth to remove residual melt material from around the scraper blade, blade holder, and slag discharge port. Material that is allowed to dry and harden in these areas creates abrasive deposits that accelerate blade edge wear on subsequent startups.",
      },
      { type: "h3", value: "4. Record" },
      {
        type: "paragraph",
        value:
          "Log any observed abnormality — noise, pressure deviation, leakage, incomplete slag discharge — immediately in the maintenance ledger. If a fault cannot be attributed to a known cause, shut down and troubleshoot rather than continuing production. Undiagnosed progressive faults on scraper-type filters typically escalate to filter plate damage, which is significantly more costly to repair than the blade itself.",
      },

      { type: "h2", value: "Weekly Maintenance" },
      { type: "h3", value: "1. Inspect the Blade Edge" },
      {
        type: "paragraph",
        value:
          "Remove the scraper blade from its holder and inspect the cutting edge under adequate lighting. Look for notches, chipped sections, rolled edge, or uneven wear across the blade width. Any notch — even a small one — must be treated as a mandatory replacement trigger. A notched blade does not clean the filter plate evenly: the gap left by the notch allows contaminant cake to bypass the scraping action, progressively building up into a solid deposit that scores the filter plate surface on subsequent rotations.",
      },
      {
        type: "callout",
        value:
          "BLADE EDGE FAILURE: A single notch from a tramp metal impact is the most common cause of premature filter plate scoring on PCR lines. If notching is recurring, upgrade from D2 to H13 for higher impact toughness, or specify toughness-grade carbide for heavily contaminated streams. See the [Scraper Blades product page](/products/continuous-melt-filter-scraper-blades) for the full metallurgical upgrade path and failure analysis diagnostic matrix.",
      },
      { type: "h3", value: "2. Retighten Fasteners" },
      {
        type: "paragraph",
        value:
          "Retighten all screws on the blade holder, actuating cylinder, and base mounting. Vibration from the continuous rotation mechanism causes gradual fastener loosening that is not perceptible during casual inspection. A loose blade holder allows micro-movement of the blade relative to the filter plate surface, creating inconsistent contact pressure that both degrades scraping effectiveness and accelerates non-uniform blade wear.",
      },
      { type: "h3", value: "3. Check the Air and Oil Circuit" },
      {
        type: "paragraph",
        value:
          "Inspect all pneumatic lines for leaks and loose fittings. Drain accumulated water from the air filter bowl — water in the pneumatic circuit causes corrosion of actuator seals and unpredictable variation in scraper contact force. Check the oil mist lubricator reservoir and refill if below the minimum level. Dry-running pneumatic actuators wear seal surfaces rapidly, leading to pressure loss and inconsistent blade contact.",
      },

      { type: "h2", value: "Monthly Maintenance" },
      { type: "h3", value: "1. Disassemble and Thoroughly Clean" },
      {
        type: "paragraph",
        value:
          "Remove the complete scraper assembly from the filter head. Disassemble the blade holder and sealing components. Thoroughly clean all surfaces to remove dry material from dead corners, crevices around the blade seating surface, and the slag discharge channel. Hardened melt residue in these areas prevents correct blade seating during reassembly and creates stress concentration points that initiate blade cracking.",
      },
      { type: "h3", value: "2. Measure Blade Wear" },
      {
        type: "paragraph",
        value:
          "Measure the remaining blade edge height or thickness against the OEM minimum dimension specification. Replace immediately if at or below the wear limit. An undersized blade applies reduced contact force against the filter plate, dramatically degrading scraping efficiency and allowing contaminant cake to accumulate.",
      },
      { type: "h3", value: "3. Calibrate Cylinder Pressure and Spring Preload" },
      {
        type: "paragraph",
        value:
          "Using a calibrated pressure gauge, verify the cylinder actuation pressure and spring preload against the OEM specification. These values directly control the scraper contact force. Insufficient force leaves residual contamination on the plate after each rotation; excessive force accelerates blade wear and risks scoring the plasma-nitrided filter plate surface. After calibration, manually rotate the scraper through a full revolution to confirm uniform full-width contact with no local suspension.",
      },
      { type: "h3", value: "4. Inspect Sealing Components" },
      {
        type: "paragraph",
        value:
          "Inspect all sealing rings and dust rings for aging (hardening, cracking, loss of elasticity), oil leakage, or air leakage. Replace any seal showing visible degradation — operating with a compromised seal allows melt infiltration into the actuator mechanism, leading to rapid bearing and seal failure requiring complete assembly replacement.",
      },

      {
        type: "h2",
        value: "Filter Plate Deep Cleaning: The Five-Step Method",
      },
      {
        type: "paragraph",
        value:
          "When differential pressure rises progressively despite a new blade and correct scraper contact force, the microporous filter plate requires deep cleaning to remove embedded contaminants that scraping cannot reach. The five-step procedure below is suitable for field cleaning without specialist equipment.",
      },
      { type: "h3", value: "Step 1 — Plastic Burn-Off" },
      {
        type: "paragraph",
        value:
          "Remove the filter plate. Apply a thin coat of waste engine oil to the downstream (back) face as a release agent, oil-face down. Place on a grate over a heat source and burn off residual polymer. Work in a well-ventilated area. Do not overheat — sustained temperatures above 600°C can relieve the plasma-nitrided surface hardness.",
      },
      { type: "h3", value: "Step 2 — Flatten and Reshape" },
      {
        type: "paragraph",
        value:
          "While still warm and pliable after burn-off, clamp the plate firmly between two flat surfaces (ceramic tiles or steel plates) to correct any warpage from thermal gradient. Hold under clamping pressure until cooled to ambient temperature.",
      },
      { type: "h3", value: "Step 3 — High-Pressure Water Rinse" },
      {
        type: "paragraph",
        value:
          "Flush both faces with a high-pressure water gun, directing the jet perpendicular to the perforation array to drive out embedded particles — metal wire, sand, calcium carbonate, glass fibre — from the conical bore channels. Inspect against a backlight source after rinsing: blocked holes appear as dark spots.",
      },
      { type: "h3", value: "Step 4 — Compressed Air Blow-Dry" },
      {
        type: "paragraph",
        value:
          "Blow the plate dry from both faces with clean, dry compressed air, paying particular attention to moisture retention within the micro-perforations. Residual water accelerates corrosion within the bore channels during storage.",
      },
      { type: "h3", value: "Step 5 — Rust Prevention and Storage" },
      {
        type: "paragraph",
        value:
          "Apply a thin coat of light white oil or hydraulic oil to all surfaces. Wrap in oil paper or seal in a plastic bag and store flat in a clean, dry location. A properly cleaned and preserved plate can be stored indefinitely and returned to service as a verified clean spare.",
      },

      {
        type: "h2",
        value: "Maintenance Checklist (Printable / Screenshot)",
      },
      {
        type: "callout",
        value:
          "CONTINUOUS MELT FILTER — SCRAPER BLADE & FILTER PLATE INSPECTION CHECKLIST\n\n— Blade Edge — No notch, burr, chipped section, or uneven wear across full width\n— Blade Holder Fixing — All screws tight, no deformation or looseness\n— Air / Oil Circuit — No leaks, supply pressure stable, oil mist lubricator filled\n— Scraper Fit — Full-width contact with filter plate, no local suspension\n— Operation — No abnormal noise, vibration, or resistance during rotation\n— Slag Discharge — Continuous, unobstructed flow from discharge port\n— Cleanliness — No hardened or dry material in blade holder or discharge port\n— Seal Components — No aging, cracking, oil leakage, or air leakage\n\nRecord inspection date, operator name, and any corrective actions. Retain for a minimum of 12 months.",
      },
      {
        type: "paragraph",
        value:
          "It is recommended to complete and sign off the checklist after each maintenance event, building a traceable ledger that allows early detection of developing trends — increasing wear rate, recurring leaks, progressive pressure rise — before they escalate to unplanned downtime.",
      },
      {
        type: "paragraph",
        value:
          "Have technical difficulties with your continuous melt filter? Sureay supplies precision aftermarket [scraper blades and conical laser-drilled filter plates](/products/continuous-melt-filter-scraper-blades) in D2, H13, and solid carbide grades, with a hardness certificate and CMM dimensional report in every shipment. Contact the Sureay engineering team at lynn@sureay.com or +86 180 0555 0657.",
      },
    ],
  },
  {
    id: "alloy-vs-hss-paper-cutter-blades",
    tag: "INDUSTRY NEWS",
    date: "23.APR.2026",
    title:
      "Alloy blade vs high-speed steel: lifespan & cost guide for high-speed paper cutters",
    excerpt:
      "Tungsten carbide alloy blades last 5–0× longer than high-speed steel on paper cutters — but is the higher upfront cost justified? A practical comparison of hardness, service life, and total cost of ownership to help you choose the right blade for your operation.",
    image: "/images/products/paper-cutting-blades/paper-cutting-blades-04.webp",
    readTime: "5 MIN",
    relatedProductIds: ["paper-cutting-blades"],
    content: [
      {
        type: "paragraph",
        value:
          "For high-speed paper cutters, blade material directly affects production efficiency and operating costs. How to choose between an alloy blade (tungsten carbide) and a high-speed steel (HSS) blade is a decision that every procurement manager and equipment engineer needs to face. As a manufacturer with decades of experience producing precision mechanical blades, Sureay provides this comprehensive analysis.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-01.webp",
      },

      { type: "h2", value: "1. Material Characteristics" },
      {
        type: "paragraph",
        value:
          "Alloy blades are made from tungsten carbide as the base material, achieving a hardness of HRC 89–3 with extremely high wear resistance. The trade-off is brittleness — tungsten carbide is sensitive to impact loads. High-speed steel blades reach HRC 62–5; wear resistance is lower, but toughness is significantly better and they can absorb impact loads that would chip a carbide edge.",
      },
      {
        type: "callout",
        value:
          "HARDNESS COMPARISON — Alloy (Tungsten Carbide): HRC 89–3, extremely high wear resistance, brittle under impact. HSS: HRC 62–5, good wear resistance, high impact toughness, suitable for shock loads.",
      },

      { type: "h2", value: "2. Service Life Comparison" },
      {
        type: "paragraph",
        value:
          "In high-speed paper cutting applications, the lifespan of alloy blades is 5–0 times that of high-speed steel blades.",
      },
      {
        type: "paragraph",
        value:
          "High-speed steel blade: Under normal operating conditions, cutting mileage is approximately 10,000–0,000 metres. In the packaging industry, published service life benchmarks reach approximately 200,000 metres. HSS remains the most widely used solution in most packaging factories due to its lower initial cost and ease of regrinding.",
      },
      {
        type: "paragraph",
        value:
          "Alloy (carbide) blade: Cutting mileage can reach 50,000–00,000 metres. The service life of premium-grade alloy blades reaches 4+ million metres in optimised conditions. Strong wear resistance and sustained edge retention significantly reduce blade-change stoppages and improve overall equipment effectiveness.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-02.webp",
      },

      { type: "h2", value: "3. Cost Comparison" },
      {
        type: "paragraph",
        value:
          "The unit price of alloy blades is approximately 10 times that of high-speed steel blades — the primary reason many buyers hesitate. However, total cost of ownership tells a different story.",
      },
      {
        type: "callout",
        value:
          "TOTAL COST BREAKDOWN — Single purchase cost: Alloy blade HIGH (~10× HSS) | HSS blade LOW. Replacement & regrind frequency: Alloy LOW | HSS HIGH. Downtime loss: Alloy LOW | HSS HIGH. Long-term comprehensive cost: Alloy LOWER | HSS HIGHER.",
      },
      {
        type: "paragraph",
        value:
          "For high-speed paper cutters running continuous production with full order books, the value generated by the downtime saved by alloy blades can easily cover the initial price difference. In the long run, alloy blades are often the more economical choice.",
      },
      {
        type: "image",
        value: "/images/news/paper-cutting-blades-03.webp",
      },

      { type: "h2", value: "4. How to Choose the Right Blade" },
      {
        type: "paragraph",
        value:
          "24-hour continuous production — Alloy blade. Long service life, minimal blade changes, low downtime losses, and the lowest overall cost per metre cut.",
      },
      {
        type: "paragraph",
        value:
          "Small batch sizes or multiple substrate varieties — High-speed steel blade. Low initial investment, simpler regrinding workflow, and high operational flexibility.",
      },
      {
        type: "paragraph",
        value:
          "Cutting high-ash-content paper, art paper, or corrugated board — Alloy blade. Abrasive substrates accelerate HSS edge passivation quickly; carbide wear resistance is essential to maintain cut quality.",
      },
      {
        type: "paragraph",
        value:
          "Older equipment with insufficient precision — High-speed steel blade. Carbide is brittle; edge chipping is likely if machine alignment or clamping precision is below standard. HSS toughness provides greater tolerance for equipment variability.",
      },
      {
        type: "callout",
        value:
          "SELECTION PRINCIPLE: If your paper cutter is high-precision and running at full capacity, alloy blades are the wiser long-term investment. For older equipment or variable operating conditions, high-speed steel offers greater safety margin and lower risk.",
      },

      { type: "h2", value: "5. Summary" },
      {
        type: "paragraph",
        value:
          "Alloy blade: High hardness, extreme wear resistance, long service life — suited to continuous production and demanding substrates. Initial investment is high, but long-term comprehensive cost is lower.",
      },
      {
        type: "paragraph",
        value:
          "High-speed steel blade: Affordable, good toughness, can be repeatedly reground — suited to small batches or equipment with average precision. Replacement frequency is higher, and long-term comprehensive cost exceeds that of carbide over the same cutting volume.",
      },
      {
        type: "paragraph",
        value:
          "The right selection depends on your equipment condition, production scale, and substrate. For professional material selection advice or a custom blade solution for your paper cutter, contact the [Sureay engineering team](/contact) — we supply both [paper cutting blades](/products/paper-cutting-blades) in HSS and carbide grades, with CMM dimensional reports in every shipment.",
      },
    ],
  },
  {
    id: "chinaplas-2024-oem-partnerships",
    tag: "COMPANY NEWS",
    date: "18.APR.2024",
    title: "Chinaplas debrief: OEM co-engineering initiatives",
    excerpt:
      "Strategic partnerships formed with three top-tier European granulator manufacturers for custom blade geometry development.",
    image: "/images/common/cnc-machine.webp",
    readTime: "3 MIN",
    relatedProductIds: [
      "granulator-blades",
      "twin-shaft-blades-recycling",
      "single-shaft-rotor-inserts",
    ],
    content: [
      { type: "h2", value: "Partnership Agreements" },
      {
        type: "paragraph",
        value:
          "ChinaPlas 2024 (Shanghai, 23–6 April) resulted in the signing of three co-engineering framework agreements with European [granulator](/products/granulator-blades) and [shredder](/products/twin-shaft-blades-recycling) OEMs. These agreements establish Sureay as the preferred blade development partner for next-generation machine platforms, with joint specification, prototyping, and qualification cycles built into the product development timeline.",
      },
      {
        type: "callout",
        value:
          "SCOPE: Co-engineering agreements cover custom blade geometry development, material grade co-selection, heat treatment protocol definition, and field service support during initial machine commissioning runs at end-customer sites.",
      },
      { type: "h2", value: "Technical Co-Development Program" },
      {
        type: "paragraph",
        value:
          "Each OEM agreement includes a 90-day prototype-to-qualification cycle: 30 days design and DFM review, 30 days first-article manufacture and CMM report, 30 days field trial under monitored operating conditions. Customer engineering teams have direct access to our CAD/CAM data and material traceability documentation throughout the program.",
      },
    ],
  },
  {
    id: "blade-manufacturing-process",
    tag: "INDUSTRY NEWS",
    date: "29.APR.2026",
    title:
      "From steel to finished products: understanding the entire manufacturing process of mechanical blades",
    excerpt:
      "A high-quality mechanical blade requires multiple precision processes from raw steel to finished product. Sureay breaks down the entire standard manufacturing process step by step — helping you understand exactly how our quality is built, and how to evaluate the true capability of any blade supplier.",
    image: "/images/news/laser-cutting.webp",
    readTime: "6 MIN",
    seoTitle:
      "Industrial Blade Manufacturing Process Guide",
    metaDescription:
      "Learn the complete manufacturing process of industrial mechanical blades — raw material inspection, heat treatment, precision grinding, and quality control — explained by Sureay blade engineers.",
    keywords:
      "blade manufacturing process, industrial blade production, heat treatment blades, precision grinding, HSS blade, Cr12MoV, blade quality control",
    relatedProductIds: [
      "rotary-slitter-knives",
      "paper-cutting-blades",
      "granulator-blades",
      "metal-shear-knives",
    ],
    content: [
      {
        type: "paragraph",
        value:
          "Behind every precision blade is a tightly controlled manufacturing chain. From the moment raw steel arrives at our facility to the moment a finished blade ships in VCI packaging, each step is governed by documented tolerances and inspection protocols. This article walks through the full process so you can see exactly where quality is built — and what to look for when evaluating suppliers.",
      },
      { type: "h2", value: "1. Raw material inspection" },
      {
        type: "paragraph",
        value:
          "Every production run begins with incoming material verification. Steel is checked for chemical composition, hardness, and surface condition before it enters the production line. Common materials include high-speed steel (HSS grades M2, M42), alloy tool steels (Cr12MoV, D2, DC53), and tungsten carbide composites. Skipping this step is the most common cause of inconsistent blade performance across a batch.",
      },
      { type: "h2", value: "2. Cutting and rough machining" },
      {
        type: "paragraph",
        value:
          "Steel coils or plates are cut to blank shape by stamping, laser cutting, or cold sawing depending on profile complexity and material thickness. Tight dimensional control at this stage is critical — micro-cracks or edge burrs introduced here can propagate through heat treatment and compromise the finished blade. For complex profiles, preliminary shaping is completed before the blank enters the heat treatment furnace.",
      },
      { type: "image", value: "/images/news/slitting-knives-set.webp" },
      { type: "h2", value: "3. Heat treatment (core process)" },
      {
        type: "paragraph",
        value:
          "Heat treatment defines the functional hardness and toughness of the blade. The process involves controlled austenitizing, quenching, and one or more tempering cycles to achieve the target hardness range — typically HRC 58–5 for HSS and tool steels, and HRC 89+ for tungsten carbide grades. Temperature uniformity across the load must be held to ±5 °C; deviation causes hardness gradients and warpage that cannot be corrected downstream.",
      },
      {
        type: "callout",
        value:
          "Quenching achieves maximum hardness through rapid cooling. Tempering follows immediately to relieve internal stress and restore toughness — preventing brittle fracture in service. Both steps are equally critical; quench without temper produces a hard but fragile blade.",
      },
      { type: "h2", value: "4. Precision grinding" },
      {
        type: "paragraph",
        value:
          "After heat treatment, the blade is ground to final geometry on surface grinders, cylindrical grinders, or CNC profile grinding centres. Flatness, parallelism, and thickness are controlled at the micron level. The quality of the ground surface directly determines cutting edge sharpness and service life — a blade with grinding chatter marks or heat checks will fail well before its theoretical wear limit.",
      },
      { type: "h2", value: "5. Precision machining and sharpening" },
      {
        type: "paragraph",
        value:
          "The cutting edge is ground to the specified bevel geometry — single-bevel, double-bevel, hollow-ground, or radius profile — depending on the application. Edge angle and symmetry control cutting resistance and edge retention. As a reference, guillotine blades for paper cutting typically use a bevel angle of 19°—3°. Final deburring and chamfering are carried out at this stage before inspection.",
      },
      { type: "image", value: "/images/news/slitting-blades-series.webp" },
      { type: "h2", value: "6. Testing and quality control" },
      {
        type: "paragraph",
        value:
          "Every blade is inspected for hardness, dimensional accuracy, and edge integrity. High-speed rotary blades — such as large circular slitter knives and log saw blades — additionally undergo dynamic balance testing to prevent vibration at operating speed. Non-conforming parts are quarantined and scrapped. Critical production batches ship with a full inspection report covering material certificate, hardness readings, and CMM dimensional data.",
      },
      { type: "h2", value: "7. Surface treatment and rust prevention" },
      {
        type: "paragraph",
        value:
          "Finished blades are cleaned, degreased, and treated against corrosion. Treatment options include rust-preventive oil, phosphating, PVD coating (TiN, TiAlN), or chrome plating depending on the application environment. For export shipments, we use vapour-phase corrosion inhibitor (VCI) packaging as standard — particularly important for ocean freight where humidity and salt air present a real corrosion risk.",
      },
      { type: "h2", value: "8. Packaging and shipping" },
      {
        type: "paragraph",
        value:
          "Blades are individually wrapped or set-packed, labelled with material grade, dimensions, hardness, and batch number for full traceability. Export cartons are reinforced to prevent collision damage in transit, and storage requirements are marked on the outer packaging. Each shipment includes a packing list and, where required, a material test certificate and inspection report.",
      },
      { type: "h2", value: "Conclusion: why the process matters" },
      {
        type: "paragraph",
        value:
          "A rigorous manufacturing process delivers three things: consistency across mass production batches, extended service life through optimised heat treatment and grinding (wear resistance improvements of 30–00% over uncontrolled processes are common), and full traceability from steel coil to finished product so any issue can be isolated and resolved quickly.",
      },
      {
        type: "callout",
        value:
          "Process flow: Steel — Cutting — Heat treatment — Rough grinding — Finish grinding — Edge sharpening — Inspection — Rust prevention — Packaging — Shipment",
      },
      { type: "h2", value: "Why choose Sureay?" },
      {
        type: "paragraph",
        value:
          "Sureay controls the full manufacturing chain in-house — from heat treatment furnaces to CNC profile grinding — without outsourcing critical processes. Our testing equipment includes hardness testers, optical projectors, and coordinate measuring machines, with material traceability maintained for every batch. With over 20 years focused exclusively on industrial blades, we serve the paper, recycling, metal processing, and food industries worldwide. If you have specific blade requirements or technical questions, contact us for full drawing-to-delivery technical cooperation.",
      },
    ],
  },

  {
    id: "coil-slitting-line-maintenance-guide",
    tag: "INDUSTRY NEWS",
    date: "07.MAY.2026",
    title: "The complete guide to coil slitting line maintenance",
    excerpt:
      "Most coil slitting line breakdowns are preventable. This guide covers daily operator checks, slitter knife and shear blade care, alignment, lubrication, and building a preventive maintenance schedule to maximize uptime.",
    image: "/images/news/coil-slitting-line.webp",
    readTime: "7 MIN",
    seoTitle:
      "Complete Guide to Coil Slitting Line Maintenance",
    metaDescription:
      "Learn how to prevent coil slitting line downtime with daily operator checks, slitter knife maintenance, guillotine shear blade care, and a structured preventive maintenance schedule.",
    keywords:
      "coil slitting line maintenance, slitter knife maintenance, guillotine shear blade care, circular slitter knives, preventive maintenance, industrial blade maintenance",
    relatedProductIds: ["metal-coil-slitting-knives", "metal-shear-knives"],
    content: [
      {
        type: "paragraph",
        value:
          "Unplanned downtime on a coil slitting line doesn't just halt production — it bleeds money. The good news? Most breakdowns are preventable with consistent maintenance.",
      },

      { type: "h2", value: "Know Your Line" },
      {
        type: "paragraph",
        value:
          "A typical slitting line includes the uncoiler, slitter head, tensioning system, recoiler, and guiding equipment. Weakness in any one component stresses the others, so maintenance must cover the full system.",
      },
      {
        type: "image",
        value: "/images/news/coil-slitting-line.webp",
      },

      { type: "h2", value: "Daily Operator Checks" },
      {
        type: "paragraph",
        value:
          "A five-minute walkthrough each shift catches small problems early. Inspect blade edges for chips or buildup, verify lubrication levels, clear metal debris from the slitter head area, and confirm the coil is tracking straight. Listen for unusual sounds — grinding or vibration often signals bearing wear or misalignment before visible damage appears.",
      },

      { type: "h2", value: "Slitter Knife Maintenance" },
      {
        type: "paragraph",
        value:
          "Your [circular slitter knives](/products/metal-coil-slitting-knives) are the most critical factor in cut quality. Resharpen when you see uniform edge wear, but replace blades with localized chipping or deep nicks. Watch for edge rounding (increasing burr on strips), material buildup on blade faces, and uneven wear patterns. Store blades vertically in slotted racks with rust-preventive oil — never stack them without separators.",
      },
      {
        type: "image",
        value: "/images/products/rotary-slitter-knives/metal-slitter-knives-02.webp",
      },

      { type: "h2", value: "Shear Blade Care" },
      {
        type: "paragraph",
        value:
          "[Guillotine shear blades](/products/metal-shear-knives) are often overlooked but equally important. Keep clearance properly set (typically 5–0% of material thickness) and adjust when switching gauges. Most blades have four usable edges — rotate to the next edge before sending for resharpening to maximize blade life.",
      },
      {
        type: "image",
        value: "/images/news/guillotine-shear-blades.webp",
      },

      { type: "h2", value: "Tension, Alignment, and Lubrication" },
      {
        type: "paragraph",
        value:
          "Misalignment causes uneven cuts, width tolerance failures, and accelerated blade wear. Check entry and exit guides, inspect rubber spacers on the arbor, and verify tension roller surfaces monthly. For lubrication, follow manufacturer intervals — grease bearings weekly on high-production lines and monitor coolant concentration regularly. Avoid over-lubricating, which can cause overheating or contaminate strip surfaces.",
      },

      { type: "h2", value: "Build a Preventive Schedule" },
      {
        type: "paragraph",
        value:
          "Don't run equipment until it breaks. Log every blade set's install date, tonnage processed, and resharpening cycles. This data helps you predict replacements before failure. Schedule weekly greasing, monthly alignment checks, and quarterly blade assessments.",
      },

      { type: "h2", value: "Better Tooling, Less Maintenance" },
      {
        type: "paragraph",
        value:
          "Precision-engineered tooling holds its edge longer and reduces stress across your entire line. At Sureay Machinery, our [circular slitter knives](/products/metal-coil-slitting-knives) and [guillotine shear blades](/products/metal-shear-knives) are built for zero-burr performance and extended service life — so you spend less time maintaining and more time producing.",
      },
      {
        type: "callout",
        value:
          "[Contact us](/contact) to find the right tooling for your line.",
      },
    ],
  },
];

export const SORTED_DISPATCHES = sortDispatchesByDate(ALL_DISPATCHES);

const DISPATCH_AUTHOR_BY_ID: Record<string, DispatchAuthor> = {
  "blade-manufacturing-process": "lynn",
  "custom-metal-shear-blades-batch-production": "lynn",
  "facility-expansion-phase-iii": "lynn",
  "k-show-2024-recycling-knives": "lynn",
  "iso-9001-recertification-2024": "lynn",
  "chinaplas-2024-oem-partnerships": "lynn",
  "d2-vs-skd11-vs-tungsten-carbide": "Eric",
  "shredder-metallurgy-maximizes-recycling-yields": "Eric",
  "high-hardness-metal-shear-guide": "Eric",
  "cryogenic-treatment-alloy-blades": "Eric",
  "tin-vs-chrome-coating": "Eric",
  "log-saw-blade-bevel-angles": "Eric",
  "melt-filter-scraper-blade-daily-maintenance-checklist": "Eric",
  "alloy-vs-hss-paper-cutter-blades": "Eric",
  "coil-slitting-line-maintenance-guide": "Eric",
};

// ── Helper Functions ──────────────────────────────────────────────────────────

export function getDispatchAuthor(id: string): DispatchAuthor {
  return DISPATCH_AUTHOR_BY_ID[id] ?? "Eric";
}

/** All non-featured dispatches, for the archive grid. */
export function getAllDispatches(): DispatchArticle[] {
  return SORTED_DISPATCHES.filter(d => !d.isFeatured);
}

/** The single featured dispatch (first one flagged, or first in list). */
export function getFeaturedDispatch(): DispatchArticle {
  return ALL_DISPATCHES.find(d => d.isFeatured) ?? ALL_DISPATCHES[0];
}

/** Look up any dispatch by ID (including featured). */
export function getDispatchById(id: string): DispatchArticle | undefined {
  return ALL_DISPATCHES.find(d => d.id === id);
}

/** Returns the previous and next dispatches relative to `currentId`.
 *  Traverses the full list (featured + archive), wrapping at boundaries. */
export function getAdjacentDispatches(currentId: string): {
  prev: DispatchArticle | null;
  next: DispatchArticle | null;
} {
  const idx = SORTED_DISPATCHES.findIndex(d => d.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? SORTED_DISPATCHES[idx - 1] : null,
    next:
      idx < SORTED_DISPATCHES.length - 1 ? SORTED_DISPATCHES[idx + 1] : null,
  };
}
