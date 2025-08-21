import userModel from "../model/user_model.js";
import AppError from "../util/error.js";
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
const cookieOption = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false, // change to true for production
}

async function register(req, res, next){
    console.log('register')
    const {name, email, password} = req.body;
    //Hashed password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create a new user with hashed password
    try{
        const user = await userModel.create({
            name, email, 
            password: hashedPassword, 
            avatar:{
                public_id: email, 
                secure_url: 'null'
            }
        })
        // If avatar is uploaded, update the user with the avatar URL
        console.log(JSON.stringify(req.file))
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'CSA',
                public_id: user.email,
                resource_type: 'image',
                width: 250,
                height: 250,
            })
            if(result){
                user.avatar.secure_url = result.secure_url
                user.avatar.public_id = result.public_id
                await user.save()
                // Delete the file from the local storage
                fs.rm(`uploads/${req.file.filename}`)
            }
            
        }
        // Generate JWT token
        const token = await user.generateJWTToken()
         
        res.status(201)
        .cookie('token',token, cookieOption)
        .json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar.secure_url
            }
        })
    }catch(e){
        if(e.code === 11000) return next(new AppError('Email already exists', 400))
        return next(new AppError(e.message, 500))
    }
    

 }
async function login(req, res, next){
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email}).select('+password')
        if(!user) return next(new AppError('Invalid email or password', 401))
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return next(new AppError('Invalid email or password', 401))
        const token = await user.generateJWTToken()
        res.status(200)
        .cookie('token', token, cookieOption)
        .json({
        success: true,
        message: 'Logged in successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
    }catch(e){
        return next(new AppError(e.message, 500))
    }
 }
 function logout(req, res, next){
    console.log('logout')
    res.clearCookie('token', null, {maxAge: 0, httpOnly: true, secure: true})
    .status(200)
    .json({
        success: true,
        message: 'Logged out successfully'
    })
 }
async function me(req, res, next){
    console.log('me')
    try{
        const userId = req.userId
        const foundUser = await userModel.findById(userId)
        if(!foundUser) return next(new AppError('User not found', 404))
        res.status(200)
        .json({
        success: true,
        user: {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email
        }
    })
    }catch(e){
        return next(new AppError(e.message, 500))
    }
 }

export default { register, login, logout, me }