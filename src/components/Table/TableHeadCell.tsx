import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TableHeadCellProps = ComponentPropsWithoutRef<'th'>

export const TableHeadCell = ({
  className,
  children,
  ...props
}: TableHeadCellProps) => {
  return (
    <th className={twMerge('px-6 py-3', className)} {...props}>
      {children}
    </th>
  )
}
