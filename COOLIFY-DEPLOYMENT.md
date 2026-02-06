# Coolify Deployment Guide

This guide will help you deploy the Shredder Blades website on Coolify.

## Prerequisites

- A Coolify instance (self-hosted or cloud)
- GitHub repository: `https://github.com/jianguo4/shredder-blades-website.git`
- Branch: `copilot/refactor-project-structure`

## Deployment Steps

### 1. Create New Resource in Coolify

1. Login to your Coolify dashboard
2. Click **"+ New"** → **"Resource"**
3. Select **"Public Repository"**
4. Choose **"GitHub"**

### 2. Repository Configuration

```
Repository URL: https://github.com/jianguo4/shredder-blades-website.git
Branch: copilot/refactor-project-structure
```

### 3. Build Configuration

Coolify will auto-detect this as a Node.js project. Configure:

**Build Pack:** `nixpacks` (auto-detected)

**Build Command:**
```bash
pnpm install && pnpm db:generate && pnpm build:full
```

**Start Command:**
```bash
pnpm start
```

**Port:** `3000`

### 4. Environment Variables

Add these environment variables in Coolify:

#### Required

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=file:/app/prisma/data/database.db
```

#### Email Configuration (Optional - for contact form emails)

```bash
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=contact@yourdomain.com
```

> **Note:** If you don't configure email, the contact form will still save submissions to the database, but won't send emails.

### 5. Persistent Storage (Important!)

To persist the SQLite database across deployments:

1. In Coolify, go to **Storage** section
2. Add a **Volume**:
   - **Source Path:** `/app/prisma/data`
   - **Name:** `database-storage`

This ensures your database (contacts, analytics) isn't lost on redeployment.

### 6. Health Check

Configure health check endpoint:

```
Health Check Path: /health
Health Check Method: GET
Health Check Interval: 30s
```

### 7. Domain Configuration

1. In Coolify, go to **Domains** section
2. Add your domain: `yourdomain.com`
3. Enable **Force HTTPS**
4. Coolify will automatically configure SSL with Let's Encrypt

## Database Initialization

**自动初始化**: 新的部署已经包含自动数据库初始化。容器启动时会自动：
1. 创建所需的数据库目录
2. 运行 Prisma 迁移
3. 如果迁移失败，自动执行 schema push 作为备选方案
4. 可选地为数据库添加种子数据

如果需要手动操作，可以在 **Terminal** 中运行：

### 检查迁移状态
```bash
pnpm db:migrate:status
```

### 手动运行迁移
```bash
pnpm db:migrate:prod
```

### 备选方案（如果迁移失败）
```bash
pnpm db:push
```

### 添加种子数据
```bash
pnpm db:seed
```

## Accessing Admin Panel

After deployment, access the admin dashboard at:

```
https://yourdomain.com/admin
```

Features:
- View contact form submissions
- Track page views and analytics
- Manage contact status (pending/replied/closed)
- View visitor statistics

## Troubleshooting

### Build Fails

If build fails, check:
1. Node.js version (should be 18+)
2. All environment variables are set
3. Build logs for specific errors

### Database Issues

If database doesn't persist:
1. Verify the volume is mounted to `/app/prisma/data`
2. Check file permissions
3. Restart the deployment

### Port Issues

If the app doesn't start:
1. Ensure PORT=3000 in environment variables
2. Check that the container is listening on 0.0.0.0, not localhost

## Project Structure for Coolify

```
/
├── client/              # Frontend (Vite + React)
├── server/              # Backend (Express + Prisma)
├── prisma/              # Database schema and migrations
│   └── data/           # SQLite database (mounted as volume)
├── shared/              # Shared types/validators
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Build configuration
```

## Build Process

1. **Install:** `pnpm install` - Installs all dependencies
2. **Generate:** `pnpm db:generate` - Generates Prisma client
3. **Build Frontend:** `vite build` - Builds React app to `dist/public`
4. **Build Backend:** `esbuild server/index.ts` - Bundles server to `dist/index.js`
5. **Start:** `node dist/index.js` - Runs production server

## Production Features

- ✅ Static frontend serving
- ✅ API endpoints at `/api/*`
- ✅ Admin panel at `/admin`
- ✅ SQLite database with Prisma
- ✅ Analytics tracking
- ✅ Contact form management
- ✅ Health check endpoint
- ✅ CORS configured

## Troubleshooting

### 数据库初始化问题

如果遇到 "No migration found" 错误：

1. **检查迁移文件**:
   ```bash
   ls -la /app/prisma/migrations/
   ```

2. **检查数据库连接**:
   ```bash
   echo $DATABASE_URL
   ls -la /app/prisma/data/
   ```

3. **手动初始化数据库**:
   ```bash
   # 方法 1: 强制推送 schema
   pnpm prisma db push --accept-data-loss
   
   # 方法 2: 重置迁移状态
   pnpm prisma migrate reset --force
   pnpm db:migrate:prod
   ```

4. **查看容器日志**:
   在 Coolify 的 "Logs" 部分查看详细错误信息

### 常见问题

**Q: 数据库文件丢失**
A: 确保在 Coolify 中配置了持久化存储卷 `/app/prisma/data`

**Q: 联系表单不工作**
A: 检查 `RESEND_API_KEY` 环境变量是否设置

**Q: 页面加载慢**
A: 检查健康检查和资源限制配置

**Q: 构建失败**
A: 确保使用 Node.js 20+ 和 pnpm 包管理器
- ✅ Error handling

## Need Help?

Check Coolify logs:
1. Go to your project in Coolify
2. Click **Logs** tab
3. View build and runtime logs

---

**Repository:** https://github.com/jianguo4/shredder-blades-website.git
**Branch:** copilot/refactor-project-structure
**Live Demo:** http://localhost:3000 (local dev)
