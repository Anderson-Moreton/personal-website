const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * GET /admin/pending
 * Returns messages waiting for approval
 */
router.get('/pending', async (req, res) => {
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
router.put('/messages/:id/approve', async (req, res) => {
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
router.put('/messages/:id/reject', async (req, res) => {
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

module.exports = router;