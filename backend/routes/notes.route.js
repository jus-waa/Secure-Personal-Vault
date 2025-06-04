import express from "express";
import { 
    getAllNotes,
    addNote,
    editNote,
    deleteNote, 
    isPinned
} from "../controllers/notes.controller.js";
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

//router notes
router.use(validateToken); // All routes below require login

router.get("/get-all-notes", getAllNotes);
router.post("/add-note", addNote);
router.put("/edit-note/:noteId", editNote);
router.delete("/delete-note/:noteId", deleteNote);
router.put("update-pinned-note", isPinned);

export default router;
