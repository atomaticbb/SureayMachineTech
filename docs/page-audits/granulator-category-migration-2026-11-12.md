# Granulator 英文分类拆分验收

日期：2026-11-12。范围为用户确认的英文分类、菜单、入口、内链和发布门禁；未部署。

## 最终归属

| 产品 | 英文分类 | 原 URL |
| --- | --- | --- |
| Plastic Granulator Knives | Shredder Blades | `/products/granulator-blades` |
| Strand Pelletizer Rotors | Other & Custom | `/products/strand-pelletizer-rotors` |
| Melt Filter Scraper Blades | Other & Custom | `/products/continuous-melt-filter-scraper-blades` |
| Cutter Compactor Blades | Other & Custom | `/products/cutter-compactor-blades` |
| Die-Face Cutting Knives | Other & Custom | `/products/die-face-cutting-knives` |
| Special-Shaped Industrial Blades | Other & Custom | 保留详情 `/products/special-shaped-blades`，原卡片仍指向 `/custom` |

2026-11-13 更新：Shredder 共 8 款，其中转子刀、定刀、筛网与 Plastic Granulator Knives 四款合并至 `Single-Shaft Shredder & Granulator Parts`（`single-shaft-parts`）组；Other & Custom 共 5 款，按用户后续要求直接平铺，不设二级分组或分组导航。英文菜单共有 6 个刀具分类。

## URL 与语言策略

- `/categories/granulator-blades` → **301** → `/categories/shredder-blades#single-shaft-parts`。
- `/categories/custom-profile` → **301** → `/categories/other-custom-blades`。
- 同时处理英文 `/en/` 别名、尾斜杠和查询参数；规则先于静态 HTML。
- 五款移组产品原 URL 直接返回 200。Cold Saw 产品及分类继续返回 410。
- Other & Custom 仅英文；未创建其他语言分类页。
- 七种既有 Granulator 译文分类继续保留原归属和 URL；其 hreflang 不再指向已迁移的英文旧分类。
- sitemap 共 579 个 URL；英文旧分类退出，新英文 Other 进入，既有非英文 Granulator URL 保留。

## 本轮验证

- 已记录实施前工作区基线。35 款产品完整对象对照：只改变指定五款的 `category`；其余字段、正文、规格、图片、链接均一致。
- 42 个非英文资料和字典文件逐字节一致，没有新增译文。
- 原七款 Shredder 升级模板仍只用于这七款；Plastic Granulator 移组没有触发详情改版。
- 桌面 1440 px、手机 390 px 检查分类、产品和筛选入口，无横向溢出；桌面与手机菜单均显示新分类。
- `pnpm type-check` 通过；目录测试 32/32 通过。
- 仅运行 Vite 构建和 `PRERENDER_LANGS=en` 预渲染，共 118 个英文 HTML；未运行默认多语言/PDF 构建或翻译脚本。
- 英文范围 `test:release` 通过：`test:build` 117 个公开页面，`test:seo` 118 个页面（包含 404），`test:routing` 119 项真实 HTTP 检查。
- 临时插入旧分类内链和错误 ItemList 后，SEO 门禁按预期失败；恢复原 HTML 后再次通过。

## 发布门禁

规范与命令见 [产品页升级模板](../qa/product-page-upgrade.md)。

`pnpm test:release` 顺序运行类型检查、目录回归测试、构建完整性、SEO 和真实服务器路由检查。Docker 构建完成后强制以全部既有语言范围执行；任一失败会中止镜像构建。

本轮英文验收通过不代表完整发布验收完成。正式发布仍需对完整构建执行门禁；本次未生成其他语言页面、未部署。
