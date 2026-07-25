import { Bell, Moon, UserCircle2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const Settings = () => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Workspace settings</p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Personalize the platform experience</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center gap-2 text-violet-600"><UserCircle2 size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h3></div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Name: Maya Chen</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Role: VP of Enrollment</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Region: Global</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center gap-2 text-violet-600"><Bell size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h3></div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Weekly dashboard digest</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Competitor alerts</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">Budget threshold warnings</div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-600"><Moon size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Theme</h3></div>
          <button onClick={toggleTheme} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
            {darkMode ? 'Switch to light' : 'Switch to dark'}
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Adaptive surfaces and elevated contrast make the workspace feel premium and focused.</p>
      </div>
    </div>
  )
}
