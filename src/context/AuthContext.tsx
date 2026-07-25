import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

interface AuthUser {
  id: string
  email?: string | null
  name?: string | null
  avatarUrl?: string | null
}

interface AuthContextValue {
  isAuthenticated: boolean
  loading: boolean
  user: AuthUser | null
  login: (redirectTo?: string) => Promise<void>
  logout: () => Promise<void>
  signInWithPassword: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, options?: { fullName?: string }) => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
  resetPassword: (newPassword: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const buildRedirectUrl = (path: string) => {
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

const toAuthUser = (session: { user?: { id: string; email?: string | null; user_metadata?: { full_name?: string | null; name?: string | null; avatar_url?: string | null } } | null } | null): AuthUser | null => {
  const authUser = session?.user
  if (!authUser) return null

  return {
    id: authUser.id,
    email: authUser.email,
    name: authUser.user_metadata?.full_name ?? authUser.user_metadata?.name,
    avatarUrl: authUser.user_metadata?.avatar_url,
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    const initialize = async () => {
      const client = supabase
      if (!client) {
        setLoading(false)
        return
      }

      const { data: { session } } = await client.auth.getSession()
      setUser(toAuthUser(session))
      setIsAuthenticated(Boolean(session))
      setLoading(false)
    }

    void initialize()

    const client = supabase
    if (!client) {
      setLoading(false)
      return
    }

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(toAuthUser(session))
      setIsAuthenticated(Boolean(session))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (redirectTo = '/dashboard') => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: buildRedirectUrl(redirectTo),
      },
    })

    if (error) throw error
  }

  const signInWithPassword = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const register = async (email: string, password: string, options?: { fullName?: string }) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: buildRedirectUrl('/dashboard'),
        data: { full_name: options?.fullName ?? '' },
      },
    })

    if (error) throw error
  }

  const sendPasswordResetEmail = async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: buildRedirectUrl('/reset-password'),
    })

    if (error) throw error
  }

  const resetPassword = async (newPassword: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  const logout = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setIsAuthenticated(false)
      setUser(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = useMemo(() => ({
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    signInWithPassword,
    register,
    sendPasswordResetEmail,
    resetPassword,
  }), [isAuthenticated, loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
