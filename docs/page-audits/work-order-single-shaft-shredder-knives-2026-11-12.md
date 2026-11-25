# 单轴撕碎机动刀与定刀页面文案改版任务单

日期 2026-11-12。适用于以下两个现有英文产品页。审查依据和市场用词对照见[两页用词审查](page-seo-single-shaft-shredder-knives-2026-11-12.md)。

2026-11-12 后续确认更新。首屏保持简洁，产品名称与别名解释改由已有 Technical FAQs 承载。下文两段“首屏说明”保留作产品数据摘要，§3 第 3 项由这一决定替代。动刀 FAQ 解释 rotor knives、rotor inserts 与 cutting crowns 的关系，定刀 FAQ 解释 stator、bed 与 counter knives。原有动定刀互链继续用于配套选型。

| 页面 | 主名称 | 正文中的采购用词 |
| --- | --- | --- |
| `/products/single-shaft-shredder-blades` | `Rotor Knives` | `square rotor inserts`、`concave cutting crowns` |
| `/products/single-shaft-bed-knives` | `Stator Knives` | `bed knives`、`counter knives` |

## 1. 动刀页

| 位置 | 英文替换值 |
| --- | --- |
| H1 | Single-Shaft Shredder Rotor Knives |
| 产品短名称和目录卡片 | Single-Shaft Shredder Rotor Knives |
| 工位分类短标签 | Single-Shaft Rotor Knives |
| SEO title 配置值 | Single-Shaft Shredder Rotor Knives & Inserts |
| 浏览器最终 title（53 字符） | Single-Shaft Shredder Rotor Knives & Inserts \| Sureay |

**Meta description（153 字符）**

> Replacement rotor knives for single-shaft shredders, including square inserts and concave cutting crowns. Send the machine model, part number or drawing.

**首屏说明**

> Replacement rotor knives for single-shaft shredders, including square inserts and concave cutting crowns. Match the cutting face, mounting seat and bolt to the original part.

**关联定刀的首屏链接**

> For the fixed knife opposite the rotor, see [Single-Shaft Shredder Stator Knives](/products/single-shaft-bed-knives).

**尺寸表列名**

| 当前列名 | 替换值 |
| --- | --- |
| Insert Dimensions (L × W × T) | Knife Dimensions (L × W × T) |
| Bolt Size | Fixing Bolt |
| Insert Profile | Cutting Face |
| Typical OEM Platform | Machine / OEM Reference |

**尺寸表说明**

> Use the machine model and OEM reference to identify the part, then compare the cutting face, mounting seat and fixing bolt with the original knife.

**替换现有同尺寸适配 FAQ**

> **Will two square rotor knives with the same dimensions fit the same shredder?**  
> Check the cutting face, mounting hole, bolt seat and underside against the original knife. A raised centre or a different bolt seat can change how the knife fits in its holder.

**行内询价提示**

> Send the machine model, OEM part number and quantity. Include a drawing or photos of both sides of the knife, and tell us if you also need the rotor knife holder.

## 2. 定刀页

| 位置 | 英文替换值 |
| --- | --- |
| H1 | Single-Shaft Shredder Stator Knives (Bed Knives) |
| 产品短名称和目录卡片 | Single-Shaft Shredder Stator Knives |
| 工位分类短标签 | Single-Shaft Stator Knives |
| SEO title 配置值 | Single-Shaft Shredder Stator & Bed Knives |
| 浏览器最终 title（50 字符） | Single-Shaft Shredder Stator & Bed Knives \| Sureay |

**Meta description（155 字符）**

> Replacement stator knives (bed knives) for single-shaft shredders. Send your machine model, part number or drawing to check the knife profile and mounting.

**首屏说明**

> Stator knives, also called bed knives or counter knives, form the fixed cutting edge opposite the rotor knives. Match the edge profile and mounting pattern to the original part.

**关联动刀的首屏链接**

> For the knives mounted on the rotor, see [Single-Shaft Shredder Rotor Knives](/products/single-shaft-shredder-blades).

**尺寸表列名**

| 当前列名 | 替换值 |
| --- | --- |
| Hole / Mounting Configuration | Mounting / OEM Reference |

**尺寸表说明**

> Compare the knife profile, mounting slots and OEM part number with the original part. For a segmented set, identify which segment you need.

