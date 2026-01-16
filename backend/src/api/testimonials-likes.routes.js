const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * GET /testimonials/:id/likes
 */
router.get('/:id/likes', async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.execute(
    'SELECT COUNT(*) AS total FROM testimonial_likes WHERE testimonial_id = ?',
    [id]
  );

  res.json({ likes: rows[0].total });
});

/**
 * POST /testimonials/:id/like
 */
router.post('/:id/like', async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'INSERT INTO testimonial_likes (testimonial_id) VALUES (?)',
    [id]
  );

  const [rows] = await db.execute(
    'SELECT COUNT(*) AS likes FROM testimonial_likes WHERE testimonial_id = ?',
    [id]
  );

  res.json({ likes: rows[0].likes });
});

/**
 * DELETE /testimonials/:id/like
 */
router.delete('/:id/like', async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'DELETE FROM testimonial_likes WHERE testimonial_id = ? LIMIT 1',
    [id]
  );

  res.json({ success: true });
});

module.exports = router;