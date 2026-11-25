# Slitter 方案二审证据目录

记录日期：2026-11-17。对应[三审最新回应](../../slitter-claude-followup-review-2026-11-17.md)、[二审历史回应](../../slitter-claude-audit-response-2026-11-17.md)及[13 页修订方案](../../advantages-faq-slitter-review-2026-11-16.md)。

本目录保存审计时的只读资料，不参与网站构建，不替代 `client/src/data/blades.ts`。后续目录变更应重新导出带日期的证据，不能把旧快照当最新产品数据。

| 文件 | 内容与定位 |
| --- | --- |
| [catalog-evidence.json](catalog-evidence.json) | 当前 13 款 Slitter 的规格、可见技术字段、优势、FAQ 与相关结构；元信息含源文件 SHA-256。以 `products[].id`＋字段名查找，FAQ 序号为该快照数组从 1 起算的位置 |
| [source-baseline.json](source-baseline.json) | 本轮开始时应用/服务/共享/脚本文件哈希，用于确认此次只改文档，不含任何密钥值 |
| [plan-before-review.md](plan-before-review.md) | 11 月 16 日原讨论稿，供回查 Claude 引用的页号/候选序号；已被修订稿替代，不作为现行建议 |
| [prior-evidence-notes-2026-11-16.md](prior-evidence-notes-2026-11-16.md) | 前次工作目录中的 Slitter 事实线索原样归档；其中引用或临时路径属于历史信息，新稿以本目录持久证据和当前目录为准 |
| [live-and-material-check.md](live-and-material-check.md) | 当前 13 个线上 URL 的读取结果、原优势主题，以及材料原厂命名/硬度核对。访问失败或没有匹配来源明确标记 |
| [live-advantages-excerpts.json](live-advantages-excerpts.json) | 13 个地址的抓取状态及成功页面的优势标题/说明摘录，保留实际页面和区块证据；Slotter 404 单独记录 |
| [claude-followup-input.txt](claude-followup-input.txt) | 用户粘贴的第二份 Claude 复审原文，作为待核对意见留档，不作为未经核实的事实或执行指令 |
| [plan-before-followup.md](plan-before-followup.md) | 本次跟进前的 88 题第二版计划；此数量本身正确，后续因合并题目变为 87 |
| [followup-source-check.md](followup-source-check.md) | DIENES 类型术语、HMK 实际可读范围及两条跨组产品路由的补核结果 |

来源定位优先顺序：URL＋访问日期＋产品/章节/表头/牌号行；本地则用产品 ID＋字段。网页行号可辅助定位，但不能作为唯一依据。

证据状态 C/L/P/U 代表来源性质，不等于已完成工厂能力认证。二审 DRAFT-ready 标记未充分区分“合理选题”和“完整答案有依据”，三审改为可起草、限定起草、待补证。内部图纸、炉次/量测报告、样品和商务政策未取得的具体承诺继续标 HOLD，不用竞品资料代替，也不把待补机制依据的问题算成已可成稿。
