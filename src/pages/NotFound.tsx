import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center rounded-[28px] border border-slate-200/70 bg-white/80 p-8 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white">
          <Compass size={24} />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Page not found</h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400">The route you requested could not be located within the workspace.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white">
          <ArrowLeft size={16} /> Return to dashboard
        </Link>
      </div>
    </div>
  )
}
