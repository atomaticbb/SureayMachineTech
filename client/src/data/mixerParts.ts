/**
 * Mixer Wear Parts Data - Source of Truth for the Mixer Wear Parts business line.
 *
 * Parallel to, and fully independent from, blades.ts. Covers concrete & asphalt
 * mixing-plant wear parts. Internal links (relatedIds) stay WITHIN this file only
 * - never cross-link to blade products - to keep the SEO topic cluster separate.
 *
 * All copy is original wording (reworded from partner-authorized facts) to avoid
 * duplicate-content penalties. English only.
 */

// ===== SHARED TYPES =====

/** Key spec row shown in the product card and spec table */
export interface MixerSpec {
  label: string;
  value: string;
}

/** Engineering-highlight card block */
export interface MixerComponent {
  id: string;
  tag: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

/** One FAQ entry (rendered as FAQPage JSON-LD + on-page accordion) */
export interface MixerFaq {
  question: string;
  answer: string;
}

// ===== CATEGORY / SECTOR TYPES =====

/** Plant type - drives the two aggregation pages */
export type MixerCategoryType =
  | "concrete_mixing_plant"
  | "asphalt_mixing_plant";

/** Functional group - secondary axis (mirrors blade `sector`) */
export type MixerSectorType =
  | "mixing_arm"
  | "liner"
  | "blade"
  | "scraper"
  | "seal";

/** One cast grade / SKU variant of a part, folded into the page as a grade
 *  row instead of a separate product (keeps variant keywords on one URL). */
export interface MixerVariant {
  grade: string;
  note: string;
}

// ===== MAIN INTERFACE =====
export interface MixerPart {
  // ── List page (always present) ───────────────────────────────────────────
  id: string;
  name: string;
  fullName: string;
  category: MixerCategoryType;
  sector: MixerSectorType;
  categoryDisplay: string;
  image: string;
  gallery: string[];
  description: string;
  link: string;
  specs: MixerSpec[];
  compatibleMachines: string[];

  // ── Optional list-page decorators ────────────────────────────────────────
  badge?: string;
  badgeColor?:
    | "green"
    | "blue"
    | "red"
    | "slate"
    | "purple"
    | "orange"
    | "teal";

  // ── Detail page ──────────────────────────────────────────────────────────
  fullDescription: string;
  components?: MixerComponent[];
  faq?: MixerFaq[];
  /** Cast grades / SKU variants shown in the "Available Grades / Variants"
   *  block — folds the partner's many per-part SKUs into one page. */
  variants?: MixerVariant[];
  /** Trust-bar slot 2 (process) — per product. Renders in the page trust
   *  strip; falls back to a global default if absent (e.g. asphalt line). */
  trustProcess?: string;
  /** Trust-bar slot 3 (property / credibility) — per product. */
  trustProperty?: string;

  // ── SEO — AggregateOffer price range (Google Rich Results) ──────────────
  offers?: {
    lowPrice: number;
    highPrice: number;
  };
  /** Overrides the auto-generated "{name} for {oemTop}" <title>. Use only
   *  where GSC data shows the auto title underperforms (low CTR at a good
   *  position) — leave unset elsewhere so the default keeps working. */
  seoTitle?: string;

