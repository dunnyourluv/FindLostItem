import { twMerge } from 'tailwind-merge'
import { TableBody } from './TableBody'
import { TableCell } from './TableCell'
import { TableHead } from './TableHead'
import { TableHeadCell } from './TableHeadCell'
import { TableRow } from './TableRow'
import { TableRowPulse } from './TableRowPulse'
import { ComponentPropsWithoutRef } from 'react'

type TableProps = ComponentPropsWithoutRef<'table'>

const TableComponent = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      className={twMerge('w-full border-collapse text-left text-sm', className)}
      {...props}
    >
      {children}
    </table>
  )
}

const Table = Object.assign(TableComponent, {
  Cell: TableCell,
  Head: TableHead,
  HeadCell: TableHeadCell,
  Row: TableRow,
  Body: TableBody,
  RowPulse: TableRowPulse,
})

export default Table
