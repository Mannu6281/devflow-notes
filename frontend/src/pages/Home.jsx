import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();
  return (
    <>
      <div>DevFlow Notes</div>
      <div>Streamline your development workflow by organizing project ideas, tracking problems, and managing tech stacks in one centralized location.</div>
      <div>
        <div onClick={()=>{
            navigate('/login')
        }}>Login</div>
        <div onClick={()=>{
            navigate('/register')
        }}>Sign Up</div>
      </div>
    </>
  )
}

export default Home