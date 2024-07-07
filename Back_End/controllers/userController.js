import {tryCatchAsync} from "../middlewares/tryCatchAsync.js"
import errorResolve from "../utils/errorResolve.js"

import {User} from "../models/User.js"
import { sendToken } from "../utils/sendTokens.js";

// signup handler
export const signup = tryCatchAsync(async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)return next(new errorResolve("Please enter all Fields", 400));

    let user = await User.findOne({email});
    if(user)return next(new errorResolve("User Already Exist", 409));

    //upload file on cloudinary

    user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"tempid",
            url: "tempurl",
        },

    });

    sendToken(user, 201, res, "User Registered Successfully");
})

// login handler

export const login = tryCatchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password)return next(new errorResolve("Please enter all Fields", 400));

    const user = await User.findOne({email}).select("+password");

    if(!user)return next(new errorResolve("Invalid Credentials", 401));

    const isMatch = await user.comparePassword(password);

    if(!isMatch)return next(new errorResolve("Invalid Credentials", 401));

    sendToken(user, 200, res, `Welcome back ${user.name}`);
});


export const logout = tryCatchAsync(async (req, res, next) => {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).json({
            success: true,
            message: "Logged Out Successfully",
        });
});


export const getProfile = tryCatchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200)
    .json({
        success: true,
        user,
    });
});


export const changePassword = tryCatchAsync(async(req, res, next)=>{
    const {oldPass, newPass} = req.body;
    if(!oldPass || !newPass){
        return next(new errorResolve("Please enter all fields", 400));
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPass);

    if(!isMatch){
        return next(new errorResolve("Incorrect Old Password", 400));
    }

    user.password = newPass;

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Pawssword Change Successfully",
    })

})


export const updateProfile = tryCatchAsync(async(req, res, next)=>{
    const {name, email} = req.body;

    const user = await User.findById(req.user._id);

    if(name)user.name = name;
    if(email)user.email = email;

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Profile Updated Successfully",
    })

})
export const updatePP = tryCatchAsync(async(req, res, next)=>{

    // TODO



    res.status(200)
    .json({
        success: true,
        message: "Profile Picute Updated Successfully",
    })

})