import { Plus, Search } from 'lucide-react'

type SchoolToolbarProps = {
  query: string
  total: number
  onQueryChange: (value: string) => void
  onAdd: () => void
}

export const SchoolToolbar = ({ query, total, onQueryChange, onAdd }: SchoolToolbarProps) => (
  <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 dark:border-slate-800 dark:bg-slate-950/80 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">School portfolio</p>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Manage institutional programs</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{total} schools currently tracked across your network.</p>
    </div>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="flex min-w-[240px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <Search size={15} />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by school or program" className="w-full bg-transparent outline-none" />
      </label>
      <button onClick={onAdd} className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-600/20">
        <Plus size={16} /> Add school
      </button>
    </div>
  </div>
)
