import { api } from './api'
import type { Competitor } from '../types'

export const competitorService = {
  list: async (params?: { page?: number; pageSize?: number; q?: string }) => {
    const { data } = await api.get('/competitors', { params })
    return data
  },
  get: async (id: string) => {
    const { data } = await api.get(`/competitors/${id}`)
    return data
  },
  create: async (payload: Partial<Competitor>) => {
    const { data } = await api.post('/competitors', payload)
    return data
  },
  update: async (id: string, payload: Partial<Competitor>) => {
    const { data } = await api.put(`/competitors/${id}`, payload)
    return data
  },
  remove: async (id: string) => {
    await api.delete(`/competitors/${id}`)
  },
}
