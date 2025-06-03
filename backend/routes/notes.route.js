import express from "express";
import { getNotes, createNote, deleteNote } from "../controllers/notes.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyToken); // All routes below require login

router.get("/get-notes", getNotes);
router.post("/create-notes", createNote);
router.delete("/delete-notes:id", deleteNote);

export default router;
