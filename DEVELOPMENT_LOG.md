# Sureay Machinery — 开发日志与技术摘要

**生成日期：** 2026-03-04
**项目路径：** `d:\Business\SureayMachineTech\SureayMachineTech\`
**技术栈：** Node.js · Express · Prisma (SQLite) · React · Vite · TypeScript · Tailwind CSS · pnpm

---

## 目录

1. [工作阶段概览](#工作阶段概览)
2. [关键技术概念](#关键技术概念)
3. [涉及文件与代码](#涉及文件与代码)
4. [错误诊断与修复](#错误诊断与修复)
5. [待实施安全修复](#待实施安全修复)

---

## 工作阶段概览

### 阶段一：修复 Prisma 客户端生成问题

**症状：** `GET /api/admin/contacts` 返回 HTTP 500，错误信息：
```
Unknown field 'followUps'... Available: notes?
```

**根本原因：** 服务器运行时内存中加载的是旧版 Prisma 客户端（`ContactNote`/`notes` 时代）。`prisma generate` 因 Windows DLL 锁定（EPERM）无法完成替换。

**诊断过程：**
- 使用 `_check.mjs` 脚本检查 pnpm 隔离路径下的 `index.js` 内容
- 对比 ROOT 路径（21,088 bytes）与 pnpm 路径（25,735 bytes）
- 确认 `require('@prisma/client')` 输出的模型列表：`Product, Contact, FollowUp, Analytics, EmailLog` ✓
- 清除 3 个残留 `.tmp` 锁文件（`.tmp27392`、`.tmp27920`、`.tmp28436`）

**修复：** 客户端 JS 文件（`index.js`）已正确更新，重启 `pnpm dev` 服务器即可。

---

### 阶段二：CRM UX 四项核心升级（`Admin.tsx`）

实现以下四项功能：

| # | 功能 | 实现方式 |
|---|------|---------|
| 1 | 移动端优先主从布局 | 条件渲染 `cn()` + `ArrowLeft` 返回按钮（`md:hidden`） |
| 2 | UTF-8 BOM 防弹 CSV 导出 | `\uFEFF` + RFC 4180 引号转义 + `\r\n` 行分隔 |
| 3 | 分页 + "加载更多" | `isFirstPage` 条件替换/追加，`hasMore` 状态 |
| 4 | 跟进时间轴倒序 | `.sort((a,b) => Date(b) - Date(a))` |

---

### 阶段三：中文本地化 + 移除导航栏

变更内容：

- 移除 `Navbar` 导入和组件，移除 `pt-16`
- 命令栏升级为主头部，最左侧添加 `SUREAY OS` 品牌标识
- 所有 UI 文本汉化（zh-CN）
- 日期格式改为 24 小时制中文格式
- CSV 表头改为中文

---

### 阶段四：后端安全审计（只读报告）

对 9 个后端文件进行 SAST 审计，识别 13 项漏洞。**用户明确要求不修改任何代码，仅提供报告。**

---

## 关键技术概念

### Prisma Client 在 pnpm 下的路径

pnpm 的隔离 `node_modules` 结构导致生成路径为：
```
node_modules/.pnpm/@prisma+client@X.Y.Z_xxx/node_modules/.prisma/client/
```
而非标准的 `node_modules/.prisma/client/`。两个路径的 `index.js` 内容可能不同步。

### Windows DLL 锁 (EPERM)

Node 进程持有 `query_engine-windows.dll.node` 句柄时，`prisma generate` 无法完成重命名步骤。Prisma 6 的 query engine 是通用 SQL 执行器，schema awareness 在 JS 层实现，DLL 无需更新。

### React 双栏独立滚动布局

```
h-screen flex flex-col overflow-hidden
└── flex-1 min-h-0 (main area)
    ├── w-80 shrink-0 flex flex-col min-h-0 (left pane)
    │   └── flex-1 overflow-y-auto (scrollable list)
    └── flex-1 flex flex-col min-h-0 (right pane)
        └── ScrollArea flex-1 min-h-0 (scrollable detail)
```

### UTF-8 BOM 与 Excel 中文兼容

CSV 文件必须以 `\uFEFF`（UTF-8 BOM）开头，否则 Microsoft Excel 在 Windows 上无法正确识别中文字符。

---

## 涉及文件与代码

### `prisma/schema.prisma` — 最终版本

```prisma
model Contact {
  id             String     @id @default(cuid())
  name           String
  email          String
  phone          String?
  company        String?
  message        String
  inquiryType    String?
  attachmentName String?
  attachmentSize Int?
  status         String     @default("pending")
  source         String?
  ipAddress      String?
  userAgent      String?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
  followUps      FollowUp[]

  @@index([email])
  @@index([status])
  @@index([createdAt])
}

