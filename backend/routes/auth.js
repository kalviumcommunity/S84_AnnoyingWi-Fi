const express = require('express');
const router = express.Router();

// Login endpoint: sets username cookie
router.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });
  res.cookie('username', username, { httpOnly: true });
  res.json({ message: 'Logged in', username });
});

// Logout endpoint: clears username cookie
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logged out' });
});

module.exports = router;
