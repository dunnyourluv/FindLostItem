import { Button } from '@/components/Elements'
import { FieldInput, FieldUploadImage } from '@/components/Form'
import { useFormValidator } from '@/hooks'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { validateRegister } from '../validators'
import { UserTypes } from '@/types'
import { Alter } from '@/components/Alter'

type Props = ComponentPropsWithoutRef<'form'> & {
  onRegister?: (info: UserTypes.Register) => void
  error?: string
}

const RegisterForm = ({
  className,
  onRegister,
  error = '',
  ...props
}: Props) => {
  const [avatar, setAvatar] = useState<File[]>([])
  const [avatarError, setAvatarError] = useState('')
  const { getInputProps, getFormValidationResult } =
    useFormValidator(validateRegister)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = getFormValidationResult()
    if (result.isValid && avatar.length) {
      onRegister &&
        onRegister({
          avatar: avatar[0],
          email: result.fields.email,
          password: result.fields.password,
          username: result.fields.username,
        })
    } else {
      if (!avatar) {
        setAvatarError('Please upload your avatar')
      }
    }
  }

  const handleAvatarUpload = (files: File[]) => {
    setAvatar(files)
  }

  useEffect(() => {
    if (avatar) {
      setAvatarError('')
    }
  }, [avatar])

  return (
    <form onSubmit={handleSubmit} className={twMerge('', className)} {...props}>
      {error && (
        <div className="mb-4">
          <Alter type="error" message={error} />
        </div>
      )}
      <div className="mb-4">
        <FieldInput label="Username" {...getInputProps('username')} />
      </div>
      <div className="mb-4">
        <FieldInput label="Email" {...getInputProps('email')} />
      </div>
      <div className="mb-4">
        <FieldInput
          label="Password"
          type="password"
          {...getInputProps('password')}
        />
      </div>
      <div className="mb-4">
        <FieldInput
          label="Confirm Password"
          type="password"
          {...getInputProps('confirmPassword')}
        />
      </div>
      <div className="mb-4">
        <FieldUploadImage
          error={avatarError}
          value={avatar}
          setValue={handleAvatarUpload}
        />
      </div>
      <div className="mb-4">
        <Button className="w-full">Đăng ký</Button>
      </div>
      <div className="text-center">
        <span>Đã có tài khoản? </span>
        <Link className="text-primary hover:text-black transition" to="/login">
          Đăng nhập
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm
