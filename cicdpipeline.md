# CI/CD Pipeline for bloggista (Netlify)

## Overview
This document outlines the CI/CD pipeline for automatically deploying the Jekyll blog to **Netlify** using Git integration and GitHub Actions.

## Architecture

### Deployment: Netlify
- **Hosting**: Netlify (static site)
- **Repository**: https://github.com/dirm02/bloggista
- **Technology**: Jekyll static site generator

### Pipeline Flow
```
Local changes → git push → GitHub → Netlify (auto build & deploy)
                            ↓
                    GitHub Actions (build validation)
```

### Triggers
1. **Push to main branch** → Netlify auto-deploys + GitHub Actions validates build
2. **Pull Request** → GitHub Actions validates build (Netlify creates preview)
3. **Manual** → Redeploy from Netlify dashboard

---

## Step 1: Connect Repository to Netlify

### One-time setup

1. **Sign in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign in with your GitHub account

2. **Add new site**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** as the Git provider
   - Authorize Netlify to access your GitHub (if prompted)
   - Select **dirm02/bloggista** from the repository list

3. **Configure build settings** (Netlify auto-detects from `netlify.toml`)
   - **Build command**: `bundle exec jekyll build` (from netlify.toml)
   - **Publish directory**: `_site` (from netlify.toml)
   - **Base directory**: (leave empty - site is at repo root)
   - Click **Deploy site**

4. **Your site is live**
   - Netlify assigns a URL like `https://random-name-123.netlify.app`
   - Add a custom domain in **Domain settings** (optional)

---

## Step 2: Auto-Deployment (CI/CD)

Once connected, **every push to main** triggers:

1. **Netlify** → Builds Jekyll site → Deploys to production
2. **GitHub Actions** → Validates the build (catches errors early)

No manual steps required. Push and your site updates automatically.

---

## Local Development Workflow

```powershell
# 1. Make changes in your IDE
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog

# 2. Preview locally (optional)
bundle exec jekyll serve

# 3. Commit and push
git add .
git commit -m "Your commit message"
git push origin main

# 4. Netlify automatically deploys (usually within 1-2 minutes)
# Check status at: https://app.netlify.com
```

---

## Custom Domain (Optional)

1. In Netlify: **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `blog.yourdomain.com`)
4. Update DNS:
   - **For subdomain**: Add CNAME record pointing to `your-site.netlify.app`
   - **For apex domain**: Add A record to Netlify's load balancer IP
5. Netlify provides free SSL (HTTPS) automatically

---

## Configuration Files

| File | Purpose |
|------|---------|
| `netlify.toml` | Build command, publish directory, environment |
| `.github/workflows/deploy.yml` | Build validation on push/PR |
| `Gemfile` / `Gemfile.lock` | Ruby dependencies (required for Netlify) |

---

## Troubleshooting

### Build fails on Netlify

- **Check build logs**: Netlify dashboard → Deploys → Click failed deploy
- **Ruby version**: Ensure `RUBY_VERSION` in netlify.toml matches (3.2)
- **Gemfile.lock**: Must be committed (includes Linux platform for Netlify)

### Sync local with GitHub

```powershell
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog
git fetch origin
git pull origin main
```

### Repo not linked or different history

```powershell
# Check remote
git remote -v

# If wrong remote, update:
git remote set-url origin https://github.com/dirm02/bloggista.git

# If history differs, force push (use with caution - overwrites remote):
# git push origin main --force
```

---

## Quick Reference

| Action | Command / Location |
|--------|-------------------|
| Deploy | Push to `main` (automatic) |
| Build logs | [app.netlify.com](https://app.netlify.com) → Your site → Deploys |
| GitHub Actions | [github.com/dirm02/bloggista/actions](https://github.com/dirm02/bloggista/actions) |
| Local preview | `bundle exec jekyll serve` |
| Repo URL | https://github.com/dirm02/bloggista |
