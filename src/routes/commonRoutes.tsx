import { RouteObject } from 'react-router-dom'
import { HomePage } from '../pages/disc'
import { Search } from '@/pages/Search'
import { Details } from '@/pages/Details'
import { Profile } from '@/pages/Profile'
import { EditPost, UploadPost } from '@/pages/UploadPost'

const commonRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: 'posts/:uuid',
    element: <Details />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/upload-post',
    element: <UploadPost />,
  },
  {
    path: '/posts/:uuid/edit',
    element: <EditPost />,
  },
]

export default commonRoutes
