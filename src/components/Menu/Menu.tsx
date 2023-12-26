import { ComponentPropsWithoutRef } from 'react'
import MenuItem from './MenuItem'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'menu'> & {}

const Instance = ({ className, children, ...props }: Props) => {
  return (
    <menu className={twMerge('', className)} {...props}>
      {children}
    </menu>
  )
}

const Menu = Object.assign(Instance, { Item: MenuItem })

export default Menu
