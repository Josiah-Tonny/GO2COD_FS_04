const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolioRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Initialize express
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://josiah-tonny.github.io'
  ],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport config
const passportConfig = require('./config/passport');
passportConfig(passport);

// Connect to Database
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});