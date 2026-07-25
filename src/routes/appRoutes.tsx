import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { Analytics } from '../pages/Analytics'
import { AiChat } from '../pages/AiChat'
import { Campaigns } from '../pages/Campaigns'
import { Competitors } from '../pages/Competitors'
import { Dashboard } from '../pages/Dashboard'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Landing } from '../pages/Landing'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { Profile } from '../pages/Profile'
import { Reports } from '../pages/Reports'
import { Schools } from '../pages/Schools'
import { Settings } from '../pages/Settings'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

export const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)
