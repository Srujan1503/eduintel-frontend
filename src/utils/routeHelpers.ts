export const getPageTitle = (path: string) => {
  const route = path.replace('/', '') || 'home'
  return route.split('-').map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' ')
}
