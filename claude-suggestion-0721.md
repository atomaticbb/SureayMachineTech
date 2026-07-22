# Sureay.com 增长诊断与执行方案 — 2026-07-21

> **状态(2026-07-21 同日执行)**:第三节"执行"1/2/3 已全部完成并本地验证(type-check
> 通过、vite build 通过、4个页面标题已在浏览器实测确认、live 生产环境确认 `<SEO>`
> 组件的 description 机制正常工作)。第五节"效果检验"待到8月上旬用同一 GSC 管道
> 复核。

数据来源:GSC(2026-06-22~07-19,按页面聚合)、Google Ads(2026-06-20~07-19,关键词层级)、GA4(近14天渠道来源)——均为你在 claude.ai 端已连通的实时表格导出,不是6月10日的旧数据。

---

## 一、现状核实(方案的事实基础)

**广告**:该窗口总花费 ¥2,679,120次点击,**仅1次转化**(6/22,tissue cutting blade,¥14.98)。撕碎机刀片组独占 ¥1,502.93(56%预算)、0转化,是最大浪费点——**已在 claude.ai 那边处理**(暂停大词、加品牌长尾词),本方案不重复。

**自然搜索总量**:4周 12,560次展现、42次点击,CTR 0.33%(比6月10日审计时的0.6%更低——展现量因新页面收录在涨,但点击转化率在恶化,不是简单"多写内容"能解决的)。

**核心发现(此前审计未覆盖,本次数据才暴露)**:Mixer Wear Parts 系列页面拿到了远超刀片产品线的真实展现,排名也不差,但点击率异常低:

| 页面 | 展现 | 排名 | 点击 | CTR |
|---|---|---|---|---|
| `/mixer-wear-parts/asphalt-mixing-plant` | 2,388 | 9.9 | 2 | 0.08% |
| `/mixer-wear-parts/asphalt-mixing-plant/asphalt-liner-plate` | 1,263 | **7.2** | **0** | 0% |
| `/mixer-wear-parts/concrete-mixing-plant` | 917 | 19.0 | 0 | 0% |
| `/mixer-wear-parts/asphalt-mixing-plant/asphalt-scraper` | 302 | **5.6** | **0** | 0% |

排第5-10位(首页范围)、单页上千次展现、点击是0——这在统计上不是巧合,是标题/摘要没有说服力。

**对照组**(说明不能无脑复制同一个"改标题"动作):`/products/multi-shaft-blades-metal` 排名5.5、116展现、0点击,看起来像同类问题,但核实后发现它的标题/描述其实已经写得很好(`"Metal Shredder Blades | H13 for Scrap & E-Waste"` + 具体材质/硬度/兼容品牌),不存在明显的文案缺陷,116次展现的样本量也小,0点击更可能是抽样波动或查询词不匹配,而不是"标题没写好"——**不列入本次立即执行,列入观察清单**,避免盲目复制同一套修复动作。

`granulator-blades`(排名57.9)、`rotary-slitter-knives-paper`(排名34)这类是排名太深的问题,标题优化对它们几乎无效,需要内容深度+外链,属于中长期项目,本方案不处理。

**GA4**:Google/Cross-network 渠道 502次会话、0转化,持续存在——需要去 Google Ads 后台检查是否有非搜索广告类型(展示网络/联盟)在跑,这是账户设置问题,不是本仓库代码能改的,列为待办但不在本次执行范围。

---

## 二、方案(先定,再执行)

**只做三件事,每件都有明确的验证窗口:**

1. **Mixer Wear Parts 高展现零点击页面 — 标题/摘要重写**(核心动作,预期2-3周内在 GSC 里看到 CTR 变化)
2. **表单提交确认邮件**(此前已核实为真实缺口,现在一并执行,不再单独讨论)
3. **电话点击追踪**(几乎零成本的顺手项)

不做的(有意排除,避免范围蔓延):表单加字段、嵌套锚点/移动端CTA(已核实为误报)、granulator/slitter-knives 的内容重建(需要外链和长文,是独立的中长期项目)、Google Ads 关键词调整(继续在 claude.ai 那边跟踪)。

---

## 三、执行

### 1. Mixer Wear Parts 标题/摘要重写

**技术方式**:类目页(`asphalt-mixing-plant`、`concrete-mixing-plant`)已有显式 `seoTitle` 字段,直接改 `client/src/data/mixerParts.ts` 里的值即可。产品页(`asphalt-liner-plate`、`asphalt-scraper`)目前标题是自动拼接的(`${part.name} for ${oemTop}`,见 `MixerProductDetail.tsx:117-119`),没有覆盖字段——参照类目页已有的模式,给 `Part` 类型加一个可选 `seoTitle?: string`,组件里改成 `part.seoTitle ?? \`${part.name} for ${oemTop}\``,只对这两个已核实有问题的产品页赋值,其余产品页维持原有自动拼接逻辑不变(不批量改模板,避免影响没有数据支撑的其他页面)。

**具体改动**(`client/src/data/mixerParts.ts`):

