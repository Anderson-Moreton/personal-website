const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const authAdmin = require('../middlewares/authAdmin');

/**
 * GET /admin/testimonials/pending
 */
router.get('/testimonials/pending', authAdmin, async (req, res) => {
  res.set('Cache-Control', 'no-store');

  const [rows] = await db.execute(`
    SELECT
      id,
      first_name,
      last_name,
      message,
      image_url,
      created_at
    FROM testimonials
    WHERE approved = 0
    ORDER BY created_at DESC
  `);

  res.json(rows);
});

/**
 * PUT /admin/testimonials/:id/show
 * Toggle show_on_home
 */
router.put('/testimonials/:id/show', authAdmin, async (req, res) => {
  const { id } = req.params;
  const { showOnHome } = req.body; // boolean

  // Count how many are currently visible
  if (showOnHome === true) {
    const [[countRow]] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM testimonials
      WHERE show_on_home = 1
        AND approved = 1
    `);

    if (countRow.total >= 8) {
      return res.status(400).json({
        error: 'Maximum of 8 testimonials allowed on Home'
      });
    }
  }

  await db.execute(
    'UPDATE testimonials SET show_on_home = ? WHERE id = ?',
    [showOnHome ? 1 : 0, id]
  );

  res.json({ success: true });
});

/**
 * PUT /admin/testimonials/:id/approve
 */
router.put('/testimonials/:id/approve', authAdmin, async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'UPDATE testimonials SET approved = 1 WHERE id = ?',
    [id]
  );

  res.json({ success: true });
});

/**
 * PUT /admin/testimonials/:id/reject
 */
router.put('/testimonials/:id/reject', authAdmin, async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'UPDATE testimonials SET approved = -1 WHERE id = ?',
    [id]
  );

  res.json({ success: true });
});

/**
 * POST /admin/login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== 'admin@personal.com' || password !== 'admin123') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin', email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

module.exports = router;