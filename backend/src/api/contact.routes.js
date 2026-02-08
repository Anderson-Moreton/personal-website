const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * POST /contact
 * Sends a contact email using Brevo SMTP
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Create Brevo SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_SMTP_HOST, // smtp-relay.brevo.com
      port: Number(process.env.CONTACT_SMTP_PORT), // 2525
      secure: false, // MUST be false for 2525
      requireTLS: true, // THIS IS THE KEY
      auth: {
        user: process.env.CONTACT_SMTP_USER, // apikey
        pass: process.env.CONTACT_SMTP_PASS  // Brevo SMTP key
      },
      tls: {
        rejectUnauthorized: false
      }
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
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;