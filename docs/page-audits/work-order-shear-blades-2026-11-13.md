# Shear 英文页面升级与待确认清单

## Paper 分类 Hero 修正（2026-11-13，已实施）

用户授权调整 Paper Hero，完成后进入下一类别。本节更新下方 Hero 审查中 Paper 的“尚未实施”状态；Shear 横幅与其他待办未扩改。

- 仅英文 `/categories/paper-cutting-knives`：移除方形白底图作为 cover 背景的用法，改为透明刀图等比例完整显示在独立右侧区域；标题保留原文，长标题均衡换行，可见说明使用现有简短 tagline，SEO Title / description 不变。
- 以原纸刀主图为编辑输入，内置图像工具去白底，保留刀身、孔型与方向；产物为 `client/public/images/hero/paper-cutting-knife-transparent.webp`，800 × 800，另有 320w / 640w，三档均有真实 alpha。仅分类 Hero 使用新图，产品页和卡片原图不覆盖。
- 图片通过 picture / srcset / sizes 与对应响应 preload 提供。1440 / 1024 px 首屏均为 300 px，768 px 为 326.5 px，390 px 为 282 px；文字与图像区域没有重叠，四张卡片与原顺序保持。普通桌面加载 320w，DPR2 加载 640w，手机无该横幅文件请求。
- 类型检查、7 项目录测试通过；检查桌面、平板与手机，无横向溢出。未生成译文、PDF、默认生产构建或发布。

图像编辑提示留档（内置工具）：Edit target: the provided real photograph of ONE long paper guillotine knife. Remove ONLY the white background and background inside open mounting holes, producing true transparent alpha. Preserve the entire original blade exactly: silhouette, length-to-width ratio, diagonal orientation, each hole and hole placement, sharp straight edge, metal finish, marks, lighting, perspective. Do not create extra blades, holes, textures, text, or redesign the part. Keep both ends fully visible with generous transparent margin in a square canvas. This will be a product cutout shown with object-fit contain on a navy website category hero. No ground shadow, no glow, no opaque background.

## 当前状态索引：Paper / Shear Hero 复核与剩余事项（2026-11-13）

本节按用户最新要求核查页面和历史任务单，替代下文早期记录中已失效的“未新增、待补图、待拆分”等状态。此次仅检查和登记建议，未改页面、产品数据、标题或图片。

- 当前英文目录为 Metal Shear 五款、Paper Cutting 四款；九款均有主图，无 imagePending 待补图，均有 Compatible Machine Brands、三项 Engineering Advantages 和双栏 FAQ。已完成事项不再作为待办重复提出：重载页改鳄鱼剪、三面切六组十八行、五组鳄鱼剪标准尺寸、两分类拆分、用户指定的产品删除、四列平铺、纸刀第二张技术图替换。
- 当前尺寸行数：剪板 8、鳄鱼剪 5、Scrap Chopper 6、Stationary 6；Paper Guillotine 8、Three-Knife 18、Paper Sheeter 6、Saddle Stitcher 5，共 62 行。Flying Shear 保持 Made to Drawing，无通用数值表；这是当前配置，不列作缺表错误。

### 分类 Hero 检查结果与建议（尚未实施）

- 本地 1440 / 768 / 390 px 比对 Slitter、Shredder、Shear、Paper。1440 px 下前三者 Hero 高 300 px，Paper 为 386.25 px：50 px 标题换两行，说明占三行，导致首屏明显加高。并非图片加载失败或整页横向溢出。
- Paper 没有专用横幅，当前回退使用 800 × 800 白底产品主图；背景 cover 放入 648 × 386 px 区域造成上下裁切，白底与蓝底渐变不协调。768 px 时文案宽度伸入图片渐变区，文字对比度下降。相同布局的文字／背景几何重叠也需作为共享模板问题检查。
- Shear 使用原 1920 × 800 长直刀组合横幅，1440 px 渲染正常；它偏剪板刀视觉，不能仅凭图片判断五款产品均被代表。是否换成已确认的剪板刀与废钢剪刀组合属于图片选择建议，不把现图认定为错误刀型。
- 建议延续参考分类的紧凑深蓝 Hero：文字与图片分离安全区域，长标题按完整词组换行，缩短可见说明而非直接更改 SEO 标题；Paper 使用已确认实拍的专用横幅构图，完整保留刀身，避免方形商品图直接 cover。Shear 可评估已确认的长刀与刀块组合。手机继续简洁文字首屏。
- 分类 Hero 当前虽是 WebP，但使用单一 CSS 背景资源，没有响应宽度候选；修改时应一起补齐并验证平板／桌面实际资源请求，手机隐藏的横幅不应下载。

### 剩余事项与优先级

