import { api } from './api'
import type { DashboardOverview, DashboardKpis } from '../types'

export const dashboardService = {
  getOverview: async (): Promise<DashboardOverview> => {
    const { data } = await api.get<DashboardOverview>('/dashboard/overview')
    return data
  },
  getKpis: async (): Promise<DashboardKpis> => {
    const { data } = await api.get<DashboardKpis>('/dashboard/kpis')
    return data
  },
}
