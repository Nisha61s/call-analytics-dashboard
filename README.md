# Telecom Intelligence Platform

A secure full-stack telecom analytics platform built using React, Node.js, Express, MongoDB, JWT Authentication, and Role-Based Access Control (RBAC).

This project was developed as part of the London Success Academy & PineVox Software Development Internship Program (Week 3 Assignment).

---

## Project Overview

The Telecom Intelligence Platform enables telecom analysts and administrators to securely access, analyze, and visualize Call Detail Record (CDR) data through a modern dashboard interface.

The application provides:

- Secure user authentication
- Role-based access control
- Telecom call analytics
- Data visualization
- Real-time API integration
- Pagination and filtering
- Search and sorting functionality

---

## Features

### Authentication & Security

- JWT Authentication
- Protected Routes
- Role-Based Access Control (RBAC)
- Secure Login System
- Password Encryption using bcrypt
- Session Management
- Logout Functionality

### Call Analytics Dashboard

- Total Calls
- Total Call Duration
- Total Call Cost
- Incoming vs Outgoing Call Distribution
- Top Callers Analysis
- City-based Analytics
- Call Activity Timeline

### Data Management

- Pagination
- Dynamic Filtering
- Search Functionality
- Sorting
- Real-time Data Fetching
- Error Handling
- Loading States

---

## Technology Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios
- React Router DOM
- Lucide React
- Date-fns

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

### Development Tools

- Visual Studio Code
- Postman
- Git
- GitHub

---

## System Architecture

Frontend (React)
        │
        ▼
REST API (Express.js)
        │
        ▼
Authentication Layer (JWT)
        │
        ▼
MongoDB Atlas Database

---

## Database

### Call Record Schema

```javascript
{
  callerName: String,
  callerNumber: String,
  receiverNumber: String,
  callType: String,
  callDuration: Number,
  callCost: Number,
  city: String,
  callStartTime: Date
}
```

---

## Authentication Flow

### Login

1. User enters credentials
2. Backend validates credentials
3. JWT token is generated
4. Token stored in localStorage
5. User redirected to dashboard

### Protected Routes

- Dashboard access requires valid JWT token
- Unauthorized users are redirected to Login

### Logout

- Token removed from localStorage
- User redirected to Login page

---

## API Endpoints

### Authentication

#### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "role": "admin"
}
```

---

### Call Records

#### Get Call Records

```http
GET /api/cdr
```

Query Parameters:

| Parameter | Description |
|------------|------------|
| page | Current page |
| limit | Records per page |
| city | Filter by city |
| callerNumber | Filter by caller |
| receiverNumber | Filter by receiver |
| startDate | Filter start date |
| endDate | Filter end date |
| sortBy | Sorting field |
| order | asc / desc |

Example:

```http
GET /api/cdr?page=1&limit=8&sortBy=timestamp&order=desc
```

---

### Analytics

#### Get Dashboard Analytics

```http
GET /api/cdr/analytics
```

Response:

```json
{
  "totalCalls": 10000,
  "totalDuration": 450000,
  "totalCost": 12500,
  "incomingCalls": 5200,
  "outgoingCalls": 4800
}
```

---

## Installation

## Github link

https://github.com/Nisha61s/call-analytics-dashboard

### Clone Repository

```bash
git clone https://github.com/yourusername/telecom-intelligence-platform.git
```

---

### Backend Setup

```bash
cd admin
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
npm install
npm run dev
```

---

## Vercel Frontend Deployment

Set this environment variable in Vercel Project Settings:

- `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api`

This project also includes `vercel.json` with SPA rewrites so direct route loads like `/login` resolve to the app instead of returning 404.

After setting env vars, redeploy in Vercel.

---

## Secure Render Deployment (Admin Backend)

The admin backend is configured for Render using `render.yaml` at the project root.

### 1) Create Render Service

- Connect this GitHub repository in Render.
- Create a new Web Service from blueprint (`render.yaml`).
- Confirm service root directory is `admin`.

### 2) Configure Secrets (Point 2)

Set these in Render Environment Variables (never commit them):

- `MONGODB_URI`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `CORS_ORIGINS`

Set this in GitHub Actions secrets:

- `RENDER_DEPLOY_HOOK_URL` (from Render deploy hook)

### 3) Environment File Safety (Point 3)

- `admin/.env` is ignored by Git.
- Use `admin/.env.example` as the template for local development.
- If any key was exposed before, rotate it in MongoDB/JWT providers.

### 4) Runtime Security (Point 4)

The backend now includes:

- CORS allowlist via `CORS_ORIGIN`/`CORS_ORIGINS`
- JWT secret enforcement (no insecure fallback secret)
- Auth protection on analytics routes
- Helmet security headers
- Auth rate limiting to reduce brute-force attempts

Render provides HTTPS termination for all deployed endpoints.

### 5) GitHub Security Governance (Point 5)

Repository automation added:

- Dependabot updates for `/` and `/admin`
- Dependency Review on pull requests
- CodeQL analysis on pushes and pull requests

Enable branch protection in GitHub settings for `main`:

- Require pull request before merge
- Require status checks to pass
- Block force pushes and deletions

### 6) Deployment Through GitHub Actions (Point 6)

Workflow `deploy-admin-render.yml` triggers Render deploys on `main` updates to backend files and uses only the deploy hook secret, avoiding long-lived cloud credentials.

---

## Project Structure

```text
project-root
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   ├── routes
│   └── App.jsx
│
├── screenshots
│   ├── login-page.png
│   ├── dashboard.png
│   ├── analytics.png
│   └── call-table.png
│
└── README.md
```

---

## Screenshots

### Login Page

(./screenshots/login-page.png)

### Dashboard Overview

(./screenshots/dashboard.png)

### Analytics Charts

(./screenshots/analytics.png)

### Call Records Table

(./screenshots/call-table.png)

### Sorting and Pagination

(./screenshots/sort.png)
(./screenshots/sort1.png)
(./screenshots/pagination.png)

---

##
Repository
---
## Future Enhancements

- CSV Export
- PDF Reports
- Advanced Search
- User Registration
- Refresh Tokens
- Dark/Light Theme Toggle
- Real-time Telecom Monitoring

---

## Assignment Deliverables

✔ Backend API Development

✔ JWT Authentication

✔ Role-Based Access Control

✔ Frontend Integration

✔ Analytics Dashboard

✔ Protected Routes

✔ Pagination

✔ Filtering

✔ Search

✔ Sorting

✔ Error Handling

✔ Loading States

---

## Author

**Nisha Sankaran**

Software Developer | React Developer | Full Stack Developer

London Success Academy & PineVox Internship Program