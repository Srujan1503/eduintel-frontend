import { api } from './api'
import type { Campaign } from '../types'

export const campaignService = {
  list: async (params?: { page?: number; pageSize?: number }) => {
    const { data } = await api.get('/campaigns', { params })
    return data
  },
  get: async (id: string) => {
    const { data } = await api.get(`/campaigns/${id}`)
    return data
  },
  create: async (payload: Partial<Campaign>) => {
    const { data } = await api.post('/campaigns', payload)
    return data
  },
  update: async (id: string, payload: Partial<Campaign>) => {
    const { data } = await api.put(`/campaigns/${id}`, payload)
    return data
  },
  remove: async (id: string) => {
    await api.delete(`/campaigns/${id}`)
  },
}
