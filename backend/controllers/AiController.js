import { GoogleGenerativeAI } from "@google/generative-ai";
import Project from "../models/Project.js";
import Note from "../models/Note.js";

export const generateExplanation = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { projectId } = req.body;
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });
    
    const project = await Project.findOne({ _id: projectId,userId: req.user.userId});
    if (!project)
      return res.status(404).json({ error: "Project not found" });
    
    const notes = await Note.find({ projectId }).sort({ createdAt: -1 });

    const notesText = notes
      .slice(0, 10)
      .map(
        (note, i) =>
          `${i + 1}. ${note.title ? note.title + " - " : ""}${note.content}`
      )
      .join("\n");

    const prompt = `
You are an assistant helping a developer understand their project clearly.

PROJECT DETAILS:
Title: ${project.title}
Problem: ${project.problem}
Target Users: ${project.targetUsers}
Tech Stack: ${project.techStack}

PROJECT NOTES:
${notesText || "No notes provided."}

TASK:
Using ONLY the information from the project details and notes above:
- Write a clear, concise explanation of what this project is about
- Explain the problem being solved
- Explain how the solution works at a high level
- Keep it simple and developer-friendly
- Do NOT invent features or assumptions not mentioned
- Do NOT include code unless absolutely necessary

FORMAT:
- Use markdown
- Use short sections with headings
- Keep the explanation easy to read

OUTPUT:
A well-structured explanation suitable for documentation or revision.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let response = result.response.text();
    response = response.replace(/##\s*/g, "\n\n## ");
    response = response.replace(/(##\s+[^\n]+)(\s+)/g, "$1\n\n");

    res.status(200).json({ explanation: response });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};
