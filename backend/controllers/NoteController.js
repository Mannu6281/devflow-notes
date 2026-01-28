import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      projectId: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Note not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.noteId);
    if (!deleted)
      return res.status(404).json({ error: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
