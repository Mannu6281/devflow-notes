import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/NoteController.js";

const router = express.Router();

router.get("/:projectId", getNotes);
router.get("/:projectId/:noteId", getNoteById);
router.post("/", createNote);
router.put("/:projectId/:noteId", updateNote);
router.delete("/:projectId/:noteId", deleteNote);

export default router;