  // ── Meta / utility ───────────────────────────────────────────────────────
  isFeatured?: boolean;
  relatedIds: string[];
}

/** One of the two aggregation (category) pages */
export interface MixerCategory {
  id: string; // URL slug, e.g. "concrete-mixing-plant"
  category: MixerCategoryType;
  name: string;
  seoTitle: string; // <title> for the category page (brand suffix added by SEO)
  description: string;
  image: string;
  link: string;
}

// ===== AGGREGATION PAGES =====
export const mixerCategories: MixerCategory[] = [
  {
    id: "concrete-mixing-plant",
    category: "concrete_mixing_plant",
    name: "Concrete Mixing Plant Parts",
    seoTitle: "Concrete Mixer Wear Parts — OEM Replacement (Ni-Hard)",
    description:
      "OEM-fit replacement wear parts for Sicoma, Liebherr & MEKA concrete mixers — arms, liner plates, scrapers in Ni-Hard & high-chrome iron.",
    image:
      "/images/mixer-parts/concrete-mixer-blade/concrete-mixer-blade-00.webp",
    link: "/mixer-wear-parts/concrete-mixing-plant",
  },
  {
    id: "asphalt-mixing-plant",
    category: "asphalt_mixing_plant",
    name: "Asphalt Mixing Plant Parts",
    seoTitle: "Asphalt Plant Wear Parts — OEM Replacement (HB600+)",
    description:
      "OEM-fit replacement wear parts for Ammann, Marini, Benninghoven, MEKA & Astec asphalt plants — mixing arms, liner plates, spiral blades, HB600+ chrome iron.",
    image:
      "/images/mixer-parts/asphalt-spiral-blade/asphalt-spiral-blade-00.webp",
    link: "/mixer-wear-parts/asphalt-mixing-plant",
  },
];

// ===== OEM COMPATIBILITY (shared) =====
const CONCRETE_OEMS = [
  "Sicoma",
  "Liebherr",
  "MEKA",
  "Simem",
  "SANY",
  "Zoomlion",
  "Teka",
  "BHS",
  "Eirich",
];

const ASPHALT_OEMS = ["Ammann", "Marini", "Benninghoven", "MEKA", "Astec"];

// ===== PRODUCT DATA =====
export const mixerParts: MixerPart[] = [
  // ───────────────────────────────────────────────────────────────────────
  // CONCRETE MIXING PLANT
  // ───────────────────────────────────────────────────────────────────────
  {
    id: "concrete-mixing-arm",
    name: "Concrete Mixing Arm",
    fullName: "Concrete Mixing Plant Mixing Arm (ZG310-570 Cast Steel)",
    category: "concrete_mixing_plant",
    sector: "mixing_arm",
    categoryDisplay: "Concrete Mixing Plant",
    image:
      "/images/mixer-parts/concrete-mixing-arm/concrete-mixing-arm-00.webp",
    gallery: [
      "/images/mixer-parts/concrete-mixing-arm/concrete-mixing-arm-00.webp",
      "/images/mixer-parts/concrete-mixing-arm/concrete-mixing-arm-01.webp",
      "/images/mixer-parts/concrete-mixing-arm/concrete-mixing-arm-02.webp",
    ],
    badge: "OEM-Fit",
    badgeColor: "blue",
    description:
      "Concrete mixing plant mixing arm in ZG310-570 cast steel - links the drive shaft to the blades and scrapers; lost-foam cast for OEM-fit replacement.",
    fullDescription:
      "The mixing arm is the load-bearing link between the rotating shaft and the blades and scrapers that actually move the concrete. Every batch it carries the full reversing torque of the aggregate load. When an arm starts to crack at the hub or its bolt bosses elongate, blade spacing drifts out of position, the mix turns uneven, and a fully detached arm can gouge the liner plates or jam the drum - turning a low-cost wear item into an unplanned plant shutdown.\n\nSureay casts these arms from ZG310-570 cast steel, a grade chosen for impact toughness rather than surface hardness, so the arm absorbs shock and flexes slightly instead of fracturing. Each arm is produced on our lost-foam casting line for repeatable wall thickness and clean hub geometry, then machined to the original bolt pattern so it indexes onto the shaft without shimming or field grinding.\n\nArms are supplied to fit common twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. Arms typically serve 12-18 months. Service life depends on output, aggregate hardness and duty cycle — verify against your OEM service interval. We recommend renewing arms as a set with the blades and scrapers so the whole mixing tool stays inside the same wear window.",
    link: "/mixer-wear-parts/concrete-mixing-plant/concrete-mixing-arm",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "Impact-Resistant Cast Steel",
    isFeatured: true,
    compatibleMachines: CONCRETE_OEMS,
    offers: { lowPrice: 180, highPrice: 950 },
    specs: [
      { label: "Material", value: "ZG310-570 cast steel" },
      {
        label: "Hardness",
        value:
          "Alloy steel casting, toughness-optimized (not surface-hardened)",
      },
      {
        label: "Process",
        value: "Lost foam casting, machined to OEM bolt pattern",
      },
      { label: "Application", value: "Twin-shaft & planetary concrete mixers" },
      { label: "OEM Fit", value: CONCRETE_OEMS.join(", ") },
    ],
    components: [
      {
        id: "toughness-first-casting",
        tag: "METALLURGY",
        title: "Toughness-First Cast Steel",
        description:
          "ZG310-570 puts impact resistance ahead of raw hardness. Under the reversing shock load of a full aggregate batch the arm absorbs energy and deforms slightly rather than cracking at the hub - the failure mode that takes liners and shafts down with it.",
      },
      {
        id: "indexed-bolt-pattern",
        tag: "FITMENT",
        title: "Machined OEM Bolt Pattern",
        description:
          "Hubs and bolt bosses are machined to the original-equipment pattern, so each arm seats on the shaft and holds blade spacing without shims or field grinding - keeping a swap to a routine maintenance task.",
      },
      {
        id: "oem-odm-sourcing",
        tag: "OEM / ODM",
        title: "Reproduced From Your Sample",
        description:
          "No drawing on file is no problem. Send a worn arm or the plant model and we reverse-engineer a drop-in casting on the lost-foam line - the standard route for older or less common mixers.",
      },
    ],
    faq: [
      {
        question: "How often should concrete mixer arms be replaced?",
        answer:
          "Most plants renew mixing arms every 12-18 months, though high-output operations running hard, abrasive aggregate can reach the wear limit sooner. The practical signal is bolt-hole elongation or blade spacing that no longer holds adjustment. Replacing arms together with the blades and scrapers keeps the whole mixing tool on one wear cycle.",
      },
      {
        question:
          "Will a replacement arm fit my existing shaft without modification?",
        answer:
          "Yes. Arms are machined to the original OEM bolt pattern for the listed plants, so they index onto the shaft and locate the blades without shimming or drilling. Send us the plant model and a photo of the hub and we confirm the pattern before shipping.",
      },
      {
        question:
          "Why are mixing arms cast in tougher steel instead of a harder grade?",
        answer:
          "Arms fail from shock and fatigue, not abrasion, so toughness matters more than hardness here - a very hard, brittle arm would crack at the hub under reversing batch loads. The hard, high-chromium material is reserved for the blades, scrapers and liners that take the direct grinding.",
      },
      {
        question: "Which concrete mixing plants do your mixing arms fit?",
        answer:
          "Our concrete mixing arms are cast to fit twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. Tell us the plant make and model and we match the bolt pattern and shaft bore; arms for other brands can be reverse-engineered from a worn sample.",
      },
      {
        question:
          "Can you make a concrete mixing arm from a worn sample or drawing?",
        answer:
          "Yes - OEM/ODM is welcome. Send a worn arm, a dimensioned sketch or the plant model and we cast a drop-in replacement on our lost-foam line, matched to the original hub geometry and bolt pattern. This is the usual route for older or less common mixers.",
      },
      {
        question:
          "What is ZG310-570 cast steel and why is it used for mixing arms?",
        answer:
          "ZG310-570 is a medium-strength cast carbon steel chosen for toughness rather than surface hardness. A mixing arm carries reversing shock loads every batch, so it has to absorb impact and flex slightly instead of cracking - the abrasion-resistant Ni-Hard and high-chrome grades are reserved for the blades and liners.",
      },
      {
        question:
          "What is the minimum order quantity and lead time for mixing arms?",
        answer:
          "We ship factory-direct and keep the MOQ low on replacement wear parts; exact quantity and lead time depend on the model and whether tooling already exists. Send your plant model for a quote - most repeat items ship in a few weeks, and a material and hardness report can be included on request.",
      },
    ],
    variants: [
      {
        grade: "Standard ZG310-570",
        note: "Tough cast-steel baseline for general twin-shaft and planetary plants.",
      },
      {
        grade: "High-Strength Alloy",
        note: "Upgraded alloy steel for higher reversing torque and longer fatigue life.",
      },
      {
        grade: "Heavy-Duty High-Output",
        note: "Reinforced hub section for plants running hard, abrasive aggregate at volume.",
      },
      {
        grade: "OEM-Pattern Match",
        note: "Machined to a specific plant's bolt pattern and shaft bore on request.",
      },
    ],
    relatedIds: [
      "concrete-liner-plate",
      "concrete-scraper",
      "concrete-mixer-blade",
      "concrete-wear-seal",
    ],
  },
  {
    id: "concrete-liner-plate",
    name: "Concrete Liner Plate",
    fullName: "Concrete Mixing Plant Liner Plate (Ni-Hard / High-Chrome Iron)",
    category: "concrete_mixing_plant",
    sector: "liner",
    categoryDisplay: "Concrete Mixing Plant",
    image:
      "/images/mixer-parts/concrete-liner-plate/concrete-liner-plate-00.webp",
    gallery: [
      "/images/mixer-parts/concrete-liner-plate/concrete-liner-plate-00.webp",
      "/images/mixer-parts/concrete-liner-plate/concrete-liner-plate-01.webp",
      "/images/mixer-parts/concrete-liner-plate/concrete-liner-plate-02.webp",
    ],
    badge: "HB600+",
    badgeColor: "slate",
    description:
      "Concrete mixing plant liner plate in Ni-Hard / high-chrome iron, HB600+ - shields the drum interior from aggregate abrasion; bolt-in replacement.",
    fullDescription:
      "Liner plates are the sacrificial skin of the mixing drum. They take the constant grinding of sand, gravel and cement against the chamber wall so the drum shell itself never wears. Once a liner thins through or a fixing bolt pulls loose, abrasive aggregate reaches the structural drum - a repair an order of magnitude more expensive than a liner swap, and one that can write off the chamber entirely.\n\nSureay liners are cast in Ni-Hard and high-chromium iron with a working hardness above HB 600, putting the wear face well beyond the hardness of the aggregate attacking it. Plates are produced on our lost-foam and DISA green-sand lines for a consistent profile and accurate bolt-hole position, so each segment sits flush against its neighbour with no exposed lip for material to catch and pry up.\n\nLiner sets bolt straight into twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. Liners typically last 6-18 months. Service life depends on output, aggregate hardness and duty cycle — verify against your OEM service interval. Rotating the most-worn positions and keeping a spare set on the shelf avoids the long lead time that turns a worn liner into lost production.",
    link: "/mixer-wear-parts/concrete-mixing-plant/concrete-liner-plate",
    trustProcess: "Lost-Foam & DISA Cast",
    trustProperty: "HB 600+ Wear Hardness",
    compatibleMachines: CONCRETE_OEMS,
    offers: { lowPrice: 35, highPrice: 180 },
    specs: [
      { label: "Material", value: "Ni-Hard / high-chromium cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam / DISA green-sand casting" },
      { label: "Application", value: "Concrete mixer drum & chamber lining" },
      { label: "OEM Fit", value: CONCRETE_OEMS.join(", ") },
    ],
    components: [
      {
        id: "abrasion-barrier",
        tag: "WEAR LIFE",
        title: "HB600+ Abrasion Barrier",
        description:
          "Ni-Hard and high-chromium iron carry the wear face above HB 600 - harder than the sand and gravel that grind against it. The result is a sacrificial plate that wears predictably and protects the structural drum behind it.",
      },
      {
        id: "flush-bolt-fit",
        tag: "FITMENT",
        title: "Flush Bolt-On Segments",
        description:
          "Accurate bolt-hole position from the DISA green-sand line means each plate sits flush against its neighbour, leaving no proud edge for aggregate to catch, lift and tear out early.",
      },
      {
        id: "grade-matched-aggregate",
        tag: "GRADE",
        title: "Grade Matched to Your Aggregate",
        description:
          "Ni-Hard for general duty, high-chromium iron for the hardest, most abrasive aggregate - we match the carbide structure to your material and output instead of shipping a one-size plate.",
      },
    ],
    faq: [
      {
        question: "How do I know when concrete liner plates need replacing?",
        answer:
          "Measure the remaining plate thickness at the highest-wear zones and watch the bolt heads - once they stand proud of the worn surface or start to round off, the liner is near the end of its life. Replacing before the plate thins through keeps abrasive aggregate off the structural drum, which is far costlier to repair.",
      },
      {
        question:
          "What is the difference between Ni-Hard and high-chromium liner plates?",
        answer:
          "Both run above HB 600, but the carbide structure differs: Ni-Hard offers good general abrasion resistance at a lower cost, while high-chromium iron carries a higher carbide volume for tougher, more abrasive aggregate and longer life. We match the grade to your aggregate hardness and output.",
      },
      {
        question: "Which concrete mixers do your liner plates fit?",
        answer:
          "Liner plates are supplied to fit twin-shaft and planetary concrete mixers from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. We match the plate profile, thickness and bolt-hole layout to your specific drum; plates for other plants can be copied from a worn sample.",
      },
      {
        question:
          "Can you supply concrete liner plates in custom sizes and thicknesses?",
        answer:
          "Yes. Liner plates are made to your drum's dimensions, including non-standard thicknesses and bolt patterns. Send the worn plate or a dimensioned drawing and we cast a matching set; we can also lift the grade to suit harder or more abrasive aggregate.",
      },
      {
        question:
          "Do you sell a full concrete mixer liner set or individual plates?",
        answer:
          "Both. Order a complete liner set for a full reline, or individual plates to renew the highest-wear positions. Because liners share a wear cycle, most plants reline as a set and keep a spare on the shelf to avoid downtime waiting on lead time.",
      },
      {
        question: "How are concrete mixer liner plates fixed inside the drum?",
        answer:
          "Liner plates bolt to the drum wall through cast or machined holes and sit flush against each neighbour, so no edge is left for aggregate to catch and pry up. Renew the fixing bolts with the plates - worn bolts are a common cause of a liner working loose early.",
      },
      {
        question:
          "What is the minimum order quantity and lead time for liner plates?",
        answer:
          "We ship factory-direct and keep the MOQ low on replacement wear parts; exact quantity and lead time depend on the model and whether tooling already exists. Send your plant model for a quote - most repeat items ship in a few weeks, and a material and hardness report can be included on request.",
      },
    ],
    variants: [
      {
        grade: "High-Hardness",
        note: "Maximum surface hardness for the most abrasive sand and gravel.",
      },
      {
        grade: "High-Wear High-Chrome",
        note: "High carbide volume for the longest service life under heavy throughput.",
      },
      {
        grade: "Impact-Resistant Ni-Hard",
        note: "Tougher grade where large or recycled aggregate strikes the wall hard.",
      },
      {
        grade: "General-Duty",
        note: "Balanced, economical plate for standard-output plants.",
      },
      {
        grade: "OEM / Full-Series",
        note: "Complete plate set matched to a specific plant model and layout.",
      },
    ],
    relatedIds: [
      "concrete-mixing-arm",
      "concrete-scraper",
      "concrete-mixer-blade",
      "concrete-wear-seal",
    ],
  },
  {
    id: "concrete-scraper",
    name: "Concrete Scraper",
    fullName: "Concrete Mixing Plant Scraper Blade (High-Chrome, Drum-Wall)",
    category: "concrete_mixing_plant",
    sector: "scraper",
    categoryDisplay: "Concrete Mixing Plant",
    image: "/images/mixer-parts/concrete-scraper/concrete-scraper-00.webp",
    gallery: [
      "/images/mixer-parts/concrete-scraper/concrete-scraper-00.webp",
      "/images/mixer-parts/concrete-scraper/concrete-scraper-01.webp",
      "/images/mixer-parts/concrete-scraper/concrete-scraper-02.webp",
    ],
    badge: "High-Chrome",
    badgeColor: "slate",
    description:
      "Concrete mixing plant scraper in high-chrome iron - keeps the drum walls and floor clean so every batch fully discharges and won't build up.",
    fullDescription:
      "The scraper rides closest to the drum wall and floor, sweeping the last of the concrete toward the discharge gate and keeping the chamber surfaces clean between batches. It is the part that decides whether a mixer empties completely or leaves a skin of material behind.\n\nWhen the scraper edge wears back and the wall clearance opens up, residue is left to harden on the drum. That build-up steals batch volume, throws the mixing action out of balance, and eventually has to be chipped out by hand - lost production on top of an avoidable cleaning job. A scraper held to its set clearance keeps discharge clean and the rated batch size intact.\n\nSureay scrapers are cast in high-chromium iron above HB 600 and finished to a precise edge profile, with an adjustable mount so wall clearance can be reset as the part wears. They fit twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich, and typically last 6-18 months. Service life depends on output, aggregate hardness and duty cycle — verify against your OEM service interval.",
    link: "/mixer-wear-parts/concrete-mixing-plant/concrete-scraper",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "HB 600+ Wear Hardness",
    compatibleMachines: CONCRETE_OEMS,
    offers: { lowPrice: 40, highPrice: 220 },
    specs: [
      { label: "Material", value: "High-chromium cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam casting, precision-ground edge" },
      {
        label: "Application",
        value: "Drum-wall & floor cleaning, batch discharge",
      },
      { label: "OEM Fit", value: CONCRETE_OEMS.join(", ") },
    ],
    components: [
      {
        id: "set-clearance-edge",
        tag: "PRECISION",
        title: "Precise, Resettable Wall Clearance",
        description:
          "A ground edge profile on an adjustable mount lets operators hold a tight wall clearance and reset it as the scraper wears - the single factor that keeps the drum discharging clean instead of glazing over with hardened residue.",
      },
      {
        id: "high-chrome-edge",
        tag: "WEAR LIFE",
        title: "HB600+ High-Chrome Edge",
        description:
          "Cast in high-chromium iron above HB 600, the ground edge holds its profile against abrasive aggregate, so wall clearance stays tight for longer between resets.",
      },
      {
        id: "protects-liner",
        tag: "PROTECTION",
        title: "Protects the Liner Behind It",
        description:
          "A scraper renewed on schedule keeps discharge clean and stops residue glazing the drum - run past its adjustment range it wears its own mount and the liner it rides against.",
      },
    ],
    faq: [
      {
        question: "Why is my concrete mixer leaving residue after discharge?",
        answer:
          "The most common cause is a worn scraper or an opened-up wall clearance: once the edge no longer reaches the drum surface, a film of concrete is left to harden each cycle. Renewing the scraper and resetting clearance restores clean discharge and recovers the batch volume lost to build-up.",
      },
      {
        question: "How long does a concrete mixer scraper last?",
        answer:
          "Typically 6-18 months. Service life depends on throughput and aggregate hardness, and on how often clearance is reset - a scraper run past its adjustment range wears its mount and the liner behind it, so renewing on schedule protects neighbouring parts too.",
      },
      {
        question: "Which concrete mixing plants do your scrapers fit?",
        answer:
          "Our concrete scrapers fit twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. We match the mount and edge profile to your mixer; scrapers for other brands can be reproduced from a worn part or drawing.",
      },
      {
        question: "What material is a concrete mixer scraper made of?",
        answer:
          "Scrapers are cast in high-chromium iron above HB 600, hard enough to hold a clean edge against abrasive aggregate while sweeping the drum wall and floor. The edge is precision-ground so the scraper sits to a tight, repeatable wall clearance.",
      },
      {
        question: "How do I set and adjust the concrete scraper clearance?",
        answer:
          "The scraper sits on an adjustable mount, so the edge can be set close to the drum wall and reset as it wears. Holding a tight clearance is what keeps the drum discharging clean; a scraper run past its adjustment range leaves residue and wears the liner behind it.",
      },
      {
        question: "Why is my concrete mixer not discharging fully?",
        answer:
          "Incomplete discharge is usually a worn scraper or an opened-up wall clearance that leaves a film of concrete to harden each cycle. Renewing the scraper and resetting clearance restores clean discharge and recovers the batch volume lost to build-up.",
      },
      {
        question:
          "What is the minimum order quantity and lead time for scrapers?",
        answer:
          "We ship factory-direct and keep the MOQ low on replacement wear parts; exact quantity and lead time depend on the model and whether tooling already exists. Send your plant model for a quote - most repeat items ship in a few weeks, and a material and hardness report can be included on request.",
      },
    ],
    variants: [
      {
        grade: "High-Precision Edge",
        note: "Tight-tolerance ground edge for the cleanest wall and floor clearance.",
      },
      {
        grade: "High-Toughness",
        note: "Shock-tolerant grade for plants handling coarse or recycled aggregate.",
      },
      {
        grade: "Corrosion-Resistant",
        note: "Added corrosion resistance for high-moisture or additive-heavy mixes.",
      },
      {
        grade: "High-Efficiency",
        note: "Optimised profile that clears more material per pass.",
      },
      {
        grade: "OEM-Match",
        note: "Mount and edge profile cut to a specific plant on request.",
      },
    ],
    relatedIds: [
      "concrete-mixing-arm",
      "concrete-liner-plate",
      "concrete-mixer-blade",
      "concrete-wear-seal",
    ],
  },
  {
    id: "concrete-mixer-blade",
    name: "Concrete Mixer Blade",
    fullName: "Concrete Mixer Blade / Paddle (Bolt-On Ni-Hard)",
    category: "concrete_mixing_plant",
    sector: "blade",
    categoryDisplay: "Concrete Mixing Plant",
    image:
      "/images/mixer-parts/concrete-mixer-blade/concrete-mixer-blade-00.webp",
    gallery: [
      "/images/mixer-parts/concrete-mixer-blade/concrete-mixer-blade-00.webp",
      "/images/mixer-parts/concrete-mixer-blade/concrete-mixer-blade-01.webp",
      "/images/mixer-parts/concrete-mixer-blade/concrete-mixer-blade-02.webp",
    ],
    badge: "Best Value",
    badgeColor: "green",
    description:
      "Concrete mixer blade in Ni-Hard iron - economical, abrasion- and corrosion-resistant bolt-on paddle that folds and lifts aggregate for a uniform mix.",
    fullDescription:
      "Mixer blades do the actual work of the machine: bolted to the arms, they fold, lift and shear the aggregate, cement and water into a homogeneous batch on every revolution. The blade profile and its clearance to the liner set how fast and how evenly the plant mixes.\n\nAs the leading edge rounds off and clearance widens, mixing slows - cycle times stretch, batches finish unevenly or segregated, and the plant burns more energy to reach the same result. Concrete that leaves the mixer under-mixed shows up later as inconsistent strength, the kind of quality problem that is hard to trace back to a worn paddle. Renewing blades on schedule is the cheapest way to protect both throughput and batch consistency.\n\nSureay supplies bolt-on blades cast in Ni-Hard iron above HB 600 - a deliberately economical, abrasion- and corrosion-resistant choice for a part that is replaced on a regular cycle. They drop onto the existing arms of Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich plants, and typically run 6-18 months. Service life depends on output, aggregate hardness and duty cycle — verify against your OEM service interval.",
    link: "/mixer-wear-parts/concrete-mixing-plant/concrete-mixer-blade",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "HB 600+ Wear Hardness",
    isFeatured: true,
    compatibleMachines: CONCRETE_OEMS,
    offers: { lowPrice: 45, highPrice: 260 },
    specs: [
      { label: "Material", value: "Ni-Hard cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam casting, bolt-on mounting" },
      {
        label: "Application",
        value: "Folding & lifting aggregate, primary mix",
      },
      { label: "OEM Fit", value: CONCRETE_OEMS.join(", ") },
    ],
    components: [
      {
        id: "economical-bolt-on",
        tag: "VALUE",
        title: "Economical Bolt-On Replacement",
        description:
          "Ni-Hard delivers the abrasion and corrosion resistance a mixing paddle needs at a cost that suits a part on a regular renewal cycle. Bolt-on mounting means no welding - blades change out fast during routine maintenance.",
      },
      {
        id: "mix-uniformity",
        tag: "PERFORMANCE",
        title: "Profile That Protects Mix Quality",
        description:
          "A correct leading-edge profile and tight liner clearance keep cycle times short and the batch homogeneous. Renewing blades before the edge rounds off guards against the under-mixing that quietly erodes concrete strength.",
      },
      {
        id: "grade-options-output",
        tag: "GRADE",
        title: "Economy or Long-Life Grade",
        description:
          "Choose economical Ni-Hard for a part on a regular renewal cycle, or high-chromium iron for longer life under harder aggregate - matched to your output rather than a single stock grade.",
      },
    ],
    faq: [
      {
        question: "How often should concrete mixer blades be replaced?",
        answer:
          "As a rule of thumb, every 6-18 months - high-output plants running abrasive aggregate sit at the shorter end. Rather than wait for a fixed date, watch for longer cycle times, uneven batches or a visibly rounded leading edge and widened liner clearance; these are the signs the blade is no longer mixing efficiently.",
      },
      {
        question: "Are bolt-on mixer blades better than welded blades?",
        answer:
          "For most plants, yes. Bolt-on blades change out in minutes without welding, hot work permits or grinding, so maintenance is faster and safer, and the arm underneath is not heat-affected by repeated welding. Our Ni-Hard blades are designed as bolt-on replacements for the listed OEM mixers.",
      },
      {
        question: "Which concrete mixers do your blades and paddles fit?",
        answer:
          "Bolt-on blades are supplied for twin-shaft and planetary mixers from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. We match the blade profile and bolt holes to your arms; blades for other plants can be copied from a worn sample.",
      },
      {
        question:
          "What is the difference between Ni-Hard and high-chrome mixer blades?",
        answer:
          "Ni-Hard is an economical, abrasion- and corrosion-resistant grade well suited to a paddle renewed on a regular cycle. High-chromium iron carries a higher carbide volume for longer life under harder, more abrasive aggregate. We match the grade to your output and aggregate hardness.",
      },
      {
        question:
          "Can you supply concrete mixer blades to a sample or drawing?",
        answer:
          "Yes - send a worn blade, a sketch with dimensions or the plant model and we cast bolt-on replacements that drop onto your existing arms. OEM/ODM work is welcome, including non-standard profiles and bolt patterns.",
      },
      {
        question: "Why is my concrete mixing slowly or unevenly?",
        answer:
          "As the blade leading edge rounds off and clearance to the liner widens, mixing slows and batches finish unevenly or segregated. Renewing blades before the edge wears back keeps cycle times short and protects batch consistency - under-mixed concrete shows up later as inconsistent strength.",
      },
      {
        question:
          "What is the minimum order quantity and lead time for mixer blades?",
        answer:
          "We ship factory-direct and keep the MOQ low on replacement wear parts; exact quantity and lead time depend on the model and whether tooling already exists. Send your plant model for a quote - most repeat items ship in a few weeks, and a material and hardness report can be included on request.",
      },
    ],
    variants: [
      {
        grade: "Economy Ni-Hard",
        note: "Best-value bolt-on for plants that renew blades on a regular cycle.",
      },
      {
        grade: "High-Wear High-Chrome",
        note: "Longer life for abrasive aggregate and higher output.",
      },
      {
        grade: "Impact-Resistant",
        note: "Tougher grade where large aggregate loads the leading edge hard.",
      },
      {
        grade: "OEM-Pattern",
        note: "Bolt holes and profile matched to a specific plant's arms.",
      },
    ],
    relatedIds: [
      "concrete-mixing-arm",
      "concrete-liner-plate",
      "concrete-scraper",
      "concrete-wear-seal",
    ],
  },
  {
    id: "concrete-wear-seal",
    name: "Concrete Wear Seal",
    fullName: "Concrete Mixing Plant Shaft Wear Seal (Anti-Leak)",
    category: "concrete_mixing_plant",
    sector: "seal",
    categoryDisplay: "Concrete Mixing Plant",
    image: "/images/mixer-parts/concrete-wear-seal/concrete-wear-seal-00.webp",
    gallery: [
      "/images/mixer-parts/concrete-wear-seal/concrete-wear-seal-00.webp",
      "/images/mixer-parts/concrete-wear-seal/concrete-wear-seal-01.webp",
      "/images/mixer-parts/concrete-wear-seal/concrete-wear-seal-02.webp",
    ],
    badge: "Anti-Leak",
    badgeColor: "teal",
    description:
      "Concrete mixing plant wear seal - guards the shaft ends against slurry and dust leakage, keeping grout in the drum and grit out of the bearings.",
    fullDescription:
      "The wear seal sits where the mixing shaft passes through the drum end - a junction under constant pressure from wet slurry on the inside and fine cement dust working its way out. It is the barrier that keeps grout from bleeding out of the chamber and abrasive grit from reaching the shaft bearings.\n\nWhen a seal hardens, splits or works loose the failure is rarely dramatic but always expensive: slurry weeps from the shaft ends, cement dust packs into the bearing housing, and the bearing itself - an order of magnitude dearer than the seal - begins to grind. Run too long, a leaking seal can take out the whole shaft-seal assembly and a day of production with it.\n\nSureay wear seals are built for the pressure and abrasion of concrete service and formed to the shaft and housing dimensions of the listed plants, so they seat square and run concentric without modification. They suit twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich, and are best renewed whenever the shaft is opened for blade or arm work. Service life depends on output, aggregate hardness and duty cycle — verify against your OEM service interval.",
    link: "/mixer-wear-parts/concrete-mixing-plant/concrete-wear-seal",
    trustProcess: "Precision-Molded",
    trustProperty: "Leak-Tight, Abrasion-Resistant Seal",
    compatibleMachines: CONCRETE_OEMS,
    offers: { lowPrice: 20, highPrice: 95 },
    specs: [
      {
        label: "Material",
        value: "Wear- & corrosion-resistant sealing compound",
      },
      {
        label: "Hardness",
        value: "Resilient sealing grade (not a cast wear face)",
      },
      {
        label: "Process",
        value: "Precision-formed to shaft & housing dimensions",
      },
      {
        label: "Application",
        value: "Shaft-end sealing, slurry & dust containment",
      },
      { label: "OEM Fit", value: CONCRETE_OEMS.join(", ") },
    ],
    components: [
      {
        id: "dual-barrier",
        tag: "SEALING",
        title: "Two-Way Slurry & Dust Barrier",
        description:
          "The seal holds wet grout inside the drum while blocking fine cement dust from migrating out to the bearings - the two-way duty that protects both batch consistency and the shaft assembly behind it.",
      },
      {
        id: "true-seat",
        tag: "FITMENT",
        title: "Machined to Seat Square",
        description:
          "Formed to the shaft and housing dimensions of the listed plants, the seal seats square and runs concentric, so it wears evenly instead of channelling and leaking on one side.",
      },
      {
        id: "bearing-protection",
        tag: "PROTECTION",
        title: "Guards the Shaft Bearings",
        description:
          "The seal is a low-cost part standing between abrasive grit and the shaft bearings behind it. Renewing it on time keeps cement dust out of the bearing housing and avoids a far costlier bearing failure.",
      },
    ],
    faq: [
      {
        question: "What happens if a concrete mixer shaft seal fails?",
        answer:
          "A failed seal lets slurry weep from the shaft ends and cement dust pack into the bearing housing. The seal is cheap; the bearing and shaft it protects are not. Renewing the seal at the first sign of weeping or dust tracking keeps a minor part from causing a major repair.",
      },
      {
        question: "When should the concrete mixer wear seal be replaced?",
        answer:
          "Renew the seal whenever the shaft is opened for blade or arm service rather than on a fixed calendar. Grout leaking at the shaft ends or grit in the bearing grease means the seal is already past its limit and should be changed without delay.",
      },
      {
        question: "Which concrete mixers do your wear seals fit?",
        answer:
          "Wear seals are formed to the shaft and housing dimensions of twin-shaft and planetary plants from Sicoma, Liebherr, MEKA, Simem, SANY, Zoomlion, Teka, BHS and Eirich. Send the plant model or the worn seal and we match the size and section.",
      },
      {
        question: "What is a concrete mixer wear seal made of?",
        answer:
          "The seal uses a wear- and corrosion-resistant sealing compound engineered for compression and shaft contact rather than the cast hardness of the blades and liners. The aim is a resilient, two-way barrier that holds grout in and keeps cement dust off the bearings.",
      },
      {
        question: "Can you supply concrete mixer wear seals from a sample?",
        answer:
          "Yes. Send a worn seal or the shaft and housing dimensions and we supply a matching replacement. Renewing the seal whenever the shaft is opened for blade or arm work is the cheapest way to protect the bearings behind it.",
      },
      {
        question:
          "How do I stop slurry leaking at the concrete mixer shaft ends?",
        answer:
          "Slurry weeping at the shaft ends almost always means the wear seal has hardened, split or worked loose. Replacing the seal restores the barrier and stops cement dust packing into the bearing housing - left too long, a leaking seal can take out the far costlier bearing and shaft assembly.",
      },
      {
        question:
          "What is the minimum order quantity and lead time for wear seals?",
        answer:
          "We ship factory-direct and keep the MOQ low on replacement wear parts; exact quantity and lead time depend on the model and whether tooling already exists. Send your plant model for a quote - most repeat items ship in a few weeks, and a material and hardness report can be included on request.",
      },
    ],
    variants: [
      {
        grade: "Standard Service",
        note: "Baseline sealing grade for typical batch plants and moderate output.",
      },
      {
        grade: "High-Pressure / High-Output",
        note: "Firmer compound and reinforced lip for long shifts and higher internal pressure.",
      },
      {
        grade: "Heavy-Dust Duty",
        note: "Extra dust-side protection where dry, fine aggregate loads the seal harder.",
      },
      {
        grade: "OEM-Spec Match",
        note: "Formed to a specific plant's shaft and housing dimensions on request.",
      },
    ],
    relatedIds: [
      "concrete-mixing-arm",
      "concrete-liner-plate",
      "concrete-scraper",
      "concrete-mixer-blade",
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ASPHALT MIXING PLANT
  // ───────────────────────────────────────────────────────────────────────
  {
    id: "asphalt-mixing-arm",
    name: "Asphalt Mixing Arm",
    fullName: "Asphalt Mixing Plant Mixing Arm (High-Temperature Alloy Steel)",
    category: "asphalt_mixing_plant",
    sector: "mixing_arm",
    categoryDisplay: "Asphalt Mixing Plant",
    image: "/images/mixer-parts/asphalt-mixing-arm/asphalt-mixing-arm-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-mixing-arm/asphalt-mixing-arm-00.webp",
      "/images/mixer-parts/asphalt-mixing-arm/asphalt-mixing-arm-01.webp",
      "/images/mixer-parts/asphalt-mixing-arm/asphalt-mixing-arm-02.webp",
    ],
    badge: "Hot-Mix",
    badgeColor: "orange",
    description:
      "Asphalt mixing plant mixing arm in high-temp alloy steel - holds the blade tips through hot bituminous mix without sagging; lost-foam cast OEM fit.",
    fullDescription:
      "In a pugmill or twin-shaft asphalt mixer, the arm holds each blade tip at its set radius while the shaft drives it through hot bituminous mix batch after batch. Unlike a concrete arm, it does this at sustained high temperature, where ordinary steel loses strength and begins to creep.\n\nIf an arm softens, bends or cracks under that combined heat and load, blade tips drop out of position, the mix coats unevenly, and a failed arm can foul the liners or stall the shaft mid-batch - an expensive stop on a plant that has to keep hot mix moving. Holding the blade geometry steady through the heat is exactly the arm's job.\n\nSureay casts these arms from heat-resistant alloy steel that keeps its strength and toughness at mixing temperature, produced on the lost-foam line and machined to the original bolt pattern for a no-shim fit. They suit pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, as well as generic batch mixers, and typically serve 6-18 months depending on output and aggregate hardness.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-mixing-arm",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "Heat-Resistant Alloy Steel",
    isFeatured: true,
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 200, highPrice: 1050 },
    specs: [
      { label: "Material", value: "Heat-resistant alloy steel casting" },
      {
        label: "Hardness",
        value: "Toughness-optimized for hot service (not surface-hardened)",
      },
      {
        label: "Process",
        value: "Lost foam casting, machined to OEM bolt pattern",
      },
      {
        label: "Application",
        value: "Pugmill & twin-shaft asphalt mixers (hot mix)",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "hot-strength-alloy",
        tag: "METALLURGY",
        title: "Hot-Strength Alloy Steel",
        description:
          "The arm is cast from an alloy steel that retains strength and toughness at mixing temperature, resisting the creep and softening that bend an ordinary-steel arm out of position over a hot production season.",
      },
      {
        id: "geometry-hold",
        tag: "FITMENT",
        title: "Holds Blade Geometry Through Heat",
        description:
          "Machined to the OEM bolt pattern and dimensioned for thermal load, the arm keeps each blade tip at its set radius batch after batch, so hot mix stays evenly coated and the shaft stays clear.",
      },
      {
        id: "oem-odm-sourcing",
        tag: "OEM / ODM",
        title: "Reproduced From Your Sample",
        description:
          "Send a worn arm, a drawing or the plant model and we cast a heat-resistant replacement matched to the original hub and bolt pattern - the usual route for older or less common asphalt plants.",
      },
    ],
    faq: [
      {
        question:
          "Why do asphalt mixer arms use alloy steel instead of cast iron?",
        answer:
          "Asphalt arms work under sustained high temperature where strength must not fade. Heat-resistant alloy steel keeps its strength and toughness hot, resisting the creep and cracking that would let a brittle or low-grade arm drop the blade tips out of position. The hard, abrasion-resistant material is reserved for the blades and liners.",
      },
      {
        question: "How often should asphalt mixing plant arms be replaced?",
        answer:
          "Most plants renew arms every 6-18 months, with high-output, hard-aggregate operations at the shorter end. The signals are bolt-hole elongation and blade tips that no longer hold their set radius. Changing arms alongside blades and scrapers keeps the whole mixing tool on one wear cycle.",
      },
      {
        question: "Which asphalt mixing plants do your mixing arms fit?",
        answer:
          "Asphalt mixing arms are cast to fit pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, as well as generic batch mixers. Send the plant make and model and we match the bolt pattern and bore; arms for other brands can be copied from a worn sample.",
      },
      {
        question:
          "Can your asphalt mixing arms handle continuous high-temperature service?",
        answer:
          "Yes - they are cast from heat-resistant alloy steel that keeps its strength and toughness at mixing temperature, resisting the creep and softening that bend an ordinary-steel arm out of position over a hot production season.",
      },
      {
        question:
          "Can you cast an asphalt mixing arm from a worn sample or drawing?",
        answer:
          "Yes, OEM/ODM is welcome. Send a worn arm, a dimensioned drawing or the plant model and we produce a drop-in replacement matched to the original hub and bolt pattern - the usual route for older or less common asphalt plants.",
      },
      {
        question: "What is the lead time and MOQ for asphalt mixing arms?",
        answer:
          "We ship factory-direct with a low MOQ on replacement wear parts; lead time depends on the model and whether tooling exists. Send your plant model for a quote, and a material and hardness report can be included with the order.",
      },
    ],
    variants: [
      {
        grade: "Standard Heat-Resistant",
        note: "Baseline hot-service alloy steel for typical pugmill plants.",
      },
      {
        grade: "High-Strength",
        note: "Upgraded grade for higher load and longer hot-season life.",
      },
      {
        grade: "Heavy-Duty High-Output",
        note: "Reinforced section for continuous, high-volume hot-mix production.",
      },
      {
        grade: "OEM-Pattern Match",
        note: "Machined to a specific plant's bolt pattern and shaft bore.",
      },
    ],
    relatedIds: [
      "asphalt-liner-plate",
      "asphalt-side-lining",
      "asphalt-spiral-blade",
      "asphalt-scraper",
      "asphalt-sealing",
    ],
  },
  {
    id: "asphalt-liner-plate",
    name: "Asphalt Liner Plate",
    fullName:
      "Asphalt Mixing Plant Liner Plate (High-Temperature Wear-Resistant)",
    category: "asphalt_mixing_plant",
    sector: "liner",
    categoryDisplay: "Asphalt Mixing Plant",
    image:
      "/images/mixer-parts/asphalt-liner-plate/asphalt-liner-plate-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-liner-plate/asphalt-liner-plate-00.webp",
      "/images/mixer-parts/asphalt-liner-plate/asphalt-liner-plate-01.webp",
      "/images/mixer-parts/asphalt-liner-plate/asphalt-liner-plate-02.webp",
    ],
    description:
      "Bolt-in asphalt mixer liner plate, high-chrome iron HB600+ — fits Ammann, Marini, Benninghoven, MEKA & Astec pugmills. Typical 6-18 month service life.",
    seoTitle: "Asphalt Mixer Liner Plate — HB600+ OEM Replacement",
    fullDescription:
      "Liner plates protect the inside of the pugmill from the twin assault of hot, sticky bituminous mix and the sharp mineral aggregate carried in it. They are the barrier that keeps abrasion and heat off the structural mixer shell.\n\nWhen a liner wears thin or a bolt backs out, hot mix works its way to the shell and to the gap behind the plate, where it packs, hardens and accelerates the next failure. Left too long, the damage moves from a cheap liner swap to a shell repair and extended downtime in the middle of a paving season - the worst possible time to lose a plant.\n\nSureay asphalt liners are cast in high-chromium iron above HB 600, selected to hold up to abrasion at mixing temperature, and produced on the lost-foam and DISA green-sand lines for accurate, flush-fitting segments. They bolt into pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, with a typical 6-18 month service life depending on throughput and aggregate hardness.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-liner-plate",
    trustProcess: "Lost-Foam & DISA Cast",
    trustProperty: "HB 600+ Wear Hardness",
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 40, highPrice: 210 },
    specs: [
      { label: "Material", value: "High-chromium cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam / DISA green-sand casting" },
      {
        label: "Application",
        value: "Pugmill / mixer shell lining (hot mix)",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "hot-abrasion-resistance",
        tag: "WEAR LIFE",
        title: "Hot-Mix Abrasion Resistance",
        description:
          "High-chromium iron above HB 600 stands up to sharp mineral aggregate at mixing temperature, giving a sacrificial wear face that protects the structural mixer shell from both abrasion and heat.",
      },
      {
        id: "sealed-fit",
        tag: "FITMENT",
        title: "Flush, Sealed Segments",
        description:
          "Accurate green-sand casting keeps each plate flush so hot mix cannot pack behind the liner, where trapped, hardened material would pry plates loose and shorten the life of the whole set.",
      },
      {
        id: "shell-protection",
        tag: "PROTECTION",
        title: "Shields the Structural Shell",
        description:
          "The liner is the sacrificial barrier that takes hot-mix abrasion and heat so the mixer shell never does. Replacing before it thins through keeps the repair at liner cost, not shell cost.",
      },
    ],
    faq: [
      {
        question: "What causes asphalt plant liner plates to fail early?",
        answer:
          "Usually it is mix packing behind a plate through a worn bolt or an uneven seam: trapped hot mix hardens, lifts the plate and exposes the shell. Flush-fitting plates and routine bolt checks prevent it. Replacing before a liner thins through keeps the repair at liner cost rather than shell cost.",
      },
      {
        question:
          "Can the same liner plates be used for concrete and asphalt mixers?",
        answer:
          "The material family is similar - high-chromium iron above HB 600 - but the profiles and fixings differ by plant, and asphalt service adds sustained heat. We supply liners matched to your specific asphalt plant model rather than a generic plate, so fit and sealing are correct.",
      },
      {
        question: "Which asphalt mixing plants do your liner plates fit?",
        answer:
          "Liner plates are supplied for pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, plus generic pugmills. We match the plate profile, thickness and bolt layout to your mixer; plates for other plants can be reproduced from a worn sample.",
      },
      {
        question: "How long do asphalt pugmill liner plates last?",
        answer:
          "Typically 6-18 months, depending on output and aggregate hardness. Watch the remaining plate thickness and the fixing bolts - replacing before a liner thins through keeps hot mix off the structural shell, which is far costlier to repair than a liner swap.",
      },
      {
        question: "Can you supply asphalt liner plates in custom sizes?",
        answer:
          "Yes. Liner plates are made to your pugmill's dimensions, including non-standard thicknesses and bolt patterns, and matched to your aggregate hardness. Send a worn plate or a dimensioned drawing and we cast a matching set.",
      },
      {
        question: "How are asphalt liner plates fixed inside the mixer?",
        answer:
          "Liner plates bolt to the mixer shell and sit flush against each neighbour so hot mix cannot pack behind them. Renew the fixing bolts with the plates - a backed-out bolt lets hot mix work behind the liner, where it hardens and pries plates loose.",
      },
    ],
    variants: [
      {
        grade: "High-Hardness Hot-Service",
        note: "Maximum hardness for sharp aggregate at mixing temperature.",
      },
      {
        grade: "High-Wear High-Chrome",
        note: "High carbide volume for the longest life under heavy hot-mix output.",
      },
      {
        grade: "Impact-Resistant",
        note: "Tougher grade for large or recycled aggregate.",
      },
      {
        grade: "General-Duty",
        note: "Balanced, economical plate for standard plants.",
      },
      {
        grade: "OEM / Full-Series",
        note: "Complete liner set matched to a specific plant model.",
      },
    ],
    relatedIds: [
      "asphalt-mixing-arm",
      "asphalt-side-lining",
      "asphalt-spiral-blade",
      "asphalt-scraper",
      "asphalt-sealing",
    ],
  },
  {
    id: "asphalt-side-lining",
    name: "Asphalt Side Lining",
    fullName: "Asphalt Mixing Plant Side Lining (Edge Wear Protection)",
    category: "asphalt_mixing_plant",
    sector: "liner",
    categoryDisplay: "Asphalt Mixing Plant",
    image:
      "/images/mixer-parts/asphalt-side-lining/asphalt-side-lining-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-side-lining/asphalt-side-lining-00.webp",
      "/images/mixer-parts/asphalt-side-lining/asphalt-side-lining-01.webp",
      "/images/mixer-parts/asphalt-side-lining/asphalt-side-lining-02.webp",
    ],
    badge: "Hot-Mix",
    badgeColor: "orange",
    description:
      "Asphalt mixing plant side lining - high-chrome edge plates that protect the pugmill end walls and corners where hot mix wears fastest.",
    fullDescription:
      "Side linings guard the end walls and side corners of the pugmill - the edges the main floor and wall liners cannot reach. In a twin-shaft asphalt mixer these corners take a concentrated, swirling wear pattern as hot mix is thrown against them at the ends of each shaft.\n\nBecause the wear is concentrated, a side lining thins through faster than the flat liners around it. Once it does, hot mix attacks the structural end wall and packs into the seam between panels, so what should have been an edge-plate swap becomes an end-wall repair and a longer shutdown if the worn lining is run too far.\n\nSureay side linings are cast in high-chromium iron above HB 600 for abrasion resistance at mixing temperature and shaped to the corner and end-wall profiles of pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec. Renewing them with the main liner set keeps the whole chamber on one wear cycle.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-side-lining",
    trustProcess: "Lost-Foam & DISA Cast",
    trustProperty: "HB 600+ Wear Hardness",
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 35, highPrice: 190 },
    specs: [
      { label: "Material", value: "High-chromium cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      {
        label: "Process",
        value: "Lost foam / DISA green-sand casting, profiled to corner",
      },
      {
        label: "Application",
        value: "Pugmill end-wall & side-corner wear protection (hot mix)",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "corner-coverage",
        tag: "GEOMETRY",
        title: "Profiled Corner & End-Wall Coverage",
        description:
          "Shaped to the contour the flat liners miss, the side lining covers the concentrated wear zone at each shaft end, where swirling hot mix would otherwise cut straight into the structural wall.",
      },
      {
        id: "hot-abrasion-edge",
        tag: "WEAR LIFE",
        title: "HB600+ at Mixing Temperature",
        description:
          "High-chromium iron above HB 600 resists sharp aggregate at hot-mix temperature, so the most heavily loaded edges of the chamber last as long as the flatter, lower-wear panels.",
      },
      {
        id: "custom-corner-profile",
        tag: "FITMENT",
        title: "Cast to Your Corner Profile",
        description:
          "Corner and end-wall shapes vary by plant, so side linings are cast to your specific contour from a worn part or drawing - matching the profile is what stops hot mix cutting past into the end wall.",
      },
    ],
    faq: [
      {
        question:
          "Why do asphalt pugmill corners wear out faster than the walls?",
        answer:
          "Hot mix is thrown against the end walls and corners in a concentrated, swirling pattern at each shaft end, so abrasion there is higher than across the flat liners. A dedicated side lining puts the hardest, most wear-resistant plate exactly where the wear is worst.",
      },
      {
        question: "Can I replace just the side lining, or the whole liner set?",
        answer:
          "Side linings can be changed on their own when only the corners are worn, but because they share a wear cycle with the floor and wall liners, most plants renew them together to avoid a second shutdown weeks later.",
      },
      {
        question: "Which asphalt mixing plants do your side linings fit?",
        answer:
          "Side linings are shaped to the corner and end-wall profiles of pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec. Send your plant model or a worn part and we match the contour.",
      },
      {
        question: "What material are asphalt side linings made of?",
        answer:
          "Side linings are cast in high-chromium iron above HB 600 for abrasion resistance at mixing temperature, putting the hardest wear face exactly where the swirling hot mix attacks the chamber corners hardest.",
      },
      {
        question: "Can you make side linings to my pugmill's corner profile?",
        answer:
          "Yes. Because corner and end-wall shapes vary by plant, side linings are cast to your specific contour from a worn part or a drawing. Matching the profile is what stops hot mix cutting past the lining into the structural end wall.",
      },
      {
        question: "How long do asphalt side linings last?",
        answer:
          "Side linings sit in a concentrated wear zone, so they thin faster than the flat liners and are usually renewed with the main liner set every 6-18 months. Running a worn side lining too long lets hot mix reach the end wall and turns an edge-plate swap into a wall repair.",
      },
    ],
    variants: [
      {
        grade: "Standard High-Chrome",
        note: "General hot-mix corner protection for typical output.",
      },
      {
        grade: "High-Wear",
        note: "Higher carbide volume for hard, abrasive aggregate or long shifts.",
      },
      {
        grade: "Impact-Resistant",
        note: "Tougher grade where large or recycled aggregate hits the corners hard.",
      },
      {
        grade: "OEM-Profile Match",
        note: "Cast to a specific plant's corner and end-wall contour.",
      },
    ],
    relatedIds: [
      "asphalt-mixing-arm",
      "asphalt-liner-plate",
      "asphalt-spiral-blade",
      "asphalt-scraper",
      "asphalt-sealing",
    ],
  },
  {
    id: "asphalt-spiral-blade",
    name: "Asphalt Spiral Blade",
    fullName: "Asphalt Mixing Plant Spiral / Paddle Blade (Hot-Mix Conveying)",
    category: "asphalt_mixing_plant",
    sector: "blade",
    categoryDisplay: "Asphalt Mixing Plant",
    image:
      "/images/mixer-parts/asphalt-spiral-blade/asphalt-spiral-blade-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-spiral-blade/asphalt-spiral-blade-00.webp",
      "/images/mixer-parts/asphalt-spiral-blade/asphalt-spiral-blade-01.webp",
      "/images/mixer-parts/asphalt-spiral-blade/asphalt-spiral-blade-02.webp",
    ],
    badge: "Hot-Mix",
    badgeColor: "orange",
    description:
      "Asphalt mixing plant spiral blade in high-chrome alloy - conveys and folds hot mix along the shaft for even bitumen coating; bolt-on, wear-resistant.",
    fullDescription:
      "Spiral blades are the conveying and mixing tool of the pugmill. Pitched along the shaft, they push hot aggregate from one end of the chamber to the other while folding it back through the bitumen, so every stone is fully and evenly coated before discharge.\n\nWhen the spiral profile wears down, that conveying action weakens: material lingers, dead zones form, and aggregate leaves the mixer unevenly coated or segregated - off-spec hot mix that fails at the lab or, worse, on the road. Because the blade controls both throughput and coating quality, a worn spiral quietly costs both rate and product quality at once.\n\nSureay spiral blades are cast in high-chromium alloy iron above HB 600 to resist abrasion at mixing temperature, with a bolt-on mount for fast, weld-free changes. They fit pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, and typically last 6-18 months depending on output and aggregate hardness.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-spiral-blade",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "HB 600+ Wear Hardness",
    isFeatured: true,
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 50, highPrice: 280 },
    specs: [
      { label: "Material", value: "High-chromium alloy cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam casting, bolt-on mounting" },
      {
        label: "Application",
        value: "Conveying & folding hot mix, bitumen coating",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "coating-action",
        tag: "PERFORMANCE",
        title: "Even Conveying & Coating",
        description:
          "A correct spiral pitch and profile keep hot aggregate moving and folding through the bitumen, eliminating the dead zones that leave stones uncoated and push a batch off-spec.",
      },
      {
        id: "hot-wear-alloy",
        tag: "WEAR LIFE",
        title: "Hot-Service High-Chrome",
        description:
          "High-chromium alloy iron above HB 600 holds its edge against sharp aggregate at mixing temperature, so the conveying profile lasts instead of rounding off mid-season. Bolt-on mounting keeps changes quick.",
      },
      {
        id: "bolt-on-change",
        tag: "FITMENT",
        title: "Bolt-On, Weld-Free Change",
        description:
          "The spiral mounts bolt-on for fast maintenance with no welding or hot-work permit, and the pitch and bolt pattern are matched to your shaft so it drops straight on.",
      },
    ],
    faq: [
      {
        question: "How long do asphalt mixer spiral blades last?",
        answer:
          "Typically 6-18 months, with high-output plants and hard, abrasive aggregate at the shorter end. The clearest sign of a worn spiral is falling mixing efficiency - longer cycle times, dead zones in the chamber, or aggregate leaving the mixer unevenly coated.",
      },
      {
        question:
          "What happens to hot mix quality when spiral blades wear out?",
        answer:
          "As the spiral profile rounds off, conveying and folding weaken, so material lingers and aggregate is no longer fully coated with bitumen. The result is uneven or segregated hot mix that can fail specification. Renewing the blades restores both throughput and coating consistency.",
      },
      {
        question: "Which asphalt mixing plants do your spiral blades fit?",
        answer:
          "Spiral and paddle blades are supplied for pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, plus generic pugmills. We match the pitch and mount to your shaft; blades for other plants can be copied from a worn sample.",
      },
      {
        question: "What material are asphalt spiral blades made of?",
        answer:
          "Spiral blades are cast in high-chromium alloy iron above HB 600 to hold their conveying edge against sharp aggregate at mixing temperature, so the spiral profile lasts instead of rounding off mid-season.",
      },
      {
        question: "Are your asphalt spiral blades bolt-on replacements?",
        answer:
          "Yes - they mount bolt-on for fast, weld-free changes during routine maintenance. Send the plant model or a worn blade and we match the pitch, profile and bolt pattern so they drop straight onto your shaft.",
      },
      {
        question:
          "Can you supply asphalt spiral blades to a sample or drawing?",
        answer:
          "Yes, OEM/ODM is welcome. A worn blade or a dimensioned drawing lets us reproduce the correct spiral pitch and profile - the geometry that controls both throughput and how evenly the hot mix is coated.",
      },
    ],
    variants: [
      {
        grade: "Standard High-Chrome",
        note: "General hot-service conveying blade for typical pugmill output.",
      },
      {
        grade: "High-Wear",
        note: "Higher carbide grade for abrasive aggregate and long shifts.",
      },
      {
        grade: "High-Efficiency Pitch",
        note: "Optimised spiral pitch for faster, more even hot-mix conveying.",
      },
      {
        grade: "OEM-Pattern",
        note: "Pitch and mount matched to a specific plant's shaft.",
      },
    ],
    relatedIds: [
      "asphalt-mixing-arm",
      "asphalt-liner-plate",
      "asphalt-side-lining",
      "asphalt-scraper",
      "asphalt-sealing",
    ],
  },
  {
    id: "asphalt-scraper",
    name: "Asphalt Scraper (W-Type)",
    fullName: "Asphalt Mixing Plant Scraper Blade (W-Type, Hot-Mix)",
    category: "asphalt_mixing_plant",
    sector: "scraper",
    categoryDisplay: "Asphalt Mixing Plant",
    image: "/images/mixer-parts/asphalt-scraper/asphalt-scraper-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-scraper/asphalt-scraper-00.webp",
      "/images/mixer-parts/asphalt-scraper/asphalt-scraper-01.webp",
      "/images/mixer-parts/asphalt-scraper/asphalt-scraper-02.webp",
    ],
    description:
      "W-type scraper blade for asphalt pugmills, HB600+ chrome iron — fits Ammann, Marini, Benninghoven, MEKA & Astec. Adjustable mount, bolt-in fit.",
    seoTitle: "Asphalt Mixer W-Type Scraper Blade — OEM Fit",
    fullDescription:
      "The W-type scraper works the floor and lower walls of the pugmill, sweeping hot mix toward the discharge gate so the chamber empties cleanly at the end of each batch. Its W profile reaches the contours an ordinary straight scraper leaves behind.\n\nLet the scraper wear and clearance open up, and hot mix is left to cling, cool and carbonize on the chamber surfaces. That baked-on build-up reduces effective batch volume, can break loose and contaminate later batches, and eventually has to be burned or chipped out during a forced shutdown. A scraper held to its clearance keeps discharge clean and the chamber free of carbon deposits.\n\nSureay W-type scrapers are cast in high-chromium iron above HB 600 for abrasion resistance at mixing temperature, on adjustable mounts so clearance can be reset as they wear. They fit pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, with a typical 6-18 month service life depending on output and aggregate hardness.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-scraper",
    trustProcess: "Lost-Foam Cast",
    trustProperty: "HB 600+ Wear Hardness",
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 45, highPrice: 240 },
    specs: [
      { label: "Material", value: "High-chromium cast iron" },
      { label: "Hardness", value: "HB 600-700" },
      { label: "Process", value: "Lost foam casting, W-type profile" },
      {
        label: "Application",
        value: "Pugmill floor & wall cleaning, batch discharge",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "w-profile-reach",
        tag: "GEOMETRY",
        title: "W-Type Contour Reach",
        description:
          "The W profile follows the floor and lower-wall contours that a straight scraper skips, clearing hot mix from the corners where carbon build-up otherwise starts and spreads.",
      },
      {
        id: "resettable-clearance",
        tag: "PRECISION",
        title: "Resettable Hot Clearance",
        description:
          "An adjustable mount lets operators hold and reset the floor clearance as the scraper wears - the practical control that keeps discharge clean and the chamber free of baked-on deposits.",
      },
      {
        id: "high-chrome-hot-edge",
        tag: "WEAR LIFE",
        title: "HB600+ High-Chrome at Temperature",
        description:
          "Cast in high-chromium iron above HB 600, the W-profile edge resists sharp aggregate at mixing temperature, holding a clean floor clearance that keeps the chamber free of baked-on carbon.",
      },
    ],
    faq: [
      {
        question: "What causes carbon build-up in an asphalt pugmill?",
        answer:
          "Hot mix left on the floor and walls after discharge cools and carbonizes layer by layer. The usual root cause is a worn scraper or opened-up clearance that no longer clears the chamber. A W-type scraper held to its set clearance sweeps the surfaces clean each cycle and stops deposits forming.",
      },
      {
        question: "How often should asphalt mixer scrapers be replaced?",
        answer:
          "Plan on 6-18 months depending on output and aggregate hardness, and reset clearance regularly in between. A scraper run past its adjustment range leaves residue to carbonize and wears the liner behind it, so renewing on schedule protects neighbouring parts as well as discharge quality.",
      },
      {
        question: "Which asphalt mixing plants do your scrapers fit?",
        answer:
          "W-type scrapers are supplied for pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, plus generic pugmills. We match the profile and mount to your mixer; scrapers for other plants can be copied from a worn sample.",
      },
      {
        question: "What is a W3-type asphalt scraper and how is it different?",
        answer:
          "The W3 profile is a three-lobe contour that follows the pugmill floor and lower-wall corners a straight scraper skips, clearing hot mix from exactly the spots where carbon build-up starts. Other W-profiles and custom shapes are available to suit your chamber.",
      },
      {
        question: "Can the asphalt scraper clearance be reset as it wears?",
        answer:
          "Yes. Scrapers sit on an adjustable mount so floor clearance can be held and reset over the part's life. Keeping clearance tight is what sweeps the chamber clean each cycle; a scraper run past its adjustment range leaves residue to carbonize and wears the liner behind it.",
      },
      {
        question: "What material are asphalt mixer scrapers made of?",
        answer:
          "Scrapers are cast in high-chromium iron above HB 600 for abrasion resistance at hot-mix temperature, with a precision-finished edge so they hold a clean, repeatable floor clearance.",
      },
    ],
    variants: [
      {
        grade: "W3 Profile",
        note: "Three-lobe W contour for maximum pugmill floor and corner reach.",
      },
      {
        grade: "High-Precision",
        note: "Tight-tolerance edge for the cleanest hot-mix discharge.",
      },
      {
        grade: "High-Toughness",
        note: "Shock-tolerant grade for coarse or recycled aggregate.",
      },
      {
        grade: "Corrosion-Resistant",
        note: "Added resistance for additive-heavy or high-moisture mixes.",
      },
      {
        grade: "OEM-Match",
        note: "Profile and mount cut to a specific plant on request.",
      },
    ],
    relatedIds: [
      "asphalt-mixing-arm",
      "asphalt-liner-plate",
      "asphalt-side-lining",
      "asphalt-spiral-blade",
      "asphalt-sealing",
    ],
  },
  {
    id: "asphalt-sealing",
    name: "Asphalt Sealing Element",
    fullName: "Asphalt Mixing Plant Shaft Sealing Element (High-Temp)",
    category: "asphalt_mixing_plant",
    sector: "seal",
    categoryDisplay: "Asphalt Mixing Plant",
    image: "/images/mixer-parts/asphalt-sealing/asphalt-sealing-00.webp",
    gallery: [
      "/images/mixer-parts/asphalt-sealing/asphalt-sealing-00.webp",
      "/images/mixer-parts/asphalt-sealing/asphalt-sealing-01.webp",
      "/images/mixer-parts/asphalt-sealing/asphalt-sealing-02.webp",
    ],
    badge: "Hot-Mix",
    badgeColor: "orange",
    description:
      "Asphalt mixing plant sealing element - high-temp shaft seal that keeps hot bitumen, dust and moisture from reaching the pugmill bearings.",
    fullDescription:
      "The sealing element closes the gap where each mixing shaft passes through the pugmill end, working at sustained high temperature against hot bitumen, mineral dust and the moisture that flashes off the aggregate. It keeps that mix inside the chamber and away from the shaft bearings.\n\nHeat is what makes this seal a wear part: an under-spec element hardens and cracks, and once it does, hot bitumen and fine dust track straight into the bearing housing. Contaminated bearings run hot, seize, and can stop a plant mid-batch - an emergency repair on a machine that has to keep hot mix moving to stay on grade.\n\nSureay sealing elements are built from heat-resistant sealing materials and dimensioned to the shaft and housing of the listed plants, so they seat correctly and hold their seal through the temperature cycle. They suit pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, and are best renewed whenever the shaft is opened for blade or arm work.",
    link: "/mixer-wear-parts/asphalt-mixing-plant/asphalt-sealing",
    trustProcess: "Precision-Molded",
    trustProperty: "Heat-Resistant, Leak-Tight Seal",
    compatibleMachines: ASPHALT_OEMS,
    offers: { lowPrice: 25, highPrice: 110 },
    specs: [
      { label: "Material", value: "Heat-resistant sealing material" },
      {
        label: "Hardness",
        value: "Hot-service compression grade (not a cast wear face)",
      },
      { label: "Process", value: "Formed to shaft & housing dimensions" },
      {
        label: "Application",
        value: "High-temp shaft sealing, bitumen/dust/moisture containment",
      },
      {
        label: "OEM Fit",
        value: ASPHALT_OEMS.join(", ") + ", generic pugmill",
      },
    ],
    components: [
      {
        id: "heat-hold",
        tag: "SEALING",
        title: "Holds Its Seal Through the Heat Cycle",
        description:
          "Built from heat-resistant sealing materials, the element keeps hot bitumen and dust inside the chamber instead of hardening and cracking the way an ordinary seal does after a few production cycles.",
      },
      {
        id: "bearing-guard",
        tag: "PROTECTION",
        title: "Keeps Contaminants Off the Bearings",
        description:
          "By sealing the shaft pass-through, the element stops hot mix, fine dust and moisture from reaching the bearing housing - the contamination path that turns a low-cost seal into a seized-bearing shutdown.",
      },
      {
        id: "formed-to-plant",
        tag: "FITMENT",
        title: "Formed to Shaft & Housing",
        description:
          "Each element is dimensioned to your plant's shaft and housing so it seats correctly and holds its seal through the temperature cycle - send the plant model or a worn seal and we match the size and section.",
      },
    ],
    faq: [
      {
        question: "Why do asphalt plant shaft seals need to be heat-resistant?",
        answer:
          "They work at sustained mixing temperature against hot bitumen and dust. An ordinary seal hardens and cracks in that heat, then lets contaminants into the bearings. A heat-resistant sealing element holds its seal through the temperature cycle, which is why it lasts where a standard seal fails.",
      },
      {
        question: "How often should asphalt mixer sealing elements be changed?",
        answer:
          "Renew them whenever the shaft is opened for blade or arm service, and immediately if you see bitumen weeping at the shaft ends or dust in the bearing grease. Catching a tired seal early is far cheaper than replacing the bearings it protects.",
      },
      {
        question: "Which asphalt mixing plants do your sealing elements fit?",
        answer:
          "Sealing elements are dimensioned to the shaft and housing of pugmill and twin-shaft plants from Ammann, Marini, Benninghoven, MEKA and Astec, plus generic pugmills. Send your plant model or the worn seal and we match the size and section.",
      },
      {
        question: "What material is an asphalt shaft sealing element made of?",
        answer:
          "The element is built from heat-resistant sealing materials chosen to hold their seal at sustained mixing temperature, where an ordinary seal would harden and crack and let hot bitumen and dust into the bearings.",
      },
      {
        question: "Can you supply asphalt sealing elements from a sample?",
        answer:
          "Yes. Send a worn element or the shaft and housing dimensions and we supply a matching replacement. Renewing the seal whenever the shaft is opened for blade or arm work is far cheaper than replacing the bearings it protects.",
      },
      {
        question: "How do I stop bitumen leaking at the asphalt mixer shaft?",
        answer:
          "Bitumen weeping at the shaft ends means the sealing element has hardened or cracked in the heat. Replacing it restores the seal and keeps hot mix, dust and moisture out of the bearing housing - contaminated bearings run hot and can stop the plant mid-batch.",
      },
    ],
    variants: [
      {
        grade: "Standard High-Temp",
        note: "Baseline heat-resistant seal for typical asphalt output.",
      },
      {
        grade: "Extended Hot-Service",
        note: "Higher heat tolerance for plants running long, continuous shifts.",
      },
      {
        grade: "Dust & Moisture Barrier",
        note: "Added protection where damp or fine aggregate loads the dust side harder.",
      },
      {
        grade: "OEM-Spec Match",
        note: "Formed to a specific plant's shaft and housing dimensions.",
      },
    ],
    relatedIds: [
      "asphalt-mixing-arm",
      "asphalt-liner-plate",
      "asphalt-side-lining",
      "asphalt-spiral-blade",
      "asphalt-scraper",
    ],
  },
];

