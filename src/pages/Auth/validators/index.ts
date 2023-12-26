import { ValidateRules } from '@/hooks/useFormValidator'

export type LoginFields = {
  username: string
  password: string
}

export type RegisterFields = {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export const validateLogin: ValidateRules<LoginFields> = [
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
]

export const validateRegister: ValidateRules<RegisterFields> = [
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
    field: 'confirmPassword',
    validate(value, { password }) {
      if (!value) {
        return 'Confirm password is required'
      }
      if (value !== password) {
        return 'Confirm password does not match'
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
