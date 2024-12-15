const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Define the schema for the user
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your full name'],
        trim: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 8,
        required: [true, 'Please enter your username'],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please enter your email'],
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: 8,
        select: false,
        trim: true
    },
    passwordConfirm: {
        type: String,
        trim: true,
        validate: {
            // Validate only during CREATE and SAVE
            validator: function (el) {
                return !this.isModified('password') || el === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'  // Referencing the Pet model to associate pets with the user
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified or user is new
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// Set passwordChangedAt field if password was modified
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; // To prevent token issued before password change
    next();
});

// Instance method to check if the entered password is correct
userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if the user changed password after the JWT was issued
userSchema.methods.passwordChangedAfterIssuingToken = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

// Generate a password reset token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