**替换现有同义词 FAQ**

> **Is a stator knife the same as a bed knife?**  
> In a single-shaft shredder, stator knife, bed knife and counter knife refer to the fixed knife opposite the rotor knives. When ordering a replacement, check whether the machine uses a single bar or a segmented set and match the mounting pattern.

**行内询价提示**

> Send the machine model, OEM part number and quantity. Include a drawing or photos showing the cutting edge and mounting slots, and tell us if you also need the mounting plate.

## 3. 实施位置

1. 在 `client/src/data/blades.ts` 的两条产品记录更新 `name`、`fullName`、`categoryDisplay`、`description`、`disambiguation`、`dimensionLabels`、相关 FAQ 和 `quoteRequirements`。`description` 使用本单的首屏说明。面包屑、分类产品卡、相关产品卡和 FAQ 的产品名称从相应产品字段取值。
2. 在 `client/src/utils/seo-config.ts` 写入表中的 SEO title 配置值及对应 meta description。页面组件统一生成 `| Sureay` 后缀。
3. 在 `BladeHero.tsx` 为本单两页启用首屏说明，把 `description` 渲染在 H1 下、互链前。当前组件只在非 `detailLayout` 版式显示该字段。核对 `ProductDetail.tsx` 的 Product 结构化数据与页面产品名及可见说明相符。
4. 检查英文撕碎机分类页 `client/src/data/blade-categories.ts` 的单轴部件分组，组内描述使用 `rotor knives` 和 `stator knives`。筛网页指向动刀页的锚文本同步为 `Single-Shaft Shredder Rotor Knives`。现有两条产品网址用于面包屑、卡片、互链和 canonical。

## 4. 规格核对后再录入

| 项目 | 回签所需信息 | 回签后的页面处理 |
| --- | --- | --- |
| 动刀 `80001003` | 以供货图核对凹面、总厚、背面凸台、紧固座和适用机型。ZERMA/Virtus 资料写 20 mm，Eurotools 的凸芯参考件标 20.65 mm。 | 经确认后，在对应的 `SR002501` 刀面列填 `Concave square`。若批准的配置适用于 E 型转子，可在机型与 OEM 参考旁注明 `For E-type rotors`。 |
| 定刀 `80050037` | 以原机、供货图或样件确认 **279 × 80 × 30 mm**、刃形、安装孔、阶梯缺口及装配。现有 `SR002601` 对应 `80001202`，Eurotools 的 T-lock 参考件对应 `80001201`。 | 给通过回签的 `80050037` 配置分配独立的 `SR002` 件号，列对应机型、OEM 参考号和安装特征。件号随配置保存。 |
| 材质和配件 | 核对 `Cr12Mo1V1` 的供货范围及材质证明，确认动刀刀座与定刀安装板是否可单独供应。 | 按实际可供应钢号列入 Material。询价以 `rotor knife holder` 和 `mounting plate` 识别配件。 |

配件及尺寸依据见 [ZBS 零件表](https://virtus-equipment.com/wp-content/uploads/2024/12/L-Series-Shredder-Operating-Manual-2023.pdf#page=69)、[ZERMA ZSS 备件手册](https://zerma-america.com/wp-content/uploads/2024/12/ZSS-Series-Operating-Manual-2023.pdf)、[Eurotools 凸芯动刀](https://www.eurotools.eu/zerma/34x34x2065-mm-cutting-crown-raised-core-for-zermadgm/)及 [Eurotools T-lock 定刀](https://es.eurotools.eu/zerma-zss-zps/279x80x30-mm-stator-knife-for-zerma-with-t-lock/)。

## 5. 验收

- 在两个英文产品页检查 H1、最终 title、meta description、首屏短句、关联页链接、尺寸表列名及询价提示。检查分类卡片和面包屑使用相同产品主名称。
- 在桌面和 375 px 手机宽度确认首屏说明可见，尺寸表可横向滚动，`Item No.` 仍为首列，两个关联链接均可打开。
- 运行 `pnpm type-check` 和 `pnpm exec vitest run client/src/data/blades.test.ts`。生成发布产物时，用 `pnpm build` 复查两个预渲染 HTML 的 H1、title、canonical、`og:url` 与 Product / BreadcrumbList 结构化数据。
