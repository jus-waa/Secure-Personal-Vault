import bcrypt from "bcryptjs";
import { encrypt, decrypt } from "../utils/encryption.js";
import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";

// Get all notes
export const getAllNotes = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await Note.find({
            userId
        }).sort({ isPinned: -1});
        return res.status(200).json({
            status: "success",
            notes,
            message: "All notes retrieved successfully."
        });
    } catch (error) {
        console.log
        return res.status(400).json({
            status: "failed", 
            message: "Failed to fetch notes." 
        });
    }
};

// Add a note 
export const addNote = async (req, res) => {
    //get title, content, tags, and userId
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
        await newNote.save(); // always save
        //display message
        return res.status(201).json({
            status: "success",
            message: "Note added successfully",
        });
    } catch (error) {
        console.log("Error adding new note ", error);
        return res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
}

// Edit note
export const editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const userId = req.userId;

    try {
        if (!title && !content && !tags) {
            return res.status(400).json({
                status: "failed",
                message: "No changes",
            });
        }

        const note = await Note.findOne({ 
            _id: noteId, 
            userId, 
        });
        if (!note) {
            return res.status(404).json({
                status: "failed",
                message: "Note not found."
            });
        }

        // ✅ Block edits if note is locked
        if (note.locked) {
            return res.status(403).json({
                status: "failed",
                message: "Cannot edit a locked note. Please unlock it first.",
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            status: "success",
            message: "Note updated successfully."
        });
    } catch (error) {
        console.log("Error updating note:", error);
        return res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.userId;
    try {
        //get the note via noteId
        const note = await Note.findOne({
            _id: noteId,
            userId
        })
        //if note not found
        if(!note) {
            return res.status(404).json({
                status: "failed",
                message: "Note not found."
            })
        }
        await Note.deleteOne({
            _id: noteId,
            userId
        });
        //display message
        return res.status(200).json({
            status: "success",
            note,
            message: "Note deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({
            status: "failed", 
            message: "Failed to delete note." 
        });
    }

};

export const isPinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const userId = req.userId;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({
        status: "failed",
        message: "Note not found.",
      });
    }

    note.isPinned = isPinned;  // directly assign without if check
    await note.save();

    // fetch updated notes list
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      notes,  // <-- send updated notes here
    });
  } catch (error) {
    console.log("Error updating note pin status:", error);
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const lockNote = async (req, res) => {
    console.log("lockNote controller hit");
    const noteId = req.params.noteId;
    const { password } = req.body;
    const userId = req.userId;

    try {
        if (!password) {
            return res.status(400).json({
                status: "failed",
                message: "Password is required to lock the note.",
            });
        }

        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({
                status: "failed",
                message: "Note not found.",
            });
        }

        if (!note.content) {
            return res.status(400).json({
                status: "failed",
                message: "Note content is missing, cannot encrypt.",
            });
        }

        // Wrap encryption in a try block for clarity
        let encryptedContent;
        try {
            encryptedContent = encrypt(note.content);  // may throw if crypto fails
        } catch (err) {
            console.error("Error locking note::", err);
            return res.status(500).json({
                status: "failed",
                message: error.message || "Failed to lock the note.",
            });
        }

        note.content = JSON.stringify(encryptedContent); // ✅ Store safely

        const hashedPassword = await bcrypt.hash(password, 10);
        note.locked = true;
        note.lockPassword = hashedPassword;

        await note.save();

        return res.status(200).json({
            status: "success",
            message: "Note locked successfully.",
        });

    } catch (error) {
        console.error("Error locking note:", error);
        return res.status(500).json({
            status: "failed",
            message: "Failed to lock the note.",
        });
    }
};


