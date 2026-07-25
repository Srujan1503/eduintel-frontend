import { useQuery } from '@tanstack/react-query'
import { competitorsData } from '../data/mockData'
import { competitorService } from '../services/competitor.service'
import type { Competitor } from '../types'

const normalizeCompetitors = (value: unknown): Competitor[] => {
  if (Array.isArray(value)) {
    return value as Competitor[]
  }

  if (value && typeof value === 'object' && Array.isArray((value as { items?: unknown[] }).items)) {
    return (value as { items: Competitor[] }).items
  }

  return competitorsData
}

export const useCompetitors = () => {
  return useQuery({
    queryKey: ['competitors'],
    queryFn: async () => {
      try {
        return normalizeCompetitors(await competitorService.list())
      } catch {
        return competitorsData
      }
    },
    staleTime: 1000 * 30,
    retry: 1,
  })
}
