import { apiClient } from './client'

const mockReply = (message: string) => {
  const normalized = message.toLowerCase()

  if (normalized.includes('campaign')) {
    return 'The strongest near-term opportunity is to increase search-led nurture flows and rebalance budget toward channels with the best conversion efficiency.'
  }

  if (normalized.includes('enrollment') || normalized.includes('regional')) {
    return 'Regional demand is strongest in STEM and business pathways, while parent engagement is accelerating across hybrid admission journeys.'
  }

  if (normalized.includes('competitor')) {
    return 'Competitor pressure is highest in scholarship-led programs and digital-first outreach, so a sharper value proposition will help protect conversion.'
  }

  return 'I can help you review admissions trends, campaign performance, and competitive pressure with a concise executive summary.'
}

export const sendChatMessage = async (message: string) => {
  try {
    const { data } = await apiClient.post<{ reply?: string; message?: string }>('/chat', { message })
    return data.reply ?? data.message ?? mockReply(message)
  } catch {
    return mockReply(message)
  }
}
