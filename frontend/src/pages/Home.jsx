import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="text-4xl font-bold text-center mb-6 text-slate-800 tracking-tight">DevFlow Notes</div>
          <div className="text-center text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Streamline your development workflow by organizing project ideas, tracking problems, and managing tech stacks in one centralized location.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div
              onClick={() => {
                navigate('/login')
              }}
              className="w-full sm:w-auto text-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer select-none"
            >
              Login
            </div>
            <div
              onClick={() => {
                navigate('/register')
              }}
              className="w-full sm:w-auto text-center bg-white text-slate-800 px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium cursor-pointer select-none"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home