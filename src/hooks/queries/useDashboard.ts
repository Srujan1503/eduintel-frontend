import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../../services/dashboard.service'

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: dashboardService.getOverview,
    retry: 1,
    staleTime: 30_000,
  })
}

export const useDashboardKpis = () => {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKpis,
    retry: 1,
    staleTime: 30_000,
  })
}
