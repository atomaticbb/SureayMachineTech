# Sureay 英文刀具目录第一轮巡检与回签清单

核查日期：2026-11-12。状态：**供 Yu 最终核对；未据此改动网站产品、图片、规格或分类。**

后续状态：同日用户单独授权的 Cold Saw 产品/分类删除已在本地完成，见[删除与验证记录](../seo-known-issues.md)。下文保留删除前巡检基线，其余产品的回签建议尚未执行。

## 1. 范围、判断方式与待实施计划

本轮核查当前工作区的 36 条公开刀具产品记录：Slitter 13、Shredder 7、Granulator 5、Shear 5、Log Saw 2、Wood Chipper 2、Custom 1、Cold Saw 1。按最新意向为 **35 款继续经营产品 + 1 款计划删除产品**。实际检查 7 个有效分类页、36 个详情页和 [/custom](http://localhost:5173/custom) 服务页，合计 44 个本地页面。Special-Shaped 的目录卡片指向 [/custom](http://localhost:5173/custom)，其 [/products/special-shaped-blades](http://localhost:5173/products/special-shaped-blades) 详情页也仍独立存在，已一并补查。

基线为当前 [`blades.ts`](../../client/src/data/blades.ts)、[分类元数据](../../client/src/data/blade-categories.ts)、[SEO 配置](../../client/src/utils/seo-config.ts)及 `localhost:5173` 的英文渲染。[/custom](http://localhost:5173/custom) 另核对[独立页面](../../client/src/pages/custom-blades.tsx)。结合 11 月 11–12 日已有研究，再访问整机厂、成熟刀具厂与材料厂来源；不采用 Technoplast 作为论据。

讨论中的六组导航方案为 Slitter、Shredder、Shear、Log Saw、Wood Chipper、Other & Custom：Plastic Granulator Knives 移到 Shredder 入口，其余四款塑料加工零件与 Custom 归入 Other & Custom，Cold Saw 删除。这些变更尚未反映在当前目录中；本报告把它们记为计划，不将旧导航仍存在误判为已实施后的故障。Other & Custom 内部仍应显示 Pelletizing、Melt Filtration、Cutter Compactor 等具体零件名称。

本报告使用以下判断：

- **可确认差异**：本地标题、图片、表格、说明之间可直接复现的出入。
- **市场覆盖待决策**：可靠来源存在另一尺寸或机型；这不意味着 Sureay 原范围错误，也不证明 Sureay 能供货。
- **内部依据待补**：公差、硬度、适配、检验、寿命、交期等需要 Sureay 图纸、检验单或履约记录。未找到记为 `NOT FOUND`，不等同于能力不存在。
- **暂未发现明显出入**：产品名称与工位相符；不代表已验证所有型号的互换性。

外部数值仅在两个独立来源对同一对象一致时才按高可信度使用；单一 OEM 参数限于所列机型。照片只能核对可见几何，不能据此认证材料、热处理、尺寸或品牌适配。所有未核实原尺寸保留，待 Yu 回签后再改。

## 2. 建议先回签的事项

整体上，主名称与刀具工位基本对应。优先核对图文一致性、具体配置映射和 Sureay 自身承诺；大多数原尺寸仍不足以靠公开资料逐行确定完整适配。

| 顺序 | 回签主题 | 当前发现 | 建议决定 |
|---|---|---|---|
| 1 | 图片与规格直接不一致 | 通用/金属撕碎刀的图示钩数与规格选项未对齐；Die-Face 第 1 张图纸“两槽”被写为“三槽”；Die-Face 主图与技术图 alt 对调 | 先确认真实图号和配置，再统一对应文字；详见 RC 条目 |
| 2 | 证书与质量声明范围 | [/custom](http://localhost:5173/custom) 引用的证书图片范围写 `Flange processing production`；16 个普通详情页仍称全部数值经过 CMM 验证 | 核对认证主体、认证范围与实际检验记录；详见 OT 与 G01 |
| 3 | 尺寸摘要与表内范围 | Paper Slitter 首屏/卡片 Dished 上限 200 mm，表内有 203 mm；其他页有“制造范围”“列举尺寸”边界不清 | 明确首屏范围对象，不用竞品尺寸直接覆盖原表；详见 SL 条目 |
| 4 | Nonwoven 详情承诺 | 角度与 GSM/速度的确定性处方、静电排他解释、一个班次消除问题、材料追溯承诺；Pneumatic 被列为机器品牌 | 分开确认技术条件、可履约服务及名称字段；详见 SL 条目 |
| 5 | 整机尺寸覆盖 | SSI 等机型的外径/刀宽不完全落入现有部分多轴页范围 | 由销售/生产确认是否属于要覆盖的机型；目前不扩大范围；详见 RC 条目 |
| 6 | 单轴具体零件映射 | 尺寸相近的 rotor/stator 零件仍可能有不同件号、刀面、座面和安装方式 | 对首批可核实件号逐行回签，不按相同长宽厚合并配置；详见 RC 条目 |
| 7 | 其他类别采购信息不足 | 16 款普通产品页目前没有标准尺寸表，含待删 Cold Saw；多数只给采购需提供的字段 | 对继续经营的 15 款选择真实配置和图纸，决定恢复/新增哪些规格；不从历史表自动恢复 |
| 8 | 图片性能与模板 | 上述 16 款主图和相应分类卡片没有响应候选；Paper Guillotine 仍向手机发送 9600 × 9600 图片；其余类别尚未套用已确认详情模板 | 资料回签后，连同主图尺寸、响应资源和 FAQ 双栏一起升级；见 G02/G03 |
| 9 | Item No. 是配置还是系列 | 部分已编号行仍为范围、多孔径/多宽度或配件类型 | 明确一号一配置规则；不在本轮拆号；见 G04 |
| 10 | Cold Saw 退出 | 产品、分类及相关入口目前仍存在 | 按计划单独做删除与入口/旧地址清理，不继续投入该产品内容升级 |

## 3. 分类逐项核查

本轮 7 个分类页的产品卡片集合和顺序均与 `ItemList` 一致。Cold Saw 首屏另有详情快捷链接，重复入口不是重复卡片。当前分类页没有复制产品 FAQ。卡片下方为尺寸摘要或 `Made to Drawing`，符合已确认的显示原则。

| 分类/入口 | 当前产品数 | 标题、图片及内容核查 | 与市场用法的关系和待处理事项 |
|---|---:|---|---|
| [Slitter](http://localhost:5173/categories/slitter-knives) | 13 | H1 `Slitter Knives & Circular Blades`；按应用、底刀/环、硬质合金分组；卡图与当前产品主图相同；尺寸问题随产品见 SL | 混合应用与材质入口可作为导购，但同一配置需复用 Item No.。Slotter 属纸箱开槽、Paper Straw 属管体切断，不能在正文解释成纵向分切；当前标题已基本作区分。旧的分类 OEM 区 `Drop-in fit`、Pneumatic 问题本轮未复现，保留“提交型号/图纸核对”的当前措辞。 |
| [Shredder](http://localhost:5173/categories/shredder-blades) | 7 | 四款多轴 + 三款单轴配套件，结构清晰；卡片和详情共用主图；screen 的 `Ø8–80 mm` 指孔径，缺少对象标签 | 现有分组符合零件/工位识别。screen 卡片建议回签为 `Hole Ø8–80 mm`；尺寸原值不变。将来纳入 Granulator 后需独立小组或清晰入口名，不能将两类设备描述为同一设备。 |
| [Granulator](http://localhost:5173/categories/granulator-blades) | 5 | H1 已扩大为 `Granulator, Pelletizer & Plastic Recycling Blades`，分为减容/喂料、过滤、造粒；五图分别对应五类零件；均 `Made to Drawing` | 正文已区分工序，导航短名 `Granulator Blades` 却不能涵盖过滤刮刀等全部内容。这是入口命名与成员范围问题。按既定讨论拆分；四款仍保留各自工位名称和独立详情。 |
| [Shear](http://localhost:5173/categories/shear-blades) | 5 | H1 `Industrial Shear & Guillotine Blades`；金属三款、印后两款；图与详情一致；均 `Made to Drawing` | 大类可以保留，用现有两组区分材料与刀位。两个金属剪切页的重叠已有业务约定，不单凭重叠建议合并。具体图片/规格回签见 OT。 |
| [Log Saw](http://localhost:5173/categories/log-saw-blades) | 2 | H1 `Tissue & Nonwoven Log Saw Blades`；纸巾卷和无纺布卷明确分组；均圆盘刀，`Made to Drawing` | Log 指卷材而非原木；当前 H1 有材料限定，避免与 Wood Chipper 混淆。保留两款是否有独立采购需求和真实配置，由 OT 项回签。 |
| [Wood Chipper](http://localhost:5173/categories/wood-chipper-blades) | 2 | H1 `Wood Chipper Knives & Anvils`；动刀和定砧分别入口；图与详情一致；均 `Made to Drawing` | 这一设备/动定零件分类合理。需核对详情技术图中的刀位身份和图号，不能仅因目录文件夹或外形相近判为错品。 |
| [Cold Saw](http://localhost:5173/categories/cold-saw-blades) | 1，计划删除 | 当前分类及 [Metal Cold Saw](http://localhost:5173/products/metal-cold-saw-blades) 仍可访问；单产品直达入口存在 | 按用户计划退出。删除时一并处理分类、下拉导航、相关产品、行业入口及旧 URL，不归入 Other 补数。 |
| [Custom / Special-Shaped](http://localhost:5173/custom) | 1 | [/custom](http://localhost:5173/custom) 是定制服务页，使用专门展示图、流程图与证书；另有 [/products/special-shaped-blades](http://localhost:5173/products/special-shaped-blades) 独立详情，已一并检查 | 定制是服务/制造方式，也可承接特殊刀型。将四款明确工位产品归入 Other & Custom 只是导航合并，不能使它们丢失具体产品名称，也不应让 [/custom](http://localhost:5173/custom) 承诺自动扩展到每款产品。详见 OT。 |

分类参考只证明市场存在这些组织方式，不能作为唯一正确架构或 Sureay 供货能力证明：KAMADUR 的 [Products 页](https://www.kamadur.com/products) 公开入口包含 Compounding、Converting、Graphic & Packaging、Recycling、Food、Metal、Miscellaneous；DIENES 的 [Products 页](https://www.dienes.de/en/products/) 将 Circular knives、Straight knives、Razor blades、Knife holders、Slitting systems 等作为产品入口，同时另设材料/方法导航。访问日期均为 2026-11-12，原文位置分别为页面行业链接列表和 Products 导航/产品标题。两者说明可以并行提供产品与行业入口，无须让 Sureay 的六组导航复制竞品完整目录。

## 4. 跨产品核查项

| 编号 | 状态/优先级 | 本地证据与影响范围 | 待确认及建议 |
|---|---|---|---|
| G01 | 内部依据待补 / 优先 | 16 个未采用新详情布局的普通产品页仍显示 `All values verified via CMM inspection · ISO 9001:2015`，技术表却多为“请提供哪些资料”，无对应实测值；[/custom](http://localhost:5173/custom) 证书范围详见 OT | 每条精度/全检/材质证书承诺需要真实记录。`NOT FOUND`：本轮未取得逐型号检测报告和刀片制造认证范围证明。先核对，再决定缩窄声明或补证。 |
| G02 | 可确认模板差距 / 后续升级 | 13 Slitter + 7 Shredder 的桌面主图为 480 × 480，并提供响应候选。其余 16 个普通详情页（含 Cold Saw）实测约 555 × 496，主图及相应分类卡片无 `srcset`；15 款继续经营产品待升级。[/custom](http://localhost:5173/custom) 是独立模板，其本轮主区域图片也没有响应候选 | 继续执行 WebP、真实固有宽高、按展示尺寸生成候选的标准。Paper Guillotine 图片文件实际为 9600 × 9600、约 291 KiB；375 px 手机仍请求原文件。已升级 Shredder 的 3200 px 原图在本轮手机实际选择 640w，不把保留大源图本身判为错误。 |
| G03 | 已确认规范尚未覆盖 / 后续升级 | 上述 16 个普通详情仍保留 H1 下类别行和长描述、旧版规格区、单栏技术 FAQ；`faqs.company` 为空。20 个 Slitter/Shredder 产品已显示 `Why Choose Sureay` | 按[升级模板](../qa/product-page-upgrade.md)逐类做：简洁首屏、480 方图与固定下移、Technical Specifications、有效标准表、Technical FAQs + Why Choose Sureay。企业 FAQ 只补真实服务信息，不为了填满两栏写未经确认承诺。 |
| G04 | 编号语义待决定 | 现有英文标准表首列已为 `Item No.`；但如 `SR001701` 含多孔径/多宽度，`SR002201` 含尺寸范围和孔型选项，其他配件行也可能代表系列 | 编号格式通过不等于一号一配置。需确认这些号码是否暂为系列入口；真正下单配置应对应明确图纸/配置号。跨页共享同一真实配置可继续复用。 |
| G05 | 数据对应待整理 | Shredder 的可见行号已使用 `SR002…`，页面 Product 结构化数据仍以 URL slug 填写 `sku` 和 `mpn`；其余旧模板也采用此做法 | 不把 URL slug 作为真实制造商件号。产品系列页与逐配置 Item No. 的表示方式需在下一轮统一；不能直接把某一行号当整页型号。 |
| G06 | 商业承诺待回签 | 44 个被检页面均有“两小时工程师回复”的共用询价文案；[/custom](http://localhost:5173/custom) 另含价格、MOQ、首件交期和库存声明 | `NOT FOUND`：覆盖时区、工作日条件和履约记录。由销售确认可以公开保证的口径；产品有 OEM 参考资料不等于这些服务承诺已获验证。 |

以下三组明细覆盖全部 36 条记录；SL 为 Slitter，RC 为 Shredder/Granulator，OT 为其他类别。编号用于回签追踪，不是产品 Item No.。



## 5. Slitter：13 款逐页明细

审查日期：2026-11-12。范围为当前工作区英文 Slitter 分类及 13 个详情页。依据当日 `catalog.json`、`rendered.json`、实际图片及下列外部资料。13/13 产品均检查了标题、主图、Technical Specifications 配图、正文与规格。没有修改页面、原尺寸、编号、译文或构建产物。

### 结论边界

本报告的“已确认问题”表示当前页面自身有具体不一致或术语错误。“内部凭据待确认”表示需要 Sureay 图纸、检验记录或供货记录，不能据此判定产品做不到。“NOT FOUND”只表示本轮在所列来源未找到该项，原表保留。图片只能确认可见外形，不能确认钢号、硬度、尺寸、照片归属、OEM 型号或已供货事实。

数值来源达到两个独立机构一致时，才可提升为高可信度。一个 OEM 手册只能证明指定机型。品牌自己的网页和同品牌 PDF 不算两个独立来源。以下多数整套尺寸仍为中可信或待核，未把竞争厂商参数转换成 Sureay 能力。

### 用户复核清单

| ID | 性质与位置 | 具体问题 | 用户需要确认的事项 |
| --- | --- | --- | --- |
| SL01 | 已确认术语错误；Nonwoven OEM 区 | `Pneumatic®` 被列在 Compatible Machine Brands。Pneumatic 在此是气动方式，未指明任何公司。分类页已排除它，但详情仍存在。 | 是否从品牌栏删除，并只保留在刀座接口说明？ |
| SL02 | 高优先内容凭据；Nonwoven FAQ/Engineering Advantages | 15°/20°分别对应 15–80/80–150 GSM、200/150 m/min，以及“普通纸膜刀 5°–10°”“本刀400 m/min”的具体处方没有试验或指定刀座依据；技术规格另写 bevel 25°–45°，未解释 rake 与 bevel 的定义和图示。 | 是否有这些精确工况的试验报告和刃型图？没有时，是否改成需按材料、刀座和试切核定的选型指导？保留原尺寸表。 |
| SL03 | 高优先内容表述；Nonwoven FAQ/Engineering Advantages | 将粘纤维单一归因为静电，并排除刃型；宣称 ESD 连续消除吸附及一个班次内消除污染。DIENES 同类资料同时讨论钝刀、调整及纤维撕裂，不能凭现有资料排除机械原因。 | ESD 涂层的材料、导电测试、适用厚度和现场案例是否存在？是否改成多因素排查，并取消未验证的效果时限？ |
| SL04 | 内部能力凭据；Nonwoven | 首屏统一“up to 800 m/min”，技术规格统一 ±0.002 mm、H7、硬度 60–64 HRC/89–92 HRA。当前表同时覆盖不同刀型和材料，缺少适用边界。 | 哪些 Item No.、材质和刀座有相应速度、厚度检验或配合检验记录？是否按配置限定？ |
| SL05 | 内部履约凭据；Nonwoven | 每批 CoC、钢厂证明、热处理批次、CMM 检验、medical batch traceability 是 Sureay 自己的供应承诺。 | 请确认可交付的文件样本、是否每批默认提供及例外。不能用竞品资料支持。 |
| SL06 | 已确认范围表达不完整；Paper | 首屏/卡片 `Dished OD 62–200 mm`，标准表 SR001206 却列 203×90×4 mm。不是建议改203，而是摘要未覆盖当前表。 | 确认203这一原值继续保留后，尺寸摘要采用含203的范围，还是明确为“主要系列＋Bielomatik定制件”？ |
| SL07 | 组合规格待核；Paper SR001205 | 200×80×4 mm 在 DIENES 皿刀系列可查，Tidland 129833 的200/80可查；9.25 mm来自替换刀厂外形尺寸，其网页没有明确标成 dish height。现行行把4 mm、9.25 mm与Tidland Class III组合，尚缺同一张截面图。 | 是否有该配置的刃厚4 mm及总皿高9.25 mm图纸？缺少时保留原行，但不要认定两来源合起来就证明同一Tidland配置。 |
| SL08 | 范围对象待明确；Film/Coil/Corrugated | Film首屏20–300，标准表OD60–150；Coil首屏80–680，具体刀具表150.1–500；Corrugated首屏15–340，具体薄刀表220–340。不同“制造范围/标准表/产品结构”的范围可以不同，当前标签未充分区别。 | 20/300、80/680、15/340各端点有无本品类图纸？特别是15 mm是否真正属于瓦楞干端薄刀，而非通用圆刀制造范围？不直接删除或缩窄。 |
| SL09 | 内部能力凭据；Coil | `OD up to 420 mm, ±0.001 mm thickness and 0.002 mm face parallelism`是Sureay精度承诺。TKM/KAMADUR能证明市场存在微米精度，不能证明Sureay。 | 请提供对应外径、材质、测量方法、温度及检验记录，确认是否作为可保证的选择项。 |
| SL10 | OEM 适配待核；Corrugated/Carbide共享表 | BHS/Fosber等12行只写品牌，没有具体机型、版本或件号。原尺寸整体属于合理薄圆刀形态，但不能仅由品牌推定适配。 | 逐行可否补内部机型/件号/图纸索引供审核？本轮不建议改尺寸或强加公开OEM模块。 |
| SL11 | 图片身份待确认；Carbide/Paper/Slotter | Carbide技术图与Rewinder技术图是相同两只带孔底刀外观，不能凭照片证明镶硬质合金；Paper主图主要可见环形件及承载体，未明确展示其alt所说上下刀配对；Slotter技术图仅弧段，未明确呈现female matched assembly。 | 请提供照片对应的实际产品/结构标识。可继续作为系列图，但是否需补正确结构说明或更有代表性的技术图？本轮没有判为错图。 |
| SL12 | 编号语义待决策；Multi-Groove/Coil tooling/Slotter female | SR001701–704分别含多个孔径/宽度选项，FAQ把Item No.定义成size series；Coil341–343是组件种类，Slotter610–612是范围/结构。与“一号一个配置”验收口径不完全一致。 | Item No.是否允许系列号？若必须唯一配置，需先确定实际可供组合再拆号，不能生成所有数学组合。 |
| SL13 | 内部供货范围凭据；Foil/Paper Straw/Carbide | Foil0.1–100 mm隔套、0.01–0.09/0.10–0.90 mm薄垫片；Paper Straw氧化锆及4种涂层；Carbide列出的YG牌号，是具体供货范围。 | 哪些是已供、可常规做、或需外协评估？可否给一份内部能力记录？竞品材料选项不等同于Sureay选项。 |
| SL14 | 内链相关性；Nonwoven | Related 当前为Film、Battery、Carbide；对本页上刀/底环/压切采购，下刀、多槽以及Nonwoven Log Saw的工位区分链接更直接。现有链接有效，不是死链。 | 是否优先替换为最相关的配套下刀/多槽入口，并在FAQ区分Nonwoven Log Saw？ |
| SL15 | 商业时效凭据；13页共同 | Inline RFQ均承诺24小时报价，联系区承诺2小时响应。二者不必矛盾，但都需要真实服务边界。 | 确认分别指首次回复/正式报价，工作日与复杂定制例外是否需要明确。 |

### 逐页记录

#### 1. Film & Tape Slitter Knives

路由 [/products/rotary-slitter-knives](http://localhost:5173/products/rotary-slitter-knives)。H1/Title 为 `Film & Tape Slitter Knives for Flexible Packaging`，采购对象与内容一致。

- 图片已看：主图 `slitter-detail/rotary-slitter-knives.webp` 为数只薄圆环及有台阶/环座结构的环形件。技术图 `rotary-slitter-knives-detail.webp` 为圆刀磨削斜面近照。与圆形分切刀主题相容，不能从图判断D2/M2、切膜与切胶带的实际履历。
- 正文已核：按剪切/压切、胶粘物、刀座及皿高选型合理。圆刀说明不承诺代表全部薄膜分切方法，因此未提供独立razor产品不构成本页错误。
- 规格对照：SR001156 75×45×1.2、SR001151 90×60×1.0、SR001152 105×70×1.2分别落在DIENES皿刀公开组合内，来源 D1 表对应OD行，中可信，仅证明市场尺寸。SR001157 130×80×1.2可在DIENES 2022目录PDF第5页double bevel表定位，中可信。SR001182 80×55×5可对应TOYO下刀产品016，中可信。SR001452 80×60×10可对应DIENES grooved knife系列，中可信。余下9行精确配置在本轮选用权威来源中 `NOT FOUND`，沿用原值。
- 没有发现必须改动原表的数值证据。20–300 mm含义和涂层供货范围待内部说明，见SL08/SL13。[DIENES皿刀D1](https://www.dienes.de/wp-content/uploads/2021/04/D1_Dished_knives_e.pdf)、[DIENES 2022目录](https://www.dienes.de/wp-content/uploads/2022/01/Dienes-Standard-Knife-Programme-_Status-01-2022_e-1.pdf)、[TOYO标准分切刀](https://www.toyoknife.co.jp/wordpress/wp-content/themes/toyo-knife/pdf/catalog/slitter_knives.pdf)。均访问于2026-11-12。

#### 2. Paper Slitter Knives

路由 [/products/rotary-slitter-knives-paper](http://localhost:5173/products/rotary-slitter-knives-paper)。H1/Title 为 `Paper Slitter Knives for Tissue, Kraft & Coated Paper`。纸种采购定位清楚。

- 图片已看：主图 `rotary-slitter-knives-paper.webp` 为两只环形刀/承载体，右侧明显有较厚底座及分缝。技术图 `rotary-slitter-knives-paper-detail.webp` 为带内缘缺口的皿状薄圆刀。不能确认主图是已配对上/下刀，alt的配对描述需内部身份确认（SL11）。
- 正文已核：纸尘需同时检查刀口、重叠和下刀配合，方向合理。FAQ区分刃厚与皿高是必要采购信息，不能因此自动证明当前9.25 mm组合。
- 上刀SR001201–205的90×60×1.2、130×80×1.5、150×80×2.5、180×90×3.5、200×80×4可在DIENES D1/2022同系列找到，市场尺寸中可信。Tidland Unibody手册第47页明确Class II 128401为150/80，Class III129833为200/80；未给该行4 mm和9.25 mm的同一截面组合。Carolina129833网页规格写200/80/9.25，0.364英寸=9.2456 mm，不能直接把未定义的厚度字段改叫皿高。SR001206 Bielomatik701.115完整203×90×4映射 `NOT FOUND`，原值保留。
- 下刀SR001211/212的105/80、130/90与DIENES bottom knife系列相关，15/20为其标准宽度，但法兰孔距仍未给。SR001213的Tidland131393可由OEM Class II Edge-Trim手册第7页确认件号；ABS列7.480×5.433×0.590英寸，换算189.992×137.9982×14.986 mm，与190×138×15名义值相符，中可信。SR001214在Carolina133503规格中精确130×100×30，单一替换刀厂，中可信。SR001215的250×188×15在DIENES目录存在，但其与Tidland131395的完整映射 `NOT FOUND`。
- 明确待修范围说明SL06，组合证据SL07。保留全部原表。[Tidland手册](https://www.maxcessintl.com/wp-content/uploads/2021/02/Tidland_PSUnibodyKH_Manual.pdf)、[Carolina129833](https://www.carolinaknife.com/product/tid129833-d2/)、[DIENES bottom knives](https://www.dienes.de/en/products/bottom-knives/bottom-knives/)、[Tidland131393所属机型](https://www.maxcessintl.com/wp-content/uploads/2021/08/Tidland_EdgeTrimManHiSpdCLII_Manual_0.pdf)、[ABS替换刀目录](https://americanbladesource.com/bottom-slitters/)、[Carolina133503](https://www.carolinaknife.com/product/tid133503-d2/)。访问于2026-11-12。

#### 3. Slitter Knives for Copper & Aluminum Foil

路由 [/products/metal-foil-strip-slitter-knives](http://localhost:5173/products/metal-foil-strip-slitter-knives)。H1/Title `Slitter Knives for Copper & Aluminum Foil`，与未涂布铜铝箔采购任务一致，与电极页有清楚对象分工。

- 图片已看：主图 `metal-foil-strip-slitter-knives-copper-aluminum.webp` 是普通圆孔圆盘刀；技术图 `metal-foil-strip-slitter-knives-keyway.webp` 为带键槽圆刀。与平圆刀及arbor/keying正文相符。镜面照片不能验证WC-Co或尺寸。
- 正文已核：以合金、状态、厚度、间隙及刀片/隔套整组配合为输入，合理。材料表提供钢/PM/硬质合金，标准尺寸表仅列硬质合金，属于结构化选择，未构成矛盾。
- 规格对照：9行SR001253–261均为OD130，ID60/66.68，T1–5的具体组合。搜到Shen Gong厂家同9行表，但本轮未独立核清其网站与长期企业资质，故只列线索、不作为最终权威定论或OEM适配证据。选用的DIENES/KANEFUSA/KYOCERA资料没有把这9行对应到整机型号，精确OEM映射均 `NOT FOUND`，原值保留。TKM slitting/cut-to-length目录第10–11印刷页可核实其自身隔套0.1–100 mm系列，不能证明Sureay供货范围。细分垫片两组九档内部依据待核（SL13）。
- 本页没有发现明确错品或需删除尺寸项。[DIENES PSGs DF50用途与刀座变体](https://www.dienes.de/en/products/knife-holder/knife-holder-psgs-df-50/)、[TKM金属加工目录](https://3384728.fs1.hubspotusercontent-na1.net/hubfs/3384728/%5Bv20%5D/Brosch%C3%BCren%2BFlyer/Products-and-Cutting-Solutions-for-Slitting-and-Cut-to-Length-Systems_EN_neu.pdf)、[仅作线索的同尺寸表](https://sgcarbide.com/products/high-quality-carbide-rotary-slitting-knives/)。访问于2026-11-12。

#### 4. Steel Coil Slitting Knives

路由 [/products/metal-coil-slitting-knives](http://localhost:5173/products/metal-coil-slitting-knives)。H1/Title `Steel Coil Slitting Knives & Rotary Shear Tooling`，含刀片及配套工具，能覆盖实际内容。

- 图片已看：主图 `metal-coil-slitting-knives.webp` 为多只厚环形盘刀堆叠，可见内孔键槽。技术图 `metal-coil-slitting-knives-detail.webp` 为金属芯、黄色外圈的stripper ring，与Tooling正文一致，不应误判为“不是刀所以错图”。黄色外圈具体材料不能由照片确认。
- 正文已核：钢卷等级、韧性、磨耗、隔套及脱料环、分隔片的分工合理。Light gauge/Heavy plate为应用标签，未提供料厚、强度与OEM型号，不等于按直径就能保证可切某厚板。
- 规格对照：钢刀9行SR001301–309、硬质合金5行331–335的精确整机/OEM图纸本轮 `NOT FOUND`。KANEFUSA公开钢卷刀可至OD400/ID300且提供微米级精度，表中若干尺寸落在这个已知市场量级内；它不能否定Sureay500/680范围或证明对应能力。TKM目录与KAMADUR金属刀产品单均有精密盘刀和配套件，但不能替Sureay验证±0.001 mm/0.002 mm（SL09）。SR001305 H7只限定本行，现有文字已正确避免扩大到全表。
- 图与工位一致。原尺寸保留。首屏80–680和标准表范围定义见SL08，组件种类编号见SL12。[KANEFUSA钢卷Slitter Knife的Size段](https://www.kanefusa.net/en/products/000329.html)、[KAMADUR金属刀产品单第2页](https://www.kamadur.com/docs/productsheet-000043-1902435-858.pdf)、[TKM金属加工目录印刷页6–13](https://3384728.fs1.hubspotusercontent-na1.net/hubfs/3384728/%5Bv20%5D/Brosch%C3%BCren%2BFlyer/Products-and-Cutting-Solutions-for-Slitting-and-Cut-to-Length-Systems_EN_neu.pdf)。访问于2026-11-12。

#### 5. Lithium Battery Electrode Slitting Knives

路由 [/products/lithium-battery-slitting-knives](http://localhost:5173/products/lithium-battery-slitting-knives)。H1/Title `Lithium Battery Electrode Slitting Knives`。正文聚焦涂布正负极片，已与铜铝原箔分工。

- 图片已看：主图 `lithium-battery-slitting-knives.webp` 是多只抛光薄圆环；技术图 `lithium-battery-slitting-knives-detail.webp` 是抛光刃面特写。没有看到明确与标题冲突的机械形态，也不能从图确认材质、上下刀配对或已用于电极。
- 正文已核：采购需上下刀图、集流体厚度、单/双面涂布、掉粉/毛刺标准，方向合理。没有残留线上旧版PVDF separator或ISO Class7等说法，不能拿旧线上页面作为当前工作区问题。
- 规格对照：6组SR001351–356原表照录。TOYO标准表有98×66×0.7上刀及80×55×5下刀，因此SR001352的两个单件尺寸属于存在的分切尺寸，中可信；该来源不是电极设备，不能证明二者在某台电池机成对使用。其余5组完整上下刀OEM配套在本轮权威资料中 `NOT FOUND`。DIENES Battery Show资料可证明其电池箔使用精密/硬质合金刀和中间环，但没有本页这些尺寸与YG牌号映射。
- 未发现当前数值明确错误，保留原表。待Sureay为每组记录工位/图号；YG6X、YG6H、YG8、YG10X需要供料牌号记录。[TOYO标准刀表C组003/016](https://www.toyoknife.co.jp/wordpress/wp-content/themes/toyo-knife/pdf/catalog/slitter_knives.pdf)、[DIENES电池刀具资料产品段](https://www.dienes.de/en/dienes-blog/dienes-on-the-road/dienes-at-the-battery-show-europe-2024-in-stuttgart/)。访问于2026-11-12。

#### 6. Corrugated Board Slitter Blades

路由 [/products/corrugated-slitter-scorer-blades](http://localhost:5173/products/corrugated-slitter-scorer-blades)。H1 `Corrugated Board Slitter Blades for Dry-End Lines`；Title `Corrugated Board Slitter Blades`。正文已正确区分slitting、scoring、下游slotting。

- 图片已看：主图 `corrugated-slitter-scorer-blades.webp` 展示小中心孔加两固定孔的薄盘及大孔带缺口的盘。技术图 `corrugated-slitter-scorer-blades-detail.webp` 展示大中心孔和6个固定孔。外形符合薄圆刀；没有标尺，不能据孔形直接指定BHS/Fosber型号。
- 正文已核：询问PCD、孔数、键位及磨刀工位是正确配套信息。描述没有把圆刀说成压线轮。
- 规格对照：SR001401–413共12行（407未使用并非漏数据）。BHS/Fosber/ISOWA公开整机页能够确认slitter-scorer工位，未公开这12个完整刀片图纸，故逐行完整OEM适配 `NOT FOUND`。KYOCERA官方目录PDF第8页给出260×140×1.5和280×160×1.0的薄刀示例及PCD/孔数，证明该尺寸量级和安装信息合理。Sureay411为260×140×1.1、410为280×160×1.1，两者厚度不同，且KYOCERA未在该表指定ISOWA/Mitsubishi。不能因此把Sureay的1.1改成1.5或1.0。
- 主要待确认是SL08（15 mm下限所属产品）、SL10（机型映射）。原表保留。[BHS Slitter Scorer](https://www.bhs-world.com/en/corrugators/individual-machines/slitter-scorer)、[Fosber Twin400](https://www.fosber.com/products/twin-slitter-scorer/)、[ISOWA HSS6](https://www.isowa.com/products/corrugator/14.html)、[KYOCERA官方精密刀目录第8页](https://www.kyocera.co.jp/prdct/tool/wp-content/uploads/2020/12/catalog_e_knife.pdf)。访问于2026-11-12。

#### 7. Nonwoven Slitter Knives

路由 [/products/nonwoven-slitter-knives](http://localhost:5173/products/nonwoven-slitter-knives)。实际H1 `Nonwoven Slitter Knives – OEM & Replacement Top Dished Blades, Bottom Anvil Rings & Crush Cutters`；Title `Nonwoven Slitter Knives | OEM & Replacement | Sureay`。范围涵盖三种结构，但H1明显长于其余Slitter页，可在用户简洁标准下再讨论精简。旧`fullName`仍是M2材料型长名，当前H1受布局覆盖，不能把旧字段当作实际标题。

- 图片已看：主图 `rotary-slitter-knives/nonwoven-slitter-knives-00-white.webp` 为皿刀、环座和分体/锁紧环组合。实际技术图 `nonwoven-slitter-knives-02.webp` 也展示这些圆刀与分体环。与上刀/下环主题相容，图中没有可清楚辨认的尖脊压切刀，不能从组合照片证明Crush Cutter各型号。
- 正文已核：当前实际渲染仍有Nonwoven-Optimised Rake Angle、ESD Conductive Coating、Medical Batch Traceability段落及详细FAQ。SL01–SL05需要优先审核。`bevel25°–45°`与`rake15°–20°`未必数学矛盾，但必须定义，否则买家无法照图下单。不能把DIENES的多因素选型简化为每个GSM唯一刀角。
- 规格对照：SR001101–107七行上刀、108–112五行底环/压切刀的完整Holder Fit及公差配置，本轮没有OEM图纸逐条支持。SR001105的130 mm外径与DIENES PSGm25DF Technical data一致，但这不证明ID60/W1.5或“所有Dienes PSG”适配。当前DIENES该刀座为最高1000 m/min，不可直接拿来支撑Sureay所有刀型800 m/min。其余Type80/90/105/110是未标厂家/完整型号的类型标签，`Dienes / Cotta100`以及`A.Celli`也不是唯一型号。原尺寸保留，匹配可信度低/待内部图纸。
- 内链检查：现有Related为Film、Battery、Carbide。对本页三刀型采购意图，更有用的下刀页、多槽页及已区分的Nonwoven Log Saw没有被选入；这是相关性改善机会而非死链，见SL14。已确认主图及技术图都有320/640/800响应候选，桌面均480×480。[DIENES无纺材料页Know-How/Dust accumulation](https://www.dienes.de/en/explore/materials/nonwoven-and-textile/)、[DIENES PSGm25DF Technical data](https://www.dienes.de/en/products/knife-holder/knife-holder-psgm-25-df/)、[TKM排尘及刀具调整资料](https://www.tkmgroup.com/en/troubleshooting/cutting-quality-dust-circular-knives)。访问于2026-11-12。

#### 8. Bottom Grooved Anvil Knives

路由 [/products/bottom-grooved-anvil-knives](http://localhost:5173/products/bottom-grooved-anvil-knives)。H1/Title `Bottom Grooved Anvil Knives for Shear Slitting`。名称、正文与剪切下刀工作肩采购意图相容。

- 图片已看：主图 `bottom-grooved-anvil-knives.webp` 为带固定孔厚环和两只较薄环；技术图 `bottom-grooved-anvil-knives-detail.webp` 为两个有凹入工作面/台肩的底环。形态吻合，但无法从图识别NN/NG/NS或尺寸。
- 正文已核：已区分razor支持槽与剪切工作肩，且要求槽宽/深、轴配合及工作侧，能减少误选。
- 规格对照：SR001451 46×25×5、452 80×60×10、453 105×90×15都可在DIENES Grooved knives的Standard dimensions对应行核实，中可信，仅为同尺寸系列。SR001454/455的105×90×8/17及Kampf映射本轮 `NOT FOUND`，保留。NN/NG/NS术语在DIENES同页有明确解释，命名合理。
- 未发现需改原表的新问题。相邻Film/Multi-Groove/Rewinder内链方向合理。[DIENES Grooved knives的Type及Standard dimensions](https://www.dienes.de/en/products/bottom-knives/grooved-knives/)。访问于2026-11-12。

#### 9. Tungsten Carbide Slitter Knives

路由 [/products/tungsten-carbide-slitter-knives](http://localhost:5173/products/tungsten-carbide-slitter-knives)。H1 `Tungsten Carbide Slitter Knives – Solid & Tipped`；Title `Tungsten Carbide Slitter Knives`。这是材料/结构选型入口，与应用页重叠尺寸属于有意复用，不自动认定关键词蚕食。

- 图片已看：主图 `tungsten-carbide-slitter-knives.webp` 为三只小孔圆盘刀。技术图 `tungsten-carbide-slitter-knives-detail.webp` 为两只带孔、凹面底刀，外观与Rewinder技术图相同。无法凭金属颜色断定solid carbide或tipped，需内部照片身份（SL11）。
- 正文已核：区分整体硬质合金与钢体镶环，并说明磨损/崩刃、晶粒和粘结相，技术方向与Hyperion/CERATIZIT材料资料一致。牌号相似不保证等同的FAQ正确。
- 规格对照：12行corrugated与5行coil共17行与对应应用页使用相同Item No.和相同配置，无独立冲突。其证据限制继承第4/6页，不能重复计为两个来源。图纸/OEM映射仍待核，不改尺寸。
- 可补清楚“Solid & Tipped中tipped的图/配置对应关系”，而不是再堆一份重复规格。相关应用内链合理。[Hyperion细晶与中晶硬质合金资料](https://www.hyperionmt.com/en/Resources/materials/cemented-carbide/fine-and-medium-grades/)、[CB-CERATIZIT材料原理](https://www.cbceratizit.com/en/a1-11322/Carbide.html)。访问于2026-11-12。

#### 10. Slitter Rewinder Bottom Knives

路由 [/products/slitter-rewinder-bottom-knives](http://localhost:5173/products/slitter-rewinder-bottom-knives)。H1 `Slitter Rewinder Bottom Knives – Cup, Double Edge & Tipped`；Title `Slitter Rewinder Bottom Knives`。名称与正文结构相符。

- 图片已看：主图 `slitter-rewinder-bottom-knives.webp` 为多只带不同中心孔/固定孔的碟/杯形圆刀；技术图 `slitter-rewinder-bottom-knives-detail.webp` 为两只带螺孔及凹面法兰刀。与替换下刀主题吻合，无凭据从图判定某一OEM或硬质合金镶环。
- 正文已核：法兰孔型、杯形/双刃、键槽、旧件及修磨余量的询价逻辑合理。
- 规格对照：SR001211–215为纸刀页相同五行，证据见第2页。SR001561 90.81×60×12.70/Carbide-tipped/Dusenbery783533中，OEM Parkinson公开零件目录仅核实783533为female knife 1/2英寸宽，换算12.7 mm；OD/ID及carbide-tipped构造在该OEM来源 `NOT FOUND`，不能由宽度正确推定其余字段。SR001571–573三行键槽刀的全部尺寸及10 mm键槽OEM映射 `NOT FOUND`，原值保留。
- 首屏Flange105–300与键槽70/80、镶环90.81并非直接冲突，因为明确Flange series，但可能不代表全页选型范围。可保留并考虑显示其他结构范围。原尺寸不动。[Parkinson/Dusenbery原厂零件清单783533](https://parkinsontechnologies.com/parts/dusenbery/dusenbery)、[DIENES Bottom knives](https://www.dienes.de/en/products/bottom-knives/bottom-knives/)。访问于2026-11-12。

#### 11. Corrugated Slotter Knives

路由 [/products/corrugated-slotter-knives](http://localhost:5173/products/corrugated-slotter-knives)。H1 `Corrugated Slotter Knives – Male & Female Blades`；Title `Corrugated Slotter Knives for Box Making`。属于纸箱后道开槽，与Slitter上位分类的“corrugated converting”范围相容；当前文字没有把slotter错误称为corrugator纵切。

- 图片已看：主图 `box-slotting-knives-white.webp` 为多个弧形段及L形/直段，技术图 `box-slotting-knives-detail-white.webp` 为带圆孔及弧长槽的四个弧形段。可以确认是可安装的弧段结构，不能仅从图给每一段分配male/female；并未明确显示文案中的split female matched set，列SL11待照片身份确认。
- 正文已核：上下配合、隔套、弧角、工位说明合理。KAMADUR公开corrugated页也把slotter、beam slot、stitch lap等归入corrugated converting，支持这种相邻入口，不能据此强制新分类。
- 规格对照：SR001601–609九个male arc及其角度的OEM图纸 `NOT FOUND`；原表有Outer R/Inner r而不是OD，不能用直径表直接比较。SR001610/611 female范围OD90–450，TOYO lower slotter公开示例OD120–450、ID70–340、厚6–13 mm，仅支持范围中的重叠部分。它不否定Sureay90 mm端点，也不证明所有组合。SR001612是按图matched set。5–15 mm、D2/M2及硬质合金硬度仍需Sureay材料和检验记录。
- 没有足够证据改任何原值。编号系列语义见SL12。[KAMADUR Corrugated blades产品段](https://www.kamadur.com/produkte/Corrugated-blades/CONV0011/)、[TOYO lower slotter尺寸例](https://www.toyoknife.co.jp/product/paper/lower_blade)。访问于2026-11-12。

#### 12. Paper Straw Cutting Blades

路由 [/products/paper-straw-slitting-blades](http://localhost:5173/products/paper-straw-slitting-blades)。H1/Title `Paper Straw Cutting Blades`，正文为缠绕后切断/修边，词义正确。保留旧slug不等于必须继续用slitting作标题。

- 图片已看：主图 `paper-straw-slitting-blades.webp` 为小孔单圆片；技术图 `paper-straw-slitting-blades-detail.webp` 为两只小孔薄圆片。外形与圆形切断刀相容，没有实际机上图，不能从照片确认纸吸管工位及0.20/0.30 mm厚度。
- 正文已核：胶粘物、纸层、壁厚、支撑与切口样品均是合理询价输入，未混入普通纸幅分切的上下刀概念。
- 规格对照：SR001651–654四行100×15×0.20/0.30、100×16×0.30、100×45×0.30的Jota/KETE整机图纸本轮 `NOT FOUND`。Jota JT50D页面和Miyakoshi STO官方页能确认纸吸管成形/切断工艺，但整机产物直径不等于刀片直径。不能拿straw6–10 mm等数值来改刀表。氧化锆、DLC/TiN/TiAlN/CrN均需供货记录（SL13）。
- 没有发现必须改尺寸的新证据。可继续以转换加工相邻品入口承接，待整体导航讨论再决定分组。[Jota JT50D整机页](https://www.jotamachinery.com/paper-straw-making-machine/)、[Miyakoshi STO官方页](https://miyakoshi.co.jp/english/product/sto/)。访问于2026-11-12。

#### 13. Multi-Groove Bottom Knives

路由 [/products/groove-bottom-knives](http://localhost:5173/products/groove-bottom-knives)。H1/Title `Multi-Groove Bottom Knives & Cutter Rings`。多槽/槽距/换幅的采购任务与另外两款下刀清楚区分。

- 图片已看：主图 `groove-bottom-knives.webp` 为外圆多条平行槽的厚环；技术图 `groove-bottom-knives-detail.webp` 为带台阶孔、多槽和较宽端面的厚环，形态与主题明确相符，无法从图确认槽距公差及对应宽度。
- 正文已核：需槽数、槽距、首槽基准、总宽、分体结构及工作肩，合理。可通过结构差异与下刀页相互引流，未发现必然需要合并的证据。
- 规格对照：SR001703的150/120及SR001704的180/150，在DIENES multiple-grooved Standard dimensions表可查，50/100 mm是其标准总宽，中可信。SR001703还列的ID130、SR001701的150配60/80/90及39/49/50、SR001702的130配100/110，在该资料无对应全组合，精确OEM映射 `NOT FOUND`，不删原值。
- 主要问题为SL12，当前1个Item No.代表多种孔径/宽度，需先统一编号语义。原表明确“Options”避免把范围误当唯一件，但与配置验收口径仍需决策。[DIENES Multiple grooved knife blocks的Standard dimensions与Use段](https://www.dienes.de/en/products/bottom-knives/multiple-grooved-knife-blocks/)。访问于2026-11-12。

### 本轮没有复现的旧问题

- 分类页已按应用、底刀/环、硬质合金设置入口，全部13款可进入；卡片名称下当前为尺寸摘要，未重新提出在此增加描述段。
- 分类页原来的 `Drop-in fit, no retooling` 已改成按机型/图纸核对，Pneumatic也已从分类品牌列表移除。只有Nonwoven详情仍有SL01。
- 主图与技术图合计26张均为WebP文件。所有候选文件是否存在、是否被浏览器实际正确选择，需以整站图片验收记录为准；Nonwoven主图和技术图已有320/640/800响应候选，桌面480×480，未发现该两图缺srcset。
- 纸刀/rewinder及carbide/应用页的共享Item No.有意表示相同目录配置。没有因为跨页重复就判定编号冲突或建议删表。
- 没有把原值查不到当成虚假。没有建议用OEM Machine References替换Common Standard Dimensions，也没有改其他语言。

### 实施前应取得的最小资料

优先处理Nonwoven中精确工况/ESD/文件承诺，再确认纸刀200与203摘要及SR001205截面。其余产品可逐系列补一份内部索引：Item No.、零件图号、材质/热处理、机型或OEM件号、照片对应件、最近检验或供货记录。公开来源只承担市场术语与参考尺寸对照，原表是否修订由用户审阅后决定。


## 6. Shredder / Granulator：12 款逐页明细

巡检日期：2026-11-12。检查当前本地目录、英文页面完整渲染快照、实际主图与 Technical Specifications 配图，并回查既有研究和整机厂资料。覆盖 **7/7 Shredder、5/5 Granulator，共 12/12**。本次只记录，未修改页面、规格、分类、图片或译文。

编号检查：7款Shredder现有42行尺寸配置均有Item No.，42个编号唯一，全部符合`SR002`+三位流水号；完整渲染的7个标准尺寸表均以Item No.起列。本组未发现编号格式或重复问题。5款Granulator当前没有Common Standard Dimensions表，不能据此声称其规格系列已验收。

### 判定口径

- **可确认出入**：同一页面的文字、图片、表格或图纸之间有直接矛盾。
- **缺少凭据**：未找到 Sureay 供货图、检验或订单记录；不等于该能力不存在，原值应保留至 Yu 审核。
- **覆盖差异**：某一整机型号的参数不在当前目录范围内；不等于目录错误，也不等于应自动扩大供货范围。
- 整机厂数值均按具体型号记录。单一 OEM 来源为“中”；相同集团的多语言页、同一手册不同机型不算两个独立来源。以下没有把竞品能力当成 Sureay 能力。
- 图片只能确认外形、孔槽、刀钩等可见特征；不能凭外观认定材料、硬度、实际尺寸、机型或安装工位。
- 依据包括 `catalog.json`、`rendered.json` 的当前快照，以及既有 `external-research-shredder-blades-2026-11-11.md`、`external-research-granulator-blades-2026-11-11.md`、单轴刀任务单。历史报告中“待回签”数据没有被视作已验证事实。

### 分类层面

| 当前分类 | 当前情况 | 判断 |
| --- | --- | --- |
| [/categories/shredder-blades](http://localhost:5173/categories/shredder-blades) | H1 为 Shredder Blades & Wear Parts；四个多轴应用入口，三个单轴零件入口；7 张卡片 | 架构能区分通用、金属、轮胎、电池及动刀、定刀、筛网。没有发现需要立即合并四个多轴详情页的证据。四页标题已分配不同采购意图；关键词竞争效果仍需上线后查询数据验证。 |
| [/categories/granulator-blades](http://localhost:5173/categories/granulator-blades) | H1 已扩展为 Granulator, Pelletizer & Plastic Recycling Blades；5 款按破碎/挤出前喂料、过滤、切粒分组 | 五款自身名称基本准确，但其中四款不是机械 granulator 的刀具。页面当前有分工说明，因此不能简单写成“五款都错分”；主要是旧分类名、导航名与合集范围不一致。拆分类已获用户方向认可，尚未落地，属于计划事项。 |

Plastic Granulator Knives 放入扩大后的 Shredder 导航入口可行，但产品身份仍应保留 granulator rotor/bed knives，不应改称 single-shaft shredder stator knife。其他四款可放 Other & Custom Blades 的集合入口，但保留各自工位名称及详情页；“其他”是浏览集合，不是把过滤、压实、拉条和模面切粒定义成同一种刀。Cumberland、NGR、POWERFIL、MAAG、Nordson 的各自零件/设备资料支持这些工位的区分，见来源 R08–R13。该建议没有自动执行。

### 逐产品结论

#### 1. Twin-Shaft Shredder Blades

路径：[/products/twin-shaft-blades-recycling](http://localhost:5173/products/twin-shaft-blades-recycling)。当前 Title/H1：**Twin-Shaft Shredder Blades for General Recycling**（Title 另加 Sureay）。

- **标题**：与通用双轴、混合回收定位相符；不用改成金属、轮胎或电池词。
- **主图/技术图**：主图 `twin-shaft-shredder-blades-recycling-cover.webp` 是四钩、六角孔刀盘；技术图 `twin-shaft-shredder-blade-01.webp` 是包装内另一组同类四钩刀盘。图片类型正确，但当前技术字段仅写 3/8/12 钩；标准表 SR002101 又有 5 钩。可确认“图片—概要—表格”没有覆盖同一组钩数。见 RC01。
- **正文**：FAQ 要求一起核对轴孔、厚度、刀钩、隔套，方向合理。材质 D2/SKD11/42CrMo、HRC 55–62、4–5 次回火、Wire-EDM 为 Sureay 工艺声明；本次未找到逐配置内部证明，不能用 SSI 原厂材料替换。
- **规格**：8 行 SR002101–108，OD150–450 mm、表内厚15–40 mm；技术总范围厚10–150 mm。SSI **M85E/SD/H** 原厂名义刀厚50 mm（2 in）、刀径460 mm；**M180-ED/HD** 为76 mm（3 in）、刀径864 mm。原厂厚度在技术总范围内，但不在现有标准行中，两种刀径也不在可见150–450 mm范围内。属于市场覆盖差异，并非现有8行错误。50/76是原厂名义公制值；2/3 in精确换算50.8/76.2 mm，不能混为加工尺寸。R01、R02，单一OEM，中。

#### 2. Scrap Metal Shredder Blades

路径：[/products/multi-shaft-blades-metal](http://localhost:5173/products/multi-shaft-blades-metal)。Title/H1：**Scrap Metal Shredder Blades for Multi-Shaft Machines**。

- **标题**：废金属、电子废料的意图合理，multi-shaft 没有误限定为双轴。
- **主图/技术图**：主图 `shredder-blades-05.webp` 是八钩、六角孔刀盘；技术图 `shredder-blades-for-metal.webp` 是三钩、六角孔重型刀盘组。技术概要写1/2/3钩、Heavy Splined/Multi-Keyway，未包括主图八钩与两张图的六角孔；尺寸表却已有Hex。属于可确认出入，不能仅凭图认定这张刀“不用于金属”。见 RC02。
- **正文**：要求标清轴位、废料、最厚截面合理。ELV/重废料、H13/42CrMo、HRC50–54和适配品牌仍应按实际供货回签；SSI Q85证据支持混合材料细化场景，不证明每类重废均适合该机。
- **规格**：3行SR002201–203，OD300–800+ mm、厚40–150 mm。SSI **Q85ED/HD** 原厂名义厚38 mm（1.5 in）、刀径460 mm；刀径在范围内，38 mm低于当前40 mm下限，也不在460 mm对应表行60–80 mm中。是值得确认的缺项，不是将下限直接改38 mm的依据。1.5 in=38.1 mm，保留原厂名义38。R03，中。

#### 3. Tire Shredder Blades

路径：[/products/tire-shredder-blades](http://localhost:5173/products/tire-shredder-blades)。Title/H1：**Tire Shredder Blades for Primary Rotary Shears**。

- **标题**：明确primary rotary shears，与后道rasper分开，合理。
- **主图/技术图**：`3-claw-shredder-blades.webp` 与 `3-claw-shredder-blades-01.webp` 均为三钩六角孔刀盘，和产品类型及3钩描述一致；无法从照片确认Barclay、CM或其他机型。
- **正文**：FAQ明确厚度只是影响成品胶块尺寸的一项因素；尺寸表头仍写 **Thickness (Chip Size)**，容易使买家读成厚度等于成品尺寸。此处与FAQ口径不一致，见RC03。
- **规格**：SR002301–304保留现值。ELDAN **TSCC1200 FD180 50×50** 配置的原厂Knife width为50 mm/2.0 in；**100×100** 配置为2×50 mm/2×2.0 in。它支持50 mm级刀宽和成组关系，不能证明现有Ø450/Ø500×50.8 mm行的Barclay/CM适配，也不能把2×50解释成单片100 mm。原厂50与公制换算50.8有名义舍入差异。另SR002302的“500 mm (19.6 in)”按25.4换算为19.685 in，保留一位应19.7；应以批准主单位核对。R04，中。Cru-Wear (PGK)、Modified A8、HRC54–58、±0.05 mm目前为待内部回签声明，不作无凭据替换。

#### 4. Battery Recycling Shredder Blades

路径：[/products/twin-shaft-blades-battery](http://localhost:5173/products/twin-shaft-blades-battery)。Title/H1：**Battery Recycling Shredder Blades for Pre-Shredding**。

- **标题**：限定回收预破碎，与制造极片分切页互链，合理。URL保留twin-shaft不构成必须改URL的理由。
- **主图/技术图**：主图 `shredder-blades.webp` 是三种通用刀盘组合，既在本页图库重复，也在金属图库使用；技术图 `four-shaft-shredder-blade-00.webp` 是带凸台的三钩六角孔刀盘。只能确认刀型，无法确认电池工位，也不能凭文件名断定它来自四轴机。缺少电池应用/批准图号关联，见RC04。
- **正文**：以批准刀盘和隔套图询价方向正确。但仍有“Inert gas (N₂/Ar) compatible”、耐腐蚀处理和HRC54–58，且未列具体材料。BHS资料是整机惰性系统说明，不能证明Sureay某片刀的工况、材料/处理批准。所需材料规范和验收记录NOT FOUND。
- **规格**：技术项“±0.02 mm Thickness Parallelism”混合厚度公差和平行度两个概念；表中SR002402是厚度公差±0.05 mm，需明确总项是否只针对某配置。用户已要求隐藏Thickness列，本轮不建议恢复。历史隐藏厚度10–20/30–50 mm与BHS **VR0912i/VR1215i** 的cutting-tool width 50/58 mm对照，58未覆盖；但原厂Rotor diameter480/530 mm不能直接当作刀片OD证据。R05，中；页面直开超时，11月12日通过原厂索引全文及同厂德/法页交叉读取，不计独立二次证据。

#### 5. Single-Shaft Shredder Rotor Knives

路径：[/products/single-shaft-shredder-blades](http://localhost:5173/products/single-shaft-shredder-blades)。Title：**Single-Shaft Shredder Rotor Knives & Inserts**；H1：**Single-Shaft Shredder Rotor Knives**。

- **标题**：名称已调整正确；技术FAQ区分rotor knives、square inserts、cutting crowns，避免把所有动刀都等同于单一刀面。与定刀互链保留。
- **主图/技术图**：`single-shredder-blades-06.webp` 展示不同孔座/凸台的方形凹面刀块；`single-shredder-blades-01.webp` 展示凸芯和螺纹孔刀块。匹配产品类型；表面金色不能推断TiN或材料。各照片对应SR行NOT FOUND。
- **正文**：FAQ说只有原刀和刀座支持才可转位，正确；技术概要却笼统写4-Way Indexable (90° Rotation)，需确认是所有供货款还是部分款。`±0.02 mm Face Flatness`的指标表达及Cryogenically Stabilized应由图纸/检测回签，不能用资料常见刀块推得。见RC05。
- **规格**：SR002501的34×34×20 mm、ZERMA80001003及DIN912 M12×40，与**ZSS850、ZSS1200**备件表相符。R06，印刷页90/96、位置501/502，中；这验证型号原厂尺寸，仍不证明照片或Sureay成品完全复刻。SR002502–507（34×34×23、40×40×25、43×43×19.5、50×50×30、60×60×30、80×80×45 mm）的完整厚度+螺栓+OEM组合未在本次原厂材料中一一核到，沿用原值。WEIMA现页“Available knife sizes40 mm”只验证边长级别，不能验证40×40×25/M14/Vecoplan这一整行。

#### 6. Single-Shaft Shredder Stator Knives

路径：[/products/single-shaft-bed-knives](http://localhost:5173/products/single-shaft-bed-knives)。Title：**Single-Shaft Shredder Stator & Bed Knives**；H1：**Single-Shaft Shredder Stator Knives (Bed Knives)**。

- **标题**：固定刀/配套定刀定位正确；与Plastic Granulator Knives不应因同用bed/stator词就合并成一个产品。
- **主图/技术图**：`single-shredder-bed-knives.webp` 为带齿形边缘和长槽孔的条刀，另有可见方形刀块；技术图 `single-shredder-bed-knives-02.webp` 为带沉孔的锯齿状条刀。支持撕碎机定刀类型。图库中的 `single-shaft-bed-knives-drawing.webp` 是两种396 mm直刃槽孔刀，目前完整页面快照没有渲染这张中间图库图，不能说该图在页面上已向买家解释。
- **正文**：已有FAQ解释同义名称、分段/整条与重磨测量，合理。3,500 mm单件能力、≤0.05 mm/m直线度、HRC56–60及品牌整体适配仍缺内部凭据；首屏279–3000与能力3500不直接矛盾，分别可能是表内系列和定制上限。
- **规格**：SR002601=279×80×30 mm，M12×55，ZERMA **ZSS85080001202**，对应R06印刷页90位置601/602，中。SR002602/603的396×80/85×20、6槽22×40、68mm中心距与本地现存图一致（图还分别标76°、45°）；这张图没有机型/签章，不能由外形断言归Granulator，也不能确认单轴适配。SR002604–609六个长刀规格保留，逐行OEM/实供对应NOT FOUND。见RC06。

#### 7. Shredder Screens

路径：[/products/shredder-screens](http://localhost:5173/products/shredder-screens)。Title/H1：**Shredder Screens, Baskets & Screen Plates**。

- **标题**：明确是筛网配件，放在“Blades & Wear Parts”合集中合理，无须硬改成刀片。
- **主图/技术图**：`shredder-screens-04-square.webp` 为半圆形圆孔筛篮带安装边；`shredder-screens-01.webp` 为一叠弧形筛板。图片符合配件类型；照片不能区分具体Shredder/Granulator机型，也不能确认板厚/Hardox牌号。
- **正文**：孔型、孔距、板厚、曲率、安装点和“孔径不保证每粒出料长度”的FAQ合理。首屏/分类卡“Sizes Ø8–80 mm”实际说孔径，容易被理解为筛篮外径；技术项“Hole Diameter (round, square or slotted)”也把圆孔直径用于方孔/长孔，建议在后续确认字段名称，见RC07。
- **规格**：9行SR002701–709覆盖孔径8–80、板厚12–30、桥宽5–20 mm。旧WEIMA **WL6**官方页面/2012目录给Screen size10–40 mm，该区间在本表范围内；当前WL6网页给Fraction size10–60 mm，参数名不同，不应直接写成新筛孔范围。均不验证Sureay每行板厚、桥宽、开孔率或drop-in适配。R07，中。圆孔错排公式与表列8/5和80/20的示例组合约34.3%/58.0%相容，但这是几何计算，不是成品检验或所有孔型共同范围。

#### 8. Plastic Granulator Knives

路径：[/products/granulator-blades](http://localhost:5173/products/granulator-blades)。Title：**Plastic Granulator Knives | Rotor & Bed Blades**；H1：**Plastic Granulator Knives: Rotor & Bed Blades**。

- **标题**：与机械粉碎的动刀+定刀相符。Cumberland明确区分rotor与bed两种刀位；改归Shredder浏览集合也不应丢掉granulator身份。R08。
- **主图/技术图**：`granulator-blades-06.webp` 有3把直刃条刀，分别是开口槽、6长槽、5长槽；不是方块转子刀，但仅凭条刀外形不能证明每把属于rotor或bed。技术图 `edge-configurations.webp` 为8种刃口示意，不是这三把刀的受控工程图。图片没有明确分类错误证据，型号和刀位关联缺失。
- **正文**：当前装配、刃向及使用原机间隙的FAQ符合OEM说明；不应拿“bed knife”重名证明与单轴定刀同件。旧模板仍显示“All values verified via CMM inspection”，而现表仅是应测字段，并无实测数值，见RC13。
- **规格**：当前没有Common Standard Dimensions/Item No.表，只有Application/Knife positions/Dimensions/Mounting四项询价字段，属于信息缺口，不是已核准的标准系列。历史8行90–200×60–70×8 mm仍在旧研究记录；**ZERMA GSH800/1600**的动刀80000920=385×100×22 mm，定刀80001070=795×100×22 mm（R09印刷页94/95，单一OEM，中），说明市场有更大更厚配置，不证明历史8mm规格错。是否恢复原表、增加可供的大规格，待工程回签；不自动改数。见RC08。

#### 9. Cutter Compactor Blades

路径：[/products/cutter-compactor-blades](http://localhost:5173/products/cutter-compactor-blades)。Title/H1：**Cutter Compactor Blades for Extrusion Lines**。

- **标题**：挤出前预处理工位准确；NGR **C:GRAN**原厂说明rotor blade和guides将料准备后再挤出，支持与granulator区分，R10。
- **主图/技术图**：`cutter-compactor-blades-02.webp` 是两片单孔斜边条刀；`...-01.webp` 是一片长刃、单孔条刀。类型没有新发现的明显错误；但alt把前者定为stator、后者定为rotor，照片本身无法验证刀位。需要原机装配/供货图，不把它当已确认事实。
- **正文**：已提示先确定动/定刀位置和film/flakes，并链接Plastic Granulator Knives，分工合理。另有RC13的旧模板全值CMM验证声明。
- **规格**：当前没有标准尺寸/材料/硬度表；历史80–400mm长度未在NGR/EREMA公开单片备件图中核到，NOT FOUND。保留历史记录，不用NGR cutter-bin直径当作刀片尺寸。尚缺一款可公开图号、L×W×T、孔位、刀位及材料的配置。见RC09。

#### 10. Continuous Melt Filter Scraper Blades

路径：[/products/continuous-melt-filter-scraper-blades](http://localhost:5173/products/continuous-melt-filter-scraper-blades)。Title/H1：**Continuous Melt Filter Scraper Blades**。

- **标题**：连续熔体过滤排杂刮刀的名称准确；它不是granulator切碎刀。
- **主图/技术图**：主图 `scraper-blades.webp` 是中央花键孔的S形双臂件与圆盘组合；技术图 `scraper-blades-02.webp` 为同类S形件。需要确认售卖对象究竟是完整scraper rotor/carrier、可换刮片，还是成套组件。不能因POWERFIL某款使用三个刮片就判该双臂件错误，也不能直接称圆盘为过滤筛板——照片看不到过滤孔。见RC10。
- **正文**：现文提醒区分scraper和screen，方向正确。POWERFIL Laserfilter原厂把scraper disc与独立scrapers、screen discs分开；KAMADUR也另列holders/support plates，故应落实这组图片的零件身份。R11、R12。FAQ“A screen order also needs...”还暗示可报筛板订单，Sureay实际可供记录NOT FOUND。
- **规格**：当前只有部位/轮廓/配套测量字段；旧180–420×25–40×6/8mm是条状规格，对应目前S形件的测量对象并不明确。公开OEM精确对应NOT FOUND，不恢复为通用标准。需要整件直径/臂宽厚度/轴孔或独立刮片图的明确选择，R11不能替代供货图。另见RC13。

#### 11. Strand Pelletizer Cutting Rotors

路径：[/products/strand-pelletizer-rotors](http://localhost:5173/products/strand-pelletizer-rotors)。Title/H1：**Strand Pelletizer Cutting Rotors**。

- **标题**：拉条切粒转子与模面单片刀分开，准确。
- **主图/技术图**：`strand-pelletizer-rotor-01.webp` 为两件有轴端的齿形转子；`...-03.webp` 展示多个有轴转子、空心齿圈及长条配件。图型符合转子产品，但不能从图确认所有对象是同型号或同一种供货结构，更不能确认PM-HSS、硬质合金和动平衡等级。
- **正文**：冷却条料+bed knife、要求切削宽度/齿形/轴端信息，与MAAG示意吻合。当前FAQ问的是underwater die plate，答案没有把所有underwater设备误归模面刀；本轮无须因“underwater”一词重写。另见RC13。
- **规格**：现页无数值尺寸表。MAAG **SGS200-L/300-L/400-L**的Working width=200/300/400mm，R13印刷页4，中；它是工作宽度，不是转子总长或刀径。旧“Reduction Engineering SGS100–320mm”机型名/尺寸对象未对应，400mm仅是候选市场覆盖差异。首页/塑料行业页仍单独写≤0.005mm concentricity、G2.5等，和当前详情的待图确认口径需一起回签，见RC11/RC14。

#### 12. Die-Face Cutting Knives

路径：[/products/die-face-cutting-knives](http://localhost:5173/products/die-face-cutting-knives)。Title/H1：**Die-Face Cutting Knives for Plastic Pelletizers**。

- **标题**：模面切粒单片刀的名称及与strand rotor区分正确；对不同水下/水环刀座的具体适配仍需图号。
- **主图/技术图**：主图 `die-face-cutting-knives-00.webp` 实际为白底两把刀（一把闭口双槽、一把开口双槽）；技术图 `...-01.webp` 为黑底16种刀型组合。当前alt把主图说成多种型线范围、技术图说成白底一对刀，明显错位，见RC12。
- **正文/工程图**：查看了drawing00–10共11图。drawing01实际是 **两条开口槽、三根叉齿**，标题却写“three open slots”，可确认误描述。drawing07左右边距都9.5、槽距27mm，称offset slots含义不明确，建议确认是否只是相对其他图的差异。其余图题的关键尺寸与图内可读标注相符。
- **规格**：45×25mm及Ø5.5双槽示例与drawing00相符。11张仅为轮廓/孔槽示例，没有刀厚、材料、受控图号/版本与OEM型号，不能据此称全尺寸标准系列。Nordson **BKG AH75/2000/4000**原厂给Die Plate Diameter75/120/190mm及不同hub装刀数，而不是单片刀尺寸；不得拿模板直径填本页尺寸。R14，中。当前引导按批准图询价正确，另有RC13的CMM模板问题。

### 待 Yu 最终核对的问题清单

以下都是供审核的问题，不是已经执行的修改。

| ID | 性质/优先级 | 页面与问题 | 具体需确认的问题 |
| --- | --- | --- | --- |
| RC01 | 可确认出入 + 覆盖差异 / 中 | 通用双轴主图4钩，概要3/8/12，表中另有5钩；SSI460/864mm超可见OD范围 | 四钩主图对应哪一件实际供货？概要是否应明确包含4/5钩？SSI大规格是否在实际供货内，还是仅保留现系列及按图询价？ |
| RC02 | 可确认出入 + 覆盖差异 / 高 | 金属主图8钩六角孔，与概要1–3钩/花键不一致；Q85名义38mm小于当前40mm下限 | 主图是否就是已供金属刀？应修改概要覆盖该型，还是换与现概要匹配的实拍？是否实际供应Q85类38mm刀盘？ |
| RC03 | 可确认出入 / 中 | Tire表头Thickness (Chip Size)与FAQ不一致；500mm=19.685in而表19.6in | 保留原尺寸，是否把列名改为Blade Thickness并由FAQ解释胶块尺寸？500mm是否为批准主单位，英制是否按一位19.7修正？ |
| RC04 | 口径冲突 + 缺凭据 / 高 | Battery总项±0.02与表±0.05；材料缺失；通用图库未对应电池机型 | 公差具体指厚度偏差还是平行度、适用哪行？照片的批准图号/机型和已批准材料/表面处理是什么？N₂/Ar声明有何设备方规范依据？ |
| RC05 | 缺凭据 / 中 | Rotor首行OEM尺寸可查，其余完整尺寸+螺栓+品牌组合未证；4way总项比FAQ宽 | 能否给SR002502–507对应图/件号，并标出哪些确实4边转位？Face Flatness检测如何定义，是否与当前±表达一致？ |
| RC06 | 缺凭据 + 可见信息缺口 / 中 | Stator396mm图吻合两行但没有机型，且此图未显示；800–3000mm行未对应实供 | 396mm两款确切装在哪种设备/刀位？800–3000mm各行与3500mm能力是否有图/订单？396图是否应在以后核准后显示？ |
| RC07 | 字段含义 + 缺凭据 / 中 | Screens的Sizes实为孔径，方孔/长孔也写Diameter；其余尺寸无机型证据 | 是否明确标为Aperture/Hole Size；哪些孔型、板厚和桥宽是确实供应的组合？能否以一张现有成品图做映射？ |
| RC08 | 信息缺口 / 中 | Granulator当前无标准尺寸系列，主图各刀位未标 | 这三把刀分别是rotor/bed还是其他工位？历史8行哪些允许恢复？是否实际可供ZERMA22mm厚的大规格，只有回签后再加入？ |
| RC09 | 缺凭据 / 中 | Compactor图片alt已明确rotor/stator，实际关联未记录 | 两张图的刀位判断依据是哪份装配/供货图？可否给一件完整尺寸、孔位及材料记录？ |
| RC10 | 零件身份待确认 / 高 | Melt Filter主图为S形件+圆盘；标题“scraper blades”可能没有说清供货件 | 卖的是完整刮料转子/载体、独立刮片，还是成套？圆盘具体是什么零件？对应哪个filter model？是否同时供筛板？ |
| RC11 | 信息缺口 / 中 | Strand现页只有测量字段，旧SGS品牌/100–320范围未定位；图有轴式和套筒式 | 常做转子是哪种结构、型号、切削宽度/OD/齿数/轴端？SGS400mm工作宽度是可供还是仅原厂参考？ |
| RC12 | 可确认出入 / 高 | Die-face主/技术图alt错位；drawing01把2开槽写3开槽 | 是否按实图纠正alt和“two open slots / three prongs”说明？11张图是否均为可公开的生产图，并可补刀厚/图号？ |
| RC13 | 缺凭据/模板口径 / 高 | 5款Granulator旧模板显示“All values verified via CMM inspection”，但表内是应测字段；还统一标ISO/in-house/strict tolerances | 这些保证是否有本类有效文件？能否在升级时把未限定的“所有数值已CMM验证”改为与真实检测范围一致的表述？此条不否认Sureay确有CMM或认证。 |
| RC14 | 跨页不一致 + 缺凭据 / 高 | 塑料行业页、首页仍写旧的材料/精度/100% drop-in与性能增益，而产品详情改为按图确认 | ≤0.005mm同心度、G2.5、10×寿命、+30% uptime、100% drop-in分别适用哪一款、哪批检测/试验？是否统一按已批准配置限定，避免行业页重新扩大承诺？ |

### 跨页残留的准确位置

- `client/src/pages/plastic-industry.tsx:92`：Strand的Product JSON-LD仍有PM-HSS、solid carbide、≤0.005mm concentricity、ISO1940-1 G2.5及Maag/Coperion/Cumberland适配。
- 同文件`:106`：Filter JSON-LD仍有D2/H13/solid carbide和EREMA/Gneuß/Ettlinger/FIMIC适配。
- `client/src/data/homeData.ts:266`：首页Strand摘要仍有≤0.005mm和三品牌适配。
- `client/src/locales/en.json:126`：塑料行业页英文文案含100% drop-in OEM compatible；`:138`含up to10×寿命、CMM-verified zero-defect fit、+30% Uptime。
- 以上是当前英文来源残留，本轮未编辑，未涉及生成其他语言。

### 本次回查的外部来源登记

访问日期均为 **2026-11-12**。下表中有数值的原厂资料均为单一OEM，数值可信度“中”，限指定机型/资料版本；本地图片与渲染文本之间的矛盾属于直接观察，不依赖外部数值评级。

| 编号 | 来源与链接 | 原文位置 / 使用边界 |
| --- | --- | --- |
| R01 | [SSI Dual-Shear M85](https://www.ssiworld.com/en/products/dual-shear-m85) | Specifications，M85E/SD/H：Cutter Thickness(nominal)50mm/2in；Cutter Diameter460mm/18.1in。仅该型号。 |
| R02 | [SSI Dual-Shear M180](https://www.ssiworld.com/en/products/dual-shear-m180) | Specifications，M180-ED/HD：Cutter Thickness(nominal)76mm/3in；Cutter Diameter864mm/34in。 |
| R03 | [SSI Quad Q85](https://www.ssiworld.com/en/products/quad-q85) | Specifications，Q85ED/HD：名义38mm/1.5in、OD460mm/18.1in；Details说明混合物料及筛网。 |
| R04 | [ELDAN TSCC目录](https://eldan-recycling.com/wp-content/uploads/2021/06/Twin-Shaft-Clean-Cut-TSCC_210412.pdf) | PDF第2页Technical specifications；TSCC1200FD180两配置Knife width50或2×50mm；不是单片OD或其他OEM尺寸。 |
| R05 | [BHS惰性Rotary Shear VR](https://www.bhs-sonthofen.com/recycling-technology/machines/inert-shredding/rotary-shear-vr) | Technical specifications/Performance data，VR0912i、1215i；Width of cutting tools50/58mm，Rotor diameter×length480×1200/530×1500mm。直开超时，使用原厂页面搜索索引正文；同厂德/法页仅交叉读取。 |
| R06 | [ZERMA ZSS 2023手册](https://zerma-america.com/wp-content/uploads/2024/12/ZSS-Series-Operating-Manual-2023.pdf) | 封面为ZSS，尽管检索器标题误作ZPS；§13.1 ZSS850印刷页90，§13.3 ZSS1200印刷页96，pos501/502、601/602；34×34×20、279×80×30及紧固件。 |
| R07 | [WEIMA WL6原厂旧版参数页](https://m.weima.com/musa/shredding/product-detail.html?fid=1485) / [当前WL6页](https://weima.com/en/shredders/wl-6/) | 旧版Specs的Screen size10–40mm；当前Technical data参数名为Fraction size10–60mm、Available knife sizes40mm，不能把不同参数名直接互换。 |
| R08 | [Cumberland Granulator Knives](https://www.cumberlandplastics.com/knowledge-center/granulator-options/knives/) | Granulator Knives、Knife Tip Profiles、Cutting Angle；动定刀位、刃型、直/斜装配。只支持分类和选型，不支持Sureay精度。 |
| R09 | [ZERMA GSH800 2023手册](https://zerma-america.com/wp-content/uploads/2024/12/GSH800-Series-Operating-Manual-2023.pdf) | §13.2 GSH800/1600，印刷页94 pos501，页95 pos601：385×100×22/80000920；795×100×22/80001070。 |
| R10 | [NGR C:GRAN](https://ngr-world.com/product/cgran/) | Description：rotor blade+guides，后接extrusion；未给Sureay单片刀尺寸。 |
| R11 | [POWERFIL Laserfilter](https://www.powerfil.com/en/laserfilter/) | How the Laserfilter works，步骤1–3；screen discs、scraper disc、scrapers为不同件。 |
| R12 | [KAMADUR Laser filter scrapers](https://www.kamadur.com/products/Laser-filter-scrapers/RECY0013/) | 产品正文、Besides knives与Technical specifications；除knives另列holders/support plates等。是同行目录，不是Sureay供货证明。 |
| R13 | [MAAG Scheer SGS200-L/300-L/400-L目录](https://maag.com/wp-content/uploads/SGS-200-L-400-L_Scheer_4S_EN_s.pdf) | PDF第2页切削组件示意图；第4页Technical Data的Working width200/300/400mm。 |
| R14 | [Nordson BKG Type AH](https://www.nordson.com/en/Products/Polymer-Processing-Systems-Products/BKG-Type-AH-Pelletizers) | One concept–Different processes；Specifications at a Glance：AH75/2000/4000的Die Plate Diameter75/120/190mm及hub装刀数。 |
| R15 | [WEIMA Rotor and Cutting Technology](https://weima.com/us/rotor-and-cutting-technology/) | Cutting knives及counter knives说明：动刀、定刀、刀座和不同刀面；用于命名判断，未给Sureay逐件尺寸。 |

### 巡检结论边界

12款的主名称和基础工位描述总体成立。最明确可先核对的是：**通用/金属刀钩与轴孔概要、轮胎厚度列名、电池公差口径、过滤刮刀照片的零件身份、模面刀alt及开槽数、跨页残留性能承诺**。尚无依据批量推翻原尺寸表；OEM范围差异应转为实际供货核对，不应直接替换原值。各页没有进一步发现的部分也已记录，并非默认所有内部能力都已验证。


## 7. Shear / Log Saw / Wood Chipper / Custom / Cold Saw：11 款逐页明细

审核日期：2026-11-12。覆盖 Shear 5、Log Saw 2、Wood Chipper 2、Special-Shaped 1、Cold Saw 1，共 11 条产品记录、12 个产品/服务入口（11 个普通详情与 [/custom](http://localhost:5173/custom) 服务页）。本轮只读，未改页面、产品数据、图片、译文，未构建。

基线为当前 `catalog.json`、`rendered.json`、`blades.ts` 和英文 [/custom](http://localhost:5173/custom) 实际页面。产品图片均打开原资产目视核对，并读取尺寸/透明通道。下述“历史表”来自既有外部研究报告附录，不等于现在仍在页面上。

### 先确认的共同状态

- 这 11 条产品记录当前都没有 `standardDimensions`，也没有 Slitter 式 `detailLayout`。普通详情实际显示 4 项采购核对字段，不显示 Common Standard Dimensions。不能将历史尺寸表中的问题写成当前公开表仍有错误。恢复何种历史配置应逐行回签，不能用竞品数值替换。
- 11 个普通详情的英文标题、用途和 FAQ 已按工位收窄，旧硬度、公差、通用 OEM 适配名单大多不再公开。这是已经完成的内容修正。
- 同时，11 页仍显示分类副标题、通用认证条、`Decisive Specifications`、单栏 FAQ。规格表下仍有 `All values verified via CMM inspection · ISO 9001:2015`，即使表内只是“需要核对哪些尺寸”，没有实测数值。此句及询价区 2 小时回复属于尚存商业/质量声明。
- 图片均为 WebP，但并未全部完成响应图片、透明底、480 × 480 展示升级。下面将“格式合格”和“整套性能标准通过”分开。
- 两个金属剪切页的部分内容重叠是 `docs/seo-known-issues.md` C3 明确保留的决策，不把重叠本身列为问题。
- 外部资料只能支持市场存在这种刀、机型怎样选配，不能证明 Sureay 已做过、能达到某公差或能适配对应 OEM。

### 逐页审核

#### OT01 · Paper Guillotine Knives — P1 规格回签，P2 图片

路径：[/products/paper-cutting-blades](http://localhost:5173/products/paper-cutting-blades)。当前 Title：`Paper Cutter Blades | Guillotine Knives for Stack Cutters | Sureay`。H1：`Paper Guillotine Knives for Stack Cutters`。

**标题/分类**：符合纸堆裁切工位，名称没有把纸刀与金属剪板刀混为一种。TKM 将 Paper Cutting Knives 与 Three Way Trimmer 分列，现有独立详情合理。[E01]

**主图/技术图**：主图 `paper-cutting-blades-00.webp` 为带双排安装孔和斜刃的长直刀，物件方向符合纸堆裁切刀。技术区 `paper-cutting-blades-04.webp` 为纸堆放入裁纸机的场景图，能解释用途，无法读出刀体几何或孔距，不是尺寸图。主图源文件 9600 × 9600、约 291 KB、无 alpha；渲染约 555 × 496 且无 srcset，是本批最明显的过大像素资产。

**正文**：刀长、刃角、螺纹/沉孔、切纸垫条和纸堆高度方向正确。FAQ 已解释机器裁宽不等于刀长。可将 paper cutter blade / paper guillotine knife 的名称解释放已有技术 FAQ，首屏无需增加长文。

**规格**：当前没有数值表。历史 450–2050 mm 刀长、51–85 mm 刀宽不能直接据此宣布覆盖 POLAR。DIENES 目录页 47：POLAR 78 Junior 80 至机号 57560 为 960 × 107 × 9.7 mm、6 × M10；78 EL new / 78S/E/ED Serie 1195 为 960 × 110 × 11.7 mm、18 × M10。两例刀长落在历史区间，刀宽超出历史 85 mm，说明仅比刀长不足以判适配。约合 37.80 × 4.21 × 0.382 in 与 37.80 × 4.33 × 0.461 in。该规格本轮重核一个刀厂，可信度中，历史报告另有 TKM 对照但本轮未重新获取该第二目录。[E02]

**请用户确认**：历史纸刀的宽度和“刃厚/体厚”是哪些具体配置？能否提供其图号、机型后缀和孔型，并确定主图是否保留、技术区改为孔型图还是继续使用应用图？

#### OT02 · Heavy-Duty Metal Shear Knives — P1 图片/采购工位回签

路径：[/products/metal-shear-knives](http://localhost:5173/products/metal-shear-knives)。Title/H1：`Heavy-Duty Metal Shear Knives for Scrap & Plate`。

**标题/分类**：重载金属剪切是合理产品族。与 Guillotine 两页并存按既有决策保留。当前标题同时覆盖 scrap 和 plate，而正文 FAQ 重点在移动剪上/下颚、primary/guide/piercing 刀位，采购范围需要更清楚。

**主图/技术图**：主图 `granulator-blades/metal-shear-blades-00.webp` 是三件带孔长直刀；技术图 `metal-shear-blades-02.webp` 是成排长条刀，均看不到移动剪的刀位标注或整套颚刀配置。图片可用于直刃剪切，但图片属于何种机型、是否覆盖正文移动剪用途为 NOT FOUND。不能仅凭外形判图错，图片文件夹叫 granulator 也不等于实际分类错误。

**正文**：按刀位、工作边、垫片和装配图询价符合 Genesis GXT 的零件体系。GXT 1555R 原厂下颚清单区分主刀 1107953、导向刀 1105609、razor 刀 1101957；其刀身长宽厚和 Sureay 对应关系 NOT FOUND。原厂 PDF 直接读取超大小限制，搜索索引返回其印刷页 11 对应表，未将其作完整尺寸证据。[E03]

**规格**：历史 500–3100 × 70–125 × 20–32 mm 为长条剪切刀量级，不能据 Genesis 刀位清单完成验证。历史“整根 6000 mm”、±0.05 mm、重废剪切 100+ mm 均需内部记录，当前正文已没有这些数值。

**请用户确认**：本页主售长条重型剪板刀、废钢龙门剪刀，还是移动液压剪的刀块？主图对应哪个图号/工位？保留双入口后，应按实际供货给本页确定主工位，而无需合并两页。

#### OT03 · Guillotine Shear Blades — P2 配置细化

路径：[/products/guillotine-shear-blades](http://localhost:5173/products/guillotine-shear-blades)。Title/H1：`Guillotine Shear Blades for Sheet Metal`。

**标题/分类**：与板材 guillotine/squaring shear 工位一致，可保持。

**主图/技术图**：主图 `guillotine-shear-blades-05.webp` 为多种带孔直刀；技术图 `guillotine-shear-blades-02.webp` 为五根不同截面/孔型刀。图片均符合刀具族，但没有图号，不能判断哪些是同组上刀/下刀，也不应让买家以为五根组成一套。

**正文**：上/下刀、整根/分段、重磨余高、孔距与刃向均是有效核对项。HACO GSX 页面把 blade angle 与 blade gap 分列，支持当前 FAQ 对剪切倾角与间隙的区分。[E04]

**规格**：当前没有数值表。历史 508–1300 mm 长、63–100 mm 宽、16–25 mm 厚未获得逐行 OEM 完整对应。HACO GSX 公开机器能力和控制参数不能转成替换刀尺寸。此前报告引用 CINCINNATI G Series 截面仅作为量级参照，不能覆盖整个旧表。

**请用户确认**：是否用图号分别标注主图中的上下刀/分段刀？旧表每行的机型、刀位及单根/成组关系何时回签？

#### OT04 · Three-Knife Trimmer Blades — P1 历史机型映射

路径：[/products/three-knife-trimmer-blades](http://localhost:5173/products/three-knife-trimmer-blades)。Title/H1：`Three-Knife Trimmer Blades for Book Finishing`。

**标题/分类**：书本前口、头、脚三面切，与单刀纸堆裁切分开合理。TKM 公开工位为 front/head/tail，当前 foot 也是正文用词，建议技术 FAQ 可解释 head/foot/side 的工位，不堆砌标题。[E05]

**主图/技术图**：主图 `muller-martini-trimmer-blades-02.webp` 为一长直刀和两件端部有斜切外形的刀，可表达前刀+侧刀组，但无图号；技术图 `...-04.webp` 是多款刀混排，能看出 HSS 字样，不能认定均属同一套。技术图有 alpha，工具黑背景显示不是原图黑底。OG 仍引用 `...-00.webp`，与主图不同，可接受为独立分享图，但应由用户决定是否统一。

**正文**：已要求逐刀位图纸、机型和版本，方向正确。

**规格**：当前没有数值表。历史将 DS 3671 Merit 前刀写作 580 × 115 × 12、侧刀 450 × 115 × 12 mm。DIENES 页 39 和 Kanefusa 页 34 均给 3671 MERIT Series 97 前刀 540 × 90 × 12、侧刀 417 × 90 × 12 mm，孔数分别 12 × M10 和 20 × M10。两独立刀厂对应尺寸/孔数一致，可记高可信度，但不是 Sureay 能力证明。DIENES 页 41 把历史 580/450 这对尺寸列于 **3675 ORBIT old**。这是值得优先回签的“尺寸可能属于另一机型”线索，不授权直接改旧值。两个目录前刀件号字段亦有差别，不能忽略版本。（540/417 mm ≈ 21.26/16.42 in；580/450 mm ≈ 22.83/17.72 in。）[E02][E06]

**请用户确认**：旧 3671 行是否实际为 3675 ORBIT？请按原订单/图纸回签。另 Kolbus HD150/153 合写行和旧 301/361 行也按前/左/右刀位逐行核对，不先自动更名。

#### OT05 · Scrap Chopper Blades — P2 刀鼓配置

路径：[/products/scrap-chopper-blades](http://localhost:5173/products/scrap-chopper-blades)。Title/H1：`Scrap Chopper Blades for Coil Slitting Lines`。

**标题/分类**：定义为卷材纵剪线边废料碎断刀，符合 DIENES 与 Machine Concepts 的产品分工。可保留在剪切刀组，同时从 Steel Coil Slitting 引导，当前双向相邻关系合理。[E07][E08]

**主图/技术图**：主图 `granulator-blades/scrap-chopper-blades.webp` 是两件厚矩形、长圆孔刀；技术图 `...-02.webp` 混列直刀和 L 形刀。均需说明机型和 cutter station，现有图片无刀号。

**正文**：已明确 slitter 负责生产带材宽度，chopper 处理边料，消除了主要概念混淆。

**规格**：历史 100–400 × 40–100 × 15–30 mm 范围与 Butech 机型映射 NOT FOUND。Machine Concepts 的自家设备采用双鼓斜切刀、可选直刀、每刀四工作边；这是特定产品设计，不能外推“所有碎边刀四刃”。当前通用文案没有作该外推。可补核对鼓数、刀位、直/斜切刃型和工作边数，先不增加未经确认的尺寸。[E08]

**请用户确认**：两张图分别对应哪种刀鼓/刀位，哪些配置是 Sureay 正在供货的标准项？

#### OT06 · Tissue Log Saw Blades — P1 孔型/机型，P2 技术图

路径：[/products/tissue-log-saw-blades](http://localhost:5173/products/tissue-log-saw-blades)。Title：`Tissue Log Saw Blades for Tissue & Towel Rolls | Sureay`。H1：`Tissue Log Saw Blades for Paper Roll Converting`。

**标题/分类**：纸巾/毛巾成卷横断定位成立；上游幅材纵切链接 Paper Slitter 的方向正确。

**主图/技术图**：主图 `tissue-log-saw-blades-05.webp` 为无齿大圆刀，中心孔与外围安装孔可见。技术图 `...-02.webp` 为有保护油/包装纸的圆刀实物，能证明轮廓，无法作为标注尺寸图。首屏另外 3 张实物轮播由 gallery 前四项组成，照片不能自动证明同一配置。

**正文**：原始外径、中心孔、刀体厚度、刃口和机上磨削安排这些询价点符合 Julia/TKM。[E09][E10]

**规格**：当前没有数值表。Julia 页 5 有同 Ø610 × 4.76 mm 厚，中心孔分别 Ø68.26 与 Ø82.55 mm，且同一中心孔还有不同 hub/bevel 配置。仅“OD610”不足以适配。Julia Ø1000 的刀体厚为 8 mm，旧页对应行须回签。Bretting Industrial Roll 原厂刀径 27–30 in，精确 685.8–762 mm（原厂圆整 686–762），不能用其证明旧 Ø680 的 Bretting/MTC 泛映射，亦不因此判所有 Bretting Ø680 都不存在。Ø610/810/870 等市场存在，TKM/JULIA相互支持直径，不证明本厂供货范围。[E09][E10][E11]

**请用户确认**：恢复目录时是否逐行建立 OD、bore、body thickness、驱动孔、hub/bevel 与件号的完整配置？旧 Ø680 和 Ø1000 行对应何机型及图号？

#### OT07 · Nonwoven Log Saw Blades — P1 工况/涂层证据

路径：[/products/nonwoven-log-saw-blades](http://localhost:5173/products/nonwoven-log-saw-blades)。Title/H1：`Nonwoven Log Saw Blades for Wipe Rolls`。SEO 没有单独覆盖对象，当前正常回退产品标题/描述，不是缺 Title。

**标题/分类**：明确已成卷非织造材料横断，和 Nonwoven Slitter 幅材纵切分开合理。Kinetic 的 wet wipe 页面含剪切、打孔、anvil 等多工位，不应拿“wet wipes 行业存在”直接证明任何一款是 log saw。[E12]

**主图/技术图**：主图 `nonwoven-log-saw-blades-01.webp` 为金色表面的无齿圆刀；技术图 `...-03.webp` 为人员持大圆刀。金色只能记录为外观，涂层名称、耐腐蚀能力、是否与技术图同配置均 NOT FOUND，不能凭颜色写 TiN。

**正文**：当前询问干/湿工位、液体、清洗暴露和原刃材，比按所有 hygiene 应用统一宣称耐蚀更合理。FAQ 已明确 log 与 web 差别。

**规格**：历史 Ø350–700、D2 HRC58–60、≤0.15/0.10 mm跳动当前不在公开字段。现行 OEM 逐机型刀号、尺寸、金色涂层为 NOT FOUND。已有研究报告的湿巾专利历史样例不能当现行适配目录。Kinetic 支持按湿巾工况选材/表面，但其自身不锈钢方案也不能证明我们的D2涂层性能。[E12]

**请用户确认**：金色样片的材质/涂层记录、实际干湿工位与可公开机型是什么？现有页面应继续收集这些输入，数值恢复待图纸。

#### OT08 · Wood Chipper Blades — P1 主图与图纸配置

路径：[/products/wood-chipper-blades](http://localhost:5173/products/wood-chipper-blades)。Title/H1：`Wood Chipper Blades for Drum & Disc Chippers`。

**标题/分类**：转鼓/刀盘上的动刀，和定砧独立采购，合理。

**主图/技术图**：主图 `wood-chipper-blades-11.webp` 为多开槽、两个圆孔的直刃刀。技术区 `wood-chipper-blades-drawing.webp` 是俄英混合工程图，显示 **330 × 114 × 13 mm、36°、3 个槽、2 × M8**，还带0.05几何公差、孔距等。主图开槽数与图纸不同，不能把该图当主图相同配置的测量依据。图号、OEM机型、授权来源、单位标题栏均未见，需回签。330/114/13 mm 约 12.992/4.488/0.512 in，仅为图上参数换算。

**正文**：动/定刀互链、原刃角、刀座、螺栓和剩余刀宽的核对方向正确，符合 Bandit。[E13]

**规格**：当前正文没有历史数值表，但图内数值仍是公开规格信息，应纳入验收。Timberwolf TW230HB Petrol 40hp 原厂 §5.14 给动刀 135 × 100 mm、凹磨 R75，是另一具体配置，不能验证此330图。OEM单源中可信度，只限该手册。历史材质/硬度及±0.05厚度承诺仍需本厂记录。[E14]

**请用户确认**：330图是否为实际供货图？可否标明示例配置和图号，或换成与主图同件的图？主图是哪种盘/鼓机型？

#### OT09 · Wood Chipper Anvils — P1 技术图片身份

路径：[/products/wood-chipper-anvils](http://localhost:5173/products/wood-chipper-anvils)。Title/H1：`Wood Chipper Anvils & Counter Knives`。

**标题/分类**：固定在喉口、与动刀配合的定砧，独立入口合理。Bandit 明确区分 chipper knife 和 stationary anvil。[E13]

**主图/技术图**：主图 `wood-chipper-anvil-00.webp` 是三圆孔矩形板，技术图 `...-02.webp` 是两片带大斜刃、沉孔的薄长刀。主图/技术图区别明显，刀位无法仅凭外形确定；应按图号确认技术图是否也是 stationary counter knife，或其实为动刀实物，暂不判错。

**正文**：询问工作面、朝向、调节机构，并说“some anvils”可翻面，限定正确。不能把 Bandit 新机四面砧扩展到所有机型。

**规格**：当前没有数值表，旧9行的孔型/定砧图号需回签。旧材质把 42CrMo 写作 Manganese Steel、D2与Cr12MoV括号等同及“Surface=Core”的绝对承诺应在恢复历史数据前由材质单/热处理记录核实；这些旧句当前不在页中。

**请用户确认**：两张图各是什么定砧/刀位与件号？哪些供货砧支持翻面、多少工作边？

#### OT10 · Special-Shaped / Custom — P1 商业、工艺和认证，P2 页面分工

主要入口 [/custom](http://localhost:5173/custom)，当前 Title `Custom Profile & Special-Shaped Blades | OEM | Sureay`，H1 `Any Blade. Any Cutting Tool. Made to Spec.`。`special-shaped-blades` 数据记录另有更保守的产品名和采购字段，[/custom](http://localhost:5173/custom) 正文仍链接 [/products/special-shaped-blades](http://localhost:5173/products/special-shaped-blades)。需以 [/custom](http://localhost:5173/custom) 实际硬编码和英文词条审核，不能只查 blades.ts 后宣布已去除能力承诺。

**标题/分类**：以图纸/样件定制特殊外形刀符合 EDGE 的采购逻辑，主要关键词存在于 Title，但 H1 的“Any Blade/Any Cutting Tool”过宽，覆盖了未限定的所有切削工具。是否改成直观产品服务名交用户审议。[E15]

**主图/技术图**：已打开实际背景 `special-shaped-knife-01.webp`、目录图 `special-shaped-knife.webp`、两张 `custom-blade-showcase-01/02.webp` 和三张工艺图。可见圆盘、钩形、直条、齿形等轮廓，能表达定制范围，但照片本身不能支持“Real...Already in Production”“From Our Production Floor”及每个物件材质/CMM全检。需要实际工单和图片来源对应。`material-selection.webp` 图中另列 A2/M2/CPM10V，正文主推 D2/H13/PM-HSS/solid carbide，图上的原料范围也须回签。主图是背景图，移动端隐藏，不按普通产品480方图机械判错；全部图无 srcset，能力图缺固有尺寸，尚未满足响应性能标准。

**正文与规格逐项问题**：

| 子项 | 当前实际声明 | 核对结果/请确认 |
| --- | --- | --- |
| OT10a · P1 工艺 | Every alloy / Every custom blade 都真空淬火并深冷，将残奥转马氏体 | 同页包含整体硬质合金。CERATIZIT说明其粉末冶金压制/烧结路线，不能将工具钢组织转变说明覆盖 solid carbide。请按钢刀、整体硬质合金、镶硬质合金分开提供实际工艺，勿用全材质一句话。[E16] |
| OT10b · P1 公差 | SEO写±0.02 mm；Product结构化数据另列 Profile±0.02、Edge±0.005 mm | 固定公差适用轮廓大小、特征、材质和测量条件 NOT FOUND。可见正文未明确列±0.005，因此有正文/结构化数据口径差异。请确认可公开特征和对应检验单。 |
| OT10c · P1 订单承诺 | MOQ1、首样5–15天（简单D2/H13为5–7工作日）、$20–800/件、报价1–2工作日、询价组件2小时回复 | 属于Sureay商业承诺，外部网站无法证明。请回签SKU/批量边界、工作日、价格税费/运输范围及响应与正式报价区别。价格同时进Product offers，并非只有FAQ。 |
| OT10d · P1 全检材料 | 每单CMM、HRC、钢厂溯源、热处理证书、FAIR | 现有量测实验室图只能说明场景，不能证明每单履约。整体硬质合金硬度检测不能笼统按所有订单HRC，需材料相应标尺。请提供真实报告包和例外边界。 |
| OT10e · P1 认证范围 | Custom质量保证称ISO9001:2015认证，附证书图 | 图上范围是法兰加工生产，详情见下。需确认完整/扩项证书，不判断证书真伪。 |
| OT10f · P2 极宽范围 | Any OD/ID、No profile too complex、Any alloy、任何图都可磨出 | 未给最大外廓/厚度/加工方式边界。更宽能力与“工程先评审不可行项”的段落冲突。请回签范围，不自动删除。 |
| OT10g · P2 名称与刀型 | p7 Conical/Tapered→pelletizers/cone-type granulators；直刀单双刃与工况一概对应 | 具体产品/机型为NOT FOUND。请用实际产品图号说明，不将造粒/粉碎不同设备仅由“锥形”关联。 |
| OT10h · P2 社会证明 | 自2008、50+国家、Kevin L.寿命提高50%、全部为本厂生产照片 | 本次未见可对应内部证据，标待回签，不判断虚假。提供可公开客户授权/案例和历史记录后再定措辞。 |

**证书图片读数（仅此图片证据）**：

- 文件：`D:/Business/SureayMachineTech/SureayMachineTech/client/public/images/about/iso-9001-2015-certificate.webp`。
- 主体逐字：`Maanshan Sureay Machinery Technology Co., Ltd`。
- 证书号：`10114Q10399R0M`。
- 标准：`ISO9001: 2015`。
- 认证范围逐字：`Flange processing production`。
- 图示起止日期：`Jan 27th,2024` 至 `Jan 26th,2027`。当前2026-11-12在该图示有效区间；持续有效状态未另行核验。
- 目前站点名称与证书主体的法定对应、关联工厂关系及涵盖刀片制造的扩项文件为NOT FOUND。仅凭这张图不足以证明刀片制造属于该认证范围，不作真伪判断，也不据此擅自改站。

**已确认不应误报的问题**：当前前端/后端已支持 JPG/PNG 等图片附件，FAQ接受这些格式与代码相符；不能用AGENTS旧格式列表判不支持。上传可用性未在本子任务提交真实表单验证。

**补核：独立产品详情 [/products/special-shaped-blades](http://localhost:5173/products/special-shaped-blades)（OT10i · P2 入口分工）**：2026-11-12 本地桌面/手机快照确认该地址返回 200，Title 为 `Special-Shaped Industrial Blades Made to Drawing | Sureay`，H1 为 `Special-Shaped Industrial Blades Made to Drawing`，canonical 自指 `https://sureay.com/products/special-shaped-blades`。因此 [/custom](http://localhost:5173/custom) 不是唯一入口；数据中的 `link: /custom` 改变卡片目标，没有关闭通用产品路由。当前 [/custom](http://localhost:5173/custom) 与该详情互链，站点地图/预渲染也分别纳入，不能只统计数据记录就漏审此页。

- **标题与正文**：详情聚焦具有特定轮廓、刃口和安装接口的替换刀，[/custom](http://localhost:5173/custom) 聚焦交图、制造流程和定制服务。此分工可以成立，不把两页并存直接判为重复。详情仍有 `Custom Profile Blades` 分类副标题、通用 ISO/自有热处理/公差/交付认证条和 2 小时回复，不等于 [/custom](http://localhost:5173/custom) 的承诺已被去除。
- **主图与技术图**：实际都使用 `special-shaped-knife.webp`（2912 × 1440、约 164 KB、无 alpha），为圆盘、异形盘、直条、开槽和钩形件拼图。已目视核对，可表达产品族，未标单件图号/刀位/机型，不能支持具体适配或尺寸。桌面主图区约 555 × 496、技术图区约 586 × 431，两处无 srcset/sizes；技术区复用拼图，不是工程尺寸图。
- **规格与 FAQ**：没有 Common Standard Dimensions。现行 4 行为 Application、Geometry、Mounting、Quote inputs，属于询价所需信息，仍被下方 `All values verified via CMM inspection · ISO 9001:2015` 笼统背书。技术 FAQ 两题为图纸所需内容、能否从磨损样件开始；无 Why Choose Sureay 栏，与已批准模板存在差距。该详情没有公开 [/custom](http://localhost:5173/custom) 的固定公差、MOQ、交期和价格 offers，不应将服务页的问题错误记到此详情。
- **请用户确认**：保留两入口时，是否按“特殊外形替换刀选型详情”与“定制提交/制造服务”区分采购任务，并确定图号示例与主入口？当前证据不足以自行合并、删除或更换 canonical；本轮仅记录现状。

**请用户确认**：先逐项回签OT10a–h，尤其工艺、公差、证书范围、交期/价格四项，再决定 [/custom](http://localhost:5173/custom) 与专属特殊外形详情的分工。此次不改变路由。

#### OT11 · Metal Cold Saw Blades — P1 执行删除前的状态清单

路径：[/products/metal-cold-saw-blades](http://localhost:5173/products/metal-cold-saw-blades)，当前仍返回200。Title：`Metal Cold Saw Blades for Tube & Bar Cutting | Sureay`；H1：`Metal Cold Saw Blades for Tube, Bar & Profiles`。

**标题/主图/正文**：金属管棒型材横断定位正确。主图 `metal-cold-saw-blades.webp` 是带齿圆锯，图上可读 `285x2.0x32-72T` 和 `SY-0E0059002`；技术图 `...-02.webp` 为锯切方管的设备场景。无法仅凭图确定HSS或镶齿构造。正文要求孔、驱动孔、齿数与被切截面，方向正确。

**规格**：当前无尺寸表。Scotchman CPO350 原厂给最大刀径350 mm、主孔40 mm、驱动孔代码4/12/64，和图上285/32不同，但这本来就不是同一已声明机型，不能据此判主图规格错误。主图的原刀具标记可保留为历史素材，不能把它当SR目录号。[E17]

**用户已计划删除**：本轮只登记仍存在。实际删除时应统一检查产品页、单产品分类页、主菜单、[/custom](http://localhost:5173/custom)标准形状链接、相关推荐、sitemap、hreflang/现有语言路由、站内文章入链和旧URL响应。没有等价替代时不把它硬转到steel coil slitter，因为横锯与纵剪采购意图不同。保留旧内容归档，由主任务给出路由处理方案。此次不进一步扩写该产品。

**请用户确认**：删除范围是否包含 Cold Saw 分类入口及所有语言已有旧路径的下线响应？这只是后续执行边界，不是本轮重复索取删除意向。

### 跨页验收清单

| ID | 优先级 | 待确认内容 | 当前状态与建议 |
| --- | --- | --- | --- |
| OT12 | P1 | 原尺寸表/Item No.恢复范围 | 11条当前无表，恢复应按图号配置回签，赋稳定Item No.。不可未经用户决定用OEM参考表替代原表。 |
| OT13 | P1 | 普通详情CMM/ISO/自有热处理/交付/2小时承诺 | 当前仍可见，需内部证明边界。不是因数值移除就已解决。 |
| OT14 | P2 | Slitter模板验收 | 11普通页还保留分类副标题、描述与通用认证条，FAQ公司数组空，故一栏且不显示“01 Technical FAQs”分栏标题。与批准升级模板有差距，属于排版/验收问题，不是市场事实错误。 |
| OT15 | P2 | 图片性能 | WebP格式已完成；本批普通页主图metadata未配置响应宽度，渲染无srcset，纸刀9600²尤应处理。主图多为不透明白底。是否透明需按用户产品展示标准确认，不能把三面切技术图的alpha误当黑底。 |
| OT16 | P2 | 技术图片与真实配置 | 每张图建立文件→产品→图号→刀位对应。木片动刀主图/330图、定砧技术图、重载金属剪主图优先。 |
| OT17 | P2 | 内链意图和目标 | 现有纸刀↔三面切、木片刀↔定砧、tissue/nonwoven与各自slitter互链方向正确。[/custom](http://localhost:5173/custom)仍有Cold Saw和Granulator分类链接，等分类迁移/删除决策实施时再统一处理。 |

### 本轮重新访问的外部证据

全部访问日期为2026-11-12。数值均为外部产品/对应机型，不是Sureay供货声明。单一OEM或刀厂数值记中可信度，两个独立发布方一致的具体字段才记高。

| 编号 | 来源与原文位置 | 本次采用范围 |
| --- | --- | --- |
| E01 | [TKM Paper Cutting Knives](https://www.tkmgroup.com/en/paper-cutting-knives)，正文与Matching Cutting Sticks | 纸堆刀具应用和配套垫条，不移植其公差/寿命比 |
| E02 | [DIENES纸刀目录](https://www.dienes.de/wp-content/uploads/2020/07/Preisliste_Papierschneidemesser-2_mit-web_Price_list_paper_cutting_knives_verkleinert_2014.pdf)，印刷页39–41 Müller-Martini、页47 POLAR | 指定历史机型几何及孔数，对应版本必须保留 |
| E03 | [Genesis GXT1555R原厂零件手册](https://www.genesisattachments.com/sites/default/files/literature/GXT1555_PartsManual_Oct.pdf)，印刷页11 Lower Blades（搜索索引可读，全文超过工具大小限制） | 刀位及零件号，未取得刀身尺寸 |
| E04 | [HACO GSX](https://www.haco.com/en-GB/machines/gsx-shear)，Intuitive control | 剪切倾角和刀片间隙分别设置 |
| E05 | [TKM Three Way Trimmer](https://www.tkmgroup.com/en-us/products/industrial-knives-for-the-paper-industry/postpress-industry/three-way-trimmer-knives)，正文front/head/tail | 三面切工位，不移植公差 |
| E06 | [Kanefusa纸刀目录](https://www.kanefusa.net/en/products/downloads/item/1.Paper%20Cutting%20Knife%28EN%20GE%29.pdf)，印刷页34 Müller-Martini 3671 MERIT Series97 | 与DIENES独立比对尺寸/孔数，件号字段有版本差异 |
| E07 | [DIENES Shear blades and scrap chopper](https://www.dienes.de/en/products/straight-knives/shear-blades-and-scrap-chopper/)，Application | 金属剪切及边料碎断的工位 |
| E08 | [Machine Concepts Scrap Choppers](https://machineconcepts.com/scrap-choppers-scrap-handlers/)，Standard Features | 该厂双鼓、斜切/直刀、四工作边配置 |
| E09 | [TKM LogSaw Blades](https://www.tkmgroup.com/en/logsaw-blades)，FAQ available dimensions | 该厂可供刀径，不能对应任意OEM |
| E10 | [Julia Log Saw Blades](https://www.juliausa.com/wp-content/uploads/2021/08/LOG-SAW-BLADES-FOR-TISSUE-PAPER.pdf)，PDF页5 Technical Specifications | 同外径不同孔/厚/hub/bevel，不把整页品牌列表逐行强行对应 |
| E11 | [Bretting Industrial Roll Log Saw](https://www.bretting.com/equipment/paper-converting-complementary-equipment/log-saws/industrial-roll/)，Specifications Minimum/Maximum Blade Diameter | 该款设备27–30in，孔型NOT FOUND |
| E12 | [Kinetic Wet Wipes](https://www.knifemaker.com/industries/wet-wipes/)，产品工位及Moisture-Rich Environments | 干湿/液体暴露相关选型，不证明Sureay涂层 |
| E13 | [Bandit Parts](https://banditchippers.com/parts-page/)，Chipper Knives / Chipper Anvil | 动定刀职责、磨损/翻面限定；不向全行业扩展四面砧 |
| E14 | [Timberwolf TW230HB Petrol40hp手册](https://timberwolf-uk.com/wp-content/uploads/2025/05/C190-0510-230HB-Petrol-40hp-OM-English-Rev-3.0.pdf)，§5.14 Blade Wear，页36/65（搜索索引文本） | 此版本135×100mm、R75。既有2021 PDF此次全文读取超限，不冒称重新通读 |
| E15 | [EDGE Specialty Blades](https://www.edgeindtech.com/product/specialty-blades-converting/)，Description | 按件号/图纸/样件定制及用途，不移植无限能力 |
| E16 | [CERATIZIT carbide production](https://ceratizit.com/int/en/cemented-carbide-to-products/production.html)，Cemented carbide production / Sintering | 硬质合金制造路线，不宜套用所有钢刀真空淬火/马氏体说明 |
| E17 | [Scotchman CPO350](https://www.scotchman.com/saws/view/cpo-350?hsLang=en-us)，Capacities & Specs，Max Diameter / Arbor Bore / Pin Spacing | 限CPO350机型，350mm/40mm/4-12-64 |

既有内部对照：`docs/page-audits/external-research-shear-blades-2026-11-11.md`、`external-research-log-saw-blades-2026-11-11.md`、`external-research-wood-chipper-blades-2026-11-11.md`、`external-research-special-shaped-blades-2026-11-11.md`、`external-research-cold-saw-blades-2026-11-11.md`。以上报告的旧数据是回签线索，未作当前供货规格认证。


## 8. 本轮验证记录与回签方式

### 已完成的检查

- 36 条刀具记录全部逐项核对标题、主图/技术图、正文和规格；Special-Shaped 同时核对独立详情与 [/custom](http://localhost:5173/custom) 服务页。Die-Face 的 11 张尺寸图另逐张核对说明。
- 7 个分类页 + 36 个详情页 + 1 个定制服务页，共 44 个英文入口，本地均返回 200、各有一个 H1、自引用 canonical。页面能访问不等于已在生产环境发布或被搜索引擎索引。
- 桌面视口 1440 × 1050 和手机视口 375 × 812 均完成本地检查；手机页宽未超出视口，检查到的页内锚点均有目标。桌面采集未出现页面脚本异常。另目视检查了手机 Slitter 分类与 Paper Guillotine 首屏。
- 7 个分类页的实际产品卡片与 ItemList 集合/顺序一致；没有发现分类 FAQ 重复产品 FAQ。共 28 张可见目录尺寸/配置表首列为 `Item No.`。Shredder 的 42 个编号均为 SR002 三位系列前缀加三位流水号，且无重复；编号是否精确对应唯一配置另见 G04/SL12。
- 检查主区域 `<img>` 的源文件及响应候选：文件存在、格式为 WebP；确认浏览器实际图片选择，见 G02。范围不包含全站每张背景图、新闻正文图或所有语言页面，因此不作为上线前全站图片验收通过记录。
- 单轴动刀/定刀互链仍存在；其他产品内部链接的采购意图和迁移时需处理的入口见各分组明细。

### 本轮未声称完成的事项

本次是资料巡检与回签文档，未修改产品数据、原尺寸、图片、分类、URL、英文页面或译文，未执行 Cold Saw 删除。未运行生产构建、多语言生成、真实询价提交、完整上传流程、GSC/GA4 更新或线上搜索索引验证。附件能力只核对当前前后端代码说明，不把它当作提交成功测试。

数值来源仅能支撑来源所指的具体配置。对没有公开完整图纸或内部凭据的项目，文中明确保留 `NOT FOUND`。这不是将规格判错，也不会自动触发更改。

### 建议的回签顺序

1. **图文直接出入**：SL01、SL06、RC01–04、RC12，先决定采用哪份当前图纸/样件和准确说明。
2. **图片身份与历史映射**：RC06、RC08–11、OT02、OT04、OT06、OT08–09，补图号/刀位/件号；历史表仅作为核对底稿。
3. **能力和商业声明**：SL02–05、SL09、SL13、RC13–14、OT10a–h、G01/G06，以真实检验、认证、报价/履约记录决定公开口径。
4. **配置资料与模板升级**：决定各类可公开标准表后，安排稳定 Item No.、首屏与技术区、FAQ 双栏、响应图片及分类迁移。Cold Saw 按删除计划单独清理入口，不继续扩写。

可直接按问题编号回复：`保留原值`、`按建议改` 或 `待补资料`，并附对应图号/机型/供货记录的文字说明。回签后再整理具体页面改动。
