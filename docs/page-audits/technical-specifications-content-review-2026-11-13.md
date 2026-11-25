# 英文刀具 Technical Specifications 内容复查

后续纠正：2026-11-15 用户要求全面恢复遗漏的原尺寸和规格。下文部分“维持当前缺表”“未核实先不恢复”的历史执行记录不能作为删表授权。最终逐页处理、原值恢复和有效排除项以 [全目录恢复记录](catalog-specifications-restoration-2026-11-15.md) 为准。

日期：2026-11-13。触发：用户指出规格区缺乏面向买家的实质信息，原版本更有用。本轮只读核对全部 39 个现有英文刀具详情的数据与渲染规则，不修改产品页面、规格值、图片、URL 或语言文件。

## 结论与责任

问题成立，且跨品类。部分改版把材质、硬度、尺寸、结构和精度，改成了买家需要提交的资料或核对动作。比如 `Dimensions: Overall length × width × thickness` 只有参数名称，没有参数值；`Confirm holes or slots...` 是询价指导，不是产品规格。

此前把“避免把未核实信息写成保证”错误执行成“用索图提示代替原有产品信息”，再把版式、结构化数据一致性和代码测试通过当成内容验收通过。测试能证明这些文字被正确展示，不能证明它们对买家有用。既有规范没有要求用询价清单填充 Technical Specifications。

当前问题程度不同，不能再次统一覆盖：原七款 Shredder、Nonwoven Slitter、Steel Coil Slitter 等仍有实质参数。部分页面另有摘要与表格不一致的问题。新产品没有旧页可恢复；已纠正的鳄鱼剪定位不能回退成板材剪。

## 比较边界

- 当前有效字段：`detailLayout.technicalSpecs` 优先；否则为 `Sizes + specs` 或旧版 `specs`。原七款 Shredder 还经过 `getShredderDetailBlade` 转换。
- 历史比较：Git HEAD `9999a7c` 中的 `blades.ts`，该文件历史提交日期为 2026-09-08。它是可恢复的历史底稿，不代表全部字段都仍是用户最新批准的版本。后续任务单、尺寸确认和排除事项优先。
- 本轮没有重新认证历史公差、材料牌号、寿命或供货承诺；旧值不能因外部搜索未找到就判错，也不能因为曾经出现在旧页就把整组承诺机械恢复。
- 全部 39 款已覆盖：Slitter 13、Shredder（含 Granulator）8、Metal Shear 5、Paper Cutting 4、Log Saw 2、Other & Custom 5、Wood Chipper 2。

## 最直接的前后对照

| 页面 | 历史规格底稿 | 当前问题 | 修正方向 |
| --- | --- | --- | --- |
| Tissue Log Saw | 材质、刀径、轴向／刃口跳动、表面等参数 | `Mounting: Drive-pin holes or keyway and mounting-face details`、`Edge and sharpening: Bevel orientation, edge profile and sharpening-wheel setup` 只列核对主题；尺寸摘要重复 | 先用已确认六组尺寸给出刀径、内孔、厚度；材料和精度按历史记录及后续决定逐项处理。安装／磨削核对移到询价或 FAQ |
| Nonwoven Log Saw | D2、HRC 58–60、刀径范围、跳动等 | `Blade dimensions: Outer diameter, bore and thickness` 无值；`Part identification: Exact saw model, original part reference and drawing revision` 是订单资料 | 规格区不再用参数名解释参数名。历史内容按后续排除决定筛选；用户要求不写的工况、用途及照片涂层问题不能借恢复旧版重新加入 |
| Paper Guillotine | HSS／TCT 结构、硬度、刃角等 | `Identify the original edge construction...` 替代材料／结构说明；Dimensions 无值 | 保留已确认八行尺寸，摘要提供实际范围；恢复参数结构，把 Identify / Match 移走 |
| Scrap Chopper | 材质、硬度、刃口配置 | 七项中四项是 Identify / Confirm / Match 指令 | 保留六行尺寸及废边碎断定位；技术区写刀体／刃口实际选项，询价动作集中到 RFQ |
| Plastic Granulator | 钢号、HRC 58–62、刃角 30–55°、精度等历史字段 | 四项主要是工位及测量项目，无实质性能参数 | 从原资料逐项找回有用参数，不再以“提供图纸”代替；不可因此擅自重发已不在当前目录中的旧尺寸表 |

## 39 款逐页处理清单

以下为修正建议，尚未执行。所有已确认的 Item No. 和尺寸组合继续保留。

### Slitter：13 款

