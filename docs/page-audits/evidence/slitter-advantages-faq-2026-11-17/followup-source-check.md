# Slitter 第二轮审计：来源支持范围与内链复核

核查日期：2026-11-17。对应用户本轮 Claude 审计。仅核查既有来源、目录和路由；本文件不授权页面、规格、代码或翻译修改。其他代理同时修改方案，本文件只记录证据，不代改其工作。

## 1. DIENES 的 NN / NG / NS：定义可以确认，翻译应准确

来源：[DIENES Grooved knives](https://www.dienes.de/en/products/bottom-knives/grooved-knives/)，2026-11-17 直接读取成功。稳定定位：产品参数表 `Typ` 行；`Grooved knives from DIENES`；`Different locking procedures` 下各类型条目。

原文最小摘录：**NN (smooth bore), NG (eccentric locking), NS (screw locking)**。

| 代码 | 应采用的名称 | 原厂进一步说明的含义 | FAQ 边界 |
| --- | --- | --- | --- |
| NN | smooth bore；光孔／光滑内孔 | 原厂安装说明以隔套定位并作轴向夹紧。 | 不译成 flat bore；不把 NN 本身说成独立锁紧装置。 |
| NG | eccentric locking；偏心锁紧 | 使用偏心环，原厂描述在轴上旋转并以其装配工具夹紧内外环。 | 解释结构，不许诺 Sureay 附送原厂工具。 |
| NS | screw locking；螺钉锁紧 | 单螺钉压向刀轴，使用内六角扳手松紧。 | 不能扩张成任意紧固件／所有锁紧方式均可互换。 |

原厂并未给出 NN、NG、NS 三组字母的词源展开；应写“DIENES 的类型代号对应上述结构”，而不是编造三个缩写的英文全称。上述词义有直接来源，品牌授权、所有机型兼容、Sureay 结构供应能力仍分别核查。

本地可定位至 `catalog-evidence.json > products[id=bottom-grooved-anvil-knives] > faqs.technical` 原 Q4，问题为 `What do NN, NG and NS mounting types mean?`；以及同产品 `detailLayout.technicalSpecs[label=Mounting]`。建议该问仅列 **P-DIENES-grooved / Typ + Different locking procedures**；无需再附不解释这三个代号的 P-TKM-life。

## 2. P-HMK 本轮恢复可读，但只支持非常有限的事实

来源：[HMK Paper Straws](https://www.hmkltd.co.uk/paper-straws/)。2026-11-17 浏览工具请求超时；同日直接 HTTP 请求取得 **200**，最终 URL 未变，实际标题为 **Paper Straws - HMK Ltd**，读取到产品正文，不能继续写成本轮完全无法访问。

定位：`PAPER STRAW CUTTING` 标题下引文 **“Precise circular tungsten carbide knives for fast paper straw production”**；后续 `BLADES FOR PAPER STRAW PRODUCTION MACHINERY` 段。

可以支持：纸吸管生产设备确有圆形硬质合金刀这一产品用途／采购术语。不能支持：HSS 与氧化锆的比较、管壁变形原因、积胶控制、换刀阈值、重磨条件、Sureay 库存或适配承诺。其自身速度、库存及保证不转用。

因此 P-HMK 应保留在来源总表的窄背景说明中，**不能继续逐行挂在 Straw 全部 FAQ 后作为答案依据**。恢复访问不等于恢复全部六题的外部验证。

## 3. Straw 现有 C 字段究竟支持什么

以下以已保存的 `catalog-evidence.json > products[id=paper-straw-slitting-blades]` 为审计基线；每行同时给问题文字，防止 Q 序号后续变化导致失联。C 的含义仅为“目录已有”，不是独立技术验证。

| 本轮方案题目（修订前序号） | 真实 C 定位 | 现有文字能支持的范围 | 修订建议 |
| --- | --- | --- | --- |
| Straw 1，替换／定制采购 | 原 Q1 `Which replacement blade fits a paper straw cutting machine?`；Q3 `Can custom paper straw knives be made to a drawing?` | 工位、孔、厚度、轮廓；图样及各配置数量。 | C 有精确依据；去掉作为 Sureay 定制能力背书的 HMK。 |
| Straw 2，成形管刀与纸幅分条刀区别 | 原 Q2 `Are paper straw cutting blades and paper slitter knives the same?`；`technicalSpecs[label=Applications]` | 原目录明确成形管切断／修边与平纸幅纵切的区别。 | 主证据 C-Q2；HMK 只旁证纸吸管设备的圆刀用途，没有完整比较两工位。 |
| Straw 3，材料选择 | 原 Q4 `How should I choose carbide, HSS or another blade material?`；`technicalSpecs[label=Material]` | 现有材料为 carbide、M2、station-dependent zirconia；分别观察磨耗、崩口、积胶。 | 收窄为材料与已用刀损伤的选择问题。原 Q1/Q5 虽提管壁及支撑，但不直接证明“管壁变形决定材料选择”的因果链。HMK 不支持该比较。 |
| Straw 4，毛边／变形 | 原 Q5 `What can cause ragged or distorted paper straw ends?` | 原目录列刃口、积胶、管支撑、纸层数、壁厚、胶状态，并建议同设置下比较刀具。 | 标 C 现有说明；保留为待审核解释，不假称 HMK 验证了故障机理。 |
| Straw 5，胶料与涂层选择 | 原 Q6 `How should an optional coating be selected for a straw knife?`；`technicalSpecs[label=Optional Coatings]` | 按基体、胶体系、积胶形态考虑目录已有涂层。 | 原 Q6 支持“如何选择和比较涂层”，不直接支持某涂层必然减少积胶。问题若仍用“如何减少”，因果解释需另列 E 或补据。 |
| Straw 6，何时换刀（新题） | Q4/Q5 仅含磨损／切口症状；**允许最小工作尺寸及换刀阈值：NOT FOUND** | 可据 C 提到已有症状，但目录没有换刀判据、最小允许直径、重磨次数。 | 标 **E：新增编辑建议，非已验证答案**。可留选题待写稿，或收窄为原 Q4/Q5 的检查信息；不能继续以笼统 `specs / 相关原技术问答` + HMK 认定已就绪。 |

## 4. 两个跨组内链确实存在于本地有效目录

未使用本地 SPA HTTP 200 作为存在证明。核查的是实际目录对象、英语数据来源、路由选择及找不到产品时的分支。

| 建议正式内容使用的相对路径 | 目录精确定位 | 产品身份 |
| --- | --- | --- |
| `/products/scrap-chopper-blades` | `client/src/data/blades.ts > blades[id=scrap-chopper-blades]`；`link` 与该路径相同 | `fullName = Scrap Chopper Blades for Coil Slitting Lines`；`category = shear_blades`；描述为 coil-line edge trim。 |
| `/products/nonwoven-log-saw-blades` | `client/src/data/blades.ts > blades[id=nonwoven-log-saw-blades]`；`link` 与该路径相同 | `fullName = Nonwoven Log Saw Blades for Wound Rolls`；`category = log_saw_blades`；描述为 wound nonwoven rolls 横断。 |

两个对象均在导出 `blades` 数组内，不在仅开发态可见的 `draftBlades` 中。

路由证据链：

1. `client/src/App.tsx > Router` 注册 `/products/:id` → `ProductDetail`。在该路由前没有针对这两个 ID 的删除或重定向规则。
2. `client/src/pages/ProductDetail.tsx > ProductDetail` 从 `/products/:id` 读 `params.id`，调用 `getBladeById(bladeId, lang)`；仅产品未找到时走 404 分支。
3. `client/src/data/locales/index.ts` 将 `bladesEn` 从 `../blades` 导入，`bladesByLang.en = bladesEn`；`getBlades` 仅排除 `metal-cold-saw-blades`，不排除这两个 ID；`getBladeById` 在实际数组中按 ID 查找。

结论为**本地英语有效产品路由存在**，不是本轮已验证生产部署、SSR 输出或线上 HTTP 状态。审核文档可用相对路径；正文与后续代码不带 `localhost:5173` 主机名。

## 5. 将通用 P 引用改成逐题支持：已复读的具体位置

全部访问日期为 2026-11-17。只复读已有来源，没有新增一轮市场调研。

| 来源代号 / URL | 本次实际核到的位置 | 可以支持 | 不能作为该来源已经证明的内容 |
| --- | --- | --- | --- |
| P-DIENES-guide：[Slitting Reference Guide](https://www.dienesusa.com/wp-content/uploads/2015/11/Dienes-Slitting-Reference-Guide-2nd-Edition.pdf) | 印刷页 7 Pneumatic Top Knife Holders；25–28 Knife Metallurgy；30–31 Knife Regrinding；56 Troubleshooting。PDF 页序与印刷页一致，页序索引需减一。 | 一般剪切分条的刀架接触损伤、材料耐磨／冲击／成本取舍、重磨恢复几何、设置与切边问题。 | 具体 Film 填料、金属卷材、硬质合金特殊重磨参数或 Sureay 服务。旧数值与牌号排序不复制为通用现代标准。 |
| P-TKM-life：[Life-time (Circular Knives)](https://www.tkmgroup.com/en/troubleshooting/life-time-circular-knives) | 原因列表；How to improve life-time。 | 纸品圆刀的刀对材料、设置、刀架、崩口、磨削等多因素。 | 最小剩余尺寸、统一重磨次数；不能借此推广到所有膜、非织造、金属刀。 |
| P-DIENES-battery：[Battery foil / separator foil](https://www.dienes.de/en/explore/materials/battery-foil-separator-foil/) | 引言；DIENES Know-How。 | 涂层多层材料、刀具磨耗及粉尘挑战；刀对、角度、表面、平直度等设计因素。 | 页面没有逐项列电极微崩刃根因；不能给 Battery 新故障题完整答案背书。 |
| P-BACH：[Rotary Knives](https://bachknives.com/products/metal-processing/rotary-knives/) | Slitter Knives；Alloys；Precision Tolerances。 | 金属圆刀用途、材料形式及精度维度存在。 | 不解释累计条宽误差、崩刃诊断或全寿命成本核算方法。 |
| P-BHS：[Slitter Scorer](https://www.bhs-world.com/en/corrugators/individual-machines/slitter-scorer) | 主标题后两个段落。 | 自带磨刀装置，按运行长度及纸质安排再磨。 | 没有完整解释粗糙切边的刃口／支撑／板材多因素因果；BHS 整机性能不变成 Sureay 刀片性能。 |
| P-BACH-carbide：[Carbide Rotary Knives](https://bachknives.com/products/carbide-products/carbide-rotary-slitter-knives/) | 标题后两个正文段落。 | 硬质合金圆刀和表面／几何主题。 | 本页正文没有碳化钨刀的重磨资格、设备、最小尺寸；页脚 Grinding 链接不等于已经读取其服务页。 |
| P-TKM-multi：[Multi Groove Knife Blocks](https://www.tkmgroup.com/en/troubleshooting/life-time-cutting-quality-multi-groove-knife-block) | 原因列表；How to improve life-time and cutting quality；We recommend。 | 上下刀材料配合、崩口、跳刀、几何与精度、磨削会影响多槽刀质量。 | 没有直接证明某个特定工位为何偏磨；其测量报告、平衡、公差与重磨服务不转为 Sureay 承诺。 |

## 6. 对原方案 20 条宽泛 C 来源新题的处理建议

以下序号指本轮修订前方案，标题短称用于在代理同步改序后回查。**P 只写它实际支撑的答案片段；E 是编辑推演，不是新的“已验证”证据等级。** 若来源只能支持选题背景，必须写“背景”，不能把它挂成整题答案验证。

| 原方案题位 / 短称 | 可用的逐题 P 定位 | 应如何限制答案／标记缺口 |
| --- | --- | --- |
| Film 2，耐磨升级 | DIENES guide 印刷页 25–28 材料取舍 | 支持一般耐磨／冲击／成本取舍；“哪些填料导致何种磨耗”未由该来源逐项支持，标 E 或收窄。 |
| Film 4，崩口／快磨损 | DIENES guide 页 7 刀架接触；页 56 故障汇总 | 可讨论剪切刀架接触与设置；磨耗材料部分另指页 25–26，不再附整页 TOYO 作为根因证据。 |
| Paper 7，重磨／更换 | DIENES guide 页 30–31；TKM-life 原因列表 | 支持恢复几何与不良磨削影响；允许最小直径仍按刀图，若目录无记录不虚构 C。 |
| Foil 4，条宽偏差 | **本轮已读 P-BACH 不支持累计条宽因果** | 刀与隔套存在不等于累计误差机制已证；将新增机制标 E 或补直接依据，不挂 TOYO/BACH 通用组合。 |
| Coil 3，崩刃 | **P-BACH 材料列表不支持该具体故障解释** | 查原 Q4/Q6 的具体已有范围；超出部分标 E。 |
| Coil 7，成本比较 | DIENES guide 页 28 可作一般比较框架 | 属跨工况编辑应用，标 E 推演；不可写成金属卷材已有实测经济结论。 |
| Battery 4，微崩口 | DIENES-battery Know-How 仅作设计背景 | 具体根因在该来源未列；以已有 Q5/Q6 精确内容为界，超出的原因标 E。 |
| Corrugated 4，粗糙切边 | BHS 主引言只支持磨刀与纸质相关 | 完整故障链未证，标 E；可把磨刀信息合并到已有对应 FAQ。 |
| Nonwoven 7，磨刀／换刀 | DIENES guide 页 30–31 仅一般剪切圆刀方法 | 非织造专属换刀条件和允许尺寸未证；不能把一般资料当成该页全部刀型的维护指令。 |
| Anvil 3，换上刀后仍切差 | TKM-life 原因列表与材料配合段 | 可支持纸品剪切刀对和设置多因素；扩至胶带时注明工况推演，不归咎唯一部件。 |
| Anvil 4，胶料工况材料／涂层 | DIENES-grooved 不支持涂层效果 | C 使用具体 Optional Coatings 及原相关 FAQ；新效果解释标 E，勿附不相关的类型说明。 |
| Carbide 7，能否重磨 | P-BACH-carbide 本页正文 **NOT FOUND** | 通用圆刀重磨资料不自动等于硬质合金重磨条件；需明确材料/构造来源后成稿，现为 E 待证选题。 |
| Rewinder 4，钢／整体合金／镶刃 | TKM-life 材料配对段仅部分支持 | 构造菜单应引 C 的具体 Material/Profiles 字段；每种材料的工况收益不得从菜单推定。 |
| Rewinder 5，换下刀后切边差 | TKM-life 原因列表、How to improve life-time | 有对应纸品工况的一般机制支持；不把公司诊断服务写入答案。 |
| Rewinder 6，重磨代替换刀 | DIENES guide 页 10 底刀磨削退让位置；页 30–31 重磨 | 只支持存在可重磨设计和恢复几何原则；各杯形/可换环结构的允许余量仍未证。 |
| Slotter 4，撕裂／槽宽不齐 | 本轮未取得该新增机制的逐题 P 支持 | 公母刀/隔套配置本身可引 C；故障因果另标 E，不把产品图表当故障手册。 |
| Slotter 5，何时选镶合金母刀 | 目录材料/部件选项不等于选材机理 | C 精确到母刀字段；“什么时候更好”标 E，不能从有该构造推导性能优越。 |
| Straw 6，更换判据 | P-HMK 不支持，见第 3 节 | 原 Q4/Q5 支持症状，不能支持不存在的阈值；标 E 或收窄合并。 |
| Multi-Groove 5，各位置质量不同 | TKM-multi 原因列表 | 支持刀对、磨削、几何等原因候选；“哪个位置发生何种偏磨”仍是需检查的推演。 |
| Multi-Groove 6，局部偏磨后选材 | TKM-multi 刀对材料与几何条目 | 支持先区别刀对/几何因素；指定材料能改善局部偏磨的因果未证，标 E 或改为采购检查问题。 |

编辑执行规则：精确字段或 P 小节能支持多少就写多少；无直接支持时宁可写“C 目录事实 + E 编辑解释”，不要自动套 “P-only”。P-only 也必须有真实逐题依据。检查范围内无法验证的内容写 NOT FOUND，不能用低相关来源补齐。

本轮未改应用代码、页面、规格、其他语言或其他代理文件；未运行构建。完成的是来源读取、字段核查和路由证据检查。
