import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {}

const CardGrid = ({ className, children, ...props }: Props) => {
  const cards = React.Children.toArray(children)

  return (
    <div className={twMerge('overflow-hidden', className)} {...props}>
      <ul className="-m-2 flex flex-wrap">
        {cards.map((card, index) => (
          <li key={index} className="w-full p-2 md:w-1/2 lg:w-1/3">
            {card}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardGrid
