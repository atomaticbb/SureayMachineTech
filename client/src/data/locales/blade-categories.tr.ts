// Generated from the English industrial blade catalog (tr).
import type { BladeCategoryMeta } from "../blade-categories";

export const BLADE_CATEGORIES: BladeCategoryMeta[] = [
  {
    slug: "slitter-knives",
    category: "slitter_knives",
    title: "Dilme bıçakları ve dairesel bıçaklar",
    seoTitle: "Döner dilme bıçakları ve dairesel kesici bıçaklar",
    shortName: "Dilme bıçakları",
    tagline: "Web dilme, metal bobin işleme ve oluklu dönüştürme için bıçaklar",
    heroImage: "/images/categories/slitter-knives-nav.webp",
    description:
      "Film, kağıt, dokunmamış kumaşlar, bakır ve alüminyum folyo, çelik bobinler ve pillere yönelik dilme bıçaklarını keşfedin. Bıçak türlerini, alt halkaları ve karbür seçeneklerini karşılaştırın.",
  },
  {
    slug: "shredder-blades",
    category: "shredder_blades",
    title: "Parçalayıcı bıçakları ve aşınma parçaları",
    shortName: "Parçalayıcı bıçakları",
    tagline: "Rotor uçları, sabit bıçaklar, elekler ve mile monteli kesiciler",
    heroImage: "/images/categories/shredder-blades-nav.webp",
    description:
      "Genel geri dönüşüm, hurda metal, lastik veya pilin ön parçalanması için çok şaftlı kesicileri seçin. Tek şaftlı rotor uçlarını, sabit bıçakları ve elekleri bulun.",
    selectionGuide: {
      title: "Parçalayıcı Bıçağı Seçim Kılavuzu",
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
          title: "Uygulamaya Göre Çok Şaftlı Kesiciler",
          description:
            "Parçalayıcıya girenlerle başlayın. Daha sonra doğru değiştirmeyi belirlemek için makine modelini ve kesici yığınını kullanın.",
          productIds: [
            "twin-shaft-blades-recycling",
            "multi-shaft-blades-metal",
            "tire-shredder-blades",
            "twin-shaft-blades-battery",
          ],
        },
        {
          id: "single-shaft-parts",
          title: "Tek Şaftlı Parçalayıcı ve Granülatör Parçaları",
          description:
            "Rotor bıçakları sabit stator bıçaklarına karşı keser. Ekran hangi malzemenin hazneden dışarı çıkabileceğini kontrol eder.",
          productIds: [
            "single-shaft-shredder-blades",
            "single-shaft-bed-knives",
            "shredder-screens",
            "granulator-blades",
          ],
        },
      ],
      quotePrompt:
        "Makine modelini, parça numarasını, hammaddeyi ve miktarını ekleyin. Varsa bir kesici veya ekran çizimi ekleyin.",
    },
  },
  {
    slug: "log-saw-blades",
    category: "log_saw_blades",
    title: "Temizlik kâğıdı ve dokusuz kumaş rulo kesme testere bıçakları",
    shortName: "Rulo kesme testere bıçakları",
    tagline: "Rulo malzemesine göre yedek dairesel bıçaklar",
    heroImage: "/images/products/blades/tissue-log-saw-blades-05.webp",
    description:
      "Tuvalet kâğıdı, kâğıt havlu ve dokunmamış mendil ruloları için dairesel bıçakları karşılaştırın. Uygun bıçağı seçmek için rulo malzemesini ve testere modelini belirleyin.",
    seoTitle: "Temizlik kâğıdı ve dokusuz kumaş rulo kesme testere bıçakları",
    selectionGuide: {
      title: "Rulo kesme testeresi bıçağı seçim kılavuzu",
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
          title: "Tuvalet kâğıdı ve kâğıt havlu ruloları",
          productIds: ["tissue-log-saw-blades"],
        },
        {
          id: "nonwoven-logs",
          title: "Dokunmamış kumaş ve mendil ruloları",
          productIds: ["nonwoven-log-saw-blades"],
        },
      ],
      quotePrompt:
        "Testere modelini, rulo malzemesini, bıçak çapını, deliği ve tahrik pimi düzenini ekleyin ve varsa bir çizim ekleyin.",
    },
  },
  {
    slug: "shear-blades",
    category: "shear_blades",
    title: "Metal makas bıçakları",
    seoTitle: "Sac, metal rulo ve hurda kesimi için makas bıçakları",
    shortName: "Metal makas bıçakları",
    tagline: "Metal kesme istasyonuna göre yedek bıçaklar",
    heroImage: "/images/categories/shear-blades-nav.webp",
    description:
      "Giyotin, uçan makas ve hurda kıyıcı bıçaklarının yanı sıra sabit ve timsah tipi hurda makaslama bıçakları seçin. Makine ve bıçağın konumunu eşleştirin.",
    selectionGuide: {
      title: "Metal Kesme Bıçağı Seçim Kılavuzu",
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
          title: "Sac Metal, Rulo Hatları ve Haddehaneler",
          description:
            "Bağımsız sac kesme bıçaklarını, haddehane uçan makaslama bıçakları veya kenar kesme kıyıcı bıçaklarını seçin.",
          productIds: [
            "guillotine-shear-blades",
            "flying-shear-blades",
            "scrap-chopper-blades",
          ],
        },
        {
          id: "scrap-recycling-shears",
          title: "Hurda Geri Dönüşüm Makasları",
          description:
            "Yedek bıçağı seçmeden önce menteşeli çeneli timsah makası veya sabit hurda makası belirleyin.",
          productIds: ["metal-shear-knives", "stationary-scrap-shear-blades"],
        },
      ],
      quotePrompt:
        "Makine modelini, bıçak konumunu, malzemeyi ve kalınlığını veya kesit boyutunu ekleyin ve bıçak çizimini ekleyin.",
    },
  },
  {
    slug: "paper-cutting-knives",
    category: "paper_cutting",
    title: "Kâğıt kesme ve tıraşlama bıçakları",
    shortName: "Kâğıt kesme bıçakları",
    tagline:
      "Kağıt yığınları, web kaplama ve baskı son işlemleri için bıçaklar",
    heroImage: "/images/products/shear-detail/paper-cutting-blades-cover.webp",
    description:
      "Kağıt giyotin bıçakları , tabakalama bıçaklarını, üç bıçaklı düzeltici bıçaklarını ve tel dikiş bıçaklarını seçin. Kesme istasyonunu, bıçak konumunu ve makine çizimini eşleştirin.",
    selectionGuide: {
      title: "Kağıt Kesme Bıçağı Seçim Kılavuzu",
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
          title: "Kağıt Yığını Kesme ve Web Kaplama",
          description:
            "Kelepçeli kağıt yığını kesimini, sürekli web çapraz kesiminden tabakalara ayırın.",
          productIds: ["paper-cutting-blades", "paper-sheeter-knives"],
        },
        {
          id: "print-finishing",
          title: "Kitap ve Baskı Sonlandırma",
          description:
            "Üç bıçaklı düzeltici veya tel dikiş hattı için bıçak setini seçin. Ön, yan, üst ve alt konumları onaylayın.",
          productIds: [
            "three-knife-trimmer-blades",
            "saddle-stitcher-trimmer-knives",
          ],
        },
      ],
      quotePrompt:
        "Makine modelini ve versiyonunu, bıçak konumlarını, kağıt veya karton özelliklerini ve orijinal bıçak çizimlerini ekleyin.",
    },
  },
  {
    slug: "other-custom-blades",
    category: "custom_profile",
    title: "Diğer bıçaklar ve özel üretim bıçaklar",
    shortName: "Diğer ve özel üretim",
    tagline: "Prosese özel kesme parçaları ve özel profiller",
    heroImage: "/images/products/blades/special-shaped-knife.webp",
    description:
      "İşleme veya parça türüne göre kesici kompaktör bıçaklarını, eriyik filtre kazıyıcılarını, peletleme bıçaklarını ve özel profilleri bulun.",
    selectionGuide: {
      title: "Proses Bıçağı Seçim Kılavuzu",
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
          title: "Diğer bıçaklar ve özel üretim bıçaklar",
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
        "Süreci, makine modelini, parça konumunu ve çizim veya örnek boyutlarını ekleyin.",
    },
  },
  {
    slug: "wood-chipper-blades",
    category: "wood_chipper",
    title: "Ağaç yongalama bıçakları ve karşı bıçaklar",
    shortName: "Ağaç yongalama bıçakları",
    tagline: "Hareketli bıçaklar ve sabit karşı bıçaklar",
    heroImage:
      "/images/products/wood-chipper-blades/wood-chipper-blades-00.webp",
    description:
      "Tamburlu ve diskli ağaç öğütücüler için hareketli öğütücü bıçakları ve sabit örsleri bulun. Rollerini karşılaştırın, ardından değiştirilen kişiyi makineyle eşleştirin.",
    seoTitle:
      "Tamburlu ve diskli odun yongalama makineleri için bıçaklar ve karşı bıçaklar",
    selectionGuide: {
      title: "Ağaç Öğütme Bıçağı Seçim Kılavuzu",
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
          title: "Hareketli Parçalayıcı Bıçaklar",
          productIds: ["wood-chipper-blades"],
        },
        {
          id: "stationary-anvils",
          title: "Sabit Örsler",
          productIds: ["wood-chipper-anvils"],
        },
      ],
      quotePrompt:
        "Öğütücünün modelini ve seri numarasını, tambur veya disk tipini, bıçak veya örs konumunu ve çizim veya numune boyutlarını ekleyin.",
    },
  },
];
