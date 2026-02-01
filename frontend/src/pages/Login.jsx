import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async()=>{
        try{
            if(!isValidEmail(email)){
                alert("Please enter a valid email")
                return
            }
            if(!password){
                alert("Please enter a password")
                return
            }
             const res = await api.post(`/api/auth/login`,{email,password})
             localStorage.setItem("token",res.data.token)
             localStorage.setItem("user",JSON.stringify(res.data.user))
             navigate('/projects')
        }
        catch(err){
            alert("Failed to login")
        }

    }
    const isValidEmail = (email)=>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <div className="text-3xl font-bold text-center mb-8 text-slate-800 tracking-tight">Login</div>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                        onClick={() => {
                            handleLogin()
                        }}
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login