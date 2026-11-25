# Slitter 13 款：Engineering Advantages 与 Technical FAQs 审查计划

日期：2026-11-16。**供用户核对的选题与答案提纲，不是页面成稿或实施授权。本轮不改代码。**

## 结论与使用方法

Slitter 目前 13 页都有三张工程卡，但 12 页主要写成了选型动作；Nonwoven 仍保留产品优势方向，却有需要核实的效果与文件承诺。应恢复原站“我们能提供的产品特点 → 对采购或生产的价值”表达，保留 FAQ 的识别、选型、失效排查职责。不能仅把 Match / Check 改为更热情的动词。

建议每页选三条优势；第一条优先材料／构造，钢刀有已确认工艺时再结合热处理。硬质合金不能机械写真空淬火或深冷。第二条按本产品选择精度、工作刃或表面，第三条写具体定制／配套供货。与 Claude 框架方向一致，但不把“材料＋热处理”当所有刀型必须具有的两项事实。

下文每页给 **8 个 FAQ 候选题，按建议优先级排序**。现有标准仍是 6–8 题；标“条件启用”的题只在取得可直接回答的资料后加入。没有独立信息时用 6–7 题，不为满足 5＋3 比例把同一组工厂／样品／MOQ 话术铺到 13 页。采购属性、同义词、故障和选材优先；检验与试单应结合本刀型真正需要的采购验证。

每行“原 Q”指本文末尾的**本地当前 FAQ 索引**，不是线上旧题。合并并不丢掉原答案中的有用信息。所有英文问题都是供讨论的工作标题，中文是拟答要点，没有在此承诺样品、交期或逐批报告。

### 证据等级

- **目录已有**：当前 `blades.ts` 的材料、结构、尺寸与 FAQ；可继续用作选题基础，原值不删除。并不表示本轮取得了工厂图纸或检验报告。
- **线上原有**：Sureay 现网既有营销声明。保留主题与采购价值；其中效果倍数、全检、库存与交期单独核实，不整块回滚。
- **厂家资料**：用于名称、工位、结构与问题相关性，不能证明 Sureay 有相同制造或服务能力。
- **待确认**：尚无具体记录的工艺、范围、量化结果或商务承诺；写在审稿文件中，不先放页面。

失败模式均为**选题候选**，来源为目录、已有调研和厂家资料，不能称作已统计的客户投诉。每页列 3–5 个候选，并不表示要把全部写进 FAQ。

## 线上原版与本地的关键差异

本轮直接读取五个代表页的 Engineering Advantages（访问日期均为 2026-11-16）。其他八页以当前目录、同日关键词审查及已有事实清单为依据，未声称逐页重新抓取线上原文。

| 页 | 线上原主题 | 当前本地 | 审查判断 |
| --- | --- | --- | --- |
| Film & Tape | 应用材料、防粘表面、工作刃形 | 选择切法、检查积胶、匹配刀座 | 恢复三个可售配置方向；原减粘比例、零积胶和库存承诺单独核实 |
| Paper Slitter | 纸种材料／热处理、刀对配置、安装与刃形 | 匹配纸种、检查刃口、测量碟高 | 选题方向应恢复；原寿命增幅、通用间隙及无粉尘效果不直接沿用 |
| Bottom Grooved Anvil | 原机槽形、孔与端面加工、防粘表面 | 匹配上刀、选锁紧、区分剪切与剃刀支撑 | 原优势价值被教程替代；定制轮廓与现有加工参数可重新组织，效果数字待核 |
| Carbide | 磨耗应用价值、使用边界、牌号选择 | 选构造、判断磨耗、寻找应用尺寸 | 可以保留材料价值与牌号配置，但不以成本／寿命倍率或“每刀报告”作未经确认保证 |
| Nonwoven | 刃形、导电表面、批次文件 | 基本保留上述三个主题 | 方向不应全部推翻；线速、消除积纤与逐批文件范围需限缩和核实 |

## 01 Film & Tape Slitter Knives

`rotary-slitter-knives` · 主意图：film/tape slitter knives、replacement rotary shear/crush knives。与 Paper、裸箔和硬质合金材料页分工，不以 rotary slitter 泛词吞并它们。

**当前问题：**三条均为操作建议，与原 Q1、Q4、Q6 重叠。**失效候选：**胶料积聚、刃口磨钝、局部崩口、切边拉伸／不齐。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 面向膜与胶带的材料配置 | 52100、D2、M2、ASP23、硬质合金 → 替换采购可针对磨耗与载荷选择材料，而非只按外形配刀 | 各钢种实际热处理方式、硬度范围；不新增统一深冷工艺 |
| 2. 工作刃与可选防粘表面 | 当前 ±0.002 mm 刀厚、≤0.02 mm T.I.R. 与 TiN/DLC/PTFE 等选项 → 几何控制服务于刀位稳定，表面配置面向胶料接触问题，买家有具体替换／升级方案 | 公差适用尺寸；镀层／基材组合；降低积胶比例及连续运行小时数 |
| 3. 适配现有刀架的替换与刀对供应 | 原 Q2/Q7：孔、截面、安装、刃型及上下刀 → 可按既有工位采购单件或配对方案 | 成套检验的实际项目；不能承诺所有品牌无需调整 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which steel or carbide grade should I choose for film and tape slitting? | 新增，选型 | 介绍现有材料选择，按填料磨耗、积胶与崩口区分问题；不写寿命倍数或仅凭线速给唯一钢种。 |
| 2 | Which replacement knife fits my film or tape slitter? | 合并 Q1＋Q4；吸收 Q3 | 先区分 rotary shear 与 crush 工位，再说明刀架、孔型和轴向位置。blade/knife 是采购别称，film/tape 不是互换保证。 |
| 3 | Why does adhesive build up on tape slitter knives? | 调整 Q6 | 回答胶黏剂、接触面与切削设置都可能参与；解释 PTFE/DLC 等选择条件，不能保证零积胶。 |
| 4 | Why does a film slitter knife chip or wear out quickly? | 新增，故障 | 区分渐进磨耗、边缘接触／冲击与积胶，说明材料与刀对状态各影响什么；不凭照片承诺唯一根因。 |
| 5 | How do blade thickness, bore and dish height affect replacement fit? | 保留 Q5 主题 | 明确刀身厚度与总碟高不同；与配合刀定位相关，不重复完整尺寸表。 |
| 6 | Should I replace both the top and bottom slitter knives? | 保留 Q7 | 单件采购可行的前提是保留件仍可用；新刀对按上下刀分别定义，带出配套采购价值。 |
| 7 | Can Sureay make custom film slitter knives from a drawing or sample? | 保留 Q2，销售化答案 | 先明确现有可定制孔、截面、安装和工作刃；旧样磨损与目标新尺寸分开，报价资料放答案末尾。 |
| 8 | What inspection records can accompany a custom film slitter order? | 新增，条件启用 | 需确认可提供的材质、硬度、刀厚／跳动记录及是否收费；没有真实样例前不写“每批附 CMM”。 |

