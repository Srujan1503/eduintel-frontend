import { ArrowUpRight, DollarSign, Target, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { useCampaigns } from '../hooks/queries/useCampaigns'
import { formatCurrency } from '../utils/format'

export const Campaigns = () => {
  const { data, isLoading, error } = useCampaigns()
  const campaigns = Array.isArray(data) ? data : []

  const chartData = campaigns.map((campaign) => ({
    name: campaign.name,
    budget: (campaign.spend ?? 0) / 1000,
    roi: campaign.roi ?? 0,
    conversions: Math.round((campaign.spend ?? 0) / 2500),
  }))

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Campaign management</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Performance-driven outreach planning</h2>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">{campaigns.length} active campaigns</div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          Unable to load campaign data from the backend: {error instanceof Error ? error.message : 'Request failed'}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        {isLoading ? <p className="text-sm text-slate-500">Loading campaigns...</p> : campaigns.map((campaign) => (
          <div key={campaign.id} className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">{campaign.channel}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{campaign.name}</h3>
              </div>
              <div className="rounded-2xl bg-violet-100 p-2 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"><Target size={18} /></div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <span className="text-sm text-slate-500 dark:text-slate-400">Budget</span>
                <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white"><DollarSign size={15} />{formatCurrency(campaign.spend ?? 0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <span className="text-sm text-slate-500 dark:text-slate-400">ROI</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-600"><TrendingUp size={15} />{(campaign.roi ?? 0).toFixed(1)}x</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <span className="text-sm text-slate-500 dark:text-slate-400">Performance</span>
                <span className="font-semibold text-slate-900 dark:text-white">{campaign.performance}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <span className="text-sm text-slate-500 dark:text-slate-400">Conversions</span>
                <span className="font-semibold text-slate-900 dark:text-white">{Math.round((campaign.spend ?? 0) / 2500)}</span>
              </div>
            </div>

            <button className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Review campaign <ArrowUpRight size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Budget and ROI overview</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">A quick comparison across campaigns</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="budget" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="roi" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
