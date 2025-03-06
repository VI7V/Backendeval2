const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const programRoutes = require('./routes/programs');

// Import error handling middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Configure rate limiting middleware (3rd party)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware setup
app.use(morgan('dev')); // 1. Request logging middleware (3rd party)
app.use(helmet()); // 2. Security headers middleware (3rd party)
app.use(compression()); // 3. Response compression middleware (3rd party)
app.use(cors()); // 4. CORS middleware (3rd party)
app.use(limiter); // 5. Rate limiting middleware (3rd party)

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/', pageRoutes);
app.use('/', authRoutes);
app.use('/programs', programRoutes);

// 404 Route
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;