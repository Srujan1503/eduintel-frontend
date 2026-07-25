import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { schoolService } from '../../services/school.service'

export const useSchools = (params?: { page?: number; pageSize?: number; q?: string }) => {
  return useQuery({
    queryKey: ['schools', params],
    queryFn: () => schoolService.list(params),
    retry: 1,
    staleTime: 30_000,
  })
}

export const useCreateSchool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => schoolService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schools'] }),
  })
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => schoolService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schools'] }),
  })
}

export const useDeleteSchool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => schoolService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schools'] }),
  })
}
