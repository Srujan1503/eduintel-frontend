import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '../../services/analytics.service'

export const useAdmissionsAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'admissions'],
    queryFn: analyticsService.getAdmissions,
    retry: 2,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useCampaignAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'campaigns'],
    queryFn: analyticsService.getCampaigns,
    retry: 2,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useCompetitorAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'competitors'],
    queryFn: analyticsService.getCompetitors,
    retry: 2,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}
