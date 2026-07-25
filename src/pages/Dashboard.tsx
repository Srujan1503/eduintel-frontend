import { ArrowUpRight, BarChart3, HeartHandshake, ShieldAlert, Sparkles, Target, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { ChartCard } from '../components/dashboard/ChartCard'
import { StatCard } from '../components/dashboard/StatCard'
import { admissionTrendData, campaignRoiData, competitorComparisonData, coursePopularityData, kpiData, recentFeed } from '../data/dashboardData'
import { useDashboardKpis, useDashboardOverview } from '../hooks/queries/useDashboard'
import { formatCurrency } from '../utils/format'

const iconMap: Record<string, React.ReactNode> = {
  trend: <TrendingUp size={18} />,
  roi: <Target size={18} />,
  threat: <ShieldAlert size={18} />,
  score: <Sparkles size={18} />,
  satisfaction: <HeartHandshake size={18} />,
  campaign: <BarChart3 size={18} />,
}

export const Dashboard = () => {
  const { data: overview, isLoading: overviewLoading, error: overviewError } = useDashboardOverview()
  const { data: kpiSummary, isLoading: kpisLoading, error: kpiError } = useDashboardKpis()

  const summaryCards = useMemo(() => {
    return kpiData.map((card, index) => {
      if (index === 0) {
        const growthScore = overview?.growth_score ?? kpiSummary?.growth_score
        return {
          ...card,
          value: growthScore != null ? `${growthScore.toFixed(0)}/100` : card.value,
          detail: growthScore != null ? 'Updated from live overview data' : card.detail,
        }
      }

      if (index === 1) {
        const roi = overview?.average_marketing_roi ?? kpiSummary?.average_marketing_roi
        return {
          ...card,
          value: roi != null ? `${roi.toFixed(1)}x` : card.value,
          detail: roi != null ? 'Live ROI signal from the backend' : card.detail,
        }
      }

      if (index === 2) {
        const competitors = overview?.total_competitors ?? kpiSummary?.total_competitors
        return {
          ...card,
          value: competitors != null ? `${competitors} tracked` : card.value,
          detail: competitors != null ? `${competitors} competitor signals monitored` : card.detail,
        }
      }

      if (index === 5) {
        const campaigns = overview?.active_campaigns ?? kpiSummary?.active_campaigns
        return {
          ...card,
          value: campaigns != null ? `${campaigns} active` : card.value,
          detail: campaigns != null ? `${campaigns} campaigns currently in motion` : card.detail,
        }
      }

      return card
    })
  }, [kpiSummary, overview])

  const isLoading = overviewLoading || kpisLoading
  const errorMessage = overviewError instanceof Error ? overviewError.message : kpiError instanceof Error ? kpiError.message : null

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          Unable to reach the live backend right now: {errorMessage}
        </div>
      ) : null}

      <div className="rounded-[32px] border border-slate-200/80 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 p-6 text-white shadow-xl shadow-violet-500/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-100">Executive overview</p>
            <h2 className="mt-2 text-3xl font-semibold">Admissions and marketing intelligence</h2>
            <p className="mt-3 max-w-2xl text-sm text-violet-100/90">Monitor student demand, campaign efficiency, and competition pressure in one premium workspace.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-sm text-violet-100">Live signal</p>
            <p className="text-lg font-semibold">{overview?.growth_score != null ? `${overview.growth_score.toFixed(0)}% stronger demand` : '+12% stronger demand'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">Loading live dashboard data…</div>
        ) : null}
        {summaryCards.map((card) => (
          <StatCard key={card.title} title={card.title} value={card.value} detail={card.detail} accent={card.accent} icon={iconMap[card.icon]} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ChartCard title="Admission trend" subtitle="Applications across the last six months" badge="Forecasting">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={admissionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#7c3aed" fill="#8b5cf6" fillOpacity={0.24} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Competitor comparison" subtitle="Threat posture across key rivals" badge="Watchlist">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competitorComparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar dataKey="threat" stroke="#7c3aed" fill="#8b5cf6" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="Campaign ROI" subtitle="Channel efficiency by acquisition type" badge="Healthy mix">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignRoiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="roi" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Course popularity" subtitle="Demand by academic focus" badge="Momentum">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={coursePopularityData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={5}>
                  {coursePopularityData.map((entry, index) => (
                    <Cell key={entry.name} fill={['#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Recent activity" subtitle="System events and campaign updates" badge="Live">
          <div className="space-y-3">
            {recentFeed.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                <div className="rounded-full bg-violet-100 p-2 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"><ArrowUpRight size={16} /></div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Performance snapshot" subtitle="Current operating confidence" badge="Stable">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span>Pipeline coverage</span>
                <span className="font-semibold text-slate-900 dark:text-white">87%</span>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span>Budget utilization</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(742000)}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span>Retention signal</span>
                <span className="font-semibold text-slate-900 dark:text-white">High confidence</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
