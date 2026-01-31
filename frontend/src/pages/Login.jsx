import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
impor

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async()=>{
        try{
             const res = await api.post(`/api/auth/login`,{email,password})
             localStorage.setItem("token",res.data.token)
             navigate('/projects')
        }
        catch(err){
            alert("Failed to login")
        }

    }
  return (
    <div>
        <div>Login</div>
        <div>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button onClick={()=>{handleLogin()}}>Login</button>
        </div>
    </div>
  )
}

export default Login