## 02 Paper Slitter Knives

`rotary-slitter-knives-paper` · 主意图：paper slitter blades、dished/top/male knives、纸卷上下刀配对。区别堆纸裁切刀和以法兰／杯形安装为主的 Rewinder Bottom 页。

**当前问题：**纸种、磨削、碟高被写成操作步骤。**失效候选：**纸粉、切边拉毛、上下刀崩口、重磨后配合改变。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 纸种对应的钢与硬质合金配置 | 52100/D2/M2/PM 与镶硬质合金、钢刀 58–64 HRC → 为涂布、再生、牛皮纸和卫生纸采购提供选择 | 热处理工艺与批次硬度范围；原“40–60% 寿命提升”不直接恢复 |
| 2. 精磨面与上下刀配合 | Ra 0.2–0.4 μm、刀厚 ±0.002 mm、现有 shear/crush 配对 → 把接触面和刀对作为供货整体，服务于稳定配合与纸卷切边质量 | 精度适用配置、配对检验方式；不能把刀具精度写成无纸粉保证 |
| 3. 原机安装与刃口配置定制 | 轴装上刀、下刀法兰／工作面与旧样替换 → 现有复卷机的单件和配对采购 | 原网页列出的全部锁紧／刃角是否均实际提供，不扩大当前目录 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Should I choose HSS, powder steel or carbide for paper slitting? | 调整 Q6 | 对比纸种与磨耗、刀对状况和采购成本；不设统一升级阈值。 |
| 2 | Are dished knives, top knives and male knives the same part? | 保留 Q2 | 解释形状、位置、配对名称的差别；真实别名自然覆盖，不能把全部上刀说成同一规格。 |
| 3 | What causes paper dust or ragged edges during slitting? | 调整 Q5 | 刃口、重叠、侧压／配合与纸料共同影响；引用 TKM 的多因素逻辑，不给通用间隙数字。 |
| 4 | When should paper slitter knives be reground or replaced? | 新增，维护 | 以切边、刃口、重磨余量和允许工作直径判断；实际最小尺寸由刀图／机型定义，不承诺固定次数或小时。 |
| 5 | Why are blade thickness and dish height listed separately? | 保留 Q4 | 解释轴向截面与碟形总高，保留原尺寸含义，不引入重复规格段。 |
| 6 | Must top and bottom paper slitter knives be replaced together? | 保留 Q7 | 答单件／配对两类采购条件；上下刀磨损和材料组合都需考虑。 |
| 7 | Can Sureay reproduce paper slitter knives for my existing rewinder? | 合并 Q1＋Q3 | 先说明按图／旧样定制能力；涉及下刀法兰、杯形时自然链接 Rewinder Bottom，避免全机型承诺。 |
| 8 | Can I approve a sample knife pair before a production order? | 新增，条件启用 | 旧线上提及试样，但数量、费用、交期和签样流程未获记录。确认后给具体服务方式，不复制原 2–5 件／5–7 天。 |

## 03 Copper & Aluminum Foil Slitter Knives

`metal-foil-strip-slitter-knives` · 主意图：bare copper/aluminum foil slitter knives。涂布电极交由 Battery 页，厚钢卷交由 Coil 页。

**当前问题：**三卡都在教设置或检查，已有加工及刀／隔套供应价值没有表达。**失效候选：**毛刺、边部变形、刀口磨钝／崩口、刀组累计宽度偏差。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 针对铜铝箔的钢与 WC-Co 方案 | D2/D3/M2/ASP2023/ASP2052/WC-Co → 可按箔材状态与磨损方式采购材料选项 | 钢材热处理及各牌号适用硬度，不把 PM 硬度套给所有材料 |
| 2. 刀厚与镜面加工 | ±0.001 mm、Ra ≤0.02 μm、≤0.01 mm T.I.R. → 刀厚、端面和回转精度是薄箔刀组稳定装配的产品基础，镜面加工对应细薄材料的切边需求 | 工厂检验样例与规格范围；不等于成品条宽精度或零毛刺 |
| 3. 按刀轴布局提供刀片和隔套 | 平孔／键孔与原 Q2 定制刀、隔套 → 一次询价考虑实际刀组构成 | 配套项目、组内宽度检验范围；不扩大成整条设备改造 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Should copper and aluminum foil be slit with steel or carbide knives? | 调整 Q5 | 箔材厚度、状态和磨耗／崩口影响选择；说明目录材料，不给统一最优牌号。 |
| 2 | How are replacement knives specified for a foil slitting line? | 保留 Q1 | 刀轴接口、OD/ID/轴向宽度与刀组位置共同识别，机型不是唯一依据。 |
| 3 | What can cause burrs on slit copper or aluminum foil? | 保留 Q6 | 刀口磨损、间隙／重叠及设备条件先区分；避免承诺单换材料必然消除毛刺。 |
| 4 | Why can slit widths vary even when individual knives are accurate? | 新增，吸收原工程卡 | 用刀／隔套累计宽度和基准解释；刀厚精度不直接等于最终条宽，不新增公差。 |
| 5 | Are bare-foil knives and coated battery electrode knives interchangeable? | 保留 Q3 | 解释涂层结构与刀位差异，正确引导 Battery 页，不将电极污染内容强塞本页。 |
| 6 | What does OD × ID × W mean when ordering foil knives? | 保留 Q4 | W 是刀具轴向宽度，区别目标成品带宽；表格保留原值。 |
| 7 | Can Sureay supply custom foil knives together with matching spacers? | 调整 Q2 | 说明现有刀和隔套定制范围；分清新品、保留件和目标刀组，询价更具体。 |
| 8 | Which dimensional records can be supplied for a foil knife set? | 新增，条件启用 | 先确认刀厚、平行度／跳动和隔套宽度等实际检测项目与交付方式；不默认整组累计公差报告。 |

## 04 Steel Coil Slitting Knives

`metal-coil-slitting-knives` · 主意图：steel coil slitting knives、replacement rotary shear tooling、knife/spacer/stripper sets。与直刀横剪和废边碎断刀分工。

