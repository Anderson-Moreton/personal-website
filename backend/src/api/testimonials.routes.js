const express = require('express');
const router = express.Router();
const db = require('../db');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const upload = require('../config/multer');

/**
 * POST /testimonials
 * Creates a new testimonial (image optional)
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { firstName, lastName, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !message) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const trimmedMessage = message.trim();

    // Validate message length
    if (trimmedMessage.length < 10 || trimmedMessage.length > 200) {
      return res.status(400).json({
        error: 'Message length invalid'
      });
    }

    let imageUrl = null;

    // If an image was uploaded, process it
    if (req.file) {
      const filename = `${Date.now()}.jpg`;

      // Absolute path to /uploads directory
      const uploadsDir = path.join(__dirname, '../uploads');
      const outputPath = path.join(uploadsDir, filename);

      // Ensure uploads directory exists (CRITICAL FIX)
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Resize and save image using Sharp
      await sharp(req.file.buffer)
        .resize(300, 300, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(outputPath);

      imageUrl = `/uploads/${filename}`;
    }

    // Insert testimonial into database
    await db.execute(
      `
      INSERT INTO testimonials
        (first_name, last_name, message, image_url, approved)
      VALUES (?, ?, ?, ?, 0)
      `,
      [firstName.trim(), lastName.trim(), trimmedMessage, imageUrl]
    );

    return res.status(201).json({ success: true });

  } catch (error) {
    console.error('Create testimonial error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

/**
 * GET /testimonials/home
 * Returns approved testimonials for home page
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
        COALESCE(COUNT(l.id), 0) AS likes
      FROM testimonials t
      LEFT JOIN testimonial_likes l
        ON l.testimonial_id = t.id
      WHERE t.approved = 1
        AND (t.show_on_home = 1 OR t.show_on_home IS NULL)
      GROUP BY
        t.id,
        t.first_name,
        t.last_name,
        t.message,
        t.image_url,
        t.created_at
      ORDER BY t.created_at DESC
      LIMIT 8
    `);

    return res.json(rows || []);

  } catch (error) {
    console.error('Testimonials home error:', error);
    // Safe fallback: never break the home page
    return res.json([]);
  }
});

module.exports = router;