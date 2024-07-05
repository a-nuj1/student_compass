export const sendToken = (user, statusCode = 200, res, message) => {
    const token = user.getJWTToken();
    const options = {
        expires:new Date(Date.now()+ 15 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        // secure: true,
        sameSite: "none",

    };
    res.status(statusCode).cookie("token",token, options).json({
        success: true,
        message,
        user,

    });
};