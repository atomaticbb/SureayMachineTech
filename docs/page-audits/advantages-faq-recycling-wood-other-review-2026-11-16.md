# Shredder、Wood、Other：优势区与 FAQ 复审计划

日期：2026-11-16。**只供审阅，不是实施任务单或英文成稿。** 本文件覆盖 15 款：Shredder 8、Wood 2、Other & Custom 5；未修改产品源码、译文、页面标题、URL、图片、规格、尺寸、Item No. 或 Optional Coatings。

## 一、建议先决定的重点

| 优先级 | 判断 | 建议审阅动作 |
| --- | --- | --- |
| P0 | 当前 8 款 Shredder 和异形刀缺少工程优势；其余 6 款共 18 张卡大多偏结构介绍或选型解释 | 先审下文 45 个选题，再授权成稿；恢复的是制造商实际供货价值，不是把 Match / Check 换个动词 |
| P0 | 部分线上原优势选题正确，但绝对效果或工艺能力没有内部凭据 | 保留材料、加工、几何及配套主题；把 FEA、零背隙、永不脱齿、性能增幅、每票报告等单列证据缺口，不整区删除 |
| P0 | 筛网不是刀刃；硬质合金不是统一真空淬硬的工具钢；滤板参数不是刮刀参数 | 不机械使用 A+B“材料与热处理”模板；保留所有原数值，明确归属和证据状态 |
| P1 | 当前 94 个 FAQ 原题已有名称、定制和采购内容，但开头常是匹配步骤，产品选项回答偏少 | 逐题保留有效内容，部分改成先回答能供什么，再解释选型；下文 120 条是每页 8 题的候选清单，不要求全部上线 |
| P1 | “5 技术 + 3 商业”并不适合每件产品 | 优先 6 个独立产品问题 + 1–2 个实际采购问题；共 7 条明确条件候选，若无新信息或业务资料，6–7 题即可 |
| P2 | MOQ、交期、报告、质量保障容易被批量复制成空承诺 | 先确认全局商业信息表 C1–C4，再选择有产品独特价值的少量题目；不在 15 页机械复用 3 个业务问答 |

**优势与 FAQ 的分工**：优势说“可交付的材料、结构、加工或配套形式 → 对采购/使用的价值”；FAQ 解决别名、工位、配置差异、重磨/替换和真实询价问题。下文“采购价值”均为合理推导，未取得运行对比数据，不等于已验证的寿命、质量、效率或停机收益。

一般磨耗、崩刃和维护机制可以依据OEM/刀厂资料解释，不需要先证明Sureay提供诊断服务；这与宣称Sureay能诊断客户具体故障、保证更换后效果不同。本轮复审将重复报价/尺寸题中的7条候选替换为产品特定失效或维护问题，不改原题映射编号。

## 二、基线和证据等级

- **L：当前 Sureay 目录陈述**。读取 [blades.ts](../../client/src/data/blades.ts) 的这 15 个 id，逐项对照 `components`、`faqs.technical`、`detailLayout.technicalSpecs` 或 `specs`。以下原题 Q 编号为当前数组从 1 开始的位置；表中给出完整原题，方便回查。当前全部 `faqs.company` 为空。L 是已有公开/目录信息，**不是本次拿到工厂检验单的证明**。
- **S：Sureay 线上原有内容**。本次直接读取代表页原工程区，作为选题与销售表达的首要历史对照；没有把线上旧参数或已被用户纠正的内容重新写回页面。
- **P：整机厂/成熟刀具厂资料**。只核对零件关系、材料/结构主题是否适用；它们不证明 Sureay 的工艺、供货或性能。
- **内部工厂证明**：本次没有取得炉次记录、材料证书、量测报告、批次一致性数据或订单履历。下文逐项列“待核断言”，不以“当前页面已写”替代内部验证。
- 潜在失效/采购错配主题来自产品结构、已有 FAQ 和来源，是内容选题线索，**不是 Sureay 已发生的客户投诉统计，也不是远程故障诊断结论**。
- 当前无新的 Google SERP/PAA 或搜索量数据。本次前序 Google 访问受限已登记于同日 SEO 报告；不把官网措辞称为 Google 热门问题。FAQ 不承诺富媒体结果、排名或流量提升。

接续文件：

1. [产品升级规范](../qa/product-page-upgrade.md)：保留规格、Optional Coatings、单栏 6–8 题、只改英文等现行标准。
2. [工程优势选题讨论](engineering-advantages-topic-review-2026-11-16.md)：线上原优势为首要基准，先讨论不成稿。
3. [本批商业 SEO 复核](../seo-audits/commercial-seo-recycling-before-2026-11-16.md)：名称、采购意图、旧公司 FAQ 归并和搜索限制。
4. [Shredder 调研](external-research-shredder-blades-2026-11-11.md)、[Granulator 与原下属四款调研](external-research-granulator-blades-2026-11-11.md)、[Wood 调研](external-research-wood-chipper-blades-2026-11-11.md)、[异形刀调研](external-research-special-shaped-blades-2026-11-11.md)：采用其技术和来源记录，分类/路由的旧结论以用户后续决定和当前升级规范为准。
5. 前序只读事实清单：`C:/Users/liyuc/AppData/Local/Temp/sureay-sales-sections-20261116/recycling-evidence.md`。本文件已将需要审阅的结论写入，不依赖临时文件才能使用。

## 三、线上原主题与本地差异

以下均为原主题的概括，不是建议恢复旧宣传数字。

| 来源 | 线上原优势主题 | 本地差异与处理判断 |
| --- | --- | --- |
| S1 通用双轴 | 爪型设计；线切割内孔；低温处理 | 本地整个区缺失。可回到刀形/接口/材料配置的销售角度；FEA、零间隙直装、40%耐磨提升单列待证 |
| S2 木片动刀 | 透硬与重磨；杂质冲击；刃角和磨削 | 本地是刀体、材料、切削对的解释。应恢复制造价值；不把无裂纹、固定重磨寿命或成品标准符合性自动带回 |
| S3 条料转子 | 平衡；螺旋齿形；钎焊刃部 | 本地只讲齿形、材料和动静刀关系。保留平衡/几何/构造的方向；五轴设备、专有真空钎焊、永不脱齿待证 |
| S4 滤网刮刀 | 刀/板硬度关系；滤板孔形；磨损改进路径 | 本地刮刀/载体/材料介绍过轻，但滤板参数必须分件；不能把系统压力、逐票证书或失效阈值直接恢复 |
| S5 筛网 | 排料筛几何；板材韧性；配套磨损件 | 本地区缺失。筛体材料、孔阵和成形有价值；不套刀片淬火，不保证孔径=每粒尺寸，不默认全套配件供货 |

## 四、15 款逐页审查

每页恰好列 3 个中文候选选题，均不是将来的英文标题或卡片文案。FAQ 表是拟定顺序；“新增·条件候选”以及答案中标明待技术澄清的题目，未核清前不进入成稿。原尺寸表及独立规格继续提供详细数值，FAQ 不重印整表。

### 1. twin-shaft-blades-recycling

**关键词边界**：twin-shaft / double-shaft / dual-shaft shredder replacement cutters；覆盖塑料、木托盘、MSW和大件废物。废金属、轮胎、电池专用词分别交给各独立详情页；类别页承担 shredder blades 总词。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：原线上 S1 的钩型、线切割内孔、低温处理三个方向符合产品价值表达；FEA、零间隙直装、耐磨提升40%不能随方向一并恢复。本地 components 缺失，不能把现有FAQ的匹配步骤当恢复方案。

**潜在失效/错配主题（待验证）**：爪尖磨圆或崩口；轴孔或端面磨损造成配合变化；刀厚/隔套顺序错误造成干涉；异物导致冲击损伤。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 按物料配置的刀具钢与热处理 | L：D2/SKD11/42CrMo，HRC55–62及4–5次回火已列；S1提供原主题 | 可提供与原配置相符的材料方案，兼顾买家对磨损与冲击的不同关注（推导） | 具体牌号对应硬度和回火记录；不能承诺−196°C工艺、40%提升或所有材料同硬度。 |
| 爪型与内孔共同制造 | L：3/5/8/12爪，Hex/Octagonal/Splined线切割孔；P7说明刀组型式 | 替换同时覆盖咬料轮廓与传动接口，而不局限于通用圆片（推导） | FEA文件、孔检验和可用公差；不写零背隙、无轴磨损、全型号直装。 |
| 按轴位供应单片和整套刀组 | L：Q2/Q7支持按图样件、不同刀位与数量；原厚度10–150 mm保留 | 同次报价覆盖真实换刀组合，避免把不同方向/刀厚混成同件（推导） | 已交付套刀记录及隔套是否供货；不得将询价所需隔套资料写成默认包含。 |

