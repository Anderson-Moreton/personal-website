const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../config/multer');

/**
 * POST /testimonials
 * Create a testimonial (pending approval)
 */
router.post(
  '/',
  upload.single('image'),
  async (req, res) => {
    try {
      const { firstName, lastName, message } = req.body;

      if (!firstName || !lastName || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const [result] = await db.execute(
        `INSERT INTO testimonials
         (first_name, last_name, message, image_url, approved)
         VALUES (?, ?, ?, ?, 0)`,
        [firstName.trim(), lastName.trim(), message.trim(), imageUrl]
      );

      res.status(201).json({
        id: result.insertId,
        success: true
      });

    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * GET /testimonials/home
 * Approved testimonials for Home
 */
router.get('/home', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        t.id,
        t.first_name,
        t.last_name,
        t.message,
        t.image_url,
        t.created_at,
        COUNT(l.id) AS likes
      FROM testimonials t
      LEFT JOIN testimonial_likes l
        ON l.testimonial_id = t.id
      WHERE t.approved = 1
        AND t.show_on_home = 1
      GROUP BY t.id
      ORDER BY t.created_at DESC
      LIMIT 8
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching home testimonials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;