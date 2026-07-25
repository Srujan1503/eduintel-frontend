import { ArrowRight, Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Login = () => {
  const { login, isAuthenticated, signInWithPassword, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleEmailAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!password.trim() || password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    try {
      setIsSubmitting(true)
      if (mode === 'login') {
        await signInWithPassword(email.trim(), password)
        setMessage('Signed in successfully. Redirecting…')
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name.')
          return
        }
        await register(email.trim(), password, { fullName: fullName.trim() })
        setMessage('Account created. Check your inbox to confirm your email.')
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to continue with email authentication.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      setError('')
      setMessage('')
      setIsSubmitting(true)
      await login('/dashboard')
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to sign in with Google right now.')
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
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{mode === 'login' ? 'Welcome back' : 'Create your account'}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{mode === 'login' ? 'Sign in to EduIntel AI' : 'Join EduIntel AI'}</p>
          </div>
        </div>

        <div className="mt-6 flex rounded-2xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
          <button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Login</button>
          <button type="button" onClick={() => setMode('register')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Register</button>
        </div>

        <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
          {mode === 'register' ? (
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="mb-2 block">Full name</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
                <Sparkles size={16} className="text-slate-400" />
                <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Alex Morgan" className="w-full bg-transparent outline-none" />
              </div>
            </label>
          ) : null}

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="mb-2 block">Email</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
              <Mail size={16} className="text-slate-400" />
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="mb-2 block">Password</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
              <Lock size={16} className="text-slate-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full bg-transparent outline-none" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

          <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-70">
            {isSubmitting ? 'Working...' : mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <button type="button" disabled={isSubmitting} onClick={() => void handleGoogleAuth()} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <span className="text-lg">G</span> Continue with Google
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="font-semibold text-violet-600">Forgot password?</Link>
          <a href="/" className="font-semibold text-violet-600">Back home</a>
        </div>
      </div>
    </div>
  )
}