model FollowUp {
  id        String   @id @default(cuid())
  contactId String
  contact   Contact  @relation(fields: [contactId], references: [id], onDelete: Cascade)
  content   String
  type      String   @default("Internal") // Email | Call | Internal
  author    String   @default("Admin")
  createdAt DateTime @default(now())

  @@index([contactId])
  @@index([createdAt])
}
```

---

### `server/controllers/adminController.ts` — 关键模式

原子事务 + 类型安全常量校验：

```typescript
const VALID_STATUSES       = ['pending', 'replied', 'closed'] as const;
const VALID_FOLLOWUP_TYPES = ['Email', 'Call', 'Internal'] as const;

export const addFollowUp = async (req, res, next) => {
  const { id } = req.params;
  const { content, type, status } = req.body;
  const resolvedType = VALID_FOLLOWUP_TYPES.includes(type) ? type : 'Internal';

  const followUp = await prisma.$transaction(async (tx) => {
    const fu = await tx.followUp.create({
      data: { contactId: id, content: content.trim(), type: resolvedType },
    });
    if (status && VALID_STATUSES.includes(status)) {
      await tx.contact.update({ where: { id }, data: { status } });
    }
    return fu;
  });

  res.json({ success: true, data: followUp });
};
```

---

### `server/routes/admin.ts` — 路由保护

所有路由通过 `requireAuth` 中间件保护：

```typescript
router.use(requireAuth);
router.get('/contacts',                getContacts);
router.patch('/contacts/:id/status',   updateContactStatus);
router.post('/contacts/:id/followups', addFollowUp);
router.get('/analytics',               getAnalytics);
router.get('/statistics',              getStatistics);
```

---

### `client/src/pages/Admin.tsx` — 关键代码段

#### 域常量（中文标签）

```typescript
const FOLLOWUP_META: Record<FollowUpType, { label: string; cls: string }> = {
  Email:    { label: "邮件",   cls: "bg-blue-600 text-white" },
  Call:     { label: "电话",   cls: "bg-emerald-600 text-white" },
  Internal: { label: "内部",   cls: "bg-slate-500 text-white" },
};

const STATUS_META: Record<ContactStatus, { label: string; cls: string }> = {
  pending: { label: "待处理", cls: "bg-amber-500 text-black" },
  replied: { label: "已回复", cls: "bg-blue-600 text-white" },
  closed:  { label: "已归档", cls: "bg-slate-500 text-white" },
};

