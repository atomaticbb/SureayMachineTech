# Slitter 13 款：Engineering Advantages 与 Technical FAQs 修订计划

初稿：2026-11-16；本版修订：**2026-11-17**。状态：**供用户审核的内容方案；只改文档，不改页面或原规格。** 本版替代旧稿“每页先凑 8 题”的做法。旧稿已完整存入[审计归档](evidence/slitter-advantages-faq-2026-11-17/plan-before-review.md)。

## 本次修正与阅读方法

Claude 对尾部通用题、标记不足、泛化价值与来源可回查性的批评成立。本版删除/合并同质候选，把真正未知的企业承诺单独放入 HOLD。一般验收、试切比较、重磨条件本身可以回答，不因 Sureay 尚未提供服务证明而一律停用。多页出现材料主题也不自动证明搜索词蚕食：优势介绍供货，FAQ解释该基材/刀位下的选择条件，各自必须有独立信息。

- **39 条优势**均有英文标题、具体可供内容和证据标记；不是最终英文长段落。三张优先样页的英文一句话说明见[本次审核回应与样稿](slitter-claude-audit-response-2026-11-17.md)。
- **每页 6–7 条活跃 FAQ**，是当前有内容可答的正文计划；不预留固定“第 8 题”。未来只有独立采购需求和事实齐全时才增加到 8 题。
- 现有 **82 条 FAQ** 的有用信息全部保留或合并；每行“原 Q”指文末当前目录索引。被移走的大多是昨日新加候选，不能把它们说成从网站删掉的问题。
- 原尺寸、Optional Coatings 和材料参数在代码中保持。存在争议的值在方案中标注，不用另一厂商的牌号表替换 Sureay 参数，也不把原值提升为新的性能保证。

### 每行证据与状态如何读

证据是**来源类型**，不是“已获工厂认证”的等级。各产品节的 C 均指[持久目录快照](evidence/slitter-advantages-faq-2026-11-17/catalog-evidence.json)中该 `id`；后面的字段/原 Q 是稳定定位，运行中的唯一数据源仍为 `client/src/data/blades.ts`。

| 标记 | 含义 | 本版允许支持的内容 |
| --- | --- | --- |
| C | 当前目录：本产品 `specs`、`detailLayout.technicalSpecs`、`standardDimensions` 或 `faqs.technical` | 已有配置/材料/尺寸/供货描述，不能据此推导每批报告、收益百分比 |
| L | Sureay 线上历史内容，按产品 ID＋Engineering Advantages 等区块定位 | 原卖点主题与前后差异；不自动确认旧效果、库存和试样承诺 |
| P | 原厂/成熟刀厂/材料厂资料，来源代号见文末 | 行业原理、术语、材料或维护边界；不能证明 Sureay 有同样工艺/服务 |
| U | 缺少对应公司凭据或存在未解冲突 | 只进入 HOLD 登记；不进入拟议页面描述 |
| DRAFT-ready | **可进入英文草稿并由用户审阅** | 不是上线许可，不代表 C 已升级为工厂实测证明；仅限本行明确的内容范围 |
| HOLD | 该项具体主张暂不进入成稿 | 只拦对应数字/服务/效果，不拖住同条中有依据的产品主题 |

优势表的“暂缓主张”属于 U/HOLD，不能与同一行 DRAFT-ready 的标题及拟写内容混为一个承诺。FAQ 活跃表每一行明确状态，商务服务另表登记，不藏在答案末尾。

### FAQ 排序依据

**P1＝本页先要解决的替换对象、关键刀材或配套采购决定；P2＝随后影响质量判断、配置细化和替换选择的问题；P3＝次级名称解释或维护延伸。** 同级按本页采购流程排序，每行注明决定类型。某页以材料选择进入采购、另一页以孔型识别进入，并不要求全站同一种题永远排第一。排序是本轮编辑判断，参考现有 GSC 查询意图和原厂用词，**不是 Google 搜索量/PAA 排名**。原 GSC 期间为2026-10-17至11-13；本轮未取得新的搜索量或可读 PAA。

优势与 FAQ 可以共享同一事实，但表达不能复制：优势说“提供哪种具体配置”；FAQ须给判断条件/例外，不能再抄一遍钢号清单，也不能只说“见上方”。本版 P1/P2/P3 标记是内部选题依据，不加到网站上。

## 活跃题数与页面分工

