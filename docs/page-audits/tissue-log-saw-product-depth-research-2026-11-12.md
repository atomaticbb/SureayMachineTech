# 外部研究报告：Tissue Log Saw Blades 的产品深度与变体机会

## 0. 摘要

- 研究日期：2026-11-12。本轮仅调研、提出方案，未修改页面、产品数据、图片或语言版本。
- 覆盖范围：纸巾/卫生纸/厨房纸卷横断刀；对比消费卷、工业大卷及相邻的折叠纸产品工位。保留 Nonwoven 独立采购意图。
- 用户确认的业务背景：Tissue Log Saw 是 Sureay 主营产品，已销韩国、越南、日本、土耳其。这是用户提供的事实；本报告不由此推定客户品牌、机型、尺寸或性能。
- 正式采用 11 份可读取的一级来源，来自 7 个独立发布方：TKM、Julia、Bretting、TOYO、ZAMBAK、Valmet、IKS/UCT。另有 1 份可读 OEM 补充、2 份访问受限线索和 1 份地区词汇线索；这些补充未用于新增尺寸表。二级、三级数值依据均未采用。
- 主要发现 1：当前页确实偏薄，主要缺少**可采购的具体配置和供货证据**，不宜仅靠增加独立 URL 解决。
- 主要发现 2：同一页可以合理容纳多个外径、中心孔、刀体厚度及安装组合。相同 OD × bore × thickness 也可能有不同 hub/profile，不能视为同一配置。
- 主要发现 3：Consumer tissue/towel 与 AFH/industrial jumbo roll 有真实工况区别；是否成为两款 Sureay 产品，取决于实际供货图号与订单，而不能只按大/小外径划线。
- 主要发现 4：日本 TOYO 的目录例子从 Ø500 mm 起；土耳其 ZAMBAK 明确列 Ø610 mm 刀径。欧洲/北美目录也有多个大外径系列，但这些不自动成为 Sureay 规格。
- 主要发现 5：现有三张成批木箱包装实拍已经具备展示主营业务经验的素材条件，尚缺图片与具体配置/交付记录的对应说明。
- 最大缺口：Sureay 最常销售的配置表、刀面剖面与孔型图、实际机型/件号映射、材质和检验报告、可公开订单样例。外部资料无法补齐这些内部事实。

**建议结论：先把现有 Tissue Log Saw 详情做成完整的主产品页，优先增加真实配置行、应用选择、技术 FAQ 和已确认供货证据。当前没有足够依据把 610/810/870/1000 等每个直径都拆成独立产品页。AFH/Industrial Jumbo Roll 是后续最值得评估的独立变体方向；暂不执行。**

### 当前页面究竟薄在哪里

