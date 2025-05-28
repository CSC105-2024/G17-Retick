
# 🎓 G17-SYH

A full-stack web application for course and ticket management, built with React, Hono (Node.js), and SQLite. 🚀

---

## 🌐 Live URL

_Coming Soon_

---

## 📁 Clone the Repository

```bash
git clone https://github.com/CSC105-2024/G14-AI-Hub.git
cd G17-SYH
```

---

## ⚛️ Frontend - React

### 🛠 Tech Stack

- React
- Axios
- React Router DOM
- Tailwind CSS

### ▶️ Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔥 Backend - Hono + Node.js + TypeScript

### 🛠 Tech Stack

- Node.js
- Hono (TypeScript)
- SQLite
- Prisma ORM
- JSON Web Tokens (JWT)

### ▶️ Getting Started

```bash
cd backend
npm install
npm run dev
```

Server runs at [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### 👥 User Routes

| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| POST   | `/signup`                | Register a new user              |
| POST   | `/login`                 | Log in an existing user          |
| GET    | `/current`               | Get current user info *(auth)*   |
| POST   | `/logout`                | Log out a user                   |
| PUT    | `/update-phone`          | Update phone number              |
| PUT    | `/update-name`           | Update username                  |
| PUT    | `/update-profile`        | Update user profile *(auth)*     |
| DELETE | `/tickets/:ticketId`     | Delete a user's ticket           |
| GET    | `/sold-tickets`          | Get sold tickets by user         |
| POST   | `/refresh-token`         | Refresh JWT token                |

### 🎟️ Ticket Routes

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | `/`              | Create a new ticket *(auth)* |
| GET    | `/`              | Get all tickets              |
| GET    | `/:id`           | Get ticket by ID             |
| PUT    | `/:id`           | Update ticket *(auth)*       |
| DELETE | `/:id`           | Delete ticket *(auth)*       |

---

## 🔐 Authentication

JWT-based authentication is used for secure access to protected routes.  
Use login/signup to obtain a token and send it via `Authorization: Bearer <token>` header.

---

## 🧠 Project Structure

```
G17-SYH/
├── frontend/       # React app
└── backend/        # Hono API with TypeScript
    ├── controllers/
    ├── middleware/
    ├── routes/
    └── prisma/
```

---

## 🧑‍💻 Contributors

- 🧠 [Your Name Here]
- 👨‍🏫 CSC105-2024 Team

---

## 📄 License

MIT License © 2025 CSC105-2024
