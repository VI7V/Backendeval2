const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware to handle file reading
const serveHtmlFile = (filePath) => {
  return (req, res, next) => {
    fs.readFile(path.join(__dirname, '../views', filePath), 'utf-8', (err, data) => {
      if (err) {
        const error = new Error(`Error reading the ${filePath} page`);
        error.status = 500;
        return next(error);
      }
      res.status(200).send(data);
    });
  };
};

// Routes for different pages
router.get('/', serveHtmlFile('index.html'));
router.get('/dashboard', serveHtmlFile('dashboard.html'));
router.get('/login', serveHtmlFile('login.html'));
router.get('/register', serveHtmlFile('register.html'));
router.get('/about', serveHtmlFile('aboutus.html'));
router.get('/contactus', serveHtmlFile('contactus.html'));

// Route with route parameter
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.status(200).json({ message: `User profile for ID: ${userId}` });
});

module.exports = router;