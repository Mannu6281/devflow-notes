import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const api = import.meta.env.VITE_API_URL

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
                const res = await axios.post(`${api}/api/auth/register`,{name,email,password})
                navigate('/')
        }catch(err){
            alert("Failed to register")
        }
    }
  return (
    <div>
        <div>Register</div>
        <div>
            <input type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name} required/>
            <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
            <input type="password" placeholder='Confirm your password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required/>
            <button onClick={()=>{handleRegister()}}>Sign Up</button>
        </div>
    </div>
  )
}

export default Register