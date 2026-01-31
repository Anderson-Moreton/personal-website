require('dotenv').config();

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

app.use('/contact', contactRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/testimonials', testimonialsLikesRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);