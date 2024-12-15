// Import the necessary modules
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.get('/me', userController.getUserProfile);     
router.patch('/updateMe', userController.updateUserProfile);  
router.delete('/deleteMe', userController.deleteUser);  
router.get('/myAppointments', userController.getUserAppointments);  

module.exports = router;

