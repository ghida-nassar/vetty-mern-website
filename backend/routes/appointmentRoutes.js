const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

const router = express.Router();


router.use(authController.protect);



router.get('/timeslots/:date', appointmentController.getAvailableTimeSlots);


router.get('/',authController.restrictTo('user', 'admin'),appointmentController.getAllAppointments);


router.post('/', authController.restrictTo('user', 'admin'), appointmentController.bookAppointment);


router
  .route('/:id')
  .get(appointmentController.getAppointment) 
  .patch(
    authController.restrictTo('user', 'admin'), 
    appointmentController.updateAppointment
  )
  .delete(
    authController.restrictTo('user', 'admin'), 
    appointmentController.deleteAppointment
  );

module.exports = router;
