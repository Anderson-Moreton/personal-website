const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authAdmin = require('../middlewares/authAdmin');

/**
 * GET /admin/pending
 * Returns messages waiting for approval
 */
router.get('/pending', authAdmin, async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        id,
        first_name,
        last_name,
        email,
        hobby,
        topic,
        message,
        image_url,
        show_on_home,
        approved,
        created_at
      FROM messages
      WHERE approved = 0
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching pending messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /admin/messages/:id/approve
 */
router.put('/messages/:id/approve', authAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      'UPDATE messages SET approved = 1 WHERE id = ?',
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error approving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /admin/messages/:id/reject
 */
router.put('/messages/:id/reject', authAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      'UPDATE messages SET approved = -1 WHERE id = ?',
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error rejecting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /admin/login
 * Admin authentication
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (email !== 'admin@personal.com' || password !== 'admin123') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // TOKEN
    const token = jwt.sign(
      { role: 'admin', email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;