**当前问题：**以选择载荷、配公差、支撑带材代替具体供货能力。**失效候选：**刃口崩口、渐进磨耗、毛刺不一致、刀组宽度偏差／带材划伤。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 按带材载荷配置材料与硬度 | D2/H13/PM 等各自已有典型硬度 → 围绕强度、厚度和失效方式给出替换选项 | 不同材料热处理记录；不写单一材料全面优于其他材料 |
| 2. 有明确适用范围的精磨刀具 | OD ≤420 mm 可选 ±0.001 mm 刀厚、0.002 mm 端面平行度 → 面向刀与隔套装配的一致性，支持客户按既有刀组补换精密零件 | 超出范围按图；不能把这组公差覆盖全部 OD80–680 mm |
| 3. 刀片与配套刀组零件采购 | 现有隔套、退料环、分隔盘 → 新刀与保留零件可一并考虑，减少采购接口分散 | 实际成套检验／编号和供应边界；不承诺无调整安装 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which knife material suits stainless, mild or high-strength steel coil? | 调整 Q4 | 用带材强度、厚度、磨耗或崩口区分材料选择；不按板厚给无证据通用硬度。 |
| 2 | What identifies a replacement steel coil slitting knife? | 保留 Q1；吸收 Q3 名称 | 圆盘纵切刀的 bore/width/arbor；rotary shear 名称放答案，并与横剪／废边碎断区分。 |
| 3 | Why do coil slitting knives chip instead of wearing gradually? | 新增，故障 | 负荷、刃口配合和材料韧性是候选因素；答案先区分损伤形态，不保证照片诊断。 |
| 4 | What causes burrs or uneven slit edges on a coil line? | 保留 Q6 | 比较磨损、间隙、重叠、刀轴与料变更，明确刀具／整机因素。 |
| 5 | How should knife and spacer tolerances be specified for a complete stack? | 调整 Q5 | 个体宽度与累计要求分别定；现有精度选项保留 OD≤420 mm 条件。 |
| 6 | Can Sureay supply knives, spacers, stripper rings and separator discs together? | 保留 Q2 | 直接答目录已有四类配套件，并说明按实际刀组配置报价，不承诺未知附件。 |
| 7 | How do I compare the cost of different coil slitter knife materials? | 新增，采购 | 对比单价、实际磨耗、可重磨余量与停线成本；提出客户可用的比较因素，不写“最低成本”或寿命倍率。 |
| 8 | Can a trial knife set and inspection scope be agreed before a larger order? | 新增，条件启用 | 试单数量／费用／交期及检验范围需内部确认；先保留为采购议题，不先承诺免费样品。 |

## 05 Battery Electrode Slitting Knives

`lithium-battery-slitting-knives` · 主意图：coated anode/cathode electrode slitting knife pairs。避免把裸箔、隔膜及电池回收刀混在同一页。

**当前问题：**三卡是描述电极、匹配刀对、检查切边。**失效候选：**毛刺、涂层掉粉／边部损伤、微崩口、上下刀配合不稳定。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 电极用途的 WC-Co 材料选择 | YG6X/YG6H/YG8/YG10X、牌号相关 91–93 HRA → 为电极刃口采购提供材料配置 | 实际牌号与检测文件；不套钢刀淬火或深冷 |
| 2. 精磨刀面与表面选项 | ±0.001 mm、≤0.01 mm T.I.R.、Ra≤0.05 μm、DLC/TiN → 围绕电极刀对的刃口一致性与接触面需求提供精磨和表面配置，帮助买家针对现有切边问题选择替换方案 | 不把数值等同毛刺高度、零掉粉或电芯安全保证 |
| 3. 上下刀配对与原工位定制 | 目录按 station 的上下刀及定制 Q2 → 为现有电极线提供配对或单件替换 | 刀对检验和配套标识；不延伸为整机良率保证 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which carbide grade should I choose for coated electrode slitting? | 将 Q6 材料部分独立 | 结合涂布结构、载荷和磨耗／微崩口讨论现有牌号；不凭牌号给绝对寿命排名。 |
| 2 | How do I identify a replacement upper and lower electrode knife pair? | 保留 Q1 | 刀位、轴向尺寸、内孔和配合刀明确；与仅看外径或品牌区别。 |
| 3 | What can cause burrs, dust or coating damage at the electrode edge? | 保留 Q5 | 给刀刃、刀对设置及料层等条件性解释，不推广未经证实的毛刺阈值。 |
| 4 | Why does a carbide electrode knife develop micro-chips? | 新增，故障 | 讨论刃口接触、支撑／安装及材料构造；不要把所有碎裂归为牌号选错。 |
| 5 | When are DLC or TiN coatings worth considering? | Q6 表面部分拆出 | 涂层与基体分别定义；当前可选 DLC/TiN，不写两者必然降低粉尘或替代刃型调整。 |
| 6 | Are electrode slitter knives the same as bare copper or aluminum foil knives? | 保留 Q3 | 以涂布与裸箔工况区分，链接裸箔页；不扩张隔膜范围。 |
| 7 | Can Sureay supply a custom knife pair or replace only the upper knife? | 合并 Q2＋Q4 | 两类采购都可讨论；保留件尺寸与状态明确后按当前工位供货，避免强推整套。 |
| 8 | What should be recorded when qualifying a replacement electrode knife set? | 新增，验证 | 刀具尺寸／材质与客户产线的毛刺、掉粉验收分开；如要承诺随货文件或试样，需先确认实际范围。 |

## 06 Corrugated Slitter-Scorer Blades

`corrugated-slitter-scorer-blades` · 主意图：corrugator dry-end thin blades、BHS/Fosber replacement slitter knives。不是压线轮，也不是下游开槽弧刀。

**当前问题：**安装孔、磨刀站、工位识别都属于 FAQ。**失效候选：**切边起毛、薄刀崩口、磨刀后切边恶化、孔型或刃位不符。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 瓦线薄刀的硬质合金配置 | 现有 WC-Co 牌号与 HIP 烧结字段 → 按刀位与磨耗情况提供材料方案 | HIP 为目录已有，需工艺／供应记录后才提升成工厂核心能力；不加淬火 |
| 2. 与磨刀工位配合的薄刀刃形 | 整体／分体与当前薄刀工位、自动磨刀相关 FAQ → 替换刀考虑原磨削和刃口要求 | 原“OD15–340 mm／约0.3 mm Edge Apex”已有待核，不作为新卖点强化 |
| 3. 原机孔型与安装结构定制 | 平孔、固定孔、槽形安装及 Q3 按图 → 对具体刀站供货，保留已有设备投资 | 不仅凭 BHS/Fosber 品牌写通配；各分体结构适配待图纸 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | How do I identify the correct replacement corrugator slitter blade? | 保留 Q1 | 机型、孔型、刃位和磨刀系统共同识别；不引入待核尺寸范围。 |
| 2 | Why is tungsten carbide used for corrugated slitter-scorer blades? | 保留 Q5 | 解释磨耗用途及牌号／刃口取舍，不给统一运行米数或寿命倍率。 |
| 3 | Do BHS and Fosber slitter blades interchange? | 保留 Q2 | 同品牌亦有不同刀站，使用具体图号／结构；不把兼容品牌列表作全机型保证。 |
| 4 | Why does corrugated board show rough edges after slitting? | 新增，故障 | 对照刃口、支撑、磨削和板材状态；首要是症状分类，不给单一原因。 |
| 5 | Can automatic sharpening cause blade chipping or uneven wear? | 调整 Q6 | 解释磨刀位置／接触及刀具状况应一起检查；设置由对应整机资料确定，不发布跨机型数值。 |
| 6 | Are slitter-scorer blades the same as scoring wheels or slotter knives? | 保留 Q4 | 工位差异与真实采购名称；必要链接 Corrugated Slotter。 |
| 7 | Can Sureay make blades with my machine's mounting holes or split design? | 调整 Q3 | 现有整体／分体及孔槽按图选项先说清，避免只说“发图”。 |
| 8 | Which dimensions should be verified before approving a replacement blade? | 新增，验证 | 孔位、刃位、厚度与相配磨刀装置；检验报告格式、首件签样若要承诺需确认。 |

