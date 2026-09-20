import { NavLink } from 'react-router-dom';
import './layout.css';

function Sidebar({ collapsed, setCollapsed }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const dashboard = user?.role === 'manager' ? '/manager' : '/employee';
  return <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
    <div className="logo-row"><h2 className="logo">TF</h2><button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>{collapsed ? '➡️' : '⬅️'}</button></div>
    <NavLink to={dashboard} className="nav-item"><span className="icon">📊</span>{!collapsed && <span>Dashboard</span>}</NavLink>
    <NavLink to="/tasks" className="nav-item"><span className="icon">📋</span>{!collapsed && <span>Tasks</span>}</NavLink>
    {user?.role === 'manager' && <NavLink to="/create-task" className="nav-item"><span className="icon">➕</span>{!collapsed && <span>Create Task</span>}</NavLink>}
  </div>;
}
export default Sidebar;
