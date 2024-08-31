import express from 'express';
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPass, getAllUsers, getProfile, login, logout, removeFromPlaylist, resetPass, signup, updatePP, updateProfile, updateRoles } from '../controllers/userController.js';
import { isAuthentic , adminOnly} from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';



const router = express.Router();

// signup
router.route('/signup').post(singleUpload, signup);

//login
router.route('/login').post(login);

//logout
router.route('/logout').get(logout);

//get mine profile
router.route('/profile').get(isAuthentic, getProfile);

// delete mine profile
router.route('/profile').delete(isAuthentic, deleteMyProfile)
 
// change passwrod
router.route('/changepass').put(isAuthentic, changePassword);

// update profile
router.route('/updateprofile').put(isAuthentic, updateProfile);

//update profile picture
router.route('/updatepp').put(singleUpload, isAuthentic, updatePP);

// forgot password
router.route('/forgotpass').post(forgetPass);

// reset password
router.route('/resetpass/:token').put(resetPass);

// Addto Playlist
router.route('/addtoplaylist').post(isAuthentic, addToPlaylist);

// Remove from Playlist
router.route('/removefromplaylist').delete(isAuthentic, removeFromPlaylist);




//Admin Routes

// get all users

router.route('/admin/users').get(isAuthentic, adminOnly, getAllUsers);

// update roles from user to admin
router.route('/admin/user/:id').put(isAuthentic, adminOnly, updateRoles).delete(isAuthentic, adminOnly, deleteUser);

export default router;
