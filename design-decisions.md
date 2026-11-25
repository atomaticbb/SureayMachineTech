# 设计待决策与确认记录

更新日期：2026-11-05。本文用于沟通决策、记录依据和确认门槛；视觉规范见 [design.md](design.md)，QA 执行安排见 [qa-plan-amendments.md](qa-plan-amendments.md)。

## 当前确认状态

design.md v2.1 已根据文档审阅意见补齐配色、字体、主题和可测量规则；这是规范修订，不表示源码迁移或渲染验收完成。用户已确认 D02、D03、D04、D05、D07；D06 随后已确认为 https://sureay.com。设计确认不等于源码已全部迁移或渲染验收已通过。

## 待决策清单与确认门槛

负责人为角色指派建议；Yu 在 QA 启动时落实具体执行人。D0 指正式 QA 启动日，不是自动到期生效日。

| ID | 决策 | 建议 | 决策人 / 提供证据者 | 截止点 | 状态 |
|---|---|---|---|---|---|
| D01 | 去除金色 | 所有品牌交互和装饰移除金色 | Yu / 前端 | 已决定 | 已确认，待实施 |
| D02 | 主色与 CTA | 采用 design.md v2.1/v2.2 的深蓝、白、冷灰语义 token 与主次操作层级 | Yu / 前端 | 2026-11-05 已确认 | 已确认，待完整迁移验收 |
| D03 | 主询盘文案 | 英文统一 Request a Quote，提交按钮独立命名；译文单独核对 | Yu / 内容负责人 | 2026-11-05 已确认 | 已确认，待实施 |
| D04 | 日期格式 | 英文显示 05 Nov 2026；机器值 2026-11-05；其他语言本地化 | Yu / 内容负责人 | 2026-11-05 已确认 | 已确认，待实施 |
| D05 | 字体 | 按用户指定：Metropolis 500/600/700、Inter Variable、IBM Plex Mono 400/500；Latin、自托管 WOFF2、swap、最多六文件；字号 +2 后偶数化且最低 12px | Yu / 前端 | 2026-11-05 已确认 | 已确认，本轮迁移与验证中 |
| D06 | 规范域名 | https://sureay.com；www 永久跳转至根域，保留路径与查询参数 | Yu / 运维、SEO | 2026-11-05 已确认 | 已确认，待全链路复核 |
| D07 | 暗色模式 | 仅亮色；含系统暗色偏好、历史存储及 Toast | Yu / 前端 | 2026-11-05 已确认 | 已确认，待完整迁移验收 |

每项记录最终值、确认日期、确认人和证据链接。未决定时可继续抓取和检查，依赖它的规范一致性结论必须标“待确认”；不能用建议值判定页面失败。观察到的错误、不可读和功能中断不受该门槛限制。

## 确认记录模板

每次确认填写：决策 ID、最终选择、确认人、确认日期、证据链接、影响页面及实施负责人。确认后同步修改 design.md 中对应规范；历史依据和讨论保留在本文。

## 已核实的源码现状

- `client/src/index.css`：navy 为 `#001f4d`，存在 safety-orange `#ff6600`；`.btn-brutalist` 默认深蓝、hover 橙色。
- 同文件：标题声明 Oswald、正文 Inter、导航 Montserrat、技术文本 Roboto Mono；实际加载字体尚需 Rendered Fonts 验证。
- 同文件：全局半径为 0，容器上限 1280px。
- `client/src/App.tsx`、`pages/NewsDetail.tsx`、`pages/MixerProductDetail.tsx` 等仍有金色声明，需迁移清单逐项处理。
- 旧文档的主色 YAML 与正文不一致，Helvetica 字体栈与 Work Sans 正文描述不一致；不能作为实际页面颜色或字体的证据。

上述事实来自本地源码，不代表已部署版本。不再使用“主色与 CTA 都是相近蓝色，因此区分不足”作为已确认缺陷。

## 实施与验收

1. 先保存当前部署版本的首页、产品详情、文章、联系页截图，包含 hover/focus；导出 computed color/background/border/font-family 和 Rendered Fonts。
2. Yu 根据证据确认 D02–D07；前端更新 token 映射与按用途整理的迁移表。
3. 搜索金色及其衍生色、amber/yellow 工具类，逐项区分品牌用途、语义状态和真实素材；迁移后复查。
4. 比较迁移前后截图，执行对比度、移动端、键盘与关键 CTA 回归。
5. 规范同步不等于页面迁移完成；报告分别列出完成项、残留项和未验证项。

## v2.1 文档修订记录

- 将金色历史说明留在此处：品牌金色已决定移除，原有橙色 hover 不作为替代品牌强调色。
- border 仅用于装饰；新增 border-input 与 focus-on-dark。action-hover 改为更明显的蓝色。
- 新增状态色、字号、间距、断点、表格、浮层、禁用、遮罩、动效和 shadcn 映射规则。
- hover 默认状态 1.5:1 是项目标准，不是 WCAG 要求；输入控件边界和纯装饰分隔分别判断。
- “每视口一个实心主操作”按当前可见区域计算，包含悬浮入口；实施时需检查导航、hero、表单是否同时出现。

### 计算证据（sRGB 相对亮度公式，仅 token 对比，不是页面实测）

