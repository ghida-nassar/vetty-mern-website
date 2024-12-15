/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for appointments
const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User model includes doctor information
        required: [true, 'Doctor is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User model includes patient information
        required: [true, 'User is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    timeSlot: {
        type: String, // e.g., '09:00', '10:00', etc.
        required: [true, 'Time slot is required']
    },
    reason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;*/

const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'User is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    timeSlot: {
        type: String, 
        required: [true, 'Time slot is required']
    },
    reason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled'
    }
}, {
    timestamps: true 
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

