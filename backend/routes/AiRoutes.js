import express from "express";
import { generateExplanation } from "../controllers/AiController.js";

const router = express.Router();

router.post("/generate", generateExplanation);

export default router;
