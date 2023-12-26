import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TableHead = ComponentPropsWithoutRef<'thead'>

export const TableHead = ({ children, className, ...props }: TableHead) => {
  return (
    <thead
      className={twMerge('text-xs uppercase text-black', className)}
      {...props}
    >
      {children}
    </thead>
  )
}
