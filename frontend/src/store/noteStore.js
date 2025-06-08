import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

export const useNoteStore = create((set) => ({
  notes: [],
  error: null,
  tags: "",

  getAllNotes: async () => {
    set({ error: null });
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        set({ notes: response.data.notes });
      } else {
        set({ notes: [] });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch notes",
      });
    }
  },

  addNote: async (title, content, tags) => {
    set({ error: null });
    try {
      const response = await axiosInstance.post("/add-note", { title, content, tags });
      if (response.data && response.data.notes) {
        set({ notes: response.data.notes });
      } else {
        set({ notes: [] });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add note",
      });
    }
  },

  editNote: async (id, title, content, tags) => {
    set({ error: null });
    try {
      const response = await axiosInstance.put(`/edit-note/${id}`, { title, content, tags });
      set({ notes: response.data.notes });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to edit note",
      });
    }
  },

  deleteNote: async (id) => {
    set({ error: null });
    try {
      const response = await axiosInstance.delete(`/delete-note/${id}`);
      set({ notes: response.data.notes });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete note",
      });
    }
  },

  pinNote: async (id, isPinned) => {
    set({ error: null });
    try {
      const response = await axiosInstance.patch(`/update-pinned-note/${id}`, { isPinned });
      set({ notes: response.data.notes });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to pin/unpin note",
      });
    }
  },
}));
