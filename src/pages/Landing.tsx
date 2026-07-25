import { BrainCircuit, Building2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const benefits = ['AI-driven admissions intelligence', 'Marketing ROI forecasting', 'Live school and competitor insights']

export const Landing = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleContinueWithGoogle = async () => {
    if (isAuthenticated) {
      navigate('/dashboard')
      return
    }

    await login()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#111827_100%)]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-2xl shadow-violet-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300">
              <BrainCircuit size={16} />
              AI-powered admission and marketing intelligence
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Turn institutional data into confident growth decisions.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                EduIntel AI helps education leaders uncover trends, optimize campaigns, and protect enrollment performance in real time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => void handleContinueWithGoogle()} className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-600/20">Continue with Google</button>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-2"><Sparkles size={14} className="text-violet-500" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Executive snapshot</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">+18.4% growth</span>
            </div>
            <div className="mt-6 space-y-4">
              {[{ title: 'Enrollment pipeline', value: '3.2k', hint: 'Qualified leads' }, { title: 'Marketing efficiency', value: '4.8x', hint: 'ROI uplift' }, { title: 'Competitive readiness', value: '92%', hint: 'Threat score' }].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.title}</p>
                    <Building2 size={16} className="text-violet-500" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
