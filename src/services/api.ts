import axios from 'axios'

const rawBaseURL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8000'
const baseURL = rawBaseURL.endsWith('/api/v1') ? rawBaseURL : `${rawBaseURL.replace(/\/$/, '')}/api/v1`

export const api = axios.create({
  baseURL,
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(new Error('The requested resource was not found.'))
    }
    return Promise.reject(error)
  },
)
