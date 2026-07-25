import { useMutation } from '@tanstack/react-query'
import { aiService } from '../../services/ai.service'

export const useChat = () => {
  return useMutation({
    mutationFn: (message: string) => aiService.chat(message),
  })
}

export const useRecommendations = () => {
  return useMutation({
    mutationFn: (context?: Record<string, unknown>) => aiService.recommendations(context),
  })
}

export const useSwot = () => {
  return useMutation({
    mutationFn: (schoolId?: string) => aiService.swot(schoolId),
  })
}

export const usePredictions = () => {
  return useMutation({
    mutationFn: (payload?: Record<string, unknown>) => aiService.predictions(payload),
  })
}
