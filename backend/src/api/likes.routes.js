const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /messages/:id/likes
// Returns total likes for a message
router.get('/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT COUNT(*) AS total FROM message_likes WHERE message_id = ?`,
      [id]
    );

    res.json({ likes: rows[0].total });

  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /messages/:id/like
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;

    // Insert like
    await db.execute(
      'INSERT INTO message_likes (message_id) VALUES (?)',
      [id]
    );

    // Get updated like count
    const [rows] = await db.execute(
      'SELECT COUNT(*) AS likes FROM message_likes WHERE message_id = ?',
      [id]
    );

    res.json({
      messageId: id,
      likes: rows[0].likes
    });

  } catch (error) {
    console.error('Error liking message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /messages/:id/like
router.delete('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      'DELETE FROM message_likes WHERE message_id = ? LIMIT 1',
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;