本地核查对象：[Tissue Log Saw 详情](http://localhost:5173/products/tissue-log-saw-blades)、[`blades.ts`](../../client/src/data/blades.ts)、[`seo-config.ts`](../../client/src/utils/seo-config.ts)。与 [既有 Log Saw 研究](external-research-log-saw-blades-2026-11-11.md) 和 [首轮目录巡检 OT06](catalog-first-pass-review-2026-11-12.md) 对照。

| 当前内容 | 已有价值 | 具体缺口 | 后续内容位置 |
|---|---|---|---|
| Title：Tissue Log Saw Blades for Tissue & Towel Rolls；H1：Tissue Log Saw Blades for Paper Roll Converting | 主产品与用途明确 | 首屏无法快速看出已确认供货尺寸/材料 | 保持简洁首屏，回签后补 Sizes 与真实材料 |
| 4 项规格：用途、需提供的刀体尺寸、安装、磨削 | 询价输入合理 | 实际是“买家要量什么”，没有代表配置，买家不能自选 | Technical Specifications + Common Standard Dimensions |
| 没有标准尺寸表 | 没有把未核实 OEM 数值冒充供货能力 | 既有业务的真实配置没有展示 | 从真实订单和图纸提取配置，不照搬竞品表 |
| 2 个 Technical FAQ，公司 FAQ 为空 | 已说明磨损刀测量及磨轮影响 | 缺同直径不同孔型、consumer/AFH、磨后刀体/刃型、材质/涂层、症状排查等采购问题 | 现有 FAQ 内扩充，保留双栏规范 |
| 多张主图/包装实拍 | 有实际物件与成批包装视觉材料 | 未标图号/配置，不能从照片确认 Ø610、D2、目的国或具体 OEM | 规格旁图注、已有技术区、Why Choose Sureay 的已确认交付例子 |
| 相关产品是 Nonwoven Log Saw 和 Paper Slitter | 横断与上游纵切分工明确 | 供应商通常还讨论磨轮/磨削配套；Sureay 是否供货未知 | FAQ 说明需配套核对；未确认前不新增配件产品 |
| 通用 ISO/CMM/自有热处理条 | 有质量沟通意图 | “All values verified”与无数值采购表不对应，凭据见上一轮巡检 | 质量证据回签后再限定表述，不以竞品检验能力填补 |

现有 `tissue-log-saw-blades-real-01/02/03.webp` 已逐张查看：均有圆刀、刃口保护及木箱包装；没有足以确认目的国、钢号、完整尺寸和 OEM 的清晰标识。当前 `galleryAlts` 中的“Ø610 mm D2”和“Fabio Perini”需要对应内部记录，不能用 alt 作为其自身的证据。图片暂不调整。

## 1. 搜索意图与关键词

以下是公开厂商采用的产品术语及合理的采购意图分析，**不是搜索量排名**。原研究中的 GSC 小样本不作为本轮新增流量预测；本轮没有重新拉取 GSC。

| 词汇 | 类型 | 可能的搜索意图 | 依据 | 建议位置/边界 |
|---|---|---|---|---|
| tissue log saw blades / log saw blades for tissue paper | 核心词 | 已成卷纸品的替换横断刀 | S1、S2、S11 | Title/H1/摘要主词；保留 tissue 限定 |
| toilet paper cutting blades / kitchen towel log saw blades | 应用长尾 | 卫生纸、厨房纸卷加工 | S7、S11 | 应用选择或 FAQ，通常同页承接 |
| orbital log saw blade / orbital log saw knife | 设备/运动方式 | 为 orbital saw 找刀片与磨削配套 | S5、S8 | 名称类 Technical FAQ；需对应实际设备 |
| industrial roll / jumbo toilet roll / jumbo wound toweling | 应用长尾 | 较高密度、工业大卷横断 | S4 | 同页应用段起步；有独立配置/工况证据后才评估子页 |
| 610 mm / 810 mm / 870 mm log saw blade | 规格词 | 以原刀外径初筛 | S1、S2、S9 | 经确认配置表中的尺寸行，不为每个直径建一页 |
| bore / pin holes / threaded holes / hub / bevel profile | 接口长尾 | 核对替换刀装配 | S2、S3 | Technical Specifications、图纸标注、FAQ |
| log saw blade sharpening / scalloped blade / lateral runout | 技术问题 | 区分刀片和机器/磨削问题 | S8、S10 | FAQ 做短答，复杂诊断由已有/后续文章承接 |
| Perini / PCMC / Futura / Kawanoe Zoki / ZAMBAK replacement blade | 品牌词 | 按装机品牌寻找替换件 | S1、S7、S8、S11 | 只在内部确认适配后放对应配置或 FAQ；品牌目录名单不等于逐行匹配 |

`log saw` 单独检索容易混入木材锯切。`paper saw blade` 也可能过宽。核心英文页面应维持 tissue/roll converting 的工位限定；不把 Cold Saw 删除后的流量硬转到本页。

## 2. 技术事实（A 类：行业通用事实）

### 2.1 材质与硬度

| 材质 | 标准牌号 | 典型硬度（原始单位） | 典型用途 | 来源 | 独立来源数 | 可信度 | 冲突说明 | 审核状态 |
|---|---|---|---|---|---|---|---|---|
| Julia tissue 圆刀材料 | 1.2379 | 成品对应硬度 NOT FOUND | 该厂 tissue log saw 目录 | S2，第 5 页 Material | 1 | 中 | 不能由此证明 Sureay D2/Cr12MoV/M2 全部选项 | 待内部确认 |
| IKS tissue 刀基体 | D-2 | 基体成品硬度 NOT FOUND | IKS 圆刀系列 | S9，第 1 页材质区 | 1 | 中 | 该页涂层硬度不是刀体硬度，不混用 | 待内部确认 |
| 日本 TOYO 材料族 | SKS、SKD，未指定后缀 | NOT FOUND | Log Tissue Cutter | S6，材质栏 | 1 | 中 | 不能擅自细化为 SKD11 或某一成分等同牌号 | 待内部确认 |
| 表面处理/减摩方案 | TKM 特有金属涂层；IKS EXO | 通用硬度 NOT FOUND | 各厂家特定系列 | S1 涂层段、S9 第 1 页 | 2 | 中（存在多种方案） | 不是通用商标/材料，不能复制为 Sureay 能力 | 待内部确认 |

本轮没有找到足以对 Sureay 全系列填写统一 HRC、材料寿命倍数或涂层名称的依据。Julia 目录第 6 页的 1.3343、PVD 说明属于**纸管切割小圆刀**，不应移到第 5 页 tissue 大圆刀材料栏。

### 2.2 尺寸与标准尺寸系列

这里只选能说明变体关系的少量事实，不重制竞品完整目录。

| 零件类型 | 参数 | 范围或系列 | 原始单位 | 毫米/英寸 | 来源 | 独立来源数 | 可信度 | 审核状态 |
|---|---|---|---|---|---|---|---|---|
| Tissue 圆刀市场系列 | 外径 | 610、810、870、1000、1200 | mm | 约 24.02、31.89、34.25、39.37、47.24 in | S1 FAQ、S2 第 5 页；S9 支持前四个公制值 | 2–3 | 高，仅这些外径在市场存在 | 待内部确认 |
| TOYO Log Tissue Cutter | 示例范围，不是全组合清单 | OD500–610；bore25.4–100；T3–9 | mm | OD19.69–24.02；bore1.00–3.94；T0.118–0.354 in | S6 尺寸例 | 1 | 中 | 待内部确认 |
| Julia 610 系列示例 | OD×bore×body thickness | 610×68.26×4.76；另有82.55孔 | mm | 约24.02×2.687×0.187 in；82.55=3.250 in | S2 第 5 页、S3 第 1 页，同一发布方 | 1 | 中，不代表某一 OEM 全接口 | 待内部确认 |
| Julia 810 系列示例 | 相同OD/孔、不同刀体厚度 | OD810、bore60，T5或6 | mm | 31.89、2.362、0.197或0.236 in | S3 第 1 页 | 1 | 中 | 待内部确认 |
| Julia 大径示例 | OD/孔/刀体厚度 | OD1000、bore60、T8 | mm | 39.37×2.362×0.315 in | S2 第 5 页 | 1 | 中；不确认旧 Sureay 6 mm 行 | 待内部确认 |
| Bretting Industrial Roll Log Saw | 该整机最小/最大可用刀径 | 27–30 | in，另列686–762 mm | 精确27×25.4=685.8，30×25.4=762 mm | S4 Specifications | 1 | 中，仅该整机 | 待内部确认 |
| ZAMBAK ZM-OK | 刀片直径 | 610 | mm | 约24.02 in | S7 Diameter of Blade | 1 | 中，其他接口 NOT FOUND | 待内部确认 |

**尺寸使用原则**：制造尺寸表应从一张完整图纸确定 OD、孔、厚度与安装组合；不能把上表各范围做笛卡尔组合。单位转换采用 `in × 25.4 = mm`、`mm ÷ 25.4 = in`。高可信度的外径交集，不等于高可信度的完整替换配置。

### 2.3 几何形状与接口惯例

| 项目 | 需要区分的内容 | 来源 | 可信度 | 审核状态 |
|---|---|---|---|---|
| 同三维尺寸的配置差异 | Julia 两个610×68.26×4.76示例的hub分别216/230、L分别197/190 mm；仍是不同剖面配置 | S3 第1页相邻两行；hub约8.504/9.055 in，L约7.756/7.480 in | 中 | 待内部确认 |
| Bevel 字段 | S2/S3 的L单位是mm，不是角度°。若页面写刃角，必须单独从截面图取值 | S2 第5页表头及S3图示/单位 | 中 | 待内部确认 |
| 驱动孔与螺纹孔 | 表内分开记录；孔数、孔径/螺纹、节圆及位置应按同一图纸核对 | S2 第5页，S3第1页 | 中 | 待内部确认 |
| 磨削系统与刀口 | 磨轮类型/位置改变可能形成不同刀口轮廓；旧机改造状态也影响询价输入 | S8 Main characteristics及165E/176E/177适用说明 | 中 | 待内部确认 |
| 跳动指标 | 静态刀片、装机后动态振动及轴/法兰状态需要分别判断；不能用一个“zero wobble”概括 | S10 原因分类；S1检验段为厂商自身声明 | 中 | 待内部确认 |

## 3. 适配信息

| 刀座或机器品牌 | 系列/型号 | 使用零件类型 | 可用外部信息 | 来源 | 可信度 | 必须由公司确认 | 审核状态 |
|---|---|---|---|---|---|---|---|
| ZAMBAK | ZM-OK VI/IV/I表列型号 | orbital log saw大圆刀 | 刀径610mm；成品卷径90–160mm是另一字段；孔、hub、件号NOT FOUND | S7 | 中 | 是 | 待内部确认 |
| Bretting | Industrial Roll Log Saw | 高密度工业卷横断刀 | 27–30in刀径；中心孔/螺纹/件号NOT FOUND | S4 | 中 | 是 | 待内部确认 |
| Bretting | 24 Inch Orbital Log Saw | facial/bath tissue/towel工位圆刀 | 已证实这些应用共用设备族；原页24in并列607mm有换算冲突，不能直接采为刀图 | S5 | 中 | 是 | 待内部确认 |
| Valmet / Perini | 165E、176E、177 | 相关磨削改造系统 | Rotoreverse方案适用于所列机型；替换刀完整尺寸NOT FOUND | S8 | 中 | 是 | 待内部确认 |
| PCMC、Futura、Kawanoe Zoki等 | 本轮未取得逐型号刀图 | 竞争刀厂标注可覆盖的设备品牌 | 仅品牌名单，不能将610/810等目录行按顺序分配品牌 | S1、S11 | 中，限竞争方目录存在该表述 | 是 | 待内部确认 |

**没有将 Futura 的卷径或 PCMC 的截切成品长度当刀片直径。** Futura原消费线页面直接打开403且官网正在更新，PCMC旧PDF直开404；检索缓存中的F30.A/Prolog资料只记录为研究线索，不作为新增Sureay尺寸依据。

## 4. 选型指引

| 情况 | 常见推荐核对项 | 理由（转述） | 来源 | 可信度 | 审核状态 |
|---|---|---|---|---|---|
| 卫生纸与厨房纸 | 先确认同一机器是否做两种产品、卷径/密度、切后长度及原刀图 | 成品用途不同不必然意味着刀片是不同产品 | S7、S11 | 中 | 待内部确认 |
| 工业大卷、AFH、较高密度卷 | 确认机器/刀片配置、卷密度、切口热与磨削安排 | 市场有独立industrial-roll设备和特定减摩方案 | S4、S1 | 中 | 待内部确认 |
| 仅知道外径或旧刀外径 | 补bore/body thickness/hub/profile/安装孔，询问新刀原始尺寸 | 同外径及同三维尺寸均可能有不同接口/剖面 | S2、S3 | 中 | 待内部确认 |
| 换过磨削系统 | 记录改造型号、磨轮位置及原刀截面 | 不能只按整机铭牌的出厂版本判断刀口 | S8 | 中 | 待内部确认 |
| 波浪刃/多边形磨损、切口问题 | 收集装机跳动、磨轮污染、压力/磨削周期等现象，再由设备方确认设置 | 刀片、安装及磨削可能共同作用 | S10 | 中 | 待内部确认 |
| 选涂层或新材质 | 先取得原材质、异常表现、测量/试切条件，再核对可供方案 | 市场存在专用表面方案，但效果属于其试验边界 | S1、S9 | 中 | 待内部确认 |

不在销售页给所有机器统一的RPM、磨削时间、压力或温度处方；FAQ应帮助买家提供条件，具体运行参数依机器手册/设备方核定。

## 5. FAQ 候选

这些是后续英文 Technical FAQ 的**选题与答案方向**，本轮没有写入页面。名称解释留在 FAQ，首屏不增加大段描述。

| 问题（采购商的说法） | 回答方向，不超过两句 | 分类 | 来源 | 审核状态 |
|---|---|---|---|---|
| Tissue log saw blade、orbital log saw knife 是同一类零件吗？ | 都可能指纸品横断圆刀，orbital说明设备运动方式；仍需按机器和接口识别具体刀。 | 技术 | S5、S8、S11 | 待内部确认 |
| Toilet paper 和 kitchen towel 必须用不同刀吗？ | 不必仅按成品名称分刀；同一设备可能加工两种卷品，应核对刀图和工况。 | 技术 | S7、S11 | 待内部确认 |
| 610mm 刀能否直接替换另一把610mm刀？ | 不能仅凭外径确认；中心孔、厚度、hub、剖面及孔型必须匹配。 | 技术 | S2、S3 | 待内部确认 |
| 如何区分刀片厚度、刃口轮廓和bevel length？ | 采用有尺寸符号的截面图说明；mm表示的轮廓长度不能写成刃角。 | 技术 | S2、S3 | 待内部确认 |
| AFH/industrial jumbo roll 需要提供哪些额外信息？ | 提供产品卷径/密度、机器和原刀配置，并说明发热、切面或芯管问题。 | 技术 | S4、S1 | 待内部确认 |
| 旧刀磨小后该如何下单？ | 用原图或未磨刀确定原始外径和截面，同时记录旧刀现状；最小可用刀径由指定机器要求核实。 | 技术 | S4、S8 | 待内部确认 |
| 刀口磨成波浪形一定是材质问题吗？ | 也可能涉及磨轮、安装与动态振动；先收集工况而非直接保证换钢号解决。 | 技术 | S10 | 待内部确认 |
| 换刀时是否需要同时核对磨轮？ | 需要确认其型号、位置与原刀轮廓；是否同时供应磨轮由Sureay供货记录决定。 | 技术 | S8、S11 | 待内部确认 |
| 可以按我们的原刀图、机型号或样件确认吗？ | 先列本厂实际能核对的资料与输出物，再说明图纸批准流程；不预先承诺所有OEM直接替换。 | 为什么选我们 | S2/S3仅支持需核对字段；内部执行能力待核 | 待内部确认 |

建议首批从上述候选挑选最贴近已有询盘的6–8题，合并现有两个问题，避免把同一采购问题分成多个近义问答。国家交付经验更适合 Why Choose Sureay 的短证据段；不要编成多个国家SEO FAQ。

## 6. 参考站页面结构

| 参考页 | 顶部字段与CTA | 规格与适配组织 | 借鉴方式 | 不直接复用的部分 |
|---|---|---|---|---|
| S1 TKM LogSaw | 单一产品族标题、询价入口 | 同页放外径FAQ、质量记录、表面方案和相关磨轮 | 一个主产品页承载多配置；技术与制造证据分清 | 100%检验、所有机器适配及性能百分比属于TKM |
| S11 Julia产品页 + S2/S3资料 | 单一产品名、短应用说明、资料下载、询价表 | 数据表将几何/孔型分列；品牌在整体说明中 | 让买家能根据完整配置核对，不只看OD | 不能把整体品牌清单强行映射到每行尺寸 |
| S6 TOYO | 产品名、用途、材质族、尺寸例、目录链接 | 用“例”说明范围，未生成每个直径的独立页 | 简洁首屏可以和有用技术字段共存 | 不把500–610等范围当所有组合均可供 |
| S4/S5 Bretting | 设备应用先行 | 卷材尺寸、切后长度、刀片范围分开 | Sureay也应明确每个数字的对象 | 整机速度、夹持范围不属于刀片制造规格 |
| S7 ZAMBAK | 设备型号/通道配置、视频、技术表 | 将成品卷径与刀片直径明确分列 | 本厂询价字段也按“被切材料/刀片/设备”区分 | 原厂整机精度不能转述为Sureay刀具公差 |

以上观察支持“同页多配置”的可行性，不能证明某种网页结构一定取得更高排名。拆页需结合真实供货和查询数据。

### 6.1 建议的 Sureay 内容次序

| 顺序 | 现有模板位置 | 本品类应加入的内容 | 发布前资料条件 |
|---|---|---|---|
| 1 | 首屏 | 产品名、已确认尺寸摘要、材料、用途、询价；保留简洁布局 | 供货范围回签；不得直接用竞品610–1200范围 |
| 2 | Technical Specifications | 各参数定义：OD/bore/body thickness/hub/profile/孔型，配本厂截面与孔型图 | 确定图号，解释外形及重要接口 |
| 3 | Common Standard Dimensions | 建议列：Item No.；OD×bore×body thickness；hub/profile参考；孔型/图号；已确认机型或件号 | 一行一配置；分类编号按目录统一分配，不在本报告预占编号 |
| 4 | 现有技术说明/图纸区 | 同页展示consumer tissue/towel与industrial roll选择差异；用真实照片映射配置 | 有实际供货才列为可选应用/结构 |
| 5 | 检验/供货证据 | 挑一份可公开的刀片检验记录，说明测量对象和批次；用已核实包装图 | 不用“zero wobble”“所有值CMM”替代实证 |
| 6 | 双栏FAQ | Technical选型/名称/故障输入；Why Choose Sureay放真实出口、样件核对和交付支持 | 销售/质量回签服务边界 |
| 7 | 相关产品/文章与RFQ | 保留Paper Slitter和Nonwoven区分；磨削专题文章承接复杂诊断；询价收完整接口 | 不增加尚未确认供应的磨轮/润滑产品卡 |

### 6.2 变体与是否拆页：逐项建议

下表是**研究后建议**，不是产品新增清单。

| 候选变体/方向 | 市场依据 | 建议处置 | 判断理由及必须补的Sureay资料 |
|---|---|---|---|
| Consumer Toilet Tissue / Kitchen Towel | S7、S11均共同描述两类卷品 | 当前主产品页的用途分组 | 可能同刀同机；单凭卫生纸/厨房纸名称不能证明两种独立刀 |
| 610mm、810/870mm及其他已供尺寸族 | S1–S3/S9 | 优先同页配置表，可分尺寸段 | 搜索尺寸是识别线索；独立孔型/厚度/图号才形成可采购变体，无需每行一个URL |
| AFH / Industrial Jumbo Roll | S4专用设备；S1讨论AFH摩擦/热 | **最值得后续评估的独立子页**；当前先作为同页应用小节 | 有真实大卷/高密度配置、专属图像和采购问题，且持续有询盘时再拆。不能把1000mm自动等同AFH |
| 500–610mm较小刀径系列 | S6日本成熟刀厂示例 | 先查本厂日韩订单；有供货再增配置 | 不据此认定日本全部使用小径刀，也不把该系列做成“Japan blades” |
| Coreless tissue用途 | Bretting另有专门设备，见补充来源L3 | 先列询价工况，暂不独立产品页 | 无芯卷的夹持/切割要求不自动产生独特刀体；本厂图纸NOT FOUND |
| Coated vs uncoated | S1、S9各有特定表面方案 | 先做真实材料/表面选择项 | 尚未证实Sureay具体涂层、供应链、测试结果；不先做“premium coated”页 |
| 610等直径的“Perini/PCMC/Futura版” | S1/S11只有整体品牌覆盖；S8为具体改造机型 | 有图号后放相应配置的Machine reference；暂不品牌批量拆页 | 安装与剖面可能随型号/年份/改造变化，品牌名本身不足 |
| Folded tissue / facial / banded产品横断刀 | S5表明设备族存在该用途 | 作为相邻工位研究候选，暂不新增销售页 | 需本厂实际供货、零件身份和关键词意图区分；不能把folded产品全部写作wound log |
| CBN grinding wheels、纸管切刀 | S1/S11配套磨轮；S2第6页纸管刀 | 单独待办，确认供应后另建配件/产品入口 | 是不同零件，不能拿来人为增加Log Saw刀片变体数 |

独立子页的建议门槛：有独立采购任务、实际不同配置与图片、可公开技术信息和真实询盘/查询证据。没有这些条件时，同页配置更能避免重复薄页。**韩国、越南、日本、土耳其是交付经验维度，不是四种刀片型号。**

## 7. 术语与单位

| 市场样本 | 建议采用术语 | 地区观察 | 单位习惯 | 来源 |
|---|---|---|---|---|
| 欧洲/北美厂商 | tissue log saw blade，必要时orbital | TKM/Julia/Bretting用词能对上相同采购工位 | mm及部分in；按原图主单位 | S1、S2、S4、S5、S11 |
| 日本刀厂 | 英文页仍以tissue log saw为主；研究中保留原产品名 | TOYO使用“ログティッシュカッター”，其目录英文为Log Tissue Cutter | 页面尺寸例用mm | S6；不由单一厂商推全日本搜索习惯 |
| 土耳其OEM | log saw / automatic log saw，加tissue或toilet paper限定 | ZAMBAK英文站用Automatic Log Saw；其正文slitting描述仍是在卷品横断工位 | 表中mm | S7；不要因此把它归入web slitter |
| 越南 | 继续用准确英文主词，后续用真实询盘归纳别名 | 本轮见越南语经销商称Dao cắt giấy tissue，但未纳入一级规格证据 | 地区采购词频NOT FOUND | 补充线索L4，只作词汇观察 |
| 韩国 | 暂不新增未经核实的韩语关键词 | 可靠、可代表采购用法的本地原始样本NOT FOUND | 单位偏好NOT FOUND | 已搜索本地词与英文；需用户实际询盘 |

不创建国家落地页、韩/日/越/土语言版本，也不根据翻译网站的木材“log”误译扩展关键词。国家订单可作为真实出口经验，在英文页一处简短呈现；涉及年份、批量、机型、结果的细节另行回签。

## 8. 冲突与缺口

### 8.1 冲突数据

| 项目 | 数值/口径A | 数值/口径B | 可能原因/处理 | 人工决定 |
|---|---|---|---|---|
| 810mm与32in | S1/S2的810mm | S9并列32in，精确812.8mm | 名义系列标签不同，不将其当严格相等 | 按原图的主单位 |
| Bretting 24in页面 | S5写24in | 同格写607mm；24in精确609.6mm | 公开表换算/标注有出入，不能自行挑值用于制造 | 需原厂/原刀图确认 |
| 同610×68.26×4.76 | S3 hub216/L197 | S3 hub230/L190 | 同三维尺寸的不同轮廓配置 | 按对应剖面及安装图 |
| 同Ø1000×Ø60的外部目录厚度 | 既有研究记录Senda为6mm，本轮未重新采用该来源 | S2目录为8mm | 不同配置可能并存；不能因竞品不同就推翻Sureay旧值 | 取本厂原订单/图号，不以外部两值择一 |
| 刀径 vs 卷径 | S7刀径610mm | S7成品卷径90–160mm | 不同对象，不是参数冲突 | 表头必须写明对象 |
| 全系列薄页 vs 主营经验 | 当前页只显示采购字段 | 用户确认四国交付、现有批量包装实拍 | 内容未呈现业务深度；不是外部证据不足就否定主营业务 | 以最少真实配置和交付记录补足 |

### 8.2 未找到

| 项目 | 已核对位置 | 为什么重要 |
|---|---|---|
| Sureay逐配置OD/孔/厚/hub/孔型/机型/Item No.对应（NOT FOUND） | 当前目录、历史研究、实拍、S1–S11 | 决定真实变体数量及是否可下单 |
| Sureay基体硬度、跳动/平面度验收与试验条件（NOT FOUND） | 当前采购表与竞争方资料 | 不把竞争方质量/速度承诺复制过来 |
| Sureay可供涂层及样品/量产记录（NOT FOUND） | 当前字段、S1/S9 | 决定是否有coated产品选择 |
| 逐行OEM完整互换图和改造版本（NOT FOUND） | S2/S3的整体品牌列表、S7/S8 | 同品牌可能存在不同接口 |
| 韩国、越南买家关键词量及当前GSC分国查询（NOT FOUND） | 公开搜索与既有报告 | 本轮不承诺新增词可带来多少流量 |
| 四国交付的可公开配置/年份/图片对应（NOT FOUND） | 用户陈述和本地实拍 | 用户确认国家经验可保留，精细案例须另取信息 |
| Futura现行刀图、PCMC当前可直读原始刀图（NOT FOUND） | 原站更新/403、旧PDF404、检索缓存 | 不以缓存整机数据代替刀体尺寸 |

## 9. 竞品声明（仅供参考，不可复用）

| 竞品 | 声明类型 | 来源 | 为什么不能复用 |
|---|---|---|---|
| TKM | 自动检验/追溯、专有表面处理、与OEM公差比较 | S1 | 是其工艺和履约声明；不能作为Sureay认证、检验或性能证明 |
| Julia | 特有轴向几何、加工及切割性能 | S11 | 需本厂自己的图纸/试验，不将其研发成果改成Sureay说法 |
| IKS/UCT | EXO表面处理及试验收益 | S9 | 商标和效果属于该系统；不推定同色刀面具有相同性能 |

## 10. 需要内部确认的问题

建议先取**最小资料包**：常销配置清单、各配置一张批准图/可核对样件、代表性检验单、四国交付的简要对应信息。无需先整理所有历史订单，也不必公开客户身份。

| 序号 | 问题 | 影响的页面字段 | 负责部门 | 外部资料不能回答的原因 |
|---|---|---|---|---|
| 1 | 最近实际重复供货的前几种配置分别是什么？OD、bore、body thickness、hub/profile和安装孔必须成套 | 标准表、尺寸摘要、变体数 | 工程/销售 | 竞争方尺寸不代表本厂生产清单 |
| 2 | 哪些图号用于consumer toilet/kitchen towel，哪些用于industrial/AFH、高密度或coreless？ | 应用分组、是否拆子页 | 工程/销售 | 外径大小不能自动决定用途 |
| 3 | 四个已交付国家分别能对应哪些匿名订单、配置和现有图片？ | 主营经验、Why Choose Sureay、图注 | 销售 | 用户已确认国家，具体案例细节仍缺 |
| 4 | 各配置实际钢号、硬度及可供涂层是什么，哪些是常规、哪些需另评估？ | 材料/表面选项与FAQ | 工程/采购/质量 | 不能由D2常见或竞品有涂层推定本厂能力 |
| 5 | 可公开的跳动/刀体厚度/平面度指标、测量方法和原始记录是什么？ | 技术表、质量说明 | 质量 | 需区分刀片独立检测与装机状态 |
| 6 | 主图/包装图分别对应哪个图号？alt中的610、D2、Perini是否有依据？ | 图片、alt、尺寸对照 | 工程/市场 | 外观不能证明隐藏参数 |
| 7 | 是否实际供磨轮、修磨或其他配件？若只核对原磨轮，能提供什么支持？ | FAQ、相关推荐、配件待办 | 销售/工程 | 不复制Julia/TKM整套供应服务 |
| 8 | 本品类是否有可确认的样品、最小量、交期和资料随货口径？ | Why Choose Sureay、RFQ | 销售/质量 | 需真实履约边界，不能沿用默认承诺 |

第一轮回签后即可把现页做完整；尚未回签的配置/公差保持原值或明确待核，不因本报告查到外部型号就自动替换。

### 首轮配置回签表

以下为空白采集模板，**不是新增 SKU 或拟上架规格**。先填写实际重复供货的前三至五个配置即可；不必凑齐 consumer、AFH 或每个国家。几何字段统一先记录原图单位，孔型和剖面可直接引用受控图号，避免在表中手工转录复杂尺寸。

| 实际配置/图号 | OD × bore × body thickness；hub/刃面剖面；孔型图号 | 实际应用；OEM/机型/件号（有凭据才填） | 材料/热处理/表面；检验记录 | 可对应的匿名订单/国家/现有图片 | 回签人/日期；可公开字段 |
|---|---|---|---|---|---|
| 常销配置1：待填；Item No.统一编排时分配 | NOT FOUND | NOT FOUND | NOT FOUND | NOT FOUND | 待填 |
| 常销配置2：待填；Item No.统一编排时分配 | NOT FOUND | NOT FOUND | NOT FOUND | NOT FOUND | 待填 |
| 常销配置3：待填；Item No.统一编排时分配 | NOT FOUND | NOT FOUND | NOT FOUND | NOT FOUND | 待填 |

图号不同而外径相同的配置分别记录；仅照片角度、销售国家或包装不同，不单独编成刀片变体。已确认供货但不便公开的机型可保持内部映射，公开页引导按图核对。

## 11. 来源登记表

全部访问日期为2026-11-12；同一发布方的网页与PDF不是两个独立来源。第2–5节每行的来源编号在此登记。一级来源只能证明其自身发布内容，不能自动证明Sureay适配。

| 编号 | 标题与链接 | 发布方/等级 | 原文位置 | 本轮用途与访问情况 |
|---|---|---|---|---|
| S1 | [LogSaw Blades](https://www.tkmgroup.com/en/logsaw-blades) | TKM/1 | FAQ dimensions；涂层、质量检验和品牌段 | 已读取；尺寸存在性、产品页结构，能力另列竞品声明 |
| S2 | [Log Saw Blades for Tissue Paper](https://www.juliausa.com/wp-content/uploads/2021/08/LOG-SAW-BLADES-FOR-TISSUE-PAPER.pdf) | Julia/1 | PDF第5页技术表；第6页纸管刀；第7页企业历史 | 文字可读；截图请求有一次遇站点验证，不将不可见细节当证据 |
| S3 | [Circular Knives Tissue Datasheet](https://www.juliausa.com/wp-content/uploads/2021/08/CIRCULAR-KNIVES-TISSUE_USA.pdf) | Julia/1 | 单页图及上半表D/B/d/d1/L/孔型 | 已读取，同S2不重复计独立来源 |
| S4 | [Industrial Roll Log Saw](https://www.bretting.com/equipment/paper-converting-complementary-equipment/log-saws/industrial-roll/) | Bretting/1 | 用途首段；Specifications的Min/Max Blade Diameter | 已读取，限该整机 |
| S5 | [24 Inch Orbital Log Saw](https://www.bretting.com/equipment/paper-converting-complementary-equipment/log-saws/24-inch/) | Bretting/1 | 用途首段；Specifications | 已读取；24in/607mm矛盾保留，不私改 |
| S6 | [ログティッシュカッター](https://www.toyoknife.co.jp/product/paper/cutter) | TOYO Knife/1 | 用途、材质、寸法例 | 已读取；日本术语和示例范围 |
| S7 | [ZM-OK Automatic Log Saw](https://zambakkagit.com.tr/zm-ok-log-saw.html) | ZAMBAK/1 | Technical Specifications：成品规格、Diameter of Blade、Blade Grinding | 已读取；只验证该设备刀径及不同参数对象 |
| S8 | [IPP Rotoreverse SPT121](https://www.valmet.com/tissue/tissue-converting/equipment/ipp-rotoreverse-spt121/) | Valmet/1 | Main characteristics及适用Perini 165E/176E/177行 | 已读取；磨削改造，不是刀片尺寸目录 |
| S9 | [IKS Log Saw Blades Flyer](https://www.uctcoatings.com/wp-content/uploads/IKS-Log-Saw-Blades-DS-Flyer-2018.pdf) | IKS/UCT发布/1 | PDF第1页材质/尺寸/表面方案；第2页厂商试验 | 已读取；仅尺寸与产品方案事实，性能不移植 |
| S10 | [Scalloped / Polygonal Blades](https://www.tkmgroup.com/en/troubleshooting/poygonal-blades) | TKM/1 | 原因列表及各原因说明，2020-08-24 | 已读取；FAQ排查方向，不复制通用运行参数 |
| S11 | [Log Saw Blades for Tissue](https://www.juliausa.com/products/log-saw-blades-tissue/) | Julia/1 | 产品应用、品牌段、Datasheet/Brochure与询价表 | 已读取；页面组织与应用用词 |

### 补充线索与访问限制

| 编号 | 线索 | 访问/来源边界 | 本轮处理 |
|---|---|---|---|
| L1 | [Futura Consumer Lines](https://www.futuraconverting.com/en/consumer-professional-manufacturing-plant/consumer-lines/) | 原页直开403，搜索索引有F30.A；官网另显示更新中 | 仅记录consumer设备族线索，不采用缓存数值 |
| L2 | [PCMC Saws旧PDF](https://www.pcmc.com/docs/default-source/default-document-library/pcmc-saws.pdf?sfvrsn=5e763c4b_0) | 原始地址直开404，检索缓存仍有Prolog/HD信息 | 不将其数值列为已完整复验的现行刀规格 |
| L3 | [Bretting Compact Coreless Log Saw](https://www.bretting.com/equipment/paper-converting-complementary-equipment/log-saws/compact-coreless/) | 一级OEM页面已读取，用途首段/Specifications | 只用于coreless候选存在性；不主张Sureay已供 |
| L4 | [Dao cắt giấy tissue](https://natachi.com.vn/chi-tiet-san-pham/dao-cat-giay-tissue-266.html) | 越南经销页面，三级，检索可读 | 只观察本地词，不采其尺寸、硬度、品牌兼容作为依据 |

来源数量口径：上表11份正式来源 + L3为可读OEM补充；L1/L2为受限线索，L4为地区词汇线索。没有为满足数量补用不可靠数值来源。材料/术语/尺寸已取得至少三个独立发布方样本；逐机型完整接口和地区词频仍有明确缺口。

## 12. 给本轮决策的简短建议

1. 保留当前Tissue主详情URL，优先补全真实配置和技术信息，并应用已批准的Slitter/Shredder模板。
2. 先核对实际常销规格，并回查现有图片alt中610mm等声明的依据；不把成熟厂商列出的每个外径都变成Sureay产品。
3. 将AFH/industrial jumbo roll作为优先后续变体方向，待本厂图纸、工况、询盘能独立支撑再拆页。
4. 四国交付经验与包装实拍可成为产品深度的一部分；公开字段以用户确认范围和可对应记录为准。
5. 本次不新增产品、不写入英文页面、不生成其他语言版本，图片等待用户核对。
