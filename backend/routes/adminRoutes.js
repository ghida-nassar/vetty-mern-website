const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();


router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// Admin routes
router.get('/', userController.getAllUsers);  
router
  .route('/:id')
  .get(userController.getUserProfile)       
  .patch(userController.updateUserProfile)  
  .delete(userController.deleteUser);       

module.exports = router;
