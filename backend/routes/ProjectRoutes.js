import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/",authMiddleware, createProject);
router.get("/",authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
