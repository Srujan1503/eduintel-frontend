import { ArrowUpRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  detail: string
  accent: string
  icon: React.ReactNode
}

export const StatCard = ({ title, value, detail, accent, icon }: StatCardProps) => {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-2xl p-2 ${accent}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
        <ArrowUpRight size={15} />
        <span>{detail}</span>
      </div>
    </div>
  )
}
