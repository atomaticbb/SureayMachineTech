# SEO 优化待办清单

> 前置工作已完成：robots.txt / sitemap.xml / react-helmet-async / 全页面 meta 标签 / JSON-LD Product & ItemList schema / 预渲染脚本

---

## 技术 SEO（Technical）

- [ ] **图片 alt 属性审计** — 检查所有 `<img>` 是否有描述性 alt 文本，产品图尤其重要
- [ ] **Core Web Vitals 跑分** — 用 Lighthouse 检查 LCP（最大内容绘制）和 CLS（布局偏移）
- [ ] **图片现代化** — `/public/images/` 下图片转 WebP，添加 `loading="lazy"` 及明确的 `width`/`height`
- [ ] **关键资源预加载** — `index.html` 中 `<link rel="preload">` 首屏 hero 图片
- [ ] **sitemap.xml 补全** — 将 `/industry/*` 和 `/news/*` 静态路由加入 `server/routes/seo.ts`
- [ ] **hreflang 规划** — 若上线中文版，提前添加语言标签

---

## 页面内容（On-Page）

- [ ] **H1 唯一性检查** — 每页确保只有一个 `<h1>`，且与 `<title>` 关键词一致
- [ ] **面包屑导航 + BreadcrumbList schema** — 产品详情页加面包屑组件，配套 JSON-LD
- [ ] **FAQPage schema** — 产品页常见问题区块添加 FAQ JSON-LD（搜索结果可展开）
- [ ] **内链密度** — 行业页与产品列表页相互交叉链接，减少孤立页

---

## 结构化数据（Structured Data）

- [ ] **Organization schema 补全** — `index.html` 确保 `contactPoint`（电话/邮件）、`address`、`sameAs`（LinkedIn 等）字段完整
- [ ] **LocalBusiness schema** — 如有实体地址，添加本地商家标记
- [ ] **aggregateRating 接入真实数据** — 目前为硬编码值，后续有评价系统时替换

---

## 爬取与索引

- [ ] **Google Search Console 验证** — 提交 sitemap，监控索引覆盖率和 CWV 报告
- [ ] **外链 `rel="nofollow"` 策略** — 外部链接加 `rel="nofollow noopener"`
- [ ] **页面深度控制** — 重要页面距首页点击深度 ≤ 3 层

---

## B2B 内容策略

- [ ] **长尾关键词** — 产品描述中融入规格词，如 "D2 steel granulator blades"
- [ ] **PDF 技术规格表** — 提供可下载 spec sheet（Google 会索引 PDF 内容）
- [ ] **案例研究页（Case Studies）** — B2B 转化率最高的内容类型，同时积累外链
