import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/NoteController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/:projectId",authMiddleware, getNotes);
router.get("/:projectId/:noteId", authMiddleware, getNoteById);
router.post("/:projectId", authMiddleware, createNote);
router.put("/:projectId/:noteId", authMiddleware, updateNote);
router.delete("/:projectId/:noteId", authMiddleware, deleteNote);
export default router;
