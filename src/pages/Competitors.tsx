import { AlertTriangle, ArrowUpRight, Clock3, Search, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useCompetitors } from '../hooks/queries/useCompetitors'

export const Competitors = () => {
  const { data, isLoading, error } = useCompetitors()
  const competitors = Array.isArray(data) ? data : []
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 3

  const filtered = useMemo(() => {
    const nextQuery = query.toLowerCase()
    return competitors.filter((competitor) => [competitor.name, competitor.sector, competitor.momentum, competitor.lastMove].some((value) => (value ?? '').toLowerCase().includes(nextQuery)))
  }, [competitors, query])

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Competitive intelligence</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Threat landscape and market moves</h2>
          </div>
          <div className="rounded-2xl bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600">{filtered.length} active watchlists</div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          Unable to load competitor data from the backend: {error instanceof Error ? error.message : 'Request failed'}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Threat score matrix</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Institutions with rising positioning pressure</p>
            </div>
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Search size={15} />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search competitors" className="w-full bg-transparent outline-none" />
            </label>
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Loading competitor data...</p> : null}

          <div className="space-y-3">
            {paged.map((competitor) => (
              <div key={competitor.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{competitor.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{competitor.sector}</p>
                  </div>
                  <div className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{competitor.threatScore}/100</div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Sparkles size={14} className="text-violet-500" />
                  <span>{competitor.momentum ?? 'Stable'}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Clock3 size={14} />
                  <span>{competitor.lastMove ?? 'No recent signal'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Showing {paged.length} of {filtered.length}</span>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border border-slate-200 px-3 py-2 disabled:opacity-50 dark:border-slate-700">Previous</button>
              <button disabled={page * pageSize >= filtered.length} onClick={() => setPage((value) => value + 1)} className="rounded-xl border border-slate-200 px-3 py-2 disabled:opacity-50 dark:border-slate-700">Next</button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Competitive timeline</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Signals shaping the market</p>
            </div>
            <AlertTriangle className="text-amber-500" size={18} />
          </div>
          <div className="space-y-4">
            {[
              { title: 'Policy shift', detail: 'Regional competitors expanded scholarship portfolios.', time: '2 hours ago' },
              { title: 'Rapid launch', detail: 'One institution opened an AI-driven conversion funnel.', time: 'Today' },
              { title: 'Brand signal', detail: 'Digital engagement climbed after new event-driven campaigns.', time: 'Yesterday' },
            ].map((entry) => (
              <div key={entry.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900 dark:text-white">{entry.title}</p>
                  <ArrowUpRight className="text-violet-500" size={16} />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{entry.detail}</p>
                <p className="mt-2 text-xs text-slate-400">{entry.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
