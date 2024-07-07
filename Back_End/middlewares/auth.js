import jwt from "jsonwebtoken"

import { tryCatchAsync } from "./tryCatchAsync.js"
import ErrorResolve from "../utils/errorResolve.js";
import { User } from "../models/User.js";


export const isAuthentic = tryCatchAsync(async(req, res, next) =>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorResolve("Not Logged In", 401));

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
})