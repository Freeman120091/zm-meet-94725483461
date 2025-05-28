import './App.css'
import Navbar from './components/navbar'
import { Routes, Route, Navigate  } from 'react-router-dom'
import Home from './pages'
import Meeting from './pages/meeting'
import Login from './pages/login'
import Footer from './components/footer'


function App() {
  return (
   <div className="bg-white relative flex flex-col h-screen w-screen">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/meeting" element={<Meeting/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
