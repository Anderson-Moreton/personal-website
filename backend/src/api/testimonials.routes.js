const express = require('express');
const router = express.Router();
const db = require('../db');
const sharp = require('sharp');
const path = require('path');
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

      const trimmedMessage = message.trim();

      if (trimmedMessage.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters long' });
      }
      if (trimmedMessage.length > 200) {
        return res.status(400).json({ error: 'Message must not exceed 200 characters' });
      }

      let imageUrl = null;

      if (req.file) {
        const filename = `${Date.now()}.jpg`;
        const outputPath = path.join(__dirname, '../uploads', filename);

        await sharp(req.file.buffer)
          .resize(300, 300, { fit: 'cover' })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        imageUrl = `/uploads/${filename}`;
      }

      await db.execute(
        `INSERT INTO testimonials
         (first_name, last_name, message, image_url, approved)
         VALUES (?, ?, ?, ?, 0)`,
        [
          firstName.trim(),
          lastName.trim(),
          trimmedMessage,
          imageUrl
        ]
      );

      res.status(201).json({ success: true });

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
    console.log('SQL Error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage
    });
  }
});

module.exports = router;