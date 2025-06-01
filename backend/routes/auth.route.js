import express from "express";
import {
    login,
    signup,
    logout,
    verifyEmail
} from '../controllers/auth.controller.js';
const router = express.Router();

//router auths
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
export default router;