# Slitter 品牌区文案与 Engineering Advantages 事实清单

日期：2026-11-16。**按用户最新指令，Engineering Advantages 只分析可以写什么，不提供新标题／段落成稿，不修改页面。** `slitter-copy.json` 仅含 13 个 `{id, compatibleMachinesIntro}`，其中 Bottom Grooved Anvil 已认可描述逐字保留。此前尚未实施的工程区草稿已从交付 JSON 中移除。

## 证据边界

- 现有资料基线：`catalog-before.json` 中 `rendered` 与 `blades`，对应工作区 `client/src/data/blades.ts` 的产品 ID。下文“已有”指当前目录已列明，并不意味着本轮取得了工厂图纸、检验报告或实际订单。
- `detailLayout.technicalSpecs` / `specs`、`dimensionTables`、`faqs.technical` 是可追溯的现有供货选项；是否把某个数值提升为首页卖点，应与实际交付配置及检验范围一致。
- 既有工程卡中的比较、因果解释、最高速度、绝对效果不是自动成立的 Sureay 能力证明。事实、合理推论与待确认承诺分开。
- 成熟厂家资料只核对部件名称、结构与市场表达；其工艺、寿命、精度和服务不能移植为 Sureay 优势。

## Bottom Grooved Anvil：可讨论的五个销售角度

| 可用事实／服务 | 对买家有什么用（候选角度，非成稿） | 当前依据 | 不能直接延伸的承诺／仍需确认 |
| --- | --- | --- | --- |
| 可按图纸定义孔径、环宽、槽宽／槽深、工作刃位置与锁紧结构 | 为现有分切机补充替换环，采购可以围绕既有刀轴和刀对提出具体配置；强调可买到什么，而非教买家识别刀型 | `bottom-grooved-anvil-knives` 的 custom FAQ；原工程卡 `selection-1`；两组尺寸表 | 不代表所有品牌所有机型通配，也不能只凭同外径和孔径承诺安装成功。若要写“直接安装无需调整”，需该配置的图纸／实机记录。 |
| NN 平孔、NG 偏心锁、NS 螺钉锁，以及 split-ring／clamp 结构 | 提供不同既有刀轴安装方式的选项；可讨论“保留原锁紧方式的替换采购” | 技术规格 `Mounting`；原卡 `selection-2`；DIENES Types 与 Different locking procedures 段解释 NN/NG/NS 用语 | “更快换刀”“减少停机”“保护刀轴”需具体设计和对比数据，不能只借用竞品叙述。各锁紧结构是否全部为自产成套件，未取得工厂记录。 |
| H6 精磨孔、槽宽公差 ±0.01 mm、端面平面度 ≤0.003 mm、T.I.R. ≤0.02 mm 已在表中 | 可围绕有明确验收尺寸的替换环订购表达价值；尺寸控制是实际采购差异，不用空泛“高精度” | 当前 `detailLayout.technicalSpecs` 与 `specs` 同值 | 尚未取得这些数值适用的具体尺寸／结构范围和批次测量报告；不能承诺该精度直接等于成品分条公差，也不能加“所有产品均保证”。 |
| 52100、D2、M2 HSS、PM HSS（含 ASP23）、实心硬质合金及镶硬质合金；TiN／DLC／PTFE 可选 | 让客户按加工材料和现有磨损情况采购不同材料／表面选项；可讨论替换与升级配置的选择空间 | 现有材料、Optional Coatings 与应用字段；FAQ coating/geometry 问题 | 不能把材料名等同更长寿命，或承诺所有镀层适用所有基材。需确认工厂可提供的实际组合、材料批次与寿命比较数据。 |
| 剪切底环有工作切肩；razor-in-groove sleeve 有让刀槽／支撑结构 | 可作为两个不同供货配置说明，帮助客户把询价发到正确的零件，而不是把一张卡写成术语课程 | 原卡 `selection-3`；技术规格 `Razor sleeves`；FAQ 区分两种切法 | 当前主图／标准行主要展示何种配置仍应结合实拍确认。不能暗示一种环同时适配剪切和剃刀切割。若这是不同可售系列，后续是否独立入口属于业务决定。 |

上述五点中，优先讨论的是 **按图替换能力、锁紧选项和有明确尺寸要求的加工能力**。材料／涂层适合支撑选择价值；剪切与让刀槽的区别适合简短产品范围说明或已有 FAQ。是否将任一角度写成“优势”，需先确认买家收益与现有证据的对应关系。

## 13 款逐产品事实盘点

下表的字段路径均位于 `client/src/data/blades.ts` 对应 ID。现有尺寸、Item No.、规格、FAQ、图片和链接不属于本轮待改工程文案。

