import React, { useEffect, useState } from 'react'
import axios from '../services/api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [stories, setStories] = useState([])
  useEffect(()=>{ axios.get('/stories').then(r=>setStories(r.data)).catch(()=>{}) },[])
  return (
    <div>
      <h2>Stories</h2>
      {stories.map(s=> (
        <div key={s.id} style={{border:'1px solid #eee', padding:10, margin:10}}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <Link to={`/reader/${s.id}`}>Read</Link>
        </div>
      ))}
    </div>
  )
}
