const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const messagesRoutes = require('./api/messages.routes');
const likesRoutes = require('./api/likes.routes');
const adminRoutes = require('./api/admin.routes');

// Enable CORS (Allow frontend to talk to backend)
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Enable from-urlencoded parsing
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes 
app.use('/messages', messagesRoutes);
app.use('/messages', likesRoutes); 
app.use('/admin', adminRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));