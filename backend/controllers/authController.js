const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const Pet = require('../models/petModel');
const sendEmail = require('../utils/email'); // Assumes you have an email utility function for sending emails
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Function to sign a JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Function to create and send the token to the user
const createSendToken = (user, statusCode, message, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
       status: "success",
       token,
       message: message,
       data:{
          user,
       }
    })
 }

 const checkExistingUser = async(req) => {
     const user = await User.findOne({
         $or: [{username:req.body["username"]},{email: req.body["email"]}]
      });
     return user;
 }
 
 exports.signup = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const {
            fullname,
            username,
            email,
            password,
            passwordConfirm,
            phoneNumber,
            petName,
            petType,
            petAge,
            petMedicalHistory,
        } = req.body;

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        // Validate passwords
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        // Check if user already exists
        const existingUser = await checkExistingUser(req);
        if (existingUser) {
            return res.status(409).json({ message: "Username or email is already in use" });
        }

        // Create the user
        const newUser = await User.create({
            fullname,
            username,
            email,
            password,
            passwordConfirm,
            phoneNumber,
        });

        console.log('New User Created:', newUser);

        // Handle pet creation if pet details are provided
        if (petName && petType && petAge !== undefined) {
            try {
                const pet = await Pet.create({
                    petName,
                    petType,
                    petAge,
                    petMedicalHistory: petMedicalHistory || '', // Optional field
                    owner: newUser._id, // Associate the pet with the user
                });

                console.log('Pet Created:', pet);

                // Add the pet to the user's pet array
                newUser.pets.push(pet._id);
                await newUser.save();
                console.log('Updated User After Adding Pet:', newUser);
            } catch (petErr) {
                console.error('Error creating pet:', petErr);
                return res.status(500).json({ message: "Failed to create pet" });
            }
        }

        const message = `Welcome, ${fullname}, your account has been created`;
        createSendToken(newUser, 201, message, res);
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// User Login function
exports.login = async (req, res) => {
    try{
      const { email, password } = req.body;
      if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
	
      const user = await User.findOne({ email }).select('+password');

      if(!user){
        return res.status(404).json({message: "User not found"});
      }
    console.log('User:', user);
    console.log('Password:', user.password);

      if(!(await user.checkPassword(password, user.password))){
        return  res.status(401).json({message: "Incorrect email or password"}); 
      }

      const message = `Welcome back, ${user.fullname}!`;
      createSendToken(user, 200, message, res);
    } catch(err){
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
};

// Middleware to protect routes (requires authentication)
exports.protect = async (req, res, next) => {
    try {
        // 1) Get token and check if it exists
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // 2) Verify token
        let decoded;
       try{
         decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
       }catch(error){
         if(error.name === "JsonWebTokenError"){
            return res.status(401).json({message: "Token is invalid, Please login again"});
         }
         else if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token has expired, Please login again"});
         }
       }

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token does no longer exist.'
            });
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.passwordChangedAfterIssuingToken(decoded.iat)) {
            return res.status(401).json({
                status: 'fail',
                message: 'User recently changed password! Please log in again.'
            });
        }

        // Grant access to the protected route
        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized'
        });
    }
};

// Restrict to certain roles (admin, etc.)
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
    try {
        // 1) Get user based on POSTed email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'There is no user with that email address'
            });
        }

        // 2) Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // 3) Send it to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset token (valid for 10 minutes)',
                message
            });

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                status: 'fail',
                message: 'There was an error sending the email. Try again later!'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
    try {
        // 1) Get user based on the token
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Token is invalid or has expired'
            });
        }

        // 2) If token has not expired, and there is a user, set the new password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // 3) Update changedPasswordAt property for the user (handled in userModel.js)

        // 4) Log the user in, send JWT
        createSendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update current user's password
exports.updatePassword = async (req, res, next) => {
    try {
        // 1) Get user from collection
        const user = await User.findById(req.user.id).select('+password');

        // 2) Check if POSTed current password is correct
        if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Your current password is incorrect.'
            });
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        // 4) Log user in, send JWT
        createSendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};
