import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />
}
