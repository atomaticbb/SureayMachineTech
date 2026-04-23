# Sureay.com SEO 执行清单

> 数据来源：GSC 2026-02-05 ~ 2026-04-20 | 更新日期：2026-04-23

---

## P0 — 本周内（止血优先）

### 技术修复

- [x] **[P0-1] 确认域名统一生效** — 2026-04-23
  - 301 跳转已验证：`https://www.sureay.com` → `https://sureay.com/`（Cloudflare 层生效）
  - 待后续：GSC 覆盖范围中确认 www 属性有效索引逐步清零（预期 2-3 周内完成）
  - 预期：`/products` 的分裂展示（97 + 430）合并，排名稳定在 3-4 位

- [x] **[P0-2] 阻止图片 URL 被 Google 单独收录** — 2026-04-23
  - `client/public/robots.txt` 已加 `Disallow: /images/`
  - 已有图片收录需等 Google 重新抓取后自然退出（约 4-8 周）

- [x] **[P0-3] 检查并修复站内死链** — 已确认（历史记录，源码已修复）
  - `HeaderIndustrial.tsx` 和 `metal-industry.tsx` 核查：所有产品链接均指向有效 URL，死链不存在

- [x] **[P0-4] sitemap 补全缺失行业页** — 已确认（早已包含）
  - `scripts/generate-sitemap.ts` 已包含 `/new-energy-industry` 和 `/converting-industry`

---

### SERP 文案优化（高排名零点击，改了立刻见效）

以下页面排名已在首页/第二页，但 CTR = 0%，需要改 `<SEO>` 组件的 title/description：

- [x] **[P0-5] `/products/twin-shaft-blades-recycling`** — 2026-04-23
  - `seo-config.ts` 已更新
  - 新 Title：`Twin-Shaft Shredder Blades | D2/SKD11, OEM Fit Weima · Untha · Vecoplan | Sureay`
  - 新 Description：加入 intersecting-scissor、工厂直供、wholesale 信号、CTA

- [x] **[P0-6] `/products/single-shaft-bed-knives`** — 2026-04-23
  - `seo-config.ts` 已更新
  - 新 Title：`Stator Knife & Bed Knives for Single-Shaft Shredders | OEM Replacement | Sureay`
  - 新 Description：加入 counter bed knives 同义词、drop-in OEM replacement、send drawing CTA

- [x] **[P0-7] `/products/granulator-blades`** — 2026-04-23
  - `seo-config.ts` 已更新
  - 新 Title：`Plastic Granulator Blades & Crusher Knives | OEM Replacement, Factory Direct | Sureay`
  - 新 Description：加入 wholesale、send model no. 精准 CTA

- [x] **[P0-8] `/products/nonwoven-slitter-knives`** — 2026-04-23
  - `seo-config.ts` 已更新
  - 新 Title：`Nonwoven Slitter Knives | PP Spunbond, SMS & Meltblown Fabrics | Sureay`
  - 新 Description：加入速度指标 200–500 m/min、anti-fraying 工程细节、OEM fit 信号

---

## P1 — 2-4 周（拉排名）

### 核心主词冲刺

- [x] **[P1-1] `rotary slitter blades / knives` 内容深度提升** — 2026-04-23
  - 已做词页分层：主页（converting版）独占泛词，纸页/金属页各守行业精确词
  - `seo-config.ts` 三页 title/description/keywords 全部重写，消除关键词自相竞争
  - 首页 JSON-LD `"Metal Processing Knives"` 错误分类已修正为 converting 版正确标注
  - 新增 metal-foil-strip-slitter-knives、granulator-blades 两条 JSON-LD 入口

- [x] **[P1-2] `rotary slitter blades / knives` 内链权重传导** — 2026-04-23
  - `blades.ts` hub-spoke 内链已建立：
    - 主页（converting版）→ `relatedBladeIds` 指向 paper版、metal版、nonwoven版
    - paper版 → `relatedBladeIds` 首位改为指向主页（锚文本：rotary-slitter-knives）
    - metal版 → `relatedBladeIds` 首位加入主页
    - nonwoven版已有指向主页，保持不变
  - 内链层级：converting版为 hub，paper/metal/nonwoven 为 spoke，泛词由 hub 承接

- [x] **[P1-3] 材质深度内容：碳化钨 / 碳化铬** — 2026-04-23
  - `twin-shaft-blades-recycling` description：加入 `chromium carbide rotor blades` + `wholesale` + `low MOQ`（原 CTR 0% 因摘要无 carbide 词）
  - `rotary-slitter-knives` description + keywords：加入 `tungsten carbide options` / `tungsten carbide slitter blades`
  - `metal-foil-strip-slitter-knives` description + keywords：`solid carbide` → `tungsten carbide slitter knives`；加 `wholesale` + `low MOQ`

### 欧美市场文案本地化

- [ ] **[P1-4] 美国市场核心页 Meta 优化**
  - 美国：展示 791，CTR 仅 2.28%（B2B 合格线 5%）
  - 核心产品页 Title/Description 改写公式：
    ```
    [Product] for [Application] — [Key Spec], [Material], OEM replacement for [Brand].
    Factory direct | [X] pc min order | [N]-day lead time.
    ```
  - 优先改：rotary slitter knives、twin-shaft shredder blades、granulator blades

