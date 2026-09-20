import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

function ManagerDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { api.get('/tasks').then(({ data }) => setTasks(data)).catch((err) => setError(err.response?.data?.message || 'Could not load dashboard')); }, []);

  const today = new Date();
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'Todo').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    overdue: tasks.filter((t) => t.dueDate && new Date(t.dueDate) < today && t.status !== 'Completed').length,
  };
  const chartData = [{ name: 'Todo', value: stats.todo }, { name: 'In Progress', value: stats.inProgress }, { name: 'Completed', value: stats.completed }];
  const colors = ['#f59e0b', '#3b82f6', '#22c55e'];

  return <Layout>
    <div className="page-heading-row"><div><h2>Manager Dashboard</h2><p className="subtle">Overview of your team tasks.</p></div><button onClick={() => navigate('/create-task')}>+ Create Task</button></div>
    {error && <p className="form-error">{error}</p>}
    <div className="stats-grid stats-five"><div className="stat-card"><h4>Total Tasks</h4><p>{stats.total}</p></div><div className="stat-card"><h4>Todo</h4><p>{stats.todo}</p></div><div className="stat-card"><h4>In Progress</h4><p>{stats.inProgress}</p></div><div className="stat-card"><h4>Completed</h4><p>{stats.completed}</p></div><div className="stat-card"><h4>Overdue</h4><p>{stats.overdue}</p></div></div>
    <div className="stat-card chart-card"><h3>Task Status Overview</h3><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><PieChart><Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{chartData.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div></div>
  </Layout>;
}
export default ManagerDashboard;
