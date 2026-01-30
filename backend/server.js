import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Db.js";

import projectRoutes from "./routes/ProjectRoutes.js";
import noteRoutes from "./routes/NoteRoutes.js";
import aiRoutes from "./routes/AiRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
dotenv.config();

if (!process.env.MONGO_URI || !process.env.GEMINI_API_KEY) {
  console.error("Missing environment variables");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://devflow-notes.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/projects", projectRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
