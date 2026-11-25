# 英文刀具目录规格恢复与分类聚合页核对

日期：2026-11-15。用户要求检查所有已改产品，恢复误删的原尺寸和规格；查不到外部资料时保留原值，有完整调研资料时可补充；分类聚合页以当前 Slitter hub 为格式标准。仅修改英文。

## 基线与采用原则

- 历史目录：Git `HEAD 9999a7c` 中的 `client/src/data/blades.ts`，文件最后提交为 `6e2e963`。实施前另保存当前工作区基线，避免覆盖已有未提交改动。
- 同时对照 2026-11-11 各品类调研、2026-11-12 单轴任务单、2026-11-13 Shear 任务单及规格复查，以及用户后续确认。历史原值不是外部认证参数；本次按用户要求恢复原有目录资料。
- 不能只检查原始 `specs` 或 `standardDimensions` 是否还在文件里。实际页面可能优先显示 `detailLayout.technicalSpecs`、独立尺寸表，或不显示旧 caption；原值必须在正确区域可见。
- 当前已审尺寸表、配置编号和新增参数全部保留。旧行以追加方式恢复；已经明确换工位、换尺寸或删除的项目不回滚。

## 本轮结果

覆盖 39 款：13 Slitter、8 Shredder、5 Metal Shear、4 Paper、2 Log Saw、5 Other & Custom、2 Wood Chipper。27 款有数据恢复，另外 12 款核对后保持本轮基线。

- 恢复 72 行：Slitter 58 行、Plastic Granulator 8 行、Nonwoven Log Saw 6 行。
- 独立补充 6 行 ZERMA 原厂手册尺寸。因此本轮增加 78 行，英文当前共 362 行配置／尺寸系列。系列行保留原有范围和斜线选项，没有拆成任意组合。
- 前一批 Wood / Other 的原 40 行及 Biber 补充行全部保留。没有删除或替换本轮开始时已有的配置。
- 所有产品名称、URL、归属、原图、图纸和关联产品不变；没有生成译文。

## Slitter：13 款逐页记录

| 产品 | 尺寸处理 | 规格处理 |
| --- | --- | --- |
| Film & Tape Slitter | 追加原六行，SR001801–806；现有十五行保留 | 恢复 52100、ASP23、整体硬质合金选项 |
| Paper Slitter | 追加原六行，SR001807–812；现有十一行保留 | 恢复剪切／压切结构；摘要涵盖已列 203 mm 上刀 |
| Copper & Aluminum Foil Slitter | 追加原五行，SR001813–817；现有九行保留 | 恢复 D3；维持铜铝箔定位 |
| Steel Coil Slitter | 补 400 × 260 × 20、500 × 320 × 30 mm，SR001818–819 | 恢复 SKD11、Cr12MoV、6CrW2Si；保留 OD≤420 的精度边界 |
| Battery Slitter | 追加原八种单刀，SR001820–827；原六组配对刀保留 | 恢复按需金属陶瓷、铝箔 12–20 µm／铜箔 6–12 µm 集流体厚度，明确不是电极总厚度 |
| Corrugated Slitter Scorer | 追加六个历史平台行，SR001828–833；已保留的 Agnati 行不重复 | 恢复 K05/K10/K20、HIP、原约 0.3 mm 刃尖定义，不改写成公差 |
| Nonwoven Slitter | 追加原六行，SR001834–839 | 恢复 M2 62–64 HRC、D2 60–62 HRC、正前角 15–20°、Ra≤0.4 µm；后续 carbide 和 25–45° bevel 保留 |
| Bottom Grooved Anvil | 追加五行槽型配置，SR001840–844 | 保留槽宽／槽深／槽角含义，恢复 ASP23、整体硬质合金、剪切间隙 0.02–0.15 mm |
| Tungsten Carbide Slitter | 原无尺寸表；保留现有十七行 | 单条 Sizes 内恢复薄型刀 OD20–300、厚 0.3–5 mm，同时保留厚卷材刀；恢复 TRS 2500–3000 N/mm² 和原刃形 |
| Rewinder Bottom Knives | 追加三行，SR001845–847；250 × 188 × 15 已有 | 恢复整体硬质合金选项 |
| Corrugated Slotter | 保持当前九种弧刀及三种配套刀，不回滚旧 V 槽刀 | 现有规格完整，本轮不变 |
| Paper Straw Slitter | 追加五行，SR001848–852；100 × 15 × 0.30 已有 | 尺寸摘要覆盖 OD88–100 mm；材料和涂层保留 |
| Multi-Groove Bottom Knives | 追加六个原结构系列，SR001853–858；现有四行保留 | 恢复原 OD406 上限及轴型／节距，不把范围系列伪装为固定配置；原材料已在技术区，无需重复增加 |

