# CI/CD Pipeline Plan for brutalist-blog

## Overview
This document outlines the CI/CD pipeline strategy for automatically deploying the Jekyll blog to Google Cloud VM (justblog.store) using GitHub Actions.

## Current Infrastructure
- **Hosting**: Google Cloud VM
- **Domain**: justblog.store
- **Web Server**: Nginx (port 4000)
- **Site Path**: `/home/mohamaddjamacorporation/corporation/blog/brutalist-blog/_site`
- **Technology**: Jekyll static site generator

## Pipeline Architecture

### Workflow Triggers
1. **Push to main/master branch** - Automatic deployment to production
2. **Pull Request** - Build and validate (optional: preview deployment)
3. **Manual workflow dispatch** - On-demand deployment

### Pipeline Stages

#### Stage 1: Build
- Checkout repository
- Set up Ruby environment
- Install dependencies (bundle install)
- Build Jekyll site (`bundle exec jekyll build`)
- Validate build output (_site directory)
- Create deployment artifact

#### Stage 2: Test (Optional but Recommended)
- Validate HTML structure
- Check for broken links
- Verify site configuration
- Run Jekyll build validation

#### Stage 3: Deploy
- Connect to Google Cloud VM via SSH
- Backup current deployment
- Upload new _site directory
- Verify deployment
- Reload/restart Nginx

#### Stage 4: Post-Deployment
- Health check (verify site is accessible)
- Notification (success/failure)

## Prerequisites

### 1. GitHub Secrets Configuration
The following secrets need to be configured in GitHub repository settings:

- `GCP_VM_HOST` - VM external IP or hostname
- `GCP_VM_USER` - SSH username (e.g., `mohamaddjamacorporation`)
- `GCP_SSH_PRIVATE_KEY` - Private SSH key for VM access
- `GCP_VM_DEPLOY_PATH` - Deployment path (e.g., `/home/mohamaddjamacorporation/corporation/blog/brutalist-blog`)
- `GCP_VM_ZONE` - VM zone (optional, if using gcloud CLI)

### 2. VM Preparation
- SSH key-based authentication set up
- User has write permissions to deployment directory
- Nginx configuration allows site updates
- Backup directory created (recommended)

### 3. SSH Key Setup
# On local machine, generate SSH key pair if not exists
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/gcp_vm_deploy

# Copy public key to VM
ssh-copy-id -i ~/.ssh/gcp_vm_deploy.pub USER@VM_IP

# Or manually add to ~/.ssh/authorized_keys on VM

---

## Step-by-Step Setup Guide (Console Commands)

### Step 1: Generate SSH Key Pair (Local Machine - PowerShell)

```powershell
# Navigate to your project directory
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog

# Generate SSH key pair (Windows PowerShell)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f $env:USERPROFILE\.ssh\gcp_vm_deploy

# When prompted:
# - Press Enter to accept default location
# - Press Enter twice for no passphrase (or set one if preferred)
```

**Output**: You'll get two files:
- `C:\Users\HPProdesk\.ssh\gcp_vm_deploy` (private key - KEEP SECRET)
- `C:\Users\HPProdesk\.ssh\gcp_vm_deploy.pub` (public key)

### Step 2: Display and Copy Public Key

```powershell
# Display the public key (copy this entire output)
Get-Content $env:USERPROFILE\.ssh\gcp_vm_deploy.pub
```

**Action**: Copy the entire output (starts with `ssh-ed25519`)

### Step 3: Add Public Key to Google Cloud VM

```powershell
# SSH into your VM (replace with your actual VM IP and username)
ssh mohamaddjamacorporation@YOUR_VM_IP

# Once connected to VM, run these commands:
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys

# In nano editor:
# 1. Paste the public key content you copied
# 2. Press Ctrl+O to save
# 3. Press Enter to confirm
# 4. Press Ctrl+X to exit

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys

# Exit VM
exit
```

### Step 4: Test SSH Connection

```powershell
# Test SSH connection with the private key (from local machine)
ssh -i $env:USERPROFILE\.ssh\gcp_vm_deploy mohamaddjamacorporation@YOUR_VM_IP

# If connection succeeds, verify deployment path exists
ls -la /home/mohamaddjamacorporation/corporation/blog/brutalist-blog

# Check Nginx status
sudo systemctl status nginx

# Exit VM
exit
```

