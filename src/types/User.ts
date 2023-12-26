import { HttpTypes } from '.'

export type Instance = {
  uuid: string
  username: string
  email: string
  isAdmin: boolean
  avatar: string
}

export type WithPassword = {
  password: string
} & Instance

export type Login = Pick<WithPassword, 'username' | 'password'>

export type Register = Pick<WithPassword, 'username' | 'email' | 'password'> & {
  avatar: File
}

export type Payload = HttpTypes.Payload<Instance>
