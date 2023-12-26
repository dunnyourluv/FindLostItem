import { Button } from '@/components/Elements'
import { FieldInput } from '@/components/Form'
import { useFormValidator } from '@/hooks'
import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { validateLogin } from '../validators'
import { UserTypes } from '@/types'
import { Alter } from '@/components/Alter'

type Props = ComponentPropsWithoutRef<'form'> & {
  onLogin?: (data: UserTypes.Login) => void
  error?: string
}

const LoginForm = ({ className, onLogin, error = '', ...props }: Props) => {
  const { getInputProps, getFormValidationResult } =
    useFormValidator(validateLogin)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = getFormValidationResult()
    result.isValid && onLogin && onLogin(result.fields)
  }

  return (
    <form onSubmit={handleSubmit} className={twMerge('', className)} {...props}>
      <div className="mb-4">
        {error && <Alter message={error} type="error" />}
      </div>
      <div className="mb-4">
        <FieldInput label="Username" {...getInputProps('username')} />
      </div>
      <div className="mb-4">
        <FieldInput
          label="Password"
          type="password"
          {...getInputProps('password')}
        />
      </div>
      <div className="mb-4">
        <Button className="w-full">Đăng nhập</Button>
      </div>
      <div className="text-center">
        <span>Chưa có tài khoản? </span>
        <Link
          className="text-primary hover:text-black transition"
          to="/register"
        >
          Đăng ký
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
