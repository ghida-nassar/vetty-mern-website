const express = require('express');
const petController = require('../controllers/petController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware (users need to be logged in)
router.use(authController.protect);

// Routes for managing pets
router
  .route('/')
  .get(petController.getAllPets)     // Get all pets
  .post(petController.createPet);    // Create a new pet

router
  .route('/:id')
  .get(petController.getPet)         // Get pet by ID
  .patch(petController.updatePet)    // Update pet by ID
  .delete(petController.deletePet);  // Delete pet by ID

// Update pet health status
router.patch('/:id/health', petController.updatePetHealthStatus);

module.exports = router;
