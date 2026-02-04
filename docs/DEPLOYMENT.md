# Deployment Guide

This guide covers various deployment options for the shredder-blades-website project.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Docker Deployment](#docker-deployment)
4. [Manual Deployment](#manual-deployment)
5. [PM2 Deployment](#pm2-deployment)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL/HTTPS Setup](#sslhttps-setup)
8. [Production Checklist](#production-checklist)

---

## Prerequisites

### Server Requirements
- **Node.js**: v20 or higher
- **pnpm**: 10.4.1 or higher (or use corepack)
- **Memory**: At least 1GB RAM (2GB+ recommended)
- **Disk Space**: At least 2GB free space

### Optional
- **Docker**: For containerized deployment
- **Nginx**: For reverse proxy (recommended)
- **PM2**: For process management (alternative to Docker)

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

### Required Variables

```env
# Server
PORT=3000
NODE_ENV=production

# CORS (comma-separated domains)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Optional Variables

```env
# Email Service (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
SMTP_TO=contact@yourdomain.com

# Frontend (if needed)
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
VITE_APP_ID=your-app-id
VITE_FRONTEND_FORGE_API_KEY=your-google-maps-api-key
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

---

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start the container:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop the container:**
```bash
docker-compose down
```

### Using Docker CLI

1. **Build the image:**
```bash
docker build -t shredder-blades-website .
```

2. **Run the container:**
```bash
docker run -d \
  --name shredder-blades \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  shredder-blades-website
```

3. **View logs:**
```bash
docker logs -f shredder-blades
```

4. **Stop the container:**
```bash
docker stop shredder-blades
docker rm shredder-blades
```

### Docker Image Optimization

The Dockerfile uses multi-stage builds to minimize image size:
- **Build stage**: Installs all dependencies and builds the project
- **Production stage**: Only includes production dependencies and built files

---

## Manual Deployment

### Step 1: Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Enable corepack for pnpm
sudo corepack enable
```

### Step 2: Clone and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/shredder-blades-website.git
cd shredder-blades-website

# Install dependencies
pnpm install --frozen-lockfile

# Create .env file
cp .env.example .env
# Edit .env with your values
nano .env
```

### Step 3: Build

```bash
# Build the project
pnpm build
```

This will:
1. Build the frontend (Vite) → `dist/public/`
2. Build the backend (esbuild) → `dist/index.js`

### Step 4: Run

```bash
# Start the server
NODE_ENV=production node dist/index.js
```

The server will run on the port specified in `.env` (default: 3000).

---

## PM2 Deployment

PM2 is a production process manager for Node.js applications.

### Install PM2

```bash
npm install -g pm2
```

### Create PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'shredder-blades',
    script: './dist/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions it provides
```

### PM2 Commands

```bash
# List all processes
pm2 list

# View logs
pm2 logs shredder-blades

# Restart
pm2 restart shredder-blades

# Stop
pm2 stop shredder-blades

# Delete
pm2 delete shredder-blades

# Monitor
pm2 monit
```

---

## Nginx Configuration

### Install Nginx

```bash
sudo apt install nginx -y
```

### Configure Nginx

Create `/etc/nginx/sites-available/shredder-blades`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Serve static files directly through Nginx
    # location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    #     proxy_pass http://localhost:3000;
    #     expires 1y;
    #     add_header Cache-Control "public, immutable";
    # }
}
```

### Enable the Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/shredder-blades /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)

1. **Install Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx -y
```

2. **Obtain SSL certificate:**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

3. **Follow the prompts** and Certbot will automatically configure Nginx for HTTPS.

4. **Test auto-renewal:**
```bash
sudo certbot renew --dry-run
```

### Manual SSL Configuration

If you have your own SSL certificates:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Production Checklist

Before deploying to production, ensure:

### Security
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins in `.env`
- [ ] Use HTTPS/SSL
- [ ] Keep dependencies updated (`pnpm update`)
- [ ] Don't commit `.env` file to version control
- [ ] Use strong passwords for any authentication

### Performance
- [ ] Enable Nginx caching for static assets
- [ ] Enable gzip compression
- [ ] Configure CDN if needed
- [ ] Monitor memory usage
- [ ] Set up log rotation

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure application monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

### Backup
- [ ] Set up automated backups
- [ ] Test backup restoration
- [ ] Document backup procedures

### Documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document rollback procedures

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# or
sudo netstat -tulpn | grep :3000

# Kill the process
kill -9 <PID>
```

### Permission Denied
```bash
# Give Node.js permission to bind to port 80
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install --frozen-lockfile
pnpm build
```

### Out of Memory
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

---

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/shredder-blades-website
            git pull
            pnpm install --frozen-lockfile
            pnpm build
            pm2 restart shredder-blades
```

---

## Support

For deployment issues:
1. Check server logs
2. Review Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. Check application logs: `pm2 logs` or `docker logs`
4. Verify environment variables are set correctly

For additional help, open an issue on the GitHub repository.
