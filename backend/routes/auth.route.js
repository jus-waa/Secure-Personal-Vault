import express from "express";
import {
    login,
    signup,
    logout,
    verifyEmail,
    forgotPassword
} from '../controllers/auth.controller.js';
const router = express.Router();

//router auths
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

export default router;