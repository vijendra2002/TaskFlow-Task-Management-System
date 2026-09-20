import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import CreateTask from './pages/CreateTask';
import TaskList from './pages/TaskList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manager" element={<ProtectedRoute role="manager"><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/create-task" element={<ProtectedRoute role="manager"><CreateTask /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
