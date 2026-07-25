import axios from 'axios'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

// Use Railway backend in production.
// Falls back to Railway if no environment variable is provided.
const configuredBaseUrl = (
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  'https://eduintel-backend-production.up.railway.app/api/v1'
).replace(/\/$/, '')

const baseURL = configuredBaseUrl.includes('/api/v1')
  ? configuredBaseUrl
  : `${configuredBaseUrl}/api/v1`

export const api = axios.create({
  baseURL,
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  if (!isSupabaseConfigured || !supabase) {
    return config
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.access_token) {
      config.headers = axios.AxiosHeaders.from({
        ...(config.headers ?? {}),
        Authorization: `Bearer ${session.access_token}`,
      })
    }
  } catch (error) {
    console.warn('Unable to attach auth token to API request.', error)
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error(
          'Unable to connect to the backend. Please check if the server is running.'
        )
      )
    }

    if (error.response.status === 401) {
      return Promise.reject(
        new Error('Your session has expired. Please sign in again.')
      )
    }

    if (error.response.status === 403) {
      return Promise.reject(
        new Error('You do not have permission to perform this action.')
      )
    }

    if (error.response.status === 404) {
      return Promise.reject(
        new Error('The requested resource was not found.')
      )
    }

    if (error.response.status >= 500) {
      return Promise.reject(
        new Error('The server encountered an error. Please try again later.')
      )
    }

    return Promise.reject(error)
  }
)