import { ComponentPropsWithoutRef } from 'react'

type TableBody = ComponentPropsWithoutRef<'tbody'>

export const TableBody = ({ children, className, ...props }: TableBody) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}
