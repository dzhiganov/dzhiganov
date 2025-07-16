export default defineNuxtRouteMiddleware((to, from) => {
  // This middleware will run on client-side route changes
  const { user } = useAuth()
  
  // If user is not authenticated and trying to access protected route
  if (!user.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }
  
  // If user is authenticated and trying to access auth pages
  if (user.value && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/dashboard')
  }
})