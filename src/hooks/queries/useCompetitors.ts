import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { competitorService } from '../../services/competitor.service'

export const useCompetitors = (params?: { page?: number; pageSize?: number; q?: string }) => {
  return useQuery({
    queryKey: ['competitors', params],
    queryFn: () => competitorService.list(params),
    retry: 1,
    staleTime: 30_000,
  })
}

export const useCreateCompetitor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => competitorService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['competitors'] }),
  })
}

export const useUpdateCompetitor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => competitorService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['competitors'] }),
  })
}

export const useDeleteCompetitor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => competitorService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['competitors'] }),
  })
}
