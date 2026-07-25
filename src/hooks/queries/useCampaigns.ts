import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { campaignService } from '../../services/campaign.service'

export const useCampaigns = (params?: { page?: number; pageSize?: number }) => {
  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () => campaignService.list(params),
    retry: 1,
    staleTime: 30_000,
  })
}

export const useCreateCampaign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => campaignService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
  })
}

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => campaignService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
  })
}

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => campaignService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
  })
}
