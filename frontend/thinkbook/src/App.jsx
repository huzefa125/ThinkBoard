import React from 'react'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import NoteDetails from './pages/NoteDetails'
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-25 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App
