const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * Middleware para pegar visitor_id
 */
function getVisitorId(req) {
  return req.header('X-Visitor-Id');
}

/**
 * POST /testimonials/:id/like
 */
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const visitorId = getVisitorId(req);

    if (!visitorId) {
      return res.status(400).json({ error: 'visitor_id required' });
    }

    // evita like duplicado
    await db.execute(
      `INSERT IGNORE INTO testimonial_likes (testimonial_id, visitor_id)
       VALUES (?, ?)`,
      [id, visitorId]
    );

    const [[row]] = await db.execute(
      `SELECT COUNT(*) AS likes
       FROM testimonial_likes
       WHERE testimonial_id = ?`,
      [id]
    );

    res.json({
      liked: true,
      likes: row.likes
    });

  } catch (error) {
    console.error('LIKE ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /testimonials/:id/like
 */
router.delete('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const visitorId = getVisitorId(req);

    if (!visitorId) {
      return res.status(400).json({ error: 'visitor_id required' });
    }

    await db.execute(
      `DELETE FROM testimonial_likes
       WHERE testimonial_id = ?
       AND visitor_id = ?`,
      [id, visitorId]
    );

    const [[row]] = await db.execute(
      `SELECT COUNT(*) AS likes
       FROM testimonial_likes
       WHERE testimonial_id = ?`,
      [id]
    );

    res.json({
      liked: false,
      likes: row.likes
    });

  } catch (error) {
    console.error('UNLIKE ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;