import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/common/Sidebar'
import { Topbar } from '../components/common/Topbar'

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarWidth = useMemo(() => (collapsed ? 'w-20' : 'w-64'), [collapsed])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.18),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.23),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#111827_100%)] dark:text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar collapsed={collapsed} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onToggle={() => setCollapsed((value) => !value)} />
          <main className={`flex-1 p-4 sm:p-6 lg:p-8 ${sidebarWidth}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
