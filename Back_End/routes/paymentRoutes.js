import express from 'express';
import { isAuthentic } from '../middlewares/auth.js';
import { cancelSubscription, createSubscription, getRazorPayKey, verifyPayments } from '../controllers/paymentController.js';

const router = express.Router();

//buy supscription
router.route('/subscribe').get(isAuthentic, createSubscription);

// payment verification
router.route('/paymentverify').post(isAuthentic, verifyPayments);

// get razorpay key
router.route('/razorpaykey').get(getRazorPayKey);

// cancel subscription
router.route('/subscribe/cancel').delete(isAuthentic, cancelSubscription);

export default router;