原有 Item No. 不变。新增范围／选项行不与只有部分尺寸相同的现有单一配置共用编号。明确为同一配置的现有跨页共享编号继续保留。

## 非 Slitter：26 款逐页记录

| 产品 | 本轮处理 |
| --- | --- |
| Twin-Shaft General Recycling | 原八行保留；单条 Sizes 恢复定制 OD800 mm 和厚 10–150 mm |
| Multi-Shaft Metal | 原三行及材料、硬度等保留；不恢复用户删除的 Scrap Class 列 |
| Battery Shredder | 原两行保留；不恢复用户删除的用途／厚度列，不编造材料 |
| Single-Shaft Rotor | 六行原值和 34 × 34 × 20 补充行均在；保留后续刀座与型号纠正 |
| Single-Shaft Stator | 原六行和新增三行均在；3500 mm 定制能力已显示 |
| Tire Shredder | 四行原值和原规格均在；OEM Platform 列按用户要求保持隐藏 |
| Shredder Screens | 九行原值及孔径、板厚、筋宽、开孔率均在 |
| Plastic Granulator | 恢复原八行 SR002801–808；新增六行 SR002809–814，见下文；恢复 −196°C 深冷及原加工材料 |
| Tissue Log Saw | 六行不变；恢复定制 OD1200、跳动≤0.15/≤0.10、Ra≤0.2；原 300 strokes/min 作为受整机设定影响的参考切割频率；检验文件说明放公司 FAQ |
| Nonwoven Log Saw | 恢复六行 SR005201–206 的原外径、孔径、厚度；移除旧用途列，不带回已排除内容 |
| Guillotine Shear | 原八行保留；恢复全长平行度±0.05 mm；按材料区分的间隙比例放技术 FAQ，并保留原机设定前提 |
| Alligator Shear | 保留已确认五行；不恢复已被替换的旧通用板材剪八行 |
| Scrap Chopper | 六行保留；恢复原 50,000–200,000 次碎断范围及材料／污染依赖条件 |
| Stationary Scrap Shear | 新品六组已确认尺寸完整，本轮不变 |
| Flying Shear | 原本按图定制，没有被删除的原尺寸表，本轮不造表 |
| Paper Guillotine | 八组尺寸完整；恢复平面度≤0.05 mm 及原纸张适用范围 |
| Three-Knife Trimmer | 保留六组十八行；恢复 Ra≤0.1 µm、整套厚度匹配±0.01 mm，不回滚已确认替代的旧六行 |
| Paper Sheeter | 新品六行完整，本轮不变 |
| Saddle Stitcher Trimmer | 新品五行完整，本轮不变 |
| Strand Pelletizer Rotor | 已恢复五行保留；恢复原 ISO 1940-1 G2.5 及加工材料范围 |
| Melt Filter Scraper | 六行保留；恢复原耐 HCl 合金选项和加工材料；HV1000+、80–2000 µm 在工程说明中明确归属配套过滤盘 |
| Cutter Compactor | 六行保留；恢复 0.2–0.5 mm 机型相关间隙、−196°C 深冷及刀座块类型 |
| Die-Face Cutting Knives | 六行、十一图保留；恢复受控磨耗的刀／模板硬度关系、CMM 配套供货信息；上条要求删除的长说明不恢复 |
| Special-Shaped | 无历史标准尺寸表；原 7–15 工作日交期恢复到公司 FAQ |
| Wood Chipper Blades | 九行不变；恢复定制长度 800 mm、−196°C 深冷、原 8–12 次重磨及磨耗／余高条件 |
| Wood Chipper Anvils | 九行不变；恢复定制长度 600 mm、整体淬硬、原 5–10 次重磨及磨耗／余高条件 |

