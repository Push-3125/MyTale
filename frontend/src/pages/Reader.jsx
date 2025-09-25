import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../services/api'

export default function Reader(){
  const { storyId } = useParams()
  const [story, setStory] = useState(null)
  const [chapters, setChapters] = useState([])
  const [index, setIndex] = useState(0)
  useEffect(()=>{
    axios.get(`/stories/${storyId}`).then(r=>setStory(r.data)).catch(()=>{})
    axios.get(`/stories/${storyId}/chapters`).then(r=>setChapters(r.data)).catch(()=>{})
  },[storyId])
  useEffect(()=>{ setIndex(0) },[chapters])
  const ch = chapters[index]
  return (
    <div>
      <h2>{story?.title}</h2>
      {ch ? (
        <div>
          <h3>{ch.title}</h3>
          <div style={{whiteSpace:'pre-wrap'}}>{ch.content}</div>
          <div style={{marginTop:10}}>
            <button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Prev</button>
            <button disabled={index>=chapters.length-1} onClick={()=>setIndex(i=>i+1)}>Next</button>
          </div>
        </div>
      ) : <div>Loading chapters...</div>}
    </div>
  )
}
