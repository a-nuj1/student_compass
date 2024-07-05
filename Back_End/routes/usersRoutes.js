import express from 'express';
import { login, logout, signup } from '../controllers/userController.js';
const router = express.Router();

// signup
router.route('/signup').post(signup);

//login
router.route('/login').post(login);

//logout
router.route('/logout').get(logout);
 


export default router;