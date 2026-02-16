---
layout: project
name: Burakorkmez Expo Ecommerce
slug: burakorkmez-expo-ecommerce
category: Platform -eCommerce
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/burakorkmez-expo-ecommerce/admin/public/screenshot-for-readme.png
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/burakorkmez-expo-ecommerce
indexed_content: "✨ Full-Stack E-Commerce App (Mobile + Admin + API) ✨ ✨ **Highlights:**
  - \U0001F4F1 Fully Functional E-Commerce Mobile App (React Native + Expo) - \U0001F510
  Secure Authentication with Clerk (Google & Apple sign-in) - \U0001F6D2 Cart, Favorites,
  Checkout & Orders Flow - \U0001F4B3 Stripe-Powered Payments - \U0001F5FA️ Addresses
  System - \U0001F3EA Admin Dashboard — Products, Orders, Customers & Stats - ⚙️ Complete
  REST API (Node.js + Express) with Auth & Roles - \U0001F6C2 Admin-Only Protected
  Routes - \U0001F4E6 Background Jobs with Inngest - \U0001F9ED Dashboard with Live
  Analytics - \U0001F6E0️ Product Management (CRUD, image handling, pricing, etc.)
  - \U0001F4E6 Order Management - \U0001F465 Customer Management Page - \U0001F6E1️
  Sentry Integration for monitoring & error tracking - \U0001F680 Deployment on Sevalla
  (API + Admin Dashboard) - \U0001F5BC️ Product Image Slider - ⚡ Data Fetching & Caching
  with TanStack Query - \U0001F9F0 End-to-End Git & GitHub Workflow (branches, commits,
  PRs, code reviews) - \U0001F916 CodeRabbit PR Analysis (security, quality, optimization)
  --- ## \U0001F9EA `.env` Setup ### \U0001F7E6 Backend (`/backend`) ```bash NODE_ENV=development
  PORT=3000 DB_URL= CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= INNGEST_SIGNING_KEY=
  CLOUDINARY_API_KEY= CLOUDINARY_API_SECRET= CLOUDINARY_CLOUD_NAME= ADMIN_EMAIL= CLIENT_URL=http://localhost:5173
  STRIPE_PUBLISHABLE_KEY= STRIPE_SECRET_KEY= STRIPE_WEBHOOK_SECRET= ``` --- ### \U0001F7E9
  Admin Dashboard (/admin) ```bash VITE_CLERK_PUBLISHABLE_KEY= VITE_API_URL=http://localhost:3000/api
  VITE_SENTRY_DSN= ``` --- ### \U0001F7E7 Mobile App (/mobile) ```bash EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
  SENTRY_AUTH_TOKEN= EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY= ``` ## \U0001F527 Run the
  Backend ```bash cd backend npm install npm run dev ``` --- ## \U0001F527 Run the
  Admin ``` bash cd admin npm install npm run dev ``` --- ## \U0001F527 Run the Mobile
  ``` bash cd mobile npm install npx expo start *And then scan the QR Code from your
  phone* ```"
---
{% raw %}
<h1 align="center">✨ Full-Stack E-Commerce App (Mobile + Admin + API) ✨</h1>

![Demo App](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/burakorkmez-expo-ecommerce/admin/public/screenshot-for-readme.png)

✨ **Highlights:**

- 📱 Fully Functional E-Commerce Mobile App (React Native + Expo)
- 🔐 Secure Authentication with Clerk (Google & Apple sign-in)
- 🛒 Cart, Favorites, Checkout & Orders Flow
- 💳 Stripe-Powered Payments
- 🗺️ Addresses System
- 🏪 Admin Dashboard — Products, Orders, Customers & Stats
- ⚙️ Complete REST API (Node.js + Express) with Auth & Roles
- 🛂 Admin-Only Protected Routes
- 📦 Background Jobs with Inngest
- 🧭 Dashboard with Live Analytics
- 🛠️ Product Management (CRUD, image handling, pricing, etc.)
- 📦 Order Management
- 👥 Customer Management Page
- 🛡️ Sentry Integration for monitoring & error tracking
- 🚀 Deployment on Sevalla (API + Admin Dashboard)
- 🖼️ Product Image Slider
- ⚡ Data Fetching & Caching with TanStack Query
- 🧰 End-to-End Git & GitHub Workflow (branches, commits, PRs, code reviews)
- 🤖 CodeRabbit PR Analysis (security, quality, optimization)

---

## 🧪 `.env` Setup

### 🟦 Backend (`/backend`)

```bash
NODE_ENV=development
PORT=3000

DB_URL=<YOUR_DB_URL>

CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

INNGEST_SIGNING_KEY=<YOUR_INNGEST_SIGNING_KEY>

CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>

ADMIN_EMAIL=<YOUR_ADMIN_EMAIL>

CLIENT_URL=http://localhost:5173

STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>

STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
```

---

### 🟩 Admin Dashboard (/admin)

```bash
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
VITE_API_URL=http://localhost:3000/api

VITE_SENTRY_DSN=<YOUR_SENTRY_DSN>
```

---

### 🟧 Mobile App (/mobile)

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY= <YOUR_CLERK_PUBLISHABLE_KEY>

SENTRY_AUTH_TOKEN=<YOUR_SENTRY_DSN>

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
```

## 🔧 Run the Backend

```bash

cd backend
npm install
npm run dev
```

---

## 🔧 Run the Admin

```
bash
cd admin
npm install
npm run dev
```

---

## 🔧 Run the Mobile

```
bash
cd mobile
npm install
npx expo start
*And then scan the QR Code from your phone*
```

{% endraw %}