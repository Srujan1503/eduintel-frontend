import axios from 'axios'

const rawBaseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  'https://eduintel-backend-production.up.railway.app'

const baseURL = rawBaseURL.endsWith('/api/v1')
  ? rawBaseURL
  : `${rawBaseURL.replace(/\/$/, '')}/api/v1`

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
})