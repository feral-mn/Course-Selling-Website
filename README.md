# 📚 Course-Selling-Website Backend

## Short Description
A **backend system** for a course-selling platform that supports **secure user authentication**, **role-based access control**, and **RESTful APIs** for managing courses, enrollments, and purchases.

---

## Overview
This backend powers a course-selling platform with multiple roles (**admin**, **instructor**, **user**). It is built using **Node.js**, **Express.js**, and **MongoDB (Mongoose)** with **JWT-based authentication** and **bcrypt** for password hashing.

---

## ✨ Features
- **Auth:** Register/Login with JWT, password hashing with bcrypt
- **RBAC:** Role-based access for admin, instructor, and user
- **Courses:** Create, update, list, and delete courses (role-restricted)
- **Enrollments:** Enroll/unenroll in courses, view enrolled courses
- **Purchases:** Purchase flow endpoints (placeholder if not implemented yet)
- **Validation & Errors:** Centralized error handling and request validation
- **Production Ready:** Environment variables, nodemon/dev scripts

---

## 🧰 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt
- **Dev Tools:** Nodemon, Postman/Insomnia for testing

---

## 🗂️ Suggested Folder Structure
```
course-selling-backend/
├─ src/
│  ├─ config/        # DB connection, env
│  ├─ controllers/   # Route handlers
│  ├─ middlewares/   # Auth, error handling
│  ├─ models/        # Mongoose schemas
│  ├─ routes/        # API routes
│  ├─ utils/         # helpers
│  └─ app.js
├─ .env
├─ package.json
└─ README.md
```

---

## 🔐 Environment Variables
Create a `.env` file in the project root:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

> Do **NOT** commit `.env`. Add it to `.gitignore`.

---

## 🚀 Getting Started

### 1) Clone & Install
```bash
git clone https://github.com/feral-mn/course-selling-backend.git
cd course-selling-backend
npm install
```

### 2) Run
```bash
# development
npm run dev

# production
npm run start
```

## 👤 Author
**Priyanshu Mall** — Dehradun, Uttarakhand, India  
GitHub: https://github.com/feral-mn