## ZERMA 补充来源

2026-11-15 重新打开原厂 PDF，并逐页查看渲染图核对表列。以下各条只有对应原厂手册来源，限于列出的型号／零件位置，不表示全系列通用。原报告对应来源为 S10、S11。

| Item No. | 型号／刀位 | L × W × T（mm） | 原件号或位置 | 来源原文位置 |
| --- | --- | --- | --- | --- |
| SR002809 | GSP 560/700 rotor | 310 × 100 × 22 | position 501 | [GSP 手册](https://zerma-america.com/wp-content/uploads/2024/12/GSP-Series-Operating-Manual-2023.pdf)，§13.2，印刷页 93–94，刀片行在 94 |
| SR002810 | GSP 560/700 stator | 646 × 100 × 22 | position 601 | 同上，印刷页 94 |
| SR002811 | GSH 800/1200 rotor | 568 × 100 × 22 | 80000900 | [GSH800 手册](https://zerma-america.com/wp-content/uploads/2024/12/GSH800-Series-Operating-Manual-2023.pdf)，印刷页 90 |
| SR002812 | GSH 800/1200 stator | 1178 × 100 × 22 | 80001050 | 同上，印刷页 91 |
| SR002813 | GSH 800/1600 rotor | 385 × 100 × 22 | 80000920 | 同上，印刷页 94 |
| SR002814 | GSH 800/1600 stator | 795 × 100 × 22 | 80001070 | 同上，印刷页 95 |

原始单位为 mm，无换算。孔中心距 NOT FOUND，页面标为 To drawing，不用紧固件数量或零件位置推算孔距。所有原八行的孔型及孔距不变；第一列名称改为 Configuration，兼容原孔型及新增的具体刀位参考。

## 聚合页对齐

Slitter 保留现有布局。Shredder、Metal Shear、Paper Cutting、Log Saw、Other & Custom、Wood Chipper 使用同一结构：简短 Hero → 平铺产品卡 → 已有选型文章 → OEM Compatibility → RFQ。

- 卡片仍为桌面 4、平板 2、手机 1 列；不增加应用／场景子分组。分类 Hero 仍只保留 Request a Quote。
- 使用十四篇相关既有技术文章；未编造文章或把 Slitter 文案复制到其他刀型。
- 适配品牌来自该分类实际产品记录，Shredder 与其详情页采用同一读取规则，并去除大小写重复。
- Paper 的已确认透明 Hero、产品顺序、ItemList、历史锚点与 Custom 的 `/custom` 入口保留。
- 新增二十八个响应 WebP 资源：二十七个宽度变体、一个既有 PNG 的 WebP 副本。未改原图片内容。

## 防止再次遗漏

目录检查增加原尺寸恢复、既有表格保留和聚合页链接／图片测试，并加入 `pnpm test:catalog`，随现有发布门禁执行。检查实际渲染字段，不以源数据中还存在原值作为“页面已保留”的证明。尺寸、精度、材料与结构是产品参数；选择方法、检验文件、交期等分别归入适合的现有区域。

## 验收记录

- `pnpm type-check`、`pnpm test:catalog` 通过，五个测试文件合计 54 项。
- 39 个详情页在 1440 / 390 px 下共 78 次浏览器检查通过：全部 362 行表头和单元格与目录数据一致，标签切换有效、手机表格可横向浏览、无整页溢出或页面错误。规格正文、Product 属性及材料字段、FAQ 数据和 canonical 一致。
- 七个英文聚合页在 1440 / 800 / 390 px 下检查通过：产品顺序、4/2/1 列、ItemList、单个 Hero CTA、选型文章、OEM 区、有效内链、响应 WebP 和历史锚点均保留。Wood 的 Bandit / Bandit Industries 同一品牌合并显示。
- 抽查五个法语聚合页，原布局保留。四十八个语言数据文件与修改前哈希一致。
- 对象级对照确认全部旧有标准尺寸行、独立尺寸表和编号仍在；产品名称、URL、归属、原图、图纸、关联产品及草稿不变。

本轮没有运行翻译、生产构建、PDF 目录生成或部署。本地验收通过不替代正式上线门禁。
