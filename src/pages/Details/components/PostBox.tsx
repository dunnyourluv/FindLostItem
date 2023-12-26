import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {}

const PostBox = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'bg-white border border-gray-200 rounded px-2 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default PostBox
