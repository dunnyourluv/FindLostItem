import { ComponentPropsWithoutRef } from 'react'
import { FieldWrapperPassThroughProps, FieldWrapper } from './FieldWrapper'
import { twMerge } from 'tailwind-merge'

type Props = FieldWrapperPassThroughProps &
  ComponentPropsWithoutRef<'input'> & {
    rightIcon?: React.ReactNode
    leftIcon?: React.ReactNode
  }

const FieldInput = ({
  error,
  label,
  className,
  placeholder = '',
  rightIcon,
  leftIcon,
  ...props
}: Props) => {
  return (
    <FieldWrapper error={error} className="relative transition">
      <input
        className={twMerge(
          'peer outline-none w-full border-b-2  focus:border-primary transition-all ',
          error ? 'border-red-500' : 'border-gray-200',
          rightIcon && 'pr-5',
          leftIcon && 'pl-5',
          label && 'pt-3 pb-2',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
      {rightIcon && (
        <div className="absolute top-1/2 -translate-y-1/2 right-0 h-5 w-5">
          {rightIcon}
        </div>
      )}
      {leftIcon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 h-5 w-5">
          {leftIcon}
        </div>
      )}
      <span
        className={twMerge(
          'block absolute transition-all top-1 -translate-y-1/2 text-sm peer-focus:top-1 peer-placeholder-shown:top-1/2 text-gray-600',
          leftIcon && 'left-5'
        )}
      >
        {label}
      </span>
    </FieldWrapper>
  )
}

export default FieldInput
