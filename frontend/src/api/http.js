import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:4000/api'
});
http.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
export default http;
