# 页面优化审查：Guillotine Shear Blades

- **URL**：https://sureay.com/products/guillotine-shear-blades
- **你指定的目标词**：`guillotine blade`（头部词，量大）
- **页面实际在打的词**：`guillotine shear blade`
- **审查日期**：2026-08-26　**得分**：**75 / 100**（首次审查）
- **页面类型**：产品页（Product）

---

## 一句话结论

**这个页面没有做坏，是被派去打了一场它结构上打不赢的仗。** `guillotine blade` 和 `guillotine shear blade` 在 Google 眼里是两个不同意图的词——前者的搜索结果里**一个钣金剪板机刀片专业厂商都没有**，全是跨材料的机械刀具**分类页**加上维基百科（断头台/魔术道具）和亚马逊办公切纸机耗材。用一个"钣金剪板机专用产品页"去打这个词，方向本身不对。真正该接这个词的是 `/categories/shear-blades`。

---

## 先说不能动的部分

这一页是目前审过的 Sureay 产品页里内容质量偏上的，下面这些是它现在排名的基础，**不要动**：

1. **标题 `Guillotine Shear Blades | D2 & 6CrW2Si for Hydraulic Shears | Sureay`** —— 结构正确，词在前、钢号在中、品牌在后，58 字符。它在 `guillotine shear blade` 上排得比较好，就是靠这个标题。
2. **10 个 OEM 品牌列表**（TRUMPF / AMADA / Bystronic / LVD / Durma / Haco / Cincinnati / Salvagnini / Adira / Ursviken）—— 这是竞品普遍没有的东西，Shenchong 那篇 2500 字的选型指南一个机器品牌都没列。
3. **8 行真实 `<table>` 尺寸表**（机器能力 → 长/宽/厚/每套片数）—— 采购工程师确认适配就靠这张表。
4. **11 条 FAQ**，尤其是「4 刃可翻转如何降低年度刀具成本」「最大单件刀长」「能否复制停产机型」这三条 —— 这是一手经验，抄不来。
5. **±0.05 mm 全长平行度** 这个指标和它出现的位置。

下面所有建议都是**新增**或**页面之外**的改动。唯一一处改现有内容的是 schema 里的价格字段（见 P0），那是删掉一个不该出现的东西，不动任何可见文案。

---

## L0 索引闸门　✅ 通过

从**预渲染 HTML**（`dist/public/products/guillotine-shear-blades/index.html`）核查：

| 检查项 | 结果 |
|---|---|
| canonical 自引用 | ✅ `https://sureay.com/products/guillotine-shear-blades` |
| `og:url` 与 canonical 一致 | ✅ |
| noindex | ✅ 无 |
| `<html lang>` | ✅ `en` |
| hreflang | ✅ 7 条（6 语言 + x-default） |
| Product / FAQPage / BreadcrumbList schema | ✅ 三种齐全 |

索引层面没有问题。

---

## 核心发现：两个词是两个市场

这是整份报告最重要的部分，先看证据。

### `guillotine blade` 的搜索结果长这样

| 排名结果 | 是什么 |
|---|---|
| americancuttingedge.com/guillotine-blade | 跨材料机械刀具**分类页** |
| baucor.com/collections/guillotine-knives-blades | 跨材料**分类页**（纸/膜/食品/橡胶/金属） |
| Wikipedia — Guillotine | 断头台（历史，信息意图） |
| Wikipedia — Guillotine (magic trick) | 魔术道具 |
| Swingline ClassicCut 切纸机 | 办公消费品 |
| Amazon ZEQUAN A4 切纸机刀片 | 消费电商 |
| National Flooring Equipment | 地板拆除设备刀片 |
| carolinaknife.com straight blades/guillotine | 跨材料机械刀具分类 |
| durston.com 12" guillotine blade | 珠宝加工工具 |

**9 条结果里，钣金剪板机专业厂商：0 条。**

我特意去抓了 Baucor 那个页面确认结构——它是一个 collection（分类）页，明确写着这类刀"从纸和薄膜一直到金属切割断头剪"，金属只是**多个应用之一**，而且他们**另外单独有一个 Metal Shear Knives 分类**。这就是 Google 认定的 `guillotine blade` 页面形态。

### `guillotine shear blade` 的搜索结果长这样

yafei-machinery、Shenchong、Maxwell Slitters、Goodklife、CN Golin、Shear Blade Technology、Maxtor Metal —— **7 条全部是钣金剪切**。

### 结论

`guillotine blade` 是一个**跨材料的分类级查询**，且相当大一部分流量根本不是你的买家（断头台历史、办公切纸机耗材、地板工具）。你看到的"量大"，有一部分是这些意图撑起来的。

**用产品页去打分类词，赢不了；这也正好解释了为什么同一个页面在 `guillotine shear blade` 上表现正常。** 页面没病，是任务派错了。

