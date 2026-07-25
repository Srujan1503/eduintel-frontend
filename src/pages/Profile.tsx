import { BadgeCheck, Mail, MapPin, Phone, Sparkles } from 'lucide-react'

export const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Leadership profile</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Maya Chen</h2>
          </div>
          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-600">Verified operator</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-violet-600 p-4 text-white"><Sparkles size={22} /></div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">VP of Enrollment</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Global strategy and student acquisition</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2"><Mail size={15} /> maya.chen@eduintel.ai</div>
            <div className="flex items-center gap-2"><Phone size={15} /> +1 415 832 0119</div>
            <div className="flex items-center gap-2"><MapPin size={15} /> San Francisco, CA</div>
            <div className="flex items-center gap-2"><BadgeCheck size={15} /> Trusted advisor for 24 institutional partners</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Current focus</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">Optimizing the next 90 days of recruitment campaigns</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">Strengthening parent engagement and first-choice conversion</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">Monitoring market shifts in five emerging regions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
