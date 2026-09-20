# TaskFlow – MERN Task Management System

TaskFlow is a simple B.Tech/MERN Stack portfolio project with JWT authentication, Manager/Employee roles, MongoDB task CRUD, search/filtering, dashboards and one practical Gemini AI feature for task breakdown.

## Stack
- React + React Router + Axios + Recharts
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- Google Gemini API

## Structure

```text
TaskFlow_MERN_2026/
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
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── screenshots/
├── START_HERE.md
└── README.md
```

## Features
- Signup/Login with bcrypt and JWT
- Manager/Employee authorization
- Task create, read, update, delete
- Assignment, priority and due date
- Todo / In Progress / Completed status
- Search and filters
- Manager and Employee dashboards
- Gemini AI task breakdown

## Local Setup
See **START_HERE.md** for exact Windows setup and run commands.

### Resume description
**TaskFlow – MERN Task Management System:** Built a role-based task management application using React, Node.js, Express and MongoDB with JWT authentication, task assignment, CRUD operations, search/filtering, dashboard analytics and Gemini-powered AI task breakdown.

## Important Windows note
Keep the project path free of `#` characters. The packaged folder uses `TaskFlow_MERN_2026` specifically to avoid a known webpack-dev-server path issue with `#` in Windows project paths.

## AI model
The AI breakdown feature defaults to `gemini-2.5-flash`, a currently supported stable Gemini API model.
