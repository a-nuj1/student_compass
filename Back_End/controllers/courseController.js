import { tryCatchAsync } from "../middlewares/tryCatchAsync.js";
import {Course} from "../models/Course.js"
import { Stats } from "../models/Stats.js";
import getDataUri from "../utils/dataUri.js";
import ErrorResolve from "../utils/errorResolve.js";
import cloudinary from "cloudinary";


// get all courses
export const getAllCourses = tryCatchAsync(async(req, res, next) => {

    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

        const courses = await Course.find({
            title: {
                $regex: keyword,
                $options: "i",
            },
            category: {
                $regex: category,
                $options: "i",
            },
        }).select("-lectures");
        res.status(200).json({
            success: true,
            courses,
        });
});


// create new course
export const createCourse = tryCatchAsync(async(req, res, next) => {

    const {title, description, category, createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(new ErrorResolve("Please fill in all fields", 400));
    } 

    const file = req.file;
    // console.log(file);

    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster:{
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });


    // const course = await Course.create(req.body);
    res.status(201).json({
        success: true,
        message: "Course created successfully",
    });
});

// get lectures of a course
export const getLectures = tryCatchAsync(async(req, res, next) => {
    const course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResolve("Course not found", 404));
    }
    course.views += 1;
    await course.save();
    
    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
});


// add lectures to a course
export const addLectures = tryCatchAsync(async(req, res, next) => {
    const {title, description, videoUrl} = req.body;
    const course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResolve("Course not found", 404));
    }

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type: "video",
    });

    course.lectures.push({
        title,
        description,
        video:{
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });

    course.numberOfLectures = course.lectures.length;
    await course.save();
    
    res.status(201).json({
        success: true,
        message: "Lecture added successfully"
    });
});


// delete a course

export const deleteCourse = tryCatchAsync(async(req, res, next) => {

    const {id} = req.params;
    const course = await Course.findById(id);
    if(!course){
        return next(new ErrorResolve("Course not found", 404));
    }

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for(let i = 0; i < course.lectures.length; i++){
        await cloudinary.v2.uploader.destroy(course.lectures[i].video.public_id,{
            resource_type: "video",
        });
    }

    await course.deleteOne();
   
    res.status(200).json({
        success: true,
        message: "Course Deleted successfully",
    });
});



// delete a lecture

export const deleteLecture = tryCatchAsync(async(req, res, next) => {

    const {courseId, lectureId} = req.query;

    const course = await Course.findById(courseId);
    if(!course){
        return next(new ErrorResolve("Course not found", 404));
    }

    const lecture = course.lectures.find(item => {
        if(item._id.toString() === lectureId.toString())
            return item;
    });

    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        resource_type: "video",
    });

    course.lectures = course.lectures.filter(lecture => {
        if(lecture._id.toString() !== lectureId.toString())
            return lecture;
        
    });

    course.numberOfLectures = course.lectures.length;
   
    await course.save();
    res.status(200).json({
        success: true,
        message: "Lecture Deleted successfully",
    });
});


Course.watch().on("change", async() => {
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);

    const courses = await Course.find();

    let totalViews = 0;

    for(let i = 0; i<courses.length; i++){
        totalViews += courses[i].views;
    }

    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
});