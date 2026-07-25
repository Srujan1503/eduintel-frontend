import { api } from './api'

export const analyticsService = {
  getAdmissions: async () => {
    const { data } = await api.get('/analytics/admissions')
    return data
  },
  getCampaigns: async () => {
    const { data } = await api.get('/analytics/campaigns')
    return data
  },
  getCompetitors: async () => {
    const { data } = await api.get('/analytics/competitors')
    return data
  },
}
