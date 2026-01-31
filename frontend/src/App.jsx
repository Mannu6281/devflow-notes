import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import NotePage from './pages/NotePage'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
      <Route path="/projects/:projectId/notes/:noteId" element={<NotePage />} />
    </Routes>
  )
}

export default App