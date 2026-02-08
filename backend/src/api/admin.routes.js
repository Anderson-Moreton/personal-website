const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const authAdmin = require('../middlewares/authAdmin');

/**
 * POST /admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];

    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { role: 'admin', email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('ADMIN LOGIN SUCCESS');
    console.log('TOKEN:', token);

    res.json({ token });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
 * GET /admin/testimonials/approved
 * Lista TODOS os aprovados (para controle do admin)
 */
router.get('/testimonials/approved', authAdmin, async (req, res) => {
  const [rows] = await db.execute(`
    SELECT
      id,
      first_name,
      last_name,
      message,
      image_url,
      show_on_home,
      created_at
    FROM testimonials
    WHERE approved = 1
    ORDER BY created_at DESC
  `);

  res.json(rows);
});

/**
 * PUT /admin/testimonials/:id/toggle-home
 */
router.put('/testimonials/:id/toggle-home', authAdmin, async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'UPDATE testimonials SET show_on_home = NOT show_on_home WHERE id = ?',
    [id]
  );

  res.json({ success: true });
});

/**
 * DELETE /admin/testimonials/:id
 */
router.delete('/testimonials/:id', authAdmin, async (req, res) => {
  const { id } = req.params;

  await db.execute(
    'DELETE FROM testimonials WHERE id = ?',
    [id]
  );

  res.json({ success: true });
});

module.exports = router;