| 产品 slug | 判断与处理 |
| --- | --- |
| rotary-slitter-knives | 仍有 D2/M2 和上下刀尺寸。保留实际安装类型；将 matched by drawing 移至询价。旧精度／切法按现定位对照，不能把范围已调整的 Razor 等一并回退 |
| rotary-slitter-knives-paper | 上下刀尺寸和接口结构有用；回查原材料对应硬度、表面、公差的缺口，不增加空泛核对项 |
| metal-foil-strip-slitter-knives | 具体刀片与隔套尺寸可留；Slitting setup 仅说间隙随工况匹配，属于选型指导。旧硬度／精度待对照，不能用套话替代 |
| metal-coil-slitting-knives | 较好参考：按材料列硬度，按刀径限定厚度公差和平行度，保留这些边界；泛化 Standard series 可精简 |
| lithium-battery-slitting-knives | 保留实际硬质合金牌号及电极工位；旧硬度／精度／表面字段逐项回查，不恢复已收窄的隔膜用途 |
| corrugated-slitter-scorer-blades | 材料、厚度、接口有效；旧硬度／刃口需比对，不把整机速度或 Zero-crush 绝对效果机械恢复 |
| nonwoven-slitter-knives | 较好参考：尺寸、材质、硬度、公差、H7 接口、刃角均有信息。保留；不同材料硬度可写得更明确；旧 rake 与现 bevel 不能简单互换 |
| bottom-grooved-anvil-knives | 有尺寸、替换环、锁紧方式，不推倒重写；槽形和槽精度是待找回的有用信息 |
| tungsten-carbide-slitter-knives | `Confirm bore, holes, edge hand and support...` 移至 RFQ；细刃／韧性牌号的选择理由移 FAQ，规格写实际材料及适用参数 |
| slitter-rewinder-bottom-knives | 保留现有尺寸、cup／double edge／ring 结构；删减空泛 to drawing 尾句。旧“下刀总比上刀硬”不能直接恢复 |
| corrugated-slotter-knives | 具体半径、厚度、材料硬度与配对结构有效；没有同 slug 历史记录，不整体回退 |
| paper-straw-slitting-blades | 现刀径、厚度、材料有效；把已审配置的真实孔径带入摘要，按原表核对，不泛写 matched to drawing |
| groove-bottom-knives | 槽数、槽深、槽距等被写成索图清单；这是核心信息缺口。保留单体／分体及安装方式，回查实际可供槽参数及材质，不擅改已审刀径 |

### Shredder：8 款

| 产品 slug | 判断与处理 |
| --- | --- |
| twin-shaft-blades-recycling | 实际材料、硬度、厚度和孔型仍在。Claw Count 摘要 3 / 8 / 12 漏了尺寸表的 5-Claw，应同步摘要 |
| multi-shaft-blades-metal | 材料、硬度、厚度、hooks、接口均保留。仅精简不提供规格的修饰语，不删实值 |
| twin-shaft-blades-battery | 实际精度与硬度仍在；`±0.02 mm Thickness Parallelism` 的指标名称需厘清，先不改数值 |
| single-shaft-shredder-blades | 保留材料、硬度、公差、刃数、刀面与 M12–M24；Match bolt head 提示移出。不能把所有新配置都恢复为旧沉头结构 |
| single-shaft-bed-knives | 有实质参数。表列 279–3000 与旧单件能力 3500 的含义需要区分，不能不说明地并列 |
| tire-shredder-blades | 参数有效；3-Claw 摘要没有概括表内 1 / 3 / 5，应区分主配置和可选项 |
| shredder-screens | 孔径、板厚、筋宽、开孔率有效；Sizes Ø8–80 实为孔径，不能看起来像整张筛网尺寸，也不需要重复两次 |
| granulator-blades | 明显退化为识别与测量项目；以原有参数结构重新逐项核对，保留已确认分类归属 |

### Metal Shear：5 款

| 产品 slug | 判断与处理 |
| --- | --- |
| guillotine-shear-blades | 规格多为测量／订购提示。当前八行尺寸足以摘要长 508–1300、宽 63–100、厚 16–25 mm；材料、硬度等按原记录回查 |
| metal-shear-knives | 已是鳄鱼剪，五组配置与长 320–508、宽 64–70、厚 30–32 mm 保留；不恢复旧板材剪 6000 mm 等混合内容 |
| scrap-chopper-blades | Identify / Confirm / Match 移出；六行原尺寸对应长 100–400、宽 40–100、厚 15–30 mm。旧倍数韧性与寿命承诺不能顺带回滚 |
| stationary-scrap-shear-blades | 有实际尺寸、刀位和材料类型；Acceptance requirements／Operating data 移出规格。新品无旧页可恢复 |
| flying-shear-blades | Made to Drawing 合理；保留真实刀型与工位，Process data／维护提示移 FAQ 或询价，不能为凑行数造尺寸 |

