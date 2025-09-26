
import axios from 'axios'


const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI_API || 'http://localhost:4000/v1',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Interceptors
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global errors
    if (error.response?.status === 401) {
      // logout, redirect, or show message
      console.error('Unauthorized')
    }
    return Promise.reject(error)
  }
)

export default API
