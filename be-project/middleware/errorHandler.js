/**
 * Error handling middleware
 * Catches all errors passed to next() and sends appropriate response
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    console.error(`${statusCode} - ${message}`);
    
    // Log stack trace for 500 errors in development
    if (statusCode === 500) {
      console.error(err.stack);
    }
    
    res.status(statusCode).json({
      error: {
        status: statusCode,
        message: message
      }
    });
  };
  
  module.exports = errorHandler;