/**
 * Machine Data Structure - Source of Truth for MachineListPage and MachineDetail
 * This file contains the TypeScript interface and data array for all machinery products
 */

// ===== BASIC TYPES =====
export interface MachineSpec {
  label: string;
  value: string;
}

// ===== PRODUCT HERO TYPES =====
export interface MachineApplication {
  title: string;
  description: string;
  image?: string;
  benefits?: string[]; // Key benefits (3-4 items)
}

// ===== CORE FEATURES TYPES =====
export interface MachineComponent {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

// ===== APPLICATION GALLERY TYPES =====
export interface ApplicationItem {
  title: string;
  img: string;
}

// ===== TECH SPECS TABLE TYPES =====
export interface SpecCategory {
  id: string;
  label: string;
  specs: Record<string, string>;
}

// ===== MANUFACTURING PROCESS TYPES =====
export interface ProcessItem {
  id: string;
  number: string;
  title: string;
  description?: string;
  image: string;
  size?: 'large' | 'small'; // large for featured, small for secondary
}

// ===== VIDEO SHOWCASE TYPES =====
export interface VideoConfig {
  url: string;
  poster?: string;
}

// ===== MAIN MACHINE INTERFACE =====
export interface Machine {
  // === Core Fields (List Page) ===
  id: string;
  name: string;
  fullName: string; // e.g., "WC67K-400/4000 CNC Press Brake"
  category: "press_brake" | "shearing" | "rolling" | "other" | "recycling_equipment";
  categoryDisplay: string; // e.g., "Press Brake", "Shearing Machine"
  tonnage: "light" | "medium" | "heavy";
  image: string;
  badge?: string;
  badgeColor?: "green" | "blue" | "red" | "slate" | "purple" | "orange" | "teal";
  description: string;
  link: string;
  specs: MachineSpec[]; // Dynamic specs for hover reveal

  // === Detail Page Fields ===
  gallery?: string[]; // Image gallery: [main, img2, img3, img4]
  fullDescription?: string; // Extended description for detail page
  features?: string[]; // Feature list (6-8 items)

  // New data-driven fields for components
  components?: MachineComponent[]; // Core Components Section
  applicationItems?: ApplicationItem[]; // Application Gallery
  specCategories?: SpecCategory[]; // Technical Specifications Tables
  manufacturingProcess?: ProcessItem[]; // Manufacturing Process Bento Grid
  video?: VideoConfig; // Video Showcase

