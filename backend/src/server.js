const express = require('express');
const cors = require('cors');

// Import messages route
const messagesRouter = require('./api/messages');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/messages', messagesRouter);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));