**Technical FAQs：8 题候选，当前 7 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which replacement twin-shaft shredder blades can Sureay supply? | 重写；Q1 “How do I match replacement blades to my twin-shaft shredder?” | 先说现有爪型、轴孔和单片/刀组范围，再说明尺寸、轴位的识别。L尺寸表为各配置，不代表任意组合；Q1原识别信息保留。 |
| 2 | Are twin-shaft, double-shaft and dual-shaft shredder blades the same? | 保留；Q3 “Are twin-shaft, double-shaft and dual-shaft shredder blades the same?” | 解释三个常见名称在本页均指双轴旋转剪切刀，hooked/claw描述轮廓，不暗示互换。 |
| 3 | How do hook count and cutter thickness affect blade selection? | 重写；Q4 “How do hook count and cutter thickness affect blade selection?” | 结合L爪数、刀厚和隔套说明结构差异；不把更多爪或更厚直接说更好。P7仅支持整机配置相关，不能复制M180专属尺寸。 |
| 4 | How should I choose between the listed steel options? | 重写；Q6 “How should I choose between the listed steel options?” | 列L三种钢和已列硬度，解释磨耗/冲击关注不同；具体选材热处理方案待生产确认。 |
| 5 | Which materials are these twin-shaft shredder blades used for? | 保留；Q5 “Which materials are these twin-shaft shredder blades used for?” | 列通用回收物料，相关废金属、轮胎、电池页承接专用场景。 |
| 6 | Can twin-shaft shredder blades be custom-made from a drawing or worn sample? | 保留；Q2 “Can twin-shaft shredder blades be custom-made from a drawing or worn sample?” | 支持图纸/样件定制，磨损面与新刀尺寸分开；不承诺免费重设计或固定交期。 |
| 7 | Can I order several cutter positions as one replacement set? | 重写；Q7 “Can I order several cutter positions as one replacement set?” | 可分别列刀位数量合并报价；刀片、隔套、清理指采购范围须分别确认，不自动扩品。 |
| 8 | Why do twin-shaft shredder cutters wear or chip prematurely? | 新增；当前无对应独立题 | 先区分刃口逐渐磨圆/尺寸耗减与局部崩口：磨蚀料流可能加快渐进磨耗；异物冲击、原刃形承载及刀组松动/配合异常也可能参与损伤（P11/P12/P13）。磨耗为主时比较材料耐磨性，崩口为主时同时考虑韧性、刃口支撑和原热处理，不能只提高硬度；沿用L现有钢种，不承诺换某牌号必然解决。一般原因解释不以Sureay诊断服务记录为前提，也不作唯一原因判断。 |

### 2. multi-shaft-blades-metal

**关键词边界**：scrap metal shredder cutters / multi-shaft metal shredder replacement blades；区分ELV/WEEE剪切刀、锤式破碎锤头、alligator与stationary scrap shear长方刀。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失；参照S1的制造特点→价值结构，不复制通用双轴的钢号、硬度或低温处理。

**潜在失效/错配主题（待验证）**：钢件冲击下刃口崩损；低轮廓爪磨钝；重型花键/键槽磨损；多轴刀位装错。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 废金属工况的材料与厚爪组合 | L：H13/42CrMo、HRC50–54、1/2/3低轮廓厚爪 | 围绕金属冲击负荷提供具体结构和材料组合（推导） | 材质和热处理/冲击记录；不写永不崩刃、比通用刀更长寿命。 |
| 花键和多键槽接口加工 | L：Heavy Splined / Multi-Keyway (Wire-EDM) | 替换采购涵盖承载接口和刀体，不止外径（推导） | 花键定义、检测报告；不套用别页±0.01 mm或零背隙。 |
| 多轴分刀位整套替换 | L：Q1/Q3/Q6明确轴位、不同几何、按图及整套数量 | 同一项目保留各轴不同零件，降低错配风险（推导） | 订单和装配图；隔套供货另核，不承诺一套适配所有金属流。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which replacement cutters are available for multi-shaft scrap-metal shredders? | 重写；Q1 “What identifies the correct replacement scrap-metal shredder cutter?” | 先列低轮廓厚爪、花键/键槽配置和单片/整套方式，再说明轴位与原图；L材质为现有供货表述。 |
| 2 | Are these cutters the same as shredder hammers or scrap shear blades? | 保留；Q2 “Are these cutters the same as shredder hammers or scrap shear blades?” | 解释旋转剪切刀与锤头、鳄鱼剪、龙门剪不同，链接相关正确产品，不竞争各自专词。 |
| 3 | Which materials and hardness ranges are listed for scrap-metal cutters? | 重写；Q5 “Does higher cutter hardness always improve service life?” | 答H13/42CrMo及HRC50–54；硬度不是寿命单一决定因素。炉次数据未取得，不强化性能。 |
| 4 | What scrap-stream details affect cutter selection? | 重写；Q4 “What scrap-stream details affect cutter selection?” | 区分薄板、混合电子废料、厚截面的磨耗/冲击，不能把全部ELV成分适用性视作已证实。 |
| 5 | Can splined and keyed cutter bores be made to drawing? | 保留；Q3 “Can splined and keyed cutter bores be made to drawing?” | 保留花键/多键槽按图、基准面与方向内容；仅更换零件与重新设计分开。 |
| 6 | How should I specify a complete multi-shaft cutter set? | 保留；Q6 “How should I specify a complete multi-shaft cutter set?” | 按轴位、图号版本、数量和隔套关系组报价；不把不同刀位合并。 |
| 7 | Can the original hook profile be retained on a custom replacement? | 新增；当前无对应独立题 | L爪数及按图FAQ支持复用原轮廓；改变钩型须按新图评审，不能自动宣传重新设计性能提升。 |
| 8 | Which inspection records can accompany a metal-shredder cutter order? | 新增·条件候选；当前无对应独立题 | 拟回答材料、硬度、花键/关键尺寸记录的实际可提供范围；C1待内部文件样例，未确认仅保留前7题。 |

### 3. twin-shaft-blades-battery

**关键词边界**：battery recycling pre-shredder cutters；不承接电池箔片分条刀、黑粉后续细碎或整线防爆方案。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失，且没有材料名单；不能机械加入材料/真空深冷卡。既有Environment字段保留，不据此扩成电池安全认证。

**潜在失效/错配主题（待验证）**：刃口磨损/崩口；轴向尺寸或隔套关系不符造成干涉；工作面腐蚀；图纸版本或刀位混用。均为候选关注，非事故记录。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 受控图纸下的替换配置 | L：Q2按批准图号/版本/材料/表面要求报价，Q6多位置 | 满足既有电池线对具体零件配置的采购需求（推导） | 工厂图纸版本/批次追溯实际制度；不承诺安全设计、认证或所有pack/cell均可用。 |
| 轴孔与成组轴向尺寸 | L：线切割Hex/Splined、±0.02 mm Thickness Parallelism | 为采购规定装配关键尺寸提供现有指标（推导） | 原字段将厚度和平行度合写，需明确基准与检验含义；不擅改原值、不推导整机间隙。 |
| 按工况约定的表面选项 | L：Optional Coatings防腐处理、HRC54–58；Q5按批准图纸选材 | 采购可将原有表面要求纳入替换件，而非只买几何外形（推导） | 具体涂层/钢号、结合力及介质试验未有；不写耐任意电解液、防爆或惰化安全保证。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which battery-recycling stage uses these shredder blades? | 保留；Q1 “Which battery-recycling stage uses these shredder blades?” | 明确预破碎工位；P8旧研究仅确认设备场景，本轮访问失败，不新增安全结论。 |
| 2 | Can Sureay supply battery pre-shredder cutters to an approved part drawing? | 重写；Q2 “Can battery pre-shredder cutters be manufactured to an approved drawing?” | 肯定按图报价；分开同配置替换与改材/改形，后者应有设备/工艺批准。 |
| 3 | Which dimensions determine whether a replacement cutter fits? | 保留；Q3 “Which dimensions determine whether a replacement cutter fits?” | 解释轮廓、轴孔、端面、轴向位置和隔套共同决定安装，不复印整张尺寸表。 |
| 4 | Can the same cutter be used for battery packs, modules and cells? | 保留；Q4 “Can the same cutter be used for battery packs, modules and cells?” | pack/module/cell是料流名，不是刀规格或通用适配标准。 |
| 5 | How should material and optional surface treatment be specified? | 重写；Q5 “How should material and optional surface treatment be specified?” | 保留Optional Coatings。只列原有可选防腐处理，不添加未有材料名；涂层型号/适用介质待C3。 |
| 6 | Can I include several cutter and spacer positions in one inquiry? | 重写；Q6 “Can I include several cutter and spacer positions in one inquiry?” | 多个轴位可同次询价，但刀/隔套分件列数量和版本；是否供应隔套待核。 |
| 7 | What does the listed cutter parallelism tolerance apply to? | 新增；当前无对应独立题 | 引用L±0.02 mm原字段，说明其属于零件轴向几何；正式答案须生产明确厚度公差与平行度的分别定义，不扩大到整套。此题为待技术澄清候选。 |
| 8 | What dimensional and material records are available for approved-drawing orders? | 新增·条件候选；当前无对应独立题 | C1/C3填实际随货资料与材料记录；没有样例前不上线，当前可保留6题。 |

