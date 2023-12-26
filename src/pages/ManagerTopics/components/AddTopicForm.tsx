import { Button } from '@/components/Elements'
import { FieldInput } from '@/components/Form'
import { useFormValidator } from '@/hooks'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  onSubmit?: (topicName: string) => void
}

const AddTopicForm = ({ className, onSubmit, ...props }: Props) => {
  const { getInputProps, getFormValidationResult } = useFormValidator([
    {
      field: 'topicName',
      validate: (value = '') => {
        if (value.trim().length === 0) {
          return 'Tên chủ đề không được để trống'
        }
        return null
      },
    },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const results = getFormValidationResult()

    if (results.isValid) {
      onSubmit?.(results.fields.topicName)
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className={twMerge('', className)}
      {...props}
    >
      <div className="mt-4">
        <FieldInput {...getInputProps('topicName')} label="Tên chủ đề" />
      </div>
      <div className="mt-4 flex justify-end">
        <Button>Thêm</Button>
      </div>
    </form>
  )
}

export default AddTopicForm
