import { ArrowDownUp, Edit3, Trash2 } from 'lucide-react'
import type { School } from '../../types'
import { formatCurrency } from '../../utils/format'

type SortKey = 'name' | 'region' | 'program' | 'enrollment' | 'revenue'

type SchoolTableProps = {
  schools: School[]
  sortKey: SortKey
  sortDirection: 'asc' | 'desc'
  onSort: (key: SortKey) => void
  onEdit: (school: School) => void
  onDelete: (id: number | string) => void
}

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  Review: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  Paused: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
}

export const SchoolTable = ({ schools, sortKey, sortDirection, onSort, onEdit, onDelete }: SchoolTableProps) => {
  const renderSortButton = (key: SortKey, label: string) => {
    const active = sortKey === key
    return (
      <button className="flex items-center gap-2 text-left" onClick={() => onSort(key)}>
        <span>{label}</span>
        <ArrowDownUp size={14} className={active ? 'text-violet-600' : ''} />
        {active ? <span className="text-[10px] uppercase tracking-[0.2em] text-violet-600">{sortDirection}</span> : null}
      </button>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
        <thead className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3">{renderSortButton('name', 'School')}</th>
            <th className="px-4 py-3">{renderSortButton('region', 'Region')}</th>
            <th className="px-4 py-3">{renderSortButton('program', 'Program')}</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">{renderSortButton('enrollment', 'Enrollment')}</th>
            <th className="px-4 py-3">{renderSortButton('revenue', 'Revenue')}</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-sm dark:divide-slate-800 dark:bg-slate-950">
          {schools.map((school) => (
            <tr key={school.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{school.name}</td>
              <td className="px-4 py-3">{school.region ?? '—'}</td>
              <td className="px-4 py-3">{school.program ?? '—'}</td>
              <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[school.status ?? 'Active']}`}>{school.status ?? 'Active'}</span></td>
              <td className="px-4 py-3">{(school.enrollment ?? 0).toLocaleString()}</td>
              <td className="px-4 py-3">{formatCurrency(school.revenue ?? 0)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(school)} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:text-violet-600 dark:border-slate-700 dark:text-slate-300">
                    <Edit3 size={15} />
                  </button>
                  <button onClick={() => onDelete(typeof school.id === 'number' ? school.id : Number(school.id))} className="rounded-xl border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/20">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
