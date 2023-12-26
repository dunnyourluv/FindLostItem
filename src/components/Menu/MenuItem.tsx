import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {}

const MenuItem = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={twMerge('border-b border-gray-200 py-4 px-5', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default MenuItem
