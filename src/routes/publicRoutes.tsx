import { Login, Register } from '@/pages/Auth'
import { RouteObject } from 'react-router-dom'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]

export default publicRoutes
