import axios from 'axios'

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' })

instance.interceptors.request.use(cfg=>{
  const t = localStorage.getItem('token')
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})

export default instance
