import { api } from './api'

export const aiService = {
  chat: async (message: string) => {
    const { data } = await api.post('/ai/chat', { message })
    return data
  },
  recommendations: async (context?: Record<string, unknown>) => {
    const { data } = await api.post('/ai/recommendations', { context })
    return data
  },
  swot: async (schoolId?: string) => {
    const { data } = await api.post('/ai/swot', { school_id: schoolId })
    return data
  },
  predictions: async (payload?: Record<string, unknown>) => {
    const { data } = await api.post('/ai/predictions', { payload })
    return data
  },
}
