# 🎁 Delibird Mart - Project Architecture & Folder Structure Overview

This document outlines the project layout, architecture, database configuration, and environment setup for **Delibird Mart**.

---

## 📁 1. Workspace Folder Structure

The root directory (`DelibirdMart/`) contains clean separation between the `Frontend` and `Backend` codebases:

```text
DelibirdMart/
├── Frontend/                 # React + Vite Client Application
│   ├── public/               # Static assets & web icons
│   ├── src/                  # Application source code
│   │   ├── api/              # Axios client (`axios.client.js`) & API helpers
│   │   ├── assets/           # Media assets & static imagery
│   │   ├── components/       # Reusable UI components (CartDrawer, ProductCard, etc.)
│   │   ├── context/          # React Context state management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Layout wrappers (`MainLayout.jsx`)
│   │   ├── pages/            # View pages (`HomePage.jsx`, `Marketplace.jsx`, etc.)
│   │   ├── routes/           # Routing configuration
│   │   └── utils/            # Utilities & mock product data
│   ├── .env                  # Frontend environment variables
│   ├── .env.example          # Template for frontend environment variables
│   ├── index.html            # Main HTML entry file
│   ├── package.json          # Frontend dependencies & scripts (`frontend`)
│   ├── package-lock.json     # Frontend package lockfile
│   ├── postcss.config.js     # PostCSS configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.js        # Vite build tool configuration
│
├── Backend/                  # Node.js + Express + MongoDB Server
│   ├── config/               # Database connection settings (`db.js`)
│   ├── controllers/          # Express request handlers (`health.controller.js`)
│   ├── middlewares/          # Error handlers & middleware
│   ├── models/               # Mongoose schemas & data models
│   ├── repositories/         # Database abstraction layer (`base.repository.js`)
│   ├── routes/               # API route definitions (`health.routes.js`)
│   ├── services/             # Business logic layer
│   ├── utils/                # Operational helpers (`appError.js`, `asyncHandler.js`)
│   ├── validators/           # Input validation middleware
│   ├── .env                  # Backend environment variables (MongoDB Atlas URI)
│   ├── .env.example          # Template for backend environment variables
│   ├── package.json          # Backend dependencies & scripts (`backend`)
│   ├── package-lock.json     # Backend package lockfile
│   └── server.js             # HTTP server entry point
│
├── node_modules/             # Monorepo dev dependencies (concurrently)
├── .gitignore                # Workspace git ignore configuration
├── package.json              # Monorepo root package.json for script orchestration
├── package-lock.json         # Root lockfile
├── plan.md                   # Development roadmap
├── README.md                 # Primary project documentation
└── PROJECT_STRUCTURE.md      # Architecture overview (This document)
```

---

## 🔐 2. Environment Variables & Database Configuration

### ⚙️ Backend Environment (`Backend/.env`)
- **Port**: `5000`
- **Environment**: `development`
- **MongoDB Atlas URI**: `mongodb+srv://<username>:<password>@mart.om38tez.mongodb.net/?appName=Mart`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@mart.om38tez.mongodb.net/?appName=Mart
```

### 🎨 Frontend Environment (`Frontend/.env`)
- **Vite Base API URL**: `http://localhost:5000/api/v1`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 🚀 3. Execution Commands

Execute commands from the workspace root directory:

### 🌟 Run Full Stack (Frontend + Backend Simultaneously)
```bash
npm run dev
```

### 🎯 Run Modules Separately

- **Backend Server Only**:
  ```bash
  npm run backend
  ```

- **Frontend Client Only**:
  ```bash
  npm run frontend
  ```
