const express = require('express');
const petController = require('../controllers/petController');
const authController = require('../controllers/authController');

const router = express.Router();


router.use(authController.protect);


router
  .route('/')
  .get(petController.getAllPets)     
  .post(petController.createPet);    

router
  .route('/:id')
  .get(petController.getPet)        
  .patch(petController.updatePet)    
  .delete(petController.deletePet);  
router.patch('/:id/health', petController.updatePetHealthStatus);

module.exports = router;
