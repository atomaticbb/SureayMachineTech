/**
 * news.ts — Corporate Dispatches Data Layer
 * Single source of truth for all news/dispatch articles.
 */

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface NewsContent {
  type: "paragraph" | "h2" | "h3" | "callout" | "image";
  value: string;
}

export interface DispatchArticle {
  id:          string;
  tag:         string;
  date:        string;
  title:       string;
  excerpt:     string;
  image:       string;
  readTime:    string;
  isFeatured?: boolean;
  content:     NewsContent[];
}

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

function sortDispatchesByDate(dispatches: DispatchArticle[]): DispatchArticle[] {
  return [...dispatches].sort(
    (left, right) => parseDispatchDate(right.date) - parseDispatchDate(left.date)
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const ALL_DISPATCHES: DispatchArticle[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id:       "d2-vs-skd11-vs-tungsten-carbide",
    tag:      "PRODUCT GUIDE",
    date:     "16.MAR.2026",
    title:    "D2 VS SKD-11 VS TUNGSTEN CARBIDE: A COMPLETE GUIDE TO CHOOSING INDUSTRIAL BLADE MATERIALS",
    excerpt:  "Compare D2, SKD-11, and tungsten carbide industrial blade materials. Learn about hardness, wear resistance, toughness, cost, and best applications for industrial cutting knives.",
    image:    "/images/news/choosing-industrial-blades-materials.webp",
    readTime: "8 MIN",
    isFeatured: true,
    content: [
      { type: "h2",       value: "Introduction" },
      { type: "paragraph", value: "Choosing the correct material for industrial blades is critical for production efficiency, blade lifespan, and maintenance costs. Three of the most commonly used materials in industrial cutting knives are D2 tool steel, SKD-11 tool steel, and tungsten carbide. Each material has unique advantages in terms of hardness, wear resistance, toughness, and machining cost." },
      { type: "paragraph", value: "This guide helps engineers and procurement teams select the most suitable material for slitter knives, shredder blades, granulator knives, and recycling cutting tools." },
      { type: "image",     value: "/images/news/a-complete-guide-to-choosing-industrial-blad-materials.webp" },

      { type: "h2",       value: "D2 Tool Steel" },
      { type: "paragraph", value: "D2 is a high-carbon, high-chromium cold-work tool steel widely used in industrial blades. It offers a hardness range of 55–62 HRC with excellent wear resistance, good dimensional stability, and easy regrindability — making it cost-effective for most applications." },
      { type: "callout",   value: "D2 TYPICAL APPLICATIONS: Slitter knives, paper cutting blades, plastic cutting knives, industrial shearing knives." },

      { type: "h2",       value: "SKD-11 Tool Steel" },
      { type: "paragraph", value: "SKD-11 is the Japanese JIS standard equivalent to D2. Properties are very similar but SKD-11 often shows slightly improved hardenability, toughness, and wear resistance consistency. It reaches 56–61 HRC and is favored in precision cutting knives, die cutting tools, and industrial machine blades where tighter tolerances are required." },
      { type: "callout",   value: "SKD-11 VS D2: While chemically near-identical, SKD-11 benefits from stricter JIS refining standards, resulting in finer carbide distribution and marginally better impact toughness under cyclic loading." },

      { type: "h2",       value: "Tungsten Carbide" },
      { type: "paragraph", value: "Tungsten carbide is a sintered composite material made of tungsten carbide particles bonded with cobalt. It is significantly harder than tool steel, reaching 1500–2500 HV. It provides extremely high wear resistance and excellent edge retention, but has low impact resistance and higher manufacturing cost." },
      { type: "callout",   value: "TUNGSTEN CARBIDE APPLICATIONS: Recycling shredder knives, abrasive material cutting, glass fiber or composite cutting, high-wear environments where blade longevity outweighs regrinding flexibility." },

      { type: "h2",       value: "Material Property Comparison" },
      { type: "paragraph", value: "Hardness — D2: 55–62 HRC | SKD-11: 56–61 HRC | Tungsten Carbide: 1500–2500 HV. Wear Resistance — D2: High | SKD-11: High | Carbide: Extremely High. Toughness — D2: Medium | SKD-11: Medium-High | Carbide: Low. Regrinding — D2: Easy | SKD-11: Easy | Carbide: Difficult. Cost — D2: Medium | SKD-11: Medium-High | Carbide: High. Impact Resistance — D2: Moderate | SKD-11: Moderate | Carbide: Low." },

      { type: "h2",       value: "Material Selection Guide" },
      { type: "h3",       value: "High Wear Applications" },
      { type: "paragraph", value: "Best choice: Tungsten Carbide. Ideal for plastic recycling shredders, fiberglass cutting, and abrasive materials. Advantages include extremely long blade life, reduced downtime, and consistent cutting performance. The primary limitation is higher cost and fragility under impact loads." },

      { type: "h3",       value: "General Industrial Cutting" },
      { type: "paragraph", value: "Best choice: D2 or SKD-11. Suitable for paper converting lines, plastic sheet cutting, and packaging materials. These steels offer good wear resistance, easy regrinding, and cost-effective total ownership. Most industrial cutting operations fall into this category." },

      { type: "h3",       value: "Applications with Impact Loads" },
      { type: "paragraph", value: "Best choice: SKD-11 or modified tool steels. When processing mixed recycling waste or materials with metal contamination risk, tool steels provide significantly better toughness and shock resistance than carbide. Choosing carbide in high-impact scenarios can lead to unexpected blade breakage." },

      { type: "h2",       value: "Blade Lifespan Comparison" },
      { type: "callout",   value: "RELATIVE BLADE LIFESPAN — D2 Steel: 6/10 | SKD-11 Steel: 7/10 | Tungsten Carbide: 10/10. Measured under standardized abrasive cutting conditions. Actual lifespan varies by application, feed rate, and material being processed." },

      { type: "h2",       value: "Maintenance Strategy" },
      { type: "paragraph", value: "Proper maintenance significantly improves blade life regardless of material choice. Key practices include scheduled regrinding (tool steel blades can typically be re-sharpened multiple times, reducing replacement cost and maintaining cutting precision), material contamination control (install magnetic separators and metal detectors to prevent metal fragments from damaging blades), and effective cooling and lubrication (reduces thermal stress, prevents edge deformation, and improves cutting stability)." },

      { type: "h2",       value: "Common Misconceptions" },
      { type: "paragraph", value: "\"Harder is always better\" — Not necessarily. Higher hardness often means lower toughness, increasing fracture risk. The optimal material balances hardness against the specific impact and fatigue demands of your application." },
      { type: "paragraph", value: "\"Carbide works for every application\" — Carbide performs poorly in high-impact environments. Selecting carbide for the wrong scenario leads to unexpected blade breakage and higher total cost than a well-chosen tool steel." },

      { type: "h2",       value: "Quick Selection Checklist" },
      { type: "paragraph", value: "Before ordering industrial blades, consider: What material is being cut? Is the environment abrasive? Is there risk of metal contamination? How important is blade regrinding? What is the acceptable downtime cost? Answering these questions helps determine the optimal blade material for your operation." },

      { type: "h2",       value: "Conclusion" },
      { type: "paragraph", value: "Selecting the right blade material balances durability, cost, maintenance, and cutting precision. Use tungsten carbide for high-wear environments where longevity justifies the investment. Use D2 or SKD-11 for most industrial cutting applications where regrindability and cost matter. Always consider impact loads before selecting carbide — a well-chosen material can significantly reduce production downtime and operational cost." },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id:       "shredder-metallurgy-maximizes-recycling-yields",
    tag:      "TECH INNOVATION",
    date:     "30.MAR.2026",
    title:    "THE RECYCLING BOOM: HOW ADVANCED SHREDDER METALLURGY MAXIMIZES MECHANICAL RECYCLING YIELDS",
    excerpt:  "Discover how upgrading your shredder blades from standard D2 to DC53 or H13 tool steel can prevent catastrophic blade failure, survive tramp metal impacts, and maximize your recycling plant's uptime.",
    image:    "/images/news/shredder-machine-working.webp",
    readTime: "7 MIN",
    content: [
      { type: "paragraph", value: "In the mechanical recycling industry, profitability isn't just about the volume of material you process; it is strictly measured by continuous machine uptime. As global mandates push for higher percentages of recycled plastics and metals, recycling facilities are processing unprecedented volumes of Municipal Solid Waste (MSW), industrial scrap, and end-of-life tires." },
      { type: "paragraph", value: "But there is a brutal reality on the tipping floor: waste is never clean." },
      { type: "paragraph", value: "When processing mixed bales of plastics or wood, shredder rotors inevitably encounter \"tramp metal\" — stray steel bolts, engine blocks, or hidden rebar. When a high-speed shredder blade hits a solid steel inclusion, the kinetic energy is massive. If your blades are made from the wrong metallurgical grade, they won't just dull; they will catastrophically shatter, destroying the rotor shaft and halting your entire line for days." },
      { type: "paragraph", value: "To maximize yields and survive the chaos of modern recycling, plant managers must look beyond basic blade geometry and understand the science of shredder metallurgy." },

      { type: "h2",       value: "The Brittle Trap: Why Standard D2 Fails in Mixed Waste" },
      { type: "paragraph", value: "For decades, D2 (1.2379) cold-work tool steel has been the default choice for industrial cutting. Packed with 1.5% Carbon and 12% Chromium, D2 hardens beautifully to HRC 60–62, offering fantastic wear resistance when cutting clean, predictable materials like paper or pure plastic films." },
      { type: "paragraph", value: "However, D2 achieves this hardness through the formation of massive, brittle chromium carbides in its microstructure. In a heavy-duty twin-shaft shredder application, high hardness equals low impact toughness. When a D2 hook blade bites into a hidden steel bolt, the brittle chromium carbides act as stress-concentration points. The blade snaps, sending broken shards of hardened steel through the cutting chamber, often destroying adjacent knives and the bed anvil in a domino effect." },
      { type: "callout",  value: "For clean, post-industrial plastic regrind (using granulators), D2 remains a cost-effective choice. But for primary breakdown shredders facing unpredictable MSW, D2 is a ticking time bomb." },

      { type: "h2",       value: "Upgrading the Arsenal: DC53 and H13 Tool Steels" },
      { type: "paragraph", value: "To conquer extreme impact environments, elite blade manufacturers shift the metallurgical focus from pure \"hardness\" to \"transverse rupture strength\" (toughness)." },
      { type: "h3",       value: "DC53: The Superior Cold-Work Alternative" },
      { type: "paragraph", value: "DC53 is an advanced modification of standard D2. Through a refined alloy composition and tighter control over the steel-making process, DC53 eliminates the massive carbide structures found in D2. Heat-treated to HRC 60, DC53 maintains the excellent wear resistance of D2 but delivers double the impact toughness. It is the ultimate choice for heavy-duty single-shaft shredder inserts processing tough, thick-walled plastics, copper cables, and tires where moderate shock loads are expected." },
      { type: "h3",       value: "H13 (1.2344): The Shock-Absorbing King" },
      { type: "paragraph", value: "Originally developed for hot-forging dies, H13 hot-work tool steel is the undisputed champion of the scrap yard. It contains lower carbon (0.40%) and utilizes a chromium-molybdenum-vanadium matrix. Hardened to a slightly lower HRC 52–56, H13 possesses massive core toughness. When an H13 twin-shaft shredder blade hits a solid steel engine block, the blade might dent or deform elastically, but it will not shatter. This shock-absorbing characteristic saves the shredder's gearbox, hexagonal shaft, and bearings from catastrophic failure." },

      { type: "h2",       value: "The Ultimate Hybrid: Hardfacing and Surface Armor" },
      { type: "paragraph", value: "What if you need the extreme shock absorption of H13, but the wear resistance of a carbide blade to process highly abrasive materials like glass-fiber-reinforced plastics or sand-covered agricultural films?" },
      { type: "paragraph", value: "The answer is Hardfacing (Surface Welding). Leading tooling manufacturers take a tough, shatter-proof core (like H13 or customized alloy steel) and use PTA (Plasma Transferred Arc) welding to overlay a super-hard armor matrix — such as Stellite or Tungsten Carbide grit — directly onto the cutting hooks and wear faces." },
      { type: "callout",  value: "BIMETALLIC CONSTRUCTION: A blade that absorbs explosive impacts internally, while resisting severe abrasive wear externally — the holy grail of shredding." },

      { type: "h2",       value: "Maximizing Your Shredder's Uptime" },
      { type: "paragraph", value: "Every recycling line has a unique \"diet.\" Using a one-size-fits-all blade material guarantees you are either overpaying for unnecessary tooling or bleeding money through excessive maintenance downtime." },
      { type: "paragraph", value: "At Sureay, we engineer our Single Shaft Shredder Blades and Twin Shaft Shredder Knives to perfectly match your specific waste stream. From DC53 concave inserts for high-throughput plastic reduction to massive H13 hook blades for heavy metal and tire processing, our vacuum heat-treatment protocols ensure your tooling survives the most violent impacts your facility can throw at it." },
      { type: "paragraph", value: "Don't let tramp metal dictate your production schedule. Contact our metallurgical engineering team today for a free wear-analysis of your current shredder blades, and discover how upgrading your alloy can transform your MTBR (Mean Time Between Replacements) from weeks into months." },
    ],
  },
  {
    id:         "facility-expansion-phase-iii",
    tag:        "COMPANY UPDATES",
    date:       "24.OCT.2024",
    title:      "GLOBAL FACILITY EXPANSION PHASE III",
    excerpt:    "Commissioning of our new 5,000 m² high-precision CNC grid expands heavy-duty shredder blade production capacity by 40%, establishing Sureay's largest single-facility output in its 16-year operational history.",
    image:      "/images/about/factory-00.webp",
    readTime:   "5 MIN",
    content: [
      { type: "h2",       value: "Background & Rationale" },
      { type: "paragraph", value: "Since the original Ma'anshan facility commissioning in 2008, Sureay Machinery has operated under a constrained floor footprint of 10,000 m². The structural limitation reached critical threshold in Q3 2023, when incoming OEM order volume exceeded single-shift throughput capacity by 23%. A systematic capacity audit — conducted jointly by our operations and metallurgical engineering teams — identified three bottleneck nodes: raw stock pre-treatment staging, 5-axis CNC queue depth, and post-heat-treatment CMM throughput." },
      { type: "paragraph", value: "Phase III expansion was ratified by executive management in November 2023, with groundbreaking commencing January 2024. The investment targets a net increase of 5,000 m² of temperature-controlled precision manufacturing space, directly adjacent to the existing CNC grid." },
      { type: "callout",   value: "CAPACITY PROJECTION: Phase III commissioning is forecast to increase annual blade output by 40%, from 18,000 units/year to 25,200 units/year at full operational load." },
      { type: "h2",       value: "Phase III Infrastructure" },
      { type: "paragraph", value: "The new wing incorporates six Mazak VARIAXIS i-800 5-axis machining centers, each rated for ±0.002 mm positional repeatability under continuous-duty thermal load. Coolant management has been upgraded to a closed-loop chiller system maintaining ±0.5°C spindle temperature stability — a critical variable for maintaining dimensional consistency across long-run blade batches." },
      { type: "paragraph", value: "Two additional Ipsen TITAN N vacuum heat treatment furnaces have been installed, expanding heat cycle capacity by 60%. Each furnace chamber accommodates batch loads up to 800 kg, enabling simultaneous processing of full production runs for high-volume OEM orders without queue interruption." },
      { type: "h3",       value: "Metrology Expansion" },
      { type: "paragraph", value: "A Hexagon Global Silver CMM with 3.0 m × 2.5 m measurement volume has been added to the quality bay, supplementing the existing Renishaw system. Both units are now networked to a centralized metrology database, providing real-time dimensional trend analysis and automated non-conformance flagging for every production batch." },
      { type: "h2",       value: "Production Capacity Metrics" },
      { type: "callout",   value: "OPERATIONAL DATA — CNC spindle utilization: Previous 71% → Phase III target 85%. Heat treatment throughput: Previous 1,200 kg/week → Phase III 1,920 kg/week. CMM inspection throughput: Previous 340 parts/day → Phase III 520 parts/day." },
      { type: "paragraph", value: "The expanded CNC grid enables parallel scheduling across product families — shredder blade runs can now proceed concurrently with log saw blade batches without resource contention. This architectural separation of machine types by product vertical minimizes setup changeover time and preserves dedicated tooling inventories per product line." },
      { type: "h2",       value: "Quality Protocol Integration" },
      { type: "paragraph", value: "Phase III operations are governed under the existing ISO 9001:2015 QMS framework, with scope extension formally filed with our SGS certification body in August 2024. All Phase III equipment has been incorporated into the calibration and preventive maintenance schedule, with baseline capability studies (Cpk ≥ 1.67) completed on all new machining centers prior to production release." },
      { type: "paragraph", value: "Material traceability has been extended to full heat lot-level tracking across the new furnace units, ensuring end-to-end documentation from incoming steel certification to outbound dimensional report — maintaining unchanged protocol integrity from the legacy facility." },
      { type: "h2",       value: "Deployment Timeline" },
      { type: "paragraph", value: "Civil construction completed on schedule in June 2024. Equipment installation and utility commissioning ran July–September 2024. Production qualification runs commenced October 2024, with full commercial capacity release scheduled for Q1 2025. All current OEM delivery commitments are maintained through the legacy facility during the transition window." },
    ],
  },

  // ── Archive Grid ──────────────────────────────────────────────────────────
  {
    id:       "high-hardness-metal-shear-guide",
    tag:      "PRODUCT GUIDE",
    date:     "11.MAR.2026",
    title:    "WHY CHOOSE HIGH-HARDNESS METAL SHEAR KNIVES?",
    excerpt:  "Enhance precision and longevity in heavy-duty fabrication. High-hardness shear blades deliver exceptional durability, accuracy, and operational efficiency in industrial metal cutting applications.",
    image:    "/images/products/granulator-blades/metal-shear-blades-02.webp",
    readTime: "7 MIN",
    content: [
      { type: "h2",       value: "Introduction: The Stakes in Industrial Metal Cutting" },
      { type: "paragraph", value: "In industries that require precision metal cutting, durability and efficiency are non-negotiable. High-hardness shear blades stand out for their ability to handle tough materials like stainless steel and hot-rolled billets while maintaining extreme sharpness and longevity. By choosing the right blade, steel service centers and fabrication plants can significantly reduce downtime, lower cost-per-cut, and optimize their entire business operation." },

      { type: "h2",       value: "What Are High-Hardness Metal Shear Knives?" },
      { type: "paragraph", value: "High-hardness shear blades are a class of heavy-duty industrial knives designed to maintain a sharp, durable edge under continuous, high-stress use. Unlike standard off-the-shelf blades, Sureay's Metal Shear Knives are forged from premium tool steels and advanced alloys—such as 9CrSi, Cr12MoV (D2 equivalent), and H13." },
      { type: "paragraph", value: "Through strict in-house vacuum heat treatment, we achieve an optimal Rockwell hardness rating, typically ranging from 58 to 62 HRC depending on the specific application. This sophisticated hardening process involves both precise heating and quenching to achieve the perfect balance between absolute hardness and impact toughness. The result? A blade that is highly resistant to wear, deformation, and edge chipping, minimizing maintenance and ensuring uninterrupted production." },

      { type: "h2",       value: "Core Applications: Matching the Blade to the Extreme" },
      { type: "paragraph", value: "High-hardness cutting blades are indispensable in numerous heavy industries due to their resilience and precision. At Sureay, we categorize our metal shear knives based on the exact thermal and mechanical stress of your operation:" },
      { type: "h3",       value: "Cold-Rolled & Mild Steel Shearing (Standard Duty)" },
      { type: "paragraph", value: "Utilizing high-carbon steels like T10 and 65Mn (57-59 HRC), these blades are incredibly cost-effective for shearing standard A3 plates and general metal recycling." },
      { type: "h3",       value: "Stainless & Medium Plate Shearing (Heavy Duty)" },
      { type: "paragraph", value: "Cutting stainless steel requires extraordinary wear resistance. Our Cr12MoV and 6CrW2Si blades (58-62 HRC) excel in metalworking applications by maintaining a sharp edge over prolonged use." },
      { type: "h3",       value: "Hot-Rolled Billet Shearing (Extreme Temp)" },
      { type: "paragraph", value: "Engineered for heavy steel mills, our H13 and LD alloy blades feature extreme 'Red Hardness.' They retain their structural integrity and resist annealing even when shearing hot slabs at extreme temperatures." },

      { type: "h2",       value: "Key Benefits of Upgrading to High-Hardness Blades" },
      { type: "paragraph", value: "Investing in Sureay's high-hardness shear knives offers transformative benefits to industrial operations:" },
      { type: "callout",   value: "ENHANCED DURABILITY: High-hardness shear blades are far more wear-resistant, meaning fewer blade changes and longer production runs without interruptions." },
      { type: "paragraph", value: "Superior Cutting Precision: With their ability to hold a sharp edge, these blades provide clean, burr-free cuts across thick alloy plates. This precision reduces material waste and guarantees edge straightness." },
      { type: "paragraph", value: "Reduced Maintenance Costs: The longevity and resilience of high-hardness blades directly lower your maintenance overhead. In heavy-use environments, studies estimate that high-hardness blades can reduce annual maintenance costs by up to 40%." },

      { type: "h2",       value: "How to Choose the Right Shear Blade" },
      { type: "paragraph", value: "Selecting the exact match for your mechanical or hydraulic guillotine shear involves careful consideration of several factors:" },
      { type: "paragraph", value: "Material Compatibility: Matching the blade material to the specific metal being cut is essential. Do not use a standard T10 carbon blade to cut thick stainless steel; instead, opt for Cr12MoV." },
      { type: "paragraph", value: "Hardness vs. Toughness: While high hardness increases wear resistance, excessive hardness can make a blade brittle. Sureay engineers expertly balance this by recommending 58-62 HRC for heavy-duty applications, ensuring impact resistance without chipping." },
      { type: "paragraph", value: "Edge Geometry: Depending on your machine setup, blades can be manufactured with 1, 2, or 4 indexable cutting edges, effectively multiplying the blade's service lifespan." },

      { type: "h2",       value: "Maintenance Tips for Extending Blade Life" },
      { type: "paragraph", value: "To maximize your ROI on high-hardness shear blades, proper maintenance is crucial:" },
      { type: "callout",   value: "DYNAMIC CLEARANCE CONTROL: Always adjust the horizontal gap between the upper and lower blades based on the thickness of the metal plate. Incorrect clearance is the #1 cause of edge chipping." },
      { type: "paragraph", value: "Use Appropriate Materials Only: Cutting materials beyond the blade's design parameters (e.g., cutting titanium with a mild steel blade) can accelerate wear and lead to catastrophic damage." },
      { type: "paragraph", value: "Timely Sharpening: Regular inspections and scheduled sharpening at the right intervals ensure that blades remain efficient and reduce the tonnage force required from your machine motor." },

      { type: "h2",       value: "Conclusion: Partner with Sureay" },
      { type: "paragraph", value: "High-hardness shear blades offer unparalleled durability, precision, and cost savings for heavy metal fabrication. Whether you operate in shipbuilding, aviation, structural steel, or a dedicated steel service center, upgrading your guillotine shears with exact-match OEM cutting solutions will guarantee continuous, peak performance." },
      { type: "paragraph", value: "Ready to equip your facility with the ultimate cutting edge? Contact the Sureay engineering team today for a technical audit and custom blade quotation." },
    ],
  },
  {
    id:       "cryogenic-treatment-alloy-blades",
    tag:      "TECH INNOVATION",
    date:     "12.SEP.2024",
    title:    "ADVANCED CRYOGENIC TREATMENT FOR ALLOY BLADES",
    excerpt:  "Technical whitepaper on how deep cryogenic processing (-196°C) enhances wear resistance in plastic recycling applications.",
    image:    "/images/process/heat-treatment.webp",
    readTime: "4 MIN",
    content: [
      { type: "h2",       value: "Metallurgical Basis" },
      { type: "paragraph", value: "Conventional quench-and-temper heat treatment leaves 10–20% retained austenite in high-alloy tool steels such as D2, M2, and the CPM series. This metastable phase reduces hardness ceiling and accelerates micro-spalling at the cutting edge under cyclic impact loading — a primary failure mode in plastic film and pipe recycling applications." },
      { type: "paragraph", value: "Deep cryogenic processing (DCP) at -196°C transforms residual austenite to martensite, increasing carbide density at the matrix level. Independent laboratory analysis of DCP-treated D2 specimens shows a 12–18% improvement in wear resistance (ASTM G65 dry-sand rubber-wheel test) versus conventionally treated controls." },
      { type: "callout",   value: "TEST DATA: D2 blade, conventional treatment — wear scar depth 0.42 mm after 6,000 revolution test cycle. D2 blade, DCP post-treatment — wear scar depth 0.36 mm. Improvement: 14.3% reduction in material loss at equivalent load and abrasion conditions." },
      { type: "h2",       value: "Process Protocol" },
      { type: "paragraph", value: "Post-quench, blades are placed in a programmable cryogenic chamber and cooled at a controlled rate of 3°C/min to -196°C. Soak duration is minimum 24 hours. Parts are returned to ambient temperature at 2°C/min to prevent thermal shock cracking. A final low-temperature temper cycle (175°C, 2 hours) follows to relieve transformation stresses." },
      { type: "h2",       value: "Application Scope" },
      { type: "paragraph", value: "DCP is recommended for blades operating in abrasive-dominant environments: HDPE/PP pipe granulation, wet-process tissue log sawing, and multi-shaft recycling of glass-fibre-reinforced polymers. For impact-dominant applications (steel scrap shredding), conventional treatment with toughness-optimized tempering remains the preferred specification." },
    ],
  },
  {
    id:       "k-show-2024-recycling-knives",
    tag:      "EXHIBITIONS",
    date:     "05.AUG.2024",
    title:    "K-SHOW 2024: NEXT-GEN RECYCLING KNIVES DEPLOYED",
    excerpt:  "Live demonstrations of our aggressively angled hook-tooth profiles engineered for high-throughput single shaft shredders.",
    image:    "/images/process/cnc-precision-grinding.webp",
    readTime: "3 MIN",
    content: [
      { type: "h2",       value: "Exhibition Overview" },
      { type: "paragraph", value: "K 2024 (Düsseldorf, October 16–23) marked Sureay Machinery's third consecutive appearance at the world's leading plastics and rubber trade fair. Booth 12C34 in Hall 12 hosted demonstration units for our new hook-tooth single-shaft shredder blade series, purpose-built for throughput rates exceeding 8 t/h on post-consumer LDPE film bales." },
      { type: "callout",   value: "VISITOR DATA: 340 qualified engineering contacts registered at the Sureay booth across 8 exhibition days. 28 active RFQ processes initiated within 30 days of exhibition close." },
      { type: "h2",       value: "Hook-Tooth Profile Engineering" },
      { type: "paragraph", value: "The new geometry features a 15° positive rake angle with a sharpened secondary land profile, reducing initial bite force while maintaining edge stability over extended run cycles. Compared to the outgoing flat-top profile, lab trials on 6 mm HDPE sheet show a 22% reduction in motor current draw at equivalent feed rate — directly translating to energy cost savings for the end operator." },
    ],
  },
  {
    id:       "tin-vs-chrome-coating",
    tag:      "TECH INNOVATION",
    date:     "28.JUL.2024",
    title:    "SURFACE METALLURGY: TIN VS. CHROME COATING",
    excerpt:  "A comparative metrology report on blade surface friction coefficients in high-humidity tissue paper converting environments.",
    image:    "/images/common/Quality-Inspection.webp",
    readTime: "6 MIN",
    content: [
      { type: "h2",       value: "Test Objective" },
      { type: "paragraph", value: "Tissue log saw blades operating in wet environments (drum moisture content 8–12%) are subject to adhesive wear from cellulose fibre accumulation at the cutting edge, and corrosive attack from free chlorine in process water. This study benchmarks PVD-deposited TiN and hard chrome coatings against uncoated D2 baseline across friction, adhesion, and service-life metrics." },
      { type: "callout",   value: "TEST PARAMETERS: Substrate D2 tool steel, 62 HRC. Log diameter 280 mm. Speed 2,800 RPM. Coolant: 0.5% synthetic emulsion. Test duration: 500 operating hours per sample group (n=3 per coating type)." },
      { type: "h2",       value: "Results: TiN Coating" },
      { type: "paragraph", value: "TiN-coated blades demonstrated a 31% reduction in friction coefficient (μ = 0.22 vs. 0.32 baseline) at test initiation. Coating adhesion remained intact for the full 500-hour test cycle with no delamination detected by SEM cross-section analysis at 250h and 500h intervals. Edge recession rate: 0.008 mm/100h vs. 0.019 mm/100h uncoated." },
      { type: "h2",       value: "Results: Hard Chrome Coating" },
      { type: "paragraph", value: "Hard chrome showed comparable friction reduction (μ = 0.24) at test start, but exhibited micro-cracking at the coating-substrate interface from 180 hours onward due to hydrogen embrittlement under cyclic loading. Edge recession rate climbed to 0.015 mm/100h post-200h, approaching the uncoated baseline." },
      { type: "callout",   value: "RECOMMENDATION: TiN PVD coating is the preferred specification for tissue log saw blades in high-humidity, chlorinated-water environments. Hard chrome is not recommended for cyclic-impact cutting applications regardless of substrate hardness." },
      { type: "h2",       value: "Application Guidelines" },
      { type: "paragraph", value: "TiN coating adds approximately 3–4 μm to nominal blade dimensions. Specifying engineers should account for this in mounting clearance calculations. Re-coating after sharpening is available as a service and restores full friction and corrosion performance with no dimensional penalty beyond standard re-grind stock removal." },
    ],
  },
  {
    id:       "iso-9001-recertification-2024",
    tag:      "COMPANY UPDATES",
    date:     "14.JUN.2024",
    title:    "ISO 9001:2015 RE-CERTIFICATION COMPLETED",
    excerpt:  "Zero non-conformances reported during the latest external audit of our Ma'anshan manufacturing facility.",
    image:    "/images/about/factory.webp",
    readTime: "2 MIN",
    content: [
      { type: "h2",       value: "Audit Scope" },
      { type: "paragraph", value: "The triennial ISO 9001:2015 surveillance audit was conducted by SGS Group auditors on 10–11 June 2024, covering the full scope of the Ma'anshan Quality Management System: design and development, production, inspection and testing, internal audit, management review, and corrective action processes." },
      { type: "callout",   value: "AUDIT RESULT: Zero major non-conformances. Zero minor non-conformances. Three opportunities for improvement noted (non-binding). Certificate validity extended to June 2027." },
      { type: "paragraph", value: "Three opportunities for improvement identified in the audit report relate to digital traceability record retention, inter-departmental APQP communication cadence, and calibration interval review scheduling. All three are under evaluation by the Quality Management team for implementation priority." },
    ],
  },
  {
    id:       "log-saw-blade-bevel-angles",
    tag:      "TECH INNOVATION",
    date:     "02.MAY.2024",
    title:    "OPTIMIZING BEVEL ANGLES FOR LOG SAW BLADES",
    excerpt:  "Engineering guidelines for balancing edge sharpness and core toughness to prevent blade deflection during high-speed cutting.",
    image:    "/images/products/blades/tissue-log-saw-blades-02.webp",
    readTime: "4 MIN",
    content: [
      { type: "h2",       value: "The Geometry-Performance Trade-off" },
      { type: "paragraph", value: "Log saw blade geometry is governed by three competing demands: edge sharpness (low included angle), deflection resistance (blade section thickness and crown profile), and tooth durability (sufficient included angle to resist chipping under cyclic impact from log cores and wrappers). Industry standard bevel angles range from 28° to 42° depending on log diameter, rotation speed, and cellulose density." },
      { type: "callout",   value: "GUIDELINE: For tissue logs ≤280 mm diameter at speeds above 2,500 RPM, a 32° included angle with 0.15 mm secondary bevel is the recommended starting specification. Increase to 36° for logs containing recycled fibre content >30%." },
      { type: "h2",       value: "Crown Profile and Deflection" },
      { type: "paragraph", value: "Blade deflection mid-cut introduces skew error in slice dimension tolerance and generates lateral loading that accelerates bearing wear in the saw spindle. The crown profile (radial relief from centre to tooth) must be within ±0.03 mm of nominal across the full blade diameter. Crown verification is performed on our Vollmer VGrind optical measurement station post-grind." },
    ],
  },
  {
    id:       "chinaplas-2024-oem-partnerships",
    tag:      "EXHIBITIONS",
    date:     "18.APR.2024",
    title:    "CHINAPLAS DEBRIEF: OEM CO-ENGINEERING INITIATIVES",
    excerpt:  "Strategic partnerships formed with three top-tier European granulator manufacturers for custom blade geometry development.",
    image:    "/images/common/industrial-waste-1.webp",
    readTime: "3 MIN",
    content: [
      { type: "h2",       value: "Partnership Agreements" },
      { type: "paragraph", value: "ChinaPlas 2024 (Shanghai, 23–26 April) resulted in the signing of three co-engineering framework agreements with European granulator and shredder OEMs. These agreements establish Sureay as the preferred blade development partner for next-generation machine platforms, with joint specification, prototyping, and qualification cycles built into the product development timeline." },
      { type: "callout",   value: "SCOPE: Co-engineering agreements cover custom blade geometry development, material grade co-selection, heat treatment protocol definition, and field service support during initial machine commissioning runs at end-customer sites." },
      { type: "h2",       value: "Technical Co-Development Program" },
      { type: "paragraph", value: "Each OEM agreement includes a 90-day prototype-to-qualification cycle: 30 days design and DFM review, 30 days first-article manufacture and CMM report, 30 days field trial under monitored operating conditions. Customer engineering teams have direct access to our CAD/CAM data and material traceability documentation throughout the program." },
    ],
  },
];

export const SORTED_DISPATCHES = sortDispatchesByDate(ALL_DISPATCHES);

// ── Helper Functions ──────────────────────────────────────────────────────────

/** All non-featured dispatches, for the archive grid. */
export function getAllDispatches(): DispatchArticle[] {
  return SORTED_DISPATCHES.filter((d) => !d.isFeatured);
}

/** The single featured dispatch (first one flagged, or first in list). */
export function getFeaturedDispatch(): DispatchArticle {
  return ALL_DISPATCHES.find((d) => d.isFeatured) ?? ALL_DISPATCHES[0];
}

/** Look up any dispatch by ID (including featured). */
export function getDispatchById(id: string): DispatchArticle | undefined {
  return ALL_DISPATCHES.find((d) => d.id === id);
}

/** Returns the previous and next dispatches relative to `currentId`.
 *  Traverses the full list (featured + archive), wrapping at boundaries. */
export function getAdjacentDispatches(currentId: string): {
  prev: DispatchArticle | null;
  next: DispatchArticle | null;
} {
  const idx = SORTED_DISPATCHES.findIndex((d) => d.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0                            ? SORTED_DISPATCHES[idx - 1] : null,
    next: idx < SORTED_DISPATCHES.length - 1 ? SORTED_DISPATCHES[idx + 1] : null,
  };
}
