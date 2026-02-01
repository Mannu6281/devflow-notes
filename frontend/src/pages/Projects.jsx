import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

import api from '../api/axios.js'



const Projects = () => {

    const [projects, setProjects] = useState([])
    const [title, setTitle] = useState('')
    const [problem, setProblem] = useState('')
    const [targetUsers, setTargetUsers] = useState('')
    const [techStack, setTechStack] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProjects= async ()=>{
        try{
            setLoading(true)
            const res = await api.get(`/api/projects`)
            setProjects(res.data)
            setError("")
        }catch(err){
            setError("Failed to fetch projects")
        }finally{
            setLoading(false)
        }
    }
    
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate('/')
        }
        fetchProjects()
    },[])
    
    const user = JSON.parse(localStorage.getItem("user"));

    const handleAddProject = async () => {
        if(!title||!problem||!targetUsers||!techStack) 
        alert("All fields are required");
      
        try{
            const res = await api.post(`/api/projects`,{title,problem,targetUsers,techStack})

            setProjects((prev)=>[res.data,...prev])

            setTitle("")
            setProblem("")
            setTargetUsers("")
            setTechStack("")
        }catch(err){
            alert("Failed to add project")
        }
    }

    const handleLogout = ()=>{
        localStorage.removeItem("token")
        navigate('/')
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">Welcome, {user.name}</h1>
            <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center bg-white text-slate-800 px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium shadow-sm"
            >
                Logout
            </button>
            {/* add project */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-6 text-slate-700">Add New Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input 
                        type="text" 
                        placeholder='Project Title' 
                        onChange={(e)=>setTitle(e.target.value)} 
                        value={title} 
                        required
                        className="p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input 
                        type="text" 
                        placeholder='Problem Statement' 
                        onChange={(e)=>setProblem(e.target.value)} 
                        value={problem} 
                        required
                        className="p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input 
                        type="text" 
                        placeholder='Target Users' 
                        onChange={(e)=>setTargetUsers(e.target.value)} 
                        value={targetUsers} 
                        required
                        className="p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input 
                        type="text" 
                        placeholder='Tech Stack' 
                        onChange={(e)=>setTechStack(e.target.value)} 
                        value={techStack} 
                        required
                        className="p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
                <button 
                    onClick={handleAddProject}
                    className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg">
                    Add Project
                </button>
            </div>

            {/* project list */}
            {loading && <p className="text-center text-slate-600 py-8">Loading projects...</p>}
            {error && <p className="text-center text-red-600 py-8 bg-red-50 rounded-lg p-4">{error}</p>}

            {!loading && projects.length===0 && <p className="text-center text-slate-500 py-8">No projects found. Create your first one above.</p>}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project)=>(
                    <div key={project._id} onClick={()=>{navigate(`/projects/${project._id}`)}} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200 hover:border-slate-300 cursor-pointer">
                        <h2 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h2>
                        <p className="text-slate-600 mb-4 leading-relaxed">{project.problem}</p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <span className="font-medium">{project.targetUsers}</span>
                            <span className="bg-slate-100 px-3 py-1 rounded-full">{project.techStack}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Projects