### Step 5: Get Your VM Information

```powershell
# Get your VM's external IP (if you don't know it)
# Option 1: SSH into VM and run:
ssh mohamaddjamacorporation@YOUR_VM_IP
curl ifconfig.me
exit

# Note down these values:
# - VM IP: _______________
# - VM Username: mohamaddjamacorporation (or your actual username)
# - Deployment Path: /home/mohamaddjamacorporation/corporation/blog/brutalist-blog
# - VM Zone: _______________ (optional, e.g., us-central1-a)
```

### Step 6: Install GitHub CLI (if not installed)

```powershell
# Check if GitHub CLI is installed
gh --version

# If not installed, install via winget:
winget install --id GitHub.cli

# Or download from: https://cli.github.com/
```

### Step 7: Authenticate with GitHub CLI

```powershell
# Authenticate with GitHub
gh auth login

# Follow the prompts:
# - Choose GitHub.com
# - Choose HTTPS
# - Authenticate Git credential helper: Yes
# - Choose browser or token authentication
```

### Step 8: Navigate to Repository and Initialize (if needed)

```powershell
# Navigate to your project
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog

# If repository is not initialized, run:
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Verify remote
git remote -v
```

### Step 9: Create GitHub Secrets Using GitHub CLI

```powershell
# Make sure you're in the repository directory
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog

# Create GCP_VM_HOST secret (replace YOUR_VM_IP with actual IP)
gh secret set GCP_VM_HOST --body "YOUR_VM_IP"

# Create GCP_VM_USER secret
gh secret set GCP_VM_USER --body "mohamaddjamacorporation"

# Create GCP_VM_DEPLOY_PATH secret
gh secret set GCP_VM_DEPLOY_PATH --body "/home/mohamaddjamacorporation/corporation/blog/brutalist-blog"

# Create GCP_SSH_PRIVATE_KEY secret (reads the private key file)
$privateKey = Get-Content $env:USERPROFILE\.ssh\gcp_vm_deploy -Raw
gh secret set GCP_SSH_PRIVATE_KEY --body $privateKey

# Optional: Set zone if needed
gh secret set GCP_VM_ZONE --body "us-central1-a"

# Verify all secrets were created
gh secret list
```

### Step 10: Alternative - Create Secrets via GitHub Web Interface

If you prefer using the web interface instead of CLI:

1. **Go to your repository on GitHub**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO
   ```

2. **Navigate to Settings**
   - Click on **Settings** tab in your repository

3. **Go to Secrets and variables > Actions**
   - In left sidebar, click **Secrets and variables**
   - Click **Actions**

4. **Add each secret:**
   - Click **New repository secret** for each one:

   **Secret 1: GCP_VM_HOST**
   - Name: `GCP_VM_HOST`
   - Value: Your VM IP (e.g., `34.123.45.67`)

   **Secret 2: GCP_VM_USER**
   - Name: `GCP_VM_USER`
   - Value: `mohamaddjamacorporation`

   **Secret 3: GCP_VM_DEPLOY_PATH**
   - Name: `GCP_VM_DEPLOY_PATH`
   - Value: `/home/mohamaddjamacorporation/corporation/blog/brutalist-blog`

   **Secret 4: GCP_SSH_PRIVATE_KEY**
   - Name: `GCP_SSH_PRIVATE_KEY`
   - Value: Run this command to get the private key:
     ```powershell
     Get-Content $env:USERPROFILE\.ssh\gcp_vm_deploy
     ```
   - Copy the ENTIRE output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`)
   - Paste it in the secret value field

   **Secret 5: GCP_VM_ZONE (Optional)**
   - Name: `GCP_VM_ZONE`
   - Value: Your VM zone (e.g., `us-central1-a`)

### Step 11: Create GitHub Actions Workflow Directory

```powershell
# Make sure you're in the project root
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog

# Create .github/workflows directory
New-Item -ItemType Directory -Force -Path .github\workflows

# Verify it was created
Test-Path .github\workflows
```