## 07 Nonwoven Slitter Knives

`nonwoven-slitter-knives` · 主意图：nonwoven fabric slitting knives，spunbond/meltblown/SMS 与纤维切边。区别成卷 Nonwoven Log Saw 横断。

**当前问题：**三条主题有价值，但 400 m/min、消除吸纤及完整医用批次文件等仍需证据。**失效候选：**毛边／游离纤维、刀面积纤、刃口磨耗、局部崩口。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 不同纤维网材的刀材与硬度选项 | M2/D2/52100/硬质合金及现有硬度 → 按网材与磨耗问题采购替换配置 | 各钢种热处理、而非所有材料同一工艺 |
| 2. 刃型及可选表面配置 | 已有前角／刃角、Ra≤0.4 μm、PTFE/TiN/DLC/ESD → 提供针对切边与接触问题的几何／表面选项 | 不写一个角度覆盖所有克重线速；ESD 效果需条件与检测，不能保证消除积纤 |
| 3. 定制刀型与采购检验支持 | 原定制 FAQ 与线上批次文件主题 → 便于新供应商导入和原机替换 | 可提供的 CoC、材质、硬度、尺寸记录及批次关联须确认；不能宣传医疗认证 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which knife material suits spunbond, meltblown or SMS nonwovens? | 调整 Q6 | 用现有材料范围与网材／失效状况解释；不把材料名称当效果保证。 |
| 2 | Which replacement knife fits my nonwoven slitting holder? | 合并 Q1＋Q3 | shear/crush 的刀架与配合件不同，回答工位再谈尺寸；与卷材横断明确区分。 |
| 3 | What can cause fraying or loose fibres during nonwoven slitting? | 保留 Q4 | 刃口磨耗、几何、支撑与设置共同考虑，不只按速度／克重指定前角。 |
| 4 | Does fibre buildup always require an antistatic coating? | 保留 Q5 | 明确不是；残留、支撑、静电分别排查，解释 ESD 与防粘选项分工。 |
| 5 | When should nonwoven slitter knives be sharpened or replaced? | 新增，维护 | 依据切边与磨损、可磨余量及配合尺寸；不设固定班次或寿命。 |
| 6 | Can custom nonwoven knife profiles and coatings be ordered separately? | 保留 Q2 | 基体、几何、涂层分别在订单定义，便于评估变更，不宣称任意组合可做。 |
| 7 | What inspection records can Sureay provide for hygiene converting? | 调整 Q7，需确认回答范围 | 当前可先说明采购所需材料／硬度／尺寸／批次字段；内部确认后写实际可提供文件，不说医用资质。 |
| 8 | How can a trial knife be compared with the current production blade? | 新增，验证；服务承诺条件启用 | 比较同一网材、设置、切边及清洁／磨耗记录；试样数量费用交期另需确认，不暗示免费试用。 |

## 08 Bottom Grooved Anvil Knives

`bottom-grooved-anvil-knives` · 主意图：单个底环槽形／工作肩、NN/NG/NS 锁紧替换。多切点 pitch／整体布局交由 Multi-Groove 页；不能把“单环”简单定义成只能一槽。

**当前问题：**三条恰好是原 Q1/Q3/Q4 的教程。**失效候选：**上刀换新后仍有毛边、工作肩磨圆、积胶、安装面／孔配合导致偏摆。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 材料与接触面选项 | 52100/D2/M2/PM、整体／镶硬质合金，TiN/DLC/PTFE → 根据现有磨耗和基材选择替换配置 | 材料－表面实际组合；原减粘60–80%和连续8–12小时不能直接恢复 |
| 2. 槽形、内孔与端面的加工要求 | 槽宽±0.01 mm、H6、平面度≤0.003 mm、≤0.02 mm T.I.R. → 工作轮廓与安装面一起加工，支持下刀在原刀轴上的定位及与上刀的配合 | 适用图纸及批次记录；不将 flatness 偷换为 parallelism，也不推导成品条宽精度 |
| 3. 原刀轴锁紧与工作肩定制 | NN/NG/NS、split/clamp、槽／工作刃位置 → 可沿用客户现有安装体系采购替换件 | 具体结构配套供应及刀对验收；不写全品牌直接安装 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | What defines a replacement grooved bottom anvil knife? | 合并 Q1＋Q5 | 槽形、工作肩位置、宽度与孔型共同定义；避免只凭OD/ID。 |
| 2 | What do NN, NG and NS locking types mean? | 保留 Q4 | 依 DIENES 原厂术语解释平孔、偏心与螺钉锁；它们是结构选择，不表示厂家品牌互换。 |
| 3 | Can a razor support sleeve replace a shear-slitting anvil? | 保留 Q3 | 先回答两者工作功能不同；让刀槽支撑与剪切工作肩不能只看槽形互换。 |
| 4 | Why does slit quality remain poor after the top knife is replaced? | 新增，故障 | 检查下刀工作面磨损与刀对／刀架状态；不沿用旧站“几乎肯定槽坏了”或通用0.03mm阈值。 |
| 5 | Which material or coating suits an anvil knife used with adhesive webs? | 新增，选型 | 现有材料与 TiN/DLC/PTFE；根据胶料接触与磨耗选，不保证不积胶或固定班次。 |
| 6 | How does a grooved ring differ from a multi-groove knife block? | 保留 Q6 | 以单件轮廓／锁紧与多切点布局分工，不用槽数粗暴定义；链接 Multi-Groove。 |
| 7 | Can Sureay supply a custom anvil ring without replacing the top knife? | 扩展 Q2＋线上单件采购主题 | 定制孔、环宽、槽／工作刃与锁紧；保留上刀的几何需已知，不强卖整套。 |
| 8 | Which inspection details should be agreed for a custom anvil order? | 新增，验证 | 槽形、孔配合、端面与跳动是不同验收项目；若说明随货报告，先确认实际项目与交付范围。 |

## 09 Tungsten Carbide Slitter Knives

