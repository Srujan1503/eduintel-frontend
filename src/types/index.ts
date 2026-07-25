export interface School {
  id: number | string
  name: string
  region?: string
  program?: string
  status?: 'Active' | 'Review' | 'Paused' | string
  enrollment?: number
  revenue?: number
  type?: string
  subscription_tier?: string
  address?: string
  city?: string
  state?: string
  country?: string
  website?: string
  phone?: string
  logo_url?: string
  is_active?: boolean
}

export interface Competitor {
  id: number | string
  name: string
  sector?: string
  threatScore?: number
  momentum?: string
  lastMove?: string
  domain?: string
  meta?: Record<string, unknown>
  threat_score?: number
  school_id?: string
}

export interface Campaign {
  id: number | string
  name: string
  channel?: string
  spend?: number
  roi?: number
  performance?: string
  budgetStatus?: string
  budget?: number
  conversions?: number
  start_date?: string
  end_date?: string
  meta?: Record<string, unknown>
  school_id?: string
}

export interface KPI {
  label: string
  value: string
  delta: string
  icon: string
}

export interface ActivityItem {
  title: string
  detail: string
  time: string
}

export interface RecommendationItem {
  title: string
  detail: string
}

export interface DashboardOverview {
  total_schools: number
  total_competitors: number
  active_campaigns: number
  average_marketing_roi?: number | null
  growth_score?: number | null
}

export interface DashboardKpis extends DashboardOverview {}

