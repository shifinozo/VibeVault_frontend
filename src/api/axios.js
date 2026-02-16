import axios from 'axios'

const api = axios.create({
  // Production URL
  // baseURL: "https://vibe-vault-backend-three.vercel.app/pjct",

  // Fallback URLs (commented out)
  // baseURL: "https://vibevault-backend-yuqc.onrender.com/pjct"
  baseURL: "http://localhost:3000/pjct"
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