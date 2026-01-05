const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../config/multer');

// POST /messages
router.post(
  '/',
  upload.single('image'), // MULTER here
  async (req, res) => {
    try {
      // After multer, req.body EXISTS
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

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

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
          showOnHome === 'true' ? 1 : 0
        ]
      );

      res.status(201).json({
        id: result.insertId,
        firstName,
        lastName,
        email,
        hobby,
        topic,
        message,
        imageUrl,
        showOnHome
      });

    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// GET /messages/home
// Returns only messages allowed to appear on Home
router.get('/home', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT
        id,
        first_name,
        last_name,
        hobby,
        message,
        image_url,
        created_at
      FROM messages
      WHERE show_on_home = 1
      ORDER BY created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching home messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;