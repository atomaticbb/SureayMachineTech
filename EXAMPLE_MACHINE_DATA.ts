/**
 * EXAMPLE DATA - Complete Machine Object
 *
 * This file shows how to create a fully populated machine object
 * with all the new data-driven fields for the refactored MachineDetail page.
 *
 * Copy this structure to client/src/data/machines.ts and customize for your products.
 */

import { Machine } from "./machines";

export const EXAMPLE_MACHINE: Machine = {
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
        'Tonnage': '275 – 1100 US tons',
        'Bending Length': '10.2 – 33.4 ft',
        'Open Height': '21.6 – 25.5 in',
        'Standard Stroke': '10.4 – 14.3 in',
        'Max. High Speed': '5.1 in/s',
        'Max. Working Speed': '0.4 in/s'
      }
    },
    {
      id: 'control',
      label: 'CNC & Hydraulics',
      specs: {
        'CNC Controller': 'Delem DA-66T / Cybelec ModEva 12PS',
        'Back Gauge Axes': '4-Axis (X, R, Z1, Z2)',
        'Positioning Accuracy': '±0.004 in (±0.1 mm)',
        'Hydraulic System': 'Proportional valve control',
        'Motor Power': '22 – 45 kW',
        'Working Pressure': '2500 PSI'
      }
    },
    {
      id: 'dimensions',
      label: 'Dimensions & Weight',
      specs: {
        'Machine Length': '13.1 – 36.4 ft',
        'Machine Width': '6.2 – 10.5 ft',
        'Machine Height': '10.8 – 15.7 ft',
        'Total Weight': '16,500 – 88,000 lbs',
        'Throat Depth': '15.7 – 19.7 in',
        'Table Width': '3.9 – 5.9 in'
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
  leadTime: "6-8 weeks",
  relatedMachineIds: ["we67k-250-3200", "wc67y-500-6000", "we67k-160-3200"],

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
};

/**
 * HOW TO USE THIS EXAMPLE:
 *
 * 1. Copy the structure above
 * 2. Paste it into client/src/data/machines.ts
 * 3. Replace the existing machine object
 * 4. Customize the data for your product
 * 5. Test at /products/machinery/wc67k-400-4000
 *
 * TIPS:
 * - All new fields are OPTIONAL
 * - If omitted, the page uses default data
 * - Mix and match: use some new fields, keep some defaults
 * - Images should be in /public/images/
 */
