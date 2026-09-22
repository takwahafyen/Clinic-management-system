# Clinic Management System

A web application for managing a clinic's patients, clients, doctors, nurses and pharmacists — covering registration, consultation reports, vital signs tracking and medication records. Built as a MERN stack app with role-based authentication.

## Table of contents

- [Architecture](#architecture)
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

## Tech stack

**Backend** (`backend/`)
- Node.js / Express
- MongoDB / Mongoose
- Auth: JWT (`jsonwebtoken`) + `bcryptjs` for password hashing
- `cors`, `cookie-parser`, `dotenv`

**Frontend** (`frontend/`)
- React 18 (Create React App)
- React Router v6
- Context API (one context per role: doctor / nurse / pharmacist)
- Sass for styling
- Axios for API calls

## Project structure

```
backend/
├── controllers/    # Business logic per entity (doctors, nurses, pharmacists, patients, clients, reports, VS, FC)
├── models/         # Mongoose schemas
├── routes/         # Express routes grouped by domain
├── utils/          # Utilities (error handling)
└── index.js        # Entry point, route mounting, MongoDB connection

frontend/
├── src/
│   ├── components/ # Reusable components (navbar, header, footer, cards...)
│   ├── pages/      # Feature pages (per-role signin/signup, records, reports...)
│   ├── context/    # State management per role (Context + Reducer + Actions)
│   └── App.js       # Route declarations
```

## Getting started

### Prerequisites
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
npm start                # starts the dev server on http://localhost:3000
```

## Environment variables

The backend requires a `.env` file (not versioned) based on [`backend/.env.example`](backend/.env.example). See that file for the full list of expected keys.

> The `.env` file must **never** be committed. If credentials have already leaked into git history, revoke and regenerate them before doing anything else.

## Roles and features

| Role | Main features |
|---|---|
| **Doctor** | Register/login, register patients, create consultation reports, view patient records |
| **Nurse** | Register/login, register patients, track vital signs (VS) |
| **Pharmacist** | Register/login, register clients, manage medication records (FC) |
| **Patient / Client** | Record accessible by the associated care staff |

Each role has its own authentication flow (`/doctor`, `/nurse`, `/pharmacist`) and its own dedicated area on the frontend.

## Tests

**Backend** (`backend/tests/`) — Jest + Supertest

```bash
cd backend
npm test
```

- `tests/unit/` — pure functions (e.g. error helper), no I/O
- `tests/integration/` — HTTP-level tests against the Express app (`app.js`) via Supertest. `app.js` exports the Express app with no side effects (no DB connection, no `listen()`), so it can be imported directly in tests; `index.js` remains the actual runtime entry point that connects to MongoDB and starts the server.
- Routes that hit MongoDB (register/login/...) still need a test database (e.g. `mongodb-memory-server`) before they can be covered — tracked in the roadmap below.

**Frontend** (`frontend/src/`) — React Testing Library (already wired via `setupTests.js`)

```bash
cd frontend
npm test
```

- Tests are colocated with the component they cover (`Component.jsx` + `Component.test.jsx`)

## Roadmap

- [x] Project README
- [x] `.env.example` and `.gitignore` (`.env`, `node_modules`, build artifacts excluded from git)
- [x] Test folder scaffolding (backend + frontend) with one passing example test each
- [ ] `mongodb-memory-server` (or equivalent) for DB-backed integration tests
- [ ] Full unit and integration test coverage of controllers/routes