### 4. single-shaft-shredder-blades

**关键词边界**：single-shaft shredder rotor knives / inserts / cutting crowns；固定stator单独页，granulator长条动刀亦单独页。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失；P1区分flat/concave/crown与定刀。恢复讨论应围绕可交付的刀面/安装/多刃结构，不把四向转位泛化到所有方块刀。

**潜在失效/错配主题（待验证）**：工作角磨钝/崩角；螺栓座或底面配合偏差；转位后仍使用受损座面；动静刀组合不符。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 刀具钢与具体硬化配置 | L：DC53/D2/Cr12MoV/42CrMo、HRC58–62及cryogenic表述 | 可对照原磨耗/冲击要求采购明确材质配置（推导） | 分钢号热处理/检测记录；不声称四牌号同炉艺或无条件同硬度。 |
| 多刀面与可转位结构 | L：Concave/Flat/V-Groove/Crown，90°四向转位；P1为行业结构证据 | 在实际支持转位的刀座上使用多工作刃，提供不同原机面形的替换（推导） | 逐Item No.转位资格；不写所有方刀可转、寿命四倍。 |
| 刀面与夹持座整体定制 | L：M12–M24沉头/圆柱头座、±0.02 mm面平度、另配定刀 | 替换件覆盖夹紧界面，且动静刀可同次报价（推导） | 实际测量方法/孔座图；紧固件不默认随刀包含。 |

**Technical FAQs：8 题候选，当前 7 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which single-shaft shredder rotor knife profiles can Sureay replace? | 重写；Q1 “How do I identify a replacement single-shaft shredder rotor knife?” | 先列现有四类刀面和螺栓座，再说明机型、底座、新件尺寸，积极回答范围。 |
| 2 | Are rotor knives, rotor inserts and cutting crowns the same part? | 保留；Q2 “Are rotor knives, rotor inserts and cutting crowns the same part?” | rotor knife泛指动刀，insert/crown是设计称呼；不等于整根转子或定刀。P1。 |
| 3 | How do flat and concave cutting faces differ? | 保留；Q3 “How do flat and concave cutting faces differ?” | 对比flat/concave的接料方式，不无条件评价优劣；P1仅特定OEM刀面说明。 |
| 4 | Can I rotate a worn square insert to another cutting edge? | 保留；Q4 “Can I rotate a worn square insert to another cutting edge?” | 仅支持转位的刀和刀座才可换边；保留原4-way规格，不添倍率。 |
| 5 | How should the listed tool steels be selected? | 重写；Q6 “How should the listed tool steels be selected?” | 列L钢号与目标硬度，选择依原配置、材料、磨耗；深冷具体参数待工艺证据。 |
| 6 | Can custom cutting faces and fixing-bolt seats be supplied? | 重写；Q5 “Can custom cutting faces and fixing-bolt seats be supplied?” | 按图供应刀面、底面、螺栓座；不默认含螺栓。 |
| 7 | Can rotor knives and matching bed knives be quoted together? | 保留；Q7 “Can rotor knives and matching bed knives be quoted together?” | 动刀和定刀分图号/数量同次报价，并保留互链。 |
| 8 | Why can a single-shaft shredder cut poorly after its rotor knives are replaced? | 新增；当前无对应独立题 | 新转子刀只恢复移动工作刃；固定刀磨耗、原切削间隙及刀面与料流不相称仍可能影响切削（P1的动静刀配合、刀面与调隙段）。替换决策应同时考虑L的flat/concave等实际面形和定刀状态；不是要求一律换整套，也不提供跨机型统一间隙。此题解释残余问题，与Q1尺寸识别及Q4能否转位不同。 |

### 5. single-shaft-bed-knives

**关键词边界**：single-shaft shredder stator / bed / counter knives；承担固定长刀和分段刀，granulator bed knife不合页。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失。需要长刀/分段、刃形和安装共同定义的制造价值；不再只写固定刀的定义。

**潜在失效/错配主题（待验证）**：长刀弯曲或直线度变化；刃口磨钝/锯齿受损；端段与中段孔位混用；磨后高度不足。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 定刀钢材与透硬配置 | L：D2/DC53/42CrMo/chipper steel，HRC56–60透硬 | 为工作边维护和原材料替换提供明确配置基础（推导） | 透硬深度/截面检验与各钢号适用工艺；不承诺不限重磨次数。 |
| 长刀和切削边加工 | L：279–3000 mm，定制单片3500 mm，直线度≤0.05 mm/m；单/双斜、锯齿 | 长固定刃和不同刃形有对应供货选择（推导） | 最大长度具体截面及长件检测；不等于安装后全长剪切间隙保证。 |
| 分段与安装形式配套供应 | L：长孔/沉孔/螺纹孔，分段刀，另配rotor inserts | 同一采购可覆盖端段、中段和配套动刀，保留各件身份（推导） | 分段组合图与交付记录；不写所有品牌通用。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Are stator knives, bed knives and counter knives the same part? | 保留；Q1 “Are stator knives, bed knives and counter knives the same part?” | stator/bed/counter在本页指单轴固定刀；其它机器同名不等于同件。P1。 |
| 2 | How do I identify the correct knife in a segmented stator set? | 重写；Q2 “How do I identify the correct knife in a segmented stator set?” | 先说明可供应单片长刀及分段组，再讲端段、中段孔槽与位置区别。 |
| 3 | Can a plastic granulator bed knife replace a shredder stator knife? | 保留；Q3 “Can a plastic granulator bed knife replace a shredder stator knife?” | 明确granulator工位不同，保留指向Plastic Granulator Knives的内链。P2。 |
| 4 | Which custom edge and mounting details can be reviewed? | 重写；Q5 “Which custom edge and mounting details can be reviewed?” | 列已支持的三种刃形和三种孔形式；强调实际产品配置，不用一整段发资料指令。 |
| 5 | Can I order a replacement using measurements from a reground knife? | 保留；Q4 “Can I order a replacement using measurements from a reground knife?” | 原高度与重磨高度分开，不能复制磨损尺寸生产；不新增统一报废高度。 |
| 6 | How do I order stator knives together with rotor inserts? | 保留；Q6 “How do I order stator knives together with rotor inserts?” | 分开定刀段与动刀件号、数量，可一起询价；配套关系保持。 |
| 7 | Which materials and hardness ranges are listed for shredder stator knives? | 新增；当前无对应独立题 | L四类材料及HRC56–60；回答材料/热处理一起考虑，钢号间不无条件等同。 |
| 8 | Can long and segmented stator knives be supplied to custom lengths? | 新增；当前无对应独立题 | L现有279–3000、定制单片3500 mm；分段长度/孔位按装配图，不能表述任意截面都达3500。 |

### 6. granulator-blades

**关键词边界**：plastic granulator knives / rotor knives / fly knives / bed knives / plastic crusher knives；本页是塑料再生料切削动定刀，非单轴方块转子刀、压实机刀或切粒刀。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失。P2支持刃角、动定刀布置与切削关系；不能借其特殊剪切机构性能当Sureay通用卖点。

**潜在失效/错配主题（待验证）**：刃口钝化/崩口；动定刀孔位或角度不配；磨后切圆/调隙余量变化；高填料或污染带来的磨耗。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 塑料粉碎刀的钢材与硬化选择 | L：D2/SKD11/DC53/Cr12MoV，HRC58–62，真空及−196°C深冷 | 提供明确材料和原有工艺配置作为采购比较项（推导） | 具体钢号工艺与炉次检验；不能声称深冷适合全部配置或固定寿命提升。 |
| 刀面、孔位与刃角的加工控制 | L：30°–55°、孔位±0.02、平面≤0.05、平行≤0.03 mm；P2说明布局关系 | 关键尺寸围绕动定刀装配而定义，便于按图验收（推导） | 基准及检测图；不等于成品粒径保证或统一刀间隙。 |
| 动刀和定刀同次采购 | L：两刀位、90–1178 mm、按图/样件；P2支持部件区分 | 把完整切削对纳入采购，而非混买相似直刀（推导） | 配套案例；无现有品牌列表不增加全品牌覆盖。 |

