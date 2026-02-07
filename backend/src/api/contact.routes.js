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

    /* =========================
     * BASIC VALIDATION
     * ========================= */

    // Check required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    // Trim input values
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Invalid email address.'
      });
    }

    // Message length protection (anti-spam)
    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        error: 'Message is too long.'
      });
    }

    /* =========================
     * BREVO SMTP TRANSPORTER
     * =========================
     * Uses SMTP login (not API key)
     * Port 2525 is confirmed open on the server
     */
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_SMTP_HOST,          // smtp-relay.brevo.com
      port: Number(process.env.CONTACT_SMTP_PORT),  // 2525
      secure: false,                                // STARTTLS
      auth: {
        user: process.env.CONTACT_SMTP_USER,        // example: a1c717001@smtp-brevo.com
        pass: process.env.CONTACT_SMTP_PASS         // Brevo SMTP password
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    /* =========================
     * SEND EMAIL
     * ========================= */
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

    // Success response
    return res.json({ success: true });

  } catch (error) {
    // Log error for debugging
    console.error('CONTACT ERROR:', error);

    return res.status(500).json({
      error: 'Failed to send message'
    });
  }
});

module.exports = router;