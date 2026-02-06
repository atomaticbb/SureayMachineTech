# 🚀 Coolify Quick Deployment Guide

## Repository Info
```
URL: https://github.com/jianguo4/shredder-blades-website.git
Branch: copilot/refactor-project-structure
```

## Coolify Configuration (Copy & Paste)

### Build Settings
```bash
# Build Command
pnpm install && pnpm db:generate && pnpm build:full

# Start Command
pnpm start

# Port
3000
```

### Environment Variables
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=file:/app/prisma/data/database.db
```

### Optional (Email)
```env
RESEND_API_KEY=your_key_here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=contact@yourdomain.com
```

### Volume Configuration
```
Source Path: /app/prisma/data
Name: database-storage
```

### Health Check
```
Path: /health
Method: GET
Interval: 30s
```

## After Deployment

1. **Initialize Database:**
   ```bash
   pnpm db:migrate:prod
   ```

2. **Access Admin Panel:**
   ```
   https://yourdomain.com/admin
   ```

3. **Test Contact Form:**
   ```
   https://yourdomain.com/contact
   ```

## Key Features
✅ Admin dashboard at `/admin`
✅ Contact form with validation
✅ Analytics tracking (page views, sessions)
✅ SQLite database (persisted via volume)
✅ Health check endpoint
✅ Auto SSL with Let's Encrypt

## Troubleshooting

**Build fails?**
- Check Node.js version (18+)
- Verify all env variables are set

**Database not persisting?**
- Ensure volume is mounted to `/app/prisma/data`
- Check permissions

**Contact form not working?**
- Submissions save to DB even without email config
- Check admin panel for submissions

---

**Full Guide:** See `COOLIFY-DEPLOYMENT.md`
