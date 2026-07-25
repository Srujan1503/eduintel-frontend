import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { School } from '../../types'

type SchoolFormModalProps = {
  open: boolean
  mode: 'create' | 'edit'
  initialValue?: School
  onClose: () => void
  onSubmit: (value: Omit<School, 'id'>) => void
}

const emptyValue: Omit<School, 'id'> = {
  name: '',
  region: '',
  program: '',
  status: 'Active',
  enrollment: 0,
  revenue: 0,
}

export const SchoolFormModal = ({ open, mode, initialValue, onClose, onSubmit }: SchoolFormModalProps) => {
  const [formState, setFormState] = useState<Omit<School, 'id'>>(emptyValue)

  useEffect(() => {
    if (initialValue) {
      setFormState({
        name: initialValue.name,
        region: initialValue.region,
        program: initialValue.program,
        status: initialValue.status,
        enrollment: initialValue.enrollment,
        revenue: initialValue.revenue,
      })
    } else {
      setFormState(emptyValue)
    }
  }, [initialValue, open])

  if (!open) return null

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(formState)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">{mode === 'create' ? 'Add school' : 'Edit school'}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{mode === 'create' ? 'Create a new school record' : 'Update school information'}</h3>
          </div>
          <button onClick={onClose} className="rounded-2xl border border-slate-200 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-300">
            <X size={16} />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">School name</span>
              <input value={formState.name} onChange={(event) => setFormState((value) => ({ ...value, name: event.target.value }))} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Region</span>
              <input value={formState.region} onChange={(event) => setFormState((value) => ({ ...value, region: event.target.value }))} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Program</span>
              <input value={formState.program} onChange={(event) => setFormState((value) => ({ ...value, program: event.target.value }))} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Status</span>
              <select value={formState.status} onChange={(event) => setFormState((value) => ({ ...value, status: event.target.value as School['status'] }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900">
                <option value="Active">Active</option>
                <option value="Review">Review</option>
                <option value="Paused">Paused</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Enrollment</span>
              <input type="number" min="0" value={formState.enrollment} onChange={(event) => setFormState((value) => ({ ...value, enrollment: Number(event.target.value) }))} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Revenue</span>
              <input type="number" min="0" value={formState.revenue} onChange={(event) => setFormState((value) => ({ ...value, revenue: Number(event.target.value) }))} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button>
            <button type="submit" className="flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
              <Check size={16} /> Save school
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
