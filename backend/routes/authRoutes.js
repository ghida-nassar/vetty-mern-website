/*const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Public Routes (No authentication required)
router.post('/signup', authController.signup);  // User Signup
router.post('/login', authController.login);    // User Login

// Password reset routes
router.post('/forgotPassword', authController.forgotPassword);   // Initiate password reset
router.patch('/resetPassword/:token', authController.resetPassword);  // Reset password with token

// Protect all routes after this middleware (authentication required)
router.use(authController.protect);

// Logged-in user routes (Protected)
router.patch('/updateMyPassword', authController.updatePassword);  // Update password when logged in
router.get('/me', userController.getUserProfile);    // Get the logged-in user's profile
router.patch('/updateMe', userController.updateUserProfile);  // Update user details (name, email, etc.)
router.delete('/deleteMe', userController.deleteUser); // Deactivate or delete account
router.get('/myAppointments', userController.getUserAppointments);

// Admin Routes (Restricted to admin only)
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);  // Admin: Get all users

router
  .route('/:id')
  .get(userController.getUserProfile)       // Admin: Get user by ID
  .patch(userController.updateUserProfile)  // Admin: Update user by ID
  .delete(userController.deleteUser); // Admin: Delete user by ID

module.exports = router;*/

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/signup', authController.signup);  // Signup
router.post('/login', authController.login);    // Login
router.post('/forgotPassword', authController.forgotPassword);  // Initiate password reset
router.patch('/resetPassword/:token', authController.resetPassword);  // Reset password

// Authenticated user routes
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);  // Update password

module.exports = router;

