const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('../utils_jwt');
const User = require('../models/User');
const { protect, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const makeToken = (user) => jwt.sign(
  { id: user._id.toString(), role: user.role, email: user.email },
  process.env.JWT_SECRET
);

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['manager', 'employee'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hash, role });

    const token = makeToken(user);
    res.status(201).json({
      message: 'Signup successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = makeToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});


router.get('/employees', protect, allowRoles('manager'), async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('name email');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load employees' });
  }
});

module.exports = router;
