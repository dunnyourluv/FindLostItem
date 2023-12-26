import { AuthContext } from '@/contexts'
import { authReducer, initialAuthState } from '@/redux/reducers'
import { useReducer } from 'react'

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
