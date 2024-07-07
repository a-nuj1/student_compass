import express from 'express';
import { changePassword, getProfile, login, logout, signup, updatePP, updateProfile } from '../controllers/userController.js';
import { isAuthentic } from '../middlewares/auth.js';
const router = express.Router();

// signup
router.route('/signup').post(signup);

//login
router.route('/login').post(login);

//logout
router.route('/logout').get(logout);

//get user profile
router.route('/profile').get(isAuthentic, getProfile);
 
// change passwrod

router.route('/changepass').put(isAuthentic, changePassword);

// update profile

router.route('/updateprofile').put(isAuthentic, updateProfile);

//update profile picture

router.route('/updatepp').put(isAuthentic, updatePP)


export default router;