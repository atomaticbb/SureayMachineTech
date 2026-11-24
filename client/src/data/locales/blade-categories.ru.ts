// Generated from the English industrial blade catalog (ru).
import type { BladeCategoryMeta } from "../blade-categories";

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Ножи для продольной резки и дисковые ножи",
    seoTitle: "Ротационные ножи и дисковые лезвия для продольной резки",
    shortName: "Ножи для продольной резки",
    tagline:
      "Ножи для продольной резки полотна, обработки рулонов металла и переработки гофрокартона",
    heroImage: "/images/categories/slitter-knives-nav.webp",
    description:
      "Изучите ножи для продольной резки пленки, бумаги, нетканых материалов, медной и алюминиевой фольги, стальных рулонов и батарей. Сравните типы лезвий, нижние кольца и твердосплавные варианты.",
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Ножи и изнашиваемые детали для шредеров",
    shortName: "Ножи для шредеров",
    tagline: "Роторные вставки, стационарные ножи, сита и фрезы на валу",
    heroImage: "/images/categories/shredder-blades-nav.webp",
    description:
      "Выбирайте многовалковые фрезы для общей переработки, металлолома, шин или предварительного измельчения аккумуляторов. Найдите одновальные роторные вставки, стационарные ножи и сита.",
    selectionGuide: {
      title: "Руководство по выбору лезвия измельчителя",
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
          title: "Многовальные фрезы по применению",
          description:
            "Начните с того, что попадает в измельчитель. Затем используйте модель машины и комплект фрез, чтобы определить правильную замену.",
          productIds: [
            "twin-shaft-blades-recycling",
            "multi-shaft-blades-metal",
            "tire-shredder-blades",
            "twin-shaft-blades-battery",
          ],
        },
        {
          id: "single-shaft-parts",
          title: "Детали одновального измельчителя и гранулятора",
          description:
            "Ножи ротора режут неподвижные ножи статора. Экран контролирует, какой материал может выходить из камеры.",
          productIds: [
            "single-shaft-shredder-blades",
            "single-shaft-bed-knives",
            "shredder-screens",
            "granulator-blades",
          ],
        },
      ],
      quotePrompt:
        "Укажите модель машины, номер детали, сырье и количество. Прикрепите чертеж резака или экрана, если таковой имеется.",
    },
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title:
      "Дисковые ножи для рулонов санитарно-гигиенической бумаги и нетканых материалов",
    shortName: "Дисковые ножи для резки рулонов",
    tagline: "Сменные дисковые ножи по материалу рулона",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Сравните дисковые ножи для резки рулонов туалетной бумаги, бумажных полотенец и нетканого материала для салфеток. Для подбора ножа укажите материал рулона и модель пилы.",
    seoTitle:
      "Дисковые ножи для рулонов санитарно-гигиенической бумаги и нетканых материалов",
    selectionGuide: {
      title: "Как выбрать дисковый нож для резки рулонов",
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
          title: "Рулоны туалетной бумаги и бумажных полотенец",
          productIds: ["tissue-log-saw-blades"],
        },
        {
          id: "nonwoven-logs",
          title: "Рулоны нетканого полотна и материала для салфеток",
          productIds: ["nonwoven-log-saw-blades"],
        },
      ],
      quotePrompt:
        "Укажите модель пилы, материал рулона, диаметр полотна, расположение отверстия и приводного пальца, а также прикрепите чертеж, если таковой имеется.",
    },
  },
  {
    slug: "shear-blades",
    category: "shear_blades",
    title: "Ножи для резки металла на ножницах",
    seoTitle: "Ножи для резки листового и рулонного металла и металлолома",
    shortName: "Ножи для резки металла на ножницах",
    tagline: "Сменные ножи на станции резки металла",
    heroImage: "/images/categories/shear-blades-nav.webp",
    description:
      "Выбирайте гильотины, летучие ножницы и ножи для измельчения лома, а также стационарные ножницы и ножницы для резки из крокодиловой кожи. Совместите положение машины и ножа.",
    selectionGuide: {
      title: "Руководство по выбору ножей для резки металла",
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
          title: "Листовой металл, рулонные линии и прокатные станы",
          description:
            "Выбирайте автономные ножи для резки листового металла, летающие ножницы для резки или ножи для обрезки кромок.",
          productIds: [
            "guillotine-shear-blades",
            "flying-shear-blades",
            "scrap-chopper-blades",
          ],
        },
        {
          id: "scrap-recycling-shears",
          title: "Ножницы для переработки лома",
          description:
            "Прежде чем выбирать сменный нож, определите ножницы типа «аллигатор» с шарнирными челюстями или стационарные ножницы для лома.",
          productIds: ["metal-shear-knives", "stationary-scrap-shear-blades"],
        },
      ],
      quotePrompt:
        "Укажите модель машины, положение лезвия, материал и толщину или размер сечения, а также прикрепите чертеж ножа.",
    },
  },
  {
    slug: "paper-cutting-knives",
    category: "paper_cutting",
    title: "Ножи для резки и подрезки бумаги",
    shortName: "Ножи для резки бумаги",
    tagline:
      "Ножи для стопок бумаги, рулонной пленки и послепечатной обработки",
    heroImage: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    description:
      "Выберите ножи для одноножевой бумагорезальной машины, поперечной резки бумаги на листы, трёхсторонней обрезки книжных блоков или линии шитья внакидку. Сверьте узел резки, позицию ножа и чертёж машины.",
    selectionGuide: {
      title: "Руководство по выбору ножа для резки бумаги",
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
          title: "Резка стопки бумаги и рулонная бумага",
          description:
            "Отличие резки стопки бумаги с зажимом от поперечной резки непрерывного полотна на листы.",
          productIds: ["paper-cutting-blades", "paper-sheeter-knives"],
        },
        {
          id: "print-finishing",
          title: "Отделка книг и печати",
          description:
            "Выберите комплект ножей для машины трёхсторонней обрезки или линии шитья внакидку. Уточните передние, боковые, верхние и нижние позиции.",
          productIds: [
            "three-knife-trimmer-blades",
            "saddle-stitcher-trimmer-knives",
          ],
        },
      ],
      quotePrompt:
        "Укажите модель и версию машины, положения ножей, характеристики бумаги или картона, а также оригинальные чертежи ножей.",
    },
  },
  {
    slug: "other-custom-blades",
    category: "custom_profile",
    title: "Прочие ножи и ножи на заказ",
    shortName: "Прочие и на заказ",
    tagline: "Режущие детали для конкретного процесса и индивидуальные профили",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "Найдите лезвия режущего уплотнителя, скребки для фильтров расплава, ножи для гранулирования и индивидуальные профили по типу процесса или детали.",
    selectionGuide: {
      title: "Руководство по выбору технологического ножа",
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
          title: "Прочие ножи и ножи на заказ",
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
        "Укажите процесс, модель машины, положение детали и размеры чертежа или образца.",
    },
  },
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Ножи и контрножи для рубительных машин",
    shortName: "Ножи для рубительных машин",
    tagline: "Подвижные ножи и стационарные контрножи",
    heroImage:
      "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Найдите движущиеся ножи измельчителя и стационарные наковальни для барабанных и дисковых измельчителей древесины. Сравните их роли, затем сопоставьте замену с машиной.",
    seoTitle: "Ножи и контрножи для барабанных и дисковых рубительных машин",
    selectionGuide: {
      title: "Руководство по выбору ножа для измельчения древесины",
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
          title: "Передвижные ножи измельчителя",
          productIds: ["wood-chipper-blades"],
        },
        {
          id: "stationary-anvils",
          title: "Стационарные наковальни",
          productIds: ["wood-chipper-anvils"],
        },
      ],
      quotePrompt:
        "Укажите модель и серийный номер измельчителя, тип барабана или диска, положение ножа или упора, а также чертеж или размеры образца.",
    },
  },
];
