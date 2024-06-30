import {Course} from "../models/Course.js"

export const getAllCourses = async(req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            success: true,
            courses,
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};