`tungsten-carbide-slitter-knives` · 主意图：carbide slitter knives、solid vs tipped、grade/construction。应用尺寸继续由纸／箔／电极／钢卷页解释，不能建立重复应用介绍集合。

**当前问题：**牌号与构造价值退化为选择步骤；原站也有未经核实的成本／寿命倍数。**失效候选：**微崩口、冲击碎裂、磨钝、重磨后的尺寸／刃型不符。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 按应用配置牌号与硬质合金构造 | YG 系列、0.4–0.8 μm 细晶选项、整体或钢体镶刃环 → 不必以一个硬度代替全部选材 | 牌号／晶粒／结合相实际资料；这里不写钢刀热处理，也不把牌号跨厂等同 |
| 2. 精磨工作刃与可选涂层 | 单／双刃、空磨／razor；±0.002 mm、平行度≤0.005、T.I.R.≤0.01；DLC/TiN/TiAlN → 可按实际刀图指定几何及表面 | 参数适用构造；不写“全部使用相同工艺”“每刀必附报告” |
| 3. 按机型刀位定制与替换配置 | 原 Q1/Q6 和多应用标准配置 → 牌号、结构、安装在同一采购要求中明确 | 是否提供钎焊、翻新或重磨服务须分开确认，不由镶刃结构推导自产工序 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | When should I choose carbide instead of HSS or tool steel slitter knives? | 调整 Q4 | 以磨耗、冲击、连续生产与维护条件比较，不恢复10–30倍寿命或固定成本倍数。 |
| 2 | What is the difference between solid carbide and carbide-tipped knives? | 保留 Q2 | 整体与钢体工作刃环构造、装配和维护差别；并非只看材料名。 |
| 3 | Are YG6, YG8 and similarly named carbide grades interchangeable? | 调整 Q5 | 晶粒、结合相与供应商牌号定义一起核对，不将相近编号当同材。 |
| 4 | Why does a carbide slitter knife chip before it wears out? | 新增，故障；吸收 Q4 | 区分刃口接触、冲击、装配／支撑与材料取舍；不以硬度越高越好作答案。 |
| 5 | Can carbide slitter knives be reground? | 新增，维护 | 重磨需合适工艺且保留工作几何／余量；固定次数与 Sureay 是否承接重磨均待内部记录，不先承诺。 |
| 6 | Should carbide slitter knives be coated or left uncoated? | 保留 Q7 | 按基体、基材及现有磨损讨论DLC/TiN/TiAlN；涂层是可选项，不自动解决崩口。 |
| 7 | Can custom carbide knives be made for an existing slitter? | 合并 Q1＋Q6；吸收 Q3 | 明确刀位、构造和几何；carbide rotary/slitter blade别名并不指定工位。原尺寸范围不是任意组合。 |
| 8 | What should a carbide replacement trial compare before a repeat order? | 新增，验证；试样服务条件启用 | 记录同基材、设置下磨耗／崩口、切边和换刀实际成本；内部确认试样政策后再写服务流程。 |

## 10 Slitter Rewinder Bottom Knives

`slitter-rewinder-bottom-knives` · 主意图：rewinder bottom bands/lower/female knives、杯形／法兰／可换刃环替换。Paper Slitter 页负责纸种与刀对；Multi-Groove 页负责多切点布局。

**当前问题：**识别机型、选择工作面、选整体或镶刃属于采购指导。**失效候选：**下刀工作面磨损、刃口崩口、换下刀后切边仍差、重磨后安装／切点改变。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 整体钢与硬质合金工作刃选项 | 52100/D2/M2/PM、整体硬质合金和钢体WC-Co → 按磨耗与保留上刀选择采购配置 | 钢材热处理和镶嵌工艺范围；不能凭材料名保证寿命 |
| 2. 杯形、双刃与可换刃环工作面 | 现有 Profiles 与镜面加工 → 根据实际下刀组件选择合适替换结构 | 不新增精度数字／通用可重磨次数；可换刃环不等于所有机型可升级 |
| 3. 原复卷机安装接口定制 | 法兰、键孔、平孔与旧机按图FAQ → 旧机也可按零件结构询价，无须仅找通用现货 | 特定老机型匹配案例、单件配合检验范围 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which replacement bottom knife fits my slitter rewinder? | 保留 Q1；吸收 Q2 | bottom band/lower/female 是工位相关称呼；法兰／孔型、工作面与位置识别部件。 |
| 2 | Should a rewinder bottom knife use steel, solid carbide or a carbide edge? | 新增，选型 | 当前三种构造与材料，结合上刀、磨耗、冲击与维护选；不复制材料页大段。 |
| 3 | How do cup, double-edge and replaceable-ring bottom knives differ? | 保留 Q4 | 解释实际工作面与部件结构，指出按原组件选择，不承诺通用升级。 |
| 4 | Why is the paper edge still poor after replacing a bottom knife? | 新增，故障 | 下刀、保留上刀、刀架和设置分别看；不能单凭换刀判断根因。 |
| 5 | When can a bottom knife be reground rather than replaced? | 新增，维护 | 工作面、剩余尺寸与可恢复几何；服务能力及通用次数未确认，不作保证。 |
| 6 | Can custom bottom knives be supplied for an older rewinder? | 保留 Q3 | 先答现有按图／样件与法兰孔型配置，说明旧样磨损与目标新刀不同。 |
| 7 | Can I buy a bottom knife without replacing the upper knife? | 调整 Q6 | 单独采购可以考虑，但保留上刀的工作直径／位置和状态需明确；保留成套供货选项。 |
| 8 | When is a multi-groove bottom knife more appropriate? | 保留 Q5 | 仅在多切点布局与原刀轴支持时讨论，链接专页；不把分体结构或多槽当必然更快。 |

## 11 Corrugated Slotter Knives

`corrugated-slotter-knives` · 主意图：printer-slotter/flexo folder-gluer male/female slotter knives、弧刀和配套垫圈。不是干端薄圆纵切刀。