**Technical FAQs：8 题候选，当前 7 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Can Sureay supply replacement rotor and bed knives for plastic granulators? | 重写；Q1 “How do I match replacement plastic granulator knives to my machine?” | 先答两刀位和按图替换，保留机型/刀位/件号识别；尺寸表逐配置，不是品牌全系。 |
| 2 | What is the difference between rotor, fly and bed knives? | 保留；Q2 “What is the difference between rotor, fly and bed knives?” | rotor/fly是动刀，bed是定刀；P2。 |
| 3 | Are plastic crusher knives the same as granulator blades? | 保留；Q3 “Are plastic crusher knives the same as granulator blades?” | crusher是较宽采购叫法；解释再生料工位并分流单轴转子、pelletizer。 |
| 4 | How do feedstock and knife condition affect material selection? | 重写；Q6 “How do feedstock and knife condition affect material selection?” | L钢号、硬度与PET/PVC/PP/HDPE，填料及污染影响选型；不机械最高硬度优先。 |
| 5 | Why do straight and slanted knife arrangements need different drawings? | 保留；Q5 “Why do straight and slanted knife arrangements need different drawings?” | 刃角可来自刀形或安装形式，按真实动定刀布局；P2。 |
| 6 | Is there a standard knife gap for all plastic granulators? | 保留；Q7 “Is there a standard knife gap for all plastic granulators?” | 不提供跨机器通用间隙；磨后调整范围由OEM；保留问题的实际用户价值。 |
| 7 | Can granulator knives be made to a custom drawing or sample? | 保留；Q4 “Can granulator knives be made to a custom drawing or sample?” | 按图样件定制，磨损高度另列；支持旧刀复刻但不宣称免费逆向设计。 |
| 8 | Why can granulator cutting quality change after the knives are reground? | 新增；当前无对应独立题 | 重磨改变刃口位置；不同机器调动刀或调定刀的方式不同，切圆、间隙和刀尖/相交角度都会影响切削（P2 84–89行）。替换或重磨后应维持原配置，而不是以新硬度替代几何问题；不能给统一磨削量或间隙值。与Q7“有没有通用间隙”分工：本题讲重磨为何可能改变切削关系，Q7讲间隙适用范围；单次动定刀报价已有Q1/Q4可承接。 |

### 7. tire-shredder-blades

**关键词边界**：primary tire/tyre shredder cutters for whole-tire/TDF pre-shredding；rasper knives、rubber granulator knives是下游不同工位，不新增同义混合。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失。主张应从原有橡胶+钢丝负荷的材料/厚爪出发，不能把刀厚等同最终TDF尺寸。

**潜在失效/错配主题（待验证）**：钢丝/胎圈冲击崩刃；厚爪钝化；孔型/刀组位置不符；厚度被误当最终粒度。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 轮胎工况的材料与刃体配置 | L：modified A8/42CrMo及既有Cru-Wear(PGK)、HRC54–58 | 为橡胶夹钢丝工况提供原配置材料选择（推导） | Cru-Wear与PGK等同关系待证，不强化；材料/热处理与磨耗冲击数据未取得。 |
| 原刀组所需爪型与加工要求 | L：1/3/5爪、±0.05 mm及按图轴孔 | 替换涉及钩型、孔型和组合位置，可保留既有刀组结构（推导） | 公差的受控特征范围；不写换爪数必然改善产量或粒形。 |
| 整片、刃件与套刀的采购范围 | L：Q2/Q6说明完整刀盘、可换切削件与整套分别识别 | 报价能区分不同更换范围，便于维护采购（推导） | 哪些机型实际供刃件/整刀的目录证据；不默认配套螺栓隔套。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which tire-recycling cutting stage do these blades fit? | 保留；Q1 “Which tire-recycling cutting stage do these blades fit?” | 明确primary rotary-shear与下游rasper/granulator不同；tire/tyre自然合并。 |
| 2 | What dimensions identify an OEM replacement tire cutter? | 重写；Q2 “What dimensions identify an OEM replacement tire cutter?” | 先说明外径、刀厚、轴孔、爪型、整片/刃件配置，再讲机型图号；不复制他厂尺寸为Sureay适配。 |
| 3 | Does cutter thickness determine the final tire-chip size? | 保留；Q3 “Does cutter thickness determine the final tire-chip size?” | 厚度只是刀组参数，后续筛分/再切影响成品，P7为整机关系参考，不用M180数字解释所有轮胎机。 |
| 4 | What matters when selecting cutters for steel-reinforced tires? | 重写；Q4 “What matters when selecting cutters for steel-reinforced tires?” | 钢丝、胎圈与橡胶负荷不同；L材料与硬度仅为已有选项，不能宣布耐钢丝冲击认证。 |
| 5 | Can hook count or bore geometry be customized? | 保留；Q5 “Can hook count or bore geometry be customized?” | 自定义爪与孔可评审；结构修改与原型替换分开。 |
| 6 | Can I order one cutter or a complete replacement set? | 保留；Q6 “Can I order one cutter or a complete replacement set?” | 说明单件或全套均可按位置列报价；刃件/刀体是否分供逐件确认。 |
| 7 | Can tire shredder cutters be reground, or must they be replaced? | 新增；当前无对应独立题 | P15确认ELDAN部分轮胎刀按原厂建议可重磨，但不能扩成所有Sureay整片/可换刃件都适用。判断取决于刀体结构、损伤和原机允许几何；裂损或磨后不能恢复原刀组关系时，应按对应零件更换。保留L原规格，不增加重磨次数、去除量或Sureay磨刀服务承诺；材料和硬度内容继续由拟Q4及原规格承接，不再重复一题。 |
| 8 | What can cause rapid wear or chipped edges on tire shredder cutters? | 新增；当前无对应独立题 | 区分橡胶/夹杂物长期接触造成的渐进磨耗与钢丝、胎圈等间歇负荷下的局部崩损；刀组松动或几何配合异常也可能参与损伤（L原Q4、P11/P12）。磨耗主导时比较耐磨材料配置，崩损主导时兼顾韧性、爪型支撑与热处理，不能只选更高HRC。P11的堆焊是SSI自家方案，不新增Sureay堆焊能力；不作单因诊断或寿命保证。无需先有Sureay诊断服务记录才能解释一般机制。 |

### 8. shredder-screens

**关键词边界**：single-shaft shredder screens / screen baskets / screen plates；只讲排料筛分件，不与刀具总词竞争，不扩成所有granulator、dryer、centrifuge筛网。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失；S5原线上围绕筛型/材料/配套采购，方向适用。原“全部物料只切一次”“整套holder/spacer默认有货”不是可直接沿用的事实。筛网不能套用刀具淬硬卡。

**潜在失效/错配主题（待验证）**：孔磨大或喇叭口；孔间桥位裂纹；曲率/安装位置变形；堵孔使排料条件变化。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 耐磨板材与筛体结构选项 | L：S355J2、Hardox400/450/500、Hardfaced；P9为行业材料选择参考 | 可按原排料筛的磨损与成形需求选择已列板材（推导） | 材料证书、堆焊工艺；Hardfaced是旧目录声明，不等于已核验能力，不能自动扩为焊层硬度/全板复合板。 |
| 孔型、开孔率与成形几何 | L：8–80 mm孔、34–58%按图、交错/直排/长孔、篮/板/卡匣 | 提供实际需要的孔阵与筛体安装形式，采购不局限于孔径（推导） | 曲率/孔距/成形检测；不承诺每粒等于孔径、恒定吞吐或完全无堵塞。 |
| 按现有筛位替换并关联磨损件采购 | L：Q1/Q6按图样件筛位，动刀/定刀独立页；S5原配套主题 | 筛网与切削件可在同一项目辨识，明确分别报价（推导） | 实际刀座/夹条/隔套供货清单未核，不复制线上广泛套装承诺。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which replacement shredder screen forms can Sureay supply? | 重写；Q1 “How do I identify the correct replacement shredder screen?” | 先列半/全篮、板、sickle、cassette和现有孔径，再说明尺寸与安装曲率。 |
| 2 | Does aperture size equal the size of every discharged particle? | 保留；Q2 “Does aperture size equal the size of every discharged particle?” | 孔径不等于每粒尺寸，物料形态及切削过程相关；不引入产量数字。 |
| 3 | Can the hole shape and pitch be customized? | 重写；Q3 “Can the hole shape and pitch be customized?” | 保留交错/直排/长孔和定制孔距；L开孔率34–58%依图；不拷贝P9额外三角/六角等未确认选项。 |
| 4 | What is the difference between a screen basket, cassette and plate? | 保留；Q4 “What is the difference between a screen basket, cassette and plate?” | 解释basket/cassette/plate结构名称，按实际框架和固定面；不要写成相同规格的别名。 |
| 5 | How should screen material be selected? | 重写；Q5 “How should screen material be selected?” | 列原S355J2、Hardox和Hardfaced；用途与支撑结构共同考虑，筛网不按刀刃HRC热处理。 |
| 6 | Can a worn basket or plate be used as a sample? | 保留；Q6 “Can a worn basket or plate be used as a sample?” | 可提供旧筛，区分孔磨大与塑性变形，原图/未磨损区域支持复原。 |
| 7 | What do plate thickness, ligament width and open area describe? | 新增；当前无对应独立题 | 原表12–30 mm厚、5–20 mm桥位与开孔率分别属筛体参数；解释三者关联，原值保留，不能用P9的25 mm上限改Sureay原表。 |
| 8 | Can screens and matching cutting parts be included in the same order? | 新增·条件候选；当前无对应独立题 | 可整理筛网、动刀、定刀的独立询价；C2核实套装供应内容与配件清单后才答完整供货，不能把S5原宣传当订单证据。 |

