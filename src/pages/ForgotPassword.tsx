import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      setError('Password reset is unavailable until the Supabase credentials are configured.')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    setMessage('If an account exists, a password reset email has been sent.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#111827_100%)]">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-2 text-white"><Sparkles size={18} /></div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Forgot password</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Reset access to EduIntel AI</p>
          </div>
        </div>

        <form onSubmit={handleReset} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="mb-2 block">Email</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
              <Mail size={16} className="text-slate-400" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-70">
            {loading ? 'Sending...' : 'Send reset link'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link to="/login" className="font-semibold text-violet-600">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
