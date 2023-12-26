import { UserTypes } from '@/types'
import { Action } from './Action'

export enum AuthActionTypes {
  START_LOGIN,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  START_REGISTER,
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  LOGOUT,
}

export type AuthActions =
  | Action<AuthActionTypes.START_LOGIN>
  | Action<AuthActionTypes.SUCCESS_LOGIN, UserTypes.Instance>
  | Action<AuthActionTypes.ERROR_LOGIN, string>
  | Action<AuthActionTypes.START_REGISTER, UserTypes.Register>
  | Action<AuthActionTypes.SUCCESS_REGISTER, string>
  | Action<AuthActionTypes.ERROR_REGISTER, string>
  | Action<AuthActionTypes.LOGOUT>

export const authStartLogin = (): AuthActions => ({
  type: AuthActionTypes.START_LOGIN,
})

export const authSuccessLogin = (payload: UserTypes.Instance): AuthActions => ({
  type: AuthActionTypes.SUCCESS_LOGIN,
  payload,
})

export const authErrorLogin = (payload: string): AuthActions => ({
  type: AuthActionTypes.ERROR_LOGIN,
  payload,
})

export const authStartRegister = (
  payload: UserTypes.Register
): AuthActions => ({
  type: AuthActionTypes.START_REGISTER,
  payload,
})

export const authSuccessRegister = (payload: string): AuthActions => ({
  type: AuthActionTypes.SUCCESS_REGISTER,
  payload,
})

export const authErrorRegister = (payload: string): AuthActions => ({
  type: AuthActionTypes.ERROR_REGISTER,
  payload,
})

export const authLogout = (): AuthActions => ({
  type: AuthActionTypes.LOGOUT,
})
