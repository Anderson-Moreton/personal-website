const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /messages
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, hobby, topic, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !topic || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Insert message into database
    const [result] = await db.execute(
      `INSERT INTO messages 
      (first_name, last_name, email, hobby, topic, message) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hobby || null, topic, message]
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
      createdAt: new Date()
    });

  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /messages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM messages');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;