import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Not logged in or token expired — redirect to login
      localStorage.removeItem("token")
      window.location.href = "/login"
      return Promise.reject(new Error("Session expired. Please log in again."))
    }
    return Promise.reject(error)
  }
)

export default api
