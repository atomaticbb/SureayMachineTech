# Slitter：线上优势原文与材料牌号复核

访问日期：2026-11-17。范围：13 个当前 Slitter 产品路径；ASP 命名；电池刀片涉及的四个 YG 牌号；两处待替换的优势选题。仅供文案方案审核，本轮未修改产品数据、页面、图片或语言版本。

## 1. 证据如何使用

- `catalog-evidence.json` 是当前 `client/src/data/blades.ts` 的审核摘录，源文件 SHA-256 为 `82d7f36c06291a209cdfb0b9388db1fe2b699889686e30a558a16e1c0ccd2542`。运行时产品数据仍仅以 `blades.ts` 为准。
- [live-advantages-excerpts.json](./live-advantages-excerpts.json) 保存本次线上页面标题、请求和最终 URL、HTTP 状态、区块定位、三张优势卡的原文及响应哈希。它是历史公开文案证据，不是工厂能力证明，也不是获准回填的文案。
- “目录已有”“线上原有”说明出处；“厂家资料”说明技术或市场依据。三者均不能代替 Sureay 实际供材、制造、检验或商务承诺的内部记录。
- 不依赖临时目录和会移动的源代码行号；按产品 ID、数据字段、区块标题或 PDF 页码回查。临时下载和渲染仅用于检查，结论与必要原始数据均保存在本目录。

## 2. 线上 13 页核对

逐页同时核对产品 `<title>` 与 `Engineering Advantages` 下的三个 `h3`，没有把通用 SPA 的 HTTP 200 当成成功对照。13 个当前路径中，12 页返回 200 且有对应优势区；`corrugated-slotter-knives` 返回 404，标题为 `404 — Page Not Found | Sureay`，优势区为 **NOT FOUND**。因此准确口径是“13 个路径已核查，12 页取得对应优势原文”，不能说全部 13 页已验证线上旧版。

下表全部来源访问日期均为 2026-11-17；成功页面的定位均为 `Engineering Advantages > h3` 及其紧邻描述，完整原文见 JSON 中同名 `id`。

