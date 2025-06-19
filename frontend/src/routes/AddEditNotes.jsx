import React, { useState, useEffect } from 'react';
import TagInput from "../components/input/TagInput";
import { MdClose } from "react-icons/md";
import { LuBookLock } from "react-icons/lu";
import { useNoteStore } from "../store/noteStore";
import toast from "react-hot-toast";

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const { addNote, editNote, getAllNotes } = useNoteStore();

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
    }
  }, [type, noteData]);

  const handleAddOrUpdate = async () => {
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

    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const handleRelock = () => {
    onClose(); // close the edit modal first
    if (typeof window !== "undefined") {
        const event = new CustomEvent("openRelockModal", { detail: noteData._id });
        window.dispatchEvent(event); // trigger modal from Homepage
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
          placeholder="Note title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Write your note content here..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <div className="flex gap-3 items-center mt-5">
        <button
          className="btn-primary bg-blue-600 font-medium px-4 py-2"
          onClick={handleAddOrUpdate}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>

        {type === "edit" && noteData?.locked && (
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
            onClick={() => {
                onClose(); // Close the current modal to prevent triple-layering
                window.dispatchEvent(new CustomEvent("openRelockModal", { detail: noteData._id }));
            }}

          >
            <LuBookLock className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddEditNotes;
