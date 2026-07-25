import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    try {
      setMessage('')
      setIsSubmitting(true)

      if (isAuthenticated) {
        navigate('/dashboard')
        return
      }

      await login()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to sign in right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#111827_100%)]">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-2 text-white"><Sparkles size={18} /></div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Welcome back</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to EduIntel AI</p>
          </div>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); void onSubmit() }} className="mt-8 space-y-4">
          {message ? <p className="text-sm text-rose-500">{message}</p> : null}

          <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-70">
            {isSubmitting ? 'Redirecting...' : 'Continue with Google'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Secure sign-in with Supabase OAuth.</span>
          <a href="/" className="font-semibold text-violet-600">Back home</a>
        </div>
      </div>
    </div>
  )
}
