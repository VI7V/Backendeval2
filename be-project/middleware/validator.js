/**
 * Validation middleware using express-validator
 * Creates reusable validation chains
 */
const { body } = require('express-validator');

const userValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

module.exports = {
  userValidation
};