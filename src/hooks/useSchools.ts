import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { schoolsData } from '../data/mockData'
import { schoolService } from '../services/school.service'
import type { School } from '../types'

const normalizeSchools = (value: unknown): School[] => {
  if (Array.isArray(value)) {
    return value as School[]
  }

  if (value && typeof value === 'object' && Array.isArray((value as { items?: unknown[] }).items)) {
    return (value as { items: School[] }).items
  }

  return schoolsData
}

export const useSchools = () => {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      try {
        return normalizeSchools(await schoolService.list())
      } catch {
        return schoolsData
      }
    },
    staleTime: 1000 * 30,
    retry: 1,
  })
}

export const useCreateSchool = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Partial<School>) => schoolService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] })
    },
  })
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<School> }) => schoolService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] })
    },
  })
}

export const useDeleteSchool = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => schoolService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] })
    },
  })
}
