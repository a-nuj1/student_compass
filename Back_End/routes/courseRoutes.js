import express from 'express';
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { adminOnly, isAuthentic, subscribersOnly } from '../middlewares/auth.js';
const router = express.Router();

// get all courses
router.route('/courses').get(getAllCourses);

// create new course - admin only
router.route('/createcourse').post(isAuthentic, adminOnly, singleUpload, createCourse); 

// get lectures of a course
router
.route("/course/:id")
.get(isAuthentic,subscribersOnly, getLectures)
.post(isAuthentic, adminOnly, singleUpload, addLectures)
.delete(isAuthentic, adminOnly, deleteCourse);


// Delete lecture of a course

router.route("/lecture").delete(isAuthentic, adminOnly, deleteLecture);

export default router;