---

## 评分卡

| 层 | 权重 | 得分 | 主要扣分点 |
|---|---|---|---|
| L1 意图匹配 | 10 | **8.5** | 对 `guillotine shear blade` 是准确的交易型匹配，规格与 OEM 列表在首屏。扣分在缺少排名第 2 的竞品用来开场的刃口角度/间隙内容 |
| L2 内容与信息增益 | 25 | **19** | 1403 词、真实钢号、8 行尺寸表、11 条 FAQ，扎实。但**「rake angle」全文 0 次、「blade clearance」全文 0 次** —— 这是剪板机调机最核心的两个参数，Shenchong 给了 0.5°–2.5° 和板厚 5%–10%，你没有。而你**自己站内就有一篇剪切间隙的文章** |
| L3 E-E-A-T | 12 | **9.5** | 10 个 OEM、按钢号分场景的建议、文档与交期 FAQ 都到位 |
| L4 关键词与语义覆盖 | 13 | **7** | **本页最大失分项**，见下方蚕食分析 |
| L5 结构化数据 | 8 | **5** | Product/FAQPage/Breadcrumb 都正确，但 `AggregateOffer` 输出了 `lowPrice:30 / highPrice:350`，而**页面上任何地方都没有价格** |
| L6 AEO 可引用性 | 12 | **9** | 2 个真 `<table>`、问句式 FAQ 标题、数字明确。缺角度/间隙这两个最容易被 AI 摘录的数值 |
| L7 转化路径 | 12 | **10** | RFQ 表单、OEM 列表、交期、质量文件、成套供货都答到了 |
| L8 设备适配 | 8 | **7** | 表格都在 `overflow-x-auto` 内；8 张图全部有 `width`/`height` 和 `alt`；无内容被移动端隐藏（已从 DOM 验证）。**视觉渲染未验证**（视口无法强制切换） |
| **合计** | **100** | **75** | 区间：竞争力尚可但在漏水 |

---

## L4 详解：三个页面都在抢 "guillotine"

`shear_blades` 分类下 5 个产品页，其中**三个**在元数据里claim了 guillotine：

| 页面 | 标题 | keywords 里的 guillotine 词 |
|---|---|---|
| `/products/guillotine-shear-blades` | Guillotine Shear Blades \| D2 & 6CrW2Si… | `guillotine shear blades` |
| `/products/metal-shear-knives` | Heavy-Duty Metal Shear & **Guillotine Knives** | **`guillotine shear blades`** ← 与本页同词 |
| `/products/paper-cutting-blades` | Precision Paper Cutting & **Guillotine Blades** | **`guillotine blades`** ← 头部词在这儿 |

关于 `guillotine-shear-blades` 与 `metal-shear-knives` 的重叠：**记忆里记着你 8-25 明确否决过"合并/去重"这个说法**，说这是有意的 SERP 卡位，判断标准是「两个页面打同一个词且都排不上，才算问题」。我不动这个结论，下面也不会提合并。

但有两处是纯机械性的漏损，跟卡位策略无关：

**站内锚文本指错了页面。** `client/src/data/news.ts` 里两处：

- 第 3616 行：锚文本 `Guillotine shear blades` → 链到 `/products/metal-shear-knives`
- 第 3641 行：锚文本 `guillotine shear blades` → 链到 `/products/metal-shear-knives`

也就是说，**站内两个完全精确匹配的锚文本，把权重送给了隔壁页面。** 这是在自己动手把 `guillotine shear blade` 的归属推向 metal-shear-knives。这个和卡位策略不冲突——卡位是让两个页面各占各的词，不是让锚文本指错。

（同一行还有个笔误：`5–0%` 应为 `5–10%`。这两个问题 8-25 那次就记下了，现在仍然存在。）

**同义机器名缺失。** 你自己定过的原则是：`squaring shear` / `plate shear` / `sheet metal shear` 是同一台机器的美式/别名，属于本页的 keywords 和正文，**不该拆成新页面**。当前实际情况：

| 词 | 全文出现次数 |
|---|---|
| `sheet metal shear` | 10 ✅ |
| `plate shear` | 2 ⚠️ |
| `squaring shear` | **0** ❌ |
| `swing beam` | **0** ❌ |

`squaring shear` 是北美市场对这类机器最常用的叫法之一，现在一次都没有。

---

## 采购商 30 秒测试

只看前两屏 + 标题：