| 页面 | 现状 | 改为 |
|---|---|---|
| asphalt-mixing-plant(类目) | title: "Asphalt Mixing Plant Parts: Arms, Liners & Blades" | "Asphalt Plant Wear Parts — OEM Replacement (HB600+)" |
| | desc: "High-temperature wear parts for asphalt mixers — mixing arms, liner plates, spiral blades & scrapers. OEM fit Ammann, Marini & Benninghoven." | "OEM-fit replacement wear parts for Ammann, Marini, Benninghoven, MEKA & Astec asphalt plants — mixing arms, liner plates, spiral blades, HB600+ chrome iron." |
| asphalt-liner-plate(产品) | title(自动生成): "Asphalt Liner Plate for Ammann & Marini" | seoTitle: "Asphalt Mixer Liner Plate — HB600+ OEM Replacement" |
| | desc: "Asphalt mixing plant liner plate in high-chrome iron - resists hot-mix abrasion and heat, protecting the mixer shell; bolt-in replacement." | "Bolt-in asphalt mixer liner plate, high-chrome iron HB600+ — fits Ammann, Marini, Benninghoven, MEKA & Astec pugmills. Typical 6-18 month service life." |
| asphalt-scraper(产品) | title(自动生成): "Asphalt Scraper (W-Type) for Ammann & Marini" | seoTitle: "Asphalt Mixer W-Type Scraper Blade — OEM Fit" |
| | desc: "Asphalt mixing plant W-type scraper blade - sweeps hot mix off the pugmill floor and walls each cycle for clean discharge and no carbon build-up." | "W-type scraper blade for asphalt pugmills, HB600+ chrome iron — fits Ammann, Marini, Benninghoven, MEKA & Astec. Adjustable mount, bolt-in fit." |
| concrete-mixing-plant(类目) | title: "Concrete Mixing Plant Parts: Arms, Liners & Blades" | "Concrete Mixer Wear Parts — OEM Replacement (Ni-Hard)" |
| | desc: "Cast wear parts for concrete mixers — mixing arms, liner plates, scrapers & bolt-on blades in Ni-Hard & high-chrome iron. OEM fit Sicoma, Liebherr & MEKA." | "OEM-fit replacement wear parts for Sicoma, Liebherr & MEKA concrete mixers — arms, liner plates, scrapers in Ni-Hard & high-chrome iron." |

改动逻辑:统一加入"OEM Replacement/OEM Fit"这个明确定位词(原文案偏"产品目录"口吻,没有直接回答"这是不是我要找的替换件供应商"),并把硬度规格(HB600+)前移到摘要更显眼的位置——这是工业采购者扫描 SERP 时用来判断"这家是不是专业供应商"的信号。

**并行建议(不阻塞执行,但值得做)**:你在 Sheets 里已经装好 Search Analytics for Sheets,可以针对这4个 URL 单独拉一次 Query+Page 维度的数据,看真实搜索词是什么——如果两三周后 CTR 没有起色,下一步就该看真实查询词而不是继续猜标题。

### 2. 表单提交确认邮件
`server/services/emailService.ts` 新增 `sendCustomerConfirmationEmail()`,复用现有 `sendContactEmail` 的 Resend 客户端与视觉样式,发送给 `data.email`,带 `contact.id` 作为参考编号,姓名为空时用"Hi there,"兜底。`server/controllers/contactController.ts` 在数据库写入成功后调用,失败不影响用户看到的成功提示(非阻塞,与现有内部通知邮件失败时的处理方式一致)。

### 3. 电话点击追踪
`Footer.tsx`、`ContactRFQ.tsx`、`PrivacyPolicy.tsx`、`Terms.tsx` 四处 `tel:` 链接补 `onClick={() => gtagEvent("phone_click", { link_location: "..." })}`,照抄现有 `email_click` 写法。

---

## 四、检查(改完立刻做)

- `pnpm type-check`、`pnpm lint:fix && pnpm format`
- `pnpm build` 跑一次 prerender,确认这4个 Mixer Wear Parts 页面的静态 HTML 里 `<title>`、`<meta name="description">` 是新文案(不是只在开发环境生效)
- 本地 `pnpm dev` 提交一次表单,确认:内部通知邮件不变 + 新确认邮件送达且带编号 + 模拟 `RESEND_API_KEY` 缺失时不报错
- GA4 DebugView 点击 `tel:` 链接确认 `phone_click` 事件触发

---

## 五、一段时间后检验效果

**2-3周后**(建议7周内,即8月上旬),用同一个 GSC Sheets 管道重新拉取这4个页面的 Page 维度数据,对比改动前后:

| 页面 | 改前CTR(基准,本次数据) | 目标 |
|---|---|---|
| asphalt-mixing-plant | 0.08% | 提升到至少1-2%(对应排名9-10位的合理CTR区间) |
| asphalt-liner-plate | 0% | 从0到有点击(哪怕个位数,就是有效信号) |
| asphalt-scraper | 0% | 同上 |
| concrete-mixing-plant | 0% | 同上,但排名19位偏深,即使CTR不动,也不能排除是排名问题而非文案问题 |

如果2-3周后这几个页面依然是0点击,说明问题不在文案,大概率是查询词不匹配或该URL在Google眼里的相关性判断有问题,那时候再拉查询词级数据细查,而不是继续猜标题重写。

同期建议一并看一眼 claude.ai 那边 Ads 品牌长尾词的效果(那边自己有节奏,这里不重复跟踪)。
