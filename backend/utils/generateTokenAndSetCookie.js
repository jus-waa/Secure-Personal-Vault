import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    //creates the jwt token
    const token =  jwt.sign({userId}, process.env.JWT_KEY, {
        expiresIn: "7d",
    })
    //sets the a cookie in the user's browser called token
    res.cookie("token", token, {
        //cookie options
        httpOnly: true,//prevents XSS attacks/client-side access
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d in ms
        path: "/" //ensure cookie is sent to all routes
    });

    return token;
};