import type { ActivityItem, Campaign, Competitor, KPI, RecommendationItem, School } from '../types'

export const kpiCards: KPI[] = [
  { label: 'Admission Growth', value: '+18.4%', delta: '+3.2% from last month', icon: 'TrendingUp' },
  { label: 'Marketing ROI', value: '4.8x', delta: '+12% vs target', icon: 'Target' },
  { label: 'Competitor Threat', value: 'High', delta: '2 new offers detected', icon: 'ShieldAlert' },
  { label: 'Growth Score', value: '92/100', delta: 'Best cohort this quarter', icon: 'Sparkles' },
  { label: 'Campaign Performance', value: '87%', delta: 'Strong engagement', icon: 'BarChart3' },
  { label: 'Parent Satisfaction', value: '4.8/5', delta: 'Up 0.4 from last term', icon: 'HeartHandshake' },
]

export const admissionTrend = [
  { month: 'Jan', applications: 320 },
  { month: 'Feb', applications: 348 },
  { month: 'Mar', applications: 392 },
  { month: 'Apr', applications: 418 },
  { month: 'May', applications: 461 },
  { month: 'Jun', applications: 503 },
]

export const campaignRoi = [
  { name: 'Email', roi: 3.2 },
  { name: 'Search', roi: 4.1 },
  { name: 'Social', roi: 2.8 },
  { name: 'Partner', roi: 5.3 },
]

export const coursePopularity = [
  { name: 'AI', value: 32 },
  { name: 'Business', value: 24 },
  { name: 'Health', value: 19 },
  { name: 'Design', value: 15 },
  { name: 'Law', value: 10 },
]

export const recentActivities: ActivityItem[] = [
  { title: 'Campaign launched', detail: 'The STEM conversion campaign went live in 8 regions.', time: '12m ago' },
  { title: 'Dashboard alert', detail: 'Competitor X increased pricing by 7%.', time: '42m ago' },
  { title: 'School record updated', detail: 'Northbridge College refreshed its scholarship summary.', time: '1h ago' },
]

export const recommendations: RecommendationItem[] = [
  { title: 'Increase paid search budget', detail: 'Search ads are producing the highest conversion rate this month.' },
  { title: 'Prioritize parent outreach', detail: 'High-intent families are responding well to SMS nurturing journeys.' },
]

export const schoolsData: School[] = [
  { id: 1, name: 'Northbridge College', region: 'North America', program: 'STEM', status: 'Active', enrollment: 1240, revenue: 3200000 },
  { id: 2, name: 'Harbor School', region: 'Europe', program: 'Business', status: 'Review', enrollment: 960, revenue: 2475000 },
  { id: 3, name: 'Lakeside Academy', region: 'Asia Pacific', program: 'Health', status: 'Active', enrollment: 1380, revenue: 3650000 },
  { id: 4, name: 'Summit Institute', region: 'Middle East', program: 'Design', status: 'Paused', enrollment: 540, revenue: 1320000 },
]

export const competitorsData: Competitor[] = [
  { id: 1, name: 'BrightPath University', sector: 'Private', threatScore: 89, momentum: 'Accelerating', lastMove: 'Launched AI scholarship plan' },
  { id: 2, name: 'Nova College', sector: 'Regional', threatScore: 72, momentum: 'Stable', lastMove: 'Expanded hybrid campus footprint' },
  { id: 3, name: 'Crestline Academy', sector: 'Online', threatScore: 65, momentum: 'Rising', lastMove: 'Increased digital marketing spend' },
]

export const campaignsData: Campaign[] = [
  { id: 1, name: 'STEM Enrollment Drive', channel: 'Paid Search', spend: 48000, roi: 4.7, performance: 'Excellent', budgetStatus: 'Healthy' },
  { id: 2, name: 'Parent Nurture Series', channel: 'Email + SMS', spend: 22000, roi: 3.9, performance: 'Strong', budgetStatus: 'On Track' },
  { id: 3, name: 'Community Open House', channel: 'Events', spend: 16000, roi: 2.8, performance: 'Moderate', budgetStatus: 'Watch' },
]
