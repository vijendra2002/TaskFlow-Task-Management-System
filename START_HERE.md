# TaskFlow – Quick Start

## 1. MongoDB
Make sure MongoDB is running locally, or change `backend/.env` to your MongoDB Atlas URI.

## 2. Backend environment
Copy:
`backend/.env.example` → `backend/.env`

Set:
- `PORT=5000`
- `MONGO_URI=mongodb://127.0.0.1:27017/taskflow`
- `JWT_SECRET=your_secret`
- `GEMINI_API_KEY=your_key` (optional until AI is tested)
- `GEMINI_MODEL=gemini-2.5-flash`

## 3. Frontend environment (optional)
Copy:
`frontend/.env.example` → `frontend/.env`

It contains:
`REACT_APP_API_URL=http://localhost:5000/api`

The app also has this URL as a fallback, so the frontend can run without this file during local development.

## 4. Install dependencies
Open a terminal in the TaskFlow root:

```powershell
npm run install-all
```

Or install separately:

```powershell
cd frontend
npm install
cd ..\backend
npm install
cd ..
```

## 5. Run backend
Terminal 1:

```powershell
cd backend
npm run dev
```

Expected:
`MongoDB Connected`
`Backend running on http://localhost:5000`

## 6. Run frontend
Terminal 2:

```powershell
cd frontend
npm start
```

Open:
`http://localhost:3000`

## Important
Keep the project folder path free of `#` characters. This project is intentionally packaged as `TaskFlow_MERN_2026` because webpack-dev-server can fail when the Windows project path contains `#`.
