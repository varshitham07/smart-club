const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Smart Club API',
    status: 'Server is running',
    environment: process.env.NODE_ENV
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
