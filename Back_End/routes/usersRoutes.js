import express from 'express';
import { signup } from '../controllers/userController.js';
const router = express.Router();

// for new user
router.route('/signup').post(signup);

//login
 


export default router;