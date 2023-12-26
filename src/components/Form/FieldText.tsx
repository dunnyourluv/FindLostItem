import { ComponentPropsWithoutRef } from 'react'
import { FieldWrapperPassThroughProps } from '.'

type Props = FieldWrapperPassThroughProps & ComponentPropsWithoutRef<'textarea'>

const FieldTextArea = ({ error, label, className, ...props }: Props) => {
  return (
    <div className="relative">
      <textarea
        className={`peer outline-none w-full border-b-2  focus:border-primary transition-all ${
          error ? 'border-red-500' : 'border-gray-200'
        } ${label ? 'pt-3 pb-2' : ''} ${className}`}
        {...props}
      />
      <span
        className={`block absolute transition-all top-1 -translate-y-1/2 text-sm peer-focus:top-1 peer-placeholder-shown:top-1/2 text-gray-600`}
      >
        {label}
      </span>
    </div>
  )
}

export default FieldTextArea