### 9. wood-chipper-blades

**关键词边界**：wood chipper knives/blades for drum/disc/biomass；固定anvil独立页；grinder teeth和整块chipper disc非本件。

**当前优势区**：1. “Cutting edge and mounting pattern”；2. “Steel and carbide-tipped constructions”；3. “Moving knife and stationary anvil”

**现状判断**：本地三卡偏结构说明。S2原线上主题是硬化/重磨、污染冲击、磨削刃角；保留这些可讨论方向，去掉无裂纹保证、EN/TAPPI符合性以及量化寿命未经验证部分；绝非整区删成选型课。

**潜在失效/错配主题（待验证）**：刀口钝化使切削条件变化；异物冲击崩刃；重磨后高度不足；刀厚/夹持面或固定砧磨损导致工作位置变化。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 钢材、刃部结构与可维护刀体 | L：chipper steel/D2/Cr12MoV/TCT、分材料硬度、条件性8–12次重磨；S2原主题 | 不同刃部配置可对应采购预算及已有维护方式（推导） | 热处理/重磨实际记录；不可把钢的真空深冷/透硬套到硬质合金刃，不保证每次同新刀性能。 |
| 刃角和夹持几何共同加工 | L：25°–42°、厚度±0.05 mm、孔/夹面按图 | 按原机器采购受控刀体与刃口，方便同组装配（推导） | 量测与机台运行数据；不直接保证木片分布、无振动或符合成品燃料标准。 |
| 鼓盘刀及配套定砧的按图供货 | L：230–600 mm、定制800 mm、单独定砧同询价 | 采购可同时覆盖移动刀与固定磨损件（推导） | 具体型号图号与套供记录；Morbark50/48 Disc、Peterson5710 Disc原标签待核，原表保留但不扩入营销。 |

**Technical FAQs：8 题候选，当前 7 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Can Sureay supply replacement knives for drum and disc wood chippers? | 重写；Q1 “How do I identify the correct replacement wood chipper knife?” | 先答现有鼓/盘刀范围，再列机型序列号、原刀号、刃角/安装。争议机型标签不强化。 |
| 2 | Are chipper blades, chipper knives and grinder teeth the same? | 保留；Q2 “Are chipper blades, chipper knives and grinder teeth the same?” | chipper blade/knife是动刀，grinder tooth/chipper disc是不同部件，保留准确名称边界。 |
| 3 | How should chipper steel, D2 and carbide-tipped options be compared? | 重写；Q5 “How should chipper steel, D2 and carbide-tipped options be compared?” | L钢/镶硬质合金与各硬度分开，污染状况和旧磨耗辅助评审；不把最高硬度当最好。 |
| 4 | Are reversible knives and resharpenable knives the same thing? | 重写；Q4 “Are reversible knives and resharpenable knives the same thing?” | 区分换刃和重磨；原8–12次仅在剩余高度/磨耗允许条件下，未有案例不能保证次数。 |
| 5 | Why should the anvil be checked when replacing chipper knives? | 保留；Q6 “Why should the anvil be checked when replacing chipper knives?” | 动刀和定砧共同工作，磨损定砧不会因换动刀自动恢复；间隙按原机，P5/旧Vermeer。 |
| 6 | Can wood chipper knives be made to a custom drawing? | 保留；Q3 “Can wood chipper knives be made to a custom drawing?” | 按图刃角/孔位/夹面供货，样件磨后尺寸另列；不扩大到未知最大截面。 |
| 7 | Can moving knives and the anvil be included in one inquiry? | 保留；Q7 “Can moving knives and the anvil be included in one inquiry?” | 两类独立图号与数量一起询价，保留anvil互链。 |
| 8 | Why can a wood chipper produce stringy or uneven chips? | 新增；当前无对应独立题 | P14将长条状/不均匀木片与刀口变钝联系，并指出砂、金属和杂物可能加快磨损；磨后剪切配合也需按原机要求恢复。说明刀钝、定砧/间隙及料流均可影响输出，不能仅凭木片形状认定钢材错误。采购上先区分可按规定重磨与需替换的损伤，再考虑L现有钢/镶合金配置；不保证换新刀后所有木片尺寸一致。与Q4能否翻刃/重磨、Q6定砧作用区分。 |

### 10. wood-chipper-anvils

**关键词边界**：wood chipper anvil / counter knife / stationary bed knife；承接固定工作边，动刀另页，crusher anvil或通用机器砧不纳入。

**当前优势区**：1. “Working edge and seating faces”；2. “Slots and shim adjustment”；3. “Anvil and moving knife geometry”

**现状判断**：现有卡谈工作边/垫片/配对，本地偏使用说明；应用S2材料+加工+配套结构，但需针对固定砧，不能复制动刀钢号或深冷。

**潜在失效/错配主题（待验证）**：工作角磨圆；重磨使高度不足；长孔/座面磨损影响定位；非翻面设计被错误翻用。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 固定砧的材料与透硬配置 | L：D2/Cr12MoV/modified A8/42CrMo，HRC54–60透硬 | 采购可以指定原固定刃的材料/硬度配置（推导） | 芯部硬度记录、条件性5–10次重磨依据；不写所有牌号同寿命。 |
| 切削边和可调整安装面 | L：单斜30°–37°、长孔/垫片、平行±0.05 mm | 替换件保留工作边与原调隙安装的关系（推导） | 孔位、座面、平行度验收图；不是装机间隙自动保证。 |
| 独立定砧及动静刀联合报价 | L：185–400 mm、定制600 mm、Q4样件/图纸、Q6单购 | 按真实磨损范围采购单砧或相关动刀，避免强制整组（推导） | 订单范围、左右位置/可翻面清单；不承诺全部anvil四面可用。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | What does the anvil do in a wood chipper? | 保留；Q1 “What does the anvil do in a wood chipper?” | 一句直接说明固定切削边作用及磨圆影响，不变成操作教程。P5。 |
| 2 | Are anvil, counter knife and bed knife always the same component? | 保留；Q2 “Are anvil, counter knife and bed knife always the same component?” | anvil/counter/bed有时对应不同图号，以结构和件号辨认。 |
| 3 | How are replacement anvils identified for a specific chipper model? | 重写；Q3 “Does one replacement anvil fit all machines from the same brand?” | 改积极识别问法，保留机型/序号/位置/孔槽/调整形式；品牌不是通配证明。 |
| 4 | Can an anvil be manufactured from a drawing or worn sample? | 保留；Q4 “Can an anvil be manufactured from a drawing or worn sample?” | 支持图纸样件，固定面与工作边磨损分开记录。 |
| 5 | Can I turn a worn anvil to expose another edge? | 保留；Q5 “Can I turn a worn anvil to expose another edge?” | 翻面受实际多刃结构限制；不因有多面就可翻。 |
| 6 | Can I order the anvil separately from the moving knives? | 重写；Q6 “Can I order the anvil separately from the moving knives?” | 可单购anvil或与动刀同询价，分件号数量；原已确认供货方式保留。 |
| 7 | Which materials and hardness values are listed for chipper anvils? | 新增；当前无对应独立题 | L材料及HRC54–60，透硬为目录声明；不把动刀TCT移植定砧。 |
| 8 | Can a chipper anvil be reground instead of replaced? | 新增；当前无对应独立题 | L现有5–10次有剩余高度/磨损条件，解释是否可重磨由图纸和OEM界限，不宣布Sureay提供磨刀服务或统一次数保证。 |

### 11. strand-pelletizer-rotors

**关键词边界**：strand pelletizer cutting rotor / pelletizing cutter rotor；冷却条料切粒刀转子，非die-face独立片刀；repair词不自动变维修服务。

**当前优势区**：1. “Helical and straight-edge rotor forms”；2. “Steel and carbide cutting constructions”；3. “Rotor and stationary bed knife”

**现状判断**：现有三卡多属结构识别；S3原主题是动平衡、螺旋几何、钎焊结构，适合回到产品价值。5轴设备、专有真空钎焊、永不脱齿、零振动未有内部凭据，不自动恢复。

