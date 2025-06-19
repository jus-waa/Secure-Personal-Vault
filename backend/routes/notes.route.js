import express from "express";
import { 
    getAllNotes,
    addNote,
    editNote,
    deleteNote, 
    isPinned,
    lockNote,
    unlockNote,
    deleteLockedNote,
    getNoteById,
    unlockNoteWithCredentials,
    forgotPasswordUnlock,
} from "../controllers/notes.controller.js";
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

//router notes
router.use(validateToken); // All routes below require login    

router.get("/get-all-notes", getAllNotes);
router.post("/add-note", addNote);
router.put("/edit-note/:noteId", editNote);
router.delete("/delete-note/:noteId", deleteNote);
router.patch("/update-pinned-note/:noteId", isPinned);
router.post("/lock-note/:noteId", lockNote);
router.post("/unlock-note/:noteId", unlockNote);
router.post("/delete-locked/:noteId", deleteLockedNote);
router.get("/get-note/:noteId", getNoteById);
router.post("/unlock-note-by-credentials/:noteId", unlockNoteWithCredentials);
router.post("/forgot-password-unlock/:noteId", forgotPasswordUnlock); // <-- No auth

export default router;
