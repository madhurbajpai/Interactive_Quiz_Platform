import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EntryPage from './components/EntryPage'
import QuizPage from './components/QuizPage'
import './App.css'
import AnalyzePage from './components/AnalyzePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
      </Routes>
    </Router>
  )
}

export default App
