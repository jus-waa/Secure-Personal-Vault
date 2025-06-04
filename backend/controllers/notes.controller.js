import { Note } from "../models/note.model.js";

// Get all notes (not user-specific yet)
export const getNote = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

// Add a note 
export const addNote = async (req, res) => {
        const { title, content, tags } = req.body;
        const userId = req.userId;
    try {
        if (!title) {
            return res.status(400).json({
                status: "failed",
                message: "Title is required",
            });
        }
        if (!content) {
            return res.status(400).json({
                status: "failed",
                message: "Content is required",
            });
        }
        const newNote = new Note({
            userId,
            title,
            content,
            tags: tags || [],
        });
        await newNote.save();
        return res.status(201).json({
            status: "success",
            message: "Note added successfully",
        });
    } catch (error) {
        console.log("Error adding new note ", error);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
}

//

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note." });
  }
};