| 优先级 / 范围 | 事项 | 当前决定 |
| --- | --- | --- |
| 近期页面修正 | 分类 Hero 的裁切、白底衔接、长标题节奏及平板文字安全区；分类卡片视觉效果进一步打磨 | Hero 为本次审查建议；四列平铺已完成，不重复列为待做 |
| 后续内容 / SEO | 产品采购名称、Title / H1 / 卡片与 FAQ 别名分工；以 paper cutter blade / paper guillotine knife 为候选 | 用户明确要求留待后续研究，不现在改标题 |
| Paper Guillotine 资料 | 原 Edge / Body Thickness 测量位置说明；已认可可支持的 POLAR 107 / 110 mm 宽度候选对应配置与孔型 | 用户最新决定为保留原八行；补说明或新行需另行逐款确认，不把保留值判错 |
| 可选规格扩展 | Alligator 的 Bronneberg A-600E 610 / 600 mm 差异；Flying Shear 的具体客户配置 | A-600E 未加入。Flying 按图定制可以保留；没有完整刀图时不补造标准尺寸 |
| 供货证据补充 | 新增配置的完整孔距／安装图、版本与刀位，以及 Sureay 材料、硬度、公差的内部凭据 | 按真实订单与图纸逐项补充；竞品配置不能直接证明全部机型适配。当前不恢复旧的宽泛精度、寿命承诺 |
| 发布前 | 完整现有语言产物的 301 / 410、静态 HTML、SEO、图片响应与内链门禁 | 本地检查不代替发布验收；此次不生成译文或发布 |

Three-Knife、Scrap Chopper、Guillotine、Stationary、Sheeter、Saddle Stitcher 的已批准修改没有发现尚未执行的产品页面项目。新增更多产品不是本轮必要待办；历史新闻中的库存／宽泛适配声明留到后续内容审查核对。

日期：2026-11-13。依据用户本轮指示：已能确认的内容按 Slitter、Shredder 标准实施；重载定位和冲突尺寸单独待确认；只改英文。

研究依据：[既有 Shear 报告](external-research-shear-blades-2026-11-11.md)，包含 11 月 13 日整类审查。本文记录实际实施及未实施项，不能把研究建议视为全部批准。

## 已实施

- 五个英文详情使用共享 detailLayout：桌面主图 480 × 480，右栏固定下移 32 px，简洁首屏、Technical Specifications、双栏 Technical FAQs / Why Choose Sureay、对应产品询价提示及现有内链。
- Guillotine、Paper Guillotine、Scrap Chopper 分别整理 8、8、6 行历史数值，按 Git `6e2e963` 原行保留尺寸与数量，没有用外部目录数字替换。Item No. 分别为 SR003201–208、SR003101–108、SR003301–306。型号适配仍按图纸核对；这些是保留的目录配置，不是新增 OEM 验证结果。
- 剪板表保留机器能力与数量，并说明机器能力不能唯一识别刀具。碎边表只列几何尺寸，不发布没有型号凭据的 Butech / duty 标签。纸刀保留原 Edge / Body Thickness 数值和列，说明截面及孔型须核对，没有加入新 POLAR 配置。
- 重载及三面切页原本没有数值表，本轮继续不输出争议配置，尺寸摘要使用 Made to Drawing。重载产品名、标题、描述、技术规格及原技术 FAQ 保持不变，补充的是通用版式、响应图片与询价资料说明。
- 五款原主图保留实际内容，另存英文使用的 800 px WebP 及 320/640 px 候选；技术区按原长宽比另存候选。原资产不覆盖，避免改变现有译文。分类卡片通过同一产品数据自动同步主图和尺寸摘要，分组、菜单名称及卡片布局未变。
- 金属／纸行业页只在英文运行时用相应 Shear 目录对象同步产品名称、描述与主图；移除英文输出中与详情不一致的旧产品描述。其他产品与非英文输出保持原逻辑。

## 图片候选，未替换重载页主图

用户源图：`C:/Users/liyuc/Documents/sureay/SureayBlades/shearbladephoto3.jpg`。四件刀具展示完整，比此前截断的照片适合作为候选。图像本身不证明设备适配。

采用内置图像编辑完成背景去除并保留透明通道；原 JPG 未覆盖。提示重点：只去桌面、投影及孔内背景，保留四件刀具轮廓、相对位置、孔数和金属表面；再清理边缘残留。不据生成图测量尺寸或确认刀型。

- 透明预览：[480 × 480 WebP](assets/shear-2026-11-13/shearbladephoto3-cutout-480w.webp)
- 同目录保存透明 PNG 和 320/640/800 px WebP。仅供用户审阅，未接入产品、菜单或分类卡片。原重载主图仍在页面使用。
- 原图较暗，自动抠图的细小孔边与轮廓仍须最终人工核对；本轮不将候选标为已验收产品实图。

## 待确认，不实施替换

| 项目 | 原记录／问题 | 所需确认 | 当前处理 |
| --- | --- | --- | --- |
| 重载产品定位 | 当前 Scrap & Plate；旧尺寸表说明偏 hydraulic guillotine，照片为长直刀 | 实际供货设备／工位、图号或原订单；是否确有废料剪刀块与刀组 | 定位不变，不新增或迁移产品 |
| 重载八行 | 七个具体尺寸及 Heavy Scrap Shear 定制行；6000 mm 单根能力和 100+ mm 厚度未核实 | 每行对应配置及制造记录 | 不重新发布为已确认尺寸 |
| 纸刀截面与宽度扩展 | 用户于 2026-11-13 批注“可支持”；候选 POLAR 宽 107/110 mm | 制造能力已确认；旧 Edge / Body Thickness 的测量位置及具体机型孔型仍需分别说明 | 登记为可支持，后续逐款处理；本轮不替换页面数值 |
| 材料、硬度、公差及适配品牌 | 历史记录包含待核参数和牌号等同写法 | 材质单、批准图纸、检验和供货记录 | 不据竞品能力填入 Sureay 参数 |
| 新增 Sheeter、菜单更名 | 研究建议，尚未批准 | 实际产品资料及业务决定 | 不新增页面、不改菜单或 URL |

