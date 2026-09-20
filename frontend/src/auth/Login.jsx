import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !role) return setError('Please fill all fields');

    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      if (data.user.role !== role) return setError(`This account is registered as ${data.user.role}.`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(data.user.role === 'manager' ? '/manager' : '/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <img src="/login-illustration.png" alt="Login" />
          <h3>TaskFlow</h3>
          <p>Manage tasks efficiently with a simple full-stack workflow.</p>
        </div>
        <div className="auth-right">
          <h2>Login</h2>
          {error && <p className="form-error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
          </form>
          <p className="auth-footer">New user? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