| 产品 ID | 已有可供表达的事实与定位 | 可探讨的采购价值（推论） | 证据位置／需要确认的边界 |
| --- | --- | --- | --- |
| `rotary-slitter-knives` | 旋转剪切或压切刀架；52100/D2/M2/ASP23/硬质合金；可选表面；孔径、刀身与刃型可按图 | 现有刀架替换、膜与胶带不同材料／表面选择、上下刀配套询价 | technicalSpecs 的 Material/Mounting/Optional Coatings；custom 与 knife-pair FAQ。低摩擦与积胶改善是条件性选择，不宜保证“不粘胶”。 |
| `rotary-slitter-knives-paper` | 纸用上／下刀及压切配对；钢、PM、镶硬质合金；Ra 0.2–0.4 μm；±0.002 mm；纸种范围 | 针对纸种的采购选项、明确刀对尺寸与表面要求、旧刀样件替换 | technicalSpecs、custom FAQ、dish-height FAQ。原灰尘／纤维解释保留在 FAQ，不应转成“无粉尘”优势。法兰和键槽下刀可保留原相关产品链接。 |
| `metal-foil-strip-slitter-knives` | 铜铝裸箔；镜面 Ra ≤0.02 μm；±0.001 mm 刀厚；plain/keyed bore；按图刀和隔套 | 成套考虑刀与隔套宽度、替换刀对和刀轴安装尺寸有采购意义 | technicalSpecs、custom knife/spacer FAQ。成品条宽由刀组等条件共同决定，不能把刀厚公差写成成品公差。未有 burr-free 结果证据。 |
| `metal-coil-slitting-knives` | D2/H13/PM HSS/硬质合金等；≤420 mm OD 的精度选项；刀、隔套、退料环、分隔盘 | 同一次采购协调刀组配件、材料选项覆盖不同载荷与磨耗 | technicalSpecs `Precision options` 明确适用范围；complete custom tooling stack FAQ。不能去掉 ≤420 mm 范围，也不能把所有钢种都写成同一硬度／寿命。 |
| `lithium-battery-slitting-knives` | 涂布正负极；WC-Co 牌号；上／下刀对；Ra ≤0.05 μm；DLC/TiN；±0.001 mm、T.I.R. ≤0.01 mm | 定制刀对、可选表面和明确几何要求可服务电极线替换采购 | technicalSpecs、custom pair FAQ。无零毛刺、零粉尘、避免短路或产线合格率证据；基材与涂层选项不能自动代表性能改善。 |
| `corrugated-slitter-scorer-blades` | 瓦线干端纵切；HIP 烧结硬质合金；整体／分体；孔／槽安装型式 | 可围绕现有刀站的结构和安装图提出替换选项 | technicalSpecs、custom mounting FAQ。OD 15–340 mm、约0.3 mm Edge Apex 是此前已标待核的既有规格，本轮不修改，不宜再强化为宣传数字。无研磨次数和寿命证据。 |
| `nonwoven-slitter-knives` | 15°–20°前角、25°–45°刃角；M2/D2/硬质合金/52100；PTFE/TiN/DLC/ESD；既有批次文件种类 | 材料／几何／表面可定制；批次文件可服务供应商资格审核 | technicalSpecs、custom coatings FAQ、documentation FAQ、原卡。速度、极低克重因果结论和绝对ESD效果未证实，见下文。不能由供应商文件推导医疗认证。 |
| `bottom-grooved-anvil-knives` | 槽／工作肩、NN/NG/NS/clamp、钢／硬质合金、现有精度值、shear/razor 两种结构 | 按已有刀轴和刀对订购替换环、有条件的材料与锁紧选项 | 详见上表；已认可的品牌描述不改。 |
| `tungsten-carbide-slitter-knives` | 实心盘或钢体硬质合金刃环；YG系列；0.4–0.8 μm细晶；单／双刃、空磨、razor profiles | 材质结构选择、不同应用刀型按图采购；磨耗与崩刃条件影响选项 | technicalSpecs、custom size与construction FAQ。牌号不等同，细晶非普遍最优；不得复制Bach 5X寿命，也不得把尺寸范围当任意组合。 |
| `slitter-rewinder-bottom-knives` | 杯形／双刃／可换刃环；法兰、键孔、平孔；钢、硬质合金／镶刃；镜面 | 老设备替换、保留原安装结构、下刀与保留上刀配合的采购支持 | technicalSpecs、older rewinder FAQ；原卡 regrind allowance。未取得通用可重磨次数，材料更换不是无条件升级。 |
| `corrugated-slotter-knives` | 平刃／锯齿弧形公刀、stitch-lap／corner；母刀两半与隔套；孔／沉孔／弧槽 | 单件与配套组件采购、按样件弧形／安装定制 | technicalSpecs、custom arc及male/female FAQ。不能与瓦线薄圆纵切刀混同；纸板类型与损伤图是服务输入，不是销售标题本身。 |
| `paper-straw-slitting-blades` | 已成形纸管的trim/cut-off；硬质合金/M2/zirconia；基于工位的涂层；按图孔／厚／刃型 | 为当前纸吸管切断工位购买替换刀与材料／表面选项 | technicalSpecs、custom drawing FAQ。胶料／毛边／压扁均属工况问题；无食品接触认证、普遍无毛边／不积胶承诺。 |
| `groove-bottom-knives` | 定制节距、工作刃位置、总宽；整体／分体；单／双工作肩；气胀轴平孔／实轴螺钉锁 | 将多切点布局作为一套定制采购、重复订单按同一轴向基准识别 | technicalSpecs、custom slit pattern和Item No. FAQ；DIENES Product Details。没有换刀时间或减少停机量化证据；pitch不能简单等同槽隙。 |

