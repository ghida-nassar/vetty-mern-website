const Pet = require('../models/petModel');


exports.createPet = async (req, res, next) => {
    try {
        
        req.body.owner = req.user.id;

        const newPet = await Pet.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                pet: newPet
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.getAllPets = async (req, res, next) => {
    try {
        const pets = await Pet.find({ owner: req.user.id });

        res.status(200).json({
            status: 'success',
            results: pets.length,
            data: {
                pets
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.getPet = async (req, res, next) => {
    try {
        const pet = await Pet.findById(req.params.id);

        if (!pet || pet.owner.toString() !== req.user.id) {
            return res.status(404).json({
                status: 'fail',
                message: 'No pet found with that ID for the current user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                pet
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.updatePet = async (req, res, next) => {
    try {
        const pet = await Pet.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                status: 'fail',
                message: 'No pet found with that ID for the current user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                pet
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.deletePet = async (req, res, next) => {
    try {
        const pet = await Pet.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'fail',
                message: 'No pet found with that ID for the current user'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.updatePetHealthStatus = async (req, res, next) => {
    try {
        const pet = await Pet.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            { healthStatus: req.body.healthStatus }, 
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                status: 'fail',
                message: 'No pet found with that ID for the current user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                pet
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
