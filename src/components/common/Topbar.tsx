import { Bell, ChevronRight, Menu, Search, Sparkles } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface TopbarProps {
  onToggle: () => void
}

export const Topbar = ({ onToggle }: TopbarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const crumbs = location.pathname.split('/').filter(Boolean)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-5 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="rounded-2xl border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300 lg:hidden">
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Education Intelligence Workspace</p>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            {crumbs.length ? crumbs.map((crumb, index) => (
              <span key={crumb} className="flex items-center gap-1">
                {index > 0 && <ChevronRight size={12} />}
                <span className="capitalize">{crumb.replace('-', ' ')}</span>
              </span>
            )) : <span>Home</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <Search size={15} />
          <span>Search schools, campaigns...</span>
        </div>
        <button className="rounded-2xl border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <img src={user?.avatarUrl ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name ?? user?.email ?? 'User') + '&background=7c3aed&color=fff'} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name ?? user?.email ?? 'User'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Signed in</p>
          </div>
        </div>
        <button onClick={() => void handleLogout()} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Logout</button>
        <Link to="/profile" className="flex items-center gap-2 rounded-2xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white">
          <Sparkles size={16} />
          <span>Live Insights</span>
        </Link>
      </div>
    </header>
  )
}
