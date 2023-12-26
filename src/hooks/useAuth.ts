import { AuthContext } from '@/contexts'
import { useContext } from 'react'

const useAuth = () => {
  const authContext = useContext(AuthContext)
  return {
    ...authContext,
    isLogged: Boolean(authContext.authState.login.user),
    user: authContext.authState.login.user,
  }
}

export default useAuth
