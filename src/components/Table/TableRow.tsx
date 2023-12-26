import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TableRow = ComponentPropsWithoutRef<'tr'>

export const TableRow = ({ children, className, ...props }: TableRow) => {
  return (
    <tr className={twMerge('border-lightGray', className)} {...props}>
      {children}
    </tr>
  )
}
