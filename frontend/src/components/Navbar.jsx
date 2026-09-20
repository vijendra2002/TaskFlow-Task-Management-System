import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './layout.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); }, [theme]);
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };
  return <div className="navbar"><span>TaskFlow</span><div className="nav-user"><span>{user?.name || user?.email} · {user?.role}</span><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '🌙' : '☀️'}</button><button onClick={logout}>🚪 Logout</button></div></div>;
}
export default Navbar;
