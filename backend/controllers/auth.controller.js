import bcryptjs from "bcryptjs";
import crypto from "crypto";
///test commit again
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { 
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
} from "../mailtrap/emails.js";
export const signup = async(req, res) => {
    //get email, password, name
    const {email, password, name} = req.body;
    try {
        //check for empty fields
        if(!email || !password || !name){
            throw new Error("All fields are required.");
        }
        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                status: "failed",
                message: "User already exists."
            });
        }
        //hashing password
        const hashedPassword =  await bcryptjs.hash(password, 12);
        //create token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email, 
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 //10 minutes
        })
        //save the user to db
        await user.save();
        //auth via jwt
        generateTokenAndSetCookie(res, user._id);
        //send verification email
        await sendVerificationEmail(user.email, verificationToken);
        //display message
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        //display error
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

export const verifyEmail = async(req, res) => {
    //code sample: 1 2 3 4 5 6 
    const {code} = req.body;
    try {
        //checking verification token and if its not expired
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }      
        })
        //if its not the user
        if(!user){
            return res.status(400).json({
                status: "failed",
                message: "Invalid or expired verificaiton code" 
            });
        }
        //after verifying remove token and expiration
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        //display message
        res.status(200).json({
            status: "success",
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error email verification", error);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

export const forgotPassword = async(req, res) => {
    // get email
    const {email} = req.body;
    try {
        //check if its really the email
        if(!email){
            throw new Error("Please enter your email.");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                status: "failed",
                message: "User doesn't exist."
            })
        }
        //create reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; //10 mins

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();
        //jwt for sending token to email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/password-reset/${resetToken}`);
        //display message
        res.status(200).json({
            status: "success",
            message: "Password reset link has been sent.",
        });
    } catch (error) {
        console.log("Error forgot password ", error);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

export const resetPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        
    } catch (error) {
        
    }
};

export const login = async(req, res) => {
    //get email, password
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        //check if user input is valid
        if(!user){
            return res.status(400).json({
                status: "failed",
                message: "Invalid credentials" 
            });
        }
        //check for pasword validity
        const passwordValidity = await bcryptjs.compare(password, user.password);
        if(!passwordValidity){
            return res.status(400).json({
                status: "failed",
                message: "Invalid password" 
            });
        }
        //jwt again
        generateTokenAndSetCookie(res, user._id);
        //update timestamp user last login
        user.lastLogin = new Date();
        await user.save();
        //display message
        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        //display error
        console.log("Login error ", error);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log("Logout Failed", error)
        res.status(200).json({
            status: "failed",
            message: error.message,
        });
    }
};