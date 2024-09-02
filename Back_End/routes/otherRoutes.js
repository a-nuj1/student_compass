import express from 'express';
import { Contact, dashboardStats, Request } from '../controllers/otherController.js';
import { adminOnly, isAuthentic } from '../middlewares/auth.js';

const router = express.Router();


// contact form
router.route('/contact').post(Contact)

//request form
router.route('/courserequest').post(Request)

// Get Admin Dashboard Stats

router.route('/admin/stats').get(isAuthentic,adminOnly,dashboardStats);

export default router;