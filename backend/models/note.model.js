import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  locked: {
    type: Boolean,
    default: false,
  },
  lockPassword: {
    type: String,
    default: null,
  },
   createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Note = mongoose.model("Note", noteSchema);