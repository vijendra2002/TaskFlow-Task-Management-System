# TaskFlow – Task Management System

TaskFlow is a full-stack task management application built using React, Node.js, Express, and MongoDB.  
The project allows users to securely create accounts, log in, and manage tasks with role-based access.

This project demonstrates real-world full-stack development concepts including authentication, REST APIs, protected routes, and database persistence.

---

## 📸 Screenshots

### 🔐 Signup & Login
![Signup Page](screenshots/signup.png)
![Login Page](screenshots/login.png)

### 📋 Dashboard & Task Management
![Dashboard](screenshots/dashboard.png)

### 🗄️ MongoDB Data Persistence
![MongoDB Compass](screenshots/mongodb.png)

---

## 🚀 Features

- User Signup & Login with secure password hashing
- Role-based access (Manager / Employee)
- Protected routes for authenticated users
- Create and view tasks
- Persistent data storage using MongoDB
- Login activity tracking (last login time & login count)
- Clean and responsive user interface
- REST API based frontend–backend communication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- JavaScript (ES6)
- HTML5 & CSS3
- Axios

### Backend
- Node.js
- Express.js
- bcrypt (password hashing)
- REST APIs

### Database
- MongoDB (Local – MongoDB Compass)

### Tools
- GitHub
- Postman
- MongoDB Compass
- VS Code

---

## 📂 Project Structure
    │
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── styles/
│ │ └── assets/
│ └── package.json
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
└── README.md


---

## ⚙️ How to Run This Project Locally

Follow the steps below to run the project on your local machine.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/taskflow-task-management-system.git
cd taskflow-task-management-system

2️⃣ Install Dependencies
    cd backend
    npm install

🧪 Application Workflow 

User signs up using email and password
Password is securely hashed and stored in MongoDB
User logs in and authentication is verified from database
Login activity (last login & count) is updated
Authenticated users can create tasks
Tasks are stored persistently in MongoDB
Protected routes prevent unauthorized access
