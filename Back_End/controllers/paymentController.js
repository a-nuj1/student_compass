import { tryCatchAsync } from "../middlewares/tryCatchAsync.js";
import { Payment } from "../models/Payment.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import ErrorResolve from "../utils/errorResolve.js";
import crypto from "crypto";

// Create a subscription || get subscription
export const createSubscription = tryCatchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return next (new ErrorResolve("Admin cannot subscribe", 400));
    }

    const Subscription = await instance.subscriptions.create({
        plan_id: process.env.PLAN_ID || "plan_OrrNxLX2IWsLwz",
        total_count: 12,
        customer_notify: 1,
    });

    user.subscription.id = Subscription.id;
    user.subscription.status = Subscription.status;

    await user.save();
    res.status(201).json({
        success: true,
        SubscriptionId: Subscription.id,
    });
});



// Verify the payment
export const verifyPayments = tryCatchAsync(async (req, res, next) => {

    const {razorpay_signature, razorpay_payment_id, razorpay_subscription_id} = req.body;

    const user = await User.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(razorpay_payment_id + "|" + subscription_id, 'utf8')
        .digest('hex');

    const isSignatureValid = generated_signature === razorpay_signature;

    if(!isSignatureValid){
        return res.redirect(`${process.env.FRONTEND_URL}/payment-fail`);
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    })

    user.subscription.status = "active";

    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}`);
});


// Get the razorpay key
export const getRazorPayKey = tryCatchAsync(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY,
    });
});


// Cancel the subscription
export const cancelSubscription = tryCatchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const subscription_id = user.subscription.id;

    let refund = false;
    instance.subscriptions.cancel(subscription_id, refund);

    const payment = await Payment.findOne({razorpay_subscription_id: subscription_id});

    const gap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if(gap < refundTime){
        instance.payments.refund(payment.razorpay_payment_id);
        refund = true;
    }

    await payment.deleteOne();
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: refund 
        ? "Subscription cancelled successfully, You will get refund soon..."
        : "Subscription cancelled successfully No refund initiated as refund time is over",
    });
});