**当前问题：**三卡讲平／齿刃选择、配母刀与隔套、识别工位；可售的弧形和组件能力应在优势中。**失效候选：**开槽毛边／撕裂、弧刀崩口、槽宽不稳、公母刀偏磨。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 公刀与母刀的材料配置 | 当前 specs：D2/M2/9CrSi/9Mn2V/52100及镶硬质合金母刀 → 按部件位置采购合适构造 | 不能把镶硬质合金母刀推成所有公刀可做；各钢种热处理范围待核 |
| 2. 弧形工作刃和实际安装加工 | 平／锯齿弧刀、stitch-lap/corner分段、孔／沉孔／弧槽 → 覆盖具体箱机配置 | 不承诺齿刃统一减少撕裂，或所有刀段同一材质 |
| 3. 公母刀与配套隔套供应 | 两片母刀加匹配隔套、单件／配套FAQ → 用户可补换部件或采购相配组合 | 配对验收、间隙及完整刀头附件范围需订单证明 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | How are replacement slotter knives matched to a box converting machine? | 保留 Q1；吸收 Q6 | 确认printer-slotter/folder-gluer工位、弧形、厚度、孔位、左右手；区别干端薄刀。 |
| 2 | What is the difference between male and female slotter knives? | 保留 Q2 | 公刀进入母刀组件，母刀两侧与隔套共同构成配合；让买家订对部件。 |
| 3 | Should I choose a plain or serrated male slotter blade? | 保留 Q4 | 以原刀头、槽型和纸板为依据，不宣称齿刃普遍优于平刃。 |
| 4 | Why do corrugated slots have torn edges or uneven widths? | 新增，故障 | 刃口、母刀开口／隔套、装配和纸板状态；不是只换钢种即可解决。 |
| 5 | Which materials are available for male and female slotter knives? | 新增，选型 | 精确区分现有钢材与镶硬质合金母刀；不将其硬度全部混成统一范围。 |
| 6 | Can custom slotter arcs be made from a drawing or sample? | 保留 Q3 | 明确半径、弧角、厚度、孔槽和左右手可定义；旧样磨损不复制为新尺寸。 |
| 7 | Must male and female slotter knives be replaced together? | 保留 Q5 | 可独立询价，也可考虑母刀两半与隔套配套；保留件状态和配合几何需明确。 |
| 8 | What should be checked before approving a first replacement slotter set? | 新增，验证 | 安装孔位、弧形／手向、母刀及隔套实际配合、试切槽型；首件供应政策和报告需确认。 |

## 12 Paper Straw Cutting / Slitting Blades

`paper-straw-slitting-blades` · 主意图：成形纸吸管的cut-off/trimming circular knives。URL保持；平纸条纵切去Paper Slitter，不为名称含slitting而改变工位。

**当前问题：**刀站识别、积胶检查和管壁配刃均是FAQ题。**失效候选：**吸管端口毛边、压扁／变形、积胶、刃口磨耗／崩口。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 吸管切断工位的材料选项 | 细晶硬质合金、M2、zirconia按工位 → 可围绕管材、磨耗与现有刀座选择替换材料 | 氧化锆、硬质合金不套钢刀热处理；不承诺食品接触认证 |
| 2. 工作刃与可选表面配置 | 原定制孔／厚／刃形及 DLC/TiN/TiAlN/CrN → 可明确刃型和涂层作为独立供货选项 | 所有材料与镀层组合并非默认可用；不写零毛边／不积胶 |
| 3. 现有绕管线的按图替换 | 现有 trim/cut-off 工位及定制FAQ → 以原机安装和切断位置供应替换刀 | 特定机型适配、新样试切及配套服务范围待确认 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | Which replacement blade fits a paper straw cutting machine? | 保留 Q1 | 以成形管切断刀站、孔、厚度和工作刃识别；不只看外径。 |
| 2 | Are paper straw cutting blades the same as paper slitter knives? | 保留 Q2 | 成形管横断与平纸卷纵切不同；采购名称解释放此处而非Hero。 |
| 3 | Should I choose carbide, HSS or ceramic for paper straw cutting? | 保留 Q4 | 当前材料含zirconia，按工位、受力和磨耗选；没有统一最佳材料。 |
| 4 | Why are paper straw ends ragged or distorted? | 保留 Q5 | 管壁、刃口、支撑与切断设置共同影响；不保证换刀即可恢复。 |
| 5 | What can reduce adhesive buildup on paper straw knives? | 调整 Q6 | 胶料接触、表面与清洁方式作为选型输入；涂层按具体基材／刀材讨论。 |
| 6 | When should a paper straw cutting blade be replaced? | 新增，维护 | 切口、刃口缺陷和允许工作尺寸；不发布固定产量或重磨次数。 |
| 7 | Can Sureay make custom paper straw knives from my drawing? | 保留 Q3 | 先答孔、截面、安装和工作刃可定制，再说明工位资料；不挪用平纸刀尺寸。 |
| 8 | Can a sample knife be evaluated on my straw line before a larger order? | 新增，条件启用 | 可讨论的评估为端面、压扁、积胶和刀具磨耗；试样费用、交付与数量待确认，不先给业务保证。 |

## 13 Multi-Groove Bottom Knives

`groove-bottom-knives` · 主意图：multi-groove bottom knife blocks/MKB、custom pitch/slit pattern。单个环的槽形与锁紧页不重复讲全部多切点排布。

**当前问题：**三卡为排切点、规划换幅、逐刀检查；真实多槽定制及整体／分体构造没有被表达为供货价值。**失效候选：**多位置切边不一致、工作肩磨损、节距／基准误读、夹持与定位变化。

| 优势候选（3 条） | 现有依据 → 买家价值 | 尚待确认 |
| --- | --- | --- |
| 1. 多切点工作肩的材料配置 | Cr12MoV/SKD11/9CrSi/65Mn/HSS/镶硬质合金 → 按磨耗与刀轴配置采购材料方案 | 热处理与工作肩耐磨数据；不能借DIENES说明变成Sureay寿命承诺 |
| 2. 按实际切宽布局定制节距与工作刃 | 现有pitch从5mm、单／双工作肩、总宽与切点按图 → 直接对应多切点采购任务 | 最小pitch须带配置条件；不把槽间空隙等同切点节距，不新增累计公差 |
| 3. 原刀轴的整体／分体安装选项 | 整体或两片式、气胀轴平孔或实轴螺钉锁 → 可按现有安装方式选结构 | 分体是否能不拆轴换装取决于机台；不先宣称节省多少换刀时间 |

| 顺序 | 英文候选题 | 对现有题的处理 | 拟答内容／证据缺口 |
| --- | --- | --- | --- |
| 1 | What defines a replacement multi-groove bottom knife block? | 合并 Q1＋Q3 | MKB/multi-groove anvil/bottom slitter的真实叫法；工作刃、布局和轴安装共同识别。 |
| 2 | How should groove pitch and cutting-edge positions be specified? | 保留 Q4 | 以相邻有效切点和统一轴向基准解释，不以槽空隙代替pitch。 |
| 3 | When should I choose a split ring instead of a one-piece ring? | 保留 Q5 | 按原轴、安装空间和结构选择；不承诺所有机台不拆轴即可更换。 |
| 4 | Which materials are available for multi-groove bottom knives? | 新增，选型 | 说明当前钢和镶硬质合金工作刃选项；刀对与工况影响选择，不编造统一硬度。 |
| 5 | Why does slit quality vary between positions on one knife block? | 新增，故障 | 不同工作肩磨损、上刀状态、装配与位置作为候选原因；不预设一项公差必然解决。 |
| 6 | Can Sureay make a knife block to a custom slit-width pattern? | 保留 Q2 | 直接说明布局、总宽、工作刃和安装可按图定义；复购按同一基准识别。 |
| 7 | What does an Item No. identify when ordering a replacement block? | 保留 Q6 | Item No.对应配置而非任意尺寸范围；旧订单、图纸版本与工作刃位置一起核对，避免复购偏差。 |
| 8 | What should be inspected before accepting a custom multi-groove block? | 新增，验证 | 工作刃位置／节距、基准、孔与安装界面；供应商能否提供逐位置报告须内部确认。 |

