# Delibird Mart - Phase 1: Project Initialization & Foundational Architecture

## 1. Root Monorepo Setup
- Initialize root `package.json` with concurrent scripts to launch frontend and backend simultaneously.
- Set up workspace `.gitignore` file.

## 2. Backend Initialization (`server/`)
- Layered MVC Architecture + Repository Pattern setup.
- Dependencies: `express`, `mongoose`, `dotenv`, `cors`, `nodemon`.
- Directory Structure:
  - `config/`: Database connection (`db.js`)
  - `controllers/`: Request handlers (`health.controller.js`)
  - `models/`: Mongoose schemas and models
  - `routes/`: Express route definitions (`health.routes.js`)
  - `middlewares/`: Centralized error handler (`error.middleware.js`), 404 handler (`notFound.middleware.js`)
  - `validators/`: Input validation middleware schemas
  - `services/`: Business logic layer
  - `repositories/`: Database abstraction layer (`base.repository.js`)
  - `utils/`: `appError.js`, `asyncHandler.js`
- Entry Point: `server.js`

## 3. Frontend Initialization (`client/`)
- React + Vite + Tailwind CSS + Framer Motion + Axios + React Router DOM.
- Directory Structure:
  - `assets/`: Static assets & icons
  - `animations/`: Reusable Framer Motion variants
  - `components/`: UI components
  - `layouts/`: Master layouts (`MainLayout.jsx`)
  - `pages/`: Page views (`HomePage.jsx`)
  - `hooks/`: Custom React hooks
  - `context/`: Global React Context state
  - `api/`: Centralized Axios instance (`axios.client.js`)
  - `routes/`: Routing logic (`app.routes.jsx`)
  - `utils/`: Helper utilities

## 4. Verification & Testing
- Test `/api/health` API endpoint.
- Verify Vite dev server rendering placeholder Home Page.
