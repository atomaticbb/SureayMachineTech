# 重新挑选首页工程工艺与 RFQ Questions 图片

2026-11-19 · 已选图并接入本地英文首页

2026-11-20，Machining & Grinding 采用 Connor Lucock 的车床实拍 `pexels-connor-lucock-259838-28752150.jpg`。Dimensional Inspection 采用 `blades-detect-process.webp` 的清晰度增强版，已去除刀片表面的标识。Blade Steel Selection 采用用户提供的钢坯堆放实拍，横向裁切聚焦带标记的端面。下方选图对照记录的是首轮方案。

## 选图范围

英文首页 RFQ Questions 采用用户先前提供的 `trimmer_knives.webp`，展示工作台上三把修边刀的刃口和安装孔。

| 首页位置 | 当前图片 | 优先选择 |
| --- | --- | --- |
| Engineering Standards · Controlled Machining | `cnc-precision-grinding.webp` | 刀具在磨床或加工设备上的真实近景，能看清刀具、夹具和加工位置。 |
| Engineering Standards · Tolerance Control | `blade-quality-inspection.webp` | 对工业刀具实际测量的照片，能辨认被测刀具和量具。 |
| Engineering Standards · Material Selection | `material-selection.webp` | 可辨认的刀具钢坯、刃口材料或同工况下的刀具样本，体现选材与实际切削的关系。 |
| RFQ Questions · 左侧配图 | `rfq-qa.webp` | 刀片样件和可公开的脱敏图纸，或工程人员核对样件尺寸的实拍。下方留出能承载现有白字的空间。 |

## 交付与验收

- [x] 从项目现有图库为每个位置挑选 1 张主选和 1 张备选。
- [x] 提供[桌面裁切](assets/homepage-images-2026-11-19/desktop-comparison.webp)和[手机裁切](assets/homepage-images-2026-11-19/mobile-comparison.webp)对照。左列是本地首页主选，右列是备选。
- [x] 主选图使用 WebP，并设置 `srcset`、`sizes` 和固有尺寸。浏览器在桌面加载 480 / 600 px 图片，在 390 px 高像素密度手机视口加载 720 / 768 px 图片。
- [x] 新增首页专用资产供英文首页使用。检查了西语首页的原图片路径，以及首页询价表单和 STEP 附件入口。

## 选图结果

图库路径均相对于 `client/public/images/`。

| 位置 | 主选及理由 | 备选及理由 |
| --- | --- | --- |
| Controlled Machining | `process/4-CNC Machining.webp` 的加工近景能同时看到圆形工件、装夹与设备。 | `about/grinding-workshop.webp` 能交代车间环境，适合需要展示生产规模时采用。 |
| Tolerance Control | `process/CMM.webp` 同时显示测量人员、三坐标测量机和工件。 | `process/quality-control.webp` 是测量圆刀内孔的近景，能突出具体检查动作。 |
| Material Selection | `process/1-Raw Material Selection.webp` 有带标记的钢材和手持检测仪，画面能说明选材步骤。 | `process/material-choosing.webp` 清楚展示分批标记的圆钢备料。 |
| RFQ Questions | `process/drawing-review.webp` 展示核对图纸的实际场景，手机裁切保留手、笔和图纸。 | `news/paper-guillotine-knives-hss-carbide-inspection.webp` 展示刀片样件和量具，适合以送样或尺寸核对为重点时采用。 |
