import { useQuery } from '@tanstack/react-query'
import { campaignsData } from '../data/mockData'
import { campaignService } from '../services/campaign.service'
import type { Campaign } from '../types'

const normalizeCampaigns = (value: unknown): Campaign[] => {
  if (Array.isArray(value)) {
    return value as Campaign[]
  }

  if (value && typeof value === 'object' && Array.isArray((value as { items?: unknown[] }).items)) {
    return (value as { items: Campaign[] }).items
  }

  return campaignsData
}

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      try {
        return normalizeCampaigns(await campaignService.list())
      } catch {
        return campaignsData
      }
    },
    staleTime: 1000 * 30,
    retry: 1,
  })
}
