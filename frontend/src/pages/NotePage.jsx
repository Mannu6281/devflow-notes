import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'



const api = import.meta.env.VITE_API_URL


const NotePage = () => {

    const { projectId, noteId } = useParams()

    const navigate = useNavigate()

    const [editing,setEditing]=useState(false)
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [note, setNote]=useState(null)
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState("")

    const fetchNote = async()=>{
    try{
        setLoading(true)
        const res= await axios.get(`${api}/api/notes/${projectId}/${noteId}`)
        if(res.data){
            setNote(res.data)
            setTitle(res.data.title||"")
            setContent(res.data.content)
        }
        else{
            setError("Note not found")
        }
    }catch(err){
        alert("Failed to fetch note")
        console.log(err)
    }finally{
        setLoading(false)
    }
}

const updateNote = async()=>{
    try{
        const res= await axios.put(`${api}/api/notes/${projectId}/${noteId}`,{title,content})
        if(res.data){
            setNote(res.data)
            setEditing(false)
        }
    }catch(err){
        alert("Failed to update note")
        console.log(err)
    }
}

const deleteNode = async()=>{
    if (!confirm("Delete this note?")) return;
    try{
        await axios.delete(`${api}/api/notes/${projectId}/${noteId}`)
        navigate(`/projects/${projectId}`,{replace: true})
    }catch(err){
        alert("Failed to delete note")
        console.log(err)
    }
}

useEffect(()=>{
    fetchNote()
},[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <button 
            onClick={()=>navigate(`/projects/${projectId}`)} 
            className="sticky top-4 mb-6 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 hover:bg-slate-50 font-medium flex items-center gap-2"
        >
            ← Back to Project
        </button>
        <div className="max-w-4xl mx-auto">
            {loading && <p className="text-center text-slate-600 py-8">Loading Note...</p> }

            {error && <p className="text-center text-red-600 py-8 bg-red-50 rounded-lg p-4">{error}</p> }

            {!loading && !note && <p className="text-center text-slate-500 py-8">Note not found.</p> }

            {!loading &&note && (
                <div>
                    {editing ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                            <h1 className="text-3xl font-bold mb-6 text-slate-800">Edit Note</h1>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e)=>setTitle(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                                    <textarea 
                                        value={content} 
                                        onChange={(e)=>setContent(e.target.value)}
                                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-64 resize-none"
                                    ></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={updateNote}
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
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                            <h1 className="text-3xl font-bold mb-6 text-slate-800">{note.title}</h1>
                            <div className="prose prose-slate max-w-none mb-8">
                                <p className="text-slate-700 leading-relaxed text-lg">{note.content}</p>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={()=>setEditing(true)}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                >
                                    Edit Note
                                </button>
                                <button 
                                    onClick={deleteNode}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                >
                                    Delete Note
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default NotePage