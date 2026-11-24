---
name: Sureay Industrial Precision
version: 2.2
updated: 2026-11-05
colors:
  brand: '#001f4d'
  action: '#001f4d'
  on-action: '#ffffff'
  action-hover: '#0b4a8f'
  surface: '#ffffff'
  surface-muted: '#f8fafc'
  text: '#0f172a'
  text-muted: '#475569'
  border: '#cbd5e1'
  border-input: '#64748b'
  focus: '#0068ad'
  focus-on-dark: '#ffffff'
  error: '#b91c1c'
  warning: '#92400e'
  success: '#166534'
  on-status: '#ffffff'
  placeholder: '#64748b'
  disabled-background: '#e2e8f0'
  disabled-text: '#475569'
  overlay: 'rgb(15 23 42 / 60%)'
typography:
  display: 'Metropolis, Arial, sans-serif'
  sans: 'Inter, Arial, sans-serif'
  mono: '"IBM Plex Mono", "Courier New", monospace'
shape:
  radius: 0px
  shadow: none
layout:
  container-max: 1280px
  gutter-mobile: 16px
  gutter-tablet: 24px
  gutter-desktop: 32px
---

# Sureay 设计规范

## 设计风格与主题

面向工业设备采购与工程人员，以深蓝、白色、冷灰建立层级。采用直角、无装饰投影的工业风格，通过填充、描边、排版与留白突出操作。

品牌强调统一使用 action 色系；文字、边框、背景和焦点使用各自的语义 token，不另引入品牌强调色。产品实拍、涂层真实颜色和错误、警告、成功等业务状态色除外。

仅提供亮色主题。系统暗色偏好及历史主题存储不改变页面、原生表单控件、弹窗或 Toast 的主题；根元素使用 `color-scheme: light`，不提供主题切换入口。深色 hero、导航和页脚属于亮色主题中的局部深色区域。

`<meta name="theme-color">` 唯一且等于 brand，直接访问和站内跳转保持一致。

## 色彩与对比度

顶部 token 表为颜色数值的唯一来源。

| Token | 适用范围 |
|---|---|
| brand | 品牌、导航和结构性深色区域 |
| action / on-action / action-hover | 主操作默认背景、文字和悬停背景 |
| surface / surface-muted | 页面、卡片、交替内容区域 |
| text / text-muted | 正文与辅助说明 |
| border | 装饰分隔线、非交互卡片边界；不得作为识别输入控件的唯一边界 |
| border-input | 输入框、选择器、复选框等控件边界，以及需要明确分层的浮层边框 |
| focus / focus-on-dark | 浅色 / 深色区域的键盘焦点轮廓 |
| error / warning / success | surface 上的状态文字、图标与边框；实心状态底色配 on-status |
| placeholder | 输入占位符，固定 opacity: 1，不代替可见 label |
| disabled-background / disabled-text | 禁用背景与文字；不额外降低整体 opacity |
| overlay | 模态背景遮罩，不用于遮盖弹窗正文 |

普通文字至少 4.5:1；大字（至少 24px 常规字重，或约 18.67px 粗体）至少 3:1。识别可操作控件和状态所必需的边界、图形与相邻颜色至少 3:1；纯装饰分隔线不适用此要求。禁用控件虽属 WCAG 例外，本项目仍使用上表可读的禁用配色。

深色区域正文使用 on-action。状态信息放入 surface 提示容器，避免直接把浅色区域用的状态文字叠在 brand 上。照片背景上的文字和操作置于不透明 surface 或 brand 容器内。

## 字体与字号

| 位置 | 字体角色与字重 |
|---|---|
| H1/H2、首屏标题 | font-display：Metropolis，600/700 |
| 大号数据展示（如精度标注） | font-display，500/600/700 |
| 引号装饰 | font-display；独立元素设 aria-hidden="true"，不隐藏引用正文 |
| 导航、按钮、eyebrow | font-sans：Inter，600/700；眉题可适度加字距 |
| H3–H6、卡片标题 | font-sans |
| 正文与规格表数值 | font-sans；规格数值加 tabular-nums |
| 料号、代码、公差及等宽规格 | font-mono：IBM Plex Mono，400/500 |

文章 H2 同样使用 Metropolis，长标题允许换行。导航不另加载字体。规格数值以 Inter + `font-variant-numeric: tabular-nums` 为默认，明确采用等宽排版的区域可用 font-mono。

字号整体在原值基础上增加 2px，然后向上取最近偶数，最低 12px。例如原 10→12、11→14、13→16、15→18px。不得出现 13px、15px 等奇数字号，也不使用会产生连续小数字号的流体字号。使用 rem 表达尺寸，以默认根字号 16px 检验；浏览器缩放产生的换算值不属于违规。

