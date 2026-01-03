import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors'

dotenv.config()

if (!process.env.MONGO_URI || !process.env.GEMINI_API_KEY) {
  console.error("Missing environment variables");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors())
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

mongoose.connect(process.env.MONGO_URI)
        .then(()=>{console.log("Connected to MongoDB")
            app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
        })
        .catch((err)=>{console.log(err)})
      
const projectSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    problem:{
        type: String,
        required: true
    },
    targetUsers:{
        type: String,
        required: true
    }, 
    techStack:{
        type: String,
        required:true
    },
},
{timestamps: true})

const Project= mongoose.model('Project',projectSchema)

app.get('/',(req,res)=>{
    res.send("Backend is running")
})

// creating and fetching projects

app.post('/api/projects', async(req,res)=>{
    try{
        const project=new Project(req.body);
        const savedProject=await project.save();
        res.status(201).json(savedProject)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})
//fetch all projects
app.get('/api/projects', async(req,res)=>{
    try{
        const projects = await Project.find().sort({createdAt: -1});
        res.status(200).json(projects)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
//fetch a particular project
app.get('/api/projects/:id',async(req,res)=>{
    try{
        const project= await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({error: 'Project not found'})
        }
        res.status(200).json(project)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
//update a project
app.put('/api/projects/:id',async(req,res)=>{
    try{
        const updatedProject = await Project.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedProject){
            return res.status(404).json({error:'Project not found.'})
        }
        res.status(200).json(updatedProject)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

// delete a project
app.delete('/api/projects/:id',async(req,res)=>{
    try{
        const project=await Project.findByIdAndDelete(req.params.id)

        if(!project){
            return res.status(404).json({error: 'Project not found'})
        }
         await Note.deleteMany({projectId:req.params.id})
        
         res.status(200).json({message:"Project deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})



const notesSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Project'
    },
    title:{
        type: String,
    },
    content:{
        type: String,
        required: true
    }
},{timestamps: true})

const Note = mongoose.model('Note',notesSchema)

// creating and fetching notes

app.get('/api/notes/:projectId',async(req,res)=>{
    try{
        const notes = (await Note.find({projectId: req.params.projectId}).sort({createdAt: -1}));
        res.status(200).json(notes)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

app.get('/api/notes/:projectId/:noteId',async(req,res)=>{
    try{
        const note = await Note.findById(req.params.noteId)
        
        if (!note) {
      return res.status(404).json({ error: "Note not found" });
        }
      res.status(200).json(note)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

app.post('/api/notes',async(req,res)=>{
   try{
    const note= new Note(req.body)
    const savedNote= await note.save()
    res.status(201).json(savedNote)
   }
   catch(error){
    res.status(400).json({error: error.message})
   }
})
//updating note

app.put('/api/notes/:projectId/:noteId',async(req,res)=>{
    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.noteId,req.body,{new:true})
        if(!updatedNote){
            return res.status(404).json({error: 'Note not found'})
        }
        res.status(200).json(updatedNote)
        
    }catch(error){
        res.status(500).json({error: error.message})

    }
})

//deleting note

app.delete('/api/notes/:projectId/:noteId',async(req,res)=>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.noteId)

        if(!deletedNote){
            return res.status(404).json({error:"Note not found"})
        }
        res.status(200).json({message: "Note deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
//gemini ai route

app.post('/api/ai/generate',async(req,res)=>{
    try{
        const {projectId}=req.body

        if(!projectId){
            return res.status(400).json({error: "Project ID is required"})
        }

        const project = await Project.findById(projectId)

        if(!project){
            return res.status(404).json({error: "Project not found"})
        }

        const notes = await Note.find({projectId}).sort({createdAt: -1})

        const notesText = notes.slice(0,10).map((note,index)=>`${index+1}.${note.title? note.title+'-':''}${note.content}`).join('\n')
        
        const prompt = `
You are an AI assistant helping a developer explain their project clearly to hackathon judges.

You MUST generate the output in VALID, STRUCTURED MARKDOWN.

====================
PROJECT DETAILS
====================
Project Title: ${project.title}
Problem: ${project.problem}
Target Users: ${project.targetUsers}
Tech Stack: ${project.techStack}

====================
DEVELOPER NOTES
====================
${notesText || "No notes provided."}

====================
IMPORTANT FORMATTING RULES (MUST FOLLOW)
====================
- Output ONLY valid Markdown
- EVERY section heading must start on its OWN LINE
- Insert a BLANK LINE after each heading
- NEVER place headings in the middle of a sentence
- Use bullet points where appropriate
- Do NOT write everything as one paragraph
- Do NOT include explanations outside Markdown

====================
REQUIRED STRUCTURE
====================
Use EXACTLY this structure and order:

## Project Title
(write the project title here)

## Problem
(explain the problem clearly in 2-3 sentences)

## Solution
(explain how this project solves the problem)

## How It Works
(use bullet points)

## Tech Stack
(use bullet points)

====================
EXAMPLE OUTPUT FORMAT (FOLLOW EXACTLY)
====================

## Project Title
DevFlow Notes

## Problem
Hackathon participants often struggle to clearly and confidently explain their projects to judges within a short time frame.

## Solution
DevFlow Notes helps developers transform scattered ideas and notes into clear, structured, and judge-friendly project explanations using AI.

## How It Works
- Users create a project and add development notes
- The AI analyzes recent notes and project details
- A concise and well-structured explanation is generated

## Tech Stack
- React
- Node.js
- MongoDB Atlas
- Gemini API

====================
TASK
====================
Now generate the explanation for THIS project using the exact format above.`


        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"})
        const result = await model.generateContent(prompt)
        let response = result.response.text()
        response = response.replace(/##\s*/g, "\n\n## ");
        response = response.replace(
        /(##\s+[^\n]+)(\s+)/g,
        "$1\n\n")
        
        
        res.status(200).json({explanation :response})
    }
    catch(error){
        console.error("AI Generation Error:", error)
        res.status(500).json({error: 'Failed to generate explanation'})
    }

    

})