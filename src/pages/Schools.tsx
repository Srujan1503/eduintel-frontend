import { useMemo, useState } from 'react'
import { SchoolFormModal } from '../components/schools/SchoolFormModal'
import { SchoolPagination } from '../components/schools/SchoolPagination'
import { SchoolTable } from '../components/schools/SchoolTable'
import { SchoolToolbar } from '../components/schools/SchoolToolbar'
import { useCreateSchool, useDeleteSchool, useSchools, useUpdateSchool } from '../hooks/queries/useSchools'
import type { School } from '../types'

type SortKey = 'name' | 'region' | 'program' | 'enrollment' | 'revenue'

export const Schools = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<School | undefined>()
  const pageSize = 4
  const { data, isLoading, error } = useSchools()
  const createSchool = useCreateSchool()
  const updateSchool = useUpdateSchool()
  const deleteSchool = useDeleteSchool()
  const schools = Array.isArray(data) ? data : []

  const filtered = useMemo(() => {
    const nextQuery = query.toLowerCase()
    return schools.filter((school) => [school.name, school.region, school.program].some((value) => (value ?? '').toLowerCase().includes(nextQuery)))
  }, [query, schools])

  const sorted = useMemo(() => {
    const sortedSchools = [...filtered]
    sortedSchools.sort((left, right) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      const leftValue = left[sortKey]
      const rightValue = right[sortKey]

      if (typeof leftValue === 'string' && typeof rightValue === 'string') {
        return leftValue.localeCompare(rightValue) * direction
      }

      return ((leftValue as number) - (rightValue as number)) * direction
    })

    return sortedSchools
  }, [filtered, sortDirection, sortKey])

  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((value) => (value === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
  }

  const handleAdd = () => {
    setEditingSchool(undefined)
    setModalOpen(true)
  }

  const handleEdit = (school: School) => {
    setEditingSchool(school)
    setModalOpen(true)
  }

  const handleDelete = (id: number | string) => {
    deleteSchool.mutate(String(id))
    setPage(1)
  }

  const handleSubmit = (value: Omit<School, 'id'>) => {
    if (editingSchool) {
      updateSchool.mutate({ id: String(editingSchool.id), payload: { ...editingSchool, ...value } as Partial<School> })
    } else {
      createSchool.mutate(value as Partial<School>)
    }

    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          Unable to load school records from the backend: {error instanceof Error ? error.message : 'Request failed'}
        </div>
      ) : null}

      <SchoolToolbar query={query} total={filtered.length} onQueryChange={(value) => { setQuery(value); setPage(1) }} onAdd={handleAdd} />

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        {isLoading ? <p className="mb-4 text-sm text-slate-500">Loading school records…</p> : null}
        <SchoolTable schools={paged} sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} onEdit={handleEdit} onDelete={handleDelete} />
        <SchoolPagination page={page} pageSize={pageSize} total={sorted.length} onPrev={() => setPage((value) => Math.max(1, value - 1))} onNext={() => setPage((value) => value + 1)} />
      </div>

      <SchoolFormModal open={modalOpen} mode={editingSchool ? 'edit' : 'create'} initialValue={editingSchool} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
