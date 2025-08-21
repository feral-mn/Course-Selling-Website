import {Schema, model}from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters'],
        minlength: [3, 'Name must be at least 3 characters'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        maxlength: [40, 'Email cannot be more than 40 characters']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, "Password can't be less than 8 character"],
        select: false // Never show password in queries
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {timestamps: true}); // Adds createdAt and updatedAt automatically

userSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign({
            id: this._id,
            email: this.email,
            role: this.role,
            subscription: this.subscription
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRATION })
    }
}

const userModel = model('user', userSchema);

export default userModel;