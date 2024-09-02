import {tryCatchAsync} from "../middlewares/tryCatchAsync.js"
import errorResolve from "../utils/errorResolve.js"

import {User} from "../models/User.js"
import { sendToken } from "../utils/sendTokens.js";

import crypto from "crypto";
import { sendMail } from "../utils/sendMails.js";
import { url } from "inspector";
import {Course} from "../models/Course.js"
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

// signup handler

export const signup = tryCatchAsync(async (req, res, next) => {
    const {name, email, password} = req.body;
    const file = req.file;
    
    if(!name || !email || !password || !file)return next(new errorResolve("Please enter all Fields", 400));

    let user = await User.findOne({email});
    if(user)return next(new errorResolve("User Already Exist", 409));

    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },

    });

    sendToken(res, user, "Registered Successfully", 201);
})
 
// login handler

export const login = tryCatchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password)return next(new errorResolve("Please enter all Fields", 400));

    const user = await User.findOne({email}).select("+password");

    if(!user)return next(new errorResolve("Invalid Credentials", 401));

    const isMatch = await user.comparePassword(password);

    if(!isMatch)return next(new errorResolve("Invalid Credentials", 401));

    sendToken(res, user, `Welcome back ${user.name}`, 200);
});

// logout handler
export const logout = tryCatchAsync(async (req, res, next) => {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).json({
            success: true,
            message: "Logged Out Successfully",
        });
});

// get Myprofile handler
export const getProfile = tryCatchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200)
    .json({
        success: true,
        user,
    });
});

// change password handler
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

// update profile handler
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


// update profile picture handler
export const updatePP = tryCatchAsync(async(req, res, next)=>{  
    const user = await User.findById(req.user._id);

    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(req.user.avatar.public_id);


    user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
    };

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Profile Picute Updated Successfully",
    })

})


// forgot password handler

export const forgetPass = tryCatchAsync(async(req, res, next)=>{

    const {email} = req.body;
    
    const user = await User.findOne({email});

    if(!user)return next(new errorResolve("User Not Found", 404));


    const resetToken = user.getResetToken();
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpass/${resetToken} `
    const message = `Click on the link to reset your password ${url}. If you haven't requested then plz ignore`;


    //send mail
    await  sendMail(user.email, "student compass reset password", message)

    res.status(200)
    .json({
        success: true,
        message: `Reset Token Sent to ${user.email}`,
    })

})


// reset password handler

export const resetPass = tryCatchAsync(async(req, res, next)=>{

    const {token} = req.params;
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
        return next(new errorResolve("Invalid Reset Token or has been expired", 401));
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Password Updated Successfully",
        token,
    })

})



// Add to playlist handler
export const addToPlaylist = tryCatchAsync(async(req, res, next)=>{

    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);

    if(!course) return next(new errorResolve("Course Not Found", 404));

    const itemExists = user.playList.find((item)=>
         item.course.toString() === course._id.toString());

    if(itemExists) return next(new errorResolve("Course Already in Playlist", 409));

    user.playList.push({
        course: course._id,
        poster: course.poster.url,
    });

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Added to Playlist Successfully",
    })
})


// remove from playlist handler
export const removeFromPlaylist = tryCatchAsync(async(req, res, next)=>{

    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id);

    if(!course) return next(new errorResolve("Course Not Found", 404));

    const newPlaylist = user.playList.filter((item)=>{
       if(item.course.toString() !== course._id.toString())
        return item;
    });

    user.playList = newPlaylist;

    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Removed From Playlist Successfully",
    })
});


// Admin controllers

// get all users
export const getAllUsers = tryCatchAsync(async(req, res, next)=>{

    const users = await User.find();
    res.status(200)
    .json({
        success: true,
        users,
    })
});


// update roles of user
export const updateRoles = tryCatchAsync(async(req, res, next)=>{

    const user = await User.findById(req.params.id);
    if(!user)return next(new errorResolve("User Not Found", 404));

    if(user.role === "user")user.role = "admin"
    else user.role = "user"
    
    await user.save();

    res.status(200)
    .json({
        success: true,
        message: "Roles Updated Successfully",
    })
});



// delete user
export const deleteUser = tryCatchAsync(async(req, res, next)=>{

    const user = await User.findById(req.params.id);

    if(!user)return next(new errorResolve("User Not Found", 404));

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // to do

    await user.deleteOne();

    res.status(200)
    .json({
        success: true,
        message: "User Deleted Successfully",
    })
});


// delete my profile
export const deleteMyProfile = tryCatchAsync(async(req, res, next)=>{

    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // to do

    await user.deleteOne();

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Deleted Successfully",
    })
});




User.watch().on("change", async() => {
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);

    const subscription = await User.find({"subscription.status": "active"});

    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
})