import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Reader from './pages/Reader'

export default function App(){
  return (
    <div>
      <nav style={{padding:10, borderBottom:'1px solid #ddd'}}>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <main style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reader/:storyId" element={<Reader/>} />
        </Routes>
      </main>
    </div>
  )
}
