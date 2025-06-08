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
        </div>
    );
};

export default AddEditNotes;
