import express from "express";
import { generateExplanation } from "../controllers/AiController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/generate",authMiddleware, generateExplanation);

export default router;