### Paper Cutting：4 款

| 产品 slug | 判断与处理 |
| --- | --- |
| paper-cutting-blades | 重点恢复面向产品的参数结构。原八行 450–2050 mm 保留；材料／硬度／角度需按原记录和最新决定逐项比对，Identify / Match 移出 |
| three-knife-trimmer-blades | 六组十八行保留；现长 392–585、宽 90–115、厚 10–12 mm 有信息。机型序列号和污胶情况是订单／选型问题，不是规格 |
| paper-sheeter-knives | 保留径向／切向刀位、材料选项及六组配置；可摘要长 2230–2285、宽 32–60、厚 9.5–12 mm。Acceptance／Process 移出 |
| saddle-stitcher-trimmer-knives | 保留 DS 304 / Tempo 和前侧上下刀位、材料类型；表内长 280–400、宽 32–60、厚 8 或 15 mm 可直接摘要；Order data 移出 |

上述尺寸范围只是已列配置的包络，不能暗示长宽厚可任意搭配。具体组合由 Item No. 行决定。

### Log Saw：2 款

| 产品 slug | 判断与处理 |
| --- | --- |
| tissue-log-saw-blades | 五项中两项尺寸重复，安装／磨削项只有主题。先用六组已确认配置形成有效摘要，移走核对动作；未答复材料／涂层不自动追加 |
| nonwoven-log-saw-blades | 六项里多个仅列测量项目或订单输入；不能称为完整规格。按图定制可以是一项供货方式，不能替代所有属性；用户明确排除的用途、干湿工况和照片涂层话题不恢复、不重复提问 |

### Other & Custom：5 款；Wood Chipper：2 款

| 产品 slug | 判断与处理 |
| --- | --- |
| strand-pelletizer-rotors | Rotor geometry／Drive interface 只列项目；原材料、转子结构、齿数等有用字段应逐项找回，平衡／精度另核 |
| continuous-melt-filter-scraper-blades | Geometry 只有名词；规格应给刮刀本体材料、结构、尺寸。旧过滤盘硬度不能被搬回来当刮刀参数 |
| cutter-compactor-blades | 刀位有效，但不足以替代材料、刀型、刃形与尺寸；Geometry／Feedstock 泛化，逐项回查旧参数 |
| die-face-cutting-knives | 现有 45 × 25 mm 示例及十一张图纸提供了实际资料；可提炼明确结构和安装选项，但不把示例扩大为全系列标准 |
| special-shaped-blades | Quote inputs 明确是询价字段；定制产品可写真实材料、刃形、安装形式与加工范围，不需要虚构统一尺寸 |
| wood-chipper-blades | Dimensions／Edge 只有测量项，无钢材／硬度／刃角答案；原字段逐项对照，磨后余高测量移出规格 |
| wood-chipper-anvils | `Identify the usable faces...` 是动作；原长孔／垫片调节等结构比当前清单更有信息，优先找回实际结构与材料 |

## 可直接讨论的 Tissue 改写样例

以下仅使用用户已确认的六组尺寸，不引入材料、硬度、涂层或 OEM 映射。是审阅稿，尚未写入页面。

| Parameter | Specification |
| --- | --- |
| Outside diameter | 610, 680, 870 or 1000 mm |
| Bore diameter | 60, 68.26 or 82.55 mm |
| Body thickness | 3.80, 4.76 or 6.0 mm |
| Application | Tissue and kitchen towel log cutting |

尺寸组合说明：`Dimensions above summarize the six configurations below. Use the Item No. table for each complete OD × bore × thickness combination.`

此样例说明正确的写法，不代表该产品完整参数已补齐。相较当前抽象主题，它先回答可供什么；材料与精度从历史记录单独对照，不靠增加“请提供”的句子凑内容。

## 修正顺序与验收

1. 先对两款 Log Saw、Paper Guillotine、Guillotine、Scrap Chopper、Granulator 修正字段内容，再覆盖 Other / Wood，最后处理 Slitter / 原 Shredder 的局部缺口与摘要一致性。
2. 以原规格底稿和用户后续确认为依据，逐项标记保留、恢复、明确新值替代、用户要求排除、待确认。搜索缺失不是原值错误的证据。不得整页回滚，把用户已纠正内容带回来。
3. 一行规格应给实际值、明确选项或有边界的定制形式；非数字结构同样有价值。Identify / Confirm / Provide / Send 类动作放询价；选择理由放 FAQ／工程说明；不强制每页凑相同行数。
4. 人工内容验收与程序检查分开。买家能否从该区判断材料、尺寸、结构／安装及适用配置，逐产品检查；不适用或缺资料的项不靠泛话补齐。已确认尺寸组合、编号和范围必须一致。
5. 本轮只形成上述对照与修正建议，页面内容未改；无需用构建或测试结果冒充本轮内容修复完成。

