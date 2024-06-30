import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: validator.isEmail,
        
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        validate: validator.isStrongPassword,
        minLength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    subscription: {
        id: String,
        status: String,
    },

    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },

    playList:[
        {
            course:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String,
        },
    ],

    createdAt:{
        type: Date,
        default: Date.now,

    },

    ResetPasswordToken: String,
    ResetPasswrodExpire: String,

});

export const User = mongoose.model('User', userSchema);