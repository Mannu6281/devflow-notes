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
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
