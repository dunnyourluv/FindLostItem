import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

const TYPES = {
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  info: 'bg-blue-100 border-blue-500 text-blue-700',
}

const ICONS = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: ExclamationCircleIcon,
}

type Props = ComponentPropsWithoutRef<'div'> & {
  type?: keyof typeof TYPES
  message?: React.ReactNode
}

const Alter = ({
  className,
  type = 'success',
  message = '',
  ...props
}: Props) => {
  const Icon = ICONS[type]
  return (
    <div
      className={twMerge(
        'flex items-center px-2 py-4 border rounded',
        TYPES[type],
        className
      )}
      {...props}
    >
      <div className="">
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  )
}

export default Alter
