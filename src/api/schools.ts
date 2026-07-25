import { apiClient } from './client'
import type { School } from '../types'

export const fetchSchools = async (): Promise<School[]> => {
  try {
    const { data } = await apiClient.get<School[]>('/schools')
    return data
  } catch {
    return []
  }
}

export const createSchool = async (payload: Omit<School, 'id'>): Promise<School> => {
  const { data } = await apiClient.post<School>('/schools', payload)
  return data
}

export const updateSchool = async ({ id, ...payload }: School): Promise<School> => {
  const { data } = await apiClient.put<School>(`/schools/${id}`, payload)
  return data
}

export const deleteSchool = async (id: number): Promise<void> => {
  await apiClient.delete(`/schools/${id}`)
}
