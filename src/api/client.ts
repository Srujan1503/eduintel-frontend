import axios from 'axios'

const rawBaseURL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000'
const baseURL = rawBaseURL.endsWith('/api/v1')
  ? rawBaseURL
  : `${rawBaseURL.replace(/\/$/, '')}/api/v1`

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
})