### Step 12: Verify Everything is Set Up

```powershell
# Verify SSH key exists
Test-Path $env:USERPROFILE\.ssh\gcp_vm_deploy

# Verify GitHub CLI is authenticated
gh auth status

# Verify secrets are created
gh secret list

# Verify workflow directory exists
Test-Path .github\workflows
```

---

## Quick Reference: All Commands in One Place

```powershell
# ============================================
# STEP 1: Generate SSH Key
# ============================================
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog
ssh-keygen -t ed25519 -C "github-actions-deploy" -f $env:USERPROFILE\.ssh\gcp_vm_deploy

# ============================================
# STEP 2: Display Public Key (copy this)
# ============================================
Get-Content $env:USERPROFILE\.ssh\gcp_vm_deploy.pub

# ============================================
# STEP 3: Add Public Key to VM (SSH into VM first)
# ============================================
ssh mohamaddjamacorporation@YOUR_VM_IP
mkdir -p ~/.ssh && chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste public key, save (Ctrl+O, Enter, Ctrl+X)
chmod 600 ~/.ssh/authorized_keys
exit

# ============================================
# STEP 4: Test SSH Connection
# ============================================
ssh -i $env:USERPROFILE\.ssh\gcp_vm_deploy mohamaddjamacorporation@YOUR_VM_IP
exit

# ============================================
# STEP 5: Install GitHub CLI (if needed)
# ============================================
winget install --id GitHub.cli
gh auth login

# ============================================
# STEP 6: Create GitHub Secrets
# ============================================
cd C:\Users\HPProdesk\Desktop\NewSaaS\blog\brutalist-blog
gh secret set GCP_VM_HOST --body "YOUR_VM_IP"
gh secret set GCP_VM_USER --body "mohamaddjamacorporation"
gh secret set GCP_VM_DEPLOY_PATH --body "/home/mohamaddjamacorporation/corporation/blog/brutalist-blog"
$privateKey = Get-Content $env:USERPROFILE\.ssh\gcp_vm_deploy -Raw
gh secret set GCP_SSH_PRIVATE_KEY --body $privateKey

# ============================================
# STEP 7: Create Workflow Directory
# ============================================
New-Item -ItemType Directory -Force -Path .github\workflows

# ============================================
# STEP 8: Verify Secrets
# ============================================
gh secret list
```

---

## Troubleshooting Commands

### SSH Connection Issues

```powershell
# Check if key file exists
Test-Path $env:USERPROFILE\.ssh\gcp_vm_deploy

# Test with verbose output
ssh -v -i $env:USERPROFILE\.ssh\gcp_vm_deploy mohamaddjamacorporation@YOUR_VM_IP

# Check key permissions (Windows)
icacls $env:USERPROFILE\.ssh\gcp_vm_deploy
```

### GitHub CLI Issues

```powershell
# Check if GitHub CLI is installed
gh --version

# Re-authenticate
gh auth login

# Check current authentication
gh auth status

# List repositories
gh repo list
```

### Verify Secrets

```powershell
# List all secrets
gh secret list

# View a specific secret (shows only if it exists, not the value)
gh secret list | Select-String "GCP_VM"
```

### Test VM Connection from Local

```powershell
# Test SSH with key
ssh -i $env:USERPROFILE\.ssh\gcp_vm_deploy mohamaddjamacorporation@YOUR_VM_IP "ls -la /home/mohamaddjamacorporation/corporation/blog/brutalist-blog"

# Test if deployment path is writable
ssh -i $env:USERPROFILE\.ssh\gcp_vm_deploy mohamaddjamacorporation@YOUR_VM_IP "touch /home/mohamaddjamacorporation/corporation/blog/brutalist-blog/test.txt && rm /home/mohamaddjamacorporation/corporation/blog/brutalist-blog/test.txt && echo 'Write permission OK'"
```

---

## Next Steps

After completing these steps:
1. ✅ SSH key generated and added to VM
2. ✅ GitHub secrets created
3. ✅ Workflow directory created
4. ⏭️ Create the workflow file (`.github/workflows/deploy.yml`)
5. ⏭️ Commit and push to trigger first deployment
