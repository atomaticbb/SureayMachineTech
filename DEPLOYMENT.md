# 部署指南

## ✅ 构建测试成功！

项目已成功构建，输出文件：
- **总大小**: ~3MB
- **构建输出**: `dist/public/`
- **图片资源**: 已优化（平均压缩率 95%）

---

## 🚀 快速部署到 Vercel

### 方式1：使用部署脚本（推荐）

#### Windows:
```bash
.\deploy-vercel.bat
```

#### Linux/Mac:
```bash
chmod +x test-build.sh
./test-build.sh
```

### 方式2：手动部署

#### 1. 登录 Vercel
```bash
cd d:\Business\Web3\Blades_Manus
pnpm vercel login
```

浏览器会打开，使用 **GitHub** 账号登录（推荐）

#### 2. 首次部署（预览环境）
```bash
pnpm vercel
```

根据提示回答：
- `Set up and deploy?` → **Y**
- `Which scope?` → 选择你的账号（回车）
- `Link to existing project?` → **N**
- `What's your project's name?` → 回车（默认：shredder-blades-website）
- `In which directory is your code located?` → **./**
- `Want to override the settings?` → **N**

等待部署完成，会得到预览地址：`https://xxx.vercel.app`

#### 3. 生产环境部署
```bash
pnpm vercel --prod
```

获得正式地址：`https://shredder-blades-website.vercel.app`

---

## 🧪 本地测试

### 测试构建和预览

#### Windows:
```bash
.\test-build.bat
```

#### Linux/Mac:
```bash
chmod +x test-build.sh
./test-build.sh
```

或手动执行：
```bash
# 1. 构建项目
pnpm run build

# 2. 预览构建结果
pnpm run preview
```

访问 `http://localhost:4173` 查看构建结果

---

## 📝 部署配置

### vercel.json 已配置：
- ✅ 构建命令: `pnpm run build`
- ✅ 输出目录: `dist/public`
- ✅ SPA 路由重写
- ✅ 安全头配置
- ✅ 图片缓存优化（1年）

### package.json 已更新：
- ✅ `build`: 只构建前端（用于 Vercel）
- ✅ `build:full`: 构建前端+后端（用于 Docker）

---

## 🔧 环境变量（可选）

如果需要配置分析服务，创建 `.env` 文件：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件填入相应的值。

---

## 📊 构建警告说明

构建时出现的警告：

### 1. 环境变量警告（可忽略）
```
%VITE_ANALYTICS_ENDPOINT% is not defined
%VITE_ANALYTICS_WEBSITE_ID% is not defined
```
**说明**: 分析服务的环境变量，不影响网站功能。

### 2. Chunk 大小警告（可忽略）
```
Some chunks are larger than 500 kB
```
**说明**: 打包后的 JS 文件较大，主要是因为引入了完整的 UI 组件库。
**影响**: 首次加载稍慢，但后续访问会被浏览器缓存。
**优化**: 可以后续通过代码分割优化（非必需）。

---

## ✨ 部署后功能

部署到 Vercel 后，您将获得：

- 🌐 **全球访问**: CDN 加速，全球快速访问
- 🔒 **自动 HTTPS**: 免费 SSL 证书
- 📱 **响应式设计**: 完美支持手机、平板、电脑
- ⚡ **懒加载优化**: 图片按需加载
- 🎨 **深色模式**: 自动跟随系统主题
- 📈 **实时统计**: Vercel 仪表板查看访问量
- 🔄 **自动部署**: 连接 GitHub 后推送代码自动部署

---

## 🎯 下一步

1. **测试本地构建**: 运行 `.\test-build.bat`
2. **部署到 Vercel**: 运行 `.\deploy-vercel.bat`
3. **获取分享链接**: 复制 Vercel 返回的 URL
4. **（可选）绑定域名**: 在 Vercel 仪表板配置自定义域名

---

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查以下几点：
1. 确保网络通畅（可能需要科学上网登录 Vercel）
2. 确保已安装 pnpm: `npm install -g pnpm`
3. 查看错误日志，搜索错误信息

### Q: 如何更新网站？
A: 修改代码后，再次运行：
```bash
pnpm vercel --prod
```

### Q: 如何查看访问统计？
A: 登录 Vercel 仪表板: https://vercel.com/dashboard

### Q: 可以绑定自己的域名吗？
A: 可以！在 Vercel 项目设置中添加自定义域名。

---

## 📞 技术支持

如有问题，请查看：
- Vercel 官方文档: https://vercel.com/docs
- Vite 构建文档: https://vitejs.dev/guide/
