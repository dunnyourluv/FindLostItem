import { AuthApi } from '@/api'
import { useAuth } from '@/hooks'
import { authSuccessLogin } from '@/redux/actions'
import { useEffect, useState } from 'react'
import { Loading } from '../Loading'

type Props = {
  children: React.ReactNode
}

const LoadAuthLayout = ({ children }: Props) => {
  const { authDispatch, isLogged } = useAuth()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (isLogged) {
      return setLoading(false)
    }
    const info = AuthApi.readFromLocal()
    if (info) {
      AuthApi.login(info)
        .then((user) => {
          if (user) {
            authDispatch(authSuccessLogin(user))
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <Loading />

  return children
}

export default LoadAuthLayout
