const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * POST /contact
 * Send contact email using Brevo SMTP
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    // Sanitize input
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Invalid email address.'
      });
    }

    // Prevent abuse
    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        error: 'Message is too long.'
      });
    }

    /**
     * Brevo SMTP transporter
     * IMPORTANT:
     * - host, port, user and pass come from .env
     */
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_SMTP_HOST,
      port: Number(process.env.CONTACT_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.CONTACT_SMTP_USER,
        pass: process.env.CONTACT_SMTP_PASS
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    // Send email
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