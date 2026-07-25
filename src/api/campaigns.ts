import { apiClient } from './client'
import type { Campaign } from '../types'

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data } = await apiClient.get<Campaign[]>('/campaigns')
    return data
  } catch {
    return []
  }
}