| 层级 | 字重 | 小屏字号 / lg 起字号 | 行高 | 字距 |
|---|---:|---|---:|---:|
| H1 / 首屏标题 | 700 | 38px / 50px | 1.15 | -0.02em |
| H2 | 700 | 30px / 34px | 1.25 | -0.01em |
| H3 | 600 | 24px / 26px | 1.35 | 0 |
| H4 | 600 | 20px / 22px | 1.4 | 0 |
| H5–H6 | 600 | 18px / 18px | 1.4 | 0 |
| 正文 | 400 | 18px / 18px | 1.6 | 0 |
| Hero 导语、章节说明 | 400 | 16px / 16px | 1.6 | 0 |
| 导语 | 400 | 20px / 20px | 1.6 | 0 |
| 导航 / 按钮 | 600/700 | 16px / 16px | 1.4 | 0.05em |
| 面包屑 | 上级 400，当前页 500 | 14px / 14px | 1.5 | 0 |
| 标签 / 辅助说明 | 500 | 16px / 16px | 1.4 | 0.02em |
| eyebrow | 600 | 14px / 14px | 1.4 | 0.08em |
| 技术文本 | 400/500 | 16px / 16px | 1.5 | 0 |

页面可按内容使用相邻偶数字号；表中为默认层级，任何文字不得低于 12px。注脚若确有需要可用 10px，但必须在决策记录中登记具体位置；placeholder、错误提示、导航和按钮不得当作注脚。当前无已登记的小字号例外。

英文长文 `max-inline-size: 70ch`；宽屏正文约 60–75 字符行宽，小屏随可用空间缩窄。标题不截断技术名称。使用偶数字号断点切换，不通过缩放文字适配容器。

### 字体资源

- 全部 WOFF2 同源自托管，`font-display: swap`，先仅使用 latin 子集。
- Metropolis：500、600、700，共三个文件；不得引入其他字重。
- IBM Plex Mono：400、500，共两个文件；不得引入其他字重。
- Inter Variable：一个 wght 可变文件，覆盖正文、导航、按钮等所需字重。
- 字体文件合计不超过六个；不同时加载等效静态字体、italic 文件或额外语言子集。非 Latin 字形暂用系统回退，后续新增子集须重新核算预算。
- 冷缓存实测全部字体的 encodedBodySize 和 transferSize；当前六文件冷缓存传输预算为 176 KiB（含请求开销，本地实测后约留 10% 余量）；生产环境按相同方法复核，不用文件数代替流量。最多预加载首屏实际需要的两个文件。
- Metropolis 与 Mono 不合成粗体；超出已加载字重的旧样式分别归并至 700、500。
- 字体替换引起的 CLS 不超过 0.02；若换行或度量不稳定，依据实际文件测量后配置度量回退，不填未经测量的百分比。

## 间距、断点与布局

基础节奏 8px，常用间距刻度为 8、16、24、32、48、64、96px；4px 仅用于图标与文字等紧密组合。边框、焦点轮廓和字距不受间距刻度限制。

| Tailwind 断点 | 最小宽度 | 水平边距 |
|---|---|---|
| base | 0 | gutter-mobile |
| sm | 40rem（640px） | gutter-tablet |
| md | 48rem（768px） | gutter-tablet |
| lg | 64rem（1024px） | gutter-desktop |
| xl | 80rem（1280px） | gutter-desktop |
| 2xl | 96rem（1536px） | gutter-desktop |

px 换算以默认浏览器字号为准。容器居中、宽度 100%，从 lg 起最大外宽为 container-max，包含两侧内边距（border-box）。网格间隙手机 16px、sm 起 24px；章节垂直内边距手机 48px、lg 起 64px；正文段落间距 16px。

英文公开页面采用宽屏布局。导航、Hero 下方正文区块和页脚内容统一对齐，水平边距为手机 16px、640px 起 24px、1024px 起 40px，容器最大外宽 1920px，超宽屏居中。正文大区块使用白底，内部卡片、表格、表单和深色页脚保留各自样式；文章及法律正文仍保留适合阅读的行宽。此规则覆盖上方的默认容器尺寸，不应用于后台及其他语言页面。

英文首页的导航、Hero 文字、正文区块和页脚共用左右边距：手机 24px、640px 起 36px、1024px 起 48px。Hero 下方每节上下分别留 24 / 32 / 40px；章节标题采用 H2 默认层级，手机和平板 30px，1024px 起 34px。

360px 小屏与 200% 缩放下，关键内容不裁切、不发生页面级横向滚动；宽表格仅在自身容器内滚动。

## 形状与浮层

