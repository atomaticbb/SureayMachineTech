# Slitter 13 款：Engineering Advantages 与 Technical FAQs 修订计划

初稿：2026-11-16；本版修订：**2026-11-17，第二轮复审后**。状态：**供用户审核的内容方案；只改文档，不改页面或原规格。** 本版替代旧稿“每页先凑 8 题”的做法。旧稿已完整存入[审计归档](evidence/slitter-advantages-faq-2026-11-17/plan-before-review.md)。

## 本次修正与阅读方法

Claude 对尾部通用题、标记不足、泛化价值与来源可回查性的批评成立。本版删除/合并同质候选，把真正未知的企业承诺单独放入 HOLD。一般验收、试切比较、重磨条件不因Sureay服务证明缺失而一律停用，但新增技术解释仍需有对应出处；本轮将未核实机制标为研究候选。多页出现材料主题也不自动证明搜索词蚕食：优势介绍供货，FAQ解释该基材/刀位下的选择条件，各自必须有独立信息。

- **39 条优势**均有英文标题、具体可供内容和证据标记；不是最终英文长段落。三张优先样页的英文一句话说明见[本次审核回应与样稿](slitter-claude-followup-review-2026-11-17.md)。
- **每页 6–7 条拟保留 FAQ 选题（含待补证）**，是审阅用选题池；逐行状态决定能否起草；不预留固定“第 8 题”。未来只有独立采购需求和事实齐全时才增加到 8 题。
- 现有 **82 条 FAQ** 的有用信息全部保留或合并；每行“原 Q”指文末当前目录索引。被移走的大多是昨日新加候选，不能把它们说成从网站删掉的问题。
- 原尺寸、Optional Coatings 和材料参数在代码中保持。存在争议的值在方案中标注，不用另一厂商的牌号表替换 Sureay 参数，也不把原值提升为新的性能保证。

### 每行证据与状态如何读

证据是**来源类型**，不是“已获工厂认证”的等级。各产品节的 C 均指[持久目录快照](evidence/slitter-advantages-faq-2026-11-17/catalog-evidence.json)中该 `id`；后面的字段/原 Q 是稳定定位，运行中的唯一数据源仍为 `client/src/data/blades.ts`。

| 标记 | 含义 | 本版允许支持的内容 |
| --- | --- | --- |
| C | 当前目录：本产品 `specs`、`detailLayout.technicalSpecs`、`standardDimensions` 或 `faqs.technical` | 已有配置/材料/尺寸/供货描述，不能据此推导每批报告、收益百分比 |
| L | Sureay 线上历史内容，按产品 ID＋Engineering Advantages 等区块定位 | 原卖点主题与前后差异；不自动确认旧效果、库存和试样承诺 |
| P | 已读取且在本行标明具体章节的原厂/成熟刀厂/材料厂资料 | 只支持对应章节的主张；文末背景检索入口不等于逐题证据 |
| EDITORIAL | 编辑提出、尚未完成相应机制/判据核实的研究题 | 即使引用C说明已有产品选项，也不能据此声称新增解释已验证 |
| U | 缺少对应公司凭据或存在未解冲突 | 只进入 HOLD 登记；不进入拟议页面描述 |
| 可起草 | 本行拟写内容有对应目录事实或逐题原厂出处 | 仅表示可写审阅稿，C不是独立实测证明，更不是上线许可 |
| 限定起草 | 只有本行明确的部分可写，另一拟用部分受H项或出处范围限制 | 本行必须写明可写部分及具体限制；扩展部分待核 |
| 待补证 | 新机制、维护、成本或工况判断尚无逐题有效出处 | 保留为EDITORIAL研究选题，不先写结论；现有目录事实照常保留 |
| HOLD | 该项具体主张暂不进入成稿 | 只拦对应数字/服务/效果，不拖住同条中有依据的产品主题 |

优势表的“已排除的扩大主张”属于U/HOLD；它们已从拟稿剔除，单凭同栏有H编号不降低整条状态。若本行实际拟写部分仍需H项，则标“限定起草”并指明范围。FAQ的内部边界用于审稿，不逐题复制为英文免责声明；英文答案应直接解释可供内容、判断条件和采购下一步。

### FAQ 排序依据

仅保留**顺序＋具体采购理由**，删除P1/P2/P3层级。先解决本页的替换识别、选材或配套购买决定，再安排质量判断、名称和维护问题。此顺序是编辑判断，参考已有GSC意图与目录采购流程；不是Google搜索量或PAA排名。本轮未取得新的搜索量/PAA，旧GSC期间为2026-10-17至11-13。

优势说“可供什么，以及买家得到什么选择”；FAQ回答相应工况下的判断条件。不同页的定制问题可以保留，但答案必须具体到本页接口/刀位/配合件，不重复材料清单或同一询价模板。只有分流作用的问题合并进已有答案。

本文件的`localhost:5173`链接仅供本地审阅；英文草稿和页面数据必须使用`/products/...`站内路径，不携带localhost域名。跨组的`/products/scrap-chopper-blades`和`/products/nonwoven-log-saw-blades`已通过实际目录ID、英语lookup及详情路由核对，本轮并未据此宣称线上部署已验证；见[来源补查记录第4节](evidence/slitter-advantages-faq-2026-11-17/followup-source-check.md)。

## 拟保留题数与页面分工

