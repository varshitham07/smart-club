const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Club API',
      version: '1.0.0',
      description: 'API documentation for Smart Club Application',
      contact: {
        name: 'Smart Club Team',
        email: 'support@smartclub.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: process.env.RENDER_EXTERNAL_URL || 'https://your-deployed-url.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Welcome: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Welcome to Smart Club API'
            },
            status: {
              type: 'string',
              example: 'Server is running'
            },
            environment: {
              type: 'string',
              example: 'development'
            }
          }
        },
        Health: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK'
            },
            timestamp: {
              type: 'string',
              example: '2024-06-18T14:00:00.000Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Something went wrong!'
            }
          }
        }
      }
    }
  },
  apis: ['./server.js']
};

const specs = swaggerJsdoc(swaggerOptions);

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
  // Don't exit on error - allow app to run even if DB fails initially
});

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Smart Club API Documentation'
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome to Smart Club API
 *     description: Returns welcome message and server status
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Successfully retrieved welcome message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Welcome'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Smart Club API',
    status: 'Server is running',
    environment: process.env.NODE_ENV
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server health status and current timestamp
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Redirect to API documentation
 *     description: Redirects to Swagger UI documentation
 *     tags:
 *       - Documentation
 *     responses:
 *       302:
 *         description: Redirect to /api-docs
 */
app.get('/docs', (req, res) => {
  res.redirect('/api-docs');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    hint: 'Visit /api-docs for API documentation'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