**潜在失效/错配主题（待验证）**：齿刃磨耗/崩口；轴向齿形或径跳偏差；动刀与固定刀配合变化；镶合金结合部受损。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 钢与硬质合金刃部结构 | L：M2/M35/ASP2023/ASP2052/CPM10V、整体/钎焊硬质合金；S3钎焊主题 | 按原条料/填料工况采购不同刃部配置（推导） | 牌号证书、结合强度/钎焊工艺；不把硬质合金说成淬火钢，不承诺不脱齿。 |
| 齿形、跳动和平衡要求 | L：≤0.005 mm、Ra0.2、ISO1940-1 G2.5，螺旋/直齿 | 报价与验收可围绕实际旋转切削关键指标展开（推导） | 转速/测量基准/动平衡记录；不说零振动、无断条或降低电耗。 |
| 完整转子接口与齿形定制 | L：10–60齿系列、定制120、1.5/2/3°定制、轴端与有效宽 | 供应覆盖轴端、切宽和刀齿的完整替换配置（推导） | 每图适用界限与原机型图号；不扩大到维修/重涂服务。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which strand pelletizer rotor configurations can Sureay supply? | 重写；Q1 “Which measurements identify a replacement strand pelletizer rotor?” | 先答螺旋/直齿与钢/硬质合金、现有外径，再说明轴端/有效切宽等识别字段。 |
| 2 | Are pelletizing cutter rotors and strand pelletizer rotors the same? | 保留；Q2 “Are pelletizing cutter rotors and strand pelletizer rotors the same?” | pelletizing cutter rotor与strand rotor在此工位可对应；转子不能当作整台切粒机。 |
| 3 | How does a strand-cutting rotor differ from a die-face cutter? | 保留；Q3 “How does a strand-cutting rotor differ from a die-face cutter?” | 冷却条料在转子/定刀之间切粒，与模面刀毂处独立刀片不同；保留die-face内链。 |
| 4 | What should I consider when choosing HSS or carbide cutting edges? | 重写；Q5 “What should I consider when choosing HSS or carbide cutting edges?” | L钢/PM/整体或钎焊合金，依据填料/磨耗和原配置；不承诺某材料必然更长寿命。 |
| 5 | Can tooth count, helix and shaft ends be made to drawing? | 重写；Q4 “Can tooth count, helix and shaft ends be made to drawing?” | L齿数、螺旋角及轴端定制范围；以图纸限制组合，不把120齿设为所有直径默认。 |
| 6 | Can photographs and a used rotor support a replacement quotation? | 保留；Q6 “Can photographs and a used rotor support a replacement quotation?” | 旧转子和照片可支持报价，磨损面与原尺寸分离；不答免费维修或样件快速交付。 |
| 7 | Which runout and balancing requirements are listed for replacement rotors? | 新增；当前无对应独立题 | L≤0.005 mm、G2.5、Ra0.2各含义；原数据保留，工作转速、残余不平衡量、报告C1待核。 |
| 8 | What can affect pellet quality after a strand cutting rotor is replaced? | 新增；当前无对应独立题 | 新转子不是决定切粒质量的唯一因素；刀/定刀切削间隙及条料冷却、导入状态同样相关。P16的M²-USG说明参数错误可导致粘条和切削不稳，间隙稳定有助于粒形；这里只借其部件/工艺关系，不把水下系统参数移植为干切操作要求。替换时区分齿刃磨耗与原机配合/喂料问题，保留L齿形、跳动等原指标；不保证更换某材质即可消除所有不良粒。 |

### 12. continuous-melt-filter-scraper-blades

**关键词边界**：continuous melt filter scraper blades / melt filter knives；scraper是载体上的刮刀，filter plate与carrier为不同件；过滤系统性能与刮刀性能分开。

**当前优势区**：1. “Scraper edge and screen surface”；2. “Blade body and carrier interface”；3. “Steel and carbide blade configurations”

**现状判断**：本地三卡虽保留部件关系，但销售价值弱。S4原主题硬度配合/滤孔/失效路径；其中滤板HV1000+与80–2000 µm必须标为配套滤板，不能丢失也不能变刮刀参数。150–400 bar、每票硬度报告、寿命200h门槛不自动恢复。

**潜在失效/错配主题（待验证）**：刮刃磨耗/崩口；刮刀/载体几何不配；滤面磨痕；PVC/混料条件下腐蚀或温度影响。不是已证实投诉，系统压力变化不能单归刀片。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 刮刀材料和可选表面配置 | L：D2/H13/硬质合金、钢刀HRC58–62、H13/合金配置300°C、Optional Coatings | 可在报价中对应客户实际温度/介质和原件材料要求（推导） | 涂层名称、抗HCl合金牌号、温度/腐蚀试验；不承诺任何PVC流都耐腐蚀。 |
| 工作刃与载体安装面的加工 | L：轮廓±0.05、厚±0.02 mm，刃口/接口按图；P4区分scraper与screen | 替换件覆盖实际接触形状和安装体，便于按图验收（推导） | 检测基准、刀/板硬度配对记录；不能宣称滤面永不划伤。 |
| 刮刀及配套滤板分件采购 | L现有卡记录滤板HV1000+和80–2000 µm；S4确认历史信息归属 | 报价能区分耗材刮刀与滤板资本件及各自图纸（推导） | 滤板实际供货范围和孔/硬度检验、C2；不把系统恒压/反冲洗压力保证成零件优势。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | What do melt filter knives and scraper blades refer to? | 保留；Q1 “What do melt filter knives and scraper blades refer to?” | melt filter knife/scraper指清理滤面的刃件；P4不意味着所有品牌机构相同。 |
| 2 | Which replacement scraper profiles and mounting interfaces can Sureay supply? | 重写；Q2 “How do I match a replacement scraper to my melt filter?” | L轮廓、厚度、载体安装按图，先说可供配置再说明型号/原号；不泛称全滤机通用。 |
| 3 | Which process information matters for scraper material selection? | 重写；Q4 “Which process information matters for scraper material selection?” | L材料、温度只限H13/合金，涂层与抗腐蚀选项保留；具体介质/配方适用需证。 |
| 4 | Are the scraper, screen plate and carrier interchangeable parts? | 保留；Q5 “Are the scraper, screen plate and carrier interchangeable parts?” | 刮刀、滤板、carrier分件；滤板硬度/孔径不能写成刮刀参数。 |
| 5 | Does a self-cleaning filter require a specific scraper geometry? | 重写；Q6 “Does a self-cleaning filter require a specific scraper geometry?” | 自清洁需具体刃形/载体/滤面关系；P4是某OEM工作原理，不保证通用自磨、恒压。 |
| 6 | Can scraper profiles be reproduced from a sample? | 保留；Q3 “Can scraper profiles be reproduced from a sample?” | 样件可复核轮廓/安装，缺损区域与原形区分。 |
| 7 | How are scraper hardness and filter-plate properties specified separately? | 新增；当前无对应独立题 | 钢刮刀HRC58–62；HV1000+、80–2000 µm属于原配套滤板资料。保持量纲与件名，不换算成所有材料的统一硬度差。需工厂确认实际配套。 |
| 8 | Can replacement scrapers and filter plates be quoted as separate line items? | 新增·条件候选；当前无对应独立题 | S4原站已有配套主题但内部订单未取得；C2先确认能供哪种滤板，不能承诺随货证书/所有孔径/任何品牌。未确认保留7题。 |

### 13. cutter-compactor-blades

**关键词边界**：cutter-compactor / cutter-compacter / agglomerator knives；挤出前薄膜/片料预处理，不与plastic granulator regrind、strand pelletizer或die-face切粒同页。

**当前优势区**：1. “Rotor, stator and pre-cutter parts”；2. “Tool-steel and carbide-tipped options”；3. “Preconditioning before extrusion”

**现状判断**：现有卡只有材料项已接近价值表达，其余位置/预处理内容重复FAQ。P3成熟厂商用材料、刃角及单独刀座组织产品，可参考表达结构，不能复制现货/次日发货。

**潜在失效/错配主题（待验证）**：膜料切削刃磨钝；异物导致崩口；刀/座或动静刀位置混淆；磨后间隙或安装面变化。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 钢刀与镶合金刃的实际选项 | L：D2/M2/镶硬质合金及各自HRC/HRA，真空/深冷原字段；P3 | 采购可分清整体钢刀与复合刃结构的配置（推导） | 钢体热处理与硬质合金刃分开；无钎焊记录不新增专有工艺、无寿命比较。 |
| 长刀面与安装平面的加工 | L：平面度≤0.03 mm、平行≤0.02 mm，按图轮廓/刀刃 | 关键配合面有具体验收目标，而非只供应相同长度刀片（推导） | 基准/量测报告；0.2–0.5 mm间隙是机器相关原值，不是所有机器装配保证。 |
| 动刀、定刀、预切刀和刀座分件供应 | L：四类Knife Types和Q6独立刀座，80–400 mm；P3仅术语佐证 | 一次询价可覆盖实际磨损部位，同时明确刀和座的不同采购量（推导） | 刀座具体供货记录/材料未有，不默认每把刀含座。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Are agglomerator knives and cutter-compactor blades the same? | 保留；Q1 “Are agglomerator knives and cutter-compactor blades the same?” | 解释agglomerator/compacter采购名称与挤出前处理工位；P3。 |
| 2 | Which rotor, stator and pre-cutter knives are available? | 重写；Q2 “How do I identify the rotor and stator knives in a compactor?” | 先说L三类刀位及独立刀座，再说明不同安装方向/图号；不是纯定义。 |
| 3 | Can a granulator knife replace a cutter-compactor knife? | 保留；Q5 “Can a granulator knife replace a cutter-compactor knife?” | granulator制造regrind，compactor挤出前预处理，外形相似不互换，保留granulator内链。 |
| 4 | Why does film or flake feed matter when selecting a knife? | 重写；Q4 “Why does film or flake feed matter when selecting a knife?” | 薄膜/片料/纤维/泡沫等原feedstock与原刃形一起考虑；不新增整机产量或能耗结论。 |
| 5 | Can replacement knives be made from an original drawing or worn sample? | 保留；Q3 “Can replacement knives be made from an original drawing or worn sample?” | 按图样件支持，磨损尺寸另列，不能复制磨后高度。 |
| 6 | Is a knife holder included with the replacement blade? | 保留；Q6 “Is a knife holder included with the replacement blade?” | 刀/holder分别列数量，原有holder配置保留；不默认包含配件。 |
| 7 | Which steel and carbide-tipped options are listed for cutter-compactor knives? | 新增；当前无对应独立题 | 列D2 HRC58–61、M2 HRC62–64、合金HRA89–91，各标尺分开；工艺描述只适用已证实钢体。 |
| 8 | Is one rotor-to-stator gap suitable for all cutter compactors? | 新增；当前无对应独立题 | 原0.2–0.5 mm须保留machine-dependent；实际按OEM机器/刃形，不把范围改为普适安装说明。 |

