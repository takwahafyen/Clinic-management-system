# Clinic Management System

[![CI](https://github.com/takwahafyen/Clinic-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/takwahafyen/Clinic-management-system/actions/workflows/ci.yml)
[![CD](https://github.com/takwahafyen/Clinic-management-system/actions/workflows/deploy.yml/badge.svg)](https://github.com/takwahafyen/Clinic-management-system/actions/workflows/deploy.yml)

A web application for managing a clinic's patients, clients, doctors, nurses and pharmacists — covering registration, consultation reports, vital signs tracking and medication records. Built as a MERN stack app with role-based authentication.

## 🚀 Live Demo

- **Frontend (Web App)**: [clinic-management-system.vercel.app](https://clinic-management-system.vercel.app) *(or your specific Vercel URL)*
- **Backend API**: [clinic-management-backend-lpki.onrender.com](https://clinic-management-backend-lpki.onrender.com/health)

> **Test Credentials:**
> - **Doctor**: `ada@example.com` / `password123`
> - **Nurse**: `florence@example.com` / `password123`
> - **Pharmacist**: `marie@example.com` / `password123`
> - *(Passcode for new staff registration)*: set via environment variable.

## Table of contents

- [Live Demo](#-live-demo)
- [Architecture](#architecture)
- [Data model](#data-model)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Roles and features](#roles-and-features)
- [Tests](#tests)
- [Roadmap](#roadmap)

## Architecture

The project is split into two independent applications:

```
projet-gestion-clinique/
├── backend/     # REST API (Express + MongoDB)
└── frontend/    # Web client (React)
```

**Why separate the frontend and backend?**

- **Independent deployment**: the frontend (static build) can be deployed to a static host/CDN (Vercel, Netlify), while the backend (API + database access) goes to an application host (Render, Railway, a VPS) — each with its own release cycle, no cross-redeployment needed.
- **Security**: only the backend holds secrets (MongoDB URL, JWT signing key). The frontend only ever talks to the public API URL, never to the database directly.
- **Scalability**: the API can be horizontally scaled (multiple instances behind a load balancer) independently of the frontend.
- **Reusability**: the same API can serve multiple clients (the current web app, a future mobile app, third-party integrations) without duplicating business logic.
- **Clear ownership**: two `package.json` files, two dependency trees, two areas of responsibility — easier to evolve and onboard a developer onto a single side.

## Data model

### Users — Mongoose discriminators

All staff accounts share a single `users` collection via Mongoose discriminator inheritance:

```
User (base schema)
 ├── Doctor  (discriminator, role: "doctor")
 ├── Nurse   (discriminator, role: "nurse")
 └── Pharmacist (discriminator, role: "pharmacist")
```

Each sub-model adds its own fields (e.g. `specialization`) while inheriting common fields (`firstName`, `lastName`, `email`, `password`, `phone`, `role`). Querying `Doctor.find()` automatically scopes to `{ __t: "Doctor" }`, so existing controllers work unchanged.

### Patients & Clients — unified schema

`Patient` and `Client` share a single schema and a single `patients` collection. `Client.js` re-exports `Patient` — no data duplication. Fields include `dob` and `sex`, with a virtual `age` computed from `dob` at read time.

### Relations — ObjectId references

| Collection | New reference fields |
|---|---|
| `reports` | `patient: ObjectId → Patient`, `doctorId: ObjectId → User` |
| `vs` (vital signs) | `patient: ObjectId → Patient`, `nurseId: ObjectId → User` |
| `fc` (medication records) | `client: ObjectId → Patient`, `pharmacistId: ObjectId → User` |

Backward compatibility: `phoneNum: String` is preserved alongside the new ObjectId for existing records. GET endpoints use `$or` to handle both.

## Tech stack

**Backend** (`backend/`)
- Node.js / Express
- MongoDB / Mongoose
- Auth: JWT (`jsonwebtoken`) + `bcryptjs` for password hashing
- `cors`, `cookie-parser`, `dotenv`

**Frontend** (`frontend/`)
- React 18 (Create React App)
- React Router v6
- Context API — unified `AuthContext` (wraps the three legacy role contexts for backward compatibility)
- Sass for styling
- Axios for API calls (`withCredentials: true` set globally in `index.js`)

## Project structure

```
backend/
├── controllers/    # Business logic per entity (doctors, nurses, pharmacists, patients, clients, reports, VS, FC)
├── models/         # Mongoose schemas
│   ├── User.js         # Base discriminator model (all staff)
│   ├── Doctor.js       # Discriminator of User
│   ├── Nurse.js        # Discriminator of User
│   ├── Pharmacist.js   # Discriminator of User
│   ├── Patient.js      # Unified patient/client schema (dob, sex, virtual age)
│   ├── Client.js       # Re-exports Patient (same collection)
│   ├── Report.js       # References Patient + User
│   ├── VS.js           # References Patient + User
│   └── FC.js           # References Patient (Client) + User
├── routes/         # Express routes grouped by domain
├── middleware/     # verifyToken, verifyRole (JWT + RBAC)
├── utils/          # Utilities (error handling)
├── tests/
│   ├── unit/           # Pure functions and middleware (no I/O)
│   └── integration/    # HTTP-level tests (Supertest + mongodb-memory-server)
│       ├── doctorAuth.test.js
│       ├── nurseAuth.test.js
│       ├── pharmacistAuth.test.js
│       ├── protectedRoutes.test.js
│       ├── dataBugsAndFiltering.test.js
│       └── architectureAndRelations.test.js
└── index.js        # Entry point — MongoDB connection + server listen
   app.js          # Express app (no side-effects, importable in tests)

frontend/
├── src/
│   ├── components/ # Reusable components (navbar, header, footer, cards…)
│   ├── pages/      # Feature pages (per-role signin/signup, records, reports…)
│   ├── context/
│   │   ├── AuthContext.js      # Unified auth context (single reducer)
│   │   ├── Context.js          # Legacy doctor context (bridges AuthContext)
│   │   ├── NurseContext.js     # Legacy nurse context (bridges AuthContext)
│   │   └── PharmacistContext.js # Legacy pharmacist context (bridges AuthContext)
│   ├── config.js   # API_URL constant (reads REACT_APP_API_URL)
│   └── App.js      # Route declarations (React Router v6)
├── .env.example    # Template for frontend environment variables
└── public/
    └── assets/
        └── images/ # Static images (logo, hero, etc.)
```

## Getting started

### Quickstart with Docker (Recommended)

Run the full stack (Frontend + Backend + MongoDB) with a single command:

```bash
docker compose up -d --build
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `localhost:27017` (data persisted in a named Docker volume `mongo-data`)

To stop all containers:
```bash
docker compose down
```

---

### Manual Setup (Without Docker)

#### Prerequisites
- Node.js ≥ 20
- A MongoDB instance (Atlas or local)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in the real values
npm start               # starts with nodemon on the port set in .env
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set REACT_APP_API_URL to your backend URL
npm start               # starts the dev server on http://localhost:3000
```

## Environment variables

### Backend

The backend requires a `.env` file (not versioned) based on [`backend/.env.example`](backend/.env.example). See that file for the full list of expected keys.

### Frontend

The frontend requires a `.env` file (not versioned) based on [`frontend/.env.example`](frontend/.env.example):

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API, e.g. `http://localhost:5000` |

> The `.env` file must **never** be committed. If credentials have already leaked into git history, revoke and regenerate them before doing anything else.

## Roles and features

| Role | Main features |
|---|---|
| **Doctor** | Register/login/logout, register patients, create consultation reports, view patient records, update own account |
| **Nurse** | Register/login/logout, register patients, track vital signs (VS), update own account |
| **Pharmacist** | Register/login/logout, register clients, manage medication records (FC), update own account |
| **Patient / Client** | Record accessible by the associated care staff |

Each role has its own authentication flow (`/doctor`, `/nurse`, `/pharmacist`) and its own dedicated area on the frontend. All protected routes require a valid JWT cookie; role mismatches return HTTP 403.

## Tests

**Backend** (`backend/tests/`) — Jest + Supertest

```bash
cd backend
npm test
```

- `tests/unit/` — pure functions and middleware (error helper, JWT verification), no I/O
- `tests/integration/` — HTTP-level tests against the Express app (`app.js`) via Supertest. `app.js` exports the Express app with no side effects (no DB connection, no `listen()`), so it can be imported directly in tests; `index.js` remains the actual runtime entry point.
- DB-backed routes use an in-memory MongoDB via [`mongodb-memory-server`](https://github.com/typegoose/mongodb-memory-server) — no dependency on the real Atlas cluster.

| Test file | What it covers |
|---|---|
| `unit/error.test.js` | Error helper utility |
| `unit/verifyToken.test.js` | JWT middleware |
| `unit/rateLimiter.test.js` | Brute-force rate limiting (HTTP 429 & RateLimit headers) |
| `integration/doctorAuth.test.js` | Doctor register / login / logout / update (incl. IDOR check) |
| `integration/nurseAuth.test.js` | Nurse register / login / logout / update (incl. IDOR check) |
| `integration/pharmacistAuth.test.js` | Pharmacist register / login / logout / update (incl. IDOR check) |
| `integration/protectedRoutes.test.js` | Route-level RBAC (401 without token, 403 on role mismatch) |
| `integration/dataBugsAndFiltering.test.js` | Per-patient VS/FC/Report filtering by phone |
| `integration/architectureAndRelations.test.js` | ObjectId references populated on GET |

**Frontend** (`frontend/src/`) — React Testing Library (already wired via `setupTests.js`)

```bash
cd frontend
npm test
```

Tests are colocated with the component they cover (`Component.jsx` + `Component.test.jsx`).

**End-to-End (E2E) Tests** (`frontend/cypress/`) — Cypress

```bash
cd frontend

# Interactive Cypress Test Runner (GUI)
npm run cypress:open

# Headless E2E Execution (CI/Terminal mode)
npm run test:e2e
```

| E2E Spec | What it verifies |
|---|---|
| `01-navigation.cy.js` | Public landing page, header, features, footer, About Us, Guidelines, responsive viewports |
| `02-authentication.cy.js` | Doctor login with form validation, API interception (`cy.intercept`), error alerts, logout and session reset |
| `03-route-protection.cy.js` | Route guards: redirects unauthenticated users to `/doctor/login`, `/nurse/login`, `/pharmacist/login`; allows authenticated access |
| `04-patient-registration.cy.js` | Doctor patient creation form, payload verification, redirection to patient dashboard, error handling |
| `05-nurse-and-pharmacist.cy.js` | Nurse & Pharmacist login flows, role-specific navigation to `/HomeNurse` and `/HomePha`, access to vital signs and medication records |

## Roadmap

- [x] Project README
- [x] `.env.example` (backend **and** frontend) and `.gitignore` (`.env`, `node_modules`, build artifacts excluded from git)
- [x] Test folder scaffolding (backend + frontend) with one passing example test each
- [x] JWT authentication with route-level role protection (RBAC)
- [x] Brute-force rate limiting on authentication routes (HTTP 429)
- [x] CI (GitHub Actions) running lint + tests on every push/PR
- [x] `mongodb-memory-server` for DB-backed integration tests
- [x] `POST /logout` endpoint for all three roles
- [x] Unified `User` model with Mongoose discriminators
- [x] Unified `Patient`/`Client` schema with virtual `age`
- [x] ObjectId relations on Report, VS, FC
- [x] Extend DB-backed integration tests to nurse and pharmacist flows
- [x] Comprehensive Cypress E2E automated test suite
- [x] Docker & Docker Compose containerization for single-command deployment
- [x] LICENSE (MIT)
- [x] Live deployment (backend on Render + frontend on Vercel) with automated CI/CD

## License

[MIT](LICENSE)