const INQUIRY_DISPLAY: Record<string, string> = {
  custom_oem:    "定制OEM",
  standard_part: "标准件",
  technical:     "技术支持",
};
```

#### 日期格式（zh-CN 24 小时制）

```typescript
function fmtDate(s: string) {
  return new Date(s).toLocaleString("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}

function fmtShort(s: string) {
  return new Date(s).toLocaleString("zh-CN", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}
```

#### CSV 导出（UTF-8 BOM + 中文表头）

```typescript
function exportToCSV(contacts: Contact[]) {
  const BOM = "\uFEFF"; // UTF-8 BOM — Excel 正确渲染中文字符必需

  const esc = (v: string | undefined | null): string => {
    if (v == null || v === "") return '""';
    return `"${String(v).replace(/"/g, '""')}"`;
  };

  const headers = ["姓名", "邮箱", "公司", "询盘类型", "内容", "状态", "提交时间"];

  const rows = contacts.map((c) => [
    esc(c.name),
    esc(c.email),
    esc(c.company),
    esc(c.inquiryType),
    esc(c.message),
    esc(c.status),
    esc(new Date(c.createdAt).toLocaleString("zh-CN", { hour12: false })),
  ].join(","));

  const csv = BOM + [headers.map((h) => `"${h}"`).join(","), ...rows].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `sureay-询盘报表-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

#### 分页逻辑

```typescript
const [page,        setPage]        = useState(1);
const [hasMore,     setHasMore]     = useState(false);
const [loadingMore, setLoadingMore] = useState(false);

const fetchContacts = useCallback(async (pageArg = 1) => {
  const isFirstPage = pageArg === 1;
  if (isFirstPage) setLoading(true);
  else             setLoadingMore(true);

  // ... fetch ...

  if (isFirstPage) setContacts(incoming);
  else             setContacts(prev => [...prev, ...incoming]);

  setHasMore(pagination.page < pagination.totalPages);
  setPage(pageArg);
}, [statusFilter, searchTerm]);

// 过滤条件变更时重置分页
useEffect(() => {
  setPage(1);
  setHasMore(false);
}, [statusFilter, searchTerm]);
```

#### 移动端主从面板切换

```tsx
{/* 左侧列表面板 — 选中记录后在移动端隐藏 */}
<div className={cn(
  "w-full md:w-80 shrink-0 border-r flex flex-col min-h-0",
  selectedId ? "hidden md:flex" : "flex",
)}>

{/* 右侧详情面板 — 无选中记录时在移动端隐藏 */}
<div className={cn(
  "flex-1 flex flex-col min-h-0",
  selectedId ? "flex" : "hidden md:flex",
)}>
```

#### 移动端返回按钮

```tsx
<button
  onClick={onBack}
  className="md:hidden shrink-0 mt-0.5 p-1 -ml-1 rounded hover:bg-primary-foreground/10 transition-colors"
  aria-label="返回列表"
>
  <ArrowLeft className="h-5 w-5" />
</button>
```

#### 时间轴倒序排列

```typescript
const sortedFollowUps = [...contact.followUps].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);
```

#### SUREAY OS 品牌标识

```tsx
<div className="font-black tracking-widest text-lg mr-6 shrink-0">
  SUREAY <span className="text-primary-foreground/50">OS</span>
</div>
```

---

## 错误诊断与修复

### 错误：HTTP 500 "Unknown field 'followUps'... Available: notes?"

| 步骤 | 内容 |
|------|------|
| **现象** | `GET /api/admin/contacts` 返回 500 |
| **错误文本** | `Unknown field 'followUps' for include, available: notes` |
| **根本原因** | 服务器内存中加载的是旧版 Prisma 客户端（schema 迁移前的 `ContactNote`/`notes` 关系） |
| **辅助原因** | Windows EPERM 导致 `prisma generate` 无法替换 `query_engine-windows.dll.node` |
| **诊断命令** | `node _check.mjs` — 对比两个路径下 `index.js` 的 `followUp`/`notes` 关键字和文件大小 |
| **修复** | 清除 3 个 `.tmp` 残留文件；重启 `pnpm dev`（服务器重新加载正确的 JS 客户端） |
| **验证** | `node -e "const {PrismaClient}=require('@prisma/client'); const p=new PrismaClient(); p.contact.findMany({take:1,include:{followUps:true}}).then(console.log)"` → 成功 |

---

## 待实施安全修复

安全审计识别了 13 项漏洞。以下为按优先级排列的修复清单。**均需用户确认后才执行代码变更。**

### 上线前必须修复

#### V-01 CRITICAL — 缺失 `helmet` 安全响应头

**位置：** `server/index.ts`

**风险：** 无 CSP、无 X-Frame-Options（点击劫持）、无 HSTS、无 X-Content-Type-Options（MIME 嗅探 XSS）

**修复：**
```bash
npm install helmet
```
```typescript
import helmet from 'helmet';
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", "data:"],
    },
  },
}));
```

---

#### V-02 HIGH — 登录接口无暴力破解限速

**位置：** `server/routes/auth.ts`

**风险：** 攻击者可无限次尝试密码

**修复：**
```bash
npm install express-rate-limit
```
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 10,
  message: { success: false, message: '尝试次数过多，请 15 分钟后重试' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginHandler);
```

---

#### V-03 HIGH — 文件上传仅校验扩展名，未验证 Magic Bytes

**位置：** `server/controllers/contactController.ts`

**风险：** 攻击者可将 `.exe` 重命名为 `.pdf` 绕过校验，上传恶意文件至邮件附件

**修复：**
```bash
npm install file-type
```
```typescript
import { fileTypeFromBuffer } from 'file-type';

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

// 在 multer 处理后
const detected = await fileTypeFromBuffer(file.buffer);
if (!detected || !ALLOWED_MIME_TYPES.has(detected.mime)) {
  return res.status(400).json({ success: false, message: '不支持的文件类型' });
}
```

---

#### V-04 HIGH — 邮件模板 HTML 注入

**位置：** `server/services/emailService.ts`

**风险：** 用户输入的 `name`/`company` 字段直接插入 HTML 邮件模板，可注入任意 HTML

