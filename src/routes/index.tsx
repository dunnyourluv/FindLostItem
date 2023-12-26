import { useRoutes } from 'react-router-dom'
import commonRoutes from './commonRoutes'
import publicRoutes from './publicRoutes'
import { NotFound } from '@/pages/disc'
import { useAuth } from '@/hooks'
import adminRoutes from './adminRoutes'

const AppRoutes = () => {
  const { isLogged, user } = useAuth()
  const routes = [...commonRoutes]

  if (!isLogged) {
    routes.push(...publicRoutes)
  }

  if (user && user.isAdmin) routes.push(...adminRoutes)

  routes.push({
    path: '*',
    element: <NotFound />,
  })
  const element = useRoutes(routes)
  return element
}

export default AppRoutes
