// src/store/noteStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

export const useNoteStore = create((set) => ({
  notes: [],
  isLoading: false,
  error: null,
  tags:"",

  	getAllNotes: async () => {
  	  	set({ isLoading: true, error: null });
  	  	try {
  	  		const response = await axiosInstance.get("/get-all-notes");
  	  		// check response data and set notes
  	  		if (response.data && response.data.notes) {
  	  		  set({ notes: response.data.notes, isLoading: false });
  	  		} else {
  	  		  set({ notes: [], isLoading: false });
  	  		}
  	  	} catch (error) {
  	  	  	set({
  	  	  	  error: error.response?.data?.message || "Failed to fetch notes",
  	  	  	  isLoading: false,
  	  	  	});
  	  	}
  	},
  	addNote: async (title, content, tags) => {
		set({isLoading: true, error: null});
		try {
			const response = await axiosInstance.post("/add-note", { title, content, tags });
			if (response.data && response.data.notes) {
  	  		  set({ notes: response.data.notes, isLoading: false });
  	  		} else {
  	  		  set({ notes: [], isLoading: false });
  	  		}
  	  	} catch (error) {
  	  	  	set({
  	  	  	  error: error.response?.data?.message || "Failed to fetch notes",
  	  	  	  isLoading: false,
  	  	  	});
  	  	}
  	},
}));
