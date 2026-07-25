import { BarChart3, Bot, Building2, LayoutDashboard, Moon, Settings, ShieldCheck, SunMedium, UserCircle2, FileText, Megaphone, GraduationCap } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Schools', to: '/schools', icon: GraduationCap },
  { label: 'Competitors', to: '/competitors', icon: ShieldCheck },
  { label: 'Campaigns', to: '/campaigns', icon: Megaphone },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'AI Chat', to: '/ai-chat', icon: Bot },
  { label: 'Reports', to: '/reports', icon: FileText },
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'Profile', to: '/profile', icon: UserCircle2 },
]

export const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <aside className={`hidden lg:flex flex-col justify-between border-r border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="rounded-2xl bg-violet-600 p-2 text-white">
            <Building2 size={20} />
          </div>
          {!collapsed && <div>
            <p className="text-sm font-semibold">EduIntel AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admissions OS</p>
          </div>}
        </div>
        <nav className="mt-2 space-y-1 px-3">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <button onClick={toggleTheme} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>}
        </button>
      </div>
    </aside>
  )
}
