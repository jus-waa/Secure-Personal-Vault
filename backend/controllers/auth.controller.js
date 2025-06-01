import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async(req, res) => {
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
                success: false,
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
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 //1 hour
        })
        //save the user to db
        await user.save();
        //auth via jwt
        generateTokenAndSetCookie(res, user._id);
        
        //display message
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        //display error
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async(req, res) => {

}

export const logout = async(req, res) => {

}