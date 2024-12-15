const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, 'Please provide the pet\'s name'],
        trim: true
    },
    petType: {
        type: String,
        required: [true, 'Please specify the pet\'s species'],
        enum: ['dog', 'cat', 'bird', 'reptile', 'other']
    },
    petAge: {
        type: Number,
        required: [true, 'Please specify the pet\'s age in years']
    },
    petMedicalHistory: {
        type: String,
        required: false,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User model includes owner information
        required: [true, 'Please specify the owner of the pet']
    },
    
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;