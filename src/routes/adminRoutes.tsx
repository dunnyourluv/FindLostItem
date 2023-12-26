import { ManagerPost } from '@/pages/ManagerPost'
import { ManagerTopics } from '@/pages/ManagerTopics'
import ManagerUsers from '@/pages/ManagerUsers/ManagerUsers'
import { RouteObject } from 'react-router-dom'

const adminRoutes: RouteObject[] = [
  {
    path: '/manager-posts',
    element: <ManagerPost />,
  },
  {
    path: '/manager-topics',
    element: <ManagerTopics />,
  },
  {
    path: '/manager-users',
    element: <ManagerUsers />,
  },
]

export default adminRoutes
