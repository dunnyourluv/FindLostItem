import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loading } from '.'
const COLORS = {
  primary: 'bg-primary hover:brightness-125 text-white',
  reverse: 'bg-white hover:bg-primary text-primary hover:text-white',
  border: 'border border-gray-300 hover:bg-gray-300 ',
}

const SHAPES = {
  rounded: 'rounded',
  square: 'rounded-none',
  circle: 'rounded-full',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const ICON_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: keyof typeof COLORS
  shape?: keyof typeof SHAPES
  size?: keyof typeof SIZES
  rightIcon?: React.ReactNode
  loading?: boolean
}

const Button = ({
  children,
  color = 'primary',
  shape = 'rounded',
  size = 'md',
  className,
  rightIcon,
  loading = false,
  ...props
}: Props) => {
  const colorClass = COLORS[color]
  const shapeClass = SHAPES[shape]
  const sizeClass = SIZES[size]
  const ngClass =
    'inline-flex items-center justify-center border focus:outline-none border-transparent transition duration-200 font-semibold'
  const classes = twMerge(ngClass, colorClass, shapeClass, sizeClass, className)
  const iconSizeClass = ICON_SIZES[size]
  return (
    <button className={classes} {...props} disabled={loading}>
      {rightIcon && (
        <div className={twMerge(iconSizeClass, 'mr-2')}>{rightIcon}</div>
      )}
      {loading ? <Loading /> : children}
    </button>
  )
}

export default Button