| 组合 | 对比度 |
|---|---:|
| action / surface | 16.11:1 |
| action-hover / on-action | 8.79:1 |
| action-hover / action | 1.83:1 |
| border / surface（装饰） | 1.48:1 |
| border-input / surface | 4.76:1 |
| border-input / surface-muted | 4.55:1 |
| focus / surface | 5.86:1 |
| focus / brand（禁止该组合） | 2.75:1 |
| focus-on-dark / brand | 16.11:1 |
| error / surface | 6.47:1 |
| warning / surface | 7.09:1 |
| success / surface | 7.13:1 |
| disabled-text / disabled-background | 6.15:1 |

### 源码迁移事项（未实施）

- 替换品牌金色、旧 hover；金属涂层文字、产品图片、业务警告不能机械替换。
- 移除 Montserrat 请求及导航声明，映射文章标题；补齐自托管字体和必要字符子集。字体度量回退需用实际文件测量。
- 清理无用暗色逻辑前检查 ThemeContext 的提供方与消费者；当前 App 使用自定义 ThemeProvider，但 sonner 使用 next-themes 的 useTheme，二者不是同一个上下文。只删 ThemeContext 不能保证 Toast 为亮色。
- 按规范映射全局颜色、半径以及局部深色焦点，逐个检查 shadcn 组件的覆盖样式。

残留检索（在仓库根目录执行；命中是候选，不等于渲染缺陷）：

```powershell
rg -n -i '#e8b84b|#c49a2a|#9b7119|#f2cb72|#b8922f|gold|amber-|yellow-' client/src
rg -n 'Montserrat|ThemeProvider|useTheme|dark:|rounded-|shadow-|drop-shadow-' client/src
```

参考依据：
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/responsive-design

## v2.2 字体调整（用户指定）

2026-11-05：Metropolis 用于 H1/H2、首屏标题、大号数据及装饰引号；Inter 用于导航、按钮、eyebrow、H3–H6 和正文；IBM Plex Mono 用于等宽内容。该决定替代 D05 及历史 Oswald/Roboto Mono 方案。仅 Latin、六个 WOFF2 文件以内，全部自托管并 swap。

字号按原值加 2px 后向上归入偶数，最低 12px；当前不登记 10px 注脚例外。流体字号改为偶数断点字号。实际迁移与验证结果见 fonts manifest 及本轮验证记录。

字体资源来自 Fontsource 5.3.0，授权与来源保存在 client/public/fonts。六文件 encodedBodySize 合计 157204 字节，Vite preview 本地冷缓存 transferSize 合计 159004 字节；预算设为 176 KiB，线上请求头和压缩差异需发布后复核。

## 用户确认记录：2026-11-05

D02 agree；D03 agree；D04 agree；D05 按上一条字体指示；D06 等说明清楚再定；D07 只需亮色。确认人：Yu，依据：本次聊天。D05 替代之前所有 Oswald、Roboto Mono 和额外字体子集建议。D06 不作自动选择。

D06 要决定的是公开页面的唯一首选地址：`https://sureay.com` 或 `https://www.sureay.com`。两者均可，选定后其他域名入口永久重定向至首选地址，保留路径和查询参数；canonical、sitemap、hreflang、OG 和内部链接统一。CORS 的 ALLOWED_ORIGINS 是独立配置，不能替代域名跳转。

D06 线上核对（2026-11-05）：HTTPS 根域返回 200，HTTPS www 首页返回 301 且 Location 为 https://sureay.com/。现状已采用非 www，建议保留根域以减少变更；尚待 Yu 确认，本次未修改域名配置。

用户追加确认：D06 选择 https://sureay.com。测试邮件仅发送 用户指定的测试邮箱（通过 QA_TEST_EMAIL 配置）；禁止推送 Git，待用户本地验证后另行确认。

2026-11-06：Yu 确认测试邮箱收到询盘通知与客户确认两封邮件，真实送达验收通过。依据 qa-results/full-qa/mail-submit.json 与 mail-receipt.json。

## 人工视觉验收后的补充决定

- 普通界面文字使用句首大写，英文询盘按钮使用 Request a quote。Hero 导语和章节说明为 16px。Engineering Confidence 采用桌面左标题、右说明的布局。
- 面包屑统一为 14px，当前项中等字重。详情页标准尺寸区仅保留居中表格，Engineering Advantages 最多三项，描述紧随标题。
- 页脚恢复原深色底，保留紧凑布局。Mixer Wear Parts 菜单去掉认证与发货说明，右图垂直居中，中间产品名居中。
- 刀片分类、产品目录和塑料行业页统一卡片外观、信息层级和悬停行为。目录每行三张，另两类页面每行四张。
- 目录下方单独展示 Custom Blades 并链接对应语言的定制页。桌面筛选栏随列表停留，下载按钮位于筛选下方，整页共用页面滚动。

## 产品卡片待办（2026-11-13）

用户要求记录为待办，尚未实施。本轮仅记录；后续按英文页面范围处理，不生成其他语言版本。

- [ ] 统一分类页、产品列表页和行业页的产品卡片。桌面分类页与行业页每行 4 张；带 Filter 筛选栏的产品列表页每行 3 张。卡片外观和信息层级保持一致，移动端保留响应布局。
- [ ] 优化分类页产品卡片的视觉与交互效果，并与产品列表页、行业页保持一致。具体效果在实施时核对，不在本次记录中预设新样式。
