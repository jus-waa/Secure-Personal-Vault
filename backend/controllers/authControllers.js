import db from "../db/index.js";
import bcryptjs from "bcryptjs";

export const signupRoute = async (req, res) => {
    try {
        const {name, email, phone_number, password} = req.body;

        // check empty fields
        if (!name || !email || !phone_number || !password) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required.",
            });
        }

        // password hashing
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = (100000 + (Math.random() * 900000)).toString();
        const verificationTokenExpiresAt = new Date(Date.now());

        // check if email already exist
        // select all query
        const selectEmail = "SELECT email FROM users WHERE email = $1";
        const valueEmail = [email];

        const userExist = await db.query (selectEmail, valueEmail);
        if (userExist.rows.length > 0) {
            return res.status(400).json({
                status: "failed",
                message: "User already exist"
            });
        }

        // insert user into db
        const insertUser = 
            "INSERT INTO users (name, email, phone_number, hashed_password, verification_token, verification_token_expires_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const valueUser = [name, email, phone_number, hashedPassword, verificationToken, verificationTokenExpiresAt];

        const results = await db.query(insertUser, valueUser);
        const user = results.rows[0];


        // generate JWT token

        // send otp to email

        res.status(201).json({
            status: "success",
            message: "User created successfully. OTP has been sent.",
            user: {
                ...user,
                password: undefined,
            }
        });
    } catch (err) {
        console.error("Signup error: ", err);
        return res.status(500).json({
            status: "failed",
            message: err.message,
        });
    }
};
export const verifyEmail = async (req, res) => {};
export const loginRoute = async (req, res) => {};
export const logoutRoute = async (req, res) => {};