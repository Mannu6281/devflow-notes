import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import NotePage from './pages/NotePage'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Projects/>}/>
      <Route path="/projects">
        <Route path=":projectId" element={<ProjectDetails />} />
        <Route path=":projectId/notes/:noteId" element={<NotePage />} />
      </Route>
    </Routes>
  )
}

export default App