按钮、卡片、输入框、提示和菜单半径为 shape.radius，无装饰投影。以下形状例外可用圆形或胶囊：单选框及其圆点、头像、开关轨道与滑块；品牌 logo 和原生浏览器控件保留其必要形状。不得将例外扩展到普通 CTA 和卡片。

Dropdown、MegaMenu、Popover、Tooltip 使用不透明 surface 背景及 1px border-input 边框。Dialog/Sheet 使用相同表面与边框，另加 overlay 遮罩；非模态菜单不强制加全屏遮罩。浮层可视边界与背景可区分，无 shadow、drop-shadow 或装饰 ring。

焦点 ring 是可访问性指示，不属于装饰投影禁令；可使用 outline 实现。

## 按钮、焦点与链接

- 主 CTA：action 背景与 on-action 文字，hover 使用 action-hover；深色区域使用 surface 背景、action 文字。
- 次级按钮使用 surface 或透明背景、action 文字与边框；深色区域的次级按钮改用 on-action 文字与边框。
- 每个当前视口内最多显示一个实心主操作按钮（桌面及手机均包括固定导航和悬浮入口）；重复询盘入口使用描边或文字样式。后台遮罩下的不可交互操作不计入模态弹窗的活动视口。
- 主 CTA 的默认/hover 背景亮度对比至少 1.5:1，或增加非颜色信号。该值为项目交互标准，不是 WCAG 条款。白底反色按钮及次级按钮 hover 增加文字下划线；不只改变透明度。
- 主要点击目标至少 44×44 CSS px，按钮最小高度 44px，水平内边距 24px；行内文字链接遵循文本流，不强制撑开正文行高。
- focus-visible 采用 2px 实线轮廓、2px offset：surface/surface-muted 上使用 focus；brand/action 区域上使用 focus-on-dark。轮廓不得被 overflow 或固定区域裁切。
- 正文链接默认 action、hover 为 action-hover，始终带 1px 下划线与 3px underline-offset；hover 下划线加粗到 2px。深色区域链接始终为 on-action，以同样的下划线变化反馈 hover。
- 不单独设置 visited 颜色。键盘 focus 保留轮廓；active 状态保留可读配色，不以缩放造成布局变化。

## 表单与状态

英文询盘表单容器使用 1px 边框与轻微阴影（`shadow-sm`），作为无投影规则的例外；这是用户于 2026-11-20 确认恢复的样式。需求文本框默认显示 4 行。

可见 label 位于输入框前，间隔 8px；辅助说明和错误信息紧邻控件下方，间隔 8px。文本输入和选择器最小高度 44px、水平内边距 16px、垂直内边距 8px，使用 surface 背景、text 内容、1px border-input 边框。

focus 使用轮廓，不加粗边框引起位移。placeholder 使用专用 token，不代替 label。错误同时显示 error 边框、错误文字和图标，并建立字段与说明的可访问关联。

禁用控件使用 disabled-background、disabled-text，保留禁用语义；不得响应提交。加载按钮保留原宽度，显示“提交中”等文字并防重复提交；成功或失败状态以文字告知，不只靠色彩。

## 卡片与规格表

卡片使用 surface、1px border、16px 内边距（sm 起 24px）。可点击卡片不能仅靠淡分隔线表示交互，必须有明确的链接或操作文字及键盘焦点。

刀片分类、产品目录和塑料行业页共用产品卡片。桌面分类和塑料行业网格每行四张，带筛选栏的目录每行三张。英文行业页在区块标题下直接列出本行业的全部产品，省略筛选栏、卡片分类标签和独立的分类入口。目录卡保留行业标签、产品名称、已有数据支持的尺寸范围，以及 View details 文字和向右箭头。

英文产品列表在 768px 以下每行两张，同一行卡片等高。列间距 12px，行间距 16px。产品图放入正方形区域，等比完整展示。产品名使用 16px，自然换行。目录卡的行业标签放在图下、名称上方，便于并排比较产品外形。首页精选产品轮播在手机上每屏展示两张。

- 表头：brand 背景、on-action 文字；font-sans 字体 600。
- 表格正文：font-sans 18px、行高 1.5；单元格垂直内边距 12px、水平 16px，单行行高因此至少 51px；允许多行自然增高。
- 偶数行使用 surface-muted，奇数行使用 surface；行分隔使用 border。
- 文本及行标题逻辑起始对齐；数值右对齐，使用 tabular-nums；单位列或列标题统一标注单位。
- 每表具有描述内容的 caption，可见并位于上方，间距 8px；列标题用 `th scope="col"`，行标题用 `th scope="row"`。
- 小于 md 且表格确实溢出时，首个标识列使用 `position: sticky; inset-inline-start: 0`，宽度不超过滚动容器的 40%，文字允许换行；固定列使用不透明行背景和 border-input 分隔，不能盖住其余可滚动列。
- 容器可键盘聚焦并有可访问名称；窄屏显示“横向滚动查看完整规格”等提示。整页不随表格横向滚动。

