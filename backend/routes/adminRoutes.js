const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes and restrict to admin
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// Admin routes
router.get('/', userController.getAllUsers);  // Get all users
router
  .route('/:id')
  .get(userController.getUserProfile)       // Get a user by ID
  .patch(userController.updateUserProfile)  // Update user by ID
  .delete(userController.deleteUser);       // Delete user by ID

module.exports = router;
