# Sureay 页面层深度分析 — B2B 采购商视角

> **核心问题:** 页面是否足够简洁？是否符合采购商预期？
> **分析方法:** 模拟 B2B 采购商决策链，逐页还原真实浏览行为
> **Date:** 2026-03-13

---

## 采购商决策模型（分析基准）

国际工业品 OEM 采购商的页面决策链只有 4 步，顺序不可颠倒：

```
1. 你能做我要的规格吗？      ← 30 秒内必须明确
2. 参数是否符合我的技术要求？  ← 2 分钟内有结论
3. 你是否是值得信任的供应商？  ← 1 分钟验证
4. 怎么询价？               ← 30 秒完成动作
```

**凡是在第 1 步之前出现的"关于我们有多好"的内容，对采购商来说都是噪音。**

---

## 一、主页 (Home) — 结构过重，顺序失当

### 当前页面结构（9 个 Section）

```
HomeHero              ← CTA 过早，缺乏 value prop
AuthorityCarousel     ← 产品轮播（有用，但标题是自我宣传）
ManufacturingBlocks   ← ❌ 3 个 Z 字形大模块 (5-Axis CNC / CMM / Applications)
TabEcosystem          ← 按行业展示方案（产品相关，有价值）
NewsGrid              ← ❌ 3 篇文章（对找产品的买家无关）
TechnicalFAQ          ← 问答（有价值但位置靠后）
ContactRFQ            ← 询价表单
```

### 核心问题

**① ManufacturingBlocks 摆错了位置**

这 3 个 Z 字形大模块（CNC 精密磨削、CMM 公差、极限应用）全部在讲"我们有多专业"，但放在了**产品展示之前**。采购商到达主页，最想先看到的是产品/行业分类，而不是制造工艺介绍。

工艺介绍的正确位置是 About 页面或产品详情页的 ProductOverview 区，而不是主页第 3 屏。

**当前滚动路径：** Hero → 产品轮播 → 3 屏制造工艺 → 才到行业分类
**理想滚动路径：** Hero（含 value prop） → 行业快速入口 → 信任凭证 → 询价

**② NewsGrid 消耗高价值版面**

News 区在主页占据完整的一屏（3 张文章卡）。来自 Google 搜索"shredder blades supplier"的买家，在主页上遇到新闻区时，**转化漏斗已经中断**——他没有找到产品，却看到了技术文章。

新闻对 SEO 有价值，但应该放在底部（ContactRFQ 之后），或降低视觉权重。

**③ AuthorityCarousel 标题是一句空话**

> "The definitive OEM source for precision blades and cutting solutions."

这是一句纯粹的自我宣称，没有数据支撑。采购商对这类句子有免疫，直接跳过。
改成具体数字会更有效：*"9 product families · 50+ countries · Lead time 15 days"*

### 建议主页结构（精简后）

```
HomeHero              带 3 行具体 value prop + trust 数字
行业快速入口          3 列图标卡（Recycling / Paper / Metal）← 5 秒找到自己的方向
AuthorityCarousel     产品轮播（保留，上移）
FAQ 或信任模块        精简到 4-5 条，聚焦买家最大顾虑
ContactRFQ            询价表单（底部）

❌ 删除或下移: ManufacturingBlocks（移到 About）、NewsGrid（移到底部）
```

---

## 二、产品列表页 (ProductListPage) — 结构合理，细节可优化

### 优点

- 侧边栏过滤分类合理，工业品按行业分组是正确做法
- ProductCard 横向布局（图片左，参数右）适合 B2B 扫描式阅读
- 每张卡片展示 4 个 specs、OEM Available 标签——格式正确

### 问题

**① ProductCard 的 fullDescription Tooltip 不可用**

```tsx
// 当前代码：description 区域 hover 显示完整 tooltip
<div className="relative group/desc">
  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 cursor-help">
    {blade.fullDescription || blade.description}
  </p>
  <div className="... opacity-0 invisible group-hover/desc:opacity-100 ...">
    {blade.fullDescription || blade.description}
  </div>
</div>
```