- [ ] **[P1-5] 德国/日本市场信任信号**
  - 日本：展示 25，排名 8.0，CTR **0%**（首页可见但无点击，极异常）
  - 德国：展示 31，排名 19.7，CTR **0%**
  - 在 Title/Description 中加入：`ISO 9001`, `DIN-compatible tolerances`（如适用）
  - 日本 0 点击异常需排查：检查对应关键词是否日语搜索、页面语言标记是否正确

- [ ] **[P1-6] 调查泰国排名 1.2 但零点击的异常**
  - 泰国：展示 21，排名 **1.2**（基本是第一位），CTR **0%**
  - 可能原因：Google Images 排名第一（非网页搜索）、或对应关键词为品牌词但泰语展示
  - 在 GSC 按国家筛选"泰国"后看具体关键词，判断是否是图片搜索流量

---

## P2 — 4-8 周（提转化）

- [ ] **[P2-1] 产品页首屏转化结构改造**
  - 所有产品页首屏必须出现（Above the fold）：材质 / 硬度 / 公差 / 可兼容机型 / MOQ / 交期 / 质检标准
  - 强化双 CTA：`Upload Drawing` + `Get Quote`（按钮位置和视觉权重）

- [ ] **[P2-2] 东南亚市场内容投入**
  - 越南 CTR 26.67%、加拿大 9.23%、香港 10%——这些市场用户愿意点击
  - 考虑越南语/繁体中文 `hreflang` 配置（低成本，高收益）

- [x] **[P2-3] 完善结构化数据** — 2026-04-23
  - `SEO.tsx` `ProductData` interface 新增 `images?: string[]`、`material?: string`
  - Product JSON-LD 新增 `url`（指向 canonical）、`material`、`image` 改为多图数组
  - `ProductDetail.tsx` 传入 `images: blade.gallery?.slice(0, 4)`；`material` 从 `blade.specs` 自动提取
  - 确认已有：`BreadcrumbList`、`FAQPage`、`AggregateOffer`（含 shipping details）、`sku`/`mpn` — 均无需改动

- [ ] **[P2-4] SEO → RFQ 转化漏斗追踪**
  - 在 GA4 中设置事件：`upload_cad_click`、`rfq_form_submit`、`whatsapp_click`
  - 按流量来源（organic）过滤，建立周度看板
  - 目标：让 SEO 和销售目标对齐，不只看点击

---

## 90 天 KPI

| 指标 | 当前（2026-04） | 4周目标 | 12周目标 |
|------|---------------|---------|---------|
| 非品牌点击（月绝对值） | ~21次 | 50+/月 | 100+/月 |
| 核心产品页平均 CTR | <1% | >2% | >3.5% |
| Top20 关键词数 | ~7个 | 15个 | 30个 |
| `rotary slitter knives` 排名 | 57 | <30 | <15 |
| `twin-shaft shredder blades` 排名 | 10.3 | <5 | 稳定首页 |
| SEO 来源 RFQ 数量 | 未追踪 | 建立追踪 | 月增 20% |

---

## 执行结论（2026-04-23）

本轮 SEO 改动于 2026-04-23 集中执行完毕，涵盖 P0 全部 + P1-1/2/3 + P2-3，共修改文件：

| 文件 | 改动摘要 |
|------|---------|
| `client/public/robots.txt` | 新增 `Disallow: /images/` 阻止图片 URL 单独索引 |
| `client/src/utils/seo-config.ts` | 8 个产品页 title/description/keywords 重写；三页 rotary slitter 关键词分层隔离；材质词（tungsten/chromium carbide）注入 SERP 摘要 |
| `client/src/pages/Home.tsx` | JSON-LD ItemList 修正 converting 产品分类错误，从 3 条扩展为 5 条，补充 metal 和 granulator 入口 |
| `client/src/data/blades.ts` | rotary slitter 三页 hub-spoke `relatedBladeIds` 内链建立 |
| `client/src/components/common/SEO.tsx` | Product JSON-LD 新增 `url`、`material`、多图 `image` 数组 |
| `client/src/pages/ProductDetail.tsx` | 传入 `images`（gallery 前4张）、`material`（从 specs 自动提取） |

**暂缓项目**（P1-4/5/6、P2-1/2/4）：当前数据体量或改动成本不支持立即投入，待 4 周后复查 GSC 数据后重新评估优先级。

**下次复查节点：2026-05-21**（改动上线约 4 周，Google 重新抓取周期基本完成）。届时重点对比：
- `rotary slitter knives` 排名变化（基线 57）
- `twin-shaft shredder blades` CTR 变化（基线 0%，排名 10.3 已在首页）
- `chromium carbide rotor blades` CTR 变化（基线 0%，排名 6-7）
- Rich Results 覆盖数量（Google Search Console → 增强功能 → 产品）

---

*每完成一项，将 `- [ ]` 改为 `- [x]`，并在条目末尾备注完成日期。*