// ===== LOOKUPS =====
export function getMixerPartById(id: string): MixerPart | undefined {
  return mixerParts.find(p => p.id === id);
}

export function getMixerPartsByCategory(
  category: MixerCategoryType
): MixerPart[] {
  return mixerParts.filter(p => p.category === category);
}

export function getRelatedMixerParts(id: string, limit = 4): MixerPart[] {
  const current = getMixerPartById(id);
  if (!current) return [];
  return current.relatedIds
    .map(rid => getMixerPartById(rid))
    .filter((p): p is MixerPart => !!p)
    .slice(0, limit);
}

export function getMixerCategoryBySlug(
  slug: string
): MixerCategory | undefined {
  return mixerCategories.find(c => c.id === slug);
}

export function getMixerCategoryByType(
  category: MixerCategoryType
): MixerCategory | undefined {
  return mixerCategories.find(c => c.category === category);
}

export function getFeaturedMixerParts(limit = 4): MixerPart[] {
  return mixerParts.filter(p => p.isFeatured).slice(0, limit);
}

/**
 * Company / trust FAQs shown in the right column of every mixer product page.
 * Kept out of the FAQPage JSON-LD (ProductFAQ only schematizes `technical`),
 * so reusing them across mixer pages does not create duplicate structured data.
 */
export const mixerCompanyFaq: MixerFaq[] = [
  {
    question: "Is Sureay a direct manufacturer or a trading company?",
    answer:
      "We are a direct factory. Most mixer wear parts are cast and machined in-house on our lost-foam and DISA green-sand lines, while sealing components are precision-molded - either way you deal with the people who actually make the parts and skip the trading-company markup.",
  },
  {
    question: "Can you supply parts to fit a specific OEM mixer model?",
    answer:
      "Yes. Send the plant make and model, or a photo and key dimensions of the worn part, and we match the casting and bolt pattern. We supply OEM-fit replacement wear parts for the major concrete and asphalt plant brands and welcome OEM/ODM work.",
  },
  {
    question: "Are you ISO certified and do you ship internationally?",
    answer:
      "Sureay is ISO 9001:2015 certified and ships factory-direct to over 50 countries. Each order can include a material and hardness report on request.",
  },
];