### 14. die-face-cutting-knives

**关键词边界**：die-face / hot-face / water-ring / underwater pelletizer knives；刀毂上的独立刀片；不与strand rotor共用适配或泛用underwater名称。

**当前优势区**：1. “Straight, forked and stepped knife bodies”；2. “Blade orientation at the die face”；3. “Individual knives on a cutter hub”

**现状判断**：现有三卡是刀形/朝向/工位分类，没解释供应价值；应围绕现有成套一致性、刃材/模面关系、图形与安装定制。P4非本工位，不可借滤网硬度；本件依据L自己的Hardness Differential。

**潜在失效/错配主题（待验证）**：刃口磨损或崩口；一组刀的厚度/座高差影响接触；槽孔/方向与毂不符；刀材与模面组合不合适。拖尾/连粒仅潜在输出关注，不断言刀片单因。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 刃材与模面接触配置 | L：D2/M2/T42/PM-HSS/440C/carbide，刀硬度低于模面原配置 | 为不同原机切粒配置提供有边界的材料方案（推导） | 材料证书/实际刀模硬度组合；不强制所有硬质合金都低于任何模面，不新增统一HRC值。 |
| 成组厚度与平面控制 | L：同组厚差≤0.01 mm、平面≤0.01 mm、CMM-verified原供货声明 | 买家可按组指定一致的接触位置与验收项目（推导） | 成组实测/CMM记录；不可直接保证无拖尾、无连粒或良率提升。 |
| 刀体、槽肩与刀毂的定制供货 | L：直/叉/台阶刀体，45°/90°/台阶/曲钩刃，配套hub/die plates | 按真实刀毂安装结构订替换刀组，并区分配套件（推导） | 刀毂/模头板实际供应清单、图号；不宣称水下/水环/热切刀通用。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | Which replacement die-face knife profiles can Sureay supply? | 重写；Q1 “How do I identify the correct replacement die-face cutting knife?” | L直形/叉形/台阶及槽肩与刃形，先答范围再说明刀毂号/厚度/座面。 |
| 2 | Are underwater, water-ring and hot-face pelletizer knives interchangeable? | 保留；Q2 “Are underwater, water-ring and hot-face pelletizer knives interchangeable?” | 三种工艺名非同一种安装；underwater strand与die-face不同，不把名称当兼容性。 |
| 3 | How should I select the knife material? | 重写；Q5 “How should I select the knife material?” | 列L材料，联系原刀模配对；硬质合金不当成通用更优升级。 |
| 4 | Why are thickness and seating height important within a knife set? | 重写；Q4 “Why are thickness and seating height important within a knife set?” | 引入原同组≤0.01、平面≤0.01 mm为目录要求；解释受控位置，CMM证明待取得。 |
| 5 | Can a custom knife be made from one of the illustrated profiles? | 保留；Q3 “Can a custom knife be made from one of the illustrated profiles?” | 图例是已有刀体形态，生产按完整图和样件；不恢复用户已删冗长图注。 |
| 6 | What information is needed for a complete pelletizer knife set? | 重写；Q6 “What information is needed for a complete pelletizer knife set?” | 按刀位、版本、数量组询价，保留原公司采购信息；不默认所有刀组同一片型。 |
| 7 | Can cutter hubs and die plates be quoted with replacement knife sets? | 新增；当前无对应独立题 | L Supply Format已有可供hub/dieplate，回答分件图号和报价；内部交付范围C2待证，不写所有OEM整套可供。 |
| 8 | Which inspection results can be supplied for a matched knife set? | 新增·条件候选；当前无对应独立题 | C1要求实际成套厚度/平面测量与CMM样例；不能将CMM-verified目录文本扩大为每次随货报告。未确认保留7题。 |

### 15. special-shaped-blades

**关键词边界**：special-shaped industrial blades / custom-profile replacement knives / profiled machine knives；本页展示具体轮廓零件，/custom承接通用制造和项目流程，不能两页同写所有custom industrial blades。

**当前优势区**：缺失：当前 components 未定义。

**现状判断**：本地 components 缺失。P6证明异形件按实际轮廓/件号/图样采购的行业表达；不能把他厂用途、涂层、重磨服务全部变Sureay产品范围。

**潜在失效/错配主题（待验证）**：镜像/左右手件订错；刃口到安装基准位置错误；磨损件被照抄成新尺寸；改材后刃口/装夹适用性未评估。

| 候选优势选题（中文） | 当前事实 / 来源 | 买家价值（推导） | 待核断言及限制 |
| --- | --- | --- | --- |
| 非标准外形和工作刃的制造 | L：按图外廓、刃口、孔槽；Q5左右手/镜像；P6 | 为标准尺寸表之外的专用替换刀提供具体采购路径（推导） | 批准展示的已做案例、复杂度和最薄/最大范围；不承诺任意几何均可做。 |
| 材料与刃部构造的项目选择 | L：D2/H13/PM-HSS/carbide，Q4区分原型替换和修改 | 可以按真实切削任务对照原材料配置采购（推导） | 具体牌号/硬度/热处理与介质记录；不套通用真空深冷或食品医疗认证。 |
| 安装基准下的尺寸定制 | L：±0.02 mm原公差、孔槽/刃向与基准定义 | 报价可围绕真正决定装配的特征与图纸展开（推导） | ±0.02具体受控特征/测量方法；不宣称全部长度/轮廓都同公差。 |

**Technical FAQs：8 题候选，当前 6 题全部有去向。**

| 拟序 | 英文工作问题 | 动作与当前原题映射 | 中文回答要点 / 证据与未知 |
| --- | --- | --- | --- |
| 1 | What is a special-shaped industrial blade? | 保留；Q1 “What is a special-shaped industrial blade?” | 说明非标准外廓或刃形，custom-profile/specialty是真实采购别名；不堆所有用途。 |
| 2 | Can a custom-profile replacement be developed from a worn sample? | 保留；Q2 “Can a custom-profile replacement be developed from a worn sample?” | 磨损样件支持识别，未磨损区域或配合件补原几何；不直接承诺完美逆向。 |
| 3 | Which details belong on a special-profile knife drawing? | 重写；Q3 “Which details belong on a special-profile knife drawing?” | 轮廓、厚度、槽孔、刃向、基准与关键公差；保留±0.02原值但应明确图上哪一特征适用。 |
| 4 | How do I distinguish left-hand, right-hand and mirrored profiles? | 保留；Q5 “How do I distinguish left-hand, right-hand and mirrored profiles?” | 图上视向、切向和刃在何侧，避免镜像件错订；照片两面仅辅助不是万能图纸。 |
| 5 | Can I change the material while retaining the existing blade shape? | 重写；Q4 “Can I change the material while retaining the existing blade shape?” | 列L材料，原样替换与材料修改分开；不能外形一样就称等效，具体热处理待核。 |
| 6 | What should I provide for a custom-profile blade quotation? | 重写；Q6 “What should I provide for a custom-profile blade quotation?” | 本页报价聚焦具体刀图/样件、机位、材料和数量；/custom介绍通用流程，避免关键词职责重复。 |
| 7 | Can left- and right-hand blades be supplied as a matched pair? | 新增·条件候选；当前无对应独立题 | L仅已记录左右手识别，不等于配套制造履历；C2需真实镜像套件例，再说明两图号/各数量，未证合并Q5。 |
| 8 | What production limits apply to a custom-profile blade? | 新增·条件候选；当前无对应独立题 | C3填最大/最薄、逐特征公差与材料限制；现无范围，不编数字，不拿P6竞品能力回答。当前6题足够。 |

