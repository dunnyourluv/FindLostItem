import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

const COLORS = {
  primary: 'border-white',
  reverse: 'border-primary',
  border: 'border-primary',
}

const ICON_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

type Props = ComponentPropsWithoutRef<'div'> & {
  size?: keyof typeof ICON_SIZES
  color?: keyof typeof COLORS
}

const Loading = ({
  className,
  size = 'md',
  color = 'primary',
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        'border-4  rounded-full animate-spin border-b-transparent',
        ICON_SIZES[size],
        COLORS[color],
        className
      )}
      {...props}
    ></div>
  )
}

export default Loading
