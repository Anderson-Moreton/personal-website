const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./api/contact.routes');
const testimonialsRoutes = require('./api/testimonials.routes');
const testimonialsLikesRoutes = require('./api/testimonials-likes.routes');
const adminRoutes = require('./api/admin.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/testimonials', testimonialsLikesRoutes);
app.use('/api/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});