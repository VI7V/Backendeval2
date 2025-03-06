const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
router.get('/dashboard',(req,res)=>res.sendFile(path.join(__dirname,'../views/dashboard.html')));
// Login route with validation
router.post('/login',(req, res) => {
  // Check for validation errors
 
  const { username, password } = req.body;

  // Read the users from the users.json file
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    // Parse the users data
    const users = JSON.parse(data);

    // Authenticate the user by checking the username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // If user is found, respond with success

      return res.status(302).redirect('/dashboard');

      // return res.status(200).json({ message: 'Login successful', redirect: '/dashboard' });
      res.writeHead(302,{'Location': '/dashboard'});
      res.end();

    } else {
      // If user is not found, respond with error
      return res.status(302).redirect('/');
    }
  });
});

// Register route with validation
router.post('/register', [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const userData = { username, password };

  // Read existing users from users.json or create an empty array if file doesn't exist
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8', (err, data) => {
    let users = [];

    if (!err) {
      users = JSON.parse(data);
      
      // Check if username already exists
      if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already exists' });
      }
    }

    // Save new user to the users array
    users.push(userData);

    // Write the updated users array to users.json
    fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving registration data' });
      }
      res.writeHead(302,{'Location': '/login'});
      res.end();    });
  });
});

module.exports = router;