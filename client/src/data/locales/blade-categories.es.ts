// Generated from the English industrial blade catalog (es).
import type { BladeCategoryMeta } from "../blade-categories";

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Cuchillas de corte longitudinal y cuchillas circulares",
    seoTitle: "Cuchillas rotativas y circulares para corte longitudinal",
    shortName: "Cuchillas de corte longitudinal",
    tagline:
      "Cuchillas para corte longitudinal de bobinas, procesamiento de bobinas metálicas y conversión de cartón corrugado",
    heroImage: "/images/categories/slitter-knives-nav.webp",
    description:
      "Explore las cuchillas cortadoras para películas, papel, telas no tejidas, láminas de cobre y aluminio, bobinas de acero y baterías. Compare tipos de hojas, anillos inferiores y opciones de carburo.",
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Cuchillas y piezas de desgaste para trituradoras",
    shortName: "Cuchillas para trituradoras",
    tagline:
      "Insertos de rotor, cuchillas estacionarias, cribas y cortadores montados en eje",
    heroImage: "/images/categories/shredder-blades-nav.webp",
    description:
      "Elija cortadoras de ejes múltiples para reciclaje general, chatarra, neumáticos o pretrituración de baterías. Encuentre insertos de rotor de un solo eje, cuchillas estacionarias y cribas.",
    selectionGuide: {
      title: "Guía de selección de cuchillas trituradoras",
      articles: [
        {
          id: "single-shaft-shredder-blade-face-profile-guide",
          width: 800,
          height: 800,
          smallerWidths: [320, 400, 640],
        },
        {
          id: "tire-shredder-blade-wear-steel-cord",
          width: 2496,
          height: 1696,
          smallerWidths: [400, 800],
        },
        {
          id: "granulator-rotor-bed-knife-configuration",
          width: 1672,
          height: 941,
          smallerWidths: [400, 640, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "twin-and-multi-shaft-cutters",
          title: "Cortadores de ejes múltiples por aplicación",
          description:
            "Comience con lo que va a la trituradora. Luego utilice el modelo de la máquina y la pila de cortadores para identificar el reemplazo correcto.",
          productIds: [
            "twin-shaft-blades-recycling",
            "multi-shaft-blades-metal",
            "tire-shredder-blades",
            "twin-shaft-blades-battery",
          ],
        },
        {
          id: "single-shaft-parts",
          title: "Piezas para trituradora y granuladora de un solo eje",
          description:
            "Las cuchillas del rotor cortan contra las cuchillas del estator estacionarias. La pantalla controla qué material puede salir de la cámara.",
          productIds: [
            "single-shaft-shredder-blades",
            "single-shaft-bed-knives",
            "shredder-screens",
            "granulator-blades",
          ],
        },
      ],
      quotePrompt:
        "Incluya el modelo de la máquina, el número de pieza, la materia prima y la cantidad. Adjunte un cortador o un dibujo de pantalla si está disponible.",
    },
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title: "Discos de sierra para rollos de papel tisú y no tejidos",
    shortName: "Discos de sierra para rollos",
    tagline: "Discos de recambio según el material del rollo",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Compare discos para cortar rollos de papel higiénico, papel de cocina y material no tejido para toallitas. Para elegir el disco, identifique el material del rollo y el modelo de sierra.",
    seoTitle: "Discos de sierra para rollos de papel tisú y no tejidos",
    selectionGuide: {
      title: "Guía para elegir discos de corte de rollos",
      articles: [
        {
          id: "log-saw-blade-chipping-causes-prevention",
          width: 1600,
          height: 878,
          smallerWidths: [400, 800],
        },
        {
          id: "log-saw-blade-bevel-angles",
          width: 1108,
          height: 1108,
          smallerWidths: [320, 400, 480, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "tissue-and-towel-logs",
          title: "Rollos de papel higiénico y de cocina",
          productIds: ["tissue-log-saw-blades"],
        },
        {
          id: "nonwoven-logs",
          title: "Rollos de material no tejido y de toallitas",
          productIds: ["nonwoven-log-saw-blades"],
        },
      ],
      quotePrompt:
        "Incluya el modelo de sierra, el material en rollo, el diámetro de la hoja, la disposición del orificio y del pasador de accionamiento y adjunte un dibujo si está disponible.",
    },
  },
  {
    slug: "shear-blades",
    category: "shear_blades",
    title: "Cuchillas para cizallas de metal",
    seoTitle: "Cuchillas de cizalla para chapa, bobinas metálicas y chatarra",
    shortName: "Cuchillas para cizallas de metal",
    tagline: "Cuchillas de repuesto por estación de corte de metal",
    heroImage: "/images/categories/shear-blades-nav.webp",
    description:
      "Elija cuchillas de guillotina, cizalla voladora y cortadoras de chatarra, además cuchillas de cizalla cizalla estacionarias y de cocodrilo. Haga coincidir la posición de la máquina y la cuchilla.",
    selectionGuide: {
      title: "Guía de selección de hojas de corte para metal",
      articles: [
        {
          id: "guillotine-shear-blade-clearance-setting",
          width: 1200,
          height: 960,
          smallerWidths: [400, 640, 800],
        },
        {
          id: "guillotine-shear-blade-parallelism",
          image: "/images/news/guillotine-shear-blade-parallelism-cover.webp",
          width: 990,
          height: 742,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "metal-shearing",
          title: "Líneas de chapa metálica, bobinas y laminadores",
          description:
            "Elija cuchillas de corte para chapa metálica independientes, cuchillas de cizalla voladoras de laminador o cuchillas cortadoras de corte de bordes.",
          productIds: [
            "guillotine-shear-blades",
            "flying-shear-blades",
            "scrap-chopper-blades",
          ],
        },
        {
          id: "scrap-recycling-shears",
          title: "Cizallas para reciclaje de chatarra",
          description:
            "Identifique una cizalla tipo cocodrilo con mandíbula articulada o una cizalla para chatarra estacionaria antes de elegir la cuchilla de repuesto.",
          productIds: ["metal-shear-knives", "stationary-scrap-shear-blades"],
        },
      ],
      quotePrompt:
        "Incluya el modelo de la máquina, la posición de la hoja, el material y el espesor o tamaño de la sección, y adjunte el dibujo de la cuchilla.",
    },
  },
  {
    slug: "paper-cutting-knives",
    category: "paper_cutting",
    title: "Cuchillas de corte y recorte de papel",
    shortName: "Cuchillas para corte de papel",
    tagline:
      "Cuchillas para pilas de papel, láminas web y acabado de impresión",
    heroImage: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    description:
      "Elija cuchillas de guillotina para papel, cuchillas laminadoras, cuchillas cortadoras de tres cuchillas y cuchillas para encuadernación. Haga coincidir la estación de corte, la posición de la cuchilla y el dibujo de la máquina.",
    selectionGuide: {
      title: "Guía de selección de cuchillas para cortar papel",
      articles: [
        {
          id: "paper-guillotine-knives-selection-maintenance-guide",
          width: 1200,
          height: 537,
          smallerWidths: [400, 800],
        },
        {
          id: "custom-length-guillotine-paper-cutter-blades",
          width: 1122,
          height: 1402,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      groups: [
        {
          id: "paper-cutting",
          title: "Corte de pilas de papel y láminas web",
          description:
            "Distinga el corte de pilas de papel sujetas con abrazaderas del corte transversal de banda continua en hojas.",
          productIds: ["paper-cutting-blades", "paper-sheeter-knives"],
        },
        {
          id: "print-finishing",
          title: "Acabado de libros e impresiones",
          description:
            "Elija el juego de cuchillas para una recortadora de tres cuchillas o una línea de encuadernación. Confirme las posiciones frontal, lateral, superior e inferior.",
          productIds: [
            "three-knife-trimmer-blades",
            "saddle-stitcher-trimmer-knives",
          ],
        },
      ],
      quotePrompt:
        "Incluya el modelo y la versión de la máquina, las posiciones de las cuchillas, las especificaciones del papel o cartón y los dibujos originales de las cuchillas.",
    },
  },
  {
    slug: "other-custom-blades",
    category: "custom_profile",
    title: "Otras cuchillas y cuchillas a medida",
    shortName: "Otras y a medida",
    tagline:
      "Piezas de corte específicas del proceso y perfiles personalizados",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "Encuentre cuchillas cortadoras compactadoras, raspadores de filtro de material fundido, cuchillas peletizadoras y perfiles personalizados por proceso o tipo de pieza.",
    selectionGuide: {
      title: "Guía de selección de cuchillas de proceso",
      articles: [
        {
          id: "cutter-compactor-blade-film-vs-flake-wear",
          width: 1600,
          height: 900,
          smallerWidths: [400, 640, 800],
        },
        {
          id: "how-to-spec-die-face-cutting-knives",
          width: 1600,
          height: 900,
          smallerWidths: [400, 800],
        },
        {
          id: "melt-filter-scraper-blade-daily-maintenance-checklist",
          width: 1280,
          height: 720,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      layout: "flat",
      groups: [
        {
          id: "products",
          title: "Otras cuchillas y cuchillas a medida",
          productIds: [
            "cutter-compactor-blades",
            "continuous-melt-filter-scraper-blades",
            "strand-pelletizer-rotors",
            "die-face-cutting-knives",
            "special-shaped-blades",
          ],
        },
      ],
      quotePrompt:
        "Incluya el proceso, el modelo de la máquina, la posición de la pieza y un dibujo o dimensiones de muestra.",
    },
  },
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Cuchillas y contracuchillas para astilladoras de madera",
    shortName: "Cuchillas para astilladoras de madera",
    tagline: "Cuchillas móviles y contracuchillas fijas",
    heroImage:
      "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Encuentre cuchillas trituradoras móviles y yunques estacionarios para trituradoras de madera de tambor y disco. Compare sus roles y luego haga coincidir el reemplazo con la máquina.",
    seoTitle:
      "Cuchillas y contracuchillas para astilladoras de tambor y de disco",
    selectionGuide: {
      title: "Guía de selección de cuchillas para trituradoras de madera",
      articles: [
        {
          id: "wood-chipper-blade-wear-patterns",
          width: 1149,
          height: 766,
          smallerWidths: [320, 400, 640, 800],
        },
        {
          id: "wood-chipper-knife-sharpening-guide",
          width: 1536,
          height: 1024,
          smallerWidths: [400, 800],
        },
      ],
    },
    buyingGuide: {
      layout: "flat",
      groups: [
        {
          id: "moving-chipper-knives",
          title: "Cuchillas trituradoras móviles",
          productIds: ["wood-chipper-blades"],
        },
        {
          id: "stationary-anvils",
          title: "Yunques estacionarios",
          productIds: ["wood-chipper-anvils"],
        },
      ],
      quotePrompt:
        "Incluya el modelo de la trituradora y el número de serie, el tipo de tambor o disco, la posición de la cuchilla o yunque y un dibujo o muestra de las dimensiones.",
    },
  },
];
