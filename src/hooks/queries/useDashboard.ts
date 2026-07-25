import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../../services/dashboard.service'

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: dashboardService.getOverview,
    retry: 2,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useDashboardKpis = () => {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKpis,
    retry: 2,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}
