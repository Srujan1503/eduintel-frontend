import { AlertTriangle, ArrowUpRight, Bot, RefreshCw, SendHorizonal, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChat, usePredictions, useRecommendations, useSwot } from '../hooks/queries/useAi'

type Message = {
  role: 'assistant' | 'user'
  content: string
}

type InsightMode = 'chat' | 'swot' | 'recommendations' | 'predictions'

const suggestions = ['Summarize the latest lead trends', 'Recommend the next campaign focus', 'Compare regional enrollment performance']

const initialMessages: Message[] = [
  { role: 'assistant', content: 'I can help you evaluate admissions performance, campaign ROI, and competitor signals across the institution.' },
]

const modeConfig: Array<{ key: InsightMode; label: string; description: string }> = [
  { key: 'chat', label: 'AI chat', description: 'Ask follow-up questions and get a concise answer.' },
  { key: 'swot', label: 'SWOT', description: 'Surface strengths, weaknesses, opportunities, and threats.' },
  { key: 'recommendations', label: 'Recommendations', description: 'Generate an action plan for the next decision cycle.' },
  { key: 'predictions', label: 'Predictions', description: 'Forecast admissions and campaign outcomes.' },
]

const normalizeInsight = (value: unknown): string => {
  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    return value.map((entry) => normalizeInsight(entry)).filter(Boolean).join('\n')
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (!entries.length) return 'The AI service returned an empty response.'

    return entries
      .map(([key, entry]) => `${key.replace(/_/g, ' ')}: ${normalizeInsight(entry)}`)
      .join('\n')
  }

  return 'The AI service returned an empty response.'
}

export const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [activeMode, setActiveMode] = useState<InsightMode>('chat')
  const [insight, setInsight] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const chatMutation = useChat()
  const recommendationsMutation = useRecommendations()
  const swotMutation = useSwot()
  const predictionsMutation = usePredictions()

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setError(null)
    if (activeMode === 'chat') {
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    }
    setInput('')
    setInsight(null)
    setIsTyping(true)

    try {
      const response = activeMode === 'chat'
        ? await chatMutation.mutateAsync(trimmed)
        : activeMode === 'swot'
          ? await swotMutation.mutateAsync(trimmed)
          : activeMode === 'recommendations'
            ? await recommendationsMutation.mutateAsync({ prompt: trimmed })
            : await predictionsMutation.mutateAsync({ prompt: trimmed })

      const reply = normalizeInsight(response)
      setInsight(reply)

      if (activeMode === 'chat') {
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'The AI service could not answer this request.'
      setError(message)
      if (activeMode === 'chat') {
        setMessages((prev) => [...prev, { role: 'assistant', content: message }])
      }
    } finally {
      setIsTyping(false)
    }
  }

  const conversationHistory = useMemo(() => messages.slice(-8), [messages])

  useEffect(() => {
    const container = document.querySelector('[data-chat-scroll]') as HTMLElement | null
    if (container && typeof container.scrollTo === 'function') {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [conversationHistory, isTyping])

  const isBusy = activeMode === 'chat' ? chatMutation.isPending : activeMode === 'swot' ? swotMutation.isPending : activeMode === 'recommendations' ? recommendationsMutation.isPending : predictionsMutation.isPending

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-2 text-white"><Bot size={18} /></div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">AI copilot</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Production insight workspace</h2>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {modeConfig.map((mode) => (
            <button key={mode.key} type="button" onClick={() => setActiveMode(mode.key)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${activeMode === mode.key ? 'border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-violet-950/40 dark:text-violet-300' : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{mode.label}</span>
                <ArrowUpRight size={15} className="text-violet-500" />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{mode.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Quick prompts</p>
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <span>{suggestion}</span>
              <ArrowUpRight size={15} className="text-violet-500" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mb-4 flex items-center gap-2 text-violet-600"><Sparkles size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{modeConfig.find((mode) => mode.key === activeMode)?.label ?? 'Live insight'}</h3></div>
        <div className="flex h-[460px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div data-chat-scroll className="flex-1 space-y-3 overflow-y-auto">
            {activeMode === 'chat' ? conversationHistory.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === 'assistant' ? 'bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200' : 'ml-auto bg-violet-600 text-white'}`}>
                <div className="prose prose-sm max-w-none break-words dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            )) : null}

            {!activeMode || activeMode === 'chat' ? null : (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">Live {modeConfig.find((mode) => mode.key === activeMode)?.label ?? 'insight'} response</p>
                {insight ? (
                  <div className="prose prose-sm mt-3 max-w-none break-words dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{insight}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="mt-3 text-slate-500 dark:text-slate-400">Submit a prompt to generate a live response from the backend.</p>
                )}
              </div>
            )}

            {isBusy ? (
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 [animation-delay:300ms]" />
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-0.5" />
                  <div>
                    <p className="font-semibold">Unable to reach the backend</p>
                    <p className="mt-1">{error}</p>
                    <button type="button" onClick={() => void handleSend()} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-400 px-3 py-2 font-semibold">
                      <RefreshCw size={15} /> Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-950">
            <input aria-label="AI prompt" value={input} onChange={(event) => setInput(event.target.value)} placeholder={activeMode === 'chat' ? 'Ask the AI anything...' : `Ask for a ${activeMode} insight...`} className="flex-1 bg-transparent outline-none" onKeyDown={(event) => event.key === 'Enter' && void handleSend()} />
            <button type="button" onClick={() => void handleSend()} disabled={isBusy} aria-label="Send message" className="rounded-xl bg-violet-600 p-2 text-white disabled:opacity-70"><SendHorizonal size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
