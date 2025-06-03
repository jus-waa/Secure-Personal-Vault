import express from "express";
import {
    login,
    signup,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth
} from '../controllers/auth.controller.js';
import {
    validateToken
} from '../middleware/validateToken.js';
const router = express.Router();

//router auths
router.get("/check-auth", validateToken, checkAuth)

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;