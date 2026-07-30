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

### Clone Repository

```bash
git clone https://github.com/yourusername/telecom-intelligence-platform.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

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