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

// ── Data ──────────────────────────────────────────────────────────────────────

export const ALL_DISPATCHES: DispatchArticle[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id:         "fd-01",
    tag:        "COMPANY UPDATES",
    date:       "24.OCT.2024",
    title:      "GLOBAL FACILITY EXPANSION PHASE III",
    excerpt:    "Commissioning of our new 5,000 m² high-precision CNC grid expands heavy-duty shredder blade production capacity by 40%, establishing Sureay's largest single-facility output in its 16-year operational history.",
    image:      "/images/about/factory-00.webp",
    readTime:   "5 MIN",
    isFeatured: true,
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
    id:       "dp-01",
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
    id:       "dp-02",
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
    id:       "dp-03",
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
    id:       "dp-04",
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
    id:       "dp-05",
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
    id:       "dp-06",
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

// ── Helper Functions ──────────────────────────────────────────────────────────

/** All non-featured dispatches, for the archive grid. */
export function getAllDispatches(): DispatchArticle[] {
  return ALL_DISPATCHES.filter((d) => !d.isFeatured);
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
  const idx = ALL_DISPATCHES.findIndex((d) => d.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0                          ? ALL_DISPATCHES[idx - 1] : null,
    next: idx < ALL_DISPATCHES.length - 1 ? ALL_DISPATCHES[idx + 1] : null,
  };
}
