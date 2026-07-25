type SchoolPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export const SchoolPagination = ({ page, pageSize, total, onPrev, onNext }: SchoolPaginationProps) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500 dark:text-slate-400">Showing {start}-{end} of {total} schools</p>
      <div className="flex items-center gap-2">
        <button disabled={page === 1} onClick={onPrev} className="rounded-xl border border-slate-200 px-3 py-2 text-sm disabled:opacity-50 dark:border-slate-700">Previous</button>
        <button disabled={end >= total} onClick={onNext} className="rounded-xl border border-slate-200 px-3 py-2 text-sm disabled:opacity-50 dark:border-slate-700">Next</button>
      </div>
    </div>
  )
}
