import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';
import signupImg from '../assets/Signup.svg.webp';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (Object.values(form).some(Boolean) === false || Object.values(form).some((v) => !v)) return setError('Please fill all fields');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');

    try {
      setLoading(true);
      const { data } = await api.post('/auth/signup', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(data.user.role === 'manager' ? '/manager' : '/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <img src={signupImg} alt="Signup" style={{ width: '260px', marginBottom: '20px' }} />
          <h3>Join TaskFlow</h3>
          <p>Create your account and start managing tasks.</p>
        </div>
        <div className="auth-right">
          <h2>Create Account</h2>
          {error && <p className="form-error">{error}</p>}
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => update('name', e.target.value)} />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => update('password', e.target.value)} />
            <select value={form.role} onChange={(e) => update('role', e.target.value)}>
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
          </form>
          <p className="auth-footer">Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