## 动效

hover/focus 颜色和下划线过渡 150ms；菜单与弹窗过渡 200ms；入场动画 250ms。非加载动效通常不超过 300ms，位移不超过 16px；入场延迟不超过 100ms。使用 ease-out，不使用弹簧过冲、视差和装饰性无限循环动画。

统一产品卡片的悬停行为：卡片上浮 6px（300ms），图片放大 6%（500ms），箭头右移 4px（200ms），边框保持原色。图片缩放是上述 300ms 限制的例外。启用减少动态效果时关闭这三项动效。

仅实际等待中的加载指示可循环，不能作为信息唯一载体。`prefers-reduced-motion: reduce` 下取消位移动画、循环旋转与平滑滚动，状态变化立即生效并保留静态加载文字。首屏正文和 LCP 图片不以 opacity: 0 等待动画初始化。

## Tailwind v4 / shadcn 映射

| shadcn 变量 | 规范 token |
|---|---|
| --background / --foreground | surface / text |
| --card / --card-foreground | surface / text |
| --popover / --popover-foreground | surface / text |
| --primary / --primary-foreground | action / on-action |
| --secondary / --secondary-foreground | surface-muted / text |
| --muted / --muted-foreground | surface-muted / text-muted |
| --accent / --accent-foreground | surface-muted / text |
| --border | border |
| --input | border-input |
| --ring | focus；局部深色区域覆盖为 focus-on-dark |
| --destructive / --destructive-foreground | error / on-status |
| --radius | shape.radius |

组件 hover 显式使用 action-hover，不采用默认 primary/90。菜单选中项通过图标、文字字重等补充表示，不仅依赖浅背景变化。

`:root` 的 shadcn `--radius` 设为 0；Tailwind v4 的 `@theme` 中将 `--radius-*` 半径命名空间归零（或对实际使用的全部尺寸显式归零），避免由基础半径减去偏移得到负值。形状例外局部显式声明圆形/胶囊。仅设置一个 `--radius` 不能覆盖所有 `rounded-*` 工具类。

业务组件不得残留不符合本规范的 `rounded-*`、任意值圆角、`shadow-*`、`drop-shadow-*`；焦点 ring 和上述形状例外除外。图表和管理端专用 token 不得隐式覆盖公开站点的语义颜色。

## 文案与日期

英文主询盘 CTA 统一为 `Request a quote`；表单提交按钮独立使用描述提交动作的文案。各语言使用对应译文，同一动作保持一致。

英文展示日期使用 `DD MMM YYYY`，例如 `05 Nov 2026`；机器日期使用 ISO `YYYY-MM-DD`。其他语言按当地日期习惯显示，日期语义保持一致。


## 界面文字与导航

- 普通界面文案使用句首大写。保留品牌专名、技术缩写、型号和正式标识的拼写。禁止通过样式或脚本将整句转成大写。
- 英文公共页面取消章节眉题／装饰性副标题，例如 `OEM Compatibility`、`System Inventory`、`Knowledge Base`；区块以清楚的标题、必要的一段简短描述和主体内容组织。不要把删掉的小标签改放到别处，也不要另加零散的小字补充。此项为 2026-11-16 用户确认的新标准，替代此前的眉题规则；现有译文不改。
- 描述承载对买家有用的产品用途、适配边界或选型信息，自然使用相应关键词；不堆砌名称，不为每个区块凑一段空泛文案。规格标签、尺寸／单位、真实图注、FAQ 问题、表单提示与导航名称保留其功能层级。
- 品牌名称后的 `®` 保留。描述应积极传达产品价值、定制选项和采购服务，避免说明书式的连续核对指令；不得因此增加无依据的性能或全机型适配承诺（2026-11-16 用户补充）。
- Hero 导语和章节标题下的说明使用统一的 16px 字号（`text-description`），各断点一致。
- 桌面主导航使用 16px 单行标签，空间不足时采用折叠菜单。
- 手机菜单使用白底、深蓝文字和细分隔线。一级入口为 18px、字重 500、最小行高 56px。询价入口放在顶栏。语言切换放在导航之后，以地球图标和当前语言名收起展示，展开后用各语言的本名列出本页可用的版本，并勾选当前项。
- Hub、分类和产品详情共用面包屑样式。浅灰底、紧凑间距，上级链接为辅助文字色，当前页为深蓝色。窄屏允许换行。
- 产品目录桌面筛选栏随产品网格停留，所有筛选项自然展开，由页面承担滚动。PDF 下载按钮单独置于筛选下方。Custom Blades 由目录下方介绍区进入对应语言的定制页。