export const unlockNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { password } = req.body;
    const userId = req.userId;

    console.log("UNLOCK ATTEMPT");
    console.log("Note ID:", noteId);
    console.log("User ID:", userId);
    console.log("Entered password:", password);

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note || !note.locked) {
            console.log("Note not found or not locked.");
            return res.status(404).json({
                status: "failed",
                message: "Note not found or not locked.",
            });
        }

        console.log("Stored hash:", note.lockPassword);

        const isMatch = await bcrypt.compare(password, note.lockPassword);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                status: "failed",
                message: "Incorrect password.",
            });
        }
        const decryptedContent = decrypt(JSON.parse(note.content));
        note.content = decryptedContent;

        // If password matches, unlock the note
        note.locked = false;
        note.lockPassword = null;

        await note.save();

        return res.status(200).json({
            status: "success",
            message: "Note unlocked successfully.",
            note: {
                _id: note._id,
                title: note.title,
                content: note.content,
                tags: note.tags,
                isPinned: note.isPinned,
                locked: note.locked, // include this so frontend reflects state
            },
        });
        } catch (error) {
            console.error("Error unlocking note:", error);
            return res.status(500).json({
                status: "failed",
                message: "Failed to unlock the note.",
            });
        }
};
export const deleteLockedNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { password } = req.body;
  const userId = req.userId;

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ status: "failed", message: "Note not found." });
    }

    if (note.locked && note.lockPassword) {
      const isMatch = await bcrypt.compare(password, note.lockPassword);
      if (!isMatch) {
        return res.status(401).json({ status: "failed", message: "Incorrect password." });
      }
    }

    await Note.deleteOne({ _id: noteId, userId });
    return res.status(200).json({ status: "success", message: "Note deleted successfully." });

  } catch (error) {
    console.error("Error deleting locked note:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error deleting locked note.",
    });
  }
};

export const getNoteById = async (req, res) => {
    const { noteId } = req.params;
    const userId = req.userId;

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ status: "failed", message: "Note not found" });
        }

        let decryptedContent = note.content;
        if (note.locked && typeof note.content === "string") {
            try {
                decryptedContent = decrypt(JSON.parse(note.content));
            } catch (error) {
                return res.status(400).json({ status: "failed", message: "Decryption failed" });
            }
        }

        return res.status(200).json({
            status: "success",
            note: {
                ...note._doc,
                content: decryptedContent,
            },
        });
    } catch (error) {
        console.error("getNoteById error:", error);
        return res.status(400).json({ status: "failed", message: error.message });
    }
};
export const forgotPasswordUnlock = async (req, res) => {
  const noteId = req.params.noteId;
  const { email, password } = req.body;

  try {
    const note = await Note.findById(noteId);
    if (!note || !note.locked) {
      return res.status(404).json({
        status: "failed",
        message: "Note not found or not locked.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid account password.",
      });
    }

    // Credentials match – permanently unlock note
    const decryptedContent = decrypt(JSON.parse(note.content));
    note.content = decryptedContent;
    note.locked = false;
    note.lockPassword = null;

    await note.save();

    return res.status(200).json({
      status: "success",
      message: "Note unlocked via account credentials.",
      note: {
        _id: note._id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        isPinned: note.isPinned,
        locked: note.locked,
      },
    });
  } catch (error) {
    console.error("Forgot password unlock error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error unlocking note.",
    });
  }
};

export const unlockNoteWithCredentials = async (req, res) => {
    const { noteId } = req.params;
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "failed", message: "Invalid email or password." });
        }

        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note || !note.locked) {
            return res.status(404).json({ status: "failed", message: "Note not found or not locked." });
        }

        const decryptedContent = decrypt(JSON.parse(note.content));

        note.content = decryptedContent;
        note.locked = false;
        note.lockPassword = null;

        await note.save();

        return res.status(200).json({
            status: "success",
            message: "Note permanently unlocked using account credentials.",
            note: {
                _id: note._id,
                title: note.title,
                content: note.content,
                tags: note.tags,
                isPinned: note.isPinned,
                locked: false,
            },
        });
    } catch (error) {
        console.error("unlockNoteWithCredentials error:", error);
        return res.status(500).json({
            status: "failed",
            message: "Server error during unlock by credentials.",
        });
    }
};


