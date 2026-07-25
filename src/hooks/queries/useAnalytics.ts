import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '../../services/analytics.service'

export const useAdmissionsAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'admissions'],
    queryFn: analyticsService.getAdmissions,
    retry: 1,
    staleTime: 30_000,
  })
}

export const useCampaignAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'campaigns'],
    queryFn: analyticsService.getCampaigns,
    retry: 1,
    staleTime: 30_000,
  })
}

export const useCompetitorAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'competitors'],
    queryFn: analyticsService.getCompetitors,
    retry: 1,
    staleTime: 30_000,
  })
}