| 页面 / 实际 URL（请求后未跳转） | HTTP / 对应产品标题 | 线上三个优势标题 | 内容摘要与方案影响 |
| --- | --- | --- | --- |
| [Film & Tape](https://sureay.com/products/rotary-slitter-knives) | 200；Film & Tape Slitter Knives for Flexible Packaging | Application-Specific Tool Steels；Anti-Stick PVD Coatings；Optimized Edge Geometries | 分别讲按基材选钢、涂层防粘、刀刃形式。可借鉴“供货能力 → 买家收益”的表达；现货、快速交付、80% 和消除粘附等不能因旧站写过就恢复。 |
| [Paper Slitter](https://sureay.com/products/rotary-slitter-knives-paper) | 200；Paper Slitter Knives / Tissue & Kraft / D2, M2 HSS | Which steel grade should paper slitter knives use?；What shear clearance stops fibre dust at the slit edge?；What bore, locking, and bevel options are available? | 实际旧站已使用问句式优势。材料、接口选择可回溯；40–60% 寿命和预检间隙数据需独立能力证据，不把问句原封不动搬回优势。 |
| [Metal Foil & Strip](https://sureay.com/products/metal-foil-strip-slitter-knives) | 200；Aluminum Foil & Metal Strip Slitter Knives / ASP23/ASP52 PM Steel / ±0.001 mm | Powder Metallurgy (PM) Steel；Zero Cumulative Error；Anti-Galling Polish | 粉末钢、厚度精度、抛光。旧站 ASP23/ASP52 与本地 ASP2023/ASP2052 需保留对应关系；“零累计误差”和完全防止粘附属待证，不是合格优势结论。 |
| [Metal Coil](https://sureay.com/products/metal-coil-slitting-knives) | 200；Precision Coil Slitting Knives / Metal Slitter Blades | Micro-Tolerance Engineering；Heavy-Duty Alloy Selection；Complete Arbor Tooling | 精度、合金选项、刀片及隔套/胶环/分隔片。供货组合可作为买家价值线索；微米数值、真空处理及无毛刺保证需核对各自凭据。 |
| [Battery](https://sureay.com/products/lithium-battery-slitting-knives) | 200；Carbide Battery Slitting Knives / Electrode Foil | Zero-Notch Mirror Finish；Ultra-Fine WC-Co Carbide Grade；Pre-Verified Clearance Pairs | 抛光、亚微米 WC-Co、配对预检。91–93 HRA 来自笼统“battery-grade”叙述；没有逐个 YG 牌号映射。不能转写为四个牌号共同的已验证规格。 |
| [Corrugated Slitter-Scorer](https://sureay.com/products/corrugated-slitter-scorer-blades) | 200；Corrugated Slitter Scorer Blades / BHS & Fosber | HIP Sintered Carbide；Zero-Crush Razor Edge；Complete Box Plant Tooling | HIP、刃型与整厂刀具。零孔隙、约 0.3 mm 刀尖、绝对稳定等不是已证实收益；可从当前目录的整片/分片构造及孔槽型式重选具体选题，见第 5 节。 |
| [Nonwoven](https://sureay.com/products/nonwoven-slitter-knives) | 200；Nonwoven Slitter Knives / PP Spunbond & SMS | Nonwoven-Optimised Rake Angle；ESD Conductive Coating；Medical Batch Traceability | 前角、ESD、批次资料。旧站有 400 m/min、连续消散电荷、整批材质/硬度/CMM 资料承诺；这些不能凭网页证明。第三条可改用已列出的上刀、底环、压切刀供货形式。 |
| [Bottom Grooved Anvil](https://sureay.com/products/bottom-grooved-anvil-knives) | 200；Bottom Grooved Anvil Knives / Shear Pair Anvils | OEM-Profile Groove Geometry；H6 Bore & Lapped Face Flatness；Anti-Adhesion Groove Coatings | 槽型、孔/端面精度、接触面涂层。旧站 H6 与本地需逐字段核对，不能“恢复旧版”覆盖现有值；60–80%、8–12 小时和每批 CMM 均待内部证据。 |
| [Carbide](https://sureay.com/products/tungsten-carbide-slitter-knives) | 200；Tungsten Carbide Slitter Knives / Carbide Slitting Blades | Where Carbide Earns Its Cost；Where Carbide Is the Wrong Choice；Micro-Grain Substrate, Chosen Per Job | 偏重选型边界与失效说明。技术解释可进入 FAQ；优势需正面表达现有材料/刀型选择，随货报告不能无凭据作为默认服务。 |
| [Rewinder Bottom](https://sureay.com/products/slitter-rewinder-bottom-knives) | 200；Slitter Rewinder Bottom Knives / Paper Rewinder Blades | Deliberately Harder Than the Top Knife；Mirror-Finished Running Face；Controlled Hot-Set Carbide Inserts | 硬度匹配、表面和镶片。不能把“底刀必须更硬”泛化为所有刀组，也不能从旧文直接认定提供返修重镶服务。 |
| [Corrugated Slotter](https://sureay.com/products/corrugated-slotter-knives) | **404；Page Not Found** | **NOT FOUND** | 没有对应线上优势可比较。应按本地目录和已核实资料重新审查选题；不声称恢复这页旧站内容。 |
| [Paper Straw](https://sureay.com/products/paper-straw-slitting-blades) | 200；Paper Straw Cutting Blades / Non-Stick Carbide Slitters | Coated for Adhesive Release, Not Just Hardness；0.15–0.30 mm, Specified to the Cut；Tuned to the Adhesive, Not Only the Paper | 防粘、厚度、胶黏剂匹配。可保留产品专属方向；旧文厚度与工况效应要对照当前规格，避免额外推导性能保证。 |
| [Multi-Groove Bottom](https://sureay.com/products/groove-bottom-knives) | 200；Multi-Groove Bottom Knives / Bottom Cutter Rings | One Ring, Many Slit Positions；All Grooves Ground in One Setup；Air Shaft, Solid Shaft, or Split Ring | 多切位、槽距加工、轴/开合形式。多槽与安装形式可建立清晰买家价值；一次装夹工艺、完全不漂移和不停机更换不能仅依据旧文。 |

**对 Claude 覆盖质疑的判断：合理，现已补查，但不是补足到 13/13 成功。** 源证据必须逐页区分“线上已对照”与“线上缺失”；线上措辞更有销售意识也不代表每个数值或绝对结论都应复用。

## 3. ASP23、ASP2023 与 ASP2052

### 已核实的原厂出处

| 来源 | 访问日期 / 原文位置 | 可支持的结论 | 不能推出的结论 |
| --- | --- | --- | --- |
| [Erasteel 官方账号历史帖](https://www.linkedin.com/posts/erasteel_did-you-know-asp-is-our-world-renowned-activity-6611275347256315904-6q0S) | 2026-11-17；Erasteel’s Post 主段落中的 1995 年更名说明 | 官方说明 ASP23/30/60 在 1995 年改名为 ASP2023/2030/2060。ASP23 与 ASP2023 的历史名称关系有出处。 | 不能只因采购文件写 ASP23，就确认实际钢材的厂家、制造年代或合规原产身份。 |
| [ASP2023 原厂资料页](https://www.erasteel.com/products/asp-2023/)；[2024 年 9 月数据表](https://www.erasteel.com/wp-content/uploads/2024/09/ASP_2023_EN.pdf) | 2026-11-17；资料页 Chemical composition / Standards；PDF 第 1 页 Chemical composition、Standards、Delivery hardness | 化学表依次为 C 1.28、Cr 4.0、Mo 5.0、W 6.4、Co —、V 3.1；PMHS 6-5-3C / 1.3395 / AISI M3:2。 | 260 HB 是供货退火状态参考，不是成品分条刀工作硬度；原厂热处理指南不能证明 Sureay 已按该工艺生产。 |
| [ASP2052 原厂资料页](https://www.erasteel.com/products/asp-2052/)；[ASP2052 数据表](https://www.erasteel.com/wp-content/uploads/2023/05/ASP-2052_GB.pdf) | 2026-11-17；资料页 Chemical composition / Standards；PDF 第 1 页 Chemical composition（已目视复核） | 两处化学表依次为 C 1.67、Cr 4.8、Mo 2.0、W 10.5、Co 8.0、V 4.9。与 ASP2023 组成不同，是另一牌号。资料页标准记为 PMHS 11-2-5-8，2023 PDF 标为 HS 10-2-5-8 / Germany 1.3253，版本差异并列保留，不用于本轮等价牌号判断。 | 不能为统一文字风格把 ASP2052 改成 ASP2023，或将同一工作硬度/工艺直接复制过去。 |

建议方案规则：**可规范名称，不可合并牌号。** 在实际供材确认后，可采用 `ASP® 2023 (formerly ASP® 23)` 的首次出现方式；ASP2052 单独保留。旧站 ASP52 若要并入现代命名，还需对应命名证据，不能仅类推。当前 `blades.ts` 原规格本轮不改；FAQ 答案不能把所有粉末钢写成一种同等选择。

## 4. YG 牌号硬度复核

### 4.1 CUTSTAR：明确 HRA 列

来源：[CUTSTAR Tungsten Carbide Grade Charts](https://www.cutstar.cn/public/uploads/files/2018/08/Tungsten%20Carbide%20Grade%20Charts.pdf)，2026-11-17 访问。位置：PDF 第 1 页，钴结合剂牌号表；已下载并目视复核表头与行。其[官网](https://www.cutstar.cn/)说明自有粉末到加工生产线，作为生产商自己的材料表使用，不作为通行国际标准。

保留原表列顺序及单位：

| Grade | Binder Content | Density (g/cm³) | Hardness (HRA) | TRS (≥N/mm²) | Grain Size | Remark |
| --- | --- | --- | --- | --- | --- | --- |
| YG6X | 6% Co | 14.90 | 91.0 | 2150 | Fine | — |
| YG6H | 6% Co | 14.90 | 91.5 | 2200 | Fine | HIP Sintered |
| YG8 | 8% Co | 14.60 | 89.0 | 2300 | Medium | — |

YG10X：**NOT FOUND** 于该原厂表。表列单值，不自行扩成范围、验收下限或 Sureay 成品指标；原表也未将这些数值声明为所有厂家通用值。

### 4.2 Miller Carbide：原表标题为 HRA/HV，不能擅自拆单位

来源：[株洲密勒硬质合金 — 牌号性能](https://www.millercarbide.cn/grade-performance/)，2026-11-17 访问。位置：页面唯一牌号表，行号 3、4、8；公司页脚署名“株洲密勒硬质合金有限公司”。

**完整原表头与相关行如下。硬度表头同时写 HRA/HV，没有给每一行单独标量表。** 本记录保留原值，不把其中任何数值当成 HV 与 HRA 的换算，也不凭数值大小自行确认该行单位。

| 序号 | 牌号 | Den(g/cm³) | HC(KA/m) | Com(%) | HRA/HV | TRS(N/mm²)≧ | 鉴定制度 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3 | YG6X | 14.80~14.97 | - | 5.0~5.7 | 92.5~93 | 2200 | 1420℃/60min |
| 4 | YG8 | 14.65~14.85 | 10.0~15.0 | 6.8~7.6 | 89.5~91.0 | 1850 | 1420℃/60min |
| 8 | YG10X | 14.35~14.55 | 16.5~21.0 | 8.5~9.6 | 90.5~91.5 | 1850 | 1420℃/60min |

YG6H：**NOT FOUND** 于该原厂表。YG10X 的独立、明确标 HRA 的第二原厂数据表：**NOT FOUND** 于本轮有效来源。Miller 的“鉴定制度”是其表格上下文，不能描述成 Sureay 的热处理或制造参数。

### 4.3 应如何处理争议

- Claude 对“91–93 HRA 覆盖四个牌号”的质疑值得采纳为**待核实问题**。当前目录的集合写法缺少牌号逐项映射；外部原厂表不能证明该集合适用于 YG6X/YG6H/YG8/YG10X 全部。
- 不能下结论说“Sureay 的 YG8 硬度已被证明错误”。CUTSTAR 与 Miller 是不同生产商，定义、工艺和表格量表还存在差别；也没有找到 Sureay 本批材料厂家和实测记录。
- 四牌号本轮都没有达到“两个独立来源数值一致且条件一致”的高可信度标准。CUTSTAR 的明确 HRA 值仅适用于该厂该表；Miller 的混合表头原值单列，不融合、不求交集、不平均。
- **原规格保留。新 Advantage/FAQ 草案暂不复制“这四种均为 91–93 HRA”**，可写已确认的 WC-Co/牌号选择方向；要写硬度时，以实际供材牌号、供应商数据、测试量表及验收范围逐项核实。这个缺口不阻塞不含该数字的其余文案审核。

## 5. 两条薄弱优势的可用替代选题

以下为方案候选，证据等级“目录已有”，只进入待用户核对的英文稿，不代表已经上线。目录定位使用 JSON 中产品 `id` + 字段，可回到 SSOT 查同名产品。

| 位置 | 建议英文标题 / 描述方向 | 现有目录证据 | 具体买家价值 | 应排除的未经确认承诺 |
| --- | --- | --- | --- | --- |
| Corrugated advantage 2 | **Solid and Split Blade Options**；说明有整片与分片刀型，按买家的刀座/安装构造提供对应形式。 | `corrugated-slitter-scorer-blades.specs` 的 `Blade options = Solid disc or split construction`；`Mounting` 列出 plain bore、fixing-hole、slotted patterns。 | 买家能明确询价整片或分片构造，提供对应孔/槽图；价值是可选供货结构，不是抽象“配合稳定”。 | 不添加“无需停机更换”、绝对无压塌或所有机型通用；不引用待确认 15–340 mm 总范围和约 0.3 mm edge apex。 |
| Corrugated：避免与第 3 条重叠 | 第 2 条只讲 **构造选择**；第 3 条若讲按图孔/槽接口，就只讲 **定制边界和下单资料**。 | `detailLayout.dimensionTables.thin` 中 BHS 240×32×1.2/1.3、2×Ø8.5 与 Fosber 230×110×1.1、6×Ø9 / 230×135×1.1、4-slot 等记录。 | 不同安装图可分别报价；这些记录是目录配置，不可从名称推断跨 OEM 互换。 | 不把 BHS/Fosber 名称当成 OEM 授权或所有同品牌设备的适配证明；不为增加卖点改现有尺寸。 |
| Nonwoven advantage 3 | **Top Knives, Bottom Rings and Crush Cutters**；简要说明可按剪切或压切工位选择对应部件。 | `nonwoven-slitter-knives.detailLayout.dimensionTables` 同时包含 dished/flat top knives、bottom anvil rings、double-edge rings、multi-groove sleeve、score/crush cutters、heavy crush cutters。 | 买家可在一次询价中列出实际需要的上刀、底环或压切刀；供货形式具体，且不依赖 CoC 或医用认证。 | 不承诺全部产品自动配对、预检间隙、医疗资质、所有上/下刀互换；不把目录 ESD 选项升级成持续消散电荷或无粘纤维性能保证。 |

Nonwoven 的 CoC、材质证明、硬度报告、CMM、批次追溯仍放能力待确认清单，有内部证据后可决定某一产品是否需要一个相关 FAQ；不能为了凑 8 问在每页恢复同一商务问题。

## 6. 本证据对修订方案的直接约束

1. 每个优势/FAQ 需标明“出处 + 可写边界 + 需确认承诺”，不要把四档出处标签误当成真伪评分。
2. 线上历史措辞可帮助恢复销售方向；旧站“零、完全、每批、必然、现货”等量化或服务承诺仍需独立核实。
3. 材料 FAQ 围绕该页的基材/失效/供货选择，勿再重复优势中的牌号清单；材料通用比较的主归属留在 Carbide 页，并用实际需要的内链衔接。
4. ASP 命名调整与 YG 硬度核实是两种问题：前者可核定历史别名；后者必须落到实际厂商和牌号条件，不从网络表拼凑 Sureay 规格。
5. 13 页的“线上对照”状态逐页显示；Slotter 明确缺失。未找到数据不是删掉现有规格的理由。

本轮验证：线上 13 路径 HTTP/产品标题/优势区核对；官方材料表及必要 PDF 表格目视复核；本目录证据文件可独立回查。未运行构建、翻译或页面变更。
