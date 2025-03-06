/**
 * Custom logging middleware
 * Logs request details and response time
 */
const logger = (req, res, next) => {
    const start = new Date();
    
    // Add event listener for when response finishes
    res.on('finish', () => {
      const duration = new Date() - start;
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    
    next();
  };
  
  module.exports = logger;