  // Legacy fields (keep for backwards compatibility)
  applications?: MachineApplication[]; // Application scenarios
  technicalSpecs?: MachineSpec[]; // Complete technical parameters
  videoUrl?: string; // YouTube embed URL
  pdfDatasheet?: string; // PDF datasheet link
  relatedMachineIds?: string[]; // Related product IDs
  leadTime?: string; // Delivery time estimate
}

export const machines: Machine[] = [
  {
    // ===== BASIC INFO (Required) =====
    id: "wc67k-400-4000",
    name: "WC67K-400/4000",
    fullName: "WC67K-400/4000 CNC Press Brake",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "heavy",
    image: "/images/products/machinery_06.webp",
    badge: "Best Seller",
    badgeColor: "green",
    description: "Robust torsion bar synchronization with high mechanical strength and precision control.",
    link: "/products/machinery/wc67k-400-4000",

    // ===== PRODUCT HERO (ProductHero Component) =====
    specs: [
      { label: "Force", value: "400 Ton" },
      { label: "Length", value: "4000mm" },
      { label: "Controller", value: "Delem" },
      { label: "Axis", value: "4+1" },
    ],

    gallery: [
      "/images/products/machinery_06.webp",
      "/images/products/machinery_05.webp",
      "/images/products/machinery_03.webp",
      "/images/products/machinery_04.webp",
    ],

    fullDescription: `Delivering 400 tons of force across a 4000mm length,
    the WC67K-400/4000 CNC Press Brake features a Delem controller and 4+1 axis system
    for exceptional precision in heavy-duty metal fabrication.`,

    // ===== VIDEO SHOWCASE (VideoShowcase Component) =====
    video: {
      url: "/videos/press_break.mp4",
      poster: "/images/products/machinery.webp"
    },

    // ===== CORE COMPONENTS (CoreFeatures Component) =====
    components: [
      {
        id: "cnc-control",
        tag: "INTELLIGENT CORE",
        title: "Advanced CNC Control System",
        description: "Equipped with the latest Delem or Cybelec control units offering full 3D touchscreen graphical programming. Experience seamless integration with offline software and real-time bend simulation for maximum precision and efficiency.",
        image: "/images/details/cnc-control-system.webp",
      },
      {
        id: "plate-support",
        tag: "MATERIAL HANDLING",
        title: "Front Plate Support & Bracket",
        description: "Heavy-duty front support arms mounted on precision linear guides. Easily adjustable for different bending lengths and heights, significantly reducing operator fatigue when handling large or heavy steel plates.",
        image: "/images/details/plate-support-abd-bracket.webp",
      },
      {
        id: "positioning",
        tag: "HIGH PRECISION",
        title: "Multi-Axis Positioning System",
        description: "State-of-the-art backgauge system with up to 6-axis control driven by AC servo motors and precision ball screws. Ensures exceptional positioning accuracy (±0.01mm) for complex bending profiles.",
        image: "/images/details/post-positioning-system.webp",
      },
      {
        id: "robotic-arm",
        tag: "AUTOMATION READY",
        title: "Robotic Arm Integration",
        description: "Optional robotic arm system for fully automated bending operations. Seamlessly integrates with the CNC controller for lights-out production and Industry 4.0 connectivity.",
        image: "/images/details/robotic-arm-system.webp",
      }
    ],

    // ===== TECHNICAL SPECIFICATIONS (TechSpecsTable Component) =====
    specCategories: [
      {
        id: 'performance',
        label: 'General Performance',
        specs: {
          'Nominal Force': '400 Ton (4000 kN)',
          'Working Length': '4000mm',
          'Open Height': '520mm',
          'Ram Stroke': '200mm',
          'Max. High Speed': '120mm/s',
          'Max. Working Speed': '8mm/s'
        }
      },
      {
        id: 'control',
        label: 'CNC & Hydraulics',
        specs: {
          'CNC Controller': 'Delem DA-66T',
          'Back Gauge Axes': '4+1 (X, R, Z1, Z2 + X Finger)',
          'Back Gauge Range': '50-1000mm',
          'Bending Accuracy': '±0.01mm',
          'Angle Accuracy': '±0.3°',
          'Main Motor Power': '37 kW'
        }
      },
      {
        id: 'dimensions',
        label: 'Dimensions & Weight',
        specs: {
          'Machine Length': '4600mm',
          'Machine Width': '2100mm',
          'Machine Height': '3200mm',
          'Machine Weight': '42,000 kg',
          'Throat Depth': '400mm',
          'Distance Between Housings': '3200mm'
        }
      }
    ],

    // ===== MANUFACTURING PROCESS (ManufacturingProcess Component) =====
    manufacturingProcess: [
      {
        id: "01",
        number: "01",
        title: "Heavy Duty Frame Annealing",
        description: "Proprietary thermal stress relief ensuring long-term structural integrity and zero deformation under peak tonnage.",
        image: "/images/process/01.webp",
        size: 'large'
      },
      {
        id: "02",
        number: "02",
        title: "Critical Component Assembly",
        image: "/images/process/critical-component-assembly.webp",
        size: 'small'
      },
      {
        id: "03",
        number: "03",
        title: "Large-Scale Metrology Check",
        image: "/images/process/large-scale-metrology-check.webp",
        size: 'small'
      }
    ],

    // ===== APPLICATION GALLERY (ApplicationGallery Component) =====
    applicationItems: [
      { title: 'Specialty Vehicle & Transportation', img: '/images/applications/specialty-vehicle-and-transportation.webp' },
      { title: 'Electrical & Power Cabinets', img: '/images/applications/electrical-and-power-cabinets.webp' },
      { title: 'Steel Structure & Construction', img: '/images/applications/steel-structure-and-construction.webp' },
      { title: 'Industrial Equipment Manufacturing', img: '/images/applications/industrial-equipment-manufacturing.webp' }
    ],

    // ===== LEGACY FIELDS (Optional, for backwards compatibility) =====
    features: [
      "400-ton pressing force for heavy-duty applications up to 12mm thick steel",
      "4000mm working length with hydraulic crowning compensation system",
      "Delem DA-66T CNC controller with 3D simulation and offline programming",
      "Torsion bar synchronization system for ±0.01mm repeatability",
      "4+1 axis servo-electric back gauge with automatic positioning",
      "Automatic angle compensation technology for consistent bend angles",
      "Quick-change tooling system with tool database management",
      "Energy-efficient servo-hydraulic drive system reducing power consumption by 30%",
    ],

    applications: [
      {
        title: "Structural Steel Fabrication",
        description: "Ideal for bending thick steel plates used in building construction, bridge components, and heavy machinery frames. The high tonnage capacity enables efficient processing of structural steel members with minimal setup time.",
        benefits: [
          "Handles thick plates up to 12mm with ease",
          "Consistent bend quality across long workpieces",
          "High throughput for large construction projects",
          "Reduces manual handling and labor costs",
        ],
      },
      {
        title: "HVAC and Sheet Metal Work",
        description: "Perfect for high-volume production of HVAC ductwork, enclosures, and ventilation components. The precision CNC control ensures uniform bend angles critical for proper fit and assembly.",
        benefits: [
          "Fast program changeover for varied part sizes",
          "Repeatable accuracy for batch production",
          "Minimal scrap with 3D simulation preview",
        ],
      },
      {
        title: "Automotive and Transportation",
        description: "Suited for manufacturing chassis components, brackets, and structural parts for vehicles and trailers. The machine's precision and reliability meet demanding automotive quality standards.",
        benefits: [
          "Meets automotive industry tolerance requirements",
          "High-speed operation for production line integration",
          "Tool management system for quick changeover",
        ],
      },
    ],

    technicalSpecs: [
      { label: "Nominal Force", value: "400 Ton (4000 kN)" },
      { label: "Working Length", value: "4000mm" },
      { label: "Distance Between Housings", value: "3200mm" },
      { label: "Throat Depth", value: "400mm" },
      { label: "Ram Stroke", value: "200mm" },
      { label: "Open Height", value: "520mm" },
      { label: "Ram Speed - Approach", value: "120mm/s" },
      { label: "Ram Speed - Working", value: "8mm/s" },
      { label: "Ram Speed - Return", value: "100mm/s" },
      { label: "Main Motor Power", value: "37 kW" },
      { label: "CNC Controller", value: "Delem DA-66T" },
      { label: "Back Gauge Range", value: "50-1000mm" },
      { label: "Back Gauge Axis", value: "4+1 (X, R, Z1, Z2 + X Finger)" },
      { label: "Bending Accuracy", value: "±0.01mm" },
      { label: "Angle Accuracy", value: "±0.3°" },
      { label: "Oil Tank Capacity", value: "400L" },
      { label: "Machine Weight", value: "42,000 kg" },
      { label: "Machine Dimensions (L×W×H)", value: "4600×2100×3200mm" },
    ],

    leadTime: "6-8 weeks",
    relatedMachineIds: ["we67k-250-3200", "wc67y-500-6000", "we67k-160-3200"],
  },
  {
    id: "copper-wire-granulator-sg400",
    name: "SG-400 Industrial Copper Wire Granulator",
    fullName: "SG-400 Industrial Copper Wire Granulator",
    category: "recycling_equipment",
    categoryDisplay: "Recycling Machinery",
    image: "/images/products/Granulator-T1-01.webp",
    badge: "Eco Friendly",
    badgeColor: "green",
    gallery: [
      "/images/products/Granulator-T1-01.webp",
      "/images/products/Granulator-T1-02.webp",
      "/images/products/Granulator-T1-03.webp",
      "/images/products/Granulator-T1-02.webp",
    ],
    description: "Compact granulator delivering 99.9% copper-plastic separation from scrap cables.",
    fullDescription: "The SG-400 Copper Wire Granulator is a state-of-the-art recycling system engineered to maximize copper recovery. By combining heavy-duty crushing, precision air-gravity separation, and advanced dust collection, it processes a wide variety of scrap cables—including household wires, automotive cables, and industrial cords. With a recovery rate of up to 99.9%, it transforms waste into high-value clean copper granules while maintaining a dust-free and environmentally friendly operation.",
    link: "/products/machinery/copper-wire-granulator-sg400",

    // 💡 控制面板上的四个核心参数 (Dashboard Specs)
    specs: [
      { label: "Capacity", value: "200 - 400 kg/h" },
      { label: "Purity Rate", value: "≥ 99.9%" },
      { label: "Total Power", value: "35 kW" },
      { label: "Cable Diameter", value: "1 - 30 mm" }
    ],

    video: {
      url: "",
      poster: "/images/products/Granulator-T1-01.webp"
    },

    // 💡 核心功能介绍 (Z-Pattern Layout)
    components: [
      {
        id: "heavy-duty-crusher",
        tag: "SIZE REDUCTION",
        title: "Heavy-Duty Crusher Unit",
        description: "Equipped with high-grade alloy steel blades (such as SKD-11 or D2), the primary crusher efficiently chops thick and thin cables into uniform granules, ensuring a smooth and consistent separation process downstream.",
        image: "/images/products/Granulator-T1-02.webp",
      },
      {
        id: "air-separator",
        tag: "PRECISION SEPARATION",
        title: "Advanced Air-Gravity Separator",
        description: "Utilizes precisely controlled airflow and high-frequency vibration to separate heavier copper granules from lighter plastic insulation based on specific gravity, achieving up to 99.9% purity without the use of water.",
        image: "/images/products/Granulator-T1-03.webp",
      },
      {
        id: "dust-collection",
        tag: "ENVIRONMENTAL CONTROL",
        title: "Integrated Dust Collection System",
        description: "A powerful pulse-jet dust collector captures microscopic dust and impurities generated during the crushing and separation stages, ensuring a clean, safe, and OSHA-compliant working environment.",
        image: "/images/products/Granulator-T1-01.webp",
      },
      {
        id: "plc-control",
        tag: "SMART OPERATION",
        title: "Intelligent PLC Control Panel",
        description: "Features a centralized PLC control system with an intuitive interface. Operators can easily monitor performance, adjust airflow parameters, and manage the entire recycling line with single-touch convenience.",
        image: "/images/products/Granulator-T1-02.webp",
      }
    ],

    // 💡 应用场景 (Application Gallery)
    applicationItems: [
      {
        title: 'Automotive Cables',
        img: '/images/products/Granulator-T1-01.webp'
      },
      {
        title: 'Household Wires',
        img: '/images/products/Granulator-T1-02.webp'
      },
      {
        title: 'Industrial Cables',
        img: '/images/products/Granulator-T1-03.webp'
      },
      {
        title: 'Communication Wires',
        img: '/images/products/Granulator-T1-01.webp'
      }
    ],

    // 💡 技术参数表 (Tech Specs Tabs)
    specCategories: [
      {
        id: 'performance',
        label: 'General Performance',
        specs: {
          'Processing Capacity': '200 - 400 kg/h (Varies by material)',
          'Copper Recovery Rate': '≥ 99.9%',
          'Applicable Cable Diameter': '1 mm - 30 mm',
          'Operation Type': 'Dry Separation (Eco-friendly, No Water)',
          'Noise Level': '< 80 dB'
        }
      },
      {
        id: 'electrical',
        label: 'Electrical & Power',
        specs: {
          'Total Power': 'Approx. 35 kW',
          'Main Crusher Motor': '22 kW',
          'Separator Fan Motor': '4 kW',
          'Vibration Motor': '1.5 kW',
          'Standard Voltage': '380V / 50Hz / 3Phase (Customizable)'
        }
      },
      {
        id: 'dimensions',
        label: 'Dimensions & Weight',
        specs: {
          'Overall Length': '3,500 mm',
          'Overall Width': '1,800 mm',
          'Overall Height': '2,400 mm',
          'Total Weight': 'Approx. 2,800 kg',
          'Footprint Layout': 'Compact Integrated Design'
        }
      }
    ],

    // 💡 制造工艺与品控 (Bento Grid)
    manufacturingProcess: [
      {
        id: "granulator-m1",
        number: "01",
        title: "Heavy-Duty Frame Welding",
        description: "Built with robust structural steel designed to absorb high-frequency vibrations during the intense crushing process, ensuring decades of stability.",
        image: "/images/products/Granulator-T1-03.webp",
        size: "large"
      },
      {
        id: "granulator-m2",
        number: "02",
        title: "Dynamic Rotor Balancing",
        image: "/images/products/Granulator-T1-01.webp",
        size: "small"
      },
      {
        id: "granulator-m3",
        number: "03",
        title: "Airflow System Calibration",
        image: "/images/products/Granulator-T1-02.webp",
        size: "small"
      }
    ],
    tonnage: "heavy",
  },
  {
    id: "qc11k-12-3200",
    name: "QC11K-12×3200",
    fullName: "QC11K-12×3200 Shearing Machine",
    category: "shearing",
    categoryDisplay: "Shearing Machine",
    tonnage: "heavy",
    image: "/images/products/machinery_05.webp",
    badge: "Heavy Duty",
    badgeColor: "slate",
    description: "Hydraulic guillotine beam shear with variable rake angle for minimal deformation.",
    link: "/products/machinery/qc11k-12-3200",
    specs: [
      { label: "Thickness", value: "12mm" },
      { label: "Length", value: "3200mm" },
      { label: "Motor", value: "45kW" },
      { label: "Type", value: "Hydraulic" },
    ],
  },
  {
    id: "w11s-30-3000",
    name: "W11S-30×3000",
    fullName: "W11S-30×3000 Plate Rolling Machine",
    category: "rolling",
    categoryDisplay: "Rolling Machine",
    tonnage: "medium",
    image: "/images/products/machinery_03.webp",
    badge: "New Arrival",
    badgeColor: "slate",
    description: "Three-roll symmetric structure for efficient plate bending with adjustable edge pre-bend.",
    link: "/products/machinery/w11s-30-3000",
    specs: [
      { label: "Capacity", value: "30mm" },
      { label: "Width", value: "3000mm" },
      { label: "Motor", value: "37kW" },
      { label: "Type", value: "3-Roll" },
    ],
  },
  {
    id: "j23-63t",
    name: "J23-63T",
    fullName: "J23-63T Punching Machine",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "medium",
    image: "/images/products/machinery_04.webp",
    badge: "Hot Sale",
    badgeColor: "red",
    description: "High-speed mechanical press with C-frame structure for stamping and forming operations.",
    link: "/products/machinery/j23-63t",
    specs: [
      { label: "Capacity", value: "63 Ton" },
      { label: "Stroke", value: "80mm" },
      { label: "Table", value: "630mm" },
      { label: "SPM", value: "120/min" },
    ],
  },
  {
    id: "we67k-250-3200",
    name: "WE67K-250/3200",
    fullName: "WE67K-250/3200 NC Folding Machine",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "heavy",
    image: "/images/products/machinery.webp",
    badge: "Popular",
    badgeColor: "blue",
    description: "Precision NC controlled bending with synchronized dual cylinders and independent axis control.",
    link: "/products/machinery/we67k-250-3200",
    specs: [
      { label: "Force", value: "250 Ton" },
      { label: "Length", value: "3200mm" },
      { label: "Controller", value: "Cybelec" },
      { label: "Axis", value: "2+1" },
    ],
  },
  {
    id: "qc12k-10-2500",
    name: "QC12K-10×2500",
    fullName: "QC12K-10×2500 Guillotine Shear",
    category: "shearing",
    categoryDisplay: "Shearing Machine",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Professional",
    badgeColor: "slate",
    description: "Heavy-duty guillotine designed for thick plate cutting with minimal material waste.",
    link: "/products/machinery/qc12k-10-2500",
    specs: [
      { label: "Thickness", value: "10mm" },
      { label: "Length", value: "2500mm" },
      { label: "Motor", value: "40kW" },
      { label: "Speed", value: "40 cuts/min" },
    ],
  },
  {
    id: "crf-300",
    name: "CRF-300",
    fullName: "CRF-300 Roll Forming Machine",
    category: "rolling",
    categoryDisplay: "Rolling Machine",
    tonnage: "light",
    image: "/images/products/machinery.webp",
    badge: "Advanced",
    badgeColor: "purple",
    description: "Automatic roll forming system for continuous metal profile production with precise tolerances.",
    link: "/products/machinery/crf-300",
    specs: [
      { label: "Max Width", value: "300mm" },
      { label: "Speed", value: "50m/min" },
      { label: "Stations", value: "12" },
      { label: "Power", value: "75kW" },
    ],
  },
  {
    id: "y32-300t",
    name: "Y32-300T",
    fullName: "Y32-300T Hydraulic Press",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "heavy",
    image: "/images/products/machinery.webp",
    badge: "Featured",
    badgeColor: "orange",
    description: "Industrial hydraulic press for compression, forging and metal forming applications with wide platform.",
    link: "/products/machinery/y32-300t",
    specs: [
      { label: "Capacity", value: "300 Ton" },
      { label: "Platform", value: "1000×800mm" },
      { label: "Stroke", value: "200mm" },
      { label: "Power", value: "55kW" },
    ],
  },
  {
    id: "tcl-1325af",
    name: "TCL-1325AF",
    fullName: "TCL-1325AF Turret Punch Press",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "light",
    image: "/images/products/machinery.webp",
    badge: "Premium",
    badgeColor: "teal",
    description: "Multi-tool turret press for high-speed punching with automatic tool changer and CNC control.",
    link: "/products/machinery/tcl-1325af",
    specs: [
      { label: "Capacity", value: "30 Ton" },
      { label: "Table Size", value: "1300×2500mm" },
      { label: "Tools", value: "40+" },
      { label: "SPM", value: "200/min" },
    ],
  },
  // 🆕 New Products (Test Data)
  {
    id: "wc67y-500-6000",
    name: "WC67Y-500/6000",
    fullName: "WC67Y-500/6000 CNC Press Brake",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "heavy",
    image: "/images/products/machinery.webp",
    badge: "Flagship",
    badgeColor: "orange",
    description: "Ultra-heavy duty CNC press brake with dual servo motors and intelligent crowning system.",
    link: "/products/machinery/wc67y-500-6000",
    specs: [
      { label: "Force", value: "500 Ton" },
      { label: "Length", value: "6000mm" },
      { label: "Controller", value: "Delem DA-69T" },
      { label: "Axis", value: "8+1" },
    ],
  },
  {
    id: "qc11y-16-4000",
    name: "QC11Y-16×4000",
    fullName: "QC11Y-16×4000 Hydraulic Shearing Machine",
    category: "shearing",
    categoryDisplay: "Shearing Machine",
    tonnage: "heavy",
    image: "/images/products/machinery.webp",
    badge: "Industrial",
    badgeColor: "slate",
    description: "Heavy-duty guillotine shear with integrated NC back gauge and hydraulic blade gap adjustment.",
    link: "/products/machinery/qc11y-16-4000",
    specs: [
      { label: "Thickness", value: "16mm" },
      { label: "Length", value: "4000mm" },
      { label: "Motor", value: "55kW" },
      { label: "Type", value: "Hydraulic" },
    ],
  },
  {
    id: "w11s-40-4000",
    name: "W11S-40×4000",
    fullName: "W11S-40×4000 Plate Rolling Machine",
    category: "rolling",
    categoryDisplay: "Rolling Machine",
    tonnage: "heavy",
    image: "/images/products/machinery.webp",
    badge: "Heavy Duty",
    badgeColor: "slate",
    description: "Three-roll symmetric plate bending machine with pre-bending capability for large diameter cylinders.",
    link: "/products/machinery/w11s-40-4000",
    specs: [
      { label: "Capacity", value: "40mm" },
      { label: "Width", value: "4000mm" },
      { label: "Motor", value: "55kW" },
      { label: "Type", value: "3-Roll" },
    ],
  },
  {
    id: "j21s-125t",
    name: "J21S-125T",
    fullName: "J21S-125T Mechanical Power Press",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Reliable",
    badgeColor: "blue",
    description: "Deep-throat mechanical press with pneumatic friction clutch for precision stamping operations.",
    link: "/products/machinery/j21s-125t",
    specs: [
      { label: "Capacity", value: "125 Ton" },
      { label: "Stroke", value: "130mm" },
      { label: "Table", value: "800×630mm" },
      { label: "SPM", value: "55/min" },
    ],
  },
  {
    id: "we67k-160-3200",
    name: "WE67K-160/3200",
    fullName: "WE67K-160/3200 Electro-Hydraulic Press Brake",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Smart",
    badgeColor: "purple",
    description: "Electro-hydraulic sync press brake with touchscreen NC control and automatic angle compensation.",
    link: "/products/machinery/we67k-160-3200",
    specs: [
      { label: "Force", value: "160 Ton" },
      { label: "Length", value: "3200mm" },
      { label: "Controller", value: "E21 NC" },
      { label: "Axis", value: "3+1" },
    ],
  },
  {
    id: "qc12y-8-2500",
    name: "QC12Y-8×2500",
    fullName: "QC12Y-8×2500 Swing Beam Shear",
    category: "shearing",
    categoryDisplay: "Shearing Machine",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Compact",
    badgeColor: "blue",
    description: "Swing beam shearing machine with digital readout and motorized back gauge for precise cutting.",
    link: "/products/machinery/qc12y-8-2500",
    specs: [
      { label: "Thickness", value: "8mm" },
      { label: "Length", value: "2500mm" },
      { label: "Motor", value: "30kW" },
      { label: "Speed", value: "35 cuts/min" },
    ],
  },
  {
    id: "w11-20-2500",
    name: "W11-20×2500",
    fullName: "W11-20×2500 Mechanical Rolling Machine",
    category: "rolling",
    categoryDisplay: "Rolling Machine",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Efficient",
    badgeColor: "green",
    description: "Mechanical three-roll bending machine with manual adjustment for sheet metal forming.",
    link: "/products/machinery/w11-20-2500",
    specs: [
      { label: "Capacity", value: "20mm" },
      { label: "Width", value: "2500mm" },
      { label: "Motor", value: "22kW" },
      { label: "Type", value: "Mechanical" },
    ],
  },
  {
    id: "y41-160t",
    name: "Y41-160T",
    fullName: "Y41-160T Single Column Hydraulic Press",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "medium",
    image: "/images/products/machinery.webp",
    badge: "Space Saver",
    badgeColor: "teal",
    description: "Compact single-column hydraulic press with open three-side design for easy operation.",
    link: "/products/machinery/y41-160t",
    specs: [
      { label: "Capacity", value: "160 Ton" },
      { label: "Stroke", value: "300mm" },
      { label: "Table", value: "800×700mm" },
      { label: "Power", value: "30kW" },
    ],
  },
  {
    id: "we67k-100-2500",
    name: "WE67K-100/2500",
    fullName: "WE67K-100/2500 NC Press Brake",
    category: "press_brake",
    categoryDisplay: "Press Brake",
    tonnage: "light",
    image: "/images/products/machinery.webp",
    badge: "Entry Level",
    badgeColor: "green",
    description: "Economical NC press brake perfect for small workshops and light fabrication work.",
    link: "/products/machinery/we67k-100-2500",
    specs: [
      { label: "Force", value: "100 Ton" },
      { label: "Length", value: "2500mm" },
      { label: "Controller", value: "MD11" },
      { label: "Axis", value: "2+1" },
    ],
  },
  {
    id: "qc11y-6-2500",
    name: "QC11Y-6×2500",
    fullName: "QC11Y-6×2500 Hydraulic Guillotine Shear",
    category: "shearing",
    categoryDisplay: "Shearing Machine",
    tonnage: "light",
    image: "/images/products/machinery.webp",
    badge: "Best Value",
    badgeColor: "green",
    description: "Entry-level hydraulic shear with manual back gauge for light-duty cutting applications.",
    link: "/products/machinery/qc11y-6-2500",
    specs: [
      { label: "Thickness", value: "6mm" },
      { label: "Length", value: "2500mm" },
      { label: "Motor", value: "22kW" },
      { label: "Type", value: "Hydraulic" },
    ],
  },
];

/**
 * Helper function to get badge styling based on color
 */
export const getBadgeClasses = (color?: string): string => {
  const baseClasses = "absolute top-4 left-4 z-10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border";

  switch (color) {
    case "green":
      return `${baseClasses} bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800`;
    case "blue":
      return `${baseClasses} bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800`;
    case "red":
      return `${baseClasses} bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800`;
    case "purple":
      return `${baseClasses} bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800`;
    case "orange":
      return `${baseClasses} bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800`;
    case "teal":
      return `${baseClasses} bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800`;
    case "slate":
    default:
      return `${baseClasses} bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700`;
  }
};

/**
 * Get a machine by its ID
 */
export function getMachineById(id: string): Machine | undefined {
  return machines.find((m) => m.id === id);
}

/**
 * Get related machines (same category, excluding current machine)
 */
export function getRelatedMachines(currentId: string, limit = 4): Machine[] {
  const current = getMachineById(currentId);
  if (!current) return [];

  return machines
    .filter((m) => m.category === current.category && m.id !== currentId)
    .slice(0, limit);
}
