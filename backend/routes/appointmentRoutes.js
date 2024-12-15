const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Route to get available time slots for the doctor (Calendar View)
// Accessible by both users and admins
router.get('/timeslots/:date', appointmentController.getAvailableTimeSlots);

// Route to get all appointments - restricted to admin role
router.get('/',authController.restrictTo('user', 'admin'),appointmentController.getAllAppointments);

// Route to book a new appointment - accessible by both users and admins
router.post('/', authController.restrictTo('user', 'admin'), appointmentController.bookAppointment);

// Routes for managing individual appointments
router
  .route('/:id')
  .get(appointmentController.getAppointment) // Get a specific appointment by ID (accessible by both roles)
  .patch(
    authController.restrictTo('user', 'admin'), // Ensure only 'user' or 'admin' can access
    appointmentController.updateAppointment
  )
  .delete(
    authController.restrictTo('user', 'admin'), // Ensure only 'user' or 'admin' can access
    appointmentController.deleteAppointment
  );

module.exports = router;
