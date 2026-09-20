import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreateTask() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '' });
  const [aiSubtasks, setAiSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/auth/employees').then(({ data }) => setEmployees(data)).catch(() => setError('Could not load employees'));
  }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const generateSubtasks = async () => {
    if (!form.title && !form.description) return setError('Add a task title or description first');
    setError('');
    try {
      setAiLoading(true);
      const { data } = await api.post('/ai/breakdown', { title: form.title, description: form.description });
      setAiSubtasks(data.subtasks || []);
    } catch (err) {
      setError(err.response?.data?.message || 'AI could not generate subtasks');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.assignedTo) return setError('Task title and employee are required');
    try {
      setLoading(true);
      await api.post('/tasks', form);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Task creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="create-task-wrapper">
        <div className="create-task-card">
          <h3>Create New Task</h3>
          {error && <p className="form-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Task Title</label>
            <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Enter task title" />
            <label>Description</label>
            <textarea rows="4" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the task" />
            <label>Assign To</label>
            <select value={form.assignedTo} onChange={(e) => update('assignedTo', e.target.value)}>
              <option value="">Select employee</option>
              {employees.map((employee) => <option key={employee._id} value={employee._id}>{employee.name} ({employee.email})</option>)}
            </select>
            <label>Priority & Deadline</label>
            <div className="task-row-form">
              <select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
              <input type="date" value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} />
            </div>
            <div className="ai-box">
              <div className="ai-box-head"><strong>🤖 AI Task Breakdown</strong><button type="button" onClick={generateSubtasks} disabled={aiLoading}>{aiLoading ? 'Generating...' : 'Generate'}</button></div>
              {aiSubtasks.length > 0 ? <ol>{aiSubtasks.map((item, index) => <li key={index}>{item}</li>)}</ol> : <p>Generate practical subtasks from the task description.</p>}
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateTask;
