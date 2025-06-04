import express from "express";
import { 
    getNote,
    addNote,
    deleteNote 
} from "../controllers/notes.controller.js";
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

//router notes
router.use(validateToken); // All routes below require login

router.get("/get-note", getNote);
router.post("/add-note", addNote);
router.delete("/delete-note:id", deleteNote);

export default router;
