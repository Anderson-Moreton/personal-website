const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS (Allow frontend to talk to backend)
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Enable from-urlencoded parsing
app.use(express.urlencoded({ extended: true }));

// Routes - Import messages route
const messagesRouter = require('./api/messages');
app.use('/messages', messagesRouter);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));