## 全品类共同待确认与实施优先级

### 只需集中核对一次的能力清单

1. 钢刀的真空淬火、回火、深冷哪些实际提供，适用哪些材料和刀型；是否自有或外协不能自行宣称。硬质合金／陶瓷另列构造与加工事实。
2. 现有精度值的适用尺寸／结构、验收方式与可提供的真实报告样例。刀片厚度、平面度、平行度和跳动分开；CMM不是覆盖所有检测的万能表述。
3. 涂层与刀材组合、原理适用条件；量化减粘、寿命、线速和产线结果需要实际案例。原 `Optional Coatings` 全部保留，不因优势改写删参数。
4. 单件／配套、首件／试单、样品费用、MOQ、交期和报告费用分别确认。没有记录的数字为 **NOT FOUND**；旧网页曾写过不等于本轮已确认。
5. 原厂替换是应用与尺寸兼容的供货方向，不是原厂授权身份；本页名称、图号与具体工位共同确认适配。

### 建议审稿顺序

- **优先1：Film & Tape → Paper → Bottom Grooved Anvil。** 用户已经具体指出方向错误；这三页最适合先确认优势的销售表达与FAQ分工。
- **优先2：Nonwoven → Carbide → Electrode。** 核实残留的效果、报告或材料构造承诺，防止“更积极”演变成无依据保证。
- **优先3：Foil → Coil → Rewinder Bottom → Multi-Groove → Corrugated 两页 → Straw。** 沿用已审表达方式，但使用各自材料、工位和购买对象。

正文成稿时保留三条优势的短标题＋简短描述，不恢复装饰性副标题。FAQ先回答问题，再自然引出采购支持。客户可直接理解“可以买到什么、对我有什么用”，无须读一段限制清单；本文件中的待确认项属于内部审核，不复制成页面免责声明。

## 来源与回查位置

### 本地与已有调研

- [英文页面升级规范](../qa/product-page-upgrade.md)：规格保护、6–8题单栏、SEO与工程优势角色。
- [原版工程优势对照](engineering-advantages-topic-review-2026-11-16.md)：用户明确的线上基准及三页变化。
- [Slitter修改前关键词核对](../seo-audits/commercial-seo-slitter-before-2026-11-16.md)：13组查询、成熟厂商链接与采购边界；Google当前SERP/PAA未能实际读取的限制。
- [Slitter修改后审计](../seo-audits/commercial-seo-slitter-after-2026-11-16.md)：已有FAQ及Nonwoven承诺问题。
- 当前数据源：`client/src/data/blades.ts`，按本文产品ID定位 `components`、`specs`／`detailLayout.technicalSpecs`、`faqs.technical`。工作快照 `C:/Users/liyuc/AppData/Local/Temp/sureay-sales-sections-20261116/catalog-before.json` 的工程区与FAQ用于逐题索引；品牌描述后来已更新，不以快照覆盖。
- 既有事实清单：同临时目录 `slitter-evidence.md`，用于逐产品字段与能力缺口追溯，不是性能证明。

### 本轮直接读取的页面

访问日期均为 **2026-11-16**；位置使用页面区块名及本次读取的行号，页面后续更新可能变化。仅短摘题意，不复制原整段。

