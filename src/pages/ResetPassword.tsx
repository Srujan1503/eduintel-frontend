import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ResetPassword = () => {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!password.trim() || password.length < 8) {
      setError('Choose a password with at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords must match.')
      return
    }

    try {
      setLoading(true)
      await resetPassword(password)
      setMessage('Your password has been updated. Redirecting to sign in…')
      window.setTimeout(() => navigate('/login'), 1200)
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to reset your password right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#111827_100%)]">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-2 text-white"><Sparkles size={18} /></div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Create a new password</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Secure your EduIntel AI account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="mb-2 block">New password</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
              <Lock size={16} className="text-slate-400" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter a strong password" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="mb-2 block">Confirm password</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
              <Lock size={16} className="text-slate-400" />
              <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-70">
            {loading ? 'Updating...' : 'Reset password'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link to="/login" className="font-semibold text-violet-600">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
