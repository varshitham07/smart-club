const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Swagger only if available
let swaggerUi, swaggerJsdoc, specs;
try {
  swaggerUi = require('swagger-ui-express');
  swaggerJsdoc = require('swagger-jsdoc');
  
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Smart Club API',
        version: '1.0.0',
        description: 'API documentation for Smart Club Application'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        },
        {
          url: 'https://smart-club-a1c9.onrender.com',
          description: 'Production server'
        }
      ]
    },
    apis: ['./server.js']
  };
  
  specs = swaggerJsdoc(swaggerOptions);
} catch (e) {
  console.log('⚠️ Swagger not available, skipping API docs');
  swaggerUi = null;
}

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
  console.error('❌ MongoDB connection error:', err.message);
});

// Swagger UI Route (if available)
if (swaggerUi && specs) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger UI available at /api-docs');
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome to Smart Club API
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Welcome message
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Smart Club API',
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    docs: '/api-docs'
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server healthy
 */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

app.get('/docs', (req, res) => {
  res.redirect('/api-docs');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    message: 'Visit /api-docs for API documentation'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
