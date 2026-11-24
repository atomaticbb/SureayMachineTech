// Generated from the English industrial blade catalog (pt).
import type { BladeCategoryMeta } from "../blade-categories";

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Facas de corte longitudinal e lâminas circulares",
    seoTitle: "Facas rotativas e lâminas circulares para corte longitudinal",
    shortName: "Facas de corte longitudinal",
    tagline:
      "Facas para corte de bandas, processamento de bobinas metálicas e conversão de papelão ondulado",
    heroImage: "/images/categories/slitter-knives-nav.webp",
    description:
      "Explore facas cortadoras para filme, papel, não-tecidos, folhas de cobre e alumínio, bobinas de aço e baterias. Compare tipos de lâminas, anéis inferiores e opções de metal duro.",
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Facas e peças de desgaste para trituradores",
    shortName: "Facas para trituradores",
    tagline:
      "Insertos de rotor, facas estacionárias, peneiras e fresas montadas em eixo",
    heroImage: "/images/categories/shredder-blades-nav.webp",
    description:
      "Escolha cortadores de vários eixos para reciclagem geral, sucata, pneus ou pré-trituração de baterias. Encontre insertos de rotor de eixo único, facas estacionárias e telas.",
    selectionGuide: {
      title: "Guia de seleção de lâmina trituradora",
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
          title: "Cortadores multieixos por aplicação",
          description:
            "Comece com o que vai para a trituradora. Em seguida, use o modelo da máquina e a pilha de cortadores para identificar a substituição correta.",
          productIds: [
            "twin-shaft-blades-recycling",
            "multi-shaft-blades-metal",
            "tire-shredder-blades",
            "twin-shaft-blades-battery",
          ],
        },
        {
          id: "single-shaft-parts",
          title: "Peças para triturador e granulador de eixo único",
          description:
            "As facas do rotor cortam as facas estacionárias do estator. A tela controla qual material pode sair da câmara.",
          productIds: [
            "single-shaft-shredder-blades",
            "single-shaft-bed-knives",
            "shredder-screens",
            "granulator-blades",
          ],
        },
      ],
      quotePrompt:
        "Inclua o modelo da máquina, número da peça, matéria-prima e quantidade. Anexe um cortador ou desenho de tela, se disponível.",
    },
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title: "Lâminas de serra para rolos de papel tissue e não tecido",
    shortName: "Lâminas de serra para rolos",
    tagline: "Lâminas circulares de reposição por material do rolo",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Compare as lâminas circulares para cortar rolos de papel higiênico, papel-toalha e não tecido para lenços. Identifique o material do rolo e o modelo da serra para selecionar a lâmina.",
    seoTitle: "Lâminas de serra para rolos de papel tissue e não tecido",
    selectionGuide: {
      title: "Guia de seleção de lâminas para corte de rolos",
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
          title: "Rolos de papel higiênico e papel-toalha",
          productIds: ["tissue-log-saw-blades"],
        },
        {
          id: "nonwoven-logs",
          title: "Rolos de não tecido e de material para lenços",
          productIds: ["nonwoven-log-saw-blades"],
        },
      ],
      quotePrompt:
        "Inclua o modelo da serra, o material do rolo, o diâmetro da lâmina, o furo e o layout do pino de acionamento e anexe um desenho, se disponível.",
    },
  },
  {
    slug: "shear-blades",
    category: "shear_blades",
    title: "Facas para tesouras de metal",
    seoTitle: "Facas de cisalha para chapas, bobinas metálicas e sucata",
    shortName: "Facas para tesouras de metal",
    tagline: "Substituição de facas por estação de corte de metal",
    heroImage: "/images/categories/shear-blades-nav.webp",
    description:
      "Escolha facas de guilhotina, tesoura voadora e picadora de sucata, além de facas de cisalhamento fixas e de sucata de jacaré. Combine a posição da máquina e da faca.",
    selectionGuide: {
      title: "Guia de seleção de lâmina de cisalhamento de metal",
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
          title: "Chapas metálicas, linhas de bobinas e laminadores",
          description:
            "Escolha facas de cisalhamento independentes para chapas metálicas, facas de cisalhamento voadoras para laminação ou facas picadoras de corte de borda.",
          productIds: [
            "guillotine-shear-blades",
            "flying-shear-blades",
            "scrap-chopper-blades",
          ],
        },
        {
          id: "scrap-recycling-shears",
          title: "Tesouras para reciclagem de sucata",
          description:
            "Identifique uma tesoura jacaré de mandíbula articulada ou uma tesoura de sucata estacionária antes de escolher a faca de reposição.",
          productIds: ["metal-shear-knives", "stationary-scrap-shear-blades"],
        },
      ],
      quotePrompt:
        "Inclua o modelo da máquina, posição da lâmina, material e espessura ou tamanho da seção e anexe o desenho da faca.",
    },
  },
  {
    slug: "paper-cutting-knives",
    category: "paper_cutting",
    title: "Facas de corte e refile de papel",
    shortName: "Facas de corte de papel",
    tagline:
      "Facas para pilhas de papel, folhas de teia e acabamento de impressão",
    heroImage: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    description:
      "Escolha facas de guilhotina de papel, facas cortadoras, lâminas aparadoras de três facas e facas de grampeador. Combine a estação de corte, a posição da faca e o desenho da máquina.",
    selectionGuide: {
      title: "Guia de seleção de faca para corte de papel",
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
          title: "Corte de pilha de papel e folhas de teia",
          description:
            "Distinguir o corte de pilha de papel fixado do corte transversal de folha contínua em folhas.",
          productIds: ["paper-cutting-blades", "paper-sheeter-knives"],
        },
        {
          id: "print-finishing",
          title: "Acabamento de livro e impressão",
          description:
            "Escolha o conjunto de facas para um aparador de três facas ou linha de costura de lombada. Confirme as posições frontal, lateral, superior e inferior.",
          productIds: [
            "three-knife-trimmer-blades",
            "saddle-stitcher-trimmer-knives",
          ],
        },
      ],
      quotePrompt:
        "Inclua o modelo e a versão da máquina, as posições das facas, as especificações do papel ou cartão e os desenhos originais das facas.",
    },
  },
  {
    slug: "other-custom-blades",
    category: "custom_profile",
    title: "Outras facas e facas sob medida",
    shortName: "Outras e sob medida",
    tagline: "Peças de corte específicas do processo e perfis personalizados",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "Encontre lâminas compactadoras de corte, raspadores de filtro de fusão, facas de pelotização e perfis personalizados por processo ou tipo de peça.",
    selectionGuide: {
      title: "Guia de seleção de faca de processo",
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
          title: "Outras facas e facas sob medida",
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
        "Inclua o processo, modelo da máquina, posição da peça e um desenho ou dimensões de amostra.",
    },
  },
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Facas e contrafacas para picadores de madeira",
    shortName: "Facas para picadores de madeira",
    tagline: "Facas móveis e contrafacas estacionárias",
    heroImage:
      "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Encontre facas picadoras móveis e bigornas estacionárias para picadores de madeira de tambor e disco. Compare suas funções e, em seguida, combine o substituto com a máquina.",
    seoTitle:
      "Facas e contrafacas para picadores de madeira a tambor e a disco",
    selectionGuide: {
      title: "Guia de seleção de faca picadora de madeira",
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
          title: "Movendo facas picadoras",
          productIds: ["wood-chipper-blades"],
        },
        {
          id: "stationary-anvils",
          title: "Bigornas Estacionárias",
          productIds: ["wood-chipper-anvils"],
        },
      ],
      quotePrompt:
        "Inclua o modelo e número de série do picador, tipo de tambor ou disco, posição da faca ou bigorna e um desenho ou dimensões de amostra.",
    },
  },
];
