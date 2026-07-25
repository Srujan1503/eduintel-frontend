import { api } from './api'
import type { School } from '../types'

export const schoolService = {
  list: async (params?: { page?: number; pageSize?: number; q?: string }) => {
    const { data } = await api.get('/schools', { params })
    return data
  },
  get: async (id: string) => {
    const { data } = await api.get(`/schools/${id}`)
    return data
  },
  create: async (payload: Partial<School>) => {
    const { data } = await api.post('/schools', payload)
    return data
  },
  update: async (id: string, payload: Partial<School>) => {
    const { data } = await api.put(`/schools/${id}`, payload)
    return data
  },
  remove: async (id: string) => {
    await api.delete(`/schools/${id}`)
  },
}
