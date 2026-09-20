const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User');
const { protect, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Manager creates a task and assigns it to an employee.
router.post('/', protect, allowRoles('manager'), async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;
    if (!title || !assignedTo) return res.status(400).json({ message: 'Title and assigned employee are required' });
    if (!mongoose.isValidObjectId(assignedTo)) return res.status(400).json({ message: 'Invalid employee id' });

    const employee = await User.findOne({ _id: assignedTo, role: 'employee' });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const task = await Task.create({
      title,
      description,
      assignedTo: employee._id,
      createdBy: req.user.id,
      priority: priority || 'Medium',
      dueDate: dueDate || null
    });

    await task.populate('assignedTo', 'name email');
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create task' });
  }
});

// Managers see all tasks; employees see their own assigned tasks.
router.get('/', protect, async (req, res) => {
  try {
    const query = req.user.role === 'manager' ? {} : { assignedTo: req.user.id };
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.search) query.title = { $regex: req.query.search, $options: 'i' };

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load tasks' });
  }
});

router.patch('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isManager = req.user.role === 'manager';
    const isAssignee = task.assignedTo.toString() === req.user.id;
    if (!isManager && !isAssignee) return res.status(403).json({ message: 'You cannot update this task' });

    if (req.body.status) task.status = req.body.status;
    if (isManager) {
      if (req.body.title !== undefined) task.title = req.body.title;
      if (req.body.description !== undefined) task.description = req.body.description;
      if (req.body.priority !== undefined) task.priority = req.body.priority;
      if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate || null;
    }

    await task.save();
    await task.populate('assignedTo', 'name email');
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update task' });
  }
});

router.delete('/:id', protect, allowRoles('manager'), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete task' });
  }
});

module.exports = router;
