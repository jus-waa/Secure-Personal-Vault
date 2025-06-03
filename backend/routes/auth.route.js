import express from "express";
import {
    login,
    signup,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller.js';
const router = express.Router();

//router auths
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password:token", resetPassword);


export default router;