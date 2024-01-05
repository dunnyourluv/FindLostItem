import { ComponentPropsWithoutRef } from 'react'
import { Footer, Header } from '.'

type Props = ComponentPropsWithoutRef<'div'> & {
  navbarEffect?: 'fixed' | 'sticky'
}

const MainLayout = ({ children, navbarEffect = 'fixed', ...props }: Props) => {
  return (
    <div {...props}>
      <Header navbarEffect={navbarEffect} />
      <div className="mt-[60px]"></div>
      {children}
      <div className="pb-10 bg-gray-100"></div>
      <Footer />
    </div>
  )
}

export default MainLayout
