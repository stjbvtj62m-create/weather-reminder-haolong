# Weather Reminder Haolong - Deployment Guide

## 🚀 快速部署到 Vercel

### 方法一：通过 Vercel 网站部署（推荐）

1. **访问 Vercel**  
   打开 https://vercel.com/

2. **登录/注册**  
   使用 GitHub 账号登录

3. **导入项目**  
   - 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"
   - 授权访问你的 GitHub 账号
   - 选择 `weather-reminder-haolong` 仓库

4. **配置项目**  
   - Project Name: `weather-reminder-haolong`
   - Framework Preset: 选择 "Other"
   - Build Command: 留空
   - Output Directory: 留空
   - Install Command: `npm install`

5. **部署**  
   - 点击 "Deploy" 按钮
   - 等待 1-2 分钟
   - 部署完成！你会得到一个 `https://weather-reminder-haolong.vercel.app` 形式的地址

---

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
cd weather-reminder-haolong
vercel --prod
```

---

## 🌐 部署后

部署完成后，你将获得：
- 📍 生产环境 URL: `https://your-project.vercel.app`
- 🔄 自动部署：每次 push 到 GitHub 都会自动更新
- 🌍 全球 CDN：全球访问速度快
- 🔒 免费 HTTPS：自动配置 SSL 证书

---

## 📝 其他部署选项

### Render.com
1. 访问 https://render.com/
2. 连接 GitHub 仓库
3. 选择 "Web Service"
4. Build Command: `npm install`
5. Start Command: `npm run server`

### Railway.app
1. 访问 https://railway.app/
2. "New Project" → "Deploy from GitHub repo"
3. 选择仓库
4. 自动检测 Node.js 并部署

---

## 🎯 推荐使用 Vercel

Vercel 最适合本项目，因为：
- ✅ 完全免费（个人项目）
- ✅ 部署简单（3 分钟完成）
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动从 GitHub 部署
- ✅ 支持自定义域名

---

**需要帮助？** 访问仓库获取更多信息：  
https://github.com/stjbvtj62m-create/weather-reminder-haolong
