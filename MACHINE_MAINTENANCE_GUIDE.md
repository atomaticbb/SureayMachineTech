# Machine Products Maintenance Guide

> **机械产品维护指南** - 用于管理和维护 MachineListPage 的产品数据

---

## 📋 目录

- [系统架构](#系统架构)
- [快速开始](#快速开始)
- [添加新产品](#添加新产品)
- [修改现有产品](#修改现有产品)
- [删除产品](#删除产品)
- [字段详细说明](#字段详细说明)
- [徽章样式参考](#徽章样式参考)
- [规格参数示例](#规格参数示例)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## 🏗️ 系统架构

### 文件结构

```
client/src/
├── data/
│   └── machines.ts              # 📊 机器数据源（唯一需要修改的文件）
├── components/
│   └── MachineCard.tsx          # 🎴 可复用的机器卡片组件
└── pages/
    └── MachineListPage.tsx      # 📄 机器列表页面（无需修改）
```

### 架构优势

- ✅ **单一数据源（Single Source of Truth）**：所有产品数据集中在 `machines.ts`
- ✅ **零代码重复**：一个组件自动渲染所有产品
- ✅ **类型安全**：完整的 TypeScript 类型检查
- ✅ **灵活的规格字段**：不同机器可以有不同的规格参数
- ✅ **自动过滤**：新产品自动支持类别和吨位筛选

---

## 🚀 快速开始

### 唯一需要维护的文件

```
📁 client/src/data/machines.ts
```

所有产品的添加、修改、删除都在这个文件中完成。**无需修改任何组件代码。**

---

## ➕ 添加新产品

### 步骤 1：打开数据文件

```bash
打开文件: client/src/data/machines.ts
```

### 步骤 2：在 `machines` 数组中添加新对象

```typescript
export const machines: Machine[] = [
  // ... 现有产品 ...

  // 🆕 添加新产品
  {
    id: "wc67y-500-6000",                           // 唯一ID（小写，用连字符）
    name: "WC67Y-500/6000",                          // 简短名称
    fullName: "WC67Y-500/6000 CNC Press Brake",     // 完整名称
    category: "press_brake",                         // 类别（见下方说明）
    categoryDisplay: "Press Brake",                  // 显示用类别名称
    tonnage: "heavy",                                // 吨位级别（见下方说明）
    image: "/images/products/machinery_05.webp",    // 产品图片路径
    badge: "New Release",                            // 可选：徽章文字
    badgeColor: "blue",                              // 可选：徽章颜色
    description: "Ultra-heavy CNC press brake with dual servo motors for extreme precision.",
    link: "/products/cnc-press-brake-500t",         // 详情页链接
    specs: [                                         // 规格参数数组
      { label: "Force", value: "500 Ton" },
      { label: "Length", value: "6000mm" },
      { label: "Controller", value: "Delem DA-66T" },
      { label: "Axis", value: "6+1" },
    ],
  },
];
```

### 步骤 3：保存文件

保存后刷新页面，新产品会自动显示。

---

## ✏️ 修改现有产品

### 示例：更新产品信息

```typescript
// 找到对应的产品对象
{
  id: "wc67k-400-4000",
  name: "WC67K-400/4000",
  fullName: "WC67K-400/4000 CNC Press Brake",
  category: "press_brake",
  categoryDisplay: "Press Brake",
  tonnage: "heavy",
  image: "/images/products/machinery_01_updated.webp",  // ✏️ 更新图片
  badge: "Top Rated",                                    // ✏️ 修改徽章
  badgeColor: "blue",                                    // ✏️ 修改颜色
  description: "【更新】企业级折弯机，配备最新 AI 辅助定位系统。", // ✏️ 更新描述
  link: "/products/cnc-press-brake-400t",
  specs: [
    { label: "Force", value: "400 Ton" },
    { label: "Length", value: "4200mm" },              // ✏️ 修改规格
    { label: "Controller", value: "Delem DA-66T" },   // ✏️ 升级控制器
    { label: "Axis", value: "6+1" },                   // ✏️ 增加轴数
  ],
},
```

---

## 🗑️ 删除产品

直接删除 `machines` 数组中对应的对象：

```typescript
export const machines: Machine[] = [
  // ❌ 删除这个对象
  // {
  //   id: "old-machine-to-remove",
  //   name: "Old Machine",
  //   ...
  // },

  { id: "wc67k-400-4000", ... },  // ✅ 保留
  { id: "qc11k-12-3200", ... },   // ✅ 保留
];
```

---

## 📖 字段详细说明

### 必填字段（Required）

| 字段名 | 类型 | 示例 | 说明 |
|--------|------|------|------|
| `id` | string | `"wc67k-400-4000"` | 唯一标识符，用于 React key，建议使用小写+连字符 |
| `name` | string | `"WC67K-400/4000"` | 产品简称，显示在卡片标题第一行 |
| `fullName` | string | `"WC67K-400/4000 CNC Press Brake"` | 完整产品名称 |
| `category` | `"press_brake"` \| `"shearing"` \| `"rolling"` \| `"other"` | `"press_brake"` | 产品类别，用于过滤功能 |
| `categoryDisplay` | string | `"Press Brake"` | 显示用的类别名称 |
| `tonnage` | `"light"` \| `"medium"` \| `"heavy"` | `"heavy"` | 吨位级别，用于过滤功能 |
| `image` | string | `"/images/products/machinery_01.webp"` | 产品图片路径（相对于 public 目录） |
| `description` | string | `"Robust torsion bar..."` | 产品描述，默认显示，鼠标悬停时被规格替换 |
| `link` | string | `"/products/cnc-press-brake-400t"` | 产品详情页链接 |
| `specs` | `MachineSpec[]` | `[{ label: "Force", value: "400 Ton" }, ...]` | 规格参数数组，鼠标悬停时显示 |

### 可选字段（Optional）

| 字段名 | 类型 | 示例 | 说明 |
|--------|------|------|------|
| `badge` | string | `"Best Seller"` | 徽章文字，显示在卡片左上角 |
| `badgeColor` | `"green"` \| `"blue"` \| `"red"` \| `"slate"` \| `"purple"` \| `"orange"` \| `"teal"` | `"green"` | 徽章颜色主题 |

### Category（类别）选项

```typescript
"press_brake"      // 折弯机、压力机
"shearing"         // 剪板机
"rolling"          // 卷板机
"other"            // 其他类型
```

### Tonnage（吨位）选项

```typescript
"light"    // 轻型：< 100T
"medium"   // 中型：100T - 300T
"heavy"    // 重型：> 300T
```

---

## 🎨 徽章样式参考

### 可用颜色及常见用途

| 颜色 | `badgeColor` 值 | 常见用途 | 效果预览 |
|------|-----------------|----------|----------|
| 绿色 | `"green"` | Best Seller, Eco-Friendly | 🟢 绿色徽章 |
| 蓝色 | `"blue"` | Popular, Recommended | 🔵 蓝色徽章 |
| 红色 | `"red"` | Hot Sale, Limited Offer | 🔴 红色徽章 |
| 灰色 | `"slate"` | Heavy Duty, Professional, New Arrival | ⚫ 灰色徽章 |
| 紫色 | `"purple"` | Advanced, Premium Tech | 🟣 紫色徽章 |
| 橙色 | `"orange"` | Featured, Special Edition | 🟠 橙色徽章 |
| 青色 | `"teal"` | Premium, Enterprise | 🔷 青色徽章 |

### 示例用法

```typescript
{
  badge: "Best Seller",
  badgeColor: "green",
}

{
  badge: "🔥 Hot Sale",
  badgeColor: "red",
}

{
  badge: "New 2024",
  badgeColor: "blue",
}
```

---

## 📊 规格参数示例

### 不同机器类型的 specs 示例

#### 折弯机（Press Brake）

```typescript
specs: [
  { label: "Force", value: "400 Ton" },
  { label: "Length", value: "4000mm" },
  { label: "Controller", value: "Delem DA-66T" },
  { label: "Axis", value: "6+1" },
]
```

#### 剪板机（Shearing Machine）

```typescript
specs: [
  { label: "Thickness", value: "12mm" },
  { label: "Length", value: "3200mm" },
  { label: "Motor", value: "45kW" },
  { label: "Type", value: "Hydraulic" },
]
```

#### 卷板机（Rolling Machine）

```typescript
specs: [
  { label: "Capacity", value: "30mm" },
  { label: "Width", value: "3000mm" },
  { label: "Motor", value: "37kW" },
  { label: "Type", value: "3-Roll" },
]
```

#### 冲床（Punching Machine）

```typescript
specs: [
  { label: "Capacity", value: "63 Ton" },
  { label: "Stroke", value: "80mm" },
  { label: "Table", value: "630×400mm" },
  { label: "SPM", value: "120/min" },
]
```

### 规格字段灵活性

✅ **支持任意数量的规格字段**（建议 2-4 个）
✅ **支持自定义 label 和 value**
✅ **不同产品可以有完全不同的规格**

---

## 💡 最佳实践

### 1. ID 命名规范

```typescript
✅ 推荐：小写 + 连字符
id: "wc67k-400-4000"
id: "qc11k-12-3200"

❌ 不推荐：大写、空格、特殊字符
id: "WC67K 400/4000"
id: "Machine#001"
```

### 2. 图片管理

```typescript
✅ 推荐：语义化命名
image: "/images/products/press-brake-400t.webp"
image: "/images/products/machinery_01.webp"

❌ 不推荐：无意义命名
image: "/images/products/IMG_1234.jpg"
image: "/images/products/photo.png"
```

**图片要求：**
- 格式：WebP（推荐）或 JPG/PNG
- 尺寸：建议 800×600px 或更高
- 背景：纯白或透明背景
- 位置：放在 `client/public/images/products/` 目录

### 3. 描述文案

```typescript
✅ 推荐：简洁、专业、突出卖点
description: "Robust torsion bar synchronization with high mechanical strength and precision control."

❌ 不推荐：过长、营销化、无实质内容
description: "这是一款非常好的机器，性能卓越，质量优秀，欢迎选购！！！"
```

**描述长度：** 50-120 个字符（中文 25-60 字）

### 4. 规格参数

```typescript
✅ 推荐：关键参数 + 统一单位格式
specs: [
  { label: "Force", value: "400 Ton" },      // 统一使用 "Ton"
  { label: "Length", value: "4000mm" },      // 统一使用 "mm"
]

❌ 不推荐：单位不统一、信息冗余
specs: [
  { label: "压力", value: "400吨" },         // 混用中英文
  { label: "Length", value: "4 meters" },    // 单位不统一
  { label: "备注", value: "请联系客服" },    // 非技术参数
]
```

### 5. 链接一致性

```typescript
✅ 确保 link 指向有效页面
link: "/products/cnc-press-brake-400t"  // 对应的详情页必须存在

✅ 使用统一的 URL 格式
/products/{product-type}-{main-spec}
```

### 6. 数据完整性检查

添加新产品后，务必检查：

- [ ] ID 是否唯一
- [ ] 图片文件是否存在
- [ ] 链接是否有效
- [ ] category 和 tonnage 是否正确（用于过滤功能）
- [ ] specs 数组是否有数据

---

## ❓ 常见问题

### Q1: 新添加的产品没有显示在页面上？

**检查清单：**
1. 确认文件已保存
2. 刷新浏览器（Ctrl + F5 强制刷新）
3. 检查浏览器控制台是否有错误
4. 确认 `category` 和 `tonnage` 拼写正确

### Q2: 产品可以显示，但过滤功能不工作？

**检查 category 字段：**
```typescript
✅ 正确：使用预定义的枚举值
category: "press_brake"

❌ 错误：自定义值
category: "Press Brake"  // 大小写错误
category: "pressbrake"   // 缺少下划线
```

### Q3: 图片无法显示？

**检查要点：**
```typescript
1. 图片路径是否正确？
   image: "/images/products/machinery_01.webp"

2. 文件是否存在？
   client/public/images/products/machinery_01.webp

3. 文件名大小写是否一致？
   Windows 不区分大小写，但 Linux 服务器区分
```

### Q4: 如何批量修改多个产品？

**使用编辑器的查找替换功能：**
```typescript
// 场景：批量更新图片路径
查找：  "/images/products/machinery.webp"
替换为： "/images/products/placeholder.webp"

// 场景：批量修改徽章颜色
查找：  badgeColor: "slate"
替换为： badgeColor: "blue"
```

### Q5: 可以添加超过 4 个规格参数吗？

**可以，但不推荐：**
```typescript
✅ 推荐：2-4 个关键规格
specs: [
  { label: "Force", value: "400 Ton" },
  { label: "Length", value: "4000mm" },
  { label: "Controller", value: "Delem" },
  { label: "Axis", value: "4+1" },
]

⚠️ 可以但布局可能拥挤：5-6 个规格
❌ 不推荐：超过 6 个（会超出显示区域）
```

**原因：** 卡片悬停区域高度固定（70px），显示过多参数会导致溢出。

### Q6: 如何调整产品显示顺序？

**直接调整数组顺序：**
```typescript
export const machines: Machine[] = [
  { id: "most-important", ... },      // 第1个显示
  { id: "second-important", ... },    // 第2个显示
  { id: "third", ... },               // 第3个显示
  // ...
];
```

产品按数组顺序从左到右、从上到下显示。

### Q7: TypeScript 报错怎么办？

**常见错误：**
```typescript
// 错误 1：缺少必填字段
❌ Property 'description' is missing
✅ 添加 description 字段

// 错误 2：类型拼写错误
❌ Type '"Press Brake"' is not assignable to type 'category'
✅ 使用 "press_brake" 而不是 "Press Brake"

// 错误 3：specs 格式错误
❌ Type 'string' is not assignable to type 'MachineSpec[]'
✅ 使用数组格式：[{ label: "...", value: "..." }]
```

---

## 📞 技术支持

### 相关文件路径

```
数据源文件:
  client/src/data/machines.ts

组件文件:
  client/src/components/MachineCard.tsx
  client/src/pages/MachineListPage.tsx

图片目录:
  client/public/images/products/
```

### 快速定位代码

```bash
# 搜索特定产品
grep -r "wc67k-400-4000" client/src/data/

# 验证所有产品 ID 唯一性
# 在 machines.ts 中搜索 'id:'，检查是否有重复
```

---

## 📝 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2024-02-10 | v1.0 | 初始版本，组件化架构重构完成 |

---

## ✅ 维护检查清单

添加/修改产品后，使用此清单验证：

- [ ] 所有必填字段已填写
- [ ] ID 在整个数组中唯一
- [ ] category 使用预定义枚举值（press_brake/shearing/rolling/other）
- [ ] tonnage 使用预定义枚举值（light/medium/heavy）
- [ ] 图片文件已上传到 `client/public/images/products/`
- [ ] 图片路径拼写正确
- [ ] specs 数组至少有 2 个参数
- [ ] description 长度适中（50-120 字符）
- [ ] link 指向有效页面
- [ ] 页面刷新后产品正确显示
- [ ] 类别过滤功能正常工作
- [ ] 吨位过滤功能正常工作
- [ ] 无 TypeScript 报错
- [ ] 无浏览器控制台错误

---

**最后更新：** 2024年2月10日
**维护者：** Sureay 技术团队
**联系方式：** tech@sureay.com
