import axios from 'axios'

const api = axios.create({
  // Production URL (Render)
  baseURL: "https://vibevault-backend-yuqc.onrender.com/pjct"

  // Local URL (Development)
  // baseURL:"http://localhost:3000/pjct"
})

// This automatically sends JWT in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export default api