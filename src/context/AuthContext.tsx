import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

interface AuthContextValue {
  isAuthenticated: boolean
  loading: boolean
  user: { id: string; email?: string | null; name?: string | null; avatarUrl?: string | null } | null
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthContextValue['user']>(null)

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
      const nextUser = session?.user ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name ?? session.user.user_metadata?.name,
        avatarUrl: session.user.user_metadata?.avatar_url,
      } : null

      setIsAuthenticated(Boolean(session))
      setUser(nextUser)
      setLoading(false)
    }

    initialize()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name ?? session.user.user_metadata?.name,
        avatarUrl: session.user.user_metadata?.avatar_url,
      } : null

      setIsAuthenticated(Boolean(session))
      setUser(nextUser)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

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

  const value = useMemo(() => ({ isAuthenticated, loading, user, login, logout }), [isAuthenticated, loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
