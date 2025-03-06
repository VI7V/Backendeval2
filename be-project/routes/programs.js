const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve the general programs page
router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../views/program.html'), 'utf-8', (err, data) => {
    if (err) {
      const error = new Error('Error reading the program page');
      error.status = 500;
      return next(error);
    }
    res.status(200).send(data);
  });
});

// Route parameters for specific programs
router.get('/:programId', (req, res) => {
  const programId = req.params.programId;
  
  // Example program data - in a real app, this would come from a database
  const programs = {
    '1': { id: 1, name: 'Fitness Program', duration: '3 months' },
    '2': { id: 2, name: 'Nutrition Plan', duration: '6 months' },
    '3': { id: 3, name: 'Wellness Workshop', duration: '1 week' }
  };
  
  const program = programs[programId];
  
  if (program) {
    res.status(200).json(program);
  } else {
    res.status(404).json({ message: 'Program not found' });
  }
});

// Query parameters example
router.get('/search', (req, res) => {
  const { type, duration } = req.query;
  res.status(200).json({ 
    message: 'Search results', 
    filters: { type, duration } 
  });
});

module.exports = router;