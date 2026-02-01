import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleRegister = async()=>{
        try{
            if(password!==confirmPassword){
                alert("Passwords do not match")
                return
            }
                const res = await api.post(`/api/auth/register`,{name,email,password})
                navigate('/')
        }catch(err){
            alert("Failed to register")
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <div className="text-3xl font-bold text-center mb-8 text-slate-800 tracking-tight">Register</div>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input
                        type="email"
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <input
                        type="password"
                        placeholder='Confirm your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                        onClick={() => {
                            handleRegister()
                        }}
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register