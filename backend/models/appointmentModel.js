
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

