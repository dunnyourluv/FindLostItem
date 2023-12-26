import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TableCell = ComponentPropsWithoutRef<'td'> & {
  truncate?: boolean
}

export const TableCell = ({ className, truncate, ...props }: TableCell) => {
  return (
    <td
      className={twMerge(
        'max-w-xs text-ellipsis px-6 py-3',
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {props.children}
    </td>
  )
}