**修复：**
```typescript
function escHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// 在模板中
const safeName    = escHtml(contact.name);
const safeCompany = escHtml(contact.company);
const safeMessage = escHtml(contact.message).replace(/\n/g, '<br>');
```

---

### 上线后第一周修复

#### V-05 HIGH — 分页 `limit` 参数无上界（DoS）

**位置：** `server/controllers/adminController.ts`

```typescript
const MAX_LIMIT = 100;
const limit = Math.min(parseInt(req.query.limit as string) || 50, MAX_LIMIT);
```

---

#### V-06 MEDIUM — Cookie `sameSite` 应为 `strict`

**位置：** `server/routes/auth.ts`

```typescript
res.cookie('adminToken', token, {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'strict',  // 改自 'lax'
  maxAge:   8 * 60 * 60 * 1000,
  path:     '/api/admin',
});
```

---

#### V-07 MEDIUM — 内存限速器不适用于多进程部署

**位置：** `server/routes/contact.ts`

PM2 cluster 模式下，每个 worker 维护独立计数器，实际速率限制为设定值 × worker 数。

**修复：** 使用 Redis 存储（`rate-limit-redis`），或部署单进程。

---

#### V-08 MEDIUM — 无邮件维度频率检查

**位置：** `server/controllers/contactController.ts`

**修复：** 24 小时内同一邮箱提交次数 ≤ 3：
```typescript
const recentCount = await prisma.contact.count({
  where: {
    email:     data.email,
    createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  },
});
if (recentCount >= 3) {
  return res.status(429).json({ success: false, message: '提交过于频繁，请 24 小时后重试' });
}
```

---

#### V-09 MEDIUM — `file.originalname` 未净化

**位置：** `server/controllers/contactController.ts`

```typescript
function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5._\- ]/g, '_')  // 仅保留安全字符
    .replace(/\.{2,}/g, '.')                              // 防路径遍历
    .slice(0, 200);                                       // 长度截断
}
```

---

#### V-10 MEDIUM — JSON Body 无显式大小限制

**位置：** `server/index.ts`

```typescript
app.use(express.json({ limit: '50kb' }));
```

---

#### V-11 MEDIUM — 登录时序旁路

**位置：** `server/routes/auth.ts`

用户名不存在时快速返回，密码错误时需等待 bcrypt 哈希比对，计时差异可被利用。

**修复：** 无论用户名是否存在，均执行 bcrypt 比对：
```typescript
const DUMMY_HASH = await bcrypt.hash('dummy', 10); // 应用启动时预生成

const user = await findUserByUsername(username);
const hashToCompare = user ? user.passwordHash : DUMMY_HASH;
const isMatch = await bcrypt.compare(password, hashToCompare);

if (!user || !isMatch) {
  return res.status(401).json({ success: false, message: '用户名或密码错误' });
}
```

---

### 低优先级

#### V-12 LOW — 错误处理器可能泄露堆栈信息

```typescript
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    success: false,
    message: isProd ? '服务器内部错误' : err.message,
    ...(isProd ? {} : { stack: err.stack }),
  });
});
```

---

#### V-13 LOW — 无蜜罐字段（防机器人）

在联系表单中添加隐藏字段（CSS `display:none`），机器人会填写，人工提交者不会：

```typescript
// 前端：<input name="website" style="display:none" tabindex="-1" autocomplete="off" />
// 后端：
if (req.body.website) {
  return res.status(200).json({ success: true }); // 静默丢弃，不告知攻击者
}
```

---

## 已正确实现的安全点

以下安全实践已正确实现，无需修改：

| 项目 | 实现位置 |
|------|---------|
| JWT 存于 `httpOnly` Cookie，防 XSS 窃取 | `server/routes/auth.ts` |
| Prisma 参数化查询，防 SQL 注入 | 全部 controller |
| `multer.memoryStorage()`，文件不落磁盘 | `server/routes/contact.ts` |
| 白名单 CORS（非 `*`） | `server/index.ts` |
| `requireAuth` 保护全部 admin 路由 | `server/routes/admin.ts` |
| bcrypt（cost factor 10）存储密码 | `server/routes/auth.ts` |
| 文件大小限制（10MB） | `server/routes/contact.ts` |
| MIME 类型白名单（基础扩展名） | `server/routes/contact.ts` |
| 会话到期：JWT `expiresIn: '8h'` | `server/routes/auth.ts` |
