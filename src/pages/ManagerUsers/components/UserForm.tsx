import { Alter } from '@/components/Alter'
import { Button } from '@/components/Elements'
import { FieldInput, FieldSelect, FieldUploadImage } from '@/components/Form'
import { SelectOption } from '@/components/Form/FieldSelect'
import { useFormValidator } from '@/hooks'
import { UserTypes } from '@/types'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { validateCreateUser } from '../validators'

type Props = {
  className?: string
  error?: string
  onAdd?: (user: UserTypes.Create) => void
}

const UserForm = ({ className, error = '', onAdd }: Props) => {
  const [avatar, setAvatar] = useState<File[]>([])
  const [avatarError, setAvatarError] = useState('')
  const [role, setRole] = useState({ label: 'Role', value: '' })
  const [roleOptions] = useState([
    { label: 'Role', value: '' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ])

  const { getInputProps, getFormValidationResult } =
    useFormValidator(validateCreateUser)

  const handleAvatarUpload = (files: File[]) => {
    setAvatar(files)
  }

  const handleRoleChange = useCallback((selected: SelectOption) => {
    setRole(selected)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = getFormValidationResult()
    if (result.isValid && avatar.length) {
      onAdd &&
        onAdd({
          avatar: avatar[0],
          email: result.fields.email,
          password: result.fields.password,
          username: result.fields.username,
          isAdmin: role.value == 'admin',
        })
    } else {
      if (avatar.length === 0) {
        setAvatarError('Please upload your avatar')
      } else {
        setAvatarError('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={twMerge('', className)}>
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
        <FieldSelect
          options={roleOptions}
          onChange={handleRoleChange}
          value={role}
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
        <Button className="w-full">Thêm</Button>
      </div>
    </form>
  )
}

export default UserForm
