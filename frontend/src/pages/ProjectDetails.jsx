import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import ReactMarkdown from "react-markdown";


const api = 'http://localhost:5000'

const ProjectDetails = () => {

    const navigate = useNavigate()

    const[notes, setNotes]=useState([])
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
   const [error, setError]=useState("")
   const [project, setProject]=useState(null)
   const [explanation, setExplanation] = useState("")
   const [generating, setGenerating] = useState(false)
   const [loadingDetails, setLoadingDetails]=useState(false)
   const [loadingNotes, setLoadingNotes]=useState(false)
   const [editing, setEditing]=useState(false)
   const [problem, setProblem]=useState("")
   const [targetUsers, setTargetUsers]=useState("")
   const [techStack, setTechStack]=useState("")
   const [projectTitle, setProjectTitle]=useState("")

   const {projectId}=useParams()

   const handleGenerateExplanation= async()=>{
    try{
        setGenerating(true)
        const res=await axios.post(`${api}/api/ai/generate`,{projectId: projectId})
        setExplanation(res.data.explanation)
    }catch(error){
        alert("Failed to generate explanation")
         console.error("AI Generation Error:", error);
    }finally{
        setGenerating(false)
    }
   }


   const fetchProjectDetails= async()=>{
    try{
        setLoadingDetails(true)
        const res = await axios.get(`${api}/api/projects/${projectId}`)
        if(res.data){
            setProject(res.data)
            setProjectTitle(res.data.title)
            setProblem(res.data.problem)
            setTargetUsers(res.data.targetUsers)
            setTechStack(res.data.techStack)
        }
        else{
            setError("Project not found")
        }
    }
    catch(err){
        setError("Failed to fetch project details")
    }
    finally{
        setLoadingDetails(false)
    }

   }

   const editProject = async()=>{
    try{
        const res = await axios.put(`${api}/api/projects/${projectId}`,{title: projectTitle,problem,targetUsers,techStack})
        if(res.data){
            setProject(res.data)
            setEditing(false)
        }
    }catch(err){
        alert("Failed to edit project")
        console.log(err)
    }
   }
   const deleteProject = async()=>{
    if(!confirm("Delete this project")) return;
    try{
        await axios.delete(`${api}/api/projects/${projectId}`)
        navigate('/')
    }catch(err){
        alert("Failed to delete project")
        console.log(err)
    }
   }

   const handleAddNote=async()=>{
    if(!content){
        return alert("Content is required")
    }
    try{
        const res= await axios.post(`${api}/api/notes`,{projectId,title,content})
        setNotes((prev)=>[res.data,...prev])
        setTitle("")
        setContent("")
    }
    catch(err){
        alert("Failed to add note")
    }
   }

   const fetchNotes=async()=>{
        try{
            setLoadingNotes(true)
            const res= await axios.get(`${api}/api/notes/${projectId}`)
            if(res.data){
                setNotes(res.data)
            }
        }catch(err){
            alert("Failed to fetch notes")
        }finally{
            setLoadingNotes(false)
        }
   }

   useEffect(()=>{
    fetchProjectDetails()
    fetchNotes()
   },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <button 
            onClick={()=>navigate('/')} 
            className="sticky top-4 mb-6 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 hover:bg-slate-50 font-medium flex items-center gap-2">
            ← Back to Projects
        </button>
        <div className="max-w-6xl mx-auto">
            {/* project details */}
            {loadingDetails && <p className="text-center text-slate-600 py-8">Loading project details...</p>}
            {error && !project && <p className="text-center text-red-600 py-8 bg-red-50 rounded-lg p-4">{error}</p> }

            {!loadingDetails && project && (
                <div className="space-y-8">
                    {editing ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                            <h2 className="text-3xl font-bold mb-6 text-slate-800">Edit Project</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                    <input 
                                        type="text" 
                                        value={projectTitle} 
                                        onChange={(e)=>setProjectTitle(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Problem</label>
                                    <input 
                                        type="text" 
                                        value={problem} 
                                        onChange={(e)=>setProblem(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Users</label>
                                    <input 
                                        type="text" 
                                        value={targetUsers} 
                                        onChange={(e)=>setTargetUsers(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tech Stack</label>
                                    <input 
                                        type="text" 
                                        value={techStack} 
                                        onChange={(e)=>setTechStack(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={editProject}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={()=>setEditing(false)}
                                        className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold mb-6 text-slate-800 tracking-tight">{project.title}</h1>
                            <div className="max-w-2xl mx-auto space-y-4">
                                <p className="text-lg text-slate-600 leading-relaxed">{project.problem}</p>
                                <p className="text-slate-700">{project.targetUsers}</p>
                                <span className="inline-block bg-slate-100 px-4 py-2 rounded-full text-slate-700 font-medium">{project.techStack}</span>
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                <button 
                                    onClick={()=>setEditing(true)}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                >
                                    Edit Project
                                </button>
                                <button 
                                    onClick={deleteProject}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                >
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    )}

                    {/* AI explanation section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                        <h2 className="text-2xl font-semibold mb-6 text-slate-700">AI Explanation</h2>
                        <p className="text-slate-600 mb-6">Generate a concise explanation from your notes.</p>
                        <button 
                            onClick={handleGenerateExplanation} 
                            disabled={generating}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                        >
                            {generating ? "Generating..." : "Generate Explanation"}
                        </button>
                        {explanation && (
                            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                <div className="prose prose-slate max-w-none">
                                    <ReactMarkdown>{explanation}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* add notes section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                        <h2 className="text-2xl font-semibold mb-6 text-slate-700">Add New Note</h2>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder='Note Title' 
                                onChange={(e)=> setTitle(e.target.value)} 
                                value={title}
                                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <textarea 
                                onChange={(e)=>setContent(e.target.value)} 
                                value={content} 
                                placeholder='Note Content'
                                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-none"
                            ></textarea>
                            <button 
                                onClick={handleAddNote}
                                className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                                Add Note
                            </button>
                        </div>
                    </div>

                    {/* all notes section */}
                    {loadingNotes && <p className="text-center text-slate-600 py-8">Loading notes...</p> }

                    {error && <p className="text-center text-red-600 py-8 bg-red-50 rounded-lg p-4">{error}</p> }

                    {!loadingNotes && notes.length===0 && <p className="text-center text-slate-500 py-8">No notes found. Create your first note above!</p> }

                    {!loadingNotes && notes.length>0 && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {notes.map((note)=>(
                                <div key={note._id} onClick={()=>navigate(`/projects/${projectId}/notes/${note._id}`)} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200 cursor-pointer h-48 flex flex-col">
                                    <h3 className="text-xl font-semibold mb-3 text-slate-800 flex-shrink-0">{note.title}</h3>
                                    <p className="text-slate-600 leading-relaxed flex-1 overflow-hidden text-ellipsis line-clamp-4">{note.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default ProjectDetails