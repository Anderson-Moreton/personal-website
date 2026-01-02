const express = require('express');
const router = express.Router();

// Temporary array to store messages
// Later we will replace this with MySQl databese
let messages = [];

// Post / messages route
router.post('/', (req, res) => {
    const { firstName, lastName, email, hobby, topic, message } = req.body;

    // Simple validation to ensure required fields are provided
    if(!firstName || !lastName || !email || !topic || !message) {
        return res.status(400).json({ error: 'Missing required fields.'});
    }

    //Create a new message object
    const newMessage = {
        id: messages.length + 1,
        firstName,
        lastName,
        email,
        hobby: hobby || '',
        topic,
        message,
        createdAt: new Date(),
    };

    // Add the message to the temporary array
    messages.push(newMessage);

    // Return the created message
    res.status(201).json(newMessage);

});

// GET /messages
router.get('/', (req, res) => {
  res.json(messages);
});

module.exports = router;