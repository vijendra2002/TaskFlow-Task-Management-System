# TaskFlow – Task Management System

TaskFlow is a full-stack task management application built using React, Node.js, Express, and MongoDB.  
The project allows users to securely create accounts, log in, and manage tasks with role-based access.

This project demonstrates real-world full-stack development concepts including authentication, REST APIs, protected routes, and database persistence.

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

4️⃣ Configure Environment Variables

Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string

5️⃣ Start the Backend

From the backend folder: npm start
The backend will run on: http://localhost:5000

6️⃣ Start the Frontend

Open a new terminal and return to the main project folder:
cd ..
npm start

The frontend will run on: http://localhost:3000

🧪 Application Workflow 

User signs up using email and password
Password is securely hashed and stored in MongoDB
User logs in and authentication is verified from database
Login activity (last login & count) is updated
Authenticated users can create tasks
Tasks are stored persistently in MongoDB
Protected routes prevent unauthorized access

📸 Screenshots

Screenshots of the application are available in the screenshots folder.
The project includes screenshots of the application's interface and dashboard views.

🔒 Security

TaskFlow includes several security-related practices:
Password hashing using bcryptjs
Environment variables for sensitive configuration
Role-based access
Protected application routes
Backend API separation from the frontend
CORS configuration
Sensitive information such as database credentials should always be stored in environment variables and should never be committed to GitHub.

📊 What I Learned

While building TaskFlow, I worked with:
React component-based development
React Router and navigation
REST API integration
Node.js and Express.js backend development
MongoDB database integration
Mongoose
User authentication concepts
Password hashing
Role-based access control
CRUD operations
API testing
Git and GitHub
Frontend and backend integration.

🚀 Future Improvements

Some improvements planned for future versions include:
🤖 Advanced AI-based task prioritization
🔔 Deadline notifications and reminders
🔎 Advanced task search and filtering
📊 More detailed analytics
📈 Task progress tracking
☁️ Production deployment
🔐 Improved authentication and authorization
👥 More advanced team management features