| 页面 | 拟保留题（含待补证） | 主要采购意图 / 基线 |
| --- | ---: | --- |
| [Film & Tape Slitter Knives](http://localhost:5173/products/rotary-slitter-knives) | 7 | film/tape slitter knives、replacement rotary shear/crush knives |
| [Paper Slitter Knives](http://localhost:5173/products/rotary-slitter-knives-paper) | 7 | paper slitter blades、dished/top/male knives、纸卷上下刀配对 |
| [Slitter Knives for Copper & Aluminum Foil](http://localhost:5173/products/metal-foil-strip-slitter-knives) | 6 | bare copper/aluminum foil slitter knives |
| [Steel Coil Slitting Knives](http://localhost:5173/products/metal-coil-slitting-knives) | 7 | steel coil slitting knives、replacement rotary shear tooling、knife/spacer/stripper sets |
| [Battery Slitting Knives](http://localhost:5173/products/lithium-battery-slitting-knives) | 7 | coated anode/cathode electrode slitting knife pairs |
| [Corrugated Board Slitter Blades](http://localhost:5173/products/corrugated-slitter-scorer-blades) | 7 | corrugator dry-end thin blades、BHS/Fosber replacement slitter knives |
| [Nonwoven Slitter Knives](http://localhost:5173/products/nonwoven-slitter-knives) | 7 | nonwoven fabric slitting knives，spunbond/meltblown/SMS 与纤维切边 |
| [Bottom Grooved Anvil Knives](http://localhost:5173/products/bottom-grooved-anvil-knives) | 6 | 单个底环槽形／工作肩、NN/NG/NS 锁紧替换 |
| [Tungsten Carbide Slitter Knives](http://localhost:5173/products/tungsten-carbide-slitter-knives) | 7 | carbide slitter knives、solid vs tipped、grade/construction |
| [Slitter Rewinder Bottom Knives](http://localhost:5173/products/slitter-rewinder-bottom-knives) | 6 | rewinder bottom bands/lower/female knives、杯形／法兰／可换刃环替换 |
| [Corrugated Slotter Knives](http://localhost:5173/products/corrugated-slotter-knives) | 7 | printer-slotter/flexo folder-gluer male/female slotter knives；**目录基础新拟；线上404，无原优势可恢复** |
| [Paper Straw Cutting Blades](http://localhost:5173/products/paper-straw-slitting-blades) | 6 | 成形纸吸管的cut-off/trimming circular knives |
| [Multi-Groove Bottom Knives](http://localhost:5173/products/groove-bottom-knives) | 7 | multi-groove bottom knife blocks/MKB、custom pitch/slit pattern |

复审前的 **88** 计数正确：10页×7＋3页×6＝88；Claude所写89是加总错误。本轮将Anvil纯分流题并入第1题，因此改为 **87条拟保留选题**（9页×7＋4页×6），含待补证研究题。原稿104候选和复审前88题均已归档，不作为填充数量目标。

**逐行状态统计：**39条优势：可起草36，限定起草3，待补证0。87条FAQ选题：可起草66，限定起草9，待补证12。限定起草只按行内已支持的范围写；待补证题尚不进入英文答案。

| 页面序号 | 拟保留选题 | 可起草 | 限定起草 | 待补证 |
| --- | ---: | ---: | ---: | ---: |
| 01 | 7 | 4 | 3 | 0 |
| 02 | 7 | 6 | 1 | 0 |
| 03 | 6 | 6 | 0 | 0 |
| 04 | 7 | 5 | 0 | 2 |
| 05 | 7 | 5 | 1 | 1 |
| 06 | 7 | 6 | 0 | 1 |
| 07 | 7 | 6 | 0 | 1 |
| 08 | 6 | 4 | 1 | 1 |
| 09 | 7 | 5 | 0 | 2 |
| 10 | 6 | 4 | 2 | 0 |
| 11 | 7 | 5 | 0 | 2 |
| 12 | 6 | 5 | 0 | 1 |
| 13 | 7 | 5 | 1 | 1 |

三类底刀的边界：**Anvil＝单件槽形/工作肩与锁紧；Rewinder Bottom＝复卷机下刀法兰、杯形/双刃/可换环；Multi-Groove＝多个切点坐标与节距布局。** 跨页只保留足够的分流说明及准确链接，不在三页都重讲“单槽对多槽”。不能把一个环简单等同一个槽。

## 线上覆盖与可回查依据

11月16日仅直接对比5页的限制是真实的，不能声称旧稿完成13页线上原文恢复核对。本次逐页访问结果、原优势标题/区块及材料核对统一记录在[线上与材料核对记录](evidence/slitter-advantages-faq-2026-11-17/live-and-material-check.md)。本轮13个当前路径均已核查：12页取得对应优势原文，Corrugated Slotter返回404且区块为NOT FOUND。下文供货依据优先用 C，L 只提供原销售主题。

研究原理来源继续引用已保存的[13页关键词前审](../seo-audits/commercial-seo-slitter-before-2026-11-16.md)及文末 P 目录，标明旧研究与本轮复读范围；不用 Temp 文件或容易漂移的源码行号作为唯一凭据。

## 01 Film & Tape Slitter Knives

`rotary-slitter-knives` · 主意图：film/tape slitter knives、replacement rotary shear/crush knives。与 Paper、裸箔和硬质合金材料页分工，不以 rotary slitter 泛词吞并它们。

**当前问题：**三条均为操作建议，与原 Q1、Q4、Q6 重叠。**选题症状（非已统计客诉）：**胶料积聚、刃口磨钝、局部崩口、切边拉伸／不齐。

**证据定位：C＝`rotary-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-TOYO、P-DIENES-guide（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Application-Matched Steel and Carbide Options**／膜与胶带的材料配置 | 目录列 52100、D2、M2、PM HSS 与硬质合金；同一替换项目可按实际磨耗与冲击需求指定刀材，不只购买一种通用钢圆片。 | C：`detailLayout.technicalSpecs[Material]`。**可起草** | **U / HOLD H1**：各钢种实际热处理方式、硬度范围；不新增统一深冷工艺 |
| 2. **Precision-Ground Edges and Optional Coatings**／精磨工作刃与可选涂层 | 目录已有刀厚/跳动指标及 TiN、DLC、PTFE 等选项；客户可把几何和接触面配置写入同一刀图与订单，比较有明确内容的替换方案。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`；`detailLayout.technicalSpecs[Optional Coatings]`。**可起草** | **U / HOLD H2/H3/H8**：公差适用尺寸；镀层／基材组合；降低积胶比例及连续运行小时数 |
| 3. **Custom Replacement Knives and Matched Pairs**／定制替换刀与配对供应 | 现有定制 FAQ 明确孔、截面、安装和刃型；客户可采购所需单件，也可把上刀与下刀放在同一询价中，分别定义尺寸和数量。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2；`faqs.technical` Q7。**可起草** | **U / HOLD H2/H8**：成套检验的实际项目；不能承诺所有品牌无需调整 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | Which replacement knife fits my film or tape slitter? | 合并 Q1＋Q4；吸收 Q3 | 按 rotary shear 或 crush 工位识别替换件，再列刀架、孔型和轴向位置；在采购语境说明 blade/knife 别称。 | C：`faqs.technical` Q1,Q3,Q4。 **可起草** | — |
| 2 · 选材/表面决定 | When should wear resistance take priority in shear-slitting knife selection? | 新增，选材取舍；与优势1分工 | 说明一般剪切刀磨耗、抗冲击与材料选择的取舍，结合当前刀站和损伤模式判断是否提升耐磨取向。 | C：`detailLayout.technicalSpecs[Material]`；`specs[Applications]`；P：P-DIENES-guide，印刷页25–28 Knife Metallurgy（2026-11-17复读）。支持范围：一般剪切圆刀耐磨/抗冲击取舍；填料逐项作用未核。 **限定起草** | 一般剪切圆刀耐磨/抗冲击取舍；填料逐项作用未核；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 3 · 失效/质量判断 | Why does adhesive build up on tape slitter knives? | 调整 Q6 | 沿用原 Q6：比较胶黏剂与网材、残留位置、工作面以及刀材，再讨论现有表面与涂层选项。 | C：`faqs.technical` Q6。 **限定起草** | C原Q6限检查/选型输入；H3涂层适用组合与效果待核；本轮答案仅展开原目录支持部分。 |
| 4 · 失效/质量判断 | What can cause edge damage in a shear-slitting knife pair? | 新增，故障 | 按剪切刀架接触、材料磨耗与设置因素说明刃口损伤的检查方向。 | C：`faqs.technical` Q6,Q7；P：P-DIENES-guide，印刷页7 Pneumatic Top Knife Holders、25–26 Knife Metallurgy、56 Troubleshooting（2026-11-17复读）。支持范围：剪切刀架接触、材料磨耗和设置因素；crush工位及特定填料不在此来源范围。 **限定起草** | 剪切刀架接触、材料磨耗和设置因素；crush工位及特定填料不在此来源范围；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 5 · 接口/验收定义 | How do blade thickness, bore and dish height affect replacement fit? | 保留 Q5 主题 | 分别解释刀身厚度、总碟高和底环宽度如何定义工作刃的轴向位置。 | C：`faqs.technical` Q5。 **可起草** | — |
| 6 · 供货/配套决定 | Should I replace both the top and bottom slitter knives? | 保留 Q7 | 说明单件补换与整对采购的条件：保留件状态、两侧刃口、安装面、工作直径和上下刀位置。 | C：`faqs.technical` Q7。 **可起草** | — |
| 7 · 供货/配套决定 | Can Sureay make custom film slitter knives from a drawing or sample? | 保留 Q2，销售化答案 | 说明现有按图/样件的孔、截面、安装和工作刃定制；区分磨损样件与新尺寸，保留配合件和每配置数量。 | C：`faqs.technical` Q2。 **可起草** | — |

**内链分工：**[Paper](http://localhost:5173/products/rotary-slitter-knives-paper)；[Carbide构造](http://localhost:5173/products/tungsten-carbide-slitter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 02 Paper Slitter Knives

`rotary-slitter-knives-paper` · 主意图：paper slitter blades、dished/top/male knives、纸卷上下刀配对。区别堆纸裁切刀和以法兰／杯形安装为主的 Rewinder Bottom 页。

**当前问题：**纸种、磨削、碟高被写成操作步骤。**选题症状（非已统计客诉）：**纸粉、切边拉毛、上下刀崩口、重磨后配合改变。

**证据定位：C＝`rotary-slitter-knives-paper`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-TKM-top、P-TKM-life（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Material Options for Paper Converting**／纸张加工的材料选项 | 目录有工具钢、高速钢与硬质合金构造；替换订单可保留原材料，也可就涂布/再生纸磨耗提出不同刃材配置。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Hardness]`。**可起草** | **U / HOLD H1/H8**：热处理工艺与批次硬度范围；原“40–60% 寿命提升”不直接恢复 |
| 2. **Precision-Ground Thickness and Cutting Faces**／刀厚与切削面的精磨配置 | 目录已有刀厚与表面要求；刀体截面、工作面和碟形总高分别定义，买家能按原装配采购明确的几何配置，而非把碟高误作刀厚。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Surface finish]`；`detailLayout.technicalSpecs[Runout]`。**可起草** | **U / HOLD H2/H8**：精度适用配置、配对检验方式；不能把刀具精度写成无纸粉保证 |
| 3. **Custom Top and Bottom Knife Sets**／定制上下刀组 | 上刀及下刀现有配置可按图/旧样报价；同一询价分别列上下刀图号、配合要求和数量，服务单件补换或成对采购。 | C：`detailLayout.technicalSpecs[Mounting]`；`detailLayout.technicalSpecs[Cutting Styles]`；`faqs.technical` Q1；`faqs.technical` Q3；`faqs.technical` Q7。**可起草** | **U / HOLD H8**：原网页列出的全部锁紧／刃角是否均实际提供，不扩大当前目录 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | Can Sureay reproduce paper slitter knives for my existing rewinder? | 合并 Q1＋Q3 | 说明按图或旧样定制替换上/下刀；明确工位、接口、纸种、配合件和每配置数量，法兰/杯形采购自然分流。 | C：`faqs.technical` Q1,Q3。 **可起草** | — |
| 2 · 选材/表面决定 | When do coated or filled papers justify HSS or carbide slitter knives? | 调整原 Q6 | 用纸种、涂布/填料、渐进磨耗和崩口比较选择条件，结合现有刀对与安装稳定性判断升级需求。 | C：`faqs.technical` Q6。 **可起草** | — |
| 3 · 失效/质量判断 | What causes paper dust or ragged edges during slitting? | 调整 Q5 | 沿用原 Q5 的纸料、配合刀、刀架稳定性和设置因素；记录纸种与正常设置，比较实际切边样品。 | C：`faqs.technical` Q5。 **可起草** | — |
| 4 · 替换识别 | Must top and bottom paper slitter knives be replaced together? | 保留 Q7 | 说明单件或配对采购条件，检查上下刀工作面及重磨后的剩余尺寸。 | C：`faqs.technical` Q7。 **可起草** | — |
| 5 · 名称/结构识别 | Are dished knives, top knives and male knives the same part? | 保留 Q2 | 解释 dished 是形状，top/male 是位置，flat top 也属于上刀；按实际轮廓和配合关系识别。 | C：`faqs.technical` Q2。 **可起草** | — |
| 6 · 接口/验收定义 | Why are blade thickness and dish height listed separately? | 保留 Q4 | 分别解释材料截面厚度与碟形总高，以及两者对现有刀架中工作刃位置的意义。 | C：`faqs.technical` Q4。 **可起草** | — |
| 7 · 维护条件 | When should paper slitter knives be reground or replaced? | 新增，维护 | 说明切边、刃口损伤和剩余尺寸如何决定重磨或换新，准备对应刀型的判据。 | C：`faqs.technical` Q3,Q7；P：P-DIENES-guide，印刷页30–31 Knife Regrinding；P-TKM-life，原因列表/How to improve life-time（2026-11-17复读）。支持范围：圆刀恢复几何与磨削影响；具体最小直径、可磨余量仍需对应刀图。 **限定起草** | 圆刀恢复几何与磨削影响；具体最小直径、可磨余量仍需对应刀图；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |

**内链分工：**[Rewinder Bottom](http://localhost:5173/products/slitter-rewinder-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 03 Copper & Aluminum Foil Slitter Knives

`metal-foil-strip-slitter-knives` · 主意图：bare copper/aluminum foil slitter knives。涂布电极交由 Battery 页，厚钢卷交由 Coil 页。

**当前问题：**三卡都在教设置或检查，已有加工及刀／隔套供应价值没有表达。**选题症状（非已统计客诉）：**毛刺、边部变形、刀口磨钝／崩口、刀组累计宽度偏差。

**证据定位：C＝`metal-foil-strip-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-TOYO、P-BACH（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Tool Steel and Carbide Options for Metal Foil**／铜铝箔材料配置 | 现有 D2、D3、M2、PM HSS 和 WC-Co 可作为不同订单选项；裸箔的厚度、硬度状态与实际刃损决定比较对象，ASP 历史写法在 H6 单独核对。 | C：`detailLayout.technicalSpecs[Material]`。**可起草** | **U / HOLD H1/H6**：钢材热处理及各牌号适用硬度，不把 PM 硬度套给所有材料 |
| 2. **Precision-Ground Knife Faces for Foil Tooling**／薄箔刀具的精磨面 | 原目录有 ±0.001 mm 刀厚、Ra≤0.02 μm 与跳动指标；替换采购可沿用现有刀组的刀厚与端面要求，不把单刀精度说成成品条宽保证。 | C：`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`；`detailLayout.technicalSpecs[Surface finish]`；H2：先起草精磨刀厚/端面要求，数值适用配置待核。**限定起草** | **U / HOLD H2/H8**：工厂检验样例与规格范围；不等于成品条宽精度或零毛刺 |
| 3. **Custom Knives and Matching Spacers**／刀片与配套隔套 | 原 Q2 已有刀片/隔套按图供货；买家可一并报刀轴布局、各件轴向宽度和数量，明确新购与保留零件。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2。**可起草** | **U / HOLD H2**：配套项目、组内宽度检验范围；不扩大成整条设备改造 |

**Technical FAQs：6 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 供货/配套决定 | How do I specify custom replacement foil knives and matching spacers? | 合并原 Q1＋Q2＋Q4 | 说明刀轴接口、OD/ID/轴向宽度、刀与隔套排列及 slit-width schedule；保留定制、图样、保留件和每配置数量。 | C：`faqs.technical` Q1,Q2,Q4。 **可起草** | — |
| 2 · 选材/表面决定 | How do foil gauge and edge damage affect the choice of steel or carbide? | 调整原 Q5 | 按箔材合金、厚度、表面状态、当前磨耗和崩口比较钢与硬质合金的选择条件。 | C：`faqs.technical` Q5。 **可起草** | — |
| 3 · 失效/质量判断 | What can cause burrs on slit copper or aluminum foil? | 保留 Q6 | 按原 Q6 检查刀刃、刀组间隙、刀轴状态/对中及箔材变化，记录缺陷边与分切位置。 | C：`faqs.technical` Q6。 **可起草** | — |
| 4 · 失效/质量判断 | Why can slit widths vary even when individual knives are accurate? | 新增，吸收原工程卡 | 区分单件轴向宽度 W 与成品切点位置；结合实际刀片—隔套排列及 stack drawing 解释准确单件为何仍需正确刀组布局。 | C：`faqs.technical` Q1,Q4；直接支持W为零件轴向宽度、切点由刀片和隔套排列确定。 **可起草** | — |
| 5 · 替换识别 | Are bare-foil knives and coated battery electrode knives interchangeable? | 保留 Q3 | 解释裸铜铝箔与涂布电极的料层和切边要求差异，相关工况链接 Battery 页。 | C：`faqs.technical` Q3。 **可起草** | — |
| 6 · 供货/配套决定 | Can I reuse existing spacers when replacing foil slitter knives? | 原Q2保留件＋Q4刀组定位；独立回答旧隔套复用 | 说明旧隔套可以作为保留件列入替换方案：提供实际宽度、内孔、现有排列和当前 stack drawing，再确定需新购的刀片与隔套。 | C：`faqs.technical` Q2,Q4。 **可起草** | — |

**内链分工：**[Electrode](http://localhost:5173/products/lithium-battery-slitting-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 04 Steel Coil Slitting Knives

`metal-coil-slitting-knives` · 主意图：steel coil slitting knives、replacement rotary shear tooling、knife/spacer/stripper sets。与直刀横剪和废边碎断刀分工。

**当前问题：**以选择载荷、配公差、支撑带材代替具体供货能力。**选题症状（非已统计客诉）：**刃口崩口、渐进磨耗、毛刺不一致、刀组宽度偏差／带材划伤。

**证据定位：C＝`metal-coil-slitting-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-ASKO、P-BACH（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel Grades for Different Coil Loads**／按钢卷负载配置刀材 | D2、H13、PM 钢等已有选项，使磨耗和冲击取向不同的刀材可在同一采购要求下比较；不以最高硬度作为统一卖点。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Typical hardness]`。**可起草** | **U / HOLD H1**：不同材料热处理记录；不写单一材料全面优于其他材料 |
| 2. **Ground Dimensions for Knife and Spacer Stacks**／刀片与隔套组的磨削尺寸 | 原目录对 OD≤420 mm 配置列出精度选项；订货可明确刀片及配套件各自的轴向尺寸，避免把单件公差误作整组保证。 | C：`detailLayout.technicalSpecs[Precision options]`。**可起草** | **U / HOLD H2**：超出范围按图；不能把这组公差覆盖全部 OD80–680 mm |
| 3. **Slitting Knives with Companion Tooling**／刀片及相邻刀组零件 | 隔套、退料环、分隔盘已有供货资料；客户可以按现有堆叠布局列出所需件，不必把整组采购仅描述为一片圆刀。 | C：`detailLayout.technicalSpecs[Tooling]`；`faqs.technical` Q2。**可起草** | **U / HOLD H2/H8**：实际成套检验／编号和供应边界；不承诺无调整安装 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | What identifies a replacement steel coil slitting knife? | 保留 Q1；吸收 Q3 名称 | 以OD、内孔、轴向宽度和刀轴接口识别圆盘纵切刀；解释rotary shear别称及其与横剪/废边碎断工位的区别。 | C：`faqs.technical` Q1,Q3。 **可起草** | — |
| 2 · 选材/表面决定 | How do coil strength and blade damage affect knife material selection? | 调整原 Q4 | 结合钢卷强度、厚度、加工条件及渐进磨耗/崩口，区分当前材料选择问题。 | C：`faqs.technical` Q4。 **可起草** | — |
| 3 · 失效/质量判断 | Why do coil slitting knives chip instead of wearing gradually? | 新增，故障 | 研究负荷、刃口接触和材料韧性与崩口的关系，建立和渐进磨耗不同的排查路径。 | C：`faqs.technical` Q4,Q6；仅支持区分磨耗/崩口及现有排查因素；具体崩口机制待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 4 · 失效/质量判断 | What causes burrs or uneven slit edges on a coil line? | 保留 Q6 | 按原 Q6 对照磨损、间隙、重叠、刀轴和钢卷变化，记录缺陷在分切布局中的位置与方向。 | C：`faqs.technical` Q6。 **可起草** | — |
| 5 · 替换识别 | How should knife and spacer tolerances be specified for a complete stack? | 调整 Q5 | 分别定义个体宽度与整组累计要求，并考虑内孔、端面和相互配合；精度选项保留原OD≤420 mm范围。 | C：`faqs.technical` Q5。 **可起草** | — |
| 6 · 供货/配套决定 | Can Sureay supply knives, spacers, stripper rings and separator discs together? | 保留 Q2 | 直接说明刀片、隔套、退料环和分隔盘四类现有供货；按实际排列及保留件分别列数量询价。 | C：`faqs.technical` Q2。 **可起草** | — |
| 7 · 选材/表面决定 | How do I compare the cost of different coil slitter knife materials? | 新增，采购 | 拟建立单价、实际磨耗、维护余量与停线成本的比较框架；需要核对适用条件和计算示例。 | C：`detailLayout.technicalSpecs[Material]`；`faqs.technical` Q4；仅支持材料选项和磨耗差别；成本计算框架是EDITORIAL方法提案。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |

**内链分工：**[Scrap Chopper](http://localhost:5173/products/scrap-chopper-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 05 Battery Electrode Slitting Knives

`lithium-battery-slitting-knives` · 主意图：coated anode/cathode electrode slitting knife pairs。避免把裸箔、隔膜及电池回收刀混在同一页。

**当前问题：**三卡是描述电极、匹配刀对、检查切边。**选题症状（非已统计客诉）：**毛刺、涂层掉粉／边部损伤、微崩口、上下刀配合不稳定。

**证据定位：C＝`lithium-battery-slitting-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-DIENES-battery（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide Configurations for Coated Electrodes**／涂布电极的硬质合金配置 | 目录明确WC-Co与电极刀位，可按现有构造及实际牌号要求询价电极替换刀。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Electrode grades]`。**可起草** | **U / HOLD H6**：四个牌号与91–93 HRA的对应关系；不新增统一硬度结论。 |
| 2. **Ground Cutting Faces and Optional DLC or TiN**／精磨刀面与 DLC/TiN 选项 | 现有镜面、刀厚与跳动要求，以及 DLC/TiN 可选项，可作为电极刀对的具体订单配置；刀具指标与客户毛刺/掉粉验收分别定义。 | C：`detailLayout.technicalSpecs[Edge finish]`；`detailLayout.technicalSpecs[Optional Coatings]`；`detailLayout.technicalSpecs[Thickness tolerance]`；`detailLayout.technicalSpecs[Runout]`。**可起草** | **U / HOLD H2/H3/H8**：不把数值等同毛刺高度、零掉粉或电芯安全保证 |
| 3. **Upper and Lower Knives for Electrode Stations**／电极工位上下刀供应 | 现有 Mounting 与定制 FAQ 支持按工位定义上、下刀；客户可以询价配对替换，也可以保留可用件、采购所需刀位。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2；`faqs.technical` Q4。**可起草** | **U / HOLD H2/H8**：刀对检验和配套标识；不延伸为整机良率保证 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | How do I identify a replacement upper and lower electrode knife pair? | 保留 Q1 | 以各刀位、内孔、宽度、轮廓和安装关系识别上下刀，并加入实际涂布电极结构。 | C：`faqs.technical` Q1。 **可起草** | — |
| 2 · 失效/质量判断 | How should current wear guide carbide selection for coated electrodes? | 将原 Q6 材料部分独立 | 沿用原 Q6 的磨耗状态、电极结构和验收要求，将基体牌号与表面配置分别提出。 | C：`faqs.technical` Q6。 **可起草** | 本题仅按现有磨耗/电极结构提出牌号要求；H6跨牌号统一硬度和新微崩口机制已剔除。 |
| 3 · 失效/质量判断 | What can cause burrs, dust or coating damage at the electrode edge? | 保留 Q5 | 对照刀刃、几何、配对对中和电极结构，分别观察集流体边缘与涂层、单侧与多个切点。 | C：`faqs.technical` Q5。 **可起草** | — |
| 4 · 失效/质量判断 | Why does a carbide electrode knife develop micro-chips? | 新增，故障 | 研究微崩口与刃口接触、支撑/安装及硬质合金构造的关系，明确需要的证据。 | C：`faqs.technical` Q5,Q6；仅支持刀口、对中与磨耗观察；微崩口机制待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 5 · 选材/表面决定 | When are DLC or TiN coatings worth considering? | Q6 表面部分拆出 | 说明DLC/TiN是与基体牌号和几何分别定义的可选要求；结合现有磨耗与电极结构提出选择资料。 | C：`faqs.technical` Q6。 **限定起草** | C原Q6限基体和涂层分开指定；H3具体组合及使用收益待核；本轮答案仅展开原目录支持部分。 |
| 6 · 供货/配套决定 | Can Sureay supply a custom knife pair or replace only the upper knife? | 合并 Q2＋Q4 | 说明定制上下刀对与单补上刀两种采购方式；保留下刀的尺寸、轮廓、状态及重磨历史一并明确。 | C：`faqs.technical` Q2,Q4。 **可起草** | — |
| 7 · 名称/结构识别 | Are electrode slitter knives the same as bare copper or aluminum foil knives? | 保留 Q3 | 用涂布阳极/阴极与裸铜铝箔的结构和切边要求区分工位，链接裸箔页。 | C：`faqs.technical` Q3。 **可起草** | — |

**内链分工：**[裸箔](http://localhost:5173/products/metal-foil-strip-slitter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 06 Corrugated Slitter-Scorer Blades

`corrugated-slitter-scorer-blades` · 主意图：corrugator dry-end thin blades、BHS/Fosber replacement slitter knives。不是压线轮，也不是下游开槽弧刀。

**当前问题：**安装孔、磨刀站、工位识别都属于 FAQ。**选题症状（非已统计客诉）：**切边起毛、薄刀崩口、磨刀后切边恶化、孔型或刃位不符。

**证据定位：C＝`corrugated-slitter-scorer-blades`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-BHS、P-KAMADUR-razor（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide Material Options for Corrugator Slitting**／瓦线纵切用硬质合金选项 | 目录列WC-Co材料；客户可提交原刀牌号与板材条件，确定所需替换配置。 | C：`detailLayout.technicalSpecs[Material]`。**可起草** | **U / HOLD H1/H6**：HIP 为目录已有，需工艺／供应记录后才提升成工厂核心能力；不加淬火 |
| 2. **Solid and Split Blade Constructions**／整体与分体薄刀结构 | Blade options明确solid disc / split construction；买家可按原刀站订购对应刀体结构。 | C：`detailLayout.technicalSpecs[Blade options]`。**可起草** | **U / HOLD H7**：OD15–340与原尺寸表、约0.3 mm Edge Apex 的含义；新卖点不引用二者。 |
| 3. **Custom Bores and Mounting Patterns**／定制内孔与安装孔槽 | Mounting 明确平孔、固定孔阵与槽式安装；按原刀图定义接口，客户可以就特定刀站采购替换件，不据 BHS/Fosber 名称宣称互换。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q3。**可起草** | **U / HOLD H8**：不仅凭 BHS/Fosber 品牌写通配；各分体结构适配待图纸 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | How do I identify the correct replacement corrugator slitter blade? | 保留 Q1 | 用机型/件号、OD、孔、厚度、固定形式和整体/分体结构识别替换刀。 | C：`faqs.technical` Q1。 **可起草** | — |
| 2 · 替换识别 | Do BHS and Fosber slitter blades interchange? | 保留原 Q2 | 把完整刀体和安装图作为互换判断依据，逐项对照内孔、孔槽、厚度及切削轮廓。 | C：`faqs.technical` Q2。 **可起草** | — |
| 3 · 材料选择 | Why is tungsten carbide used for corrugated slitter-scorer blades? | 保留 Q5 | 解释目录已有硬质合金的耐磨用途，结合当前磨耗、崩口和磨刀安排提出牌号选择条件。 | C：`faqs.technical` Q5。 **可起草** | — |
| 4 · 失效/质量判断 | Why does corrugated board show rough edges after slitting? | 新增，故障 | 研究瓦楞板毛边与刃口、支撑、磨削和板材状态的关系，并找对应整机维护说明。 | C：`faqs.technical` Q5,Q6；仅支持磨耗/崩口与磨刀部件检查；毛边因果待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 5 · 失效/质量判断 | What should be checked when matching a blade to the automatic sharpening unit? | 调整 Q6 | 沿用原 Q6：检查刀型、剩余直径、磨削件磨损/对中以及整机手册的设置和使用限值。 | C：`faqs.technical` Q6。 **可起草** | — |
| 6 · 替换识别 | Can Sureay reproduce a corrugator blade with a specific mounting pattern? | 调整原 Q3；吸收旧候选8的有效验收信息 | 说明按图定制孔、孔阵、槽和轮廓的现有能力；原件号/样件用于识别，保留每配置数量。 | C：`faqs.technical` Q3。 **可起草** | C原Q3已支持按图定制，故公司服务问法可保留；H4/H5的随货文件、签样和首件政策已剔除。 |
| 7 · 名称/结构识别 | Are slitter-scorer blades the same as scoring wheels or slotter knives? | 保留 Q4 | 区分纵向分切、压线和下游开槽三种工位；开槽采购链接 Corrugated Slotter。 | C：`faqs.technical` Q4。 **可起草** | — |

**内链分工：**[Slotter](http://localhost:5173/products/corrugated-slotter-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 07 Nonwoven Slitter Knives

`nonwoven-slitter-knives` · 主意图：nonwoven fabric slitting knives，spunbond/meltblown/SMS 与纤维切边。区别成卷 Nonwoven Log Saw 横断。

**当前问题：**三条主题有价值，但 400 m/min、消除吸纤及完整医用批次文件等仍需证据。**选题症状（非已统计客诉）：**毛边／游离纤维、刀面积纤、刃口磨耗、局部崩口。

**证据定位：C＝`nonwoven-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-DIENES-nonwoven、P-DIENES-guide（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Material Options for Nonwoven Cutting**／非织造布刀材选项 | 目录列 M2、D2、52100 与硬质合金；买家可围绕磨耗或崩口选不同刀材，保留原网材和刀架作为比较条件。 | C：`detailLayout.technicalSpecs[Materials]`；`detailLayout.technicalSpecs[Hardness]`。**可起草** | **U / HOLD H1**：各钢种热处理、而非所有材料同一工艺 |
| 2. **Defined Edge Profiles and Optional Surface Treatments**／刃型与可选表面处理 | 现有刃角/前角、表面要求及 PTFE、TiN、DLC、ESD 选项，使几何和表面处理可分别指定；具体组合与效果另核，不将一组角度用于所有网材。 | C：`detailLayout.technicalSpecs[Geometry]`；`detailLayout.technicalSpecs[Rake Angle]`；`detailLayout.technicalSpecs[Surface Finish]`；`detailLayout.technicalSpecs[Optional Coatings]`；H3：可写几何与表面选项，角度适用工况及组合效果待核。**限定起草** | **U / HOLD H3/H8**：不写一个角度覆盖所有克重线速；ESD 效果需条件与检测，不能保证消除积纤 |
| 3. **Custom Interfaces for Existing Knife Holders**／现有刀架的定制接口 | Interface列H7内孔与螺钉锁紧，原Q2支持轮廓定制；客户可按刀架所需孔、截面和工作刃采购替换配置。 | C：`detailLayout.technicalSpecs[Interface]`；`faqs.technical` Q2。**可起草** | **U / HOLD H4**：CoC、材质/硬度/尺寸报告及批次服务，已从本条拟稿移出。 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | Which replacement knife fits my nonwoven slitting holder? | 合并 Q1＋Q3 | 按shear/crush方法、刀架与配合件识别替换刀，再加网材结构和克重等工况资料。 | C：`faqs.technical` Q1,Q3。 **可起草** | — |
| 2 · 失效/质量判断 | How should knife material be chosen when nonwoven edges fray or wear increases? | 调整原 Q6 | 结合网材、刀对稳定性以及磨耗/崩口状态作材料选择；原 Q4 的切边信息用于区分当前问题。 | C：`faqs.technical` Q4,Q6。 **可起草** | — |
| 3 · 失效/质量判断 | What can cause fraying or loose fibres during nonwoven slitting? | 保留 Q4 | 沿用原 Q4 的刃口磨损、几何、支撑和设置因素，比较正常生产条件下的切边与工作件。 | C：`faqs.technical` Q4。 **可起草** | — |
| 4 · 失效/质量判断 | Does fibre buildup always require an antistatic coating? | 保留 Q5 | 分别检查残留、刃口、网材输送和切削设置，再决定是否属于导电涂层适用的问题。 | C：`faqs.technical` Q5。 **可起草** | — |
| 5 · 选材/表面决定 | How should custom nonwoven knife profiles and coatings be specified? | 保留 Q2 | 在订单中分别定义刀体几何、基材和涂层，以便比较轮廓或表面变更。 | C：`faqs.technical` Q2。 **可起草** | — |
| 6 · 选材/表面决定 | Which material and dimensional requirements matter for hygiene-converting knives? | 保留原 Q7 的采购要求；撤回上一稿公司供报告问法 | 将材料识别、硬度、尺寸检查、批次及订单关联写成买家可约定的采购要求。 | C：`faqs.technical` Q7。 **可起草** | 本题是买家采购/验收要求；H4供文件服务、成品卫生或医疗资质已剔除。 |
| 7 · 维护条件 | When should nonwoven slitter knives be sharpened or replaced? | 新增，维护 | 研究切边、磨损、可磨余量与配合尺寸如何决定磨刀或换新。 | C：`faqs.technical` Q4,Q6；仅支持切边与磨损/崩口检查；可重磨条件及余量待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |

**内链分工：**[Nonwoven Log Saw](http://localhost:5173/products/nonwoven-log-saw-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 08 Bottom Grooved Anvil Knives

`bottom-grooved-anvil-knives` · 主意图：单个底环槽形／工作肩、NN/NG/NS 锁紧替换。多切点 pitch／整体布局交由 Multi-Groove 页；不能把“单环”简单定义成只能一槽。

**当前问题：**三条恰好是原 Q1/Q3/Q4 的教程。**选题症状（非已统计客诉）：**上刀换新后仍有毛边、工作肩磨圆、积胶、安装面／孔配合导致偏摆。

**证据定位：C＝`bottom-grooved-anvil-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-DIENES-grooved、P-TKM-life（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide Anvil Configurations**／钢制与硬质合金底刀构造 | 目录有钢制、整体/镶硬质合金以及表面选项；下刀订单可区分工作刃材料、刀体构造和涂层，不把它们混成单一升级包。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Optional Coatings]`。**可起草** | **U / HOLD H3/H8**：材料－表面实际组合；原减粘60–80%和连续8–12小时不能直接恢复 |
| 2. **Ground Grooves, Bores and Locating Faces**／槽形、内孔与定位面磨削 | 目录分别列槽宽、H6 孔、端面平面度及跳动要求；买家可同时定义工作肩和安装面的零件要求，不能把平面度写成平行度。 | C：`detailLayout.technicalSpecs[Groove width tolerance]`；`detailLayout.technicalSpecs[Face flatness]`；`detailLayout.technicalSpecs[Bore tolerance]`；`detailLayout.technicalSpecs[Runout]`；H2：可写定位面与工作肩磨削，H6孔等指标适用配置待核。**限定起草** | **U / HOLD H2**：适用图纸及批次记录；不将 flatness 偷换为 parallelism，也不推导成品条宽精度 |
| 3. **Custom Groove Profiles and Locking Designs**／槽型与锁紧结构定制 | 现有 NN/NG/NS 与 split/clamp、槽形和工作刃位置；替换件可以按原刀轴接口和所需工作轮廓询价，品牌叫法不构成授权或通配声明。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q2。**可起草** | **U / HOLD H2/H8**：具体结构配套供应及刀对验收；不写全品牌直接安装 |

**Technical FAQs：6 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | What defines a replacement grooved bottom anvil knife? | 合并原Q1＋Q5＋Q6；撤并原候选7 | 以工作肩、槽形、宽度、内孔和锁紧定义单件替换。原 Q6 的多切点区别并入末句：需要多个切点统一布局时链接Multi-Groove。 | C：`faqs.technical` Q1,Q5,Q6。 **可起草** | — |
| 2 · 名称/结构识别 | What do NN, NG and NS locking types mean? | 保留原 Q4 | 按DIENES原厂名称解释NN＝smooth bore（光孔），NG＝eccentric locking，NS＝screw locking，并说明各自结构含义。 | C：`faqs.technical` Q4；P：P-DIENES-grooved，参数表Typ行 / Different locking procedures，2026-11-17复读；直接支持三种名称及锁紧结构。 **可起草** | 名称属于DIENES产品体系；跨厂家通用件号、尺寸互换及OEM授权不在证据范围。 |
| 3 · 失效/质量判断 | Why can paper slit quality remain poor after the top knife is replaced? | 新增，故障 | 说明上刀已换而切边仍差时下刀工作面、刀对与刀架的排查路径。 | C：`faqs.technical` Q1,Q2；P：P-TKM-life，原因列表及材料配合段（2026-11-17复读）。支持范围：纸品剪切刀对、刀架/设置等一般因素；胶带等其他工况的扩展因果待证。 **限定起草** | 纸品剪切刀对、刀架/设置等一般因素；胶带等其他工况的扩展因果待证；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 4 · 选材/表面决定 | Which material or coating suits an anvil knife used with adhesive webs? | 新增，选型 | 研究胶黏网材中工作肩材料和TiN/DLC/PTFE的选择条件，结合实际胶料接触与磨耗。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Optional Coatings]`；仅支持材料和涂层选项；胶料对应选材/涂层效果待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 5 · 供货/配套决定 | Can Sureay supply a custom anvil ring without replacing the top knife? | 扩展 Q2＋线上单件采购主题 | 说明按原轴定制内孔、环宽、槽形、工作刃和锁紧；保留上刀时提交其已知尺寸与配合关系。 | C：`faqs.technical` Q2。 **可起草** | — |
| 6 · 替换识别 | Can a razor support sleeve replace a shear-slitting anvil? | 保留 Q3 | 解释razor support sleeve提供刀片间隙、shear anvil提供配合切削刃，两种工作轮廓对应不同切法。 | C：`faqs.technical` Q3。 **可起草** | — |

**内链分工：**[Multi-Groove切点布局](http://localhost:5173/products/groove-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 09 Tungsten Carbide Slitter Knives

`tungsten-carbide-slitter-knives` · 主意图：carbide slitter knives、solid vs tipped、grade/construction。应用尺寸继续由纸／箔／电极／钢卷页解释，不能建立重复应用介绍集合。

**当前问题：**牌号与构造价值退化为选择步骤；原站也有未经核实的成本／寿命倍数。**选题症状（非已统计客诉）：**微崩口、冲击碎裂、磨钝、重磨后的尺寸／刃型不符。

**证据定位：C＝`tungsten-carbide-slitter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-BACH-carbide、P-TKM-bottom（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Solid and Carbide-Tipped Knife Configurations**／整体与镶硬质合金构造 | 当前目录同时列整体和钢体工作刃环；客户可以按现有刀座、受力和采购要求选择构造，不只购买泛称“carbide”的零件。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Construction]`；`detailLayout.technicalSpecs[Fine-grain options]`。**可起草** | **U / HOLD H6**：牌号／晶粒／结合相实际资料；这里不写钢刀热处理，也不把牌号跨厂等同 |
| 2. **Ground Edge Forms with Optional Coatings**／磨削刃形与涂层选项 | 单/双刃、空磨/razor 与当前表面选项可依刀图定义；买家能把刃口形状和材料/涂层分开指定。原公差保留，但不外推全部结构或每件报告。 | C：`detailLayout.technicalSpecs[Edge Geometry]`；`detailLayout.technicalSpecs[Edge finish]`；`detailLayout.technicalSpecs[Precision options]`；`detailLayout.technicalSpecs[Optional Coatings]`。**可起草** | **U / HOLD H2/H3/H4**：参数适用构造；不写“全部使用相同工艺”“每刀必附报告” |
| 3. **Custom Carbide Knives for Existing Slitters**／现有分切工位的硬质合金定制刀 | 原 Q1/Q6 支持按尺寸及机型工位定制；刀位、孔型、截面及实际材料要求共同确定替换件，不由镶刃构造推导钎焊或翻新服务。 | C：`faqs.technical` Q1；`faqs.technical` Q6。**可起草** | **U / HOLD H9**：是否提供钎焊、翻新或重磨服务须分开确认，不由镶刃结构推导自产工序 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 名称/结构识别 | What is the difference between solid carbide and carbide-tipped knives? | 保留 Q2 | 比较整体硬质合金与钢体镶刃/刃环的构造，说明在采购时应明确刀体和工作刃形式。 | C：`faqs.technical` Q2。 **可起草** | — |
| 2 · 选材/表面决定 | When should I choose carbide instead of HSS or tool steel slitter knives? | 调整 Q4 | 沿用原 Q4：依据实际磨耗或崩口、刃口几何及工作条件讨论材料；装配和支撑一同考虑。 | C：`faqs.technical` Q4。 **可起草** | — |
| 3 · 选材/表面决定 | Are YG6, YG8 and similarly named carbide grades interchangeable? | 调整 Q5 | 说明供应商牌号、晶粒、结合相和用途共同定义材料，采购时按实际要求核对。 | C：`faqs.technical` Q5。 **可起草** | — |
| 4 · 失效/质量判断 | Why does a carbide slitter knife chip before it wears out? | 新增，故障；吸收 Q4 | 研究硬质合金刃口接触、冲击、支撑与微崩损之间的关系，区分不同损伤特征。 | C：`faqs.technical` Q4；仅支持磨耗/崩口区分及支撑、设置的选材条件；具体崩口机制待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 5 · 替换识别 | Should carbide slitter knives be coated or left uncoated? | 保留 Q7 | 比较目录中的未涂层及可选DLC/TiN/TiAlN要求，依据基体、加工材料与当前磨耗确定讨论范围。 | C：`faqs.technical` Q7。 **可起草** | — |
| 6 · 供货/配套决定 | Can custom carbide knives be made for an existing slitter? | 合并 Q1＋Q6；吸收 Q3 | 说明现有按图定制能力，明确刀位、构造、内孔、截面、工作刃、配合件及数量；别名放在工位识别中解释。 | C：`faqs.technical` Q1,Q3,Q6。 **可起草** | — |
| 7 · 维护条件 | Can carbide slitter knives be reground? | 新增，一般维护 | 研究整体/镶刃结构的重磨条件、损伤边界和剩余几何要求，查对应原厂维护章节。 | C：`faqs.technical` Q2；`detailLayout.technicalSpecs[Construction]`；仅支持整体/镶刃结构差别；可重磨条件和方法待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |

**内链分工：**[薄箔应用](http://localhost:5173/products/metal-foil-strip-slitter-knives)；[电极应用](http://localhost:5173/products/lithium-battery-slitting-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 10 Slitter Rewinder Bottom Knives

`slitter-rewinder-bottom-knives` · 主意图：rewinder bottom bands/lower/female knives、杯形／法兰／可换刃环替换。Paper Slitter 页负责纸种与刀对；Multi-Groove 页负责多切点布局。

**当前问题：**识别机型、选择工作面、选整体或镶刃属于采购指导。**选题症状（非已统计客诉）：**下刀工作面磨损、刃口崩口、换下刀后切边仍差、重磨后安装／切点改变。

**证据定位：C＝`slitter-rewinder-bottom-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-TKM-bottom、P-DIENES-bottom（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide Working-Edge Options**／钢与硬质合金工作刃 | 现有整体钢、整体硬质合金和钢体 WC-Co 选项；同一复卷机下刀采购可区分刀体与工作刃构造，避免把不同结构当同一件。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Carbide options]`。**可起草** | **U / HOLD H1/H8**：钢材热处理和镶嵌工艺范围；不能凭材料名保证寿命 |
| 2. **Cup, Double-Edge and Replaceable-Ring Designs**／杯形、双刃与可换刃环结构 | Profiles 明列三类工作面结构；客户可采购原组件需要的刀体或可换环配置，不表示任何旧机都能改装可换刃环。 | C：`detailLayout.technicalSpecs[Profiles]`；`detailLayout.technicalSpecs[Face finish]`。**可起草** | **U / HOLD H2/H9**：不新增精度数字／通用可重磨次数；可换刃环不等于所有机型可升级 |
| 3. **Custom Mounting Interfaces for Rewinders**／复卷机安装接口定制 | 当前法兰、键孔、平孔及旧机按图 FAQ，可把安装面/孔型与工作面一起定义；标准表之外的旧机零件也可进入具体图纸询价。 | C：`detailLayout.technicalSpecs[Mounting]`；`faqs.technical` Q3。**可起草** | **U / HOLD H2/H8**：特定老机型匹配案例、单件配合检验范围 |

**Technical FAQs：6 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | Which replacement bottom knife fits my slitter rewinder? | 保留 Q1；吸收 Q2 | 以法兰/孔型、宽度、工作面和刀位识别替换件；解释bottom band、lower及female采购名称。 | C：`faqs.technical` Q1,Q2。 **可起草** | — |
| 2 · 供货/配套决定 | Can custom bottom knives be supplied for an older rewinder without replacing the upper knife? | 合并原 Q3＋Q6；吸收旧候选7 | 按图/样件定义旧机下刀的孔、法兰、工作宽度和轮廓；保留上刀尺寸及重磨历史，分别列配置数量。 | C：`faqs.technical` Q3,Q6。 **可起草** | — |
| 3 · 名称/结构识别 | How do cup, double-edge and replaceable-ring bottom knives differ? | 保留原 Q4；并入原 Q5 的分流信息 | 独立解释cup的成形刀体、double-edge的两个工作面和replaceable-ring的刃环/支撑分体结构；多切点布局只在末句链接Multi-Groove。 | C：`faqs.technical` Q4,Q5。 **可起草** | 主体解释三种结构；Multi-Groove仅一句分流，保留原Q5信息。 |
| 4 · 选材/表面决定 | Should a rewinder bottom knife use steel, solid carbide or a carbide edge? | 新增，选型 | 比较现有钢、整体硬质合金与钢体WC-Co构造；提出与保留上刀共同考虑材料的采购要求。 | C：`detailLayout.technicalSpecs[Material]`；`detailLayout.technicalSpecs[Carbide options]`；`faqs.technical` Q6；P：P-TKM-life，材料配合段（2026-11-17复读）。支持范围：P仅支持纸品剪切中材料与刀对共同考虑；C支持现有三类构造，其他基材及各构造特定收益仍待证。 **限定起草** | P仅支持纸品剪切中材料与刀对共同考虑；C支持现有三类构造，其他基材及各构造特定收益仍待证；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 5 · 失效/质量判断 | Why is the paper edge still poor after replacing a bottom knife? | 新增，故障 | 说明下刀换新后仍有纸边缺陷时保留上刀、刀架、设置和工作面的排查顺序。 | C：`faqs.technical` Q6；P：P-TKM-life，原因列表/How to improve life-time（2026-11-17复读）。支持范围：纸品剪切的刀对、刀架、设置与磨削因素；回答检查条件而非现场诊断。 **可起草** | 纸品剪切的刀对、刀架、设置与磨削因素；回答检查条件而非现场诊断；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 6 · 维护条件 | When can a rewinder bottom knife be reground rather than replaced? | 新增，一般维护 | 说明不同工作面结构的可重磨条件、损伤判据及剩余尺寸要求。 | C：`faqs.technical` Q3,Q6；P：P-DIENES-guide，印刷页10底刀退让磨削位置、30–31 Knife Regrinding（2026-11-17复读）。支持范围：存在可重磨设计及恢复几何原则；各杯形/可换环余量须对应图纸。 **限定起草** | 存在可重磨设计及恢复几何原则；各杯形/可换环余量须对应图纸；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |

**内链分工：**[Paper材料/刀对](http://localhost:5173/products/rotary-slitter-knives-paper)；[Multi-Groove布局](http://localhost:5173/products/groove-bottom-knives)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 11 Corrugated Slotter Knives

`corrugated-slotter-knives` · 主意图：printer-slotter/flexo folder-gluer male/female slotter knives、弧刀和配套垫圈。不是干端薄圆纵切刀。

**当前问题：**三卡讲平／齿刃选择、配母刀与隔套、识别工位；可售的弧形和组件能力应在优势中。**选题症状（非已统计客诉）：**开槽毛边／撕裂、弧刀崩口、槽宽不稳、公母刀偏磨。

**证据定位：C＝`corrugated-slotter-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-KAMADUR-slotter、P-CRI（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17当前URL返回404，Engineering Advantages为NOT FOUND；本页按本地C及P资料提出新选题，不声称恢复已核线上原文。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Materials Selected by Male and Female Knife Position**／按公母刀位配置材料 | 当前钢材及镶硬质合金母刀有不同供货对象；客户可分别指定公刀和母刀构造，不把镶合金能力扩到所有公刀。 | C：`specs[Material]`；`specs[Typical hardness]`。**可起草** | **U / HOLD H1**：不能把镶硬质合金母刀推成所有公刀可做；各钢种热处理范围待核 |
| 2. **Plain and Serrated Arcs with Custom Mounting**／平刃/齿刃弧刀及安装加工 | 已有平/齿刃、分段弧形、孔/沉孔/弧槽；按具体刀头的半径、弧角和手向采购，不仅按一个长度找通用刀。 | C：`specs[Male blade]`；`specs[Mounting]`。**可起草** | **U / HOLD H8**：不承诺齿刃统一减少撕裂，或所有刀段同一材质 |
| 3. **Male Knives, Female Knives and Matching Spacers**／公母刀及配套隔套 | 目录已有两片母刀与匹配隔套，原 FAQ 支持单件或配套采购；同一报价可明确哪些件换新、哪些件保留。 | C：`specs[Female assembly]`；`faqs.technical` Q2；`faqs.technical` Q5。**可起草** | **U / HOLD H2**：配对验收、间隙及完整刀头附件范围需订单证明 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 替换识别 | How are replacement slotter knives matched to a box converting machine? | 保留 Q1；吸收 Q6 | 识别printer-slotter/folder-gluer工位及公弧刀、母刀、隔套；按弧形、厚度、孔位和手向确定部件。 | C：`faqs.technical` Q1,Q6。 **可起草** | — |
| 2 · 名称/结构识别 | What is the difference between male and female slotter knives? | 保留 Q2 | 解释公刀进入母刀组件、母刀两侧与隔套形成配合开口，分别标明替换位置。 | C：`faqs.technical` Q2。 **可起草** | — |
| 3 · 替换识别 | Should I choose a plain or serrated male slotter blade? | 保留 Q4 | 按原刀头设计、槽型、纸板和配合母刀选择现有平刃或齿刃构造。 | C：`faqs.technical` Q4。 **可起草** | — |
| 4 · 失效/质量判断 | Why do corrugated slots have torn edges or uneven widths? | 新增，故障 | 研究槽边撕裂或宽度不均与刀刃、母刀开口/隔套、装配及纸板状态的关系。 | C：`faqs.technical` Q2,Q4,Q5；仅支持公母刀/隔套配合和板材条件；撕裂/宽差机制待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 5 · 替换识别 | When should a carbide-tipped female slotter knife be considered? | 新增，部件特定选材 | 研究已列镶硬质合金母刀在何种磨耗和配合条件下值得考虑。 | C：`specs[Material]`；`specs[Female assembly]`；仅支持镶硬质合金母刀及组件供货；选用工况/磨耗收益待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 6 · 供货/配套决定 | Can custom slotter arcs be made from a drawing or sample? | 保留原 Q3；并入旧候选8的接口要求 | 说明可按图/样件定制半径、弧角、厚度、孔槽和手向；区分磨损样件与新尺寸，保留配合资料及数量。 | C：`faqs.technical` Q3。 **可起草** | — |
| 7 · 替换识别 | Must male and female slotter knives be replaced together? | 保留 Q5 | 说明公刀、母刀与隔套可单独询价；按保留件状态与实际配合几何决定替换范围。 | C：`faqs.technical` Q5。 **可起草** | — |

**内链分工：**[Slitter-Scorer](http://localhost:5173/products/corrugated-slitter-scorer-blades)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 12 Paper Straw Cutting / Slitting Blades

`paper-straw-slitting-blades` · 主意图：成形纸吸管的cut-off/trimming circular knives。URL保持；平纸条纵切去Paper Slitter，不为名称含slitting而改变工位。

**当前问题：**刀站识别、积胶检查和管壁配刃均是FAQ题。**选题症状（非已统计客诉）：**吸管端口毛边、压扁／变形、积胶、刃口磨耗／崩口。

**证据定位：C＝`paper-straw-slitting-blades`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-HMK（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

**本页证据限制：**现有问答以C为主要基础，外部技术佐证有限。HMK本轮仅补到圆形硬质合金吸管刀的用途；不为本页材料比较、故障或维护解释背书。第3题收窄回原Q4，第6题保留为待补证。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Carbide, HSS and Ceramic Material Options**／硬质合金、高速钢及陶瓷选项 | 目录列细晶硬质合金、M2 与氧化锆；成形吸管切断工位可按原结构和实际磨耗比较材料，不套纸幅纵切刀方案。 | C：`detailLayout.technicalSpecs[Material]`。**可起草** | **U / HOLD H1/H8**：氧化锆、硬质合金不套钢刀热处理；不承诺食品接触认证 |
| 2. **Custom Cutting Edges and Optional Coatings**／定制工作刃与可选涂层 | 现有刃型和 DLC/TiN/TiAlN/CrN 选项；客户可分别约定刃口几何与表面配置，不把涂层当解决压扁/积胶的一项通用承诺。 | C：`detailLayout.technicalSpecs[Optional Coatings]`；`faqs.technical` Q3。**可起草** | **U / HOLD H3/H8**：所有材料与镀层组合并非默认可用；不写零毛边／不积胶 |
| 3. **Replacement Knives for Formed-Straw Cut-Off**／成形吸管切断的替换刀 | 现有 cut-off/trim 定位及定制孔/截面/工作刃支持具体刀站询价；避免把前端平纸条分切尺寸用于成形管切断。 | C：`detailLayout.technicalSpecs[Applications]`；`faqs.technical` Q1；`faqs.technical` Q3。**可起草** | **U / HOLD H5/H8**：特定机型适配、新样试切及配套服务范围待确认 |

**Technical FAQs：6 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 供货/配套决定 | Can Sureay make a replacement knife for my paper straw cutting station? | 合并原 Q1＋Q3 | 说明按图/样件定制内孔、厚度和工作刃；以成形管切断刀位、原材质、管壁结构及数量建立报价。 | C：`faqs.technical` Q1,Q3。 **可起草** | — |
| 2 · 名称/结构识别 | Are paper straw cutting blades the same as paper slitter knives? | 保留 Q2 | 区分成形纸吸管切断/修边与连续平纸幅纵切，名称解释放FAQ。 | C：`faqs.technical` Q2。 **可起草** | — |
| 3 · 失效/质量判断 | How should blade wear guide paper straw knife material selection? | 保留原 Q4，改为工况决策 | 回到原 Q4 的选择条件：刀站、用旧刀状态、渐进磨耗、崩口与积胶分别比较，保留安装几何。 | C：`faqs.technical` Q4。 **可起草** | 仅采用C原Q4条件；HMK不支持HSS/陶瓷比较，管壁变形不能推为材料因果。 |
| 4 · 失效/质量判断 | Why are paper straw ends ragged or distorted? | 保留 Q5 | 沿用原 Q5：观察刃口、积胶、管材支撑以及纸层/壁厚/胶料状态，对比正常设置下的切口样品。 | C：`faqs.technical` Q5。 **可起草** | C原Q5仅支持观察和比较；故障优先级、量化阈值及解决效果尚无逐题P证据。 |
| 5 · 失效/质量判断 | What should guide coating selection when adhesive builds up on straw knives? | 调整 Q6 | 按原 Q6 将涂层与刀材、胶黏剂和残留形态一起选择，用原刀及生产条件对比变更。 | C：`faqs.technical` Q6。 **可起草** | C原Q6仅支持选型输入；清洁方法、镀层—胶料效果和食品认证不在证据范围。 |
| 6 · 维护条件 | When should a paper straw cutting blade be replaced? | 新增，维护 | 研究成形纸吸管刀的换新判据、刃口缺陷与允许工作尺寸。 | C：`faqs.technical` Q1,Q5；仅支持安装几何与切口观察；换新阈值和维护条件待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |

**内链分工：**[平纸纵切](http://localhost:5173/products/rotary-slitter-knives-paper)。只在相应答案需要分流时使用，不逐题重复堆链接。

## 13 Multi-Groove Bottom Knives

`groove-bottom-knives` · 主意图：multi-groove bottom knife blocks/MKB、custom pitch/slit pattern。单个环的槽形与锁紧页不重复讲全部多切点排布。

**当前问题：**三卡为排切点、规划换幅、逐刀检查；真实多槽定制及整体／分体构造没有被表达为供货价值。**选题症状（非已统计客诉）：**多位置切边不一致、工作肩磨损、节距／基准误读、夹持与定位变化。

**证据定位：C＝`groove-bottom-knives`；字段见下表。** L 的逐页读取结果见持久来源记录；可继续检索的背景入口：P-DIENES-multi、P-TKM-multi（不代表以下每题均已获支持）。

**线上核对：**L：2026-11-17取得对应页面及Engineering Advantages（HTTP 200）；原主题仅作历史对照。

| 英文优势标题／中文主题 | 拟写的可供内容与采购价值 | 证据 / 草稿状态 | 已排除的扩大主张（U / HOLD） |
| --- | --- | --- | --- |
| 1. **Steel and Carbide-Edged Working Shoulders**／钢及镶硬质合金工作肩 | 目录已有钢制和镶硬质合金工作刃；买家可按各切点负载与磨耗提出工作面配置，不给所有材料统一硬度。 | C：`detailLayout.technicalSpecs[Material options]`。**可起草** | **U / HOLD H1/H8**：热处理与工作肩耐磨数据；不能借DIENES说明变成Sureay寿命承诺 |
| 2. **Custom Pitch and Cutting-Edge Layouts**／定制节距与切点布局 | 总宽、单/双工作肩与切点按图定义；买家可订购所需分切宽度布局，切点坐标与沟槽空隙分别标注，最小 pitch 不无条件推广。 | C：`detailLayout.technicalSpecs[Groove pitch]`；`detailLayout.technicalSpecs[Cutting edges]`；`faqs.technical` Q2；`faqs.technical` Q4。**可起草** | **U / HOLD H2**：最小pitch须带配置条件；不把槽间空隙等同切点节距，不新增累计公差 |
| 3. **One-Piece and Split Mounting Designs**／整体与分体安装结构 | 目录列整体/两片式、气胀轴平孔及实轴螺钉锁；按现有刀轴和拆装空间选择结构，不直接承诺免拆轴或固定省时效果。 | C：`detailLayout.technicalSpecs[Construction]`；`detailLayout.technicalSpecs[Mounting]`。**可起草** | **U / HOLD H8**：分体是否能不拆轴换装取决于机台；不先宣称节省多少换刀时间 |

**Technical FAQs：7 条拟保留选题（含待补证）。** 原 Q 的材料/数量/图纸/配套信息随对应答案保留。

| 顺序 / 采购理由 | 英文工作问题 | 原题去向 | 拟答内容 / 研究问题 | 证据与状态 | 内部边界（不复制到英文答案） |
| --- | --- | --- | --- | --- | --- |
| 1 · 接口/验收定义 | Which dimensions define a replacement multi-groove knife block? | 合并原 Q1＋Q3 | 以切点坐标、首刃位置、总宽、工作肩和轴向基准定义整体刀块；自然解释MKB/multi-groove等采购别称。 | C：`faqs.technical` Q1,Q3。 **可起草** | — |
| 2 · 接口/验收定义 | How should groove pitch and cutting-edge positions be specified? | 保留原 Q4；并入旧候选8的验收要求 | 用同一基准量对应工作刃之间的pitch，并记录首刃位置和总宽，区分槽内空隙与切点距离。 | C：`faqs.technical` Q4。 **可起草** | — |
| 3 · 供货/配套决定 | Can Sureay make a knife block to a custom slit-width pattern? | 保留 Q2 | 说明可按图定义布局、工作刃数量、总宽及轴安装；配合上刀和每配置数量用于具体询价。 | C：`faqs.technical` Q2。 **可起草** | — |
| 4 · 替换识别 | When should I choose a split ring instead of a one-piece ring? | 保留 Q5 | 按原轴、装拆空间、接合及锁紧选择现有整体或分体构造，保持实际刀型和轴配合。 | C：`faqs.technical` Q5。 **可起草** | — |
| 5 · 失效/质量判断 | What should I check when slit quality varies across a multi-groove block? | 新增，故障 | 说明同一刀块各切点质量差异与工作肩、上刀、装配及位置的关系。 | C：`faqs.technical` Q1,Q2,Q4；P：P-TKM-multi，原因列表/How to improve life-time and cutting quality（2026-11-17复读）。支持范围：多槽刀刀对、磨削与几何因素；不能仅由位置直接断定根因。 **限定起草** | 多槽刀刀对、磨削与几何因素；不能仅由位置直接断定根因；技术条件限定在本行列明工况，H9公司磨刀/诊断服务已剔除。 |
| 6 · 失效/质量判断 | How should working-edge material be chosen when some slit positions wear faster? | 新增，工作肩特定选材 | 研究局部磨耗较快时应如何区分材料问题与切点负载/装配问题，再形成选材条件。 | C：`detailLayout.technicalSpecs[Material options]`；`faqs.technical` Q2；仅支持工作刃材料与布局；局部磨耗的材料决策机制待补证。 **EDITORIAL：新增解释未完成逐题原厂核对。** **待补证** | 研究候选；取得对应原厂章节后才能起草新增解释。原目录已有信息仍保留。 |
| 7 · 供货/配套决定 | What does an Item No. identify when ordering a replacement block? | 保留 Q6 | 说明Item No.标识目录配置或系列；定制变体再记录内孔、总宽、槽形/切点及配合上刀，保持复购一致。 | C：`faqs.technical` Q6。 **可起草** | — |

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
| H9 | Sureay承接磨刀、钎焊、翻新、现场诊断等服务 | 产品构造/维护原理不等于相应商业服务 | U / **HOLD**：有对应技术出处的一般重磨条件/故障解释仍可起草；新增机制按正文状态补证 |

上述是一次集中核对清单，不要求用户逐页重复回答。缺失数值或服务凭据记 **NOT FOUND**；不把“没找到”写成“不具备”。本轮只核对已有资料和缺口，不能宣称已完成工厂能力认证，也不采用“解锁40%”这种没有分母的估算。

### 昨日同质候选如何处理

| 页面／旧候选 | 决定 | 证据 / 状态 |
| --- | --- | --- |
| Film #8、Foil #8：可随货哪些检验文件 | 从拟保留题移出，统一H4；现有技术参数和采购数量仍留各题 | U / **HOLD**：公司服务承诺 |
| Paper #8、Coil #8、Straw #8：签样/试单/样品 | 从拟保留题移出，统一H5；不改成同义的“首件验证”尾题 | U / **HOLD**：公司政策 |
| Nonwoven旧#7：Sureay能提供什么文件 | 撤回昨日公司服务问法；恢复原Q7“采购应约定什么”的内容；公司文件范围入H4 | C原Q7的买家验收要求＝**可起草**；U供文件承诺＝**HOLD** |
| Nonwoven #8、Carbide #8：如何比较试刀 | 属一般比较方法，不因服务缺口禁写；本轮在磨耗/选材题保留同工况比较要点，不再独立占尾题 | 原目录已有部分＝**MERGE**；新增试刀比较方法需补证，不因公司服务缺口整体HOLD |
| Battery #8、Anvil #8：验收记录/验收项目 | 合并进刀位/接口及相关选择答案；不扩成“默认随货报告” | 对应原Q中的接口信息＝**MERGE**；新验收方法待补证，公司报告仍H4 |
| Corrugated #8、Slotter #8、Multi-Groove #8 | 接口/布局验收内容并入对应定制或节距题，不再独立复述识别要求 | 对应原Q已有接口/布局信息＝**MERGE**；新增验收方法需补证 |
| Rewinder #8：多槽何时合适 | 其原Q5的信息并入结构题，提供Multi-Groove链接；不在本页展开多切点布局 | C原Q5；**MERGE** |
| Carbide旧#5、Rewinder旧#5：能否重磨 | 一般原理与商业服务分开核对；本版分别为Carbide第7题和Rewinder第6题 | Carbide构造专属条件 **待补证**；Rewinder按已读DIENES原则 **限定起草**，具体余量待刀图；商业服务H9暂缓 |

“MERGE”表示信息仍在正文计划中；“HOLD”表示该公司承诺尚不进入稿件。不能用二者制造所谓多页不足6题的结论。87条是选题池数量，不是已可发布题数。每页最终6–8条需在补证、合并和英文审阅后重新验收；当前待补证题不会自动进入页面。

## 证据目录与审阅顺序

- [当前目录摘录与来源哈希](evidence/slitter-advantages-faq-2026-11-17/catalog-evidence.json)：13个ID，含原规格、结构、82题完整问答；不是运行数据源。
- [线上13页与材料核对](evidence/slitter-advantages-faq-2026-11-17/live-and-material-check.md)：本轮访问状态、区块标题、材料表与原厂来源。
- [旧版完整计划](evidence/slitter-advantages-faq-2026-11-17/plan-before-review.md)：保留104候选的历史。
- [第二轮复审前版本](evidence/slitter-advantages-faq-2026-11-17/plan-before-followup.md)：保留88题基线；本次Anvil合并后为87题。
- [此前关键词核对](../seo-audits/commercial-seo-slitter-before-2026-11-16.md)：沿用其GSC与术语资料，不冒称本轮Google PAA。
- [本轮逐条回应与三页英文样稿](slitter-claude-followup-review-2026-11-17.md)：先看Film、Paper、Bottom Grooved Anvil的9个标题/一句话说明，再审核余下10页主题。

下表以2026-11-16已有研究为起点，作为**背景检索入口**。整页出现过同一主题，不足以支持本计划某条新增机制；只有正文该行写明已读章节、访问日期与可支持主张时，才算逐题P证据。本轮逐题支持范围及未支持的内容见[来源补查记录第5–6节](evidence/slitter-advantages-faq-2026-11-17/followup-source-check.md)。没有在行内引用的其余入口仍待逐题核对，不以整页P代号替代原文定位。材料核对报告只用于收窄材料结论，不自动支持新增故障或维护解释。

| 背景入口代号 | 来源与候选位置 | 已知用途 / 仍需逐题核对 |
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
| P-DIENES-grooved | [DIENES Grooved Knives](https://www.dienes.de/en/products/bottom-knives/grooved-knives/)，参数表Typ行 / Different locking procedures；2026-11-17独立复读 | NN smooth bore（光孔）、NG eccentric locking、NS screw locking；Anvil第2题仅据此解释名称和锁紧结构 |
| P-BACH-carbide | [Bach Carbide Rotary Knives](https://bachknives.com/products/carbide-products/carbide-rotary-slitter-knives/)，产品构造 | 硬质合金材料类采购，不复制成本倍率 |
| P-TKM-bottom | [TKM Bottom Slitter Knives](https://www.tkmgroup.com/en/bottom-slitter-knives)，machine types / constructions | 下刀与钢/镶刃结构 |
| P-DIENES-bottom | [DIENES Bottom Knives](https://www.dienes.de/en/products/bottom-knives/bottom-knives/)，T-shaped / two cutting edges | 复卷机下刀结构 |
| P-KAMADUR-slotter | [KAMADUR Corrugated Blades](https://www.kamadur.com/produkte/Corrugated-blades/CONV0011/)，Also known as / sample drawings | 开槽弧刀及公母刀 |
| P-CRI | [CRI 50-inch ZLR knives](https://corrugatedreplacements.com/parts-drawings/ss/50-zlr-folder-gluer-knives/)，Male / Female tables | 机型零件分列，非全型号适配 |
| P-HMK | [HMK Paper Straws](https://www.hmkltd.co.uk/paper-straws/)，Paper Straws正文 | 旧研究超时；本轮直接HTTP读取成功，仅支持纸吸管用圆形硬质合金刀。不能支持HSS/陶瓷比较、故障机制、维护判据或Sureay能力；不挂在Straw各题上 |
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

