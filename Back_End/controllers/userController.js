import {tryCatchAsync} from "../middlewares/tryCatchAsync.js"
import errorResolve from "../utils/errorResolve.js"

import {User} from "../models/User.js"
import { sendToken } from "../utils/sendTokens.js";

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