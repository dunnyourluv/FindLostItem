import { AuthActions } from '@/redux/actions'
import { AuthState } from '@/redux/reducers'
import React, { createContext } from 'react'

export type AuthContextType = {
  authState: AuthState
  authDispatch: React.Dispatch<AuthActions>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
