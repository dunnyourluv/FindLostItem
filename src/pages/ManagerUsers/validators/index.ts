import { ValidateRules } from '@/hooks'

export type CreateUserFields = {
  username: string
  password: string
  email: string
}

export const validateCreateUser: ValidateRules<CreateUserFields> = [
  {
    field: 'username',
    validate(value) {
      if (!value) {
        return 'Username is required'
      }
      return null
    },
  },
  {
    field: 'password',
    validate(value) {
      if (!value) {
        return 'Password is required'
      }
      if (value.length < 6) {
        return 'Password must be at least 6 characters'
      }
      return null
    },
  },
  {
    field: 'email',
    validate(value) {
      if (!value) {
        return 'Email is required'
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Email is invalid'
      }
      return null
    },
  },
]
