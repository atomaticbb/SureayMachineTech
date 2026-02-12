# 机械产品维护快速指南

> 📌 **仅需维护一个文件：** `client/src/data/machines.ts`

---

## ⚡ 快速操作

### 1️⃣ 添加新产品

打开 `client/src/data/machines.ts`，在数组末尾添加：

```typescript
{
  id: "新产品唯一ID",                        // 例如: "wc67y-500-6000"
  name: "WC67Y-500/6000",                   // 简短名称
  fullName: "WC67Y-500/6000 CNC Press Brake", // 完整名称
  category: "press_brake",                  // 类别（见下方）
  categoryDisplay: "Press Brake",
  tonnage: "heavy",                         // 吨位（见下方）
  image: "/images/products/新图片.webp",    // 图片路径
  badge: "新品上市",                         // 可选
  badgeColor: "blue",                       // 可选
  description: "产品描述文字...",
  link: "/products/详情页链接",
  specs: [
    { label: "规格1", value: "值1" },
    { label: "规格2", value: "值2" },
    { label: "规格3", value: "值3" },
    { label: "规格4", value: "值4" },
  ],
}
```

### 2️⃣ 修改现有产品

找到对应产品，直接修改字段值即可。

### 3️⃣ 删除产品

删除整个产品对象（包括大括号）。

---

## 📋 字段说明

### 必填字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `id` | 唯一ID（小写+连字符） | `"wc67k-400-4000"` |
| `name` | 简称 | `"WC67K-400/4000"` |
| `fullName` | 完整名称 | `"WC67K-400/4000 CNC Press Brake"` |
| `category` | 类别 | `"press_brake"` / `"shearing"` / `"rolling"` |
| `categoryDisplay` | 显示类别 | `"Press Brake"` |
| `tonnage` | 吨位 | `"light"` / `"medium"` / `"heavy"` |
| `image` | 图片路径 | `"/images/products/machinery_01.webp"` |
| `description` | 描述 | 50-120字符 |
| `link` | 详情链接 | `"/products/cnc-press-brake-400t"` |
| `specs` | 规格数组 | `[{ label: "...", value: "..." }]` |

### 可选字段

| 字段 | 说明 | 可选值 |
|------|------|--------|
| `badge` | 徽章文字 | "热卖"、"新品"、"推荐" 等 |
| `badgeColor` | 徽章颜色 | green / blue / red / slate / purple / orange / teal |

---

## 🎨 徽章颜色

```typescript
"green"   → 🟢 绿色 (畅销款)
"blue"    → 🔵 蓝色 (推荐)
"red"     → 🔴 红色 (热卖)
"slate"   → ⚫ 灰色 (重型/专业)
"purple"  → 🟣 紫色 (高级)
"orange"  → 🟠 橙色 (精选)
"teal"    → 🔷 青色 (旗舰)
```

---

## 📊 规格示例

### 折弯机
```typescript
specs: [
  { label: "Force", value: "400 Ton" },
  { label: "Length", value: "4000mm" },
  { label: "Controller", value: "Delem" },
  { label: "Axis", value: "4+1" },
]
```

### 剪板机
```typescript
specs: [
  { label: "Thickness", value: "12mm" },
  { label: "Length", value: "3200mm" },
  { label: "Motor", value: "45kW" },
  { label: "Type", value: "Hydraulic" },
]
```

### 卷板机
```typescript
specs: [
  { label: "Capacity", value: "30mm" },
  { label: "Width", value: "3000mm" },
  { label: "Motor", value: "37kW" },
  { label: "Type", value: "3-Roll" },
]
```

---

## ✅ 操作检查清单

添加产品后请检查：

- [ ] ID 唯一且小写
- [ ] category 拼写正确（press_brake / shearing / rolling）
- [ ] tonnage 拼写正确（light / medium / heavy）
- [ ] 图片文件已放入 `client/public/images/products/`
- [ ] specs 至少有 2 个参数
- [ ] 保存文件后刷新浏览器
- [ ] 产品正确显示
- [ ] 过滤功能正常

---

## ⚠️ 常见错误

### ❌ 分类拼写错误
```typescript
category: "Press Brake"     // 错误：应该是 press_brake
category: "press brake"     // 错误：没有下划线
category: "press_brake"     // ✅ 正确
```

### ❌ 图片路径错误
```typescript
image: "machinery_01.webp"              // 错误：缺少完整路径
image: "/images/products/machinery_01.webp"  // ✅ 正确
```

### ❌ 规格格式错误
```typescript
specs: "400 Ton, 4000mm"    // 错误：不是数组
specs: [                     // ✅ 正确
  { label: "Force", value: "400 Ton" },
  { label: "Length", value: "4000mm" },
]
```

---

## 📞 需要帮助？

**完整文档：** 查看 `MACHINE_MAINTENANCE_GUIDE.md`

**文件位置：**
- 数据文件：`client/src/data/machines.ts`
- 图片目录：`client/public/images/products/`

---

**最后更新：** 2024-02-10
