import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mb-3 h-2 w-24 animate-pulse rounded-full bg-slate-700" />
          <p className="text-sm text-slate-400">Loading experience…</p>
        </div>
      </div>
    )
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />
}