## Nonwoven 原工程声明的单独待核记录

以下为原始卡片已有文字摘录，不是本轮建议发布的销售成稿。该问题在 `commercial-seo-slitter-after-2026-11-16.md` 已记录。

1. 原 `rake-geometry`：`producing a clean, tight slit edge at line speeds up to 400 m/min`；另称纸／薄膜标准前角 `5°–10°`，并推导对非织造纤维的统一效果。需要具体材料、克重、速度、刀架、刃型与验收结果记录。现有技术表已列15°–20°前角，但不能仅凭这个角度保证切边和最高速度。
2. 原 `esd-coating`：`On meltblown layers (<15 GSM)` 与 `eliminating fibre attraction without requiring process speed reduction`。需要涂层电阻、接地条件、湿度／克重与实际工况对照；不能将可选ESD涂层直接宣传为普遍消除积纤。
3. 原 `medical-traceability`：M2钢厂证书、硬度试验、CMM报告按PO批次关联。已有文字可作为待核供货文件清单；若要承诺每批完整交付，仍需真实文件与履约流程。文件本身不等于医疗产品资格或认证。

## 外部术语复核

访问日期均为2026-11-16。Google 查询 `bottom grooved anvil knives replacement` 直接访问失败（工具返回 not accessible）；未取得Google当前SERP、PAA或搜索量。以下通过公开搜索／直接读取的成熟厂商页面用于术语与结构复核，不能称为Google排名实测。

| 来源 | 本次读取位置与用途 |
| --- | --- |
| [DIENES Grooved knives](https://www.dienes.de/en/products/bottom-knives/grooved-knives/) | Types及Different locking procedures，行46–70；NN/NG/NS对应关系、槽刀和安装方法。其性能、精度与质量承诺不转用。 |
| [TKM Bottom Slitter Knives](https://www.tkmgroup.com/en/bottom-slitter-knives) | 行31–57，纸机下刀、钢与镶硬质合金用语；不复制其表面与跳动数值。 |
| [DIENES Multi-Groove Bottom Circular Knives](https://www.dienesusa.com/products/circular-knives/shear-cut-knives/multi-groove-bottom-circular-knives/) | Product Details行71–80，多切点pitch、单／双刃、平孔／螺钉及分体结构；换刀速度属该厂家说明。 |
| [TOYO Metal foil, Film and Tape](https://en.toyoknife.co.jp/product/tape) | 行27–53，薄膜／胶带／箔材上／下刀与材料类别。支持词汇边界，非Sureay参数证明。 |
| [DIENES Battery foil / separator foil](https://www.dienes.de/en/explore/materials/battery-foil-separator-foil/) | Know-How行46–50，涂布电极多层材料与粉尘／磨耗问题；不扩大Sureay本页到所有separator工位。 |
| [DIENES Nonwoven and textile](https://www.dienes.de/en/explore/materials/nonwoven-and-textile/) | Know-How行46–50，非织造多种切法；不证明Sureay旧卡速度和ESD效果。 |
| [KAMADUR Corrugated blades](https://www.kamadur.com/produkte/Corrugated-blades/CONV0011/) | 行10–23，slotter/male名称、弧形及相关刀型；其按样件服务不单独作为Sureay能力证明。 |
| [Bach Carbide Rotary Knives](https://bachknives.com/products/carbide-products/carbide-rotary-slitter-knives/) | 行1–7，carbide rotary/shear/slitter名称、报价入口；明确不复制5X寿命或一体制造工序声明。 |
| [HMK Paper Straws](https://www.hmkltd.co.uk/paper-straws/) | 本次请求超时；沿用同日前审的词汇记录，不列为成功重读，不补新规格。 |

BHS Slitter Scorer 的工位与磨刀资料沿用同日前／后审报告，本次未重复读取。报告链接：`docs/seo-audits/commercial-seo-slitter-before-2026-11-16.md`、`docs/seo-audits/commercial-seo-slitter-after-2026-11-16.md`。

## 品牌段交付检查

- JSON覆盖13款，段落约33–38个英文单词，以具体替换／定制选项与询价服务为主；不增加全机型适配、原厂身份、库存、交期或寿命承诺。
- Bottom Grooved Anvil 的已认可品牌段与基线逐字一致。
- 其余12款采用产品独有配置：膜胶带刀架、纸刀配对、铜铝箔隔套、钢卷刀组、电极刀对、瓦线孔槽、非织造表面／文件、硬质合金构造、复卷下刀、开槽组件、纸吸管cut-off、多槽布局。
- `slitter-copy.json` **没有 components、componentsIntro 或成稿工程标题／描述字段**；未更改工作区应用源码。
