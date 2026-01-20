const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * POST /contact
 * Send contact email
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    // Trim values
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Email validation (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Invalid email address.'
      });
    }

    // Length protection (anti-spam)
    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        error: 'Message is too long.'
      });
    }

    // Send email (nodemailer)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanFirstName} ${cleanLastName}`,
      text: cleanMessage
    });

    return res.json({ success: true });

  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;