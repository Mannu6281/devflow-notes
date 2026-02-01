import Note from "../models/Note.js";
import Project from "../models/Project.js";

export const getNotes = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user.userId });
    if (!project)
      return res.status(404).json({ error: "Project not found" });
    const notes = await Note.find({
      projectId: req.params.projectId
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.noteId, projectId: req.params.projectId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    const project = await Project.findOne({_id: req.params.projectId, userId: req.user.userId});
    if (!project) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user.userId })
    if(!project)
      return res.status(404).json({ error: "Project not found" });

    const note = new Note({projectId: req.params.projectId, ...req.body});
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user.userId })
    if(!project)
      return res.status(404).json({ error: "Project not found" });

    const updated = await Note.findOneAndUpdate(
      {_id:req.params.noteId, projectId: req.params.projectId},
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
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user.userId })
    if(!project)
      return res.status(404).json({ error: "Project not found" });
    const deleted = await Note.findOneAndDelete({_id: req.params.noteId, projectId: req.params.projectId});
    if (!deleted)
      return res.status(404).json({ error: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
