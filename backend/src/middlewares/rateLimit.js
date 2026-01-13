const rateLimit = require('express-rate-limit');

// Rate limit for sending messages
const messageRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,                  // max 5 requests per IP
    message: {
        error: 'Too many messages sent. Please wait a minute.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = { messageRateLimiter };