| 来源 | 原文位置 | 本文用途／限制 |
| --- | --- | --- |
| [Sureay Film & Tape](https://sureay.com/products/rotary-slitter-knives) | Engineering Advantages：材料、防粘表面、刃形三卡 | 原销售主题基准；不把原库存／效果数字自动确认 |
| [Sureay Paper Slitter](https://sureay.com/products/rotary-slitter-knives-paper) | Engineering Advantages，行88–103；Why Choose Sureay行154–174 | 原主题及旧样品服务待核；不恢复原寿命、速度、间隙和交期保证 |
| [Sureay Bottom Grooved Anvil](https://sureay.com/products/bottom-grooved-anvil-knives) | Engineering Advantages行75–90；FAQ行108–155 | 原槽形加工／接触面价值；不恢复旧寿命、减粘、库存与交期 |
| [Sureay Carbide](https://sureay.com/products/tungsten-carbide-slitter-knives) | Engineering Advantages行81–96；Technical FAQs行113–130 | 牌号构造与磨耗价值；不继承成本倍率、2小时报价或逐刀检验承诺 |
| [Sureay Nonwoven](https://sureay.com/products/nonwoven-slitter-knives) | Engineering Advantages行76–91；FAQ行125–129 | 几何、表面与文件主题；400m/min、消除吸纤及每批完整文件另待核 |
| [TKM：Life-time, Circular Knives](https://www.tkmgroup.com/en/troubleshooting/life-time-circular-knives) | 2020-08-27；原因列表行21–33 | 支持纸刀寿命／切边是刀对、安装与材料共同问题；不移植TKM寿命或专有磨削工艺 |
| [DIENES：Grooved knives](https://www.dienes.de/en/products/bottom-knives/grooved-knives/) | Types行46–49；Use行55–59；locking procedures行63–71 | NN/NG/NS和底刀结构；不把DIENES的精度、质量与服务承诺写成Sureay能力 |
| [DIENES USA：Multi-Groove Bottom Circular Knives](https://www.dienesusa.com/products/circular-knives/shear-cut-knives/multi-groove-bottom-circular-knives/) | Product Details行71–80 | 多槽采购别名、切点节距与整体／分体定义；不复制其快速换刀效果 |

其余相关厂家资料沿用同日修改前报告中的逐页来源：TOYO Film/Tape/Metal Foil、DIENES Battery/Nonwoven、BHS Slitter Scorer、KAMADUR Corrugated、Bach Carbide、HMK Paper Straws。没有重复访问的页面不标成本轮直接验证；HMK此前直接访问超时，不能补造新参数。

本报告没有新增Google搜索量、PAA或排名结论。既有GSC样本是本站查询展示，非市场搜索量。FAQ的目标是覆盖真实采购长尾、帮助决策与促进询价，不保证排名或FAQ搜索富结果。

## 原 FAQ 与工程卡索引

以下为文档核对用快照，不是拟发布内容。上文所有“原Q”都以此编号；原题合并后有用的名称、采购或配套信息须保留。


### rotary-slitter-knives

现有三卡：Choose the cut before choosing the blade；Manage adhesive pickup；Match the holder。

- Q1：How do I identify replacement knives for my film or tape slitter?
- Q2：Can film slitter knives be custom-made from a drawing or sample?
- Q3：Are film slitter blades and tape slitter knives interchangeable?
- Q4：How do shear cutting and crush cutting differ?
- Q5：What do OD, bore, thickness and dish height describe?
- Q6：What should I check when adhesive builds up on tape slitter knives?
- Q7：Should I order a complete top-and-bottom knife pair?

### rotary-slitter-knives-paper

现有三卡：Match the paper grade；Check the ground edge；Measure the dish separately。

- Q1：How are replacement paper slitter knives matched to a rewinder?
- Q2：Are dished knives, top knives and male knives the same part?
- Q3：Can custom paper slitter knives be supplied from a worn sample?
- Q4：Why are blade thickness and dish height listed separately?
- Q5：What can cause paper dust even with a sharp slitter knife?
- Q6：How should I choose steel or carbide for paper slitting?
- Q7：Must top and bottom paper slitter knives be replaced together?

### metal-foil-strip-slitter-knives

现有三卡：Set clearance for the foil gauge；Control stack width；Inspect edge and face condition。

- Q1：How do I specify replacement copper or aluminum foil slitter knives?
- Q2：Can foil slitter knives and spacers be made to a custom drawing?
- Q3：Are bare-foil knives and battery electrode knives interchangeable?
- Q4：What does OD × ID × W mean for a foil slitter knife?
- Q5：Which foil properties affect carbide or steel knife selection?
- Q6：What should be checked when burrs appear during foil slitting?

### metal-coil-slitting-knives

现有三卡：Choose toughness for the load；Match tolerances to the tooling；Support the strip after the cut。

- Q1：Which details identify replacement steel coil slitting knives?
- Q2：Can a complete custom slitter tooling stack be supplied?
- Q3：Are rotary shear knives and steel coil slitting knives the same?
- Q4：How should knife material be selected for different steel coils?
- Q5：Why do component tolerances matter in a mixed knife stack?
- Q6：What can cause burrs or inconsistent slit edges on a coil line?

### lithium-battery-slitting-knives

现有三卡：Specify the electrode stack；Match upper and lower knives；Inspect the slit electrode edge。

- Q1：How do I match replacement knives to an electrode slitting station?
- Q2：Can custom upper and lower electrode knife pairs be supplied?
- Q3：How do electrode knives differ from bare-foil slitting knives?
- Q4：Can I replace only the upper electrode slitter knife?
- Q5：What affects burrs, dust or coating damage at the slit edge?
- Q6：How should carbide grade and optional coating be specified?

### corrugated-slitter-scorer-blades

现有三卡：Check the mounting pattern；Match the grinding station；Identify the cutting station。

- Q1：How do I identify replacement corrugated slitter-scorer blades?
- Q2：Do BHS and Fosber slitter blades interchange?
- Q3：Can corrugator knives be made to a custom mounting pattern?
- Q4：Are slitter blades, scoring tools and slotter knives the same?
- Q5：Why is tungsten carbide used for corrugated board slitting?
- Q6：What should be checked around the automatic sharpening unit?

### nonwoven-slitter-knives

现有三卡：Nonwoven-Optimised Rake Angle；ESD Conductive Coating；Medical Batch Traceability。

- Q1：How do I choose replacement knives for a nonwoven slitting line?
- Q2：Can custom nonwoven slitter profiles and coatings be specified?
- Q3：Are shear knives and crush cutters suitable for the same holder?
- Q4：What can cause fraying or loose fibres during nonwoven slitting?
- Q5：Does fibre buildup always mean the blade needs an antistatic coating?
- Q6：How do material choices differ for nonwoven slitter knives?
- Q7：What inspection information is useful for hygiene or medical converting?

### bottom-grooved-anvil-knives

现有三卡：Match the groove to the top knife；Choose the correct locking design；Distinguish shear from razor support。

- Q1：How do I select a replacement grooved anvil knife?
- Q2：Can grooved rings be custom-made for an existing slitter shaft?
- Q3：Can a razor support sleeve replace a shear-slitting anvil?
- Q4：What do NN, NG and NS mounting types mean?
- Q5：Which dimensions matter besides outside diameter and bore?
- Q6：How does a single grooved ring differ from a multi-groove knife block?

### tungsten-carbide-slitter-knives

现有三卡：Choose the structure first；Balance abrasion with edge loading；Find sizes by application。

- Q1：Can carbide slitter knives be made to custom dimensions?
- Q2：What is the difference between solid and carbide-tipped knives?
- Q3：Are carbide rotary knives and carbide slitter blades the same?
- Q4：Does a higher carbide hardness always give longer service life?
- Q5：Are similarly named carbide grades directly interchangeable?
- Q6：How do I match a carbide replacement to an OEM machine?
- Q7：Should carbide slitter knives be coated?

### slitter-rewinder-bottom-knives

现有三卡：Identify the rewinder and mounting；Select the cutting face；Choose between solid and tipped。

- Q1：How do I identify a replacement slitter rewinder bottom knife?
- Q2：Are bottom bands, lower knives and female knives the same?
- Q3：Can custom bottom knives be supplied for an older rewinder?
- Q4：How do cup, double-edge and replaceable-ring designs differ?
- Q5：When is a multi-groove bottom knife more appropriate?
- Q6：What should be checked when only the bottom knife is replaced?

### corrugated-slotter-knives

现有三卡：Choose plain or serrated male arcs；Match both counter faces and the spacer；Identify the converting station。

- Q1：How are replacement slotter knives matched to a box machine?
- Q2：What is the difference between male and female slotter knives?
- Q3：Can custom slotter arcs be made from a drawing or sample?
- Q4：Should I choose a plain or serrated male slotter blade?
- Q5：Must male and female slotter knives be replaced together?
- Q6：Are corrugated slotter knives the same as slitter-scorer blades?

### paper-straw-slitting-blades

现有三卡：Match the station before the disc；Inspect adhesive buildup on straw lines；Match the edge to the straw wall。

- Q1：Which replacement blade fits a paper straw cutting machine?
- Q2：Are paper straw cutting blades and paper slitter knives the same?
- Q3：Can custom paper straw knives be made to a drawing?
- Q4：How should I choose carbide, HSS or another blade material?
- Q5：What can cause ragged or distorted paper straw ends?
- Q6：How should an optional coating be selected for a straw knife?

### groove-bottom-knives

现有三卡：Lay out the slit schedule；Plan the width changeover；Check the top knife at each position。

- Q1：What defines a replacement multi-groove bottom knife?
- Q2：Can multi-groove knives be made to a custom slit pattern?
- Q3：Are multi-groove anvils, knife blocks and bottom slitters the same?
- Q4：How should groove pitch be measured?
- Q5：When should I choose a split ring rather than a one-piece ring?
- Q6：What does an Item No. tell me when ordering a knife block?
