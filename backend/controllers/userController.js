const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');



exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};



exports.updateUserProfile = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that ID'
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


exports.getUserAppointments = async (req, res, next) => {
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

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
  
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve users',
        error: err.message
      });
    }
  };
