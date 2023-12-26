import { UserTypes } from '@/types'
import { AuthActionTypes, AuthActions } from '../actions'

export type AuthState = {
  login: {
    user: UserTypes.Instance | null
    error: string | null
    loading: boolean
  }
  register: {
    error: string | null
    loading: boolean
    success: boolean
  }
}

export const initialAuthState: AuthState = {
  login: {
    user: null,
    error: null,
    loading: false,
  },
  register: {
    error: null,
    loading: false,
    success: false,
  },
}

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.START_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        },
      }
    case AuthActionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          user: action.payload as UserTypes.Instance,
          loading: false,
          error: null,
        },
      }
    case AuthActionTypes.ERROR_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          error: action.payload as string,
          loading: false,
        },
      }
    case AuthActionTypes.START_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      }
    case AuthActionTypes.SUCCESS_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          success: true,
          loading: false,
        },
      }
    case AuthActionTypes.ERROR_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          error: action.payload as string,
          loading: false,
        },
      }
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        login: {
          ...state.login,
          user: null,
        },
      }
    default:
      return state
  }
}
