const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// Function to book an appointment
exports.bookAppointment = async (req, res, next) => {
    try {
        // Check if the time slot on the selected date is already booked
        const existingAppointment = await Appointment.findOne({
            date: req.body.date,
            timeSlot: req.body.timeSlot
        });

        if (existingAppointment) {
            return res.status(400).json({
                status: 'fail',
                message: 'Time slot is already booked for this date.'
            });
        }

        // Ensure reason is provided
        if (!req.body.reason || req.body.reason.trim() === "") {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a reason for the appointment.'
            });
        }

        // Add the logged-in user's ID to the appointment
        const appointmentData = {
            user: req.user.id, // Assuming `req.user` contains the logged-in user's ID
            date: req.body.date,
            timeSlot: req.body.timeSlot,
            reason: req.body.reason,
            status: 'scheduled' // Default status
        };

        // Create the new appointment
        const newAppointment = await Appointment.create(appointmentData);

        res.status(201).json({
            status: 'success',
            data: {
                appointment: newAppointment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


// Function to get all appointments (for users to view their appointments)
exports.getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id });

        res.status(200).json({
            status: 'success',
            results: appointments.length,
            data: {
                appointments
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Function to get a specific appointment by ID
exports.getAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                status: 'fail',
                message: 'No appointment found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                appointment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Function to update an existing appointment (e.g., rescheduling)
exports.updateAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({
                status: 'fail',
                message: 'No appointment found with that ID'
            });
        }

        // Check if the logged-in user is the owner (patient) or an admin
        if (appointment.patient.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to update this appointment'
            });
        }

        // If the user has permission, update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                appointment: updatedAppointment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Function to delete an appointment
exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({
                status: 'fail',
                message: 'No appointment found with that ID'
            });
        }

        // Check if the logged-in user is the owner (patient) or an admin
        if (appointment.patient.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to delete this appointment'
            });
        }

        // If the user has permission, delete the appointment
        await Appointment.findByIdAndDelete(req.params.id);

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
// Function to get available time slots for the doctor (calendar view)
exports.getAvailableTimeSlots = async (req, res, next) => {
    try {
        const date = req.params.date;
        
        if (!date || isNaN(new Date(date))) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid date format. Please provide a valid date (YYYY-MM-DD).'
            });
        }

        const appointments = await Appointment.find({ date: new Date(date) }).select('timeSlot');
        const allTimeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

        const bookedSlots = appointments.map(app => app.timeSlot);
        const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

        res.status(200).json({
            status: 'success',
            data: {
                availableSlots
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
