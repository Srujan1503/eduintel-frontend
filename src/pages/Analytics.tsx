import { LineChart, PieChart as PieIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useAdmissionsAnalytics, useCampaignAnalytics, useCompetitorAnalytics } from '../hooks/queries/useAnalytics'

const toPercent = (value: unknown, fallback: string) => {
  const numeric = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : Number.NaN
  return Number.isFinite(numeric) ? `${numeric.toFixed(0)}%` : fallback
}

export const Analytics = () => {
  const { data: admissions, isLoading: admissionsLoading, error: admissionsError } = useAdmissionsAnalytics()
  const { data: campaigns, isLoading: campaignsLoading, error: campaignsError } = useCampaignAnalytics()
  const { data: competitors, isLoading: competitorsLoading, error: competitorsError } = useCompetitorAnalytics()

  const analyticsCards = useMemo(() => [
    {
      label: 'Conversion uplift',
      value: toPercent((admissions as { conversion_uplift?: unknown } | undefined)?.conversion_uplift, '+24%'),
      detail: 'Compared with last term',
    },
    {
      label: 'Forecast confidence',
      value: toPercent((campaigns as { forecast_confidence?: unknown } | undefined)?.forecast_confidence, '91%'),
      detail: 'High signal quality',
    },
    {
      label: 'Lead quality',
      value: (competitors as { lead_quality?: unknown } | undefined)?.lead_quality ? String((competitors as { lead_quality?: unknown }).lead_quality) : 'A+',
      detail: 'Top 12% in region',
    },
  ], [admissions, campaigns, competitors])

  const isLoading = admissionsLoading || campaignsLoading || competitorsLoading
  const errorMessage = admissionsError instanceof Error ? admissionsError.message : campaignsError instanceof Error ? campaignsError.message : competitorsError instanceof Error ? competitorsError.message : null

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          Live analytics request failed: {errorMessage}
        </div>
      ) : null}

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Advanced analytics</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Growth patterns and channel performance</h2>
          </div>
          <div className="rounded-2xl bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600">Updated 5m ago</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">Loading analytics data…</div>
        ) : null}
        {analyticsCards.map((card) => (
          <div key={card.label} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center gap-2 text-violet-600"><LineChart size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance curve</h3></div>
          <div className="h-64 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <div className="flex h-full items-end gap-3">
              {[40, 56, 74, 82, 88, 92].map((value, index) => (
                <div key={value} className="flex-1 rounded-t-2xl bg-violet-500/80" style={{ height: `${value}%`, marginTop: index === 0 ? 'auto' : 0 }} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center gap-2 text-violet-600"><PieIcon size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Channel mix</h3></div>
          <div className="h-64 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <div className="flex h-full items-center justify-center gap-4">
              {['Search', 'Social', 'Email', 'Partners'].map((item, index) => (
                <div key={item} className="flex flex-col items-center gap-2">
                  <div className={`h-16 w-16 rounded-full border-[10px] ${['border-violet-500', 'border-cyan-500', 'border-amber-500', 'border-emerald-500'][index]}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
