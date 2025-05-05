import express from "express";
import {
    signupRoute,
    verifyEmail,
    loginRoute,
    logoutRoute
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signupRoute);
router.post("/verify-email", verifyEmail);
router.post("/login", loginRoute);
router.post("/logout", logoutRoute);

export default router;