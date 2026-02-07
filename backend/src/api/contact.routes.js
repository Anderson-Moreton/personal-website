const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * POST /contact
 * Send contact email (Brevo SMTP)
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    // Clean input
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Invalid email address.'
      });
    }

    // Message length protection
    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        error: 'Message is too long.'
      });
    }

    /**
     * BREVO SMTP TRANSPORTER
     * IMPORTANT:
     * - user MUST be "apikey"
     * - pass MUST be the Brevo SMTP key
     */
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.CONTACT_EMAIL_PASSWORD
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanFirstName} ${cleanLastName}`,
      text: `
Name: ${cleanFirstName} ${cleanLastName}
Email: ${cleanEmail}

Message:
${cleanMessage}
      `
    });

    return res.json({ success: true });

  } catch (error) {
    console.error('CONTACT ERROR:', error);
    return res.status(500).json({
      error: 'Failed to send message'
    });
  }
});

module.exports = router;