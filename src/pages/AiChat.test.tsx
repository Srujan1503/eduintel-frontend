import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AiChat } from './AiChat'

vi.mock('../hooks/queries/useAi', () => ({
  useChat: () => ({
    mutateAsync: vi.fn().mockResolvedValue('Here is the live insight from the backend.'),
    isPending: false,
  }),
  useRecommendations: () => ({
    mutateAsync: vi.fn().mockResolvedValue('Recommendation from the backend.'),
    isPending: false,
  }),
  useSwot: () => ({
    mutateAsync: vi.fn().mockResolvedValue('SWOT from the backend.'),
    isPending: false,
  }),
  usePredictions: () => ({
    mutateAsync: vi.fn().mockResolvedValue('Prediction from the backend.'),
    isPending: false,
  }),
}))

describe('AiChat page', () => {
  it('sends a message and renders the assistant reply', async () => {
    const user = userEvent.setup()

    render(<AiChat />)

    await user.type(screen.getByPlaceholderText(/ask the ai anything/i), 'Summarize enrollment performance')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/live insight from the backend/i)).toBeInTheDocument()
  })
})