## 本地验证

本轮追加确认（2026-11-13）：用户表示三面切刀目录配置“我们都可以做”，授权查找原厂或竞品尺寸；后续按一个产品一次沟通。制造能力不再重复提问。已核对 DIENES 印刷页 22、39、41 与 Kanefusa 页 22–23、33–34，形成六组候选（含版本、刀位、螺孔、来源和可信度），见[研究报告“三面切刀逐款补充”](external-research-shear-blades-2026-11-11.md#三面切刀逐款补充2026-11-13)。本次仅更新研究与任务单，未修改页面、图片、产品数据或语言文件。

- 类型检查通过；目录、分类迁移及退役检查 33 项通过，包含新增 SR003 唯一性与两款暂缓尺寸的断言，以及全部 Shear 图片宽高、WebP 和候选文件核对。
- 五详情和分类分别在 1440 / 390 px 检查；桌面五张主图实测 480 方形、右栏 margin-top 32 px，手机 288 方形；桌面加载 640w、手机加载 320w。未见整页横向溢出或图片 404。
- 两栏 FAQ 和展开交互、询价锚点均验证；手机三张表可横向滚动。早期检查脚本用单词 quotation 判断公司 FAQ，误报 Guillotine；已改为核对实际 Why Choose Sureay 栏并重新验证通过。
- 抽查 Slitter、Shredder、法语 Guillotine 及两个英文行业入口；本轮没有修改任何现有语言数据／词典文件，也没有生成译文。
- 未运行默认生产构建、多语言预渲染或发布；未提交真实询价。本地通过不代表未确认的规格或新图片已批准，也不代替上线门禁。

## 三面切六组规格已授权并实施（2026-11-13）

用户后续明确同意按六组规格修改，Item No. 沿用既有标准，只改英文。本节替代此前“三面切待确认、不输出数值表”的实施状态；历史冲突底稿仍保留在研究报告，不改写为已证实的旧型号归属。

| 目录机型／版本 | 前刀 Item No. | 左侧刀 Item No. | 右侧刀 Item No. | 依据 |
| --- | --- | --- | --- | --- |
| Müller Martini 3670 / 3672，New style | SR003401 | SR003402 | SR003403 | S18 p39；S30 p33 |
| Müller Martini 3671 Merit，Series 97 | SR003404 | SR003405 | SR003406 | S18 p39；S30 p34 |
| Müller Martini 3675 Orbit，Old style | SR003407 | SR003408 | SR003409 | S18 p41 |
| Müller Martini 3675 Orbit，New style | SR003410 | SR003411 | SR003412 | S18 p41 |
| Kolbus HD150，Old style | SR003413 | SR003414 | SR003415 | S18 p22；S30 p22–23 |
| Kolbus HD153 | SR003416 | SR003417 | SR003418 | S18 p22 |

- 六组各分前／左／右刀，合计 18 行，尺寸、螺孔与已查到的槽数按上文来源录入 `blades.ts`。未将孔数当孔距，未将有冲突的 OEM 件号写入 Sureay Item No.。相同外形但不同刀位／未证实共用的版本独立编号。
- 保留 Common Standard Dimensions，首列 Item No.；首屏和分类卡片的长度摘要为 392–585 mm，技术规格与 Product 结构化数据同步长 392–585、宽 90–115、厚 10–12 mm。表前说明按机型版本、刃口方向及完整孔槽图核对。
- 未改产品 URL、图片、其他产品数据或任何语言文件，没有生成其他语言版本。重载与纸刀其余事项仍按产品逐一沟通。
- 本轮类型检查通过，目录／分类迁移／退役测试共 33 项通过；Shear 编号覆盖检查由 22 行更新为 40 行，重载尺寸继续暂缓。
- 本地英文详情在 1440 / 390 px 验证：六组、18 个唯一编号、数值表、双栏 FAQ、询价锚点、canonical 与 JSON-LD 一致；手机表格可横向滚动，整页无横向溢出，分类卡片尺寸同步。浏览器未报脚本错误。
- 修改前后所有语言数据／词典文件哈希一致。未运行默认生产构建、翻译或发布。

## 纸刀品牌与工程区恢复（2026-11-13）

用户要求恢复 Compatible Machine Brands 与 Engineering Advantages，并结合产品和 SEO 调整。本次范围为正在逐款审阅的英文 `/products/paper-cutting-blades`；厚度定义仍在讨论，不改尺寸、编号、图片、URL、Title/H1 或其他产品。

- 原组件一直存在，缺失原因是纸刀记录没有 `compatibleMachines` / `components` 数据。恢复历史七品牌：Polar、Wohlenberg、Perfecta、Schneider Senator、Challenge、Prism、Seybold。增加该产品专用说明，要求完整机型、序列号和图纸匹配，不能只凭刀长判断品牌适配。共享组件只在产品提供说明时显示，现有译文没有新增说明。
- 三张卡片调整为 `HSS & carbide-tipped paper cutting knives`、`Bevel geometry for paper guillotine knives`、`Paper cutter blades matched to the drawing`。覆盖材质与纸张工况、刃角与裁切问题、孔型及安装匹配。旧文 3–5 倍寿命、Zero Paper Draw、≤0.05 mm 平面度、持有全部 OEM 图纸与 guaranteed drop-in fit 不原样恢复。
- 关键词依据现有产品定位和成熟刀具厂用词：paper guillotine knives / paper cutter blades 为主要意图，HSS / carbide-tipped / replacement 为具体选型词，品牌区承接品牌适配检索。没有本轮 GSC 查询数据，不宣称这些词有已验证搜索量或排名提升。名称解释继续留在 Technical FAQs，首屏没有增加长段落。
- 来源均访问于 2026-11-13：[TKM Paper Cutting Knives](https://www.tkmgroup.com/en/paper-cutting-knives) 的品牌、材质、刃角和精度主题；[Kanefusa Paper Guillotine Knife](https://www.kanefusa.net/en/products/81.html) 的 HSS / carbide 刃材及纸刀／三面切分工；[Jorson & Carlson 纸刀目录](https://www.jorsonandcarlson.com/products/bindery/paper_cutter_knives_and_accessories/paper_cutter.html) 及其 [Prism](https://www.jorsonandcarlson.com/products/bindery/paper_cutter_knives_and_accessories/new_guillotine_trimmer_knives/prism_paper_guillotine_knives.html)、[Seybold](https://www.jorsonandcarlson.com/products/bindery/paper_cutter_knives_and_accessories/new_guillotine_trimmer_knives/seybold_paper_guillotine_knives.html) 条目；[Challenge 原厂纸切机](https://www.challengemachinery.com/products/paper-cutters/heavy-duty)。来源证明市场用途与术语，不作为 Sureay 通用精度、寿命或全部型号适配证明。
- 相邻分类与纸行业仍承接纸张加工入口，三面切与卷材分切各自保持原产品定位。发现历史新闻仍有库存与宽泛适配等表述，留待文章单独核对，本次不扩改文章。
- 验收：类型检查及 33 项目录相关测试通过；英文 1440 / 390 px 均显示七品牌、三个工程卡片及询价入口，桌面三列／手机一列，整页无横向溢出。八行原表保留。抽查现有法语页未渗入新增英文说明；全部语言数据／词典文件哈希不变。未执行默认构建、翻译或发布，未将本地浏览器结果作为上线索引验收。

## 三面切区块补齐与纸刀保留决定（2026-11-13）

- 用户指出三面切仍缺两区块，已在英文三面切页补回 Compatible Machine Brands 和 Engineering Advantages。原六品牌恢复，说明尺寸表仅覆盖指定 Müller Martini / Kolbus 版本，其他品牌配置按完整型号与图纸核对。六组 18 行及 SR003401–418 原样保留。
- 工程三卡为前／左／右刀组匹配、HSS／硬质合金与书芯选型、书脊胶及墨迹积聚。没有恢复旧文 ±0.01 mm、零停机或镜面处理绝对防粘承诺。TKM three-way trimmer 产品说明支撑选题；Meccanotecnica 原厂 TRIMMING 页面确认该品牌确有三面切设备，品牌用途与 Sureay 逐机型适配证据分别记录。
- 类型检查及 33 项目录测试通过；1440 / 390 px 两区块、六品牌、三卡、18 行表格和 RFQ 通过，桌面三列／手机单列，无整页横向溢出。基线对比确认此次除三面切对象外所有产品数据不变，语言文件哈希不变。
- 用户再次确认：纸刀原尺寸先保留。后续厚度含义的讨论不构成替换或删除原八行的授权。
- 重载金属剪刀本轮仅审查，未修改产品定位、图片、尺寸、品牌或正文。逐项解释补入既有研究报告；下一步按实际设备用途确认归属，不直接用外部设备刀位替换 Sureay 产品。

## 用户确认板材剪刀归属及 Scrap Chopper 实图（2026-11-13）

> 历史讨论：关于第二款并入剪板页及“未确认鳄鱼剪供货”的判断，已被下文“第二款明确为鳄鱼剪刀片”中的用户更正和实施决定取代。Scrap Chopper 的卷材废边用途与图片决定仍有效。

- 用户确认 Guillotine Shear Blades 与 Heavy-Duty Metal Shear Knives 基本同款，既有重载图片全部用于板材。此前“可能属废钢剪”的推测已被此确认取代；不得继续把这些照片当废钢龙门剪／鳄鱼剪的供货凭据。
- 分类整理方向：将板材剪刀集中到 Guillotine Shear Blades，避免仅以 heavy-duty 建立重复产品意图。具体合并操作尚未执行；建议保留 `/products/guillotine-shear-blades`，若撤下英文 `/products/metal-shear-knives` 则须先落实 301、菜单／分类／相关推荐／行业页／文章内链及 sitemap、hreflang 更新。现有译文保留，不能把英文退役网址继续作为 hreflang 或 x-default。旧七行应逐配置迁入或标记，不因三个长宽厚相同就认定孔型相同、删除行或复用编号。
- 用户询问 Scrap Chopper 是否就是废钢龙门剪／鳄鱼剪。已复核其提供的 [KAMADUR META0004](https://www.kamadur.com/products/Scrap-chopper-knives-/META0004/)：正文 edge trim / waste strips，应用 Slitting lines / Coils / Strip steel。其别名包含 Scrap shear blades，不能据别名反向扩大用途。[独立 RECY0019](https://www.kamadur.com/products/scrap-shear-blades/recy0019/) 才描述废钢回收剪与 alligator shear blades。均访问于 2026-11-13。
- 用户随后明确新图 `C:/Users/liyuc/Documents/sureay/SureayBlades/Scrap Chopper Blades.jpg` 用于卷材生产线的废边碎断机。现已添加至英文 Scrap Chopper 首屏的第二张图片，原主图、技术图、六行尺寸及产品 URL 保持不变。图为车间实物照，保留拍摄场景及真实孔型，没有生成替代产品或据照片推算尺寸。
- 新资源 `scrap-chopper-blade-workshop.webp`（1000 × 487）及 320w/640w WebP；缩略图和选中图均有 srcset/sizes，固有尺寸按原比例声明。升级模板新增可选的 additionalHeroImages 数据，仅此产品启用；其他升级页面继续单主图。
- 类型检查、33 项目录测试通过；1440 / 390 px 实测点击第二图后加载 640w / 320w，展示框为 480 / 288 方形且等比例完整显示，可切回原图，无整页溢出。三面切单主图未变化，全部语言数据／词典文件哈希不变。未构建、翻译或发布。
- 尚未确认 Sureay 实际供应废钢龙门剪／鳄鱼剪配置，本轮不新增 Scrap Shear 产品，不把 Scrap Chopper 改写成该用途。

## Scrap Chopper 第二张补充实图（2026-11-13）

- 用户提供 `C:/Users/liyuc/Documents/sureay/SureayBlades/scrap-chopper-knives02.jpg`，作为英文 Scrap Chopper 首屏图库第三张图片，展示不同刀体和安装孔型。保留原拍摄背景与比例，未据图推算规格。
- 新增 `scrap-chopper-knives-samples.webp`（1920 × 1280）及 320w / 640w 资源，通过现有 additionalHeroImages 接入。原主图、技术图、六行尺寸和 URL 不变。
- 类型检查与 6 项产品目录测试通过；1440 / 390 px 验证第三图切换、480 / 288 px 方形展示框及 640w / 320w 实际加载，无整页横向溢出或脚本错误。语言文件哈希不变，未构建、翻译或发布。

## 第二款明确为鳄鱼剪刀片（2026-11-13，已实施）

- 用户先更正五刀图 `guillotine-shear-blades-04.webp` 用于鳄鱼剪，随后提供双刀实图；生产经理确认 shear knives 包括剪板机和鳄鱼剪。用户最终批准“第二款明确为鳄鱼剪，Shear 保持五款”，不再保留重复的通用 Shear 详情页，也不新增第六款。
- 沿用 `/products/metal-shear-knives`，英文名 Alligator Shear Blades、Title/H1 为 Alligator Shear Blades for Scrap Metal Recycling。没有新增 slug 或退役 URL，本轮无新增 301；canonical、既有译文路径保留。
- 更新描述、上下刀位置、几何与孔型、Technical FAQs、采购资料提示。别名与剪板／其他废钢剪的区别进入 FAQ；删除原板材混合用途和移动剪主刀／导向／穿刺刀位表述。两组用户确认照片继续使用，未改尺寸，仍为 Made to Drawing。历史七行与 Custom 行留在调研报告中，未认定原值错误或自动迁移。
- 英文分类与行业卡片从目录同步；分类金属组说明更新，仍为五张卡片。英文首页第二款图片改为目录中的鳄鱼剪实图并提供响应候选；页脚宽泛 Metal Shear Knives 入口指向 Shear 的 metal-shearing 区块。板材／卷材意图的相关推荐和正文链接改指 Guillotine；鳄鱼剪相关正文锚文本明确为 Alligator Shear Blades。其他语言文件与输出分支不改。
- 资料依据：本报告及 2026-11-11 调研；JMC McIntyre 900 原厂页 Technical Data、R.E.S. Model 1200 replacement blades 的 Description 支撑工位与多刃口选题。原厂单机刀长、四面刃等内容不推广为 Sureay 全系列规格或统一适配。
- 验收：类型检查、33 项目录／迁移测试通过；1440 / 390 px 检查 H1、Title、canonical、三层面包屑、Product 与分类五项 ItemList、480/288 px 主图及 640w/320w 加载、双栏 FAQ、首页／行业／页脚入口；无整页溢出和详情脚本错误。抽查既有法语页，全部语言数据和词典哈希不变。未默认构建、生成翻译或发布。
- 用户随后要求联网查尺寸：已记录六组完整刀身尺寸候选及 OEM 长度对照，详见既有调研报告最新补充。尚未授权把新候选写为 Sureay 标准尺寸，当前页面不发布这些候选或新 Item No.。

## 鳄鱼剪五组标准尺寸确认（2026-11-13，已实施）

用户回复“可作为标准尺寸，然后继续”，承接上一轮优先前五组、A-600E 差异待核的建议。本节替代鳄鱼剪 Made to Drawing 与候选未授权状态。

| Item No. | 机型参考 | 长 × 宽 × 厚（mm） | 来源记录 |
| --- | --- | --- | --- |
| SR003501 | JMC McIntyre 320 | 320 × 65 × 30 | STEINSTOSSER 28476，套装 518 |
| SR003502 | JMC McIntyre 407 | 407 × 64 × 32 | STEINSTOSSER 37332，套装 520 |
| SR003503 | JMC McIntyre 500 | 508 × 70 × 30 | STEINSTOSSER 46083，套装 521 |
| SR003504 | Bronneberg A-400 | 406 × 70 × 32 | STEINSTOSSER 33772，套装 538 |
| SR003505 | Bronneberg A-500PB | 500 × 70 × 32 | STEINSTOSSER 33773，套装 537 |

- `blades.ts` 新增 Common Standard Dimensions，首列 Item No.；表前提示核对机型版本、上下刀位置及完整孔型。用户认可配置不改变原证据等级：完整长宽厚仍为单一刀具厂来源，不表述为原厂图纸已核实。
- 首屏和分类卡片长度同步 320–508 mm，技术规格及 Product 数据为长 320–508、宽 64–70、厚 30–32 mm。不把这些包络范围解释成任意组合均为标准配置。
- A-600E 的 610/600 mm 差异继续待核，未加入、未分配编号。原重载历史尺寸仍留在研究报告；其他四款尺寸、图像及所有 URL 未改。
- 类型检查与 33 项目录测试通过；Shear 共 45 行已编号配置。桌面／手机检查五行、分类尺寸、五款 ItemList、主图、FAQ、面包屑、canonical 与行业／首页入口；现有法语页保持原输出，语言数据和词典哈希不变。未构建、翻译或发布。
- 下一款按 Scrap Chopper 继续审查，结论追加到既有调研，尚未替换其六行尺寸或技术图。

## Scrap Chopper 技术区与单图 Hero（2026-11-13，已实施）

- 用户批准技术图及技术内容后，进一步要求移除车间补图和 Hero 缩略图。英文首屏保留原单张主图；Technical Specifications 右侧使用最新 `scrap-chopper-knives02.jpg` 对应的 `scrap-chopper-knives-samples.webp`，提供 320w / 640w 响应图。此状态替代早先图库补图建议。
- 补充刀位、可用刃口、原机直刀／斜切及弧形或螺旋磨削配置核对、安装定位和切削方向；技术列表与产品结构化数据字段同步。新增崩刃原因 FAQ，保留原 Technical FAQs / Why Choose Sureay 双栏。
- 原六组尺寸及 SR003301–306、主图、URL 保留。只改英文目录数据，没有改写或生成其他语言版本。
- 类型检查及 33 项目录测试通过；1440 / 390 px 检查技术图实际加载 640w / 320w、无 Hero 缩略图和车间图、六行尺寸及编号不变、FAQ 展开及结构化数据同步，无横向溢出和脚本错误。语言文件哈希与本轮基线一致。未构建或发布。
- “Hero 暂用单张主图、不使用缩略图”已写入产品升级规范。下一款 Guillotine 的图片归属和套装数量定义仍需逐项审阅，本轮未改其内容。

## 五款品牌／工程区完整性与剪板机技术图（2026-11-13，已实施）

用户明确这两个 section 从未获准删除，要求全部恢复；同意替换剪板机技术图，数量不需要进一步合计。只改英文，分类拆分先分析。

- 五款均保留 Compatible Machine Brands / Engineering Advantages。纸刀、三面切原有区块不改；补齐 Guillotine、Alligator、Scrap Chopper 的缺失目录字段，每款三个针对工位的工程卡片。
- Guillotine 恢复历史十品牌，Scrap Chopper 恢复历史六品牌；名单来自本仓库 HEAD 的对应产品记录，不从竞品抄取。说明要求按完整机型、刀位和安装图核对，名单恢复不等于逐型号适配获得新的外部证明。Alligator 改用已获用户认可的五组配置对应 JMC McIntyre / Bronneberg；不把历史混合定位的板材设备品牌移入鳄鱼剪页。
- 工程内容分别覆盖：剪板上下刀／分段安装／板材工况；鳄鱼剪刀位／废料工况／可用刃口；碎边刀原刃型／安装方向／卷材工况。不恢复旧文绝对寿命、统一四刃或未经确认的精度承诺。
- 剪板技术图使用用户已批准的 `shearbladephoto3.jpg` 透明候选，复用已存在的 WebP，发布为 `guillotine-sheet-metal-knives.webp`（800 × 800）及 320w / 640w。仅替换技术图及对应 gallery 引用、alt、固有尺寸；主图保持原值。
- 原五款全部尺寸表、Item No.、数量、技术规格值、Hero、URL 不变。没有新增上下刀合计，也没有删除 Pcs / set。其他产品对象与本轮基线逐对象比对一致；其他语言文件哈希不变。
- 将两区块必须保留的要求写入升级模板，并新增 Shear 全部产品区块完整性和单图 Hero 回归检查。类型检查及 34 项目录测试通过；五详情在 1440 / 390 px 均显示两个区块及三张工程卡，技术图加载 640w / 320w，透明通道一致，未见横向溢出或脚本错误。分类五款入口与 ItemList 一致。未执行默认构建、翻译或发布。
- 分类复审意见追加到既有研究报告；当前仍是 Shear 五款和原两个内部组，未新增分类、调整菜单或迁移 URL。


## 金属剪刀 / 纸刀拆分与七款新增（2026-11-13，已实施）

此条替代此前“分类拆分先分析”的状态。用户已确认七款可制造并授权英文新增，Flying Shear 使用提供实拍；其余图片按最新回复先复核图库、缺图暂留待补。

- `/categories/shear-blades` 更名为 Metal Shear Blades，共七款：原 Guillotine、Alligator、Scrap Chopper，加 Stationary Scrap Shear、Mobile Scrap Shear、Cut-to-Length、Flying Shear。内部按板材 / 卷材 / 轧线和废钢回收两个工位组排列。
- 新增 `/categories/paper-cutting-knives`，五款：原 Paper Guillotine、Three-Knife，加 Paper Sheeter、Saddle Stitcher Trimmer、Rotary Trimmer。内部为纸堆 / 成张与印后修边两个组。
- 七款产品 URL：`/products/stationary-scrap-shear-blades`、`/products/mobile-scrap-shear-blades`、`/products/cut-to-length-shear-knives`、`/products/flying-shear-blades`、`/products/paper-sheeter-knives`、`/products/saddle-stitcher-trimmer-knives`、`/products/rotary-trimmer-knives`。
- 每款使用共享详情模板，含品牌区、三个工程优势、技术 FAQ 与公司 FAQ。首屏保持简洁、单图、尺寸 / 材料 / 用途与询价按钮。新增 27 行目录来源配置；CTL / Flying 未取得可靠完整刀体尺寸，使用 Made to Drawing，不编造尺寸或 Item No.。
- 新金属配置为 SR003601–606、SR003701–706；新纸刀为 SR004101–106、SR004201–205、SR004301–304。原五款合计 45 行尺寸与编号全部保留。本批两分类共 72 行配置。
- 基线逐对象比对：所有原产品仅两款纸刀的 category 字段变化，其余资料、图片、尺寸、编号、URL 不变。保留三面切与原纸刀文案。
- 英文桌面 / 手机菜单、产品筛选、纸业分类入口和页脚已接通新纸刀分类；两行业页 ItemList 从实际目录生成，待补图不作为 Product image。分类卡片与 ItemList 按相同产品顺序输出。
- 原 Shear URL 继续有效，不做整页 301；保留 `#paper-and-print-finishing` 的旧锚点及新分类链接。此前 Granulator / Custom 的 301 和 Cold Saw 410 规则不变。
- 图库复核及 27 行来源定位详见同目录 `external-research-shear-blades-2026-11-11.md` 新增末节。Flying 使用 WebP 600 / 480 / 320 三档。六款无已确认照片，保持 imagePending 待补图位；上线前须补齐，未用示意图或相似照片替代。
- 英文目录与分类新增已纳入语言边界：新八条路由仅英文，现有七种译文目录、产品与词典无改写。语言基线比较仅英文词典及目录测试文件变化。
- 验证：类型检查通过；36 项目录 / 分类迁移 / Cold Saw 测试通过；14 页 × 1440 / 390 px 检查，无脚本错误、横向溢出或坏图；12 款均显示品牌 / 工程区，主图 480 / 288 px。
- 临时目录前端打包通过，并从该打包结果渲染七个新产品和两个分类的英文 HTML，核对唯一 H1、canonical 与分类 ItemList 一致。sitemap 恰新增 8 个英文 URL，无删除或新增外语 URL。
- 未执行默认全站生产构建、翻译、PDF 生成或发布；未宣称完整上线门禁通过。现阶段交付本地检查，六款待补照片及正式发布前完整产物验证仍需完成。

- 补充交互验收：桌面和手机实际展开菜单均显示新纸刀分类；产品筛选准确显示五款；旧纸刀分类锚点可进入新分类；FAQ 展开和 RFQ 锚点正常。Flying 首屏实测桌面加载 480w、手机加载 320w。现有法语纸刀正常，新 Flying 法语地址显示 404，没有伪造译文。

## 分类提示句删除（2026-11-13）

按用户最新要求，删除英文 Metal Shear 分类的 “Looking for paper knives? See Paper Cutting & Trimming Knives.” 整句和该处链接。旧纸刀锚点保留在产品区容器，不占用独立文案或空白区块；其他分类入口、产品资料及语言内容不变。


## 删除两款并替换 Stationary 图片（2026-11-13，最新状态）

- 用户要求删除 Mobile Scrap Shear Blades 和 Cut-to-Length Shear Knives。已从英文 blades.ts 移除两对象，并清理分类分组、分类描述、相关推荐、英文限定产品清单及 sitemap；菜单和行业卡片随目录同步。Metal Shear 现为五款，纸刀仍为五款。
- 两个旧英文产品 URL（含 /en/ 别名、尾斜杠及查询参数）返回 HTTP 410，不误跳到不同产品；响应先于静态文件，残留旧 HTML 不能恢复页面。已加入发布路由门禁。开发环境对应详情显示 404。
- 保留 Stationary Scrap Shear Blades 的全部内容及六组 SR003601–606，采用用户指定 525x200x100-mm-knife.png。文件实际编码为 AVIF、1024 × 1024；保持原图内容、背景和已有标识，转换为 stationary-scrap-shear-blades.webp（800 × 800）及 480w / 320w。Hero、默认技术图、分类与相关推荐从同一目录图片字段读取。移除该产品 imagePending 标记，Product image 同步恢复真实资源。
- 已撤回的 Mobile 编号 SR003701–706 不重新分配。现两分类共有 66 行配置；本次新增批内剩余待补图为 Paper Sheeter、Saddle Stitcher、Rotary Trimmer 三款纸刀。
- 类型检查及 37 项目录 / 迁移测试通过；16 项真实 HTTP 检查确认 410、查询参数、/en/、尾斜杠和旧 HTML 优先级。1440 / 390 px 检查图片分别加载 480w / 320w，主图 480 / 288 px，无横向溢出，六行规格和五款分类卡正确；已删除产品的前端入口与关联链接无残留。
- 语言基线哈希不变，sitemap 仅减少指定两个英文产品 URL。未生成外语版本，未发布。


## Paper Sheeter 图片补齐（2026-11-13）

- 用户指定 Paper Sheeter Knives -01.jpg 为 Hero 并要求透明背景。已处理透明抠图，生成 paper-sheeter-knives-cover.webp（800 × 800）与 480w / 320w，保留实际 alpha；桌面显示 480 × 480，手机 288 × 288。Hero 只放单张，分类与相关卡片复用同一主图。
- 用户同时提供 Paper Sheeter Knives.jpg；按本次说明放入 Technical Specifications 右侧，保留车间场景与 680 × 1208 原比例，生成 paper-sheeter-knives-detail.webp 及 480w / 320w，记录准确固有尺寸与 alt。
- 移除 Paper Sheeter 的 imagePending，结构化数据同步主图与技术图。原六行尺寸、Item No.、技术内容、品牌、工程优势、FAQ、URL 均未改。未增加 Hero 缩略图。
- 类型检查与 37 项目录测试通过；桌面 / 手机核对两图加载、透明通道、规格行数、无横向溢出。目录基线比对只改变该产品图片字段，非英文资料与词典哈希不变。未翻译或发布。


## Saddle Stitcher 图片与 Rotary Trimmer 删除（2026-11-13，最新状态）

- Saddle Stitcher 首图采用用户指定 pl185371747-saddle_stitcher_trimmer_knives_stitcher_trimmer_knives_trimmer_knives.webp。用户进一步明确首图需要透明：完成透明抠图，发布 saddle-stitcher-trimmer-knives-cover-transparent.webp 及 480w / 320w，800 × 800，具有真实 alpha；使用新文件名避免旧不透明图片缓存。
- 第二张 trimmer_knives.webp 用于 Technical Specifications 右侧，按用户要求保留原背景，不抠图；保持原长宽比，发布 800 × 559 和 480w / 320w。Hero 保持单图，卡片同步首图，Product 结构化数据同步两张图片，删除该产品 imagePending。
- 原五组尺寸 SR004201–205、技术内容和 URL 保留。只更新英文图片字段及用户要求的退役产品关联链接。
- 用户同时要求删除 Rotary Trimmer Knives：移除目录对象、分类卡片 / 描述、相关推荐及 sitemap，菜单 / 行业入口随目录更新。Paper Cutting & Trimming 现四款；金属五款不变。两分类共有 62 行尺寸配置，已撤回 SR004301–304 不重新分配。
- /products/rotary-trimmer-knives 加入英文退役 URL 清单，旧地址及 /en/、尾斜杠 / 查询参数返回 410；发布门禁同步检查旧 HTML 优先级。未将其合并或重定向为 Slitter。
- 类型检查和 37 项目录测试通过；桌面 / 手机实际加载两张新图，首图 480 / 288 px，技术图原比例；六档 WebP 元数据检查通过，透明首图 alpha 已确认。24 项真实 HTTP 退役检查通过。非英文资料和词典哈希不变，sitemap 本轮只删除 Rotary 的英文 URL。未生成译文、PDF 或发布。
