import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

const SIZES = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
}

const TYPO_SIZES = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

type Props = ComponentPropsWithoutRef<'div'> & {
  src: string
  alt: string
  size?: keyof typeof SIZES
  name?: string
}

const User = ({
  className,
  src,
  alt,
  size = 'md',
  name = '',
  ...props
}: Props) => {
  return (
    <div className={twMerge('flex items-center', className)} {...props}>
      <img
        src={src}
        alt={alt}
        className={twMerge('rounded-full object-cover', SIZES[size])}
      />
      <div className="font-semibold ml-2">
        <p className={twMerge(TYPO_SIZES[size])}>{name}</p>
      </div>
    </div>
  )
}

export default User