## 五、全局商业资料占位：先核实，再决定哪些题值得出现

这些是内部资料栏，不能原样成为网页的待确认提示，不能编造答案。已有产品级“按图/样件”和单件/配套内容可按原记录保留；下面更强的服务承诺另行取得依据。

| 编号 | 信息 | 当前可用程度 | 填写者 / 需要的实际资料 | 不得预填的答案 |
| --- | --- | --- | --- | --- |
| C1 | 质量和随货记录 | 目录存在 CMM、硬度、平面等参数；未取得该产品的实际报告或逐票政策 | 质量：脱敏尺寸/硬度/材质/平衡报告，哪些常规附送、哪些依订单约定 | 每票证书、逐件全检、全部参数CMM、可任意追溯 |
| C2 | 配套供货和订单范围 | 有些产品明列刀座、刀毂、滤板、成套；机械配合关系本身不证明全部配件能供应 | 销售/生产：对应图号及交付BOM；单购、成组和套装实际范围 | 所有品牌配套、任何隔套/螺栓默认含、全套现货 |
| C3 | 材料、表面和工程复核服务 | 已有材料/涂层选项应保留；具体牌号—工艺—应用关联尚不完整 | 生产/质量：牌号证书、工艺卡、涂层和试验范围、可公开制造极限 | 所有材料真空深冷、筛网淬到刀具HRC、自动提供FEA/诊断设计 |
| C4 | MOQ、样品、交期、物流、付款及保障 | 无可用于本批全部产品的批准统一政策；旧站商业陈述不是新确认 | 销售：按样品/标准/定制区分的政策与最近订单履约范围 | 固定7–15天、零MOQ、免费样品/设计、全球次日送达、无条件保证 |

只有回答能帮助此产品的独立采购决定时，才选进 FAQ。不同页面无需重复 C1–C4 四题。若材料或孔型已能回答客户问题，宁可保留 6–7 个扎实问题，也不凑 3 个商业问题。

## 六、来源登记

本轮直接访问日期均为 **2026-11-16**。位置为网页区块标题和可读正文行范围，便于重复定位；抓取更新时间不等于访问日期。S 为原站主题依据，P 为外部适用性依据。

| 编号 | 页面及直接 URL | 原文位置 / 本次用途 | 取证边界 |
| --- | --- | --- | --- |
| S1 | [Sureay Twin-Shaft](https://sureay.com/products/twin-shaft-blades-recycling) | Engineering Advantages，78–94行；原三主题 | 属原站陈述，FEA/效果/尺寸检验不是工厂实证 |
| S2 | [Sureay Wood Chipper](https://sureay.com/products/wood-chipper-blades) | Engineering Advantages，77–92行 | 保留原制造价值方向，不移植寿命、污染免损或成品标准保证 |
| S3 | [Sureay Strand Rotor](https://sureay.com/products/strand-pelletizer-rotors) | Engineering Advantages，75–90行 | 平衡、齿形、钎焊原主题；设备及绝对性能待证 |
| S4 | [Sureay Melt Filter](https://sureay.com/products/continuous-melt-filter-scraper-blades) | Decisive Specifications 34–40行；Engineering Advantages 75–90行 | 刮刀与配套滤板参数归属；不按旧承诺自动恢复 |
| S5 | [Sureay Screens](https://sureay.com/products/shredder-screens) | Decisive Specifications 35–44行；Engineering Advantages 81–98行 | 结构、板材、配套主题；非刀具热处理 |
| P1 | [WEIMA Rotor and Cutting Technology](https://weima.com/us/rotor-and-cutting-technology/) | Rotor variants；cutting knives；Adjustable counter knives | 只确认刀面、转子与固定刀关系；专有转子系统性能不移植 |
| P2 | [Cumberland Knives](https://www.cumberlandplastics.com/knowledge-center/granulator-options/knives/) | Granulator Knives、Knife Tip Profiles、Cutting Angle，82–124行 | 动/定刀布置、刃形、间隙属于具体切削配置 |
| P3 | [KAMADUR Cutter Compactor](https://www.kamadur.com/products/cutter-compactor-knives/recy0008/) | 名称及材料/刃角/刀座，12–28行 | 核对部件和材料结构；不复制次日配送/所有品牌 |
| P4 | [POWERFIL Laserfilter](https://www.powerfil.com/en/laserfilter/) | How the Laserfilter works，17–40行 | screen discs与scrapers分件；系统恒压/排污效果不是通用刮刀性能 |
| P5 | [TKM Chipper & Counter Knives](https://www.tkmgroup.com/en/chipper-and-counter-knives) | 产品及Technical features，33–58行 | 采购词、两类零件和技术表组织；TKM公差/寿命不作为Sureay数据 |
| P6 | [EDGE Specialty Blades](https://www.edgeindtech.com/product/specialty-blades-converting/) | Description，9–15行 | 异形件按具体轮廓/件号/图样采购；不复制他厂应用全表或重磨服务 |
| P7 | [SSI Dual-Shear M180](https://www.ssiworld.com/en/products/dual-shear-m180) | Pierce-Point Cutters；Details；Specifications，48–83行 | 轴装剪切刀/刀组/工况关系；M180型号尺寸不扩成Sureay所有双轴标准 |
| P8 | [BHS Rotary Shear VR](https://www.bhs-sonthofen.com/recycling-technology/machines/inert-shredding/rotary-shear-vr) | 本轮超时；既有Shredder报告S5于2026-11-11记录设备说明 | 本次没有重新验证正文；不据此新增电池安全或工艺结论 |
| P9 | [KAMADUR Granulator Screens](https://www.kamadur.com/products/Granulator-screens/RECY0017/) | 材料、孔型、按图筛型，12–32行 | 行业表达参考；其25 mm上限和扩展行业不改变Sureay原规格 |
| P10 | [MAAG T200](https://maag.com/products/strand-pelletizer-t200-series/) | 本轮访问超时；既有报告另有SGS官方资料 | 不冒称本轮取得T200新参数；转子本页建议以L和S3为主要事实 |
| P11 | [SSI Technology](https://www.ssiworld.com/en/ssi-technology) | ACLS 14–21行；Cutter Hardfacing 41–45行 | 刀组松动风险与磨蚀工况属于不同关注；堆焊工艺与性能是SSI能力，不写成Sureay供货 |
| P12 | [Uddeholm Pocket Book](https://www.uddeholm.com/app/uploads/sites/216/2024/05/Uddeholm-Pocket-book_231215.pdf) | Steel for Industrial Knives，印刷19–21页 | 耐磨、抗崩与韧性是不同材料选择维度；不据此给Sureay材料新硬度或承诺特定失效解决 |
| P13 | [WEIMA Wear Protection](https://weima.com/en/wear-protection/) | Abrasive materials、Wear protection options，142–160行 | 区分磨蚀料流与异物冲击；原厂涂焊、驱动等方案不移植 |
| P14 | [Vermeer Sharpening vs Buying New](https://protips.vermeer.com/tree-care-landscape/2022/04/sharpening-brush-chipper-knives-vs-buying-new/) | Dull knives and maintenance，6–14行 | 木片形态、污染磨耗与维护关系；不复制型号操作间隔或保证成品尺寸 |
| P15 | [ELDAN Maintenance Saves Money](https://www.eldan-recycling.com/news/maintenance-saves-money/) | Maintenance – a profitable strategy，45–49行 | 特定轮胎设备按原厂要求重磨与维护；不推广为所有刀可磨或Sureay维修服务 |
| P16 | [MAAG Strand Pelletizing Process Stability](https://maag.com/maag-news/maximum-process-stability-and-pellet-quality-for-next-generation-production/) | Process parameters 185–197行 | M²-USG案例说明冷却/导入、切削间隙与质量关系；不复制其增产/寿命数字或水下系统操作参数 |

## 七、审阅通过后的实施边界和复核点

1. 先选每页的三个优势方向及要补的内部证明，再写简短英文卡片；本文件不授权直接替换或删除现有区块。
2. FAQ 先按上表核对原 94 题的去向；保留/重写不能丢掉原有效信息。合并建议若减少题数，应记录新增信息是否独立，最终每页 6–8 题。
3. 任何材料硬度、公差、热处理和重磨数值仍保留原来源与配置限制；未找到第三方印证不删除原尺寸。原 Optional Coatings 保留，钢与合金、刮刀与滤板、刀与刀座不能错归属。
4. 保持现有分类、产品URL、图片、Item No.及单轴动静刀/木片动静刀/条料与模面刀的正确内链。选择类解释主要在FAQ，不复制到优势区。
5. 成稿后交给未参与本批写作的 agent 独立审查来源、采购价值、性能承诺和FAQ重复，再由主任务决定实施。此阶段无源码/翻译/结构化数据修改。

**本文件核对结果**：15款、45个优势候选、120条FAQ候选；当前94个原题均有逐题映射；9款缺失工程区已单列；所有问题为英文工作题，答案是中文要点，未形成英文发布稿。

