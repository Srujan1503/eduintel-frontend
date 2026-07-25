export interface AppUser {
  id: string
  email: string
  name: string
  role: string
}

export interface RouteConfig {
  path: string
  title: string
  requiresAuth?: boolean
}