## 2026-11-13 已授权修正及两项补充标准

本节为上述审阅稿之后的实施记录。用户先确认 Log Saw 写入并开始修正全部 Technical Specifications，随后明确要求：保留所有原有 Optional Coatings；技术区只保留一条 Sizes、删除其他重复尺寸介绍；Hero 优先使用 Sizes / Material / Application 三项。以下结果取代前文按多个尺寸字段展开的示例。

### 实际修改

- 已覆盖 39 个英文刀具产品对象。根据原目录底稿及后续确认，恢复适用材料、硬度、刃角、结构与精度；删除纯询价、测量、订单资料清单。保留已纠正的鳄鱼剪、废边碎断等工位，不整页回滚历史定位。
- 技术区每页保留一条 Sizes。Paper Slitter 的 Dished top knives / Flat top knives / Bottom knives 等重复尺寸行已删除，其他产品重复的外径、孔径、厚度和宽度条目同步精简。筛网写为 Sizes: Apertures 8–80 mm，板厚与筋宽留在原配置表。公差、刃角、材料晶粒、槽距等独立技术指标保留。
- Optional Coatings 保留并统一字段名：Film、Battery Slitter、Nonwoven Slitter、Grooved Anvil、Carbide、Paper Straw、两款 Log Saw、Battery Shredder、Melt Filter。只恢复原目录／本轮开始时已有的选项；镜面和粗糙度仍列为表面质量。
- Tissue 的六组配置及 SR005101–106 不变；技术区为 Sizes Ø610–1000 mm、原材料 D2 / Cr12MoV / M2、原可选 hard chrome / PTFE / TiN 和用途。具体内孔与厚度继续在原表中。此次新增保留材料与涂层依据用户的恢复原规格及保留 Optional Coatings 指示。
- Nonwoven 恢复原目录 D2、58–60 HRC、Ø350–700 mm、原跳动值和 TiN PVD / hard chrome / uncoated 选项，Hero 和卡片刀径同步到该原范围；没有新增标准配置表。可选涂层不用于解释照片外观，没有恢复用户排除的干湿工况、Femcare / Adult Incontinence 等内容。
- 英文 Hero 通过共享组件统一优先显示 Sizes → Material → Application，材料取当前实际规格，应用保留简短表达。38 款资料可支持三项；Battery Shredder 原记录没有明确材料牌号，因此保留 Sizes / Application 两项，不编造材质。筛网孔径在首屏明确标注 Apertures。
- 原有产品名称、URL、图片、全部标准尺寸行与 Item No.、品牌／工程／FAQ 保持本轮开始时的状态。未生成、编辑其他语言文件；共享 Hero 的新规则仅在英文启用。

### 保留的内部待核项

1. Battery Shredder 原 `±0.02 mm Thickness Parallelism`：未自行判定为厚度公差还是平行度，数值和原定义暂保留；材料牌号待后续产品资料补齐。
2. Wood Chipper Anvil 原 `Parallelism ±0.05 mm`：指标写法待厘清，未擅改成新的公差定义。
3. 本轮恢复原目录记录，不新增寿命倍数、零缺陷、整机速度、全型号适配或未记录的涂层承诺。

### 验收

- 人工逐项对照 39 款当前有效规格，检查参数属于当前刀型、询价指令已移出、Sizes 不重复、Optional Coatings 保留；该项独立于程序测试。
- 类型检查通过；42 项目录／迁移测试通过。新增检查覆盖 Tissue 尺寸摘要与原表范围一致、旧涂层字段保留、单条 Sizes、禁止把纯询价命令及空尺寸标题当作规格。
- 对象基线对照确认所有原尺寸组合、编号、产品名称、图片、URL、FAQ、品牌和工程区未改。其他语言文件哈希核对不变。
- 最终浏览器检查覆盖 39 页 × 1440 / 390 px，共 78 次：实际规格与当前数据、Product 结构化数据逐项一致；38 款 Hero 为 Sizes / Material / Application，Battery Shredder 为 Sizes / Application；无整页横向溢出或页面错误。另实看 Tissue 首屏及纸刀手机技术区截图，三项首屏与具体参数可正常阅读。未运行翻译、全量生产构建或发布。
