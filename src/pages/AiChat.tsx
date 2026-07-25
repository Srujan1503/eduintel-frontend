import { ArrowUpRight, Bot, SendHorizonal, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChat } from '../hooks/queries/useAi'

type Message = {
  role: 'assistant' | 'user'
  content: string
}

const suggestions = ['Summarize the latest lead trends', 'Recommend the next campaign focus', 'Compare regional enrollment performance']

const initialMessages: Message[] = [
  { role: 'assistant', content: 'I can help you evaluate admissions performance, campaign ROI, and competitor signals across the institution.' },
]

export const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatMutation = useChat()

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const nextUserMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, nextUserMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await chatMutation.mutateAsync(trimmed)
      const reply = typeof response === 'string' ? response : response?.reply ?? response?.message ?? 'The AI service returned an empty response.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: error instanceof Error ? error.message : 'The AI service could not answer this request.' }])
    } finally {
      setIsTyping(false)
    }
  }

  const conversationHistory = useMemo(() => messages.slice(-8), [messages])

  useEffect(() => {
    const container = document.querySelector('[data-chat-scroll]') as HTMLElement | null
    container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [conversationHistory, isTyping])

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-2 text-white"><Bot size={18} /></div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">AI copilot</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Conversation workspace</h2>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => setInput(suggestion)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <span>{suggestion}</span>
              <ArrowUpRight size={15} className="text-violet-500" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mb-4 flex items-center gap-2 text-violet-600"><Sparkles size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live conversation</h3></div>
        <div className="flex h-[420px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div data-chat-scroll className="flex-1 space-y-3 overflow-y-auto">
            {conversationHistory.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === 'assistant' ? 'bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200' : 'ml-auto bg-violet-600 text-white'}`}>
                <div className="prose prose-sm max-w-none break-words dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isTyping ? (
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 [animation-delay:300ms]" />
                </div>
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-950">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask the AI anything..." className="flex-1 bg-transparent outline-none" onKeyDown={(event) => event.key === 'Enter' && void handleSend()} />
            <button onClick={() => void handleSend()} disabled={chatMutation.isPending} className="rounded-xl bg-violet-600 p-2 text-white disabled:opacity-70"><SendHorizonal size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
