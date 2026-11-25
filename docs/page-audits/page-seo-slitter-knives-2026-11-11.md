# Slitter 分类页分析与结构建议

审查日期为 2026-11-11。本地页面为 http://localhost:5181/categories/slitter-knives 。目标定位采用现有 SEO Title，承接 `slitter knives`、`rotary slitter knives` 和 `circular slitting blades`，帮助买家进入已完成的应用、结构和材质详情页。

## 页面判断

当前页面已具备完整产品入口和询价路径，下一步应增强买家选择产品的能力。重点是分开应用、刀具结构、材质三种入口，补充卡片之间的区别，并整理品牌信息。

本次是分析及方案。已核对本地实际渲染、模板、产品数据、最新预渲染 HTML及两家代表性制造商的网站。

## 实际检查结果

| 项目 | 当前表现 | 建议 |
| --- | --- | --- |
| Hero | 深蓝底、右侧刀具组合图，固定高度 379 px，只有 Request a quote | 保留类别识别，增加 Browse Knife Types 主按钮，询价为第二按钮。桌面高度约 280–320 px，手机端按内容自适应。 |
| 产品介绍 | Hero 与 `Slitter Knives Configurations` 下重复同一句话 | 产品区直接进入分组导航，用卡片说明差异。 |
| 产品排列 | 13 张卡片混合应用、刀型和材质，桌面四列，末行仅一张 | 使用 9 个应用、3 个底刀／刀环、1 个材质入口。桌面应用卡片三列。 |
| 卡片 | 产品图、名称、行业标签、尺寸、View details | 名称后增加一行采购区别，尺寸单独一行。尺寸继续从产品数据读取。 |
| 尺寸截断 | 纸张卡片的上下刀尺寸在桌面已出现省略号 | 允许最多两行，或从统一数据形成简短摘要。避免将桌面悬停提示作为唯一完整说明。 |
| Technical Overview | H2 与 H1 同名，五条通用参数，左侧为代表产品图片 | 替换成 Slitter Knife Selection Guide，解释容易选错的产品组合。 |
| 通用参数 | 含 Razor，应用仅列 Film、Paper、Nonwovens、Foil | 与当前实际目录一致。现有薄膜标准表已移除剃刀，分类页应同步调整其剃刀导购内容。 |
| 品牌区 | 45 个名称平铺，DIENES 与 Dienes 重复，Goebel 与 Göbel 写法待核对，含 Pneumatic® | 按应用分组，统一品牌名称。Pneumatic 是气动方式，放入刀座／安装说明。 |
| 品牌标题 | `Drop-in fit, no retooling` 覆盖整个分类 | 改为 OEM Replacement & Machine Compatibility，用图纸、样品和机型匹配说明适配过程。 |
| 标题树 | 一个 H1，产品区和下方模块有 H2，产品卡片用 H3 | 基本层级有效。重组后让 H2 表示三类采购入口及选型模块。 |
| 询价 | Hero、品牌区、底部表单和联系入口都可用，`#contact` 目标存在 | 保留现有有效路径。主浏览动作提前，联系功能置于明确的第二路径。 |

桌面实测内容宽度为 1308 CSS px，页面高度为 4928 px，产品区高度为 1660 px，品牌区高度为 661 px。窄屏浏览器实际返回 480 CSS px，单列产品区约 6044 px，全页约 11909 px。两种实测宽度均无整页横向溢出，13 个产品入口和正文内容仍存在。浏览器尺寸控制受最小宽度及缩放影响，本次未完成独立的 390 CSS px 实测。Hero 背景图在小屏隐藏，类别文字和产品列表保留。

## 建议页面结构

### 1. Hero

面包屑放在 Hero 顶部，H1 保留 `Slitter Knives & Circular Blades`。用一段简短描述说明标准件、OEM 和定制供货，主按钮跳转应用组，次按钮进入现有表单。右侧沿用刀具组合图，保留比例并在各断点检查文字区域。

### 2. 分组快速导航

三个页内链接分别进入 `By Application`、`Bottom Knives & Rings`、`Tungsten Carbide`。全部产品在页面中持续呈现，使用可抓取的真实产品链接。小屏可横向滚动这三个导航项。

### 3. Choose Knives by Application

九张卡片，桌面三列。排列顺序和卡片区别建议如下。

