import { tryCatchAsync } from "../middlewares/tryCatchAsync.js";
import { Stats } from "../models/Stats.js";
import { sendMail } from "../utils/sendMails.js";


export const Contact = tryCatchAsync(async(req, res, next) => {
    const { name, email, message } = req.body;
    if(!name || !email || !message){
        return next(new Error("Please Enter all fields"));
    }

    const to = process.env.MY_MAIL;

    const subject = "Contact From StudentCompass" ;
    const text = ` I'm : ${name} \n Email: ${email} \n Message: ${message}`;

    await sendMail(to, subject, text);

    res.status(200).json({
        success: true,
        message: "Your message has been sent successfully",
    });
});

export const Request = tryCatchAsync(async(req, res, next) => {
    
    const { name, email, course } = req.body;
    if(!name || !email || !course){
        return next(new Error("Please Enter all fields"));
    }

    const to = process.env.MY_MAIL;

    const subject = "Request For Course From StudentCompass" ;
    const text = `  I'm : ${name} \n Email: ${email} \n Course: ${course}`;

    await sendMail(to, subject, text);

    res.status(200).json({
        success: true,
        message: "Your request has been sent successfully",
    });
});


export const dashboardStats = tryCatchAsync(async(req, res, next) => {
    
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(12);

    const statsData = [];
    
    for(let i = 0; i<stats.length; i++){
        statsData.unshift(stats[i]);
    }
    const requiredSize = 12 - stats.length;

    for(let i = 0; i<requiredSize; i++){
        statsData.unshift({users: 0, subscription: 0, views: 0});
    }

    const usersCnt = statsData[11].users;
    const subscriptionCnt = statsData[11].subscription;
    const viewsCnt = statsData[11].views;

    let usersProfit = true, subscriptionProfit = true, viewsProfit = true;

    let userPercent = 0, subscriptionPercent = 0, viewsPercent = 0;

    if(statsData[10].users === 0)userPercent = usersCnt * 100;

    if(statsData[10].subscription === 0)subscriptionPercent = subscriptionCnt * 100;

    if(statsData[10].views === 0)viewsPercent = viewsCnt * 100;

    else{
        const diff = {
            users: statsData[11].users - statsData[10].users,
            subscription: statsData[11].subscription - statsData[10].subscription,
            views: statsData[11].views - statsData[10].views,
        };

        userPercent = (diff.users / statsData[10].users) * 100;
        subscriptionPercent = (diff.subscription / statsData[10].subscription) * 100;

        viewsPercent = (diff.views / statsData[10].views) * 100;


        if(userPercent < 0)usersProfit = false;
        if(subscriptionPercent < 0)subscriptionProfit = false;
        if(viewsPercent < 0)viewsProfit = false;

    }

    res.status(200).json({
        success: true,
        stats: statsData,
        usersCnt,
        subscriptionCnt,
        viewsCnt,
        subscriptionProfit,
        usersProfit,
        viewsProfit,
        userPercent,
        subscriptionPercent,
        viewsPercent,
        
    });
});