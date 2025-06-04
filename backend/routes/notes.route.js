import express from "express";
import { 
    getNotes,
    addNotes,
    createNote,
    deleteNote 
} from "../controllers/notes.controller.js";
//import { verifyToken } from "../middleware/auth.middleware.js";
import { validateToken } from '../middleware/validateToken.js';
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

//router notes
router.use(validateToken); // All routes below require login

router.get("/get-notes", getNotes);
router.post("/add-notes", verifyToken, addNotes);
router.post("/create-notes", createNote);
router.delete("/delete-notes:id", deleteNote);

export default router;