Tooltip 内容和卡片内容完全相同（都是 fullDescription），对用户没有新信息。应该删除 tooltip，节省代码复杂度，或者 tooltip 里展示一条差异化内容（如 compatible machine list）。

**② 进入产品详情页的 CTA 文案弱**

"View Details →" 对于工业品 B2B 来说太通用。改为 **"View Specs & Request Quote →"** 可以更精准地设置买家预期。

**③ 产品列表底部两个 Section 过重**

当前列表页底部有：
- Zone 4: Factory Showcase（4 张工厂图）
- Zone 5: IndustryOemPipeline（OEM 流程 4 步）

这两个模块和产品选择完全无关。买家在产品列表页的任务是**比较和选择产品**，不是了解工厂和流程。这两个模块适合放在其他页面，从产品列表页删除可以让页面更聚焦。

---

## 三、产品详情页 (ProductDetail) — 核心页面，但有 2 个结构性冗余问题

### 当前 8 Zone 结构

```
Zone 1: BladeHero           图片 + Spec 摘要
Zone 2: DecisiveSpecs       完整参数表
Zone 3: ProductOverview     长文 + 信任指标
Zone 4: ComprehensiveData   标准尺寸表
Zone 5: TechnicalAudit      技术优势 3 列卡
Zone 6: IndustryOemPipeline OEM 流程 4 步
Zone 7: CompatibleTooling   相关产品推荐
Zone 8: ContactRFQ          询价表单
```

### 买家实际浏览顺序

采购商真正需要的顺序是：

```
参数 → 规格表 → 询价
```

而当前页面在**参数表（Zone 4: ComprehensiveData）和询价表单（Zone 8）之间**，横插了：
- TechnicalAudit（3 张技术优势卡）
- IndustryOemPipeline（OEM 流程）
- CompatibleTooling

买家找到规格后，距离询价按钮还要滚动过 3 个模块——摩擦成本过高。

### 问题 1：IndustryOemPipeline 在每个页面都完全相同

这个组件在以下位置**硬编码完全相同的内容**重复出现：
- 每个产品详情页（8 个产品 = 出现 8 次）
- 3 个行业页
- About 页
- 产品列表页底部

一个认真研究产品的买家，浏览 3 个产品页后，会看到 3 次**一字不差**的"4-Phase OEM Protocol"。这会让网站显得模板化，降低可信度。

**建议：** 在产品详情页删除 IndustryOemPipeline，改为在 ContactRFQ 区块内用 2 行文字简短提及流程。完整的 OEM 流程保留在行业页和 About 页即可。

### 问题 2：ProductOverview 有大量与产品无关的固定文案

```tsx
// ProductOverview.tsx 第 65-70 行 — 每个产品都显示同一段话
<p className="text-base text-slate-600 leading-relaxed mb-10">
  Total cost of ownership is the measure that matters. Sureay blades are engineered
  to extend service intervals, reduce unplanned downtime, and outlast lower-grade
  alternatives — delivering a measurably lower cost-per-cut across the full
  service life of your equipment.
</p>
```

这是一段每个产品页都一样的企业宣传语，对 SEO 有重复内容风险，对买家没有产品特定的价值。

同样固定的还有 `TRUST_POINTS` 数组（ISO 9001 / In-House Heat Treatment / ±0.05mm / Global Delivery）——每个产品相同。

**建议：** 删除固定的 TCO 段落。将 `TRUST_POINTS` 移入 `BladeHero` 的信任条（页面顶部），ProductOverview 只保留 `blade.description` + `blade.fullDescription` 的产品特定内容。

### 建议精简后的产品详情页结构（6 Zone）

```
Zone 1: BladeHero           图片 + 所有 Specs + 信任条 + CTA
Zone 2: DecisiveSpecs       完整参数表（当前保留）
Zone 3: ComprehensiveData   标准尺寸表（上移）
Zone 4: ProductOverview     仅产品特定的 full description（精简）
Zone 5: TechnicalAudit      技术优势（保留）
Zone 6: ContactRFQ          询价表单（直接跟在内容后）

❌ 删除: IndustryOemPipeline（过于重复）
❌ 精简: ProductOverview 删除固定段落
```

---

