import { apiClient } from './client'
import type { Competitor } from '../types'

export const fetchCompetitors = async (): Promise<Competitor[]> => {
  try {
    const { data } = await apiClient.get<Competitor[]>('/competitors')
    return data
  } catch {
    return []
  }
}
