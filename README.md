# TaskFlow – MERN Task Management System

TaskFlow is a full-stack task management application built with the MERN stack. It provides secure authentication, role-based access, task assignment, task tracking, dashboard analytics, search/filtering, and a practical Gemini AI feature for breaking large tasks into actionable subtasks.

The project was built as a B.Tech Computer Science portfolio project with a focus on clean full-stack architecture and real-world application features.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Signup and Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Manager and Employee roles
- Role-based access control

### 📋 Task Management
- Create tasks
- View tasks
- Update task status
- Delete tasks
- Assign tasks to employees
- Set task priority
- Set task deadlines
- Track task progress

### 🔎 Search & Filtering
- Search tasks by title
- Filter by status
- Filter by priority
- Easy task management from the dashboard

### 📊 Dashboards
- Manager dashboard
- Employee dashboard
- Task statistics
- Task status overview
- Visual analytics using Recharts

### 🤖 Gemini AI Task Breakdown
TaskFlow includes one practical AI feature powered by the Google Gemini API.

Users can enter a task description and generate actionable subtasks automatically.

Example:

> Build a responsive React portfolio website

The AI can break it into smaller tasks such as:
- Create project structure
- Build responsive navigation
- Create project section
- Add skills section
- Add contact section
- Test responsive layouts

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- JWT
- bcrypt
- REST API

### Database
- MongoDB
- Mongoose

### AI
- Google Gemini API
- Gemini `gemini-3.6-flash`

### Development Tools
- Git
- GitHub
- VS Code
- MongoDB Compass
- Postman

---

## 📁 Project Structure

```text
TaskFlow_MERN_2026/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── screenshots/
│   ├── dashboard.png
│   ├── login.png
│   ├── signup.png
│   ├── mongodb-tasks.png
│   └── mongodb-users.png
│
├── START_HERE.md
├── package.json
├── .gitignore
└── README.md
