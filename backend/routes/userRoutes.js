/*const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public Routes (No authentication required)
router.post('/signup', authController.signup);   // User Signup
router.post('/login', authController.login);     // User Login

// Protect all routes after this middleware (authentication required)
router.use(authController.protect);

// Logged-in user routes
router.get('/me', userController.getUserProfile);   // Get the current logged-in user
router.patch('/updateMe', userController.updateUserProfile);   // Update user's details (name, email)
router.delete('/deleteMe', userController.deleteUser);  // Deactivate/delete user account

// Admin-only routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);  // Admin: Get all users

router
  .route('/:id')
  .get(userController.getUserProfile)       // Admin: Get a user by ID
  .patch(userController.updateUserProfile)  // Admin: Update user details by ID
  .delete(userController.deleteUser);// Admin: Delete a user by ID

module.exports = router;*/

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Routes for the logged-in user
router.get('/me', userController.getUserProfile);     // Get user profile
router.patch('/updateMe', userController.updateUserProfile);  // Update user details
router.delete('/deleteMe', userController.deleteUser);  // Delete user account
router.get('/myAppointments', userController.getUserAppointments);  // User appointments

module.exports = router;