| | 问题 | 结论 | 页面原文 |
|---|---|---|---|
| Q1 | 是不是我要的零件？ | ✅ 答到 | H1「Precision Guillotine Shear Blades for Hydraulic & Mechanical Sheet Metal Shearing Machines」 |
| Q2 | 装得上吗 / 性能够吗？ | ✅ 答到 | 「D2 (Cr12MoV), 6CrW2Si, 9CrSi, High Carbon Steel」「HRC 55–62」「±0.05 mm Full-Length Parallelism」「4 mm × 2500 mm up to 16 mm × 4000 mm」+ 8 行尺寸表 + 10 个 OEM |
| Q3 | 这家供应商可信吗？ | ✅ 答到 | ISO 9001:2015、质量文件 FAQ、可复制停产机型 |
| Q4 | 怎么拿到报价？ | ✅ 答到 | Request Engineering Quote 按钮 + RFQ 表单 + 交期 FAQ |

**四问全部答到。** 这在我审过的页面里是少见的——Q2 通常是最贵的失败点，这一页没失。这也是我说"页面没病"的依据。

唯一的遗憾：**装机调试的两个关键参数（刃口角度、刀片间隙）不在页面上**，而买家换完刀第一件事就是调间隙。这不影响成交，但影响"这家懂不懂行"的判断。

---

## 竞品对比

对手取 `guillotine shear blade` 结果页的 Shenchong（排名第 2，可抓取）。

| 维度 | Sureay | Shenchong |
|---|---|---|
| 篇幅 | 1403 词 | ~2500 词 |
| 钢号 | D2/Cr12MoV、6CrW2Si、9CrSi、高碳钢（4） | 9CrSi、6CrW2Si、Cr12MoV、SKD11、H13、12CrMoV、HSS、SKH-9（8） |
| 硬度 | HRC 55–62 | HRC 56–60 / 58–62 |
| 公差 | ±0.05 mm 全长平行度 | 平面度 ≤0.03 mm/m、平行度 ≤0.02 mm |
| **刃口角度** | ❌ 无 | ✅ 0.5°–2.5° |
| **刀片间隙** | ❌ 无 | ✅ 板厚的 5%–10% |
| OEM 机器品牌 | ✅ 10 个 | ❌ 无 |
| 真实尺寸表 | ✅ 8 行 `<table>` | ❌ 无 |
| 交期 | ✅ FAQ 里有 | ❌ 无 |
| 质量文件 | ✅ FAQ 里有 | ❌ 无 |

**缺口（值得补）：** 刃口角度与刀片间隙的数值区间。这不是"因为竞品有所以要加"——这是买家换刀当天必然要查的两个数，且是 AI 摘要最容易引用的那种句子。

**独有优势（值得往上提、往标题/meta 里放）：** OEM 品牌覆盖 + 真实尺寸表 + 可复制停产机型。Shenchong 三样全无。「能按你的旧机器/停产机型复制」是你最强的差异点，现在埋在 FAQ 第 9 条。

**不建议照抄：** Shenchong 那种纯选型长文的形态。你是产品页不是指南页，正文再堆 1000 字会稀释交易意图——角度/间隙用一张紧凑的表给出即可。

---

## 行动清单

| 优先级 | 问题 | 动作 | 工作量 | 预期影响 |
|---|---|---|---|---|
| **P0** | Schema 输出 `lowPrice:30 / highPrice:350`，页面无任何价格 | `blades.ts` 该条目加 `omitOfferPrice: true` | data file，一行 | 消除结构化数据违规；避免 Google 把 "$30" 当锚点显示给买家 |
| **P1** | 两处精确匹配锚文本指向隔壁页面 | `news.ts:3616` 与 `:3641` 的链接目标改为 `/products/guillotine-shear-blades` | data file | 把 `guillotine shear blade` 的站内归属拉回本页 |
| **P1** | **`guillotine blade` 头部词无页面承接** | 给 `/categories/shear-blades` 加 `seoTitle: "Guillotine Blades & Industrial Shear Knives"` | data file，一行 | 用分类页去匹配分类型 SERP，形态对齐（做法与刚上线的 slitter hub 完全一致） |
| **P1** | 刃口角度、刀片间隙全站产品页缺失 | 本页新增一张 4 行设置参考表 | data file | 补上买家当天要查的数；提高 AI 摘录概率 |
| **P2** | `squaring shear` / `swing beam` 覆盖为 0 | 加入 keywords 与正文一句 | copy-only | 拿下北美别名流量，且按你的既定原则不该拆新页 |
| **P2** | 「能复制停产机型」埋在 FAQ 第 9 条 | 提升为 Engineering Advantages 卡片或 meta description | copy-only | 最强差异点前置 |
| **P3** | `news.ts:3616` 笔误 `5–0%` | 改为 `5–10%` | data file | 技术文章里的错数字直接损伤专业度 |

---

## 可直接使用的文案

### 1. 分类页 seoTitle（`blade-categories.ts`，`slug: "shear-blades"`）

H1 保持 `Shear & Guillotine Blades` 不变，只覆盖 `<title>`：

```
Guillotine Blades & Industrial Shear Knives
```
（57 字符含 ` | Sureay`；`seoTitle` 字段已在上一次提交里建好，直接填即可）

