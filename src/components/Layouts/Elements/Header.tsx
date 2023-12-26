import { useScrollHeight } from '@/hooks'
import { Navbar } from '..'
import { twMerge } from 'tailwind-merge'
import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'header'> & {
  navbarEffect?: 'fixed' | 'sticky'
}

const Header = ({ navbarEffect = 'fixed', ...props }: Props) => {
  const scrollHeight = useScrollHeight()
  const isFixed = scrollHeight > 60 || navbarEffect == 'fixed'
  return (
    <header {...props}>
      <Navbar
        className={twMerge(
          'fixed w-full top-0 z-[100] bg-transparent transition-all',
          isFixed && 'bg-black'
        )}
      />
    </header>
  )
}

export default Header