| 产品入口 | 建议的一行区别文案 |
| --- | --- |
| Film & Tape Slitter Knives | Circular knives for film, tape and flexible packaging. |
| Paper Slitter Knives | Matched top and bottom knives for tissue, kraft and coated paper. |
| Nonwoven Slitter Knives | Dished top knives, anvil rings and crush cutters for nonwoven webs. |
| Slitter Knives for Copper & Aluminum Foil | Standard carbide knives for copper and aluminum foil. |
| Steel Coil Slitting Knives | Rotary shear knives and matching tooling for steel coil lines. |
| Battery Slitting Knives | Matched upper and lower knives for coated battery electrodes. |
| Corrugated Board Slitter Blades | Thin blades for longitudinal cutting on corrugator dry-end lines. |
| Corrugated Slotter Knives | Male and female blades for flap slots on box-making lines. |
| Paper Straw Cutting Blades | Circular cut-off blades for wound paper straws. |

应用组包含后道开槽和纸吸管切断，因此标题使用 `Knives by Application`。卡片说明写清工位，让买家知道与纵向分切刀的区别。

卡片内容按产品图、名称、区别说明、尺寸摘要、View Details 排列。图片用统一白色画布和比例，适当调整主体占比。文字使用普通无衬线字体，标题 18–20 px，说明和尺寸 14–16 px。详细材料、硬度和标准件表由详情页承接。

### 4. Bottom Knives & Rings

三张并列卡片分别承担结构采购入口。

| 产品 | 采购区别 |
| --- | --- |
| Bottom Grooved Anvil Knives | 按槽型、工作肩、上刀配合和锁紧方式找底刀环。 |
| Slitter Rewinder Bottom Knives | 按复卷机、法兰孔位、杯形／双刃和键槽找替换底刀。 |
| Multi-Groove Bottom Knives | 按槽数、槽距、总宽和换幅要求找多槽刀环。 |

### 5. Tungsten Carbide Slitter Knives

使用一个宽版入口，产品图搭配简短说明及 View Carbide Options 按钮，导向已有材质详情页。说明整体式与镶嵌式的选择、耐磨与抗崩的取舍。该页继续负责材质查询，应用页负责工位和标准尺寸。

### 6. Slitter Knife Selection Guide

替换当前 Technical Overview，用三条简短判断帮助买家识别相邻产品。

- Copper & Aluminum Foil 与 Battery Electrode。普通铜铝箔与涂布正负极片分别进入对应页面。
- Corrugated Slitter 与 Corrugated Slotter。瓦楞生产线干端纵切与后道纸箱开槽分别进入对应页面。
- Grooved Anvil、Rewinder Bottom 与 Multi-Groove。分别按工作肩配合、设备安装以及槽距换幅选型。

每条给出一到两个明确产品链接。分类页保留判断规则，规格表、公差和品牌型号明细继续由现有详情页提供。

### 7. OEM Replacement & Machine Compatibility

建议按 Web Slitting & Rewinding、Paper Converting、Metal Slitting、Corrugated Converting、Battery Electrode Slitting 分组，从各产品已确认数据中提取相关品牌。每组展示少量代表性名称和对应产品入口。

整理 DIENES／Dienes 大小写及 Goebel／Göbel 的名称来源。刀座类型和安装方式另列，具体适配继续结合图纸和型号核对。

### 8. 询价表单

继续使用现有联系表单。引导文字围绕材料、刀具尺寸、设备型号和图纸。原有 2 小时回复与详情页 24 小时报价应分别理解为首次回复与报价时限，后续文案统一时采用工厂实际服务承诺。

## 手机端布局

Hero 缩短，第一屏尽量出现产品导航。应用与底刀卡片使用紧凑的单列图文布局，左侧约 96–112 px 产品缩略图，右侧名称、区别说明、尺寸和详情链接。尺寸允许两行。分组导航支持直接跳到下刀和材质入口。

正文以白色为主，section 之间用 64–80 px 间距，组内保持 24–32 px。主要标题与详情页的标题体系一致。分组之后再检查各断点卡片高度和长英文名称。

## SEO 与索引检查

当前预渲染产物生成于 2026-11-10，包含最近的 Steel Coil 名称及铜铝箔 OD 130 mm 摘要，与本地最新内容相符。分类模板及分类元数据也早于该产物。HTML 为英文，canonical 和 og:url 均指向本分类 URL，无 noindex，站点地图包含该 URL。线上本分类返回 200，canonical 正确。

