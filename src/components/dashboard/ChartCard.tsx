import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle: string
  badge?: string
  children: ReactNode
}

export const ChartCard = ({ title, subtitle, badge, children }: ChartCardProps) => {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        {badge ? <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">{badge}</span> : null}
      </div>
      {children}
    </div>
  )
}
