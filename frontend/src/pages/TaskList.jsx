import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function TaskList() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isManager = user?.role === 'manager';
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const { data } = await api.get('/tasks', { params: filters });
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tasks');
    }
  };

  useEffect(() => { loadTasks(); }, [filters.search, filters.status, filters.priority]);

  const updateStatus = async (id, status) => {
    try { await api.patch(`/tasks/${id}`, { status }); loadTasks(); }
    catch (err) { setError(err.response?.data?.message || 'Status update failed'); }
  };

  const openEdit = (task) => {
    setEditTask(task);
    setForm({ title: task.title, description: task.description || '', priority: task.priority, dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '' });
  };

  const saveEdit = async () => {
    try { await api.patch(`/tasks/${editTask._id}`, form); setEditTask(null); loadTasks(); }
    catch (err) { setError(err.response?.data?.message || 'Update failed'); }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try { await api.delete(`/tasks/${id}`); loadTasks(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  return (
    <Layout>
      <div className="page-heading-row"><div><h2>{isManager ? 'All Tasks' : 'My Tasks'}</h2><p className="subtle">Manage tasks stored in MongoDB.</p></div></div>
      {error && <p className="form-error">{error}</p>}
      <div className="filter-bar">
        <input placeholder="Search tasks..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">All Status</option><option>Todo</option><option>In Progress</option><option>Completed</option></select>
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}><option value="">All Priority</option><option>Low</option><option>Medium</option><option>High</option></select>
      </div>

      {tasks.length === 0 ? <div className="empty-state">No tasks found.</div> : tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <div className="task-main">
            <div className="task-title-row"><h4>{task.title}</h4><span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span></div>
            <p>{task.description || 'No description'}</p>
            <small>Assigned to: {task.assignedTo?.name || task.assignedTo?.email || 'Unknown'}</small>
            {task.dueDate && <small>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
          </div>
          <div className="task-actions">
            <select value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)}><option>Todo</option><option>In Progress</option><option>Completed</option></select>
            {isManager && <><button onClick={() => openEdit(task)}>✏️</button><button className="danger" onClick={() => deleteTask(task._id)}>🗑️</button></>}
          </div>
        </div>
      ))}

      {editTask && <div className="modal-overlay"><div className="modal"><h3>Edit Task</h3><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Low</option><option>Medium</option><option>High</option></select><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /><div className="modal-actions"><button onClick={saveEdit}>Save</button><button className="cancel" onClick={() => setEditTask(null)}>Cancel</button></div></div></div>}
    </Layout>
  );
}

export default TaskList;