## 四、行业页（Industry Pages）— 内容质量高，但访问路径被埋

### 优点

行业页的内容非常扎实：
- Challenge/Solution 叙事框架（"成本问题" → "我们的方案"）
- 材料对照表（3 种材料 × OEM 兼容机型）
- 真实的 ROI 数字（+30% Uptime, +40% Cuts Per Grind）

这是 B2B 内容营销的正确做法，内容质量属于网站最好的部分。

### 问题

**行业页在导航中的曝光不足。**

目前行业页的主要入口是：
1. 主页 TabEcosystem 的 "View X Solutions" 按钮
2. 导航 Mega Menu（待验证是否包含）

采购商从 Google 搜索"plastic shredder blade manufacturer"直接落地行业页，然后没有直接的面包屑或 sidebar 链接跳到具体产品，需要滚动到 `IndustryToolingMatrix` 才能找到产品。**缺少行业页→产品详情的快速路径。**

---

## 五、About 页 — 功能完整，移动端信息密度可优化

About 页内容结构合理（Stats → 工厂 → Timeline → Values → Certifications），适合单独浏览。

**一个问题：** `CountUp` 动画（15+年、10000+设计、98%留存、50+国家）在数字上没有来源标注。欧美采购商对没有依据的统计数字越来越敏感，建议在最重要的数字旁加一行微型注脚（如 "Based on 2024 customer survey"）

---

## 六、联系页 (Contact) — 设计最贴合 B2B 需求的页面

Contact 页整体最接近 B2B 采购商的预期：
- Inquiry Type 下拉选项精准（Custom OEM / Standard Part / Technical Support）
- CAD 文件上传是工业品询价的刚需，做了就是加分项
- WhatsApp 在线状态指示灯——这个细节非常好
- 24小时回复承诺清晰

**一个可优化细节：** 表单左侧的"Contact Our Team"区块和右侧的 RFQ 表单重复度较高——左侧的 Email/Phone/WhatsApp 卡片在 Contact 页已经有了，更适合把左侧换成一个具体的 **"Why work with us"** 信任点列表（3-4 条），减少重复的联系方式展示。

---

## 综合结论：三个最高优先级页面改动

### 改动 1 — 主页：调整 Section 顺序，删减两个 Section

```
现在: Hero → 轮播 → 3个制造模块 → 行业Tab → 新闻 → FAQ → 询价

改后: Hero(加value prop) → 行业快速入口(新) → 轮播 → FAQ → 询价
      ↓
     删除 ManufacturingBlocks (内容移至 About 页)
     下移 NewsGrid 到页面底部（ContactRFQ 之后）
```

**理由：** 采购商主页停留时间通常不超过 10 秒，必须在 2 个scroll内看到和自己相关的产品/行业入口。

### 改动 2 — 产品详情页：删除 IndustryOemPipeline，上移 ComprehensiveData

```
现在: Hero → DecisiveSpecs → Overview → ComprehensiveData → Audit → OemPipeline → Related → RFQ

改后: Hero → DecisiveSpecs → ComprehensiveData → Overview(精简) → Audit → Related → RFQ
     ↓
     删除产品详情页里的 IndustryOemPipeline
     删除 ProductOverview 中的固定 TCO 段落
```

**理由：** 买家看完参数表（ComprehensiveData）之后，想做的下一个动作是询价，而不是读 OEM 流程介绍。把询价入口离参数表越近，转化率越高。

### 改动 3 — 全站：减少 IndustryOemPipeline 出现频率

```
保留: 行业页（3个）+ About 页
删除: 产品详情页 + 产品列表页底部
```

**理由：** 同一个组件在同一个会话中重复出现 4+ 次，会让网站看起来像套模板，损害专业感。

---

## 附：页面简洁度自检清单

每个 Section 上线前问自己 3 个问题：

| 问题 | 如果答案是"否" |
|---|---|
| 这部分内容帮助采购商更快作出采购决定吗？ | 删除或下移 |
| 这部分内容在其他页面没有出现过吗？ | 合并或只保留一处 |
| 采购商第一次看到这个页面，3秒内能理解这是什么吗？ | 重写标题 |
