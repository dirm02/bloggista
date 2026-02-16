---
layout: project
name: Hamzamix Loandash
slug: hamzamix-LoanDash
category: Serv&Prod-Tools
image: https://raw.githubusercontent.com/hamzamix/LoanDash/refs/heads/main/screenshots/homedark01.png
repo_url: https://github.com/hamzamix/LoanDash
indexed_content: "# LoanDash - Personal Debt and Loan Tracker \U0001F4B0 A modern,
  intuitive web application for tracking personal debts and loans ## \U0001F3AF About
  LoanDash LoanDash is a comprehensive personal finance tracking application designed
  to help you manage your financial obligations and assets with ease. Whether you're
  tracking money you've borrowed (debts) or money you've lent to others (loans), LoanDash
  provides an intuitive interface with powerful features to keep you organized and
  informed. Built with modern web technologies including **React 18**, **TypeScript**,
  **Tailwind CSS**, and **Node.js**, LoanDash offers a fast, reliable, and visually
  appealing experience. All your data is stored securely in a local JSON file with
  Docker volume persistence, ensuring privacy and data ownership without relying on
  third-party cloud services. ## ✨ Key Features ### \U0001F4CA **Dashboard & Analytics**
  - **Comprehensive Overview:** Visual dashboard with total debts, loans, and financial
  summaries - **Interactive Charts:** Recharts-powered visualizations for better financial
  insights - **Upcoming Payments:** Smart tracking of recurring payments and due dates
  - **Overdue Alerts:** Visual notifications for overdue items in the header ### \U0001F4B3
  **Debt & Loan Management** - **Flexible Tracking:** Support for various debt types
  (Bank Loans, Friend/Family Credit) - **Detailed Records:** Track amounts, due dates,
  descriptions, and interest rates - **Payment Logging:** Easy payment recording with
  visual progress indicators - **Recurring Payments:** Automatic handling of monthly
  subscriptions and recurring debts - **Auto-Archive:** Configurable automatic archiving
  of completed items ### \U0001F504 **Advanced Features** - **Real-time Updates:**
  Live data synchronization without page refreshes - **Interest Calculation:** Automatic
  monthly interest accrual for bank-type loans - **Smart Scheduling:** Next payment
  date calculation for recurring items - **Archive System:** Clean organization with
  completed/defaulted item archiving - **Data Export:** CSV export functionality for
  backup and analysis ### \U0001F3A8 **User Experience** - **Dark/Light Mode:** Comfortable
  viewing in any lighting condition - **Responsive Design:** Seamless experience across
  desktop, tablet, and mobile - **Search Functionality:** Quick filtering across all
  debt and loan records - **Accessibility:** ARIA-compliant interactive elements for
  better accessibility - **Multi-currency Support:** Dynamic currency display with
  user preferences ### \U0001F512 **Data & Security** - **Local Storage:** JSON file-based
  storage for complete data ownership - **Docker Persistence:** Secure volume mounting
  for data persistence - **Privacy First:** No cloud dependencies or third-party data
  sharing - **Backup Ready:** Easy data export and container-based deployment ## \U0001F4F8
  Screenshots Here's a preview of the LoanDash application: * [View More Screenshots](https://github.com/hamzamix/LoanDash/tree/main/screenshots)
  ## \U0001F680 Getting Started ### Prerequisites Before you begin, ensure you have
  the following installed: - **Git:** For cloning the repository - **Docker & Docker
  Compose:** For containerized deployment - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
  (Windows/macOS) - [Install Docker Engine](https://docs.docker.com/engine/install/)
  (Linux) - [Install Docker Compose](https://docs.docker.com/compose/install/) (Linux)
  ### \U0001F433 Docker Deployment (Recommended) The fastest way to get LoanDash running
  using the pre-built Docker image: 1. **Clone the Repository:** ```bash git clone
  https://github.com/hamzamix/LoanDash.git cd LoanDash ``` 2. **Alternatively:** you
  can manually download just the [docker-compose.yml](https://github.com/hamzamix/LoanDash/blob/main/docker-compose.yml)
  file if you prefer 3. **Start the Application:** ```bash docker-compose up -d ```
  This will: - Pull the latest `hamzamix/loandash` image from Docker Hub - Create
  a persistent volume `loandash-data` for data storage - Start the container on port
  8050 - Initialize the database at `/data/db.json` 4. **Access Your Application:**
  ``` http:// :8050 ``` ### \U0001F504 Updating the Application When new versions
  are available: ```bash cd /path/to/your/LoanDash docker-compose pull loandash docker-compose
  up -d --force-recreate ``` Your data will be preserved during updates thanks to
  Docker volume persistence. ### \U0001F6E0️ Development Setup For local development
  and testing: 1. **Install Dependencies:** ```bash npm install ``` 2. **Start Development
  Server:** ```bash npm run dev ``` Access at `http://localhost:5183` 3. **Build for
  Production:** ```bash npm run build ``` 4. **Start Production Server:** ```bash
  npm start ``` ## \U0001F3D7️ Architecture ### Technology Stack - **Frontend:** React
  18, TypeScript, Tailwind CSS, Vite - **Backend:** Node.js 20.12, Express 4.19.2,
  CORS - **Charts:** Recharts 2.12.7 - **Storage:** JSON file persistence - **Containerization:**
  Docker with multi-stage builds ### System Architecture - **Client-Server Pattern:**
  React SPA with Express API backen"
---
{% raw %}
# LoanDash - Personal Debt and Loan Tracker 💰

<p align="center">
  <img src="https://raw.githubusercontent.com/hamzamix/LoanDash/refs/heads/main/screenshots/logo.png" alt="LoanDash Logo">
</p>

<p align="center">
  <strong>A modern, intuitive web application for tracking personal debts and loans</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.2.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/docker-supported-blue.svg" alt="Docker">
  <img src="https://img.shields.io/badge/license-Apache%202.0-green.svg" alt="License">
</p>

## 🎯 About LoanDash

LoanDash is a comprehensive personal finance tracking application designed to help you manage your financial obligations and assets with ease. Whether you're tracking money you've borrowed (debts) or money you've lent to others (loans), LoanDash provides an intuitive interface with powerful features to keep you organized and informed.

Built with modern web technologies including **React 18**, **TypeScript**, **Tailwind CSS**, and **Node.js**, LoanDash offers a fast, reliable, and visually appealing experience. All your data is stored securely in a local JSON file with Docker volume persistence, ensuring privacy and data ownership without relying on third-party cloud services.

## ✨ Key Features

### 📊 **Dashboard & Analytics**
- **Comprehensive Overview:** Visual dashboard with total debts, loans, and financial summaries
- **Interactive Charts:** Recharts-powered visualizations for better financial insights
- **Upcoming Payments:** Smart tracking of recurring payments and due dates
- **Overdue Alerts:** Visual notifications for overdue items in the header

### 💳 **Debt & Loan Management**
- **Flexible Tracking:** Support for various debt types (Bank Loans, Friend/Family Credit)
- **Detailed Records:** Track amounts, due dates, descriptions, and interest rates
- **Payment Logging:** Easy payment recording with visual progress indicators
- **Recurring Payments:** Automatic handling of monthly subscriptions and recurring debts
- **Auto-Archive:** Configurable automatic archiving of completed items

### 🔄 **Advanced Features**
- **Real-time Updates:** Live data synchronization without page refreshes
- **Interest Calculation:** Automatic monthly interest accrual for bank-type loans
- **Smart Scheduling:** Next payment date calculation for recurring items
- **Archive System:** Clean organization with completed/defaulted item archiving
- **Data Export:** CSV export functionality for backup and analysis

### 🎨 **User Experience**
- **Dark/Light Mode:** Comfortable viewing in any lighting condition
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile
- **Search Functionality:** Quick filtering across all debt and loan records
- **Accessibility:** ARIA-compliant interactive elements for better accessibility
- **Multi-currency Support:** Dynamic currency display with user preferences

### 🔒 **Data & Security**
- **Local Storage:** JSON file-based storage for complete data ownership
- **Docker Persistence:** Secure volume mounting for data persistence
- **Privacy First:** No cloud dependencies or third-party data sharing
- **Backup Ready:** Easy data export and container-based deployment

## 📸 Screenshots

Here's a preview of the LoanDash application:

![LoanDash Home Page - Dark Mode](https://raw.githubusercontent.com/hamzamix/LoanDash/refs/heads/main/screenshots/homedark01.png)
![LoanDash Home Page - Dark Mode](https://raw.githubusercontent.com/hamzamix/LoanDash/refs/heads/main/screenshots/homedark02.png)

* [View More Screenshots](https://github.com/hamzamix/LoanDash/tree/main/screenshots)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git:** For cloning the repository
- **Docker & Docker Compose:** For containerized deployment
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop) (Windows/macOS)
  - [Install Docker Engine](https://docs.docker.com/engine/install/) (Linux)
  - [Install Docker Compose](https://docs.docker.com/compose/install/) (Linux)

### 🐳 Docker Deployment (Recommended)

The fastest way to get LoanDash running using the pre-built Docker image:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hamzamix/LoanDash.git
   cd LoanDash
   ```
   
2.  **Alternatively:**
   
    you can manually download just the [docker-compose.yml](https://github.com/hamzamix/LoanDash/blob/main/docker-compose.yml) file if you prefer

3. **Start the Application:**
   ```bash
   docker-compose up -d
   ```
   
   This will:
   - Pull the latest `hamzamix/loandash` image from Docker Hub
   - Create a persistent volume `loandash-data` for data storage
   - Start the container on port 8050
   - Initialize the database at `/data/db.json`

4. **Access Your Application:**
   ```
   http://<Your Server IP>:8050
   ```

### 🔄 Updating the Application

When new versions are available:

```bash
cd /path/to/your/LoanDash
docker-compose pull loandash
docker-compose up -d --force-recreate
```

Your data will be preserved during updates thanks to Docker volume persistence.

### 🛠️ Development Setup

For local development and testing:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5183`

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Start Production Server:**
   ```bash
   npm start
   ```

## 🏗️ Architecture

### Technology Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js 20.12, Express 4.19.2, CORS
- **Charts:** Recharts 2.12.7
- **Storage:** JSON file persistence
- **Containerization:** Docker with multi-stage builds

### System Architecture
- **Client-Server Pattern:** React SPA with Express API backend
- **File-Based Storage:** Lightweight JSON storage (`/data/db.json`)
- **Docker Containerization:** Optimized multi-stage builds with `su-exec` security
- **Volume Persistence:** Named Docker volumes for data durability

## 📁 Project Structure

```
LoanDash/
├── src/
│   ├── components/     # React UI components
│   ├── utils/         # Helper functions
│   └── types.ts       # TypeScript interfaces
├── public/            # Static assets (logo, etc.)
├── server.js          # Express backend
├── Dockerfile         # Multi-stage container build
├── docker-compose.yml # Container orchestration
└── package.json       # Dependencies and scripts
```

## ⚙️ Configuration

### Environment Variables
- `DATA_FILE_PATH`: Custom path for data file (default: `/data/db.json`)
- `PORT`: Server port (default: 3000)

### Docker Volumes
- `loandash-data:/data` - Persistent storage for application data

## 🐛 Troubleshooting

### Common Issues

**Port 8050 already in use:**
```bash
docker-compose down
# Check for conflicting services on port 8050
docker-compose up -d
```

**Data not persisting:**
- Ensure Docker volume `loandash-data` exists
- Check volume mounting in `docker-compose.yml`

**Application not loading:**
- Verify Docker container is running: `docker ps`
- Check container logs: `docker-compose logs loandash`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code standards and style guide
- Pull request process
- Issue reporting
- Feature requests

## 📝 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/hamzamix/LoanDash)
- [Docker Hub Image](https://hub.docker.com/r/hamzamix/loandash)
- [Issue Tracker](https://github.com/hamzamix/LoanDash/issues)
- [Release Notes](https://github.com/hamzamix/LoanDash/releases)

---

<p align="center">
  Made with ❤️ for better personal finance management
</p>

{% endraw %}