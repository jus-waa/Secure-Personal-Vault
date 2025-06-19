import React, { useState, useEffect } from 'react';
import TagInput from "../components/input/TagInput";
import { MdClose } from "react-icons/md";
import { useNoteStore } from "../store/noteStore";
import toast from "react-hot-toast";

const AddEditNotes = ({ noteData, type, onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const { addNote, getAllNotes, editNote } = useNoteStore();

    // If editing, prefill
    useEffect(() => {
        if (type === "edit" && noteData) {
            setTitle(noteData.title || "");
            setContent(noteData.content || "");
            setTags(noteData.tags || []);
        }
    }, [type, noteData]);

    const addNewNote = async () => {
        try {
            await addNote(title, content, tags);
            await getAllNotes();
            toast.success("Note added successfully!");
            onClose();
        } catch (err) {
            toast.error("Failed to add note");
        }
    };

    const handleAddNote = async () => {
      if (!title) return toast.error("Please enter the title");
      if (!content) return toast.error("Please enter the content");

      try {
        if (type === "edit" && noteData?._id) {
          await editNote(noteData._id, title, content, tags);
          toast.success("Note updated!");
        } else {
          await addNote(title, content, tags);
          toast.success("Note added successfully!");
        }
        await getAllNotes();
        onClose();
      } catch (err) {
        toast.error("Action failed");
      }
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Go To Gym at 5"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            <button
                className="btn-primary bg-blue-600 font-medium mt-5 p-3"
                onClick={handleAddNote}
            >
                {type === "edit" ? "UPDATE" : "ADD"}
            </button>
            {type === "edit" && noteData?.locked && (
                <button
                    className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 mt-4"
                    onClick={async () => {
                    const password = prompt("Enter a new password to re-lock this note:");
                    if (!password) return toast.error("Password is required");

                    const res = await fetch(`http://localhost:3000/api/v1/notes/lock-note/${noteData._id}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ password }),
                    });

                    if (res.ok) {
                        toast.success("Note re-locked.");

                        // Notify parent (Homepage) to remove unlocked state
                        if (typeof window !== "undefined") {
                            const event = new CustomEvent("relockNote", { detail: noteData._id });
                            window.dispatchEvent(event);
                        }

                        onClose(); // Closes the modal
                    } else {
                        toast.error("Failed to lock note again.");
                    }
                    }}
                >
                    🔒 Lock Again
                </button>
                )}

        </div>
    );
};

export default AddEditNotes;