ItemList 包含 13 个条目，产品名称与近期修改一致。页面有 BreadcrumbList，当前未输出 FAQPage。本分类有 specItems，因此不会输出代表产品 fullDescription，旧台账中的复制产品 FAQ／正文问题在本页未复现。

保留现有 SEO Title，含品牌后为 57 个字符。

`Rotary Slitter Knives & Circular Slitting Blades | Sureay`

建议 description 为 158 个字符。

`Explore slitter knives for film, paper, nonwovens, copper and aluminum foil, steel coils and batteries. Compare blade types, bottom rings and carbide options.`

分类页重排后更新 ItemList 的可见顺序，继续使用原有 13 个网址。沿用当前产品数据作为名称和尺寸来源，分组元数据只保存产品 ID 及导购说明。后续再次对照预渲染 HTML 核验。

## 代表性制造商对照

| 页面 | 可借鉴的方式 | 对 Sureay 的建议 |
| --- | --- | --- |
| DIENES Circular Knives | 以 Slitting methods、Cutting material、Knife type 三个维度选择 | 采用应用、结构、材质分组。现有目录规模适合直接导航。 |
| TKM Products 及 Top Slitter Knives | 产品目录列出上刀、底刀、多槽刀块，具体产品页关联配套刀具 | 分类页说明各类底刀入口的区别，细节继续交给已完成的产品页。 |

来源为 [DIENES Circular Knives](https://www.dienes.de/en/products/circular-knives/)、[TKM Products](https://www.tkmgroup.com/en/products)、[TKM Top Slitter Knives](https://www.tkmgroup.com/en/top-slitter-knives)。只借鉴采购导航结构，制造商各自的性能数据保持来源归属。

Sureay 当前已有 13 个细分页、真实产品图片和统一的卡片尺寸来源，可直接形成上述采购入口。优先利用现有目录深度和标准／OEM／定制供货方式。

## 编辑评分

以下为依据本次页面检查的编辑评估，合计 67/100。

| 层次 | 得分 | 主要依据 |
| --- | --- | --- |
| 意图匹配 | 8/10 | 产品入口完整，三个分类维度混排。 |
| 内容与信息增益 | 16/25 | 已有图片和尺寸摘要，缺少卡片差异和相邻产品判断。 |
| 专业与可信度 | 8/12 | 产品实图和工程联系有效，品牌平铺与通用适配承诺有待整理。 |
| 关键词分工 | 10/13 | 类别词定位清楚，重复介绍和材质／应用混排降低清晰度。 |
| 结构化数据 | 7/8 | 13 项 ItemList、BreadcrumbList 与可见内容对应。 |
| 可引用性 | 6/12 | 通用参数存在，缺少可独立理解的选型判断。 |
| 采购路径 | 8/12 | 详情和表单均可进入，主浏览路径仍需优先。 |
| 设备适配 | 4/8 | 实测无横向溢出，小屏浏览距离长，390 px 仍待实测。 |

## 采购商首屏检查

- 找产品。H1 `Slitter Knives & Circular Blades` 与第一排卡片能说明所属家族，底刀与材质买家需要更早的导航。
- 判断区别。卡片有 `Circular OD 20–300 mm` 等尺寸，但用途差异需要在卡片中补一句。
- 确认供应商。Header 品牌和产品照片可见，具体 OEM 验证方式在页面下方。
- 获得报价。Hero 有 Request a quote，目标 #contact 存在，表单提供绘图上传和工程联系。

## 实施优先级

| 优先级 | 任务 | 修改位置 |
| --- | --- | --- |
| P1 | 产品按 9＋3＋1 分组，加入三项页内导航 | 分类元数据、CategoryAggregation.tsx |
| P1 | 卡片增加区别文案、完整尺寸摘要，小屏改紧凑图文 | ProductVariantCard.tsx，限本分类启用 |
| P1 | 替换通用技术概览，品牌按用途分组并去重 | 分类元数据、CategoryAggregation.tsx |
| P2 | Hero 调整高度、双按钮、嵌入面包屑 | CategoryAggregation.tsx |
| P2 | 更新 description 和 ItemList 顺序，核验实际 HTML | 分类元数据、预渲染验证 |

下一轮验收以 1440、1024、390、320 px 为目标，核对全部产品链接、三组导航、卡片文字和规格摘要。检查小屏联系条对内容的覆盖，并确认其他分类页的共享卡片行为。
