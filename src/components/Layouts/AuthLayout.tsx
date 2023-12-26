import { AuthApi } from '@/api'
import { useAuth } from '@/hooks'
import { authSuccessLogin } from '@/redux/actions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Loading'

type Props = {
  children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { authDispatch, isLogged } = useAuth()

  useEffect(() => {
    if (isLogged) return setIsLoading(false)
    const info = AuthApi.readFromLocal()
    if (!info) return navigate('/login')
    AuthApi.login(info)
      .then((user) => {
        if (user) {
          authDispatch(authSuccessLogin(user))
        }
      })
      .catch(() => {
        navigate('/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return children
}

export default AuthLayout
