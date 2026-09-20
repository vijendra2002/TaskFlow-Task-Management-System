const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/breakdown', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title && !description) return res.status(400).json({ message: 'Task title or description is required' });
    if (!process.env.GEMINI_API_KEY) return res.status(503).json({ message: 'Gemini API key is not configured. Add GEMINI_API_KEY to backend/.env' });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });
    const prompt = `You are a practical software project assistant. Break the following task into 4-7 concise, actionable subtasks. Return ONLY a JSON array of strings, with no markdown. Task title: ${title || ''}. Description: ${description || ''}.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const subtasks = JSON.parse(text);
    if (!Array.isArray(subtasks)) throw new Error('Invalid AI response');
    res.json({ subtasks: subtasks.slice(0, 7) });
  } catch (error) {
    console.error('AI error:', error.message);
    res.status(500).json({ message: 'AI could not generate subtasks right now' });
  }
});

module.exports = router;
