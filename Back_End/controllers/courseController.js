import { tryCatchAsync } from "../middlewares/tryCatchAsync.js";
import {Course} from "../models/Course.js"
import ErrorResolve from "../utils/errorResolve.js";

export const getAllCourses = tryCatchAsync(async(req, res, next) => {
        const courses = await Course.find().select("-lectures");
        res.status(200).json({
            success: true,
            courses,
        });
});

export const createCourse = tryCatchAsync(async(req, res, next) => {

    const {title, description, category, createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(new ErrorResolve("Please fill in all fields", 400));
    } 

    // const file = req.file;
    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster:{
            public_id: "temp",
            url: "temp",
        },
    });


    // const course = await Course.create(req.body);
    res.status(201).json({
        success: true,
        message: "Course created successfully",
    });
});