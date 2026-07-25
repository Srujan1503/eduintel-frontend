import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

const Landing = lazy(() => import('../pages/Landing').then((module) => ({ default: module.Landing })))
const Login = lazy(() => import('../pages/Login').then((module) => ({ default: module.Login })))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword })))
const ResetPassword = lazy(() => import('../pages/ResetPassword').then((module) => ({ default: module.ResetPassword })))
const Dashboard = lazy(() => import('../pages/Dashboard').then((module) => ({ default: module.Dashboard })))
const Schools = lazy(() => import('../pages/Schools').then((module) => ({ default: module.Schools })))
const Competitors = lazy(() => import('../pages/Competitors').then((module) => ({ default: module.Competitors })))
const Campaigns = lazy(() => import('../pages/Campaigns').then((module) => ({ default: module.Campaigns })))
const Analytics = lazy(() => import('../pages/Analytics').then((module) => ({ default: module.Analytics })))
const AiChat = lazy(() => import('../pages/AiChat').then((module) => ({ default: module.AiChat })))
const Reports = lazy(() => import('../pages/Reports').then((module) => ({ default: module.Reports })))
const Settings = lazy(() => import('../pages/Settings').then((module) => ({ default: module.Settings })))
const Profile = lazy(() => import('../pages/Profile').then((module) => ({ default: module.Profile })))
const NotFound = lazy(() => import('../pages/NotFound').then((module) => ({ default: module.NotFound })))

const loadingFallback = (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
    <div className="text-center">
      <div className="mb-3 h-2 w-24 animate-pulse rounded-full bg-slate-700" />
      <p className="text-sm text-slate-400">Loading experience…</p>
    </div>
  </div>
)

export const AppRoutes = () => (
  <Suspense fallback={loadingFallback}>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
  </Suspense>
)
