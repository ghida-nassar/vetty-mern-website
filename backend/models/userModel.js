const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


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
        ref: 'Pet'  
    }]
}, {
    timestamps: true 
});


userSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) return next();

    
    this.password = await bcrypt.hash(this.password, 12);

    
    this.passwordConfirm = undefined;
    next();
});


userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; 
    next();
});


userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.passwordChangedAfterIssuingToken = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    
    return false;
};

// Generate a password reset token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; 

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