| 页面 | 活跃题 | 主要采购意图 |
| --- | ---: | --- |
| [Film & Tape Slitter Knives](http://localhost:5173/products/rotary-slitter-knives) | 7 | film/tape slitter knives、replacement rotary shear/crush knives |
| [Paper Slitter Knives](http://localhost:5173/products/rotary-slitter-knives-paper) | 7 | paper slitter blades、dished/top/male knives、纸卷上下刀配对 |
| [Slitter Knives for Copper & Aluminum Foil](http://localhost:5173/products/metal-foil-strip-slitter-knives) | 6 | bare copper/aluminum foil slitter knives |
| [Steel Coil Slitting Knives](http://localhost:5173/products/metal-coil-slitting-knives) | 7 | steel coil slitting knives、replacement rotary shear tooling、knife/spacer/stripper sets |
| [Battery Slitting Knives](http://localhost:5173/products/lithium-battery-slitting-knives) | 7 | coated anode/cathode electrode slitting knife pairs |
| [Corrugated Board Slitter Blades](http://localhost:5173/products/corrugated-slitter-scorer-blades) | 7 | corrugator dry-end thin blades、BHS/Fosber replacement slitter knives |
| [Nonwoven Slitter Knives](http://localhost:5173/products/nonwoven-slitter-knives) | 7 | nonwoven fabric slitting knives，spunbond/meltblown/SMS 与纤维切边 |
| [Bottom Grooved Anvil Knives](http://localhost:5173/products/bottom-grooved-anvil-knives) | 7 | 单个底环槽形／工作肩、NN/NG/NS 锁紧替换 |
| [Tungsten Carbide Slitter Knives](http://localhost:5173/products/tungsten-carbide-slitter-knives) | 7 | carbide slitter knives、solid vs tipped、grade/construction |
| [Slitter Rewinder Bottom Knives](http://localhost:5173/products/slitter-rewinder-bottom-knives) | 6 | rewinder bottom bands/lower/female knives、杯形／法兰／可换刃环替换 |
| [Corrugated Slotter Knives](http://localhost:5173/products/corrugated-slotter-knives) | 7 | printer-slotter/flexo folder-gluer male/female slotter knives、弧刀和配套垫圈 |
| [Paper Straw Cutting Blades](http://localhost:5173/products/paper-straw-slitting-blades) | 6 | 成形纸吸管的cut-off/trimming circular knives |
| [Multi-Groove Bottom Knives](http://localhost:5173/products/groove-bottom-knives) | 7 | multi-groove bottom knife blocks/MKB、custom pitch/slit pattern |

合计 **88 条活跃题**；原稿104个候选不再作为数量目标。

三类底刀的边界：**Anvil＝单件槽形/工作肩与锁紧；Rewinder Bottom＝复卷机下刀法兰、杯形/双刃/可换环；Multi-Groove＝多个切点坐标与节距布局。** 跨页只保留足够的分流说明及准确链接，不在三页都重讲“单槽对多槽”。不能把一个环简单等同一个槽。

## 线上覆盖与可回查依据

11月16日仅直接对比5页的限制是真实的，不能声称旧稿完成13页线上原文恢复核对。本次逐页访问结果、原优势标题/区块及材料核对统一记录在[线上与材料核对记录](evidence/slitter-advantages-faq-2026-11-17/live-and-material-check.md)。本轮13个当前路径均已核查：12页取得对应优势原文，Corrugated Slotter返回404且区块为NOT FOUND。下文供货依据优先用 C，L 只提供原销售主题。

研究原理来源继续引用已保存的[13页关键词前审](../seo-audits/commercial-seo-slitter-before-2026-11-16.md)及文末 P 目录，标明旧研究与本轮复读范围；不用 Temp 文件或容易漂移的源码行号作为唯一凭据。

## 01 Film & Tape Slitter Knives

`rotary-slitter-knives` · 主意图：film/tape slitter knives、replacement rotary shear/crush knives。与 Paper、裸箔和硬质合金材料页分工，不以 rotary slitter 泛词吞并它们。

**当前问题：**三条均为操作建议，与原 Q1、Q4、Q6 重叠。**选题症状（非已统计客诉）：**胶料积聚、刃口磨钝、局部崩口、切边拉伸／不齐。

**证据定位：C＝`rotary-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-TOYO、P-DIENES-guide。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Application-Matched Steel and Carbide Options**／膜与胶带的材料配置 | 目录列 52100、D2、M2、PM HSS 与硬质合金；同一替换项目可按实际磨耗与冲击需求指定刀材，不只购买一种通用钢圆片。 | C：`detailLayout.technicalSpecs[Material]`。**DRAFT-ready** | **U / HOLD H1**：各钢种实际热处理方式、硬度范围；不新增统一深冷工艺 |
| 2. **Precision-Ground Edges and Optional Coatings**／精磨工作刃与可选涂层 | 目录已有刀厚/跳动指标及 TiN、DLC、PTFE 等选项；客户可把几何和接触面配置写入同一刀图与订单，比较有明确内容的替换方案。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`；`detailLayout.technicalSpecs[Optional Coatings]`。**DRAFT-ready** | **U / HOLD H2/H3/H8**：公差适用尺寸；镀层／基材组合；降低积胶比例及连续运行小时数 |
| 3. **Custom Replacement Knives and Matched Pairs**／定制替换刀与配对供应 | 现有定制 FAQ 明确孔、截面、安装和刃型；客户可采购所需单件，也可把上刀与下刀放在同一询价中，分别定义尺寸和数量。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2；`faqs.technical` Q7。**DRAFT-ready** | **U / HOLD H2/H8**：成套检验的实际项目；不能承诺所有品牌无需调整 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | Which replacement knife fits my film or tape slitter? | 合并 Q1＋Q4；吸收 Q3 | 先区分 rotary shear 与 crush 工位，再说明刀架、孔型和轴向位置。blade/knife 是采购别称，film/tape 不是互换保证。 | C：`faqs.technical` Q1,Q3,Q4；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 2 / P1 · 选材/表面决定 | When is a harder knife material worth considering for abrasive films? | 新增，选材取舍；与优势1分工 | 回答持续磨耗与偶发崩口应分别处理：耐磨升级须同时考虑填料、接触和冲击；不重列全部钢号，不给唯一钢号或寿命排名。材料页负责构造/牌号通用比较。 | C：`specs` / 相关原技术问答；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | Why does adhesive build up on tape slitter knives? | 调整 Q6 | 回答胶黏剂、接触面与切削设置都可能参与；解释 PTFE/DLC 等选择条件，不能保证零积胶。 | C：`faqs.technical` Q6；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why does a film slitter knife chip or wear out quickly? | 新增，故障 | 区分渐进磨耗、边缘接触／冲击与积胶，说明材料与刀对状态各影响什么；不凭照片承诺唯一根因。 | C：`specs` / 相关原技术问答；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 5 / P2 · 接口/验收定义 | How do blade thickness, bore and dish height affect replacement fit? | 保留 Q5 主题 | 明确刀身厚度与总碟高不同；与配合刀定位相关，不重复完整尺寸表。 | C：`faqs.technical` Q5；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | Should I replace both the top and bottom slitter knives? | 保留 Q7 | 单件采购可行的前提是保留件仍可用；新刀对按上下刀分别定义，带出配套采购价值。 | C：`faqs.technical` Q7；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |
| 7 / P2 · 供货/配套决定 | Can Sureay make custom film slitter knives from a drawing or sample? | 保留 Q2，销售化答案 | 先明确现有可定制孔、截面、安装和工作刃；旧样磨损与目标新尺寸分开，报价资料放答案末尾。 | C：`faqs.technical` Q2；P：P-TOYO / P-DIENES-guide。**DRAFT-ready** |

**内链分工：**[Paper](http://localhost:5173/products/rotary-slitter-knives-paper)；[Carbide构造](http://localhost:5173/products/tungsten-carbide-slitter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 02 Paper Slitter Knives

`rotary-slitter-knives-paper` · 主意图：paper slitter blades、dished/top/male knives、纸卷上下刀配对。区别堆纸裁切刀和以法兰／杯形安装为主的 Rewinder Bottom 页。

**当前问题：**纸种、磨削、碟高被写成操作步骤。**选题症状（非已统计客诉）：**纸粉、切边拉毛、上下刀崩口、重磨后配合改变。

**证据定位：C＝`rotary-slitter-knives-paper`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-TKM-top、P-TKM-life。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Material Options for Paper Converting**／纸张加工的材料选项 | 目录有工具钢、高速钢与硬质合金构造；替换订单可保留原材料，也可就涂布/再生纸磨耗提出不同刃材配置。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Hardness]`。**DRAFT-ready** | **U / HOLD H1/H8**：热处理工艺与批次硬度范围；原“40–60% 寿命提升”不直接恢复 |
| 2. **Precision-Ground Thickness and Cutting Faces**／刀厚与切削面的精磨配置 | 目录已有刀厚与表面要求；刀体截面、工作面和碟形总高分别定义，买家能按原装配采购明确的几何配置，而非把碟高误作刀厚。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Surface finish]`；`detailLayout.technicalSpecs[Runout]`。**DRAFT-ready** | **U / HOLD H2/H8**：精度适用配置、配对检验方式；不能把刀具精度写成无纸粉保证 |
| 3. **Custom Top and Bottom Knife Sets**／定制上下刀组 | 上刀及下刀现有配置可按图/旧样报价；同一询价分别列上下刀图号、配合要求和数量，服务单件补换或成对采购。 | C：`detailLayout.technicalSpecs[Mounting]`；`detailLayout.technicalSpecs[Cutting Styles]`；`faqs.technical` Q1；`faqs.technical` Q3；`faqs.technical` Q7。**DRAFT-ready** | **U / HOLD H8**：原网页列出的全部锁紧／刃角是否均实际提供，不扩大当前目录 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | Can Sureay reproduce paper slitter knives for my existing rewinder? | 合并 Q1＋Q3 | 先说明按图／旧样定制能力；涉及下刀法兰、杯形时自然链接 Rewinder Bottom，避免全机型承诺。 | C：`faqs.technical` Q1,Q3；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 2 / P1 · 选材/表面决定 | When do coated or filled papers justify HSS or carbide slitter knives? | 调整原 Q6 | 围绕涂布/填料造成的磨耗与现有重磨安排回答升级条件，再指出冲击/刀对问题可能需要不同处理；不复述优势1的完整材料清单。 | C：`faqs.technical` Q6；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | What causes paper dust or ragged edges during slitting? | 调整 Q5 | 刃口、重叠、侧压／配合与纸料共同影响；引用 TKM 的多因素逻辑，不给通用间隙数字。 | C：`faqs.technical` Q5；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 4 / P2 · 替换识别 | Must top and bottom paper slitter knives be replaced together? | 保留 Q7 | 答单件／配对两类采购条件；上下刀磨损和材料组合都需考虑。 | C：`faqs.technical` Q7；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 5 / P2 · 名称/结构识别 | Are dished knives, top knives and male knives the same part? | 保留 Q2 | 解释形状、位置、配对名称的差别；真实别名自然覆盖，不能把全部上刀说成同一规格。 | C：`faqs.technical` Q2；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 6 / P2 · 接口/验收定义 | Why are blade thickness and dish height listed separately? | 保留 Q4 | 解释轴向截面与碟形总高，保留原尺寸含义，不引入重复规格段。 | C：`faqs.technical` Q4；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |
| 7 / P3 · 维护条件 | When should paper slitter knives be reground or replaced? | 新增，维护 | 以切边、刃口、重磨余量和允许工作直径判断；实际最小尺寸由刀图／机型定义，不承诺固定次数或小时。 | C：`specs` / 相关原技术问答；P：P-TKM-top / P-TKM-life。**DRAFT-ready** |

**内链分工：**[Rewinder Bottom](http://localhost:5173/products/slitter-rewinder-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 03 Copper & Aluminum Foil Slitter Knives

`metal-foil-strip-slitter-knives` · 主意图：bare copper/aluminum foil slitter knives。涂布电极交由 Battery 页，厚钢卷交由 Coil 页。

**当前问题：**三卡都在教设置或检查，已有加工及刀／隔套供应价值没有表达。**选题症状（非已统计客诉）：**毛刺、边部变形、刀口磨钝／崩口、刀组累计宽度偏差。

**证据定位：C＝`metal-foil-strip-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-TOYO、P-BACH。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Tool Steel and Carbide Options for Metal Foil**／铜铝箔材料配置 | 现有 D2、D3、M2、PM HSS 和 WC-Co 可作为不同订单选项；裸箔的厚度、硬度状态与实际刃损决定比较对象，ASP 历史写法在 H6 单独核对。 | C：`detailLayout.technicalSpecs[Material]`。**DRAFT-ready** | **U / HOLD H1/H6**：钢材热处理及各牌号适用硬度，不把 PM 硬度套给所有材料 |
| 2. **Precision-Ground Knife Faces for Foil Tooling**／薄箔刀具的精磨面 | 原目录有 ±0.001 mm 刀厚、Ra≤0.02 μm 与跳动指标；替换采购可沿用现有刀组的刀厚与端面要求，不把单刀精度说成成品条宽保证。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`；`detailLayout.technicalSpecs[Surface finish]`。**DRAFT-ready** | **U / HOLD H2/H8**：工厂检验样例与规格范围；不等于成品条宽精度或零毛刺 |
| 3. **Custom Knives and Matching Spacers**／刀片与配套隔套 | 原 Q2 已有刀片/隔套按图供货；买家可一并报刀轴布局、各件轴向宽度和数量，明确新购与保留零件。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2。**DRAFT-ready** | **U / HOLD H2**：配套项目、组内宽度检验范围；不扩大成整条设备改造 |

**Technical FAQs：6 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 供货/配套决定 | How do I specify custom replacement foil knives and matching spacers? | 合并原 Q1＋Q2＋Q4 | 说明刀轴接口、OD/ID/轴向宽度以及刀与隔套排列；W 是零件轴向宽度，不等于成品带宽。原定制、隔套、数量与图样资料一并保留。 | C：`faqs.technical` Q1,Q2,Q4；P：P-TOYO / P-BACH。**DRAFT-ready** |
| 2 / P1 · 选材/表面决定 | How do foil gauge and edge damage affect the choice of steel or carbide? | 调整原 Q5 | 按箔材厚度/状态、渐进磨耗与崩口比较，解释材料选择的条件；不重复牌号清单或承诺单换硬质合金消除毛刺。 | C：`faqs.technical` Q5；P：P-TOYO / P-BACH。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | What can cause burrs on slit copper or aluminum foil? | 保留 Q6 | 刀口磨损、间隙／重叠及设备条件先区分；避免承诺单换材料必然消除毛刺。 | C：`faqs.technical` Q6；P：P-TOYO / P-BACH。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why can slit widths vary even when individual knives are accurate? | 新增，吸收原工程卡 | 用刀／隔套累计宽度和基准解释；刀厚精度不直接等于最终条宽，不新增公差。 | C：`specs` / 相关原技术问答；P：P-TOYO / P-BACH。**DRAFT-ready** |
| 5 / P2 · 替换识别 | Are bare-foil knives and coated battery electrode knives interchangeable? | 保留 Q3 | 解释涂层结构与刀位差异，正确引导 Battery 页，不将电极污染内容强塞本页。 | C：`faqs.technical` Q3；P：P-TOYO / P-BACH。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | When should foil knives and spacers be replaced as a set? | 原 Q2 的配套供货信息；与本版第1题分工 | 依据保留刀/隔套的尺寸与磨损判断仅补换所需件或采购配套组合；定制识别归第1题，本题回答换哪些件。不会承诺所有隔套均可与任何旧刀混用。 | C：`faqs.technical` Q2；P：P-TOYO / P-BACH。**DRAFT-ready** |

**内链分工：**[Electrode](http://localhost:5173/products/lithium-battery-slitting-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 04 Steel Coil Slitting Knives

`metal-coil-slitting-knives` · 主意图：steel coil slitting knives、replacement rotary shear tooling、knife/spacer/stripper sets。与直刀横剪和废边碎断刀分工。

**当前问题：**以选择载荷、配公差、支撑带材代替具体供货能力。**选题症状（非已统计客诉）：**刃口崩口、渐进磨耗、毛刺不一致、刀组宽度偏差／带材划伤。

**证据定位：C＝`metal-coil-slitting-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-ASKO、P-BACH。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel Grades for Different Coil Loads**／按钢卷负载配置刀材 | D2、H13、PM 钢等已有选项，使磨耗和冲击取向不同的刀材可在同一采购要求下比较；不以最高硬度作为统一卖点。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Typical hardness]`。**DRAFT-ready** | **U / HOLD H1**：不同材料热处理记录；不写单一材料全面优于其他材料 |
| 2. **Ground Dimensions for Knife and Spacer Stacks**／刀片与隔套组的磨削尺寸 | 原目录对 OD≤420 mm 配置列出精度选项；订货可明确刀片及配套件各自的轴向尺寸，避免把单件公差误作整组保证。 | C：`detailLayout.technicalSpecs[Precision options]`。**DRAFT-ready** | **U / HOLD H2**：超出范围按图；不能把这组公差覆盖全部 OD80–680 mm |
| 3. **Slitting Knives with Companion Tooling**／刀片及相邻刀组零件 | 隔套、退料环、分隔盘已有供货资料；客户可以按现有堆叠布局列出所需件，不必把整组采购仅描述为一片圆刀。 | C：`detailLayout.technicalSpecs[Tooling]`；`faqs.technical` Q2。**DRAFT-ready** | **U / HOLD H2/H8**：实际成套检验／编号和供应边界；不承诺无调整安装 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 选材/表面决定 | What identifies a replacement steel coil slitting knife? | 保留 Q1；吸收 Q3 名称 | 圆盘纵切刀的 bore/width/arbor；rotary shear 名称放答案，并与横剪／废边碎断区分。 | C：`faqs.technical` Q1,Q3；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 2 / P1 · 选材/表面决定 | How do coil strength and blade damage affect knife material selection? | 调整原 Q4 | 将钢卷强度/厚度、渐进磨耗和崩口区分，回答何时重视抗冲击或耐磨；不复写优势1的钢号表。 | C：`faqs.technical` Q4；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | Why do coil slitting knives chip instead of wearing gradually? | 新增，故障 | 负荷、刃口配合和材料韧性是候选因素；答案先区分损伤形态，不保证照片诊断。 | C：`specs` / 相关原技术问答；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | What causes burrs or uneven slit edges on a coil line? | 保留 Q6 | 比较磨损、间隙、重叠、刀轴与料变更，明确刀具／整机因素。 | C：`faqs.technical` Q6；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 5 / P2 · 替换识别 | How should knife and spacer tolerances be specified for a complete stack? | 调整 Q5 | 个体宽度与累计要求分别定；现有精度选项保留 OD≤420 mm 条件。 | C：`faqs.technical` Q5；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | Can Sureay supply knives, spacers, stripper rings and separator discs together? | 保留 Q2 | 直接答目录已有四类配套件，并说明按实际刀组配置报价，不承诺未知附件。 | C：`faqs.technical` Q2；P：P-ASKO / P-BACH。**DRAFT-ready** |
| 7 / P2 · 选材/表面决定 | How do I compare the cost of different coil slitter knife materials? | 新增，采购 | 对比单价、实际磨耗、可重磨余量与停线成本；提出客户可用的比较因素，不写“最低成本”或寿命倍率。 | C：`specs` / 相关原技术问答；P：P-ASKO / P-BACH。**DRAFT-ready** |

**内链分工：**[Scrap Chopper](http://localhost:5173/products/scrap-chopper-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 05 Battery Electrode Slitting Knives

`lithium-battery-slitting-knives` · 主意图：coated anode/cathode electrode slitting knife pairs。避免把裸箔、隔膜及电池回收刀混在同一页。

**当前问题：**三卡是描述电极、匹配刀对、检查切边。**选题症状（非已统计客诉）：**毛刺、涂层掉粉／边部损伤、微崩口、上下刀配合不稳定。

**证据定位：C＝`lithium-battery-slitting-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-DIENES-battery。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide Configurations for Coated Electrodes**／涂布电极的硬质合金配置 | 目录明确 WC-Co 与电极刀位，可按实际牌号/构造提出替换要求；本候选不再使用覆盖四个 YG 牌号的统一 91–93 HRA。原规格保持，牌号对应硬度进入 H6。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Electrode grades]`。**DRAFT-ready** | **U / HOLD H6**：四个牌号与91–93 HRA的对应关系；不新增统一硬度结论。 |
| 2. **Ground Cutting Faces and Optional DLC or TiN**／精磨刀面与 DLC/TiN 选项 | 现有镜面、刀厚与跳动要求，以及 DLC/TiN 可选项，可作为电极刀对的具体订单配置；刀具指标与客户毛刺/掉粉验收分别定义。 | C：`detailLayout.technicalSpecs[Edge finish]`；`detailLayout.technicalSpecs[Optional Coatings]`；`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`。**DRAFT-ready** | **U / HOLD H2/H3/H8**：不把数值等同毛刺高度、零掉粉或电芯安全保证 |
| 3. **Upper and Lower Knives for Electrode Stations**／电极工位上下刀供应 | 现有 Mounting 与定制 FAQ 支持按工位定义上、下刀；客户可以询价配对替换，也可以保留可用件、采购所需刀位。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2；`faqs.technical` Q4。**DRAFT-ready** | **U / HOLD H2/H8**：刀对检验和配套标识；不延伸为整机良率保证 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | How do I identify a replacement upper and lower electrode knife pair? | 保留 Q1 | 刀位、轴向尺寸、内孔和配合刀明确；与仅看外径或品牌区别。 | C：`faqs.technical` Q1；P：P-DIENES-battery。**DRAFT-ready** |
| 2 / P1 · 失效/质量判断 | How do wear and micro-chipping affect carbide selection for coated electrodes? | 将原 Q6 材料部分独立 | 解释磨耗与微崩口对应不同材料/刃口取舍，保持原刀位及涂布结构比较。暂不以 YG 名称推导统一硬度或最佳排名；四牌号硬度对应归 H6。 | C：`faqs.technical` Q6；P：P-DIENES-battery。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | What can cause burrs, dust or coating damage at the electrode edge? | 保留 Q5 | 给刀刃、刀对设置及料层等条件性解释，不推广未经证实的毛刺阈值。 | C：`faqs.technical` Q5；P：P-DIENES-battery。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why does a carbide electrode knife develop micro-chips? | 新增，故障 | 讨论刃口接触、支撑／安装及材料构造；不要把所有碎裂归为牌号选错。 | C：`specs` / 相关原技术问答；P：P-DIENES-battery。**DRAFT-ready** |
| 5 / P2 · 选材/表面决定 | When are DLC or TiN coatings worth considering? | Q6 表面部分拆出 | 涂层与基体分别定义；当前可选 DLC/TiN，不写两者必然降低粉尘或替代刃型调整。 | C：`faqs.technical` Q6；P：P-DIENES-battery。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | Can Sureay supply a custom knife pair or replace only the upper knife? | 合并 Q2＋Q4 | 两类采购都可讨论；保留件尺寸与状态明确后按当前工位供货，避免强推整套。 | C：`faqs.technical` Q2,Q4；P：P-DIENES-battery。**DRAFT-ready** |
| 7 / P3 · 名称/结构识别 | Are electrode slitter knives the same as bare copper or aluminum foil knives? | 保留 Q3 | 以涂布与裸箔工况区分，链接裸箔页；不扩张隔膜范围。 | C：`faqs.technical` Q3；P：P-DIENES-battery。**DRAFT-ready** |

**内链分工：**[裸箔](http://localhost:5173/products/metal-foil-strip-slitter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 06 Corrugated Slitter-Scorer Blades

`corrugated-slitter-scorer-blades` · 主意图：corrugator dry-end thin blades、BHS/Fosber replacement slitter knives。不是压线轮，也不是下游开槽弧刀。

**当前问题：**安装孔、磨刀站、工位识别都属于 FAQ。**选题症状（非已统计客诉）：**切边起毛、薄刀崩口、磨刀后切边恶化、孔型或刃位不符。

**证据定位：C＝`corrugated-slitter-scorer-blades`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-BHS、P-KAMADUR-razor。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide Material Options for Corrugator Slitting**／瓦线纵切用硬质合金选项 | 目录列 WC-Co 系列；客户可提交原刀牌号与板材条件确定替换配置。HIP 属历史目录声明，未经工艺核实不作为自有制造优势。 | C：`detailLayout.technicalSpecs[Material]`。**DRAFT-ready** | **U / HOLD H1/H6**：HIP 为目录已有，需工艺／供应记录后才提升成工厂核心能力；不加淬火 |
| 2. **Solid and Split Blade Constructions**／整体与分体薄刀结构 | 现有 Blade options 明确 solid disc / split construction；买家可按原刀站订购对应刀体结构。本条已有具体可交付内容，不依赖待核 OD 或 Edge Apex 数值。 | C：`detailLayout.technicalSpecs[Blade options]`。**DRAFT-ready** | **U / HOLD H7**：OD15–340与原尺寸表、约0.3 mm Edge Apex 的含义；新卖点不引用二者。 |
| 3. **Custom Bores and Mounting Patterns**／定制内孔与安装孔槽 | Mounting 明确平孔、固定孔阵与槽式安装；按原刀图定义接口，客户可以就特定刀站采购替换件，不据 BHS/Fosber 名称宣称互换。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q3。**DRAFT-ready** | **U / HOLD H8**：不仅凭 BHS/Fosber 品牌写通配；各分体结构适配待图纸 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | How do I identify the correct replacement corrugator slitter blade? | 保留 Q1 | 机型、孔型、刃位和磨刀系统共同识别；不引入待核尺寸范围。 | C：`faqs.technical` Q1；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 2 / P1 · 替换识别 | Do BHS and Fosber slitter blades interchange? | 保留原 Q2 | 不能凭品牌或相同外径判断互换；具体机型、刀站、孔型与图号共同确定零件。品牌仅用于替换识别，不表示 OEM 授权或全型号适配。 | C：`faqs.technical` Q2；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 3 / P2 · 替换识别 | Why is tungsten carbide used for corrugated slitter-scorer blades? | 保留 Q5 | 解释磨耗用途及牌号／刃口取舍，不给统一运行米数或寿命倍率。 | C：`faqs.technical` Q5；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why does corrugated board show rough edges after slitting? | 新增，故障 | 对照刃口、支撑、磨削和板材状态；首要是症状分类，不给单一原因。 | C：`specs` / 相关原技术问答；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 5 / P2 · 失效/质量判断 | Can automatic sharpening cause blade chipping or uneven wear? | 调整 Q6 | 解释磨刀位置／接触及刀具状况应一起检查；设置由对应整机资料确定，不发布跨机型数值。 | C：`faqs.technical` Q6；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 6 / P2 · 替换识别 | Can Sureay reproduce a corrugator blade with a specific mounting pattern? | 调整原 Q3；吸收旧候选8的有效验收信息 | 先说明已有平孔/固定孔阵/槽式及整体/分体配置，再列该刀图应定义孔位、厚度和刃位。一般接口核对不依赖首件服务；不新增签样或报告承诺。 | C：`faqs.technical` Q3；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |
| 7 / P3 · 名称/结构识别 | Are slitter-scorer blades the same as scoring wheels or slotter knives? | 保留 Q4 | 工位差异与真实采购名称；必要链接 Corrugated Slotter。 | C：`faqs.technical` Q4；P：P-BHS / P-KAMADUR-razor。**DRAFT-ready** |

**内链分工：**[Slotter](http://localhost:5173/products/corrugated-slotter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 07 Nonwoven Slitter Knives

`nonwoven-slitter-knives` · 主意图：nonwoven fabric slitting knives，spunbond/meltblown/SMS 与纤维切边。区别成卷 Nonwoven Log Saw 横断。

**当前问题：**三条主题有价值，但 400 m/min、消除吸纤及完整医用批次文件等仍需证据。**选题症状（非已统计客诉）：**毛边／游离纤维、刀面积纤、刃口磨耗、局部崩口。

**证据定位：C＝`nonwoven-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-DIENES-nonwoven、P-DIENES-guide。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Material Options for Nonwoven Cutting**／非织造布刀材选项 | 目录列 M2、D2、52100 与硬质合金；买家可围绕磨耗或崩口选不同刀材，保留原网材和刀架作为比较条件。 | C：`detailLayout.technicalSpecs[Materials]`；`detailLayout.technicalSpecs[Hardness]`。**DRAFT-ready** | **U / HOLD H1**：各钢种热处理、而非所有材料同一工艺 |
| 2. **Defined Edge Profiles and Optional Surface Treatments**／刃型与可选表面处理 | 现有刃角/前角、表面要求及 PTFE、TiN、DLC、ESD 选项，使几何和表面处理可分别指定；具体组合与效果另核，不将一组角度用于所有网材。 | C：`detailLayout.technicalSpecs[Geometry]`；`detailLayout.technicalSpecs[Rake Angle]`；`detailLayout.technicalSpecs[Surface Finish]`；`detailLayout.technicalSpecs[Optional Coatings]`。**DRAFT-ready** | **U / HOLD H3/H8**：不写一个角度覆盖所有克重线速；ESD 效果需条件与检测，不能保证消除积纤 |
| 3. **Custom Interfaces for Existing Knife Holders**／现有刀架的定制接口 | Interface 有 H7 内孔及螺钉锁紧，原 Q2 支持轮廓定制；客户可按刀架所需孔、截面和工作刃采购替换配置。此条不再依赖 CoC、医用资质或批次文件服务。 | C：`detailLayout.technicalSpecs[Interface]`；`faqs.technical` Q2。**DRAFT-ready** | **U / HOLD H4**：CoC、材质/硬度/尺寸报告及批次服务，已从本条拟稿移出。 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | Which replacement knife fits my nonwoven slitting holder? | 合并 Q1＋Q3 | shear/crush 的刀架与配合件不同，回答工位再谈尺寸；与卷材横断明确区分。 | C：`faqs.technical` Q1,Q3；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 2 / P1 · 失效/质量判断 | How should knife material be chosen when nonwoven edges fray or wear increases? | 调整原 Q6 | 先区分纤维/支撑/刀对设置造成的拉扯与渐进磨耗，再讨论材料选择；不以网材名称或线速直接指定唯一钢号，不复写优势1清单。 | C：`faqs.technical` Q6；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | What can cause fraying or loose fibres during nonwoven slitting? | 保留 Q4 | 刃口磨耗、几何、支撑与设置共同考虑，不只按速度／克重指定前角。 | C：`faqs.technical` Q4；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Does fibre buildup always require an antistatic coating? | 保留 Q5 | 明确不是；残留、支撑、静电分别排查，解释 ESD 与防粘选项分工。 | C：`faqs.technical` Q5；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 5 / P2 · 选材/表面决定 | Can custom nonwoven knife profiles and coatings be ordered separately? | 保留 Q2 | 基体、几何、涂层分别在订单定义，便于评估变更，不宣称任意组合可做。 | C：`faqs.technical` Q2；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 6 / P2 · 选材/表面决定 | Which material and dimensional requirements matter for hygiene-converting knives? | 保留原 Q7 的采购要求；撤回上一稿公司供报告问法 | 说明材料识别、硬度、尺寸基准和批次/订单关联是可约定的采购要求；刀具记录与成品卫生/医疗资质不同。不答 Sureay 默认能出哪些文件，服务范围统一列 H4。 | C：`faqs.technical` Q7；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |
| 7 / P3 · 维护条件 | When should nonwoven slitter knives be sharpened or replaced? | 新增，维护 | 依据切边与磨损、可磨余量及配合尺寸；不设固定班次或寿命。 | C：`specs` / 相关原技术问答；P：P-DIENES-nonwoven / P-DIENES-guide。**DRAFT-ready** |

**内链分工：**[Nonwoven Log Saw](http://localhost:5173/products/nonwoven-log-saw-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 08 Bottom Grooved Anvil Knives

`bottom-grooved-anvil-knives` · 主意图：单个底环槽形／工作肩、NN/NG/NS 锁紧替换。多切点 pitch／整体布局交由 Multi-Groove 页；不能把“单环”简单定义成只能一槽。

**当前问题：**三条恰好是原 Q1/Q3/Q4 的教程。**选题症状（非已统计客诉）：**上刀换新后仍有毛边、工作肩磨圆、积胶、安装面／孔配合导致偏摆。

**证据定位：C＝`bottom-grooved-anvil-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-DIENES-grooved、P-TKM-life。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide Anvil Configurations**／钢制与硬质合金底刀构造 | 目录有钢制、整体/镶硬质合金以及表面选项；下刀订单可区分工作刃材料、刀体构造和涂层，不把它们混成单一升级包。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Optional Coatings]`。**DRAFT-ready** | **U / HOLD H3/H8**：材料－表面实际组合；原减粘60–80%和连续8–12小时不能直接恢复 |
| 2. **Ground Grooves, Bores and Locating Faces**／槽形、内孔与定位面磨削 | 目录分别列槽宽、H6 孔、端面平面度及跳动要求；买家可同时定义工作肩和安装面的零件要求，不能把平面度写成平行度。 | C：`detailLayout.technicalSpecs[Groove width tolerance]`；`detailLayout.technicalSpecs[Face flatness]`；`detailLayout.technicalSpecs[Bore tolerance]`；`detailLayout.technicalSpecs[Runout]`。**DRAFT-ready** | **U / HOLD H2**：适用图纸及批次记录；不将 flatness 偷换为 parallelism，也不推导成品条宽精度 |
| 3. **Custom Groove Profiles and Locking Designs**／槽型与锁紧结构定制 | 现有 NN/NG/NS 与 split/clamp、槽形和工作刃位置；替换件可以按原刀轴接口和所需工作轮廓询价，品牌叫法不构成授权或通配声明。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2。**DRAFT-ready** | **U / HOLD H2/H8**：具体结构配套供应及刀对验收；不写全品牌直接安装 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | What defines a replacement grooved bottom anvil knife? | 合并 Q1＋Q5 | 槽形、工作肩位置、宽度与孔型共同定义；避免只凭OD/ID。 | C：`faqs.technical` Q1,Q5；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 2 / P1 · 名称/结构识别 | What do NN, NG and NS locking types mean? | 保留原 Q4 | 据 DIENES 结构命名说明 NN平孔、NG偏心锁紧、NS螺钉锁紧；它们不是跨厂家标准件号，相同名称不保证尺寸互换，也不表示 Sureay 为 OEM 授权方。 | C：`faqs.technical` Q4；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | Why does slit quality remain poor after the top knife is replaced? | 新增，故障 | 检查下刀工作面磨损与刀对／刀架状态；不沿用旧站“几乎肯定槽坏了”或通用0.03mm阈值。 | C：`specs` / 相关原技术问答；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 4 / P2 · 选材/表面决定 | Which material or coating suits an anvil knife used with adhesive webs? | 新增，选型 | 现有材料与 TiN/DLC/PTFE；根据胶料接触与磨耗选，不保证不积胶或固定班次。 | C：`specs` / 相关原技术问答；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 5 / P2 · 供货/配套决定 | Can Sureay supply a custom anvil ring without replacing the top knife? | 扩展 Q2＋线上单件采购主题 | 定制孔、环宽、槽／工作刃与锁紧；保留上刀的几何需已知，不强卖整套。 | C：`faqs.technical` Q2；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 6 / P2 · 替换识别 | Can a razor support sleeve replace a shear-slitting anvil? | 保留 Q3 | 先回答两者工作功能不同；让刀槽支撑与剪切工作肩不能只看槽形互换。 | C：`faqs.technical` Q3；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |
| 7 / P2 · 供货/配套决定 | When is an individual grooved ring enough for a replacement order? | 保留原 Q6 信息，改为单件采购角度 | 本页先回答原刀轴上单件槽形/工作肩/锁紧的替换需求；当订单需要多个切点统一排布时，用一条链接转 Multi-Groove，不在此重讲 pitch 测量或整体布局。 | C：`faqs.technical` Q6；P：P-DIENES-grooved / P-TKM-life。**DRAFT-ready** |

**内链分工：**[Multi-Groove切点布局](http://localhost:5173/products/groove-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 09 Tungsten Carbide Slitter Knives

`tungsten-carbide-slitter-knives` · 主意图：carbide slitter knives、solid vs tipped、grade/construction。应用尺寸继续由纸／箔／电极／钢卷页解释，不能建立重复应用介绍集合。

**当前问题：**牌号与构造价值退化为选择步骤；原站也有未经核实的成本／寿命倍数。**选题症状（非已统计客诉）：**微崩口、冲击碎裂、磨钝、重磨后的尺寸／刃型不符。

**证据定位：C＝`tungsten-carbide-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-BACH-carbide、P-TKM-bottom。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Solid and Carbide-Tipped Knife Configurations**／整体与镶硬质合金构造 | 当前目录同时列整体和钢体工作刃环；客户可以按现有刀座、受力和采购要求选择构造，不只购买泛称“carbide”的零件。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Construction]`；`detailLayout.technicalSpecs[Fine-grain options]`。**DRAFT-ready** | **U / HOLD H6**：牌号／晶粒／结合相实际资料；这里不写钢刀热处理，也不把牌号跨厂等同 |
| 2. **Ground Edge Forms with Optional Coatings**／磨削刃形与涂层选项 | 单/双刃、空磨/razor 与当前表面选项可依刀图定义；买家能把刃口形状和材料/涂层分开指定。原公差保留，但不外推全部结构或每件报告。 | C：`detailLayout.technicalSpecs[Edge Geometry]`；`detailLayout.technicalSpecs[Edge finish]`；`detailLayout.technicalSpecs[Precision options]`；`detailLayout.technicalSpecs[Optional Coatings]`。**DRAFT-ready** | **U / HOLD H2/H3/H4**：参数适用构造；不写“全部使用相同工艺”“每刀必附报告” |
| 3. **Custom Carbide Knives for Existing Slitters**／现有分切工位的硬质合金定制刀 | 原 Q1/Q6 支持按尺寸及机型工位定制；刀位、孔型、截面及实际材料要求共同确定替换件，不由镶刃构造推导钎焊或翻新服务。 | C：`faqs.technical` Q1；`faqs.technical` Q6。**DRAFT-ready** | **U / HOLD H9**：是否提供钎焊、翻新或重磨服务须分开确认，不由镶刃结构推导自产工序 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 名称/结构识别 | What is the difference between solid carbide and carbide-tipped knives? | 保留 Q2 | 整体与钢体工作刃环构造、装配和维护差别；并非只看材料名。 | C：`faqs.technical` Q2；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 2 / P1 · 选材/表面决定 | When should I choose carbide instead of HSS or tool steel slitter knives? | 调整 Q4 | 以磨耗、冲击、连续生产与维护条件比较，不恢复10–30倍寿命或固定成本倍数。 | C：`faqs.technical` Q4；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 3 / P2 · 选材/表面决定 | Are YG6, YG8 and similarly named carbide grades interchangeable? | 调整 Q5 | 晶粒、结合相与供应商牌号定义一起核对，不将相近编号当同材。 | C：`faqs.technical` Q5；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why does a carbide slitter knife chip before it wears out? | 新增，故障；吸收 Q4 | 区分刃口接触、冲击、装配／支撑与材料取舍；不以硬度越高越好作答案。 | C：`faqs.technical` Q4；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 5 / P2 · 替换识别 | Should carbide slitter knives be coated or left uncoated? | 保留 Q7 | 按基体、基材及现有磨损讨论DLC/TiN/TiAlN；涂层是可选项，不自动解决崩口。 | C：`faqs.technical` Q7；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | Can custom carbide knives be made for an existing slitter? | 合并 Q1＋Q6；吸收 Q3 | 明确刀位、构造和几何；carbide rotary/slitter blade别名并不指定工位。原尺寸范围不是任意组合。 | C：`faqs.technical` Q1,Q3,Q6；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |
| 7 / P3 · 维护条件 | Can carbide slitter knives be reground? | 新增，一般维护；DRAFT-ready | 解释剩余几何、刃口损伤、合适磨削方式与原刀图限制；有条件可重磨，不设统一次数。此题不表示 Sureay 承接重磨，相关商业服务仅 H9 待核。 | C：`specs` / 相关原技术问答；P：P-BACH-carbide / P-TKM-bottom。**DRAFT-ready** |

**内链分工：**[薄箔应用](http://localhost:5173/products/metal-foil-strip-slitter-knives)；[电极应用](http://localhost:5173/products/lithium-battery-slitting-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 10 Slitter Rewinder Bottom Knives

`slitter-rewinder-bottom-knives` · 主意图：rewinder bottom bands/lower/female knives、杯形／法兰／可换刃环替换。Paper Slitter 页负责纸种与刀对；Multi-Groove 页负责多切点布局。

**当前问题：**识别机型、选择工作面、选整体或镶刃属于采购指导。**选题症状（非已统计客诉）：**下刀工作面磨损、刃口崩口、换下刀后切边仍差、重磨后安装／切点改变。

**证据定位：C＝`slitter-rewinder-bottom-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-TKM-bottom、P-DIENES-bottom。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide Working-Edge Options**／钢与硬质合金工作刃 | 现有整体钢、整体硬质合金和钢体 WC-Co 选项；同一复卷机下刀采购可区分刀体与工作刃构造，避免把不同结构当同一件。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Carbide options]`。**DRAFT-ready** | **U / HOLD H1/H8**：钢材热处理和镶嵌工艺范围；不能凭材料名保证寿命 |
| 2. **Cup, Double-Edge and Replaceable-Ring Designs**／杯形、双刃与可换刃环结构 | Profiles 明列三类工作面结构；客户可采购原组件需要的刀体或可换环配置，不表示任何旧机都能改装可换刃环。 | C：`detailLayout.technicalSpecs[Profiles]`；`detailLayout.technicalSpecs[Face finish]`。**DRAFT-ready** | **U / HOLD H2/H9**：不新增精度数字／通用可重磨次数；可换刃环不等于所有机型可升级 |
| 3. **Custom Mounting Interfaces for Rewinders**／复卷机安装接口定制 | 当前法兰、键孔、平孔及旧机按图 FAQ，可把安装面/孔型与工作面一起定义；标准表之外的旧机零件也可进入具体图纸询价。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q3。**DRAFT-ready** | **U / HOLD H2/H8**：特定老机型匹配案例、单件配合检验范围 |

**Technical FAQs：6 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | Which replacement bottom knife fits my slitter rewinder? | 保留 Q1；吸收 Q2 | bottom band/lower/female 是工位相关称呼；法兰／孔型、工作面与位置识别部件。 | C：`faqs.technical` Q1,Q2；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |
| 2 / P1 · 供货/配套决定 | Can custom bottom knives be supplied for an older rewinder without replacing the upper knife? | 合并原 Q3＋Q6；吸收旧候选7 | 现有按图/样件及安装结构支持旧机替换；单独下刀采购需知道保留上刀的工作位置、直径和状态，保留单件/配套与报价数量信息。 | C：`faqs.technical` Q3,Q6；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |
| 3 / P2 · 名称/结构识别 | How do cup, double-edge and replaceable-ring bottom knives differ? | 保留原 Q4；并入原 Q5 的分流信息 | 解释工作面、刀体/可换环和法兰接口的结构差异；只有采购多切点整体布局时链接 Multi-Groove。不要在此再讲单槽/多槽优劣或节距设计。 | C：`faqs.technical` Q4,Q5；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |
| 4 / P2 · 选材/表面决定 | Should a rewinder bottom knife use steel, solid carbide or a carbide edge? | 新增，选型 | 当前三种构造与材料，结合上刀、磨耗、冲击与维护选；不复制材料页大段。 | C：`specs` / 相关原技术问答；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |
| 5 / P2 · 失效/质量判断 | Why is the paper edge still poor after replacing a bottom knife? | 新增，故障 | 下刀、保留上刀、刀架和设置分别看；不能单凭换刀判断根因。 | C：`specs` / 相关原技术问答；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |
| 6 / P3 · 维护条件 | When can a rewinder bottom knife be reground rather than replaced? | 新增，一般维护；DRAFT-ready | 按工作面、损伤与允许剩余尺寸判断能否恢复原几何，不给通用次数；不宣称 Sureay 提供磨刀服务。 | C：`specs` / 相关原技术问答；P：P-TKM-bottom / P-DIENES-bottom。**DRAFT-ready** |

**内链分工：**[Paper材料/刀对](http://localhost:5173/products/rotary-slitter-knives-paper)；[Multi-Groove布局](http://localhost:5173/products/groove-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 11 Corrugated Slotter Knives

`corrugated-slotter-knives` · 主意图：printer-slotter/flexo folder-gluer male/female slotter knives、弧刀和配套垫圈。不是干端薄圆纵切刀。

**当前问题：**三卡讲平／齿刃选择、配母刀与隔套、识别工位；可售的弧形和组件能力应在优势中。**选题症状（非已统计客诉）：**开槽毛边／撕裂、弧刀崩口、槽宽不稳、公母刀偏磨。

**证据定位：C＝`corrugated-slotter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-KAMADUR-slotter、P-CRI。

**线上核对：**L：2026-11-17当前URL返回404，Engineering Advantages为NOT FOUND；本页按本地C及P资料提出新选题，不声称恢复已核线上原文。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Materials Selected by Male and Female Knife Position**／按公母刀位配置材料 | 当前钢材及镶硬质合金母刀有不同供货对象；客户可分别指定公刀和母刀构造，不把镶合金能力扩到所有公刀。 | C：`specs[Material]`；`specs[Typical hardness]`。**DRAFT-ready** | **U / HOLD H1**：不能把镶硬质合金母刀推成所有公刀可做；各钢种热处理范围待核 |
| 2. **Plain and Serrated Arcs with Custom Mounting**／平刃/齿刃弧刀及安装加工 | 已有平/齿刃、分段弧形、孔/沉孔/弧槽；按具体刀头的半径、弧角和手向采购，不仅按一个长度找通用刀。 | C：`specs[Male blade]`；`specs[Mounting]`。**DRAFT-ready** | **U / HOLD H8**：不承诺齿刃统一减少撕裂，或所有刀段同一材质 |
| 3. **Male Knives, Female Knives and Matching Spacers**／公母刀及配套隔套 | 目录已有两片母刀与匹配隔套，原 FAQ 支持单件或配套采购；同一报价可明确哪些件换新、哪些件保留。 | C：`specs[Female assembly]`；`faqs.technical` Q2；`faqs.technical` Q5。**DRAFT-ready** | **U / HOLD H2**：配对验收、间隙及完整刀头附件范围需订单证明 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 替换识别 | How are replacement slotter knives matched to a box converting machine? | 保留 Q1；吸收 Q6 | 确认printer-slotter/folder-gluer工位、弧形、厚度、孔位、左右手；区别干端薄刀。 | C：`faqs.technical` Q1,Q6；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 2 / P1 · 名称/结构识别 | What is the difference between male and female slotter knives? | 保留 Q2 | 公刀进入母刀组件，母刀两侧与隔套共同构成配合；让买家订对部件。 | C：`faqs.technical` Q2；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 3 / P2 · 替换识别 | Should I choose a plain or serrated male slotter blade? | 保留 Q4 | 以原刀头、槽型和纸板为依据，不宣称齿刃普遍优于平刃。 | C：`faqs.technical` Q4；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why do corrugated slots have torn edges or uneven widths? | 新增，故障 | 刃口、母刀开口／隔套、装配和纸板状态；不是只换钢种即可解决。 | C：`specs` / 相关原技术问答；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 5 / P2 · 替换识别 | When should a carbide-tipped female slotter knife be considered? | 新增，部件特定选材 | 围绕母刀磨耗及公母刀组合讨论已列镶合金母刀的选择；不把它推广到所有公刀，不复写优势1的钢号清单。 | C：`specs` / 相关原技术问答；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 6 / P2 · 供货/配套决定 | Can custom slotter arcs be made from a drawing or sample? | 保留原 Q3；并入旧候选8的接口要求 | 明确半径、弧角、厚度、孔槽、手向及与母刀/隔套的配合要求；旧样磨损不复制为新尺寸。一般图纸核对不等于首件供应或随货报告承诺。 | C：`faqs.technical` Q3；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |
| 7 / P3 · 替换识别 | Must male and female slotter knives be replaced together? | 保留 Q5 | 可独立询价，也可考虑母刀两半与隔套配套；保留件状态和配合几何需明确。 | C：`faqs.technical` Q5；P：P-KAMADUR-slotter / P-CRI。**DRAFT-ready** |

**内链分工：**[Slitter-Scorer](http://localhost:5173/products/corrugated-slitter-scorer-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 12 Paper Straw Cutting / Slitting Blades

`paper-straw-slitting-blades` · 主意图：成形纸吸管的cut-off/trimming circular knives。URL保持；平纸条纵切去Paper Slitter，不为名称含slitting而改变工位。

**当前问题：**刀站识别、积胶检查和管壁配刃均是FAQ题。**选题症状（非已统计客诉）：**吸管端口毛边、压扁／变形、积胶、刃口磨耗／崩口。

**证据定位：C＝`paper-straw-slitting-blades`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-HMK。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide, HSS and Ceramic Material Options**／硬质合金、高速钢及陶瓷选项 | 目录列细晶硬质合金、M2 与氧化锆；成形吸管切断工位可按原结构和实际磨耗比较材料，不套纸幅纵切刀方案。 | C：`detailLayout.technicalSpecs[Material]`。**DRAFT-ready** | **U / HOLD H1/H8**：氧化锆、硬质合金不套钢刀热处理；不承诺食品接触认证 |
| 2. **Custom Cutting Edges and Optional Coatings**／定制工作刃与可选涂层 | 现有刃型和 DLC/TiN/TiAlN/CrN 选项；客户可分别约定刃口几何与表面配置，不把涂层当解决压扁/积胶的一项通用承诺。 | C：`detailLayout.technicalSpecs[Optional Coatings]`；`faqs.technical` Q3。**DRAFT-ready** | **U / HOLD H3/H8**：所有材料与镀层组合并非默认可用；不写零毛边／不积胶 |
| 3. **Replacement Knives for Formed-Straw Cut-Off**／成形吸管切断的替换刀 | 现有 cut-off/trim 定位及定制孔/截面/工作刃支持具体刀站询价；避免把前端平纸条分切尺寸用于成形管切断。 | C：`detailLayout.technicalSpecs[Applications]`；`faqs.technical` Q1；`faqs.technical` Q3。**DRAFT-ready** | **U / HOLD H5/H8**：特定机型适配、新样试切及配套服务范围待确认 |

**Technical FAQs：6 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 供货/配套决定 | Can Sureay make a replacement knife for my paper straw cutting station? | 合并原 Q1＋Q3 | 先回答已有按图定制孔、截面、安装和工作刃；机型/件号、原图样件、数量及成形管切断刀位用于报价，不只按外径识别。 | C：`faqs.technical` Q1,Q3；P：P-HMK。**DRAFT-ready** |
| 2 / P1 · 名称/结构识别 | Are paper straw cutting blades the same as paper slitter knives? | 保留 Q2 | 成形管横断与平纸卷纵切不同；采购名称解释放此处而非Hero。 | C：`faqs.technical` Q2；P：P-HMK。**DRAFT-ready** |
| 3 / P2 · 失效/质量判断 | How do tube-wall damage and blade wear affect paper straw knife material choice? | 保留原 Q4，改为工况决策 | 先区分成形管壁/支撑造成的变形与刃口磨耗，再比较现有硬质合金、高速钢和陶瓷构造的适用要求；不重列钢号，也不承诺食品认证。 | C：`faqs.technical` Q4；P：P-HMK。**DRAFT-ready** |
| 4 / P2 · 失效/质量判断 | Why are paper straw ends ragged or distorted? | 保留 Q5 | 管壁、刃口、支撑与切断设置共同影响；不保证换刀即可恢复。 | C：`faqs.technical` Q5；P：P-HMK。**DRAFT-ready** |
| 5 / P2 · 失效/质量判断 | What can reduce adhesive buildup on paper straw knives? | 调整 Q6 | 胶料接触、表面与清洁方式作为选型输入；涂层按具体基材／刀材讨论。 | C：`faqs.technical` Q6；P：P-HMK。**DRAFT-ready** |
| 6 / P3 · 替换识别 | When should a paper straw cutting blade be replaced? | 新增，维护 | 切口、刃口缺陷和允许工作尺寸；不发布固定产量或重磨次数。 | C：`specs` / 相关原技术问答；P：P-HMK。**DRAFT-ready** |

**内链分工：**[平纸纵切](http://localhost:5173/products/rotary-slitter-knives-paper)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 13 Multi-Groove Bottom Knives

`groove-bottom-knives` · 主意图：multi-groove bottom knife blocks/MKB、custom pitch/slit pattern。单个环的槽形与锁紧页不重复讲全部多切点排布。

**当前问题：**三卡为排切点、规划换幅、逐刀检查；真实多槽定制及整体／分体构造没有被表达为供货价值。**选题症状（非已统计客诉）：**多位置切边不一致、工作肩磨损、节距／基准误读、夹持与定位变化。

**证据定位：C＝`groove-bottom-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；P 为 P-DIENES-multi、P-TKM-multi。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 暂缓主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide-Edged Working Shoulders**／钢及镶硬质合金工作肩 | 目录已有钢制和镶硬质合金工作刃；买家可按各切点负载与磨耗提出工作面配置，不给所有材料统一硬度。 | C：`detailLayout.technicalSpecs[Material options]`。**DRAFT-ready** | **U / HOLD H1/H8**：热处理与工作肩耐磨数据；不能借DIENES说明变成Sureay寿命承诺 |
| 2. **Custom Pitch and Cutting-Edge Layouts**／定制节距与切点布局 | 总宽、单/双工作肩与切点按图定义；买家可订购所需分切宽度布局，切点坐标与沟槽空隙分别标注，最小 pitch 不无条件推广。 | C：`detailLayout.technicalSpecs[Groove pitch]`；`detailLayout.technicalSpecs[Cutting edges]`；`faqs.technical` Q2；`faqs.technical` Q4。**DRAFT-ready** | **U / HOLD H2**：最小pitch须带配置条件；不把槽间空隙等同切点节距，不新增累计公差 |
| 3. **One-Piece and Split Mounting Designs**／整体与分体安装结构 | 目录列整体/两片式、气胀轴平孔及实轴螺钉锁；按现有刀轴和拆装空间选择结构，不直接承诺免拆轴或固定省时效果。 | C：`detailLayout.technicalSpecs[Construction]`；`detailLayout.technicalSpecs[Mounting]`。**DRAFT-ready** | **U / HOLD H8**：分体是否能不拆轴换装取决于机台；不先宣称节省多少换刀时间 |

**Technical FAQs：7 条活跃题。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 优先级 | 英文工作问题 | 原题去向 | 答案新增价值与边界 | 证据 / 状态 |
| --- | --- | --- | --- | --- |
| 1 / P1 · 接口/验收定义 | Which dimensions define a replacement multi-groove knife block? | 合并原 Q1＋Q3 | 回答本页特有的切点坐标、总宽、工作肩及轴向基准；MKB/multi-groove anvil 等别名自然解释。单个环的锁紧细节只链接 Anvil 页，不重复其选型题。 | C：`faqs.technical` Q1,Q3；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 2 / P1 · 接口/验收定义 | How should groove pitch and cutting-edge positions be specified? | 保留原 Q4；并入旧候选8的验收要求 | 用统一轴向基准标相邻有效切点，槽内空隙不等于 pitch；这些是买家图纸/验收约定，不表示 Sureay 提供逐位置随货报告。 | C：`faqs.technical` Q4；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 3 / P2 · 供货/配套决定 | Can Sureay make a knife block to a custom slit-width pattern? | 保留 Q2 | 直接说明布局、总宽、工作刃和安装可按图定义；复购按同一基准识别。 | C：`faqs.technical` Q2；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 4 / P2 · 替换识别 | When should I choose a split ring instead of a one-piece ring? | 保留 Q5 | 按原轴、安装空间和结构选择；不承诺所有机台不拆轴即可更换。 | C：`faqs.technical` Q5；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 5 / P2 · 失效/质量判断 | Why does slit quality vary between positions on one knife block? | 新增，故障 | 不同工作肩磨损、上刀状态、装配与位置作为候选原因；不预设一项公差必然解决。 | C：`specs` / 相关原技术问答；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 6 / P2 · 失效/质量判断 | How should working-edge material be chosen when some slit positions wear faster? | 新增，工作肩特定选材 | 先区分局部上刀/工作肩、负载与装配造成的偏磨，再决定是否改变工作刃材料。保留现有钢和镶硬质合金选项，不把材料名作为多位置一致性的保证。 | C：`specs` / 相关原技术问答；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |
| 7 / P2 · 供货/配套决定 | What does an Item No. identify when ordering a replacement block? | 保留 Q6 | Item No.对应配置而非任意尺寸范围；旧订单、图纸版本与工作刃位置一起核对，避免复购偏差。 | C：`faqs.technical` Q6；P：P-DIENES-multi / P-TKM-multi。**DRAFT-ready** |

**内链分工：**[Anvil单件槽形/锁紧](http://localhost:5173/products/bottom-grooved-anvil-knives)；[Rewinder安装结构](http://localhost:5173/products/slitter-rewinder-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 暂缓主张与旧尾题去向

### 能力核对：只拦具体未知项

| 编号 | 待核主张 | 现有资料 / 缺口 | 状态与影响 |
| --- | --- | --- | --- |
| H1 | 特定钢种真空淬火、回火、深冷及自有工艺 | C/L部分已有；缺逐材料/刀型工艺适用范围。硬质合金/陶瓷不按工具钢处理 | U / **HOLD**：工艺保证暂缓，现有材料配置可草拟 |
| H2 | 公差适用结构/尺寸、逐件检测、随货量测结果 | C保留原参数；缺对应图纸、测量基准与订单报告 | U / **HOLD**：不把一项参数覆盖全系列，不由检测方式推默认随货报告 |
| H3 | 刀材—涂层组合与定量防粘/耐磨效果 | C保留Optional Coatings；实际组合和性能条件未齐 | U / **HOLD**：配置选项仍可写；效果百分比和零积胶不能进入草稿 |
| H4 | Sureay可提供的CoC、材质、硬度、CMM或批次文件 | L有旧宣传；当前未取得服务清单与样例 | U / **HOLD**：公司文件承诺集中核对；一般采购验收要求可解释 |
| H5 | 免费/付费样品、首件、试单、MOQ、交期与库存 | L曾提部分数字，缺最新批准政策 | U / **HOLD**：不设置每页固定商务尾题；报价条款按真实业务另核 |
| H6 | YG逐牌号硬度及ASP历史名称对应 | C有现值；P材料核对见持久来源记录，不能用外厂表覆盖Sureay实际材证 | U / **HOLD**：Battery统一91–93 HRA不进新优势句；ASP23/ASP2023仅按原厂历史对应解释，ASP2052保持独立牌号 |
| H7 | Corrugated OD与Edge Apex争议 | C的OD15–340与表格范围、约0.3mm含义须回签 | U / **HOLD**：原规格不删；新优势改用已有整体/分体构造和孔槽接口 |
| H8 | 寿命倍率、固定产线速度、无粉尘/毛刺、免调整通配、OEM授权 | 仅有L旧宣传或P他厂资料，不能变为Sureay保证 | U / **HOLD**：基于具体配置表达价值，不承诺未验证结果 |
| H9 | Sureay承接磨刀、钎焊、翻新、现场诊断等服务 | 产品构造/维护原理不等于相应商业服务 | U / **HOLD**：一般重磨条件/故障解释仍可回答 |

上述是一次集中核对清单，不要求用户逐页重复回答。缺失数值或服务凭据记 **NOT FOUND**；不把“没找到”写成“不具备”。本轮只核对已有资料和缺口，不能宣称已完成工厂能力认证，也不采用“解锁40%”这种没有分母的估算。

### 昨日同质候选如何处理

| 页面／旧候选 | 决定 | 证据 / 状态 |
| --- | --- | --- |
| Film #8、Foil #8：可随货哪些检验文件 | 从活跃题移出，统一H4；现有技术参数和采购数量仍留各题 | U / **HOLD**：公司服务承诺 |
| Paper #8、Coil #8、Straw #8：签样/试单/样品 | 从活跃题移出，统一H5；不改成同义的“首件验证”尾题 | U / **HOLD**：公司政策 |
| Nonwoven旧#7：Sureay能提供什么文件 | 撤回昨日公司服务问法；恢复原Q7“采购应约定什么”的内容；公司文件范围入H4 | C原Q7/P一般验收＝**DRAFT-ready**；U供文件承诺＝**HOLD** |
| Nonwoven #8、Carbide #8：如何比较试刀 | 属一般比较方法，不因服务缺口禁写；本轮在磨耗/选材题保留同工况比较要点，不再独立占尾题 | C/P；**MERGE**，不是公司服务HOLD |
| Battery #8、Anvil #8：验收记录/验收项目 | 合并进刀位/接口及相关选择答案；不扩成“默认随货报告” | C/P；**MERGE**，公司报告仍H4 |
| Corrugated #8、Slotter #8、Multi-Groove #8 | 接口/布局验收内容并入对应定制或节距题，不再独立复述识别要求 | C/P；**MERGE** |
| Rewinder #8：多槽何时合适 | 其原Q5的信息并入结构题，提供Multi-Groove链接；不在本页展开多切点布局 | C原Q5/P；**MERGE** |
| Carbide #5、Rewinder #5：能否重磨 | 保留一般条件；明确不代表Sureay提供磨刀服务 | C/P；**DRAFT-ready**；商业服务仅H9暂缓 |

“MERGE”表示信息仍在正文计划中；“HOLD”表示该公司承诺尚不进入稿件。不能用二者制造所谓多页不足6题的结论。活跃题数已经逐页计数，全部在6–8规范内。

## 证据目录与审阅顺序

- [当前目录摘录与来源哈希](evidence/slitter-advantages-faq-2026-11-17/catalog-evidence.json)：13个ID，含原规格、结构、82题完整问答；不是运行数据源。
- [线上13页与材料核对](evidence/slitter-advantages-faq-2026-11-17/live-and-material-check.md)：本轮访问状态、区块标题、材料表与原厂来源。
- [旧版完整计划](evidence/slitter-advantages-faq-2026-11-17/plan-before-review.md)：保留104候选的历史，方便逐项确认删除/合并。
- [此前关键词核对](../seo-audits/commercial-seo-slitter-before-2026-11-16.md)：沿用其GSC与术语资料，不冒称本轮Google PAA。
- [本轮逐条回应与三页英文样稿](slitter-claude-audit-response-2026-11-17.md)：先看Film、Paper、Bottom Grooved Anvil的9个标题/一句话说明，再审核余下10页主题。

下表P来源为2026-11-16已有研究，只有标注2026-11-17复读者视作本轮再次读取。引用位置用页面标题/小节/术语，不依赖网页或源码行号；具体技术数值只有原目录已确认范围内才进入后续草稿。

| 代号 | 原厂来源与位置 | 适用边界 |
| --- | --- | --- |
| P-TOYO | [TOYO Film/Tape/Metal Foil](https://en.toyoknife.co.jp/product/tape)，For Film / For Tape / For Metal Foil | 基材与部件语境，不证明Sureay性能 |
| P-DIENES-guide | [DIENES Slitting Reference Guide](https://www.dienesusa.com/wp-content/uploads/2015/11/Dienes-Slitting-Reference-Guide-2nd-Edition.pdf)，Slitting Dust / contributing factors | 刀对与设置多因素；不跨机型发参数 |
| P-TKM-top | [TKM Top Slitter Knives](https://www.tkmgroup.com/en/top-slitter-knives)，产品结构/Advantages | 上刀/纸张工位 |
| P-TKM-life | [TKM Life-time, Circular Knives](https://www.tkmgroup.com/en/troubleshooting/life-time-circular-knives)，原因列表 | 刀对、安装、刃口与磨耗，不是Sureay诊断服务 |
| P-BACH | [Bach Rotary Knives](https://bachknives.com/products/metal-processing/rotary-knives/)，Slitter Knives / Alloys | 金属加工刀材和配套采购，不能复制寿命 |
| P-ASKO | [ANDRITZ ASKO Service Centre Knives](https://www.andritz.com/products-en/metals/service-solutions/service-centre-knives)，Slitter tooling systems | 完整刀组中的不同零件 |
| P-DIENES-battery | [DIENES Battery Foil](https://www.dienes.de/en/explore/materials/battery-foil-separator-foil/)，Know-how | 涂布电极工况，不借此扩大Sureay隔膜范围 |
| P-BHS | [BHS Slitter Scorer](https://www.bhs-world.com/en/corrugators/individual-machines/slitter-scorer)，knife/scorer stations、integrated grinding | 整机工位，不是刀片跨品牌通配 |
| P-KAMADUR-razor | [KAMADUR Razor Blades](https://www.kamadur.com/products/Razor-blades/CONV0008/)，Also known as / compatibility | 瓦线刀名称与结构识别 |
| P-DIENES-nonwoven | [DIENES Nonwoven/Textile](https://www.dienes.de/en/explore/materials/nonwoven-and-textile/)，cutting methods / dust accumulation | 网材、切边与切法；不支持医用认证或ESD效果保证 |
| P-DIENES-grooved | [DIENES Grooved Knives](https://www.dienes.de/en/products/bottom-knives/grooved-knives/)，Types / Different locking procedures；2026-11-17独立复读 | NN平孔、NG偏心、NS螺钉锁；名称不是通用件号或授权 |
| P-BACH-carbide | [Bach Carbide Rotary Knives](https://bachknives.com/products/carbide-products/carbide-rotary-slitter-knives/)，产品构造 | 硬质合金材料类采购，不复制成本倍率 |
| P-TKM-bottom | [TKM Bottom Slitter Knives](https://www.tkmgroup.com/en/bottom-slitter-knives)，machine types / constructions | 下刀与钢/镶刃结构 |
| P-DIENES-bottom | [DIENES Bottom Knives](https://www.dienes.de/en/products/bottom-knives/bottom-knives/)，T-shaped / two cutting edges | 复卷机下刀结构 |
| P-KAMADUR-slotter | [KAMADUR Corrugated Blades](https://www.kamadur.com/produkte/Corrugated-blades/CONV0011/)，Also known as / sample drawings | 开槽弧刀及公母刀 |
| P-CRI | [CRI 50-inch ZLR knives](https://corrugatedreplacements.com/parts-drawings/ss/50-zlr-folder-gluer-knives/)，Male / Female tables | 机型零件分列，非全型号适配 |
| P-HMK | [HMK Paper Straws](https://www.hmkltd.co.uk/paper-straws/)，Paper Straw Cutting公开检索摘要 | 旧研究直接访问超时；只支持名称/工位，不用于新增材料、尺寸或失效定量结论；本页新增解释以C已有FAQ为主 |
| P-DIENES-multi | [DIENES Multi-Groove Bottom Knives](https://www.dienesusa.com/products/circular-knives/shear-cut-knives/multi-groove-bottom-circular-knives/)，Product Details / pitch / split | 多切点布局与结构，不保证换刀省时 |
| P-TKM-multi | [TKM Multi-Groove Cutting Quality](https://www.tkmgroup.com/en/troubleshooting/life-time-cutting-quality-multi-groove-knife-block)，cutting edges / pitch | 多切点质量问题，不外推Sureay公差 |

建议先审三页英文样稿，再完成H1–H9中确需进入文案的少数主张核对。已有材料/结构足以支持的主题继续推进，不让未确认样品或报告政策阻塞全部39个优势。真正成稿时再复核问题顺序、答案重复与关键词归属；本轮没有页面上线授权。

## 原 FAQ 与工程卡索引

以下直接来自2026-11-17持久目录快照，原Q是`faqs.technical`的1起始位置。每个原题都有正文去向；完整原答案在JSON中保留，本文不复制长答案。新方案不能丢掉原答案中的数量、图纸、安装与配套信息。

### rotary-slitter-knives

现有工程卡：Choose the cut before choosing the blade；Manage adhesive pickup；Match the holder。

- Q1：How do I identify replacement knives for my film or tape slitter?
- Q2：Can film slitter knives be custom-made from a drawing or sample?
- Q3：Are film slitter blades and tape slitter knives interchangeable?
- Q4：How do shear cutting and crush cutting differ?
- Q5：What do OD, bore, thickness and dish height describe?
- Q6：What should I check when adhesive builds up on tape slitter knives?
- Q7：Should I order a complete top-and-bottom knife pair?

### rotary-slitter-knives-paper

现有工程卡：Match the paper grade；Check the ground edge；Measure the dish separately。

- Q1：How are replacement paper slitter knives matched to a rewinder?
- Q2：Are dished knives, top knives and male knives the same part?
- Q3：Can custom paper slitter knives be supplied from a worn sample?
- Q4：Why are blade thickness and dish height listed separately?
- Q5：What can cause paper dust even with a sharp slitter knife?
- Q6：How should I choose steel or carbide for paper slitting?
- Q7：Must top and bottom paper slitter knives be replaced together?

### metal-foil-strip-slitter-knives

现有工程卡：Set clearance for the foil gauge；Control stack width；Inspect edge and face condition。

- Q1：How do I specify replacement copper or aluminum foil slitter knives?
- Q2：Can foil slitter knives and spacers be made to a custom drawing?
- Q3：Are bare-foil knives and battery electrode knives interchangeable?
- Q4：What does OD × ID × W mean for a foil slitter knife?
- Q5：Which foil properties affect carbide or steel knife selection?
- Q6：What should be checked when burrs appear during foil slitting?

### metal-coil-slitting-knives

现有工程卡：Choose toughness for the load；Match tolerances to the tooling；Support the strip after the cut。

- Q1：Which details identify replacement steel coil slitting knives?
- Q2：Can a complete custom slitter tooling stack be supplied?
- Q3：Are rotary shear knives and steel coil slitting knives the same?
- Q4：How should knife material be selected for different steel coils?
- Q5：Why do component tolerances matter in a mixed knife stack?
- Q6：What can cause burrs or inconsistent slit edges on a coil line?

### lithium-battery-slitting-knives

现有工程卡：Specify the electrode stack；Match upper and lower knives；Inspect the slit electrode edge。

- Q1：How do I match replacement knives to an electrode slitting station?
- Q2：Can custom upper and lower electrode knife pairs be supplied?
- Q3：How do electrode knives differ from bare-foil slitting knives?
- Q4：Can I replace only the upper electrode slitter knife?
- Q5：What affects burrs, dust or coating damage at the slit edge?
- Q6：How should carbide grade and optional coating be specified?

### corrugated-slitter-scorer-blades

现有工程卡：Check the mounting pattern；Match the grinding station；Identify the cutting station。

- Q1：How do I identify replacement corrugated slitter-scorer blades?
- Q2：Do BHS and Fosber slitter blades interchange?
- Q3：Can corrugator knives be made to a custom mounting pattern?
- Q4：Are slitter blades, scoring tools and slotter knives the same?
- Q5：Why is tungsten carbide used for corrugated board slitting?
- Q6：What should be checked around the automatic sharpening unit?

### nonwoven-slitter-knives

现有工程卡：Nonwoven-Optimised Rake Angle；ESD Conductive Coating；Medical Batch Traceability。

- Q1：How do I choose replacement knives for a nonwoven slitting line?
- Q2：Can custom nonwoven slitter profiles and coatings be specified?
- Q3：Are shear knives and crush cutters suitable for the same holder?
- Q4：What can cause fraying or loose fibres during nonwoven slitting?
- Q5：Does fibre buildup always mean the blade needs an antistatic coating?
- Q6：How do material choices differ for nonwoven slitter knives?
- Q7：What inspection information is useful for hygiene or medical converting?

### bottom-grooved-anvil-knives

现有工程卡：Match the groove to the top knife；Choose the correct locking design；Distinguish shear from razor support。

- Q1：How do I select a replacement grooved anvil knife?
- Q2：Can grooved rings be custom-made for an existing slitter shaft?
- Q3：Can a razor support sleeve replace a shear-slitting anvil?
- Q4：What do NN, NG and NS mounting types mean?
- Q5：Which dimensions matter besides outside diameter and bore?
- Q6：How does a single grooved ring differ from a multi-groove knife block?

### tungsten-carbide-slitter-knives

现有工程卡：Choose the structure first；Balance abrasion with edge loading；Find sizes by application。

- Q1：Can carbide slitter knives be made to custom dimensions?
- Q2：What is the difference between solid and carbide-tipped knives?
- Q3：Are carbide rotary knives and carbide slitter blades the same?
- Q4：Does a higher carbide hardness always give longer service life?
- Q5：Are similarly named carbide grades directly interchangeable?
- Q6：How do I match a carbide replacement to an OEM machine?
- Q7：Should carbide slitter knives be coated?

### slitter-rewinder-bottom-knives

现有工程卡：Identify the rewinder and mounting；Select the cutting face；Choose between solid and tipped。

- Q1：How do I identify a replacement slitter rewinder bottom knife?
- Q2：Are bottom bands, lower knives and female knives the same?
- Q3：Can custom bottom knives be supplied for an older rewinder?
- Q4：How do cup, double-edge and replaceable-ring designs differ?
- Q5：When is a multi-groove bottom knife more appropriate?
- Q6：What should be checked when only the bottom knife is replaced?

### corrugated-slotter-knives

现有工程卡：Choose plain or serrated male arcs；Match both counter faces and the spacer；Identify the converting station。

- Q1：How are replacement slotter knives matched to a box machine?
- Q2：What is the difference between male and female slotter knives?
- Q3：Can custom slotter arcs be made from a drawing or sample?
- Q4：Should I choose a plain or serrated male slotter blade?
- Q5：Must male and female slotter knives be replaced together?
- Q6：Are corrugated slotter knives the same as slitter-scorer blades?

### paper-straw-slitting-blades

现有工程卡：Match the station before the disc；Inspect adhesive buildup on straw lines；Match the edge to the straw wall。

- Q1：Which replacement blade fits a paper straw cutting machine?
- Q2：Are paper straw cutting blades and paper slitter knives the same?
- Q3：Can custom paper straw knives be made to a drawing?
- Q4：How should I choose carbide, HSS or another blade material?
- Q5：What can cause ragged or distorted paper straw ends?
- Q6：How should an optional coating be selected for a straw knife?

### groove-bottom-knives

现有工程卡：Lay out the slit schedule；Plan the width changeover；Check the top knife at each position。

- Q1：What defines a replacement multi-groove bottom knife?
- Q2：Can multi-groove knives be made to a custom slit pattern?
- Q3：Are multi-groove anvils, knife blocks and bottom slitters the same?
- Q4：How should groove pitch be measured?
- Q5：When should I choose a split ring rather than a one-piece ring?
- Q6：What does an Item No. tell me when ordering a knife block?

