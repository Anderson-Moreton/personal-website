const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../config/multer');

/**
 * POST /messages
 * Receives a message with optional image
 * Saves it into MySQL database
 */
router.post(
  '/',
  upload.single('image'), // Multer middleware (handles file upload)
  async (req, res) => {
    try {
      // Multer ensures req.body exists even with FormData
      const {
        firstName,
        lastName,
        email,
        hobby,
        topic,
        message,
        showOnHome
      } = req.body;

      // Basic validation
      if (!firstName || !lastName || !email || !topic || !message) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }

      // Normalize checkbox value (VERY IMPORTANT)
      const showOnHomeValue =
        showOnHome === 'true' ||
        showOnHome === '1' ||
        showOnHome === 1 ||
        showOnHome === 'on'
          ? 1
          : 0;

      // Image path (if uploaded)
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Insert message into database
      const [result] = await db.execute(
        `INSERT INTO messages
        (first_name, last_name, email, hobby, topic, message, image_url, show_on_home)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          firstName,
          lastName,
          email,
          hobby || null,
          topic,
          message,
          imageUrl,
          showOnHomeValue
        ]
      );

      // Return created message
      res.status(201).json({
        id: result.insertId,
        firstName,
        lastName,
        email,
        hobby,
        topic,
        message,
        imageUrl,
        showOnHome: showOnHomeValue
      });

    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * GET /messages/home
 * Returns only messages allowed to appear on Home page
 */
router.get('/home', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        m.id,
        m.first_name,
        m.last_name,
        m.hobby,
        m.message,
        m.image_url,
        m.created_at,
        COUNT(ml.id) AS likes
      FROM messages m
      LEFT JOIN message_likes ml
        ON ml.message_id = m.id
      WHERE m.show_on_home = 1
        AND m.approved = 1
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching home messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /messages/admin/pending
 * Returns messages waiting for approval
 */
router.get('/admin/pending', async (req, res) => {
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
 * PUT /messages/:id/approve
 * Approves a message
 */
router.put('/:id/approve', async (req, res) => {
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
 * PUT /messages/:id/reject
 * Rejects a message
 */
router.put('/:id/reject', async (req, res) => {
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