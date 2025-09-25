import React, { useState } from 'react'
import axios from '../services/api'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  const submit=async e=>{
    e.preventDefault()
    try{
      const r=await axios.post('/auth/login',{email,password})
      localStorage.setItem('token', r.data.token)
      setMsg('Logged in')
    }catch(err){ setMsg('Login failed') }
  }
  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h2>Login</h2>
      <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button>Login</button>
      <div>{msg}</div>
    </form>
  )
}
