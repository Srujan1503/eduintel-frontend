import { apiClient } from '../api/client'

export const healthService = {
  getHealth: async () => apiClient.get('/health'),
}