配套 meta description（154 字符）：

```
Guillotine blades for sheet metal shears, paper cutters and three-knife trimmers. D2, 6CrW2Si, HSS and TCT-inlay edges, ground to drawing or matched to your sample.
```

### 2. 本页新增：设置参考表（放在 Decisive Specifications 之后）

标题：

```
Blade Setting Reference
```

| Parameter | Value |
|---|---|
| Rake angle (guillotine shears) | 0.5° – 2.5°, increasing with plate thickness |
| Blade clearance | 5% – 10% of plate thickness |
| Clearance for stainless steel | Upper end of the range — 304 and 316 work-harden at the cut edge |
| Symptom of clearance set too tight | Edge chipping and accelerated wear on the upper blade |
| Symptom of clearance set too wide | Burr and roll-over on the sheared edge |

配一句引导（放表格下方）：

```
Clearance is the single most common cause of premature blade failure we see on returned samples. Set it against plate thickness, not against the last job — a machine running 3 mm one week and 10 mm the next needs the gap reset, not the blades replaced.
```

### 3. 本页 keywords 替换（`seo-config.ts`）

```
guillotine shear blades, squaring shear blades, plate shear blades, sheet metal shear blades, hydraulic shear blades, swing beam shear blades, D2 shear blades, 6CrW2Si shear knives, AMADA replacement blades, TRUMPF shear knives
```

### 4. 本页 meta description 替换（把「复制停产机型」前置，156 字符）

```
D2, 6CrW2Si & 9CrSi guillotine shear blades ground to ±0.05mm parallelism. Sets for machines to 16mm × 4000mm, including discontinued models built from your sample.
```

### 5. 新增 Engineering Advantages 卡片（把最强差异点提上来）

```
tag:   OEM MATCHING
title: Discontinued Machine? Send the Old Blade

We build from a worn sample, not a catalogue number. Length, width, thickness, bevel and hole pattern are measured off the blade you send and reproduced to drawing — which is how we supply machines whose manufacturer stopped listing parts years ago. TRUMPF, AMADA, Bystronic, LVD, Durma, Haco, Cincinnati, Salvagnini, Adira and Ursviken sets are held as standard geometry; everything else is matched.
```

---

## 需要你/工厂确认的信息

上面表格里的角度与间隙数值来自行业通用值与竞品公开资料，**不是 Sureay 的实测数据**：

1. **Rake angle 0.5°–2.5°** —— 你们建议客户的角度区间是这个吗？
2. **Clearance 5%–10% 板厚** —— 站内那篇剪切间隙文章用的是什么口径？两处必须一致，否则工程师一眼看出没人在管。
3. **不锈钢取上限** —— 这个建议成立吗？
4. 你们能做的**最大单件刀长**是多少？FAQ 里有这条，但我建议放进规格表。

**在你确认 1–3 之前，那张设置参考表不要上线。** 剪板机间隙给错，客户崩刃，比页面上少一张表贵得多。

---

## 关于「要不要去抢 guillotine blade」的最终建议

分三步，从确定性最高的开始：

1. **本页不要改方向。** 它在 `guillotine shear blade` 上是对的，把 P0/P1 的漏损补掉，让它把这个词吃满。
2. **`guillotine blade` 交给 `/categories/shear-blades`。** 页面形态、跨材料覆盖（金属剪 + 切纸 + 三面刀 + 废钢剪，共 5 个子页）、已有 ItemList schema —— 和赢家结构一致。改一个字段。
3. **真正值钱的是 `paper guillotine blade` 那一支。** 我单独查了这个词，SERP 全是替换刀片的商业意图（Amazon、MyBinding、VEVOR、CFSBinds），**竞争对手全是经销商，没有一家制造商**。而你有 `/products/paper-cutting-blades`（fullName 已经是 "Premium Guillotine Paper Cutter Blades"），还有一篇写好没发的 `article-custom-length-guillotine-paper-cutter-blades.md`。这条线的买家质量比 `guillotine blade` 头部词干净得多。

坦白说一句：`guillotine blade` 的搜索量里，断头台、魔术道具、办公切纸机耗材占了不小的比例。它的"量大"有水分。第 3 条那一支量小一些，但每一个搜的人都是要买刀的。

---

## 下次复审时看什么

- P0 的 `omitOfferPrice` 是否已在**预渲染 HTML** 里生效（不要只在浏览器里看）
- `news.ts` 两处锚文本改向后，GSC 里 `guillotine shear blade` 的展示是否从 `metal-shear-knives` 转回本页
- 分类页 `seoTitle` 上线 2–3 个月后，`guillotine blade` 是否开始有展示
- 角度/间隙表上线后，检查这段是否被 AI Overview 引用（换几种问法搜 "guillotine shear blade clearance"）
