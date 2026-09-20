import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/tasks').then(({ data }) => setTasks(data)).catch((err) => setError(err.response?.data?.message || 'Could not load tasks')); }, []);
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const todo = tasks.filter((t) => t.status === 'Todo').length;
  return <Layout>
    <h2>My Dashboard</h2><p className="subtle">Your assigned tasks and progress.</p>{error && <p className="form-error">{error}</p>}
    <div className="stats-grid"><div className="stat-card"><h4>My Tasks</h4><p>{tasks.length}</p></div><div className="stat-card"><h4>Todo</h4><p>{todo}</p></div><div className="stat-card"><h4>In Progress</h4><p>{inProgress}</p></div><div className="stat-card"><h4>Completed</h4><p>{completed}</p></div></div>
    <div className="stat-card ai-box"><h3>🤖 AI Task Assistant</h3><p>Managers can use AI Task Breakdown while creating tasks to turn a task description into actionable subtasks.</p></div>
  </Layout>;
}
export default EmployeeDashboard;
