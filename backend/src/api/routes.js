const express = require('express');
const router = express.Router();

// Test route
router.get('/messages', (req, res) => {
    res.json([
        {
        id: 1,
        name: 'Anderson',
        message: 'This is a test message',
        likes: 3
        } 
    ]);
});

module.exports = router;