import Project from "../models/Project.js";
import Note from "../models/Note.js";

export const createProject = async (req, res) => {
  try {
    const userId = req.user.userId
    const project = await Project.create({ ...req.body, userId});
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId
    const projects = await Project.find({userId: userId}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id:req.params.id,userId: req.user.userId});
    if (!project)
      return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Project not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id, userId: req.user.userId });
    if (!project)
      return res.status(404).json({ error: "Project not found" });

    await Note.deleteMany({ projectId: req.params.id });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
